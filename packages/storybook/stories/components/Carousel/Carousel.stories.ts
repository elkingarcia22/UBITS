import type { Meta, StoryObj } from '@storybook/html';
import {
  renderCarousel,
  createCarousel,
  initializeCarousel,
} from '../../../components/carousel/src/CarouselProvider';
import type {
  CarouselOptions,
  CarouselItem,
} from '../../../components/carousel/src/types/CarouselOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../components/carousel/src/styles/carousel.css';
import '../../../components/card/src/styles/simple-card.css';
import '../../../components/button/src/styles/button.css';

// Datos de ejemplo para el carrusel usando Simple Cards
const sampleItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Bamboo Watch',
    subtitle: 'Reloj de madera elegante',
    content:
      'Diseño minimalista con correa de cuero genuino. Perfecto para ocasiones formales e informales.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' },
    ],
  },
  {
    id: 2,
    title: 'Black Watch',
    subtitle: 'Reloj clásico negro',
    content: 'Diseño atemporal con esfera blanca y correa negra. Ideal para el uso diario.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' },
    ],
  },
  {
    id: 3,
    title: 'Blue Band',
    subtitle: 'Pulsera fitness azul',
    content: 'Pulsera inteligente con seguimiento de actividad física y monitoreo de salud.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' },
    ],
  },
  {
    id: 4,
    title: 'Smart Watch',
    subtitle: 'Reloj inteligente premium',
    content: 'Tecnología avanzada con pantalla táctil, GPS integrado y resistencia al agua.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' },
    ],
  },
  {
    id: 5,
    title: 'Classic Watch',
    subtitle: 'Reloj clásico tradicional',
    content: 'Diseño elegante y sofisticado para ocasiones especiales. Movimiento automático.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' },
    ],
  },
];

const meta: Meta<
  CarouselOptions & {
    cardSize?: 'sm' | 'md' | 'lg' | 'xl';
    cardVariant?: 'default' | 'elevated' | 'bordered' | 'flat';
    showCardHeader?: boolean;
    showCardButtons?: boolean;
  }
> = {
  title: 'Layout/Carousel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Carousel UBITS para mostrar Simple Cards en un carrusel navegable. Incluye navegación con flechas, indicadores de paginación, autoplay y soporte para diferentes tamaños de cards.

```html
// 1. Crear contenedor HTML
<div id="carousel-implementation-container"></div>

// 2. Crear Carousel
const carouselElement = window.UBITS.Carousel.create({
  items: [
    {
      id: 1,
      title: 'Bamboo Watch',
      subtitle: 'Reloj de madera elegante',
      content: 'Diseño minimalista con correa de cuero genuino.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    },
    {
      id: 2,
      title: 'Black Watch',
      subtitle: 'Reloj clásico negro',
      content: 'Diseño atemporal con esfera blanca y correa negra.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    },
    {
      id: 3,
      title: 'Blue Band',
      subtitle: 'Pulsera fitness azul',
      content: 'Pulsera inteligente con seguimiento de actividad física.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    }
  ],
  itemsPerView: 3,
  showArrows: true,
  showDots: true,
  autoplay: false,
  autoplayInterval: 3000,
  loop: false,
  gap: 16,
  arrowPosition: 'outside',
  dotPosition: 'bottom',
  onItemClick: (item) => {
    console.log('Item clickeado:', item);
  },
  onSlideChange: (currentIndex) => {
    console.log('Slide cambiado:', currentIndex);
  }
});

// 3. Insertar en el contenedor
const container = document.getElementById('carousel-implementation-container');
if (container) {
  container.appendChild(carouselElement);
}

// Nota: createCarousel retorna un HTMLElement directamente
// Los items del carrusel son SimpleCards que pueden incluir Buttons opcionales
```',
      },
    },
    layout: 'padded',
    ubits: createUBITSContract({
      componentId: '🧩-ux-carousel',
      api: {
        create: 'window.UBITS.Carousel.create',
        tag: '<ubits-carousel>',
      },
      dependsOn: {
        required: [
          '🧩-ux-simple-card', // SimpleCard para renderizar items del carrusel
        ],
        optional: [
          '🧩-ux-button', // Button usado dentro de SimpleCard cuando showButtons es true
        ],
      },
      internals: [],
      slots: {},
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-bg-4',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-accent-brand',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-border-2',
        '--ubits-spacing-none',
        '--ubits-spacing-xs',
        '--ubits-spacing-sm',
        '--ubits-spacing-md',
        '--ubits-spacing-lg',
        '--ubits-spacing-xl',
        '--ubits-border-radius-sm',
        '--ubits-border-radius-md',
        '--font-family-noto-sans-font-family',
        '--carousel-gap',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['items'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `createCarousel(document.getElementById('carousel-container'), {
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1', content: 'Content 1' },
    { id: 2, title: 'Item 2', content: 'Content 2' }
  ],
  onItemClick: function(itemId) {}
});`,
        basic: `createCarousel(document.getElementById('carousel-container'), {
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1', content: 'Content 1' },
    { id: 2, title: 'Item 2', content: 'Content 2' }
  ]
});`,
        withArrows: `createCarousel(document.getElementById('carousel-container'), {
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1', content: 'Content 1' }
  ],
  showArrows: true,
  arrowsPosition: 'outside'
});`,
        withIndicators: `createCarousel(document.getElementById('carousel-container'), {
  containerId: 'carousel-container',
  items: [
    { id: 1, title: 'Item 1', content: 'Content 1' }
  ],
  showIndicators: true,
  indicatorsPosition: 'bottom'
});`,
      },
      variants: {
        arrowsPosition: ['inside', 'outside'],
        indicatorsPosition: ['bottom', 'top'],
        cardSize: ['sm', 'md', 'lg', 'xl'],
        cardVariant: ['default', 'elevated', 'bordered', 'flat'],
      },
      events: {
        onItemClick: {
          type: 'Event',
          description: 'Emitted when a carousel item is clicked',
        },
        onSlideChange: {
          type: 'Event',
          description: 'Emitted when the active slide changes',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'layout-carousel--implementation',
        storiesByExample: {
          canonical: 'layout-carousel--implementation',
          basic: 'layout-carousel--default',
          withArrows: 'layout-carousel--with-arrows',
          withIndicators: 'layout-carousel--with-indicators',
        },
      },
      intents: {
        'carousel.slider': 'canonical',
        'carousel.items': 'canonical',
        'carousel.basic': 'canonical',
        'carousel.with-arrows': 'withArrows',
        'carousel.with-indicators': 'withIndicators',
      },
    }),
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items del carrusel (Simple Cards)',
      table: {
        type: { summary: 'CarouselItem[]' },
        category: 'Contenido',
      },
    },
    itemsPerView: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'Número de items visibles a la vez',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
        category: 'Configuración',
      },
    },
    showArrows: {
      control: { type: 'boolean' },
      description: 'Mostrar flechas de navegación',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Mostrar indicadores de paginación (dots)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Auto-reproducir el carrusel',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Funcionalidad',
      },
    },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervalo en milisegundos para autoplay',
      table: {
        type: { summary: 'number (ms)' },
        defaultValue: { summary: '3000' },
        category: 'Funcionalidad',
      },
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Loop infinito (volver al inicio al llegar al final)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Funcionalidad',
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Espacio entre items en píxeles',
      table: {
        type: { summary: 'number (px)' },
        defaultValue: { summary: '16' },
        category: 'Configuración',
      },
    },
    arrowPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside'],
      description: 'Posición de las flechas de navegación',
      table: {
        type: { summary: 'inside | outside' },
        defaultValue: { summary: 'outside' },
        category: 'Apariencia',
      },
    },
    dotPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
      description: 'Posición de los indicadores de paginación',
      table: {
        type: { summary: 'bottom | top' },
        defaultValue: { summary: 'bottom' },
        category: 'Apariencia',
      },
    },
    cardSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de las Simple Cards',
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Configuración',
      },
    },
    cardVariant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante de las Simple Cards',
      table: {
        type: { summary: 'default | elevated | bordered | flat' },
        defaultValue: { summary: 'elevated' },
        category: 'Configuración',
      },
    },
    showCardHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header en las Simple Cards',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuración',
      },
    },
    showCardButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en las Simple Cards',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuración',
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
    onItemClick: {
      control: false,
      description: 'Callback cuando se hace click en un item',
      table: {
        type: { summary: '(item: CarouselItem) => void' },
        category: 'Eventos',
      },
    },
    onSlideChange: {
      control: false,
      description: 'Callback cuando cambia el slide',
      table: {
        type: { summary: '(currentIndex: number) => void' },
        category: 'Eventos',
      },
    },
  },
};

export default meta;
type Story = StoryObj<
  CarouselOptions & {
    cardSize?: 'sm' | 'md' | 'lg' | 'xl';
    cardVariant?: 'default' | 'elevated' | 'bordered' | 'flat';
    showCardHeader?: boolean;
    showCardButtons?: boolean;
  }
>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="carousel-implementation-container"></div>

// 2. Crear Carousel
const carouselElement = window.UBITS.Carousel.create({
  items: [
    {
      id: 1,
      title: 'Bamboo Watch',
      subtitle: 'Reloj de madera elegante',
      content: 'Diseño minimalista con correa de cuero genuino.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    },
    {
      id: 2,
      title: 'Black Watch',
      subtitle: 'Reloj clásico negro',
      content: 'Diseño atemporal con esfera blanca y correa negra.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    },
    {
      id: 3,
      title: 'Blue Band',
      subtitle: 'Pulsera fitness azul',
      content: 'Pulsera inteligente con seguimiento de actividad física.',
      showHeader: true,
      headerDecorations: true,
      variant: 'elevated',
      size: 'md',
      showButtons: true,
      buttons: [
        { label: 'Ver más', variant: 'primary', size: 'md' },
        { label: 'Favorito', variant: 'secondary', size: 'md' }
      ]
    }
  ],
  itemsPerView: 3,
  showArrows: true,
  showDots: true,
  autoplay: false,
  autoplayInterval: 3000,
  loop: false,
  gap: 16,
  arrowPosition: 'outside',
  dotPosition: 'bottom',
  onItemClick: (item) => {
    console.log('Item clickeado:', item);
  },
  onSlideChange: (currentIndex) => {
    console.log('Slide cambiado:', currentIndex);
  }
});

// 3. Insertar en el contenedor
const container = document.getElementById('carousel-implementation-container');
if (container) {
  container.appendChild(carouselElement);
}

// Nota: createCarousel retorna un HTMLElement directamente
// Los items del carrusel son SimpleCards que pueden incluir Buttons opcionales`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-carousel');
    container.setAttribute('data-ubits-component', 'Carousel');
    container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    `;

    // Aplicar configuración de cards a todos los items
    const itemsWithConfig = sampleItems.slice(0, 6).map((item) => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
    }));

    const carouselOptions: CarouselOptions = {
      items: itemsWithConfig,
      itemsPerView: args.itemsPerView ?? 3,
      showArrows: args.showArrows ?? true,
      showDots: args.showDots ?? true,
      autoplay: args.autoplay ?? false,
      autoplayInterval: args.autoplayInterval ?? 3000,
      loop: args.loop ?? false,
      gap: args.gap ?? 16,
      arrowPosition: args.arrowPosition || 'outside',
      dotPosition: args.dotPosition || 'bottom',
      className: args.className,
      onItemClick: args.onItemClick,
      onSlideChange: args.onSlideChange,
    };

    // Crear carrusel
    try {
      const carouselElement = createCarousel(carouselOptions);
      container.appendChild(carouselElement);
    } catch (error) {
      console.error('Error creando Carousel:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Error: ${error}`;
      errorDiv.style.color = 'red';
      container.appendChild(errorDiv);
    }

    return container;
  },
};

/**
 * Carrusel completo con todos los controles
 */
export const Default: Story = {
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
    onItemClick: (item: CarouselItem) => {
      // Handler para click en item
    },
    onSlideChange: (currentIndex: number) => {
      // Handler para cambio de slide
    },
  },
  render: (args) => {
    // Aplicar configuración de cards a todos los items
    const itemsWithConfig = sampleItems.map((item) => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
      onItemClick: (item: CarouselItem) => {
        if (args.onItemClick) {
          args.onItemClick(item);
        }
      },
    }));

    const carouselOptions: CarouselOptions = {
      items: itemsWithConfig,
      itemsPerView: args.itemsPerView,
      showArrows: args.showArrows,
      showDots: args.showDots,
      autoplay: args.autoplay,
      autoplayInterval: args.autoplayInterval,
      loop: args.loop,
      gap: args.gap,
      arrowPosition: args.arrowPosition,
      dotPosition: args.dotPosition,
      className: args.className,
      onItemClick: args.onItemClick,
      onSlideChange: args.onSlideChange,
    };

    // Crear contenedor
    const container = document.createElement('div');

    // Renderizar HTML primero
    container.innerHTML = renderCarousel(carouselOptions);
    const carouselElement = container.querySelector('.ubits-carousel') as HTMLElement;

    // Inicializar después de que el DOM esté listo usando requestAnimationFrame
    if (carouselElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeCarousel(carouselElement, carouselOptions);
        });
      });
    }

    return container;
  },
};

