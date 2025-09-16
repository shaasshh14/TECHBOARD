import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Header from "../components/Header";

const sectionsData = [
  {
    title: "Annual Tech Summit 2025",
    subtitle: "Innovation & Future",
    content:
      "Join us for the largest gathering of tech enthusiasts and professionals. Discover the latest trends shaping our future.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto-format&fit=crop",
  },
  {
    title: "Global Marketing Expo",
    subtitle: "Strategies for Growth",
    content:
      "A premier event for marketing professionals to explore new strategies, tools, and analytics in the digital marketing world.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto-format&fit=crop",
  },
  {
    title: "Creative Design Conference",
    subtitle: "The Art of Visuals",
    content:
      "An immersive experience for designers, artists, and creatives to share inspiration and techniques in modern design.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto-format&fit=crop",
  },
  {
    title: "Health & Wellness Retreat",
    subtitle: "Mind, Body, and Soul",
    content:
      "Take a break from the hustle and bustle. Our retreat focuses on yoga, meditation, and holistic wellness practices.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto-format&fit=crop",
  },
  {
    title: "Future of Finance Forum",
    subtitle: "FinTech & Blockchain",
    content:
      "Explore the disruptive technologies like AI, blockchain, and crypto that are redefining the financial industry.",
    image:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto-format&fit=crop",
  },
];

const EventsPage = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const wheelTimeoutRef = useRef(null);
  const headerRef = useRef(null);

  // Handle scroll navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (wheelTimeoutRef.current) return;
      setCurrentSectionIndex((prevIndex) => {
        const scrollDown = e.deltaY > 0;
        let newIndex = prevIndex;
        if (scrollDown) {
          newIndex = Math.min(prevIndex + 1, sectionsData.length - 1);
        } else {
          newIndex = Math.max(prevIndex - 1, 0);
        }
        if (newIndex !== prevIndex) {
          setDirection(newIndex > prevIndex ? 1 : -1);
          wheelTimeoutRef.current = setTimeout(() => {
            wheelTimeoutRef.current = null;
          }, 1200);
          return newIndex;
        }
        return prevIndex;
      });
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  // Measure header height
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ perspective: "1500px" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md"
      >
        <Header />
      </div>

      {/* Background */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center filter blur-sm scale-110 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${sectionsData[currentSectionIndex]?.image})`,
        }}
      ></div>

      {/* Main Content */}
      <main
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSectionIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative flex w-[80%] max-w-5xl h-[70%]"
          >
            {/* LEFT PAGE */}
            <motion.div
              initial={{
                rotateY: direction > 0 ? 0 : -180,
                opacity: 0,
              }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{
                rotateY: direction > 0 ? -180 : 0,
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gray-900 relative overflow-hidden shadow-xl rounded-l-2xl"
              style={{ transformOrigin: "right center" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${sectionsData[currentSectionIndex]?.image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/60"></div>
            </motion.div>

            {/* RIGHT PAGE */}
            <motion.div
              initial={{
                rotateY: direction > 0 ? 180 : 0,
                opacity: 0,
              }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{
                rotateY: direction > 0 ? 0 : 180,
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gray-900 relative overflow-hidden shadow-xl rounded-r-2xl flex flex-col items-center justify-center text-white text-center p-6"
              style={{ transformOrigin: "left center" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                {sectionsData[currentSectionIndex]?.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mt-2">
                {sectionsData[currentSectionIndex]?.subtitle}
              </h2>
              <p className="mt-6 text-lg md:text-xl max-w-md">
                {sectionsData[currentSectionIndex]?.content}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll Indicator (only hide on last page) */}
        {currentSectionIndex < sectionsData.length - 1 && (
          <motion.div
            key={currentSectionIndex} // re-mount for each page
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-sm opacity-80 mb-2">Scroll to turn page</p>
            <ChevronDown className="w-6 h-6 opacity-80" />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
