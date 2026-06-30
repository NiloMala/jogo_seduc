# Sprites e Animações dos Personagens

## Localização dos Arquivos

```
frontend/public/assets/characters/
├── crops/          # Retratos estáticos (usado em cards, perfil)
│   ├── luma.png
│   ├── byte.png
│   ├── faisca.png
│   ├── teo.png
│   ├── nino.png
│   └── bia.png
└── sprites/        # Spritesheets horizontais (5 frames cada)
    ├── luma-spritesheet.png
    ├── byte-spritesheet.png
    ├── faisca-spritesheet.png
    ├── teo-spritesheet.png
    ├── nino-spritesheet.png
    └── bia-spritesheet.png
```

## Formato dos Spritesheets
- **5 frames horizontais** por personagem
- Cada frame é quadrado (~280×280px por frame, ~1400×280px total)
- Fundo transparente (PNG)

## Como Funciona a Animação

O componente `CharacterSprite` usa **JavaScript** (não CSS puro) para ciclagem de frames, porque CSS custom properties não funcionam dentro de `steps()`.

```jsx
<CharacterSprite
  id="luma"          // ID do personagem
  size={120}         // Tamanho em px
  alwaysAnimate      // Se true, cicla sempre; se false, só no hover
  fps={5}            // Quadros por segundo
/>
```

### Lógica de posicionamento
- `background-size: 500% 100%` (5 frames × 100%)
- `background-position: X% 0` onde `X = frame / (frames-1) * 100`
  - Frame 0 → 0%, Frame 1 → 25%, Frame 2 → 50%, Frame 3 → 75%, Frame 4 → 100%

### Animação CSS de flutuação
O sprite tem a animação CSS `sprite-breathe` que faz o personagem subir e descer suavemente, independente do ciclagem de frames.

## Uso na HomePage

| Área | Comportamento |
|------|---------------|
| **Hero (destaque)** | 1 personagem em destaque, rotaciona a cada 3.2s, sempre animado (`alwaysAnimate`) |
| **Parade** | Faixa horizontal com todos os 6 personagens duplicados desfilando, sempre animados |
| **Cards do elenco** | Anima no hover (JS detecta mouse) |
| **Cards dos mundos** | Ícone menor (56px), anima no hover |

## Frames por Personagem

| ID | Frames |
|----|--------|
| luma | idle, front, mirror, hint, read |
| byte | idle, front, mirror, thumbs, board |
| faisca | idle, front, mirror, map, run |
| teo | idle, front, mirror, read, meditate |
| nino | idle, front, mirror, tool, gadget |
| bia | idle, front, mirror, globe, magnify |
