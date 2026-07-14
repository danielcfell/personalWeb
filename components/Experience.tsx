"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { experience } from "@/content/experience";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 },
    },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="experiencia" className="relative overflow-hidden py-28 md:py-36">
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 md:px-20 lg:px-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3">
            <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">
              <span className="text-signal">{experience.index}</span>
              <span className="text-faint"> / {experience.label}</span>
            </span>
          </div>
          <h2 className="mt-6 max-w-[20ch] font-display text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-bone md:text-5xl">
            {experience.heading}
          </h2>
        </motion.div>

        {/* Timeline — a signal line runs down the left; each role is a node */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative ml-1 border-l border-line-2 pl-8 md:ml-2 md:pl-12"
        >
          {experience.roles.map((r) => (
            <motion.li
              key={`${r.org}-${r.period}`}
              variants={item}
              className="relative pb-14 last:pb-0"
            >
              {/* Node dot sitting on the line */}
              <span
                aria-hidden
                className="absolute -left-[calc(2rem+1px)] top-1.5 grid size-4 -translate-x-1/2 place-items-center md:-left-[calc(3rem+1px)]"
              >
                <span className="size-2 rounded-full bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              </span>

              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {r.period}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-bone md:text-2xl">
                {r.role}
              </h3>
              <p className="mt-1 font-mono text-sm tracking-[0.02em] text-signal">
                {r.org}
              </p>

              <ul className="mt-5 space-y-3">
                {r.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="relative max-w-[64ch] pl-5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-2.5 size-1 rounded-full bg-signal/60"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
