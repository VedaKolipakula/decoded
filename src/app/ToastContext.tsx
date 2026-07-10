import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_VISIBLE_MS = 2200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback((next: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setMessage(next);
    setVisible(true);
    timeoutRef.current = window.setTimeout(() => setVisible(false), TOAST_VISIBLE_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`pointer-events-none absolute bottom-[90px] left-1/2 z-70 max-w-[88%] -translate-x-1/2 rounded-full bg-ink px-4.5 py-2.5 text-center font-mono text-[11.5px] whitespace-nowrap text-white transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
