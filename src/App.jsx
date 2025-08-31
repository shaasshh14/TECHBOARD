// src/App.jsx

import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SpeakersSection from './components/SpeakersSection';
import FAQSection from './components/FAQSection';
import MarqueeSection from './components/MarqueeSection';
import FooterCTA from './components/FooterCTA';
import './index.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SpeakersSection />
        <FAQSection />
        <FooterCTA />
      </main>
    </div>
  );
}

export default App;