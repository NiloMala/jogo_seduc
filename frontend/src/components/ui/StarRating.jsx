export default function StarRating({ stars = 0, max = 3, size = 32 }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ fontSize: size, opacity: i < stars ? 1 : 0.25 }}>⭐</span>
      ))}
    </div>
  )
}
