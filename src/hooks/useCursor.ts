'use client'

import { useCallback, useRef } from 'react'

export function useCursor() {
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const glow = glowRef.current
    if (!glow) return
    const rect = glow.parentElement?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glow.style.setProperty('--cursor-x', `${x}px`)
    glow.style.setProperty('--cursor-y', `${y}px`)
  }, [])

  return { glowRef, handleMouseMove }
}
