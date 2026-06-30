'use client';

import React from 'react';
import { Check, ArrowUp, ArrowDown } from 'lucide-react';

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

interface LabResultsPanelProps {
  data: LabResultsData;
  onReset: () => void;
}

export default function LabResultsPanel({ data, onReset }: LabResultsPanelProps) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'low':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return <Check size={14} />;
      case 'high':
        return <ArrowUp size={14} />;
      case 'low':
        return <ArrowDown size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🔬</span> Lab Report Analysis
        </h2>
        <button
          onClick={onReset}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Clear Results
        </button>
      </div>

      {data.overall_summary && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-bold text-blue-800 dark:text-blue-300">Summary:</span> {data.overall_summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {data.tests.map((test, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{test.name}</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{test.value}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(test.status)}`}>
                {getStatusIcon(test.status)}
                {test.status}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block mb-1">Normal Range</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{test.normal_range || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 block mb-1">What this means</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{test.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.unreadable_fields && data.unreadable_fields.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-xl p-4">
          <p className="text-xs text-amber-800 dark:text-amber-400 font-medium mb-1 flex items-center gap-1.5">
            <span>⚠️</span> Some fields were unreadable:
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-500">
            {data.unreadable_fields.join(', ')}
          </p>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed text-center">
          ⚠️ <span className="font-bold">Medical Disclaimer:</span> This AI analysis is for informational purposes only. Lab results must be interpreted by a qualified medical professional in the context of your clinical history. Always confirm with your doctor.
        </p>
      </div>
    </div>
  );
}
