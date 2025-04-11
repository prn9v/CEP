import About from "@/components/About";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Impact />
      <Programs />
      <Stats /> 
      <Donate />
      <Footer />
    </div>
  );
}
