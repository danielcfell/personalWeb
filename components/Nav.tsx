"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { site } from "@/content/site";
import { nav } from "@/content/nav";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  // Scroll-spy — marks the section currently in view. No scroll listener.
  useEffect(() => {
    const ids = nav.items.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-6">
      <div className="glass relative mx-auto flex max-w-[1040px] items-center justify-between gap-6 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] py-2 pl-5 pr-2 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {/* Faint lime glow at the capsule ends */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 size-28 -translate-x-1/3 -translate-y-1/2 rounded-full bg-signal/10 blur-2xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 size-28 translate-x-1/3 -translate-y-1/2 rounded-full bg-signal/10 blur-2xl"
        />

        {/* Wordmark */}
        <a
          href="#top"
          className="group relative z-10 flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-base font-bold tracking-[0.06em] text-bone"
        >
          {site.name}
          <span className="size-1.5 bg-signal shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-transform duration-300 group-hover:scale-125" />
        </a>

        {/* Center nav — active item sits in its own lime pill.
            Aparece desde 1100px: por debajo, el nav no cabe junto al wordmark y
            los botones, y la capsula desbordaba partiendo el wordmark en varias
            lineas (pasaba ya con el breakpoint md original). */}
        <nav className="relative z-10 hidden items-center gap-1 min-[1100px]:flex">
          {nav.items.map((item, i) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-signal/15 ring-1 ring-signal/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`tabular-nums transition-colors duration-300 ${
                      isActive ? "text-signal" : "text-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-signal"
                        : "text-muted group-hover:text-signal"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          {/* CV — ghost outline, secundario frente al CTA de contacto.
              Oculto por debajo de sm: en un movil de 390px la capsula ya va
              justa con el wordmark y el CTA. Ahi el enlace del hero cubre la
              descarga. */}
          <a
            href={nav.cv.href}
            download
            className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:border-signal/40 hover:text-signal active:translate-y-px sm:inline-flex"
          >
            {nav.cv.label}
            <DownloadSimple
              weight="bold"
              className="size-3.5 text-faint transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-signal"
            />
          </a>

          {/* CTA — solid cyan, subtle glow */}
          <a
            href={nav.cta.href}
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-signal px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.55)] active:translate-y-px"
          >
            {nav.cta.label}
            <ArrowUpRight
              weight="bold"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
