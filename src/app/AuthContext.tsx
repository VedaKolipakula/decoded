import { createContext, useContext, useState, type ReactNode } from 'react';

export type AuthStage = 'splash' | 'signin' | 'profile-gate' | 'app';

interface AuthContextValue {
  stage: AuthStage;
  goToSignIn: () => void;
  completeSignIn: () => void;
  enterApp: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<AuthStage>('splash');
  const value: AuthContextValue = {
    stage,
    goToSignIn: () => setStage('signin'),
    completeSignIn: () => setStage('profile-gate'),
    enterApp: () => setStage('app'),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
