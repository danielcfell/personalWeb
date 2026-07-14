export type Role = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
};

export const experience = {
  index: "04",
  label: "Experiencia",
  heading: "Más de 3 años construyendo en producción.",
  roles: [
    {
      role: "Desarrollador de Software Full Stack",
      org: "Freelance",
      period: "Mar 2024 — Actualidad",
      bullets: [
        "Desarrollé aplicaciones web y sistemas de gestión a medida, encargándome del ciclo completo: frontend, backend y base de datos.",
        "Trabajé directamente con clientes relevando requerimientos, diseñando soluciones y desplegándolas en producción.",
        "Incorporé herramientas de IA (Claude Code) en mi flujo de trabajo para acelerar el desarrollo y mejorar la calidad del código.",
      ],
    },
    {
      role: "Desarrollador de Software",
      org: "BigData & Emagic S.A.",
      period: "Nov 2022 — Mar 2024",
      bullets: [
        "Desarrollé aplicaciones de pago para dispositivos POS del sector bancario con Kotlin y SDKs del fabricante, desplegadas en producción para clientes externos.",
        "Integré APIs bancarias gestionando peticiones, respuestas y manejo de errores de transacciones para garantizar pagos confiables.",
        "Colaboré en un equipo de desarrollo en el ciclo de pruebas e integración de aplicaciones móviles.",
      ],
    },
  ] satisfies Role[],
};
