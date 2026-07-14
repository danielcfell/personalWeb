export type Shot = { src: string; alt: string };

export type Project = {
  name: string;
  description: string;
  tech: string[];
  desktop: Shot[];
  mobile?: Shot[]; // si falta, el toggle Desktop/Mobile se oculta
  liveUrl?: string; // opcional — sin él, no se muestra "Ver en vivo"
};

export const projects = {
  index: "03",
  label: "Proyectos",
  heading: "Proyectos recientes.",
  items: [
    {
      name: "04 Tech",
      description:
        "Agencia digital que fundé en Carchi, Ecuador. Sitio de servicios para pequeños negocios: desarrollo web, sistemas de facturación e inventario y bots de WhatsApp, con proceso, cobertura y precios claros.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
      desktop: [
        { src: "/projects/04tech-desktop-1.png", alt: "04 Tech — inicio" },
        { src: "/projects/04tech-desktop-2.png", alt: "04 Tech — servicios" },
      ],
      mobile: [
        { src: "/projects/04tech-mobile-1.png", alt: "04 Tech móvil — inicio" },
        { src: "/projects/04tech-mobile-2.png", alt: "04 Tech móvil — servicios" },
      ],
      liveUrl: "https://04tech.vercel.app",
    },
    {
      name: "Foody",
      description:
        "Aplicación web para negocios de comida: presentación de menú y experiencia de pedido con una interfaz rápida y pensada primero para el celular.",
      tech: ["React", "TypeScript", "Vite", "Tailwind"],
      desktop: [
        { src: "/projects/foody-desktop-1.png", alt: "Foody — inicio" },
        { src: "/projects/foody-desktop-2.png", alt: "Foody — menú" },
      ],
      mobile: [
        { src: "/projects/foody-mobile-1.png", alt: "Foody móvil — inicio" },
        { src: "/projects/foody-mobile-2.png", alt: "Foody móvil — menú" },
      ],
      liveUrl: "https://foodyec.vercel.app",
    },
  ] satisfies Project[],
};
