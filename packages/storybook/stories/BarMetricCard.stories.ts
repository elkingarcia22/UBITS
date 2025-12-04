import type { Meta, StoryObj } from '@storybook/html';
import { renderBarMetricCard, createBarMetricCard } from '../../components/bar-metric-card/src/BarMetricCardProvider';
import type { BarMetricCardOptions, BarCategory } from '../../components/bar-metric-card/src/types/BarMetricCardOptions';
import '../../components/bar-metric-card/src/styles/bar-metric-card.css';
import '../../components/button/src/styles/button.css';
import '../../components/progress/src/styles/progress.css';

const meta: Meta<BarMetricCardOptions & {
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
  title: 'Charts/Bar Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente BarMetricCard UBITS para mostrar métricas con gráfico de barras y categorías. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Métricas' },
        category: 'Contenido',
      },
    },
    responseCount: {
      control: { type: 'number' },
      description: 'Cantidad de respuestas',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Contenido',
      },
    },
    showResponseCount: {
      control: { type: 'boolean' },
      description: 'Mostrar la cantidad de respuestas',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    barData: {
      control: { type: 'object' },
      description: 'Array de valores para las barras (pueden ser positivos o negativos)',
      table: {
        type: { summary: 'number[]' },
        category: 'Gráfico',
      },
    },
    barLabels: {
      control: { type: 'object' },
      description: 'Etiquetas para las barras (opcional)',
      table: {
        type: { summary: 'string[]' },
        category: 'Gráfico',
      },
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Valor máximo para el eje Y (opcional, se calcula automáticamente si no se proporciona)',
      table: {
        type: { summary: 'number' },
        category: 'Gráfico',
      },
    },
    minValue: {
      control: { type: 'number' },
      description: 'Valor mínimo para el eje Y (opcional, se calcula automáticamente si no se proporciona)',
      table: {
        type: { summary: 'number' },
        category: 'Gráfico',
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout del componente',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
        category: 'Apariencia',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showBarChart: {
      control: { type: 'boolean' },
      description: 'Mostrar el gráfico de barras',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Mostrar las categorías',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    showNegativeValues: {
      control: { type: 'boolean' },
      description: 'Mostrar valores negativos (barras hacia abajo)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showGridLines: {
      control: { type: 'boolean' },
      description: 'Mostrar líneas de guía (grid lines)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    barColor: {
      control: { type: 'text' },
      description: 'Color de las barras (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-chart-bg-neutral-blue-base)' },
        category: 'Estilo',
      },
    },
    chartBackgroundColor: {
      control: { type: 'text' },
      description: 'Color de fondo del gráfico (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-1)' },
        category: 'Estilo',
      },
    },
    gridLineColor: {
      control: { type: 'text' },
      description: 'Color de las líneas de la grilla (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--modifiers-normal-color-light-border-1)' },
        category: 'Estilo',
      },
    },
    category1Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category1Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category1Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category2Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category2Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
    category3Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
    category3Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BarMetricCardOptions & {
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

export const Default: Story = {
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago'],
    maxValue: 60,
    minValue: -60,
    categories: [
      {
        label: 'Área',
        current: 3,
        total: 20
      },
      {
        label: 'Equipo',
        current: 5,
        total: 15
      },
      {
        label: 'Propio',
        current: 2,
        total: 10
      }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    showNegativeValues: true,
    showGridLines: true,
    barColor: '#557593)',
    chartBackgroundColor: 'var(--modifiers-normal-color-light-bg-1)',
    gridLineColor: 'var(--modifiers-normal-color-light-border-1)',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const cardContainer = document.createElement('div');
    const containerId = `bar-metric-card-container-${Date.now()}`;
    cardContainer.id = containerId;
    cardContainer.style.cssText = `
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(cardContainer);
    
    // Construir categorías desde los args
    const categories: BarCategory[] = [];
    
    if (args.category1Label && args.category1Current !== undefined && args.category1Total !== undefined) {
      categories.push({
        label: args.category1Label,
        current: args.category1Current,
        total: args.category1Total
      });
    }
    
    if (args.category2Label && args.category2Current !== undefined && args.category2Total !== undefined) {
      categories.push({
        label: args.category2Label,
        current: args.category2Current,
        total: args.category2Total
      });
    }
    
    if (args.category3Label && args.category3Current !== undefined && args.category3Total !== undefined) {
      categories.push({
        label: args.category3Label,
        current: args.category3Current,
        total: args.category3Total
      });
    }
    
    // Si no hay categorías en args, usar las del default
    const finalCategories = categories.length > 0 ? categories : args.categories || [];
    
    const options: BarMetricCardOptions = {
      title: args.title || 'Métricas',
      responseCount: args.responseCount !== undefined ? args.responseCount : 0,
      showResponseCount: args.showResponseCount !== undefined ? args.showResponseCount : false,
      barData: args.barData || [],
      barLabels: args.barLabels,
      maxValue: args.maxValue,
      minValue: args.minValue,
      categories: finalCategories,
      layout: args.layout || 'vertical',
      size: args.size || 'md',
      showTitle: args.showTitle !== undefined ? args.showTitle : true,
      showBarChart: args.showBarChart !== undefined ? args.showBarChart : true,
      showCategories: args.showCategories !== undefined ? args.showCategories : true,
      showInfoIcon: args.showInfoIcon !== undefined ? args.showInfoIcon : true,
      showActionButton: args.showActionButton !== undefined ? args.showActionButton : true,
      showNegativeValues: args.showNegativeValues !== undefined ? args.showNegativeValues : true,
      showGridLines: args.showGridLines !== undefined ? args.showGridLines : true,
      barColor: args.barColor || '#557593)',
      chartBackgroundColor: args.chartBackgroundColor || 'var(--modifiers-normal-color-light-bg-1)',
      gridLineColor: args.gridLineColor || 'var(--modifiers-normal-color-light-border-1)',
      onClick: args.onClick,
      onAction: args.onAction
    };
    
    const cardHTML = renderBarMetricCard(options);
    cardContainer.innerHTML = cardHTML;
    
    return container;
  },
};

// Helper para renderizar Bar Metric Card de manera consistente
function renderBarMetricCardStory(options: BarMetricCardOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
    border-radius: 8px;
    width: 100%;
    max-width: 100%;
    min-height: auto;
    height: auto;
    overflow: visible !important;
    max-height: none !important;
  `;
  
  const cardContainer = document.createElement('div');
  const containerId = `bar-metric-card-container-${Date.now()}`;
  cardContainer.id = containerId;
  cardContainer.style.cssText = `
    width: 100%;
    overflow: visible !important;
    min-height: auto;
    height: auto;
    max-height: none !important;
  `;
  
  container.appendChild(cardContainer);
  
  const cardHTML = renderBarMetricCard(options);
  cardContainer.innerHTML = cardHTML;
  
  return container;
}

/**
 * LayoutVertical
 * Layout vertical (gráfico SVG + categorías estándar)
 */
export const LayoutVertical: Story = {
  name: 'Layout - Vertical',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    maxValue: 60,
    minValue: -60,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      layout: 'vertical',
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout vertical: muestra gráfico SVG de barras + categorías estándar.',
      },
    },
  },
};

/**
 * LayoutHorizontal
 * Layout horizontal (solo categorías con progress bars)
 */
export const LayoutHorizontal: Story = {
  name: 'Layout - Horizontal',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 }
    ],
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showBarChart: false,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      layout: 'horizontal',
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout horizontal: muestra solo categorías con progress bars (no muestra gráfico SVG).',
      },
    },
  },
};

/**
 * SizeSM
 * Tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 }
    ],
    layout: 'vertical',
    size: 'sm',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      size: 'sm',
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño small.',
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
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      size: 'md',
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño medium (valor por defecto).',
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
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 }
    ],
    layout: 'vertical',
    size: 'lg',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      size: 'lg',
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamaño large.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showTitle: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con título visible.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: false,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showTitle: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin título.',
      },
    },
  },
};

/**
 * WithResponseCount
 * Con cantidad de respuestas
 */
export const WithResponseCount: Story = {
  name: 'With Response Count',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showResponseCount: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con cantidad de respuestas visible.',
      },
    },
  },
};

/**
 * WithoutResponseCount
 * Sin cantidad de respuestas
 */
export const WithoutResponseCount: Story = {
  name: 'Without Response Count',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: false,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showResponseCount: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin cantidad de respuestas.',
      },
    },
  },
};

/**
 * WithBarChart
 * Con gráfico de barras
 */
export const WithBarChart: Story = {
  name: 'With Bar Chart',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showBarChart: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con gráfico de barras SVG visible.',
      },
    },
  },
};

/**
 * WithoutBarChart
 * Sin gráfico de barras
 */
export const WithoutBarChart: Story = {
  name: 'Without Bar Chart',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: false,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showBarChart: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin gráfico de barras (solo categorías).',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showCategories: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con categorías visibles.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: false,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showCategories: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin categorías (solo gráfico).',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showInfoIcon: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con icono de información junto al título.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: false,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showInfoIcon: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin icono de información.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showActionButton: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showActionButton: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con botón de acción (flecha a la derecha).',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showActionButton: false,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showActionButton: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin botón de acción.',
      },
    },
  },
};

/**
 * WithNegativeValues
 * Con valores negativos (barras hacia abajo)
 */
export const WithNegativeValues: Story = {
  name: 'With Negative Values',
  args: {
    title: 'Nombre de la pregunta',
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    maxValue: 60,
    minValue: -60,
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showNegativeValues: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showNegativeValues: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con valores negativos (barras hacia abajo).',
      },
    },
  },
};

/**
 * WithoutNegativeValues
 * Sin valores negativos (solo positivos)
 */
export const WithoutNegativeValues: Story = {
  name: 'Without Negative Values',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55, 65, 75],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showNegativeValues: false,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showNegativeValues: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin valores negativos (solo positivos).',
      },
    },
  },
};

/**
 * WithGridLines
 * Con líneas de guía
 */
export const WithGridLines: Story = {
  name: 'With Grid Lines',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showGridLines: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showGridLines: true,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con líneas de guía (grid lines) visibles.',
      },
    },
  },
};

/**
 * WithoutGridLines
 * Sin líneas de guía
 */
export const WithoutGridLines: Story = {
  name: 'Without Grid Lines',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showGridLines: false,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      showGridLines: false,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin líneas de guía.',
      },
    },
  },
};

/**
 * WithBarLabels
 * Con etiquetas para las barras
 */
export const WithBarLabels: Story = {
  name: 'With Bar Labels',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      barLabels: args.barLabels,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con etiquetas personalizadas para las barras.',
      },
    },
  },
};

/**
 * WithoutBarLabels
 * Sin etiquetas para las barras
 */
export const WithoutBarLabels: Story = {
  name: 'Without Bar Labels',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: undefined,
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      barLabels: undefined,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin etiquetas para las barras (usa índices).',
      },
    },
  },
};

/**
 * WithCustomMaxMin
 * Con valores máximo y mínimo personalizados
 */
export const WithCustomMaxMin: Story = {
  name: 'With Custom Max/Min',
  args: {
    title: 'Nombre de la pregunta',
    barData: [-25, -15, 15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    maxValue: 60,
    minValue: -60,
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      maxValue: args.maxValue,
      minValue: args.minValue,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con valores máximo y mínimo personalizados para el eje Y.',
      },
    },
  },
};

/**
 * WithoutCustomMaxMin
 * Sin valores máximo y mínimo (calculados automáticamente)
 */
export const WithoutCustomMaxMin: Story = {
  name: 'Without Custom Max/Min',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55, 65, 75],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    maxValue: undefined,
    minValue: undefined,
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
      maxValue: undefined,
      minValue: undefined,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card sin valores máximo y mínimo (calculados automáticamente).',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 },
      { label: 'Otro', current: 8, total: 25 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con múltiples categorías.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con una sola categoría.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    const options: BarMetricCardOptions = {
      ...args,
      categories,
      onClick: () => {
        alert('Bar Metric Card clicked');
        console.log('Bar Metric Card clicked');
      }
    };
    return renderBarMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con callback onClick que se ejecuta cuando se hace clic en la tarjeta.',
      },
    },
  },
};

/**
 * OnActionCallback
 * Con callback onAction
 */
export const OnActionCallback: Story = {
  name: 'OnAction Callback',
  args: {
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showActionButton: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    const options: BarMetricCardOptions = {
      ...args,
      categories,
      onAction: () => {
        alert('Action button clicked');
        console.log('Action button clicked');
      }
    };
    return renderBarMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card con callback onAction que se ejecuta cuando se hace clic en el botón de acción.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const categories: BarCategory[] = args.categories || [];
    const sizes: Array<BarMetricCardOptions['size']> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.cssText = `
        width: 100%;
        overflow: visible !important;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
      `;
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}`;
      
      sizeContainer.appendChild(label);
      
      const cardContainer = document.createElement('div');
      cardContainer.id = `bar-metric-card-${size}-${Date.now()}`;
      cardContainer.style.cssText = `
        width: 100%;
        overflow: visible !important;
      `;
      
      const cardHTML = renderBarMetricCard({
        ...args,
        categories,
        size: size,
      } as BarMetricCardOptions);
      
      cardContainer.innerHTML = cardHTML;
      sizeContainer.appendChild(cardContainer);
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
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [15, 25, 35, 45, 55],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const categories: BarCategory[] = args.categories || [];
    const layouts: Array<BarMetricCardOptions['layout']> = ['vertical', 'horizontal'];
    
    layouts.forEach(layout => {
      const layoutContainer = document.createElement('div');
      layoutContainer.style.cssText = `
        width: 100%;
        overflow: visible !important;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
      `;
      label.textContent = `Layout: ${layout?.charAt(0).toUpperCase() + layout?.slice(1) || 'default'}`;
      
      layoutContainer.appendChild(label);
      
      const cardContainer = document.createElement('div');
      cardContainer.id = `bar-metric-card-${layout}-${Date.now()}`;
      cardContainer.style.cssText = `
        width: 100%;
        overflow: visible !important;
      `;
      
      const cardHTML = renderBarMetricCard({
        ...args,
        categories,
        layout: layout,
        showBarChart: layout === 'vertical', // Solo mostrar gráfico en vertical
      } as BarMetricCardOptions);
      
      cardContainer.innerHTML = cardHTML;
      layoutContainer.appendChild(cardContainer);
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
 * CompleteExample
 * Ejemplo completo
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    maxValue: 60,
    minValue: -60,
    categories: [
      { label: 'Área', current: 3, total: 20 },
      { label: 'Equipo', current: 5, total: 15 },
      { label: 'Propio', current: 2, total: 10 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    showNegativeValues: true,
    showGridLines: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    const options: BarMetricCardOptions = {
      ...args,
      categories,
      onClick: () => {
        console.log('Bar Metric Card clicked');
      },
      onAction: () => {
        console.log('Action button clicked');
      }
    };
    return renderBarMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card completo con todas las opciones habilitadas.',
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
    title: 'Nombre de la pregunta',
    barData: [15, 25, 35, 45, 55],
    categories: [
      { label: 'Área', current: 3, total: 20 }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
  },
  render: (args) => {
    const categories: BarCategory[] = args.categories || [];
    return renderBarMetricCardStory({
      ...args,
      categories,
    } as BarMetricCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar Metric Card mínimo con solo las opciones esenciales.',
      },
    },
  },
};

