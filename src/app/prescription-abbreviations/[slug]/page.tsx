import { notFound } from 'next/navigation';
import Link from 'next/link';
import { abbreviations } from '@/data/abbreviations';

export const dynamic = "force-static";

interface Props {
  params: {
    slug: string;
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <nav className="mb-8 not-prose">
        <Link href="/prescription-abbreviations" className="text-sm text-[#2563EB] hover:underline flex items-center gap-1">
          ← Back to Abbreviations
        </Link>
      </nav>

      <div className="bg-blue-50 rounded-2xl p-8 mb-8 not-prose">
        <h1 className="text-4xl font-extrabold text-[#2563EB] mb-2 m-0">{abbr.code}</h1>
        <p className="text-xl font-semibold text-slate-700 m-0">{abbr.full_form}</p>
      </div>

      <h2>Plain English Meaning</h2>
      <p>{abbr.plain_english}</p>

      <h2>Example on a Prescription</h2>
      <div className="bg-slate-50 border-l-4 border-slate-300 p-4 italic">
        {abbr.example}
      </div>

      <div className="mt-12 not-prose">
        <h3 className="text-lg font-bold mb-4">Related Abbreviations</h3>
        <div className="flex flex-wrap gap-2">
          {relatedAbbrs.map((related) => (
            <Link
              key={related.slug}
              href={`/prescription-abbreviations/${related.slug}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-sm"
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
