# 📘 Guía de Implementación desde Storybook para Autorun

Esta guía documenta cómo otra IA puede implementar componentes UBITS desde Storybook de manera determinística.

## 🎯 Estructura de Componentes en Storybook

Todos los componentes UBITS en Storybook siguen una estructura estándar que permite implementación automática:

### 1. Story "Implementation (Copy/Paste)"

Cada componente tiene una story canónica llamada **"Implementation (Copy/Paste)"** que contiene:

- **Código exacto y funcional** en `parameters.docs.source.code`
- **Args explícitos** (no depende de defaults)
- **Estado estable** (sin datos aleatorios)
- **Snippet copiable** listo para usar

**Ejemplo de estructura:**
```typescript
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    // Args explícitos aquí
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="component-implementation-container"></div>

// 2. Crear componente
window.UBITS.Component.create({
  // Configuración completa
});`
      }
    }
  }
}
```

### 2. Contrato UBITS (`parameters.ubits`)

Cada componente incluye un contrato completo con:

#### Campos Principales:
- **`componentId`**: ID único del componente (ej: `'🧩-ux-button'`)
- **`api.create`**: Función de creación (ej: `'window.UBITS.Button.create'`)
- **`api.tag`**: Tag HTML si aplica (ej: `'<ubits-button>'`)

#### Dependencias:
- **`dependsOn.required`**: Componentes que DEBES implementar primero
- **`dependsOn.optional`**: Componentes opcionales que puedes usar

#### Ejemplos de Código:
- **`examples.canonical`**: Ejemplo canónico completo
- **`examples.basic`**: Ejemplo básico
- **`examples.*`**: Otros ejemplos específicos

#### Variantes y Eventos:
- **`variants`**: Todas las variantes disponibles por propiedad
- **`events`**: Eventos que emite el componente

#### Storybook Mapping:
- **`storybook.canonicalStoryId`**: ID de la story canónica
- **`storybook.storiesByExample`**: Mapeo de ejemplos a stories

### 3. Documentación en `parameters.docs.description.component`

Cada componente tiene documentación completa con:
- Descripción del componente
- Ejemplo de código en markdown
- Notas de uso

## 🔍 Cómo Obtener Información de un Componente

### Paso 1: Acceder a Storybook

1. Iniciar Storybook: `npm run storybook`
2. Navegar a: `http://localhost:6006`
3. Buscar el componente en el sidebar

### Paso 2: Obtener el Contrato UBITS

El contrato está disponible en:
- **Storybook UI**: Panel "Docs" → Sección "Parameters" → `ubits`
- **Código fuente**: `packages/storybook/stories/components/[Component]/[Component].stories.ts`
- **API JSON**: `http://localhost:6006/index.json` → buscar story → `parameters.ubits`

### Paso 3: Obtener el Código de Implementación

1. Ir a la story **"Implementation (Copy/Paste)"**
2. El código está en el panel de código (automáticamente visible)
3. También disponible en: `parameters.docs.source.code`

## 📋 Checklist para Implementación

Antes de implementar un componente, verifica:

- [ ] ✅ Story "Implementation (Copy/Paste)" existe
- [ ] ✅ Contrato UBITS completo (`parameters.ubits`)
- [ ] ✅ `examples.canonical` definido
- [ ] ✅ `dependsOn.required` identificado
- [ ] ✅ `tokensUsed` listado
- [ ] ✅ `variants` documentados
- [ ] ✅ `events` documentados

## 🎨 Estructura de Ejemplos

Los ejemplos siguen este formato:

```javascript
// 1. Crear contenedor HTML
<div id="component-implementation-container"></div>

// 2. Crear componente
window.UBITS.Component.create({
  // Propiedades requeridas
  requiredProp: 'value',
  // Propiedades opcionales
  optionalProp: 'value'
});

// 3. (Opcional) Agregar al DOM
const container = document.getElementById('component-implementation-container');
if (container) {
  container.appendChild(componentElement);
}
```

## 🔗 Dependencias entre Componentes

### Componentes Requeridos (`dependsOn.required`)

Estos componentes DEBEN implementarse antes:

```typescript
dependsOn: {
  required: [
    '🧩-ux-button',  // Siempre requerido
    '🧩-ux-input'    // Requerido para este componente
  ]
}
```

### Componentes Opcionales (`dependsOn.optional`)

Estos pueden usarse pero no son obligatorios:

```typescript
dependsOn: {
  optional: [
    '🧩-ux-checkbox',
    '🧩-ux-avatar'
  ]
}
```

## 🎯 Tokens UBITS

Todos los componentes usan tokens CSS en lugar de colores hardcodeados:

```css
/* ❌ INCORRECTO */
color: #000000;
background: white;

/* ✅ CORRECTO */
color: var(--modifiers-normal-color-light-fg-1-high);
background: var(--modifiers-normal-color-light-bg-1);
```

Los tokens usados están listados en `tokensUsed` del contrato.

## 📝 Ejemplo Completo: Implementar Button

### 1. Obtener Contrato

```typescript
// Desde Storybook
const buttonContract = {
  componentId: '🧩-ux-button',
  api: {
    create: 'window.UBITS.Button.create',
    tag: '<ubits-button>'
  },
  examples: {
    canonical: 'window.UBITS.Button.create({ variant: "primary", size: "md", text: "Click me" });'
  }
}
```

### 2. Verificar Dependencias

```typescript
dependsOn: {
  required: [], // Button no tiene dependencias
  optional: []
}
```

### 3. Implementar

```javascript
// Usar el ejemplo canónico
const button = window.UBITS.Button.create({
  variant: 'primary',
  size: 'md',
  text: 'Click me'
});

// Agregar al DOM
document.getElementById('container').appendChild(button);
```

## 🚀 Componentes Disponibles

Todos los componentes están en:
- **Ubicación**: `packages/storybook/stories/components/[Component]/[Component].stories.ts`
- **Storybook**: `http://localhost:6006` → Navegar por categorías

### Categorías de Componentes:

- **Básicos**: Button, Badge, Chip, Avatar, etc.
- **Formularios**: Input, Checkbox, RadioButton, Toggle, etc.
- **Layout**: Card, Accordion, Carousel, Gallery, etc.
- **Navegación**: Sidebar, TabBar, Tabs, Breadcrumb, etc.
- **Feedback**: Alert, Toast, Modal, Tooltip, etc.
- **Data**: DataTable, DataView, Pagination, etc.
- **Charts**: MetricCard, ProgressBar, etc.

## 🔧 Herramientas de Ayuda

### 1. Helper `createUBITSContract`

Ubicado en: `packages/storybook/stories/_shared/ubitsContract.ts`

Ayuda a crear contratos estándar:

```typescript
import { createUBITSContract } from '../../_shared/ubitsContract';

const contract = createUBITSContract({
  componentId: '🧩-ux-button',
  api: { create: 'window.UBITS.Button.create' },
  examples: { canonical: '...' }
});
```

### 2. Helper `createExactSnippet`

Genera snippets exactos de código:

```typescript
import { createExactSnippet } from '../../_shared/ubitsContract';

const snippet = createExactSnippet('Button', {
  variant: 'primary',
  size: 'md',
  text: 'Click me'
}, 'create');
```

## ⚠️ Reglas de Validación

Todos los componentes tienen reglas de validación:

```typescript
rules: {
  forbidHardcodedColors: true,
  forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
  requiredProps: ['text', 'variant']
}
```

**NUNCA uses:**
- Colores hardcodeados (`#000`, `rgb()`, etc.)
- Clases de tipografía incorrectas
- Componentes custom (usa siempre componentes UBITS oficiales)

## 📚 Recursos Adicionales

1. **Tokens UBITS**: Ver stories en `Tokens UBITS/`
2. **Templates**: Ver stories en `Templates/`
3. **Ejemplos de Uso**: Cada componente tiene múltiples stories con ejemplos

## 🎯 Flujo de Trabajo Recomendado

1. **Identificar componente** necesario
2. **Buscar en Storybook** → Story "Implementation (Copy/Paste)"
3. **Leer contrato UBITS** → `parameters.ubits`
4. **Verificar dependencias** → `dependsOn.required`
5. **Implementar dependencias** primero (si las hay)
6. **Copiar código canónico** → `examples.canonical`
7. **Adaptar a necesidades** específicas
8. **Validar tokens** → Usar solo tokens de `tokensUsed`

## ✅ Verificación Final

Antes de considerar la implementación completa:

- [ ] Código copiado de `examples.canonical`
- [ ] Todas las dependencias requeridas implementadas
- [ ] Solo tokens UBITS usados (sin colores hardcodeados)
- [ ] Componente renderiza correctamente
- [ ] Eventos funcionan (si aplica)
- [ ] Variantes probadas (si aplica)

---

**Última actualización**: Componentes verificados y listos para implementación automática desde Storybook.

