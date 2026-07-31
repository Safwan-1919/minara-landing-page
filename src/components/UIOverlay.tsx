'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'

function useProgress() {
  const progress = useAppStore((s) => s.progress)
  return progress
}

function FadeInGroup({ children, start, duration, className = '' }: {
  children: React.ReactNode
  start: number
  duration: number
  className?: string
}) {
  const progress = useProgress()
  const opacity = Math.max(0, Math.min(1, (progress - start) / duration))
  const y = 30 * (1 - opacity)

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        transition: 'none',
      }}
    >
      {children}
    </div>
  )
}

export default function UIOverlay() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="ui-overlay">
      {/* Navbar */}
      <FadeInGroup start={0.0} duration={0.1} className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="moshi-text text-[#d4a853] text-xl tracking-[0.3em]">MINARA</div>
        <div className="flex gap-8 text-sm tracking-widest text-white/70">
          <button className="hover:text-[#d4a853] transition-colors">PRAYER</button>
          <button className="hover:text-[#d4a853] transition-colors">EVENTS</button>
          <button className="hover:text-[#d4a853] transition-colors">DONATE</button>
        </div>
      </FadeInGroup>

      {/* Hero text */}
      <FadeInGroup start={0.0} duration={0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="moshi-text text-5xl md:text-7xl text-white tracking-[0.15em] leading-relaxed">
          A Sacred Space
        </h1>
        <p className="text-white/50 text-sm tracking-[0.3em] mt-4">
          SCROLL TO EXPLORE
        </p>
      </FadeInGroup>

      {/* Mosque intro text - fades in during transition */}
      <FadeInGroup start={0.45} duration={0.15} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="moshi-text text-4xl md:text-6xl text-[#d4a853] tracking-[0.1em]">
          Welcome to Minara
        </h2>
        <p className="text-white/60 text-sm tracking-[0.2em] mt-3 max-w-md mx-auto">
          A place of peace, community, and timeless beauty
        </p>
      </FadeInGroup>

      {/* Info cards - appear near the end */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <FadeInGroup start={0.7} duration={0.15}>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10">
            <div className="text-[#d4a853] text-2xl mb-2">🕌</div>
            <h3 className="text-white text-sm tracking-widest mb-1">PRAYER TIMES</h3>
            <p className="text-white/40 text-xs">Fajr &mdash; 5:12 AM</p>
            <p className="text-white/40 text-xs">Maghrib &mdash; 7:34 PM</p>
          </div>
        </FadeInGroup>
        <FadeInGroup start={0.75} duration={0.15}>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10">
            <div className="text-[#d4a853] text-2xl mb-2">📅</div>
            <h3 className="text-white text-sm tracking-widest mb-1">UPCOMING EVENTS</h3>
            <p className="text-white/40 text-xs">Community Iftar &mdash; Saturday</p>
            <p className="text-white/40 text-xs">Quran Study Circle &mdash; Sunday</p>
          </div>
        </FadeInGroup>
        <FadeInGroup start={0.8} duration={0.15}>
          <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10">
            <div className="text-[#d4a853] text-2xl mb-2">🤝</div>
            <h3 className="text-white text-sm tracking-widest mb-1">SUPPORT</h3>
            <p className="text-white/40 text-xs">Your donations help us serve the community</p>
            <button className="mt-3 text-[#d4a853] text-xs tracking-wider border border-[#d4a853]/30 px-4 py-1.5 rounded hover:bg-[#d4a853]/10 transition-all">
              DONATE NOW
            </button>
          </div>
        </FadeInGroup>
      </div>

      {/* Scroll indicator */}
      <FadeInGroup start={0.85} duration={0.1} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="text-white/30 text-xs tracking-[0.3em] animate-pulse">
          ✦ END ✦
        </div>
      </FadeInGroup>
    </div>
  )
}
