export interface MotionState {
  targetScroll: number
  currentScroll: number
  prevScroll: number
  velocity: number
  smoothVelocity: number
  direction: number
  speed: number

  elasticityY: number
  elasticityX: number
  rotateX: number
  rotateZ: number

  revealProgress: number
  sectionInView: boolean

  _lastTime: number
  _rafId: number | null
  _listeners: Set<() => void>
}

export function createMotionState(): MotionState {
  return {
    targetScroll: 0,
    currentScroll: 0,
    prevScroll: 0,
    velocity: 0,
    smoothVelocity: 0,
    direction: 0,
    speed: 0,

    elasticityY: 1,
    elasticityX: 1,
    rotateX: 0,
    rotateZ: 0,

    revealProgress: 0,
    sectionInView: false,

    _lastTime: performance.now(),
    _rafId: null,
    _listeners: new Set(),
  }
}

const LERP_FACTOR = 0.085
const VELOCITY_SMOOTHING = 0.12
const MAX_ELASTICITY_COMPRESS = 0.012
const MAX_ROTATE_X = 0.25
const MAX_ROTATE_Z = 0.08
const VELOCITY_THRESHOLD = 0.5

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1)
  return outMin + t * (outMax - outMin)
}

export function updateMotion(state: MotionState, now: number): void {
  const dt = Math.min((now - state._lastTime) / 1000, 0.05)
  state._lastTime = now

  state.prevScroll = state.currentScroll
  state.currentScroll += (state.targetScroll - state.currentScroll) * LERP_FACTOR

  const rawVelocity = (state.currentScroll - state.prevScroll) / Math.max(dt, 0.001)
  state.velocity = rawVelocity
  state.smoothVelocity += (rawVelocity - state.smoothVelocity) * VELOCITY_SMOOTHING

  state.speed = Math.abs(state.smoothVelocity)
  state.direction = state.speed > VELOCITY_THRESHOLD
    ? Math.sign(state.smoothVelocity)
    : state.direction

  const speedNormalized = clamp(state.speed / 3000, 0, 1)

  const targetElasticityY = 1 - mapRange(speedNormalized, 0, 1, 0, MAX_ELASTICITY_COMPRESS)
  const targetElasticityX = 1 + mapRange(speedNormalized, 0, 1, 0, MAX_ELASTICITY_COMPRESS * 0.17)
  state.elasticityY += (targetElasticityY - state.elasticityY) * 0.1
  state.elasticityX += (targetElasticityX - state.elasticityX) * 0.1

  const targetRotateX = mapRange(speedNormalized, 0, 1, 0, MAX_ROTATE_X) * -state.direction
  const targetRotateZ = mapRange(speedNormalized, 0, 1, 0, MAX_ROTATE_Z) * state.direction * 0.3
  state.rotateX += (targetRotateX - state.rotateX) * 0.08
  state.rotateZ += (targetRotateZ - state.rotateZ) * 0.08

  state._listeners.forEach((fn) => fn())
}

export function subscribeMotion(state: MotionState, fn: () => void): () => void {
  state._listeners.add(fn)
  return () => state._listeners.delete(fn)
}
