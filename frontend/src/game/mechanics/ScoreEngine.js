const POINTS_CORRECT = 10
const POINTS_BONUS_FAST = 5  // bônus por resposta rápida (< 5s)

export default class ScoreEngine {
  constructor() {
    this.score = 0
    this.correct = 0
    this._streak = 0
  }

  addCorrect(fast = false) {
    this.correct++
    this._streak++
    const bonus = fast ? POINTS_BONUS_FAST : 0
    const streakBonus = this._streak >= 3 ? 5 : 0
    this.score += POINTS_CORRECT + bonus + streakBonus
    return this.score
  }

  addWrong() {
    this._streak = 0
  }

  get streak() { return this._streak }
}
