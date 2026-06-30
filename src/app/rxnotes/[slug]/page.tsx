import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | RxReader Blog',
    };
  }

  return {
    title: `${post.title} | RxNotes Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://rxreader.vercel.app/rxnotes/${post.slug}`,
    },
  };
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Education':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    case 'Patient Safety':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    case 'Technology':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
  }
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related articles logic: Same category first, then most recent others.
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      // First priority: same category
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      // Second priority: most recent date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 2);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "RxReader"
    }
  };

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950 py-12 md:py-20">
      <JsonLd data={jsonLdData} />

      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/rxnotes" className="hover:text-blue-600 transition-colors">RxNotes</Link>
          <span className="mx-2">/</span>
          <span className="truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-blue dark:prose-invert max-w-none mb-16">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              {/* Simple link rendering for RxReader if detected */}
              {renderParagraphWithLinks(paragraph)}
            </p>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-8 mb-20 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Want to decode your own prescription?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try our AI-powered tool to get instant, plain-English explanations of your medicine.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
          >
            Start Reading Now
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-100 dark:border-gray-800 pt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <Link key={rPost.slug} href={`/rxnotes/${rPost.slug}`} className="group">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mb-3 inline-block ${getCategoryColor(rPost.category)}`}>
                      {rPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {rPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

// Helper to render RxReader as a link if present
function renderParagraphWithLinks(text: string) {
  // We're looking for RxReader's AI prescription reader or try RxReader for free
  const phrases = [
    { text: "RxReader's AI prescription reader", href: "/" },
    { text: "try RxReader for free", href: "/" }
  ];

  let result: (string | React.ReactNode)[] = [text];

  phrases.forEach(phrase => {
    const newResult: (string | React.ReactNode)[] = [];
    result.forEach(part => {
      if (typeof part === 'string') {
        const segments = part.split(phrase.text);
        segments.forEach((segment, i) => {
          newResult.push(segment);
          if (i < segments.length - 1) {
            newResult.push(
              <Link key={phrase.text + i} href={phrase.href} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                {phrase.text}
              </Link>
            );
          }
        });
      } else {
        newResult.push(part);
      }
    });
    result = newResult;
  });

  return result;
}
