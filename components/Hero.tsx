"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { HeroTech } from "@/components/HeroTech";
import { hero } from "@/content/hero";

const WireframeField = dynamic(() => import("@/components/WireframeField"), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden">
      {/* Node network — atmosphere on the right; fades in after the text leads */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: reduce ? 0 : 0.15 }}
        className="absolute inset-0 z-0"
      >
        <WireframeField className="absolute inset-0" />
      </motion.div>

      {/* Engineering blueprint layer — grid, rulers, crosshair (right only) */}
      <HeroTech />

      {/* Legibility scrim: NEAR-SOLID black on the left (clean text, no blur),
          fully clear on the right so the node network stays crisp. No
          backdrop-filter — blur was what smeared the whole field. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage: [
            "linear-gradient(90deg, #0a0a0b 0%, #0a0a0b 33%, rgba(10,10,11,0.82) 49%, rgba(10,10,11,0.32) 67%, rgba(10,10,11,0) 84%)",
            "linear-gradient(0deg, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.25) 34%, rgba(10,10,11,0) 56%)",
            "linear-gradient(180deg, rgba(10,10,11,0.8) 0%, rgba(10,10,11,0) 16%)",
          ].join(","),
        }}
      />

      {/* Soft cinematic vignette — focuses the frame without dimming the net */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(125% 110% at 60% 42%, transparent 50%, rgba(7,8,8,0.45) 82%, rgba(5,6,6,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-8 pb-32 pt-36 sm:px-12 md:px-20 md:pt-40 lg:px-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[62rem]"
        >
          {/* Eyebrow — datum marker, the single glowing detail at rest */}
          <motion.div variants={item} className="mb-7 flex items-center gap-3">
            <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-medium leading-[0.95] tracking-[-0.03em] text-bone text-[clamp(2.6rem,8vw,6.5rem)]">
            {hero.headline.map((line, i) => (
              <motion.span key={i} variants={item} className="block">
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="mt-9 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href={hero.primary.href}
              className="group inline-flex items-center gap-3 border border-line-2 px-6 py-3.5 text-sm font-medium text-bone transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:border-signal hover:bg-signal hover:text-ink hover:shadow-[0_0_28px_rgba(34,211,238,0.3)] active:scale-[0.98]"
            >
              {hero.primary.label}
              <ArrowRight
                weight="bold"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={hero.secondary.href}
              className="group inline-flex items-center gap-2 px-2 py-3.5 text-sm text-muted transition-colors duration-200 ease-out hover:text-bone active:scale-[0.98]"
            >
              {hero.secondary.label}
              <ArrowUpRight
                weight="bold"
                className="size-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
              />
            </a>
          </motion.div>

          {/* Credential metrics — fills the lower hero, mono labels + display numbers.
              Se oculta cuando no hay métricas. */}
          {hero.metrics.length > 0 && (
            <motion.dl
              variants={item}
              className="mt-16 flex max-w-xl flex-wrap gap-x-12 gap-y-6 border-t border-line/70 pt-8"
            >
              {hero.metrics.map((m, i) => (
                <div key={m.label} className="relative pl-5 first:pl-0">
                  {i > 0 && (
                    <span className="absolute bottom-1 left-0 top-1 w-px bg-line-2" />
                  )}
                  <dt className="font-display text-3xl font-medium leading-none text-bone md:text-4xl">
                    {m.value}
                  </dt>
                  <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                    {m.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </motion.div>
      </div>

      {/* Minimal scroll indicator — no text, a light that travels the line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="relative h-12 w-px overflow-hidden bg-line-2">
          <motion.span
            className="absolute left-1/2 top-0 size-1 -translate-x-1/2 bg-signal shadow-[0_0_10px_rgba(34,211,238,0.9)]"
            animate={
              reduce ? undefined : { y: [-4, 48], opacity: [0, 1, 1, 0] }
            }
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </div>
      </div>
    </section>
  );
}
