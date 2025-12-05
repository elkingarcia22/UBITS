import type { Meta, StoryObj } from '@storybook/html';
import { renderRadioButton } from '../../components/radio-button/src/RadioButtonProvider';
import type { RadioButtonOptions } from '../../components/radio-button/src/types/RadioButtonOptions';
import '../../components/radio-button/src/styles/radio-button.css';

const meta: Meta<RadioButtonOptions> = {
  title: 'Formularios/Radio Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Radio Button UBITS para selección única en grupos. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label del radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
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
      description: 'Valor del radio button (para agrupar radio buttons)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'option1' },
        category: 'Contenido',
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre del grupo de radio buttons (para agrupar)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'group' },
        category: 'Contenido',
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si el radio button está seleccionado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del radio button (sm: 16px, md: 20px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Estado del radio button',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el radio button está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el estado del radio button',
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
type Story = StoryObj<RadioButtonOptions>;

export const Default: Story = {
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: 'option1',
    name: 'group',
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

    const renderRadioButtonComponent = () => {
      const radioButtonHTML = renderRadioButton({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value || 'option1',
        name: args.name || 'group',
        checked: args.checked !== undefined ? args.checked : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || '',
      });

      container.innerHTML = radioButtonHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      
      if (inputElement && args.onChange) {
        inputElement.addEventListener('change', (e) => {
          if (args.onChange) {
            args.onChange(e);
          }
        });
      }
    };

    // Renderizar inicialmente
    renderRadioButtonComponent();

    // Actualizar cuando cambian los args (similar a Popover)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderRadioButtonComponent();
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

// Helper para renderizar Radio Button de manera consistente
function renderRadioButtonStory(options: RadioButtonOptions) {
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

  const radioButtonHTML = renderRadioButton({
    label: options.label || 'Label',
    complementaryText: options.complementaryText,
    value: options.value || 'option1',
    name: options.name || 'group',
    checked: options.checked !== undefined ? options.checked : false,
    size: options.size || 'md',
    state: options.state || 'default',
    disabled: options.disabled !== undefined ? options.disabled : false,
    className: options.className || '',
  });

  container.innerHTML = radioButtonHTML;

  // Agregar event listener para cambio
  const inputElement = container.querySelector('.ubits-radio-button__input') as HTMLInputElement;
  if (inputElement && options.onChange) {
    inputElement.addEventListener('change', (e) => {
      if (options.onChange) {
        options.onChange(e);
      }
    });
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
    label: 'Opción pequeña',
    value: 'option1',
    name: 'size-group',
    checked: false,
    size: 'sm',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button con tamaño sm (16px).',
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
    label: 'Opción mediana',
    value: 'option1',
    name: 'size-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button con tamaño md (20px, default).',
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
    label: 'Opción default',
    value: 'option1',
    name: 'state-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button en estado default.',
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
    label: 'Opción hover',
    value: 'option1',
    name: 'state-group',
    checked: false,
    size: 'md',
    state: 'hover',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button en estado hover.',
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
    label: 'Opción active',
    value: 'option1',
    name: 'state-group',
    checked: false,
    size: 'md',
    state: 'active',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button en estado active.',
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
    label: 'Opción disabled',
    value: 'option1',
    name: 'state-group',
    checked: false,
    size: 'md',
    state: 'disabled',
    disabled: true
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button en estado disabled.',
      },
    },
  },
};

/**
 * Checked
 * Radio button seleccionado
 */
export const Checked: Story = {
  name: 'Checked',
  args: {
    label: 'Opción seleccionada',
    value: 'option1',
    name: 'checked-group',
    checked: true,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button seleccionado (checked).',
      },
    },
  },
};

/**
 * Unchecked
 * Radio button no seleccionado
 */
export const Unchecked: Story = {
  name: 'Unchecked',
  args: {
    label: 'Opción no seleccionada',
    value: 'option1',
    name: 'unchecked-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button no seleccionado (unchecked).',
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
    label: 'Opción con descripción',
    complementaryText: 'Esta es una descripción complementaria del radio button',
    value: 'option1',
    name: 'complementary-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button con texto complementario debajo del label.',
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
    label: 'Opción sin descripción',
    complementaryText: undefined,
    value: 'option1',
    name: 'no-complementary-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button sin texto complementario.',
      },
    },
  },
};

/**
 * Disabled
 * Radio button deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    label: 'Opción deshabilitada',
    value: 'option1',
    name: 'disabled-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: true
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button deshabilitado.',
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
    label: 'Opción con callback',
    value: 'option1',
    name: 'callback-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Radio button cambiado:', target.value, target.checked);
    }
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button con callback onChange cuando cambia el estado.',
      },
    },
  },
};

/**
 * RadioGroup
 * Grupo de radio buttons
 */
export const RadioGroup: Story = {
  name: 'Radio Group',
  args: {
    label: 'Opción 1',
    value: 'option1',
    name: 'radio-group',
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
      { label: 'Opción 1', value: 'option1', checked: false },
      { label: 'Opción 2', value: 'option2', checked: false },
      { label: 'Opción 3', value: 'option3', checked: false }
    ];

    options.forEach((option) => {
      const radioButtonHTML = renderRadioButton({
        label: option.label,
        value: option.value,
        name: 'radio-group',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);

      // Agregar event listener
      const inputElement = wrapper.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (inputElement) {
        inputElement.addEventListener('change', (e) => {
          // Desmarcar todos los demás
          const allInputs = container.querySelectorAll('.ubits-radio-button__input') as NodeListOf<HTMLInputElement>;
          allInputs.forEach((input) => {
            if (input !== e.target) {
              input.checked = false;
              input.closest('.ubits-radio-button')?.classList.remove('ubits-radio-button--checked');
            } else {
              input.closest('.ubits-radio-button')?.classList.add('ubits-radio-button--checked');
            }
          });
        });
      }
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de radio buttons donde solo uno puede estar seleccionado.',
      },
    },
  },
};

/**
 * RadioGroupWithOneChecked
 * Grupo con uno seleccionado
 */
export const RadioGroupWithOneChecked: Story = {
  name: 'Radio Group - With One Checked',
  args: {
    label: 'Opción 1',
    value: 'option1',
    name: 'radio-group-checked',
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
      { label: 'Opción 1', value: 'option1', checked: false },
      { label: 'Opción 2', value: 'option2', checked: true },
      { label: 'Opción 3', value: 'option3', checked: false }
    ];

    options.forEach((option) => {
      const radioButtonHTML = renderRadioButton({
        label: option.label,
        value: option.value,
        name: 'radio-group-checked',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);

      // Agregar event listener
      const inputElement = wrapper.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (inputElement) {
        inputElement.addEventListener('change', (e) => {
          // Desmarcar todos los demás
          const allInputs = container.querySelectorAll('.ubits-radio-button__input') as NodeListOf<HTMLInputElement>;
          allInputs.forEach((input) => {
            if (input !== e.target) {
              input.checked = false;
              input.closest('.ubits-radio-button')?.classList.remove('ubits-radio-button--checked');
            } else {
              input.checked = true;
              input.closest('.ubits-radio-button')?.classList.add('ubits-radio-button--checked');
            }
          });
        });
      }
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de radio buttons con uno pre-seleccionado.',
      },
    },
  },
};

/**
 * RadioGroupWithComplementaryText
 * Grupo con texto complementario
 */
export const RadioGroupWithComplementaryText: Story = {
  name: 'Radio Group - With Complementary Text',
  args: {
    label: 'Opción 1',
    value: 'option1',
    name: 'radio-group-complementary',
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
      { label: 'Opción Básica', complementaryText: 'Ideal para usuarios nuevos', value: 'option1', checked: false },
      { label: 'Opción Avanzada', complementaryText: 'Para usuarios experimentados', value: 'option2', checked: false },
      { label: 'Opción Premium', complementaryText: 'Con todas las funcionalidades', value: 'option3', checked: true }
    ];

    options.forEach((option) => {
      const radioButtonHTML = renderRadioButton({
        label: option.label,
        complementaryText: option.complementaryText,
        value: option.value,
        name: 'radio-group-complementary',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);

      // Agregar event listener
      const inputElement = wrapper.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (inputElement) {
        inputElement.addEventListener('change', (e) => {
          // Desmarcar todos los demás
          const allInputs = container.querySelectorAll('.ubits-radio-button__input') as NodeListOf<HTMLInputElement>;
          allInputs.forEach((input) => {
            if (input !== e.target) {
              input.checked = false;
              input.closest('.ubits-radio-button')?.classList.remove('ubits-radio-button--checked');
            } else {
              input.checked = true;
              input.closest('.ubits-radio-button')?.classList.add('ubits-radio-button--checked');
            }
          });
        });
      }
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de radio buttons con texto complementario en cada opción.',
      },
    },
  },
};

/**
 * RadioGroupDisabled
 * Grupo deshabilitado
 */
export const RadioGroupDisabled: Story = {
  name: 'Radio Group - Disabled',
  args: {
    label: 'Opción 1',
    value: 'option1',
    name: 'radio-group-disabled',
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
      { label: 'Opción 1', value: 'option1', checked: false, disabled: true },
      { label: 'Opción 2', value: 'option2', checked: false, disabled: true },
      { label: 'Opción 3', value: 'option3', checked: false, disabled: true }
    ];

    options.forEach((option) => {
      const radioButtonHTML = renderRadioButton({
        label: option.label,
        value: option.value,
        name: 'radio-group-disabled',
        checked: option.checked,
        size: 'md',
        state: 'default',
        disabled: option.disabled
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Grupo de radio buttons deshabilitados.',
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
    label: 'Radio button',
    value: 'option1',
    name: 'all-sizes-group',
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
      const radioButtonHTML = renderRadioButton({
        label: `Radio button ${size.toUpperCase()}`,
        value: `option-${size}`,
        name: 'all-sizes-group',
        checked: false,
        size: size as 'sm' | 'md',
        state: 'default',
        disabled: false
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons en todos los tamaños disponibles (sm, md).',
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
    label: 'Radio button',
    value: 'option1',
    name: 'all-states-group',
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
      const radioButtonHTML = renderRadioButton({
        label: `Radio button ${state.charAt(0).toUpperCase() + state.slice(1)}`,
        value: `option-${state}`,
        name: 'all-states-group',
        checked: false,
        size: 'md',
        state: state as 'default' | 'hover' | 'active' | 'disabled',
        disabled: state === 'disabled'
      });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = radioButtonHTML;
      container.appendChild(wrapper.firstElementChild as HTMLLabelElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons en todos los estados disponibles (default, hover, active, disabled).',
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
    label: 'Opción completa',
    complementaryText: 'Esta es una descripción complementaria del radio button con todas las opciones habilitadas',
    value: 'option1',
    name: 'complete-group',
    checked: true,
    size: 'md',
    state: 'default',
    disabled: false,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      console.log('Radio button cambiado:', target.value, target.checked);
    }
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button completo con todas las opciones habilitadas: label, texto complementario, checked, y callback onChange.',
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
    label: 'Opción mínima',
    value: 'option1',
    name: 'minimal-group',
    checked: false,
    size: 'md',
    state: 'default',
    disabled: false
  },
  render: (args) => renderRadioButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Radio button mínimo con solo las opciones esenciales (label, value, name).',
      },
    },
  },
};

