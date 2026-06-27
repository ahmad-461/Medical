import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💊</span>
              <span className="text-white font-bold text-lg">RxReader</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Free AI-powered prescription reader. Understand your medicines in plain English — instantly and privately.
            </p>
          </div>

          {/* Tools links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Tools & Guides</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-white transition-colors">AI Prescription Reader</a></li>
              <li><a href="/prescription-abbreviations" className="text-sm hover:text-white transition-colors">Prescription Abbreviations</a></li>
              <li><a href="/how-to-read-a-prescription" className="text-sm hover:text-white transition-colors">How to Read a Prescription</a></li>
              <li><a href="/faq" className="text-sm hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" className="text-sm hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/disclaimer" className="text-sm hover:text-white transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© 2026 RxReader. All rights reserved.</p>
          <p className="text-xs text-gray-600 text-center">
            ⚠️ For informational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
