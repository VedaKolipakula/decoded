import { useState } from 'react';
import type { MiniQuestion } from '../../data/learnData';

const LETTERS = ['A', 'B', 'C', 'D'];

interface MiniQuestionBlockProps {
  mq: MiniQuestion;
  /** true once this mini-question has been answered correctly in a previous open of this lesson */
  done: boolean;
  onCorrect: () => void;
}

export function MiniQuestionBlock({ mq, done, onCorrect }: MiniQuestionBlockProps) {
  const [chosen, setChosen] = useState<number | boolean | null>(null);
  const revealed = done || chosen !== null;
  const isCorrect = mq.type === 'mc' ? done || chosen === mq.correct : done || chosen === mq.answer;

  function pick(value: number | boolean) {
    if (revealed) return;
    setChosen(value);
    const correct = mq.type === 'mc' ? value === mq.correct : value === mq.answer;
    if (correct) onCorrect();
  }

  return (
    <div className="my-1.5 rounded-2xl border-[1.5px] border-yellow-dark bg-yellow-pale p-3.5">
      <div className="mb-2 flex items-center gap-1.5 font-mono text-[9.5px] tracking-wide text-yellow-dark uppercase">
        🧮 {mq.type === 'mc' ? 'Quick check' : 'True or false'}
      </div>
      <div className="mb-2.5 text-[13px] leading-[1.45] font-semibold text-ink">{mq.q}</div>

      {mq.type === 'mc' ? (
        <div className="flex flex-col gap-1.5">
          {mq.options.map((opt, i) => {
            let state: 'default' | 'correct' | 'wrong' = 'default';
            if (revealed) {
              if (i === mq.correct) state = 'correct';
              else if (i === chosen) state = 'wrong';
            }
            return (
              <button
                key={opt}
                type="button"
                disabled={revealed}
                onClick={() => pick(i)}
                className={`flex items-center gap-2.5 rounded-[10px] border-[1.5px] px-3 py-2.5 text-left text-[12.5px] transition-colors ${
                  state === 'correct'
                    ? 'border-pink bg-pink-pale text-pink-dark'
                    : state === 'wrong'
                      ? 'border-[#D9553A] bg-[#fdf2f0] text-[#D9553A]'
                      : 'border-paper-line bg-white text-ink'
                }`}
              >
                <span className="w-4.5 shrink-0 font-mono text-[10px] font-bold text-ink-soft">{LETTERS[i]}</span>
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2">
          {[true, false].map((val) => {
            let state: 'default' | 'correct' | 'wrong' = 'default';
            if (revealed) {
              if (val === mq.answer) state = 'correct';
              else if (val === chosen) state = 'wrong';
            }
            return (
              <button
                key={String(val)}
                type="button"
                disabled={revealed}
                onClick={() => pick(val)}
                className={`flex-1 rounded-[10px] border-[1.5px] py-2.5 text-center font-mono text-[13px] font-bold transition-colors ${
                  state === 'correct'
                    ? 'border-pink bg-pink-pale text-pink-dark'
                    : state === 'wrong'
                      ? 'border-[#D9553A] bg-[#fdf2f0] text-[#D9553A]'
                      : 'border-paper-line bg-white text-ink'
                }`}
              >
                {val ? '✓ True' : '✗ False'}
              </button>
            );
          })}
        </div>
      )}

      {revealed && (
        <div
          className={`mt-1 rounded-b-[10px] px-3 py-2.5 text-[12px] leading-[1.5] ${
            isCorrect ? 'border-l-[3px] border-pink bg-pink-pale text-pink-dark' : 'border-l-[3px] border-[#D9553A] bg-[#fdf2f0] text-[#b33]'
          }`}
        >
          {isCorrect ? '✓ ' : '✗ '}
          {mq.explain}
        </div>
      )}
    </div>
  );
}
