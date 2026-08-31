import Image from "next/image";
import Link from "next/link";

// فوتر بسيط بصف واحد (زي GitHub) — لوجو + حقوق النشر على اليسار، ولينكات الموقع على اليمين
const FOOTER_LINKS = [
  { label: "Main", href: "#nav" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1912px] px-7 py-10 lg:px-[124px]">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="Corvus"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
            />
            <span className="font-sans text-sm text-foreground-secondary">
              &copy; {year} Corvus. All rights reserved.
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
