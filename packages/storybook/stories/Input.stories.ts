import type { Meta, StoryObj } from '@storybook/html';
import { renderInput, createInput } from '../../components/input/src/InputProvider';
import type { InputOptions, InputType, InputSize, InputState, MandatoryType, SelectOption, AutocompleteOption } from '../../components/input/src/types/InputOptions';

const meta: Meta<InputOptions> = {
  title: 'Formularios/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label',
      table: {
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto del placeholder',
      table: {
        defaultValue: { summary: '' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda (helper text)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'select', 'textarea', 'search', 'autocomplete', 'calendar'],
      description: 'Tipo de input',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del input',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'active', 'invalid', 'disabled'],
      description: 'Estado del input',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | focus | active | invalid | disabled' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar label',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showHelper: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar helper text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showCounter: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar contador de caracteres',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Máximo de caracteres para el contador',
      table: {
        defaultValue: { summary: '50' },
      },
    },
    mandatory: {
      control: { type: 'boolean' },
      description: 'Mostrar texto mandatory/optional',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    mandatoryType: {
      control: { type: 'select' },
      options: ['obligatorio', 'opcional'],
      description: 'Tipo de mandatory',
      table: {
        defaultValue: { summary: 'obligatorio' },
        type: { summary: 'obligatorio | opcional' },
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icono izquierdo (nombre FontAwesome sin prefijo, ej: user)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icono derecho (nombre FontAwesome sin prefijo, ej: check)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor inicial del input',
      table: {
        defaultValue: { summary: '' },
      },
    },
    showRichTextToolbar: {
      control: { type: 'boolean' },
      description: 'Mostrar/ocultar barra de herramientas de texto enriquecido (solo para textarea)',
      table: {
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'type', eq: 'textarea' },
    },
  },
};

export default meta;
type Story = StoryObj<InputOptions>;

// Helper para generar opciones de ejemplo para select y autocomplete
function generateSelectOptions(count: number = 20): SelectOption[] {
  return Array.from({ length: count }, (_, i) => ({
    value: `opt-${i + 1}`,
    text: `Opción ${i + 1}`
  }));
}

function generateAutocompleteOptions(): AutocompleteOption[] {
  return [
    { value: 'apple', text: 'Manzana' },
    { value: 'banana', text: 'Banana' },
    { value: 'orange', text: 'Naranja' },
    { value: 'grape', text: 'Uva' },
    { value: 'strawberry', text: 'Fresa' },
    { value: 'watermelon', text: 'Sandía' },
    { value: 'pineapple', text: 'Piña' },
    { value: 'mango', text: 'Mango' },
    { value: 'kiwi', text: 'Kiwi' },
    { value: 'peach', text: 'Durazno' },
    { value: 'cherry', text: 'Cereza' },
    { value: 'blueberry', text: 'Arándano' },
    { value: 'papaya', text: 'Papaya' },
    { value: 'coconut', text: 'Coco' },
    { value: 'avocado', text: 'Aguacate' }
  ];
}

export const Default: Story = {
  args: {
    containerId: 'input-storybook-container',
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    type: 'text',
    size: 'md',
    state: 'default',
    showLabel: true,
    showHelper: false,
    showCounter: false,
    maxLength: 50,
    mandatory: false,
    mandatoryType: 'obligatorio',
    leftIcon: '',
    rightIcon: '',
    value: '',
    showRichTextToolbar: false,
  },
  render: (args) => {
    // Crear contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px;';
    
    // Generar un ID único para el contenedor del input
    const containerId = `input-storybook-${Math.random().toString(36).substr(2, 9)}`;
    
    // Preparar opciones según el tipo
    // El textarea no debe mostrar iconos
    const finalLeftIcon = args.type === 'textarea' ? '' : args.leftIcon;
    const finalRightIcon = args.type === 'textarea' ? '' : args.rightIcon;
    
    const inputOptions: InputOptions = {
      ...args,
      containerId,
      leftIcon: finalLeftIcon,
      rightIcon: finalRightIcon,
      selectOptions: args.type === 'select' ? generateSelectOptions(20) : undefined,
      autocompleteOptions: args.type === 'autocomplete' ? generateAutocompleteOptions() : undefined,
    };
    
    try {
      // Crear contenedor interno para el input
      const inputContainer = document.createElement('div');
      inputContainer.id = containerId;
      wrapper.appendChild(inputContainer);
      
      // Después de agregar el contenedor al wrapper, usar createInput
      // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = document.getElementById(containerId);
          if (container) {
            // createInput buscará el contenedor y renderizará el HTML + inicializará funcionalidades interactivas
            try {
              createInput(inputOptions);
            } catch (err) {
              console.error('Error creating input:', err);
              // Fallback: usar renderInput si createInput falla
              const inputHTML = renderInput(inputOptions);
              container.innerHTML = inputHTML;
            }
          } else {
            console.error(`Container with ID "${containerId}" not found`);
          }
        });
      });
      
      // Panel de información
      const infoPanel = document.createElement('div');
      infoPanel.style.cssText = `
        margin-top: 20px;
        padding: 16px;
        background: var(--modifiers-normal-color-light-bg-2);
        border-radius: 8px;
        font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-medium);
      `;
      
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Input</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tipo:</strong> ${args.type}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tamaño:</strong> ${args.size}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Estado:</strong> ${args.state}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Label:</strong> ${args.showLabel ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Helper:</strong> ${args.showHelper ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Counter:</strong> ${args.showCounter ? 'Visible' : 'Oculto'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Mandatory:</strong> ${args.mandatory ? args.mandatoryType : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> ${finalLeftIcon ? `Izq: ${finalLeftIcon}` : ''} ${finalRightIcon ? `Der: ${finalRightIcon}` : 'Ninguno'}</div>
          ${args.type === 'textarea' ? `<div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Barra de herramientas:</strong> ${args.showRichTextToolbar ? 'Visible' : 'Oculta'}</div>` : ''}
        </div>
      `;
      
      wrapper.appendChild(infoPanel);
      
    } catch (error) {
      console.error('Error rendering input:', error);
      wrapper.innerHTML = `<div style="color: red; padding: 16px;">Error: ${error}</div>`;
    }
    
    return wrapper;
  },
};

// Helper para renderizar Input de manera consistente
function renderInputStory(options: InputOptions) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px;';
  
  // Generar un ID único para el contenedor del input
  const containerId = `input-storybook-${Math.random().toString(36).substr(2, 9)}`;
  
  // Preparar opciones según el tipo
  // El textarea no debe mostrar iconos
  const finalLeftIcon = options.type === 'textarea' ? '' : options.leftIcon;
  const finalRightIcon = options.type === 'textarea' ? '' : options.rightIcon;
  
  const inputOptions: InputOptions = {
    ...options,
    containerId,
    leftIcon: finalLeftIcon,
    rightIcon: finalRightIcon,
    selectOptions: options.type === 'select' ? (options.selectOptions || generateSelectOptions(20)) : undefined,
    autocompleteOptions: options.type === 'autocomplete' ? (options.autocompleteOptions || generateAutocompleteOptions()) : undefined,
  };
  
  try {
    // Crear contenedor interno para el input
    const inputContainer = document.createElement('div');
    inputContainer.id = containerId;
    wrapper.appendChild(inputContainer);
    
    // Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const container = document.getElementById(containerId);
        if (container) {
          try {
            createInput(inputOptions);
          } catch (err) {
            console.error('Error creating input:', err);
            // Fallback: usar renderInput si createInput falla
            const inputHTML = renderInput(inputOptions);
            container.innerHTML = inputHTML;
          }
        }
      });
    });
  } catch (error) {
    console.error('Error rendering input:', error);
    wrapper.innerHTML = `<div style="color: red; padding: 16px;">Error: ${error}</div>`;
  }
  
  return wrapper;
}

/**
 * TypeText
 * Tipo text
 */
export const TypeText: Story = {
  name: 'Type - Text',
  args: {
    containerId: 'input-text-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo text.',
      },
    },
  },
};

/**
 * TypeEmail
 * Tipo email
 */
export const TypeEmail: Story = {
  name: 'Type - Email',
  args: {
    containerId: 'input-email-container',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    type: 'email',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo email.',
      },
    },
  },
};

/**
 * TypePassword
 * Tipo password (con toggle)
 */
export const TypePassword: Story = {
  name: 'Type - Password',
  args: {
    containerId: 'input-password-container',
    label: 'Contraseña',
    placeholder: 'Escribe tu contraseña',
    type: 'password',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo password con toggle para mostrar/ocultar contraseña.',
      },
    },
  },
};

/**
 * TypeNumber
 * Tipo number
 */
export const TypeNumber: Story = {
  name: 'Type - Number',
  args: {
    containerId: 'input-number-container',
    label: 'Cantidad',
    placeholder: '0',
    type: 'number',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo number.',
      },
    },
  },
};

/**
 * TypeTel
 * Tipo tel
 */
export const TypeTel: Story = {
  name: 'Type - Tel',
  args: {
    containerId: 'input-tel-container',
    label: 'Teléfono',
    placeholder: '+57 300 123 4567',
    type: 'tel',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo tel.',
      },
    },
  },
};

/**
 * TypeURL
 * Tipo url
 */
export const TypeURL: Story = {
  name: 'Type - URL',
  args: {
    containerId: 'input-url-container',
    label: 'URL',
    placeholder: 'https://ejemplo.com',
    type: 'url',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo url.',
      },
    },
  },
};

/**
 * TypeSelect
 * Tipo select
 */
export const TypeSelect: Story = {
  name: 'Type - Select',
  args: {
    containerId: 'input-select-container',
    label: 'Selecciona una opción',
    placeholder: 'Elige una opción',
    type: 'select',
    size: 'md',
    state: 'default',
    selectOptions: generateSelectOptions(20)
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo select con dropdown de opciones.',
      },
    },
  },
};

/**
 * TypeTextarea
 * Tipo textarea
 */
export const TypeTextarea: Story = {
  name: 'Type - Textarea',
  args: {
    containerId: 'input-textarea-container',
    label: 'Descripción',
    placeholder: 'Escribe una descripción',
    type: 'textarea',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo textarea (campo multilínea).',
      },
    },
  },
};

/**
 * TypeSearch
 * Tipo search (con botón clear)
 */
export const TypeSearch: Story = {
  name: 'Type - Search',
  args: {
    containerId: 'input-search-container',
    label: 'Buscar',
    placeholder: 'Buscar...',
    type: 'search',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo search con botón clear.',
      },
    },
  },
};

/**
 * TypeAutocomplete
 * Tipo autocomplete
 */
export const TypeAutocomplete: Story = {
  name: 'Type - Autocomplete',
  args: {
    containerId: 'input-autocomplete-container',
    label: 'Fruta',
    placeholder: 'Busca una fruta...',
    type: 'autocomplete',
    size: 'md',
    state: 'default',
    autocompleteOptions: generateAutocompleteOptions()
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo autocomplete con sugerencias.',
      },
    },
  },
};

/**
 * TypeCalendar
 * Tipo calendar
 */
export const TypeCalendar: Story = {
  name: 'Type - Calendar',
  args: {
    containerId: 'input-calendar-container',
    label: 'Fecha',
    placeholder: 'Selecciona una fecha',
    type: 'calendar',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo calendar con date picker.',
      },
    },
  },
};

/**
 * SizeXS
 * Tamaño xs
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    containerId: 'input-xs-container',
    label: 'Input pequeño',
    placeholder: 'XS',
    type: 'text',
    size: 'xs',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con tamaño xs (28px).',
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
    containerId: 'input-sm-container',
    label: 'Input pequeño',
    placeholder: 'SM',
    type: 'text',
    size: 'sm',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con tamaño sm (32px).',
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
    containerId: 'input-md-container',
    label: 'Input mediano',
    placeholder: 'MD',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con tamaño md (40px, default).',
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
    containerId: 'input-lg-container',
    label: 'Input grande',
    placeholder: 'LG',
    type: 'text',
    size: 'lg',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con tamaño lg (48px).',
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
    containerId: 'input-default-container',
    label: 'Input default',
    placeholder: 'Estado default',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado default.',
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
    containerId: 'input-hover-container',
    label: 'Input hover',
    placeholder: 'Estado hover',
    type: 'text',
    size: 'md',
    state: 'hover'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado hover.',
      },
    },
  },
};

/**
 * StateFocus
 * Estado focus
 */
export const StateFocus: Story = {
  name: 'State - Focus',
  args: {
    containerId: 'input-focus-container',
    label: 'Input focus',
    placeholder: 'Estado focus',
    type: 'text',
    size: 'md',
    state: 'focus'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado focus.',
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
    containerId: 'input-active-container',
    label: 'Input active',
    placeholder: 'Estado active',
    type: 'text',
    size: 'md',
    state: 'active'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado active.',
      },
    },
  },
};

/**
 * StateInvalid
 * Estado invalid
 */
export const StateInvalid: Story = {
  name: 'State - Invalid',
  args: {
    containerId: 'input-invalid-container',
    label: 'Input invalid',
    placeholder: 'Estado invalid',
    type: 'text',
    size: 'md',
    state: 'invalid',
    helperText: 'Este campo es requerido'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado invalid.',
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
    containerId: 'input-disabled-container',
    label: 'Input disabled',
    placeholder: 'Estado disabled',
    type: 'text',
    size: 'md',
    state: 'disabled'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input en estado disabled.',
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
    containerId: 'input-with-label-container',
    label: 'Nombre completo',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    showLabel: true
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con label visible.',
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
    containerId: 'input-without-label-container',
    label: '',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    showLabel: false
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input sin label.',
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
    containerId: 'input-with-placeholder-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre aquí',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con placeholder.',
      },
    },
  },
};

/**
 * WithHelperText
 * Con helper text
 */
export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    containerId: 'input-with-helper-container',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    helperText: 'Ingresa tu correo electrónico válido',
    type: 'email',
    size: 'md',
    state: 'default',
    showHelper: true
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con helper text visible.',
      },
    },
  },
};

/**
 * ShowCounter
 * Mostrar contador
 */
export const ShowCounter: Story = {
  name: 'Show Counter',
  args: {
    containerId: 'input-counter-container',
    label: 'Descripción',
    placeholder: 'Escribe una descripción',
    type: 'text',
    size: 'md',
    state: 'default',
    showCounter: true,
    maxLength: 100
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con contador de caracteres visible.',
      },
    },
  },
};

/**
 * MandatoryObligatorio
 * Mandatory obligatorio
 */
export const MandatoryObligatorio: Story = {
  name: 'Mandatory - Obligatorio',
  args: {
    containerId: 'input-mandatory-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    mandatory: true,
    mandatoryType: 'obligatorio'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con texto mandatory (obligatorio).',
      },
    },
  },
};

/**
 * MandatoryOpcional
 * Mandatory opcional
 */
export const MandatoryOpcional: Story = {
  name: 'Mandatory - Opcional',
  args: {
    containerId: 'input-optional-container',
    label: 'Apellido',
    placeholder: 'Escribe tu apellido',
    type: 'text',
    size: 'md',
    state: 'default',
    mandatory: true,
    mandatoryType: 'opcional'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con texto mandatory (opcional).',
      },
    },
  },
};

/**
 * WithLeftIcon
 * Con icono izquierdo
 */
export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  args: {
    containerId: 'input-left-icon-container',
    label: 'Usuario',
    placeholder: 'Nombre de usuario',
    type: 'text',
    size: 'md',
    state: 'default',
    leftIcon: 'user'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con icono izquierdo.',
      },
    },
  },
};

/**
 * WithRightIcon
 * Con icono derecho
 */
export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    containerId: 'input-right-icon-container',
    label: 'Validado',
    placeholder: 'Campo validado',
    type: 'text',
    size: 'md',
    state: 'default',
    rightIcon: 'check'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con icono derecho.',
      },
    },
  },
};

/**
 * WithBothIcons
 * Con ambos iconos
 */
export const WithBothIcons: Story = {
  name: 'With Both Icons',
  args: {
    containerId: 'input-both-icons-container',
    label: 'Búsqueda',
    placeholder: 'Buscar...',
    type: 'text',
    size: 'md',
    state: 'default',
    leftIcon: 'search',
    rightIcon: 'filter'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con icono izquierdo y derecho.',
      },
    },
  },
};

/**
 * WithValue
 * Con valor inicial
 */
export const WithValue: Story = {
  name: 'With Value',
  args: {
    containerId: 'input-value-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    value: 'Juan Pérez'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con valor inicial.',
      },
    },
  },
};

/**
 * SelectWithManyOptions
 * Select con muchas opciones (scroll infinito)
 */
export const SelectWithManyOptions: Story = {
  name: 'Select - With Many Options',
  args: {
    containerId: 'input-select-many-container',
    label: 'Selecciona una opción',
    placeholder: 'Elige una opción',
    type: 'select',
    size: 'md',
    state: 'default',
    selectOptions: generateSelectOptions(100)
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo select con muchas opciones (scroll infinito automático con 50+ opciones).',
      },
    },
  },
};

/**
 * TextareaWithRichTextToolbar
 * Textarea con barra de herramientas
 */
export const TextareaWithRichTextToolbar: Story = {
  name: 'Textarea - With Rich Text Toolbar',
  args: {
    containerId: 'input-textarea-toolbar-container',
    label: 'Descripción',
    placeholder: 'Escribe una descripción',
    type: 'textarea',
    size: 'md',
    state: 'default',
    showRichTextToolbar: true
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input de tipo textarea con barra de herramientas de texto enriquecido.',
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
    containerId: 'input-onchange-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    onChange: (value: string) => {
      console.log('Valor cambiado:', value);
    }
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con callback onChange cuando cambia el valor.',
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
    containerId: 'input-onfocus-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    onFocus: (value: string) => {
      console.log('Input enfocado:', value);
    }
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con callback onFocus cuando se enfoca.',
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
    containerId: 'input-onblur-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default',
    onBlur: (value: string) => {
      console.log('Input desenfocado:', value);
    }
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input con callback onBlur cuando se desenfoca.',
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
    containerId: 'input-all-sizes-container',
    label: 'Input',
    placeholder: 'Tamaño',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px; display: flex; flex-direction: column; gap: 20px;';
    
    ['xs', 'sm', 'md', 'lg'].forEach(size => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const storyArgs = { ...args, containerId: `input-size-${size}-${Date.now()}`, size: size as InputSize, label: `Input ${size.toUpperCase()}` };
      const rendered = renderInputStory(storyArgs);
      container.appendChild(rendered);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Input en todos los tamaños disponibles (xs, sm, md, lg).',
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
    containerId: 'input-all-states-container',
    label: 'Input',
    placeholder: 'Estado',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px; display: flex; flex-direction: column; gap: 20px;';
    
    ['default', 'hover', 'focus', 'active', 'invalid', 'disabled'].forEach(state => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const storyArgs = { ...args, containerId: `input-state-${state}-${Date.now()}`, state: state as InputState, label: `Input ${state.charAt(0).toUpperCase() + state.slice(1)}` };
      const rendered = renderInputStory(storyArgs);
      container.appendChild(rendered);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Input en todos los estados disponibles (default, hover, focus, active, invalid, disabled).',
      },
    },
  },
};

/**
 * AllTypes
 * Todos los tipos
 */
export const AllTypes: Story = {
  name: 'All Types',
  args: {
    containerId: 'input-all-types-container',
    label: 'Input',
    placeholder: 'Tipo',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'max-width: 600px; margin: 20px auto; padding: 20px; display: flex; flex-direction: column; gap: 20px;';
    
    const types: InputType[] = ['text', 'email', 'password', 'number', 'tel', 'url', 'select', 'textarea', 'search', 'autocomplete', 'calendar'];
    const typeLabels: Record<InputType, string> = {
      text: 'Text',
      email: 'Email',
      password: 'Password',
      number: 'Number',
      tel: 'Tel',
      url: 'URL',
      select: 'Select',
      textarea: 'Textarea',
      search: 'Search',
      autocomplete: 'Autocomplete',
      calendar: 'Calendar'
    };
    
    types.forEach(type => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const storyArgs: InputOptions = {
        ...args,
        containerId: `input-type-${type}-${Date.now()}`,
        type,
        label: `Input ${typeLabels[type]}`,
        placeholder: type === 'select' ? 'Elige una opción' : type === 'textarea' ? 'Escribe aquí...' : `Placeholder ${type}`,
        selectOptions: type === 'select' ? generateSelectOptions(20) : undefined,
        autocompleteOptions: type === 'autocomplete' ? generateAutocompleteOptions() : undefined
      };
      const rendered = renderInputStory(storyArgs);
      container.appendChild(rendered);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Input en todos los tipos disponibles (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar).',
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
    containerId: 'input-complete-container',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    helperText: 'Ingresa tu correo electrónico válido',
    type: 'email',
    size: 'md',
    state: 'default',
    showLabel: true,
    showHelper: true,
    showCounter: true,
    maxLength: 100,
    mandatory: true,
    mandatoryType: 'obligatorio',
    leftIcon: 'envelope',
    rightIcon: 'check',
    value: '',
    onChange: (value: string) => console.log('Valor:', value),
    onFocus: (value: string) => console.log('Focus:', value),
    onBlur: (value: string) => console.log('Blur:', value)
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input completo con todas las opciones habilitadas: label, placeholder, helper text, contador, mandatory, iconos, y callbacks.',
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
    containerId: 'input-minimal-container',
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
    type: 'text',
    size: 'md',
    state: 'default'
  },
  render: (args) => renderInputStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Input mínimo con solo las opciones esenciales (label, placeholder, tipo text).',
      },
    },
  },
};

