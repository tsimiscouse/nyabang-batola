'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const trackLength = documentHeight - windowHeight
      const progress = Math.min(scrollTop / trackLength, 1)
      setScrollProgress(progress)
    }

    calculateScrollProgress()
    window.addEventListener('scroll', calculateScrollProgress)
    return () => window.removeEventListener('scroll', calculateScrollProgress)
  }, [])

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-600 origin-left z-50"
        style={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Scroll Percentage */}
      <motion.div
        className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: scrollProgress > 0.05 ? 1 : 0,
          scale: scrollProgress > 0.05 ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary-600"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress * 100}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </motion.div>
    </>
  )
}