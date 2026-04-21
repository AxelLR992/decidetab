import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { ProgressBar } from "../components/ProgressBar";
import { useSession } from "../context/SessionContext";
import { calculateResults, getTestItems } from "../services/api";
import { HerefordItem } from "../types";

const SCALE = [1, 2, 3, 4, 5];
const PAGE_SIZE = 10;

export function TestPage() {
  const navigate = useNavigate();
  const {
    profile,
    socioeconomicAnswers,
    testAnswers,
    setTestAnswers,
    setResults,
  } = useSession();
  const [items, setItems] = useState<HerefordItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>(testAnswers);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) navigate("/");
    if (!Object.keys(socioeconomicAnswers).length) navigate("/socioeconomico");
  }, [profile, socioeconomicAnswers, navigate]);

  useEffect(() => {
    getTestItems()
      .then(setItems)
      .catch(() => setError("No se pudo cargar el test Hereford."));
  }, []);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const currentItems = useMemo(
    () => items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [items, page],
  );

  const completion = items.length
    ? (Object.keys(answers).length / items.length) * 100
    : 0;

  const validateCurrentPage = () =>
    currentItems.every(
      (item) => Number(answers[String(item.item_number)]) >= 1,
    );

  const nextPage = async () => {
    if (!validateCurrentPage()) {
      setError("Responde todos los ítems de la página actual.");
      return;
    }

    setError("");
    setTestAnswers(answers);

    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
      return;
    }

    if (!profile) return;

    setLoading(true);
    try {
      const result = await calculateResults({
        sex: profile.sex,
        testAnswers: answers,
        socioeconomicAnswers,
      });
      setResults({
        dominantInterests: result.dominantInterests,
        careers: result.careers,
      });
      navigate("/resultados");
    } catch {
      setError("No se pudieron calcular los resultados. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="card mb-4 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Test Hereford</h2>
          <span className="text-sm font-medium text-slate-500">
            Página {page + 1} de {Math.max(totalPages, 1)}
          </span>
        </div>
        <ProgressBar value={completion} />
      </div>

      <div className="space-y-3">
        {currentItems.map((item) => (
          <div key={item.id} className="card p-4">
            <p className="mb-3 text-slate-800">
              {item.item_number}. {item.text}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {SCALE.map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [String(item.item_number)]: value,
                    }))
                  }
                  className={`rounded-xl border px-2 py-2 text-sm ${
                    answers[String(item.item_number)] === value
                      ? "border-brand.purple bg-brand.purple"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="rounded-2xl border border-slate-300 px-5 py-3 disabled:opacity-40"
        >
          Anterior
        </button>

        <div className="text-center text-sm text-slate-600">
          1 = Me desagrada mucho · 5 = Me gusta mucho
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={loading}
          className="rounded-2xl bg-brand.orange px-5 py-3 font-semibold disabled:opacity-60"
        >
          {page === totalPages - 1
            ? loading
              ? "Calculando..."
              : "Ver resultados"
            : "Siguiente"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </AppShell>
  );
}
