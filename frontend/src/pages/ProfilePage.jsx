import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import CharacterSprite from '../components/characters/CharacterSprite'
import StarRating from '../components/ui/StarRating'
import useAuthStore from '../store/authStore'
import useProgressStore from '../store/progressStore'
import { useProgress } from '../hooks/useProgress'
import { worlds, getCharacter } from '../data/worlds'

const YEAR_LABEL = { 1: '1º Ano', 2: '2º Ano', 3: '3º Ano', 4: '4º Ano', 5: '5º Ano' }
const YEAR_CHAR  = { 1: 'teo', 2: 'luma', 3: 'byte', 4: 'faisca', 5: 'nino' }
const WORLD_EMOJI = { portugues: '📖', matematica: '➕', ciencias: '🌳', geografia: '🌎', historia: '⏳', artes: '🎨' }

function StatBadge({ value, label, color }) {
  return (
    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: '14px 20px', minWidth: 72 }}>
      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{label}</div>
    </div>
  )
}

function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div>
      <div style={{ background: '#f0f0f0', borderRadius: 20, height: 8, overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(90deg, ${color}, ${color}99)`, height: '100%', width: `${pct}%`, borderRadius: 20, transition: 'width 0.6s ease' }} />
      </div>
      <div style={{ fontSize: 11, color: '#aaa', textAlign: 'right', marginTop: 4 }}>{value}/{max} ⭐</div>
    </div>
  )
}

export default function ProfilePage() {
  useProgress()
  const user       = useAuthStore((s) => s.user)
  const { phases, achievements } = useProgressStore()

  const totalStars  = Object.values(phases).reduce((a, b) => a + b, 0)
  const totalPhases = Object.keys(phases).filter((k) => phases[k] > 0).length
  const avatarCharId = YEAR_CHAR[user?.school_year] ?? 'luma'

  return (
    <div className="app-shell">
      <Header />
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>

        {/* ── CARD DO ALUNO ─────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #5d35b1 0%, #7c4dff 55%, #26a6c9 100%)',
          borderRadius: 24, padding: '32px 36px',
          color: '#fff', marginBottom: 36,
          display: 'flex', alignItems: 'center',
          gap: 24, flexWrap: 'wrap',
          boxShadow: '0 8px 32px rgba(108,63,197,0.3)',
        }}>
          {/* Avatar — personagem do ano do aluno */}
          <div style={{ flexShrink: 0 }}>
            <CharacterSprite id={avatarCharId} size={100} title={user?.name} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="eyebrow" style={{ opacity: 0.75 }}>Perfil do aluno</span>
            <h1 style={{ fontSize: 30, fontWeight: 900, margin: '6px 0 4px', lineHeight: 1.1 }}>{user?.name}</h1>
            <p style={{ opacity: 0.82, fontSize: 14 }}>
              {YEAR_LABEL[user?.school_year] ?? ''} · {user?.email}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StatBadge value={totalStars} label="Estrelas" />
            <StatBadge value={totalPhases} label="Fases" />
            <StatBadge value={worlds.length} label="Mundos" />
          </div>
        </section>

        {/* ── PROGRESSO ─────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>Progresso por mundo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {worlds.map((world) => {
              const character  = getCharacter(world.characterId)
              const worldStars = Array.from({ length: world.phases }, (_, i) => phases[`${world.id}-${i + 1}`] ?? 0)
              const earned     = worldStars.reduce((a, b) => a + b, 0)
              const maxStars   = world.phases * 3

              return (
                <Link key={world.id} to={`/mundos/${world.id}/fases`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: '#fff', borderRadius: 20, padding: '20px 22px',
                    boxShadow: 'var(--shadow)', border: `2px solid ${world.color}22`,
                    transition: 'border-color 0.2s',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${world.color}55`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = `${world.color}22`}
                  >
                    {/* Cabeçalho do card */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                      <CharacterSprite id={world.characterId} size={64} title={character?.name} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                          <span style={{ fontSize: 18 }}>{WORLD_EMOJI[world.id]}</span>
                          <span style={{ fontWeight: 900, color: world.color, fontSize: 15 }}>{world.name}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{character?.name} · {world.phases} fases</div>
                        <ProgressBar value={earned} max={maxStars} color={world.color} />
                      </div>
                    </div>

                    {/* Estrelas por fase */}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {worldStars.map((stars, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 600 }}>F{i + 1}</div>
                          <StarRating stars={stars} max={3} size={11} color={world.color} />
                        </div>
                      ))}
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── CONQUISTAS ────────────────────────────────────── */}
        {achievements.length > 0 && (
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>Conquistas 🏆</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {achievements.map((a) => (
                <div key={a.id} style={{
                  background: '#fff', borderRadius: 14, padding: '14px 18px',
                  boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ fontSize: 28 }}>{a.icon ?? '🏅'}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{a.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
