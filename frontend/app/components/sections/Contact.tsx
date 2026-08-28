"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PhoneCallIcon, ShieldCheckIcon, X } from "lucide-react";

export default function ContactSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // إغلاق النافذة العائمة عند الضغط خارجها في الموبايل
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          message,
          ServiceType: selectedServices.join(", "),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong!");
      } else {
        alert("Message sent successfully!");

        setEmail("");
        setFirstName("");
        setLastName("");
        setMessage("");
        setSelectedServices([]);
      }
    } catch (error) {
      alert("Failed to connect to the server.");
      console.error(error);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-black min-h-screen py-20 px-6 md:px-12 lg:px-24 font-sans text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* العمود الأيسر */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight mb-6">
              Let&apos;s get in touch
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
              Choosing the right technical partner is the key to shaping the
              future success of your software product. Let&apos;s discuss how we
              can bring your project to life today.
            </p>

            {/* Direct Booking Card */}
            <div className="group relative flex items-center justify-between border border-zinc-800/80 bg-zinc-950/50 rounded-xl p-4 mb-12 max-w-md hover:border-zinc-600 transition-all duration-300">
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <PhoneCallIcon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-sans text-white">
                    Book a Whatsapp call ?
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Send a message and we will reply quickly.
                  </p>
                </div>
              </div>
              <Link
                href="https://wa.me/+201006560891"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-black bg-white hover:bg-zinc-200 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ml-3"
              >
                Chat now
              </Link>
            </div>

            <div>
              <h3 className="text-xs tracking-widest text-zinc-500 uppercase font-sans mb-8">
                What happens next
              </h3>
              <div className="space-y-8 max-w-md">
                {[
                  {
                    num: "01",
                    title: "Discovery & Analysis",
                    desc: "We review your product vision, technical scope, and core business objectives.",
                  },
                  {
                    num: "02",
                    title: "Architecture & Strategy",
                    desc: "Our engineering team formulates a tailored technical roadmap and stack recommendation.",
                  },
                  {
                    num: "03",
                    title: "Proposal & Execution Plan",
                    desc: "You receive a comprehensive project proposal with clear scope, timelines, and estimates.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group/step">
                    <span className="flex-shrink-0 font-sans text-xs text-zinc-500 pt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-sans text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيمن */}
        <div className="flex flex-col justify-start pt-2">
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-xs font-sans tracking-wider text-zinc-400 uppercase"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Type your first name"
                  className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-xs font-sans tracking-wider text-zinc-400 uppercase"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type your last name"
                  className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative group">
              <label
                htmlFor="email"
                className="text-xs font-sans tracking-wider text-zinc-400 uppercase"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs font-sans tracking-wider text-zinc-400 uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                placeholder="Tell us more about your project"
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 pb-12 pt-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300 resize-none"
              />
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                Services you&apos;re interested in
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "UI/UX Design",
                  "Web Development",
                  "SEO Optimization",
                  "Maintenance",
                ].map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`text-xs px-4 py-2 rounded-full transition-all duration-300 border ${
                        isSelected
                          ? "bg-white text-black border-white font-medium scale-105"
                          : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 bg-zinc-950/30"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* قسم الإرسال مع Popover يفتح للأسفل ويعمل على الهواتف */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-900">
              <p className="text-zinc-500 text-xs">
                By clicking &quot;Send Message&quot; you accept our{" "}
                <span
                  className="relative inline-block group/popover"
                  ref={popoverRef}
                >
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="text-zinc-300 underline underline-offset-4 hover:text-white cursor-pointer transition-colors focus:outline-none"
                  >
                    Privacy Policy
                  </button>

                  {/* النافذة العائمة للأولويات (Hover للماوس + Click للموبايل + تفتح للأسفل) */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 sm:w-80 p-4 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl transition-all duration-200 z-50 ${
                      isPopoverOpen
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none group-hover/popover:opacity-100 group-hover/popover:visible group-hover/popover:pointer-events-auto"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                        <h5 className="text-xs font-semibold text-white">
                          Privacy Policy Summary
                        </h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPopoverOpen(false)}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                      We collect your name, email, and message details solely to
                      respond to your inquiry and plan your project.
                    </p>
                    <ul className="text-[10px] text-zinc-500 space-y-1 list-disc list-inside">
                      <li>No third-party marketing sharing</li>
                      <li>Encrypted & secure data handling</li>
                      <li>Request data removal anytime</li>
                    </ul>

                    {/* سهم التوجيه إلى الأعلى (لأن النافذة تفتح للأسفل) */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-zinc-900/95"></div>
                  </div>
                </span>
              </p>

              <button
                type="submit"
                className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
