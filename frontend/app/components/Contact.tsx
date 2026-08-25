"use client";

import { useState } from "react";
import Link from "next/link";
import {PhoneCallIcon} from "lucide-react";

export default function ContactSection() {
  // حالة لحفظ الخدمات المحددة
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <section id="contact" className="w-full bg-black min-h-screen py-20 px-6 md:px-12 lg:px-24 font-sans text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* العمود الأيسر: النصوص والخطوات كارد الحجز */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Let&apos;s get in touch
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
              Choosing the right technical partner is the key to shaping the
              future success of your software product. Let&apos;s discuss how we
              can bring your project to life today.
            </p>

            {/* كارت حجز مكالمة مباشرة (Direct Booking Card) مع لمسة نبض حية */}
            <div className="group relative flex items-center justify-between border border-zinc-800/80 bg-zinc-950/50 rounded-xl p-4 mb-12 max-w-md hover:border-zinc-600 transition-all duration-300">
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  {/* نقطة حالة نبضية */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                 <PhoneCallIcon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
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

            {/* مراحل العمل الاحترافية (What happens next?) */}
            <div>
              <h3 className="text-xs tracking-widest text-zinc-500 uppercase font-mono mb-8">
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
                    <span className="flex-shrink-0 font-mono text-xs text-zinc-500 pt-0.5 transition-colors group-hover/step:text-white">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1 transition-colors group-hover/step:text-zinc-200">
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

        {/* العمود الأيمن: نموذج التواصل التفاعلي */}
        <div className="flex flex-col justify-start pt-2">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            {/* الإيميل */}
            <div className="flex flex-col gap-2 relative group">
              <label
                htmlFor="email"
                className="text-xs font-mono tracking-wider text-zinc-400 uppercase"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Type your email"
                className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
              />
            </div>

            {/* الاسم الأول والأخير */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-xs font-mono tracking-wider text-zinc-400 uppercase"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Type your first name"
                  className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-xs font-mono tracking-wider text-zinc-400 uppercase"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Type your last name"
                  className="w-full bg-transparent border-b border-zinc-800 pb-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300"
                />
              </div>
            </div>

            {/* الرسالة */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs font-mono tracking-wider text-zinc-400 uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Tell us more about your project"
                rows={1}
                className="w-full bg-transparent border-b border-zinc-800 pb-12 pt-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white transition-all duration-300 resize-none"
              />
            </div>

            {/* الخدمات المطلوبة (أزرار تفاعلية للتحديد Multi-select) */}
            <div className="space-y-4 pt-2">
              <p className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                Services you&apos;re interested in
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "UI/UX Design",
                  "Web Development",
                  "Mobile Apps",
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

            {/* زر الإرسال والموافقة */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-900">
              <p className="text-zinc-500 text-xs">
                By clicking &quot;Send Message&quot; you accept our{" "}
                <Link
                  href="#"
                  className="text-zinc-300 underline underline-offset-4 hover:text-white"
                >
                  Privacy Policy
                </Link>
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
