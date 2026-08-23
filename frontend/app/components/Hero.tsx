"use client";

import { useState, useEffect, useRef } from "react";
import Container from "./layout/Container";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import Magnetic from "./ui/Magnetic";
import { AnimatedHeader } from "./AnimatedHeader";

export default function Hero() {
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
    <section
      id="hero"
      className="relative flex overflow-hidden bg-black lg:-mt-[104px] lg:h-[950px]"
    >
      {/* أنيميشن نبض خافت للنقاط والشبكة فقط (على البيكسلات نفسها) */}
      <style jsx>{`
        @keyframes meshPulse {
          0%,
          100% {
            filter: contrast(125%) brightness(100%)
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.2));
          }
          50% {
            filter: contrast(140%) brightness(130%)
              drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
          }
        }
        .animate-mesh-pulse {
          animation: meshPulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* حاوية الرسمة (الغراب) */}
      <div
        ref={imgContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto absolute -right-[3vw] top-[51px] hidden w-[81.07vw] select-none lg:block z-0"
      >
        {/* 1. الطبقة الأساسية: الشبكة العادية بتعمل نبض هادئ على النقاط فقط */}
        <Image
          src="/hero.png"
          alt=""
          width={1551}
          height={867}
          priority
          unoptimized
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
          <Image
            src="/hero.png"
            alt=""
            width={1551}
            height={867}
            priority
            unoptimized
            className="h-auto w-full filter brightness-150 contrast-150 drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
        </div>
      </div>

      <Container className="relative z-20 flex w-full flex-col justify-center py-16 sm:py-24 lg:py-0 pointer-events-none">
        <div className="w-full max-w-[764px] pointer-events-auto">
          {/* Heading + paragraph */}
          <div className="mt-[-50px]">
            <FadeIn delay={0.1}>
              <h1 className="font-heading mb-5 whitespace-nowrap text-[clamp(2rem,8vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-white">
                Building Today’s
              </h1>
              <h1 className="whitespace-nowrap font-heading text-[clamp(2rem,8vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-white">
                <AnimatedHeader />
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 font-sans text-[clamp(1rem,0.94vw,1.125rem)] leading-[1.625] text-foreground-secondary sm:mt-8 lg:mt-10">
                Utility crafts award-winning custom digital products driven by
                strategy, design and technology
              </p>
            </FadeIn>
          </div>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="pt-8 mt-8 sm:pt-10 sm:mt-9">
              <Magnetic intensity={0.15}>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-medium text-black transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Work with us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
