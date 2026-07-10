import { offerLetter, payStub } from '../../data/decodeData';
import { useSurvey } from '../../app/SurveyContext';
import {
  debtQuestionIndex,
  defaultDebtLabel,
  defaultHousingLabel,
  financialSurveyQuestions,
  goalsQuestionIndex,
  housingQuestionIndex,
  savingsQuestionIndex,
} from '../../data/surveysData';
import {
  computeBudgetPlan,
  computeMatchGap,
  fmtD,
  payStubAnnualSalary,
  payStubEffectiveTaxRate,
  payStubK401Contribution,
  payStubMonthlyNet,
  payStubNetPay,
} from '../../lib/calculations';
import { BigTotalCard, CalloutCard, Card, Eyebrow, LedgerRow, LedgerTotalRow, RowVal, Tear } from '../../components/ui';
import { DocumentPicker } from './DocumentPicker';
import { MatchGapHero } from './MatchGapHero';
import { useDocumentDecode } from './useDocumentDecode';

const BUDGET_BADGE_COLORS: Record<string, string> = {
  'Rent / housing': '#A8C4E0',
  'Debt paydown': '#D9553A',
  'Emergency fund': '#8B6F2E',
};
const GOAL_SAVINGS_BADGE_COLOR = '#C2185B';
const FLEXIBLE_BADGE_COLOR = '#1A1A1A';

export function PayStubPanel() {
  const picker = useDocumentDecode();
  const { financialAnswers } = useSurvey();

  const s = payStub;
  const maxMatchPct = offerLetter.retirement.maxMatchPct;
  const annualSalary = payStubAnnualSalary(s);
  const currentPct = s.k401ContributionPct;
  const gap = computeMatchGap(annualSalary, currentPct, maxMatchPct);
  const net = payStubNetPay(s);
  const effTax = payStubEffectiveTaxRate(s);
  const k401Dollars = payStubK401Contribution(s);

  const usingDefaultBudget = financialAnswers === null;
  const goalLabels = financialAnswers
    ? (financialAnswers[goalsQuestionIndex] ?? []).map((i) => financialSurveyQuestions[goalsQuestionIndex].opts[i])
    : [];
  const singleLabel = (questionIndex: number): string | undefined => {
    const optionIndex = financialAnswers?.[questionIndex]?.[0];
    return optionIndex !== undefined ? financialSurveyQuestions[questionIndex].opts[optionIndex] : undefined;
  };
  const housingLabel = singleLabel(housingQuestionIndex) ?? defaultHousingLabel;
  const debtLabel = singleLabel(debtQuestionIndex) ?? defaultDebtLabel;
  const savingsLabel = singleLabel(savingsQuestionIndex);

  const monthlyNet = payStubMonthlyNet(s);
  const plan = computeBudgetPlan(monthlyNet, goalLabels, housingLabel, debtLabel, savingsLabel);

  return (
    <div>
      <DocumentPicker
        docLabel="pay stub"
        sampleTitle="Veda's first paycheck"
        sampleSub={`${offerLetter.company} · $${s.grossPay.toLocaleString()}/check · biweekly`}
        samplePlaceholderFileName="sample-pay-stub.pdf"
        buttonLabel="Decode this stub →"
        fileName={picker.fileName}
        sampleSelected={picker.sampleSelected}
        detecting={picker.detecting}
        detected={picker.detected}
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
          <Eyebrow>Your budgeting plan</Eyebrow>
          <BigTotalCard
            label="Monthly net pay"
            value={fmtD(plan.monthlyNet)}
            sub="This paycheck, scaled to a month"
          />

          <div className="mt-4">
            <Eyebrow>Where it could go</Eyebrow>
          </div>
          <Card>
            {plan.lines.map((line, i) => (
              <RowVal
                key={`${line.label}-${i}`}
                badgeColor={BUDGET_BADGE_COLORS[line.label] ?? GOAL_SAVINGS_BADGE_COLOR}
                badgeText={line.label[0]}
                title={line.label}
                sub={line.sub}
                value={`− ${fmtD(line.amount)}`}
              />
            ))}
            <RowVal
              badgeColor={FLEXIBLE_BADGE_COLOR}
              badgeText="F"
              title="Flexible spending"
              sub="What's left — food, transportation, and everything else"
              value={fmtD(plan.flexible)}
            />
          </Card>

          {usingDefaultBudget && (
            <div className="mb-3 -mt-2 text-[11px] leading-[1.5] text-ink-soft italic">
              Using estimated defaults (mid-range rent, no debt, no specific savings goals) — complete your
              Financial survey for a personalized plan.
            </div>
          )}

          <CalloutCard variant="yellow">
            This is an illustrative starting point based on common budgeting guidelines, not personalized
            financial advice.
          </CalloutCard>
        </div>
      )}
    </div>
  );
}
