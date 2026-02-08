import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveShowcase } from "@/components/InteractiveShowcase";

import { Projects } from "@/components/Projects";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-8">
        <Hero />
        <InteractiveShowcase />
        <Projects />
        <BlogList />
        <Footer />
      </div>
    </>
  );
}
