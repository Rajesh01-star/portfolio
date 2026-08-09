import { Hero } from "@/components/Hero";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";
import WeeklySchedule from "@/components/WeeklySchedule";

export default function Home() {
  return (
    <div className="max-w-[540px] mx-auto px-4 sm:px-0">
      <div className="space-y-8 bg-white/90 dark:bg-[#0E0E0E]/90 vibe:bg-black/60 backdrop-blur-md vibe:backdrop-blur-3xl rounded-[20px] border border-black/5 dark:border-white/5 vibe:border-white/10 overflow-hidden shadow-2xl mt-4">
        <Hero />
        <WeeklySchedule />
        <BlogList />
        <Footer />
      </div>
    </div>
  );
}
