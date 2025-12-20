/**
 * Recipe: Confirmation Modal
 * 
 * ⭐ RECETA CANÓNICA PARA AUTORUN
 * Modal de confirmación con botones de acción.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from '../../_shared/ubitsContract';
import { createModal } from '../../../../components/modal/src/ModalProvider';
import { createButton } from '../../../../components/button/src/ButtonProvider';

const meta: Meta = {
	title: 'Recipes/Modal/Confirmation',
	tags: ['autodocs', 'recipe'],
	parameters: {
		docs: {
			description: {
				component:
					'Receta canónica: Modal de confirmación con título, mensaje y botones de acción (confirmar/cancelar).',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA RECETA
		ubits: createUBITSContract({
			componentId: '📋-recipe-modal-confirmation',
			api: {
				create: 'createConfirmationModal', // Función helper
			},
			dependsOn: {
				required: [
					'⚙️-functional-modal', // Modal base
					'🧩-ux-button', // Botones de acción (requeridos)
				],
				optional: [
					'🧩-ux-icon', // Iconos en el modal
					'🧩-ux-alert', // Mensajes adicionales
				],
			},
			internals: ['⚙️-functional-scroll', '⚙️-functional-overlay'], // Internos del Modal
			slots: {
				header: [], // Header es interno
				body: [], // Body es interno
				footer: ['🧩-ux-button'], // Footer buttons son dependsOn
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['title', 'message', 'onConfirm'],
			},
			isTemplate: true,
			templateComponents: ['⚙️-functional-modal', '🧩-ux-button'],
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `function createConfirmationModal(options) {
  const modal = window.UBITS.Modal.create({
    title: options.title || 'Confirmar acción',
    bodyContent: \`<p>\${options.message || '¿Estás seguro de realizar esta acción?'}</p>\`,
    footerButtons: {
      primary: {
        label: options.confirmLabel || 'Confirmar',
        onClick: () => {
          if (options.onConfirm) {
            options.onConfirm();
          }
          modal.close();
        },
      },
      secondary: {
        label: options.cancelLabel || 'Cancelar',
        onClick: () => {
          if (options.onCancel) {
            options.onCancel();
          }
          modal.close();
        },
      },
    },
    size: options.size || 'md',
    closeOnOverlayClick: options.closeOnOverlayClick !== false,
  });
  
  return modal;
}`,
				recipe: `const modal = createConfirmationModal({
  title: 'Eliminar elemento',
  message: 'Esta acción no se puede deshacer. ¿Estás seguro?',
  confirmLabel: 'Eliminar',
  cancelLabel: 'Cancelar',
  onConfirm: () => {
    console.log('Elemento eliminado');
    // Lógica de eliminación
  },
  onCancel: () => {
    console.log('Operación cancelada');
  },
});

modal.open();`,
			},
			variants: {
				size: ['sm', 'md', 'lg'],
				showIcon: [true, false],
				danger: [true, false], // Para acciones destructivas
			},
			events: {
				onConfirm: {
					type: 'Event',
					description: 'Emitted when confirm button is clicked',
				},
				onCancel: {
					type: 'Event',
					description: 'Emitted when cancel button is clicked',
				},
				onClose: {
					type: 'Event',
					description: 'Emitted when modal is closed',
				},
			},
			storybook: {
				canonicalStoryId: 'recipes-modal-confirmation--canonical',
				storiesByExample: {
					canonical: 'recipes-modal-confirmation--canonical',
					recipe: 'recipes-modal-confirmation--recipe',
				},
			},
			intents: {
				'modal.confirm': 'canonical',
				'modal.confirmation': 'canonical',
				'modal.delete': 'canonical',
				'modal.danger': 'canonical',
			},
			recipeIntent: ['modal.confirm', 'modal.confirmation', 'modal.delete', 'modal.danger'],
		}),
	},
};

export default meta;
type Story = StoryObj;

export const Canonical: Story = {
	name: 'Canonical Implementation',
	render: () => {
		const container = document.createElement('div');
		container.id = 'confirmation-modal-recipe-container';
		container.style.padding = 'var(--ubits-spacing-lg)';
		container.setAttribute('data-ubits-id', '📋-recipe-modal-confirmation');

		const info = document.createElement('div');
		info.style.padding = 'var(--ubits-spacing-md)';
		info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		info.style.borderRadius = 'var(--ubits-border-radius-md)';
		info.innerHTML = `
			<h3>Modal de Confirmación</h3>
			<p>Esta receta crea un modal de confirmación con botones de acción.</p>
			<p><strong>Título:</strong> Confirmar acción</p>
			<p><strong>Mensaje:</strong> ¿Estás seguro de realizar esta acción?</p>
			<p><strong>Botones:</strong> Confirmar / Cancelar</p>
		`;
		container.appendChild(info);

		return container;
	},
};

export const Recipe: Story = {
	name: 'Recipe Usage',
	render: () => {
		const container = document.createElement('div');
		container.innerHTML = `
			<div style="padding: var(--ubits-spacing-lg);">
				<h3>Uso de la Receta</h3>
				<pre style="background: var(--modifiers-normal-color-light-bg-2); padding: var(--ubits-spacing-md); border-radius: var(--ubits-border-radius-md);">
const modal = createConfirmationModal({
  title: 'Eliminar elemento',
  message: 'Esta acción no se puede deshacer. ¿Estás seguro?',
  confirmLabel: 'Eliminar',
  cancelLabel: 'Cancelar',
  onConfirm: () => {
    console.log('Elemento eliminado');
  },
  onCancel: () => {
    console.log('Operación cancelada');
  },
});

modal.open();
				</pre>
			</div>
		`;
		return container;
	},
};
