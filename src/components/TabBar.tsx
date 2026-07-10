import { useNavigation, type Screen } from '../app/NavigationContext';

const TABS: { screen: Screen; label: string; icon: string }[] = [
  { screen: 'home', label: 'Home', icon: '🏠' },
  { screen: 'decode', label: 'Decode', icon: '$' },
  { screen: 'compare', label: 'Compare', icon: '⇄' },
  { screen: 'mentors', label: 'Mentors', icon: '👥' },
  { screen: 'learn', label: 'Learn', icon: '📘' },
];

export function TabBar() {
  const { screen, goTo } = useNavigation();

  return (
    <nav className="flex shrink-0 items-center justify-around border-t border-paper-line bg-card pt-2.5 pr-1 pb-3 pl-1">
      {TABS.map((tab) => {
        const active = screen === tab.screen;
        return (
          <button
            key={tab.screen}
            type="button"
            onClick={() => goTo(tab.screen)}
            className={`flex flex-col items-center gap-0.5 px-1.5 py-1 font-mono text-[9px] tracking-wide ${
              active ? 'text-pink-dark' : 'text-ink-soft'
            }`}
          >
            <span
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-lg text-[15px] ${
                active ? 'bg-pink-pale text-pink-dark' : ''
              }`}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
