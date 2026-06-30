import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import StarRating from '../components/ui/StarRating'
import CharacterSprite from '../components/characters/CharacterSprite'
import useProgressStore from '../store/progressStore'
import { getPhases } from '../api/questions'
import useAuthStore from '../store/authStore'
import { getCharacter, worlds } from '../data/worlds'

export default function PhaseSelectPage() {
  const { worldId } = useParams()
  const user = useAuthStore((state) => state.user)
  const getPhaseStars = useProgressStore((state) => state.getPhaseStars)
  const [phases, setPhases] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const world = worlds.find((item) => item.id === worldId) ?? worlds[0]
  const character = getCharacter(world.characterId)

  useEffect(() => {
    setLoading(true)
    getPhases(user?.school_year, worldId)
      .then(({ data }) => setPhases(data))
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

  return (
    <div className="app-shell">
      <Header />
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: 920, margin: '0 auto', width: '100%' }}>
        <Link to="/mundos" style={{ color: '#6c3fc5', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          Voltar aos mundos
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
          <CharacterSprite id={world.characterId} size={130} title={character?.name} />
          <div style={{ paddingBottom: 8 }}>
            <span className="eyebrow" style={{ color: world.color }}>{character?.name} · {character?.title}</span>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#2d2d3a', marginTop: 4 }}>{world.name}</h1>
            <p style={{ color: '#6b7280', marginTop: 4 }}>Escolha uma fase para jogar.</p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#6b7280' }}>Carregando fases...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
            {phases.map((phase, index) => {
              const stars = getPhaseStars(phase.id)
              const locked = isLocked(index)

              return (
                <button
                  key={phase.id}
                  onClick={() => !locked && navigate(`/fases/${phase.id}/jogo`)}
                  type="button"
                  style={{
                    background: locked ? '#f5f5f5' : '#fff',
                    borderRadius: 16,
                    padding: '24px 16px',
                    textAlign: 'center',
                    boxShadow: locked ? 'none' : 'var(--shadow)',
                    border: `2px solid ${locked ? '#e0e0e0' : `${world.color}33`}`,
                    cursor: locked ? 'not-allowed' : 'pointer',
                    opacity: locked ? 0.62 : 1,
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(event) => {
                    if (!locked) event.currentTarget.style.transform = 'scale(1.04)'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'none'
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 900, color: locked ? '#9ca3af' : world.color, marginBottom: 8 }}>
                    {locked ? 'Bloq.' : index + 1}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: world.color, marginBottom: 8 }}>
                    {phase.title || `Fase ${phase.number}`}
                  </div>
                  <StarRating stars={stars} max={3} size={18} color={world.color} />
                </button>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
