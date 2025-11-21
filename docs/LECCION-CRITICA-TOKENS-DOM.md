# Lección Crítica: Verificación de Tokens en el DOM

## 🐛 Problema Encontrado

Durante la migración del componente Alert, descubrimos un problema crítico:

**Síntoma:**
- ✅ Los tokens aparecían en el CSS generado (`figma-tokens.css`)
- ✅ Los tokens se encontraban en los stylesheets inline de Storybook
- ❌ Los tokens **NO estaban disponibles** en el DOM cuando se consultaban con `getComputedStyle()`
- ❌ Los componentes mostraban colores incorrectos o faltantes (todos en gris o blanco)

**Ejemplo del Problema:**
```javascript
// En consola del navegador
getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-bg-info-subtle-default')
// Retornaba: "" (cadena vacía) en lugar de "#f3f2ff"
```

---

## 🔍 Causa Raíz

El script `build-css.cjs` estaba filtrando incorrectamente los tokens al generar los nombres CSS:

### ❌ Error Cometido

```javascript
// ❌ INCORRECTO: Filtrar 'light' y 'dark' del path
const cssVarName = path
  .filter(p => {
    if (!p) return false;
    const pLower = p.toLowerCase();
    // ❌ Esto elimina 'light' y 'dark' del nombre del token
    return p !== mode && 
           pLower !== 'light mode' && 
           pLower !== 'dark mode' && 
           pLower !== 'light' &&  // ❌ PROBLEMA: Elimina 'light' del nombre
           pLower !== 'dark';     // ❌ PROBLEMA: Elimina 'dark' del nombre
  })
  .map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-'))
  .join('-');

// Resultado: --modifiers-normal-color-feedback-bg-info-subtle-default
// ❌ Falta 'light' en el nombre, el token no se encuentra en el DOM
```

### ✅ Solución Correcta

```javascript
// ✅ CORRECTO: Solo filtrar 'Light Mode' y 'Dark Mode'
const cssVarName = path
  .filter(p => {
    if (!p) return false;
    const pLower = p.toLowerCase();
    // ✅ Solo filtrar nombres de estructura, NO información semántica
    return pLower !== 'light mode' && pLower !== 'dark mode';
    // ✅ Mantiene 'light' y 'dark' en el nombre del token
  })
  .map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-'))
  .join('-');

// Resultado: --modifiers-normal-color-light-feedback-bg-info-subtle-default
// ✅ Incluye 'light' en el nombre, el token se encuentra correctamente
```

---

## 🎯 Por Qué Es Crítico

### 1. Los Nombres de Tokens Deben Preservar Información del Modo

Los tokens de Figma tienen la estructura:
- `modifiers/Normal/color/light/feedback/bg/info/subtle/default`
- `modifiers/Normal/color/dark/feedback/bg/info/subtle/default`

El nombre CSS debe reflejar esta estructura:
- `--modifiers-normal-color-light-feedback-bg-info-subtle-default` (modo light)
- `--modifiers-normal-color-dark-feedback-bg-info-subtle-default` (modo dark)

**Si eliminamos `'light'` o `'dark'` del nombre:**
- El token no se puede distinguir entre modo light y dark
- El CSS no puede aplicar el token correcto según el tema
- El token no está disponible en el DOM

### 2. Solo Debemos Filtrar Nombres de Estructura

**Filtrar (correcto):**
- `'Light Mode'` - Es un nombre de estructura/nodo en el JSON
- `'Dark Mode'` - Es un nombre de estructura/nodo en el JSON

**NO Filtrar (incorrecto):**
- `'light'` - Es información semántica del token (indica modo light)
- `'dark'` - Es información semántica del token (indica modo dark)

### 3. Los Tokens Deben Estar en el Bloque Correcto

Los tokens deben estar en el bloque CSS correcto:
- Tokens con `'light'` en el nombre → `:root` (modo light)
- Tokens con `'dark'` en el nombre → `[data-theme="dark"]` (modo dark)

**Verificación:**
```bash
# Verificar que tokens 'light' están en :root (líneas 1-3000 aprox.)
sed -n '1,3000p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"

# Verificar que tokens 'light' NO están en [data-theme="dark"] (líneas 3001+)
sed -n '3001,$p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
# Debe retornar vacío (o solo tokens que realmente son dark)
```

---

## ✅ Solución Implementada

### 1. Actualizar `build-css.cjs`

```javascript
// Generar nombre de variable CSS desde la ruta
// Filtrar solo "Light Mode" y "Dark Mode" del path, pero MANTENER "light" y "dark" en el nombre
// para que los tokens tengan nombres como --modifiers-normal-color-light-feedback-...
const cssVarName = path
  .filter(p => {
    if (!p) return false;
    const pLower = p.toLowerCase();
    // Solo filtrar "Light Mode" y "Dark Mode", NO filtrar "light" o "dark" individuales
    // porque estos son parte del nombre del token (indican el modo)
    return pLower !== 'light mode' && pLower !== 'dark mode';
  })
  .map(p => p.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-'))
  .join('-');
```

### 2. Verificar que los Tokens Estén en el Bloque Correcto

El script `build-css.cjs` debe:
- Extraer tokens de `modifiers/Normal/color/light/...` → `:root`
- Extraer tokens de `modifiers/Normal/color/dark/...` → `[data-theme="dark"]`

---

## 🔧 Verificación Post-Migración

### Checklist de Verificación

Después de migrar un componente, **SIEMPRE** verificar:

1. ✅ **Los tokens existen en `figma-tokens.css`**
   ```bash
   grep "modifiers-normal-color-light-feedback-bg-info-subtle-default" packages/tokens/dist/figma-tokens.css
   ```

2. ✅ **Los tokens están en el bloque correcto**
   ```bash
   # Tokens con 'light' deben estar en :root (líneas 1-3000 aprox.)
   sed -n '1,3000p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
   
   # Tokens con 'light' NO deben estar en [data-theme="dark"]
   sed -n '3001,$p' packages/tokens/dist/figma-tokens.css | grep "modifiers-normal-color-light"
   ```

3. ✅ **Los tokens están disponibles en el DOM**
   ```javascript
   // Ejecutar en consola del navegador (Storybook)
   const token = '--modifiers-normal-color-light-feedback-bg-info-subtle-default';
   const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
   console.log(`Token: ${token}`);
   console.log(`Valor: ${value || 'NO DEFINIDO'}`);
   // Debe mostrar un valor hexadecimal (ej: "#f3f2ff"), NO "NO DEFINIDO"
   ```

4. ✅ **Los componentes muestran los colores correctos en Storybook**
   - Verificar visualmente que los componentes no están en gris o blanco
   - Verificar que los colores coinciden con los tokens esperados

### Si los Tokens NO Están Disponibles

1. **Regenerar tokens:**
   ```bash
   cd packages/tokens && node build-css.cjs
   ```

2. **Verificar que `build-css.cjs` NO filtre `'light'` o `'dark'` del nombre:**
   - Revisar la función que genera el nombre CSS
   - Asegurar que solo filtre `'Light Mode'` y `'Dark Mode'`
   - Mantener `'light'` y `'dark'` en el nombre

3. **Verificar que los tokens estén en el bloque correcto:**
   - Tokens con `'light'` → `:root`
   - Tokens con `'dark'` → `[data-theme="dark"]`

4. **Recargar Storybook y verificar nuevamente**

---

## 📊 Impacto

### Antes de la Corrección
- ❌ Tokens generados: 5,878 tokens
- ❌ Tokens disponibles en DOM: 0 tokens (todos "NO DEFINIDO")
- ❌ Componentes: Mostraban colores incorrectos (gris/blanco)

### Después de la Corrección
- ✅ Tokens generados: 7,168 tokens
- ✅ Tokens disponibles en DOM: 7,168 tokens (todos con valores hexadecimales)
- ✅ Componentes: Muestran colores correctos según los tokens de Figma

---

## 🎓 Lección Aprendida

**Regla de Oro:**
> **Los nombres de tokens CSS deben preservar toda la información semántica del token original, incluyendo el modo (`light`/`dark`). Solo debemos filtrar nombres de estructura/nodos (`Light Mode`, `Dark Mode`), nunca información semántica.**

**Aplicación:**
- ✅ **Siempre verificar** que los tokens estén disponibles en el DOM después de regenerar `figma-tokens.css`
- ✅ **Incluir esta verificación** en el checklist de migración de componentes
- ✅ **Documentar** cualquier cambio en `build-css.cjs` que afecte la generación de nombres de tokens

---

## 📚 Referencias

- `packages/tokens/build-css.cjs` - Script de generación de tokens
- `packages/tokens/dist/figma-tokens.css` - CSS generado con tokens de Figma
- `docs/PLAN-MAESTRO-MIGRACION-COMPONENTES.md` - Plan de migración actualizado con esta verificación

---

**Última actualización**: Basado en el problema encontrado durante la migración del componente Alert (2024)

