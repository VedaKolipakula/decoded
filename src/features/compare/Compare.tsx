import { meridianOffer } from '../../data/compareData';
import { offerLetter } from '../../data/decodeData';
import {
  fmtD,
  meridianBonus,
  meridianCompareTotal,
  meridianMatchValue,
  offerBonus,
  offerCompareTotal,
  offerHealthValue,
  offerMatchValue,
} from '../../lib/calculations';
import { CalloutCard, Card, Eyebrow, LedgerRow, LedgerTotalRow, SectionSub, SectionTitle } from '../../components/ui';

interface CompareRow {
  label: string;
  sub?: string;
  value: string;
}

interface CompareCardData {
  name: string;
  sub: string;
  rows: CompareRow[];
  total: number;
}

function CompareCard({ data, isWinner }: { data: CompareCardData; isWinner: boolean }) {
  return (
    <Card className={isWinner ? 'border-solid border-pink shadow-[0_0_0_3px_var(--color-pink-pale)]' : ''}>
      {isWinner && (
        <div className="absolute -top-2.5 left-4 rounded-full bg-pink-dark px-2.5 py-1 font-mono text-[9.5px] tracking-wide text-white uppercase">
          Higher total comp
        </div>
      )}
      <div className="mt-1 font-serif text-[18px] font-semibold text-ink">{data.name}</div>
      <div className="mb-3 text-[11px] text-ink-soft">{data.sub}</div>
      <table className="w-full border-collapse">
        <tbody>
          {data.rows.map((row) => (
            <LedgerRow key={row.label} label={row.label} sub={row.sub} value={row.value} />
          ))}
          <LedgerTotalRow label="Total comp, est." value={fmtD(data.total)} />
        </tbody>
      </table>
    </Card>
  );
}

export function Compare() {
  const o = offerLetter;
  const m = meridianOffer;

  const brightPathBonus = offerBonus(o);
  const brightPathMatch = offerMatchValue(o);
  const brightPathBenefits = offerHealthValue(o);
  const brightPathTotal = offerCompareTotal(o);

  const meridianBonusValue = meridianBonus(m);
  const meridianMatch = meridianMatchValue(m);
  const meridianTotal = meridianCompareTotal(m);

  const brightPath: CompareCardData = {
    name: o.company,
    sub: 'Seed-stage startup',
    total: brightPathTotal,
    rows: [
      { label: 'Base salary', value: fmtD(o.baseSalary) },
      {
        label: 'Bonus, year 1',
        value: brightPathBonus ? fmtD(brightPathBonus) : '—',
        sub: `${o.signingBonus ? 'Signing + ' : ''}${o.targetBonusPct}% target`,
      },
      { label: 'Est. equity/yr', value: o.equity.estimatedAnnualValue ? fmtD(o.equity.estimatedAnnualValue) : '—' },
      { label: '401k match value', value: fmtD(brightPathMatch) },
      { label: 'Benefits, est.', value: fmtD(brightPathBenefits) },
      { label: 'PTO', value: `${o.ptoDaysPerYear} days` },
    ],
  };

  const meridian: CompareCardData = {
    name: m.company,
    sub: m.subtitle,
    total: meridianTotal,
    rows: [
      { label: 'Base salary', value: fmtD(m.baseSalary) },
      {
        label: 'Bonus, year 1',
        value: meridianBonusValue ? fmtD(meridianBonusValue) : '—',
        sub: `${m.signingBonus ? 'Signing + ' : ''}${m.targetBonusPct}% target`,
      },
      { label: 'Est. equity/yr', value: m.equityAnnualValue ? fmtD(m.equityAnnualValue) : '—' },
      { label: '401k match value', value: fmtD(meridianMatch) },
      { label: 'Benefits, est.', value: fmtD(m.benefitsAnnualValue) },
      { label: 'PTO', value: `${m.ptoDaysPerYear} days` },
    ],
  };

  const brightPathWins = brightPathTotal > meridianTotal;

  return (
    <div>
      <Eyebrow>Offer comparator</Eyebrow>
      <SectionTitle>Not just salary. Total comp.</SectionTitle>
      <SectionSub>Two real offers, weighed the way they actually pay out.</SectionSub>

      <CompareCard data={brightPath} isWinner={brightPathWins} />
      <CompareCard data={meridian} isWinner={!brightPathWins} />

      <CalloutCard variant="yellow">
        Total comp = base + bonus + est. equity + match value + benefits. Illustrative estimates, not tax or legal
        advice.
      </CalloutCard>
    </div>
  );
}
