import type { Cta, NavItem } from "./types";

export const nav = {
  items: [
    { label: "Qué hago", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Filosofía", href: "#filosofia" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies NavItem[],
  cta: { label: "Contacto", href: "#contacto" } satisfies Cta,
};
