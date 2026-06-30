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

      {/* SEO Content Section */}
      <section className="bg-white dark:bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Free AI Drug Interaction Checker — Know Before You Take
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Taking multiple medicines at the same time is extremely common, especially for patients managing chronic conditions like diabetes, hypertension, or heart disease. However, combining certain medicines can cause dangerous interactions that range from mild side effects to life-threatening complications. Our free AI drug interaction checker helps you identify these risks before they become a problem, giving you the knowledge to have an informed conversation with your doctor or pharmacist. If you have a physical prescription and aren&apos;t sure of the names, use our <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">AI prescription reader</Link> first.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Drug interactions occur when one medicine affects how another medicine works in your body. This can make a medicine less effective, cause unexpected side effects, or in serious cases, cause dangerous increases in drug levels in your bloodstream. Common examples include the interaction between Aspirin and Warfarin, which significantly increases bleeding risk, or between certain antibiotics and birth control pills, which can reduce contraceptive effectiveness.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How Our Drug Interaction Checker Works
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our tool is powered by Google Gemini 2.0 Flash AI which has been trained on vast medical literature covering pharmacology and clinical drug interactions. Simply enter the names of 2 to 5 medicines you are taking and click Check Drug Interactions. The AI analyzes every possible pair combination from your list and returns a detailed report showing the severity of each interaction — from none, to mild, moderate, or severe — along with a plain-English explanation of what happens and what you should do about it. It can even decode common <Link href="/prescription-abbreviations" className="text-blue-600 dark:text-blue-400 hover:underline">prescription abbreviations</Link> if you&apos;re entering them directly from a doctor&apos;s note.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The results include an overall safety rating for your medicine combination (safe, caution, or dangerous), individual interaction cards for each medicine pair, specific recommendations for each interaction, and a general advice summary. All results are displayed in simple language that patients can understand without any medical background.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Most Common Dangerous Drug Combinations to Know
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Some drug combinations are well-known to be dangerous and should always be discussed with a doctor before combining. Aspirin and Warfarin together significantly increase the risk of serious bleeding. Ibuprofen and ACE inhibitors (commonly prescribed for blood pressure) can reduce kidney function over time. Metformin and excessive alcohol can cause a dangerous condition called lactic acidosis. SSRIs (antidepressants) combined with Tramadol can cause serotonin syndrome, a potentially life-threatening condition.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            It is also worth noting that many over-the-counter medicines can interact with prescription drugs. For example, common pain relievers like Ibuprofen can interact with blood thinners, and antihistamines in cold medicines can interact with sedatives or anxiety medicines. Always check interactions even when a medicine is available without a prescription.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Can I Take Ibuprofen With Paracetamol?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This is one of the most commonly searched drug interaction questions worldwide. The short answer is yes — Ibuprofen and Paracetamol (also known as Acetaminophen) can generally be taken together safely because they work through different mechanisms in the body. Paracetamol works centrally in the brain while Ibuprofen works by reducing inflammation. Many doctors actually recommend alternating the two for better pain control.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            However, this does not mean combining them is completely without risk for everyone. Patients with kidney disease, liver conditions, stomach ulcers, or those taking blood thinners should consult their doctor before taking either medicine. Always use our drug interaction checker to verify safety based on your complete medicine list, not just individual pairs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Who Should Use a Drug Interaction Checker?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Anyone taking more than one medicine at a time should regularly check for drug interactions. This is especially important for elderly patients who are often prescribed multiple medicines by different specialists, patients managing chronic conditions like diabetes, hypertension, or thyroid disorders, caregivers managing medicines for a family member, patients who self-medicate with over-the-counter medicines alongside prescription drugs, and anyone who has recently been prescribed a new medicine and wants to check its safety alongside their existing medicines.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our drug interaction checker is free to use with no registration required, making it accessible to anyone who needs it. However, please remember that this tool is for informational purposes only. If our checker identifies a dangerous interaction or you have any concerns about your medicines, consult your doctor or pharmacist immediately before making any changes to your medication routine.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Frequently Asked Questions About Drug Interactions
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How accurate is an AI drug interaction checker?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            AI-powered drug interaction checkers trained on medical literature can identify well-documented interactions with high accuracy. However, no automated tool can account for every individual patient factor such as kidney function, liver health, age, weight, or genetic variations that affect drug metabolism. Always treat AI results as a starting point for a conversation with your healthcare provider, not as a definitive clinical decision.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">What should I do if my medicines have a dangerous interaction?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Do not stop taking prescribed medicines without consulting your doctor first. Contact your doctor or pharmacist immediately and inform them of the interaction identified. They may adjust your doses, change the timing of when you take each medicine, or switch one medicine for a safer alternative. Never make changes to your prescription medicines on your own based solely on the results of any online tool.
          </p>
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
