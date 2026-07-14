import type { Cta, Metric } from "./types";

export const hero = {
  eyebrow: "Ingeniero de software full-stack",
  // Each entry is one line of the headline.
  headline: ["Ingeniería full-stack", "con mentalidad de producto."],
  sub: "Soy Daniel, ingeniero de software full-stack. Diseño y desarrollo aplicaciones web completas — del backend a la interfaz — cuidando el detalle, el rendimiento y la experiencia de usuario. Basado en Quito, Ecuador.",
  primary: { label: "Ver proyectos", href: "#proyectos" } satisfies Cta,
  secondary: { label: "Contacto", href: "#contacto" } satisfies Cta,
  // Métricas ocultas por ahora (Daniel las quitó). Vacío = no se renderiza.
  metrics: [] satisfies Metric[],
};
