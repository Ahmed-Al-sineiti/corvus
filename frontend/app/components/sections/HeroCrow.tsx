"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The illustration box spans the full viewport width on phones/tablets and 82%
// of it from the large breakpoint up — so `sizes` stays a plain, honest value.
const CROW_SIZES = "(min-width: 1024px) 82vw, 100vw";

// Same object rules on both layers so the hover glow lines up with the base.
// The bright bird head sits in the upper-left third of the artwork; everything
// else is expendable ambient mesh.
// < lg: fill the hero, cropping the sparse mesh but keeping the head in frame.
// >= lg: show the whole crow, anchored to the right so the beak faces the copy.
const CROW_FIT =
  "object-cover [object-position:38%_30%] lg:object-contain lg:[object-position:100%_50%]";

export default function HeroCrow() {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgContainerRef.current) return;
      const rect = imgContainerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={imgContainerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 z-0 w-full select-none opacity-40 transition-opacity duration-300 lg:pointer-events-auto lg:w-[82%] lg:opacity-100"
    >
      {/* 1. الطبقة الأساسية: الشبكة العادية */}
      <Image
        src="/hero.png"
        alt=""
        fill
        sizes={CROW_SIZES}
        className={`${CROW_FIT} opacity-80`}
      />

      {/* 2. طبقة التوهج التفاعلي: تضيء النقاط والخطوط القريبة من الماوس عند الـ hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      >
        {/* Same src as the base layer -> served from cache, no extra request. */}
        <Image
          src="/hero.png"
          alt=""
          fill
          sizes={CROW_SIZES}
          className={`${CROW_FIT} filter brightness-120 contrast-150`}
        />
      </div>
    </div>
  );
}
