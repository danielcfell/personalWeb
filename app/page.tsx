import { Atmosphere } from "@/components/Atmosphere";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Atmosphere />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
