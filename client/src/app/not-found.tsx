"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotFoundPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${offset * 0.2}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0F2D24] text-white overflow-hidden px-6 text-center">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full bg-[url('/images/404-pattern.svg')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none"
      />

      {/* Content */}
      <h1 className="text-6xl font-bold mb-4 z-10" data-aos="fade-down">
        404
      </h1>
      <p className="text-2xl mb-6 z-10" data-aos="fade-up">
        Halaman tidak ditemukan
      </p>
      <Link
        href="/"
        className="z-10 inline-block px-6 py-3 bg-white text-[#0F2D24] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
        data-aos="zoom-in"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
