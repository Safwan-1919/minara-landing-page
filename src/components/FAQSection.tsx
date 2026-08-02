'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFloat from './ScrollFloat'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'What is Minara?',
    answer: 'Minara is a digital platform designed to help masjids manage announcements, subscriptions, certificates, donations, and community engagement seamlessly.',
  },
  {
    question: 'Is Minara free to use?',
    answer: 'Minara offers both free and premium features depending on the needs of the masjid. Basic features are available free of cost.',
  },
  {
    question: 'How can I generate a marriage certificate?',
    answer: 'You can upload the required nikah documents through the Minara dashboard, and the certificate will be generated securely and instantly.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Minara uses secure storage and encrypted systems to ensure all user and masjid data remains safe and private.',
  },
  {
    question: 'Can masjid committees manage everything from Minara?',
    answer: 'Yes. Masjid admins can manage subscriptions, finances, announcements, certificates, and community engagement from a single dashboard.',
  },
]

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.max(0, Math.min(1, e.clientX / window.innerWidth))
      if (video.readyState >= 2) {
        video.currentTime = x * video.duration
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleTouchMove = (e: TouchEvent) => {
      const x = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth))
      if (video.readyState >= 2) {
        video.currentTime = x * video.duration
      }
    }
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const section = sectionRef.current
    const path = pathRef.current
    if (!section) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return

    let currentIndex = 0

    cards.forEach((card, i) => {
      card.style.zIndex = String(cards.length - i)
      card.style.opacity = i === 0 ? '1' : '0'
      card.style.visibility = i === 0 ? 'visible' : 'hidden'
      card.style.transition = 'none'
    })

    let totalLength = 0
    if (path) {
      totalLength = path.getTotalLength()
      if (totalLength > 0) {
        path.style.strokeDasharray = String(totalLength)
        path.style.strokeDashoffset = String(totalLength)
      }
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: false,
        onUpdate: (self) => {
          const total = cards.length
          const activeIndex = Math.min(Math.floor(self.progress * total), total - 1)

          if (activeIndex === currentIndex) {
            if (path && totalLength > 0) {
              path.style.strokeDashoffset = String(totalLength - totalLength * self.progress)
            }
            return
          }

          const outgoing = cards[currentIndex]
          const incoming = cards[activeIndex]

          incoming.style.transition = 'opacity 0.35s ease-out'
          outgoing.style.transition = 'opacity 0.35s ease-in'

          incoming.style.zIndex = String(total + 2)
          outgoing.style.zIndex = String(total)
          incoming.style.visibility = 'visible'

          void incoming.offsetWidth

          incoming.style.opacity = '1'
          outgoing.style.opacity = '0'

          const outCard = outgoing
          const timer = setTimeout(() => { outCard.style.visibility = 'hidden' }, 350)

          currentIndex = activeIndex

          if (path && totalLength > 0) {
            path.style.strokeDashoffset = String(totalLength - totalLength * self.progress)
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [mounted])

  useEffect(() => {
    if (!isMobile || !innerRef.current) return
    const el = innerRef.current
    const fit = () => {
      el.style.transform = ''
      el.style.transformOrigin = ''
    }
    fit()
  }, [isMobile])

  if (!mounted) return null

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#F0F1F5',
        height: `${faqs.length * 100}vh`,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'stretch',
          padding: isMobile ? '0 20px' : '0 clamp(24px, 4vw, 64px)',
          overflow: 'hidden',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            ref={pathRef}
            d="M 0 200 C 300 450, 600 200, 720 500 S 1100 850, 1440 800"
            stroke="#2E3A59"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
            opacity="0.70"
          />
        </svg>

        {isMobile ? (
          <div
            ref={innerRef}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingTop: 'clamp(16px, 4vh, 32px)',
              zIndex: 2,
            }}
          >
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.65rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(46,58,89,0.4)',
              marginBottom: '4px',
            }}>FAQ</p>
            <ScrollFloat containerClassName="faq-heading-1" animationDuration={1} ease="back.inOut(2)" scrollStart="top 95%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
              Frequently Asked
            </ScrollFloat>
            <ScrollFloat containerClassName="faq-heading-2" animationDuration={1} ease="back.inOut(2)" scrollStart="top 92%" scrollEnd="bottom bottom-=40%" stagger={0.03}>
              Questions
            </ScrollFloat>
            <div style={{
              width: '120px',
              aspectRatio: '3/4',
              borderRadius: '16px',
              overflow: 'hidden',
              marginTop: '12px',
              alignSelf: 'center',
            }}>
              <video ref={videoRef} src="/animated-character.webm" muted playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              marginTop: '16px',
            }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: 0,
                    width: '100%',
                    background: '#fff',
                    borderRadius: '20px',
                    border: '1px solid rgba(46,58,89,0.06)',
                    padding: '28px 24px',
                    boxShadow: '0 12px 48px rgba(46,58,89,0.1)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.6rem', fontWeight: 600, color: 'rgba(46,58,89,0.2)', display: 'block', marginBottom: '4px' }}>
                    {String(i + 1).padStart(2, '0')} / {String(faqs.length).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', fontWeight: 500, color: '#2E3A59', lineHeight: 1.3, margin: 0, marginBottom: '12px' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: 'rgba(46,58,89,0.5)', lineHeight: 1.7, margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={innerRef}
            style={{
              maxWidth: '1400px',
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              gap: 'clamp(8px, 1vw, 16px)',
              alignItems: 'stretch',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left side — fixed */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 'clamp(20px, 2.5vw, 40px)' }}>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(46,58,89,0.4)', marginBottom: '4px' }}>FAQ</p>
              <ScrollFloat containerClassName="faq-heading-1" animationDuration={1} ease="back.inOut(2)" scrollStart="top 95%" scrollEnd="bottom bottom-=40%" stagger={0.03}>Frequently Asked</ScrollFloat>
              <ScrollFloat containerClassName="faq-heading-2" animationDuration={1} ease="back.inOut(2)" scrollStart="top 92%" scrollEnd="bottom bottom-=40%" stagger={0.03}>Questions</ScrollFloat>
              <div style={{ width: '100%', maxWidth: '260px', aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', background: 'transparent', marginTop: '80px', marginLeft: 'auto', marginRight: 'clamp(120px, 14vw, 200px)' }}>
                <video ref={videoRef} src="/animated-character.webm" muted playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
            {/* Right side — card stack transitions */}
            <div style={{ flex: '1', position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '550px' }}>
              {faqs.map((faq, i) => (
                <div key={i} ref={(el) => { cardsRef.current[i] = el }} style={{ position: 'absolute', top: '60%', left: 0, right: 0, transform: 'translateY(-50%)', opacity: 0, width: 'clamp(340px, 32vw, 440px)', aspectRatio: '1 / 0.9', background: '#fff', borderRadius: '28px', border: '1px solid rgba(46,58,89,0.06)', padding: 'clamp(44px, 4.5vw, 56px) clamp(32px, 3.5vw, 44px) clamp(32px, 3.5vw, 44px)', boxShadow: '0 12px 48px rgba(46,58,89,0.1)', willChange: 'transform, opacity' }}>
                  <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 'clamp(0.65rem, 0.75vw, 0.75rem)', fontWeight: 600, color: 'rgba(46,58,89,0.2)', display: 'block', marginBottom: '4px' }}>{String(i + 1).padStart(2, '0')} / {String(faqs.length).padStart(2, '0')}</span>
                  <h3 style={{ fontFamily: '"Inter", sans-serif', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', fontWeight: 500, color: '#2E3A59', lineHeight: 1.3, margin: 0, marginBottom: '16px' }}>{faq.question}</h3>
                  <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 'clamp(0.85rem, 1vw, 1rem)', color: 'rgba(46,58,89,0.5)', lineHeight: 1.7, margin: 0, maxWidth: '95%' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
