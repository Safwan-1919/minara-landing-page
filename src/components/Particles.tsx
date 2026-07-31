'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'

const COUNT = 800

export default function Particles() {
  const progress = useAppStore((s) => s.progress)
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 15 + Math.random() * 35
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 + 2
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame(() => {
    const opacity = Math.max(0, Math.min(1, (progress - 0.5) * 6))
    if (ref.current) {
      const mat = ref.current.material as THREE.PointsMaterial
      mat.opacity = opacity * 0.8
      ref.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#f5e6c8"
        transparent
        opacity={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
