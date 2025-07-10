// components/sampurna/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="absolute bottom-4 left-4 z-10 flex items-center gap-4 text-white">
      <img src="/logo.png" alt="KKN Logo" className="w-10 h-10" />
      <div>
        <p className="text-sm font-semibold">KKN–PPM UGM 2025</p>
        <p className="text-sm">Nyabang Batola</p>
      </div>
    </footer>
  );
}
