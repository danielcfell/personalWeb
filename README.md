# Daniel S. Castillo — Portafolio

Portafolio personal como **ingeniero de software full-stack**. Una landing de una sola página con un fondo 3D interactivo, animaciones y las secciones de proyectos, skills y contacto.

🔗 **En vivo:** _(pendiente de desplegar)_

---

## ✨ Características

- Fondo 3D interactivo con una red de nodos (`three.js` + React Three Fiber).
- Animaciones de entrada y microinteracciones con `motion`.
- Diseño responsivo (móvil y escritorio) y modo de movimiento reducido respetado.
- Secciones: Hero · Qué hago · Proyectos · Filosofía · Contacto.
- Carrusel de capturas por proyecto con vista **Desktop / Mobile**.

## 🛠️ Stack

- [Next.js 16](https://nextjs.org/) (App Router · Turbopack)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) · [@react-three/fiber](https://r3f.docs.pmnd.rs/) · [drei](https://github.com/pmndrs/drei)
- [Motion](https://motion.dev/) (animaciones)
- [Phosphor Icons](https://phosphoricons.com/)

## 🚀 Correr en local

Requisitos: **Node.js 20+** y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Otros scripts

```bash
npm run build   # build de producción
npm run start   # servir el build de producción
npm run lint    # linter
```

## 📁 Estructura

```
app/          → layout y página principal (App Router)
components/    → secciones y piezas de UI (Hero, Projects, Contact, …)
content/      → todo el contenido editable en un solo lugar (content/*.ts)
public/       → imágenes estáticas (capturas de proyectos, etc.)
```

> El texto e información del sitio vive en `content/` — editar ahí actualiza toda la web sin tocar los componentes.

## 📫 Contacto

- **Email:** danielcfell98@gmail.com
- **GitHub:** [@danielcfell](https://github.com/danielcfell)
- **LinkedIn:** [Daniel S. Castillo](https://www.linkedin.com/in/daniel-s-castillo-5732111b2/)

---

<p align="center">Hecho con Next.js por Daniel S. Castillo.</p>
