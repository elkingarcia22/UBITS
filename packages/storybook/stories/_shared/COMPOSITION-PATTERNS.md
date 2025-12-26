# 🧩 Patrones de Composición UBITS

Esta guía explica cómo componer componentes UBITS usando el sistema de contratos para AutoRun/Cursor.

## 📋 Tabla de Contenidos

1. [Conceptos Básicos](#conceptos-básicos)
2. [Dependencias Requeridas vs Opcionales](#dependencias-requeridas-vs-opcionales)
3. [Uso de Slots](#uso-de-slots)
4. [Componentes Internos](#componentes-internos)
5. [Ejemplos Prácticos](#ejemplos-prácticos)
6. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Conceptos Básicos

### ¿Qué es un Contrato UBITS?

Un contrato UBITS es la especificación completa de un componente que incluye:
- **componentId**: Identificador único (ej: `🧩-ux-button`)
- **api**: Cómo crear el componente (create, tag)
- **dependsOn**: Qué componentes necesita
- **slots**: Dónde se pueden insertar otros componentes
- **internals**: Componentes privados que NO debes re-implementar
- **tokensUsed**: Tokens CSS que usa
- **rules**: Reglas de validación

### ¿Por qué es importante?

El contrato permite a AutoRun/Cursor:
- ✅ Entender qué componentes necesita
- ✅ Saber dónde insertar componentes hijos
- ✅ Evitar re-implementar componentes internos
- ✅ Validar que se usan tokens correctos

---

## 🔗 Dependencias Requeridas vs Opcionales

### `dependsOn.required`

**Componentes que DEBES incluir** para que el componente funcione.

**Ejemplo: Modal**
```typescript
dependsOn: {
  required: ['🧩-ux-button'], // Footer buttons son requeridos
}
```

**Implementación:**
```typescript
// ✅ CORRECTO: Incluir Button en el footer
const modal = window.UBITS.Modal.create({
  title: 'Confirmar',
  footerButtons: {
    primary: {
      label: 'Confirmar',
      onClick: () => {},
    },
  },
});

// ❌ INCORRECTO: Modal sin buttons (aunque funcione, no sigue el contrato)
const modal = window.UBITS.Modal.create({
  title: 'Confirmar',
  // Sin footerButtons
});
```

### `dependsOn.optional`

**Componentes que PUEDES incluir** para mejorar la funcionalidad.

**Ejemplo: Button**
```typescript
dependsOn: {
  optional: ['🧩-ux-icon', '🧩-ux-tooltip'],
}
```

**Implementación:**
```typescript
// ✅ CORRECTO: Button con icono opcional
const button = window.UBITS.Button.create({
  variant: 'primary',
  text: 'Guardar',
  icon: 'save', // Opcional
});

// ✅ TAMBIÉN CORRECTO: Button sin icono
const button = window.UBITS.Button.create({
  variant: 'primary',
  text: 'Guardar',
  // Sin icono
});
```

---

## 🎰 Uso de Slots

Los **slots** son lugares donde puedes insertar componentes hijos.

### Estructura de Slots

```typescript
slots: {
  header: ['🧩-ux-button', '🧩-ux-input'], // Header acepta Button o Input
  body: [], // Body no acepta componentes externos
  footer: ['🧩-ux-button'], // Footer acepta Button
}
```

### Ejemplo: DataTable

```typescript
// DataTable tiene slots para header y footer
slots: {
  header: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-search-button'],
  footer: ['🧩-ux-pagination'],
}
```

**Implementación:**
```typescript
const dataTable = window.UBITS.DataTable.create({
  columns: [...],
  rows: [...],
  header: {
    // ✅ CORRECTO: Usar Button en header
    buttons: [
      {
        variant: 'primary',
        text: 'Nuevo',
        onClick: () => {},
      },
    ],
    // ✅ CORRECTO: Usar Input para búsqueda
    searchInput: {
      placeholder: 'Buscar...',
    },
  },
  footer: {
    // ✅ CORRECTO: Usar Pagination en footer
    pagination: {
      currentPage: 1,
      totalPages: 10,
    },
  },
});
```

### ❌ Errores Comunes

```typescript
// ❌ INCORRECTO: Usar componente no permitido en slot
const dataTable = window.UBITS.DataTable.create({
  header: {
    // Modal NO está en la lista de slots permitidos
    modal: { ... }, // ❌ ERROR
  },
});
```

---

## 🔒 Componentes Internos

Los **internals** son componentes privados que el componente usa internamente y **NO debes re-implementar**.

### Ejemplo: Modal

```typescript
internals: [
  '⚙️-functional-scroll', // Scrollbar interno
  '⚙️-functional-overlay', // Overlay interno
]
```

**¿Qué significa esto?**

- ✅ **SÍ puedes usar** el componente Modal completo
- ❌ **NO debes crear** tu propio scrollbar o overlay para el modal
- ✅ El Modal ya incluye estos componentes internamente

**Implementación:**
```typescript
// ✅ CORRECTO: Usar Modal completo (incluye scroll y overlay)
const modal = window.UBITS.Modal.create({
  title: 'Título',
  bodyContent: '<p>Contenido largo...</p>', // El scroll es automático
});

// ❌ INCORRECTO: Intentar agregar scroll manualmente
const modal = window.UBITS.Modal.create({
  title: 'Título',
  bodyContent: '<div class="custom-scroll">...</div>', // ❌ No necesario
});
```

### Identificadores de Internals

Los internals usan el prefijo `⚙️-functional-`:
- `⚙️-functional-scroll`: Scrollbar interno
- `⚙️-functional-overlay`: Overlay interno
- `⚙️-functional-dropdown`: Dropdown interno
- `⚙️-functional-calendar`: Calendar picker interno

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Formulario Simple

**Componentes necesarios:**
- Input (no depende de nada)
- Button (no depende de nada)

**Implementación:**
```typescript
// Crear Input
const input = window.UBITS.Input.create({
  containerId: 'email-input',
  label: 'Email',
  type: 'email',
  placeholder: 'tu@email.com',
});

// Crear Button
const button = window.UBITS.Button.create({
  variant: 'primary',
  text: 'Enviar',
  onClick: () => {
    // Lógica de envío
  },
});
```

### Ejemplo 2: Modal con Formulario

**Componentes necesarios:**
- Modal (requiere Button para footer)
- Input (opcional, para el formulario)
- Button (requerido por Modal)

**Implementación:**
```typescript
// Crear Input para el formulario
const input = window.UBITS.Input.create({
  containerId: 'modal-input',
  label: 'Nombre',
  type: 'text',
});

// Crear Modal con Button en footer (REQUERIDO)
const modal = window.UBITS.Modal.create({
  title: 'Crear Usuario',
  bodyContent: document.getElementById('modal-input').outerHTML,
  footerButtons: {
    // ✅ Button es REQUERIDO en footer
    primary: {
      label: 'Guardar',
      onClick: () => {
        // Lógica de guardado
      },
    },
    secondary: {
      label: 'Cancelar',
      onClick: () => {
        modal.close();
      },
    },
  },
});
```

### Ejemplo 3: DataTable Completo

**Componentes necesarios:**
- DataTable (requiere Button, Input opcionales)
- Button (para header)
- Input (opcional, para búsqueda)
- Pagination (opcional, para footer)

**Implementación:**
```typescript
const dataTable = window.UBITS.DataTable.create({
  columns: [
    { id: 'name', label: 'Nombre' },
    { id: 'email', label: 'Email' },
  ],
  rows: [
    { id: '1', name: 'Juan', email: 'juan@example.com' },
    { id: '2', name: 'María', email: 'maria@example.com' },
  ],
  // ✅ Slots: header acepta Button, Input, SearchButton
  header: {
    buttons: [
      {
        variant: 'primary',
        text: 'Nuevo',
        onClick: () => {},
      },
    ],
    // ✅ Input opcional para búsqueda
    searchInput: {
      placeholder: 'Buscar...',
    },
  },
  // ✅ Slot: footer acepta Pagination
  footer: {
    pagination: {
      currentPage: 1,
      totalPages: 10,
      onPageChange: (page) => {},
    },
  },
});
```

---

## ✅ Mejores Prácticas

### 1. Siempre Revisa el Contrato

Antes de usar un componente, revisa su contrato en Storybook:
- ¿Qué componentes requiere?
- ¿Qué slots tiene disponibles?
- ¿Qué componentes internos usa?

### 2. Respeta las Dependencias Requeridas

Si un componente requiere otro, **siempre inclúyelo**:
```typescript
// ✅ SIEMPRE incluir dependencias requeridas
const modal = window.UBITS.Modal.create({
  footerButtons: { ... }, // ✅ REQUERIDO
});
```

### 3. Usa Slots Correctamente

Solo inserta componentes permitidos en cada slot:
```typescript
// ✅ Verificar qué componentes acepta cada slot
slots: {
  header: ['🧩-ux-button'], // Solo Button
}
```

### 4. No Re-implementes Internals

Si un componente tiene internals, no intentes re-implementarlos:
```typescript
// ❌ NO crear tu propio scroll para Modal
// ✅ El Modal ya incluye scroll internamente
```

### 5. Usa Tokens, No Colores Hardcodeados

Siempre usa tokens del contrato:
```typescript
// ❌ INCORRECTO
color: '#000000';

// ✅ CORRECTO
color: 'var(--modifiers-normal-color-light-fg-1-high)';
```

### 6. Valida Props Requeridas

Asegúrate de incluir todas las props requeridas:
```typescript
rules: {
  requiredProps: ['variant', 'text'],
}

// ✅ SIEMPRE incluir props requeridas
const button = window.UBITS.Button.create({
  variant: 'primary', // ✅ REQUERIDO
  text: 'Click me', // ✅ REQUERIDO
});
```

---

## 🔍 Cómo Buscar Componentes

### Por ComponentId

```typescript
import { findComponentById } from './componentIndex';

const buttonInfo = findComponentById('🧩-ux-button');
console.log(buttonInfo.contract);
```

### Por Categoría

```typescript
import { findComponentsByCategory } from './componentIndex';

const basicComponents = findComponentsByCategory('Básicos');
```

### Por Dependencia

```typescript
import { findComponentsThatDependOn } from './componentIndex';

// Encontrar todos los componentes que usan Button
const componentsUsingButton = findComponentsThatDependOn('🧩-ux-button');
```

---

## 📚 Recursos Adicionales

- [Análisis Completo Storybook](./ANALISIS-COMPLETO-STORYBOOK-AUTORUN.md)
- [Índice de Componentes](./componentIndex.ts)
- [Contrato UBITS](./ubitsContract.ts)

---

**Última actualización:** Diciembre 2024
