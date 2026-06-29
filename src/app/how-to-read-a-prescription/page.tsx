import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How to Read a Doctor's Prescription — Step by Step Guide",
  description: "Learn how to read a doctor's prescription with our simple step-by-step guide.",
};

export default function HowToReadPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Read a Doctor's Prescription — Step by Step Guide",
    "description": "Learn how to read a doctor's prescription with our simple step-by-step guide.",
    "author": {
      "@type": "Organization",
      "name": "RxReader"
    }
  };

  return (
    <div className="flex flex-col">
      <JsonLd data={jsonLdData} />
      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">How to Read a Doctor&apos;s Prescription — Step by Step Guide</h1>

        <h2>1. What is a Prescription?</h2>
        <p>
          A prescription is a formal instruction from a licensed healthcare professional to a pharmacist, authorizing them to dispense specific medication to a patient. It contains vital information about the medication, dosage, and usage instructions.
        </p>

        <h2>2. Parts of a Prescription</h2>
        <p>
          A typical prescription includes several key sections: the doctor&apos;s information, patient information, the superscription (the Rx symbol), the inscription (medication name and strength), the subscription (instructions to the pharmacist), and the signa (instructions to the patient).
        </p>

        <h2>3. How to Read the Medicine Name</h2>
        <p>
          The medicine name is usually written clearly, but sometimes brand names are used instead of generic names. It&apos;s important to understand both, as they contain the same active ingredients.
        </p>

        <h2>4. Understanding Dosage and Strength</h2>
        <p>
          Strength refers to the amount of active ingredient in each unit (e.g., 500mg), while dosage refers to the amount you take at one time (e.g., one tablet).
        </p>

        <h2>5. Decoding Frequency Abbreviations</h2>
        <p>
          Doctors often use Latin abbreviations to indicate how often to take medicine. For example, &quot;OD&quot; means once daily. You can find a full list of these in our <Link href="/prescription-abbreviations">Prescription Abbreviations Guide</Link>.
        </p>

        <h2>6. Special Instructions (AC, PC, HS)</h2>
        <p>
          Some medications must be taken at specific times relative to meals. &quot;AC&quot; means before meals, &quot;PC&quot; means after meals, and &quot;HS&quot; means at bedtime.
        </p>

        <h2>7. When to Ask Your Pharmacist</h2>
        <p>
          If any part of your prescription is unclear, or if you have questions about side effects or drug interactions, always consult your pharmacist. They are experts in medication and are there to help you.
        </p>

        <h2>8. Try Our Free AI Prescription Reader</h2>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            A Complete Patient Guide to Reading and Understanding Prescriptions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A prescription is a legal medical document written by a licensed doctor that authorizes a patient to receive a specific medicine from a pharmacist. Every element of a prescription has a specific purpose and contains important information about how, when, and why a medicine should be taken. Learning to read your own prescription gives you greater control over your health and helps you catch potential errors before they cause harm.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Research consistently shows that patients who understand their prescriptions are more likely to take their medicines correctly, experience better treatment outcomes, and report fewer medication-related side effects. Despite this, many patients leave the doctor&apos;s office without fully understanding what has been prescribed for them or why. This guide aims to change that by walking you through every element of a standard prescription in plain, everyday language.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            The Standard Format of a Doctor&apos;s Prescription
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            While prescription formats vary between countries and individual doctors, most prescriptions follow a standard structure. At the top you will find the doctor&apos;s details including name, qualifications, clinic address, and contact number. Below this is the patient&apos;s information — name, age, and sometimes weight or gender, which affects dosing calculations. The date the prescription was written is also important as prescriptions are usually only valid for a limited period of time ranging from a few days to several months depending on the medicine and your country&apos;s regulations.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The main body of the prescription begins with the Rx symbol — short for &quot;Recipe&quot; meaning &quot;take&quot; in Latin. This symbol marks the beginning of the medicine instructions. Each medicine listed will include the medicine name (generic or brand), the strength or dosage, the frequency code, the duration of treatment, and any special instructions. A doctor may prescribe one medicine or an entire list of medicines on the same prescription sheet covering different health conditions simultaneously.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Understanding Medicine Names on a Prescription
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Medicines appear on prescriptions under two types of names — generic names and brand names. The generic name is the official medical name for the active ingredient, such as Paracetamol, Amoxicillin, or Metformin. The brand name is the commercial name given by the pharmaceutical company that manufactures the medicine, such as Panadol for Paracetamol, Augmentin for Amoxicillin with Clavulanate, or Glucophage for Metformin.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Doctors may write either the generic or brand name depending on their preference or your country&apos;s medical system. In most cases pharmacists can substitute a generic medicine for a brand-name medicine unless the doctor specifies otherwise by writing &quot;brand necessary&quot; or similar instructions. Generic medicines contain the same active ingredient at the same dose and are required by law to be therapeutically equivalent to the brand-name version — and they typically cost significantly less, making them an important option for patients managing healthcare costs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            How to Read the Dosage and Strength Correctly
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The dosage on a prescription tells you both the amount of medicine per dose and the strength of each tablet, capsule, or milliliter. For example &quot;Amoxicillin 500mg BD&quot; means take one 500mg Amoxicillin tablet twice daily. The 500mg is the strength of each tablet and BD tells you the frequency. If a prescription says &quot;Amoxicillin 500mg 1 BD&quot; the number 1 confirms you should take one tablet at each dose. If it says &quot;2 BD&quot; you take two tablets at each dose.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For liquid medicines dosage is usually expressed in milliliters or teaspoons. For example &quot;Amoxicillin suspension 250mg/5ml — 10ml BD&quot; means take 10ml of the suspension twice daily — this delivers a total dose of 500mg per day. This liquid format is commonly used for children&apos;s medicines where a tablet or capsule is difficult to swallow. Always use the measuring spoon or syringe provided with liquid medicines rather than a regular household spoon which is not accurately calibrated.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Common Prescription Reading Mistakes to Avoid
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            One of the most common prescription reading mistakes is confusing the frequency with the total daily dose. If your prescription says &quot;Paracetamol 500mg 2 tablets BD&quot; this means take 2 tablets twice daily — a total of 4 tablets or 2000mg per day. Some patients mistakenly take 2 tablets only once per day halving their effective dose and reducing treatment effectiveness. Understanding that BD means two separate dosing occasions per day is essential for correct medicine use.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Another extremely common mistake is not completing the full duration of treatment. If a prescription says &quot;Amoxicillin 500mg BD x 5/7&quot; the x 5/7 means for 5 days. Stopping an antibiotic course early because you feel better is one of the leading causes of antibiotic resistance worldwide and greatly increases the risk of your infection returning stronger and harder to treat. Always complete the full duration prescribed by your doctor even if your symptoms have completely resolved before the course is finished.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Using Technology to Help Read Prescriptions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Modern AI tools like RxReader have made it significantly easier for patients to understand their prescriptions without needing a medical background. By uploading a photo of your prescription to RxReader, you receive an instant plain-English breakdown of every medicine, dosage, frequency, duration, and special instruction on the page. The tool decodes all Latin abbreviations automatically and flags any fields where the handwriting was unclear so you know exactly which details to verify with your pharmacist.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Using a prescription reader tool does not replace the need to consult your doctor or pharmacist — it complements those interactions by helping you arrive better prepared with specific questions. When you understand what your prescription says before reaching the pharmacy you are better positioned to notice if the wrong medicine or dose has been dispensed, to ask meaningful questions about potential side effects, and to understand how your medicines work together as part of your overall treatment plan.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Link
          href="/"
          className="bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors inline-block"
        >
          Use RxReader AI
        </Link>
      </div>
    </div>
  );
}
