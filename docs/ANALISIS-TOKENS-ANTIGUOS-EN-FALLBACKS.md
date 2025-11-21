# Análisis: Tokens Antiguos en Fallbacks

## 📊 Resumen

De los 5 componentes migrados (Button, Accordion, Alert, Badge), **todos tienen tokens antiguos en los fallbacks** (segundo nivel). Algunos de estos tokens **SÍ tienen equivalentes en Figma** y pueden eliminarse del fallback, mientras que otros **NO tienen equivalentes** y deben mantenerse.

## ✅ Tokens que SÍ tienen equivalentes en Figma (pueden eliminarse del fallback)

### 1. **Spacing y Border-Radius**
❌ **NO tienen equivalentes en Figma**
- `--ubits-spacing-*` (xs, sm, md, lg, xl, none)
- `--ubits-border-radius-*` (xs, sm, md, lg, xl, full)

**Decisión**: Mantener en sistema antiguo (correcto)

### 2. **Tokens de Color con Equivalentes en Figma**

#### Button Component:
- ✅ `--ubits-button-primary-bg-default` → `--modifiers-normal-button-color-light-brand-primary-bg-default`
- ✅ `--ubits-button-primary-hover` → `--modifiers-normal-button-color-light-brand-primary-bg-hover`
- ✅ `--ubits-button-primary-pressed` → `--modifiers-normal-button-color-light-brand-primary-bg-pressed`
- ✅ `--ubits-bg-disabled-button` → `--modifiers-normal-color-light-bg-disabled`
- ✅ `--ubits-fg-on-disabled-button` → `--modifiers-normal-color-light-fg-on-disabled`
- ✅ `--ubits-border-disabled-button` → `--modifiers-normal-color-light-border-disabled`
- ✅ `--ubits-bg-1` → `--modifiers-normal-color-light-bg-1`
- ✅ `--ubits-accent-brand` → `--modifiers-normal-color-light-accent-brand`
- ✅ `--ubits-bg-active-button` → `--modifiers-normal-color-light-bg-active`
- ✅ `--ubits-button-badge` → `--modifiers-normal-color-light-feedback-accent-error`

#### Accordion Component:
- ✅ `--ubits-bg-1` → `--modifiers-normal-color-light-bg-1`
- ✅ `--ubits-bg-2` → `--modifiers-normal-color-light-bg-2`
- ✅ `--ubits-border-1` → `--modifiers-normal-color-light-border-1`
- ✅ `--ubits-fg-1-high` → `--modifiers-normal-color-light-fg-1-high`
- ✅ `--ubits-fg-1-medium` → `--modifiers-normal-color-light-fg-1-medium`

#### Alert Component:
- ✅ `--ubits-bg-2` → `--modifiers-normal-color-light-bg-2`
- ✅ `--ubits-fg-1-medium` → `--modifiers-normal-color-light-fg-1-medium`
- ✅ `--ubits-feedback-bg-success-subtle` → `--modifiers-normal-color-light-feedback-bg-success-subtle-default`
- ✅ `--ubits-feedback-fg-success-subtle` → `--modifiers-normal-color-light-feedback-fg-success-subtle-default`
- ✅ `--ubits-feedback-border-success` → `--modifiers-normal-color-light-feedback-border-success`
- ✅ `--ubits-feedback-bg-info-subtle` → `--modifiers-normal-color-light-feedback-bg-info-subtle-default`
- ✅ `--ubits-feedback-fg-info-subtle` → `--modifiers-normal-color-light-feedback-fg-info-subtle-default`
- ✅ `--ubits-feedback-border-info` → `--modifiers-normal-color-light-feedback-border-info`
- ✅ `--ubits-feedback-bg-warning-subtle` → `--modifiers-normal-color-light-feedback-bg-warning-subtle-default`
- ✅ `--ubits-feedback-fg-warning-subtle` → `--modifiers-normal-color-light-feedback-fg-warning-subtle-default`
- ✅ `--ubits-feedback-border-warning` → `--modifiers-normal-color-light-feedback-border-warning`
- ✅ `--ubits-feedback-bg-error-subtle` → `--modifiers-normal-color-light-feedback-bg-error-subtle-default`
- ✅ `--ubits-feedback-fg-error-subtle` → `--modifiers-normal-color-light-feedback-fg-error-subtle-default`
- ✅ `--ubits-feedback-border-error` → `--modifiers-normal-color-light-feedback-border-error`

#### Badge Component:
- ✅ `--ubits-fg-on-accent` → `--modifiers-normal-color-light-fg-on-accent`
- ✅ `--ubits-button-badge` → `--modifiers-normal-color-light-feedback-accent-error`
- ✅ `--ubits-fg-1-high` → `--modifiers-normal-color-light-fg-1-high`
- ✅ `--ubits-fg-1-medium` → `--modifiers-normal-color-light-fg-1-medium`
- ✅ `--ubits-border-1` → `--modifiers-normal-color-light-border-1`
- ✅ `--ubits-feedback-accent-success` → `--modifiers-normal-color-light-feedback-accent-success`
- ✅ `--ubits-feedback-accent-warning` → `--modifiers-normal-color-light-feedback-accent-warning`
- ✅ `--ubits-feedback-accent-error` → `--modifiers-normal-color-light-feedback-accent-error`
- ✅ `--ubits-feedback-accent-info` → `--modifiers-normal-color-light-feedback-accent-info`

## ❌ Tokens que NO tienen equivalentes en Figma (deben mantenerse en fallback)

### Button Component:
- ❌ `--ubits-btn-primary-fg` → No tiene equivalente exacto (mantener)
- ❌ `--ubits-button-focus-ring` → No tiene equivalente exacto (mantener)
- ❌ `--ubits-accent-brand-static-inverted` → No tiene equivalente exacto (mantener)

### Alert Component:
- ❌ `--ubits-button-focus-ring` → No tiene equivalente exacto (mantener)

## 🎯 Plan de Acción

### Opción 1: Eliminar fallbacks antiguos (Recomendado)
**Para tokens que SÍ tienen equivalentes en Figma**, podemos eliminar el fallback antiguo y dejar solo el token nuevo con un fallback hardcodeado:

```css
/* ANTES */
color: var(--modifiers-normal-color-light-fg-1-high, var(--ubits-fg-1-high, #303a47)) !important;

/* DESPUÉS */
color: var(--modifiers-normal-color-light-fg-1-high, #303a47) !important;
```

**Ventajas**:
- Código más limpio
- Elimina dependencia de tokens antiguos
- Si el token nuevo falla, usa el valor hardcodeado directamente

**Desventajas**:
- Si el token nuevo cambia de nombre, el fallback hardcodeado no se actualiza automáticamente

### Opción 2: Mantener fallbacks antiguos (Actual)
**Mantener el sistema de 3 niveles** para máxima compatibilidad:

```css
color: var(--modifiers-normal-color-light-fg-1-high, var(--ubits-fg-1-high, #303a47)) !important;
```

**Ventajas**:
- Máxima compatibilidad
- Si el token nuevo falla, intenta el antiguo antes del hardcodeado
- Transición más suave

**Desventajas**:
- Código más verboso
- Mantiene dependencia de tokens antiguos

## 📝 Recomendación

**Recomendamos la Opción 1** para tokens que tienen equivalentes confirmados en Figma, porque:
1. Los tokens nuevos de Figma son la fuente de verdad
2. Simplifica el código
3. El fallback hardcodeado es suficiente si el token nuevo falla

**Mantener la Opción 2** solo para tokens que NO tienen equivalentes en Figma (como `--ubits-button-focus-ring`, `--ubits-btn-primary-fg`, etc.)

## 🔄 Próximos Pasos

1. Crear un script que identifique tokens antiguos en fallbacks
2. Verificar que cada token antiguo tenga equivalente en Figma
3. Eliminar fallbacks antiguos para tokens con equivalentes
4. Mantener fallbacks antiguos solo para tokens sin equivalentes
5. Actualizar todos los componentes migrados

