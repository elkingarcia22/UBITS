import type { Meta, StoryObj } from '@storybook/html';
import { renderSpinner } from '../../components/spinner/src/SpinnerProvider';
import type { SpinnerOptions } from '../../components/spinner/src/types/SpinnerOptions';
import '../../components/spinner/src/styles/spinner.css';

const meta: Meta<SpinnerOptions> = {
  title: 'Básicos/Spinner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Spinner/Loader UBITS para mostrar estados de carga. Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: `select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del spinner',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de color del spinner',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | success | warning | error | info' },
      },
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Si el spinner está animado',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto a mostrar debajo del spinner (opcional)',
    },
    fullScreen: {
      control: { type: 'boolean' },
      description: 'Si el spinner debe ocupar toda la pantalla (centrado)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: '',
    fullScreen: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.minHeight = '300px';
    container.style.boxSizing = 'border-box';
    
    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.marginBottom = '24px';
    preview.style.minHeight = '200px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    // Renderizar el spinner
    const spinnerHTML = renderSpinner(args);
    preview.innerHTML = spinnerHTML;
    
    container.appendChild(preview);
    return container;
  },
};

// Helper para renderizar Spinner de manera consistente
function renderSpinnerStory(options: Partial<SpinnerOptions>) {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  container.style.width = '100%';
  container.style.minHeight = '300px';
  container.style.boxSizing = 'border-box';
  
  const preview = document.createElement('div');
  preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  preview.style.padding = '48px';
  preview.style.borderRadius = '8px';
  preview.style.border = 'none';
  preview.style.marginBottom = '24px';
  preview.style.minHeight = '200px';
  preview.style.display = 'flex';
  preview.style.alignItems = 'center';
  preview.style.justifyContent = 'center';
  preview.style.boxSizing = 'border-box';
  
  const spinnerHTML = renderSpinner(options as SpinnerOptions);
  preview.innerHTML = spinnerHTML;
  
  container.appendChild(preview);
  return container;
}

/**
 * SizeXS
 * Spinner tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    size: 'xs',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner tamaño extra small.',
      },
    },
  },
};

/**
 * SizeSM
 * Spinner tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    size: 'sm',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Spinner tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Spinner tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    size: 'lg',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner tamaño large.',
      },
    },
  },
};

/**
 * SizeXL
 * Spinner tamaño extra large
 */
export const SizeXL: Story = {
  name: 'Size - XL',
  args: {
    size: 'xl',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner tamaño extra large.',
      },
    },
  },
};

/**
 * VariantPrimary
 * Spinner variante primary
 */
export const VariantPrimary: Story = {
  name: 'Variant - Primary',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante primary.',
      },
    },
  },
};

/**
 * VariantSecondary
 * Spinner variante secondary
 */
export const VariantSecondary: Story = {
  name: 'Variant - Secondary',
  args: {
    size: 'md',
    variant: 'secondary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante secondary.',
      },
    },
  },
};

/**
 * VariantSuccess
 * Spinner variante success
 */
export const VariantSuccess: Story = {
  name: 'Variant - Success',
  args: {
    size: 'md',
    variant: 'success',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante success.',
      },
    },
  },
};

/**
 * VariantWarning
 * Spinner variante warning
 */
export const VariantWarning: Story = {
  name: 'Variant - Warning',
  args: {
    size: 'md',
    variant: 'warning',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante warning.',
      },
    },
  },
};

/**
 * VariantError
 * Spinner variante error
 */
export const VariantError: Story = {
  name: 'Variant - Error',
  args: {
    size: 'md',
    variant: 'error',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante error.',
      },
    },
  },
};

/**
 * VariantInfo
 * Spinner variante info
 */
export const VariantInfo: Story = {
  name: 'Variant - Info',
  args: {
    size: 'md',
    variant: 'info',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner variante info.',
      },
    },
  },
};

/**
 * Animated
 * Spinner con animación
 */
export const Animated: Story = {
  name: 'Animated',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner con animación de rotación.',
      },
    },
  },
};

/**
 * NotAnimated
 * Spinner sin animación
 */
export const NotAnimated: Story = {
  name: 'Not Animated',
  args: {
    size: 'md',
    variant: 'primary',
    animated: false,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner sin animación de rotación.',
      },
    },
  },
};

/**
 * WithLabel
 * Spinner con etiqueta de texto
 */
export const WithLabel: Story = {
  name: 'With Label',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: 'Cargando...',
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner con etiqueta de texto debajo.',
      },
    },
  },
};

/**
 * WithoutLabel
 * Spinner sin etiqueta
 */
export const WithoutLabel: Story = {
  name: 'Without Label',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: '',
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner sin etiqueta de texto.',
      },
    },
  },
};

/**
 * FullScreen
 * Spinner fullscreen (centrado en todo el contenedor)
 */
export const FullScreen: Story = {
  name: 'Full Screen',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    fullScreen: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '0';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.width = '100%';
    container.style.height = '400px';
    container.style.position = 'relative';
    container.style.boxSizing = 'border-box';
    
    const spinnerHTML = renderSpinner(args);
    container.innerHTML = spinnerHTML;
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner fullscreen centrado en todo el contenedor.',
      },
    },
  },
};

/**
 * NotFullScreen
 * Spinner normal (no fullscreen)
 */
export const NotFullScreen: Story = {
  name: 'Not Full Screen',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    fullScreen: false,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner normal (no fullscreen).',
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
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '32px';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SpinnerOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
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
      
      const spinnerHTML = renderSpinner({
        ...args,
        size: size
      } as SpinnerOptions);
      sizeContainer.innerHTML = spinnerHTML;
      
      sizeContainer.insertBefore(label, sizeContainer.firstChild);
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
 * AllVariants
 * Todas las variantes de color
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '32px';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    const variants: Array<SpinnerOptions['variant']> = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      const variantContainer = document.createElement('div');
      variantContainer.style.display = 'flex';
      variantContainer.style.flexDirection = 'column';
      variantContainer.style.alignItems = 'center';
      variantContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = variant || 'default';
      
      const spinnerHTML = renderSpinner({
        ...args,
        variant: variant
      } as SpinnerOptions);
      variantContainer.innerHTML = spinnerHTML;
      
      variantContainer.insertBefore(label, variantContainer.firstChild);
      preview.appendChild(variantContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes de color disponibles (primary, secondary, success, warning, error, info).',
      },
    },
  },
};

/**
 * AllSizesWithLabel
 * Todos los tamaños con etiqueta
 */
export const AllSizesWithLabel: Story = {
  name: 'All Sizes With Label',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: 'Cargando...',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '32px';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    const sizes: Array<SpinnerOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
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
      
      const spinnerHTML = renderSpinner({
        ...args,
        size: size
      } as SpinnerOptions);
      sizeContainer.innerHTML = spinnerHTML;
      
      sizeContainer.insertBefore(label, sizeContainer.firstChild);
      preview.appendChild(sizeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños con etiqueta de texto.',
      },
    },
  },
};

/**
 * AllVariantsWithLabel
 * Todas las variantes con etiqueta
 */
export const AllVariantsWithLabel: Story = {
  name: 'All Variants With Label',
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: 'Cargando...',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '32px';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    const variants: Array<SpinnerOptions['variant']> = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      const variantContainer = document.createElement('div');
      variantContainer.style.display = 'flex';
      variantContainer.style.flexDirection = 'column';
      variantContainer.style.alignItems = 'center';
      variantContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '14px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.fontWeight = '600';
      label.textContent = variant || 'default';
      
      const spinnerHTML = renderSpinner({
        ...args,
        variant: variant
      } as SpinnerOptions);
      variantContainer.innerHTML = spinnerHTML;
      
      variantContainer.insertBefore(label, variantContainer.firstChild);
      preview.appendChild(variantContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes de color con etiqueta de texto.',
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
    size: 'md',
    variant: 'primary',
    animated: true,
    label: 'Cargando contenido...',
    fullScreen: false,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner completo con todas las opciones: tamaño, variante, animación, etiqueta y modo fullscreen.',
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
    size: 'md',
    variant: 'primary',
    animated: true,
  },
  render: (args) => renderSpinnerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Spinner mínimo con solo tamaño, variante y animación.',
      },
    },
  },
};

