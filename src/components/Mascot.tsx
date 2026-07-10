/** Intrinsic aspect ratio of the source artwork (400×480) — height is derived from `size`
 *  so the mascot is never stretched to fit a container. */
const ASPECT_RATIO = 480 / 400;

interface MascotProps {
  /** Rendered width in px; height follows the artwork's aspect ratio. */
  size?: number;
  className?: string;
}

/** Stub, the Decoded mascot — a friendly document character holding a magnifying glass. */
export function Mascot({ size = 96, className = '' }: MascotProps) {
  return (
    <svg
      width={size}
      height={size * ASPECT_RATIO}
      viewBox="0 0 400 480"
      role="img"
      aria-label="Stub, the Decoded app mascot: a friendly document character holding a magnifying glass"
      className={className}
    >
      <ellipse cx="200" cy="465" rx="95" ry="12" fill="#1A1A1A" opacity="0.08" />

      <path d="M92,235 Q45,255 38,298" fill="none" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
      <circle cx="35" cy="300" r="18" fill="#FFFDF8" stroke="#E8467C" strokeWidth="5" />
      <line x1="48" y1="313" x2="70" y2="338" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />

      <path d="M308,235 Q365,200 380,150" fill="none" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />

      <line x1="160" y1="388" x2="160" y2="440" stroke="#1A1A1A" strokeWidth="14" strokeLinecap="round" />
      <line x1="240" y1="388" x2="240" y2="440" stroke="#1A1A1A" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="160" cy="448" rx="20" ry="11" fill="#1A1A1A" />
      <ellipse cx="240" cy="448" rx="20" ry="11" fill="#1A1A1A" />

      <rect x="90" y="110" width="220" height="280" rx="32" fill="#FFFDF8" stroke="#E8467C" strokeWidth="6" />

      <path d="M255,110 L310,110 L310,165 Z" fill="#F5D93A" stroke="#E8467C" strokeWidth="2" />
      <path d="M255,110 L310,165" fill="none" stroke="#E8467C" strokeWidth="3" />

      <path
        d="M330,122 L336,134 L348,136 L339,145 L342,157 L330,150 L318,157 L321,145 L312,136 L324,134 Z"
        fill="#F5D93A"
      />
      <path d="M66,118 L70,126 L78,128 L72,134 L74,142 L66,138 L58,142 L60,134 L54,128 L62,126 Z" fill="#F5D93A" />

      <circle cx="155" cy="220" r="16" fill="#1A1A1A" />
      <circle cx="245" cy="220" r="16" fill="#1A1A1A" />
      <circle cx="160" cy="214" r="5" fill="#FFFDF8" />
      <circle cx="250" cy="214" r="5" fill="#FFFDF8" />

      <ellipse cx="140" cy="250" rx="14" ry="9" fill="#E8467C" opacity="0.35" />
      <ellipse cx="260" cy="250" rx="14" ry="9" fill="#E8467C" opacity="0.35" />

      <path d="M165,255 Q200,280 235,255" fill="none" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />

      <line x1="145" y1="285" x2="255" y2="285" stroke="#E8467C" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
      <line x1="145" y1="300" x2="225" y2="300" stroke="#E8467C" strokeWidth="5" strokeLinecap="round" opacity="0.3" />

      <circle cx="200" cy="335" r="24" fill="#F5D93A" stroke="#1A1A1A" strokeWidth="3" />
      <text x="200" y="345" fontFamily="Georgia, serif" fontSize="26" fontWeight="700" fill="#C2185B" textAnchor="middle">
        $
      </text>
    </svg>
  );
}
