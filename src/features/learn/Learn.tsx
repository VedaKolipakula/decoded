import { useState } from 'react';
import { learnChapters } from '../../data/learnData';
import { Eyebrow, SectionSub, SectionTitle } from '../../components/ui';
import { Modal } from '../../components/Modal';
import { useToast } from '../../app/ToastContext';
import { RoadmapNode } from './RoadmapNode';
import { LessonContent } from './LessonContent';
import { ChapterQuizContent } from './ChapterQuizContent';

const TOTAL_CHAPTERS = learnChapters.length;

export function Learn() {
  const { showToast } = useToast();
  const [lessonRead, setLessonRead] = useState<Record<string, boolean>>({});
  const [miniQDone, setMiniQDone] = useState<Record<string, boolean>>({});
  const [chapterDone, setChapterDone] = useState<boolean[]>(() => learnChapters.map(() => false));
  const [activeLesson, setActiveLesson] = useState<{ ch: number; lesson: number } | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);

  function chapterUnlocked(ch: number): boolean {
    return ch === 0 || chapterDone[ch - 1];
  }

  function readCount(ch: number): number {
    return learnChapters[ch].lessons.filter((_, li) => lessonRead[`${ch}-${li}`]).length;
  }

  function openLesson(ch: number, li: number) {
    setLessonRead((prev) => ({ ...prev, [`${ch}-${li}`]: true }));
    setActiveLesson({ ch, lesson: li });
  }

  function handleQuizGateClick(ch: number) {
    if (!chapterUnlocked(ch)) {
      showToast(`Complete Chapter ${ch} first to unlock this 🔒`);
      return;
    }
    const total = learnChapters[ch].lessons.length;
    const done = readCount(ch);
    if (done < total) {
      showToast(`Read all ${total} lessons first — ${total - done} to go 📖`);
      return;
    }
    setActiveQuiz(ch);
  }

  function handleLessonAllDone(ch: number) {
    const total = learnChapters[ch].lessons.length;
    const done = readCount(ch);
    const remaining = total - done;
    if (remaining <= 0) showToast(`All lessons read! Take the Chapter ${ch + 1} Quiz 🎉`);
    else showToast(`${remaining} lesson${remaining > 1 ? 's' : ''} left in Chapter ${ch + 1}`);
  }

  function handleQuizPass(ch: number) {
    setChapterDone((prev) => {
      const next = [...prev];
      next[ch] = true;
      return next;
    });
    setActiveQuiz(null);
    const nowDone = chapterDone.filter(Boolean).length + 1;
    showToast(
      nowDone < TOTAL_CHAPTERS
        ? `Chapter ${ch + 1} complete! Chapter ${ch + 2} unlocked 🎉`
        : `🎓 Roadmap complete — you're financially literate!`,
    );
  }

  const doneChapters = chapterDone.filter(Boolean).length;
  const pct = (doneChapters / TOTAL_CHAPTERS) * 100;

  return (
    <div>
      <Eyebrow>Financial literacy roadmap</Eyebrow>
      <SectionTitle>Level up, chapter by chapter.</SectionTitle>
      <SectionSub>Read every lesson &amp; answer the mini-checks, then pass the chapter quiz.</SectionSub>

      <div className="mb-4 rounded-[20px] border border-pink-mid bg-pink-pale p-4">
        <h3 className="m-0 mb-1.5 font-serif text-[16px] text-ink">Your progress</h3>
        <p className="m-0 text-[12px] text-ink-soft">
          {doneChapters} of {TOTAL_CHAPTERS} chapters complete
          {doneChapters === TOTAL_CHAPTERS ? " · You're financially literate! 🎓" : ''}
        </p>
        <div className="mt-2.5">
          <div className="mb-1 flex justify-between font-mono text-[10px] text-pink-dark">
            <span>Chapters complete</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-md bg-white">
            <div className="h-full rounded-md bg-pink transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {learnChapters.map((chapter, ch) => {
        const unlocked = chapterUnlocked(ch);
        const done = readCount(ch);
        const total = chapter.lessons.length;
        const quizStatus = !unlocked ? 'quiz-locked' : 'quiz-ready';
        const quizBadge = !unlocked ? 'Locked' : chapterDone[ch] ? 'Passed ✓' : 'Take quiz';
        const quizSub = !unlocked
          ? `Pass Chapter ${ch} first`
          : chapterDone[ch]
            ? 'Passed — nice work'
            : done < total
              ? `${total - done} lesson${total - done > 1 ? 's' : ''} left to read`
              : 'All lessons read — ready!';

        return (
          <div key={chapter.label} className="mb-5">
            <div className={`mb-2.5 pl-1 font-mono text-[10px] tracking-wide uppercase ${unlocked ? 'text-ink-soft' : 'text-ink-soft/50'}`}>
              {chapter.label}
              {!unlocked && ' 🔒'}
            </div>
            {chapter.lessons.map((lesson, li) => {
              const read = !!lessonRead[`${ch}-${li}`];
              const status = !unlocked ? 'locked' : read ? 'read' : 'unread';
              const badge = !unlocked ? 'Locked' : read ? 'Done ✓' : 'Read →';
              return (
                <RoadmapNode
                  key={lesson.title}
                  status={status}
                  icon={lesson.icon}
                  title={lesson.title}
                  sub={lesson.sub}
                  badge={badge}
                  onClick={() => (unlocked ? openLesson(ch, li) : showToast(`Complete Chapter ${ch} first to unlock this 🔒`))}
                />
              );
            })}
            <RoadmapNode
              status={quizStatus}
              icon="✍️"
              title={`Chapter ${ch + 1} Quiz`}
              sub={quizSub}
              badge={quizBadge}
              onClick={() => handleQuizGateClick(ch)}
            />
          </div>
        );
      })}

      <div className="mb-2 pl-1 font-mono text-[10px] tracking-wide text-ink-soft/40 uppercase">
        Chapter 3 — Advanced money moves 🔒
      </div>
      <div className="rounded-2xl border-[1.5px] border-paper-line bg-card px-4 py-3.5 opacity-55">
        <div className="flex items-center gap-3">
          <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full bg-paper-line text-[16px] text-ink-soft">
            🔒
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-serif text-[14.5px] font-semibold text-ink">Debt, credit &amp; negotiation</div>
            <div className="text-[11px] text-ink-soft">Coming soon</div>
          </div>
        </div>
      </div>

      <Modal open={activeLesson !== null} onClose={() => setActiveLesson(null)}>
        {activeLesson && (
          <LessonContent
            chapterIdx={activeLesson.ch}
            lessonIdx={activeLesson.lesson}
            lessonCount={learnChapters[activeLesson.ch].lessons.length}
            lesson={learnChapters[activeLesson.ch].lessons[activeLesson.lesson]}
            miniQDone={miniQDone}
            onAnswerCorrect={(key) => setMiniQDone((prev) => ({ ...prev, [key]: true }))}
            onClose={() => setActiveLesson(null)}
            onAllDone={() => handleLessonAllDone(activeLesson.ch)}
          />
        )}
      </Modal>

      <Modal open={activeQuiz !== null} onClose={() => setActiveQuiz(null)}>
        {activeQuiz !== null && (
          <ChapterQuizContent
            chapterIdx={activeQuiz}
            quiz={learnChapters[activeQuiz].quiz}
            onPass={() => handleQuizPass(activeQuiz)}
            onClose={() => setActiveQuiz(null)}
          />
        )}
      </Modal>
    </div>
  );
}
