'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Abbreviations', href: '/prescription-abbreviations' },
    { name: 'How to Read', href: '/how-to-read-a-prescription' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#2563EB]">
          RxReader
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <span className="relative group text-gray-400 cursor-not-allowed text-sm font-medium">
            More Tools
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Coming Soon
            </span>
          </span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="px-3 py-2 text-base font-medium text-gray-400 flex items-center gap-2">
            More Tools <span className="text-xs text-gray-400">(Coming Soon)</span>
          </div>
        </div>
      )}
    </header>
  );
}
