import React, { useState } from 'react'

/* 🦫 Bia — Capivara Exploradora (SVG animado) */
export default function Bia({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [wiggle, setWiggle] = useState(false)

  function handleClick() {
    setWiggle(true)
    setTimeout(() => setWiggle(false), 600)
    onClick?.()
  }

  return (
    <div onClick={handleClick} style={{ width: size, height: size, cursor: 'pointer', userSelect: 'none', display: 'inline-block', animation: wiggle ? 'biawiggle 0.6s ease' : 'biabob 3s ease-in-out infinite' }}>
      <style>{`
        @keyframes biabob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes biawiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-6deg)} 75%{transform:rotate(6deg)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Corpo grande */}
        <ellipse cx="50" cy="66" rx="30" ry="24" fill="#795548" />
        {/* Barriga */}
        <ellipse cx="50" cy="70" rx="18" ry="14" fill="#a1887f" />
        {/* Cabeça grande (característico da capivara) */}
        <rect x="28" y="18" width="44" height="36" rx="14" fill="#795548" />
        {/* Nariz largo */}
        <ellipse cx="50" cy="46" rx="10" ry="6" fill="#6d4c41" />
        <circle cx="46" cy="45" r="2" fill="#4e342e" />
        <circle cx="54" cy="45" r="2" fill="#4e342e" />
        {/* Olhos */}
        <circle cx="38" cy="28" r="5.5" fill="#fff" />
        <circle cx="62" cy="28" r="5.5" fill="#fff" />
        <circle cx="38" cy="28" r="3" fill="#1a1a2e" />
        <circle cx="62" cy="28" r="3" fill="#1a1a2e" />
        <circle cx="39" cy="27" r="1.2" fill="#fff" />
        <circle cx="63" cy="27" r="1.2" fill="#fff" />
        {/* Orelhas pequenas */}
        <circle cx="30" cy="20" r="6" fill="#795548" />
        <circle cx="70" cy="20" r="6" fill="#795548" />
        <circle cx="30" cy="20" r="3.5" fill="#ef9a9a" />
        <circle cx="70" cy="20" r="3.5" fill="#ef9a9a" />
        {/* Boca */}
        {mood === 'happy'
          ? <path d="M 42 52 Q 50 58 58 52" stroke="#6d4c41" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          : <line x1="42" y1="53" x2="58" y2="53" stroke="#6d4c41" strokeWidth="2.5" />
        }
        {/* Pernas */}
        <ellipse cx="36" cy="88" rx="9" ry="6" fill="#6d4c41" />
        <ellipse cx="64" cy="88" rx="9" ry="6" fill="#6d4c41" />
        {/* Braços */}
        <ellipse cx="22" cy="66" rx="8" ry="6" fill="#795548" transform="rotate(-20 22 66)" />
        <ellipse cx="78" cy="66" rx="8" ry="6" fill="#795548" transform="rotate(20 78 66)" />
        {/* Mochila exploradora nível 2+ */}
        {level >= 2 && (
          <>
            <rect x="62" y="50" width="16" height="22" rx="4" fill="#00838f" />
            <rect x="64" y="54" width="12" height="8" rx="2" fill="#004d40" />
            <line x1="63" y1="52" x2="63" y2="70" stroke="#00695c" strokeWidth="2" />
          </>
        )}
        {/* Mapa nível 3+ */}
        {level >= 3 && (
          <g transform="translate(24, 60)">
            <rect x="0" y="0" width="14" height="10" rx="2" fill="#fff9c4" />
            <line x1="2" y1="3" x2="12" y2="3" stroke="#00838f" strokeWidth="1" />
            <line x1="2" y1="6" x2="12" y2="6" stroke="#00838f" strokeWidth="1" />
            <circle cx="7" cy="8" r="1.5" fill="#f44336" />
          </g>
        )}
      </svg>
    </div>
  )
}
