"use client";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showAboutSection, setShowAboutSection] = useState(false);

  const handleSmoothScroll = () => {
    setIsScrolling(true);
    const zoomStartScroll = viewportHeight * 2.5;
    const duration = 5000;
    const startTime = performance.now();
    const startPosition = window.scrollY;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const easedProgress = easeInOutCubic(progress);
      const targetPosition = zoomStartScroll + viewportHeight * 0.8;

      window.scrollTo(
        0,
        startPosition + (targetPosition - startPosition) * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsScrolling(false);
        // Show about section after scroll animation completes
        setTimeout(() => {
          setShowAboutSection(true);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Show about section when user scrolls past certain point
      const aboutTriggerPoint = viewportHeight * 3.2;
      if (scrollY > aboutTriggerPoint && !showAboutSection) {
        setShowAboutSection(true);
      }
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportHeight, showAboutSection, scrollY]);

  let scale = 1;
  let imageOpacity = 1;
  const heroSectionTotalHeight = viewportHeight * 2.8;
  const zoomStartScroll = viewportHeight * 2;

  if (viewportHeight > 0 && scrollY > zoomStartScroll) {
    const scrollAfterZoomStart = scrollY - zoomStartScroll;
    const maxScrollForZoomEffect =
      heroSectionTotalHeight - zoomStartScroll - viewportHeight;
    const zoomDurationScroll = Math.max(
      viewportHeight,
      maxScrollForZoomEffect * 0.75
    );

    const zoomProgress = Math.min(1, scrollAfterZoomStart / zoomDurationScroll);

    const targetScale = 1.5;
    scale = 1 + zoomProgress * (targetScale - 1);
    imageOpacity = 1 - zoomProgress;
  }

  // Calculate separate opacity for text and button
  const textOpacity = Math.max(0, 1 - scrollY / 1080);
  const buttonOpacity = Math.max(0, 1 - scrollY / 350); // Button fades out earlier

  return (
    <>
      <div className="relative h-[280vh] overflow-hidden">
        <span className="absolute inset-0 z-50">
          <Image
            src="/images/motifAtas.png"
            alt="Latar belakang hero section"
            width={1920}
            height={600}
          />
        </span>
        <div className="absolute h-screen inset-0 bg-gradient-to-br from-[#224B39] via-[#3A6F58] to-[#FEA443]" />

        <div
          className="absolute top-[35vh] left-0 right-0 flex flex-col items-center justify-center text-white z-10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="text-center px-4">
            <p
              className="text-lg md:text-3xl font-semibold text-shadow font-plus-jakarta-sans tracking-wider"
              style={{ opacity: textOpacity }}
            >
              KKN-PPM UGM 2025
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-dm-serif-display font-bold text-shadow mb-4 leading-tight"
              style={{ opacity: textOpacity }}
            >
              Nyabang Batola
            </h1>
          </div>
        </div>

        <div className="absolute z-50 top-[55vh] left-0 right-0 flex flex-col items-center justify-center text-white">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative z-50"
            style={{ opacity: buttonOpacity }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!isScrolling) {
                  handleSmoothScroll();
                }
              }}
              className="z-50 mt-3 inline-flex items-center px-6 py-3 md:px-8 md:py-3 text-base md:text-sm text-white font-plus-jakarta-sans font-normal rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                  bg-gradient-to-br from-[#224B39] to-[#267D3D] hover:from-[#267D3D] hover:to-[#224B39] shadow-lg disabled:opacity-50"
              disabled={isScrolling}
            >
              Lihat Cerita Kami 👇
            </button>
          </motion.div>
        </div>
        <div
          className="absolute top-[50vh] left-0 right-0 bottom-0 z-20"
          style={{
            transform: `translateY(${scrollY * 0.1}px) scale(${scale})`,
            transformOrigin: "center 20%",
            opacity: imageOpacity,
          }}
        >
          <Image
            src="/images/river1.png"
            alt="Pemandangan sungai di Nyabang Batola dengan efek parallax"
            width={1920}
            height={1080}
            priority
            className="object-cover w-full h-auto md:h-full"
          />
        </div>
        {/* Tentang Nyabang Section */}
        <motion.section
          className="relative min-h-screen top-[60%] flex items-center justify-center py-20"
          initial={{ opacity: 0.8 }}
          animate={showAboutSection ? { opacity: 1 } : { opacity: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#FEA443] rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={showAboutSection ? "animate" : "initial"}
              className="text-white"
            >
              {/* Header with Icon */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center justify-center mb-12"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-lg flex items-center justify-center">
                    <Image
                      src="/images/motifText.png"
                      alt="Tentang Nyabang Icon"
                      width={32}
                      height={32}
                    />
                  </div>
                  <motion.h2
                    variants={fadeInRight}
                    className="text-4xl md:text-5xl lg:text-6xl font-dm-serif-display font-bold"
                  >
                    Tentang Nyabang
                  </motion.h2>
                </div>
              </motion.div>

              {/* Orange accent line */}
              <motion.div
                variants={fadeInLeft}
                className="w-24 h-1 bg-[#FEA443] mb-12 mx-auto"
              ></motion.div>

              {/* Main content */}
              <motion.div variants={fadeInUp} className="space-y-8">
                <motion.h3
                  variants={fadeInLeft}
                  className="text-2xl md:text-3xl font-bold font-plus-jakarta-sans mb-6 text-center"
                >
                  Tema Tim KS02 KKN-PPM UGM 2025
                </motion.h3>

                <motion.div
                  variants={fadeInRight}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl"
                >
                  <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-xl leading-relaxed font-plus-jakarta-sans text-gray-100"
                  >
                    KKN Tematik di Kawasan Transmigrasi{" "}
                    <span className="font-bold text-[#FEA443]">
                      Desa Cahaya Baru dan Sampurna
                    </span>
                    , Kecamatan Jejangkit, Kabupaten Barito Kuala: Akselerasi
                    Pengembangan Desa melalui Inovasi Digital, Sanitasi
                    Lingkungan, Kesehatan Komunitas, Pemberdayaan Sosio-ekonomi,
                    dan Ketahanan Agroekologi.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center mt-16"
              >
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#FEA443] rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-[#FEA443] rounded-full animate-pulse delay-200"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#FEA443] rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-6 h-6 bg-white rounded-full opacity-40"
            animate={{
              y: [0, -30, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.section>
      </div>
    </>
  );
}
