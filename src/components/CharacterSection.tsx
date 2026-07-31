'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BoyCharacter from './BoyCharacter'

export default function CharacterSection() {
  return (
    <section style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5e6" />
          <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#e6f0ff" />
          <pointLight position={[2, 1, 4]} intensity={0.5} color="#ffd699" />
          <group position={[0, 2.6, 0]}>
            <BoyCharacter />
          </group>
        </Canvas>
      </div>
    </section>
  )
}
