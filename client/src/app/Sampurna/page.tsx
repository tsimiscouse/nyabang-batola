"use client";

import Header from "@/components/sampurna/Header";
import HeroSection from "@/components/sampurna/HeroSection";
import Footer from "@/components/sampurna/Footer";
import { Timeline } from "@/components/sampurna/Timeline";
import FadeSection from "@/components/sampurna/FadeSection";
import React from "react";
import ArticleCarousel from "@/components/sampurna/ArticleCarousel";

export default function LandingPageSampurna() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header tetap di atas */}
      <header className="absolute  top-0 left-0 w-full z-20 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center text-white bg-transparent">        <Header />
      </header>

      {/* Konten scrollable dengan scroll snap */}
      <main className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {/* <FadeSection> */}
          <section className="h-screen w-full relative flex items-center justify-center">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/sampur-drone-sunset.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay */} 
            {/* <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" /> */}

            {/* Konten di atas video */}
            <div className="relative z-10">
              <HeroSection />
            </div>
          </section>


          <section className="min-h-screen w-full bg-black text-white flex items-center justify-center">
            <div className="max-w-4xl px-4">
              <FadeSection>
                <div className="pt-24">
                  <h2 className="text-8xl md:text-7xl font-bold mb-6 text-center">Sejarah Desa</h2>
                </div>
              </FadeSection>
                <Timeline />
            </div>
          </section>

          <section className="min-h-screen w-full bg-[#111] text-white">
            {/* Sticky Title */}
            <FadeSection>
              <div className="sticky pt-24 pb-12">
                <h2 className="text-5xl md:text-7xl font-bold text-center">Our Activity</h2>
              </div>
            </FadeSection>

            {/* Scrollable Content */}
            <div className="text-center px-4 pb-20">
              <FadeSection>
                <ArticleCarousel />
              </FadeSection>
              {/* Tambahan konten di bawah jika diperlukan */}
              {/* <FadeSection>
                <p className="text-lg opacity-80">Konten tambahan di sini.</p>
              </FadeSection> */}
            </div>
          </section>

      </main>

      {/* Footer tetap di bawah */}
      <footer className="z-20">
        <Footer />
      </footer>
    </div>
  );
}
