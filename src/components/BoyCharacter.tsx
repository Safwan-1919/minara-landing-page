'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SKIN = '#e8b89a'
const SKIN_SHADOW = '#d4a080'
const HAIR = '#1a1a1a'
const KURTA = '#e8dcc8'
const KURTA_FOLD = '#d8ccb8'
const KUFI = '#f0ece8'
const PANTS = '#f0f0ec'
const SANDAL = '#5a3a1a'
const SANDAL_STRAP = '#4a2a10'
const BUTTON = '#333333'
const EYE_WHITE = '#ffffff'
const IRIS = '#3a2010'
const PUPIL = '#000000'
const MOUTH_COLOR = '#c47060'
const EYEBROW_COLOR = '#2a2a2a'

export default function BoyCharacter() {
  const groupRef = useRef<THREE.Group>(null)
  const headGroupRef = useRef<THREE.Group>(null)
  const neckGroupRef = useRef<THREE.Group>(null)
  const bodyGroupRef = useRef<THREE.Group>(null)
  const leftEyeGroupRef = useRef<THREE.Group>(null)
  const rightEyeGroupRef = useRef<THREE.Group>(null)
  const leftEyelidRef = useRef<THREE.Mesh>(null)
  const rightEyelidRef = useRef<THREE.Mesh>(null)
  const leftShoulderRef = useRef<THREE.Group>(null)
  const rightShoulderRef = useRef<THREE.Group>(null)
  const mouthRef = useRef<THREE.Mesh>(null)

  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseSmooth = useRef({ x: 0, y: 0 })
  const eyeSmooth = useRef({ x: 0, y: 0 })
  const blinkTimer = useRef(0)
  const blinkVal = useRef(0)
  const nextBlink = useRef(3 + Math.random() * 3)
  const blinking = useRef(false)
  const blinkPhase = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    // Smooth mouse for head
    mouseSmooth.current.x = THREE.MathUtils.lerp(mouseSmooth.current.x, mouseTarget.current.x, 0.06)
    mouseSmooth.current.y = THREE.MathUtils.lerp(mouseSmooth.current.y, mouseTarget.current.y, 0.06)

    // Smooth eye (faster than head)
    eyeSmooth.current.x = THREE.MathUtils.lerp(eyeSmooth.current.x, mouseTarget.current.x, 0.12)
    eyeSmooth.current.y = THREE.MathUtils.lerp(eyeSmooth.current.y, mouseTarget.current.y, 0.12)

    // Head rotation
    const headRotY = THREE.MathUtils.clamp(mouseSmooth.current.x * 0.35, -0.3, 0.3)
    const headRotX = THREE.MathUtils.clamp(mouseSmooth.current.y * 0.12, -0.1, 0.1)

    if (neckGroupRef.current) {
      neckGroupRef.current.rotation.y = THREE.MathUtils.lerp(neckGroupRef.current.rotation.y, headRotY, 0.05)
      neckGroupRef.current.rotation.x = THREE.MathUtils.lerp(neckGroupRef.current.rotation.x, headRotX, 0.05)
    }

    // Head idle sway
    if (headGroupRef.current) {
      headGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.008
    }

    // Eye rotation (faster, ahead of head)
    const eyeRotY = eyeSmooth.current.x * 0.04
    const eyeRotX = eyeSmooth.current.y * 0.025
    if (leftEyeGroupRef.current) {
      leftEyeGroupRef.current.rotation.y = eyeRotY
      leftEyeGroupRef.current.rotation.x = eyeRotX
    }
    if (rightEyeGroupRef.current) {
      rightEyeGroupRef.current.rotation.y = eyeRotY
      rightEyeGroupRef.current.rotation.x = eyeRotX
    }

    // Blink
    blinkTimer.current += dt
    if (!blinking.current && blinkTimer.current >= nextBlink.current) {
      blinking.current = true
      blinkPhase.current = 0
      blinkTimer.current = 0
      nextBlink.current = 3 + Math.random() * 3
    }
    if (blinking.current) {
      blinkPhase.current += dt * 14
      if (blinkPhase.current < 1) {
        blinkVal.current = blinkPhase.current
      } else if (blinkPhase.current < 2) {
        blinkVal.current = 2 - blinkPhase.current
      } else {
        blinkVal.current = 0
        blinking.current = false
      }
    }

    // Apply blink to eyelids
    const lidScale = 1 - blinkVal.current * 0.95
    if (leftEyelidRef.current) {
      leftEyelidRef.current.scale.y = lidScale
    }
    if (rightEyelidRef.current) {
      rightEyelidRef.current.scale.y = lidScale
    }

    // Breathing
    if (bodyGroupRef.current) {
      const breath = Math.sin(t * 1.5) * 0.012
      bodyGroupRef.current.scale.y = 1 + breath
      bodyGroupRef.current.position.y = Math.sin(t * 1.5) * 0.008
    }

    // Shoulder idle
    if (leftShoulderRef.current) {
      leftShoulderRef.current.rotation.z = Math.sin(t * 0.7) * 0.012
      leftShoulderRef.current.rotation.x = Math.sin(t * 0.5 + 0.5) * 0.008
    }
    if (rightShoulderRef.current) {
      rightShoulderRef.current.rotation.z = -Math.sin(t * 0.7) * 0.012
      rightShoulderRef.current.rotation.x = Math.sin(t * 0.5 + 0.5) * 0.008
    }
  })

  return (
    <group ref={groupRef} position={[0, -2.8, 0]}>
      <group ref={bodyGroupRef}>

        {/* ===== LEGS ===== */}
        <mesh position={[-0.17, -0.95, 0]}>
          <boxGeometry args={[0.28, 1.1, 0.28]} />
          <meshStandardMaterial color={PANTS} roughness={0.8} />
        </mesh>
        <mesh position={[0.17, -0.95, 0]}>
          <boxGeometry args={[0.28, 1.1, 0.28]} />
          <meshStandardMaterial color={PANTS} roughness={0.8} />
        </mesh>

        {/* ===== SANDALS ===== */}
        <SandalFoot position={[-0.17, -1.55, 0.04]} />
        <SandalFoot position={[0.17, -1.55, 0.04]} />

        {/* ===== KURTA (TUNIC) ===== */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.88, 1.8, 0.42]} />
          <meshStandardMaterial color={KURTA} roughness={0.8} />
        </mesh>
        {/* Kurta bottom flare */}
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.92, 0.12, 0.44]} />
          <meshStandardMaterial color={KURTA_FOLD} roughness={0.8} />
        </mesh>
        {/* Collar */}
        <mesh position={[0, 1.02, 0.16]}>
          <boxGeometry args={[0.28, 0.14, 0.14]} />
          <meshStandardMaterial color={KURTA} roughness={0.8} />
        </mesh>
        {/* Placket line */}
        <mesh position={[0, 0.6, 0.22]}>
          <boxGeometry args={[0.06, 0.7, 0.01]} />
          <meshStandardMaterial color={KURTA_FOLD} roughness={0.8} />
        </mesh>
        {/* Buttons */}
        {[0.9, 0.7, 0.5, 0.3].map((y, i) => (
          <mesh key={i} position={[0, y, 0.23]}>
            <cylinderGeometry args={[0.018, 0.018, 0.015, 8]} />
            <meshStandardMaterial color={BUTTON} roughness={0.4} metalness={0.3} />
          </mesh>
        ))}

        {/* ===== ARMS ===== */}
        <group ref={leftShoulderRef}>
          <ArmPart side="left" />
        </group>
        <group ref={rightShoulderRef}>
          <ArmPart side="right" />
        </group>

        {/* ===== NECK ===== */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.18, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>

        {/* ===== HEAD GROUP (follows mouse via neck) ===== */}
        <group ref={neckGroupRef} position={[0, 1.3, 0]}>
          <group ref={headGroupRef} position={[0, 0.28, 0]}>

            {/* Head sphere */}
            <mesh>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial color={SKIN} roughness={0.65} />
            </mesh>

            {/* Cheeks (subtle) */}
            <mesh position={[-0.25, -0.05, 0.15]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#eab8a0" roughness={0.7} />
            </mesh>
            <mesh position={[0.25, -0.05, 0.15]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#eab8a0" roughness={0.7} />
            </mesh>

            {/* ===== HAIR ===== */}
            <HairGroup />

            {/* ===== KUFI CAP ===== */}
            <KufiCap />

            {/* ===== EYES ===== */}
            <group ref={leftEyeGroupRef}>
              <SingleEye
                position={[-0.15, 0.08, 0.34]}
                eyelidRef={leftEyelidRef}
              />
            </group>
            <group ref={rightEyeGroupRef}>
              <SingleEye
                position={[0.15, 0.08, 0.34]}
                eyelidRef={rightEyelidRef}
              />
            </group>

            {/* Eyebrows */}
            <mesh position={[-0.15, 0.22, 0.36]} rotation={[0.1, 0, 0.08]}>
              <boxGeometry args={[0.12, 0.02, 0.02]} />
              <meshStandardMaterial color={EYEBROW_COLOR} roughness={0.9} />
            </mesh>
            <mesh position={[0.15, 0.22, 0.36]} rotation={[0.1, 0, -0.08]}>
              <boxGeometry args={[0.12, 0.02, 0.02]} />
              <meshStandardMaterial color={EYEBROW_COLOR} roughness={0.9} />
            </mesh>

            {/* Nose */}
            <mesh position={[0, -0.02, 0.4]}>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshStandardMaterial color={SKIN_SHADOW} roughness={0.7} />
            </mesh>

            {/* Mouth / Smile */}
            <mesh ref={mouthRef} position={[0, -0.12, 0.36]} rotation={[0.15, 0, 0]}>
              <boxGeometry args={[0.09, 0.018, 0.015]} />
              <meshStandardMaterial color={MOUTH_COLOR} roughness={0.6} />
            </mesh>

            {/* Ears */}
            <mesh position={[-0.38, 0.02, 0]}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshStandardMaterial color={SKIN} roughness={0.7} />
            </mesh>
            <mesh position={[0.38, 0.02, 0]}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshStandardMaterial color={SKIN} roughness={0.7} />
            </mesh>

          </group>
        </group>
      </group>
    </group>
  )
}

function SingleEye({ position, eyelidRef }: { position: [number, number, number]; eyelidRef: React.RefObject<THREE.Mesh | null> }) {
  return (
    <group position={position}>
      {/* Eye white */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={EYE_WHITE} roughness={0.15} />
      </mesh>
      {/* Iris */}
      <mesh position={[0, 0, 0.045]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={IRIS} roughness={0.4} />
      </mesh>
      {/* Pupil */}
      <mesh position={[0, 0, 0.07]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={PUPIL} roughness={0.1} />
      </mesh>
      {/* Specular */}
      <mesh position={[0.015, 0.015, 0.08]}>
        <sphereGeometry args={[0.01, 6, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Upper eyelid */}
      <mesh
        ref={eyelidRef}
        position={[0, 0.055, 0.01]}
      >
        <sphereGeometry args={[0.09, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function HairGroup() {
  return (
    <group position={[0, 0.28, -0.02]}>
      {/* Main hair top */}
      <mesh>
        <sphereGeometry args={[0.4, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      {/* Side hair */}
      <mesh position={[-0.32, -0.08, 0.06]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      <mesh position={[0.32, -0.08, 0.06]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      {/* Back hair */}
      <mesh position={[0, -0.05, -0.2]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      {/* Front fringe / bangs */}
      <mesh position={[0, 0.18, 0.3]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.45, 0.08, 0.08]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      <mesh position={[-0.15, 0.15, 0.32]} rotation={[0.2, 0, 0.1]}>
        <boxGeometry args={[0.12, 0.1, 0.06]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
    </group>
  )
}

function KufiCap() {
  return (
    <group position={[0, 0.48, -0.01]}>
      {/* Main dome */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={KUFI} roughness={0.7} />
      </mesh>
      {/* Band around bottom */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.36, 0.37, 0.1, 24]} />
        <meshStandardMaterial color={KUFI} roughness={0.7} />
      </mesh>
      {/* Cross-hatch pattern */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.37, -0.02, Math.sin(angle) * 0.37]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.008, 0.06, 0.03]} />
            <meshStandardMaterial color="#e0dcd5" roughness={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

function ArmPart({ side }: { side: 'left' | 'right' }) {
  const x = side === 'left' ? -0.55 : 0.55
  return (
    <group position={[x, 0.8, 0]}>
      {/* Shoulder joint */}
      <mesh>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color={KURTA} roughness={0.8} />
      </mesh>
      {/* Upper arm */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.55, 10]} />
        <meshStandardMaterial color={KURTA} roughness={0.8} />
      </mesh>
      {/* Elbow */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.085, 8, 8]} />
        <meshStandardMaterial color={KURTA} roughness={0.8} />
      </mesh>
      {/* Forearm */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.07, 0.065, 0.5, 10]} />
        <meshStandardMaterial color={KURTA} roughness={0.8} />
      </mesh>
      {/* Cuff */}
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.06, 10]} />
        <meshStandardMaterial color={KURTA_FOLD} roughness={0.8} />
      </mesh>
      {/* Hand */}
      <mesh position={[0, -1.3, 0]}>
        <sphereGeometry args={[0.075, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.65} />
      </mesh>
      {/* Fingers */}
      {[-0.025, -0.008, 0.008, 0.025].map((fx, i) => (
        <mesh key={i} position={[fx, -1.4, 0.015]}>
          <cylinderGeometry args={[0.012, 0.01, 0.08, 5]} />
          <meshStandardMaterial color={SKIN} roughness={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function SandalFoot({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Foot */}
      <mesh position={[0, 0.02, 0.04]}>
        <boxGeometry args={[0.18, 0.08, 0.28]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>
      {/* Sole */}
      <mesh position={[0, -0.03, 0.04]}>
        <boxGeometry args={[0.2, 0.04, 0.32]} />
        <meshStandardMaterial color={SANDAL} roughness={0.8} />
      </mesh>
      {/* Heel bump */}
      <mesh position={[0, -0.01, -0.1]}>
        <boxGeometry args={[0.18, 0.03, 0.08]} />
        <meshStandardMaterial color={SANDAL} roughness={0.8} />
      </mesh>
      {/* Strap 1 */}
      <mesh position={[0, 0.04, 0.1]}>
        <boxGeometry args={[0.22, 0.025, 0.035]} />
        <meshStandardMaterial color={SANDAL_STRAP} roughness={0.7} />
      </mesh>
      {/* Strap 2 */}
      <mesh position={[0, 0.04, 0.02]}>
        <boxGeometry args={[0.2, 0.025, 0.035]} />
        <meshStandardMaterial color={SANDAL_STRAP} roughness={0.7} />
      </mesh>
      {/* Toes */}
      {[-0.05, -0.025, 0, 0.025, 0.05].map((tx, i) => (
        <mesh key={i} position={[tx, 0.0, 0.18]}>
          <sphereGeometry args={[0.016, 6, 6]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}
