import React from 'react';
import { motion } from 'framer-motion';

const CollaborationSection: React.FC = () => {
  return (
    <section className="collaboration-section relative py-20 bg-gradient-to-b from-teal-800 to-teal-900 text-white">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-repeat-x opacity-30"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
             }}></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-repeat-x opacity-30"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
             }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            data-aos="fade-up"
          >
            In Collaboration With
          </h2>
        </motion.div>
        
        {/* Ministry Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl w-full">
            <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500">Kementerian Transmigrasi Logo</span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">KEMENTERIAN</h3>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">TRANSMIGRASI</h3>
              <p className="text-gray-600 font-medium">KESEJAHTERAAN UNTUK SEMUA</p>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Section with Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Project Logo and Info */}
          <div className="flex items-center space-x-6">
            <motion.div 
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">NB</span>
              </div>
            </motion.div>
            
            <div>
              <p className="text-sm text-gray-300 mb-1">KKN-PPM UGM 2025</p>
              <h3 className="text-3xl font-bold mb-2">Nyabang Batola</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="font-semibold">Melangkah</span> dalam asa. <span className="font-semibold">Melebur</span> dalam karya.<br />
                <span className="font-semibold">Memberi</span> cahaya di <span className="font-semibold">Barito Kuala</span>.
              </p>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4 text-right"
          >
            {['Tim', 'Peta', 'Publikasi', 'Layanan Desa'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-lg hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                whileHover={{ x: -10 }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationSection;