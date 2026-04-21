export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full rounded-full bg-slate-200">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-brand.purple to-brand.blue transition-all"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}
