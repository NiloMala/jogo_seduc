import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import StarRating from '../components/ui/StarRating'
import useProgressStore from '../store/progressStore'
import { getPhases } from '../api/questions'
import useAuthStore from '../store/authStore'
import { getCharacter, worlds } from '../data/worlds'

const BASE = '/assets/personagens_sprites'

const IDLE_IMAGES = {
  luma: `${BASE}/luma/sprites/ensinando.png`,
  byte: `${BASE}/byte/sprites/normal.png`,
  faisca: `${BASE}/faisca/sprites/normal.png`,
  teo: `${BASE}/teo/sprites/normal.png`,
  nino: `${BASE}/nino/sprites/positivo.png`,
  bia: `${BASE}/bia/sprites/frontal.png`,
}

const MAP_POINTS = [
  { x: 13, y: 78 },
  { x: 31, y: 61 },
  { x: 49, y: 72 },
  { x: 68, y: 50 },
  { x: 84, y: 31 },
]

const WALK_DURATION_MS = 2200
const ARRIVAL_PAUSE_MS = 700

// Números dos sprites "andando_NN" usados no ciclo de caminhada, por personagem.
// Luma não usa o 1 (ela aparece segurando um livro nesse frame, quebra a animação).
const WALK_FRAME_NUMBERS = {
  luma: [2, 3],
}
const DEFAULT_WALK_FRAME_NUMBERS = [1, 2, 3]

function clampPercent(value) {
  return Math.round(Math.min(100, Math.max(0, value)) * 10) / 10
}

function walkFrame(id, frameNumber) {
  return `${BASE}/${id}/sprites/andando_${String(frameNumber).padStart(2, '0')}.png`
}

function JourneyCharacter({ id, walking, point, editMode, onDragStart, onArrive }) {
  const [frame, setFrame] = useState(0)
  const frameNumbers = WALK_FRAME_NUMBERS[id] ?? DEFAULT_WALK_FRAME_NUMBERS
  const src = walking ? walkFrame(id, frameNumbers[frame % frameNumbers.length]) : (IDLE_IMAGES[id] ?? IDLE_IMAGES.luma)

  useEffect(() => {
    ;[IDLE_IMAGES[id], ...frameNumbers.map((n) => walkFrame(id, n))]
      .filter(Boolean)
      .forEach((imageSrc) => {
        const image = new window.Image()
        image.src = imageSrc
      })
  }, [id])

  useEffect(() => {
    if (!walking) {
      setFrame(0)
      return undefined
    }

    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % frameNumbers.length)
    }, 165)

    return () => window.clearInterval(timer)
  }, [walking, frameNumbers.length])

  return (
    <img
      className={`phase-map__character${walking ? ' is-walking' : ''}`}
      src={src}
      alt=""
      draggable="false"
      onPointerDown={onDragStart}
      onTransitionEnd={(event) => {
        // Avisa o pai exatamente quando a posição (left/top) termina de animar,
        // em vez de confiar num setTimeout que pode ficar alguns ms fora de sincronia.
        if (walking && (event.propertyName === 'left' || event.propertyName === 'top')) {
          onArrive?.()
        }
      }}
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        // Sem isso, qualquer recálculo de posição (ex: ao reabrir a tela após
        // completar uma fase) herda a transição CSS e parece um passeio sozinho.
        // Só anima de verdade quando é um clique do aluno (walking = true).
        transition: walking ? undefined : 'none',
        pointerEvents: editMode ? 'auto' : 'none',
        cursor: editMode ? 'grab' : undefined,
      }}
    />
  )
}

export default function PhaseSelectPage() {
  const { worldId } = useParams()
  const user = useAuthStore((state) => state.user)
  const getPhaseStars = useProgressStore((state) => state.getPhaseStars)
  const [phases, setPhases] = useState([])
  const [loading, setLoading] = useState(true)
  const [targetIndex, setTargetIndex] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  const arriveRef = useRef(null)
  const navigate = useNavigate()

  // ── Modo edição (dev): arrastar Byte e os cards para ajustar posições ──
  const mapRef = useRef(null)
  const draggingRef = useRef(null) // 'character' | número do índice da fase
  const [editMode, setEditMode] = useState(false)
  const [overrides, setOverrides] = useState({ character: null, phases: {}, cards: {} })

  useEffect(() => {
    if (!editMode) return undefined

    function onPointerMove(event) {
      if (draggingRef.current === null || !mapRef.current) return
      const rect = mapRef.current.getBoundingClientRect()
      const point = {
        x: clampPercent(((event.clientX - rect.left) / rect.width) * 100),
        y: clampPercent(((event.clientY - rect.top) / rect.height) * 100),
      }
      setOverrides((prev) => {
        if (draggingRef.current === 'character') {
          return { ...prev, character: point }
        }
        if (typeof draggingRef.current === 'string' && draggingRef.current.startsWith('card-')) {
          const cardIndex = draggingRef.current.slice(5)
          return { ...prev, cards: { ...prev.cards, [cardIndex]: point } }
        }
        return { ...prev, phases: { ...prev.phases, [draggingRef.current]: point } }
      })
    }

    function onPointerUp() {
      draggingRef.current = null
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [editMode])

  function startDrag(id) {
    return (event) => {
      if (!editMode) return
      event.preventDefault()
      event.stopPropagation()
      draggingRef.current = id
    }
  }

  async function copyPointsJson(json) {
    try {
      await navigator.clipboard.writeText(json)
    } catch (_) {
      // clipboard indisponível — usuário pode selecionar o texto manualmente
    }
  }

  const world = worlds.find((item) => item.id === worldId) ?? worlds[0]
  const character = getCharacter(world.characterId)

  useEffect(() => {
    setLoading(true)
    setTargetIndex(null)
    setIsMoving(false)
    getPhases(user?.school_year, worldId)
      .then(({ data }) => setPhases(data.slice(0, world?.phases ?? 5)))
      .catch(() => {
        setPhases(
          Array.from({ length: world?.phases ?? 5 }, (_, index) => ({
            id: `${worldId}-${index + 1}`,
            number: index + 1,
            title: `Fase ${index + 1}`,
          })),
        )
      })
      .finally(() => setLoading(false))
  }, [worldId, user?.school_year, world?.phases])

  function isLocked(index) {
    if (index === 0) return false
    return getPhaseStars(phases[index - 1]?.id) < 2
  }

  const currentIndex = useMemo(() => {
    if (!phases.length) return 0

    const firstLocked = phases.findIndex((_, index) => isLocked(index))
    if (firstLocked === -1) return phases.length - 1
    return Math.max(0, firstLocked - 1)
  }, [phases, getPhaseStars])

  const characterIndex = targetIndex ?? currentIndex
  const phasePoints = world.phasePoints ?? MAP_POINTS
  const characterPoints = world.characterPoints ?? phasePoints
  const characterPoint = overrides.character ?? characterPoints[characterIndex] ?? characterPoints[0]
  const walkDuration = world.walkDuration ?? WALK_DURATION_MS

  const pointsJson = useMemo(() => JSON.stringify({
    characterPoint: overrides.character ?? characterPoint,
    phasePoints: phases.map((_, index) => overrides.phases[index] ?? phasePoints[index] ?? phasePoints[phasePoints.length - 1]),
    cardPoints: phases.map((_, index) => overrides.cards[index] ?? world.cardPoints?.[index] ?? null),
  }, null, 2), [overrides, phases, phasePoints, characterPoint, world.cardPoints])

  function openPhase(phase, index) {
    if (editMode) return
    if (isLocked(index) || isMoving) return

    // Se o aluno clicou na fase em que o personagem já está parado (o caso
    // mais comum), não há distância real pra percorrer — pula a "caminhada"
    // em vez de fingir andar no lugar por todo o walkDuration.
    const targetPoint = characterPoints[index] ?? characterPoints[0]
    const alreadyThere = Math.abs(characterPoint.x - targetPoint.x) < 1 && Math.abs(characterPoint.y - targetPoint.y) < 1

    setTargetIndex(index)

    if (alreadyThere) {
      window.setTimeout(() => {
        navigate(`/fases/${phase.id}/jogo`, { state: { worldId } })
      }, 250)
      return
    }

    setIsMoving(true)

    let arrived = false
    const arrive = () => {
      if (arrived) return
      arrived = true
      arriveRef.current = null
      // Chegou na posição: para a animação de caminhada antes de navegar.
      setIsMoving(false)
      window.setTimeout(() => {
        navigate(`/fases/${phase.id}/jogo`, { state: { worldId } })
      }, ARRIVAL_PAUSE_MS)
    }

    // onTransitionEnd cobre o caso normal; o setTimeout é só uma rede de
    // segurança (ex: o ponto de destino é igual ao atual e a transição não dispara).
    arriveRef.current = arrive
    window.setTimeout(arrive, walkDuration + 250)
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="phase-page">
        <Link to="/mundos" className="phase-page__back">
          Voltar aos mundos
        </Link>

        <section className="phase-page__header">
          <div>
            <span className="eyebrow" style={{ color: world.color }}>
              {character?.name} · {character?.title}
            </span>
            <h1>{world.name}</h1>
            <p>Percorra a estrada do conhecimento e escolha sua próxima fase.</p>
          </div>
          <button
            type="button"
            onClick={() => setEditMode((value) => !value)}
            style={{
              alignSelf: 'flex-start',
              background: editMode ? world.color : '#fff',
              color: editMode ? '#fff' : world.color,
              border: `2px solid ${world.color}`,
              borderRadius: 10,
              padding: '8px 14px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {editMode ? '✓ Editando posições (arraste)' : '✏️ Editar posições'}
          </button>
        </section>

        {loading ? (
          <div className="phase-page__loading">Carregando fases...</div>
        ) : (
          <>
          <section
            ref={mapRef}
            className="phase-map"
            style={{
              '--world-color': world.color,
              '--world-soft': world.softColor,
              '--walk-duration': `${walkDuration}ms`,
              backgroundImage: `linear-gradient(180deg, rgba(11, 17, 31, 0.12), rgba(11, 17, 31, 0.34)), url(${world.mapImage ?? world.backgroundImage})`,
            }}
          >
            <JourneyCharacter
              id={world.characterId}
              walking={isMoving}
              point={characterPoint}
              editMode={editMode}
              onDragStart={startDrag('character')}
              onArrive={() => arriveRef.current?.()}
            />

            {phases.map((phase, index) => {
              const stars = getPhaseStars(phase.id)
              const locked = isLocked(index)
              const completed = stars > 0
              const point = overrides.phases[index] ?? phasePoints[index] ?? phasePoints[phasePoints.length - 1]
              const customCardPoint = overrides.cards[index] ?? world.cardPoints?.[index] ?? null

              const hasCharacter = Math.abs(characterPoint.x - point.x) < 3 && Math.abs(characterPoint.y - point.y) < 6

              return (
                <button
                  key={phase.id}
                  className={`phase-stop${locked ? ' is-locked' : ''}${completed ? ' is-complete' : ''}`}
                  type="button"
                  onClick={() => openPhase(phase, index)}
                  onPointerDown={startDrag(index)}
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    '--stop-color': world.color,
                    '--card-gap': hasCharacter ? 'clamp(58px, 8vw, 108px)' : '14px',
                    cursor: editMode ? 'grab' : undefined,
                  }}
                >
                  <span className="phase-stop__badge">{locked ? '🔒' : index + 1}</span>
                  {!customCardPoint && (
                    <span className="phase-stop__card">
                      <strong>{phase.title || `Fase ${phase.number ?? index + 1}`}</strong>
                      <StarRating stars={stars} max={3} size={16} color={world.color} />
                    </span>
                  )}
                </button>
              )
            })}
            {/* Cards com posição independente do badge (desacopladas via modo de edição) */}
            {phases.map((phase, index) => {
              const customCardPoint = overrides.cards[index] ?? world.cardPoints?.[index] ?? null
              if (!customCardPoint) return null
              const stars = getPhaseStars(phase.id)
              const locked = isLocked(index)

              return (
                <button
                  key={`card-${phase.id}`}
                  type="button"
                  onClick={() => openPhase(phase, index)}
                  onPointerDown={startDrag(`card-${index}`)}
                  className="phase-stop__card"
                  style={{
                    position: 'absolute', left: `${customCardPoint.x}%`, top: `${customCardPoint.y}%`,
                    bottom: 'auto', transform: 'translate(-50%, -50%)', zIndex: 6, border: '0',
                    cursor: editMode ? 'grab' : (locked ? 'not-allowed' : 'pointer'),
                  }}
                >
                  <strong>{phase.title || `Fase ${phase.number ?? index + 1}`}</strong>
                  <StarRating stars={stars} max={3} size={16} color={world.color} />
                </button>
              )
            })}

            <div className="phase-map__destination">
              Casa do saber
            </div>
          </section>

          {editMode && (
            <div style={{ marginTop: 16, background: '#1f2430', color: '#d6e0ff', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <strong style={{ fontSize: 13 }}>Coordenadas atuais (cole de volta no chat)</strong>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => copyPointsJson(pointsJson)} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 8, border: 'none', background: world.color, color: '#fff', cursor: 'pointer' }}>
                    Copiar JSON
                  </button>
                  <button type="button" onClick={() => setOverrides({ character: null, phases: {}, cards: {} })} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 8, border: '1px solid #555', background: 'transparent', color: '#d6e0ff', cursor: 'pointer' }}>
                    Resetar
                  </button>
                </div>
              </div>
              <pre style={{ margin: 0, fontSize: 12, whiteSpace: 'pre-wrap', userSelect: 'text' }}>{pointsJson}</pre>
            </div>
          )}
          </>
        )}
      </main>
    </div>
  )
}
