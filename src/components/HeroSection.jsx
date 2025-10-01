import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const phrase = "WE ARE THE TECHNICAL BOARD";
const TYPING_SPEED = 70;
const FADE_OUT_DELAY = 1200;
const FADE_OUT_DURATION = 900;

const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef();

  // Typing and fade logic
  useEffect(() => {
    if (isFading) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed("");
        setIsFading(false);
      }, FADE_OUT_DURATION);
      return () => clearTimeout(timeoutRef.current);
    }
    if (displayed.length < phrase.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsFading(true);
      }, FADE_OUT_DELAY);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isFading]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // Entry animation variants
  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(90vh-6rem)] relative overflow-hidden text-center lg:text-left pt-16">
      {/* Space background layers */}
      <div className="absolute inset-0 -z-40 space-bg-main"></div>
      <div className="absolute inset-0 -z-30 space-vignette"></div>
      <div className="stars-bg"></div>
      <div className="stars-bg2"></div>
      <div className="stars-bg3"></div>

      <motion.div
        className="max-w-2xl px-6 lg:px-0 lg:ml-[8%] z-10 w-full lg:w-1/2 mt-8 lg:mt-0"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Typing effect */}
        <div className="mb-3 flex justify-center lg:justify-start">
          <span
            className="text-[1.1rem] sm:text-lg font-light text-cyan-100 tracking-widest"
            style={{
              letterSpacing: "0.15em",
              textShadow: "0 0 8px #00ffae, 0 0 2px #fff",
              color: "#a5f3fc",
              fontFamily: "'Russo One', 'Poppins', sans-serif",
              opacity: isFading ? 0 : 1,
              transition: `opacity ${FADE_OUT_DURATION}ms cubic-bezier(.4,0,.2,1)`,
            }}
          >
            {displayed}
            <span
              className="ml-1"
              style={{
                opacity: cursorVisible && !isFading ? 1 : 0,
                color: "#fbbf24",
                textShadow: "0 0 8px #fbbf24, 0 0 2px #fff",
                fontWeight: 700,
                fontSize: "1.2em",
                transition: "opacity 0.2s",
              }}
            >
              |
            </span>
          </span>
        </div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="relative inline-block">
            {/* Glowing nebula-like background */}
            <span className="absolute inset-0 rounded blur-2xl opacity-80 bg-gradient-to-r from-indigo-900 via-purple-700 to-blue-500 animate-pulse -z-10"></span>
            <span className="relative z-10 bg-white/10 py-1 sm:py-2 px-4 -skew-x-6 inline-block text-white rounded shadow-lg shadow-blue-400/40 ring-2 ring-indigo-400/40 backdrop-blur-md">
              TECH BOARD
            </span>
            <span className="absolute -top-4 -right-4 text-cyan-200 text-6xl z-20 animate-spin-center drop-shadow-[0_0_10px_cyan]">
              ✦
            </span>
          </span>
          <br />
          <span className="text-slate-300">ORGANIZERS OF PUNE'S BIGGEST</span>
          <br />
          <span className="text-slate-300">TECH FEST</span>
        </motion.h1>
      </motion.div>

      <div className="w-full h-[50vh] mt-8 lg:w-1/2 lg:h-auto flex items-center justify-center">
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/l-8qvm7a8Dp195v3/scene.splinecode"
        />
      </div>
    </main>
  );
};

export default HeroSection;