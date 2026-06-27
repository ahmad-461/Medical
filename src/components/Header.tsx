'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            <span className="text-xl font-bold text-blue-600">RxReader</span>
            <span className="hidden sm:inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium ml-1">FREE</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/prescription-abbreviations" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Abbreviations</a>
            <a href="/how-to-read-a-prescription" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">How to Read</a>
            <a href="/faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
            <span className="relative group text-sm font-medium text-gray-400 cursor-not-allowed">
              More Tools
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Coming Soon
              </span>
            </span>
            <a href="/#upload" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Read Prescription
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4 px-2">
            <a
              href="/prescription-abbreviations"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              Abbreviations
            </a>
            <a
              href="/how-to-read-a-prescription"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              How to Read
            </a>
            <a
              href="/faq"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              FAQ
            </a>
            <span className="text-sm text-gray-400">
              More Tools <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Coming Soon</span>
            </span>
            <a
              href="/#upload"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-blue-700"
              onClick={closeMenu}
            >
              Read Prescription
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
