import { useState } from 'react';
import { offerLetter } from '../../data/decodeData';
import {
  annualContributionWithMatch,
  computeMatchGap,
  fmtD,
  offerBonus,
  offerHealthValue,
  offerMatchValue,
  offerPillOptions,
  offerPtoValue,
  offerTotalComp,
} from '../../lib/calculations';
import { BigTotalCard, CalloutCard, Card, Eyebrow, RowVal, Tear } from '../../components/ui';
import { DocumentPicker } from './DocumentPicker';
import { MatchGapHero } from './MatchGapHero';
import { ProjectionPanel } from './ProjectionPanel';
import { useDocumentDecode } from './useDocumentDecode';

interface OfferLetterPanelProps {
  userContributionPct: number;
  usingDefaultPct: boolean;
}

export function OfferLetterPanel({ userContributionPct, usingDefaultPct }: OfferLetterPanelProps) {
  const picker = useDocumentDecode();
  const [projectionPct, setProjectionPct] = useState(userContributionPct);

  const o = offerLetter;
  const gap = computeMatchGap(o.baseSalary, userContributionPct, o.retirement.maxMatchPct);
  const bonus = offerBonus(o);
  const healthValue = offerHealthValue(o);
  const ptoValue = offerPtoValue(o);
  const matchValue = offerMatchValue(o);
  const total = offerTotalComp(o);
  const pillOptions = offerPillOptions(userContributionPct, o.retirement.maxMatchPct);
  const annualContribution = annualContributionWithMatch(o.baseSalary, projectionPct);
  const fallbackNote = usingDefaultPct
    ? `Using an estimated ${userContributionPct}% — complete your Financial survey for a personalized number.`
    : undefined;

  return (
    <div>
      <DocumentPicker
        docLabel="offer letter"
        sampleTag="Sample offer letter"
        sampleTitle={`${o.company} — ${o.position}`}
        sampleSub={`$${o.baseSalary.toLocaleString()} base · Seed-stage startup`}
        buttonLabel="Decode this offer →"
        sampleSelected={picker.sampleSelected}
        fileName={picker.fileName}
        decoding={picker.decoding}
        canDecode={picker.canDecode}
        onSelectSample={picker.selectSample}
        onSelectFile={picker.selectFile}
        onClearFile={picker.clearFile}
        onDecode={picker.decode}
      />

      {picker.done && (
        <div>
          <Tear />
          <Eyebrow>Your match, in dollars</Eyebrow>
          {gap.hasGap ? (
            <MatchGapHero
              hasGap
              label="Match you'd be leaving behind"
              value={`${fmtD(gap.dollars)}/yr`}
              sub={`You told us you could set aside ${userContributionPct}%. ${o.company} matches up to ${o.retirement.maxMatchPct}%. Closing that gap is worth ${fmtD(gap.dollars)} every year you don't.`}
              note={fallbackNote}
            />
          ) : (
            <MatchGapHero
              hasGap={false}
              label="Match, fully captured"
              value={`${fmtD(gap.dollars)}/yr`}
              sub={`At ${userContributionPct}%, you're already at or above ${o.company}'s ${o.retirement.maxMatchPct}% match. That's ${fmtD(gap.dollars)}/yr in free employer money.`}
              note={fallbackNote}
            />
          )}

          <Tear />
          <Eyebrow>Total compensation</Eyebrow>
          <BigTotalCard
            label={picker.fileName ? `From ${picker.fileName}` : `${o.company} · total comp, year 1`}
            value={fmtD(total)}
            sub="Base + bonus + equity + match + benefits"
          />

          <div className="mt-4">
            <Eyebrow>What it's made of</Eyebrow>
          </div>
          <Card>
            <RowVal badgeColor="#D9553A" badgeText="$" title="Base salary" value={fmtD(o.baseSalary)} />
            <RowVal
              badgeColor="#C9A800"
              badgeText="B"
              title="Bonus, year 1"
              sub={`${o.signingBonus ? 'Signing + ' : ''}${o.targetBonusPct}% target`}
              value={fmtD(bonus)}
            />
            <RowVal
              badgeColor="#C2185B"
              badgeText="E"
              title="Equity, est. / yr"
              value={o.equity.estimatedAnnualValue ? fmtD(o.equity.estimatedAnnualValue) : '—'}
            />
            <RowVal
              badgeColor="#8B6F2E"
              badgeText="M"
              title="401k match value"
              sub={`${o.retirement.maxMatchPct}% of base`}
              value={fmtD(matchValue)}
            />
            <RowVal badgeColor="#A8C4E0" badgeText="H" title="Health coverage" sub="Employer-paid portion" value={fmtD(healthValue)} />
            <RowVal
              badgeColor="#1A1A1A"
              badgeText="P"
              title={`PTO, ${o.ptoDaysPerYear} days`}
              sub="At your daily rate"
              value={fmtD(ptoValue)}
            />
          </Card>

          <Eyebrow>Benefits, decoded</Eyebrow>
          <CalloutCard variant="yellow">
            <strong>401k match:</strong> your employer matches up to {o.retirement.maxMatchPct}% of base. Based on
            what you told us,{' '}
            {gap.hasGap ? `you're on track to miss ${fmtD(gap.dollars)}/yr.` : `you're set to capture all of it.`}
          </CalloutCard>
          {o.health.hsaEligible && (
            <CalloutCard variant="pink">
              <strong>HSA eligible:</strong> contributions go in pre-tax, grow tax-free, and come out tax-free for
              medical costs.
            </CalloutCard>
          )}
          <CalloutCard variant="green">
            <strong>PTO is real money:</strong> {o.ptoDaysPerYear} days off is worth about {fmtD(ptoValue)} at this
            salary.
          </CalloutCard>

          <Tear />
          <Eyebrow>If you capture the match…</Eyebrow>
          <ProjectionPanel
            title="10-year value at your chosen rate"
            pillOptions={pillOptions}
            selectedPct={projectionPct}
            onSelect={setProjectionPct}
            annualContribution={annualContribution}
            calloutText={
              <>
                At {projectionPct}%, that's an est. <strong>{fmtD(annualContribution)}/year</strong> going in,
                employer match included.
              </>
            }
          />
        </div>
      )}
    </div>
  );
}
