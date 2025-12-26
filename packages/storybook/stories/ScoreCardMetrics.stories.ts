import type { Meta, StoryObj } from '@storybook/html';
import { renderScoreCardMetrics, createScoreCardMetrics } from '../../components/score-card-metrics/src/ScoreCardMetricsProvider';
import type { ScoreCardMetricsOptions } from '../../components/score-card-metrics/src/types/ScoreCardMetricsOptions';
import '../../components/score-card-metrics/src/styles/score-card-metrics.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<ScoreCardMetricsOptions> = {
  title: 'Charts/Score Card Metrics',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente ScoreCardMetrics UBITS para mostrar métricas de calificación con estrellas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 estrellas, etiquetas y descripción. Usa tokens UBITS para colores, tipografía y espaciado.'
}
}
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la métrica',
      table: {
        defaultValue: { summary: 'Califica el producto' },
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
      description: 'Etiqueta para las respuestas',
      table: {
        defaultValue: { summary: 'respuestas' },
        type: { summary: 'string' }
}
},
    average: {
      control: { type: 'number', min: 0, max: 5, step: 0.01 },
      description: 'Promedio de calificación (0-5)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
}
},
    averageLabel: {
      control: { type: 'text' },
      description: 'Etiqueta para el promedio',
      table: {
        defaultValue: { summary: 'Promedio:' },
        type: { summary: 'string' }
}
},
    score: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Score actual (0-5) para mostrar en las estrellas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
}
},
    leftLabel: {
      control: { type: 'text' },
      description: 'Etiqueta izquierda del gráfico',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'string' }
}
},
    rightLabel: {
      control: { type: 'text' },
      description: 'Etiqueta derecha del gráfico',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'string' }
}
},
    titleIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'star, chart-line, thumbs-up, etc.' }
}
},
    titleIconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono del título',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' }
}
},
    titleIconColor: {
      control: { type: 'color' },
      description: 'Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))',
      table: {
        type: { summary: 'string' }
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la tarjeta',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
}
}
}
};

export default meta;
type Story = StoryObj<ScoreCardMetricsOptions>;

export const Default: Story = {
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md'
},
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.minHeight = '200px';
    
    // Crear wrapper para la card (max-width 400px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '400px';
    wrapper.style.width = '100%';
    
    // Renderizar card
    const cardHTML = renderScoreCardMetrics(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    return container;
  }
};

// Helper para renderizar Score Card Metrics de manera consistente
function renderScoreCardMetricsStory(options: ScoreCardMetricsOptions) {
  const container = document.createElement('div');
  container.style.cssText = '
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  `;
  
  const html = renderScoreCardMetrics(options);
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'sm'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics tamaño small.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics tamaño medium (valor por defecto).',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'lg'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics tamaño large.',
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
    leftLabel: '0',
    rightLabel: '5',
    titleIcon: 'star',
    titleIconStyle: 'regular',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con icono en el título.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics sin icono en el título.',
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
    leftLabel: '0',
    rightLabel: '5',
    titleIcon: 'star',
    titleIconStyle: 'regular',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con icono del título estilo regular.',
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
    leftLabel: '0',
    rightLabel: '5',
    titleIcon: 'star',
    titleIconStyle: 'solid',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con icono del título estilo solid.',
      },
    },
  },
};

/**
 * WithTitleIconColor
 * Con color personalizado en el icono del título
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
    leftLabel: '0',
    rightLabel: '5',
    titleIcon: 'star',
    titleIconStyle: 'solid',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con color personalizado en el icono del título.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: true,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con icono de información visible.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics sin icono de información.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: true,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con botón de acción visible.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics sin botón de acción.',
      },
    },
  },
};

/**
 * Score0
 * Score 0 (0 estrellas)
 */
export const Score0: Story = {
  name: 'Score - 0',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 0.00,
    averageLabel: 'Promedio:',
    score: 0,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 0 (0 estrellas).',
      },
    },
  },
};

/**
 * Score1
 * Score 1 (1 estrella)
 */
export const Score1: Story = {
  name: 'Score - 1',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 1.00,
    averageLabel: 'Promedio:',
    score: 1,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 1 (1 estrella).',
      },
    },
  },
};

/**
 * Score2
 * Score 2 (2 estrellas)
 */
export const Score2: Story = {
  name: 'Score - 2',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 2.00,
    averageLabel: 'Promedio:',
    score: 2,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 2 (2 estrellas).',
      },
    },
  },
};

/**
 * Score3
 * Score 3 (3 estrellas)
 */
export const Score3: Story = {
  name: 'Score - 3',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 3.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 3 (3 estrellas).',
      },
    },
  },
};

/**
 * Score4
 * Score 4 (4 estrellas)
 */
export const Score4: Story = {
  name: 'Score - 4',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 4,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 4 (4 estrellas).',
      },
    },
  },
};

/**
 * Score5
 * Score 5 (5 estrellas completas)
 */
export const Score5: Story = {
  name: 'Score - 5',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 5.00,
    averageLabel: 'Promedio:',
    score: 5,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score 5 (5 estrellas completas).',
      },
    },
  },
};

/**
 * ScoreDecimal
 * Score con decimales (ej: 3.5)
 */
export const ScoreDecimal: Story = {
  name: 'Score - Decimal',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 3.50,
    averageLabel: 'Promedio:',
    score: 3.5,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con score decimal (3.5, se redondea a 4 estrellas).',
      },
    },
  },
};

/**
 * AverageDecimal
 * Promedio con decimales (ej: 4.25)
 */
export const AverageDecimal: Story = {
  name: 'Average - Decimal',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.25,
    averageLabel: 'Promedio:',
    score: 4,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con promedio decimal (4.25).',
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
    average: 0.00,
    averageLabel: 'Promedio:',
    score: 0,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics sin respuestas (0).',
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
    average: 3.50,
    averageLabel: 'Promedio:',
    score: 3.5,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con pocas respuestas (5).',
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
    totalResponses: 150,
    responsesLabel: 'respuestas',
    average: 4.25,
    averageLabel: 'Promedio:',
    score: 4,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con muchas respuestas (150).',
      },
    },
  },
};

/**
 * CustomResponsesLabel
 * Etiqueta personalizada para respuestas
 */
export const CustomResponsesLabel: Story = {
  name: 'Custom Responses Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'evaluaciones',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con etiqueta personalizada para respuestas.',
      },
    },
  },
};

/**
 * CustomAverageLabel
 * Etiqueta personalizada para promedio
 */
export const CustomAverageLabel: Story = {
  name: 'Custom Average Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Media:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con etiqueta personalizada para promedio.',
      },
    },
  },
};

/**
 * CustomLeftLabel
 * Etiqueta izquierda personalizada
 */
export const CustomLeftLabel: Story = {
  name: 'Custom Left Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: 'Nada probable',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con etiqueta izquierda personalizada.',
      },
    },
  },
};

/**
 * CustomRightLabel
 * Etiqueta derecha personalizada
 */
export const CustomRightLabel: Story = {
  name: 'Custom Right Label',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: 'Muy probable',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con etiqueta derecha personalizada.',
      },
    },
  },
};

/**
 * CustomChartDescription
 * Descripción personalizada del gráfico
 */
export const CustomChartDescription: Story = {
  name: 'Custom Chart Description',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    chartDescription: 'Escala de 0 a 5 estrellas',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con descripción personalizada del gráfico.',
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
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    const options: ScoreCardMetricsOptions = {
      ...args,
      onClick: (event) => {
        alert('Click en la tarjeta');
      },
    };
    return renderScoreCardMetricsStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics con callback de click en la tarjeta.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
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
    
    const sizes: Array<ScoreCardMetricsOptions['size']> = ['sm', 'md', 'lg'];
    
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
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}';
      
      const cardHTML = renderScoreCardMetrics({
        ...args,
        size: size,
      } as ScoreCardMetricsOptions);
      
      sizeContainer.innerHTML = cardHTML;
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
 * AllScores
 * Todos los scores (0, 1, 2, 3, 4, 5)
 */
export const AllScores: Story = {
  name: 'All Scores',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
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
    
    const scores = [0, 1, 2, 3, 4, 5];
    
    scores.forEach(score => {
      const scoreContainer = document.createElement('div');
      scoreContainer.style.cssText = `
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
      label.textContent = `Score: ${score}`;
      
      const cardHTML = renderScoreCardMetrics({
        ...args,
        score: score,
        average: score,
      } as ScoreCardMetricsOptions);
      
      scoreContainer.innerHTML = cardHTML;
      scoreContainer.insertBefore(label, scoreContainer.firstChild);
      container.appendChild(scoreContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los scores disponibles (0, 1, 2, 3, 4, 5).',
      },
    },
  },
};

/**
 * AllAverages
 * Todos los promedios (0, 1, 2, 3, 4, 5)
 */
export const AllAverages: Story = {
  name: 'All Averages',
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
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
    
    const averages = [0, 1, 2, 3, 4, 5];
    
    averages.forEach(average => {
      const averageContainer = document.createElement('div');
      averageContainer.style.cssText = `
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
      label.textContent = `Average: ${average}`;
      
      const cardHTML = renderScoreCardMetrics({
        ...args,
        average: average,
        score: average,
      } as ScoreCardMetricsOptions);
      
      averageContainer.innerHTML = cardHTML;
      averageContainer.insertBefore(label, averageContainer.firstChild);
      container.appendChild(averageContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los promedios disponibles (0, 1, 2, 3, 4, 5).',
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
    leftLabel: '0',
    rightLabel: '5',
    titleIcon: 'star',
    titleIconStyle: 'solid',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics completo con todas las opciones habilitadas.',
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
    leftLabel: '0',
    rightLabel: '5',
    showInfoIcon: false,
    showActionButton: false,
    size: 'md'
  },
  render: (args) => {
    return renderScoreCardMetricsStory(args);
  },
  parameters: {
    docs: {
      description: {
        story: 'Score Card Metrics mínimo con solo las opciones esenciales.',
      },
    },
  },
};

