import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Interaction Checker — Free AI Medicine Safety Tool | RxReader',
  description: 'Check if your medicines are safe to take together. Free AI-powered drug interaction checker — instant results, plain English explanations.',
  alternates: {
    canonical: '/drug-interaction-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
