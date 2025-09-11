// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
import Footer from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Timeline from "./Timeline.jsx";
import AOS from "aos";

function Events() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);
  useEffect(() => {
    // Hide loader after ~1.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // While loading, show only loader
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>

      <Header />

    <div className="hello mt-20">
         <Timeline  />
    </div>

      <Footer />
    </div>
  );
}

export default Events;
