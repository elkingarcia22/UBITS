# 📐 Propuesta: Estructura de Tokens en Storybook

## 🎯 Objetivo

Organizar los **2157 tokens de Figma** en Storybook siguiendo la estructura jerárquica original, agrupados por categorías semánticas y mostrados de forma clara y navegable.

---

## 📊 Resumen de Tokens

**Total: 2157 tokens** organizados en las siguientes categorías:

| Categoría | Cantidad | Descripción |
|-----------|----------|-------------|
| **Color - Accent** | 11 | Colores de acento (brand, green, purple, yellow, etc.) |
| **Color - Foreground** | 2 | Colores de texto base |
| **Color - Background** | 7 | Fondos base (bg-1 a bg-5) |
| **Color - Border** | 13 | Bordes base y coloreados |
| **Color - Feedback** | 8 | Colores de feedback (success, error, warning, info) |
| **Color - Brand** | 124 | Tokens de marca (logo, shapes) |
| **Color - Chart** | 232 | Colores para gráficos y visualizaciones |
| **Color - Button** | 414 | Tokens específicos de botones |
| **Color - Scroll Bar** | 27 | Tokens de scrollbar |
| **Color - Toggle** | 9 | Tokens de toggle switch |
| **Modifiers - Inverted** | 308 | Variantes invertidas (light/dark) |
| **Modifiers - Normal** | ~600 | Variantes normales (light/dark) |
| **Modifiers - Static** | ~600 | Variantes estáticas (light/dark) |
| **Modifiers - Static Inverted** | ~600 | Variantes estáticas invertidas (light/dark) |
| **Tipografía** | ~20 | Font-family, font-size, font-weight, line-height, letter-spacing |
| **Spacing** | ~30 | p-spacing, s-spacing (valores de espaciado) |
| **Border Radius** | 7 | Valores de border-radius |
| **Otros** | ~6 | Tokens misceláneos |

---

## 🗂️ Estructura Propuesta para Storybook

### **Nivel 1: Categorías Principales**

```
Tokens/
├── 1. p-colors (Primitivos Base) ⭐ BASE DE TODO
│   ├── 1.1 pec (40 colores - escala completa)
│   ├── 1.2 gray (40 colores - escala completa)
│   ├── 1.3 indigo (40 colores - escala completa)
│   ├── 1.4 lime (40 colores - escala completa)
│   ├── 1.5 pink (40 colores - escala completa)
│   ├── 1.6 rose (40 colores - escala completa)
│   ├── 1.7 teal (40 colores - escala completa)
│   ├── 1.8 purple (40 colores - escala completa)
│   ├── 1.9 yellow (40 colores - escala completa)
│   ├── 1.10 green (40 colores - escala completa)
│   └── 1.11 blue (40 colores - escala completa)
│   └── Total: ~440 colores primitivos (base de todo)
│
├── 2. s-colors (Secundarios - Derivados de Primitivos)
│   ├── 2.1 Light Mode
│   │   ├── Accent Colors (derivados de p-colors)
│   │   ├── Foreground (derivados de p-colors)
│   │   ├── Background (derivados de p-colors)
│   │   └── Border (derivados de p-colors)
│   └── 2.2 Dark Mode
│       ├── Accent Colors
│       ├── Foreground
│       ├── Background
│       └── Border
│
├── 3. Color Semánticos (Derivados de s-colors)
│   ├── 3.1 Feedback (8 tokens)
│   ├── 3.2 Brand (124 tokens)
│   └── 3.3 Chart (232 tokens)
│
├── 4. Componentes Específicos (Derivados de s-colors)
│   ├── 4.1 btn-tone (Organizado por TONE primero) ⭐
│   │   ├── 4.1.1 Brand
│   │   │   ├── primary/
│   │   │   │   └── bg (background colors)
│   │   │   ├── secondary/
│   │   │   │   ├── bg (background colors)
│   │   │   │   └── fg (foreground colors)
│   │   │   └── tertiary/
│   │   │       └── bg (background colors)
│   │   ├── 4.1.2 Success
│   │   │   ├── primary/ → bg
│   │   │   ├── secondary/ → bg, fg
│   │   │   └── tertiary/ → bg
│   │   ├── 4.1.3 Info
│   │   │   ├── primary/ → bg
│   │   │   ├── secondary/ → bg, fg
│   │   │   └── tertiary/ → bg
│   │   ├── 4.1.4 Error
│   │   │   ├── primary/ → bg
│   │   │   ├── secondary/ → bg, fg
│   │   │   └── tertiary/ → bg
│   │   └── 4.1.5 Warning
│   │       ├── primary/ → bg
│   │       ├── secondary/ → bg, fg
│   │       └── tertiary/ → bg
│   │   Estructura: TONE → Variante (primary/secondary/tertiary) → Propiedad (bg/fg)
│   │
│   ├── 4.2 button-tone (Organizado por VARIANTE primero) ⭐
│   │   ├── 4.2.1 primary
│   │   │   ├── brand/ → bg
│   │   │   ├── success/ → bg
│   │   │   ├── info/ → bg
│   │   │   ├── error/ → bg
│   │   │   └── warning/ → bg
│   │   ├── 4.2.2 secondary
│   │   │   ├── brand/ → bg, fg
│   │   │   ├── success/ → bg, fg
│   │   │   ├── info/ → bg, fg
│   │   │   ├── error/ → bg, fg
│   │   │   └── warning/ → bg, fg
│   │   └── 4.2.3 tertiary
│   │       ├── brand/ → bg
│   │       ├── success/ → bg
│   │       ├── info/ → bg
│   │       ├── error/ → bg
│   │       └── warning/ → bg
│   │   Estructura: Variante (primary/secondary/tertiary) → TONE → Propiedad (bg/fg)
│   │
│   ├── 4.3 Scroll Bar (27 tokens)
│   └── 4.4 Toggle (9 tokens)
│
├── 5. Tipografía (Typography Tokens) ⭐
│   ├── 5.1 font-family
│   │   ├── Noto Sans
│   │   ├── Roboto Mono
│   │   └── font-awesome
│   ├── 5.2 font-size
│   │   ├── Display: d1, d2, d3, d4
│   │   ├── Heading: h1, h2
│   │   └── Body: md, sm, xs
│   ├── 5.3 font-weight
│   │   ├── regular (400)
│   │   ├── semibold (600)
│   │   └── bold (700)
│   ├── 5.4 line-height
│   │   ├── none
│   │   ├── normal
│   │   └── extended
│   └── 5.5 letter-spacing
│
├── 6. Spacing (Espaciado) ⭐
│   ├── 6.1 p-spacing (Spacing Primitivo)
│   │   └── Mode 1
│   └── 6.2 s-spacing (Spacing Secundario)
│       └── Mode 1
│
├── 7. Border Radius ⭐
│   └── Mode 1
│       └── border-radius (none, xs, sm, md, lg, xl, full)
│
└── 8. .modifiers (TODOS los colores con modificadores) ⭐
    ├── 8.1 Normal (Todos los colores en estado normal)
    │   ├── 8.1.1 Light Mode
    │   │   ├── accent (todos los colores de acento)
    │   │   ├── fg (todos los foreground)
    │   │   ├── bg (todos los background)
    │   │   ├── border (todos los borders)
    │   │   ├── feedback (todos los feedback)
    │   │   ├── chart (todos los chart)
    │   │   └── button (todos los button)
    │   └── 8.1.2 Dark Mode (misma estructura)
    │
    ├── 8.2 Inverted (Todos los colores invertidos)
    │   ├── 8.2.1 Light Mode
    │   │   ├── accent (invertidos)
    │   │   ├── fg (invertidos)
    │   │   ├── bg (invertidos)
    │   │   ├── border (invertidos)
    │   │   ├── feedback (invertidos)
    │   │   ├── chart (invertidos)
    │   │   └── button (invertidos)
    │   └── 8.2.2 Dark Mode (misma estructura)
    │
    ├── 8.3 Static (Todos los colores estáticos)
    │   ├── 8.3.1 Light Mode
    │   │   ├── accent (estáticos)
    │   │   ├── fg (estáticos)
    │   │   ├── bg (estáticos)
    │   │   ├── border (estáticos)
    │   │   ├── feedback (estáticos)
    │   │   ├── chart (estáticos)
    │   │   └── button (estáticos)
    │   └── 8.3.2 Dark Mode (misma estructura)
    │
    └── 8.4 Static Inverted (Todos los colores estáticos e invertidos)
        ├── 8.4.1 Light Mode
        │   ├── accent (estáticos e invertidos)
        │   ├── fg (estáticos e invertidos)
        │   ├── bg (estáticos e invertidos)
        │   ├── border (estáticos e invertidos)
        │   ├── feedback (estáticos e invertidos)
        │   ├── chart (estáticos e invertidos)
        │   └── button (estáticos e invertidos)
        └── 8.4.2 Dark Mode (misma estructura)
```

---

## 📋 Detalle de Cada Categoría

### **1. p-colors (Primitivos Base)** ⭐

**Estos son los colores BASE de todo el sistema. Todos los demás tokens se derivan de estos.**

Cada grupo de primitivos contiene **40 colores** en una escala que va de oscuro a claro (o viceversa).

#### **1.1 pec** (40 colores)
- Escala completa de 40 variaciones
- Desde el más oscuro hasta el más claro
- Base para colores de marca/principal

#### **1.2 gray** (40 colores)
- Escala completa de grises
- Desde negro hasta blanco
- Base para colores neutros

#### **1.3 indigo** (40 colores)
- Escala completa de azul índigo
- Base para colores azules

#### **1.4 lime** (40 colores)
- Escala completa de verde lima
- Base para colores verdes

#### **1.5 pink** (40 colores)
- Escala completa de rosa
- Base para colores rosas

#### **1.6 rose** (40 colores)
- Escala completa de rosa/rojo
- Base para colores rojos

#### **1.7 teal** (40 colores)
- Escala completa de verde azulado
- Base para colores teal

#### **1.8 purple** (40 colores)
- Escala completa de púrpura
- Base para colores morados

#### **1.9 yellow** (40 colores)
- Escala completa de amarillo
- Base para colores amarillos

#### **1.10 green** (40 colores)
- Escala completa de verde
- Base para colores verdes

#### **1.11 blue** (40 colores)
- Escala completa de azul
- Base para colores azules

**Organización en Storybook:**
- Grid de 40 colores por grupo (5x8 o 8x5)
- Mostrar escala completa de oscuro a claro
- Mostrar valor hexadecimal de cada color
- Mostrar variable CSS (si existe en el sistema)
- Toggle para ver todos los grupos

**Nota:** Estos primitivos pueden no estar todos en el CSS generado, ya que solo se exportan los tokens que se USAN. Para tener la escala completa, necesitaríamos el JSON original de Figma.

---

### **2. s-colors (Secundarios - Derivados de Primitivos)**

Estos son los colores que se derivan de los primitivos y se organizan por modo (Light/Dark).

#### **2.1 Accent Colors** (derivados de p-colors)
- `--color-color-accent-brand`
- `--color-color-accent-green`
- `--color-color-accent-purple`
- `--color-color-accent-yellow`
- `--color-color-accent-gray`
- `--color-color-accent-blue`
- `--color-color-accent-teal`
- `--color-color-accent-rose`
- `--color-color-accent-pink`
- `--color-color-feedback-accent-success`
- `--color-color-feedback-accent-warning`
- `--color-color-feedback-accent-error`

**Organización en Storybook:**
- Grid de colores con swatches
- Mostrar valor hexadecimal
- Mostrar variable CSS
- Toggle light/dark mode

#### **1.2 Foreground** (2 tokens)
- `--color-color-fg-subtle`
- `--color-color-fg-bold`

**Organización:**
- Muestra de texto con cada color
- Ejemplos de uso

#### **1.3 Background** (7 tokens)
- `--color-color-bg-1` a `--color-color-bg-5`
- `--color-color-bg-active`
- `--color-color-bg-disabled`

**Organización:**
- Grid de fondos
- Comparación lado a lado
- Ejemplos de contraste

#### **1.4 Border** (13 tokens)
- `--color-color-border-1`, `--color-color-border-2`
- `--color-color-border-disabled`
- `--color-color-border-blue`, `--color-color-border-gray`, etc.

**Organización:**
- Muestra de bordes
- Ejemplos de uso en componentes

---

### **2. Color Semánticos**

#### **2.1 Feedback** (8 tokens)
- Accent: success, warning, error
- Border: success, warning, error
- Chart: success, info, warning, error (subtl/bold)

**Organización:**
- Agrupado por tipo (success, error, warning, info)
- Mostrar estados: default, hover, pressed
- Ejemplos de uso en alerts/toasts

#### **2.2 Brand** (124 tokens)
- Logo colors
- BDS shapes (primary, secondary)
- Variantes invertidas

**Organización:**
- Sección de marca
- Logo previews
- Variantes de color

#### **2.3 Chart** (232 tokens)
- Colores por categoría: blue, gray, yellow, green, teal, purple, pink, rose
- Variantes: subtle, bold
- Neutral blue scale (1-14 + base)
- Foreground colors

**Organización:**
- Por color (blue, green, etc.)
- Escala neutral-blue completa
- Ejemplos de gráficos

---

### **3. Componentes Específicos**

#### **4.1 btn-tone (Organizado por TONE primero)** ⭐

**Estructura jerárquica:**
```
btn-tone/
├── Brand/
│   ├── primary/
│   │   └── bg (background: default, hover, pressed)
│   ├── secondary/
│   │   ├── bg (background: default, hover, pressed)
│   │   └── fg (foreground: default, hover)
│   └── tertiary/
│       └── bg (background: default, hover, pressed)
├── Success/ (misma estructura)
├── Info/ (misma estructura)
├── Error/ (misma estructura)
└── Warning/ (misma estructura)
```

**Organización:** TONE → Variante → Propiedad

**Para cada tone (Brand, Success, Info, Error, Warning):**
- **primary**: Tiene `bg` con estados (default, hover, pressed)
- **secondary**: Tiene `bg` y `fg` con estados (default, hover, pressed)
- **tertiary**: Tiene `bg` con estados (default, hover, pressed)

**Uso:** "Quiero ver todos los botones Brand en todas sus variantes"

---

#### **4.2 button-tone (Organizado por VARIANTE primero)** ⭐

**Estructura jerárquica:**
```
button-tone/
├── primary/
│   ├── brand/ → bg
│   ├── success/ → bg
│   ├── info/ → bg
│   ├── error/ → bg
│   └── warning/ → bg
├── secondary/
│   ├── brand/ → bg, fg
│   ├── success/ → bg, fg
│   ├── info/ → bg, fg
│   ├── error/ → bg, fg
│   └── warning/ → bg, fg
└── tertiary/
    ├── brand/ → bg
    ├── success/ → bg
    ├── info/ → bg
    ├── error/ → bg
    └── warning/ → bg
```

**Organización:** Variante → TONE → Propiedad

**Para cada variante (primary, secondary, tertiary):**
- **primary**: Tiene todos los tones (brand, success, info, error, warning) con `bg`
- **secondary**: Tiene todos los tones con `bg` y `fg`
- **tertiary**: Tiene todos los tones con `bg`

**Uso:** "Quiero ver todos los botones primary en todos los tones"

---

**Organización en Storybook para ambas:**

**btn-tone:**
- Agrupar por tone primero (Brand, Success, Info, Error, Warning)
- Dentro de cada tone, mostrar variantes (primary, secondary, tertiary)
- Dentro de cada variante, mostrar propiedades (bg, fg)
- Mostrar estados: default, hover, pressed
- Ejemplos visuales: "Botones Brand", "Botones Success", etc.

**button-tone:**
- Agrupar por variante primero (primary, secondary, tertiary)
- Dentro de cada variante, mostrar tones (Brand, Success, Info, Error, Warning)
- Dentro de cada tone, mostrar propiedades (bg, fg)
- Mostrar estados: default, hover, pressed
- Ejemplos visuales: "Botones Primary", "Botones Secondary", etc.

**Ambas estructuras contienen los mismos tokens, solo organizados de forma diferente para facilitar diferentes flujos de trabajo.**

#### **3.2 Scroll Bar** (27 tokens)
- Background: default, hover, dragged
- Variantes: light/dark, normal/inverted

**Organización:**
- Muestra de scrollbar
- Estados interactivos

#### **3.3 Toggle** (9 tokens)
- Background active
- Variantes: light/dark, normal/inverted

**Organización:**
- Muestra de toggle switch
- Estados on/off

---

### **4. Tipografía (Typography Tokens)** ⭐

#### **4.1 font-family**
- **Noto Sans**: Fuente principal del sistema (`'Noto Sans', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'`)
- **Roboto Mono**: Fuente monoespaciada
- **font-awesome**: Fuente de iconos

**Organización en Storybook:**
- Muestra de cada familia de fuente
- Ejemplos de uso con texto
- Fallbacks del sistema

#### **4.2 font-size**
**Display:**
- `d1`: 48px
- `d2`: 40px
- `d3`: 32px
- `d4`: 28px

**Heading:**
- `h1`: 20px
- `h2`: 18px

**Body:**
- `md`: 16px
- `sm`: 13px
- `xs`: 11px

**Organización en Storybook:**
- Escala visual de tamaños (de más grande a más pequeño)
- Ejemplos de uso por categoría (Display, Heading, Body)
- Relación con line-height correspondiente

#### **4.3 font-weight**
- **regular**: 400
- **semibold**: 600
- **bold**: 700

**Organización en Storybook:**
- Muestra de cada peso con el mismo texto
- Ejemplos de uso

#### **4.4 line-height**
- **none**: 1
- **normal**: 1.5
- **extended**: 1.75

**Valores específicos por font-size:**
- `d1-line`: 57.6px (48 * 1.2)
- `d2-line`: 48px
- `d3-line`: 48px
- `d4-line`: 42px
- `h1-line`: 30px
- `h2-line`: 27px
- `body-lg-line`: 30px
- `body-md-line`: 24px
- `body-sm-line`: 19.5px
- `body-xs-line`: 16.5px

**Organización en Storybook:**
- Muestra de cada line-height
- Ejemplos de uso con diferentes font-sizes
- Visualización de la relación tamaño/line-height

#### **4.5 letter-spacing**
- Tokens de espaciado entre letras (si existen en Figma)

**Organización en Storybook:**
- Muestra de letter-spacing
- Ejemplos de uso

---

### **5. Spacing (Espaciado)** ⭐

#### **5.1 p-spacing (Spacing Primitivo)**
- Escala base de espaciado
- Mode 1

#### **5.2 s-spacing (Spacing Secundario)**
- Espaciado derivado de primitivos
- Mode 1

**Valores típicos:**
- `none`: 0
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 28px
- `4xl`: 32px
- `5xl`: 36px
- `6xl`: 40px
- Y valores numéricos: 7 (28px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px), 32 (128px), 40 (160px), 48 (192px), 64 (256px), 80 (320px), 96 (384px)

**Organización en Storybook:**
- Escala visual de espaciado
- Ejemplos de uso (padding, margin, gap)
- Comparación entre valores

---

### **6. Border Radius** ⭐

**Valores:**
- `none`: 0
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `full`: 1000px

**Organización en Storybook:**
- Muestra visual de cada border-radius
- Ejemplos de uso en componentes (botones, cards, inputs)
- Comparación visual

---

### **7. .modifiers (TODOS los colores con modificadores)** ⭐

**Esta categoría contiene TODOS los colores del sistema, pero organizados por modificador.**

Cada modificador (Normal, Inverted, Static, Static Inverted) contiene:
- Todos los colores de accent
- Todos los colores de foreground (fg)
- Todos los colores de background (bg)
- Todos los colores de border
- Todos los colores de feedback
- Todos los colores de chart
- Todos los colores de button
- Y cualquier otro color del sistema

#### **7.1 Normal** (~600 tokens)
**Estructura:**
```
.modifiers/
├── Normal/
│   ├── Light Mode/
│   │   ├── accent/ (todos los colores de acento en normal)
│   │   ├── fg/ (todos los foreground en normal)
│   │   ├── bg/ (todos los background en normal)
│   │   ├── border/ (todos los borders en normal)
│   │   ├── feedback/ (todos los feedback en normal)
│   │   ├── chart/ (todos los chart en normal)
│   │   └── button/ (todos los button en normal)
│   └── Dark Mode/ (misma estructura)
```

**Organización:**
- Por modo primero (Light/Dark)
- Dentro de cada modo, por tipo de color (accent, fg, bg, border, feedback, chart, button)
- Mostrar todos los colores del sistema en estado normal

#### **7.2 Inverted** (~600 tokens)
**Estructura:**
```
.modifiers/
├── Inverted/
│   ├── Light Mode/
│   │   ├── accent/ (todos los colores de acento invertidos)
│   │   ├── fg/ (todos los foreground invertidos)
│   │   ├── bg/ (todos los background invertidos)
│   │   ├── border/ (todos los borders invertidos)
│   │   ├── feedback/ (todos los feedback invertidos)
│   │   ├── chart/ (todos los chart invertidos)
│   │   └── button/ (todos los button invertidos)
│   └── Dark Mode/ (misma estructura)
```

**Organización:**
- Por modo primero (Light/Dark)
- Dentro de cada modo, por tipo de color
- Mostrar todos los colores del sistema en estado invertido
- Comparación con Normal para ver la diferencia

#### **7.3 Static** (~600 tokens)
**Estructura:**
```
.modifiers/
├── Static/
│   ├── Light Mode/
│   │   ├── accent/ (todos los colores de acento estáticos)
│   │   ├── fg/ (todos los foreground estáticos)
│   │   ├── bg/ (todos los background estáticos)
│   │   ├── border/ (todos los borders estáticos)
│   │   ├── feedback/ (todos los feedback estáticos)
│   │   ├── chart/ (todos los chart estáticos)
│   │   └── button/ (todos los button estáticos)
│   └── Dark Mode/ (misma estructura)
```

**Organización:**
- Por modo primero (Light/Dark)
- Dentro de cada modo, por tipo de color
- Mostrar todos los colores del sistema en estado estático
- Comparación con Normal para ver la diferencia

#### **7.4 Static Inverted** (~600 tokens)
**Estructura:**
```
.modifiers/
├── Static Inverted/
│   ├── Light Mode/
│   │   ├── accent/ (todos los colores de acento estáticos e invertidos)
│   │   ├── fg/ (todos los foreground estáticos e invertidos)
│   │   ├── bg/ (todos los background estáticos e invertidos)
│   │   ├── border/ (todos los borders estáticos e invertidos)
│   │   ├── feedback/ (todos los feedback estáticos e invertidos)
│   │   ├── chart/ (todos los chart estáticos e invertidos)
│   │   └── button/ (todos los button estáticos e invertidos)
│   └── Dark Mode/ (misma estructura)
```

**Organización:**
- Por modo primero (Light/Dark)
- Dentro de cada modo, por tipo de color
- Mostrar todos los colores del sistema en estado estático e invertido
- Comparación con Normal, Inverted y Static para ver todas las variantes

---

## 🎨 Diseño de Stories en Storybook

### **Estructura de Archivos**

```
packages/storybook/stories/tokens-figma/
├── TokensColorPrimitives.stories.ts
│   ├── AccentColors
│   ├── Foreground
│   ├── Background
│   └── Border
│
├── TokensColorSemantic.stories.ts
│   ├── Feedback
│   ├── Brand
│   └── Chart
│
├── TokensComponents.stories.ts
│   ├── ButtonTonesByTone (btn-tone)
│   │   ├── Brand (primary, secondary, tertiary)
│   │   ├── Success (primary, secondary, tertiary)
│   │   ├── Info (primary, secondary, tertiary)
│   │   ├── Error (primary, secondary, tertiary)
│   │   └── Warning (primary, secondary, tertiary)
│   ├── ButtonTonesByVariant (button-tone)
│   │   ├── Primary (brand, success, info, error, warning)
│   │   ├── Secondary (brand, success, info, error, warning)
│   │   └── Tertiary (brand, success, info, error, warning)
│   ├── ScrollBar
│   └── Toggle
│
└── TokensModifiers.stories.ts
    ├── Normal (Todos los colores en estado normal)
    │   ├── Light Mode (accent, fg, bg, border, feedback, chart, button)
    │   └── Dark Mode (accent, fg, bg, border, feedback, chart, button)
    ├── Inverted (Todos los colores invertidos)
    │   ├── Light Mode (accent, fg, bg, border, feedback, chart, button)
    │   └── Dark Mode (accent, fg, bg, border, feedback, chart, button)
    ├── Static (Todos los colores estáticos)
    │   ├── Light Mode (accent, fg, bg, border, feedback, chart, button)
    │   └── Dark Mode (accent, fg, bg, border, feedback, chart, button)
    └── StaticInverted (Todos los colores estáticos e invertidos)
        ├── Light Mode (accent, fg, bg, border, feedback, chart, button)
        └── Dark Mode (accent, fg, bg, border, feedback, chart, button)
```

### **Componente de Visualización**

Cada story mostrará:
1. **Grid de colores** con swatches
2. **Información del token:**
   - Nombre de variable CSS
   - Valor hexadecimal
   - Modo (light/dark)
   - Modificador (si aplica)
3. **Ejemplos de uso** (cuando sea relevante)
4. **Toggle light/dark mode**
5. **Búsqueda/filtrado** de tokens

---

## 📐 Organización Visual Propuesta

### **Layout Principal**

```
┌─────────────────────────────────────────────────┐
│  Tokens / Color Primitivos / Accent Colors     │
├─────────────────────────────────────────────────┤
│  [Toggle: Light/Dark]  [Filtro: Buscar...]    │
├─────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │Brand │  │Green │  │Purple│  │Yellow│      │
│  │#0c5b │  │#0508 │  │#0906 │  │#0907 │      │
│  │  ef  │  │  05  │  │  10  │  │  02  │      │
│  └──────┘  └──────┘  └──────┘  └──────┘      │
│  --color-  --color-  --color-  --color-       │
│  color-    color-    color-    color-         │
│  accent-   accent-   accent-   accent-        │
│  brand     green     purple    yellow         │
└─────────────────────────────────────────────────┘
```

### **Para Modificadores**

```
┌─────────────────────────────────────────────────┐
│  Tokens / Modificadores / Inverted / Light      │
├─────────────────────────────────────────────────┤
│  [Comparar con: Normal | Static | Static Inv]  │
├─────────────────────────────────────────────────┤
│  Accent Colors                                  │
│  ┌──────────────────────────────────────────┐  │
│  │ Base          │ Inverted    │ Diferencia │  │
│  ├──────────────────────────────────────────┤  │
│  │ #0c5bef       │ #b6b5fc     │ +contrast  │  │
│  │ (brand)       │ (inverted)  │            │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🔍 Funcionalidades Adicionales

### **1. Búsqueda y Filtrado**
- Buscar por nombre de token
- Filtrar por categoría
- Filtrar por modo (light/dark)
- Filtrar por modificador

### **2. Comparación**
- Comparar tokens base vs modificados
- Comparar light vs dark
- Comparar diferentes modificadores

### **3. Exportación**
- Copiar nombre de variable CSS
- Copiar valor hexadecimal
- Exportar grupo de tokens

### **4. Documentación**
- Descripción de cada categoría
- Ejemplos de uso
- Guía de cuándo usar cada modificador

---

## 📊 Estadísticas por Categoría

### **p-colors (Primitivos Base): ~440 tokens** ⭐
- pec: 40 colores
- gray: 40 colores
- indigo: 40 colores
- lime: 40 colores
- pink: 40 colores
- rose: 40 colores
- teal: 40 colores
- purple: 40 colores
- yellow: 40 colores
- green: 40 colores
- blue: 40 colores
- **Total: ~440 colores primitivos (BASE DE TODO)**

### **s-colors (Secundarios): ~33 tokens** (en CSS generado)
- Accent: 11 (derivados de p-colors)
- Foreground: 2 (derivados de p-colors)
- Background: 7 (derivados de p-colors)
- Border: 13 (derivados de p-colors)
- **Nota:** Estos son solo los tokens USADOS, no todos los posibles

### **Color Semánticos: 364 tokens**
- Feedback: 8
- Brand: 124
- Chart: 232

### **Componentes: 450 tokens**
- btn-tone: ~200 tokens (organizados por TONE primero)
  - Estructura: TONE → Variante (primary/secondary/tertiary) → Propiedad (bg/fg)
  - Tones: Brand, Success, Info, Error, Warning
- button-tone: ~200 tokens (organizados por VARIANTE primero)
  - Estructura: Variante (primary/secondary/tertiary) → TONE → Propiedad (bg/fg)
  - Variantes: primary, secondary, tertiary
  - **Nota:** btn-tone y button-tone contienen los mismos tokens, solo organizados diferente
- Scroll Bar: 27
- Toggle: 9

### **Tipografía: ~20 tokens**
- font-family: 3 (Noto Sans, Roboto Mono, font-awesome)
- font-size: 9 (d1, d2, d3, d4, h1, h2, md, sm, xs)
- font-weight: 3 (regular, semibold, bold)
- line-height: 3 (none, normal, extended)
- letter-spacing: (si existe)

### **Spacing: ~30 tokens**
- p-spacing: Escala primitiva de espaciado
- s-spacing: Escala secundaria de espaciado
- Valores: none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### **Border Radius: 7 tokens**
- none, xs, sm, md, lg, xl, full

### **.modifiers: ~2100 tokens** (TODOS los colores con modificadores)
- Normal: ~600 (Todos los colores en estado normal, por modo Light/Dark)
- Inverted: ~600 (Todos los colores invertidos, por modo Light/Dark)
- Static: ~600 (Todos los colores estáticos, por modo Light/Dark)
- Static Inverted: ~600 (Todos los colores estáticos e invertidos, por modo Light/Dark)

**Cada modificador contiene TODOS los colores del sistema:**
- accent (todos)
- fg (todos)
- bg (todos)
- border (todos)
- feedback (todos)
- chart (todos)
- button (todos)

---

## ✅ Próximos Pasos

1. **Crear estructura de archivos** en Storybook
2. **Implementar componente de visualización** de tokens
3. **Crear stories para cada categoría**
4. **Implementar búsqueda y filtrado**
5. **Agregar ejemplos de uso**
6. **Documentar cada categoría**

---

## 🎯 Criterios de Organización

### **Principios:**
1. **Jerárquico**: Respeta la estructura de Figma
2. **Semántico**: Agrupa por significado, no por nombre
3. **Navegable**: Fácil de encontrar tokens específicos
4. **Visual**: Muestra colores, no solo nombres
5. **Comparativo**: Permite comparar variantes
6. **Documentado**: Incluye descripciones y ejemplos

### **Orden de Prioridad:**
1. **p-colors (Primitivos)** → ⭐ BASE DE TODO - Escalas completas de colores
2. **s-colors (Secundarios)** → Derivados de primitivos, organizados por modo
3. **Semánticos** → Uso común (Feedback, Brand, Chart)
4. **Componentes** → Específicos (Button, Scroll Bar, Toggle)
5. **Tipografía** → Font-family, font-size, font-weight, line-height, letter-spacing
6. **Spacing** → p-spacing, s-spacing (valores de espaciado)
7. **Border Radius** → Valores de border-radius
8. **.modifiers** → TODOS los colores del sistema con modificadores (Normal, Inverted, Static, Static Inverted)

### **Jerarquía de Derivación:**
```
p-colors (Primitivos Base)
    ↓
s-colors (Secundarios - Light/Dark)
    ↓
Semánticos + Componentes
    ↓
.modifiers (TODOS los colores con modificadores)
    ├── Normal (todos los colores en estado normal)
    ├── Inverted (todos los colores invertidos)
    ├── Static (todos los colores estáticos)
    └── Static Inverted (todos los colores estáticos e invertidos)
```

**Nota importante:** `.modifiers` contiene TODOS los colores del sistema (accent, fg, bg, border, feedback, chart, button, etc.) pero organizados por modificador. Es como una vista completa de todos los colores con sus variantes de modificadores aplicadas.

---

**¿Te parece bien esta estructura? ¿Quieres que ajuste algo antes de empezar a construir?**

