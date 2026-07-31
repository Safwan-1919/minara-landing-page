'use client'

import { useRef, useEffect, useCallback } from 'react'
import {
  MotionState,
  createMotionState,
  updateMotion,
  subscribeMotion,
} from '@/lib/motionEngine'

export function useInterpolation(
  containerRef: React.RefObject<HTMLElement | null>
): MotionState {
  const stateRef = useRef<MotionState>(createMotionState())

  useEffect(() => {
    const state = stateRef.current
    let running = true

    const onScroll = () => {
      state.targetScroll = window.scrollY
    }

    const loop = () => {
      if (!running) return
      updateMotion(state, performance.now())

      const el = containerRef.current
      if (el) {
        el.style.transform =
          `translateY(${state.currentScroll - state.targetScroll}px) ` +
          `scaleY(${state.elasticityY}) ` +
          `scaleX(${state.elasticityX}) ` +
          `rotateX(${state.rotateX}deg) ` +
          `rotateZ(${state.rotateZ}deg)`
      }

      state._rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    state._rafId = requestAnimationFrame(loop)

    return () => {
      running = false
      window.removeEventListener('scroll', onScroll)
      if (state._rafId !== null) cancelAnimationFrame(state._rafId)
    }
  }, [containerRef])

  return stateRef.current
}

export function useMotionSubscribe(
  state: MotionState,
  fn: () => void
): void {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    return subscribeMotion(state, () => fnRef.current())
  }, [state])
}
