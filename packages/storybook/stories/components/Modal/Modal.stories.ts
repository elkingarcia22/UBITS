/**
 * Modal Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createModal } from '../../../components/modal/src/ModalProvider';
import type { ModalOptions } from '../../../components/modal/src/types/ModalOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/modal/src/styles/modal.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<ModalOptions> = {
	title: 'Feedback/Modal',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Modal UBITS centrado con overlay. Ideal para diálogos, confirmaciones y formularios. Soporta diferentes tamaños, variante full-screen, header con título y botón de cerrar, body con contenido scrollable y footer con botones de acción.',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '⚙️-functional-modal',
			api: {
				create: 'window.UBITS.Modal.create',
				tag: '<ubits-modal>',
			},
			dependsOn: {
				required: ['🧩-ux-button'], // Footer buttons son requeridos si se usan
				optional: [], // No hay componentes opcionales adicionales
			},
			internals: ['⚙️-functional-scroll', '⚙️-functional-overlay'], // Scrollbar y overlay son privados
			slots: {
				header: [], // Header es interno (título + botón cerrar)
				body: [], // Body es interno
				footer: ['🧩-ux-button'], // Footer buttons son dependsOn
			},
			tokensUsed: [
				'--ubits-spacing-12',
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['title'],
			},
			// ⭐ NUEVOS CAMPOS EXTENDIDOS
			examples: {
				canonical: 'const modal = window.UBITS.Modal.create({\\n  title: "Confirmar acción",\\n  bodyContent: "<p>¿Estás seguro de realizar esta acción?</p>",\\n  footerButtons: {\\n    primary: { label: "Confirmar", onClick: function() {} },\\n    secondary: { label: "Cancelar", onClick: function() { modal.close(); } }\\n  }\\n});\\nmodal.open();',
				basic: 'const modal = window.UBITS.Modal.create({\n  title: "Confirmar acción",\n  bodyContent: "<p>¿Estás seguro de realizar esta acción?</p>",\n  footerButtons: {\n    primary: { label: "Confirmar", onClick: () => {} },\n    secondary: { label: "Cancelar", onClick: () => modal.close() }\n  }\n});',
				withContent: 'const modal = window.UBITS.Modal.create({\n  title: "Título del modal",\n  size: "lg",\n  bodyContent: "<p>Contenido del modal</p>"\n});',
			},
			variants: {
				size: ['sm', 'md', 'lg', 'xl', 'full'],
				fullScreen: [true, false],
			},
			events: {
				onClose: {
					type: 'Event',
					description: 'Emitted when modal is closed',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'feedback-modal--implementation',
				storiesByExample: {
					canonical: 'feedback-modal--implementation',
					basic: 'feedback-modal--default',
					withContent: 'feedback-modal--with-content',
				},
			},
			intents: {
				'modal.confirm': 'canonical',
				'modal.dialog': 'canonical',
				'modal.form': 'withContent',
				'modal.content': 'withContent',
			},
		}),
	},
	args: {
		title: 'Título del modal',
		size: 'md',
		fullScreen: false,
		bodyContent: '<p>Contenido del modal</p>',
		footerButtons: undefined,
		closeOnOverlayClick: true,
		open: false,
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título principal del modal (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl', 'full'],
			description: 'Tamaño del modal usando tokens UBITS.',
			table: {
				type: { summary: 'sm | md | lg | xl | full' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		fullScreen: {
			control: { type: 'boolean' },
			description: 'Si el modal debe ocupar altura máxima (full-screen).',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
				category: 'Apariencia',
			},
		},
		bodyContent: {
			control: { type: 'text' },
			description: 'Contenido HTML del cuerpo del modal.',
			table: {
				type: { summary: 'string | (() => string)' },
				category: 'Contenido',
			},
		},
		footerButtons: {
			control: { type: 'object' },
			description: 'Configuración de botones del footer.',
			table: {
				type: {
					summary: `{
  tertiary?: { label: string; onClick?: (event: MouseEvent) => void };
  secondary?: { label: string; onClick?: (event: MouseEvent) => void };
  primary?: { label: string; onClick?: (event: MouseEvent) => void };
}`,
				},
				category: 'Footer',
			},
		},
		closeOnOverlayClick: {
			control: { type: 'boolean' },
			description: 'Si el modal se cierra al hacer clic fuera de él.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: true },
				category: 'Comportamiento',
			},
		},
		onClose: {
			action: 'closed',
			description: 'Callback que se ejecuta cuando el modal se cierra.',
			table: {
				disable: true,
			},
		},
		open: {
			control: { type: 'boolean' },
			description: 'Si el modal está abierto inicialmente.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
				category: 'Comportamiento',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ModalOptions>;

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
		title: 'Confirmar acción',
		size: 'md',
		fullScreen: false,
		bodyContent: '<p>¿Estás seguro de que deseas continuar?</p>',
		footerButtons: {
			tertiary: {
				label: 'Cancelar',
				onClick: () => {
					console.log('Cancelar clickeado');
				},
			},
			primary: {
				label: 'Confirmar',
				onClick: () => {
					console.log('Confirmar clickeado');
				},
			},
		},
		closeOnOverlayClick: true,
		open: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `window.UBITS.Modal.create({
  title: 'Confirmar acción',
  size: 'md',
  fullScreen: false,
  bodyContent: '<p>¿Estás seguro de que deseas continuar?</p>',
  footerButtons: {
    tertiary: {
      label: 'Cancelar',
      onClick: () => {
        console.log('Cancelar clickeado');
      }
    },
    primary: {
      label: 'Confirmar',
      onClick: () => {
        console.log('Confirmar clickeado');
      }
    }
  },
  closeOnOverlayClick: true,
  open: true
});`,
			},
		},
	},
	render: (args) => {
		// Limpiar cualquier modal existente antes de crear uno nuevo
		// Esto previene duplicados cuando Storybook re-renderiza (Canvas + Docs)
		const existingModals = document.querySelectorAll('.ubits-modal-overlay');
		existingModals.forEach((modal) => {
			modal.remove();
		});
		
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '⚙️-functional-modal');
		container.setAttribute('data-ubits-component', 'Modal');
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';

		// Crear modal directamente
		const modalInstance = createModal(args);

		// El modal se agrega al body, así que solo retornamos el contenedor
		// con un indicador de que el modal está abierto
		const indicator = document.createElement('div');
		indicator.style.padding = '20px';
		indicator.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
		indicator.textContent = 'Modal abierto (ver overlay)';
		container.appendChild(indicator);

		// Limpiar modal cuando se desmonte o cuando Storybook re-renderiza
		const cleanup = () => {
			// Limpiar el modal de esta instancia
			if (modalInstance && modalInstance.element) {
				try {
					modalInstance.element.remove();
				} catch (e) {
					// Ignorar errores si ya fue removido
				}
			}
			// También limpiar cualquier otro modal que pueda quedar
			const remainingModals = document.querySelectorAll('.ubits-modal-overlay');
			remainingModals.forEach((modal) => {
				try {
					modal.remove();
				} catch (e) {
					// Ignorar errores
				}
			});
		};

		// Agregar cleanup al contenedor para que Storybook lo limpie
		(container as any).__cleanup = cleanup;
		
		// También limpiar cuando el contenedor se remueva del DOM
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.removedNodes.forEach((node) => {
					if (node === container || (node as Element)?.contains?.(container)) {
						cleanup();
						observer.disconnect();
					}
				});
			});
		});
		
		if (container.parentElement) {
			observer.observe(container.parentElement, { childList: true, subtree: true });
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		title: 'Título del modal',
		size: 'md',
		fullScreen: false,
		bodyContent: `
        <p>
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
    `,
		footerButtons: {
			tertiary: {
				label: 'Cancelar',
				onClick: () => {
					console.log('Tertiary clickeado');
				},
			},
			secondary: {
				label: 'Guardar',
				onClick: () => {
					console.log('Secondary clickeado');
				},
			},
			primary: {
				label: 'Aplicar',
				onClick: () => {
					console.log('Primary clickeado');
				},
			},
		},
		closeOnOverlayClick: true,
		open: false,
	},
	render: (args) => {
		// Limpiar cualquier modal existente antes de crear uno nuevo
		// Esto previene duplicados cuando Storybook re-renderiza (Canvas + Docs)
		const existingModals = document.querySelectorAll('.ubits-modal-overlay');
		existingModals.forEach((modal) => {
			modal.remove();
		});
		
		const container = document.createElement('div');
		container.id = 'modal-story-container';
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';

		const openButton = document.createElement('button');
		openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
		openButton.innerHTML = '<span>Abrir Modal</span>';
		openButton.style.width = 'auto';
		openButton.style.minWidth = 'auto';

		let modalInstance: ReturnType<typeof createModal> | null = null;

		const handleOpenModal = () => {
			// Limpiar cualquier modal existente antes de abrir uno nuevo
			const existingModals = document.querySelectorAll('.ubits-modal-overlay');
			existingModals.forEach((modal) => {
				modal.remove();
			});
			
			if (!modalInstance) {
				modalInstance = createModal({
					title: args.title,
					size: args.size,
					fullScreen: args.fullScreen,
					bodyContent: args.bodyContent,
					footerButtons: args.footerButtons,
					closeOnOverlayClick: args.closeOnOverlayClick,
					onClose: () => {
						if (args.onClose) {
							args.onClose();
						}
						if (modalInstance && modalInstance.element) {
							modalInstance.element.remove();
						}
						modalInstance = null;
						openButton.style.display = 'flex';
						openButton.style.visibility = 'visible';
					},
					open: true,
				});

				openButton.style.display = 'none';
				openButton.style.visibility = 'hidden';
			}
		};

		openButton.addEventListener('click', handleOpenModal);
		container.appendChild(openButton);

		// Limpiar modal cuando el contenedor se remueva del DOM
		const cleanup = () => {
			if (modalInstance && modalInstance.element) {
				try {
					modalInstance.element.remove();
				} catch (e) {
					// Ignorar errores si ya fue removido
				}
			}
			// También limpiar cualquier otro modal que pueda quedar
			const remainingModals = document.querySelectorAll('.ubits-modal-overlay');
			remainingModals.forEach((modal) => {
				try {
					modal.remove();
				} catch (e) {
					// Ignorar errores
				}
			});
		};

		// Agregar cleanup al contenedor para que Storybook lo limpie
		(container as any).__cleanup = cleanup;
		
		// También limpiar cuando el contenedor se remueva del DOM
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.removedNodes.forEach((node) => {
					if (node === container || (node as Element)?.contains?.(container)) {
						cleanup();
						observer.disconnect();
					}
				});
			});
		});
		
		if (container.parentElement) {
			observer.observe(container.parentElement, { childList: true, subtree: true });
		}

		return container;
	},
};
