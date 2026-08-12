import Container from "./layout/Container";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "6+", label: "Industries Served" },
  { value: "10+", label: "Countries Reached" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex overflow-hidden bg-black lg:-mt-[104px] lg:h-[950px]"
    >
      {/* Background image — right side, per Figma */}
      <div className="pointer-events-none absolute -right-[3vw] top-[51px] hidden w-[81.07vw] select-none opacity-100 lg:block">
        <Image
          src="/hero-bg.png"
          alt=""
          width={1551}
          height={867}
          priority
          className="h-auto w-full"
        />
      </div>

      <Container className="relative z-10 flex w-full flex-col justify-center py-16 sm:py-24 lg:py-0">
        <div className="w-full max-w-[764px]">
          {/* Announcement badge */}
          <FadeIn delay={0}>
            <Link
              href="#"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#2b2b2b] bg-white/[0.03] py-1.5 pl-1.5 pr-4 font-sans text-sm text-foreground-secondary"
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

          {/* Stats */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 gap-6 pt-10 lg:grid-cols-4 lg:pt-[149px]">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="pb-1.5 font-mono text-[clamp(1.375rem,1.57vw,1.875rem)] font-semibold leading-[1.2] text-white">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm text-foreground-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
