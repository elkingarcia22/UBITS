# @ubits/button

Componente Button UBITS como add-on intercambiable, replicando exactamente los estilos del playground anterior pero usando nuestros tokens, tipografía e iconos.

## ✨ Características

- ✅ **Todas las variantes**: Primary, Secondary, Tertiary, Active
- ✅ **Todos los tamaños**: XS, S, M, L, XL (5 tamaños)
- ✅ **Todos los estados**: Default, Hover, Active, Focus, Disabled, Loading
- ✅ **Modificadores**: Icon-only, Full-width, Block, Icon-right
- ✅ **Features**: Badge, Loading spinner, Responsive
- ✅ **Web Component nativo**: `<ubits-button>`
- ✅ **API programática**: `renderButton()` y `createButton()`

## 📦 Instalación

```bash
pnpm add @ubits/button
```

## 🚀 Uso

### Web Component (HTML)

```html
<!-- Botón básico -->
<ubits-button variant="primary" size="md">
  Guardar
</ubits-button>

<!-- Botón con icono -->
<ubits-button variant="primary" size="md" icon="save" icon-style="regular">
  Guardar cambios
</ubits-button>

<!-- Botón loading -->
<ubits-button variant="primary" size="md" loading loading-text="Guardando...">
  Guardar
</ubits-button>

<!-- Botón disabled -->
<ubits-button variant="secondary" size="sm" disabled>
  Cancelar
</ubits-button>

<!-- Botón icon-only -->
<ubits-button variant="tertiary" size="sm" icon="trash" icon-only></ubits-button>

<!-- Botón con badge -->
<ubits-button variant="primary" size="md" icon="bell" badge>
  Notificaciones
</ubits-button>
```

### JavaScript/TypeScript

```typescript
import { renderButton, createButton } from '@ubits/button';

// Renderizar HTML string
const html = renderButton({
  variant: 'primary',
  size: 'md',
  text: 'Guardar',
  icon: 'save',
  iconStyle: 'regular'
});

// Crear elemento DOM
const button = createButton({
  variant: 'secondary',
  size: 'lg',
  text: 'Cancelar',
  onClick: () => console.log('Clicked!')
});

document.body.appendChild(button);
```

### CSS (HTML directo)

```html
<link rel="stylesheet" href="@ubits/tokens/dist/tokens.css">
<link rel="stylesheet" href="@ubits/typography/tokens-typography.css">
<link rel="stylesheet" href="@ubits/typography/fonts.css">
<link rel="stylesheet" href="@ubits/icons/dist/fontawesome.css">
<link rel="stylesheet" href="@ubits/button/styles/button.css">

<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-check"></i>
  <span>Confirmar</span>
</button>
```

## 🎨 Variantes

- `primary`: Botón principal (azul)
- `secondary`: Botón secundario (gris/blanco)
- `tertiary`: Botón terciario (transparente)
- `active`: Outline con fondo activo

## 📏 Tamaños

- `xs`: 24px (compacto)
- `sm`: 32px (pequeño)
- `md`: 40px (mediano, default)
- `lg`: 48px (grande)
- `xl`: 56px (extra grande)

## 🔄 Estados

- `default`: Estado inicial
- `hover`: Al pasar el mouse
- `active`: Al hacer clic
- `focus`: Al navegar por teclado
- `disabled`: Deshabilitado
- `loading`: Cargando (con spinner)

## 📚 Ejemplos Completos

### Todos los tamaños

```html
<ubits-button variant="primary" size="xs">XS</ubits-button>
<ubits-button variant="primary" size="sm">Small</ubits-button>
<ubits-button variant="primary" size="md">Medium</ubits-button>
<ubits-button variant="primary" size="lg">Large</ubits-button>
<ubits-button variant="primary" size="xl">Extra Large</ubits-button>
```

### Todas las variantes

```html
<ubits-button variant="primary">Primary</ubits-button>
<ubits-button variant="secondary">Secondary</ubits-button>
<ubits-button variant="tertiary">Tertiary</ubits-button>
<ubits-button variant="primary" active>Active</ubits-button>
```

### Con estados

```html
<ubits-button variant="primary">Default</ubits-button>
<ubits-button variant="primary" disabled>Disabled</ubits-button>
<ubits-button variant="primary" loading>Loading</ubits-button>
```

### Modificadores

```html
<!-- Icon-only -->
<ubits-button variant="tertiary" size="sm" icon="trash" icon-only></ubits-button>

<!-- Full-width -->
<ubits-button variant="primary" full-width>Ancho completo</ubits-button>

<!-- Block -->
<ubits-button variant="secondary" block>Display block</ubits-button>

<!-- Icon right -->
<ubits-button variant="primary" icon="arrow-right" icon-position="right">
  Continuar
</ubits-button>
```

## 🎯 API

### `renderButton(options: ButtonOptions): string`

Renderiza un botón como HTML string.

### `createButton(options: ButtonOptions): HTMLButtonElement`

Crea un elemento `HTMLButtonElement` con todos los event listeners configurados.

### `ButtonOptions`

```typescript
interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  icon?: string;
  iconStyle?: 'regular' | 'solid';
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  badge?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
  attributes?: Record<string, string>;
  onClick?: (event: MouseEvent) => void;
}
```

## 📦 Dependencias

- `@ubits/tokens`: Tokens de color y diseño
- `@ubits/icons`: Sistema de iconos
- `@ubits/typography`: Tipografía UBITS

## 🔧 Desarrollo

```bash
# Build
pnpm build

# Watch
pnpm dev

# Lint
pnpm lint
```

## 📝 Notas

- Todos los estilos son exactamente iguales al playground anterior
- Usa nuestros tokens CSS (`var(--ubits-*)`)
- Usa nuestra tipografía (`var(--font-*)`)
- Integrado con el sistema de iconos UBITS
- Totalmente compatible con el HTML del playground anterior

