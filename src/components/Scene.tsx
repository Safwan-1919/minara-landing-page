'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import ScrollManager from './ScrollManager'
import CameraController from './CameraController'
import Table from './Table'
import Book from './Book'
import MosqueWorld from './MosqueWorld'
import Sky from './Sky'
import Particles from './Particles'
import PostEffects from './PostEffects'

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 15, 5]}
        intensity={1.2}
        color="#ffd4a0"
      />
      <directionalLight
        position={[-5, 8, -5]}
        intensity={0.5}
        color="#88bbff"
      />
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#d4a853" />
      <hemisphereLight
        args={["#ffd4a0", "#1a1a2e", 0.5]}
      />
      <spotLight
        position={[0, 10, 5]}
        angle={0.5}
        penumbra={0.5}
        intensity={1.5}
        color="#ffd4a0"
        target-position={[0, 0, 0]}
      />

      <Table />
      <Book />
      <MosqueWorld />
      <Sky />
      <Particles />

      <PostEffects />
      <CameraController />
    </>
  )
}

export default function Scene() {
  return (
    <>
      <ScrollManager />
      <Canvas
        camera={{
          position: [0, 12, 10],
          fov: 50,
          near: 0.01,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
        }}
        dpr={[1, 1.5]}
        style={{ position: 'fixed', inset: 0 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </>
  )
}
