'use client';

import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { supabase } from '@/lib/supabase';
import { getOrCreateSessionId } from '@/lib/session';
import Spinner from './Spinner';

type Step = 'idle' | 'compressing' | 'confirm' | 'uploading' | 'analyzing' | 'done';

interface LabReportUploadProps {
  onResult: (data: unknown) => void;
}

export default function LabReportUpload({ onResult }: LabReportUploadProps) {
  const [step, setStep] = useState<Step>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setStep('idle');
    setSelectedFile(null);
    setImageSrc(null);
    setError(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPG, PNG, HEIC, or PDF.');
      return;
    }

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
        setSelectedFile(file);
      }

      setSelectedFile(finalFile);
      setStep('confirm');
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
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
      const filePath = `lab-reports/${sessionId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('prescription-images') // Reuse same bucket
        .upload(filePath, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      setStep('analyzing');

      const res = await fetch('/api/explain-lab-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, file_path: filePath }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const messages: Record<string, string> = {
          not_a_lab_report: "This doesn't look like a lab report. Please upload a clear photo of a medical laboratory report.",
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload lab report. Please try again.';
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
            className="border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-2xl p-10 bg-white dark:bg-gray-800 flex flex-col items-center justify-center transition-colors hover:border-blue-600 group cursor-pointer"
            onClick={triggerUpload}
          >
            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🧪</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-center">
              Click to choose a lab report or PDF
            </p>
            <p className="text-slate-400 dark:text-gray-500 text-xs mt-2">
              Supports JPG, PNG, HEIC, PDF (Max 10MB)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors shadow-md"
              onClick={triggerCamera}
            >
              <span className="text-xl">📷</span> Take Photo
            </button>
            <button
              className="flex-1 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
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
                  <img src={imageSrc} alt="Lab Report Preview" className="max-h-64 rounded shadow-sm object-contain" />
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
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors"
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
            {step === 'uploading' ? 'Uploading...' : 'Analyzing your lab report...'}
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
