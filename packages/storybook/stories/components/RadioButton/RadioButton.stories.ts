/**
 * RadioButton Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
	renderRadioButton,
	createRadioButton,
} from '../../../components/radio-button/src/RadioButtonProvider';
import type { RadioButtonOptions } from '../../../components/radio-button/src/types/RadioButtonOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/radio-button/src/styles/radio-button.css';

const meta: Meta<RadioButtonOptions> = {
	title: 'Formularios/Radio Button',
	tags: ['autodocs'],
	parameters: {
		docs: {
			codePanel: true,
			description: {
				component:
					'Componente Radio Button UBITS para selección única en grupos. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-radio-button',
			api: {
				create: 'window.UBITS.RadioButton.create',
				tag: '<ubits-radio-button>',
			},
			dependsOn: {
				required: [], // RadioButton no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [], // RadioButton no tiene componentes internos privados
			slots: {}, // RadioButton no tiene slots públicos
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
				'--p-spacing-mode-1-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['label', 'value', 'name'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `window.UBITS.RadioButton.create({
  label: 'Label',
  value: 'option1',
  name: 'group',
  checked: false,
  size: 'md',
  state: 'default',
  onChange: () => {}
});`,
				basic: `window.UBITS.RadioButton.create({
  label: 'Label',
  value: 'option1',
  name: 'group',
  checked: false,
  size: 'md',
  state: 'default'
});`,
				checked: `window.UBITS.RadioButton.create({
  label: 'Label',
  value: 'option1',
  name: 'group',
  checked: true,
  size: 'md',
  state: 'default'
});`,
				withComplementaryText: `window.UBITS.RadioButton.create({
  label: 'Label',
  value: 'option1',
  name: 'group',
  complementaryText: 'Texto complementario',
  checked: false,
  size: 'md'
});`,
				disabled: `window.UBITS.RadioButton.create({
  label: 'Label',
  value: 'option1',
  name: 'group',
  checked: false,
  disabled: true,
  size: 'md'
});`,
			},
			variants: {
				size: ['sm', 'md'],
				state: ['default', 'hover', 'focus', 'active', 'disabled'],
				checked: [true, false],
				disabled: [true, false],
			},
			events: {
				onChange: {
					type: 'Event',
					description: 'Emitted when radio button value changes',
				},
				onClick: {
					type: 'MouseEvent',
					description: 'Emitted when radio button is clicked',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'formularios-radio-button--implementation',
				storiesByExample: {
					canonical: 'formularios-radio-button--implementation',
					basic: 'formularios-radio-button--default',
					checked: 'formularios-radio-button--checked',
					withComplementaryText: 'formularios-radio-button--with-complementary-text',
					disabled: 'formularios-radio-button--disabled',
				},
			},
			intents: {
				'radio.selection': 'canonical',
				'radio.form': 'canonical',
				'radio.group': 'canonical',
				'radio.checked': 'checked',
				'radio.with-text': 'withComplementaryText',
				'radio.disabled': 'disabled',
			},
		}),
	},
	args: {
		label: 'Label',
		complementaryText: undefined,
		value: 'option1',
		name: 'group',
		checked: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Texto del label del radio button (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		complementaryText: {
			control: { type: 'text' },
			description: 'Texto complementario opcional (se muestra debajo del label)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		value: {
			control: { type: 'text' },
			description: 'Valor del radio button (requerido, para agrupar radio buttons)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		name: {
			control: { type: 'text' },
			description: 'Nombre del grupo de radio buttons (requerido, para agrupar)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		checked: {
			control: { type: 'boolean' },
			description: 'Si el radio button está seleccionado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md'],
			description: 'Tamaño del radio button (sm: 16px, md: 20px)',
			table: {
				type: { summary: 'sm | md' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'active', 'disabled'],
			description: 'Estado del radio button',
			table: {
				type: { summary: 'default | hover | active | disabled' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Si el radio button está deshabilitado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		onChange: {
			action: 'changed',
			description: 'Función a ejecutar cuando cambia el estado del radio button',
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
type Story = StoryObj<RadioButtonOptions>;

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
		label: 'Opción 1',
		complementaryText: undefined,
		value: 'option1',
		name: 'tipo',
		checked: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				
				type: 'code',
				state: 'open',
				code: `// 1. Crear contenedor HTML
<div id="radiobutton-implementation-container"></div>

// 2. Crear radio button
window.UBITS.RadioButton.create({
  containerId: 'radiobutton-implementation-container',
  label: 'Opción 1',
  value: 'option1',
  name: 'tipo',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-radio-button');
		container.setAttribute('data-ubits-component', 'RadioButton');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';
		container.style.width = '100%';
		container.style.maxWidth = '100%';

		// Crear contenedor para el radio button
		const radioButtonContainer = document.createElement('div');
		radioButtonContainer.id = args.containerId || 'radiobutton-container';
		radioButtonContainer.style.width = '100%';
		radioButtonContainer.style.maxWidth = '100%';
		radioButtonContainer.style.display = 'flex';
		radioButtonContainer.style.justifyContent = 'center';
		radioButtonContainer.style.alignItems = 'center';
		
		// Limpiar contenedor antes de agregar nuevo radio button
		radioButtonContainer.innerHTML = '';
		
		container.appendChild(radioButtonContainer);

		console.log('[Story] Implementation render - args:', args);

		// Crear radio button después de que el contenedor esté en el DOM
		requestAnimationFrame(() => {
			setTimeout(() => {
				// Limpiar cualquier radio button existente
				const existingRadio = radioButtonContainer.querySelector('.ubits-radio-button');
				if (existingRadio) {
					existingRadio.remove();
				}
				
				const radioButtonInstance = createRadioButton({
					...args,
					containerId: radioButtonContainer.id,
				});
				
				console.log('[Story] Implementation - Radio button instance created:', radioButtonInstance);
			}, 50);
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		label: 'Label',
		complementaryText: undefined,
		value: 'option1',
		name: 'group',
		checked: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';
		container.style.width = '100%';
		container.style.maxWidth = '100%';

		const radioButtonContainer = document.createElement('div');
		radioButtonContainer.id = args.containerId || 'radiobutton-container';
		radioButtonContainer.style.width = '100%';
		radioButtonContainer.style.maxWidth = '100%';
		radioButtonContainer.style.display = 'flex';
		radioButtonContainer.style.justifyContent = 'center';
		radioButtonContainer.style.alignItems = 'center';
		
		// Limpiar contenedor antes de agregar nuevo radio button
		radioButtonContainer.innerHTML = '';
		
		container.appendChild(radioButtonContainer);

		console.log('[Story] Default render - args:', args);

		// Crear radio button después de que el contenedor esté en el DOM
		requestAnimationFrame(() => {
			setTimeout(() => {
				// Limpiar cualquier radio button existente
				const existingRadio = radioButtonContainer.querySelector('.ubits-radio-button');
				if (existingRadio) {
					existingRadio.remove();
				}
				
				const radioButtonInstance = createRadioButton({
					...args,
					containerId: radioButtonContainer.id,
				});
				
				console.log('[Story] Default - Radio button instance created:', radioButtonInstance);
			}, 50);
		});

		return container;
	},
};
