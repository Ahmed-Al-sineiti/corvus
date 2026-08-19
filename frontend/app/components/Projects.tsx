"use client";

import Container from "./layout/Container";
import TextReveal from "./ui/TextReveal";

const VIDEOS = ["/takya.mp4", "/takya.mp4", "/takya.mp4", "/takya.mp4"];

export default function Projects() {
  const marqueeVideos = [...VIDEOS, ...VIDEOS];

  return (
    <section id="projects" className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-32">
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

      <div className="relative w-full overflow-hidden flex flex-col gap-8">
        <style>{`
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 35s linear infinite;
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right:hover,
          .animate-marquee-left:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="animate-marquee-right gap-4 sm:gap-8">
          {marqueeVideos.map((src, idx) => (
            <video
              key={`row1-${idx}`}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="h-[200px] w-[320px] sm:h-[360px] sm:w-[580px] lg:h-[460px] lg:w-[740px] shrink-0 object-cover"
            />
          ))}
        </div>

        <div className="animate-marquee-left gap-4 sm:gap-8">
          {marqueeVideos.map((src, idx) => (
            <video
              key={`row2-${idx}`}
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
    </section>
  );
}
