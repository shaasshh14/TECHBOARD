import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { ContactSection, styles } from "../components/ContactSection";
import ParticlesComponent from "../components/Particles.jsx";
import FooterCTA from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

export const Contact = () => {
  // State for loader visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 5-6 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 5000ms = 5 seconds (change to 6000 if you want 6s)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    // While loading, show only loader
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader/>
      </div>
    );
  }

  // After loading is done, show actual page
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* <ParticlesComponent id="particles" /> */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
      <style>{styles}</style>
      <ContactSection />
      <FooterCTA/>
    </div>
  );
};