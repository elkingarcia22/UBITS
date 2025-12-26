import type { Meta, StoryObj } from '@storybook/html';
import {
	renderMetricCard,
	createMetricCard,
} from '../../../components/metric-card/src/MetricCardProvider';
import type { MetricCardOptions } from '../../../components/metric-card/src/types/MetricCardOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/metric-card/src/styles/metric-card.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<MetricCardOptions> = {
	title: 'Charts/Text Metric Card',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente MetricCard UBITS para mostrar métricas numéricas. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, tamaños y es completamente personalizable.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-metric-card',
			api: {
				create: 'createMetricCard', // Función importada directamente
				render: 'renderMetricCard', // Función importada directamente
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
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-border-2',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-spacing-6',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
				'--weight-regular',
				'--weight-semibold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['title', 'value', 'label'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `createMetricCard({
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores'
});`,
				basic: `createMetricCard({
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores'
});`,
				withIcon: `createMetricCard({
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores',
  titleIcon: 'chart-line',
  titleIconStyle: 'regular'
});`,
				withButtons: `createMetricCard({
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores',
  showInfoButton: true,
  showActionButton: true,
  actionButtonLabel: 'Ver detalles'
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
				canonicalStoryId: 'charts-text-metric-card--implementation',
				storiesByExample: {
					canonical: 'charts-text-metric-card--implementation',
					basic: 'charts-text-metric-card--default',
					withIcon: 'charts-text-metric-card--with-icon',
					withButtons: 'charts-text-metric-card--with-buttons',
				},
			},
			intents: {
				'metric.text': 'canonical',
				'metric.card': 'canonical',
				'metric.basic': 'canonical',
				'metric.with-icon': 'withIcon',
				'metric.with-buttons': 'withButtons',
			},
		}),
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título de la métrica',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Net confidence score' },
				category: 'Contenido',
			},
		},
		value: {
			control: { type: 'text' },
			description: 'Valor principal (puede ser número o string, ej: "200 / 204")',
			table: {
				type: { summary: 'string | number' },
				defaultValue: { summary: '200 / 204' },
				category: 'Contenido',
			},
		},
		label: {
			control: { type: 'text' },
			description: 'Texto descriptivo debajo del valor',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Colaboradores' },
				category: 'Contenido',
			},
		},
		titleIcon: {
			control: { type: 'text' },
			description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
			table: {
				type: { summary: 'string' },
				example: { summary: 'user, users, chart-line, etc.' },
				category: 'Contenido',
			},
		},
		titleIconStyle: {
			control: { type: 'select' },
			options: ['regular', 'solid'],
			description: 'Estilo del icono del título',
			table: {
				type: { summary: 'regular | solid' },
				defaultValue: { summary: 'regular' },
				category: 'Contenido',
			},
		},
		titleIconColor: {
			control: { type: 'text' },
			description:
				'Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		showInfoIcon: {
			control: { type: 'boolean' },
			description: 'Mostrar icono de información junto al título',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		showActionButton: {
			control: { type: 'boolean' },
			description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Tamaño de la tarjeta',
			table: {
				type: { summary: 'sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
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
type Story = StoryObj<MetricCardOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		title: 'Net confidence score',
		value: '200 / 204',
		label: 'Colaboradores',
		titleIcon: 'user',
		titleIconStyle: 'regular',
		showInfoIcon: true,
		showActionButton: true,
		size: 'md',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createMetricCard, renderMetricCard } from '@ubits/metric-card';

// 2. Crear contenedor HTML
<div id="metric-card-container"></div>

// 3. Crear MetricCard
const metricCardElement = createMetricCard({
  containerId: 'metric-card-container', // ⚠️ REQUERIDO para createMetricCard
  title: 'Net confidence score',
  value: '200 / 204', // Puede ser número o string
  label: 'Colaboradores',
  titleIcon: 'user', // Nombre FontAwesome sin prefijo fa-
  titleIconStyle: 'regular', // 'regular' | 'solid'
  titleIconColor: 'var(--modifiers-normal-color-light-fg-2-medium)', // Opcional, token UBITS
  showInfoIcon: true, // Mostrar icono de información
  showActionButton: true, // Mostrar botón de acción
  size: 'md', // 'sm' | 'md' | 'lg'
  onClick: (event) => {
    console.log('Card clickeada');
  }
});

// Nota: createMetricCard retorna HTMLElement | null
// Requiere containerId y el contenedor debe existir en el DOM

// Alternativa: Usar renderMetricCard para obtener HTML string
const metricCardHTML = renderMetricCard({
  title: 'Net confidence score',
  value: '200 / 204',
  label: 'Colaboradores',
  titleIcon: 'user',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md'
});

// Insertar HTML
const container = document.getElementById('metric-card-container');
if (container) {
  container.innerHTML = metricCardHTML;
  
  // Agregar event listener manualmente si es necesario
  const cardElement = container.querySelector('.ubits-metric-card');
  if (cardElement && onClick) {
    cardElement.addEventListener('click', onClick);
  }
}`,
			},
		},
	},
	render: (args) => {
		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-metric-card');
		container.setAttribute('data-ubits-component', 'MetricCard');
		container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background: var(--modifiers-normal-color-light-bg-2);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      min-height: 200px;
      padding: 24px;
    `;

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		wrapper.style.width = '100%';
		wrapper.style.maxWidth = '400px';
		wrapper.style.margin = '0 auto';

		// Crear contenedor para la card
		const cardContainer = document.createElement('div');
		const containerId = `metric-card-container-${Date.now()}`;
		cardContainer.id = containerId;
		
		// Agregar el contenedor al wrapper primero
		wrapper.appendChild(cardContainer);

		// Función para crear el card
		const createCard = () => {
			try {
				const cardElement = createMetricCard({
					containerId: containerId,
					...args,
				});

				if (!cardElement) {
					// Fallback: usar renderMetricCard
					const cardHTML = renderMetricCard(args);
					cardContainer.innerHTML = cardHTML;
				}
			} catch (error) {
				console.error('Error creando MetricCard:', error);
				// Fallback: usar renderMetricCard
				const cardHTML = renderMetricCard(args);
				cardContainer.innerHTML = cardHTML;
			}
		};

		// Crear card usando createMetricCard
		// Asegurar que el contenedor esté en el DOM antes de crear el card
		// Usar requestAnimationFrame para asegurar que el DOM esté listo
		requestAnimationFrame(() => {
			// Verificar que el contenedor esté en el DOM
			const containerInDOM = document.getElementById(containerId);
			if (!containerInDOM) {
				console.warn(`⚠️ [MetricCard] Contenedor ${containerId} no encontrado en DOM, reintentando...`);
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
		title: 'Net confidence score',
		value: '200 / 204',
		label: 'Colaboradores',
		titleIcon: 'user',
		titleIconStyle: 'regular',
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
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.border = `1px solid var(--modifiers-normal-color-light-border-1)`;
		container.style.minHeight = '200px';
		container.style.padding = '24px';

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		wrapper.style.width = '100%';
		wrapper.style.maxWidth = '400px';
		wrapper.style.margin = '0 auto';

		// Renderizar card
		const cardHTML = renderMetricCard(args);
		wrapper.innerHTML = cardHTML;
		container.appendChild(wrapper);

		return container;
	},
};

