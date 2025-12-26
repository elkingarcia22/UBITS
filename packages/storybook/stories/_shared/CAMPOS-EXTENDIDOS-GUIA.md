# 📚 Guía: Campos Extendidos del Contrato UBITS

Esta guía explica cómo usar los nuevos campos extendidos (`examples`, `variants`, `events`) en los contratos UBITS para mejorar la información disponible para AutoRun/Cursor.

## 🎯 Propósito

Los campos extendidos proporcionan información adicional que ayuda a AutoRun/Cursor a:
- ✅ Entender mejor cómo usar cada componente
- ✅ Ver ejemplos de código canónicos
- ✅ Conocer todas las variantes disponibles
- ✅ Saber qué eventos emite cada componente

## 📋 Campos Disponibles

### 1. `examples` - Ejemplos de Código

**Tipo:** `ComponentExamples` (objeto con strings)

**Propósito:** Proporcionar ejemplos de código canónicos que AutoRun puede usar como referencia.

**Estructura:**
```typescript
examples: {
  basic: 'window.UBITS.Button.create({...})',
  withIcon: 'window.UBITS.Button.create({...})',
  disabled: 'window.UBITS.Button.create({...})',
}
```

**Ejemplo de uso:**
```typescript
examples: {
  basic: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Click me\'\n});',
  withIcon: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Save\',\n  icon: \'save\',\n  iconPosition: \'left\'\n});',
}
```

**⚠️ IMPORTANTE:**
- Usa strings directos, NO uses `createExactSnippet()` en tiempo de compilación
- Los strings deben ser código JavaScript válido
- Usa `\n` para saltos de línea
- Escapa comillas simples dentro del string

### 2. `variants` - Variantes Disponibles

**Tipo:** `ComponentVariants` (objeto con arrays de strings)

**Propósito:** Listar todas las variantes disponibles para cada propiedad del componente.

**Estructura:**
```typescript
variants: {
  variant: ['primary', 'secondary', 'tertiary'],
  size: ['xs', 'sm', 'md', 'lg'],
  state: ['default', 'hover', 'active', 'disabled'],
}
```

**Ejemplo de uso:**
```typescript
variants: {
  variant: ['primary', 'secondary', 'tertiary'],
  size: ['xs', 'sm', 'md', 'lg'],
  type: ['text', 'email', 'password', 'number'],
}
```

**Mejores prácticas:**
- Incluye TODAS las variantes disponibles
- Mantén el orden lógico (de menor a mayor, o alfabético)
- Usa los mismos valores que están en los `argTypes`

### 3. `events` - Eventos del Componente

**Tipo:** `Record<string, ComponentEvent>`

**Propósito:** Documentar qué eventos emite el componente y su estructura.

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

**Ejemplo de uso:**
```typescript
events: {
  onClick: {
    type: 'MouseEvent',
    description: 'Emitted when button is clicked',
    payload: {
      target: 'HTMLElement',
      timestamp: 'number',
    },
  },
  onChange: {
    type: 'Event',
    description: 'Emitted when input value changes',
    payload: {
      value: 'string',
      previousValue: 'string',
    },
  },
}
```

**Tipos de eventos comunes:**
- `MouseEvent` - Eventos de mouse (click, hover, etc.)
- `FocusEvent` - Eventos de foco (focus, blur)
- `KeyboardEvent` - Eventos de teclado (keydown, keyup)
- `Event` - Eventos genéricos
- `CustomEvent` - Eventos personalizados

## 📝 Ejemplo Completo

```typescript
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
  // ... otros campos ...
  
  // ⭐ CAMPOS EXTENDIDOS
  examples: {
    basic: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Click me\'\n});',
    withIcon: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Save\',\n  icon: \'save\',\n  iconPosition: \'left\'\n});',
    disabled: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Disabled\',\n  disabled: true\n});',
  },
  variants: {
    variant: ['primary', 'secondary', 'tertiary'],
    size: ['xs', 'sm', 'md', 'lg'],
    state: ['default', 'hover', 'active', 'disabled'],
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when button is clicked',
    },
    onFocus: {
      type: 'FocusEvent',
      description: 'Emitted when button receives focus',
    },
    onBlur: {
      type: 'FocusEvent',
      description: 'Emitted when button loses focus',
    },
  },
}),
```

## ✅ Checklist para Agregar Campos Extendidos

- [ ] **Examples**: Agregar al menos 2-3 ejemplos (basic, con variante común, edge case)
- [ ] **Variants**: Listar todas las variantes de propiedades importantes
- [ ] **Events**: Documentar todos los eventos que emite el componente
- [ ] **Validar**: Verificar que no hay errores de sintaxis
- [ ] **Probar**: Verificar que Storybook carga sin errores

## 🚨 Errores Comunes

### ❌ Error: Usar `createExactSnippet()` en tiempo de compilación
```typescript
// ❌ MAL - Puede causar error 500
examples: {
  basic: createExactSnippet('Button', { variant: 'primary' }),
}

// ✅ BIEN - Usar string directo
examples: {
  basic: 'window.UBITS.Button.create({\n  variant: \'primary\'\n});',
}
```

### ❌ Error: Olvidar escapar comillas
```typescript
// ❌ MAL
examples: {
  basic: 'window.UBITS.Button.create({ text: "Click me" });',
}

// ✅ BIEN
examples: {
  basic: 'window.UBITS.Button.create({ text: \'Click me\' });',
}
```

### ❌ Error: Variantes inconsistentes
```typescript
// ❌ MAL - No coincide con argTypes
variants: {
  size: ['small', 'medium', 'large'], // argTypes dice ['xs', 'sm', 'md']
}

// ✅ BIEN - Coincide con argTypes
variants: {
  size: ['xs', 'sm', 'md', 'lg'],
}
```

## 📚 Componentes con Campos Extendidos Implementados

- ✅ Button
- ✅ Input
- ✅ Modal
- ✅ DataTable

## 🔄 Próximos Pasos

1. Agregar campos extendidos a componentes restantes
2. Actualizar el índice de componentes con esta información
3. Usar esta información en el script de validación

---

**Última actualización:** Diciembre 2024
