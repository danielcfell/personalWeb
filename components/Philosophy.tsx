"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { philosophy } from "@/content/philosophy";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Philosophy() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.1 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="filosofia" className="relative overflow-hidden py-32 md:py-48">
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 md:px-20 lg:px-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">
              <span className="text-signal">{philosophy.index}</span>
              <span className="text-faint"> / {philosophy.label}</span>
            </span>
          </div>
        </motion.div>

        {/* Principles */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-line/60 md:grid-cols-3"
        >
          {philosophy.principles.map((p, i) => (
            <motion.li
              key={p.title}
              variants={item}
              className="bg-ink p-8 md:p-10"
            >
              <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-bone md:text-xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
