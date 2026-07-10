import type { ReactNode } from 'react';
import { fmtD, projectionSeries } from '../../lib/calculations';

const YEAR_LABELS = ['Year 1', 'Year 5', 'Year 10'];

interface ProjectionPanelProps {
  title: string;
  pillOptions: number[];
  selectedPct: number;
  onSelect: (pct: number) => void;
  annualContribution: number;
  calloutText: ReactNode;
}

export function ProjectionPanel({
  title,
  pillOptions,
  selectedPct,
  onSelect,
  annualContribution,
  calloutText,
}: ProjectionPanelProps) {
  const points = projectionSeries(annualContribution);
  const max = Math.max(...points, 1);

  return (
    <div className="mb-3.5 rounded-[20px] border border-paper-line bg-card p-4.5 shadow-[0_1px_2px_rgba(26,26,26,0.06),0_8px_20px_rgba(26,26,26,0.08)]">
      <h3 className="mb-2.5 font-serif text-[15px] font-semibold text-ink">{title}</h3>

      <div className="mb-1.5 flex flex-wrap gap-2">
        {pillOptions.map((pct) => (
          <button
            key={pct}
            type="button"
            onClick={() => onSelect(pct)}
            className={`rounded-full border-[1.5px] px-3.5 py-1.5 font-mono text-[11px] ${
              pct === selectedPct
                ? 'border-ink bg-ink text-white'
                : 'border-paper-line bg-card text-ink-soft'
            }`}
          >
            {pct}%
          </button>
        ))}
      </div>

      <div className="mt-3.5 flex flex-col gap-2.5">
        {points.map((val, i) => {
          const pw = Math.max(6, (val / max) * 100);
          return (
            <div key={i} className="flex items-center justify-between gap-2.5 rounded-xl bg-pink-pale px-3.5 py-2.5">
              <div>
                <div className="font-mono text-[10px] tracking-wide text-pink-dark uppercase">{YEAR_LABELS[i]}</div>
                <div className="mt-1.5 h-2 w-15 overflow-hidden rounded-md bg-white">
                  <div className="h-full rounded-md bg-pink transition-[width] duration-400" style={{ width: `${pw}%` }} />
                </div>
              </div>
              <div className="font-mono text-[16px] font-semibold text-ink">{fmtD(val)}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-r-xl border-l-4 border-yellow-dark bg-yellow-pale px-3.5 py-3 text-[12.5px] leading-[1.5] text-[#5a4820]">
        {calloutText}
      </div>
    </div>
  );
}
