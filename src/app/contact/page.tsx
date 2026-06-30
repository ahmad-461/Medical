import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact Us — RxReader",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contact Us",
    "description": "Get in touch with RxReader for questions or feedback.",
    "url": "https://rxreader.vercel.app/contact"
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <JsonLd data={jsonLdData} />
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Contact Us</h1>

      <p className="dark:text-gray-300">
        Have questions, feedback, or need assistance? We&apos;re here to help. Reach out to us via email and we&apos;ll get back to you as soon as possible.
      </p>

      <div className="not-prose mt-12">
        <a
          href="mailto:contact@rxreader.com"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block font-medium flex items-center gap-2 w-fit"
        >
          <Mail className="w-5 h-5" />
          Email Us
        </a>

        <p className="mt-6 text-sm text-slate-500">
          Response time: We typically respond within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
