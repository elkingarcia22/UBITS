# 🚀 Guía de Despliegue de Storybook en Vercel

Esta guía explica cómo desplegar Storybook UBITS en Vercel.

## 📋 Opciones de Despliegue

### Opción 1: Despliegue Manual con Vercel CLI (Recomendado para pruebas)

#### Prerrequisitos

1. Instalar Vercel CLI:
```bash
npm install -g vercel
```

2. Iniciar sesión en Vercel:
```bash
vercel login
```

#### Pasos

1. **Construir Storybook localmente:**
```bash
# Desde la raíz del proyecto
npm run build:tokens
cd packages/storybook
npm run build-storybook
```

2. **Desplegar a producción:**
```bash
cd packages/storybook
npx vercel --prod
```

3. **Desplegar preview (para pruebas):**
```bash
cd packages/storybook
npx vercel
```

### Opción 2: Despliegue Automático desde GitHub (Recomendado para producción)

#### Configuración Inicial

1. **Conectar el repositorio con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add New Project"
   - Selecciona el repositorio `UBITS`

2. **Configurar el proyecto:**
   - **Root Directory**: `packages/storybook`
   - **Framework Preset**: Other
   - **Build Command**: `cd ../.. && npm run build:tokens && npm run build-storybook`
   - **Output Directory**: `storybook-static`
   - **Install Command**: `cd ../.. && npm install`

3. **Variables de entorno (si es necesario):**
   - Generalmente no se requieren variables de entorno para Storybook

4. **Hacer clic en "Deploy"**

#### Configuración Automática con vercel.json

El archivo `packages/storybook/vercel.json` ya está configurado con:
- Build command que genera tokens y construye Storybook
- Output directory apuntando a `storybook-static`
- Rewrites para SPA routing

### Opción 3: Usar el Script de Deploy

Ya existe un script en `packages/storybook/package.json`:

```bash
cd packages/storybook
npm run deploy        # Deploy a producción
npm run deploy:preview # Deploy preview
```

## 🔧 Configuración del Proyecto

### Estructura de Archivos

```
UBITS/
├── vercel.json                    # Configuración para raíz (opcional)
├── packages/
│   └── storybook/
│       ├── vercel.json           # Configuración principal
│       ├── package.json
│       └── storybook-static/     # Output del build
```

### Archivos de Configuración

#### `packages/storybook/vercel.json`

```json
{
  "buildCommand": "cd ../.. && npm run build:tokens && cd packages/storybook && npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null,
  "installCommand": "cd ../.. && npm install",
  "devCommand": "npm run storybook",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📝 Pasos Detallados para Despliegue Inicial

### 1. Preparar el Proyecto

```bash
# Desde la raíz del proyecto
npm install
npm run build:tokens
```

### 2. Verificar que Storybook se construye correctamente

```bash
cd packages/storybook
npm run build-storybook
```

Esto debe generar el directorio `storybook-static/` con todos los archivos.

### 3. Desplegar a Vercel

#### Opción A: Desde la raíz del proyecto
```bash
vercel --cwd packages/storybook
```

#### Opción B: Desde el directorio de storybook
```bash
cd packages/storybook
vercel
```

### 4. Seguir las instrucciones de Vercel CLI

- Vercel preguntará si quieres vincular el proyecto a uno existente o crear uno nuevo
- Selecciona el proyecto o crea uno nuevo
- Vercel detectará automáticamente la configuración de `vercel.json`

## 🌐 URLs Generadas

Después del despliegue, Vercel generará:

- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview**: `https://tu-proyecto-git-rama.vercel.app` (para cada PR)

## 🔄 Despliegues Automáticos

Una vez configurado, Vercel desplegará automáticamente:

- **Cada push a `main`/`master`**: Despliegue a producción
- **Cada Pull Request**: Despliegue preview con URL única
- **Cada push a otras ramas**: Despliegue preview

## 🐛 Solución de Problemas

### Error: "Cannot find module"

**Problema**: Vercel no encuentra las dependencias del monorepo.

**Solución**: Asegúrate de que `installCommand` en `vercel.json` ejecute `npm install` desde la raíz del proyecto.

### Error: "Tokens not found"

**Problema**: Los tokens no están generados antes del build.

**Solución**: El `buildCommand` en `vercel.json` ya incluye `npm run build:tokens`. Verifica que funcione correctamente.

### Error: "Output directory not found"

**Problema**: El directorio `storybook-static` no existe después del build.

**Solución**: Verifica que `build-storybook` se ejecute correctamente y genere el directorio.

### Assets no se cargan correctamente

**Problema**: Las imágenes o fuentes no se cargan en producción.

**Solución**: Verifica que `staticDirs` en `.storybook/main.ts` esté configurado correctamente y que los archivos estén en las rutas correctas.

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Desplegar Storybook en Vercel](https://storybook.js.org/docs/react/sharing/publish-storybook#deploying-to-vercel)
- [Configuración de Vercel para Monorepos](https://vercel.com/docs/monorepos)

## ✅ Checklist de Despliegue

- [ ] Tokens generados (`npm run build:tokens`)
- [ ] Storybook se construye localmente (`npm run build-storybook`)
- [ ] `vercel.json` configurado correctamente
- [ ] Repositorio conectado a Vercel
- [ ] Variables de entorno configuradas (si es necesario)
- [ ] Primer despliegue exitoso
- [ ] URLs de producción y preview funcionando
- [ ] Assets (imágenes, fuentes) cargando correctamente

## 🎯 Comandos Rápidos

```bash
# Build local
npm run build:tokens && cd packages/storybook && npm run build-storybook

# Deploy producción
cd packages/storybook && npx vercel --prod

# Deploy preview
cd packages/storybook && npx vercel

# Ver logs
vercel logs
```

