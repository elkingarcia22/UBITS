/**
 * StatusTag Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
	renderStatusTag,
	createStatusTag,
} from '../../../components/status-tag/src/StatusTagProvider';
import type { StatusTagOptions } from '../../../components/status-tag/src/types/StatusTagOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/status-tag/src/styles/status-tag.css';

const meta: Meta<StatusTagOptions> = {
	title: 'Básicos/Status Tag',
	tags: ['autodocs'],
	parameters: {
		docs: {
			codePanel: true,
			description: {
				component:
					'Componente Status Tag UBITS para mostrar estados con icono izquierdo opcional, texto y icono derecho opcional. Múltiples estados con colores diferenciados usando tokens UBITS.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-status-tag',
			api: {
				create: 'window.UBITS.StatusTag.create',
				tag: '<ubits-status-tag>',
			},
			dependsOn: {
				required: [], // StatusTag no requiere otros componentes
				optional: ['🧩-ux-icon'], // Iconos son opcionales
			},
			internals: [], // StatusTag no tiene componentes internos privados
			slots: {}, // StatusTag no tiene slots públicos
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['label'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `window.UBITS.StatusTag.create({
  label: 'Completado',
  size: 'md',
  status: 'completed',
  onClick: () => {}
});`,
				basic: `window.UBITS.StatusTag.create({
  label: 'Completado',
  size: 'md',
  status: 'completed'
});`,
				withLeftIcon: `window.UBITS.StatusTag.create({
  label: 'En progreso',
  size: 'md',
  status: 'in-progress',
  leftIcon: 'spinner'
});`,
				withRightIcon: `window.UBITS.StatusTag.create({
  label: 'Pendiente',
  size: 'md',
  status: 'pending',
  rightIcon: 'clock'
});`,
				clickable: `window.UBITS.StatusTag.create({
  label: 'Activo',
  size: 'md',
  status: 'active',
  clickable: true,
  onClick: () => {}
});`,
			},
			variants: {
				size: ['xs', 'sm', 'md'],
				status: [
					'completed',
					'published',
					'fulfilled',
					'created',
					'active',
					'not-fulfilled',
					'denied',
					'draft',
					'in-progress',
					'syncing',
					'pending',
					'pending-approval',
					'not-started',
					'finished',
					'archived',
					'disabled',
					'paused',
				],
				clickable: [true, false],
			},
			events: {
				onClick: {
					type: 'MouseEvent',
					description: 'Emitted when status tag is clicked (only if clickable is true)',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'basicos-status-tag--implementation',
				storiesByExample: {
					canonical: 'basicos-status-tag--implementation',
					basic: 'basicos-status-tag--default',
					withLeftIcon: 'basicos-status-tag--with-left-icon',
					withRightIcon: 'basicos-status-tag--with-right-icon',
					clickable: 'basicos-status-tag--clickable',
				},
			},
			intents: {
				'statustag.status': 'canonical',
				'statustag.label': 'canonical',
				'statustag.basic': 'canonical',
				'statustag.with-icon': 'withLeftIcon',
				'statustag.clickable': 'clickable',
			},
		}),
	},
	args: {
		label: 'Completado',
		size: 'md',
		status: 'completed',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		className: '',
	},
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Texto del estado (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md'],
			description: 'Tamaño del tag (XS: body-xs 11px, SM: body-sm 13px, MD: body-md 16px)',
			table: {
				type: { summary: 'xs | sm | md' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		status: {
			control: { type: 'select' },
			options: [
				'completed',
				'published',
				'fulfilled',
				'created',
				'active',
				'not-fulfilled',
				'denied',
				'draft',
				'in-progress',
				'syncing',
				'pending',
				'pending-approval',
				'not-started',
				'finished',
				'archived',
				'disabled',
				'paused',
				'hidden',
			],
			description: 'Estado/variante del tag (determina el color según Figma)',
			table: {
				type: {
					summary:
						'completed | published | fulfilled | created | active | not-fulfilled | denied | draft | in-progress | syncing | pending | pending-approval | not-started | finished | archived | disabled | paused | hidden',
				},
				defaultValue: { summary: 'completed' },
				category: 'Estado',
			},
		},
		leftIcon: {
			control: { type: 'text' },
			description: 'Icono FontAwesome izquierdo (ej: "grid-2"). Dejar vacío para ocultar.',
			table: {
				type: { summary: 'string | null' },
				category: 'Iconos',
			},
		},
		rightIcon: {
			control: { type: 'text' },
			description: 'Icono FontAwesome derecho (ej: "chevron-down"). Dejar vacío para ocultar.',
			table: {
				type: { summary: 'string | null' },
				category: 'Iconos',
			},
		},
		clickable: {
			control: { type: 'boolean' },
			description: 'Si el tag es clickeable (añade estilos hover/active y cursor pointer)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Función a ejecutar cuando se hace clic (solo si clickable es true)',
			table: {
				disable: true,
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
				category: 'Avanzado',
			},
		},
	},
};

export default meta;
type Story = StoryObj<StatusTagOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		label: 'Completado',
		size: 'md',
		status: 'completed',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		className: '',
	},
	parameters: {
		docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// Opción 1: Usar createStatusTag (retorna elemento)
const statusTagElement = window.UBITS.StatusTag.create({
  label: 'Completado',
  size: 'md',
  status: 'completed',
  clickable: false
});
document.getElementById('container').appendChild(statusTagElement);

// Opción 2: Usar renderStatusTag (retorna HTML string)
const statusTagHTML = window.UBITS.StatusTag.render({
  label: 'Completado',
  size: 'md',
  status: 'completed',
  clickable: false
});
document.getElementById('container').innerHTML = statusTagHTML;`,
      },
    },
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-status-tag');
		container.setAttribute('data-ubits-component', 'StatusTag');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		// Crear status tag
		const statusTagElement = createStatusTag(args);
		container.appendChild(statusTagElement);

		// Agregar event listener si hay onClick
		if (args.onClick && statusTagElement) {
			statusTagElement.addEventListener('click', args.onClick);
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		label: 'Completado',
		size: 'md',
		status: 'completed',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		const statusTagElement = createStatusTag(args);
		container.appendChild(statusTagElement);

		if (args.onClick && statusTagElement) {
			statusTagElement.addEventListener('click', args.onClick);
		}

		return container;
	},
};
