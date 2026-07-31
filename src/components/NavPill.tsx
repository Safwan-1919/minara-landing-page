'use client'

import { useState, useEffect } from 'react'
import SpecularBorder from './SpecularBorder'
import { useAppStore } from '@/lib/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact-faq' },
]

export default function NavPill() {
  const [menuOpen, setMenuOpen] = useState(false)
  const loaderDone = useAppStore((s) => s.loaderDone)
  const [entered, setEntered] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

  useEffect(() => {
    if (!loaderDone) return
    const timer = setTimeout(() => setEntered(true), 300)
    return () => clearTimeout(timer)
  }, [loaderDone])

  const menuTransform = menuOpen
    ? 'translateX(-50%)'
    : `translateX(calc(50vw - clamp(40px, 4vw, 56px) - 100%))`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 2vw, 28px)',
        left: '50%',
        zIndex: 100,
        pointerEvents: 'auto',
        willChange: 'transform',
        opacity: entered ? 1 : 0,
        transform: entered ? menuTransform : `translateX(calc(50vw - clamp(40px, 4vw, 56px) - 100% + 40px))`,
        transition: entered
          ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'none',
      }}
    >
      <SpecularBorder>
        <div style={{
          background: '#000',
          borderRadius: '100px',
          padding: menuOpen ? 'clamp(4px, 0.4vw, 6px) clamp(4px, 0.5vw, 8px)' : 'clamp(2px, 0.15vw, 3px) clamp(5px, 0.6vw, 8px)',
          display: 'flex',
          alignItems: 'center',
          gap: menuOpen ? '0' : 'clamp(4px, 0.5vw, 8px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {!menuOpen && !logoHovered && (
            <div
              style={{
                width: 'clamp(20px, 2.5vw, 34px)',
                height: 'clamp(20px, 2.5vw, 34px)',
                backgroundColor: '#F7E9D2',
                WebkitMaskImage: 'url(/logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
                overflow: 'hidden',
                flexShrink: 0,
              }}
              onMouseEnter={() => setLogoHovered(true)}
            />
          )}
          {!menuOpen && logoHovered && (
            <img
              src="/logo.png"
              alt="Logo"
              onMouseLeave={() => setLogoHovered(false)}
              style={{
                width: 'clamp(20px, 2.5vw, 34px)',
                height: 'clamp(20px, 2.5vw, 34px)',
                objectFit: 'contain',
                opacity: 1,
                flexShrink: 0,
              }}
            />
          )}
          {menuOpen && !logoHovered && (
            <div
              style={{
                width: 'clamp(24px, 3vw, 40px)',
                height: 'clamp(24px, 3vw, 40px)',
                backgroundColor: '#F7E9D2',
                WebkitMaskImage: 'url(/logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                opacity: 0.7,
                flexShrink: 0,
              }}
              onMouseEnter={() => setLogoHovered(true)}
            />
          )}
          {menuOpen && logoHovered && (
            <img
              src="/logo.png"
              alt="Logo"
              onMouseLeave={() => setLogoHovered(false)}
              style={{
                width: 'clamp(24px, 3vw, 40px)',
                height: 'clamp(24px, 3vw, 40px)',
                objectFit: 'contain',
                opacity: 1,
                flexShrink: 0,
              }}
            />
          )}
          <span style={{
            width: '1px',
            height: 'clamp(10px, 1.2vw, 16px)',
            background: 'rgba(255,255,255,0.15)',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.3s ease',
            flexShrink: 0,
          }} />
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'rgba(247,233,210,0.7)',
                fontSize: 'clamp(10px, 1vw, 14px)',
                fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                fontWeight: 500,
                lineHeight: 1,
                margin: 0,
                cursor: 'pointer',
                padding: '0 clamp(4px, 0.5vw, 8px) 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease',
                animation: 'chevronPulse 2s ease-in-out infinite',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F7E9D2' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(247,233,210,0.7)' }}
            >
              {'<'}
            </button>
          )}
          {menuOpen && NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector(link.href)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => ScrollTrigger.refresh(), 600)
                }
                setMenuOpen(false)
              }}
              style={{
                padding: 'clamp(6px, 0.8vw, 10px) clamp(12px, 1.5vw, 22px)',
                fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(0.6rem, 0.8vw, 0.82rem)',
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                borderRadius: '100px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 0.3s ease ${i * 0.05 + 0.15}s, background 0.2s ease, color 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'
                ;(e.target as HTMLAnchorElement).style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.background = 'transparent'
                ;(e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)'
              }}
            >
              {link.label}
            </a>
          ))}
          {menuOpen && (
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(247,233,210,0.7)',
                fontSize: 'clamp(12px, 1.2vw, 18px)',
                fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                fontWeight: 500,
                lineHeight: 1,
                cursor: 'pointer',
                padding: '0 clamp(6px, 0.8vw, 10px) 0 clamp(20px, 2.2vw, 30px)',
                animation: 'chevronPulseLeft 2s ease-in-out infinite',
                transition: 'color 0.2s ease',
                opacity: menuOpen ? 1 : 0,
                transitionDelay: '0.3s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F7E9D2' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(247,233,210,0.7)' }}
            >
              {'>'}
            </button>
          )}
        </div>
      </SpecularBorder>
    </div>
  )
}
