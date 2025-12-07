import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
