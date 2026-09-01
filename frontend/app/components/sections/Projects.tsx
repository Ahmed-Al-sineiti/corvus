"use client";

import { useRef } from "react";
import Container from "../layout/Container";
import TextReveal from "../ui/TextReveal";

const VIDEOS = [
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/takya.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/kingsfield(1).mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/Tabarak_Compressed.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/compressed_output.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/pharma.mp4",
];

export default function Projects() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const setRowSpeed = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    speed: number,
  ) => {
    if (!containerRef.current) return;
    if (typeof containerRef.current.getAnimations === "function") {
      const animations = containerRef.current.getAnimations({ subtree: true });
      animations.forEach((anim) => {
        anim.playbackRate = speed;
      });
    }
  };

  const renderVideoItem = (src: string, key: string) => (
    <div
      key={key}
      className="group relative h-[200px] w-[320px] shrink-0 overflow-hidden rounded-[16px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px]"
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-grayscale transition-all duration-500 group-hover:bg-transparent group-hover:backdrop-grayscale-0 pointer-events-none" />
    </div>
  );

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-32"
    >
      <Container className="relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="font-heading text-4xl font-sans leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
            >
              Selected{"\n"}Works
            </TextReveal>
            <TextReveal
              as="p"
              delay={300}
              className="font-sans mt-5 text-sm leading-relaxed text-[#737373] sm:text-base xl:text-lg"
            >
              A showcase of our recent digital experiences. We partner with
              forward-thinking brands to build products that matter.
            </TextReveal>
          </div>
        </div>
      </Container>

      <div className="relative w-full overflow-hidden flex flex-col gap-4 sm:gap-8">
        <style>{`
          @keyframes marquee-right {
            from {
              transform: translateX(calc(-100% - var(--marquee-gap)));
            }
            to {
              transform: translateX(0);
            }
          }
          @keyframes marquee-left {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-100% - var(--marquee-gap)));
            }
          }
          .marquee-wrapper {
            --marquee-gap: 1rem;
            display: flex;
            width: max-content;
            user-select: none;
            gap: var(--marquee-gap);
          }
          @media (min-width: 640px) {
            .marquee-wrapper {
              --marquee-gap: 2rem;
            }
          }
          .animate-marquee-right {
            display: flex;
            flex-shrink: 0;
            gap: var(--marquee-gap);
            animation: marquee-right 20s linear infinite;
            will-change: transform;
          }
          .animate-marquee-left {
            display: flex;
            flex-shrink: 0;
            gap: var(--marquee-gap);
            animation: marquee-left 20s linear infinite;
            will-change: transform;
          }
        `}</style>

        {/* Top Row: Moves to the right infinitely */}
        <div
          ref={row1Ref}
          className="marquee-wrapper"
          onMouseEnter={() => setRowSpeed(row1Ref, 0.35)}
          onMouseLeave={() => setRowSpeed(row1Ref, 1)}
        >
          <div className="animate-marquee-right">
            {VIDEOS.map((src, idx) => renderVideoItem(src, `row1-a-${idx}`))}
          </div>
          <div className="animate-marquee-right" aria-hidden="true">
            {VIDEOS.map((src, idx) => renderVideoItem(src, `row1-b-${idx}`))}
          </div>
        </div>

        {/* Bottom Row: Moves to the left infinitely */}
        <div
          ref={row2Ref}
          className="marquee-wrapper"
          onMouseEnter={() => setRowSpeed(row2Ref, 0.35)}
          onMouseLeave={() => setRowSpeed(row2Ref, 1)}
        >
          <div className="animate-marquee-left">
            {VIDEOS.map((src, idx) => renderVideoItem(src, `row2-a-${idx}`))}
          </div>
          <div className="animate-marquee-left" aria-hidden="true">
            {VIDEOS.map((src, idx) => renderVideoItem(src, `row2-b-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
