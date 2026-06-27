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
            <span className="relative group cursor-not-allowed px-3 py-2">
              <span className="text-sm font-medium text-blue-300">More Tools</span>
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                Coming Soon
              </span>
            </span>
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
            <span className="px-3 py-2 text-sm text-blue-300 flex items-center gap-2">
              🔧 More Tools
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Coming Soon</span>
            </span>
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
