export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, padding: 32,
        minWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}>
        {children}
      </div>
    </div>
  )
}
