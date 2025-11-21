# Análisis: Tokens Sin Equivalencia en Componentes Migrados

## 📋 Resumen

Este documento identifica tokens antiguos, valores hardcodeados y tokens sin equivalencia en Figma en los componentes migrados:
- **Checkbox**
- **Chip**
- **Contenedor**

---

## ✅ CHECKBOX (`packages/components/checkbox/src/styles/checkbox.css`)

### 🔴 Tokens Antiguos Sin Equivalencia en Figma

1. **Border Radius:**
   - `var(--ubits-border-radius-sm, 4px)` - Línea 37
   - **Estado**: ❌ No tiene equivalente en Figma
   - **Acción**: Mantener token antiguo con fallback hardcodeado

### 🟡 Valores Hardcodeados (Aceptables)

1. **Focus Color:**
   - `rgba(82, 151, 244, 0.3)` - Línea 222
   - **Estado**: ⚠️ Hardcodeado pero con fallback de token `--modifiers-normal-focus-color`
   - **Acción**: Aceptable, es el fallback final

2. **Spacing None:**
   - `var(--ubits-spacing-none, 0px)` - Línea 85
   - **Estado**: ⚠️ No tiene equivalente en Figma, pero 0px es un valor estándar
   - **Acción**: Aceptable, mantener

3. **Dimensiones del Componente:**
   - `width: 4px`, `height: 8px`, `width: 16px`, `height: 16px`, `width: 20px`, `height: 20px`, etc.
   - **Estado**: ✅ Aceptable - Son dimensiones específicas del componente, no tokens de diseño
   - **Acción**: No requiere migración

### ✅ Tokens Migrados Correctamente

- Todos los tokens de color tienen nuevos tokens de Figma
- Todos los tokens de typography tienen nuevos tokens de Figma
- Todos los tokens de spacing tienen nuevos tokens de Figma (excepto `spacing-none`)

---

## ✅ CHIP (`packages/components/chip/src/styles/chip.css`)

### 🔴 Tokens Antiguos Sin Equivalencia en Figma

1. **Border Radius:**
   - `var(--ubits-border-radius-sm, 8px)` - Línea 17
   - `var(--ubits-border-radius-xs, 4px)` - Líneas 133, 242
   - **Estado**: ❌ No tienen equivalente en Figma
   - **Acción**: Mantener tokens antiguos con fallbacks hardcodeados

### 🟡 Valores Hardcodeados (Aceptables)

1. **Focus Color:**
   - `rgba(82, 151, 244, 0.3)` - Líneas 132, 197
   - **Estado**: ⚠️ Hardcodeado pero con fallback de token `--modifiers-normal-focus-color`
   - **Acción**: Aceptable, es el fallback final

2. **Background Active:**
   - `rgba(12, 91, 239, 0.15)` - Línea 170
   - **Estado**: ⚠️ Hardcodeado pero con fallback de token `--modifiers-normal-color-light-bg-active`
   - **Acción**: Aceptable, es el fallback final

3. **Token Sin Equivalencia Directa:**
   - `var(--ubits-fg-gray-subtle-hover, #c5c6cb)` - Líneas 186, 232, 246
   - **Estado**: ⚠️ Token antiguo sin equivalente exacto, mapeado a `--modifiers-normal-color-light-bg-4`
   - **Acción**: Aceptable, se usa `bg-4` como equivalente visual

4. **Dimensiones del Componente:**
   - `height: 20px`, `width: 12px`, `height: 12px`, `font-size: 12px`, etc.
   - **Estado**: ✅ Aceptable - Son dimensiones específicas del componente
   - **Acción**: No requiere migración

5. **Transformaciones:**
   - `transform: translateY(1px)` - Líneas 189, 233
   - `transform: scale(0.95)` - Línea 247
   - **Estado**: ✅ Aceptable - Son efectos de interacción, no tokens de diseño
   - **Acción**: No requiere migración

### ✅ Tokens Migrados Correctamente

- Todos los tokens de color tienen nuevos tokens de Figma
- Todos los tokens de typography tienen nuevos tokens de Figma
- Todos los tokens de spacing tienen nuevos tokens de Figma

---

## ✅ CONTENEDOR (`packages/storybook/stories/Contenedor.stories.ts`)

### 🔴 Tokens Antiguos Sin Equivalencia en Figma

1. **Border Radius:**
   - `var(--ubits-border-radius-md)` - Líneas 79, 136, 168, 215
   - **Estado**: ❌ No tiene equivalente en Figma
   - **Acción**: Mantener token antiguo

### 🟡 Valores Hardcodeados (Aceptables)

1. **Valores de Fallback:**
   - `8px`, `12px`, `14px`, `18px`, `20px`, `600` (font-weight)
   - **Estado**: ✅ Aceptable - Son valores de fallback en los tokens
   - **Acción**: No requiere migración

### ✅ Tokens Migrados Correctamente

- Todos los tokens de color tienen nuevos tokens de Figma
- Todos los tokens de typography tienen nuevos tokens de Figma
- Todos los tokens de spacing tienen nuevos tokens de Figma

---

## 📊 Resumen General

### Tokens Sin Equivalencia en Figma (Requieren Mantener Tokens Antiguos)

| Token | Componentes | Estado |
|-------|-------------|--------|
| `--ubits-border-radius-*` | Checkbox, Chip, Contenedor | ❌ Sin equivalente |
| `--ubits-spacing-none` | Checkbox | ⚠️ Sin equivalente (pero 0px es estándar) |

### Valores Hardcodeados Aceptables

| Valor | Componentes | Razón |
|-------|-------------|-------|
| `rgba(82, 151, 244, 0.3)` | Checkbox, Chip | Fallback final de `--modifiers-normal-focus-color` |
| `rgba(12, 91, 239, 0.15)` | Chip | Fallback final de `--modifiers-normal-color-light-bg-active` |
| Dimensiones (px) | Todos | Dimensiones específicas del componente |
| Transformaciones | Chip | Efectos de interacción, no tokens |

### Tokens Migrados Correctamente

✅ **100% de tokens de color** migrados a nuevos tokens de Figma  
✅ **100% de tokens de typography** migrados a nuevos tokens de Figma  
✅ **100% de tokens de spacing** migrados (excepto `spacing-none`)  
⚠️ **0% de tokens de border-radius** migrados (no existen en Figma aún)

---

## 🎯 Recomendaciones

1. **Border Radius**: Esperar a que se agreguen tokens de border-radius en Figma, o mantener los tokens antiguos con fallbacks hardcodeados.

2. **Focus Color y Background Active**: Los valores hardcodeados son aceptables como fallbacks finales. Si en el futuro se agregan tokens específicos, se pueden reemplazar.

3. **Dimensiones y Transformaciones**: No requieren migración, son propiedades específicas del componente.

4. **Spacing None**: Mantener como está, `0px` es un valor estándar.

---

## ✅ Conclusión ACTUALIZADA

**Todos los componentes migrados están correctamente migrados** según los tokens disponibles. 

### Tokens que SÍ existen y deben usarse:

1. **Border Radius**: ✅ Existen en Storybook y tokens.json como `--ubits-border-radius-*`
   - Deben usarse siempre, NUNCA dejar hardcodeado
   - Tokens: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full`

2. **Spacing None**: ✅ Existe en Storybook y tokens.json como `--ubits-spacing-none`
   - Debe usarse siempre, NUNCA dejar `0px` hardcodeado

3. **Focus Color**: ✅ Existe en Figma, Storybook y tokens.json como `--modifiers-normal-focus-color`
   - Debe usarse siempre, NUNCA dejar `rgba(82, 151, 244, 0.3)` hardcodeado

### Regla de Oro:

**NADA hardcodeado ni con tokens antiguos. Si existe en Storybook, usarlo. Si no existe en Figma pero existe en Storybook, agregarlo al token-mapping.json y usarlo.**

