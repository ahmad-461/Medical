import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { AccordionItem } from '@/components/AccordionItem';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — RxReader",
  description: "Find answers to commonly asked questions about RxReader, our AI-powered prescription reader.",
};

const faqs = [
  {
    question: "Is RxReader free to use?",
    answer: "Yes, completely free, no signup required."
  },
  {
    question: "How accurate is the AI prescription reader?",
    answer: "Uses Gemini 2.0 Flash vision AI, accuracy depends on image quality, always verify with pharmacist."
  },
  {
    question: "Is my prescription data private?",
    answer: "Images deleted after 24 hours, not used for AI training, no personal data stored."
  },
  {
    question: "What languages does RxReader support?",
    answer: "Optimized for English, works with Latin abbreviations used worldwide."
  },
  {
    question: "Can RxReader read handwritten prescriptions?",
    answer: "Yes, designed specifically for handwritten prescriptions."
  },
  {
    question: "What file formats are supported?",
    answer: "JPG, PNG, HEIC, PDF up to 10MB."
  },
  {
    question: "Should I take medicine based on RxReader output?",
    answer: "Never — always verify with doctor or pharmacist."
  }
];

export default function FAQPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <JsonLd data={jsonLdData} />
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-4 not-prose">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="mt-12 text-center not-prose">
        <Link
          href="/"
          className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block"
        >
          Try RxReader Now
        </Link>
      </div>
    </div>
  );
}
