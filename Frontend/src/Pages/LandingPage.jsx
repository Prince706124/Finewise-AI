import React from "react";
import Header from "../Components/LandingPage/Header";
import HeroSection from "../Components/LandingPage/HeroSection";
import StatsStrip from "../Components/LandingPage/StatsStrip";
import FeaturesSection from "../Components/LandingPage/FeaturesSection";
import HowItWorks from "../Components/LandingPage/HowItWorks";
import AiHighlight from "../Components/LandingPage/AiHighlight";
import ScreenPreview from "../Components/LandingPage/ScreenPreview";
import TestiMonial from "../Components/LandingPage/TestiMonial";
import FinalCta from "../Components/LandingPage/FinalCta";
import Footer from "../Components/LandingPage/Footer";

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <HowItWorks />
      <AiHighlight />
      <ScreenPreview />
      <TestiMonial />
      <FinalCta />
      <Footer />
    </>
  );
}

export default LandingPage;
