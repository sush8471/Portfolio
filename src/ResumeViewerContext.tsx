import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ResumeViewerContextValue {
  open: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeViewerContext = createContext<ResumeViewerContextValue | null>(null);

export const ResumeViewerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const openResume = useCallback(() => setOpen(true), []);
  const closeResume = useCallback(() => setOpen(false), []);

  return (
    <ResumeViewerContext.Provider value={{ open, openResume, closeResume }}>
      {children}
    </ResumeViewerContext.Provider>
  );
};

export const useResumeViewer = (): ResumeViewerContextValue => {
  const ctx = useContext(ResumeViewerContext);
  if (!ctx) throw new Error('useResumeViewer must be used within ResumeViewerProvider');
  return ctx;
};
