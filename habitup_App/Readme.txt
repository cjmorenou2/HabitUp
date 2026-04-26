================================================================
  HabitUp - Aplicación Web React
  README - Instrucciones de instalación y ejecución
================================================================

CREDENCIALES DE ACCESO
-----------------------
  Usuario:    Admin
  Contraseña: 1234

================================================================
  OPCIÓN A - EJECUCIÓN LOCAL (Computador)
================================================================

REQUISITOS PREVIOS
------------------
  - Node.js versión 18 o superior
    Descarga: https://nodejs.org/
  - npm (viene incluido con Node.js)
  - Conexión a internet (para descargar dependencias)

PASOS DE INSTALACIÓN
--------------------

1. Descomprimir el archivo entregado
   Extrae el contenido del .zip en una carpeta de tu elección.
   Ejemplo: C:\Proyectos\habitup  (Windows)
            ~/Proyectos/habitup   (Mac/Linux)

2. Abrir una terminal / símbolo del sistema
   - Windows: Tecla Win + R → escribir "cmd" → Enter
   - Mac/Linux: Abrir Terminal

3. Navegar hasta la carpeta del proyecto
   cd ruta/a/la/carpeta/habitup
   Ejemplo:
     cd C:\Proyectos\habitup        (Windows)
     cd ~/Proyectos/habitup         (Mac/Linux)

4. Instalar las dependencias
   npm install
   (Este proceso puede tardar 1-3 minutos según la conexión)

5. Iniciar el servidor de desarrollo
   npm run dev

6. Abrir en el navegador
   El terminal mostrará una URL similar a:
     http://localhost:5173
   Copia y pega esa URL en tu navegador (Chrome, Firefox, Edge).

7. ¡Listo! La aplicación estará corriendo localmente.

DETENER LA APLICACIÓN
---------------------
  Presiona Ctrl + C en la terminal.

================================================================
  OPCIÓN B - DESPLIEGUE EN SERVIDOR EN LA NUBE (Vercel)
================================================================

Vercel es una plataforma gratuita ideal para aplicaciones React/Vite.

PASOS
-----

1. Crear cuenta en GitHub (si no tienes):
   https://github.com

2. Subir el proyecto a GitHub:
   - Crea un repositorio nuevo en GitHub (botón "New repository")
   - En la carpeta del proyecto ejecuta:
     git init
     git add .
     git commit -m "HabitUp - versión inicial"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/habitup.git
     git push -u origin main

3. Crear cuenta en Vercel:
   https://vercel.com
   (Puedes iniciar sesión con tu cuenta de GitHub)

4. Importar el proyecto:
   - En el dashboard de Vercel: "Add New Project"
   - Selecciona el repositorio habitup de GitHub
   - Framework Preset: Vite (se detecta automáticamente)
   - Haz clic en "Deploy"

5. En 1-2 minutos Vercel generará una URL pública:
   Ejemplo: https://habitup-abc123.vercel.app

6. ¡Tu aplicación estará disponible en internet!

================================================================
  OPCIÓN C - DESPLIEGUE EN NETLIFY (Alternativa)
================================================================

1. Generar el build de producción:
   npm run build
   (Se crea una carpeta llamada "dist")

2. Ir a https://netlify.com y crear una cuenta gratuita.

3. En el dashboard, arrastra y suelta la carpeta "dist"
   directamente en la zona de deploy de Netlify.

4. Netlify generará automáticamente una URL pública.

================================================================
  ESTRUCTURA DE CARPETAS DEL PROYECTO
================================================================

habitup/
├── index.html                  → Punto de entrada HTML
├── package.json                → Dependencias y scripts
├── vite.config.js              → Configuración de Vite
└── src/
    ├── main.jsx                → Punto de entrada React
    ├── App.jsx                 → Componente raíz + Router + AuthContext
    ├── components/             → Componentes reutilizables
    │   ├── NavbarPrivada.jsx   → Barra de navegación privada
    │   ├── ModalLogin.jsx      → Modal de inicio de sesión
    │   └── RutaPrivada.jsx     → Protección de rutas
    ├── pages/                  → Páginas de la aplicación
    │   ├── Portada.jsx         → Página principal pública
    │   ├── Contactos.jsx       → Equipo de desarrollo
    │   ├── Dashboard.jsx       → Panel principal privado
    │   ├── ListaHabitos.jsx    → Gestión de hábitos
    │   └── ListaTareas.jsx     → Gestión de tareas
    ├── styles/
    │   └── estilos.css         → Hoja de estilos global
    └── assets/                 → Imágenes y multimedia

================================================================
  DEPENDENCIAS PRINCIPALES
================================================================

  react              ^18.3.1   → Biblioteca UI principal
  react-dom          ^18.3.1   → Renderizado en el DOM
  react-router-dom   ^6.28.0   → Enrutamiento SPA
  react-bootstrap    ^2.10.7   → Componentes Bootstrap para React
  bootstrap          ^5.3.3    → Framework CSS
  bootstrap-icons    ^1.11.3   → Iconos
  vite               ^6.0.5    → Build tool y servidor de desarrollo

================================================================
  SOPORTE Y CONTACTO
================================================================

  Si encuentras algún problema con la instalación, contacta al
  equipo de desarrollo a través de la página /contactos de la app.

  Desarrollado con React + Vite + Bootstrap 5
  © 2025 HabitUp - Todos los derechos reservados
================================================================
