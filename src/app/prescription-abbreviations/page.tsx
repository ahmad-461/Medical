import { Metadata } from 'next';
import Link from 'next/link';
import { abbreviations } from '@/data/abbreviations';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Prescription Abbreviations Explained — Complete Guide",
  description: "Complete guide to prescription abbreviations like OD, BD, TDS, SOS, PRN and more.",
};

export default function AbbreviationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Prescription Abbreviations Explained</h1>
        <p className="text-slate-600">
          A complete guide to common medical abbreviations used by doctors on prescriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {abbreviations.map((abbr) => (
          <Link
            key={abbr.slug}
            href={`/prescription-abbreviations/${abbr.slug}`}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <div className="text-2xl font-bold text-[#2563EB] mb-2 group-hover:scale-105 transition-transform inline-block">
              {abbr.code}
            </div>
            <div className="font-semibold text-slate-900 mb-1">{abbr.full_form}</div>
            <p className="text-sm text-slate-500 line-clamp-2">{abbr.plain_english}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
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
