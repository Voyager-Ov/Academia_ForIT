# 📋 Lista de Tareas - Challenge Academia ForIT

Una aplicación full-stack de gestión de tareas desarrollada con múltiples tecnologías, creada como parte del challenge de ingreso a la Academia ForIT 2025.

## 🚀 Implementaciones Disponibles

Este repositorio contiene **tres implementaciones diferentes** de la misma aplicación, demostrando versatilidad en el desarrollo full-stack:

### � **Versión Principal - Next.js (Recomendada)**
**📁 Carpeta: `Front-Back-Next/`**
- ⚡ **Next.js 15** con App Router y TypeScript
- 🎨 **Modo oscuro sofisticado** con animaciones
- � **Fuente Roboto** y efectos visuales avanzados
- 🔄 **Full-stack integrado** (Frontend + API)
- 📱 **Diseño responsivo** y sidebar rediseñado
- 🎯 **TypeScript** para mayor robustez

### 🔄 **Versión React + Express (Separada)**
**📁 Carpetas: `Front/` + `Back/`**
- ⚛️ **React 19** con Vite
- � **Express.js** como API separada
- 🎨 **CSS personalizado**
- 🔌 **Arquitectura desacoplada**

## 🎯 **¿Cuál Revisar?**

**Para evaluación rápida:** → `Front-Back-Next/` (Versión más completa y moderna)  
**Para arquitectura separada:** → `Front/` + `Back/` (Microservicios)

## 🛠️ Tecnologías Utilizadas

## 🛠️ Tecnologías Utilizadas

### 🌟 Next.js (Versión Principal)
- **Next.js 15** - Framework React full-stack
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de utilidades CSS
- **API Routes** - Backend integrado
- **App Router** - Sistema de enrutamiento moderno

### ⚛️ React + Express (Versión Separada)
#### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Manejo de políticas de origen cruzado
- **dotenv** - Gestión de variables de entorno

#### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **React Router** - Navegación SPA
- **CSS3** - Estilos personalizados
- **ESLint** - Linter de código

## 🚀 Características Comunes

- ✅ **CRUD completo**: Crear, leer, actualizar y eliminar tareas
- 🎯 **API REST** con endpoints específicos
- 🎨 **Interfaz intuitiva** y moderna
- 📱 **Diseño responsivo** para móviles y desktop
- 🔄 **Estado en tiempo real** 
- 🗂️ **Filtros** para tareas completadas/pendientes
- ⚠️ **Manejo de errores** y validaciones
- 🌐 **Variables de entorno** configurables

## 📁 Estructura del Proyecto

```
Academia_ForIT/
├── Front-Back-Next/         # 🌟 VERSIÓN PRINCIPAL (Next.js)
│   ├── src/
│   │   ├── app/            # App Router de Next.js
│   │   │   ├── api/        # API Routes (Backend integrado)
│   │   │   ├── globals.css # Estilos globales (tema oscuro)
│   │   │   ├── layout.tsx  # Layout principal
│   │   │   └── page.tsx    # Página principal
│   │   ├── components/     # Componentes React
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── services/       # Servicios API
│   │   ├── types/          # Definiciones TypeScript
│   │   └── lib/           # Utilidades
│   ├── package.json
│   └── .env.local
├── Back/                   # Backend (Express) - Versión separada
│   ├── server.js           # Servidor Express
│   ├── package.json        # Dependencias del backend
│   ├── .env                # Variables de entorno
│   └── .eslintrc.js        # Configuración ESLint
├── Front/                  # Frontend (React) - Versión separada
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Punto de entrada
│   ├── package.json        # Dependencias del frontend
│   └── .env                # Variables de entorno
└── README.md              # Este archivo
```

## 🔧 Instalación y Configuración

### 🌟 Opción 1: Next.js (Recomendada)

```bash
cd Front-Back-Next
npm install
```

Crear archivo `.env.local`:
```env
# Configuración automática para Next.js
NODE_ENV=development
```

**Ejecutar:**
```bash
npm run dev
```
Aplicación disponible en: `http://localhost:3000`

### ⚛️ Opción 2: React + Express (Separada)

### ⚛️ Opción 2: React + Express (Separada)

#### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

#### 1. Clonar el repositorio
```bash
git clone https://github.com/Voyager-Ov/Academia_ForIT.git
cd Academia_ForIT
```

#### 2. Configurar el Backend
```bash
cd Back
npm install
```

Crear archivo `.env` en la carpeta `Back`:
```env
PORT=3001
NODE_ENV=development
```

#### 3. Configurar el Frontend
```bash
cd ../Front
npm install
```

Crear archivo `.env` en la carpeta `Front`:
```env
VITE_API_URL=http://localhost:3001/api
```

## 🚀 Ejecución

### 🌟 Next.js (Un solo comando)
```bash
cd Front-Back-Next
npm run dev
```

### ⚛️ React + Express (Dos terminales)

**Terminal 1 - Backend:**
```bash
cd Back
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Front
npm run dev
```

## 📡 API Endpoints

Ambas versiones exponen los mismos endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Obtener todas las tareas |
| `POST` | `/api/tasks` | Crear una nueva tarea |
| `PUT` | `/api/tasks/:id` | Actualizar una tarea existente |
| `DELETE` | `/api/tasks/:id` | Eliminar una tarea |

### Estructura de una Tarea
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}
```

## 🎨 Comparación de Versiones

| Característica | Next.js | React + Express |
|----------------|---------|-----------------|
| **Arquitectura** | Monolítica integrada | Microservicios separados |
| **Tipado** | TypeScript | JavaScript |
| **Estilos** | Tema oscuro avanzado | CSS básico |
| **Deployment** | Un solo servicio | Dos servicios |
| **Desarrollo** | Un comando | Dos comandos |
| **Complejidad** | Media | Baja |
| **Escalabilidad** | Alta | Muy Alta |

## ✅ Funcionalidades Implementadas

### 🌟 Next.js (Versión Principal)
- [x] ✅ **Full-stack integrado** con App Router
- [x] 🎨 **Tema oscuro sofisticado** con animaciones
- [x] 📱 **Sidebar rediseñado** y navegación mejorada
- [x] 🎭 **Fuente Roboto** y efectos visuales
- [x] 🔧 **TypeScript** completo
- [x] 🚀 **API Routes** de Next.js
- [x] 🎯 **Componentes avanzados**

### ⚛️ React + Express (Versión Separada)
- [x] ✅ **CRUD completo** de tareas
- [x] 🗄️ **Almacenamiento en memoria** (array)
- [x] ⚠️ **Manejo básico de errores**
- [x] 🧩 **Componentes React funcionales**
- [x] 🎣 **Hooks de React** (useState, useEffect)
- [x] 🌐 **React Router** para navegación
- [x] 📞 **Llamadas API con fetch**
- [x] 🔧 **Variables de entorno**
- [x] 🎨 **CSS personalizado y responsivo**
- [x] 📋 **ESLint configurado**

## 🏗️ Decisiones Arquitectónicas

### 🤔 **¿Por qué dos versiones?**

1. **Next.js**: Demuestra conocimiento de frameworks modernos y full-stack
2. **React + Express**: Muestra comprensión de arquitectura separada y microservicios
3. **Versatilidad**: Evidencia adaptabilidad a diferentes stacks tecnológicos

### 🎯 **Recomendación para evaluación:**

**Comienza con:** `Front-Back-Next/` (Más completa y moderna)  
**Explora también:** `Front/` + `Back/` (Para entender arquitectura separada)

## 🔮 Mejoras Futuras

- [ ] 🗃️ **Persistencia con SQLite**
- [ ] 🔍 **Búsqueda de tareas**
- [ ] 📅 **Fechas de vencimiento**
- [ ] 🏷️ **Categorías y etiquetas**
- [ ] 🔔 **Notificaciones**
- [ ] 🔐 **Autenticación de usuarios**
- [ ] 🌐 **Deploy en producción**

---

**Desarrollado por:** Aspirante Academia ForIT  
**Challenge:** Academia ForIT 2025  
**Fecha:** Agosto 2025

> 💡 **Nota:** Este repositorio demuestra versatilidad tecnológica implementando la misma aplicación con diferentes stacks, evidenciando capacidad de adaptación y conocimiento de múltiples tecnologías modernas.

