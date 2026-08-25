import type { FC } from "react";
import { StaggerGroup, StaggerItem } from "../ui/StaggerGroup";
import TextReveal from "../ui/TextReveal";

const AboutSection: FC = () => {
  return (
    <section id="about" className="relative bg-background py-32">
      <div className="mx-auto w-full max-w-[1912px] px-6 sm:px-8 lg:px-[42px]">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <TextReveal as="h2" className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] sm:text-5xl">
              Who We{"\n"}Are
            </TextReveal>
            <TextReveal as="p" delay={300} className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              We are Corvus, a dedicated team of engineers, designers, and innovators. We bridge the gap between complex problems and elegant digital solutions.
            </TextReveal>
          </div>
        </div>
        
        <StaggerGroup className="grid grid-cols-1 gap-16 divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          
          <StaggerItem className="h-full">
            <div className="group relative flex h-full flex-col px-2 py-10 sm:px-8 sm:py-0 lg:px-8">
              <span className="mb-8 font-mono text-xs uppercase text-[#8A8F98]">
                01. Our Identity
              </span>
              <h3 className="mb-2 text-[15px] tracking-[-0.011em] text-[#D0D6E0]">
                A Collective of Innovators
              </h3>
              <p className="max-w-[368px] text-[15px] leading-[1.6] tracking-[-0.011em] text-[#8A8F98]">
                Forward-thinking technologists and creatives working together to push the boundaries of what is possible on the web.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="group relative flex h-full flex-col px-2 py-10 sm:px-8 sm:py-0 lg:px-8">
              <span className="mb-8 font-mono text-xs uppercase text-[#8A8F98]">
                02. Our Mission
              </span>
              <h3 className="mb-2 text-[15px] tracking-[-0.011em] text-[#D0D6E0]">
                Empowering Businesses
              </h3>
              <p className="max-w-[368px] text-[15px] leading-[1.6] tracking-[-0.011em] text-[#8A8F98]">
                Developing robust, scalable, and beautifully designed software that transforms ambitious ideas into reality.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="group relative flex h-full flex-col px-2 py-10 sm:px-8 sm:py-0 lg:px-8">
              <span className="mb-8 font-mono text-xs uppercase text-[#8A8F98]">
                03. What We Do
              </span>
              <h3 className="mb-2 text-[15px] tracking-[-0.011em] text-[#D0D6E0]">
                End-to-End Solutions
              </h3>
              <p className="max-w-[368px] text-[15px] leading-[1.6] tracking-[-0.011em] text-[#8A8F98]">
                From enterprise systems to interactive user interfaces, we deliver high-velocity engineering and strategic design.
              </p>
            </div>
          </StaggerItem>

        </StaggerGroup>
      </div>
    </section>
  );
};

export default AboutSection;
