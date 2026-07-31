export function calculateVelocity(
  current: number,
  previous: number,
  deltaTime: number
): number {
  if (deltaTime <= 0) return 0
  return (current - previous) / deltaTime
}

export function smoothVelocity(
  current: number,
  target: number,
  factor: number
): number {
  return current + (target - current) * factor
}

export function velocityToScale(velocity: number, maxCompression: number): number {
  const normalized = Math.min(Math.abs(velocity) / 3000, 1)
  return 1 - normalized * maxCompression
}

export function velocityToRotation(
  velocity: number,
  maxAngle: number
): number {
  const normalized = Math.min(Math.abs(velocity) / 3000, 1)
  return normalized * maxAngle * Math.sign(velocity)
}
