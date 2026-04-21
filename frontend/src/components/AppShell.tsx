import { ReactNode, useState } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/70 p-4 shadow-soft backdrop-blur md:p-8">
        <header className="mb-6 flex items-center justify-between rounded-3xl bg-brand.dark px-5 py-4">
          <h1 className="text-xl font-bold md:text-2xl">DecideTab</h1>
          <span className="rounded-full bg-brand.purple/40 px-4 py-1 text-sm">Orientación vocacional</span>
        </header>

        {children}

        <footer className="mt-8 border-t border-slate-200/80 pt-4 text-center">
          <button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Acerca de
          </button>
        </footer>
      </div>

      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-800">Acerca de esta prueba</h2>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setIsAboutOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              Esta prueba fue diseñada en 1953 por el psicólogo Carl Hereford. El presente instrumento se utiliza con fines estrictamente educativos y sin ánimo de lucro, en apego a lo dispuesto en el artículo 148 de la Ley Federal del Derecho de Autor vigente en México. Asimismo, se reconoce la autoría original del instrumento base, empleándose únicamente como referencia para fines de orientación pedagógica
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
