# Plan Maestro: Migración de Componentes UBITS

## 📋 Objetivo

Migrar todos los componentes UBITS del sistema de tokens antiguo (`--ubits-*`) al nuevo sistema de tokens de Figma (`--modifiers-normal-*`), incluyendo:
- ✅ Colores (background, foreground, border)
- ✅ Spacing (gap, padding, margin)
- ✅ Border-radius
- ✅ Typography (si aplica)
- ✅ Effects (si aplica)

---

## 🎓 Lecciones Aprendidas del Button

### 1. Sistema de Tokens (ACTUALIZADO)
```css
/* FASE INICIAL: Usar fallbacks de 3 niveles durante migración */
property: var(--token-nuevo-figma, var(--token-antiguo-ubits, valor-hardcodeado)) !important;

/* FASE FINAL: Eliminar fallbacks antiguos y hardcodeados, dejar SOLO token nuevo */
property: var(--token-nuevo-figma) !important;
```

**⚠️ IMPORTANTE**: Después de la migración, en la Fase 5 se eliminan los fallbacks antiguos y valores hardcodeados, dejando SOLO los tokens nuevos de Figma.

### 2. Especificidad CSS con `!important`
- Usar `!important` en propiedades críticas (background, color, border)
- Garantiza que los estilos se apliquen correctamente

### 3. Tokens Sin Equivalente
- NO forzar migraciones
- Mantener tokens antiguos si no tienen equivalente en Figma
- Documentar en `token-mapping.ts`

### 4. Storybook Requiere Manejo Especial
- Usar `data-state-preview` para simular estados
- NO usar estilos inline
- Crear reglas CSS específicas para Storybook

### 5. Verificación Final
- Buscar valores hardcodeados (px, %, etc.)
- Verificar que todos los tokens tengan fallbacks
- Probar en Storybook todos los estados

### 6. Soporte Dark Mode (NUEVO - CRÍTICO)
**⚠️ PROBLEMA CRÍTICO ENCONTRADO**: Los componentes migrados usan tokens con `-light-` hardcodeados, por lo que NO cambian automáticamente en dark mode.

**Solución**: Ejecutar el script `fix-dark-mode-tokens.cjs` que agrega reglas `[data-theme="dark"]` que redefinen las variables CSS para que apunten a tokens `-dark-`.

**Pasos Requeridos:**
1. Ejecutar `cd packages/tokens && node scripts/fix-dark-mode-tokens.cjs` después de migrar tokens
2. Verificar que las reglas `[data-theme="dark"]` se agregaron
3. Corregir manualmente reglas específicas que usen tokens `-light-` dentro de `[data-theme="dark"]`
4. Probar componente en dark mode en Storybook

**Documentación completa**: Ver `docs/PROBLEMA-DARK-MODE-TOKENS.md`

### 7. Verificación de Tokens en el DOM (CRÍTICO)
**⚠️ PROBLEMA CRÍTICO ENCONTRADO**: Los tokens pueden existir en `figma-tokens.css` pero NO estar disponibles en el DOM.

**Causa**: El script `build-css.cjs` puede estar filtrando incorrectamente los tokens, eliminando `'light'` o `'dark'` del nombre del token.

**Verificación Requerida:**
1. ✅ Verificar que los tokens existen en `figma-tokens.css`
2. ✅ Verificar que los tokens están en el bloque correcto:
   - Tokens con `'light'` en el nombre → `:root` (líneas 1-3000 aprox.)
   - Tokens con `'dark'` en el nombre → `[data-theme="dark"]` (líneas 3000+)
3. ✅ Verificar que los tokens están disponibles en el DOM:
   ```javascript
   // En consola del navegador
   getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-bg-info-subtle-default')
   // Debe retornar un valor (ej: "#f3f2ff"), NO una cadena vacía
   ```
4. ✅ Verificar visualmente en Storybook que los componentes muestran los colores correctos

**Si los tokens NO están disponibles:**
1. Regenerar tokens: `cd packages/tokens && node build-css.cjs`
2. Verificar que `build-css.cjs` NO filtre `'light'` o `'dark'` del nombre (solo `'Light Mode'` y `'Dark Mode'`)
3. Verificar que los tokens estén en el bloque correcto del CSS generado

---

## 📝 Checklist de Migración por Componente

### Fase 1: Preparación (30 min)

#### 1.1 Inventario de Tokens
- [ ] Identificar TODOS los tokens usados en el componente
  ```bash
  # Buscar tokens antiguos
  grep -r "var(--ubits-" packages/components/[COMPONENTE]/src/styles/
  
  # Buscar valores hardcodeados
  grep -E "(gap|padding|margin|border-radius|font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" packages/components/[COMPONENTE]/src/styles/
  ```

- [ ] Crear lista de tokens por categoría:
  - Colores (background, foreground, border)
  - Spacing (gap, padding, margin)
  - Border-radius
  - Typography (font-family, font-size, font-weight, line-height)
  - Effects (box-shadow, elevation)

- [ ] Verificar tokens en `token-mapping.ts`
  - ¿Existe mapeo para cada token?
  - ¿Hay tokens sin equivalente?

#### 1.2 Backup y Branch
- [ ] Crear backup del archivo CSS
  ```bash
  cp packages/components/[COMPONENTE]/src/styles/[COMPONENTE].css \
     packages/components/[COMPONENTE]/src/styles/[COMPONENTE].css.backup.$(date +%s)
  ```

- [ ] Crear branch de migración
  ```bash
  git checkout -b migrate/[COMPONENTE]-tokens
  ```

#### 1.3 Análisis de Storybook
- [ ] Revisar archivo `.stories.ts` del componente
- [ ] Identificar controladores (controls) usados
- [ ] Identificar estados visuales (hover, active, focus, disabled, loading)
- [ ] Verificar si usa `data-state-preview` o estilos inline

---

### Fase 2: Migración de Tokens (2-4 horas)

#### 2.1 Migración de Colores
- [ ] Migrar tokens de background
  ```css
  /* Antes */
  background: var(--ubits-bg-1);
  
  /* Después */
  background: var(--modifiers-normal-color-light-bg-1, var(--ubits-bg-1, #ffffff)) !important;
  ```

- [ ] Migrar tokens de foreground
  ```css
  /* Antes */
  color: var(--ubits-fg-1-high);
  
  /* Después */
  color: var(--modifiers-normal-color-light-fg-1-high, var(--ubits-fg-1-high, #303a47)) !important;
  ```

- [ ] Migrar tokens de border
  ```css
  /* Antes */
  border: 1px solid var(--ubits-border-1);
  
  /* Después */
  border: 1px solid var(--modifiers-normal-color-light-border-1, var(--ubits-border-1, #e5e7eb)) !important;
  ```

- [ ] Migrar tokens de estados (hover, active, pressed, disabled)
- [ ] Migrar tokens de variantes (si aplica)

#### 2.2 Migración de Spacing
- [ ] Migrar `gap`
  ```css
  /* Antes */
  gap: 8px;
  
  /* Después */
  gap: var(--ubits-spacing-sm, 8px);
  ```

- [ ] Migrar `padding`
  ```css
  /* Antes */
  padding: 12px 16px;
  
  /* Después */
  padding: var(--ubits-spacing-md, 12px) var(--ubits-spacing-lg, 16px);
  ```

- [ ] Migrar `margin`
  ```css
  /* Antes */
  margin: 0;
  
  /* Después */
  margin: var(--ubits-spacing-none, 0);
  ```

#### 2.3 Migración de Border-radius
- [ ] Migrar valores hardcodeados
  ```css
  /* Antes */
  border-radius: 8px;
  
  /* Después */
  border-radius: var(--ubits-border-radius-sm, 8px);
  ```

- [ ] Mantener valores específicos (`50%`, `inherit`, `0`)

#### 2.4 Migración de Typography (Opcional)
- [ ] Evaluar si migrar o mantener sistema antiguo
- [ ] Si migrar, crear función helper para conversión
- [ ] Si mantener, documentar decisión

#### 2.5 Migración de Effects (Opcional)
- [ ] Evaluar si migrar o mantener sistema antiguo
- [ ] Si migrar, crear función helper para construir sombras
- [ ] Si mantener, documentar decisión

---

### Fase 3: Actualización de Storybook (1-2 horas)

#### 3.1 Actualizar Controladores
- [ ] Revisar `controls` en `.stories.ts`
- [ ] Asegurar que todos los estados sean controlables
- [ ] Agregar controladores faltantes si es necesario

#### 3.2 Actualizar Preview de Estados
- [ ] Revisar función de aplicación de estados (si existe)
- [ ] Eliminar estilos inline
- [ ] Usar `data-state-preview` para simular estados
  ```typescript
  function applyState(element: HTMLElement, state: string) {
    // Remover estados anteriores
    element.removeAttribute('data-state-preview');
    
    // Limpiar estilos inline
    element.style.removeProperty('background');
    element.style.removeProperty('color');
    
    // Aplicar estado con atributo data
    if (state !== 'default') {
      element.setAttribute('data-state-preview', state);
    }
  }
  ```

#### 3.3 Agregar Reglas CSS para Storybook
- [ ] Crear reglas CSS para `data-state-preview`
  ```css
  /* En el archivo CSS del componente */
  .ubits-[COMPONENTE][data-state-preview="hover"]:not(:disabled) {
    /* Usar tokens de Figma con fallbacks */
    background: var(--modifiers-normal-..., var(--ubits-..., #valor)) !important;
  }
  ```

#### 3.4 Verificar Visualización
- [ ] Probar todos los estados en Storybook
- [ ] Verificar modo dark
- [ ] Verificar responsive
- [ ] Verificar todas las variantes

---

### Fase 4: Verificación y Limpieza (1 hora)

#### 4.1 Verificar Tokens Migrados
- [ ] Buscar tokens antiguos sin migrar
  ```bash
  grep -r "var(--ubits-" packages/components/[COMPONENTE]/src/styles/ | grep -v "var(--ubits-" | grep -v "backup"
  ```

- [ ] Verificar que todos los tokens nuevos tengan fallbacks

#### 4.2 Verificar Valores Hardcodeados
- [ ] Buscar valores hardcodeados de spacing
  ```bash
  grep -E "(gap|padding|margin):\s*[0-9]+px" packages/components/[COMPONENTE]/src/styles/*.css | grep -v "var(--"
  ```

- [ ] Buscar valores hardcodeados de border-radius
  ```bash
  grep -E "border-radius:\s*[0-9]+px" packages/components/[COMPONENTE]/src/styles/*.css | grep -v "var(--"
  ```

- [ ] Buscar valores hardcodeados de typography
  ```bash
  grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" packages/components/[COMPONENTE]/src/styles/*.css | grep -v "var(--"
  ```

- [ ] Buscar valores hardcodeados de effects
  ```bash
  grep -E "box-shadow:\s*[0-9]" packages/components/[COMPONENTE]/src/styles/*.css | grep -v "var(--"
  ```

#### 4.3 Verificar Especificidad CSS
- [ ] Verificar que propiedades críticas tengan `!important`
- [ ] Verificar que no haya conflictos de especificidad

#### 4.4 Verificar Fallbacks
- [ ] Verificar que todos los tokens tengan fallback de 3 niveles
- [ ] Verificar que los fallbacks sean correctos

#### 4.5 Verificar Tokens en el DOM (CRÍTICO - NUEVO)
- [ ] Verificar que los tokens existen en `figma-tokens.css`
  ```bash
  grep "modifiers-normal-color-light-feedback-bg-info-subtle-default" packages/tokens/dist/figma-tokens.css
  ```

- [ ] Verificar que los tokens están en el bloque correcto
  ```bash
  # Tokens con 'light' deben estar en :root (líneas 1-3000 aprox.)
  sed -n '1,3000p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
  
  # Tokens con 'light' NO deben estar en [data-theme="dark"]
  sed -n '3001,$p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
  # Debe retornar vacío (o solo tokens que realmente son dark)
  ```

- [ ] Verificar que los tokens están disponibles en el DOM
  ```javascript
  // Ejecutar en consola del navegador (Storybook)
  const token = '--modifiers-normal-color-light-feedback-bg-info-subtle-default';
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  console.log(`Token: ${token}`);
  console.log(`Valor: ${value || 'NO DEFINIDO'}`);
  // Debe mostrar un valor hexadecimal (ej: "#f3f2ff"), NO "NO DEFINIDO"
  ```

- [ ] Si los tokens NO están disponibles:
  - [ ] Regenerar tokens: `cd packages/tokens && node build-css.cjs`
  - [ ] Verificar que `build-css.cjs` NO filtre `'light'` o `'dark'` del nombre
  - [ ] Verificar que solo filtre `'Light Mode'` y `'Dark Mode'`
  - [ ] Recargar Storybook y verificar nuevamente

---

### Fase 5: Limpieza Final - Eliminar Fallbacks Antiguos y Hardcodeados (30 min)

**🎯 OBJETIVO**: Dejar SOLO tokens nuevos de Figma, sin fallbacks antiguos ni valores hardcodeados.

#### 5.1 Limpiar Fallbacks Antiguos de Tokens de Color
- [ ] Eliminar fallbacks antiguos (`--ubits-*`) de tokens que SÍ tienen equivalente en Figma
  ```bash
  ./scripts/cleanup-token-fallbacks.sh [COMPONENTE]
  ```
  
  **Antes:**
  ```css
  color: var(--modifiers-normal-color-light-fg-1-high, var(--ubits-fg-1-high, #303a47)) !important;
  ```
  
  **Después:**
  ```css
  color: var(--modifiers-normal-color-light-fg-1-high) !important;
  ```

#### 5.2 Mantener Tokens Sin Equivalente
- [ ] **NO eliminar** tokens antiguos que NO tienen equivalente en Figma:
  - `--ubits-spacing-*` (xs, sm, md, lg, xl, none)
  - `--ubits-border-radius-*` (xs, sm, md, lg, xl, full)
  - `--ubits-button-focus-ring` (si no tiene equivalente)
  - `--ubits-btn-primary-fg` (si no tiene equivalente)
  - Cualquier otro token documentado en `token-mapping.ts` como "sin equivalente"

#### 5.3 Verificar Limpieza
- [ ] Verificar que no queden fallbacks antiguos de tokens de color
  ```bash
  grep -E "var\(--modifiers-normal-[^,)]+,\s*var\(--ubits-" packages/components/[COMPONENTE]/src/styles/*.css
  ```
  Debe retornar vacío (excepto para tokens sin equivalente)

- [ ] Verificar que no queden valores hardcodeados en tokens de color
  ```bash
  grep -E "var\(--modifiers-normal-[^,)]+,\s*#[0-9a-fA-F]{3,8}\)" packages/components/[COMPONENTE]/src/styles/*.css
  grep -E "var\(--modifiers-normal-[^,)]+,\s*rgba\(" packages/components/[COMPONENTE]/src/styles/*.css
  ```
  Debe retornar vacío

- [ ] Verificar que solo queden tokens nuevos de Figma
  ```bash
  grep -E "var\(--modifiers-normal-[^,)]+\)" packages/components/[COMPONENTE]/src/styles/*.css | head -5
  ```

#### 5.4 Testing Post-Limpieza
- [ ] Probar componente en Storybook
- [ ] Verificar que todos los estados funcionan
- [ ] Verificar modo dark
- [ ] Verificar que funciona con `figma-tokens.css` cargado

---

### Fase 6: Documentación y Testing (30 min)

#### 6.1 Actualizar Documentación
- [ ] Actualizar `README.md` del componente
  - Indicar que requiere `figma-tokens.css` y `tokens.css`
  - Documentar tokens sin equivalente (si los hay)

- [ ] Actualizar `token-mapping.ts`
  - Agregar nuevos mapeos si es necesario
  - Documentar tokens sin equivalente

#### 6.2 Testing Manual
- [ ] Probar componente en aplicación real
- [ ] Verificar que funciona sin `figma-tokens.css` (usando fallbacks)
- [ ] Verificar que funciona con `figma-tokens.css`
- [ ] Verificar modo dark
- [ ] Verificar responsive

#### 6.3 Commit y PR
- [ ] Commit con mensaje descriptivo
  ```bash
  git commit -m "feat([COMPONENTE]): migrar tokens a sistema Figma

  - Migrar tokens de color (48 tokens)
  - Migrar valores hardcodeados de spacing a tokens
  - Migrar valores hardcodeados de border-radius a tokens
  - Actualizar Storybook para usar data-state-preview
  - Agregar fallbacks de 3 niveles para todos los tokens
  - Verificar que no queden valores hardcodeados"
  ```

- [ ] Crear PR con descripción detallada

---

## 🔧 Scripts de Ayuda

### Script 0: Limpieza de Fallbacks Antiguos
```bash
#!/usr/bin/env python3
# scripts/cleanup-token-fallbacks.py [COMPONENTE]

# Elimina fallbacks antiguos y valores hardcodeados
# Deja SOLO tokens nuevos de Figma
python3 scripts/cleanup-token-fallbacks.py button
```

**Uso:**
```bash
# Limpiar fallbacks de un componente
python3 scripts/cleanup-token-fallbacks.py button

# El script:
# 1. Crea un backup automático
# 2. Elimina var(--token-nuevo, var(--token-antiguo, #valor)) → var(--token-nuevo)
# 3. Elimina var(--token-nuevo, #valor) → var(--token-nuevo)
# 4. Mantiene tokens sin equivalente (spacing, border-radius, etc.)
```

### Script 1: Inventario de Tokens
```bash
#!/bin/bash
# scripts/inventory-tokens.sh [COMPONENTE]

COMPONENTE=$1
CSS_FILE="packages/components/${COMPONENTE}/src/styles/${COMPONENTE}.css"

echo "📊 INVENTARIO DE TOKENS: ${COMPONENTE}"
echo ""

echo "🎨 Tokens de Color:"
grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(bg|fg|border|accent|button)" | head -20

echo ""
echo "📏 Valores Hardcodeados de Spacing:"
grep -E "(gap|padding|margin):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | head -10

echo ""
echo "🔲 Valores Hardcodeados de Border-radius:"
grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | head -10

echo ""
echo "📝 Valores Hardcodeados de Typography:"
grep -E "(font-size|font-weight|line-height):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | head -10
```

### Script 2: Verificación Post-Migración
```bash
#!/bin/bash
# scripts/verify-migration.sh [COMPONENTE]

COMPONENTE=$1
CSS_FILE="packages/components/${COMPONENTE}/src/styles/${COMPONENTE}.css"

echo "✅ VERIFICACIÓN POST-MIGRACIÓN: ${COMPONENTE}"
echo ""

echo "1. Tokens antiguos sin migrar:"
OLD_TOKENS=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -v "backup")
if [ -z "$OLD_TOKENS" ]; then
  echo "   ✅ No se encontraron tokens antiguos"
else
  echo "   ⚠️  Tokens antiguos encontrados:"
  echo "$OLD_TOKENS" | head -10
fi

echo ""
echo "2. Valores hardcodeados de spacing:"
HARDCODED_SPACING=$(grep -E "(gap|padding|margin):\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit")
if [ -z "$HARDCODED_SPACING" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de spacing"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_SPACING" | head -10
fi

echo ""
echo "3. Valores hardcodeados de border-radius:"
HARDCODED_RADIUS=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit")
if [ -z "$HARDCODED_RADIUS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados de border-radius"
else
  echo "   ⚠️  Valores hardcodeados encontrados:"
  echo "$HARDCODED_RADIUS" | head -10
fi

echo ""
echo "4. Tokens sin fallback de 3 niveles:"
# Buscar tokens nuevos sin fallback antiguo
NO_FALLBACK=$(grep -E "var\(--modifiers-normal-[^,)]+\)" "$CSS_FILE" | grep -v "var(--ubits-" | head -5)
if [ -z "$NO_FALLBACK" ]; then
  echo "   ✅ Todos los tokens tienen fallbacks"
else
  echo "   ⚠️  Tokens sin fallback encontrados:"
  echo "$NO_FALLBACK"
fi
```

---

## 📊 Priorización de Componentes

### Alta Prioridad (Usados frecuentemente)
1. **Input** - Formularios en todas partes
2. **Card** - Componente base para muchos layouts
3. **Alert** - Feedback al usuario

### Media Prioridad (Usados ocasionalmente)
4. **Modal/Dialog** - Interacciones importantes
5. **Dropdown/Select** - Formularios complejos
6. **Tabs** - Navegación secundaria

### Baja Prioridad (Componentes complejos)
7. **DataTable** - Requiere plan detallado
8. **Sidebar** - Sistema de navegación completo
9. **Form** - Sistema completo de formularios

---

## 🎯 Métricas de Éxito

Para cada componente migrado:
- ✅ **Todos los tokens de color usan SOLO tokens nuevos de Figma** (sin fallbacks antiguos ni hardcodeados)
- ✅ Tokens sin equivalente (spacing, border-radius) se mantienen en sistema antiguo
- ✅ No hay valores hardcodeados en tokens de color (excepto valores específicos como `50%`, `inherit`)
- ✅ Todos los estados funcionan en Storybook
- ✅ Funciona con `figma-tokens.css` cargado
- ✅ Funciona en modo dark
- ✅ Funciona en responsive
- ✅ No hay regresiones visuales

---

## 📚 Recursos

- `docs/LECCIONES-APRENDIDAS-MIGRACION-BUTTON.md` - Lecciones aprendidas
- `docs/LECCION-CRITICA-TOKENS-DOM.md` - Lección crítica sobre verificación de tokens en el DOM
- `docs/PROBLEMA-DARK-MODE-TOKENS.md` - **NUEVO**: Problema y solución de dark mode
- `docs/TOKENS-FALTANTES-MIGRACION-BUTTON.md` - Análisis de tokens faltantes
- `packages/tokens/token-mapping.ts` - Mapeo completo de tokens
- `packages/tokens/scripts/migrate-tokens.cjs` - Script de migración automatizada
- `packages/tokens/scripts/fix-dark-mode-tokens.cjs` - **NUEVO**: Script de corrección dark mode
- `scripts/cleanup-token-fallbacks.py` - Script para eliminar fallbacks antiguos y hardcodeados

---

## 🚨 Errores Comunes a Evitar

1. **NO migrar tokens sin equivalente** - Mantenerlos en sistema antiguo
2. **NO olvidar la Fase 5 de limpieza** - Eliminar fallbacks antiguos y hardcodeados después de migrar
3. **NO usar estilos inline en Storybook** - Usar atributos data
4. **NO migrar múltiples estados a la vez** - Uno por uno
5. **NO olvidar `!important`** - En propiedades críticas
6. **NO dejar valores hardcodeados en tokens de color** - Solo tokens nuevos de Figma
7. **NO eliminar tokens sin equivalente** - Mantener spacing y border-radius en sistema antiguo
8. **NO olvidar verificar** - Ejecutar scripts de verificación
9. **NO asumir que los tokens están disponibles** - SIEMPRE verificar que los tokens estén en el DOM (Fase 4.5)
10. **NO filtrar 'light' o 'dark' del nombre del token** - Solo filtrar 'Light Mode' y 'Dark Mode' en build-css.cjs
11. **NO olvidar agregar soporte dark mode** - Ejecutar `fix-dark-mode-tokens.cjs` después de migrar tokens
12. **NO dejar tokens `-light-` en reglas `[data-theme="dark"]`** - Reemplazar con tokens `-dark-` explícitos

---

## ✅ Checklist Rápido

Antes de marcar un componente como "migrado":

- [ ] Todos los tokens de color migrados con fallbacks (Fase 2)
- [ ] Todos los valores hardcodeados de spacing migrados (Fase 2)
- [ ] Todos los valores hardcodeados de border-radius migrados (Fase 2)
- [ ] Storybook actualizado con `data-state-preview` (Fase 3)
- [ ] **Soporte dark mode agregado (fix-dark-mode-tokens.cjs ejecutado) (Fase 3.5)**
- [ ] **Componente probado en dark mode (Fase 3.5)**
- [ ] Script de verificación ejecutado sin errores (Fase 4)
- [ ] **Fallbacks antiguos eliminados - Solo tokens nuevos de Figma (Fase 5)**
- [ ] **Valores hardcodeados eliminados de tokens de color (Fase 5)**
- [ ] README actualizado (Fase 6)
- [ ] Testing manual completado (Fase 6)
- [ ] Commit y PR creados (Fase 6)

---

**Última actualización**: Basado en la migración del componente Button y corrección de dark mode en 8 componentes migrados (Diciembre 2024)

