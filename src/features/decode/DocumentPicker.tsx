import { useRef } from 'react';

interface DocumentPickerProps {
  docLabel: string;
  sampleTag: string;
  sampleTitle: string;
  sampleSub: string;
  buttonLabel: string;
  sampleSelected: boolean;
  fileName: string | null;
  decoding: boolean;
  canDecode: boolean;
  onSelectSample: () => void;
  onSelectFile: (file: File) => void;
  onClearFile: () => void;
  onDecode: () => void;
}

export function DocumentPicker({
  docLabel,
  sampleTag,
  sampleTitle,
  sampleSub,
  buttonLabel,
  sampleSelected,
  fileName,
  decoding,
  canDecode,
  onSelectSample,
  onSelectFile,
  onClearFile,
  onDecode,
}: DocumentPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {fileName ? (
        <div className="mb-3.5 rounded-2xl border border-solid border-pink bg-pink-pale px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-pink-dark text-[11px] font-bold text-white">
              {fileName.toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMG'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-semibold text-ink">{fileName}</div>
              <div className="text-[10.5px] text-ink-soft">ready to decode</div>
            </div>
            <button
              type="button"
              onClick={onClearFile}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-paper-line bg-card text-xs font-bold text-ink"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
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
      )}
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

      <div className="my-3.5 flex items-center gap-2.5 font-mono text-[10px] font-semibold tracking-wide text-ink-soft uppercase before:h-px before:flex-1 before:bg-paper-line before:content-[''] after:h-px after:flex-1 after:bg-paper-line after:content-['']">
        or try a sample
      </div>

      <button
        type="button"
        onClick={onSelectSample}
        className={`mb-2.5 w-full rounded-2xl border-[1.5px] p-4 text-left ${
          sampleSelected ? 'border-solid border-pink bg-pink-pale' : 'border-paper-line bg-card'
        }`}
      >
        <div className="font-mono text-[9.5px] tracking-wider text-pink-dark uppercase">{sampleTag}</div>
        <h4 className="mt-1.5 mb-0.5 font-serif text-[15px] text-ink">{sampleTitle}</h4>
        <p className="text-[11.5px] text-ink-soft">{sampleSub}</p>
      </button>

      <button
        type="button"
        disabled={!canDecode}
        onClick={onDecode}
        className="mt-1.5 w-full rounded-full bg-ink px-4.5 py-3.5 text-center font-mono text-[12.5px] text-white disabled:opacity-40"
      >
        {buttonLabel}
      </button>

      {decoding && (
        <div className="flex items-center gap-2.5 py-3.5 font-mono text-[12px] text-pink-dark">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink [animation-delay:300ms]" />
          <span>Reading the fine print…</span>
        </div>
      )}
    </div>
  );
}
