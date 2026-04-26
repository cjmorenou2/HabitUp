/**
 * App.jsx
 * Componente raíz de la aplicación HabitUp.
 * Configura el Router con rutas públicas y privadas.
 *
 * Rutas públicas  → accesibles sin login
 * Rutas privadas  → requieren haber iniciado sesión (Admin / 1234)
 */

import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Páginas
import Portada from './pages/Portada.jsx'
import Contactos from './pages/Contactos.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ListaHabitos from './pages/ListaHabitos.jsx'
import ListaTareas from './pages/ListaTareas.jsx'

// Componente de protección de rutas
import RutaPrivada from './components/RutaPrivada.jsx'

/* ─── Contexto de Autenticación ─────────────────────────────────────────── */
export const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

/* ─── Credenciales válidas (simuladas) ──────────────────────────────────── */
const USUARIO_VALIDO = 'Admin'
const PASSWORD_VALIDO = '1234'

/* ─── Componente Principal ───────────────────────────────────────────────── */
export default function App() {
  const [autenticado, setAutenticado] = useState(
    () => sessionStorage.getItem('habitup_auth') === 'true'
  )
  function login(usuario, password) {
    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDO) {
      setAutenticado(true)
      sessionStorage.setItem('habitup_auth', 'true')
      return true
    }
    return false
  }

  function logout() {
    setAutenticado(false)
    sessionStorage.removeItem('habitup_auth')
  }

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      <BrowserRouter>
        <Routes>
          {/* ── Rutas Públicas ──────────────────────────────────────────── */}
          <Route path="/" element={<Portada />} />
          <Route path="/contactos" element={<Contactos />} />

          {/* ── Rutas Privadas ──────────────────────────────────────────── */}
          <Route path="/app" element={
            <RutaPrivada><Dashboard /></RutaPrivada>
          } />
          <Route path="/app/habitos" element={
            <RutaPrivada><ListaHabitos /></RutaPrivada>
          } />
          <Route path="/app/tareas" element={
            <RutaPrivada><ListaTareas /></RutaPrivada>
          } />

          {/* Cualquier ruta desconocida redirige a la portada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
