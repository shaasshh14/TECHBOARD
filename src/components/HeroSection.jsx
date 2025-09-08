import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  // This orchestrates the animation
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

  // This defines how each item animates
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
      {/* This div contains the text content. It will appear above the spline
          on mobile and to the left of it on large screens.
      */}
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
          {/* The flex container is now styled to match the "ALMOST" text */}
          <div className="flex gap-2 justify-center lg:justify-start items-center relative z-10   py-1 sm:py-2 px-4 -skew-x-6   rounded">
            <div>THIS</div>
            <div>IS</div>
            <div>TECHBOARD</div>
          </div>
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-100"
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-lime-300 py-1 sm:py-2 px-4 -skew-x-6 inline-block text-black rounded">
              ALMOST
            </span>
            <span className="absolute -top-4 -right-4 text-lime-300 text-6xl z-20 animate-spin-center">
              *
            </span>
          </span>
          <span className="text-slate-300"> THE</span>
          <br />
          <span className="text-slate-300">BEST TECH</span>
          <br />
          <span className="text-slate-300">COMPANY</span>
        </motion.h1>
      </motion.div>
       
      {/* This div contains the Spline component. It is placed second in the code
          so that it appears below the text content on mobile devices.
          The `lg:flex-row` on the parent container ensures it appears on the right
          on large screens. The `h-[50vh]` class gives it a fixed height on mobile to prevent layout shifts.
      */}
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
