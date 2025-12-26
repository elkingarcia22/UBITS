import type { Meta, StoryObj } from '@storybook/html';
import { createMask } from '../../../components/mask/src/MaskProvider';
import type { MaskOptions } from '../../../components/mask/src/types/MaskOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../components/mask/src/styles/mask.css';
import '../../../components/popover/src/styles/popover.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<
	MaskOptions & {
		'popover.footerButtons.tertiary.enabled'?: boolean;
		'popover.footerButtons.secondary.enabled'?: boolean;
		'popover.footerButtons.primary.enabled'?: boolean;
	}
> = {
	title: 'Feedback/Mask',
	tags: ['autodocs'],
	parameters: {
		docs: {codePanel: true,
				
			description: {
				component:
					'Componente Mask UBITS para onboarding. Crea un overlay oscuro con un "agujero" que destaca un elemento específico de la interfaz. Incluye un Popover integrado para mostrar información o instrucciones. Ideal para guías de usuario, tutoriales y flujos de onboarding.',
			},
		},
		layout: 'fullscreen',
		ubits: createUBITSContract({
			componentId: '🧩-ux-mask',
			api: {
				create: 'window.UBITSMask.createMask',
				// También disponible como window.createMask
			},
			dependsOn: {
				required: [
					'🧩-ux-popover', // Popover integrado para mostrar información
				],
				optional: [
					'🧩-ux-button', // Botones en el footer del Popover
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-dim',
				'--modifiers-normal-color-light-accent-brand',
				'--ubits-border-radius-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['targetElement', 'popover'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `window.UBITSMask.createMask({
  targetElement: document.getElementById('target'),
  popover: {
    title: 'Título',
    bodyContent: '<p>Contenido del popover</p>'
  },
  onClose: function() {}
});`,
				basic: `window.UBITSMask.createMask({
  targetElement: document.getElementById('target'),
  popover: {
    title: 'Título',
    bodyContent: '<p>Contenido del popover</p>'
  }
});`,
				withPosition: `window.UBITSMask.createMask({
  targetElement: document.getElementById('target'),
  popover: {
    title: 'Título',
    bodyContent: '<p>Contenido del popover</p>'
  },
  popoverPosition: 'top'
});`,
				withButtons: `window.UBITSMask.createMask({
  targetElement: document.getElementById('target'),
  popover: {
    title: 'Título',
    bodyContent: '<p>Contenido del popover</p>',
    footerButtons: {
      primary: { label: 'Siguiente', onClick: function() {} }
    }
  }
});`,
			},
			variants: {
				'popover.width': ['sm', 'md', 'lg', 'xl'],
				popoverPosition: ['auto', 'top', 'bottom', 'left', 'right'],
			},
			events: {
				onClose: {
					type: 'Event',
					description: 'Emitted when mask is closed',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'feedback-mask--implementation',
				storiesByExample: {
					canonical: 'feedback-mask--implementation',
					basic: 'feedback-mask--default',
					withPosition: 'feedback-mask--with-position',
					withButtons: 'feedback-mask--with-buttons',
				},
			},
			intents: {
				'mask.onboarding': 'canonical',
				'mask.tutorial': 'canonical',
				'mask.basic': 'canonical',
				'mask.with-position': 'withPosition',
				'mask.with-buttons': 'withButtons',
			},
		}),
	},
	argTypes: {
		targetElement: {
			control: { type: 'text' },
			description: 'Selector CSS o elemento HTML que se quiere destacar.',
			table: {
				type: { summary: 'string | HTMLElement' },
				category: 'Configuración',
			},
		},
		'popover.title': {
			control: { type: 'text' },
			name: 'Título del Popover',
			description: 'Título del popover que se muestra en la máscara.',
			table: { category: 'Popover' },
		},
		'popover.bodyContent': {
			control: { type: 'text' },
			name: 'Contenido del Popover',
			description: 'Contenido HTML del popover.',
			table: { category: 'Popover' },
		},
		'popover.width': {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
			name: 'Ancho del Popover',
			description: 'Ancho del popover.',
			table: { category: 'Popover' },
		},
		popoverPosition: {
			control: { type: 'select' },
			options: ['auto', 'top', 'bottom', 'left', 'right'],
			description: 'Posición del popover relativa al elemento destacado.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'auto' },
				category: 'Configuración',
			},
		},
		popoverOffset: {
			control: { type: 'number' },
			description: 'Offset del popover desde el elemento destacado (en píxeles).',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '12' },
				category: 'Configuración',
			},
		},
		padding: {
			control: { type: 'number' },
			description: 'Padding adicional alrededor del elemento destacado (en píxeles).',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '8' },
				category: 'Configuración',
			},
		},
		closeOnOverlayClick: {
			control: { type: 'boolean' },
			description: 'Si se debe cerrar al hacer clic en el overlay.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Comportamiento',
			},
		},
		open: {
			control: { type: 'boolean' },
			description: 'Si la máscara está abierta inicialmente.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
	},
};

export default meta;
type Story = StoryObj<
	MaskOptions & {
		'popover.footerButtons.tertiary.enabled'?: boolean;
		'popover.footerButtons.secondary.enabled'?: boolean;
		'popover.footerButtons.primary.enabled'?: boolean;
	}
>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		targetElement: '#target-button',
		'popover.title': 'PASO 1',
		'popover.bodyContent':
			'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
		'popover.width': 'md',
		popoverPosition: 'auto',
		popoverOffset: 12,
		padding: 8,
		closeOnOverlayClick: true,
		open: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				
				type: 'code',
				state: 'open',
				code: `// 1. Crear elemento objetivo (ejemplo: un botón)
<button id="target-button">Botón Destacado</button>

// 2. Crear Mask
const maskInstance = window.UBITSMask.createMask({
  targetElement: '#target-button', // Selector CSS o elemento HTML
  popover: {
    title: 'PASO 1',
    bodyContent: 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
    width: 'md',
    footerButtons: {
      primary: {
        label: 'Siguiente',
        onClick: () => {
          maskInstance.close();
        }
      }
    }
  },
  popoverPosition: 'auto', // 'auto' | 'top' | 'bottom' | 'left' | 'right'
  popoverOffset: 12, // Offset en píxeles
  padding: 8, // Padding alrededor del elemento destacado
  closeOnOverlayClick: true,
  open: false, // Abrir inicialmente
  onClose: () => {
    console.log('Máscara cerrada');
  }
});

// Nota: createMask retorna un objeto con:
// - maskInstance.element: El elemento DOM de la máscara
// - maskInstance.open(): Abrir la máscara
// - maskInstance.close(): Cerrar la máscara
// - maskInstance.updateTarget(newTarget): Actualizar el elemento objetivo
// - maskInstance.destroy(): Destruir la máscara y limpiar recursos

// Ejemplo: Abrir la máscara programáticamente
maskInstance.open();

// Ejemplo: Actualizar el elemento objetivo
maskInstance.updateTarget('#nuevo-boton');

// Ejemplo: Cerrar la máscara
maskInstance.close();`,
			},
		},
	},
	render: (args) => {
		// Crear contenido de ejemplo
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-mask');
		container.setAttribute('data-ubits-component', 'Mask');
		container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

		// Contenedor para los botones
		const buttonsContainer = document.createElement('div');
		buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

		// Crear máscara después de que el elemento esté en el DOM
		let maskInstance: ReturnType<typeof createMask> | null = null;

		// Usar requestAnimationFrame para crear los botones y la máscara
		requestAnimationFrame(() => {
			try {
				// Botón para abrir la máscara
				const openButton = document.createElement('button');
				openButton.textContent = 'Abrir Máscara';
				openButton.style.cssText = `
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          background: var(--modifiers-normal-color-light-accent-brand);
          color: white;
          border: none;
          border-radius: var(--ubits-border-radius-md);
          cursor: pointer;
        `;
				openButton.onclick = () => {
					if (maskInstance) {
						maskInstance.open();
					}
				};
				buttonsContainer.appendChild(openButton);

				// Crear botón objetivo
				const targetButton = document.createElement('button');
				targetButton.id = 'target-button';
				targetButton.textContent = 'Botón Destacado';
				targetButton.style.cssText = `
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          background: var(--modifiers-normal-color-light-accent-brand);
          color: white;
          border: none;
          border-radius: var(--ubits-border-radius-md);
          cursor: pointer;
        `;
				buttonsContainer.appendChild(targetButton);

				container.appendChild(buttonsContainer);

				// Crear máscara después de que los botones estén en el DOM
				requestAnimationFrame(() => {
					try {
						maskInstance = createMask({
							targetElement: args.targetElement || '#target-button',
							popover: {
								title: args['popover.title'] || 'PASO 1',
								bodyContent:
									args['popover.bodyContent'] ||
									'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
								width: args['popover.width'] || 'md',
								footerButtons: {
									primary: {
										label: 'Siguiente',
										onClick: () => {
											if (maskInstance) {
												maskInstance.close();
											}
										},
									},
								},
							},
							popoverPosition: args.popoverPosition || 'auto',
							popoverOffset: args.popoverOffset ?? 12,
							padding: args.padding ?? 8,
							closeOnOverlayClick: args.closeOnOverlayClick !== false,
							open: args.open || false,
							onClose: args.onClose,
						});
					} catch (error) {
						console.error('Error creando Mask:', error);
						const errorDiv = document.createElement('div');
						errorDiv.textContent = `Error: ${error}`;
						errorDiv.style.color = 'red';
						container.appendChild(errorDiv);
					}
				});
			} catch (error) {
				console.error('Error creando botones:', error);
			}
		});

		return container;
	},
};

/**
 * Ejemplo básico de Mask destacando un botón
 */
export const Default: Story = {
	render: (args) => {
		// Crear contenido de ejemplo
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

		// Contenedor para los botones
		const buttonsContainer = document.createElement('div');
		buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

		// Crear máscara después de que el elemento esté en el DOM
		let maskInstance: ReturnType<typeof createMask> | null = null;

		// Usar requestAnimationFrame para crear los botones y la máscara
		requestAnimationFrame(() => {
			try {
				// Botón para abrir la máscara usando componente UBITS
				const openButton = document.createElement('button');
				openButton.textContent = 'Abrir Máscara';
				openButton.style.cssText = `
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          background: var(--modifiers-normal-color-light-accent-brand);
          color: white;
          border: none;
          border-radius: var(--ubits-border-radius-md);
          cursor: pointer;
        `;
				openButton.onclick = () => {
					if (maskInstance) {
						maskInstance.open();
					}
				};
				buttonsContainer.appendChild(openButton);

				// Crear botón objetivo
				const targetButton = document.createElement('button');
				targetButton.id = 'target-button';
				targetButton.textContent = 'Botón Destacado';
				targetButton.style.cssText = `
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          background: var(--modifiers-normal-color-light-accent-brand);
          color: white;
          border: none;
          border-radius: var(--ubits-border-radius-md);
          cursor: pointer;
        `;
				buttonsContainer.appendChild(targetButton);

				container.appendChild(buttonsContainer);

				// Crear máscara después de que los botones estén en el DOM
				requestAnimationFrame(() => {
					maskInstance = createMask({
						targetElement: '#target-button',
						popover: {
							title: args['popover.title'] || 'PASO 1',
							bodyContent:
								args['popover.bodyContent'] ||
								'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
							width: args['popover.width'] || 'md',
							footerButtons: {
								primary: {
									label: 'Siguiente',
									onClick: () => {
										if (maskInstance) {
											maskInstance.close();
										}
									},
								},
							},
						},
						popoverPosition: args.popoverPosition || 'auto',
						popoverOffset: args.popoverOffset || 12,
						padding: args.padding || 8,
						closeOnOverlayClick: args.closeOnOverlayClick !== false,
						open: args.open || false,
					});
				});
			} catch (error) {
				console.error('❌ Error creando botones:', error);
			}
		});

		return container;
	},
	args: {
		'popover.title': 'PASO 1',
		'popover.bodyContent':
			'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
		'popover.width': 'md',
		popoverPosition: 'auto',
		popoverOffset: 12,
		padding: 8,
		closeOnOverlayClick: true,
		open: false,
	},
};



