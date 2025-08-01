# 📋 Task Manager - Academia ForIT Challenge

> **Aplicación full-stack moderna de gestión de tareas desarrollada con Next.js 15, TypeScript y diseño oscuro sofisticado**

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)

---

## 🎯 **Proyecto Principal para Academia ForIT 2025**

Esta aplicación representa mi **mejor trabajo** para el challenge de ingreso, demostrando competencias avanzadas en desarrollo full-stack moderno con tecnologías de última generación.

> **⚠️ IMPORTANTE:** Este es el proyecto que dediqué **más tiempo y esfuerzo**. Los otros proyectos en el repositorio (Front/ y Back/ separados) son **solo ejercicios de aprendizaje** para entender las diferencias entre arquitecturas. **Front-Back-Next** es mi trabajo profesional principal.

### 🏆 **¿Por qué este proyecto destaca?**

- **🚀 Tecnología**: Next.js 15 con App Router y React 19
- **💪 TypeScript completo**: Tipado fuerte en toda la aplicación
- **🎨 Diseño excepcional**: Tema oscuro con animaciones y efectos visuales
- **🏗️ Arquitectura sólida**: Componentes reutilizables y código limpio
- **⚡ Rendimiento optimizado**: Turbopack y mejores prácticas
- **⏰ Mayor dedicación**: Proyecto en el que invertí más tiempo y desarrollo intensivo

---

## ✨ **Características Principales**

### 🎨 **Experiencia Visual Avanzada**
- **Tema oscuro sofisticado** con paleta personalizada
- **Fondo animado** con esferas flotantes que se mueven dinámicamente
- **Efectos glass-morphism** en tarjetas y componentes
- **Animaciones CSS** suaves con transiciones fluidas

### 🏗️ **Arquitectura Técnica**
- **Full-stack integrado** con Next.js API Routes
- **Almacenamiento en memoria** con clase TaskStore personalizada
- **Estado reactivo** con hooks de React optimizados
- **Componentes modulares** completamente reutilizables
- **Manejo de errores** robusto en cliente y servidor

### 📱 **Interfaz de Usuario**
- **Sidebar intuitivo** con navegación fluida y estadísticas en tiempo real
- **Dashboard con métricas** mostrando progreso y estados de tareas
- **Filtros dinámicos** (Todas, Pendientes, Completadas, Nueva Tarea)
- **Formularios interactivos** con validación inmediata
- **Diseño responsive** adaptable a cualquier dispositivo

---

## 🛠️ **Stack Tecnológico**

### **Frontend**
```json
{
  "framework": "Next.js 15.4.5",
  "ui-library": "React 19.1.0",
  "language": "TypeScript 5.x",
  "styling": "Tailwind CSS 4.0",
  "fonts": "Google Fonts (Roboto)"
}
```

### **Backend Integrado**
```json
{
  "api": "Next.js API Routes",
  "data-store": "In-Memory TaskStore Class",
  "validation": "TypeScript Interfaces",
  "error-handling": "Try-Catch + Custom Responses"
}
```

### **Herramientas de Desarrollo**
```json
{
  "bundler": "Turbopack (Next.js)",
  "linting": "ESLint 9.x",
  "type-checking": "TypeScript Compiler",
  "dev-server": "Next.js Dev Server"
}
```

---

## 📁 **Arquitectura del Proyecto**

```
Front-Back-Next/
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── api/tasks/               # API Backend
│   │   │   ├── route.ts             # GET, POST /api/tasks
│   │   │   └── [id]/route.ts        # PUT, DELETE /api/tasks/:id
│   │   ├── globals.css              # 367 líneas de CSS avanzado
│   │   ├── layout.tsx               # Layout principal con metadata
│   │   └── page.tsx                 # Página principal (265 líneas)
│   ├── components/                   # Componentes React
│   │   ├── Sidebar.tsx              # Navegación + Dashboard (151 líneas)
│   │   ├── TaskCard.tsx             # Tarjeta individual de tarea
│   │   ├── TaskForm.tsx             # Formulario crear/editar
│   │   ├── TaskItem.tsx             # Item de lista básico
│   │   └── TaskList.tsx             # Contenedor de tareas
│   ├── services/                     # Servicios de API
│   │   └── taskService.ts           # Cliente HTTP para API
│   ├── types/                        # Definiciones TypeScript
│   │   └── task.ts                  # Interfaces y tipos (26 líneas)
│   └── lib/                         # Utilidades y stores
│       └── taskStore.ts             # Almacenamiento en memoria (84 líneas)
├── public/                          # Assets estáticos
├── package.json                     # 16 dependencias + scripts
└── README.md                        # Esta documentación
```
## 🚀 **Instalación y Ejecución**

### **Prerrequisitos**
- Node.js 18+ 
- npm o pnpm
- Git

### **Pasos de instalación**
```bash
# 1. Clonar el repositorio
git clone https://github.com/Voyager-Ov/Academia_ForIT.git
cd Academia_ForIT/Front-Back-Next

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

### **Scripts disponibles**
```bash
npm run dev     # Servidor de desarrollo con Turbopack
npm run build   # Build de producción
npm run start   # Servidor de producción
npm run lint    # Análisis de código con ESLint
```

**🌐 La aplicación estará disponible en:** `http://localhost:3000`

---

## 📡 **API REST Completa**

### **Endpoints disponibles**

| Método | Endpoint | Descripción | Payload |
|--------|----------|-------------|---------|
| `GET` | `/api/tasks` | Obtener todas las tareas | - |
| `POST` | `/api/tasks` | Crear nueva tarea | `{title, description?}` |
| `PUT` | `/api/tasks/:id` | Actualizar tarea | `{title?, description?, completed?}` |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea | - |

### **Modelo de datos TypeScript**
```typescript
interface Task {
  id: string;                 // UUID generado automáticamente
  title: string;              // Título de la tarea (requerido)
  description: string;        // Descripción opcional
  completed: boolean;         // Estado de completado
  createdAt: Date;           // Timestamp de creación
}

interface ApiResponse<T> {
  success: boolean;           // Indicador de éxito
  data?: T;                  // Datos de respuesta
  message?: string;          // Mensaje de error/éxito
  error?: string;            // Detalles del error
}
```

### **Ejemplos de uso**

**Crear una tarea:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudiar Next.js", "description": "Aprender App Router"}'
```

**Marcar como completada:**
```bash
curl -X PUT http://localhost:3000/api/tasks/123 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

---

## 🎨 **Diseño y Experiencia Visual**

### **🌙 Tema Oscuro Avanzado**
- **Paleta HSL personalizada** con 10+ colores cuidadosamente seleccionados
- **Variables CSS** para consistencia en toda la aplicación
- **Contraste optimizado** para accesibilidad máxima

### **🎭 Efectos Visuales**
- **Fondo animado** con 2 esferas flotantes que se mueven en patrones fluidos
- **Glass-morphism** en tarjetas con backdrop-filter y transparencias
- **Hover effects** sutiles con transformaciones 3D
- **Transiciones CSS** de 200-500ms para fluidez premium

### **📱 Design System**
- **Componentes reutilizables** con props tipadas
- **Espaciado consistente** usando sistema de 8px
- **Tipografía escalable** con Roboto en 4 pesos diferentes
- **Estados interactivos** claros (hover, active, focus)

### **🎯 UX Destacada**
- **Navegación intuitiva** con sidebar fijo y states activos
- **Feedback inmediato** en todas las interacciones
- **Loading states** para operaciones async
- **Error handling** visual con mensajes contextuales

---

## ⚡ **Funcionalidades Implementadas**

### **📝 Gestión de Tareas**
- [x] **CRUD completo** con validaciones
- [x] **Estados de tarea** (pendiente, completada)
- [x] **Filtros dinámicos** por estado
- [x] **Búsqueda y ordenamiento** por fecha
- [x] **Persistencia temporal** en memoria

### **📊 Dashboard y Analytics**
- [x] **Métricas en tiempo real** (total, pendientes, completadas)
- [x] **Barra de progreso** animada con porcentajes
- [x] **Contadores dinámicos** que se actualizan automáticamente
- [x] **Estados visuales** diferenciados por categoría

### **🎨 Interfaz Avanzada**
- [x] **Sidebar responsivo** con navegación fluida
- [x] **Formularios reactivos** con validación en tiempo real
- [x] **Animaciones CSS** personalizadas
- [x] **Tema oscuro** consistente en toda la app
- [x] **Efectos hover** y micro-interacciones

### **🏗️ Arquitectura Técnica**
- [x] **TypeScript 100%** con interfaces robustas
- [x] **Componentes modulares** reutilizables
- [x] **API REST** con manejo de errores
- [x] **Estado local** optimizado con React hooks
- [x] **Build optimizado** con Turbopack

---

## 🎯 **Decisiones Técnicas Destacadas**

### **¿Por qué Next.js 15?**
- **App Router** para arquitectura moderna y rendimiento superior
- **API Routes integradas** eliminando necesidad de servidor separado
- **React Server Components** para optimización automática
- **Turbopack** para velocidad de desarrollo extrema

### **¿Por qué TypeScript completo?**
- **Type safety** en tiempo de desarrollo y build
- **IntelliSense mejorado** para productividad máxima
- **Refactoring seguro** con detección automática de errores
- **Documentación viviente** a través de tipos

### **¿Por qué esta arquitectura de componentes?**
- **Separación de responsabilidades** clara
- **Reutilización** máxima de código
- **Testing** facilitado por modularidad
- **Mantenimiento** simplificado a largo plazo

---

## 🔮 **Roadmap de Mejoras**

### **🎯 Corto plazo**
- [ ] **Persistencia con SQLite** o PostgreSQL
- [ ] **Tests unitarios** con Jest + Testing Library
- [ ] **Storybook** para documentación de componentes
- [ ] **Deploy en Vercel** con CI/CD

### **🚀 Mediano plazo**
- [ ] **Autenticación** con NextAuth.js
- [ ] **Real-time updates** con WebSockets
- [ ] **PWA** con service workers
- [ ] **Internacionalización** (i18n)

### **💫 Largo plazo**
- [ ] **Offline support** con IndexedDB
- [ ] **Colaboración** multi-usuario
- [ ] **Integración con APIs** externas
- [ ] **Analytics** y métricas de uso

---

## 🏆 **¿Por qué este proyecto destaca para Academia ForIT?**

### **🎯 Demuestra competencias clave:**

1. **💻 Desarrollo Full-Stack Moderno**
   - Manejo avanzado de Next.js 15 y React 19
   - Arquitectura API REST bien estructurada
   - TypeScript con tipado fuerte y completo

2. **🎨 Capacidades de Diseño UX/UI**
   - Diseño dark theme sofisticado y profesional
   - Animaciones CSS avanzadas y micro-interacciones
   - Experiencia de usuario fluida e intuitiva

3. **🏗️ Arquitectura y Buenas Prácticas**
   - Código limpio, modular y reutilizable
   - Separación clara de responsabilidades
   - Manejo de errores robusto y completo

4. **🚀 Tecnologías de Vanguardia**
   - Stack moderno con herramientas de última generación
   - Optimizaciones de rendimiento implementadas
   - Configuración profesional de desarrollo

5. **📚 Capacidad de Aprendizaje**
   - Dominio rápido de tecnologías complejas
   - Implementación de patrones avanzados
   - Atención al detalle en cada aspecto

---

## 👨‍💻 **Sobre el Desarrollo**

**🎯 Enfoque:** Este proyecto fue desarrollado con el objetivo de demostrar competencias técnicas avanzadas y capacidad para crear aplicaciones modernas y profesionales.

**⏱️ Tiempo de desarrollo:** Aproximadamente 20 horas de desarrollo intensivo y enfocado

**🎯 Diferenciación de proyectos:**
- **Front-Back-Next/**: Mi proyecto **PRINCIPAL** - aplicación profesional completa
- **Front/** y **Back/**: Proyectos de **aprendizaje** para entender arquitecturas separadas

**🧠 Aprendizajes clave:**
- Dominio completo del ecosistema Next.js 15
- Implementación de diseño UX/UI avanzado
- Arquitectura full-stack integrada
- TypeScript en aplicaciones complejas

---

**Desarrollado con ❤️ para Academia ForIT 2025**

> **💡 Este proyecto (Front-Back-Next) representa mi mejor trabajo técnico y es el ÚNICO que me gustaría que evalúen para mi ingreso a Academia ForIT. Los otros proyectos son solo ejercicios de aprendizaje. Este demuestra mi pasión por el desarrollo, atención al detalle y capacidad para crear aplicaciones modernas y profesionales con dedicación completa.**

---
