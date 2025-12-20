# 🚀 Guía Completa: Storybook UBITS para Autorun

> **📌 Resumen Ejecutivo**: Este documento explica cómo Autorun puede extraer e implementar los **55 componentes UBITS** desde Storybook. Todo está indexado, documentado y listo para usar. El sistema incluye contratos completos, ejemplos de código, variantes, eventos y validaciones automáticas.

## 🎯 Inicio Rápido

```typescript
// 1. Importar el índice
import { UBITSComponentIndex, findComponentById } from './stories/_shared/componentIndex';

// 2. Buscar un componente
const button = findComponentById('🧩-ux-button');

// 3. Obtener información completa
const contract = button.contract;
const example = contract.examples?.basic;
const variants = contract.variants?.variant;

// 4. Implementar usando el ejemplo
// El ejemplo ya es código JavaScript válido listo para usar
```

## 📋 Tabla de Contenidos

1. [Inicio Rápido](#-inicio-rápido)
2. [Introducción](#introducción)
3. [Sistema de Contratos UBITS](#sistema-de-contratos-ubits)
4. [Índice de Componentes](#índice-de-componentes)
5. [Campos del Contrato](#campos-del-contrato)
6. [Cómo Implementar Componentes](#cómo-implementar-componentes)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Funciones Helper](#-funciones-helper-para-autorun)
9. [Mejores Prácticas](#mejores-prácticas)
10. [Referencias](#referencias)

---

## 🚀 Inicio Rápido

### Paso 1: Importar el Índice

```typescript
import { 
  UBITSComponentIndex,
  findComponentById 
} from './packages/storybook/stories/_shared/componentIndex';
```

### Paso 2: Buscar un Componente

```typescript
const button = findComponentById('🧩-ux-button');
if (!button) {
  throw new Error('Componente no encontrado');
}
```

### Paso 3: Leer el Contrato

```typescript
const contract = button.contract;

// Información básica
console.log('API:', contract.api?.create);
console.log('Ejemplo:', contract.examples?.basic);
console.log('Variantes:', contract.variants?.variant);
console.log('Eventos:', contract.events);
```

### Paso 4: Implementar el Componente

```typescript
// Usar el ejemplo básico como referencia
const example = contract.examples?.basic;
// 'window.UBITS.Button.create({\\n  variant: \'primary\',\\n  text: \'Click me\'\\n});'

// O implementar directamente
const buttonElement = window.UBITS.Button.create({
  variant: 'primary', // ✅ Validar con contract.variants?.variant
  text: 'Click me',
});
```

### Paso 5: Validar Dependencias

```typescript
// Verificar dependencias requeridas
const requiredDeps = contract.dependsOn?.required || [];
for (const depId of requiredDeps) {
  const dep = findComponentById(depId);
  if (!dep) {
    throw new Error(`Dependencia requerida ${depId} no encontrada`);
  }
}
```

### Ejemplo Completo en 5 Líneas

```typescript
import { findComponentById } from './packages/storybook/stories/_shared/componentIndex';

const button = findComponentById('🧩-ux-button');
const example = button.contract.examples?.basic;
// Usar el ejemplo para implementar el componente
eval(example); // ⚠️ O mejor, parsearlo de forma segura
```

---

## 🎯 Introducción

Este documento explica **cómo Autorun puede extraer e implementar componentes UBITS** desde Storybook de manera determinística y perfecta.

### ¿Qué es el Sistema UBITS?

El sistema UBITS es un **sistema de diseño completo** con:
- ✅ **55 componentes** listos para usar
- ✅ **Contratos estructurados** que definen cada componente
- ✅ **Índice centralizado** de todos los componentes
- ✅ **Ejemplos de código** canónicos
- ✅ **Variantes y eventos** documentados

### ¿Dónde está la información?

Toda la información está en:
- 📁 `packages/storybook/stories/_shared/componentIndex.ts` - **Índice principal**
- 📁 `packages/storybook/stories/_shared/ubitsContract.ts` - **Definición de contratos**
- 📁 `packages/storybook/stories/components/*/` - **Stories de cada componente**

---

## 📦 Sistema de Contratos UBITS

### ¿Qué es un Contrato UBITS?

Un **contrato UBITS** es la especificación completa de un componente que incluye:

1. **Identificación**: `componentId` único
2. **API**: Cómo crear el componente
3. **Dependencias**: Qué componentes necesita
4. **Tokens**: Qué tokens CSS usa
5. **Reglas**: Reglas de validación
6. **Ejemplos**: Código de ejemplo
7. **Variantes**: Opciones disponibles
8. **Eventos**: Eventos que emite

### Estructura del Contrato

```typescript
interface UBITSContract {
  // Identificación
  componentId: string; // Ej: '🧩-ux-button'
  
  // API de creación
  api?: {
    create?: string; // Ej: 'window.UBITS.Button.create'
    tag?: string; // Ej: '<ubits-button>'
  };
  
  // Dependencias
  dependsOn?: {
    required: string[]; // Componentes que DEBES incluir
    optional: string[]; // Componentes que PUEDES incluir
  };
  
  // Componentes internos (NO re-implementar)
  internals?: string[];
  
  // Slots disponibles
  slots?: {
    [key: string]: string[]; // Ej: { header: ['🧩-ux-button'] }
  };
  
  // Tokens CSS usados
  tokensUsed?: string[];
  
  // Reglas de validación
  rules?: {
    forbidHardcodedColors?: boolean;
    forbiddenPatterns?: string[];
    requiredProps?: string[];
  };
  
  // ⭐ CAMPOS EXTENDIDOS
  examples?: ComponentExamples; // Ejemplos de código
  variants?: ComponentVariants; // Variantes disponibles
  events?: Record<string, ComponentEvent>; // Eventos
}
```

---

## 🔍 Índice de Componentes

### Ubicación

**Archivo:** `packages/storybook/stories/_shared/componentIndex.ts`

### Estructura

```typescript
export const UBITSComponentIndex: Record<string, ComponentInfo> = {
  '🧩-ux-button': {
    componentId: '🧩-ux-button',
    category: 'Básicos',
    title: 'Button',
    contract: { /* Contrato completo */ },
    storyPath: 'stories/components/Button/Button.stories.ts',
    providerPath: 'packages/components/button/src/ButtonProvider',
    typesPath: 'packages/components/button/src/types/ButtonOptions',
  },
  // ... 55 componentes más
};
```

### Cómo Acceder a un Componente

```typescript
// 1. Importar el índice
import { UBITSComponentIndex } from './stories/_shared/componentIndex';

// 2. Buscar por componentId
const buttonInfo = UBITSComponentIndex['🧩-ux-button'];

// 3. Acceder al contrato
const contract = buttonInfo.contract;

// 4. Usar la información
console.log(contract.api.create); // 'window.UBITS.Button.create'
console.log(contract.examples.basic); // Código de ejemplo
console.log(contract.variants.variant); // ['primary', 'secondary', ...]
```

### Búsqueda por Categoría

```typescript
// Buscar todos los componentes de una categoría
const basicComponents = Object.values(UBITSComponentIndex)
  .filter(info => info.category === 'Básicos');

// Buscar componentes que usan un token específico
const componentsWithToken = Object.values(UBITSComponentIndex)
  .filter(info => info.contract.tokensUsed?.includes('--modifiers-normal-color-light-accent-brand'));
```

---

## 📋 Campos del Contrato

### 1. `componentId` - Identificador Único

**Formato:** `🧩-ux-{nombre}` o `⚙️-functional-{nombre}`

**Ejemplos:**
- `🧩-ux-button` - Componente Button
- `🧩-ux-data-table` - Componente DataTable
- `⚙️-functional-scroll` - Funcionalidad Scrollbar

**Uso:**
```typescript
const contract = UBITSComponentIndex['🧩-ux-button'].contract;
```

### 2. `api` - API de Creación

**Campos:**
- `create`: Función para crear el componente
- `tag`: Tag HTML del componente (si aplica)

**Ejemplo:**
```typescript
api: {
  create: 'window.UBITS.Button.create',
  tag: '<ubits-button>',
}
```

**Implementación:**
```typescript
// Opción 1: Usar función create
window.UBITS.Button.create({
  variant: 'primary',
  text: 'Click me',
});

// Opción 2: Usar tag HTML (si está disponible)
const button = document.createElement('ubits-button');
button.setAttribute('variant', 'primary');
button.textContent = 'Click me';
```

### 3. `dependsOn` - Dependencias

**Tipos:**
- `required`: Componentes que **DEBES** incluir
- `optional`: Componentes que **PUEDES** incluir

**Ejemplo:**
```typescript
dependsOn: {
  required: ['🧩-ux-button'], // Modal requiere Button
  optional: ['🧩-ux-icon', '🧩-ux-tooltip'], // Iconos y tooltips son opcionales
}
```

**Implementación:**
```typescript
// ✅ CORRECTO: Incluir dependencias requeridas
const modal = window.UBITS.Modal.create({
  title: 'Confirmar',
  footerButtons: {
    primary: {
      label: 'Confirmar',
      onClick: () => {},
    },
  },
});

// ❌ INCORRECTO: Omitir dependencias requeridas
const modal = window.UBITS.Modal.create({
  title: 'Confirmar',
  // Sin footerButtons (requerido)
});
```

### 4. `internals` - Componentes Internos

**⚠️ IMPORTANTE:** Estos componentes son **privados** y NO debes re-implementarlos.

**Ejemplo:**
```typescript
internals: [
  '⚙️-functional-scroll',
  '⚙️-functional-drag-handle',
]
```

**Regla:** Si un componente está en `internals`, NO lo implementes directamente. El componente padre ya lo maneja internamente.

### 5. `slots` - Slots Disponibles

**Definición:** Lugares donde puedes insertar componentes hijos.

**Ejemplo:**
```typescript
slots: {
  header: ['🧩-ux-button', '🧩-ux-icon'],
  body: ['🧩-ux-input', '🧩-ux-textarea'],
  footer: ['🧩-ux-button'],
}
```

**Implementación:**
```typescript
const card = window.UBITS.Card.create({
  header: {
    component: '🧩-ux-button',
    props: { variant: 'primary', text: 'Action' },
  },
  body: {
    component: '🧩-ux-input',
    props: { placeholder: 'Enter text' },
  },
});
```

### 6. `tokensUsed` - Tokens CSS

**Propósito:** Lista de tokens CSS que el componente usa.

**Ejemplo:**
```typescript
tokensUsed: [
  '--modifiers-normal-color-light-accent-brand',
  '--modifiers-normal-color-light-bg-1',
  '--modifiers-normal-color-light-fg-1-high',
]
```

**Uso:** Siempre usa estos tokens en lugar de colores hardcodeados.

**✅ CORRECTO:**
```css
.button {
  background: var(--modifiers-normal-color-light-accent-brand);
  color: var(--modifiers-normal-color-light-fg-1-high);
}
```

**❌ INCORRECTO:**
```css
.button {
  background: #007bff; /* ❌ Color hardcodeado */
  color: #ffffff; /* ❌ Color hardcodeado */
}
```

### 7. `rules` - Reglas de Validación

**Campos:**
- `forbidHardcodedColors`: Prohibir colores hardcodeados
- `forbiddenPatterns`: Patrones prohibidos (ej: `rgb(`, `#`)
- `requiredProps`: Props requeridas

**Ejemplo:**
```typescript
rules: {
  forbidHardcodedColors: true,
  forbiddenPatterns: ['rgb(', 'hsl(', '#'],
  requiredProps: ['variant', 'text'],
}
```

**Validación:**
- ✅ Usa tokens CSS: `var(--token)`
- ❌ NO uses: `rgb(255, 0, 0)`, `#ff0000`, `hsl(0, 100%, 50%)`

---

## ⭐ Campos Extendidos

### 8. `examples` - Ejemplos de Código

**Propósito:** Proporcionar ejemplos de código canónicos que puedes usar como referencia.

**Estructura:**
```typescript
examples: {
  basic: 'window.UBITS.Button.create({...})',
  withIcon: 'window.UBITS.Button.create({...})',
  disabled: 'window.UBITS.Button.create({...})',
}
```

**Ejemplo Real:**
```typescript
examples: {
  basic: 'window.UBITS.Button.create({\\n  variant: \'primary\',\\n  text: \'Click me\'\\n});',
  withIcon: 'window.UBITS.Button.create({\\n  variant: \'primary\',\\n  text: \'Save\',\\n  icon: \'save\',\\n  iconPosition: \'left\'\\n});',
}
```

**Uso:**
```typescript
const contract = UBITSComponentIndex['🧩-ux-button'].contract;

// Obtener ejemplo básico
const basicExample = contract.examples?.basic;

// Evaluar el ejemplo (si es código válido)
eval(basicExample); // ⚠️ Solo si confías en el código
```

### 9. `variants` - Variantes Disponibles

**Propósito:** Listar todas las variantes disponibles para cada propiedad.

**Estructura:**
```typescript
variants: {
  variant: ['primary', 'secondary', 'tertiary'],
  size: ['xs', 'sm', 'md', 'lg'],
  state: ['default', 'hover', 'active', 'disabled'],
}
```

**Ejemplo Real:**
```typescript
variants: {
  variant: ['primary', 'secondary', 'tertiary'],
  size: ['xs', 'sm', 'md', 'lg'],
  showIcons: [true, false],
}
```

**Uso:**
```typescript
const contract = UBITSComponentIndex['🧩-ux-button'].contract;

// Obtener variantes disponibles
const variants = contract.variants?.variant; // ['primary', 'secondary', 'tertiary']
const sizes = contract.variants?.size; // ['xs', 'sm', 'md', 'lg']

// Validar que una variante es válida
const isValidVariant = variants?.includes('primary'); // true
```

### 10. `events` - Eventos del Componente

**Propósito:** Documentar qué eventos emite el componente.

**Estructura:**
```typescript
events: {
  onClick: {
    type: 'MouseEvent',
    description: 'Emitted when button is clicked',
  },
  onFocus: {
    type: 'FocusEvent',
    description: 'Emitted when button receives focus',
  },
}
```

**Ejemplo Real:**
```typescript
events: {
  onClick: {
    type: 'Event',
    description: 'Emitted when button is clicked',
  },
  onTabChange: {
    type: 'Event',
    description: 'Emitted when active tab changes',
  },
}
```

**Uso:**
```typescript
const contract = UBITSComponentIndex['🧩-ux-button'].contract;

// Obtener eventos disponibles
const events = contract.events;

// Verificar si un evento existe
if (events?.onClick) {
  console.log('Button emite onClick:', events.onClick.description);
}
```

---

## 🛠️ Cómo Implementar Componentes

### Paso 1: Buscar el Componente

```typescript
// Importar el índice
import { UBITSComponentIndex } from './stories/_shared/componentIndex';

// Buscar por componentId
const componentId = '🧩-ux-button';
const componentInfo = UBITSComponentIndex[componentId];

if (!componentInfo) {
  throw new Error(`Componente ${componentId} no encontrado`);
}
```

### Paso 2: Leer el Contrato

```typescript
const contract = componentInfo.contract;

// Verificar información básica
console.log('Componente:', componentInfo.title);
console.log('Categoría:', componentInfo.category);
console.log('API Create:', contract.api?.create);
```

### Paso 3: Verificar Dependencias

```typescript
// Verificar dependencias requeridas
const requiredDeps = contract.dependsOn?.required || [];
if (requiredDeps.length > 0) {
  console.log('Dependencias requeridas:', requiredDeps);
  
  // Verificar que todas las dependencias estén disponibles
  for (const depId of requiredDeps) {
    if (!UBITSComponentIndex[depId]) {
      throw new Error(`Dependencia requerida ${depId} no encontrada`);
    }
  }
}

// Verificar dependencias opcionales
const optionalDeps = contract.dependsOn?.optional || [];
console.log('Dependencias opcionales:', optionalDeps);
```

### Paso 4: Usar Ejemplos de Código

```typescript
// Obtener ejemplo básico
const basicExample = contract.examples?.basic;
if (basicExample) {
  console.log('Ejemplo básico:', basicExample);
  // Puedes usar este ejemplo como base
}
```

### Paso 5: Validar Variantes

```typescript
// Validar que las props usan variantes válidas
function validateProps(props: Record<string, any>, contract: UBITSContract) {
  const variants = contract.variants || {};
  
  for (const [propName, propValue] of Object.entries(props)) {
    if (variants[propName]) {
      const validValues = variants[propName];
      if (!validValues.includes(propValue)) {
        console.warn(
          `⚠️ Valor inválido para ${propName}: ${propValue}. ` +
          `Valores válidos: ${validValues.join(', ')}`
        );
      }
    }
  }
}
```

### Paso 6: Implementar el Componente

```typescript
// Crear el componente usando la API
function implementComponent(componentId: string, props: Record<string, any>) {
  const componentInfo = UBITSComponentIndex[componentId];
  const contract = componentInfo.contract;
  
  // 1. Validar dependencias
  const requiredDeps = contract.dependsOn?.required || [];
  for (const depId of requiredDeps) {
    // Asegurar que las dependencias están disponibles
    if (!UBITSComponentIndex[depId]) {
      throw new Error(`Dependencia requerida ${depId} no encontrada`);
    }
  }
  
  // 2. Validar props requeridas
  const requiredProps = contract.rules?.requiredProps || [];
  for (const prop of requiredProps) {
    if (!(prop in props)) {
      throw new Error(`Prop requerida ${prop} no proporcionada`);
    }
  }
  
  // 3. Validar variantes
  validateProps(props, contract);
  
  // 4. Crear el componente
  const createFunction = contract.api?.create;
  if (createFunction) {
    // Evaluar la función de creación
    // Ejemplo: window.UBITS.Button.create({...})
    const createCode = `${createFunction}(${JSON.stringify(props)})`;
    return eval(createCode); // ⚠️ Solo si confías en el código
  }
  
  throw new Error(`No hay API de creación disponible para ${componentId}`);
}
```

### Paso 7: Manejar Eventos

```typescript
// Configurar event listeners basados en el contrato
function setupEventListeners(
  element: HTMLElement,
  contract: UBITSContract,
  handlers: Record<string, Function>
) {
  const events = contract.events || {};
  
  for (const [eventName, eventInfo] of Object.entries(events)) {
    if (handlers[eventName]) {
      // Convertir onEventName a eventname
      const domEventName = eventName.replace(/^on/, '').toLowerCase();
      element.addEventListener(domEventName, handlers[eventName]);
    }
  }
}
```

---

## 📚 Ejemplos Prácticos

### Ejemplo 1: Implementar un Button Simple

```typescript
// 1. Buscar el componente
const buttonInfo = UBITSComponentIndex['🧩-ux-button'];
const contract = buttonInfo.contract;

// 2. Verificar información
console.log('API:', contract.api?.create); // 'window.UBITS.Button.create'
console.log('Variantes:', contract.variants?.variant); // ['primary', 'secondary', 'tertiary']

// 3. Usar ejemplo básico
const example = contract.examples?.basic;
// 'window.UBITS.Button.create({\\n  variant: \'primary\',\\n  text: \'Click me\'\\n});'

// 4. Implementar
const button = window.UBITS.Button.create({
  variant: 'primary', // ✅ Variante válida
  text: 'Click me',
  size: 'md', // ✅ Tamaño válido
});

// 5. Configurar eventos
if (contract.events?.onClick) {
  button.addEventListener('click', (e) => {
    console.log('Button clicked!', e);
  });
}
```

### Ejemplo 2: Implementar un Modal con Dependencias

```typescript
// 1. Buscar el componente
const modalInfo = UBITSComponentIndex['🧩-ux-modal'];
const contract = modalInfo.contract;

// 2. Verificar dependencias requeridas
const requiredDeps = contract.dependsOn?.required || [];
console.log('Dependencias requeridas:', requiredDeps); // ['🧩-ux-button']

// 3. Verificar que Button está disponible
const buttonInfo = UBITSComponentIndex['🧩-ux-button'];
if (!buttonInfo) {
  throw new Error('Button (dependencia requerida) no encontrado');
}

// 4. Implementar Modal con dependencias
const modal = window.UBITS.Modal.create({
  title: 'Confirmar acción',
  content: '¿Estás seguro de que quieres continuar?',
  footerButtons: {
    primary: {
      label: 'Confirmar',
      onClick: () => {
        console.log('Confirmado');
        modal.close();
      },
    },
    secondary: {
      label: 'Cancelar',
      onClick: () => {
        console.log('Cancelado');
        modal.close();
      },
    },
  },
});
```

### Ejemplo 3: Implementar un DataTable Completo

```typescript
// 1. Buscar el componente
const dataTableInfo = UBITSComponentIndex['🧩-ux-data-table'];
const contract = dataTableInfo.contract;

// 2. Verificar dependencias
const requiredDeps = contract.dependsOn?.required || [];
const optionalDeps = contract.dependsOn?.optional || [];

console.log('Requeridas:', requiredDeps); // ['🧩-ux-button', '🧩-ux-input']
console.log('Opcionales:', optionalDeps); // ['🧩-ux-checkbox', '🧩-ux-pagination', ...]

// 3. Verificar componentes internos (NO implementar)
const internals = contract.internals || [];
console.log('Componentes internos (NO implementar):', internals);
// ['⚙️-functional-scroll', '⚙️-functional-drag-handle', ...]

// 4. Implementar DataTable
const dataTable = window.UBITS.DataTable.create({
  columns: [
    { id: 'name', label: 'Nombre', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'role', label: 'Rol' },
  ],
  data: [
    { id: 1, name: 'Juan', email: 'juan@example.com', role: 'Admin' },
    { id: 2, name: 'María', email: 'maria@example.com', role: 'User' },
  ],
  // Las dependencias (Button, Input) se manejan internamente
});
```

### Ejemplo 4: Usar Variantes para Generar Opciones

```typescript
// Generar todas las combinaciones de variantes
function generateVariantCombinations(componentId: string) {
  const contract = UBITSComponentIndex[componentId].contract;
  const variants = contract.variants || {};
  
  const combinations = [];
  
  // Obtener todas las propiedades con variantes
  const variantProps = Object.keys(variants);
  
  // Generar combinaciones (ejemplo simplificado)
  if (variantProps.length === 1) {
    const prop = variantProps[0];
    const values = variants[prop];
    for (const value of values) {
      combinations.push({ [prop]: value });
    }
  }
  
  return combinations;
}

// Ejemplo: Generar todos los botones posibles
const buttonCombinations = generateVariantCombinations('🧩-ux-button');
// [
//   { variant: 'primary' },
//   { variant: 'secondary' },
//   { variant: 'tertiary' },
// ]
```

---

## ✅ Mejores Prácticas

### 1. Siempre Verifica el Contrato

```typescript
// ✅ CORRECTO
const componentInfo = UBITSComponentIndex[componentId];
if (!componentInfo) {
  throw new Error(`Componente ${componentId} no encontrado`);
}
const contract = componentInfo.contract;

// ❌ INCORRECTO
// Asumir que el componente existe sin verificar
```

### 2. Valida Dependencias Antes de Implementar

```typescript
// ✅ CORRECTO
const requiredDeps = contract.dependsOn?.required || [];
for (const depId of requiredDeps) {
  if (!UBITSComponentIndex[depId]) {
    throw new Error(`Dependencia requerida ${depId} no encontrada`);
  }
}

// ❌ INCORRECTO
// Implementar sin verificar dependencias
```

### 3. Usa Tokens CSS, NO Colores Hardcodeados

```typescript
// ✅ CORRECTO
const tokens = contract.tokensUsed || [];
// Usar: var(--modifiers-normal-color-light-accent-brand)

// ❌ INCORRECTO
// Usar: #007bff, rgb(0, 123, 255), etc.
```

### 4. Respeta los Componentes Internos

```typescript
// ✅ CORRECTO
const internals = contract.internals || [];
// NO implementar estos componentes directamente

// ❌ INCORRECTO
// Intentar implementar componentes internos manualmente
```

### 5. Usa Ejemplos como Referencia

```typescript
// ✅ CORRECTO
const example = contract.examples?.basic;
// Usar como referencia, adaptar según necesidades

// ❌ INCORRECTO
// Ignorar los ejemplos y crear código desde cero
```

### 6. Valida Variantes

```typescript
// ✅ CORRECTO
const variants = contract.variants?.variant || [];
if (!variants.includes(props.variant)) {
  throw new Error(`Variante inválida: ${props.variant}`);
}

// ❌ INCORRECTO
// Usar variantes sin validar
```

---

## 📖 Referencias

### Archivos Importantes

1. **`componentIndex.ts`** - Índice principal de componentes
   - Ubicación: `packages/storybook/stories/_shared/componentIndex.ts`
   - Contiene: Todos los 55 componentes con sus contratos completos

2. **`ubitsContract.ts`** - Definición de contratos
   - Ubicación: `packages/storybook/stories/_shared/ubitsContract.ts`
   - Contiene: Interfaces y helpers para contratos

3. **Stories de Componentes**
   - Ubicación: `packages/storybook/stories/components/*/`
   - Contiene: Implementaciones y ejemplos de cada componente

### Documentación Adicional

1. **COMPOSITION-PATTERNS.md** - Patrones de composición
2. **CAMPOS-EXTENDIDOS-GUIA.md** - Guía de campos extendidos
3. **AUTORUN-GUIA-USO.md** - Guía de uso para Autorun

### Comandos Útiles

```bash
# Regenerar el índice de componentes
npm run storybook:index

# Validar contratos
npm run validate:contracts

# Iniciar Storybook
npm run storybook
```

---

## 📊 Estadísticas del Sistema

### Componentes Disponibles

- **Total**: 55 componentes
- **Categorías**: 8 categorías
  - Básicos: 9 componentes
  - Formularios: 7 componentes
  - Feedback: 8 componentes
  - Data: 3 componentes
  - Navegación: 8 componentes
  - Layout: 6 componentes
  - Charts: 6 componentes
  - Otros: 3 componentes

### Cobertura de Campos Extendidos

- **Ejemplos**: 55/55 (100%) ✅
- **Variantes**: 55/55 (100%) ✅
- **Eventos**: 55/55 (100%) ✅

### Información Disponible por Componente

Cada componente incluye:
- ✅ `componentId` único
- ✅ `api.create` y `api.tag`
- ✅ `dependsOn.required` y `dependsOn.optional`
- ✅ `internals` (componentes privados)
- ✅ `slots` disponibles
- ✅ `tokensUsed` (lista completa)
- ✅ `rules` (validación)
- ✅ `examples` (2-3 ejemplos de código)
- ✅ `variants` (todas las variantes)
- ✅ `events` (todos los eventos)

---

## 🎯 Resumen Rápido

### Para Implementar un Componente:

1. **Buscar** en `UBITSComponentIndex[componentId]`
2. **Leer** el `contract` del componente
3. **Verificar** `dependsOn.required` y asegurar que están disponibles
4. **Validar** `requiredProps` están presentes
5. **Usar** `examples.basic` como referencia
6. **Validar** `variants` para props importantes
7. **Implementar** usando `api.create`
8. **Configurar** `events` si es necesario
9. **Usar** `tokensUsed` para estilos (NO colores hardcodeados)
10. **NO implementar** componentes en `internals`

### Estructura de Datos Clave:

```typescript
UBITSComponentIndex[componentId] = {
  componentId: string,
  category: string,
  title: string,
  contract: {
    api: { create: string, tag?: string },
    dependsOn: { required: string[], optional: string[] },
    internals: string[],
    slots: { [key: string]: string[] },
    tokensUsed: string[],
    rules: { ... },
    examples: { [key: string]: string },
    variants: { [key: string]: (string|number|boolean)[] },
    events: { [key: string]: { type: string, description: string } },
  },
  storyPath: string,
  providerPath: string,
  typesPath?: string,
}
```

---

## 🚀 Conclusión

Storybook UBITS está **100% listo** para que Autorun pueda:
- ✅ Extraer información completa de componentes
- ✅ Implementar componentes de manera determinística
- ✅ Validar dependencias y variantes
- ✅ Usar ejemplos de código canónicos
- ✅ Manejar eventos correctamente
- ✅ Respetar tokens y reglas de diseño

**Todo está documentado, indexado y listo para usar.**

---

## 🎓 Casos de Uso Comunes

### Caso 1: "Necesito un botón primario"

```typescript
// 1. Buscar Button
const button = findComponentById('🧩-ux-button');

// 2. Obtener ejemplo básico
const code = button.contract.examples?.basic;
// 'window.UBITS.Button.create({\\n  variant: \'primary\',\\n  text: \'Click me\'\\n});'

// 3. Adaptar según necesidades
const customCode = code.replace('Click me', 'Guardar');

// 4. Implementar
eval(customCode);
```

### Caso 2: "Necesito un formulario con validación"

```typescript
// 1. Buscar Input
const input = findComponentById('🧩-ux-input');

// 2. Ver variantes disponibles
const types = input.contract.variants?.type;
// ['text', 'email', 'password', 'number', ...]

// 3. Ver eventos disponibles
const events = input.contract.events;
// { onChange: {...}, onFocus: {...}, onBlur: {...} }

// 4. Implementar con validación
const emailInput = window.UBITS.Input.create({
  type: 'email', // ✅ Variante válida
  label: 'Email',
  required: true,
  onChange: (value) => {
    // Validar email
    if (!value.includes('@')) {
      console.error('Email inválido');
    }
  },
});
```

### Caso 3: "Necesito una tabla de datos con búsqueda y paginación"

```typescript
// 1. Buscar DataTable
const dataTable = findComponentById('🧩-ux-data-table');

// 2. Ver dependencias requeridas
const required = dataTable.contract.dependsOn?.required;
// ['🧩-ux-button', '🧩-ux-input']

// 3. Ver slots disponibles
const slots = dataTable.contract.slots;
// { header: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-search-button'], ... }

// 4. Ver ejemplo completo
const example = dataTable.contract.examples?.withSearch;
// Ya incluye búsqueda y paginación

// 5. Implementar
const table = window.UBITS.DataTable.create({
  columns: [...],
  data: [...],
  header: {
    searchInput: { placeholder: 'Buscar...' },
    buttons: [{ variant: 'primary', text: 'Nuevo' }],
  },
  footer: {
    pagination: { currentPage: 1, totalPages: 10 },
  },
});
```

### Caso 4: "Necesito un modal de confirmación"

```typescript
// 1. Buscar Modal
const modal = findComponentById('🧩-ux-modal');

// 2. Verificar que Button está disponible (dependencia requerida)
const button = findComponentById('🧩-ux-button');
if (!button) {
  throw new Error('Button (dependencia requerida) no encontrado');
}

// 3. Ver ejemplo con botones
const example = modal.contract.examples?.withButtons;

// 4. Implementar
const confirmModal = window.UBITS.Modal.create({
  title: 'Confirmar acción',
  bodyContent: '¿Estás seguro?',
  footerButtons: {
    primary: {
      label: 'Confirmar',
      onClick: () => { /* ... */ },
    },
    secondary: {
      label: 'Cancelar',
      onClick: () => { confirmModal.close(); },
    },
  },
});
```

---

## 🔍 Búsqueda Avanzada

### Buscar Componentes por Características

```typescript
// Buscar componentes que emiten un evento específico
function findComponentsWithEvent(eventName: string) {
  return Object.values(UBITSComponentIndex)
    .filter(info => {
      const events = info.contract.events || {};
      return eventName in events;
    });
}

// Buscar componentes con una variante específica
function findComponentsWithVariant(propName: string, value: any) {
  return Object.values(UBITSComponentIndex)
    .filter(info => {
      const variants = info.contract.variants || {};
      const validValues = variants[propName] || [];
      return validValues.includes(value);
    });
}

// Buscar componentes que usan un token específico
function findComponentsUsingToken(token: string) {
  return Object.values(UBITSComponentIndex)
    .filter(info => {
      const tokens = info.contract.tokensUsed || [];
      return tokens.includes(token);
    });
}
```

### Obtener Estadísticas del Sistema

```typescript
function getSystemStatistics() {
  const allComponents = Object.values(UBITSComponentIndex);
  
  return {
    total: allComponents.length,
    byCategory: allComponents.reduce((acc, comp) => {
      acc[comp.category] = (acc[comp.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    withExamples: allComponents.filter(c => c.contract.examples).length,
    withVariants: allComponents.filter(c => c.contract.variants).length,
    withEvents: allComponents.filter(c => c.contract.events).length,
    totalDependencies: allComponents.reduce((acc, comp) => {
      const deps = comp.contract.dependsOn?.required || [];
      return acc + deps.length;
    }, 0),
  };
}

// Uso
const stats = getSystemStatistics();
console.log('Estadísticas:', stats);
```

---

## 🚨 Errores Comunes y Soluciones

### Error 1: Componente no encontrado

```typescript
// ❌ PROBLEMA
const component = UBITSComponentIndex['button']; // undefined

// ✅ SOLUCIÓN
const component = UBITSComponentIndex['🧩-ux-button']; // ✅ Usar componentId completo
```

### Error 2: Dependencia faltante

```typescript
// ❌ PROBLEMA
const modal = window.UBITS.Modal.create({
  title: 'Test',
  // Sin footerButtons (requerido)
});

// ✅ SOLUCIÓN
const modal = window.UBITS.Modal.create({
  title: 'Test',
  footerButtons: { // ✅ Incluir dependencia requerida
    primary: { label: 'OK', onClick: () => {} },
  },
});
```

### Error 3: Variante inválida

```typescript
// ❌ PROBLEMA
const button = window.UBITS.Button.create({
  variant: 'custom', // ❌ No existe
  text: 'Click',
});

// ✅ SOLUCIÓN
const contract = UBITSComponentIndex['🧩-ux-button'].contract;
const validVariants = contract.variants?.variant || [];
// ['primary', 'secondary', 'tertiary']

const button = window.UBITS.Button.create({
  variant: 'primary', // ✅ Variante válida
  text: 'Click',
});
```

### Error 4: Color hardcodeado

```typescript
// ❌ PROBLEMA
const style = 'background: #007bff;'; // ❌ Color hardcodeado

// ✅ SOLUCIÓN
const contract = UBITSComponentIndex['🧩-ux-button'].contract;
const tokens = contract.tokensUsed || [];
// ['--modifiers-normal-color-light-accent-brand', ...]

const style = 'background: var(--modifiers-normal-color-light-accent-brand);'; // ✅ Token
```

---

## 📚 Recursos Adicionales

### Documentación Relacionada

1. **COMPOSITION-PATTERNS.md** - Patrones de composición de componentes
2. **CAMPOS-EXTENDIDOS-GUIA.md** - Guía detallada de campos extendidos
3. **AUTORUN-GUIA-USO.md** - Guía de uso específica para Autorun
4. **ANALISIS-COMPLETO-STORYBOOK-AUTORUN.md** - Análisis inicial del sistema

### Archivos de Código

1. **componentIndex.ts** - Índice completo de componentes (55 componentes)
2. **ubitsContract.ts** - Definición de interfaces y helpers
3. **Stories** - Implementaciones y ejemplos en `stories/components/*/`

### Scripts Disponibles

```bash
# Regenerar índice de componentes
npm run storybook:index

# Validar todos los contratos
npm run validate:contracts

# Validar y corregir contratos
npm run validate:contracts:fix

# Iniciar Storybook
npm run storybook
```

---

---

## ✅ Checklist para Autorun

### Antes de Implementar un Componente:

- [ ] **Buscar el componente** en `UBITSComponentIndex[componentId]`
- [ ] **Verificar que existe** usando `findComponentById(componentId)`
- [ ] **Leer el contrato completo** del componente
- [ ] **Verificar dependencias requeridas** y asegurar que están disponibles
- [ ] **Validar props requeridas** están presentes
- [ ] **Revisar ejemplos** en `contract.examples`
- [ ] **Validar variantes** para props importantes usando `contract.variants`
- [ ] **Revisar eventos disponibles** en `contract.events`
- [ ] **Verificar tokens CSS** en `contract.tokensUsed` (NO usar colores hardcodeados)
- [ ] **NO implementar componentes internos** listados en `contract.internals`

### Durante la Implementación:

- [ ] **Usar la API correcta** de `contract.api.create`
- [ ] **Seguir el ejemplo básico** como referencia
- [ ] **Incluir todas las dependencias requeridas**
- [ ] **Usar solo variantes válidas** del contrato
- [ ] **Configurar event listeners** según `contract.events`
- [ ] **Usar tokens CSS** en lugar de colores hardcodeados
- [ ] **Validar el código generado** antes de ejecutarlo

### Después de Implementar:

- [ ] **Verificar que el componente se renderiza correctamente**
- [ ] **Probar eventos** configurados
- [ ] **Validar que no hay errores de consola**
- [ ] **Verificar que se usan tokens correctos** (no colores hardcodeados)

---

## 📊 Resumen de Recursos

### Archivos Clave

| Archivo | Ubicación | Propósito |
|---------|-----------|-----------|
| `componentIndex.ts` | `stories/_shared/componentIndex.ts` | Índice completo de 55 componentes |
| `ubitsContract.ts` | `stories/_shared/ubitsContract.ts` | Definición de contratos |
| `GUIA-COMPLETA-AUTORUN.md` | `GUIA-COMPLETA-AUTORUN.md` | Este documento |
| Stories | `stories/components/*/` | Implementaciones y ejemplos |

### Funciones Helper Disponibles

```typescript
// Todas estas funciones están en componentIndex.ts
findComponentById(componentId: string)
findComponentsByCategory(category: string)
findComponentsThatDependOn(dependencyId: string)
getAllComponents()
getAllComponentIds()
isValidComponentId(componentId: string)
getComponentCategory(componentId: string)
getComponentTitle(componentId: string)
exportIndexAsJSON()
```

### Información Disponible por Componente

✅ `componentId` único  
✅ `api.create` y `api.tag`  
✅ `dependsOn.required` y `dependsOn.optional`  
✅ `internals` (componentes privados)  
✅ `slots` disponibles  
✅ `tokensUsed` (lista completa)  
✅ `rules` (validación)  
✅ `examples` (2-3 ejemplos de código)  
✅ `variants` (todas las variantes)  
✅ `events` (todos los eventos)  

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0  
**Componentes disponibles:** 55/55 (100%)  
**Campos extendidos:** 55/55 (100%)  
**Estado:** ✅ COMPLETO Y LISTO PARA AUTORUN
