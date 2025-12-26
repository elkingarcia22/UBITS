import type { Meta, StoryObj } from '@storybook/html';
import { renderCarousel, createCarousel, initializeCarousel } from '../../components/carousel/src/CarouselProvider';
import type { CarouselOptions, CarouselItem } from '../../components/carousel/src/types/CarouselOptions';
import '../../components/carousel/src/styles/carousel.css';
import '../../components/card/src/styles/simple-card.css';
import '../../components/button/src/styles/button.css';

// Datos de ejemplo para el carrusel usando Simple Cards
const sampleItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Bamboo Watch',
    subtitle: 'Reloj de madera elegante',
    content: 'Diseño minimalista con correa de cuero genuino. Perfecto para ocasiones formales e informales.',
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
    content: 'Diseño atemporal con esfera blanca y correa negra. Ideal para el uso diario.',
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
    content: 'Pulsera inteligente con seguimiento de actividad física y monitoreo de salud.',
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
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
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
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 6,
    title: 'Sport Watch',
    subtitle: 'Reloj deportivo',
    content: 'Resistente al agua y diseñado para atletas. Cronómetro y múltiples funciones deportivas.',
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
    id: 7,
    title: 'Luxury Watch',
    subtitle: 'Reloj de lujo',
    content: 'Edición limitada con materiales premium. Diseño exclusivo para coleccionistas.',
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
    id: 8,
    title: 'Digital Watch',
    subtitle: 'Reloj digital moderno',
    content: 'Pantalla LED de alta resolución con múltiples funciones y conectividad Bluetooth.',
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
    id: 9,
    title: 'Vintage Watch',
    subtitle: 'Reloj vintage',
    content: 'Diseño retro con mecanismo de cuerda manual. Perfecto para amantes de lo clásico.',
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
    id: 10,
    title: 'Fitness Tracker',
    subtitle: 'Monitor de actividad',
    content: 'Seguimiento completo de actividad física, sueño y salud cardiovascular.',
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
    id: 11,
    title: 'Diving Watch',
    subtitle: 'Reloj de buceo',
    content: 'Resistente hasta 300 metros de profundidad. Ideal para deportes acuáticos.',
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
    id: 12,
    title: 'Chronograph Watch',
    subtitle: 'Cronógrafo profesional',
    content: 'Precisión milimétrica con funciones de cronometraje avanzadas para profesionales.',
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
];

const meta: Meta<CarouselOptions> = {
  title: 'Layout/Carousel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Carousel UBITS para mostrar Simple Cards en un carrusel navegable. Incluye navegación con flechas, indicadores de paginación, autoplay y soporte para diferentes tamaños de cards.`,
      },
    },
    layout: 'padded',
  },
  argTypes: {
    itemsPerView: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'Número de items visibles a la vez',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
    showArrows: {
      control: { type: 'boolean' },
      description: 'Mostrar flechas de navegación',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Mostrar indicadores de paginación (dots)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Auto-reproducir el carrusel',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervalo en milisegundos para autoplay',
      table: {
        defaultValue: { summary: '3000' },
        type: { summary: 'number (ms)' },
      },
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Loop infinito (volver al inicio al llegar al final)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Espacio entre items en píxeles',
      table: {
        defaultValue: { summary: '16' },
        type: { summary: 'number (px)' },
      },
    },
    arrowPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside'],
      description: 'Posición de las flechas de navegación',
      table: {
        defaultValue: { summary: 'outside' },
        type: { summary: 'inside | outside' },
      },
    },
    dotPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
      description: 'Posición de los indicadores de paginación',
      table: {
        defaultValue: { summary: 'bottom' },
        type: { summary: 'bottom | top' },
      },
    },
    cardSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de las Simple Cards',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg | xl' },
      },
    },
    cardVariant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante de las Simple Cards',
      table: {
        defaultValue: { summary: 'elevated' },
        type: { summary: 'default | elevated | bordered | flat' },
      },
    },
    showCardHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header en las Simple Cards',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showCardButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en las Simple Cards',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CarouselOptions & { cardSize?: 'sm' | 'md' | 'lg' | 'xl'; cardVariant?: 'default' | 'elevated' | 'bordered' | 'flat'; showCardHeader?: boolean; showCardButtons?: boolean }>;

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
    }
  },
  render: (args) => {
    // Aplicar configuración de cards a todos los items
    const itemsWithConfig = sampleItems.map(item => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
      onItemClick: (item: CarouselItem) => {
        if (args.onItemClick) {
          args.onItemClick(item);
        }
      }
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
      onSlideChange: args.onSlideChange
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

// Helper para renderizar carrusel de manera consistente
function renderCarouselStory(options: CarouselOptions & { cardSize?: 'sm' | 'md' | 'lg' | 'xl'; cardVariant?: 'default' | 'elevated' | 'bordered' | 'flat'; showCardHeader?: boolean; showCardButtons?: boolean }) {
  const itemsWithConfig = sampleItems.map(item => ({
    ...item,
    size: options.cardSize || 'md',
    variant: options.cardVariant || 'elevated',
    showHeader: options.showCardHeader !== false,
    showButtons: options.showCardButtons !== false,
  }));

  const carouselOptions: CarouselOptions = {
    items: itemsWithConfig,
    itemsPerView: options.itemsPerView,
    showArrows: options.showArrows,
    showDots: options.showDots,
    autoplay: options.autoplay,
    autoplayInterval: options.autoplayInterval,
    loop: options.loop,
    gap: options.gap,
    arrowPosition: options.arrowPosition,
    dotPosition: options.dotPosition,
    className: options.className,
    onItemClick: options.onItemClick,
    onSlideChange: options.onSlideChange
  };

  const container = document.createElement('div');
  container.innerHTML = renderCarousel(carouselOptions);
  const carouselElement = container.querySelector('.ubits-carousel') as HTMLElement;
  
  if (carouselElement) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initializeCarousel(carouselElement, carouselOptions);
      });
    });
  }
  
  return container;
}

/**
 * ItemsPerView1
 * Carrusel con 1 item visible a la vez
 */
export const ItemsPerView1: Story = {
  name: 'Items Per View - 1',
  args: {
    itemsPerView: 1,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 1 item visible a la vez. Ideal para destacar un contenido a la vez.',
      },
    },
  },
};

/**
 * ItemsPerView2
 * Carrusel con 2 items visibles a la vez
 */
export const ItemsPerView2: Story = {
  name: 'Items Per View - 2',
  args: {
    itemsPerView: 2,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 2 items visibles a la vez.',
      },
    },
  },
};

/**
 * ItemsPerView3
 * Carrusel con 3 items visibles a la vez (default)
 */
export const ItemsPerView3: Story = {
  name: 'Items Per View - 3',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 3 items visibles a la vez (comportamiento por defecto).',
      },
    },
  },
};

/**
 * ItemsPerView4
 * Carrusel con 4 items visibles a la vez
 */
export const ItemsPerView4: Story = {
  name: 'Items Per View - 4',
  args: {
    itemsPerView: 4,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 4 items visibles a la vez.',
      },
    },
  },
};

/**
 * ItemsPerView5
 * Carrusel con 5 items visibles a la vez
 */
export const ItemsPerView5: Story = {
  name: 'Items Per View - 5',
  args: {
    itemsPerView: 5,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 5 items visibles a la vez.',
      },
    },
  },
};

/**
 * ItemsPerView6
 * Carrusel con 6 items visibles a la vez
 */
export const ItemsPerView6: Story = {
  name: 'Items Per View - 6',
  args: {
    itemsPerView: 6,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con 6 items visibles a la vez (máximo).',
      },
    },
  },
};

/**
 * WithoutArrows
 * Carrusel sin flechas de navegación
 */
export const WithoutArrows: Story = {
  name: 'Without Arrows',
  args: {
    itemsPerView: 3,
    showArrows: false,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel sin flechas de navegación. La navegación se realiza solo con los dots.',
      },
    },
  },
};

/**
 * WithoutDots
 * Carrusel sin indicadores de paginación
 */
export const WithoutDots: Story = {
  name: 'Without Dots',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: false,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel sin indicadores de paginación. La navegación se realiza solo con las flechas.',
      },
    },
  },
};

/**
 * WithoutArrowsAndDots
 * Carrusel sin flechas ni dots
 */
export const WithoutArrowsAndDots: Story = {
  name: 'Without Arrows and Dots',
  args: {
    itemsPerView: 3,
    showArrows: false,
    showDots: false,
    autoplay: true,
    autoplayInterval: 3000,
    loop: true,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel sin flechas ni dots. Solo autoplay con loop infinito.',
      },
    },
  },
};

/**
 * Autoplay
 * Carrusel con autoplay activado
 */
export const Autoplay: Story = {
  name: 'Autoplay',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: true,
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con autoplay activado. Se pausa al hacer hover.',
      },
    },
  },
};

/**
 * AutoplayFast
 * Carrusel con autoplay rápido
 */
export const AutoplayFast: Story = {
  name: 'Autoplay - Fast',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplayInterval: 1000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con autoplay rápido (1000ms).',
      },
    },
  },
};

/**
 * AutoplaySlow
 * Carrusel con autoplay lento
 */
export const AutoplaySlow: Story = {
  name: 'Autoplay - Slow',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplayInterval: 5000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con autoplay lento (5000ms).',
      },
    },
  },
};

/**
 * Loop
 * Carrusel con loop infinito
 */
export const Loop: Story = {
  name: 'Loop',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: true,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con loop infinito. Al llegar al final, vuelve al inicio.',
      },
    },
  },
};

/**
 * AutoplayWithLoop
 * Carrusel con autoplay y loop
 */
export const AutoplayWithLoop: Story = {
  name: 'Autoplay with Loop',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplayInterval: 3000,
    loop: true,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con autoplay y loop infinito. Reproducción continua.',
      },
    },
  },
};

/**
 * Gap0
 * Carrusel sin espacio entre items
 */
export const Gap0: Story = {
  name: 'Gap - 0px',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 0,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel sin espacio entre items (gap: 0px).',
      },
    },
  },
};

/**
 * Gap8
 * Carrusel con gap pequeño
 */
export const Gap8: Story = {
  name: 'Gap - 8px',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 8,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con gap pequeño (8px).',
      },
    },
  },
};

/**
 * Gap16
 * Carrusel con gap medio (default)
 */
export const Gap16: Story = {
  name: 'Gap - 16px',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con gap medio (16px, comportamiento por defecto).',
      },
    },
  },
};

/**
 * Gap24
 * Carrusel con gap grande
 */
export const Gap24: Story = {
  name: 'Gap - 24px',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 24,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con gap grande (24px).',
      },
    },
  },
};

/**
 * Gap32
 * Carrusel con gap muy grande
 */
export const Gap32: Story = {
  name: 'Gap - 32px',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 32,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con gap muy grande (32px).',
      },
    },
  },
};

/**
 * ArrowPositionInside
 * Carrusel con flechas dentro del contenedor
 */
export const ArrowPositionInside: Story = {
  name: 'Arrow Position - Inside',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'inside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con flechas dentro del contenedor.',
      },
    },
  },
};

/**
 * ArrowPositionOutside
 * Carrusel con flechas fuera del contenedor (default)
 */
export const ArrowPositionOutside: Story = {
  name: 'Arrow Position - Outside',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con flechas fuera del contenedor (comportamiento por defecto).',
      },
    },
  },
};

/**
 * DotPositionTop
 * Carrusel con dots en la parte superior
 */
export const DotPositionTop: Story = {
  name: 'Dot Position - Top',
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'top',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con dots en la parte superior.',
      },
    },
  },
};

/**
 * DotPositionBottom
 * Carrusel con dots en la parte inferior (default)
 */
export const DotPositionBottom: Story = {
  name: 'Dot Position - Bottom',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con dots en la parte inferior (comportamiento por defecto).',
      },
    },
  },
};

/**
 * CardSizeSmall
 * Carrusel con cards pequeñas
 */
export const CardSizeSmall: Story = {
  name: 'Card Size - Small',
  args: {
    itemsPerView: 4,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'sm',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards pequeñas (sm).',
      },
    },
  },
};

/**
 * CardSizeMedium
 * Carrusel con cards medianas (default)
 */
export const CardSizeMedium: Story = {
  name: 'Card Size - Medium',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards medianas (md, comportamiento por defecto).',
      },
    },
  },
};

/**
 * CardSizeLarge
 * Carrusel con cards grandes
 */
export const CardSizeLarge: Story = {
  name: 'Card Size - Large',
  args: {
    itemsPerView: 2,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'lg',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards grandes (lg).',
      },
    },
  },
};

/**
 * CardSizeXLarge
 * Carrusel con cards extra grandes
 */
export const CardSizeXLarge: Story = {
  name: 'Card Size - XLarge',
  args: {
    itemsPerView: 1,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'xl',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards extra grandes (xl).',
      },
    },
  },
};

/**
 * CardVariantDefault
 * Carrusel con cards variante default
 */
export const CardVariantDefault: Story = {
  name: 'Card Variant - Default',
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
    cardVariant: 'default',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards variante default.',
      },
    },
  },
};

/**
 * CardVariantElevated
 * Carrusel con cards variante elevated (default)
 */
export const CardVariantElevated: Story = {
  name: 'Card Variant - Elevated',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards variante elevated (comportamiento por defecto).',
      },
    },
  },
};

/**
 * CardVariantBordered
 * Carrusel con cards variante bordered
 */
export const CardVariantBordered: Story = {
  name: 'Card Variant - Bordered',
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
    cardVariant: 'bordered',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards variante bordered.',
      },
    },
  },
};

/**
 * CardVariantFlat
 * Carrusel con cards variante flat
 */
export const CardVariantFlat: Story = {
  name: 'Card Variant - Flat',
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
    cardVariant: 'flat',
    showCardHeader: true,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards variante flat.',
      },
    },
  },
};

/**
 * WithoutCardHeader
 * Carrusel con cards sin header
 */
export const WithoutCardHeader: Story = {
  name: 'Without Card Header',
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
    showCardHeader: false,
    showCardButtons: true,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards sin header.',
      },
    },
  },
};

/**
 * WithoutCardButtons
 * Carrusel con cards sin botones
 */
export const WithoutCardButtons: Story = {
  name: 'Without Card Buttons',
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
    showCardButtons: false,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards sin botones.',
      },
    },
  },
};

/**
 * WithoutCardHeaderAndButtons
 * Carrusel con cards sin header ni botones
 */
export const WithoutCardHeaderAndButtons: Story = {
  name: 'Without Card Header and Buttons',
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
    showCardHeader: false,
    showCardButtons: false,
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con cards sin header ni botones.',
      },
    },
  },
};

/**
 * OnItemClick
 * Carrusel con onClick handler en items
 */
export const OnItemClick: Story = {
  name: 'OnItemClick Handler',
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
      alert('Item clicked: ${item.title}');
    },
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con onClick handler en items. Muestra un alert cuando se hace click en una card.',
      },
    },
  },
};

/**
 * OnSlideChange
 * Carrusel con onSlideChange handler
 */
export const OnSlideChange: Story = {
  name: 'OnSlideChange Handler',
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
    onSlideChange: (currentIndex: number) => {
      console.log(`Slide changed to index: ${currentIndex}`);
    },
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con onSlideChange handler. Registra en consola cuando cambia el slide.',
      },
    },
  },
};

/**
 * FewItems
 * Carrusel con pocos items
 */
export const FewItems: Story = {
  name: 'Few Items',
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
  render: (args) => {
    const fewItems = sampleItems.slice(0, 2);
    const itemsWithConfig = fewItems.map(item => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
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
      onSlideChange: args.onSlideChange
    };

    const container = document.createElement('div');
    container.innerHTML = renderCarousel(carouselOptions);
    const carouselElement = container.querySelector('.ubits-carousel') as HTMLElement;
    
    if (carouselElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeCarousel(carouselElement, carouselOptions);
        });
      });
    }
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con pocos items (menos que itemsPerView).',
      },
    },
  },
};

/**
 * ManyItems
 * Carrusel con muchos items
 */
export const ManyItems: Story = {
  name: 'Many Items',
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
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel con muchos items (más de 20).',
      },
    },
  },
};

/**
 * CompleteExample
 * Carrusel completo con todas las opciones configuradas
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    itemsPerView: 4,
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplayInterval: 2500,
    loop: true,
    gap: 24,
    arrowPosition: 'inside',
    dotPosition: 'top',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
    onItemClick: (item: CarouselItem) => {
      console.log('Item clicked:', item.title);
    },
    onSlideChange: (currentIndex: number) => {
      console.log('Slide changed to:', currentIndex);
    },
  },
  render: (args) => renderCarouselStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Carrusel completo con todas las opciones configuradas: autoplay, loop, flechas dentro, dots arriba, gap grande, y handlers.',
      },
    },
  },
};

