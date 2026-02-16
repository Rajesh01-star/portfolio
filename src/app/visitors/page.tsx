import { Header } from "@/components/Header";
import VisitorsWall from "@/components/visitors/VisitorsWall";
import { Footer } from "@/components/Footer";

export default function VisitorsPage() {
  return (
    <>
      <Header />
      <div className="space-y-8">
        <VisitorsWall />
        <Footer />
      </div>
    </>
  );
}
