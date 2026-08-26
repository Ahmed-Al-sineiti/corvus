"use client";

import { useState } from "react";
import TextReveal from "../ui/TextReveal";
import Image from "next/image";

export default function AboutSection() {
  const [activePara, setActivePara] = useState<number | null>(null);

  return (
    <section id="about" className="w-full bg-black py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto">
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
              A digital product studio based in Cairo, built on top-tier engineering and design talent.
            </TextReveal>
          </div>
        </div>

        {/* الجزء السفلي: الصورة والنص التفاعلي */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* العمود الأيسر: illustration exported directly from the Figma frame */}
          <div className="w-full max-w-[592px] mx-auto lg:mx-0">
            <Image
              src="/about-corvus-illustration.svg"
              alt="A layered Corvus project illustration"
              width={592}
              height={437}
              className="block h-auto w-full"
            />
          </div>

          {/* العمود الأيمن: النص التفاعلي */}
          <div className="flex flex-col justify-center h-full space-y-6 text-sm md:text-base leading-relaxed">
            {[
              "We've spent years partnering with ambitious teams to build high-performance web applications and SaaS platforms that drive real impact. We navigate the hardest product moments where technical decisions define your future.",
              "We don't just write code. We partner. There's a difference in how we think about software architecture, how we deliver, and how we align with your business goals.",
              "The companies we work with aren't just looking for an agency. They're looking for a dedicated team that treats their product as its own. That's exactly how we operate.",
              "Founded with a passion for clean code and exceptional user experiences, we hire from the strongest talent pools. We are builders who ship complex digital products designed to handle real-world scale with speed and reliability.",
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
