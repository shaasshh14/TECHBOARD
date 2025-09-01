// src/components/AboutSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { RobotSection } from './RobotSection';

const teamMembers = [
  { name: 'Alex "Cyber" Ray', role: 'Founder & CEO', img: 'https://via.placeholder.com/150' },
  { name: 'Jenna "Glitch" Ito', role: 'Lead Designer', img: 'https://via.placeholder.com/150' },
  { name: 'Marcus "Forge" Kane', role: 'Lead Engineer', img: 'https://via.placeholder.com/150' },
];

// 1. Array of messages for the robot to display
const robotMessages = [
  "Scanning for epic gamers...",
  "Did you know I'm a React component?",
  "Our team is pretty cool.",
  "Customization is key!",
  "Engaging thrusters...",
  "Remember to stay hydrated!",
  "Welcome to the About section!",
];

const AboutSection = () => {
  const [isFixed, setIsFixed] = useState(false);
  // 2. State to hold the current message and control its visibility for animations
  const [currentMessage, setCurrentMessage] = useState(robotMessages[0]);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  
  const sectionRef = useRef(null);

  // This useEffect handles the robot's fixed positioning on scroll
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

  // 3. This new useEffect handles the message-changing logic
  useEffect(() => {
    const messageInterval = setInterval(() => {
      // Fade out the old message
      setIsMessageVisible(false);

      // After the fade-out, change the message and fade it back in
      setTimeout(() => {
        let nextIndex;
        const currentIndex = robotMessages.indexOf(currentMessage);
        // Pick a new random index that isn't the same as the current one
        do {
          nextIndex = Math.floor(Math.random() * robotMessages.length);
        } while (nextIndex === currentIndex);
        
        setCurrentMessage(robotMessages[nextIndex]);
        setIsMessageVisible(true);
      }, 500); // This delay should match the transition duration
    }, 5000); // Change message every 5 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(messageInterval);
  }, [currentMessage]); // Rerun effect if the message changes

  return (
    <section className="about-page" ref={sectionRef}>
      {/* Container for the Robot and its message */}
      <div
        className={`m-7 h-1.5 transition-all duration-300 ${
          isFixed ? 'fixed top-24 z-10' : 'relative'
        }`}
      >
        <div className="relative w-32 h-32"> {/* Positioning container */}
          <RobotSection />
          
          {/* 4. The message bubble itself */}
          <div 
            className={`absolute top-0 left-[8rem] w-max bg-cyan-400 text-black text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ${
              isMessageVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {currentMessage}
            {/* A little triangle to make it look like a speech bubble */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cyan-400"></div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="section-title"><span className="sticker-bg-yellow">ABOUT US</span></h2>
        <div className="about-content">
          <p className="about-mission">
            We are a team of passionate gamers and developers dedicated to creating the best browsing experience for gamers. We believe in speed, customization, and control.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-member-card" key={index}>
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;