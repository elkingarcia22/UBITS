/**
 * List Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createList, renderList } from '../../../components/list/src/ListProvider';
import type { ListOptions, ListItem } from '../../../components/list/src/types/ListOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/list/src/styles/list.css';
import '../../../components/scroll/src/styles/scroll.css';

const meta: Meta<ListOptions> = {
	title: 'Data/List',
	tags: ['autodocs'],
	parameters: {
		docs: {
			codePanel: true,
			description: {
				component:
					'Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-list',
			api: {
				create: 'window.UBITS.List.create',
				tag: '<ubits-list>',
			},
			dependsOn: {
				required: [], // List no requiere otros componentes
				optional: ['⚙️-functional-scroll'], // Scrollbar es opcional
			},
			internals: ['⚙️-functional-scroll'], // Scrollbar interno
			slots: {}, // List no tiene slots públicos
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['containerId', 'items'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: "window.UBITS.List.create(document.getElementById('list-container'), {\n  containerId: 'list-container',\n  items: [\n    { label: 'Item 1', state: 'default' },\n    { label: 'Item 2', state: 'active' }\n  ],\n  size: 'md',\n  onItemClick: (itemId) => {}\n});",
				basic: "window.UBITS.List.create(document.getElementById('list-container'), {\n  containerId: 'list-container',\n  items: [\n    { label: 'Item 1', state: 'default' },\n    { label: 'Item 2', state: 'active' }\n  ],\n  size: 'md'\n});",
				multiple: "window.UBITS.List.create(document.getElementById('list-container'), {\n  containerId: 'list-container',\n  items: [\n    { label: 'Item 1', state: 'default' },\n    { label: 'Item 2', state: 'active' }\n  ],\n  size: 'md',\n  multiple: true\n});",
				withMaxHeight: "window.UBITS.List.create(document.getElementById('list-container'), {\n  containerId: 'list-container',\n  items: [\n    { label: 'Item 1', state: 'default' },\n    { label: 'Item 2', state: 'active' }\n  ],\n  size: 'md',\n  maxHeight: '400px'\n});",
			},
			variants: {
				size: ['xs', 'sm', 'md', 'lg'],
				multiple: [true, false],
			},
			events: {
				onItemClick: {
					type: 'Event',
					description: 'Emitted when a list item is clicked',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'data-list--implementation',
				storiesByExample: {
					canonical: 'data-list--implementation',
					basic: 'data-list--default',
					multiple: 'data-list--multiple',
					withMaxHeight: 'data-list--with-max-height',
				},
			},
			intents: {
				'list.items': 'canonical',
				'list.selection': 'canonical',
				'list.basic': 'canonical',
				'list.multiple': 'multiple',
				'list.scrollable': 'withMaxHeight',
			},
		}),
	},
	args: {
		containerId: 'list-storybook-container',
		items: [
			{ label: 'Item 1', state: 'default' },
			{ label: 'Item 2', state: 'active' },
			{ label: 'Item 3', state: 'disabled' },
			{ label: 'Item 4', state: 'default' },
		],
		size: 'md',
		maxHeight: '400px',
		multiple: false,
		className: '',
	},
	argTypes: {
		containerId: {
			control: { type: 'text' },
			description: 'ID del contenedor donde se renderizará la lista (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		items: {
			control: { type: 'object' },
			description: 'Array de items de la lista (requerido).',
			table: {
				type: { summary: 'ListItem[]' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño de los items de la lista',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		maxHeight: {
			control: { type: 'text' },
			description: 'Altura máxima de la lista (para scroll)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '400px' },
				category: 'Apariencia',
			},
		},
		showScrollbar: {
			control: { type: 'boolean' },
			description: 'Mostrar scrollbar UBITS personalizado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		multiple: {
			control: { type: 'boolean' },
			description: 'Si la lista permite selección múltiple',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		onSelectionChange: {
			action: 'selection-changed',
			description: 'Callback cuando cambia la selección',
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
type Story = StoryObj<ListOptions>;

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
		containerId: 'list-implementation-container',
		items: [
			{ label: 'Opción 1', state: 'default', value: 'option1' },
			{ label: 'Opción 2', state: 'active', value: 'option2' },
			{ label: 'Opción 3', state: 'default', value: 'option3' },
			{ label: 'Opción 4', state: 'default', value: 'option4' },
			{ label: 'Opción 5', state: 'default', value: 'option5' },
			{ label: 'Opción 6', state: 'default', value: 'option6' },
			{ label: 'Opción 7', state: 'default', value: 'option7' },
			{ label: 'Opción 8', state: 'default', value: 'option8' },
			{ label: 'Opción 9', state: 'default', value: 'option9' },
			{ label: 'Opción 10', state: 'default', value: 'option10' },
		],
		size: 'md',
		maxHeight: '200px',
		showScrollbar: false,
		multiple: false,
		className: '',
	},
	parameters: {
		docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="list-implementation-container"></div>

// 2. Crear lista
window.UBITS.List.create({
  containerId: 'list-implementation-container',
  items: [
    { label: 'Opción 1', state: 'default', value: 'option1' },
    { label: 'Opción 2', state: 'active', value: 'option2' },
    { label: 'Opción 3', state: 'default', value: 'option3' },
    { label: 'Opción 4', state: 'default', value: 'option4' },
    { label: 'Opción 5', state: 'default', value: 'option5' },
    { label: 'Opción 6', state: 'default', value: 'option6' },
    { label: 'Opción 7', state: 'default', value: 'option7' },
    { label: 'Opción 8', state: 'default', value: 'option8' },
    { label: 'Opción 9', state: 'default', value: 'option9' },
    { label: 'Opción 10', state: 'default', value: 'option10' }
  ],
  size: 'md',
  maxHeight: '200px',
  showScrollbar: false,
  multiple: false
});`,
      },
    },
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-list');
		container.setAttribute('data-ubits-component', 'List');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '400px';

		// Crear contenedor para la lista
		const listContainer = document.createElement('div');
		listContainer.id = args.containerId;
		listContainer.style.width = '100%';
		container.appendChild(listContainer);

		// Crear lista después de que el contenedor esté en el DOM
		const createListInstance = () => {
			const containerElement = document.getElementById(listContainer.id);
			if (!containerElement) {
				console.error(`Container with ID "${listContainer.id}" not found`);
				return;
			}

			try {
				createList(args);
			} catch (error) {
				console.error('Error creating list:', error);
			}
		};

		// Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				createListInstance();
			});
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		containerId: 'list-storybook-container',
		items: [
			{ label: 'Item 1', state: 'default' },
			{ label: 'Item 2', state: 'active' },
			{ label: 'Item 3', state: 'disabled' },
			{ label: 'Item 4', state: 'default' },
			{ label: 'Item 5', state: 'default' },
			{ label: 'Item 6', state: 'default' },
			{ label: 'Item 7', state: 'default' },
			{ label: 'Item 8', state: 'default' },
			{ label: 'Item 9', state: 'default' },
			{ label: 'Item 10', state: 'default' },
			{ label: 'Item 11', state: 'default' },
			{ label: 'Item 12', state: 'default' },
		],
		size: 'md',
		maxHeight: '200px',
		showScrollbar: false,
		multiple: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '400px';

		const listContainer = document.createElement('div');
		listContainer.id = args.containerId;
		listContainer.style.width = '100%';
		container.appendChild(listContainer);

		// Crear lista después de que el contenedor esté en el DOM
		const createListInstance = () => {
			const containerElement = document.getElementById(listContainer.id);
			if (!containerElement) {
				console.error(`Container with ID "${listContainer.id}" not found`);
				return;
			}

			try {
				createList(args);
			} catch (error) {
				console.error('Error creating list:', error);
			}
		};

		// Usar requestAnimationFrame para asegurar que el contenedor esté en el DOM
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				createListInstance();
			});
		});

		return container;
	},
};
