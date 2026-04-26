/**
 * ModalLogin.jsx
 * Modal de inicio de sesión usando React-Bootstrap.
 *
 * Funcionalidades:
 *  - Formulario con usuario y contraseña
 *  - Ojito (👁) para mostrar / ocultar la contraseña
 *  - Mini-CAPTCHA matemático para evitar bots
 *  - Validación contra credenciales: Admin / 1234
 *  - Mensaje de error si las credenciales son incorrectas
 *  - Al ingresar correctamente redirige a /app
 */

import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, InputGroup, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App.jsx'

/** Genera un CAPTCHA matemático simple */
function generarCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { pregunta: `¿Cuánto es ${a} + ${b}?`, respuesta: a + b }
}

export default function ModalLogin({ show, onHide }) {
  const [usuario,         setUsuario]         = useState('')
  const [password,        setPassword]        = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [error,           setError]           = useState('')
  const [captcha,         setCaptcha]         = useState(generarCaptcha())
  const [respCaptcha,     setRespCaptcha]     = useState('')

  const { login } = useAuth()
  const navigate  = useNavigate()

  // Regenerar captcha cada vez que se abre el modal
  useEffect(() => {
    if (show) setCaptcha(generarCaptcha())
  }, [show])

  function toggleVerPassword() {
    setMostrarPassword(prev => !prev)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Verificar CAPTCHA
    if (parseInt(respCaptcha) !== captcha.respuesta) {
      setError('Respuesta del CAPTCHA incorrecta. Por favor verifica.')
      setCaptcha(generarCaptcha())
      setRespCaptcha('')
      return
    }

    const exito = login(usuario, password)
    if (exito) {
      onHide()
      navigate('/app')
    } else {
      setError('Usuario o contraseña incorrectos. Intenta con Admin / 1234')
      setCaptcha(generarCaptcha())
      setRespCaptcha('')
    }
  }

  function handleCerrar() {
    setUsuario(''); setPassword(''); setMostrarPassword(false)
    setError(''); setRespCaptcha(''); setCaptcha(generarCaptcha())
    onHide()
  }

  return (
    <Modal show={show} onHide={handleCerrar} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="login-titulo">
          <i className="bi bi-person-circle me-2"></i>Iniciar Sesión
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-2">
        {error && (
          <Alert variant="danger" className="py-2 small">
            <i className="bi bi-exclamation-triangle-fill me-1"></i>{error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Usuario */}
          <Form.Group className="mb-3" controlId="loginUsuario">
            <Form.Label className="fw-semibold">Usuario</Form.Label>
            <InputGroup>
              <InputGroup.Text className="login-icono">
                <i className="bi bi-person"></i>
              </InputGroup.Text>
              <Form.Control
                type="text" placeholder="Ingresa tu usuario"
                value={usuario} onChange={e => setUsuario(e.target.value)}
                required autoFocus
              />
            </InputGroup>
          </Form.Group>

          {/* Contraseña con ojito */}
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label className="fw-semibold">Contraseña</Form.Label>
            <InputGroup>
              <InputGroup.Text className="login-icono">
                <i className="bi bi-lock"></i>
              </InputGroup.Text>
              <Form.Control
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={password} onChange={e => setPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary" onClick={toggleVerPassword}
                title={mostrarPassword ? 'Ocultar' : 'Ver contraseña'}
                className="ojito-btn" type="button"
              >
                <i className={`bi ${mostrarPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </InputGroup>
            <Form.Text className="text-muted small">Pista: Admin / 1234</Form.Text>
          </Form.Group>

          {/* CAPTCHA matemático */}
          <Form.Group className="mb-4" controlId="captcha">
            <Form.Label className="fw-semibold">
              <i className="bi bi-shield-check me-1" style={{ color: '#e06f8b' }}></i>
              Verificación anti-bot
            </Form.Label>
            <div className="captcha-box mb-2">
              <span className="captcha-pregunta">{captcha.pregunta}</span>
            </div>
            <Form.Control
              type="number" placeholder="Tu respuesta"
              value={respCaptcha} onChange={e => setRespCaptcha(e.target.value)}
              required
            />
          </Form.Group>

          {/* Botones */}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={handleCerrar} type="button">
              Cancelar
            </Button>
            <Button type="submit" className="btn-ingresar">
              <i className="bi bi-box-arrow-in-right me-1"></i>Ingresar
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0" />
    </Modal>
  )
}
