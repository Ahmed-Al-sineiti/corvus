import Container from "./layout/Container";
import { ReactNode } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Activity,
  Globe2,
  ShoppingBag,
  Users,
  ShieldCheck,
} from "lucide-react";

interface Project {
  index: string;
  preview: ReactNode;
  title: string;
  description: string;
  tag: string;
}

/* Lightweight, code-drawn previews standing in for real product screenshots.
   Swap the `preview` node for an <Image /> of the actual product shot whenever
   it's ready — the surrounding card markup won't need to change. */

function DashboardPreview() {
  const bars = [40, 65, 35, 80, 55, 90, 60, 75];
  return (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
        <span className="font-mono text-[10px] tracking-widest text-foreground-secondary">
          REVENUE
        </span>
      </div>
      <div className="flex items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-accent/60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function FitnessPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent/30">
        <div
          className="absolute inset-0 rounded-full border-4 border-accent"
          style={{ clipPath: "inset(0 0 22% 0)" }}
        />
        <span className="font-mono text-lg font-medium text-foreground">
          78%
        </span>
      </div>
    </div>
  );
}

function CloudPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-border-strong">
        <Globe2 className="h-10 w-10 text-accent" strokeWidth={0.75} />
        <span className="absolute -bottom-1 -left-2 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground-secondary">
          98.5%
        </span>
        <span className="absolute -right-3 top-2 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground-secondary">
          1,256
        </span>
      </div>
    </div>
  );
}

function CommercePreview() {
  return (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div>
        <Activity className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
        <p className="font-heading mt-2 text-sm font-medium text-foreground">
          Elevate your
          <br />
          style.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="aspect-square rounded-md bg-background-secondary" />
        <div className="aspect-square rounded-md bg-background-secondary" />
        <div className="aspect-square rounded-md bg-background-secondary" />
      </div>
    </div>
  );
}

function CrmPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 p-5">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent/50" />
          <div
            className="h-1.5 rounded-full bg-background-secondary"
            style={{ width: `${60 - row * 8}%` }}
          />
        </div>
      ))}
      <Users
        className="mt-2 h-4 w-4 text-foreground-secondary"
        strokeWidth={1.5}
      />
    </div>
  );
}

function SecurityPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <ShieldCheck className="h-16 w-16 text-accent" strokeWidth={0.75} />
        <span className="absolute -right-6 -top-2 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground-secondary">
          High
        </span>
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    index: "01",
    preview: <DashboardPreview />,
    title: "Nexora Dashboard",
    description: "Analytics platform for real-time business intelligence.",
    tag: "Web Application",
  },
  {
    index: "02",
    preview: <FitnessPreview />,
    title: "Moveo Mobile App",
    description: "Cross-platform fitness app with real-time tracking.",
    tag: "Mobile App",
  },
  {
    index: "03",
    preview: <CloudPreview />,
    title: "CloudWave Platform",
    description: "Scalable cloud infrastructure management platform.",
    tag: "SaaS Platform",
  },
  {
    index: "04",
    preview: <CommercePreview />,
    title: "Vanto E-commerce",
    description: "Modern e-commerce platform for premium fashion brands.",
    tag: "Web Application",
  },
  {
    index: "05",
    preview: <CrmPreview />,
    title: "Atlas CRM",
    description: "Customer relationship management system for growing teams.",
    tag: "Web Application",
  },
  {
    index: "06",
    preview: <SecurityPreview />,
    title: "Sentinel Security",
    description: "AI-powered security platform for proactive threat detection.",
    tag: "Enterprise System",
  },
];

export default function Projects() {
  return (
    <section className="relative overflow-hidden bg-background bg-noise py-12 md:py-16">
      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 md:gap-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              PROJECTS
            </div>
            <h2 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
              Projects that
              <br />
              speak <span className="text-accent">results.</span>
            </h2>
            <p className="font-sans mt-5 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              We partner with ambitious companies and startups to build products
              that make a real impact.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
            <p className="font-sans max-w-xs text-sm leading-relaxed text-foreground-secondary">
              From complex systems to polished experiences, here&apos;s a
              selection of our recent work.
            </p>
            <a
              href="#all-projects"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
            >
              View All Projects
            </a>
          </div>
        </div>

        {/* Projects grid — 12-column grid system */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {projects.map((project) => (
            <a
              key={project.index}
              href="#"
              className="lg:col-span-4 group relative flex flex-col border border-border bg-transparent transition-colors hover:border-border-strong hover:bg-white/[0.02]"
            >
              <div className="relative h-44 w-full border-b border-border bg-background-secondary/60 sm:h-52 lg:h-56">
                <span className="absolute left-4 top-4 z-10 text-xs font-medium tracking-widest text-accent">
                  {project.index}
                </span>
                <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-foreground-secondary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-border-strong group-hover:text-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                {project.preview}
              </div>

              <div className="flex flex-1 items-start justify-between gap-4 p-4 md:p-6">
                <div>
                  <h3 className="font-heading text-lg font-medium text-foreground md:text-xl">
                    {project.title}
                  </h3>
                  <p className="font-sans mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {project.description}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary">
                  {project.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center md:p-8">
          <div className="relative">
            <h4 className="font-heading text-xl font-medium text-foreground">
              Have a project in mind?
            </h4>
            <p className="mt-1 text-sm text-foreground-secondary">
              Let&apos;s build something exceptional together.
            </p>
          </div>
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Start a Project
          </a>
        </div>
      </Container>
    </section>
  );
}
