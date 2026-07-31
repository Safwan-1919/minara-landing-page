'use client'

import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { useAppStore } from '@/lib/store'

export default function PostEffects() {
  const progress = useAppStore((s) => s.progress)

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        intensity={0.4}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.15}
        bokehScale={progress > 0.5 ? 4 : 0}
      />
    </EffectComposer>
  )
}
