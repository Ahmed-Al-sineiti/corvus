"use client";
import Container from "./layout/Container";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import Magnetic from "./ui/Magnetic";
import { AnimatedHeader } from "./AnimatedHeader";
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex overflow-hidden bg-black lg:-mt-[104px] lg:h-[950px]"
    >
      {/* Background image — right side, per Figma */}
      <div className="pointer-events-none absolute -right-[3vw] top-[51px] hidden w-[81.07vw] select-none opacity-[0.78] lg:block">
        <Image
          src="/hero.png"
          alt=""
          width={1551}
          height={867}
          priority
          unoptimized
          className="h-auto w-full filter contrast-125 brightness-110"
        />
      </div>

      <Container className="relative z-10 flex w-full flex-col justify-center py-16 sm:py-24 lg:py-0">
        <div className="w-full max-w-[764px]">
          {/* Heading + paragraph */}
          <div className="mt-[-50px]">
            <FadeIn delay={0.1}>
              <h1 className="font-heading mb-5 whitespace-nowrap text-[clamp(7.5rem,3.77vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-white">
                Building Today’s
              </h1>
              <h1 className="whitespace-nowrap font-heading text-[clamp(5.5rem,3.77vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-white">
                <AnimatedHeader />
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-10 font-sans text-[clamp(1rem,0.94vw,1.125rem)] leading-[1.625] text-foreground-secondary lg:mt-10">
                Utility crafts award-winning custom digital products driven by
                strategy, design and technology
              </p>
            </FadeIn>
          </div>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="pt-10 mt-9">
              <Magnetic intensity={0.15}>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2A2A2A] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#333333] active:scale-95"
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
              </Magnetic>{" "}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
