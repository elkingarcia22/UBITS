# Pasos Paso a Paso: Migración de un Componente

## 📋 Resumen Ejecutivo

Este documento describe los pasos **exactos** que sigo para migrar un componente del sistema de tokens antiguo (`--ubits-*`) al nuevo sistema de tokens de Figma (`--modifiers-normal-*`).

**🎯 REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos. Si no hay equivalente exacto, buscar el token más parecido de Figma. Si hay algo que no se pueda reemplazar, se evalúa pero NO se deja así sin intentar encontrar una solución.

**⚠️ VERIFICACIÓN CRÍTICA DE TOKENS**: Antes de usar cualquier token, VERIFICAR que existe en el archivo generado (`packages/tokens/dist/figma-tokens.css` o `packages/tokens/tokens.json`). NO asumir que un token existe solo porque está en el `token-mapping.json`. Si el token no existe, usar el token UBITS equivalente que SÍ existe.

**🚨 REGLA CRÍTICA: MANTENER MEDIDAS ORIGINALES**: **NUNCA cambiar las medidas (anchos, alturas, dimensiones) de los componentes durante la migración**. Si un componente tiene `width: 240px`, debe mantenerse como `240px` (NO convertir a `calc(var(--ubits-spacing-12) * 3)` que podría dar un valor diferente). Las medidas originales son parte del diseño y deben respetarse exactamente. Solo migrar tokens de color, tipografía, spacing interno, border-radius y effects. Las dimensiones del componente (width, height, min-width, max-width, etc.) deben mantenerse en píxeles exactos o en las unidades originales.

**Tiempo estimado total**: 4-6 horas por componente

---

## 📚 Entendiendo los Modifiers (CRÍTICO)

**⚠️ IMPORTANTE**: Antes de migrar cualquier componente, es esencial entender cómo funcionan los diferentes tipos de modifiers en el sistema de tokens Figma.

### **Tipos de Modifiers:**

#### **1. Normal (`modifiers-normal`)**
- **Comportamiento**: Los colores cambian de light a dark con su equivalente
- **Light mode**: Un color específico
- **Dark mode**: Su equivalente (diferente color que se adapta al tema)
- **Ejemplo**: 
  - `--modifiers-normal-color-light-accent-brand` → Azul (#0c5bef) en light mode
  - `--modifiers-normal-color-dark-accent-brand` → Color equivalente adaptado para dark mode
- **Cuándo usar**: Estados normales, elementos interactivos, progreso, navegación activa (CASI SIEMPRE)

#### **2. Inverted (`modifiers-inverted`)**
- **Comportamiento**: Los colores pasan de dark a light con su equivalente
- **Light mode**: Usa el color que normalmente sería de dark mode
- **Dark mode**: Usa el color que normalmente sería de light mode
- **Ejemplo**: 
  - `--modifiers-inverted-color-light-accent-brand` → Color dark en light mode
  - `--modifiers-inverted-color-dark-accent-brand` → Color light en dark mode
- **Cuándo usar**: Cuando necesitas invertir la lógica normal de colores

#### **3. Static (`modifiers-static`)**
- **Comportamiento**: Se mantiene igual el color light en dark y light
- **Light mode**: Un color específico
- **Dark mode**: El mismo color (NO cambia con el tema)
- **Ejemplo**: 
  - `--modifiers-static-color-light-accent-brand` → Mismo color en ambos modos
  - `--modifiers-static-color-dark-accent-brand` → Mismo color en ambos modos
- **Cuándo usar**: Cuando necesitas que un color se mantenga constante independientemente del tema

#### **4. Static Inverted (`modifiers-static-inverted`)**
- **Comportamiento**: Se mantiene el color dark en dark y light
- **Light mode**: Usa el color dark
- **Dark mode**: Usa el mismo color dark (NO cambia con el tema)
- **Ejemplo**: 
  - `--modifiers-static-inverted-color-light-accent-brand` → Color dark en light mode (MORADO #3865f5)
  - `--modifiers-static-inverted-color-dark-accent-brand` → Mismo color dark en dark mode
- **Cuándo usar**: Casos muy específicos de diseño estático invertido (MUY RARO)

### **Regla de Oro para Migración:**

**✅ CASI SIEMPRE usar `modifiers-normal`:**
- Estados activos/interactivos
- Barras de progreso
- Indicadores de navegación
- Sliders y controles
- Elementos que requieren adaptación al tema

**❌ EVITAR `modifiers-static-inverted` para UI interactiva:**
- NO usar para estados de progreso normales
- NO usar para elementos interactivos comunes
- NO usar para indicadores activos de navegación
- Solo usar en casos muy específicos de diseño estático invertido

**📝 Nota**: Si encuentras `--ubits-accent-brand-static-inverted` en el código original, NO usar automáticamente `--modifiers-static-inverted-color-light-accent-brand`. Evaluar el contexto: ¿es un elemento interactivo? ¿es un estado activo? Si la respuesta es SÍ, usar `--modifiers-normal-color-light-accent-brand` (AZUL).

---

## 🚀 Proceso Completo

### **PASO 1: Preparación (30 min)**

#### 1.0 Verificación de Tokens Disponibles (CRÍTICO - NUEVO)

**⚠️ ANTES DE EMPEZAR**: Verificar qué tokens están realmente disponibles en los archivos generados. NO asumir que un token existe solo porque está en `token-mapping.json`.

**Comando de verificación:**
```bash
# Verificar tokens de spacing en figma-tokens.css
grep "p-spacing-mode-1" packages/tokens/dist/figma-tokens.css | head -20

# Verificar tokens UBITS de spacing
grep "ubits-spacing" packages/tokens/tokens.json | head -10
```

**Resultado esperado:**
- ❌ Los tokens `--p-spacing-mode-1-xs/sm/md/lg/xl` **NO existen** en `figma-tokens.css`
- ✅ Los tokens que SÍ existen son `--p-spacing-mode-1-space-0/1/2/3/4/...` (números sin unidades, requieren `calc()`)
- ✅ Los tokens `--ubits-spacing-xs/sm/md/lg/xl` **SÍ existen** en `tokens.json` con valores en px

**Decisión**: Usar `--ubits-spacing-*` directamente porque:
1. Existen en `tokens.json`
2. Tienen valores en px (no necesitan `calc()`)
3. Son válidos según la regla de oro (existen en Storybook)

**Mapeo de valores:**
- `4px` → `--ubits-spacing-xs`
- `8px` → `--ubits-spacing-sm`
- `12px` → `--ubits-spacing-md`
- `16px` → `--ubits-spacing-lg`
- `20px` → `--ubits-spacing-xl`
- `0px` → `--ubits-spacing-none`

**Regla**: Al reemplazar un spacing, SIEMPRE:
1. Verificar el valor en px del original
2. Mapear correctamente según la tabla arriba
3. Usar `--ubits-spacing-*` directamente (NO `--p-spacing-mode-1-*`)

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

**⚠️ ERROR CRÍTICO: Token Morado vs Azul en Light Mode**

**📚 Ver también**: Sección "Entendiendo los Modifiers" al inicio de este documento para comprender la diferencia entre `normal`, `inverted`, `static` y `static-inverted`.

**PROBLEMA ENCONTRADO**: Al migrar componentes como `card`, `calendar`, `subnav`, `slider`, se estaba usando incorrectamente el token morado (`--modifiers-static-inverted-color-light-accent-brand`) en lugar del token azul (`--modifiers-normal-color-light-accent-brand`) para estados de progreso, barras de progreso, textos "En progreso", indicadores activos de navegación y elementos interactivos en light mode.

**⚠️ CAUSA RAÍZ**: El mapeo automático de tokens puede llevar a usar el token incorrecto. Cuando se encuentra `--ubits-accent-brand-static-inverted` en el código original, el mapeo automático sugiere `--modifiers-static-inverted-color-light-accent-brand` (MORADO - color dark que se mantiene en light mode), pero en la mayoría de los casos de UI interactiva se debe usar `--modifiers-normal-color-light-accent-brand` (AZUL - color que cambia según el tema).

**Diferencia entre tokens:**
- `--modifiers-static-inverted-color-light-accent-brand` → **MORADO** (#3865f5) - Usar SOLO para casos específicos de diseño estático invertido (muy raro)
- `--modifiers-normal-color-light-accent-brand` → **AZUL** (#0c5bef) - Usar para estados normales, progreso, y elementos interactivos (CASI SIEMPRE)

**Cuándo usar cada token:**
- ✅ **Usar `--modifiers-normal-color-light-accent-brand` (AZUL)** para:
  - Barras de progreso en estado "en progreso"
  - Textos "En progreso"
  - Estados activos/interactivos
  - Indicadores activos de navegación (tabs, subnav, stepper)
  - Bordes en hover
  - Elementos que requieren el color azul de marca
  - Sliders, track fills, thumbs
  - Cualquier elemento interactivo que requiera el color de marca azul
  
- ❌ **NO usar `--modifiers-static-inverted-color-light-accent-brand` (MORADO)** para:
  - Estados de progreso normales
  - Textos de estado
  - Elementos interactivos comunes
  - Indicadores activos de navegación
  - Sliders o controles interactivos

**Ejemplos de corrección:**

**Ejemplo 1: Barras de progreso y textos**
```css
/* ❌ INCORRECTO - Usa morado en light mode */
.course-status--progress {
  color: var(--modifiers-static-inverted-color-light-accent-brand) !important;
}

.course-progress-overlay .progress-fill {
  background: var(--modifiers-static-inverted-color-light-accent-brand) !important;
}

/* ✅ CORRECTO - Usa azul en light mode */
.course-status--progress {
  color: var(--modifiers-normal-color-light-accent-brand) !important;
}

.course-progress-overlay .progress-fill {
  background: var(--modifiers-normal-color-light-accent-brand) !important;
}
```

**Ejemplo 2: Indicadores activos de navegación (SubNav, Tabs)**
```css
/* ❌ INCORRECTO - Usa morado en light mode */
.ubits-sub-nav-tab.ubits-sub-nav-tab--active::after {
  background-color: var(--modifiers-static-inverted-color-light-accent-brand);
}

/* ✅ CORRECTO - Usa azul en light mode */
.ubits-sub-nav-tab.ubits-sub-nav-tab--active::after {
  background-color: var(--modifiers-normal-color-light-accent-brand);
}
```

**Ejemplo 3: Sliders y controles interactivos**
```css
/* ❌ INCORRECTO - Usa morado en light mode */
.ubits-slider-track-fill {
  background: var(--modifiers-static-inverted-color-light-accent-brand);
}

.ubits-slider-thumb {
  background: var(--modifiers-static-inverted-color-light-accent-brand);
}

/* ✅ CORRECTO - Usa azul en light mode */
.ubits-slider-track-fill {
  background: var(--modifiers-normal-color-light-accent-brand);
}

.ubits-slider-thumb {
  background: var(--modifiers-normal-color-light-accent-brand);
}
```

**Verificación:**
- Buscar en el CSS: `grep -r "static-inverted-color-light-accent-brand" packages/components/[COMPONENTE]/src/styles/`
- Verificar visualmente en Storybook que los elementos muestran azul, no morado
- Revisar que el dark mode también use el token correcto (`--modifiers-normal-color-dark-accent-brand`)
- **REGLA DE ORO**: Si encuentras `--ubits-accent-brand-static-inverted` en el código original, NO usar automáticamente `--modifiers-static-inverted-color-light-accent-brand`. Evaluar el contexto: ¿es un elemento interactivo? ¿es un estado activo? ¿es progreso? Si la respuesta es SÍ, usar `--modifiers-normal-color-light-accent-brand` (AZUL).

**Orden de migración:**
1. Tokens base (default state)
2. Tokens de estados (hover, active, pressed, disabled)
3. Tokens de variantes (si aplica)
4. **Verificar que se use el token azul correcto para progreso y estados activos**

#### 2.2 Migrar Tokens de Typography

**🎯 REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos. Si no hay equivalente exacto, buscar el token más parecido de Figma. Si hay algo que no se pueda reemplazar, se evalúa pero NO se deja así sin intentar encontrar una solución.

**⚠️ IMPORTANTE: Verificar tokens UBITS existentes ANTES de migrar**

**ANTES de migrar cualquier token, verificar si existe en:**
1. `packages/tokens/dist/tokens.css` - Tokens UBITS base
2. `packages/typography/tokens-typography.css` - Tokens de tipografía UBITS
3. Storybook - Verificar visualmente que el token existe y funciona

**Tokens UBITS que SÍ existen y se deben mantener:**
- `--ubits-border-radius-xs` (4px) - Existe en `packages/tokens/dist/tokens.css`
- `--ubits-border-radius-sm` (8px) - Existe en `packages/tokens/dist/tokens.css`
- `--ubits-border-radius-md` (12px) - Existe en `packages/tokens/dist/tokens.css`
- `--ubits-border-radius-lg` (16px) - Existe en `packages/tokens/dist/tokens.css`
- `--ubits-border-radius-xl` (20px) - Existe en `packages/tokens/dist/tokens.css`
- `--ubits-border-radius-full` (1000px) - Existe en `packages/tokens/dist/tokens.css`
- `--weight-regular` (400) - Existe en `packages/typography/tokens-typography.css`
- `--weight-semibold` (600) - Existe en `packages/typography/tokens-typography.css`
- `--weight-bold` (700) - Existe en `packages/typography/tokens-typography.css`

**❌ NO crear tokens nuevos** como `--ubits-font-weight-regular` cuando `--weight-regular` ya existe.

**Estrategia:**
1. **PRIMERO**: Verificar si el token UBITS existe en `tokens.css` o `tokens-typography.css`
2. **SI EXISTE**: Mantener el token UBITS original (NO migrar)
3. **SI NO EXISTE**: Buscar tokens antiguos de typography (`--font-*`, `--weight-*`, `--line-height-*`, etc.)
4. Buscar valores hardcodeados de typography (`font-size: 12px`, `font-weight: 600`, etc.)
5. Verificar si tienen equivalente exacto en Figma (consultar `figma-tokens.css` o Storybook)
6. **Si tienen equivalente exacto**: Migrar a tokens nuevos de Figma
7. **Si NO tienen equivalente exacto**: 
   - Buscar el token más parecido en Figma (comparar tamaños, características)
   - Usar el token más parecido de Figma
   - Ajustar line-height si es necesario (usar valores relativos como `1.5` o calcular)
   - **NUNCA mantener tokens antiguos ni valores hardcodeados sin intentar reemplazarlos**

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

/* DESPUÉS - Buscar el token más parecido de Figma */
font-size: var(--modifiers-normal-body-sm-regular-fontsize, 13px); /* 14px → body-sm (13px) más cercano */
font-weight: var(--ubits-font-weight-semibold, 600); /* 500 → semibold (600) más cercano */
line-height: var(--modifiers-normal-body-sm-regular-lineheight, 23.4px);
letter-spacing: var(--modifiers-normal-body-sm-regular-letterspacing, 0%);
```

**⚠️ PROBLEMA CRÍTICO: Font-weight Strings vs Numéricos**

Los tokens de Figma para `font-weight` devuelven strings ("Regular", "SemiBold", "Bold") en lugar de números. Esto causa problemas en CSS porque `font-weight` necesita valores numéricos (400, 600, 700) o palabras clave ("normal", "bold").

**Síntomas del problema:**
- Los logs muestran `font-weight: 400` cuando debería ser `700` (bold)
- El token `--ubits-font-weight-bold` está vacío o no existe
- Los textos que deberían estar en bold aparecen en peso normal

**Solución CORRECTA (usar tokens de Figma con fallback numérico):**

**❌ INCORRECTO - Token que no existe:**
```css
font-weight: var(--ubits-font-weight-bold); /* Token vacío, devuelve nada */
```

**❌ INCORRECTO - Token de Figma sin fallback (devuelve string):**
```css
font-weight: var(--modifiers-normal-body-md-bold-fontweight); /* Devuelve "Bold" (string) */
```

**✅ CORRECTO - Usar token UBITS si existe, o token de Figma con fallback numérico:**
```css
/* Para regular - USAR TOKEN UBITS que existe */
font-weight: var(--weight-regular, 400); /* ✅ Token UBITS existe en tokens-typography.css */

/* Para semibold - USAR TOKEN UBITS que existe */
font-weight: var(--weight-semibold, 600); /* ✅ Token UBITS existe en tokens-typography.css */

/* Para bold - USAR TOKEN UBITS que existe */
font-weight: var(--weight-bold, 700); /* ✅ Token UBITS existe en tokens-typography.css */

/* Para body-sm-bold - Token de Figma con fallback numérico */
font-weight: var(--modifiers-normal-body-sm-bold-fontweight, 700) !important;

/* Para body-md-bold - Token de Figma con fallback numérico */
font-weight: var(--modifiers-normal-body-md-bold-fontweight, 700) !important;

/* Para heading-h2 (bold) - Token de Figma con fallback numérico */
font-weight: var(--modifiers-normal-heading-h2-fontweight, 700) !important;

/* Para semibold específico de body-md - Token de Figma con fallback numérico */
font-weight: var(--modifiers-normal-body-md-semibold-fontweight, 600) !important;
```

**Tokens UBITS disponibles (usar estos primero):**
- `--weight-regular, 400` - Regular (existe en `packages/typography/tokens-typography.css`)
- `--weight-semibold, 600` - Semibold (existe en `packages/typography/tokens-typography.css`)
- `--weight-bold, 700` - Bold (existe en `packages/typography/tokens-typography.css`)

**Tokens disponibles de Figma con fallback (usar solo si necesitas específico de body/heading):**
- `--modifiers-normal-body-sm-bold-fontweight, 700` - Bold para body small
- `--modifiers-normal-body-md-bold-fontweight, 700` - Bold para body medium
- `--modifiers-normal-body-lg-bold-fontweight, 700` - Bold para body large
- `--modifiers-normal-heading-h2-fontweight, 700` - Bold para heading h2
- `--modifiers-normal-body-sm-semibold-fontweight, 600` - Semibold para body small
- `--modifiers-normal-body-md-semibold-fontweight, 600` - Semibold para body medium

**⚠️ IMPORTANTE**: Siempre usar `!important` cuando se necesita forzar el bold, especialmente si hay otros estilos que puedan sobrescribirlo.

**⚠️ PROBLEMA: Tokens Antiguos de Typography**

**IMPORTANTE**: Antes de reemplazar tokens antiguos, verificar si existen tokens UBITS equivalentes.

**Tokens UBITS que SÍ existen (mantener, NO migrar):**
- `--weight-regular` (400) - Existe en `packages/typography/tokens-typography.css`
- `--weight-semibold` (600) - Existe en `packages/typography/tokens-typography.css`
- `--weight-bold` (700) - Existe en `packages/typography/tokens-typography.css`

**Ejemplos de reemplazo:**
```css
/* ❌ INCORRECTO - Crear token nuevo cuando ya existe */
font-weight: var(--ubits-font-weight-regular, 400); /* Token no existe */

/* ✅ CORRECTO - Usar token UBITS que existe */
font-weight: var(--weight-regular, 400); /* Token existe en tokens-typography.css */

/* ❌ INCORRECTO - Tokens antiguos de font-size y line-height */
font-size: var(--font-body-md-size);
line-height: var(--font-body-md-line);
font-size: var(--font-h1-size, 20px);
font-size: var(--font-h2-size, 18px);

/* ✅ CORRECTO - Tokens de Figma para font-size y line-height */
font-size: var(--modifiers-normal-body-md-regular-fontsize);
line-height: var(--modifiers-normal-body-md-regular-lineheight);
font-size: var(--modifiers-normal-heading-h1-fontsize, 20px);
font-size: var(--modifiers-normal-heading-h2-fontsize, 18px);
```

**Checklist de Typography:**
- [ ] **PRIMERO**: Verificar si tokens UBITS existen (`--weight-regular`, `--weight-semibold`, `--weight-bold`) en `packages/typography/tokens-typography.css`
- [ ] **SI EXISTEN**: Mantener tokens UBITS originales (NO migrar) - Ejemplo: `var(--weight-regular, 400)`
- [ ] **SI NO EXISTEN**: Buscar tokens antiguos (`--font-*`, `--weight-*`)
- [ ] Buscar TODOS los valores hardcodeados (`font-size: 12px`, `font-weight: 600`, etc.)
- [ ] Reemplazar tokens antiguos por tokens de Figma (solo si no existe token UBITS)
- [ ] Reemplazar valores hardcodeados por tokens de Figma (usar el más parecido)
- [ ] Reemplazar `--modifiers-normal-*-fontweight` (strings) por tokens UBITS (`--weight-*`) o tokens de Figma con fallback numérico
- [ ] Verificar que NO queden tokens antiguos ni valores hardcodeados

#### 2.3 Migrar Tokens de Spacing

**🎯 REGLA DE ORO**: Todos los tokens de spacing existen en Storybook y tokens.json. **CRÍTICO**: Verificar que el token existe antes de usarlo. Los tokens `--p-spacing-mode-1-xs/sm/md/lg/xl` NO existen en el archivo generado. Usar `--ubits-spacing-*` directamente. NUNCA dejar hardcodeado.

**🚨 REGLA CRÍTICA: NO CAMBIAR MEDIDAS DE COMPONENTES**: **NUNCA convertir medidas de componentes (width, height, min-width, max-width) a tokens de spacing**. Si un componente tiene `width: 240px`, mantenerlo como `240px`. NO convertir a `calc(var(--ubits-spacing-12) * 3)` porque esto podría cambiar el tamaño del componente. Solo migrar spacing interno (padding, gap, margin) a tokens. Las dimensiones del componente deben mantenerse exactas.

**⚠️ PROBLEMA CRÍTICO IDENTIFICADO:**

Los tokens `--p-spacing-mode-1-xs`, `--p-spacing-mode-1-sm`, `--p-spacing-mode-1-md`, etc. **NO existen** en `figma-tokens.css`. 

Los tokens que SÍ existen son:
- `--p-spacing-mode-1-space-0: 0` (sin unidades, necesita `calc()`)
- `--p-spacing-mode-1-space-1: 4` (sin unidades, necesita `calc()`)
- `--p-spacing-mode-1-space-2: 8` (sin unidades, necesita `calc()`)
- `--p-spacing-mode-1-space-3: 12` (sin unidades, necesita `calc()`)
- etc.

**Solución**: Usar directamente `--ubits-spacing-*` que SÍ existen y tienen valores en px:
- `--ubits-spacing-xs: 4px`
- `--ubits-spacing-sm: 8px`
- `--ubits-spacing-md: 12px`
- `--ubits-spacing-lg: 16px`
- `--ubits-spacing-xl: 20px`

**Estrategia:**
1. Buscar tokens antiguos de spacing (`--ubits-spacing-*`)
2. Buscar valores hardcodeados de spacing (`gap: 8px`, `padding: 12px`, etc.)
3. **VERIFICAR el valor en px** del spacing que estás reemplazando
4. **Mapear correctamente**:
   - `4px` → `--ubits-spacing-xs`
   - `8px` → `--ubits-spacing-sm`
   - `12px` → `--ubits-spacing-md`
   - `16px` → `--ubits-spacing-lg`
   - `20px` → `--ubits-spacing-xl`
   - `0px` → `--ubits-spacing-none`
5. **Usar directamente `--ubits-spacing-*`** (NO usar `--p-spacing-mode-1-*` porque no existen)
6. **Si NO existe en Storybook**: Agregarlo al token-mapping.json

**Ejemplo:**
```css
/* ANTES */
gap: 8px;
padding: 12px 16px;
margin: 0;

/* DESPUÉS - Usar tokens UBITS directamente */
gap: var(--ubits-spacing-sm);  /* 8px */
padding: var(--ubits-spacing-md) var(--ubits-spacing-lg);  /* 12px 16px */
margin: var(--ubits-spacing-none);  /* 0px */
```

**❌ INCORRECTO - NO hacer esto:**
```css
/* ❌ Estos tokens NO existen en figma-tokens.css */
gap: var(--p-spacing-mode-1-sm);
padding: var(--p-spacing-mode-1-md) var(--p-spacing-mode-1-lg);
```

**✅ CORRECTO:**
```css
/* ✅ Usar tokens UBITS que SÍ existen */
gap: var(--ubits-spacing-sm);
padding: var(--ubits-spacing-md) var(--ubits-spacing-lg);
```

**🚨 ERROR CRÍTICO: NO CAMBIAR MEDIDAS DE COMPONENTES**
```css
/* ❌ INCORRECTO - Cambiar dimensiones del componente */
.ubits-popover--width-sm {
    width: calc(var(--ubits-spacing-12) * 3); /* 240px → podría dar 216px o 224px */
}

.ubits-participants-menu {
    min-width: calc(var(--ubits-spacing-12) * 3.5); /* Cambia el tamaño original */
}

/* ✅ CORRECTO - Mantener medidas exactas originales */
.ubits-popover--width-sm {
    width: 240px; /* Mantener exactamente como estaba */
}

.ubits-participants-menu {
    min-width: 280px; /* Mantener exactamente como estaba */
}

/* ✅ CORRECTO - Migrar spacing interno */
.ubits-popover__header {
    padding: var(--ubits-spacing-md); /* 12px → token correcto */
    gap: var(--ubits-spacing-xs); /* 4px → token correcto */
}
```

**Regla**: Solo migrar spacing interno (`padding`, `gap`, `margin`, `border-width`). Las dimensiones del componente (`width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`) deben mantenerse exactas en píxeles o en las unidades originales.

**Tokens disponibles:**
- **UBITS (Storybook)**: `--ubits-spacing-none`, `--ubits-spacing-xs`, `--ubits-spacing-sm`, `--ubits-spacing-md`, `--ubits-spacing-lg`, `--ubits-spacing-xl`, `--ubits-spacing-2xl`, etc.
- **Figma (NO usar directamente)**: `--p-spacing-mode-1-space-*` (números sin unidades, requieren `calc()`)

#### 2.4 Migrar Tokens de Border-radius

**🎯 REGLA DE ORO**: Todos los tokens de border-radius existen en Storybook y tokens.json. Usar `--ubits-border-radius-*` siempre. NUNCA dejar hardcodeado.

**Estrategia:**
1. Buscar tokens antiguos de border-radius (`--ubits-border-radius-*`)
2. Buscar valores hardcodeados de border-radius (`border-radius: 8px`, `border-radius: 4px`, etc.)
3. **Reemplazar TODOS los valores hardcodeados** por tokens UBITS
4. **Mantener valores específicos** como `50%`, `inherit`, `0` solo si son necesarios para funcionalidad específica

**Ejemplo:**
```css
/* ANTES */
border-radius: 8px;
border-radius: 4px;
border-radius: 12px;
border-radius: 50%;

/* DESPUÉS */
border-radius: var(--ubits-border-radius-sm, 8px);
border-radius: var(--ubits-border-radius-xs, 4px);
border-radius: var(--ubits-border-radius-md, 12px);
border-radius: 50%; /* Mantener solo si es necesario para funcionalidad específica (ej: círculos perfectos) */
```

**Tokens disponibles en Storybook y tokens.json:**
- `--ubits-border-radius-none` (0)
- `--ubits-border-radius-xs` (4px)
- `--ubits-border-radius-sm` (8px)
- `--ubits-border-radius-md` (12px)
- `--ubits-border-radius-lg` (16px)
- `--ubits-border-radius-xl` (20px)
- `--ubits-border-radius-full` (1000px)

#### 2.5 Migrar Tokens de Effects

**🎯 REGLA DE ORO**: Todos los tokens de effects existen en Storybook y tokens.json. Usar `--modifiers-normal-focus-color` para focus, y tokens de elevation para sombras. NUNCA dejar hardcodeado.

**Estrategia:**
1. Buscar tokens antiguos de effects (`--ubits-*elevation*`, `--ubits-*shadow*`, `--ubits-*focus*`)
2. Buscar valores hardcodeados de effects (`rgba(82, 151, 244, 0.3)`, `box-shadow: 0 2px 4px rgba(...)`, etc.)
3. **Focus Color**: Usar `--modifiers-normal-focus-color` (existe en Figma y Storybook)
4. **Elevation/Shadow**: Usar tokens de Figma `--modifiers-normal-elevation-*` o construir desde tokens individuales
5. **Si existe en Storybook pero no en JSON**: Agregarlo al token-mapping.json

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
box-shadow: 0 0 0 4px rgba(82, 151, 244, 0.3);
outline: 2px solid rgba(82, 151, 244, 0.3);

/* DESPUÉS */
box-shadow: calc(var(--modifiers-normal-elevation-default-0-x) * 1px) calc(var(--modifiers-normal-elevation-default-0-y) * 1px) calc(var(--modifiers-normal-elevation-default-0-blur) * 1px) calc(var(--modifiers-normal-elevation-default-0-spread) * 1px) var(--modifiers-normal-elevation-default-0-color);
box-shadow: 0 0 0 4px var(--modifiers-normal-focus-color);
outline: 2px solid var(--modifiers-normal-focus-color);
```

**⚠️ IMPORTANTE - Focus Color:**
- **Token de Figma**: `--modifiers-normal-focus-color` (existe en Storybook y tokens.json)
- **Valor**: `rgba(82, 151, 244, 0.3)`
- **Uso**: Reemplazar TODOS los `rgba(82, 151, 244, 0.3)` hardcodeados por este token
- **Fallback**: `var(--modifiers-normal-focus-color, rgba(82, 151, 244, 0.3))` (solo durante migración)

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

#### 3.5 Agregar Soporte Dark Mode (CRÍTICO)

**⚠️ PROBLEMA**: Los componentes migrados usan tokens con `-light-` hardcodeados, por lo que NO cambian automáticamente en dark mode.

**Solución**: Ejecutar el script `fix-dark-mode-tokens.cjs` que agrega reglas `[data-theme="dark"]` que redefinen las variables CSS.

**Pasos:**

1. **Ejecutar script automático:**
   ```bash
   cd packages/tokens
   node scripts/fix-dark-mode-tokens.cjs
   ```

2. **Verificar que las reglas se agregaron:**
   ```bash
   # Buscar reglas [data-theme="dark"] en el componente
   grep -A 10 '\[data-theme="dark"\]' packages/components/[COMPONENTE]/src/styles/*.css
   ```

3. **Verificar que los tokens dark existen:**
   ```bash
   # Buscar tokens dark en figma-tokens.css
   grep "modifiers-normal-color-dark" packages/tokens/dist/figma-tokens.css | head -5
   ```

4. **Corregir manualmente reglas específicas:**
   - Buscar reglas dentro de `[data-theme="dark"]` que aún usan tokens `-light-`
   - Reemplazar con tokens `-dark-` explícitos
   
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

5. **Verificar visualmente en Storybook:**
   - Cambiar a dark mode
   - Verificar que los componentes muestran colores correctos
   - Verificar todos los estados (hover, active, disabled, etc.)

**Documentación completa**: Ver `docs/PROBLEMA-DARK-MODE-TOKENS.md`

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

**5.2.4 Verificar que no queden valores hardcodeados:**
```bash
# Tokens de color
grep -E "var\(--modifiers-normal-[^,)]+,\s*#[0-9a-fA-F]{3,8}\)" packages/components/[COMPONENTE]/src/styles/*.css
grep -E "var\(--modifiers-normal-[^,)]+,\s*rgba\(" packages/components/[COMPONENTE]/src/styles/*.css
# Debe retornar vacío

# Valores hardcodeados de typography (sin var())
grep -E "font-size:\s*[0-9]+px|font-weight:\s*[0-9]+|line-height:\s*[0-9]+px" packages/components/[COMPONENTE]/src/styles/*.css
# Debe retornar vacío (todos deben estar en tokens)

# Tokens de typography con fallbacks hardcodeados
grep -E "var\(--modifiers-normal-[^,)]+,\s*[0-9]+px\)" packages/components/[COMPONENTE]/src/styles/*.css | grep -E "(font-size|line-height|letter-spacing)"
# Debe retornar vacío (o solo con fallbacks justificados)

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
- [ ] **PASO 3.5**: Soporte dark mode agregado (fix-dark-mode-tokens.cjs ejecutado)
- [ ] **PASO 3.5**: Reglas `[data-theme="dark"]` verificadas
- [ ] **PASO 3.5**: Componente probado en dark mode en Storybook
- [ ] **PASO 4**: Script de verificación ejecutado sin errores
- [ ] **PASO 4**: Tokens verificados en el DOM (CRÍTICO)
- [ ] **PASO 5**: Fallbacks antiguos eliminados - SOLO tokens nuevos de Figma
- [ ] **PASO 5**: Valores hardcodeados eliminados de TODOS los tipos de tokens
- [ ] **PASO 5**: Tokens antiguos de typography eliminados (--font-*, --weight-*, --font-h1-*, --font-h2-*)
- [ ] **PASO 5**: Tokens de Figma con font-weight strings reemplazados por --ubits-font-weight-* (numéricos)
- [ ] **PASO 5**: Valores hardcodeados de typography eliminados (font-size: 12px, font-weight: 600, etc.)
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

### 4. Corrección Dark Mode
```bash
cd packages/tokens
node scripts/fix-dark-mode-tokens.cjs
```
**Uso:** Después de migrar tokens, para agregar soporte dark mode automáticamente

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
   └─> Agregar soporte dark mode (fix-dark-mode-tokens.cjs) - CRÍTICO

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

1. **NO mantener tokens antiguos** - Si no hay equivalente exacto, buscar el más parecido de Figma. Si hay algo que no se pueda reemplazar, se evalúa pero NO se deja así sin intentar encontrar una solución.
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
12. **REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos - Siempre buscar el token más parecido de Figma. Si hay algo que no se pueda reemplazar, se evalúa pero NO se deja así sin intentar encontrar una solución.
13. **NO usar `var(--token)px` para tokens numéricos** - Usar `calc(var(--token) * 1px)` para agregar unidades
14. **NO usar `&&` para clases condicionales** - Usar operador ternario `condition ? 'class' : null` para garantizar que se agregue correctamente
15. **NO usar tokens de Figma con font-weight strings** - Usar tokens numéricos UBITS (`--ubits-font-weight-*`) en lugar de `--modifiers-normal-*-fontweight`
16. **NO dejar tokens antiguos de typography** - Reemplazar TODOS los `--font-*`, `--weight-*`, `--font-h1-*`, `--font-h2-*` por tokens de Figma
17. **NO dejar valores hardcodeados de typography** - Reemplazar TODOS los `font-size: 12px`, `font-weight: 600`, etc. por tokens de Figma
18. **NO usar tokens de spacing que no existen** - Los tokens `--p-spacing-mode-1-xs/sm/md/lg/xl` NO existen en `figma-tokens.css`. Siempre usar `--ubits-spacing-*` directamente. Antes de reemplazar un spacing, verificar el valor en px y mapear correctamente (4px=xs, 8px=sm, 12px=md, 16px=lg, 20px=xl).
19. **VERIFICAR tokens antes de usarlos** - Antes de usar cualquier token, verificar que existe en `packages/tokens/dist/figma-tokens.css` o `packages/tokens/tokens.json`. NO asumir que existe solo porque está en `token-mapping.json`. Si el token no existe, usar el token UBITS equivalente.
20. **Mapear spacing correctamente** - Al reemplazar un spacing, verificar el valor en px del original y mapear correctamente: `4px` → `--ubits-spacing-xs`, `8px` → `--ubits-spacing-sm`, `12px` → `--ubits-spacing-md`, `16px` → `--ubits-spacing-lg`, `20px` → `--ubits-spacing-xl`.
21. **NO olvidar agregar soporte dark mode** - Ejecutar `fix-dark-mode-tokens.cjs` después de migrar tokens para que los componentes funcionen en dark mode
22. **NO dejar tokens `-light-` en reglas `[data-theme="dark"]`** - Reemplazar con tokens `-dark-` explícitos en reglas específicas
23. **⚠️ NO usar token morado en lugar de azul para elementos interactivos** - **CRÍTICO**: Para estados de progreso, barras de progreso, textos "En progreso", indicadores activos de navegación (tabs, subnav, stepper), sliders, y cualquier elemento interactivo en light mode, usar `--modifiers-normal-color-light-accent-brand` (AZUL #0c5bef), NO `--modifiers-static-inverted-color-light-accent-brand` (MORADO #3865f5). **CAUSA RAÍZ**: El mapeo automático de `--ubits-accent-brand-static-inverted` sugiere `--modifiers-static-inverted-color-light-accent-brand`, pero esto es INCORRECTO para elementos interactivos. El token morado es solo para casos específicos de diseño estático invertido (muy raro). **REGLA DE ORO**: Si encuentras `--ubits-accent-brand-static-inverted` en el código original, evaluar el contexto: ¿es interactivo? ¿es estado activo? Si SÍ → usar `--modifiers-normal-color-light-accent-brand` (AZUL). Ver sección 2.1 para más detalles y ejemplos completos.
24. **🚨 NO CAMBIAR MEDIDAS DE COMPONENTES** - **CRÍTICO**: NUNCA convertir medidas de componentes (width, height, min-width, max-width, dimensiones específicas) a tokens de spacing usando `calc()`. Si un componente tiene `width: 240px`, mantenerlo como `240px`. NO convertir a `calc(var(--ubits-spacing-12) * 3)` porque esto podría cambiar el tamaño del componente y reducir horizontalmente los elementos. Solo migrar spacing interno (padding, gap, margin) a tokens. Las dimensiones del componente (width, height, min-width, max-width, etc.) deben mantenerse exactas en píxeles o en las unidades originales. Esto ha causado problemas en varios componentes (Popover, Participants Menu, etc.) donde se redujeron los anchos al convertir a tokens.

25. **⚠️ FONT-WEIGHT BOLD NO FUNCIONA - Token Inexistente o String** - **CRÍTICO**: Los textos que deberían estar en bold no se muestran en bold. **Causa**: El token `--ubits-font-weight-bold` NO existe o está vacío. Los tokens de Figma `--modifiers-normal-*-bold-fontweight` devuelven strings ("Bold") en lugar de números (700), lo que CSS no puede usar directamente. **Síntomas**: Los logs muestran `font-weight: 400` cuando debería ser `700`, o el token está vacío. **Solución**: **PRIMERO verificar si existe `--weight-bold` en `packages/typography/tokens-typography.css`**. Si existe, usar `var(--weight-bold, 700)`. Si no existe, usar tokens de Figma con fallback numérico: `var(--modifiers-normal-body-sm-bold-fontweight, 700) !important` para body-sm-bold, `var(--modifiers-normal-body-md-bold-fontweight, 700) !important` para body-md-bold, `var(--modifiers-normal-heading-h2-fontweight, 700) !important` para heading-h2. **Ver sección 2.2 para más detalles y ejemplos completos.**

26. **🚨 VERIFICAR TOKENS UBITS EXISTENTES ANTES DE MIGRAR** - **CRÍTICO**: Antes de migrar cualquier token, verificar si ya existe en los archivos UBITS. **Tokens UBITS que SÍ existen y se deben mantener**: `--ubits-border-radius-xs` (4px), `--ubits-border-radius-sm` (8px), `--ubits-border-radius-md` (12px), `--ubits-border-radius-lg` (16px), `--ubits-border-radius-xl` (20px), `--ubits-border-radius-full` (1000px) - todos existen en `packages/tokens/dist/tokens.css`. `--weight-regular` (400), `--weight-semibold` (600), `--weight-bold` (700) - todos existen en `packages/typography/tokens-typography.css`. **❌ NO crear tokens nuevos** como `--ubits-font-weight-regular` cuando `--weight-regular` ya existe. **Solución**: Siempre verificar en `packages/tokens/dist/tokens.css` y `packages/typography/tokens-typography.css` ANTES de migrar. Si el token UBITS existe, mantenerlo. Si no existe, entonces migrar a Figma. **Paso a paso**: 1) Buscar el token en `packages/tokens/dist/tokens.css` (para border-radius y colores), 2) Buscar el token en `packages/typography/tokens-typography.css` (para font-weight), 3) Si existe, mantenerlo, 4) Si no existe, buscar equivalente en Figma. **Ver sección 2.2 para más detalles.**

---

## 📚 Recursos

- `docs/PLAN-MAESTRO-MIGRACION-COMPONENTES.md` - Plan completo detallado
- `docs/LECCIONES-APRENDIDAS-MIGRACION-BUTTON.md` - Lecciones aprendidas
- `docs/LECCION-CRITICA-TOKENS-DOM.md` - Lección crítica sobre verificación de tokens
- `docs/PROBLEMA-DARK-MODE-TOKENS.md` - Problema y solución de dark mode
- `packages/tokens/token-mapping.ts` - Mapeo completo de tokens
- `packages/tokens/scripts/fix-dark-mode-tokens.cjs` - Script de corrección dark mode
- `scripts/inventory-tokens.sh` - Script de inventario
- `scripts/verify-migration.sh` - Script de verificación
- `scripts/cleanup-token-fallbacks.py` - Script de limpieza

---

## 📝 Nota Importante sobre la Regla de Oro

**🎯 REGLA DE ORO**: NADA hardcodeado ni con tokens antiguos. Si no hay equivalente exacto, buscar el token más parecido de Figma. Si hay algo que no se pueda reemplazar, se evalúa pero NO se deja así sin intentar encontrar una solución.

### ¿Qué significa "evaluar pero no dejar así"?

1. **Buscar el token más parecido**: Si no hay equivalente exacto, comparar valores y usar el más cercano
2. **Ajustar con valores relativos**: Si es necesario, usar valores relativos (ej: `line-height: 1.5`) para mantener proporciones
3. **Documentar la decisión**: Si realmente no hay equivalente, documentar por qué se mantiene un token antiguo o valor hardcodeado
4. **Revisar periódicamente**: Cuando se agreguen nuevos tokens a Figma, revisar si ahora hay equivalente

### Ejemplos de Evaluación

**Ejemplo 1: Font-size sin equivalente exacto**
```css
/* ANTES */
font-size: 12px;

/* EVALUACIÓN: */
/* - body-xs: 11px (muy cercano, diferencia de 1px) */
/* - body-sm: 13px (muy cercano, diferencia de 1px) */
/* - Decisión: Usar body-xs (11px) porque es el más cercano */

/* DESPUÉS */
font-size: var(--modifiers-normal-body-xs-regular-fontsize, 11px);
```

**Ejemplo 2: Font-weight sin equivalente exacto**
```css
/* ANTES */
font-weight: 500;

/* EVALUACIÓN: */
/* - regular: 400 (diferencia de 100) */
/* - semibold: 600 (diferencia de 100) */
/* - Decisión: Usar semibold (600) porque es el más cercano */

/* DESPUÉS */
font-weight: var(--ubits-font-weight-semibold, 600);
```

**Ejemplo 3: Line-height sin equivalente exacto**
```css
/* ANTES */
line-height: 20px;

/* EVALUACIÓN: */
/* - body-sm: 23.4px (diferencia de 3.4px) */
/* - body-xs: 19.8px (diferencia de 0.2px, muy cercano) */
/* - Decisión: Usar body-xs (19.8px) porque es el más cercano */

/* DESPUÉS */
line-height: var(--modifiers-normal-body-xs-regular-lineheight, 19.8px);
```

**Ejemplo 4: Tokens antiguos de typography**
```css
/* ANTES */
font-size: var(--font-body-md-size);
font-weight: var(--weight-semibold);
font-size: var(--font-h1-size, 20px);

/* EVALUACIÓN: */
/* - --font-body-md-size → body-md-regular-fontsize (16px) - exacto */
/* - --weight-semibold → ubits-font-weight-semibold (600) - exacto */
/* - --font-h1-size → heading-h1-fontsize (20px) - exacto */

/* DESPUÉS */
font-size: var(--modifiers-normal-body-md-regular-fontsize);
font-weight: var(--ubits-font-weight-semibold, 600);
font-size: var(--modifiers-normal-heading-h1-fontsize, 20px);
```

**Ejemplo 5: Font-weight strings de Figma**
```css
/* ANTES */
font-weight: var(--modifiers-normal-body-md-semibold-fontweight);
/* Resultado: font-weight: "SemiBold" (inválido en CSS) */

/* EVALUACIÓN: */
/* - Los tokens de Figma devuelven strings, no números */
/* - Necesitamos usar tokens numéricos UBITS */

/* DESPUÉS */
font-weight: var(--ubits-font-weight-semibold, 600);
/* Resultado: font-weight: 600 (válido en CSS) */
```

**Ejemplo 6: Token Morado vs Azul para Progreso (CRÍTICO)**
```css
/* ANTES - INCORRECTO */
.course-status--progress {
  color: var(--modifiers-static-inverted-color-light-accent-brand) !important;
  /* Resultado: color morado (#3865f5) en light mode - INCORRECTO */
}

.course-progress-overlay .progress-fill {
  background: var(--modifiers-static-inverted-color-light-accent-brand) !important;
  /* Resultado: barra morada en light mode - INCORRECTO */
}

/* EVALUACIÓN: */
/* - --modifiers-static-inverted-color-light-accent-brand = MORADO (#3865f5) */
/* - --modifiers-normal-color-light-accent-brand = AZUL (#0c5bef) */
/* - Para progreso y estados activos, necesitamos AZUL, no MORADO */
/* - El token morado es solo para casos específicos de diseño estático invertido */

/* DESPUÉS - CORRECTO */
.course-status--progress {
  color: var(--modifiers-normal-color-light-accent-brand) !important;
  /* Resultado: color azul (#0c5bef) en light mode - CORRECTO */
}

.course-progress-overlay .progress-fill {
  background: var(--modifiers-normal-color-light-accent-brand) !important;
  /* Resultado: barra azul en light mode - CORRECTO */
}
```

---

**Última actualización**: Basado en la migración de Button, Accordion, Alert, Badge, Bar Metric Card, Breadcrumb y Floating Effects, incluyendo corrección de tokens de typography y soporte dark mode (Diciembre 2024)

