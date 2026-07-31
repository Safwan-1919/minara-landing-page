'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useAppStore } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollManager() {
  const setProgress = useAppStore((s) => s.setProgress)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', () => {})

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ScrollTrigger.scrollerProxy('#scroll-container', {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value!)
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: 'transform',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    })

    tl.to(
      {},
      {
        duration: 1,
        onUpdate() {
          const progress = tl.progress()
          setProgress(progress)
        },
      }
    )

    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [setProgress])

  return null
}
