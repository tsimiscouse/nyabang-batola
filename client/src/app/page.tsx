"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ParallaxContainer from "@/components/landing/ParallaxContainer";
import LocationSection from "@/components/landing/LocationSection";
// import AboutSection from "@/components/landing/AboutSection";
// import LocationSection from "@/components/landing/LocationSection";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      // offset: 200,
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0F2D24]">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <ParallaxContainer>
            <div className="">
              <HeroSection />
            </div>
            {/* <div
              className="w-full h-[30px] z-0"
              style={{
                backgroundImage: `url('/images/pattern-top.png')`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "auto 100%",
                backgroundPosition: "top center",
              }}
            ></div> */}
            <div className="mb-[400vh]">
              <LocationSection scrollY={10} />
            </div>
          </ParallaxContainer>
        </main>

        <Footer />
      </div>
    </div>
  );
}
