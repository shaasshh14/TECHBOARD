import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  const fullText = "THIS IS TECHBOARD";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 150; // milliseconds
  const deletingSpeed = 75; // milliseconds
  const pauseTime = 1500; // milliseconds

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(ticker);
  }, [displayedText, isDeleting, loopNum]);

  const tick = () => {
    const text = fullText;
    const updatedText = isDeleting
      ? text.substring(0, displayedText.length - 1)
      : text.substring(0, displayedText.length + 1);

    setDisplayedText(updatedText);

    if (!isDeleting && updatedText === text) {
      setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 90 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, duration: 0.8 },
    },
  };

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(90vh-6rem)] relative overflow-hidden text-center lg:text-left pt-16">
      <motion.div
        className="max-w-2xl px-6 lg:px-0 lg:ml-[8%] z-10 w-full lg:w-1/2 mt-8 lg:mt-0"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-purple-400 font-bold text-sm mb-6 tracking-widest uppercase"
        >
          <div className="flex gap-2 justify-center lg:justify-start items-center relative z-10 py-1 sm:py-2 px-4 -skew-x-6 rounded">
            {displayedText}
          </div>
        </motion.p>
        
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-100"
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-lime-300 py-1 sm:py-2 px-4 -skew-x-6 inline-block text-black rounded">
              TECHBOARD
            </span>
            <span className="absolute -top-4 -right-4 text-lime-300 text-6xl z-20 animate-spin-center">
              *
            </span>
          </span>
          <span className="text-slate-300"> THE</span>
          <br />
          <span className="text-slate-300">BEST TECH</span>
          <br />
          <span className="text-slate-300">CLUB EVER</span>
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