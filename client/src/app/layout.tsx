import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

// Konfigurasi DM Serif Display
const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"], 
  variable: "--font-dm-serif-display", 
  display: "swap", 
});

export const metadata: Metadata = {
  title: 'KKN-PPM UGM 2025 - Nyabang Batola',
  description: "KKN Tematik di Kawasan Transmigrasi Desa Cahaya Baru dan Sampurna",
  icons: {
    icon: "/Logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
