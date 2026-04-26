/**
 * ListaHabitos.jsx
 * Gestión completa de hábitos: agregar, editar, eliminar, completar.
 * Incluye contador de progreso y filtros.
 */
import React, { useState } from 'react'
import NavbarPrivada from '../components/NavbarPrivada.jsx'

const INICIALES = [
  { id: 1, nombre: 'Leer 30 minutos',  descripcion: 'Leer antes de dormir',    completado: false },
  { id: 2, nombre: 'Ejercicio',         descripcion: '30 minutos de cardio',    completado: true  },
  { id: 3, nombre: 'Meditación',        descripcion: '10 minutos al despertar', completado: false },
]
const VACIO = { nombre: '', descripcion: '' }

export default function ListaHabitos() {
  const [habitos,     setHabitos]     = useState(INICIALES)
  const [formulario,  setFormulario]  = useState(VACIO)
  const [editandoId,  setEditandoId]  = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error,       setError]       = useState('')
  const [filtro,      setFiltro]      = useState('todos') // todos | pendientes | completados

  function abrirAgregar() { setFormulario(VACIO); setEditandoId(null); setError(''); setMostrarForm(true) }
  function abrirEditar(h) { setFormulario({ nombre: h.nombre, descripcion: h.descripcion }); setEditandoId(h.id); setError(''); setMostrarForm(true) }
  function cerrar()        { setMostrarForm(false); setFormulario(VACIO); setEditandoId(null); setError('') }
  function handleChange(e) { const {name,value}=e.target; setFormulario(p=>({...p,[name]:value})) }

  function handleGuardar(e) {
    e.preventDefault()
    if (!formulario.nombre.trim()) { setError('El nombre es obligatorio.'); return }
    if (editandoId === null) {
      setHabitos(p => [...p, { id: Date.now(), nombre: formulario.nombre.trim(), descripcion: formulario.descripcion.trim(), completado: false }])
    } else {
      setHabitos(p => p.map(h => h.id === editandoId ? { ...h, nombre: formulario.nombre.trim(), descripcion: formulario.descripcion.trim() } : h))
    }
    cerrar()
  }

  const habitosFiltrados = habitos.filter(h => {
    if (filtro === 'pendientes')  return !h.completado
    if (filtro === 'completados') return  h.completado
    return true
  })

  const completados = habitos.filter(h => h.completado).length
  const progreso    = habitos.length > 0 ? Math.round((completados / habitos.length) * 100) : 0

  return (
    <>
      <NavbarPrivada />
      <div className="container-fluid p-4 contenido">

        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="pagina-titulo mb-0"><span className="primera-letra">M</span>is Hábitos</h2>
          <button className="btn btn-ingresar" onClick={abrirAgregar}>
            <i className="bi bi-plus-circle me-1"></i>Agregar hábito
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Progreso del día</span>
            <span>{completados} / {habitos.length} completados ({progreso}%)</span>
          </div>
          <div className="progress" style={{ height: '10px', borderRadius: '20px' }}>
            <div className="progress-bar" role="progressbar"
              style={{ width: `${progreso}%`, background: '#e06f8b', borderRadius: '20px' }}>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          {[['todos','Todos'],['pendientes','Pendientes'],['completados','Completados']].map(([val,lbl]) => (
            <button key={val}
              className={`btn btn-sm ${filtro === val ? 'btn-ingresar' : 'btn-outline-secondary'}`}
              onClick={() => setFiltro(val)}
              style={filtro === val ? { background: '#fff5f7', borderColor: '#e06f8b', color: '#e06f8b' } : {}}
            >
              {lbl}
            </button>
          ))}
        </div>

        {habitosFiltrados.length === 0 && (
          <p className="text-muted text-center mt-5">
            {filtro === 'todos' ? 'No hay hábitos. ¡Agregá uno!' : `No hay hábitos ${filtro}.`}
          </p>
        )}

        <ul className="list-unstyled">
          {habitosFiltrados.map(h => (
            <li key={h.id} className="lista-item">
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                <input type="checkbox" className="form-check-input mt-0"
                  checked={h.completado}
                  onChange={() => setHabitos(p => p.map(x => x.id===h.id ? {...x,completado:!x.completado} : x))}
                  style={{ width:'1.3em', height:'1.3em', accentColor:'#e06f8b', cursor:'pointer' }}
                />
                <div>
                  <p className={`mb-0 fw-bold ${h.completado ? 'text-decoration-line-through text-muted' : ''}`}>
                    {h.nombre}
                  </p>
                  {h.descripcion && <p className="mb-0 text-muted small">{h.descripcion}</p>}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => abrirEditar(h)} title="Editar">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => setHabitos(p => p.filter(x => x.id !== h.id))} title="Eliminar">
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
                  <i className="bi bi-check2-circle me-2" style={{ color:'#e06f8b' }}></i>
                  {editandoId === null ? 'Agregar hábito' : 'Editar hábito'}
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
                      placeholder="Ej: Leer 30 minutos"
                      value={formulario.nombre} onChange={handleChange} autoFocus />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Descripción</label>
                    <input type="text" name="descripcion" className="form-control"
                      placeholder="Ej: Antes de dormir"
                      value={formulario.descripcion} onChange={handleChange} />
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
