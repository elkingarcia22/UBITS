import type { Meta, StoryObj } from '@storybook/html';
import { createProgressBar, renderProgressBar } from '../../components/progress/src/ProgressProvider';
import type { ProgressOptions, ProgressSegment } from '../../components/progress/src/types/ProgressOptions';
import '../../components/progress/src/styles/progress.css';

interface ExtendedProgressOptions extends ProgressOptions {
  numSegments?: number;
  segment1Value?: number;
  segment1Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
  segment2Value?: number;
  segment2Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
  segment3Value?: number;
  segment3Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
  segment4Value?: number;
  segment4Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
  segment5Value?: number;
  segment5Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
}

const meta: Meta<ExtendedProgressOptions> = {
  title: 'Charts/Progress Bar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Progress Bar personalizado UBITS. Se usa para mostrar progreso de tareas o procesos. Soporta 4 tamaños (xs, sm, md, lg) y dos variantes: default (un solo color) y multi-color (múltiples segmentos con diferentes colores). El segmento gris se calcula automáticamente como el resto que falta para llegar a 100%. Incluye indicador opcional de texto o porcentaje.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del progress bar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia'
}
},
    variant: {
      control: { type: 'select' },
      options: ['default', 'multi-color'],
      description: 'Variante del progress bar. Default muestra un solo color, multi-color muestra múltiples segmentos.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia'
}
},
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del progreso (0-100). Solo se usa cuando variant es "default".',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
        category: 'Comportamiento'
}
},
    indicator: {
      control: { type: 'boolean' },
      description: 'Si es true, muestra el porcentaje automáticamente. Si es string, muestra ese texto.',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: false },
        category: 'Apariencia'
}
},
    numSegments: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Número de segmentos activos (1-5). Solo se usa cuando variant es "multi-color".',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 4 },
        category: 'Comportamiento'
},
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment1Value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del segmento 1 (0-100).',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment1Color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'gray', 'info', 'error'],
      description: 'Color del segmento 1.',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment2Value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del segmento 2 (0-100).',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment2Color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'gray', 'info', 'error'],
      description: 'Color del segmento 2.',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment3Value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del segmento 3 (0-100).',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment3Color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'gray', 'info', 'error'],
      description: 'Color del segmento 3.',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment4Value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del segmento 4 (0-100).',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment4Color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'gray', 'info', 'error'],
      description: 'Color del segmento 4.',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment5Value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del segmento 5 (0-100).',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
},
    segment5Color: {
      control: { type: 'select' },
      options: ['yellow', 'green', 'gray', 'info', 'error'],
      description: 'Color del segmento 5.',
      table: { category: 'Segmentos Multi-color' },
      if: { arg: 'variant', eq: 'multi-color' }
}
}
};

export default meta;
type Story = StoryObj<ExtendedProgressOptions>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
    numSegments: 4,
    segment1Value: 30,
    segment1Color: 'info',
    segment2Value: 25,
    segment2Color: 'yellow',
    segment3Value: 20,
    segment3Color: 'green',
    segment4Value: 25,
    segment4Color: 'error',
    segment5Value: 0,
    segment5Color: 'gray'
},
  render: (args) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 600px;
      background: var(--modifiers-normal-color-light-bg-1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'Progress Bar';
    title.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-bold, 700);
    `;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Componente para mostrar el progreso de una tarea o proceso. Puede mostrar un solo valor o múltiples segmentos con diferentes colores.';
    description.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    `;

    // Contenedor para el progress bar - más pequeño y centrado
    const progressContainer = document.createElement('div');
    progressContainer.id = `progress-bar-container-${Date.now()}`;
    progressContainer.style.cssText = `
      width: 100%;
      max-width: 500px;
    `;

    let progressBarInstance: any = null;

    const createProgressBarContent = () => {
      // Limpiar completamente el contenedor primero
      progressContainer.innerHTML = '';
      
      // Limpiar instancia anterior
      if (progressBarInstance) {
        try {
          progressBarInstance.destroy();
        } catch (e) {
          // Ignorar errores de destrucción
        }
        progressBarInstance = null;
      }

      // Preparar opciones (sin containerId, vamos a insertar directamente)
      let options: ProgressOptions = {
        size: args.size || 'md',
        variant: args.variant || 'default',
        value: args.value !== undefined ? args.value : (args.variant === 'default' ? 75 : 0),
        indicator: args.indicator !== undefined ? args.indicator : false
};

      // Si es multi-color, construir segmentos desde los controles individuales
      if (args.variant === 'multi-color') {
        const numSegments = args.numSegments || 4;
        const segments: ProgressSegment[] = [];
        
        // Agregar segmentos según numSegments con valores por defecto
        if (numSegments >= 1) {
          segments.push({ 
            value: args.segment1Value !== undefined ? args.segment1Value : 30, 
            color: args.segment1Color || 'info' 
          });
        }
        if (numSegments >= 2) {
          segments.push({ 
            value: args.segment2Value !== undefined ? args.segment2Value : 25, 
            color: args.segment2Color || 'yellow' 
          });
        }
        if (numSegments >= 3) {
          segments.push({ 
            value: args.segment3Value !== undefined ? args.segment3Value : 20, 
            color: args.segment3Color || 'green' 
          });
        }
        if (numSegments >= 4) {
          segments.push({ 
            value: args.segment4Value !== undefined ? args.segment4Value : 25, 
            color: args.segment4Color || 'error' 
          });
        }
        if (numSegments >= 5) {
          segments.push({ 
            value: args.segment5Value !== undefined ? args.segment5Value : 0, 
            color: args.segment5Color || 'gray' 
          });
        }
        
        options.segments = segments;
        options.value = undefined;
      }

      // Crear progress bar directamente en el contenedor usando renderProgressBar
      try {
        const html = renderProgressBar(options);
        progressContainer.innerHTML = html;
        
        // Crear instancia simulada para mantener compatibilidad
        const progressBarElement = progressContainer.querySelector('.ubits-progress-bar') as HTMLElement;
        if (progressBarElement) {
          progressBarInstance = {
            element: progressBarElement,
            destroy: () => {
              progressContainer.innerHTML = '';
            },
            update: () => {}
          };
        }
      } catch (error) {
        // Error al crear progress bar
      }
    };

    // Crear contenido inicial
    createProgressBarContent();

    // Observar cambios en args usando un intervalo más eficiente
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    
    const startWatching = () => {
      if (checkInterval) return;
      
      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createProgressBarContent();
        }
      }, 100);
    };
    
    startWatching();

    // Limpiar al desmontar
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      progressContainer.innerHTML = '';
      if (progressBarInstance) {
        try {
          progressBarInstance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      }
    };
    
    container.addEventListener('DOMNodeRemoved', cleanup);

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(progressContainer);
    container.appendChild(wrapper);

    return container;
  }
};

// Helper para renderizar Progress Bar de manera consistente
function renderProgressBarStory(options: ProgressOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  `;
  
  const html = renderProgressBar(options);
  container.innerHTML = html;
  
  return container;
}

/**
 * SizeXS
 * Tamaño extra small (4px)
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    size: 'xs',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'xs',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar tamaño extra small (4px).',
      },
    },
  },
};

/**
 * SizeSM
 * Tamaño small (8px)
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    size: 'sm',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'sm',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar tamaño small (8px).',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño medium (16px, default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar tamaño medium (16px, valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño large (20px)
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    size: 'lg',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'lg',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar tamaño large (20px).',
      },
    },
  },
};

/**
 * VariantDefault
 * Variante default (un solo color)
 */
export const VariantDefault: Story = {
  name: 'Variant - Default',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar variante default (un solo color azul neutral).',
      },
    },
  },
};

/**
 * VariantMultiColor
 * Variante multi-color (múltiples segmentos)
 */
export const VariantMultiColor: Story = {
  name: 'Variant - Multi-Color',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 30, color: 'info' },
      { value: 25, color: 'yellow' },
      { value: 20, color: 'green' },
      { value: 25, color: 'error' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar variante multi-color (múltiples segmentos con diferentes colores).',
      },
    },
  },
};

/**
 * Value0
 * Valor 0%
 */
export const Value0: Story = {
  name: 'Value - 0%',
  args: {
    size: 'md',
    variant: 'default',
    value: 0,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: 0,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con valor 0%.',
      },
    },
  },
};

/**
 * Value25
 * Valor 25%
 */
export const Value25: Story = {
  name: 'Value - 25%',
  args: {
    size: 'md',
    variant: 'default',
    value: 25,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: 25,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con valor 25%.',
      },
    },
  },
};

/**
 * Value50
 * Valor 50%
 */
export const Value50: Story = {
  name: 'Value - 50%',
  args: {
    size: 'md',
    variant: 'default',
    value: 50,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: 50,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con valor 50%.',
      },
    },
  },
};

/**
 * Value75
 * Valor 75%
 */
export const Value75: Story = {
  name: 'Value - 75%',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: 75,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con valor 75%.',
      },
    },
  },
};

/**
 * Value100
 * Valor 100%
 */
export const Value100: Story = {
  name: 'Value - 100%',
  args: {
    size: 'md',
    variant: 'default',
    value: 100,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'default',
      value: 100,
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con valor 100%.',
      },
    },
  },
};

/**
 * WithIndicator
 * Con indicador de porcentaje
 */
export const WithIndicator: Story = {
  name: 'With Indicator',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: true,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con indicador de porcentaje visible.',
      },
    },
  },
};

/**
 * WithoutIndicator
 * Sin indicador
 */
export const WithoutIndicator: Story = {
  name: 'Without Indicator',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: false,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar sin indicador.',
      },
    },
  },
};

/**
 * CustomIndicator
 * Con indicador de texto personalizado
 */
export const CustomIndicator: Story = {
  name: 'Custom Indicator',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: '3 de 4 completados',
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: args.variant || 'default',
      value: args.value !== undefined ? args.value : 75,
      indicator: args.indicator as string,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar con indicador de texto personalizado.',
      },
    },
  },
};

/**
 * MultiColor2Segments
 * Multi-color con 2 segmentos
 */
export const MultiColor2Segments: Story = {
  name: 'Multi-Color - 2 Segments',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 60, color: 'green' },
      { value: 40, color: 'yellow' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con 2 segmentos.',
      },
    },
  },
};

/**
 * MultiColor3Segments
 * Multi-color con 3 segmentos
 */
export const MultiColor3Segments: Story = {
  name: 'Multi-Color - 3 Segments',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 40, color: 'info' },
      { value: 30, color: 'yellow' },
      { value: 30, color: 'green' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con 3 segmentos.',
      },
    },
  },
};

/**
 * MultiColor4Segments
 * Multi-color con 4 segmentos
 */
export const MultiColor4Segments: Story = {
  name: 'Multi-Color - 4 Segments',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 30, color: 'info' },
      { value: 25, color: 'yellow' },
      { value: 20, color: 'green' },
      { value: 25, color: 'error' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con 4 segmentos.',
      },
    },
  },
};

/**
 * MultiColor5Segments
 * Multi-color con 5 segmentos
 */
export const MultiColor5Segments: Story = {
  name: 'Multi-Color - 5 Segments',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 20, color: 'info' },
      { value: 20, color: 'yellow' },
      { value: 20, color: 'green' },
      { value: 20, color: 'error' },
      { value: 20, color: 'gray' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con 5 segmentos.',
      },
    },
  },
};

/**
 * MultiColorAllColors
 * Multi-color con todos los colores disponibles
 */
export const MultiColorAllColors: Story = {
  name: 'Multi-Color - All Colors',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 20, color: 'yellow' },
      { value: 20, color: 'green' },
      { value: 20, color: 'gray' },
      { value: 20, color: 'info' },
      { value: 20, color: 'error' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con todos los colores disponibles (yellow, green, gray, info, error).',
      },
    },
  },
};

/**
 * MultiColorYellow
 * Multi-color con segmento amarillo
 */
export const MultiColorYellow: Story = {
  name: 'Multi-Color - Yellow',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 50, color: 'yellow' },
      { value: 50, color: 'gray' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con segmento amarillo.',
      },
    },
  },
};

/**
 * MultiColorGreen
 * Multi-color con segmento verde
 */
export const MultiColorGreen: Story = {
  name: 'Multi-Color - Green',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 50, color: 'green' },
      { value: 50, color: 'gray' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con segmento verde.',
      },
    },
  },
};

/**
 * MultiColorGray
 * Multi-color con segmento gris
 */
export const MultiColorGray: Story = {
  name: 'Multi-Color - Gray',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 50, color: 'gray' },
      { value: 50, color: 'info' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con segmento gris.',
      },
    },
  },
};

/**
 * MultiColorInfo
 * Multi-color con segmento info (azul)
 */
export const MultiColorInfo: Story = {
  name: 'Multi-Color - Info',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 50, color: 'info' },
      { value: 50, color: 'gray' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con segmento info (azul).',
      },
    },
  },
};

/**
 * MultiColorError
 * Multi-color con segmento error (rojo)
 */
export const MultiColorError: Story = {
  name: 'Multi-Color - Error',
  args: {
    size: 'md',
    variant: 'multi-color',
    segments: [
      { value: 50, color: 'error' },
      { value: 50, color: 'gray' }
    ],
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: args.size || 'md',
      variant: 'multi-color',
      segments: args.segments || [],
      indicator: args.indicator,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar multi-color con segmento error (rojo).',
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
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const sizes: Array<ProgressOptions['size']> = ['xs', 'sm', 'md', 'lg'];
    
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
      
      const progressHTML = renderProgressBar({
        size: size,
        variant: 'default',
        value: 75,
        indicator: true,
      } as ProgressOptions);
      
      sizeContainer.innerHTML = progressHTML;
      sizeContainer.insertBefore(label, sizeContainer.firstChild);
      container.appendChild(sizeContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs: 4px, sm: 8px, md: 16px, lg: 20px).',
      },
    },
  },
};

/**
 * AllVariants
 * Todas las variantes
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const variants: Array<ProgressOptions['variant']> = ['default', 'multi-color'];
    
    variants.forEach(variant => {
      const variantContainer = document.createElement('div');
      variantContainer.style.cssText = `
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
      label.textContent = `Variant: ${variant?.charAt(0).toUpperCase() + variant?.slice(1) || 'default'}`;
      
      const progressHTML = renderProgressBar({
        size: 'md',
        variant: variant,
        value: variant === 'default' ? 75 : undefined,
        segments: variant === 'multi-color' ? [
          { value: 30, color: 'info' },
          { value: 25, color: 'yellow' },
          { value: 20, color: 'green' },
          { value: 25, color: 'error' }
        ] : undefined,
        indicator: true,
      } as ProgressOptions);
      
      variantContainer.innerHTML = progressHTML;
      variantContainer.insertBefore(label, variantContainer.firstChild);
      container.appendChild(variantContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes disponibles (default, multi-color).',
      },
    },
  },
};

/**
 * AllValues
 * Todos los valores principales (0, 25, 50, 75, 100)
 */
export const AllValues: Story = {
  name: 'All Values',
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const values = [0, 25, 50, 75, 100];
    
    values.forEach(value => {
      const valueContainer = document.createElement('div');
      valueContainer.style.cssText = `
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
      label.textContent = `Value: ${value}%`;
      
      const progressHTML = renderProgressBar({
        size: 'md',
        variant: 'default',
        value: value,
        indicator: true,
      } as ProgressOptions);
      
      valueContainer.innerHTML = progressHTML;
      valueContainer.insertBefore(label, valueContainer.firstChild);
      container.appendChild(valueContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los valores principales (0%, 25%, 50%, 75%, 100%).',
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
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: 'md',
      variant: 'default',
      value: 75,
      indicator: true,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar completo con todas las opciones habilitadas.',
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
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: false,
  },
  render: (args) => {
    const options: ProgressOptions = {
      size: 'md',
      variant: 'default',
      value: 75,
      indicator: false,
    };
    return renderProgressBarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress Bar mínimo con solo las opciones esenciales.',
      },
    },
  },
};

