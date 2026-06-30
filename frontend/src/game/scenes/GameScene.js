import Phaser from 'phaser'
import QuestionEngine from '../mechanics/QuestionEngine'
import ScoreEngine from '../mechanics/ScoreEngine'

const COLORS = {
  primary: 0x6c3fc5,
  primaryLight: 0x9b6dff,
  success: 0x4caf50,
  danger: 0xf44336,
  card: 0xffffff,
  text: 0x2d2d3a,
  muted: 0x888888,
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.questionEngine = null
    this.scoreEngine = null
    this.optionButtons = []
  }

  init(data) {
    this.questions = data.questions ?? []
    this.questionEngine = new QuestionEngine(this.questions)
    this.scoreEngine = new ScoreEngine()
  }

  create() {
    const { width, height } = this.scale
    this.cameras.main.fadeIn(400, 240, 240, 255)

    // Fundo
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff)

    // Barra de progresso
    this._progressBg = this.add.rectangle(width / 2, 24, width - 80, 16, 0xe0e0e0).setOrigin(0.5)
    this._progressBar = this.add.rectangle(40, 24, 0, 16, COLORS.primary).setOrigin(0, 0.5)
    this._questionLabel = this.add.text(width / 2, 50, '', { fontSize: '13px', color: '#888888', fontFamily: 'Segoe UI' }).setOrigin(0.5)
    this._scoreLabel = this.add.text(width - 20, 20, '⭐ 0', { fontSize: '14px', color: '#6c3fc5', fontFamily: 'Segoe UI', fontStyle: 'bold' }).setOrigin(1, 0.5)

    this._renderQuestion()
  }

  _renderQuestion() {
    const { width, height } = this.scale
    const q = this.questionEngine.current()

    if (!q) {
      this._finish()
      return
    }

    // Limpa botões anteriores
    this.optionButtons.forEach((b) => b.destroy())
    this.optionButtons = []
    if (this._questionText) this._questionText.destroy()
    if (this._cardBg) this._cardBg.destroy()
    if (this._charEmoji) this._charEmoji.destroy()

    const total = this.questionEngine.total()
    const idx = this.questionEngine.currentIndex()
    const pct = (idx / total)

    this._progressBar.width = (width - 80) * pct
    this._questionLabel.setText(`Questão ${idx + 1} de ${total}`)
    this._scoreLabel.setText(`⭐ ${this.scoreEngine.score}`)

    // Card da pergunta
    this._cardBg = this.add.rectangle(width / 2, 130, width - 80, 100, COLORS.card, 1)
      .setStrokeStyle(2, COLORS.primary + 0x111111)
    const cardRounded = this.add.graphics()
    cardRounded.fillStyle(0xffffff, 1)
    cardRounded.fillRoundedRect(40, 80, width - 80, 100, 16)
    this._cardBg.destroy()
    this._cardBg = cardRounded

    // Personagem emoji
    this._charEmoji = this.add.text(56, 100, this.registry.get('characterEmoji') ?? '🌟', { fontSize: '36px' })

    // Texto da pergunta
    this._questionText = this.add.text(width / 2, 130, q.question, {
      fontSize: '17px', color: '#2d2d3a', fontFamily: 'Segoe UI',
      wordWrap: { width: width - 140 }, align: 'center', fontStyle: 'bold',
    }).setOrigin(0.5)

    // Botões de opção
    const cols = q.options.length <= 2 ? 2 : 2
    const btnW = (width - 80 - (cols - 1) * 12) / cols
    const btnH = 52
    const startY = 220

    q.options.forEach((opt, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = 40 + col * (btnW + 12) + btnW / 2
      const y = startY + row * (btnH + 10)

      const btnBg = this.add.graphics()
      btnBg.fillStyle(0xf8f8f8, 1)
      btnBg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
      btnBg.lineStyle(2, 0xe5e7eb, 1)
      btnBg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)

      const btnText = this.add.text(x, y, opt, {
        fontSize: '15px', color: '#2d2d3a', fontFamily: 'Segoe UI', wordWrap: { width: btnW - 20 }, align: 'center',
      }).setOrigin(0.5)

      const hitArea = this.add.rectangle(x, y, btnW, btnH, 0xffffff, 0)
        .setInteractive({ useHandCursor: true })

      hitArea.on('pointerover', () => {
        btnBg.clear()
        btnBg.fillStyle(0xede7f6, 1)
        btnBg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
        btnBg.lineStyle(2, COLORS.primary, 1)
        btnBg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
      })

      hitArea.on('pointerout', () => {
        btnBg.clear()
        btnBg.fillStyle(0xf8f8f8, 1)
        btnBg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
        btnBg.lineStyle(2, 0xe5e7eb, 1)
        btnBg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
      })

      hitArea.on('pointerdown', () => this._answer(opt, q, btnBg, btnText, x, y, btnW, btnH))

      this.optionButtons.push(btnBg, btnText, hitArea)
    })
  }

  _answer(chosen, q, btnBg, btnText, x, y, btnW, btnH) {
    const correct = chosen === q.correct
    this.optionButtons.forEach((b) => { if (b.input) b.disableInteractive() })

    const color = correct ? 0xe8f5e9 : 0xffebee
    const stroke = correct ? COLORS.success : COLORS.danger
    const textColor = correct ? '#2e7d32' : '#c62828'

    btnBg.clear()
    btnBg.fillStyle(color, 1)
    btnBg.fillRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
    btnBg.lineStyle(2.5, stroke, 1)
    btnBg.strokeRoundedRect(x - btnW / 2, y - btnH / 2, btnW, btnH, 12)
    btnText.setColor(textColor)

    const feedback = this.add.text(this.scale.width / 2, 440, correct ? '✓ Correto!' : '✗ Errado!', {
      fontSize: '20px', color: correct ? '#2e7d32' : '#c62828', fontFamily: 'Segoe UI', fontStyle: 'bold',
    }).setOrigin(0.5)

    if (correct) this.scoreEngine.addCorrect()
    this.questionEngine.recordAnswer(chosen, correct)

    this.time.delayedCall(1000, () => {
      feedback.destroy()
      const hasNext = this.questionEngine.next()
      if (hasNext) {
        this._renderQuestion()
      } else {
        this._finish()
      }
    })
  }

  _finish() {
    const result = {
      answers: this.questionEngine.answers,
      score: this.scoreEngine.score,
      correct: this.scoreEngine.correct,
      total: this.questionEngine.total(),
    }
    this.cameras.main.fadeOut(500, 240, 240, 255)
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('ResultScene', result)
    })
  }
}
