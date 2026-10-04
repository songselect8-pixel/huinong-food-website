"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { emptyBrief, emptyInquiry, readInquiryRequest, type InquiryBrief, type InquiryFields } from "@/data/inquiry";

type Draft = {
  fields: InquiryFields;
  patch: (value: Partial<InquiryFields>) => void;
  applyBrief: (value: Partial<InquiryBrief>) => void;
  clearBrief: () => void;
  clearAll: () => void;
  notice: string;
  acceptRoute: (key: string, value: InquiryBrief) => void;
};
const InquiryDraftContext = createContext<Draft | null>(null);

function RoutePrefill() {
  const pathname = usePathname();
  const search = useSearchParams();
  const { acceptRoute } = useInquiryDraft();
  useEffect(() => {
    const path = pathname.replace(/\/$/, "");
    if (path !== "" && path !== "/contact") return;
    const brief = readInquiryRequest(new URLSearchParams(search.toString()));
    if (brief) acceptRoute(`${path}?${search.toString()}`, brief);
  }, [pathname, search, acceptRoute]);
  return null;
}

// One in-memory draft survives Next.js navigation. No browser storage, network submission or analytics.
export function InquiryProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<InquiryFields>(emptyInquiry);
  const [notice, setNotice] = useState("");
  const lastRoute = useRef("");
  const patch = useCallback((value: Partial<InquiryFields>) => setFields(current => ({ ...current, ...value })), []);
  const applyBrief = useCallback((value: Partial<InquiryBrief>) => {
    lastRoute.current = "";
    setFields(current => ({ ...current, ...emptyBrief, ...value }));
    setNotice("Your sourcing details have been updated. Your contact details and message are unchanged.");
  }, []);
  const acceptRoute = useCallback((key: string, value: InquiryBrief) => {
    if (lastRoute.current === key) return;
    applyBrief(value);
    lastRoute.current = key;
  }, [applyBrief]);
  const clearBrief = useCallback(() => {patch(emptyBrief); setNotice("Sourcing details removed. Your contact details and message are unchanged.");}, [patch]);
  const clearAll = useCallback(() => {setFields(emptyInquiry); setNotice("Draft cleared.");}, []);
  return <InquiryDraftContext.Provider value={{ fields, patch, applyBrief, clearBrief, clearAll, notice, acceptRoute }}><Suspense fallback={null}><RoutePrefill /></Suspense>{children}</InquiryDraftContext.Provider>;
}

export function useInquiryDraft() {
  const context = useContext(InquiryDraftContext);
  if (!context) throw new Error("Inquiry components must be inside InquiryProvider");
  return context;
}
