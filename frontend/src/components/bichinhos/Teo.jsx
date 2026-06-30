import React, { useState } from 'react'

/* 🐢 Téo — Tartaruga Sábia (SVG animado) */
export default function Teo({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [nod, setNod] = useState(false)

  function handleClick() {
    setNod(true)
    setTimeout(() => setNod(false), 600)
    onClick?.()
  }

  const shellColor = level >= 3 ? '#558b2f' : '#2e7d32'

  return (
    <div onClick={handleClick} style={{ width: size, height: size, cursor: 'pointer', userSelect: 'none', display: 'inline-block', animation: nod ? 'teonod 0.6s ease' : 'teobreath 4s ease-in-out infinite' }}>
      <style>{`
        @keyframes teobreath { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes teonod { 0%,100%{transform:rotate(0)} 30%{transform:rotate(-8deg)} 70%{transform:rotate(5deg)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Casco */}
        <ellipse cx="50" cy="58" rx="32" ry="26" fill={shellColor} />
        {/* Padrão do casco */}
        <ellipse cx="50" cy="56" rx="18" ry="14" fill="#388e3c" />
        <line x1="50" y1="42" x2="50" y2="70" stroke={shellColor} strokeWidth="2" />
        <line x1="33" y1="52" x2="67" y2="52" stroke={shellColor} strokeWidth="2" />
        <line x1="36" y1="45" x2="64" y2="59" stroke={shellColor} strokeWidth="1.5" opacity="0.6" />
        <line x1="36" y1="59" x2="64" y2="45" stroke={shellColor} strokeWidth="1.5" opacity="0.6" />
        {/* Cabeça */}
        <circle cx="50" cy="30" r="18" fill="#81c784" />
        {/* Olhos */}
        <circle cx="43" cy="26" r="5" fill="#fff" />
        <circle cx="57" cy="26" r="5" fill="#fff" />
        <circle cx="43" cy="26" r="2.5" fill="#1b5e20" />
        <circle cx="57" cy="26" r="2.5" fill="#1b5e20" />
        <circle cx="43.8" cy="25" r="1" fill="#fff" />
        <circle cx="57.8" cy="25" r="1" fill="#fff" />
        {/* Boca */}
        {mood === 'happy'
          ? <path d="M 43 35 Q 50 40 57 35" stroke="#388e3c" strokeWidth="2" fill="none" strokeLinecap="round" />
          : <line x1="43" y1="36" x2="57" y2="36" stroke="#388e3c" strokeWidth="2" />
        }
        {/* Patas */}
        <ellipse cx="22" cy="64" rx="9" ry="6" fill="#81c784" />
        <ellipse cx="78" cy="64" rx="9" ry="6" fill="#81c784" />
        <ellipse cx="34" cy="82" rx="9" ry="5" fill="#81c784" />
        <ellipse cx="66" cy="82" rx="9" ry="5" fill="#81c784" />
        {/* Óculos de sábio nível 3+ */}
        {level >= 3 && (
          <>
            <circle cx="43" cy="26" r="6.5" fill="none" stroke="#5d4037" strokeWidth="1.5" />
            <circle cx="57" cy="26" r="6.5" fill="none" stroke="#5d4037" strokeWidth="1.5" />
            <line x1="49.5" y1="26" x2="50.5" y2="26" stroke="#5d4037" strokeWidth="1.5" />
          </>
        )}
      </svg>
    </div>
  )
}
