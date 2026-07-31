'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const questions = [
  { id: 'name', label: "What is your name?", type: 'text' },
  { id: 'role', label: "Choose your role in masjid", type: 'select', options: ['President', 'Vice President', 'Secretary', 'Other'] },
  { id: 'members', label: "Enter number of jamath members in your masjid", type: 'number' },
  { id: 'phone', label: "Enter your mobile number", type: 'tel', prefix: '+91' },
]

export default function ContactSection() {
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState<Record<string, string>>({
    name: '', role: '', roleOther: '', members: '', phone: '',
  })
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [animDir, setAnimDir] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[current]

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (inputRef.current && started) {
      inputRef.current.focus()
    }
  }, [current, started])

  useEffect(() => {
    if (!mounted || started) return
    const el = document.querySelector('.welcome-wrap')
    if (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      )
    }
  }, [mounted, started])

  const animateIn = (dir: number) => {
    const el = questionRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, x: dir * 80 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
    )
  }

  const goNext = () => {
    if (!started) {
      setStarted(true)
      requestAnimationFrame(() => animateIn(1))
      return
    }
    if (!form[q.id]) return

    const el = questionRef.current
    if (el) {
      gsap.to(el, {
        opacity: 0,
        x: -80,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          if (current < questions.length - 1) {
            setAnimDir(1)
            setCurrent((p) => p + 1)
            requestAnimationFrame(() => animateIn(1))
          } else {
            setSubmitted(true)
          }
        },
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      goNext()
    }
  }

  if (!mounted) return null

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        position: 'relative',
        zIndex: 30,
        background: '#F0F1F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 64px)',
      }}
    >
      {submitted ? (
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#2E3A59',
              margin: 0,
              lineHeight: 1,
            }}
          >
            Thank you!
          </h2>
          <p
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
              fontWeight: 400,
              color: 'rgba(46,58,89,0.55)',
              marginTop: '16px',
              lineHeight: 1.7,
            }}
          >
            We'd love to hear from you.
            <br />
            Whether you have a question, feedback, or suggestion, our team is ready to help you.
          </p>

          <div style={{ marginTop: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E3A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>,
                value: 'minaramasjidapp@gmail.com'
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E3A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                value: '+91 91234567890'
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E3A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                value: 'India'
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {item.icon}
                <span
                  style={{
                    fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                    fontWeight: 500,
                    color: '#2E3A59',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : !started ? (
        <div
          className="welcome-wrap"
          onClick={goNext}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#2E3A59',
              margin: 0,
            }}
          >
            Let&apos;s connect
            <br />
            together
          </h2>
          <p
            style={{
              fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
              fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
              fontWeight: 400,
              color: 'rgba(46,58,89,0.4)',
              margin: 0,
            }}
          >
            Click anywhere to start
          </p>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#2E3A59',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
              animation: 'arrowBounce 1.5s ease-in-out infinite',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7E9D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      ) : (
        <>
          {/* Progress dots */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(32px, 4vw, 48px)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
            }}
          >
            {questions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i <= current ? '#2E3A59' : 'rgba(46,58,89,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Question */}
          <div ref={questionRef} style={{ width: '100%', maxWidth: '700px' }}>
            <p
              style={{
                fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
                fontWeight: 500,
                color: 'rgba(46,58,89,0.5)',
                margin: 0,
                marginBottom: '12px',
              }}
            >
              {q.label}
            </p>

            <div style={{ position: 'relative' }}>
              {q.type === 'select' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px', borderBottom: '1.5px solid rgba(46,58,89,0.1)' }}>
                    {(q as any).options.map((opt: string) => {
                      const isActive = form[q.id] === opt
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setForm((p) => ({ ...p, [q.id]: opt }))
                            if (opt !== 'Other') goNext()
                          }}
                          style={{
                            flex: 1,
                            fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? '#2E3A59' : 'rgba(46,58,89,0.4)',
                            padding: 'clamp(14px, 1.8vw, 20px) 0',
                            border: 'none',
                            borderBottom: isActive ? '2.5px solid #2E3A59' : '2.5px solid transparent',
                            background: 'transparent',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            marginBottom: '-1.5px',
                          }}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {form[q.id] === 'Other' && (
                    <input
                      autoFocus
                      type="text"
                      placeholder="Type your role"
                      value={form.roleOther || ''}
                      onChange={(e) => setForm((p) => ({ ...p, roleOther: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter' && form.roleOther) goNext() }}
                      style={{
                        fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                        fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                        fontWeight: 500,
                        color: '#2E3A59',
                        padding: '12px 0',
                        border: 'none',
                        borderBottom: '1.5px solid rgba(46,58,89,0.15)',
                        background: 'transparent',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => { e.target.style.borderBottomColor = '#2E3A59' }}
                      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(46,58,89,0.15)' }}
                    />
                  )}
                </div>
              ) : (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  {(q as any).prefix && (
                    <span style={{
                      fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                      fontWeight: 700,
                      color: '#2E3A59',
                      marginRight: '8px',
                      whiteSpace: 'nowrap',
                    }}>
                      {(q as any).prefix}
                    </span>
                  )}
                  <input
                    ref={inputRef}
                    type={q.type === 'tel' ? 'tel' : q.type === 'number' ? 'number' : 'text'}
                    value={form[q.id] || ''}
                    onChange={(e) => setForm((p) => ({ ...p, [q.id]: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: '100%',
                      fontFamily: '"Satoshi", "General Sans", "Inter", sans-serif',
                      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                      fontWeight: 700,
                      color: '#2E3A59',
                      padding: '12px 0',
                      border: 'none',
                      borderBottom: '1.5px solid rgba(46,58,89,0.15)',
                      background: 'transparent',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      paddingRight: q.type === 'number' ? '90px' : '56px',
                    }}
                    onFocus={(e) => { e.target.style.borderBottomColor = '#2E3A59' }}
                    onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(46,58,89,0.15)' }}
                  />
                  {q.type === 'number' && (
                    <div style={{
                      position: 'absolute',
                      right: '50px',
                      bottom: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0px',
                    }}>
                      <button
                        onClick={() => {
                          const val = parseInt(form[q.id] || '0') + 1
                          setForm((p) => ({ ...p, [q.id]: String(val) }))
                        }}
                        style={{
                          width: '20px',
                          height: '12px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          opacity: 0.3,
                        }}
                      >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 5L5 1L9 5" stroke="#2E3A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          const val = Math.max(0, parseInt(form[q.id] || '0') - 1)
                          setForm((p) => ({ ...p, [q.id]: String(val) }))
                        }}
                        style={{
                          width: '20px',
                          height: '12px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          opacity: 0.3,
                        }}
                      >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="#2E3A59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                  <button
                    onClick={goNext}
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: '12px',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#2E3A59',
                      border: 'none',
                      cursor: form[q.id] ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: form[q.id] ? 1 : 0.2,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7E9D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
