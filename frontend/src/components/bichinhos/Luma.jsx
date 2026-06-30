import React, { useState } from 'react'

/* 🦉 Luma — Coruja Professora (SVG animado) */
export default function Luma({ size = 120, level = 1, mood = 'happy', onClick }) {
  const [bounce, setBounce] = useState(false)

  function handleClick() {
    setBounce(true)
    setTimeout(() => setBounce(false), 600)
    onClick?.()
  }

  const eyeColor = mood === 'happy' ? '#3d2b1f' : mood === 'sad' ? '#555' : '#3d2b1f'
  const featherColor = level >= 3 ? '#b39ddb' : '#7c4dff'

  return (
    <div
      onClick={handleClick}
      style={{
        width: size, height: size, cursor: 'pointer', userSelect: 'none',
        animation: bounce ? 'bounce 0.6s ease' : 'float 3s ease-in-out infinite',
        display: 'inline-block',
      }}
    >
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bounce { 0%,100%{transform:scale(1)} 30%{transform:scale(1.15)} 60%{transform:scale(0.95)} }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Corpo */}
        <ellipse cx="50" cy="62" rx="28" ry="30" fill={featherColor} />
        {/* Cabeça */}
        <circle cx="50" cy="38" r="24" fill={featherColor} />
        {/* Orelhas */}
        <polygon points="32,18 26,6 38,16" fill={featherColor} />
        <polygon points="68,18 74,6 62,16" fill={featherColor} />
        {/* Barriga */}
        <ellipse cx="50" cy="66" rx="16" ry="18" fill="#ede7f6" />
        {/* Face */}
        <ellipse cx="50" cy="42" rx="16" ry="14" fill="#fffde7" />
        {/* Olhos */}
        <circle cx="43" cy="38" r="6" fill="#fff" />
        <circle cx="57" cy="38" r="6" fill="#fff" />
        <circle cx="43" cy="38" r="3.5" fill={eyeColor} />
        <circle cx="57" cy="38" r="3.5" fill={eyeColor} />
        <circle cx="44.2" cy="37" r="1.2" fill="#fff" />
        <circle cx="58.2" cy="37" r="1.2" fill="#fff" />
        {/* Bico */}
        <polygon points="50,46 46,51 54,51" fill="#ffb300" />
        {/* Asas */}
        <ellipse cx="25" cy="60" rx="10" ry="16" fill={featherColor} transform="rotate(-15 25 60)" />
        <ellipse cx="75" cy="60" rx="10" ry="16" fill={featherColor} transform="rotate(15 75 60)" />
        {/* Patas */}
        <line x1="43" y1="90" x2="40" y2="96" stroke="#ffb300" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="90" x2="50" y2="96" stroke="#ffb300" strokeWidth="3" strokeLinecap="round" />
        <line x1="57" y1="90" x2="60" y2="96" stroke="#ffb300" strokeWidth="3" strokeLinecap="round" />
        {/* Chapéu de professor (nível 3+) */}
        {level >= 3 && (
          <>
            <rect x="32" y="18" width="36" height="6" rx="2" fill="#3d2b1f" />
            <rect x="38" y="8" width="24" height="12" rx="3" fill="#3d2b1f" />
          </>
        )}
      </svg>
    </div>
  )
}
