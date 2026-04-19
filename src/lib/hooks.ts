'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { GtagParams } from '@/types';

/* ================================================================
   useCounter
   Animates a number from 0 → target over ~1800ms using
   requestAnimationFrame with a cubic ease-out curve.
   Much smoother than a fixed setInterval at 16ms.
   ================================================================ */
export function useCounter(target: number, delay = 500): number {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let rafId: number;
    const timeoutId = setTimeout(() => {
      const duration = 1800;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out: decelerates towards the end
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.floor(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [target, delay]);

  return val;
}

/* ================================================================
   useLiveCount
   Simulates a live value fluctuating around `base` by ±`variance`
   every 5 seconds — mimics a real-time IoT feed.
   Uses stable refs so the interval is never recreated.
   ================================================================ */
export function useLiveCount(base: number, variance: number): number {
  const [val, setVal] = useState(base);
  const baseRef     = useRef(base);
  const varianceRef = useRef(variance);

  // Keep refs in sync without recreating the effect
  useEffect(() => {
    baseRef.current     = base;
    varianceRef.current = variance;
  });

  useEffect(() => {
    const iv = setInterval(() => {
      setVal(
        baseRef.current +
          Math.floor((Math.random() - 0.5) * varianceRef.current)
      );
    }, 5000);
    return () => clearInterval(iv);
  }, []); // intentionally stable — reads from refs

  return val;
}

/* ================================================================
   useReveal
   Attaches an IntersectionObserver to every `.reveal` element on
   the page and adds `.visible` when they scroll into view.
   ================================================================ */
export function useReveal(): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ================================================================
   useGoogleAnalytics
   Returns a stable `trackEvent` function that fires GA4 events
   via the global gtag. Safe to call even when GA isn't loaded.
   ================================================================ */
export function useGoogleAnalytics() {
  const trackEvent = useCallback((eventName: string, params?: GtagParams) => {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }, []);

  return { trackEvent };
}
