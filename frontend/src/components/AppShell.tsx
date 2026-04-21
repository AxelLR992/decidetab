import { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/70 p-4 shadow-soft backdrop-blur md:p-8">
        <header className="mb-6 flex items-center justify-between rounded-3xl bg-brand.dark px-5 py-4">
          <h1 className="text-xl font-bold md:text-2xl">DecideTab</h1>
          <span className="rounded-full bg-brand.purple/40 px-4 py-1 text-sm">Orientación vocacional</span>
        </header>
        {children}
      </div>
    </main>
  );
}
