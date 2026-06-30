'use client';

import React, { useState } from 'react';
import LabReportUpload from '@/components/LabReportUpload';
import LabResultsPanel from '@/components/LabResultsPanel';
import JsonLd from '@/components/JsonLd';

interface LabTest {
  name: string;
  value: string;
  normal_range: string;
  status: 'normal' | 'high' | 'low';
  explanation: string;
}

interface LabResultsData {
  tests: LabTest[];
  overall_summary: string;
  unreadable_fields: string[];
}

export default function LabReportExplainerPage() {
  const [result, setResult] = useState<LabResultsData | null>(null);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lab Report Explainer",
    "url": "https://rxreader.vercel.app/lab-report-explainer",
    "description": "Understand your medical lab results in plain English with our free AI-powered lab report explainer.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4 border border-white/30">
            🧪 Free AI Lab Report Explainer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Understand Your Lab Results
          </h1>
          <p className="text-lg text-blue-100 mb-2">
            Upload a photo of your blood test or lab report and get an instant, plain-English explanation of your results.
          </p>
          <p className="text-sm text-blue-200">
            ⚠️ For informational purposes only — always consult your doctor to interpret results.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-[600px]">
        <div className="max-w-2xl mx-auto">
          {result ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
              <LabResultsPanel data={result} onReset={() => setResult(null)} />
            </div>
          ) : (
            <LabReportUpload onResult={(data) => setResult(data as LabResultsData)} />
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white dark:bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Free AI Lab Report Explainer — Decode Your Medical Tests
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Medical lab reports are often filled with technical jargon, complex abbreviations, and numerical values that can be difficult for patients to understand. Our free AI lab report explainer is designed to bridge this information gap, providing clear and simple explanations of what your test results actually mean. By uploading a photo of your lab report, you can instantly see which results are within the normal range and which ones might require a conversation with your healthcare provider.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Whether you&apos;ve had a complete blood count (CBC), a metabolic panel, thyroid tests, or cholesterol screening, our AI analyzes the data and presents it in a structured, easy-to-read format. We help you understand terms like Hemoglobin, Creatinine, TSH, and LDL, and explain how these markers relate to your overall health.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How to Use the Lab Report Explainer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Using our tool is simple. Start by taking a clear photo of your printed lab report or saving it as a PDF. Ensure that the test names, values, and reference ranges are clearly visible and in focus. Click the upload area above to select your file, then confirm the preview. Our AI will analyze the report and generate a detailed breakdown of each test, including its value, the normal reference range, and a plain-English explanation of its significance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Understanding Status Badges (Normal, High, Low)
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For every test identified on your report, our AI assigns a status badge to help you quickly identify results that are outside the typical reference range. A <span className="text-green-600 font-bold">Normal</span> badge indicates your result falls within the standard laboratory reference range. A <span className="text-red-600 font-bold">High</span> badge means your value is above the upper limit, and a <span className="text-yellow-600 font-bold">Low</span> badge means it is below the lower limit of the range. These badges are designed to help you prioritize which results to discuss with your doctor.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Why Privacy Matters for Medical Reports
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We understand that lab reports contain sensitive personal health information. That&apos;s why we&apos;ve built our tool with privacy as a core principle. Your uploaded images are automatically deleted from our secure storage within 24 hours. We do not store your personal data permanently, and we do not use your medical reports to train AI models. You can use our explainer anonymously with complete peace of mind.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            A Tool for Better Patient-Doctor Conversations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our lab report explainer is not a diagnostic tool and does not provide medical advice. Instead, think of it as a preparation tool for your next doctor&apos;s appointment. By understanding your results beforehand, you can arrive at your consultation with specific, meaningful questions about your health. Always follow up with a qualified medical professional to interpret your results in the context of your complete medical history, symptoms, and physical examination.
          </p>
        </div>
      </section>
    </>
  );
}
