/**
 * RutaPrivada.jsx
 * Componente de protección de rutas.
 *
 * Si el usuario NO está autenticado → redirige a la portada ("/")
 * Si el usuario SÍ está autenticado → renderiza los hijos normalmente
 *
 * Uso en App.jsx:
 *   <RutaPrivada>
 *     <MiComponentePrivado />
 *   </RutaPrivada>
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../App.jsx'

export default function RutaPrivada({ children }) {
  const { autenticado } = useAuth()

  // Si no hay sesión activa, bloqueamos el acceso y redirigimos
  if (!autenticado) {
    return <Navigate to="/" replace />
  }

  // Sesión válida → mostramos el contenido privado
  return children
}
