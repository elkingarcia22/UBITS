import type { Meta, StoryObj } from '@storybook/html';
import { renderButtonAI, createButtonAI } from '../../components/button-ai/src/ButtonAIProvider';
import type { ButtonAIOptions } from '../../components/button-ai/src/types/ButtonAIOptions';
import '../../components/button-ai/src/styles/button-ai.css';

const meta: Meta<ButtonAIOptions> = {
  title: 'Básicos/ButtonAI',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Button AI UBITS con estilo redondeado y gradación. Basado en Button de UBITS pero con bordes más redondeados y gradientes. Solo incluye variantes primary y secondary.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Variante del botón AI',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'Texto del botón',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button text' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'sparkles, check, plus, etc.' },
      },
    },
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Mostrar solo el icono, sin texto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el botón',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    badge: {
      control: { type: 'boolean' },
      description: 'Mostrar badge de notificación',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description: 'Modificador active/outline',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonAIOptions>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI button',
    icon: 'sparkles',
    iconStyle: 'regular',
    iconOnly: false,
    disabled: false,
    badge: false,
    active: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      min-height: 200px;
      background: var(--modifiers-normal-color-light-bg-2, #f9fafb);
      border-radius: 8px;
    `;

    requestAnimationFrame(() => {
      try {
        const button = createButtonAI({
          ...args,
          onClick: (e) => {
            // Button AI clicked
          },
        });

        if (button) {
          container.appendChild(button);
        }
      } catch (error) {
        console.error('Error creating ButtonAI:', error);
        container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    });

    return container;
  },
};

// Helper para renderizar Button AI de manera consistente
function renderButtonAIStory(options: Partial<ButtonAIOptions>) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.justifyContent = 'center';
  preview.style.alignItems = 'center';
  preview.style.padding = '40px';
  preview.style.minHeight = '120px';
  preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  preview.style.borderRadius = '8px';
  preview.style.marginBottom = '20px';
  preview.style.position = 'relative';
  
  requestAnimationFrame(() => {
    try {
      const button = createButtonAI({
        ...options,
        onClick: options.onClick || (() => {
          console.log('Button AI clicked');
        }),
      } as ButtonAIOptions);

      if (button) {
        preview.appendChild(button);
      }
    } catch (error) {
      console.error('Error creating ButtonAI:', error);
      preview.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  });
  
  container.appendChild(preview);
  return container;
}

/**
 * VariantPrimary
 * Botón AI variante primary
 */
export const VariantPrimary: Story = {
  name: 'Variant - Primary',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button Primary',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI variante primary con gradiente radial.',
      },
    },
  },
};

/**
 * VariantSecondary
 * Botón AI variante secondary
 */
export const VariantSecondary: Story = {
  name: 'Variant - Secondary',
  args: {
    variant: 'secondary',
    size: 'md',
    text: 'AI Button Secondary',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI variante secondary.',
      },
    },
  },
};

/**
 * SizeXS
 * Botón AI tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    variant: 'primary',
    size: 'xs',
    text: 'AI Button XS',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI tamaño extra small.',
      },
    },
  },
};

/**
 * SizeSM
 * Botón AI tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    variant: 'primary',
    size: 'sm',
    text: 'AI Button SM',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Botón AI tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button MD',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Botón AI tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    variant: 'primary',
    size: 'lg',
    text: 'AI Button LG',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI tamaño large.',
      },
    },
  },
};

/**
 * SizeXL
 * Botón AI tamaño extra large
 */
export const SizeXL: Story = {
  name: 'Size - XL',
  args: {
    variant: 'primary',
    size: 'xl',
    text: 'AI Button XL',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI tamaño extra large.',
      },
    },
  },
};

/**
 * WithIcon
 * Botón AI con icono
 */
export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con icono y texto (icono siempre a la izquierda).',
      },
    },
  },
};

/**
 * IconOnly
 * Botón AI solo icono (sin texto)
 */
export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'sparkles',
    iconStyle: 'regular',
    iconOnly: true,
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI solo icono, sin texto.',
      },
    },
  },
};

/**
 * IconStyleRegular
 * Icono estilo regular (far)
 */
export const IconStyleRegular: Story = {
  name: 'Icon Style - Regular',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con icono estilo regular (far).',
      },
    },
  },
};

/**
 * IconStyleSolid
 * Icono estilo solid (fas)
 */
export const IconStyleSolid: Story = {
  name: 'Icon Style - Solid',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'solid',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con icono estilo solid (fas).',
      },
    },
  },
};

/**
 * WithText
 * Botón AI solo con texto
 */
export const WithText: Story = {
  name: 'With Text',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI solo con texto, sin icono.',
      },
    },
  },
};

/**
 * WithIconAndText
 * Botón AI con icono y texto
 */
export const WithIconAndText: Story = {
  name: 'With Icon And Text',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con icono y texto (icono siempre a la izquierda).',
      },
    },
  },
};

/**
 * Disabled
 * Botón AI deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button Disabled',
    icon: 'sparkles',
    iconStyle: 'regular',
    disabled: true,
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI deshabilitado.',
      },
    },
  },
};

/**
 * WithBadge
 * Botón AI con badge de notificación
 */
export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
    badge: true,
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con badge de notificación.',
      },
    },
  },
};

/**
 * Active
 * Botón AI con estado active
 */
export const Active: Story = {
  name: 'Active',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button Active',
    icon: 'sparkles',
    iconStyle: 'regular',
    active: true,
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con estado active.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Botón AI con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Haz clic aquí',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => {
    const options: Partial<ButtonAIOptions> = {
      ...args,
      onClick: () => {
        alert('Button AI clickeado');
        console.log('Button AI clicked');
      }
    };
    return renderButtonAIStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón AI con callback onClick que se ejecuta cuando se hace clic.',
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
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
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
    
    const variants: Array<ButtonAIOptions['variant']> = ['primary', 'secondary'];
    
    variants.forEach(variant => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.flexDirection = 'column';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = variant || 'default';
      
      requestAnimationFrame(() => {
        const button = createButtonAI({
          ...args,
          variant: variant
        } as ButtonAIOptions);
        
        if (button) {
          buttonContainer.appendChild(button);
        }
      });
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes disponibles (primary, secondary).',
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
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
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
    
    const sizes: Array<ButtonAIOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.flexDirection = 'column';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size?.toUpperCase() || 'default';
      
      requestAnimationFrame(() => {
        const button = createButtonAI({
          ...args,
          size: size
        } as ButtonAIOptions);
        
        if (button) {
          buttonContainer.appendChild(button);
        }
      });
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs, sm, md, lg, xl).',
      },
    },
  },
};

/**
 * AllIconStyles
 * Todos los estilos de icono
 */
export const AllIconStyles: Story = {
  name: 'All Icon Styles',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
    icon: 'sparkles',
    iconStyle: 'regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const iconStyles: Array<'regular' | 'solid'> = ['regular', 'solid'];
    
    iconStyles.forEach(iconStyle => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.minWidth = '100px';
      label.textContent = `Icon ${iconStyle}:`;
      
      requestAnimationFrame(() => {
        const button = createButtonAI({
          ...args,
          iconStyle: iconStyle
        } as ButtonAIOptions);
        
        if (button) {
          buttonContainer.appendChild(button);
        }
      });
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estilos de icono disponibles (regular, solid).',
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
    variant: 'primary',
    size: 'md',
    text: 'AI Button Completo',
    icon: 'sparkles',
    iconStyle: 'regular',
    badge: true,
    active: false,
  },
  render: (args) => {
    const options: Partial<ButtonAIOptions> = {
      ...args,
      onClick: () => {
        console.log('Button AI clicked');
      }
    };
    return renderButtonAIStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón AI completo con todas las opciones: variante, tamaño, texto, icono, badge y callback onClick.',
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
    variant: 'primary',
    size: 'md',
    text: 'AI Button',
  },
  render: (args) => renderButtonAIStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón AI mínimo con solo variante, tamaño y texto.',
      },
    },
  },
};

