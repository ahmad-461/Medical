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

        <main className="flex-grow pt-8 sm:pt-12">
          {children}
        </main>

        <footer className="border-t border-gray-200 py-8 mt-auto bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 text-center md:text-left">
                <p className="font-semibold text-gray-900">© 2026 RxReader</p>
                <p>For informational purposes only</p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link href="/about" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">About</Link>
                <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy Policy</Link>
                <Link href="/disclaimer" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Disclaimer</Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Contact</Link>
                <Link href="/prescription-abbreviations" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Abbreviations</Link>
                <Link href="/faq" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">FAQ</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
