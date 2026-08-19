import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedHeader() {
  const words = [
    "Tech Ventures",
    "Digital Products",
    "Web Experiences",
    "Modern Platforms",
    "SaaS Solutions",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="inline-block text-gray-300"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
