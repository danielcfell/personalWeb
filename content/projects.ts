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
      name: "NorteWeb",
      description:
        "Agencia digital que fundé en Tulcán, Carchi. Sitio de servicios para pequeños negocios: páginas web, sistemas de facturación e inventario y bots de WhatsApp, con proceso, cobertura y precios claros desde $39.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
      desktop: [
        { src: "/projects/norteweb-desktop-1.webp", alt: "NorteWeb — inicio" },
        { src: "/projects/norteweb-desktop-2.webp", alt: "NorteWeb — servicios" },
        { src: "/projects/norteweb-desktop-3.webp", alt: "NorteWeb — precios" },
      ],
      mobile: [
        { src: "/projects/norteweb-mobile-1.webp", alt: "NorteWeb móvil — inicio" },
        { src: "/projects/norteweb-mobile-2.webp", alt: "NorteWeb móvil — servicios" },
      ],
      liveUrl: "https://norteweb-ia.vercel.app",
    },
    {
      name: "Psicología Para Ti",
      description:
        "Sitio para un centro de psicología en Quito: enfoques terapéuticos con precios presenciales y online, proceso de atención en tres pasos, testimonios y un formulario de agendamiento conectado a WhatsApp.",
      tech: ["Next.js", "React", "CSS"],
      desktop: [
        { src: "/projects/psicologia-desktop-1.webp", alt: "Psicología Para Ti — inicio" },
        { src: "/projects/psicologia-desktop-2.webp", alt: "Psicología Para Ti — enfoques terapéuticos" },
        { src: "/projects/psicologia-desktop-3.webp", alt: "Psicología Para Ti — por qué elegirnos" },
        { src: "/projects/psicologia-desktop-4.webp", alt: "Psicología Para Ti — agendar cita" },
      ],
      mobile: [
        { src: "/projects/psicologia-mobile-1.webp", alt: "Psicología Para Ti móvil — inicio" },
        { src: "/projects/psicologia-mobile-2.webp", alt: "Psicología Para Ti móvil — enfoques terapéuticos" },
      ],
    },
    {
      name: "Foody",
      description:
        "Plataforma web de gestión para restaurantes: acceso con autenticación, administración de menú y seguimiento de pedidos, con una interfaz rápida y pensada primero para el celular.",
      tech: ["React", "TypeScript", "Vite", "Tailwind"],
      desktop: [
        { src: "/projects/foody-desktop-1.webp", alt: "Foody — acceso a la plataforma" },
      ],
      mobile: [
        { src: "/projects/foody-mobile-1.webp", alt: "Foody móvil — acceso a la plataforma" },
      ],
      liveUrl: "https://foodyec.vercel.app",
    },
  ] satisfies Project[],
};
