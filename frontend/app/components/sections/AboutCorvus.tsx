"use client";

import { useState } from "react";
import TextReveal from "../ui/TextReveal";
import WorldMap from "./WorldMap";

export default function AboutSection() {
  const [activePara, setActivePara] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="w-full bg-black py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-zinc-900/50"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* الجزء العلوي: العنوان والوصف في المنتصف */}
        <div className="text-center max-w-3xl mx-auto mb-24 flex flex-col items-center">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="font-heading text-4xl font-sans leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
            >
              Who we are
            </TextReveal>
            <TextReveal
              as="p"
              delay={300}
              className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg"
            >
              A digital product studio, built on top-tier engineering and design
              talent.
            </TextReveal>
          </div>
        </div>

        {/* الجزء السفلي: الصورة والنص التفاعلي */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* العمود الأيسر: خريطة الانتشار العالمي بدل الـ illustration القديمة */}
          <div className="w-full mx-auto lg:mx-0">
            <WorldMap className="block h-auto w-full" />
          </div>

          {/* العمود الأيمن: النص التفاعلي */}
          <div className="flex flex-col justify-center h-full space-y-6 text-sm md:text-base leading-relaxed">
            {[
              "We engineer exceptional web applications and efficient backend systems tailored to your specific business logic. Our focus goes beyond just writing code; we build the right digital solutions designed to elevate your daily operations and drive sustainable growth.",
              "Though our engineering core is centralized, our digital footprint and market targeting are inherently global. We design scalable products built to cross borders, empowering your business to reach wider audiences and adapt to diverse, international markets seamlessly.",
              "We act as an extension of your team, bringing modern software architecture and robust technical decisions to the table. From seamless user interfaces to complex data structures, we build resilient platforms that perform reliably under real-world demands.",
              "Our clients aren't looking for a basic vendor; they need builders who treat their product as their own. By combining clean code with strategic design, we deliver high-performance systems that don't just solve today's problems, but scale effortlessly with your future ambitions.",
            ].map((text, index) => (
              <div
                key={index}
                onMouseEnter={() => setActivePara(index)}
                onMouseLeave={() => setActivePara(null)}
                className={`pl-4 border-l-2 transition-all duration-300 cursor-pointer ${
                  activePara === index
                    ? "border-white text-white translate-x-1"
                    : activePara !== null
                      ? "border-transparent text-zinc-600"
                      : "border-transparent text-zinc-400"
                }`}
              >
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
