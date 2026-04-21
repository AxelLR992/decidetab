import { ReactNode } from 'react';

export function QuestionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card mb-4 p-5">
      <h3 className="mb-3 text-lg font-semibold text-slate-800">{title}</h3>
      {children}
    </div>
  );
}
