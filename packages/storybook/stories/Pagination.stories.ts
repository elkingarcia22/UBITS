import type { Meta, StoryObj } from '@storybook/html';
import { createPagination, renderPagination } from '../../components/pagination/src/PaginationProvider';
import type { PaginationOptions } from '../../components/pagination/src/types/PaginationOptions';
import { createUBITSContract } from './_shared/ubitsContract';
import '../../components/pagination/src/styles/pagination.css';
import '../../components/button/src/styles/button.css';
import '../../components/list/src/styles/list.css';

const meta: Meta<PaginationOptions> = {
  title: 'Data/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Pagination UBITS para paginación de datos usando tokens UBITS, tipografía UBITS y componentes UBITS. Ideal para tablas y listas de datos.'
      }
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
        optional: ['🧩-ux-list'], // Selector de items por página usa List
      },
      internals: [],
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: ['containerId', 'currentPage', 'totalPages'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: 'window.UBITS.Pagination.create(document.getElementById(\'pagination-container\'), {\\n  containerId: \'pagination-container\',\\n  currentPage: 1,\\n  totalPages: 10,\\n  onPageChange: function(page) {}\\n});',
        basic: 'window.UBITS.Pagination.create(document.getElementById(\'pagination-container\'), {\\n  containerId: \'pagination-container\',\\n  currentPage: 1,\\n  totalPages: 10\\n});',
        withInfo: 'window.UBITS.Pagination.create(document.getElementById(\'pagination-container\'), {\\n  containerId: \'pagination-container\',\\n  currentPage: 1,\\n  totalPages: 10,\\n  showInfo: true,\\n  totalItems: 100\\n});',
        compact: 'window.UBITS.Pagination.create(document.getElementById(\'pagination-container\'), {\\n  containerId: \'pagination-container\',\\n  currentPage: 1,\\n  totalPages: 10,\\n  variant: \'compact\'\\n});',
      },
      variants: {
        variant: ['default', 'compact', 'minimal'],
        size: ['sm', 'md', 'lg'],
        showInfo: [true, false],
        showItemsPerPage: [true, false],
      },
      events: {
        onPageChange: {
          type: 'Event',
          description: 'Emitted when page changes',
          payload: {
            page: 'number',
          },
        },
        onItemsPerPageChange: {
          type: 'Event',
          description: 'Emitted when items per page changes',
          payload: {
            itemsPerPage: 'number',
          },
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'data-pagination--default',
        storiesByExample: {
          canonical: 'data-pagination--default',
          basic: 'data-pagination--default',
          withInfo: 'data-pagination--show-info',
          compact: 'data-pagination--variant-compact',
        },
      },
      intents: {
        'pagination.navigation': 'canonical',
        'pagination.table': 'canonical',
        'pagination.basic': 'canonical',
        'pagination.with-info': 'withInfo',
        'pagination.compact': 'compact',
      },
    }),
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Página actual (1-indexed)',
      table: {
        defaultValue: { summary: '1' }
}
},
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total de páginas',
      table: {
        defaultValue: { summary: '10' }
}
},
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total de items (para mostrar información)',
      table: {
        defaultValue: { summary: 'undefined' }
}
},
    itemsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Items por página',
      table: {
        defaultValue: { summary: 'undefined' }
}
},
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal'],
      description: 'Variante visual del paginador',
      table: {
        defaultValue: { summary: 'default' }
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del paginador',
      table: {
        defaultValue: { summary: 'md' }
}
},
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 15 },
      description: 'Número máximo de páginas visibles',
      table: {
        defaultValue: { summary: '7' }
}
},
    showFirst: {
      control: 'boolean',
      description: 'Mostrar botón "Primera página"',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showLast: {
      control: 'boolean',
      description: 'Mostrar botón "Última página"',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showPrevNext: {
      control: 'boolean',
      description: 'Mostrar botones anterior/siguiente',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showInfo: {
      control: 'boolean',
      description: 'Mostrar información de items (ej: "1-10 de 100")',
      table: {
        defaultValue: { summary: 'false' }
}
},
    showItemsPerPage: {
      control: 'boolean',
      description: 'Mostrar selector de items por página',
      table: {
        defaultValue: { summary: 'false' }
}
}
}
};

export default meta;
type Story = StoryObj<PaginationOptions>;

export const Default: Story = {
  render: (args) => {
    const containerId = 'pagination-${Date.now()}';
    const container = document.createElement('div');
    container.id = containerId;
    container.style.width = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';

    // Mantener referencia al estado actual
    let currentPageState = args.currentPage || 1;
    let currentItemsPerPageState = args.itemsPerPage || 10;

    const updatePagination = () => {
      // Usar el contenedor directamente en lugar de buscarlo por ID
      // Esto evita problemas cuando el contenedor aún no está en el DOM
      if (!container || !container.parentElement) {
        // Si el contenedor no tiene parent, aún no está en el DOM
        // Esperar un poco más
        setTimeout(() => {
          updatePagination();
        }, 50);
        return;
      }

      // Asegurar que el ID esté establecido
      if (!container.id) {
        container.id = containerId;
      }

      const options: PaginationOptions = {
        ...args,
        currentPage: currentPageState,
        itemsPerPage: currentItemsPerPageState,
        containerId: container.id, // Usar el ID del contenedor
        onPageChange: (page) => {
          console.log('[Pagination Story] Página cambiada a:', page);
          currentPageState = page;
          // Actualizar el componente después de un pequeño delay
          setTimeout(() => {
            updatePagination();
          }, 10);
        },
        onItemsPerPageChange: (itemsPerPage) => {
          console.log('[Pagination Story] Items por página cambiados a:', itemsPerPage);
          currentItemsPerPageState = itemsPerPage;
          currentPageState = 1; // Reset a página 1 cuando cambia items por página
          // Actualizar el componente después de un pequeño delay
          setTimeout(() => {
            updatePagination();
          }, 10);
        }
      };
      
      const result = createPagination(options);
      if (!result) {
        console.error('[Pagination Story] Error al crear paginación');
      }
    };

    // Esperar a que el contenedor esté en el DOM antes de inicializar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Verificar que el contenedor esté en el DOM
        if (container.parentElement || document.body.contains(container)) {
          updatePagination();
        } else {
          // Si aún no está en el DOM, esperar un poco más
          setTimeout(() => {
            updatePagination();
          }, 100);
        }
      });
    });

    return container;
  },
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  }
};

// Helper para renderizar Pagination de manera consistente
function renderPaginationStory(options: PaginationOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  `;

  const paginationContainer = document.createElement('div');
  paginationContainer.id = `pagination-${Date.now()}`;
  paginationContainer.style.cssText = `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const paginationHTML = renderPagination(options);
  paginationContainer.innerHTML = paginationHTML;

  // Agregar event listeners para botones de página
  const pageButtons = paginationContainer.querySelectorAll('.ubits-pagination__page-button');
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = parseInt(button.textContent || '1');
      if (options.onPageChange) {
        options.onPageChange(page);
        // Actualizar el componente
        const newOptions = { ...options, currentPage: page };
        paginationContainer.innerHTML = renderPagination(newOptions);
        // Re-agregar listeners
        const newPageButtons = paginationContainer.querySelectorAll('.ubits-pagination__page-button');
        newPageButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            const newPage = parseInt(btn.textContent || '1');
            if (options.onPageChange) {
              options.onPageChange(newPage);
              const updatedOptions = { ...options, currentPage: newPage };
              paginationContainer.innerHTML = renderPagination(updatedOptions);
            }
          });
        });
      }
    });
  });

  // Agregar event listeners para botones de navegación
  const navButtons = paginationContainer.querySelectorAll('.ubits-pagination__nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action');
      const currentPage = options.currentPage || 1;
      let newPage = currentPage;

      if (action === 'first') {
        newPage = 1;
      } else if (action === 'last') {
        newPage = options.totalPages;
      } else if (action === 'prev') {
        newPage = Math.max(1, currentPage - 1);
      } else if (action === 'next') {
        newPage = Math.min(options.totalPages, currentPage + 1);
      }

      if (options.onPageChange && newPage !== currentPage) {
        options.onPageChange(newPage);
        const newOptions = { ...options, currentPage: newPage };
        paginationContainer.innerHTML = renderPagination(newOptions);
      }
    });
  });

  // Agregar event listener para selector de items por página
  const itemsPerPageSelect = paginationContainer.querySelector('select');
  if (itemsPerPageSelect && options.onItemsPerPageChange) {
    itemsPerPageSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const newItemsPerPage = parseInt(target.value);
      if (options.onItemsPerPageChange) {
        options.onItemsPerPageChange(newItemsPerPage);
        const newOptions = { ...options, itemsPerPage: newItemsPerPage, currentPage: 1 };
        paginationContainer.innerHTML = renderPagination(newOptions);
      }
    });
  }

  container.appendChild(paginationContainer);
  return container;
}

/**
 * VariantDefault
 * Variante default
 */
export const VariantDefault: Story = {
  name: 'Variant - Default',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con variante default (muestra todas las páginas visibles).',
      },
    },
  },
};

/**
 * VariantCompact
 * Variante compact
 */
export const VariantCompact: Story = {
  name: 'Variant - Compact',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'compact',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con variante compact (versión más compacta).',
      },
    },
  },
};

/**
 * VariantMinimal
 * Variante minimal
 */
export const VariantMinimal: Story = {
  name: 'Variant - Minimal',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'minimal',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con variante minimal (versión mínima).',
      },
    },
  },
};

/**
 * SizeSM
 * Tamaño sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'sm',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con tamaño sm.',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño md (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con tamaño md (default).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño lg
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'lg',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con tamaño lg.',
      },
    },
  },
};

/**
 * CurrentPage1
 * Página actual 1 (primera página)
 */
export const CurrentPage1: Story = {
  name: 'Current Page - First',
  args: {
    currentPage: 1,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination en la primera página (página 1).',
      },
    },
  },
};

/**
 * CurrentPageMiddle
 * Página actual en el medio
 */
export const CurrentPageMiddle: Story = {
  name: 'Current Page - Middle',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination en una página del medio (página 10 de 20).',
      },
    },
  },
};

/**
 * CurrentPageLast
 * Página actual última
 */
export const CurrentPageLast: Story = {
  name: 'Current Page - Last',
  args: {
    currentPage: 20,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination en la última página (página 20 de 20).',
      },
    },
  },
};

/**
 * FewPages
 * Pocas páginas (menos que maxVisiblePages)
 */
export const FewPages: Story = {
  name: 'Few Pages',
  args: {
    currentPage: 2,
    totalPages: 5,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con pocas páginas (5 páginas, todas visibles).',
      },
    },
  },
};

/**
 * ManyPages
 * Muchas páginas (más que maxVisiblePages)
 */
export const ManyPages: Story = {
  name: 'Many Pages',
  args: {
    currentPage: 50,
    totalPages: 100,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con muchas páginas (100 páginas, solo 7 visibles).',
      },
    },
  },
};

/**
 * ShowFirst
 * Con botón Primera
 */
export const ShowFirst: Story = {
  name: 'Show First Button',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con botón "Primera página" visible.',
      },
    },
  },
};

/**
 * HideFirst
 * Sin botón Primera
 */
export const HideFirst: Story = {
  name: 'Hide First Button',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: false,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination sin botón "Primera página".',
      },
    },
  },
};

/**
 * ShowLast
 * Con botón Última
 */
export const ShowLast: Story = {
  name: 'Show Last Button',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con botón "Última página" visible.',
      },
    },
  },
};

/**
 * HideLast
 * Sin botón Última
 */
export const HideLast: Story = {
  name: 'Hide Last Button',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: false,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination sin botón "Última página".',
      },
    },
  },
};

/**
 * ShowPrevNext
 * Con botones Anterior/Siguiente
 */
export const ShowPrevNext: Story = {
  name: 'Show Prev/Next Buttons',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con botones "Anterior" y "Siguiente" visibles.',
      },
    },
  },
};

/**
 * HidePrevNext
 * Sin botones Anterior/Siguiente
 */
export const HidePrevNext: Story = {
  name: 'Hide Prev/Next Buttons',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: false,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination sin botones "Anterior" y "Siguiente".',
      },
    },
  },
};

/**
 * ShowInfo
 * Con información de items
 */
export const ShowInfo: Story = {
  name: 'Show Info',
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con información de items visible (ej: "1-10 de 200 items").',
      },
    },
  },
};

/**
 * HideInfo
 * Sin información de items
 */
export const HideInfo: Story = {
  name: 'Hide Info',
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination sin información de items.',
      },
    },
  },
};

/**
 * ShowItemsPerPage
 * Con selector de items por página
 */
export const ShowItemsPerPage: Story = {
  name: 'Show Items Per Page',
  args: {
    currentPage: 1,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100]
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con selector de items por página visible.',
      },
    },
  },
};

/**
 * HideItemsPerPage
 * Sin selector de items por página
 */
export const HideItemsPerPage: Story = {
  name: 'Hide Items Per Page',
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: false,
    itemsPerPageOptions: [10, 20, 50, 100]
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination sin selector de items por página.',
      },
    },
  },
};

/**
 * CustomItemsPerPageOptions
 * Opciones personalizadas de items por página
 */
export const CustomItemsPerPageOptions: Story = {
  name: 'Custom Items Per Page Options',
  args: {
    currentPage: 1,
    totalPages: 50,
    totalItems: 500,
    itemsPerPage: 5,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [5, 10, 25, 50, 100, 200]
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con opciones personalizadas de items por página (5, 10, 25, 50, 100, 200).',
      },
    },
  },
};

/**
 * MaxVisiblePages3
 * Máximo 3 páginas visibles
 */
export const MaxVisiblePages3: Story = {
  name: 'Max Visible Pages - 3',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 3,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con máximo 3 páginas visibles.',
      },
    },
  },
};

/**
 * MaxVisiblePages5
 * Máximo 5 páginas visibles
 */
export const MaxVisiblePages5: Story = {
  name: 'Max Visible Pages - 5',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 5,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con máximo 5 páginas visibles.',
      },
    },
  },
};

/**
 * MaxVisiblePages10
 * Máximo 10 páginas visibles
 */
export const MaxVisiblePages10: Story = {
  name: 'Max Visible Pages - 10',
  args: {
    currentPage: 10,
    totalPages: 50,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 10,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con máximo 10 páginas visibles.',
      },
    },
  },
};

/**
 * OnPageChangeCallback
 * Callback onPageChange
 */
export const OnPageChangeCallback: Story = {
  name: 'On Page Change Callback',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false,
    onPageChange: (page) => {
      console.log('Página cambiada a:', page);
      alert(`Página cambiada a: ${page}`);
    }
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con callback onPageChange cuando cambia la página.',
      },
    },
  },
};

/**
 * OnItemsPerPageChangeCallback
 * Callback onItemsPerPageChange
 */
export const OnItemsPerPageChangeCallback: Story = {
  name: 'On Items Per Page Change Callback',
  args: {
    currentPage: 1,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100],
    onItemsPerPageChange: (itemsPerPage) => {
      console.log('Items por página cambiados a:', itemsPerPage);
      alert(`Items por página cambiados a: ${itemsPerPage}`);
    }
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con callback onItemsPerPageChange cuando cambia items por página.',
      },
    },
  },
};

/**
 * CustomLabels
 * Labels personalizados
 */
export const CustomLabels: Story = {
  name: 'Custom Labels',
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100],
    labels: {
      first: 'Primero',
      last: 'Último',
      previous: 'Atrás',
      next: 'Adelante',
      page: 'Pág',
      of: 'de',
      items: 'elementos',
      itemsPerPage: 'Por página'
    }
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination con labels personalizados para todos los textos.',
      },
    },
  },
};

/**
 * AllVariants
 * Todas las variantes
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 32px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      align-items: center;
      justify-content: center;
    `;

    ['default', 'compact', 'minimal'].forEach((variant) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%; display: flex; flex-direction: column; gap: 8px; align-items: center;';
      
      const label = document.createElement('div');
      label.textContent = `Variant: ${variant}`;
      label.style.cssText = 'font-weight: bold; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); margin-bottom: 8px;';
      wrapper.appendChild(label);

      const paginationContainer = document.createElement('div');
      paginationContainer.id = `pagination-${variant}-${Date.now()}`;
      paginationContainer.style.cssText = 'width: 100%; display: flex; justify-content: center;';
      
      const paginationHTML = renderPagination({
        ...args,
        variant: variant as 'default' | 'compact' | 'minimal'
      });
      paginationContainer.innerHTML = paginationHTML;
      
      wrapper.appendChild(paginationContainer);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination en todas las variantes disponibles (default, compact, minimal).',
      },
    },
  },
};

/**
 * AllSizes
 * Todos los tamaños
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 32px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      align-items: center;
      justify-content: center;
    `;

    ['sm', 'md', 'lg'].forEach((size) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%; display: flex; flex-direction: column; gap: 8px; align-items: center;';
      
      const label = document.createElement('div');
      label.textContent = `Size: ${size.toUpperCase()}`;
      label.style.cssText = 'font-weight: bold; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); margin-bottom: 8px;';
      wrapper.appendChild(label);

      const paginationContainer = document.createElement('div');
      paginationContainer.id = `pagination-${size}-${Date.now()}`;
      paginationContainer.style.cssText = 'width: 100%; display: flex; justify-content: center;';
      
      const paginationHTML = renderPagination({
        ...args,
        size: size as 'sm' | 'md' | 'lg'
      });
      paginationContainer.innerHTML = paginationHTML;
      
      wrapper.appendChild(paginationContainer);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination en todos los tamaños disponibles (sm, md, lg).',
      },
    },
  },
};

/**
 * CompleteExample
 * Ejemplo completo
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: true,
    showLast: true,
    showPrevNext: true,
    showInfo: true,
    showItemsPerPage: true,
    itemsPerPageOptions: [10, 20, 50, 100],
    onPageChange: (page) => {
      console.log('Página cambiada a:', page);
    },
    onItemsPerPageChange: (itemsPerPage) => {
      console.log('Items por página cambiados a:', itemsPerPage);
    }
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination completo con todas las opciones habilitadas: información de items, selector de items por página, y callbacks.',
      },
    },
  },
};

/**
 * MinimalExample
 * Ejemplo mínimo
 */
export const MinimalExample: Story = {
  name: 'Minimal Example',
  args: {
    currentPage: 1,
    totalPages: 5,
    variant: 'default',
    size: 'md',
    maxVisiblePages: 7,
    showFirst: false,
    showLast: false,
    showPrevNext: true,
    showInfo: false,
    showItemsPerPage: false
  },
  render: (args) => {
    return renderPaginationStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination mínimo con solo las opciones esenciales (botones Anterior/Siguiente y páginas).',
      },
    },
  },
};
