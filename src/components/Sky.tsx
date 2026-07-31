'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'

export default function Sky() {
  const progress = useAppStore((s) => s.progress)
  const meshRef = useRef<THREE.Mesh>(null)

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createLinearGradient(0, 0, 0, 256)
    grad.addColorStop(0, '#0a0a1a')
    grad.addColorStop(0.3, '#1a1a3a')
    grad.addColorStop(0.5, '#2a1a3a')
    grad.addColorStop(0.7, '#4a2a1a')
    grad.addColorStop(0.85, '#8a4a2a')
    grad.addColorStop(1, '#c47a3a')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 1, 256)
    const tex = new THREE.CanvasTexture(canvas)
    tex.magFilter = THREE.LinearFilter
    tex.minFilter = THREE.LinearFilter
    return tex
  }, [])

  const geo = useMemo(() => new THREE.SphereGeometry(50, 32, 32), [])

  useFrame(() => {
    const opacity = Math.max(0, Math.min(1, (progress - 0.45) * 5))
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.85
    }
  })

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial
        map={gradientTexture}
        side={THREE.BackSide}
        transparent
        opacity={0}
      />
    </mesh>
  )
}
