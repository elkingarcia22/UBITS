/**
 * Avatar Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderAvatar, createAvatar } from '../../../components/avatar/src/AvatarProvider';
import type { AvatarOptions } from '../../../components/avatar/src/types/AvatarOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/avatar/src/styles/avatar.css';
import '../../../components/badge/src/styles/badge.css';

const meta: Meta<AvatarOptions> = {
  title: 'Básicos/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          `Componente Avatar UBITS con soporte para imagen, iniciales e icono. Múltiples tamaños y badge opcional con contenido (texto/números). Usa tokens UBITS exclusivamente.

\`\`\`html
// Opción 1: Usar createAvatar (retorna elemento)
const avatarElement = window.UBITS.Avatar.create({
  initials: 'JD',
  size: 'md',
  alt: 'Avatar'
});
document.getElementById('container').appendChild(avatarElement);

// Opción 2: Usar renderAvatar (retorna HTML string)
const avatarHTML = window.UBITS.Avatar.render({
  initials: 'JD',
  size: 'md',
  alt: 'Avatar'
});
document.getElementById('container').innerHTML = avatarHTML;
\`\`\``,
      },
    },
    layout: 'centered',
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-avatar',
      api: {
        create: 'window.UBITS.Avatar.create',
        tag: '<ubits-avatar>',
      },
      dependsOn: {
        required: [], // Avatar no requiere otros componentes
        optional: ['🧩-ux-badge'], // Badge es opcional
      },
      internals: [], // Avatar no tiene componentes internos privados
      slots: {}, // Avatar no tiene slots públicos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-border-radius-sm',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.Avatar.create({
  icon: 'user',
  size: 'md',
  alt: 'Avatar',
  onClick: () => {}
});`,
        basic: `window.UBITS.Avatar.create({
  icon: 'user',
  size: 'md',
  alt: 'Avatar'
});`,
        withInitials: `window.UBITS.Avatar.create({
  initials: 'JD',
  size: 'md',
  alt: 'Avatar'
});`,
        withImage: `window.UBITS.Avatar.create({
  imageUrl: 'https://example.com/avatar.jpg',
  size: 'md',
  alt: 'Avatar'
});`,
        withBadge: `window.UBITS.Avatar.create({
  icon: 'user',
  size: 'md',
  badgeColor: 'error',
  badgeContent: '5',
  alt: 'Avatar'
});`,
      },
      variants: {
        size: ['xs', 'sm', 'md', 'lg'],
      },
      events: {
        onClick: {
          type: 'MouseEvent',
          description: 'Emitted when avatar is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'basicos-avatar--implementation',
        storiesByExample: {
          canonical: 'basicos-avatar--implementation',
          basic: 'basicos-avatar--default',
          withInitials: 'basicos-avatar--with-initials',
          withImage: 'basicos-avatar--with-image',
          withBadge: 'basicos-avatar--with-badge',
        },
      },
      intents: {
        'avatar.user': 'canonical',
        'avatar.profile': 'canonical',
        'avatar.icon': 'canonical',
        'avatar.initials': 'withInitials',
        'avatar.image': 'withImage',
        'avatar.badge': 'withBadge',
      },
    }),
  },
  args: {
    imageUrl: undefined,
    initials: undefined,
    icon: 'user',
    size: 'md',
    badgeColor: undefined,
    badgeContent: undefined,
    alt: 'Avatar',
    className: '',
  },
  argTypes: {
    imageUrl: {
      control: { type: 'text' },
      description: 'URL de la imagen del avatar (para variante Photo). Si se proporciona, se usa la variante Photo.',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    initials: {
      control: { type: 'text' },
      description: 'Texto para mostrar como iniciales (para variante Initials). Ej: "John Doe" genera "JD".',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (para variante Icon). Ej: "user", "robot".',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'user' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del avatar (XS: 20px, SM: 28px, MD: 36px, LG: 40px)',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    badgeColor: {
      control: { type: 'text' },
      description: 'Color del badge. Si se proporciona, se muestra el badge. Dejar vacío para ocultar.',
      table: {
        type: { summary: 'string | null' },
        category: 'Badge',
      },
    },
    badgeContent: {
      control: { type: 'text' },
      description: 'Contenido del badge (número o texto). Si no se proporciona, se muestra solo el punto (dot).',
      table: {
        type: { summary: 'string | number | null' },
        category: 'Badge',
      },
    },
    alt: {
      control: { type: 'text' },
      description: 'Texto alternativo para accesibilidad (solo para variante Photo)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Avatar' },
        category: 'Accesibilidad',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic en el avatar',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AvatarOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    imageUrl: undefined,
    initials: 'JD',
    icon: undefined,
    size: 'md',
    badgeColor: undefined,
    badgeContent: undefined,
    alt: 'Avatar',
    className: '',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// Opción 1: Usar createAvatar (retorna elemento)
const avatarElement = window.UBITS.Avatar.create({
  initials: 'JD',
  size: 'md',
  alt: 'Avatar'
});
document.getElementById('container').appendChild(avatarElement);

// Opción 2: Usar renderAvatar (retorna HTML string)
const avatarHTML = window.UBITS.Avatar.render({
  initials: 'JD',
  size: 'md',
  alt: 'Avatar'
});
document.getElementById('container').innerHTML = avatarHTML;`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-avatar');
    container.setAttribute('data-ubits-component', 'Avatar');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    // Crear avatar usando renderAvatar (más simple para Storybook)
    const avatarHTML = renderAvatar(args);
    container.innerHTML = avatarHTML;

    // Agregar event listener si hay onClick
    if (args.onClick) {
      const avatarElement = container.querySelector('.ubits-avatar');
      if (avatarElement) {
        avatarElement.addEventListener('click', args.onClick);
      }
    }

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    imageUrl: undefined,
    initials: undefined,
    icon: 'user',
    size: 'md',
    badgeColor: undefined,
    badgeContent: undefined,
    alt: 'Avatar',
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const avatarHTML = renderAvatar(args);
    container.innerHTML = avatarHTML;

    if (args.onClick) {
      const avatarElement = container.querySelector('.ubits-avatar');
      if (avatarElement) {
        avatarElement.addEventListener('click', args.onClick);
      }
    }

    return container;
  },
};
