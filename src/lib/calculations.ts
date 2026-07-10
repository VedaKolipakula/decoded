import type { OfferLetter, PayStub } from '../data/decodeData';
import type { MeridianOffer } from '../data/compareData';
import { housingMidpoint } from '../data/surveysData';

/** 100% match on the first 3%, 50% match on the next 2% — caps at 4% employer match. */
export function employerMatchPct(employeeContributionPct: number): number {
  const tier1 = Math.min(employeeContributionPct, 3);
  const tier2 = Math.max(0, Math.min(employeeContributionPct, 5) - 3) * 0.5;
  return tier1 + tier2;
}

const GROWTH_RATE = 0.07;
const PROJECTION_YEARS = [1, 5, 10] as const;

/** Compounds a fixed annual contribution at `growth` for enough years to cover the requested checkpoints. */
export function compoundGrowthSeries(
  annualContribution: number,
  growth: number,
  years: readonly number[] = PROJECTION_YEARS,
): number[] {
  const out: number[] = [];
  let balance = 0;
  const maxYear = Math.max(...years);
  for (let y = 1; y <= maxYear; y++) {
    balance = (balance + annualContribution) * (1 + growth);
    if (years.includes(y)) out.push(balance);
  }
  return out;
}

export function projectionSeries(annualContribution: number): number[] {
  return compoundGrowthSeries(annualContribution, GROWTH_RATE, PROJECTION_YEARS);
}

export function fmtD(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

export interface MatchGapResult {
  /** true when the person is under-contributing relative to the max match */
  hasGap: boolean;
  gapPct: number;
  /** dollars/year left on the table if hasGap, otherwise dollars/year of match captured */
  dollars: number;
}

/** Shared match-gap logic: compares a contribution % against the plan's max match %. */
export function computeMatchGap(annualBase: number, contributionPct: number, maxMatchPct: number): MatchGapResult {
  const gapPct = Math.max(0, maxMatchPct - contributionPct);
  if (gapPct > 0) {
    return { hasGap: true, gapPct, dollars: (annualBase * gapPct) / 100 };
  }
  return { hasGap: false, gapPct: 0, dollars: (annualBase * maxMatchPct) / 100 };
}

/** Signing bonus + a target bonus % of base — the shared bonus formula behind every offer's "Bonus, year 1" row. */
export function bonusAmount(baseSalary: number, signingBonus: number, targetBonusPct: number): number {
  return signingBonus + (targetBonusPct * baseSalary) / 100;
}

export function offerBonus(offer: OfferLetter): number {
  return bonusAmount(offer.baseSalary, offer.signingBonus, offer.targetBonusPct);
}

export function offerHealthValue(offer: OfferLetter): number {
  return offer.health.employerMonthlyContribution * 12;
}

export function offerPtoValue(offer: OfferLetter): number {
  return (offer.baseSalary / 260) * offer.ptoDaysPerYear;
}

export function offerMatchValue(offer: OfferLetter): number {
  return (offer.baseSalary * offer.retirement.maxMatchPct) / 100;
}

export function offerTotalComp(offer: OfferLetter): number {
  return (
    offer.baseSalary +
    offerBonus(offer) +
    offer.equity.estimatedAnnualValue +
    offerMatchValue(offer) +
    offerHealthValue(offer) +
    offerPtoValue(offer)
  );
}

/**
 * Total comp for the offer comparator: base + bonus + equity + match value + benefits.
 * Deliberately excludes PTO's dollar value (unlike `offerTotalComp`) — the comparator shows
 * PTO as days, matching the reference's compare-card formula.
 */
export function offerCompareTotal(offer: OfferLetter): number {
  return offer.baseSalary + offerBonus(offer) + offer.equity.estimatedAnnualValue + offerMatchValue(offer) + offerHealthValue(offer);
}

export function payStubAnnualSalary(stub: PayStub): number {
  return stub.grossPay * stub.periodsPerYear;
}

export function payStubK401Contribution(stub: PayStub): number {
  return (stub.grossPay * stub.k401ContributionPct) / 100;
}

export function payStubNetPay(stub: PayStub): number {
  return (
    stub.grossPay -
    stub.federalTaxWithheld -
    stub.stateTaxWithheld -
    stub.ficaWithheld -
    payStubK401Contribution(stub) -
    stub.hsaContribution
  );
}

export function payStubEffectiveTaxRate(stub: PayStub): number {
  return ((stub.federalTaxWithheld + stub.stateTaxWithheld + stub.ficaWithheld) / stub.grossPay) * 100;
}

/** Net pay per check, scaled to a monthly figure — the starting point for the budgeting plan. */
export function payStubMonthlyNet(stub: PayStub): number {
  return (payStubNetPay(stub) * stub.periodsPerYear) / 12;
}

const CREDIT_CARD_DEBT_RATE = 0.15;
const STUDENT_LOAN_DEBT_RATE = 0.08;
const EMERGENCY_FUND_RATE = 0.1;
const GOAL_SAVINGS_RATE = 0.15;

/** The Financial survey's goals that map to a savings target rather than a fixed cost. */
export const GOAL_SAVINGS_LABELS = ['Buying a home', 'Funding further education', 'Saving for retirement', 'Growing investments'];

const LOW_SAVINGS_LABELS = ['$0 — starting from scratch', 'Under $1,000'];

export interface BudgetLineItem {
  label: string;
  sub: string;
  amount: number;
}

export interface BudgetPlan {
  monthlyNet: number;
  lines: BudgetLineItem[];
  flexible: number;
}

/**
 * Housing → debt paydown → emergency fund → goal-based savings → whatever's left over.
 * Each step allocates a slice of `monthlyNet`; the remainder is shown as flexible spending
 * (food, transportation, discretionary) — this app shows the math, not how to spend what's left.
 */
export function computeBudgetPlan(
  monthlyNet: number,
  goalLabels: string[],
  housingLabel: string,
  debtLabel: string,
  savingsLabel: string | undefined,
): BudgetPlan {
  const lines: BudgetLineItem[] = [
    { label: 'Rent / housing', sub: housingLabel, amount: housingMidpoint[housingLabel] ?? 0 },
  ];

  if (debtLabel === 'Credit card debt' || debtLabel === 'Both') {
    lines.push({
      label: 'Debt paydown',
      sub: 'Credit card debt — highest rate, paid down first',
      amount: monthlyNet * CREDIT_CARD_DEBT_RATE,
    });
  } else if (debtLabel === 'Student loans') {
    lines.push({ label: 'Debt paydown', sub: 'Student loans', amount: monthlyNet * STUDENT_LOAN_DEBT_RATE });
  }

  const wantsEmergencyFund = goalLabels.includes('Building an emergency fund');
  const lowSavings = savingsLabel !== undefined && LOW_SAVINGS_LABELS.includes(savingsLabel);
  if (wantsEmergencyFund && lowSavings) {
    lines.push({ label: 'Emergency fund', sub: 'Building your cushion', amount: monthlyNet * EMERGENCY_FUND_RATE });
  }

  const goalSavingsTargets = goalLabels.filter((goal) => GOAL_SAVINGS_LABELS.includes(goal));
  if (goalSavingsTargets.length > 0) {
    const perGoal = (monthlyNet * GOAL_SAVINGS_RATE) / goalSavingsTargets.length;
    for (const goal of goalSavingsTargets) {
      lines.push({ label: goal, sub: 'Goal-based savings', amount: perGoal });
    }
  }

  const allocated = lines.reduce((sum, line) => sum + line.amount, 0);
  const flexible = Math.max(0, monthlyNet - allocated);

  return { monthlyNet, lines, flexible };
}

/** Contribution-rate pill options for the offer-letter projection, deduped and sorted. */
export function offerPillOptions(userPct: number, maxMatchPct: number): number[] {
  return Array.from(new Set([0, 3, userPct, maxMatchPct, 8, 12])).sort((a, b) => a - b);
}

/** Total annual $ going into the 401k (employee + employer match) at a given contribution %. */
export function annualContributionWithMatch(annualBase: number, pct: number): number {
  return (annualBase * (pct + employerMatchPct(pct))) / 100;
}

/** Meridian's match is a flat percentage of base — not tiered like `employerMatchPct`, so it gets its own calc. */
export function meridianMatchValue(offer: MeridianOffer): number {
  return (offer.baseSalary * offer.matchPct) / 100;
}

export function meridianBonus(offer: MeridianOffer): number {
  return bonusAmount(offer.baseSalary, offer.signingBonus, offer.targetBonusPct);
}

/** Same formula pattern as `offerCompareTotal`: base + bonus + equity + match value + benefits. */
export function meridianCompareTotal(offer: MeridianOffer): number {
  return offer.baseSalary + meridianBonus(offer) + offer.equityAnnualValue + meridianMatchValue(offer) + offer.benefitsAnnualValue;
}
