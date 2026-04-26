/**
 * ListaTareas.jsx
 * Gestión completa de tareas: agregar, editar, eliminar, completar.
 * Incluye prioridades y filtros.
 */
import React, { useState } from 'react'
import NavbarPrivada from '../components/NavbarPrivada.jsx'

const INICIALES = [
  { id: 1, nombre: 'Estudiar React Router',  descripcion: 'Capítulo de rutas privadas',          completado: false, prioridad: 'alta'  },
  { id: 2, nombre: 'Entregar proyecto',       descripcion: 'Subir a plataforma antes del viernes', completado: false, prioridad: 'alta'  },
  { id: 3, nombre: 'Revisar CSS',             descripcion: 'Ajustar responsive en móvil',          completado: true,  prioridad: 'media' },
]
const VACIO = { nombre: '', descripcion: '', prioridad: 'media' }

const COLOR_PRIORIDAD = { alta: '#e74c3c', media: '#f39c12', baja: '#2ecc71' }

export default function ListaTareas() {
  const [tareas,      setTareas]      = useState(INICIALES)
  const [formulario,  setFormulario]  = useState(VACIO)
  const [editandoId,  setEditandoId]  = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error,       setError]       = useState('')
  const [filtro,      setFiltro]      = useState('todos')

  function abrirAgregar() { setFormulario(VACIO); setEditandoId(null); setError(''); setMostrarForm(true) }
  function abrirEditar(t) { setFormulario({ nombre: t.nombre, descripcion: t.descripcion, prioridad: t.prioridad }); setEditandoId(t.id); setError(''); setMostrarForm(true) }
  function cerrar()        { setMostrarForm(false); setFormulario(VACIO); setEditandoId(null); setError('') }
  function handleChange(e) { const {name,value}=e.target; setFormulario(p=>({...p,[name]:value})) }

  function handleGuardar(e) {
    e.preventDefault()
    if (!formulario.nombre.trim()) { setError('El nombre es obligatorio.'); return }
    if (editandoId === null) {
      setTareas(p => [...p, { id: Date.now(), nombre: formulario.nombre.trim(), descripcion: formulario.descripcion.trim(), completado: false, prioridad: formulario.prioridad }])
    } else {
      setTareas(p => p.map(t => t.id === editandoId ? { ...t, nombre: formulario.nombre.trim(), descripcion: formulario.descripcion.trim(), prioridad: formulario.prioridad } : t))
    }
    cerrar()
  }

  const tareasFiltradas = tareas.filter(t => {
    if (filtro === 'pendientes')  return !t.completado
    if (filtro === 'completados') return  t.completado
    return true
  })

  const completadas = tareas.filter(t => t.completado).length
  const progreso    = tareas.length > 0 ? Math.round((completadas / tareas.length) * 100) : 0

  return (
    <>
      <NavbarPrivada />
      <div className="container-fluid p-4 contenido">

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="pagina-titulo mb-0"><span className="primera-letra">M</span>is Tareas</h2>
          <button className="btn btn-ingresar" onClick={abrirAgregar}>
            <i className="bi bi-plus-circle me-1"></i>Agregar tarea
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Progreso</span>
            <span>{completadas} / {tareas.length} completadas ({progreso}%)</span>
          </div>
          <div className="progress" style={{ height: '10px', borderRadius: '20px' }}>
            <div className="progress-bar" role="progressbar"
              style={{ width: `${progreso}%`, background: '#9b59b6', borderRadius: '20px' }}>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {[['todos','Todos'],['pendientes','Pendientes'],['completados','Completados']].map(([val,lbl]) => (
            <button key={val}
              className={`btn btn-sm ${filtro === val ? 'btn-ingresar' : 'btn-outline-secondary'}`}
              onClick={() => setFiltro(val)}
            >{lbl}</button>
          ))}
        </div>

        {tareasFiltradas.length === 0 && (
          <p className="text-muted text-center mt-5">
            {filtro === 'todos' ? 'No hay tareas. ¡Agregá una!' : `No hay tareas ${filtro}.`}
          </p>
        )}

        <ul className="list-unstyled">
          {tareasFiltradas.map(t => (
            <li key={t.id} className="lista-item">
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                <input type="checkbox" className="form-check-input mt-0"
                  checked={t.completado}
                  onChange={() => setTareas(p => p.map(x => x.id===t.id ? {...x,completado:!x.completado} : x))}
                  style={{ width:'1.3em', height:'1.3em', accentColor:'#9b59b6', cursor:'pointer' }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <p className={`mb-0 fw-bold ${t.completado ? 'text-decoration-line-through text-muted' : ''}`}>
                      {t.nombre}
                    </p>
                    <span className="badge rounded-pill"
                      style={{ background: COLOR_PRIORIDAD[t.prioridad], fontSize: '0.7rem' }}>
                      {t.prioridad}
                    </span>
                  </div>
                  {t.descripcion && <p className="mb-0 text-muted small">{t.descripcion}</p>}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => abrirEditar(t)} title="Editar">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => setTareas(p => p.filter(x => x.id !== t.id))} title="Eliminar">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal agregar / editar */}
      {mostrarForm && (
        <div className="modal d-block fondoModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius:'16px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color:'#2d3748' }}>
                  <i className="bi bi-list-task me-2" style={{ color:'#9b59b6' }}></i>
                  {editandoId === null ? 'Agregar tarea' : 'Editar tarea'}
                </h5>
                <button type="button" className="btn-close" onClick={cerrar}></button>
              </div>
              <div className="modal-body px-4">
                {error && (
                  <div className="alert alert-danger py-2 small">
                    <i className="bi bi-exclamation-triangle-fill me-1"></i>{error}
                  </div>
                )}
                <form onSubmit={handleGuardar}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre <span className="text-danger">*</span></label>
                    <input type="text" name="nombre" className="form-control"
                      placeholder="Ej: Entregar proyecto"
                      value={formulario.nombre} onChange={handleChange} autoFocus />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Descripción</label>
                    <input type="text" name="descripcion" className="form-control"
                      placeholder="Ej: Antes del viernes"
                      value={formulario.descripcion} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Prioridad</label>
                    <select name="prioridad" className="form-select"
                      value={formulario.prioridad} onChange={handleChange}>
                      <option value="alta">🔴 Alta</option>
                      <option value="media">🟡 Media</option>
                      <option value="baja">🟢 Baja</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mb-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={cerrar}>Cancelar</button>
                    <button type="submit" className="btn btn-ingresar">
                      <i className="bi bi-floppy me-1"></i>
                      {editandoId === null ? 'Agregar' : 'Guardar cambios'}
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0 pt-0"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
