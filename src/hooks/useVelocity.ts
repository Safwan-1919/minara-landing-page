'use client'

import { useRef, useEffect } from 'react'
import { MotionState } from '@/lib/motionEngine'

export function useVelocity(state: MotionState) {
  const velocityRef = useRef(0)
  const directionRef = useRef(0)

  useEffect(() => {
    return state._listeners.add(() => {
      velocityRef.current = state.smoothVelocity
      directionRef.current = state.direction
    })
  }, [state])

  return {
    get velocity() {
      return velocityRef.current
    },
    get direction() {
      return directionRef.current
    },
    get speed() {
      return Math.abs(velocityRef.current)
    },
  }
}
