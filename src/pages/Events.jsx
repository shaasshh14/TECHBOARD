import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header"; // Assuming your Header component is here

const sectionsData = [
  {
    title: "Annual Tech Summit 2025",
    subtitle: "Innovation & Future",
    content: "Join us for the largest gathering of tech enthusiasts and professionals. Discover the latest trends shaping our future.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto-format&fit=crop",
  },
  {
    title: "Global Marketing Expo",
    subtitle: "Strategies for Growth",
    content: "A premier event for marketing professionals to explore new strategies, tools, and analytics in the digital marketing world.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto-format&fit=crop",
  },
  {
    title: "Creative Design Conference",
    subtitle: "The Art of Visuals",
    content: "An immersive experience for designers, artists, and creatives to share inspiration and techniques in modern design.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto-format&fit=crop",
  },
  {
    title: "Health & Wellness Retreat",
    subtitle: "Mind, Body, and Soul",
    content: "Take a break from the hustle and bustle. Our retreat focuses on yoga, meditation, and holistic wellness practices.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto-format&fit=crop",
  },
  {
    title: "Future of Finance Forum",
    subtitle: "FinTech & Blockchain",
    content: "Explore the disruptive technologies like AI, blockchain, and crypto that are redefining the financial industry.",
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto-format&fit=crop",
  },
];

const EventsPage = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // NEW: State to store the header's height
  const [headerHeight, setHeaderHeight] = useState(0);

  const wheelTimeoutRef = useRef(null);
  const sliderNavRef = useRef(null);
  const navPointerRef = useRef(null);
  // NEW: Ref to measure the header element
  const headerRef = useRef(null);

  // --- Wheel scroll logic (no changes) ---
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
          }, 1000);
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
  
  // NEW: Effect to measure header height after it renders
  useEffect(() => {
    if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // --- Nav pointer movement (no changes) ---
  useEffect(() => {
    if (!sliderNavRef.current || !navPointerRef.current) return;
    const sliderHeight = sliderNavRef.current.clientHeight;
    const pointerHeight = navPointerRef.current.offsetHeight;
    const newTop = (currentSectionIndex / (sectionsData.length - 1)) * (sliderHeight - pointerHeight);
    navPointerRef.current.style.transition = "top 0.5s ease";
    navPointerRef.current.style.top = `${newTop}px`;
    const timeout = setTimeout(() => {
      if (navPointerRef.current) navPointerRef.current.style.transition = "";
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentSectionIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ perspective: "1000px" }}>
      {/* MODIFIED: Header styling and ref */}
      <div ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
        <Header />
      </div>
      {/* Background */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center filter blur-sm scale-110 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${sectionsData[currentSectionIndex]?.image})`,
        }}
      ></div>

      

      {/* Events Navigation Pointer */}
      <header className="relative z-40">
        <div ref={sliderNavRef} className="fixed top-[5%] right-[30px] md:right-[50px] h-[90%] w-1 bg-gray-800">
          <div ref={navPointerRef} className="absolute top-0 right-[-21px] w-11 h-6 bg-gray-800 text-white text-xs font-light flex items-center justify-center select-none">
            {currentSectionIndex + 1}/{sectionsData.length}
          </div>
        </div>
      </header>

      {/* MODIFIED: Main content with dynamic padding-top */}
      <main
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.section
            key={currentSectionIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 200 : -200, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction > 0 ? -200 : 200, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingTop: `${headerHeight}px` }} // Also apply padding here to recenter the absolute section
          >
            {/* Image card */}
            <div className="relative w-[80%] max-w-4xl h-[70%] rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${sectionsData[currentSectionIndex]?.image})`,
                }}
              ></div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full p-6">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {sectionsData[currentSectionIndex]?.title}
                </motion.h1>
                <motion.h2
                  className="text-2xl md:text-3xl font-light mt-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {sectionsData[currentSectionIndex]?.subtitle}
                </motion.h2>
                <motion.p
                  className="mt-6 text-lg md:text-xl max-w-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {sectionsData[currentSectionIndex]?.content}
                </motion.p>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EventsPage;