# Pasos Paso a Paso: Migración de un Componente

## 📋 Resumen Ejecutivo

Este documento describe los pasos **exactos** que sigo para migrar un componente del sistema de tokens antiguo (`--ubits-*`) al nuevo sistema de tokens de Figma (`--modifiers-normal-*`).

**Tiempo estimado total**: 4-6 horas por componente

---

## 🚀 Proceso Completo

### **PASO 1: Preparación (30 min)**

#### 1.1 Inventario de Tokens
```bash
# Ejecutar script de inventario
./scripts/inventory-tokens.sh [COMPONENTE]

# Ejemplo:
./scripts/inventory-tokens.sh alert
```

**Qué hace:**
- Identifica **TODOS** los tokens antiguos usados:
  - Tokens de color (`--ubits-*` relacionados con bg, fg, border, accent, button, feedback, chart)
  - Tokens de typography (`--font-*`, `--weight-*`, `--line-height-*`, etc.)
  - Tokens de spacing (`--ubits-spacing-*`)
  - Tokens de border-radius (`--ubits-border-radius-*`)
  - Tokens de effects (`--ubits-*elevation*`, `--ubits-*shadow*`, `--ubits-*focus*`)
- Identifica valores hardcodeados de spacing, border-radius, typography, effects
- Genera un resumen completo con conteos

**Resultado esperado:**
```
📊 INVENTARIO DE TOKENS: alert
   📦 TOKENS EXISTENTES:
      - Tokens de color: 15
      - Tokens de typography: 3
      - Tokens de spacing: 0
      - Tokens de border-radius: 0
      - Tokens de effects: 1
   ⚠️  VALORES HARDCODEADOS:
      - Spacing hardcodeado: 7
      - Border-radius hardcodeado: 3
      - Typography hardcodeado: 0
      - Effects hardcodeado: 0
```

#### 1.2 Backup y Branch
```bash
# Crear backup del CSS
cp packages/components/[COMPONENTE]/src/styles/[COMPONENTE].css \
   packages/components/[COMPONENTE]/src/styles/[COMPONENTE].css.backup.$(date +%s)

# Crear branch
git checkout -b migrate/[COMPONENTE]-tokens
```

#### 1.3 Revisar Storybook
- Abrir `packages/storybook/stories/[COMPONENTE].stories.ts`
- Identificar controladores y estados visuales
- Verificar si usa `data-state-preview` o estilos inline

---

### **PASO 2: Migración Completa de TODOS los Tokens (3-5 horas)**

**🎯 OBJETIVO**: Migrar TODOS los tokens (colores, typography, spacing, border-radius, effects) y eliminar TODOS los valores hardcodeados.

#### 2.1 Migrar Tokens de Color

**Estrategia:**
1. Abrir el archivo CSS del componente
2. Buscar cada token antiguo de color (`var(--ubits-*)` relacionado con bg, fg, border, accent, button, feedback, chart)
3. Reemplazar con el token nuevo de Figma usando el mapeo de `token-mapping.ts`
4. Agregar fallback de 3 niveles: `var(--token-nuevo, var(--token-antiguo, valor-hardcodeado))`
5. Agregar `!important` en propiedades críticas

**Ejemplo:**
```css
/* ANTES */
background: var(--ubits-feedback-bg-success-subtle);

/* DESPUÉS (con fallback durante migración) */
background: var(--modifiers-normal-color-light-feedback-bg-success-subtle-default, var(--ubits-feedback-bg-success-subtle, #f0f9f0)) !important;

/* DESPUÉS (después de limpieza - Fase 5) */
background: var(--modifiers-normal-color-light-feedback-bg-success-subtle-default) !important;
```

**Orden de migración:**
1. Tokens base (default state)
2. Tokens de estados (hover, active, pressed, disabled)
3. Tokens de variantes (si aplica)

#### 2.2 Migrar Tokens de Typography

**🎯 REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos. Si no hay equivalente exacto, buscar el token más parecido de Figma.

**Estrategia:**
1. Buscar tokens antiguos de typography (`--font-*`, `--weight-*`, `--line-height-*`, etc.)
2. Verificar si tienen equivalente exacto en Figma (consultar `figma-tokens.css` o Storybook)
3. **Si tienen equivalente exacto**: Migrar a tokens nuevos de Figma
4. **Si NO tienen equivalente exacto**: 
   - Buscar el token más parecido en Figma (comparar tamaños, características)
   - Usar el token más parecido de Figma
   - Ajustar line-height si es necesario (usar valores relativos como `1.5` o calcular)
   - **NUNCA mantener tokens antiguos ni valores hardcodeados**

**Ejemplo con equivalente exacto:**
```css
/* ANTES */
font-size: var(--font-body-md-size);
font-weight: var(--weight-semibold);
line-height: var(--font-body-md-line);

/* DESPUÉS (si tienen equivalente exacto en Figma) */
font-size: var(--modifiers-normal-body-md-regular-fontsize);
font-weight: var(--modifiers-normal-body-md-semibold-fontweight);
line-height: var(--modifiers-normal-body-md-regular-lineheight);
```

**Ejemplo sin equivalente exacto (usar el más parecido):**
```css
/* ANTES */
font-size: var(--font-body-lg-size); /* 20px */
line-height: var(--font-body-lg-line); /* 30px */

/* DESPUÉS (usar heading-h2 que tiene 20px, el más parecido) */
font-size: var(--modifiers-normal-heading-h2-fontsize); /* 20px - exacto */
line-height: 1.5; /* 30px / 20px = 1.5 (equivalente a 30px) */
/* NOTA: heading-h2 tiene line-height: 100% (20px), pero necesitamos 30px, así que usamos 1.5 */
```

**Valores hardcodeados de typography:**
```css
/* ANTES */
font-size: 14px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0.5px;

/* DESPUÉS */
font-size: var(--modifiers-normal-font-size-1, 14px);
font-weight: var(--modifiers-normal-font-weight-noto-sans-1, 500);
line-height: var(--modifiers-normal-line-height-1, 20px);
letter-spacing: var(--modifiers-normal-letter-spacing-1, 0.5px);
```

#### 2.3 Migrar Tokens de Spacing

**Estrategia:**
1. Buscar tokens antiguos de spacing (`--ubits-spacing-*`)
2. Si existen, mantenerlos (no tienen equivalente en Figma)
3. Migrar valores hardcodeados a tokens antiguos con fallback

**Ejemplo:**
```css
/* ANTES */
gap: 8px;
padding: 12px 16px;
margin: 0;

/* DESPUÉS */
gap: var(--ubits-spacing-sm, 8px);
padding: var(--ubits-spacing-md, 12px) var(--ubits-spacing-lg, 16px);
margin: var(--ubits-spacing-none, 0);
```

**Nota:** Los tokens de spacing NO tienen equivalente en Figma, así que usamos los tokens antiguos con fallback.

#### 2.4 Migrar Tokens de Border-radius

**Estrategia:**
1. Buscar tokens antiguos de border-radius (`--ubits-border-radius-*`)
2. Si existen, mantenerlos (no tienen equivalente en Figma)
3. Migrar valores hardcodeados a tokens antiguos con fallback

**Ejemplo:**
```css
/* ANTES */
border-radius: 8px;
border-radius: 50%;

/* DESPUÉS */
border-radius: var(--ubits-border-radius-sm, 8px);
border-radius: 50%; /* Mantener valores específicos como 50%, inherit, 0 */
```

**Nota:** Los tokens de border-radius NO tienen equivalente en Figma, así que usamos los tokens antiguos con fallback.

#### 2.5 Migrar Tokens de Effects

**Estrategia:**
1. Buscar tokens antiguos de effects (`--ubits-*elevation*`, `--ubits-*shadow*`, `--ubits-*focus*`)
2. Verificar si tienen equivalente en Figma (consultar `figma-tokens.css` o Storybook)
3. Si tienen equivalente, migrar a tokens nuevos de Figma
4. **Si NO tienen equivalente exacto, buscar el token de Figma más parecido y reemplazarlo.**

**Ejemplo con elevation floating (construido desde múltiples tokens):**
```css
/* ANTES */
box-shadow: var(--ubits-elevation-floating); /* 0 14px 28.8px 0 rgba(0, 0, 0, 0.24) */

/* DESPUÉS (construir desde tokens de Figma usando calc()) */
:root {
    --ubits-elevation-floating: calc(var(--modifiers-normal-elevation-floating-0-x) * 1px) calc(var(--modifiers-normal-elevation-floating-0-y) * 1px) calc(var(--modifiers-normal-elevation-floating-0-blur) * 1px) calc(var(--modifiers-normal-elevation-floating-0-spread) * 1px) var(--modifiers-normal-elevation-floating-0-color), calc(var(--modifiers-normal-elevation-floating-1-x) * 1px) calc(var(--modifiers-normal-elevation-floating-1-y) * 1px) calc(var(--modifiers-normal-elevation-floating-1-blur) * 1px) calc(var(--modifiers-normal-elevation-floating-1-spread) * 1px) var(--modifiers-normal-elevation-floating-1-color);
}

.ubits-button--floating {
    box-shadow: var(--ubits-elevation-floating) !important;
}
```

**⚠️ ERRORES COMUNES CON EFFECTS TOKENS:**

**Error 1: Falta de unidades 'px' en valores numéricos**
- **Problema**: Los tokens de Figma devuelven números sin unidades (ej: `14` en lugar de `14px`)
- **Síntoma**: `box-shadow: none` o valores inválidos con `/**/` en el valor
- **Solución**: Usar `calc(var(--token) * 1px)` en lugar de `var(--token)px`
- **❌ INCORRECTO**: `var(--modifiers-normal-elevation-floating-0-y)px` → Genera `14/**/px` (inválido)
- **✅ CORRECTO**: `calc(var(--modifiers-normal-elevation-floating-0-y) * 1px)` → Genera `14px` (válido)

**Error 2: Clase CSS no se agrega con operador `&&`**
- **Problema**: `floating && 'ubits-button--floating'` puede no funcionar correctamente con `filter(Boolean)`
- **Síntoma**: La clase no aparece en el HTML generado aunque `floating: true`
- **Solución**: Usar operador ternario `floating ? 'ubits-button--floating' : null`
- **❌ INCORRECTO**: `floating && 'ubits-button--floating'`
- **✅ CORRECTO**: `floating ? 'ubits-button--floating' : null`

**Valores hardcodeados de effects:**
```css
/* ANTES */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
outline: 2px solid rgba(82, 151, 244, 0.3);

/* DESPUÉS */
box-shadow: calc(var(--modifiers-normal-elevation-default-0-x) * 1px) calc(var(--modifiers-normal-elevation-default-0-y) * 1px) calc(var(--modifiers-normal-elevation-default-0-blur) * 1px) calc(var(--modifiers-normal-elevation-default-0-spread) * 1px) var(--modifiers-normal-elevation-default-0-color);
outline: 2px solid var(--modifiers-normal-focus-color);
```

---

### **PASO 3: Actualizar Storybook con Tokens Nuevos (2-3 horas)**

**🎯 OBJETIVO**: Actualizar controladores y preview para usar SOLO tokens nuevos de Figma.

#### 3.1 Actualizar Controladores con Tokens Nuevos
- Revisar `controls` en `.stories.ts`
- Asegurar que todos los estados sean controlables
- **Actualizar valores de controladores** para usar tokens nuevos de Figma cuando sea posible
- Documentar tokens usados en los controladores

**Ejemplo:**
```typescript
// ANTES (usando valores hardcodeados o tokens antiguos)
controls: {
  variant: {
    control: 'select',
    options: ['success', 'info', 'warning', 'error']
  }
}

// DESPUÉS (usando tokens nuevos de Figma en documentación)
controls: {
  variant: {
    control: 'select',
    options: ['success', 'info', 'warning', 'error'],
    description: 'Usa tokens: --modifiers-normal-color-light-feedback-*-*'
  }
}
```

#### 3.2 Actualizar Preview de Estados con Tokens Nuevos
- Eliminar estilos inline
- Usar `data-state-preview` para simular estados
- Agregar reglas CSS para `data-state-preview` en el archivo CSS del componente
- **Usar SOLO tokens nuevos de Figma** (después de la limpieza - Fase 5)

**Ejemplo:**
```css
/* En el CSS del componente - DESPUÉS de limpieza (Fase 5) */
.ubits-alert[data-state-preview="hover"] {
  background: var(--modifiers-normal-color-light-feedback-bg-info-subtle-hover) !important;
  color: var(--modifiers-normal-color-light-feedback-fg-info-subtle-hover) !important;
  border-color: var(--modifiers-normal-color-light-feedback-border-info) !important;
}
```

#### 3.3 Actualizar Función de Aplicación de Estados
- Asegurar que la función de aplicación de estados use tokens nuevos
- Eliminar cualquier referencia a tokens antiguos en el código TypeScript/JavaScript

**Ejemplo:**
```typescript
// ANTES (puede tener referencias a tokens antiguos)
function applyState(element: HTMLElement, state: string) {
  if (state === 'hover') {
    element.style.background = 'var(--ubits-feedback-bg-info-subtle)'; // ❌ Token antiguo
  }
}

// DESPUÉS (usar solo tokens nuevos)
function applyState(element: HTMLElement, state: string) {
  // Remover estados anteriores
  element.removeAttribute('data-state-preview');
  
  // Limpiar estilos inline
  element.style.removeProperty('background');
  element.style.removeProperty('color');
  
  // Aplicar estado con atributo data (el CSS usa tokens nuevos)
  if (state !== 'default') {
    element.setAttribute('data-state-preview', state);
  }
}
```

#### 3.4 Verificar Visualización con Tokens Nuevos
- Probar todos los estados en Storybook
- Verificar que los colores coinciden con los tokens nuevos de Figma
- Verificar modo dark (usando tokens `-dark-`)
- Verificar responsive
- Verificar todas las variantes
- **Verificar que NO hay referencias a tokens antiguos en el preview**

---

### **PASO 4: Verificación (1 hora)**

#### 4.1 Ejecutar Script de Verificación
```bash
./scripts/verify-migration.sh [COMPONENTE]
```

**Qué verifica:**
- ✅ Tokens antiguos sin migrar
- ✅ Valores hardcodeados de spacing/border-radius
- ✅ Tokens nuevos sin fallback
- ✅ Uso de `!important` en propiedades críticas

#### 4.2 Verificar Tokens en el DOM (CRÍTICO)

**4.2.1 Verificar que los tokens existen en `figma-tokens.css`:**
```bash
# Buscar un token específico usado en el componente
grep "modifiers-normal-color-light-feedback-bg-info-subtle-default" packages/tokens/dist/figma-tokens.css
```

**4.2.2 Verificar que los tokens están en el bloque correcto:**
```bash
# Tokens con 'light' deben estar en :root (líneas 1-3000 aprox.)
sed -n '1,3000p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light" | head -5

# Tokens con 'light' NO deben estar en [data-theme="dark"]
sed -n '3001,$p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
# Debe retornar vacío
```

**4.2.3 Verificar que los tokens están disponibles en el DOM:**
```javascript
// Ejecutar en consola del navegador (Storybook)
const token = '--modifiers-normal-color-light-feedback-bg-info-subtle-default';
const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
console.log(`Token: ${token}`);
console.log(`Valor: ${value || 'NO DEFINIDO'}`);
// Debe mostrar un valor hexadecimal (ej: "#f3f2ff"), NO "NO DEFINIDO"
```

**Si los tokens NO están disponibles:**
1. Regenerar tokens: `cd packages/tokens && node build-css.cjs`
2. Verificar que `build-css.cjs` NO filtre `'light'` o `'dark'` del nombre
3. Recargar Storybook y verificar nuevamente

---

### **PASO 5: Limpieza Final (30 min)**

**🎯 OBJETIVO**: Dejar SOLO tokens nuevos de Figma, sin fallbacks antiguos ni valores hardcodeados.

#### 5.1 Ejecutar Script de Limpieza
```bash
python3 scripts/cleanup-token-fallbacks.py [COMPONENTE]
```

**Qué hace:**
- Elimina fallbacks antiguos (`var(--ubits-*)`) de tokens que SÍ tienen equivalente en Figma
- Elimina valores hardcodeados de TODOS los tipos de tokens (color, typography, effects)
- Mantiene tokens sin equivalente (spacing, border-radius, etc.)

**Antes:**
```css
/* Color */
color: var(--modifiers-normal-color-light-fg-1-high, var(--ubits-fg-1-high, #303a47)) !important;

/* Typography */
font-size: var(--modifiers-normal-font-size-2, var(--font-body-md-size, 16px));

/* Effects */
box-shadow: var(--modifiers-normal-elevation-1-shadow, var(--ubits-elevation-floating, 0 14px 28.8px 0 rgba(0, 0, 0, 0.24)));
```

**Después:**
```css
/* Color - SOLO token nuevo */
color: var(--modifiers-normal-color-light-fg-1-high) !important;

/* Typography - SOLO token nuevo */
font-size: var(--modifiers-normal-font-size-2);

/* Effects - SOLO token nuevo */
box-shadow: var(--modifiers-normal-elevation-1-shadow);
```

#### 5.2 Verificar Limpieza Completa

**5.2.1 Verificar que no queden fallbacks antiguos:**
```bash
# Tokens de color
grep -E "var\(--modifiers-normal-[^,)]+,\s*var\(--ubits-" packages/components/[COMPONENTE]/src/styles/*.css | grep -E "(bg|fg|border|accent|button|feedback|chart)"
# Debe retornar vacío (excepto para tokens sin equivalente)

# Tokens de typography
grep -E "var\(--modifiers-normal-[^,)]+,\s*var\(--(font|weight|line-height)" packages/components/[COMPONENTE]/src/styles/*.css
# Debe retornar vacío (excepto para tokens sin equivalente)

# Tokens de effects
grep -E "var\(--modifiers-normal-[^,)]+,\s*var\(--ubits-(elevation|shadow|focus)" packages/components/[COMPONENTE]/src/styles/*.css
# Debe retornar vacío (excepto para tokens sin equivalente)
```

**5.2.2 Verificar que no queden valores hardcodeados:**
```bash
# Tokens de color
grep -E "var\(--modifiers-normal-[^,)]+,\s*#[0-9a-fA-F]{3,8}\)" packages/components/[COMPONENTE]/src/styles/*.css
grep -E "var\(--modifiers-normal-[^,)]+,\s*rgba\(" packages/components/[COMPONENTE]/src/styles/*.css
# Debe retornar vacío

# Tokens de typography
grep -E "var\(--modifiers-normal-[^,)]+,\s*[0-9]+px\)" packages/components/[COMPONENTE]/src/styles/*.css | grep -E "(font-size|line-height|letter-spacing)"
# Debe retornar vacío

# Tokens de effects
grep -E "var\(--modifiers-normal-[^,)]+,\s*[0-9]" packages/components/[COMPONENTE]/src/styles/*.css | grep -E "(box-shadow|outline)"
# Debe retornar vacío
```

**5.2.3 Verificar que solo queden tokens nuevos:**
```bash
# Verificar tokens de color nuevos
grep -E "var\(--modifiers-normal-color-[^,)]+\)" packages/components/[COMPONENTE]/src/styles/*.css | head -5

# Verificar tokens de typography nuevos
grep -E "var\(--modifiers-normal-(font-size|font-weight|line-height|letter-spacing)-[^,)]+\)" packages/components/[COMPONENTE]/src/styles/*.css | head -5

# Verificar tokens de effects nuevos
grep -E "var\(--modifiers-normal-(elevation|focus)-[^,)]+\)" packages/components/[COMPONENTE]/src/styles/*.css | head -5
```

#### 5.3 Testing Post-Limpieza
- Probar componente en Storybook
- Verificar que todos los estados funcionan
- Verificar modo dark
- Verificar que funciona con `figma-tokens.css` cargado

---

### **PASO 6: Documentación y Commit (30 min)**

#### 6.1 Actualizar Documentación
- Actualizar `README.md` del componente
  - Indicar que requiere `figma-tokens.css` y `tokens.css`
  - Documentar tokens sin equivalente (si los hay)

#### 6.2 Commit
```bash
git add packages/components/[COMPONENTE]/
git commit -m "feat([COMPONENTE]): migrar TODOS los tokens a sistema Figma

- Migrar tokens de color (X tokens) - SOLO tokens nuevos de Figma
- Migrar tokens de typography (X tokens) - SOLO tokens nuevos de Figma
- Migrar tokens de effects (X tokens) - SOLO tokens nuevos de Figma
- Migrar valores hardcodeados de spacing a tokens antiguos (sin equivalente en Figma)
- Migrar valores hardcodeados de border-radius a tokens antiguos (sin equivalente en Figma)
- Actualizar Storybook: controladores y preview con tokens nuevos
- Eliminar TODOS los fallbacks antiguos y valores hardcodeados
- Verificar que NO queden valores hardcodeados ni tokens antiguos (excepto spacing/border-radius sin equivalente)"
```

---

## 📊 Checklist Rápido

Antes de marcar un componente como "migrado":

- [ ] **PASO 1**: Inventario completo de TODOS los tokens (color, typography, spacing, border-radius, effects)
- [ ] **PASO 1**: Backup creado, branch creado
- [ ] **PASO 2**: Todos los tokens de color migrados (con fallbacks durante migración)
- [ ] **PASO 2**: Todos los tokens de typography migrados (con fallbacks durante migración)
- [ ] **PASO 2**: Todos los tokens de effects migrados (con fallbacks durante migración)
- [ ] **PASO 2**: Todos los valores hardcodeados de spacing migrados a tokens
- [ ] **PASO 2**: Todos los valores hardcodeados de border-radius migrados a tokens
- [ ] **PASO 2**: Todos los valores hardcodeados de typography migrados a tokens
- [ ] **PASO 2**: Todos los valores hardcodeados de effects migrados a tokens
- [ ] **PASO 3**: Storybook controladores actualizados con tokens nuevos
- [ ] **PASO 3**: Storybook preview actualizado con tokens nuevos
- [ ] **PASO 3**: Storybook actualizado con `data-state-preview`
- [ ] **PASO 4**: Script de verificación ejecutado sin errores
- [ ] **PASO 4**: Tokens verificados en el DOM (CRÍTICO)
- [ ] **PASO 5**: Fallbacks antiguos eliminados - SOLO tokens nuevos de Figma
- [ ] **PASO 5**: Valores hardcodeados eliminados de TODOS los tipos de tokens
- [ ] **PASO 5**: Verificación completa: NO quedan tokens antiguos ni valores hardcodeados (excepto spacing/border-radius sin equivalente)
- [ ] **PASO 6**: README actualizado
- [ ] **PASO 6**: Testing manual completado
- [ ] **PASO 6**: Commit y PR creados

---

## 🔧 Scripts Utilizados

### 1. Inventario de Tokens
```bash
./scripts/inventory-tokens.sh [COMPONENTE]
```
**Uso:** Al inicio, para saber qué migrar

### 2. Verificación Post-Migración
```bash
./scripts/verify-migration.sh [COMPONENTE]
```
**Uso:** Después de migrar tokens, antes de limpiar

### 3. Limpieza de Fallbacks
```bash
python3 scripts/cleanup-token-fallbacks.py [COMPONENTE]
```
**Uso:** Al final, para eliminar fallbacks antiguos y valores hardcodeados

---

## 🎯 Orden de Ejecución

```
1. Preparación
   └─> inventory-tokens.sh (TODOS los tokens: color, typography, spacing, border-radius, effects)
   └─> Backup y branch

2. Migración COMPLETA
   └─> Migrar tokens de color (manual)
   └─> Migrar tokens de typography (manual)
   └─> Migrar tokens de effects (manual)
   └─> Migrar valores hardcodeados de spacing a tokens
   └─> Migrar valores hardcodeados de border-radius a tokens
   └─> Migrar valores hardcodeados de typography a tokens
   └─> Migrar valores hardcodeados de effects a tokens

3. Storybook COMPLETO
   └─> Actualizar controladores con tokens nuevos
   └─> Actualizar preview con tokens nuevos
   └─> Actualizar .stories.ts
   └─> Agregar reglas CSS para data-state-preview (con tokens nuevos)

4. Verificación
   └─> verify-migration.sh
   └─> Verificar tokens en DOM (CRÍTICO)
   └─> Verificar que controladores usan tokens nuevos
   └─> Verificar que preview usa tokens nuevos

5. Limpieza COMPLETA
   └─> cleanup-token-fallbacks.py
   └─> Verificar limpieza de TODOS los tipos de tokens
   └─> Verificar que NO quedan valores hardcodeados
   └─> Verificar que NO quedan tokens antiguos (excepto spacing/border-radius sin equivalente)

6. Documentación
   └─> Actualizar README
   └─> Commit y PR
```

---

## 🚨 Errores Comunes a Evitar

1. **NO mantener tokens antiguos** - Si no hay equivalente exacto, buscar el más parecido de Figma
2. **NO dejar valores hardcodeados absolutos** - Si no hay token exacto, usar el más parecido y ajustar con valores relativos (ej: `1.5` para line-height)
3. **NO olvidar la verificación de tokens en el DOM** - Es CRÍTICO
4. **NO usar estilos inline en Storybook** - Usar atributos data
5. **NO migrar múltiples estados a la vez** - Uno por uno
6. **NO olvidar `!important`** - En propiedades críticas
7. **NO dejar valores hardcodeados** - Migrar TODOS a tokens de Figma o valores relativos calculados
8. **NO dejar tokens antiguos** - Eliminar TODOS los fallbacks antiguos después de la limpieza (excepto spacing/border-radius sin equivalente)
9. **NO olvidar actualizar controladores** - Deben usar tokens nuevos de Figma
10. **NO olvidar actualizar preview** - Deben usar tokens nuevos de Figma
11. **NO inventariar solo colores** - Inventariar TODOS los tipos de tokens
12. **REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos - Siempre buscar el token más parecido de Figma
13. **NO usar `var(--token)px` para tokens numéricos** - Usar `calc(var(--token) * 1px)` para agregar unidades
14. **NO usar `&&` para clases condicionales** - Usar operador ternario `condition ? 'class' : null` para garantizar que se agregue correctamente

---

## 📚 Recursos

- `docs/PLAN-MAESTRO-MIGRACION-COMPONENTES.md` - Plan completo detallado
- `docs/LECCIONES-APRENDIDAS-MIGRACION-BUTTON.md` - Lecciones aprendidas
- `docs/LECCION-CRITICA-TOKENS-DOM.md` - Lección crítica sobre verificación de tokens
- `packages/tokens/token-mapping.ts` - Mapeo completo de tokens
- `scripts/inventory-tokens.sh` - Script de inventario
- `scripts/verify-migration.sh` - Script de verificación
- `scripts/cleanup-token-fallbacks.py` - Script de limpieza

---

**Última actualización**: Basado en la migración de Button, Accordion, Alert y Badge (2024)

