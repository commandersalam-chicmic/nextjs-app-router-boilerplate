"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollReveal(threshold = 0.05) {
  const [isRevealed, setIsRevealed] = useState(() => {
    return typeof window === "undefined" || !("IntersectionObserver" in window);
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) {
      setIsRevealed(false);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, [threshold]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [refCallback, isRevealed] as const;
}
