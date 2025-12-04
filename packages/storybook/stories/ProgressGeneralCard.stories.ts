import type { Meta, StoryObj } from '@storybook/html';
import { renderProgressGeneralCard, createProgressGeneralCard } from '../../components/progress-general-card/src/ProgressGeneralCardProvider';
import type { ProgressGeneralCardOptions, ProgressCategory } from '../../components/progress-general-card/src/types/ProgressGeneralCardOptions';
import '../../components/progress-general-card/src/styles/progress-general-card.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<ProgressGeneralCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
}> = {
  title: 'Charts/Circle Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente ProgressGeneralCard UBITS para mostrar progreso general con indicador circular (donut chart) y categorías de progreso. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        defaultValue: { summary: 'Progreso general' },
        type: { summary: 'string' }
      }
    },
    mainPercentage: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Porcentaje principal mostrado en el círculo',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
},
    mainLabel: {
      control: { type: 'text' },
      description: 'Etiqueta del porcentaje principal (ej: "Ciclos")',
      table: {
        defaultValue: { summary: 'Ciclos' },
        type: { summary: 'string' }
      }
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout del componente',
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: 'vertical | horizontal' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
      }
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showCircularProgress: {
      control: { type: 'boolean' },
      description: 'Mostrar el indicador circular',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Mostrar las categorías',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    progressColor: {
      control: { type: 'text' },
      description: 'Color del progreso circular (token UBITS o color hexadecimal)',
      table: {
        defaultValue: { summary: 'var(--ubits-chart-color-bg-neutral-blue-base)' },
        type: { summary: 'string' }
      }
    },
    circleBackgroundColor: {
      control: { type: 'text' },
      description: 'Color de fondo del círculo (token UBITS o color hexadecimal)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-3)' },
        type: { summary: 'string' }
      }
    },
    // Controles para categoría 1
    category1Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 1',
      table: {
        defaultValue: { summary: 'Área' },
        type: { summary: 'string' }
      }
    },
    category1Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 1',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    category1Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 1',
      table: {
        defaultValue: { summary: '20' },
        type: { summary: 'number' }
      }
    },
    // Controles para categoría 2
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        defaultValue: { summary: 'Equipo' },
        type: { summary: 'string' }
      }
    },
    category2Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 2',
      table: {
        defaultValue: { summary: '8' },
        type: { summary: 'number' }
      }
    },
    category2Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 2',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
},
    // Controles para categoría 3
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        defaultValue: { summary: 'Propio' },
        type: { summary: 'string' }
      }
    },
    category3Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 3',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
      }
    },
    category3Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 3',
      table: {
        defaultValue: { summary: '30' },
        type: { summary: 'number' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<ProgressGeneralCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
}>;

// Helper para construir las categorías desde los args
function buildCategories(args: Story['args']): ProgressCategory[] {
  if (!args) return [];
  
  const categories: ProgressCategory[] = [];
  
  if (args.category1Label !== undefined) {
    categories.push({
      label: args.category1Label || 'Área',
      current: args.category1Current ?? 3,
      total: args.category1Total ?? 20
    });
  }
  
  if (args.category2Label !== undefined) {
    categories.push({
      label: args.category2Label || 'Equipo',
      current: args.category2Current ?? 8,
      total: args.category2Total ?? 50
    });
  }
  
  if (args.category3Label !== undefined) {
    categories.push({
      label: args.category3Label || 'Propio',
      current: args.category3Current ?? 5,
      total: args.category3Total ?? 30
    });
  }
  
  return categories;
}

export const Default: Story = {
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
    category1Label: 'Área',
    category1Current: 3,
    category1Total: 20,
    category2Label: 'Equipo',
    category2Current: 8,
    category2Total: 50,
    category3Label: 'Propio',
    category3Current: 5,
    category3Total: 30
},
  render: (args) => {
    // Construir las categorías desde los args
    const categories = buildCategories(args);
    
    // Construir las opciones del componente
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor
    };
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    container.style.minHeight = '400px';
    
    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    // Ajustar ancho según el layout
    if (options.layout === 'horizontal') {
      wrapper.style.maxWidth = '800px';
      wrapper.style.width = '100%';
    } else {
      wrapper.style.maxWidth = '500px';
      wrapper.style.width = '100%';
    }
    
    // Renderizar card
    const cardHTML = renderProgressGeneralCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    
    return container;
  }
};

// Helper para renderizar Circle Metric Card de manera consistente
function renderCircleMetricCardStory(options: ProgressGeneralCardOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    width: 100%;
    max-width: ${options.layout === 'horizontal' ? '800px' : '500px'};
    margin: 0 auto;
  `;
  
  const html = renderProgressGeneralCard(options);
  container.innerHTML = html;
  
  return container;
}

/**
 * SizeSM
 * Tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'sm',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: 'sm',
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: 'md',
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'lg',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: 'lg',
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card tamaño large.',
      },
    },
  },
};

/**
 * LayoutVertical
 * Layout vertical (default)
 */
export const LayoutVertical: Story = {
  name: 'Layout - Vertical',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: 'vertical',
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con layout vertical (valor por defecto).',
      },
    },
  },
};

/**
 * LayoutHorizontal
 * Layout horizontal
 */
export const LayoutHorizontal: Story = {
  name: 'Layout - Horizontal',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: 'horizontal',
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con layout horizontal.',
      },
    },
  },
};

/**
 * WithTitle
 * Con título
 */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: true,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con título visible.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Sin título
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: false,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: false,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card sin título.',
      },
    },
  },
};

/**
 * WithCircularProgress
 * Con indicador circular
 */
export const WithCircularProgress: Story = {
  name: 'With Circular Progress',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: true,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con indicador circular visible.',
      },
    },
  },
};

/**
 * WithoutCircularProgress
 * Sin indicador circular
 */
export const WithoutCircularProgress: Story = {
  name: 'Without Circular Progress',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: false,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: false,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card sin indicador circular.',
      },
    },
  },
};

/**
 * WithCategories
 * Con categorías
 */
export const WithCategories: Story = {
  name: 'With Categories',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: true,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con categorías visibles.',
      },
    },
  },
};

/**
 * WithoutCategories
 * Sin categorías
 */
export const WithoutCategories: Story = {
  name: 'Without Categories',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: false,
    showInfoIcon: false,
    showActionButton: false,
    categories: [],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: false,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card sin categorías.',
      },
    },
  },
};

/**
 * WithInfoIcon
 * Con icono de información
 */
export const WithInfoIcon: Story = {
  name: 'With Info Icon',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: true,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con icono de información visible.',
      },
    },
  },
};

/**
 * WithoutInfoIcon
 * Sin icono de información
 */
export const WithoutInfoIcon: Story = {
  name: 'Without Info Icon',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: false,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card sin icono de información.',
      },
    },
  },
};

/**
 * WithActionButton
 * Con botón de acción
 */
export const WithActionButton: Story = {
  name: 'With Action Button',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: true,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: true,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con botón de acción visible.',
      },
    },
  },
};

/**
 * WithoutActionButton
 * Sin botón de acción
 */
export const WithoutActionButton: Story = {
  name: 'Without Action Button',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: false,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card sin botón de acción.',
      },
    },
  },
};

/**
 * MainPercentage0
 * Porcentaje principal 0%
 */
export const MainPercentage0: Story = {
  name: 'Main Percentage - 0%',
  args: {
    title: 'Progreso general',
    mainPercentage: 0,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: 0,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con porcentaje principal 0%.',
      },
    },
  },
};

/**
 * MainPercentage25
 * Porcentaje principal 25%
 */
export const MainPercentage25: Story = {
  name: 'Main Percentage - 25%',
  args: {
    title: 'Progreso general',
    mainPercentage: 25,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: 25,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con porcentaje principal 25%.',
      },
    },
  },
};

/**
 * MainPercentage50
 * Porcentaje principal 50%
 */
export const MainPercentage50: Story = {
  name: 'Main Percentage - 50%',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con porcentaje principal 50%.',
      },
    },
  },
};

/**
 * MainPercentage75
 * Porcentaje principal 75%
 */
export const MainPercentage75: Story = {
  name: 'Main Percentage - 75%',
  args: {
    title: 'Progreso general',
    mainPercentage: 75,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: 75,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con porcentaje principal 75%.',
      },
    },
  },
};

/**
 * MainPercentage100
 * Porcentaje principal 100%
 */
export const MainPercentage100: Story = {
  name: 'Main Percentage - 100%',
  args: {
    title: 'Progreso general',
    mainPercentage: 100,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: 100,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con porcentaje principal 100%.',
      },
    },
  },
};

/**
 * SingleCategory
 * Una sola categoría
 */
export const SingleCategory: Story = {
  name: 'Single Category',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 3,
    category1Total: 20,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con una sola categoría.',
      },
    },
  },
};

/**
 * MultipleCategories
 * Múltiples categorías
 */
export const MultipleCategories: Story = {
  name: 'Multiple Categories',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 3,
    category1Total: 20,
    category2Label: 'Equipo',
    category2Current: 8,
    category2Total: 50,
    category3Label: 'Propio',
    category3Current: 5,
    category3Total: 30,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con múltiples categorías.',
      },
    },
  },
};

/**
 * CategoryWithHighPercentage
 * Categoría con porcentaje alto
 */
export const CategoryWithHighPercentage: Story = {
  name: 'Category - High Percentage',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 18,
    category1Total: 20,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con categoría con porcentaje alto (90%).',
      },
    },
  },
};

/**
 * CategoryWithLowPercentage
 * Categoría con porcentaje bajo
 */
export const CategoryWithLowPercentage: Story = {
  name: 'Category - Low Percentage',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 2,
    category1Total: 20,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con categoría con porcentaje bajo (10%).',
      },
    },
  },
};

/**
 * CategoryWithZeroPercentage
 * Categoría con porcentaje 0%
 */
export const CategoryWithZeroPercentage: Story = {
  name: 'Category - Zero Percentage',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 0,
    category1Total: 20,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con categoría con porcentaje 0%.',
      },
    },
  },
};

/**
 * CategoryWithFullPercentage
 * Categoría con porcentaje 100%
 */
export const CategoryWithFullPercentage: Story = {
  name: 'Category - Full Percentage',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    category1Label: 'Área',
    category1Current: 20,
    category1Total: 20,
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con categoría con porcentaje 100%.',
      },
    },
  },
};

/**
 * CustomProgressColor
 * Color de progreso personalizado
 */
export const CustomProgressColor: Story = {
  name: 'Custom Progress Color',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    progressColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con color de progreso personalizado (verde).',
      },
    },
  },
};

/**
 * CustomCircleBackgroundColor
 * Color de fondo del círculo personalizado
 */
export const CustomCircleBackgroundColor: Story = {
  name: 'Custom Circle Background Color',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-4)',
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con color de fondo del círculo personalizado.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Callback de click en la tarjeta
 */
export const OnClickCallback: Story = {
  name: 'On Click Callback',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      onClick: (event) => {
        alert('Click en la tarjeta');
      },
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con callback de click en la tarjeta.',
      },
    },
  },
};

/**
 * OnActionCallback
 * Callback de click en el botón de acción
 */
export const OnActionCallback: Story = {
  name: 'On Action Callback',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: true,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: true,
      onAction: (event) => {
        alert('Click en el botón de acción');
      },
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card con callback de click en el botón de acción.',
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
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const sizes: Array<ProgressGeneralCardOptions['size']> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
      `;
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}`;
      
      const categories = buildCategories(args);
      const progressHTML = renderProgressGeneralCard({
        title: args.title,
        mainPercentage: args.mainPercentage ?? 50,
        mainLabel: args.mainLabel,
        categories,
        layout: args.layout,
        size: size,
        showTitle: args.showTitle,
        showCircularProgress: args.showCircularProgress,
        showCategories: args.showCategories,
        showInfoIcon: args.showInfoIcon,
        showActionButton: args.showActionButton,
      } as ProgressGeneralCardOptions);
      
      sizeContainer.innerHTML = progressHTML;
      sizeContainer.insertBefore(label, sizeContainer.firstChild);
      container.appendChild(sizeContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (sm, md, lg).',
      },
    },
  },
};

/**
 * AllLayouts
 * Todos los layouts
 */
export const AllLayouts: Story = {
  name: 'All Layouts',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const layouts: Array<ProgressGeneralCardOptions['layout']> = ['vertical', 'horizontal'];
    
    layouts.forEach(layout => {
      const layoutContainer = document.createElement('div');
      layoutContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
      `;
      label.textContent = `Layout: ${layout?.charAt(0).toUpperCase() + layout?.slice(1) || 'default'}`;
      
      const categories = buildCategories(args);
      const progressHTML = renderProgressGeneralCard({
        title: args.title,
        mainPercentage: args.mainPercentage ?? 50,
        mainLabel: args.mainLabel,
        categories,
        layout: layout,
        size: args.size,
        showTitle: args.showTitle,
        showCircularProgress: args.showCircularProgress,
        showCategories: args.showCategories,
        showInfoIcon: args.showInfoIcon,
        showActionButton: args.showActionButton,
      } as ProgressGeneralCardOptions);
      
      layoutContainer.innerHTML = progressHTML;
      layoutContainer.insertBefore(label, layoutContainer.firstChild);
      container.appendChild(layoutContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los layouts disponibles (vertical, horizontal).',
      },
    },
  },
};

/**
 * AllMainPercentages
 * Todos los porcentajes principales (0, 25, 50, 75, 100)
 */
export const AllMainPercentages: Story = {
  name: 'All Main Percentages',
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: false,
    showActionButton: false,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const percentages = [0, 25, 50, 75, 100];
    
    percentages.forEach(percentage => {
      const percentageContainer = document.createElement('div');
      percentageContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
      `;
      label.textContent = `Main Percentage: ${percentage}%`;
      
      const categories = buildCategories(args);
      const progressHTML = renderProgressGeneralCard({
        title: args.title,
        mainPercentage: percentage,
        mainLabel: args.mainLabel,
        categories,
        layout: args.layout,
        size: args.size,
        showTitle: args.showTitle,
        showCircularProgress: args.showCircularProgress,
        showCategories: args.showCategories,
        showInfoIcon: args.showInfoIcon,
        showActionButton: args.showActionButton,
      } as ProgressGeneralCardOptions);
      
      percentageContainer.innerHTML = progressHTML;
      percentageContainer.insertBefore(label, percentageContainer.firstChild);
      container.appendChild(percentageContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los porcentajes principales (0%, 25%, 50%, 75%, 100%).',
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
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 8, total: 50 },
      { label: 'Propio', current: 5, total: 30 }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card completo con todas las opciones habilitadas.',
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
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'vertical',
    size: 'md',
    showTitle: false,
    showCircularProgress: true,
    showCategories: false,
    showInfoIcon: false,
    showActionButton: false,
    categories: [],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: false,
      showCircularProgress: true,
      showCategories: false,
      showInfoIcon: false,
      showActionButton: false,
    };
    return renderCircleMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Circle Metric Card mínimo con solo las opciones esenciales.',
      },
    },
  },
};

