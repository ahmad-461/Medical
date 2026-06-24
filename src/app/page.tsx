import UploadBox from '@/components/UploadBox';
import JsonLd from '@/components/JsonLd';

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RxReader",
    "url": "https://rxreader.vercel.app",
    "description": "Free AI-powered prescription reader that explains medicines in plain English",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Read Any Doctor&apos;s Prescription Instantly
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Upload a photo of your prescription and get a plain-English explanation of every medicine, dosage, and instruction.
        </p>

        {/* Upload Box */}
        <UploadBox />
      </section>

      <JsonLd data={jsonLdData} />

      {/* Trust Strip */}
      <section className="w-full bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4 text-2xl">
                🔒
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Private & Secure</h3>
              <p className="text-sm text-slate-500">Your data is encrypted and handled with care.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Results in Seconds</h3>
              <p className="text-sm text-slate-500">Fast analysis powered by advanced AI.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4 text-2xl">
                🩺
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Plain English Explanations</h3>
              <p className="text-sm text-slate-500">No medical jargon. Just clear, simple info.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl border border-gray-100">
                📸
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Upload</h3>
              <p className="text-slate-600">Upload or photograph your prescription using your phone or computer.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl border border-gray-100">
                🤖
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Analyze</h3>
              <p className="text-slate-600">Our AI reads and analyzes every detail, from medication names to dosage instructions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl border border-gray-100">
                ✅
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Understand</h3>
              <p className="text-slate-600">Get a plain-English breakdown of your prescription instantly, clearly explained.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust RxReader Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Trust RxReader?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="text-2xl mt-1">🔒</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Images deleted after 24 hours</h3>
                <p className="text-sm text-slate-600">We prioritize your privacy. Your prescription images are never stored permanently.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="text-2xl mt-1">🚫</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">No account or signup required</h3>
                <p className="text-sm text-slate-600">Use the tool instantly without giving us your email or personal information.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="text-2xl mt-1">⚡</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Powered by Google Gemini AI</h3>
                <p className="text-sm text-slate-600">We use the latest state-of-the-art vision models for high accuracy reading.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl">
              <div className="text-2xl mt-1">🌍</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Used by patients in 10+ countries</h3>
                <p className="text-sm text-slate-600">A global community trusts RxReader for help with their prescriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
