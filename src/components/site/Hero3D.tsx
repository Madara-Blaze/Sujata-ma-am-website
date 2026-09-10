"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSearch } from "@/components/site/HeroSearch";
import { Counter } from "@/components/motion/Counter";
import { InkUnderline } from "@/components/motion/InkUnderline";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

// The WebGL scene only ever renders on the client; while loading (or if
// WebGL is unavailable / motion is reduced) a static illustration stands in.
const NotebookScene = dynamic(() => import("@/components/site/NotebookScene"), {
  ssr: false,
  loading: () => null,
});

const STATS = [
  { value: 2400, suffix: "+", label: "Verified teachers" },
  { value: 38, suffix: "", label: "States covered" },
  { value: 4.9, suffix: "★", label: "Avg. rating", decimals: 1 },
  { value: 0, suffix: "%", label: "Agency markup" },
];

export function Hero3D() {
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();
  const showScene = webgl && !reduced;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full opacity-30 sm:w-4/5 sm:opacity-60 lg:w-3/5 lg:opacity-100" aria-hidden>
        {showScene ? (
          <NotebookScene />
        ) : (
          <StaticSceneFallback />
        )}
      </div>
      {/* readability ramp so copy stays legible over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent lg:via-background/45" />

      <div className="container-max relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hand"
          >
            psst — turn your Tuesday nights into extra income
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-md font-sans text-display text-ink md:text-display-xl"
          >
            Learn from real{" "}
            <InkUnderline>
              <span>teachers</span>
            </InkUnderline>
            , on the side.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-lg max-w-xl text-body-lg text-on-surface-variant"
          >
            Book verified, working teachers for 1-on-1 tutoring and skill coaching — from algebra to
            guitar to job interviews. Direct booking, no agency markup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="index-card mt-xl p-2"
          >
            <HeroSearch />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="mt-lg flex flex-wrap items-center gap-3"
          >
            <Link href="/tutors" className="btn-primary">
              Browse tutors <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/teach" className="btn-ghost">
              Become a tutor
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="index-card px-md py-md">
                <dd className="font-sans text-headline-md font-bold text-primary">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
                  {s.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function StaticSceneFallback() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full opacity-70" aria-hidden>
      <g fill="none" stroke="rgb(var(--c-outline))" strokeWidth="2">
        <path d="M60 120 L130 100 L100 140 Z" fill="rgb(var(--c-primary) / 0.35)" />
        <path d="M260 60 L330 90 L280 110 Z" fill="rgb(var(--c-margin) / 0.35)" />
        <rect x="180" y="220" width="90" height="60" rx="6" fill="rgb(var(--c-surface-container-lowest))" />
        <line x1="90" y1="260" x2="90" y2="340" strokeWidth="6" strokeLinecap="round" stroke="#e8c98a" />
        <path d="M85 258 L95 258 L90 240 Z" fill="#3a2a1a" />
      </g>
    </svg>
  );
}
