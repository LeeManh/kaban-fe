"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [onClickOutside]);

  return ref;
}
