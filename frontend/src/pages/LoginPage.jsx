import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import useAuthStore from '../store/authStore'
import Header from '../components/layout/Header'

const DEV_USER = {
  id: 1,
  name: 'Aluno Teste',
  email: 'aluno@teste.com',
  school_year: 3,
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await login(email, password)
      setToken(data.token)
      setUser(data.user)
      navigate('/mundos')
    } catch (err) {
      setError(err.response?.data?.message || 'E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  function handleDevLogin() {
    setToken('dev-token-local')
    setUser(DEV_USER)
    navigate('/mundos')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-lg)' }}>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ fontSize: 48 }}>🌟</span>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#2d2d3a', marginTop: 8 }}>Bem-vindo de volta!</h1>
            <p style={{ color: '#888', marginTop: 6 }}>Entre para continuar sua aventura</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required placeholder="seu@email.com" style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                required placeholder="••••••••" style={inputStyle}
              />
            </div>
            {error && <p style={{ color: '#f44336', fontSize: 14, textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} style={submitStyle}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Botão de acesso rápido para desenvolvimento */}
          <div style={{ marginTop: 24, padding: '16px', background: '#fffbe6', borderRadius: 12, border: '1.5px dashed #ffc107' }}>
            <p style={{ fontSize: 12, color: '#b45309', fontWeight: 700, marginBottom: 10, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Acesso de desenvolvimento
            </p>
            <button onClick={handleDevLogin} style={{
              width: '100%', padding: '11px', borderRadius: 10,
              background: '#ffc107', color: '#2d2d3a', border: 'none',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>
              Entrar sem backend →
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, color: '#888', fontSize: 14 }}>
            Não tem conta?{' '}
            <Link to="/register" style={{ color: '#6c3fc5', fontWeight: 600 }}>Cadastre-se grátis</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#444', marginBottom: 6 }
const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: '2px solid #e5e7eb', fontSize: 15, outline: 'none',
}
const submitStyle = {
  background: 'linear-gradient(135deg, #6c3fc5, #9b6dff)',
  color: '#fff', border: 'none', borderRadius: 12,
  padding: '14px', fontSize: 16, fontWeight: 700, marginTop: 8,
  cursor: 'pointer',
}
