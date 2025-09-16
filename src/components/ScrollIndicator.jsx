// ScrollIndicator.jsx
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white z-50"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <p className="text-sm opacity-80 mb-2">Scroll to turn page</p>
      <ChevronDown className="w-6 h-6 opacity-80" />
    </motion.div>
  );
};

export default ScrollIndicator;
