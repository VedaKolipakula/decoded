import { useState } from 'react';
import type { ChapterQuiz } from '../../data/learnData';

const LETTERS = ['A', 'B', 'C', 'D'];
const PASS_RATIO = 0.67;

interface ChapterQuizContentProps {
  chapterIdx: number;
  quiz: ChapterQuiz;
  onPass: () => void;
  onClose: () => void;
}

export function ChapterQuizContent({ chapterIdx, quiz, onPass, onClose }: ChapterQuizContentProps) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const total = quiz.questions.length;
  const question = quiz.questions[qIdx];
  const isLast = qIdx === total - 1;
  const passThreshold = Math.ceil(total * PASS_RATIO);

  function answer(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === question.correct) setScore((s) => s + 1);
  }

  function continueQuiz() {
    if (isLast) setShowResults(true);
    else {
      setQIdx((q) => q + 1);
      setChosen(null);
    }
  }

  function retry() {
    setQIdx(0);
    setScore(0);
    setChosen(null);
    setShowResults(false);
  }

  if (showResults) {
    const passed = score >= passThreshold;
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-wide text-pink-dark uppercase">Chapter {chapterIdx + 1} results</div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[22px] text-ink-soft">
            ×
          </button>
        </div>
        <div className="pt-6 pb-4 text-center">
          <div className="mb-3 text-[52px]">{passed ? '🎉' : '💪'}</div>
          <h3 className="mb-2 font-serif text-[20px] font-semibold text-ink">{passed ? 'Chapter complete!' : 'Almost there!'}</h3>
          <p className="mb-5 text-[13px] text-ink-soft">
            You got <strong>{score} of {total}</strong> correct.{' '}
            {passed ? "You've unlocked the next chapter!" : `You need ${passThreshold}/${total} to pass.`}
          </p>
          {passed ? (
            <button
              type="button"
              onClick={onPass}
              className="w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
            >
              Unlock Chapter {chapterIdx + 2} →
            </button>
          ) : (
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={retry}
                className="w-full rounded-full bg-pink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
              >
                Retry quiz
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border-[1.5px] border-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-ink"
              >
                Review lessons first
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-wide text-pink-dark uppercase">{quiz.title}</div>
          <div className="mt-0.5 font-mono text-[11px] text-ink-soft">
            Question {qIdx + 1} of {total}
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="text-[22px] text-ink-soft">
          ×
        </button>
      </div>
      <div className="mb-4 h-[5px] overflow-hidden rounded-[4px] bg-paper-line">
        <div
          className="h-full rounded-[4px] bg-pink transition-[width] duration-300"
          style={{ width: `${(qIdx / total) * 100}%` }}
        />
      </div>

      <p className="mb-3 text-[14px] leading-[1.5] font-semibold text-ink">{question.q}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          let state: 'default' | 'correct' | 'wrong' = 'default';
          if (chosen !== null) {
            if (i === question.correct) state = 'correct';
            else if (i === chosen) state = 'wrong';
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={chosen !== null}
              onClick={() => answer(i)}
              className={`flex items-center gap-2.5 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[13px] transition-colors ${
                state === 'correct'
                  ? 'border-pink bg-pink-pale text-pink-dark'
                  : state === 'wrong'
                    ? 'border-[#D9553A] bg-[#fdf2f0] text-[#D9553A]'
                    : 'border-paper-line bg-paper text-ink'
              }`}
            >
              <span className="w-5 shrink-0 font-mono text-[11px] font-semibold">{LETTERS[i]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div className="mt-3">
          <div
            className={`rounded-r-xl border-l-[3px] px-3 py-2.5 text-[12.5px] leading-[1.5] text-ink ${
              chosen === question.correct ? 'border-pink bg-pink-pale' : 'border-[#D9553A] bg-[#fdf2f0]'
            }`}
          >
            <strong>{chosen === question.correct ? '✓ Correct!' : '✗ Not quite.'}</strong> {question.explain}
          </div>
          <button
            type="button"
            onClick={continueQuiz}
            className="mt-3 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
          >
            {isLast ? 'See results →' : 'Next question →'}
          </button>
        </div>
      )}
    </div>
  );
}
