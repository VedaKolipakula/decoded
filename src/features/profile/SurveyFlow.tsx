import { useState } from 'react';
import type { SurveyQuestion } from '../../data/surveysData';
import type { SurveyAnswers } from '../../app/SurveyContext';
import { MultiOption, ProgressBar, SectionSub, SectionTitle, SingleOption } from '../../components/ui';

interface SurveyFlowProps {
  title: string;
  subtitle: string;
  questions: SurveyQuestion[];
  initialAnswers?: SurveyAnswers;
  onComplete: (answers: SurveyAnswers) => void;
  onExit: () => void;
}

export function SurveyFlow({ title, subtitle, questions, initialAnswers, onComplete, onExit }: SurveyFlowProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(initialAnswers ?? questions.map(() => []));

  const question = questions[step];
  const selected = answers[step];
  const isLast = step === questions.length - 1;
  const canContinue = selected.length > 0;

  function toggle(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      if (question.type === 'single') {
        next[step] = [optionIndex];
      } else {
        const current = next[step];
        next[step] = current.includes(optionIndex)
          ? current.filter((i) => i !== optionIndex)
          : [...current, optionIndex];
      }
      return next;
    });
  }

  function back() {
    if (step === 0) onExit();
    else setStep((s) => s - 1);
  }

  function goNext() {
    if (!canContinue) return;
    if (isLast) onComplete(answers);
    else setStep((s) => s + 1);
  }

  return (
    <div>
      <div className="mb-3.5 flex items-center gap-2">
        <button
          type="button"
          onClick={back}
          aria-label="Back"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-[18px] text-pink-dark"
        >
          ←
        </button>
        <div>
          <SectionTitle>{title}</SectionTitle>
        </div>
      </div>
      <SectionSub>{subtitle}</SectionSub>

      <ProgressBar pct={((step + 1) / questions.length) * 100} />

      <div className="mb-1.5 font-mono text-[11px] text-ink-soft">{question.step}</div>
      <div className="mb-3 text-[13px] leading-[1.5] font-medium text-ink">{question.q}</div>

      <div className="flex flex-col">
        {question.opts.map((opt, i) =>
          question.type === 'single' ? (
            <SingleOption key={opt} label={opt} selected={selected.includes(i)} onClick={() => toggle(i)} />
          ) : (
            <MultiOption key={opt} label={opt} selected={selected.includes(i)} onClick={() => toggle(i)} />
          ),
        )}
      </div>

      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          onClick={back}
          className="flex-1 rounded-full border-[1.5px] border-ink px-2.5 py-2.5 font-mono text-[13px] text-ink"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={goNext}
          className="flex-1 rounded-full bg-ink px-2.5 py-2.5 font-mono text-[13px] text-white disabled:opacity-40"
        >
          {isLast ? 'Save answers' : 'Next'}
        </button>
      </div>
    </div>
  );
}
