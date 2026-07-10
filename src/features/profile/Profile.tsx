import { useState } from 'react';
import { currentUser } from '../../data/decodeData';
import { financialSurveyQuestions, mentorshipSurveyQuestions, type SurveyQuestion } from '../../data/surveysData';
import { useSurvey, type SurveyAnswers } from '../../app/SurveyContext';
import { Card } from '../../components/ui';
import { SurveyFlow } from './SurveyFlow';
import { SurveyDone } from './SurveyDone';

type ProfileView = 'profile' | 'financial' | 'financial-done' | 'mentorship' | 'mentorship-done';

function CompletedSurveyCard({
  icon,
  title,
  questions,
  answers,
  pillClass,
  onEdit,
}: {
  icon: string;
  title: string;
  questions: SurveyQuestion[];
  answers: SurveyAnswers;
  pillClass: string;
  onEdit: () => void;
}) {
  return (
    <Card>
      <div className="mb-3 flex items-center gap-2 text-[14px] font-medium text-pink-dark">
        <span>{icon}</span>
        {title}
        <span className="rounded-[10px] bg-yellow-pale px-1.5 py-0.5 font-mono text-[10px] text-yellow-dark">done</span>
      </div>
      {questions.map((q, qi) => {
        const selected = answers[qi] ?? [];
        if (selected.length === 0) return null;
        return (
          <div key={q.q} className="mb-3">
            <div className="mb-1 text-[11px] leading-[1.4] text-ink-soft">{q.q}</div>
            <div>
              {selected.map((i) => (
                <span key={i} className={`mr-1 mb-1 inline-block rounded-full px-2.5 py-1 text-[11px] ${pillClass}`}>
                  {q.opts[i]}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={onEdit}
        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border-[0.5px] border-paper-line px-2.5 py-2.5 text-[13px] text-ink"
      >
        ✎ Edit answers
      </button>
    </Card>
  );
}

function TodoSurveyCard({
  icon,
  title,
  sub,
  onClick,
}: {
  icon: string;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="mb-2.5 block w-full rounded-xl border-[1.5px] border-paper-line bg-card p-3.5 text-left">
      <div className="flex items-center gap-2 text-[14px] font-medium text-pink-dark">
        <span>{icon}</span>
        {title}
        <span className="rounded-[10px] bg-[#FBEAF0] px-1.5 py-0.5 font-mono text-[10px] text-ink">to do</span>
      </div>
      <div className="mt-1 text-[12px] text-ink-soft">{sub}</div>
    </button>
  );
}

interface ProfileProps {
  /** Shown right after auth, before the tabbed app — surfaces the "Enter Decoded →" CTA. */
  showEnterCta?: boolean;
  onEnter?: () => void;
}

export function Profile({ showEnterCta = false, onEnter }: ProfileProps = {}) {
  const [view, setView] = useState<ProfileView>('profile');
  const { financialAnswers, mentorshipAnswers, setFinancialAnswers, setMentorshipAnswers } = useSurvey();

  if (view === 'financial') {
    return (
      <SurveyFlow
        title="Financial survey"
        subtitle="Personalize your experience"
        questions={financialSurveyQuestions}
        initialAnswers={financialAnswers ?? undefined}
        onExit={() => setView('profile')}
        onComplete={(answers) => {
          setFinancialAnswers(answers);
          setView('financial-done');
        }}
      />
    );
  }

  if (view === 'financial-done') {
    return (
      <SurveyDone
        title="Financial survey saved"
        description="Your answers help us personalize your offer decodes and 10-year simulations."
        primaryLabel="Take mentorship survey"
        onPrimary={() => setView('mentorship')}
        secondaryLabel="Back to profile"
        onSecondary={() => setView('profile')}
      />
    );
  }

  if (view === 'mentorship') {
    return (
      <SurveyFlow
        title="Mentorship survey"
        subtitle="Help us find your match"
        questions={mentorshipSurveyQuestions}
        initialAnswers={mentorshipAnswers ?? undefined}
        onExit={() => setView('profile')}
        onComplete={(answers) => {
          setMentorshipAnswers(answers);
          setView('mentorship-done');
        }}
      />
    );
  }

  if (view === 'mentorship-done') {
    return (
      <SurveyDone
        title="Mentorship survey saved"
        description="We'll use this to find mentors who were sitting exactly where you are."
        primaryLabel="Go to profile"
        onPrimary={() => setView('profile')}
        secondaryLabel="Back to profile"
        onSecondary={() => setView('profile')}
      />
    );
  }

  return (
    <div>
      <div className="mx-auto mb-3 flex h-18 w-18 items-center justify-center rounded-full border-2 border-pink-dark bg-pink font-serif text-[24px] font-semibold text-ink">
        {currentUser.avatarInitials}
      </div>
      <div className="text-center font-serif text-[18px] font-semibold text-pink-dark">{currentUser.name}</div>
      <div className="mt-0.5 text-center text-[13px] text-ink-soft">{currentUser.occupation}</div>

      <div className="my-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-dashed border-paper-line py-2 text-[13px] text-ink-soft">
          <span className="text-pink">📅</span> Member since {currentUser.memberSince}
        </div>
        <div className="flex items-center gap-2 py-2 text-[13px] text-ink-soft">
          <span className="text-pink">🛡️</span>
          {financialAnswers && mentorshipAnswers ? 'Both surveys complete' : 'Surveys not yet completed'}
        </div>
      </div>

      <div className="mb-2.5 mt-2 text-[12px] font-medium text-ink-soft">Your surveys</div>

      {financialAnswers ? (
        <CompletedSurveyCard
          icon="🪙"
          title="Financial survey"
          questions={financialSurveyQuestions}
          answers={financialAnswers}
          pillClass="bg-[#FBEAF0] text-ink"
          onEdit={() => setView('financial')}
        />
      ) : (
        <TodoSurveyCard
          icon="🪙"
          title="Financial survey"
          sub="Goals, housing, debt, spending habits — 10 questions"
          onClick={() => setView('financial')}
        />
      )}

      {mentorshipAnswers ? (
        <CompletedSurveyCard
          icon="👥"
          title="Mentorship survey"
          questions={mentorshipSurveyQuestions}
          answers={mentorshipAnswers}
          pillClass="bg-[#EEEDFE] text-[#3C3489]"
          onEdit={() => setView('mentorship')}
        />
      ) : (
        <TodoSurveyCard
          icon="👥"
          title="Mentorship survey"
          sub="Background and investing style — 6 questions"
          onClick={() => setView('mentorship')}
        />
      )}

      {showEnterCta && (
        <button
          type="button"
          onClick={onEnter}
          className="mt-2 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
        >
          Enter Decoded →
        </button>
      )}
    </div>
  );
}
