import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { AppShell } from '../components/AppShell';
import { useSession } from '../context/SessionContext';
import { CareerResult } from '../types';

const AREA_META: Record<string, string> = {
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

const AREA_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const BASE_COLORS = ['#7C6CFF', '#5FA8FF', '#8B7CFF', '#6D8DFF', '#98A8FF', '#7CB7FF', '#A69CFF', '#8CC2FF', '#B6ACFF'];
const TOP_COLORS = ['#FF8F3F', '#FF6B6B', '#FFB347'];

function normalizeKeywordForOcc(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getEmploymentLinks(careerName: string) {
  const occKeyword = normalizeKeywordForOcc(careerName);
  const encodedKeyword = encodeURIComponent(careerName);

  return {
    occ: `https://www.occ.com.mx/empleos/de-${occKeyword}/en-tabasco/`,
    linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodedKeyword}&location=Tabasco%2C%20Mexico`,
    indeed: `https://mx.indeed.com/jobs?q=${encodedKeyword}&l=Tabasco`
  };
}

function EmploymentButtons({ career }: { career: CareerResult }) {
  const links = getEmploymentLinks(career.career_name);

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-3">
      <a
        href={links.occ}
        target="_blank"
        rel="noreferrer noopener"
        className="rounded-xl bg-brand.purple px-3 py-2 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#6b5df0]"
      >
        Ver en OCC Mundial
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noreferrer noopener"
        className="rounded-xl bg-brand.blue px-3 py-2 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4a97f2]"
      >
        Ver en LinkedIn
      </a>
      <a
        href={links.indeed}
        target="_blank"
        rel="noreferrer noopener"
        className="rounded-xl bg-brand.orange px-3 py-2 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#ef934b]"
      >
        Ver en Indeed
      </a>
    </div>
  );
}

export function ResultsPage() {
  const navigate = useNavigate();
  const { profile, results } = useSession();

  useEffect(() => {
    if (!profile) navigate('/');
    if (!results) navigate('/test');
  }, [profile, results, navigate]);

  const chartData = useMemo(() => {
    if (!results) return [];

    const scoresByArea = new Map(results.allAreaResults.map((item) => [item.area, item.rawScore]));
    const topAreaSet = new Set(results.dominantInterests.map((item) => item.area));

    let topColorIndex = 0;
    return AREA_ORDER.map((area, index) => {
      const isTop = topAreaSet.has(area);
      const color = isTop ? TOP_COLORS[topColorIndex++] ?? TOP_COLORS[TOP_COLORS.length - 1] : BASE_COLORS[index];

      return {
        area,
        areaName: AREA_META[area],
        rawScore: scoresByArea.get(area) ?? 0,
        isTop,
        color
      };
    });
  }, [results]);

  if (!results) return null;

  return (
    <AppShell>
      <div className="card mb-5 bg-gradient-to-r from-brand.lavender to-brand.blue p-5">
        <h2 className="text-2xl font-bold">Resultados de {profile?.name}</h2>
        <p className="text-sm">Top 3 intereses dominantes según percentil Hereford.</p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {results.dominantInterests.map((interest) => (
          <article key={interest.area} className="card p-5 transition hover:-translate-y-0.5">
            <p className="text-xs uppercase text-slate-500">Área {interest.area}</p>
            <h3 className="text-lg font-bold text-slate-800">{interest.areaName}</h3>
            <p className="mt-2 text-3xl font-black text-brand.orange">P{interest.percentile}</p>
            <p className="text-sm text-slate-500">Puntaje bruto: {interest.rawScore}</p>
          </article>
        ))}
      </section>

      <section className="card mb-6 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Puntajes por área (A-I)</h3>
            <p className="text-sm text-slate-600">Las barras resaltadas representan tus 3 áreas dominantes.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="inline-block h-3 w-3 rounded-full bg-brand.purple" />
            <span>Áreas generales</span>
            <span className="ml-3 inline-block h-3 w-3 rounded-full bg-brand.orange" />
            <span>Top 3 dominantes</span>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="area"
                tick={{ fill: '#475569', fontSize: 12 }}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={70}
              />
              <YAxis tick={{ fill: '#475569', fontSize: 12 }} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'rgba(124,108,255,0.08)' }}
                contentStyle={{ borderRadius: 12, borderColor: '#CBD5E1' }}
                formatter={(value) => {
                  const numericValue = typeof value === 'number' ? value : Number(value ?? 0);
                  return [`${numericValue} puntos`, 'Puntaje bruto'];
                }}
                labelFormatter={(label) => {
                  const labelText = String(label ?? '');
                  return `${labelText} · ${AREA_META[labelText] ?? ''}`;
                }}
              />
              <Bar dataKey="rawScore" radius={[10, 10, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell key={entry.area} fill={entry.color} stroke={entry.isTop ? '#F97316' : 'transparent'} strokeWidth={entry.isTop ? 1 : 0} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {chartData.map((item) => (
            <p key={item.area} className={`text-xs ${item.isTop ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
              <span className="mr-1">{item.area}:</span>
              {item.areaName}
            </p>
          ))}
        </div>
      </section>

      <section className="card mb-6 border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-800">¿Cómo interpretar tus resultados?</p>
        <p className="mt-2">
          <strong>Percentiles (P):</strong> P70 significa que tu puntaje está en el percentil 70, es decir, superaste al 70% de los estudiantes evaluados en esta área.
        </p>
        <p className="mt-2">
          <strong>⚠️ Advertencia de Costo:</strong> Las carreras marcadas con advertencia de costo superan el presupuesto mensual que indicaste en el cuestionario socioeconómico.
        </p>
      </section>

      <section>
        <h3 className="mb-4 text-xl font-bold text-slate-800">Carreras sugeridas</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {results.careers.map((career) => (
            <article
              key={career.id}
              className={`card border p-4 transition hover:-translate-y-0.5 hover:shadow-soft ${
                career.exceedsBudget ? 'border-orange-300 bg-orange-50' : 'border-transparent'
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <h4 className="font-semibold text-slate-800">{career.career_name}</h4>
              </div>
              <p className="text-sm text-slate-600">{career.university}</p>
              <p className="text-sm text-slate-600">Modalidad: {career.modality}</p>
              <p className="text-sm text-slate-600">
                Costo mensual aprox.: {career.monthly_cost_approx ? `$${career.monthly_cost_approx.toLocaleString('es-MX')}` : 'N/D'}
              </p>

              <EmploymentButtons career={career} />

              {career.exceedsBudget && (
                <p className="mt-3 rounded-lg bg-orange-200 px-2 py-1 text-xs font-semibold text-orange-900">
                  ⚠️ Advertencia de Costo
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
