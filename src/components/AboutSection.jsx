// src/components/AboutSection.jsx
import React from 'react';

const teamMembers = [
  { name: 'Alex "Cyber" Ray', role: 'Founder & CEO', img: 'https://via.placeholder.com/150' },
  { name: 'Jenna "Glitch" Ito', role: 'Lead Designer', img: 'https://via.placeholder.com/150' },
  { name: 'Marcus "Forge" Kane', role: 'Lead Engineer', img: 'https://via.placeholder.com/150' },
];

const AboutSection = () => {
  return (
    <section className="about-page">
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
    </section>
  );
};

export default AboutSection;