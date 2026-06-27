'use client';

import React from 'react';
import Link from 'next/link';
import DrugCheckerForm from '@/components/DrugCheckerForm';
import JsonLd from '@/components/JsonLd';

export default function DrugInteractionCheckerPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Drug Interaction Checker",
    "url": "https://rxreader.vercel.app/drug-interaction-checker",
    "description": "Check if your medicines are safe to take together with our free AI-powered drug interaction checker.",
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
            🔍 Free AI Drug Interaction Checker
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Are Your Medicines Safe Together?
          </h1>
          <p className="text-lg text-blue-100 mb-2">
            Enter 2–5 medicine names below and our AI will instantly check for dangerous interactions.
          </p>
          <p className="text-sm text-blue-200">
            ⚠️ For informational purposes only — always consult your doctor or pharmacist.
          </p>
        </div>
      </section>

      {/* Checker Tool Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-[600px]">
        <div className="max-w-2xl mx-auto">
          <DrugCheckerForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white dark:bg-gray-950 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-transform hover:scale-105">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get interaction analysis in seconds powered by Google Gemini AI</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-transform hover:scale-105">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">All Combinations Checked</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Every possible pair combination between your medicines is analyzed</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-transform hover:scale-105">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Completely Free</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">No signup, no subscription — free forever for all patients</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Have a Prescription You Can&apos;t Read?</h2>
        <p className="text-blue-100 mb-6">Use our AI Prescription Reader to decode any doctor&apos;s handwriting instantly.</p>
        <Link href="/" className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors inline-block shadow-lg">
          Try Prescription Reader →
        </Link>
      </section>
    </>
  );
}
