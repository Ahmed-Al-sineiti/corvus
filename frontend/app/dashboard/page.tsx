import Link from "next/link";
import Container from "../components/layout/Container";
import { StaggerGroup, StaggerItem } from "../components/StaggerGroup";
import {
  Inbox,
  Users,
  Mail,
  Clock,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

const stats = [
  {
    icon: <Inbox className="h-5 w-5" strokeWidth={1.5} />,
    label: "TOTAL MESSAGES",
    value: "View inbox",
  },
  {
    icon: <Users className="h-5 w-5" strokeWidth={1.5} />,
    label: "CLIENTS",
    value: "Coming soon",
  },
  {
    icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
    label: "EMAILS",
    value: "Coming soon",
  },
  {
    icon: <Clock className="h-5 w-5" strokeWidth={1.5} />,
    label: "REPLY TIME",
    value: "< 24h",
  },
];

export default function DashboardPage() {
  return (
    <section className="relative flex-1 overflow-hidden bg-background bg-noise py-12 md:py-16">
      <Container className="relative z-10">
        <div className="mb-8 flex items-baseline gap-2 font-mono">
          <span className="text-sm tracking-[0.7px] text-white">CORVUS</span>
          <span className="text-xs font-medium tracking-[0.2em] text-accent">
            DASHBOARD
          </span>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Welcome back.
            </h1>
            <p className="font-sans mt-4 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base">
              Manage your studio&apos;s inbox and stay on top of incoming
              messages.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-foreground-secondary">
            <LayoutDashboard className="h-4 w-4 text-accent" strokeWidth={1.5} />
            OVERVIEW
          </div>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
                <div className="flex h-11 w-11 items-center justify-center border border-border text-accent">
                  {stat.icon}
                </div>
                <p className="font-mono mt-5 text-[11px] font-medium tracking-[0.2em] text-foreground-secondary">
                  {stat.label}
                </p>
                <p className="font-heading mt-2 text-2xl font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Link
          href="/dashboard/messages"
          className="group relative mt-10 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/50 sm:flex-row sm:items-center"
        >
          <div className="relative">
            <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent">
              INBOX
            </p>
            <h2 className="font-heading mt-2 text-2xl font-medium text-foreground">
              View messages
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Fetch and read all messages received through the contact form.
            </p>
          </div>
          <div className="relative inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-white">
            Open Inbox
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </div>
        </Link>
      </Container>
    </section>
  );
}
