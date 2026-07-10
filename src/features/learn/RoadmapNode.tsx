type NodeStatus = 'locked' | 'unread' | 'read' | 'quiz-locked' | 'quiz-ready';

interface RoadmapNodeProps {
  status: NodeStatus;
  icon: string;
  title: string;
  sub: string;
  badge: string;
  onClick: () => void;
}

const CARD_STYLES: Record<NodeStatus, string> = {
  locked: 'border-paper-line bg-card opacity-55',
  unread: 'border-yellow-dark bg-[#fffff8]',
  read: 'border-pink bg-pink-pale',
  'quiz-locked': 'border-paper-line bg-card opacity-55',
  'quiz-ready': 'border-pink-mid bg-pink-pale',
};

const ICON_STYLES: Record<NodeStatus, string> = {
  locked: 'bg-paper-line text-ink-soft',
  unread: 'bg-yellow text-ink',
  read: 'bg-pink text-white',
  'quiz-locked': 'bg-paper-line text-ink-soft',
  'quiz-ready': 'bg-pink text-white',
};

const BADGE_STYLES: Record<NodeStatus, string> = {
  locked: 'bg-paper-line text-ink-soft',
  unread: 'bg-yellow text-ink',
  read: 'bg-pink text-white',
  'quiz-locked': 'bg-paper-line text-ink-soft',
  'quiz-ready': 'bg-pink text-white',
};

export function RoadmapNode({ status, icon, title, sub, badge, onClick }: RoadmapNodeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-2 flex w-full items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3.5 text-left transition-colors ${CARD_STYLES[status]}`}
    >
      <div className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full text-[16px] ${ICON_STYLES[status]}`}>
        {status === 'read' ? '✓' : icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-serif text-[14.5px] font-semibold text-ink">{title}</div>
        <div className="text-[11px] text-ink-soft">{sub}</div>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-1 font-mono text-[9px] font-semibold whitespace-nowrap ${BADGE_STYLES[status]}`}>
        {badge}
      </span>
    </button>
  );
}
