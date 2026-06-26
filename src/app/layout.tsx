import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RxReader - AI Prescription Reader",
  description: "Read Any Doctor's Prescription Instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900 antialiased min-h-screen flex flex-col`}>
        <Nav />

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Row 1: Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💊</span>
                  <span className="text-xl font-bold text-white">RxReader</span>
                </Link>
                <p className="text-sm text-gray-400">Making prescriptions easy to understand for everyone, everywhere.</p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Tools</h4>
                <ul className="space-y-2">
                  <li><Link href="/prescription-abbreviations" className="text-gray-400 hover:text-white text-sm transition">Abbreviations</Link></li>
                  <li><Link href="/how-to-read-a-prescription" className="text-gray-400 hover:text-white text-sm transition">How to Read</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition">About</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link></li>
                  <li><Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm transition">Disclaimer</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition">Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Row 2: Copyright */}
            <div className="pt-8 text-center md:text-left">
              <p className="text-xs text-gray-500">
                © 2026 RxReader — For informational purposes only. Not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
