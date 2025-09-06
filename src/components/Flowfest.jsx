import React, { useState, useEffect } from "react";

const FlowFestSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftImages = ["Pic1", "Pic2", "Pic3", "Pic4"];
  const rightImages = ["Pic5", "Pic6", "Pic7", "Pic8"];

  // Generate half-circle angles (0° = top, 180° = bottom)
  const createHalfCircleAngles = (count) => {
    const start = -90; // start angle
    const end = 90;    // end angle
    const step = (end - start) / (count - 1);
    return Array.from({ length: count }, (_, i) => start + i * step);
  };

  const leftAngles = createHalfCircleAngles(leftImages.length);
  const rightAngles = createHalfCircleAngles(rightImages.length);

  const radius = 200; // distance from center to images
  const offsetX = 500; // how far the center is from middle
  const scrollFactor = 0.05; // rotation speed

  const borderColors = ["#FFD700", "#FF4500", "#00BFFF", "#32CD32"];

  return (
    <section className="relative bg-black min-h-screen py-16 overflow-hidden flex items-center justify-center">
      {/* Main Blue Box */}
      <div className="relative max-w-7xl w-full px-6 md:px-12 z-10 border-2 border-blue-500 rounded-2xl p-12 overflow-hidden">
        <div className="text-center text-white pt-10 pb-6 md:pt-16 md:pb-8 max-w-4xl mx-auto">
          <h2 className="font-bebas text-2xl md:text-4xl uppercase leading-tight">
            The No.1 Fest for:
          </h2>
          <p className="inline-block bg-yellow-400 text-black px-4 py-2 md:px-6 md:py-3 mt-4 mb-6 text-2xl md:text-3xl font-fredoka font-bold rounded-full transform -rotate-2">
            Web Designers & Devs
          </p>
          <p className="font-inter text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6">
            It's like a conference, but it's outside, with steel drums, pints and way cooler vibes.
          </p>
        </div>
      </div>

      {/* Left Center → Images inside half-circle */}
      {leftImages.map((pic, i) => {
        const angle = (leftAngles[i] + scrollY * scrollFactor) * (Math.PI / 180);
        const x = -offsetX + radius * Math.cos(angle); // center left outside
        const y = radius * Math.sin(angle);
        return (
          <div
            key={i}
            className="absolute w-28 h-28 rounded-xl overflow-hidden shadow-lg"
            style={{
              top: `50%`,
              left: `50%`,
              transform: `translate(${x}px, ${y}px)`,
              border: `3px solid ${borderColors[i % borderColors.length]}`,
            }}
          >
            <img
              src={`https://via.placeholder.com/150/000000/FFFFFF?text=${pic}`}
              alt={pic}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        );
      })}

      {/* Right Center → Images inside half-circle */}
      {rightImages.map((pic, i) => {
        const angle = (rightAngles[i] - scrollY * scrollFactor) * (Math.PI / 180);
        const x = offsetX + radius * Math.cos(angle); // center right outside
        const y = radius * Math.sin(angle);
        return (
          <div
            key={i}
            className="absolute w-28 h-28 rounded-xl overflow-hidden shadow-lg"
            style={{
              top: `50%`,
              left: `50%`,
              transform: `translate(${x}px, ${y}px)`,
              border: `3px solid ${borderColors[i % borderColors.length]}`,
            }}
          >
            <img
              src={`https://via.placeholder.com/150/000000/FFFFFF?text=${pic}`}
              alt={pic}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        );
      })}
    </section>
  );
};

export default FlowFestSection;
