export function easeInOutCubic (time: number, beginValue: number, change: number, duration: number): number {
  if ((time /= duration / 2) < 1) return change / 2 * time * time * time + beginValue
  return change / 2 * ((time -= 2) * time * time + 2) + beginValue
}
