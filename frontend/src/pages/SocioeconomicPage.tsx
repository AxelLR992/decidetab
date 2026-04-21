import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { QuestionCard } from '../components/QuestionCard';
import { useSession } from '../context/SessionContext';
import { getSocioeconomicQuestions } from '../services/api';
import { SocioeconomicQuestion } from '../types';

export function SocioeconomicPage() {
  const navigate = useNavigate();
  const { profile, socioeconomicAnswers, setSocioeconomicAnswers } = useSession();
  const [questions, setQuestions] = useState<SocioeconomicQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>(socioeconomicAnswers);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!profile) navigate('/');
  }, [profile, navigate]);

  useEffect(() => {
    getSocioeconomicQuestions()
      .then(setQuestions)
      .catch(() => setError('No se pudieron cargar las preguntas socioeconómicas.'));
  }, []);

  const onContinue = () => {
    const missing = questions.some((q) => !answers[String(q.question_number)]);
    if (missing) {
      setError('Responde las 8 preguntas para continuar.');
      return;
    }

    setSocioeconomicAnswers(answers);
    navigate('/test');
  };

  return (
    <AppShell>
      <div className="card mb-4 bg-brand.blue/10 p-4 text-slate-700">
        Perfil: <strong>{profile?.name}</strong> · {profile?.institution}
      </div>

      <div className="card mb-5 border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
        <p className="mb-2 font-semibold text-slate-800">Instrucciones para el cuestionario socioeconómico</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Lee cada pregunta con calma y elige una sola opción por reactivo.</li>
          <li>Responde con datos reales para que las recomendaciones sean más precisas.</li>
          <li>En la pregunta de presupuesto mensual, selecciona el rango que mejor se ajuste a tu situación.</li>
        </ul>
      </div>

      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          title={`${question.section} · P${question.question_number}. ${question.question_text}`}
        >
          <div className="grid gap-2">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-slate-50">
                <input
                  type="radio"
                  name={`q-${question.question_number}`}
                  value={option.value}
                  checked={answers[String(question.question_number)] === option.value}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [String(question.question_number)]: e.target.value
                    }))
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </QuestionCard>
      ))}

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="flex justify-end">
        <button onClick={onContinue} className="rounded-2xl bg-brand.purple px-6 py-3 font-semibold">
          Ir al test Hereford
        </button>
      </div>
    </AppShell>
  );
}
