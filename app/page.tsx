/* app/page.tsx */

import { HeroSection } from "@/app/components/HeroSection";
import { ProjectsSection } from "@/app/components/ProjectsSection";

export default function HomePage() {
  return (
    <main className="flex w-full h-screen overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
