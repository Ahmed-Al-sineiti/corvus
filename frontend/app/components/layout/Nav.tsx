"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      id="nav"
      className={`relative z-50 font-sans transition-colors duration-300 ${menuOpen ? "text-foreground" : "text-foreground-secondary"}`}
    >
      {/* Full-screen backdrop blur overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 transition-all duration-500 lg:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        onClick={() => setMenuOpen(false)}
      />
      <Container className="relative z-10">
        <nav>
          <div className="flex items-center justify-between gap-6 py-4 md:py-5">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/">
                <Image
                  src="/logocor.svg"
                  height={64}
                  width={143}
                  className="h-[48px] w-auto object-contain sm:h-[56px] lg:h-[64px]"
                  alt="Corvus"
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
                    className="relative group text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-foreground origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-5 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-[#242424] hover:border-[#4a4a4a] hover:scale-105 active:scale-95"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile right side: Quick links + Hamburger */}
            <div className="flex lg:hidden items-center gap-1 sm:gap-3">
              {/* Quick access buttons */}
              <div
                className={`flex items-center gap-3 sm:gap-4 overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? "max-w-0 opacity-0 pointer-events-none" : "max-w-[200px] opacity-100 mr-2"}`}
              >
                <Link
                  href="#services"
                  className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Services
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Contact
                </Link>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col items-center justify-center w-10 h-10 gap-[6px] shrink-0"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
                />
                <span
                  className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out border-t border-white/10 ${menuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col items-center justify-center gap-8 px-6 min-h-[calc(100vh-100px)] pb-20">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="relative group text-xl font-medium text-foreground-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-foreground origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex w-full max-w-[280px] items-center justify-center rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-6 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:bg-[#242424] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
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
