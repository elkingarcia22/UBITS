# Problema y Solución: Dark Mode con Tokens de Figma

## 🚨 Problema Identificado

Los componentes migrados usan tokens con `-light-` hardcodeados en sus nombres (ej: `--modifiers-normal-color-light-fg-1-high`), lo que causa que **NO cambien automáticamente en dark mode**.

### Síntomas

- Los componentes se ven correctos en light mode
- En dark mode, los componentes mantienen los colores de light mode
- Los tokens de dark mode (`--modifiers-normal-color-dark-*`) existen pero no se usan

### Causa Raíz

Los tokens de Figma tienen nombres específicos para cada modo:
- Light mode: `--modifiers-normal-color-light-*`
- Dark mode: `--modifiers-normal-color-dark-*`

Los componentes migrados usan tokens con `-light-` directamente en las propiedades CSS, por lo que siempre usan los valores de light mode, incluso cuando `[data-theme="dark"]` está activo.

---

## ✅ Solución Implementada

### Estrategia: Redefinir Variables CSS en Dark Mode

En lugar de cambiar todas las referencias de `-light-` a `-dark-` en cada componente, redefinimos las variables CSS dentro de `[data-theme="dark"]` para que apunten a los tokens dark.

### Implementación

#### 1. Script Automático (`fix-dark-mode-tokens.cjs`)

El script:
1. Busca todos los tokens con `-light-` usados en el componente
2. Crea un mapeo de tokens light → dark
3. Agrega reglas `[data-theme="dark"]` que redefinen las variables CSS

**Ejemplo de salida:**
```css
[data-theme="dark"] {
  --modifiers-normal-color-light-fg-1-high: var(--modifiers-normal-color-dark-fg-1-high);
  --modifiers-normal-color-light-bg-1: var(--modifiers-normal-color-dark-bg-1);
  --modifiers-normal-button-color-light-brand-primary-bg-default: var(--modifiers-normal-button-color-dark-brand-primary-bg-default);
  /* ... etc ... */
}
```

#### 2. Correcciones Manuales

Algunos casos específicos requieren correcciones manuales:
- Reglas específicas dentro de `[data-theme="dark"]` que aún usan tokens `-light-`
- Estados hover/active que necesitan tokens `-dark-` explícitos

**Ejemplo:**
```css
/* ❌ INCORRECTO */
[data-theme="dark"] .ubits-button--active {
  color: var(--modifiers-normal-color-light-accent-brand) !important;
}

/* ✅ CORRECTO */
[data-theme="dark"] .ubits-button--active {
  color: var(--modifiers-normal-color-dark-accent-brand) !important;
}
```

---

## 📋 Componentes Corregidos

| Componente | Reglas Agregadas | Estado |
|------------|------------------|--------|
| Accordion | 5 | ✅ |
| Alert | 14 | ✅ |
| Avatar | 4 | ✅ |
| Badge | 10 | ✅ |
| Bar Metric Card | 6 | ✅ |
| Breadcrumb | 4 | ✅ |
| Button | 20 + correcciones manuales | ✅ |
| CSAT Metric Card | 6 | ✅ |

---

## 🔧 Uso del Script

### Ejecutar el Script

```bash
cd packages/tokens
node scripts/fix-dark-mode-tokens.cjs
```

### Qué Hace el Script

1. **Identifica componentes migrados** (lista hardcodeada en el script)
2. **Busca tokens `-light-`** en cada archivo CSS
3. **Crea mapeo light → dark** para cada token encontrado
4. **Agrega reglas `[data-theme="dark"]`** que redefinen las variables
5. **Mantiene reglas existentes** si ya existen

### Agregar Nuevos Componentes

Para agregar un nuevo componente al script, editar `packages/tokens/scripts/fix-dark-mode-tokens.cjs`:

```javascript
const COMPONENTS = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'bar-metric-card',
  'breadcrumb',
  'button',
  'csat-metric-card',
  'nuevo-componente', // ← Agregar aquí
];
```

---

## ⚠️ Verificaciones Post-Corrección

### 1. Verificar que las Reglas se Agregaron

```bash
# Buscar reglas [data-theme="dark"] en el componente
grep -A 10 '\[data-theme="dark"\]' packages/components/[COMPONENTE]/src/styles/*.css
```

### 2. Verificar que los Tokens Dark Existen

```bash
# Buscar tokens dark en figma-tokens.css
grep "modifiers-normal-color-dark-fg-1-high" packages/tokens/dist/figma-tokens.css
```

### 3. Verificar Visualmente en Storybook

1. Abrir Storybook
2. Cambiar a dark mode
3. Verificar que los componentes muestran colores correctos
4. Verificar todos los estados (hover, active, disabled, etc.)

### 4. Verificar en Consola del Navegador

```javascript
// En consola del navegador (Storybook en dark mode)
const token = '--modifiers-normal-color-dark-fg-1-high';
const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
console.log(`Token: ${token}`);
console.log(`Valor: ${value || 'NO DEFINIDO'}`);
// Debe mostrar un valor hexadecimal (ej: "#edeeef"), NO "NO DEFINIDO"
```

---

## 🎯 Integración en el Proceso de Migración

Este paso debe ejecutarse **después de migrar los tokens** pero **antes de la verificación final**.

### Orden Correcto

1. ✅ Migrar tokens (PASO 2)
2. ✅ Actualizar Storybook (PASO 3)
3. ✅ **Agregar soporte dark mode (NUEVO - PASO 3.5)**
4. ✅ Verificación (PASO 4)
5. ✅ Limpieza (PASO 5)
6. ✅ Documentación (PASO 6)

### Checklist de Dark Mode

- [ ] Ejecutar `fix-dark-mode-tokens.cjs` después de migrar tokens
- [ ] Verificar que las reglas `[data-theme="dark"]` se agregaron
- [ ] Verificar que los tokens dark existen en `figma-tokens.css`
- [ ] Probar componente en Storybook en dark mode
- [ ] Verificar todos los estados en dark mode (hover, active, disabled, etc.)
- [ ] Corregir manualmente cualquier regla específica que use tokens `-light-` dentro de `[data-theme="dark"]`

---

## 📝 Notas Técnicas

### Por Qué Esta Solución Funciona

1. **CSS Variables se Redefinen**: Las variables CSS pueden redefinirse en selectores más específicos
2. **Cascada CSS**: `[data-theme="dark"]` tiene mayor especificidad que `:root`
3. **Sin Cambios en Componentes**: No necesitamos cambiar cada referencia individual
4. **Mantenible**: Si agregamos nuevos tokens, solo necesitamos ejecutar el script nuevamente

### Limitaciones

- **Reglas Específicas**: Algunas reglas dentro de `[data-theme="dark"]` pueden necesitar corrección manual
- **Tokens Sin Dark Mode**: Si un token no tiene versión dark, se mantendrá el valor light (comportamiento esperado)

---

## 🔄 Mantenimiento Futuro

### Cuando se Migre un Nuevo Componente

1. Migrar tokens normalmente (PASO 2)
2. Ejecutar `fix-dark-mode-tokens.cjs` (agregar componente a la lista si no está)
3. Verificar dark mode en Storybook
4. Corregir manualmente si es necesario

### Cuando se Agreguen Nuevos Tokens

1. Regenerar `figma-tokens.css`: `cd packages/tokens && node build-css.cjs`
2. Ejecutar `fix-dark-mode-tokens.cjs` para actualizar componentes migrados
3. Verificar que los nuevos tokens funcionan en dark mode

---

**Última actualización**: Diciembre 2024 - Basado en la corrección de dark mode en 8 componentes migrados

