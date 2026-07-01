import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getPhaseQuestions, submitPhase } from '../api/questions'
import useGameStore from '../store/gameStore'
import useProgressStore from '../store/progressStore'
import { calcStars } from '../utils/starCalc'
import Modal from '../components/ui/Modal'
import StarRating from '../components/ui/StarRating'
import GameCharacter from '../components/characters/GameCharacter'
import { worlds, getCharacter } from '../data/worlds'

const BASE = '/assets/personagens_sprites'

const CHAR_INTRO_IMG = {
  luma:   `${BASE}/luma/sprites/falando.png`,
  byte:   `${BASE}/byte/sprites/falando.png`,
  faisca: `${BASE}/faisca/sprites/rindo.png`,
  teo:    `${BASE}/teo/sprites/falando.png`,
  nino:   `${BASE}/nino/sprites/ideia.png`,
  bia:    `${BASE}/bia/sprites/acenando.png`,
}

const CHAR_FALAS = {
  luma:   ['Vamos lá! Eu acredito em você! 📖', 'Hora de aprender e se divertir!', 'Cada erro é uma lição, bora!'],
  byte:   ['Processando... missão iniciada! 🤖', 'Meus cálculos indicam: você vai mandar bem!', 'Bip boop! Vamos nessa!'],
  faisca: ['Aventura à vista! Você está pronto? 🦊', 'Missão aceita! Vamos conquistar isso!', 'Corra, o desafio te espera!'],
  teo:    ['Devagar e sempre... você consegue! 🐢', 'Respira fundo. Vamos com calma e foco!', 'Errar faz parte, continue tentando!'],
  nino:   ['Inventei uma máquina de acertar tudo! 🐵', 'Com criatividade tudo é possível, vai lá!', 'Minha engenhoca diz: você vai arrasar!'],
  bia:    ['Já explorei esse mundo todo! Te guio! 🦫', 'Vamos descobrir coisas incríveis juntos!', 'A natureza nos ensina, e você aprende!'],
}

// Frases durante o jogo — acerto
const CHAR_CORRECT = {
  luma:   ['Uau, que inteligente! 🌟', 'Excelente! Você aprendeu bem!', 'Perfeito! Continua assim!', 'Muito bem! Orgulho de você!', 'Incrível! Você é uma estrela!'],
  byte:   ['CORRETO! +10 pontos! ✅', 'Cálculo confirmado! Arrasou!', 'Processando... ACERTOU! 🤖', 'Sistema aprovado! Que resposta!', 'Dados confirmados! Parabéns!'],
  faisca: ['Isso aí! Missão cumprida! 🦊', 'Aventureiro nato! Acertou!', 'Rápido como a Faísca! 🔥', 'Que habilidade! Continue!', 'Perfeito! Próxima aventura!'],
  teo:    ['Devagar e certeiro! 🐢', 'Sabedoria em ação! Parabéns!', 'A calma trouxe a resposta!', 'Com foco chegamos lá!', 'Que concentração! Ótimo!'],
  nino:   ['Minha invenção funcionou! 🐵', 'Genial! Você é um inventor!', 'Engenhoca aprovada! Acertou!', 'Criatividade em alto nível!', 'Boom! Resposta certa!'],
  bia:    ['Descoberta feita! 🦫', 'Você explorou e acertou!', 'A natureza aprova! Ótimo!', 'Explorador nota 10!', 'Que descoberta incrível!'],
}

// Frases durante o jogo — erro
const CHAR_WRONG = {
  luma:   ['Quase lá! Tente de novo! 📖', 'Errar é aprender, vai!', 'Não desanime, você consegue!', 'Pensa um pouco mais...', 'Todo erro nos ensina algo!'],
  byte:   ['Erro detectado... recalculando! 🤖', 'Não foi dessa vez, tente!', 'Processando nova tentativa...', 'Sistema reiniciando... vai lá!', 'Equação diferente, tente!'],
  faisca: ['Opa! Esquiva e tenta de novo! 🦊', 'Todo aventureiro erra às vezes!', 'Missão não perdida! Vai lá!', 'Guerreiro não desiste!', 'Bora tentar outra vez!'],
  teo:    ['Respira... você vai conseguir! 🐢', 'Com calma tudo se resolve!', 'Paciência, a resposta vem!', 'Pense devagar, com foco!', 'Errar faz parte do caminho!'],
  nino:   ['Ajustando a engenhoca! 🐵', 'Toda invenção tem tentativas!', 'Erro de cálculo! Tenta mais!', 'Inventores não desistem!', 'Reformulando a ideia...'],
  bia:    ['Continue explorando! 🦫', 'A floresta tem mais segredos!', 'Nem todo caminho é fácil!', 'Exploradores persistem!', 'Tente outro caminho!'],
}

const CHAR_RESULTADO = {
  3: { luma: 'Você é incrível! Eu sabia! 🎉', byte: 'PERFEITO! 100% de precisão! 🤖', faisca: 'Missão cumprida com louvor! 🦊', teo: 'Parabéns! A calma é a chave! 🐢', nino: 'Minha invenção funcionou! 🐵', bia: 'Você explorou tudo! Fantástico! 🦫' },
  2: { luma: 'Muito bem! Continue assim! 📖', byte: 'Bom resultado! Pode melhorar! 🤖', faisca: 'Quase perfeito! Vai de novo! 🦊', teo: 'Ótimo! Mais um pouco e chega lá! 🐢', nino: 'Legal! Vamos aperfeiçoar! 🐵', bia: 'Boa descoberta! Continua! 🦫' },
  1: { luma: 'Não desista! Tente de novo! 📖', byte: 'Recalculando rota... tente mais! 🤖', faisca: 'A aventura continua, vai lá! 🦊', teo: 'Calma, você vai conseguir! 🐢', nino: 'Volta à oficina e tenta de novo! 🐵', bia: 'A floresta guarda segredos, explore mais! 🦫' },
}

const FALLBACK_QUESTIONS = {
  portugues:  [
    { id: 1, question: 'Qual letra começa a palavra BOLA?', options: ['A', 'B', 'C', 'D'], correct: 'B' },
    { id: 2, question: 'Qual palavra rima com PATO?', options: ['GATO', 'BOLA', 'MESA', 'CASA'], correct: 'GATO' },
    { id: 3, question: 'Quantas sílabas tem ESCOLA?', options: ['2', '3', '4', '5'], correct: '3' },
    { id: 4, question: 'Qual é a vogal da palavra UVAS?', options: ['U', 'V', 'A', 'S'], correct: 'U' },
    { id: 5, question: 'GATO tem quantas letras?', options: ['3', '4', '5', '6'], correct: '4' },
  ],
  matematica: [
    { id: 1, question: '2 + 3 = ?', options: ['4', '5', '6', '7'], correct: '5' },
    { id: 2, question: 'Quantos lados tem um triângulo?', options: ['2', '3', '4', '5'], correct: '3' },
    { id: 3, question: '10 - 4 = ?', options: ['5', '6', '7', '8'], correct: '6' },
    { id: 4, question: '3 × 3 = ?', options: ['6', '7', '8', '9'], correct: '9' },
    { id: 5, question: 'Qual é o dobro de 5?', options: ['8', '9', '10', '11'], correct: '10' },
  ],
  ciencias:   [
    { id: 1, question: 'O sol é uma estrela?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 2, question: 'Com o que enxergamos?', options: ['Nariz', 'Olhos', 'Ouvidos', 'Mãos'], correct: 'Olhos' },
    { id: 3, question: 'Plantas precisam de água para viver?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 4, question: 'Qual animal põe ovos?', options: ['Cachorro', 'Gato', 'Galinha', 'Vaca'], correct: 'Galinha' },
    { id: 5, question: 'O ar é invisível?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
  ],
  geografia:  [
    { id: 1, question: 'Qual é o maior rio do Brasil?', options: ['São Francisco', 'Amazonas', 'Paraná', 'Tocantins'], correct: 'Amazonas' },
    { id: 2, question: 'O Brasil fica na América do Sul?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 3, question: 'Qual é a capital do Brasil?', options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'], correct: 'Brasília' },
    { id: 4, question: 'O Brasil tem quantas regiões?', options: ['3', '4', '5', '6'], correct: '5' },
    { id: 5, question: 'Qual oceano banha o Brasil?', options: ['Pacífico', 'Índico', 'Atlântico', 'Ártico'], correct: 'Atlântico' },
  ],
  historia:   [
    { id: 1, question: 'Em que ano o Brasil foi descoberto?', options: ['1400', '1500', '1600', '1700'], correct: '1500' },
    { id: 2, question: 'Quem foi o primeiro presidente do Brasil?', options: ['Dom Pedro II', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Tiradentes'], correct: 'Deodoro da Fonseca' },
    { id: 3, question: 'O Brasil foi colônia de Portugal?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 4, question: 'Tiradentes lutou pela independência do Brasil?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 5, question: 'Em que ano o Brasil se tornou independente?', options: ['1800', '1822', '1888', '1900'], correct: '1822' },
  ],
  artes:      [
    { id: 1, question: 'Quais são as cores primárias?', options: ['Verde, laranja, roxo', 'Azul, vermelho, amarelo', 'Preto, branco, cinza', 'Rosa, bege, creme'], correct: 'Azul, vermelho, amarelo' },
    { id: 2, question: 'Quantas notas musicais existem?', options: ['5', '6', '7', '8'], correct: '7' },
    { id: 3, question: 'Pintura é uma forma de arte?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
    { id: 4, question: 'Azul + amarelo = ?', options: ['Roxo', 'Verde', 'Laranja', 'Rosa'], correct: 'Verde' },
    { id: 5, question: 'Escultura é criada em 3 dimensões?', options: ['Verdadeiro', 'Falso'], correct: 'Verdadeiro' },
  ],
}

function getWorldCharacter(phaseId, worldIdHint) {
  const worldId = worldIdHint ?? phaseId?.split('-').slice(0, -1).join('-') ?? phaseId
  const world = worlds.find((w) => w.id === worldId) ?? worlds[0]
  return { world, character: getCharacter(world.characterId) }
}

function SpeechBubble({ text, color }) {
  return (
    <div style={{ position: 'relative', marginBottom: 8 }}>
      <div style={{
        background: '#fff', border: `2.5px solid ${color}`,
        borderRadius: 18, padding: '14px 20px',
        fontSize: 17, fontWeight: 700, color: '#2d2d3a',
        maxWidth: 300, lineHeight: 1.45,
        boxShadow: `0 4px 20px ${color}33`,
        animation: 'bubble-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
      }}>
        {text}
      </div>
      <div style={{ position: 'absolute', bottom: -14, left: 32, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `14px solid ${color}` }} />
      <div style={{ position: 'absolute', bottom: -10, left: 34, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '12px solid #fff' }} />
      <style>{`@keyframes bubble-in { from { opacity:0; transform:scale(0.7) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>
    </div>
  )
}

export default function GamePage() {
  const { phaseId } = useParams()
  const navigate    = useNavigate()
  const location    = useLocation()
  const { addAnswer, resetGame, addScore, score } = useGameStore()
  const setPhaseStars = useProgressStore((s) => s.setPhaseStars)

  const [questions, setQuestions]   = useState([])
  const [current, setCurrent]       = useState(0)
  const [selected, setSelected]     = useState(null)
  const [loading, setLoading]       = useState(true)
  const [result, setResult]         = useState(null)
  const [showResult, setShowResult]   = useState(false)
  const [submitting, setSubmitting]   = useState(false)
  const [showIntro, setShowIntro]     = useState(true)
  const [reaction, setReaction]       = useState('idle')
  const [bubble, setBubble]           = useState(null) // { text, type: 'correct'|'wrong' }
  // Na última pergunta, o primeiro clique em "Próxima" só confirma a resposta;
  // o botão "Ver Resultado" só aparece depois disso, num segundo clique.
  const [reachedEnd, setReachedEnd]   = useState(false)

  // Usa ref para ter sempre o valor mais recente das respostas
  const correctCountRef = useRef(0)
  // Trava por ref (síncrona) contra cliques duplos rápidos — o guard via
  // estado `selected` sozinho pode deixar passar dois cliques antes do
  // React re-renderizar, fazendo a resposta seguinte não ser contabilizada.
  const answeredRef = useRef(false)

  const { world, character } = getWorldCharacter(phaseId, location.state?.worldId)
  const falas    = CHAR_FALAS[world.characterId] ?? CHAR_FALAS.luma
  const [fala]   = useState(() => falas[Math.floor(Math.random() * falas.length)])
  const introSrc = CHAR_INTRO_IMG[world.characterId] ?? CHAR_INTRO_IMG.luma

  useEffect(() => {
    resetGame()
    correctCountRef.current = 0
    answeredRef.current = false
    setReachedEnd(false)
    getPhaseQuestions(phaseId)
      .then(({ data }) => setQuestions(data))
      .catch(() => {
        const worldId = phaseId?.split('-').slice(0, -1).join('-') ?? 'portugues'
        setQuestions(FALLBACK_QUESTIONS[worldId] ?? FALLBACK_QUESTIONS.portugues)
      })
      .finally(() => setLoading(false))
  }, [phaseId])

  function handleAnswer(option) {
    if (answeredRef.current) return
    answeredRef.current = true
    setSelected(option)
    const q       = questions[current]
    const correct = option === q.correct
    addAnswer({ questionId: q.id, answer: option, correct })

    const charId  = world.characterId
    if (correct) {
      addScore(10)
      correctCountRef.current += 1
      setReaction('correct')
      const phrases = CHAR_CORRECT[charId] ?? CHAR_CORRECT.luma
      setBubble({ text: phrases[Math.floor(Math.random() * phrases.length)], type: 'correct' })
    } else {
      setReaction('wrong')
      const phrases = CHAR_WRONG[charId] ?? CHAR_WRONG.luma
      setBubble({ text: phrases[Math.floor(Math.random() * phrases.length)], type: 'wrong' })
    }
    setTimeout(() => { setReaction('idle'); setBubble(null) }, 1800)
  }

  function handleNext() {
    const isLastQuestion = current + 1 >= questions.length

    if (isLastQuestion && !reachedEnd) {
      // Primeiro clique na última pergunta: só confirma a resposta e troca
      // o rótulo do botão para "Ver Resultado". Não finaliza ainda.
      setReachedEnd(true)
      return
    }

    answeredRef.current = false
    setSelected(null)
    setReaction('idle')
    setBubble(null)

    if (isLastQuestion) finishPhase()
    else setCurrent((c) => c + 1)
  }

  async function finishPhase() {
    const correct = correctCountRef.current
    const total   = questions.length
    const stars   = calcStars(correct, total)
    setPhaseStars(phaseId, stars)
    setSubmitting(true)
    try { await submitPhase(phaseId, useGameStore.getState().answers) } catch (_) {}
    setResult({ stars, correct, total })
    setShowResult(true)
    setSubmitting(false)
  }

  function handleRetry() {
    setShowResult(false)
    resetGame()
    correctCountRef.current = 0
    answeredRef.current = false
    setReachedEnd(false)
    setCurrent(0)
    setSelected(null)
    setShowIntro(true)
  }

  // ── INTRO ────────────────────────────────────────────────────────
  if (showIntro) {
    return (
      <div style={{ minHeight: '100vh', background: `linear-gradient(160deg, ${world.softColor} 0%, #f0f4ff 60%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <SpeechBubble text={fala} color={world.color} />
        <div style={{ marginTop: 20 }}>
          <img src={introSrc} alt={character?.name} style={{ width: 180, height: 180, objectFit: 'contain', objectPosition: 'bottom center', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }} />
        </div>
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: world.color }}>{character?.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 28 }}>{character?.title}</div>
          <button onClick={() => setShowIntro(false)} style={{ background: world.color, color: '#fff', border: 'none', borderRadius: 14, padding: '14px 40px', fontSize: 17, fontWeight: 800, cursor: 'pointer', boxShadow: `0 6px 20px ${world.color}55` }}>
            Vamos jogar! →
          </button>
        </div>
      </div>
    )
  }

  // ── LOADING ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>⏳</div>
        <p style={{ color: '#888' }}>Carregando fase...</p>
      </div>
    )
  }

  const q        = questions[current]
  const isLastQuestion = current + 1 >= questions.length
  // current = quantas perguntas já foram respondidas (0-index da pergunta atual,
  // ainda não respondida). Usar (current + 1) fazia a barra chegar a 100% já na
  // última pergunta, antes mesmo de respondê-la. Na última pergunta, só conta
  // como respondida (100%) depois que o aluno confirma com "Próxima" (reachedEnd).
  const progress = questions.length > 0
    ? ((current + (isLastQuestion && reachedEnd ? 1 : 0)) / questions.length) * 100
    : 0
  const charId   = world.characterId

  // Fala do resultado
  const resultStars  = result?.stars ?? 1
  const resultFala   = CHAR_RESULTADO[resultStars]?.[charId] ?? CHAR_RESULTADO[1][charId]

  // ── JOGO ─────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px' }}>

      <div style={{ width: '100%', maxWidth: 680, marginBottom: 16 }}>

        {/* Linha: personagem + balão + score */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 10 }}>
          <GameCharacter id={world.characterId} size={80} reaction={reaction} />

          {/* Balão de feedback */}
          <div style={{ flex: 1, minHeight: 48, display: 'flex', alignItems: 'center' }}>
            {bubble && (
              <div style={{
                background: bubble.type === 'correct' ? '#e8f5e9' : '#fff3e0',
                border: `2px solid ${bubble.type === 'correct' ? '#4caf50' : '#ff9800'}`,
                borderRadius: 14,
                padding: '10px 16px',
                fontSize: 14,
                fontWeight: 700,
                color: bubble.type === 'correct' ? '#2e7d32' : '#e65100',
                lineHeight: 1.4,
                maxWidth: 320,
                animation: 'bubble-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
                position: 'relative',
              }}>
                {bubble.text}
                {/* Ponteiro para o personagem */}
                <div style={{ position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderRight: `10px solid ${bubble.type === 'correct' ? '#4caf50' : '#ff9800'}` }} />
              </div>
            )}
          </div>

          <span style={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap', paddingBottom: 4 }}>⭐ {score} pts</span>
        </div>

        {/* Barra de progresso */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aaa', marginBottom: 6 }}>
          <span>Questão {current + 1} de {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ background: '#e0e0e0', borderRadius: 20, height: 10 }}>
          <div style={{ background: `linear-gradient(90deg, ${world.color}, ${world.color}99)`, height: '100%', width: `${progress}%`, borderRadius: 20, transition: 'width 0.4s' }} />
        </div>

        <style>{`@keyframes bubble-in { from { opacity:0; transform:scale(0.8) translateX(-8px) } to { opacity:1; transform:scale(1) translateX(0) } }`}</style>
      </div>

      {q && (
        <div style={{ background: '#fff', borderRadius: 24, padding: '40px 32px', maxWidth: 680, width: '100%', boxShadow: 'var(--shadow-lg)' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#2d2d3a', marginBottom: 32, lineHeight: 1.4, textAlign: 'center' }}>
            {q.question}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.options?.map((opt) => {
              let bg = '#f8f8f8', border = '2px solid #e5e7eb', color = '#2d2d3a'
              if (selected !== null) {
                if (opt === q.correct)     { bg = '#e8f5e9'; border = '2px solid #4caf50'; color = '#2e7d32' }
                else if (opt === selected) { bg = '#ffebee'; border = '2px solid #f44336'; color = '#c62828' }
              }
              return (
                <button key={opt} onClick={() => handleAnswer(opt)} style={{ background: bg, border, color, borderRadius: 12, padding: '16px 20px', fontSize: 16, fontWeight: 500, cursor: selected !== null ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center' }}>
                  {opt}
                </button>
              )
            })}
          </div>
          {selected !== null && reaction === 'idle' && (
            <button onClick={handleNext} disabled={submitting} style={{ marginTop: 28, width: '100%', padding: '15px', background: world.color, color: '#fff', border: 'none', borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>
              {current + 1 >= questions.length && reachedEnd ? (submitting ? 'Salvando...' : 'Ver Resultado 🎉') : 'Próxima →'}
            </button>
          )}
        </div>
      )}

      {/* Modal de resultado com personagem falando */}
      <Modal open={showResult} onClose={() => {}}>
        <div style={{ textAlign: 'center', padding: '8px 16px' }}>

          {/* Personagem + balão */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                background: '#fff', border: `2px solid ${world.color}`,
                borderRadius: 14, padding: '10px 14px',
                fontSize: 14, fontWeight: 700, color: '#2d2d3a',
                maxWidth: 200, lineHeight: 1.4,
                animation: 'bubble-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              }}>
                {resultFala}
              </div>
              <div style={{ position: 'absolute', bottom: -10, right: 20, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `10px solid ${world.color}` }} />
              <div style={{ position: 'absolute', bottom: -7, right: 22, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #fff' }} />
              <style>{`@keyframes bubble-in { from { opacity:0; transform:scale(0.7) } to { opacity:1; transform:scale(1) } }`}</style>
            </div>
            <img src={introSrc} alt={character?.name} style={{ width: 90, height: 90, objectFit: 'contain', objectPosition: 'bottom center', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))' }} />
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            {resultStars === 3 ? 'Incrível! 🎉' : resultStars === 2 ? 'Muito bem! 😊' : 'Continue tentando! 💪'}
          </h2>
          <p style={{ color: '#888', marginBottom: 16 }}>
            Você acertou <strong>{result?.correct}</strong> de <strong>{result?.total}</strong> questões
          </p>
          <StarRating stars={result?.stars ?? 0} max={3} size={36} color="#ffc107" />

          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
            <button onClick={() => navigate(-1)} style={{ padding: '12px 24px', borderRadius: 10, border: `2px solid ${world.color}`, color: world.color, background: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              Voltar
            </button>
            <button onClick={handleRetry} style={{ padding: '12px 24px', borderRadius: 10, background: world.color, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              Tentar de novo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
