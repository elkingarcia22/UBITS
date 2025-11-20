# Lecciones Aprendidas: Migración del Componente Button

## 📋 Resumen de la Migración

### ✅ Componente Migrado: Button
- **Archivo principal**: `packages/components/button/src/styles/button.css`
- **Tokens migrados**: ~48 tokens
- **Estados migrados**: Primary, Secondary, Tertiary, Active, Disabled, Loading, Hover, Pressed, Focus
- **Modificadores migrados**: Floating, Icon-right, Icon-only, Full-width, Block

---

## 🎓 Lecciones Aprendidas

### 1. **Sistema de Fallbacks de 3 Niveles es Crítico**

**Problema encontrado:**
- Los tokens nuevos de Figma no siempre están disponibles cuando el componente se carga
- Si falta `figma-tokens.css`, el componente se rompe visualmente

**Solución implementada:**
```css
/* Sistema de fallbacks de 3 niveles */
background: var(--token-nuevo, var(--token-antiguo, valor-hardcodeado)) !important;
```

**Por qué funciona:**
1. **Primer nivel**: Token nuevo de Figma (`--modifiers-normal-*`)
2. **Segundo nivel**: Token antiguo UBITS (`--ubits-*`) como respaldo
3. **Tercer nivel**: Valor hardcodeado como último recurso

**Lección**: **SIEMPRE** implementar fallbacks de 3 niveles para garantizar que el componente funcione incluso si los tokens no están cargados.

---

### 2. **Especificidad CSS con `!important` es Necesaria**

**Problema encontrado:**
- Los estilos del componente se sobrescribían por otros estilos globales
- Los estados hover/pressed no se aplicaban correctamente

**Solución implementada:**
```css
.ubits-button--primary {
    background: var(--token-nuevo, var(--token-antiguo, #0c5bef)) !important;
    border: 1px solid var(--token-nuevo, var(--token-antiguo, #0c5bef)) !important;
}
```

**Lección**: En componentes complejos con múltiples variantes y estados, usar `!important` en propiedades críticas (background, color, border) para garantizar que los estilos se apliquen correctamente.

---

### 3. **Tokens Sin Equivalente Directo Requieren Manejo Especial**

**Problema encontrado:**
- Algunos tokens antiguos no tienen equivalente directo en Figma
- Ejemplo: `--ubits-btn-primary-fg`, `--ubits-button-focus-ring`, `--ubits-elevation-floating`

**Solución implementada:**
- **NO migrar** tokens sin equivalente directo
- Mantenerlos en `tokens.css` (sistema antiguo)
- Documentar en `token-mapping.ts` que no tienen equivalente

**Lección**: No forzar migraciones. Si un token no tiene equivalente, mantenerlo en el sistema antiguo y documentar por qué.

---

### 4. **Estado Active Requiere Lógica Especial**

**Problema encontrado:**
- El estado `active` (outline style) tiene un comportamiento diferente según la variante
- Primary + Active debería mantener el estilo primary, no el outline

**Solución implementada:**
```css
/* Primary + Active: mantener fondo azul, no usar el estilo active outline */
.ubits-button--primary.ubits-button--active {
    background: var(--modifiers-normal-button-color-light-brand-primary-bg-default, ...) !important;
    /* NO usar el estilo outline */
}

.ubits-button--primary.ubits-button--active::before {
    content: none !important; /* Eliminar overlay azul */
}
```

**Lección**: Algunos estados tienen comportamientos especiales según la variante. Necesitan reglas CSS específicas con mayor especificidad.

---

### 5. **Storybook Requiere Manejo Especial de Estados**

**Problema encontrado:**
- Los estados visuales (hover, active, focus) no se pueden simular con pseudo-clases CSS en Storybook
- Los estilos inline interferían con los tokens de Figma

**Solución implementada:**
1. **Eliminar estilos inline** que interfieren
2. **Usar atributos data** (`data-state-preview`) para simular estados
3. **Crear reglas CSS específicas** para Storybook que usen los tokens de Figma

```css
/* Reglas CSS para Storybook */
.ubits-button[data-state-preview="hover"]:not(:disabled):not(.ubits-button--loading) {
    background: var(--modifiers-normal-button-color-light-brand-primary-bg-hover, ...) !important;
}
```

**Lección**: Storybook necesita un sistema de simulación de estados que no interfiera con el CSS real. Usar atributos data y reglas CSS específicas.

---

### 6. **Estado Loading Requiere Manipulación del DOM**

**Problema encontrado:**
- El spinner no se renderiza automáticamente cuando se cambia el estado desde el controlador
- El texto del botón desaparece porque no tiene la clase `button-text`

**Solución implementada:**
1. **Detectar** si el spinner existe, si no, crearlo
2. **Detectar** el texto del botón y agregar clase `button-text`
3. **Insertar** el spinner en la posición correcta según `iconPosition`

**Lección**: Algunos estados requieren manipulación del DOM en tiempo de ejecución. Necesitan lógica JavaScript/TypeScript además de CSS.

---

### 7. **Icono a la Derecha Requiere Orden Correcto del HTML**

**Problema encontrado:**
- `flex-direction: row-reverse` invertía el orden cuando el HTML ya estaba correcto
- El icono aparecía a la izquierda en lugar de la derecha

**Solución implementada:**
```css
/* Cuando iconPosition es 'right', el HTML ya tiene el orden correcto */
.ubits-button--icon-right {
    flex-direction: row !important; /* NO row-reverse */
    gap: 8px !important;
}
```

**Lección**: Verificar el orden del HTML generado antes de aplicar `flex-direction: row-reverse`. Si el HTML ya está en el orden correcto, no invertir.

---

### 8. **Mapeo de Tokens Debe Ser Exhaustivo y Documentado**

**Problema encontrado:**
- Algunos tokens no estaban en el mapeo inicial
- Faltaban tokens para estados específicos (hover, pressed, disabled)

**Solución implementada:**
- Crear `token-mapping.ts` con mapeo completo
- Documentar tokens sin equivalente
- Generar `token-mapping.json` para scripts CommonJS

**Lección**: El mapeo de tokens debe ser exhaustivo y estar bien documentado. Incluir todos los estados y variantes.

---

## 📦 Qué se Migró Exactamente

### ⚠️ IMPORTANTE: Solo se Migraron Tokens de COLOR

**Respuesta directa**: NO, no migré todos los tokens. Solo migré los tokens de **COLOR** (background, foreground, border, button colors).

**Tokens NO migrados:**
- ❌ **Typography** (font-family, font-size, font-weight, line-height)
- ❌ **Spacing** (gap, padding, margin)
- ❌ **Border-radius** (border-radius)
- ❌ **Effects** (elevation, shadows - algunos no tienen equivalente)

### Tokens Migrados (48 tokens - SOLO COLORES)

#### Primary Button
- `--ubits-button-primary-bg-default` → `--modifiers-normal-button-color-light-brand-primary-bg-default`
- `--ubits-button-primary-hover` → `--modifiers-normal-button-color-light-brand-primary-bg-hover`
- `--ubits-button-primary-pressed` → `--modifiers-normal-button-color-light-brand-primary-bg-pressed`

#### Secondary Button
- `--ubits-btn-secondary-bg-default` → `--modifiers-normal-button-color-light-brand-secondary-bg-default`
- `--ubits-btn-secondary-bg-hover` → `--modifiers-normal-button-color-light-brand-secondary-bg-hover`
- `--ubits-btn-secondary-bg-pressed` → `--modifiers-normal-button-color-light-brand-secondary-bg-pressed`
- `--ubits-btn-secondary-fg-default` → `--modifiers-normal-button-color-light-brand-secondary-fg-default`
- `--ubits-btn-secondary-border` → `--modifiers-normal-button-color-light-brand-secondary-border`

#### Tertiary Button
- `--ubits-btn-tertiary-fg` → `--modifiers-normal-button-color-light-brand-tertiary-fg`
- `--ubits-btn-tertiary-bg-hover` → `--modifiers-normal-button-color-light-brand-tertiary-bg-hover`
- `--ubits-btn-tertiary-bg-pressed` → `--modifiers-normal-button-color-light-brand-tertiary-bg-pressed`

#### Disabled States
- `--ubits-bg-disabled-button` → `--modifiers-normal-color-light-bg-disabled`
- `--ubits-fg-on-disabled-button` → `--modifiers-normal-color-light-fg-on-disabled`
- `--ubits-border-disabled-button` → `--modifiers-normal-color-light-border-disabled`

#### Active State (Outline)
- `--ubits-bg-1` → `--modifiers-normal-color-light-bg-1`
- `--ubits-accent-brand` → `--modifiers-normal-color-light-accent-brand`
- `--ubits-bg-active-button` → `--modifiers-normal-color-light-bg-active`

#### Feedback/Error
- `--ubits-button-badge` → `--modifiers-normal-color-light-feedback-accent-error`

### Tokens NO Migrados (Sin Equivalente)

#### Tokens de Color sin Equivalente
- `--ubits-btn-primary-fg` (mantenido en sistema antiguo)
- `--ubits-button-focus-ring` (mantenido en sistema antiguo)
- `--ubits-elevation-floating` (mantenido en sistema antiguo)
- `--ubits-elevation-floating-hover` (mantenido en sistema antiguo)
- `--ubits-elevation-floating-active` (mantenido en sistema antiguo)

#### Tokens de Typography (NO migrados)
**Estado actual**: El Button usa tokens antiguos de typography:
- `--font-sans` → Usa `tokens-typography.css` (sistema antiguo)
- `--font-body-md-size` → Usa `tokens-typography.css` (sistema antiguo)
- `--font-body-md-line` → Usa `tokens-typography.css` (sistema antiguo)
- `--weight-semibold` → Usa `tokens-typography.css` (sistema antiguo)

**Razón**: Los tokens de typography en Figma tienen una estructura diferente:
- Figma usa: `.modifiers/Normal.fontSize.2` (valor numérico: 16)
- UBITS usa: `--font-body-md-size: 16px` (valor con unidad)
- Figma usa: `.modifiers/Normal.fontWeights.noto-sans-1: SemiBold` (string)
- UBITS usa: `--weight-semibold: 600` (número)

**Acción requerida**: Crear mapeo de typography tokens o mantener sistema antiguo.

#### Tokens de Spacing (NO migrados)
**Estado actual**: El Button usa valores hardcodeados:
- `gap: 8px` → Debería usar `--ubits-spacing-sm` o token de Figma
- `padding: 12px 16px` → Debería usar tokens de spacing

**Razón**: Los tokens de spacing NO existen en `figma-tokens.json`. Solo existen en `tokens.json` (sistema antiguo):
- `--ubits-spacing-sm: 8px`
- `--ubits-spacing-md: 12px`
- `--ubits-spacing-lg: 16px`

**Acción requerida**: 
1. Verificar si Figma tiene tokens de spacing (no encontrados)
2. Si no existen, mantener sistema antiguo o crear tokens nuevos

#### Tokens de Border-radius (NO migrados)
**Estado actual**: El Button usa valores hardcodeados:
- `border-radius: 8px` → Debería usar `--ubits-border-radius-sm` o token de Figma

**Razón**: Los tokens de border-radius NO existen en `figma-tokens.json`. Solo existen en `tokens.json` (sistema antiguo):
- `--ubits-border-radius-sm: 8px`
- `--ubits-border-radius-md: 12px`

**Acción requerida**: 
1. Verificar si Figma tiene tokens de border-radius (no encontrados)
2. Si no existen, mantener sistema antiguo o crear tokens nuevos

#### Tokens de Effects (Parcialmente migrados)
**Estado actual**: 
- `--ubits-elevation-floating` → NO migrado (no tiene equivalente único en Figma)
- `--ubits-button-focus-ring` → NO migrado (no tiene equivalente en Figma)

**Razón**: Los efectos en Figma están estructurados de forma diferente:
- Figma tiene tokens de elevation separados (position, blur, spread, color)
- UBITS tiene un token único con toda la sombra: `0 14px 28.8px 0 rgba(0, 0, 0, 0.24)`

**Acción requerida**: 
1. Crear función helper para construir sombras desde tokens de Figma
2. O mantener tokens antiguos para efectos complejos

---

## 🚀 Estrategia para Componentes Más Complejos

### Fase 1: Análisis y Preparación

#### 1.1 Inventario de Tokens
```bash
# Para cada componente:
1. Identificar TODOS los tokens usados (grep en archivos CSS)
2. Crear lista de tokens antiguos → nuevos
3. Identificar tokens sin equivalente
4. Documentar en token-mapping.ts
```

#### 1.2 Análisis de Complejidad
- **Componentes simples** (Badge, Alert): Migración directa
- **Componentes medianos** (Input, Card): Requieren atención a estados
- **Componentes complejos** (DataTable, Sidebar): Requieren plan detallado

### Fase 2: Migración por Categorías

#### Categoría A: Componentes Simples (1-2 días cada uno)
- ✅ **Badge**: Solo colores y tipografía
- ✅ **Alert**: Colores, bordes, tipografía
- ✅ **Tooltip**: Colores y sombras

**Estrategia:**
1. Migrar tokens directamente
2. Agregar fallbacks de 3 niveles
3. Verificar en Storybook

#### Categoría B: Componentes Medianos (3-5 días cada uno)
- ⚠️ **Input**: Múltiples estados (default, focus, error, disabled)
- ⚠️ **Card**: Variantes, hover, estados
- ⚠️ **Modal/Dialog**: Overlay, animaciones, estados

**Estrategia:**
1. Migrar por estados (empezar con default)
2. Agregar estados uno por uno (focus, hover, error)
3. Probar cada estado en Storybook antes de continuar
4. Documentar comportamientos especiales

#### Categoría C: Componentes Complejos (1-2 semanas cada uno)
- 🔴 **DataTable**: Múltiples variantes, estados de fila, paginación, sorting
- 🔴 **Sidebar**: Múltiples modos, estados de navegación, responsive
- 🔴 **Form**: Múltiples campos, validación, estados complejos

**Estrategia:**
1. **Dividir en sub-componentes**:
   - DataTable → TableHeader, TableRow, TableCell, Pagination
   - Sidebar → SidebarNav, SidebarItem, SidebarSection
   - Form → FormField, FormLabel, FormError, FormHelp

2. **Migrar sub-componentes uno por uno**:
   - Empezar con el más simple
   - Verificar que funcione antes de continuar
   - Documentar dependencias entre sub-componentes

3. **Integración gradual**:
   - Migrar sub-componente base primero
   - Luego migrar dependientes
   - Probar integración completa

4. **Testing exhaustivo**:
   - Probar todos los estados
   - Probar todas las variantes
   - Probar en diferentes tamaños
   - Probar en modo dark

### Fase 3: Herramientas y Automatización

#### 3.1 Script de Migración Mejorado
```javascript
// migrate-component.cjs
// - Detecta automáticamente tokens usados
// - Sugiere mapeos basados en token-mapping.ts
// - Crea backup automático
// - Genera reporte de migración
```

#### 3.2 Validación Post-Migración
```javascript
// validate-migration.cjs
// - Verifica que todos los tokens nuevos existan en figma-tokens.css
// - Verifica que los fallbacks estén presentes
// - Verifica que no haya tokens antiguos sin migrar (opcional)
```

#### 3.3 Testing Automatizado
```javascript
// test-component-visual.cjs
// - Compara capturas de pantalla antes/después
// - Verifica que los colores sean correctos
// - Verifica que los estados funcionen
```

---

## 📝 Checklist de Migración por Componente

### Pre-Migración
- [ ] Inventario completo de tokens usados
- [ ] Mapeo de tokens antiguos → nuevos
- [ ] Identificación de tokens sin equivalente
- [ ] Backup del archivo CSS original
- [ ] Crear branch de migración

### Migración
- [ ] Migrar tokens base (default state)
- [ ] Agregar fallbacks de 3 niveles
- [ ] Migrar estados (hover, focus, active, disabled)
- [ ] Migrar variantes (si aplica)
- [ ] Agregar `!important` donde sea necesario
- [ ] Verificar especificidad CSS

### Post-Migración
- [ ] Verificar en Storybook (todos los estados)
- [ ] Verificar en modo dark
- [ ] Verificar responsive
- [ ] Actualizar documentación
- [ ] Actualizar token-mapping.ts
- [ ] Commit con mensaje descriptivo

---

## 🎯 Priorización de Componentes

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

## 🔧 Mejoras al Proceso de Migración

### 1. Template de Migración
Crear un template que incluya:
- Estructura de fallbacks
- Patrones comunes de estados
- Ejemplos de especificidad CSS

### 2. Documentación de Patrones
Documentar patrones comunes:
- Cómo migrar estados hover/pressed
- Cómo manejar estados active
- Cómo manejar estados disabled
- Cómo manejar estados loading

### 3. Testing Continuo
- Probar cada cambio en Storybook antes de continuar
- No migrar múltiples estados a la vez
- Hacer commits pequeños y frecuentes

---

## 📊 Métricas de Éxito

### Para Cada Componente Migrado
- ✅ Todos los estados funcionan correctamente
- ✅ Todos los tokens tienen fallbacks
- ✅ Funciona sin `figma-tokens.css` (usando fallbacks)
- ✅ Funciona en modo dark
- ✅ Funciona en Storybook
- ✅ No hay regresiones visuales

---

## 🚨 Errores Comunes a Evitar

1. **NO migrar tokens sin equivalente** - Mantenerlos en sistema antiguo
2. **NO olvidar fallbacks** - Siempre 3 niveles
3. **NO usar estilos inline en Storybook** - Usar atributos data
4. **NO migrar múltiples estados a la vez** - Uno por uno
5. **NO olvidar `!important`** - En propiedades críticas
6. **NO asumir que el HTML está en cierto orden** - Verificar siempre
7. **NO olvidar limpiar estilos inline** - En funciones de estado

---

## 📚 Recursos Creados

1. **token-mapping.ts** - Mapeo completo de tokens
2. **migrate-tokens.cjs** - Script de migración automatizada
3. **add-all-fallbacks.cjs** - Script para agregar fallbacks
4. **validate-migration.cjs** - Script de validación (a crear)

---

## 🎓 Conclusión

La migración del Button nos enseñó que:
- **Los fallbacks son críticos** para garantizar funcionamiento
- **La especificidad CSS** es necesaria en componentes complejos
- **Storybook requiere manejo especial** de estados
- **Algunos tokens no tienen equivalente** y deben mantenerse
- **La migración debe ser gradual** y bien documentada

Estas lecciones deben aplicarse a todos los componentes futuros para garantizar una migración exitosa y sin regresiones.

