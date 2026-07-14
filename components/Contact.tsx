"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  EnvelopeSimple,
  WhatsappLogo,
  GithubLogo,
  LinkedinLogo,
  type Icon,
} from "@phosphor-icons/react";
import { contact, type ContactKind } from "@/content/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS: Record<ContactKind, Icon> = {
  email: EnvelopeSimple,
  whatsapp: WhatsappLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
};

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-36">
      {/* Faint cyan glow for a confident close */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 30% 40%, rgba(34,211,238,0.07), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 sm:px-12 md:px-20 lg:px-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid gap-14 md:grid-cols-12 md:gap-16"
        >
          {/* Intro + email */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="block size-2 bg-signal shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              <span className="font-mono text-xs uppercase tracking-[0.22em]">
                <span className="text-signal">{contact.index}</span>
                <span className="text-faint"> / {contact.label}</span>
              </span>
            </div>
            <h2 className="mt-6 max-w-[14ch] font-display text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-bone md:text-6xl">
              {contact.heading}
            </h2>
            <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-muted md:text-base">
              {contact.sub}
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="group mt-10 inline-flex items-center gap-2 font-display text-xl text-bone transition-colors duration-200 ease-out hover:text-signal md:text-2xl"
            >
              {contact.email}
              <ArrowUpRight
                weight="bold"
                className="size-5 text-signal transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Direct contact links — no form; each row opens email / chat / profile */}
          <div className="md:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {contact.links.map((link) => {
                const Glyph = ICONS[link.kind];
                const external = link.kind !== "email";
                return (
                  <li key={link.kind}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="glass group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-signal transition-colors duration-200 ease-out group-hover:border-signal/40">
                        <Glyph weight="bold" className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                          {link.label}
                        </span>
                        <span className="mt-1 block truncate text-sm text-bone transition-colors duration-200 ease-out group-hover:text-signal">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        weight="bold"
                        className="size-4 shrink-0 text-faint transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
