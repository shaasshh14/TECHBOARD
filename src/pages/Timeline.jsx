import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- EVENT DATA ---
const timelineEventsData = [
  {
    year: "2022",
    title: "Techboard Founded",
    description:
      "The Techboard club was established by a group of passionate cadets to foster a culture of technological innovation and collaboration within the college.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
      "https://images.unsplash.com/photo-1580894732444-8ec539b7f58a?w=500&q=80",
    ],
  },
  {
    year: "2023",
    title: "Code Command Hackathon",
    description:
      "Our inaugural 24-hour hackathon challenged cadets to develop solutions for modern military and civic problems, showcasing incredible talent and creativity.",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
    ],
  },
  {
    year: "2024",
    title: "Cybersecurity Workshop",
    description:
      "In collaboration with industry experts, we hosted a hands-on workshop covering the fundamentals of cybersecurity and ethical hacking for all members.",
    images: [
      "https://images.unsplash.com/photo-1544890225-2fde0e66ea08?w=500&q=80",
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=500&q=80",
    ],
  },
];

// --- Animation Variants ---
const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Timeline Item Component ---
const TimelineItem = ({ event, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const isOdd = index % 2 !== 0;

  return (
    <section
      ref={ref}
      className="snap-start min-h-screen w-full flex items-center justify-center p-6 sm:p-10 relative"
    >
      {/* Timeline Compass Point */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-1/2 -translate-x-1/2 z-20"
      >
        <img
          src="https://dmmotionarts.com/wp-content/uploads/2024/05/compass-white-150x150.png"
          alt="timeline point"
          className="w-10 h-10 sm:w-16 sm:h-16"
        />
      </motion.div>

      {/* Event Content */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center z-20 ${
          isOdd ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div
            className={`w-full max-w-sm text-center md:text-left ${
              isOdd ? "md:text-left" : "md:text-right"
            }`}
          >
            <motion.h3
              variants={itemVariant}
              className="text-4xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h3>
            <motion.p
              variants={itemVariant}
              className="text-gray-300 mb-6 leading-relaxed"
            >
              {event.description}
            </motion.p>
            <motion.div
              variants={itemVariant}
              className={`flex flex-wrap gap-4 justify-center ${
                isOdd ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {event.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${event.title} ${i + 1}`}
                  className="w-full sm:w-40 h-auto rounded-md shadow-lg border-4 border-white/20"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Year Section */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <motion.div
            variants={itemVariant}
            className="text-8xl font-black text-white/20"
          >
            {event.year}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// --- Intro Section ---
const IntroSection = () => (
  <section className="snap-start min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[#121212] text-white">
    <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-wider">
      Techboard Presents
    </h1>
    <p className="text-base sm:text-xl mt-4 opacity-80 max-w-md">
      A Chronicle of Our Milestones and Achievements
    </p>
    <div className="mt-20 animate-bounce">
      <svg
        className="w-10 h-10 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
);

// --- Main Events Page ---
const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="bg-[#121212] font-serif h-screen w-full snap-y snap-mandatory overflow-y-scroll relative"
    >
      <IntroSection />

      {/* Elementor-style Timeline Container */}
      <div className="relative">
        {/* Static Timeline Background */}
        <div className="elementor-element elementor-element-81e3cc7 e-con-full dm-bar-container e-flex e-con e-child absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/10 z-0">
          {/* Progress Fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="elementor-element elementor-element-aef7743 e-con-full dm-progress-bar e-flex e-con e-child absolute top-0 left-0 w-full bg-white z-10 origin-top"
          />
        </div>

        {/* Render Timeline Events */}
        {timelineEventsData.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
