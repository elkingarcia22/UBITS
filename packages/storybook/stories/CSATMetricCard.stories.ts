import type { Meta, StoryObj } from '@storybook/html';
import { renderCSATMetricCard, createCSATMetricCard } from '../../components/csat-metric-card/src/CSATMetricCardProvider';
import type { CSATMetricCardOptions } from '../../components/csat-metric-card/src/types/CSATMetricCardOptions';
import '../../components/csat-metric-card/src/styles/csat-metric-card.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<CSATMetricCardOptions> = {
  title: 'Charts/CSAT Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente CSATMetricCard UBITS para mostrar métricas CSAT (Customer Satisfaction) con caritas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 caritas con textos. Usa tokens UBITS para colores, tipografía y espaciado.`,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la métrica',
      table: {
        defaultValue: { summary: 'Califica el producto' },
        type: { summary: 'string' },
      },
    },
    totalResponses: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Número total de respuestas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    responsesLabel: {
      control: { type: 'text' },
      description: 'Etiqueta para las respuestas',
      table: {
        defaultValue: { summary: 'respuestas' },
        type: { summary: 'string' },
      },
    },
    average: {
      control: { type: 'number', min: 0, max: 5, step: 0.01 },
      description: 'Promedio de calificación (0-5)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    averageLabel: {
      control: { type: 'text' },
      description: 'Etiqueta para el promedio',
      table: {
        defaultValue: { summary: 'Promedio:' },
        type: { summary: 'string' },
      },
    },
    score: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Score actual (0-5) para mostrar en las caritas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    titleIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'star, chart-line, thumbs-up, etc.' },
      },
    },
    titleIconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono del título',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    titleIconColor: {
      control: { type: 'color' },
      description: 'Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))',
      table: {
        type: { summary: 'string' },
      },
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la tarjeta',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CSATMetricCardOptions>;

export const Default: Story = {
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    showInfoIcon: true,
    showActionButton: true,
    size: 'md',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.borderRadius = '8px)';
    container.style.minHeight = '200px';
    
    // Crear wrapper para la card (max-width 400px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '400px';
    wrapper.style.width = '100%';
    
    // Renderizar card
    const cardHTML = renderCSATMetricCard(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    return container;
  },
};

// Helper para renderizar CSAT Metric Card de manera consistente
function renderCSATMetricCardStory(options: CSATMetricCardOptions) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'flex-start';
  container.style.padding = '48px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  container.style.borderRadius = '8px';
  container.style.minHeight = '200px';
  
  const wrapper = document.createElement('div');
  wrapper.style.maxWidth = '400px';
  wrapper.style.width = '100%';
  
  const cardHTML = renderCSATMetricCard(options);
  wrapper.innerHTML = cardHTML;
  container.appendChild(wrapper);
  
  return container;
}

/**
 * SizeSM
 * Tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'sm',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card tamaño small.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card tamaño medium (valor por defecto).',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'lg',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card tamaño large.',
      },
    },
  },
};

/**
 * Score1
 * Score 1 (Muy malo - cara enojada roja)
 */
export const Score1: Story = {
  name: 'Score - 1 (Muy malo)',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 1.50,
    averageLabel: 'Promedio:',
    score: 1,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con score 1 (Muy malo - cara enojada roja).',
      },
    },
  },
};

/**
 * Score2
 * Score 2 (Malo - cara triste naranja)
 */
export const Score2: Story = {
  name: 'Score - 2 (Malo)',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 2.50,
    averageLabel: 'Promedio:',
    score: 2,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con score 2 (Malo - cara triste naranja).',
      },
    },
  },
};

/**
 * Score3
 * Score 3 (Regular - cara neutral azul)
 */
export const Score3: Story = {
  name: 'Score - 3 (Regular)',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 3.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con score 3 (Regular - cara neutral azul).',
      },
    },
  },
};

/**
 * Score4
 * Score 4 (Bueno - cara sonriente verde)
 */
export const Score4: Story = {
  name: 'Score - 4 (Bueno)',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 4,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con score 4 (Bueno - cara sonriente verde).',
      },
    },
  },
};

/**
 * Score5
 * Score 5 (Muy bueno - cara sonriente amplia verde)
 */
export const Score5: Story = {
  name: 'Score - 5 (Muy bueno)',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.80,
    averageLabel: 'Promedio:',
    score: 5,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con score 5 (Muy bueno - cara sonriente amplia verde).',
      },
    },
  },
};

/**
 * WithTitleIcon
 * Con icono en el título
 */
export const WithTitleIcon: Story = {
  name: 'With Title Icon',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: 'star',
    titleIconStyle: 'regular',
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con icono en el título.',
      },
    },
  },
};

/**
 * WithoutTitleIcon
 * Sin icono en el título
 */
export const WithoutTitleIcon: Story = {
  name: 'Without Title Icon',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: undefined,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card sin icono en el título.',
      },
    },
  },
};

/**
 * TitleIconStyleRegular
 * Icono del título estilo regular
 */
export const TitleIconStyleRegular: Story = {
  name: 'Title Icon Style - Regular',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: 'star',
    titleIconStyle: 'regular',
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con icono del título estilo regular.',
      },
    },
  },
};

/**
 * TitleIconStyleSolid
 * Icono del título estilo solid
 */
export const TitleIconStyleSolid: Story = {
  name: 'Title Icon Style - Solid',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: 'star',
    titleIconStyle: 'solid',
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con icono del título estilo solid.',
      },
    },
  },
};

/**
 * WithTitleIconColor
 * Con color personalizado para el icono del título
 */
export const WithTitleIconColor: Story = {
  name: 'With Title Icon Color',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: 'star',
    titleIconStyle: 'regular',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con color personalizado para el icono del título.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    showInfoIcon: true,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con icono de información junto al título.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    showInfoIcon: false,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card sin icono de información.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    showActionButton: true,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con botón de acción (flecha a la derecha).',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    showActionButton: false,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card sin botón de acción.',
      },
    },
  },
};

/**
 * WithCustomResponsesLabel
 * Con etiqueta personalizada para respuestas
 */
export const WithCustomResponsesLabel: Story = {
  name: 'With Custom Responses Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'evaluaciones',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con etiqueta personalizada para respuestas.',
      },
    },
  },
};

/**
 * WithCustomAverageLabel
 * Con etiqueta personalizada para promedio
 */
export const WithCustomAverageLabel: Story = {
  name: 'With Custom Average Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Media:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con etiqueta personalizada para promedio.',
      },
    },
  },
};

/**
 * HighAverage
 * Promedio alto (4.5-5.0)
 */
export const HighAverage: Story = {
  name: 'High Average',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.75,
    averageLabel: 'Promedio:',
    score: 5,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con promedio alto (4.5-5.0).',
      },
    },
  },
};

/**
 * MediumAverage
 * Promedio medio (2.5-4.4)
 */
export const MediumAverage: Story = {
  name: 'Medium Average',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 3.50,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con promedio medio (2.5-4.4).',
      },
    },
  },
};

/**
 * LowAverage
 * Promedio bajo (0-2.4)
 */
export const LowAverage: Story = {
  name: 'Low Average',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 1.80,
    averageLabel: 'Promedio:',
    score: 2,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con promedio bajo (0-2.4).',
      },
    },
  },
};

/**
 * ManyResponses
 * Muchas respuestas (100+)
 */
export const ManyResponses: Story = {
  name: 'Many Responses',
  args: {
    title: 'Califica el producto',
    totalResponses: 250,
    responsesLabel: 'respuestas',
    average: 4.20,
    averageLabel: 'Promedio:',
    score: 4,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con muchas respuestas (100+).',
      },
    },
  },
};

/**
 * FewResponses
 * Pocas respuestas (1-10)
 */
export const FewResponses: Story = {
  name: 'Few Responses',
  args: {
    title: 'Califica el producto',
    totalResponses: 5,
    responsesLabel: 'respuestas',
    average: 3.80,
    averageLabel: 'Promedio:',
    score: 4,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con pocas respuestas (1-10).',
      },
    },
  },
};

/**
 * ZeroResponses
 * Sin respuestas (0)
 */
export const ZeroResponses: Story = {
  name: 'Zero Responses',
  args: {
    title: 'Califica el producto',
    totalResponses: 0,
    responsesLabel: 'respuestas',
    average: 0,
    averageLabel: 'Promedio:',
    score: 0,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card sin respuestas (0).',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => {
    const options: CSATMetricCardOptions = {
      ...args,
      onClick: () => {
        alert('CSAT Metric Card clicked');
        console.log('CSAT Metric Card clicked');
      }
    };
    return renderCSATMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card con callback onClick que se ejecuta cuando se hace clic en la tarjeta.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = '
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const sizes: Array<CSATMetricCardOptions['size']> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.cssText = `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 24px;
        background: var(--modifiers-normal-color-light-bg-1);
        border-radius: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
        width: 100%;
      `;
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}';
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 400px;
        width: 100%;
      `;
      
      const cardHTML = renderCSATMetricCard({
        ...args,
        size: size,
      } as CSATMetricCardOptions);
      
      wrapper.innerHTML = cardHTML;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      innerContainer.appendChild(label);
      innerContainer.appendChild(wrapper);
      sizeContainer.appendChild(innerContainer);
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
 * AllScores
 * Todos los scores (1-5)
 */
export const AllScores: Story = {
  name: 'All Scores',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 3.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const scores = [1, 2, 3, 4, 5];
    const scoreLabels = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Muy bueno'];
    const averages = [1.50, 2.50, 3.00, 4.00, 4.80];
    
    scores.forEach((score, index) => {
      const scoreContainer = document.createElement('div');
      scoreContainer.style.cssText = `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 24px;
        background: var(--modifiers-normal-color-light-bg-1);
        border-radius: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
        width: 100%;
      `;
      label.textContent = `Score: ${score} (${scoreLabels[index]})`;
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 400px;
        width: 100%;
      `;
      
      const cardHTML = renderCSATMetricCard({
        ...args,
        score: score,
        average: averages[index],
      } as CSATMetricCardOptions);
      
      wrapper.innerHTML = cardHTML;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      innerContainer.appendChild(label);
      innerContainer.appendChild(wrapper);
      scoreContainer.appendChild(innerContainer);
      container.appendChild(scoreContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los scores disponibles (1-5) con sus respectivas caritas y colores.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    titleIcon: 'star',
    titleIconStyle: 'regular',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md',
  },
  render: (args) => {
    const options: CSATMetricCardOptions = {
      ...args,
      onClick: () => {
        console.log('CSAT Metric Card clicked');
      }
    };
    return renderCSATMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card completo con todas las opciones habilitadas.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    size: 'md',
  },
  render: (args) => renderCSATMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'CSAT Metric Card mínimo con solo las opciones esenciales.',
      },
    },
  },
};

