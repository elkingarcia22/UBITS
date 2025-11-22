import type { Meta, StoryObj } from '@storybook/html';
import { renderNPSCard, createNPSCard } from '../../addons/nps-card/src/NPSCardProvider';
import type { NPSCardOptions, NPSCategory } from '../../addons/nps-card/src/types/NPSCardOptions';
import '../../addons/nps-card/src/styles/nps-card.css';
import '../../addons/button/src/styles/button.css';

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
  title: 'Components/NPS Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente NPSCard UBITS para mostrar métricas NPS (Net Promoter Score) con gauge semicircular. Incluye segmentos de color (rojo, amarillo, verde), aguja indicadora, categorías con porcentajes y contador de respuestas. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        defaultValue: { summary: 'Nivel de confianza' },
        type: { summary: 'string' },
      },
    },
    score: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Puntuación principal mostrada en el gauge (0-100)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    scoreLabel: {
      control: { type: 'text' },
      description: 'Etiqueta del score (ej: "Puntuación")',
      table: {
        defaultValue: { summary: 'Puntuación' },
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
      description: 'Texto para mostrar las respuestas (ej: "respuestas")',
      table: {
        defaultValue: { summary: 'respuestas' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showResponsesCount: {
      control: { type: 'boolean' },
      description: 'Mostrar el contador de respuestas',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showGauge: {
      control: { type: 'boolean' },
      description: 'Mostrar el gauge semicircular',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Mostrar las categorías',
      table: {
        defaultValue: { summary: 'true' },
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
    lowColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento rojo (0-20)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
        type: { summary: 'string' },
      },
    },
    mediumColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento amarillo (20-60)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
        type: { summary: 'string' },
      },
    },
    highColor: {
      control: { type: 'color' },
      description: 'Color del gauge para el segmento verde (60-100)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
        type: { summary: 'string' },
      },
    },
    gaugeBackgroundColor: {
      control: { type: 'color' },
      description: 'Color de fondo del gauge (token UBITS o color hexadecimal)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-3)' },
        type: { summary: 'string' },
      },
    },
    // Controles para categoría 1
    category1Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 1',
      table: {
        defaultValue: { summary: 'No tienen confianza' },
        type: { summary: 'string' },
      },
    },
    category1Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 1',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' },
      },
    },
    category1Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 1',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    category1Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 1',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
        type: { summary: 'string' },
      },
    },
    // Controles para categoría 2
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        defaultValue: { summary: 'Neutrales' },
        type: { summary: 'string' },
      },
    },
    category2Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 2',
      table: {
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
    category2Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 2',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    category2Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 2',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
        type: { summary: 'string' },
      },
    },
    // Controles para categoría 3
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        defaultValue: { summary: 'Tienen confianza' },
        type: { summary: 'string' },
      },
    },
    category3Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 3',
      table: {
        defaultValue: { summary: '30' },
        type: { summary: 'number' },
      },
    },
    category3Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 3',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    category3Color: {
      control: { type: 'color' },
      description: 'Color de la categoría 3',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
        type: { summary: 'string' },
      },
    },
  },
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
      color: args.category1Color || 'var(--modifiers-normal-color-light-feedback-accent-error)',
    });
  }
  
  if (args.category2Label !== undefined) {
    categories.push({
      label: args.category2Label || 'Neutrales',
      current: args.category2Current ?? 10,
      total: args.category2Total ?? 100,
      color: args.category2Color || 'var(--modifiers-normal-color-light-feedback-accent-warning)',
    });
  }
  
  if (args.category3Label !== undefined) {
    categories.push({
      label: args.category3Label || 'Tienen confianza',
      current: args.category3Current ?? 30,
      total: args.category3Total ?? 100,
      color: args.category3Color || 'var(--modifiers-normal-color-light-feedback-accent-success)',
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
    category3Color: '#38A169',
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
      gaugeBackgroundColor: args.gaugeBackgroundColor,
    };
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = 'var(--ubits-spacing-12)';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = `1px solid var(--modifiers-normal-color-light-border-1)`;
    container.style.borderRadius = 'var(--ubits-border-radius-sm)';
    container.style.minHeight = 'calc(var(--ubits-spacing-12) * 6.25)';
    
    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = 'calc(var(--ubits-spacing-12) * 6.25)';
    wrapper.style.width = '100%';
    
    // Renderizar card
    const cardHTML = renderNPSCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    // Logs para debugging de porcentajes
    setTimeout(() => {
      const percentageElements = container.querySelectorAll('.ubits-nps-card__category-percentage');
      console.log('🔍 [NPSCard Storybook] Debug porcentajes - Total encontrados:', percentageElements.length);
      
      Array.from(percentageElements).forEach((el, idx) => {
        const computed = window.getComputedStyle(el);
        const classes = el.className;
        const text = el.textContent;
        const parent = el.parentElement;
        const parentClasses = parent?.className || '';
        
        console.log(`\n📊 Porcentaje #${idx + 1}:`, {
          text,
          classes: classes.split(' '),
          parentClasses: parentClasses.split(' '),
          hasBoldClass: classes.includes('ubits-body-md-bold'),
          hasPercentageClass: classes.includes('ubits-nps-card__category-percentage'),
          computedStyles: {
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            fontFamily: computed.fontFamily,
            lineHeight: computed.lineHeight,
            color: computed.color
          },
          inlineStyle: el.getAttribute('style'),
          elementHTML: el.outerHTML
        });
        
        // Verificar reglas CSS aplicadas
        const allRules = Array.from(document.styleSheets).flatMap(sheet => {
          try {
            return Array.from(sheet.cssRules || []);
          } catch (e) {
            return [];
          }
        });
        
        const matchingRules = allRules.filter(rule => {
          if (rule instanceof CSSStyleRule) {
            try {
              return el.matches(rule.selectorText);
            } catch (e) {
              return false;
            }
          }
          return false;
        });
        
        console.log(`  🎯 Reglas CSS que coinciden (${matchingRules.length}):`, 
          matchingRules.map(r => ({
            selector: r.selectorText,
            fontWeight: r.style.fontWeight,
            fontSize: r.style.fontSize,
            cssText: r.cssText.substring(0, 200)
          }))
        );
      });
      
      // Verificar tokens
      const root = getComputedStyle(document.documentElement);
      console.log('\n🔍 [NPSCard Storybook] Tokens verificados:');
      console.log('  --ubits-font-weight-bold:', root.getPropertyValue('--ubits-font-weight-bold').trim() || '❌ NO DEFINIDO');
      console.log('  --modifiers-normal-body-md-bold-fontsize:', root.getPropertyValue('--modifiers-normal-body-md-bold-fontsize').trim() || '❌ NO DEFINIDO');
      console.log('  --modifiers-normal-body-md-bold-lineheight:', root.getPropertyValue('--modifiers-normal-body-md-bold-lineheight').trim() || '❌ NO DEFINIDO');
      console.log('  --font-family-noto-sans-font-family:', root.getPropertyValue('--font-family-noto-sans-font-family').trim() || '❌ NO DEFINIDO');
    }, 100);
    
    return container;
  },
};

