import React, { useState } from 'react'

const BASE = '/assets/personagens_sprites'

// Imagem padrão (idle_01) e imagem de hover por personagem
const CHAR_IMAGES = {
  luma:   { idle: `${BASE}/luma/sprites/ensinando.png`, hover: `${BASE}/luma/sprites/falando.png` },
  byte:   { idle: `${BASE}/byte/sprites/normal.png`,    hover: `${BASE}/byte/sprites/falando.png` },
  faisca: { idle: `${BASE}/faisca/sprites/normal.png`,  hover: `${BASE}/faisca/sprites/rindo.png` },
  teo:    { idle: `${BASE}/teo/sprites/normal.png`,     hover: `${BASE}/teo/sprites/falando.png` },
  nino:   { idle: `${BASE}/nino/sprites/positivo.png`,  hover: `${BASE}/nino/sprites/ideia.png` },
  bia:    { idle: `${BASE}/bia/sprites/frontal.png`,    hover: `${BASE}/bia/sprites/acenando.png` },
}

export default function CharacterSprite({ id, size = 120, active = false, className = '', title }) {
  const [hovered, setHovered] = useState(false)
  const images = CHAR_IMAGES[id] ?? CHAR_IMAGES.luma
  const src = (active || hovered) ? images.hover : images.idle

  return (
    <span
      aria-label={title ?? id}
      role="img"
      className={`character-sprite ${className}`.trim()}
      style={{ width: size, height: size, display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt=""
        draggable="false"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom center',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.15s ease',
        }}
      />
    </span>
  )
}
