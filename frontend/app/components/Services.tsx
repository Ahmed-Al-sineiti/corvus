import type { FC } from "react";
import { StaggerGroup, StaggerItem } from "./StaggerGroup";
import TextReveal from "./ui/TextReveal";

interface ServiceItem {
  fig: string;
  title: string;
  description: string;
  icon: string;
  imgClassName?: string;
}

const SERVICES: ServiceItem[] = [
  {
    fig: "SRV 01",
    title: "Designed for speed",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 02",
    title: "Designed for speed",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 03",
    title: "Designed for speed",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/icon-tiers.svg",
  },
  {
    fig: "SRV 04",
    title: "Maintenance",
    description:
      "Reduces noise and restores momentum to help teams ship with high velocity and focus.",
    icon: "/services/icon-card.svg",
    imgClassName: "scale-[1.25]", // Scale up the card icon to match others
  },
];

const ServicesSection: FC = () => {
  return (
    <section id="services" className="relative bg-background py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1912px] px-6 sm:px-8 lg:px-[42px]">
        <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <TextReveal as="h2" className="font-heading text-4xl font-medium leading-[1.29] tracking-[-0.0375em] sm:text-5xl">
              Our{"\n"}Services
            </TextReveal>
            <TextReveal as="p" delay={300} className="font-sans mt-5 text-sm leading-relaxed text-foreground-secondary sm:text-base xl:text-lg">
              We design and build digital experiences that help ambitious teams ship with high velocity and focus.
            </TextReveal>
          </div>
        </div>
        <StaggerGroup className="grid grid-cols-1 gap-10 divide-y divide-white/[0.08] sm:grid-cols-2 sm:gap-12 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:gap-16">
          {SERVICES.map(({ fig, title, description, icon, imgClassName }, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="group relative flex h-full flex-col px-2 py-10 sm:px-8 sm:py-0 lg:px-8">
                <div className="relative mb-8 flex flex-1 w-full items-center justify-center min-h-[200px] sm:min-h-[250px]">
                  <span className="absolute left-0 top-0 font-mono text-xs uppercase text-[#8A8F98]">
                    {fig}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt=""
                    className={`h-[85%] w-[85%] object-contain transition-transform duration-500 ease-out group-hover:-translate-y-1 ${imgClassName || ""}`}
                  />
                </div>

                <h3 className="mb-2 text-[15px] tracking-[-0.011em] text-[#D0D6E0]">
                  {title}
                </h3>
                <p className="max-w-[368px] text-[15px] leading-[1.6] tracking-[-0.011em] text-[#8A8F98]">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default ServicesSection;
