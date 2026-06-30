import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { logout as logoutApi } from '../../api/auth'

const styles = {
  header: {
    background: 'linear-gradient(135deg, #6c3fc5 0%, #9b6dff 100%)',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 64,
    boxShadow: '0 2px 12px rgba(108,63,197,0.3)',
    gap: 16,
  },
  logo: {
    color: '#fff',
    fontWeight: 900,
    fontSize: 21,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  link: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 700,
    fontSize: 15,
    padding: '7px 10px',
    borderRadius: 8,
  },
  btn: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.4)',
    borderRadius: 10,
    padding: '7px 16px',
    fontWeight: 800,
    fontSize: 14,
    cursor: 'pointer',
  },
}

export default function Header() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logoutApi()
    } catch (_) {
      // Logout local continua funcionando mesmo sem API disponivel.
    }
    logout()
    navigate('/')
  }

  return (
    <header style={styles.header}>
      <Link to={user ? '/mundos' : '/'} style={styles.logo}>
        Missão Saber
      </Link>

      <nav style={styles.nav}>
        {user ? (
          <>
            <Link to="/mundos" style={styles.link}>Mundos</Link>
            <Link to="/perfil" style={styles.link}>Perfil</Link>
            <button onClick={handleLogout} style={styles.btn} type="button">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Entrar</Link>
            <Link to="/register" style={{ ...styles.btn, textDecoration: 'none' }}>Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  )
}
