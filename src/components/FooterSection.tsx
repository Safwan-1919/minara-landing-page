'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const letters = [
  { char: 'M', y: -60 },
  { char: 'I', y: 50 },
  { char: 'N', y: -30 },
  { char: 'A', y: 40 },
  { char: 'R', y: -50 },
  { char: 'A', y: 30 },
]

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileScale, setMobileScale] = useState(1)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setIsMobile(w <= 600)
      if (w <= 600) {
        const scale = Math.max(0.42, Math.min(0.65, 0.65 * (w / 390)))
        setMobileScale(scale)
      }
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = brandRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const letterEls = el.querySelectorAll('.brand-letter')

      if (isMobile) {
        gsap.fromTo(
          letterEls,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
          }
        )
      } else {
        gsap.fromTo(
          letterEls,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <footer
      ref={sectionRef}
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 20,
        background: '#2A1F14',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 clamp(24px, 4vw, 64px) 40px',
        height: '100vh',
      }}
    >
      {/* Giant brand name — staggered up/down letters */}
      <div
        ref={brandRef}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          paddingTop: '5vh',
        }}
      >
        <div className="brand-letters-wrap" style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          ...(isMobile ? { transform: `scale(${mobileScale})`, transformOrigin: 'center center', marginTop: '-14vh', whiteSpace: 'nowrap' } : {}),
        }}>
          {letters.map((l, i) => (
            <span
              key={i}
              className="brand-letter"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(7rem, 20vw, 24rem)',
                lineHeight: 0.8,
                color: '#F7E9D2',
                display: 'inline-block',
                userSelect: 'none',
                transform: `translateY(${l.y}px)`,
                transition: 'color 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F7E9D2' }}
            >
              {l.char}
            </span>
          ))}
        </div>
      </div>

      {/* Curved text below the brand */}
      <svg
        viewBox="0 0 900 100"
        style={{
          width: 'clamp(300px, 55vw, 550px)',
          height: 'auto',
          marginTop: '-20px',
          marginBottom: '16px',
          overflow: 'visible',
        }}
      >
        <defs>
          <path
            id="curve"
            d="M 10 80 Q 450 5 890 80"
            fill="transparent"
          />
        </defs>
        <text
          style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '38px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            {'YOUR MASJID COMMUNITY'.split('').map((char, i) => (
              <tspan
                key={i}
                style={{ fill: '#F7E9D2', transition: 'fill 0.2s ease', cursor: 'default' }}
                onMouseEnter={(e) => { (e.target as SVGTSpanElement).style.fill = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as SVGTSpanElement).style.fill = '#F7E9D2' }}
              >
                {char}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>

      {/* Nav links */}
      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(20px, 3vw, 40px)',
          marginTop: '24px',
          marginBottom: '24px',
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F7E9D2',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F7E9D2' }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Bottom bar */}
      <div
        style={{
          width: '100%',
          borderTop: '1px solid rgba(247, 233, 210, 0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(247, 233, 210, 0.3)',
            margin: 0,
          }}
        >
          &copy; 2026 Minara. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(247, 233, 210, 0.3)',
            margin: 0,
          }}
        >
          Built with care for the Ummah
        </p>
      </div>
    </footer>
  )
}
