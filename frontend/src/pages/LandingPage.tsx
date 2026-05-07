import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { AppShell } from '../components/AppShell';

export function LandingPage() {
  const navigate = useNavigate();
  const { setProfile, resetSession } = useSession();
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [sex, setSex] = useState<'M' | 'F' | ''>('');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !institution.trim() || !sex) {
      setError('Completa todos los campos para continuar.');
      return;
    }

    resetSession();
    setProfile({ name: name.trim(), institution: institution.trim(), sex });
    navigate('/socioeconomico');
  };

  const onFillDevData = () => {
    setName('Estudiante Demo');
    setInstitution('Preparatoria Demo Tabasco');
    setSex('F');
    setError('');
  };

  return (
    <AppShell>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card bg-gradient-to-br from-brand.purple to-brand.lavender p-6">
          <h2 className="mb-3 text-3xl font-bold">Descubre tu camino</h2>
          <p className="text-sm md:text-base">
            DecideTab te ayuda a identificar tus intereses vocacionales y sugerir carreras acordes a tu perfil.
          </p>
          <div className="mt-4 rounded-2xl bg-white/20 p-4 text-sm">
            <p className="mb-2 font-semibold">¿Cómo funciona la prueba?</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Completa tu perfil inicial y responde el cuestionario socioeconómico.</li>
              <li>Contesta el test Hereford calificando cada afirmación del 1 al 5.</li>
              <li>Revisa tus intereses dominantes y las carreras sugeridas para ti.</li>
            </ol>
          </div>
          <p className="mt-4 rounded-2xl bg-white/20 p-3 text-sm font-medium">
            ⚠️ Los datos y resultados se perderán al cerrar la pestaña.
          </p>
        </div>

        <form onSubmit={onSubmit} className="card p-6">
          <h3 className="mb-4 text-2xl font-semibold text-slate-800">Perfil inicial</h3>
          <div className="space-y-4">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Nombre del estudiante"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Institución de procedencia"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
            <select
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={sex}
              onChange={(e) => setSex(e.target.value as 'M' | 'F' | '')}
            >
              <option value="">Selecciona sexo</option>
              <option value="M">Hombre</option>
              <option value="F">Mujer</option>
            </select>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {import.meta.env.DEV && (
            <button
              type="button"
              onClick={onFillDevData}
              className="mt-6 w-full rounded-2xl border border-brand.blue bg-brand.blue/10 px-4 py-3 font-semibold text-slate-700 hover:bg-brand.blue/20"
            >
              Rellenar datos de prueba
            </button>
          )}

          <button className="mt-3 w-full rounded-2xl bg-brand.orange px-4 py-3 font-semibold hover:brightness-95">
            Continuar
          </button>
        </form>
      </section>
    </AppShell>
  );
}
