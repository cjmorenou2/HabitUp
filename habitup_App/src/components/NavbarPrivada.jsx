/**
 * NavbarPrivada.jsx
 * Barra de navegación fija que aparece en las rutas privadas.
 * Incluye: logo, links de navegación y botón de cerrar sesión.
 * Permanece fija en la parte superior con sticky-top / fixed-top.
 */

import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../App.jsx'

export default function NavbarPrivada() {
  const { logout } = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }

  /** Determina si un link está activo */
  const activo = (ruta) => location.pathname === ruta ? 'nav-link active nav-link-activo' : 'nav-link'

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* Logo / Marca */}
        <Link className="navbar-brand fw-bold" to="/app">
          <span className="logo-texto">🎯 HabitUp</span>
        </Link>

        {/* Hamburguesa para móvil */}
        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarMenu"
          aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegación */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">

            <li className="nav-item">
              <Link className={activo('/app')} to="/app">
                <i className="bi bi-house me-1"></i>Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className={activo('/app/habitos')} to="/app/habitos">
                <i className="bi bi-check2-circle me-1"></i>Hábitos
              </Link>
            </li>

            <li className="nav-item">
              <Link className={activo('/app/tareas')} to="/app/tareas">
                <i className="bi bi-list-task me-1"></i>Tareas
              </Link>
            </li>

            <li className="nav-item">
              <Link className={activo('/contactos')} to="/contactos">
                <i className="bi bi-people me-1"></i>Contactos
              </Link>
            </li>

          </ul>

          {/* Dropdown de usuario */}
          <div className="dropdown">
            <button className="btn d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              {/* Avatar con iniciales en lugar de imagen */}
              <div className="avatar-iniciales">A</div>
              <span className="fw-semibold small d-none d-sm-inline">Admin</span>
              <i className="bi bi-chevron-down small"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
              <li className="px-3 py-2">
                <p className="mb-0 fw-bold small">Admin</p>
                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>admin@habitup.com</p>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger fw-semibold" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  )
}
