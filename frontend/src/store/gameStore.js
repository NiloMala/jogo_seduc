import { create } from 'zustand'

const useGameStore = create((set) => ({
  currentPhase: null,
  currentWorld: null,
  schoolYear: null,
  score: 0,
  answers: [],
  setCurrentPhase: (phase) => set({ currentPhase: phase }),
  setCurrentWorld: (world) => set({ currentWorld: world }),
  setSchoolYear: (year) => set({ schoolYear: year }),
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  resetGame: () => set({ score: 0, answers: [] }),
  addScore: (pts) => set((state) => ({ score: state.score + pts })),
}))

export default useGameStore
