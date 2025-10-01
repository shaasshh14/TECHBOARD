import AOS from "aos";
import "aos/dist/aos.css";
import UpcomingEvents from "./components/UpcomingEvents";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import MarqueeSection from "./components/MarqueeSection";
import FooterCTA from "./components/FooterCTA";
import "./index.css";
import AnimatedBackground from "./components/AnimatedBackground";
import TechLoader from "./components/Techloader.jsx";

function App() {
  const [loading, setLoading] = useState(() => {
    // Show loader only if not shown in this session
    return !sessionStorage.getItem("hasLoaded");
  });

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (loading) {
      // Hide loader after animation (adjust time as needed)
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 4000); // 2 seconds, adjust if needed
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <TechLoader />;
  }

  return (
    <div className="App">
      <div className="fixed inset-0 -z-50">
        <AnimatedBackground />
      </div>
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <UpcomingEvents />
        <FAQSection />
        <FooterCTA />
      </main>
    </div>
  );
}

export default App;