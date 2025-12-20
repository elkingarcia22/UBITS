import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from './_shared/ubitsContract';

interface ContenedorOptions {
  content: string;
  showBorder: boolean;
  backgroundVariant: 'bg1' | 'bg2' | 'bg3' | 'bg4';
}

const meta: Meta<ContenedorOptions> = {
  title: 'Layout/Contenedor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente contenedor básico UBITS con fondo configurable (bg1, bg2, bg3, bg4), bordes con radio de 8px y padding interno de 12px. Usa tokens UBITS para mantener consistencia visual.'
      }
    },
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-contenedor',
      api: {
        create: 'renderContenedor', // Función helper que genera HTML
        tag: '<ubits-contenedor>',
      },
      dependsOn: {
        required: [],
        optional: [],
      },
      internals: [],
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-bg-3',
        '--modifiers-normal-color-light-bg-4',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-border-1',
        '--p-spacing-mode-1-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `const container = document.createElement('div');
container.className = 'ubits-container';
container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
container.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
container.style.borderRadius = '8px';
container.textContent = 'Contenido del contenedor';`,
        basic: `const container = document.createElement('div');
container.className = 'ubits-container';
container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
container.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
container.style.borderRadius = '8px';
container.textContent = 'Contenido del contenedor';`,
        withBorder: `const container = document.createElement('div');
container.className = 'ubits-container';
container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
container.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
container.style.borderRadius = '8px';
container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
container.textContent = 'Contenido del contenedor';`,
      },
      variants: {
        backgroundVariant: ['bg1', 'bg2', 'bg3', 'bg4'],
        showBorder: [true, false],
      },
      events: {},
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'layout-contenedor--implementation',
        storiesByExample: {
          canonical: 'layout-contenedor--implementation',
          basic: 'layout-contenedor--default',
          withBorder: 'layout-contenedor--with-border',
        },
      },
      intents: {
        'container.basic': 'canonical',
        'container.wrapper': 'canonical',
        'container.basic': 'canonical',
        'container.with-border': 'withBorder',
      },
    }),
  },
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'Contenido del contenedor',
      table: {
        type: { summary: 'string' }
}
},
    showBorder: {
      control: { type: 'boolean' },
      description: 'Mostrar borde visual (opcional, solo para demostración)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    backgroundVariant: {
      control: { type: 'select' },
      options: ['bg1', 'bg2', 'bg3', 'bg4'],
      description: 'Variante de fondo del contenedor',
      table: {
        defaultValue: { summary: 'bg1' }
}
}
}
};

export default meta;
type Story = StoryObj<ContenedorOptions>;

// Helper para renderizar contenedor de manera consistente
function renderContenedor(args: ContenedorOptions, maxWidth: string = '600px') {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.borderRadius = '8px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.justifyContent = 'center';
  preview.style.alignItems = 'center';
  preview.style.padding = '40px';
  preview.style.minHeight = '200px';
  preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  preview.style.borderRadius = '8px';
  preview.style.marginBottom = '20px';
  
  // Crear el contenedor UBITS
  const ubitsContainer = document.createElement('div');
  ubitsContainer.className = 'ubits-container';
  
  // Aplicar variante de fondo según el control
  const bgVariant = args.backgroundVariant || 'bg1';
  const bgNumber = bgVariant.replace('bg', '');
  const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
  ubitsContainer.style.background = bgToken;
  ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
  ubitsContainer.style.borderRadius = '8px';
  ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
  ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
  ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
  ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
  ubitsContainer.style.maxWidth = maxWidth;
  ubitsContainer.style.width = '100%';
  
  // Agregar borde si se solicita
  if (args.showBorder) {
    ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  }
  
  // Agregar contenido
  const contentText = document.createElement('p');
  contentText.style.margin = '0';
  contentText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
  contentText.textContent = args.content || 'Contenido del contenedor';
  
  ubitsContainer.appendChild(contentText);
  preview.appendChild(ubitsContainer);
  container.appendChild(preview);
  
  return container;
}

export const Default: Story = {
  args: {
    content: 'Este es un contenedor básico con fondo configurable, border-radius de 8px y padding interno de 12px. Puedes cambiar el fondo, agregar un borde y personalizar el contenido usando los controles.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
};

/**
 * BackgroundVariant1
 * Contenedor con fondo bg1 (default)
 */
export const BackgroundVariant1: Story = {
  name: 'Background Variant - bg1',
  args: {
    content: 'Contenedor con fondo bg1 (comportamiento por defecto).',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con fondo bg1. Comportamiento por defecto.',
      },
    },
  },
};

/**
 * BackgroundVariant2
 * Contenedor con fondo bg2
 */
export const BackgroundVariant2: Story = {
  name: 'Background Variant - bg2',
  args: {
    content: 'Contenedor con fondo bg2.',
    showBorder: false,
    backgroundVariant: 'bg2'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con fondo bg2.',
      },
    },
  },
};

/**
 * BackgroundVariant3
 * Contenedor con fondo bg3
 */
export const BackgroundVariant3: Story = {
  name: 'Background Variant - bg3',
  args: {
    content: 'Contenedor con fondo bg3.',
    showBorder: false,
    backgroundVariant: 'bg3'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con fondo bg3.',
      },
    },
  },
};

/**
 * BackgroundVariant4
 * Contenedor con fondo bg4
 */
export const BackgroundVariant4: Story = {
  name: 'Background Variant - bg4',
  args: {
    content: 'Contenedor con fondo bg4.',
    showBorder: false,
    backgroundVariant: 'bg4'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con fondo bg4.',
      },
    },
  },
};

/**
 * WithBorder
 * Contenedor con borde visible
 */
export const WithBorder: Story = {
  name: 'With Border',
  args: {
    content: 'Contenedor con borde visible. Útil para demostración visual.',
    showBorder: true,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con borde visible. Útil para demostración visual.',
      },
    },
  },
};

/**
 * WithoutBorder
 * Contenedor sin borde (default)
 */
export const WithoutBorder: Story = {
  name: 'Without Border',
  args: {
    content: 'Contenedor sin borde (comportamiento por defecto).',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor sin borde. Comportamiento por defecto.',
      },
    },
  },
};

/**
 * ShortContent
 * Contenedor con contenido corto
 */
export const ShortContent: Story = {
  name: 'Short Content',
  args: {
    content: 'Texto corto.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con contenido corto.',
      },
    },
  },
};

/**
 * LongContent
 * Contenedor con contenido largo
 */
export const LongContent: Story = {
  name: 'Long Content',
  args: {
    content: 'Este es un contenedor con contenido muy largo que debería hacer wrap correctamente. El texto se ajusta automáticamente dentro del contenedor respetando el padding de 12px y el border-radius de 8px. El contenido largo es útil para probar cómo se comporta el contenedor con diferentes cantidades de texto y asegurar que el diseño se mantiene consistente.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con contenido largo. Prueba el wrap de texto.',
      },
    },
  },
};

/**
 * EmptyContent
 * Contenedor vacío o con contenido mínimo
 */
export const EmptyContent: Story = {
  name: 'Empty Content',
  args: {
    content: '',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => {
    const container = renderContenedor(args);
    const ubitsContainer = container.querySelector('.ubits-container') as HTMLElement;
    if (ubitsContainer) {
      ubitsContainer.style.minHeight = '60px';
      ubitsContainer.style.display = 'flex';
      ubitsContainer.style.alignItems = 'center';
      ubitsContainer.style.justifyContent = 'center';
      const emptyText = document.createElement('span');
      emptyText.textContent = 'Contenedor vacío';
      emptyText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      emptyText.style.fontStyle = 'italic';
      ubitsContainer.innerHTML = '';
      ubitsContainer.appendChild(emptyText);
    }
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Contenedor vacío o con contenido mínimo.',
      },
    },
  },
};

/**
 * RichContent
 * Contenedor con contenido rico
 */
export const RichContent: Story = {
  name: 'Rich Content',
  args: {
    content: 'Contenedor con contenido rico.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '300px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgNumber = bgVariant.replace('bg', '');
    const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    ubitsContainer.style.borderRadius = '8px';
    ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
    ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
    ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
    ubitsContainer.style.maxWidth = '600px';
    ubitsContainer.style.width = '100%';
    
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    }
    
    // Contenido rico
    const title = document.createElement('h3');
    title.textContent = 'Título del Contenedor';
    title.style.margin = '0 0 12px 0';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontSize = 'var(--modifiers-normal-body-lg-bold-fontsize, 16px)';
    title.style.fontWeight = '600';
    
    const paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Este es el primer párrafo del contenido. Muestra cómo el contenedor puede albergar múltiples elementos.';
    paragraph1.style.margin = '0 0 12px 0';
    paragraph1.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    
    const paragraph2 = document.createElement('p');
    paragraph2.textContent = 'Este es el segundo párrafo. El contenedor mantiene el padding consistente y el diseño limpio.';
    paragraph2.style.margin = '0';
    paragraph2.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    
    ubitsContainer.appendChild(title);
    ubitsContainer.appendChild(paragraph1);
    ubitsContainer.appendChild(paragraph2);
    
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Contenedor con contenido rico (múltiples párrafos, títulos, etc.).',
      },
    },
  },
};

/**
 * NestedContainers
 * Contenedores anidados
 */
export const NestedContainers: Story = {
  name: 'Nested Containers',
  args: {
    content: 'Contenedor anidado.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '300px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    
    // Contenedor externo
    const outerContainer = document.createElement('div');
    outerContainer.className = 'ubits-container';
    outerContainer.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    outerContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    outerContainer.style.borderRadius = '8px';
    outerContainer.style.maxWidth = '600px';
    outerContainer.style.width = '100%';
    
    const outerText = document.createElement('p');
    outerText.textContent = 'Contenedor externo (bg1)';
    outerText.style.margin = '0 0 12px 0';
    outerText.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    outerText.style.fontWeight = '600';
    outerContainer.appendChild(outerText);
    
    // Contenedor interno
    const innerContainer = document.createElement('div');
    innerContainer.className = 'ubits-container';
    innerContainer.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    innerContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    innerContainer.style.borderRadius = '8px';
    innerContainer.style.marginTop = '12px';
    
    const innerText = document.createElement('p');
    innerText.textContent = 'Contenedor interno (bg2) anidado dentro del contenedor externo.';
    innerText.style.margin = '0';
    innerText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    innerContainer.appendChild(innerText);
    
    outerContainer.appendChild(innerContainer);
    preview.appendChild(outerContainer);
    container.appendChild(preview);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Contenedores anidados (contenedor dentro de contenedor).',
      },
    },
  },
};

/**
 * MultipleContainers
 * Múltiples contenedores en un layout
 */
export const MultipleContainers: Story = {
  name: 'Multiple Containers',
  args: {
    content: 'Contenedor individual.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'grid';
    preview.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    preview.style.gap = '16px';
    preview.style.padding = '40px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    
    const variants: Array<'bg1' | 'bg2' | 'bg3' | 'bg4'> = ['bg1', 'bg2', 'bg3', 'bg4'];
    const contents = [
      'Contenedor con fondo bg1',
      'Contenedor con fondo bg2',
      'Contenedor con fondo bg3',
      'Contenedor con fondo bg4'
    ];
    
    variants.forEach((variant, index) => {
      const ubitsContainer = document.createElement('div');
      ubitsContainer.className = 'ubits-container';
      const bgNumber = variant.replace('bg', '');
      const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
      ubitsContainer.style.background = bgToken;
      ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
      ubitsContainer.style.borderRadius = '8px';
      ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
      ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
      ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
      
      const contentText = document.createElement('p');
      contentText.textContent = contents[index];
      contentText.style.margin = '0';
      contentText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      ubitsContainer.appendChild(contentText);
      
      preview.appendChild(ubitsContainer);
    });
    
    container.appendChild(preview);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples contenedores en un layout grid. Muestra diferentes variantes de fondo.',
      },
    },
  },
};

/**
 * ResponsiveExample
 * Contenedor responsive
 */
export const ResponsiveExample: Story = {
  name: 'Responsive Example',
  args: {
    content: 'Este contenedor es responsive y se adapta a diferentes tamaños de pantalla. El max-width se ajusta automáticamente y el padding se mantiene consistente.',
    showBorder: false,
    backgroundVariant: 'bg1'
  },
  render: (args) => renderContenedor(args, '100%'),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor responsive. Se adapta a diferentes tamaños de pantalla.',
      },
    },
  },
};

/**
 * CompleteExample
 * Contenedor completo con todas las opciones
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    content: 'Contenedor completo con todas las opciones configuradas: fondo bg2, borde visible, y contenido personalizado.',
    showBorder: true,
    backgroundVariant: 'bg2'
  },
  render: (args) => renderContenedor(args),
  parameters: {
    docs: {
      description: {
        story: 'Contenedor completo con todas las opciones configuradas: fondo bg2, borde visible, y contenido personalizado.',
      },
    },
  },
};

