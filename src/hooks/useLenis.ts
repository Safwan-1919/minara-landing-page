'use client'

import { useEffect, useRef } from 'react'

interface LenisScrollToOptions {
  offset?: number
  immediate?: boolean
  lock?: boolean
  duration?: number
  easing?: (t: number) => number
}

export function useLenis() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        })

        const raf = (time: number) => {
          lenisRef.current?.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not available
      }
    }

    init()

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  const scrollTo = (target: string | number, options?: LenisScrollToOptions) => {
    lenisRef.current?.scrollTo(target, options)
  }

  return { lenis: lenisRef, scrollTo }
}
