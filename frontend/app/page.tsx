import Hero from "./components/sections/Hero";

import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import AboutCorvus from "./components/sections/AboutCorvus";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-px w-full bg-white/10" />
      <AboutCorvus />
      <div className="h-px w-full bg-white/10" />
      <Services />
      <div className="h-px w-full bg-white/10" />
      <Projects />
      <div className="h-px w-full bg-white/10" />
      <Contact />
    </>
  );
}
