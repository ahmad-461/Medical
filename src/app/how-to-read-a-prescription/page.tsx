import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How to Read a Doctor's Prescription — Step by Step Guide",
  description: "Learn how to read a doctor's prescription with our simple step-by-step guide.",
};

export default function HowToReadPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Read a Doctor's Prescription — Step by Step Guide",
    "description": "Learn how to read a doctor's prescription with our simple step-by-step guide.",
    "author": {
      "@type": "Organization",
      "name": "RxReader"
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <JsonLd data={jsonLdData} />
      <h1 className="text-3xl font-bold mb-8 dark:text-white">How to Read a Doctor&apos;s Prescription — Step by Step Guide</h1>

      <h2>1. What is a Prescription?</h2>
      <p>
        A prescription is a formal instruction from a licensed healthcare professional to a pharmacist, authorizing them to dispense specific medication to a patient. It contains vital information about the medication, dosage, and usage instructions.
      </p>

      <h2>2. Parts of a Prescription</h2>
      <p>
        A typical prescription includes several key sections: the doctor&apos;s information, patient information, the superscription (the Rx symbol), the inscription (medication name and strength), the subscription (instructions to the pharmacist), and the signa (instructions to the patient).
      </p>

      <h2>3. How to Read the Medicine Name</h2>
      <p>
        The medicine name is usually written clearly, but sometimes brand names are used instead of generic names. It&apos;s important to understand both, as they contain the same active ingredients.
      </p>

      <h2>4. Understanding Dosage and Strength</h2>
      <p>
        Strength refers to the amount of active ingredient in each unit (e.g., 500mg), while dosage refers to the amount you take at one time (e.g., one tablet).
      </p>

      <h2>5. Decoding Frequency Abbreviations</h2>
      <p>
        Doctors often use Latin abbreviations to indicate how often to take medicine. For example, &quot;OD&quot; means once daily. You can find a full list of these in our <Link href="/prescription-abbreviations">Prescription Abbreviations Guide</Link>.
      </p>

      <h2>6. Special Instructions (AC, PC, HS)</h2>
      <p>
        Some medications must be taken at specific times relative to meals. &quot;AC&quot; means before meals, &quot;PC&quot; means after meals, and &quot;HS&quot; means at bedtime.
      </p>

      <h2>7. When to Ask Your Pharmacist</h2>
      <p>
        If any part of your prescription is unclear, or if you have questions about side effects or drug interactions, always consult your pharmacist. They are experts in medication and are there to help you.
      </p>

      <h2>8. Try Our Free AI Prescription Reader</h2>
      <div className="not-prose mt-8">
        <Link
          href="/"
          className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block"
        >
          Use RxReader AI
        </Link>
      </div>
    </div>
  );
}
