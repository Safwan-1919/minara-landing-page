'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/lib/store'
import SpecularBorder from './SpecularBorder'

export default function HeroSection() {
  const loaderDone = useAppStore((s) => s.loaderDone)
  const [visible, setVisible] = useState(false)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const islandRef = useRef<HTMLDivElement>(null)
  const globeSvgRef = useRef<SVGSVGElement>(null)
  const lockSvgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!loaderDone) return
    setVisible(true)

    const tagline = taglineRef.current
    const title = titleRef.current
    const steps = stepsRef.current
    const island = islandRef.current

    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'

    if (tagline) {
      tagline.style.opacity = '0'
      tagline.style.transform = 'translateX(-60px)'
      tagline.style.filter = 'blur(4px)'
      requestAnimationFrame(() => {
        tagline.style.transition = `opacity 0.8s ${ease}, transform 0.8s ${ease}, filter 0.8s ${ease}`
        tagline.style.opacity = '0.7'
        tagline.style.transform = 'translateX(0)'
        tagline.style.filter = 'blur(0)'
      })
    }

    if (title) {
      title.style.opacity = '0'
      title.style.transform = 'translateX(-80px)'
      title.style.filter = 'blur(6px)'
      setTimeout(() => {
        requestAnimationFrame(() => {
          title.style.transition = `opacity 1s ${ease}, transform 1s ${ease}, filter 1s ${ease}`
          title.style.opacity = '1'
          title.style.transform = 'translateX(0)'
          title.style.filter = 'blur(0)'
        })
      }, 150)
    }

    if (island) {
      island.style.opacity = '0'
      island.style.transform = 'translateX(40px)'
      setTimeout(() => {
        requestAnimationFrame(() => {
          island.style.transition = `opacity 0.7s ${ease}, transform 0.7s ${ease}`
          island.style.opacity = '1'
          island.style.transform = 'translateX(0)'
        })
      }, 300)
    }

    if (steps) {
      steps.style.opacity = '0'
      steps.style.transform = 'translateX(-60px)'
      steps.style.filter = 'blur(4px)'
      setTimeout(() => {
        requestAnimationFrame(() => {
          steps.style.transition = `opacity 0.8s ${ease}, transform 0.8s ${ease}, filter 0.8s ${ease}`
          steps.style.opacity = '1'
          steps.style.transform = 'translateX(0)'
          steps.style.filter = 'blur(0)'
        })
      }, 250)
    }
  }, [loaderDone])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 5,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        padding: '48px',
        alignSelf: 'flex-start',
      }}>
        <div
          ref={islandRef}
          style={{
            position: 'absolute',
            top: 'clamp(48px, 5vw, 64px)',
            right: 'clamp(40px, 4vw, 56px)',
            zIndex: 6,
            pointerEvents: 'auto',
          }}
        >
          <SpecularBorder>
            <div style={{
              background: '#000',
              borderRadius: '100px',
              padding: 'clamp(4px, 0.5vw, 7px)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
            }}>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: 'clamp(5px, 0.5vw, 7px)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg ref={globeSvgRef} width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                onMouseEnter={() => { if (globeSvgRef.current) globeSvgRef.current.style.stroke = '#2E3A59' }}
                onMouseLeave={() => { if (globeSvgRef.current) globeSvgRef.current.style.stroke = '#F7E9D2' }}
                style={{ stroke: '#F7E9D2', transition: 'stroke 0.2s ease' }}
              >
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>
            <span style={{
              width: '1px',
              height: 'clamp(10px, 1.2vw, 16px)',
              background: 'rgba(255,255,255,0.15)',
            }} />
            <button
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '100px',
                padding: 'clamp(5px, 0.5vw, 7px)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg ref={lockSvgRef} width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                onMouseEnter={() => { if (lockSvgRef.current) lockSvgRef.current.style.stroke = '#2E3A59' }}
                onMouseLeave={() => { if (lockSvgRef.current) lockSvgRef.current.style.stroke = '#F7E9D2' }}
                style={{ stroke: '#F7E9D2', transition: 'stroke 0.2s ease' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </button>
            </div>
           </SpecularBorder>
        </div>
        <div>
          <p
            ref={taglineRef}
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
              letterSpacing: '0.35em',
              color: '#F7E9D2',
              opacity: 0.7,
              marginBottom: 'clamp(4px, 0.8vw, 12px)',
              textTransform: 'uppercase',
              willChange: 'transform, opacity, filter',
            }}
          >
            {'YOUR MASJID CONNECTED DIGITALLY'.split('').map((char, i) => (
              <span
                key={i}
                style={{ transition: 'color 0.2s ease', cursor: 'default', pointerEvents: 'auto' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F7E9D2' }}
              >
                {char}
              </span>
            ))}
          </p>
          <h1
            ref={titleRef}
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 9rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.08em',
              textTransform: 'uppercase',
              color: '#F7E9D2',
              margin: 0,
              padding: 0,
              willChange: 'transform, opacity, filter',
              pointerEvents: 'auto',
            }}
          >
            {'MINARA'.split('').map((char, i) => (
              <span
                key={i}
                style={{ transition: 'color 0.2s ease', cursor: 'default' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#F7E9D2' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Stepped text — bottom left */}
        <div
          ref={stepsRef}
          style={{
            position: 'absolute',
            bottom: 'clamp(32px, 4vw, 56px)',
            left: 'clamp(24px, 4vw, 48px)',
            pointerEvents: 'auto',
            willChange: 'transform, opacity, filter',
          }}
        >
          <p style={{
            fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(247,233,210,0.5)',
            margin: 0,
            lineHeight: 1.4,
          }}>
            {'Manage'.split('').map((c, i) => (
              <span key={`m-${i}`} style={{ transition: 'color 0.2s ease', cursor: 'default' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '' }}
              >{c}</span>
            ))}<br />
            {'Your Masjid'.split('').map((c, i) => (
              <span key={`ym-${i}`} style={{ transition: 'color 0.2s ease', cursor: 'default' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '' }}
              >{c === ' ' ? '\u00A0' : c}</span>
            ))}<br />
            {'Your Community'.split('').map((c, i) => (
              <span key={`yc-${i}`} style={{ transition: 'color 0.2s ease', cursor: 'default' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#2E3A59' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '' }}
              >{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
