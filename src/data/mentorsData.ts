export interface Mentor {
  name: string;
  yearsOut: string;
  quote: string;
  tags: string[];
  matchPct: number;
  avatarColor: string;
}

export const mentors: Mentor[] = [
  {
    name: 'Jordan A.',
    yearsOut: '2 yrs out · Software Engineer',
    quote: 'I negotiated my signing bonus up $4,000 just by asking once, calmly, in writing.',
    tags: ['Negotiate a raise', 'Tech'],
    matchPct: 94,
    avatarColor: '#2F6F4E',
  },
  {
    name: 'Priya N.',
    yearsOut: '3 yrs out · Financial Analyst',
    quote: 'I automated $50/week into an index fund before I ever saw my paycheck.',
    tags: ['Start investing', 'Finance'],
    matchPct: 88,
    avatarColor: '#C98A2B',
  },
  {
    name: 'Maya L.',
    yearsOut: '2 yrs out · Brand Marketing',
    quote: 'I paid off $6k in credit card debt in 14 months using the avalanche method.',
    tags: ['Pay off debt', 'Marketing'],
    matchPct: 85,
    avatarColor: '#D9553A',
  },
  {
    name: 'Sam R.',
    yearsOut: '4 yrs out · Clinical Ops',
    quote: 'Building my emergency fund first made every other money decision less scary.',
    tags: ['Build savings', 'Healthcare'],
    matchPct: 79,
    avatarColor: '#1F4F37',
  },
];

export const mentorFields = ['Tech', 'Marketing', 'Finance', 'Healthcare'] as const;
export const mentorGoals = ['Negotiate a raise', 'Start investing', 'Pay off debt', 'Build savings'] as const;
