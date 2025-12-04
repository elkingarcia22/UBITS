# 📋 Inventario de Funcionalidades - Data Table

## 🎯 Funcionalidades Principales

### 1. **Reordenamiento de Columnas** (`columnReorderable`)
- Permite arrastrar y soltar columnas para cambiar su orden
- Callback: `onColumnReorder`

### 2. **Reordenamiento de Filas** (`rowReorderable`)
- Permite arrastrar y soltar filas para cambiar su orden
- Callback: `onRowReorder`
- Requiere columna de drag-handle

### 3. **Filas Expandibles** (`rowExpandable`)
- Muestra icono de expandir/colapsar en cada fila
- Permite mostrar contenido adicional al expandir
- Callback: `onRowExpand`
- Requiere `renderExpandedContent` en las filas

### 4. **Ordenamiento de Columnas** (`columnSortable`)
- Muestra botones de ordenamiento (asc/desc) en headers
- Callback: `onSort`

### 5. **Selección Múltiple** (`showCheckbox`)
- Columna de checkbox para seleccionar múltiples filas
- Checkbox maestro en el header para seleccionar todas

### 6. **Scroll Vertical** (`showVerticalScrollbar`)
- Habilita scrollbar vertical para tablas largas
- Se activa automáticamente si hay lazy load

### 7. **Scroll Horizontal** (`showHorizontalScrollbar`)
- Habilita scrollbar horizontal para tablas anchas
- Se activa automáticamente si hay columnas fijadas

### 8. **Menú de Columnas** (`showColumnMenu`)
- Botón de menú (3 puntos) en cada header de columna
- Permite fijar/desfijar columnas
- Callback: `onColumnPin`

### 9. **Menú Contextual** (`showContextMenu`)
- Menú de click derecho en las filas
- Muestra acciones disponibles (ver, editar, eliminar, etc.)

### 10. **Columnas Sticky/Fijadas** (`pinned`)
- Columnas que permanecen visibles al hacer scroll horizontal
- Se configura desde el menú de columnas o programáticamente

### 11. **Checkbox Sticky** (`checkboxSticky`)
- Hace que la columna de checkbox sea fija al hacer scroll horizontal

### 12. **Drag Handle Sticky** (`dragHandleSticky`)
- Hace que la columna de drag-handle sea fija al hacer scroll horizontal
- Requiere `rowReorderable: true`

### 13. **Expand Sticky** (`expandSticky`)
- Hace que la columna de expand sea fija al hacer scroll horizontal
- Requiere `rowExpandable: true`

### 14. **Paginación** (`showPagination`)
- Paginador tradicional con botones Anterior/Siguiente
- Configuración: `currentPage`, `itemsPerPage`, `paginationVariant`, `paginationSize`
- Callbacks: `onPageChange`, `onItemsPerPageChange`

### 15. **Lazy Load** (`lazyLoad`)
- Carga incremental de items al hacer scroll
- Configuración: `lazyLoadItemsPerBatch`
- Callback: `onLazyLoad`
- Se desactiva automáticamente si hay paginación

### 16. **Header de la Tabla**
- **Título**: Muestra un título personalizado
- **Contador**: Muestra cantidad de items (X/Y resultados o solo total)
- **Botón Primario**: Botón de acción principal (ej: "Nuevo")
- **Botones Secundarios**: Hasta 2 botones adicionales (ej: "Exportar", "Filtrar")
- **Botón de Búsqueda**: Permite buscar en la tabla
- **Botón de Filtros**: Permite filtrar columnas
- **Selector de Columnas**: Permite mostrar/ocultar columnas

### 17. **Búsqueda** (`searchButton`)
- Busca texto en todas las columnas de la tabla
- Se actualiza el contador automáticamente

### 18. **Filtros** (`filterButton`)
- Permite filtrar por valores específicos de columnas
- Se actualiza el contador automáticamente

### 19. **Selector de Columnas** (`columnSelectorButton`)
- Permite mostrar/ocultar columnas dinámicamente

### 20. **Barra de Acciones** (Action Bar)
- Barra debajo del header con acciones masivas
- Botones: Ver seleccionados, Notificaciones, Copiar, Ver, Editar, Descargar, Eliminar

### 21. **Tipos de Columnas**
- **nombre**: Texto simple
- **nombre-avatar**: Nombre con avatar (foto, iniciales o icono)
- **nombre-avatar-texto**: Nombre con avatar y texto complementario
- **correo**: Email (clickeable o no)
- **estado**: Badge de estado (pendiente, activo, inactivo, etc.)
- **progreso**: Barra de progreso (0-100%)
- **fecha**: Fecha formateada (editable con date picker)
- **telefono**: Número de teléfono
- **acciones**: Botones de acción (ver, editar, eliminar)
- **checkbox**: Checkbox individual en la columna
- **radio**: Radio button
- **toggle**: Toggle switch
- **imagen**: Imagen
- **texto**: Texto simple

### 22. **Edición de Celdas** (`editable`)
- Permite editar contenido de celdas directamente
- Soporta: nombre, nombre-avatar, estado, fecha

### 23. **Empty State**
- Muestra mensaje cuando no hay datos
- Configurable con `emptyState`

### 24. **Callbacks de Acciones**
- `onRowAction`: Cuando se hace click en un botón de acción de una fila
- `onRowExpand`: Cuando se expande/colapsa una fila
- `onColumnReorder`: Cuando se reordena una columna
- `onRowReorder`: Cuando se reordena una fila
- `onSort`: Cuando se ordena una columna
- `onColumnPin`: Cuando se fija/desfija una columna
- `onPageChange`: Cuando cambia la página
- `onItemsPerPageChange`: Cuando cambia items por página
- `onLazyLoad`: Cuando se cargan más items en lazy load

## 📝 Historias a Crear

1. ✅ **Default** - Tabla básica con todas las funcionalidades habilitadas
2. ⬜ **ColumnReorderable** - Reordenamiento de columnas
3. ⬜ **RowReorderable** - Reordenamiento de filas
4. ⬜ **RowExpandable** - Filas expandibles
5. ⬜ **ColumnSortable** - Ordenamiento de columnas
6. ⬜ **CheckboxSelection** - Selección múltiple con checkbox
7. ⬜ **VerticalScroll** - Scroll vertical
8. ⬜ **HorizontalScroll** - Scroll horizontal
9. ⬜ **ColumnMenu** - Menú de columnas
10. ⬜ **ContextMenu** - Menú contextual
11. ⬜ **PinnedColumns** - Columnas fijadas
12. ⬜ **StickyControls** - Controles sticky (checkbox, drag-handle, expand)
13. ⬜ **Pagination** - Paginación
14. ⬜ **LazyLoad** - Lazy load / Infinite scroll
15. ⬜ **Header** - Header con título y contador
16. ⬜ **Search** - Búsqueda en la tabla
17. ⬜ **Filters** - Filtros de columnas
18. ⬜ **ColumnSelector** - Selector de columnas
19. ✅ **ActionBar** - Barra de acciones
20. ✅ **ColumnTypes** - Tipos de columnas
21. ✅ **EditableCells** - Edición de celdas
22. ✅ **EmptyState** - Estado vacío
23. ✅ **HeaderButtons** - Botones del header (primario y secundarios)

