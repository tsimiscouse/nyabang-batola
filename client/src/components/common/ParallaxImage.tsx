'use client'
import { useParallax } from '@/hooks/useParallax'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
}

export default function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.5, 
  className = '' 
}: ParallaxImageProps) {
  const offset = useParallax(speed)
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  )
}