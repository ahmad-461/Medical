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
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">“{t.quote}”</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white dark:bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The Free AI Prescription Reader Trusted by Patients Worldwide
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is a free AI-powered prescription reader that helps patients, caregivers, and families understand exactly what their doctor has prescribed. Whether your doctor has difficult handwriting, used confusing Latin abbreviations, or prescribed multiple medicines at once, RxReader decodes every detail into clear, simple English that anyone can understand. Our tool uses Google Gemini 2.0 Flash — one of the most advanced AI vision models available — to read prescription images with high accuracy.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Millions of patients every year struggle to understand their prescriptions. Studies show that medication errors caused by misunderstood prescriptions are one of the leading causes of preventable harm in healthcare. Common confusion points include <Link href="/prescription-abbreviations" className="text-blue-600 dark:text-blue-400 hover:underline">prescription abbreviations</Link> like OD (once daily), BD (twice daily), and TDS (three times daily), as well as timing instructions like AC (before meals), PC (after meals), and HS (at bedtime). RxReader automatically decodes all of these abbreviations and explains them in plain English so you always know exactly when and how to take your medicines.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How Our AI Prescription Reader Works
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Using RxReader is as simple as taking a photo. You upload a clear image of your prescription — taken with your phone camera, scanned, or saved as a PDF — and our AI analyzes every handwritten or typed word on the page. Within 15 seconds, you receive a structured breakdown of every medicine on the prescription, including the medicine name, dosage, frequency, duration, special instructions, and a confidence rating for each field.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Unlike basic OCR tools that simply digitize text, RxReader understands medical context. It knows that &quot;Augmentin 625 BD x 7/7 PC&quot; means &quot;Take one Augmentin 625mg tablet twice daily for 7 days after meals.&quot; This medical reasoning capability is what makes RxReader far more accurate than generic text recognition tools for prescription reading.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Why Patients Choose RxReader Over Other Tools
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            There are many prescription reader apps available online, but RxReader stands out for several important reasons. First, it is completely free — no subscription, no signup, and no hidden fees. Second, your prescription images are automatically deleted from our servers within 24 hours and are never used for AI training, making it one of the most privacy-respecting prescription tools available. Third, RxReader works on any device — iPhone, Android, tablet, or desktop computer — with no app download required.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is particularly popular in countries like Pakistan, India, Bangladesh, and Nigeria where patients often receive handwritten prescriptions with minimal explanation from their doctor. Our tool bridges the gap between the prescription paper and the patient&apos;s understanding, empowering people to take control of their own health information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            What Types of Prescriptions Can RxReader Read?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is designed to handle a wide variety of prescription formats. It can read handwritten prescriptions from general practitioners and specialists, typed or printed prescriptions from hospital systems, digital prescriptions saved as PDF files, and photographed prescriptions taken in various lighting conditions. The tool handles prescriptions in English and those using standard Latin medical abbreviations used by doctors worldwide.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For best results, upload a clear, well-lit photo with the prescription text in focus. Avoid shadows across the text and make sure the entire prescription is visible in the frame. If the AI returns a low confidence rating for any field, it clearly flags this so you know which parts to verify with your pharmacist before taking any medicine.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Is RxReader Safe to Use?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is designed with patient safety and data privacy as top priorities. All prescription images uploaded to RxReader are stored securely and automatically deleted within 24 hours. We do not share your data with third parties, do not use prescription images to train AI models, and do not require you to create an account or provide any personal information. The entire tool can be used anonymously.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            It is important to understand that RxReader is an informational tool, not a medical device. The AI-generated results are designed to help you understand your prescription better, but they should always be verified with your doctor or pharmacist before you make any decisions about your medication. RxReader is a complement to professional medical advice, never a replacement for it. To stay informed about patient safety and new medical technologies, you can read more on our <Link href="/rxnotes" className="text-blue-600 dark:text-blue-400 hover:underline">RxNotes blog</Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Common Questions About Reading Prescriptions
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What does OD mean on a prescription?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            OD stands for &quot;Omne Die&quot; which is Latin for &quot;once daily.&quot; If your prescription says &quot;OD,&quot; you should take that medicine once every day, usually at the same time each day unless your doctor specifies otherwise.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What does BD mean on a prescription?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            BD stands for &quot;Bis Die&quot; which means &quot;twice daily.&quot; You should take the medicine two times per day, typically once in the morning and once at night, approximately 12 hours apart.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How do I read a doctor&apos;s handwriting on a prescription?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Reading a doctor&apos;s handwriting can be challenging even for trained pharmacists. The best approach is to use RxReader — simply photograph the prescription and let our AI decode it. If any field is unclear, RxReader will flag it with a low confidence warning so you know to double-check with your pharmacist before taking the medicine.
          </p>
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
