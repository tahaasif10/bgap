import { AboutSection } from "@/components/home/AboutSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MembersShowcase } from "@/components/home/MembersShowcase";
import { heroSlides } from "@/data/hero-slides";

export default function Home() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <AboutSection />
      <MembersShowcase />
      <CtaBanner />
    </>
  );
}