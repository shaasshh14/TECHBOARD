import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute top-1/2 right-4 -translate-y-1/2 flex-col items-center text-white z-50 hidden lg:flex"
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <p className="text-sm opacity-80 mb-2 [writing-mode:vertical-rl]">
        Scroll for more
      </p>
      <ChevronRight className="w-8 h-8 opacity-80" />
    </motion.div>
  );
};

export default ScrollIndicator;