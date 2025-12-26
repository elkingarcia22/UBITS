# Mapeo de componentId a Providers

Este documento mapea cada componentId a su Provider correspondiente para agregar `data-ubits-id`.

## Componentes Principales

- `🧩-ux-button` → `packages/components/button/src/ButtonProvider.ts` ✅
- `🧩-ux-badge` → `packages/components/badge/src/BadgeProvider.ts`
- `🧩-ux-input` → `packages/components/input/src/InputProvider.ts`
- `🧩-ux-data-view` → `packages/components/data-view/src/DataViewProvider.ts`
- `🧩-ux-data-table` → `packages/components/data-table/src/DataTableProvider.ts`

## Patrones a seguir:

1. **render* functions (HTML string)**: Agregar `data-ubits-id="<componentId>"` al elemento root en el template string
2. **create* functions (HTMLElement)**: Agregar `element.setAttribute('data-ubits-id', '<componentId>')` después de crear el elemento

