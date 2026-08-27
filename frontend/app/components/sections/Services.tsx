"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { StaggerGroup, StaggerItem } from "../ui/StaggerGroup";
import TextReveal from "../ui/TextReveal";
import MaintenanceCardIcon from "./MaintenanceCardIcon";

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
    title: "Software Development",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/software-development.svg",
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
              className="font-heading text-4xl font-sans leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StaggerItem className="h-full border-r border-[#222429] last:border-r-0">
  <div
    onMouseEnter={() => setIsFocused(true)}
    onMouseLeave={() => setIsFocused(false)}
    className="group relative flex h-full flex-col p-8 rounded-2xl overflow-hidden transition-all duration-300"
  >
    {/* محتوى الكارت */}
    <div className="relative mb-8 flex flex-1 w-full items-center justify-center min-h-[200px] sm:min-h-[250px]">
      <span className="absolute left-0 top-0 font-mono text-xs uppercase text-[#8A8F98]   ">
        {service.fig}
      </span>
      {service.icon === "/services/software-development.svg" ? (
        <CodeWindowIcon
          className={`h-[85%] w-[85%] transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
        />
      ) : service.icon === "/services/icon-card.svg" ? (
        <MaintenanceCardIcon
          isOpen={isFocused}
          className={`h-[85%] w-[85%] transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={service.icon}
          alt=""
          className={`h-[85%] w-[85%] object-contain transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
        />
      )}
    </div>

    <h3 className="mb-2 text-[16px] font-medium tracking-[-0.011em] text-[#8A8F98]">
      {service.title}
    </h3>
    <p className="max-w-[368px] text-[14px] leading-[1.6] tracking-[-0.011em] text-[#62666D]">
      {service.description}
    </p>
  </div>
</StaggerItem>
  );
};

const CODE_LINES = [
  "Integration API {",
  "  try {",
  "    execute()=> {",
  "      val1, val2",
  "    }",
  "    ...",
  "}",
];

const LINE_STAGGER_MS = 110;
const LINE_DURATION_MS = 500;

const CodeWindowIcon: FC<{ className?: string }> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const cursorDelay = CODE_LINES.length * LINE_STAGGER_MS + LINE_DURATION_MS;
    const timer = setTimeout(() => setShowCursor(true), cursorDelay);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 334 230"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes code-cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Window Container */}
      <rect
        x="0.5"
        y="0.5"
        width="333"
        height="229"
        rx="5"
        ry="5"
        fill="#000000"
        stroke="#62666D"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />

      {/* Top Bar */}
      <line x1="0" y1="34" x2="334" y2="34" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Buttons */}
      <circle cx="17" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="29" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="41" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Line in header */}
      <line x1="53" y1="17" x2="320" y2="17" stroke="#4A4D53" strokeWidth="1" />

      {/* Code Text */}
      <g fontFamily="ui-monospace, Menlo, monospace" fontSize="13.5" fill="#7A7E84">
        {CODE_LINES.map((line, i) => (
          <text
            key={i}
            x="22"
            y={66 + i * 24}
            xmlSpace="preserve"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(4px)",
              transition: `opacity ${LINE_DURATION_MS}ms ease ${i * LINE_STAGGER_MS}ms, transform ${LINE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * LINE_STAGGER_MS}ms`,
            }}
          >
            {line}
          </text>
        ))}
      </g>

      {/* Cursor */}
      <rect
        x="30"
        y="199"
        width="7"
        height="14"
        fill="#7A7E84"
        style={{
          opacity: showCursor ? undefined : 0,
          animation: showCursor
            ? "code-cursor-blink 1s step-end infinite"
            : "none",
        }}
      />
    </svg>
  );
};

export default ServicesSection;
