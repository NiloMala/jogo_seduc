import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    const { width, height } = this.scale

    // Barra de loading
    const bar = this.add.rectangle(width / 2, height / 2, 0, 20, 0x6c3fc5).setOrigin(0, 0.5)
    const bg = this.add.rectangle(width / 2, height / 2, 400, 20, 0xe0e0e0).setOrigin(0.5)
    bg.setDepth(0)
    bar.setX(width / 2 - 200).setDepth(1)

    this.load.on('progress', (v) => { bar.width = 400 * v })

    // Aqui carregar assets futuros (spritesheets, sons, etc.)
    // this.load.spritesheet('luma', '/assets/sprites/luma.png', { frameWidth: 64, frameHeight: 64 })
    // this.load.audio('correct', '/assets/sounds/correct.mp3')
  }

  create() {
    // Transição suave para a cena do jogo
    this.cameras.main.fadeOut(400, 240, 240, 255)
    this.cameras.main.once('camerafadeoutcomplete', () => {
      const questions = this.registry.get('questions') ?? []
      this.scene.start('GameScene', { questions })
    })
  }
}
