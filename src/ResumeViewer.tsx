import { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import { useResumeViewer } from './ResumeViewerContext';

const ResumeViewer = () => {
  const { open, closeResume } = useResumeViewer();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeResume();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, closeResume]);

  useEffect(() => {
    if (!open) return;
    overlayRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) closeResume(); }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800/50 px-4 py-3 md:px-6">
        <span className="text-sm font-medium text-zinc-400">Resume — Sushant Chaudhary</span>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            <Download size={14} />
            Download
          </a>
          <button
            onClick={closeResume}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 transition-colors hover:bg-white hover:text-black"
            aria-label="Close resume viewer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* PDF Embed */}
      <div className="flex flex-1 items-start justify-center overflow-auto p-2 md:p-6">
        <embed
          src="/resume.pdf#view=FitH"
          type="application/pdf"
          className="h-full w-full max-w-4xl rounded-lg shadow-2xl"
          aria-label="Resume PDF document"
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
