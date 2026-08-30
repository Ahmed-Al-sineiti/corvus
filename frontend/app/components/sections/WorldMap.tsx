"use client";

import { useEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { Feature, FeatureCollection, MultiPolygon } from "geojson";

const LAND = "#000000";
const STROKE = "#222429";
const MARK = "#ffffff";
const LINE_COLOR = "#f5f5f5"; // درجة من الأبيض (نفس foreground الموقع) بدل الأزرق للخط والنقطة
const HOVER_FILL = "#242428"; // درجة قريبة من الأسود بدل الأزرق الصريح
const MONO_STACK = "ui-monospace, 'JetBrains Mono', monospace";
const VT323_STACK = "var(--font-vt323), monospace";
const SERVICES_TEXT_COLOR = "#7A7E84"; // نفس لون النص في قوالب السرفس

// الدول اللي بنبرزها على الخريطة (بالـ ISO numeric id) + عدد المشاريع اللي بتتعرض عند الهوفر
const COUNTRY_INFO: Record<number, { name: string; projects: number }> = {
  818: { name: "Egypt", projects: 7 },
  682: { name: "Saudi Arabia", projects: 8 },
  784: { name: "UAE", projects: 6 },
  634: { name: "Qatar", projects: 4 },
  414: { name: "Kuwait", projects: 3 },
  512: { name: "Oman", projects: 3 },
  840: { name: "United States", projects: 5 },
  826: { name: "United Kingdom", projects: 4 },
  250: { name: "France", projects: 3 },
  276: { name: "Germany", projects: 4 },
  528: { name: "Netherlands", projects: 2 },
  724: { name: "Spain", projects: 3 },
  380: { name: "Italy", projects: 3 },
  360: { name: "Indonesia", projects: 3 },
  458: { name: "Malaysia", projects: 2 },
  643: { name: "Russia", projects: 4 },
  76: { name: "Brazil", projects: 2 },
};

const HIGHLIGHTED_COUNTRIES = new Set(Object.keys(COUNTRY_INFO).map(Number));

const ANTARCTICA_ID = 10;
// فرنسا/هولندا/إسبانيا عندهم أقاليم ما وراء البحار بعيدة عن أوروبا - بنقصهم على قارتهم الأصلية بس
const EURO_TERRITORIES = new Set([250, 528, 724]);
const EURO_BOX: [[number, number], [number, number]] = [
  [-12, 34],
  [22, 62],
];

const W = 1920;
const H = 1080;

// أبعاد الـ frame اللي بيظهر عند الهوفر على دولة متحددة
const FRAME_W = 420;
const FRAME_H = 170;

type Callout = {
  cx: number;
  cy: number;
  midX: number;
  midY: number;
  attachX: number;
  frameX: number;
  frameY: number;
};

function trimToBox(f: Feature<MultiPolygon>, box: typeof EURO_BOX): Feature<MultiPolygon> {
  const [[w, s], [e, n]] = box;
  const polys = f.geometry.coordinates.filter((p) => {
    const c = geoCentroid({ type: "Polygon", coordinates: p });
    return c[0] >= w && c[0] <= e && c[1] >= s && c[1] <= n;
  });
  return {
    ...f,
    geometry: {
      type: "MultiPolygon",
      coordinates: polys.length ? polys : f.geometry.coordinates,
    },
  };
}

const WorldMap: React.FC<{ className?: string }> = ({ className }) => {
  const [countries, setCountries] = useState<Feature<MultiPolygon>[] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/world-atlas-110m.json")
      .then((res) => res.json())
      .then((topo: Topology) => {
        if (cancelled) return;
        const collection = feature(
          topo,
          topo.objects.countries
        ) as unknown as FeatureCollection<MultiPolygon>;

        const trimmed = collection.features
          .filter((f) => Number(f.id) !== ANTARCTICA_ID)
          .map((f) => (EURO_TERRITORIES.has(Number(f.id)) ? trimToBox(f, EURO_BOX) : f));

        setCountries(trimmed);
      })
      .catch((err) => console.error("Failed to load world map data:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!countries) {
    return <div className={className} aria-hidden />;
  }

  const projection = geoNaturalEarth1().fitExtent(
    [
      [24, 20],
      [W - 24, H - 20],
    ],
    { type: "FeatureCollection", features: countries }
  );
  projection.clipExtent([
    [0, 0],
    [W, H],
  ]);
  const path = geoPath(projection);

  const hoveredInfo = hoveredId != null ? COUNTRY_INFO[hoveredId] : null;
  const hoveredFeature = hoveredId != null ? countries.find((f) => Number(f.id) === hoveredId) : null;

  let callout: Callout | null = null;
  if (hoveredFeature && hoveredInfo) {
    const [cx, cy] = path.centroid(hoveredFeature);
    // اتجاه الخط بيتحدد حسب مكان الدولة في الخريطة عشان الـ frame ميطلعش برا الحدود
    const dirX = cx > W * 0.55 ? -1 : 1;
    const dirY = cy > H * 0.6 ? -1 : 1;
    const midX = cx + 130 * dirX;
    const rawFrameX = dirX > 0 ? midX : midX - FRAME_W;
    const rawFrameY = cy + 70 * dirY - FRAME_H / 2;

    const frameX = Math.min(Math.max(rawFrameX, 16), W - FRAME_W - 16);
    const frameY = Math.min(Math.max(rawFrameY, 16), H - FRAME_H - 16);
    const midY = frameY + FRAME_H / 2;
    const attachX = dirX > 0 ? frameX : frameX + FRAME_W;

    callout = { cx, cy, midX, midY, attachX, frameX, frameY };
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Global reach map"
    >
      <rect width={W} height={H} fill={LAND} />
      {countries.map((f, i) => {
        const id = Number(f.id);
        const info = COUNTRY_INFO[id];
        const isHovered = hoveredId === id;
        return (
          <path
            key={f.id ?? i}
            d={path(f) ?? undefined}
            fill={isHovered ? HOVER_FILL : info ? MARK : LAND}
            stroke={STROKE}
            strokeWidth={1.3}
            strokeLinejoin="round"
            style={info ? { cursor: "pointer", transition: "fill 150ms ease" } : undefined}
            onMouseEnter={info ? () => setHoveredId(id) : undefined}
            onMouseLeave={info ? () => setHoveredId(null) : undefined}
          />
        );
      })}

      {callout && hoveredInfo && (
        <g pointerEvents="none">
          {/* خط بيخرج مستقيم من الدولة وينكسر بزاوية 90 درجة بالظبط قبل ما يوصل للكارد */}
          <polyline
            points={`${callout.cx},${callout.cy} ${callout.cx},${callout.midY} ${callout.attachX},${callout.midY}`}
            fill="none"
            stroke={LINE_COLOR}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={callout.cx} cy={callout.cy} r={6} fill={LINE_COLOR} stroke="#000000" strokeWidth={2} />

          <rect
            x={callout.frameX}
            y={callout.frameY}
            width={FRAME_W}
            height={FRAME_H}
            rx={10}
            fill="#111111"
            stroke="#2b2b2b"
            strokeWidth={1.5}
          />
          {/* window-chrome header عشان تفضل نفس عيلة الأيقونات في الموقع */}
          <circle cx={callout.frameX + 28} cy={callout.frameY + 26} r={5} fill="#3b3b3b" />
          <circle cx={callout.frameX + 48} cy={callout.frameY + 26} r={5} fill="#3b3b3b" />
          <circle cx={callout.frameX + 68} cy={callout.frameY + 26} r={5} fill="#3b3b3b" />
          <line
            x1={callout.frameX}
            y1={callout.frameY + 46}
            x2={callout.frameX + FRAME_W}
            y2={callout.frameY + 46}
            stroke="#2b2b2b"
            strokeWidth={1}
          />

          <text
            x={callout.frameX + 28}
            y={callout.frameY + 96}
            fontFamily={MONO_STACK}
            fontSize={34}
            fill="#f5f5f5"
          >
            {hoveredInfo.name}
          </text>
          <text
            x={callout.frameX + 28}
            y={callout.frameY + 142}
            fontFamily={VT323_STACK}
            fontSize={38}
            fill={SERVICES_TEXT_COLOR}
          >
            {hoveredInfo.projects} PROJECT{hoveredInfo.projects === 1 ? "" : "S"}
          </text>
        </g>
      )}
    </svg>
  );
};

export default WorldMap;
