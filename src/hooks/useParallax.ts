'use client'

import { useRef, useEffect } from 'react'
import { MotionState, subscribeMotion } from '@/lib/motionEngine'

interface ParallaxOptions {
  range?: number
  direction?: 'up' | 'down'
}

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  state: MotionState,
  options: ParallaxOptions = {}
) {
  const { range = 12, direction = 'up' } = options
  const offsetRef = useRef(0)
  const targetRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const unsubscribe = subscribeMotion(state, () => {
      const speed = Math.abs(state.smoothVelocity) / 3000
      const sign = direction === 'up' ? -1 : 1
      targetRef.current = state.smoothVelocity * speed * range * sign * 0.01
      targetRef.current = Math.max(-range, Math.min(range, targetRef.current))
    })

    let raf: number
    const loop = () => {
      offsetRef.current += (targetRef.current - offsetRef.current) * 0.06
      if (el) {
        el.style.transform = `translateY(${offsetRef.current}%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      unsubscribe()
      cancelAnimationFrame(raf)
    }
  }, [ref, state, range, direction])

  return offsetRef
}
