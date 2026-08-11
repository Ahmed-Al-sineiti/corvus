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
        "Your message has been sent. We'll get back to you within 24 hours.",
      );
    } catch (error) {
      console.error("Error sending message:", error);
      showAlert(
        "error",
        "Something went wrong while sending your message. Please try again.",
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
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-border text-foreground-secondary rounded-[10px] transition-colors duration-300 hover:border-white/50 hover:text-white">
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
                      alert.type === "success" ? "text-accent" : "text-red-400"
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
