export type ContactKind = "email" | "whatsapp" | "github" | "linkedin";

export type ContactLink = {
  kind: ContactKind;
  label: string;
  value: string; // texto mostrado
  href: string;
};

export const contact = {
  index: "05",
  label: "Contacto",
  heading: "¿Trabajamos juntos?",
  sub: "Estoy abierto a nuevas oportunidades y proyectos. Si buscas a alguien para tu equipo o quieres conversar, escríbeme por el medio que prefieras.",
  email: "danielcfell98@gmail.com",
  links: [
    {
      kind: "email",
      label: "Email",
      value: "danielcfell98@gmail.com",
      href: "mailto:danielcfell98@gmail.com",
    },
    {
      kind: "whatsapp",
      label: "WhatsApp",
      value: "+593 95 894 8115",
      href: "https://wa.me/593958948115",
    },
    {
      kind: "github",
      label: "GitHub",
      value: "github.com/danielcfell",
      href: "https://github.com/danielcfell",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: "Daniel S. Castillo",
      href: "https://www.linkedin.com/in/daniel-s-castillo-5732111b2/",
    },
  ] satisfies ContactLink[],
};
