import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import useAuthStore from '../store/authStore'
import useProgressStore from '../store/progressStore'
import { useProgress } from '../hooks/useProgress'
import { getCharacter, worlds } from '../data/worlds'
import CharacterSprite from '../components/characters/CharacterSprite'

const WORLD_EMOJIS = {
  portugues:  '📖',
  matematica: '➕',
  ciencias:   '🌳',
  geografia:  '🌎',
  historia:   '⏳',
  artes:      '🎨',
}

export default function WorldSelectPage() {
  useProgress()
  const user = useAuthStore((state) => state.user)
  const getPhaseStars = useProgressStore((state) => state.getPhaseStars)
  const [hoveredId, setHoveredId] = useState(null)

  function worldProgress(worldId) {
    let total = 0
    for (let i = 1; i <= 5; i += 1) {
      total += getPhaseStars(`${worldId}-${i}`)
    }
    return Math.round((total / 15) * 100)
  }

  return (
    <div className="app-shell">
      <Header />
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>

        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow" style={{ color: 'var(--color-primary)' }}>Escolha seu caminho</span>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: '#2d2d3a', marginTop: 8 }}>
            Olá, {user?.name?.split(' ')[0] ?? 'aventureiro'}! 👋
          </h1>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 16 }}>
            {user?.school_year ? `${user.school_year}º ano — ` : ''}Selecione um mundo para continuar aprendendo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {worlds.map((world) => {
            const pct = worldProgress(world.id)
            const character = getCharacter(world.characterId)
            const isHovered = hoveredId === world.id

            return (
              <Link key={world.id} to={`/mundos/${world.id}/fases`} style={{ textDecoration: 'none' }}>
                <article
                  onMouseEnter={() => setHoveredId(world.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow)',
                    border: `2px solid ${world.color}22`,
                    transition: 'border-color 0.2s',
                    height: '100%',
                  }}
                >
                  {/* Topo colorido com o bichinho */}
                  <div style={{
                    background: `linear-gradient(160deg, ${world.softColor} 0%, ${world.color}22 100%)`,
                    padding: '28px 24px 16px',
                    textAlign: 'center',
                    position: 'relative',
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Emoji do mundo no canto */}
                    <div style={{
                      position: 'absolute', top: 12, left: 14,
                      fontSize: 22,
                      background: '#fff',
                      borderRadius: 10,
                      width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}>
                      {WORLD_EMOJIS[world.id]}
                    </div>

                    {/* Bichinho animado */}
                    <div style={{
                      animation: 'mascot-orbit 3s ease-in-out infinite',
                      filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.15))',
                    }}>
                      <CharacterSprite
                        id={world.characterId}
                        size={110}
                        active={isHovered}
                        title={character?.name}
                      />
                    </div>

                    {/* Nome do personagem */}
                    <div style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 800,
                      color: world.color,
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                    }}>
                      {character?.name} · {character?.title}
                    </div>
                  </div>

                  {/* Corpo do card */}
                  <div style={{ padding: '18px 22px 20px' }}>
                    <h3 style={{ fontWeight: 800, fontSize: 17, color: '#2d2d3a', marginBottom: 3 }}>
                      {world.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 14 }}>
                      {world.subject} · {world.phases} fases
                    </p>

                    {/* Barra de progresso */}
                    <div style={{ background: '#f0f0f0', borderRadius: 20, height: 7, overflow: 'hidden' }}>
                      <div style={{
                        background: `linear-gradient(90deg, ${world.color}, ${world.color}88)`,
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: 20,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#aaa' }}>
                        {pct === 0 ? 'Não iniciado' : `${pct}% completo`}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: isHovered ? world.color : '#bbb',
                        transition: 'color 0.2s',
                      }}>
                        Jogar →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
