/**
 * PaginationProvider
 * Lógica de renderizado del componente Pagination
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { PaginationOptions } from './types/PaginationOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { createList, renderList } from '../../list/src/ListProvider';
import type { ListOptions, ListItem } from '../../list/src/types/ListOptions';
import '../../list/src/styles/list.css';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'solid'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Calcula las páginas visibles según la página actual y el máximo de páginas visibles
 */
function calculateVisiblePages(currentPage: number, totalPages: number, maxVisiblePages: number): number[] {
  const pages: number[] = [];
  
  if (totalPages <= maxVisiblePages) {
    // Si hay pocas páginas, mostrar todas
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Calcular páginas a mostrar
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Ajustar si estamos cerca del final
    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
}

/**
 * Renderiza un botón de página
 */
function renderPageButton(
  page: number,
  isActive: boolean,
  size: PaginationOptions['size'] = 'md',
  onClick?: (page: number) => void
): string {
  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  
  return renderButton({
    variant: isActive ? 'secondary' : 'tertiary',
    size: buttonSize,
    text: String(page),
    active: isActive,
    className: 'ubits-pagination__page-button',
    onClick: onClick ? () => onClick(page) : undefined
  });
}

/**
 * Renderiza el componente Pagination como HTML string
 */
export function renderPagination(options: PaginationOptions): string {
  const {
    currentPage = 1,
    totalPages,
    totalItems,
    itemsPerPage,
    variant = 'default',
    size = 'md',
    maxVisiblePages = 7,
    showFirst = true,
    showLast = true,
    showPrevNext = true,
    showInfo = false,
    showItemsPerPage = false,
    itemsPerPageOptions = [10, 20, 50, 100],
    className = '',
    attributes = {},
    labels = {}
  } = options;

  // Validar página actual
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  // Construir clases CSS
  const classes = [
    'ubits-pagination',
    `ubits-pagination--${variant}`,
    `ubits-pagination--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Labels por defecto
  const defaultLabels = {
    first: 'Primera',
    last: 'Última',
    previous: 'Anterior',
    next: 'Siguiente',
    page: 'Página',
    of: 'de',
    items: 'items',
    itemsPerPage: 'Por página',
    ...labels
  };

  // Renderizar información de items si está habilitada
  let infoHTML = '';
  if (showInfo && totalItems !== undefined) {
    const start = (validCurrentPage - 1) * (itemsPerPage || 10) + 1;
    const end = Math.min(validCurrentPage * (itemsPerPage || 10), totalItems);
    infoHTML = `
      <div class="ubits-pagination__info">
        <span class="ubits-body-sm">${start}-${end} ${defaultLabels.of} ${totalItems} ${defaultLabels.items}</span>
      </div>
    `;
  }

  // Renderizar selector de items por página si está habilitado
  let itemsPerPageHTML = '';
  if (showItemsPerPage) {
    const selectId = `ubits-pagination-items-per-page-${Date.now()}`;
    const listId = `ubits-pagination-list-${Date.now()}`;
    const currentValue = itemsPerPage || itemsPerPageOptions[0];
    
    // Convertir opciones a ListItems
    const listItems: ListItem[] = itemsPerPageOptions.map(opt => ({
      label: String(opt),
      value: String(opt),
      state: 'default',
      selected: opt === currentValue
    }));
    
    itemsPerPageHTML = `
      <div class="ubits-pagination__items-per-page">
        <label class="ubits-body-sm">${defaultLabels.itemsPerPage}:</label>
        <div class="ubits-pagination__select-wrapper" style="position: relative; display: inline-block;">
          <button 
            type="button" 
            class="ubits-pagination__select-button ubits-body-sm" 
            id="${selectId}"
            data-list-id="${listId}"
            aria-haspopup="listbox"
            aria-expanded="false"
          >
            ${currentValue}
            <i class="fas fa-chevron-down" style="margin-left: var(--ubits-spacing-xs); font-size: var(--modifiers-normal-body-xs-regular-fontsize);"></i>
          </button>
          <div id="${listId}" class="ubits-pagination__list-container" style="display: none;"></div>
        </div>
      </div>
    `;
  }

  // Renderizar botones de navegación
  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  const buttons: string[] = [];

  // Botón Primera
  if (showFirst && variant === 'default') {
    buttons.push(renderButton({
      variant: 'tertiary',
      size: buttonSize,
      icon: 'angle-double-left',
      iconStyle: 'solid',
      iconOnly: true,
      disabled: validCurrentPage === 1,
      className: 'ubits-pagination__nav-button',
      attributes: {
        'aria-label': defaultLabels.first,
        'title': defaultLabels.first
      }
    }));
  }

  // Botón Anterior
  if (showPrevNext) {
    buttons.push(renderButton({
      variant: 'tertiary',
      size: buttonSize,
      icon: 'chevron-left',
      iconStyle: 'solid',
      iconOnly: true,
      disabled: validCurrentPage === 1,
      className: 'ubits-pagination__nav-button',
      attributes: {
        'aria-label': defaultLabels.previous,
        'title': defaultLabels.previous
      }
    }));
  }

  // Páginas visibles
  if (variant === 'default') {
    const visiblePages = calculateVisiblePages(validCurrentPage, totalPages, maxVisiblePages);
    
    // Mostrar "..." al inicio si es necesario
    if (visiblePages[0] > 1) {
      buttons.push(`<span class="ubits-pagination__ellipsis">...</span>`);
    }
    
    // Botones de páginas
    visiblePages.forEach(page => {
      buttons.push(renderPageButton(page, page === validCurrentPage, size));
    });
    
    // Mostrar "..." al final si es necesario
    if (visiblePages[visiblePages.length - 1] < totalPages) {
      buttons.push(`<span class="ubits-pagination__ellipsis">...</span>`);
    }
  } else if (variant === 'compact') {
    // Variante compacta: solo muestra página actual y total
    buttons.push(`
      <span class="ubits-pagination__page-info ubits-body-md">
        ${defaultLabels.page} ${validCurrentPage} ${defaultLabels.of} ${totalPages}
      </span>
    `);
  } else if (variant === 'minimal') {
    // Variante minimal: solo botones anterior/siguiente
    // Ya están incluidos arriba
  }

  // Botón Siguiente
  if (showPrevNext) {
    buttons.push(renderButton({
      variant: 'tertiary',
      size: buttonSize,
      icon: 'chevron-right',
      iconStyle: 'solid',
      iconOnly: true,
      disabled: validCurrentPage === totalPages,
      className: 'ubits-pagination__nav-button',
      attributes: {
        'aria-label': defaultLabels.next,
        'title': defaultLabels.next
      }
    }));
  }

  // Botón Última
  if (showLast && variant === 'default') {
    buttons.push(renderButton({
      variant: 'tertiary',
      size: buttonSize,
      icon: 'angle-double-right',
      iconStyle: 'solid',
      iconOnly: true,
      disabled: validCurrentPage === totalPages,
      className: 'ubits-pagination__nav-button',
      attributes: {
        'aria-label': defaultLabels.last,
        'title': defaultLabels.last
      }
    }));
  }

  return `
    <div class="${classes}" ${attrs} data-current-page="${validCurrentPage}" data-total-pages="${totalPages}">
      ${infoHTML}
      ${itemsPerPageHTML}
      <div class="ubits-pagination__controls">
        ${buttons.join('')}
      </div>
    </div>
  `;
}

/**
 * Crea un Pagination y lo inserta en el DOM
 */
export function createPagination(options: PaginationOptions & { containerId?: string }): HTMLElement | null {
  const { containerId, ...paginationOptions } = options;
  
  if (!containerId) {
    console.error('❌ [Pagination] containerId es requerido para createPagination');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [Pagination] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderPagination(paginationOptions);
  container.innerHTML = html;
  
  const paginationElement = container.querySelector('.ubits-pagination') as HTMLElement;
  
  if (!paginationElement) {
    console.error('❌ [Pagination] No se pudo crear el elemento de paginación');
    return null;
  }
  
  // Agregar event listeners para botones de página
  const pageButtons = paginationElement.querySelectorAll('.ubits-pagination__page-button');
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = parseInt(button.textContent || '1');
      if (paginationOptions.onPageChange) {
        paginationOptions.onPageChange(page);
      }
    });
  });
  
  // Agregar event listeners para botones de navegación
  const navButtons = paginationElement.querySelectorAll('.ubits-pagination__nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentPage = parseInt(paginationElement.getAttribute('data-current-page') || '1');
      const totalPages = parseInt(paginationElement.getAttribute('data-total-pages') || '1');
      const ariaLabel = button.getAttribute('aria-label') || '';
      
      let newPage = currentPage;
      
      if (ariaLabel.includes('Primera') || ariaLabel.includes('First')) {
        newPage = 1;
      } else if (ariaLabel.includes('Última') || ariaLabel.includes('Last')) {
        newPage = totalPages;
      } else if (ariaLabel.includes('Anterior') || ariaLabel.includes('Previous')) {
        newPage = Math.max(1, currentPage - 1);
      } else if (ariaLabel.includes('Siguiente') || ariaLabel.includes('Next')) {
        newPage = Math.min(totalPages, currentPage + 1);
      }
      
      if (newPage !== currentPage && paginationOptions.onPageChange) {
        paginationOptions.onPageChange(newPage);
      }
    });
  });
  
  // Agregar event listener para selector de items por página (usando List de UBITS)
  console.log('🔍 [Pagination] Inicializando selector de items por página...');
  console.log('🔍 [Pagination] showItemsPerPage:', paginationOptions.showItemsPerPage);
  console.log('🔍 [Pagination] paginationElement:', paginationElement);
  
  const selectButton = paginationElement.querySelector('.ubits-pagination__select-button') as HTMLButtonElement;
  const listContainer = paginationElement.querySelector('.ubits-pagination__list-container') as HTMLElement;
  
  console.log('🔍 [Pagination] selectButton encontrado:', !!selectButton);
  console.log('🔍 [Pagination] listContainer encontrado:', !!listContainer);
  
  if (selectButton) {
    console.log('🔍 [Pagination] selectButton:', {
      id: selectButton.id,
      className: selectButton.className,
      textContent: selectButton.textContent,
      dataListId: selectButton.getAttribute('data-list-id')
    });
  }
  
  if (listContainer) {
    console.log('🔍 [Pagination] listContainer:', {
      id: listContainer.id,
      className: listContainer.className,
      style: listContainer.style.cssText,
      parentElement: listContainer.parentElement?.tagName
    });
  }
  
  if (selectButton && listContainer) {
    const listId = selectButton.getAttribute('data-list-id') || `ubits-pagination-list-${Date.now()}`;
    const currentValue = paginationOptions.itemsPerPage || paginationOptions.itemsPerPageOptions?.[0] || 10;
    
    console.log('🔍 [Pagination] Configuración inicial:', {
      listId,
      currentValue,
      itemsPerPageOptions: paginationOptions.itemsPerPageOptions
    });
    
    // Asegurar que el contenedor tenga el ID antes de usarlo
    listContainer.id = listId;
    console.log('🔍 [Pagination] ID asignado al contenedor:', listContainer.id);
    
    // Convertir opciones a ListItems
    const listItems: ListItem[] = (paginationOptions.itemsPerPageOptions || [10, 20, 50, 100]).map(opt => ({
      label: String(opt),
      value: String(opt),
      state: 'default',
      selected: opt === currentValue
    }));
    
    console.log('🔍 [Pagination] ListItems creados:', listItems);
    
    let isOpen = false;
    
    const toggleDropdown = () => {
      console.log('🔍 [Pagination] ========== toggleDropdown called ==========');
      console.log('🔍 [Pagination] isOpen:', isOpen);
      console.log('🔍 [Pagination] listContainer:', {
        id: listContainer.id,
        display: listContainer.style.display,
        innerHTML: listContainer.innerHTML.substring(0, 100)
      });
      
      if (isOpen) {
        console.log('🔍 [Pagination] Cerrando dropdown...');
        listContainer.style.display = 'none';
        selectButton.setAttribute('aria-expanded', 'false');
        isOpen = false;
        console.log('🔍 [Pagination] Dropdown cerrado');
        return;
      }
      
      console.log('🔍 [Pagination] Abriendo dropdown...');
      
      // Limpiar contenido previo
      listContainer.innerHTML = '';
      console.log('🔍 [Pagination] Contenedor limpiado');
      
      // Mapear tamaño del paginador al tamaño del List
      const paginationSize = paginationOptions.size || 'md';
      const listSize: 'sm' | 'md' | 'lg' = paginationSize === 'sm' ? 'sm' : paginationSize === 'lg' ? 'lg' : 'md';
      console.log('🔍 [Pagination] Tamaño del paginador:', paginationSize, '-> Tamaño del List:', listSize);
      
      console.log('🔍 [Pagination] Configuración de la lista:', {
        containerId: listId,
        itemsCount: listItems.length,
        size: listSize,
        containerExists: !!document.getElementById(listId),
        containerElement: document.getElementById(listId)
      });
      
      // Verificar que el contenedor existe antes de crear la lista
      const container = document.getElementById(listId);
      if (!container) {
        console.error('❌ [Pagination] Container not found:', listId);
        console.error('❌ [Pagination] Buscando en todo el documento...');
        const allContainers = document.querySelectorAll('[id*="pagination"]');
        console.error('❌ [Pagination] Contenedores encontrados:', Array.from(allContainers).map(el => ({
          id: el.id,
          tagName: el.tagName,
          className: el.className
        })));
        return;
      }
      
      console.log('✅ [Pagination] Container encontrado:', {
        id: container.id,
        tagName: container.tagName,
        className: container.className,
        parentElement: container.parentElement?.tagName,
        style: container.style.cssText
      });
      
      try {
        console.log('🔍 [Pagination] Llamando a createList...');
        console.log('🔍 [Pagination] createList disponible:', typeof createList);
        
        const listElement = createList({
          containerId: listId,
          items: listItems,
          size: listSize,
          maxHeight: 'none', // Altura dinámica según número de items
          onSelectionChange: (selectedItem, index) => {
            console.log('🔍 [Pagination] ========== Item selected ==========');
            console.log('🔍 [Pagination] selectedItem:', selectedItem);
            console.log('🔍 [Pagination] index:', index);
            console.log('🔍 [Pagination] itemsPerPageOptions:', paginationOptions.itemsPerPageOptions);
            
            if (selectedItem && paginationOptions.itemsPerPageOptions && paginationOptions.itemsPerPageOptions[index] !== undefined) {
              const value = paginationOptions.itemsPerPageOptions[index];
              console.log('🔍 [Pagination] Valor seleccionado:', value);
              
              // Actualizar el texto del botón manteniendo el ícono
              const icon = selectButton.querySelector('i');
              console.log('🔍 [Pagination] Icon encontrado:', !!icon);
              if (icon) {
                selectButton.innerHTML = `${value} ${icon.outerHTML}`;
              } else {
                selectButton.textContent = String(value);
              }
              
              listContainer.style.display = 'none';
              selectButton.setAttribute('aria-expanded', 'false');
              isOpen = false;
              
              if (paginationOptions.onItemsPerPageChange) {
                console.log('🔍 [Pagination] Llamando onItemsPerPageChange con:', value);
                paginationOptions.onItemsPerPageChange(value);
              } else {
                console.warn('⚠️ [Pagination] onItemsPerPageChange no está definido');
              }
            } else {
              console.warn('⚠️ [Pagination] selectedItem o itemsPerPageOptions no válidos');
            }
          },
        });
        
        console.log('✅ [Pagination] List created successfully');
        console.log('🔍 [Pagination] listElement retornado:', {
          tagName: listElement.tagName,
          className: listElement.className,
          id: listElement.id,
          innerHTML: listElement.innerHTML.substring(0, 200)
        });
        
        // Verificar que el List se creó dentro del contenedor
        const createdList = container.querySelector('.ubits-list');
        console.log('🔍 [Pagination] List dentro del contenedor:', {
          found: !!createdList,
          className: createdList?.className,
          style: createdList ? window.getComputedStyle(createdList).display : 'N/A'
        });
        
        listContainer.style.display = 'block';
        selectButton.setAttribute('aria-expanded', 'true');
        isOpen = true;
        
        console.log('✅ [Pagination] Dropdown abierto, display:', listContainer.style.display);
        console.log('🔍 [Pagination] listContainer después de abrir:', {
          display: window.getComputedStyle(listContainer).display,
          visibility: window.getComputedStyle(listContainer).visibility,
          opacity: window.getComputedStyle(listContainer).opacity,
          height: window.getComputedStyle(listContainer).height,
          width: window.getComputedStyle(listContainer).width
        });
      } catch (error) {
        console.error('❌ [Pagination] Error creating items per page list:', error);
        console.error('❌ [Pagination] Error stack:', error instanceof Error ? error.stack : 'N/A');
      }
    };
    
    console.log('🔍 [Pagination] Agregando event listener al botón...');
    selectButton.addEventListener('click', (e) => {
      console.log('🔍 [Pagination] ========== Button clicked ==========');
      console.log('🔍 [Pagination] Event:', {
        type: e.type,
        target: e.target,
        currentTarget: e.currentTarget,
        bubbles: e.bubbles
      });
      e.stopPropagation();
      toggleDropdown();
    });
    console.log('✅ [Pagination] Event listener agregado');
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (isOpen && !listContainer.contains(e.target as Node) && !selectButton.contains(e.target as Node)) {
        console.log('🔍 [Pagination] Clic fuera detectado, cerrando dropdown');
        listContainer.style.display = 'none';
        selectButton.setAttribute('aria-expanded', 'false');
        isOpen = false;
      }
    });
    
    console.log('✅ [Pagination] Selector de items por página inicializado correctamente');
  } else {
    console.error('❌ [Pagination] Select button or list container not found');
    console.error('❌ [Pagination] selectButton:', selectButton);
    console.error('❌ [Pagination] listContainer:', listContainer);
    console.error('❌ [Pagination] paginationElement HTML:', paginationElement.innerHTML.substring(0, 500));
  }
  
  console.log('✅ [Pagination] Paginador creado exitosamente');
  return paginationElement;
}

