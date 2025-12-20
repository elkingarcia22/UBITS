/**
 * Recipe: Accordion with Survey Descriptions
 * 
 * ⭐ RECETA CANÓNICA PARA AUTORUN
 * Accordion con descripciones de encuestas o preguntas.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from '../../_shared/ubitsContract';
import { createAccordion } from '../../../../components/accordion/src/AccordionProvider';

const meta: Meta = {
	title: 'Recipes/Accordion/SurveyDescriptions',
	tags: ['autodocs', 'recipe'],
	parameters: {
		docs: {
			description: {
				component:
					'Receta canónica: Accordion con múltiples items que contienen descripciones de encuestas, preguntas o información expandible.',
			},
		},
		// ⭐ CONTRATO UBITS PARA RECETA
		ubits: createUBITSContract({
			componentId: '📋-recipe-accordion-survey-descriptions',
			api: {
				create: 'createSurveyAccordion', // Función helper
			},
			dependsOn: {
				required: [
					'🧩-ux-accordion', // Accordion base
				],
				optional: [
					'🧩-ux-icon', // Iconos en los items
					'🧩-ux-badge', // Badges de estado
				],
			},
			internals: [], // No hay componentes internos privados
			slots: {
				items: ['🧩-ux-accordion-item'], // Items del accordion
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['items'],
			},
			isTemplate: true,
			templateComponents: ['🧩-ux-accordion'],
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `function createSurveyAccordion(containerId, options) {
  const accordion = window.UBITS.Accordion.create({
    containerId: containerId,
    items: (options.items || []).map(item => ({
      id: item.id,
      title: item.title,
      content: \`<div>
        <p><strong>Descripción:</strong> \${item.description}</p>
        \${item.details ? \`<p><strong>Detalles:</strong> \${item.details}</p>\` : ''}
        \${item.status ? \`<p><strong>Estado:</strong> \${item.status}</p>\` : ''}
      </div>\`,
      defaultExpanded: item.defaultExpanded || false,
    })),
    allowMultiple: options.allowMultiple !== false,
    variant: options.variant || 'default',
  });
  
  return accordion;
}`,
				recipe: `createSurveyAccordion('survey-accordion-container', {
  items: [
    {
      id: 'survey-1',
      title: 'Encuesta de Satisfacción',
      description: 'Encuesta para medir la satisfacción del cliente',
      details: 'Incluye preguntas sobre calidad, atención y tiempo de respuesta',
      status: 'Activa',
      defaultExpanded: true,
    },
    {
      id: 'survey-2',
      title: 'Encuesta de Producto',
      description: 'Encuesta sobre características del producto',
      status: 'Pendiente',
    },
  ],
  allowMultiple: true,
});`,
			},
			variants: {
				allowMultiple: [true, false],
				variant: ['default', 'bordered', 'flat'],
				showIcons: [true, false],
			},
			events: {
				onItemToggle: {
					type: 'Event',
					description: 'Emitted when an accordion item is expanded/collapsed',
					payload: {
						itemId: 'string',
						expanded: 'boolean',
					},
				},
			},
			storybook: {
				canonicalStoryId: 'recipes-accordion-surveydescriptions--canonical',
				storiesByExample: {
					canonical: 'recipes-accordion-surveydescriptions--canonical',
					recipe: 'recipes-accordion-surveydescriptions--recipe',
				},
			},
			intents: {
				'accordion.survey': 'canonical',
				'accordion.descriptions': 'canonical',
				'accordion.faq': 'canonical',
				'accordion.expandable': 'canonical',
			},
			recipeIntent: ['accordion.survey', 'accordion.descriptions', 'accordion.faq', 'accordion.expandable'],
		}),
	},
};

export default meta;
type Story = StoryObj;

export const Canonical: Story = {
	name: 'Canonical Implementation',
	render: () => {
		const container = document.createElement('div');
		container.id = 'survey-accordion-recipe-container';
		container.style.padding = 'var(--ubits-spacing-lg)';
		container.setAttribute('data-ubits-id', '📋-recipe-accordion-survey-descriptions');

		const info = document.createElement('div');
		info.style.padding = 'var(--ubits-spacing-md)';
		info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		info.style.borderRadius = 'var(--ubits-border-radius-md)';
		info.innerHTML = `
			<h3>Accordion con Descripciones de Encuestas</h3>
			<p>Esta receta crea un accordion con múltiples items que contienen descripciones de encuestas.</p>
			<p><strong>Características:</strong></p>
			<ul>
				<li>Múltiples items expandibles</li>
				<li>Descripciones y detalles</li>
				<li>Estados y badges opcionales</li>
			</ul>
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
createSurveyAccordion('survey-accordion-container', {
  items: [
    {
      id: 'survey-1',
      title: 'Encuesta de Satisfacción',
      description: 'Encuesta para medir la satisfacción del cliente',
      status: 'Activa',
    },
  ],
  allowMultiple: true,
});
				</pre>
			</div>
		`;
		return container;
	},
};
