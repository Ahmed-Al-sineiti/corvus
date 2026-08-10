import Container from "./layout/Container";
import { ReactNode } from "react";
import { Quote, Star, UserRound } from "lucide-react";

interface Testimonial {
  index: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatar?: ReactNode;
}

const testimonials: Testimonial[] = [
  {
    index: "01",
    quote:
      "Corvus took a vague idea and turned it into a production-ready platform in weeks, not months. Their communication was as strong as their code.",
    name: "Sarah Whitfield",
    role: "Founder & CEO",
    company: "Nexora",
    rating: 5,
  },
  {
    index: "02",
    quote:
      "What impressed me most was how deeply they understood our users. The redesign didn't just look better, it measurably improved conversion.",
    name: "Daniel Reyes",
    role: "Head of Product",
    company: "Moveo",
    rating: 5,
  },
  {
    index: "03",
    quote:
      "We needed infrastructure that could scale overnight, literally. The team delivered a system that's held up under every spike since launch.",
    name: "Amina Farouk",
    role: "CTO",
    company: "CloudWave",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-transparent text-border-strong"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-background bg-noise py-12 md:py-16">
      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-10 border-b border-border pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              TESTIMONIALS
            </div>
            <h2 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Trusted by teams
              <br />
              who <span className="text-accent">ship.</span>
            </h2>
            <p className="font-sans mt-5 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base">
              Don&apos;t just take our word for it. Here&apos;s what founders
              and product leaders say about working with us.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
            <p className="font-sans max-w-xs text-sm leading-relaxed text-foreground-secondary">
              Every project ends the same way: a relationship worth continuing,
              and results worth talking about.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
            >
              View Our Work
            </a>
          </div>
        </div>

        {/* Testimonials grid — 12-column grid system */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.index}
              className="lg:col-span-4 group relative flex flex-col justify-between border border-border bg-transparent p-8 transition-colors hover:border-border-strong hover:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-widest text-accent">
                    {t.index}
                  </span>
                  <Quote
                    className="h-6 w-6 text-foreground-secondary/40"
                    strokeWidth={1}
                  />
                </div>

                <p className="font-sans mt-6 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8">
                <div className="mb-5 border-t border-border" />
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background-secondary text-foreground-secondary">
                    {t.avatar ?? (
                      <UserRound className="h-5 w-5" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading truncate text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="font-sans truncate text-xs text-foreground-secondary">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Stars rating={t.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="relative mt-5 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center">
          <div className="relative">
            <h4 className="font-heading text-xl font-medium text-foreground">
              Ready to become our next success story?
            </h4>
            <p className="mt-1 text-sm text-foreground-secondary">
              Let&apos;s talk about what we can build together.
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
