import { useEffect, useRef, useState, type ReactNode } from 'react';
import { currentUser } from '../data/decodeData';
import { useAuth } from '../app/AuthContext';
import { useNavigation } from '../app/NavigationContext';
import { ToastProvider } from '../app/ToastContext';
import { TabBar } from './TabBar';

const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 820;
const VIEWPORT_MARGIN = 48;

interface PhoneFrameProps {
  children: ReactNode;
}

/** Centers a fixed-size phone mockup on the page, scaling it down (never up) to fit smaller viewports. */
export function PhoneFrame({ children }: PhoneFrameProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { screen, goTo } = useNavigation();
  const { stage } = useAuth();
  const isAppStage = stage === 'app';
  const topBarIsYellow = isAppStage && screen === 'home';

  useEffect(() => {
    function updateScale() {
      const availableWidth = window.innerWidth - VIEWPORT_MARGIN;
      const availableHeight = window.innerHeight - VIEWPORT_MARGIN;
      const next = Math.min(1, availableWidth / PHONE_WIDTH, availableHeight / PHONE_HEIGHT);
      setScale(Number(next.toFixed(3)));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-cream p-4" ref={wrapperRef}>
      <div
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: `scale(${scale})`,
        }}
        className="shrink-0 rounded-[52px] bg-[#1a1a1a] p-3.5 shadow-[0_30px_60px_rgba(20,20,20,0.35),0_0_0_2px_#2a2a2a]"
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-paper">
          <div className="absolute top-0 left-1/2 z-30 h-6.5 w-30 -translate-x-1/2 rounded-b-2xl bg-[#1a1a1a]" />

          <div
            className={`flex shrink-0 items-center justify-between px-6.5 pt-3.5 pb-1 font-mono text-[12.5px] font-semibold text-ink transition-colors ${
              topBarIsYellow ? 'bg-yellow' : 'bg-paper'
            }`}
          >
            <span>9:41</span>
            <span className="flex items-center gap-1">●●●● 5G 🔋</span>
          </div>

          {isAppStage && (
            <div
              className={`flex shrink-0 items-center justify-between px-5 pt-1.5 pb-3.5 transition-colors ${
                topBarIsYellow ? 'bg-yellow' : 'bg-paper'
              }`}
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-[19px] font-bold text-ink">Decoded</span>
                <span className="font-mono text-[9.5px] tracking-wider text-ink-soft uppercase">
                  Your paycheck, decoded
                </span>
              </div>
              <button
                type="button"
                onClick={() => goTo('profile')}
                aria-label="Profile"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-[11px] font-semibold text-ink ${
                  screen === 'profile' ? 'ring-2 ring-pink-dark' : ''
                } bg-pink`}
              >
                {currentUser.avatarInitials}
              </button>
            </div>
          )}

          <ToastProvider>
            <div className="no-scrollbar flex-1 overflow-y-auto px-4.5 pb-4.5">{children}</div>
            {isAppStage && <TabBar />}
          </ToastProvider>
        </div>
      </div>
    </div>
  );
}
