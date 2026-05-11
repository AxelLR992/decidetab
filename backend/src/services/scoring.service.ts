import { pool } from '../config/db';
import { AreaResult, CalculateResultsPayload } from '../models/types';

const AREA_NAMES: Record<string, string> = {
  A: 'Cálculo',
  B: 'Científico-Físico',
  C: 'Científico-Biológico',
  D: 'Mecánico',
  E: 'Servicio Social',
  F: 'Literario',
  G: 'Persuasivo',
  H: 'Artístico',
  I: 'Musical'
};

const BUDGET_LIMITS: Record<string, number | null> = {
  A: 1500,
  B: 4000,
  C: null
};

function parseBudgetRangeCode(rawValue?: string): 'A' | 'B' | 'C' | null {
  if (!rawValue) return null;

  const normalized = rawValue
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (normalized in BUDGET_LIMITS) {
    return normalized as 'A' | 'B' | 'C';
  }

  const explicitRangeMatch = normalized.match(/RANGO\s*([ABC])\b/);
  if (explicitRangeMatch) {
    return explicitRangeMatch[1] as 'A' | 'B' | 'C';
  }

  if (/MENOS\s+DE\s*\$?\s*1[,.]?500/.test(normalized)) return 'A';
  if (/1[,.]?500\s*[–-]\s*\$?\s*4[,.]?000/.test(normalized)) return 'B';
  if (/MAS\s+DE\s*\$?\s*4[,.]?000/.test(normalized)) return 'C';

  return null;
}

function getBudgetLimit(rangeCode?: string): number | null {
  const parsedRangeCode = parseBudgetRangeCode(rangeCode);
  if (!parsedRangeCode) return 1500;
  return BUDGET_LIMITS[parsedRangeCode];
}

async function getAreaRawScores(testAnswers: Record<string, number>): Promise<Record<string, number>> {
  const { rows } = await pool.query<{ item_number: number; area: string }>(
    'SELECT item_number, area FROM hereford_items ORDER BY item_number'
  );

  const areaScores: Record<string, number> = {};

  for (const row of rows) {
    const answer = Number(testAnswers[String(row.item_number)] ?? 0);
    areaScores[row.area] = (areaScores[row.area] || 0) + answer;
  }

  return areaScores;
}

async function rawToPercentile(area: string, sex: 'M' | 'F', rawScore: number): Promise<number> {
  const { rows } = await pool.query<{ percentile: number; raw_score: number }>(
    `SELECT percentile, raw_score
     FROM percentile_norms
     WHERE area = $1 AND sex = $2
     ORDER BY raw_score ASC`,
    [area, sex]
  );

  if (!rows.length) return 1;

  let selected = rows[0].percentile;
  for (const row of rows) {
    if (rawScore >= row.raw_score) {
      selected = row.percentile;
    }
  }

  return selected;
}

async function getCareersForAreas(areas: string[], budgetLimit: number | null) {
  const { rows } = await pool.query<{
    id: number;
    area_hereford: string;
    career_name: string;
    university: string;
    monthly_cost_approx: string | null;
    modality: string;
    is_public: boolean;
    official_link: string | null;
  }>(
    `SELECT id, area_hereford, career_name, university, monthly_cost_approx, modality, is_public, official_link
     FROM careers
     WHERE area_hereford = ANY($1::char[])
     ORDER BY area_hereford, monthly_cost_approx NULLS LAST`,
    [areas]
  );

  const mapped = rows.map((career) => {
    const cost = career.monthly_cost_approx ? Number(career.monthly_cost_approx) : null;
    const exceedsBudget = budgetLimit !== null && cost !== null && cost > budgetLimit;

    return {
      ...career,
      monthly_cost_approx: cost,
      exceedsBudget,
      area_name: AREA_NAMES[career.area_hereford] || career.area_hereford
    };
  });

  return mapped.sort((a, b) => Number(a.exceedsBudget) - Number(b.exceedsBudget));
}

export async function calculateResults(payload: CalculateResultsPayload) {
  const areaRawScores = await getAreaRawScores(payload.testAnswers);

  const areaResults: AreaResult[] = [];
  for (const [area, rawScore] of Object.entries(areaRawScores)) {
    const percentile = await rawToPercentile(area, payload.sex, rawScore);
    areaResults.push({ area, rawScore, percentile });
  }

  areaResults.sort((a, b) => b.percentile - a.percentile || b.rawScore - a.rawScore);
  const dominantInterests = areaResults.slice(0, 3).map((result) => ({
    ...result,
    areaName: AREA_NAMES[result.area] || result.area
  }));

  const budgetCode = payload.socioeconomicAnswers['3'];
  const budgetLimit = getBudgetLimit(budgetCode);
  const careers = await getCareersForAreas(
    dominantInterests.slice(0, 1).map((d) => d.area),
    budgetLimit
  );

  return {
    dominantInterests,
    allAreaResults: areaResults.map((result) => ({
      ...result,
      areaName: AREA_NAMES[result.area] || result.area
    })),
    budget: {
      range: budgetCode,
      limit: budgetLimit
    },
    careers
  };
}
