'use client';

import React, { useState } from 'react';
import Spinner from './Spinner';
import { InteractionResult } from '@/types/interactions';

export default function DrugCheckerForm() {
  const [medicines, setMedicines] = useState<string[]>(['', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InteractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateMedicine = (index: number, value: string) => {
    const updated = [...medicines];
    updated[index] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    if (medicines.length < 5) {
      setMedicines([...medicines, '']);
    }
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 2) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const handleCheck = async () => {
    const filtered = medicines.map(m => m.trim()).filter(Boolean);
    if (filtered.length < 2) {
      setError('Please enter at least 2 medicine names.');
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch('/api/check-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicines: filtered }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        const messages: Record<string, string> = {
          minimum_two_medicines: 'Please enter at least 2 medicine names.',
          maximum_five_medicines: 'Maximum 5 medicines allowed at once.',
          parse_failed: 'AI returned an unexpected response. Please check the medicine names and try again.',
          check_failed: 'Check failed. This might be due to an invalid medicine name or a temporary service issue. Please try again.',
        };
        setError(messages[data.error] || `Error: ${data.message || 'Something went wrong. Please try again.'}`);
        return;
      }
      setResult(data);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const safetyConfig = {
      safe: { bg: 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700', icon: '✅', text: 'text-green-800 dark:text-green-300', label: 'Generally Safe Combination' },
      caution: { bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700', icon: '⚠️', text: 'text-yellow-800 dark:text-yellow-300', label: 'Use With Caution' },
      dangerous: { bg: 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700', icon: '🚨', text: 'text-red-800 dark:text-red-300', label: 'Dangerous Combination — Consult Doctor Immediately' },
    };
    const config = safetyConfig[result.overall_safety];

    return (
      <div className="animate-in fade-in duration-500">
        <div className={`border rounded-xl p-4 mb-6 ${config.bg}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{config.icon}</span>
            <div>
              <h3 className={`font-bold text-lg ${config.text}`}>{config.label}</h3>
              <p className={`text-sm mt-1 ${config.text}`}>{result.summary}</p>
            </div>
          </div>
        </div>

        {result.interactions.map((interaction, index) => {
          const severityStyle = {
            none: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            mild: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
            moderate: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
            severe: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
          };
          return (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {interaction.drug_a} + {interaction.drug_b}
                </h4>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${severityStyle[interaction.severity]}`}>
                  {interaction.severity === 'none' ? 'No Interaction' : `${interaction.severity} Interaction`}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{interaction.description}</p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">💡 Recommendation:</span> {interaction.recommendation}
                </p>
              </div>
            </div>
          );
        })}

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">📋 General Advice</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">{result.general_advice}</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
            ⚠️ This is AI-generated information for educational purposes only. Always consult your doctor or pharmacist before making any changes to your medication.
          </p>
        </div>

        <button
          onClick={() => { setResult(null); setMedicines(['', '']); setError(null); }}
          className="w-full border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors mt-2"
        >
          🔄 Check Different Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="space-y-4">
        {medicines.map((medicine, index) => (
          <div key={index}>
            <label htmlFor={`medicine-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Medicine {index + 1}
            </label>
            <div className="flex gap-2">
              <input
                id={`medicine-${index}`}
                type="text"
                value={medicine}
                onChange={(e) => updateMedicine(index, e.target.value)}
                placeholder="e.g. Amoxicillin, Metformin, Ibuprofen"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
              {medicines.length > 2 && (
                <button
                  onClick={() => removeMedicine(index)}
                  className="text-red-500 text-sm hover:text-red-700 transition-colors px-2"
                  aria-label={`Remove medicine ${index + 1}`}
                >
                  ✕ Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {medicines.length < 5 ? (
        <button
          onClick={addMedicine}
          className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
        >
          ➕ Add Another Medicine
        </button>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          Maximum 5 medicines reached
        </p>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleCheck}
        disabled={loading || medicines.filter(m => m.trim()).length < 2}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg mt-6 shadow-lg shadow-blue-600/20"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner size="sm" /> Checking Interactions...
          </span>
        ) : (
          '🔍 Check Drug Interactions'
        )}
      </button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
        Powered by Gemini AI — Results may be inaccurate.
      </p>
    </div>
  );
}
