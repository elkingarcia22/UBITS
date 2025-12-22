/**
 * Button Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderButton, createButton } from '../../../components/button/src/ButtonProvider';
import type { ButtonOptions } from '../../../components/button/src/types/ButtonOptions';
import { createUBITSContract, createExactSnippet } from '../../_shared/ubitsContract';
import '../../../components/button/src/styles/button.css';
import '../../../components/tooltip/src/styles/tooltip.css';

const meta: Meta<ButtonOptions> = {
	title: 'Básicos/Button',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-button',
			api: {
				create: 'window.UBITS.Button.create',
				tag: '<ubits-button>',
			},
			dependsOn: {
				required: [], // Button no depende de otros componentes
				optional: ['🧩-ux-icon', '🧩-ux-tooltip'], // Iconos y tooltips son opcionales
			},
			internals: [], // Button no tiene componentes internos privados
			slots: {}, // Button no tiene slots públicos
			tokensUsed: [
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-color-light-bg-active-button',
				'--modifiers-normal-color-light-bg-1',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['variant', 'text'],
			},
			// ⭐ NUEVOS CAMPOS EXTENDIDOS
			examples: {
				canonical: 'window.UBITS.Button.create({\n  variant: "primary",\n  text: "Click me",\n  onClick: () => {}\n});',
				basic: 'window.UBITS.Button.create({\n  variant: "primary",\n  text: "Click me"\n});',
				withIcon: 'window.UBITS.Button.create({\n  variant: "primary",\n  text: "Save",\n  icon: "save",\n  iconPosition: "left"\n});',
				disabled: 'window.UBITS.Button.create({\n  variant: "primary",\n  text: "Disabled",\n  disabled: true\n});',
			},
			variants: {
				variant: ['primary', 'secondary', 'tertiary'],
				size: ['xs', 'sm', 'md', 'lg'],
				state: ['default', 'hover', 'active', 'disabled'],
			},
			events: {
				onClick: {
					type: 'MouseEvent',
					description: 'Emitted when button is clicked',
				},
				onFocus: {
					type: 'FocusEvent',
					description: 'Emitted when button receives focus',
				},
				onBlur: {
					type: 'FocusEvent',
					description: 'Emitted when button loses focus',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'basicos-button--implementation',
				storiesByExample: {
					canonical: 'basicos-button--implementation',
					basic: 'basicos-button--default',
					withIcon: 'basicos-button--with-icon',
					disabled: 'basicos-button--disabled',
				},
			},
			intents: {
				'button.primary': 'canonical',
				'button.action': 'canonical',
				'button.click': 'canonical',
				'button.with-icon': 'withIcon',
				'button.disabled': 'disabled',
			},
		}),
	},
	args: {
		variant: 'primary',
		size: 'md',
		text: 'Guardar',
		icon: undefined,
		iconStyle: 'regular',
		iconPosition: 'left',
		iconOnly: false,
		disabled: false,
		loading: false,
		badge: false,
		active: false,
		floating: false,
		fullWidth: false,
		block: false,
		dropdown: false,
		showTooltip: false,
		tooltipText: '',
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary'],
			description: 'Variante del botón',
			table: {
				defaultValue: { summary: 'primary' },
				type: { summary: 'primary | secondary | tertiary' },
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del botón',
			table: {
				defaultValue: { summary: 'md' },
				type: { summary: 'xs | sm | md | lg' },
			},
		},
		text: {
			control: { type: 'text' },
			description: 'Texto del botón',
		},
		icon: {
			control: { type: 'text' },
			description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
		},
		iconStyle: {
			control: { type: 'select' },
			options: ['regular', 'solid'],
			description: 'Estilo del icono FontAwesome',
		},
		iconPosition: {
			control: { type: 'select' },
			options: ['left', 'right', 'only'],
			description: 'Posición del icono',
		},
		iconOnly: {
			control: { type: 'boolean' },
			description: 'Mostrar solo el icono, sin texto',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Deshabilitar el botón',
		},
		loading: {
			control: { type: 'boolean' },
			description: 'Estado de carga (muestra spinner)',
		},
		badge: {
			control: { type: 'boolean' },
			description: 'Mostrar badge de notificación',
		},
		active: {
			control: { type: 'boolean' },
			description: 'Modificador active/outline',
		},
		floating: {
			control: { type: 'boolean' },
			description: 'Modificador floating (botón flotante)',
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Ancho completo',
		},
		block: {
			control: { type: 'boolean' },
			description: 'Display block',
		},
		dropdown: {
			control: { type: 'boolean' },
			description: 'Activar funcionalidad dropdown',
		},
		showTooltip: {
			control: { type: 'boolean' },
			description: 'Mostrar tooltip al hacer hover (solo para botones icon-only)',
		},
		tooltipText: {
			control: { type: 'text' },
			description: 'Texto del tooltip',
		},
	},
};

export default meta;
type Story = StoryObj<ButtonOptions>;

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
		variant: 'secondary',
		size: 'md',
		text: 'Guardar',
		disabled: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `window.UBITS.Button.create({
  variant: 'secondary',
  size: 'md',
  text: 'Guardar',
  disabled: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-button');
		container.setAttribute('data-ubits-component', 'Button');
		container.style.padding = '20px';

		// Usar renderButton que es más seguro y confiable
		const buttonHTML = renderButton(args);
		container.innerHTML = buttonHTML;

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		text: 'Botón de ejemplo',
		icon: 'check',
		iconStyle: 'regular',
		iconPosition: 'left',
		iconOnly: false,
		disabled: false,
		loading: false,
		badge: false,
		active: false,
		floating: false,
		fullWidth: false,
		block: false,
		dropdown: false,
		showTooltip: false,
		tooltipText: 'Tooltip del botón',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '8px';

		const preview = document.createElement('div');
		preview.style.display = 'flex';
		preview.style.justifyContent = 'center';
		preview.style.alignItems = 'flex-start';
		preview.style.padding = '40px';
		preview.style.minHeight = '120px';
		preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		preview.style.borderRadius = '8px';
		preview.style.marginBottom = '20px';

		const buttonArgs = {
			...args,
			iconOnly: args.iconPosition === 'only' || args.iconOnly,
			iconPosition: args.iconPosition === 'only' ? 'left' : args.iconPosition,
		};

		if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
			const buttonWrapper = document.createElement('div');
			buttonWrapper.style.position = 'relative';
			buttonWrapper.style.display = 'inline-block';

			requestAnimationFrame(() => {
				try {
					const button = createButton(buttonArgs);
					const parent = button.parentElement;
					if (parent) {
						buttonWrapper.appendChild(parent);
					} else {
						buttonWrapper.appendChild(button);
					}
				} catch (error) {
					buttonWrapper.innerHTML = renderButton(buttonArgs);
				}
			});

			preview.appendChild(buttonWrapper);
		} else {
			const buttonHTML = renderButton(buttonArgs);
			const buttonContainer = document.createElement('div');
			buttonContainer.innerHTML = buttonHTML;
			preview.appendChild(buttonContainer);
		}

		container.appendChild(preview);
		return container;
	},
};

/**
 * ⭐ STORY PLAY: Interactive Example
 * 
 * Esta story demuestra interacciones automáticas usando @storybook/test.
 * Útil para probar comportamientos complejos y documentar flujos de usuario.
 * 
 * Nota: Requiere @storybook/test instalado (opcional para Storybook 10)
 */
export const InteractiveExample: Story = {
	name: 'Interactive Example (Play)',
	args: {
		variant: 'primary',
		size: 'md',
		text: 'Click me',
		disabled: false,
	},
	// play: async ({ canvasElement, step }) => {
	//   // Ejemplo de cómo usar play function (requiere @storybook/test)
	//   const canvas = within(canvasElement);
	//   
	//   await step('Find button', async () => {
	//     const button = canvas.getByRole('button', { name: /click me/i });
	//     expect(button).toBeInTheDocument();
	//   });
	//   
	//   await step('Click button', async () => {
	//     const button = canvas.getByRole('button', { name: /click me/i });
	//     await userEvent.click(button);
	//   });
	// },
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.gap = '16px';
		container.style.alignItems = 'center';

		const info = document.createElement('div');
		info.innerHTML = `
			<p style="margin: 0 0 8px 0; color: var(--modifiers-normal-color-light-fg-1-medium);">
				<strong>Ejemplo Interactivo:</strong> Esta story demuestra cómo usar la función <code>play</code>
				para probar interacciones automáticas.
			</p>
			<p style="margin: 0; font-size: 14px; color: var(--modifiers-normal-color-light-fg-1-low);">
				Para habilitar, descomenta la función <code>play</code> arriba e instala <code>@storybook/test</code>.
			</p>
		`;
		container.appendChild(info);

		const buttonWrapper = document.createElement('div');
		const buttonHTML = renderButton(args);
		buttonWrapper.innerHTML = buttonHTML;
		container.appendChild(buttonWrapper);

		return container;
	},
};
