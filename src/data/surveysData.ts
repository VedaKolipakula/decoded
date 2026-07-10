export type SurveyQuestionType = 'single' | 'multi';

export interface SurveyQuestion {
  step: string;
  q: string;
  type: SurveyQuestionType;
  opts: string[];
}

export const financialSurveyQuestions: SurveyQuestion[] = [
  {
    step: '1 of 10',
    q: 'Which financial goals are you actively working toward?',
    type: 'multi',
    opts: [
      'Paying off student debt',
      'Building an emergency fund',
      'Buying a home',
      'Funding further education',
      'Saving for retirement',
      'Growing investments',
    ],
  },
  {
    step: '2 of 10',
    q: "What's your approximate monthly rent or housing cost?",
    type: 'single',
    opts: ['Under $800', '$800 – $1,200', '$1,200 – $1,800', '$1,800+'],
  },
  {
    step: '3 of 10',
    q: 'Do you have any existing debt?',
    type: 'single',
    opts: ['No debt right now', 'Credit card debt', 'Student loans', 'Both'],
  },
  {
    step: '4 of 10',
    q: 'How much do you already have in savings?',
    type: 'single',
    opts: ['$0 — starting from scratch', 'Under $1,000', '$1,000 – $5,000', '$5,000+'],
  },
  {
    step: '5 of 10',
    q: 'About how much of your monthly income is usually left after essential expenses?',
    type: 'single',
    opts: ['Less than 10%', '10% – 20%', '20% – 35%', 'More than 35%', "I'm not sure yet"],
  },
  {
    step: '6 of 10',
    q: 'How would you describe your attitude toward investment risk?',
    type: 'single',
    opts: [
      "Very conservative — I don't want to lose anything",
      'Moderate — some risk is okay',
      "Aggressive — I'm okay with big swings for bigger returns",
      "I haven't thought about this yet",
    ],
  },
  {
    step: '7 of 10',
    q: 'Do you currently invest in any of the following?',
    type: 'multi',
    opts: ['Stocks or ETFs', 'Index funds', 'Crypto', '401k / retirement account', "I don't invest yet"],
  },
  {
    step: '8 of 10',
    q: 'How do you currently manage day-to-day spending?',
    type: 'single',
    opts: [
      'I use a budget app',
      'I track it roughly in my head',
      'I review my bank statements',
      "I don't track spending right now",
    ],
  },
  {
    step: '9 of 10',
    q: "What's your biggest money stress right now?",
    type: 'single',
    opts: [
      'Living paycheck to paycheck',
      'Student loan payments',
      'Not saving enough',
      'Not knowing what to do with money',
      'I feel pretty on top of it',
    ],
  },
  {
    step: '10 of 10',
    q: 'What percent of each paycheck could you realistically set aside?',
    type: 'single',
    opts: ['0–3%', '4–6%', '7–10%', '10%+'],
  },
];

/** Index of the financial-goals question above — the budgeting plan reads selected goals from here. */
export const goalsQuestionIndex = 0;
/** Index of the housing-cost question above. */
export const housingQuestionIndex = 1;
/** Index of the existing-debt question above. */
export const debtQuestionIndex = 2;
/** Index of the existing-savings question above. */
export const savingsQuestionIndex = 3;
/** Index into `financialSurveyQuestions` of the contribution-% question — this is the
 *  one answer Decode's match-gap calculation needs from the survey. */
export const contributionQuestionIndex = financialSurveyQuestions.length - 1;

/** Same bucket-to-midpoint mapping the old standalone Decode quiz used. */
export const bucketMidpoint: Record<string, number> = {
  '0–3%': 2,
  '4–6%': 5,
  '7–10%': 8,
  '10%+': 12,
};

/** Fallback contribution % Decode assumes when the Financial survey hasn't been completed yet. */
export const defaultUserContributionPct = 5;

/** Dollar midpoint for each housing-cost bracket, used by the Pay Stub budgeting plan. */
export const housingMidpoint: Record<string, number> = {
  'Under $800': 650,
  '$800 – $1,200': 1000,
  '$1,200 – $1,800': 1500,
  '$1,800+': 2000,
};

/** Fallback housing/debt assumptions the budgeting plan uses when the Financial survey hasn't
 *  been completed yet — mid-range rent, no debt, and (since goals default to none selected)
 *  no emergency-fund or goal-savings lines. */
export const defaultHousingLabel = '$800 – $1,200';
export const defaultDebtLabel = 'No debt right now';

export const mentorshipSurveyQuestions: SurveyQuestion[] = [
  {
    step: '1 of 6',
    q: 'Are you a first-generation college student or earner in your family?',
    type: 'single',
    opts: [
      'Yes, first-gen college student',
      'Yes, first in my family to work in this field',
      'No, but I have limited financial guidance',
      'No',
    ],
  },
  {
    step: '2 of 6',
    q: 'How do you identify?',
    type: 'multi',
    opts: [
      'Woman of color',
      'Latina / Hispanic',
      'Black or African American',
      'Asian or Pacific Islander',
      'Indigenous or Native American',
      'I prefer not to say',
    ],
  },
  {
    step: '3 of 6',
    q: 'How do you typically approach building a financial plan?',
    type: 'single',
    opts: [
      'I research and plan independently',
      'I follow advice from family or friends',
      'I use apps or online tools',
      "I'm figuring it out as I go",
      "I don't have a plan yet",
    ],
  },
  {
    step: '4 of 6',
    q: 'Are you focused more on long-term investing, active trading, or a mix?',
    type: 'single',
    opts: [
      'Long-term — set it and forget it',
      'Active — I like watching markets',
      'A mix of both',
      "I haven't started investing yet",
    ],
  },
  {
    step: '5 of 6',
    q: 'What field are you entering or working in?',
    type: 'single',
    opts: ['Finance / banking', 'Tech / engineering', 'Consulting', 'Healthcare', 'Government / nonprofit', 'Creative / media', 'Other'],
  },
  {
    step: '6 of 6',
    q: 'What do you most want from a mentor?',
    type: 'multi',
    opts: [
      'Salary negotiation tips',
      'Career path guidance',
      'Investing basics',
      'Work-life balance advice',
      'Finding community',
      'Someone who looks like me',
    ],
  },
];
