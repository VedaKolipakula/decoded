import { createContext, useContext, useState, type ReactNode } from 'react';

/** One selected-option-index array per question; empty until a question is answered. */
export type SurveyAnswers = number[][];

interface SurveyContextValue {
  financialAnswers: SurveyAnswers | null;
  mentorshipAnswers: SurveyAnswers | null;
  setFinancialAnswers: (answers: SurveyAnswers) => void;
  setMentorshipAnswers: (answers: SurveyAnswers) => void;
}

const SurveyContext = createContext<SurveyContextValue | null>(null);

/** Lifted above NavigationContext so both the Profile screen and Decode (which needs the
 *  Financial survey's contribution-% answer) can read the same answers regardless of tab. */
export function SurveyProvider({ children }: { children: ReactNode }) {
  const [financialAnswers, setFinancialAnswers] = useState<SurveyAnswers | null>(null);
  const [mentorshipAnswers, setMentorshipAnswers] = useState<SurveyAnswers | null>(null);

  return (
    <SurveyContext.Provider value={{ financialAnswers, mentorshipAnswers, setFinancialAnswers, setMentorshipAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey(): SurveyContextValue {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurvey must be used within a SurveyProvider');
  return ctx;
}
