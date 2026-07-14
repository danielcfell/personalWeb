"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const COLS = 11;
const ROWS = 22; // bits per half-column (content is duplicated for a seamless loop)

// Deterministic seed so server and client render identical bits (no hydration
// mismatch); flips only happen after mount.
const seed = (c: number, r: number) =>
  (c * 7 + r * 13 + c * r * 3) % 5 < 2 ? "1" : "0";

// Per-column drift speed + offset, varied for a parallax feel.
const DURATION = (c: number) => 46 + (c % 5) * 9; // 46s..82s
const DELAY = (c: number) => -((c * 4.7) % 20).toFixed(1);

export function HeroTech() {
  const reduce = useReducedMotion();
  const [bits, setBits] = useState<string[][]>(() =>
    Array.from({ length: COLS }, (_, c) =>
      Array.from({ length: ROWS }, (_, r) => seed(c, r)),
    ),
  );

  // A couple of digits flip about every second. Alive, never Matrix rain.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setBits((prev) => {
        const next = prev.map((col) => col.slice());
        for (let k = 0; k < 2; k++) {
          const c = Math.floor(Math.random() * COLS);
          const r = Math.floor(Math.random() * ROWS);
          next[c][r] = next[c][r] === "1" ? "0" : "1";
        }
        return next;
      });
    }, 850);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: reduce ? 0 : 0.6 }}
      className="pointer-events-none absolute inset-0 z-[1]"
    >
      {/* Binary "data field" — flows behind the network on the right.
          Fades to nothing before reaching the headline on the left. */}
      <div
        className="absolute inset-y-0 left-[38%] right-[3%] flex justify-between"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 16%, black 44%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 16%, black 44%)",
        }}
      >
        {bits.map((col, c) => (
          <div
            key={c}
            className="relative h-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(0deg, transparent 0%, black 16%, black 84%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(0deg, transparent 0%, black 16%, black 84%, transparent 100%)",
            }}
          >
            <div
              className="binary-stream flex flex-col gap-2 font-mono text-[11px] leading-none text-signal/20"
              style={{
                animationDuration: `${DURATION(c)}s`,
                animationDelay: `${DELAY(c)}s`,
              }}
            >
              {[...col, ...col].map((b, i) => (
                <span key={i}>{b}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
