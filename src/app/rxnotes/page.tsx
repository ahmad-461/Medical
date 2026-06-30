import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'RxNotes — Health & Medicine Insights | RxReader Blog',
  description: 'RxNotes shares plain-English articles on prescriptions, medication safety, and healthcare technology to help patients make informed decisions.',
  alternates: {
    canonical: 'https://rxreader.vercel.app/rxnotes',
  },
};

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

export default function BlogHub() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            RxNotes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Plain-English insights on medicine, prescriptions, and healthcare technology.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/rxnotes/${post.slug}`} className="group">
              <article className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
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
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
