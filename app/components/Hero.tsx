import Container from "./layout/Container";
import Link from "next/link";
import Image from "next/image";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  return (
    <section className="relative flex items-start min-h-[600px] sm:min-h-[700px] lg:min-h-[700px] pt-6 pb-8 md:pt-8 md:pb-8 lg:pb-8 overflow-hidden bg-background bg-noise">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text column — 7 columns */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 relative z-10">
            <section className="flex items-center gap-3">
              <p className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shrink-0"></p>
              <p className="font-mono text-xs md:text-sm tracking-wider text-white/70 uppercase">
                Software engineering studio
              </p>
            </section>

            <section className="mt-6 md:mt-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading leading-[1.1] tracking-tight text-white">
                We build digital systems <br className="hidden sm:inline" />
                that drive <span className="text-blue-500">real impact</span>
              </h1>
              <p className="font-sans mt-5 md:mt-6 w-full max-w-xl mx-auto lg:mx-0 text-sm md:text-base xl:text-lg text-foreground-secondary leading-relaxed">
                From idea to scale, we design and build software, web and mobile
                applications, and cloud solutions that help businesses grow.
              </p>
            </section>

            <section className="mt-8 md:mt-10 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-3 border border-border bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:border-border-strong hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  Create a Project
                </Link>
                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-3 border border-white/20 bg-transparent px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/50"
                >
                  Explore work
                </Link>
              </div>
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-12 md:pt-16 w-full">
              <div className="text-foreground-secondary sm:border-r sm:border-white/10 sm:pr-4 sm:text-left">
                <p className="pb-1.5 font-mono text-xl md:text-2xl xl:text-3xl text-white font-semibold">
                  50+
                </p>
                <p className="font-sans text-xs md:text-sm">
                  Projects Delivered
                </p>
              </div>
              <div className="text-foreground-secondary sm:border-r sm:border-white/10 sm:pr-4 sm:text-left">
                <p className="pb-1.5 font-mono text-xl md:text-2xl xl:text-3xl text-white font-semibold">
                  30+
                </p>
                <p className="font-sans text-xs md:text-sm">Happy Clients</p>
              </div>
              <div className="text-foreground-secondary sm:border-r sm:border-white/10 sm:pr-4 sm:text-left">
                <p className="pb-1.5 font-mono text-xl md:text-2xl xl:text-3xl text-white font-semibold">
                  6+
                </p>
                <p className="font-sans text-xs md:text-sm">
                  Industries Served
                </p>
              </div>
              <div className="text-foreground-secondary sm:text-left">
                <p className="pb-1.5 font-mono text-xl md:text-2xl xl:text-3xl text-white font-semibold">
                  10+
                </p>
                <p className="font-sans text-xs md:text-sm">
                  Countries Reached
                </p>
              </div>
            </section>
          </div>

          {/* Raven / Visual column — 5 columns */}
          <div className="hidden lg:block lg:col-span-5 relative w-full h-full min-h-[400px] lg:min-h-[500px] pointer-events-none select-none">
            {/* Particles visual canvas background */}
          </div>
        </div>
      </Container>
    </section>
  );
}
