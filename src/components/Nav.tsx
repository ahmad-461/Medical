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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">💊</span>
          <span className="text-xl font-bold text-blue-600">RxReader</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="relative group flex items-center">
            <span className="text-gray-400 cursor-not-allowed text-sm font-medium">
              More Tools
            </span>
            <span className="ml-1 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Soon</span>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
              Coming Soon
            </span>
          </div>
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
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
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
