import Container from "./layout/Container";
import { ReactNode } from "react";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

/* ---------- Custom sharp line-art icons ---------- */

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path d="M4 5h16v10H4z" stroke="currentColor" />
      <path
        d="M4.5 9.5l3-3 2 2 3.5-3.5"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path d="M2 18h20l-2 2H4z" stroke="currentColor" />
    </svg>
  );
}

function BrowserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path d="M3 5h18v14H3z" stroke="currentColor" />
      <path d="M3 9h18" stroke="currentColor" />
      <path d="M6 7h.01M9 7h.01" stroke="currentColor" strokeLinecap="square" />
      <path
        d="M7 13l3 3-3 3M14 13h4M14 16h4M14 19h4"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path d="M7 2h10v20H7z" stroke="currentColor" />
      <path d="M10 4h4" stroke="currentColor" strokeLinecap="square" />
      <path d="M11.5 19h1" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path
        d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.05 4 4 0 0 0 7 18z"
        stroke="currentColor"
      />
      <path
        d="M12 15v-4M9.5 13.5L12 11l2.5 2.5"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19z" stroke="currentColor" />
      <path d="M13 7l4 4" stroke="currentColor" />
      <path d="M4.5 19.5l1-4" stroke="currentColor" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" strokeWidth="1.4">
      <path
        d="M4 12a8 8 0 0 1 13.5-5.7M20 12a8 8 0 0 1-13.5 5.7"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path d="M17 3v3.5h-3.5" stroke="currentColor" strokeLinecap="square" />
      <path d="M7 21v-3.5h3.5" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}

const services: Service[] = [
  {
    icon: <LaptopIcon />,
    title: "Custom Software Development",
    description:
      "We build scalable, secure custom software tailored to your business needs from the ground up.",
  },
  {
    icon: <BrowserIcon />,
    title: "Web Application Development",
    description:
      "We design, develop, and deploy high-performance applications that deliver seamless user experiences.",
  },
  {
    icon: <PhoneIcon />,
    title: "Mobile Application Development",
    description:
      "We create intuitive and responsive mobile apps for iOS and Android that engage users and drive results.",
  },
  {
    icon: <CloudIcon />,
    title: "Cloud Solutions",
    description:
      "We offer scalable and secure cloud solutions, including AWS, Azure, and Google Cloud, to enhance your operations.",
  },
  {
    icon: <PenIcon />,
    title: "UI/UX Design",
    description:
      "We craft user-centered designs that are visually appealing and easy to use, maximizing an optimal user experience.",
  },
  {
    icon: <SyncIcon />,
    title: "DevOps & Maintenance",
    description:
      "We ensure your systems are always reliable, employing ongoing monitoring, deployment, and continuous support.",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-background bg-noise py-24">
      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-10 border-b border-border pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              SERVICES
            </div>
            <h2 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Our services,
              <br />
              engineered for <span className="text-accent">impact.</span>
            </h2>
            <p className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base">
              We design, build, and scale digital systems that solve real
              problems and drive measurable results.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
            <p className="font-sans max-w-xs text-sm leading-relaxed text-foreground-secondary">
              End-to-end software engineering services tailored to your goals
              and built for the future.
            </p>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
            >
              Explore Our Work
            </a>
          </div>
        </div>

        {/* Cards grid — 12-column grid system */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="lg:col-span-4 group relative flex flex-col border border-border bg-transparent p-7 transition-colors hover:border-border-strong hover:bg-white/[0.02]"
            >
              <div className="relative flex h-11 w-11 items-center justify-center border border-border text-foreground-secondary transition-colors group-hover:border-accent group-hover:text-accent">
                {service.icon}
                <span className="absolute -left-1 -top-1 h-1.5 w-1.5 bg-accent" />
              </div>

              <h3 className="font-heading mt-5 text-base font-medium text-foreground">
                {service.title}
              </h3>
              <p className="font-sans mt-2.5 text-sm leading-relaxed text-foreground-secondary">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden border border-border bg-surface p-8 sm:flex-row sm:items-center">
          <div className="relative">
            <h4 className="font-heading text-xl font-medium text-foreground">
              Have a challenge in mind?
            </h4>
            <p className="mt-1 text-sm text-foreground-secondary">
              Let&apos;s build something powerful together.
            </p>
          </div>
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Start a Project
          </a>
        </div>
      </Container>
    </section>
  );
}
