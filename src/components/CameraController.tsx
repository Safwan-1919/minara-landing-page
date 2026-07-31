'use client'

import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'

export default function CameraController() {
  const progress = useAppStore((s) => s.progress)
  const { camera } = useThree()

  const path = useMemo(() => {
    const pts = [
      new THREE.Vector3(0, 12, 10),
      new THREE.Vector3(0, 8, 6),
      new THREE.Vector3(0, 4, 3),
      new THREE.Vector3(0, 1.2, 0.8),
      new THREE.Vector3(0, 0.8, -0.3),
      new THREE.Vector3(0, 2, -6),
      new THREE.Vector3(0, 1.8, -12),
    ]
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  const lookPath = useMemo(() => {
    const pts = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(0, 1.0, 0.5),
      new THREE.Vector3(0, 2.0, 1.0),
      new THREE.Vector3(0, 2.5, 1.5),
    ]
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  useFrame(() => {
    const t = Math.min(progress * 1.05, 1)
    const pos = path.getPoint(t)
    const look = lookPath.getPoint(t)

    camera.position.copy(pos)
    camera.lookAt(look)

    if (t > 0.55) {
      const cam = camera as THREE.PerspectiveCamera
      cam.fov = 45 + ((t - 0.55) / 0.45) * 20
      cam.updateProjectionMatrix()
    }
  })

  return null
}
