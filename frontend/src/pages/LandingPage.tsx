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

  return (
    <AppShell>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card bg-gradient-to-br from-brand.purple to-brand.lavender p-6 text-white">
          <h2 className="mb-3 text-3xl font-bold">Descubre tu camino</h2>
          <p className="text-sm md:text-base">
            DecideTab te ayuda a identificar tus intereses vocacionales y sugerir carreras acordes a tu perfil.
          </p>
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

          <button className="mt-6 w-full rounded-2xl bg-brand.orange px-4 py-3 font-semibold text-white hover:brightness-95">
            Continuar
          </button>
        </form>
      </section>
    </AppShell>
  );
}
