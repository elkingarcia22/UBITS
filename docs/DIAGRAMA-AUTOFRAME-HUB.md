# 🎨 Diagrama Visual: Autoframe Hub Architecture

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                      AUTOFRAME HUB (Core)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Registry   │  │    Loader    │  │    Config     │        │
│  │              │  │              │  │   Manager     │        │
│  │ - Discover   │  │ - Load       │  │ - Load Config │        │
│  │ - Register   │  │ - Initialize │  │ - Save Config │        │
│  │ - Get        │  │ - Activate   │  │ - Validate    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│         │                │                  │                   │
│         └────────────────┼──────────────────┘                  │
│                          │                                     │
│                  ┌───────▼────────┐                            │
│                  │  Event Bus     │                            │
│                  │  (Orchestrator)│                            │
│                  └───────┬────────┘                            │
└──────────────────────────┼─────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   DESIGN     │  │  FUNCTIONAL  │  │  COMPONENTS  │
│   ADD-ONS    │  │    ADD-ONS    │  │    ADD-ONS   │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ • tokens     │  │ • github      │  │ • button     │
│ • templates  │  │ • clarity     │  │ • sidebar    │
│ • typography │  │ • vercel      │  │ • input      │
│              │  │ • jest        │  │ • ...        │
│              │  │ • auto-review │  │              │
│              │  │ • feedback   │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

## 🔄 Flujo de Inicialización

```
1. Usuario ejecuta: npm run autoframe:init
   │
   ▼
2. Script lee .ubits/project-config.json
   │
   ▼
3. AutoframeHub se inicializa
   │
   ▼
4. Hub carga configuración de add-ons activos
   │
   ▼
5. Para cada add-on activo:
   │
   ├─► Verificar dependencias
   │
   ├─► Cargar add-on (AddonLoader)
   │
   ├─► Inicializar add-on
   │
   ├─► Activar add-on
   │
   └─► Registrar en Registry
   │
   ▼
6. Hub está listo y orquestando todos los add-ons
```

## 🔌 Flujo de Eventos (Ejemplo: Auto-commit)

```
Usuario modifica archivo
   │
   ▼
AutoframeHub detecta cambio
   │
   ▼
Hub emite evento: 'fileChange'
   │
   ▼
GitHub Add-on recibe evento
   │
   ▼
GitHub Add-on procesa cambio
   │
   ├─► Valida código (si auto-review activo)
   │
   ├─► Hace commit automático
   │
   └─► Notifica a otros add-ons (opcional)
   │
   ▼
Clarity Add-on (si activo) registra evento
   │
   ▼
Vercel Add-on (si activo) puede trigger deploy
```

## 📦 Estructura de un Add-on Funcional

```
packages/components/functional/github/
├── package.json
├── manifest.json              # Metadatos del add-on
├── src/
│   ├── index.ts              # Export principal
│   ├── GitHubAddon.ts        # Implementa IFunctionalAddon
│   ├── AutoCommitService.ts  # Lógica de auto-commit
│   └── config/
│       └── schema.json       # Schema de configuración
└── dist/
    └── github.js             # Bundle compilado
```

## 🎛️ Configuración Centralizada

```
.ubits/project-config.json
│
├─► Información del proyecto
│
└─► autoframe.addons
    │
    ├─► active: ["tokens-ubits", "github", "clarity"]
    │
    └─► config:
        │
        ├─► tokens-ubits: { source: "...", version: "1.0.0" }
        │
        ├─► github: { enabled: true, autoCommit: true, ... }
        │
        └─► clarity: { enabled: true, projectId: "..." }
```

## 🔄 Ciclo de Vida de un Add-on

```
┌─────────────┐
│  Installed  │  ← Add-on disponible pero no activo
└──────┬──────┘
       │ activate()
       ▼
┌─────────────┐
│   Active    │  ← Add-on funcionando
└──────┬──────┘
       │ deactivate()
       ▼
┌─────────────┐
│  Inactive   │  ← Add-on desactivado pero disponible
└──────┬──────┘
       │ destroy()
       ▼
┌─────────────┐
│  Destroyed  │  ← Add-on removido completamente
└─────────────┘
```

## 🎯 Ejemplo de Uso

```javascript
// En tu aplicación principal

import { AutoframeHub } from '@autoframe/core';

// Inicializar hub
const hub = new AutoframeHub('.ubits/project-config.json');
await hub.initialize();

// Obtener add-ons activos
const activeAddons = hub.getActiveAddons();
console.log('Add-ons activos:', activeAddons.map(a => a.name));

// Activar un add-on dinámicamente
await hub.activateAddon('github');

// Emitir evento (todos los add-ons funcionales lo reciben)
await hub.emitEvent('fileChange', { path: 'src/App.tsx' });

// Desactivar add-on
await hub.deactivateAddon('clarity');
```

## 🔗 Dependencias entre Add-ons

```
tokens-ubits (base)
    │
    ├─► button (requiere tokens-ubits)
    │
    ├─► sidebar (requiere tokens-ubits)
    │
    └─► input (requiere tokens-ubits)

github
    │
    └─► auto-review (opcional, mejora commits de github)

vercel
    │
    └─► jest (opcional, corre tests antes de deploy)
```

## ✅ Ventajas Visuales

```
┌─────────────────────────────────────────────────────────┐
│  ANTES (Estructura Actual)                              │
├─────────────────────────────────────────────────────────┤
│  • Scripts dispersos                                   │
│  • Integración manual de add-ons                       │
│  • No hay orquestación central                         │
│  • Cada add-on se configura diferente                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  DESPUÉS (Con Autoframe Hub)                            │
├─────────────────────────────────────────────────────────┤
│  ✅ Hub central orquestando todo                        │
│  ✅ Interfaz unificada para todos los add-ons          │
│  ✅ Configuración centralizada                          │
│  ✅ Activación/desactivación dinámica                   │
│  ✅ Sistema de eventos entre add-ons                    │
│  ✅ Gestión de dependencias automática                  │
└─────────────────────────────────────────────────────────┘
```

