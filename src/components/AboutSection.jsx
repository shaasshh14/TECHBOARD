import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

// RobotSection import seems unused in the provided code, but keeping it if you use it elsewhere.
// import { RobotSection } from "./RobotSection";

const AboutSection = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  return (
    <div className="max-w-10/12 mx-auto flex flex-col items-center justify-center px-4 py-10 relative">
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
          p-6 mt-6 md:p-8 overflow-hidden
        "
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-2 left-5 md:left-10 z-10 
            bg-[#3a86ff] text-white py-2 px-4 rounded-lg 
            text-[0.9rem] font-bold shadow-lg"
        >
          <span>What is TechBoard?</span>
        </motion.div>

        {/* Content center */}
        <div className="flex flex-col justify-center items-center text-center gap-5 py-6 md:py-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl font-extrabold leading-tight"
          >
            Know our Board
          </motion.h1>

          <motion.h2
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold -mt-5 leading-tight"
          >
            <span className="inline-block bg-[#ff9a3c] text-[#1A1D24] py-1 px-6 rounded-xl -rotate-2 shadow-lg">
              TB
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed"
          ></motion.p>
          <motion.button
            onClick={() => navigate('/watch-recap')} // 3. Add onClick to navigate
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-[#1A1D24] rounded-full py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base font-bold cursor-pointer transition-transform duration-200 shadow-md"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
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

            <span className="hidden sm:inline">Watch the 2025 Recap</span>
            <span className="inline sm:hidden">Watch</span>
          </motion.button>
        </div>

        {/* Decorative images */}
        {[
          { pos: "top-3 left-3", src: "/home-images/h1.jpg" },
          { pos: "top-3 right-3", src: "/home-images/h2.jpg" },
          { pos: "bottom-3 left-3", src: "/home-images/h3.jpg" },
          { pos: "bottom-3 right-3", src: "/home-images/h4.jpg" },
        ].map((img, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              y: [0, i % 2 === 0 ? -10 : 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute ${img.pos} w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-lg translate-x-[-20%] translate-y-[-20%] sm:translate-x-0 sm:translate-y-0`}
          >
            <img
              src={img.src}
              alt="Decorative"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AboutSection;