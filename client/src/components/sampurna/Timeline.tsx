"use client";

import React from "react";
import { TimelineItem } from "./TimelineItem";

const timelineEvents = [
  {
    year: "1965",
    title: "Cikal Bakal Desa Sampurna",
    description:
      "Sekelompok masyarakat dari Kabupaten Banjar membuka hutan menjadi ladang. Sampurna masih menjadi bagian dari Desa Pantai Hambawang di bawah pimpinan Bapak Mukri, dilanjutkan oleh Bapak Kadri (Pambakal Ikat). Pemerintahan lokal hanya dipimpin oleh Kepala Padang, yaitu Anang Basar.",
  },
  {
    year: "1971",
    title: "Resmi Menjadi Desa",
    description:
      "Sampurna resmi menjadi desa mandiri. H. Hamlan menjadi kepala desa pertama, memimpin 6 RT dan 3 RW. Beliau hanya menjabat satu periode karena kalah dalam pemilihan berikutnya",
  },
  {
    year: "1979",
    title: "Pergantian Kepemimpinan",
    description:
      "H. Yamani menggantikan H. Hamlan namun mengundurkan diri sebelum masa jabatan habis dan pindah ke Palangkaraya untuk berdagang. Pemerintahan diambil alih pihak kecamatan oleh Manisa Ibad selama 3 tahun.",
  },
  {
    year: "1989",
    title: "Era H. Murjani (Pambakal Imur)",
    description:
      "H. Murjani terpilih sebagai calon tunggal dan memimpin hingga 18 tahun. Masa kepemimpinan ini menyaksikan kemajuan infrastruktur, pendidikan, ekonomi, dan kesehatan. Jumlah penduduk meningkat terutama karena program transmigrasi tahun 2004.",
  },
  {
    year: "2004",
    title: "Kecamatan Jejangkit Lahir",
    description:
      "Kecamatan Mandastana dimekarkan menjadi Kecamatan Jejangkit. Sampurna menjadi salah satu dari 7 desa di bawah kecamatan baru. Saat itu desa sudah berkembang menjadi 9 RT dan 4 RW.",
  },
  {
    year: "2008",
    title: "Pemilihan Kepala Desa Ke-4",
    description:
        "Pemilihan diikuti oleh Junaidi, Mukhtar, dan Jayadi. Mukhtar terpilih sebagai Kepala Desa dan mulai menata ulang pemerintahan desa. Sekretaris Desa saat itu Abdullah Sani digantikan oleh Akhmad Mujahit, lalu oleh Wardani setelah wafatnya Akhmad."
  },
  {
    year: "2014",
    title: "Masa Transisi",
    description:
        "Setelah masa jabatan Mukhtar berakhir, Bapak Said Muhammad, S.Pd dari kecamatan ditunjuk sebagai PLT Kepala Desa hingga pemilihan berikutnya."
  },
  {
    year: "2015",
    title: "Mukhtar Terpilih Kembali",
    description:
        "Mukhtar kembali terpilih untuk periode kedua (2015–2021). Ia menyusun RPJMDesa 2015–2021 dan membawa berbagai kemajuan infrastruktur dan layanan publik, meski menghadapi tantangan seperti penurunan kesuburan lahan akibat kebakaran."
  },
  {
    year: "2015 - 2021",
    title: "Strategi Pertanian dan Perubahan RPJMDesa",
    description:
        "Pemerintah desa menyusun langkah untuk mengatasi penurunan lahan produktif dengan mengklasifikasikan lahan potensial, mengintensifkan pertanian, dan mengalihkan lahan tidak potensial ke sektor perkebunan. RPJMDesa disesuaikan dengan UU No. 6 Tahun 2014 tentang Desa."
  },
  {
    year: "Sekarang",
    title: "Desa Mandiri yang Terus Berkembang",
    description:
        " Desa Sampurna telah berusia lebih dari 40 tahun dan menjadi desa mandiri. Harapannya dapat terus berkembang dari berbagai aspek pembangunan seperti infrastruktur, ekonomi, dan kualitas hidup warganya."
  },
];

export const Timeline = () => {
  return (
    <section className="w-full h-screen bg-black text-white overflow-hidden">
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {timelineEvents.map((event, idx) => (
          <div
            key={idx}
            className="snap-start h-screen flex items-center justify-center"
          >
            <TimelineItem {...event} />
          </div>
        ))}
      </div>
    </section>
  );
};
 