import Container from "./layout/Container";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";

interface Project {
  index: string;
  title: string;
  description: string;
  tag: string;
  /** Swap this for a real <video> or <Image> when ready */
  media?: React.ReactNode;
}

const projects: Project[] = [
  {
    index: "01",
    title: "Nexora Dashboard",
    description:
      "An analytics platform built for real-time business intelligence. Delivers live KPI monitoring, predictive reporting, and deep data visualisation tailored to executive workflows.",
    tag: "Web Application",
  },
  {
    index: "02",
    title: "Moveo Mobile App",
    description:
      "A cross-platform fitness companion with GPS tracking, adaptive workout plans, and social progress sharing — all from a single, fluid mobile experience.",
    tag: "Mobile App",
  },
  {
    index: "03",
    title: "CloudWave Platform",
    description:
      "Scalable cloud infrastructure management with automated provisioning, cost analytics, and real-time performance monitoring across AWS, Azure, and GCP.",
    tag: "SaaS Platform",
  },
  {
    index: "04",
    title: "Vanto E-commerce",
    description:
      "A modern e-commerce storefront for premium fashion brands, featuring AI-powered product recommendations and a headless architecture built for speed.",
    tag: "Web Application",
  },
];

/* ─── Placeholder media cell ─────────────────────────────────── */
function MediaPlaceholder({ index }: { index: string }) {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-[#111111]">
      {/* Corner marks */}
      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-[#404040]">
        {index}
      </span>
      <span className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.2em] text-[#404040] uppercase">
        MP4
      </span>

      {/* Play-button hint */}
      <div className="flex flex-col items-center gap-3 opacity-20">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-12 w-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="23" stroke="#e5e5e5" strokeWidth="1" />
          <polygon points="19,15 36,24 19,33" fill="#e5e5e5" />
        </svg>
        <span className="font-mono text-[10px] tracking-widest text-[#e5e5e5]">
          MEDIA PLACEHOLDER
        </span>
      </div>

      {/* Subtle grid lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${index}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
      </svg>
    </div>
  );
}

/* ─── Single project row ─────────────────────────────────────── */
function ProjectRow({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  const textBlock = (
    <div className="flex flex-col h-full">
      {/* Title cell */}
      <div className="flex-1 border-b border-[#2b2b2b] p-8 md:p-10 flex flex-col justify-between">
        {/* Tag */}
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#525252]">
          {project.tag}
        </span>

        <h3 className="font-heading text-3xl font-medium leading-[1.1] tracking-tight text-foreground mt-6 sm:text-4xl lg:text-[42px]">
          {project.title}
        </h3>
      </div>

      {/* Description cell */}
      <div className="p-8 md:p-10">
        <p className="font-sans text-sm leading-relaxed text-[#737373] sm:text-base max-w-sm">
          {project.description}
        </p>
      </div>
    </div>
  );

  const mediaBlock = (
    <div className="h-full min-h-[320px] md:min-h-0">
      {project.media ?? <MediaPlaceholder index={project.index} />}
    </div>
  );

  /*
   * reversed=false → [text | media]   (text on left,  media on right)
   * reversed=true  → [media | text]   (media on left, text on right)
   *
   * flex-row-reverse swaps column order while keeping the divider border
   * always between the two children via the first child's border-r.
   */
  return (
    <div
      className={`flex flex-col md:flex-row border border-[#2b2b2b] rounded-3xl overflow-hidden transition-colors hover:bg-white/[0.015] ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
      style={{ minHeight: "380px" }}
    >
      {/* Left-ish column (adjusts border based on direction) */}
      <div
        className={`md:w-1/2 border-b border-[#2b2b2b] md:border-b-0 ${reversed ? "md:border-l" : "md:border-r"} md:border-[#2b2b2b]`}
      >
        {textBlock}
      </div>
      {/* Right-ish column */}
      <div className="md:w-1/2 min-h-[300px]">{mediaBlock}</div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background py-8 md:py-10"
      style={{ backgroundColor: "#080808" }}
    >
      <Container className="relative z-10">
        {/* ── Project rows ── */}
        <StaggerGroup className="flex flex-col gap-6">
          {projects.map((project, idx) => (
            <StaggerItem key={project.index}>
              <ProjectRow
                project={project}
                reversed={idx % 2 !== 0}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
