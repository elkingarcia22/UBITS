import type { Meta, StoryObj } from '@storybook/html';
import { createDataTable } from '../../components/data-table/src/DataTableProvider';
import type { DataTableOptions, TableColumn, TableRow } from '../../components/data-table/src/types/DataTableOptions';
import { renderButton } from '../../components/button/src/ButtonProvider';
import { createUBITSContract } from './_shared/ubitsContract';

const meta: Meta<DataTableOptions & { columnsCount?: number }> = {
  title: 'Data/Data Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
			codePanel: true,
			description: {
        component: 'Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas.'
      }
    },
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-data-table',
      api: {
        create: 'window.UBITS.DataTable.create',
        tag: '<ubits-data-table>',
      },
      dependsOn: {
        required: [
          '🧩-ux-button', // Header buttons y acciones
          '🧩-ux-input', // Search input (opcional pero común)
        ],
        optional: [
          '🧩-ux-checkbox', // Selección múltiple
          '🧩-ux-radio-button', // Columnas de tipo radio
          '🧩-ux-toggle', // Columnas de tipo toggle
          '🧩-ux-pagination', // Paginación
          '🧩-ux-progress', // Columnas de tipo progreso
          '🧩-ux-status-tag', // Columnas de tipo estado
          '🧩-ux-avatar', // Columnas de tipo nombre-avatar
          '🧩-ux-badge', // Badges
          '🧩-ux-list', // Menús
          '🧩-ux-drawer', // Menú de columnas
          '🧩-ux-empty-state', // Estado vacío
          '🧩-ux-search-button', // Botón de búsqueda
        ],
      },
      internals: [
        '⚙️-functional-scroll', // Scrollbar interno
        '⚙️-functional-drag-handle', // Drag handle para reordenar
        '⚙️-functional-expand-icon', // Icono de expandir/colapsar
        '⚙️-functional-column-menu', // Menú de columnas interno
        '⚙️-functional-context-menu', // Menú contextual interno
      ],
      slots: {
        header: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-search-button'], // Header buttons, search y filtros
        body: [], // Body es interno (tabla)
        footer: ['🧩-ux-pagination'], // Paginación (opcional)
      },
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-fg-1-low',
        '--modifiers-normal-color-light-fg-1-disabled',
        '--modifiers-normal-color-light-feedback-accent-error',
        '--ubits-spacing-xs',
        '--ubits-spacing-sm',
        '--ubits-spacing-md',
        '--ubits-spacing-lg',
        '--ubits-border-radius-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: ['columns', 'rows'],
      },
      // ⭐ NUEVOS CAMPOS EXTENDIDOS
      examples: {
        canonical: 'window.UBITS.DataTable.create({\\n  containerId: "datatable-container",\\n  columns: [{ id: "name", label: "Nombre" }, { id: "email", label: "Email" }],\\n  rows: [{ id: "1", name: "Juan", email: "juan@example.com" }],\\n  header: {\\n    buttons: [{ variant: "primary", text: "Nuevo", onClick: function() {} }],\\n    searchInput: { placeholder: "Buscar...", onChange: function(value) {} }\\n  },\\n  footer: {\\n    pagination: { currentPage: 1, totalPages: 10, onPageChange: function(page) {} }\\n  }\\n});',
        basic: 'window.UBITS.DataTable.create({ columns: [{ id: "name", label: "Nombre" }], rows: [{ id: "1", name: "Juan" }] });',
        withPagination: 'window.UBITS.DataTable.create({ columns: [{ id: "name", label: "Nombre" }], rows: [{ id: "1", name: "Juan" }], pagination: { currentPage: 1, totalPages: 10 } });',
        withHeader: 'window.UBITS.DataTable.create({ columns: [{ id: "name", label: "Nombre" }], rows: [{ id: "1", name: "Juan" }], header: { buttons: [{ variant: "primary", text: "Nuevo" }] } });',
        withSearch: 'window.UBITS.DataTable.create({ columns: [{ id: "name", label: "Nombre" }], rows: [{ id: "1", name: "Juan" }], header: { searchInput: { placeholder: "Buscar..." } } });',
      },
      variants: {
        columnReorderable: [true, false],
        rowReorderable: [true, false],
        rowExpandable: [true, false],
        columnSortable: [true, false],
      },
      events: {
        onRowClick: {
          type: 'MouseEvent',
          description: 'Emitted when a row is clicked',
        },
        onRowSelect: {
          type: 'Event',
          description: 'Emitted when a row is selected',
        },
        onColumnReorder: {
          type: 'Event',
          description: 'Emitted when columns are reordered',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'data-datatable--implementation',
        storiesByExample: {
          canonical: 'data-datatable--implementation',
          basic: 'data-datatable--default',
          withPagination: 'data-datatable--with-pagination',
          withHeader: 'data-datatable--with-header',
          withSearch: 'data-datatable--with-search',
        },
      },
      intents: {
        'datatable.complete': 'canonical',
        'datatable.search': 'withSearch',
        'datatable.pagination': 'withPagination',
        'datatable.toolbar': 'withHeader',
        'datatable.basic': 'basic',
      },
    }),
  },
  argTypes: {
    columnReorderable: {
      control: 'boolean',
      description: 'Permite reordenar columnas mediante drag & drop',
      table: {
        defaultValue: { summary: 'true' }
}
},
    rowReorderable: {
      control: 'boolean',
      description: 'Permite reordenar filas mediante drag & drop',
      table: {
        defaultValue: { summary: 'true' }
}
},
    rowExpandable: {
      control: 'boolean',
      description: 'Muestra el icono de expandir/colapsar en las filas',
      table: {
        defaultValue: { summary: 'true' }
}
},
    columnSortable: {
      control: 'boolean',
      description: 'Muestra botones de ordenamiento en los headers de las columnas',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showCheckbox: {
      control: 'boolean',
      description: 'Muestra la columna de checkbox para selección múltiple',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showVerticalScrollbar: {
      control: 'boolean',
      description: 'Muestra scrollbar vertical',
      table: {
        defaultValue: { summary: 'false' }
}
},
    showHorizontalScrollbar: {
      control: 'boolean',
      description: 'Muestra scrollbar horizontal',
      table: {
        defaultValue: { summary: 'false' }
}
},
    showColumnMenu: {
      control: 'boolean',
      description: 'Muestra el botón de menú (3 puntos) en los headers de las columnas. Usa este menú para fijar/desfijar columnas.',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showContextMenu: {
      control: 'boolean',
      description: 'Muestra el menú contextual (click derecho) en las filas con las opciones de acciones.',
      table: {
        defaultValue: { summary: 'true' }
}
},
    checkboxSticky: {
      control: 'boolean',
      description: 'Hace que la columna de checkbox sea sticky (fija) al hacer scroll horizontal',
      table: {
        defaultValue: { summary: 'false' }
}
},
    dragHandleSticky: {
      control: 'boolean',
      description: 'Hace que la columna de drag handle (mover filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowReorderable esté habilitado.',
      table: {
        defaultValue: { summary: 'false' }
}
},
    expandSticky: {
      control: 'boolean',
      description: 'Hace que la columna de expand (desplegar filas) sea sticky (fija) al hacer scroll horizontal. Nota: Requiere que rowExpandable esté habilitado.',
      table: {
        defaultValue: { summary: 'false' }
}
},
    columnsCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de columnas de datos a mostrar (excluyendo checkbox)',
      table: {
        defaultValue: { summary: '7' }
}
},
    columnType1: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 1 (Nombre)',
      table: {
        defaultValue: { summary: 'nombre' }
}
},
    columnType2: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 2 (Email)',
      table: {
        defaultValue: { summary: 'correo' }
}
},
    columnType3: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 3 (Estado)',
      table: {
        defaultValue: { summary: 'estado' }
}
},
    columnType4: {
      control: { type: 'select' },
      options: ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'progreso', 'estado', 'radio', 'toggle', 'checkbox', 'correo', 'fecha', 'pais', 'ciudad'],
      description: 'Tipo de columna 4',
      table: {
        defaultValue: { summary: 'nombre' }
}
},
    // Controles para columna 1 (Nombre)
    column1AvatarVariant: {
      control: { type: 'select' },
      options: ['photo', 'initials', 'icon'],
      description: 'Variante de avatar para columna 1 (solo si es nombre-avatar o nombre-avatar-texto)',
      table: {
        defaultValue: { summary: 'initials' }
}
},
    column1Editable: {
      control: 'boolean',
      description: 'Hacer editable la columna 1 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    // Controles para columna 2 (Email)
    column2EmailClickable: {
      control: 'boolean',
      description: 'Hacer el email clicable en columna 2 (solo si es correo)',
      table: {
        defaultValue: { summary: 'true' }
}
},
    // Controles para columna 3 (Estado)
    column3Editable: {
      control: 'boolean',
      description: 'Hacer editable la columna 3 (solo si es nombre, nombre-avatar, estado, fecha, checkbox o radio)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    column3RadioLabel: {
      control: 'boolean',
      description: 'Mostrar label en columna 3 (solo si es radio)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    column3ToggleLabel: {
      control: 'boolean',
      description: 'Mostrar label en columna 3 (solo si es toggle)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    column3CheckboxLabel: {
      control: 'boolean',
      description: 'Mostrar label en checkbox de columna 3 (solo si es tipo checkbox). Si es true, muestra el label automáticamente. Este checkbox es diferente al checkbox fijo (checkbox-2) que está en una columna separada.',
      table: {
        defaultValue: { summary: 'true' }
}
},
    // Controles para columna 4 (Progreso) - no tiene controles adicionales
    showPagination: {
      control: 'boolean',
      description: 'Muestra el paginador debajo de la tabla',
      table: {
        defaultValue: { summary: 'false' }
}
},
    currentPage: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Página actual',
      table: {
        defaultValue: { summary: '1' }
}
},
    itemsPerPage: {
      control: { type: 'number', min: 5, max: 100, step: 5 },
      description: 'Items por página',
      table: {
        defaultValue: { summary: '10' }
}
},
    paginationVariant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal'],
      description: 'Variante del paginador',
      table: {
        defaultValue: { summary: 'default' }
}
},
    paginationSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del paginador',
      table: {
        defaultValue: { summary: 'md' }
}
},
    // Controles del header
    headerTitle: {
      control: { type: 'text' },
      description: 'Título del header',
      table: {
        defaultValue: { summary: 'Lista de elementos' }
}
},
    showHeaderTitle: {
      control: 'boolean',
      description: 'Mostrar título del header',
      table: {
        defaultValue: { summary: 'true' }
}
},
    headerCounter: {
      control: { type: 'select' },
      options: [true, false, 'total-only'],
      description: 'Modo del contador: true = "X/Y resultados", "total-only" = solo "Y resultados", false = oculto',
      table: {
        defaultValue: { summary: 'true' }
}
},
    headerDisplayedItems: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Items mostrados actualmente (para el contador X/Y)',
      table: {
        defaultValue: { summary: '32' }
}
},
    headerTotalItems: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Total de items para el contador',
      table: {
        defaultValue: { summary: '206' }
}
},
    showHeaderPrimaryButton: {
      control: 'boolean',
      description: 'Mostrar botón primario',
      table: {
        defaultValue: { summary: 'true' }
}
},
    headerPrimaryButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón primario',
      table: {
        defaultValue: { summary: 'Nuevo' }
}
},
    showHeaderSecondaryButtons: {
      control: 'boolean',
      description: 'Mostrar botones secundarios',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showHeaderSearchButton: {
      control: 'boolean',
      description: 'Mostrar botón de búsqueda',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showHeaderFilterButton: {
      control: 'boolean',
      description: 'Mostrar botón de filtros',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showHeaderColumnSelectorButton: {
      control: 'boolean',
      description: 'Mostrar botón de seleccionar columnas',
      table: {
        defaultValue: { summary: 'true' }
}
},
    // Controles de la barra de acciones
    showActionButtonViewSelected: {
      control: 'boolean',
      description: 'Mostrar botón "Ver seleccionados" en la barra de acciones',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonNotifications: {
      control: 'boolean',
      description: 'Mostrar botón "Notificaciones" en la barra de acciones',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonCopy: {
      control: 'boolean',
      description: 'Mostrar botón "Copiar" en la barra de acciones (solo modo individual)',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonView: {
      control: 'boolean',
      description: 'Mostrar botón "Ver" en la barra de acciones (solo modo individual)',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonEdit: {
      control: 'boolean',
      description: 'Mostrar botón "Editar" en la barra de acciones (solo modo individual)',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonDownload: {
      control: 'boolean',
      description: 'Mostrar botón "Descargar" en la barra de acciones (solo modo individual)',
      table: {
        defaultValue: { summary: 'true' }
}
},
    showActionButtonDelete: {
      control: 'boolean',
      description: 'Mostrar botón "Eliminar" en la barra de acciones',
      table: {
        defaultValue: { summary: 'true' }
}
},
    // Controles de Empty State - No Data
    emptyStateNoDataTitle: {
      control: { type: 'text' },
      description: 'Título del empty state cuando no hay datos',
      table: {
        defaultValue: { summary: 'No hay datos' }
}
},
    emptyStateNoDataDescription: {
      control: { type: 'text' },
      description: 'Descripción del empty state cuando no hay datos'
},
    emptyStateNoDataIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome del empty state cuando no hay datos (ej: "inbox", "database")'
},
    emptyStateNoDataActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción cuando no hay datos'
},
    emptyStateNoDataShowPrimaryButton: {
      control: 'boolean',
      description: 'Mostrar botón primario cuando no hay datos',
      table: {
        defaultValue: { summary: 'false' }
}
},
    // Controles de Empty State - No Search Results
    emptyStateNoSearchResultsTitle: {
      control: { type: 'text' },
      description: 'Título del empty state cuando no hay resultados de búsqueda',
      table: {
        defaultValue: { summary: 'No se encontraron resultados' }
}
},
    emptyStateNoSearchResultsDescription: {
      control: { type: 'text' },
      description: 'Descripción del empty state cuando no hay resultados de búsqueda'
},
    emptyStateNoSearchResultsIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome del empty state cuando no hay resultados de búsqueda (ej: "search")'
},
    emptyStateNoSearchResultsActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción cuando no hay resultados de búsqueda'
},
    emptyStateNoSearchResultsShowPrimaryButton: {
      control: 'boolean',
      description: 'Mostrar botón primario cuando no hay resultados de búsqueda',
      table: {
        defaultValue: { summary: 'false' }
}
},
    // Controles de Empty State - No Filter Results
    emptyStateNoFilterResultsTitle: {
      control: { type: 'text' },
      description: 'Título del empty state cuando no hay resultados de filtros',
      table: {
        defaultValue: { summary: 'No hay resultados con los filtros aplicados' }
}
},
    emptyStateNoFilterResultsDescription: {
      control: { type: 'text' },
      description: 'Descripción del empty state cuando no hay resultados de filtros'
},
    emptyStateNoFilterResultsIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome del empty state cuando no hay resultados de filtros (ej: "filter")'
},
    emptyStateNoFilterResultsActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción cuando no hay resultados de filtros'
},
    emptyStateNoFilterResultsShowPrimaryButton: {
      control: 'boolean',
      description: 'Mostrar botón primario cuando no hay resultados de filtros',
      table: {
        defaultValue: { summary: 'true' }
}
}
}
};

export default meta;
type Story = StoryObj<DataTableOptions & { 
  columnsCount?: number;
  columnType1?: string;
  columnType2?: string;
  columnType3?: string;
  columnType4?: string;
  column1AvatarVariant?: 'photo' | 'initials' | 'icon';
  column1Editable?: boolean;
  column2EmailClickable?: boolean;
  column3Editable?: boolean;
  column3RadioLabel?: boolean;
  column3ToggleLabel?: boolean;
  column3CheckboxLabel?: boolean;
  checkboxSticky?: boolean;
  dragHandleSticky?: boolean;
  expandSticky?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  paginationVariant?: 'default' | 'compact' | 'minimal';
  paginationSize?: 'sm' | 'md' | 'lg';
}>;

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
    containerId: 'datatable-implementation-container',
    columns: [
      {
        id: 'nombre',
        title: 'Nombre',
        type: 'nombre',
      },
      {
        id: 'email',
        title: 'Email',
        type: 'correo',
      },
      {
        id: 'estado',
        title: 'Estado',
        type: 'estado',
      },
    ],
    rows: [
      {
        id: '1',
        data: {
          nombre: 'Juan Pérez',
          email: 'juan@example.com',
          estado: 'Activo',
        },
      },
      {
        id: '2',
        data: {
          nombre: 'María García',
          email: 'maria@example.com',
          estado: 'Inactivo',
        },
      },
    ],
    showCheckbox: true,
    columnSortable: true,
    rowExpandable: true, // Cambiar a true para que funcione como Default
    columnReorderable: false,
    rowReorderable: false,
    // Desactivar botón de filtros para evitar que se abra el drawer automáticamente
    showHeaderFilterButton: false,
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
				type: 'code',
				state: 'open',
				code: `// 1. Crear contenedor HTML
<div id="datatable-implementation-container"></div>

// 2. Crear DataTable con configuración completa
window.UBITS.DataTable.create({
  containerId: 'datatable-implementation-container',
  columns: [
    { id: 'nombre-col1', title: 'Nombre', type: 'nombre', width: 200 },
    { id: 'email-col2', title: 'Email', type: 'correo', width: 250 },
    { id: 'estado-col3', title: 'Estado', type: 'estado', width: 150 },
    { id: 'nombre-col4', title: 'Nombre', type: 'nombre', width: 180 },
    { id: 'nombre-col5', title: 'Nombre', type: 'nombre', width: 180 },
    { id: 'pais-col6', title: 'País', type: 'pais', width: 180 },
    { id: 'fecha-col7', title: 'Fecha', type: 'fecha', width: 180 }
  ],
  rows: [
    {
      id: 1,
      data: {
        'nombre-col1': 'Juan Pérez',
        'email-col2': 'juan.perez@empresa.com',
        'estado-col3': 'Activo',
        'nombre-col4': 'Columna 1',
        'nombre-col5': 'Extra 1',
        'pais-col6': 'Colombia',
        'fecha-col7': '2024-01-15',
        'checkbox-2': false
      }
    },
    {
      id: 2,
      data: {
        'nombre-col1': 'María García',
        'email-col2': 'maria.garcia@empresa.com',
        'estado-col3': 'Inactivo',
        'nombre-col4': 'Columna 2',
        'nombre-col5': 'Extra 2',
        'pais-col6': 'Colombia',
        'fecha-col7': '2024-02-20',
        'checkbox-2': false
      }
    }
  ],
  showCheckbox: true,
  columnSortable: true,
  rowExpandable: true,
  columnReorderable: true,
  rowReorderable: true,
  showColumnMenu: true,
  showContextMenu: true,
  header: {
    title: 'Lista de elementos',
    showTitle: true,
    counter: true,
    displayedItems: 2,
    totalItems: 2,
    showCounter: true,
    primaryButton: {
      text: 'Nuevo',
      icon: 'plus',
      iconStyle: 'regular',
      onClick: (e) => { alert('Botón primario'); }
    },
    showPrimaryButton: true,
    secondaryButtons: [
      {
        text: 'Exportar',
        icon: 'download',
        iconStyle: 'regular',
        onClick: (e) => { alert('Exportar'); }
      },
      {
        text: 'Importar',
        icon: 'upload',
        iconStyle: 'regular',
        onClick: (e) => { alert('Importar'); }
      }
    ],
    showSecondaryButtons: true,
    searchButton: {
      placeholder: 'Buscar...',
      onSearch: (searchTerm, filteredRows) => {}
    },
    showSearchButton: true,
    filterButton: {
      onClick: (e) => {},
      onApplyFilters: (filters) => {},
      onClearFilters: () => {}
    },
    showFilterButton: true,
    columnSelectorButton: {
      onClick: (e) => {}
    },
    showColumnSelectorButton: true
  },
  emptyState: {
    noData: {
      title: 'No hay datos',
      description: 'No se han agregado elementos aún.',
      icon: 'inbox'
    },
    noSearchResults: {
      title: 'No se encontraron resultados',
      description: 'Intenta con otros términos de búsqueda.',
      icon: 'search'
    },
    noFilterResults: {
      title: 'No hay resultados con los filtros aplicados',
      description: 'Intenta ajustar los filtros.',
      icon: 'filter'
    }
  },
  onRowSelect: (rowId, selected) => {},
  onSelectAll: (selected) => {}
});`,
      },
    },
  },
  render: (args) => {
    // Usar la misma lógica que Default con configuración completa incluyendo filtros
    const renderId = `story-render-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-data-table');
    container.setAttribute('data-ubits-component', 'DataTable');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    // Contenedor para la tabla - crear uno nuevo cada vez pero con ID único
    const tableContainerId = args.containerId || `datatable-implementation-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: calc(100vh - 100px);
      overflow: auto;
    `;
    
    // La limpieza global ya se hizo al inicio del render, no es necesario limpiar aquí de nuevo
    
    // Generar columnas y filas como en Default
    const columnsCount = 7; // Por defecto 7 columnas
    const columnType1 = 'nombre';
    const columnType2 = 'correo';
    const columnType3 = 'estado';
    const columnType4 = 'nombre';
    const columnType5 = 'nombre';
    const columnType6 = 'pais';
    const columnType7 = 'fecha';
    
    const columnTypeMapping: Record<string, { id: string; title: string }> = {
      'correo': { id: 'email', title: 'Email' },
      'fecha': { id: 'fecha', title: 'Fecha' },
      'nombre': { id: 'nombre', title: 'Nombre' },
      'estado': { id: 'estado', title: 'Estado' },
      'pais': { id: 'pais', title: 'País' },
    };
    
    const columnTypes = [columnType1, columnType2, columnType3, columnType4, columnType5, columnType6, columnType7];
    const allColumns: TableColumn[] = columnTypes.map((columnType, index) => {
      const baseConfig = columnTypeMapping[columnType] || { id: 'nombre', title: 'Nombre' };
      const baseId = baseConfig.id;
      const uniqueId = `${baseId}-col${index + 1}`;
      return {
        id: uniqueId,
        title: baseConfig.title,
        type: columnType as any,
        visible: true,
        width: index === 0 ? 200 : index === 1 ? 250 : index === 2 ? 150 : 180
      };
    });
    
    const columns: TableColumn[] = allColumns.slice(0, columnsCount);
    
    // Generar 100 filas como en Default
    const generateAllRows = (): TableRow[] => {
      const allRowsData = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@empresa.com', estado: 'Activo', area: 'Desarrollo' },
        { id: 2, nombre: 'María García', email: 'maria.garcia@empresa.com', estado: 'Inactivo', area: 'Diseño' },
        { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@empresa.com', estado: 'Activo', area: 'Marketing' },
        { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@empresa.com', estado: 'Activo', area: 'Recursos Humanos' },
        { id: 5, nombre: 'Pedro Rodríguez', email: 'pedro.rodriguez@empresa.com', estado: 'Pendiente', area: 'Ventas' },
      ];
      
      // Generar 100 filas repitiendo y variando los datos
      const rows: TableRow[] = [];
      for (let i = 0; i < 100; i++) {
        const baseData = allRowsData[i % allRowsData.length];
        rows.push({
          id: i + 1,
          data: {
            [`nombre-col${1}`]: baseData.nombre + (i > 4 ? ` ${i + 1}` : ''),
            [`email-col${2}`]: baseData.email.replace('@', `${i + 1}@`),
            [`estado-col${3}`]: baseData.estado,
            [`nombre-col${4}`]: `Columna ${i + 1}`,
            [`nombre-col${5}`]: `Extra ${i + 1}`,
            [`pais-col${6}`]: 'Colombia',
            [`fecha-col${7}`]: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
            'checkbox-2': false,
          },
          expanded: false,
          renderExpandedContent: (data) => {
            return `
              <div style="padding: var(--ubits-spacing-md); background: var(--modifiers-normal-color-light-bg-2); border-radius: var(--ubits-border-radius-sm);">
                <h4 style="margin: 0 0 var(--ubits-spacing-sm) 0; font-size: var(--modifiers-normal-body-md-semibold-fontsize); color: var(--modifiers-normal-color-light-fg-1-high);">
                  Información adicional
                </h4>
                <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">
                  Detalles adicionales para ${data[`nombre-col${1}`] || 'usuario'}
                </p>
              </div>
            `;
          }
        });
      }
      return rows;
    };
    
    const rows: TableRow[] = generateAllRows();
    
    // Estado de selecciones para la barra de acciones
    const selectionState: {
      selectedRowIds: Set<string | number>;
      viewSelectedActive: boolean;
    } = {
      selectedRowIds: new Set(),
      viewSelectedActive: false
    };
    
    // Declarar tableInstance en el scope del render para que esté disponible en todas las funciones
    let tableInstance: ReturnType<typeof createDataTable> | null = null;
    
    // ========== BARRA DE ACCIONES - IMPLEMENTACIÓN COMPLETA ==========
    // Función para renderizar la barra de acciones (igual que Default)
    const renderActionBar = (container: HTMLElement) => {
      const header = container.querySelector('.ubits-data-table__header');
      if (!header) {
        return;
      }
      
      // Buscar barra existente
      let actionBar = container.querySelector('.ubits-data-table__action-bar') as HTMLElement;
      
      // Si no existe, crearla
      if (!actionBar) {
        actionBar = document.createElement('div');
        actionBar.className = 'ubits-data-table__action-bar';
        actionBar.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
        `;
        header.insertAdjacentElement('afterend', actionBar);
      }
      
      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);
      
      // IMPORTANTE: Ocultar la barra si no hay selecciones, mostrarla si hay al menos una
      if (selectedCount === 0) {
        // Ocultar la barra cuando no hay selecciones
        actionBar.style.display = 'none';
        return; // Salir temprano si no hay selecciones
      }
      
      // Mostrar la barra cuando hay selecciones
      actionBar.style.display = 'flex';
      
      const countText = `(${selectedCount})`;
      const isMultipleSelection = selectedCount > 1;
      
      let buttonsHTML = '';
      
      // Estado del botón "Ver seleccionados" (compartido entre ambos modos)
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive
        ? `Dejar de ver seleccionados ${countText}`
        : `Ver seleccionados ${countText}`;
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      
      if (isMultipleSelection) {
        // Si hay más de 1 selección: mostrar botones de acciones masivas (ver seleccionados, notificaciones y eliminar)
        
        const buttons: string[] = [];
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: { id: 'action-btn-view-selected' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-notifications' }
        }));
        
        buttons.push(renderButton({
          variant: 'error',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-delete' }
        }));
        
        buttonsHTML = buttons.join('');
      } else {
        // Si hay 1 selección: mostrar todos los botones (menú individual)
        
        const buttons: string[] = [];
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          text: viewSelectedText,
          icon: viewSelectedIcon,
          iconStyle: 'regular',
          active: isViewSelectedActive,
          attributes: { id: 'action-btn-view-selected' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-notifications' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'copy',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-copy' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'eye',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-view' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'edit',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-edit' }
        }));
        
        buttons.push(renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'download',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-download' }
        }));
        
        buttons.push(renderButton({
          variant: 'error',
          size: 'sm',
          icon: 'trash',
          iconStyle: 'regular',
          iconOnly: true,
          attributes: { id: 'action-btn-delete' }
        }));
        
        buttonsHTML = buttons.join('');
      }
      
      actionBar.innerHTML = buttonsHTML;
      
      // Agregar listeners
      const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
      if (viewSelectedBtn) {
        viewSelectedBtn.addEventListener('click', () => {
          selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
          // Re-renderizar tabla con filtro
          if (tableInstance) {
            const filteredRows = selectionState.viewSelectedActive
              ? rows.filter(row => selectionState.selectedRowIds.has(row.id))
              : rows;
            tableInstance.update({ rows: filteredRows });
          }
          renderActionBar(container);
        });
      }
      
      // Otros botones (placeholders)
      ['notifications', 'copy', 'view', 'edit', 'download', 'delete'].forEach(action => {
        const btn = actionBar.querySelector(`#action-btn-${action}`);
        if (btn) {
          btn.addEventListener('click', () => {
            // Placeholder para acciones futuras
          });
        }
      });
    };
    
    // Configuración del header (igual que Default, incluyendo filtros)
    // Si expandSticky está activado, asegurar que rowExpandable también esté activado (igual que Default)
    const expandStickyValue = (args as any).expandSticky ?? false;
    const rowExpandableValue = expandStickyValue ? true : (args.rowExpandable ?? true);
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: args.columnReorderable ?? true,
      rowReorderable: args.rowReorderable ?? true,
      rowExpandable: rowExpandableValue, // Usar el valor calculado igual que Default
      columnSortable: args.columnSortable ?? true,
      showCheckbox: args.showCheckbox ?? true,
      showVerticalScrollbar: args.showVerticalScrollbar ?? true,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? true,
      showColumnMenu: args.showColumnMenu ?? true,
      showContextMenu: args.showContextMenu ?? true,
      checkboxSticky: false,
      dragHandleSticky: false,
      expandSticky: false,
      showPagination: false,
      lazyLoad: false,
      header: {
        title: 'Lista de elementos',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length,
        showCounter: true,
        primaryButton: {
          text: 'Nuevo',
          icon: 'plus',
          iconStyle: 'regular',
          onClick: (e) => {
            alert('Botón primario: Nuevo');
          }
        },
        showPrimaryButton: true,
        secondaryButtons: [
          {
            text: 'Exportar',
            icon: 'download',
            iconStyle: 'regular',
            onClick: (e) => {
              alert('Exportar');
            }
          },
          {
            text: 'Importar',
            icon: 'upload',
            iconStyle: 'regular',
            onClick: (e) => {
              alert('Importar');
            }
          }
        ],
        showSecondaryButtons: true,
        searchButton: {
          placeholder: 'Buscar...',
          value: '',
          onChange: (value) => {},
          onClick: (e) => {},
          onSearch: (searchTerm, filteredRows) => {}
        },
        showSearchButton: true,
        filterButton: {
          onClick: (e) => {
            // Este onClick solo se ejecuta si no hay filtros configurados
          },
          // Los filtros se generan automáticamente basados en las columnas de la tabla
          onApplyFilters: (filters) => {
          },
          onClearFilters: () => {
          }
        },
        showFilterButton: true,
        columnSelectorButton: {
          onClick: (e) => {
            // El dropdown se maneja automáticamente, este onClick es opcional
          }
        },
        showColumnSelectorButton: true
      },
      emptyState: {
        noData: {
          title: 'No hay datos',
          description: 'No se han agregado elementos aún.',
          icon: 'inbox',
        },
        noSearchResults: {
          title: 'No se encontraron resultados',
          description: 'Intenta con otros términos de búsqueda.',
          icon: 'search',
        },
        noFilterResults: {
          title: 'No hay resultados con los filtros aplicados',
          description: 'Intenta ajustar los filtros.',
          icon: 'filter',
        }
      },
      onRowSelect: (rowId, selected) => {
        if (selected) {
          selectionState.selectedRowIds.add(rowId);
        } else {
          selectionState.selectedRowIds.delete(rowId);
        }
        const container = document.getElementById(tableContainerId);
        if (container) {
          renderActionBar(container);
        }
      },
      onSelectAll: (selected) => {
        const container = document.getElementById(tableContainerId);
        if (container) {
          const table = container.querySelector('.ubits-data-table');
          if (table) {
            const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
            checkboxes.forEach((cb) => {
              const rowIdStr = cb.getAttribute('data-row-id');
              if (rowIdStr) {
                const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                if (selected) {
                  selectionState.selectedRowIds.add(rowId);
                } else {
                  selectionState.selectedRowIds.delete(rowId);
                }
              }
            });
          }
          renderActionBar(container);
        }
      },
      onRowExpand: (rowId, expanded) => {
        // Callback para filas expandidas (igual que Default)
        console.log(`🔄 [Implementation] Fila ${rowId} ${expanded ? 'expandida' : 'colapsada'}`);
      }
    };

    container.appendChild(tableContainer);

    // Crear la tabla después de que se monte en el DOM
    const checkAndCreateTable = () => {
      const foundContainer = document.getElementById(tableContainerId);
      if (!foundContainer) {
        return; // Contenedor no encontrado, salir
      }
      
      // Verificar si ya hay una tabla en este contenedor (evitar duplicados en Docs)
      const existingTable = foundContainer.querySelector('.ubits-data-table');
      const existingScrollable = foundContainer.querySelector('.ubits-data-table__scrollable-container');
      
      if (existingTable || existingScrollable) {
        // Ya existe una tabla, no crear otra
        return;
      }
      
      // Limpiar solo contenedores huérfanos (sin parentElement) para evitar duplicados en Docs
      // Esto previene que se acumulen tablas cuando Storybook re-renderiza
      if (foundContainer.parentElement) {
        // Limpiar contenedores antiguos de Implementation que están huérfanos
        const allImplementationContainers = document.querySelectorAll('[id^="datatable-implementation-container"]');
        allImplementationContainers.forEach((oldContainer) => {
          // No limpiar el contenedor actual
          if (oldContainer.id === tableContainerId) {
            return;
          }
          
          // Solo limpiar si el contenedor está huérfano (sin parentElement)
          // Esto es seguro porque significa que ya fue removido del DOM
          if (!oldContainer.parentElement) {
            // Limpiar instancias antiguas
            const oldTable = oldContainer.querySelector('.ubits-data-table');
            const oldScrollableContainer = oldContainer.querySelector('.ubits-data-table__scrollable-container');
            
            if (oldScrollableContainer) {
              const tableInside = oldScrollableContainer.querySelector('.ubits-data-table');
              if (tableInside) {
                const tableElement = tableInside as HTMLElement;
                if ((tableElement as any)._dataTableInstance) {
                  try {
                    const instance = (tableElement as any)._dataTableInstance;
                    if (instance && typeof instance.destroy === 'function') {
                      instance.destroy();
                    }
                  } catch (e) {
                    // Ignorar errores
                  }
                }
              }
            } else if (oldTable) {
              const tableElement = oldTable as HTMLElement;
              if ((tableElement as any)._dataTableInstance) {
                try {
                  const instance = (tableElement as any)._dataTableInstance;
                  if (instance && typeof instance.destroy === 'function') {
                    instance.destroy();
                  }
                } catch (e) {
                  // Ignorar errores
                }
              }
            }
            
            // Remover el contenedor huérfano
            oldContainer.remove();
          }
        });
      }
      
      if (foundContainer.parentElement && !tableInstance) {
        try {
          tableInstance = createDataTable(options);
          
          // Renderizar barra de acciones inicial
          setTimeout(() => {
            const container = document.getElementById(tableContainerId);
            if (container) {
              renderActionBar(container);
            }
          }, 100);
        } catch (error) {
          console.error('Error creating DataTable:', error);
        }
      }
    };

    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      checkAndCreateTable();
    });

    return container;
  },
};

export const Default: Story = {
  render: (args) => {
    const renderId = `story-render-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Contenedor principal con estilos UBITS
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    // Contenedor para la tabla - crear uno nuevo cada vez pero con ID único
    // Usar un ID único basado en timestamp para evitar conflictos entre renders
    const tableContainerId = `data-table-story-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: calc(100vh - 100px);
      overflow: auto;
    `;
    
    // Buscar y limpiar cualquier tabla anterior en el contenedor principal
    // Esto previene renderizados duplicados cuando se cambian los tipos de columna
    const existingContainers = container.querySelectorAll('[id^="data-table-story-container-"]');
    // console.log('🔴 [CLEANUP] Encontrados', existingContainers.length, 'contenedores existentes');
    
    existingContainers.forEach((oldContainer) => {
      // console.log('🔴 [CLEANUP] Limpiando contenedor:', oldContainer.id);
      // Buscar tabla directa o dentro de contenedor scrollable
      const oldTable = oldContainer.querySelector('.ubits-data-table');
      const oldScrollableContainer = oldContainer.querySelector('.ubits-data-table__scrollable-container');
      
      if (oldScrollableContainer) {
        const tableInside = oldScrollableContainer.querySelector('.ubits-data-table');
        if (tableInside) {
          const tableElement = tableInside as HTMLElement;
          if ((tableElement as any)._dataTableInstance) {
            try {
              // console.log('🔴 [CLEANUP] Destruyendo instancia en scrollable container');
              const instance = (tableElement as any)._dataTableInstance;
              if (instance && typeof instance.destroy === 'function') {
                instance.destroy();
              }
            } catch (e) {
              // Silenciar errores de limpieza
            }
          }
        }
      } else if (oldTable) {
        const tableElement = oldTable as HTMLElement;
        if ((tableElement as any)._dataTableInstance) {
          try {
            // console.log('🔴 [CLEANUP] Destruyendo instancia en tabla directa');
            const instance = (tableElement as any)._dataTableInstance;
            if (instance && typeof instance.destroy === 'function') {
              instance.destroy();
            }
          } catch (e) {
            // Silenciar errores de limpieza
          }
        }
      }
      oldContainer.remove();
      // console.log('🔴 [CLEANUP] Contenedor removido');
    });
    
    // Generar columnas dinámicamente según columnsCount
    // Asegurar que columnsCount sea un número válido entre 1 y 10
    // Leer directamente de args para asegurar reactividad
    const rawColumnsCount = args.columnsCount;
    const columnsCount = Math.max(1, Math.min(10, typeof rawColumnsCount === 'number' ? rawColumnsCount : 7));
    // console.log('🔵 [INIT] columnsCount inicial:', columnsCount, 'rawColumnsCount:', rawColumnsCount, 'tipo:', typeof rawColumnsCount);
    
    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    // Leer directamente de args para asegurar que se actualicen cuando cambien
    // Valores por defecto coinciden con Implementation: nombre, correo, estado, nombre, nombre, pais, fecha
    const columnType1 = args.columnType1 ?? 'nombre';
    const columnType2 = args.columnType2 ?? 'correo';
    const columnType3 = args.columnType3 ?? 'estado';
    const columnType4 = args.columnType4 ?? 'nombre';
    const columnType5 = (args as any).columnType5 ?? 'nombre';
    const columnType6 = (args as any).columnType6 ?? 'pais';
    const columnType7 = (args as any).columnType7 ?? 'fecha';
    const columnType8 = (args as any).columnType8 ?? 'nombre';
    const columnType9 = (args as any).columnType9 ?? 'nombre';
    const columnType10 = (args as any).columnType10 ?? 'estado';
    
    // Controles adicionales para columnas
    const column1AvatarVariant = args.column1AvatarVariant ?? 'initials';
    const column1Editable = args.column1Editable ?? false;
    const column2EmailClickable = args.column2EmailClickable ?? true;
    const column3Editable = args.column3Editable ?? false;
    const column3RadioLabel = args.column3RadioLabel ?? false;
    const column3ToggleLabel = args.column3ToggleLabel ?? false;
    // Para checkbox, por defecto mostrar label (true) para diferenciarlo del checkbox fijo
    const column3CheckboxLabel = args.column3CheckboxLabel !== undefined ? args.column3CheckboxLabel : true;
    
    // Construir columnas con sus controles
    // IMPORTANTE: Construir desde cero para evitar propiedades residuales cuando cambia el tipo
    
    // Mapeo de tipos a IDs y títulos (usar para todas las columnas)
    // IMPORTANTE: Los IDs deben coincidir con los campos de datos en las filas
    // Para tipos interactivos (radio, toggle, checkbox), usamos IDs únicos para evitar conflictos
    const columnTypeMapping: Record<string, { id: string; title: string }> = {
      'correo': { id: 'email', title: 'Email' },
      'fecha': { id: 'fecha', title: 'Fecha' },
      'nombre': { id: 'nombre', title: 'Nombre' },
      'nombre-avatar': { id: 'nombre', title: 'Nombre' },
      'nombre-avatar-texto': { id: 'nombre', title: 'Nombre' },
      'estado': { id: 'estado', title: 'Estado' },
      'progreso': { id: 'progreso', title: 'Progreso' },
      'pais': { id: 'pais', title: 'País' },
      'ciudad': { id: 'ciudad', title: 'Ciudad' },
      'radio': { id: 'radio', title: 'Selección' },
      'toggle': { id: 'toggle', title: 'Activo' },
      'checkbox': { id: 'checkbox-col', title: 'Marcar' },
      'telefono': { id: 'telefono', title: 'Teléfono' },
      'categoria': { id: 'categoria', title: 'Categoría' },
      'prioridad': { id: 'prioridad', title: 'Prioridad' }
};
    
    // Función helper para construir columnas limpiamente según el tipo
    const buildColumn = (
      columnType: string,
      config: { id: string; title: string },
      width: number,
      options: {
        avatarVariant?: 'photo' | 'initials' | 'icon';
        editable?: boolean;
        emailClickable?: boolean;
        radioLabel?: boolean;
        toggleLabel?: boolean;
        checkboxLabel?: boolean;
      } = {}
    ): TableColumn => {
      const column: TableColumn = {
        id: config.id,
        title: config.title,
        type: columnType as any,
        visible: true,
        width: width
};
      
      // Agregar propiedades SOLO según el tipo actual
      if (columnType === 'nombre-avatar' || columnType === 'nombre-avatar-texto') {
        column.avatarVariant = options.avatarVariant || 'initials';
      }
      
      const editableTypes = ['nombre', 'nombre-avatar', 'nombre-avatar-texto', 'estado', 'fecha', 'checkbox', 'radio'];
      if (editableTypes.includes(columnType)) {
        column.editable = options.editable || false;
      }
      
      if (columnType === 'correo') {
        column.emailClickable = options.emailClickable !== undefined ? options.emailClickable : true;
      }
      
      if (columnType === 'radio') {
        column.radioLabel = options.radioLabel !== undefined ? options.radioLabel : false;
      }
      
      if (columnType === 'toggle') {
        column.toggleLabel = options.toggleLabel !== undefined ? options.toggleLabel : false;
      }
      
      if (columnType === 'checkbox') {
        // Por defecto, mostrar label para diferenciarlo del checkbox fijo (checkbox-2)
        // Si checkboxLabel es true, se mostrará el label automáticamente
        // Si checkboxLabel es un string, se usará ese texto como label
        // Si checkboxLabel es false, no se mostrará label
        column.checkboxLabel = options.checkboxLabel !== undefined ? options.checkboxLabel : true;
      }
      
      // IMPORTANTE: NO agregar propiedades de otros tipos - esto previene que aparezcan en tipos incorrectos
      
      return column;
    };
    
    // Construir todas las columnas con IDs únicos
    // Usar un índice para asegurar que cada columna tenga un ID único, incluso si comparten tipo
    const columnTypes = [
      columnType1,
      columnType2,
      columnType3,
      columnType4,
      columnType5,
      columnType6,
      columnType7,
      columnType8,
      columnType9,
      columnType10
    ];
    
    const allColumns: TableColumn[] = columnTypes.map((columnType, index) => {
      const baseConfig = columnTypeMapping[columnType] || { id: 'nombre', title: 'Nombre' };
      
      // Hacer el ID único agregando el índice
      const baseId = baseConfig.id;
      const uniqueId = `${baseId}-col${index + 1}`;
      
      const config = {
        id: uniqueId,
        title: baseConfig.title
      };
      
      // Aplicar opciones específicas solo a las primeras columnas
      let options: any = {};
      if (index === 0) {
        options = {
          avatarVariant: column1AvatarVariant,
          editable: column1Editable
        };
      } else if (index === 1) {
        options = {
          emailClickable: column2EmailClickable,
          editable: column1Editable
        };
      } else if (index === 2) {
        options = {
          editable: column3Editable,
          radioLabel: column3RadioLabel,
          toggleLabel: column3ToggleLabel,
          checkboxLabel: column3CheckboxLabel
        };
      }
      
      const width = index === 0 ? 200 : index === 1 ? 250 : index === 2 ? 150 : 180;
      return buildColumn(columnType, config, width, options);
    });
    
    // Seleccionar solo las columnas necesarias según columnsCount
    // Asegurar que no exceda el número de columnas disponibles
    const validColumnsCount = Math.min(columnsCount, allColumns.length);
    const columns: TableColumn[] = allColumns.slice(0, validColumnsCount);
    // console.log('🟡 [INIT] Columnas seleccionadas:', columns.length, 'de', allColumns.length, 'disponibles. columnsCount:', columnsCount, 'validColumnsCount:', validColumnsCount);
    
    // Función helper para enriquecer los datos de las filas con campos para tipos interactivos
    // Coincide con la implementación de la web
    const enrichRowData = (rowData: any, rowId: number) => {
      return {
        ...rowData,
        // Campos para tipos interactivos
        radio: rowId === 1, // Solo el primer radio está seleccionado por defecto
        toggle: rowData.estado === 'Activo', // Toggle activo si el estado es 'Activo'
        'checkbox-col': rowId % 2 === 0, // Checkbox alternado para demostración
        // Campo para nombre-avatar-texto (texto complementario debajo del nombre)
        area: rowData.area || '', // Área de trabajo
        textoComplementario: rowData.area || '', // Texto complementario
        // Campos adicionales para cuando se usen tipos específicos
        progreso: rowData.progreso || 0,
        telefono: rowData.telefono || '',
        ciudad: rowData.ciudad || '',
        pais: rowData.pais || '',
        fecha: rowData.fecha || '',
        categoria: rowData.categoria || '',
        prioridad: rowData.prioridad || ''
};
    };
    
    // Función helper para generar todas las 100 filas (igual que en la web)
    const generateAllRows = (): TableRow[] => {
      const allRowsData = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'JP', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 2, nombre: 'María García', email: 'maria.garcia@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'MG', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'CL', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 4, nombre: 'Ana Martínez', email: 'ana.martinez@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'AM', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 5, nombre: 'Pedro Rodríguez', email: 'pedro.rodriguez@empresa.com', estado: 'Pendiente', area: 'Ventas', avatar: { initials: 'PR', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 6, nombre: 'Valentina Torres', email: 'valentina.torres@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'VT', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 7, nombre: 'Roberto Fernández', email: 'roberto.fernandez@empresa.com', estado: 'Inactivo', area: 'Marketing', avatar: { initials: 'RF', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 8, nombre: 'Carmen Torres', email: 'carmen.torres@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'CT', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 9, nombre: 'Diego Morales', email: 'diego.morales@empresa.com', estado: 'Pendiente', area: 'Ventas', avatar: { initials: 'DM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 10, nombre: 'Isabel Moreno', email: 'isabel.moreno@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'IM', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 11, nombre: 'Andrés Ramírez', email: 'andres.ramirez@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'AR', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 12, nombre: 'Patricia Sánchez', email: 'patricia.sanchez@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'PS', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 13, nombre: 'Fernando Castro', email: 'fernando.castro@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'FC', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 14, nombre: 'Gabriela Herrera', email: 'gabriela.herrera@empresa.com', estado: 'Pendiente', area: 'Ventas', avatar: { initials: 'GH', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 15, nombre: 'Ricardo Mendoza', email: 'ricardo.mendoza@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'RM', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 16, nombre: 'Claudia Vargas', email: 'claudia.vargas@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'CV', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 17, nombre: 'Javier Ortiz', email: 'javier.ortiz@empresa.com', estado: 'Inactivo', area: 'Marketing', avatar: { initials: 'JO', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 18, nombre: 'Daniela Jiménez', email: 'daniela.jimenez@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'DJ', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 19, nombre: 'Miguel Ángel Ruiz', email: 'miguel.ruiz@empresa.com', estado: 'Pendiente', area: 'Ventas', avatar: { initials: 'MR', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 20, nombre: 'Elena Castillo', email: 'elena.castillo@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'EC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 21, nombre: 'Óscar Gutiérrez', email: 'oscar.gutierrez@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'OG', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 22, nombre: 'Natalia Rojas', email: 'natalia.rojas@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'NR', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 23, nombre: 'Luis Fernando Mejía', email: 'luis.mejia@empresa.com', estado: 'Activo', area: 'Ventas', avatar: { initials: 'LM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 24, nombre: 'Andrea Salazar', email: 'andrea.salazar@empresa.com', estado: 'Pendiente', area: 'Recursos Humanos', avatar: { initials: 'AS', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 25, nombre: 'Cristian Peña', email: 'cristian.pena@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'CP', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 26, nombre: 'Monica Restrepo', email: 'monica.restrepo@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'MR', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 27, nombre: 'Esteban Cardona', email: 'esteban.cardona@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'EC', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 28, nombre: 'Paola Agudelo', email: 'paola.agudelo@empresa.com', estado: 'Activo', area: 'Ventas', avatar: { initials: 'PA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 29, nombre: 'Sergio Velásquez', email: 'sergio.velasquez@empresa.com', estado: 'Pendiente', area: 'Desarrollo', avatar: { initials: 'SV', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 30, nombre: 'Carolina Zapata', email: 'carolina.zapata@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'CZ', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 31, nombre: 'Felipe Ospina', email: 'felipe.ospina@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'FO', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 32, nombre: 'Tatiana Montoya', email: 'tatiana.montoya@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'TM', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 33, nombre: 'Alejandro Betancur', email: 'alejandro.betancur@empresa.com', estado: 'Activo', area: 'Ventas', avatar: { initials: 'AB', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 34, nombre: 'Diana Cárdenas', email: 'diana.cardenas@empresa.com', estado: 'Pendiente', area: 'Desarrollo', avatar: { initials: 'DC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 35, nombre: 'Jorge Iván Londoño', email: 'jorge.londono@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'JL', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 36, nombre: 'Mariana Uribe', email: 'mariana.uribe@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'MU', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 37, nombre: 'Camilo Arango', email: 'camilo.arango@empresa.com', estado: 'Inactivo', area: 'Diseño', avatar: { initials: 'CA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 38, nombre: 'Liliana Osorio', email: 'liliana.osorio@empresa.com', estado: 'Activo', area: 'Ventas', avatar: { initials: 'LO', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 39, nombre: 'Andrés Felipe Quintero', email: 'andres.quintero@empresa.com', estado: 'Pendiente', area: 'Desarrollo', avatar: { initials: 'AQ', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 40, nombre: 'Sandra Milena Gómez', email: 'sandra.gomez@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'SG', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 41, nombre: 'Héctor Fabio Muñoz', email: 'hector.munoz@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'HM', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 42, nombre: 'Yenny Alexandra Parra', email: 'yenny.parra@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'YP', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 43, nombre: 'Jhon Jairo Vélez', email: 'jhon.velez@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'JV', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 44, nombre: 'Adriana Marcela Henao', email: 'adriana.henao@empresa.com', estado: 'Pendiente', area: 'Recursos Humanos', avatar: { initials: 'AH', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 45, nombre: 'Edwin Mauricio Zapata', email: 'edwin.zapata@empresa.com', estado: 'Activo', area: 'Marketing', avatar: { initials: 'EZ', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 46, nombre: 'Mónica Patricia Bedoya', email: 'monica.bedoya@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'MB', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 47, nombre: 'William Alberto Giraldo', email: 'william.giraldo@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'WG', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 48, nombre: 'Angélica María Cano', email: 'angelica.cano@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'AC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 49, nombre: 'Leonardo Fabio Ríos', email: 'leonardo.rios@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'LR', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 50, nombre: 'Claudia Patricia Arbeláez', email: 'claudia.arbelaez@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'CA', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 51, nombre: 'Jairo Alonso Tobón', email: 'jairo.tobon@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'JT', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 52, nombre: 'Gloria Inés Mejía', email: 'gloria.mejia@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'GM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 53, nombre: 'Mauricio Esteban Lopera', email: 'mauricio.lopera@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'ML', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 54, nombre: 'Beatriz Elena Castrillón', email: 'beatriz.castrillon@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'BC', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 55, nombre: 'César Augusto Restrepo', email: 'cesar.restrepo@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'CR', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 56, nombre: 'Dora Luz Aguirre', email: 'dora.aguirre@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'DA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 57, nombre: 'Óscar Darío Valencia', email: 'oscar.valencia@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'OV', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 58, nombre: 'Nubia Esperanza Cardona', email: 'nubia.cardona@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'NC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 59, nombre: 'Alberto Mario Zapata', email: 'alberto.zapata@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'AZ', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 60, nombre: 'Esperanza María Ochoa', email: 'esperanza.ochoa@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'EO', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 61, nombre: 'Jorge Mario Gallego', email: 'jorge.gallego@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'JG', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 62, nombre: 'Blanca Nubia Arango', email: 'blanca.arango@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'BA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 63, nombre: 'Fabio Nelson Uribe', email: 'fabio.uribe@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'FU', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 64, nombre: 'Martha Cecilia Londoño', email: 'martha.londono@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'ML', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 65, nombre: 'Hernán Darío Osorio', email: 'hernan.osorio@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'HO', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 66, nombre: 'Luz Dary Montoya', email: 'luz.montoya@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'LM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 67, nombre: 'Carlos Mario Betancur', email: 'carlos.betancur@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'CB', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 68, nombre: 'Olga Lucía Cárdenas', email: 'olga.cardenas@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'OC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 69, nombre: 'Jairo Hernán Quintero', email: 'jairo.quintero@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'JQ', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 70, nombre: 'Amparo Gómez', email: 'amparo.gomez@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'AG', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 71, nombre: 'Gustavo Adolfo Muñoz', email: 'gustavo.munoz@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'GM', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 72, nombre: 'Rosa Elena Parra', email: 'rosa.parra@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'RP', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 73, nombre: 'Alvaro de Jesús Vélez', email: 'alvaro.velez@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'AV', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 74, nombre: 'María Eugenia Henao', email: 'maria.henao@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'MH', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 75, nombre: 'Jhonatan Zapata', email: 'jhonatan.zapata@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'JZ', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 76, nombre: 'Yolanda Bedoya', email: 'yolanda.bedoya@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'YB', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 77, nombre: 'Edison Giraldo', email: 'edison.giraldo@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'EG', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 78, nombre: 'Luz Marina Cano', email: 'luz.cano@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'LC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 79, nombre: 'Jhon Fredy Ríos', email: 'jhon.rios@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'JR', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 80, nombre: 'Nancy Arbeláez', email: 'nancy.arbelaez@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'NA', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 81, nombre: 'Jairo Tobón', email: 'jairo.tobon2@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'JT', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 82, nombre: 'Gloria Mejía', email: 'gloria.mejia2@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'GM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 83, nombre: 'Mauricio Lopera', email: 'mauricio.lopera2@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'ML', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 84, nombre: 'Beatriz Castrillón', email: 'beatriz.castrillon2@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'BC', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 85, nombre: 'César Restrepo', email: 'cesar.restrepo2@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'CR', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 86, nombre: 'Dora Aguirre', email: 'dora.aguirre2@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'DA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 87, nombre: 'Óscar Valencia', email: 'oscar.valencia2@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'OV', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 88, nombre: 'Nubia Cardona', email: 'nubia.cardona2@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'NC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 89, nombre: 'Alberto Zapata', email: 'alberto.zapata2@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'AZ', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 90, nombre: 'Esperanza Ochoa', email: 'esperanza.ochoa2@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'EO', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 91, nombre: 'Jorge Gallego', email: 'jorge.gallego2@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'JG', badgeColor: 'pink', imageUrl: '/images/Profile-image.jpg' } },
        { id: 92, nombre: 'Blanca Arango', email: 'blanca.arango2@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'BA', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 93, nombre: 'Fabio Uribe', email: 'fabio.uribe2@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'FU', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 94, nombre: 'Martha Londoño', email: 'martha.londono2@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'ML', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 95, nombre: 'Hernán Osorio', email: 'hernan.osorio2@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'HO', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } },
        { id: 96, nombre: 'Luz Montoya', email: 'luz.montoya2@empresa.com', estado: 'Activo', area: 'Diseño', avatar: { initials: 'LM', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 97, nombre: 'Carlos Betancur', email: 'carlos.betancur2@empresa.com', estado: 'Inactivo', area: 'Ventas', avatar: { initials: 'CB', badgeColor: 'blue', imageUrl: '/images/Profile-image.jpg' } },
        { id: 98, nombre: 'Olga Cárdenas', email: 'olga.cardenas2@empresa.com', estado: 'Activo', area: 'Desarrollo', avatar: { initials: 'OC', badgeColor: 'green', imageUrl: '/images/Profile-image.jpg' } },
        { id: 99, nombre: 'Jairo Quintero', email: 'jairo.quintero2@empresa.com', estado: 'Pendiente', area: 'Marketing', avatar: { initials: 'JQ', badgeColor: 'orange', imageUrl: '/images/Profile-image.jpg' } },
        { id: 100, nombre: 'Amparo Gómez', email: 'amparo.gomez2@empresa.com', estado: 'Activo', area: 'Recursos Humanos', avatar: { initials: 'AG', badgeColor: 'purple', imageUrl: '/images/Profile-image.jpg' } }
];

      return allRowsData.map((rowData) => ({
        id: rowData.id,
        data: enrichRowData({
          nombre: rowData.nombre,
          email: rowData.email,
          estado: rowData.estado,
          area: rowData.area,
          progreso: Math.floor(Math.random() * 100),
          telefono: `+57 ${300 + rowData.id} ${Math.floor(Math.random() * 1000)} ${Math.floor(Math.random() * 10000)}`,
          ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][Math.floor(Math.random() * 5)],
          pais: 'Colombia',
          fecha: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          categoria: rowData.area,
          prioridad: ['Alta', 'Media', 'Baja'][Math.floor(Math.random() * 3)],
          'checkbox-2': false,
          avatar: rowData.avatar
}, rowData.id),
        expanded: false,
        renderExpandedContent: (data) => {
          return `
                Información adicional
              </h4>
              <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">
                Detalles adicionales para ${data.nombre}
              </p>
            </div>
          `;
        }
}));
    };

    // Filas que coinciden con la implementación de la web (100 filas)
    // Incluir todos los campos necesarios para que funcionen con cualquier tipo de columna
    const rows: TableRow[] = generateAllRows();
    
    // ========== BARRA DE ACCIONES - IMPLEMENTACIÓN DESDE CERO ==========
    // Estado de selecciones (simple y limpio)
    const selectionState: {
      selectedRowIds: Set<string | number>;
      viewSelectedActive: boolean;
    } = {
      selectedRowIds: new Set(),
      viewSelectedActive: false
};
    
    // Función para renderizar la barra de acciones
    const renderActionBar = (container: HTMLElement) => {
      const header = container.querySelector('.ubits-data-table__header');
      if (!header) {
        return;
      }
      
      // Buscar barra existente
      let actionBar = container.querySelector('.ubits-data-table__action-bar') as HTMLElement;
      
      // Si no existe, crearla
      if (!actionBar) {
        actionBar = document.createElement('div');
        actionBar.className = 'ubits-data-table__action-bar';
        actionBar.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
        `;
        header.insertAdjacentElement('afterend', actionBar);
      }
      
      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);
      
      // IMPORTANTE: Ocultar la barra si no hay selecciones, mostrarla si hay al menos una
      if (selectedCount === 0) {
        // Ocultar la barra cuando no hay selecciones
        actionBar.style.display = 'none';
        return; // Salir temprano si no hay selecciones
      }
      
      // Mostrar la barra cuando hay selecciones
      actionBar.style.display = 'flex';
      
      const countText = `(${selectedCount})`;
      const isMultipleSelection = selectedCount > 1;
      
      let buttonsHTML = '';
      
      // Estado del botón "Ver seleccionados" (compartido entre ambos modos)
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive
        ? `Dejar de ver seleccionados ${countText}`
        : `Ver seleccionados ${countText}`;
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      
      if (isMultipleSelection) {
        // Si hay más de 1 selección: mostrar botones de acciones masivas (ver seleccionados, notificaciones y eliminar)
        
        const buttons: string[] = [];
        
        if (showActionButtonViewSelected) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            text: viewSelectedText,
            icon: viewSelectedIcon,
            iconStyle: 'regular',
            active: isViewSelectedActive,
            attributes: { id: 'action-btn-view-selected' }
          }));
        }
        
        if (showActionButtonNotifications) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'bell',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-notifications' }
          }));
        }
        
        if (showActionButtonDelete) {
          buttons.push(renderButton({
            variant: 'error',
            size: 'sm',
            icon: 'trash',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-delete' }
          }));
        }
        
        buttonsHTML = buttons.join('');
      } else {
        // Si hay 1 selección: mostrar todos los botones (menú individual)
        
        const buttons: string[] = [];
        
        if (showActionButtonViewSelected) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            text: viewSelectedText,
            icon: viewSelectedIcon,
            iconStyle: 'regular',
            active: isViewSelectedActive,
            attributes: { id: 'action-btn-view-selected' }
          }));
        }
        
        if (showActionButtonNotifications) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'bell',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-notifications' }
          }));
        }
        
        if (showActionButtonCopy) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'copy',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-copy' }
          }));
        }
        
        if (showActionButtonView) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'eye',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-view' }
          }));
        }
        
        if (showActionButtonEdit) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'edit',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-edit' }
          }));
        }
        
        if (showActionButtonDownload) {
          buttons.push(renderButton({
            variant: 'secondary',
            size: 'sm',
            icon: 'download',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-download' }
          }));
        }
        
        if (showActionButtonDelete) {
          buttons.push(renderButton({
            variant: 'error',
            size: 'sm',
            icon: 'trash',
            iconStyle: 'regular',
            iconOnly: true,
            attributes: { id: 'action-btn-delete' }
          }));
        }
        
        buttonsHTML = buttons.join('');
      }
      
      actionBar.innerHTML = buttonsHTML;
      
      // Agregar listeners
      const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
      if (viewSelectedBtn) {
        viewSelectedBtn.addEventListener('click', () => {
          selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
          // Re-renderizar tabla con filtro
          if (tableInstance) {
            const filteredRows = selectionState.viewSelectedActive
              ? rows.filter(row => selectionState.selectedRowIds.has(row.id))
              : rows;
            tableInstance.update({ rows: filteredRows });
          }
          renderActionBar(container);
        });
      }
      
      // Otros botones (placeholders)
      ['notifications', 'copy', 'view', 'edit', 'download', 'delete'].forEach(action => {
        const btn = actionBar.querySelector(`#action-btn-${action}`);
        if (btn) {
          btn.addEventListener('click', () => {
          });
        }
      });
    };
    
    // MutationObserver para preservar la barra cuando el Data Table se re-renderiza
    let actionBarObserver: MutationObserver | null = null;
    let tableInstance: ReturnType<typeof createDataTable> | null = null;
    
    // Si dragHandleSticky está activado, asegurar que rowReorderable también esté activado
    // porque el drag-handle solo se crea cuando rowReorderable es true
    const dragHandleStickyValue = (args as any).dragHandleSticky ?? false;
    const rowReorderableValue = dragHandleStickyValue ? true : (args.rowReorderable ?? true);
    
    // Si expandSticky está activado, asegurar que rowExpandable también esté activado
    const expandStickyValue = (args as any).expandSticky ?? false;
    const rowExpandableValue = expandStickyValue ? true : (args.rowExpandable ?? true);
    
    // Configuración del header
    const headerTitle = (args as any).headerTitle ?? 'Lista de elementos';
    const showHeaderTitle = (args as any).showHeaderTitle !== undefined ? (args as any).showHeaderTitle : true;
    const headerCounter = (args as any).headerCounter !== undefined ? (args as any).headerCounter : true;
    // Siempre usar el número real de filas - ignorar valores hardcodeados obsoletos
    // Si el usuario establece un valor explícito diferente, respetarlo, pero por defecto usar rows.length
    const headerDisplayedItems = (args as any).headerDisplayedItems !== undefined && (args as any).headerDisplayedItems !== 32 && (args as any).headerDisplayedItems !== 206
      ? (args as any).headerDisplayedItems 
      : rows.length;
    const headerTotalItems = (args as any).headerTotalItems !== undefined && (args as any).headerTotalItems !== 32 && (args as any).headerTotalItems !== 206
      ? (args as any).headerTotalItems 
      : rows.length;
    const showHeaderPrimaryButton = (args as any).showHeaderPrimaryButton !== undefined ? (args as any).showHeaderPrimaryButton : true;
    const headerPrimaryButtonText = (args as any).headerPrimaryButtonText ?? 'Nuevo';
    const showHeaderSecondaryButtons = (args as any).showHeaderSecondaryButtons !== undefined ? (args as any).showHeaderSecondaryButtons : true;
    const showHeaderSearchButton = (args as any).showHeaderSearchButton !== undefined ? (args as any).showHeaderSearchButton : true;
    const showHeaderFilterButton = (args as any).showHeaderFilterButton !== undefined ? (args as any).showHeaderFilterButton : true;
    const showHeaderColumnSelectorButton = (args as any).showHeaderColumnSelectorButton !== undefined ? (args as any).showHeaderColumnSelectorButton : true;
    
    // Controles de la barra de acciones
    const showActionButtonViewSelected = (args as any).showActionButtonViewSelected !== undefined ? (args as any).showActionButtonViewSelected : true;
    const showActionButtonNotifications = (args as any).showActionButtonNotifications !== undefined ? (args as any).showActionButtonNotifications : true;
    const showActionButtonCopy = (args as any).showActionButtonCopy !== undefined ? (args as any).showActionButtonCopy : true;
    const showActionButtonView = (args as any).showActionButtonView !== undefined ? (args as any).showActionButtonView : true;
    const showActionButtonEdit = (args as any).showActionButtonEdit !== undefined ? (args as any).showActionButtonEdit : true;
    const showActionButtonDownload = (args as any).showActionButtonDownload !== undefined ? (args as any).showActionButtonDownload : true;
    const showActionButtonDelete = (args as any).showActionButtonDelete !== undefined ? (args as any).showActionButtonDelete : true;
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      // Valores por defecto coinciden con la web: columnReorderable y rowReorderable son true
      columnReorderable: args.columnReorderable ?? true,
      rowReorderable: rowReorderableValue,
      rowExpandable: rowExpandableValue,
      columnSortable: args.columnSortable ?? true,
      showCheckbox: args.showCheckbox ?? true,
      showVerticalScrollbar: args.showVerticalScrollbar ?? true,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? true,
      showColumnMenu: args.showColumnMenu ?? true,
      showContextMenu: args.showContextMenu ?? true,
      checkboxSticky: (args as any).checkboxSticky ?? false,
      dragHandleSticky: dragHandleStickyValue,
      expandSticky: expandStickyValue,
      // Opciones de paginación
      showPagination: args.showPagination ?? false,
      currentPage: args.currentPage ?? 1,
      itemsPerPage: args.itemsPerPage ?? 10,
      paginationVariant: args.paginationVariant ?? 'default',
      paginationSize: args.paginationSize ?? 'md',
      // Desactivar lazy load por defecto para mostrar todas las filas en Storybook
      lazyLoad: false,
      // Configuración del header
      header: {
        title: showHeaderTitle ? headerTitle : undefined,
        showTitle: showHeaderTitle,
        counter: headerCounter === 'total-only' ? 'total-only' : headerCounter ? true : false,
        displayedItems: headerDisplayedItems,
        totalItems: headerTotalItems,
        showCounter: headerCounter,
        primaryButton: showHeaderPrimaryButton ? {
          text: headerPrimaryButtonText,
          icon: 'plus',
          iconStyle: 'regular',
          onClick: (e) => {
            alert('Botón primario: ' + headerPrimaryButtonText);
          }
        } : undefined,
        showPrimaryButton: showHeaderPrimaryButton,
        secondaryButtons: showHeaderSecondaryButtons ? [
          {
            text: 'Exportar',
            icon: 'download',
            iconStyle: 'regular',
            onClick: (e) => {
              alert('Exportar');
            }
          },
          {
            text: 'Importar',
            icon: 'upload',
            iconStyle: 'regular',
            onClick: (e) => {
              alert('Importar');
            }
          }
        ] : undefined,
        showSecondaryButtons: showHeaderSecondaryButtons,
        searchButton: showHeaderSearchButton ? {
          placeholder: 'Buscar...',
          value: '',
          onChange: (value) => {
          },
          onClick: (e) => {
          },
          onSearch: (searchTerm, filteredRows) => {
          }
        } : undefined,
        showSearchButton: showHeaderSearchButton,
        filterButton: showHeaderFilterButton ? {
          onClick: (e) => {
            // Este onClick solo se ejecuta si no hay filtros configurados
          },
          // Los filtros se generan automáticamente basados en las columnas de la tabla
          onApplyFilters: (filters) => {
          },
          onClearFilters: () => {
          }
        } : undefined,
        showFilterButton: showHeaderFilterButton,
        columnSelectorButton: showHeaderColumnSelectorButton ? {
          onClick: (e) => {
            // El dropdown se maneja automáticamente, este onClick es opcional
          }
        } : undefined,
        showColumnSelectorButton: showHeaderColumnSelectorButton
      },
      // Configuración de Empty State
      emptyState: {
        noData: {
          title: (args as any).emptyStateNoDataTitle || 'No hay datos',
          description: (args as any).emptyStateNoDataDescription || 'No se han agregado elementos aún. Comienza agregando tu primer elemento.',
          icon: (args as any).emptyStateNoDataIcon || 'inbox',
          actionLabel: (args as any).emptyStateNoDataActionLabel,
          showPrimaryButton: (args as any).emptyStateNoDataShowPrimaryButton || false,
          onAction: (args as any).emptyStateNoDataActionLabel ? () => {
            alert('Acción ejecutada desde empty state (no hay datos)');
          } : undefined
        },
        noSearchResults: {
          title: (args as any).emptyStateNoSearchResultsTitle || 'No se encontraron resultados',
          description: (args as any).emptyStateNoSearchResultsDescription || 'Intenta con otros términos de búsqueda o ajusta los filtros.',
          icon: (args as any).emptyStateNoSearchResultsIcon || 'search',
          actionLabel: (args as any).emptyStateNoSearchResultsActionLabel,
          showPrimaryButton: (args as any).emptyStateNoSearchResultsShowPrimaryButton || false,
          onAction: (args as any).emptyStateNoSearchResultsActionLabel ? () => {
            alert('Acción ejecutada desde empty state (no hay resultados de búsqueda)');
          } : undefined
        },
        noFilterResults: {
          title: (args as any).emptyStateNoFilterResultsTitle || 'No hay resultados con los filtros aplicados',
          description: (args as any).emptyStateNoFilterResultsDescription || 'Intenta ajustar los filtros para ver más resultados.',
          icon: (args as any).emptyStateNoFilterResultsIcon || 'filter',
          actionLabel: (args as any).emptyStateNoFilterResultsActionLabel || 'Limpiar filtros',
          showPrimaryButton: (args as any).emptyStateNoFilterResultsShowPrimaryButton !== undefined ? (args as any).emptyStateNoFilterResultsShowPrimaryButton : true,
          onAction: () => {
            // Limpiar filtros - esto se manejará automáticamente por el componente
            if (tableInstance) {
              // El componente manejará la limpieza de filtros
              alert('Limpiando filtros...');
            }
          }
        }
      },
      onPageChange: (page) => {
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onPageChange) {
          (args as any).onPageChange(page);
        }
      },
      onItemsPerPageChange: (itemsPerPage) => {
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onItemsPerPageChange) {
          (args as any).onItemsPerPageChange(itemsPerPage);
        }
      },
      onRowExpand: (rowId, expanded) => {
        // Callback para filas expandidas
      },
      onColumnReorder: (columnIds) => {
        // Callback para reordenamiento de columnas
      },
      onRowReorder: (rowIds) => {
        // Callback para reordenamiento de filas
      },
      onSort: (columnId, direction) => {
        // Callback para ordenamiento
      },
      onColumnPin: (columnId, pinned) => {
        // El sistema interno ya actualiza el estado y re-renderiza
        // Este callback es solo para notificar cambios externos si es necesario
      },
      onRowSelect: (rowId, selected) => {
        // Actualizar estado de selección
        if (selected) {
          selectionState.selectedRowIds.add(rowId);
        } else {
          selectionState.selectedRowIds.delete(rowId);
        }
        
        // Actualizar barra de acciones
        const container = document.getElementById(tableContainerId);
        if (container) {
          renderActionBar(container);
        } else {
          // Container no encontrado
        }
      },
      onSelectAll: (selected) => {
        // Actualizar estado de selección - solo las filas visibles
        const container = document.getElementById(tableContainerId);
        if (container) {
          const table = container.querySelector('.ubits-data-table');
          if (table) {
            const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
            
            checkboxes.forEach((cb) => {
              const rowIdStr = cb.getAttribute('data-row-id');
              if (rowIdStr) {
                const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                if (selected) {
                  selectionState.selectedRowIds.add(rowId);
                } else {
                  selectionState.selectedRowIds.delete(rowId);
                }
              }
            });
          } else {
            // Tabla no encontrada
          }
          renderActionBar(container);
        } else {
          // Container no encontrado
        }
      }
};

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);

    // Inicializar la tabla después de que se monte en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    
    // Verificar si ya hay una tabla en el contenedor antes de crear una nueva
    // Esto previene renderizados duplicados cuando Storybook llama al render múltiples veces
    const checkAndCreateTable = () => {
      // console.log('🔵 [checkAndCreateTable] Iniciando...');
      const containerElement = document.getElementById(tableContainerId);
      if (!containerElement) {
        // console.log('❌ [checkAndCreateTable] Container no encontrado:', tableContainerId);
        return false;
      }
      
      // Verificar si ya hay una tabla en este contenedor
      const existingTable = containerElement.querySelector('.ubits-data-table');
      const existingScrollable = containerElement.querySelector('.ubits-data-table__scrollable-container');
      
      // console.log('  - existingTable:', !!existingTable);
      // console.log('  - existingScrollable:', !!existingScrollable);
      // console.log('  - options.columns.length:', options.columns.length);
      
      if (existingTable || existingScrollable) {
        // console.log('⚠️ [checkAndCreateTable] Ya existe una tabla, no se creará otra');
        return false;
      }
      
      // console.log('✅ [checkAndCreateTable] Creando nueva tabla con', options.columns.length, 'columnas');
      
      // Verificar si hay otras tablas en el DOM antes de crear
      const allTablesInDOM = document.querySelectorAll('.ubits-data-table');
      // console.log('  - Tablas existentes en el DOM:', allTablesInDOM.length);
      
      tableInstance = createDataTable(options);
      
      // Verificar después de crear (comentado para reducir ruido en consola)
      // setTimeout(() => {
      //   const allTablesAfter = document.querySelectorAll('.ubits-data-table');
      //   // console.log('  - Tablas en el DOM después de crear:', allTablesAfter.length);
      // }, 200);
      
      // Guardar referencia a la instancia para poder inspeccionarla
      (window as any).__storybookDataTableInstance = tableInstance;
      
      // Renderizar barra de acciones después de crear la tabla
      setTimeout(() => {
        const container = document.getElementById(tableContainerId);
        if (container) {
          renderActionBar(container);
          
          // Configurar MutationObserver para preservar la barra
          if (!actionBarObserver) {
            actionBarObserver = new MutationObserver(() => {
              const bar = container.querySelector('.ubits-data-table__action-bar');
              if (!bar) {
                // La barra fue eliminada, reinsertarla
                setTimeout(() => {
                  renderActionBar(container);
                }, 100);
              }
            });
            actionBarObserver.observe(container, { childList: true, subtree: true });
          }
        }
      }, 200);
      
      return true;
    };
    
    requestAnimationFrame(() => {
      try {
        if (!checkAndCreateTable()) {
          // Si no se pudo crear, reintentar después de un pequeño delay
          setTimeout(() => {
            checkAndCreateTable();
          }, 50);
        }
      } catch (error) {
        console.error(`❌ [STORY] Error creating data table:`, error);
      }
    });
    
    // Función para construir columnas dinámicamente basándose en los args actuales
    const buildColumnsFromArgs = (): TableColumn[] => {
      const currentRawColumnsCount = args.columnsCount;
      const currentColumnsCount = Math.max(1, Math.min(10, typeof currentRawColumnsCount === 'number' ? currentRawColumnsCount : 7));
      // console.log('🟢 [buildColumnsFromArgs] currentColumnsCount:', currentColumnsCount, 'raw:', currentRawColumnsCount, 'tipo:', typeof currentRawColumnsCount);
      
      const currentColumnType1 = args.columnType1 ?? 'nombre';
      const currentColumnType2 = args.columnType2 ?? 'correo';
      const currentColumnType3 = args.columnType3 ?? 'estado';
      const currentColumnType4 = args.columnType4 ?? 'nombre';
      const currentColumnType5 = (args as any).columnType5 ?? 'nombre';
      const currentColumnType6 = (args as any).columnType6 ?? 'nombre';
      const currentColumnType7 = (args as any).columnType7 ?? 'pais';
      const currentColumnType8 = (args as any).columnType8 ?? 'fecha';
      const currentColumnType9 = (args as any).columnType9 ?? 'nombre';
      const currentColumnType10 = (args as any).columnType10 ?? 'estado';
      
      const currentColumn1AvatarVariant = args.column1AvatarVariant ?? 'initials';
      const currentColumn1Editable = args.column1Editable ?? false;
      const currentColumn2EmailClickable = args.column2EmailClickable ?? true;
      const currentColumn3Editable = args.column3Editable ?? false;
      const currentColumn3RadioLabel = args.column3RadioLabel ?? false;
      const currentColumn3ToggleLabel = args.column3ToggleLabel ?? false;
      const currentColumn3CheckboxLabel = args.column3CheckboxLabel !== undefined ? args.column3CheckboxLabel : true;
      
      // Construir todas las columnas con IDs únicos
      // Usar un índice para asegurar que cada columna tenga un ID único, incluso si comparten tipo
      const columnTypes = [
        currentColumnType1,
        currentColumnType2,
        currentColumnType3,
        currentColumnType4,
        currentColumnType5,
        currentColumnType6,
        currentColumnType7,
        currentColumnType8,
        currentColumnType9,
        currentColumnType10
      ];
      
      const allColumns: TableColumn[] = columnTypes.slice(0, currentColumnsCount).map((columnType, index) => {
        const baseConfig = columnTypeMapping[columnType] || { id: 'nombre', title: 'Nombre' };
        
        // Hacer el ID único agregando el índice si es necesario
        // Solo agregar sufijo si hay múltiples columnas con el mismo tipo base
        const baseId = baseConfig.id;
        const uniqueId = `${baseId}-col${index + 1}`;
        
        const config = {
          id: uniqueId,
          title: baseConfig.title
        };
        
        // Aplicar opciones específicas solo a las primeras columnas
        let options: any = {};
        if (index === 0) {
          options = {
            avatarVariant: currentColumn1AvatarVariant,
            editable: currentColumn1Editable
          };
        } else if (index === 1) {
          options = {
            emailClickable: currentColumn2EmailClickable,
            editable: currentColumn1Editable
          };
        } else if (index === 2) {
          options = {
            editable: currentColumn3Editable,
            radioLabel: currentColumn3RadioLabel,
            toggleLabel: currentColumn3ToggleLabel,
            checkboxLabel: currentColumn3CheckboxLabel
          };
        }
        
        return buildColumn(columnType, config, index === 0 ? 200 : index === 1 ? 250 : index === 2 ? 150 : 180, options);
      });
      
      return allColumns;
    };
    
    // Observar cambios en columnsCount y otros args para re-renderizar la tabla
    let lastArgs = JSON.stringify({
      columnsCount: columnsCount,
      columnType1: columnType1,
      columnType2: columnType2,
      columnType3: columnType3,
      columnType4: columnType4,
      showCheckbox: args.showCheckbox,
      showPagination: args.showPagination
    });
    // console.log('🟡 [INIT] lastArgs inicial:', lastArgs);
    
    const checkArgsInterval = setInterval(() => {
      try {
        const currentRawColumnsCount = args.columnsCount;
        const currentColumnsCount = Math.max(1, Math.min(10, typeof currentRawColumnsCount === 'number' ? currentRawColumnsCount : 7));
        
        const currentArgs = JSON.stringify({
          columnsCount: currentColumnsCount,
          columnType1: args.columnType1 ?? 'nombre',
          columnType2: args.columnType2 ?? 'correo',
          columnType3: args.columnType3 ?? 'estado',
          columnType4: args.columnType4 ?? 'nombre',
          showCheckbox: args.showCheckbox,
          showPagination: args.showPagination
        });
        
        if (currentArgs !== lastArgs) {
          // console.log('🟠 [CHECK] Cambio detectado!');
          lastArgs = currentArgs;
          
          // Destruir tabla existente y recrearla
          const containerElement = document.getElementById(tableContainerId);
          if (!containerElement) {
            return;
          }
          
          const existingTable = containerElement.querySelector('.ubits-data-table');
          const existingScrollable = containerElement.querySelector('.ubits-data-table__scrollable-container');
          
          if (existingTable || existingScrollable) {
            // console.log('🟣 [CHECK] Destruyendo tabla existente...');
            
            if (tableInstance) {
              try {
                tableInstance.destroy();
              } catch (e) {
                // Silenciar errores de destrucción
              }
              tableInstance = null;
            }
            
            if (existingScrollable) {
              existingScrollable.remove();
            } else if (existingTable) {
              existingTable.remove();
            }
            
            // Reconstruir columnas y opciones con los nuevos argumentos
            const newColumns = buildColumnsFromArgs();
            options.columns = newColumns;
            
            // Recrear la tabla con los nuevos argumentos
            setTimeout(() => {
              checkAndCreateTable();
            }, 50);
          }
        }
      } catch (error) {
        // Silenciar errores en el interval para evitar ruido en consola
      }
    }, 100);
    
    // Limpiar interval cuando se destruye el componente
    const cleanup = () => {
      try {
        clearInterval(checkArgsInterval);
        if (tableInstance) {
          try {
            tableInstance.destroy();
          } catch (e) {
            // Ignorar errores
          }
        }
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      } catch (error) {
        // Silenciar errores de limpieza
      }
    };
    
    // Usar MutationObserver para detectar cuando el container se elimina
    let observer: MutationObserver | null = null;
    try {
      observer = new MutationObserver(() => {
        try {
          if (!document.body.contains(container)) {
            cleanup();
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        } catch (error) {
          // Silenciar errores del observer
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (error) {
      // Silenciar errores al crear el observer
    }

    return container;
  },
  args: {
    // Valores por defecto coinciden con la web
    columnReorderable: true,
    rowReorderable: true,
    rowExpandable: true,
    columnSortable: true,
    showCheckbox: true,
    showVerticalScrollbar: true,
    showHorizontalScrollbar: true,
    showColumnMenu: true,
    showContextMenu: true,
    checkboxSticky: false,
    dragHandleSticky: false,
    expandSticky: false,
    columnsCount: 7, // Coincide con Implementation (7 columnas por defecto)
    columnType1: 'nombre', // Coincide con la web (nombre simple, no nombre-avatar)
    columnType2: 'correo',
    columnType3: 'estado',
    columnType4: 'nombre', // Cambiado de 'progreso' para que coincida mejor
    column1AvatarVariant: 'initials',
    column1Editable: false,
    column2EmailClickable: true,
    column3Editable: false,
    column3RadioLabel: false,
    column3ToggleLabel: false,
    column3CheckboxLabel: false,
    showPagination: false,
    currentPage: 1,
    itemsPerPage: 10,
    paginationVariant: 'default',
    paginationSize: 'md',
    // Controles del header
    headerTitle: 'Lista de elementos',
    showHeaderTitle: true,
    headerCounter: true,
    // Los valores de displayedItems y totalItems se calcularán dinámicamente basándose en rows.length
    // No establecer valores por defecto para que siempre use la cantidad real de items
    showHeaderPrimaryButton: true,
    headerPrimaryButtonText: 'Nuevo',
    showHeaderSecondaryButtons: true,
    showHeaderSearchButton: true,
    showHeaderFilterButton: true,
    showHeaderColumnSelectorButton: true
}
};

/**
 * Historia: Reordenamiento de Columnas
 * 
 * Esta historia demuestra cómo funciona el reordenamiento de columnas mediante drag & drop.
 * Para reordenar una columna, simplemente arrastra el header de la columna y suéltala en la posición deseada.
 */
export const ColumnReorderable: Story = {
  render: (args) => {
    const renderId = `story-render-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-column-reorder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples para demostrar el reordenamiento
    const columns: TableColumn[] = [
      { id: 'nombre-col1', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email-col2', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado-col3', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais-col4', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha-col5', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: true, // Habilitar reordenamiento de columnas
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Reordenamiento de Columnas',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onColumnReorder: (columnIds: string[]) => {
        console.log('🔄 Columnas reordenadas:', columnIds);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el reordenamiento de columnas mediante drag & drop. Para reordenar una columna, arrastra el header de la columna y suéltala en la posición deseada. El callback `onColumnReorder` se ejecuta cuando se completa el reordenamiento.'
      }
    }
  },
  args: {
    columnReorderable: true,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Reordenamiento de Filas
 * 
 * Esta historia demuestra cómo funciona el reordenamiento de filas mediante drag & drop.
 * Para reordenar una fila, arrastra el icono de drag-handle (⋮⋮) y suéltala en la posición deseada.
 */
export const RowReorderable: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-row-reorder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples para demostrar el reordenamiento de filas
    const columns: TableColumn[] = [
      { id: 'nombre-col1', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email-col2', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado-col3', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais-col4', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha-col5', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: true, // Habilitar reordenamiento de filas
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Reordenamiento de Filas',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onRowReorder: (rowIds: (string | number)[]) => {
        console.log('🔄 Filas reordenadas:', rowIds);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el reordenamiento de filas mediante drag & drop. Para reordenar una fila, arrastra el icono de drag-handle (⋮⋮) que aparece en la primera columna y suéltala en la posición deseada. El callback `onRowReorder` se ejecuta cuando se completa el reordenamiento, recibiendo el nuevo orden de los IDs de las filas.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: true,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Filas Expandibles
 * 
 * Esta historia demuestra cómo funcionan las filas expandibles.
 * Cada fila tiene un icono de expandir/colapsar que permite mostrar contenido adicional.
 */
export const RowExpandable: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-row-expandable-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo con contenido expandible
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 8; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          },
          expanded: false,
          renderExpandedContent: (data: any) => {
            return `
              <div style="padding: 16px; background: var(--ubits-bg-2); border-radius: 8px;">
                <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: var(--ubits-fg-1-high);">
                  Detalles adicionales de ${data.nombre}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px;">
                  <div>
                    <strong style="color: var(--ubits-fg-1-medium);">Email:</strong>
                    <div style="color: var(--ubits-fg-1-high); margin-top: 4px;">${data.email}</div>
                  </div>
                  <div>
                    <strong style="color: var(--ubits-fg-1-medium);">País:</strong>
                    <div style="color: var(--ubits-fg-1-high); margin-top: 4px;">${data.pais}</div>
                  </div>
                  <div>
                    <strong style="color: var(--ubits-fg-1-medium);">Estado:</strong>
                    <div style="color: var(--ubits-fg-1-high); margin-top: 4px;">${data.estado}</div>
                  </div>
                  <div>
                    <strong style="color: var(--ubits-fg-1-medium);">Fecha de registro:</strong>
                    <div style="color: var(--ubits-fg-1-high); margin-top: 4px;">${data.fecha}</div>
                  </div>
                </div>
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--ubits-border-1);">
                  <p style="margin: 0; font-size: 13px; color: var(--ubits-fg-1-medium);">
                    Este es un ejemplo de contenido expandible. Puedes incluir cualquier HTML personalizado aquí.
                  </p>
                </div>
              </div>
            `;
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples para demostrar filas expandibles
    const columns: TableColumn[] = [
      { id: 'nombre-col1', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email-col2', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado-col3', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais-col4', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha-col5', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: true, // Habilitar filas expandibles
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Filas Expandibles',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onRowExpand: (rowId: string | number, expanded: boolean) => {
        console.log(`🔄 Fila ${rowId} ${expanded ? 'expandida' : 'colapsada'}`);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funcionan las filas expandibles. Cada fila tiene un icono de expandir/colapsar (▶/▼) que permite mostrar contenido adicional. El contenido expandible se define mediante la función `renderExpandedContent` en cada fila. El callback `onRowExpand` se ejecuta cuando una fila se expande o colapsa, recibiendo el ID de la fila y el estado (expandida/colapsada).'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: true,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Ordenamiento de Columnas
 * 
 * Esta historia demuestra cómo funciona el ordenamiento de columnas.
 * Cada columna ordenable muestra iconos de flecha (↑↓) en el header para ordenar ascendente o descendente.
 */
export const ColumnSortable: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-column-sortable-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo con variación para demostrar ordenamiento
    const generateRows = (): TableRow[] => {
      const nombres = ['Ana', 'Carlos', 'Beatriz', 'Diego', 'Elena', 'Fernando', 'Gabriela', 'Hugo', 'Isabel', 'Juan'];
      const paises = ['Colombia', 'México', 'Argentina', 'Chile', 'Perú', 'Ecuador', 'Venezuela', 'Uruguay', 'Paraguay', 'Bolivia'];
      const estados = ['activo', 'pendiente', 'inactivo'];
      
      const rows: TableRow[] = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          id: i + 1,
          data: {
            nombre: nombres[i],
            email: `${nombres[i].toLowerCase()}@ejemplo.com`,
            estado: estados[i % 3],
            pais: paises[i],
            fecha: new Date(2024, 0, i + 1).toISOString().split('T')[0],
            edad: 20 + (i * 3)
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas con diferentes tipos para demostrar ordenamiento
    // Usar IDs base (sin sufijo) para que el ordenamiento funcione correctamente
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: true, // Habilitar ordenamiento de columnas
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Ordenamiento de Columnas',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onSort: (columnId: string, direction: 'asc' | 'desc') => {
        console.log(`🔄 Columna ${columnId} ordenada: ${direction === 'asc' ? 'ascendente' : 'descendente'}`);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el ordenamiento de columnas. Cada columna ordenable muestra iconos de flecha (↑↓) en el header. Al hacer click en el header de una columna, se ordena ascendente (↑), y al hacer click nuevamente se ordena descendente (↓). El callback `onSort` se ejecuta cuando se ordena una columna, recibiendo el ID de la columna y la dirección del ordenamiento (asc/desc).'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: true,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Selección Múltiple con Checkbox
 * 
 * Esta historia demuestra cómo funciona la selección múltiple de filas mediante checkboxes.
 * Cada fila tiene un checkbox y hay un checkbox maestro en el header para seleccionar todas las filas.
 */
export const CheckboxSelection: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-checkbox-selection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            'checkbox-2': false // Estado inicial del checkbox
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples para demostrar selección múltiple
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: true, // Habilitar selección múltiple con checkbox
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Selección Múltiple con Checkbox',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
        
        // Agregar listener para detectar cambios en los checkboxes
        setTimeout(() => {
          const checkboxes = containerElement.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"]');
          checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
              const target = e.target as HTMLInputElement;
              const rowId = target.getAttribute('data-row-id');
              console.log(`☑️ Checkbox de fila ${rowId} ${target.checked ? 'marcado' : 'desmarcado'}`);
            });
          });
          
          // Listener para el checkbox maestro
          const masterCheckbox = containerElement.querySelector('input[type="checkbox"][data-column-checkbox-header="true"]');
          if (masterCheckbox) {
            masterCheckbox.addEventListener('change', (e) => {
              const target = e.target as HTMLInputElement;
              console.log(`☑️ Checkbox maestro ${target.checked ? 'marcado - todas las filas seleccionadas' : 'desmarcado - todas las filas deseleccionadas'}`);
            });
          }
        }, 100);
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona la selección múltiple de filas mediante checkboxes. Cada fila tiene un checkbox en la primera columna, y hay un checkbox maestro en el header que permite seleccionar/deseleccionar todas las filas de una vez. El estado de los checkboxes se almacena en `row.data[\'checkbox-2\']`. Puedes escuchar los cambios mediante event listeners en los elementos checkbox del DOM.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: true,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Scroll Vertical
 * 
 * Esta historia demuestra cómo funciona el scroll vertical en la tabla.
 * Cuando hay muchas filas, el scroll vertical permite navegar por todas ellas sin que la tabla ocupe todo el espacio disponible.
 */
export const VerticalScroll: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: 400px;
      height: 500px;
      overflow: visible !important;
      max-height: 500px !important;
    `;
    
    const tableContainerId = `data-table-vertical-scroll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 100%;
      overflow: visible !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar muchas filas para demostrar el scroll vertical
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      const nombres = ['Ana', 'Carlos', 'Beatriz', 'Diego', 'Elena', 'Fernando', 'Gabriela', 'Hugo', 'Isabel', 'Juan'];
      const paises = ['Colombia', 'México', 'Argentina', 'Chile', 'Perú', 'Ecuador', 'Venezuela', 'Uruguay', 'Paraguay', 'Bolivia'];
      const estados = ['activo', 'pendiente', 'inactivo'];
      
      for (let i = 1; i <= 50; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `${nombres[i % 10]} ${i}`,
            email: `${nombres[i % 10].toLowerCase()}${i}@ejemplo.com`,
            estado: estados[i % 3],
            pais: paises[i % 10],
            fecha: new Date(2024, 0, (i % 28) + 1).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: true, // Habilitar scroll vertical
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Scroll Vertical',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el scroll vertical en la tabla. Cuando `showVerticalScrollbar` está habilitado, la tabla muestra un scrollbar vertical que permite navegar por todas las filas cuando el contenido excede la altura disponible. El contenedor de la tabla tiene una altura limitada (500px en este ejemplo) y el scroll vertical permite ver todas las 50 filas sin que la tabla ocupe todo el espacio disponible.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: true,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Scroll Horizontal
 * 
 * Esta historia demuestra cómo funciona el scroll horizontal en la tabla.
 * Cuando hay muchas columnas o columnas anchas, el scroll horizontal permite navegar por todas ellas sin que la tabla se comprima.
 */
export const HorizontalScroll: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-horizontal-scroll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`,
            ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][i % 5],
            departamento: ['Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Bolívar'][i % 5],
            cargo: ['Desarrollador', 'Diseñador', 'Product Manager', 'QA', 'DevOps'][i % 5]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Muchas columnas anchas para demostrar el scroll horizontal
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre Completo', type: 'nombre', width: 200 },
      { id: 'email', title: 'Correo Electrónico', type: 'correo', width: 250 },
      { id: 'telefono', title: 'Teléfono de Contacto', type: 'telefono', width: 180 },
      { id: 'estado', title: 'Estado del Usuario', type: 'estado', width: 150 },
      { id: 'pais', title: 'País de Residencia', type: 'pais', width: 150 },
      { id: 'ciudad', title: 'Ciudad', type: 'texto', width: 150 },
      { id: 'departamento', title: 'Departamento', type: 'texto', width: 180 },
      { id: 'cargo', title: 'Cargo en la Empresa', type: 'texto', width: 200 },
      { id: 'fecha', title: 'Fecha de Registro', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: true, // Habilitar scroll horizontal
      showColumnMenu: false,
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Scroll Horizontal',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el scroll horizontal en la tabla. Cuando `showHorizontalScrollbar` está habilitado y el contenido de la tabla es más ancho que el contenedor, aparece un scrollbar horizontal que permite navegar por todas las columnas. El contenedor tiene un ancho limitado (600px en este ejemplo) y la tabla tiene 9 columnas anchas, lo que fuerza el scroll horizontal para ver todas las columnas.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: true,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Menú de Columnas
 * 
 * Esta historia demuestra cómo funciona el menú de columnas (botón de 3 puntos).
 * El menú permite fijar/desfijar columnas para que permanezcan visibles al hacer scroll horizontal.
 */
export const ColumnMenu: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-column-menu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 600px;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`,
            ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][i % 5]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas para demostrar el menú de columnas
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email', title: 'Email', type: 'correo', width: 250 },
      { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'ciudad', title: 'Ciudad', type: 'texto', width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: true, // Habilitar scroll horizontal para ver el efecto de fijar columnas
      showColumnMenu: true, // Habilitar menú de columnas
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Menú de Columnas',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onColumnPin: (columnId: string, pinned: boolean) => {
        console.log(`📌 Columna ${columnId} ${pinned ? 'fijada' : 'desfijada'}`);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el menú de columnas. Cada header de columna tiene un botón de menú (3 puntos) que al hacer click muestra un dropdown con la opción de fijar/desfijar la columna. Cuando una columna está fijada (pinned), permanece visible al hacer scroll horizontal. El callback `onColumnPin` se ejecuta cuando se fija o desfija una columna, recibiendo el ID de la columna y el estado (pinned: true/false).'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: true,
    showColumnMenu: true,
    showContextMenu: false,
    showPagination: false
  }
};

/**
 * Historia: Menú Contextual
 * 
 * Esta historia demuestra cómo funciona el menú contextual (click derecho) en las filas.
 * El menú contextual muestra acciones disponibles para cada fila (ver, editar, eliminar, etc.).
 */
export const ContextMenu: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-context-menu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      height: 600px;
      overflow: auto;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas simples para demostrar el menú contextual
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
      { id: 'email', title: 'Email', type: 'correo', width: 250 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: false,
      showColumnMenu: false,
      showContextMenu: true, // Habilitar menú contextual
      showPagination: false,
      header: {
        title: 'Menú Contextual',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onRowAction: (rowId: string | number, row: TableRow) => {
        console.log(`🖱️ Acción ejecutada en fila ${rowId}:`, row.data);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funciona el menú contextual en las filas. Cuando `showContextMenu` está habilitado, puedes hacer click derecho en cualquier fila para abrir un menú contextual con acciones disponibles (ver, editar, eliminar, etc.). El callback `onRowAction` se ejecuta cuando se selecciona una acción del menú, recibiendo el ID de la fila y los datos completos de la fila.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: false,
    showContextMenu: true,
    showPagination: false
  }
};

/**
 * Historia: Columnas Fijadas (Pinned)
 * 
 * Esta historia demuestra cómo funcionan las columnas fijadas.
 * Las columnas fijadas permanecen visibles al hacer scroll horizontal, útil para mantener información importante siempre visible.
 */
export const LazyLoad: Story = {
  render: (args) => {
    console.log('🟢 [LAZY LOAD STORY] Iniciando render...');
    
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-lazy-load-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('🟡 [LAZY LOAD STORY] Container ID:', tableContainerId);
    
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      height: 500px; /* Altura fija para que se active el scroll */
      overflow: hidden !important; /* CRÍTICO: Ocultar overflow para que el scrollable container maneje el scroll */
      min-height: 500px;
      max-height: 500px;
      display: flex;
      flex-direction: column;
    `;
    
    container.appendChild(tableContainer);
    console.log('🟡 [LAZY LOAD STORY] Container agregado al DOM');
    
    // Generar muchos datos para que se vea el efecto de lazy load
    const generateRows = (): TableRow[] => {
      console.log('🟡 [LAZY LOAD STORY] Generando 100 filas...');
      const rows: TableRow[] = [];
      for (let i = 1; i <= 100; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`
          }
        });
      }
      console.log('✅ [LAZY LOAD STORY] Filas generadas:', rows.length);
      return rows;
    };
    
    requestAnimationFrame(() => {
      console.log('🟡 [LAZY LOAD STORY] requestAnimationFrame ejecutado');
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        console.log('✅ [LAZY LOAD STORY] Container encontrado en el DOM');
        
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 },
          { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 }
        ];
        
        console.log('🟡 [LAZY LOAD STORY] Configurando opciones:');
        console.log('  - lazyLoad: true');
        console.log('  - lazyLoadItemsPerBatch: 15');
        console.log('  - showVerticalScrollbar: true');
        console.log('  - showPagination: false');
        console.log('  - Total rows:', rows.length);
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          lazyLoad: true, // Habilitar lazy load
          lazyLoadItemsPerBatch: 15, // Cargar 15 items por batch
          showVerticalScrollbar: true, // Necesario para que funcione el scroll
          showPagination: false, // Deshabilitar paginación (lazy load se activa automáticamente)
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          onLazyLoad: (loadedItems: number, totalItems: number) => {
            console.log(`📦 [LAZY LOAD CALLBACK] ${loadedItems}/${totalItems} items cargados`);
          }
        };
        
        console.log('🟡 [LAZY LOAD STORY] Creando instancia de DataTable...');
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
        console.log('✅ [LAZY LOAD STORY] DataTable creado');
        
        // Verificar después de un delay que el scrollable container existe
        setTimeout(() => {
          const scrollableContainer = containerElement.querySelector('.ubits-data-table__scrollable-container') as HTMLElement;
          if (scrollableContainer) {
            console.log('✅ [LAZY LOAD STORY] Scrollable container encontrado');
            console.log('  - Height:', scrollableContainer.offsetHeight);
            console.log('  - ScrollHeight:', scrollableContainer.scrollHeight);
            console.log('  - ClientHeight:', scrollableContainer.clientHeight);
            
            // Verificar si hay scroll listeners
            const hasScrollListener = scrollableContainer.getAttribute('data-lazy-load-listener');
            console.log('  - Tiene listener de scroll:', hasScrollListener ? 'Sí' : 'No');
            
            // Agregar listener manual para debug
            scrollableContainer.addEventListener('scroll', () => {
              const scrollTop = scrollableContainer.scrollTop;
              const scrollHeight = scrollableContainer.scrollHeight;
              const clientHeight = scrollableContainer.clientHeight;
              const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
              
              console.log('📜 [SCROLL DEBUG]', {
                scrollTop,
                scrollHeight,
                clientHeight,
                scrollPercentage: (scrollPercentage * 100).toFixed(2) + '%',
                nearEnd: scrollPercentage >= 0.8
              });
            }, { passive: true });
            
            console.log('✅ [LAZY LOAD STORY] Listener de scroll de debug agregado');
          } else {
            console.error('❌ [LAZY LOAD STORY] Scrollable container NO encontrado');
          }
        }, 500);
      } else {
        console.error('❌ [LAZY LOAD STORY] Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    lazyLoad: true,
    lazyLoadItemsPerBatch: 15,
    showVerticalScrollbar: true,
    showPagination: false,
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de lazy load (carga incremental/infinite scroll). Al hacer scroll hacia abajo, se cargan automáticamente más items en lotes de 15. La tabla tiene 100 items en total y carga inicialmente 15 items.'
      }
    }
  }
};

export const Pagination: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-pagination-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar más datos para que se vea el efecto de paginación
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 50; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 },
          { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showPagination: true,
          currentPage: 1,
          itemsPerPage: 10, // Mostrar 10 items por página para que se vea el efecto
          paginationVariant: 'default',
          paginationSize: 'md',
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          onPageChange: (page: number) => {
            console.log('📄 Página cambiada a:', page);
          },
          onItemsPerPageChange: (itemsPerPage: number) => {
            console.log('📊 Items por página cambiados a:', itemsPerPage);
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showPagination: true,
    currentPage: 1,
    itemsPerPage: 10,
    paginationVariant: 'default',
    paginationSize: 'md',
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de paginación de la tabla. Permite navegar entre páginas usando los botones Anterior/Siguiente. La tabla muestra 10 items por página de un total de 50 items.'
      }
    }
  }
};

export const StickyControls: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-sticky-controls-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 15; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`,
            ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][i % 5],
            departamento: ['Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Bolívar'][i % 5],
            cargo: ['Desarrollador', 'Diseñador', 'Product Manager', 'QA', 'DevOps'][i % 5],
            salario: `$${(50000 + i * 1000).toLocaleString()}`,
            experiencia: `${i} años`
          },
          renderExpandedContent: (rowData: any) => {
            return `
              <div style="padding: 16px; background: var(--modifiers-normal-color-light-bg-2);">
                <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Detalles adicionales</h4>
                <p style="margin: 4px 0; font-size: 12px;"><strong>Ciudad:</strong> ${rowData.ciudad}</p>
                <p style="margin: 4px 0; font-size: 12px;"><strong>Departamento:</strong> ${rowData.departamento}</p>
                <p style="margin: 4px 0; font-size: 12px;"><strong>Cargo:</strong> ${rowData.cargo}</p>
                <p style="margin: 4px 0; font-size: 12px;"><strong>Salario:</strong> ${rowData.salario}</p>
                <p style="margin: 4px 0; font-size: 12px;"><strong>Experiencia:</strong> ${rowData.experiencia}</p>
              </div>
            `;
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 },
          { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 },
          { id: 'ciudad', title: 'Ciudad', type: 'texto', width: 150 },
          { id: 'departamento', title: 'Departamento', type: 'texto', width: 180 },
          { id: 'cargo', title: 'Cargo', type: 'texto', width: 200 },
          { id: 'salario', title: 'Salario', type: 'texto', width: 150 },
          { id: 'experiencia', title: 'Experiencia', type: 'texto', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: true,
          checkboxSticky: true, // Checkbox sticky
          rowReorderable: true,
          dragHandleSticky: true, // Drag handle sticky
          rowExpandable: true,
          expandSticky: true, // Expand sticky
          showHorizontalScrollbar: true, // Necesario para ver el efecto sticky
          showColumnMenu: false,
          onRowReorder: (rowIds: (string | number)[]) => {
            console.log('🔄 Filas reordenadas:', rowIds);
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: true,
    checkboxSticky: true,
    rowReorderable: true,
    dragHandleSticky: true,
    rowExpandable: true,
    expandSticky: true,
    showHorizontalScrollbar: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra los controles sticky (checkbox, drag-handle, expand) que permanecen fijos al hacer scroll horizontal. Los controles se mantienen visibles mientras navegas por las columnas de la tabla.'
      }
    }
  }
};

export const ActionBar: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-action-bar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 20; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    // Estado de selecciones para la action bar
    const selectionState: {
      selectedRowIds: Set<string | number>;
      viewSelectedActive: boolean;
    } = {
      selectedRowIds: new Set(),
      viewSelectedActive: false
    };
    
    // Referencia al elemento de la tabla
    let tableElement: HTMLElement | null = null;
    let tableInstance: ReturnType<typeof createDataTable> | null = null;
    let originalRows: TableRow[] = [];
    
    // Función para renderizar la barra de acciones
    const renderActionBar = () => {
      console.log('🔵 [ACTION BAR RENDER] Iniciando renderActionBar...');
      console.log('  - tableElement existe:', !!tableElement);
      
      if (!tableElement) {
        console.error('❌ [ACTION BAR RENDER] tableElement no está disponible');
        return;
      }
      
      // Buscar el contenedor de la tabla (ubits-data-table__container)
      const dataTableContainer = tableElement.querySelector('.ubits-data-table__container') as HTMLElement;
      console.log('  - dataTableContainer encontrado:', !!dataTableContainer);
      
      if (!dataTableContainer) {
        console.error('❌ [ACTION BAR RENDER] No se encontró .ubits-data-table__container');
        console.log('  - tableElement.innerHTML (primeros 500 chars):', tableElement.innerHTML.substring(0, 500));
        return;
      }
      
      const header = dataTableContainer.querySelector('.ubits-data-table__header');
      console.log('  - header encontrado:', !!header);
      
      if (!header) {
        console.error('❌ [ACTION BAR RENDER] No se encontró .ubits-data-table__header');
        console.log('  - dataTableContainer.innerHTML (primeros 500 chars):', dataTableContainer.innerHTML.substring(0, 500));
        return;
      }
      
      // Buscar barra existente
      let actionBar = dataTableContainer.querySelector('.ubits-data-table__action-bar') as HTMLElement;
      console.log('  - actionBar existente encontrada:', !!actionBar);
      
      // Si no existe, crearla
      if (!actionBar) {
        console.log('  - Creando nueva actionBar...');
        actionBar = document.createElement('div');
        actionBar.className = 'ubits-data-table__action-bar';
        actionBar.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          gap: var(--ubits-spacing-xs);
        `;
        header.insertAdjacentElement('afterend', actionBar);
        console.log('✅ [ACTION BAR RENDER] Barra de acciones creada e insertada');
      }
      
      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);
      console.log('  - selectedCount:', selectedCount);
      console.log('  - selectedIds:', selectedIds);
      
      // Ocultar la barra si no hay selecciones
      if (selectedCount === 0) {
        console.log('  - Ocultando barra (no hay selecciones)');
        actionBar.style.display = 'none';
        return;
      }
      
      // Mostrar la barra cuando hay selecciones
      console.log('  - Mostrando barra (hay selecciones)');
      actionBar.style.display = 'flex';
      
      const countText = `(${selectedCount})`;
      const isMultipleSelection = selectedCount > 1;
      
      // Estado del botón "Ver seleccionados"
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive
        ? `Dejar de ver seleccionados ${countText}`
        : `Ver seleccionados ${countText}`;
      // Cambiar icono según el estado: eye cuando inactivo, eye-slash cuando activo
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      
      // renderButton ya está importado al inicio del archivo
      let buttonsHTML = '';
      
      // Botón "Ver seleccionados" (siempre visible) - único con icono y texto, estado active cuando está activo
      buttonsHTML += renderButton({
        text: viewSelectedText,
        variant: 'secondary',
        size: 'sm',
        icon: viewSelectedIcon, // Cambia según el estado
        iconStyle: 'regular',
        active: isViewSelectedActive, // Estado active cuando está activo
        className: 'ubits-data-table__action-bar-button',
        attributes: {
          id: 'action-btn-view-selected'
        }
      });
      
      // Botón "Notificaciones" (solo múltiple selección) - secondary solo icono
      if (isMultipleSelection) {
        buttonsHTML += renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'bell',
          iconStyle: 'regular',
          iconOnly: true, // Solo icono, sin texto
          className: 'ubits-data-table__action-bar-button',
          attributes: {
            id: 'action-btn-notifications'
          }
        });
      }
      
      // Botones para selección individual (solo si hay 1 selección) - secondary solo icono
      if (!isMultipleSelection) {
        buttonsHTML += renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'copy',
          iconStyle: 'regular',
          iconOnly: true, // Solo icono, sin texto
          className: 'ubits-data-table__action-bar-button',
          attributes: {
            id: 'action-btn-copy'
          }
        });
        
        buttonsHTML += renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'eye',
          iconStyle: 'regular',
          iconOnly: true, // Solo icono, sin texto
          className: 'ubits-data-table__action-bar-button',
          attributes: {
            id: 'action-btn-view'
          }
        });
        
        buttonsHTML += renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'edit',
          iconStyle: 'regular',
          iconOnly: true, // Solo icono, sin texto
          className: 'ubits-data-table__action-bar-button',
          attributes: {
            id: 'action-btn-edit'
          }
        });
        
        buttonsHTML += renderButton({
          variant: 'secondary',
          size: 'sm',
          icon: 'download',
          iconStyle: 'regular',
          iconOnly: true, // Solo icono, sin texto
          className: 'ubits-data-table__action-bar-button',
          attributes: {
            id: 'action-btn-download'
          }
        });
      }
      
      // Botón "Eliminar" (siempre visible) - secondary solo icono
      buttonsHTML += renderButton({
        variant: 'secondary',
        size: 'sm',
        icon: 'trash',
        iconStyle: 'regular',
        iconOnly: true, // Solo icono, sin texto
        className: 'ubits-data-table__action-bar-button',
        attributes: {
          id: 'action-btn-delete'
        }
      });
      
      actionBar.innerHTML = buttonsHTML;
      
      // Agregar listeners
      const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
      if (viewSelectedBtn) {
        viewSelectedBtn.addEventListener('click', () => {
          selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
          console.log('👁️ [VIEW SELECTED] Cambiando estado:', selectionState.viewSelectedActive);
          
          // Filtrar filas según el estado
          if (tableInstance && originalRows.length > 0) {
            if (selectionState.viewSelectedActive) {
              // Mostrar solo las filas seleccionadas
              const filteredRows = originalRows.filter(row => 
                selectionState.selectedRowIds.has(row.id)
              );
              console.log('👁️ [VIEW SELECTED] Filtrando a', filteredRows.length, 'filas seleccionadas');
              tableInstance.update({ rows: filteredRows });
            } else {
              // Mostrar todas las filas originales
              console.log('👁️ [VIEW SELECTED] Mostrando todas las', originalRows.length, 'filas');
              tableInstance.update({ rows: originalRows });
            }
          }
          
          renderActionBar();
        });
      }
      
      // Otros botones
      ['notifications', 'copy', 'view', 'edit', 'download', 'delete'].forEach(action => {
        const btn = actionBar.querySelector(`#action-btn-${action}`);
        if (btn) {
          btn.addEventListener('click', () => {
            console.log(`🔘 Acción: ${action}`, selectedIds);
            alert(`Acción "${action}" para ${selectedCount} elemento(s) seleccionado(s)`);
          });
        }
      });
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: true, // Necesario para la action bar
          showColumnMenu: false,
          showContextMenu: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true
          },
          onRowSelect: (rowId, selected) => {
            console.log('🔘 [ACTION BAR CALLBACK] onRowSelect llamado');
            console.log('  - rowId:', rowId);
            console.log('  - selected:', selected);
            console.log('  - selectionState antes:', Array.from(selectionState.selectedRowIds));
            
            // Actualizar estado de selección
            if (selected) {
              selectionState.selectedRowIds.add(rowId);
            } else {
              selectionState.selectedRowIds.delete(rowId);
            }
            
            console.log('  - selectionState después:', Array.from(selectionState.selectedRowIds));
            console.log('  - Llamando renderActionBar...');
            
            // Actualizar barra de acciones
            renderActionBar();
          },
          onSelectAll: (selected) => {
            console.log('🔘 [ACTION BAR CALLBACK] onSelectAll llamado');
            console.log('  - selected:', selected);
            console.log('  - tableElement existe:', !!tableElement);
            
            // Actualizar estado de selección - todas las filas visibles
            if (tableElement) {
              const table = tableElement.querySelector('.ubits-data-table');
              console.log('  - table encontrado:', !!table);
              
              if (table) {
                const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
                console.log('  - checkboxes encontrados:', checkboxes.length);
                
                checkboxes.forEach((cb) => {
                  const rowIdStr = (cb as HTMLInputElement).getAttribute('data-row-id');
                  if (rowIdStr) {
                    const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                    if (selected) {
                      selectionState.selectedRowIds.add(rowId);
                    } else {
                      selectionState.selectedRowIds.delete(rowId);
                    }
                  }
                });
              }
            }
            
            console.log('  - selectionState después:', Array.from(selectionState.selectedRowIds));
            console.log('  - Llamando renderActionBar...');
            
            // Actualizar barra de acciones
            renderActionBar();
          }
        };
        
        console.log('🟡 [ACTION BAR INIT] Creando tabla...');
        tableInstance = createDataTable(options);
        tableElement = tableInstance.element; // Guardar referencia al elemento de la tabla
        originalRows = [...rows]; // Guardar copia de las filas originales
        (window as any).__storybookDataTableInstance = tableInstance;
        
        console.log('✅ [ACTION BAR INIT] Tabla creada');
        console.log('  - tableElement:', tableElement);
        console.log('  - tableElement.className:', tableElement.className);
        console.log('  - tableElement tiene .ubits-data-table__container:', !!tableElement.querySelector('.ubits-data-table__container'));
        
        // Renderizar action bar inicialmente (estará oculta hasta que haya selecciones)
        setTimeout(() => {
          console.log('🟡 [ACTION BAR INIT] Llamando renderActionBar inicial...');
          renderActionBar();
        }, 200);
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: true,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la barra de acciones que aparece cuando se seleccionan filas. La barra muestra diferentes botones según si hay una o múltiples selecciones. Para selección individual: Ver seleccionados, Copiar, Ver, Editar, Descargar, Eliminar. Para selección múltiple: Ver seleccionados, Notificaciones, Eliminar. Selecciona filas usando los checkboxes para ver la barra de acciones.'
      }
    }
  }
};

export const ColumnSelector: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-column-selector-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 20; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`,
            ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][i % 5],
            departamento: ['Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Bolívar'][i % 5]
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 },
          { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 },
          { id: 'ciudad', title: 'Ciudad', type: 'texto', width: 150 },
          { id: 'departamento', title: 'Departamento', type: 'texto', width: 180 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true,
            columnSelectorButton: {
              onClick: (event: MouseEvent) => {
                console.log('🔘 Click en selector de columnas');
              }
            },
            showColumnSelectorButton: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de selector de columnas. El header incluye un botón que abre un dropdown con checkboxes para mostrar/ocultar columnas. Puedes seleccionar qué columnas quieres ver en la tabla. Las columnas ocultas se pueden volver a mostrar desde el selector.'
      }
    }
  }
};

export const Filters: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-filters-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo con variedad para que los filtros sean útiles
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      const estados = ['activo', 'pendiente', 'inactivo'];
      const paises = ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'];
      
      for (let i = 1; i <= 30; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: estados[i % estados.length],
            pais: paises[i % paises.length],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true, // El contador se actualizará automáticamente con los resultados filtrados
            showCounter: true,
            filterButton: {
              filters: [
                {
                  id: 'estado-filter',
                  label: 'Estado',
                  columnId: 'estado',
                  type: 'select',
                  options: [
                    { value: 'activo', label: 'Activo' },
                    { value: 'pendiente', label: 'Pendiente' },
                    { value: 'inactivo', label: 'Inactivo' }
                  ]
                },
                {
                  id: 'pais-filter',
                  label: 'País',
                  columnId: 'pais',
                  type: 'select',
                  options: [
                    { value: 'Colombia', label: 'Colombia' },
                    { value: 'México', label: 'México' },
                    { value: 'Argentina', label: 'Argentina' },
                    { value: 'Chile', label: 'Chile' },
                    { value: 'Perú', label: 'Perú' }
                  ]
                },
                {
                  id: 'nombre-filter',
                  label: 'Nombre',
                  columnId: 'nombre',
                  type: 'text'
                }
              ],
              onApplyFilters: (filters: Record<string, string>) => {
                console.log('🔍 Filtros aplicados:', filters);
              },
              onClearFilters: () => {
                console.log('🧹 Filtros limpiados');
              }
            },
            showFilterButton: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de filtros de columnas. El header incluye un botón de filtros que abre un drawer con opciones de filtrado. Se pueden filtrar por Estado (select), País (select) y Nombre (text). El contador se actualiza automáticamente para mostrar la cantidad de resultados filtrados. El botón muestra un badge con el número de filtros activos.'
      }
    }
  }
};

export const Search: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo con más variedad para que la búsqueda sea útil
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      const nombres = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Pedro Rodríguez', 'Laura Sánchez', 'Diego Fernández', 'Sofía González', 'Luis Hernández', 'Carmen Díaz'];
      const estados = ['activo', 'pendiente', 'inactivo'];
      const paises = ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'];
      
      for (let i = 1; i <= 30; i++) {
        rows.push({
          id: i,
          data: {
            nombre: nombres[i % nombres.length] + ` ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: estados[i % estados.length],
            pais: paises[i % paises.length],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true, // El contador se actualizará automáticamente con los resultados filtrados
            showCounter: true,
            searchButton: {
              placeholder: 'Buscar usuarios...',
              onSearch: (searchTerm: string, filteredRows: TableRow[]) => {
                console.log('🔍 Búsqueda realizada:', searchTerm);
                console.log('📊 Resultados encontrados:', filteredRows.length);
              }
            },
            showSearchButton: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de búsqueda en la tabla. El header incluye un campo de búsqueda que filtra las filas en tiempo real según el texto ingresado. El contador se actualiza automáticamente para mostrar la cantidad de resultados encontrados.'
      }
    }
  }
};

export const Header: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-header-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 25; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0]
          }
        });
      }
      return rows;
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true, // Mostrar contador automático "X/Y resultados"
            showCounter: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra el header de la tabla con título y contador. El header muestra el título "Usuarios" y un contador que indica la cantidad de resultados (ej: "25 resultados").'
      }
    }
  }
};

export const PinnedColumns: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-pinned-columns-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 600px;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(tableContainer);
    
    // Generar datos de ejemplo
    const generateRows = (): TableRow[] => {
      const rows: TableRow[] = [];
      for (let i = 1; i <= 10; i++) {
        rows.push({
          id: i,
          data: {
            nombre: `Usuario ${i}`,
            email: `usuario${i}@ejemplo.com`,
            estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
            pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5],
            fecha: new Date(2024, 0, i).toISOString().split('T')[0],
            telefono: `+57 300 ${i.toString().padStart(7, '0')}`,
            ciudad: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'][i % 5],
            departamento: ['Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Bolívar'][i % 5],
            cargo: ['Desarrollador', 'Diseñador', 'Product Manager', 'QA', 'DevOps'][i % 5]
          }
        });
      }
      return rows;
    };
    
    const rows = generateRows();
    
    // Columnas con algunas fijadas para demostrar el efecto
    const columns: TableColumn[] = [
      { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200, pinned: true }, // Columna fijada
      { id: 'email', title: 'Email', type: 'correo', width: 250, pinned: true }, // Columna fijada
      { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 },
      { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
      { id: 'pais', title: 'País', type: 'pais', width: 150 },
      { id: 'ciudad', title: 'Ciudad', type: 'texto', width: 150 },
      { id: 'departamento', title: 'Departamento', type: 'texto', width: 180 },
      { id: 'cargo', title: 'Cargo', type: 'texto', width: 200 },
      { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 }
    ];
    
    const options: DataTableOptions = {
      containerId: tableContainer.id,
      columns,
      rows,
      columnReorderable: false,
      rowReorderable: false,
      rowExpandable: false,
      columnSortable: false,
      showCheckbox: false,
      showVerticalScrollbar: false,
      showHorizontalScrollbar: true, // Habilitar scroll horizontal para ver el efecto
      showColumnMenu: true, // Habilitar menú de columnas para poder fijar/desfijar
      showContextMenu: false,
      showPagination: false,
      header: {
        title: 'Columnas Fijadas',
        showTitle: true,
        counter: true,
        displayedItems: rows.length,
        totalItems: rows.length
      },
      onColumnPin: (columnId: string, pinned: boolean) => {
        console.log(`📌 Columna ${columnId} ${pinned ? 'fijada' : 'desfijada'}`);
      }
    };
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainer.id);
      if (containerElement) {
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainer.id);
      }
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Esta historia demuestra cómo funcionan las columnas fijadas (pinned). Las columnas con `pinned: true` permanecen visibles al hacer scroll horizontal, lo que es útil para mantener información importante (como nombre o email) siempre visible mientras navegas por otras columnas. En este ejemplo, las columnas "Nombre" y "Email" están fijadas inicialmente. Puedes hacer click en el botón de menú (3 puntos) en cualquier header de columna para fijar/desfijar columnas dinámicamente. También puedes hacer scroll horizontal para ver cómo las columnas fijadas permanecen visibles mientras las demás columnas se desplazan.'
      }
    }
  },
  args: {
    columnReorderable: false,
    rowReorderable: false,
    rowExpandable: false,
    columnSortable: false,
    showCheckbox: false,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: true,
    showColumnMenu: true,
    showContextMenu: false,
    showPagination: false
  }
};

export const ColumnTypes: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-column-types-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    container.appendChild(tableContainer);
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        // Generar filas de ejemplo con diferentes tipos de datos
        const generateRows = (): TableRow[] => {
          return [
            {
              id: 1,
              data: {
                nombre: 'Juan Pérez',
                nombreAvatar: 'María García',
                nombreAvatarTexto: 'Carlos López',
                correo: 'juan.perez@example.com',
                estado: 'activo',
                progreso: 75,
                fecha: '2024-01-15',
                telefono: '+57 300 123 4567',
                checkbox: true,
                radio: true,
                toggle: true,
                pais: 'Colombia',
                ciudad: 'Bogotá',
                area: 'Desarrollo',
                lider: 'Ana Martínez'
              }
            },
            {
              id: 2,
              data: {
                nombre: 'Ana Martínez',
                nombreAvatar: 'Pedro Rodríguez',
                nombreAvatarTexto: 'Laura Sánchez',
                correo: 'ana.martinez@example.com',
                estado: 'pendiente',
                progreso: 45,
                fecha: '2024-02-20',
                telefono: '+57 301 234 5678',
                checkbox: false,
                radio: false,
                toggle: false,
                pais: 'México',
                ciudad: 'Ciudad de México',
                area: 'Diseño',
                lider: 'Juan Pérez'
              }
            },
            {
              id: 3,
              data: {
                nombre: 'Carlos López',
                nombreAvatar: 'Sofía Hernández',
                nombreAvatarTexto: 'Diego Torres',
                correo: 'carlos.lopez@example.com',
                estado: 'inactivo',
                progreso: 90,
                fecha: '2024-03-10',
                telefono: '+57 302 345 6789',
                checkbox: true,
                radio: true,
                toggle: true,
                pais: 'Argentina',
                ciudad: 'Buenos Aires',
                area: 'Marketing',
                lider: 'Ana Martínez'
              }
            }
          ];
        };
        
        const rows = generateRows();
        
        // Columnas con diferentes tipos
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { 
            id: 'nombreAvatar', 
            title: 'Nombre + Avatar', 
            type: 'nombre-avatar', 
            width: 250,
            avatarVariant: 'initials' // Puede ser 'photo', 'initials' o 'icon'
          },
          { 
            id: 'nombreAvatarTexto', 
            title: 'Nombre + Avatar + Texto', 
            type: 'nombre-avatar-texto', 
            width: 280,
            avatarVariant: 'initials'
          },
          { id: 'correo', title: 'Correo', type: 'correo', width: 250, emailClickable: true },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'progreso', title: 'Progreso', type: 'progreso', width: 200 },
          { id: 'fecha', title: 'Fecha', type: 'fecha', width: 150 },
          { id: 'telefono', title: 'Teléfono', type: 'telefono', width: 180 },
          { id: 'checkbox', title: 'Checkbox', type: 'checkbox', width: 120, checkboxLabel: 'Aprobado' },
          { id: 'radio', title: 'Radio', type: 'radio', width: 120, radioLabel: 'Seleccionar' },
          { id: 'toggle', title: 'Toggle', type: 'toggle', width: 120, toggleLabel: 'Activo' },
          { id: 'pais', title: 'País', type: 'pais', width: 150 },
          { id: 'ciudad', title: 'Ciudad', type: 'ciudad', width: 150 },
          { id: 'area', title: 'Área', type: 'area', width: 150 },
          { id: 'lider', title: 'Líder', type: 'lider', width: 200 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false, // No mostrar checkbox de selección múltiple
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          header: {
            title: 'Tipos de Columnas',
            showTitle: true,
            counter: true,
            showCounter: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra los diferentes tipos de columnas disponibles en el DataTable. Incluye ejemplos de: nombre, nombre-avatar, nombre-avatar-texto, correo, estado, progreso, fecha, teléfono, checkbox, radio, toggle, país, ciudad, área y líder. Cada tipo de columna tiene su propio formato de renderizado y comportamiento.'
      }
    }
  }
};

export const EditableCells: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-editable-cells-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    container.appendChild(tableContainer);
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        // Generar filas de ejemplo
        const generateRows = (): TableRow[] => {
          return [
            {
              id: 1,
              data: {
                nombre: 'Juan Pérez',
                nombreAvatar: 'María García',
                estado: 'activo',
                fecha: '2024-01-15',
                checkbox: true,
                radio: true
              }
            },
            {
              id: 2,
              data: {
                nombre: 'Ana Martínez',
                nombreAvatar: 'Pedro Rodríguez',
                estado: 'pendiente',
                fecha: '2024-02-20',
                checkbox: false,
                radio: false
              }
            },
            {
              id: 3,
              data: {
                nombre: 'Carlos López',
                nombreAvatar: 'Sofía Hernández',
                estado: 'inactivo',
                fecha: '2024-03-10',
                checkbox: true,
                radio: true
              }
            }
          ];
        };
        
        const rows = generateRows();
        
        // Columnas editables
        const columns: TableColumn[] = [
          { 
            id: 'nombre', 
            title: 'Nombre (Editable)', 
            type: 'nombre', 
            width: 200,
            editable: true // Permite editar el texto directamente
          },
          { 
            id: 'nombreAvatar', 
            title: 'Nombre + Avatar (Editable)', 
            type: 'nombre-avatar', 
            width: 250,
            avatarVariant: 'initials',
            editable: true // Permite editar el nombre (el avatar se mantiene)
          },
          { 
            id: 'estado', 
            title: 'Estado (Editable)', 
            type: 'estado', 
            width: 180,
            editable: true // Muestra dropdown con estados disponibles
          },
          { 
            id: 'fecha', 
            title: 'Fecha (Editable)', 
            type: 'fecha', 
            width: 180,
            editable: true // Abre date picker al hacer click
          },
          { 
            id: 'checkbox', 
            title: 'Checkbox (Editable)', 
            type: 'checkbox', 
            width: 150,
            checkboxLabel: 'Aprobado',
            editable: true // Permite activar/desactivar el checkbox
          },
          { 
            id: 'radio', 
            title: 'Radio (Editable)', 
            type: 'radio', 
            width: 150,
            radioLabel: 'Seleccionar',
            editable: true // Permite seleccionar/deseleccionar el radio
          }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          header: {
            title: 'Celdas Editables',
            showTitle: true,
            counter: true,
            showCounter: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
        
        // Log cuando se edita una celda
        console.log('📝 [EDITABLE CELLS] Tabla creada. Puedes editar:');
        console.log('  - Nombre: Haz click en el texto para editarlo directamente');
        console.log('  - Nombre + Avatar: Haz click en el nombre para editarlo');
        console.log('  - Estado: Haz click en el badge para ver el dropdown de estados');
        console.log('  - Fecha: Haz click en la fecha para abrir el date picker');
        console.log('  - Checkbox: Haz click para activar/desactivar');
        console.log('  - Radio: Haz click para seleccionar/deseleccionar');
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de edición de celdas en el DataTable. Las columnas con `editable: true` permiten modificar su contenido directamente. Los tipos editables incluyen: nombre (edición de texto inline), nombre-avatar (edición del nombre manteniendo el avatar), estado (dropdown con estados disponibles), fecha (date picker), checkbox (activar/desactivar) y radio (seleccionar/deseleccionar). Los cambios se guardan automáticamente cuando pierdes el foco o seleccionas una opción.'
      }
    }
  }
};

export const EmptyState: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    // Crear tres tablas para demostrar los diferentes tipos de empty state
    const createTable = (tableId: string, title: string, rows: TableRow[], emptyStateConfig: any) => {
      const tableContainer = document.createElement('div');
      tableContainer.style.cssText = `
        margin-bottom: 40px;
      `;
      
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      titleElement.style.cssText = `
        margin-bottom: 16px;
        font-family: var(--font-family-noto-sans-font-family);
        font-size: var(--font-body-lg-size);
        font-weight: var(--weight-bold);
        color: var(--ubits-fg-1-high);
      `;
      tableContainer.appendChild(titleElement);
      
      const tableDiv = document.createElement('div');
      tableDiv.id = tableId;
      tableDiv.style.cssText = `
        width: 100%;
        max-width: 100%;
        overflow: visible !important;
      `;
      tableContainer.appendChild(tableDiv);
      
      requestAnimationFrame(() => {
        const containerElement = document.getElementById(tableId);
        if (containerElement) {
          const columns: TableColumn[] = [
            { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
            { id: 'email', title: 'Email', type: 'correo', width: 250 },
            { id: 'estado', title: 'Estado', type: 'estado', width: 150 }
          ];
          
          const options: DataTableOptions = {
            containerId: tableId,
            columns,
            rows,
            showCheckbox: false,
            showColumnMenu: false,
            showContextMenu: false,
            showPagination: false,
            emptyState: emptyStateConfig,
            header: {
              title: 'Usuarios',
              showTitle: true,
              counter: true,
              showCounter: true
            }
          };
          
          const tableInstance = createDataTable(options);
          (window as any)[`__storybookDataTableInstance_${tableId}`] = tableInstance;
        }
      });
      
      return tableContainer;
    };
    
    // Tabla 1: Sin datos (noData)
    const table1Id = `data-table-empty-no-data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const table1 = createTable(
      table1Id,
      '1. Sin Datos (noData)',
      [], // Sin filas
      {
        noData: {
          title: 'No hay usuarios',
          description: 'Aún no has creado ningún usuario. Comienza agregando tu primer usuario.',
          icon: 'user-plus',
          actionLabel: 'Agregar usuario',
          showPrimaryButton: true,
          primaryButtonIcon: 'plus',
          showPrimaryButtonIcon: true,
          onAction: () => {
            alert('Acción: Agregar usuario');
          }
        }
      }
    );
    container.appendChild(table1);
    
    // Tabla 2: Sin resultados de búsqueda (noSearchResults)
    // Necesitamos filas iniciales y luego simular una búsqueda que no devuelve resultados
    const table2Id = `data-table-empty-no-search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const table2Container = document.createElement('div');
    table2Container.style.cssText = `margin-bottom: 40px;`;
    
    const title2 = document.createElement('h3');
    title2.textContent = '2. Sin Resultados de Búsqueda (noSearchResults)';
    title2.style.cssText = `
      margin-bottom: 16px;
      font-family: var(--font-family-noto-sans-font-family);
      font-size: var(--font-body-lg-size);
      font-weight: var(--weight-bold);
      color: var(--ubits-fg-1-high);
    `;
    table2Container.appendChild(title2);
    
    const table2Div = document.createElement('div');
    table2Div.id = table2Id;
    table2Div.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    table2Container.appendChild(table2Div);
    
    // Filas iniciales (que luego se filtrarán)
    const initialRows2: TableRow[] = [
      { id: 1, data: { nombre: 'Juan Pérez', email: 'juan@example.com', estado: 'activo' } },
      { id: 2, data: { nombre: 'Ana Martínez', email: 'ana@example.com', estado: 'pendiente' } },
      { id: 3, data: { nombre: 'Carlos López', email: 'carlos@example.com', estado: 'activo' } }
    ];
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(table2Id);
      if (containerElement) {
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: table2Id,
          columns,
          rows: initialRows2,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          emptyState: {
            noSearchResults: {
              title: 'No se encontraron resultados',
              description: 'No hay usuarios que coincidan con tu búsqueda. Intenta con otros términos.',
              icon: 'search',
              actionLabel: 'Limpiar búsqueda',
              showPrimaryButton: true,
              primaryButtonIcon: 'times',
              showPrimaryButtonIcon: true,
              onAction: () => {
                const instance = (window as any)[`__storybookDataTableInstance_${table2Id}`];
                if (instance) {
                  // Limpiar búsqueda restaurando todas las filas
                  instance.update({ rows: initialRows2 });
                  // También necesitamos limpiar el término de búsqueda en el header
                  const searchInput = containerElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
                  if (searchInput) {
                    searchInput.value = '';
                  }
                }
              },
              secondaryActionLabel: 'Ver todos',
              showSecondaryButton: true,
              onSecondaryAction: () => {
                alert('Acción: Ver todos');
              }
            }
          },
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true,
            searchButton: {
              placeholder: 'Buscar usuarios...',
              onSearch: (searchTerm: string, filteredRows: TableRow[]) => {
                // Si no hay resultados, la tabla mostrará automáticamente el empty state
                console.log('🔍 Búsqueda:', searchTerm, 'Resultados:', filteredRows.length);
              }
            },
            showSearchButton: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any)[`__storybookDataTableInstance_${table2Id}`] = tableInstance;
        
        // NOTA: El código que simulaba búsqueda automáticamente ha sido removido
        // para evitar comportamientos inesperados. Si necesitas probar el empty state
        // con búsqueda, puedes hacerlo manualmente escribiendo en el campo de búsqueda.
      }
    });
    container.appendChild(table2Container);
    
    // Tabla 3: Sin resultados de filtros (noFilterResults)
    const table3Id = `data-table-empty-no-filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const table3Container = document.createElement('div');
    table3Container.style.cssText = `margin-bottom: 40px;`;
    
    const title3 = document.createElement('h3');
    title3.textContent = '3. Sin Resultados de Filtros (noFilterResults)';
    title3.style.cssText = `
      margin-bottom: 16px;
      font-family: var(--font-family-noto-sans-font-family);
      font-size: var(--font-body-lg-size);
      font-weight: var(--weight-bold);
      color: var(--ubits-fg-1-high);
    `;
    table3Container.appendChild(title3);
    
    const table3Div = document.createElement('div');
    table3Div.id = table3Id;
    table3Div.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    table3Container.appendChild(table3Div);
    
    // Filas iniciales (que luego se filtrarán)
    const initialRows3: TableRow[] = [
      { id: 1, data: { nombre: 'Juan Pérez', email: 'juan@example.com', estado: 'activo' } },
      { id: 2, data: { nombre: 'Ana Martínez', email: 'ana@example.com', estado: 'pendiente' } },
      { id: 3, data: { nombre: 'Carlos López', email: 'carlos@example.com', estado: 'activo' } }
    ];
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(table3Id);
      if (containerElement) {
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: table3Id,
          columns,
          rows: initialRows3,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          emptyState: {
            noFilterResults: {
              title: 'No hay resultados con estos filtros',
              description: 'No se encontraron usuarios que cumplan con los filtros aplicados. Intenta ajustar los filtros.',
              icon: 'filter',
              actionLabel: 'Limpiar filtros',
              showPrimaryButton: true,
              primaryButtonIcon: 'times',
              showPrimaryButtonIcon: true,
              onAction: () => {
                const instance = (window as any)[`__storybookDataTableInstance_${table3Id}`];
                if (instance) {
                  // Limpiar filtros restaurando todas las filas
                  instance.update({ rows: initialRows3 });
                }
              },
              secondaryActionLabel: 'Ver todos',
              showSecondaryButton: true,
              onSecondaryAction: () => {
                alert('Acción: Ver todos');
              }
            }
          },
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true,
            filterButton: {
              filters: [
                {
                  id: 'estado',
                  label: 'Estado',
                  columnId: 'estado',
                  type: 'select',
                  options: [
                    { value: 'activo', label: 'Activo' },
                    { value: 'pendiente', label: 'Pendiente' },
                    { value: 'inactivo', label: 'Inactivo' },
                    { value: 'cancelado', label: 'Cancelado' } // Este valor no existe en los datos
                  ]
                }
              ],
              onApplyFilters: (filters: Record<string, string>) => {
                console.log('🔍 Filtros aplicados:', filters);
                // Filtrar filas según los filtros
                let filtered = [...initialRows3];
                if (filters.estado) {
                  filtered = filtered.filter(row => row.data.estado === filters.estado);
                }
                const instance = (window as any)[`__storybookDataTableInstance_${table3Id}`];
                if (instance) {
                  instance.update({ rows: filtered });
                }
              },
              onClearFilters: () => {
                const instance = (window as any)[`__storybookDataTableInstance_${table3Id}`];
                if (instance) {
                  instance.update({ rows: initialRows3 });
                }
              }
            },
            showFilterButton: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any)[`__storybookDataTableInstance_${table3Id}`] = tableInstance;
        
        // NOTA: El código que simulaba filtros automáticamente ha sido removido
        // para evitar que el drawer se abra automáticamente al cargar la documentación.
        // Si necesitas probar el empty state con filtros, puedes hacerlo manualmente
        // haciendo click en el botón de filtros y aplicando un filtro que no devuelva resultados.
      }
    });
    container.appendChild(table3Container);
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra los diferentes tipos de empty state (estado vacío) en el DataTable. El empty state se muestra cuando no hay datos o no hay resultados después de aplicar búsqueda o filtros. Hay tres variantes: `noData` (cuando no hay datos en absoluto), `noSearchResults` (cuando no hay resultados de búsqueda) y `noFilterResults` (cuando no hay resultados de filtros). Cada variante puede tener título, descripción, icono, imagen, y botones de acción primarios y secundarios con callbacks personalizados.'
      }
    }
  }
};

export const HeaderButtons: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-header-buttons-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    container.appendChild(tableContainer);
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        // Generar filas de ejemplo
        const generateRows = (): TableRow[] => {
          const rows: TableRow[] = [];
          for (let i = 1; i <= 20; i++) {
            rows.push({
              id: i,
              data: {
                nombre: `Usuario ${i}`,
                email: `usuario${i}@ejemplo.com`,
                estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
                pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5]
              }
            });
          }
          return rows;
        };
        
        const rows = generateRows();
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: false,
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true,
            // Botón primario (icon-only, aparece al final)
            primaryButton: {
              text: 'Nuevo usuario',
              icon: 'plus',
              iconStyle: 'regular',
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                alert('Acción: Crear nuevo usuario');
                console.log('🔘 Botón primario clickeado');
              }
            },
            showPrimaryButton: true,
            // Botones secundarios (máximo 2, icon-only, aparecen antes del primario)
            secondaryButtons: [
              {
                text: 'Exportar',
                icon: 'download',
                iconStyle: 'regular',
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Acción: Exportar usuarios');
                  console.log('🔘 Botón secundario 1 (Exportar) clickeado');
                }
              },
              {
                text: 'Importar',
                icon: 'upload',
                iconStyle: 'regular',
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert('Acción: Importar usuarios');
                  console.log('🔘 Botón secundario 2 (Importar) clickeado');
                }
              }
            ],
            showSecondaryButtons: true
          }
        };
        
        const tableInstance = createDataTable(options);
        (window as any).__storybookDataTableInstance = tableInstance;
        
        console.log('📝 [HEADER BUTTONS] Tabla creada con botones del header:');
        console.log('  - Botón primario: Nuevo usuario (icon: plus)');
        console.log('  - Botón secundario 1: Exportar (icon: download)');
        console.log('  - Botón secundario 2: Importar (icon: upload)');
        console.log('  - Los botones son icon-only y muestran tooltips al hacer hover');
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: false,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra los botones del header del DataTable. El header puede incluir un botón primario y hasta 2 botones secundarios. Todos los botones son icon-only (solo muestran el icono, sin texto) y muestran tooltips al hacer hover. El botón primario aparece al final (a la derecha) y los botones secundarios aparecen antes del primario. Cada botón puede tener su propio icono, estilo de icono (regular/solid), estado de carga (loading), estado deshabilitado (disabled) y callback onClick personalizado.'
      }
    }
  }
};

export const VerUsuariosSeleccionados: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const tableContainerId = `data-table-ver-seleccionados-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const tableContainer = document.createElement('div');
    tableContainer.id = tableContainerId;
    tableContainer.style.cssText = `
      width: 100%;
      max-width: 100%;
      overflow: visible !important;
    `;
    container.appendChild(tableContainer);
    
    // Estado de selección
    const selectionState = {
      selectedRowIds: new Set<number | string>(),
      viewSelectedActive: false
    };
    
    // Referencia al elemento de la tabla
    let tableElement: HTMLElement | null = null;
    let tableInstance: ReturnType<typeof createDataTable> | null = null;
    let originalRows: TableRow[] = [];
    
    // Función para renderizar la barra de acciones
    const renderActionBar = () => {
      if (!tableElement) {
        return;
      }
      
      const dataTableContainer = tableElement.querySelector('.ubits-data-table__container') as HTMLElement;
      if (!dataTableContainer) {
        return;
      }
      
      const header = dataTableContainer.querySelector('.ubits-data-table__header');
      if (!header) {
        return;
      }
      
      let actionBar = dataTableContainer.querySelector('.ubits-data-table__action-bar') as HTMLElement;
      
      if (!actionBar) {
        actionBar = document.createElement('div');
        actionBar.className = 'ubits-data-table__action-bar';
        actionBar.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          background-color: var(--modifiers-normal-color-light-bg-1);
          padding: var(--ubits-spacing-sm) var(--ubits-spacing-md);
          gap: var(--ubits-spacing-xs);
        `;
        header.insertAdjacentElement('afterend', actionBar);
      }
      
      const selectedCount = selectionState.selectedRowIds.size;
      
      if (selectedCount === 0) {
        actionBar.style.display = 'none';
        return;
      }
      
      actionBar.style.display = 'flex';
      
      const countText = `(${selectedCount})`;
      const isViewSelectedActive = selectionState.viewSelectedActive;
      const viewSelectedText = isViewSelectedActive
        ? `Dejar de ver seleccionados ${countText}`
        : `Ver seleccionados ${countText}`;
      const viewSelectedIcon = isViewSelectedActive ? 'eye-slash' : 'eye';
      
      let buttonsHTML = '';
      
      // Botón "Ver seleccionados"
      buttonsHTML += renderButton({
        text: viewSelectedText,
        variant: 'secondary',
        size: 'sm',
        icon: viewSelectedIcon,
        iconStyle: 'regular',
        active: isViewSelectedActive,
        className: 'ubits-data-table__action-bar-button',
        attributes: {
          id: 'action-btn-view-selected'
        }
      });
      
      // Botón "Eliminar"
      buttonsHTML += renderButton({
        variant: 'secondary',
        size: 'sm',
        icon: 'trash',
        iconStyle: 'regular',
        iconOnly: true,
        className: 'ubits-data-table__action-bar-button',
        attributes: {
          id: 'action-btn-delete'
        }
      });
      
      actionBar.innerHTML = buttonsHTML;
      
      // Listener para "Ver seleccionados"
      const viewSelectedBtn = actionBar.querySelector('#action-btn-view-selected');
      if (viewSelectedBtn) {
        viewSelectedBtn.addEventListener('click', () => {
          selectionState.viewSelectedActive = !selectionState.viewSelectedActive;
          
          if (tableInstance && originalRows.length > 0) {
            if (selectionState.viewSelectedActive) {
              // Filtrar filas: comparar IDs como números o strings
              const filteredRows = originalRows.filter(row => {
                const rowId = typeof row.id === 'number' ? row.id : Number(row.id);
                return selectionState.selectedRowIds.has(row.id) || 
                       selectionState.selectedRowIds.has(rowId) ||
                       selectionState.selectedRowIds.has(String(row.id));
              });
              
              tableInstance.update({ rows: filteredRows });
              
              // Después de actualizar, marcar los checkboxes de las filas filtradas
              setTimeout(() => {
                if (tableElement) {
                  const checkboxes = tableElement.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]') as NodeListOf<HTMLInputElement>;
                  
                  checkboxes.forEach((cb) => {
                    const rowIdStr = cb.getAttribute('data-row-id');
                    if (rowIdStr && rowIdStr !== 'all') {
                      const rowIdNum = Number(rowIdStr);
                      const isNumber = !isNaN(rowIdNum);
                      
                      let shouldBeSelected = false;
                      if (isNumber) {
                        shouldBeSelected = selectionState.selectedRowIds.has(rowIdNum) || selectionState.selectedRowIds.has(rowIdStr);
                      } else {
                        shouldBeSelected = selectionState.selectedRowIds.has(rowIdStr);
                      }
                      
                      if (shouldBeSelected) {
                        cb.checked = true;
                        cb.dispatchEvent(new Event('change', { bubbles: true }));
                      }
                    }
                  });
                  
                  updateMasterCheckbox();
                }
              }, 100);
            } else {
              tableInstance.update({ rows: originalRows });
              
              // Después de restaurar, volver a marcar los checkboxes
              setTimeout(() => {
                markCheckboxes(1);
                updateMasterCheckbox();
              }, 100);
            }
          }
          
          renderActionBar();
        });
      }
      
      // Listener para "Eliminar"
      const deleteBtn = actionBar.querySelector('#action-btn-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          const selectedIds = Array.from(selectionState.selectedRowIds);
          alert(`Eliminar ${selectedIds.length} usuario(s) seleccionado(s)`);
        });
      }
    };
    
    requestAnimationFrame(() => {
      const containerElement = document.getElementById(tableContainerId);
      if (containerElement) {
        // Generar filas de ejemplo
        const generateRows = (): TableRow[] => {
          const rows: TableRow[] = [];
          for (let i = 1; i <= 30; i++) {
            rows.push({
              id: i,
              data: {
                nombre: `Usuario ${i}`,
                email: `usuario${i}@ejemplo.com`,
                estado: i % 3 === 0 ? 'activo' : i % 3 === 1 ? 'pendiente' : 'inactivo',
                pais: ['Colombia', 'México', 'Argentina', 'Chile', 'Perú'][i % 5]
              }
            });
          }
          return rows;
        };
        
        const rows = generateRows();
        originalRows = [...rows];
        
        // Seleccionar algunas filas por defecto para demostración
        selectionState.selectedRowIds.add(2);
        selectionState.selectedRowIds.add(5);
        selectionState.selectedRowIds.add(8);
        selectionState.selectedRowIds.add(12);
        selectionState.selectedRowIds.add(15);
        
        const columns: TableColumn[] = [
          { id: 'nombre', title: 'Nombre', type: 'nombre', width: 200 },
          { id: 'email', title: 'Email', type: 'correo', width: 250 },
          { id: 'estado', title: 'Estado', type: 'estado', width: 150 },
          { id: 'pais', title: 'País', type: 'pais', width: 150 }
        ];
        
        const options: DataTableOptions = {
          containerId: tableContainerId,
          columns,
          rows,
          showCheckbox: true,
          showColumnMenu: false,
          showContextMenu: false,
          showPagination: false,
          header: {
            title: 'Usuarios',
            showTitle: true,
            counter: true,
            showCounter: true
          },
          onRowSelect: (rowId, selected) => {
            if (selected) {
              selectionState.selectedRowIds.add(rowId);
            } else {
              selectionState.selectedRowIds.delete(rowId);
            }
            renderActionBar();
          },
          onSelectAll: (selected) => {
            if (tableElement) {
              const table = tableElement.querySelector('.ubits-data-table');
              if (table) {
                const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
                checkboxes.forEach((cb) => {
                  const rowIdStr = (cb as HTMLInputElement).getAttribute('data-row-id');
                  if (rowIdStr) {
                    const rowId = isNaN(Number(rowIdStr)) ? rowIdStr : Number(rowIdStr);
                    if (selected) {
                      selectionState.selectedRowIds.add(rowId);
                    } else {
                      selectionState.selectedRowIds.delete(rowId);
                    }
                  }
                });
              }
            }
            renderActionBar();
          }
        };
        
        tableInstance = createDataTable(options);
        tableElement = tableInstance.element;
        (window as any).__storybookDataTableInstance = tableInstance;
        
        // Marcar las filas pre-seleccionadas y mostrar la action bar
        // Usar múltiples intentos para asegurar que todos los checkboxes estén disponibles
        const markCheckboxes = (attempt = 1) => {
          if (!tableElement) return;
          
          // Buscar todos los checkboxes de filas (excluir el checkbox maestro)
          const checkboxes = tableElement.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]') as NodeListOf<HTMLInputElement>;
          
          let markedCount = 0;
          const expectedIds = Array.from(selectionState.selectedRowIds);
          
          checkboxes.forEach((cb) => {
            const rowIdStr = cb.getAttribute('data-row-id');
            if (rowIdStr && rowIdStr !== 'all') {
              // Convertir a número para comparar
              const rowIdNum = Number(rowIdStr);
              const isNumber = !isNaN(rowIdNum);
              
              // Verificar si este ID está en la lista de seleccionados
              let shouldBeSelected = false;
              
              if (isNumber) {
                // Comparar como número y como string
                shouldBeSelected = selectionState.selectedRowIds.has(rowIdNum) || 
                                  selectionState.selectedRowIds.has(rowIdStr);
              } else {
                // Comparar como string
                shouldBeSelected = selectionState.selectedRowIds.has(rowIdStr);
              }
              
              if (shouldBeSelected) {
                cb.checked = true;
                markedCount++;
                
                // Disparar evento change para que el DataTableProvider actualice su estado interno
                const changeEvent = new Event('change', { bubbles: true });
                cb.dispatchEvent(changeEvent);
              }
            }
          });
          
          // Si no se marcaron todos y aún hay intentos, reintentar
          if (markedCount < expectedIds.length && attempt < 3) {
            setTimeout(() => markCheckboxes(attempt + 1), 200);
          }
        };
        
        // Función para actualizar el checkbox maestro
        const updateMasterCheckbox = () => {
          if (!tableElement) return;
          
          const masterCheckbox = tableElement.querySelector('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id="all"]') as HTMLInputElement;
          if (masterCheckbox) {
            const visibleCheckboxes = Array.from(tableElement.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]')) as HTMLInputElement[];
            const allChecked = visibleCheckboxes.length > 0 && visibleCheckboxes.every(cb => {
              const rowIdStr = cb.getAttribute('data-row-id');
              if (rowIdStr && rowIdStr !== 'all') {
                const rowIdNum = Number(rowIdStr);
                const isNumber = !isNaN(rowIdNum);
                if (isNumber) {
                  return selectionState.selectedRowIds.has(rowIdNum) || selectionState.selectedRowIds.has(rowIdStr);
                }
                return selectionState.selectedRowIds.has(rowIdStr);
              }
              return false;
            });
            
            if (allChecked) {
              masterCheckbox.checked = true;
              masterCheckbox.indeterminate = false;
            } else {
              const someChecked = visibleCheckboxes.some(cb => {
                const rowIdStr = cb.getAttribute('data-row-id');
                if (rowIdStr && rowIdStr !== 'all') {
                  const rowIdNum = Number(rowIdStr);
                  const isNumber = !isNaN(rowIdNum);
                  if (isNumber) {
                    return selectionState.selectedRowIds.has(rowIdNum) || selectionState.selectedRowIds.has(rowIdStr);
                  }
                  return selectionState.selectedRowIds.has(rowIdStr);
                }
                return false;
              });
              masterCheckbox.indeterminate = someChecked;
              masterCheckbox.checked = false;
            }
          }
        };
        
        // Primer intento después de un delay inicial
        setTimeout(() => {
          markCheckboxes(1);
          updateMasterCheckbox();
          renderActionBar();
        }, 300);
      } else {
        console.error('❌ Contenedor no encontrado en el DOM:', tableContainerId);
      }
    });
    
    return container;
  },
  args: {
    showCheckbox: true,
    showColumnMenu: false,
    showContextMenu: false,
    showPagination: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Demuestra la funcionalidad de "Ver usuarios seleccionados" de la ActionBar. Esta funcionalidad permite filtrar la tabla para mostrar solo las filas que han sido seleccionadas con los checkboxes. Cuando se activa el botón "Ver seleccionados", la tabla se filtra automáticamente y solo muestra los usuarios seleccionados. El botón cambia a "Dejar de ver seleccionados" cuando está activo, y al hacer click nuevamente, se restauran todas las filas. La barra de acciones aparece automáticamente cuando hay al menos una fila seleccionada.'
      }
    }
  }
};

