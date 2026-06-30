import api from './auth'

export const getPhases = (schoolYear, world) =>
  api.get('/api/phases', { params: { school_year: schoolYear, world } })

export const getPhaseQuestions = (phaseId) =>
  api.get(`/api/phases/${phaseId}/questions`)

export const submitPhase = (phaseId, answers) =>
  api.post(`/api/phases/${phaseId}/submit`, { answers })
