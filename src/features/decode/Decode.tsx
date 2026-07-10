import { useState } from 'react';
import { useSurvey } from '../../app/SurveyContext';
import { bucketMidpoint, contributionQuestionIndex, defaultUserContributionPct, financialSurveyQuestions } from '../../data/surveysData';
import { OfferLetterPanel } from './OfferLetterPanel';
import { PayStubPanel } from './PayStubPanel';

type DocType = 'offer' | 'paystub';

export function Decode() {
  const { financialAnswers } = useSurvey();
  const [docType, setDocType] = useState<DocType>('offer');

  const contributionOptionIndex = financialAnswers?.[contributionQuestionIndex]?.[0];
  const contributionLabel =
    contributionOptionIndex !== undefined
      ? financialSurveyQuestions[contributionQuestionIndex].opts[contributionOptionIndex]
      : undefined;
  const usingDefaultPct = contributionLabel === undefined;
  const userContributionPct = contributionLabel ? (bucketMidpoint[contributionLabel] ?? defaultUserContributionPct) : defaultUserContributionPct;

  return (
    <div>
      <div className="mb-4.5 flex gap-1 rounded-full border-[1.5px] border-paper-line bg-paper p-1">
        <button
          type="button"
          onClick={() => setDocType('offer')}
          className={`flex-1 rounded-full py-2.5 font-mono text-[12px] font-semibold ${
            docType === 'offer' ? 'bg-ink text-white' : 'text-ink-soft'
          }`}
        >
          Offer letter
        </button>
        <button
          type="button"
          onClick={() => setDocType('paystub')}
          className={`flex-1 rounded-full py-2.5 font-mono text-[12px] font-semibold ${
            docType === 'paystub' ? 'bg-ink text-white' : 'text-ink-soft'
          }`}
        >
          Pay stub
        </button>
      </div>

      {docType === 'offer' ? (
        <OfferLetterPanel userContributionPct={userContributionPct} usingDefaultPct={usingDefaultPct} />
      ) : (
        <PayStubPanel />
      )}
    </div>
  );
}
