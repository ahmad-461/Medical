'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <span className="text-xl font-bold text-white">RxReader</span>
            <span className="hidden sm:inline-block text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium ml-1 border border-white/30">FREE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/prescription-abbreviations" className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Abbreviations</Link>
            <Link href="/how-to-read-a-prescription" className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">How to Read</Link>
            <Link href="/faq" className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">FAQ</Link>
            <Link href="/rxnotes" className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">Blog</Link>
            <div className="relative group">
              <button className="text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-1">
                More Tools <span className="text-xs">▾</span>
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  <Link href="/drug-interaction-checker" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors">
                    <span>🔍</span>
                    <div>
                      <div className="font-medium">Drug Interaction Checker</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Check medicine safety</div>
                    </div>
                  </Link>
                  <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed rounded-lg">
                    <span>🧪</span>
                    <div>
                      <div className="font-medium">Lab Report Explainer</div>
                      <div className="text-xs text-gray-500">Coming Soon</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed rounded-lg">
                    <span>👶</span>
                    <div>
                      <div className="font-medium">Child Dose Calculator</div>
                      <div className="text-xs text-gray-500">Coming Soon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/#upload" className="ml-2 bg-white text-blue-600 text-sm font-bold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-md">
              Read Prescription
            </Link>
          </nav>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-blue-100 hover:bg-white/10" aria-label="Toggle dark mode">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-blue-500 py-3 flex flex-col gap-1 pb-4">
            <Link href="/prescription-abbreviations" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors">📖 Abbreviations</Link>
            <Link href="/how-to-read-a-prescription" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors">📋 How to Read</Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors">❓ FAQ</Link>
            <Link href="/rxnotes" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors">📝 Blog</Link>
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">More Tools</p>
              <Link href="/drug-interaction-checker" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm text-blue-100 hover:text-white">
                🔍 Drug Interaction Checker
              </Link>
              <span className="flex items-center gap-2 py-2 text-sm text-blue-300/50">
                🧪 Lab Report Explainer <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">Soon</span>
              </span>
              <span className="flex items-center gap-2 py-2 text-sm text-blue-300/50">
                👶 Child Dose Calculator <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">Soon</span>
              </span>
            </div>
            <div className="px-3 pt-2">
              <Link href="/#upload" onClick={() => setOpen(false)} className="block bg-white text-blue-600 text-sm font-bold px-4 py-2.5 rounded-lg text-center hover:bg-blue-50 transition-colors">
                💊 Read Prescription
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
