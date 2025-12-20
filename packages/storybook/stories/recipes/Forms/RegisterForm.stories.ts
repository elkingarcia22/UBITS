/**
 * Recipe: Register Form
 * 
 * ⭐ RECETA CANÓNICA PARA AUTORUN
 * Formulario completo de registro con validación y múltiples campos.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from '../../_shared/ubitsContract';
import { createInput } from '../../../../components/input/src/InputProvider';
import { createButton } from '../../../../components/button/src/ButtonProvider';
import { createCheckbox } from '../../../../components/checkbox/src/CheckboxProvider';

const meta: Meta = {
	title: 'Recipes/Forms/RegisterForm',
	tags: ['autodocs', 'recipe'],
	parameters: {
		docs: {
			description: {
				component:
					'Receta canónica: Formulario completo de registro con campos de texto, email, password, checkbox y botones de acción.',
			},
		},
		// ⭐ CONTRATO UBITS PARA RECETA
		ubits: createUBITSContract({
			componentId: '📋-recipe-register-form',
			api: {
				create: 'createRegisterForm', // Función helper para crear el formulario
			},
			dependsOn: {
				required: [
					'🧩-ux-input', // Campos de texto, email, password
					'🧩-ux-checkbox', // Checkbox de términos y condiciones
					'🧩-ux-button', // Botones de acción
				],
				optional: [
					'🧩-ux-tooltip', // Tooltips de ayuda
					'🧩-ux-alert', // Mensajes de error/éxito
				],
			},
			internals: [], // No hay componentes internos privados
			slots: {
				fields: ['🧩-ux-input'], // Slots para campos de formulario
				actions: ['🧩-ux-button'], // Slots para botones de acción
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['fields', 'onSubmit'],
			},
			isTemplate: true, // Es una receta (composición)
			templateComponents: ['🧩-ux-input', '🧩-ux-checkbox', '🧩-ux-button'],
			// ⭐ CAMPOS EXTENDIDOS PARA RECETA
			examples: {
				canonical: `function createRegisterForm(containerId, options) {
  const container = document.getElementById(containerId);
  
  // Campo nombre
  const nameInput = window.UBITS.Input.create({
    containerId: containerId + '-name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Ingresa tu nombre',
  });
  
  // Campo email
  const emailInput = window.UBITS.Input.create({
    containerId: containerId + '-email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'tu@email.com',
  });
  
  // Campo password
  const passwordInput = window.UBITS.Input.create({
    containerId: containerId + '-password',
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Mínimo 8 caracteres',
  });
  
  // Checkbox términos
  const termsCheckbox = window.UBITS.Checkbox.create({
    containerId: containerId + '-terms',
    label: 'Acepto los términos y condiciones',
    required: true,
  });
  
  // Botón submit
  const submitButton = window.UBITS.Button.create({
    variant: 'primary',
    text: 'Registrarse',
    onClick: () => {
      if (options.onSubmit) {
        options.onSubmit({
          name: nameInput.getValue(),
          email: emailInput.getValue(),
          password: passwordInput.getValue(),
          terms: termsCheckbox.isChecked(),
        });
      }
    },
  });
  
  return {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    terms: termsCheckbox,
    submit: submitButton,
  };
}`,
				recipe: `createRegisterForm('register-form-container', {
  onSubmit: (data) => {
    console.log('Form data:', data);
    // Lógica de registro
  }
});`,
			},
			variants: {
				showPasswordConfirmation: [true, false],
				showTermsLink: [true, false],
				showSocialLogin: [true, false],
			},
			events: {
				onSubmit: {
					type: 'Event',
					description: 'Emitted when form is submitted',
					payload: {
						name: 'string',
						email: 'string',
						password: 'string',
						terms: 'boolean',
					},
				},
				onFieldChange: {
					type: 'Event',
					description: 'Emitted when any field changes',
				},
			},
			// ⭐ CAMPOS ADICIONALES
			storybook: {
				canonicalStoryId: 'recipes-forms-registerform--canonical',
				storiesByExample: {
					canonical: 'recipes-forms-registerform--canonical',
					recipe: 'recipes-forms-registerform--recipe',
				},
			},
			intents: {
				'form.register': 'canonical',
				'form.signup': 'canonical',
				'form.user-registration': 'canonical',
			},
			recipeIntent: ['form.register', 'form.signup', 'form.user-registration'],
		}),
	},
};

export default meta;
type Story = StoryObj;

export const Canonical: Story = {
	name: 'Canonical Implementation',
	render: () => {
		const container = document.createElement('div');
		container.id = 'register-form-container';
		container.style.padding = 'var(--ubits-spacing-lg)';
		container.style.maxWidth = '500px';
		container.setAttribute('data-ubits-id', '📋-recipe-register-form');

		// Campo nombre
		const nameInput = createInput('register-form-name', {
			label: 'Nombre completo',
			type: 'text',
			required: true,
			placeholder: 'Ingresa tu nombre',
		});
		container.appendChild(document.getElementById('register-form-name')!);

		// Campo email
		const emailInput = createInput('register-form-email', {
			label: 'Email',
			type: 'email',
			required: true,
			placeholder: 'tu@email.com',
		});
		container.appendChild(document.getElementById('register-form-email')!);

		// Campo password
		const passwordInput = createInput('register-form-password', {
			label: 'Contraseña',
			type: 'password',
			required: true,
			placeholder: 'Mínimo 8 caracteres',
		});
		container.appendChild(document.getElementById('register-form-password')!);

		// Checkbox términos
		const termsCheckbox = createCheckbox('register-form-terms', {
			label: 'Acepto los términos y condiciones',
			required: true,
		});
		container.appendChild(document.getElementById('register-form-terms')!);

		// Botón submit
		const submitButton = createButton({
			variant: 'primary',
			text: 'Registrarse',
			onClick: () => {
				console.log('Form submitted');
			},
		});
		container.appendChild(submitButton);

		return container;
	},
};

export const Recipe: Story = {
	name: 'Recipe Usage',
	render: () => {
		const container = document.createElement('div');
		container.innerHTML = `
			<div style="padding: var(--ubits-spacing-lg); max-width: 500px;">
				<h3>Uso de la Receta</h3>
				<pre style="background: var(--modifiers-normal-color-light-bg-2); padding: var(--ubits-spacing-md); border-radius: var(--ubits-border-radius-md);">
createRegisterForm('register-form-container', {
  onSubmit: (data) => {
    console.log('Form data:', data);
    // Lógica de registro
  }
});
				</pre>
			</div>
		`;
		return container;
	},
};
