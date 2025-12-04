import type { Meta, StoryObj } from '@storybook/html';
import { renderNPSCard, createNPSCard } from '../../components/nps-card/src/NPSCardProvider';
import type { NPSCardOptions, NPSCategory } from '../../components/nps-card/src/types/NPSCardOptions';
import '../../components/nps-card/src/styles/nps-card.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<NPSCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category1Color?: string;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category2Color?: string;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
  category3Color?: string;
}> = {
  title: 'Charts/NPS Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente NPSCard UBITS para mostrar métricas NPS (Net Promoter Score) con gauge semicircular. Incluye segmentos de color (rojo, amarillo, verde), aguja indicadora, categorías con porcentajes y contador de respuestas. Usa tokens UBITS para colores, tipografía y espaciado.'
}
}
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        defaultValue: { summary: 'Nivel de confianza' },
        type: { summary: 'string' }
}
},
    score: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Puntuación principal mostrada en el gauge (0-100)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
}
},
    scoreLabel: {
      control: { type: 'text' },
      description: 'Etiqueta del score (ej: "Puntuación")',
      table: {
        defaultValue: { summary: 'Puntuación' },
        type: { summary: 'string' }
}
},
    totalResponses: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Número total de respuestas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
}
},
    responsesLabel: {
      control: { type: 'text' },
      description: 'Texto para mostrar las respuestas (ej: "respuestas")',
      table: {
        defaultValue: { summary: 'respuestas' },
        type: { summary: 'string' }
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
    showResponsesCount: {
      control: { type: 'boolean' },
      description: 'Mostrar el contador de respuestas',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showGauge: {
      control: { type: 'boolean' },
      description: 'Mostrar el gauge semicircular',
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
    lowColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento rojo (0-20)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
        type: { summary: 'string' }
}
},
    mediumColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento amarillo (20-60)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
        type: { summary: 'string' }
}
},
    highColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento verde (60-100)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
        type: { summary: 'string' }
}
},
    gaugeBackgroundColor: {
      control: { type: 'color' },
      description: 'Color de fondo del gauge (token UBITS o color hexadecimal)',
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
        defaultValue: { summary: 'No tienen confianza' },
        type: { summary: 'string' }
}
},
    category1Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 1',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
},
    category1Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 1',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' }
}
},
    category1Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 1',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
        type: { summary: 'string' }
}
},
    // Controles para categoría 2
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        defaultValue: { summary: 'Neutrales' },
        type: { summary: 'string' }
}
},
    category2Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 2',
      table: {
        defaultValue: { summary: '10' },
        type: { summary: 'number' }
}
},
    category2Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 2',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' }
}
},
    category2Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 2',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
        type: { summary: 'string' }
}
},
    // Controles para categoría 3
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        defaultValue: { summary: 'Tienen confianza' },
        type: { summary: 'string' }
}
},
    category3Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 3',
      table: {
        defaultValue: { summary: '30' },
        type: { summary: 'number' }
}
},
    category3Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 3',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' }
}
},
    category3Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 3',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
        type: { summary: 'string' }
}
}
}
};

export default meta;
type Story = StoryObj<NPSCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category1Color?: string;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category2Color?: string;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
  category3Color?: string;
}>;

// Helper para construir las categorías desde los args
function buildCategories(args: Story['args']): NPSCategory[] {
  if (!args) return [];
  
  const categories: NPSCategory[] = [];
  
  if (args.category1Label !== undefined) {
    categories.push({
      label: args.category1Label || 'No tienen confianza',
      current: args.category1Current ?? 50,
      total: args.category1Total ?? 100,
      color: args.category1Color || 'var(--modifiers-normal-color-light-feedback-accent-error)'
});
  }
  
  if (args.category2Label !== undefined) {
    categories.push({
      label: args.category2Label || 'Neutrales',
      current: args.category2Current ?? 10,
      total: args.category2Total ?? 100,
      color: args.category2Color || 'var(--modifiers-normal-color-light-feedback-accent-warning)'
});
  }
  
  if (args.category3Label !== undefined) {
    categories.push({
      label: args.category3Label || 'Tienen confianza',
      current: args.category3Current ?? 30,
      total: args.category3Total ?? 100,
      color: args.category3Color || 'var(--modifiers-normal-color-light-feedback-accent-success)'
});
  }
  
  return categories;
}

export const Default: Story = {
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    lowColor: '#E53E3E',
    mediumColor: '#F6AD55',
    highColor: '#38A169',
    gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)',
    category1Label: 'No tienen confianza',
    category1Current: 50,
    category1Total: 100,
    category1Color: '#E53E3E',
    category2Label: 'Neutrales',
    category2Current: 10,
    category2Total: 100,
    category2Color: '#F6AD55',
    category3Label: 'Tienen confianza',
    category3Current: 30,
    category3Total: 100,
    category3Color: '#38A169'
},
  render: (args) => {
    // Construir las categorías desde los args
    const categories = buildCategories(args);
    
    // Construir las opciones del componente
    const options: NPSCardOptions = {
      title: args.title,
      score: args.score ?? 0,
      scoreLabel: args.scoreLabel,
      totalResponses: args.totalResponses ?? 0,
      responsesLabel: args.responsesLabel,
      categories,
      size: args.size,
      showTitle: args.showTitle,
      showResponsesCount: args.showResponsesCount,
      showGauge: args.showGauge,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      lowColor: args.lowColor,
      mediumColor: args.mediumColor,
      highColor: args.highColor,
      gaugeBackgroundColor: args.gaugeBackgroundColor
};
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; padding: 24px; background: var(--modifiers-normal-color-light-bg-2); border: 1px solid var(--modifiers-normal-color-light-border-1);';
    
    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto; padding: 24px;';
    
    // Renderizar card
    const cardHTML = renderNPSCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    
    return container;
  }
};

// Helper para renderizar NPS Card de manera consistente
function renderNPSCardStory(options: NPSCardOptions) {
  const container = document.createElement('div');
  container.style.cssText = 'width: 100%; padding: 24px; background: var(--modifiers-normal-color-light-bg-2); border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px;';
  
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto;';
  
  const cardHTML = renderNPSCard(options);
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'sm',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card tamaño small.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card tamaño medium (valor por defecto).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'lg',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card tamaño large.',
      },
    },
  },
};

/**
 * ScoreLow
 * Score bajo (0-20)
 */
export const ScoreLow: Story = {
  name: 'Score - Low (0-20)',
  args: {
    title: 'Nivel de confianza',
    score: 15,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con score bajo (0-20).',
      },
    },
  },
};

/**
 * ScoreMedium
 * Score medio (20-60)
 */
export const ScoreMedium: Story = {
  name: 'Score - Medium (20-60)',
  args: {
    title: 'Nivel de confianza',
    score: 45,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con score medio (20-60).',
      },
    },
  },
};

/**
 * ScoreHigh
 * Score alto (60-100)
 */
export const ScoreHigh: Story = {
  name: 'Score - High (60-100)',
  args: {
    title: 'Nivel de confianza',
    score: 75,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con score alto (60-100).',
      },
    },
  },
};

/**
 * ScoreZero
 * Score cero
 */
export const ScoreZero: Story = {
  name: 'Score - Zero',
  args: {
    title: 'Nivel de confianza',
    score: 0,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con score cero.',
      },
    },
  },
};

/**
 * ScoreMax
 * Score máximo (100)
 */
export const ScoreMax: Story = {
  name: 'Score - Max (100)',
  args: {
    title: 'Nivel de confianza',
    score: 100,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con score máximo (100).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con título visible.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: false,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin título.',
      },
    },
  },
};

/**
 * WithResponsesCount
 * Con contador de respuestas
 */
export const WithResponsesCount: Story = {
  name: 'With Responses Count',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con contador de respuestas visible.',
      },
    },
  },
};

/**
 * WithoutResponsesCount
 * Sin contador de respuestas
 */
export const WithoutResponsesCount: Story = {
  name: 'Without Responses Count',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: false,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin contador de respuestas.',
      },
    },
  },
};

/**
 * WithGauge
 * Con gauge semicircular
 */
export const WithGauge: Story = {
  name: 'With Gauge',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con gauge semicircular visible.',
      },
    },
  },
};

/**
 * WithoutGauge
 * Sin gauge semicircular
 */
export const WithoutGauge: Story = {
  name: 'Without Gauge',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: false,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin gauge semicircular (solo categorías).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con categorías visibles.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: false,
    categories: [],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin categorías (solo gauge).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showInfoIcon: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con icono de información junto al título.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showInfoIcon: false,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin icono de información.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showActionButton: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con botón de acción (flecha a la derecha).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showActionButton: false,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin botón de acción.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' },
      { label: 'Muy satisfechos', current: 10, total: 100, color: '#22543D' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con múltiples categorías.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con una sola categoría.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 1250,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con muchas respuestas (100+).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 5,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con pocas respuestas (1-10).',
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
    title: 'Nivel de confianza',
    score: 0,
    scoreLabel: 'Puntuación',
    totalResponses: 0,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 0, total: 0, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card sin respuestas (0).',
      },
    },
  },
};

/**
 * CustomScoreLabel
 * Con etiqueta personalizada para el score
 */
export const CustomScoreLabel: Story = {
  name: 'Custom Score Label',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'NPS Score',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con etiqueta personalizada para el score.',
      },
    },
  },
};

/**
 * CustomResponsesLabel
 * Con etiqueta personalizada para respuestas
 */
export const CustomResponsesLabel: Story = {
  name: 'Custom Responses Label',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'evaluaciones',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con etiqueta personalizada para respuestas.',
      },
    },
  },
};

/**
 * CustomColors
 * Con colores personalizados para el gauge
 */
export const CustomColors: Story = {
  name: 'Custom Colors',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    lowColor: '#FF0000',
    mediumColor: '#FFA500',
    highColor: '#00FF00',
    gaugeBackgroundColor: '#F0F0F0',
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con colores personalizados para el gauge.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: NPSCardOptions = {
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
      onClick: () => {
        alert('NPS Card clicked');
        console.log('NPS Card clicked');
      }
    };
    return renderNPSCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con callback onClick que se ejecuta cuando se hace clic en la tarjeta.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showActionButton: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: NPSCardOptions = {
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
      onAction: () => {
        alert('Action button clicked');
        console.log('Action button clicked');
      }
    };
    return renderNPSCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card con callback onAction que se ejecuta cuando se hace clic en el botón de acción.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
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
    
    const sizes: Array<NPSCardOptions['size']> = ['sm', 'md', 'lg'];
    const categories = buildCategories(args);
    
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
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}`;
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 500px;
        width: 100%;
      `;
      
      const cardHTML = renderNPSCard({
        ...args,
        size: size,
        categories: categories.length > 0 ? categories : args.categories || [],
      } as NPSCardOptions);
      
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
 * Todos los rangos de score
 */
export const AllScores: Story = {
  name: 'All Scores',
  args: {
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
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
    
    const scores = [0, 15, 45, 75, 100];
    const scoreLabels = ['Bajo (0)', 'Bajo (15)', 'Medio (45)', 'Alto (75)', 'Máximo (100)'];
    const categories = buildCategories(args);
    
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
      label.textContent = `Score: ${scoreLabels[index]}`;
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 500px;
        width: 100%;
      `;
      
      const cardHTML = renderNPSCard({
        ...args,
        score: score,
        categories: categories.length > 0 ? categories : args.categories || [],
      } as NPSCardOptions);
      
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
        story: 'Todos los rangos de score disponibles (bajo, medio, alto, máximo).',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    lowColor: '#E53E3E',
    mediumColor: '#F6AD55',
    highColor: '#38A169',
    gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-2)',
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' },
      { label: 'Neutrales', current: 10, total: 100, color: '#F6AD55' },
      { label: 'Tienen confianza', current: 30, total: 100, color: '#38A169' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    const options: NPSCardOptions = {
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
      onClick: () => {
        console.log('NPS Card clicked');
      },
      onAction: () => {
        console.log('Action button clicked');
      }
    };
    return renderNPSCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card completo con todas las opciones habilitadas.',
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
    title: 'Nivel de confianza',
    score: 56,
    scoreLabel: 'Puntuación',
    totalResponses: 290,
    responsesLabel: 'respuestas',
    size: 'md',
    showTitle: true,
    showResponsesCount: true,
    showGauge: true,
    showCategories: true,
    categories: [
      { label: 'No tienen confianza', current: 50, total: 100, color: '#E53E3E' }
    ],
  },
  render: (args) => {
    const categories = buildCategories(args);
    return renderNPSCardStory({
      ...args,
      categories: categories.length > 0 ? categories : args.categories || [],
    } as NPSCardOptions);
  },
  parameters: {
    docs: {
      description: {
        story: 'NPS Card mínimo con solo las opciones esenciales.',
      },
    },
  },
};

