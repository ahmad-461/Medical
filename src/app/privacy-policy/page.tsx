import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Privacy Policy — RxReader",
  description: "Read RxReader's privacy policy. We take your medical data seriously — prescription images are deleted within 24 hours and never used for AI training.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Read RxReader's privacy policy regarding medical data and image storage.",
    "url": "https://rxreader.vercel.app/privacy-policy"
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={jsonLdData} />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Privacy Policy — RxReader</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Effective Date: January 1, 2026</p>

      <div className="space-y-10 leading-relaxed text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
          <p>
            RxReader is designed to minimize data collection. We only collect the prescription images you upload and basic technical information (like browser type) necessary to provide the service. We do not require users to create accounts or provide personal names or contact information.
          </p>
          <p className="mt-2">
            When you upload a file, it is temporarily stored in our secure cloud storage. This technical data is used only to allow our AI to process the image and provide you with results. We do not link this information to your identity, ensuring your experience remains completely anonymous and private.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used solely to provide the prescription reading service. Your images are processed by our AI to generate a plain-English explanation. We do not use your data for marketing purposes or to build user profiles.
          </p>
          <p className="mt-2">
            The processing involves extracting text from your images and using medical reasoning to interpret abbreviations and dosage instructions. This allows us to present you with a structured, easy-to-read summary of your prescription. No human at RxReader ever views your images unless you specifically reach out for support and share them with us voluntarily.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Image Storage and Deletion</h2>
          <p>
            We take the security of your medical data very seriously. All uploaded prescription images are stored securely and are <strong>automatically deleted within 24 hours</strong>. We do not keep permanent copies of your images, and they are never used for AI training purposes.
          </p>
          <p className="mt-2">
            Our automated deletion system ensures that even if you forget to delete your data, our servers will handle it for you. This 24-hour window is provided only to allow you enough time to download or print your results before the original image is permanently erased from our cloud storage. Once deleted, the data is unrecoverable even by our own system administrators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. We Do Not Sell Your Data</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information or uploaded images to third parties for their own commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies and Analytics</h2>
          <p>
            We use Google Analytics 4 to understand how users interact with our site and to improve our service. Google Analytics may use cookies to collect anonymous usage data. You can opt-out of Google Analytics by using browser add-ons.
          </p>
          <p className="mt-2">
            The cookies used for analytics do not store any personally identifiable information. They help us track metrics such as how many people visit the site, which pages they find most useful, and what devices are used to access the service. This information is vital for us to keep the tool free and optimized for all users worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Third Party Services</h2>
          <p>
            We use a few trusted third-party services to operate RxReader:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Supabase:</strong> Provides secure cloud storage and database services.</li>
            <li><strong>Google Gemini:</strong> Our AI provider for processing and analyzing prescription images.</li>
            <li><strong>Vercel:</strong> Our hosting provider for delivering the RxReader website.</li>
          </ul>
          <p className="mt-4">
            Each of these providers has been chosen for their commitment to security and reliability. For instance, images sent to Google Gemini for analysis are not used to train their AI models, ensuring your medical data remains confidential. Vercel provides the global infrastructure that makes our site fast and accessible from any country in the world.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children&apos;s Privacy</h2>
          <p>
            RxReader is not intended for use by children under the age of 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at the top.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
