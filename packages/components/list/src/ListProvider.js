/**
 * ListProvider: Lógica para renderizar y gestionar el componente List
 */
import './styles/list.css';
/**
 * Renderiza el HTML de una lista
 */
export function renderList(options) {
    const { items, size = 'md', maxHeight = '400px', className = '', attributes = {} } = options;
    const containerClasses = ['ubits-list', className].filter(Boolean).join(' ');
    const containerAttrs = Object.entries(attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    let listHTML = `<div class="${containerClasses}" role="list" style="max-height: ${maxHeight};" ${containerAttrs}>`;
    items.forEach((item, index) => {
        const itemId = item.value || `list-item-${index}`;
        const itemState = item.state || (item.selected ? 'active' : 'default');
        const itemClasses = [
            'ubits-list-item',
            `ubits-list-item--${size}`,
            itemState !== 'default' ? `ubits-list-item--${itemState}` : ''
        ].filter(Boolean).join(' ');
        const itemAttrs = [];
        if (item.selected) {
            itemAttrs.push('aria-selected="true"');
        }
        if (itemState === 'disabled') {
            itemAttrs.push('aria-disabled="true"');
        }
        else {
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
    listHTML += '</div>';
    return listHTML;
}
/**
 * Crea una lista interactiva en el DOM
 */
export function createList(options) {
    const { containerId, items, size = 'md', onSelectionChange, multiple = false, showScrollbar = false } = options;
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
        wrapper.style.overflow = 'hidden';
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
        scrollbarContainer.style.right = '8px';
        scrollbarContainer.style.width = '8px';
        scrollbarContainer.style.height = '100%';
        scrollbarContainer.style.pointerEvents = 'auto';
        scrollbarContainer.style.zIndex = '10';
        scrollbarContainer.style.boxSizing = 'border-box';
        scrollbarContainer.style.overflow = 'visible';
        
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
            scrollbarContainerInDOM: !!document.getElementById(scrollbarContainer.id)
        });
    } else {
        console.log('[List createList] showScrollbar=false, agregando lista directamente', {
            containerId,
            containerInnerHTMLBefore: container.innerHTML.substring(0, 200)
        });
        // Si el contenedor ya tiene contenido, reemplazarlo
        container.innerHTML = listHTML;
        console.log('[List createList] Lista agregada directamente:', {
            containerId,
            containerInnerHTMLAfter: container.innerHTML.substring(0, 300),
            containerChildren: container.children.length
        });
    }
    // Buscar el listElement - si hay wrapper, está dentro del wrapper, si no, está directamente en el container
    const listElement = container.querySelector('.ubits-list');
    if (!listElement) {
        throw new Error('Failed to create list element');
    }
    
    // Si showScrollbar está activo, configurar el scrollbar
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
        
        // Configurar estilos de la lista cuando hay scrollbar
        const wrapper = container.firstElementChild;
        if (wrapper && wrapper !== listElement) {
            // El wrapper es el contenedor relativo
            const maxHeight = options.maxHeight || '400px';
            wrapper.style.maxHeight = maxHeight;
            listElement.style.maxHeight = maxHeight;
            // Remover background y shadow de la lista ya que están en el wrapper
            listElement.style.background = 'transparent';
            listElement.style.boxShadow = 'none';
            listElement.style.borderRadius = '0';
            // Asegurar que la lista no tenga padding adicional
            listElement.style.paddingLeft = '0';
            listElement.style.paddingTop = '0';
            listElement.style.paddingBottom = '0';
            listElement.style.margin = '0';
            // Agregar padding-right para que el contenido no quede debajo del scrollbar
            listElement.style.paddingRight = '12px';
            listElement.style.boxSizing = 'border-box';
            listElement.style.width = '100%';
        }
        
        // Inicializar scrollbar UBITS después de que el DOM esté listo
        const initScrollbar = async () => {
            try {
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
                
                // Verificar si necesita scroll
                const needsScroll = listElement.scrollHeight > listElement.clientHeight;
                
                if (!needsScroll) {
                    scrollbarContainer.style.display = 'none';
                    return;
                }
                
                // Mostrar el scrollbar si es necesario
                scrollbarContainer.style.display = 'block';
                scrollbarContainer.style.visibility = 'visible';
                scrollbarContainer.style.opacity = '1';
                
                // Importar y crear scrollbar
                const { createScrollbar } = await import('../../scroll/src/ScrollProvider');
                const scrollbarInstance = createScrollbar({
                    orientation: 'vertical',
                    targetId: listElement.id,
                    containerId: scrollbarContainerId
                });
                
                if (scrollbarInstance) {
                    container._scrollbarInstance = scrollbarInstance;
                    
                    // Forzar visibilidad del scrollbar
                    requestAnimationFrame(() => {
                        const scrollbarBar = scrollbarContainer.querySelector('.ubits-scrollbar__bar');
                        if (scrollbarBar) {
                            scrollbarBar.style.setProperty('opacity', '1', 'important');
                            scrollbarBar.style.setProperty('pointer-events', 'auto', 'important');
                            scrollbarBar.style.setProperty('visibility', 'visible', 'important');
                        }
                    });
                    
                    // Actualizar altura del scrollbar cuando cambie el tamaño de la lista
                    const resizeObserver = new ResizeObserver(() => {
                        const newHeight = listElement.clientHeight;
                        scrollbarContainer.style.height = `${newHeight}px`;
                        if (scrollbarInstance.update) {
                            scrollbarInstance.update();
                        }
                    });
                    resizeObserver.observe(listElement);
                    container._resizeObserver = resizeObserver;
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
    let selectedIndex = null;
    listItems.forEach((itemEl, index) => {
        const item = items[index];
        if (!item)
            return;
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
                    }
                    else {
                        // Deseleccionar si se hace clic en el mismo
                        itemEl.classList.remove('ubits-list-item--active');
                        itemEl.removeAttribute('aria-selected');
                        selectedIndex = null;
                        if (onSelectionChange) {
                            onSelectionChange(null, null);
                        }
                    }
                }
                else {
                    // Selección múltiple
                    const isSelected = itemEl.classList.contains('ubits-list-item--active');
                    if (isSelected) {
                        itemEl.classList.remove('ubits-list-item--active');
                        itemEl.removeAttribute('aria-selected');
                    }
                    else {
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
                            .filter(Boolean);
                        // Por ahora, solo pasamos el último seleccionado para compatibilidad
                        if (selectedItems.length > 0) {
                            const last = selectedItems[selectedItems.length - 1];
                            onSelectionChange(last.item, last.index);
                        }
                        else {
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
                let targetIndex = null;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                }
                else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                }
                else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    itemEl.click();
                    return;
                }
                else if (e.key === 'Home') {
                    e.preventDefault();
                    targetIndex = 0;
                }
                else if (e.key === 'End') {
                    e.preventDefault();
                    targetIndex = items.length - 1;
                }
                if (targetIndex !== null) {
                    const targetItem = listItems[targetIndex];
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
