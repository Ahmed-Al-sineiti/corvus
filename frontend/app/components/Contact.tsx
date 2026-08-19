"use client";

import Container from "./layout/Container";
import { useState, FormEvent, ReactNode, useEffect, useRef } from "react";
import { CheckCircle2, XCircle, Loader2, X, ChevronDown } from "lucide-react";
import TextReveal from "./ui/TextReveal";
import ScrollReveal from "./ui/ScrollReveal";

const MESSAGE_LIMIT = 1000;

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    email?: string;
    message?: string;
  }>({});
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
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!email.trim()) newErrors.email = "Enter a valid email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!message.trim()) newErrors.message = "Please enter a message";

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
          firstName,
          lastName,
          email,
          company,
          phone,
          budget,
          message,
          newsletter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setBudget("");
      setMessage("");
      setNewsletter(false);

      showAlert(
        "success",
        "Your message has been sent. We'll get back to you soon.",
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
      className="relative overflow-hidden bg-[#050505] text-[#F5F5F3] py-24 sm:py-32"
    >
      <style>{`
        @keyframes alert-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Container className="relative z-10 w-full max-w-[1400px] px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14 sm:mb-20 lg:mb-28">
          <TextReveal
            as="h1"
            className="font-sans text-5xl font-normal tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Let&apos;s Connect!
          </TextReveal>
          <TextReveal
            as="p"
            delay={200}
            className="font-sans mt-4 text-xl text-[#9AA0A8] sm:text-2xl font-light"
          >
            Use the form below, or send us an email
          </TextReveal>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
          {/* Left Title */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            className="w-full lg:w-[30%]"
          >
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Contact us
            </h2>
          </ScrollReveal>

          {/* Right Form */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            className="w-full lg:w-[65%]"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-10"
            >
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold text-white/90"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName)
                        setErrors((prev) => ({
                          ...prev,
                          firstName: undefined,
                        }));
                    }}
                    placeholder="Enter first name"
                    className={`w-full border-b bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] focus:outline-none transition-colors ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-white/10 focus:border-white"
                    }`}
                  />
                  {errors.firstName && (
                    <span className="text-red-400 text-xs">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-semibold text-white/90"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Company */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-white/90"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="Enter email"
                    className={`w-full border-b bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] focus:outline-none transition-colors ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10 focus:border-white"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="company"
                    className="text-xs font-semibold text-white/90"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name or website"
                    className="w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Phone Number & Budget Range */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold text-white/90"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="124-456-7890"
                    className="w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="budget"
                    className="text-xs font-semibold text-white/90"
                  >
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full appearance-none border-b border-white/10 bg-transparent pb-3 text-sm text-white focus:border-white focus:outline-none transition-colors cursor-pointer [&>option]:bg-[#0A0A0C] [&>option]:text-white"
                    >
                      <option value="" disabled hidden>
                        Please select...
                      </option>
                      <option value="5k-10k">$5k - $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k+">$50k+</option>
                    </select>
                    <ChevronDown className="absolute right-0 bottom-3 h-4 w-4 pointer-events-none text-white/70" />
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-white/90"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  maxLength={MESSAGE_LIMIT}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Tell us about your project. What problems can we help you solve?"
                  className={`w-full border-b bg-transparent pb-3 text-sm text-white placeholder:text-[#6C7178] resize-none focus:outline-none transition-colors ${
                    errors.message
                      ? "border-red-500"
                      : "border-white/10 focus:border-white"
                  }`}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs">{errors.message}</span>
                )}
              </div>

              {/* Checkbox and Submit Button Footer */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-transparent text-white focus:ring-0 cursor-pointer accent-white"
                  />
                  <span className="text-xs text-[#9AA0A8]">
                    Subscribe to newsletter
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-medium text-black transition-all hover:bg-white/90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 self-end sm:self-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Submit Inquiry
                      <span className="text-sm">↗</span>
                    </>
                  )}
                </button>
              </div>

              {/* Alert */}
              {alert && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 [animation:alert-in_0.3s_ease] ${
                    alert.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {alert.type === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider">
                      {alert.type === "success" ? "SUCCESS" : "ERROR"}
                    </p>
                    <p className="mt-1 text-xs">{alert.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAlert(null)}
                    aria-label="Dismiss alert"
                    className="shrink-0 rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
