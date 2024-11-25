import { random } from "remotion"

type ShakeOptions = {
  intensity?: number
  speed?: number
  randomness?: number
  rotationIntensity?: number
  seed?: number
}

export const shake = (
  frame: number,
  {
    intensity = 10,
    speed = 2,
    randomness = 0.5,
    rotationIntensity = 2,
    seed = 0,
  }: ShakeOptions = {},
) => {
  const seedX =
    Math.sin(frame * speed * 0.1) + randomness * Math.sin(frame * 0.03)
  const seedY =
    Math.cos(frame * speed * 0.1) + randomness * Math.cos(frame * 0.03)

  const xShake = Math.sin(seedX) * intensity
  const yShake = Math.cos(seedY) * intensity

  const rotation =
    Math.sin(frame * speed * 0.05 + random(seed) * randomness) *
    rotationIntensity

  return {
    x: xShake,
    y: yShake,
    rotation,
  }
}
