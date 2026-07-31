'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'
import MosqueModel from './MosqueModel'

export default function Book() {
  const progress = useAppStore((s) => s.progress)
  const leftCoverRef = useRef<THREE.Group>(null)
  const rightCoverRef = useRef<THREE.Group>(null)
  const pagesRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const p = Math.min(progress * 2.2, 1)
    const angle = p * Math.PI * 0.8

    if (leftCoverRef.current) {
      leftCoverRef.current.rotation.x = -angle
    }
    if (rightCoverRef.current) {
      rightCoverRef.current.rotation.x = angle
    }
    if (pagesRef.current) {
      pagesRef.current.visible = p < 0.9
    }
  })

  const pageOpacity = Math.max(0, 1 - progress * 1.8)
  const coversVisible = progress < 0.8

  return (
    <group position={[0, 0, 0]}>
      {/* Book base block */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[4.2, 0.04, 3.0]} />
        <meshStandardMaterial
          color="#3a2510"
          roughness={0.9}
          transparent
          opacity={coversVisible ? 1 : Math.max(0, 1 - progress * 3)}
        />
      </mesh>

      {/* Left cover - hinges from the center spine */}
      <group ref={leftCoverRef} position={[-1.05, 0.04, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[1.95, 0.05, 2.9]} />
          <meshStandardMaterial
            color="#5a3a1a"
            roughness={0.8}
            metalness={0.05}
            transparent
            opacity={coversVisible ? 1 : 0}
          />
        </mesh>
        {/* Cover edge detail */}
        <mesh position={[0.97, 0, 0]}>
          <boxGeometry args={[0.03, 0.06, 2.7]} />
          <meshStandardMaterial color="#d4a853" roughness={0.5} metalness={0.1} />
        </mesh>
      </group>

      {/* Right cover */}
      <group ref={rightCoverRef} position={[1.05, 0.04, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <boxGeometry args={[1.95, 0.05, 2.9]} />
          <meshStandardMaterial
            color="#5a3a1a"
            roughness={0.8}
            metalness={0.05}
            transparent
            opacity={coversVisible ? 1 : 0}
          />
        </mesh>
        <mesh position={[-0.97, 0, 0]}>
          <boxGeometry args={[0.03, 0.06, 2.7]} />
          <meshStandardMaterial color="#d4a853" roughness={0.5} metalness={0.1} />
        </mesh>
      </group>

      {/* Pages block */}
      <group ref={pagesRef}>
        <mesh position={[-1.0, 0.045, 0]}>
          <boxGeometry args={[1.8, 0.06, 2.6]} />
          <meshStandardMaterial
            color="#f5e6c8"
            roughness={0.7}
            transparent
            opacity={pageOpacity}
          />
        </mesh>
        <mesh position={[1.0, 0.045, 0]}>
          <boxGeometry args={[1.8, 0.06, 2.6]} />
          <meshStandardMaterial
            color="#f5e6c8"
            roughness={0.7}
            transparent
            opacity={pageOpacity}
          />
        </mesh>

        {/* Gold page edges */}
        <mesh position={[-1.0, 0.04, 1.35]}>
          <boxGeometry args={[1.7, 0.02, 0.02]} />
          <meshStandardMaterial color="#d4a853" roughness={0.4} metalness={0.2} opacity={pageOpacity} transparent />
        </mesh>
        <mesh position={[1.0, 0.04, 1.35]}>
          <boxGeometry args={[1.7, 0.02, 0.02]} />
          <meshStandardMaterial color="#d4a853" roughness={0.4} metalness={0.2} opacity={pageOpacity} transparent />
        </mesh>
      </group>

      {/* Spine detail */}
      <mesh position={[0, 0.04, -1.52]}>
        <boxGeometry args={[0.3, 0.06, 0.04]} />
        <meshStandardMaterial color="#d4a853" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Mosque miniature on the right page */}
      <group
        position={[1.0, 0.08, 0]}
        visible={progress < 0.6}
      >
        <MosqueModel isMini />
      </group>
    </group>
  )
}
