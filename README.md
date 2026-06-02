# ComuniApp

**ComuniApp** es una aplicación web de una sola página (SPA) que funciona como puente digital entre **residentes** y **emprendedores locales** del municipio de **Mistrató, Risaralda**. Permite descubrir servicios y productos del comercio local, gestionar publicaciones, calificar experiencias y mantener la información persistida en el navegador sin depender de un backend en esta versión académica.

---

## Tecnologías utilizadas

| Área | Tecnología |
|------|------------|
| Framework UI | **React.js 19** (JavaScript) |
| Bundler y entorno | **Vite 8** |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/vite`) |
| Enrutamiento | **React Router v7** con **`HashRouter`** |
| Iconografía | **Lucide React** |
| Pruebas | **Vitest** + **React Testing Library** + **@vitest/coverage-v8** |
| Persistencia | **`localStorage`** (simulación de base de datos del lado del cliente) |
| Despliegue estático | **gh-pages** |

---

## Arquitectura del proyecto

```text
comuniapp/
├── public/
│   └── images/                 # Imágenes estáticas del catálogo semilla
├── src/
│   ├── assets/                 # Recursos importados (logo SVG)
│   ├── components/
│   │   ├── common/             # Botones, inputs, tarjetas, estrellas, modales, formularios
│   │   └── layout/             # Navbar, Footer, MainLayout, rutas protegidas
│   ├── constants/              # Categorías, rutas de imágenes públicas
│   ├── context/                # AuthContext, ServiceContext, ToastContext
│   ├── hooks/                  # useLocalStorage (sincronización con storage)
│   ├── integration/            # Pruebas de flujos completos (auth, reseñas, filtros)
│   ├── routes/                 # Definición central de rutas (AppRoutes)
│   ├── services/               # storage.js, seedData.js (datos semilla)
│   ├── utils/                  # Validadores, helpers, formato de teléfono, Base64
│   ├── views/                  # Pantallas por módulo (Welcome, Auth, Home, Detail, etc.)
│   ├── test/                   # Utilidades compartidas para pruebas
│   ├── App.jsx                 # Composición de providers y router
│   └── main.jsx                # Punto de entrada
├── vite.config.js              # base, plugins, configuración Vitest/coverage
├── package.json
├── README.md                   # Este documento
└── TESTING.md                  # Documentación de pruebas y cobertura
```

### Responsabilidad de carpetas clave

- **`src/components`**: Piezas de interfaz reutilizables y desacopladas de la lógica de negocio.
- **`src/context`**: Estado global de autenticación, catálogo de servicios y notificaciones toast.
- **`src/hooks`**: Abstracción de lectura/escritura del estado persistido.
- **`src/views`**: Vistas completas alineadas con las pantallas del diseño (Figma/HTML de referencia).
- **`src/services`**: Capa de persistencia y datos iniciales (semilla) para poblar la aplicación.

---

## Funcionalidades clave implementadas

### 1. Sistema de autenticación simulado

- Registro e inicio de sesión con validación de correo y contraseña.
- Roles diferenciados: **Residente** y **Emprendedor**.
- Sesión y perfiles persistidos en `localStorage`.
- Edición de perfil en `/perfil` (datos básicos, bio, redes, foto en Base64).

### 2. Catálogo interactivo

- Listado de servicios con **buscador reactivo**.
- **Filtros** por categoría y ordenamiento.
- Tarjetas con imagen, precio, emprendedor y calificación promedio.

### 3. Gestión de publicaciones (CRUD — Emprendedor)

- Crear, editar y eliminar publicaciones propias.
- **Una (1) imagen** por publicación, cargada en el cliente y almacenada en **Base64**.
- Zona de carga estilizada (drag-and-drop).

### 4. Sistema de calificación y reseñas

- Selector de estrellas interactivo (hover y selección persistente).
- Comentarios con validación de longitud.
- **Residentes y emprendedores** pueden reseñar; ningún usuario puede reseñar **su propia** publicación.
- Promedio y listado actualizados en tiempo real sin recargar la página.

### 5. Detalle de servicio y contacto

- Galería, descripción, horario y dirección.
- Modal de contacto dinámico por emprendedor (teléfono formato Colombia, WhatsApp, redes).
- Perfil breve del emprendedor en la vista de detalle.

### 6. Persistencia en `localStorage`

- Clave de almacenamiento: `comuniapp_state_v1`.
- Datos semilla: usuarios, 6 servicios con 2–4 reseñas cada uno.
- Migración automática al cargar datos antiguos (emprendedores y reseñas faltantes).

---

## Instalación

```bash
git clone <url-del-repositorio>
cd comuniapp
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre la URL que indique Vite, normalmente:

`http://localhost:5173/comuniAppFrontend/`

## Build de producción

```bash
npm run build
```

Los artefactos se generan en la carpeta `dist/`.

## Vista previa del build

```bash
npm run preview
```

## Despliegue en GitHub Pages

La aplicación está configurada con:

- **`base`**: `/comuniAppFrontend/` en `vite.config.js`
- **`HashRouter`**: evita errores 404 al recargar rutas en hosting estático

```bash
npm run deploy
```

Este comando ejecuta `predeploy` (build) y publica `dist/` con **gh-pages**. Requiere tener configurado el remoto `origin` y permisos sobre el repositorio.

URL típica de despliegue:

`https://<usuario>.github.io/comuniAppFrontend/`

---

## Cuentas de demostración

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Residente | `alicia@residente.com` | `demo1234` |
| Emprendedor (Café) | `martha@cafe.com` | `demo1234` |
| Emprendedor (Turismo) | `carlos@turismo.com` | `demo1234` |

---

## Resetear datos locales

En el navegador: **DevTools → Application → Local Storage** → eliminar la clave `comuniapp_state_v1` → recargar la página.

---

## Documentación de pruebas

Consulta **[TESTING.md](./TESTING.md)** para la estrategia de pruebas, comandos y reporte de cobertura (mínimo **80%**).

---

## Licencia y contexto académico

Proyecto desarrollado con fines académicos — **IBERO**, Análisis y diseño de sistemas.
