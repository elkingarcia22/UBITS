import type { Meta, StoryObj } from '@storybook/html';
import { createDataTable } from '../../addons/data-table/src/DataTableProvider';
import type { DataTableOptions, TableColumn, TableRow } from '../../addons/data-table/src/types/DataTableOptions';
import { renderButton } from '../../addons/button/src/ButtonProvider';

const meta: Meta<DataTableOptions & { columnsCount?: number }> = {
  title: 'Components/Data Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabla de datos UBITS con soporte para columnas fijadas, reordenamiento, ordenamiento, selección múltiple, filas expandibles y menú de columnas.'
}
}
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
        defaultValue: { summary: '3' }
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
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    // Buscar y limpiar cualquier tabla anterior en el contenedor principal
    // Esto previene renderizados duplicados cuando se cambian los tipos de columna
    const existingContainers = container.querySelectorAll('[id^="data-table-story-container-"]');
    
    existingContainers.forEach((oldContainer) => {
      // Buscar tabla directa o dentro de contenedor scrollable
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
              // Silently ignore
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
            // Silently ignore
          }
        }
      }
      oldContainer.remove();
    });
    
    // Generar columnas dinámicamente según columnsCount
    const columnsCount = args.columnsCount ?? 3;
    
    // Tipos de columna disponibles (pueden ser controlados desde Storybook)
    // Leer directamente de args para asegurar que se actualicen cuando cambien
    // Valores por defecto coinciden con la web: nombre, correo, estado (sin progreso por defecto)
    const columnType1 = args.columnType1 ?? 'nombre';
    const columnType2 = args.columnType2 ?? 'correo';
    const columnType3 = args.columnType3 ?? 'estado';
    const columnType4 = args.columnType4 ?? 'nombre';
    const columnType5 = (args as any).columnType5 ?? 'nombre';
    const columnType6 = (args as any).columnType6 ?? 'nombre';
    const columnType7 = (args as any).columnType7 ?? 'pais';
    const columnType8 = (args as any).columnType8 ?? 'fecha';
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
    
    // Columna 1 - ID y título dinámicos según el tipo
    const col1Config = columnTypeMapping[columnType1] || { id: 'nombre', title: 'Nombre' };
    const col1 = buildColumn(columnType1, col1Config, 200, {
      avatarVariant: column1AvatarVariant,
      editable: column1Editable
});
    
    // Columna 2 - ID y título dinámicos según el tipo
    const col2Config = columnTypeMapping[columnType2] || { id: 'email', title: 'Email' };
    const col2 = buildColumn(columnType2, col2Config, 250, {
      emailClickable: column2EmailClickable,
      editable: column1Editable, // Usar el control de columna 1 para simplicidad
    });
    
    // Columna 3 - ID y título dinámicos según el tipo
    const col3Config = columnTypeMapping[columnType3] || { id: 'estado', title: 'Estado' };
    const col3 = buildColumn(columnType3, col3Config, 150, {
      editable: column3Editable,
      radioLabel: column3RadioLabel,
      toggleLabel: column3ToggleLabel,
      checkboxLabel: column3CheckboxLabel
});
    
    // Columna 4 - ID y título dinámicos según el tipo
    const col4Config = columnTypeMapping[columnType4] || { id: 'progreso', title: 'Progreso' };
    const col4 = buildColumn(columnType4, col4Config, 180);
    
    // Columnas adicionales (5-10) - también con ID y título dinámicos
    const col5Config = columnTypeMapping[columnType5] || { id: 'telefono', title: 'Teléfono' };
    const col6Config = columnTypeMapping[columnType6] || { id: 'ciudad', title: 'Ciudad' };
    const col7Config = columnTypeMapping[columnType7] || { id: 'pais', title: 'País' };
    const col8Config = columnTypeMapping[columnType8] || { id: 'fecha', title: 'Fecha' };
    const col9Config = columnTypeMapping[columnType9] || { id: 'categoria', title: 'Categoría' };
    const col10Config = columnTypeMapping[columnType10] || { id: 'prioridad', title: 'Prioridad' };
    
    const allColumns: TableColumn[] = [
      col1,
      col2,
      col3,
      col4,
      buildColumn(columnType5, col5Config, 150),
      buildColumn(columnType6, col6Config, 150),
      buildColumn(columnType7, col7Config, 150),
      buildColumn(columnType8, col8Config, 150),
      buildColumn(columnType9, col9Config, 150),
      buildColumn(columnType10, col10Config, 150)
];
    
    // Seleccionar solo las columnas necesarias según columnsCount
    const columns: TableColumn[] = allColumns.slice(0, columnsCount);
    
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
        console.log('🎯 [ACTION BAR] Header no encontrado');
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
        console.log('🎯 [ACTION BAR] Barra creada');
      }
      
      // Contar selecciones
      const selectedCount = selectionState.selectedRowIds.size;
      const selectedIds = Array.from(selectionState.selectedRowIds);
      console.log('🎯 [ACTION BAR] Renderizando - Selecciones:', {
        count: selectedCount,
        ids: selectedIds.slice(0, 10), // Mostrar solo los primeros 10
        total: selectedIds.length
      });
      
      // IMPORTANTE: Ocultar la barra si no hay selecciones, mostrarla si hay al menos una
      if (selectedCount === 0) {
        // Ocultar la barra cuando no hay selecciones
        actionBar.style.display = 'none';
        console.log('🎯 [ACTION BAR] Barra ocultada - no hay selecciones');
        return; // Salir temprano si no hay selecciones
      }
      
      // Mostrar la barra cuando hay selecciones
      actionBar.style.display = 'flex';
      console.log('🎯 [ACTION BAR] Barra mostrada - hay', selectedCount, 'selección(es)');
      
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
        console.log('🎯 [ACTION BAR] Modo masivo - mostrando ver seleccionados, notificaciones y eliminar');
        
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
        console.log('🎯 [ACTION BAR] Modo individual - mostrando todos los botones');
        
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
            console.log(`Action: ${action}`, Array.from(selectionState.selectedRowIds));
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
    const headerDisplayedItems = (args as any).headerDisplayedItems ?? 32;
    const headerTotalItems = (args as any).headerTotalItems ?? 206;
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
      showVerticalScrollbar: args.showVerticalScrollbar ?? false,
      showHorizontalScrollbar: args.showHorizontalScrollbar ?? false,
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
            console.log('Botón primario clickeado');
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
              console.log('Botón secundario 1 clickeado');
              alert('Exportar');
            }
          },
          {
            text: 'Importar',
            icon: 'upload',
            iconStyle: 'regular',
            onClick: (e) => {
              console.log('Botón secundario 2 clickeado');
              alert('Importar');
            }
          }
        ] : undefined,
        showSecondaryButtons: showHeaderSecondaryButtons,
        searchButton: showHeaderSearchButton ? {
          placeholder: 'Buscar...',
          value: '',
          onChange: (value) => {
            console.log('Búsqueda:', value);
          },
          onClick: (e) => {
            console.log('Botón de búsqueda clickeado');
          },
          onSearch: (searchTerm, filteredRows) => {
            console.log('Búsqueda realizada:', searchTerm, 'Filas encontradas:', filteredRows.length);
          }
        } : undefined,
        showSearchButton: showHeaderSearchButton,
        filterButton: showHeaderFilterButton ? {
          onClick: (e) => {
            console.log('Botón de filtros clickeado');
            // Este onClick solo se ejecuta si no hay filtros configurados
          },
          // Los filtros se generan automáticamente basados en las columnas de la tabla
          // Si quieres filtros personalizados, puedes descomentar y configurar:
          // filters: [
          //   {
          //     id: 'nombre',
          //     label: 'Nombre',
          //     columnId: 'nombre',
          //     type: 'text'
          //   }
          // ],
          onApplyFilters: (filters) => {
            console.log('Filtros aplicados:', filters);
          },
          onClearFilters: () => {
            console.log('Filtros limpiados');
          }
        } : undefined,
        showFilterButton: showHeaderFilterButton,
        columnSelectorButton: showHeaderColumnSelectorButton ? {
          onClick: (e) => {
            console.log('Botón de seleccionar columnas clickeado');
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
            console.log('Empty state - No data: acción ejecutada');
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
            console.log('Empty state - No search results: acción ejecutada');
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
            console.log('Empty state - No filter results: limpiando filtros');
            // Limpiar filtros - esto se manejará automáticamente por el componente
            if (tableInstance) {
              // El componente manejará la limpieza de filtros
              alert('Limpiando filtros...');
            }
          }
        }
      },
      onPageChange: (page) => {
        console.log('Page changed to:', page);
        // En Storybook, actualizar el args para que se refleje en los controles
        if ((args as any).onPageChange) {
          (args as any).onPageChange(page);
        }
      },
      onItemsPerPageChange: (itemsPerPage) => {
        console.log('Items per page changed to:', itemsPerPage);
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
        console.log('🎯 [ROW SELECT] ========== INICIO ==========');
        console.log('🎯 [ROW SELECT] rowId:', rowId, 'selected:', selected);
        console.log('🎯 [ROW SELECT] Estado ANTES:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds)
        });
        
        // Actualizar estado de selección
        if (selected) {
          selectionState.selectedRowIds.add(rowId);
          console.log('🎯 [ROW SELECT] ✅ Fila agregada al estado');
        } else {
          selectionState.selectedRowIds.delete(rowId);
          console.log('🎯 [ROW SELECT] ❌ Fila removida del estado');
        }
        
        console.log('🎯 [ROW SELECT] Estado DESPUÉS:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds)
        });
        
        // Actualizar barra de acciones
        const container = document.getElementById(tableContainerId);
        if (container) {
          console.log('🎯 [ROW SELECT] Actualizando barra de acciones...');
          renderActionBar(container);
        } else {
          console.warn('🎯 [ROW SELECT] ⚠️ Container no encontrado:', tableContainerId);
        }
        console.log('🎯 [ROW SELECT] ========== FIN ==========');
      },
      onSelectAll: (selected) => {
        console.log('🎯 [SELECT ALL] ========== INICIO ==========');
        console.log('🎯 [SELECT ALL] selected:', selected);
        console.log('🎯 [SELECT ALL] Estado ANTES:', {
          count: selectionState.selectedRowIds.size,
          ids: Array.from(selectionState.selectedRowIds).slice(0, 10)
        });
        
        // Actualizar estado de selección - solo las filas visibles
        const container = document.getElementById(tableContainerId);
        if (container) {
          const table = container.querySelector('.ubits-data-table');
          if (table) {
            const checkboxes = table.querySelectorAll('input[type="checkbox"][data-column-id="checkbox-2"][data-row-id]');
            console.log('🎯 [SELECT ALL] Checkboxes encontrados:', checkboxes.length);
            
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
            
            console.log('🎯 [SELECT ALL] Estado DESPUÉS:', {
              count: selectionState.selectedRowIds.size,
              ids: Array.from(selectionState.selectedRowIds).slice(0, 10)
            });
          } else {
            console.warn('🎯 [SELECT ALL] ⚠️ Tabla no encontrada');
          }
          renderActionBar(container);
        } else {
          console.warn('🎯 [SELECT ALL] ⚠️ Container no encontrado:', tableContainerId);
        }
        console.log('🎯 [SELECT ALL] ========== FIN ==========');
      }
};

    // Agregar el contenedor de la tabla al contenedor principal
    container.appendChild(tableContainer);

    // Inicializar la tabla después de que se monte en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    
    // Verificar si ya hay una tabla en el contenedor antes de crear una nueva
    // Esto previene renderizados duplicados cuando Storybook llama al render múltiples veces
    const checkAndCreateTable = () => {
      const containerElement = document.getElementById(tableContainerId);
      if (!containerElement) {
        return false;
      }
      
      // Verificar si ya hay una tabla en este contenedor
      const existingTable = containerElement.querySelector('.ubits-data-table');
      const existingScrollable = containerElement.querySelector('.ubits-data-table__scrollable-container');
      
      if (existingTable || existingScrollable) {
        return false;
      }
      
      tableInstance = createDataTable(options);
      
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

    return container;
  },
  args: {
    // Valores por defecto coinciden con la web
    columnReorderable: true,
    rowReorderable: true,
    rowExpandable: true,
    columnSortable: true,
    showCheckbox: true,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    showColumnMenu: true,
    showContextMenu: true,
    checkboxSticky: false,
    dragHandleSticky: false,
    expandSticky: false,
    columnsCount: 3, // Coincide con la web (3 columnas por defecto)
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
    headerDisplayedItems: 32,
    headerTotalItems: 206,
    showHeaderPrimaryButton: true,
    headerPrimaryButtonText: 'Nuevo',
    showHeaderSecondaryButtons: true,
    showHeaderSearchButton: true,
    showHeaderFilterButton: true,
    showHeaderColumnSelectorButton: true
}
};

