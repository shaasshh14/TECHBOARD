// src/components/AboutSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { RobotSection } from './RobotSection';

const AboutSection = () => {
  const [isFixed, setIsFixed] = useState(false);
  const sectionRef = useRef(null);

  // Handles the robot's fixed positioning on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const triggerPoint = sectionRef.current.offsetTop;
        const navbarHeightBuffer = 80;
        if (window.scrollY > triggerPoint - navbarHeightBuffer) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-page" ref={sectionRef}>
      {/* Container for the Robot */}
      <div
        className={`m-7 h-1.5 transition-all duration-300 ${
          isFixed ? 'fixed top-24 z-10' : 'relative'
        }`}
      >
        <div className="relative w-32 h-32 -left-28">
          <RobotSection />
        </div>
      </div>
      
      <div>
        <h2 className="section-title"><span className="sticker-bg-yellow">ABOUT US</span></h2>
        <div className="about-content">
          <p className="about-mission">
            We are a team of passionate gamers and developers dedicated to creating the best browsing experience for gamers. We believe in speed, customization, and control.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
