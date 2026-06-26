import { Metadata } from 'next';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Medical Disclaimer — RxReader",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-3xl font-bold mb-8">Medical Disclaimer</h1>

      <div className="space-y-6">
        <p className="font-bold">
          RxReader is not a medical device and has not been approved by any medical regulatory authority.
        </p>
        <p className="font-bold">
          All output is AI-generated and may contain errors, omissions, or inaccuracies.
        </p>
        <p className="font-bold">
          Never make any medical decision based solely on RxReader&apos;s output.
        </p>
        <p className="font-bold">
          Always consult a licensed doctor or pharmacist before taking any medication.
        </p>
        <p className="font-bold">
          RxReader and its creators are not liable for any harm, injury, or loss resulting from use of this tool.
        </p>
      </div>

      <div className="mt-12 text-sm text-slate-500">
        <p>
          The information provided by RxReader is for informational purposes only. We strive for accuracy but cannot guarantee it. Use of this application constitutes acceptance of this disclaimer.
        </p>
      </div>
    </div>
  );
}
