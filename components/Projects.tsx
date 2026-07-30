"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Monitor,
  DeviceMobile,
} from "@phosphor-icons/react";
import { projects, type Project, type Shot } from "@/content/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* Crossfading image carousel shared by both frames. */
function Carousel({
  shots,
  index,
  reduce,
}: {
  shots: Shot[];
  index: number;
  reduce: boolean;
}) {
  const shot = shots[index];
  if (!shot) return null;
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.img
        key={shot.src}
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
        className="absolute inset-0 size-full object-cover object-top [filter:saturate(0.9)_brightness(0.95)] transition-[filter] duration-500 ease-out group-hover:[filter:saturate(1)_brightness(1)]"
      />
    </AnimatePresence>
  );
}

function BrowserFrame({
  project,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const shots = project.desktop;
  return (
    <div className="glass relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-[transform,border-color,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-signal/30 group-hover:shadow-[0_28px_70px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.12)]">
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <div className="ml-1 flex h-5 flex-1 items-center rounded-md bg-white/[0.04] px-3">
          <span className="font-mono text-[10px] tracking-[0.08em] text-faint">
            {project.liveUrl ? domainOf(project.liveUrl) : project.name.toLowerCase()}
          </span>
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Carousel shots={shots} index={index} reduce={reduce} />
      </div>
    </div>
  );
}

function PhoneFrame({
  project,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const shots = project.mobile ?? [];
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="glass relative overflow-hidden rounded-[2.4rem] border border-white/10 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-[transform,border-color,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-signal/30 group-hover:shadow-[0_28px_70px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.12)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] bg-surface">
          {/* notch */}
          <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/15" />
          <Carousel shots={shots} index={index} reduce={reduce} />
        </div>
      </div>
    </div>
  );
}

function ModeToggle({
  mode,
  setMode,
}: {
  mode: "desktop" | "mobile";
  setMode: (m: "desktop" | "mobile") => void;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors duration-200 ease-out";
  return (
    <div className="glass inline-flex rounded-full border border-white/10 p-1">
      <button
        type="button"
        onClick={() => setMode("desktop")}
        className={`${base} ${mode === "desktop" ? "bg-signal text-ink" : "text-muted hover:text-bone"}`}
        aria-pressed={mode === "desktop"}
      >
        <Monitor weight="bold" className="size-3.5" /> Desktop
      </button>
      <button
        type="button"
        onClick={() => setMode("mobile")}
        className={`${base} ${mode === "mobile" ? "bg-signal text-ink" : "text-muted hover:text-bone"}`}
        aria-pressed={mode === "mobile"}
      >
        <DeviceMobile weight="bold" className="size-3.5" /> Mobile
      </button>
    </div>
  );
}

function ArrowButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`glass absolute top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 text-bone/80 transition-[color,background-color,transform] duration-200 ease-out hover:text-signal active:scale-95 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      {side === "left" ? (
        <CaretLeft weight="bold" className="size-4" />
      ) : (
        <CaretRight weight="bold" className="size-4" />
      )}
    </button>
  );
}

function ProjectRow({
  project,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const hasMobile = !!project.mobile?.length;
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [rawI, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const shots = mode === "mobile" && project.mobile ? project.mobile : project.desktop;
  const count = shots.length;
  // Desktop y mobile pueden tener distinta cantidad de capturas: al alternar,
  // el índice anterior puede quedar fuera de rango antes de que corra el efecto.
  const i = Math.min(rawI, Math.max(count - 1, 0));

  useEffect(() => setI(0), [mode]);

  const go = (dir: number) => setI((p) => (p + dir + count) % count);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const imageRight = index % 2 === 1;
  const variants: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="group grid items-center gap-8 md:grid-cols-12 md:gap-14"
    >
      {/* Media */}
      <div className={`md:col-span-7 ${imageRight ? "md:order-2" : ""}`}>
        {hasMobile && (
          <div className="mb-5 flex justify-end">
            <ModeToggle mode={mode} setMode={setMode} />
          </div>
        )}

        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {mode === "desktop" ? (
            <BrowserFrame project={project} index={i} reduce={reduce} />
          ) : (
            <PhoneFrame project={project} index={i} reduce={reduce} />
          )}

          {count > 1 && (
            <>
              <ArrowButton side="left" label="Anterior" onClick={() => go(-1)} />
              <ArrowButton side="right" label="Siguiente" onClick={() => go(1)} />
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-4">
            <div className="flex gap-2">
              {shots.map((s, d) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(d)}
                  aria-label={`Captura ${d + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ease-out ${
                    d === i ? "w-5 bg-signal" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] tabular-nums tracking-[0.12em] text-faint">
              {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`md:col-span-5 ${imageRight ? "md:order-1" : ""}`}>
        <h3 className="font-display text-3xl font-medium tracking-[-0.02em] text-bone md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-muted md:text-base">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone transition-colors duration-200 ease-out hover:text-signal"
          >
            Ver en vivo
            <ArrowUpRight
              weight="bold"
              className="size-4 text-signal transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="proyectos" className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 70% 30%, rgba(34,211,238,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 md:px-20 lg:px-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3">
            <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">
              <span className="text-signal">{projects.index}</span>
              <span className="text-faint"> / {projects.label}</span>
            </span>
          </div>
          <h2 className="mt-6 max-w-[20ch] font-display text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-bone md:text-5xl">
            {projects.heading}
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {projects.items.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
