import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      phases: {},
      achievements: [],
      setPhaseStars: (phaseId, stars) =>
        set((state) => ({ phases: { ...state.phases, [phaseId]: stars } })),
      getPhaseStars: (phaseId) => get().phases[phaseId] ?? 0,
      setAchievements: (achievements) => set({ achievements }),
    }),
    { name: 'progress-storage' }
  )
)

export default useProgressStore
