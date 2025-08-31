// src/components/MarqueeSection.jsx
import React from 'react';

const marqueeItems = ["CUSTOMIZATION", "GX CONTROL", "PERFORMANCE", "GAMING BROWSER", "FREE VPN", "AD BLOCKER"];

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