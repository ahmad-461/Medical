import React from 'react';

interface PDFExportWrapperProps {
  children: React.ReactNode;
}

export default function PDFExportWrapper({
  children,
  isGenerating
}: PDFExportWrapperProps & { isGenerating?: boolean }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div id="pdf-export-area" className={`bg-white ${isGenerating ? 'generating-pdf' : ''}`}>
      {/* Branded PDF Header - Only visible when generating PDF */}
      <div className="pdf-only mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-bold text-[#2563EB]">RxReader</h1>
          <p className="text-[13px] text-gray-700">AI Prescription Reader — For informational purposes only</p>
          <p className="text-[12px] text-gray-500">Generated on: {currentDate}</p>
        </div>
        <hr className="mt-4 border-gray-200" />
      </div>

      {children}
    </div>
  );
}
