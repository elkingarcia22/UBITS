import type { Meta, StoryObj } from '@storybook/html';
import { renderBadge } from '../../components/badge/src/BadgeProvider';
import type { BadgeOptions } from '../../components/badge/src/types/BadgeOptions';
import '../../components/badge/src/styles/badge.css';

const meta: Meta<BadgeOptions> = {
  title: 'Básicos/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños.`,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: `select` },
      options: ['dot', 'number'],
      description: 'Tipo de badge: solo bolita o con número',
      table: {
        defaultValue: { summary: 'number' },
        type: { summary: 'dot | number' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
      description: 'Variante de color del badge',
      table: {
        defaultValue: { summary: 'error' },
        type: { summary: 'success | warning | error | info' },
      },
    },
    style: {
      control: { type: 'select' },
      options: ['light', 'neutral', 'bold'],
      description: 'Estilo del badge: light (sin borde), neutral (con borde gris) o bold (fondo de color)',
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'light | neutral | bold' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del badge',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    content: {
      control: { type: 'text' },
      description: 'Contenido del badge (número o texto, solo para tipo number)',
    },
    absolute: {
      control: { type: 'boolean' },
      description: 'Usar posición absoluta',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Posición cuando es absoluto',
      table: {
        defaultValue: { summary: 'top-right' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar el label',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del label que aparece a la derecha del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    labelTypography: {
      control: { type: 'select' },
      options: [
        'ubits-body-sm-regular',
        'ubits-body-sm-semibold',
        'ubits-body-sm-bold',
        'ubits-body-md-regular',
        'ubits-body-md-semibold',
        'ubits-body-md-bold',
        'ubits-heading-h1',
        'ubits-heading-h2'
      ],
      description: 'Clase de tipografía UBITS para el label',
      table: {
        defaultValue: { summary: 'ubits-body-md-regular' },
        type: { summary: 'ubits-body-sm-regular | ubits-body-sm-semibold | ubits-body-sm-bold | ubits-body-md-regular | ubits-body-md-semibold | ubits-body-md-bold | ubits-heading-h1 | ubits-heading-h2' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BadgeOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: '5',
    absolute: false,
    position: 'top-right',
    showLabel: false,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    const badgeContainer = document.createElement('div');
    badgeContainer.style.display = 'inline-flex';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.gap = '16px';
    badgeContainer.style.fontSize = '16px';
    badgeContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high, #303a47)';
    
    // Mostrar badge standalone
    badgeContainer.innerHTML = renderBadge(args);
    
    // Si es absoluto, necesitamos un contenedor relativo
    if (args.absolute) {
      const relativeContainer = document.createElement('div');
      relativeContainer.style.position = 'relative';
      relativeContainer.style.display = 'inline-block';
      relativeContainer.style.padding = '20px';
      relativeContainer.style.background = 'var(--modifiers-normal-color-light-bg-1)';
      relativeContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
      relativeContainer.style.borderRadius = '8px';
      relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
      relativeContainer.innerHTML += renderBadge(args);
      badgeContainer.innerHTML = '';
      badgeContainer.appendChild(relativeContainer);
    }
    
    preview.appendChild(badgeContainer);
    container.appendChild(preview);
    
    // Logs de debug para badge error en dark mode y centrado en bold
    setTimeout(() => {
      const badges = container.querySelectorAll('.ubits-badge');
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      const isBold = args.style === 'bold';
      
      // El código de debugging ha sido removido
      badges.forEach((badge, index) => {
        // Verificar elementos internos (dot, number-text, etc.)
        const dotNumber = badge.querySelector('.ubits-badge__dot--number');
        const numberText = badge.querySelector('.ubits-badge__number-text');
        const innerSpan = badge.querySelector('span:not(.ubits-badge__dot)');
        
        // Si es bold y tiene dot--number, analizar centrado (sin logs)
        if (isBold && dotNumber) {
          // Análisis silencioso del centrado
        }
      });
    }, 100);
    
    return container;
  },
};

// Helper para renderizar Badge de manera consistente
function renderBadgeStory(options: Partial<BadgeOptions>, withAbsoluteContainer: boolean = false) {
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
  
  const badgeContainer = document.createElement('div');
  badgeContainer.style.display = 'inline-flex';
  badgeContainer.style.alignItems = 'center';
  badgeContainer.style.gap = '16px';
  badgeContainer.style.fontSize = '16px';
  badgeContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
  
  badgeContainer.innerHTML = renderBadge(options as BadgeOptions);
  
  if (options.absolute || withAbsoluteContainer) {
    const relativeContainer = document.createElement('div');
    relativeContainer.style.position = 'relative';
    relativeContainer.style.display = 'inline-block';
    relativeContainer.style.padding = '20px';
    relativeContainer.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    relativeContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    relativeContainer.style.borderRadius = '8px';
    relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
    relativeContainer.innerHTML += renderBadge(options as BadgeOptions);
    badgeContainer.innerHTML = '';
    badgeContainer.appendChild(relativeContainer);
  }
  
  preview.appendChild(badgeContainer);
  container.appendChild(preview);
  
  return container;
}

/**
 * TypeDot
 * Badge tipo dot (solo bolita sin número)
 */
export const TypeDot: Story = {
  name: 'Type - Dot',
  args: {
    type: 'dot',
    variant: 'error',
    style: 'light',
    size: 'md',
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tipo dot (solo bolita sin número).',
      },
    },
  },
};

/**
 * TypeNumber
 * Badge tipo number (con contenido)
 */
export const TypeNumber: Story = {
  name: 'Type - Number',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tipo number (con contenido).',
      },
    },
  },
};

/**
 * SizeXS
 * Badge tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'xs',
    content: 3,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tamaño extra small.',
      },
    },
  },
};

/**
 * SizeSM
 * Badge tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'sm',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Badge tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Badge tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'lg',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge tamaño large.',
      },
    },
  },
};


/**
 * VariantSuccess
 * Badge variante success
 */
export const VariantSuccess: Story = {
  name: 'Variant - Success',
  args: {
    type: 'number',
    variant: 'success',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge variante success.',
      },
    },
  },
};

/**
 * VariantWarning
 * Badge variante warning
 */
export const VariantWarning: Story = {
  name: 'Variant - Warning',
  args: {
    type: 'number',
    variant: 'warning',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge variante warning.',
      },
    },
  },
};

/**
 * VariantError
 * Badge variante error
 */
export const VariantError: Story = {
  name: 'Variant - Error',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge variante error.',
      },
    },
  },
};

/**
 * VariantInfo
 * Badge variante info
 */
export const VariantInfo: Story = {
  name: 'Variant - Info',
  args: {
    type: 'number',
    variant: 'info',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge variante info.',
      },
    },
  },
};

/**
 * StyleLight
 * Badge estilo light (sin borde)
 */
export const StyleLight: Story = {
  name: 'Style - Light',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge estilo light (sin borde).',
      },
    },
  },
};

/**
 * StyleNeutral
 * Badge estilo neutral (con borde gris)
 */
export const StyleNeutral: Story = {
  name: 'Style - Neutral',
  args: {
    type: 'number',
    variant: 'error',
    style: 'neutral',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge estilo neutral (con borde gris).',
      },
    },
  },
};

/**
 * StyleBold
 * Badge estilo bold (fondo de color y texto blanco)
 */
export const StyleBold: Story = {
  name: 'Style - Bold',
  args: {
    type: 'number',
    variant: 'error',
    style: 'bold',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge estilo bold (fondo de color y texto blanco).',
      },
    },
  },
};

/**
 * WithContentNumber
 * Badge con contenido numérico
 */
export const WithContentNumber: Story = {
  name: 'With Content - Number',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 99,
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge con contenido numérico.',
      },
    },
  },
};

/**
 * WithContentText
 * Badge con contenido de texto
 */
export const WithContentText: Story = {
  name: 'With Content - Text',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 'Nuevo',
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge con contenido de texto.',
      },
    },
  },
};

/**
 * WithoutContent
 * Badge sin contenido (solo dot)
 */
export const WithoutContent: Story = {
  name: 'Without Content',
  args: {
    type: 'dot',
    variant: 'error',
    style: 'light',
    size: 'md',
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge sin contenido (solo dot).',
      },
    },
  },
};

/**
 * AbsolutePosition
 * Badge con posición absoluta
 */
export const AbsolutePosition: Story = {
  name: 'Absolute Position',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'top-right',
  },
  render: (args) => renderBadgeStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Badge con posición absoluta.',
      },
    },
  },
};

/**
 * PositionTopRight
 * Badge posición top-right (default)
 */
export const PositionTopRight: Story = {
  name: 'Position - Top Right (Default)',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'top-right',
  },
  render: (args) => renderBadgeStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Badge posición top-right (valor por defecto).',
      },
    },
  },
};

/**
 * PositionTopLeft
 * Badge posición top-left
 */
export const PositionTopLeft: Story = {
  name: 'Position - Top Left',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'top-left',
  },
  render: (args) => renderBadgeStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Badge posición top-left.',
      },
    },
  },
};

/**
 * PositionBottomRight
 * Badge posición bottom-right
 */
export const PositionBottomRight: Story = {
  name: 'Position - Bottom Right',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'bottom-right',
  },
  render: (args) => renderBadgeStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Badge posición bottom-right.',
      },
    },
  },
};

/**
 * PositionBottomLeft
 * Badge posición bottom-left
 */
export const PositionBottomLeft: Story = {
  name: 'Position - Bottom Left',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'bottom-left',
  },
  render: (args) => renderBadgeStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Badge posición bottom-left.',
      },
    },
  },
};

/**
 * WithLabel
 * Badge con label
 */
export const WithLabel: Story = {
  name: 'With Label',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
    showLabel: true,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge con label visible.',
      },
    },
  },
};

/**
 * WithoutLabel
 * Badge sin label
 */
export const WithoutLabel: Story = {
  name: 'Without Label',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
    showLabel: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge sin label.',
      },
    },
  },
};

/**
 * LabelTypographyVariants
 * Badge con diferentes variantes de tipografía del label
 */
export const LabelTypographyVariants: Story = {
  name: 'Label Typography Variants',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
    showLabel: true,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    preview.style.padding = '40px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const typographyVariants: Array<BadgeOptions['labelTypography']> = [
      'ubits-body-sm-regular',
      'ubits-body-sm-semibold',
      'ubits-body-sm-bold',
      'ubits-body-md-regular',
      'ubits-body-md-semibold',
      'ubits-body-md-bold',
      'ubits-heading-h1',
      'ubits-heading-h2'
    ];
    
    typographyVariants.forEach(typography => {
      const badgeContainer = document.createElement('div');
      badgeContainer.style.display = 'flex';
      badgeContainer.style.alignItems = 'center';
      badgeContainer.style.gap = '16px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = typography || 'default';
      
      badgeContainer.innerHTML = renderBadge({
        ...args,
        labelTypography: typography
      } as BadgeOptions);
      
      badgeContainer.insertBefore(label, badgeContainer.firstChild);
      preview.appendChild(badgeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con diferentes variantes de tipografía del label.',
      },
    },
  },
};

/**
 * AllVariants
 * Todos los colores de variante
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const variants: Array<BadgeOptions['variant']> = ['success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      const badgeContainer = document.createElement('div');
      badgeContainer.style.display = 'flex';
      badgeContainer.style.flexDirection = 'column';
      badgeContainer.style.alignItems = 'center';
      badgeContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = variant || 'default';
      
      badgeContainer.innerHTML = renderBadge({
        ...args,
        variant: variant
      } as BadgeOptions);
      
      badgeContainer.insertBefore(label, badgeContainer.firstChild);
      preview.appendChild(badgeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los colores de variante disponibles (success, warning, error, info).',
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
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<BadgeOptions['size']> = ['xs', 'sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const badgeContainer = document.createElement('div');
      badgeContainer.style.display = 'flex';
      badgeContainer.style.flexDirection = 'column';
      badgeContainer.style.alignItems = 'center';
      badgeContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size?.toUpperCase() || 'default';
      
      badgeContainer.innerHTML = renderBadge({
        ...args,
        size: size
      } as BadgeOptions);
      
      badgeContainer.insertBefore(label, badgeContainer.firstChild);
      preview.appendChild(badgeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs, sm, md, lg).',
      },
    },
  },
};

/**
 * AllStyles
 * Todos los estilos
 */
export const AllStyles: Story = {
  name: 'All Styles',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '24px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const styles: Array<BadgeOptions['style']> = ['light', 'neutral', 'bold'];
    
    styles.forEach(style => {
      const badgeContainer = document.createElement('div');
      badgeContainer.style.display = 'flex';
      badgeContainer.style.flexDirection = 'column';
      badgeContainer.style.alignItems = 'center';
      badgeContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = style || 'default';
      
      badgeContainer.innerHTML = renderBadge({
        ...args,
        style: style
      } as BadgeOptions);
      
      badgeContainer.insertBefore(label, badgeContainer.firstChild);
      preview.appendChild(badgeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estilos disponibles (light, neutral, bold).',
      },
    },
  },
};

/**
 * AllPositions
 * Todas las posiciones absolutas
 */
export const AllPositions: Story = {
  name: 'All Positions',
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: true,
    position: 'top-right',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'grid';
    preview.style.gridTemplateColumns = 'repeat(2, 1fr)';
    preview.style.gap = '24px';
    preview.style.padding = '40px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const positions: Array<BadgeOptions['position']> = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
    
    positions.forEach(position => {
      const relativeContainer = document.createElement('div');
      relativeContainer.style.position = 'relative';
      relativeContainer.style.display = 'inline-block';
      relativeContainer.style.padding = '20px';
      relativeContainer.style.background = 'var(--modifiers-normal-color-light-bg-1)';
      relativeContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
      relativeContainer.style.borderRadius = '8px';
      relativeContainer.style.width = '100%';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.marginBottom = '8px';
      label.textContent = position || 'default';
      
      relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
      relativeContainer.innerHTML += renderBadge({
        ...args,
        position: position
      } as BadgeOptions);
      
      relativeContainer.insertBefore(label, relativeContainer.firstChild);
      preview.appendChild(relativeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las posiciones absolutas disponibles (top-right, top-left, bottom-right, bottom-left).',
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
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: 5,
    absolute: false,
    showLabel: true,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge completo con todas las opciones: tipo, variante, estilo, tamaño, contenido, label y tipografía.',
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
    type: 'dot',
    variant: 'error',
    style: 'light',
    size: 'md',
    absolute: false,
  },
  render: (args) => renderBadgeStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Badge mínimo con solo tipo dot y variante.',
      },
    },
  },
};
