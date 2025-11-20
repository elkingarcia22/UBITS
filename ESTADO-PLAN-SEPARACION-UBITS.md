# 📊 Estado del Plan: Separación UBITS vs Autoframe

## ✅ COMPLETADO

### FASE 2: Add-ons Genéricos de Autoframe
- ✅ **2.1: Templates** - `packages/components/design/templates-admin/` y `templates-colaborador/`
- ✅ **2.2: Tokens** - `packages/components/design/tokens/` (genérico Autoframe)
- ✅ **2.3: Typography** - `packages/components/design/typography/` (genérico Autoframe)
- ⏸️ **2.4: Componentes** - DEJADO PARA DESPUÉS (button, input, etc.)
- ⏸️ **2.5: Storybook** - DEJADO PARA DESPUÉS

---

## ⏸️ PENDIENTE (Dejado para después)

### FASE 2.4: Componentes Genéricos de Autoframe
**Estado:** Los componentes UBITS originales existen en `packages/components/` (button, sidebar, input, alert, toast) y pueden quedarse como están.

**Falta crear versiones genéricas de Autoframe:**
- ❌ `packages/components/components/button-generic/` (genérico Autoframe)
- ❌ `packages/components/components/input-generic/` (genérico Autoframe)
- ❌ `packages/components/components/alert-generic/` (genérico Autoframe)
- ❌ Y otros componentes genéricos según necesidad

---

### FASE 2.5: Storybook Genérico de Autoframe
**Estado:** Ya existe `packages/components/functional/storybook/` (genérico de Autoframe) pero puede necesitar mejoras.

**Falta:**
- ❌ Verificar si el storybook genérico está completo
- ❌ Asegurar que funciona correctamente con los add-ons genéricos de Autoframe

---

## 📝 NOTAS IMPORTANTES

1. **Los elementos UBITS originales pueden quedarse como están** - No necesitan convertirse en add-ons externos del Hub
2. **Los add-ons genéricos de Autoframe ya están creados** (templates, tokens, typography) ✅
3. **Lo que falta es solo:**
   - Componentes genéricos de Autoframe (Fase 2.4)
   - Verificar/mejorar Storybook genérico (Fase 2.5)

---

## 🎯 PRÓXIMOS PASOS

### Opción 1: Completar Fase 2.4 (Componentes Genéricos)
Crear versiones genéricas de Autoframe para los componentes principales (button, input, alert, etc.)

### Opción 2: Completar Fase 2.5 (Storybook)
Verificar y mejorar el storybook genérico de Autoframe

### Opción 3: Corregir Errores en Tokens
Arreglar los errores menores en `packages/components/design/tokens/` antes de continuar

