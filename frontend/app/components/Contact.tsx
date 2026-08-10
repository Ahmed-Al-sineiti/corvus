"use client";

import Container from "./layout/Container";
import { useState, FormEvent, ReactNode, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  PenLine,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
} from "lucide-react";
const MESSAGE_LIMIT = 1000;

interface ContactPoint {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}

const contactPoints: ContactPoint[] = [
  {
    icon: <Mail className="h-4 w-4" strokeWidth={1.5} />,
    label: "Email Us",
    value: "hello@corvus.studio",
    helper: "We typically reply within 24 hours",
  },
  {
    icon: <Phone className="h-4 w-4" strokeWidth={1.5} />,
    label: "Call Us",
    value: "+20 101 234 5678",
    helper: "Sun – Thu, 10:00 AM – 6:00 PM (GMT+2)",
  },
  {
    icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />,
    label: "Our Studio",
    value: "Cairo, Egypt",
    helper: "Available for in-person meetings",
  },
];

const socials = [
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "#",
    label: "Twitter",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href: "#",
    label: "GitHub",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm0-22C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.119 6.946c-.31.195-1.282.546-1.668.566-.386.019-2.312-.082-3.026-.177-.714-.096-2.593 1.922-2.813 2.344-.221.423-1.329 2.542-1.369 2.71-.04.169.453.651.569.781.116.131.637.531.761.565.124.034.555-.214.679-.289.124-.075 2.332-1.309 2.506-1.576.174-.267.236-.441.197-.599-.039-.158-.216-.363-.346-.48-.131-.117-.406-.349-.438-.424-.031-.075.002-.123.075-.148.073-.025.973-.405 1.737-.573.765-.168 1.315-.114 1.509-.048.194.066.269.206.256.373-.013.167-.179.795-.283 1.128-.104.333-.668 2.343-.743 2.632-.075.289.352.563.687.634.335.071 3.047.858 3.431.893.384.035.791-.179.882-.516.091-.337 1.023-4.748.981-5.121-.042-.373-.544-.687-1.086-.845z" />
      </svg>
    ),
    href: "#",
    label: "Dribbble",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: "#",
    label: "Instagram",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAlert = (type: "success" | "error", message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAlert({ type, message });
    timerRef.current = setTimeout(() => setAlert(null), 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setName("");
      setEmail("");
      setMessage("");
      showAlert(
        "success",
        "Your message has been sent. We'll get back to you within 24 hours."
      );
    } catch (error) {
      console.error("Error sending message:", error);
      showAlert(
        "error",
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background bg-noise py-8 md:py-10"
    >
      <style>{`
        @keyframes alert-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12">
          {/* Left column — 5 columns */}
          <div className="lg:col-span-5">
            <h2 className="font-heading text-5xl font-medium leading-[0.86] tracking-tight sm:text-6xl lg:text-7xl">
              Let&apos;s build
              <br />
              something
              <br />
              extraordinary.
            </h2>
            <p className="font-sans mt-5 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              Have a project in mind or want to collaborate? We&apos;d love to
              hear from you.
            </p>

            {/* Contact points */}
            <div className="mt-10 flex flex-col">
              {contactPoints.map((point, i) => (
                <div
                  key={point.label}
                  className={`flex items-start gap-4 py-4 ${
                    i !== contactPoints.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-border text-foreground-secondary transition-colors duration-300 hover:border-accent/50 hover:text-accent">
                    {point.icon}
                  </div>
                  <div>
                    <p className="font-sans text-xs text-foreground-secondary">
                      {point.label}
                    </p>
                    <p className="font-heading text-base font-medium text-foreground">
                      {point.value}
                    </p>
                    <p className="font-sans mt-0.5 text-xs text-foreground-secondary">
                      {point.helper}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-10">
              <p className="font-mono text-xs font-medium tracking-[0.2em] text-foreground-secondary">
                FOLLOW US
              </p>
              <div className="mt-4 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground-secondary transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:text-accent"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — form — 7 columns */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 h-fit rounded-3xl border border-[#2b2b2b] bg-[#0a0a0a] p-6 shadow-2xl transition-colors duration-300 md:p-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary"
                >
                  YOUR NAME
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#0f0f0f] px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]">
                  <User
                    className="h-4 w-4 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                    strokeWidth={1.5}
                  />
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary"
                >
                  EMAIL ADDRESS
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#2b2b2b] bg-[#0f0f0f] px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]">
                  <Mail
                    className="h-4 w-4 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                    strokeWidth={1.5}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary"
              >
                MESSAGE
              </label>
              <div className="mt-2 flex items-start gap-3 rounded-2xl border border-[#2b2b2b] bg-[#0f0f0f] px-4 py-4 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]">
                <PenLine
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                  strokeWidth={1.5}
                />
                <textarea
                  id="message"
                  rows={5}
                  maxLength={MESSAGE_LIMIT}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                />
              </div>
              <p
                className={`mt-2 text-right font-mono text-xs transition-colors duration-300 ${
                  message.length >= MESSAGE_LIMIT
                    ? "text-red-400"
                    : message.length >= MESSAGE_LIMIT * 0.8
                      ? "text-accent"
                      : "text-foreground-secondary"
                }`}
              >
                {message.length} / {MESSAGE_LIMIT}
              </p>
            </div>

            {/* Alert */}
            {alert && (
              <div
                role="alert"
                aria-live="assertive"
                className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3.5 [animation:alert-in_0.3s_ease] ${
                  alert.type === "success"
                    ? "border-accent/30 bg-accent/10"
                    : "border-red-500/40 bg-red-500/10"
                }`}
              >
                {alert.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-mono text-[11px] font-medium tracking-[0.2em] ${
                      alert.type === "success"
                        ? "text-accent"
                        : "text-red-400"
                    }`}
                  >
                    {alert.type === "success" ? "SUCCESS" : "ERROR"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {alert.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAlert(null)}
                  aria-label="Dismiss alert"
                  className="shrink-0 rounded-full p-1 text-foreground-secondary transition-colors duration-200 hover:bg-white/5 hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-[#e6e6e6] hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

      </Container>
    </section>
  );
}
