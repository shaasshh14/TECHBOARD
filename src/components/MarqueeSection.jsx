// src/components/MarqueeSection.jsx
import React from 'react';

const marqueeItems = ["SPONSER A", "SPONSER B", "SPONSER C", "SPONSER D", "SPONSER E", "SPONSER F"];

const MarqueeSection = () => {
  // Duplicate items for a seamless loop
  const content = [...marqueeItems, ...marqueeItems];

  return (
    <section style={{ padding: 0 }}>
      <div className="marquee">
        <div className="marquee-content">
          {content.map((item, index) => (
            <div className="marquee-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;