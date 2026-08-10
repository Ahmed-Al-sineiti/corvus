"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 bg-transparent font-sans text-foreground-secondary">
      <Container>
        <nav>
          <div className="flex justify-between gap-12 items-center max-sm:py-3 sm:py-4 md:pt-[30px] md:pb-0">
            <div>
              <Link href="/">
                <Image
                  src="/corvus.png"
                  height={140}
                  width={140}
                  className="max-sm:h-[100px] max-sm:w-[100px] sm:h-[120px] sm:w-[120px] md:h-[180px] md:w-[180px]"
                  alt="corvus logo"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center max-lg:gap-4 lg:gap-6 xl:gap-8">
              <Link
                href="#"
                className="hover:text-foreground active:text-accent transition-all duration-250 max-lg:text-sm lg:text-base"
              >
                Services
              </Link>
              <Link
                href="#"
                className="hover:text-foreground active:text-accent transition-all duration-250 max-lg:text-sm lg:text-base"
              >
                Projects
              </Link>
              <Link
                href="#"
                className="hover:text-foreground active:text-accent transition-all duration-250 max-lg:text-sm lg:text-base"
              >
                Testimonials
              </Link>
              <Link
                href="#"
                className="hover:text-foreground active:text-accent transition-all duration-250 max-lg:text-sm lg:text-base"
              >
                Team Work
              </Link>
              <Link
                href="#"
                className="hover:text-foreground active:text-accent transition-all duration-250 max-lg:text-sm lg:text-base"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-3 border border-white/20 bg-transparent max-sm:px-3 max-sm:py-1.5 max-sm:text-[10px] sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm font-medium text-white transition-all duration-300 hover:border-white/50"
              >
                Create a Project
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex md:hidden flex-col items-center justify-center w-8 h-8 gap-1"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
                />
                <span
                  className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
                />
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col gap-4 pb-6 pt-4 border-t border-white/10">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-foreground active:text-accent transition-all duration-250 text-sm"
              >
                Services
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-foreground active:text-accent transition-all duration-250 text-sm"
              >
                Projects
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-foreground active:text-accent transition-all duration-250 text-sm"
              >
                Testimonials
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-foreground active:text-accent transition-all duration-250 text-sm"
              >
                Team Work
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-foreground active:text-accent transition-all duration-250 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
