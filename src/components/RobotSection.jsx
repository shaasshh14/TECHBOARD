// src/components/RobotSection.jsx
import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

export const RobotSection = ({ sectionTop, sectionHeight }) => {
  const [offsetY, setOffsetY] = useState(0);
  const topBuffer = 20; // Distance from top of viewport

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const robotHeight = 250; // Robot container height

      if (scrollY < sectionTop) {
        setOffsetY(0);
      } else if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - robotHeight) {
        const relativeScroll = scrollY - sectionTop;
        const maxOffset = sectionHeight - robotHeight;
        const newOffset = (relativeScroll / (sectionHeight - robotHeight)) * maxOffset;
        setOffsetY(newOffset);
      } else if (scrollY > sectionTop + sectionHeight - robotHeight) {
        setOffsetY(sectionHeight - robotHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionTop, sectionHeight]);

  return (
    <div
      className="robot-spline-container"
      style={{
        position: "absolute",
        top: `${topBuffer + offsetY}px`,  // Use the topBuffer here
        width: "18vw",                     // Increased width
        height: "30vh",
        transform: `translateY(20px)`,
        transition: "transform 0.2s ease-out",
        zIndex: 9999,
      }}
    >
      <Spline
        className="absolute top-0 left-0 h-full w-full"
        scene="https://prod.spline.design/eRfU-oGvcB4mJMx7/scene.splinecode"
      />
    </div>
  );
};
