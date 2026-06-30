const BASE = '/assets/personagens_sprites'

const falandoSeq = [
  { i: 0, ms: 160 },
  { i: 1, ms: 160 },
  { i: 2, ms: 160 },
  { i: 3, ms: 160 },
  { i: 4, ms: 160 },
]

// Byte: pisca entre idle_02 e idle_04 (únicos frames de idle mantidos)
const byteCells = [
  `${BASE}/byte/cells/idle_02_cell.png`,
  `${BASE}/byte/cells/idle_04_cell.png`,
  `${BASE}/byte/cells/idle_02_cell.png`,
]
const byteCellSeq = [
  { i: 0, ms: 220 },
  { i: 1, ms: 300 },
  { i: 2, ms: 220 },
]

export const CHARACTER_SEQUENCES = {
  luma: {
    idle:   { images: [`${BASE}/luma/sprites/ensinando.png`] },
    active: { action: 'falando', frames: falandoSeq },
  },
  byte: {
    idle:   { images: [`${BASE}/byte/sprites/normal.png`] },
    active: { images: byteCells, frames: byteCellSeq },
  },
  faisca: {
    idle:   { images: [`${BASE}/faisca/sprites/normal.png`] },
    active: { images: [`${BASE}/faisca/sprites/rindo.png`] },
  },
  teo: {
    idle:   { images: [`${BASE}/teo/sprites/normal.png`] },
    active: { images: [`${BASE}/teo/sprites/falando.png`] },
  },
  nino: {
    idle:   { images: [`${BASE}/nino/sprites/positivo.png`] },
    active: { images: [`${BASE}/nino/sprites/ideia.png`] },
  },
  bia: {
    idle:   { images: [`${BASE}/bia/sprites/frontal.png`] },
    active: { images: [`${BASE}/bia/sprites/acenando.png`] },
  },
}

export function getSequences(id) {
  return CHARACTER_SEQUENCES[id] ?? CHARACTER_SEQUENCES.luma
}
