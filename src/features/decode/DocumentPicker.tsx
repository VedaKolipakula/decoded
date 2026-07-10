import { useRef } from 'react';

interface DocumentPickerProps {
  docLabel: string;
  sampleTitle: string;
  sampleSub: string;
  /** Shown as the "From:" filename when the sample path (not a real upload) is used. */
  samplePlaceholderFileName: string;
  buttonLabel: string;
  fileName: string | null;
  sampleSelected: boolean;
  detecting: boolean;
  detected: boolean;
  onSelectSample: () => void;
  onSelectFile: (file: File) => void;
  onClearFile: () => void;
  onDecode: () => void;
}

export function DocumentPicker({
  docLabel,
  sampleTitle,
  sampleSub,
  samplePlaceholderFileName,
  buttonLabel,
  fileName,
  sampleSelected,
  detecting,
  detected,
  onSelectSample,
  onSelectFile,
  onClearFile,
  onDecode,
}: DocumentPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayFileName = fileName ?? (sampleSelected ? samplePlaceholderFileName : null);

  if (detected) {
    return (
      <div>
        <div className="mb-3.5 rounded-2xl border border-solid border-pink bg-pink-pale px-4 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-mono text-[9.5px] tracking-wider text-pink-dark uppercase">Detected</div>
            <button
              type="button"
              onClick={onClearFile}
              aria-label="Remove document"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-paper-line bg-card text-xs font-bold text-ink"
            >
              ×
            </button>
          </div>
          <div className="mt-1 text-[10.5px] text-ink-soft">From: {displayFileName}</div>
          <h4 className="mt-2 mb-0.5 font-serif text-[15px] text-ink">{sampleTitle}</h4>
          <p className="text-[11.5px] text-ink-soft">{sampleSub}</p>
        </div>

        <button
          type="button"
          onClick={onDecode}
          className="mt-1.5 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white"
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelectFile(file);
        }}
      />

      {detecting ? (
        <div className="flex items-center gap-2.5 py-3.5 font-mono text-[12px] text-pink-dark">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink [animation-delay:300ms]" />
          <span>Reading the fine print…</span>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mb-3.5 w-full rounded-2xl border-2 border-dashed border-paper-line bg-paper px-4 py-5 text-center transition-colors hover:border-pink hover:bg-pink-pale"
          >
            <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper-line bg-card text-[15px] font-bold text-pink-dark">
              ↑
            </div>
            <h4 className="mb-0.5 font-serif text-[14px] font-semibold text-ink">Upload your {docLabel}</h4>
            <p className="text-[11px] text-ink-soft">PDF, JPG, or PNG — we'll decode it for you</p>
          </button>

          <button
            type="button"
            onClick={onSelectSample}
            className="w-full text-center font-mono text-[11.5px] text-pink-dark underline underline-offset-2"
          >
            Don't have a file? Try a sample {docLabel}
          </button>
        </>
      )}
    </div>
  );
}
