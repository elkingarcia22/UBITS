# 🎨 UBITS Design System

Sistema de diseño completo para aplicaciones UBITS con componentes modulares, tokens, tipografía, templates y Storybook.

## 📋 Índice

- [Inicio Rápido](#-inicio-rápido)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Componentes](#-componentes)
- [Templates](#-templates)
- [Storybook](#-storybook)
- [Validación Automática](#-validación-automática)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentación](#-documentación)

---

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone https://github.com/elkingarcia22/UBITS.git
cd UBITS
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Inicializar Proyecto

```bash
npm run init
```

Este comando interactivo te guiará paso a paso:
- ✅ Solicita URL del repositorio GitHub
- ✅ Permite seleccionar perfil (Colaborador/Administrador)
- ✅ Configura el template automáticamente
- ✅ Inicializa Git y configura remoto
- ✅ Instala dependencias
- ✅ Configura auto-commit y validación

### 4. Iniciar Desarrollo

```bash
# Terminal 1: Auto-commit y validación
npm run watch

# Terminal 2: Iniciar servidor de desarrollo
npm run dev

# Terminal 3: Storybook (opcional)
npm run storybook
```

---

## ✨ Características

- 🎨 **Sistema de Diseño Completo**: Tokens, tipografía y componentes modulares
- 📦 **50+ Componentes**: Button, Sidebar, TabBar, Input, Alert, Toast, y más
- 📱 **Templates Listos**: Modo Colaborador y Administrador
- 📚 **Storybook Integrado**: Documentación interactiva de componentes
- ✅ **Validación Automática**: Asegura el uso correcto de tokens y componentes
- 🎯 **TypeScript**: Tipado completo para mejor DX
- 📦 **Monorepo**: Workspaces para organización modular

---

## 📁 Estructura del Proyecto

```
UBITS/
├── packages/
│   ├── components/          # Componentes UBITS
│   │   ├── button/
│   │   ├── sidebar/
│   │   ├── tabbar/
│   │   ├── input/
│   │   └── ...
│   ├── tokens/              # Tokens de diseño UBITS
│   ├── typography/           # Tipografía UBITS
│   ├── templates/            # Templates UBITS
│   │   ├── template-admin.html
│   │   ├── template-colaborador.html
│   │   └── ...
│   └── storybook/            # Storybook UBITS
│       ├── stories/
│       └── ...
├── scripts/
│   ├── validate-ubits.cjs    # Validación UBITS
│   ├── init-project.cjs      # Inicialización
│   └── ...
├── .ubits/                   # Sistema de validación
├── docs/                     # Documentación
├── package.json
└── README.md
```

---

## 🎨 Sistema de Diseño

### Tokens de Color

```css
/* Backgrounds */
--ubits-bg-1          /* Fondo principal */
--ubits-bg-2          /* Fondo secundario */
--ubits-bg-active     /* Fondo activo */

/* Foregrounds */
--ubits-fg-1-high     /* Texto principal */
--ubits-fg-1-medium   /* Texto secundario */
--ubits-fg-1-low      /* Texto terciario */

/* Accents */
--ubits-accent-brand  /* Color de marca */
--ubits-accent-blue   /* Azul */
--ubits-accent-green  /* Verde */
--ubits-accent-red    /* Rojo */

/* Borders */
--ubits-border-1      /* Borde principal */
--ubits-border-2      /* Borde secundario */
```

### Tokens de Tipografía

```css
/* Headings */
.ubits-heading-h1     /* Título principal */
.ubits-heading-h2     /* Título secundario */
.ubits-heading-h3     /* Título terciario */

/* Body */
.ubits-body-lg        /* Texto grande */
.ubits-body-md        /* Texto mediano */
.ubits-body-sm        /* Texto pequeño */
```

---

## 📦 Componentes

### Componentes Disponibles

- **Navegación**: Sidebar, TabBar, SubNav, Breadcrumb, Menu, Menubar
- **Formularios**: Button, Input, Checkbox, Radio, Select, File Upload, Toggle
- **Feedback**: Alert, Toast, Modal, Drawer, Popover, Tooltip
- **Datos**: Table, List, Card, Badge, Chip, Avatar
- **Indicadores**: Progress, Spinner, Skeleton, Status Tag
- **Layout**: Accordion, Tabs, Stepper, Segment Control
- **Otros**: Calendar, Carousel, Gallery, Pagination, Slider

### Uso de Componentes

```javascript
// Importar componente
import { createButton } from '@ubits/button';

// Crear instancia
const button = createButton({
  text: 'Click me',
  variant: 'primary',
  size: 'md'
});

// Renderizar
button.mount('#container');
```

---

## 📱 Templates

### Modo Colaborador

**Archivo**: `packages/templates/template-colaborador.html`

**Características**:
- Sidebar con módulos básicos
- Acceso a cursos y rutas de aprendizaje
- Perfil personal
- Vista de desempeño individual

**Módulos disponibles**:
- 📚 Aprendizaje
- 📊 Desempeño
- 🔍 Diagnóstico

### Modo Administrador

**Archivo**: `packages/templates/template-admin.html`

**Características**:
- Sidebar con módulos de administración
- Gestión de usuarios
- Evaluaciones 360°
- Análisis organizacional

**Módulos disponibles**:
- 🏠 Inicio
- 🏢 Empresa → Gestión de usuarios
- 📚 Aprendizaje → LMS
- 📊 Desempeño → Evaluaciones 360°
- 🔍 Diagnóstico
- 🔌 API
- ❓ Centro de ayuda

---

## 📚 Storybook

### Iniciar Storybook

```bash
npm run storybook
```

**⚠️ Importante:** Si es la primera vez o si hay problemas, consulta la [Guía Completa de Configuración](./packages/storybook/SETUP-STORYBOOK.md)

### Verificación Rápida

Antes de iniciar, puedes verificar que todo esté configurado:

```bash
cd packages/storybook
./verificar-setup.sh
```

### Build Estático

```bash
npm run build:storybook
```

### Configuración Requerida

Storybook requiere:
- ✅ Tokens generados (`npm run build:tokens`)
- ✅ Archivos de configuración en `.storybook/`
- ✅ Assets estáticos (imágenes y fuentes)
- ✅ CSS de componentes importados en `preview.ts`

**📖 Documentación completa:** [SETUP-STORYBOOK.md](./packages/storybook/SETUP-STORYBOOK.md)

Storybook incluye:
- Documentación de todos los componentes
- Ejemplos interactivos
- Variantes y estados
- Guías de uso

---

## ✅ Validación Automática

El sistema valida automáticamente:
- ✅ Uso correcto de tokens UBITS
- ✅ Clases de tipografía oficiales
- ✅ Componentes existentes
- ✅ Imports de CSS requeridos

### Comandos de Validación

```bash
# Validar archivos en staging
npm run validate

# Validar y corregir automáticamente
npm run validate:fix

# Validar todos los archivos
npm run validate:all

# Validar y corregir todos
npm run validate:all:fix
```

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build del proyecto
npm run build:tokens     # Build de tokens CSS

# Validación
npm run validate         # Validar staging
npm run validate:fix     # Validar y corregir
npm run validate:all     # Validar todo
npm run validate:all:fix # Validar y corregir todo

# Inicialización
npm run init             # Inicializar proyecto
npm run integrate:addons # Integrar add-ons

# Storybook
npm run storybook        # Iniciar Storybook
npm run build:storybook  # Build Storybook

# Linting
npm run lint             # Lint del código
npm run format           # Formatear código

# Despliegue
npm run deploy           # Desplegar proyecto
```

---

## 📖 Documentación

- [Guía Completa](./GUIA-COMPLETA.md) - Guía detallada del sistema
- [Prompt Inicial](./PROMPT-INICIAL.md) - Instrucciones para iniciar proyectos
- [Plan de Migración](./PLAN-MIGRACION-UBITS.md) - Detalles de la migración
- [Documentación Técnica](./docs/) - Documentación técnica detallada

---

## 🎯 Reglas de Diseño UBITS

### ❌ NUNCA hagas esto:

1. **NO uses colores hardcodeados:**
   ```css
   /* ❌ MAL */
   color: #000000;
   background: white;
   
   /* ✅ BIEN */
   color: var(--ubits-fg-1-high);
   background: var(--ubits-bg-1);
   ```

2. **NO uses clases de tipografía incorrectas:**
   ```html
   <!-- ❌ MAL -->
   <h1 class="ubits-h1">Título</h1>
   
   <!-- ✅ BIEN -->
   <h1 class="ubits-heading-h1">Título</h1>
   ```

3. **NO crees componentes custom:**
   ```html
   <!-- ❌ MAL -->
   <div class="mi-componente-personalizado">...</div>
   
   <!-- ✅ BIEN -->
   <button class="ubits-button ubits-button--primary">...</button>
   ```

### ✅ SIEMPRE haz esto:

1. **USA tokens de color**: `var(--ubits-*)`
2. **USA clases de tipografía oficiales**: `ubits-heading-*`, `ubits-body-*`
3. **USA componentes oficiales**: `ubits-sidebar`, `ubits-button`, etc.
4. **Importa CSS de componentes**: Siempre importa los estilos
5. **Valida tu código**: Ejecuta `npm run validate` antes de commit

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

ISC

---

## 🔗 Enlaces

- [Repositorio GitHub](https://github.com/elkingarcia22/UBITS)
- [Documentación Completa](./GUIA-COMPLETA.md)
- [Storybook](./packages/storybook)

---

**¿Necesitas ayuda?** Revisa la documentación en `GUIA-COMPLETA.md` o abre un issue en GitHub.


