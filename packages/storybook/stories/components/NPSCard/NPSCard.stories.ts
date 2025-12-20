import type { Meta, StoryObj } from '@storybook/html';
import { renderNPSCard, createNPSCard } from '../../../components/nps-card/src/NPSCardProvider';
import type { NPSCardOptions, NPSCategory } from '../../../components/nps-card/src/types/NPSCardOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/nps-card/src/styles/nps-card.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<
	NPSCardOptions & {
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
	}
> = {
	title: 'Charts/NPS Card',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente NPSCard UBITS para mostrar métricas NPS (Net Promoter Score) con gauge semicircular. Incluye segmentos de color (rojo, amarillo, verde), aguja indicadora, categorías con porcentajes y contador de respuestas. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-nps-card',
			api: {
				create: 'createNPSCard', // Función importada directamente, requiere containerId
				render: 'renderNPSCard', // Función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [
					'🧩-ux-button', // Botones de información y acción
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-bg-3',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-2-medium',
				'--modifiers-normal-color-light-feedback-accent-error',
				'--modifiers-normal-color-light-feedback-accent-warning',
				'--modifiers-normal-color-light-feedback-accent-success',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-spacing-2xl',
				'--ubits-spacing-none',
				'--ubits-spacing-10',
				'--ubits-spacing-12',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
				'--weight-bold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['score', 'totalResponses', 'categories'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `createNPSCard(document.getElementById('nps-card-container'), {
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 50,
  totalResponses: 100,
  categories: [
    { label: 'Detractores', current: 20, total: 100, color: 'error' },
    { label: 'Neutros', current: 30, total: 100, color: 'warning' },
    { label: 'Promotores', current: 50, total: 100, color: 'success' }
  ],
  onInfoClick: function() {},
  onActionClick: function() {}
});`,
				basic: `createNPSCard(document.getElementById('nps-card-container'), {
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 50,
  totalResponses: 100,
  categories: [
    { label: 'Detractores', current: 20, total: 100, color: 'error' },
    { label: 'Neutros', current: 30, total: 100, color: 'warning' },
    { label: 'Promotores', current: 50, total: 100, color: 'success' }
  ]
});`,
				withButtons: `createNPSCard(document.getElementById('nps-card-container'), {
  containerId: 'nps-card-container',
  title: 'Nivel de confianza',
  score: 50,
  totalResponses: 100,
  categories: [
    { label: 'Detractores', current: 20, total: 100, color: 'error' },
    { label: 'Neutros', current: 30, total: 100, color: 'warning' },
    { label: 'Promotores', current: 50, total: 100, color: 'success' }
  ],
  showInfoButton: true,
  showActionButton: true
});`,
			},
			variants: {
				size: ['sm', 'md', 'lg'],
				showInfoButton: [true, false],
				showActionButton: [true, false],
			},
			events: {
				onInfoClick: {
					type: 'Event',
					description: 'Emitted when info button is clicked',
				},
				onActionClick: {
					type: 'Event',
					description: 'Emitted when action button is clicked',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'charts-nps-card--implementation',
				storiesByExample: {
					canonical: 'charts-nps-card--implementation',
					basic: 'charts-nps-card--default',
					withButtons: 'charts-nps-card--with-buttons',
				},
			},
			intents: {
				'metric.nps': 'canonical',
				'metric.promoter': 'canonical',
				'metric.basic': 'canonical',
				'metric.with-buttons': 'withButtons',
			},
		}),
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título del componente',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Nivel de confianza' },
				category: 'Contenido',
			},
		},
		score: {
			control: { type: 'number', min: 0, max: 100, step: 1 },
			description: 'Puntuación principal mostrada en el gauge (0-100)',
			table: {
				type: { summary: 'number (0-100)' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		scoreLabel: {
			control: { type: 'text' },
			description: 'Etiqueta del score (ej: "Puntuación")',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Puntuación' },
				category: 'Contenido',
			},
		},
		totalResponses: {
			control: { type: 'number', min: 0, step: 1 },
			description: 'Número total de respuestas',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		responsesLabel: {
			control: { type: 'text' },
			description: 'Texto para mostrar las respuestas (ej: "respuestas")',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'respuestas' },
				category: 'Contenido',
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
		showResponsesCount: {
			control: { type: 'boolean' },
			description: 'Mostrar el contador de respuestas',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Visibilidad',
			},
		},
		showGauge: {
			control: { type: 'boolean' },
			description: 'Mostrar el gauge semicircular',
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
			description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Visibilidad',
			},
		},
		lowColor: {
			control: { type: 'text' },
			description: 'Color del gauge para el segmento rojo (0-20)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
				category: 'Estilo',
			},
		},
		mediumColor: {
			control: { type: 'text' },
			description: 'Color del gauge para el segmento amarillo (20-60)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
				category: 'Estilo',
			},
		},
		highColor: {
			control: { type: 'text' },
			description: 'Color del gauge para el segmento verde (60-100)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
				category: 'Estilo',
			},
		},
		gaugeBackgroundColor: {
			control: { type: 'text' },
			description: 'Color de fondo del gauge (token UBITS)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-3)' },
				category: 'Estilo',
			},
		},
		category1Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 1',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'No tienen confianza' },
				category: 'Categorías',
			},
		},
		category1Current: {
			control: { type: 'number', min: 0, step: 1 },
			description: 'Valor actual de la categoría 1',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '50' },
				category: 'Categorías',
			},
		},
		category1Total: {
			control: { type: 'number', min: 1, step: 1 },
			description: 'Valor total de la categoría 1',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
				category: 'Categorías',
			},
		},
		category1Color: {
			control: { type: 'text' },
			description: 'Color de la categoría 1',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
				category: 'Categorías',
			},
		},
		category2Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 2',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Neutrales' },
				category: 'Categorías',
			},
		},
		category2Current: {
			control: { type: 'number', min: 0, step: 1 },
			description: 'Valor actual de la categoría 2',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '10' },
				category: 'Categorías',
			},
		},
		category2Total: {
			control: { type: 'number', min: 1, step: 1 },
			description: 'Valor total de la categoría 2',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
				category: 'Categorías',
			},
		},
		category2Color: {
			control: { type: 'text' },
			description: 'Color de la categoría 2',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
				category: 'Categorías',
			},
		},
		category3Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 3',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Tienen confianza' },
				category: 'Categorías',
			},
		},
		category3Current: {
			control: { type: 'number', min: 0, step: 1 },
			description: 'Valor actual de la categoría 3',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '30' },
				category: 'Categorías',
			},
		},
		category3Total: {
			control: { type: 'number', min: 1, step: 1 },
			description: 'Valor total de la categoría 3',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '100' },
				category: 'Categorías',
			},
		},
		category3Color: {
			control: { type: 'text' },
			description: 'Color de la categoría 3',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-feedback-accent-success)' },
				category: 'Categorías',
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
		onClick: {
			control: false,
			description: 'Handler de click en la tarjeta',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
				category: 'Eventos',
			},
		},
	},
};

export default meta;
type Story = StoryObj<
	NPSCardOptions & {
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
	}
>;

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

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
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
		lowColor: 'var(--modifiers-normal-color-light-feedback-accent-error)',
		mediumColor: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
		highColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
		gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
		category1Label: 'No tienen confianza',
		category1Current: 50,
		category1Total: 100,
		category1Color: 'var(--modifiers-normal-color-light-feedback-accent-error)',
		category2Label: 'Neutrales',
		category2Current: 10,
		category2Total: 100,
		category2Color: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
		category3Label: 'Tienen confianza',
		category3Current: 30,
		category3Total: 100,
		category3Color: 'var(--modifiers-normal-color-light-feedback-accent-success)',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createNPSCard, renderNPSCard } from '@ubits/nps-card';

// 2. Crear contenedor HTML
<div id="nps-card-container"></div>

// 3. Crear NPSCard
const npsCardElement = createNPSCard({
  containerId: 'nps-card-container', // ⚠️ REQUERIDO para createNPSCard
  title: 'Nivel de confianza',
  score: 56, // 0-100
  scoreLabel: 'Puntuación',
  totalResponses: 290,
  responsesLabel: 'respuestas',
  categories: [
    {
      label: 'No tienen confianza',
      current: 50,
      total: 100,
      color: 'var(--modifiers-normal-color-light-feedback-accent-error)'
    },
    {
      label: 'Neutrales',
      current: 10,
      total: 100,
      color: 'var(--modifiers-normal-color-light-feedback-accent-warning)'
    },
    {
      label: 'Tienen confianza',
      current: 30,
      total: 100,
      color: 'var(--modifiers-normal-color-light-feedback-accent-success)'
    }
  ],
  size: 'md', // 'sm' | 'md' | 'lg'
  showTitle: true,
  showResponsesCount: true,
  showGauge: true, // Gauge semicircular con aguja indicadora
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  lowColor: 'var(--modifiers-normal-color-light-feedback-accent-error)', // Segmento rojo (0-20)
  mediumColor: 'var(--modifiers-normal-color-light-feedback-accent-warning)', // Segmento amarillo (20-60)
  highColor: 'var(--modifiers-normal-color-light-feedback-accent-success)', // Segmento verde (60-100)
  gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
  onClick: (event) => {
    console.log('Card clickeada');
  }
});

// Nota: createNPSCard retorna HTMLElement | null
// Requiere containerId y el contenedor debe existir en el DOM

// Alternativa: Usar renderNPSCard para obtener HTML string
const npsCardHTML = renderNPSCard({
  title: 'Nivel de confianza',
  score: 56,
  scoreLabel: 'Puntuación',
  totalResponses: 290,
  responsesLabel: 'respuestas',
  categories: [
    { label: 'No tienen confianza', current: 50, total: 100, color: 'var(--modifiers-normal-color-light-feedback-accent-error)' },
    { label: 'Neutrales', current: 10, total: 100, color: 'var(--modifiers-normal-color-light-feedback-accent-warning)' },
    { label: 'Tienen confianza', current: 30, total: 100, color: 'var(--modifiers-normal-color-light-feedback-accent-success)' }
  ],
  size: 'md',
  showTitle: true,
  showResponsesCount: true,
  showGauge: true,
  showCategories: true
});

// Insertar HTML
const container = document.getElementById('nps-card-container');
if (container) {
  container.innerHTML = npsCardHTML;
  
  // Agregar event listener manualmente si es necesario
  const cardElement = container.querySelector('.ubits-nps-card');
  if (cardElement && onClick) {
    cardElement.addEventListener('click', onClick);
  }
}`,
			},
		},
	},
	render: (args) => {
		// Construir las categorías desde los args
		const categories = buildCategories(args);

		// Construir las opciones del componente
		const options: NPSCardOptions = {
			title: args.title || 'Nivel de confianza',
			score: args.score ?? 0,
			scoreLabel: args.scoreLabel || 'Puntuación',
			totalResponses: args.totalResponses ?? 0,
			responsesLabel: args.responsesLabel || 'respuestas',
			categories,
			size: args.size || 'md',
			showTitle: args.showTitle !== undefined ? args.showTitle : true,
			showResponsesCount: args.showResponsesCount !== undefined ? args.showResponsesCount : true,
			showGauge: args.showGauge !== undefined ? args.showGauge : true,
			showCategories: args.showCategories !== undefined ? args.showCategories : true,
			showInfoIcon: args.showInfoIcon !== undefined ? args.showInfoIcon : false,
			showActionButton: args.showActionButton !== undefined ? args.showActionButton : false,
			lowColor: args.lowColor || 'var(--modifiers-normal-color-light-feedback-accent-error)',
			mediumColor: args.mediumColor || 'var(--modifiers-normal-color-light-feedback-accent-warning)',
			highColor: args.highColor || 'var(--modifiers-normal-color-light-feedback-accent-success)',
			gaugeBackgroundColor: args.gaugeBackgroundColor || 'var(--modifiers-normal-color-light-bg-3)',
			className: args.className,
			attributes: args.attributes,
			onClick: args.onClick,
		};

		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-nps-card');
		container.setAttribute('data-ubits-component', 'NPSCard');
		container.style.cssText = `
      width: 100%;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-2);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto; padding: 24px;';

		// Crear contenedor para la card
		const cardContainer = document.createElement('div');
		const containerId = `nps-card-container-${Date.now()}`;
		cardContainer.id = containerId;
		
		// Agregar el contenedor al wrapper primero
		wrapper.appendChild(cardContainer);

		// Función para crear el card
		const createCard = () => {
			try {
				const cardElement = createNPSCard({
					containerId: containerId,
					...options,
				});

				if (!cardElement) {
					// Fallback: usar renderNPSCard
					const cardHTML = renderNPSCard(options);
					cardContainer.innerHTML = cardHTML;
				}
			} catch (error) {
				console.error('Error creando NPSCard:', error);
				// Fallback: usar renderNPSCard
				const cardHTML = renderNPSCard(options);
				cardContainer.innerHTML = cardHTML;
			}
		};

		// Crear card usando createNPSCard
		// Asegurar que el contenedor esté en el DOM antes de crear el card
		// Usar requestAnimationFrame para asegurar que el DOM esté listo
		requestAnimationFrame(() => {
			// Verificar que el contenedor esté en el DOM
			const containerInDOM = document.getElementById(containerId);
			if (!containerInDOM) {
				console.warn(`⚠️ [NPSCard] Contenedor ${containerId} no encontrado en DOM, reintentando...`);
				// Reintentar después de un pequeño delay
				setTimeout(() => {
					createCard();
				}, 50);
				return;
			}
			createCard();
		});

		container.appendChild(wrapper);
		return container;
	},
};

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
		lowColor: 'var(--modifiers-normal-color-light-feedback-accent-error)',
		mediumColor: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
		highColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
		gaugeBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
		category1Label: 'No tienen confianza',
		category1Current: 50,
		category1Total: 100,
		category1Color: 'var(--modifiers-normal-color-light-feedback-accent-error)',
		category2Label: 'Neutrales',
		category2Current: 10,
		category2Total: 100,
		category2Color: 'var(--modifiers-normal-color-light-feedback-accent-warning)',
		category3Label: 'Tienen confianza',
		category3Current: 30,
		category3Total: 100,
		category3Color: 'var(--modifiers-normal-color-light-feedback-accent-success)',
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
		container.style.cssText =
			'width: 100%; padding: 24px; background: var(--modifiers-normal-color-light-bg-2); border: 1px solid var(--modifiers-normal-color-light-border-1);';

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto; padding: 24px;';

		// Renderizar card
		const cardHTML = renderNPSCard(options);
		wrapper.innerHTML = cardHTML;
		container.appendChild(wrapper);

		return container;
	},
};
