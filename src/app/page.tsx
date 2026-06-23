import UploadBox from '@/components/UploadBox';

export default function Home() {
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
    </div>
  );
}
