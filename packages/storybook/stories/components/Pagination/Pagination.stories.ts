/**
 * Pagination Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
  createPagination,
  renderPagination,
} from '../../../components/pagination/src/PaginationProvider';
import type { PaginationOptions } from '../../../components/pagination/src/types/PaginationOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/pagination/src/styles/pagination.css';
import '../../../components/button/src/styles/button.css';
import '../../../components/input/src/styles/input.css';

const meta: Meta<PaginationOptions> = {
  title: 'Data/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Pagination UBITS para paginación de datos usando tokens UBITS, tipografía UBITS y componentes UBITS. Ideal para tablas y listas de datos.

\`\`\`html
// 1. Crear contenedor HTML
<div id="pagination-implementation-container"></div>

// 2. Crear paginación
window.UBITS.Pagination.create({
  containerId: 'pagination-implementation-container',
  currentPage: 1,
  totalPages: 10,
  variant: 'default',
  size: 'md',
  maxVisiblePages: 7,
  showFirst: true,
  showLast: true,
  showPrevNext: true,
  showInfo: false,
  showItemsPerPage: false
});
\`\`\`',
      },
    },
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-pagination',
      api: {
        create: 'window.UBITS.Pagination.create',
        tag: '<ubits-pagination>',
      },
      dependsOn: {
        required: ['🧩-ux-button'], // Botones de navegación son requeridos
        optional: ['🧩-ux-input'], // Selector de items por página es opcional
      },
      internals: [], // Pagination no tiene componentes internos privados
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: ['totalPages'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.Pagination.create(document.getElementById('pagination-container'), {
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 10,
  variant: 'default',
  size: 'md'
});`,
        basic: `window.UBITS.Pagination.create(document.getElementById('pagination-container'), {
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 10,
  variant: 'default',
  size: 'md'
});`,
        compact: `window.UBITS.Pagination.create(document.getElementById('pagination-container'), {
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 10,
  variant: 'compact',
  size: 'md'
});`,
        withInfo: `window.UBITS.Pagination.create(document.getElementById('pagination-container'), {
  containerId: 'pagination-container',
  currentPage: 1,
  totalPages: 10,
  totalItems: 100,
  itemsPerPage: 10,
  showInfo: true,
  variant: 'default',
  size: 'md'
});`,
      },
      slots: {},
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'data-pagination--implementation',
        storiesByExample: {
          canonical: 'data-pagination--implementation',
          basic: 'data-pagination--default',
          compact: 'data-pagination--compact',
          withInfo: 'data-pagination--with-info',
        },
      },
      intents: {
        'pagination': 'canonical',
        'pagination.navigate': 'canonical',
        'pagination.compact': 'compact',
        'pagination.with-info': 'withInfo',
      },
      variants: {
        variant: ['default', 'compact', 'minimal'],
        size: ['sm', 'md', 'lg'],
        showFirst: [true, false],
        showLast: [true, false],
        showPrevNext: [true, false],
        showInfo: [true, false],
        showItemsPerPage: [true, false],
      },
      events: {
        onPageChange: {
          type: 'Event',
          description: 'Emitted when page changes',
        },
      },
    }),
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: undefined,
    itemsPerPage: undefined,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false,
    className: '',
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Página actual (1-indexed)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Configuración',
      },
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total de páginas (requerido)',
      table: {
        type: { summary: 'number' },
        category: 'Configuración',
      },
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total de items (opcional, para mostrar información)',
      table: {
        type: { summary: 'number' },
        category: 'Configuración',
      },
    },
    itemsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Items por página (opcional, para mostrar información)',
      table: {
        type: { summary: 'number' },
        category: 'Configuración',
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal'],
      description: 'Variante visual del paginador',
      table: {
        type: { summary: 'default | compact | minimal' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del paginador',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 15 },
      description: 'Número máximo de páginas visibles',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '7' },
        category: 'Configuración',
      },
    },
    showFirst: {
      control: { type: 'boolean' },
      description: 'Mostrar botón "Primera página"',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Controles',
      },
    },
    showLast: {
      control: { type: 'boolean' },
      description: 'Mostrar botón "Última página"',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Controles',
      },
    },
    showPrevNext: {
      control: { type: 'boolean' },
      description: 'Mostrar botones anterior/siguiente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Controles',
      },
    },
    showInfo: {
      control: { type: 'boolean' },
      description: 'Mostrar información de items (ej: "1-10 de 100")',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Información',
      },
    },
    showItemsPerPage: {
      control: { type: 'boolean' },
      description: 'Mostrar selector de items por página',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Información',
      },
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback cuando cambia la página',
      table: {
        disable: true,
      },
    },
    onItemsPerPageChange: {
      action: 'items-per-page-changed',
      description: 'Callback cuando cambia items por página',
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
type Story = StoryObj<PaginationOptions>;

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
    currentPage: 1,
    totalPages: 10,
    totalItems: undefined,
    itemsPerPage: undefined,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false,
    className: '',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="pagination-implementation-container"></div>

// 2. Crear paginación
window.UBITS.Pagination.create({
  containerId: 'pagination-implementation-container',
  currentPage: 1,
  totalPages: 10,
  variant: 'default',
  size: 'md',
  maxVisiblePages: 7,
  showFirst: true,
  showLast: true,
  showPrevNext: true,
  showInfo: false,
  showItemsPerPage: false
});`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-pagination');
    container.setAttribute('data-ubits-component', 'Pagination');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';

    // Crear contenedor para la paginación
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination-implementation-container';
    paginationContainer.style.width = '100%';
    container.appendChild(paginationContainer);

    // Mantener referencia al estado actual
    let currentPageState = args.currentPage || 1;
    let currentItemsPerPageState = args.itemsPerPage || 10;

    const updatePagination = () => {
      // Verificar que el contenedor esté en el DOM
      if (!paginationContainer.parentElement) {
        // Si aún no está en el DOM, esperar un poco más
        setTimeout(() => {
          updatePagination();
        }, 50);
        return;
      }

      try {
        const paginationElement = createPagination({
          ...args,
          currentPage: currentPageState,
          itemsPerPage: currentItemsPerPageState,
          containerId: paginationContainer.id,
          onPageChange: (page) => {
            console.log('[Pagination Story] Página cambiada a:', page);
            currentPageState = page;
            // Actualizar el componente
            setTimeout(() => {
              updatePagination();
            }, 10);
          },
          onItemsPerPageChange: (itemsPerPage) => {
            console.log('[Pagination Story] Items por página cambiados a:', itemsPerPage);
            currentItemsPerPageState = itemsPerPage;
            currentPageState = 1; // Reset a página 1
            // Actualizar el componente
            setTimeout(() => {
              updatePagination();
            }, 10);
          },
        });
      } catch (error) {
        console.error('Error creating pagination:', error);
      }
    };

    // Crear paginación después de que el DOM esté listo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePagination();
      });
    });

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: undefined,
    itemsPerPage: undefined,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';

    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination-container';
    paginationContainer.style.width = '100%';
    container.appendChild(paginationContainer);

    // Mantener referencia al estado actual
    let currentPageState = args.currentPage || 1;
    let currentItemsPerPageState = args.itemsPerPage || 10;

    const updatePagination = () => {
      // Verificar que el contenedor esté en el DOM
      if (!paginationContainer.parentElement) {
        // Si aún no está en el DOM, esperar un poco más
        setTimeout(() => {
          updatePagination();
        }, 50);
        return;
      }

      const paginationElement = createPagination({
        ...args,
        currentPage: currentPageState,
        itemsPerPage: currentItemsPerPageState,
        containerId: paginationContainer.id,
        onPageChange: (page) => {
          console.log('[Pagination Story] Página cambiada a:', page);
          currentPageState = page;
          // Actualizar el componente
          setTimeout(() => {
            updatePagination();
          }, 10);
        },
        onItemsPerPageChange: (itemsPerPage) => {
          console.log('[Pagination Story] Items por página cambiados a:', itemsPerPage);
          currentItemsPerPageState = itemsPerPage;
          currentPageState = 1; // Reset a página 1
          // Actualizar el componente
          setTimeout(() => {
            updatePagination();
          }, 10);
        },
      });
    };

    // Esperar a que el contenedor esté en el DOM antes de inicializar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePagination();
      });
    });

    return container;
  },
};
