import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-green-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💊</span>
              <span className="text-white font-bold text-xl">RxReader</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
              Free AI-powered prescription reader. Understand your medicines in plain English — instantly, accurately, and privately.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs bg-blue-900/50 text-blue-400 border border-blue-800 px-3 py-1 rounded-full">🤖 Gemini AI</span>
              <span className="text-xs bg-green-900/50 text-green-400 border border-green-800 px-3 py-1 rounded-full">✓ Free Forever</span>
              <span className="text-xs bg-purple-900/50 text-purple-400 border border-purple-800 px-3 py-1 rounded-full">🔒 Private</span>
            </div>
          </div>

          {/* Tools column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tools & Guides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>💊</span> AI Prescription Reader
                </Link>
              </li>
              <li>
                <Link href="/prescription-abbreviations" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>📖</span> Abbreviations Guide
                </Link>
              </li>
              <li>
                <Link href="/how-to-read-a-prescription" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>📋</span> How to Read
                </Link>
              </li>
              <li>
                <Link href="/drug-interaction-checker" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>🔍</span> Drug Interaction Checker
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>❓</span> FAQ
                </Link>
              </li>
              <li><Link href="/rxnotes" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"><span>📝</span> RxNotes Blog</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>ℹ️</span> About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>✉️</span> Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>🔒</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>⚠️</span> Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p className="text-xs text-gray-600">© 2026 RxReader. All rights reserved.</p>
            <span className="text-gray-800 hidden sm:inline">·</span>
            <p className="text-xs text-gray-600">Built with ❤️ for patients worldwide</p>
          </div>
          <p className="text-xs text-amber-600/80 text-center sm:text-right">
            ⚠️ Informational only — not a substitute for medical advice
          </p>
        </div>
      </div>
    </footer>
  );
}
