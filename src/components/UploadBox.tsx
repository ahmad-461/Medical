'use client';

import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import Cropper, { Area } from 'react-easy-crop';
import { supabase } from '@/lib/supabase';
import { getOrCreateSessionId } from '@/lib/session';
import { getCroppedImg } from '@/lib/cropImage';
import Spinner from './Spinner';
import { PrescriptionResult } from '@/types/prescription';

type Step = 'idle' | 'compressing' | 'crop' | 'confirm' | 'uploading' | 'analyzing' | 'done';

interface UploadBoxProps {
  onResult: (data: PrescriptionResult) => void;
}

export default function UploadBox({ onResult }: UploadBoxProps) {
  const [step, setStep] = useState<Step>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setStep('idle');
    setSelectedFile(null);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setError(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so same file can be selected again
    e.target.value = '';

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPG, PNG, HEIC, or PDF.');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    setError(null);

    try {
      setStep('compressing');

      let finalFile = file;
      if (file.type !== 'application/pdf') {
        finalFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const imageUrl = URL.createObjectURL(finalFile);
        setImageSrc(imageUrl);
      } else {
        // For PDF, we just set the file and it will show the PDF icon in confirm state
        setSelectedFile(file);
      }

      setSelectedFile(finalFile);
      if (file.type !== 'application/pdf') {
        setStep('crop');
      } else {
        setStep('confirm');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
      setStep('idle');
    }
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirmCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setStep('compressing');
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedImageBlob], selectedFile?.name || 'cropped-image.jpg', {
        type: 'image/jpeg',
      });
      setSelectedFile(croppedFile);
      setImageSrc(URL.createObjectURL(croppedImageBlob));
      setStep('confirm');
    } catch (err) {
      console.error('Error cropping image:', err);
      setError('Failed to crop image. Please try again.');
      setStep('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStep('uploading');
    setError(null);

    try {
      const sessionId = await getOrCreateSessionId();
      const file = selectedFile;
      const ext = file.name.split('.').pop();
      const fileName = `${file.name.replace(`.${ext}`, '')}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
      const filePath = `prescriptions/${sessionId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prescription-images')
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Start Analysis
      setStep('analyzing');

      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, file_path: filePath }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const messages: Record<string, string> = {
          not_a_prescription: "This doesn't look like a prescription. Please upload a clear photo of a doctor's prescription.",
          unreadable: "We couldn't read this image clearly. Try a better-lit, higher quality photo.",
          download_failed: "Failed to retrieve your image. Please upload again.",
          parse_failed: "AI returned an unexpected response. Please try again.",
          missing_params: "Upload error — please refresh and try again.",
        };
        setError(messages[data.error] || `Error: ${data.message || data.error}. Please try again.`);
        setStep('idle');
        return;
      }

      setStep('done');
      onResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload prescription. Please try again.';
      setError(errorMessage);
      console.error(err);
      setStep('idle');
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      {step === 'idle' && (
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-2xl p-10 bg-white dark:bg-gray-800 flex flex-col items-center justify-center transition-colors hover:border-[#2563EB] group cursor-pointer"
            onClick={triggerUpload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const droppedFile = e.dataTransfer.files[0];
                const mockEvent = { target: { files: [droppedFile], value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleFileChange(mockEvent);
              }
            }}
          >
            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📄</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-center">
              Click to choose a file or PDF
            </p>
            <p className="text-slate-400 dark:text-gray-500 text-xs mt-2">
              Supports JPG, PNG, HEIC, PDF (Max 10MB)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 px-6 py-4 bg-[#2563EB] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors shadow-md"
              aria-label="Take a photo of your prescription using your camera"
              onClick={triggerCamera}
            >
              <span className="text-xl">📷</span> Take Photo
            </button>
            <button
              className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Upload a file or PDF"
              onClick={triggerUpload}
            >
              <span className="text-xl">📁</span> Upload File
            </button>
          </div>
        </div>
      )}

      {step === 'compressing' && (
        <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center border border-slate-200 dark:border-gray-700">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Preparing image...</p>
        </div>
      )}

      {step === 'crop' && imageSrc && (
        <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700">
          <div className="relative h-80 w-full bg-gray-900">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={resetState}
                className="text-gray-500 font-medium hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCrop}
                className="px-6 py-2 bg-[#2563EB] text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Confirm Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'confirm' && (
        <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700">
          <div className="p-8 flex flex-col items-center justify-center bg-slate-100 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700">
            {selectedFile?.type === 'application/pdf' ? (
              <div className="flex flex-col items-center">
                <span className="text-6xl mb-4">📄</span>
                <p className="font-medium text-slate-700 text-center">{selectedFile.name}</p>
                <p className="text-sm text-slate-400 mt-1">PDF File</p>
              </div>
            ) : (
              imageSrc && (
                <div className="relative w-full max-h-64 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="Prescription Preview" className="max-h-64 rounded shadow-sm object-contain" />
                </div>
              )
            )}
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={resetState}
              className="text-slate-500 font-medium hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="w-full sm:w-auto px-8 py-3 bg-[#2563EB] text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors"
            >
              Confirm & Upload
            </button>
          </div>
        </div>
      )}

      {(step === 'uploading' || step === 'analyzing') && (
        <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl p-12 flex flex-col items-center justify-center border border-slate-200 dark:border-gray-700">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            {step === 'uploading' ? 'Uploading...' : 'Analyzing your prescription...'}
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
