import Phaser from 'phaser'
import { calcStars } from '../../utils/starCalc'

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' })
  }

  init(data) {
    this.answers = data.answers ?? []
    this.score = data.score ?? 0
    this.correct = data.correct ?? 0
    this.total = data.total ?? 0
    this.stars = calcStars(this.correct, this.total)
  }

  create() {
    const { width, height } = this.scale
    this.cameras.main.fadeIn(500, 240, 240, 255)

    // Fundo
    this.add.rectangle(width / 2, height / 2, width, height, 0xf0f4ff)

    // Título
    const title = this.stars === 3 ? '🎉 Incrível!' : this.stars === 2 ? '😊 Muito bem!' : '😮 Continue tentando!'
    this.add.text(width / 2, 90, title, {
      fontSize: '30px', color: '#2d2d3a', fontFamily: 'Segoe UI', fontStyle: 'bold',
    }).setOrigin(0.5)

    // Estrelas
    const starSpacing = 56
    const starStartX = width / 2 - starSpacing * (this.stars > 0 ? 1 : 0)
    for (let i = 0; i < 3; i++) {
      const filled = i < this.stars
      this.add.text(starStartX + i * starSpacing, 155, filled ? '⭐' : '☆', {
        fontSize: '42px',
      }).setOrigin(0.5)
    }

    // Stats
    this.add.text(width / 2, 225, `${this.correct} de ${this.total} questões corretas`, {
      fontSize: '16px', color: '#555555', fontFamily: 'Segoe UI',
    }).setOrigin(0.5)

    this.add.text(width / 2, 254, `Pontuação: ${this.score} pts`, {
      fontSize: '18px', color: '#6c3fc5', fontFamily: 'Segoe UI', fontStyle: 'bold',
    }).setOrigin(0.5)

    // Botão Tentar de novo
    this._makeButton(width / 2 - 80, 330, 'Tentar de novo', 0xf0f4ff, 0x6c3fc5, () => {
      const onResult = this.registry.get('onResult')
      if (onResult) onResult({ retry: true, stars: this.stars, correct: this.correct, total: this.total })
    })

    // Botão Próxima fase
    this._makeButton(width / 2 + 80, 330, 'Continuar →', 0x6c3fc5, 0xffffff, () => {
      const onResult = this.registry.get('onResult')
      if (onResult) onResult({ retry: false, stars: this.stars, correct: this.correct, total: this.total })
    })

    // Confete se 3 estrelas
    if (this.stars === 3) {
      for (let i = 0; i < 30; i++) {
        const x = Phaser.Math.Between(0, width)
        const colors = [0x6c3fc5, 0xffc107, 0x4caf50, 0xf44336, 0xff9800]
        const c = this.add.rectangle(x, -20, 8, 12, Phaser.Utils.Array.GetRandom(colors))
        this.tweens.add({
          targets: c, y: height + 30, rotation: Phaser.Math.FloatBetween(-3, 3),
          x: x + Phaser.Math.Between(-60, 60),
          duration: Phaser.Math.Between(1200, 2400), delay: Phaser.Math.Between(0, 800),
          onComplete: () => c.destroy(),
        })
      }
    }
  }

  _makeButton(x, y, label, bgColor, textColor, callback) {
    const w = 140, h = 44
    const bg = this.add.graphics()
    bg.fillStyle(bgColor, 1)
    bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 10)
    if (bgColor === 0xf0f4ff) {
      bg.lineStyle(2, 0x6c3fc5, 1)
      bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 10)
    }

    const txt = this.add.text(x, y, label, {
      fontSize: '14px', color: textColor === 0xffffff ? '#ffffff' : '#6c3fc5',
      fontFamily: 'Segoe UI', fontStyle: 'bold',
    }).setOrigin(0.5)

    const hit = this.add.rectangle(x, y, w, h, 0xffffff, 0).setInteractive({ useHandCursor: true })
    hit.on('pointerover', () => { bg.setAlpha(0.9); this.tweens.add({ targets: [bg, txt], scaleX: 1.04, scaleY: 1.04, duration: 80 }) })
    hit.on('pointerout', () => { bg.setAlpha(1); this.tweens.add({ targets: [bg, txt], scaleX: 1, scaleY: 1, duration: 80 }) })
    hit.on('pointerdown', callback)
  }
}
