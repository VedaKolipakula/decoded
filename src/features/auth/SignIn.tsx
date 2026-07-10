import { useState } from 'react';

type Mode = 'signin' | 'create';

interface SignInProps {
  onSubmit: () => void;
}

/** Hardcoded/non-functional: any input (including empty) submits, but requires a real tap
 *  through the form — the app must not auto-skip this step. */
export function SignIn({ onSubmit }: SignInProps) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="pt-6">
      <div className="mb-5 text-center">
        <div className="mb-1 font-serif text-[22px] font-semibold text-ink">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </div>
        <p className="text-[12.5px] text-ink-soft">
          {mode === 'signin' ? 'Sign in to pick up where you left off.' : "Let's get your profile set up."}
        </p>
      </div>

      <div className="mb-4.5 flex gap-1 rounded-full border-[1.5px] border-paper-line bg-paper p-1">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`flex-1 rounded-full py-2.5 font-mono text-[12px] font-semibold ${
            mode === 'signin' ? 'bg-ink text-white' : 'text-ink-soft'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('create')}
          className={`flex-1 rounded-full py-2.5 font-mono text-[12px] font-semibold ${
            mode === 'create' ? 'bg-ink text-white' : 'text-ink-soft'
          }`}
        >
          Create account
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <label className="block">
          <span className="mb-1 block font-mono text-[10.5px] tracking-wide text-ink-soft uppercase">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="w-full rounded-xl border-[1.5px] border-paper-line bg-card px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-pink-dark"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[10.5px] tracking-wide text-ink-soft uppercase">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border-[1.5px] border-paper-line bg-card px-3.5 py-2.5 text-[13px] text-ink outline-none focus:border-pink-dark"
          />
        </label>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
        >
          {mode === 'signin' ? 'Sign in →' : 'Create account →'}
        </button>
      </form>
    </div>
  );
}
