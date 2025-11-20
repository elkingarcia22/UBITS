# 📊 Análisis Profundo: Estructura de Tokens Figma vs UBITS Actual

## 🎯 Resumen Ejecutivo

Este documento analiza la estructura de tokens de diseño en **Tokens Studio for Figma** y la compara con la estructura actual del proyecto UBITS, identificando diferencias, oportunidades de mejora y un plan de migración.

---

## 📐 Estructura de Tokens en Figma

### 1. **Jerarquía de Categorías Principales**

En Figma, los tokens están organizados en una jerarquía clara:

```
Tokens Studio for Figma
├── Color
│   ├── color
│   │   ├── light
│   │   │   ├── accent (10 colores)
│   │   │   ├── fg
│   │   │   │   ├── 1
│   │   │   │   └── 2
│   │   │   ├── blue
│   │   │   │   └── subtle
│   │   │   ├── gray
│   │   │   │   └── subtle
│   │   │   ├── yellow
│   │   │   │   ├── subtle
│   │   │   │   └── bold
│   │   │   └── green
│   │   │       └── subtle
│   │   └── dark (similar estructura)
│   ├── btn-tone
│   │   ├── sec (secondary)
│   │   │   ├── bg
│   │   │   └── fg
│   │   ├── primary
│   │   │   └── bg
│   │   └── ter (tertiary)
│   │       └── bg
│   └── button
│       └── tone
│           ├── brand
│           │   └── primary
│           │       └── color
│           │           └── bg
│           ├── secondary
│           │   └── color
│           │       ├── bg
│           │       └── fg
│           ├── tertiary
│           │   └── color
│           │       └── bg
│           └── success
│               └── primary
│                   └── color
│                       └── bg
├── Sizing
├── Spacing
│   └── space (valores: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96)
│   ├── gap (none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
│   ├── padding (none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
│   └── size (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)
├── Border Radius
│   └── border-radius (none, xs, sm, md, lg, xl, full)
├── Border Width
├── Border
├── Opacity
├── Box Shadow
└── Typography
    ├── Font Family
    │   ├── Noto Sans
    │   ├── Roboto Mono
    │   └── font-awesome
    ├── Font Weight
    │   ├── regular
    │   ├── semibold
    │   └── bold
    ├── Line Height
    │   ├── none
    │   ├── normal
    │   └── extended
    ├── Font Size
    │   └── (md, sm, xs, d1, d2, d3, d4, h1, h2)
    └── Letter Spacing
```

### 2. **Sistema de Modos y Modificadores**

Figma utiliza un sistema de **Sets** y **Modos** para variaciones:

#### Sets de Tokens:
- `p-colors` (primary colors) → `Mode 1`
- `s-colors` (secondary colors) → `Light Mode`, `Dark Mode`
- `btn-tone` → `Brand`, `Success`, `Info`, `Error`, `Warning`
- `button-tone` → `Mode 1`
- `.modifiers` → `Normal`, `Inverted`, `Static`, `Static inverted`

#### Modificadores Visuales:
- **Normal**: Círculo blanco/negro
- **Inverted**: Círculo negro/blanco
- **Static**: Dos círculos blancos
- **Static invert**: Dos círculos negros

### 3. **Estructura de Tokens de Color**

#### Colores de Acento (`accent`):
- 10 colores distintos: lila, verde, azul claro, gris, dorado, turquesa, rosa, morado, azul, azul oscuro

#### Foreground (`fg`):
- `fg > 1`: Dos tonos (blanco, gris claro)
- `fg > 2`: Cuatro tonos (blanco, gris claro, gris medio, gris oscuro)

#### Colores Semánticos:
- `blue > subtle`: Dos tonos azules
- `gray > subtle`: Dos tonos grises
- `yellow > subtle`: Dos tonos amarillos
- `yellow > bold`: Dos tonos amarillos oscuros
- `green > subtle`: Dos tonos verdes

#### Tokens de Botones (`btn-tone`):
- `sec > bg`: Tres tonos + uno claro
- `sec > fg`: Dos tonos
- `primary > bg`: Tres tonos + blanco
- `ter > bg`: Tres tonos + blanco

---

## 🔍 Estructura Actual de Tokens en UBITS

### 1. **Organización Actual**

La estructura actual en `packages/tokens/tokens.json` es **plana** y organizada por categorías temáticas:

```json
{
  "light": {
    "brand": { ... },
    "foreground": { ... },
    "background": { ... },
    "borders": { ... },
    "feedback": { ... },
    "sidebar": { ... },
    "chart": { ... },
    "button": { ... },
    "blueForeground": { ... },
    "grayForeground": { ... },
    "yellowForeground": { ... },
    "greenForeground": { ... },
    "tealForeground": { ... },
    "purpleForeground": { ... },
    "pinkForeground": { ... },
    "roseForeground": { ... },
    "bordersMain": { ... },
    "bordersColored": { ... },
    "bordersInverted": { ... },
    "bordersStatic": { ... },
    "bordersStaticInverted": { ... },
    "feedbackSuccess": { ... },
    "feedbackInfo": { ... },
    "feedbackWarning": { ... },
    "feedbackError": { ... },
    "feedbackBorders": { ... },
    "feedbackAliases": { ... },
    "spacing": { ... },
    "borderRadius": { ... }
  },
  "dark": { ... }
}
```

### 2. **Nomenclatura Actual**

Los tokens actuales usan nombres **planos** con prefijos:
- `--ubits-accent-brand`
- `--ubits-fg-1-high`
- `--ubits-bg-1`
- `--ubits-button-primary-bg-default`
- `--ubits-fg-blue-subtle`
- `--ubits-spacing-xs`
- `--ubits-border-radius-md`

### 3. **Sistema de Modos Actual**

- Solo dos modos: `light` y `dark`
- Los modificadores se manejan con sufijos: `-inverted`, `-static`, `-static-inverted`
- No hay sistema de Sets como en Figma

---

## 🔄 Comparación Detallada

### ✅ **Fortalezas de la Estructura Actual**

1. **Nombres descriptivos**: Los tokens tienen nombres claros y autodescriptivos
2. **Compatibilidad**: Funciona bien con CSS variables
3. **Organización temática**: Agrupación lógica por propósito (button, sidebar, chart)
4. **Cobertura completa**: Incluye todos los tokens necesarios

### ❌ **Debilidades Identificadas**

1. **Falta de jerarquía semántica**: No refleja la estructura visual de Figma
2. **Nombres inconsistentes**: Mezcla de convenciones (camelCase, kebab-case)
3. **Sin sistema de Sets**: No hay agrupación por variantes (Brand, Success, Info, etc.)
4. **Modificadores como sufijos**: En lugar de estructura jerárquica
5. **Falta de tokens de tipografía estructurados**: No hay jerarquía clara para font-family, font-size, etc.

### 🎯 **Diferencias Clave con Figma**

| Aspecto | Figma | UBITS Actual |
|---------|-------|--------------|
| **Estructura** | Jerárquica (`Color > color > light > accent`) | Plana (`brand`, `foreground`, `background`) |
| **Modos** | Sets con múltiples modos (`p-colors`, `s-colors`) | Solo `light` y `dark` |
| **Modificadores** | Estructura (`Normal`, `Inverted`, `Static`) | Sufijos (`-inverted`, `-static`) |
| **Botones** | `btn-tone > sec/primary/ter > bg/fg` | `button > primary/secondary/tertiary` |
| **Colores** | `color > light > blue > subtle` | `blueForeground > fg-blue-subtle` |
| **Tipografía** | `Typography > Font Family > Font Size` | Clases CSS planas |
| **Espaciado** | `Spacing > space/gap/padding/size` | `spacing > spacing-xs/spacing-sm` |

---

## 📋 Plan de Migración Propuesto

### Fase 1: Reestructuración de Tokens JSON

#### 1.1 Nueva Estructura Jerárquica

```json
{
  "Color": {
    "color": {
      "light": {
        "accent": {
          "accent-1": "#...",
          "accent-2": "#...",
          // ... 10 colores
        },
        "fg": {
          "1": {
            "high": "#...",
            "medium": "#...",
            "low": "#..."
          },
          "2": {
            "high": "#...",
            "medium": "#..."
          }
        },
        "blue": {
          "subtle": {
            "default": "#...",
            "inverted": "#...",
            "static": "#...",
            "static-inverted": "#..."
          }
        },
        "gray": { ... },
        "yellow": {
          "subtle": { ... },
          "bold": { ... }
        },
        "green": { ... }
      },
      "dark": { /* estructura similar */ }
    },
    "btn-tone": {
      "brand": {
        "primary": {
          "bg": {
            "default": "#...",
            "hover": "#...",
            "pressed": "#..."
          },
          "fg": {
            "default": "#..."
          }
        },
        "secondary": { ... },
        "tertiary": { ... }
      },
      "success": { ... },
      "info": { ... },
      "error": { ... },
      "warning": { ... }
    }
  },
  "Spacing": {
    "space": {
      "0": "0px",
      "1": "1px",
      // ... hasta 96
    },
    "gap": {
      "none": "0",
      "xs": "4px",
      "sm": "8px",
      // ...
    },
    "padding": { ... },
    "size": { ... }
  },
  "Typography": {
    "fontFamily": {
      "noto-sans": "Noto Sans, sans-serif",
      "roboto-mono": "Roboto Mono, monospace",
      "font-awesome": "Font Awesome 6 Pro"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "md": "16px",
      "d1": "72px",
      "d2": "64px",
      "d3": "56px",
      "d4": "48px",
      "h1": "32px",
      "h2": "24px"
    },
    "fontWeight": {
      "regular": "400",
      "semibold": "600",
      "bold": "700"
    },
    "lineHeight": {
      "none": "1",
      "normal": "1.5",
      "extended": "1.75"
    }
  },
  "BorderRadius": {
    "none": "0",
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "20px",
    "full": "1000px"
  }
}
```

#### 1.2 Sistema de Sets y Modos

```json
{
  "sets": {
    "p-colors": {
      "modes": {
        "Mode 1": {
          // tokens primarios
        }
      }
    },
    "s-colors": {
      "modes": {
        "Light Mode": {
          // tokens secundarios light
        },
        "Dark Mode": {
          // tokens secundarios dark
        }
      }
    },
    "btn-tone": {
      "modes": {
        "Brand": { ... },
        "Success": { ... },
        "Info": { ... },
        "Error": { ... },
        "Warning": { ... }
      }
    }
  },
  "modifiers": {
    "Normal": { ... },
    "Inverted": { ... },
    "Static": { ... },
    "Static inverted": { ... }
  }
}
```

### Fase 2: Generación de CSS Variables

#### 2.1 Transformación de Estructura Jerárquica a CSS

Necesitamos actualizar `style-dictionary.config.json` para generar variables CSS que mantengan la jerarquía:

```css
/* Estructura jerárquica plana para CSS */
--ubits-color-light-accent-1: #...;
--ubits-color-light-accent-2: #...;
--ubits-color-light-fg-1-high: #...;
--ubits-color-light-fg-1-medium: #...;
--ubits-color-light-blue-subtle-default: #...;
--ubits-color-light-blue-subtle-inverted: #...;
--ubits-color-light-blue-subtle-static: #...;
--ubits-color-light-blue-subtle-static-inverted: #...;

/* Botones con tonos */
--ubits-btn-tone-brand-primary-bg-default: #...;
--ubits-btn-tone-brand-primary-bg-hover: #...;
--ubits-btn-tone-brand-primary-fg-default: #...;

/* Espaciado */
--ubits-spacing-space-0: 0px;
--ubits-spacing-space-1: 1px;
--ubits-spacing-gap-none: 0;
--ubits-spacing-gap-xs: 4px;

/* Tipografía */
--ubits-typography-font-family-noto-sans: "Noto Sans, sans-serif";
--ubits-typography-font-size-xs: 12px;
--ubits-typography-font-weight-regular: 400;
```

#### 2.2 Aliases para Compatibilidad

Mantener aliases para compatibilidad con código existente:

```css
/* Aliases para compatibilidad */
--ubits-accent-brand: var(--ubits-color-light-accent-1);
--ubits-fg-1-high: var(--ubits-color-light-fg-1-high);
--ubits-bg-1: var(--ubits-color-light-bg-1);
--ubits-button-primary-bg-default: var(--ubits-btn-tone-brand-primary-bg-default);
```

### Fase 3: Actualización de Storybook

#### 3.1 Nueva Organización de Stories

```
stories/
├── Tokens/
│   ├── Color/
│   │   ├── Accent.stories.ts
│   │   ├── Foreground.stories.ts
│   │   ├── Blue.stories.ts
│   │   ├── Gray.stories.ts
│   │   ├── Yellow.stories.ts
│   │   ├── Green.stories.ts
│   │   └── ButtonTone/
│   │       ├── Brand.stories.ts
│   │       ├── Success.stories.ts
│   │       ├── Info.stories.ts
│   │       ├── Error.stories.ts
│   │       └── Warning.stories.ts
│   ├── Spacing/
│   │   ├── Space.stories.ts
│   │   ├── Gap.stories.ts
│   │   ├── Padding.stories.ts
│   │   └── Size.stories.ts
│   ├── Typography/
│   │   ├── FontFamily.stories.ts
│   │   ├── FontSize.stories.ts
│   │   ├── FontWeight.stories.ts
│   │   └── LineHeight.stories.ts
│   └── BorderRadius/
│       └── BorderRadius.stories.ts
```

#### 3.2 Componentes de Visualización

Crear componentes helper para mostrar tokens jerárquicos:

```typescript
// stories/utils/TokenGroup.ts
export function TokenGroup({ 
  title, 
  tokens, 
  category 
}: { 
  title: string; 
  tokens: string[]; 
  category: 'color' | 'spacing' | 'typography' 
}) {
  // Renderiza grupo de tokens con jerarquía visual
}
```

### Fase 4: Migración de Componentes

#### 4.1 Mapeo de Tokens Antiguos a Nuevos

Crear un archivo de mapeo:

```typescript
// packages/tokens/token-mapping.ts
export const TOKEN_MAPPING = {
  // Colores
  '--ubits-accent-brand': '--ubits-color-light-accent-1',
  '--ubits-fg-1-high': '--ubits-color-light-fg-1-high',
  '--ubits-bg-1': '--ubits-color-light-bg-1',
  
  // Botones
  '--ubits-button-primary-bg-default': '--ubits-btn-tone-brand-primary-bg-default',
  '--ubits-btn-primary-fg': '--ubits-btn-tone-brand-primary-fg-default',
  
  // Espaciado
  '--ubits-spacing-xs': '--ubits-spacing-gap-xs',
  '--ubits-spacing-sm': '--ubits-spacing-gap-sm',
  
  // Tipografía
  // ... (se manejará con clases CSS)
} as const;
```

#### 4.2 Script de Migración Automática

```typescript
// scripts/migrate-tokens.cjs
// Busca y reemplaza tokens antiguos por nuevos en todos los archivos
```

---

## 🎨 Beneficios de la Nueva Estructura

### 1. **Alineación con Figma**
- Estructura idéntica facilita sincronización
- Nombres consistentes entre diseño y código
- Fácil identificación de tokens en ambos sistemas

### 2. **Mejor Organización**
- Jerarquía clara y semántica
- Fácil navegación en Storybook
- Mejor descubribilidad de tokens

### 3. **Escalabilidad**
- Fácil agregar nuevos modos (ej: `High Contrast`)
- Fácil agregar nuevos sets (ej: `btn-tone > Danger`)
- Estructura extensible sin romper existente

### 4. **Mantenibilidad**
- Cambios en Figma se reflejan directamente
- Menos duplicación de tokens
- Mejor gestión de variantes

---

## ⚠️ Consideraciones y Riesgos

### 1. **Compatibilidad hacia atrás**
- **Riesgo**: Romper componentes existentes
- **Mitigación**: Mantener aliases durante período de transición

### 2. **Tamaño del archivo CSS**
- **Riesgo**: Más variables CSS = archivo más grande
- **Mitigación**: Usar tree-shaking y generar solo tokens usados

### 3. **Curva de aprendizaje**
- **Riesgo**: Desarrolladores necesitan aprender nueva estructura
- **Mitigación**: Documentación clara y ejemplos

### 4. **Tiempo de migración**
- **Riesgo**: Migración puede tomar tiempo
- **Mitigación**: Migración incremental por componentes

---

## 📅 Cronograma Sugerido

### Semana 1-2: Preparación
- [ ] Crear nueva estructura JSON en Figma
- [ ] Exportar tokens desde Figma
- [ ] Validar estructura con equipo de diseño

### Semana 3-4: Implementación Base
- [ ] Actualizar `tokens.json` con nueva estructura
- [ ] Actualizar `style-dictionary.config.json`
- [ ] Generar CSS con aliases de compatibilidad
- [ ] Validar generación de tokens

### Semana 5-6: Storybook
- [ ] Reorganizar stories según nueva estructura
- [ ] Crear componentes de visualización
- [ ] Documentar nueva estructura

### Semana 7-8: Migración de Componentes
- [ ] Crear script de migración
- [ ] Migrar componentes críticos (Button, Input)
- [ ] Validar funcionamiento

### Semana 9-10: Migración Completa
- [ ] Migrar todos los componentes
- [ ] Eliminar aliases obsoletos
- [ ] Actualizar documentación

---

## 🔧 Herramientas Necesarias

1. **Style Dictionary**: Ya está configurado, necesita actualización
2. **Script de migración**: Nuevo, para reemplazar tokens en componentes
3. **Validador de tokens**: Actualizar para validar nueva estructura
4. **Documentación**: Actualizar guías y ejemplos

---

## 📝 Próximos Pasos

1. **Revisar este análisis** con el equipo
2. **Validar estructura propuesta** con diseño
3. **Crear POC** (Proof of Concept) con un componente
4. **Aprobar plan de migración**
5. **Iniciar implementación**

---

## 📚 Referencias

- [Tokens Studio for Figma Documentation](https://docs.tokens.studio/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- Estructura actual: `packages/tokens/tokens.json`
- Storybook actual: `packages/storybook/stories/`

---

**Última actualización**: 2024-12-19
**Autor**: Análisis basado en imágenes de Tokens Studio for Figma

