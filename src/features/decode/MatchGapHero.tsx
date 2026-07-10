interface MatchGapHeroProps {
  hasGap: boolean;
  label: string;
  value: string;
  sub: string;
  /** Shown when the number is a fallback estimate rather than the user's real survey answer. */
  note?: string;
}

export function MatchGapHero({ hasGap, label, value, sub, note }: MatchGapHeroProps) {
  return (
    <div
      className={`mb-1 rounded-[18px] px-[17px] pt-4.5 pb-4 text-white ${hasGap ? 'bg-pink-dark' : 'bg-[#3B7A57]'}`}
    >
      <div className="font-mono text-[10px] font-semibold tracking-wide text-white/85 uppercase">{label}</div>
      <div className="mt-1.5 font-serif text-[30px] font-bold">{value}</div>
      <div className="mt-1.5 text-[12px] leading-[1.5] text-white/90">{sub}</div>
      {note && (
        <div className="mt-2 border-t border-white/20 pt-2 text-[11px] leading-[1.5] text-white/70 italic">
          {note}
        </div>
      )}
    </div>
  );
}
