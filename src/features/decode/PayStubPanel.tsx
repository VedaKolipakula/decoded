import { useState } from 'react';
import { offerLetter, payStub } from '../../data/decodeData';
import {
  annualContributionWithMatch,
  computeMatchGap,
  fmtD,
  payStubAnnualSalary,
  payStubEffectiveTaxRate,
  payStubK401Contribution,
  payStubNetPay,
  payStubPillOptions,
} from '../../lib/calculations';
import { CalloutCard, Card, Eyebrow, LedgerRow, LedgerTotalRow, Tear } from '../../components/ui';
import { DocumentPicker } from './DocumentPicker';
import { MatchGapHero } from './MatchGapHero';
import { ProjectionPanel } from './ProjectionPanel';
import { useDocumentDecode } from './useDocumentDecode';

interface PayStubPanelProps {
  userContributionPct: number;
}

export function PayStubPanel({ userContributionPct }: PayStubPanelProps) {
  const picker = useDocumentDecode();
  const [projectionPct, setProjectionPct] = useState(userContributionPct);

  const s = payStub;
  const maxMatchPct = offerLetter.retirement.maxMatchPct;
  const annualSalary = payStubAnnualSalary(s);
  const currentPct = s.k401ContributionPct;
  const gap = computeMatchGap(annualSalary, currentPct, maxMatchPct);
  const net = payStubNetPay(s);
  const effTax = payStubEffectiveTaxRate(s);
  const k401Dollars = payStubK401Contribution(s);
  const pillOptions = payStubPillOptions(userContributionPct);
  const annualContribution = annualContributionWithMatch(annualSalary, projectionPct);

  return (
    <div>
      <DocumentPicker
        docLabel="pay stub"
        sampleTag="Sample pay stub"
        sampleTitle="Veda's first paycheck"
        sampleSub={`${offerLetter.company} · $${s.grossPay.toLocaleString()}/check · biweekly`}
        buttonLabel="Decode this stub →"
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
              label="Match you're leaving behind"
              value={`${fmtD(gap.dollars)}/yr`}
              sub={`This stub shows ${currentPct.toFixed(1)}% going to your 401k, below the ${maxMatchPct}% match. Closing that gap is worth ${fmtD(gap.dollars)}/yr.`}
            />
          ) : (
            <MatchGapHero
              hasGap={false}
              label="Match, fully captured"
              value={`${fmtD(gap.dollars)}/yr`}
              sub={`You're contributing ${currentPct.toFixed(1)}%, at or above the ${maxMatchPct}% match. Nothing left on the table.`}
            />
          )}

          <Tear />
          <Eyebrow>This paycheck</Eyebrow>
          {picker.fileName && (
            <div className="mb-2 font-mono text-[10.5px] text-ink-soft">From {picker.fileName}</div>
          )}
          <div className="mb-1 flex gap-2.5">
            <div className="flex-1 rounded-[14px] bg-yellow-pale px-3.5 py-3">
              <div className="font-mono text-[9.5px] font-semibold tracking-wide text-ink-soft uppercase">
                Gross / check
              </div>
              <div className="mt-0.5 font-serif text-[17px] font-bold text-ink">{fmtD(s.grossPay)}</div>
            </div>
            <div className="flex-1 rounded-[14px] bg-green-soft px-3.5 py-3">
              <div className="font-mono text-[9.5px] font-semibold tracking-wide text-ink-soft uppercase">
                Net / check
              </div>
              <div className="mt-0.5 font-serif text-[17px] font-bold text-ink">{fmtD(net)}</div>
            </div>
          </div>

          <Card className="mt-3">
            <table className="w-full border-collapse">
              <tbody>
                <LedgerRow label="Federal tax withheld" value={`− ${fmtD(s.federalTaxWithheld)}`} negative />
                <LedgerRow label="State tax withheld" value={fmtD(s.stateTaxWithheld)} muted />
                <LedgerRow label="FICA" value={`− ${fmtD(s.ficaWithheld)}`} negative />
                <LedgerRow label="401(k) contribution" value={`− ${fmtD(k401Dollars)}`} negative />
                <LedgerRow label="HSA contribution" value={`− ${fmtD(s.hsaContribution)}`} negative />
                <LedgerTotalRow label="Net pay, this check" value={fmtD(net)} />
              </tbody>
            </table>
          </Card>

          <CalloutCard variant="yellow">
            <strong>Effective tax rate:</strong> {effTax.toFixed(1)}% of this check goes to taxes — different from
            your tax bracket.
          </CalloutCard>

          <Tear />
          <Eyebrow>The 10-year "what if"</Eyebrow>
          <ProjectionPanel
            title="Tap a contribution rate"
            pillOptions={pillOptions}
            selectedPct={projectionPct}
            onSelect={setProjectionPct}
            annualContribution={annualContribution}
            calloutText={
              <>
                At {projectionPct}% you're on track for an est. <strong>{fmtD(annualContribution)}/year</strong>{' '}
                including match.
              </>
            }
          />
        </div>
      )}
    </div>
  );
}
