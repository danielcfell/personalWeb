"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Page-level atmosphere: layered blacks + two desaturated color glows
 * (cold teal + faint lime) that parallax on scroll and drift toward the
 * cursor. Sits behind all content. Pure transform/opacity work.
 */
export function Atmosphere() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const px = useMotionValue(0);
  const dx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const dxNeg = useTransform(dx, (v) => -v);

  const tealY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const limeY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 44);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base dome — subtle light from the top, layered black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #141414 0%, #0c0c0c 45%, #0a0a0a 100%)",
        }}
      />

      {/* Lime glow — fills the upper-right negative space */}
      <motion.div
        style={{ x: reduce ? 0 : dx, y: reduce ? 0 : tealY }}
        className="absolute -right-[12%] -top-[14%] h-[65vh] w-[55vw]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.10), rgba(34,211,238,0.03) 45%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* Faint lime spark — low-left */}
      <motion.div
        style={{ x: reduce ? 0 : dxNeg, y: reduce ? 0 : limeY }}
        className="absolute -bottom-[18%] -left-[8%] h-[55vh] w-[42vw]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.05), transparent 60%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>
    </div>
  );
}
