"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface LocationSectionProps {
  scrollY: number;
}

export default function LocationSection({ scrollY }: LocationSectionProps) {
  const mapContainerParallaxY = Math.min(Math.max(scrollY * 0.03, -50), 50);
  const mapImageParallaxScale =
    1 + Math.min(Math.max(scrollY * 0.00005, -0.1), 0.1);
  const mapImageParallaxY = Math.min(Math.max(-scrollY * 0.015, -40), 40);

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 text-white bg-[#0F2D24] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#FEA443] rounded-full blur-3xl"
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-white rounded-full blur-3xl"
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {" "}
        {/* max-w-6xl untuk kontainer utama */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Grid container untuk teks dan peta */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
            {/* Kolom 1: Konten Teks (Header) */}
            <motion.div
              variants={fadeInUp}
              className="text-center md:text-left"
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
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-dm-serif-display font-bold py-5 items-center" // Ukuran font disesuaikan
                >
                  Lokasi KKN
                </motion.h2>
              </div>
              <motion.div
                variants={fadeInUp}
                className="w-28 h-1.5 bg-[#FEA443] mx-auto md:mx-0 mb-8"
              ></motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl font-plus-jakarta-sans font-medium text-gray-300 max-w-full md:max-w-md leading-relaxed mb-8"
              >
                KKN-PPM UGM 2025 dilaksanakan di dua desa yang menawan di
                Kecamatan Jejangkit, Kabupaten Barito Kuala, Kalimantan Selatan.
              </motion.p>
              {/* Dekorasi tambahan untuk kolom teks */}
              <motion.div
                variants={fadeInUp}
                className="flex md:justify-start justify-center"
              >
                <div className="p-3 bg-white/10 rounded-full inline-flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#FEA443]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>

            {/* Kolom 2: Peta Lokasi */}
            <motion.div variants={fadeInUp} className="relative w-full group">
              <motion.div
                className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] max-h-[600px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border-2 border-white/10 transition-all duration-500 ease-out group-hover:shadow-[-5px_-5px_30px_rgba(254,164,67,0.2),_5px_5px_30px_rgba(255,255,255,0.1)]"
                style={{
                  transform: `translateY(${mapContainerParallaxY}px)`,
                }}
              >
                {" "}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{
                    transform: `scale(${mapImageParallaxScale}) translateY(${mapImageParallaxY}px)`,
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Image
                      src="/images/LokasiKKN.png"
                      alt="Peta lokasi KKN menunjukkan Desa Cahaya Baru dan Sampurna di Kecamatan Jejangkit"
                      width={1920}
                      height={1080}
                      className="w-[90%] h-[90%] object-contain"
                      priority
                    />
                  </div>
                </motion.div>
                {/* Gradient overlay pada gambar DIHAPUS sesuai permintaan */}
              </motion.div>

              {/* Elemen dekoratif mengambang di sekitar peta */}
              <motion.div
                className="absolute -top-8 -left-8 w-20 h-20 bg-[#FEA443]/10 rounded-full blur-md opacity-70 hidden md:block"
                animate={{ y: [0, -15, 0], x: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/10 rounded-full blur-md opacity-60 hidden md:block"
                animate={{ y: [0, 20, 0], x: [0, -10, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
