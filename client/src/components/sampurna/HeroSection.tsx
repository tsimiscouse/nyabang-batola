// components/sampurna/HeroSection.tsx
import React from "react";
import FadeSection from "./FadeSection";

export default function HeroSection() {
  return (
    <div className="w-full h-full text-white px-6 md:px-10 max-w-6xl text-left">
      <h1 className="text-4xl md:text-9xl font-extrabold leading-tight mb-4">
        <FadeSection>
            Desa Sampurna
        </FadeSection>
      </h1>
      <FadeSection>
        <p className="text-base md:text-lg leading-3">
            Sampurna adalah salah satu desa yang terletak di <strong>Kecamatan Jejangkit</strong>, Kabupaten <strong>Barito Kuala</strong>, Provinsi <strong>Kalimantan Selatan</strong>, <strong>Indonesia</strong>.
        </p>
      </FadeSection>
    </div>
  );
}
