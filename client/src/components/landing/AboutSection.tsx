'use client'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight } from '@/utils/animations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { THEME_KKN } from '@/utils/constants'
import Image from 'next/image'

export default function AboutSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="tentang" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
          {/* Text Content */}
          <motion.div
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Tentang Nyabang
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                Tema KKN
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-gray-900">KKN Tematik di Kawasan Transmigrasi</span> 
                {' '}Desa Cahaya Baru dan Sampurna, Kecamatan Jejangkit, Kabupaten Barito Kuala:
              </p>
              
              <div className="space-y-3">
                {THEME_KKN.areas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={fadeInRight}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-bg.jpg"
                alt="Kegiatan KKN"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary-600">750</div>
                      <div className="text-xs text-gray-600">Hektare Lahan</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary-600">2</div>
                      <div className="text-xs text-gray-600">Desa Target</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary-600">5</div>
                      <div className="text-xs text-gray-600">Bidang Program</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
