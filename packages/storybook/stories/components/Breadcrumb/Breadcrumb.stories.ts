import type { Meta, StoryObj } from '@storybook/html';
import { renderBreadcrumb, createBreadcrumb } from '../../../components/breadcrumb/src/BreadcrumbProvider';
import type {
  BreadcrumbOptions,
  BreadcrumbItem,
} from '../../../components/breadcrumb/src/types/BreadcrumbOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/breadcrumb/src/styles/breadcrumb.css';

/**
 * Breadcrumb Component Stories
 *
 * Componente de breadcrumb para navegación jerárquica.
 * El último item está en estado activo (bold) y los demás en estado default (regular).
 */
const meta = {
  title: 'Navegación/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Breadcrumb UBITS para navegación jerárquica. El último item muestra texto en bold (active), los demás en regular (default). Usa body-sm con tokens UBITS.

\`\`\`html
// 1. Crear contenedor HTML
<div id="breadcrumb-implementation-container"></div>

// 2. Crear Breadcrumb
window.UBITS.Breadcrumb.create({
  items: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'category', label: 'Categoría', url: '#category' },
    { id: 'subcategory', label: 'Subcategoría', url: '#subcategory' },
    { id: 'page', label: 'Página', url: '#page' },
    { id: 'detail', label: 'Detalle', active: true }
  ],
  separator: '>',
  onItemClick: (itemId, itemElement) => {
    console.log('Item clickeado:', itemId);
  }
}, 'breadcrumb-implementation-container');
\`\`\`',
      },
    },
    // ⭐ CONTRATO UBITS para Autorun
    ubits: createUBITSContract({
      componentId: '🧩-ux-breadcrumb',
      api: {
        create: 'window.UBITS.Breadcrumb.create',
        tag: '<ubits-breadcrumb>',
      },
      dependsOn: {
        required: [], // Breadcrumb no depende de otros componentes UBITS
        optional: [], // No tiene dependencias opcionales
      },
      internals: [], // Breadcrumb no tiene componentes internos privados
      slots: {}, // Breadcrumb no tiene slots
      tokensUsed: [
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-fg-disabled',
        '--modifiers-normal-color-light-feedback-accent-info',
        '--modifiers-normal-body-sm-regular-fontsize',
        '--modifiers-normal-body-sm-regular-lineheight',
        '--font-family-noto-sans-font-family',
        '--weight-regular',
        '--weight-bold',
        '--p-spacing-mode-1-sm',
        '--ubits-spacing-none',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['items'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.Breadcrumb.create(document.getElementById('breadcrumb-container'), {
  containerId: 'breadcrumb-container',
  items: [
    { id: 'home', label: 'Home', url: '/' },
    { id: 'section', label: 'Section', url: '/section' },
    { id: 'page', label: 'Page' }
  ],
  onItemClick: function(itemId) {}
});`,
        basic: `window.UBITS.Breadcrumb.create(document.getElementById('breadcrumb-container'), {
  containerId: 'breadcrumb-container',
  items: [
    { id: 'home', label: 'Home', url: '/' },
    { id: 'section', label: 'Section', url: '/section' },
    { id: 'page', label: 'Page' }
  ]
});`,
        withCustomSeparator: `window.UBITS.Breadcrumb.create(document.getElementById('breadcrumb-container'), {
  containerId: 'breadcrumb-container',
  items: [
    { id: 'home', label: 'Home', url: '/' },
    { id: 'section', label: 'Section', url: '/section' }
  ],
  separator: '/'
});`,
      },
      variants: {},
      events: {
        onItemClick: {
          type: 'Event',
          description: 'Emitted when a breadcrumb item is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'navegacion-breadcrumb--implementation',
        storiesByExample: {
          canonical: 'navegacion-breadcrumb--implementation',
          basic: 'navegacion-breadcrumb--default',
          withCustomSeparator: 'navegacion-breadcrumb--with-custom-separator',
        },
      },
      intents: {
        'breadcrumb.navigation': 'canonical',
        'breadcrumb.hierarchy': 'canonical',
        'breadcrumb.basic': 'canonical',
        'breadcrumb.separator': 'withCustomSeparator',
      },
    }),
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items del breadcrumb (requerido)',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    separator: {
      control: { type: 'text' },
      description: 'Separador entre items (por defecto: ">")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '">"' },
      },
    },
    onItemClick: {
      control: false,
      description: 'Callback cuando se hace click en un item',
      table: {
        type: { summary: '(itemId: string, itemElement: HTMLElement) => void' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales para el contenedor',
      table: {
        type: { summary: 'string' },
      },
    },
    itemCount: {
      control: { type: 'number', min: 2, max: 8, step: 1 },
      description: 'Número de items a mostrar (solo para controles)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
} satisfies Meta<BreadcrumbOptions & { itemCount?: number }>;

export default meta;
type Story = StoryObj<BreadcrumbOptions & { itemCount?: number }>;

/**
 * Helper para generar items de breadcrumb de ejemplo
 */
function generateBreadcrumbItems(count: number = 5): BreadcrumbItem[] {
  const labels = [
    'Home',
    'Categoría',
    'Subcategoría',
    'Página',
    'Detalle',
    'Elemento',
    'Vista',
    'Final',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    label: labels[i] || `Item ${i + 1}`,
    url: i < count - 1 ? `#${labels[i]?.toLowerCase() || `item-${i + 1}`}` : undefined,
    active: i === count - 1,
  }));
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#home' },
      { id: 'category', label: 'Categoría', url: '#category' },
      { id: 'subcategory', label: 'Subcategoría', url: '#subcategory' },
      { id: 'page', label: 'Página', url: '#page' },
      { id: 'detail', label: 'Detalle', active: true },
    ],
    separator: '>',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="breadcrumb-implementation-container"></div>

// 2. Crear Breadcrumb
window.UBITS.Breadcrumb.create({
  items: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'category', label: 'Categoría', url: '#category' },
    { id: 'subcategory', label: 'Subcategoría', url: '#subcategory' },
    { id: 'page', label: 'Página', url: '#page' },
    { id: 'detail', label: 'Detalle', active: true }
  ],
  separator: '>',
  onItemClick: (itemId, itemElement) => {
    console.log('Item clickeado:', itemId);
  }
}, 'breadcrumb-implementation-container');`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-breadcrumb');
    container.setAttribute('data-ubits-component', 'Breadcrumb');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.maxWidth = '1200px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '12px';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

    // Crear contenedor interno para el Breadcrumb
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.id = 'breadcrumb-implementation-container';
    breadcrumbContainer.style.width = '100%';
    container.appendChild(breadcrumbContainer);

    // Crear Breadcrumb
    try {
      createBreadcrumb(
        {
          items: args.items || [],
          separator: args.separator || '>',
          onItemClick: args.onItemClick,
          className: args.className,
        },
        breadcrumbContainer.id,
      );
    } catch (error) {
      console.error('Error creando Breadcrumb:', error);
      breadcrumbContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
    }

    return container;
  },
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    items: generateBreadcrumbItems(5),
    separator: '>',
    itemCount: 5,
  },
  render: (args) => {
    // Generar items según los controles
    const items = generateBreadcrumbItems(args.itemCount || 5);

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    // Contenedor para el Breadcrumb
    const container = document.createElement('div');
    container.id = 'breadcrumb-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'breadcrumb-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeItem = items[items.length - 1];

    const updateInfoPanel = () => {
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Breadcrumb</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Item Activo:</strong> ${activeItem ? activeItem.label : 'N/A'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Items totales:</strong> ${items.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Separador:</strong> "${args.separator || '>'}"</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${items.map((i) => i.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel();
    wrapper.appendChild(infoPanel);

    // Crear el Breadcrumb usando createBreadcrumb para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';

        // Crear breadcrumb con listeners
        createBreadcrumb(
          {
            items: items,
            separator: args.separator || '>',
            onItemClick: (itemId, itemElement) => {
              // Item clickeado
              // Actualizar panel de información si es necesario
              updateInfoPanel();
            },
          },
          container.id,
        );
      } catch (error) {
        console.error('Error creando Breadcrumb:', error);
        container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  },
};
