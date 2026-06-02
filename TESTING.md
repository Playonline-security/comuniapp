# ComuniApp — Documentación de pruebas y calidad

Este documento describe la estrategia de testing del frontend **ComuniApp**. No sustituye al código de las pruebas; complementa el [README.md](./README.md) con el enfoque de calidad adoptado en el proyecto.

---

## 1. Ecosistema de pruebas

| Herramienta | Uso en el proyecto |
|-------------|-------------------|
| **Vitest** | Runner de pruebas compatible con Vite; ejecución rápida en CI y local. |
| **React Testing Library (RTL)** | Renderizado de componentes y simulación de interacción desde la perspectiva del usuario. |
| **@testing-library/user-event** | Eventos realistas (clic, escritura en formularios). |
| **@testing-library/jest-dom** | Matchers adicionales (`toBeInTheDocument`, etc.). |
| **jsdom** | Entorno DOM simulado para pruebas en Node. |
| **@vitest/coverage-v8** | Reporte de cobertura con motor V8. |

Configuración principal: `vite.config.js` (bloque `test` y `coverage`).

Archivo de setup global: `src/setupTests.js`.

---

## 2. Estrategia y tipos de pruebas

### 2.1 Pruebas unitarias

Prueban unidades aisladas con dependencias mínimas o mocks controlados.

| Área | Ejemplos en el repositorio |
|------|---------------------------|
| **Componentes UI** | `Button.test.jsx`, `RatingStars.test.jsx`, `Input` (vía formularios), `ServiceCard.test.jsx`, `ImageGallery.test.jsx`, `ContactModal.test.jsx`, `BackButton.test.jsx`, `ReviewForm.test.jsx` |
| **Utilidades** | `validators.test.js`, `serviceHelpers.test.js`, `imageFiles.test.js`, `formatPhone.test.js`, `publicAsset.test.js` |
| **Servicios** | `storage.test.js`, `seedData.test.js` |
| **Contextos (hooks)** | `AuthContext.test.jsx`, `ServiceContext.test.jsx` |
| **Vistas puntuales** | `LoginView.test.jsx` |

#### Hooks y contexto

- **`AuthContext`**: login, registro, logout, actualización de perfil, rechazo de datos inválidos.
- **`useLocalStorage`**: integrado indirectamente vía `AuthProvider` / `ServiceProvider` y pruebas de `storage.js`.
- **`ServiceContext`**: CRUD de servicios, permisos por rol, reseñas (incluida restricción de auto-reseña para emprendedores).

### 2.2 Pruebas de integración

Simulan flujos que atraviesan varios módulos (router + contextos + vistas).

| Flujo | Archivo | Qué valida |
|-------|---------|------------|
| Autenticación | `integration/AuthFlow.test.jsx` | Login exitoso y feedback al usuario |
| Filtros en Home | `integration/HomeFilter.test.jsx` | Búsqueda y filtrado del catálogo |
| Reseñas y contacto | `integration/ReviewFlow.test.jsx` | Envío de reseña, modal de contacto dinámico en otro servicio |

#### Flujos cubiertos en detalle

1. **Login / Registro**: formularios conectados a `AuthContext` y persistencia.
2. **Carga de imágenes Base64**: `imageFiles.test.js` y flujos de publicación del emprendedor.
3. **Publicación y edición**: `ServiceContext.test.jsx` (crear, editar, eliminar con permisos).
4. **Modal de contacto**: datos del emprendedor correctos según el servicio seleccionado.
5. **Historial de comentarios**: reseña nueva visible tras envío sin recargar (`ReviewFlow`).

---

## 3. Comandos de ejecución

### Ejecutar toda la suite (una vez)

```bash
npm test
```

Equivalente a:

```bash
npm run test
```

que invoca `vitest run`.

### Modo interactivo (watch)

```bash
npm run test:watch
```

Vitest vuelve a ejecutar las pruebas al guardar archivos. Útil durante el desarrollo.

### Ejecutar un archivo o patrón concreto

```bash
npx vitest run src/context/ServiceContext.test.jsx
```

```bash
npx vitest run src/integration
```

---

## 4. Reporte de cobertura (Coverage)

### Generar el reporte

```bash
npm run test:coverage
```

Internamente ejecuta:

```text
vitest run --coverage
```

### Umbrales configurados

En `vite.config.js` se exige un mínimo del **80%** en:

- **Líneas** (`lines`)
- **Funciones** (`functions`)
- **Ramas** (`branches`)
- **Sentencias** (`statements`)

Si la cobertura cae por debajo de estos umbrales, el comando finaliza con error de CI/local.

### Dónde ver los resultados

1. **Consola**: resumen al final de `npm run test:coverage`.
2. **HTML**: carpeta `coverage/` (abrir `coverage/index.html` en el navegador).
3. **LCOV**: `coverage/lcov.info` (integración con herramientas externas).

### Criterio de aceptación del proyecto

> El proyecto cumple el criterio de aceptación de **cobertura mínima del 80%** en líneas, funciones y branches, verificable mediante `npm run test:coverage`.

---

## 5. Buenas prácticas adoptadas

- **`resetStorage()`** en `beforeEach` de pruebas que dependen del estado inicial.
- **`renderWithProviders`** (`src/test/testUtils.jsx`) para envolver componentes con `MemoryRouter`, `ToastProvider`, `AuthProvider` y `ServiceProvider`.
- **Mocks de `FileReader`** en pruebas de conversión Base64.
- Evitar acoplar pruebas a implementaciones internas; priorizar roles, textos visibles y resultados persistidos.

---

## 6. Relación con el README principal

Para instalación, despliegue y arquitectura general del producto, consulta **[README.md](./README.md)**.
