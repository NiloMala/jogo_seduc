/**
 * SpriteAnimator — sequenciador de frames com timing individual por frame.
 *
 * Diferente de setInterval (todos os frames na mesma velocidade),
 * aqui cada frame pode ter uma duração diferente, criando animações
 * naturais: descansar 600ms, transição rápida 140ms, pausar 800ms...
 *
 * @example
 *   const anim = new SpriteAnimator((frame) => setFrame(frame))
 *   anim.play(sequence, { loop: true })
 *   anim.play(sequence, { loop: false, onDone: () => anim.play(idle) })
 *   anim.stop()
 */
export default class SpriteAnimator {
  constructor(onFrame) {
    this._onFrame = onFrame
    this._timer = null
    this._stopped = false
  }

  /**
   * Toca uma sequência de frames.
   * @param {Array<{i: number, ms: number}>} sequence
   * @param {{ loop?: boolean, onDone?: () => void }} options
   */
  play(sequence, { loop = true, onDone } = {}) {
    this.stop()
    this._stopped = false
    this._run(sequence, 0, loop, onDone)
  }

  stop() {
    this._stopped = true
    clearTimeout(this._timer)
    this._timer = null
  }

  _run(sequence, index, loop, onDone) {
    if (this._stopped || !sequence?.length) return

    const { i, ms } = sequence[index]
    this._onFrame(i)

    const next = index + 1
    if (next >= sequence.length) {
      if (loop) {
        this._timer = setTimeout(() => this._run(sequence, 0, loop, onDone), ms)
      } else {
        this._timer = setTimeout(() => { onDone?.() }, ms)
      }
    } else {
      this._timer = setTimeout(() => this._run(sequence, next, loop, onDone), ms)
    }
  }
}
