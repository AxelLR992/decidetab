import { HerefordItem, ResultsResponse, SocioeconomicQuestion } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function getTestItems(): Promise<HerefordItem[]> {
  const response = await fetch(`${API_BASE}/test-items`);
  if (!response.ok) throw new Error('Error al cargar ítems');
  return response.json();
}

export async function getSocioeconomicQuestions(): Promise<SocioeconomicQuestion[]> {
  const response = await fetch(`${API_BASE}/socioeconomic-questions`);
  if (!response.ok) throw new Error('Error al cargar preguntas socioeconómicas');
  return response.json();
}

export async function calculateResults(payload: {
  sex: 'M' | 'F';
  testAnswers: Record<string, number>;
  socioeconomicAnswers: Record<string, string>;
}): Promise<ResultsResponse> {
  const response = await fetch(`${API_BASE}/calculate-results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('No se pudieron calcular resultados');
  return response.json();
}
