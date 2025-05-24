'use client'
import { useParallax } from '@/hooks/useParallax'
import { ReactNode } from 'react'

interface ParallaxContainerProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxContainer({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxContainerProps) {
  const offset = useParallax(speed)
  
  return (
    <div 
      className={`parallax-element ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  )
}