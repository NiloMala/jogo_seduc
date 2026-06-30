export default class QuestionEngine {
  constructor(questions = []) {
    this._questions = questions
    this._index = 0
    this.answers = []
  }

  get total() { return this._questions.length }
  currentIndex() { return this._index }
  total() { return this._questions.length }

  current() {
    return this._questions[this._index] ?? null
  }

  /** Avança para a próxima. Retorna true se houver mais. */
  next() {
    this._index++
    return this._index < this._questions.length
  }

  recordAnswer(chosen, correct) {
    const q = this._questions[this._index]
    this.answers.push({
      questionId: q?.id,
      answer: chosen,
      correct,
    })
  }
}
