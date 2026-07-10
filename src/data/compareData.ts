export interface MeridianOffer {
  company: string;
  subtitle: string;
  baseSalary: number;
  signingBonus: number;
  targetBonusPct: number;
  equityAnnualValue: number;
  /** flat match, not tiered — Meridian's structure is simpler than Bright Path's */
  matchPct: number;
  benefitsAnnualValue: number;
  ptoDaysPerYear: number;
}

export const meridianOffer: MeridianOffer = {
  company: 'Meridian Corp',
  subtitle: 'Established company',
  baseSalary: 64000,
  signingBonus: 0,
  targetBonusPct: 8,
  equityAnnualValue: 0,
  matchPct: 6,
  benefitsAnnualValue: 9500,
  ptoDaysPerYear: 20,
};
