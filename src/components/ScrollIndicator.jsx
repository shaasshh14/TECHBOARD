import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ScrollIndicator = () => {
  const chevronVariants = {
    animate: (i) => ({
      x: [0, 10, 0], // The distance the chevron will travel
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.25, // Stagger the animation of each chevron
        duration: 2.0, // Make the animation last longer
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      className="absolute top-[15%] left-[45%] z-50 
                 hidden lg:flex items-center p-3 
                 bg-black/40 backdrop-blur-md rounded-full 
                 border border-white/20 shadow-lg pointer-events-none"
    >
      <span className="text-white text-base font-sans mr-4 ml-3">
        Scroll with Touchpad
      </span>
      <div className="flex items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={chevronVariants}
            animate="animate"
            style={{ x: -i * 10 }} // Offset them to appear in the same spot
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;