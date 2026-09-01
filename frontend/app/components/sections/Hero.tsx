import Container from "../layout/Container";
import Link from "next/link";
import Magnetic from "../ui/Magnetic";
import HeroCrow from "./HeroCrow";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex overflow-hidden bg-black lg:min-h-svh"
    >
      {/* حاوية الرسمة (الغراب) — تفاعلية مع الماوس، لذلك كلاينت منفصل */}
      <HeroCrow />

      <Container className="relative z-20 flex w-full flex-col justify-center pt-32 pb-16 sm:pt-40 sm:pb-24 lg:py-0 pointer-events-none">
        <div className="w-full max-w-[764px] pointer-events-auto text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
          {/* Heading + paragraph */}
          <div className="lg:mt-[-50px]">
            <h1 className="animate-fade-up font-heading mb-5 whitespace-nowrap text-[clamp(2rem,4vw,4.5rem)] font-sans leading-[1.1] tracking-tight text-white">
              Building the Right
              <br /> Digital Solutions for
              <br />
              Business.
            </h1>
            <p
              className="animate-fade-up mt-6 font-sans text-[clamp(1rem,2vw,1.125rem)] leading-[1.625] text-foreground-secondary sm:mt-8 lg:mt-10"
              style={{ animationDelay: "0.08s" }}
            >
              Crafting exceptional web applications and efficient systems
              <br className="hidden sm:inline" /> that elevate your business.{" "}
            </p>
          </div>

          {/* CTA */}
          <div
            className="animate-fade-up pt-8 mt-8 sm:pt-10 sm:mt-9 flex justify-center lg:justify-start"
            style={{ animationDelay: "0.16s" }}
          >
            <Magnetic intensity={0.15}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-medium text-black transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Work with us now
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}
