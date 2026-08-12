"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 bg-transparent font-sans">
      <Container>
        <nav className="flex items-center justify-between gap-6 py-4 lg:h-[104px] lg:py-5">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Corvus home">
            <Image
              src="/corvus.png"
              alt="corvus logo"
              width={96}
              height={64}
              className="h-16 w-auto lg:h-[64px]"
            />
          </Link>

          {/* Right side: links + CTA (desktop) */}
          <div className="hidden items-center gap-8 lg:flex">
            {/* Nav links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="#contact"
              className="rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-[#4a4a4a] hover:bg-[#242424]"
            >
              Start a Project
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-8 h-8 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col gap-4 border-t border-border pb-6 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-fit rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-foreground"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}