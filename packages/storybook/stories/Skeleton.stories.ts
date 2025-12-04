import type { Meta, StoryObj } from '@storybook/html';
import { renderSkeleton } from '../../components/skeleton/src/SkeletonProvider';
import type { SkeletonOptions } from '../../components/skeleton/src/types/SkeletonOptions';
import '../../components/skeleton/src/styles/skeleton.css';

const meta: Meta<SkeletonOptions> = {
  title: 'Básicos/Skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Skeleton UBITS para mostrar placeholders de carga. Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones.'
}
}
},
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circle', 'rectangle', 'custom'],
      description: 'Variante del skeleton',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'text | circle | rectangle | custom' }
}
},
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del skeleton',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' }
}
},
    width: {
      control: { type: 'text' },
      description: 'Ancho del skeleton (número en px, porcentaje, o "full")',
      table: {
        defaultValue: { summary: 'full' }
}
},
    height: {
      control: { type: 'text' },
      description: 'Alto del skeleton (número en px o porcentaje)'
},
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de líneas de texto (solo para variant="text")',
      table: {
        defaultValue: { summary: '1' }
}
},
    animated: {
      control: { type: 'boolean' },
      description: 'Si el skeleton debe tener animación de pulso',
      table: {
        defaultValue: { summary: 'true' }
}
}
}
};

export default meta;
type Story = StoryObj<SkeletonOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    height: '',
    lines: 3,
    animated: true
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.minHeight = '300px';
    container.style.boxSizing = 'border-box';
    
    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.border = 'none';
    preview.style.marginBottom = '24px';
    preview.style.minHeight = '200px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    // Contenedor interno con width 100% - igual que en la web
    const innerContainer = document.createElement('div');
    innerContainer.style.width = '100%';
    innerContainer.style.boxSizing = 'border-box';

    // Renderizar el skeleton
    const skeletonHTML = renderSkeleton(args);
    innerContainer.innerHTML = skeletonHTML;
    
    // Ajustar el skeleton según la variante para que se vea bien
    const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
    if (skeletonElement) {
      if (args.variant === 'text') {
        // Para text, asegurar que ocupe todo el ancho disponible
        skeletonElement.style.width = '100%';
        skeletonElement.style.maxWidth = '100%';
      } else if (args.variant === 'circle') {
        // Para circle, asegurar que siempre sea circular
        // No aplicar width/height desde args, usar solo los del CSS
        skeletonElement.style.width = '';
        skeletonElement.style.height = '';
        skeletonElement.style.margin = '0 auto';
        skeletonElement.style.display = 'inline-block';
      } else if (args.variant === 'rectangle' || args.variant === 'custom') {
        // Para rectangle y custom, usar el width especificado o full
        if (args.width === 'full' || !args.width) {
          skeletonElement.style.width = '100%';
        } else if (args.width) {
          skeletonElement.style.width = typeof args.width === 'number' ? `${args.width}px` : args.width;
        }
        if (args.height) {
          skeletonElement.style.height = typeof args.height === 'number' ? `${args.height}px` : args.height;
        }
      }
    }
    
    preview.appendChild(innerContainer);
    container.appendChild(preview);
    return container;
  }
};

// Helper para renderizar Skeleton de manera consistente
function renderSkeletonStory(options: Partial<SkeletonOptions>) {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.width = '100%';
  container.style.minHeight = '300px';
  container.style.boxSizing = 'border-box';
  
  const preview = document.createElement('div');
  preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  preview.style.padding = '48px';
  preview.style.border = 'none';
  preview.style.marginBottom = '24px';
  preview.style.minHeight = '200px';
  preview.style.display = 'flex';
  preview.style.alignItems = 'center';
  preview.style.justifyContent = 'center';
  preview.style.boxSizing = 'border-box';
  
  const innerContainer = document.createElement('div');
  innerContainer.style.width = '100%';
  innerContainer.style.boxSizing = 'border-box';

  const skeletonHTML = renderSkeleton(options as SkeletonOptions);
  innerContainer.innerHTML = skeletonHTML;
  
  const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
  if (skeletonElement) {
    if (options.variant === 'text') {
      skeletonElement.style.width = '100%';
      skeletonElement.style.maxWidth = '100%';
    } else if (options.variant === 'circle') {
      skeletonElement.style.width = '';
      skeletonElement.style.height = '';
      skeletonElement.style.margin = '0 auto';
      skeletonElement.style.display = 'inline-block';
    } else if (options.variant === 'rectangle' || options.variant === 'custom') {
      if (options.width === 'full' || !options.width) {
        skeletonElement.style.width = '100%';
      } else if (options.width) {
        skeletonElement.style.width = typeof options.width === 'number' ? `${options.width}px` : String(options.width);
      }
      if (options.height) {
        skeletonElement.style.height = typeof options.height === 'number' ? `${options.height}px` : String(options.height);
      }
    }
  }
  
  preview.appendChild(innerContainer);
  container.appendChild(preview);
  return container;
}

/**
 * VariantText
 * Skeleton variante text (líneas de texto)
 */
export const VariantText: Story = {
  name: 'Variant - Text',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton variante text con líneas de texto.',
      },
    },
  },
};

/**
 * VariantCircle
 * Skeleton variante circle (círculo para avatares)
 */
export const VariantCircle: Story = {
  name: 'Variant - Circle',
  args: {
    variant: 'circle',
    size: 'md',
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton variante circle (círculo para avatares).',
      },
    },
  },
};

/**
 * VariantRectangle
 * Skeleton variante rectangle (rectángulo para imágenes/cards)
 */
export const VariantRectangle: Story = {
  name: 'Variant - Rectangle',
  args: {
    variant: 'rectangle',
    size: 'md',
    width: 'full',
    height: 200,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton variante rectangle (rectángulo para imágenes/cards).',
      },
    },
  },
};

/**
 * VariantCustom
 * Skeleton variante custom (forma personalizada)
 */
export const VariantCustom: Story = {
  name: 'Variant - Custom',
  args: {
    variant: 'custom',
    size: 'md',
    width: 300,
    height: 150,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton variante custom (forma personalizada).',
      },
    },
  },
};

/**
 * SizeXS
 * Skeleton tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    variant: 'text',
    size: 'xs',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton tamaño extra small.',
      },
    },
  },
};

/**
 * SizeSM
 * Skeleton tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    variant: 'text',
    size: 'sm',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Skeleton tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Skeleton tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    variant: 'text',
    size: 'lg',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton tamaño large.',
      },
    },
  },
};

/**
 * SizeXL
 * Skeleton tamaño extra large
 */
export const SizeXL: Story = {
  name: 'Size - XL',
  args: {
    variant: 'text',
    size: 'xl',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton tamaño extra large.',
      },
    },
  },
};

/**
 * WidthFull
 * Skeleton con ancho completo (100%)
 */
export const WidthFull: Story = {
  name: 'Width - Full',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con ancho completo (100%).',
      },
    },
  },
};

/**
 * WidthFixed
 * Skeleton con ancho fijo (px)
 */
export const WidthFixed: Story = {
  name: 'Width - Fixed',
  args: {
    variant: 'text',
    size: 'md',
    width: 300,
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con ancho fijo en píxeles.',
      },
    },
  },
};

/**
 * WidthPercentage
 * Skeleton con ancho porcentual
 */
export const WidthPercentage: Story = {
  name: 'Width - Percentage',
  args: {
    variant: 'text',
    size: 'md',
    width: '60%',
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con ancho porcentual.',
      },
    },
  },
};

/**
 * HeightFixed
 * Skeleton con alto fijo (px)
 */
export const HeightFixed: Story = {
  name: 'Height - Fixed',
  args: {
    variant: 'rectangle',
    size: 'md',
    width: 'full',
    height: 250,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con alto fijo en píxeles.',
      },
    },
  },
};

/**
 * HeightPercentage
 * Skeleton con alto porcentual
 */
export const HeightPercentage: Story = {
  name: 'Height - Percentage',
  args: {
    variant: 'rectangle',
    size: 'md',
    width: 'full',
    height: '50%',
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con alto porcentual.',
      },
    },
  },
};

/**
 * Lines1
 * Skeleton text con 1 línea
 */
export const Lines1: Story = {
  name: 'Lines - 1',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 1,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton text con 1 línea.',
      },
    },
  },
};

/**
 * LinesMultiple
 * Skeleton text con múltiples líneas
 */
export const LinesMultiple: Story = {
  name: 'Lines - Multiple',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 5,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton text con múltiples líneas (5 líneas).',
      },
    },
  },
};

/**
 * Animated
 * Skeleton con animación de pulso
 */
export const Animated: Story = {
  name: 'Animated',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton con animación de pulso.',
      },
    },
  },
};

/**
 * NotAnimated
 * Skeleton sin animación
 */
export const NotAnimated: Story = {
  name: 'Not Animated',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 3,
    animated: false,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton sin animación de pulso.',
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
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 3,
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '32px';
    preview.style.boxSizing = 'border-box';
    
    const variants: Array<SkeletonOptions['variant']> = ['text', 'circle', 'rectangle', 'custom'];
    
    variants.forEach(variant => {
      const variantContainer = document.createElement('div');
      variantContainer.style.display = 'flex';
      variantContainer.style.flexDirection = 'column';
      variantContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = variant || 'default';
      
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.boxSizing = 'border-box';
      
      const skeletonHTML = renderSkeleton({
        ...args,
        variant: variant,
        width: variant === 'circle' ? undefined : 'full',
        height: variant === 'rectangle' || variant === 'custom' ? 150 : undefined,
      } as SkeletonOptions);
      innerContainer.innerHTML = skeletonHTML;
      
      const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
      if (skeletonElement) {
        if (variant === 'circle') {
          skeletonElement.style.margin = '0 auto';
          skeletonElement.style.display = 'inline-block';
        }
      }
      
      variantContainer.appendChild(label);
      variantContainer.appendChild(innerContainer);
      preview.appendChild(variantContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes disponibles (text, circle, rectangle, custom).',
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
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SkeletonOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.display = 'flex';
      sizeContainer.style.flexDirection = 'column';
      sizeContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = size?.toUpperCase() || 'default';
      
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.boxSizing = 'border-box';
      
      const skeletonHTML = renderSkeleton({
        ...args,
        size: size
      } as SkeletonOptions);
      innerContainer.innerHTML = skeletonHTML;
      
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(innerContainer);
      preview.appendChild(sizeContainer);
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
 * TextSizes
 * Todos los tamaños para variante text
 */
export const TextSizes: Story = {
  name: 'Text Sizes',
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 2,
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SkeletonOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.display = 'flex';
      sizeContainer.style.flexDirection = 'column';
      sizeContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = `Text ${size?.toUpperCase() || 'default'}`;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.boxSizing = 'border-box';
      
      const skeletonHTML = renderSkeleton({
        variant: 'text',
        size: size,
        width: 'full',
        lines: 2,
        animated: true,
      } as SkeletonOptions);
      innerContainer.innerHTML = skeletonHTML;
      
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(innerContainer);
      preview.appendChild(sizeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños para variante text.',
      },
    },
  },
};

/**
 * CircleSizes
 * Todos los tamaños para variante circle
 */
export const CircleSizes: Story = {
  name: 'Circle Sizes',
  args: {
    variant: 'circle',
    size: 'md',
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '32px';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SkeletonOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.display = 'flex';
      sizeContainer.style.flexDirection = 'column';
      sizeContainer.style.alignItems = 'center';
      sizeContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = size?.toUpperCase() || 'default';
      
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.boxSizing = 'border-box';
      innerContainer.style.display = 'flex';
      innerContainer.style.justifyContent = 'center';
      
      const skeletonHTML = renderSkeleton({
        variant: 'circle',
        size: size,
        animated: true,
      } as SkeletonOptions);
      innerContainer.innerHTML = skeletonHTML;
      
      const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
      if (skeletonElement) {
        skeletonElement.style.margin = '0';
        skeletonElement.style.display = 'inline-block';
      }
      
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(innerContainer);
      preview.appendChild(sizeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños para variante circle.',
      },
    },
  },
};

/**
 * RectangleSizes
 * Todos los tamaños para variante rectangle
 */
export const RectangleSizes: Story = {
  name: 'Rectangle Sizes',
  args: {
    variant: 'rectangle',
    size: 'md',
    width: 'full',
    height: 200,
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SkeletonOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.display = 'flex';
      sizeContainer.style.flexDirection = 'column';
      sizeContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = `Rectangle ${size?.toUpperCase() || 'default'}`;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.width = '100%';
      innerContainer.style.boxSizing = 'border-box';
      
      const skeletonHTML = renderSkeleton({
        variant: 'rectangle',
        size: size,
        width: 'full',
        height: 150,
        animated: true,
      } as SkeletonOptions);
      innerContainer.innerHTML = skeletonHTML;
      
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(innerContainer);
      preview.appendChild(sizeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños para variante rectangle.',
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
    variant: 'text',
    size: 'md',
    width: 'full',
    height: undefined,
    lines: 3,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton completo con todas las opciones: variante, tamaño, ancho, líneas y animación.',
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
    variant: 'text',
    size: 'md',
    width: 'full',
    lines: 1,
    animated: true,
  },
  render: (args) => renderSkeletonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton mínimo con solo variante, tamaño y una línea.',
      },
    },
  },
};

