'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

const DOME_SEGMENTS = 24

function Dome({ radius, position, color }: { radius: number; position: [number, number, number]; color: string }) {
  const geo = useMemo(() => {
    return new THREE.SphereGeometry(radius, DOME_SEGMENTS, DOME_SEGMENTS, 0, Math.PI * 2, 0, Math.PI / 2)
  }, [radius])

  return (
    <mesh geometry={geo} position={position}>
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  )
}

function Minaret({ height, x, z, color, capColor }: { height: number; x: number; z: number; color: string; capColor: string }) {
  return (
    <group position={[x, height / 2, z]}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.12, height, 10]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, height / 2 + 0.04, 0]}>
        <coneGeometry args={[0.14, 0.18, 10]} />
        <meshStandardMaterial color={capColor} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, height / 2 + 0.2, 0]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color="#d4a853" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  )
}

interface MosqueModelProps {
  isMini?: boolean
}

export default function MosqueModel({ isMini = false }: MosqueModelProps) {
  const mainColor = '#b8a080'
  const domeColor = '#e8d8c0'
  const accentColor = '#d4a853'
  const roofColor = '#8a7a5a'
  const minaretColor = '#c4b08a'
  const windowColor = '#1a1a3e'

  // Mini version colors are warmer and brighter
  const s = isMini ? 0.35 : 1
  const mc = isMini ? '#c8b898' : mainColor
  const dc = isMini ? '#f0e8d0' : domeColor
  const ac = isMini ? '#e8c870' : accentColor

  return (
    <group scale={[s, s, s]}>
      {/* Main prayer hall */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.0, 0.7, 1.6]} />
        <meshStandardMaterial color={mc} roughness={0.6} />
      </mesh>

      {/* Front portico */}
      <mesh position={[0, 0.25, 0.85]}>
        <boxGeometry args={[1.4, 0.5, 0.4]} />
        <meshStandardMaterial color={mc} roughness={0.6} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2.2, 0.08, 1.8]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} />
      </mesh>

      {/* Main dome */}
      <Dome radius={0.55} position={[0, 0.78, 0]} color={dc} />
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={ac} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Small flanking domes */}
      <Dome radius={0.22} position={[-0.6, 0.55, 0.4]} color={dc} />
      <Dome radius={0.22} position={[0.6, 0.55, 0.4]} color={dc} />

      {/* Four minarets */}
      <Minaret height={1.2} x={-1.4} z={-0.7} color={minaretColor} capColor={ac} />
      <Minaret height={1.2} x={1.4} z={-0.7} color={minaretColor} capColor={ac} />
      <Minaret height={1.0} x={-1.4} z={0.7} color={minaretColor} capColor={ac} />
      <Minaret height={1.0} x={1.4} z={0.7} color={minaretColor} capColor={ac} />

      {/* Main entrance arch */}
      <group position={[0, 0.2, 1.1]}>
        <mesh>
          <planeGeometry args={[0.5, 0.45]} />
          <meshStandardMaterial color="#1a0a0a" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.15, 0.01]}>
          <ringGeometry args={[0.2, 0.25, 12, 1, 0, Math.PI]} />
          <meshStandardMaterial color={ac} roughness={0.3} metalness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Side arches */}
      {[-0.6, 0.6].map((x) => (
        <group key={`arch-${x}`} position={[x, 0.25, 1.1]}>
          <mesh>
            <planeGeometry args={[0.15, 0.25]} />
            <meshStandardMaterial color="#1a0a0a" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.08, 0.01]}>
            <ringGeometry args={[0.05, 0.07, 8, 1, 0, Math.PI]} />
            <meshStandardMaterial color={ac} roughness={0.3} metalness={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Windows */}
      {[-0.4, 0.4].map((x) => (
        <group key={`win-${x}`} position={[x, 0.4, -0.85]}>
          <mesh>
            <planeGeometry args={[0.14, 0.22]} />
            <meshStandardMaterial color={windowColor} roughness={0.1} metalness={0.0} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.18, 0.03]} />
            <meshStandardMaterial color={ac} roughness={0.3} metalness={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
