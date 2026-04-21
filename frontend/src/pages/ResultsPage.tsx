import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { useSession } from '../context/SessionContext';

export function ResultsPage() {
  const navigate = useNavigate();
  const { profile, results } = useSession();

  useEffect(() => {
    if (!profile) navigate('/');
    if (!results) navigate('/test');
  }, [profile, results, navigate]);

  if (!results) return null;

  return (
    <AppShell>
      <div className="card mb-5 bg-gradient-to-r from-brand.lavender to-brand.blue p-5">
        <h2 className="text-2xl font-bold">Resultados de {profile?.name}</h2>
        <p className="text-sm">Top 3 intereses dominantes según percentil Hereford.</p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {results.dominantInterests.map((interest) => (
          <article key={interest.area} className="card p-5">
            <p className="text-xs uppercase text-slate-500">Área {interest.area}</p>
            <h3 className="text-lg font-bold text-slate-800">{interest.areaName}</h3>
            <p className="mt-2 text-3xl font-black text-brand.orange">P{interest.percentile}</p>
            <p className="text-sm text-slate-500">Puntaje bruto: {interest.rawScore}</p>
          </article>
        ))}
      </section>

      <section>
        <h3 className="mb-4 text-xl font-bold text-slate-800">Carreras sugeridas</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {results.careers.map((career) => (
            <article
              key={career.id}
              className={`card border p-4 ${career.exceedsBudget ? 'border-orange-300 bg-orange-50' : 'border-transparent'}`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <h4 className="font-semibold text-slate-800">{career.career_name}</h4>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">Área {career.area_hereford}</span>
              </div>
              <p className="text-sm text-slate-600">{career.university}</p>
              <p className="text-sm text-slate-600">Modalidad: {career.modality}</p>
              <p className="text-sm text-slate-600">
                Costo mensual aprox.: {career.monthly_cost_approx ? `$${career.monthly_cost_approx.toLocaleString('es-MX')}` : 'N/D'}
              </p>
              {career.exceedsBudget && (
                <p className="mt-2 rounded-lg bg-orange-200 px-2 py-1 text-xs font-semibold text-orange-900">
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
