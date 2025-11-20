# 📦 Plan de Migración: UBITS a Repositorio Separado

## 🎯 Objetivo

Migrar **TODO** lo relacionado con UBITS al repositorio separado: https://github.com/elkingarcia22/UBITS

**IMPORTANTE**: No debe quedar ninguna relación entre Autoframe y UBITS después de la migración.

---

## 📋 Elementos a Migrar

### 1. Componentes UBITS
**Ubicación actual**: `packages/components/`

**Componentes a migrar** (todos excepto `design/` y `functional/github/`):
- `accordion/`
- `alert/`
- `avatar/`
- `badge/`
- `bar-metric-card/`
- `breadcrumb/`
- `button/`
- `calendar/`
- `card/`
- `carousel/`
- `checkbox/`
- `chip/`
- `csat-metric-card/`
- `data-table/`
- `data-view/`
- `drawer/`
- `empty-state/`
- `file-upload/`
- `gallery/`
- `input/`
- `list/`
- `menu/`
- `menubar/`
- `metric-card/`
- `modal/`
- `nps-card/`
- `pagination/`
- `participants-menu/`
- `popover/`
- `progress/`
- `progress-general-card/`
- `radio-button/`
- `score-card-metrics/`
- `scroll/`
- `search-button/`
- `segment-control/`
- `selection-card/`
- `sidebar/`
- `skeleton/`
- `slider/`
- `spinner/`
- `stats-card/`
- `status-tag/`
- `stepper/`
- `subnav/`
- `tabbar/`
- `tabs/`
- `toast/`
- `toggle/`
- `tokens-ubits/`
- `tooltip/`

**NO migrar** (son genéricos de Autoframe):
- `design/` (templates, tokens, typography genéricos)
- `functional/github/`

### 2. Tokens UBITS
**Ubicación actual**: 
- `packages/tokens/` (tokens base UBITS)
- `packages/components/tokens-ubits/` (integración de tokens)

**Migrar ambos directorios completos**

### 3. Tipografía UBITS
**Ubicación actual**: `packages/typography/`

**Migrar directorio completo**

### 4. Templates UBITS
**Ubicación actual**: `packages/templates/`

**Migrar todo el directorio**:
- `template-admin.html`
- `template-colaborador.html`
- `components-loader.js`
- `config/` (products.js, responsive-manager.js, theme-manager.js)
- `engine/` (content-manager.js, template-loader.js)
- `utils/` (si contiene código UBITS)
- `assets/` (imágenes, logos UBITS)
- `tokens/` (playground de tokens)

### 5. Storybook UBITS
**Ubicación actual**: `packages/storybook/`

**Migrar directorio completo**:
- `stories/` (todas las stories de componentes UBITS)
- `storybook-static/` (build estático)
- `package.json`
- `scripts/`
- Configuración de Storybook

### 6. Sistema de Validación UBITS
**Ubicación actual**:
- `.ubits/` (directorio completo)
- `scripts/validate-ubits.cjs`
- `scripts/validate-ubits.js` (si existe)

**Migrar todos los archivos**

### 7. Scripts UBITS
**Ubicación actual**: `scripts/`

**Scripts a migrar** (si son específicos de UBITS):
- `init-project.cjs` (si inicializa proyectos UBITS)
- `integrate-addons.cjs` (si integra add-ons UBITS)
- `deploy.cjs` (si despliega proyectos UBITS)

**Verificar si son genéricos o específicos de UBITS**

### 8. Documentación UBITS
**Archivos a migrar**:
- `GUIA-COMPLETA.md`
- `README.md` (si contiene información UBITS)
- `PROMPT-INICIAL.md`
- `INSTRUCCIONES.md`
- `.cursorrules` (reglas específicas de UBITS)
- `docs/` (documentación relacionada con UBITS):
  - `ANALISIS-*-COMPLETO.md` (análisis de componentes UBITS)
  - `ARQUITECTURA-*.md` (arquitectura UBITS)
  - `GUIA-*.md` (guías UBITS)
  - `PLAN-*.md` (planes relacionados con UBITS)
  - `VERIFICACION-*.md` (verificaciones UBITS)

### 9. Configuración UBITS
**Archivos a migrar**:
- `package.json` (crear uno nuevo para UBITS)
- `tsconfig.json` (si es específico de UBITS)
- `biome.json` (si tiene reglas UBITS)
- `.husky/` (hooks de validación UBITS)
- `vercel.json` (si despliega UBITS)

### 10. Assets UBITS
**Ubicación actual**: 
- `packages/templates/assets/images/` (logos, favicons UBITS)
- `packages/storybook/stories/assets/images/` (imágenes UBITS)

**Migrar todas las imágenes/logos relacionados con UBITS**

---

## 🚀 Proceso de Migración

### Fase 1: Preparación del Repositorio UBITS
1. Clonar el repositorio vacío: https://github.com/elkingarcia22/UBITS
2. Crear estructura base del proyecto
3. Crear `package.json` inicial
4. Crear `README.md` básico

### Fase 2: Migración de Archivos
1. Copiar componentes UBITS
2. Copiar tokens UBITS
3. Copiar tipografía UBITS
4. Copiar templates UBITS
5. Copiar Storybook UBITS
6. Copiar sistema de validación
7. Copiar scripts UBITS
8. Copiar documentación UBITS
9. Copiar configuración UBITS
10. Copiar assets UBITS

### Fase 3: Ajustes y Limpieza
1. Actualizar rutas en archivos migrados
2. Actualizar imports/referencias
3. Ajustar configuración de build
4. Verificar que todo funciona
5. Limpiar referencias UBITS de Autoframe

### Fase 4: Validación Final
1. Probar build del proyecto UBITS
2. Verificar Storybook
3. Verificar templates
4. Verificar validación automática
5. Documentar cambios

---

## 📁 Estructura Propuesta del Repositorio UBITS

```
UBITS/
├── packages/
│   ├── components/          # Componentes UBITS (antes addons/)
│   │   ├── button/
│   │   ├── sidebar/
│   │   ├── tabbar/
│   │   └── ...
│   ├── tokens/              # Tokens UBITS
│   ├── typography/           # Tipografía UBITS
│   ├── templates/           # Templates UBITS (antes proyecto-app/)
│   │   ├── template-admin.html
│   │   ├── template-colaborador.html
│   │   └── ...
│   └── storybook/           # Storybook UBITS (antes docs-site/)
│       ├── stories/
│       └── ...
├── scripts/
│   ├── validate-ubits.cjs
│   ├── init-project.cjs
│   └── ...
├── .ubits/                  # Sistema de validación
├── docs/                    # Documentación UBITS
├── package.json
├── README.md
├── tsconfig.json
└── ...
```

---

## ⚠️ Consideraciones Importantes

1. **NO migrar elementos genéricos de Autoframe**:
   - `packages/components/design/` (templates, tokens, typography genéricos)
   - `packages/components/functional/github/`
   - `packages/autoframe-core/`
   - `packages/icons/` (si es genérico)

2. **Actualizar todas las rutas**:
   - Cambiar referencias de `packages/components/` a `packages/components/`
   - Cambiar referencias de `packages/templates/` a `packages/templates/`
   - Cambiar referencias de `packages/storybook/` a `packages/storybook/`

3. **Mantener compatibilidad**:
   - Asegurar que los componentes sigan funcionando después de la migración
   - Verificar que los imports sean correctos
   - Probar todos los templates

4. **Limpieza en Autoframe**:
   - Eliminar archivos migrados
   - Eliminar referencias a UBITS en documentación
   - Actualizar `.cursorrules` para remover reglas UBITS
   - Actualizar `package.json` para remover scripts UBITS

---

## ✅ Checklist de Migración

- [ ] Repositorio UBITS clonado y preparado
- [ ] Estructura base creada
- [ ] Componentes UBITS migrados
- [ ] Tokens UBITS migrados
- [ ] Tipografía UBITS migrada
- [ ] Templates UBITS migrados
- [ ] Storybook UBITS migrado
- [ ] Sistema de validación migrado
- [ ] Scripts UBITS migrados
- [ ] Documentación UBITS migrada
- [ ] Configuración UBITS migrada
- [ ] Assets UBITS migrados
- [ ] Rutas actualizadas
- [ ] Imports corregidos
- [ ] Build funcionando
- [ ] Storybook funcionando
- [ ] Templates funcionando
- [ ] Validación funcionando
- [ ] Referencias UBITS eliminadas de Autoframe
- [ ] Documentación actualizada
- [ ] README.md creado para UBITS
- [ ] Commit inicial realizado

---

## 📝 Notas Finales

- Este proceso debe realizarse cuidadosamente para no romper nada
- Hacer commits frecuentes durante la migración
- Probar cada fase antes de continuar
- Mantener backups antes de eliminar archivos de Autoframe

