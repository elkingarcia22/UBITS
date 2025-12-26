/**
 * EmptyState Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
  renderEmptyState,
  createEmptyState,
} from '../../../components/empty-state/src/EmptyStateProvider';
import type { EmptyStateOptions } from '../../../components/empty-state/src/types/EmptyStateOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/empty-state/src/styles/empty-state.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<EmptyStateOptions> = {
  title: 'Feedback/Empty State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción.',
      },
    },
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-empty-state',
      api: {
        create: 'window.UBITS.EmptyState.create',
        tag: '<ubits-empty-state>',
      },
      dependsOn: {
        required: [], // EmptyState no requiere otros componentes
        optional: ['🧩-ux-button'], // Botones de acción son opcionales
      },
      internals: [], // EmptyState no tiene componentes internos privados
      slots: {}, // EmptyState no tiene slots públicos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: ['title'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  onPrimaryAction: () => {}
});`,
        basic: `window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.'
});`,
        withIcon: `window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  icon: 'inbox',
  iconSize: 'md'
});`,
        withImage: `window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  imageUrl: 'https://example.com/empty-state.png'
});`,
        withButton: `window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  showPrimaryButton: true,
  actionLabel: 'Crear elemento',
  onPrimaryAction: () => {}
});`,
      },
      variants: {
        iconSize: ['xs', 'sm', 'md', 'lg', 'xl'],
        showPrimaryButton: [true, false],
        showSecondaryButton: [true, false],
      },
      events: {
        onPrimaryAction: {
          type: 'Event',
          description: 'Emitted when primary button is clicked',
        },
        onSecondaryAction: {
          type: 'Event',
          description: 'Emitted when secondary button is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'feedback-empty-state--implementation',
        storiesByExample: {
          canonical: 'feedback-empty-state--implementation',
          basic: 'feedback-empty-state--default',
          withIcon: 'feedback-empty-state--with-icon',
          withImage: 'feedback-empty-state--with-image',
          withButton: 'feedback-empty-state--with-button',
        },
      },
      intents: {
        'emptystate.empty': 'canonical',
        'emptystate.no-data': 'canonical',
        'emptystate.basic': 'canonical',
        'emptystate.with-icon': 'withIcon',
        'emptystate.with-image': 'withImage',
        'emptystate.with-button': 'withButton',
      },
    }),
  },
  args: {
    title: 'No hay elementos',
    description: 'No se encontraron elementos para mostrar.',
    imageUrl: undefined,
    icon: undefined,
    iconSize: 'md',
    actionLabel: undefined,
    showPrimaryButton: false,
    primaryButtonIcon: undefined,
    showPrimaryButtonIcon: false,
    secondaryActionLabel: undefined,
    showSecondaryButton: false,
    secondaryButtonIcon: undefined,
    showSecondaryButtonIcon: false,
    className: '',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del empty state (requerido).',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descripción o mensaje del empty state',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: 'URL de la imagen/ilustración (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Visual',
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)',
      table: {
        type: { summary: 'string' },
        category: 'Visual',
      },
    },
    iconSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del icono',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Visual',
      },
    },
    actionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción principal (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    primaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón primario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    secondaryActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    onAction: {
      action: 'action-clicked',
      description: 'Callback cuando se hace clic en el botón de acción',
      table: {
        disable: true,
      },
    },
    onSecondaryAction: {
      action: 'secondary-action-clicked',
      description: 'Callback cuando se hace clic en el botón secundario',
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
type Story = StoryObj<EmptyStateOptions>;

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
    title: 'No hay elementos',
    description: 'No se encontraron elementos para mostrar.',
    imageUrl: undefined,
    icon: 'inbox',
    iconSize: 'md',
    actionLabel: 'Crear elemento',
    showPrimaryButton: true,
    primaryButtonIcon: undefined,
    showPrimaryButtonIcon: false,
    secondaryActionLabel: undefined,
    showSecondaryButton: false,
    secondaryButtonIcon: undefined,
    showSecondaryButtonIcon: false,
    className: '',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// Opción 1: Usar createEmptyState (retorna elemento)
const emptyStateElement = window.UBITS.EmptyState.create({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  icon: 'inbox',
  iconSize: 'md',
  actionLabel: 'Crear elemento',
  showPrimaryButton: true
});
document.getElementById('container').appendChild(emptyStateElement);

// Opción 2: Usar renderEmptyState (retorna HTML string)
const emptyStateHTML = window.UBITS.EmptyState.render({
  title: 'No hay elementos',
  description: 'No se encontraron elementos para mostrar.',
  icon: 'inbox',
  iconSize: 'md',
  actionLabel: 'Crear elemento',
  showPrimaryButton: true
});
document.getElementById('container').innerHTML = emptyStateHTML;`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-empty-state');
    container.setAttribute('data-ubits-component', 'EmptyState');
    container.style.padding = '40px';
    container.style.width = '100%';
    container.style.maxWidth = '600px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.minHeight = '400px';

    // Crear empty state usando renderEmptyState (más simple para Storybook)
    const emptyStateHTML = renderEmptyState(args);
    container.innerHTML = emptyStateHTML;

    // Agregar event listeners si hay callbacks
    if (args.onAction) {
      const primaryButton = container.querySelector('.ubits-empty-state__primary-button');
      if (primaryButton) {
        primaryButton.addEventListener('click', args.onAction);
      }
    }
    if (args.onSecondaryAction) {
      const secondaryButton = container.querySelector(
        '.ubits-empty-state__secondary-button',
      );
      if (secondaryButton) {
        secondaryButton.addEventListener('click', args.onSecondaryAction);
      }
    }

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    title: 'No hay elementos',
    description: 'No se encontraron elementos para mostrar.',
    imageUrl: undefined,
    icon: undefined,
    iconSize: 'md',
    actionLabel: undefined,
    showPrimaryButton: false,
    primaryButtonIcon: undefined,
    showPrimaryButtonIcon: false,
    secondaryActionLabel: undefined,
    showSecondaryButton: false,
    secondaryButtonIcon: undefined,
    showSecondaryButtonIcon: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.width = '100%';
    container.style.maxWidth = '600px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.minHeight = '400px';

    const emptyStateHTML = renderEmptyState(args);
    container.innerHTML = emptyStateHTML;

    if (args.onAction) {
      const primaryButton = container.querySelector('.ubits-empty-state__primary-button');
      if (primaryButton) {
        primaryButton.addEventListener('click', args.onAction);
      }
    }
    if (args.onSecondaryAction) {
      const secondaryButton = container.querySelector(
        '.ubits-empty-state__secondary-button',
      );
      if (secondaryButton) {
        secondaryButton.addEventListener('click', args.onSecondaryAction);
      }
    }

    return container;
  },
};
