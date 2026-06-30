export default function ProgressBar({ value = 0, max = 100, color = '#4caf50' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ background: '#e0e0e0', borderRadius: 8, height: 16, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, transition: 'width 0.4s' }} />
    </div>
  )
}
