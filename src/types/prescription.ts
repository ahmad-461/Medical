export interface Medicine {
  name: string;
  dosage: string;
  frequency_code: string;
  frequency_plain: string;
  duration: string;
  instructions: string;
  confidence: "high" | "medium" | "low";
}

export interface PrescriptionResult {
  medicines: Medicine[];
  doctor_notes: string;
  overall_confidence: "high" | "medium" | "low";
  unreadable_fields: string[];
}
