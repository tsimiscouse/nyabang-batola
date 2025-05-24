export interface NavigationItem {
  name: string
  href: string
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
}

export interface LocationData {
  name: string
  type: 'desa' | 'kecamatan' | 'kabupaten'
  description: string
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface ThemeKKN {
  title: string
  description: string
  areas: string[]
}

export interface ParallaxConfig {
  speed: number
  direction: 'up' | 'down'
  breakpoint?: number
}