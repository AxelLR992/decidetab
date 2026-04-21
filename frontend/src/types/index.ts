export type Sex = 'M' | 'F';

export interface Profile {
  name: string;
  institution: string;
  sex: Sex;
}

export interface OptionItem {
  value: string;
  label: string;
}

export interface SocioeconomicQuestion {
  id: number;
  section: string;
  question_number: number;
  question_text: string;
  options: OptionItem[];
}

export interface HerefordItem {
  id: number;
  item_number: number;
  text: string;
  area: string;
}

export interface DominantInterest {
  area: string;
  areaName: string;
  rawScore: number;
  percentile: number;
}

export interface CareerResult {
  id: number;
  area_hereford: string;
  area_name: string;
  career_name: string;
  university: string;
  monthly_cost_approx: number | null;
  modality: string;
  exceedsBudget: boolean;
  is_public: boolean;
}

export interface AreaInterest {
  area: string;
  areaName: string;
  rawScore: number;
  percentile: number;
}

export interface ResultsResponse {
  dominantInterests: DominantInterest[];
  allAreaResults: AreaInterest[];
  careers: CareerResult[];
}
