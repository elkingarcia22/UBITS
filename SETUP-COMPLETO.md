# 🚀 Guía de Setup Completo - UBITS Design System

Esta guía te ayudará a configurar todo el proyecto UBITS desde cero en cualquier máquina nueva.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn instalado
- Git instalado
- Python 3 (opcional, para servidor HTTP de templates)

## 🔧 Paso 1: Clonar y Configurar

```bash
# 1. Clonar el repositorio
git clone https://github.com/elkingarcia22/UBITS.git
cd UBITS

# 2. Instalar todas las dependencias
npm install

# 3. Generar tokens (CRÍTICO - debe hacerse primero)
npm run build:tokens
```

## ✅ Paso 2: Verificar Configuración

### Verificar Storybook

```bash
cd packages/storybook
./verificar-setup.sh
```

Si hay errores:
- Instala dependencias: `npm install` (en `packages/storybook`)
- Regenera tokens: `npm run build:tokens` (desde la raíz)

### Verificar Templates

```bash
npm run templates:verify
```

Si hay errores:
- Regenera tokens: `npm run build:tokens`
- Verifica que los assets existan

## 🚀 Paso 3: Iniciar Storybook

```bash
# Desde la raíz
npm run storybook
```

Abre: `http://localhost:6006`

**Si hay problemas:** Consulta [SETUP-STORYBOOK.md](./packages/storybook/SETUP-STORYBOOK.md)

## 📄 Paso 4: Iniciar Templates

```bash
# Opción 1: Usar script npm
npm run templates:serve

# Opción 2: Python
cd packages/templates
python3 -m http.server 8000

# Opción 3: Node.js http-server
cd packages/templates
npx http-server -p 8000
```

Abre:
- **Administrador**: `http://localhost:8000/template-admin.html`
- **Colaborador**: `http://localhost:8000/template-colaborador.html`

**Si hay problemas:** Consulta [SETUP-TEMPLATES.md](./packages/templates/SETUP-TEMPLATES.md)

## 📚 Documentación Completa

### Storybook
- **Guía completa**: [packages/storybook/SETUP-STORYBOOK.md](./packages/storybook/SETUP-STORYBOOK.md)
- **README**: [packages/storybook/README.md](./packages/storybook/README.md)
- **Script de verificación**: `packages/storybook/verificar-setup.sh`

### Templates
- **Guía completa**: [packages/templates/SETUP-TEMPLATES.md](./packages/templates/SETUP-TEMPLATES.md)
- **README**: [packages/templates/README.md](./packages/templates/README.md)
- **Script de verificación**: `packages/templates/verificar-setup.sh`

## 🔄 Comandos Útiles

```bash
# Regenerar tokens (hacer después de modificar tokens.json)
npm run build:tokens

# Verificar Storybook
cd packages/storybook && ./verificar-setup.sh

# Verificar Templates
npm run templates:verify

# Iniciar Storybook
npm run storybook

# Iniciar Templates
npm run templates:serve

# Build estático de Storybook
npm run build:storybook

# Validar código UBITS
npm run validate

# Validar y corregir automáticamente
npm run validate:fix
```

## 🐛 Solución de Problemas Comunes

### Problema: "Tokens no generados"

**Solución:**
```bash
npm run build:tokens
```

### Problema: "Dependencias faltantes"

**Solución:**
```bash
npm install
cd packages/storybook && npm install
```

### Problema: "CORS error" en templates

**Solución:**
- NO uses `file://` - Los templates requieren servidor HTTP
- Usa `npm run templates:serve` o un servidor HTTP

### Problema: "Componentes sin estilos"

**Solución:**
1. Verifica rutas CSS (deben usar `../components/` no `../addons/`)
2. Regenera tokens: `npm run build:tokens`
3. Verifica que los CSS existan en `packages/components/[component]/src/styles/`

### Problema: "Iconos no aparecen"

**Solución:**
1. Verifica que FontAwesome esté en `packages/templates/assets/fontawesome/`
2. Verifica que el CSS esté cargado en los templates
3. Verifica que las fuentes estén en `webfonts/`

## ✅ Checklist Final

Antes de empezar a trabajar, verifica:

- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Tokens generados (`npm run build:tokens`)
- [ ] Storybook verificado (`cd packages/storybook && ./verificar-setup.sh`)
- [ ] Templates verificados (`npm run templates:verify`)
- [ ] Storybook inicia correctamente (`npm run storybook`)
- [ ] Templates inician correctamente (`npm run templates:serve`)

## 📖 Recursos Adicionales

- [README Principal](./README.md)
- [Guía de Storybook](./packages/storybook/SETUP-STORYBOOK.md)
- [Guía de Templates](./packages/templates/SETUP-TEMPLATES.md)
- [Documentación de Componentes](./docs/)

## 🆘 ¿Necesitas Ayuda?

1. Revisa la documentación específica:
   - Storybook: `packages/storybook/SETUP-STORYBOOK.md`
   - Templates: `packages/templates/SETUP-TEMPLATES.md`

2. Ejecuta los scripts de verificación:
   - Storybook: `cd packages/storybook && ./verificar-setup.sh`
   - Templates: `npm run templates:verify`

3. Revisa la consola del navegador para errores específicos

4. Verifica que todos los requisitos previos estén instalados

---

**Última actualización:** Noviembre 2024  
**Versión:** 1.0.0

