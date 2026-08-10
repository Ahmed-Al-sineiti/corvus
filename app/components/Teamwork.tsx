import Container from "./layout/Container";
import { UserRound } from "lucide-react";

interface Member {
  index: string;
  name: string;
  role: string;
  description: string;
  linkedin: string;
}

const team: Member[] = [
  {
    index: "01",
    name: "Muhammad Mustafa",
    role: "Full-stack developer",
    description:
      "Full-stack engineer and system architect with a focus on scalable backend systems and distributed architecture.",
    linkedin: "#",
  },
  {
    index: "02",
    name: "Ahmed Abd-Elsalam",
    role: "UI/UX Designer",
    description:
      "Designs intuitive digital experiences that combine clarity, aesthetics, and human-centered thinking.",
    linkedin: "#",
  },
  {
    index: "03",
    name: "Abdulrahman",
    role: "Full-stack developer",
    description:
      "Full-stack engineer and system architect with a focus on scalable backend systems and distributed architecture.",
    linkedin: "#",
  },
];

export default function TeamWork() {
  return (
    <section className="relative overflow-hidden bg-background bg-noise py-12 md:py-16">
      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 md:gap-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              TEAM WORK
            </div>
            <h2 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
              The minds behind
              <br />
              the <span className="text-accent">mission.</span>
            </h2>
            <p className="font-sans mt-5 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              A small team of dedicated professionals united by vision,
              discipline, and a passion for building digital systems that
              matter.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
            <p className="font-sans max-w-xs text-sm leading-relaxed text-foreground-secondary">
              We collaborate closely, challenge ideas, and craft solutions that
              create lasting impact.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
            >
              Work With Us
            </a>
          </div>
        </div>

        {/* Team grid — 12-column grid system */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {team.map((member) => (
            <div
              key={member.index}
              className="lg:col-span-4 group relative flex flex-col border border-border bg-transparent transition-colors hover:border-border-strong hover:bg-white/[0.02]"
            >
              <div className="relative h-56 w-full overflow-hidden border-b border-border bg-background-secondary sm:h-64 lg:h-72">
                <span className="absolute left-5 top-5 z-10 font-mono text-xs font-medium tracking-widest text-accent">
                  {member.index}
                </span>
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                   className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center border border-border bg-background/80 text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Portrait placeholder — swap for <Image src="/team/name.jpg" /> */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background-secondary to-background">
                  <UserRound
                    className="h-24 w-24 text-foreground-secondary/30 sm:h-32 sm:w-32"
                    strokeWidth={0.75}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-4 md:p-6">
                <h3 className="font-heading text-lg font-medium text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-xs font-medium tracking-widest text-accent">
                  {member.role.toUpperCase()}
                </p>

                <div className="my-4 border-t border-border" />

                <p className="font-sans text-sm leading-relaxed text-foreground-secondary">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center md:p-8">
          <div className="relative">
            <h4 className="font-heading text-xl font-medium leading-snug text-foreground">
              Great projects start with
              <br />
              great collaboration.
            </h4>
            <p className="mt-1 text-sm text-foreground-secondary">
              Let&apos;s build something incredible together.
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
