import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <header className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#2563EB]">
              RxReader
            </Link>
            <div className="flex items-center">
              <a href="#" className="text-sm font-medium text-slate-500 pointer-events-none opacity-50">
                More Tools
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-grow pt-8 sm:pt-12">
          {children}
        </main>

        <footer className="border-t border-slate-100 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
            <p>© 2026 RxReader · For informational purposes only · Not medical advice</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
