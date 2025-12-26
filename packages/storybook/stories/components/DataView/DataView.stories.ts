import type { Meta, StoryObj } from '@storybook/html';
import { renderDataView, createDataView } from '../../../components/data-view/src/DataViewProvider';
import type {
  DataViewOptions,
  ProductData,
  StockStatus,
} from '../../../components/data-view/src/types/DataViewOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos necesarios
import '../../../components/data-view/src/styles/data-view.css';
import '../../../components/button/src/styles/button.css';

// Datos de ejemplo de productos
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
    inWishlist: false,
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
    inWishlist: false,
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
    inWishlist: false,
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
    inWishlist: true,
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
    inWishlist: false,
  },
];

const meta: Meta<
  DataViewOptions & {
    productCount?: number;
    defaultStockStatus?: StockStatus;
    defaultRating?: number;
    defaultPrice?: number;
  }
> = {
  title: 'Data/DataView',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente DataView UBITS para mostrar listas de productos con imagen, categoría, nombre, rating, precio, botón de favoritos y botón de compra. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
    layout: 'padded',
    ubits: createUBITSContract({
      componentId: '🧩-ux-data-view',
      api: {
        create: 'createDataView', // Función importada directamente
        render: 'renderDataView', // Función importada directamente
      },
      dependsOn: {
        required: [],
        optional: [
          '🧩-ux-button', // Botones de compra y favoritos
        ],
      },
      internals: [],
      slots: {},
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-fg-bold',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-feedback-accent-success',
        '--modifiers-normal-color-light-feedback-accent-warning',
        '--modifiers-normal-color-light-feedback-accent-error',
        '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
        '--modifiers-normal-color-light-feedback-fg-warning-subtle-hover',
        '--ubits-spacing-xs',
        '--ubits-spacing-sm',
        '--ubits-spacing-md',
        '--ubits-spacing-lg',
        '--ubits-border-radius-md',
        '--font-family-noto-sans-font-family',
        '--weight-semibold',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['products'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `createDataView(document.getElementById('data-view-container'), {
  containerId: 'data-view-container',
  products: [
    { id: '1', name: 'Product 1', price: 100, stockStatus: 'INSTOCK' }
  ]
});`,
        basic: `createDataView(document.getElementById('data-view-container'), {
  containerId: 'data-view-container',
  products: [
    { id: '1', name: 'Product 1', price: 100, stockStatus: 'INSTOCK' }
  ]
});`,
        withWishlist: `createDataView(document.getElementById('data-view-container'), {
  containerId: 'data-view-container',
  products: [
    { id: '1', name: 'Product 1', price: 100, stockStatus: 'INSTOCK', inWishlist: true }
  ]
});`,
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'data-dataview--implementation',
        storiesByExample: {
          canonical: 'data-dataview--implementation',
          basic: 'data-dataview--default',
          withWishlist: 'data-dataview--with-wishlist',
        },
      },
      intents: {
        'dataview': 'canonical',
        'dataview.products': 'canonical',
        'dataview.with-wishlist': 'withWishlist',
      },
      variants: {
        size: ['sm', 'md', 'lg'],
        stockStatus: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
      },
      events: {
        onProductClick: {
          type: 'Event',
          description: 'Emitted when a product is clicked',
        },
        onWishlistToggle: {
          type: 'Event',
          description: 'Emitted when wishlist button is toggled',
        },
        onBuyClick: {
          type: 'Event',
          description: 'Emitted when buy button is clicked',
        },
      },
    }),
  },
  argTypes: {
    productCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de productos a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente (sm: imagen 80px, md: imagen 120px, lg: imagen 160px)',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Tamaño',
      },
    },
    showCategory: {
      control: { type: 'boolean' },
      description: 'Mostrar categoría del producto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showRating: {
      control: { type: 'boolean' },
      description: 'Mostrar rating con estrellas',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showPrice: {
      control: { type: 'boolean' },
      description: 'Mostrar precio del producto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showWishlist: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de favoritos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Funcionalidad',
      },
    },
    showBuyButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de compra',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Funcionalidad',
      },
    },
    buyButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón de compra',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Buy Now' },
        category: 'Configuración',
      },
    },
    buyButtonIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de compra (nombre FontAwesome sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'shopping-cart' },
        category: 'Configuración',
      },
    },
    wishlistIcon: {
      control: { type: 'text' },
      description: 'Icono del botón de favoritos (nombre FontAwesome sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'heart' },
        category: 'Configuración',
      },
    },
    defaultStockStatus: {
      control: { type: 'select' },
      options: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],
      description: 'Estado de stock por defecto para los productos',
      table: {
        type: { summary: 'INSTOCK | LOWSTOCK | OUTOFSTOCK' },
        defaultValue: { summary: 'INSTOCK' },
        category: 'Contenido',
      },
    },
    defaultRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating por defecto para los productos',
      table: {
        type: { summary: 'number (0-5)' },
        defaultValue: { summary: '4' },
        category: 'Contenido',
      },
    },
    defaultPrice: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Precio por defecto para los productos',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
        category: 'Contenido',
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
    onProductClick: {
      control: false,
      description: 'Callback cuando se hace click en un producto',
      table: {
        type: { summary: '(product: ProductData, index: number, element: HTMLElement) => void' },
        category: 'Eventos',
      },
    },
    onBuyClick: {
      control: false,
      description: 'Callback cuando se hace click en el botón de compra',
      table: {
        type: { summary: '(product: ProductData, index: number, element: HTMLElement) => void' },
        category: 'Eventos',
      },
    },
    onWishlistClick: {
      control: false,
      description: 'Callback cuando se hace click en el botón de favoritos',
      table: {
        type: { summary: '(product: ProductData, index: number, element: HTMLElement) => void' },
        category: 'Eventos',
      },
    },
  },
};

export default meta;
type Story = StoryObj<
  DataViewOptions & {
    productCount?: number;
    defaultStockStatus?: StockStatus;
    defaultRating?: number;
    defaultPrice?: number;
  }
>;

// Función helper para generar productos desde los args
function generateProducts(
  count: number,
  defaultStockStatus: StockStatus = 'INSTOCK',
  defaultRating: number = 4,
  defaultPrice: number = 50,
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
    'Water Bottle',
  ];

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
    '/images/cards-learn/neuroliderazgo-configura-tu-mente.jpeg',
  ];

  return Array.from({ length: count }, (_, index) => {
    const categoryIndex = index % categories.length;
    const nameIndex = index % names.length;
    const stockStatuses: StockStatus[] = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
    const stockIndex = index % stockStatuses.length;
    const ratings = [3, 3.5, 4, 4.5, 5];
    const ratingIndex = index % ratings.length;
    const prices = [15, 29, 50, 65, 72, 79, 100];
    const priceIndex = index % prices.length;

    return {
      id: `product-${index + 1}`,
      image: availableImages[index % availableImages.length],
      imageAlt: names[nameIndex],
      category: categories[categoryIndex],
      name: names[nameIndex],
      rating: defaultRating !== 4 ? defaultRating : ratings[ratingIndex],
      price: defaultPrice !== 50 ? defaultPrice : prices[priceIndex],
      stockStatus:
        defaultStockStatus !== 'INSTOCK' ? defaultStockStatus : stockStatuses[stockIndex],
      inWishlist: index % 3 === 0,
    };
  });
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
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
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Importar funciones (si usas módulos)
// import { createDataView, renderDataView } from '@ubits/data-view';

// 2. Crear DataView
const dataViewElement = createDataView({
  products: [
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
    }
  ],
  size: 'md', // 'sm' | 'md' | 'lg'
  showCategory: true,
  showRating: true,
  showPrice: true,
  showWishlist: true,
  showBuyButton: true,
  buyButtonText: 'Buy Now',
  buyButtonIcon: 'shopping-cart',
  wishlistIcon: 'heart',
  onProductClick: (product, index, element) => {
    console.log('Producto clickeado:', product);
  },
  onBuyClick: (product, index, element) => {
    console.log('Comprar:', product);
  },
  onWishlistClick: (product, index, element) => {
    product.inWishlist = !product.inWishlist;
    // Re-renderizar si es necesario
    console.log('Wishlist actualizado:', product);
  }
});

// 3. Insertar en el DOM
const container = document.getElementById('data-view-container');
if (container) {
  container.appendChild(dataViewElement);
}

// Nota: createDataView retorna un HTMLElement directamente
// Los event listeners se configuran automáticamente

// Alternativa: Usar renderDataView para obtener HTML string
const dataViewHTML = renderDataView({
  products: sampleProducts,
  size: 'md',
  showCategory: true,
  showRating: true,
  showPrice: true
});

// Insertar HTML
const container = document.getElementById('data-view-container');
if (container) {
  container.innerHTML = dataViewHTML;
}`,
      },
    },
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
      wishlistIcon = 'heart',
    } = args;

    // Generar productos
    const products = generateProducts(
      productCount,
      defaultStockStatus,
      defaultRating,
      defaultPrice,
    );

    // Crear contenedor
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-data-view');
    container.setAttribute('data-ubits-component', 'DataView');
    container.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background: var(--modifiers-normal-color-light-bg-2);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    // Crear DataView
    try {
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
        onProductClick: args.onProductClick,
        onBuyClick: args.onBuyClick || ((product) => {
          console.log('Comprar:', product);
        }),
        onWishlistClick: args.onWishlistClick || ((product) => {
          product.inWishlist = !product.inWishlist;
          console.log('Wishlist actualizado:', product);
        }),
        className: args.className,
        attributes: args.attributes,
      };

      const dataView = createDataView(dataViewOptions);
      container.appendChild(dataView);
    } catch (error) {
      console.error('Error creando DataView:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Error: ${error}`;
      errorDiv.style.color = 'red';
      container.appendChild(errorDiv);
    }

    return container;
  },
};

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
    defaultPrice: 50,
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
      wishlistIcon = 'heart',
    } = args;

    // Generar productos
    const products = generateProducts(
      productCount,
      defaultStockStatus,
      defaultRating,
      defaultPrice,
    );

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
        onProductClick: args.onProductClick,
        onBuyClick: args.onBuyClick || ((product) => {
          alert(`Comprar: ${product.name} - $${product.price}`);
        }),
        onWishlistClick: args.onWishlistClick || ((product) => {
          product.inWishlist = !product.inWishlist;
          // Re-renderizar el componente
          const dataViewElement = container.querySelector('.ubits-data-view');
          if (dataViewElement) {
            dataViewElement.remove();
          }
          const newDataView = createDataView(dataViewOptions);
          container.appendChild(newDataView);
        }),
      };

      return createDataView(dataViewOptions);
    };

    // Crear DataView inicial
    const dataView = renderDataViewComponent();
    container.appendChild(dataView);

    return container;
  },
};


