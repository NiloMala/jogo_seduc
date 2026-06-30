import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import useAuthStore from '../store/authStore'
import Header from '../components/layout/Header'

const YEARS = [
  { value: 1, label: '🐣 1º Ano' },
  { value: 2, label: '🐥 2º Ano' },
  { value: 3, label: '🐢 3º Ano' },
  { value: 4, label: '🦋 4º Ano' },
  { value: 5, label: '🦅 5º Ano' },
]

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', school_year: 1 })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthStore()
  const navigate = useNavigate()

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.password_confirmation) {
      setError('As senhas não coincidem.')
      return
    }
    setLoading(true)
    try {
      const { data } = await register(form)
      setToken(data.token)
      setUser(data.user)
      navigate('/mundos')
    } catch (err) {
      const msgs = err.response?.data?.errors
      setError(msgs ? Object.values(msgs).flat().join(' ') : 'Erro ao criar conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ fontSize: 48 }}>🎒</span>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#2d2d3a', marginTop: 8 }}>Criar Conta</h1>
            <p style={{ color: '#888', marginTop: 6 }}>Junte-se à aventura educativa!</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>Nome</label>
              <input type="text" value={form.name} onChange={handleChange('name')} required placeholder="Seu nome" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input type="email" value={form.email} onChange={handleChange('email')} required placeholder="seu@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Ano Escolar</label>
              <select value={form.school_year} onChange={handleChange('school_year')} style={inputStyle}>
                {YEARS.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input type="password" value={form.password} onChange={handleChange('password')} required placeholder="Mínimo 8 caracteres" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmar Senha</label>
              <input type="password" value={form.password_confirmation} onChange={handleChange('password_confirmation')} required placeholder="Repita a senha" style={inputStyle} />
            </div>
            {error && <p style={{ color: '#f44336', fontSize: 14, textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={loading} style={submitStyle}>
              {loading ? 'Criando conta...' : 'Começar Aventura 🚀'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, color: '#888', fontSize: 14 }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ color: '#6c3fc5', fontWeight: 600 }}>Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#444', marginBottom: 6 }
const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: '2px solid #e5e7eb', fontSize: 15, outline: 'none',
}
const submitStyle = {
  background: 'linear-gradient(135deg, #6c3fc5, #9b6dff)',
  color: '#fff', border: 'none', borderRadius: 12,
  padding: '14px', fontSize: 16, fontWeight: 700, marginTop: 6,
  cursor: 'pointer',
}
