// src/App.jsx
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SpeakersSection from "./components/SpeakersSection";
import FAQSection from "./components/FAQSection";
import MarqueeSection from "./components/MarqueeSection";
import FooterCTA from "./components/FooterCTA";
import "./index.css";
import Particles from "@tsparticles/react";
import ParticlesComponent from "./components/Particles";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  });
  return (
    <div className="App">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SpeakersSection />
        <FAQSection />
        <FooterCTA/>
      </main>
    </div>
  );
}

export default App;
