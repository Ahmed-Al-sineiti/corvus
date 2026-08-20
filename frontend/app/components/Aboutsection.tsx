import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Tiny inline icons — no icon library, just three simple strokes so the     */
/*  section stays dependency-free.                                            */
/* -------------------------------------------------------------------------- */

function StrategyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="#B8B8B8" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4.5" stroke="#B8B8B8" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="1" fill="#B8B8B8" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3c3.5 3.2 6 6.9 6 10.2A6 6 0 1 1 6 13.2C6 9.9 8.5 6.2 12 3Z"
        stroke="#B8B8B8"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 8 4.5 12 9 16M15 8l4.5 4-4.5 4"
        stroke="#B8B8B8"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

type Pillar = {
  index: string;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Strategy",
    description: "We understand the problem before we build the solution.",
  },
  {
    index: "02",
    title: "Design",
    description: "We create clear, intuitive experiences that connect.",
  },
  {
    index: "03",
    title: "Development",
    description: "We build fast, scalable products that last.",
  },
];

/* -------------------------------------------------------------------------- */
/*  IMAGE SLOT                                                                 */
/*  Card box     : 453 × 350 (landscape, ratio ≈ 1.294)                       */
/*  Stack card 1 : +17px right, same top/height, border only                  */
/*  Stack card 2 : +37px right, same top/height, border only                  */
/*  Tune these three values if a different source image ratio is used —       */
/*  nothing else in the layout depends on them.                               */
/* -------------------------------------------------------------------------- */

const IMAGE_ASPECT = "453 / 350";
const STACK_OFFSET_1 = { x: 22, y: 20 }; // px — middle card
const STACK_OFFSET_2 = { x: 45, y: 40 }; // px — furthest back card

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function AboutSection() {
  return (
    <section className="bg-black py-20 sm:py-24 lg:py-28">
      <div className="mx-auto flex w-full flex-col gap-16 px-6 md:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-16">
        {/* ------------------------------------------------------------- */}
        {/* Left: the layered visual card                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full shrink-0 lg:basis-[45%]">
          <div className="relative w-full max-w-[453px]">
            {/* stack card 2 — furthest back */}
            <div
              aria-hidden="true"
              className="absolute rounded-md border border-[#242424]"
              style={{
                left: STACK_OFFSET_2.x,
                top: STACK_OFFSET_2.y,
                width: "100%",
                aspectRatio: IMAGE_ASPECT,
              }}
            />
            {/* stack card 1 — middle */}
            <div
              aria-hidden="true"
              className="absolute rounded-md border border-[#2e2e2e]"
              style={{
                left: STACK_OFFSET_1.x,
                top: STACK_OFFSET_1.y,
                width: "100%",
                aspectRatio: IMAGE_ASPECT,
              }}
            />

            {/* front card — holds the real photo */}
            <div
              className="relative overflow-hidden rounded-md border border-[#2a2a2a] bg-[#0d0d0d]"
              style={{ aspectRatio: IMAGE_ASPECT }}
            >
              {/*
                Drop the real photo here. object-cover fills the box
                regardless of the source image's own ratio.
              */}
              <img
                src="/your-image.jpg"
                alt="Studio photo"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

              <div className="absolute left-5 top-5 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 26 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 18c3-1 5-4 6-8 1 4 3 6 6 5-1 4-4 7-8 6-3-1-4-2-4-3Z"
                    stroke="#F2F2F0"
                    strokeWidth="1.3"
                  />
                </svg>
                <span className="text-[13px] font-semibold text-[#F2F2F0]">
                  Studio
                </span>
              </div>

              <p className="absolute left-5 right-5 top-[38%] text-[26px] font-semibold leading-[1.08] tracking-tight text-[#F5F5F3]">
                ASK WHY,
                <br />
                NOT WHAT
              </p>

              <p className="absolute bottom-4 left-5 right-5 text-[10.5px] leading-snug text-[#9a9a9a]">
                How we&apos;ve approached every project for the past decade
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Right: about content                                           */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full lg:basis-[55%]">
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#8a8a8a]">
            About us
          </span>

          <h2 className="mt-4 text-[32px] font-semibold leading-[1.2] tracking-tight text-white sm:text-[38px] lg:text-[42px]">
            We build digital experiences
            <br className="hidden sm:block" /> with purpose.
          </h2>

          <div className="mt-8 border-t border-[#252525]" />

          {/* Three pillars */}
          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`py-2 sm:py-0 sm:px-6 ${i === 0 ? "sm:pl-0" : ""} ${
                  i !== 0 ? "sm:border-l sm:border-[#232323]" : ""
                } ${i !== pillars.length - 1 ? "border-b border-[#1c1c1c] sm:border-b-0" : ""}`}
              >
                <span className="text-[11px] font-medium tracking-[0.1em] text-[#6f6f6f]">
                  {p.index}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#9a9a9a]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/approach"
            className="mt-10 inline-flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#161616] px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1f1f1f]"
          >
            Our approach
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
