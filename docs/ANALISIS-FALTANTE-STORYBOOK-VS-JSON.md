# 📊 Análisis: Qué Falta en Storybook vs JSON de Figma

## 🎯 Resumen Ejecutivo

Este documento identifica las diferencias entre el JSON de Figma (`figma-tokens.json`) y lo que se muestra actualmente en Storybook, para determinar qué falta agregar.

---

## ✅ Lo que YA está en Storybook

1. **Modificadores (.modifiers)** - ✅ Completo
   - Normal, Inverted, Static, Static Inverted
   - Todos los colores (accent, fg, bg, border, feedback, chart, button)

2. **Semánticos** - ✅ Completo
   - Feedback (success, error, warning, info)
   - Brand
   - Chart

3. **Componentes** - ✅ Completo
   - Button Tone (primary, secondary, tertiary) - ✅ Agregado primary
   - Scroll Bar
   - Toggle

4. **Effects** - ✅ Completo
   - Elevation (sombras)
   - Focus (anillos de enfoque)

5. **Tipografía** - ⚠️ Parcial
   - Font-family: ✅ (pero usa tokens antiguos)
   - Font-size: ✅ (pero usa tokens antiguos)
   - Font-weight: ✅ (pero usa tokens antiguos)
   - Line-height: ✅ (pero usa tokens antiguos)
   - Letter-spacing: ❌ Falta

6. **Spacing** - ✅ Completo
   - p-spacing, s-spacing

7. **Border Radius** - ✅ Completo

---

## ❌ Lo que FALTA en Storybook

### 1. **AI Button** (72 tokens)
- **Ubicación en JSON**: `modifiers/Normal/ai-button`
- **Tokens en CSS**: `--modifiers-normal-ai-button-*`
- **Estado**: ❌ No existe en Storybook
- **Acción requerida**: Crear sección en Components o agregar a Components existente

### 2. **Display (Estilos Completos)** (108 tokens)
- **Ubicación en JSON**: `modifiers/Normal/display`
- **Tokens en CSS**: `--modifiers-normal-display-d1-regular-*`, `--modifiers-normal-display-d2-*`, etc.
- **Incluye**: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration
- **Estado**: ❌ No existe en Storybook
- **Nota**: Typography muestra tokens antiguos (`--font-d1-size`), pero faltan los estilos completos del JSON
- **Acción requerida**: Agregar a Typography o crear nueva sección "Text Styles"

### 3. **Heading (Estilos Completos)** (18 tokens)
- **Ubicación en JSON**: `modifiers/Normal/heading`
- **Tokens en CSS**: `--modifiers-normal-heading-h1-*`, `--modifiers-normal-heading-h2-*`, etc.
- **Incluye**: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration
- **Estado**: ❌ No existe en Storybook
- **Nota**: Typography muestra tokens antiguos (`--font-h1-size`), pero faltan los estilos completos del JSON
- **Acción requerida**: Agregar a Typography o crear nueva sección "Text Styles"

### 4. **Body (Estilos Completos)** (81 tokens)
- **Ubicación en JSON**: `modifiers/Normal/body`
- **Tokens en CSS**: `--modifiers-normal-body-lg-*`, `--modifiers-normal-body-md-*`, etc.
- **Incluye**: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration
- **Estado**: ❌ No existe en Storybook
- **Nota**: Typography muestra tokens antiguos (`--font-body-lg-size`), pero faltan los estilos completos del JSON
- **Acción requerida**: Agregar a Typography o crear nueva sección "Text Styles"

### 5. **Paragraph Spacing** (2 tokens)
- **Ubicación en JSON**: `modifiers/Normal/paragraphSpacing`
- **Tokens en CSS**: `--modifiers-normal-paragraph-spacing-*`
- **Estado**: ❌ No existe en Storybook
- **Acción requerida**: Agregar a Typography

### 6. **Letter Spacing** (desde modifiers)
- **Ubicación en JSON**: `modifiers/Normal/letterSpacing`
- **Tokens en CSS**: `--modifiers-normal-*-letterspacing`
- **Estado**: ⚠️ Existe en display/heading/body pero no como categoría separada
- **Acción requerida**: Agregar a Typography o mostrar en Text Styles

### 7. **Text Case** (48 tokens)
- **Ubicación en JSON**: `modifiers/Normal/textCase`
- **Tokens en CSS**: `--modifiers-normal-*-textcase`
- **Estado**: ❌ No existe en Storybook
- **Acción requerida**: Agregar a Typography o mostrar en Text Styles

### 8. **Text Decoration** (48 tokens)
- **Ubicación en JSON**: `modifiers/Normal/textDecoration`
- **Tokens en CSS**: `--modifiers-normal-*-textdecoration`
- **Estado**: ❌ No existe en Storybook
- **Acción requerida**: Agregar a Typography o mostrar en Text Styles

### 9. **Paragraph Indent** (48 tokens)
- **Ubicación en JSON**: `modifiers/Normal/paragraphIndent`
- **Tokens en CSS**: `--modifiers-normal-*-paragraphindent`
- **Estado**: ❌ No existe en Storybook
- **Acción requerida**: Agregar a Typography o mostrar en Text Styles

---

## 📋 Resumen de Tokens Faltantes

| Categoría | Tokens Faltantes | Prioridad |
|-----------|------------------|-----------|
| AI Button | 72 | Alta |
| Display (completo) | 108 | Alta |
| Heading (completo) | 18 | Alta |
| Body (completo) | 81 | Alta |
| Paragraph Spacing | 2 | Media |
| Text Case | 48 | Media |
| Text Decoration | 48 | Media |
| Paragraph Indent | 48 | Media |
| **TOTAL** | **425 tokens** | |

---

## 🎯 Plan de Acción Recomendado

### Fase 1: Componentes Faltantes (Alta Prioridad)
1. **Agregar AI Button** a `Components.stories.ts`
   - Crear sección para tokens de `--modifiers-normal-ai-button-*`

### Fase 2: Text Styles Completos (Alta Prioridad)
2. **Crear nueva sección "Text Styles"** o expandir Typography
   - Agregar Display (D1, D2, D3, D4) con todos sus estilos
   - Agregar Heading (H1, H2) con todos sus estilos
   - Agregar Body (lg, md, sm, xs) con todos sus estilos
   - Mostrar: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration

### Fase 3: Propiedades Adicionales (Media Prioridad)
3. **Expandir Typography**
   - Agregar Paragraph Spacing
   - Agregar Letter Spacing (como categoría separada si aplica)
   - Agregar Text Case
   - Agregar Text Decoration
   - Agregar Paragraph Indent

---

## 🔍 Notas Importantes

1. **Tokens Antiguos vs Nuevos**: 
   - Storybook actualmente muestra tokens antiguos (`--font-*`, `--weight-*`)
   - El JSON tiene tokens nuevos (`--modifiers-normal-display-*`, `--modifiers-normal-heading-*`)
   - **Decisión necesaria**: ¿Mantener ambos? ¿Migrar a los nuevos? ¿Mostrar ambos?

2. **Estructura de Text Styles**:
   - Los tokens de display/heading/body en el JSON incluyen TODAS las propiedades tipográficas juntas
   - Ejemplo: `--modifiers-normal-display-d1-regular-fontfamily`, `--modifiers-normal-display-d1-regular-fontweight`, etc.
   - Esto es diferente a mostrar font-size, font-weight, etc. por separado

3. **Organización Sugerida**:
   - Opción A: Crear sección "Text Styles" que muestre display/heading/body como estilos completos
   - Opción B: Expandir Typography para incluir todo
   - Opción C: Mantener Typography actual y crear "Text Styles" separado

---

## ✅ Verificación Final

Una vez completado, verificar:
- [ ] Todos los tokens del JSON están en el CSS generado
- [ ] Todos los tokens del CSS están en Storybook
- [ ] La organización en Storybook coincide con la estructura del JSON
- [ ] Los nombres de tokens coinciden entre JSON, CSS y Storybook

