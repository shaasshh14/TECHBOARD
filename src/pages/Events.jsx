import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
import Footer from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

function Events() {
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

  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
    <SpeakersSection></SpeakersSection>
      <div style={{ padding: "2rem" }}>
        <h1>Events Page</h1>
        <p>This is the Events page content.</p>
      </div>
      <Footer/>
    </div>
  );
}

export default Events;
