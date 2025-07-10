"use client";

import { useScroll, useSpring } from "framer-motion";
import React, { useRef } from "react";
import ScrollFadeSection from "./ScrollFadeSection";

interface ScrollFadeSliderProps {
  children: React.ReactNode[];
}

export default function ScrollFadeSlider({ children }: ScrollFadeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] w-full overflow-hidden"
    >
      {children.map((child, index) => (
        <ScrollFadeSection
          key={index}
          index={index}
          total={children.length}
          scrollYProgress={smoothProgress}
        >
          {child}
        </ScrollFadeSection>
      ))}
    </div>
  );
}
