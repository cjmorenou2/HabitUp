/**
 * Portada.jsx
 * Página de inicio pública de HabitUp.
 *
 * Funcionalidades implementadas:
 *  - Navbar pública fija con dropdown y links
 *  - Carrusel de testimonios / características
 *  - Sección Hero con animación fade
 *  - Diseño a tres columnas (características)
 *  - Acordeón de preguntas frecuentes
 *  - Efectos: fade, modal, collapse, popover, dropdown
 *  - Texto con primera letra grande (drop cap)
 *  - Footer con contactos y redes sociales
 *  - Modal de Login con CAPTCHA
 */

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ModalLogin from '../components/ModalLogin.jsx'

export default function Portada() {
  const [showLogin,    setShowLogin]    = useState(false)
  const [acordeonAb,   setAcordeonAb]   = useState(null)
  const [popoverVis,   setPopoverVis]   = useState(false)
  const [notifVis,     setNotifVis]     = useState(false)
  const [carruselIdx,  setCarruselIdx]  = useState(0)
  const [collapseVis,  setCollapseVis]  = useState(false)
  const audioRef = useRef(null)
  const [reproduciendo, setReproduciendo] = useState(false)

  /* ── Datos del carrusel ─────────────────────────────────────────────── */
  const SLIDES = [
    {
      icono: '🎯',
      titulo: 'Alcanza tus Metas',
      texto: 'Registra y monitorea tus hábitos diarios para construir una versión mejor de ti mismo cada día.',
      color: '#e06f8b'
    },
    {
      icono: '✅',
      titulo: 'Gestiona tus Tareas',
      texto: 'Organiza tu lista de pendientes de forma intuitiva. Marca como completadas y mantén el control total.',
      color: '#9b59b6'
    },
    {
      icono: '📊',
      titulo: 'Progreso Visual',
      texto: 'Visualiza tu avance con indicadores claros. La constancia es la clave del éxito.',
      color: '#2ecc71'
    },
    {
      icono: '🔒',
      titulo: 'Tu Espacio Privado',
      texto: 'Acceso seguro con autenticación. Tu información personal protegida siempre.',
      color: '#3498db'
    }
  ]

  /* ── Auto-avance del carrusel ───────────────────────────────────────── */
  useEffect(() => {
    const timer = setInterval(() => {
      setCarruselIdx(i => (i + 1) % SLIDES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  /* ── FAQ acordeón ───────────────────────────────────────────────────── */
  const FAQS = [
    { id: 1, p: '¿Es gratuito HabitUp?', r: 'Sí, HabitUp es completamente gratuito en su versión actual. Todas las funcionalidades están disponibles sin costo alguno para todos los usuarios.' },
    { id: 2, p: '¿Puedo usar HabitUp en mi celular?', r: 'Absolutamente. HabitUp está diseñado con Responsive Design, adaptándose perfectamente a smartphones, tablets y computadores de escritorio.' },
    { id: 3, p: '¿Mis datos están seguros?', r: 'Tu privacidad es nuestra prioridad. HabitUp implementa rutas privadas protegidas por autenticación para que nadie más pueda ver tu información.' },
    { id: 4, p: '¿Cómo empiezo a usarlo?', r: 'Muy simple: haz clic en "Ingresar", usa las credenciales Admin / 1234, y estarás listo para crear tus primeros hábitos y tareas.' },
  ]

  function toggleAcordeon(id) {
    setAcordeonAb(prev => prev === id ? null : id)
  }

  function toggleAudio() {
    if (!audioRef.current) return
    if (reproduciendo) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setReproduciendo(!reproduciendo)
  }

  return (
    <div className="portada-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>

      {/* ── Navbar pública fija ─────────────────────────────────────────── */}
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom shadow-sm sticky-top">
        <div className="container-fluid px-4">
          <span className="navbar-brand logo-texto">🎯 HabitUp</span>

          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navPub">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navPub">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <a className="nav-link" href="#caracteristicas">
                  <i className="bi bi-star me-1"></i>Características
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  <i className="bi bi-question-circle me-1"></i>FAQ
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactos">
                  <i className="bi bi-people me-1"></i>Equipo
                </Link>
              </li>
              {/* Dropdown de información */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="bi bi-info-circle me-1"></i>Acerca de
                </a>
                <ul className="dropdown-menu shadow border-0">
                  <li><a className="dropdown-item" href="#"><i className="bi bi-building me-2"></i>La Empresa</a></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-journal-text me-2"></i>Blog</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#"><i className="bi bi-file-text me-2"></i>Términos de Uso</a></li>
                </ul>
              </li>
            </ul>

            {/* Botón de acceso y notificación */}
            <div className="d-flex align-items-center gap-2">
              {/* Notificación popover */}
              <div className="position-relative">
                <button className="btn btn-sm btn-outline-secondary position-relative"
                  onClick={() => setNotifVis(v => !v)}>
                  <i className="bi bi-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    1
                  </span>
                </button>
                {notifVis && (
                  <div className="popover-custom shadow-lg">
                    <div className="popover-header-custom">
                      <i className="bi bi-bell-fill me-1"></i> Notificación
                    </div>
                    <div className="popover-body-custom">
                      🎉 ¡Bienvenido a HabitUp! Inicia sesión para comenzar a gestionar tus hábitos.
                    </div>
                  </div>
                )}
              </div>

              <button className="btn btn-ingresar" onClick={() => setShowLogin(true)}>
                <i className="bi bi-box-arrow-in-right me-1"></i>Ingresar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <div className="hero-section flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="text-center px-3 contenido">

          {/* Logo animado */}
          <p className="logo-habitup">HabitUp</p>

          {/* Subtítulo con primera letra grande (drop cap) */}
          <p className="portada-subtitulo">
            <span className="primera-letra">O</span>rganiza tus hábitos y tareas diarias
          </p>

          <p className="text-muted mb-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
            La herramienta perfecta para construir rutinas positivas y alcanzar tus metas personales.
          </p>

          {/* Botones acción */}
          <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
            <button className="btn btn-ingresar px-4 py-2" onClick={() => setShowLogin(true)}>
              <i className="bi bi-box-arrow-in-right me-2"></i>Comenzar Ahora
            </button>
            <button className="btn btn-outline-secondary px-4 py-2"
              onClick={() => setCollapseVis(v => !v)}>
              <i className={`bi bi-chevron-${collapseVis ? 'up' : 'down'} me-1`}></i>
              {collapseVis ? 'Ocultar' : 'Ver más'}
            </button>
          </div>

          {/* Collapse de información adicional */}
          {collapseVis && (
            <div className="collapse-info contenido">
              <div className="row g-3 mt-2 justify-content-center">
                {[
                  { icono: 'bi-lightning-charge', txt: 'Rápido y sencillo de usar' },
                  { icono: 'bi-phone',             txt: '100% Responsive' },
                  { icono: 'bi-shield-lock',       txt: 'Acceso seguro' },
                ].map((item, i) => (
                  <div key={i} className="col-auto">
                    <span className="badge-info-item">
                      <i className={`bi ${item.icono} me-1`}></i>{item.txt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Carrusel de características ─────────────────────────────────── */}
      <section className="carrusel-section py-5">
        <div className="container">
          <h2 className="text-center pagina-titulo mb-5">
            <span className="primera-letra">¿</span>Por qué HabitUp?
          </h2>

          <div className="carrusel-wrapper">
            {/* Slide activo */}
            <div className="carrusel-slide contenido" key={carruselIdx}>
              <div className="carrusel-icono" style={{ color: SLIDES[carruselIdx].color }}>
                {SLIDES[carruselIdx].icono}
              </div>
              <h4 className="fw-bold mt-3">{SLIDES[carruselIdx].titulo}</h4>
              <p className="text-muted">{SLIDES[carruselIdx].texto}</p>
            </div>

            {/* Controles */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => setCarruselIdx(i => (i - 1 + SLIDES.length) % SLIDES.length)}>
                <i className="bi bi-chevron-left"></i>
              </button>
              {SLIDES.map((_, i) => (
                <button key={i}
                  className={`btn btn-sm ${i === carruselIdx ? 'btn-rosa' : 'btn-outline-secondary'}`}
                  style={{ width: '10px', height: '10px', padding: 0, borderRadius: '50%',
                    background: i === carruselIdx ? '#e06f8b' : 'transparent',
                    border: `2px solid ${i === carruselIdx ? '#e06f8b' : '#ccc'}` }}
                  onClick={() => setCarruselIdx(i)}
                />
              ))}
              <button className="btn btn-sm btn-outline-secondary"
                onClick={() => setCarruselIdx(i => (i + 1) % SLIDES.length)}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tres Columnas de características ────────────────────────────── */}
      <section id="caracteristicas" className="py-5 bg-white">
        <div className="container">
          <h2 className="pagina-titulo text-center mb-5">
            <span className="primera-letra">F</span>uncionalidades
          </h2>
          <div className="row g-4">
            {[
              { icono: 'bi-check2-circle', titulo: 'Hábitos Diarios', desc: 'Crea, edita y elimina hábitos. Marca cada uno como completado y mantén tu racha de productividad.' },
              { icono: 'bi-list-task',     titulo: 'Lista de Tareas',  desc: 'Gestiona tu lista de pendientes con nombres y descripciones. Organiza todo en un solo lugar.' },
              { icono: 'bi-shield-lock',   titulo: 'Acceso Seguro',    desc: 'Sistema de autenticación con rutas privadas. Solo tú puedes ver tu información personal.' },
            ].map((f, i) => (
              <div key={i} className="col-12 col-md-4">
                <div className="card-acceso h-100">
                  <i className={`bi ${f.icono} fs-1 mb-3`} style={{ color: '#e06f8b' }}></i>
                  <h5 className="fw-bold">{f.titulo}</h5>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sección de video ─────────────────────────────────────────────── */}
      <section className="py-5" style={{ background: '#fff5f7' }}>
        <div className="container text-center">
          <h2 className="pagina-titulo mb-4">
            <span className="primera-letra">D</span>emo en Video
          </h2>
          <p className="text-muted mb-4">Mira cómo funciona HabitUp en menos de un minuto.</p>
          <div className="video-wrapper mx-auto">
            {/* Video embebido de YouTube (demo) */}
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo HabitUp"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '16px' }}
            ></iframe>
          </div>

          {/* Control de sonido ambiental */}
          <div className="mt-4">
            <button className="btn btn-outline-secondary" onClick={toggleAudio}>
              <i className={`bi ${reproduciendo ? 'bi-pause-circle' : 'bi-play-circle'} me-2`}></i>
              {reproduciendo ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
            </button>
            {/* Audio: usa un mp3 libre de derechos embebido en base64 (beep corto) */}
            <audio ref={audioRef} loop>
              <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
            <p className="text-muted small mt-2">
              <i className="bi bi-info-circle me-1"></i>
              Funcionalidad de audio ambiental para concentración
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Acordeón ────────────────────────────────────────────────── */}
      <section id="faq" className="py-5">
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 className="pagina-titulo text-center mb-5">
            <span className="primera-letra">P</span>reguntas Frecuentes
          </h2>
          {FAQS.map(faq => (
            <div key={faq.id} className="mb-3">
              <button className="miembro-btn w-100 text-start" onClick={() => toggleAcordeon(faq.id)}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{faq.p}</span>
                  <i className={`bi bi-chevron-${acordeonAb === faq.id ? 'up' : 'down'}`}></i>
                </div>
              </button>
              {acordeonAb === faq.id && (
                <div className="miembro-detalle contenido">
                  <p className="mb-0 text-muted">{faq.r}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="portada-footer py-4">
        <div className="container">
          <div className="row align-items-center g-3">

            {/* Marca */}
            <div className="col-12 col-md-4 text-center text-md-start">
              <span className="logo-texto">🎯 HabitUp</span>
              <p className="text-muted small mb-0 mt-1">
                Tu compañero de productividad personal
              </p>
            </div>

            {/* Links */}
            <div className="col-12 col-md-4 text-center">
              <Link to="/contactos" className="footer-link mx-2">
                <i className="bi bi-people me-1"></i>Contáctenos
              </Link>
              <a href="#" className="footer-link mx-2">
                <i className="bi bi-file-text me-1"></i>Privacidad
              </a>
            </div>

            {/* Redes sociales */}
            <div className="col-12 col-md-4 text-center text-md-end">
              <span className="text-muted small me-2">Síguenos:</span>
              {[
                { href: 'https://facebook.com',  icon: 'bi-facebook',  title: 'Facebook' },
                { href: 'https://twitter.com',   icon: 'bi-twitter-x', title: 'Twitter/X' },
                { href: 'https://instagram.com', icon: 'bi-instagram', title: 'Instagram' },
                { href: 'https://linkedin.com',  icon: 'bi-linkedin',  title: 'LinkedIn' },
                { href: 'https://github.com',    icon: 'bi-github',    title: 'GitHub' },
              ].map((r, i) => (
                <a key={i} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="footer-social ms-2" title={r.title}>
                  <i className={`bi ${r.icon} fs-5`}></i>
                </a>
              ))}
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(162,169,177,0.3)' }} />
          <p className="text-center text-muted small mb-0">
            © 2026 HabitUp — Aplicación Web desarrollada con React + Vite + Bootstrap
          </p>
        </div>
      </footer>

      {/* ── Modal de Login ───────────────────────────────────────────────── */}
      <ModalLogin show={showLogin} onHide={() => setShowLogin(false)} />
    </div>
  )
}
