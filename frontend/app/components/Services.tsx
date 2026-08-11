// components/ServicesSection.tsx
// Next.js (App Router or Pages) + TypeScript + Tailwind CSS
// Dark, isometric "FIG" style services grid — 4 custom line-art SVG icons.
// Drop this file into your `components` folder and use: <ServicesSection />
// Requires Tailwind CSS (no extra deps).

import type { FC, JSX } from "react";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

/* ------------------------------------------------------------------ */
/*  Isometric primitives                                              */
/* ------------------------------------------------------------------ */

const HW = 45; // half width of an iso cube
const HQ = HW * 0.577; // 30° isometric rise

interface CubeProps {
  cx: number;
  cy: number; // apex (top point) of the cube
  size?: number;
  h?: number; // extrusion depth
  opacity?: number;
}

/** A single true-isometric (30°) cube: top / left / right faces. */
const IsoCube: FC<CubeProps> = ({
  cx,
  cy,
  size = HW * 2,
  h = 40,
  opacity = 1,
}) => {
  const hw = size / 2;
  const hq = hw * 0.577;

  const top = `${cx},${cy} ${cx + hw},${cy + hq} ${cx},${cy + hq * 2} ${cx - hw},${cy + hq}`;
  const left = `${cx - hw},${cy + hq} ${cx},${cy + hq * 2} ${cx},${cy + hq * 2 + h} ${cx - hw},${cy + hq + h}`;
  const right = `${cx},${cy + hq * 2} ${cx + hw},${cy + hq} ${cx + hw},${cy + hq + h} ${cx},${cy + hq * 2 + h}`;

  return (
    <g opacity={opacity}>
      <polygon
        points={left}
        className="fill-[#d8c9a3]/[0.025] stroke-[#d8c9a3]/[0.14]"
        strokeWidth={1}
      />
      <polygon
        points={right}
        className="fill-black/40 stroke-[#d8c9a3]/[0.10]"
        strokeWidth={1}
      />
      <polygon
        points={top}
        className="fill-[#d8c9a3]/[0.05] stroke-[#d8c9a3]/[0.22]"
        strokeWidth={1}
      />
    </g>
  );
};

/** A thin isometric slab — used to build stacked "layer" icons. */
const IsoSlab: FC<CubeProps> = (props) => <IsoCube {...props} />;

/* ------------------------------------------------------------------ */
/*  Icon 1 — UI / UX  (layered stack + interface glyph, like FIG 0.2) */
/* ------------------------------------------------------------------ */

const UIUXIcon: FC = () => {
  const cx = 130;
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <IsoCube cx={cx} cy={18} size={92} h={38} />
      <IsoSlab cx={cx} cy={18 + 38 + 4} size={92} h={7} opacity={0.9} />
      <IsoSlab
        cx={cx}
        cy={18 + 38 + 4 + 7 + 4}
        size={92}
        h={7}
        opacity={0.75}
      />
      <IsoSlab
        cx={cx}
        cy={18 + 38 + 4 + (7 + 4) * 2}
        size={92}
        h={7}
        opacity={0.6}
      />
      <IsoSlab
        cx={cx}
        cy={18 + 38 + 4 + (7 + 4) * 3}
        size={92}
        h={7}
        opacity={0.45}
      />

      {/* interface glyph on the lid: crescent "eye" + cursor */}
      <g transform={`translate(${cx} 44)`}>
        <path
          d="M -22 2 A 24 12 0 0 0 22 2 A 30 8 0 0 1 -22 2 Z"
          className="fill-none stroke-[#d8c9a3]/40"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <line
          x1={-14}
          y1={13}
          x2={14}
          y2={13}
          className="stroke-[#d8c9a3]/20"
          strokeWidth={1}
        />
        <line
          x1={-9}
          y1={17}
          x2={9}
          y2={17}
          className="stroke-[#d8c9a3]/15"
          strokeWidth={1}
        />
        {/* cursor */}
        <path
          d="M 30 -6 L 30 14 L 34.5 10 L 38 17 L 41 15.5 L 37.5 8.5 L 43 8 Z"
          className="fill-[#d8c9a3]/50 stroke-[#d8c9a3]/60"
          strokeWidth={0.6}
        />
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Icon 2 — Web Development  (cube cluster + code glyph, FIG 0.3)    */
/* ------------------------------------------------------------------ */

const WebDevIcon: FC = () => {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <IsoCube cx={130} cy={12} size={70} h={38} opacity={0.95} />
      <IsoCube cx={178} cy={52} size={70} h={38} opacity={0.85} />
      <IsoCube cx={82} cy={52} size={70} h={38} opacity={0.9} />
      <IsoCube cx={130} cy={92} size={70} h={38} />

      {/* </> glyph on the top cube's lid */}
      <g
        transform="translate(130 38)"
        className="stroke-[#d8c9a3]/55"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M -18 -5 L -26 2 L -18 9" />
        <path d="M 18 -5 L 26 2 L 18 9" />
        <path
          d="M 4 -9 L -4 13"
          className="stroke-[#d8c9a3]/30"
          strokeWidth={1.6}
        />
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Icon 3 — SEO Services  (ascending bars + magnifier)                */
/* ------------------------------------------------------------------ */

const SEOIcon: FC = () => {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <IsoCube cx={70} cy={128} size={54} h={22} opacity={0.65} />
      <IsoCube cx={130} cy={100} size={54} h={50} opacity={0.85} />
      <IsoCube cx={190} cy={68} size={54} h={82} />

      {/* magnifying glass */}
      <g transform="translate(196 40)">
        <circle
          r={17}
          className="fill-black/50 stroke-[#d8c9a3]/55"
          strokeWidth={1.6}
        />
        <line
          x1={12}
          y1={12}
          x2={26}
          y2={26}
          className="stroke-[#d8c9a3]/55"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Icon 4 — Maintenance  (radial gear burst, echoes FIG 0.4's fan)    */
/* ------------------------------------------------------------------ */

const MaintenanceIcon: FC = () => {
  const cx = 130;
  const cy = 110;
  const spokes = 12;
  const rInner = 30;
  const rOuter = 58;

  const lines: JSX.Element[] = [];
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * rInner;
    const y1 = cy + Math.sin(angle) * rInner * 0.55; // squashed for iso feel
    const x2 = cx + Math.cos(angle) * rOuter;
    const y2 = cy + Math.sin(angle) * rOuter * 0.55;
    const fade = 0.15 + (Math.abs(Math.sin(angle)) * 0.35 + 0.15);
    lines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="stroke-[#d8c9a3]/40"
        style={{ opacity: fade }}
        strokeWidth={3}
        strokeLinecap="round"
      />,
    );
  }

  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      {lines}
      <ellipse
        cx={cx}
        cy={cy}
        rx={22}
        ry={13}
        className="fill-black/50 stroke-[#d8c9a3]/45"
        strokeWidth={1.5}
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={9}
        ry={5.4}
        className="fill-[#d8c9a3]/10 stroke-[#d8c9a3]/30"
        strokeWidth={1}
      />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  fig: string;
  title: string;
  description: string;
  Icon: FC;
}

const SERVICES: ServiceItem[] = [
  {
    fig: "FIG 0.1",
    title: "UI/UX Design",
    description:
      "Interfaces shaped by research, hierarchy, and the habits of real users.",
    Icon: UIUXIcon,
  },
  {
    fig: "FIG 0.2",
    title: "Web Development",
    description:
      "Modular, well-engineered builds — from component to full product.",
    Icon: WebDevIcon,
  },
  {
    fig: "FIG 0.3",
    title: "SEO Services",
    description:
      "Structured for visibility, measured for growth, tuned for ranking.",
    Icon: SEOIcon,
  },
  {
    fig: "FIG 0.4",
    title: "Maintenance",
    description:
      "Ongoing care that keeps every system fast, secure, and current.",
    Icon: MaintenanceIcon,
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

const ServicesSection: FC = () => {
  return (
    <section id="services" className="relative bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <StaggerGroup className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {SERVICES.map(({ fig, title, description, Icon }, i) => (
            <StaggerItem key={fig}>
              <div
                className={[
                  "group relative flex flex-col px-2 py-10 sm:px-8 lg:px-10",
                  i === 0 ? "sm:pl-0 lg:pl-0" : "",
                  i === SERVICES.length - 1 ? "sm:pr-0 lg:pr-0" : "",
                ].join(" ")}
              >
                <span className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-[#d8c9a3]/40">
                  {fig}
                </span>

                <div className="relative mb-8 h-[190px] w-full">
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-[#d8c9a3]/[0.03] blur-2xl transition-opacity duration-500 group-hover:bg-[#d8c9a3]/[0.06]" />
                  </div>
                  <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <Icon />
                  </div>
                </div>

                <h3 className="mb-2 text-[15px] font-medium text-white">
                  {title}
                </h3>
                <p className="max-w-[240px] text-[14px] leading-relaxed text-[#d8c9a3]/50">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default ServicesSection;
