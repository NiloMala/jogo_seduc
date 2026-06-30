import React, { useState } from 'react'

/* 🦊 Faísca — Raposa Aventureira (SVG animado) */
export default function Faisca({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [dash, setDash] = useState(false)

  function handleClick() {
    setDash(true)
    setTimeout(() => setDash(false), 700)
    onClick?.()
  }

  return (
    <div onClick={handleClick} style={{ width: size, height: size, cursor: 'pointer', userSelect: 'none', display: 'inline-block', animation: dash ? 'foxdash 0.7s ease' : 'foxwag 2s ease-in-out infinite' }}>
      <style>{`
        @keyframes foxwag { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        @keyframes foxdash { 0%{transform:translateX(0)} 25%{transform:translateX(-12px)} 75%{transform:translateX(8px)} 100%{transform:translateX(0)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Cauda */}
        <ellipse cx="76" cy="72" rx="16" ry="8" fill="#e65100" transform="rotate(-30 76 72)" />
        <ellipse cx="83" cy="66" rx="8" ry="4" fill="#fff" transform="rotate(-30 83 66)" />
        {/* Corpo */}
        <ellipse cx="48" cy="64" rx="22" ry="24" fill="#ef6c00" />
        {/* Cabeça */}
        <circle cx="48" cy="36" r="22" fill="#ef6c00" />
        {/* Orelhas */}
        <polygon points="34,18 28,4 42,14" fill="#ef6c00" />
        <polygon points="62,18 68,4 58,14" fill="#ef6c00" />
        <polygon points="35,17 30,7 40,15" fill="#e91e63" />
        <polygon points="61,17 66,7 56,15" fill="#e91e63" />
        {/* Face branca */}
        <ellipse cx="48" cy="42" rx="14" ry="12" fill="#fff3e0" />
        {/* Olhos */}
        <ellipse cx="41" cy="34" rx="5" ry="5.5" fill="#fff" />
        <ellipse cx="55" cy="34" rx="5" ry="5.5" fill="#fff" />
        <circle cx="41" cy="34" r="3" fill="#1a1a2e" />
        <circle cx="55" cy="34" r="3" fill="#1a1a2e" />
        <circle cx="42" cy="33" r="1" fill="#fff" />
        <circle cx="56" cy="33" r="1" fill="#fff" />
        {/* Nariz */}
        <ellipse cx="48" cy="41" rx="3" ry="2" fill="#ad1457" />
        {/* Boca */}
        {mood === 'happy'
          ? <path d="M 43 45 Q 48 50 53 45" stroke="#ad1457" strokeWidth="2" fill="none" strokeLinecap="round" />
          : <line x1="43" y1="46" x2="53" y2="46" stroke="#ad1457" strokeWidth="2" />
        }
        {/* Patas */}
        <ellipse cx="38" cy="86" rx="7" ry="5" fill="#e65100" />
        <ellipse cx="58" cy="86" rx="7" ry="5" fill="#e65100" />
        {/* Lenço aventureiro nível 2+ */}
        {level >= 2 && (
          <path d="M 36 54 Q 48 60 60 54 L 58 62 Q 48 68 38 62 Z" fill="#e91e63" opacity="0.85" />
        )}
        {/* Capa nível 4+ */}
        {level >= 4 && (
          <path d="M 34 54 Q 48 70 62 54" stroke="#ffd600" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </svg>
    </div>
  )
}
