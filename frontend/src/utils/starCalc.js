export function calcStars(correct, total) {
  if (total === 0) return 0
  const pct = (correct / total) * 100
  if (pct >= 90) return 3
  if (pct >= 60) return 2
  return 1
}
