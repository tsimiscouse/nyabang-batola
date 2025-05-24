"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-custom flex justify-center items-center">
        <div
          className={`relative flex items-center justify-between w-full px-[50px] py-3 rounded-full mx-[20px] md:mx-0  
                      bg-white/20 backdrop-filter backdrop-blur-lg border border-white/30 
                      shadow-lg transition-all duration-300 ${
                        isScrolled ? "h-14" : "h-16"
                      }`}
        >
          {/* Left Section: Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Logo.png"
              alt="KKN-PPM UGM Nyabang Batola Logo"
              width={40}
              height={40}
              className="h-auto w-[20px] md:w-[35px]"
            />
          </Link>

          {/* Right Section: Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 text-white font-sans font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/profil"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                href="/publikasi"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Publikasi
              </Link>
            </li>
            <li>
              <Link
                href="/tim"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Tim
              </Link>
            </li>
            <li>
              <Link
                href="/peta"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Peta
              </Link>
            </li>
            <li>
              <Link
                href="/layanan-desa"
                className="hover:text-gray-200 transition-colors duration-200"
              >
                Layanan Desa
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-[calc(100%-2rem)] mx-4 bg-white/90 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg mt-2 transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden py-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 text-gray-800 font-sans font-medium">
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              href="/profil"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              href="/publikasi"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Publikasi
            </Link>
          </li>
          <li>
            <Link
              href="/tim"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Tim
            </Link>
          </li>
          <li>
            <Link
              href="/peta"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Peta
            </Link>
          </li>
          <li>
            <Link
              href="/layanan-desa"
              onClick={() => setIsOpen(false)}
              className="block py-2"
            >
              Layanan Desa
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
