'use client';

import React, { useState } from 'react';
import { PrescriptionResult, Medicine } from '@/types/prescription';
import { generatePDF } from '@/lib/generatePDF';
import Spinner from '@/components/Spinner';
import AskPrescriptionChat from '@/components/AskPrescriptionChat';

interface ResultsPanelProps {
  data: PrescriptionResult;
  onReset: () => void;
}

export default function ResultsPanel({ data, onReset }: ResultsPanelProps) {
  const [medicines, setMedicines] = useState<Medicine[]>(data.medicines);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Medicine | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    // Show PDF header temporarily
    const header = document.getElementById('pdf-header');
    if (header) header.classList.remove('hidden');

    setIsGeneratingPDF(true);
    try {
      await generatePDF('pdf-export-area', 'RxReader-Prescription.pdf');
    } catch (e) {
      console.error('PDF error:', e);
    }
    setIsGeneratingPDF(false);

    // Hide header again
    if (header) header.classList.add('hidden');
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValues({ ...medicines[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editValues) {
      const newMedicines = [...medicines];
      newMedicines[editingIndex] = editValues;
      setMedicines(newMedicines);
      setEditingIndex(null);
      setEditValues(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Medicine
  ) => {
    if (editValues) {
      setEditValues({
        ...editValues,
        [field]: e.target.value,
      });
    }
  };

  const renderConfidenceBadge = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ High Confidence Read
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            ⚠ Medium Confidence — double-check unclear fields
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            ✗ Low Confidence — please verify everything with your pharmacist
          </span>
        );
      default:
        return null;
    }
  };

  const renderCardConfidence = (confidence: 'high' | 'medium' | 'low') => {
    let dotColor = '';
    let text = '';
    switch (confidence) {
      case 'high':
        dotColor = 'bg-green-500';
        text = 'High';
        break;
      case 'medium':
        dotColor = 'bg-yellow-500';
        text = 'Medium';
        break;
      case 'low':
        dotColor = 'bg-red-500';
        text = 'Low — verify with pharmacist';
        break;
    }

    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        {text}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 print-area pb-12">
      <div id="pdf-export-area" className="space-y-6 bg-white dark:bg-gray-900">
          {/* PDF Header */}
          <div id="pdf-header" className="hidden mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600">💊 RxReader</h1>
            <p className="text-sm text-gray-500">AI Prescription Reader — For informational purposes only</p>
            <p className="text-sm text-gray-500">Generated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Safety Disclaimer */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 flex gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="text-sm text-amber-800 font-medium">
              This is an AI-generated explanation for informational purposes only. Always verify with your doctor or pharmacist before taking any medication.
            </p>
          </div>

          {/* Overall Confidence */}
          <div className="flex justify-center">
            {renderConfidenceBadge(data.overall_confidence)}
          </div>

          {/* Medicine Cards */}
          <div className="space-y-4">
            {medicines.map((med, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 space-y-3">
                {editingIndex === index ? (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor={`name-${index}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Medicine Name</label>
                      <input
                        id={`name-${index}`}
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editValues?.name}
                        onChange={(e) => handleChange(e, 'name')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`dosage-${index}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Dosage</label>
                      <input
                        id={`dosage-${index}`}
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editValues?.dosage}
                        onChange={(e) => handleChange(e, 'dosage')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`frequency-${index}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Frequency</label>
                      <input
                        id={`frequency-${index}`}
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editValues?.frequency_plain}
                        onChange={(e) => handleChange(e, 'frequency_plain')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`duration-${index}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Duration</label>
                      <input
                        id={`duration-${index}`}
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editValues?.duration}
                        onChange={(e) => handleChange(e, 'duration')}
                      />
                    </div>
                    <div>
                      <label htmlFor={`instructions-${index}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Instructions</label>
                      <textarea
                        id={`instructions-${index}`}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editValues?.instructions}
                        onChange={(e) => handleChange(e, 'instructions')}
                        rows={2}
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      aria-label={`Save changes for ${editValues?.name}`}
                      className="w-full py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{med.name}</h3>
                        {renderCardConfidence(med.confidence)}
                      </div>
                      <button
                        onClick={() => handleEdit(index)}
                        aria-label={`Edit ${med.name} information`}
                        className="text-sm font-medium text-[#2563EB] hover:underline no-print"
                      >
                        Doesn&apos;t look right? Edit
                      </button>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Dosage:</span>
                        <span className="text-gray-600 dark:text-gray-400">{med.dosage}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Frequency:</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {med.frequency_plain} <span className="text-gray-400 dark:text-gray-500 text-xs">({med.frequency_code})</span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Duration:</span>
                        <span className="text-gray-600 dark:text-gray-400">{med.duration}</span>
                      </div>
                      {med.instructions && (
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Instructions:</span>
                          <span className="text-gray-600 dark:text-gray-400">{med.instructions}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Doctor&apos;s Notes */}
          {data.doctor_notes && (
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-white px-1">Doctor&apos;s Notes</h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-gray-700 dark:text-gray-300 text-sm">
                {data.doctor_notes}
              </div>
            </div>
          )}

          {/* Unreadable Fields */}
          {data.unreadable_fields && data.unreadable_fields.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-red-600 dark:text-red-400 px-1">Could Not Read</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {data.unreadable_fields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* Scoped Chatbot */}
      <div className="no-print">
        <AskPrescriptionChat prescriptionContext={{ ...data, medicines }} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 no-print">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          aria-label={isGeneratingPDF ? "Generating PDF document" : "Download prescription as PDF"}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingPDF ? (
            <>
              <Spinner size="sm" />
              Generating PDF...
            </>
          ) : (
            <>
              <span>📄</span> Download PDF
            </>
          )}
        </button>
        <button
          onClick={() => window.print()}
          aria-label="Print prescription"
          className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <span>🖨️</span> Print
        </button>
        <button
          onClick={onReset}
          aria-label="Read another prescription"
          className="flex-[1.5] px-6 py-3 bg-[#2563EB] text-white rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          Read Another Prescription
        </button>
      </div>
    </div>
  );
}
