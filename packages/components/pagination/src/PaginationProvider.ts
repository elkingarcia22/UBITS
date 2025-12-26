/**
 * PaginationProvider
 * Lógica de renderizado del componente Pagination
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { PaginationOptions } from './types/PaginationOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderInput, createInput } from '../../input/src/InputProvider';
import type { SelectOption } from '../../input/src/types/InputOptions';
import '../../input/src/styles/input.css';

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
    attributes: {
      'data-page': String(page)
    },
    onClick: onClick ? () => onClick(page) : undefined
  });
}

/**
 * Renderiza el componente Pagination como HTML string
 */
export function renderPagination(options: PaginationOptions & { containerId?: string }): string {
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
    labels = {},
    containerId
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
    // Usar un ID basado en el containerId si está disponible, o generar uno único
    // El ID se guardará en un data attribute para que createPagination pueda encontrarlo
    const selectContainerId = options.containerId 
      ? `${options.containerId}-items-per-page-select`
      : `ubits-pagination-items-per-page-${Date.now()}`;
    const currentValue = itemsPerPage || itemsPerPageOptions[0];
    
    // Convertir opciones a SelectOption para el Input Select
    const selectOptions: SelectOption[] = itemsPerPageOptions.map(opt => ({
      value: String(opt),
      text: String(opt)
    }));
    
    // Mapear tamaño del paginador al tamaño del Input
    const paginationSize = size || 'md';
    const inputSize = paginationSize === 'sm' ? 'sm' : paginationSize === 'lg' ? 'lg' : 'md';
    
    // Renderizar Input Select de UBITS
    const selectInputHTML = renderInput({
      containerId: selectContainerId,
      type: 'select',
      size: inputSize,
      showLabel: false,
      showHelper: false,
      value: String(currentValue),
      selectOptions: selectOptions,
      placeholder: String(itemsPerPageOptions[0]),
      className: 'ubits-pagination__select-input',
      attributes: {
        'style': 'width: auto; min-width: 60px; max-width: 100px;'
      }
    });
    
    // El renderInput devuelve el HTML completo del input (label, input, helper, etc.)
    // Necesitamos insertarlo en un contenedor con el ID especificado
    itemsPerPageHTML = `
      <div class="ubits-pagination__items-per-page">
        <label class="ubits-body-sm">${defaultLabels.itemsPerPage}:</label>
        <div class="ubits-pagination__select-wrapper" style="position: relative; display: inline-block;">
          <div id="${selectContainerId}">${selectInputHTML}</div>
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
    <div class="${classes}" ${attrs} data-current-page="${validCurrentPage}" data-total-pages="${totalPages}" data-items-per-page-container-id="${showItemsPerPage && containerId ? `${containerId}-items-per-page-select` : ''}" data-ubits-id="🧩-ux-pagination">
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
    console.error(`❌ [Pagination] Contenedores disponibles en el documento:`, 
      Array.from(document.querySelectorAll('[id*="pagination"]')).map(el => ({
        id: el.id,
        tagName: el.tagName,
        className: el.className
      }))
    );
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

  // Agregar data-ubits-id si no está presente
  if (!paginationElement.hasAttribute('data-ubits-id')) {
    paginationElement.setAttribute('data-ubits-id', '🧩-ux-pagination');
  }
  
  // Agregar event listeners para botones de página
  const pageButtons = paginationElement.querySelectorAll('.ubits-pagination__page-button');
  console.log(`[Pagination] Encontrados ${pageButtons.length} botones de página`);
  
  pageButtons.forEach((button, index) => {
    // Obtener el número de página del data attribute o del texto
    const pageAttr = button.getAttribute('data-page');
    const textContent = button.textContent?.trim() || '';
    const page = pageAttr ? parseInt(pageAttr) : parseInt(textContent || '1');
    
    console.log(`[Pagination] Botón ${index}: data-page="${pageAttr}", textContent="${textContent}", page=${page}`);
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`[Pagination] Click en botón de página: ${page}`);
      
      if (!isNaN(page) && page > 0 && paginationOptions.onPageChange) {
        paginationOptions.onPageChange(page);
      } else {
        console.warn(`[Pagination] Página inválida: ${page}`);
      }
    });
    
    // Asegurar que el botón sea clickeable
    (button as HTMLElement).style.cursor = 'pointer';
    (button as HTMLElement).style.pointerEvents = 'auto';
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
  
  // Agregar event listener para selector de items por página (usando Input Select de UBITS)
  // Solo buscar estos elementos si showItemsPerPage está habilitado
  if (paginationOptions.showItemsPerPage) {
    // Obtener el ID del contenedor del data attribute o generarlo
    const selectContainerIdFromData = paginationElement.getAttribute('data-items-per-page-container-id');
    const selectContainerId = selectContainerIdFromData || 
      (paginationOptions.containerId 
        ? `${paginationOptions.containerId}-items-per-page-select`
        : `ubits-pagination-items-per-page-${Date.now()}`);
    
    // Buscar el contenedor dentro del paginationElement
    const selectWrapper = paginationElement.querySelector('.ubits-pagination__select-wrapper') as HTMLElement;
    let selectContainer: HTMLElement | null = null;
    
    if (selectContainerIdFromData) {
      selectContainer = document.getElementById(selectContainerIdFromData);
    }
    
    // Si no se encontró, buscar dentro del wrapper usando el patrón del ID
    if (!selectContainer && selectWrapper) {
      // Buscar cualquier div con ID que contenga "ubits-pagination-items-per-page"
      const allDivs = selectWrapper.querySelectorAll('div[id*="ubits-pagination-items-per-page"]');
      if (allDivs.length > 0) {
        selectContainer = allDivs[0] as HTMLElement;
      } else {
        // Si aún no se encuentra, buscar el primer div hijo del wrapper
        const firstDiv = selectWrapper.querySelector('div[id]');
        if (firstDiv) {
          selectContainer = firstDiv as HTMLElement;
        }
      }
    }
    
    if (selectContainer) {
      const actualContainerId = selectContainer.id;
      const currentValue = paginationOptions.itemsPerPage || paginationOptions.itemsPerPageOptions?.[0] || 10;
      
      // Convertir opciones a SelectOption para el Input Select
      const selectOptions: SelectOption[] = (paginationOptions.itemsPerPageOptions || [10, 20, 50, 100]).map(opt => ({
        value: String(opt),
        text: String(opt)
      }));
      
      // Mapear tamaño del paginador al tamaño del Input
      const paginationSize = paginationOptions.size || 'md';
      const inputSize = paginationSize === 'sm' ? 'sm' : paginationSize === 'lg' ? 'lg' : 'md';
      
      // Crear Input Select de UBITS después de que el DOM esté listo
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            const inputInstance = createInput({
              containerId: actualContainerId,
              type: 'select',
              size: inputSize,
              showLabel: false,
              showHelper: false,
              value: String(currentValue),
              selectOptions: selectOptions,
              placeholder: String(paginationOptions.itemsPerPageOptions?.[0] || 10),
              className: 'ubits-pagination__select-input',
              onChange: (value: string) => {
                const numericValue = parseInt(value);
                if (paginationOptions.onItemsPerPageChange) {
                  paginationOptions.onItemsPerPageChange(numericValue);
                }
              }
            });
            
            // Aplicar estilos de ancho al input después de crearlo
            if (inputInstance && inputInstance.inputElement) {
              inputInstance.inputElement.style.width = 'auto';
              inputInstance.inputElement.style.minWidth = '60px';
              inputInstance.inputElement.style.maxWidth = '100px';
            }
          } catch (error) {
            console.error('❌ [Pagination] Error creating items per page input select:', error);
            console.error('❌ [Pagination] Error stack:', error instanceof Error ? error.stack : 'N/A');
          }
        });
      });
    } else if (paginationOptions.showItemsPerPage) {
      // Solo mostrar error si showItemsPerPage está habilitado pero no se encontraron los elementos
      console.error('❌ [Pagination] Select container not found');
      console.error('❌ [Pagination] selectContainer:', selectContainer);
      console.error('❌ [Pagination] selectWrapper:', selectWrapper);
      console.error('❌ [Pagination] paginationElement HTML:', paginationElement.innerHTML.substring(0, 500));
    }
  }
  
  return paginationElement;
}

