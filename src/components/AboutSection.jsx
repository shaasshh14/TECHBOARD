// src/components/AboutSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RobotSection } from "./RobotSection";

const AboutSection = () => {
  const [isFixed, setIsFixed] = useState(false);
  const sectionRef = useRef(null);

  // Sticky Robot logic
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-center px-4 py-10 relative"
      ref={sectionRef}
    >
      {/* Sticky Robot */}
      <div
        className={`transition-all duration-300 ${
          isFixed ? "fixed top-24 left-6 z-20" : "absolute -left-16 top-10"
        }`}
      >
        <div className="relative w-28 h-28 md:w-32 md:h-32">
          <RobotSection />
        </div>
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-8 
        bg-gradient-to-r from-[#3a86ff] via-[#ff9a3c] to-[#ff006e] 
        bg-clip-text text-transparent tracking-wide drop-shadow-lg"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        About Us
      </motion.h1>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="
          relative w-full bg-[#1A1D24] text-white rounded-[24px] border-2
          border-[#3a86ff] shadow-[0_0_25px_#3a86ff] 
          p-3 mt-6 md:p-5 
          grid gap-4
          grid-cols-2 grid-rows-[80px_80px_auto_80px]
          md:grid-cols-[120px_1fr_1fr_120px] md:grid-rows-[120px_1fr_1fr_120px]
        "
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[-18px] left-5 md:left-10 z-10 bg-[#3a86ff] text-white py-2 px-4 rounded-lg text-[0.9rem] font-bold shadow-lg"
        >
          <span>What is TechBoard?</span>
        </motion.div>

        {/* Content center */}
        <div
          className="
            flex flex-col justify-center items-center text-center gap-5
            py-3 md:py-0
            col-span-2 row-start-3
            md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2
          "
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl font-extrabold leading-tight"
          >
            The No.1 Fest for:
          </motion.h1>

          <motion.h2
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold -mt-5 leading-tight"
          >
            <span className="inline-block bg-[#ff9a3c] text-[#1A1D24] py-1 px-6 rounded-xl -rotate-2 shadow-lg">
              Web Designers & Devs
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed"
          >
            We are a team of passionate gamers and developers dedicated to
            creating the best browsing experience for gamers. We believe in
            speed, customization, and control.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-[#1A1D24] rounded-full py-3 px-6 text-base font-bold cursor-pointer transition-transform duration-200 shadow-md"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Watch the 2024 Recap
          </motion.button>
        </div>

        {/* Decorative images */}
        {[
          {
            pos: "row-start-1 col-start-1",
            src: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
            alt: "Top Left",
          },
          {
            pos: "row-start-1 col-start-2 md:col-start-4",
            src: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg",
            alt: "Top Right",
          },
          {
            pos: "row-start-4 col-start-1",
            src: "https://images.pexels.com/photos/5439152/pexels-photo-5439152.jpeg",
            alt: "Bottom Left",
          },
          {
            pos: "row-start-4 col-start-2 md:col-start-4",
            src: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg",
            alt: "Bottom Right",
          },
          {
            pos: "row-start-2 col-start-1 md:row-start-2",
            src: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
            alt: "Side Left",
          },
          {
            pos: "row-start-2 col-start-2 md:col-start-4",
            src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
            alt: "Side Right",
          },
        ].map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`rounded-2xl overflow-hidden ${img.pos} aspect-square md:aspect-auto`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutSection;
