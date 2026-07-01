import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from '@/components/ThemeProvider';
import RxAssistChat from '@/components/RxAssistChat';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RxReader — Free AI Prescription Reader',
  description: "Upload any doctor's prescription and get a plain-English explanation of every medicine, dosage, and instruction. Free, instant, and private.",
  metadataBase: new URL('https://rxreader.vercel.app'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <RxAssistChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
