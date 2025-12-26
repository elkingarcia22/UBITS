import type { Meta, StoryObj } from '@storybook/html';
import { renderSimpleCard, createSimpleCard } from '../../components/card/src/SimpleCardProvider';
import type { SimpleCardOptions } from '../../components/card/src/types/SimpleCardOptions';
import '../../components/card/src/styles/simple-card.css';
import '../../components/button/src/styles/button.css';

// Tokens disponibles para controladores
const BACKGROUND_TOKENS = [
  'var(--modifiers-normal-color-light-bg-1)',
  'var(--modifiers-normal-color-light-bg-2)',
  'var(--modifiers-normal-color-light-bg-3)',
  'var(--modifiers-normal-color-light-bg-4)',
  'var(--modifiers-normal-color-light-bg-5)'
] as const;

const BORDER_COLOR_TOKENS = [
  'var(--modifiers-normal-color-light-border-1)',
  'var(--modifiers-normal-color-light-border-2)',
  'var(--modifiers-normal-color-light-border-3)'
] as const;

const BORDER_RADIUS_TOKENS = [
] as const;

const PADDING_TOKENS = [
] as const;

const HEADER_BACKGROUND_TOKENS = [
  'var(--modifiers-normal-color-light-bg-4)',
  'var(--modifiers-normal-color-light-bg-5)',
  'var(--modifiers-normal-color-light-accent-brand)',
  'var(--modifiers-normal-color-light-feedback-border-error)'
] as const;

const TYPOGRAPHY_CLASSES = [
  'ubits-heading-h1',
  'ubits-heading-h2',
  'ubits-body-lg',
  'ubits-body-md',
  'ubits-body-sm'
] as const;

const meta: Meta<SimpleCardOptions & {
  // Controladores de tokens
  backgroundColorToken?: string;
  borderColorToken?: string;
  borderRadiusToken?: string;
  paddingToken?: string;
  headerBackgroundToken?: string;
  // Controladores de tipografía
  titleTypographyClass?: string;
  subtitleTypographyClass?: string;
  contentTypographyClass?: string;
  // Controladores de botones
  button1Label?: string;
  button1Variant?: 'primary' | 'secondary' | 'tertiary';
  button1Size?: 'xs' | 'sm' | 'md' | 'lg';
  button2Label?: string;
  button2Variant?: 'primary' | 'secondary' | 'tertiary';
  button2Size?: 'xs' | 'sm' | 'md' | 'lg';
}> = {
  title: 'Layout/Simple Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Simple Card UBITS con header decorativo, contenido y botones de acción. Usa tokens UBITS para colores, tipografía y espaciado. Incluye controladores completos para personalizar todos los aspectos del componente.'
}
},
    layout: 'centered'
},
  argTypes: {
    // Contenido
    title: {
      control: { type: 'text' },
      description: 'Título de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Advanced Card' },
        category: 'Contenido'
}
},
    subtitle: {
      control: { type: 'text' },
      description: 'Subtítulo de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card subtitle' },
        category: 'Contenido'
}
},
    content: {
      control: { type: 'text' },
      description: 'Contenido de la card',
      table: {
        type: { summary: 'string' },
        category: 'Contenido'
}
},
    // Header
    showHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header decorativo',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Header'
}
},
    headerDecorations: {
      control: { type: 'boolean' },
      description: 'Mostrar burbujas decorativas en el header',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Header'
}
},
    headerBackgroundToken: {
      control: { type: 'select' },
      options: HEADER_BACKGROUND_TOKENS,
      description: 'Token de color para el fondo del header',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-4)' },
        category: 'Tokens - Header'
}
},
    // Tokens - Colores
    backgroundColorToken: {
      control: { type: 'select' },
      options: BACKGROUND_TOKENS,
      description: 'Token de color para el fondo de la card',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-1)' },
        category: 'Tokens - Colores'
}
},
    borderColorToken: {
      control: { type: 'select' },
      options: BORDER_COLOR_TOKENS,
      description: 'Token de color para el borde de la card',
      table: {
        type: { summary: 'CSS Variable' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-border-1)' },
        category: 'Tokens - Colores'
}
},
    // Tokens - Espaciado
    paddingToken: {
      control: { type: 'select' },
      options: PADDING_TOKENS,
      description: 'Token de espaciado para el padding de la card',
      table: {
        type: { summary: 'CSS Variable' },
        category: 'Tokens - Espaciado'
}
},
    // Tokens - Border Radius
    borderRadiusToken: {
      control: { type: 'select' },
      options: BORDER_RADIUS_TOKENS,
      description: 'Token de border radius para la card',
      table: {
        type: { summary: 'CSS Variable' },
        category: 'Tokens - Border Radius'
}
},
    // Tipografía
    titleTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el título',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-heading-h2' },
        category: 'Tipografía'
}
},
    subtitleTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el subtítulo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-body-md' },
        category: 'Tipografía'
}
},
    contentTypographyClass: {
      control: { type: 'select' },
      options: TYPOGRAPHY_CLASSES,
      description: 'Clase de tipografía UBITS para el contenido',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'ubits-body-md' },
        category: 'Tipografía'
}
},
    // Variantes
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante visual de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | elevated | bordered | flat' },
        category: 'Apariencia'
}
},
    // Tamaño
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de la card (sm: 280px, md: 400px, lg: 560px, xl: 720px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg | xl' },
        category: 'Tamaño'
}
},
    maxWidth: {
      control: { type: 'text' },
      description: 'Ancho máximo personalizado (sobrescribe el tamaño por defecto)',
      table: {
        type: { summary: 'string' },
        example: { summary: '500px | 50% | 100vw' },
        category: 'Tamaño'
}
},
    // Botones
    showButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en el footer',
      table: {
        defaultValue: { summary: 'true' },
        category: 'Botones'
}
},
    button1Label: {
      control: { type: 'text' },
      description: 'Texto del primer botón',
      table: {
        defaultValue: { summary: 'Cancel' },
        category: 'Botones'
}
},
    button1Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del primer botón',
      table: {
        defaultValue: { summary: 'secondary' },
        category: 'Botones'
}
},
    button1Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del primer botón',
      table: {
        defaultValue: { summary: 'md' },
        category: 'Botones'
}
},
    button2Label: {
      control: { type: 'text' },
      description: 'Texto del segundo botón',
      table: {
        defaultValue: { summary: 'Save' },
        category: 'Botones'
}
},
    button2Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del segundo botón',
      table: {
        defaultValue: { summary: 'primary' },
        category: 'Botones'
}
},
    button2Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del segundo botón',
      table: {
        defaultValue: { summary: 'md' },
        category: 'Botones'
}
}
}
};

export default meta;
type Story = StoryObj<SimpleCardOptions & {
  backgroundColorToken?: string;
  borderColorToken?: string;
  borderRadiusToken?: string;
  paddingToken?: string;
  headerBackgroundToken?: string;
  titleTypographyClass?: string;
  subtitleTypographyClass?: string;
  contentTypographyClass?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: string;
  button1Label?: string;
  button1Variant?: 'primary' | 'secondary' | 'tertiary';
  button1Size?: 'xs' | 'sm' | 'md' | 'lg';
  button2Label?: string;
  button2Variant?: 'primary' | 'secondary' | 'tertiary';
  button2Size?: 'xs' | 'sm' | 'md' | 'lg';
}>;

// Función helper para construir SimpleCardOptions desde args
function buildSimpleCardOptions(args: any): SimpleCardOptions {
  const buttons = [];
  
  if (args.showButtons !== false) {
    if (args.button1Label) {
      buttons.push({
        label: args.button1Label,
        variant: args.button1Variant || 'secondary',
        size: args.button1Size || 'md'
});
    }
    if (args.button2Label) {
      buttons.push({
        label: args.button2Label,
        variant: args.button2Variant || 'primary',
        size: args.button2Size || 'md'
});
    }
  }

  return {
    title: args.title || 'Advanced Card',
    subtitle: args.subtitle || 'Card subtitle',
    content: args.content || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: args.showHeader !== false,
    headerDecorations: args.headerDecorations !== false,
    headerBackground: args.headerBackgroundToken || 'var(--modifiers-normal-color-light-bg-4)',
    backgroundColor: args.backgroundColorToken || 'var(--modifiers-normal-color-light-bg-1)',
    borderColor: args.borderColorToken || 'var(--modifiers-normal-color-light-border-1)',
    titleTypography: (args.titleTypographyClass || 'ubits-heading-h2') as any,
    subtitleTypography: (args.subtitleTypographyClass || 'ubits-body-md') as any,
    contentTypography: (args.contentTypographyClass || 'ubits-body-md') as any,
    buttons: buttons.length > 0 ? buttons : undefined,
    showButtons: args.showButtons !== false,
    variant: args.variant || 'default',
    size: args.size || 'md',
    maxWidth: args.maxWidth
};
}

export const Default: Story = {
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: true,
    headerDecorations: true,
    headerBackgroundToken: 'var(--modifiers-normal-color-light-bg-4)',
    backgroundColorToken: 'var(--modifiers-normal-color-light-bg-1)',
    borderColorToken: 'var(--modifiers-normal-color-light-border-1)',
    titleTypographyClass: 'ubits-heading-h2',
    subtitleTypographyClass: 'ubits-body-md',
    contentTypographyClass: 'ubits-body-md',
    variant: 'default',
    size: 'md',
    showButtons: true,
    button1Label: 'Cancel',
    button1Variant: 'secondary',
    button1Size: 'md',
    button2Label: 'Save',
    button2Variant: 'primary',
    button2Size: 'md'
},
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.minHeight = '400px';
    container.style.width = '100%';
    
    // Crear wrapper para la card - no limitar ancho, la card se auto-limita según su size
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    
    // Crear card
    const cardElement = createSimpleCard(cardOptions);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);
    
    return container;
  }
};

// Helper para renderizar Simple Card de manera consistente
function renderSimpleCardStory(options: SimpleCardOptions) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'flex-start';
  container.style.padding = '48px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.minHeight = '400px';
  container.style.width = '100%';
  
  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  
  try {
    const cardElement = createSimpleCard(options);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);
  } catch (error) {
    console.error('❌ [SimpleCard Story] Error al crear card:', error);
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Error: ${error instanceof Error ? error.message : 'Error desconocido'}';
    errorDiv.style.color = 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)';
    errorDiv.style.padding = '20px';
    container.appendChild(errorDiv);
  }
  
  return container;
}

/**
 * BasicCard
 * Card básica con solo título
 */
export const BasicCard: Story = {
  name: 'Basic Card',
  args: {
    title: 'Advanced Card',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card básica con solo título.',
      },
    },
  },
};

/**
 * WithSubtitle
 * Card con título y subtítulo
 */
export const WithSubtitle: Story = {
  name: 'With Subtitle',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título y subtítulo.',
      },
    },
  },
};

/**
 * WithContent
 * Card con título y contenido
 */
export const WithContent: Story = {
  name: 'With Content',
  args: {
    title: 'Advanced Card',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título y contenido.',
      },
    },
  },
};

/**
 * WithSubtitleAndContent
 * Card con título, subtítulo y contenido
 */
export const WithSubtitleAndContent: Story = {
  name: 'With Subtitle and Content',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título, subtítulo y contenido.',
      },
    },
  },
};

/**
 * WithHeader
 * Card con header decorativo
 */
export const WithHeader: Story = {
  name: 'With Header',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showHeader: true,
    headerDecorations: true,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con header decorativo.',
      },
    },
  },
};

/**
 * WithoutHeader
 * Card sin header
 */
export const WithoutHeader: Story = {
  name: 'Without Header',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card sin header.',
      },
    },
  },
};

/**
 * WithHeaderDecorations
 * Card con header y decoraciones
 */
export const WithHeaderDecorations: Story = {
  name: 'With Header Decorations',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showHeader: true,
    headerDecorations: true,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con header y decoraciones (burbujas).',
      },
    },
  },
};

/**
 * WithoutHeaderDecorations
 * Card con header sin decoraciones
 */
export const WithoutHeaderDecorations: Story = {
  name: 'Without Header Decorations',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showHeader: true,
    headerDecorations: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con header sin decoraciones.',
      },
    },
  },
};

/**
 * VariantDefault
 * Card variante default
 */
export const VariantDefault: Story = {
  name: 'Variant - Default',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    variant: 'default',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card variante default.',
      },
    },
  },
};

/**
 * VariantElevated
 * Card variante elevated
 */
export const VariantElevated: Story = {
  name: 'Variant - Elevated',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    variant: 'elevated',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card variante elevated (con sombra).',
      },
    },
  },
};

/**
 * VariantBordered
 * Card variante bordered
 */
export const VariantBordered: Story = {
  name: 'Variant - Bordered',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    variant: 'bordered',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card variante bordered.',
      },
    },
  },
};

/**
 * VariantFlat
 * Card variante flat
 */
export const VariantFlat: Story = {
  name: 'Variant - Flat',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    variant: 'flat',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card variante flat (sin borde ni sombra).',
      },
    },
  },
};

/**
 * SizeSmall
 * Card tamaño pequeño
 */
export const SizeSmall: Story = {
  name: 'Size - Small',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'sm',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card tamaño pequeño (sm: 280px).',
      },
    },
  },
};

/**
 * SizeMedium
 * Card tamaño mediano
 */
export const SizeMedium: Story = {
  name: 'Size - Medium',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'md',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card tamaño mediano (md: 400px).',
      },
    },
  },
};

/**
 * SizeLarge
 * Card tamaño grande
 */
export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'lg',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card tamaño grande (lg: 560px).',
      },
    },
  },
};

/**
 * SizeXLarge
 * Card tamaño extra grande
 */
export const SizeXLarge: Story = {
  name: 'Size - XLarge',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'xl',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card tamaño extra grande (xl: 720px).',
      },
    },
  },
};

/**
 * WithButtons
 * Card con botones
 */
export const WithButtons: Story = {
  name: 'With Buttons',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showButtons: true,
    button1Label: 'Cancel',
    button1Variant: 'secondary',
    button2Label: 'Save',
    button2Variant: 'primary'
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con botones.',
      },
    },
  },
};

/**
 * WithoutButtons
 * Card sin botones
 */
export const WithoutButtons: Story = {
  name: 'Without Buttons',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card sin botones.',
      },
    },
  },
};

/**
 * SingleButton
 * Card con un solo botón
 */
export const SingleButton: Story = {
  name: 'Single Button',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showButtons: true,
    button1Label: 'Save',
    button1Variant: 'primary',
    button2Label: ''
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con un solo botón.',
      },
    },
  },
};

/**
 * MultipleButtons
 * Card con múltiples botones
 */
export const MultipleButtons: Story = {
  name: 'Multiple Buttons',
  render: () => {
    const cardOptions: SimpleCardOptions = {
      title: 'Advanced Card',
      subtitle: 'Card subtitle',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      showButtons: true,
      buttons: [
        { label: 'Cancel', variant: 'secondary', size: 'md' },
        { label: 'Save Draft', variant: 'secondary', size: 'md' },
        { label: 'Save', variant: 'primary', size: 'md' }
      ]
    };
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con múltiples botones.',
      },
    },
  },
};

/**
 * ButtonVariants
 * Card con botones de diferentes variantes
 */
export const ButtonVariants: Story = {
  name: 'Button Variants',
  render: () => {
    const cardOptions: SimpleCardOptions = {
      title: 'Advanced Card',
      subtitle: 'Card subtitle',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      showButtons: true,
      buttons: [
        { label: 'Primary', variant: 'primary', size: 'md' },
        { label: 'Secondary', variant: 'secondary', size: 'md' },
        { label: 'Tertiary', variant: 'tertiary', size: 'md' }
      ]
    };
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con botones de diferentes variantes.',
      },
    },
  },
};

/**
 * ButtonSizes
 * Card con botones de diferentes tamaños
 */
export const ButtonSizes: Story = {
  name: 'Button Sizes',
  render: () => {
    const cardOptions: SimpleCardOptions = {
      title: 'Advanced Card',
      subtitle: 'Card subtitle',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      showButtons: true,
      buttons: [
        { label: 'XS', variant: 'secondary', size: 'xs' },
        { label: 'SM', variant: 'secondary', size: 'sm' },
        { label: 'MD', variant: 'secondary', size: 'md' },
        { label: 'LG', variant: 'secondary', size: 'lg' }
      ]
    };
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con botones de diferentes tamaños.',
      },
    },
  },
};

/**
 * ButtonOnClick
 * Card con botones y handlers onClick
 */
export const ButtonOnClick: Story = {
  name: 'Button OnClick',
  render: () => {
    const cardOptions: SimpleCardOptions = {
      title: 'Advanced Card',
      subtitle: 'Card subtitle',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      showButtons: true,
      buttons: [
        {
          label: 'Cancel',
          variant: 'secondary',
          size: 'md',
          onClick: () => {
            alert('Cancel button clicked');
          }
        },
        {
          label: 'Save',
          variant: 'primary',
          size: 'md',
          onClick: () => {
            alert('Save button clicked');
          }
        }
      ]
    };
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con botones y handlers onClick.',
      },
    },
  },
};

/**
 * TitleTypographyH1
 * Card con título typography h1
 */
export const TitleTypographyH1: Story = {
  name: 'Title Typography - H1',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    titleTypographyClass: 'ubits-heading-h1',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título typography h1.',
      },
    },
  },
};

/**
 * TitleTypographyH2
 * Card con título typography h2
 */
export const TitleTypographyH2: Story = {
  name: 'Title Typography - H2',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    titleTypographyClass: 'ubits-heading-h2',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título typography h2.',
      },
    },
  },
};

/**
 * TitleTypographyBody
 * Card con título typography body
 */
export const TitleTypographyBody: Story = {
  name: 'Title Typography - Body',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    titleTypographyClass: 'ubits-body-md',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título typography body.',
      },
    },
  },
};

/**
 * CustomMaxWidth
 * Card con ancho máximo personalizado
 */
export const CustomMaxWidth: Story = {
  name: 'Custom Max Width',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    maxWidth: '600px',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con ancho máximo personalizado.',
      },
    },
  },
};

/**
 * CustomHeaderBackground
 * Card con header background personalizado
 */
export const CustomHeaderBackground: Story = {
  name: 'Custom Header Background',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showHeader: true,
    headerBackgroundToken: 'var(--modifiers-normal-color-light-accent-brand)',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con header background personalizado.',
      },
    },
  },
};

/**
 * LongTitle
 * Card con título largo
 */
export const LongTitle: Story = {
  name: 'Long Title',
  args: {
    title: 'Este es un título muy largo que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con título largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * LongSubtitle
 * Card con subtítulo largo
 */
export const LongSubtitle: Story = {
  name: 'Long Subtitle',
  args: {
    title: 'Advanced Card',
    subtitle: 'Este es un subtítulo muy largo que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con subtítulo largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * LongContent
 * Card con contenido largo
 */
export const LongContent: Story = {
  name: 'Long Content',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Este es un contenido muy largo que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional. El contenido puede contener múltiples líneas de texto y debe manejarse adecuadamente para mantener la legibilidad y el diseño visual.',
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card con contenido largo. Prueba el truncamiento de texto.',
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
    title: 'Advanced Card',
    showHeader: false,
    showButtons: false
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card mínimo con solo título.',
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
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    button1Label: 'Cancel',
    button1Variant: 'secondary',
    button2Label: 'Save',
    button2Variant: 'primary'
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);
    return renderSimpleCardStory(cardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple Card completo con todas las opciones: header, decoraciones, variante elevated, botones, etc.',
      },
    },
  },
};

/**
 * AllVariants
 * Múltiples cards con todas las variantes
 */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.width = '100%';
    
    const variants: Array<'default' | 'elevated' | 'bordered' | 'flat'> = ['default', 'elevated', 'bordered', 'flat'];
    
    variants.forEach(variant => {
      const cardOptions: SimpleCardOptions = {
        title: 'Card ${variant.charAt(0).toUpperCase() + variant.slice(1)}',
        subtitle: 'Variante ${variant}',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        variant: variant,
        showButtons: false
      };
      
      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      
      const cardElement = createSimpleCard(cardOptions);
      wrapper.appendChild(cardElement);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Simple Cards mostrando todas las variantes (default, elevated, bordered, flat).',
      },
    },
  },
};

/**
 * AllSizes
 * Múltiples cards con todos los tamaños
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.width = '100%';
    
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const cardOptions: SimpleCardOptions = {
        title: 'Card ${size.toUpperCase()}',
        subtitle: 'Tamaño ${size}',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        size: size,
        showButtons: false
      };
      
      const wrapper = document.createElement('div');
      wrapper.style.width = '100%';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      
      const cardElement = createSimpleCard(cardOptions);
      wrapper.appendChild(cardElement);
      container.appendChild(wrapper);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Simple Cards mostrando todos los tamaños (sm, md, lg, xl).',
      },
    },
  },
};

