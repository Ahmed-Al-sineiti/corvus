"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { StaggerGroup, StaggerItem } from "../ui/StaggerGroup";
import TextReveal from "../ui/TextReveal";

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
    title: "UI/UX Design",
    description:
      "Intuitive interfaces and clear user flows that turn wireframes into effortless, engaging experiences.",
    icon: "/services/wireframe.svg",
  },
  {
    fig: "SRV 02",
    title: "Software Development",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/software-development.svg",
  },
  {
    fig: "SRV 03",
    title: "SEO Optimization",
    description:
      "Optimization that puts your site at the top of search results, driving consistent organic traffic.",
    icon: "/services/seo.svg",
  },
  {
    fig: "SRV 04",
    title: "Maintenance",
    description:
      "Proactive monitoring and updates to keep your product secure, fast, and always online.",
    icon: "/services/error.svg",
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
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

// مكون فرعي لكل كارت عشان يتحكم في إضاءة الماوس بشكل منفرد ونظيف
const ServiceCard: FC<{ service: ServiceItem; index: number }> = ({ service, index }) => {
  const borderClasses = 
    index === 0 || index === 2 ? "border-r-0 sm:border-r" :
    index === 1 ? "border-r-0 lg:border-r" :
    "border-r-0";

  return (
    <StaggerItem className={`h-full border-[#222429] ${borderClasses}`}>
      <div
        className="group relative flex h-full flex-col p-8 rounded-2xl overflow-hidden transition-all duration-300"
      >
        {/* محتوى الكارت */}
        <div className="relative mb-8 flex w-full items-center justify-center h-[220px] pt-8 sm:h-[270px] sm:pt-10">
          <span className="absolute left-0 top-0 font-mono text-xs uppercase text-[#8A8F98]">
            {service.fig}
          </span>
          {service.icon === "/services/software-development.svg" ? (
            <CodeWindowIcon
              className={`h-[85%] w-[85%] transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
            />
          ) : service.icon === "/services/wireframe.svg" ? (
            <WireframeWindowIcon
              className={`h-[85%] w-[85%] transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
            />
          ) : service.icon === "/services/error.svg" ? (
            <MaintenanceErrorIcon
              className={`h-[85%] w-[85%] transition-transform duration-500 ease-out ${service.imgClassName || ""}`}
            />
          ) : service.icon === "/services/seo.svg" ? (
            <SearchResultIcon
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

        <h3 className="mb-3 text-[16px] font-medium tracking-[-0.011em] text-[#8A8F98]">
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

const CODE_FULL_TEXT = CODE_LINES.join("\n");
const CODE_TYPE_CHAR_MS = 40;

// بيكتب النص كامل حرف حرف مرة واحدة (من غير مسح/لوب) - مستخدم لكود السوفت وير ديفلوبمنت
function useTypeOnce(text: string, active: boolean) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const step = (i: number) => {
      if (cancelled) return;
      setLength(i);
      if (i < text.length) {
        setTimeout(() => step(i + 1), CODE_TYPE_CHAR_MS);
      }
    };

    const timer = setTimeout(() => step(1), CODE_TYPE_CHAR_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, text]);

  return length;
}

// نفس منطق reveal-on-scroll مستخدم في أكتر من أيقونة هنا، فبقى مشترك بدل ما يتكرر
function useRevealOnce<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// إطار الـ "شاشة" المشترك بين أيقونات الخدمات (نفس شكل السوفت وير ديفلوبمنت)
const WindowChrome: FC = () => (
  <>
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
    <line x1="0" y1="34" x2="334" y2="34" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
    <circle cx="17" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
    <circle cx="29" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
    <circle cx="41" cy="17" r="3" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
    <line x1="53" y1="17" x2="320" y2="17" stroke="#4A4D53" strokeWidth="1" />
  </>
);

const CodeWindowIcon: FC<{ className?: string }> = ({ className }) => {
  const { ref: svgRef, isVisible } = useRevealOnce<SVGSVGElement>();
  const typedLength = useTypeOnce(CODE_FULL_TEXT, isVisible);
  const typedLines = CODE_FULL_TEXT.slice(0, typedLength).split("\n");
  const showCursor = typedLength === CODE_FULL_TEXT.length;

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

      <WindowChrome />

      {/* Code Text */}
      <g style={{ fontFamily: "var(--font-vt323), monospace" }} fontSize="16" fill="#7A7E84">
        {CODE_LINES.map((_, i) => (
          <text key={i} x="22" y={66 + i * 24} xmlSpace="preserve">
            {typedLines[i] ?? ""}
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

const TYPEWRITER_WORDS = ["UI", "UX"];
const TYPE_CHAR_MS = 90;
const TYPE_HOLD_MS = 3000;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// بيكتب كل كلمة حرف حرف، يستنى، يمسحها حرف حرف، وبعدين الكلمة اللي بعدها - بلوب
function useTypewriterLoop(words: string[], active: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    (async () => {
      let wordIndex = 0;
      while (!cancelled) {
        const word = words[wordIndex % words.length];

        for (let i = 1; i <= word.length && !cancelled; i++) {
          setText(word.slice(0, i));
          await wait(TYPE_CHAR_MS);
        }

        if (cancelled) break;
        await wait(TYPE_HOLD_MS);

        for (let i = word.length - 1; i >= 0 && !cancelled; i--) {
          setText(word.slice(0, i));
          await wait(TYPE_CHAR_MS);
        }

        wordIndex++;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [active, words]);

  return text;
}

const WIREFRAME_BLOCKS = [
  <rect key="line1" x="22" y="54" width="180" height="6" rx="1" fill="#4A4D53" />,
  <rect key="line2" x="22" y="70" width="130" height="6" rx="1" fill="#4A4D53" />,
  <rect
    key="image"
    x="22"
    y="94"
    width="110"
    height="110"
    rx="3"
    fill="none"
    stroke="#62666D"
    strokeWidth="1.5"
    strokeOpacity="0.55"
  />,
];

const WireframeWindowIcon: FC<{ className?: string }> = ({ className }) => {
  const { ref: svgRef, isVisible } = useRevealOnce<SVGSVGElement>();
  const typedLabel = useTypewriterLoop(TYPEWRITER_WORDS, isVisible);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 334 230"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <WindowChrome />

      {WIREFRAME_BLOCKS.map((block, i) => (
        <g
          key={block.key}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(4px)",
            transition: `opacity ${LINE_DURATION_MS}ms ease ${i * LINE_STAGGER_MS}ms, transform ${LINE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * LINE_STAGGER_MS}ms`,
          }}
        >
          {block}
        </g>
      ))}

      <text
        x="222"
        y="161"
        textAnchor="middle"
        fontSize="44"
        fill="#7A7E84"
        style={{
          fontFamily: "var(--font-vt323), monospace",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${LINE_DURATION_MS}ms ease ${WIREFRAME_BLOCKS.length * LINE_STAGGER_MS}ms`,
        }}
      >
        {typedLabel}
      </text>
    </svg>
  );
};

const ERROR_CODES = ["404", "500"];

const MaintenanceErrorIcon: FC<{ className?: string }> = ({ className }) => {
  const { ref: svgRef, isVisible } = useRevealOnce<SVGSVGElement>();
  const code = useTypewriterLoop(ERROR_CODES, isVisible);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 334 230"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <WindowChrome />

      <text
        x="167"
        y="115"
        textAnchor="middle"
        fontSize="44"
        fill="#7A7E84"
        style={{
          fontFamily: "var(--font-vt323), monospace",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${LINE_DURATION_MS}ms ease`,
        }}
      >
        ERROR
      </text>

      <text
        x="167"
        y="155"
        textAnchor="middle"
        fontSize="30"
        fill="#7A7E84"
        style={{
          fontFamily: "var(--font-vt323), monospace",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${LINE_DURATION_MS}ms ease ${LINE_STAGGER_MS}ms`,
        }}
      >
        {code}
      </text>
    </svg>
  );
};

const DOMAIN_TLDS = [".com", ".org", ".net"];

// سيرش بار ونتيجة بحث واحدة - "yourwebsite" ثابتة والامتداد بس بيتغير
const SearchResultIcon: FC<{ className?: string }> = ({ className }) => {
  const { ref: svgRef, isVisible } = useRevealOnce<SVGSVGElement>();
  const tld = useTypewriterLoop(DOMAIN_TLDS, isVisible);

  return (
    <svg ref={svgRef} viewBox="0 0 334 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <WindowChrome />

      {/* Search bar */}
      <rect
        x="22"
        y="48"
        width="290"
        height="28"
        rx="14"
        fill="none"
        stroke="#62666D"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      <circle cx="37" cy="62" r="6" fill="none" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="41.5" y1="66.5" x2="46" y2="71" stroke="#62666D" strokeWidth="1.5" strokeOpacity="0.55" strokeLinecap="round" />
      <text
        x="54"
        y="67"
        fontSize="15"
        fill="#7A7E84"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        Your Website Name
      </text>

      {/* Search result - النتيجة الأولى، أعلى تباين */}
      <text
        x="22"
        y="118"
        fontSize="22"
        fill="#7A7E84"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        <tspan>yourwebsite</tspan>
        <tspan>{tld}</tspan>
      </text>

      {/* نتايج تانية - لون أبهت عشان كل التباين يفضل على النتيجة الأولى */}
      <text
        x="22"
        y="150"
        fontSize="16"
        fill="#4A4D53"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        othersite.com
      </text>
      <text
        x="22"
        y="174"
        fontSize="16"
        fill="#4A4D53"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        competitor.net
      </text>
    </svg>
  );
};

export default ServicesSection;
