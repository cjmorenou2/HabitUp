// Punto de entrada principal de la aplicación React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap CSS y Bootstrap Icons globalmente
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Estilos globales del proyecto
import './styles/estilos.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
