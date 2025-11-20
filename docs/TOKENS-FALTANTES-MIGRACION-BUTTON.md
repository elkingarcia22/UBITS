# Tokens Faltantes en la Migración del Button

## 📊 Resumen Ejecutivo

**Estado**: Solo se migraron tokens de **COLOR** (48 tokens).  
**Faltan**: Typography, Spacing, Border-radius, Effects (parcialmente).

---

## 🔍 Análisis Detallado

### 1. Typography Tokens

#### Tokens Usados en Button (NO migrados)
```css
/* En button.css */
font-family: var(--font-sans);
font-size: var(--font-body-md-size);
font-weight: var(--weight-semibold);
line-height: var(--font-body-md-line);
```

#### Tokens Disponibles en Sistema Antiguo
```css
/* En tokens-typography.css */
--font-sans: 'Noto Sans', system-ui, ...;
--font-body-md-size: 16px;
--font-body-md-line: 24px;
--weight-semibold: 600;
```

#### Tokens Disponibles en Figma (Estructura Diferente)
```json
// En figma-tokens.json
{
  ".modifiers/Normal": {
    "fontSize": {
      "2": { "$value": 16, "$type": "dimension" },
      "3": { "$value": 20, "$type": "dimension" }
    },
    "fontWeights": {
      "noto-sans-1": { "$value": "SemiBold", "$type": "string" }
    },
    "display": {
      "d1": {
        "regular": {
          "fontFamily": { "$value": "Font Awesome 6 pro" },
          "fontSize": { "$value": 40 },
          "fontWeight": { "$value": "Regular" }
        }
      }
    }
  }
}
```

#### Problema
- **Figma**: Valores numéricos sin unidad (`16` en lugar de `16px`)
- **Figma**: Font-weight como string (`"SemiBold"` en lugar de `600`)
- **Figma**: Estructura jerárquica diferente (no hay `--font-body-md-size` directo)

#### Solución Propuesta
1. **Opción A**: Mantener sistema antiguo de typography (recomendado)
   - Los tokens de typography funcionan bien
   - No hay necesidad urgente de migrarlos
   - Evita problemas de compatibilidad

2. **Opción B**: Crear función helper para convertir tokens de Figma
   ```javascript
   // Helper para convertir fontSize de Figma a CSS
   function getFontSize(figmaToken) {
     return `${figmaToken}px`;
   }
   ```

3. **Opción C**: Crear mapeo de typography tokens
   ```typescript
   {
     old: '--font-body-md-size',
     new: '--modifiers-normal-font-size-2', // Con conversión a px
     category: 'typography'
   }
   ```

---

### 2. Spacing Tokens

#### Valores Hardcodeados en Button (NO migrados)
```css
/* En button.css */
gap: 8px;                    /* Debería ser: var(--ubits-spacing-sm) */
padding: 12px 16px;          /* Debería ser: var(--ubits-spacing-md) var(--ubits-spacing-lg) */
padding: 0;                  /* Debería ser: var(--ubits-spacing-none) */
```

#### Tokens Disponibles en Sistema Antiguo
```json
// En tokens.json
{
  "spacing": {
    "ubits-spacing-none": "0",
    "ubits-spacing-xs": "4px",
    "ubits-spacing-sm": "8px",
    "ubits-spacing-md": "12px",
    "ubits-spacing-lg": "16px",
    "ubits-spacing-xl": "20px"
  }
}
```

#### Tokens en Figma
**❌ NO EXISTEN** - No se encontraron tokens de spacing en `figma-tokens.json` o `figma-tokens.css`.

#### Solución Propuesta
1. **Opción A**: Mantener sistema antiguo de spacing (recomendado)
   - Los tokens funcionan bien
   - No hay equivalente en Figma
   - Migrar valores hardcodeados a tokens antiguos

2. **Opción B**: Crear tokens nuevos en Figma
   - Agregar tokens de spacing al sistema de Figma
   - Luego migrar componentes

3. **Opción C**: Migrar valores hardcodeados a tokens antiguos
   ```css
   /* Antes */
   gap: 8px;
   
   /* Después */
   gap: var(--ubits-spacing-sm, 8px);
   ```

---

### 3. Border-radius Tokens

#### Valores Hardcodeados en Button (NO migrados)
```css
/* En button.css */
border-radius: 8px;          /* Debería ser: var(--ubits-border-radius-sm) */
border-radius: inherit;       /* OK - no necesita token */
border-radius: 50%;           /* OK - valor específico para círculos */
```

#### Tokens Disponibles en Sistema Antiguo
```json
// En tokens.json
{
  "borderRadius": {
    "ubits-border-radius-none": "0",
    "ubits-border-radius-xs": "4px",
    "ubits-border-radius-sm": "8px",
    "ubits-border-radius-md": "12px",
    "ubits-border-radius-lg": "16px"
  }
}
```

#### Tokens en Figma
**❌ NO EXISTEN** - No se encontraron tokens de border-radius en `figma-tokens.json` o `figma-tokens.css`.

#### Solución Propuesta
1. **Opción A**: Mantener sistema antiguo de border-radius (recomendado)
   - Los tokens funcionan bien
   - No hay equivalente en Figma
   - Migrar valores hardcodeados a tokens antiguos

2. **Opción B**: Crear tokens nuevos en Figma
   - Agregar tokens de border-radius al sistema de Figma
   - Luego migrar componentes

3. **Opción C**: Migrar valores hardcodeados a tokens antiguos
   ```css
   /* Antes */
   border-radius: 8px;
   
   /* Después */
   border-radius: var(--ubits-border-radius-sm, 8px);
   ```

---

### 4. Effects Tokens

#### Tokens Usados en Button (NO migrados)
```css
/* En button.css */
box-shadow: var(--ubits-elevation-floating);
box-shadow: var(--ubits-elevation-floating-hover);
box-shadow: var(--ubits-elevation-floating-active);
box-shadow: 0px 0px 0px 4px var(--ubits-button-focus-ring);
```

#### Tokens Disponibles en Sistema Antiguo
```css
/* En tokens.css */
--ubits-elevation-floating: 0 14px 28.8px 0 rgba(0, 0, 0, 0.24);
--ubits-elevation-floating-hover: 0 16px 32px 0 rgba(0, 0, 0, 0.28);
--ubits-elevation-floating-active: 0 8px 16px 0 rgba(0, 0, 0, 0.20);
--ubits-button-focus-ring: rgba(12, 91, 239, 0.5);
```

#### Tokens en Figma
**⚠️ ESTRUCTURA DIFERENTE** - Figma tiene tokens de elevation separados:
```json
// En figma-tokens.json (estructura aproximada)
{
  ".modifiers/Normal": {
    "elevation": {
      "floating": {
        "position": { "$value": "0 14px", "$type": "shadow" },
        "blur": { "$value": "28.8px", "$type": "shadow" },
        "spread": { "$value": "0", "$type": "shadow" },
        "color": { "$value": "{pec.gray.100}", "$type": "color" }
      }
    }
  }
}
```

#### Problema
- **Figma**: Tokens separados para cada propiedad de la sombra
- **UBITS**: Token único con toda la sombra en formato CSS
- **Figma**: No hay token directo equivalente a `--ubits-elevation-floating`

#### Solución Propuesta
1. **Opción A**: Mantener tokens antiguos para efectos (recomendado)
   - Los efectos complejos funcionan bien con tokens únicos
   - Evita construir sombras desde múltiples tokens

2. **Opción B**: Crear función helper para construir sombras
   ```javascript
   // Helper para construir box-shadow desde tokens de Figma
   function buildShadow(position, blur, spread, color) {
     return `${position} ${blur} ${spread} ${color}`;
   }
   ```

3. **Opción C**: Crear tokens compuestos en CSS
   ```css
   /* Construir sombra desde tokens de Figma */
   --elevation-floating: var(--modifiers-normal-elevation-floating-position) 
                         var(--modifiers-normal-elevation-floating-blur) 
                         var(--modifiers-normal-elevation-floating-spread) 
                         var(--modifiers-normal-elevation-floating-color);
   ```

---

## 📋 Plan de Acción Recomendado

### Fase 1: Migrar Valores Hardcodeados a Tokens Antiguos (Inmediato)
1. ✅ Migrar `gap: 8px` → `gap: var(--ubits-spacing-sm, 8px)`
2. ✅ Migrar `padding: 12px 16px` → `padding: var(--ubits-spacing-md, 12px) var(--ubits-spacing-lg, 16px)`
3. ✅ Migrar `border-radius: 8px` → `border-radius: var(--ubits-border-radius-sm, 8px)`

### Fase 2: Evaluar Typography (Futuro)
1. Decidir si mantener sistema antiguo o migrar
2. Si migrar, crear función helper para conversión
3. Actualizar token-mapping.ts con typography tokens

### Fase 3: Evaluar Spacing y Border-radius (Futuro)
1. Verificar si se crearán tokens en Figma
2. Si no, mantener sistema antiguo
3. Documentar decisión

### Fase 4: Evaluar Effects (Futuro)
1. Decidir si mantener tokens antiguos o construir desde Figma
2. Si construir, crear función helper
3. Documentar decisión

---

## 🎯 Conclusión

**Estado actual**: La migración del Button está **parcialmente completa**:
- ✅ **Colores**: 100% migrados (48 tokens)
- ❌ **Typography**: 0% migrados (mantener sistema antiguo por ahora)
- ❌ **Spacing**: 0% migrados (migrar valores hardcodeados a tokens antiguos)
- ❌ **Border-radius**: 0% migrados (migrar valores hardcodeados a tokens antiguos)
- ⚠️ **Effects**: 0% migrados (mantener sistema antiguo por ahora)

**Recomendación**: 
1. **Inmediato**: Migrar valores hardcodeados de spacing y border-radius a tokens antiguos
2. **Futuro**: Evaluar si vale la pena migrar typography y effects, o mantener sistema antiguo

