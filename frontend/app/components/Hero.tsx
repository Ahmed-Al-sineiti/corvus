import Container from "./layout/Container";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import Magnetic from "./ui/Magnetic";


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
          {/* Announcement badge */}
          <FadeIn delay={0}>
            <Link
              href="#services"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#2b2b2b] bg-white/[0.03] py-1.5 pl-1.5 pr-4 font-sans text-sm text-foreground-secondary hover:scale-105 transition-all duration-300 hover:bg-white/[0.08]"
            >
              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold leading-none text-background">
                New
              </span>
              <span>Digital solutions</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </FadeIn>

          {/* Heading + paragraph */}
          <div className="mt-[18px]">
            <FadeIn delay={0.1}>
              <h1 className="font-heading text-[clamp(2.5rem,3.77vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-white">
                We build digital systems that drive real impact
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-10 font-sans text-[clamp(1rem,0.94vw,1.125rem)] leading-[1.625] text-foreground-secondary lg:mt-10">
                From idea to scale, we design and build software, web and mobile
                applications, and cloud solutions that help businesses grow.
              </p>
            </FadeIn>
          </div>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="pt-10 lg:pt-[100px]">
              <Magnetic intensity={0.15}>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                >
                  Let&apos;s build something together
                </Link>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
