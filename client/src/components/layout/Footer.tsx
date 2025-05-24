import Image from "next/image";
import Link from "next/link";

export default function FooterExactMatch() {
  return (
    <footer className="bg-[#224B39] text-white relative overflow-hidden py-10 md:py-16">
      {/* Top Border Pattern */}
      <div
        className="absolute top-0 left-0 w-full h-[30px] mt-4 z-0"
        style={{
          backgroundImage: `url('/images/pattern-top.png')`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top center",
        }}
      >
      </div>

      {/* Main Content Area */}
      <div className="container-custom flex flex-col md:flex-row items-center md:items-start justify-between relative z-10 mt-12 px-4 md:px-0">
        {/* Left Section: Logo, Title, Slogan */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 md:mb-0">
          <Link href="/" className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <Image
              src="/Logo.png"
              alt="Logo KKN-PPM UGM Nyabang Batola"
              width={150}
              height={150}
              className="h-auto"
            />
          </Link>
          <div className="text-center md:text-left">
            <p className="text-sm font-medium font-sans text-white uppercase tracking-wider">
              KKN-PPM UGM 2025
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Nyabang Batola
            </h1>
            <span className="inline-block w-[250px] h-[5px] md:w-[330px] md:h-[5px] bg-[#E11E00] text-sm font-medium" />
            <p className="text-base md:text-lg font-sans hidden md:block">
              <span className="font-bold">Melangkah</span> dalam asa.{" "}
              <span className="font-bold">Melebur</span> dalam karya.
            </p>
            <p className="text-base md:text-lg font-sans hidden md:block">
              Memberi cahaya di <span className="font-bold">Barito Kuala.</span>
            </p>
          </div>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="flex-shrink-0">
          <ul className="flex flex-col justify-center items-center md:justify-end md:items-end space-y-2 text-lg font-sans font-medium text-gray-300">
            <li>
              <Link
                href="/tim"
                className="hover:text-white transition-colors duration-200"
              >
                Tim
              </Link>
            </li>
            <li>
              <Link
                href="/peta"
                className="hover:text-white transition-colors duration-200"
              >
                Peta
              </Link>
            </li>
            <li>
              <Link
                href="/publikasi"
                className="hover:text-white transition-colors duration-200"
              >
                Publikasi
              </Link>
            </li>
            <li>
              <Link
                href="/layanan-desa"
                className="hover:text-white transition-colors duration-200"
              >
                Layanan Desa
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
