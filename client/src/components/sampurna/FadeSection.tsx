"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 }); // still active on scroll

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full relative overflow-hidden"
    >
      {/* Sneak peek effect */}
      <div className="absolute -top-10 left-0 w-full h-20 bg-gradient-to-b from-transparent to-transparent z-10 pointer-events-none" />
      {children}
    </motion.div>
  );
}
