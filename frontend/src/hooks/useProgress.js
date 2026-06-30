import { useEffect } from 'react'
import { getProgress, getAchievements } from '../api/progress'
import useProgressStore from '../store/progressStore'

export function useProgress() {
  const { setPhaseStars, setAchievements } = useProgressStore()

  useEffect(() => {
    getProgress().then(({ data }) => {
      data.forEach(({ phase_id, stars }) => setPhaseStars(phase_id, stars))
    }).catch(() => {})

    getAchievements().then(({ data }) => {
      setAchievements(data)
    }).catch(() => {})
  }, [])
}
