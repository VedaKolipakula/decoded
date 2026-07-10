import { useState } from 'react';

const DETECT_DELAY_MS = 950;

/**
 * Selecting a file or the sample now immediately runs the "reading the fine print" beat and
 * reveals a Detected-document card — the specific company/salary details must never render
 * before that, or the sample reads as pre-filled content instead of something extracted.
 * Pressing "Decode this offer/stub →" afterward just flips `done`, no second loading step.
 */
export function useDocumentDecode() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [sampleSelected, setSampleSelected] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [done, setDone] = useState(false);

  const canDecode = detected;

  function runDetection() {
    setDetecting(true);
    setDetected(false);
    setDone(false);
    window.setTimeout(() => {
      setDetecting(false);
      setDetected(true);
    }, DETECT_DELAY_MS);
  }

  function selectSample() {
    setSampleSelected(true);
    setFileName(null);
    runDetection();
  }

  function selectFile(file: File) {
    setFileName(file.name);
    setSampleSelected(false);
    runDetection();
  }

  function clearFile() {
    setFileName(null);
    setSampleSelected(false);
    setDetecting(false);
    setDetected(false);
    setDone(false);
  }

  function decode() {
    if (!detected) return;
    setDone(true);
  }

  return {
    fileName,
    sampleSelected,
    detecting,
    detected,
    done,
    canDecode,
    selectSample,
    selectFile,
    clearFile,
    decode,
  };
}
