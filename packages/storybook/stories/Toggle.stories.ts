import type { Meta, StoryObj } from '@storybook/html';
import { renderToggle } from '../../components/toggle/src/ToggleProvider';
import type { ToggleOptions } from '../../components/toggle/src/types/ToggleOptions';
import '../../components/toggle/src/styles/toggle.css';

const meta: Meta<ToggleOptions> = {
  title: 'Formularios/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Toggle/Switch UBITS para activar/desactivar opciones. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label del toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    complementaryText: {
      control: { type: 'text' },
      description: 'Texto complementario opcional (se muestra debajo del label)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor del toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre del toggle (para agrupar toggles)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si el toggle está activado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del toggle (sm: 33x16px, md: 36x20px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del toggle',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el toggle está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el estado del toggle',
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
type Story = StoryObj<ToggleOptions>;

export const Default: Story = {
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const renderToggleComponent = () => {
      const toggleHTML = renderToggle({
        label: args.label,
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || '',
      });

      container.innerHTML = toggleHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-toggle__input') as HTMLInputElement;
      
      if (inputElement) {
        // Actualizar el estado checked cuando el usuario hace click
        inputElement.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          // Actualizar args.checked con el nuevo valor
          args.checked = target.checked;
          
          // Llamar al callback onChange si existe
          if (args.onChange) {
            args.onChange(e);
          }
        });
      }
    };

    // Renderizar inicialmente
    renderToggleComponent();

    // Actualizar cuando cambian los args (similar a Checkbox)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderToggleComponent();
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

// Helper para renderizar Toggle de manera consistente
function renderToggleStory(options: ToggleOptions) {
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

  const toggleHTML = renderToggle({
    label: options.label,
    complementaryText: options.complementaryText,
    value: options.value || '',
    name: options.name || '',
    checked: options.checked !== undefined ? options.checked : false,
    size: options.size || 'md',
    state: options.state || 'default',
    disabled: options.disabled !== undefined ? options.disabled : false,
    className: options.className || ''
  });

  container.innerHTML = toggleHTML;

  // Agregar event listener para cambio
  const inputElement = container.querySelector('.ubits-toggle__input') as HTMLInputElement;
  if (inputElement && options.onChange) {
    inputElement.addEventListener('change', options.onChange);
  }

  return container;
}

/**
 * SizeSM
 * Tamaño sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    label: 'Toggle pequeño',
    checked: false,
    size: 'sm',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con tamaño sm (33x16px).',
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
    label: 'Toggle mediano',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con tamaño md (36x20px, default).',
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
    label: 'Toggle default',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle en estado default.',
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
    label: 'Toggle hover',
    checked: false,
    size: 'md',
    state: 'hover',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle en estado hover.',
      },
    },
  },
};

/**
 * StateActive
 * Estado active
 */
export const StateActive: Story = {
  name: 'State - Active',
  args: {
    label: 'Toggle active',
    checked: false,
    size: 'md',
    state: 'active',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle en estado active.',
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
    label: 'Toggle disabled',
    checked: false,
    size: 'md',
    state: 'disabled',
    disabled: true
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle en estado disabled.',
      },
    },
  },
};

/**
 * Checked
 * Toggle activado
 */
export const Checked: Story = {
  name: 'Checked',
  args: {
    label: 'Toggle activado',
    checked: true,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle activado (checked).',
      },
    },
  },
};

/**
 * Unchecked
 * Toggle desactivado
 */
export const Unchecked: Story = {
  name: 'Unchecked',
  args: {
    label: 'Toggle desactivado',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle desactivado (unchecked).',
      },
    },
  },
};

/**
 * WithLabel
 * Con label
 */
export const WithLabel: Story = {
  name: 'With Label',
  args: {
    label: 'Activar notificaciones',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con label visible.',
      },
    },
  },
};

/**
 * WithoutLabel
 * Sin label
 */
export const WithoutLabel: Story = {
  name: 'Without Label',
  args: {
    label: undefined,
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle sin label.',
      },
    },
  },
};

/**
 * WithComplementaryText
 * Con texto complementario
 */
export const WithComplementaryText: Story = {
  name: 'With Complementary Text',
  args: {
    label: 'Activar modo oscuro',
    complementaryText: 'Cambiará el tema de la aplicación a modo oscuro',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con texto complementario debajo del label.',
      },
    },
  },
};

/**
 * WithoutComplementaryText
 * Sin texto complementario
 */
export const WithoutComplementaryText: Story = {
  name: 'Without Complementary Text',
  args: {
    label: 'Activar notificaciones',
    complementaryText: undefined,
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle sin texto complementario.',
      },
    },
  },
};

/**
 * Disabled
 * Toggle deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    label: 'Toggle deshabilitado',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: true
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle deshabilitado.',
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
    label: 'Toggle con callback',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Toggle cambiado:', target.checked);
    }
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con callback onChange cuando cambia el estado.',
      },
    },
  },
};

/**
 * WithValue
 * Con valor
 */
export const WithValue: Story = {
  name: 'With Value',
  args: {
    label: 'Toggle con valor',
    value: 'toggle-option-1',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con valor asignado.',
      },
    },
  },
};

/**
 * WithName
 * Con nombre
 */
export const WithName: Story = {
  name: 'With Name',
  args: {
    label: 'Toggle con nombre',
    name: 'toggle-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle con nombre asignado (para agrupar toggles).',
      },
    },
  },
};

/**
 * ToggleGroup
 * Grupo de toggles
 */
export const ToggleGroup: Story = {
  name: 'Toggle Group',
  args: {
    label: 'Toggle 1',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    const options = [
      { label: 'Notificaciones por email', checked: false },
      { label: 'Notificaciones push', checked: true },
      { label: 'Notificaciones SMS', checked: false }
    ];

    options.forEach((option, index) => {
      const toggleHTML = renderToggle({
        label: option.label,
        value: `toggle-${index}`,
        name: 'notification-group',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de toggles independientes (cada uno puede estar activado o desactivado).',
      },
    },
  },
};

/**
 * ToggleGroupWithSomeChecked
 * Grupo con algunos activados
 */
export const ToggleGroupWithSomeChecked: Story = {
  name: 'Toggle Group - With Some Checked',
  args: {
    label: 'Toggle 1',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    const options = [
      { label: 'Opción 1', checked: true },
      { label: 'Opción 2', checked: false },
      { label: 'Opción 3', checked: true },
      { label: 'Opción 4', checked: false }
    ];

    options.forEach((option, index) => {
      const toggleHTML = renderToggle({
        label: option.label,
        value: `toggle-${index}`,
        name: 'options-group',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de toggles con algunos pre-activados.',
      },
    },
  },
};

/**
 * ToggleGroupWithComplementaryText
 * Grupo con texto complementario
 */
export const ToggleGroupWithComplementaryText: Story = {
  name: 'Toggle Group - With Complementary Text',
  args: {
    label: 'Toggle 1',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    const options = [
      { label: 'Modo oscuro', complementaryText: 'Cambiará el tema a modo oscuro', checked: false },
      { label: 'Notificaciones', complementaryText: 'Recibirás notificaciones en tiempo real', checked: true },
      { label: 'Sincronización', complementaryText: 'Sincronizará tus datos automáticamente', checked: false }
    ];

    options.forEach((option, index) => {
      const toggleHTML = renderToggle({
        label: option.label,
        complementaryText: option.complementaryText,
        value: `toggle-${index}`,
        name: 'settings-group',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de toggles con texto complementario en cada opción.',
      },
    },
  },
};

/**
 * ToggleGroupDisabled
 * Grupo deshabilitado
 */
export const ToggleGroupDisabled: Story = {
  name: 'Toggle Group - Disabled',
  args: {
    label: 'Toggle 1',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    const options = [
      { label: 'Opción 1', checked: false, disabled: true },
      { label: 'Opción 2', checked: false, disabled: true },
      { label: 'Opción 3', checked: false, disabled: true }
    ];

    options.forEach((option, index) => {
      const toggleHTML = renderToggle({
        label: option.label,
        value: `toggle-${index}`,
        name: 'disabled-group',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: option.disabled
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de toggles deshabilitados.',
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
    label: 'Toggle',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    ['sm', 'md'].forEach((size) => {
      const toggleHTML = renderToggle({
        label: `Toggle ${size.toUpperCase()}`,
        checked: false,
        size: size as 'sm' | 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggles en todos los tamaños disponibles (sm, md).',
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
    label: 'Toggle',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 400px;
    `;

    ['default', 'hover', 'active', 'disabled'].forEach((state) => {
      const toggleHTML = renderToggle({
        label: `Toggle ${state.charAt(0).toUpperCase() + state.slice(1)}`,
        checked: false,
        size: 'md',
        state: state as 'default' | 'hover' | 'active' | 'disabled',
        disabled: state === 'disabled'
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = toggleHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggles en todos los estados disponibles (default, hover, active, disabled).',
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
    label: 'Activar modo oscuro',
    complementaryText: 'Cambiará el tema de la aplicación a modo oscuro',
    value: 'dark-mode',
    name: 'settings',
    checked: true,
    size: 'md',
    state: 'default',
    disabled: false,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Toggle cambiado:', target.checked, target.value);
    }
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle completo con todas las opciones habilitadas: label, texto complementario, valor, nombre, checked, y callback onChange.',
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
    label: 'Activar',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderToggleStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toggle mínimo con solo las opciones esenciales (label, tamaño md, estado default).',
      },
    },
  },
};

