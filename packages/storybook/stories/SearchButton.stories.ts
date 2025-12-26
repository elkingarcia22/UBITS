import type { Meta, StoryObj } from '@storybook/html';
import { renderSearchButton, createSearchButton } from '../../components/search-button/src/SearchButtonProvider';
import type { SearchButtonOptions } from '../../components/search-button/src/types/SearchButtonOptions';
// Importar CSS del bot?n UBITS (necesario para el modo bot?n)
import '../../components/button/src/styles/button.css';
// Importar CSS del Search Button (necesario para el modo input)
import '../../components/search-button/src/styles/search-button.css';

const meta: Meta<SearchButtonOptions> = {
  title: 'Formularios/Search Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Search Button UBITS con modo bot?n e input. Cuando est? activo, muestra un campo de b?squeda con icono. Cuando no est? activo, muestra solo un bot?n con icono de lupa. Usa tokens UBITS exclusivamente.`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Si el bot?n est? en modo activo (muestra input)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tama?o del bot?n (sm: 32px, md: 40px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del bot?n',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el bot?n est? deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder del input cuando est? activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor del input cuando est? activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Ancho del input cuando est? activo (en px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '248' },
        category: 'Apariencia',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Funci?n a ejecutar cuando cambia el valor del input',
      table: {
        disable: true,
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Funci?n a ejecutar cuando se hace click en el bot?n',
      table: {
        disable: true,
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Funci?n a ejecutar cuando el input recibe focus',
      table: {
        disable: true,
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Funci?n a ejecutar cuando el input pierde focus',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Avanzado',
      },
    },
    showFilterButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de filtro al lado derecho del SearchButton',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Acciones',
      },
    },
    showCreateButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de crear al lado derecho del SearchButton',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Acciones',
      },
    },
    onFilterClick: {
      action: 'filter-clicked',
      description: 'Callback cuando se hace click en el botón de filtro',
      table: {
        disable: true,
      },
    },
    onCreateClick: {
      action: 'create-clicked',
      description: 'Callback cuando se hace click en el botón de crear',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SearchButtonOptions>;

export const Default: Story = {
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248,
    className: '',
    showFilterButton: false,
    showCreateButton: false,
  },
  render: (args) => {
    // SIMPLIFICAR: Crear contenedor y agregar botones directamente
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'flex-end';
    container.style.gap = '12px';
    container.style.minHeight = '100px';
    container.style.width = '100%';
    container.style.position = 'relative';
    container.style.boxSizing = 'border-box';
    container.style.overflow = 'visible';

    // Estado interno para manejar el toggle
    let isActive = args.active !== undefined ? args.active : false;
    let currentValue = args.value || '';
    let currentState = args.state || 'default';

    // Crear contenedor para el SearchButton
    const searchButtonContainer = document.createElement('div');
    searchButtonContainer.id = 'searchbutton-container';
    searchButtonContainer.style.display = 'flex';
    searchButtonContainer.style.justifyContent = 'flex-end';
    searchButtonContainer.style.alignItems = 'center';
    searchButtonContainer.style.position = 'relative';
    searchButtonContainer.style.width = 'auto';
    searchButtonContainer.style.minWidth = '40px'; // Ancho mínimo para el botón (md)
    searchButtonContainer.style.flexShrink = '0';
    searchButtonContainer.style.flexGrow = '0';

    // Crear botones de filtro secundarios al lado izquierdo del SearchButton
    const filterButton1 = document.createElement('button');
    filterButton1.className = 'ubits-button ubits-button--secondary ubits-button--md';
    filterButton1.innerHTML = '<i class="far fa-filter"></i>';
    filterButton1.setAttribute('aria-label', 'Filtro');
    filterButton1.style.marginRight = '8px';
    filterButton1.style.flexShrink = '0';
    filterButton1.style.display = 'inline-flex';
    filterButton1.style.alignItems = 'center';
    filterButton1.style.justifyContent = 'center';
    
    const filterButton2 = document.createElement('button');
    filterButton2.className = 'ubits-button ubits-button--secondary ubits-button--md';
    filterButton2.innerHTML = '<i class="far fa-sliders-h"></i>';
    filterButton2.setAttribute('aria-label', 'Opciones');
    filterButton2.style.marginRight = '8px';
    filterButton2.style.flexShrink = '0';
    filterButton2.style.display = 'inline-flex';
    filterButton2.style.alignItems = 'center';
    filterButton2.style.justifyContent = 'center';
    
    // Crear icono al lado derecho del SearchButton
    const rightIcon = document.createElement('button');
    rightIcon.className = 'ubits-button ubits-button--secondary ubits-button--md ubits-button--icon-only';
    rightIcon.innerHTML = '<i class="far fa-bell"></i>';
    rightIcon.setAttribute('aria-label', 'Notificaciones');
    rightIcon.style.marginLeft = '8px';
    rightIcon.style.flexShrink = '0';
    rightIcon.style.display = 'inline-flex';
    rightIcon.style.alignItems = 'center';
    rightIcon.style.justifyContent = 'center';

    // Variable para mantener la instancia del SearchButton
    let searchButtonInstance: { element: HTMLElement; destroy: () => void; update: (options: Partial<SearchButtonOptions>) => void } | null = null;

    const renderSearchComponent = () => {
      // Si state es 'active', el buscador está desplegado
      const isSearchActive = isActive || currentState === 'active';
      
      // VERIFICACIÓN: Verificar que los botones estén en el contenedor ANTES de renderizar
      console.log('[Story] 🔵🔵🔵 renderSearchComponent CALLED 🔵🔵🔵');
      console.log('[Story] 🔵 Container children BEFORE render:', container.children.length);
      console.log('[Story] 🔵 Container children list:', Array.from(container.children).map((c, i) => ({
        index: i,
        tag: c.tagName,
        id: c.id || 'no-id',
        className: c.className || 'no-class'
      })));
      
      // Limpiar instancia anterior si existe
      if (searchButtonInstance) {
        searchButtonInstance.destroy();
        searchButtonInstance = null;
      }

      // Limpiar solo el contenedor del SearchButton
      searchButtonContainer.innerHTML = '';
      
      // Crear el SearchButton usando createSearchButton para que el posicionamiento funcione correctamente
      try {
        searchButtonInstance = createSearchButton({
          active: isSearchActive,
          size: args.size || 'md',
          state: currentState,
          disabled: args.disabled !== undefined ? args.disabled : false,
          placeholder: args.placeholder || '',
          value: currentValue,
          width: args.width || 248,
          className: args.className || '',
          showFilterButton: args.showFilterButton !== undefined ? args.showFilterButton : false,
          showCreateButton: args.showCreateButton !== undefined ? args.showCreateButton : false,
          container: searchButtonContainer,
          onChange: (e) => {
            const target = e.target as HTMLInputElement;
            currentValue = target.value;
            if (args.onChange) {
              args.onChange(e);
            }
          },
          onClick: (e) => {
            if (args.onClick) {
              args.onClick(e);
            }
          },
          onFocus: (e) => {
            if (args.onFocus) {
              args.onFocus(e);
            }
          },
          onBlur: (e) => {
            if (args.onBlur) {
              args.onBlur(e);
            }
          },
          onFilterClick: (e) => {
            if (args.onFilterClick) {
              args.onFilterClick(e);
            }
          },
          onCreateClick: (e) => {
            if (args.onCreateClick) {
              args.onCreateClick(e);
            }
          },
          onFilterClick: (e) => {
            if (args.onFilterClick) {
              args.onFilterClick(e);
            }
          },
          onCreateClick: (e) => {
            if (args.onCreateClick) {
              args.onCreateClick(e);
            }
          }
        });
        
        console.log('[Story] Implementation render - args:', args);
        console.log('[Story] Implementation - Search button instance created:', {
          element: searchButtonInstance.element,
          destroy: searchButtonInstance.destroy,
          update: searchButtonInstance.update
        });
        
        // LOG SIMPLE para verificar que el código continúa ejecutándose
        console.log('[Story] ✅ LOG AFTER createSearchButton - CODE CONTINUES');
        
        // VERIFICACIÓN CRÍTICA: Verificar botones DESPUÉS de crear SearchButton
        try {
          console.log('[Story] ✅✅✅ CHECKING BUTTONS AFTER createSearchButton ✅✅✅');
          const parentContainer = searchButtonContainer.parentElement;
          console.log('[Story] ✅ parentContainer:', parentContainer ? 'exists' : 'null');
          
          if (parentContainer) {
            console.log('[Story] ✅ Parent container exists, has', parentContainer.children.length, 'children');
            console.log('[Story] ✅ Parent children:', Array.from(parentContainer.children).map((c, i) => ({
              index: i,
              tag: c.tagName,
              id: c.id || 'no-id',
              className: c.className || 'no-class'
            })));
            
            // Verificar botones - verificar que las variables existan primero
            console.log('[Story] ✅ Checking if button variables exist:', {
              filterButton1: typeof filterButton1 !== 'undefined',
              filterButton2: typeof filterButton2 !== 'undefined',
              rightIcon: typeof rightIcon !== 'undefined'
            });
            
            if (typeof filterButton1 !== 'undefined' && typeof filterButton2 !== 'undefined' && typeof rightIcon !== 'undefined') {
              const hasFilter1 = Array.from(parentContainer.children).includes(filterButton1);
              const hasFilter2 = Array.from(parentContainer.children).includes(filterButton2);
              const hasRightIcon = Array.from(parentContainer.children).includes(rightIcon);
              const hasSearchContainer = Array.from(parentContainer.children).includes(searchButtonContainer);
              
              console.log('[Story] ✅ Button presence:', {
                filter1: hasFilter1,
                filter2: hasFilter2,
                rightIcon: hasRightIcon,
                searchContainer: hasSearchContainer,
                totalChildren: parentContainer.children.length
              });
              
              if (!hasFilter1 || !hasFilter2 || !hasRightIcon) {
                console.error('[Story] ❌❌❌ ERROR: Buttons missing! filter1:', hasFilter1, 'filter2:', hasFilter2, 'rightIcon:', hasRightIcon);
              } else {
                console.log('[Story] ✅✅✅ ALL BUTTONS PRESENT IN CONTAINER ✅✅✅');
              }
            } else {
              console.error('[Story] ❌ ERROR: Button variables not defined in scope!');
            }
          } else {
            console.error('[Story] ❌ searchButtonContainer has no parent!');
          }
        } catch (err) {
          console.error('[Story] ❌❌❌ ERROR checking buttons:', err);
          console.error('[Story] ❌ Error stack:', err instanceof Error ? err.stack : 'No stack');
        }
      } catch (error) {
        console.error('[Story] Error creating search button:', error);
      }

      // Agregar interactividad usando la instancia del SearchButton
      // El SearchButton ya maneja los clicks y eventos internamente
      // Solo necesitamos agregar l?gica adicional para ESC y blur
      if (searchButtonInstance && isSearchActive) {
        const inputElement = searchButtonContainer.querySelector('.ubits-search-button__input') as HTMLInputElement;
        if (inputElement) {
          // ESC para contraer
          inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              e.stopPropagation();
              isActive = false;
              currentState = 'default';
              renderSearchComponent();
            }
          });
          
          // Blur para contraer cuando se hace click fuera (si el input est? vac?o)
          inputElement.addEventListener('blur', (e) => {
            // Solo contraer si el input est? vac?o
            if (!inputElement.value.trim()) {
              setTimeout(() => {
                if (document.activeElement !== inputElement && !inputElement.value.trim()) {
                  isActive = false;
                  currentState = 'default';
                  renderSearchComponent();
                }
              }, 200);
            }
          });
        }
      }
    };

    // Agregar elementos al contenedor principal en orden: filtros -> SearchButton -> icono
    // IMPORTANTE: Agregar los botones ANTES de llamar a renderSearchComponent
    container.appendChild(filterButton1);
    container.appendChild(filterButton2);
    container.appendChild(searchButtonContainer);
    container.appendChild(rightIcon);
    
    // LOG SIMPLE después de agregar botones
    console.log('[Story] ✅ BUTTONS APPENDED - Container has', container.children.length, 'children');

    // Renderizar inicialmente
    renderSearchComponent();
    
    // Logs para debug
    console.log('[Story] Container children:', container.children.length);
    console.log('[Story] Container state after render:', {
      containerChildren: container.children.length,
      containerChildrenDetails: Array.from(container.children).map((child, index) => ({
        index: index,
        tagName: child.tagName,
        className: child.className,
        id: child.id,
        innerHTML: child.innerHTML.substring(0, 100),
        isVisible: {
          display: window.getComputedStyle(child as HTMLElement).display !== 'none',
          visibility: window.getComputedStyle(child as HTMLElement).visibility !== 'hidden',
          opacity: window.getComputedStyle(child as HTMLElement).opacity !== '0',
          width: window.getComputedStyle(child as HTMLElement).width,
          height: window.getComputedStyle(child as HTMLElement).height
        },
        computedStyles: {
          display: window.getComputedStyle(child as HTMLElement).display,
          visibility: window.getComputedStyle(child as HTMLElement).visibility,
          opacity: window.getComputedStyle(child as HTMLElement).opacity,
          width: window.getComputedStyle(child as HTMLElement).width,
          height: window.getComputedStyle(child as HTMLElement).height,
          marginLeft: window.getComputedStyle(child as HTMLElement).marginLeft,
          marginRight: window.getComputedStyle(child as HTMLElement).marginRight,
          position: window.getComputedStyle(child as HTMLElement).position
        }
      })),
      searchButtonContainerChildren: searchButtonContainer.children.length,
      searchButtonContainerDetails: {
        tagName: searchButtonContainer.tagName,
        className: searchButtonContainer.className,
        id: searchButtonContainer.id,
        children: Array.from(searchButtonContainer.children).map(child => ({
          tagName: child.tagName,
          className: child.className
        }))
      },
      filterButton1State: {
        parent: filterButton1.parentElement,
        inDOM: document.body.contains(filterButton1),
        display: window.getComputedStyle(filterButton1).display,
        visibility: window.getComputedStyle(filterButton1).visibility,
        opacity: window.getComputedStyle(filterButton1).opacity
      },
      filterButton2State: {
        parent: filterButton2.parentElement,
        inDOM: document.body.contains(filterButton2),
        display: window.getComputedStyle(filterButton2).display,
        visibility: window.getComputedStyle(filterButton2).visibility,
        opacity: window.getComputedStyle(filterButton2).opacity
      },
      rightIconState: {
        parent: rightIcon.parentElement,
        inDOM: document.body.contains(rightIcon),
        display: window.getComputedStyle(rightIcon).display,
        visibility: window.getComputedStyle(rightIcon).visibility,
        opacity: window.getComputedStyle(rightIcon).opacity
      }
    });
    
    // Verificar después de un pequeño delay para asegurar que el DOM se haya actualizado
    setTimeout(() => {
      console.log('[Story] ========== DELAYED CHECK (100ms) ==========');
      console.log('[Story] Delayed container check:', {
        containerInDOM: document.body.contains(container),
        containerChildren: container.children.length,
        allChildrenVisible: Array.from(container.children).every(child => {
          const styles = window.getComputedStyle(child as HTMLElement);
          return styles.display !== 'none' && 
                 styles.visibility !== 'hidden' && 
                 styles.opacity !== '0' &&
                 parseFloat(styles.width) > 0 &&
                 parseFloat(styles.height) > 0;
        }),
        childrenDetails: Array.from(container.children).map((child, index) => {
          const styles = window.getComputedStyle(child as HTMLElement);
          const rect = child.getBoundingClientRect();
          return {
            index: index,
            tagName: child.tagName,
            className: child.className,
            id: child.id,
            innerHTML: child.innerHTML.substring(0, 50),
            visible: styles.display !== 'none' && 
                     styles.visibility !== 'hidden' && 
                     styles.opacity !== '0',
            rect: {
              width: rect.width,
              height: rect.height,
              top: rect.top,
              left: rect.left,
              right: rect.right,
              bottom: rect.bottom
            },
            styles: {
              display: styles.display,
              visibility: styles.visibility,
              opacity: styles.opacity,
              width: styles.width,
              height: styles.height,
              marginLeft: styles.marginLeft,
              marginRight: styles.marginRight
            }
          };
        })
      });
    }, 100);
    
    // Actualizar cuando cambian los args
      let lastArgs = JSON.stringify(args);
      const checkArgs = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          // Sincronizar el estado interno con los args
          if (args.active !== undefined) {
            isActive = args.active;
          }
          if (args.state !== undefined) {
            currentState = args.state;
          }
          if (args.value !== undefined) {
            currentValue = args.value;
          }
          renderSearchComponent();
        }
      }, 100);

      // Limpiar interval cuando se destruye el componente
      const cleanup = () => {
        clearInterval(checkArgs);
      };
      
      // Usar MutationObserver para detectar cuando el container se elimina
      const observer = new MutationObserver(() => {
        if (!document.body.contains(container)) {
          cleanup();
          observer.disconnect();
        }
      });
      
    observer.observe(document.body, { childList: true, subtree: true });

    return container;
  },
};

// Helper para renderizar Search Button de manera consistente (versi?n simplificada para historias est?ticas)
function renderSearchButtonStory(options: SearchButtonOptions) {
  const container = document.createElement('div');
  container.style.cssText = '
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
  `;

  const searchHTML = renderSearchButton({
    active: options.active !== undefined ? options.active : false,
    size: options.size || 'md',
    state: options.state || 'default',
    disabled: options.disabled !== undefined ? options.disabled : false,
    placeholder: options.placeholder || '',
    value: options.value || '',
    width: options.width || 248,
    className: options.className || ''
  });

  container.innerHTML = searchHTML;

  // Agregar event listeners b?sicos
  const buttonElement = container.querySelector('button') as HTMLButtonElement;
  const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
  const clearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;

  if (buttonElement && options.onClick) {
    buttonElement.addEventListener('click', options.onClick);
  }

  if (inputElement) {
    if (options.onChange) {
      inputElement.addEventListener('input', options.onChange);
      inputElement.addEventListener('change', options.onChange);
    }
    if (options.onFocus) {
      inputElement.addEventListener('focus', options.onFocus);
    }
    if (options.onBlur) {
      inputElement.addEventListener('blur', options.onBlur);
    }
  }

  if (clearButton) {
    clearButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (inputElement) {
        inputElement.value = '';
        inputElement.focus();
        if (options.onChange) {
          const event = new Event('input', { bubbles: true });
          inputElement.dispatchEvent(event);
        }
      }
    });
  }

  return container;
}

/**
 * ModeButton
 * Modo bot?n (no activo)
 */
export const ModeButton: Story = {
  name: 'Mode - Button',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en modo bot?n (no activo, muestra solo el bot?n con icono de lupa).',
      },
    },
  },
};

/**
 * ModeInput
 * Modo input (activo)
 */
export const ModeInput: Story = {
  name: 'Mode - Input',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en modo input (activo, muestra el campo de b?squeda).',
      },
    },
  },
};

/**
 * SizeSM
 * Tama?o sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    active: false,
    size: 'sm',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button con tama?o sm (32px).',
      },
    },
  },
};

/**
 * SizeMD
 * Tama?o md (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button con tama?o md (40px, default).',
      },
    },
  },
};

/**
 * StateDefault
 * Estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en estado default.',
      },
    },
  },
};

/**
 * StateHover
 * Estado hover
 */
export const StateHover: Story = {
  name: 'State - Hover',
  args: {
    active: false,
    size: 'md',
    state: 'hover',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en estado hover.',
      },
    },
  },
};

/**
 * StateActive
 * Estado active (despliega input)
 */
export const StateActive: Story = {
  name: 'State - Active',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en estado active (despliega el input autom?ticamente).',
      },
    },
  },
};

/**
 * StateDisabled
 * Estado disabled
 */
export const StateDisabled: Story = {
  name: 'State - Disabled',
  args: {
    active: false,
    size: 'md',
    state: 'disabled',
    disabled: true,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en estado disabled.',
      },
    },
  },
};

/**
 * ActiveWithValue
 * Activo con valor
 */
export const ActiveWithValue: Story = {
  name: 'Active - With Value',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: 'Texto de b?squeda',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con valor en el input (muestra bot?n de limpiar).',
      },
    },
  },
};

/**
 * ActiveWithoutValue
 * Activo sin valor
 */
export const ActiveWithoutValue: Story = {
  name: 'Active - Without Value',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo sin valor en el input (no muestra bot?n de limpiar).',
      },
    },
  },
};

/**
 * ActiveWithClearButton
 * Activo con bot?n de limpiar visible
 */
export const ActiveWithClearButton: Story = {
  name: 'Active - With Clear Button',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: 'Texto de ejemplo',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con bot?n de limpiar visible (cuando hay texto en el input).',
      },
    },
  },
};

/**
 * WithPlaceholder
 * Con placeholder
 */
export const WithPlaceholder: Story = {
  name: 'With Placeholder',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar usuarios, productos...',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con placeholder personalizado.',
      },
    },
  },
};

/**
 * CustomWidth
 * Ancho personalizado
 */
export const CustomWidth: Story = {
  name: 'Custom Width',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 400
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con ancho personalizado (400px).',
      },
    },
  },
};

/**
 * DefaultWidth
 * Ancho por defecto (248px)
 */
export const DefaultWidth: Story = {
  name: 'Default Width',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con ancho por defecto (248px).',
      },
    },
  },
};

/**
 * Disabled
 * Search button deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    active: false,
    size: 'md',
    state: 'disabled',
    disabled: true,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button deshabilitado.',
      },
    },
  },
};

/**
 * OnChangeCallback
 * Callback onChange
 */
export const OnChangeCallback: Story = {
  name: 'On Change Callback',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Valor cambiado:', target.value);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con callback onChange cuando cambia el valor del input.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Callback onClick
 */
export const OnClickCallback: Story = {
  name: 'On Click Callback',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248,
    onClick: (event: MouseEvent) => {
      console.log('Bot?n clickeado:', event);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en modo bot?n con callback onClick cuando se hace click.',
      },
    },
  },
};

/**
 * OnFocusCallback
 * Callback onFocus
 */
export const OnFocusCallback: Story = {
  name: 'On Focus Callback',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248,
    onFocus: (event: FocusEvent) => {
      console.log('Input enfocado:', event);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con callback onFocus cuando el input recibe focus.',
      },
    },
  },
};

/**
 * OnBlurCallback
 * Callback onBlur
 */
export const OnBlurCallback: Story = {
  name: 'On Blur Callback',
  args: {
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar...',
    value: '',
    width: 248,
    onBlur: (event: FocusEvent) => {
      console.log('Input desenfocado:', event);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con callback onBlur cuando el input pierde focus.',
      },
    },
  },
};

/**
 * AllSizes
 * Todos los tama?os
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
    `;

    ['sm', 'md'].forEach((size) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; align-items: center; gap: 8px;';
      const label = document.createElement('span');
      label.textContent = `Size ${size.toUpperCase()}:`;
      label.style.cssText = 'min-width: 80px; font-size: 14px; color: var(--modifiers-normal-color-light-fg-1-medium);';
      wrapper.appendChild(label);
      
      const searchHTML = renderSearchButton({
        active: false,
        size: size as 'sm' | 'md',
        state: 'default',
        disabled: false,
        placeholder: '',
        value: '',
        width: 248
      });
      wrapper.insertAdjacentHTML('beforeend', searchHTML);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Search buttons en todos los tama?os disponibles (sm, md).',
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
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
    `;

    ['default', 'hover', 'active', 'disabled'].forEach((state) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; align-items: center; gap: 8px; width: 100%; max-width: 400px;';
      const label = document.createElement('span');
      label.textContent = `State ${state.charAt(0).toUpperCase() + state.slice(1)}:`;
      label.style.cssText = 'min-width: 100px; font-size: 14px; color: var(--modifiers-normal-color-light-fg-1-medium);';
      wrapper.appendChild(label);
      
      const searchHTML = renderSearchButton({
        active: state === 'active',
        size: 'md',
        state: state as 'default' | 'hover' | 'active' | 'disabled',
        disabled: state === 'disabled',
        placeholder: 'Buscar...',
        value: '',
        width: 248
      });
      wrapper.insertAdjacentHTML('beforeend', searchHTML);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Search buttons en todos los estados disponibles (default, hover, active, disabled).',
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
    active: true,
    size: 'md',
    state: 'active',
    disabled: false,
    placeholder: 'Buscar usuarios, productos...',
    value: 'Texto de b?squeda',
    width: 300,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Valor cambiado:', target.value);
    },
    onClick: (event: MouseEvent) => {
      console.log('Bot?n clickeado:', event);
    },
    onFocus: (event: FocusEvent) => {
      console.log('Input enfocado:', event);
    },
    onBlur: (event: FocusEvent) => {
      console.log('Input desenfocado:', event);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button completo con todas las opciones habilitadas: activo, placeholder, valor, ancho personalizado, y todos los callbacks.',
      },
    },
  },
};

/**
 * MinimalExample
 * Ejemplo m?nimo
 */
export const MinimalExample: Story = {
  name: 'Minimal Example',
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button m?nimo con solo las opciones esenciales (modo bot?n, tama?o md, estado default).',
      },
    },
  },
};

