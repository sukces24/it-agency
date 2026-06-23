"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 * Adds `reveal-ready` to <html> only when JS runs, so content stays visible
 * without JS. Elements with `.reveal` / `.reveal-stagger` animate in once.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger"),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
