"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const MODEL_PATH = "/models/hero-core-sukces24.glb";

function HeroCoreModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  // Clone is useful if this component is ever mounted more than once.
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      materials.forEach((material) => {
        const mat = material as THREE.MeshStandardMaterial;
        const name = mat.name || "";

        if (name.includes("Glass") || mat.opacity < 1) {
          mat.transparent = true;
          mat.depthWrite = false;
          mat.side = THREE.DoubleSide;
        }

        if (
          name.includes("Neon") ||
          name.includes("Core") ||
          name.includes("Texture") ||
          name.includes("Platform")
        ) {
          mat.toneMapped = false;
          mat.emissiveIntensity = 1.7;
        }

        mat.needsUpdate = true;
      });
    });
  }, [model]);

  useFrame(({ clock, pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.22, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -pointer.y * 0.1, 0.05);
    group.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.045;

    const crystal = group.getObjectByName("CORE_Crystal_Faceted");
    if (crystal) {
      crystal.rotation.y += 0.008;
      crystal.rotation.x += 0.004;
    }

    const inner = group.getObjectByName("CORE_InnerLight");
    if (inner) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.08;
      inner.scale.setScalar(scale);
    }

    const topLayer = group.getObjectByName("LAYER_GlassPlate_1");
    if (topLayer) topLayer.rotation.y += 0.003;

    const bottomLayer = group.getObjectByName("LAYER_GlassPlate_3");
    if (bottomLayer) bottomLayer.rotation.y -= 0.0025;
  });

  return (
    <Float speed={1.3} floatIntensity={0.2} rotationIntensity={0.04}>
      <group ref={groupRef} scale={1.15} position={[0, 0.05, 0]}>
        <primitive object={model} />
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[420px] w-full lg:h-[620px]">
      <Canvas
        camera={{ position: [0, 0.2, 6.4], fov: 39 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 0.8, 2.8]} intensity={3.2} color="#00A9BD" />
          <pointLight position={[2.2, 2, 2.6]} intensity={1.4} color="#7AD4E8" />

          <HeroCoreModel />

          <EffectComposer>
            <Bloom intensity={1.4} luminanceThreshold={0.12} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
