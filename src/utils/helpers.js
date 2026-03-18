// Pure math utilities used across animation code

export const lerp    = (a, b, t) => a + (b - a) * t
export const clamp   = (v, min, max) => Math.min(Math.max(v, min), max)
export const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = (v - inMin) / (inMax - inMin)
  return lerp(outMin, outMax, clamp(t, 0, 1))
}