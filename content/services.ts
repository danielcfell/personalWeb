// Icon keys map to a line glyph in the component (presentation decides the
// actual glyph; content only declares intent).
export type ServiceIcon = "strategy" | "engineering" | "interface" | "systems";

export type Service = {
  icon: ServiceIcon;
  name: string;
  description: string;
};

export const services = {
  index: "02",
  label: "Qué hago",
  heading: "Full-stack, de la base de datos a la interfaz.",
  items: [
    {
      icon: "interface",
      name: "Frontend",
      description:
        "Interfaces rápidas, accesibles y responsivas con React y Next.js. Código limpio y una experiencia cuidada en cualquier pantalla.",
    },
    {
      icon: "engineering",
      name: "Backend y APIs",
      description:
        "APIs y lógica de negocio con Node.js y bases de datos SQL/NoSQL. Servicios confiables, seguros y pensados para escalar.",
    },
    {
      icon: "systems",
      name: "Sistemas end-to-end",
      description:
        "Sistemas de gestión, facturación e inventario completos: del modelo de datos y la API hasta la interfaz que usa el usuario final.",
    },
    {
      icon: "strategy",
      name: "Automatización e integraciones",
      description:
        "Integraciones y bots (incluido WhatsApp) que conectan herramientas y eliminan trabajo manual repetitivo.",
    },
  ] satisfies Service[],
};
