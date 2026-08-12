"use client";

import Container from "./layout/Container";
import { useState, FormEvent, ReactNode, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  PenLine,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
} from "lucide-react";
import TextReveal from "./ui/TextReveal";
import ScrollReveal from "./ui/ScrollReveal";
const MESSAGE_LIMIT = 1000;

interface ContactPoint {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}

const contactPoints: ContactPoint[] = [
  {
    icon: <Mail className="h-4 w-4" strokeWidth={1} />,
    label: "Email Us",
    value: "hello@corvus.studio",
    helper: "We typically reply within 24 hours",
  },
  {
    icon: <Phone className="h-4 w-4" strokeWidth={1} />,
    label: "Call Us",
    value: "+20 101 234 5678",
    helper: "Sun – Thu, 10:00 AM – 6:00 PM (GMT+2)",
  },
  {
    icon: <MapPin className="h-4 w-4" strokeWidth={1} />,
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
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
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

    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Please share your full name";
    if (!email.trim()) newErrors.email = "Enter a valid email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!message.trim()) newErrors.message = "A sentence or two, please";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

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
      className="relative overflow-hidden bg-background bg-noise py-32"
    >
      <style>{`
        @keyframes alert-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Container className="relative z-10 w-full max-w-[1752px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full h-auto lg:h-[578px] gap-12 lg:gap-[51px]">
          {/* Left column */}
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col justify-center w-full lg:w-[40%]">
            <TextReveal as="h2" className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] sm:text-5xl">
              Let&apos;s build
              <br />
              something extraordinary.
            </TextReveal>
            <TextReveal as="p" delay={300} className="font-sans mt-5 max-w-md text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              Have a project in mind or want to collaborate? We&apos;d love to
              hear from you.
            </TextReveal>

            {/* Contact points */}
            <div className="mt-10 flex flex-col gap-4">
              {contactPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 py-2"
                >
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-white/[0.08] text-foreground-secondary rounded-[10px] transition-colors duration-300 hover:border-white/50 hover:text-white">
                    {point.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-sans text-xs text-foreground-secondary">
                      {point.label}
                    </p>
                    <p className="font-heading text-base font-medium text-foreground">
                      {point.value}
                    </p>
                    <p className="font-sans text-xs text-foreground-secondary">
                      {point.helper}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right column — form */}
          <ScrollReveal direction="up" delay={0.3} className="relative w-full lg:w-[55%] h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative z-10 flex flex-col w-full h-full rounded-3xl border border-[#2b2b2b] bg-[#0a0a0a] p-6 md:p-10 lg:p-12 xl:p-[94px] shadow-2xl transition-colors duration-300 gap-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary uppercase"
                  >
                    Your Name
                  </label>
                  <div className={`flex items-center gap-3 rounded-2xl border ${errors.name ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-[#2b2b2b] bg-[#0f0f0f]'} px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]`}>
                    <User
                      className="h-4 w-4 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                      strokeWidth={1}
                    />
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                    />
                  </div>
                  {errors.name && <span className="text-red-500 text-[11px] font-medium">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary uppercase"
                  >
                    Email Address
                  </label>
                  <div className={`flex items-center gap-3 rounded-2xl border ${errors.email ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-[#2b2b2b] bg-[#0f0f0f]'} px-4 py-3.5 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]`}>
                    <Mail
                      className="h-4 w-4 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                      strokeWidth={1}
                    />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Enter your email"
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                    />
                  </div>
                  {errors.email && <span className="text-red-500 text-[11px] font-medium">{errors.email}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="message"
                  className="font-mono text-xs font-medium tracking-[0.15em] text-foreground-secondary uppercase"
                >
                  Message
                </label>
                <div className={`flex flex-1 items-start gap-3 rounded-2xl border ${errors.message ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-[#2b2b2b] bg-[#0f0f0f]'} px-4 py-4 transition-all duration-300 hover:border-[#3b3b3b] hover:bg-white/[0.02] focus-within:border-[#555] focus-within:bg-white/[0.03]`}>
                  <PenLine
                    className="mt-0.5 h-4 w-4 shrink-0 text-foreground-secondary/70 transition-colors duration-300 focus:text-white"
                    strokeWidth={1}
                  />
                  <textarea
                    id="message"
                    maxLength={MESSAGE_LIMIT}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell us about your project..."
                    className="w-full h-full resize-none bg-transparent text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none"
                  />
                </div>
                <div className="flex justify-between w-full">
                  {errors.message ? (
                    <span className="text-red-500 text-[11px] font-medium">{errors.message}</span>
                  ) : <span />}
                  <p
                    className={`font-mono text-[10px] transition-colors duration-300 ${message.length >= MESSAGE_LIMIT
                      ? "text-red-400"
                      : message.length >= MESSAGE_LIMIT * 0.8
                        ? "text-accent"
                        : "text-[#555555]"
                      }`}
                  >
                    {message.length} / {MESSAGE_LIMIT}
                  </p>
                </div>
              </div>

              {/* Alert */}
              {alert && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 [animation:alert-in_0.3s_ease] ${alert.type === "success"
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
                      className={`font-mono text-[11px] font-medium tracking-[0.2em] ${alert.type === "success" ? "text-accent" : "text-red-400"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto flex w-full items-center justify-center rounded-2xl bg-white py-4 text-sm font-medium text-black transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
