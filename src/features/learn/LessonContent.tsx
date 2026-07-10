import type { Lesson } from '../../data/learnData';
import { MiniQuestionBlock } from './MiniQuestionBlock';

interface LessonContentProps {
  chapterIdx: number;
  lessonIdx: number;
  lessonCount: number;
  lesson: Lesson;
  miniQDone: Record<string, boolean>;
  onAnswerCorrect: (key: string) => void;
  onClose: () => void;
  onAllDone: () => void;
}

export function LessonContent({
  chapterIdx,
  lessonIdx,
  lessonCount,
  lesson,
  miniQDone,
  onAnswerCorrect,
  onClose,
  onAllDone,
}: LessonContentProps) {
  const allDone = lesson.sections.every((_, si) => miniQDone[`${chapterIdx}-${lessonIdx}-${si}`]);

  return (
    <div>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 font-mono text-[10px] tracking-wide text-pink-dark uppercase">
            Ch.{chapterIdx + 1} · Lesson {lessonIdx + 1} of {lessonCount}
          </div>
          <h3 className="m-0 font-serif text-[17px] text-ink">
            {lesson.icon} {lesson.title}
          </h3>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 pl-2 text-[22px] text-ink-soft">
          ×
        </button>
      </div>

      {lesson.sections.map((sec, si) => (
        <div key={sec.head} className={si > 0 ? 'mt-4 border-t border-dashed border-paper-line pt-4' : ''}>
          <div className="mb-1.5 font-mono text-[10.5px] font-bold tracking-wide text-pink-dark uppercase">{sec.head}</div>
          <p className="mb-3.5 text-[13px] leading-[1.65] text-ink">{sec.body}</p>
          <MiniQuestionBlock
            mq={sec.miniQ}
            done={!!miniQDone[`${chapterIdx}-${lessonIdx}-${si}`]}
            onCorrect={() => onAnswerCorrect(`${chapterIdx}-${lessonIdx}-${si}`)}
          />
        </div>
      ))}

      <div className="mt-5">
        {allDone && (
          <button
            type="button"
            onClick={() => {
              onAllDone();
              onClose();
            }}
            className="mb-2 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
          >
            🎉 All done — mark complete!
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-full border-[1.5px] border-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-ink"
        >
          ✓ Done — close lesson
        </button>
      </div>
    </div>
  );
}
