"use client";

import { useRef, useState } from "react";
import Container from "./layout/Container";
import TextReveal from "./ui/TextReveal";

const VIDEOS = ["/takya.mp4", "/kingsfield.mp4", "/takya.mp4", "/kingsfield.mp4"];

export default function Projects() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const [row1Slow, setRow1Slow] = useState(false);
  const [row2Slow, setRow2Slow] = useState(false);

  const setRowSpeed = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    speed: number
  ) => {
    if (!containerRef.current) return;
    if (typeof containerRef.current.getAnimations === "function") {
      const animations = containerRef.current.getAnimations({ subtree: true });
      animations.forEach((anim) => {
        anim.playbackRate = speed;
      });
    }
  };

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
              className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] text-white sm:text-5xl"
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
            cursor: pointer;
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
          onClick={() => {
            const nextState = !row1Slow;
            setRow1Slow(nextState);
            setRowSpeed(row1Ref, nextState ? 0.35 : 1);
          }}
          onMouseEnter={() => setRowSpeed(row1Ref, 0.35)}
          onMouseLeave={() => {
            if (!row1Slow) setRowSpeed(row1Ref, 1);
          }}
          onTouchStart={() => setRowSpeed(row1Ref, 0.35)}
          onTouchEnd={() => {
            if (!row1Slow) setRowSpeed(row1Ref, 1);
          }}
        >
          <div className="animate-marquee-right">
            {VIDEOS.map((src, idx) => (
              <video
                key={`row1-a-${idx}`}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="h-[200px] w-[320px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px] shrink-0 object-cover"
              />
            ))}
          </div>
          <div className="animate-marquee-right" aria-hidden="true">
            {VIDEOS.map((src, idx) => (
              <video
                key={`row1-b-${idx}`}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="h-[200px] w-[320px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px] shrink-0 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Bottom Row: Moves to the left infinitely */}
        <div
          ref={row2Ref}
          className="marquee-wrapper"
          onClick={() => {
            const nextState = !row2Slow;
            setRow2Slow(nextState);
            setRowSpeed(row2Ref, nextState ? 0.35 : 1);
          }}
          onMouseEnter={() => setRowSpeed(row2Ref, 0.35)}
          onMouseLeave={() => {
            if (!row2Slow) setRowSpeed(row2Ref, 1);
          }}
          onTouchStart={() => setRowSpeed(row2Ref, 0.35)}
          onTouchEnd={() => {
            if (!row2Slow) setRowSpeed(row2Ref, 1);
          }}
        >
          <div className="animate-marquee-left">
            {VIDEOS.map((src, idx) => (
              <video
                key={`row2-a-${idx}`}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="h-[200px] w-[320px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px] shrink-0 object-cover"
              />
            ))}
          </div>
          <div className="animate-marquee-left" aria-hidden="true">
            {VIDEOS.map((src, idx) => (
              <video
                key={`row2-b-${idx}`}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="h-[200px] w-[320px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px] shrink-0 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
