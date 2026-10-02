"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type BriefUpdate = {
  interest?: string;
  note: string;
};

type InquiryDraftValue = {
  interest: string;
  setInterest: (value: string) => void;
  contextNote: string | null;
  applyBrief: (update: BriefUpdate) => void;
  clearBrief: () => void;
};

const InquiryDraftContext = createContext<InquiryDraftValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [interest, setInterest] = useState("");
  const [contextNote, setContextNote] = useState<string | null>(null);

  const applyBrief = useCallback(({ interest: nextInterest, note }: BriefUpdate) => {
    if (nextInterest !== undefined) setInterest(nextInterest);
    setContextNote(note);
  }, []);

  const clearBrief = useCallback(() => setContextNote(null), []);

  return (
    <InquiryDraftContext.Provider value={{ interest, setInterest, contextNote, applyBrief, clearBrief }}>
      {children}
    </InquiryDraftContext.Provider>
  );
}

export function useInquiryDraft() {
  const context = useContext(InquiryDraftContext);
  if (!context) throw new Error("Inquiry components must be inside InquiryProvider");
  return context;
}
