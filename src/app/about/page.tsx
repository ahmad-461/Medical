import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "About RxReader — Free AI Prescription Reader",
  description: "RxReader is a free AI-powered tool that helps patients understand their doctor's prescriptions. Learn about our mission, technology, and commitment to privacy.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About RxReader",
    "description": "Learn about RxReader's mission to help patients understand their doctor's prescriptions using AI.",
    "url": "https://rxreader.vercel.app/about"
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={jsonLdData} />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">About RxReader — Free AI Prescription Reader</h1>

      <div className="space-y-12 leading-relaxed text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p>
            RxReader was created to help patients, especially those in underserved regions, understand their prescriptions more clearly. We believe that everyone should have access to basic information about their medication without necessarily needing to call a doctor or pharmacist for every simple question. Our goal is to empower patients with knowledge and clarity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <div className="space-y-4">
            <p>Our process is designed to be as simple and fast as possible:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Upload:</strong> Take a photo or upload your prescription image.</li>
              <li><strong>AI Analyzes:</strong> Our advanced Gemini 2.0 Flash vision AI reads and interprets the handwritten or printed text.</li>
              <li><strong>Get Results:</strong> Receive a plain-English breakdown of your medicines, dosages, and instructions instantly.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment to Privacy</h2>
          <p>
            Your privacy and data security are our top priorities. We understand the sensitive nature of medical prescriptions.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Prescription images are automatically deleted from our servers after 24 hours.</li>
            <li>We do not store any personally identifiable information (PII).</li>
            <li>No account or sign-up is required to use our tool.</li>
            <li>Your data is never used to train our AI models.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Disclaimer</h2>
          <p className="font-medium">
            RxReader is for informational purposes only. It is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a licensed doctor or pharmacist before making any decisions related to your medication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technology</h2>
          <p>
            RxReader is built using modern, reliable technologies to ensure a fast and secure experience:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Next.js:</strong> For a fast, responsive web experience.</li>
            <li><strong>Tailwind CSS:</strong> For clean and accessible UI design.</li>
            <li><strong>Google Gemini AI:</strong> State-of-the-art vision models for accurate prescription reading.</li>
            <li><strong>Supabase:</strong> Secure storage and backend infrastructure.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
