import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex-1 overflow-hidden bg-background py-12 md:py-16">
      <div className="mx-auto w-full max-w-md px-4 text-center">
        <p className="font-mono text-sm tracking-[0.7px] text-accent">404</p>
        <h1 className="mt-4 font-heading text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-foreground-secondary sm:text-base">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[0.99] hover:bg-[#e6e6e6]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
