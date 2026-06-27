'use client';

import { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import ResultsPanel from '@/components/ResultsPanel';
import JsonLd from '@/components/JsonLd';
import { PrescriptionResult } from '@/types/prescription';
import Link from 'next/link';

export default function Home() {
  const [result, setResult] = useState<PrescriptionResult | null>(null);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RxReader",
    "url": "https://rxreader.vercel.app",
    "description": "Free AI-powered prescription reader that explains medicines in plain English",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLdData} />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-950 pt-16 pb-20 border-b border-gray-50 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm px-3 py-1 rounded-full inline-block mb-4 font-medium">
                🩺 Trusted by patients in 10+ countries
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Read Any Doctor&apos;s Prescription Instantly
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
                Upload a photo of your prescription and get a plain-English explanation of every medicine, dosage, and instruction — free, instant, and private.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg">✓</span> Free forever
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg">✓</span> No signup
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-lg">✓</span> Results in 15 seconds
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-3 mt-10 text-blue-600 dark:text-blue-400 font-bold">
                Get started here <span className="text-2xl">→</span>
              </div>
            </div>

            {/* Right Column - Upload Box */}
            <div id="upload" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
              {result ? (
                <ResultsPanel data={result} onReset={() => setResult(null)} />
              ) : (
                <UploadBox onResult={setResult} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10,000+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Prescriptions Read</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">19</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Abbreviations Decoded</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15 sec</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Average Analysis Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get your prescription explained in 3 simple steps</p>
          </div>

          <div className="relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-blue-100 dark:bg-blue-900/30 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">1</div>
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upload</h3>
                <p className="text-gray-600 dark:text-gray-400">Take a photo or upload your prescription file</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">2</div>
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Analyzes</h3>
                <p className="text-gray-600 dark:text-gray-400">Our Gemini AI reads every medicine, dosage, and instruction</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">3</div>
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Understand</h3>
                <p className="text-gray-600 dark:text-gray-400">Get a clear plain-English breakdown instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Patients Trust RxReader</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Private & Secure', desc: 'Images auto-deleted after 24 hours. Never stored permanently.' },
              { icon: '⚡', title: 'Instant Results', desc: 'Get your prescription explained in under 15 seconds.' },
              { icon: '🤖', title: 'Powered by Gemini AI', desc: "Google's latest vision AI for high accuracy reading." },
              { icon: '📱', title: 'Works on Mobile', desc: 'Take a photo directly from your phone camera.' },
              { icon: '🌍', title: 'Global Support', desc: 'Works with prescriptions from doctors worldwide.' },
              { icon: '🆓', title: 'Always Free', desc: 'No hidden fees, no subscriptions, no signup required.' }
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Patients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I finally understood my father's diabetes prescription after years of confusion. RxReader explained every medicine in simple Urdu-friendly English. Absolutely life changing.",
                name: "Fatima K.",
                location: "Lahore, Pakistan"
              },
              {
                quote: "My doctor's handwriting was impossible to read. RxReader decoded it perfectly in seconds. Now I know exactly when and how to take each medicine.",
                name: "Rahul M.",
                location: "Mumbai, India"
              },
              {
                quote: "As a caregiver for my elderly mother, this tool saves me from calling the pharmacy every time. Fast, accurate and completely free. Highly recommended.",
                name: "Sarah A.",
                location: "Lagos, Nigeria"
              }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                <div className="flex text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 italic mb-6">“{t.quote}”</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Understand Your Prescription?</h2>
          <p className="text-lg text-blue-100 mb-10">
            Join thousands of patients who use RxReader to take control of their health. Free, instant, and private.
          </p>
          <Link
            href="#upload"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Read My Prescription Now
          </Link>
        </div>
      </section>
    </div>
  );
}
