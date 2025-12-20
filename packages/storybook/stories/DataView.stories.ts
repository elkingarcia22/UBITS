import type { Meta, StoryObj } from '@storybook/html';
import { renderDataView, createDataView } from '../../components/data-view/src/DataViewProvider';
import type { DataViewOptions, ProductData, StockStatus } from '../../components/data-view/src/types/DataViewOptions';
import { createUBITSContract } from './_shared/ubitsContract';
// Importar estilos necesarios
import '../../components/data-view/src/styles/data-view.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<DataViewOptions & {
  productCount?: number;
  defaultStockStatus?: StockStatus;
  defaultRating?: number;
  defaultPrice?: number;
}> = {
  title: 'Data/DataView',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente DataView UBITS para mostrar listas de productos con imagen, categoría, nombre, rating, precio, botón de favoritos y botón de compra. Usa tokens UBITS para colores, tipografía y espaciado.'
      }
    },
    layout: 'padded',
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-data-view',
      api: {
        create: 'window.UBITS.DataView.create',
        tag: '<ubits-data-view>',
      },
      dependsOn: {
        required: ['🧩-ux-button'], // Botones de compra y favoritos son requeridos
        optional: [],
      },
      internals: [],
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: ['products'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: 'window.UBITS.DataView.create(document.getElementById(\'dataview-container\'), {\\n  containerId: \'dataview-container\',\\n  products: [{\\n    id: \'1\',\\n    image: \'/image.jpg\',\\n    category: \'Category\',\\n    name: \'Product Name\',\\n    rating: 4,\\n    price: 50,\\n    stockStatus: \'INSTOCK\'\\n  }],\\n  onProductClick: function(product) {},\\n  onBuyClick: function(product) {}\\n});',
        basic: 'window.UBITS.DataView.create(document.getElementById(\'dataview-container\'), {\\n  containerId: \'dataview-container\',\\n  products: [{\\n    id: \'1\',\\n    name: \'Product Name\',\\n    price: 50\\n  }]\\n});',
        withRating: 'window.UBITS.DataView.create(document.getElementById(\'dataview-container\'), {\\n  containerId: \'dataview-container\',\\n  products: [{\\n    id: \'1\',\\n    name: \'Product Name\',\\n    rating: 4,\\n    price: 50\\n  }]\\n});',
        withWishlist: 'window.UBITS.DataView.create(document.getElementById(\'dataview-container\'), {\\n  containerId: \'dataview-container\',\\n  products: [{\\n    id: \'1\',\\n    name: \'Product Name\',\\n    price: 50,\\n    inWishlist: true\\n  }],\\n  onWishlistClick: function(product) {}\\n});',
      },
      variants: {
        size: ['sm', 'md', 'lg'],
        showCategory: [true, false],
        showRating: [true, false],
        showPrice: [true, false],
        showWishlist: [true, false],
        showBuyButton: [true, false],
      },
      events: {
        onProductClick: {
          type: 'Event',
          description: 'Emitted when a product is clicked',
          payload: {
            product: 'ProductData',
          },
        },
        onBuyClick: {
          type: 'Event',
          description: 'Emitted when buy button is clicked',
          payload: {
            product: 'ProductData',
          },
        },
        onWishlistClick: {
          type: 'Event',
          description: 'Emitted when wishlist button is clicked',
          payload: {
            product: 'ProductData',
          },
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'data-dataview--default',
        storiesByExample: {
          canonical: 'data-dataview--default',
          basic: 'data-dataview--default',
          withRating: 'data-dataview--show-rating',
          withWishlist: 'data-dataview--with-wishlist-items',
        },
      },
      intents: {
        'dataview.products': 'canonical',
        'dataview.catalog': 'canonical',
        'dataview.list': 'canonical',
        'dataview.with-rating': 'withRating',
        'dataview.with-wishlist': 'withWishlist',
      },
    }),
  },
  argTypes: {
    productCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de productos a mostrar',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente (sm: imagen 80px, md: imagen 120px, lg: imagen 160px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
        category: 'Tamaño'
}
},
    showCategory: {
      control: { type: 'boolean' },
      description: 'Mostrar categoría del producto',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showRating: {
      control: { type: 'boolean' },
      description: 'Mostrar rating con estrellas',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showPrice: {
      control: { type: 'boolean' },
      description: 'Mostrar precio del producto',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showWishlist: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de favoritos',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showBuyButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de compra',
      table: {
        defaultValue: { summary: 'true' }
}
},
    buyButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de compra',
      table: {
        defaultValue: { summary: 'Buy Now' }
}
},
    buyButtonIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de compra (nombre FontAwesome sin prefijo fa-)',
      table: {
        defaultValue: { summary: 'shopping-cart' }
}
},
    wishlistIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de favoritos (nombre FontAwesome sin prefijo fa-)',
      table: {
        defaultValue: { summary: 'heart' }
}
},
    defaultStockStatus: {
      control: { type: 'select' },
      options: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
      description: 'Estado de stock por defecto para los productos',
      table: {
        defaultValue: { summary: 'INSTOCK' },
        type: { summary: 'INSTOCK | LOWSTOCK | OUTOFSTOCK' }
}
},
    defaultRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating por defecto para los productos',
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number (0-5)' }
}
},
    defaultPrice: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Precio por defecto para los productos',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
}
}
};

export default meta;
type Story = StoryObj<DataViewOptions & {
  productCount?: number;
  defaultStockStatus?: StockStatus;
  defaultRating?: number;
  defaultPrice?: number;
}>;

// Datos de ejemplo de productos (usando imágenes reales)
const sampleProducts: ProductData[] = [
  {
    id: '1',
    image: '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
    imageAlt: 'Bamboo Watch',
    category: 'Accessories',
    name: 'Bamboo Watch',
    rating: 5,
    price: 65,
    stockStatus: 'INSTOCK',
    inWishlist: false
},
  {
    id: '2',
    image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
    imageAlt: 'Black Watch',
    category: 'Accessories',
    name: 'Black Watch',
    rating: 4,
    price: 72,
    stockStatus: 'INSTOCK',
    inWishlist: false
},
  {
    id: '3',
    image: '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
    imageAlt: 'Blue Band',
    category: 'Fitness',
    name: 'Blue Band',
    rating: 3,
    price: 79,
    stockStatus: 'LOWSTOCK',
    inWishlist: false
},
  {
    id: '4',
    image: '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
    imageAlt: 'Blue T-Shirt',
    category: 'Clothing',
    name: 'Blue T-Shirt',
    rating: 5,
    price: 29,
    stockStatus: 'INSTOCK',
    inWishlist: true
},
  {
    id: '5',
    image: '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
    imageAlt: 'Bracelet',
    category: 'Accessories',
    name: 'Bracelet',
    rating: 4,
    price: 15,
    stockStatus: 'INSTOCK',
    inWishlist: false
}
];

// Función helper para generar productos desde los args
function generateProducts(
  count: number,
  defaultStockStatus: StockStatus = 'INSTOCK',
  defaultRating: number = 4,
  defaultPrice: number = 50
): ProductData[] {
  const categories = ['Accessories', 'Fitness', 'Clothing', 'Electronics', 'Home'];
  const names = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Wireless Headphones',
    'Smart Watch',
    'Running Shoes',
    'Yoga Mat',
    'Water Bottle'
];

  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = index % categories.length;
    const nameIndex = index % names.length;
    
    // Variar el stock status
    const stockStatuses: StockStatus[] = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
    const stockIndex = index % stockStatuses.length;
    
    // Variar el rating
    const ratings = [3, 3.5, 4, 4.5, 5];
    const ratingIndex = index % ratings.length;
    
    // Variar el precio
    const prices = [15, 29, 50, 65, 72, 79, 100];
    const priceIndex = index % prices.length;

    // Lista de imágenes reales disponibles
    const availableImages = [
      '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
      '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
      '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
      '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
      '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
      '/images/cards-learn/flexbox-y-grid.jpeg',
      '/images/cards-learn/react-context-api.jpeg',
      '/images/cards-learn/agilidad-emocional.jpeg',
      '/images/cards-learn/primeros-pasos-en-react.jpeg',
      '/images/cards-learn/neuroliderazgo-configura-tu-mente.jpeg'
];

    return {
      id: `product-${index + 1}`,
      image: availableImages[index % availableImages.length],
      imageAlt: names[nameIndex],
      category: categories[categoryIndex],
      name: names[nameIndex],
      rating: defaultRating !== 4 ? defaultRating : ratings[ratingIndex],
      price: defaultPrice !== 50 ? defaultPrice : prices[priceIndex],
      stockStatus: defaultStockStatus !== 'INSTOCK' ? defaultStockStatus : stockStatuses[stockIndex],
      inWishlist: index % 3 === 0, // Cada tercer producto en wishlist
    };
  });
}

// Una sola historia con todos los controles
export const Default: Story = {
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonText: 'Buy Now',
    buyButtonIcon: 'shopping-cart',
    wishlistIcon: 'heart',
    defaultStockStatus: 'INSTOCK',
    defaultRating: 4,
    defaultPrice: 50
},
  render: (args) => {
    const {
      productCount = 5,
      size = 'md',
      defaultStockStatus = 'INSTOCK',
      defaultRating = 4,
      defaultPrice = 50,
      showCategory = true,
      showRating = true,
      showPrice = true,
      showWishlist = true,
      showBuyButton = true,
      buyButtonText = 'Buy Now',
      buyButtonIcon = 'shopping-cart',
      wishlistIcon = 'heart'
} = args;

    // Generar productos
    const products = generateProducts(productCount, defaultStockStatus, defaultRating, defaultPrice);

    // Crear contenedor
    const container = document.createElement('div');
    container.id = 'data-view-container';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

    // Función para re-renderizar el DataView
    const renderDataViewComponent = () => {
      const dataViewOptions: DataViewOptions = {
        products,
        size,
        showCategory,
        showRating,
        showPrice,
        showWishlist,
        showBuyButton,
        buyButtonText,
        buyButtonIcon,
        wishlistIcon,
        onProductClick: (product, index) => {
          // Handler para click en producto
        },
        onBuyClick: (product, index) => {
          alert(`Comprar: ${product.name} - $${product.price}`);
        },
        onWishlistClick: (product, index) => {
          product.inWishlist = !product.inWishlist;
          // Re-renderizar el componente
          const dataViewElement = container.querySelector('.ubits-data-view');
          if (dataViewElement) {
            dataViewElement.remove();
          }
          const newDataView = createDataView(dataViewOptions);
          container.appendChild(newDataView);
        }
};

      return createDataView(dataViewOptions);
    };

    // Crear DataView inicial
    const dataView = renderDataViewComponent();
    container.appendChild(dataView);

    return container;
  }
};

// Helper para renderizar DataView de manera consistente
function renderDataViewStory(options: DataViewOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
  `;

  const dataViewOptions: DataViewOptions = {
    ...options,
    onProductClick: options.onProductClick || ((product, index) => {
      console.log('Producto clickeado:', product.name);
    }),
    onBuyClick: options.onBuyClick || ((product, index) => {
      console.log('Comprar:', product.name);
    }),
    onWishlistClick: options.onWishlistClick || ((product, index, element) => {
      product.inWishlist = !product.inWishlist;
      const dataViewElement = container.querySelector('.ubits-data-view');
      if (dataViewElement) {
        dataViewElement.remove();
      }
      const newDataView = createDataView(dataViewOptions);
      container.appendChild(newDataView);
    })
  };

  const dataView = createDataView(dataViewOptions);
  container.appendChild(dataView);

  return container;
}

/**
 * SizeSM
 * Tamaño sm
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    productCount: 3,
    size: 'sm',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'sm',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con tamaño sm (imagen 80px).',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño md (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con tamaño md (imagen 120px, default).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño lg
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    productCount: 3,
    size: 'lg',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'lg',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con tamaño lg (imagen 160px).',
      },
    },
  },
};

/**
 * ShowCategory
 * Con categoría visible
 */
export const ShowCategory: Story = {
  name: 'Show Category',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: true,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con categoría visible.',
      },
    },
  },
};

/**
 * HideCategory
 * Sin categoría
 */
export const HideCategory: Story = {
  name: 'Hide Category',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: false,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: false,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView sin categoría.',
      },
    },
  },
};

/**
 * ShowRating
 * Con rating visible
 */
export const ShowRating: Story = {
  name: 'Show Rating',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: true,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con rating visible.',
      },
    },
  },
};

/**
 * HideRating
 * Sin rating
 */
export const HideRating: Story = {
  name: 'Hide Rating',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: false,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: false,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView sin rating.',
      },
    },
  },
};

/**
 * ShowPrice
 * Con precio visible
 */
export const ShowPrice: Story = {
  name: 'Show Price',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: true,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con precio visible.',
      },
    },
  },
};

/**
 * HidePrice
 * Sin precio
 */
export const HidePrice: Story = {
  name: 'Hide Price',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: false,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: false,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView sin precio.',
      },
    },
  },
};

/**
 * ShowWishlist
 * Con botón de favoritos visible
 */
export const ShowWishlist: Story = {
  name: 'Show Wishlist',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: true,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con botón de favoritos visible.',
      },
    },
  },
};

/**
 * HideWishlist
 * Sin botón de favoritos
 */
export const HideWishlist: Story = {
  name: 'Hide Wishlist',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: false,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: false,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView sin botón de favoritos.',
      },
    },
  },
};

/**
 * ShowBuyButton
 * Con botón de compra visible
 */
export const ShowBuyButton: Story = {
  name: 'Show Buy Button',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: true
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con botón de compra visible.',
      },
    },
  },
};

/**
 * HideBuyButton
 * Sin botón de compra
 */
export const HideBuyButton: Story = {
  name: 'Hide Buy Button',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: false
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: false
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView sin botón de compra.',
      },
    },
  },
};

/**
 * CustomBuyButtonText
 * Con texto personalizado del botón de compra
 */
export const CustomBuyButtonText: Story = {
  name: 'Custom Buy Button Text',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonText: 'Agregar al carrito'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: true,
      buyButtonText: args.buyButtonText || 'Agregar al carrito'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con texto personalizado del botón de compra.',
      },
    },
  },
};

/**
 * CustomBuyButtonIcon
 * Con icono personalizado del botón de compra
 */
export const CustomBuyButtonIcon: Story = {
  name: 'Custom Buy Button Icon',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonIcon: 'bag-shopping'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: true,
      buyButtonIcon: args.buyButtonIcon || 'bag-shopping'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con icono personalizado del botón de compra.',
      },
    },
  },
};

/**
 * CustomWishlistIcon
 * Con icono personalizado del botón de favoritos
 */
export const CustomWishlistIcon: Story = {
  name: 'Custom Wishlist Icon',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    wishlistIcon: 'bookmark'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: true,
      showBuyButton: args.showBuyButton,
      wishlistIcon: args.wishlistIcon || 'bookmark'
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con icono personalizado del botón de favoritos.',
      },
    },
  },
};

/**
 * StockStatusInStock
 * Productos con stock disponible
 */
export const StockStatusInStock: Story = {
  name: 'Stock Status - In Stock',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    defaultStockStatus: 'INSTOCK'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, 'INSTOCK', args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos con stock disponible.',
      },
    },
  },
};

/**
 * StockStatusLowStock
 * Productos con stock bajo
 */
export const StockStatusLowStock: Story = {
  name: 'Stock Status - Low Stock',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    defaultStockStatus: 'LOWSTOCK'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, 'LOWSTOCK', args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos con stock bajo.',
      },
    },
  },
};

/**
 * StockStatusOutOfStock
 * Productos sin stock
 */
export const StockStatusOutOfStock: Story = {
  name: 'Stock Status - Out Of Stock',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    defaultStockStatus: 'OUTOFSTOCK'
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, 'OUTOFSTOCK', args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos sin stock.',
      },
    },
  },
};

/**
 * MixedStockStatus
 * Productos con diferentes estados de stock
 */
export const MixedStockStatus: Story = {
  name: 'Mixed Stock Status',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products: ProductData[] = [
      {
        id: '1',
        image: '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
        imageAlt: 'Producto 1',
        category: 'Accessories',
        name: 'Producto en stock',
        rating: 5,
        price: 65,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '2',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        imageAlt: 'Producto 2',
        category: 'Fitness',
        name: 'Producto stock bajo',
        rating: 4,
        price: 72,
        stockStatus: 'LOWSTOCK',
        inWishlist: false
      },
      {
        id: '3',
        image: '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
        imageAlt: 'Producto 3',
        category: 'Clothing',
        name: 'Producto sin stock',
        rating: 3,
        price: 79,
        stockStatus: 'OUTOFSTOCK',
        inWishlist: false
      }
    ];
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos con diferentes estados de stock (INSTOCK, LOWSTOCK, OUTOFSTOCK).',
      },
    },
  },
};

/**
 * WithWishlistItems
 * Productos en favoritos
 */
export const WithWishlistItems: Story = {
  name: 'With Wishlist Items',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    products.forEach(product => {
      product.inWishlist = true;
    });
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: true,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con todos los productos en favoritos.',
      },
    },
  },
};

/**
 * MixedWishlistItems
 * Algunos productos en favoritos
 */
export const MixedWishlistItems: Story = {
  name: 'Mixed Wishlist Items',
  args: {
    productCount: 4,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 4, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    products.forEach((product, index) => {
      product.inWishlist = index % 2 === 0; // Cada segundo producto en wishlist
    });
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: true,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con algunos productos en favoritos.',
      },
    },
  },
};

/**
 * DifferentRatings
 * Productos con diferentes ratings
 */
export const DifferentRatings: Story = {
  name: 'Different Ratings',
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products: ProductData[] = [
      {
        id: '1',
        image: '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
        imageAlt: 'Producto 1',
        category: 'Accessories',
        name: 'Producto 5 estrellas',
        rating: 5,
        price: 65,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '2',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        imageAlt: 'Producto 2',
        category: 'Fitness',
        name: 'Producto 4.5 estrellas',
        rating: 4.5,
        price: 72,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '3',
        image: '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
        imageAlt: 'Producto 3',
        category: 'Clothing',
        name: 'Producto 4 estrellas',
        rating: 4,
        price: 79,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '4',
        image: '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
        imageAlt: 'Producto 4',
        category: 'Electronics',
        name: 'Producto 3.5 estrellas',
        rating: 3.5,
        price: 29,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '5',
        image: '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
        imageAlt: 'Producto 5',
        category: 'Home',
        name: 'Producto 3 estrellas',
        rating: 3,
        price: 15,
        stockStatus: 'INSTOCK',
        inWishlist: false
      }
    ];
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: true,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos con diferentes ratings (3, 3.5, 4, 4.5, 5 estrellas).',
      },
    },
  },
};

/**
 * DifferentPrices
 * Productos con diferentes precios
 */
export const DifferentPrices: Story = {
  name: 'Different Prices',
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products: ProductData[] = [
      {
        id: '1',
        image: '/images/cards-learn/administracion-efectiva-del-tiempo.jpg',
        imageAlt: 'Producto 1',
        category: 'Accessories',
        name: 'Producto $15',
        rating: 4,
        price: 15,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '2',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        imageAlt: 'Producto 2',
        category: 'Fitness',
        name: 'Producto $29',
        rating: 4,
        price: 29,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '3',
        image: '/images/cards-learn/introduccion-al-backend-node-js.jpeg',
        imageAlt: 'Producto 3',
        category: 'Clothing',
        name: 'Producto $50',
        rating: 4,
        price: 50,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '4',
        image: '/images/cards-learn/introduccion-al-desarrollo-web.jpeg',
        imageAlt: 'Producto 4',
        category: 'Electronics',
        name: 'Producto $72',
        rating: 4,
        price: 72,
        stockStatus: 'INSTOCK',
        inWishlist: false
      },
      {
        id: '5',
        image: '/images/cards-learn/como-ejercer-el-liderazgo-inclusivo.jpeg',
        imageAlt: 'Producto 5',
        category: 'Home',
        name: 'Producto $100',
        rating: 4,
        price: 100,
        stockStatus: 'INSTOCK',
        inWishlist: false
      }
    ];
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: true,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con productos con diferentes precios.',
      },
    },
  },
};

/**
 * SingleProduct
 * Un solo producto
 */
export const SingleProduct: Story = {
  name: 'Single Product',
  args: {
    productCount: 1,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(1, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con un solo producto.',
      },
    },
  },
};

/**
 * MultipleProducts
 * Múltiples productos
 */
export const MultipleProducts: Story = {
  name: 'Multiple Products',
  args: {
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(5, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con múltiples productos (5 productos).',
      },
    },
  },
};

/**
 * ManyProducts
 * Muchos productos
 */
export const ManyProducts: Story = {
  name: 'Many Products',
  args: {
    productCount: 10,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(10, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con muchos productos (10 productos).',
      },
    },
  },
};

/**
 * OnProductClickCallback
 * Callback onProductClick
 */
export const OnProductClickCallback: Story = {
  name: 'On Product Click Callback',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: args.showBuyButton,
      onProductClick: (product, index, element) => {
        console.log('Producto clickeado:', product.name, 'Índice:', index);
        alert(`Producto clickeado: ${product.name}`);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con callback onProductClick cuando se hace click en un producto.',
      },
    },
  },
};

/**
 * OnBuyClickCallback
 * Callback onBuyClick
 */
export const OnBuyClickCallback: Story = {
  name: 'On Buy Click Callback',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: args.showWishlist,
      showBuyButton: true,
      onBuyClick: (product, index, element) => {
        console.log('Comprar:', product.name, 'Precio:', product.price);
        alert(`Agregar al carrito: ${product.name} - $${product.price}`);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con callback onBuyClick cuando se hace click en el botón de compra.',
      },
    },
  },
};

/**
 * OnWishlistClickCallback
 * Callback onWishlistClick
 */
export const OnWishlistClickCallback: Story = {
  name: 'On Wishlist Click Callback',
  args: {
    productCount: 3,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const products = generateProducts(args.productCount || 3, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: args.showCategory,
      showRating: args.showRating,
      showPrice: args.showPrice,
      showWishlist: true,
      showBuyButton: args.showBuyButton,
      onWishlistClick: (product, index, element) => {
        product.inWishlist = !product.inWishlist;
        console.log('Wishlist:', product.name, 'Estado:', product.inWishlist ? 'Agregado' : 'Removido');
        const dataViewElement = element.closest('.ubits-data-view');
        if (dataViewElement) {
          const container = dataViewElement.parentElement;
          if (container) {
            dataViewElement.remove();
            const newDataView = createDataView({
              products,
              size: 'md',
              showCategory: args.showCategory,
              showRating: args.showRating,
              showPrice: args.showPrice,
              showWishlist: true,
              showBuyButton: args.showBuyButton,
              onWishlistClick: args.onWishlistClick
            });
            container.appendChild(newDataView);
          }
        }
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView con callback onWishlistClick cuando se hace click en el botón de favoritos (toggle del estado).',
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
    productCount: 2,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      max-width: 800px;
      margin: 0 auto;
    `;

    ['sm', 'md', 'lg'].forEach((size) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'width: 100%;';
      const products = generateProducts(2, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
      const dataView = createDataView({
        products,
        size: size as 'sm' | 'md' | 'lg',
        showCategory: args.showCategory,
        showRating: args.showRating,
        showPrice: args.showPrice,
        showWishlist: args.showWishlist,
        showBuyButton: args.showBuyButton
      });
      wrapper.appendChild(dataView);
      container.appendChild(wrapper);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView en todos los tamaños disponibles (sm, md, lg).',
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
    productCount: 5,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: true,
    showBuyButton: true,
    buyButtonText: 'Comprar ahora',
    buyButtonIcon: 'shopping-cart',
    wishlistIcon: 'heart'
  },
  render: (args) => {
    const products = generateProducts(5, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: true,
      showRating: true,
      showPrice: true,
      showWishlist: true,
      showBuyButton: true,
      buyButtonText: args.buyButtonText || 'Comprar ahora',
      buyButtonIcon: args.buyButtonIcon || 'shopping-cart',
      wishlistIcon: args.wishlistIcon || 'heart',
      onProductClick: (product, index) => {
        console.log('Producto clickeado:', product.name);
      },
      onBuyClick: (product, index) => {
        console.log('Comprar:', product.name);
      },
      onWishlistClick: (product, index, element) => {
        product.inWishlist = !product.inWishlist;
        const dataViewElement = element.closest('.ubits-data-view');
        if (dataViewElement) {
          const container = dataViewElement.parentElement;
          if (container) {
            dataViewElement.remove();
            const newDataView = createDataView({
              products,
              size: 'md',
              showCategory: true,
              showRating: true,
              showPrice: true,
              showWishlist: true,
              showBuyButton: true,
              buyButtonText: args.buyButtonText || 'Comprar ahora',
              buyButtonIcon: args.buyButtonIcon || 'shopping-cart',
              wishlistIcon: args.wishlistIcon || 'heart',
              onProductClick: (product, index) => {
                console.log('Producto clickeado:', product.name);
              },
              onBuyClick: (product, index) => {
                console.log('Comprar:', product.name);
              },
              onWishlistClick: args.onWishlistClick
            });
            container.appendChild(newDataView);
          }
        }
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView completo con todas las opciones habilitadas: categoría, rating, precio, favoritos, botón de compra, y todos los callbacks.',
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
    productCount: 2,
    size: 'md',
    showCategory: true,
    showRating: true,
    showPrice: true,
    showWishlist: false,
    showBuyButton: false
  },
  render: (args) => {
    const products = generateProducts(2, args.defaultStockStatus, args.defaultRating, args.defaultPrice);
    return renderDataViewStory({
      products,
      size: 'md',
      showCategory: true,
      showRating: true,
      showPrice: true,
      showWishlist: false,
      showBuyButton: false
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'DataView mínimo con solo las opciones esenciales (categoría, rating, precio, sin botones).',
      },
    },
  },
};

