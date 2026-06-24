import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — RxReader",
  description: "Have a question or feedback about RxReader? Get in touch with our team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Contact Us — RxReader</h1>

      <div className="space-y-8 leading-relaxed text-gray-700">
        <p className="text-lg">
          We&apos;d love to hear from you — whether it&apos;s a bug report, feedback, or a general question about the platform.
        </p>

        <div className="py-6">
          <a
            href="mailto:contact@rxreader.com"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Email Us: contact@rxreader.com
          </a>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-bold text-gray-900">Medical Questions</h3>
            <p className="text-sm">
              For medical questions, please consult your doctor or pharmacist — we are not able to provide medical advice or interpretation of your specific health situation.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900">Response Time</h3>
            <p className="text-sm">
              We are a small team, but we aim to respond to all inquiries within 2–3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
