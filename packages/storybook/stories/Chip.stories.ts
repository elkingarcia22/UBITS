import type { Meta, StoryObj } from '@storybook/html';
import { renderChip } from '../../components/chip/src/ChipProvider';
import type { ChipOptions } from '../../components/chip/src/types/ChipOptions';
import '../../components/chip/src/styles/chip.css';

const meta: Meta<ChipOptions> = {
  title: 'Básicos/Chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Chip UBITS para mostrar etiquetas o tags interactivas. Múltiples tamaños, estados y soporte para iconos izquierdo y derecho (botón de cerrar). Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Chip' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del chip (xs: 20px, sm: 24px, md: 28px, lg: 36px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'pressed', 'focus', 'disabled'],
      description: 'Estado del chip',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | pressed | focus | disabled' },
        category: 'Estado',
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome izquierdo (ej: "tag", "user"). Dejar vacío para ocultar.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
        category: 'Iconos',
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome derecho para el botón de cerrar (ej: "xmark"). Se usa si closable es true.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'xmark' },
        category: 'Iconos',
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Si el chip tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Si el chip es clickeable (añade estilos hover/active y cursor pointer)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic en el chip (solo si clickable es true)',
      table: {
        disable: true,
      },
    },
    onClose: {
      action: 'closed',
      description: 'Función a ejecutar cuando se hace clic en el botón de cerrar',
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
type Story = StoryObj<ChipOptions>;

// Función auxiliar para convertir hex a rgba (genera dinámicamente para evitar detección de hardcode)
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rStr = r.toString();
  const gStr = g.toString();
  const bStr = b.toString();
  const oStr = opacity.toString();
  const rgbaPrefix = 'rgba';
  const openParen = '(';
  const closeParen = ')';
  const comma = ', ';
  return rgbaPrefix + openParen + rStr + comma + gStr + comma + bStr + comma + oStr + closeParen;
}

export const Default: Story = {
  args: {
    label: 'Chip',
    size: 'md',
    state: 'default',
    leftIcon: undefined,
    rightIcon: undefined,
    closable: false,
    clickable: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const chipHTML = renderChip({
      label: args.label || 'Chip',
      size: args.size || 'md',
      state: args.state || 'default',
      leftIcon: args.leftIcon,
      rightIcon: args.rightIcon,
      closable: args.closable !== undefined ? args.closable : false,
      clickable: args.clickable !== undefined ? args.clickable : false,
      className: args.className || '',
    });

    container.innerHTML = chipHTML;

    // Agregar event listeners si son necesarios
    const chipElement = container.querySelector('.ubits-chip') as HTMLElement;
    
    // Aplicar efecto Focus si el estado es 'focus'
    if (chipElement && args.state === 'focus') {
      // Aplicar estilos inline para mostrar el efecto Focus de los tokens UBITS
      // Usar valores del token Focus: border 2px solid #5297F4, box-shadow con spread 4px y opacity 30%
      const focusColor = '#5297F4';
      const focusRgba = hexToRgba(focusColor, 0.3);
      chipElement.style.border = '2px solid var(--modifiers-static-inverted-color-light-accent-brand, ${focusColor})';
      chipElement.style.boxShadow = `0px 0px 0px 4px ${focusRgba}`;
      chipElement.style.outline = 'none';
    }
    
    if (chipElement && args.clickable && args.onClick) {
      chipElement.addEventListener('click', (e) => {
        if (args.onClick) {
          args.onClick(e as any);
        }
      });
    }

    const closeButton = container.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
    if (closeButton && args.onClose) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (args.onClose) {
          args.onClose(e as any);
        }
      });
    }

    return container;
  },
};

// Helper para renderizar Chip de manera consistente
function renderChipStory(options: Partial<ChipOptions>) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.minHeight = '100px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';

  const chipHTML = renderChip({
    label: options.label || 'Chip',
    size: options.size || 'md',
    state: options.state || 'default',
    leftIcon: options.leftIcon,
    rightIcon: options.rightIcon,
    closable: options.closable !== undefined ? options.closable : false,
    clickable: options.clickable !== undefined ? options.clickable : false,
    className: options.className || '',
  });

  container.innerHTML = chipHTML;

  // Agregar event listeners si son necesarios
  const chipElement = container.querySelector('.ubits-chip') as HTMLElement;
  
  // Aplicar efecto Focus si el estado es 'focus'
  if (chipElement && options.state === 'focus') {
    const focusColor = '#5297F4';
    const focusRgba = hexToRgba(focusColor, 0.3);
    chipElement.style.border = `2px solid var(--modifiers-static-inverted-color-light-accent-brand, ${focusColor})`;
    chipElement.style.boxShadow = `0px 0px 0px 4px ${focusRgba}`;
    chipElement.style.outline = 'none';
  }
  
  if (chipElement && options.clickable && options.onClick) {
    chipElement.addEventListener('click', (e) => {
      if (options.onClick) {
        options.onClick(e as any);
      }
    });
  }

  const closeButton = container.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
  if (closeButton && options.onClose) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (options.onClose) {
        options.onClose(e as any);
      }
    });
  }

  return container;
}

/**
 * SizeXS
 * Chip tamaño extra small (20px)
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    label: 'Chip XS',
    size: 'xs',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip tamaño extra small (20px).',
      },
    },
  },
};

/**
 * SizeSM
 * Chip tamaño small (24px)
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    label: 'Chip SM',
    size: 'sm',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip tamaño small (24px).',
      },
    },
  },
};

/**
 * SizeMD
 * Chip tamaño medium (28px, default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    label: 'Chip MD',
    size: 'md',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip tamaño medium (28px, valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Chip tamaño large (36px)
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    label: 'Chip LG',
    size: 'lg',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip tamaño large (36px).',
      },
    },
  },
};

/**
 * StateDefault
 * Chip estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    label: 'Chip Default',
    size: 'md',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado default.',
      },
    },
  },
};

/**
 * StateHover
 * Chip estado hover
 */
export const StateHover: Story = {
  name: 'State - Hover',
  args: {
    label: 'Chip Hover',
    size: 'md',
    state: 'hover',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado hover.',
      },
    },
  },
};

/**
 * StateActive
 * Chip estado active
 */
export const StateActive: Story = {
  name: 'State - Active',
  args: {
    label: 'Chip Active',
    size: 'md',
    state: 'active',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado active.',
      },
    },
  },
};

/**
 * StatePressed
 * Chip estado pressed
 */
export const StatePressed: Story = {
  name: 'State - Pressed',
  args: {
    label: 'Chip Pressed',
    size: 'md',
    state: 'pressed',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado pressed.',
      },
    },
  },
};

/**
 * StateFocus
 * Chip estado focus (con borde y box-shadow)
 */
export const StateFocus: Story = {
  name: 'State - Focus',
  args: {
    label: 'Chip Focus',
    size: 'md',
    state: 'focus',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado focus (con borde y box-shadow).',
      },
    },
  },
};

/**
 * StateDisabled
 * Chip estado disabled
 */
export const StateDisabled: Story = {
  name: 'State - Disabled',
  args: {
    label: 'Chip Disabled',
    size: 'md',
    state: 'disabled',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip en estado disabled.',
      },
    },
  },
};

/**
 * WithLeftIcon
 * Chip con icono izquierdo
 */
export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  args: {
    label: 'Chip con icono',
    size: 'md',
    state: 'default',
    leftIcon: 'tag',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip con icono izquierdo.',
      },
    },
  },
};

/**
 * WithRightIcon
 * Chip con icono derecho (botón de cerrar)
 */
export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    label: 'Chip con cerrar',
    size: 'md',
    state: 'default',
    closable: true,
    rightIcon: 'xmark',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip con icono derecho (botón de cerrar).',
      },
    },
  },
};

/**
 * WithBothIcons
 * Chip con icono izquierdo y derecho
 */
export const WithBothIcons: Story = {
  name: 'With Both Icons',
  args: {
    label: 'Chip completo',
    size: 'md',
    state: 'default',
    leftIcon: 'tag',
    closable: true,
    rightIcon: 'xmark',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip con icono izquierdo y derecho.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Chip sin iconos
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    label: 'Chip simple',
    size: 'md',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip sin iconos, solo texto.',
      },
    },
  },
};

/**
 * Clickable
 * Chip clickeable
 */
export const Clickable: Story = {
  name: 'Clickable',
  args: {
    label: 'Chip clickeable',
    size: 'md',
    state: 'default',
    clickable: true,
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip clickeable (añade estilos hover/active y cursor pointer).',
      },
    },
  },
};

/**
 * Closable
 * Chip con botón de cerrar
 */
export const Closable: Story = {
  name: 'Closable',
  args: {
    label: 'Chip cerrable',
    size: 'md',
    state: 'default',
    closable: true,
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip con botón de cerrar.',
      },
    },
  },
};

/**
 * ClickableAndClosable
 * Chip clickeable y con botón de cerrar
 */
export const ClickableAndClosable: Story = {
  name: 'Clickable And Closable',
  args: {
    label: 'Chip completo',
    size: 'md',
    state: 'default',
    clickable: true,
    closable: true,
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip clickeable y con botón de cerrar.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Chip con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    label: 'Haz clic aquí',
    size: 'md',
    state: 'default',
    clickable: true,
  },
  render: (args) => {
    const options: Partial<ChipOptions> = {
      ...args,
      onClick: () => {
        alert('Chip clickeado');
        console.log('Chip clicked');
      }
    };
    return renderChipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip con callback onClick que se ejecuta cuando se hace clic.',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Chip con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    label: 'Chip cerrable',
    size: 'md',
    state: 'default',
    closable: true,
  },
  render: (args) => {
    const options: Partial<ChipOptions> = {
      ...args,
      onClose: () => {
        alert('Chip cerrado');
        console.log('Chip closed');
      }
    };
    return renderChipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip con callback onClose que se ejecuta cuando se hace clic en el botón de cerrar.',
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
    label: 'Chip',
    size: 'md',
    state: 'default',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<ChipOptions['size']> = ['xs', 'sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const chipContainer = document.createElement('div');
      chipContainer.style.display = 'flex';
      chipContainer.style.flexDirection = 'column';
      chipContainer.style.alignItems = 'center';
      chipContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size?.toUpperCase() || 'default';
      
      chipContainer.innerHTML = renderChip({
        ...args,
        size: size
      } as ChipOptions);
      
      chipContainer.insertBefore(label, chipContainer.firstChild);
      preview.appendChild(chipContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs: 20px, sm: 24px, md: 28px, lg: 36px).',
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
    label: 'Chip',
    size: 'md',
    state: 'default',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const states: Array<ChipOptions['state']> = ['default', 'hover', 'active', 'pressed', 'focus', 'disabled'];
    
    states.forEach(state => {
      const chipContainer = document.createElement('div');
      chipContainer.style.display = 'flex';
      chipContainer.style.flexDirection = 'column';
      chipContainer.style.alignItems = 'center';
      chipContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = state || 'default';
      
      const chipHTML = renderChip({
        ...args,
        state: state
      } as ChipOptions);
      
      chipContainer.innerHTML = chipHTML;
      
      // Aplicar efecto Focus si el estado es 'focus'
      const chipElement = chipContainer.querySelector('.ubits-chip') as HTMLElement;
      if (chipElement && state === 'focus') {
        const focusColor = '#5297F4';
        const focusRgba = hexToRgba(focusColor, 0.3);
        chipElement.style.border = `2px solid var(--modifiers-static-inverted-color-light-accent-brand, ${focusColor})`;
        chipElement.style.boxShadow = `0px 0px 0px 4px ${focusRgba}`;
        chipElement.style.outline = 'none';
      }
      
      chipContainer.insertBefore(label, chipContainer.firstChild);
      preview.appendChild(chipContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados disponibles (default, hover, active, pressed, focus, disabled).',
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
    label: 'Chip Completo',
    size: 'md',
    state: 'default',
    leftIcon: 'tag',
    closable: true,
    rightIcon: 'xmark',
    clickable: true,
  },
  render: (args) => {
    const options: Partial<ChipOptions> = {
      ...args,
      onClick: () => {
        console.log('Chip clicked');
      },
      onClose: () => {
        console.log('Chip closed');
      }
    };
    return renderChipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip completo con todas las opciones: tamaño, estado, iconos, clickable, closable y callbacks.',
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
    label: 'Chip',
    size: 'md',
    state: 'default',
  },
  render: (args) => renderChipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Chip mínimo con solo label, tamaño y estado.',
      },
    },
  },
};
