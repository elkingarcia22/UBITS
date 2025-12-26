# 📊 Análisis Completo: Storybook para AutoRun/Cursor

## 🎯 Objetivo
Verificar que Storybook tenga toda la estructura y configuración necesaria para que AutoRun/Cursor pueda implementar componentes, subcomponentes, funcionalidades y subfuncionalidades de manera determinística.

---

## ✅ LO QUE YA TIENES (Bien Configurado)

### 1. **Configuración Base de Storybook**
- ✅ Framework: `@storybook/html-vite@^10.0.8`
- ✅ Addon de documentación: `@storybook/addon-docs@^10.0.8`
- ✅ Configuración de Vite personalizada con alias y plugins
- ✅ StaticDirs configurados para tokens, typography, components, templates
- ✅ Middleware personalizado para servir recursos

### 2. **Sistema de Contratos UBITS** ⭐
**Archivo:** `stories/_shared/ubitsContract.ts`

El sistema de contratos es **EXCELENTE** y proporciona:
- ✅ `componentId`: Identificador único del componente
- ✅ `api`: API de creación (create, tag)
- ✅ `dependsOn`: Dependencias requeridas y opcionales
- ✅ `internals`: Componentes internos privados
- ✅ `slots`: Slots disponibles y qué componentes aceptan
- ✅ `tokensUsed`: Lista de tokens CSS usados
- ✅ `rules`: Reglas de validación (colores hardcodeados, props requeridas)

**Ejemplo de uso en stories:**
```typescript
parameters: {
  ubits: createUBITSContract({
    componentId: '🧩-ux-button',
    api: {
      create: 'window.UBITS.Button.create',
      tag: '<ubits-button>',
    },
    dependsOn: {
      required: [],
      optional: ['🧩-ux-icon', '🧩-ux-tooltip'],
    },
    tokensUsed: ['--modifiers-normal-color-light-accent-brand'],
    rules: {
      forbidHardcodedColors: true,
      forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
      requiredProps: ['variant', 'text'],
    },
  }),
}
```

### 3. **Estructura de Stories**
- ✅ Stories organizadas por categorías (Básicos, Formularios, Feedback, Data, Navegación)
- ✅ Tags `autodocs` para documentación automática
- ✅ `argTypes` completos con descripciones y tipos
- ✅ `args` con valores por defecto
- ✅ Stories canónicas "Implementation" para copy/paste
- ✅ Múltiples variantes y casos de uso

### 4. **Preview Configuration**
- ✅ Imports de todos los CSS de componentes
- ✅ Tokens UBITS cargados
- ✅ Tipografía UBITS cargada
- ✅ FontAwesome Pro configurado
- ✅ Decorators para limpiar componentes flotantes entre stories
- ✅ Theme switcher (light/dark)
- ✅ Configuración de backgrounds según tema

### 5. **Documentación en Stories**
- ✅ Descripciones de componentes en `docs.description.component`
- ✅ Comentarios explicativos en código
- ✅ Ejemplos de uso en stories

---

## ⚠️ LO QUE FALTA (Mejoras Necesarias)

### 1. **Addons de Storybook Faltantes** 🔴 CRÍTICO

#### A. **@storybook/addon-controls** (Ya incluido en framework, pero no explícito)
**Estado:** ✅ Incluido implícitamente en Storybook 7+
**Acción:** No requiere instalación adicional

#### B. **@storybook/addon-actions** ⚠️ RECOMENDADO
**Propósito:** Capturar eventos y callbacks para documentación
**Beneficio para AutoRun:** Ver qué eventos emite cada componente
**Instalación:**
```bash
cd packages/storybook
npm install --save-dev @storybook/addon-actions
```

**Uso en `main.ts`:**
```typescript
addons: [
  getAbsolutePath('@storybook/addon-docs'),
  getAbsolutePath('@storybook/addon-actions'), // ← Agregar
]
```

**Uso en stories:**
```typescript
import { fn } from '@storybook/test';

args: {
  onClick: fn(), // En lugar de action('clicked')
}
```

#### C. **@storybook/addon-viewport** ⚠️ RECOMENDADO
**Propósito:** Probar componentes en diferentes tamaños de pantalla
**Beneficio para AutoRun:** Entender responsive design
**Instalación:**
```bash
npm install --save-dev @storybook/addon-viewport
```

#### D. **@storybook/addon-a11y** ⚠️ RECOMENDADO
**Propósito:** Testing de accesibilidad
**Beneficio para AutoRun:** Validar accesibilidad automáticamente
**Instalación:**
```bash
npm install --save-dev @storybook/addon-a11y
```

#### E. **@storybook/addon-interactions** ⚠️ OPCIONAL
**Propósito:** Testing interactivo de componentes
**Beneficio para AutoRun:** Probar interacciones complejas
**Instalación:**
```bash
npm install --save-dev @storybook/addon-interactions @storybook/test
```

### 2. **Mejoras en la Estructura de Stories**

#### A. **Falta Story "Play" para Interacciones** ⚠️
**Qué es:** Stories que ejecutan interacciones automáticamente
**Ejemplo:**
```typescript
export const InteractiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    // Verificar que el modal se abrió
  },
};
```

**Beneficio para AutoRun:** Ver cómo interactuar con componentes

#### B. **Falta Documentación MDX para Componentes Complejos** ⚠️
**Qué es:** Archivos `.mdx` con documentación detallada
**Ejemplo:** `stories/components/DataTable/DataTable.mdx`
**Beneficio para AutoRun:** Contexto completo sobre uso y casos de uso

#### C. **Falta Story "Accessibility" por Componente** ⚠️
**Qué es:** Story dedicada a mostrar accesibilidad
**Ejemplo:**
```typescript
export const Accessibility: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### 3. **Mejoras en el Contrato UBITS**

#### A. **Falta Campo `examples` en Contrato** ⚠️
**Propósito:** Ejemplos de código canónicos
**Sugerencia:**
```typescript
ubits: createUBITSContract({
  // ... campos existentes
  examples: {
    basic: createExactSnippet('Button', { variant: 'primary', text: 'Click me' }),
    withIcon: createExactSnippet('Button', { variant: 'primary', text: 'Save', icon: 'save' }),
  },
})
```

#### B. **Falta Campo `variants` en Contrato** ⚠️
**Propósito:** Lista de todas las variantes disponibles
**Sugerencia:**
```typescript
variants: {
  variant: ['primary', 'secondary', 'tertiary'],
  size: ['xs', 'sm', 'md', 'lg'],
  state: ['default', 'hover', 'active', 'disabled'],
}
```

#### C. **Falta Campo `events` en Contrato** ⚠️
**Propósito:** Eventos que emite el componente
**Sugerencia:**
```typescript
events: {
  onClick: { type: 'MouseEvent', description: 'Emitted when button is clicked' },
  onFocus: { type: 'FocusEvent', description: 'Emitted when button receives focus' },
}
```

### 4. **Falta Archivo de Índice de Componentes** 🔴 CRÍTICO

**Propósito:** Un archivo JSON/TS que liste todos los componentes con sus contratos
**Ubicación sugerida:** `stories/_shared/componentIndex.ts` o `componentIndex.json`

**Estructura sugerida:**
```typescript
export const UBITSComponentIndex = {
  '🧩-ux-button': {
    category: 'Básicos',
    title: 'Button',
    contract: { /* contrato completo */ },
    storyPath: 'stories/components/Button/Button.stories.ts',
    providerPath: 'components/button/src/ButtonProvider.ts',
  },
  // ... todos los componentes
};
```

**Beneficio para AutoRun:** Búsqueda rápida de componentes y sus contratos

### 5. **Falta Documentación de Patrones de Composición** ⚠️

**Propósito:** Documentar cómo componer componentes complejos
**Ubicación sugerida:** `stories/_shared/COMPOSITION-PATTERNS.md`

**Contenido sugerido:**
- Cómo usar `dependsOn.required` vs `dependsOn.optional`
- Cómo usar `slots`
- Cómo usar `internals` (qué NO implementar)
- Ejemplos de composición (DataTable con Button, Input, etc.)

### 6. **Falta Validación Automática de Contratos** ⚠️

**Propósito:** Script que valide que todos los componentes tengan contratos completos
**Ubicación sugerida:** `scripts/validate-storybook-contracts.cjs`

**Validaciones:**
- Todos los componentes tienen `parameters.ubits`
- Todos los `componentId` son únicos
- Todas las dependencias existen
- Todos los tokens usados existen en tokens.json

---

## 📋 PLAN DE ACCIÓN RECOMENDADO

### Prioridad ALTA 🔴

1. **Crear Índice de Componentes**
   - Archivo `stories/_shared/componentIndex.ts`
   - Exportar todos los componentes con sus contratos
   - Usar en scripts de validación

2. **Agregar Addon Actions**
   - Instalar `@storybook/addon-actions`
   - Actualizar stories para usar `fn()` en lugar de `action()`
   - Documentar eventos en contratos

3. **Mejorar Contratos UBITS**
   - Agregar campo `examples`
   - Agregar campo `variants`
   - Agregar campo `events`

### Prioridad MEDIA 🟡

4. **Agregar Addon Viewport**
   - Instalar `@storybook/addon-viewport`
   - Configurar breakpoints UBITS

5. **Agregar Addon A11y**
   - Instalar `@storybook/addon-a11y`
   - Agregar story de accesibilidad por componente

6. **Crear Documentación de Patrones**
   - Archivo `COMPOSITION-PATTERNS.md`
   - Ejemplos de composición

### Prioridad BAJA 🟢

7. **Agregar Stories "Play"**
   - Stories interactivas para componentes complejos

8. **Crear MDX Documentation**
   - Documentación detallada para componentes complejos

9. **Script de Validación**
   - Validar contratos automáticamente

---

## 🎯 ESTRUCTURA IDEAL PARA AUTORUN

### Estructura de Story Completa

```typescript
import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract, createExactSnippet } from '../../_shared/ubitsContract';

const meta: Meta<ComponentOptions> = {
  title: 'Categoría/Componente',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Descripción completa del componente...',
      },
    },
    // ⭐ CONTRATO UBITS COMPLETO
    ubits: createUBITSContract({
      componentId: '🧩-ux-component',
      api: {
        create: 'window.UBITS.Component.create',
        tag: '<ubits-component>',
      },
      dependsOn: {
        required: [],
        optional: [],
      },
      internals: [],
      slots: {},
      tokensUsed: [],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ NUEVOS CAMPOS SUGERIDOS
      examples: {
        basic: createExactSnippet('Component', { prop: 'value' }),
      },
      variants: {
        variant: ['primary', 'secondary'],
        size: ['sm', 'md', 'lg'],
      },
      events: {
        onClick: { type: 'MouseEvent', description: '...' },
      },
    }),
  },
  args: {
    // Valores por defecto
  },
  argTypes: {
    // Tipos y controles completos
  },
};

export default meta;
type Story = StoryObj<ComponentOptions>;

// ⭐ STORY CANÓNICA: Implementation
export const Implementation: Story = {
  args: {
    // Configuración canónica
  },
  render: (args) => {
    // Código exacto para copy/paste
  },
};

// ⭐ OTRAS STORIES: Variantes, casos de uso, etc.
export const VariantPrimary: Story = { /* ... */ };
export const VariantSecondary: Story = { /* ... */ };
```

### Estructura de Archivos

```
packages/storybook/
├── .storybook/
│   ├── main.ts                    ✅ Configurado
│   ├── preview.ts                 ✅ Configurado
│   └── plugins/                   ✅ Configurado
├── stories/
│   ├── _shared/
│   │   ├── ubitsContract.ts      ✅ Existe
│   │   ├── componentIndex.ts     ❌ FALTA (Prioridad ALTA)
│   │   └── COMPOSITION-PATTERNS.md ❌ FALTA (Prioridad MEDIA)
│   ├── components/
│   │   └── [Component]/
│   │       ├── [Component].stories.ts  ✅ Existe
│   │       └── [Component].mdx         ❌ FALTA (Prioridad BAJA)
│   └── ...
└── package.json                   ✅ Configurado
```

---

## 📊 RESUMEN: Estado Actual vs Ideal

| Característica | Estado Actual | Estado Ideal | Prioridad |
|---------------|---------------|--------------|------------|
| Contrato UBITS básico | ✅ Completo | ✅ Completo | - |
| Contrato UBITS extendido | ⚠️ Parcial | ✅ Con examples, variants, events | 🔴 ALTA |
| Índice de componentes | ❌ No existe | ✅ Existe | 🔴 ALTA |
| Addon Actions | ⚠️ Implícito | ✅ Explícito | 🟡 MEDIA |
| Addon Viewport | ❌ No existe | ✅ Existe | 🟡 MEDIA |
| Addon A11y | ❌ No existe | ✅ Existe | 🟡 MEDIA |
| Stories "Play" | ❌ No existe | ✅ Existe | 🟢 BAJA |
| Documentación MDX | ❌ No existe | ✅ Existe | 🟢 BAJA |
| Validación automática | ❌ No existe | ✅ Existe | 🟡 MEDIA |
| Documentación de patrones | ❌ No existe | ✅ Existe | 🟡 MEDIA |

---

## ✅ CONCLUSIÓN

### Lo que está BIEN ✅
1. **Sistema de contratos UBITS es excelente** - Proporciona toda la información necesaria
2. **Estructura de stories es sólida** - Bien organizada y documentada
3. **Configuración de Storybook es completa** - Vite, alias, middleware funcionan bien

### Lo que FALTA y es CRÍTICO 🔴
1. **Índice de componentes** - Necesario para búsqueda rápida
2. **Contratos extendidos** - Examples, variants, events
3. **Addon Actions explícito** - Para documentar eventos

### Lo que FALTA y es RECOMENDADO 🟡
1. **Addons de viewport y a11y** - Para testing completo
2. **Documentación de patrones** - Para composición
3. **Validación automática** - Para mantener calidad

### Recomendación Final
**Storybook está al 75% de lo ideal para AutoRun.** Con las mejoras de prioridad ALTA, llegaría al 90%. Las mejoras de prioridad MEDIA/BAJA son nice-to-have pero no críticas.

---

## 🚀 PRÓXIMOS PASOS

1. **Crear `componentIndex.ts`** (1-2 horas)
2. **Extender contratos UBITS** (2-3 horas)
3. **Instalar y configurar Addon Actions** (30 min)
4. **Instalar y configurar Addons Viewport y A11y** (1 hora)
5. **Crear documentación de patrones** (2-3 horas)

**Tiempo total estimado:** 6-9 horas para llegar al 90% ideal.
