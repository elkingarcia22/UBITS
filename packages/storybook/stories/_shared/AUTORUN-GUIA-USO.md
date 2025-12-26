# 🚀 Guía de Uso para AutoRun/Cursor

Esta guía explica cómo AutoRun/Cursor puede usar Storybook para implementar componentes UBITS de manera determinística.

## 📋 Tabla de Contenidos

1. [Cómo Buscar Componentes](#cómo-buscar-componentes)
2. [Leer Contratos Completos](#leer-contratos-completos)
3. [Usar Ejemplos de Código](#usar-ejemplos-de-código)
4. [Entender Dependencias](#entender-dependencias)
5. [Validar Implementaciones](#validar-implementaciones)
6. [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)

---

## 🔍 Cómo Buscar Componentes

### 1. Buscar por ComponentId

```typescript
import { findComponentById } from './componentIndex';

// Buscar componente específico
const button = findComponentById('🧩-ux-button');

if (button) {
  console.log(button.contract);
  console.log(button.storyPath);
  console.log(button.providerPath);
}
```

### 2. Buscar por Categoría

```typescript
import { findComponentsByCategory } from './componentIndex';

// Buscar todos los componentes básicos
const basicComponents = findComponentsByCategory('Básicos');

// Buscar todos los componentes de formularios
const formComponents = findComponentsByCategory('Formularios');
```

### 3. Buscar Componentes que Dependen de Otro

```typescript
import { findComponentsThatDependOn } from './componentIndex';

// Encontrar todos los componentes que usan Button
const componentsUsingButton = findComponentsThatDependOn('🧩-ux-button');

// Esto es útil para entender el impacto de cambios
```

### 4. Obtener Todos los Componentes

```typescript
import { getAllComponents, getAllComponentIds } from './componentIndex';

// Obtener lista completa
const allComponents = getAllComponents();

// Obtener solo los IDs
const allIds = getAllComponentIds();
```

---

## 📖 Leer Contratos Completos

### Estructura del Contrato

```typescript
const component = findComponentById('🧩-ux-button');
const contract = component.contract;

// Campos básicos
contract.componentId;        // '🧩-ux-button'
contract.api.create;          // 'window.UBITS.Button.create'
contract.api.tag;             // '<ubits-button>'

// Dependencias
contract.dependsOn.required;  // Componentes requeridos
contract.dependsOn.optional;  // Componentes opcionales

// Slots
contract.slots.header;        // Componentes que acepta en header
contract.slots.footer;        // Componentes que acepta en footer

// Internals (NO re-implementar)
contract.internals;           // Componentes privados

// Tokens usados
contract.tokensUsed;          // Lista de tokens CSS

// Reglas
contract.rules.forbidHardcodedColors;  // true/false
contract.rules.requiredProps;          // Props requeridas

// ⭐ CAMPOS EXTENDIDOS
contract.examples;            // Ejemplos de código
contract.variants;            // Variantes disponibles
contract.events;              // Eventos que emite
```

### Ejemplo Completo

```typescript
import { findComponentById } from './componentIndex';

const button = findComponentById('🧩-ux-button');

// Leer información completa
const info = {
  id: button.componentId,
  category: button.category,
  title: button.title,
  api: button.contract.api,
  examples: button.contract.examples,
  variants: button.contract.variants,
  events: button.contract.events,
  dependencies: {
    required: button.contract.dependsOn?.required || [],
    optional: button.contract.dependsOn?.optional || [],
  },
};
```

---

## 💡 Usar Ejemplos de Código

### Acceder a Ejemplos

```typescript
const button = findComponentById('🧩-ux-button');

// Obtener ejemplo básico
const basicExample = button.contract.examples?.basic;
// Resultado: 'window.UBITS.Button.create({ variant: "primary", text: "Click me" });'

// Obtener ejemplo con icono
const withIconExample = button.contract.examples?.withIcon;

// Listar todos los ejemplos disponibles
const allExamples = Object.entries(button.contract.examples || {});
// [['basic', '...'], ['withIcon', '...'], ['disabled', '...']]
```

### Usar Ejemplos para Generar Código

```typescript
function generateComponentCode(componentId: string, exampleKey: string = 'basic') {
  const component = findComponentById(componentId);
  if (!component) return null;
  
  const example = component.contract.examples?.[exampleKey];
  if (!example) return null;
  
  // El ejemplo ya es código JavaScript válido
  return example;
}

// Uso
const code = generateComponentCode('🧩-ux-button', 'basic');
// Retorna: 'window.UBITS.Button.create({ variant: "primary", text: "Click me" });'
```

---

## 🔗 Entender Dependencias

### Verificar Dependencias Requeridas

```typescript
const modal = findComponentById('⚙️-functional-modal');

// Ver qué componentes requiere
const required = modal.contract.dependsOn?.required;
// ['🧩-ux-button']

// Esto significa que Modal DEBE incluir Button en el footer
```

### Verificar Dependencias Opcionales

```typescript
const button = findComponentById('🧩-ux-button');

// Ver qué componentes puede usar opcionalmente
const optional = button.contract.dependsOn?.optional;
// ['🧩-ux-icon', '🧩-ux-tooltip']

// Esto significa que Button PUEDE incluir iconos y tooltips
```

### Verificar Slots Disponibles

```typescript
const dataTable = findComponentById('🧩-ux-data-table');

// Ver qué slots tiene y qué acepta cada uno
const slots = dataTable.contract.slots;
// {
//   header: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-search-button'],
//   footer: ['🧩-ux-pagination']
// }

// Esto significa que:
// - header acepta Button, Input o SearchButton
// - footer acepta Pagination
```

### Verificar Componentes Internos

```typescript
const modal = findComponentById('⚙️-functional-modal');

// Ver qué componentes internos tiene
const internals = modal.contract.internals;
// ['⚙️-functional-scroll', '⚙️-functional-overlay']

// Esto significa que NO debes crear tu propio scroll o overlay
// El Modal ya los incluye internamente
```

---

## ✅ Validar Implementaciones

### Validar Props Requeridas

```typescript
function validateComponentProps(componentId: string, props: Record<string, any>) {
  const component = findComponentById(componentId);
  if (!component) return { valid: false, error: 'Component not found' };
  
  const requiredProps = component.contract.rules?.requiredProps || [];
  const missing = requiredProps.filter(prop => !(prop in props));
  
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required props: ${missing.join(', ')}`,
      missing,
    };
  }
  
  return { valid: true };
}

// Uso
const result = validateComponentProps('🧩-ux-button', { variant: 'primary' });
// { valid: false, error: 'Missing required props: text', missing: ['text'] }
```

### Validar Uso de Tokens

```typescript
function validateTokens(code: string, componentId: string) {
  const component = findComponentById(componentId);
  if (!component) return { valid: false };
  
  const tokensUsed = component.contract.tokensUsed || [];
  const forbiddenPatterns = component.contract.rules?.forbiddenPatterns || [];
  
  // Verificar que no hay colores hardcodeados
  const hasHardcodedColors = forbiddenPatterns.some(pattern => 
    code.includes(pattern)
  );
  
  if (hasHardcodedColors) {
    return {
      valid: false,
      error: 'Code contains hardcoded colors',
      suggestion: `Use tokens: ${tokensUsed.slice(0, 3).join(', ')}...`,
    };
  }
  
  return { valid: true };
}
```

### Validar Dependencias

```typescript
function validateDependencies(componentId: string, usedComponents: string[]) {
  const component = findComponentById(componentId);
  if (!component) return { valid: false };
  
  const required = component.contract.dependsOn?.required || [];
  const missing = required.filter(dep => !usedComponents.includes(dep));
  
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required dependencies: ${missing.join(', ')}`,
      missing,
    };
  }
  
  return { valid: true };
}
```

---

## 🔄 Flujo de Trabajo Recomendado

### Paso 1: Buscar el Componente

```typescript
import { findComponentById } from './componentIndex';

const component = findComponentById('🧩-ux-button');
if (!component) {
  throw new Error('Component not found');
}
```

### Paso 2: Leer el Contrato

```typescript
const contract = component.contract;

// Verificar qué necesitas
const requiredDeps = contract.dependsOn?.required || [];
const requiredProps = contract.rules?.requiredProps || [];
const examples = contract.examples || {};
```

### Paso 3: Usar Ejemplos como Base

```typescript
// Obtener ejemplo básico
const baseCode = examples.basic;

// Modificar según necesidades
const customCode = baseCode.replace(
  'variant: "primary"',
  'variant: "secondary"'
);
```

### Paso 4: Verificar Variantes Disponibles

```typescript
const variants = contract.variants || {};

// Ver qué variantes están disponibles
const availableVariants = variants.variant || [];
// ['primary', 'secondary', 'tertiary']

// Validar que la variante elegida existe
if (!availableVariants.includes('custom')) {
  // Usar una variante válida
}
```

### Paso 5: Implementar con Dependencias

```typescript
// Si el componente requiere otros componentes
if (requiredDeps.length > 0) {
  // Implementar primero las dependencias
  requiredDeps.forEach(depId => {
    const dep = findComponentById(depId);
    // Implementar dependencia
  });
}

// Luego implementar el componente principal
```

### Paso 6: Validar la Implementación

```typescript
// Validar props
const propsValid = validateComponentProps(componentId, props);

// Validar tokens
const tokensValid = validateTokens(generatedCode, componentId);

// Validar dependencias
const depsValid = validateDependencies(componentId, usedComponents);

if (propsValid.valid && tokensValid.valid && depsValid.valid) {
  // Implementación válida
}
```

---

## 📚 Ejemplos Prácticos

### Ejemplo 1: Implementar Button Simple

```typescript
import { findComponentById } from './componentIndex';

// 1. Buscar componente
const button = findComponentById('🧩-ux-button');

// 2. Obtener ejemplo básico
const code = button.contract.examples?.basic;
// 'window.UBITS.Button.create({ variant: "primary", text: "Click me" });'

// 3. Usar el código directamente
eval(code); // O mejor, parsearlo y ejecutarlo de forma segura
```

### Ejemplo 2: Implementar Modal con Dependencias

```typescript
import { findComponentById } from './componentIndex';

// 1. Buscar Modal
const modal = findComponentById('⚙️-functional-modal');

// 2. Verificar dependencias requeridas
const required = modal.contract.dependsOn?.required;
// ['🧩-ux-button']

// 3. Implementar Button primero
const button = findComponentById('🧩-ux-button');
const buttonCode = button.contract.examples?.basic;

// 4. Implementar Modal con Button
const modalCode = modal.contract.examples?.basic;
// El ejemplo ya incluye la configuración de footerButtons
```

### Ejemplo 3: Implementar DataTable Completo

```typescript
import { findComponentById } from './componentIndex';

// 1. Buscar DataTable
const dataTable = findComponentById('🧩-ux-data-table');

// 2. Ver slots disponibles
const slots = dataTable.contract.slots;
// { header: ['🧩-ux-button', '🧩-ux-input'], footer: ['🧩-ux-pagination'] }

// 3. Implementar componentes para slots
const button = findComponentById('🧩-ux-button');
const input = findComponentById('🧩-ux-input');
const pagination = findComponentById('🧩-ux-pagination');

// 4. Componer DataTable con sus slots
const dataTableCode = dataTable.contract.examples?.withHeader;
// Ya incluye la configuración de header y footer
```

---

## 🎯 Mejores Prácticas para AutoRun

### 1. Siempre Verificar que el Componente Existe

```typescript
const component = findComponentById(componentId);
if (!component) {
  // Manejar error
  return;
}
```

### 2. Usar Ejemplos como Punto de Partida

```typescript
// ✅ BIEN: Usar ejemplo y modificar
const baseExample = component.contract.examples?.basic;
const customCode = modifyExample(baseExample, customProps);

// ❌ MAL: Crear código desde cero sin ver el ejemplo
```

### 3. Validar Dependencias Antes de Implementar

```typescript
// Verificar que todas las dependencias están disponibles
const required = component.contract.dependsOn?.required || [];
for (const depId of required) {
  if (!findComponentById(depId)) {
    throw new Error(`Missing dependency: ${depId}`);
  }
}
```

### 4. Respetar Slots

```typescript
// Solo insertar componentes permitidos en cada slot
const slots = component.contract.slots;
if (slots.header && !slots.header.includes(componentIdToInsert)) {
  // No insertar este componente en header
}
```

### 5. No Re-implementar Internals

```typescript
// Si un componente tiene internals, no intentar re-implementarlos
const internals = component.contract.internals || [];
// Estos componentes ya están incluidos, no los crees manualmente
```

### 6. Usar Tokens del Contrato

```typescript
// Usar tokens listados en el contrato
const tokensUsed = component.contract.tokensUsed || [];
// Preferir estos tokens sobre otros
```

---

## 🔧 Utilidades Adicionales

### Exportar Índice como JSON

```typescript
import { exportIndexAsJSON } from './componentIndex';

const json = exportIndexAsJSON();
// Útil para herramientas externas o análisis
```

### Validar ComponentId

```typescript
import { isValidComponentId } from './componentIndex';

if (isValidComponentId('🧩-ux-button')) {
  // Componente válido
}
```

### Obtener Información Básica

```typescript
import { getComponentCategory, getComponentTitle } from './componentIndex';

const category = getComponentCategory('🧩-ux-button');
const title = getComponentTitle('🧩-ux-button');
```

---

## 📚 Recursos Adicionales

- [Patrones de Composición](./COMPOSITION-PATTERNS.md)
- [Guía de Campos Extendidos](./CAMPOS-EXTENDIDOS-GUIA.md)
- [Índice de Componentes](./componentIndex.ts)
- [Contrato UBITS](./ubitsContract.ts)

---

**Última actualización:** Diciembre 2024
