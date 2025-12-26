/**
 * Calendar Provider
 * Componente Calendar UBITS con selección única y por rango de fechas
 * Implementación simplificada desde cero
 */
/**
 * Nombres de meses en español
 */
const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
/**
 * Nombres de días de la semana en español
 */
const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
/**
 * Formatea una fecha como DD/MM/YYYY
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
/**
 * Compara dos fechas ignorando la hora
 */
function compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() - d2.getTime();
}
/**
 * Verifica si dos fechas son el mismo día
 */
function isSameDay(date1, date2) {
    return compareDates(date1, date2) === 0;
}
/**
 * Verifica si una fecha está en un rango
 */
function isDateInRange(date, startDate, endDate) {
    const dateTime = compareDates(date, startDate);
    const endTime = compareDates(endDate, date);
    return dateTime >= 0 && endTime >= 0;
}
/**
 * Ajusta la posición del dropdown para evitar que se corte
 * Usa position: fixed con coordenadas calculadas para evitar problemas de overflow
 */
function adjustDropdownPosition(dropdown, input) {
    if (!input) {
        console.log('🔴 [Calendar] adjustDropdownPosition: input es null');
        return;
    }
    console.log('🔵 [Calendar] adjustDropdownPosition iniciado', {
        dropdownId: dropdown.id || dropdown.className,
        inputId: input.id || input.className,
        timestamp: new Date().toISOString()
    });
    // Primero aplicar position: fixed y mostrar el dropdown para obtener dimensiones reales
    dropdown.style.setProperty('position', 'fixed', 'important');
    dropdown.style.setProperty('z-index', '10000', 'important');
    dropdown.style.setProperty('display', 'block', 'important');
    dropdown.style.setProperty('visibility', 'hidden', 'important'); // Ocultar temporalmente para medir
    
    requestAnimationFrame(() => {
        const inputRect = input.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Obtener dimensiones reales del dropdown después de que se muestre
        const dropdownRect = dropdown.getBoundingClientRect();
        const dropdownWidth = dropdownRect.width || dropdown.offsetWidth || 120;
        const dropdownHeight = dropdownRect.height || dropdown.offsetHeight || 200;
        
        console.log('🟡 [Calendar] Dimensiones calculadas:', {
            inputRect: {
                top: inputRect.top,
                right: inputRect.right,
                bottom: inputRect.bottom,
                left: inputRect.left,
                width: inputRect.width,
                height: inputRect.height
            },
            viewport: {
                width: viewportWidth,
                height: viewportHeight
            },
            dropdown: {
                width: dropdownWidth,
                height: dropdownHeight,
                rect: {
                    top: dropdownRect.top,
                    right: dropdownRect.right,
                    bottom: dropdownRect.bottom,
                    left: dropdownRect.left
                }
            }
        });
        
        // Calcular posición horizontal (con position: fixed, no usar scrollX)
        const margin = 10; // Margen de seguridad
        const inputWidth = inputRect.width;
        
        let left = inputRect.left;
        let right = 'auto';
        let finalWidth = inputWidth; // Usar el ancho del input como base
        
        // Verificar si se corta a la derecha
        if (inputRect.right + margin > viewportWidth) {
            // Calcular cuánto espacio hay disponible desde el borde derecho del input
            const availableSpace = viewportWidth - inputRect.right - margin;
            
            // Si el input es más ancho que el espacio disponible, limitar el ancho del dropdown
            if (inputWidth > availableSpace && availableSpace > 120) {
                finalWidth = availableSpace;
            }
            
            // Alinear a la derecha del input
            left = 'auto';
            right = `${viewportWidth - inputRect.right}px`;
            dropdown.style.setProperty('right', right, 'important');
            dropdown.style.setProperty('left', 'auto', 'important');
            dropdown.style.setProperty('width', `${finalWidth}px`, 'important');
            dropdown.style.setProperty('min-width', '120px', 'important');
            dropdown.style.setProperty('max-width', `${Math.min(inputWidth, viewportWidth - margin * 2)}px`, 'important');
            
            console.log('🟠 [Calendar] Ajustando posición horizontal (se corta a la derecha):', {
                right,
                inputRight: inputRect.right,
                viewportWidth,
                inputWidth,
                availableSpace,
                finalWidth
            });
        }
        else {
            // Verificar si se corta a la izquierda
            if (inputRect.left < margin) {
                left = margin;
                finalWidth = Math.min(inputWidth, viewportWidth - margin * 2);
                dropdown.style.setProperty('left', `${left}px`, 'important');
                dropdown.style.setProperty('right', 'auto', 'important');
                dropdown.style.setProperty('width', `${finalWidth}px`, 'important');
                dropdown.style.setProperty('min-width', '120px', 'important');
                dropdown.style.setProperty('max-width', `${viewportWidth - margin * 2}px`, 'important');
                console.log('🟠 [Calendar] Ajustando posición horizontal (se corta a la izquierda):', {
                    left,
                    finalWidth
                });
            }
            else {
                dropdown.style.setProperty('left', `${left}px`, 'important');
                dropdown.style.setProperty('right', 'auto', 'important');
                dropdown.style.setProperty('width', `${finalWidth}px`, 'important');
                dropdown.style.setProperty('min-width', '120px', 'important');
                dropdown.style.setProperty('max-width', `${inputWidth}px`, 'important');
                console.log('🟢 [Calendar] Posición horizontal normal:', { left, finalWidth });
            }
        }
        
        // Calcular posición vertical (con position: fixed, no usar scrollY)
        const spaceBelow = viewportHeight - inputRect.bottom;
        const spaceAbove = inputRect.top;
        const fixedMaxHeight = 200; // Altura fija como antes
        const dropdownTotalHeight = fixedMaxHeight + 20; // Altura total del dropdown (lista + padding)
        
        // Calcular posición vertical - verificar si se corta abajo
        let top = inputRect.bottom + 4;
        
        // Si se corta abajo y hay más espacio arriba, mostrar arriba
        if (inputRect.bottom + dropdownTotalHeight > viewportHeight - 10 && spaceAbove > spaceBelow) {
            top = inputRect.top - dropdownTotalHeight - 4;
            top = Math.max(10, top);
            dropdown.style.setProperty('top', `${top}px`, 'important');
            dropdown.style.setProperty('bottom', 'auto', 'important');
            console.log('🟢 [Calendar] Mostrando dropdown arriba del input para evitar corte');
        }
        else {
            // Mostrar abajo del input
            dropdown.style.setProperty('top', `${top}px`, 'important');
            dropdown.style.setProperty('bottom', 'auto', 'important');
            console.log('🟢 [Calendar] Mostrando dropdown abajo del input');
        }
        
        // Aplicar max-height fijo de 200px al dropdown
        dropdown.style.setProperty('max-height', `${dropdownTotalHeight}px`, 'important');
        
        // Asegurar ancho mínimo (ya se estableció arriba según la posición)
        dropdown.style.setProperty('min-width', '120px', 'important');
        
        // Mostrar el dropdown
        dropdown.style.setProperty('visibility', 'visible', 'important');
        
        // Verificar dimensiones finales después de aplicar todos los estilos
        setTimeout(() => {
            const finalRect = dropdown.getBoundingClientRect();
            const computedStyle = getComputedStyle(dropdown);
            
            // Verificar elementos internos
            const finalListContainer = dropdown.querySelector('[id^="calendar-list-container-"]');
            const finalListElement = dropdown.querySelector('[id^="calendar-list-"]');
            const finalScrollbarContainer = dropdown.querySelector('[id^="calendar-scrollbar-"]');
            
            const listContainerRect = finalListContainer?.getBoundingClientRect();
            const listElementRect = finalListElement?.getBoundingClientRect();
            const scrollbarContainerRect = finalScrollbarContainer?.getBoundingClientRect();
            
            console.log('🟢 [Calendar] Dimensiones finales después del ajuste:', {
                dropdown: {
                    finalRect: {
                        top: finalRect.top,
                        right: finalRect.right,
                        bottom: finalRect.bottom,
                        left: finalRect.left,
                        width: finalRect.width,
                        height: finalRect.height
                    },
                    finalStyles: {
                        position: computedStyle.position,
                        top: computedStyle.top,
                        bottom: computedStyle.bottom,
                        left: computedStyle.left,
                        right: computedStyle.right,
                        maxHeight: computedStyle.maxHeight,
                        maxWidth: computedStyle.maxWidth,
                        width: computedStyle.width,
                        zIndex: computedStyle.zIndex,
                        visibility: computedStyle.visibility
                    },
                    seCortaDerecha: finalRect.right > viewportWidth - 10,
                    seCortaAbajo: finalRect.bottom > viewportHeight - 10,
                    marginDerecha: viewportWidth - finalRect.right,
                    marginAbajo: viewportHeight - finalRect.bottom
                },
                listContainer: listContainerRect ? {
                    rect: {
                        top: listContainerRect.top,
                        right: listContainerRect.right,
                        bottom: listContainerRect.bottom,
                        left: listContainerRect.left,
                        width: listContainerRect.width,
                        height: listContainerRect.height
                    },
                    styles: {
                        maxHeight: getComputedStyle(finalListContainer).maxHeight,
                        overflow: getComputedStyle(finalListContainer).overflow
                    },
                    seCortaDerecha: listContainerRect.right > viewportWidth - 10,
                    seCortaAbajo: listContainerRect.bottom > viewportHeight - 10
                } : null,
                listElement: listElementRect ? {
                    rect: {
                        top: listElementRect.top,
                        right: listElementRect.right,
                        bottom: listElementRect.bottom,
                        left: listElementRect.left,
                        width: listElementRect.width,
                        height: listElementRect.height
                    },
                    styles: {
                        maxHeight: getComputedStyle(finalListElement).maxHeight,
                        overflow: getComputedStyle(finalListElement).overflow,
                        scrollbarWidth: getComputedStyle(finalListElement).scrollbarWidth
                    },
                    seCortaDerecha: listElementRect.right > viewportWidth - 10,
                    seCortaAbajo: listElementRect.bottom > viewportHeight - 10
                } : null,
                scrollbarContainer: scrollbarContainerRect ? {
                    rect: {
                        top: scrollbarContainerRect.top,
                        right: scrollbarContainerRect.right,
                        bottom: scrollbarContainerRect.bottom,
                        left: scrollbarContainerRect.left,
                        width: scrollbarContainerRect.width,
                        height: scrollbarContainerRect.height
                    },
                    styles: {
                        position: getComputedStyle(finalScrollbarContainer).position,
                        top: getComputedStyle(finalScrollbarContainer).top,
                        right: getComputedStyle(finalScrollbarContainer).right,
                        bottom: getComputedStyle(finalScrollbarContainer).bottom,
                        left: getComputedStyle(finalScrollbarContainer).left,
                        width: getComputedStyle(finalScrollbarContainer).width,
                        height: getComputedStyle(finalScrollbarContainer).height,
                        maxHeight: getComputedStyle(finalScrollbarContainer).maxHeight,
                        overflow: getComputedStyle(finalScrollbarContainer).overflow
                    },
                    seCortaDerecha: scrollbarContainerRect.right > viewportWidth - 10,
                    seCortaAbajo: scrollbarContainerRect.bottom > viewportHeight - 10,
                    marginDerecha: viewportWidth - scrollbarContainerRect.right,
                    marginAbajo: viewportHeight - scrollbarContainerRect.bottom,
                    diferenciaConDropdown: scrollbarContainerRect.right - finalRect.right
                } : null,
                timestamp: new Date().toISOString()
            });
        }, 150);
    });
}
/**
 * Crea un dropdown de lista UBITS con scrollbar integrado
 * Intenta usar createScrollbarLocal si está disponible (para contexto UMD),
 * si no, usa createScrollbar de ScrollProvider mediante importación dinámica
 */
async function createListDropdown(items, onSelect) {
    const container = document.createElement('div');
    container.style.cssText = 'position: relative; width: 100%;';
    const listContainerId = `calendar-list-container-${Date.now()}`;
    
    // Crear items de lista para createList
    const listItems = items.map((item) => ({
        label: item.label,
        value: String(item.value),
        selected: item.selected,
        state: item.selected ? 'active' : 'default',
        attributes: {
            'data-value': String(item.value),
            'style': 'cursor: pointer;'
        }
    }));
    
    // Crear contenedor para la lista
    // IMPORTANTE: El contenedor debe estar vacío para que createList pueda crear el wrapper correctamente
    const listContainer = document.createElement('div');
    listContainer.id = listContainerId;
    // NO establecer estilos aquí, createList los manejará cuando cree el wrapper
    listContainer.style.cssText = 'width: 100%;';
    
    // Agregar el contenedor al container principal
    container.appendChild(listContainer);
    
    // Agregar temporalmente el container al body (oculto) para que createList pueda encontrarlo
    // Esto es necesario porque createList busca el contenedor con getElementById
    container.style.position = 'absolute';
    container.style.visibility = 'hidden';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    
    console.log('📜 [Calendar] Contenedor preparado:', {
        listContainerId,
        listContainerHTML: listContainer.innerHTML,
        listContainerChildren: listContainer.children.length,
        listContainerStyles: listContainer.style.cssText
    });
    
    // Importar createList dinámicamente
    const { createList } = await import('../../list/src/ListProvider');
    
    // Esperar múltiples frames para asegurar que el DOM esté completamente listo
    await new Promise(resolve => requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
    }));
    
    // Verificar que el contenedor esté en el DOM antes de continuar
    const foundContainer = document.getElementById(listContainerId);
    if (!foundContainer) {
        // Remover el container temporal del body
        if (container.parentElement) {
            container.parentElement.removeChild(container);
        }
        throw new Error(`Container with id "${listContainerId}" not found in DOM`);
    }
    
    console.log('📜 [Calendar] Creando lista con scrollbar:', {
        listContainerId,
        itemsCount: listItems.length,
        showScrollbar: true
    });
    
    // Usar createList con showScrollbar: true para usar el scrollbar UBITS integrado
    const listInstance = createList({
        containerId: listContainerId,
        items: listItems,
        size: 'sm',
        maxHeight: '200px',
        showScrollbar: true, // Usar el scrollbar UBITS integrado
        className: 'ubits-calendar-dropdown-list',
        attributes: {
            style: 'border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);'
        }
    });
    
    // Esperar a que el scrollbar container se cree (se crea síncronamente pero dentro del wrapper)
    // El scrollbar container se crea inmediatamente cuando showScrollbar es true
    const scrollbarContainerId = `${listContainerId}-scrollbar`;
    
    // Esperar múltiples frames para que el DOM se actualice completamente
    await new Promise(resolve => requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    }));
    
    // Verificar que el scrollbar container se haya creado
    const scrollbarContainerCheck = document.getElementById(scrollbarContainerId);
    // Buscar el wrapper (debería ser el primer hijo del listContainer cuando showScrollbar es true)
    const wrapper = listContainer.firstElementChild;
    const hasWrapper = wrapper && wrapper.style.position === 'relative';
    
    // Buscar también dentro del wrapper si existe
    const scrollbarInWrapper = wrapper ? wrapper.querySelector(`#${scrollbarContainerId}`) : null;
    
    console.log('📜 [Calendar] Scrollbar container verificado - DETALLADO:', {
        scrollbarContainerId,
        foundInDocument: !!scrollbarContainerCheck,
        foundInWrapper: !!scrollbarInWrapper,
        hasWrapper: hasWrapper,
        wrapperElement: wrapper,
        wrapperTagName: wrapper ? wrapper.tagName : null,
        wrapperId: wrapper ? wrapper.id : null,
        wrapperClassName: wrapper ? wrapper.className : null,
        wrapperStyles: wrapper ? {
            position: wrapper.style.position,
            width: wrapper.style.width,
            overflow: wrapper.style.overflow,
            borderRadius: wrapper.style.borderRadius
        } : null,
        wrapperChildren: wrapper ? wrapper.children.length : 0,
        listContainerChildren: listContainer.children.length,
        listContainerFirstChild: listContainer.firstElementChild ? {
            tagName: listContainer.firstElementChild.tagName,
            id: listContainer.firstElementChild.id,
            className: listContainer.firstElementChild.className,
            styles: {
                position: listContainer.firstElementChild.style.position,
                width: listContainer.firstElementChild.style.width
            }
        } : null,
        listContainerHTML: listContainer.innerHTML.substring(0, 800),
        scrollbarContainerHTML: scrollbarContainerCheck ? scrollbarContainerCheck.innerHTML.substring(0, 200) : null,
        scrollbarInWrapperHTML: scrollbarInWrapper ? scrollbarInWrapper.innerHTML.substring(0, 200) : null,
        wrapperHTML: wrapper ? wrapper.innerHTML.substring(0, 500) : null,
        // Buscar todos los elementos con scrollbar en el ID
        allScrollbarElements: Array.from(document.querySelectorAll(`[id*="${scrollbarContainerId}"]`)).map(el => ({
            id: el.id,
            tagName: el.tagName,
            parentId: el.parentElement ? el.parentElement.id : null
        }))
    });
    
    if (!scrollbarContainerCheck) {
        console.warn('📜 [Calendar] ⚠️ Scrollbar container no encontrado después de crear lista');
    }
    
    // Remover el container temporal del body y restaurar estilos
    if (container.parentElement === document.body) {
        document.body.removeChild(container);
    }
    container.style.position = '';
    container.style.visibility = '';
    container.style.opacity = '';
    container.style.pointerEvents = '';
    
    // Guardar referencia a la instancia para poder destruirla después
    container._listInstance = listInstance;
    
    // Forzar actualización del scrollbar después de mover el contenedor
    // Esto es necesario porque el scrollbar se inicializa cuando el contenedor está en el body temporal
    // Esperar a que el contenedor esté en su posición final antes de actualizar el scrollbar
    setTimeout(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const scrollbarContainerId = `${listContainerId}-scrollbar`;
                const scrollbarContainer = document.getElementById(scrollbarContainerId);
                const listElement = listContainer.querySelector('.ubits-list');
                
                // Buscar el scrollbar dentro del wrapper si no se encuentra directamente
                // El scrollbar está dentro de un wrapper creado por createList cuando showScrollbar es true
                let actualScrollbarContainer = scrollbarContainer;
                if (!actualScrollbarContainer) {
                    // Buscar dentro del contenedor completo (el wrapper está dentro del listContainer)
                    actualScrollbarContainer = container.querySelector(`#${scrollbarContainerId}`);
                    if (!actualScrollbarContainer) {
                        // Buscar en todo el documento como último recurso
                        actualScrollbarContainer = document.getElementById(scrollbarContainerId);
                    }
                }
                
                console.log('📜 [Calendar] Verificando scrollbar después de mover contenedor:', {
                    hasScrollbarContainer: !!actualScrollbarContainer,
                    hasListElement: !!listElement,
                    scrollbarContainerId,
                    searchedInContainer: !!container.querySelector(`#${scrollbarContainerId}`),
                    searchedInDocument: !!document.getElementById(scrollbarContainerId),
                    containerHTML: container.innerHTML.substring(0, 500)
                });
                
                if (actualScrollbarContainer && listElement) {
                    // Verificar si necesita scroll
                    const needsScroll = listElement.scrollHeight > listElement.clientHeight;
                    
                    console.log('📜 [Calendar] Estado del scrollbar:', {
                        needsScroll,
                        scrollHeight: listElement.scrollHeight,
                        clientHeight: listElement.clientHeight,
                        scrollbarContainerDisplay: actualScrollbarContainer.style.display,
                        scrollbarContainerHTML: actualScrollbarContainer.innerHTML.substring(0, 200)
                    });
                    
                    if (needsScroll) {
                        // Mostrar el scrollbar
                        actualScrollbarContainer.style.display = 'block';
                        actualScrollbarContainer.style.visibility = 'visible';
                        actualScrollbarContainer.style.opacity = '1';
                        
                        // Buscar y forzar visibilidad de la barra del scrollbar
                        const scrollbarElement = actualScrollbarContainer.querySelector('.ubits-scrollbar');
                        if (scrollbarElement) {
                            const bar = scrollbarElement.querySelector('.ubits-scrollbar__bar');
                            if (bar) {
                                bar.style.setProperty('opacity', '1', 'important');
                                bar.style.setProperty('pointer-events', 'auto', 'important');
                                bar.style.setProperty('visibility', 'visible', 'important');
                                console.log('📜 [Calendar] Scrollbar bar forzado a visible');
                            } else {
                                console.warn('📜 [Calendar] ⚠️ No se encontró la barra del scrollbar');
                            }
                        } else {
                            console.warn('📜 [Calendar] ⚠️ No se encontró el elemento del scrollbar');
                        }
                        
                        // Actualizar el scrollbar si existe la instancia
                        const scrollbarInstance = listContainer._scrollbarInstance;
                        if (scrollbarInstance && scrollbarInstance.update) {
                            scrollbarInstance.update();
                            console.log('📜 [Calendar] Scrollbar actualizado');
                        } else {
                            console.warn('📜 [Calendar] ⚠️ No se encontró la instancia del scrollbar para actualizar');
                        }
                    } else {
                        console.log('📜 [Calendar] No necesita scroll, ocultando scrollbar');
                        actualScrollbarContainer.style.display = 'none';
                    }
                } else {
                    console.warn('📜 [Calendar] ⚠️ No se encontraron elementos necesarios para el scrollbar');
                }
            });
        });
    }, 300);
    
    // Event listeners para items
    requestAnimationFrame(() => {
        const listElement = listContainer.querySelector('.ubits-list');
        if (listElement) {
            listElement.querySelectorAll('.ubits-list-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const value = parseInt(e.currentTarget.dataset.value || '0');
                    onSelect(value);
                });
            });
        }
    });
    return container;
}
/**
 * Renderiza el HTML del calendario
 */
export function renderCalendar(options) {
    const { mode = 'single', selectedDate, endDate, minDate, maxDate, initialDate = new Date(), className = '', style = '' } = options;
    const currentDate = initialDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const today = new Date();
    const todayString = today.toDateString();
    // Construir clases
    const classes = [
        'ubits-calendar',
        mode === 'range' ? 'ubits-calendar--range' : 'ubits-calendar--single',
        className
    ].filter(Boolean).join(' ');
    // Construir estilos
    const combinedStyle = style ? ` style="${style}"` : '';
    // Header con navegación
    const selectedMonthName = MONTH_NAMES[month];
    const headerHTML = `
    <div class="ubits-calendar__header">
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--prev" aria-label="Mes anterior">
        <i class="far fa-chevron-left"></i>
      </button>
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__month-input" value="${selectedMonthName}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          <input type="text" class="ubits-input ubits-input--sm ubits-calendar__year-input" value="${year}" readonly style="cursor: pointer;">
          <i class="far fa-chevron-down ubits-input-icon-right" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      <button type="button" class="ubits-button ubits-button--tertiary ubits-button--sm ubits-button--icon-only ubits-calendar__nav-button ubits-calendar__nav-button--next" aria-label="Mes siguiente">
        <i class="far fa-chevron-right"></i>
      </button>
    </div>
  `;
    // Días de la semana
    const weekdaysHTML = `
    <div class="ubits-calendar__weekdays">
      ${DAY_NAMES.map(day => `<div class="ubits-calendar__weekday">${day}</div>`).join('')}
    </div>
  `;
    // Días del mes
    let daysHTML = '<div class="ubits-calendar__days">';
    // Días vacíos al inicio
    for (let i = 0; i < startingDay; i++) {
        daysHTML += '<div class="ubits-calendar__day ubits-calendar__day--empty"></div>';
    }
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toDateString();
        const isToday = dateString === todayString;
        let dayClasses = ['ubits-calendar__day'];
        // Verificar si está seleccionado (modo single)
        if (mode === 'single' && selectedDate && isSameDay(date, selectedDate)) {
            dayClasses.push('ubits-calendar__day--selected');
        }
        // Verificar si está en rango (modo range)
        if (mode === 'range' && selectedDate) {
            if (endDate) {
                // Rango completo
                if (isSameDay(date, selectedDate)) {
                    dayClasses.push('ubits-calendar__day--range-start');
                }
                else if (isSameDay(date, endDate)) {
                    dayClasses.push('ubits-calendar__day--range-end');
                }
                else if (isDateInRange(date, selectedDate, endDate)) {
                    dayClasses.push('ubits-calendar__day--in-range');
                }
            }
            else {
                // Solo fecha inicial seleccionada
                if (isSameDay(date, selectedDate)) {
                    dayClasses.push('ubits-calendar__day--range-start');
                }
            }
        }
        // Verificar si es hoy
        if (isToday) {
            dayClasses.push('ubits-calendar__day--today');
        }
        // Verificar si está deshabilitado
        let isDisabled = false;
        if (minDate && compareDates(date, minDate) < 0) {
            isDisabled = true;
            dayClasses.push('ubits-calendar__day--disabled');
        }
        if (maxDate && compareDates(date, maxDate) > 0) {
            isDisabled = true;
            dayClasses.push('ubits-calendar__day--disabled');
        }
        const disabledAttr = isDisabled ? ' disabled' : '';
        const dataDate = formatDate(date);
        daysHTML += `<button type="button" class="${dayClasses.join(' ')}" data-date="${dataDate}"${disabledAttr}>${day}</button>`;
    }
    daysHTML += '</div>';
    return `
    <div class="${classes}"${combinedStyle}>
      ${headerHTML}
      ${weekdaysHTML}
      ${daysHTML}
    </div>
  `.trim();
}
/**
 * Crea y renderiza un Calendar en el DOM
 */
export function createCalendar(options) {
    const { mode = 'single', selectedDate, endDate, minDate, maxDate, initialDate = new Date(), onDateSelect, onRangeSelect } = options;
    // Crear contenedor
    const container = document.createElement('div');
    container.innerHTML = renderCalendar(options);
    const calendar = container.firstElementChild;
    if (!calendar) {
        throw new Error('No se pudo crear el calendario');
    }
    let currentDate = new Date(initialDate);
    let currentSelectedDate = selectedDate ? new Date(selectedDate) : null;
    let currentEndDate = endDate ? new Date(endDate) : null;
    // Flag para evitar múltiples inicializaciones de event listeners
    let isRendering = false;
    /**
     * Renderiza el calendario
     */
    const render = () => {
        // Prevenir loops de re-render
        if (isRendering) {
            return;
        }
        isRendering = true;
        calendar.innerHTML = renderCalendar({
            ...options,
            mode,
            selectedDate: currentSelectedDate,
            endDate: currentEndDate,
            minDate,
            maxDate,
            initialDate: currentDate
        });
        // Agregar event listeners después de cada render
        setupEventListeners();
        // Resetear flag después de un pequeño delay
        setTimeout(() => {
            isRendering = false;
        }, 100);
    };
    /**
     * Configura los event listeners
     */
    const setupEventListeners = () => {
        // Navegación anterior/siguiente
        const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev');
        const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next');
        const monthInput = calendar.querySelector('.ubits-calendar__month-input');
        const yearInput = calendar.querySelector('.ubits-calendar__year-input');
        const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
        const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() - 1);
            // Actualizar inputs
            if (monthInput) {
                monthInput.value = MONTH_NAMES[currentDate.getMonth()];
            }
            if (yearInput) {
                yearInput.value = String(currentDate.getFullYear());
            }
            // Actualizar calendario
            render();
        });
        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() + 1);
            // Actualizar inputs
            if (monthInput) {
                monthInput.value = MONTH_NAMES[currentDate.getMonth()];
            }
            if (yearInput) {
                yearInput.value = String(currentDate.getFullYear());
            }
            // Actualizar calendario
            render();
        });
        // Toggle dropdown de mes
        if (monthInput) {
            console.log('🟢 [Calendar] Agregando event listener a monthInput');
            monthInput.addEventListener('click', (e) => {
                console.log('🔵 [Calendar] Click en monthInput detectado', {
                    target: e.target.tagName,
                    currentTarget: e.currentTarget.tagName,
                    timestamp: new Date().toISOString()
                });
                e.preventDefault();
                e.stopPropagation();
                if (monthDropdown) {
                const monthDropdownEl = monthDropdown;
                const isVisible = monthDropdownEl.style.display === 'block';
                if (!isVisible) {
                    // Cerrar dropdown de año si está abierto
                    if (yearDropdown) {
                        yearDropdown.style.display = 'none';
                    }
                    // Crear lista de meses
                    const monthItems = MONTH_NAMES.map((name, index) => ({
                        label: name,
                        value: index,
                        selected: index === currentDate.getMonth()
                    }));
                    // Limpiar dropdown anterior
                    monthDropdownEl.innerHTML = '';
                    // Crear nuevo dropdown con scrollbar
                    createListDropdown(monthItems, (value) => {
                        currentDate.setMonth(value);
                        monthDropdownEl.style.display = 'none';
                        // Actualizar el input
                        if (monthInput) {
                            monthInput.value = MONTH_NAMES[value];
                        }
                        // Actualizar el calendario para mostrar los días del nuevo mes
                        render();
                    }).then((dropdownContent) => {
                        monthDropdownEl.appendChild(dropdownContent);
                        monthDropdownEl.style.display = 'block';
                        // Ajustar posición del dropdown para evitar que se corte
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                adjustDropdownPosition(monthDropdownEl, monthInput);
                            }, 50);
                        });
                    }).catch((error) => {
                        console.error('Error creando dropdown de meses:', error);
                    });
                }
                else {
                    monthDropdownEl.style.display = 'none';
                }
            }
        });
        }
        else {
            console.warn('🟡 [Calendar] monthInput no encontrado, no se puede agregar event listener');
        }
        // Toggle dropdown de año
        if (yearInput) {
            console.log('🟢 [Calendar] Agregando event listener a yearInput');
            yearInput.addEventListener('click', (e) => {
                console.log('🔵 [Calendar] Click en yearInput detectado', {
                    target: e.target.tagName,
                    currentTarget: e.currentTarget.tagName,
                    timestamp: new Date().toISOString()
                });
                e.preventDefault();
                e.stopPropagation();
                if (yearDropdown) {
                    const yearDropdownEl = yearDropdown;
                    const isVisible = yearDropdownEl.style.display === 'block';
                    if (!isVisible) {
                        // Cerrar dropdown de mes si está abierto
                        if (monthDropdown) {
                            monthDropdown.style.display = 'none';
                        }
                        // Crear lista de años
                        const currentYear = currentDate.getFullYear();
                        const yearItems = Array.from({ length: 100 }, (_, i) => {
                            const yearOption = currentYear - 50 + i;
                            return {
                                label: String(yearOption),
                                value: yearOption,
                                selected: yearOption === currentYear
                            };
                        });
                        // Limpiar dropdown anterior
                        yearDropdownEl.innerHTML = '';
                        // Crear nuevo dropdown con scrollbar
                        createListDropdown(yearItems, (value) => {
                            currentDate.setFullYear(value);
                            yearDropdownEl.style.display = 'none';
                            // Actualizar el input
                            if (yearInput) {
                                yearInput.value = String(value);
                            }
                            // Actualizar el calendario para mostrar los días del nuevo año
                            render();
                        }).then((dropdownContent) => {
                            yearDropdownEl.appendChild(dropdownContent);
                            yearDropdownEl.style.display = 'block';
                            // Ajustar posición del dropdown para evitar que se corte
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    adjustDropdownPosition(yearDropdownEl, yearInput);
                                }, 50);
                            });
                        }).catch((error) => {
                            console.error('Error creando dropdown de años:', error);
                        });
                    }
                    else {
                        yearDropdownEl.style.display = 'none';
                    }
                }
            });
        }
        else {
            console.warn('🟡 [Calendar] yearInput no encontrado, no se puede agregar event listener');
        }
        // Cerrar dropdowns al hacer click fuera
        const closeDropdowns = () => {
            if (monthDropdown)
                monthDropdown.style.display = 'none';
            if (yearDropdown)
                yearDropdown.style.display = 'none';
        };
        // NO agregar listener global de click para evitar loops de re-render en Storybook
        // Los dropdowns se cerrarán cuando se seleccione un valor o cuando se haga click en los inputs
        // Selección de días
        const dayButtons = calendar.querySelectorAll('.ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)');
        dayButtons.forEach(dayBtn => {
            dayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dateStr = dayBtn.dataset.date || '';
                const [day, month, year] = dateStr.split('/');
                const clickedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                if (mode === 'single') {
                    currentSelectedDate = clickedDate;
                    render();
                    if (onDateSelect) {
                        onDateSelect(clickedDate);
                    }
                }
                else if (mode === 'range') {
                    if (!currentSelectedDate || (currentSelectedDate && currentEndDate)) {
                        // Iniciar nuevo rango
                        currentSelectedDate = clickedDate;
                        currentEndDate = null;
                        render();
                    }
                    else if (currentSelectedDate && !currentEndDate) {
                        // Completar rango
                        if (compareDates(clickedDate, currentSelectedDate) < 0) {
                            // La fecha clickeada es anterior a la inicial, intercambiar
                            currentEndDate = currentSelectedDate;
                            currentSelectedDate = clickedDate;
                        }
                        else {
                            currentEndDate = clickedDate;
                        }
                        render();
                        if (onRangeSelect && currentSelectedDate && currentEndDate) {
                            onRangeSelect(currentSelectedDate, currentEndDate);
                        }
                    }
                }
            });
        });
    };
    // Renderizar inicialmente
    render();
    /**
     * Actualiza las opciones del calendario
     */
    const update = (newOptions) => {
        if (newOptions.selectedDate !== undefined) {
            currentSelectedDate = newOptions.selectedDate ? new Date(newOptions.selectedDate) : null;
        }
        if (newOptions.endDate !== undefined) {
            currentEndDate = newOptions.endDate ? new Date(newOptions.endDate) : null;
        }
        if (newOptions.initialDate) {
            currentDate = new Date(newOptions.initialDate);
        }
        Object.assign(options, newOptions);
        render();
    };
    /**
     * Destruye el calendario
     */
    const destroy = () => {
        // Limpiar scrollbars de dropdowns si existen
        const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
        const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');
        if (monthDropdown) {
            const listInstance = monthDropdown._listInstance;
            if (listInstance && listInstance.destroy) {
                listInstance.destroy();
            }
        }
        if (yearDropdown) {
            const listInstance = yearDropdown._listInstance;
            if (listInstance && listInstance.destroy) {
                listInstance.destroy();
            }
        }
        if (calendar.parentElement) {
            calendar.parentElement.removeChild(calendar);
        }
    };
    return {
        element: calendar,
        update,
        destroy
    };
}
