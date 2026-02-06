import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-12 pb-20 bg-[#0E0E0E] rounded-3xl">
        <Hero />
        <TechStack />

        {/* Placeholder for other sections */}
        <div className="h-screen" />
      </div>
    </>
  );
}
