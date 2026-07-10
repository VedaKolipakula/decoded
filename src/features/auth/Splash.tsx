import { useAuth } from '../../app/AuthContext';
import { Mascot } from '../../components/Mascot';

export function Splash() {
  const { goToSignIn } = useAuth();

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-2 text-center">
      <Mascot size={112} className="mb-4" />
      <h1 className="mb-2.5 font-serif text-[30px] font-bold leading-[1.1] text-ink">Decoded</h1>
      <p className="mb-8 max-w-[260px] text-[13.5px] leading-[1.55] text-ink-soft">
        Your first paycheck, decoded. Understand what your offer is really worth — before you say yes.
      </p>
      <button
        type="button"
        onClick={goToSignIn}
        className="w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
      >
        Get started →
      </button>
    </div>
  );
}
