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
    <section className="relative flex items-start min-h-[400px] sm:min-h-[500px] pt-6 pb-8 md:pt-8 md:pb-8 lg:pb-8 overflow-hidden bg-background bg-noise">
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text column — 7 columns */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 relative z-10">
            {/* Announcement badge */}
            <FadeIn delay={0}>
              <Link
                href="#"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] pl-1.5 pr-4 py-1.5 font-sans text-sm text-foreground-secondary transition-colors hover:bg-white/[0.06] hover:border-white/20 mb-6"
              >
                <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold leading-none text-background">
                  New
                </span>
                <span>Coding Sessions</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </FadeIn>

            <div className="mt-0">
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading leading-[0.86] tracking-tight text-white">
                  We build digital systems <br className="hidden sm:inline" />
                  that drive real impact
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans mt-5 md:mt-6 w-full mx-auto lg:mx-0 text-sm md:text-base xl:text-lg text-foreground-secondary leading-relaxed">
                  From idea to scale, we design and build software, web and
                  mobile applications, and cloud solutions that help businesses
                  grow.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-12 md:pt-16 w-full">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`text-foreground-secondary sm:border-r sm:border-border sm:pr-4 sm:text-left ${i === stats.length - 1 ? "sm:border-r-0" : ""}`}
                  >
                    <p className="pb-1.5  font-mono text-3xl xl:text-4xl text-white font-semibold leading-[0.9]">
                      {stat.value}
                    </p>
                    <p className="font-sans text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Visual column — 5 columns */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-full min-h-[400px] lg:min-h-[500px] pointer-events-none select-none">
            <Image
              src="/hero.png"
              alt="Corvus studio work"
              fill
              sizes="(max-width: 1024px) 0px, 40vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
