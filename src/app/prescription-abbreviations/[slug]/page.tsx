import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { abbreviations } from '@/data/abbreviations';
import JsonLd from '@/components/JsonLd';

export const dynamic = "force-static";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const abbr = abbreviations.find(a => a.slug === params.slug);
  if (!abbr) return { title: 'Not Found' };
  return {
    title: `${abbr.code} Meaning — What Does ${abbr.code} Mean on a Prescription?`,
    description: `${abbr.code} on a prescription means ${abbr.plain_english.slice(0, 120)}. Learn what ${abbr.code} stands for and how it affects how you take your medicine.`,
    alternates: {
      canonical: `/prescription-abbreviations/${params.slug}`,
    },
  };
}

export function generateStaticParams() {
  return abbreviations.map((abbr) => ({
    slug: abbr.slug,
  }));
}

export default function AbbreviationDetailPage({ params }: Props) {
  const abbr = abbreviations.find((a) => a.slug === params.slug);

  if (!abbr) {
    notFound();
  }

  const relatedAbbrs = abbreviations.filter(a => abbr.related.includes(a.slug));

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": abbr.code,
    "description": abbr.plain_english,
    "inDefinedTermSet": "https://medical-120-nu.vercel.app/prescription-abbreviations"
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <JsonLd data={jsonLdData} />
      <nav className="mb-8 not-prose">
        <Link href="/prescription-abbreviations" className="text-sm text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1">
          ← Back to Abbreviations
        </Link>
      </nav>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-8 not-prose">
        <h1 className="text-4xl font-extrabold text-[#2563EB] dark:text-blue-400 mb-2 m-0">{abbr.code}</h1>
        <p className="text-xl font-semibold text-slate-700 dark:text-gray-300 m-0">{abbr.full_form}</p>
      </div>

      <h2 className="dark:text-white">Plain English Meaning</h2>
      <p className="dark:text-gray-300">{abbr.plain_english}</p>

      <h2 className="dark:text-white">Example on a Prescription</h2>
      <div className="bg-slate-50 dark:bg-gray-800 border-l-4 border-slate-300 dark:border-gray-600 p-4 italic dark:text-gray-300">
        {abbr.example}
      </div>

      <div className="mt-12 not-prose">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Related Abbreviations</h3>
        <div className="flex flex-wrap gap-2">
          {relatedAbbrs.map((related) => (
            <Link
              key={related.slug}
              href={`/prescription-abbreviations/${related.slug}`}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 hover:border-[#2563EB] dark:hover:border-blue-400 hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors shadow-sm"
            >
              {related.code}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center not-prose">
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
