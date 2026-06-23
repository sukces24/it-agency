"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// react-three-fiber relies on WebGL/browser APIs, so it must load client-side only.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

function HeroPoster() {
  return (
    <Image
      src="/assets/hero.png"
      alt=""
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      priority
      style={{ objectFit: "contain", objectPosition: "center" }}
    />
  );
}

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <Hero3D />
    </div>
  );
}
