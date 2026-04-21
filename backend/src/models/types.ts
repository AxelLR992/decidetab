export type Sex = 'M' | 'F';

export interface CalculateResultsPayload {
  sex: Sex;
  testAnswers: Record<string, number>;
  socioeconomicAnswers: Record<string, string>;
}

export interface AreaResult {
  area: string;
  rawScore: number;
  percentile: number;
}
