import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-12 pb-20">
        <Hero />

        {/* Placeholder for other sections */}
        <div className="h-screen" />
      </div>
    </>
  );
}
