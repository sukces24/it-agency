"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const CYAN = "#0aa3f0";
const CYAN_BRIGHT = "#5cc4ff";
const CYAN_LINE = "#c4e6ff";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function makeTexture(draw: Draw, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function glassBg(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const pad = w * 0.05;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, w * 0.08);
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(14,72,140,0.55)");
  grad.addColorStop(1, "rgba(4,14,34,0.32)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.save();
  ctx.lineWidth = w * 0.012;
  ctx.strokeStyle = CYAN_BRIGHT;
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = w * 0.05;
  ctx.stroke();
  ctx.restore();
}

function strokeStyle(ctx: CanvasRenderingContext2D, w: number, lw = 0.02) {
  ctx.strokeStyle = CYAN_LINE;
  ctx.fillStyle = CYAN_LINE;
  ctx.lineWidth = w * lw;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = w * 0.03;
}

function drawWWW(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  roundRect(ctx, w * 0.28, h * 0.24, w * 0.44, h * 0.3, w * 0.03);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.28, h * 0.32);
  ctx.lineTo(w * 0.72, h * 0.32);
  ctx.stroke();
  [0.33, 0.38, 0.43].forEach((p) => {
    ctx.beginPath();
    ctx.arc(w * p, h * 0.28, w * 0.012, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = `800 ${w * 0.15}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("WWW", w * 0.5, h * 0.7);
}

function drawUsers(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  const people = [
    { x: 0.42, y: 0.42, r: 0.085 },
    { x: 0.6, y: 0.46, r: 0.075 },
  ];
  people.forEach((p) => {
    ctx.beginPath();
    ctx.arc(w * p.x, h * p.y, w * p.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w * p.x, h * (p.y + 0.27), w * p.r * 1.9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  });
}

function drawChart(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  ctx.beginPath();
  ctx.moveTo(w * 0.3, h * 0.3);
  ctx.lineTo(w * 0.3, h * 0.68);
  ctx.lineTo(w * 0.72, h * 0.68);
  ctx.stroke();
  const bars = [0.42, 0.55, 0.68];
  bars.forEach((bx, i) => {
    const bh = h * (0.1 + i * 0.07);
    ctx.fillStyle = "rgba(150,200,255,0.55)";
    ctx.fillRect(w * bx, h * 0.68 - bh, w * 0.07, bh);
    ctx.strokeRect(w * bx, h * 0.68 - bh, w * 0.07, bh);
  });
  ctx.beginPath();
  ctx.moveTo(w * 0.34, h * 0.55);
  ctx.lineTo(w * 0.46, h * 0.46);
  ctx.lineTo(w * 0.58, h * 0.5);
  ctx.lineTo(w * 0.7, h * 0.36);
  ctx.stroke();
}

function drawPhone(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  roundRect(ctx, w * 0.38, h * 0.28, w * 0.24, h * 0.44, w * 0.05);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.46, h * 0.34);
  ctx.lineTo(w * 0.54, h * 0.34);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.66, w * 0.018, 0, Math.PI * 2);
  ctx.fill();
}

function drawCRM(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  ctx.font = `800 ${w * 0.17}px Inter, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("CRM", w * 0.5, h * 0.5);
}

function drawBrain(ctx: CanvasRenderingContext2D, w: number, h: number) {
  strokeStyle(ctx, w);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const s = w * 0.2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, s, s * 0.85, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.85);
  ctx.lineTo(cx, cy + s * 0.85);
  ctx.stroke();
  [-0.5, 0, 0.5].forEach((o) => {
    ctx.beginPath();
    ctx.arc(cx - s * 0.5, cy + s * o, s * 0.22, -Math.PI / 2, Math.PI / 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + s * 0.5, cy + s * o, s * 0.22, -Math.PI / 2, Math.PI / 2, false);
    ctx.stroke();
  });
}

function dashboardBg(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  roundRect(ctx, 0, 0, w, h, w * 0.04);
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(12,66,140,0.62)");
  grad.addColorStop(1, "rgba(5,16,40,0.5)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.save();
  ctx.lineWidth = w * 0.012;
  ctx.strokeStyle = CYAN_BRIGHT;
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = w * 0.04;
  ctx.stroke();
  ctx.restore();
}

function drawCode(ctx: CanvasRenderingContext2D, w: number, h: number) {
  dashboardBg(ctx, w, h);
  ctx.save();
  ctx.fillStyle = "rgba(170,210,255,0.9)";
  [0.12, 0.18, 0.24].forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(w * (0.1 + i * 0.06), h * 0.1, w * 0.013, 0, Math.PI * 2);
    ctx.fill();
  });
  const widths = [0.5, 0.7, 0.4, 0.62, 0.55, 0.72, 0.45, 0.6];
  widths.forEach((ww, i) => {
    ctx.fillStyle = i % 3 === 0 ? "rgba(120,205,255,0.95)" : "rgba(110,165,225,0.55)";
    const y = h * (0.22 + i * 0.085);
    roundRect(ctx, w * 0.1, y, w * ww, h * 0.03, h * 0.015);
    ctx.fill();
  });
  ctx.restore();
}

function drawBars(ctx: CanvasRenderingContext2D, w: number, h: number) {
  dashboardBg(ctx, w, h);
  ctx.save();
  ctx.strokeStyle = "rgba(120,180,210,0.3)";
  ctx.lineWidth = w * 0.006;
  for (let i = 1; i < 4; i++) {
    const y = h * (0.25 + i * 0.18);
    ctx.beginPath();
    ctx.moveTo(w * 0.1, y);
    ctx.lineTo(w * 0.9, y);
    ctx.stroke();
  }
  const bars = [0.35, 0.55, 0.4, 0.7, 0.5, 0.85, 0.62];
  const bw = (w * 0.8) / bars.length;
  bars.forEach((bh, i) => {
    const x = w * 0.1 + i * bw + bw * 0.18;
    const height = h * 0.6 * bh;
    const grad = ctx.createLinearGradient(0, h * 0.85 - height, 0, h * 0.85);
    grad.addColorStop(0, "rgba(120,205,255,0.97)");
    grad.addColorStop(1, "rgba(20,120,255,0.4)");
    ctx.fillStyle = grad;
    ctx.fillRect(x, h * 0.85 - height, bw * 0.64, height);
  });
  ctx.restore();
}

function drawLine(ctx: CanvasRenderingContext2D, w: number, h: number) {
  dashboardBg(ctx, w, h);
  ctx.save();
  ctx.strokeStyle = "rgba(120,180,210,0.28)";
  ctx.lineWidth = w * 0.006;
  for (let i = 1; i < 4; i++) {
    const y = h * (0.25 + i * 0.18);
    ctx.beginPath();
    ctx.moveTo(w * 0.1, y);
    ctx.lineTo(w * 0.9, y);
    ctx.stroke();
  }
  const pts = [0.6, 0.5, 0.62, 0.42, 0.5, 0.3, 0.36, 0.2];
  const step = (w * 0.8) / (pts.length - 1);
  ctx.beginPath();
  pts.forEach((p, i) => {
    const x = w * 0.1 + i * step;
    const y = h * p;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(w * 0.9, h * 0.85);
  ctx.lineTo(w * 0.1, h * 0.85);
  ctx.closePath();
  const fill = ctx.createLinearGradient(0, 0, 0, h);
  fill.addColorStop(0, "rgba(20,120,255,0.45)");
  fill.addColorStop(1, "rgba(20,120,255,0.02)");
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.beginPath();
  pts.forEach((p, i) => {
    const x = w * 0.1 + i * step;
    const y = h * p;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = CYAN_BRIGHT;
  ctx.lineWidth = w * 0.012;
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = w * 0.03;
  ctx.stroke();
  ctx.restore();
}

type Vec3 = [number, number, number];

function GlassTile({
  draw,
  position,
  rotation,
  size = 1.2,
}: {
  draw: Draw;
  position: Vec3;
  rotation?: Vec3;
  size?: number;
}) {
  const tex = useMemo(
    () => makeTexture((c, w, h) => { glassBg(c, w, h); draw(c, w, h); }, 512, 512),
    [draw],
  );
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Screen({
  draw,
  position,
  rotation,
  width,
  height,
}: {
  draw: Draw;
  position: Vec3;
  rotation?: Vec3;
  width: number;
  height: number;
}) {
  const tex = useMemo(
    () => makeTexture(draw, 512, Math.round((512 * height) / width)),
    [draw, width, height],
  );
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CoreCrystal() {
  const crystal = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const glow = useMemo(
    () => makeRadial("rgba(170,220,255,0.95)", "rgba(30,140,255,0.45)", "rgba(10,50,140,0)"),
    [],
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (crystal.current) {
      crystal.current.rotation.y += 0.012;
      crystal.current.rotation.x += 0.006;
    }
    const pulse = 1 + Math.sin(t * 2.4) * 0.15;
    if (inner.current) inner.current.scale.setScalar(pulse);
    if (halo.current) halo.current.scale.setScalar(2.6 * pulse);
  });
  return (
    <group position={[0, 0, 0.25]}>
      <mesh ref={halo}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={glow} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={crystal}>
        <octahedronGeometry args={[0.46, 0]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.4} toneMapped={false} />
        <Edges color={CYAN_BRIGHT} />
      </mesh>
      <mesh ref={inner}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color="#eaf6ff" toneMapped={false} />
      </mesh>
      <pointLight color={CYAN} intensity={9} distance={10} />
    </group>
  );
}

function CubeCage() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[3.4, 3.2, 2.1]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.05} depthWrite={false} toneMapped={false} />
        <Edges color={CYAN_BRIGHT} />
      </mesh>
      {[1.05, -1.05].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[3.4, 0.02, 2.1]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0} depthWrite={false} />
          <Edges color={CYAN_BRIGHT} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 3.4, 8]} />
        <meshBasicMaterial color={CYAN_BRIGHT} transparent opacity={0.5} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function BaseRings() {
  const rings = useRef<THREE.Group>(null);
  const disc = useMemo(
    () => makeRadial("rgba(130,210,255,0.95)", "rgba(20,120,235,0.4)", "rgba(8,40,120,0)"),
    [],
  );
  useFrame((_, delta) => {
    if (rings.current) rings.current.rotation.z += delta * 0.25;
  });
  return (
    <group position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={disc} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={rings}>
        {[1.95, 1.55, 1.15, 0.75].map((r) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.022, 12, 96]} />
            <meshBasicMaterial color={CYAN_BRIGHT} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function seeded(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function Particles() {
  const positions = useMemo(() => {
    const count = 130;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seeded(i + 1) - 0.5) * 18;
      arr[i * 3 + 1] = (seeded(i + 97) - 0.5) * 8;
      arr[i * 3 + 2] = (seeded(i + 211) - 0.5) * 6 - 1;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={CYAN_BRIGHT}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function makeRadial(inner: string, mid: string, outer: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.45, mid);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Atmosphere() {
  const halo = useMemo(
    () => makeRadial("rgba(45,160,255,0.8)", "rgba(16,110,235,0.3)", "rgba(8,40,120,0)"),
    [],
  );
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 9.5 + Math.sin(clock.elapsedTime * 1.6) * 0.45;
      ref.current.scale.set(s * 1.3, s, 1);
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.2, -2.6]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={halo} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function GridDots() {
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let x = -9; x <= 9; x++) {
      for (let z = -4; z <= 5; z++) {
        pts.push(x * 1.2, -1.94, z * 1.2 - 0.5);
      }
    }
    return new Float32Array(pts);
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={CYAN_BRIGHT}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function useGlobalPointer() {
  const pointer = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Scene() {
  const structure = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const pointer = useGlobalPointer();
  useFrame((state, delta) => {
    const { clock, camera, viewport, size } = state;
    const s = structure.current;
    if (!s) return;
    const gp = pointer.current;
    const t = clock.elapsedTime;
    intro.current = Math.min(intro.current + delta, 1.5);
    const p = Math.min(intro.current / 1.15, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    // Scale the whole structure down on smaller viewports so it never overflows.
    const responsive = THREE.MathUtils.clamp(size.width / 1600, 0.5, 1);
    const baseScale = (0.8 + 0.2 * ease) * responsive;
    // Keep the structure clear of the right edge; its half-width scales with it.
    const halfStruct = 3.9 * baseScale;
    const offsetX = Math.max(0, Math.min(viewport.width * 0.18, viewport.width / 2 - halfStruct));
    s.position.x = offsetX;
    s.position.y = Math.sin(t * 0.6) * 0.06;
    s.position.z = -1.8 * (1 - ease);
    s.scale.setScalar(baseScale);
    const targetY = gp.x * 0.55 * ease + Math.sin(t * 0.25) * 0.05;
    const targetX = -gp.y * 0.3 * ease;
    s.rotation.y = THREE.MathUtils.lerp(s.rotation.y, targetY, 0.06);
    s.rotation.x = THREE.MathUtils.lerp(s.rotation.x, targetX, 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, gp.x * 0.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.6 + gp.y * 0.25, 0.04);
    camera.lookAt(camera.position.x * 0.6, 0, 0);
  });
  return (
    <>
      <Atmosphere />
      <group ref={structure}>
        <CubeCage />
        <CoreCrystal />
        <Screen draw={drawCode} position={[-0.92, 0, 1.08]} width={1.5} height={2.3} />
        <Screen draw={drawBars} position={[0.92, 0, 1.08]} width={1.5} height={2.3} />
        <Screen draw={drawLine} position={[-1.78, 0, 0]} rotation={[0, Math.PI / 2, 0]} width={2} height={2.3} />
        <Screen draw={drawCode} position={[1.78, 0, 0]} rotation={[0, -Math.PI / 2, 0]} width={2} height={2.3} />
        <Screen draw={drawLine} position={[0, 1.45, 0.25]} rotation={[-0.5, 0, 0]} width={2.9} height={1.2} />
        <Screen draw={drawBars} position={[0, -1.45, 0.25]} rotation={[0.5, 0, 0]} width={2.9} height={1.2} />
        <GlassTile draw={drawWWW} position={[-3.3, 1.6, 0]} rotation={[0, 0.22, 0]} />
        <GlassTile draw={drawUsers} position={[-3.3, 0, 0]} rotation={[0, 0.22, 0]} />
        <GlassTile draw={drawChart} position={[-3.3, -1.6, 0]} rotation={[0, 0.22, 0]} />
        <GlassTile draw={drawPhone} position={[3.3, 1.6, 0]} rotation={[0, -0.22, 0]} />
        <GlassTile draw={drawCRM} position={[3.3, 0, 0]} rotation={[0, -0.22, 0]} />
        <GlassTile draw={drawBrain} position={[3.3, -1.6, 0]} rotation={[0, -0.22, 0]} />
        <BaseRings />
      </group>
      <Particles />
      <GridDots />
      <Grid
        position={[0, -1.97, 0]}
        args={[26, 26]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor={CYAN}
        sectionSize={3}
        sectionThickness={1.2}
        sectionColor={CYAN_BRIGHT}
        fadeDistance={22}
        fadeStrength={1.5}
        infiniteGrid
      />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="hero-3d-canvas"
      camera={{ position: [0, 0.6, 10.5], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={2} color={CYAN} />
      <Scene />
      <EffectComposer>
        <Bloom intensity={1.25} luminanceThreshold={0.45} luminanceSmoothing={0.25} mipmapBlur radius={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
