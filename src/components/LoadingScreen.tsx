'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/lib/store'

export default function LoadingScreen() {
  const [ready, setReady] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const setLoaderDone = useAppStore((s) => s.setLoaderDone)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const startTime = Date.now()

    const minDuration = 5000

    const finish = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)
      setTimeout(() => setReady(true), remaining)
    }

    if (vid.readyState >= 4) {
      finish()
    } else {
      vid.addEventListener('canplaythrough', finish, { once: true })
    }

    const timeout = setTimeout(finish, 10000)

    return () => {
      vid.removeEventListener('canplaythrough', finish)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (ready && loaderRef.current) {
      loaderRef.current.style.opacity = '0'
      setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none'
        }
        setLoaderDone(true)
      }, 800)
    }
  }, [ready, setLoaderDone])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        transition: 'opacity 0.8s ease',
      }}
    >
      <video
        ref={videoRef}
        src="/Animate_the_provided_black_and.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: 'min(92vw, 640px)',
          height: 'auto',
          display: 'block',
          borderRadius: '12px',
        }}
      />
      <div
        style={{
          fontFamily: '"Comic Sans MS", "Segoe Print", cursive',
          fontSize: '18px',
          color: '#111',
          letterSpacing: '1px',
        }}
      >
        Loading
        <span className="loader-dot" style={{ animation: 'loaderBlink 1.2s infinite' }}>.</span>
        <span className="loader-dot" style={{ animation: 'loaderBlink 1.2s infinite 0.2s' }}>.</span>
        <span className="loader-dot" style={{ animation: 'loaderBlink 1.2s infinite 0.4s' }}>.</span>
      </div>
      <style>{`
        @keyframes loaderBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
