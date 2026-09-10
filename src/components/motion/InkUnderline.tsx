"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Wraps a headline keyword with a hand-drawn underline that draws itself in
 * as it scrolls into view, like ink from a pen. Renders fully drawn (no
 * animation) when the visitor prefers reduced motion.
 */
export function InkUnderline({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <span className={`relative inline-block whitespace-nowrap ${className ?? ""}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 18"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 left-0 h-[0.5em] w-full"
      >
        <motion.path
          d="M2 12 C 40 4, 80 16, 120 8 S 180 4, 198 10"
          fill="none"
          stroke={`url(#ink-${id})`}
          strokeWidth="5"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
        />
        <defs>
          <linearGradient id={`ink-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--c-highlighter))" />
            <stop offset="100%" stopColor="rgb(var(--c-highlighter-mint))" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
