"use client";

import { useEffect, useRef } from "react";
import Container from "../layout/Container";
import TextReveal from "../ui/TextReveal";

const VIDEOS = [
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/takya.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/kingsfield(1).mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/Tabarak_Compressed.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/compressed_output.mp4",
  "https://kbwctahdlaloeuidjqob.supabase.co/storage/v1/object/public/jwdjjjqwjd/pharma.mp4",
];

/* -------------------------------------------------------------------------- */
/*                              Lazy Video                                    */
/* -------------------------------------------------------------------------- */

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let loaded = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;

        if (entry.isIntersecting) {
          /*
           * Add src only when the video is close to the viewport.
           * This prevents the browser from downloading all videos
           * when the page initially loads.
           */
          if (!loaded) {
            video.src = src;
            video.load();
            loaded = true;
          }

          /*
           * Play only when visible.
           */
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser may block playback in some edge cases.
            });
          }
        } else {
          /*
           * Pause videos that are no longer visible.
           * We intentionally DON'T reset currentTime because
           * resetting can cause unnecessary decoding work.
           */
          video.pause();
        }
      },
      {
        /*
         * Start loading slightly before the video enters the viewport.
         * This keeps the animation smooth without loading everything.
         */
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();

      video.pause();

      /*
       * Don't remove src here.
       * Keeping it allows browser caching and avoids unnecessary
       * downloads if the marquee brings the video back.
       */
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
      className="
        h-full
        w-full
        object-cover
        transition-transform
        duration-500
        will-change-transform
        group-hover:scale-105
      "
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Projects                                      */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const setRowSpeed = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    speed: number,
  ) => {
    if (!containerRef.current) return;

    if (typeof containerRef.current.getAnimations === "function") {
      const animations = containerRef.current.getAnimations({
        subtree: true,
      });

      animations.forEach((anim) => {
        anim.playbackRate = speed;
      });
    }
  };

  const renderVideoItem = (src: string, key: string) => (
    <div
      key={key}
      className="
        group
        relative
        h-[200px]
        w-[320px]
        shrink-0
        overflow-hidden
        rounded-[16px]

        sm:h-[360px]
        sm:w-[580px]

        lg:h-[460px]
        lg:w-[740px]

        contain-paint
      "
    >
      <LazyVideo src={src} />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/50
          backdrop-grayscale
          transition-all
          duration-500
          group-hover:bg-transparent
          group-hover:backdrop-grayscale-0
        "
      />
    </div>
  );

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-black
        py-20
        md:py-28
        lg:py-32
      "
    >
      <Container className="relative z-10">
        <div className="mb-16 flex flex-col items-center text-center md:mb-20">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="
                font-heading
                font-sans
                text-4xl
                leading-[1.29]
                tracking-[-0.0375em]
                text-white
                sm:text-5xl
              "
            >
              {"Selected\nWorks"}
            </TextReveal>

            <TextReveal
              as="p"
              delay={300}
              className="
                mt-5
                font-sans
                text-sm
                leading-relaxed
                text-[#737373]
                sm:text-base
                xl:text-lg
              "
            >
              A showcase of our recent digital experiences. We partner with
              forward-thinking brands to build products that matter.
            </TextReveal>
          </div>
        </div>
      </Container>

      <div className="relative flex w-full flex-col gap-4 overflow-hidden sm:gap-8">
        <style>{`
          @keyframes marquee-right {
            from {
              transform: translate3d(
                calc(-100% - var(--marquee-gap)),
                0,
                0
              );
            }

            to {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes marquee-left {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(
                calc(-100% - var(--marquee-gap)),
                0,
                0
              );
            }
          }

          .marquee-wrapper {
            --marquee-gap: 1rem;

            display: flex;
            width: max-content;
            user-select: none;
            gap: var(--marquee-gap);

            contain: layout;
          }

          @media (min-width: 640px) {
            .marquee-wrapper {
              --marquee-gap: 2rem;
            }
          }

          .animate-marquee-right,
          .animate-marquee-left {
            display: flex;
            flex-shrink: 0;
            gap: var(--marquee-gap);

            will-change: transform;
            transform: translate3d(0, 0, 0);
          }

          .animate-marquee-right {
            animation: marquee-right 20s linear infinite;
          }

          .animate-marquee-left {
            animation: marquee-left 20s linear infinite;
          }

          /*
           * Respect users who prefer reduced motion.
           */
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee-right,
            .animate-marquee-left {
              animation-play-state: paused;
            }
          }
        `}</style>

        {/* ---------------------------------------------------------------- */}
        {/* Top Row                                                          */}
        {/* ---------------------------------------------------------------- */}

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

        {/* ---------------------------------------------------------------- */}
        {/* Bottom Row                                                       */}
        {/* ---------------------------------------------------------------- */}

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
