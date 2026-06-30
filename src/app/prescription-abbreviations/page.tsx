import { Metadata } from 'next';
import Link from 'next/link';
import { abbreviations } from '@/data/abbreviations';
import JsonLd from '@/components/JsonLd';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Prescription Abbreviations Explained — Complete Guide",
  description: "Complete guide to prescription abbreviations like OD, BD, TDS, SOS, PRN and more.",
  alternates: {
    canonical: "/prescription-abbreviations",
  },
};

export default function AbbreviationsPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": abbreviations.map((abbr, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://rxreader.vercel.app/prescription-abbreviations/${abbr.slug}`,
      "name": abbr.code
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <JsonLd data={jsonLdData} />
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Prescription Abbreviations Explained</h1>
        <p className="text-slate-600 dark:text-gray-400">
          A complete guide to common medical abbreviations used by doctors on prescriptions. For a full step-by-step tutorial, see our <Link href="/how-to-read-a-prescription" className="text-blue-600 dark:text-blue-400 hover:underline">how to read a prescription guide</Link>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {abbreviations.map((abbr) => (
          <Link
            key={abbr.slug}
            href={`/prescription-abbreviations/${abbr.slug}`}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <div className="text-2xl font-bold text-[#2563EB] dark:text-blue-400 mb-2 group-hover:scale-105 transition-transform inline-block">
              {abbr.code}
            </div>
            <div className="font-semibold text-slate-900 dark:text-white mb-1">{abbr.full_form}</div>
            <p className="text-sm text-slate-500 dark:text-gray-400 line-clamp-2">{abbr.plain_english}</p>
          </Link>
        ))}
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Complete Guide to Prescription Abbreviations and Their Meanings
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Prescription abbreviations are shorthand codes that doctors use when writing prescriptions. Most of these abbreviations come from Latin — the historical language of medicine — and have been used by doctors for centuries. While these codes save time for medical professionals, they can be confusing and even intimidating for patients who receive a prescription without any explanation of what the letters mean.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Understanding prescription abbreviations is an important part of medication safety. Misreading an abbreviation can lead to taking a medicine at the wrong time, in the wrong dose, or in the wrong way. For example, confusing OD (once daily) with BD (twice daily) would mean taking half your prescribed dose — potentially reducing the medicine&apos;s effectiveness. Confusing AC (before meals) with PC (after meals) could affect how well a medicine is absorbed by your body.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Most Common Prescription Frequency Abbreviations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Frequency abbreviations tell you how many times per day to take a medicine. The most common ones are OD (once daily), BD or BID (twice daily), TDS or TID (three times daily), and QID (four times daily). These abbreviations come from Latin phrases — OD from &quot;Omne Die,&quot; BD from &quot;Bis Die,&quot; TDS from &quot;Ter Die Sumendum,&quot; and QID from &quot;Quater In Die.&quot;
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Numeric codes like 1-0-1, 1-1-1, and 0-0-1 are also commonly used, particularly in South Asian countries including Pakistan, India, and Bangladesh. These three-number codes represent morning, afternoon, and night doses respectively. So 1-0-1 means one tablet in the morning and one at night with no afternoon dose, while 1-1-1 means one tablet three times daily and 0-0-1 means one tablet at night only. These numeric codes are especially common on handwritten prescriptions from Pakistani and Indian doctors.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Prescription Timing Abbreviations Explained
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Timing abbreviations tell you when to take your medicine in relation to meals or sleep. AC means &quot;Ante Cibum&quot; or before meals — usually 30 minutes before eating. PC means &quot;Post Cibum&quot; or after meals — typically taken with or immediately after food to reduce stomach irritation. HS means &quot;Hora Somni&quot; or at bedtime — usually taken just before sleeping. These timing instructions are medically important and not just suggestions from your doctor.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Some medicines like Metformin must be taken with food to reduce nausea and stomach upset. Some medicines like Levothyroxine (thyroid medicine) must be taken on an empty stomach in the morning for proper absorption into the bloodstream. Some medicines like sleeping aids, muscle relaxants, or antihistamines are prescribed HS specifically because they cause drowsiness that would be problematic during the day. Always follow the timing instruction on your prescription exactly as your doctor intended.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            As-Needed and Urgent Prescription Abbreviations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Some medicines are not taken on a fixed daily schedule but only when specific symptoms occur. SOS (Si Opus Sit) and PRN (Pro Re Nata) both mean &quot;as needed&quot; or &quot;when necessary.&quot; These abbreviations are typically used for pain relievers, antacids, anti-nausea medicines, and emergency inhalers for asthma. STAT means &quot;Statim&quot; which is Latin for immediately — this instruction means take the dose right away and is commonly used in hospital settings or for acute situations requiring urgent treatment.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Understanding the difference between a regular scheduled prescription and an as-needed prescription is critically important for safe medicine use. Regular medicines prescribed OD, BD, or TDS should never be skipped without first consulting your doctor, even if you feel better. As-needed medicines should only be taken when symptoms actually occur and should not be taken preventively unless your doctor specifically instructs this. Taking SOS or PRN medicines too frequently can cause dependency or mask underlying symptoms that need medical attention.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Route of Administration Abbreviations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Prescriptions also include abbreviations that tell you how to take or apply the medicine. PO (Per Os) means by mouth — swallow the tablet, capsule, or liquid orally. TOP means topical application — apply the cream, gel, or ointment directly to the skin at the affected area only. INH means inhalation — breathe the medicine in through an inhaler or nebulizer so it reaches your lungs directly. MDI stands for Metered Dose Inhaler — a specific type of pressurized inhaler device that releases a precisely measured puff of medicine each time you press it.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Using the wrong route of administration can make a medicine completely ineffective or even dangerous. Using an inhaler incorrectly means the medicine never actually reaches your lungs and your breathing condition will not improve. Accidentally taking a topical medicine orally could cause serious side effects. If you are unsure about how to use any medicine on your prescription, always ask your pharmacist for a full demonstration before leaving the pharmacy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Tips for Understanding Your Prescription Abbreviations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The best approach to understanding your prescription is to use multiple resources together. First, use RxReader to upload a photo of your prescription and get an instant plain-English breakdown of every medicine and abbreviation. Second, use the abbreviation guide on this page to look up any specific codes you want to understand better. Third, always confirm your understanding with your pharmacist before starting any new medicine — pharmacists are specially trained to counsel patients on correct medicine use and are available at every pharmacy without an appointment.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Prescription literacy is a critical but frequently overlooked health skill. Patients who fully understand their own prescriptions are significantly less likely to experience medication errors, dangerous drug interactions, or missed doses that reduce treatment effectiveness. By learning the common prescription abbreviations on this page, you are taking a meaningful step toward better personal health management. Read more about patient safety and education on our <Link href="/rxnotes" className="text-blue-600 dark:text-blue-400 hover:underline">RxNotes blog</Link>.
          </p>
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link
          href="/"
          className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block"
        >
          Try RxReader Now
        </Link>
      </div>
    </div>
  );
}
