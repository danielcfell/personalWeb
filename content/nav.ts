import type { Cta, NavItem } from "./types";

export const nav = {
  items: [
    { label: "Qué hago", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Filosofía", href: "#filosofia" },
    // Contacto no va aqui: ya tiene su propio boton (nav.cta) a la derecha.
  ] satisfies NavItem[],
  cv: { label: "CV", href: "/CV_Daniel_Castillo.pdf" } satisfies Cta,
  cta: { label: "Contacto", href: "#contacto" } satisfies Cta,
};
