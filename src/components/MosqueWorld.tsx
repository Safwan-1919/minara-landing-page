'use client'

import { useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import MosqueModel from './MosqueModel'

export default function MosqueWorld() {
  const progress = useAppStore((s) => s.progress)

  const opacity = Math.max(0, Math.min(1, (progress - 0.5) * 4))

  return (
    <group position={[0, -0.5, 0]} scale={[1, 1, 1]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#2a2518"
          roughness={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Mosque */}
      <group>
        <MosqueModel />
      </group>

      {/* Light beams from minarets */}
      {opacity > 0 && (
        <group>
          {[
            [-1.3, -0.6],
            [1.3, -0.6],
            [-1.3, 0.6],
            [1.3, 0.6],
          ].map(([x, z], i) => (
            <mesh key={`beam-${i}`} position={[x, 0.5, z]} rotation={[0.3, 0, 0]}>
              <coneGeometry args={[0.02, 1.5, 8]} />
              <meshBasicMaterial
                color="#d4a853"
                transparent
                opacity={opacity * 0.15}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}
