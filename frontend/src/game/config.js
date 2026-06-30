import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PreloadScene from './scenes/PreloadScene'
import GameScene from './scenes/GameScene'
import ResultScene from './scenes/ResultScene'

export function createGameConfig(parent, onResult) {
  return {
    type: Phaser.AUTO,
    parent,
    width: 800,
    height: 500,
    backgroundColor: '#f0f4ff',
    scene: [BootScene, PreloadScene, GameScene, ResultScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    callbacks: {
      postBoot: (game) => {
        game.registry.set('onResult', onResult)
      },
    },
  }
}
