import { useState } from 'react';

const DECODE_DELAY_MS = 950;

export function useDocumentDecode() {
  const [sampleSelected, setSampleSelected] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [decoding, setDecoding] = useState(false);
  const [done, setDone] = useState(false);

  const canDecode = sampleSelected || fileName !== null;

  function selectSample() {
    setSampleSelected(true);
    setFileName(null);
    setDone(false);
  }

  function selectFile(file: File) {
    setFileName(file.name);
    setSampleSelected(false);
    setDone(false);
  }

  function clearFile() {
    setFileName(null);
    setDone(false);
  }

  function decode() {
    if (!sampleSelected && !fileName) return;
    setDecoding(true);
    setDone(false);
    window.setTimeout(() => {
      setDecoding(false);
      setDone(true);
    }, DECODE_DELAY_MS);
  }

  return {
    sampleSelected,
    fileName,
    decoding,
    done,
    canDecode,
    selectSample,
    selectFile,
    clearFile,
    decode,
  };
}
