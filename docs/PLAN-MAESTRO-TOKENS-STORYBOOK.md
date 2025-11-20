# 🎯 Plan Maestro: Construcción de Tokens UBITS en Storybook

## 📋 Objetivo

Construir una sección completa de **"Tokens UBITS"** en Storybook que muestre todos los tokens de Figma organizados según la estructura definida, con verificaciones exhaustivas después de cada paso.

---

## 🔍 Fase 0: Preparación y Verificación Inicial

### Paso 0.1: Script de Verificación de Tokens

**Objetivo:** Crear un script que cuente exactamente cuántos tokens hay en cada categoría.

**Archivo:** `packages/tokens/scripts/verify-tokens-count.js`

**Funcionalidad:**
- Leer `packages/tokens/dist/figma-tokens.css`
- Contar tokens por categoría:
  - p-colors (por cada color: pec, gray, indigo, lime, pink, rose, teal, purple, yellow, green, blue)
  - s-colors (accent, fg, bg, border)
  - Semánticos (feedback, brand, chart)
  - Componentes (button, scroll-bar, toggle)
  - Tipografía (font-family, font-size, font-weight, line-height, letter-spacing)
  - Spacing (p-spacing, s-spacing)
  - Border-radius
  - Modifiers (normal, inverted, static, static-inverted)

**Salida esperada:**
```
=== VERIFICACIÓN DE TOKENS ===

p-colors:
  - blue: 2 primitivos base (167 total incluyendo modifiers)
  - gray: 2 primitivos base (92 total incluyendo modifiers)
  - pec: 0 primitivos (no encontrados en CSS generado)
  ...

s-colors:
  - accent: 8 tokens
  - fg: 0 tokens (en s-colors base)
  - bg: 5 tokens
  - border: 10 tokens
  ...

Total esperado: 2157 tokens
Total encontrado: 2079 tokens (diferencia: 78 tokens)
```

**Nota importante:** Los primitivos completos (40-49 colores por grupo) pueden no estar en el CSS generado porque solo se exportan los tokens que se USAN. Los 49 tokens de blue que menciona el usuario probablemente incluyen todos los tokens relacionados con blue (incluyendo modifiers, chart, etc.).

### Paso 0.2: Verificar Estructura de Storybook

**Objetivo:** Asegurar que la estructura de Storybook esté lista.

**Verificaciones:**
- [ ] `packages/storybook/stories/` existe
- [ ] `packages/storybook/.storybook/preview.ts` importa tokens correctamente
- [ ] Storybook puede ejecutarse sin errores

---

## 🏗️ Fase 1: Estructura Base

### Paso 1.1: Crear Carpeta de Tokens

**Objetivo:** Crear la estructura de carpetas para tokens.

**Estructura a crear:**
```
packages/storybook/stories/
└── Tokens UBITS/
    ├── 1. Primitivos (p-colors)/
    ├── 2. Secundarios (s-colors)/
    ├── 3. Semánticos/
    ├── 4. Componentes/
    ├── 5. Tipografía/
    ├── 6. Spacing/
    ├── 7. Border Radius/
    └── 8. Modificadores/
```

**Acción:**
- Crear archivo base: `packages/storybook/stories/TokensUBITS.stories.ts`
- Configurar meta con `title: 'Tokens UBITS'`

### Paso 1.2: Crear Componente de Visualización Base

**Objetivo:** Crear componentes reutilizables para mostrar tokens.

**Componentes a crear:**
- `TokenColorSwatch`: Muestra un color con su valor hex y variable CSS
- `TokenGrid`: Grid responsive para mostrar múltiples tokens
- `TokenTable`: Tabla con información detallada de tokens
- `TokenScale`: Muestra escalas de colores (para p-colors)

**Archivo:** `packages/storybook/stories/TokensUBITS/components.ts`

---

## 🎨 Fase 2: Primitivos (p-colors)

### Paso 2.1: Crear Story para p-colors

**Archivo:** `packages/storybook/stories/TokensUBITS/Primitives.stories.ts`

**Estructura:**
```typescript
title: 'Tokens UBITS/1. Primitivos (p-colors)'
```

**Subcategorías:**
- 1.1 pec (40 colores)
- 1.2 gray (40 colores)
- 1.3 indigo (40 colores)
- 1.4 lime (40 colores)
- 1.5 pink (40 colores)
- 1.6 rose (40 colores)
- 1.7 teal (40 colores)
- 1.8 purple (40 colores)
- 1.9 yellow (40 colores)
- 1.10 green (40 colores)
- 1.11 blue (49 colores) ⚠️ VERIFICAR

### Paso 2.2: Implementar Visualización de Primitivos

**Para cada grupo de primitivos:**
- Grid de colores (5x8 o 8x5 según corresponda)
- Mostrar valor hexadecimal
- Mostrar variable CSS
- Mostrar escala de oscuro a claro

### Paso 2.3: ✅ VERIFICACIÓN - Primitivos Blue

**Objetivo:** Confirmar que todos los tokens relacionados con blue están presentes.

**Script de verificación:**
```bash
node packages/tokens/scripts/verify-tokens-count.cjs
```

**Verificaciones:**
- [ ] Contar tokens base de blue (accent-blue, border-blue): 2 tokens ✅
- [ ] Contar TODOS los tokens de blue (incluyendo modifiers): 167 tokens
  - modifiers-inverted: 37 tokens
  - modifiers-normal: 37 tokens
  - modifiers-static: 74 tokens
  - modifiers-static-inverted: 37 tokens
- [ ] Comparar con tokens en `figma-tokens.css`
- [ ] Confirmar que todos los tokens están visibles en Storybook
- [ ] Verificar que los valores hex son correctos
- [ ] Verificar que las variables CSS son correctas

**Nota:** Los 49 tokens que menciona el usuario probablemente se refieren a:
- Tokens base (2)
- Tokens en modifiers (distribuidos en normal, inverted, static, static-inverted)
- Total: 167 tokens relacionados con blue

**Si hay discrepancias:**
- Documentar qué tokens faltan
- Ajustar el código para incluir todos
- Re-verificar

### Paso 2.4: ✅ VERIFICACIÓN - Todos los Primitivos

**Repetir verificación para:**
- [ ] pec
- [ ] gray
- [ ] indigo
- [ ] lime
- [ ] pink
- [ ] rose
- [ ] teal
- [ ] purple
- [ ] yellow
- [ ] green
- [ ] blue

**Criterio de éxito:** Todos los tokens de cada grupo están presentes y correctos.

---

## 🎨 Fase 3: Secundarios (s-colors)

### Paso 3.1: Crear Story para s-colors

**Archivo:** `packages/storybook/stories/TokensUBITS/Secondaries.stories.ts`

**Estructura:**
```typescript
title: 'Tokens UBITS/2. Secundarios (s-colors)'
```

**Subcategorías:**
- 2.1 Light Mode
  - Accent Colors
  - Foreground (fg)
  - Background (bg)
  - Border
- 2.2 Dark Mode (misma estructura)

### Paso 3.2: Implementar Visualización de Secundarios

**Para cada modo (Light/Dark):**
- Agrupar por tipo (accent, fg, bg, border)
- Mostrar swatches de colores
- Mostrar valores y variables CSS

### Paso 3.3: ✅ VERIFICACIÓN - Secundarios

**Verificaciones:**
- [ ] Contar todos los tokens de accent
- [ ] Contar todos los tokens de fg
- [ ] Contar todos los tokens de bg
- [ ] Contar todos los tokens de border
- [ ] Comparar con `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 🎨 Fase 4: Semánticos

### Paso 4.1: Crear Story para Semánticos

**Archivo:** `packages/storybook/stories/TokensUBITS/Semantic.stories.ts`

**Subcategorías:**
- 3.1 Feedback (8 tokens)
- 3.2 Brand (124 tokens)
- 3.3 Chart (232 tokens)

### Paso 4.2: Implementar Visualización de Semánticos

**Para cada categoría:**
- Mostrar colores con contexto (success, error, warning, info)
- Mostrar ejemplos de uso
- Mostrar valores y variables CSS

### Paso 4.3: ✅ VERIFICACIÓN - Semánticos

**Verificaciones:**
- [ ] Feedback: 8 tokens ✅
- [ ] Brand: 124 tokens ✅
- [ ] Chart: 232 tokens ✅
- [ ] Comparar con `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 🎨 Fase 5: Componentes

### Paso 5.1: Crear Story para btn-tone

**Archivo:** `packages/storybook/stories/TokensUBITS/ButtonTones.stories.ts`

**Estructura:**
- Organizado por TONE primero (Brand, Success, Info, Error, Warning)
- Dentro de cada tone: primary, secondary, tertiary
- Dentro de cada variante: bg, fg

### Paso 5.2: Crear Story para button-tone

**Archivo:** `packages/storybook/stories/TokensUBITS/ButtonToneVariants.stories.ts`

**Estructura:**
- Organizado por VARIANTE primero (primary, secondary, tertiary)
- Dentro de cada variante: Brand, Success, Info, Error, Warning
- Dentro de cada tone: bg, fg

### Paso 5.3: Crear Stories para Otros Componentes

**Archivos:**
- `ScrollBar.stories.ts` (27 tokens)
- `Toggle.stories.ts` (9 tokens)

### Paso 5.4: ✅ VERIFICACIÓN - Componentes

**Verificaciones:**
- [ ] btn-tone: ~200 tokens ✅
- [ ] button-tone: ~200 tokens ✅
- [ ] Scroll Bar: 27 tokens ✅
- [ ] Toggle: 9 tokens ✅
- [ ] Comparar con `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 📝 Fase 6: Tipografía

### Paso 6.1: Crear Story para Tipografía

**Archivo:** `packages/storybook/stories/TokensUBITS/Typography.stories.ts`

**Subcategorías:**
- 5.1 font-family (Noto Sans, Roboto Mono, font-awesome)
- 5.2 font-size (d1-d4, h1-h2, md, sm, xs)
- 5.3 font-weight (regular, semibold, bold)
- 5.4 line-height (none, normal, extended, valores específicos)
- 5.5 letter-spacing (si existe)

### Paso 6.2: Implementar Visualización de Tipografía

**Para cada categoría:**
- Mostrar ejemplos de texto
- Mostrar valores y variables CSS
- Mostrar escalas visuales

### Paso 6.3: ✅ VERIFICACIÓN - Tipografía

**Verificaciones:**
- [ ] font-family: 3 tokens ✅
- [ ] font-size: 9 tokens ✅
- [ ] font-weight: 3 tokens ✅
- [ ] line-height: 3 + valores específicos ✅
- [ ] Comparar con `tokens-typography.css` y `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 📏 Fase 7: Spacing

### Paso 7.1: Crear Story para Spacing

**Archivo:** `packages/storybook/stories/TokensUBITS/Spacing.stories.ts`

**Subcategorías:**
- 6.1 p-spacing (Spacing Primitivo)
- 6.2 s-spacing (Spacing Secundario)

### Paso 7.2: Implementar Visualización de Spacing

**Para cada categoría:**
- Mostrar escala visual de espaciado
- Mostrar valores en px
- Mostrar ejemplos de uso (padding, margin, gap)

### Paso 7.3: ✅ VERIFICACIÓN - Spacing

**Verificaciones:**
- [ ] Contar todos los valores de spacing
- [ ] Comparar con `tokens.css` y `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 🔲 Fase 8: Border Radius

### Paso 8.1: Crear Story para Border Radius

**Archivo:** `packages/storybook/stories/TokensUBITS/BorderRadius.stories.ts`

**Valores:**
- none, xs, sm, md, lg, xl, full

### Paso 8.2: Implementar Visualización de Border Radius

**Mostrar:**
- Ejemplos visuales de cada border-radius
- Valores en px
- Ejemplos de uso en componentes

### Paso 8.3: ✅ VERIFICACIÓN - Border Radius

**Verificaciones:**
- [ ] 7 tokens ✅
- [ ] Comparar con `tokens.css` y `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## 🎭 Fase 9: Modificadores

### Paso 9.1: Crear Story para Modificadores

**Archivo:** `packages/storybook/stories/TokensUBITS/Modifiers.stories.ts`

**Subcategorías:**
- 8.1 Normal (todos los colores en estado normal)
- 8.2 Inverted (todos los colores invertidos)
- 8.3 Static (todos los colores estáticos)
- 8.4 Static Inverted (todos los colores estáticos e invertidos)

**Para cada modificador:**
- Light Mode (accent, fg, bg, border, feedback, chart, button)
- Dark Mode (misma estructura)

### Paso 9.2: Implementar Visualización de Modificadores

**Para cada modificador:**
- Agrupar por modo (Light/Dark)
- Dentro de cada modo, por tipo de color
- Mostrar comparación entre modificadores

### Paso 9.3: ✅ VERIFICACIÓN - Modificadores

**Verificaciones:**
- [ ] Normal: ~600 tokens ✅
- [ ] Inverted: ~600 tokens ✅
- [ ] Static: ~600 tokens ✅
- [ ] Static Inverted: ~600 tokens ✅
- [ ] Comparar con `figma-tokens.css`
- [ ] Confirmar que todos están presentes

---

## ✅ Fase 10: Verificación Final

### Paso 10.1: Verificación Completa

**Script de verificación final:**
```bash
node packages/tokens/scripts/verify-tokens-count.js --all
```

**Verificaciones:**
- [ ] Total de tokens en Storybook = Total en `figma-tokens.css` (2157)
- [ ] Todos los p-colors están presentes
- [ ] Todos los s-colors están presentes
- [ ] Todos los semánticos están presentes
- [ ] Todos los componentes están presentes
- [ ] Toda la tipografía está presente
- [ ] Todo el spacing está presente
- [ ] Todo el border-radius está presente
- [ ] Todos los modificadores están presentes

### Paso 10.2: Documentación

**Crear:**
- README para la sección de Tokens UBITS
- Guía de uso
- Ejemplos de cómo encontrar tokens específicos

---

## 📊 Checklist de Progreso

### Fase 0: Preparación
- [ ] Script de verificación creado
- [ ] Estructura de Storybook verificada

### Fase 1: Estructura Base
- [ ] Carpeta de tokens creada
- [ ] Componentes de visualización creados

### Fase 2: Primitivos
- [ ] Story de primitivos creada
- [ ] Visualización implementada
- [ ] ✅ Verificación blue (49 tokens)
- [ ] ✅ Verificación todos los primitivos

### Fase 3: Secundarios
- [ ] Story de secundarios creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 4: Semánticos
- [ ] Story de semánticos creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 5: Componentes
- [ ] Story de btn-tone creada
- [ ] Story de button-tone creada
- [ ] Stories de otros componentes creadas
- [ ] ✅ Verificación completada

### Fase 6: Tipografía
- [ ] Story de tipografía creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 7: Spacing
- [ ] Story de spacing creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 8: Border Radius
- [ ] Story de border-radius creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 9: Modificadores
- [ ] Story de modificadores creada
- [ ] Visualización implementada
- [ ] ✅ Verificación completada

### Fase 10: Verificación Final
- [ ] Verificación completa ejecutada
- [ ] Documentación creada
- [ ] ✅ Todo verificado y correcto

---

## 🚀 Orden de Ejecución

1. **Fase 0** → Preparación
2. **Fase 1** → Estructura Base
3. **Fase 2** → Primitivos (con verificación detallada)
4. **Fase 3** → Secundarios
5. **Fase 4** → Semánticos
6. **Fase 5** → Componentes
7. **Fase 6** → Tipografía
8. **Fase 7** → Spacing
9. **Fase 8** → Border Radius
10. **Fase 9** → Modificadores
11. **Fase 10** → Verificación Final

---

## ⚠️ Reglas Importantes

1. **NUNCA avanzar sin verificar:** Cada fase debe tener su verificación completada antes de continuar.
2. **Comparar siempre con fuente:** Siempre comparar con `figma-tokens.css` y otros archivos fuente.
3. **Documentar discrepancias:** Si hay diferencias, documentarlas y resolverlas antes de continuar.
4. **Contar manualmente si es necesario:** Si el script no cuenta correctamente, verificar manualmente.
5. **Confirmar con usuario:** Después de cada fase importante, confirmar con el usuario antes de continuar.

---

## 📝 Notas

- El usuario mencionó que blue tiene 49 tokens, no 40. Esto debe verificarse cuidadosamente.
- Cada grupo de primitivos puede tener diferentes cantidades de tokens.
- Los modificadores contienen TODOS los colores del sistema, no solo algunos.
- La estructura debe seguir exactamente la organización de Figma.

---

**¿Listo para empezar? Empezamos con la Fase 0: Preparación y Verificación Inicial.**

