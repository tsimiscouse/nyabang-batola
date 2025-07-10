"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  year: string;
  title: string;
  description: string;
};

export const TimelineItem: React.FC<Props> = ({ year, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex w-full h-full items-center justify-center px-6 md:px-20 gap-16 transition-all duration-700"
    >
      {/* Left: Timeline line and dot */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="h-[80vh] w-[2px] bg-gray-600 relative" />

        {/* Animated Dot */}
        <div
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-all duration-500",
            isVisible && "scale-150 bg-green-400 shadow-lg"
          )}
        />
      </div>

      {/* Right: Fade + Zoom on visibility */}
      <div
        className={clsx(
          "flex-1 max-w-4xl transition-all duration-700",
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        )}
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-4">{title}</h3>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{description}</p>
        <div className="mt-6 text-white text-3xl font-semibold">{year}</div>
      </div>
    </div>
  );
};