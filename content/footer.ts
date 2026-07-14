export type SocialLink = { label: string; href: string };

export const footer = {
  tagline: "Ingeniero de software full-stack. Quito, Ecuador.",
  email: "danielcfell98@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/danielcfell" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-s-castillo-5732111b2/",
    },
    { label: "WhatsApp", href: "https://wa.me/593958948115" },
  ] satisfies SocialLink[],
  copyright: "© 2026 Daniel S. Castillo. Todos los derechos reservados.",
};
