import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

const HeroSection = () => {
  // parent container animation - This orchestrates the animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3, // This creates the delay between items
      },
    },
  };

  // each child element animation - This defines how each item animates
  const item = {
    hidden: { opacity: 0, y: 90 }, // Start invisible and 90px down
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, duration: 0.8 },
    }, // End visible and at original position
  };

  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[calc(90vh-6rem)] relative  overflow-hidden">
      {/* LEFT SECTION */}
      {/* This is the ANIMATION CONTAINER */}
      <motion.div
        className="max-w-2xl ml-[5%] lg:ml-[8%] z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* --- ANIMATED ITEM 1 --- */}
        <motion.p
          variants={item}
          className="text-purple-400 font-bold text-sm mb-6 tracking-widest uppercase"
        >
          {/* THIS IS DASH */}
          <div className="flex gap-2 justify-center items-center -ml-80">
            <div
              className="this"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2000"
            >
              THIS
            </div>
            <div
              className="this"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2300"
            >
              IS
            </div>
            <div
              className="this"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="2600"
            >
              TECHBOARD
            </div>
          </div>
        </motion.p>

        {/* --- ANIMATED ITEM 2 --- */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-slate-100"
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-lime-300 py-1 sm:py-2 px-4 -skew-x-6 inline-block text-black">
              ALMOST
            </span>

            {/* <span className="absolute -top-4 -right-4 text-lime-300 text-6xl z-20 animate-spin-slow">
              *
            </span> */}
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

      {/* RIGHT SECTION (Robot / Spline) */}
      <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full"
        scene="https://prod.spline.design/l-8qvm7a8Dp195v3/scene.splinecode"
      />
    </main>
  );
};

export default HeroSection;
