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
    <header className="relative z-20 bg-transparent font-sans text-foreground-secondary">
      <Container>
        <nav>
          <div className="flex items-center justify-between gap-6 py-4 md:py-5">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/">
                <Image
                  src="/corvus.png"
                  height={76}
                  width={143}
                  className="h-[48px] w-auto object-contain sm:h-[56px] lg:h-[64px]"
                  alt="corvus logo"
                />
              </Link>
            </div>

            {/* Right side: links + CTA (desktop) */}
            <div className="hidden lg:flex items-center gap-8">
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
                className="rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#242424] hover:border-[#4a4a4a]"
              >
                Start a Project
              </Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex lg:hidden flex-col items-center justify-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col gap-4 pb-6 pt-4 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
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
        </nav>
      </Container>
    </header>
  );
}
