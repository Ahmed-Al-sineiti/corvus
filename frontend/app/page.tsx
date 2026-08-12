import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-px w-full bg-white/10" />
      <Services />
      <div className="h-px w-full bg-white/10" />
      <Projects />
      <div className="h-px w-full bg-white/10" />
      <Contact />
    </>
  );
}
