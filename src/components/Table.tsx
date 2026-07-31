'use client'

import { useAppStore } from '@/lib/store'

export default function Table() {
  const progress = useAppStore((s) => s.progress)
  const opacity = Math.max(0, 1 - progress * 3)

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#3d2918"
        roughness={0.9}
        metalness={0.0}
        transparent
        opacity={opacity}
        side={2}
      />
    </mesh>
  )
}
