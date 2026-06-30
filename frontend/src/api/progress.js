import api from './auth'

export const getProgress = () => api.get('/api/progress')

export const getAchievements = () => api.get('/api/achievements')
