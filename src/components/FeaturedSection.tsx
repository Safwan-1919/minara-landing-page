'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFloat from './ScrollFloat'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    gradient: 'linear-gradient(120deg, #fdf6f0 0%, #f0e6ff 35%, #e6f0ff 65%, #f0fdf6 100%)',
    text: 'CONNECTION BETWEEN MASJID & COMMUNITY',
  },
  {
    gradient: 'linear-gradient(200deg, #f5f0f8 0%, #f8f0f0 30%, #f0f5f8 60%, #f8f8f0 100%)',
    text: 'JAMATH MEMBERS GET ISLAMIC SPEECHES OF USTHAD AND SCHOLARS',
  },
  {
    gradient: 'linear-gradient(300deg, #f0faf5 0%, #faf0f5 40%, #f5f0fa 70%, #faf5f0 100%)',
    text: 'MASJID ANNOUNCEMENT SHARING',
  },
  {
    gradient: 'linear-gradient(160deg, #f8f5f0 0%, #f0f5f8 35%, #f8f0f5 65%, #f5f8f0 100%)',
    text: 'COLLECTION FOR DONATIONS AND OTHER FUNCTIONS',
  },
]

function Card({ gradient, text, index }: { gradient: string; text: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const tilt = useRef({ rx: 0, ry: 0, trx: 0, try: 0, hover: false })

  useEffect(() => {
    let raf: number
    const loop = () => {
      const s = tilt.current
      const el = cardRef.current
      if (!el) { raf = requestAnimationFrame(loop); return }
      s.rx += (s.trx - s.rx) * 0.15
      s.ry += (s.try - s.ry) * 0.15
      if (s.hover) {
        el.style.transform = `perspective(800px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(1.02)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={cardRef}
      data-card-index={index}
      onMouseMove={(e) => {
        const el = cardRef.current
        const g = glowRef.current
        if (!el || !g) return
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left, y = e.clientY - r.top
        tilt.current.trx = ((y - r.height / 2) / (r.height / 2)) * -5
        tilt.current.try = ((x - r.width / 2) / (r.width / 2)) * 5
        g.style.setProperty('--x', `${x}px`)
        g.style.setProperty('--y', `${y}px`)
      }}
      onMouseEnter={() => {
        tilt.current.hover = true
        if (glowRef.current) glowRef.current.style.opacity = '1'
        if (imageRef.current) imageRef.current.style.opacity = '1'
        if (textRef.current) textRef.current.style.opacity = '0'
      }}
      onMouseLeave={() => {
        tilt.current.hover = false
        tilt.current.trx = 0
        tilt.current.try = 0
        if (glowRef.current) glowRef.current.style.opacity = '0'
        if (imageRef.current) imageRef.current.style.opacity = '0'
        if (textRef.current) textRef.current.style.opacity = '1'
      }}
      style={{
        borderRadius: '32px',
        overflow: 'hidden',
        background: gradient,
        willChange: 'transform, opacity',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 2px 12px rgba(46,58,89,0.04), 0 0 60px rgba(46,58,89,0.02)',
        border: '1px solid rgba(255,255,255,0.5)',
        aspectRatio: '16 / 10',
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(/card${index + 1}.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: 'radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.2), transparent 60%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          borderRadius: 'inherit',
        }}
      />
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(24px, 3vw, 40px)',
          textAlign: 'center',
          transition: 'opacity 0.3s ease',
        }}
      >
        <ScrollFloat
          containerClassName="card-text"
          animationDuration={0.8}
          ease="back.inOut(2)"
          scrollStart="top 95%"
          scrollEnd="bottom bottom-=50%"
          stagger={0.02}
        >
          {text}
        </ScrollFloat>
      </div>
    </div>
  )
}

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const section = sectionRef.current
    const inner = innerRef.current
    if (!section || !inner) return

    const grid = gridRef.current
    if (!grid) return

    const cardEls = Array.from(grid.children) as HTMLElement[]
    cardEls.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'scale(0.6)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardEls.forEach((el, i) => {
              setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                el.style.opacity = '1'
                el.style.transform = 'scale(1)'
              }, i * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) return null

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#F0F1F5',
        minHeight: '100vh',
        padding: 'clamp(100px, 12vw, 180px) clamp(24px, 4vw, 64px) clamp(80px, 8vw, 120px)',
      }}
    >
      <div
        ref={innerRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          willChange: 'transform, opacity, filter',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '48px',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <ScrollFloat
            containerClassName="pf-heading"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top 90%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            Powerful Feature
          </ScrollFloat>
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.7rem, 0.75vw, 0.8rem)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(46,58,89,0.45)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '280px',
              textAlign: 'right',
            }}
          >
            Crafted experiences that blend sacred tradition with modern digital innovation.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(16px, 2vw, 32px)',
          }}
        >
          {cards.map((card, i) => (
            <Card key={i} gradient={card.gradient} text={card.text} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
