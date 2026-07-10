import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/** A bottom sheet that overlays the whole phone frame, matching the reference's `.overlay`/`.modal` pattern. */
export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="absolute inset-0 z-60 flex items-end justify-center rounded-[38px] bg-ink/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="no-scrollbar max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-card px-5 pt-5 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {children}
      </div>
    </div>
  );
}
