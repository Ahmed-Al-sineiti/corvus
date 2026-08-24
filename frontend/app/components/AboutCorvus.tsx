"use client";

import { useState } from "react";
import Image from "next/image";
import TextReveal from "./ui/TextReveal";

export default function AboutSection() {
  const [activePara, setActivePara] = useState<number | null>(null);

  return (
    <section className="w-full bg-black py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        {/* الجزء العلوي: العنوان والوصف في المنتصف */}
        <div className="text-center max-w-3xl mx-auto mb-24 flex flex-col items-center">
           <div className="max-w-2xl">
                      <TextReveal
                        as="h2"
                        className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
                      >
                        Who we are
                      </TextReveal>
                      <TextReveal
                        as="p"
                        delay={300}
                        className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg"
                      >
A digital product studio based in Cairo, built on top-tier engineering and design talent.                      </TextReveal>
                    </div>
        </div>

        {/* الجزء السفلي: الصور العشوائية والمتوازية مع النص */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* العمود الأيسر: مجموعة صور متراكمة بشكل عشوائي وجمالي */}
          <div className="relative w-full max-w-[480px] aspect-[4/3] mx-auto lg:mx-0 my-6 lg:my-0 group cursor-pointer">
            {/* 1. الصورة الخلفية السفلية (مايلة للشمال) */}
            <div className="absolute inset-0 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2.5 pb-8 shadow-2xl transition-all duration-500 ease-out transform -rotate-6 -translate-x-5 -translate-y-3 group-hover:-rotate-12 group-hover:-translate-x-10 group-hover:-translate-y-6 opacity-60 group-hover:opacity-85">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-950 grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/teamthree.jpeg" // صورة كواليس أو مشروع 3
                  alt="Behind the scenes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 2. الصورة الوسطى (مايلة لليمين) */}
            <div className="absolute inset-0 bg-zinc-900 border border-zinc-700/60 rounded-2xl p-2.5 pb-8 shadow-2xl transition-all duration-500 ease-out transform rotate-6 translate-x-5 translate-y-3 group-hover:rotate-12 group-hover:translate-x-10 group-hover:translate-y-6 opacity-80 group-hover:opacity-100 z-10">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-950">
                <Image
                  src="/teamtwo.jpeg" // صورة بيئة العمل أو تصميم 2
                  alt="Studio Culture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 3. الصورة الرئيسية العلوية (استقرار مائل خفيف جداً) */}
            <div className="relative w-full h-full bg-zinc-900 border border-zinc-700/90 rounded-2xl p-3 pb-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 ease-out transform -rotate-1 group-hover:rotate-0 group-hover:scale-[1.02] z-20">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-950">
                <Image
                  src="/teamone.jpeg" // صورة الفريق الرئيسية
                  alt="Corvus Studio Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* شريط التعريف المدمج بالصورة */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-lg z-30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-white tracking-widest uppercase mt-0.5">
                    CORVUS DEVELOPMENT AGENCY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الأيمن: النص التفاعلي مع تركيز القراءة */}
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
