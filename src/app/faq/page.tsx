import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { AccordionItem } from '@/components/AccordionItem';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — RxReader",
  description: "Find answers to commonly asked questions about RxReader, our AI-powered prescription reader.",
  alternates: {
    canonical: "/faq",
  },
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
    <div className="flex flex-col">
      <JsonLd data={jsonLdData} />
      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h1>

        <div className="space-y-4 not-prose">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to Know About RxReader
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is one of the first free AI-powered prescription reading tools designed specifically for patients rather than medical professionals. Since launching it has helped thousands of patients in over 10 countries understand their prescriptions, decode medical abbreviations, and take their medicines correctly and safely. Here we answer the most common questions patients ask about using the <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">RxReader tool</Link> and AI prescription reading tools in general.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How Does RxReader Use AI to Read Prescriptions?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader uses Google Gemini 2.0 Flash — a multimodal AI model capable of understanding both images and text simultaneously. When you upload a prescription photo the image is sent to the Gemini API which analyzes the visual content of the entire prescription. Unlike traditional OCR tools that simply try to digitize text character by character, Gemini understands medical context. It recognizes that certain patterns of letters and numbers represent medicine names, dosages, and frequency codes even when handwriting is unclear or Latin abbreviations are used without explanation.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The AI then structures the extracted information into clear categories — medicine name, dosage, frequency, duration, and special instructions — and translates all abbreviations into plain English automatically. It also assigns a confidence rating to each field so you always know which parts of the analysis are highly certain and which parts you should verify with your pharmacist before starting the medicine. This confidence system is an important safety feature that makes RxReader more transparent than tools that present all results with equal certainty regardless of image quality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            What Makes RxReader Different From Other Prescription Apps?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Most prescription-related apps on the market are either medication tracking apps that require manual data entry or pharmacy apps tied to specific chains or insurance providers in specific countries. RxReader is unique because it requires no manual input — just a photo — and is completely independent of any pharmacy, insurance company, or healthcare provider. There is no account required, no prescription database that stores your data permanently, and no upsell to paid premium features.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is also specifically optimized for handwritten prescriptions which is where most patient confusion occurs. Printed prescriptions from hospital computer systems are generally easier for patients to read, but handwritten prescriptions from private doctors — particularly common in developing countries across South Asia, Africa, and the Middle East — are notoriously difficult for patients to decipher. This is the exact real-world problem RxReader was built to solve, making it especially valuable in markets that most medical technology products overlook.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Tips for Getting the Best Results From RxReader
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            To get the most accurate results from RxReader follow these practical tips when photographing your prescription. Use good natural lighting or a bright indoor light — avoid using camera flash directly on the paper as it creates glare that obscures the text. Hold your phone steady and directly above the prescription so the text is not distorted by an angle. Make sure the entire prescription is visible in the frame with no edges cut off. If your prescription has content written on both sides of the paper upload each side as a separate image.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If you receive a low confidence rating on any medicine field it usually means the handwriting in that specific area was particularly unclear or the ink was faded. In this case compare the AI output carefully against the original prescription and confirm that detail directly with your pharmacist. RxReader will always clearly tell you which fields had lower confidence so you know exactly which parts require additional human verification before you start taking the medicine.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            RxReader and Patient Safety — Our Commitment
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Patient safety is the foundation of everything RxReader does. Every result displayed by RxReader includes a prominent non-dismissible medical disclaimer reminding users that the output is AI-generated and should be verified with a healthcare professional before making any medication decisions. We deliberately chose not to hide or minimize this disclaimer because we believe truly informed patients make better health decisions when they understand both the capabilities and the real limitations of AI tools.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader is designed to empower patients with information and understanding, not to replace the essential relationship between patients and their healthcare providers. Think of RxReader as a knowledgeable friend who helps you understand the medical document in your hands and prepares you to ask better questions — but your doctor and pharmacist remain the authoritative sources for all clinical medical decisions. Use RxReader to arrive at your pharmacy better informed, not to make independent medical decisions that bypass professional medical advice.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            RxReader continues to expand its tools to serve patients better. In addition to prescription reading, our growing suite includes a free <Link href="/drug-interaction-checker" className="text-blue-600 dark:text-blue-400 hover:underline">drug interaction checker</Link> that helps verify the safety of taking multiple medicines together. We are committed to keeping every tool on RxReader completely free, ad-supported only, with no subscriptions or hidden charges of any kind for patients who need quick, reliable medical information they can trust.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
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
