import React, { useState } from 'react'

/* 🐵 Nino — Macaco Inventor (SVG animado) */
export default function Nino({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [jump, setJump] = useState(false)

  function handleClick() {
    setJump(true)
    setTimeout(() => setJump(false), 700)
    onClick?.()
  }

  return (
    <div onClick={handleClick} style={{ width: size, height: size, cursor: 'pointer', userSelect: 'none', display: 'inline-block', animation: jump ? 'ninojump 0.7s ease' : 'ninoswing 2.5s ease-in-out infinite' }}>
      <style>{`
        @keyframes ninoswing { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes ninojump { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-16px) scale(1.05)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Cauda */}
        <path d="M 62 75 Q 82 68 84 82 Q 86 90 76 88" stroke="#795548" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Corpo */}
        <ellipse cx="50" cy="62" rx="22" ry="24" fill="#795548" />
        {/* Barriga */}
        <ellipse cx="50" cy="65" rx="12" ry="14" fill="#bcaaa4" />
        {/* Cabeça */}
        <circle cx="50" cy="36" r="22" fill="#795548" />
        {/* Orelhas */}
        <circle cx="29" cy="34" r="8" fill="#795548" />
        <circle cx="71" cy="34" r="8" fill="#795548" />
        <circle cx="29" cy="34" r="5" fill="#ef9a9a" />
        <circle cx="71" cy="34" r="5" fill="#ef9a9a" />
        {/* Face */}
        <ellipse cx="50" cy="42" rx="14" ry="11" fill="#bcaaa4" />
        {/* Olhos */}
        <circle cx="43" cy="32" r="5.5" fill="#fff" />
        <circle cx="57" cy="32" r="5.5" fill="#fff" />
        <circle cx="43" cy="32" r="3" fill="#1a1a2e" />
        <circle cx="57" cy="32" r="3" fill="#1a1a2e" />
        <circle cx="44" cy="31" r="1.2" fill="#fff" />
        <circle cx="58" cy="31" r="1.2" fill="#fff" />
        {/* Nariz */}
        <ellipse cx="50" cy="40" rx="3.5" ry="2.5" fill="#5d4037" />
        <circle cx="48.5" cy="39.5" r="1" fill="#4e342e" />
        <circle cx="51.5" cy="39.5" r="1" fill="#4e342e" />
        {/* Boca */}
        {mood === 'happy'
          ? <path d="M 43 46 Q 50 52 57 46" stroke="#5d4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          : <line x1="43" y1="47" x2="57" y2="47" stroke="#5d4037" strokeWidth="2" />
        }
        {/* Braços */}
        <path d="M 28 58 Q 18 50 20 40" stroke="#795548" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 72 58 Q 82 50 80 40" stroke="#795548" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* Patas */}
        <ellipse cx="40" cy="85" rx="8" ry="5" fill="#795548" />
        <ellipse cx="60" cy="85" rx="8" ry="5" fill="#795548" />
        {/* Engenhoca nível 2+ */}
        {level >= 2 && (
          <g transform="translate(74, 38)">
            <rect x="0" y="0" width="12" height="8" rx="2" fill="#f57c00" />
            <circle cx="6" cy="4" r="2.5" fill="#ffd600" />
          </g>
        )}
        {/* Capacete inventor nível 3+ */}
        {level >= 3 && (
          <>
            <path d="M 30 22 Q 50 8 70 22" stroke="#f57c00" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="14" r="5" fill="#ffd600" />
          </>
        )}
      </svg>
    </div>
  )
}
