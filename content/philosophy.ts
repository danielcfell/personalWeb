export type Principle = { title: string; description: string };

export const philosophy = {
  index: "04",
  label: "Filosofía",
  // Manifiesto — tipografía protagonista.
  statement:
    "El buen software no es solo código limpio: es una arquitectura clara. Separo responsabilidades, cuido los límites entre capas y construyo sistemas que el equipo puede entender, probar y hacer crecer con el tiempo.",
  principles: [
    {
      title: "Arquitectura limpia",
      description:
        "Separo responsabilidades y defino límites claros entre capas. El dominio no depende de los detalles: la base de datos o el framework son piezas reemplazables.",
    },
    {
      title: "Código que se lee solo",
      description:
        "Nombres precisos, funciones pequeñas y pruebas. El código se escribe una vez y se lee muchas; escribo pensando en quien venga después.",
    },
    {
      title: "Simple y mantenible",
      description:
        "Bajo acoplamiento, alta cohesión. La solución más simple que resuelve el problema y escala bien casi siempre es la correcta.",
    },
  ] satisfies Principle[],
};
