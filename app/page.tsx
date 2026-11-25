import { ClassroomBackground } from "@/src/components/ClassroomBackground";
import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { TableOfContents } from "@/src/components/TableOfContents";
import { AboutSection } from "@/src/components/AboutSection";
import { ObjectivesSection } from "@/src/components/ObjectivesSection";
import { CourseOverviewSection } from "@/src/components/CourseOverviewSection";
import { ActivitiesSection } from "@/src/components/ActivitiesSection";
import { GallerySection } from "@/src/components/GallerySection";
import { ReflectionSection } from "@/src/components/ReflectionSection";
import { Footer } from "@/src/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip">
      <ClassroomBackground />
      <Navbar />

      <main className="pt-16 md:pt-20">
        <HeroSection />
        <TableOfContents />
        <AboutSection />
        <ObjectivesSection />
        <CourseOverviewSection />
        <ActivitiesSection />
        <GallerySection />
        <ReflectionSection />
      </main>

      <Footer />
    </div>
  );
}
