/**
 * ListProvider: Lógica para renderizar y gestionar el componente List
 */

import type { ListOptions, ListItem } from './types/ListOptions';
import './styles/list.css';

/**
 * Renderiza el HTML de una lista
 */
export function renderList(options: ListOptions): string {
  const {
    items,
    size = 'md',
    maxHeight = '400px',
    className = '',
    attributes = {}
  } = options;

  const containerClasses = ['ubits-list', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  // Agregar ID al elemento de lista si showScrollbar está activo
  const listId = options.showScrollbar ? `${options.containerId}-list` : undefined;
  const listIdAttr = listId ? `id="${listId}"` : '';
  
  let listHTML = `<div class="${containerClasses}" role="list" style="max-height: ${maxHeight};" ${listIdAttr} ${containerAttrs} data-ubits-id="🧩-ux-list">`;

  items.forEach((item, index) => {
    const itemId = item.value || `list-item-${index}`;
    const itemState = item.state || (item.selected ? 'active' : 'default');
    const itemClasses = [
      'ubits-list-item',
      `ubits-list-item--${size}`,
      itemState !== 'default' ? `ubits-list-item--${itemState}` : ''
    ].filter(Boolean).join(' ');

    const itemAttrs: string[] = [];
    if (item.selected) {
      itemAttrs.push('aria-selected="true"');
    }
    if (itemState === 'disabled') {
      itemAttrs.push('aria-disabled="true"');
    } else {
      itemAttrs.push('tabindex="0"');
    }
    itemAttrs.push(`data-value="${itemId}"`);
    itemAttrs.push(`data-index="${index}"`);

    if (item.attributes) {
      Object.entries(item.attributes).forEach(([key, value]) => {
        itemAttrs.push(`${key}="${value}"`);
      });
    }

    listHTML += `
      <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
        ${item.label}
      </div>
    `;
  });
  
  // Logs sobre los items renderizados
  if (options.showScrollbar) {
    console.log('[List renderList] Items renderizados:', {
      totalItems: items.length,
      size,
      firstItemClasses: items[0] ? [
        'ubits-list-item',
        `ubits-list-item--${size}`,
        (items[0].state || (items[0].selected ? 'active' : 'default')) !== 'default' 
          ? `ubits-list-item--${items[0].state || (items[0].selected ? 'active' : 'default')}` 
          : ''
      ].filter(Boolean).join(' ') : 'N/A'
    });
  }

  listHTML += '</div>';

  return listHTML;
}

/**
 * Crea una lista interactiva en el DOM
 */
export function createList(options: ListOptions): HTMLElement {
  const {
    containerId,
    items,
    size = 'md',
    onSelectionChange,
    multiple = false,
    showScrollbar = false
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  console.log('[List createList] INICIO - Detalles:', {
    containerId,
    showScrollbar,
    containerExists: !!container,
    containerHTML: container.innerHTML.substring(0, 200),
    containerChildren: container.children.length,
    containerTagName: container.tagName,
    containerIdAttr: container.id
  });

  const listHTML = renderList(options);
  
  console.log('[List createList] listHTML generado:', {
    listHTMLLength: listHTML.length,
    listHTMLPreview: listHTML.substring(0, 300)
  });
  
  // Si showScrollbar está activo, crear un wrapper con posición relativa
  if (showScrollbar) {
    console.log('[List createList] showScrollbar=true, creando wrapper con scrollbar', {
      containerId,
      containerInnerHTMLBefore: container.innerHTML.substring(0, 200),
      containerChildrenBefore: container.children.length
    });
    
    // Crear wrapper con posición relativa para contener la lista y el scrollbar
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'hidden'; // Mantener hidden para que no se salga
    // Aplicar el shadow y border-radius al wrapper para que se mantenga
    wrapper.style.borderRadius = 'var(--ubits-border-radius-sm, 8px)';
    wrapper.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    wrapper.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.padding = '0';
    wrapper.style.margin = '0';
    
    // Agregar la lista al wrapper
    wrapper.innerHTML = listHTML;
    
        // Crear contenedor para el scrollbar (posicionado absolutamente dentro del wrapper)
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.id = `${containerId}-scrollbar`;
    scrollbarContainer.style.position = 'absolute';
    scrollbarContainer.style.top = '0';
    scrollbarContainer.style.right = '8px'; // Posición desde el borde derecho
    scrollbarContainer.style.width = '8px'; // Ancho del scrollbar
    scrollbarContainer.style.height = '100%';
    scrollbarContainer.style.pointerEvents = 'auto';
    scrollbarContainer.style.zIndex = '10';
    scrollbarContainer.style.boxSizing = 'border-box';
    scrollbarContainer.style.overflow = 'visible'; // Asegurar que el contenido sea visible
    
    wrapper.appendChild(scrollbarContainer);
    
    // Limpiar contenedor y agregar wrapper
    container.innerHTML = '';
    container.appendChild(wrapper);
    
    console.log('[List createList] Wrapper creado y agregado:', {
      containerId,
      wrapperCreated: !!wrapper,
      wrapperTagName: wrapper.tagName,
      wrapperId: wrapper.id,
      wrapperChildren: wrapper.children.length,
      scrollbarContainerId: scrollbarContainer.id,
      scrollbarContainerExists: !!scrollbarContainer,
      containerInnerHTMLAfter: container.innerHTML.substring(0, 400),
      containerChildrenAfter: container.children.length,
      containerFirstChild: container.firstElementChild ? {
        tagName: container.firstElementChild.tagName,
        id: container.firstElementChild.id,
        className: container.firstElementChild.className
      } : null,
      wrapperStyles: {
        position: wrapper.style.position,
        width: wrapper.style.width,
        overflow: wrapper.style.overflow,
        borderRadius: wrapper.style.borderRadius,
        boxShadow: wrapper.style.boxShadow
      },
      scrollbarContainerStyles: {
        position: scrollbarContainer.style.position,
        right: scrollbarContainer.style.right,
        width: scrollbarContainer.style.width,
        id: scrollbarContainer.id
      },
      scrollbarContainerInDOM: !!document.getElementById(scrollbarContainer.id)
    });
  } else {
    // Si no hay scrollbar, simplemente agregar la lista
    console.log('[List createList] showScrollbar=false, agregando lista directamente', {
      containerId,
      containerInnerHTMLBefore: container.innerHTML.substring(0, 200)
    });
    container.innerHTML = listHTML;
    console.log('[List createList] Lista agregada directamente:', {
      containerId,
      containerInnerHTMLAfter: container.innerHTML.substring(0, 300),
      containerChildren: container.children.length
    });
    
    // Ocultar scrollbar nativo cuando showScrollbar es false
    const listElement = container.querySelector('.ubits-list') as HTMLElement;
    if (listElement) {
      // El scrollbar ya está oculto por defecto en el CSS
      // No hacer nada adicional
    }
  }

  const listElement = container.querySelector('.ubits-list') as HTMLElement;
  if (!listElement) {
    throw new Error('Failed to create list element');
  }

  // Agregar data-ubits-id si no está presente
  if (!listElement.hasAttribute('data-ubits-id')) {
    listElement.setAttribute('data-ubits-id', '🧩-ux-list');
  }

  // Logs detallados sobre el listElement
  console.log('[List createList] ListElement encontrado:', {
    id: listElement.id,
    className: listElement.className,
    computedStyles: {
      paddingLeft: window.getComputedStyle(listElement).paddingLeft,
      paddingRight: window.getComputedStyle(listElement).paddingRight,
      paddingTop: window.getComputedStyle(listElement).paddingTop,
      paddingBottom: window.getComputedStyle(listElement).paddingBottom,
      width: window.getComputedStyle(listElement).width,
      boxShadow: window.getComputedStyle(listElement).boxShadow,
      borderRadius: window.getComputedStyle(listElement).borderRadius
    },
    inlineStyles: {
      paddingRight: listElement.style.paddingRight,
      maxHeight: listElement.style.maxHeight
    }
  });

  // Configurar scrollbar si está habilitado
  if (showScrollbar) {
    // Asegurar que el listElement tenga un ID para el scrollbar
    if (!listElement.id) {
      listElement.id = `${containerId}-list`;
    }
    
    // Ocultar scrollbar nativo completamente
    listElement.style.setProperty('scrollbar-width', 'none', 'important');
    listElement.style.setProperty('-ms-overflow-style', 'none', 'important');
    
    // Agregar estilo para WebKit para ocultar completamente el scrollbar nativo
    const style = document.createElement('style');
    style.textContent = `
      #${listElement.id}::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
      #${listElement.id}::-webkit-scrollbar-track {
        display: none !important;
        background: transparent !important;
      }
      #${listElement.id}::-webkit-scrollbar-thumb {
        display: none !important;
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    // Agregar atributo para identificar el elemento scrollable
    listElement.setAttribute('data-scrollable', 'true');
    
    // Asegurar que la lista tenga la altura correcta y padding para el scrollbar
    const wrapper = listElement.parentElement;
    if (wrapper && wrapper !== container) {
      // El wrapper es el contenedor relativo
      const maxHeight = options.maxHeight || '400px';
      wrapper.style.maxHeight = maxHeight;
      listElement.style.maxHeight = maxHeight;
      // Remover background y shadow de la lista ya que están en el wrapper
      listElement.style.background = 'transparent';
      listElement.style.boxShadow = 'none';
      listElement.style.borderRadius = '0';
      // Asegurar que la lista no tenga padding adicional que cause espacio extra
      listElement.style.paddingLeft = '0';
      listElement.style.paddingTop = '0';
      listElement.style.paddingBottom = '0';
      listElement.style.margin = '0';
      // Agregar padding-right para que el contenido no quede debajo del scrollbar
      // El scrollbar está en right: 8px con width: 8px, así que necesitamos espacio mínimo
      // Usamos 12px para mantener proporción con el padding izquierdo (0px) y dar espacio suficiente
      listElement.style.paddingRight = '12px';
      listElement.style.boxSizing = 'border-box';
      listElement.style.width = '100%';
      
      // Logs después de aplicar estilos
      const listElementComputed = window.getComputedStyle(listElement);
      const firstItem = listElement.querySelector('.ubits-list-item') as HTMLElement;
      const firstItemComputed = firstItem ? window.getComputedStyle(firstItem) : null;
      
      // Calcular posiciones relativas
      const listRect = listElement.getBoundingClientRect();
      const scrollbarContainerElement = document.getElementById(`${containerId}-scrollbar`) as HTMLElement;
      const scrollbarRect = scrollbarContainerElement ? scrollbarContainerElement.getBoundingClientRect() : null;
      const firstItemRect = firstItem ? firstItem.getBoundingClientRect() : null;
      
      console.log('[List createList] Configuración con scrollbar - DETALLADO:', {
        maxHeight,
        listElementStyles: {
          maxHeight: listElement.style.maxHeight,
          paddingRight: listElement.style.paddingRight,
          paddingLeft: listElement.style.paddingLeft,
          background: listElement.style.background,
          boxShadow: listElement.style.boxShadow,
          borderRadius: listElement.style.borderRadius,
          width: listElement.style.width
        },
        listElementComputed: {
          paddingLeft: listElementComputed.paddingLeft,
          paddingRight: listElementComputed.paddingRight,
          paddingTop: listElementComputed.paddingTop,
          paddingBottom: listElementComputed.paddingBottom,
          marginLeft: listElementComputed.marginLeft,
          marginRight: listElementComputed.marginRight,
          width: listElementComputed.width,
          boxShadow: listElementComputed.boxShadow
        },
        listElementRect: {
          left: listRect.left,
          right: listRect.right,
          width: listRect.width
        },
        scrollbarRect: scrollbarRect ? {
          left: scrollbarRect.left,
          right: scrollbarRect.right,
          width: scrollbarRect.width
        } : null,
        distanciaScrollbarDesdeBorde: scrollbarRect ? listRect.right - scrollbarRect.right : null,
        distanciaScrollbarDesdeItems: (firstItemRect && scrollbarRect) ? scrollbarRect.left - firstItemRect.right : null,
        firstItemComputed: firstItemComputed ? {
          paddingLeft: firstItemComputed.paddingLeft,
          paddingRight: firstItemComputed.paddingRight,
          marginLeft: firstItemComputed.marginLeft,
          marginRight: firstItemComputed.marginRight,
          width: firstItemComputed.width,
          className: firstItem.className
        } : null,
        firstItemRect: firstItemRect ? {
          left: firstItemRect.left,
          right: firstItemRect.right,
          width: firstItemRect.width
        } : null,
        wrapperStyles: {
          maxHeight: wrapper.style.maxHeight,
          borderRadius: wrapper.style.borderRadius,
          boxShadow: wrapper.style.boxShadow,
          padding: wrapper.style.padding,
          margin: wrapper.style.margin
        }
      });
    }
    
    // Inicializar scrollbar UBITS después de que el DOM esté listo
    const initScrollbar = async () => {
      try {
        // Obtener el contenedor del scrollbar
        const scrollbarContainerId = `${containerId}-scrollbar`;
        const scrollbarContainer = document.getElementById(scrollbarContainerId);
        
        if (!scrollbarContainer) {
          console.error('Scrollbar container not found');
          return;
        }

        // Asegurar que el scrollbar container tenga la misma altura que la lista
        const listHeight = listElement.clientHeight;
        const maxHeight = listElement.style.maxHeight || options.maxHeight || '400px';
        scrollbarContainer.style.height = `${listHeight}px`;
        scrollbarContainer.style.maxHeight = maxHeight;

        console.log('[List initScrollbar] Dimensiones:', {
          listHeight,
          listScrollHeight: listElement.scrollHeight,
          listClientHeight: listElement.clientHeight,
          maxHeight,
          scrollbarContainerHeight: scrollbarContainer.style.height,
          scrollbarContainerDisplay: scrollbarContainer.style.display
        });

        // Verificar si necesita scroll
        const needsScroll = listElement.scrollHeight > listElement.clientHeight;
        console.log('[List initScrollbar] Necesita scroll:', needsScroll);
        
        if (!needsScroll) {
          // Ocultar el scrollbar si no es necesario
          scrollbarContainer.style.display = 'none';
          console.log('[List initScrollbar] Scrollbar oculto - no necesita scroll');
          return;
        }

        // Mostrar el scrollbar si es necesario
        scrollbarContainer.style.display = 'block';
        scrollbarContainer.style.visibility = 'visible';
        scrollbarContainer.style.opacity = '1';
        console.log('[List initScrollbar] Scrollbar visible');

        // Importar y crear scrollbar
        const { createScrollbar } = await import('../../scroll/src/ScrollProvider');
        const scrollbarInstance = createScrollbar({
          orientation: 'vertical',
          targetId: listElement.id,
          containerId: scrollbarContainerId
        });

        // Esperar un frame para que el scrollbar se renderice
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        const scrollbarElement = scrollbarInstance?.element;
        const scrollbarBar = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
        
        console.log('[List initScrollbar] Scrollbar creado:', {
          scrollbarInstance: !!scrollbarInstance,
          scrollbarElement: scrollbarElement,
          scrollbarElementHTML: scrollbarElement?.outerHTML,
          scrollbarContainer: scrollbarContainer,
          scrollbarContainerHTML: scrollbarContainer.innerHTML,
          scrollbarBar: scrollbarBar,
          scrollbarBarStyles: scrollbarBar ? {
            opacity: window.getComputedStyle(scrollbarBar).opacity,
            display: window.getComputedStyle(scrollbarBar).display,
            visibility: window.getComputedStyle(scrollbarBar).visibility,
            width: window.getComputedStyle(scrollbarBar).width,
            height: window.getComputedStyle(scrollbarBar).height,
            backgroundColor: window.getComputedStyle(scrollbarBar).backgroundColor
          } : null,
          scrollbarContainerStyles: {
            display: scrollbarContainer.style.display,
            visibility: scrollbarContainer.style.visibility,
            position: scrollbarContainer.style.position,
            right: scrollbarContainer.style.right,
            width: scrollbarContainer.style.width,
            height: scrollbarContainer.style.height,
            zIndex: scrollbarContainer.style.zIndex,
            opacity: scrollbarContainer.style.opacity
          },
          scrollbarContainerComputed: {
            display: window.getComputedStyle(scrollbarContainer).display,
            visibility: window.getComputedStyle(scrollbarContainer).visibility,
            width: window.getComputedStyle(scrollbarContainer).width,
            height: window.getComputedStyle(scrollbarContainer).height,
            opacity: window.getComputedStyle(scrollbarContainer).opacity
          }
        });
        
        // Forzar que el scrollbar sea visible siempre
        if (scrollbarBar) {
          scrollbarBar.style.setProperty('opacity', '1', 'important');
          scrollbarBar.style.setProperty('pointer-events', 'auto', 'important');
          scrollbarBar.style.setProperty('visibility', 'visible', 'important');
          console.log('[List initScrollbar] Scrollbar bar forzado a visible');
        } else {
          console.warn('[List initScrollbar] ⚠️ scrollbarBar no encontrado después de crear scrollbar');
          // Buscar en el scrollbarElement
          if (scrollbarElement) {
            const barInElement = scrollbarElement.querySelector('.ubits-scrollbar__bar') as HTMLElement;
            if (barInElement) {
              barInElement.style.setProperty('opacity', '1', 'important');
              barInElement.style.setProperty('pointer-events', 'auto', 'important');
              barInElement.style.setProperty('visibility', 'visible', 'important');
              console.log('[List initScrollbar] Scrollbar bar encontrado en scrollbarElement y forzado a visible');
            }
          }
        }
        
        // También forzar en el elemento del scrollbar
        if (scrollbarElement) {
          const allBars = scrollbarElement.querySelectorAll('.ubits-scrollbar__bar');
          console.log('[List initScrollbar] Barras encontradas en scrollbarElement:', allBars.length);
          allBars.forEach((bar: HTMLElement) => {
            bar.style.setProperty('opacity', '1', 'important');
            bar.style.setProperty('pointer-events', 'auto', 'important');
            bar.style.setProperty('visibility', 'visible', 'important');
          });
        } else {
          console.warn('[List initScrollbar] ⚠️ scrollbarElement no existe');
        }
        
        // Agregar estilo CSS para forzar visibilidad
        const scrollbarStyle = document.createElement('style');
        scrollbarStyle.id = `list-scrollbar-style-${containerId}`;
        scrollbarStyle.textContent = `
          #${scrollbarContainerId} .ubits-scrollbar__bar {
            opacity: 1 !important;
            pointer-events: auto !important;
            visibility: visible !important;
          }
          #${scrollbarContainerId} .ubits-scrollbar {
            opacity: 1 !important;
            visibility: visible !important;
          }
        `;
        document.head.appendChild(scrollbarStyle);

        if (scrollbarInstance) {
          (container as any)._scrollbarInstance = scrollbarInstance;
          
          // Llamar a update para inicializar el scrollbar y hacerlo visible
          setTimeout(() => {
            if (scrollbarInstance.update) {
              scrollbarInstance.update();
              console.log('[List initScrollbar] Scrollbar actualizado después de crear');
              
              // Forzar visibilidad nuevamente después de update
              const barAfterUpdate = scrollbarContainer.querySelector('.ubits-scrollbar__bar') as HTMLElement;
              if (barAfterUpdate) {
                barAfterUpdate.style.setProperty('opacity', '1', 'important');
                barAfterUpdate.style.setProperty('pointer-events', 'auto', 'important');
                barAfterUpdate.style.setProperty('visibility', 'visible', 'important');
                console.log('[List initScrollbar] Scrollbar bar forzado a visible después de update');
              }
            }
          }, 200);
          
          // Actualizar altura del scrollbar cuando cambie el tamaño de la lista
          const resizeObserver = new ResizeObserver(() => {
            const newHeight = listElement.clientHeight;
            scrollbarContainer.style.height = `${newHeight}px`;
            if (scrollbarInstance.update) {
              scrollbarInstance.update();
            }
          });
          resizeObserver.observe(listElement);
          (container as any)._resizeObserver = resizeObserver;
        } else {
          console.error('[List initScrollbar] No se pudo crear el scrollbar');
        }
      } catch (error) {
        console.error('Error initializing scrollbar:', error);
      }
    };

    // Esperar a que el DOM esté listo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScrollbar();
      });
    });
  }

  // Agregar event listeners
  const listItems = listElement.querySelectorAll('.ubits-list-item');
  let selectedIndex: number | null = null;
  
  // Logs detallados sobre los items del DOM
  if (listItems.length > 0) {
    const firstItem = listItems[0] as HTMLElement;
    const firstItemComputed = window.getComputedStyle(firstItem);
    const firstItemRect = firstItem.getBoundingClientRect();
    const listElementRect = listElement.getBoundingClientRect();
    
    console.log('[List createList] Primer item del DOM - DETALLADO:', {
      itemCount: listItems.length,
      firstItemStyles: {
        paddingLeft: firstItemComputed.paddingLeft,
        paddingRight: firstItemComputed.paddingRight,
        paddingTop: firstItemComputed.paddingTop,
        paddingBottom: firstItemComputed.paddingBottom,
        marginLeft: firstItemComputed.marginLeft,
        marginRight: firstItemComputed.marginRight,
        width: firstItemComputed.width,
        className: firstItem.className
      },
      firstItemRect: {
        left: firstItemRect.left,
        right: firstItemRect.right,
        width: firstItemRect.width
      },
      listElementStyles: {
        paddingLeft: window.getComputedStyle(listElement).paddingLeft,
        paddingRight: window.getComputedStyle(listElement).paddingRight,
        width: window.getComputedStyle(listElement).width
      },
      listElementRect: {
        left: listElementRect.left,
        right: listElementRect.right,
        width: listElementRect.width
      },
      espacioIzquierdo: firstItemRect.left - listElementRect.left,
      espacioDerecho: listElementRect.right - firstItemRect.right
    });
  }

  listItems.forEach((itemEl, index) => {
    const item = items[index];
    if (!item) return;

    // Click handler
    if (item.state !== 'disabled') {
      itemEl.addEventListener('click', () => {
        if (item.onClick) {
          item.onClick(item, index);
        }

        if (!multiple) {
          // Deseleccionar anterior
          if (selectedIndex !== null && selectedIndex !== index) {
            const prevItem = listItems[selectedIndex];
            prevItem.classList.remove('ubits-list-item--active');
            prevItem.removeAttribute('aria-selected');
          }

          // Seleccionar nuevo
          if (selectedIndex !== index) {
            itemEl.classList.add('ubits-list-item--active');
            itemEl.setAttribute('aria-selected', 'true');
            selectedIndex = index;

            if (onSelectionChange) {
              onSelectionChange(item, index);
            }
          } else {
            // Deseleccionar si se hace clic en el mismo
            itemEl.classList.remove('ubits-list-item--active');
            itemEl.removeAttribute('aria-selected');
            selectedIndex = null;

            if (onSelectionChange) {
              onSelectionChange(null, null);
            }
          }
        } else {
          // Selección múltiple
          const isSelected = itemEl.classList.contains('ubits-list-item--active');
          if (isSelected) {
            itemEl.classList.remove('ubits-list-item--active');
            itemEl.removeAttribute('aria-selected');
          } else {
            itemEl.classList.add('ubits-list-item--active');
            itemEl.setAttribute('aria-selected', 'true');
          }

          if (onSelectionChange) {
            const selectedItems = Array.from(listItems)
              .map((el, idx) => {
                if (el.classList.contains('ubits-list-item--active')) {
                  return { item: items[idx], index: idx };
                }
                return null;
              })
              .filter(Boolean) as Array<{ item: ListItem; index: number }>;

            // Por ahora, solo pasamos el último seleccionado para compatibilidad
            if (selectedItems.length > 0) {
              const last = selectedItems[selectedItems.length - 1];
              onSelectionChange(last.item, last.index);
            } else {
              onSelectionChange(null, null);
            }
          }
        }
      });
    }

    // Keyboard navigation
    if (item.state !== 'disabled') {
      itemEl.addEventListener('keydown', (e) => {
        const currentIndex = index;
        let targetIndex: number | null = null;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (itemEl as HTMLElement).click();
          return;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = items.length - 1;
        }

        if (targetIndex !== null) {
          const targetItem = listItems[targetIndex] as HTMLElement;
          if (targetItem && items[targetIndex]?.state !== 'disabled') {
            targetItem.focus();
            targetItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }
  });

  return listElement;
}

