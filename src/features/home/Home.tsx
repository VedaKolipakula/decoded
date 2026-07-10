import { useNavigation } from '../../app/NavigationContext';
import { Card, Tear } from '../../components/ui';

interface FeatureCardProps {
  iconBg: string;
  iconColor: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
}

function FeatureCard({ iconBg, iconColor, icon, title, description, cta, onClick }: FeatureCardProps) {
  return (
    <Card className="cursor-pointer rounded-[20px]">
      <button type="button" onClick={onClick} className="block w-full text-left">
        <div
          className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full text-[16px]"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <h3 className="mb-1.5 font-serif text-[16.5px] font-semibold text-ink">{title}</h3>
        <p className="m-0 text-[12.5px] leading-[1.5] text-ink-soft">{description}</p>
        <div className="mt-2.5 font-mono text-[10.5px] text-pink-dark">{cta}</div>
      </button>
    </Card>
  );
}

export function Home() {
  const { goTo } = useNavigation();

  return (
    <div>
      <div className="-mx-4.5 bg-yellow px-4.5 pt-2 pb-5">
        <div className="mb-2 font-mono text-[10.5px] tracking-wider text-ink-soft uppercase">Stub No. 000482</div>
        <h1 className="mb-2.5 font-serif text-[34px] leading-[1.04] font-bold tracking-[-0.01em] text-ink">
          Your first paycheck,
          <br />
          <span className="text-pink-dark">decoded.</span>
        </h1>
        <p className="mb-5 text-[14px] leading-[1.55] text-ink-soft">
          Upload the offer or pay stub nobody explained to you. We'll translate the fine print and show what it's
          worth in 10 years.
        </p>
        <button
          type="button"
          onClick={() => goTo('decode')}
          className="w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
        >
          Decode my offer →
        </button>
      </div>

      <Tear />

      <FeatureCard
        iconBg="var(--color-pink-pale)"
        iconColor="var(--color-pink-dark)"
        icon="$"
        title="Decode & simulate"
        description="Breakdown of gross pay, taxes, 401k match, and HSA — modeled 10 years out."
        cta="Try it →"
        onClick={() => goTo('decode')}
      />
      <FeatureCard
        iconBg="var(--color-pink-pale)"
        iconColor="var(--color-pink-dark)"
        icon="⇄"
        title="Offer comparator"
        description="Total compensation across two offers, not just the salary line."
        cta="Compare offers →"
        onClick={() => goTo('compare')}
      />
      <FeatureCard
        iconBg="var(--color-yellow-pale)"
        iconColor="var(--color-yellow-dark)"
        icon="👥"
        title="Mentors & community"
        description="Match with a recent grad who sat exactly where you're sitting now."
        cta="Meet your match →"
        onClick={() => goTo('mentors')}
      />
      <FeatureCard
        iconBg="var(--color-yellow-pale)"
        iconColor="var(--color-yellow-dark)"
        icon="📘"
        title="Financial literacy roadmap"
        description="Level up your money knowledge block by block — with quizzes to prove it."
        cta="Start learning →"
        onClick={() => goTo('learn')}
      />
    </div>
  );
}
