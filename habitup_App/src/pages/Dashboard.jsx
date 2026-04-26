/**
 * Dashboard.jsx
 * Página principal de la zona privada (ruta /app).
 * Solo accesible después de iniciar sesión correctamente.
 * Muestra tarjetas de acceso rápido y un resumen de progreso.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarPrivada from '../components/NavbarPrivada.jsx'

// Datos de ejemplo para el resumen del dashboard
const STATS = [
  { label: 'Hábitos activos',    valor: 3, icono: 'bi-check2-circle', color: '#e06f8b' },
  { label: 'Tareas pendientes',  valor: 2, icono: 'bi-list-task',     color: '#9b59b6' },
  { label: 'Completados hoy',    valor: 1, icono: 'bi-trophy',        color: '#f39c12' },
  { label: 'Racha en días',      valor: 5, icono: 'bi-fire',          color: '#e74c3c' },
]

export default function Dashboard() {
  const [popover, setPopover] = useState(false)

  return (
    <>
      <NavbarPrivada />

      <div className="container-fluid p-4 contenido">

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h2 className="pagina-titulo mb-0">
            <span className="primera-letra">B</span>ienvenido, Admin
          </h2>
          {/* Popover de ayuda */}
          <div className="position-relative">
            <button className="btn btn-sm btn-outline-secondary"
              onClick={() => setPopover(v => !v)}>
              <i className="bi bi-question-circle me-1"></i>Ayuda
            </button>
            {popover && (
              <div className="popover-custom shadow-lg" style={{ right: 0, left: 'auto' }}>
                <div className="popover-header-custom">
                  <i className="bi bi-info-circle me-1"></i>¿Cómo usar HabitUp?
                </div>
                <div className="popover-body-custom">
                  <p className="mb-1">📌 <strong>Hábitos:</strong> Crea rutinas diarias y márcalas.</p>
                  <p className="mb-1">✅ <strong>Tareas:</strong> Lista tus pendientes del día.</p>
                  <p className="mb-0">👥 <strong>Contactos:</strong> Conoce al equipo.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats rápidos */}
        <div className="row g-3 mb-4">
          {STATS.map((s, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="stat-card">
                <i className={`bi ${s.icono} fs-2`} style={{ color: s.color }}></i>
                <div className="stat-numero">{s.valor}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tarjetas de acceso rápido */}
        <h5 className="fw-bold mb-3 text-muted">
          <i className="bi bi-grid me-2"></i>Acceso Rápido
        </h5>
        <div className="row g-4">

          <div className="col-12 col-sm-6 col-md-4">
            <Link to="/app/habitos" className="text-decoration-none">
              <div className="card-acceso">
                <i className="bi bi-check2-circle fs-1 mb-3" style={{ color: '#e06f8b' }}></i>
                <h5 className="fw-bold">Hábitos</h5>
                <p className="text-muted small mb-0">Gestiona tus hábitos diarios</p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <Link to="/app/tareas" className="text-decoration-none">
              <div className="card-acceso">
                <i className="bi bi-list-task fs-1 mb-3" style={{ color: '#9b59b6' }}></i>
                <h5 className="fw-bold">Tareas</h5>
                <p className="text-muted small mb-0">Organiza tus tareas pendientes</p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <Link to="/contactos" className="text-decoration-none">
              <div className="card-acceso">
                <i className="bi bi-people fs-1 mb-3" style={{ color: '#2ecc71' }}></i>
                <h5 className="fw-bold">Contactos</h5>
                <p className="text-muted small mb-0">Equipo de desarrollo</p>
              </div>
            </Link>
          </div>

        </div>

        {/* Tip del día */}
        <div className="tip-card mt-4">
          <i className="bi bi-lightbulb-fill me-2" style={{ color: '#f39c12' }}></i>
          <strong>Tip del día:</strong> La consistencia supera a la intensidad.
          Pequeños hábitos diarios generan grandes cambios a largo plazo. 🌱
        </div>
      </div>
    </>
  )
}
