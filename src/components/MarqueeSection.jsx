import React from "react";

const marqueeItems = [
  { name: "Mastercard", logoUrl: "./Sponserlogos/master.png" },
  { name: "RedBull", logoUrl: "./Sponserlogos/redbull.png" },
  { name: "Mastercard", logoUrl: "./Sponserlogos/master.png" },
  { name: "Pepsi", logoUrl: "./Sponserlogos/pepsi.png" },
  { name: "RedBull", logoUrl: "./Sponserlogos/redbull.png" },
  { name: "Pepsi", logoUrl: "./Sponserlogos/pepsi.png" },
];

const MarqueeSection = () => {
  const content = [...marqueeItems, ...marqueeItems];

  return (
    <section style={{ padding: 0 }}>
      <div className="marquee">
        <div className="marquee-content">
          {content.map((item, index) => (
            <div className="marquee-item" key={index}>
              <img
                src={item.logoUrl}
                alt={`${item.name} Logo`}
                style={{ height: "30px", marginRight: "10px" }}
              />
              <span className="marquee-item-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;