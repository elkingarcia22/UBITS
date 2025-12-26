import type { Meta, StoryObj } from '@storybook/html';
import { renderCheckbox } from '../../components/checkbox/src/CheckboxProvider';
import type { CheckboxOptions } from '../../components/checkbox/src/types/CheckboxOptions';
import '../../components/checkbox/src/styles/checkbox.css';

const meta: Meta<CheckboxOptions> = {
  title: 'Formularios/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label del checkbox',
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
      description: 'Valor del checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre del checkbox (para agrupar checkboxes)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está seleccionado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Tamaño del checkbox (sm: 16px, md: 20px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled', 'indeterminate'],
      description: 'Estado del checkbox',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | disabled | indeterminate' },
        category: 'Estado',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Si el checkbox está deshabilitado',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    onChange: {
      action: 'changed',
      description: 'Función a ejecutar cuando cambia el estado del checkbox',
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
type Story = StoryObj<CheckboxOptions>;

export const Default: Story = {
  args: {
    label: 'Label',
    complementaryText: undefined,
    value: '',
    name: '',
    checked: false,
    indeterminate: false,
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

    const renderCheckboxComponent = () => {
      const checkboxHTML = renderCheckbox({
        label: args.label || 'Label',
        complementaryText: args.complementaryText,
        value: args.value,
        name: args.name,
        checked: args.checked !== undefined ? args.checked : false,
        indeterminate: args.indeterminate !== undefined ? args.indeterminate : false,
        size: args.size || 'md',
        state: args.state || 'default',
        disabled: args.disabled !== undefined ? args.disabled : false,
        className: args.className || '',
      });

      container.innerHTML = checkboxHTML;

      // Agregar event listener para cambio
      const inputElement = container.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      
      if (inputElement) {
        // Aplicar estado indeterminado al input nativo si es necesario
        if (args.indeterminate) {
          inputElement.indeterminate = true;
        }
        if (args.onChange) {
          inputElement.addEventListener('change', (e) => {
            if (args.onChange) {
              args.onChange(e);
            }
          });
        }
      }
    };

    // Renderizar inicialmente
    renderCheckboxComponent();

    // Actualizar cuando cambian los args (similar a Radio Button)
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        renderCheckboxComponent();
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

// Helper para renderizar Checkbox de manera consistente
function renderCheckboxStory(options: CheckboxOptions) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.minHeight = '100px';

  const checkboxHTML = renderCheckbox({
    label: options.label || 'Label',
    complementaryText: options.complementaryText,
    value: options.value,
    name: options.name,
    checked: options.checked !== undefined ? options.checked : false,
    indeterminate: options.indeterminate !== undefined ? options.indeterminate : false,
    size: options.size || 'md',
    state: options.state || 'default',
    disabled: options.disabled !== undefined ? options.disabled : false,
    className: options.className || '',
  });

  container.innerHTML = checkboxHTML;

  // Agregar event listener para cambio
  const inputElement = container.querySelector('.ubits-checkbox__input') as HTMLInputElement;
  
  if (inputElement) {
    // Aplicar estado indeterminado al input nativo si es necesario
    if (options.indeterminate) {
      inputElement.indeterminate = true;
    }
    if (options.onChange) {
      inputElement.addEventListener('change', options.onChange);
    }
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
    label: 'Checkbox pequeño',
    size: 'sm',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con tamaño sm (16px).',
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
    label: 'Checkbox mediano',
    size: 'md',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con tamaño md (20px, default).',
      },
    },
  },
};

/**
 * Checked
 * Checkbox seleccionado
 */
export const Checked: Story = {
  name: 'Checked',
  args: {
    label: 'Checkbox seleccionado',
    checked: true
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox seleccionado (checked: true).',
      },
    },
  },
};

/**
 * Unchecked
 * Checkbox no seleccionado
 */
export const Unchecked: Story = {
  name: 'Unchecked',
  args: {
    label: 'Checkbox no seleccionado',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox no seleccionado (checked: false).',
      },
    },
  },
};

/**
 * Indeterminate
 * Checkbox en estado indeterminado
 */
export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: {
    label: 'Checkbox indeterminado',
    indeterminate: true
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en estado indeterminado (muestra línea horizontal en vez de check).',
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
    label: 'Checkbox default',
    state: 'default',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en estado default.',
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
    label: 'Checkbox hover',
    state: 'hover',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en estado hover.',
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
    label: 'Checkbox active',
    state: 'active',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en estado active.',
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
    label: 'Checkbox disabled',
    state: 'disabled',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en estado disabled.',
      },
    },
  },
};

/**
 * Disabled
 * Checkbox deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    label: 'Checkbox deshabilitado',
    disabled: true,
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox deshabilitado (disabled: true).',
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
    label: 'Checkbox con texto complementario',
    complementaryText: 'Este es un texto complementario que se muestra debajo del label',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con texto complementario.',
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
    label: 'Checkbox sin texto complementario',
    complementaryText: undefined,
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox sin texto complementario.',
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
    label: 'Checkbox con valor',
    value: 'checkbox-value-1',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con valor definido.',
      },
    },
  },
};

/**
 * WithName
 * Con nombre (para agrupar)
 */
export const WithName: Story = {
  name: 'With Name',
  args: {
    label: 'Checkbox con nombre',
    name: 'checkbox-group',
    value: 'option-1',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con nombre (para agrupar checkboxes).',
      },
    },
  },
};

/**
 * OnChangeCallback
 * Callback cuando cambia el estado
 */
export const OnChangeCallback: Story = {
  name: 'On Change Callback',
  args: {
    label: 'Checkbox con callback',
    checked: false,
    onChange: (event: Event) => {
      const target = event.target as HTMLInputElement;
      alert('Checkbox cambiado: ${target.checked ? 'seleccionado' : 'no seleccionado'}');
    }
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con callback onChange cuando cambia el estado.',
      },
    },
  },
};

/**
 * CheckedWithComplementaryText
 * Seleccionado con texto complementario
 */
export const CheckedWithComplementaryText: Story = {
  name: 'Checked - With Complementary Text',
  args: {
    label: 'Checkbox seleccionado',
    complementaryText: 'Este checkbox está seleccionado',
    checked: true
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox seleccionado con texto complementario.',
      },
    },
  },
};

/**
 * IndeterminateWithComplementaryText
 * Indeterminado con texto complementario
 */
export const IndeterminateWithComplementaryText: Story = {
  name: 'Indeterminate - With Complementary Text',
  args: {
    label: 'Checkbox indeterminado',
    complementaryText: 'Este checkbox está en estado indeterminado',
    indeterminate: true
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox indeterminado con texto complementario.',
      },
    },
  },
};

/**
 * DisabledWithComplementaryText
 * Deshabilitado con texto complementario
 */
export const DisabledWithComplementaryText: Story = {
  name: 'Disabled - With Complementary Text',
  args: {
    label: 'Checkbox deshabilitado',
    complementaryText: 'Este checkbox está deshabilitado',
    disabled: true,
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox deshabilitado con texto complementario.',
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
    label: 'Checkbox',
    checked: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '20px';
    container.style.alignItems = 'flex-start';

    const smCheckbox = renderCheckboxStory({ ...args, size: 'sm', label: 'Checkbox SM' });
    const mdCheckbox = renderCheckboxStory({ ...args, size: 'md', label: 'Checkbox MD' });

    container.appendChild(smCheckbox);
    container.appendChild(mdCheckbox);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en todos los tamaños disponibles (sm, md).',
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
    label: 'Checkbox',
    checked: false
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '20px';
    container.style.alignItems = 'flex-start';

    const defaultCheckbox = renderCheckboxStory({ ...args, state: 'default', label: 'Checkbox Default' });
    const hoverCheckbox = renderCheckboxStory({ ...args, state: 'hover', label: 'Checkbox Hover' });
    const activeCheckbox = renderCheckboxStory({ ...args, state: 'active', label: 'Checkbox Active' });
    const disabledCheckbox = renderCheckboxStory({ ...args, state: 'disabled', label: 'Checkbox Disabled' });

    container.appendChild(defaultCheckbox);
    container.appendChild(hoverCheckbox);
    container.appendChild(activeCheckbox);
    container.appendChild(disabledCheckbox);

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox en todos los estados disponibles (default, hover, active, disabled).',
      },
    },
  },
};

/**
 * CustomClassName
 * Con clase CSS personalizada
 */
export const CustomClassName: Story = {
  name: 'Custom Class Name',
  args: {
    label: 'Checkbox con clase personalizada',
    className: 'custom-checkbox-class',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox con clase CSS personalizada.',
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
    label: 'Checkbox completo',
    complementaryText: 'Este es un checkbox con todas las opciones habilitadas',
    value: 'complete-checkbox',
    name: 'checkbox-group',
    checked: true,
    size: 'md',
    state: 'default',
    disabled: false,
    onChange: (event: Event) => {
      console.log('Checkbox cambiado:', event);
    }
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox completo con todas las opciones habilitadas: label, texto complementario, valor, nombre, seleccionado, y callback.',
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
    label: 'Checkbox mínimo',
    checked: false
  },
  render: (args) => renderCheckboxStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Checkbox mínimo con solo las opciones esenciales (label).',
      },
    },
  },
};

