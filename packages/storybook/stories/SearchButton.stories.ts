import type { Meta, StoryObj } from '@storybook/html';
import { renderSearchButton } from '../../components/search-button/src/SearchButtonProvider';
import type { SearchButtonOptions } from '../../components/search-button/src/types/SearchButtonOptions';
// Importar CSS del botón UBITS (necesario para el modo botón)
import '../../components/button/src/styles/button.css';
// Importar CSS del Search Button (necesario para el modo input)
import '../../components/search-button/src/styles/search-button.css';

const meta: Meta<SearchButtonOptions> = {
  title: 'Formularios/Search Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Search Button UBITS con modo botón e input. Cuando está activo, muestra un campo de búsqueda con icono. Cuando no está activo, muestra solo un botón con icono de lupa. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Si el botón está en modo activo (muestra input)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del botón (sm: 32px, md: 40px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del botón',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el botón está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder del input cuando está activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor del input cuando está activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Ancho del input cuando está activo (en px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '248' },
        category: 'Apariencia',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el valor del input',
      table: {
        disable: true,
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace click en el botón',
      table: {
        disable: true,
      },
    },
    onFocus: {
      action: 'focused',
      description: 'Función a ejecutar cuando el input recibe focus',
      table: {
        disable: true,
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'Función a ejecutar cuando el input pierde focus',
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
  },
};

export default meta;
type Story = StoryObj<SearchButtonOptions>;

export const Default: Story = {
  args: {
    active: false,
    size: 'md',
    state: 'default',
    disabled: false,
    placeholder: '',
    value: '',
    width: 248,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

      // Estado interno para manejar el toggle
      let isActive = args.active !== undefined ? args.active : false;
      let currentValue = args.value || '';
      let currentState = args.state || 'default';

      const renderSearchComponent = () => {
      // Si state es 'active', el buscador está desplegado
      const isSearchActive = isActive || currentState === 'active';
      
      const searchHTML = renderSearchButton({
        active: isSearchActive,
        size: args.size || 'md',
        state: currentState,
        disabled: args.disabled !== undefined ? args.disabled : false,
        placeholder: args.placeholder || '',
        value: currentValue,
        width: args.width || 248,
        className: args.className || '',
      });

      container.innerHTML = searchHTML;

      // Agregar interactividad: click en botón para desplegar input
      if (!isSearchActive) {
        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        if (buttonElement) {
          buttonElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isActive = true;
            currentState = 'active';
            if (args.onClick) {
              args.onClick(e);
            }
            renderSearchComponent();
            // Focus en el input después de un pequeño delay
            setTimeout(() => {
              const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
              if (inputElement) {
                inputElement.focus();
              }
            }, 50);
          });
        }
      } else {
        // Si está activo, agregar listeners para contraer y limpiar
        const inputElement = container.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        
        if (inputElement) {
          // Listener para mostrar/ocultar botón de limpiar cuando se escribe
          inputElement.addEventListener('input', (e) => {
            currentValue = inputElement.value;
            if (args.onChange) {
              args.onChange(e);
            }
            // Solo actualizar el botón de limpiar sin regenerar todo el HTML
            const clearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
            if (currentValue && currentValue.trim().length > 0) {
              // Mostrar botón de limpiar si no existe
              if (!clearButton) {
                const clearButtonHTML = `
                  <button
                    type="button"
                    class="ubits-search-button__clear"
                    aria-label="Limpiar búsqueda"
                    tabindex="0"
                  >
                    <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
                  </button>
                `;
                const inputWrapper = container.querySelector('.ubits-search-button__input-wrapper');
                if (inputWrapper) {
                  inputWrapper.insertAdjacentHTML('beforeend', clearButtonHTML);
                  const newClearButton = container.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
                  if (newClearButton) {
                    newClearButton.addEventListener('click', (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      currentValue = '';
                      if (inputElement) {
                        inputElement.value = '';
                        inputElement.focus();
                        if (args.onChange) {
                          const event = new Event('input', { bubbles: true });
                          inputElement.dispatchEvent(event);
                        }
                      }
                      // Ocultar botón de limpiar
                      if (newClearButton) {
                        newClearButton.remove();
                      }
                    });
                  }
                }
              }
            } else {
              // Ocultar botón de limpiar si existe
              if (clearButton) {
                clearButton.remove();
              }
            }
          });
          
          inputElement.addEventListener('change', (e) => {
            if (args.onChange) {
              args.onChange(e);
            }
          });
          
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
          
          // Blur para contraer cuando se hace click fuera (si el input está vacío)
          inputElement.addEventListener('blur', (e) => {
            if (args.onBlur) {
              args.onBlur(e);
            }
            // Solo contraer si el input está vacío
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
          
          if (args.onFocus) {
            inputElement.addEventListener('focus', (e) => {
              if (args.onFocus) {
                args.onFocus(e);
              }
            });
          }
        }
        
        // Botón de limpiar (X)
        if (clearButton) {
          clearButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentValue = '';
            if (inputElement) {
              inputElement.value = '';
              inputElement.focus();
              if (args.onChange) {
                const event = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(event);
              }
            }
            // Re-renderizar para ocultar el botón X
            renderSearchComponent();
          });
        }
      }
    };

    // Renderizar inicialmente
    renderSearchComponent();

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

// Helper para renderizar Search Button de manera consistente (versión simplificada para historias estáticas)
function renderSearchButtonStory(options: SearchButtonOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
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

  // Agregar event listeners básicos
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
 * Modo botón (no activo)
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
        story: 'Search button en modo botón (no activo, muestra solo el botón con icono de lupa).',
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
        story: 'Search button en modo input (activo, muestra el campo de búsqueda).',
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
        story: 'Search button con tamaño sm (32px).',
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
        story: 'Search button con tamaño md (40px, default).',
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
        story: 'Search button en estado active (despliega el input automáticamente).',
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
    value: 'Texto de búsqueda',
    width: 248
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button activo con valor en el input (muestra botón de limpiar).',
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
        story: 'Search button activo sin valor en el input (no muestra botón de limpiar).',
      },
    },
  },
};

/**
 * ActiveWithClearButton
 * Activo con botón de limpiar visible
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
        story: 'Search button activo con botón de limpiar visible (cuando hay texto en el input).',
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
      console.log('Botón clickeado:', event);
    }
  },
  render: (args) => renderSearchButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Search button en modo botón con callback onClick cuando se hace click.',
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
 * Todos los tamaños
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
        story: 'Search buttons en todos los tamaños disponibles (sm, md).',
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
    value: 'Texto de búsqueda',
    width: 300,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Valor cambiado:', target.value);
    },
    onClick: (event: MouseEvent) => {
      console.log('Botón clickeado:', event);
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
 * Ejemplo mínimo
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
        story: 'Search button mínimo con solo las opciones esenciales (modo botón, tamaño md, estado default).',
      },
    },
  },
};

