export interface Abbreviation {
  slug: string;
  code: string;
  full_form: string;
  plain_english: string;
  example: string;
  related: string[];
}

export const abbreviations: Abbreviation[] = [
  { slug: "od", code: "OD", full_form: "Once Daily (Omne Die)", plain_english: "Take this medicine once every day at the same time.", example: "Amoxicillin 500mg OD — Take one tablet once every day.", related: ["bd", "tds", "qid"] },
  { slug: "bd", code: "BD", full_form: "Twice Daily (Bis Die)", plain_english: "Take this medicine two times a day, usually morning and night.", example: "Paracetamol 500mg BD — Take one tablet in the morning and one at night.", related: ["od", "tds", "qid"] },
  { slug: "tds", code: "TDS", full_form: "Three Times Daily (Ter Die Sumendum)", plain_english: "Take this medicine three times a day, usually morning, afternoon, and night.", example: "Metronidazole 400mg TDS — Take one tablet three times daily.", related: ["od", "bd", "qid"] },
  { slug: "qid", code: "QID", full_form: "Four Times Daily (Quater In Die)", plain_english: "Take this medicine four times a day, spread evenly throughout the day.", example: "Ibuprofen 200mg QID — Take one tablet every 6 hours.", related: ["od", "bd", "tds"] },
  { slug: "hs", code: "HS", full_form: "At Bedtime (Hora Somni)", plain_english: "Take this medicine at bedtime, just before you sleep.", example: "Melatonin 3mg HS — Take one tablet at bedtime.", related: ["od", "ac", "pc"] },
  { slug: "sos", code: "SOS", full_form: "If Needed (Si Opus Sit)", plain_english: "Take this medicine only when you need it, not on a regular schedule.", example: "Antacid SOS — Take one tablet only when you feel acidity or heartburn.", related: ["prn", "stat"] },
  { slug: "prn", code: "PRN", full_form: "As Needed (Pro Re Nata)", plain_english: "Take this medicine as needed when symptoms occur, not at fixed times.", example: "Paracetamol 500mg PRN — Take one tablet when you have pain or fever.", related: ["sos", "stat"] },
  { slug: "ac", code: "AC", full_form: "Before Meals (Ante Cibum)", plain_english: "Take this medicine before eating your meal, usually 30 minutes before.", example: "Metformin 500mg AC — Take one tablet 30 minutes before your meal.", related: ["pc", "hs"] },
  { slug: "pc", code: "PC", full_form: "After Meals (Post Cibum)", plain_english: "Take this medicine after eating your meal to reduce stomach irritation.", example: "Ibuprofen 400mg PC — Take one tablet after meals.", related: ["ac", "hs"] },
  { slug: "stat", code: "STAT", full_form: "Immediately (Statim)", plain_english: "Take this medicine immediately, right now, as an urgent dose.", example: "Aspirin 325mg STAT — Take one tablet immediately.", related: ["sos", "prn"] },
  { slug: "npo", code: "NPO", full_form: "Nothing by Mouth (Nil Per Os)", plain_english: "Do not eat or drink anything, usually before surgery or a medical procedure.", example: "NPO after midnight — Do not eat or drink anything after 12am before your procedure.", related: ["stat", "ac"] },
  { slug: "po", code: "PO", full_form: "By Mouth (Per Os)", plain_english: "Take this medicine orally, by swallowing it.", example: "Amoxicillin 500mg PO — Swallow the tablet with water.", related: ["top", "inh"] },
  { slug: "top", code: "TOP", full_form: "Topical Application", plain_english: "Apply this medicine directly on the skin at the affected area.", example: "Clotrimazole cream TOP — Apply a thin layer on the affected skin area.", related: ["po", "inh"] },
  { slug: "inh", code: "INH", full_form: "Inhalation", plain_english: "Take this medicine by breathing it in through an inhaler or nebulizer.", example: "Salbutamol INH — Use the inhaler to breathe in the medicine during an asthma attack.", related: ["po", "top", "mdi"] },
  { slug: "mdi", code: "MDI", full_form: "Metered Dose Inhaler", plain_english: "Use the pressurized inhaler device to take a measured puff of medicine.", example: "Salbutamol MDI 2 puffs BD — Take 2 puffs from your inhaler twice daily.", related: ["inh"] },
  { slug: "1-0-1", code: "1-0-1", full_form: "Morning and Night Dosing", plain_english: "Take one tablet in the morning, skip the afternoon dose, and take one tablet at night.", example: "Amlodipine 5mg 1-0-1 — Take one tablet in the morning and one at night.", related: ["1-1-1", "0-0-1", "1-0-0"] },
  { slug: "1-1-1", code: "1-1-1", full_form: "Three Times Daily Dosing", plain_english: "Take one tablet in the morning, one in the afternoon, and one at night.", example: "Paracetamol 500mg 1-1-1 — Take one tablet three times a day.", related: ["1-0-1", "tds"] },
  { slug: "0-0-1", code: "0-0-1", full_form: "Night Dose Only", plain_english: "Take this medicine only at night before sleeping. No morning or afternoon dose.", example: "Atorvastatin 10mg 0-0-1 — Take one tablet only at night.", related: ["1-0-0", "hs", "1-0-1"] },
  { slug: "1-0-0", code: "1-0-0", full_form: "Morning Dose Only", plain_english: "Take this medicine only in the morning. No afternoon or night dose.", example: "Levothyroxine 50mcg 1-0-0 — Take one tablet every morning on an empty stomach.", related: ["0-0-1", "od", "ac"] }
];
