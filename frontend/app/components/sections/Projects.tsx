"use client";

import { useCallback, useEffect, useRef } from "react";
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
/*                              Video Card                                    */
/* -------------------------------------------------------------------------- */

interface VideoItem {
  element: HTMLVideoElement;
  src: string;
  isLoaded: boolean;
}

function VideoCard({
  src,
  id,
  registerVideo,
}: {
  src: string;
  id: string;
  registerVideo: (id: string, el: HTMLVideoElement | null, src: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
    }
    registerVideo(id, video, src);
    return () => {
      registerVideo(id, null, src);
    };
  }, [id, src, registerVideo]);

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
        lg:group-hover:scale-105
      "
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Projects                                      */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const videoRegistry = useRef<Map<string, VideoItem>>(new Map());

  const registerVideo = useCallback(
    (id: string, el: HTMLVideoElement | null, src: string) => {
      if (el) {
        const existing = videoRegistry.current.get(id);
        videoRegistry.current.set(id, {
          element: el,
          src,
          isLoaded: existing ? existing.isLoaded : false,
        });
      } else {
        videoRegistry.current.delete(id);
      }
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isSectionActive = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const checkVideos = () => {
      if (!isSectionActive || document.hidden) return;

      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth || 0;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;

      // Preload buffer: start downloading source slightly before entering screen
      const PRELOAD_BUFFER = 200;

      videoRegistry.current.forEach((item) => {
        const { element, src, isLoaded } = item;
        if (!element) return;

        const rect = element.getBoundingClientRect();

        // Check if video is visible within the screen frame
        const isInScreen =
          rect.right > 0 &&
          rect.left < viewportWidth &&
          rect.bottom > 0 &&
          rect.top < viewportHeight;

        // Check if video is close enough to preload source
        const isNearScreen =
          rect.right > -PRELOAD_BUFFER &&
          rect.left < viewportWidth + PRELOAD_BUFFER &&
          rect.bottom > -PRELOAD_BUFFER &&
          rect.top < viewportHeight + PRELOAD_BUFFER;

        // Lazy-load source before entering viewport
        if (isNearScreen && !isLoaded) {
          element.src = src;
          element.load();
          item.isLoaded = true;
        }

        // Play when visible on screen, stop when outside screen frame to save CPU
        if (isInScreen) {
          if (element.paused) {
            const playPromise = element.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Ignore autoplay or interruption errors
              });
            }
          }
        } else {
          if (!element.paused) {
            element.pause();
          }
        }
      });
    };

    const pauseAllVideos = () => {
      videoRegistry.current.forEach((item) => {
        if (item.element && !item.element.paused) {
          item.element.pause();
        }
      });
    };

    const startChecking = () => {
      if (intervalId !== null) return;
      checkVideos();
      // Continuously check during marquee animation (every 150ms)
      intervalId = setInterval(checkVideos, 150);
    };

    const stopChecking = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      pauseAllVideos();
    };

    // 1. Observe Section visibility in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isSectionActive = true;
          if (!document.hidden) {
            startChecking();
          }
        } else {
          isSectionActive = false;
          stopChecking();
        }
      },
      {
        rootMargin: "100px 0px",
        threshold: 0,
      },
    );

    observer.observe(section);

    // 2. Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopChecking();
      } else if (isSectionActive) {
        startChecking();
      }
    };

    // 3. Handle scroll and resize events
    const handleScrollOrResize = () => {
      if (isSectionActive && !document.hidden) {
        checkVideos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      stopChecking();
    };
  }, []);

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
      <VideoCard src={src} id={key} registerVideo={registerVideo} />

      {/* لا يوجد hover على اللمس -> على < lg العرض بلون كامل بدون تعتيم/رمادي. */}
      {/* على lg فقط: معتم ورمادي، ويصفو عند الـ hover. */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          transition-all
          duration-500
          lg:bg-black/50
          lg:backdrop-grayscale
          lg:group-hover:bg-transparent
          lg:group-hover:backdrop-grayscale-0
        "
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
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
              {"Selected Works"}
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
