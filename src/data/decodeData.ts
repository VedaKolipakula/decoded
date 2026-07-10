export interface CurrentUser {
  name: string;
  avatarInitials: string;
  occupation: string;
  memberSince: string;
}

export const currentUser: CurrentUser = {
  name: 'Taylor Swift',
  avatarInitials: 'TS',
  occupation: 'Product Marketing Coordinator, Bright Path',
  memberSince: 'July 2026',
};

export interface OfferLetter {
  company: string;
  recipientName: string;
  position: string;
  startDate: string;

  baseSalary: number;
  signingBonus: number;
  targetBonusPct: number;

  equity: {
    estimatedAnnualValue: number;
  };

  retirement: {
    /** 100% match up to this contribution %. */
    matchTier1Pct: number;
    /** additional 50% match on the next this-many %. */
    matchTier2Pct: number;
    /** resulting max employer match — what the gap calc compares against. */
    maxMatchPct: number;
  };

  health: {
    employerMonthlyContribution: number;
    hsaEligible: boolean;
  };

  ptoDaysPerYear: number;
}

export const offerLetter: OfferLetter = {
  company: 'Bright Path',
  recipientName: 'Taylor Swift',
  position: 'Product Marketing Coordinator',
  startDate: 'August 3, 2026',

  baseSalary: 58000,
  signingBonus: 2000,
  targetBonusPct: 0,

  equity: {
    estimatedAnnualValue: 3000,
  },

  retirement: {
    matchTier1Pct: 3,
    matchTier2Pct: 2,
    maxMatchPct: 4,
  },

  health: {
    employerMonthlyContribution: 350,
    hsaEligible: true,
  },

  ptoDaysPerYear: 15,
};

export interface PayStub {
  employeeName: string;
  periodsPerYear: number;
  grossPay: number;
  federalTaxWithheld: number;
  /** Bright Path is in Austin, TX — no state income tax. */
  stateTaxWithheld: number;
  ficaWithheld: number;
  /** below the 5% needed for the full match — drives the "leaving money on the table" state */
  k401ContributionPct: number;
  hsaContribution: number;
}

export const payStub: PayStub = {
  employeeName: 'Taylor Swift',
  periodsPerYear: 26,
  grossPay: 2231,
  federalTaxWithheld: 268,
  stateTaxWithheld: 0,
  ficaWithheld: 171,
  k401ContributionPct: 2,
  hsaContribution: 60,
};
