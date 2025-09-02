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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  });
  return (
    <div className="App">
      <ParticlesComponent id="particles"/>
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
