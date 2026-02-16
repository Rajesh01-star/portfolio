import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InteractiveShowcase } from "@/components/InteractiveShowcase";

import { Projects } from "@/components/Projects";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";
import WeeklySchedule from "@/components/WeeklySchedule";

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-8 bg-white/90 dark:bg-[#0E0E0E]/90 backdrop-blur-md rounded-[20px] border border-black/5 dark:border-white/5 overflow-hidden shadow-2xl">
        <Hero />
        {/* <InteractiveShowcase /> */}
        <WeeklySchedule />
        {/* <Projects /> */}
        <BlogList />
        <Footer />
      </div>
    </>
  );
}
