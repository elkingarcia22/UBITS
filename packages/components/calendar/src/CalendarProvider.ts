/**
 * Calendar Provider
 * Componente Calendar UBITS con selección única y por rango de fechas
 * Implementación simplificada desde cero
 */

import type { CalendarOptions, CalendarMode } from './types/CalendarOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderInput } from '../../input/src/InputProvider';
import { createList } from '../../list/src/ListProvider';
import type { ListItem } from '../../list/src/types/ListOptions';

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
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Compara dos fechas ignorando la hora
 */
function compareDates(date1: Date, date2: Date): number {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1.getTime() - d2.getTime();
}

/**
 * Verifica si dos fechas son el mismo día
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return compareDates(date1, date2) === 0;
}

/**
 * Verifica si una fecha está en un rango
 */
function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  const dateTime = compareDates(date, startDate);
  const endTime = compareDates(endDate, date);
  return dateTime >= 0 && endTime >= 0;
}

/**
 * Ajusta la posición del dropdown para evitar que se corte
 * Usa position: fixed con coordenadas calculadas para evitar problemas de overflow
 */
function adjustDropdownPosition(dropdown: HTMLElement, input: HTMLElement | null): void {
  if (!input) {
    console.log('🔴 [Calendar] adjustDropdownPosition: input es null');
    return;
  }
  
  console.log('🔵 [Calendar] adjustDropdownPosition iniciado', {
    dropdownId: dropdown.id || dropdown.className,
    inputId: input.id || input.className,
    timestamp: new Date().toISOString()
  });
  
  requestAnimationFrame(() => {
    const inputRect = input.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Obtener dimensiones del dropdown después de que se muestre
    const dropdownWidth = dropdown.offsetWidth || 120;
    const dropdownHeight = dropdown.offsetHeight || 200;
    
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
      scroll: {
        x: scrollX,
        y: scrollY
      },
      dropdown: {
        width: dropdownWidth,
        height: dropdownHeight
      }
    });
    
    // Usar position: fixed para evitar problemas de overflow
    dropdown.style.setProperty('position', 'fixed', 'important');
    dropdown.style.setProperty('z-index', '10000', 'important');
    
    // Calcular posición horizontal
    let left = inputRect.left + scrollX;
    let right = 'auto';
    
    // Si se corta a la derecha, ajustar
    if (inputRect.left + dropdownWidth > viewportWidth - 10) {
      // Alinear a la derecha del input
      left = 'auto';
      right = `${viewportWidth - inputRect.right - scrollX}px`;
      console.log('🟠 [Calendar] Ajustando posición horizontal (se corta a la derecha):', {
        right,
        inputRight: inputRect.right,
        viewportWidth
      });
    } else {
      dropdown.style.setProperty('left', `${left}px`, 'important');
      dropdown.style.setProperty('right', 'auto', 'important');
      console.log('🟢 [Calendar] Posición horizontal normal:', { left });
    }
    
    // Calcular posición vertical
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;
    
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      // Mostrar arriba del input
      const top = inputRect.top + scrollY - dropdownHeight - 4;
      dropdown.style.setProperty('top', `${Math.max(10, top)}px`, 'important');
      dropdown.style.setProperty('bottom', 'auto', 'important');
      console.log('🟢 [Calendar] Mostrando dropdown arriba del input:', {
        top: Math.max(10, top),
        spaceAbove,
        spaceBelow
      });
    } else {
      // Mostrar abajo del input
      const top = inputRect.bottom + scrollY + 4;
      dropdown.style.setProperty('top', `${top}px`, 'important');
      dropdown.style.setProperty('bottom', 'auto', 'important');
      
      // Limitar altura si se corta
      if (inputRect.bottom + dropdownHeight > viewportHeight - 10) {
        const maxHeight = Math.max(150, viewportHeight - inputRect.bottom - 20);
        dropdown.style.setProperty('max-height', `${maxHeight}px`, 'important');
        console.log('🟡 [Calendar] Limitando altura del dropdown:', {
          maxHeight,
          spaceBelow: viewportHeight - inputRect.bottom
        });
      } else {
        dropdown.style.setProperty('max-height', '200px', 'important');
      }
      
      console.log('🟢 [Calendar] Mostrando dropdown abajo del input:', {
        top,
        spaceBelow
      });
    }
    
    // Asegurar ancho
    dropdown.style.setProperty('width', `${inputRect.width}px`, 'important');
    dropdown.style.setProperty('min-width', '120px', 'important');
    
    // Verificar dimensiones finales
    setTimeout(() => {
      const finalRect = dropdown.getBoundingClientRect();
      console.log('🟢 [Calendar] Dimensiones finales después del ajuste:', {
        finalRect: {
          top: finalRect.top,
          right: finalRect.right,
          bottom: finalRect.bottom,
          left: finalRect.left,
          width: finalRect.width,
          height: finalRect.height
        },
        finalStyles: {
          position: getComputedStyle(dropdown).position,
          top: getComputedStyle(dropdown).top,
          bottom: getComputedStyle(dropdown).bottom,
          left: getComputedStyle(dropdown).left,
          right: getComputedStyle(dropdown).right,
          maxHeight: getComputedStyle(dropdown).maxHeight,
          zIndex: getComputedStyle(dropdown).zIndex
        },
        seCortaDerecha: finalRect.right > viewportWidth - 10,
        seCortaAbajo: finalRect.bottom > viewportHeight - 10,
        timestamp: new Date().toISOString()
      });
    }, 100);
  });
}

/**
 * Crea un dropdown de lista UBITS con scrollbar integrado
 * Intenta usar createScrollbarLocal si está disponible (para contexto UMD),
 * si no, usa createScrollbar de ScrollProvider mediante importación dinámica
 */
function createListDropdown(
  items: Array<{ label: string; value: number; selected: boolean }>,
  onSelect: (value: number) => void
): HTMLElement {
  const container = document.createElement('div');
  container.style.cssText = 'position: relative; width: 100%;';
  
  const listContainerId = `calendar-list-container-${Date.now()}`;
  
  // Crear items de lista para createList
  const listItems: ListItem[] = items.map((item) => ({
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
  const listContainer = document.createElement('div');
  listContainer.id = listContainerId;
  listContainer.style.cssText = 'position: relative; width: 100%; max-height: 200px;';
  
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
  
  // Agregar el contenedor de la lista al contenedor principal
  container.appendChild(listContainer);
  
  // Guardar referencia a la instancia para poder destruirla después
  (container as any)._listInstance = listInstance;
  
  // Event listeners para items
  requestAnimationFrame(() => {
    const listElement = listContainer.querySelector('.ubits-list') as HTMLElement;
    if (listElement) {
      listElement.querySelectorAll('.ubits-list-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const value = parseInt((e.currentTarget as HTMLElement).dataset.value || '0');
          onSelect(value);
        });
      });
    }
  });
  
  return container;
            scrollbarInstance.destroy();
          }
          onSelect(value);
        });
      });
    }
  }, 100);
  
  return container;
}

/**
 * Renderiza el HTML del calendario
 */
export function renderCalendar(options: CalendarOptions): string {
  const {
    mode = 'single',
    selectedDate,
    endDate,
    minDate,
    maxDate,
    initialDate = new Date(),
    className = '',
    style = ''
  } = options;

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
      ${renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'chevron-left',
        iconOnly: true,
        className: 'ubits-calendar__nav-button ubits-calendar__nav-button--prev',
        attributes: {
          'type': 'button',
          'aria-label': 'Mes anterior'
        }
      })}
      <div class="ubits-calendar__month-year">
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 120px;">
          ${renderInput({
            type: 'text',
            size: 'sm',
            value: selectedMonthName,
            showLabel: false,
            showHelper: false,
            rightIcon: 'chevron-down',
            className: 'ubits-calendar__month-input',
            attributes: {
              readonly: 'true',
              style: 'cursor: pointer;'
            }
          })}
          <div class="ubits-calendar__month-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
        <div class="ubits-input-container" style="position: relative; flex: 1; min-width: 90px;">
          ${renderInput({
            type: 'text',
            size: 'sm',
            value: String(year),
            showLabel: false,
            showHelper: false,
            rightIcon: 'chevron-down',
            className: 'ubits-calendar__year-input',
            attributes: {
              readonly: 'true',
              style: 'cursor: pointer;'
            }
          })}
          <div class="ubits-calendar__year-dropdown" style="display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; margin-top: 4px;"></div>
        </div>
      </div>
      ${renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'chevron-right',
        iconOnly: true,
        className: 'ubits-calendar__nav-button ubits-calendar__nav-button--next',
        attributes: {
          'type': 'button',
          'aria-label': 'Mes siguiente'
        }
      })}
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
        } else if (isSameDay(date, endDate)) {
          dayClasses.push('ubits-calendar__day--range-end');
        } else if (isDateInRange(date, selectedDate, endDate)) {
          dayClasses.push('ubits-calendar__day--in-range');
        }
      } else {
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
    <div class="${classes}"${combinedStyle} data-ubits-id="🧩-ux-calendar">
      ${headerHTML}
      ${weekdaysHTML}
      ${daysHTML}
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Calendar en el DOM
 */
export function createCalendar(options: CalendarOptions): {
  element: HTMLElement;
  update: (newOptions: Partial<CalendarOptions>) => void;
  destroy: () => void;
} {
  console.log('🔵 [Calendar] createCalendar llamado', {
    options,
    timestamp: new Date().toISOString()
  });
  
  const {
    mode = 'single',
    selectedDate,
    endDate,
    minDate,
    maxDate,
    initialDate = new Date(),
    onDateSelect,
    onRangeSelect
  } = options;

  console.log('🔵 [Calendar] createCalendar iniciado', {
    options,
    timestamp: new Date().toISOString()
  });
  
  // Crear contenedor
  const container = document.createElement('div');
  container.innerHTML = renderCalendar(options);
  const calendar = container.firstElementChild as HTMLElement;

  if (!calendar) {
    console.error('🔴 [Calendar] No se pudo crear el calendario - firstElementChild es null');
    throw new Error('No se pudo crear el calendario');
  }
  
  // Agregar data-ubits-id si no está presente
  if (!calendar.hasAttribute('data-ubits-id')) {
    calendar.setAttribute('data-ubits-id', '🧩-ux-calendar');
  }
  
  console.log('🟢 [Calendar] Calendario HTML creado:', {
    calendarId: calendar.id,
    calendarClassName: calendar.className,
    hasMonthDropdown: !!calendar.querySelector('.ubits-calendar__month-dropdown'),
    hasYearDropdown: !!calendar.querySelector('.ubits-calendar__year-dropdown'),
    hasMonthInput: !!calendar.querySelector('.ubits-calendar__month-input'),
    hasYearInput: !!calendar.querySelector('.ubits-calendar__year-input'),
    timestamp: new Date().toISOString()
  });

  let currentDate = new Date(initialDate);
  let currentSelectedDate: Date | null = selectedDate ? new Date(selectedDate) : null;
  let currentEndDate: Date | null = endDate ? new Date(endDate) : null;
  
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
    console.log('🔵 [Calendar] Llamando setupEventListeners');
    setupEventListeners();
    console.log('🟢 [Calendar] setupEventListeners completado');

    // Resetear flag después de un pequeño delay
    setTimeout(() => {
      isRendering = false;
      console.log('🟢 [Calendar] Flag isRendering reseteado');
    }, 100);
  };

  /**
   * Configura los event listeners
   */
  const setupEventListeners = () => {
    console.log('🔵 [Calendar] setupEventListeners llamado', {
      calendarInDOM: calendar.isConnected,
      calendarParent: calendar.parentElement?.id || calendar.parentElement?.className,
      timestamp: new Date().toISOString()
    });
    
    // Navegación anterior/siguiente
    const prevBtn = calendar.querySelector('.ubits-calendar__nav-button--prev');
    const nextBtn = calendar.querySelector('.ubits-calendar__nav-button--next');
    const monthInput = calendar.querySelector('.ubits-calendar__month-input') as HTMLInputElement;
    const yearInput = calendar.querySelector('.ubits-calendar__year-input') as HTMLInputElement;
    const monthDropdown = calendar.querySelector('.ubits-calendar__month-dropdown');
    const yearDropdown = calendar.querySelector('.ubits-calendar__year-dropdown');
    
    console.log('🟡 [Calendar] Elementos encontrados:', {
      hasPrevBtn: !!prevBtn,
      hasNextBtn: !!nextBtn,
      hasMonthInput: !!monthInput,
      hasYearInput: !!yearInput,
      hasMonthDropdown: !!monthDropdown,
      hasYearDropdown: !!yearDropdown,
      calendarId: calendar.id,
      calendarClassName: calendar.className,
      monthInputId: monthInput?.id,
      monthInputClassName: monthInput?.className,
      yearInputId: yearInput?.id,
      yearInputClassName: yearInput?.className,
      timestamp: new Date().toISOString()
    });
    
    // Verificar estilos computados de los inputs
    if (monthInput) {
      const monthInputStyles = getComputedStyle(monthInput);
      console.log('🟡 [Calendar] Estilos del monthInput:', {
        display: monthInputStyles.display,
        visibility: monthInputStyles.visibility,
        pointerEvents: monthInputStyles.pointerEvents,
        cursor: monthInputStyles.cursor
      });
    }
    
    if (yearInput) {
      const yearInputStyles = getComputedStyle(yearInput);
      console.log('🟡 [Calendar] Estilos del yearInput:', {
        display: yearInputStyles.display,
        visibility: yearInputStyles.visibility,
        pointerEvents: yearInputStyles.pointerEvents,
        cursor: yearInputStyles.cursor
      });
    }

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
          target: (e.target as HTMLElement).tagName,
          currentTarget: (e.currentTarget as HTMLElement).tagName,
          timestamp: new Date().toISOString()
        });
        e.preventDefault();
        e.stopPropagation();
      if (monthDropdown) {
        const monthDropdownEl = monthDropdown as HTMLElement;
        const isVisible = monthDropdownEl.style.display === 'block';
        
        console.log('🟡 [Calendar] Estado del dropdown de mes:', {
          isVisible,
          display: monthDropdownEl.style.display,
          hasMonthDropdown: !!monthDropdown,
          timestamp: new Date().toISOString()
        });
        
        if (!isVisible) {
          // Cerrar dropdown de año si está abierto
          if (yearDropdown) {
            (yearDropdown as HTMLElement).style.display = 'none';
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
          const dropdownContent = createListDropdown(monthItems, (value) => {
            currentDate.setMonth(value);
            monthDropdownEl.style.display = 'none';
            // Actualizar el input
            if (monthInput) {
              monthInput.value = MONTH_NAMES[value];
            }
            // Actualizar el calendario para mostrar los días del nuevo mes
            render();
          });
          
          monthDropdownEl.appendChild(dropdownContent);
          monthDropdownEl.style.display = 'block';
          
          console.log('🔵 [Calendar] Dropdown de mes creado y mostrado:', {
            monthDropdown: {
              id: monthDropdownEl.id,
              className: monthDropdownEl.className,
              display: monthDropdownEl.style.display,
              position: getComputedStyle(monthDropdownEl).position,
              zIndex: getComputedStyle(monthDropdownEl).zIndex
            },
            monthInput: {
              id: monthInput.id,
              className: monthInput.className
            },
            parentContainer: {
              id: monthInput.closest('.ubits-input-container')?.id,
              className: monthInput.closest('.ubits-input-container')?.className,
              overflow: getComputedStyle(monthInput.closest('.ubits-input-container') as HTMLElement).overflow
            },
            calendar: {
              id: calendar.id,
              className: calendar.className,
              overflow: getComputedStyle(calendar).overflow
            },
            timestamp: new Date().toISOString()
          });
          
          // Ajustar posición del dropdown para evitar que se corte
          requestAnimationFrame(() => {
            setTimeout(() => {
              adjustDropdownPosition(monthDropdownEl, monthInput);
            }, 50);
          });
        } else {
          monthDropdownEl.style.display = 'none';
        }
      }
      });
    } else {
      console.warn('🟡 [Calendar] monthInput no encontrado, no se puede agregar event listener');
    }

    // Toggle dropdown de año
    if (yearInput) {
      console.log('🟢 [Calendar] Agregando event listener a yearInput');
      yearInput.addEventListener('click', (e) => {
        console.log('🔵 [Calendar] Click en yearInput detectado', {
          target: (e.target as HTMLElement).tagName,
          currentTarget: (e.currentTarget as HTMLElement).tagName,
          timestamp: new Date().toISOString()
        });
        e.preventDefault();
        e.stopPropagation();
      if (yearDropdown) {
        const yearDropdownEl = yearDropdown as HTMLElement;
        const isVisible = yearDropdownEl.style.display === 'block';
        
        console.log('🟡 [Calendar] Estado del dropdown de año:', {
          isVisible,
          display: yearDropdownEl.style.display,
          hasYearDropdown: !!yearDropdown,
          timestamp: new Date().toISOString()
        });
        
        if (!isVisible) {
          // Cerrar dropdown de mes si está abierto
          if (monthDropdown) {
            (monthDropdown as HTMLElement).style.display = 'none';
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
          const dropdownContent = createListDropdown(yearItems, (value) => {
            currentDate.setFullYear(value);
            yearDropdownEl.style.display = 'none';
            // Actualizar el input
            if (yearInput) {
              yearInput.value = String(value);
            }
            // Actualizar el calendario para mostrar los días del nuevo año
            render();
          });
          
          yearDropdownEl.appendChild(dropdownContent);
          yearDropdownEl.style.display = 'block';
          
          console.log('🔵 [Calendar] Dropdown de año creado y mostrado:', {
            yearDropdown: {
              id: yearDropdownEl.id,
              className: yearDropdownEl.className,
              display: yearDropdownEl.style.display,
              position: getComputedStyle(yearDropdownEl).position,
              zIndex: getComputedStyle(yearDropdownEl).zIndex
            },
            yearInput: {
              id: yearInput.id,
              className: yearInput.className
            },
            parentContainer: {
              id: yearInput.closest('.ubits-input-container')?.id,
              className: yearInput.closest('.ubits-input-container')?.className,
              overflow: getComputedStyle(yearInput.closest('.ubits-input-container') as HTMLElement).overflow
            },
            calendar: {
              id: calendar.id,
              className: calendar.className,
              overflow: getComputedStyle(calendar).overflow
            },
            timestamp: new Date().toISOString()
          });
          
          // Ajustar posición del dropdown para evitar que se corte
          requestAnimationFrame(() => {
            setTimeout(() => {
              adjustDropdownPosition(yearDropdownEl, yearInput);
            }, 50);
          });
        } else {
          yearDropdownEl.style.display = 'none';
        }
      }
      });
    } else {
      console.warn('🟡 [Calendar] yearInput no encontrado, no se puede agregar event listener');
    }

    // Cerrar dropdowns al hacer click fuera
    const closeDropdowns = () => {
      if (monthDropdown) (monthDropdown as HTMLElement).style.display = 'none';
      if (yearDropdown) (yearDropdown as HTMLElement).style.display = 'none';
    };
    
    // NO agregar listener global de click para evitar loops de re-render en Storybook
    // Los dropdowns se cerrarán cuando se seleccione un valor o cuando se haga click en los inputs

    // Selección de días
    const dayButtons = calendar.querySelectorAll('.ubits-calendar__day:not(.ubits-calendar__day--empty):not(.ubits-calendar__day--disabled)');
    
    dayButtons.forEach(dayBtn => {
      dayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dateStr = (dayBtn as HTMLElement).dataset.date || '';
        const [day, month, year] = dateStr.split('/');
        const clickedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        if (mode === 'single') {
          currentSelectedDate = clickedDate;
          render();
          if (onDateSelect) {
            onDateSelect(clickedDate);
          }
        } else if (mode === 'range') {
          if (!currentSelectedDate || (currentSelectedDate && currentEndDate)) {
            // Iniciar nuevo rango
            currentSelectedDate = clickedDate;
            currentEndDate = null;
            render();
          } else if (currentSelectedDate && !currentEndDate) {
            // Completar rango
            if (compareDates(clickedDate, currentSelectedDate) < 0) {
              // La fecha clickeada es anterior a la inicial, intercambiar
              currentEndDate = currentSelectedDate;
              currentSelectedDate = clickedDate;
            } else {
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
  console.log('🟡 [Calendar] Llamando render inicial');
  render();
  console.log('🟢 [Calendar] Render inicial completado');

  /**
   * Actualiza las opciones del calendario
   */
  const update = (newOptions: Partial<CalendarOptions>) => {
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
      const listInstance = (monthDropdown as any)._listInstance;
      if (listInstance && listInstance.destroy) {
        listInstance.destroy();
      }
    }

    if (yearDropdown) {
      const listInstance = (yearDropdown as any)._listInstance;
      if (listInstance && listInstance.destroy) {
        listInstance.destroy();
      }
    }
    
    if (calendar.parentElement) {
      calendar.parentElement.removeChild(calendar);
    }
  };

  console.log('🟢 [Calendar] createCalendar completado, retornando objeto', {
    hasElement: !!calendar,
    elementId: calendar.id,
    elementClassName: calendar.className,
    hasUpdate: typeof update === 'function',
    hasDestroy: typeof destroy === 'function',
    timestamp: new Date().toISOString()
  });
  
  return {
    element: calendar,
    update,
    destroy
  };
}
