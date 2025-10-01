import React, { useEffect, useState, useRef } from "react";
import "./TechLoader.css";
import gsap from "gsap";

const fonts = [
  "Kirang Haerang",
  "Indie Flower",
  "Rye",
  "Amatic SC",
  "Bangers",
  "Fredericka the Great",
];

const TechLoader = ({ onComplete }) => {
  const [count, setCount] = useState(1); // Start from 1
  const lettersRef = useRef([]);
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  // Font rolling animation
  useEffect(() => {
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      lettersRef.current.forEach((letter) => {
        if (letter) {
          const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
          letter.style.fontFamily = randomFont;
        }
      });
      rollCount++;
      if (rollCount > 20) clearInterval(rollInterval); // slightly more rolls
    }, 500);

    return () => clearInterval(rollInterval);
  }, []);

  // Loader counter animation + upward animation
  useEffect(() => {
    let loaderCount = 1; // Start from 1
    setCount(loaderCount);
    const loaderInterval = setInterval(() => {
      loaderCount++;
      setCount(loaderCount);

      if (loaderCount >= 100) {
        clearInterval(loaderInterval);

        // Fade out loader counter
        if (loaderRef.current) {
          loaderRef.current.style.transition = "opacity 1.5s ease";
          loaderRef.current.style.opacity = 0;
        }

        // Animate entire container upward using GSAP
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: -window.innerHeight, // move up by full screen height
            opacity: 0,
            duration: 2,             // slow upward animation
            ease: "power2.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }
      }
    }, 35); // ~3.5s duration

    return () => clearInterval(loaderInterval);
  }, [onComplete]);

  return (
    <div className="loader-container" ref={containerRef}>
      <h2 className="loki">
        {["T", "E", "C", "H", "B", "O", "A", "R", "D"].map((char, i) => (
          <p
            key={i}
            className="letter"
            ref={(el) => (lettersRef.current[i] = el)}
          >
            {char}
          </p>
        ))}
      </h2>

      <div className="loader" ref={loaderRef}>
        {count > 100 ? 100 : count}%
      </div>
    </div>
  );
};

export default TechLoader;