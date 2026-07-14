"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Compass,
  Code,
  Layout,
  Gauge,
  type Icon,
} from "@phosphor-icons/react";
import { services, type Service, type ServiceIcon } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<ServiceIcon, Icon> = {
  strategy: Compass,
  engineering: Code,
  interface: Layout,
  systems: Gauge,
};

function onMove(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Card({
  service,
  index,
  item,
}: {
  service: Service;
  index: number;
  item: Variants;
}) {
  const Glyph = ICONS[service.icon];
  return (
    <motion.article
      variants={item}
      onMouseMove={onMove}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
      className="glass group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(13,15,17,0.5)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 md:p-10"
    >
      {/* Cursor-following spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(34,211,238,0.13), transparent 70%)",
        }}
      />
      {/* Brighter top-edge highlight on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Glyph
            weight="thin"
            className="size-7 text-signal/80 transition-colors duration-300 group-hover:text-signal"
          />
        </div>

        <h3 className="mt-10 font-display text-xl font-medium tracking-tight text-bone md:text-2xl">
          {service.name}
        </h3>
        <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Services() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1 },
    },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section
      id="servicios"
      className="relative overflow-hidden py-28 md:py-36"
    >
      {/* Soft cyan glows behind the grid — material for the glass to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[6%] top-[12%] h-[42vh] w-[42vw]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.10), transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[4%] left-[8%] h-[36vh] w-[36vw]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.06), transparent 65%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 md:px-20 lg:px-28">
        {/* Numbered section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3">
            <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">
              <span className="text-signal">{services.index}</span>
              <span className="text-faint"> / {services.label}</span>
            </span>
          </div>
          <h2 className="mt-6 max-w-[20ch] font-display text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-bone md:text-5xl">
            {services.heading}
          </h2>
        </motion.div>

        {/* Glass card grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {services.items.map((service, i) => (
            <Card key={service.name} service={service} index={i} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
