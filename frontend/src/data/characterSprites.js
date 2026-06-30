const basePath = '/assets/personagens_sprites'

function frames(characterId, action, count = 5) {
  return Array.from({ length: count }, (_, i) =>
    `${basePath}/${characterId}/sprites/${action}_${String(i + 1).padStart(2, '0')}.png`
  )
}

export const characterSprites = {
  luma: {
    idle: [`${basePath}/luma/sprites/ensinando.png`],
    hover: frames('luma', 'falando'),
    hoverLabel: 'falando',
  },
  byte: {
    idle: [`${basePath}/byte/sprites/normal.png`],
    hover: [`${basePath}/byte/sprites/falando.png`],
    hoverLabel: 'falando',
  },
  faisca: {
    idle: [`${basePath}/faisca/sprites/normal.png`],
    hover: [`${basePath}/faisca/sprites/rindo.png`],
    hoverLabel: 'rindo',
  },
  teo: {
    idle: [`${basePath}/teo/sprites/normal.png`],
    hover: [`${basePath}/teo/sprites/falando.png`],
    hoverLabel: 'falando',
  },
  nino: {
    idle: [`${basePath}/nino/sprites/positivo.png`],
    hover: [`${basePath}/nino/sprites/ideia.png`],
    hoverLabel: 'ideia',
  },
  bia: {
    idle: [`${basePath}/bia/sprites/frontal.png`],
    hover: [`${basePath}/bia/sprites/acenando.png`],
    hoverLabel: 'acenando',
  },
}

export function getCharacterSprite(characterId) {
  return characterSprites[characterId]
}
