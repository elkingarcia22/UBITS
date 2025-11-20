# UBITS Badge Component

Componente de badge standalone para el sistema de diseño UBITS.

## Uso

### Badge Standalone

```html
<!-- Badge simple (solo punto) -->
<span class="ubits-badge"></span>

<!-- Badge con contenido -->
<span class="ubits-badge">5</span>
<span class="ubits-badge">99+</span>
<span class="ubits-badge">Nuevo</span>

<!-- Badge con tamaño -->
<span class="ubits-badge ubits-badge--sm">3</span>
<span class="ubits-badge ubits-badge--lg">10</span>

<!-- Badge absoluto (para posicionar en esquinas) -->
<div class="ubits-badge-container">
  <span>Notificaciones</span>
  <span class="ubits-badge ubits-badge--absolute ubits-badge--absolute-top-right">5</span>
</div>
```

### Badge en Botones

El badge también se puede usar dentro de botones usando la clase `ubits-button__badge`:

```html
<button class="ubits-button ubits-button--primary ubits-button--md">
  <i class="far fa-bell"></i>
  <span>Notificaciones</span>
  <span class="ubits-button__badge"></span>
</button>
```

## API TypeScript

```typescript
import { renderBadge, createBadge } from '@ubits/badge';

// Generar HTML
const html = renderBadge({ content: '5', size: 'md' });

// Crear elemento
const badge = createBadge({ content: '99+', size: 'lg' });
document.body.appendChild(badge);
```

## Tamaños

- `sm`: 8px (sin contenido), 16px (con contenido)
- `md`: 10px (sin contenido), 18px (con contenido) - **Por defecto**
- `lg`: 12px (sin contenido), 20px (con contenido)

## Tokens CSS

El badge usa el token:
- `--ubits-button-badge`: Color del badge (#cf0e34)

