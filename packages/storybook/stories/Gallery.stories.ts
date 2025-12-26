import type { Meta, StoryObj } from '@storybook/html';
import { renderGallery, createGallery } from '../../components/gallery/src/GalleryProvider';
import type { GalleryOptions, GalleryItem } from '../../components/gallery/src/types/GalleryOptions';
import '../../components/gallery/src/styles/gallery.css';
import '../../components/button/src/styles/button.css';

// Datos de ejemplo para la galería
const sampleItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    title: 'Paisaje Montañoso',
    description: 'Hermoso paisaje montañoso con cielo despejado',
    alt: 'Paisaje montañoso'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop',
    title: 'Océano Azul',
    description: 'Vista del océano con olas suaves',
    alt: 'Océano azul'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
    title: 'Bosque Verde',
    description: 'Sendero a través de un bosque frondoso',
    alt: 'Bosque verde'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop',
    title: 'Ciudad al Atardecer',
    description: 'Skyline de la ciudad durante el atardecer',
    alt: 'Ciudad al atardecer'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop',
    title: 'Lago Sereno',
    description: 'Lago tranquilo rodeado de montañas',
    alt: 'Lago sereno'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
    title: 'Naturaleza Salvaje',
    description: 'Paisaje natural con vegetación diversa',
    alt: 'Naturaleza salvaje'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=200&fit=crop',
    title: 'Cascada',
    description: 'Cascada en medio del bosque',
    alt: 'Cascada'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop',
    title: 'Aurora Boreal',
    description: 'Aurora boreal en el cielo nocturno',
    alt: 'Aurora boreal'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    title: 'Montañas Nevadas',
    description: 'Cumbres nevadas bajo un cielo azul',
    alt: 'Montañas nevadas'
  }
];

const meta: Meta<GalleryOptions> = {
  title: 'Layout/Gallery',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Gallery UBITS para mostrar imágenes en diferentes layouts (grid, masonry, list) con múltiples tamaños, soporte para lightbox, lazy loading y thumbnails.'
}
},
    layout: 'padded'
},
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items a mostrar en la galería',
      table: {
        type: { summary: 'GalleryItem[]' }
}
},
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'list'],
      description: 'Layout de la galería',
      table: {
        defaultValue: { summary: 'grid' },
        type: { summary: 'grid | masonry | list' }
}
},
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de la galería',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' }
}
},
    columns: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      description: 'Número de columnas (solo para layout grid)',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
}
},
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Espacio entre items en píxeles',
      table: {
        defaultValue: { summary: '16' },
        type: { summary: 'number (px)' }
}
},
    showThumbnails: {
      control: { type: 'boolean' },
      description: 'Mostrar thumbnails en lugar de imágenes completas',
      table: {
        defaultValue: { summary: 'false' }
}
},
    lazyLoad: {
      control: { type: 'boolean' },
      description: 'Cargar imágenes de forma diferida (lazy loading)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    lightbox: {
      control: { type: 'boolean' },
      description: 'Activar lightbox al hacer click en las imágenes',
      table: {
        defaultValue: { summary: 'false' }
}
},
    aspectRatio: {
      control: { type: 'text' },
      description: 'Aspect ratio para las imágenes (ej: 16/9, 1/1, 4/3)',
      table: {
        type: { summary: 'string' }
}
},
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional',
      table: {
        type: { summary: 'string' }
}
}
}
};

export default meta;
type Story = StoryObj<GalleryOptions>;

// Helper para renderizar galería de manera consistente
function renderGalleryStory(args: GalleryOptions) {
  const gallery = createGallery(args);
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.margin = '0 auto';
  container.appendChild(gallery);
  return container;
}

/**
 * Galería única con todos los controladores y tamaños
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: true,
    aspectRatio: undefined,
    className: ''
  },
  render: (args) => renderGalleryStory(args),
};

/**
 * LayoutGrid
 * Galería con layout grid (default)
 */
export const LayoutGrid: Story = {
  name: 'Layout - Grid',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con layout grid (comportamiento por defecto).',
      },
    },
  },
};

/**
 * LayoutMasonry
 * Galería con layout masonry
 */
export const LayoutMasonry: Story = {
  name: 'Layout - Masonry',
  args: {
    items: sampleItems,
    layout: 'masonry',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con layout masonry (tipo mampostería).',
      },
    },
  },
};

/**
 * LayoutList
 * Galería con layout list
 */
export const LayoutList: Story = {
  name: 'Layout - List',
  args: {
    items: sampleItems,
    layout: 'list',
    size: 'md',
    columns: 1,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con layout list (lista vertical).',
      },
    },
  },
};

/**
 * SizeXS
 * Galería tamaño xs
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'xs',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería tamaño extra pequeño (xs).',
      },
    },
  },
};

/**
 * SizeSM
 * Galería tamaño sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'sm',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería tamaño pequeño (sm).',
      },
    },
  },
};

/**
 * SizeMD
 * Galería tamaño md (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería tamaño medio (md, comportamiento por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Galería tamaño lg
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'lg',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería tamaño grande (lg).',
      },
    },
  },
};

/**
 * SizeXL
 * Galería tamaño xl
 */
export const SizeXL: Story = {
  name: 'Size - XL',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'xl',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería tamaño extra grande (xl).',
      },
    },
  },
};

/**
 * Columns1
 * Galería con 1 columna
 */
export const Columns1: Story = {
  name: 'Columns - 1',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 1,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con 1 columna.',
      },
    },
  },
};

/**
 * Columns2
 * Galería con 2 columnas
 */
export const Columns2: Story = {
  name: 'Columns - 2',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 2,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con 2 columnas.',
      },
    },
  },
};

/**
 * Columns3
 * Galería con 3 columnas (default)
 */
export const Columns3: Story = {
  name: 'Columns - 3',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con 3 columnas (comportamiento por defecto).',
      },
    },
  },
};

/**
 * Columns4
 * Galería con 4 columnas
 */
export const Columns4: Story = {
  name: 'Columns - 4',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 4,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con 4 columnas.',
      },
    },
  },
};

/**
 * Columns6
 * Galería con 6 columnas
 */
export const Columns6: Story = {
  name: 'Columns - 6',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 6,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con 6 columnas.',
      },
    },
  },
};

/**
 * Gap0
 * Galería sin espacio entre items
 */
export const Gap0: Story = {
  name: 'Gap - 0px',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 0,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería sin espacio entre items (gap: 0px).',
      },
    },
  },
};

/**
 * Gap8
 * Galería con gap pequeño
 */
export const Gap8: Story = {
  name: 'Gap - 8px',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 8,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con gap pequeño (8px).',
      },
    },
  },
};

/**
 * Gap16
 * Galería con gap medio (default)
 */
export const Gap16: Story = {
  name: 'Gap - 16px',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con gap medio (16px, comportamiento por defecto).',
      },
    },
  },
};

/**
 * Gap24
 * Galería con gap grande
 */
export const Gap24: Story = {
  name: 'Gap - 24px',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 24,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con gap grande (24px).',
      },
    },
  },
};

/**
 * Gap32
 * Galería con gap muy grande
 */
export const Gap32: Story = {
  name: 'Gap - 32px',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 32,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con gap muy grande (32px).',
      },
    },
  },
};

/**
 * WithThumbnails
 * Galería con thumbnails
 */
export const WithThumbnails: Story = {
  name: 'With Thumbnails',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: true,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con thumbnails. Muestra versiones pequeñas de las imágenes.',
      },
    },
  },
};

/**
 * WithoutThumbnails
 * Galería sin thumbnails (default)
 */
export const WithoutThumbnails: Story = {
  name: 'Without Thumbnails',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería sin thumbnails (comportamiento por defecto). Muestra imágenes completas.',
      },
    },
  },
};

/**
 * LazyLoad
 * Galería con lazy loading
 */
export const LazyLoad: Story = {
  name: 'Lazy Load',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: true,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con lazy loading. Las imágenes se cargan cuando entran en el viewport.',
      },
    },
  },
};

/**
 * WithoutLazyLoad
 * Galería sin lazy loading (default)
 */
export const WithoutLazyLoad: Story = {
  name: 'Without Lazy Load',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería sin lazy loading (comportamiento por defecto). Todas las imágenes se cargan inmediatamente.',
      },
    },
  },
};

/**
 * Lightbox
 * Galería con lightbox activado
 */
export const Lightbox: Story = {
  name: 'Lightbox',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: true,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con lightbox activado. Al hacer click en una imagen, se abre en un lightbox.',
      },
    },
  },
};

/**
 * WithoutLightbox
 * Galería sin lightbox (default)
 */
export const WithoutLightbox: Story = {
  name: 'Without Lightbox',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería sin lightbox (comportamiento por defecto).',
      },
    },
  },
};

/**
 * AspectRatio16_9
 * Galería con aspect ratio 16:9
 */
export const AspectRatio16_9: Story = {
  name: 'Aspect Ratio - 16:9',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    aspectRatio: '16/9',
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con aspect ratio 16:9. Todas las imágenes mantienen esta proporción.',
      },
    },
  },
};

/**
 * AspectRatio1_1
 * Galería con aspect ratio 1:1 (cuadrado)
 */
export const AspectRatio1_1: Story = {
  name: 'Aspect Ratio - 1:1',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    aspectRatio: '1/1',
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con aspect ratio 1:1 (cuadrado). Todas las imágenes son cuadradas.',
      },
    },
  },
};

/**
 * AspectRatio4_3
 * Galería con aspect ratio 4:3
 */
export const AspectRatio4_3: Story = {
  name: 'Aspect Ratio - 4:3',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    aspectRatio: '4/3',
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con aspect ratio 4:3. Todas las imágenes mantienen esta proporción.',
      },
    },
  },
};

/**
 * OnItemClick
 * Galería con onClick handler
 */
export const OnItemClick: Story = {
  name: 'OnItemClick Handler',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    onItemClick: (item: GalleryItem, index: number) => {
      alert('Item clicked: ${item.title || `Image ${index + 1}`}');
    },
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con onClick handler. Muestra un alert cuando se hace click en una imagen.',
      },
    },
  },
};

/**
 * OnImageLoad
 * Galería con onImageLoad handler
 */
export const OnImageLoad: Story = {
  name: 'OnImageLoad Handler',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    onImageLoad: (item: GalleryItem, index: number) => {
      console.log(`Image loaded: ${item.title || `Image ${index + 1}`}`);
    },
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con onImageLoad handler. Registra en consola cuando se carga una imagen.',
      },
    },
  },
};

/**
 * OnImageError
 * Galería con onImageError handler
 */
export const OnImageError: Story = {
  name: 'OnImageError Handler',
  args: {
    items: [
      ...sampleItems.slice(0, 3),
      {
        id: 10,
        image: 'https://invalid-url-that-will-fail.com/image.jpg',
        thumbnail: 'https://invalid-url-that-will-fail.com/thumb.jpg',
        title: 'Imagen con Error',
        description: 'Esta imagen fallará al cargar',
        alt: 'Error'
      },
      ...sampleItems.slice(3, 6)
    ],
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
    onImageError: (item: GalleryItem, index: number) => {
      console.error(`Error loading image: ${item.title || `Image ${index + 1}`}`);
    },
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con onImageError handler. Incluye una imagen con URL inválida para demostrar el manejo de errores.',
      },
    },
  },
};

/**
 * FewItems
 * Galería con pocas imágenes
 */
export const FewItems: Story = {
  name: 'Few Items',
  args: {
    items: sampleItems.slice(0, 3),
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: false,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con pocas imágenes (3 items).',
      },
    },
  },
};

/**
 * ManyItems
 * Galería con muchas imágenes
 */
export const ManyItems: Story = {
  name: 'Many Items',
  args: {
    items: [
      ...sampleItems,
      ...sampleItems.map((item, index) => ({
        ...item,
        id: item.id + 10,
        title: '${item.title} (${index + 10})'
      })),
      ...sampleItems.map((item, index) => ({
        ...item,
        id: item.id + 20,
        title: '${item.title} (${index + 20})'
      }))
    ],
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: true,
    lightbox: true,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería con muchas imágenes (más de 20). Incluye lazy loading y lightbox para mejor rendimiento.',
      },
    },
  },
};

/**
 * MasonryWithThumbnails
 * Layout masonry con thumbnails
 */
export const MasonryWithThumbnails: Story = {
  name: 'Masonry - With Thumbnails',
  args: {
    items: sampleItems,
    layout: 'masonry',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: true,
    lazyLoad: false,
    lightbox: true,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Layout masonry con thumbnails y lightbox.',
      },
    },
  },
};

/**
 * ListLayout
 * Layout list con diferentes configuraciones
 */
export const ListLayout: Story = {
  name: 'List Layout',
  args: {
    items: sampleItems,
    layout: 'list',
    size: 'md',
    columns: 1,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: true,
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Layout list (lista vertical) con lightbox.',
      },
    },
  },
};

/**
 * CompleteExample
 * Galería completa con todas las opciones configuradas
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'lg',
    columns: 4,
    gap: 24,
    showThumbnails: false,
    lazyLoad: true,
    lightbox: true,
    aspectRatio: '16/9',
    onItemClick: (item: GalleryItem, index: number) => {
      console.log('Item clicked:', item.title);
    },
    onImageLoad: (item: GalleryItem, index: number) => {
      console.log('Image loaded:', item.title);
    },
    onImageError: (item: GalleryItem, index: number) => {
      console.error('Image error:', item.title);
    },
  },
  render: (args) => renderGalleryStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Galería completa con todas las opciones configuradas: layout grid, tamaño lg, 4 columnas, gap grande, lazy loading, lightbox, aspect ratio 16:9, y todos los handlers.',
      },
    },
  },
};

