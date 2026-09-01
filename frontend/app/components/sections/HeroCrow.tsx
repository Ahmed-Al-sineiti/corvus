"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Rendered width of the illustration at each breakpoint (see wrapper classes below).
const CROW_SIZES = "(min-width: 1024px) 81vw, (min-width: 640px) 100vw, 130vw";

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
      className="pointer-events-auto absolute -right-[15vw] top-[120px] hidden min-[480px]:block w-[130vw] sm:-right-[5vw] sm:top-[80px] sm:w-[100vw] lg:-right-[3vw] lg:top-[51px] lg:w-[81.07vw] select-none lg:block z-0 opacity-40 lg:opacity-100 transition-opacity duration-300"
    >
      {/* 1. الطبقة الأساسية: الشبكة العادية بتعمل نبض هادئ على النقاط فقط */}
      <Image
        src="/hero.png"
        alt=""
        width={1551}
        height={867}
        sizes={CROW_SIZES}
        className="h-auto w-full opacity-80 animate-mesh-pulse"
      />

      {/* 2. طبقة التوهج التفاعلي: تضيء النقاط والخطوط القريبة من الماوس بشدة بدون إضاءة الخلفية السوداء */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      >
        {/* Same src as the base layer -> served from cache, no extra network request. */}
        <Image
          src="/hero.png"
          alt=""
          width={1551}
          height={867}
          sizes={CROW_SIZES}
          className="h-auto w-full filter brightness-120 contrast-150 "
        />
      </div>
    </div>
  );
}
