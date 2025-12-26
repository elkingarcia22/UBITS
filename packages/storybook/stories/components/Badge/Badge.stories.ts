/**
 * Badge Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderBadge, createBadge } from '../../../components/badge/src/BadgeProvider';
import type { BadgeOptions } from '../../../components/badge/src/types/BadgeOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/badge/src/styles/badge.css';

const meta: Meta<BadgeOptions> = {
	title: 'Básicos/Badge',
	tags: ['autodocs'],
	parameters: {
		docs: {
			codePanel: true,
			description: {
				component:
					'Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-badge',
			api: {
				create: 'window.UBITS.Badge.create',
				tag: '<ubits-badge>',
			},
			dependsOn: {
				required: [], // Badge no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [], // Badge no tiene componentes internos privados
			slots: {}, // Badge no tiene slots públicos
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: [],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: 'window.UBITS.Badge.create({\n  type: \'number\',\n  variant: \'error\',\n  style: \'light\',\n  size: \'md\',\n  content: \'5\'\n});',
				basic: 'window.UBITS.Badge.create({\n  type: \'number\',\n  variant: \'error\',\n  style: \'light\',\n  size: \'md\',\n  content: \'5\'\n});',
				dot: `window.UBITS.Badge.create({
  type: 'dot',
  variant: 'error',
  style: 'light',
  size: 'md'
});`,
				withLabel: 'window.UBITS.Badge.create({\n  type: \'number\',\n  variant: \'error\',\n  style: \'light\',\n  size: \'md\',\n  content: \'5\',\n  showLabel: true,\n  label: \'Nuevos\'\n});',
				absolute: `window.UBITS.Badge.create({
  type: 'number',
  variant: 'error',
  style: 'light',
  size: 'md',
  content: '5',
  absolute: true,
  position: 'top-right'
});`,
			},
			variants: {
				type: ['dot', 'number'],
				variant: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
				style: ['light', 'neutral', 'bold'],
				size: ['xs', 'sm', 'md', 'lg'],
				position: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
			},
			events: {
				// Badge no emite eventos, es un componente de solo visualización
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'basicos-badge--implementation',
				storiesByExample: {
					canonical: 'basicos-badge--implementation',
					basic: 'basicos-badge--default',
					dot: 'basicos-badge--dot',
					withLabel: 'basicos-badge--with-label',
					absolute: 'basicos-badge--absolute',
				},
			},
			intents: {
				'badge.notification': 'canonical',
				'badge.counter': 'canonical',
				'badge.number': 'canonical',
				'badge.dot': 'dot',
				'badge.absolute': 'absolute',
				'badge.with-label': 'withLabel',
			},
		}),
	},
	args: {
		type: 'number',
		variant: 'error',
		style: 'light',
		size: 'md',
		content: '5',
		absolute: false,
		position: 'top-right',
		showLabel: false,
		label: undefined,
		className: '',
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['dot', 'number'],
			description: 'Tipo de badge: solo bolita o con número',
			table: {
				type: { summary: 'dot | number' },
				defaultValue: { summary: 'number' },
				category: 'Apariencia',
			},
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
			description: 'Variante de color del badge',
			table: {
				type: { summary: 'primary | secondary | success | warning | error | info' },
				defaultValue: { summary: 'error' },
				category: 'Apariencia',
			},
		},
		style: {
			control: { type: 'select' },
			options: ['light', 'neutral', 'bold'],
			description: 'Estilo del badge: light (sin borde), neutral (con borde gris) o bold (fondo de color)',
			table: {
				type: { summary: 'light | neutral | bold' },
				defaultValue: { summary: 'light' },
				category: 'Apariencia',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del badge',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		content: {
			control: { type: 'text' },
			description: 'Contenido del badge (número o texto, solo para tipo number)',
			table: {
				type: { summary: 'string | number | null' },
				category: 'Contenido',
			},
		},
		absolute: {
			control: { type: 'boolean' },
			description: 'Usar posición absoluta',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Posicionamiento',
			},
		},
		position: {
			control: { type: 'select' },
			options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
			description: 'Posición cuando es absoluto',
			table: {
				type: { summary: 'top-right | top-left | bottom-right | bottom-left' },
				defaultValue: { summary: 'top-right' },
				category: 'Posicionamiento',
			},
		},
		showLabel: {
			control: { type: 'boolean' },
			description: 'Mostrar u ocultar el label',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Contenido',
			},
		},
		label: {
			control: { type: 'text' },
			description: 'Texto del label que aparece a la derecha del badge',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
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
type Story = StoryObj<BadgeOptions>;

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
		type: 'number',
		variant: 'error',
		style: 'light',
		size: 'md',
		content: '5',
		absolute: false,
		position: 'top-right',
		showLabel: false,
		label: undefined,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				
				type: 'code',
				state: 'open',
				code: `// Opción 1: Usar createBadge (retorna elemento)
const badgeElement = window.UBITS.Badge.create({
  type: 'number',
  variant: 'error',
  style: 'light',
  size: 'md',
  content: '5',
  absolute: false,
  position: 'top-right'
});
document.getElementById('container').appendChild(badgeElement);

// Opción 2: Usar renderBadge (retorna HTML string)
const badgeHTML = window.UBITS.Badge.render({
  type: 'number',
  variant: 'error',
  style: 'light',
  size: 'md',
  content: '5'
});
document.getElementById('container').innerHTML = badgeHTML;`,
			},
		},
	},
	render: (args) => {
		console.log('🔵 [Badge Implementation] Render iniciado', {
			args: JSON.stringify(args),
			label: args.label,
			showLabel: args.showLabel,
			labelType: typeof args.label,
			labelValue: args.label,
			labelTruthy: !!args.label
		});

		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-badge');
		container.setAttribute('data-ubits-component', 'Badge');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';
		container.style.position = 'relative';

		// Crear badge
		const badgeElement = createBadge(args);
		container.appendChild(badgeElement);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		type: 'number',
		variant: 'error',
		style: 'light',
		size: 'md',
		content: '5',
		absolute: false,
		position: 'top-right',
		showLabel: false,
		label: undefined,
		className: '',
	},
	render: (args) => {
		console.log('🔵 [Badge Default] Render iniciado', {
			args: JSON.stringify(args),
			label: args.label,
			showLabel: args.showLabel,
			labelType: typeof args.label,
			labelValue: args.label,
			labelTruthy: !!args.label,
			allArgsKeys: Object.keys(args)
		});

		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';
		container.style.position = 'relative';

		const badgeElement = createBadge(args);
		container.appendChild(badgeElement);

		return container;
	},
};
