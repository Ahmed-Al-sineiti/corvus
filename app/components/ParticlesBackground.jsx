"use client";

import { useEffect, useRef } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";

const sparkleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="120" viewBox="0 0 60 120">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path
    d="M30 2 C30 45, 30 45, 58 60 C30 75, 30 75, 30 118 C30 75, 30 75, 2 60 C30 45, 30 45, 30 2 Z"
    fill="#ffffff"
    filter="url(#glow)"
  />
</svg>
`;

const sparkleDataUri = `data:image/svg+xml;base64,${Buffer.from(sparkleSvg).toString("base64")}`;

const MAX_PARTICLES = 100;

const options = {
  fullScreen: false,
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: {
      value: ["#ffffff", "#ffffff", "#ffffff", "#dce8ff", "#e9dcff"],
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "out",
      random: false,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 60,
      limit: {
        mode: "delete",
        value: MAX_PARTICLES,
      },
    },
    opacity: {
      value: { min: 0.05, max: 0.5 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
        startValue: "random",
      },
    },
    shape: {
      type: "image",
      options: {
        image: {
          src: sparkleDataUri,
          width: 60,
          height: 120,
        },
      },
    },
    size: {
      value: { min: 1.5, max: 6 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
        startValue: "random",
      },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground({ id = "tsparticles" }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let container = null;
    let isMounted = true;

    (async () => {
      await loadSlim(tsParticles);
      await loadImageShape(tsParticles);

      if (isMounted) {
        container = await tsParticles.load({ id, options });
      }
    })();

    return () => {
      isMounted = false;
      if (container) {
        container.destroy();
      }
    };
  }, []);

  return (
    <div
      id={id}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
