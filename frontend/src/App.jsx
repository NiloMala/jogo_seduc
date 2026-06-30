import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WorldSelectPage from './pages/WorldSelectPage'
import PhaseSelectPage from './pages/PhaseSelectPage'
import GamePage from './pages/GamePage'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/layout/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mundos" element={<WorldSelectPage />} />
          <Route path="/mundos/:worldId/fases" element={<PhaseSelectPage />} />
          <Route path="/fases/:phaseId/jogo" element={<GamePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
