'use client'

import { useRef, useEffect, useCallback } from 'react'

interface TiltOptions {
  maxTilt?: number
  maxTranslate?: number
  springFactor?: number
  scale?: number
}

interface TiltState {
  targetRotateX: number
  targetRotateY: number
  targetTranslateX: number
  targetTranslateY: number
  currentRotateX: number
  currentRotateY: number
  currentTranslateX: number
  currentTranslateY: number
  isHovering: boolean
}

export function useTilt(
  ref: React.RefObject<HTMLElement | null>,
  options: TiltOptions = {}
) {
  const {
    maxTilt = 5,
    maxTranslate = 12,
    springFactor = 0.12,
    scale = 1.02,
  } = options

  const stateRef = useRef<TiltState>({
    targetRotateX: 0,
    targetRotateY: 0,
    targetTranslateX: 0,
    targetTranslateY: 0,
    currentRotateX: 0,
    currentRotateY: 0,
    currentTranslateX: 0,
    currentTranslateY: 0,
    isHovering: false,
  })

  const rafRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    const s = stateRef.current
    const el = ref.current
    if (!el) return

    s.currentRotateX += (s.targetRotateX - s.currentRotateX) * springFactor
    s.currentRotateY += (s.targetRotateY - s.currentRotateY) * springFactor
    s.currentTranslateX += (s.targetTranslateX - s.currentTranslateX) * springFactor
    s.currentTranslateY += (s.targetTranslateY - s.currentTranslateY) * springFactor

    const currentScale = s.isHovering ? scale : 1

    el.style.transform =
      `perspective(800px) ` +
      `rotateX(${s.currentRotateX}deg) ` +
      `rotateY(${s.currentRotateY}deg) ` +
      `translateX(${s.currentTranslateX}px) ` +
      `translateY(${s.currentTranslateY}px) ` +
      `scale(${currentScale})`

    rafRef.current = requestAnimationFrame(animate)
  }, [ref, springFactor, scale])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      s.targetRotateY = (x - 0.5) * maxTilt * 2
      s.targetRotateX = -(y - 0.5) * maxTilt * 2
      s.targetTranslateX = (x - 0.5) * maxTranslate
      s.targetTranslateY = (y - 0.5) * maxTranslate
    }

    const onEnter = () => {
      stateRef.current.isHovering = true
      el.style.transition = 'none'
    }

    const onLeave = () => {
      const s = stateRef.current
      s.isHovering = false
      s.targetRotateX = 0
      s.targetRotateY = 0
      s.targetTranslateX = 0
      s.targetTranslateY = 0
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [ref, maxTilt, maxTranslate, animate])

  return stateRef
}
