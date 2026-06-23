'use client';

import React, { useState, useCallback, useRef } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import { supabase } from '@/lib/supabase';
import { getOrCreateSessionId } from '@/lib/session';
import { getCroppedImg } from '@/lib/cropImage';
import Spinner from './Spinner';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analysisResult, setAnalysisResult] = useState<unknown>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const resetState = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setSuccess(false);
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setCroppedAreaPixels(null);
  };

  const handleFile = async (selectedFile: File) => {
    resetState();

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, HEIC, or PDF.');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type === 'application/pdf') {
      // For PDFs, we just show a placeholder/name since we can't easily preview/crop
      setPreviewUrl('pdf-placeholder');
    } else {
      try {
        let fileToProcess = selectedFile;

        // Compress image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        // browser-image-compression might fail on some HEIC or very large files depending on environment
        try {
          fileToProcess = await imageCompression(selectedFile, options);
        } catch (e) {
          console.warn('Compression failed, using original file', e);
        }

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(fileToProcess);
      } catch (err) {
        setError('Error processing image. Please try again.');
        console.error(err);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !previewUrl) return;

    setIsUploading(true);
    setError(null);

    try {
      const sessionId = await getOrCreateSessionId();
      let blob: Blob;

      if (file.type === 'application/pdf') {
        blob = file;
      } else if (croppedAreaPixels && previewUrl) {
        blob = await getCroppedImg(previewUrl, croppedAreaPixels);
      } else {
        blob = file;
      }

      const ext = file.name.split('.').pop();
      const fileName = `${file.name.replace(`.${ext}`, '')}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
      const filePath = `prescriptions/${sessionId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prescription-images')
        .upload(filePath, blob, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Start Analysis
      setIsUploading(false);
      setIsAnalyzing(true);

      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, file_path: filePath }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'not_a_prescription') {
          setError("This doesn't look like a prescription. Please upload a clear photo of a doctor's prescription.");
        } else if (result.error === 'unreadable') {
          setError("We couldn't read this prescription clearly. Try a better-lit photo or a higher quality image.");
        } else {
          setError("Something went wrong while analyzing. Please try again.");
        }
        setIsAnalyzing(false);
        return;
      }

      console.log('Analysis result:', result);
      setAnalysisResult(result);
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload prescription. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-green-50 border border-green-200 rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Analysis complete!</h3>
        <p className="text-green-700">Showing results...</p>
        <button
          onClick={resetState}
          className="mt-6 text-sm font-medium text-green-800 underline underline-offset-4"
        >
          Upload another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      {!previewUrl ? (
        <div
          className="border-2 border-dashed border-slate-300 rounded-2xl p-12 bg-slate-50 flex flex-col items-center justify-center transition-colors hover:border-[#2563EB] group cursor-pointer"
          onClick={triggerUpload}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl">📄</span>
          </div>
          <p className="text-slate-600 font-medium text-center">
            Drop your prescription here or click to upload
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Supports JPG, PNG, HEIC, PDF (Max 10MB)
          </p>

          <button
            className="mt-6 md:hidden px-6 py-3 bg-[#2563EB] text-white rounded-full font-semibold flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              triggerCamera();
            }}
          >
            <span>📷</span> Take Photo
          </button>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
          <div className="relative h-80 w-full bg-slate-900">
            {file?.type === 'application/pdf' ? (
              <div className="flex flex-col items-center justify-center h-full text-white p-8">
                <span className="text-6xl mb-4">📑</span>
                <p className="font-medium text-center">{file.name}</p>
                <p className="text-sm text-slate-400 mt-2">PDF file selected (Cropping not available)</p>
              </div>
            ) : (
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={undefined}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={resetState}
              className="text-slate-500 font-medium hover:text-slate-700 disabled:opacity-50"
              disabled={isUploading}
            >
              Cancel
            </button>

            <button
              onClick={handleUpload}
              disabled={isUploading || isAnalyzing}
              className="w-full sm:w-auto px-8 py-3 bg-[#2563EB] text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isUploading ? (
                <>
                  <Spinner size="sm" />
                  Uploading...
                </>
              ) : isAnalyzing ? (
                <>
                  <Spinner size="sm" />
                  Analyzing your prescription...
                </>
              ) : (
                'Confirm & Upload'
              )}
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept=".jpg,.jpeg,.png,.heic,.pdf"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={onFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
    </div>
  );
}
