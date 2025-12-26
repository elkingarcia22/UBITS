import type { Meta, StoryObj } from '@storybook/html';
import { renderSimpleCard, createSimpleCard } from '../../../components/card/src/SimpleCardProvider';
import type { SimpleCardOptions } from '../../../components/card/src/types/SimpleCardOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../components/card/src/styles/simple-card.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<
  SimpleCardOptions & {
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
  }
> = {
  title: 'Layout/Simple Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Simple Card UBITS con header decorativo, contenido y botones de acción. Usa tokens UBITS para colores, tipografía y espaciado. Incluye controladores completos para personalizar todos los aspectos del componente.',
      },
    },
    layout: 'centered',
    ubits: createUBITSContract({
      componentId: '🧩-ux-simple-card',
      api: {
        create: 'createSimpleCard', // Función importada directamente
        render: 'renderSimpleCard', // Función importada directamente
        // Nota: SimpleCard se usa principalmente como dependencia de otros componentes (ej: Carousel)
        // pero también puede usarse directamente importando las funciones
      },
      dependsOn: {
        required: [],
        optional: [
          '🧩-ux-button', // Botones en el footer cuando showButtons es true
        ],
      },
      internals: [],
      slots: {},
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-bg-3',
        '--modifiers-normal-color-light-bg-4',
        '--modifiers-normal-color-light-bg-5',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-border-2',
        '--modifiers-normal-color-light-border-3',
        '--modifiers-normal-color-light-accent-brand',
        '--modifiers-normal-color-light-feedback-border-error',
        '--ubits-spacing-md',
        '--ubits-spacing-lg',
        '--ubits-spacing-xl',
        '--ubits-spacing-2xl',
        '--ubits-spacing-3xl',
        '--ubits-border-radius-sm',
        '--font-family-noto-sans-font-family',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['title'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `createSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: '<p>Card content</p>'
});`,
        basic: `createSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: '<p>Card content</p>'
});`,
        withHeader: `createSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: '<p>Card content</p>',
  showHeader: true
});`,
        withButtons: `createSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: '<p>Card content</p>',
  showButtons: true,
  button1Label: 'Action 1',
  button2Label: 'Action 2'
});`,
      },
      variants: {
        showHeader: [true, false],
        showButtons: [true, false],
      },
      events: {
        onButton1Click: {
          type: 'Event',
          description: 'Emitted when first button is clicked',
        },
        onButton2Click: {
          type: 'Event',
          description: 'Emitted when second button is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'layout-simple-card--implementation',
        storiesByExample: {
          canonical: 'layout-simple-card--implementation',
          basic: 'layout-simple-card--default',
          withHeader: 'layout-simple-card--with-header',
          withButtons: 'layout-simple-card--with-buttons',
        },
      },
      intents: {
        'card.simple': 'canonical',
        'card.basic': 'canonical',
        'card.content': 'canonical',
        'card.with-header': 'withHeader',
        'card.with-buttons': 'withButtons',
      },
    }),
  },
  argTypes: {
    // Contenido
    title: {
      control: { type: 'text' },
      description: 'Título de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Advanced Card' },
        category: 'Contenido',
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtítulo de la card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Card subtitle' },
        category: 'Contenido',
      },
    },
    content: {
      control: { type: 'text' },
      description: 'Contenido de la card',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    // Header
    showHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header decorativo',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Header',
      },
    },
    headerDecorations: {
      control: { type: 'boolean' },
      description: 'Mostrar burbujas decorativas en el header',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Header',
      },
    },
    // Variantes
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante visual de la card',
      table: {
        type: { summary: 'default | elevated | bordered | flat' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    // Tamaño
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de la card (sm: 280px, md: 400px, lg: 560px, xl: 720px)',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Tamaño',
      },
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Ancho máximo personalizado (sobrescribe el tamaño por defecto)',
      table: {
        type: { summary: 'string' },
        example: { summary: '500px | 50% | 100vw' },
        category: 'Tamaño',
      },
    },
    // Botones
    showButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en el footer',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Botones',
      },
    },
    button1Label: {
      control: { type: 'text' },
      description: 'Texto del primer botón',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Cancel' },
        category: 'Botones',
      },
    },
    button1Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del primer botón',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'secondary' },
        category: 'Botones',
      },
    },
    button1Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del primer botón',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Botones',
      },
    },
    button2Label: {
      control: { type: 'text' },
      description: 'Texto del segundo botón',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Save' },
        category: 'Botones',
      },
    },
    button2Variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del segundo botón',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
        category: 'Botones',
      },
    },
    button2Size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del segundo botón',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Botones',
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
  },
};

export default meta;
type Story = StoryObj<
  SimpleCardOptions & {
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
  }
>;

// Función helper para construir SimpleCardOptions desde args
function buildSimpleCardOptions(args: any): SimpleCardOptions {
  const buttons = [];

  if (args.showButtons !== false) {
    if (args.button1Label) {
      buttons.push({
        label: args.button1Label,
        variant: args.button1Variant || 'secondary',
        size: args.button1Size || 'md',
      });
    }
    if (args.button2Label) {
      buttons.push({
        label: args.button2Label,
        variant: args.button2Variant || 'primary',
        size: args.button2Size || 'md',
      });
    }
  }

  return {
    title: args.title || 'Advanced Card',
    subtitle: args.subtitle || 'Card subtitle',
    content:
      args.content ||
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perendis esse, cupiditate neque quas!',
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
    maxWidth: args.maxWidth,
    className: args.className,
  };
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perendis esse, cupiditate neque quas!',
    showHeader: true,
    headerDecorations: true,
    variant: 'default',
    size: 'md',
    showButtons: true,
    button1Label: 'Cancel',
    button1Variant: 'secondary',
    button1Size: 'md',
    button2Label: 'Save',
    button2Variant: 'primary',
    button2Size: 'md',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Importar funciones (si usas módulos)
// import { createSimpleCard, renderSimpleCard } from '@ubits/card';

// 2. Crear SimpleCard
const cardElement = createSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
  showHeader: true,
  headerDecorations: true,
  headerBackground: 'var(--modifiers-normal-color-light-bg-4)',
  backgroundColor: 'var(--modifiers-normal-color-light-bg-1)',
  borderColor: 'var(--modifiers-normal-color-light-border-1)',
  titleTypography: 'ubits-heading-h2',
  subtitleTypography: 'ubits-body-md',
  contentTypography: 'ubits-body-md',
  buttons: [
    {
      label: 'Cancel',
      variant: 'secondary',
      size: 'md',
      onClick: () => {
        console.log('Cancel clicked');
      }
    },
    {
      label: 'Save',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        console.log('Save clicked');
      }
    }
  ],
  showButtons: true,
  variant: 'default', // 'default' | 'elevated' | 'bordered' | 'flat'
  size: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  maxWidth: undefined, // Opcional: '500px' | '50%' | '100vw'
  className: ''
});

// 3. Insertar en el DOM
const container = document.getElementById('card-container');
if (container) {
  container.appendChild(cardElement);
}

// Nota: createSimpleCard retorna un HTMLElement directamente
// Los botones con onClick se configuran automáticamente

// Alternativa: Usar renderSimpleCard para obtener HTML string
const cardHTML = renderSimpleCard({
  title: 'Advanced Card',
  subtitle: 'Card subtitle',
  content: 'Lorem ipsum dolor sit amet...',
  variant: 'elevated',
  size: 'lg'
});

// Insertar HTML
const container = document.getElementById('card-container');
if (container) {
  container.innerHTML = cardHTML;
}`,
      },
    },
  },
  render: (args) => {
    const cardOptions = buildSimpleCardOptions(args);

    // Crear contenedor
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-simple-card');
    container.setAttribute('data-ubits-component', 'SimpleCard');
    container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 48px;
      background: var(--modifiers-normal-color-light-bg-2);
      min-height: 400px;
      width: 100%;
    `;

    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      display: flex;
      justify-content: center;
    `;

    // Crear card
    try {
      const cardElement = createSimpleCard(cardOptions);
      wrapper.appendChild(cardElement);
    } catch (error) {
      console.error('Error creando SimpleCard:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Error: ${error}`;
      errorDiv.style.color = 'red';
      wrapper.appendChild(errorDiv);
    }

    container.appendChild(wrapper);
    return container;
  },
};

export const Default: Story = {
  args: {
    title: 'Advanced Card',
    subtitle: 'Card subtitle',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perendis esse, cupiditate neque quas!',
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
    button2Size: 'md',
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

    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';

    // Crear card
    const cardElement = createSimpleCard(cardOptions);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);

    return container;
  },
};


