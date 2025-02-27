import { motion } from "framer-motion";
import React from "react";

interface animateProps {
  text: string
}

const AnimatedUnderline: React.FC<animateProps> = ({ text }) => {
  return (
    <div className="relative inline-block">
      <span className="text-xl font-semibold">{text}</span>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedUnderline;
