import type { OfferLetter, PayStub } from '../data/decodeData';
import type { MeridianOffer } from '../data/compareData';

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

/** Contribution-rate pill options for the offer-letter projection, deduped and sorted. */
export function offerPillOptions(userPct: number, maxMatchPct: number): number[] {
  return Array.from(new Set([0, 3, userPct, maxMatchPct, 8, 12])).sort((a, b) => a - b);
}

/** Contribution-rate pill options for the pay-stub projection, deduped and sorted. */
export function payStubPillOptions(userPct: number): number[] {
  return Array.from(new Set([0, 3, userPct, 5, 8, 12])).sort((a, b) => a - b);
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
