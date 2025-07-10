'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

type Article = {
  id: number;
  title: string;
  image: string;
};

const articles: Article[] = [
  { id: 1, title: 'Contoh Artikel 1', image: '/images/bg_sampur.png' },
  { id: 2, title: 'Contoh Artikel 2', image: '/images/contoh_artikel.jpeg' },
  { id: 3, title: 'Contoh Artikel 3', image: '/images/contoh_artikel.jpeg' },
  { id: 4, title: 'Contoh Artikel 4', image: '/images/contoh_artikel.jpeg' },
  { id: 5, title: 'Contoh Artikel 5', image: '/images/contoh_artikel.jpeg' },
];

export default function ArticleCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Autoplay, Pagination, EffectCoverflow]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="coverflow"
        centeredSlides
        loop
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        slidesPerView="auto"
        spaceBetween={70}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        className="py-12"
      >
        {articles.map((article) => (
          <SwiperSlide
            key={article.id}
            style={{ width: '600px' }}
            className="relative rounded-xl overflow-hidden group shadow-xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-300 z-10" />
            <div className="absolute top-6 left-0 right-0 text-center text-white text-2xl md:text-3xl font-bold z-20">
              {article.title}
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                Baca Artikel
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="swiper-pagination !mt-6 !text-white !relative z-20" />

      {/* Custom Navigation Button di bawah */}
      <div className="flex justify-center mt-4 space-x-6 z-20 relative">
        <button
          onClick={() => (document.querySelector('.swiper') as any)?.swiper?.slidePrev()}
          className="text-white text-4xl hover:text-gray-300 transition"
        >
          ‹
        </button>
        <button
          onClick={() => (document.querySelector('.swiper') as any)?.swiper?.slideNext()}
          className="text-white text-4xl hover:text-gray-300 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
