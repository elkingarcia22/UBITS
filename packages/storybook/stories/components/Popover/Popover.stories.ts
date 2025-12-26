/**
 * Popover Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createPopover } from '../../../components/popover/src/PopoverProvider';
import type { PopoverOptions } from '../../../components/popover/src/types/PopoverOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/popover/src/styles/popover.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<PopoverOptions> = {
  title: 'Feedback/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Popover UBITS con tail (flecha) para mostrar información contextual. Similar al modal pero más pequeño y con tail. Se usa para mostrar información adicional, tooltips avanzados o acciones contextuales.

```html
const popoverInstance = window.UBITS.Popover.create({
  title: 'Información adicional',
  bodyContent: '<p>Este es el contenido del popover con información contextual.</p>',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  footerButtons: {
    primary: {
      label: 'Aceptar',
      onClick: () => {
        console.log('Aceptar clickeado');
      }
    }
  },
  closeOnOutsideClick: true,
  open: true
});
```',
      },
    },
    layout: 'fullscreen',
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-popover',
      api: {
        create: 'window.UBITS.Popover.create',
        tag: '<ubits-popover>',
      },
      dependsOn: {
        required: ['🧩-ux-button'], // Footer buttons son requeridos si se usan
        optional: [], // No hay componentes opcionales adicionales
      },
      internals: [], // Popover no tiene componentes internos privados
      slots: {
        header: [], // Header es interno (título opcional)
        body: [], // Body es interno
        footer: ['🧩-ux-button'], // Footer buttons son dependsOn
      },
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.Popover.create({
  targetElement: document.getElementById('target'),
  bodyContent: '<p>Contenido del popover</p>',
  tailPosition: 'top',
  onClose: function() {}
});`,
        basic: `window.UBITS.Popover.create({
  targetElement: document.getElementById('target'),
  bodyContent: '<p>Contenido del popover</p>',
  tailPosition: 'top'
});`,
        withTitle: `window.UBITS.Popover.create({
  targetElement: document.getElementById('target'),
  title: 'Título del popover',
  bodyContent: '<p>Contenido del popover</p>',
  tailPosition: 'top'
});`,
        withButtons: `window.UBITS.Popover.create({
  targetElement: document.getElementById('target'),
  bodyContent: '<p>Contenido del popover</p>',
  footerButtons: {
    primary: { label: 'Aceptar', onClick: function() {} },
    secondary: { label: 'Cancelar', onClick: function() {} }
  },
  tailPosition: 'top'
});`,
        differentPosition: `window.UBITS.Popover.create({
  targetElement: document.getElementById('target'),
  bodyContent: '<p>Contenido del popover</p>',
  tailPosition: 'bottom'
});`,
      },
      variants: {
        width: ['xs', 'sm', 'md', 'lg', 'xl'],
        tailPosition: ['top', 'bottom', 'left', 'right'],
        closeOnOutsideClick: [true, false],
      },
      events: {
        onClose: {
          type: 'Event',
          description: 'Emitted when popover is closed',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'feedback-popover--implementation',
        storiesByExample: {
          canonical: 'feedback-popover--implementation',
          basic: 'feedback-popover--default',
          withTitle: 'feedback-popover--with-title',
          withButtons: 'feedback-popover--with-buttons',
          differentPosition: 'feedback-popover--different-position',
        },
      },
      intents: {
        'popover.context': 'canonical',
        'popover.info': 'canonical',
        'popover.tooltip': 'canonical',
        'popover.with-title': 'withTitle',
        'popover.with-buttons': 'withButtons',
        'popover.position': 'differentPosition',
      },
    }),
  },
  args: {
    title: undefined,
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    footerButtons: undefined,
    closeOnOutsideClick: true,
    open: false,
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del popover (opcional).',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido HTML del cuerpo del popover.',
      table: {
        type: { summary: 'string | (() => string)' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Ancho del popover (sm: 240px, md: 360px, lg: 400px, xl: 480px).',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    tailPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tail (flecha) del popover.',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'top' },
        category: 'Apariencia',
      },
    },
    tailOffset: {
      control: { type: 'number' },
      description: 'Offset horizontal del tail desde el centro (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Apariencia',
      },
    },
    footerButtons: {
      control: { type: 'object' },
      description: 'Configuración de botones del footer.',
      table: {
        type: {
          summary: `{
  tertiary?: { label: string; onClick?: (event: MouseEvent) => void };
  secondary?: { label: string; onClick?: (event: MouseEvent) => void };
  primary?: { label: string; onClick?: (event: MouseEvent) => void };
}`,
        },
        category: 'Footer',
      },
    },
    closeOnOutsideClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic fuera',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback cuando se hace clic fuera del popover',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverOptions>;

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
    title: 'Información adicional',
    bodyContent: '<p>Este es el contenido del popover con información contextual.</p>',
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    footerButtons: {
      primary: {
        label: 'Aceptar',
        onClick: () => {
          console.log('Aceptar clickeado');
        },
      },
    },
    closeOnOutsideClick: true,
    open: true,
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `const popoverInstance = window.UBITS.Popover.create({
  title: 'Información adicional',
  bodyContent: '<p>Este es el contenido del popover con información contextual.</p>',
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  footerButtons: {
    primary: {
      label: 'Aceptar',
      onClick: () => {
        console.log('Aceptar clickeado');
      }
    }
  },
  closeOnOutsideClick: true,
  open: true
});`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-popover');
    container.setAttribute('data-ubits-component', 'Popover');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    // Crear popover directamente
    // Posicionar más abajo para evitar que se corte por arriba (especialmente con tailPosition: 'top')
    const popoverInstance = createPopover({
      ...args,
      position: {
        top: 200, // Más espacio desde arriba para evitar cortes
        left: window.innerWidth / 2, // Centrar horizontalmente
      },
    });

    if (args.open) {
      popoverInstance.open();
    }

    // Indicador
    const indicator = document.createElement('div');
    indicator.style.padding = '20px';
    indicator.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    indicator.textContent = 'Popover abierto (ver overlay)';
    container.appendChild(indicator);

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    title: 'Título del popover',
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    footerButtons: {
      tertiary: {
        label: 'Cancelar',
        onClick: () => console.log('Tertiary'),
      },
      primary: {
        label: 'Aceptar',
        onClick: () => console.log('Primary'),
      },
    },
    closeOnOutsideClick: true,
    open: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    const button = document.createElement('button');
    button.className = 'ubits-button ubits-button--primary ubits-button--md';
    button.innerHTML = '<span>Abrir Popover</span>';

    let popoverInstance: ReturnType<typeof createPopover> | null = null;

    button.addEventListener('click', () => {
      if (!popoverInstance) {
        popoverInstance = createPopover({
          ...args,
          referenceElement: button,
          onClose: () => {
            popoverInstance = null;
            button.style.display = 'flex';
          },
        });
        popoverInstance.open();
        button.style.display = 'none';
      }
    });

    container.appendChild(button);
    return container;
  },
};
