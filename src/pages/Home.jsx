import React from "react";
import HeroSection from "../components/home/HeroSection";
import CityIntroSection from "../components/home/CityIntroSection";
import AdvantagesSection from "../components/home/AdvantagesSection";
import ResidencesSection from "../components/home/ResidencesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CityIntroSection />
      <AdvantagesSection />
      <ResidencesSection />
    </>
  );
}