# ANTIGRAVITY.md - Contexto del Proyecto Lavaseco Universal

Este archivo proporciona el contexto técnico, arquitectónico y de diseño necesario para que tanto desarrolladores humanos como IAs puedan colaborar en el proyecto manteniendo la consistencia y calidad.

## 🏗️ Arquitectura: Granular MVC (Per-Page)

El proyecto sigue un patrón **Model-View-Controller (MVC) granular** por cada página/módulo. Esto garantiza escalabilidad e independencia total entre secciones.

**Estructura de un módulo en `src/pages/`:**
- `index.tsx`: Punto de entrada. Conecta el Controller con la View.
- `[Module]Controller.ts`: Lógica de negocio, estados locales y consumo de Contexts (Custom Hooks).
- `[Module]View.tsx`: Presentación pura. Recibe props y renderiza la UI usando componentes globales.

## 📦 Gestión de Estado: Specialized Contexts

En lugar de un estado global monolítico, el "Modelo" se divide en contextos especializados en `src/models/`:
- `WasherContext.tsx`: Datos y lógica IoT de lavadoras.
- `DryerContext.tsx`: Datos y lógica IoT de secadoras.
- `BranchContext.tsx`: Metadatos de sucursales.
- `UserContext.tsx`: Gestión de personal y accesos.

## 🎨 Sistema de Diseño y Estética

El dashboard busca una estética **Premium y Moderna** (Glassmorphism sutil, micro-animaciones, sombras profundas).

**Colores de Marca (Configurados en `tailwind.config.js`):**
- `brand-blue`: `#06476D` (Principal / Corporate)
- `brand-accent`: `#1EA0DC` (Secundario / Interacción)
- `brand-cyan`: `#5EBED6` (Acento / Soporte)
- `brand-dark`: `#434244` (Texto / Contrastes)

**Componentes Globales (`src/views/components/`):**
- `Card`: Contenedor base con props `noPadding` y `overflowVisible`.
- `Button`: Botones con variantes de marca.
- `Badge`: Etiquetas de estado con variantes informativas.
- `Select`: Selector personalizado (Custom Dropdown) con animaciones.
- `FormElements`: Inputs y controles básicos.

## 📂 Directorios Clave

- `/src/pages`: Módulos de página independientes.
- `/src/models`: Proveedores de Context API y lógica de datos.
- `/src/views`: Layouts globales y componentes compartidos.
- `/src/types`: Definiciones de interfaces TypeScript compartidas.

## 🛠️ Stack Tecnológico

- **Framework**: React 18 + Vite
- **Lenguaje**: TypeScript (Strict Mode)
- **Estilos**: Tailwind CSS v3
- **Iconos**: Lucide React
- **Gráficos**: Recharts
- **Routing**: React Router DOM v6

## 📜 Reglas de Desarrollo

1. **Type Safety**: Siempre define interfaces para las props de las vistas y modelos de datos.
2. **Modularidad**: No mezcles lógica de negocio dentro de archivos `.tsx`. Usa el Controller.
3. **Estética**: Usa los tokens de color `brand-*` en lugar de colores arbitrarios de Tailwind.
4. **Componentes**: Antes de crear un nuevo elemento de UI, verifica si ya existe en `src/views/components`.
5. **Build**: Asegúrate de que `npm run build` sea exitoso antes de dar por terminada una tarea.
6. **Importaciones**: Utiliza siempre el alias `@/` para importar desde la carpeta `src` (ej: `@/views/components/Card`). Esto evita errores de resolución en el editor y facilita el movimiento de archivos.

---
*Documentación generada por Antigravity para el equipo de Lavaseco Universal.*
