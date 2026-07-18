"use client";

import { useEffect, type RefObject } from "react";

export function useScrollToTop(ref: RefObject<HTMLElement | null>, value: unknown) {
  useEffect(() => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [ref, value]);
}
