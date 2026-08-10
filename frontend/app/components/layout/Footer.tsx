import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "SERVICES",
    links: [
      { label: "Software Development", href: "#" },
      { label: "UI/UX Design", href: "#" },
      { label: "Cloud Solutions", href: "#" },
      { label: "SaaS Products", href: "#" },
      { label: "Mobile Development", href: "#" },
      { label: "AI Integration", href: "#" },
    ],
  },
  {
    title: "WORK",
    links: [
      { label: "Web Applications", href: "#" },
      { label: "Mobile Apps", href: "#" },
      { label: "SaaS Platforms", href: "#" },
      { label: "Enterprise Systems", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "All Projects", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Corvus", href: "#" },
      { label: "Our Mission", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
];

const contactPoints = [
  {
    icon: <Mail className="h-4 w-4" strokeWidth={1.5} />,
    value: "hello@corvus.studio",
  },
  {
    icon: <Phone className="h-4 w-4" strokeWidth={1.5} />,
    value: "+20 101 234 5678",
  },
  {
    icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />,
    value: "Cairo, Egypt",
  },
];

const socials = [
  {
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
    href: "#",
    label: "GitHub",
  },
  {
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm0-22C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.119 6.946c-.31.195-1.282.546-1.668.566-.386.019-2.312-.082-3.026-.177-.714-.096-2.593 1.922-2.813 2.344-.221.423-1.329 2.542-1.369 2.71-.04.169.453.651.569.781.116.131.637.531.761.565.124.034.555-.214.679-.289.124-.075 2.332-1.309 2.506-1.576.174-.267.236-.441.197-.599-.039-.158-.216-.363-.346-.48-.131-.117-.406-.349-.438-.424-.031-.075.002-.123.075-.148.073-.025.973-.405 1.737-.573.765-.168 1.315-.114 1.509-.048.194.066.269.206.256.373-.013.167-.179.795-.283 1.128-.104.333-.668 2.343-.743 2.632-.075.289.352.563.687.634.335.071 3.047.858 3.431.893.384.035.791-.179.882-.516.091-.337 1.023-4.748.981-5.121-.042-.373-.544-.687-1.086-.845z"/></svg>,
    href: "#",
    label: "Dribbble",
  },
  {
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    href: "#",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-background bg-noise pt-12 pb-16 md:pt-16 md:pb-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 border-t border-border pt-14">
          {/* Brand — 3 columns */}
          <div className="lg:col-span-3">
            <Image
              src="/logo.png"
              alt="Corvus"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <p className="font-heading mt-5 text-lg font-medium tracking-[0.3em] text-foreground sm:text-xl">
              CORVUS
            </p>
            <p className="mt-1.5 font-mono text-xs font-medium tracking-[0.2em] text-accent">
              SOFTWARE ENGINEERING STUDIO
            </p>
            <p className="font-sans mt-5 max-w-xs text-sm leading-relaxed text-foreground-secondary sm:max-w-sm">
              We design and build digital systems, applications, and experiences
              that drive real impact.
            </p>
          </div>

          {/* Link columns — 2 columns each (total 6 columns) */}
          {columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-foreground">
                {column.title}
              </p>
              <div className="mt-4 mb-5 border-t border-border" />
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-foreground-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get in touch — 3 columns */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-foreground">
              GET IN TOUCH
            </p>
            <div className="mt-4 mb-5 border-t border-border" />
            <ul className="flex flex-col gap-3.5">
              {contactPoints.map((point) => (
                <li
                  key={point.value}
                  className="flex items-center gap-2.5 text-sm text-foreground-secondary"
                >
                  <span className="text-foreground-secondary">
                    {point.icon}
                  </span>
                  {point.value}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-xs font-medium tracking-[0.2em] text-foreground-secondary">
              FOLLOW US
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center border border-border text-foreground-secondary transition-colors hover:border-border-strong hover:bg-surface hover:text-foreground"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


      </Container>
    </footer>
  );
}
