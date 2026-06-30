'use client';

import React, { useState } from 'react';
import Spinner from '@/components/Spinner';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

interface DoseResult {
  medicine: string;
  recommended_dose: string;
  max_daily_dose: string;
  notes?: string;
  warning: string;
}

export default function ChildDoseCalculatorPage() {
  const [medicine, setMedicine] = useState('');
  const [childWeight, setChildWeight] = useState('');
  const [childAge, setChildAge] = useState('');
  const [ageUnit, setAgeUnit] = useState<'Years' | 'Months'>('Years');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DoseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/calculate-dose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicine,
          childWeight: Number(childWeight),
          childAge: Number(childAge),
          ageUnit,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.message || 'Failed to calculate dose. Please try again.');
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Child Dose Calculator",
    "url": "https://rxreader.vercel.app/child-dose-calculator",
    "description": "Calculate typical pediatric doses based on child weight and age with our free AI-powered calculator.",
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
            👶 Free AI Child Dose Calculator
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Pediatric Dosage Calculator
          </h1>
          <p className="text-lg text-blue-100 mb-2">
            Calculate estimated pediatric doses based on your child&apos;s weight and age.
          </p>
          <p className="text-sm text-blue-200">
            ⚠️ For informational purposes only — always verify with a pediatrician.
          </p>
        </div>
      </section>

      {/* Tool Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-[600px]">
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  placeholder="e.g. Paracetamol or Amoxicillin"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Child Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={childWeight}
                    onChange={(e) => setChildWeight(e.target.value)}
                    placeholder="e.g. 12.5"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Child Age
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      placeholder="e.g. 4"
                      required
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                    <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setAgeUnit('Years')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${ageUnit === 'Years' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        Y
                      </button>
                      <button
                        type="button"
                        onClick={() => setAgeUnit('Months')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${ageUnit === 'Months' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                      >
                        M
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <><Spinner size="sm" /> Calculating...</> : 'Calculate Typical Dose'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                  <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed text-center font-medium">
                    ⚠️ This is a general estimate only. Pediatric dosing varies by individual child. Always confirm exact dosage with your pediatrician or pharmacist before giving any medicine to a child.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-6">
                  <h3 className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 mb-4 tracking-widest">Recommended Dosage</h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">Medicine</span>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{result.medicine}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">Typical Dose</span>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.recommended_dose}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">Maximum Daily Dose</span>
                      <p className="font-bold text-gray-900 dark:text-white">{result.max_daily_dose}</p>
                    </div>
                    {result.notes && (
                      <div className="pt-4 border-t border-blue-100 dark:border-blue-800/30">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Important Notes</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">{result.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white dark:bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Free AI Child Dose Calculator — Safe Pediatric Dosing Estimates
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Dosing medicine for children is much more complex than for adults. Pediatric doses are typically calculated based on a child&apos;s weight rather than just their age, because children grow at different rates and their bodies process medicines differently. Our free AI child dose calculator helps parents and caregivers understand typical pediatric dosing guidelines for common medicines, providing a helpful starting point for conversations with healthcare professionals.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Whether you&apos;re dealing with a common fever, a cough, or a prescribed antibiotic, knowing the typical dose for your child&apos;s weight can help you avoid both under-dosing (which makes the medicine ineffective) and over-dosing (which can be dangerous). Our tool uses AI to provide estimates based on standard clinical pediatric dosing protocols.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Why Weight-Based Dosing is Critical for Children
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Many parents mistakenly rely solely on age-based charts found on over-the-counter medicine bottles. However, medical professionals prioritize weight-based dosing (mg/kg) because it is much more accurate. For example, two 5-year-old children can have significantly different weights, and the one who weighs more may require a slightly higher dose to achieve the same therapeutic effect, while the one who weighs less could be at risk of side effects from an age-standardized dose.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How to Use the Pediatric Dose Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            To get a dosing estimate, simply enter the name of the medicine (generic or brand), your child&apos;s current weight in kilograms, and their age. You can toggle between years and months for age to accommodate infants and toddlers. Click &quot;Calculate Typical Dose,&quot; and our AI will provide the recommended dosage per administration, the frequency, and the maximum safe daily dose.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Important Safety Reminders for Pediatric Medicine
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Always use the measuring device (syringe, dropper, or cup) that comes with the medicine. Never use household spoons, as they vary in size and are not accurate for medical dosing. If your child is taking multiple medicines, use our <Link href="/drug-interaction-checker" className="text-blue-600 dark:text-blue-400 hover:underline">drug interaction checker</Link> to ensure they are safe to take together. Most importantly, if you are ever unsure about a dose, or if your child has an underlying medical condition, consult your pediatrician or pharmacist immediately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Privacy and Accuracy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Your child&apos;s information is private. We do not store any of the names, weights, or ages entered into this calculator. The AI provides estimates based on general medical knowledge and should not be used as a substitute for professional medical judgment. Every child is unique, and factors like kidney or liver function, which only a doctor can assess, can significantly affect dosing requirements.
          </p>
        </div>
      </section>
    </>
  );
}
