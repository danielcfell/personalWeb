"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

/* ---- tuning ---------------------------------------------------------- */
const CONNECT_DIST = 1.95; // nodes closer than this get a line
const CURSOR_DIST = 2.4; // nodes within this of the cursor light up + link
const NEAR = 3.2; // view depth where nodes are brightest
const FAR = 9.5; // view depth where nodes dissolve to black
const X_FADE_A = -2.0; // left edge — fade out (text lives here)
const X_FADE_B = 3.0;

function jsSmoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/* ---- node + line shaders -------------------------------------------- */
const NODE_VERT = /* glsl */ `
uniform float uSize;
uniform float uNear;
uniform float uFar;
uniform float uXa;
uniform float uXb;
attribute float aGlow;
varying float vFade;
varying float vGlow;
float ss(float a, float b, float x){ float t = clamp((x-a)/(b-a),0.0,1.0); return t*t*(3.0-2.0*t); }
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float depth = -mv.z;
  vFade = ss(uFar, uNear, depth) * ss(uXa, uXb, position.x);
  vGlow = aGlow;
  gl_PointSize = uSize * (1.0 + aGlow * 1.7) * (5.0 / depth);
  gl_Position = projectionMatrix * mv;
}
`;

const NODE_FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColor;
varying float vFade;
varying float vGlow;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  if (r > 0.5) discard;
  // Crisp disc with a hot center, plus a faint surrounding halo.
  float core = smoothstep(0.5, 0.12, r);
  float halo = smoothstep(0.5, 0.0, r) * 0.4;
  float a = (core + halo) * (0.52 + vFade * 0.9) * (0.85 + vGlow * 1.7);
  vec3 col = uColor + vGlow * 0.9;
  gl_FragColor = vec4(col, a);
}
`;

const LINE_VERT = /* glsl */ `
attribute float aAlpha;
varying float vA;
void main() {
  vA = aAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LINE_FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColor;
varying float vA;
void main() {
  gl_FragColor = vec4(uColor, vA);
}
`;

/* ---- the node network ----------------------------------------------- */
function NodeNetwork({ reduce, count }: { reduce: boolean; count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tRef = useRef(0);
  const cursor = useMemo(() => new THREE.Vector3(3, 0, 1.2), []);

  const data = useMemo(() => {
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count * 3);
    const speed = new Float32Array(count * 3);
    const amp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      base[i * 3 + 0] = -3.5 + Math.random() * 8.3; // x, biased toward center
      base[i * 3 + 1] = -2.6 + Math.random() * 5.2; // y
      base[i * 3 + 2] = -4.0 + Math.random() * 5.5; // z (depth)
      for (let k = 0; k < 3; k++) {
        phase[i * 3 + k] = Math.random() * Math.PI * 2;
        speed[i * 3 + k] = 0.15 + Math.random() * 0.3;
        amp[i * 3 + k] = 0.18 + Math.random() * 0.32;
      }
    }
    const maxSeg = (count * (count - 1)) / 2 + count; // pair lines + cursor lines
    return {
      base,
      phase,
      speed,
      amp,
      pos: new Float32Array(count * 3),
      glow: new Float32Array(count),
      fade: new Float32Array(count),
      linePos: new Float32Array(maxSeg * 2 * 3),
      lineAlpha: new Float32Array(maxSeg * 2),
    };
  }, [count]);

  const nodeGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(data.pos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    g.setAttribute(
      "aGlow",
      new THREE.BufferAttribute(data.glow, 1).setUsage(THREE.DynamicDrawUsage),
    );
    return g;
  }, [data]);

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(data.linePos, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    g.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(data.lineAlpha, 1).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );
    g.setDrawRange(0, 0);
    return g;
  }, [data]);

  const nodeMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color("#45dcf2") },
          uSize: { value: 11.0 },
          uNear: { value: NEAR },
          uFar: { value: FAR },
          uXa: { value: X_FADE_A },
          uXb: { value: X_FADE_B },
        },
        vertexShader: NODE_VERT,
        fragmentShader: NODE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const lineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color("#2cc2de") } },
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(
    () => () => {
      nodeGeom.dispose();
      lineGeom.dispose();
      nodeMat.dispose();
      lineMat.dispose();
    },
    [nodeGeom, lineGeom, nodeMat, lineMat],
  );

  useFrame((state, delta) => {
    const { base, phase, speed, amp, pos, glow, fade, linePos, lineAlpha } =
      data;
    if (!reduce) tRef.current += Math.min(delta, 0.05);
    const t = tRef.current;

    if (!reduce) {
      cursor.x = 1.0 + state.pointer.x * 3.4;
      cursor.y = state.pointer.y * 2.4;
      cursor.z = 1.2;
    }

    // 1) slow continuous drift around each base position
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix] = base[ix] + amp[ix] * Math.sin(t * speed[ix] + phase[ix]);
      pos[ix + 1] =
        base[ix + 1] + amp[ix + 1] * Math.sin(t * speed[ix + 1] + phase[ix + 1]);
      pos[ix + 2] =
        base[ix + 2] + amp[ix + 2] * Math.sin(t * speed[ix + 2] + phase[ix + 2]);
      glow[i] = 0;
    }

    // 2) cursor attraction + illumination
    if (!reduce) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const dx = cursor.x - pos[ix];
        const dy = cursor.y - pos[ix + 1];
        const dz = cursor.z - pos[ix + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CURSOR_DIST) {
          const f = 1 - d / CURSOR_DIST;
          pos[ix] += dx * 0.12 * f;
          pos[ix + 1] += dy * 0.12 * f;
          pos[ix + 2] += dz * 0.12 * f;
          glow[i] = Math.max(glow[i], f);
        }
      }
    }

    // 3) per-node fade (depth + left-side containment)
    for (let i = 0; i < count; i++) {
      const depth = 5.0 - pos[i * 3 + 2];
      fade[i] =
        jsSmoothstep(FAR, NEAR, depth) *
        jsSmoothstep(X_FADE_A, X_FADE_B, pos[i * 3]);
    }

    // 4) node-to-node connections
    let v = 0;
    const c2 = CONNECT_DIST * CONNECT_DIST;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const dx = pos[ix] - pos[jx];
        const dy = pos[ix + 1] - pos[jx + 1];
        const dz = pos[ix + 2] - pos[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < c2) {
          const al = 1 - Math.sqrt(d2) / CONNECT_DIST;
          linePos[v * 3] = pos[ix];
          linePos[v * 3 + 1] = pos[ix + 1];
          linePos[v * 3 + 2] = pos[ix + 2];
          lineAlpha[v] = al * fade[i] * 1.0;
          v++;
          linePos[v * 3] = pos[jx];
          linePos[v * 3 + 1] = pos[jx + 1];
          linePos[v * 3 + 2] = pos[jx + 2];
          lineAlpha[v] = al * fade[j] * 1.0;
          v++;
        }
      }
    }

    // 5) connections from nearby nodes to the cursor
    if (!reduce) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const dx = pos[ix] - cursor.x;
        const dy = pos[ix + 1] - cursor.y;
        const dz = pos[ix + 2] - cursor.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CURSOR_DIST) {
          const al = 1 - d / CURSOR_DIST;
          linePos[v * 3] = pos[ix];
          linePos[v * 3 + 1] = pos[ix + 1];
          linePos[v * 3 + 2] = pos[ix + 2];
          lineAlpha[v] = al * fade[i] * 1.05;
          v++;
          linePos[v * 3] = cursor.x;
          linePos[v * 3 + 1] = cursor.y;
          linePos[v * 3 + 2] = cursor.z;
          lineAlpha[v] = al * 1.05;
          v++;
        }
      }
    }

    nodeGeom.attributes.position.needsUpdate = true;
    nodeGeom.attributes.aGlow.needsUpdate = true;
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom.attributes.aAlpha.needsUpdate = true;
    lineGeom.setDrawRange(0, v);

    if (groupRef.current && !reduce) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.12,
        0.04,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.06,
        0.04,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      <points geometry={nodeGeom} material={nodeMat} />
    </group>
  );
}

export default function WireframeField({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const count =
    typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 115;

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{ position: [0, 1.5, 5], fov: 38 }}
        frameloop={reduce ? "demand" : "always"}
      >
        {/* Cool near-black base — layered, never pure #000 */}
        <color attach="background" args={["#0a0b0c"]} />
        <NodeNetwork reduce={reduce} count={count} />
        <EffectComposer>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.16}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
