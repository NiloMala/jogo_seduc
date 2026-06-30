import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import Header from '../components/layout/Header'
import { characters, getCharacter, worlds } from '../data/worlds'
import CharacterSprite from '../components/characters/CharacterSprite'

const brandLogo = '/assets/brand/missao-saber-logo.png'

export default function HomePage() {
  const user = useAuthStore((state) => state.user)
  const [hoveredCharacter, setHoveredCharacter] = useState(null)

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="home-hero">
          <div className="home-hero__content">
            <img className="home-hero__brand" src={brandLogo} alt="Missão Saber" />

            <div className="home-hero__actions">
              {user ? (
                <Link className="button button--primary" to="/mundos">
                  Continuar aventura
                </Link>
              ) : (
                <>
                  <Link className="button button--primary" to="/register">
                    Começar grátis
                  </Link>
                  <Link className="button button--secondary" to="/login">
                    Já tenho conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="section-heading">
            <span className="eyebrow">Elenco principal</span>
            <h2>Amigos que ajudam em cada etapa</h2>
          </div>

          <div className="character-grid">
            {characters.map((character, index) => (
              <article
                className="character-card"
                key={character.id}
                onMouseEnter={() => setHoveredCharacter(character.id)}
                onMouseLeave={() => setHoveredCharacter(null)}
                onFocus={() => setHoveredCharacter(character.id)}
                onBlur={() => setHoveredCharacter(null)}
                style={{
                  '--accent': character.color,
                  '--accent-soft': character.softColor,
                  '--delay': `${index * 110}ms`,
                }}
                tabIndex={0}
              >
                <div className="character-card__mascot">
                  <CharacterSprite
                    id={character.id}
                    size={112}
                    active={hoveredCharacter === character.id}
                    title={character.name}
                  />
                </div>
                <div className="character-card__copy">
                  <h3>{character.name}</h3>
                  <p className="character-card__title">{character.title}</p>
                  <p>{character.specialty}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="eyebrow">Mapa de aprendizagem</span>
            <h2>Seis mundos, cinco fases por mundo</h2>
          </div>

          <div className="world-grid">
            {worlds.map((world) => {
              const character = getCharacter(world.characterId)

              return (
                <article
                  className="world-card"
                  key={world.id}
                  style={{
                    '--accent': world.color,
                    '--accent-soft': world.softColor,
                  }}
                >
                  <div className="world-card__top">
                    <span>{world.subject}</span>
                    <strong>{world.phases} fases</strong>
                  </div>
                  <div className="world-card__char">
                    <CharacterSprite id={world.characterId} size={56} />
                  </div>
                  <h3>{world.name}</h3>
                  <p>
                    Com {character?.name}, foco em {world.subject.toLowerCase()} e desafios progressivos.
                  </p>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        Missão Saber - Jogo Educativo BNCC
      </footer>
    </div>
  )
}
