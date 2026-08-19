"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
/**
 * AboutCorvus
 * ------------------------------------------------------------------
 * About section for the Corvus site. Built to sit next to the hero
 * ("Building Today's SaaS Solutions") and the services grid, sharing
 * the same dark, constellation / node-link identity.
 *
 * Fonts: this component assumes "Space Grotesk" (display), "Inter"
 * (body) and "JetBrains Mono" (labels / stats) are already loaded
 * globally — see the setup note at the bottom of this file for how
 * to wire that up with next/font in app/layout.tsx.
 *
 * Assets expected in /public:
 *   - /corvus.png        the raven mark (already provided)
 *   - /about-poster.jpg  poster frame for the video (fallback image)
 *   - /about-reel.mp4    the reel/clip that plays on the left
 * Swap the paths below if yours differ.
 */

const STATS = [
  { value: "12+", label: "Years shipping" },
  { value: "80+", label: "Products launched" },
  { value: "24/7", label: "Team coverage" },
];

export default function AboutCorvus() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          videoRef.current?.play().catch(() => {});
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-6 py-28 text-[#F5F5F3] md:px-16 lg:px-24"
    >
      {/* faint node-link constellation, echoes the hero */}
      <ConstellationBackdrop />

      <div className="relative mx-auto max-w-7xl">
        <h2
          className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          }}
        >
          <span className="text-white">Obsessed with craft,</span>
          <br />
          <span className="text-[#7A7F87]">built to move at speed.</span>
        </h2>

        {/* main grid: video left, copy + logo right */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          {/* left — video */}
          <div
            className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover grayscale-[15%] transition duration-700 group-hover:grayscale-0"
              src="/Scene.mp4"
              poster="/about-poster.jpg"
              muted
              loop
              playsInline
            />
            {/* bottom gradient so the frame reads as part of the dark page */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {/* thin corner ticks, tiny nod to the SRV-card corners */}
            <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-emerald-300/40" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-emerald-300/40" />
          </div>

          {/* right — copy, stats, logo */}
          <div className="flex flex-col">
            <p className="max-w-lg text-base leading-relaxed text-[#9AA0A8] md:text-lg">
              From early-stage products to platforms already at scale, teams
              bring Corvus in to turn a rough idea into something people
              actually rely on.{" "}
              <span className="font-medium text-[#E9EAEA]">
                More than a decade in, we've settled into a rhythm: strategy,
                design and engineering under one roof, standardized enough to
                move fast and opinionated enough to hold a bar.
              </span>
            </p>

            <a
              href="#team"
              className="mt-6 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-0.5 text-sm text-white/80 transition hover:border-emerald-300/60 hover:text-white"
            >
              Learn more about our team
              <span aria-hidden className="translate-y-px">
                ↓
              </span>
            </a>

            {/* stat row — mono, tech-log feel */}
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-xl text-white md:text-2xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs text-[#6C7178]">{stat.label}</dd>
                </div>
              ))}
            </dl>

            {/* logo card — same slot the light version uses for its
                partner mark, now holding the Corvus raven */}
            <div
              className="relative mt-10 flex h-40 w-56 items-center justify-center overflow-hidden "
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 76%, 76% 100%, 0 100%)",
              }}
            >
              <Image
                src="/corvus.png"
                alt="corvus logo"
                width={2000}
                height={2000}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Decorative helpers                                                  */
/* ------------------------------------------------------------------ */

function ConstellationBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-[560px] w-[560px] opacity-[0.18] md:opacity-[0.25]"
      viewBox="0 0 400 400"
      fill="none"
    >
      <g stroke="#7DE0B8" strokeWidth="0.5">
        <line x1="40" y1="60" x2="140" y2="120" />
        <line x1="140" y1="120" x2="260" y2="80" />
        <line x1="140" y1="120" x2="180" y2="220" />
        <line x1="260" y1="80" x2="340" y2="160" />
        <line x1="180" y1="220" x2="300" y2="260" />
        <line x1="300" y1="260" x2="340" y2="160" />
        <line x1="60" y1="200" x2="180" y2="220" />
      </g>
      <g fill="#7DE0B8">
        <circle cx="40" cy="60" r="2" />
        <circle cx="140" cy="120" r="2.5" />
        <circle cx="260" cy="80" r="2" />
        <circle cx="180" cy="220" r="2.5" />
        <circle cx="340" cy="160" r="2" />
        <circle cx="300" cy="260" r="2" />
        <circle cx="60" cy="200" r="1.5" />
      </g>
    </svg>
  );
}

function MiniConstellation() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 220 160"
      fill="none"
    >
      <g stroke="#7DE0B8" strokeWidth="0.5">
        <line x1="10" y1="20" x2="60" y2="50" />
        <line x1="60" y1="50" x2="120" y2="30" />
        <line x1="120" y1="30" x2="200" y2="70" />
        <line x1="60" y1="50" x2="90" y2="120" />
      </g>
      <g fill="#7DE0B8">
        <circle cx="10" cy="20" r="1.5" />
        <circle cx="60" cy="50" r="1.5" />
        <circle cx="120" cy="30" r="1.5" />
        <circle cx="200" cy="70" r="1.5" />
        <circle cx="90" cy="120" r="1.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Setup note                                                          */
/* ------------------------------------------------------------------ */
// In app/layout.tsx, load the fonts once and expose them as CSS vars:
//
//   import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
//
//   const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
//   const body = Inter({ subsets: ["latin"], variable: "--font-body" });
//   const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
//
//   <body className={`${display.variable} ${body.variable} ${mono.variable} font-sans`}>
//
// If you'd rather skip that, just delete the "style" prop with fontFamily
// on the <h2> — Space Grotesk isn't required for the layout to work,
// only for the exact type match.
