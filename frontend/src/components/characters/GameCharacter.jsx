import React, { useState, useEffect, useRef } from 'react'
import SpriteAnimator from './SpriteAnimator'

const BASE = '/assets/personagens_sprites'

/**
 * Sequências por personagem e reação.
 * frames: quais índices (0-4) usar e por quanto tempo.
 * Escolhidos frame a frame para evitar poses com ferramentas ou poses erradas.
 *
 * Ações disponíveis:
 *   luma   → idle | andando | falando | pulando
 *   byte   → poses estáticas (normal, pensativo, positivo...) + andando | pulando (5 frames cada)
 *   faisca → poses estáticas (normal, cruzado, rindo...) + andando | correndo (5 frames cada)
 *   teo    → idle | andando | emocoes  | pulando
 *   nino   → idle | andando | emocoes  | pulando
 *   bia    → poses estáticas (frontal, acenando, comemorando, triste...) + andando (5 frames)
 */
const CHAR_REACTIONS = {
  luma: {
    correct: { action: 'pulando',  frames: [{ i:0,ms:140 },{ i:1,ms:150 },{ i:2,ms:160 },{ i:3,ms:180 },{ i:2,ms:150 },{ i:1,ms:140 },{ i:0,ms:120 }] },
    wrong:   { action: 'falando',  frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
  byte: {
    correct: { action: 'pulando',  frames: [{ i:0,ms:140 },{ i:1,ms:140 },{ i:2,ms:140 },{ i:3,ms:160 },{ i:4,ms:180 },{ i:3,ms:140 },{ i:2,ms:120 },{ i:0,ms:120 }] },
    wrong:   { images: [`${BASE}/byte/sprites/normal.png`, `${BASE}/byte/sprites/pensativo.png`], frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
  faisca: {
    // correndo só tem frames 01, 02, 05 (índices 0, 1, 4)
    correct: { action: 'correndo', frames: [{ i:0,ms:120 },{ i:1,ms:120 },{ i:4,ms:140 },{ i:1,ms:120 },{ i:0,ms:140 }] },
    wrong:   { images: [`${BASE}/faisca/sprites/normal.png`, `${BASE}/faisca/sprites/cruzado.png`], frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
  teo: {
    correct: { action: 'pulando',  frames: [{ i:0,ms:140 },{ i:1,ms:150 },{ i:2,ms:160 },{ i:3,ms:180 },{ i:4,ms:200 },{ i:3,ms:150 },{ i:0,ms:120 }] },
    wrong:   { images: [`${BASE}/teo/sprites/normal.png`, `${BASE}/teo/sprites/pensando.png`], frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
  nino: {
    // pulando só tem frames 01-04 (índices 0-3)
    correct: { action: 'pulando',  frames: [{ i:0,ms:140 },{ i:1,ms:150 },{ i:2,ms:160 },{ i:3,ms:200 },{ i:2,ms:150 },{ i:1,ms:140 },{ i:0,ms:120 }] },
    wrong:   { images: [`${BASE}/nino/sprites/positivo.png`, `${BASE}/nino/sprites/pensando.png`], frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
  // Bia não tem frames numerados (poses estáticas), por isso usa `images` em vez de `action`
  bia: {
    correct: { images: [`${BASE}/bia/sprites/frontal.png`, `${BASE}/bia/sprites/comemorando.png`], frames: [{ i:0,ms:100 },{ i:1,ms:700 },{ i:0,ms:200 }] },
    wrong:   { images: [`${BASE}/bia/sprites/frontal.png`, `${BASE}/bia/sprites/triste.png`],       frames: [{ i:1,ms:600 },{ i:0,ms:400 }] },
  },
}

// Idle de personagens sem frames numerados (poses estáticas)
const CHAR_IDLE_IMAGE = {
  luma:   `${BASE}/luma/sprites/ensinando.png`,
  byte:   `${BASE}/byte/sprites/normal.png`,
  faisca: `${BASE}/faisca/sprites/normal.png`,
  teo:    `${BASE}/teo/sprites/normal.png`,
  nino:   `${BASE}/nino/sprites/positivo.png`,
  bia:    `${BASE}/bia/sprites/frontal.png`,
}

function frameSrc(id, def, i) {
  if (def.images) return def.images[i]
  return `${BASE}/${id}/sprites/${def.action}_${String(i + 1).padStart(2, '0')}.png`
}

export default function GameCharacter({ id, size = 100, reaction = 'idle' }) {
  const reactions  = CHAR_REACTIONS[id] ?? CHAR_REACTIONS.luma
  const idleSrc    = CHAR_IDLE_IMAGE[id] ?? frameSrc(id, { action: 'idle' }, 0)

  const [src, setSrc]         = useState(idleSrc)
  const animRef               = useRef(null)
  const playingRef            = useRef(false)
  const prevReactionRef       = useRef('idle')

  // Pré-carrega frames de correct e wrong
  useEffect(() => {
    new window.Image().src = idleSrc
    ;['correct', 'wrong'].forEach((key) => {
      const def = reactions[key]
      def.frames.forEach(({ i }) => { new window.Image().src = frameSrc(id, def, i) })
    })

    animRef.current = new SpriteAnimator((frameIdx) => {
      const current = prevReactionRef.current
      if (current === 'idle') return
      setSrc(frameSrc(id, reactions[current], frameIdx))
    })

    return () => animRef.current?.stop()
  }, [id])

  // Reage à mudança de estado
  useEffect(() => {
    if (reaction === 'idle' || reaction === prevReactionRef.current) return

    const seq = reactions[reaction]
    if (!seq) return

    prevReactionRef.current = reaction
    playingRef.current = true

    animRef.current?.play(seq.frames, {
      loop: false,
      onDone: () => {
        setSrc(idleSrc)
        prevReactionRef.current = 'idle'
        playingRef.current = false
      },
    })
  }, [reaction, id])

  // Quando reaction voltar para idle externamente, reseta imediatamente
  useEffect(() => {
    if (reaction === 'idle' && !playingRef.current) {
      setSrc(idleSrc)
    }
  }, [reaction, idleSrc])

  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <img
        src={src}
        alt={id}
        draggable="false"
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'bottom center',
          display: 'block', pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}
