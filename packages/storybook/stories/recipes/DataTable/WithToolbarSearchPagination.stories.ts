/**
 * Recipe: DataTable with Toolbar, Search and Pagination
 * 
 * ⭐ RECETA CANÓNICA PARA AUTORUN
 * DataTable completo con barra de herramientas, búsqueda y paginación.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from '../../_shared/ubitsContract';
import { createDataTable } from '../../../../components/data-table/src/DataTableProvider';
import { createButton } from '../../../../components/button/src/ButtonProvider';
import { createInput } from '../../../../components/input/src/InputProvider';
import { createPagination } from '../../../../components/pagination/src/PaginationProvider';

const meta: Meta = {
	title: 'Recipes/DataTable/WithToolbarSearchPagination',
	tags: ['autodocs', 'recipe'],
	parameters: {
		docs: {
			description: {
				component:
					'Receta canónica: DataTable completo con barra de herramientas (botones de acción), búsqueda y paginación.',
			},
		},
		// ⭐ CONTRATO UBITS PARA RECETA
		ubits: createUBITSContract({
			componentId: '📋-recipe-datatable-toolbar-search-pagination',
			api: {
				create: 'createDataTableWithToolbar', // Función helper
			},
			dependsOn: {
				required: [
					'🧩-ux-data-table', // Tabla principal
					'🧩-ux-button', // Botones de toolbar
					'🧩-ux-input', // Campo de búsqueda
					'🧩-ux-pagination', // Paginación
				],
				optional: [
					'🧩-ux-search-button', // Botón de búsqueda avanzada
					'🧩-ux-dropdown', // Menús de acciones
				],
			},
			internals: [], // No hay componentes internos privados (DataTable ya tiene los suyos)
			slots: {
				toolbar: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-search-button'], // Barra de herramientas
				table: ['🧩-ux-data-table'], // Tabla
				footer: ['🧩-ux-pagination'], // Paginación
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
				requiredProps: ['columns', 'rows'],
			},
			isTemplate: true,
			templateComponents: ['🧩-ux-data-table', '🧩-ux-button', '🧩-ux-input', '🧩-ux-pagination'],
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `function createDataTableWithToolbar(containerId, options) {
  const container = document.getElementById(containerId);
  
  // Toolbar con botones y búsqueda
  const toolbar = document.createElement('div');
  toolbar.className = 'ubits-datatable-toolbar';
  
  // Botón nuevo
  const newButton = window.UBITS.Button.create({
    variant: 'primary',
    text: 'Nuevo',
    onClick: () => options.onNew && options.onNew(),
  });
  toolbar.appendChild(newButton);
  
  // Botón exportar
  const exportButton = window.UBITS.Button.create({
    variant: 'secondary',
    text: 'Exportar',
    onClick: () => options.onExport && options.onExport(),
  });
  toolbar.appendChild(exportButton);
  
  // Campo de búsqueda
  const searchInput = window.UBITS.Input.create({
    containerId: containerId + '-search',
    placeholder: 'Buscar...',
    type: 'text',
    onChange: (value) => options.onSearch && options.onSearch(value),
  });
  toolbar.appendChild(document.getElementById(containerId + '-search')!);
  
  container.appendChild(toolbar);
  
  // DataTable
  const dataTable = window.UBITS.DataTable.create({
    containerId: containerId + '-table',
    columns: options.columns || [],
    rows: options.rows || [],
    header: {
      buttons: [
        { variant: 'primary', text: 'Nuevo', onClick: () => options.onNew && options.onNew() },
      ],
      searchInput: {
        placeholder: 'Buscar...',
        onChange: (value) => options.onSearch && options.onSearch(value),
      },
    },
  });
  container.appendChild(document.getElementById(containerId + '-table')!);
  
  // Paginación
  const pagination = window.UBITS.Pagination.create({
    containerId: containerId + '-pagination',
    currentPage: options.currentPage || 1,
    totalPages: options.totalPages || 1,
    onPageChange: (page) => options.onPageChange && options.onPageChange(page),
  });
  container.appendChild(document.getElementById(containerId + '-pagination')!);
  
  return {
    toolbar,
    table: dataTable,
    pagination,
    search: searchInput,
  };
}`,
				recipe: `createDataTableWithToolbar('datatable-container', {
  columns: [
    { id: 'name', label: 'Nombre' },
    { id: 'email', label: 'Email' },
  ],
  rows: [
    { id: '1', name: 'Juan', email: 'juan@example.com' },
    { id: '2', name: 'María', email: 'maria@example.com' },
  ],
  currentPage: 1,
  totalPages: 10,
  onNew: () => console.log('Nuevo'),
  onExport: () => console.log('Exportar'),
  onSearch: (value) => console.log('Buscar:', value),
  onPageChange: (page) => console.log('Página:', page),
});`,
			},
			variants: {
				showToolbar: [true, false],
				showSearch: [true, false],
				showPagination: [true, false],
				showBulkActions: [true, false],
			},
			events: {
				onNew: {
					type: 'Event',
					description: 'Emitted when new button is clicked',
				},
				onExport: {
					type: 'Event',
					description: 'Emitted when export button is clicked',
				},
				onSearch: {
					type: 'Event',
					description: 'Emitted when search value changes',
					payload: {
						value: 'string',
					},
				},
				onPageChange: {
					type: 'Event',
					description: 'Emitted when page changes',
					payload: {
						page: 'number',
					},
				},
			},
			storybook: {
				canonicalStoryId: 'recipes-datatable-withtoolbarsearchpagination--canonical',
				storiesByExample: {
					canonical: 'recipes-datatable-withtoolbarsearchpagination--canonical',
					recipe: 'recipes-datatable-withtoolbarsearchpagination--recipe',
				},
			},
			intents: {
				'datatable.search': 'canonical',
				'datatable.pagination': 'canonical',
				'datatable.toolbar': 'canonical',
				'datatable.complete': 'canonical',
			},
			recipeIntent: ['datatable.search', 'datatable.pagination', 'datatable.toolbar', 'datatable.complete'],
		}),
	},
};

export default meta;
type Story = StoryObj;

export const Canonical: Story = {
	name: 'Canonical Implementation',
	render: () => {
		const container = document.createElement('div');
		container.id = 'datatable-recipe-container';
		container.style.padding = 'var(--ubits-spacing-lg)';
		container.setAttribute('data-ubits-id', '📋-recipe-datatable-toolbar-search-pagination');

		// Toolbar
		const toolbar = document.createElement('div');
		toolbar.style.display = 'flex';
		toolbar.style.gap = 'var(--ubits-spacing-md)';
		toolbar.style.marginBottom = 'var(--ubits-spacing-md)';

		const newButton = createButton({
			variant: 'primary',
			text: 'Nuevo',
		});
		toolbar.appendChild(newButton);

		const searchInput = createInput('datatable-search', {
			placeholder: 'Buscar...',
			type: 'text',
		});
		toolbar.appendChild(document.getElementById('datatable-search')!);

		container.appendChild(toolbar);

		// DataTable placeholder
		const tablePlaceholder = document.createElement('div');
		tablePlaceholder.style.padding = 'var(--ubits-spacing-lg)';
		tablePlaceholder.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		tablePlaceholder.style.borderRadius = 'var(--ubits-border-radius-md)';
		tablePlaceholder.textContent = 'DataTable con columnas y filas';
		container.appendChild(tablePlaceholder);

		// Paginación placeholder
		const paginationPlaceholder = document.createElement('div');
		paginationPlaceholder.style.marginTop = 'var(--ubits-spacing-md)';
		paginationPlaceholder.textContent = 'Paginación: 1 de 10';
		container.appendChild(paginationPlaceholder);

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
createDataTableWithToolbar('datatable-container', {
  columns: [{ id: 'name', label: 'Nombre' }],
  rows: [{ id: '1', name: 'Juan' }],
  currentPage: 1,
  totalPages: 10,
  onSearch: (value) => console.log('Buscar:', value),
  onPageChange: (page) => console.log('Página:', page),
});
				</pre>
			</div>
		`;
		return container;
	},
};
