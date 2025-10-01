import React from "react";

const marqueeItems = [
  {name: "Accops", logoUrl: "./Sponserlogos/accops.png" },
  {name: "MRO", logoUrl: "./Sponserlogos/mro.png" },
  {name: "Black Simba", logoUrl: "./Sponserlogos/simba.png" },
  {name: "Devfolio", logoUrl: "./Sponserlogos/devfolio.png" },
  {name: "Unstop", logoUrl: "./Sponserlogos/unstop.png" },
  {name: "Campus Times", logoUrl: "./Sponserlogos/times.png" },
  {name: "MOD", logoUrl: "./Sponserlogos/mod.png" },
];

const MarqueeSection = () => {
  const content = [...marqueeItems, ...marqueeItems];

  return (
    <section style={{ padding: 0 }}>
      <div className="marquee">
        <p className="marquee-title">OUR PROUD SPONSORS</p>
        <div className="marquee-title-underline"></div>
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