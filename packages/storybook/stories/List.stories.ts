import type { Meta, StoryObj } from '@storybook/html';
import { renderList } from '../../components/list/src/ListProvider';
import type { ListOptions, ListItem, ListItemState, ListSize } from '../../components/list/src/types/ListOptions';
import '../../components/list/src/styles/list.css';

const meta: Meta<{
  size?: 'xs' | 'sm' | 'md' | 'lg';
  maxHeight?: string;
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}> = {
  title: 'Data/List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple.`,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño de los items de la lista',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Altura máxima de la lista (para scroll)',
      table: {
        defaultValue: { summary: '400px' },
        type: { summary: 'string' },
      },
    },
    showScrollbar: {
      control: { type: 'boolean' },
      description: 'Mostrar scrollbar UBITS personalizado',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    item1State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 1',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item2State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 2',
      table: {
        defaultValue: { summary: 'active' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item3State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 3',
      table: {
        defaultValue: { summary: 'disabled' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
    item4State: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del item 4',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Función para renderizar List (replicando exactamente la implementación de Autoframe)
function renderListSimple(args: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  maxHeight?: string;
  item1State?: ListItemState;
  item2State?: ListItemState;
  item3State?: ListItemState;
  item4State?: ListItemState;
  showScrollbar?: boolean;
}): string {
  const { size = 'md', item1State = 'default', item2State = 'active', item3State = 'disabled', item4State = 'default', maxHeight = '400px', showScrollbar = false } = args;
  
  // Crear más items para que tenga scroll (10 items)
  const items = [
    { label: 'Item 1', state: item1State },
    { label: 'Item 2', state: item2State },
    { label: 'Item 3', state: item3State },
    { label: 'Item 4', state: item4State },
    { label: 'Item 5', state: 'default' as const },
    { label: 'Item 6', state: 'default' as const },
    { label: 'Item 7', state: 'default' as const },
    { label: 'Item 8', state: 'default' as const },
    { label: 'Item 9', state: 'default' as const },
    { label: 'Item 10', state: 'default' as const }
  ];
  
  const listContainerId = 'list-container-${Date.now()}';
  const listId = `list-${Date.now()}`;
  const scrollbarContainerId = `list-scrollbar-${Date.now()}`;
  
  // Si showScrollbar está activado, usar estructura con scrollbar UBITS
  if (showScrollbar) {
    let listHTML = `
      <div id="${listContainerId}" style="position: relative; width: 100%;">
        <div id="${listId}" class="ubits-list" role="list" style="max-height: ${maxHeight}; overflow-y: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; padding-right: 8px;">
    `;
    
    items.forEach((item) => {
      const itemState = item.state || 'default';
      const itemClasses = [
        'ubits-list-item',
        `ubits-list-item--${size}`,
        itemState !== 'default' ? `ubits-list-item--${itemState}' : ''
      ].filter(Boolean).join(' ');
      
      const itemAttrs = [];
      if (itemState === 'active') {
        itemAttrs.push('aria-selected="true"');
      }
      if (itemState === 'disabled') {
        itemAttrs.push('aria-disabled="true"');
      } else {
        itemAttrs.push('tabindex="0"');
      }
      
      listHTML += `
        <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
          ${item.label}
        </div>
      `;
    });
    
    listHTML += `
        </div>
        <div id="${scrollbarContainerId}" style="position: absolute; top: 0; right: 0; width: 8px; height: 100%; pointer-events: none;"></div>
      </div>
      <style>
        #${listId}::-webkit-scrollbar { display: none; }
      </style>
    `;
    
    // Crear scrollbar UBITS después de que el DOM esté listo (igual que en Autoframe)
    setTimeout(() => {
      const listElement = document.getElementById(listId);
      const scrollbarContainer = document.getElementById(scrollbarContainerId);
      
      if (listElement && scrollbarContainer) {
        // Intentar usar createScrollbarLocal si está disponible (como en Autoframe)
        if (typeof (window as any).createScrollbarLocal === 'function') {
          if (listElement.scrollHeight > listElement.clientHeight) {
            const scrollbarInstance = (window as any).createScrollbarLocal(listElement, scrollbarContainer, 'vertical');
            if (scrollbarInstance) {
              scrollbarContainer.style.pointerEvents = 'auto';
              // Guardar referencia
              (listElement as any)._scrollbarInstance = scrollbarInstance;
              
              // Forzar que el scrollbar sea visible (igual que en Autoframe)
              setTimeout(() => {
                const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar') as HTMLElement;
                const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
                if (scrollbarElement && barElement) {
                  scrollbarElement.style.display = 'flex';
                  barElement.style.opacity = '0.6';
                  barElement.style.pointerEvents = 'auto';
                }
              }, 50);
            }
          }
        } else {
          // Fallback: importar ScrollProvider dinámicamente
          import('../../addons/scroll/src/ScrollProvider').then(({ createScrollbar }) => {
            if (listElement.scrollHeight > listElement.clientHeight) {
              const scrollbarInstance = createScrollbar({
                orientation: 'vertical',
                targetId: listId,
                containerId: scrollbarContainerId
              });
              
              if (scrollbarInstance) {
                scrollbarContainer.style.pointerEvents = 'auto';
                (listElement as any)._scrollbarInstance = scrollbarInstance;
                
                // Forzar que el scrollbar sea visible
                setTimeout(() => {
                  const scrollbarElement = scrollbarContainer.querySelector('.ubits-scrollbar') as HTMLElement;
                  const barElement = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
                  if (scrollbarElement && barElement) {
                    scrollbarElement.style.display = 'flex';
                    barElement.style.opacity = '0.6';
                    barElement.style.pointerEvents = 'auto';
                  }
                }, 50);
              }
            }
          }).catch((error) => {
            console.error('Error al importar ScrollProvider:', error);
          });
        }
      }
    }, 100);
    
    return listHTML;
  } else {
    // Sin scrollbar UBITS, ocultar scrollbar nativo también
    let listHTML = `<div class="ubits-list" role="list" style="max-height: ${maxHeight}; overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none;">`;
    
    items.forEach((item) => {
      const itemState = item.state || 'default';
      const itemClasses = [
        'ubits-list-item',
        `ubits-list-item--${size}`,
        itemState !== 'default' ? `ubits-list-item--${itemState}' : ''
      ].filter(Boolean).join(' ');
      
      const itemAttrs = [];
      if (itemState === 'active') {
        itemAttrs.push('aria-selected="true"');
      }
      if (itemState === 'disabled') {
        itemAttrs.push('aria-disabled="true"');
      } else {
        itemAttrs.push('tabindex="0"');
      }
      
      listHTML += `
        <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
          ${item.label}
        </div>
      `;
    });
    
    listHTML += '</div>';
    listHTML += `<style>
      .ubits-list::-webkit-scrollbar { display: none; }
    </style>`;
    return listHTML;
  }
}

export const Default: Story = {
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'active',
    item3State: 'disabled',
    item4State: 'default',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    // Preview container
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    
    // Info panel
    const infoPanel = document.createElement('div');
    infoPanel.style.padding = '16px';
    infoPanel.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.border = '1px solid var(--modifiers-normal-color-light-border-1, #e5e7eb)';
    infoPanel.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong style="color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-size: 14px;">Configuración:</strong>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <div><strong>Tamaño:</strong> ${args.size || 'md'}</div>
        <div><strong>Altura máxima:</strong> ${args.maxHeight || '400px'}</div>
        <div><strong>Scrollbar UBITS:</strong> ${args.showScrollbar ? 'Sí' : 'No'}</div>
        <div><strong>Item 1:</strong> ${args.item1State || 'default'}</div>
        <div><strong>Item 2:</strong> ${args.item2State || 'active'}</div>
        <div><strong>Item 3:</strong> ${args.item3State || 'disabled'}</div>
        <div><strong>Item 4:</strong> ${args.item4State || 'default'}</div>
      </div>
    `;
    
    // List container
    const listContainer = document.createElement('div');
    listContainer.id = `list-preview-${Date.now()}`;
    listContainer.style.width = '100%';
    listContainer.style.maxWidth = '400px';
    
    // Renderizar lista usando la misma función que Autoframe
    const listHTML = renderListSimple(args);
    listContainer.innerHTML = listHTML;
    
    // Cargar CSS del scrollbar siempre (para que esté disponible cuando se active)
    const scrollbarCSSId = 'ubits-scrollbar-css';
    if (!document.getElementById(scrollbarCSSId)) {
      const link = document.createElement('link');
      link.id = scrollbarCSSId;
      link.rel = 'stylesheet';
      link.href = '../../components/scroll/src/styles/scroll.css';
      document.head.appendChild(link);
    }
    
    preview.appendChild(infoPanel);
    preview.appendChild(listContainer);
    container.appendChild(preview);
    
    return container;
  },
};

// Helper para renderizar List de manera consistente
function renderListStory(options: Omit<ListOptions, 'containerId'>) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
    max-width: 400px;
    margin: 0 auto;
  `;

  const listContainer = document.createElement('div');
  listContainer.style.cssText = `
    width: 100%;
    background: var(--modifiers-normal-color-light-bg-1, #ffffff);
    border-radius: 8px;
    border: 1px solid var(--modifiers-normal-color-light-border-1, #e5e7eb);
    overflow: hidden;
  `;

  // Usar renderList en lugar de createList para evitar problemas con el DOM
  const listHTML = renderList(options);
  listContainer.innerHTML = listHTML;

  // Agregar event listeners manualmente si es necesario
  const listElement = listContainer.querySelector('.ubits-list') as HTMLElement;
  if (listElement && (options.onSelectionChange || options.multiple)) {
    const listItems = listElement.querySelectorAll('.ubits-list-item');
    let selectedIndex: number | null = null;
    const selectedIndices = new Set<number>();

    listItems.forEach((itemEl, index) => {
      const item = options.items[index];
      if (!item) return;

      // Click handler
      if (item.state !== 'disabled') {
        itemEl.addEventListener('click', () => {
          if (item.onClick) {
            item.onClick(item, index);
          }

          if (!options.multiple) {
            // Deseleccionar anterior
            if (selectedIndex !== null && selectedIndex !== index) {
              const prevItem = listItems[selectedIndex];
              prevItem.classList.remove('ubits-list-item--active');
              prevItem.removeAttribute('aria-selected');
            }

            // Seleccionar nuevo
            if (selectedIndex !== index) {
              itemEl.classList.add('ubits-list-item--active');
              itemEl.setAttribute('aria-selected', 'true');
              selectedIndex = index;

              if (options.onSelectionChange) {
                options.onSelectionChange(item, index);
              }
            } else {
              // Deseleccionar si se hace clic en el mismo
              itemEl.classList.remove('ubits-list-item--active');
              itemEl.removeAttribute('aria-selected');
              selectedIndex = null;

              if (options.onSelectionChange) {
                options.onSelectionChange(null, null);
              }
            }
          } else {
            // Selección múltiple
            const isSelected = itemEl.classList.contains('ubits-list-item--active');
            if (isSelected) {
              itemEl.classList.remove('ubits-list-item--active');
              itemEl.removeAttribute('aria-selected');
              selectedIndices.delete(index);
            } else {
              itemEl.classList.add('ubits-list-item--active');
              itemEl.setAttribute('aria-selected', 'true');
              selectedIndices.add(index);
            }

            if (options.onSelectionChange) {
              // Pasar el último seleccionado para compatibilidad
              if (selectedIndices.size > 0) {
                const lastIndex = Array.from(selectedIndices).pop()!;
                options.onSelectionChange(options.items[lastIndex], lastIndex);
              } else {
                options.onSelectionChange(null, null);
              }
            }
          }
        });
      }
    });
  }

  container.appendChild(listContainer);
  return container;
}

/**
 * SizeXS
 * Tamaño xs
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    size: 'xs',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default'
  },
  render: (args) => {
    const items: ListItem[] = [
      { label: 'Item 1', state: args.item1State || 'default' },
      { label: 'Item 2', state: args.item2State || 'default' },
      { label: 'Item 3', state: args.item3State || 'default' },
      { label: 'Item 4', state: args.item4State || 'default' }
    ];
    return renderListStory({
      items,
      size: 'xs',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con tamaño xs.',
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
    size: 'sm',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default'
  },
  render: (args) => {
    const items: ListItem[] = [
      { label: 'Item 1', state: args.item1State || 'default' },
      { label: 'Item 2', state: args.item2State || 'default' },
      { label: 'Item 3', state: args.item3State || 'default' },
      { label: 'Item 4', state: args.item4State || 'default' }
    ];
    return renderListStory({
      items,
      size: 'sm',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con tamaño sm.',
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
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default'
  },
  render: (args) => {
    const items: ListItem[] = [
      { label: 'Item 1', state: args.item1State || 'default' },
      { label: 'Item 2', state: args.item2State || 'default' },
      { label: 'Item 3', state: args.item3State || 'default' },
      { label: 'Item 4', state: args.item4State || 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con tamaño md (default).',
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
    size: 'lg',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default'
  },
  render: (args) => {
    const items: ListItem[] = [
      { label: 'Item 1', state: args.item1State || 'default' },
      { label: 'Item 2', state: args.item2State || 'default' },
      { label: 'Item 3', state: args.item3State || 'default' },
      { label: 'Item 4', state: args.item4State || 'default' }
    ];
    return renderListStory({
      items,
      size: 'lg',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con tamaño lg.',
      },
    },
  },
};

/**
 * StateDefault
 * Items en estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'default',
    item2State: 'default',
    item3State: 'default',
    item4State: 'default'
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' },
      { label: 'Item 4', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con todos los items en estado default.',
      },
    },
  },
};

/**
 * StateHover
 * Items en estado hover
 */
export const StateHover: Story = {
  name: 'State - Hover',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'hover',
    item2State: 'hover',
    item3State: 'hover',
    item4State: 'hover'
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'hover' },
      { label: 'Item 2', state: 'hover' },
      { label: 'Item 3', state: 'hover' },
      { label: 'Item 4', state: 'hover' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con todos los items en estado hover.',
      },
    },
  },
};

/**
 * StateActive
 * Items en estado active
 */
export const StateActive: Story = {
  name: 'State - Active',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'active',
    item2State: 'active',
    item3State: 'active',
    item4State: 'active'
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'active', selected: true },
      { label: 'Item 2', state: 'active', selected: true },
      { label: 'Item 3', state: 'active', selected: true },
      { label: 'Item 4', state: 'active', selected: true }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con todos los items en estado active (seleccionados).',
      },
    },
  },
};

/**
 * StateDisabled
 * Items en estado disabled
 */
export const StateDisabled: Story = {
  name: 'State - Disabled',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false,
    item1State: 'disabled',
    item2State: 'disabled',
    item3State: 'disabled',
    item4State: 'disabled'
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'disabled' },
      { label: 'Item 2', state: 'disabled' },
      { label: 'Item 3', state: 'disabled' },
      { label: 'Item 4', state: 'disabled' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con todos los items en estado disabled.',
      },
    },
  },
};

/**
 * MixedStates
 * Items con diferentes estados
 */
export const MixedStates: Story = {
  name: 'Mixed States',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item default', state: 'default' },
      { label: 'Item hover', state: 'hover' },
      { label: 'Item active', state: 'active', selected: true },
      { label: 'Item disabled', state: 'disabled' },
      { label: 'Item default 2', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con items en diferentes estados (default, hover, active, disabled).',
      },
    },
  },
};

/**
 * SelectedItem
 * Item seleccionado
 */
export const SelectedItem: Story = {
  name: 'Selected Item',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'active', selected: true },
      { label: 'Item 3', state: 'default' },
      { label: 'Item 4', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con un item seleccionado.',
      },
    },
  },
};

/**
 * MultipleSelectedItems
 * Múltiples items seleccionados
 */
export const MultipleSelectedItems: Story = {
  name: 'Multiple Selected Items',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'active', selected: true },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'active', selected: true },
      { label: 'Item 4', state: 'default' },
      { label: 'Item 5', state: 'active', selected: true }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px',
      multiple: true
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con múltiples items seleccionados (modo múltiple).',
      },
    },
  },
};

/**
 * SingleSelection
 * Selección simple
 */
export const SingleSelection: Story = {
  name: 'Single Selection',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' },
      { label: 'Item 4', state: 'default' },
      { label: 'Item 5', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px',
      multiple: false,
      onSelectionChange: (selectedItem, index) => {
        console.log('Item seleccionado:', selectedItem?.label, 'Índice:', index);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con selección simple (solo un item puede estar seleccionado a la vez).',
      },
    },
  },
};

/**
 * MultipleSelection
 * Selección múltiple
 */
export const MultipleSelection: Story = {
  name: 'Multiple Selection',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' },
      { label: 'Item 4', state: 'default' },
      { label: 'Item 5', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px',
      multiple: true,
      onSelectionChange: (selectedItem, index) => {
        console.log('Selección cambiada:', selectedItem?.label, 'Índice:', index);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con selección múltiple (múltiples items pueden estar seleccionados).',
      },
    },
  },
};

/**
 * CustomMaxHeight
 * Con altura máxima personalizada
 */
export const CustomMaxHeight: Story = {
  name: 'Custom Max Height',
  args: {
    size: 'md',
    maxHeight: '200px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = Array.from({ length: 10 }, (_, i) => ({
      label: 'Item ${i + 1}',
      state: 'default' as const
    }));
    return renderListStory({
      items,
      size: 'md',
      maxHeight: '200px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con altura máxima personalizada (200px, mostrará scroll si hay más items).',
      },
    },
  },
};

/**
 * FewItems
 * Pocos items
 */
export const FewItems: Story = {
  name: 'Few Items',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con pocos items (3 items).',
      },
    },
  },
};

/**
 * ManyItems
 * Muchos items (con scroll)
 */
export const ManyItems: Story = {
  name: 'Many Items',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = Array.from({ length: 20 }, (_, i) => ({
      label: 'Item ${i + 1}',
      state: 'default' as const
    }));
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con muchos items (20 items, mostrará scroll).',
      },
    },
  },
};

/**
 * ItemWithValue
 * Items con valor
 */
export const ItemWithValue: Story = {
  name: 'Item With Value',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', value: 'value-1', state: 'default' },
      { label: 'Item 2', value: 'value-2', state: 'default' },
      { label: 'Item 3', value: 'value-3', state: 'default' },
      { label: 'Item 4', value: 'value-4', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con items que tienen valores asignados.',
      },
    },
  },
};

/**
 * ItemWithOnClick
 * Items con callback onClick
 */
export const ItemWithOnClick: Story = {
  name: 'Item With On Click',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { 
        label: 'Item 1', 
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label, 'Índice:', index);
          alert(`Item clickeado: ${item.label}`);
        }
      },
      { 
        label: 'Item 2', 
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label, 'Índice:', index);
          alert(`Item clickeado: ${item.label}`);
        }
      },
      { 
        label: 'Item 3', 
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label, 'Índice:', index);
          alert(`Item clickeado: ${item.label}`);
        }
      }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con items que tienen callback onClick individual.',
      },
    },
  },
};

/**
 * ItemWithAttributes
 * Items con atributos personalizados
 */
export const ItemWithAttributes: Story = {
  name: 'Item With Attributes',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { 
        label: 'Item 1', 
        state: 'default',
        attributes: {
          'data-custom': 'value1',
          'aria-label': 'Primer item'
        }
      },
      { 
        label: 'Item 2', 
        state: 'default',
        attributes: {
          'data-custom': 'value2',
          'aria-label': 'Segundo item'
        }
      },
      { 
        label: 'Item 3', 
        state: 'default',
        attributes: {
          'data-custom': 'value3',
          'aria-label': 'Tercer item'
        }
      }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con items que tienen atributos HTML personalizados.',
      },
    },
  },
};

/**
 * OnSelectionChangeCallback
 * Callback onSelectionChange
 */
export const OnSelectionChangeCallback: Story = {
  name: 'On Selection Change Callback',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' },
      { label: 'Item 4', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px',
      onSelectionChange: (selectedItem, index) => {
        console.log('Selección cambiada:', selectedItem?.label, 'Índice:', index);
        if (selectedItem) {
          alert(`Item seleccionado: ${selectedItem.label} (Índice: ${index})`);
        } else {
          alert('Selección desactivada');
        }
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con callback onSelectionChange cuando cambia la selección.',
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
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
      margin: 0 auto;
    `;

    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const items: ListItem[] = [
        { label: 'Item 1 (${size.toUpperCase()})', state: 'default' },
        { label: 'Item 2 (${size.toUpperCase()})', state: 'default' },
        { label: 'Item 3 (${size.toUpperCase()})', state: 'default' }
      ];
      const listHTML = renderList({
        items,
        size: size as ListSize,
        maxHeight: '200px'
      });
      wrapper.innerHTML = listHTML;
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Lists en todos los tamaños disponibles (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllStates
 * Todos los estados
 */
export const AllStates: Story = {
  name: 'All States',
  args: {
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item default', state: 'default' },
      { label: 'Item hover', state: 'hover' },
      { label: 'Item active', state: 'active', selected: true },
      { label: 'Item disabled', state: 'disabled' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List con items en todos los estados disponibles (default, hover, active, disabled).',
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
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { 
        label: 'Item 1', 
        value: 'value-1',
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label);
        }
      },
      { 
        label: 'Item 2', 
        value: 'value-2',
        state: 'active',
        selected: true,
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label);
        }
      },
      { 
        label: 'Item 3', 
        value: 'value-3',
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label);
        }
      },
      { 
        label: 'Item 4', 
        value: 'value-4',
        state: 'disabled',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label);
        }
      },
      { 
        label: 'Item 5', 
        value: 'value-5',
        state: 'default',
        onClick: (item, index) => {
          console.log('Item clickeado:', item.label);
        }
      }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px',
      multiple: false,
      onSelectionChange: (selectedItem, index) => {
        console.log('Selección cambiada:', selectedItem?.label, 'Índice:', index);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List completo con todas las opciones habilitadas: diferentes estados, valores, callbacks onClick, y callback onSelectionChange.',
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
    size: 'md',
    maxHeight: '400px',
    showScrollbar: false
  },
  render: (args) => {
    
    const items: ListItem[] = [
      { label: 'Item 1', state: 'default' },
      { label: 'Item 2', state: 'default' },
      { label: 'Item 3', state: 'default' }
    ];
    return renderListStory({
      items,
      size: 'md',
      maxHeight: args.maxHeight || '400px'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'List mínimo con solo las opciones esenciales (items básicos, tamaño md).',
      },
    },
  },
};

