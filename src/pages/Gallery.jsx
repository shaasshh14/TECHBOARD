import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SpeakersSection from "../components/SpeakersSection.jsx";
import Footer from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
function Gallery() {
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
      <Header />
      <SpeakersSection></SpeakersSection>
      <div style={{ padding: "2rem" }}>
        <h1>Gallery Page</h1>
        <p>This is the Gallery page content.</p>
      </div>
      <Footer/>
    </div>
  );
}

export default Gallery;
