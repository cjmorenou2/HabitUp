/**
 * Contactos.jsx
 * Página pública de contacto (ruta /contactos).
 * Muestra los miembros del equipo con foto y datos básicos.
 * Al hacer click en un miembro se despliega su información (acordeón).
 */

import { useAuth } from '../App.jsx'
import fotoLaura from '../assets/miembro1.jpg';
import fotoCarlos from '../assets/miembro2.jpeg';
import fotoChristian from '../assets/miembro3.jpeg';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Datos del equipo de desarrollo
// NOTA: Las fotos se referencian como URLs de placeholder por no contar con assets físicos.
const MIEMBROS = [
  {
    id: 1,
    nombre: 'Laura Maeva Orduz Amaya',
    codigo: '2242010',
    email: 'laurysmaeva17@gmail.com',
    foto: fotoLaura,
    bio: 'Estudiante de Ingeniería de Sistemas UIS. Apasionado por React y el diseño web. Responsable del módulo de Hábitos y el sistema de rutas privadas.',
    habilidades: ['React', 'JavaScript', 'CSS', 'Bootstrap'],
    redes: {
      facebook: 'https://www.facebook.com/profile.php?id=61560646173326',
      twitter: 'https://x.com/Maeva2076',
      instagram: 'https://www.instagram.com/ma.eva8330?igsh=MXE5MG5tYjl1OWIxdw==',
      linkedin: 'https://co.linkedin.com/in/laura-orduz-03944b406',
    }
  },
  {
    id: 2,
    nombre: 'Carlos David Barrera Rangel',
    codigo: '2230056',
    email: 'carlosbr3312@gmail.com',
    foto: fotoCarlos,
    bio: 'Estudiante de Ingeniería de Sistemas UIS con énfasis en experiencia de usuario. Diseñó la identidad visual de HabitUp y el sistema de estilos.',
    habilidades: ['Figma', 'CSS', 'React Bootstrap', 'UX Design'],
    redes: {
      facebook: 'https://www.facebook.com/shnoopy.barrerarangel',
      instagram: 'https://www.instagram.com/carlos_.br/?hl=es',
    }
  },
  {
    id: 3,
    nombre: 'Christian Jhose Moreno Rios',
    codigo: '2231864',
    email: 'cjmorenou@gmail.com',
    foto: fotoChristian,
    bio: 'Estudiante de Ingeniería de Sistemas UIS. Implementó el sistema de autenticación, las rutas privadas y el módulo de Tareas.',
    habilidades: ['React', 'Node.js', 'React Router', 'Vite'],
    redes: {
      facebook: 'https://www.facebook.com/christian.jhose/',
      instagram: 'https://www.instagram.com/cj_.moreno/?hl=es',
      linkedin: 'https://linkedin.com',
    }
  },
]

export default function Contactos() {
  const [abierto, setAbierto] = useState(null)
  const { autenticado } = useAuth()

  function toggleMiembro(id) {
    setAbierto(prev => prev === id ? null : id)
  }

  return (
    <div className="portada-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>

      {/* Header con volver */}
      <div className="bg-white border-bottom px-4 py-3 d-flex align-items-center gap-3 shadow-sm sticky-top">
        <Link to={autenticado ? "/app" : "/"} className="volver-link">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
        <span className="logo-texto fs-5">🎯 HabitUp</span>
      </div>

      <div className="container py-5 flex-grow-1">
        <h2 className="pagina-titulo mb-2 text-center">
          <span className="primera-letra">E</span>quipo de Desarrollo
        </h2>
        <p className="text-center text-muted mb-5">
          Conoce a los estudiantes que hicieron posible HabitUp
        </p>

        {MIEMBROS.map(m => (
          <div key={m.id} className="mb-3">

            {/* Botón expandible */}
            <button className="miembro-btn w-100 text-start" onClick={() => toggleMiembro(m.id)}>
              <div className="d-flex align-items-center gap-3">
                <img src={m.foto} alt={m.nombre} className="miembro-foto" />
                <div className="flex-grow-1">
                  <p className="mb-0 fw-bold">{m.nombre}</p>
                  <p className="mb-0 text-muted small">{m.codigo}</p>
                </div>
                <span className={`badge ${abierto === m.id ? 'bg-rosa' : 'bg-secondary'} me-2`}
                  style={{ background: abierto === m.id ? '#e06f8b' : undefined }}>
                  {abierto === m.id ? 'Cerrar' : 'Ver info'}
                </span>
                <i className={`bi bi-chevron-${abierto === m.id ? 'up' : 'down'}`}></i>
              </div>
            </button>

            {/* Detalle expandido */}
            {abierto === m.id && (
              <div className="miembro-detalle contenido">
                <div className="row align-items-start g-4">
                  <div className="col-12 col-md-3 text-center">
                    <img src={m.foto} alt={m.nombre} className="foto-grande rounded-3 mb-3" />
                    {/* Redes sociales */}
                    <div className="d-flex justify-content-center gap-3">
                      {m.redes.facebook && (
                        <a href={m.redes.facebook} target="_blank" rel="noopener noreferrer" className="footer-social">
                          <i className="bi bi-facebook fs-5"></i>
                        </a>
                      )}
                      {m.redes.twitter && (
                        <a href={m.redes.twitter} target="_blank" rel="noopener noreferrer" className="footer-social">
                          <i className="bi bi-twitter-x fs-5"></i>
                        </a>
                      )}
                      {m.redes.instagram && (
                        <a href={m.redes.instagram} target="_blank" rel="noopener noreferrer" className="footer-social">
                          <i className="bi bi-instagram fs-5"></i>
                        </a>
                      )}
                      {m.redes.linkedin && (
                        <a href={m.redes.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social" title="LinkedIn">
                          <i className="bi bi-linkedin fs-5"></i>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-9">
                    <h5 className="fw-bold">{m.nombre}</h5>
                    <p className="text-muted mb-2">
                      <i className="bi bi-briefcase me-1" style={{ color: '#e06f8b' }}></i>
                      {m.rol}
                    </p>
                    <p className="mb-3">{m.bio}</p>
                    <p className="mb-3">
                      <i className="bi bi-envelope me-2" style={{ color: '#e06f8b' }}></i>
                      <a href={`mailto:${m.email}`} className="text-decoration-none" style={{ color: '#e06f8b' }}>
                        {m.email}
                      </a>
                    </p>
                    {/* Habilidades */}
                    <div>
                      <p className="fw-semibold mb-2">
                        <i className="bi bi-tools me-1" style={{ color: '#e06f8b' }}></i>
                        Habilidades:
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        {m.habilidades.map((h, i) => (
                          <span key={i} className="badge-habilidad">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="portada-footer py-3">
        <div className="d-flex justify-content-center gap-3 px-4">
          {['bi-facebook', 'bi-twitter-x', 'bi-instagram', 'bi-linkedin', 'bi-github'].map((icon, i) => (
            <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="footer-social">
              <i className={`bi ${icon} fs-5`}></i>
            </a>
          ))}
        </div>
        <p className="text-center text-muted small mb-0 mt-2">© 2026 HabitUp</p>
      </footer>

    </div>
  )
}
