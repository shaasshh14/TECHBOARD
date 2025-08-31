// src/components/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      
      {/* This is the new structure for the headline */}
      <div className="hero-headline-container">
        <h1 className="gaming-browser-headline">
          TECH-BOARD
        </h1>
      </div>
      
      <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '2rem auto 3rem'}}>
        Your ultimate destination for gaming news, events, and community. Dive into the world of Opera GX.
      </p>
      <a href="#/" className="button-primary">JOIN THE COMMUNITY</a>
    </section>
  );
};

export default HeroSection;