import VisitorsWall from "@/components/visitors/VisitorsWall";
import { Footer } from "@/components/Footer";

export default function VisitorsPage() {
  return (
    <div className="max-w-[540px] mx-auto px-4 sm:px-0">
      <div className="space-y-8 mt-4">
        <VisitorsWall />
        <Footer />
      </div>
    </div>
  );
}
