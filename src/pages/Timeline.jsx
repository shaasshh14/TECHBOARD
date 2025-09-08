// src/pages/Timeline.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

// Data for the timeline events
const timelineEvents = [
  {
    year: "1936",
    title: "Ski Boots With Laces",
    description:
      "Hans Wagner's nephew, Sepp Wagner, who is later to become managing director, starts in his uncle's factory and learns the art of handcrafted shoemaking...",
    image: "https://placehold.co/400x300/4F46E5/ffffff?text=1936",
  },
  {
    year: "1964",
    title: "High Alpine",
    description:
      "Sepp Wagner produces the first ever ski boot for ski touring - complete with inner boot and buckle closure...",
    image: "https://placehold.co/400x300/F59E0B/ffffff?text=1964",
  },
  {
    year: "1996",
    title: "High-Flyers",
    description:
      "Hans-Georg develops the first ever specialist paragliding boot, again with Sepp Gschwendtner...",
    image: "https://placehold.co/400x300/22C55E/ffffff?text=1996",
  },
  {
    year: "2013",
    title: "More Toe Room",
    description:
      "With its unique Bunion last, Hanwag starts making shoes for people with bunions...",
    image: "https://placehold.co/400x300/EF4444/ffffff?text=2013",
  },
  {
    year: "2021",
    title: "Big Birthday",
    description:
      "In Hanwag's 100th anniversary year, the company plans to make some 400,000 pairs of boots...",
    image: "https://placehold.co/400x300/6366F1/ffffff?text=2021",
  },
];

// TimelineCard component
const TimelineCard = ({ event, isLeft }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // animation for each card
  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateY(0px) scale(1)"
      : "translateY(60px) scale(0.95)",
    config: { mass: 1, tension: 220, friction: 30 },
    delay: isLeft ? 100 : 200, // stagger left/right
  });

  return (
    <div
      ref={ref}
      className={`relative my-8 md:my-16 flex ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      <div
        className={`md:w-1/2 flex items-center ${
          isLeft ? "md:pr-16" : "md:pl-16"
        }`}
      >
        <animated.div
          style={props}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full"
        >
          <div
            className={`flex flex-col ${
              isLeft ? "md:flex-row" : "md:flex-row-reverse"
            } items-center`}
          >
            <div className="w-full md:w-1/2 p-2">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto rounded-lg mb-4 md:mb-0 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-1/2 p-2">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {event.description}
              </p>
            </div>
          </div>
        </animated.div>
      </div>
      {/* Red dot in center line */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-600 z-10"></div>
    </div>
  );
};

// Main Timeline component
const Timeline = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top;
        const totalHeight = containerRef.current.clientHeight;
        const scrollPosition = window.innerHeight - top;
        const progress = (scrollPosition / totalHeight) * 100;
        setLineHeight(Math.min(Math.max(0, progress), 100));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto py-12 md:py-16 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center  mb-8 md:mb-16">
          100 Years of Hanwag
        </h1>
        <div
          ref={containerRef}
          className="relative md:flex md:flex-col items-center"
        >
          {/* Static gray line */}
          <div className="hidden md:block absolute left-1/2 w-1 bg-red-200 h-full transform -translate-x-1/2 z-0"></div>
          {/* Animated red line */}
          <div
            className="hidden md:block absolute left-1/2 w-1 bg-red-600 transform -translate-x-1/2 z-10 transition-all duration-300"
            style={{ height: `${lineHeight}%` }}
          ></div>

          {timelineEvents.map((event, index) => (
            <div key={index} className="relative w-full">
              {/* Year labels */}
              <div
                className={`absolute hidden md:block top-1/2 -translate-y-1/2 text-7xl font-bold text-gray-300 transition-all duration-500 ${
                  index % 2 === 0
                    ? "left-1/2 -translate-x-[200px]"
                    : "right-1/2 translate-x-[200px]"
                }`}
              >
                {event.year}
              </div>
              <TimelineCard event={event} isLeft={index % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
