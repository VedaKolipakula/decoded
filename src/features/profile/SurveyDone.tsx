interface SurveyDoneProps {
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
}

export function SurveyDone({ title, description, primaryLabel, onPrimary, secondaryLabel, onSecondary }: SurveyDoneProps) {
  return (
    <div className="flex flex-col items-center px-2 pt-10 pb-6 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow">
        <span className="text-[24px] text-[#1D9E75]">✓</span>
      </div>
      <div className="mb-2 font-serif text-[18px] font-semibold text-ink">{title}</div>
      <p className="mb-7 text-[13px] leading-[1.6] text-ink-soft">{description}</p>
      <button
        type="button"
        onClick={onPrimary}
        className="w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        onClick={onSecondary}
        className="mt-3 w-full rounded-full border-[1.5px] border-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-ink"
      >
        {secondaryLabel}
      </button>
    </div>
  );
}
