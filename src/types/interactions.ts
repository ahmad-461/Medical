export interface DrugInteraction {
  drug_a: string;
  drug_b: string;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
}

export interface InteractionResult {
  overall_safety: 'safe' | 'caution' | 'dangerous';
  summary: string;
  interactions: DrugInteraction[];
  general_advice: string;
  consult_doctor: boolean;
}
