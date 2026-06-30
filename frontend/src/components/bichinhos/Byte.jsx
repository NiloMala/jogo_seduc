import React, { useState } from 'react'

/* 🤖 Byte — Robô Curioso (SVG animado) */
export default function Byte({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [spin, setSpin] = useState(false)

  function handleClick() {
    setSpin(true)
    setTimeout(() => setSpin(false), 800)
    onClick?.()
  }

  const antennaColor = level >= 3 ? '#ffd600' : '#90caf9'

  return (
    <div onClick={handleClick} style={{ width: size, height: size, cursor: 'pointer', userSelect: 'none', display: 'inline-block', animation: spin ? 'robospin 0.8s ease' : 'robofloat 2.5s ease-in-out infinite' }}>
      <style>{`
        @keyframes robofloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes robospin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Antena */}
        <line x1="50" y1="8" x2="50" y2="20" stroke="#90caf9" strokeWidth="3" />
        <circle cx="50" cy="7" r="4" fill={antennaColor} />
        {/* Cabeça */}
        <rect x="26" y="20" width="48" height="36" rx="8" fill="#1565c0" />
        {/* Visor */}
        <rect x="30" y="24" width="40" height="24" rx="5" fill="#0d47a1" />
        {/* Olhos/LEDs */}
        <circle cx="40" cy="36" r="7" fill={mood === 'happy' ? '#00e5ff' : '#ff1744'} />
        <circle cx="60" cy="36" r="7" fill={mood === 'happy' ? '#00e5ff' : '#ff1744'} />
        <circle cx="40" cy="36" r="4" fill="#fff" opacity="0.3" />
        <circle cx="60" cy="36" r="4" fill="#fff" opacity="0.3" />
        {/* Boca LED */}
        {mood === 'happy'
          ? <path d="M 40 50 Q 50 56 60 50" stroke="#00e5ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          : <line x1="40" y1="52" x2="60" y2="52" stroke="#ff1744" strokeWidth="2.5" strokeLinecap="round" />
        }
        {/* Corpo */}
        <rect x="30" y="58" width="40" height="30" rx="6" fill="#1976d2" />
        {/* Painel do corpo */}
        <rect x="36" y="63" width="28" height="16" rx="4" fill="#0d47a1" />
        <circle cx="43" cy="71" r="4" fill="#ff9800" />
        <circle cx="57" cy="71" r="4" fill="#4caf50" />
        {/* Braços */}
        <rect x="14" y="60" width="14" height="8" rx="4" fill="#1565c0" />
        <rect x="72" y="60" width="14" height="8" rx="4" fill="#1565c0" />
        <circle cx="14" cy="64" r="5" fill="#1976d2" />
        <circle cx="86" cy="64" r="5" fill="#1976d2" />
        {/* Pernas */}
        <rect x="36" y="88" width="10" height="10" rx="3" fill="#1565c0" />
        <rect x="54" y="88" width="10" height="10" rx="3" fill="#1565c0" />
        {/* Estrela nível 3+ */}
        {level >= 3 && (
          <text x="50" y="16" textAnchor="middle" fontSize="10" fill="#ffd600">★</text>
        )}
      </svg>
    </div>
  )
}
