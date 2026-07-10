import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider text-pink-dark uppercase before:h-px before:w-3.5 before:bg-pink before:content-['']">
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="m-0 mb-1 font-serif text-[20px] font-semibold text-ink">{children}</h2>;
}

export function SectionSub({ children }: { children: ReactNode }) {
  return <p className="m-0 mb-4 text-[12.5px] text-ink-soft">{children}</p>;
}

export function Tear() {
  return (
    <div className="relative my-6 -mx-4.5 h-px border-t-2 border-dashed border-paper-line">
      <span className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-paper shadow-[inset_0_0_0_2px_var(--color-paper-line)]" />
      <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-paper shadow-[inset_0_0_0_2px_var(--color-paper-line)]" />
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mb-3.5 rounded-[20px] border border-paper-line bg-card p-4.5 shadow-[0_1px_2px_rgba(26,26,26,0.06),0_8px_20px_rgba(26,26,26,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function BigTotalCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="mb-1 rounded-[18px] bg-ink px-[17px] pt-4.5 pb-4 text-white">
      <div className="font-mono text-[10px] font-semibold tracking-wide text-white/65 uppercase">{label}</div>
      <div className="mt-1 font-serif text-[27px] font-bold">{value}</div>
      <div className="mt-1 text-[11px] text-white/70">{sub}</div>
    </div>
  );
}

export function RowVal({
  badgeColor,
  badgeText,
  title,
  sub,
  value,
}: {
  badgeColor: string;
  badgeText: string;
  title: string;
  sub?: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-paper-line py-2.5 last:border-b-0">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] text-[12px] font-bold text-white"
        style={{ background: badgeColor }}
      >
        {badgeText}
      </div>
      <div className="flex-1">
        <div className="text-[12.5px] font-semibold text-ink">{title}</div>
        {sub && <div className="text-[10.5px] text-ink-soft">{sub}</div>}
      </div>
      <div className="font-mono text-[12.5px] font-semibold whitespace-nowrap text-ink">{value}</div>
    </div>
  );
}

export function LedgerRow({
  label,
  sub,
  value,
  negative = false,
  muted = false,
}: {
  label: string;
  sub?: string;
  value: string;
  negative?: boolean;
  muted?: boolean;
}) {
  return (
    <tr className="border-b border-paper-line last:border-b-0">
      <td className="py-2.5 text-[12.5px] text-ink-soft">
        {label}
        {sub && <div className="text-[10.5px] text-ink-soft/70">{sub}</div>}
      </td>
      <td
        className={`py-2.5 text-right font-mono text-[12.5px] font-medium ${negative ? 'text-[#D9553A]' : muted ? 'text-ink-soft' : 'text-ink'}`}
      >
        {value}
      </td>
    </tr>
  );
}

export function LedgerTotalRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t-2 border-ink">
      <td className="pt-3 text-[12.5px] font-bold text-ink">{label}</td>
      <td className="pt-3 text-right font-mono text-[15px] font-bold text-pink-dark">{value}</td>
    </tr>
  );
}

const CALLOUT_VARIANTS = {
  yellow: 'bg-yellow-pale border-yellow-dark text-[#5a4820]',
  pink: 'bg-pink-pale border-pink text-pink-dark',
  green: 'bg-green-soft border-[#3B7A57] text-ink',
} as const;

export function CalloutCard({
  variant = 'yellow',
  children,
  className = '',
}: {
  variant?: keyof typeof CALLOUT_VARIANTS;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-4 rounded-r-xl border-l-4 px-3.5 py-3 text-[12.5px] leading-[1.5] ${CALLOUT_VARIANTS[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  label,
  active,
  onClick,
  variant = 'ink',
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: 'ink' | 'pink';
}) {
  const activeClass = variant === 'pink' ? 'border-pink bg-pink text-white' : 'border-ink bg-ink text-white';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-[1.5px] px-3.5 py-1.5 font-mono text-[11px] ${
        active ? activeClass : 'border-paper-line bg-card text-ink-soft'
      }`}
    >
      {label}
    </button>
  );
}

/** Radio-style single-select option — the reference's `.option`, shared by both surveys. */
export function SingleOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-2.5 flex items-center gap-2 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[13px] text-ink transition-colors ${
        selected ? 'border-yellow-dark bg-yellow-pale' : 'border-paper-line bg-card'
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
          selected ? 'border-yellow-dark bg-yellow-dark' : 'border-paper-line'
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}

/** Checkbox-style multi-select option — the reference's `.multi-opt`. */
export function MultiOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-2.5 flex items-center gap-2 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[13px] transition-colors ${
        selected ? 'border-pink bg-pink-pale text-pink-dark' : 'border-paper-line bg-card text-ink'
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] text-[10px] ${
          selected ? 'border-pink bg-pink text-white' : 'border-paper-line'
        }`}
      >
        {selected && '✓'}
      </span>
      {label}
    </button>
  );
}

/** Continuous fill progress bar — the reference's `.progress-bar`, used by the surveys. */
export function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="mb-4.5 h-[5px] rounded-[2px] bg-paper-line">
      <div className="h-full rounded-[2px] bg-pink transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </div>
  );
}
