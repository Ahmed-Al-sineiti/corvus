"use client";

import type { FC, MouseEvent } from "react";
import { useState, useRef } from "react";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";
import TextReveal from "./ui/TextReveal";

interface ServiceItem {
  fig: string;
  title: string;
  description: string;
  icon: string;
  imgClassName?: string;
}

const SERVICES: ServiceItem[] = [
  {
    fig: "SRV 01",
    title: "Designed for speed",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 02",
    title: "Built for scale",
    description:
      "Architecture that grows with your business, ensuring reliability during your highest traffic peaks.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 03",
    title: "Pixel perfect",
    description:
      "Obsessive attention to detail in every UI component, delivering a world-class user experience.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 04",
    title: "Maintenance",
    description:
      "Proactive monitoring and updates to keep your product secure, fast, and always online.",
    icon: "/services/icon-card.svg",
    imgClassName: "scale-[1.25]",
  },
];

const ServicesSection: FC = () => {
  return (
    <section
      id="services"
      className="relative bg-background py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1912px] px-6 sm:px-8 lg:px-[42px]">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
            >
              Our{"\n"}Services
            </TextReveal>
            <TextReveal
              as="p"
              delay={300}
              className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg"
            >
              We design and build digital experiences that help ambitious teams
              ship with high velocity and focus.
            </TextReveal>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

// مكون فرعي لكل كارت عشان يتحكم في إضاءة الماوس بشكل منفرد ونظيف
const ServiceCard: FC<{ service: ServiceItem }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <StaggerItem className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className="group relative flex h-full flex-col p-8 rounded-2xl bg-zinc-950/40 border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-transparent"
      >
        {/* إضاءة خفيفة تتبع الماوس على حدود الكارت */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isFocused ? 1 : 0,
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 70%)`,
          }}
        />

        {/* طبقة خلفية داخلية سوداء عشان تظهر الحدود المضيئة بشكل نظيف */}
        <div className="absolute inset-[1px] bg-black rounded-[15px] -z-10" />

        {/* محتوى الكارت الأصلي */}
        <div className="relative mb-8 flex flex-1 w-full items-center justify-center min-h-[200px] sm:min-h-[250px]">
          <span className="absolute left-0 top-0 font-mono text-xs uppercase text-[#8A8F98] transition-colors duration-300 group-hover:text-white">
            {service.fig}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.icon}
            alt=""
            className={`h-[85%] w-[85%] object-contain transition-transform duration-500 ease-out group-hover:scale-105 ${service.imgClassName || ""}`}
          />
        </div>

        <h3 className="mb-2 text-[16px] font-medium tracking-[-0.011em] text-white">
          {service.title}
        </h3>
        <p className="max-w-[368px] text-[14px] leading-[1.6] tracking-[-0.011em] text-[#8A8F98]">
          {service.description}
        </p>
      </div>
    </StaggerItem>
  );
};

export default ServicesSection;
