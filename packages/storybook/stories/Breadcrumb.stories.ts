import type { Meta, StoryObj } from '@storybook/html';
import { renderBreadcrumb, createBreadcrumb } from '../../components/breadcrumb/src/BreadcrumbProvider';
import type { BreadcrumbOptions, BreadcrumbItem } from '../../components/breadcrumb/src/types/BreadcrumbOptions';
import '../../components/breadcrumb/src/styles/breadcrumb.css';

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
      description: {
        component: `Componente Breadcrumb UBITS para navegación jerárquica. El último item muestra texto en bold (active), los demás en regular (default). Usa body-sm con tokens UBITS.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items del breadcrumb',
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
    itemCount: {
      control: { type: 'number', min: 2, max: 8, step: 1 },
      description: 'Número de items a mostrar',
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
  const labels = ['Home', 'Categoría', 'Subcategoría', 'Página', 'Detalle', 'Elemento', 'Vista', 'Final'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: 'item-${i + 1}',
    label: labels[i] || 'Item ${i + 1}',
    url: i < count - 1 ? `#${labels[i]?.toLowerCase() || `item-${i + 1}`}` : undefined,
    active: i === count - 1,
  }));
}

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
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${items.map(i => i.id).join(', ')}</div>
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
        createBreadcrumb({
          items: items,
          separator: args.separator || '>',
          onItemClick: (itemId, itemElement) => {
            // Item clickeado
            // Actualizar panel de información si es necesario
            updateInfoPanel();
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Breadcrumb:', error);
        container.innerHTML = `<p style="color: #ef4444); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

// Helper para renderizar Breadcrumb de manera consistente
function renderBreadcrumbStory(options: BreadcrumbOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `;
  
  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.id = `breadcrumb-container-${Date.now()}`;
  
  container.appendChild(breadcrumbContainer);
  
  // Crear breadcrumb con listeners
  requestAnimationFrame(() => {
    createBreadcrumb(options, breadcrumbContainer.id);
  });
  
  return container;
}

/**
 * BasicBreadcrumb
 * Breadcrumb básico con 3 items
 */
export const BasicBreadcrumb: Story = {
  name: 'Basic Breadcrumb',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb básico con 3 items.',
      },
    },
  },
};

/**
 * LongBreadcrumb
 * Breadcrumb largo con 8 items
 */
export const LongBreadcrumb: Story = {
  name: 'Long Breadcrumb',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'subcategory', label: 'Subcategoría', url: '#' },
      { id: 'page', label: 'Página', url: '#' },
      { id: 'detail', label: 'Detalle', url: '#' },
      { id: 'element', label: 'Elemento', url: '#' },
      { id: 'view', label: 'Vista', url: '#' },
      { id: 'final', label: 'Final' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb largo con 8 items.',
      },
    },
  },
};

/**
 * ShortBreadcrumb
 * Breadcrumb corto con 2 items
 */
export const ShortBreadcrumb: Story = {
  name: 'Short Breadcrumb',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb corto con 2 items.',
      },
    },
  },
};

/**
 * WithURLs
 * Breadcrumb con items que tienen URLs
 */
export const WithURLs: Story = {
  name: 'With URLs',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#home' },
      { id: 'category', label: 'Categoría', url: '#category' },
      { id: 'subcategory', label: 'Subcategoría', url: '#subcategory' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con items que tienen URLs (navegación).',
      },
    },
  },
};

/**
 * WithoutURLs
 * Breadcrumb con items sin URLs (solo onClick)
 */
export const WithoutURLs: Story = {
  name: 'Without URLs',
  args: {
    items: [
      { id: 'home', label: 'Home', onClick: () => alert('Click en Home') },
      { id: 'category', label: 'Categoría', onClick: () => alert('Click en Categoría') },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con items sin URLs, usando callbacks onClick.',
      },
    },
  },
};

/**
 * WithOnClick
 * Breadcrumb con callbacks onClick en items
 */
export const WithOnClick: Story = {
  name: 'With OnClick',
  args: {
    items: [
      { id: 'home', label: 'Home', onClick: () => console.log('Home clicked') },
      { id: 'category', label: 'Categoría', onClick: () => console.log('Category clicked') },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con callbacks onClick en items.',
      },
    },
  },
};

/**
 * WithoutOnClick
 * Breadcrumb sin callbacks onClick
 */
export const WithoutOnClick: Story = {
  name: 'Without OnClick',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb sin callbacks onClick, solo con URLs.',
      },
    },
  },
};

/**
 * WithDisabledItem
 * Breadcrumb con un item deshabilitado
 */
export const WithDisabledItem: Story = {
  name: 'With Disabled Item',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#', disabled: true },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con un item deshabilitado.',
      },
    },
  },
};

/**
 * AllItemsDisabled
 * Breadcrumb con todos los items deshabilitados (excepto el activo)
 */
export const AllItemsDisabled: Story = {
  name: 'All Items Disabled',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#', disabled: true },
      { id: 'category', label: 'Categoría', url: '#', disabled: true },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con todos los items deshabilitados (excepto el activo).',
      },
    },
  },
};

/**
 * SeparatorDefault
 * Separador por defecto (>)
 */
export const SeparatorDefault: Story = {
  name: 'Separator - Default (>)',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con separador por defecto (>).',
      },
    },
  },
};

/**
 * SeparatorSlash
 * Separador slash (/)
 */
export const SeparatorSlash: Story = {
  name: 'Separator - Slash (/)',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '/',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con separador slash (/).',
      },
    },
  },
};

/**
 * SeparatorArrow
 * Separador flecha (→)
 */
export const SeparatorArrow: Story = {
  name: 'Separator - Arrow (→)',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '→',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con separador flecha (→).',
      },
    },
  },
};

/**
 * SeparatorCustom
 * Separador personalizado (ej: •)
 */
export const SeparatorCustom: Story = {
  name: 'Separator - Custom (•)',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '•',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con separador personalizado (•).',
      },
    },
  },
};

/**
 * SingleItem
 * Breadcrumb con un solo item
 */
export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [
      { id: 'home', label: 'Home' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con un solo item (activo).',
      },
    },
  },
};

/**
 * MultipleItems
 * Breadcrumb con múltiples items
 */
export const MultipleItems: Story = {
  name: 'Multiple Items',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'subcategory', label: 'Subcategoría', url: '#' },
      { id: 'page', label: 'Página', url: '#' },
      { id: 'detail', label: 'Detalle' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con múltiples items (5 items).',
      },
    },
  },
};

/**
 * OnItemClickCallback
 * Callback cuando se hace click en un item
 */
export const OnItemClickCallback: Story = {
  name: 'On Item Click Callback',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
    onItemClick: (itemId, itemElement) => {
      alert(`Click en item: ${itemId}`);
    },
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con callback onItemClick cuando se hace click en un item.',
      },
    },
  },
};

/**
 * ItemWithURL
 * Item con URL (navegación)
 */
export const ItemWithURL: Story = {
  name: 'Item - With URL',
  args: {
    items: [
      { id: 'home', label: 'Home', url: 'https://example.com' },
      { id: 'category', label: 'Categoría', url: 'https://example.com/category' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con items que tienen URLs (navegación).',
      },
    },
  },
};

/**
 * ItemWithOnClick
 * Item con onClick (callback)
 */
export const ItemWithOnClick: Story = {
  name: 'Item - With OnClick',
  args: {
    items: [
      { id: 'home', label: 'Home', onClick: () => alert('Home clicked') },
      { id: 'category', label: 'Categoría', onClick: () => alert('Category clicked') },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con items que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * ItemActive
 * Item activo (último item)
 */
export const ItemActive: Story = {
  name: 'Item - Active',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb mostrando el item activo (último item, siempre en bold).',
      },
    },
  },
};

/**
 * ItemDisabled
 * Item deshabilitado
 */
export const ItemDisabled: Story = {
  name: 'Item - Disabled',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#', disabled: true },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con item deshabilitado (no clickeable).',
      },
    },
  },
};

/**
 * MixedItems
 * Breadcrumb con items mixtos (algunos con URL, algunos con onClick)
 */
export const MixedItems: Story = {
  name: 'Mixed Items',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', onClick: () => alert('Category clicked') },
      { id: 'subcategory', label: 'Subcategoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con items mixtos (algunos con URL, algunos con onClick).',
      },
    },
  },
};

/**
 * LongLabels
 * Breadcrumb con labels largos
 */
export const LongLabels: Story = {
  name: 'Long Labels',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría muy larga con mucho texto', url: '#' },
      { id: 'page', label: 'Página de ejemplo con nombre extenso' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con labels largos.',
      },
    },
  },
};

/**
 * ShortLabels
 * Breadcrumb con labels cortos
 */
export const ShortLabels: Story = {
  name: 'Short Labels',
  args: {
    items: [
      { id: 'home', label: 'H', url: '#' },
      { id: 'cat', label: 'Cat', url: '#' },
      { id: 'pg', label: 'Pg' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb con labels cortos.',
      },
    },
  },
};

/**
 * EmptyBreadcrumb
 * Breadcrumb sin items
 */
export const EmptyBreadcrumb: Story = {
  name: 'Empty Breadcrumb',
  args: {
    items: [],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb sin items (vacío).',
      },
    },
  },
};

/**
 * AllSeparators
 * Todos los separadores comunes
 */
export const AllSeparators: Story = {
  name: 'All Separators',
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const separators = ['>', '/', '→', '•', '|', '-'];
    
    separators.forEach(separator => {
      const separatorContainer = document.createElement('div');
      separatorContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
      `;
      label.textContent = `Separator: "${separator}"`;
      
      const breadcrumbContainer = document.createElement('div');
      breadcrumbContainer.id = `breadcrumb-container-${separator}-${Date.now()}`;
      
      separatorContainer.appendChild(label);
      separatorContainer.appendChild(breadcrumbContainer);
      container.appendChild(separatorContainer);
      
      requestAnimationFrame(() => {
        createBreadcrumb({
          items: args.items || [],
          separator: separator,
        }, breadcrumbContainer.id);
      });
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los separadores comunes (>, /, →, •, |, -).',
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
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'category', label: 'Categoría', url: '#', onClick: () => console.log('Category clicked') },
      { id: 'subcategory', label: 'Subcategoría', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
    onItemClick: (itemId, itemElement) => {
      console.log('Item clicked:', itemId);
    },
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb completo con todas las opciones habilitadas.',
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
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'page', label: 'Página' }
    ],
    separator: '>',
  },
  render: (args) => renderBreadcrumbStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb mínimo con solo las opciones esenciales.',
      },
    },
  },
};

