import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import TeamWork from "./components/Teamwork";
import Testimonials from "./components/Testimonials";
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <TeamWork />
      <Contact />
    </>
  );
}
