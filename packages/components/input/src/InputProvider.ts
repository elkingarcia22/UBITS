/**
 * InputProvider
 * Lógica de renderizado y gestión del componente Input
 * Incluye todos los tipos, estados, tamaños y funcionalidades especiales
 */

import type { InputOptions, InputType, SelectOption, AutocompleteOption, InputSize } from './types/InputOptions';
import { renderList, createList } from '../../list/src/ListProvider';
import type { ListItem, ListSize } from '../../list/src/types/ListOptions';
import { createModal } from '../../modal/src/ModalProvider';
import type { ModalOptions } from '../../modal/src/types/ModalOptions';

// Helper para renderizar iconos - compatible con FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un input UBITS como HTML string
 */
export function renderInput(options: InputOptions): string {
  console.log('🔵 [Input renderInput] ========== RENDER INPUT CALLED ==========');
  console.log('🔵 [Input renderInput] Options:', options);
  
  const {
    containerId,
    label = '',
    placeholder = '',
    helperText = '',
    size = 'md',
    state = 'default',
    type = 'text',
    showLabel = true,
    showHelper = false,
    showCounter = false,
    maxLength = 50,
    mandatory = false,
    mandatoryType = 'obligatorio',
    leftIcon = '',
    rightIcon = '',
    value = '',
    className = '',
    attributes = {},
    showRichTextToolbar = false
  } = options;
  
  console.log('🔵 [Input renderInput] Extracted type:', type);
  console.log('🔵 [Input renderInput] Extracted containerId:', containerId);

  let inputHTML = '';

  // Label
  if (showLabel && label) {
    const mandatoryText = mandatory ? ` <span class="ubits-input-mandatory">(${mandatoryType})</span>` : '';
    inputHTML += `<label class="ubits-input-label">${label}${mandatoryText}</label>`;
  }

  // Input wrapper con iconos
  const hasLeftIcon = leftIcon && leftIcon.trim() !== '';
  const hasRightIcon = rightIcon && rightIcon.trim() !== '';

  // Agregar 'far' automáticamente si no está presente
  const leftIconClass = hasLeftIcon && leftIcon.startsWith('fa-') ? `far ${leftIcon}` : (hasLeftIcon ? `far fa-${leftIcon}` : '');
  const rightIconClass = hasRightIcon && rightIcon.startsWith('fa-') ? `far ${rightIcon}` : (hasRightIcon ? `far fa-${rightIcon}` : '');

  inputHTML += `<div style="position: relative; display: inline-block; width: 100%;" data-ubits-id="🧩-ux-input">`;

  // Variables temporales para iconos (pueden cambiar según el tipo)
  let finalRightIcon = rightIcon;
  let finalHasRightIcon = hasRightIcon;
  let finalLeftIcon = leftIcon;
  let finalHasLeftIcon = hasLeftIcon;

  // Input con padding dinámico
  const inputClasses = ['ubits-input', `ubits-input--${size}`];
  if (state !== 'default') {
    inputClasses.push(`ubits-input--${state}`);
  }
  if (className) {
    inputClasses.push(className);
  }

  const disabledAttr = state === 'disabled' ? ' disabled' : '';
  const maxLengthAttr = showCounter ? ` maxlength="${maxLength}"` : '';
  const paddingLeft = hasLeftIcon ? 'padding-left: 40px;' : 'padding-left: 12px;';
  const paddingRight = hasRightIcon ? 'padding-right: 40px;' : 'padding-right: 12px;';

  // Renderizar input según el tipo
  console.log('🔵 [Input renderInput] Checking input type, current type:', type);
  console.log('🔵 [Input renderInput] Type === "date"?', type === 'date');
  console.log('🔵 [Input renderInput] Type === "calendar"?', type === 'calendar');
  console.log('🔵 [Input renderInput] Type === "date" || type === "calendar"?', type === 'date' || type === 'calendar');
  
  if (type === 'select') {
    // SELECT - usar input normal pero readonly
    const selectOptions = options.selectOptions || [];
    const selectValue = value ? selectOptions.find(opt => opt.value === value)?.text || placeholder : placeholder;
    inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" value="${selectValue}" readonly>`;

    // Agregar rightIcon de chevron-down solo si no hay rightIcon personalizado
    if (!hasRightIcon) {
      finalRightIcon = 'fa-chevron-down';
      finalHasRightIcon = true;
      // Ajustar padding si no había rightIcon
      if (!paddingRight || paddingRight === 'padding-right: 12px;') {
        const newPaddingRight = 'padding-right: 40px;';
        // Actualizar el input con el nuevo padding
        inputHTML = inputHTML.replace(`style="width: 100%; ${paddingLeft} ${paddingRight}"`, `style="width: 100%; ${paddingLeft} ${newPaddingRight}"`);
      }
    }
  } else if (type === 'textarea') {
    // TEXTAREA - campo multilínea con redimensionamiento y barra de herramientas opcional
    if (showRichTextToolbar) {
      // Contenedor que envuelve la barra y el textarea
      inputHTML += `<div class="ubits-input-rich-text-wrapper">`;
      
      // Barra de herramientas de texto enriquecido dentro del contenedor
      inputHTML += `
        <div class="ubits-input-rich-text-toolbar" data-container-id="${containerId}">
          <button type="button" class="ubits-rich-text-btn" data-command="bold" title="Negrita">
            <i class="fas fa-bold"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="italic" title="Cursiva">
            <i class="fas fa-italic"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="underline" title="Subrayado">
            <i class="fas fa-underline"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyLeft" title="Alinear izquierda">
            <i class="fas fa-align-left"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyCenter" title="Alinear centro">
            <i class="fas fa-align-center"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="justifyRight" title="Alinear derecha">
            <i class="fas fa-align-right"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertUnorderedList" title="Lista con viñetas">
            <i class="fas fa-list-ul"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertOrderedList" title="Lista numerada">
            <i class="fas fa-list-ol"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="insertImage" title="Insertar imagen">
            <i class="fas fa-image"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="insertTable" title="Insertar tabla">
            <i class="fas fa-table"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="createLink" title="Insertar enlace">
            <i class="fas fa-link"></i>
          </button>
          <button type="button" class="ubits-rich-text-btn" data-command="code" title="Código">
            <i class="fas fa-code"></i>
          </button>
          <div class="ubits-rich-text-separator"></div>
          <button type="button" class="ubits-rich-text-btn" data-command="removeFormat" title="Limpiar formato">
            <i class="fas fa-remove-format"></i>
          </button>
        </div>
      `;
      
      let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}; border: none; border-radius: 0;`;
      if (state === 'disabled') {
        textareaStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important;`;
      }
      const textareaId = `${containerId}-textarea`;
      inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(' ')}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
      
      inputHTML += `</div>`;
    } else {
      // Textarea sin barra de herramientas (comportamiento normal)
    let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}`;
    if (state === 'disabled') {
      textareaStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important; border-color: var(--modifiers-normal-color-light-border-2) !important;`;
    }
      const textareaId = `${containerId}-textarea`;
      inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(' ')}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
    }
  } else if (type === 'search') {
    // SEARCH - input con icono de búsqueda y botón de limpiar
    let searchPaddingLeft = paddingLeft;
    let searchPaddingRight = paddingRight;

    // Agregar leftIcon de search solo si no hay leftIcon personalizado
    if (!hasLeftIcon) {
      finalLeftIcon = 'fa-search';
      finalHasLeftIcon = true;
      searchPaddingLeft = size === 'xs' ? 'padding-left: 32px;' : size === 'sm' ? 'padding-left: 36px;' : size === 'md' ? 'padding-left: 40px;' : 'padding-left: 44px;';
    }

    // Agregar rightIcon de limpiar solo si no hay rightIcon personalizado
    if (!hasRightIcon) {
    finalRightIcon = 'fa-times';
    finalHasRightIcon = true;
    searchPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
    }

    let searchStyle = `width: 100%; ${searchPaddingLeft} ${searchPaddingRight}`;
    if (state === 'disabled') {
      searchStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important; border-color: var(--modifiers-normal-color-light-border-2) !important;`;
    }
    inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${searchStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
  } else if (type === 'autocomplete') {
    // AUTOCOMPLETE - input con dropdown de sugerencias
    let autocompletePaddingLeft = paddingLeft;
    let autocompletePaddingRight = paddingRight;

    // Agregar leftIcon de búsqueda solo si no hay leftIcon personalizado
    if (!hasLeftIcon) {
      finalLeftIcon = 'fa-search';
      finalHasLeftIcon = true;
      autocompletePaddingLeft = size === 'xs' ? 'padding-left: 32px;' : size === 'sm' ? 'padding-left: 36px;' : size === 'md' ? 'padding-left: 40px;' : 'padding-left: 44px;';
    }

    // Agregar rightIcon de limpiar solo si no hay rightIcon personalizado
    if (!hasRightIcon) {
    finalRightIcon = 'fa-times';
    finalHasRightIcon = true;
    autocompletePaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
    }

    let autocompleteStyle = `width: 100%; ${autocompletePaddingLeft} ${autocompletePaddingRight}`;
    if (state === 'disabled') {
      autocompleteStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important; border-color: var(--modifiers-normal-color-light-border-2) !important;`;
    }
    inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${autocompleteStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
  } else if (type === 'calendar' || type === 'date') {
    console.log('📅 [Input renderInput] ========== RENDERING DATE/CALENDAR INPUT ==========');
    console.log('📅 [Input renderInput] Type:', type, 'ContainerId:', containerId, 'Value:', value);
    // CALENDAR/DATE - input con date picker UBITS (NO usar type="date" nativo del sistema)
    let calendarPaddingLeft = paddingLeft;
    let calendarPaddingRight = paddingRight;

    // Agregar rightIcon de calendario solo si no hay rightIcon personalizado
    if (!hasRightIcon) {
    finalRightIcon = 'fa-calendar';
    finalHasRightIcon = true;
    calendarPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
    }

    let calendarStyle = `width: 100%; ${calendarPaddingLeft} ${calendarPaddingRight}`;
    if (state === 'disabled') {
      calendarStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important; border-color: var(--modifiers-normal-color-light-border-2) !important;`;
    }
    // IMPORTANTE: Usar type="text" con readonly para evitar el calendario nativo del sistema
    const inputTag = `<input type="text" class="${inputClasses.join(' ')}" style="${calendarStyle}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}>`;
    console.log('📅 [Input renderInput] Generated input HTML:', inputTag);
    console.log('📅 [Input renderInput] ✅ Using type="text" with readonly to avoid native calendar');
    inputHTML += inputTag;
  } else if (type === 'password') {
    // PASSWORD - input con toggle de mostrar/ocultar
    let passwordPaddingLeft = paddingLeft;
    let passwordPaddingRight = paddingRight;

    // Agregar rightIcon de ojo solo si no hay rightIcon personalizado
    if (!hasRightIcon) {
    finalRightIcon = 'fa-eye';
    finalHasRightIcon = true;
    passwordPaddingRight = size === 'xs' ? 'padding-right: 32px;' : size === 'sm' ? 'padding-right: 36px;' : size === 'md' ? 'padding-right: 40px;' : 'padding-right: 44px;';
    }

    let passwordStyle = `width: 100%; ${passwordPaddingLeft} ${passwordPaddingRight}`;
    if (state === 'disabled') {
      passwordStyle += `; background: var(--modifiers-normal-color-light-bg-3) !important; color: var(--modifiers-normal-color-light-fg-1-low) !important; border-color: var(--modifiers-normal-color-light-border-2) !important;`;
    }
    inputHTML += `<input type="password" class="${inputClasses.join(' ')}" style="${passwordStyle}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
  } else {
    // INPUT normal (text, email, number, tel, url, date)
    console.log('🔵 [Input renderInput] ⚠️ Type is not calendar/date, falling to else block. Type:', type);
    console.log('🔵 [Input renderInput] ⚠️ This will render type="' + type + '" which may show native calendar!');
    
    const step = type === 'number' ? (attributes as any).step || '1' : '';
    const min = type === 'number' ? (attributes as any).min || '' : '';
    const max = type === 'number' ? (attributes as any).max || '' : '';
    const numberAttrs = type === 'number' ? ` step="${step}"${min ? ` min="${min}"` : ''}${max ? ` max="${max}"` : ''}` : '';
    
    // IMPORTANTE: Si el tipo es 'date', NO usar type="date" (calendario nativo)
    if (type === 'date') {
      console.log('🔵 [Input renderInput] ⚠️⚠️⚠️ Type is "date" but falling to else block! This is wrong!');
      console.log('🔵 [Input renderInput] ⚠️⚠️⚠️ Should have been caught by calendar/date condition above!');
      // Forzar type="text" con readonly para evitar calendario nativo
      inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}${maxLengthAttr}>`;
      console.log('🔵 [Input renderInput] ✅ Fixed: Using type="text" with readonly instead of type="date"');
    } else {
      inputHTML += `<input type="${type}" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}"${numberAttrs}${disabledAttr}${maxLengthAttr}>`;
    }
  }

  // Icono izquierdo con posicionamiento absoluto
  if (finalHasLeftIcon) {
    const leftIconClass = finalLeftIcon.startsWith('fa-') ? `far ${finalLeftIcon}` : `far fa-${finalLeftIcon}`;
    inputHTML += `<i class="${leftIconClass} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--modifiers-normal-color-light-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
  }

  // Icono derecho con posicionamiento absoluto
  if (finalHasRightIcon) {
    const rightIconClass = finalRightIcon.startsWith('fa-') ? `far ${finalRightIcon}` : `far fa-${finalRightIcon}`;
    inputHTML += `<i class="${rightIconClass} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--modifiers-normal-color-light-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
  }

  inputHTML += '</div>';

  // Helper text y character counter (independientes)
  console.log('[Input] Rendering helper:', {
    showHelper,
    helperText,
    helperTextLength: helperText?.length || 0,
    showCounter,
    maxLength,
    willShowHelper: showHelper || showCounter,
    willShowHelperText: showHelper && helperText && helperText.trim().length > 0
  });
  
  if (showHelper || showCounter) {
    inputHTML += '<div class="ubits-input-helper">';

    if (showHelper && helperText && helperText.trim().length > 0) {
      inputHTML += `<span class="ubits-input-helper-text">${helperText}</span>`;
      console.log('[Input] ✅ Added helper text:', helperText);
    } else if (showHelper) {
      console.log('[Input] ⚠️ showHelper is true but helperText is empty or whitespace');
    }

    if (showCounter) {
      inputHTML += `<span class="ubits-input-counter">0/${maxLength}</span>`;
      console.log('[Input] Added counter');
    }

    inputHTML += '</div>';
    console.log('[Input] Helper container added');
  } else {
    console.log('[Input] No helper container (showHelper=false, showCounter=false)');
  }

  // Agregar atributos adicionales como data attributes
  const attrs = Object.entries(attributes)
    .map(([key, val]) => `${key}="${val}"`)
    .join(' ');

  if (attrs) {
    // Los atributos se aplicarán al contenedor externo
    return `<div ${attrs} data-ubits-id="🧩-ux-input">${inputHTML}</div>`;
  }

  return inputHTML;
}

/**
 * Crea un elemento input programáticamente
 */
export function createInput(options: InputOptions): {
  element: HTMLDivElement;
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  getValue: () => string;
  setValue: (value: string) => void;
  focus: () => void;
  blur: () => void;
  disable: () => void;
  enable: () => void;
  setState: (newState: string) => void;
} | null {
  console.log('🟢 [Input createInput] ========== CREATE INPUT CALLED ==========');
  console.log('🟢 [Input createInput] Options:', options);
  
  const {
    containerId,
    onChange,
    onFocus,
    onBlur,
    showCounter = false,
    maxLength = 50,
    type = 'text',
    selectOptions = [],
    autocompleteOptions = [],
    value = ''
  } = options;
  
  console.log('🟢 [Input createInput] Extracted type:', type);
  console.log('🟢 [Input createInput] Extracted containerId:', containerId);

  // Validar parámetros requeridos
  if (!containerId) {
    console.error('🟢 [Input createInput] ❌ containerId es requerido');
    return null;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`🟢 [Input createInput] ❌ No se encontró el contenedor con ID "${containerId}"`);
    return null;
  }
  
  console.log('🟢 [Input createInput] ✅ Container found:', container);

  // Renderizar HTML
  console.log('🟢 [Input createInput] Calling renderInput...');
  const inputHTML = renderInput(options);
  console.log('🟢 [Input createInput] renderInput returned HTML length:', inputHTML.length);
  container.innerHTML = inputHTML;
  console.log('🟢 [Input createInput] ✅ HTML inserted into container');

  // Obtener elementos del DOM
  const wrapper = container.querySelector('div[style*="position: relative"]') as HTMLDivElement;
  const inputElement = (container.querySelector('.ubits-input') as HTMLInputElement | HTMLTextAreaElement);
  const counterElement = container.querySelector('.ubits-input-counter') as HTMLElement;

  // Agregar data-ubits-id al wrapper si existe
  if (wrapper && !wrapper.hasAttribute('data-ubits-id')) {
    wrapper.setAttribute('data-ubits-id', '🧩-ux-input');
  }
  // Si no hay wrapper pero hay container, agregar al container
  if (!wrapper && container && !container.hasAttribute('data-ubits-id')) {
    container.setAttribute('data-ubits-id', '🧩-ux-input');
  }

  console.log('[Input] createInput - DOM elements:', {
    wrapper: !!wrapper,
    inputElement: !!inputElement,
    counterElement: !!counterElement,
    containerId,
    type
  });

  if (!inputElement || !wrapper) {
    console.error('UBITS Input: No se pudo crear el elemento input');
    return null;
  }

  // Asegurar que el contenedor tenga position: relative (para dropdowns)
  const containerComputedStyle = getComputedStyle(container);
  console.log('[Input] Container position:', containerComputedStyle.position);
  if (containerComputedStyle.position === 'static') {
    container.style.position = 'relative';
    console.log('[Input] Set container position to relative');
  }

  // Funcionalidades especiales según el tipo
  if (type === 'select') {
    console.log('[Input] createInput - Setting up select dropdown:', {
      selectOptionsCount: selectOptions.length,
      selectOptions,
      containerId,
      hasOnChange: !!onChange
    });
    
    if (selectOptions.length === 0) {
      console.warn('[Input] ⚠️ Select type but no selectOptions provided!');
    }
    
    createSelectDropdown(container, inputElement as HTMLInputElement, selectOptions, value, options.placeholder || '', onChange, options.size || 'md');
  }

  if (type === 'search') {
    createSearchClear(container, inputElement as HTMLInputElement, onChange);
  }

  if (type === 'autocomplete') {
    createAutocompleteDropdown(container, inputElement as HTMLInputElement, autocompleteOptions, onChange, options.size || 'md');
  }

  if (type === 'calendar' || type === 'date') {
    console.log('📅 [Input createInput] ========== INITIALIZING DATE/CALENDAR INPUT ==========');
    console.log('📅 [Input createInput] Type:', type, 'ContainerId:', containerId);
    console.log('📅 [Input createInput] Input element:', inputElement);
    console.log('📅 [Input createInput] Input element type (before):', inputElement instanceof HTMLInputElement ? inputElement.type : 'N/A');
    
    // Asegurar que el input tenga type="text" y readonly para evitar el calendario nativo
    if (inputElement instanceof HTMLInputElement) {
      if (inputElement.type === 'date') {
        console.log('📅 [Input createInput] ⚠️ Input has type="date", changing to type="text"');
        inputElement.type = 'text';
        inputElement.setAttribute('readonly', 'readonly');
        console.log('📅 [Input createInput] ✅ Changed to type="text" with readonly');
      } else {
        console.log('📅 [Input createInput] ✅ Input already has correct type:', inputElement.type);
      }
      console.log('📅 [Input createInput] Input element type (after):', inputElement.type);
      console.log('📅 [Input createInput] Input readonly:', inputElement.hasAttribute('readonly'));
    }
    
    console.log('📅 [Input createInput] Calling createCalendarPicker...');
    createCalendarPicker(container, inputElement as HTMLInputElement, onChange);
    console.log('📅 [Input createInput] ✅ createCalendarPicker called');
  }

  if (type === 'password') {
    createPasswordToggle(container, inputElement as HTMLInputElement);
  }

  // Barra de herramientas de texto enriquecido (solo para textarea)
  if (type === 'textarea' && options.showRichTextToolbar) {
    setupRichTextToolbar(container, inputElement as HTMLTextAreaElement, options.onChange);
  } else if (type === 'textarea' && !options.showRichTextToolbar) {
    // Alinear placeholder del textarea normal con el icono izquierdo si existe
    setupTextareaPlaceholderAlignment(container, inputElement as HTMLTextAreaElement);
  }

  // Actualizar contador de caracteres
  if (showCounter && counterElement) {
    setupCharacterCounter(inputElement, counterElement, maxLength);
  }

  // Event listeners
  if (onChange && typeof onChange === 'function') {
    const eventType = type === 'select' ? 'change' : 'input';
    inputElement.addEventListener(eventType, (e) => {
      onChange((e.target as HTMLInputElement).value, e);
    });
  }

  if (onFocus && typeof onFocus === 'function') {
    inputElement.addEventListener('focus', (e) => {
      onFocus((e.target as HTMLInputElement).value, e);
    });
  }

  if (onBlur && typeof onBlur === 'function') {
    inputElement.addEventListener('blur', (e) => {
      onBlur((e.target as HTMLInputElement).value, e);
    });
  }

  // Aplicar estado inicial si no es 'default'
  const initialState = options.state || 'default';
  console.log('[Input] Applying initial state:', initialState);
  if (initialState !== 'default') {
    // Usar setTimeout para asegurar que el DOM esté completamente renderizado
    setTimeout(() => {
      const stateClasses = ['ubits-input--hover', 'ubits-input--focus', 'ubits-input--active', 'ubits-input--invalid', 'ubits-input--disabled'];
      stateClasses.forEach(cls => inputElement.classList.remove(cls));
      
      if (initialState !== 'default') {
        inputElement.classList.add(`ubits-input--${initialState}`);
        console.log('[Input] ✅ Initial state class added:', `ubits-input--${initialState}`);
      }
      
      if (initialState === 'disabled') {
        inputElement.disabled = true;
      }
      
      // Verificar estilos después de aplicar estado inicial
      requestAnimationFrame(() => {
        const computedStyle = window.getComputedStyle(inputElement);
        console.log('[Input] Initial state applied - computed styles:', {
          borderColor: computedStyle.borderColor,
          backgroundColor: computedStyle.backgroundColor,
          boxShadow: computedStyle.boxShadow,
          classes: Array.from(inputElement.classList)
        });
      });
    }, 0);
  }

  // Métodos
  return {
    element: wrapper,
    inputElement,
    getValue: () => inputElement.value,
    setValue: (newValue: string) => {
      inputElement.value = newValue;
      if (showCounter && counterElement) {
        updateCounter(counterElement, newValue.length, maxLength);
      }
    },
    focus: () => inputElement.focus(),
    blur: () => inputElement.blur(),
    disable: () => {
      inputElement.disabled = true;
      inputElement.classList.add('ubits-input--disabled');
    },
    enable: () => {
      inputElement.disabled = false;
      inputElement.classList.remove('ubits-input--disabled');
    },
    setState: (newState: string) => {
      console.log('[Input] ========== SET STATE START ==========');
      console.log('[Input] setState called:', {
        newState,
        currentClasses: Array.from(inputElement.classList),
        inputType: inputElement.tagName,
        inputId: inputElement.id || 'no-id',
        containerId,
        currentBorderColor: window.getComputedStyle(inputElement).borderColor,
        currentBackgroundColor: window.getComputedStyle(inputElement).backgroundColor
      });

      const stateClasses = ['ubits-input--hover', 'ubits-input--focus', 'ubits-input--active', 'ubits-input--invalid', 'ubits-input--disabled'];
      console.log('[Input] Removing state classes:', stateClasses);
      stateClasses.forEach(cls => {
        const hadClass = inputElement.classList.contains(cls);
        inputElement.classList.remove(cls);
        if (hadClass) {
          console.log('[Input] ✅ Removed class:', cls);
        }
      });

      if (newState !== 'default') {
        const newClass = `ubits-input--${newState}`;
        inputElement.classList.add(newClass);
        console.log('[Input] ✅ Added class:', newClass);
        console.log('[Input] Current classes after add:', Array.from(inputElement.classList));
      } else {
        console.log('[Input] State is default, no class added');
      }

      if (newState === 'disabled') {
        inputElement.disabled = true;
        console.log('[Input] Input disabled set to true');
      } else {
        inputElement.disabled = false;
        console.log('[Input] Input disabled set to false');
      }

      // Verificar estilos computados después del cambio
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const computedStyle = window.getComputedStyle(inputElement);
          const borderColor = computedStyle.borderColor;
          const backgroundColor = computedStyle.backgroundColor;
          const boxShadow = computedStyle.boxShadow;
          
          console.log('[Input] Computed styles after setState:', {
            borderColor,
            backgroundColor,
            color: computedStyle.color,
            boxShadow,
            classes: Array.from(inputElement.classList),
            borderWidth: computedStyle.borderWidth,
            borderStyle: computedStyle.borderStyle
          });
          
          // Verificar que los estilos se aplicaron correctamente según el estado
          if (newState === 'hover') {
            const expectedColor = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-accent-brand').trim();
            console.log('[Input] Hover state check:', {
              expectedColor,
              actualBorderColor: borderColor,
              matches: borderColor.includes('rgb(12, 91, 239)') || borderColor.includes('rgb(12,91,239)')
            });
          } else if (newState === 'focus') {
            const hasBoxShadow = boxShadow && boxShadow !== 'none';
            console.log('[Input] Focus state check:', {
              hasBoxShadow,
              boxShadow,
              borderColor
            });
          } else if (newState === 'invalid') {
            const isRed = borderColor.includes('233') || borderColor.includes('rgb(233');
            console.log('[Input] Invalid state check:', {
              isRed,
              borderColor,
              expectedRed: 'rgb(233, 52, 60) or similar'
            });
          }
          
          console.log('[Input] ========== SET STATE COMPLETE ==========');
        });
      });

      // Si es textarea con rich text toolbar, verificar y remover línea divisoria
      if (type === 'textarea' && options.showRichTextToolbar) {
        const richTextWrapper = inputElement.closest('.ubits-input-rich-text-wrapper') as HTMLElement;
        const toolbar = richTextWrapper?.querySelector('.ubits-input-rich-text-toolbar') as HTMLElement;
        
        if (toolbar) {
          const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
          const toolbarBorderTop = window.getComputedStyle(toolbar).borderTop;
          
          // Forzar que no haya borde en el toolbar
          if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
            toolbar.style.borderBottom = 'none';
            toolbar.style.borderTop = 'none';
          }
        }
      }
    }
  };
}

// Funciones auxiliares para funcionalidades especiales (se implementarán en el siguiente paso)
function createPasswordToggle(container: HTMLElement, inputElement: HTMLInputElement): void {
  // Buscar el icono derecho (puede ser fa-eye por defecto o un icono personalizado)
  const toggleIcon = container.querySelector('.ubits-input-icon-right') as HTMLElement;
  if (toggleIcon) {
    let isPasswordVisible = false;
    toggleIcon.style.pointerEvents = 'auto';
    toggleIcon.style.cursor = 'pointer';

    // Guardar la clase original del icono si es personalizado
    const originalIconClass = toggleIcon.className;
    const isCustomIcon = !originalIconClass.includes('fa-eye');

    toggleIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isPasswordVisible = !isPasswordVisible;

      if (isPasswordVisible) {
        inputElement.type = 'text';
        // Si es un icono personalizado, mantenerlo; si no, cambiar a eye-slash
        if (!isCustomIcon) {
        toggleIcon.className = 'far fa-eye-slash ubits-input-icon-right';
        }
      } else {
        inputElement.type = 'password';
        // Si es un icono personalizado, mantenerlo; si no, cambiar a eye
        if (!isCustomIcon) {
        toggleIcon.className = 'far fa-eye ubits-input-icon-right';
        }
      }
    });
  }
}

function createSearchClear(container: HTMLElement, inputElement: HTMLInputElement, onChange?: (value: string) => void): void {
  // Buscar el icono derecho (puede ser fa-times por defecto o un icono personalizado)
  const clearIcon = container.querySelector('.ubits-input-icon-right') as HTMLElement;
  if (clearIcon) {
    clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
    clearIcon.style.pointerEvents = 'auto';
    clearIcon.style.cursor = 'pointer';

    const toggleClearIcon = () => {
      clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
    };

    inputElement.addEventListener('input', toggleClearIcon);

    clearIcon.addEventListener('click', (e) => {
      e.preventDefault();
      inputElement.value = '';
      inputElement.focus();
      toggleClearIcon();
      if (onChange) onChange('');
    });
  }
}

function createAutocompleteDropdown(container: HTMLElement, inputElement: HTMLInputElement, autocompleteOptions: AutocompleteOption[], onChange?: (value: string) => void, inputSize: InputSize = 'md'): void {
  // Obtener el tamaño del List basado en el tamaño del Input
  const listSize: ListSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';

  // Similar a search clear - buscar el icono derecho (puede ser fa-times por defecto o personalizado)
  const clearIcon = container.querySelector('.ubits-input-icon-right') as HTMLElement;
  if (clearIcon) {
    clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
    clearIcon.style.pointerEvents = 'auto';
    clearIcon.style.cursor = 'pointer';

    const toggleClearIcon = () => {
      clearIcon.style.display = inputElement.value.length > 0 ? 'block' : 'none';
    };

    inputElement.addEventListener('input', toggleClearIcon);

    clearIcon.addEventListener('click', (e) => {
      e.preventDefault();
      inputElement.value = '';
      inputElement.focus();
      toggleClearIcon();
      const listContainer = container.querySelector('.ubits-autocomplete-list-container') as HTMLElement;
      if (listContainer) listContainer.style.display = 'none';
      if (onChange) onChange('');
    });
  }

  // Crear contenedor para el List
  const listContainer = document.createElement('div');
  listContainer.className = 'ubits-autocomplete-list-container';
  listContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    display: none;
  `;
  container.appendChild(listContainer);

  const updateAutocompleteList = (showAll = false) => {
    const searchText = inputElement.value.toLowerCase();
    
    let filtered: AutocompleteOption[];
    if (showAll || searchText.length < 1) {
      // Mostrar todas las opciones cuando se activa el input o no hay texto
      filtered = autocompleteOptions.slice(0, 8);
    } else {
      // Filtrar según el texto ingresado
      filtered = autocompleteOptions
        .filter(opt => opt.text.toLowerCase().includes(searchText))
        .slice(0, 8);
    }

    if (filtered.length === 0) {
      listContainer.style.display = 'none';
      return;
    }

    // Convertir opciones a items de List
    const listItems: ListItem[] = filtered.map(option => ({
      label: option.text,
      state: 'default',
      value: option.value,
      selected: false,
    }));

    // Crear la lista
    const listId = `ubits-autocomplete-list-${container.id}`;
    listContainer.id = listId;
    listContainer.innerHTML = '';

    try {
      createList({
        containerId: listId,
        items: listItems,
        size: listSize,
        maxHeight: '200px',
        onSelectionChange: (selectedItem, index) => {
          if (selectedItem && selectedItem.value) {
            inputElement.value = selectedItem.label;
            listContainer.style.display = 'none';
            if (clearIcon) clearIcon.style.display = 'block';
            if (onChange) onChange(selectedItem.value);
          }
        },
      });

      // Resaltar texto buscado en los items si hay texto
      if (searchText.length > 0) {
        const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
        listItemsElements.forEach((itemEl) => {
          const text = itemEl.textContent || '';
          if (text.toLowerCase().includes(searchText)) {
            const regex = new RegExp(`(${searchText})`, 'gi');
            const highlighted = text.replace(regex, '<strong>$1</strong>');
            itemEl.innerHTML = highlighted;
          }
        });
      }
    } catch (error) {
      // Fallback: usar renderList si createList falla
      console.warn('Using renderList fallback for autocomplete:', error);
      const listHTML = renderList({
        containerId: listId,
        items: listItems,
        size: listSize,
        maxHeight: '200px',
      });
      listContainer.innerHTML = listHTML;

      // Resaltar texto buscado
      if (searchText.length > 0) {
        const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
        listItemsElements.forEach((itemEl) => {
          const text = itemEl.textContent || '';
          if (text.toLowerCase().includes(searchText)) {
            const regex = new RegExp(`(${searchText})`, 'gi');
            const highlighted = text.replace(regex, '<strong>$1</strong>');
            itemEl.innerHTML = highlighted;
          }
        });
      }

      // Agregar event listeners manualmente
      const listItemsElements = listContainer.querySelectorAll('.ubits-list-item');
      listItemsElements.forEach((itemEl, idx) => {
        const item = listItems[idx];
        if (item && item.state !== 'disabled') {
          itemEl.addEventListener('click', () => {
            inputElement.value = item.label;
            listContainer.style.display = 'none';
            if (clearIcon) clearIcon.style.display = 'block';
            if (onChange) onChange(item.value || '');
          });
        }
      });
    }

    listContainer.style.display = 'block';
  };

  // Mostrar dropdown al activar el input (focus)
  inputElement.addEventListener('focus', () => {
    updateAutocompleteList(true);
  });

  // Actualizar dropdown mientras se escribe
  inputElement.addEventListener('input', () => {
    updateAutocompleteList(false);
  });

  inputElement.addEventListener('blur', () => {
    setTimeout(() => listContainer.style.display = 'none', 150);
  });
}

function createSelectDropdown(container: HTMLElement, inputElement: HTMLInputElement, selectOptions: SelectOption[], value: string, placeholder: string, onChange?: (value: string) => void, inputSize: InputSize = 'md'): void {
  console.log('[Input] ========== CREATE SELECT DROPDOWN START ==========');
  console.log('[Input] Parameters:', {
    containerId: container.id,
    containerElement: container,
    containerTagName: container.tagName,
    containerClasses: Array.from(container.classList),
    selectOptionsCount: selectOptions.length,
    selectOptions: selectOptions,
    value,
    placeholder,
    inputSize,
    inputElement: inputElement,
    inputElementId: inputElement.id || 'no-id',
    inputElementClasses: Array.from(inputElement.classList),
    onChangeExists: !!onChange
  });
  
  // Verificar estilos del contenedor ANTES de modificar
  const containerStyleBefore = window.getComputedStyle(container);
  console.log('[Input] Container styles BEFORE:', {
    position: containerStyleBefore.position,
    display: containerStyleBefore.display,
    width: containerStyleBefore.width,
    height: containerStyleBefore.height,
    zIndex: containerStyleBefore.zIndex
  });
  
  inputElement.style.cursor = 'pointer';
  console.log('[Input] Set input cursor to pointer');

  // Asegurar que el contenedor tenga position: relative
  const containerStyle = window.getComputedStyle(container);
  console.log('[Input] Container computed position:', containerStyle.position);
  if (containerStyle.position === 'static') {
    container.style.position = 'relative';
    console.log('[Input] ✅ Set container position to relative');
  } else {
    console.log('[Input] Container already has position:', containerStyle.position);
  }
  
  // Verificar estilos del contenedor DESPUÉS de modificar
  const containerStyleAfter = window.getComputedStyle(container);
  console.log('[Input] Container styles AFTER:', {
    position: containerStyleAfter.position,
    display: containerStyleAfter.display,
    width: containerStyleAfter.width,
    height: containerStyleAfter.height
  });

  // Obtener el tamaño del List basado en el tamaño del Input
  const listSize: ListSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';
  console.log('[Input] List size determined:', listSize);

  // Crear contenedor para el List
  const listContainer = document.createElement('div');
  listContainer.className = 'ubits-select-list-container';
  
  // Calcular posición del input relativo a la ventana para usar position: fixed
  const updateListPosition = () => {
    const inputRect = inputElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Dimensiones del viewport
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Altura estimada del dropdown (máximo 300px)
    const dropdownMaxHeight = 300;
    const dropdownMinHeight = 100;
    
    // Espacio disponible debajo y arriba del input
    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;
    
    // Determinar si mostrar arriba o abajo
    const showAbove = spaceBelow < dropdownMinHeight && spaceAbove > spaceBelow;
    
    // Calcular posición vertical
    let topPosition: number;
    if (showAbove) {
      // Mostrar arriba del input
      topPosition = inputRect.top + scrollTop - dropdownMaxHeight - 4; // 4px de margen
      // Asegurar que no se salga por arriba
      if (topPosition < scrollTop) {
        topPosition = scrollTop + 4;
      }
    } else {
      // Mostrar debajo del input
      topPosition = inputRect.bottom + scrollTop + 4; // 4px de margen
    }
    
    // Calcular posición horizontal (ajustar si se sale por la derecha)
    let leftPosition = inputRect.left + scrollLeft;
    const dropdownWidth = Math.max(inputRect.width, 200);
    
    // Si se sale por la derecha, ajustar
    if (leftPosition + dropdownWidth > scrollLeft + viewportWidth) {
      leftPosition = scrollLeft + viewportWidth - dropdownWidth - 4;
    }
    
    // Si se sale por la izquierda, ajustar
    if (leftPosition < scrollLeft) {
      leftPosition = scrollLeft + 4;
    }
    
    // Calcular altura máxima disponible
    let maxHeight = showAbove 
      ? Math.min(dropdownMaxHeight, spaceAbove - 8)
      : Math.min(dropdownMaxHeight, spaceBelow - 8);
    
    // Asegurar altura mínima
    maxHeight = Math.max(maxHeight, dropdownMinHeight);
    
    listContainer.style.cssText = `
      position: fixed;
      top: ${topPosition}px;
      left: ${leftPosition}px;
      width: ${dropdownWidth}px;
      min-width: 200px;
      max-width: ${viewportWidth - 8}px;
      z-index: 9998;
      display: none;
      background: var(--ubits-bg-1, #ffffff);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: var(--ubits-border-radius-lg, 8px);
      border: 1px solid var(--ubits-border-1, #e0e0e0);
      max-height: ${maxHeight}px;
      overflow-y: auto;
      padding: 4px 0;
    `;
  };
  
  // Inicializar posición
  updateListPosition();
  
  console.log('[Input] List container created:', {
    element: listContainer,
    className: listContainer.className,
    style: listContainer.style.cssText,
    parentBeforeAppend: container
  });
  
  // Agregar al body en lugar del contenedor para evitar problemas de overflow
  document.body.appendChild(listContainer);
  
  // Actualizar posición cuando se hace scroll o resize
  window.addEventListener('scroll', updateListPosition, true);
  window.addEventListener('resize', updateListPosition);
  
  // Guardar función de actualización
  (listContainer as any)._updatePosition = updateListPosition;
  
  console.log('[Input] List container appended to container:', {
    containerChildren: Array.from(container.children),
    listContainerParent: listContainer.parentElement,
    listContainerInDOM: document.body.contains(listContainer)
  });
  
  // Verificar posición del contenedor después de agregar el listContainer
  const containerRect = container.getBoundingClientRect();
  const inputRect = inputElement.getBoundingClientRect();
  console.log('[Input] Bounding rects:', {
    containerRect: {
      top: containerRect.top,
      left: containerRect.left,
      width: containerRect.width,
      height: containerRect.height
    },
    inputRect: {
      top: inputRect.top,
      left: inputRect.left,
      width: inputRect.width,
      height: inputRect.height
    }
  });
  
  console.log('[Input] ========== CREATE SELECT DROPDOWN - CONTAINER SETUP COMPLETE ==========');

  const itemsPerPage = 50; // Más items por página ya que List tiene scroll
  let currentPage = 0;
  let allLoadedItems: ListItem[] = [];
  let isLoading = false;

  const loadOptions = (page = 0) => {
    console.log('[Input] ========== LOAD OPTIONS START ==========');
    console.log('[Input] loadOptions called:', {
      page,
      isLoading,
      itemsPerPage,
      totalOptions: selectOptions.length
    });
    
    if (isLoading) {
      console.log('[Input] ⚠️ Already loading, returning');
      return;
    }
    isLoading = true;
    console.log('[Input] Set isLoading to true');

    setTimeout(() => {
      console.log('[Input] setTimeout callback executing');
      const startIndex = page * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, selectOptions.length);
      const pageOptions = selectOptions.slice(startIndex, endIndex);
      
      console.log('[Input] Page options:', {
        startIndex,
        endIndex,
        pageOptionsCount: pageOptions.length,
        pageOptions
      });

      // Convertir opciones a items de List
      const newItems: ListItem[] = pageOptions.map(option => ({
        label: option.text,
        state: value === option.value ? 'active' : 'default',
        value: option.value,
        selected: value === option.value,
      }));
      
      console.log('[Input] Converted to ListItems:', {
        newItemsCount: newItems.length,
        newItems
      });

      // Si es la primera página, reemplazar todos los items
      if (page === 0) {
        allLoadedItems = newItems;
        console.log('[Input] First page - replaced allLoadedItems:', allLoadedItems);
      } else {
        // Agregar items nuevos
        allLoadedItems = [...allLoadedItems, ...newItems];
        console.log('[Input] Subsequent page - appended to allLoadedItems:', allLoadedItems);
      }

      // Crear o actualizar la lista
      const listId = `ubits-select-list-${container.id}`;
      console.log('[Input] List ID:', listId);
      
      listContainer.id = listId;
      listContainer.innerHTML = '';
      
      console.log('[Input] List container prepared:', {
        listId,
        listContainerId: listContainer.id,
        listContainerInDOM: document.body.contains(listContainer),
        listContainerParent: listContainer.parentElement,
        listContainerDisplay: window.getComputedStyle(listContainer).display,
        listContainerPosition: window.getComputedStyle(listContainer).position,
        listContainerZIndex: window.getComputedStyle(listContainer).zIndex
      });

      try {
        console.log('[Input] Attempting to create list with createList:', {
          listId,
          itemsCount: allLoadedItems.length,
          listSize,
          containerExists: !!document.getElementById(listId),
          listContainerExists: !!listContainer
        });
        
        createList({
          containerId: listId,
          items: allLoadedItems,
          size: listSize,
          maxHeight: '200px',
          onSelectionChange: (selectedItem, index) => {
            console.log('[Input] ========== LIST ITEM SELECTED ==========');
            console.log('[Input] Selection callback:', {
              selectedItem,
              index,
              hasValue: !!(selectedItem && selectedItem.value)
            });
            if (selectedItem && selectedItem.value) {
              inputElement.value = selectedItem.label;
              listContainer.style.display = 'none';
              console.log('[Input] Updated input value and hid list');
              if (onChange) {
                console.log('[Input] Calling onChange callback');
                onChange(selectedItem.value);
              }
              // Limpiar listeners cuando se cierra
              if ((listContainer as any)._updatePosition) {
                window.removeEventListener('scroll', (listContainer as any)._updatePosition, true);
                window.removeEventListener('resize', (listContainer as any)._updatePosition);
              }
            }
          },
        });
        
        console.log('[Input] ✅ List created successfully');
        
        // Verificar que la lista se creó correctamente
        requestAnimationFrame(() => {
          const listElement = listContainer.querySelector('.ubits-list');
          const listItems = listContainer.querySelectorAll('.ubits-list-item');
          console.log('[Input] List verification after creation:', {
            listElementExists: !!listElement,
            listItemsCount: listItems.length,
            listContainerHTML: listContainer.innerHTML.substring(0, 200)
          });
        });
      } catch (error) {
        // Fallback: usar renderList si createList falla
        console.error('[Input] ❌ Error creating list, using fallback:', error);
        console.error('[Input] Error details:', {
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined
        });
        const listHTML = renderList({
          containerId: listId,
          items: allLoadedItems,
          size: listSize,
          maxHeight: '200px',
        });
        listContainer.innerHTML = listHTML;

        // Agregar event listeners manualmente
        const listItems = listContainer.querySelectorAll('.ubits-list-item');
        listItems.forEach((itemEl, idx) => {
          const item = allLoadedItems[idx];
          if (item && item.state !== 'disabled') {
            itemEl.addEventListener('click', () => {
              inputElement.value = item.label;
              listContainer.style.display = 'none';
              if (onChange) onChange(item.value || '');
            });
          }
        });
      }

      // Scroll infinito: cargar más items cuando se acerque al final
      if (endIndex < selectOptions.length) {
        const listElement = listContainer.querySelector('.ubits-list');
        if (listElement) {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && endIndex < selectOptions.length) {
              currentPage++;
              loadOptions(currentPage);
            }
          }, { root: listElement, rootMargin: '50px' });

          // Observar el último item
          const lastItem = listContainer.querySelector('.ubits-list-item:last-child');
          if (lastItem) {
            observer.observe(lastItem);
          }
        }
      }

      isLoading = false;
    }, 150);
  };

  inputElement.addEventListener('click', (e) => {
    console.log('[Input] ========== INPUT CLICK EVENT ==========');
    console.log('[Input] Click event details:', {
      target: e.target,
      currentTarget: e.currentTarget,
      type: e.type,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      defaultPrevented: e.defaultPrevented
    });
    
    e.stopPropagation();
    console.log('[Input] stopPropagation called');
    
    const computedDisplay = window.getComputedStyle(listContainer).display;
    const inlineDisplay = listContainer.style.display;
    const isVisible = inlineDisplay === 'block' || computedDisplay === 'block';
    
    console.log('[Input] List container visibility check:', {
      inlineDisplay,
      computedDisplay,
      isVisible,
      listContainerExists: !!listContainer,
      listContainerInDOM: document.body.contains(listContainer),
      listContainerParent: listContainer.parentElement,
      listContainerRect: listContainer.getBoundingClientRect()
    });
    
    if (!isVisible) {
      console.log('[Input] List is hidden, showing it');
      // Actualizar posición antes de mostrar
      if ((listContainer as any)._updatePosition) {
        (listContainer as any)._updatePosition();
      }
      currentPage = 0;
      allLoadedItems = [];
      console.log('[Input] Reset pagination, loading options:', {
        selectOptionsCount: selectOptions.length,
        selectOptions
      });
      
      loadOptions(0);
      
      // Esperar un frame para que la lista se cree antes de mostrar
      requestAnimationFrame(() => {
        // Actualizar posición antes de mostrar
        if ((listContainer as any)._updatePosition) {
          (listContainer as any)._updatePosition();
        }
        listContainer.style.display = 'block';
        console.log('[Input] ✅ List container display set to block');
        
        // Verificar después de mostrar
        setTimeout(() => {
          const finalDisplay = window.getComputedStyle(listContainer).display;
          const finalRect = listContainer.getBoundingClientRect();
          console.log('[Input] List container after display block:', {
            display: finalDisplay,
            rect: finalRect,
            visible: finalDisplay !== 'none' && finalRect.width > 0 && finalRect.height > 0,
            zIndex: window.getComputedStyle(listContainer).zIndex
          });
        }, 100);
      });
    } else {
      console.log('[Input] List is visible, hiding it');
      listContainer.style.display = 'none';
      console.log('[Input] ✅ List container display set to none');
    }
  });
  
  console.log('[Input] Input click listener attached');
  
  // También escuchar clicks en el icono chevron-down si existe
  const chevronIcon = container.querySelector('.ubits-input-icon-right');
  console.log('[Input] Looking for chevron icon:', {
    found: !!chevronIcon,
    iconElement: chevronIcon,
    iconClasses: chevronIcon ? Array.from(chevronIcon.classList) : []
  });
  
  if (chevronIcon) {
    chevronIcon.addEventListener('click', (e) => {
      console.log('[Input] ========== CHEVRON ICON CLICK EVENT ==========');
      console.log('[Input] Chevron icon click:', {
        target: e.target,
        currentTarget: e.currentTarget
      });
      
      e.stopPropagation();
      e.preventDefault();
      
      const computedDisplay = window.getComputedStyle(listContainer).display;
      const inlineDisplay = listContainer.style.display;
      const isVisible = inlineDisplay === 'block' || computedDisplay === 'block';
      
      console.log('[Input] Chevron click - visibility:', {
        inlineDisplay,
        computedDisplay,
        isVisible
      });
      
      if (!isVisible) {
        console.log('[Input] Chevron click - showing list');
        currentPage = 0;
        allLoadedItems = [];
        loadOptions(0);
        
        requestAnimationFrame(() => {
          // Actualizar posición antes de mostrar
        if ((listContainer as any)._updatePosition) {
          (listContainer as any)._updatePosition();
        }
        listContainer.style.display = 'block';
          console.log('[Input] ✅ Chevron click - list displayed');
        });
      } else {
        console.log('[Input] Chevron click - hiding list');
        listContainer.style.display = 'none';
        console.log('[Input] ✅ Chevron click - list hidden');
      }
    });
    console.log('[Input] Chevron icon click listener attached');
  } else {
    console.log('[Input] ⚠️ Chevron icon not found');
  }

  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    const containsTarget = container.contains(target);
    const isListContainer = listContainer.contains(target);
    
    console.log('[Input] Document click event:', {
      target,
      containerContainsTarget: containsTarget,
      isListContainer,
      listContainerDisplay: window.getComputedStyle(listContainer).display
    });
    
    if (!containsTarget && !isListContainer) {
      console.log('[Input] Click outside container, hiding list');
      listContainer.style.display = 'none';
    }
  });
  
  console.log('[Input] Document click listener attached');
  console.log('[Input] ========== CREATE SELECT DROPDOWN COMPLETE ==========');
}

function createCalendarPicker(container: HTMLElement, inputElement: HTMLInputElement, onChange?: (value: string) => void): void {
  console.log('📅 [Calendar Picker] ========== CREATE CALENDAR PICKER START ==========');
  console.log('📅 [Calendar Picker] Container:', container);
  console.log('📅 [Calendar Picker] Container ID:', container.id);
  console.log('📅 [Calendar Picker] Input element:', inputElement);
  console.log('📅 [Calendar Picker] Input element type:', inputElement.type);
  console.log('📅 [Calendar Picker] Input element readonly:', inputElement.hasAttribute('readonly'));
  console.log('📅 [Calendar Picker] Input element value:', inputElement.value);
  console.log('📅 [Calendar Picker] onChange function:', !!onChange);
  
  // Importar dinámicamente el CalendarProvider usando ruta relativa
  let calendarInstance: ReturnType<typeof import('../../calendar/src/CalendarProvider').createCalendar> | null = null;
  let calendarContainer: HTMLElement | null = null;
  let isCreatingCalendar = false; // Flag para evitar múltiples creaciones simultáneas

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  const showCalendar = async () => {
    console.log('📅 [Calendar Picker showCalendar] ========== SHOW CALENDAR CALLED ==========');
    console.log('📅 [Calendar Picker showCalendar] Input element type (before):', inputElement.type);
    console.log('📅 [Calendar Picker showCalendar] Input element readonly (before):', inputElement.hasAttribute('readonly'));
    
    // Asegurar que el input no tenga type="date" (que mostraría el calendario nativo)
    if (inputElement.type === 'date') {
      console.log('📅 [Calendar Picker showCalendar] ⚠️ Input has type="date", changing to type="text"');
      inputElement.type = 'text';
      inputElement.setAttribute('readonly', 'readonly');
      console.log('📅 [Calendar Picker showCalendar] ✅ Changed to type="text" with readonly');
    } else {
      console.log('📅 [Calendar Picker showCalendar] ✅ Input already has correct type:', inputElement.type);
    }
    
    console.log('📅 [Calendar Picker showCalendar] Input element type (after):', inputElement.type);
    console.log('📅 [Calendar Picker showCalendar] Input element readonly (after):', inputElement.hasAttribute('readonly'));

    // Si el calendario ya está visible, ocultarlo
    if (calendarContainer && calendarContainer.style.display !== 'none') {
      calendarContainer.style.display = 'none';
      return;
    }

    // Si ya se está creando el calendario, no hacer nada
    if (isCreatingCalendar) {
      return;
    }

    // Función para calcular posición inteligente del calendario
    const calculateCalendarPosition = () => {
      const inputRect = inputElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Dimensiones del viewport
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Altura estimada del calendario (típicamente ~300-350px)
      const calendarEstimatedHeight = 350;
      const calendarMinHeight = 250;
      
      // Espacio disponible debajo y arriba del input
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      
      // Determinar si mostrar arriba o abajo
      const showAbove = spaceBelow < calendarMinHeight && spaceAbove > spaceBelow;
      
      // Calcular posición vertical
      let topPosition: number;
      if (showAbove) {
        // Mostrar arriba del input
        topPosition = inputRect.top + scrollTop - calendarEstimatedHeight - 4; // 4px de margen
        // Asegurar que no se salga por arriba
        if (topPosition < scrollTop) {
          topPosition = scrollTop + 4;
        }
      } else {
        // Mostrar debajo del input
        topPosition = inputRect.bottom + scrollTop + 4; // 4px de margen
      }
      
      // Calcular posición horizontal (ajustar si se sale por la derecha)
      let leftPosition = inputRect.left + scrollLeft;
      const calendarWidth = Math.max(inputRect.width, 300); // Ancho mínimo del calendario
      
      // Si se sale por la derecha, ajustar
      if (leftPosition + calendarWidth > scrollLeft + viewportWidth) {
        leftPosition = scrollLeft + viewportWidth - calendarWidth - 4;
      }
      
      // Si se sale por la izquierda, ajustar
      if (leftPosition < scrollLeft) {
        leftPosition = scrollLeft + 4;
      }
      
      return {
        top: topPosition,
        left: leftPosition,
        width: Math.min(calendarWidth, viewportWidth - 8)
      };
    };
    
    // Crear contenedor para el calendario si no existe
    if (!calendarContainer) {
      calendarContainer = document.createElement('div');
      calendarContainer.className = 'ubits-calendar-picker-container';
      
      // Calcular posición inicial
      const position = calculateCalendarPosition();
      
      calendarContainer.style.cssText = `
        position: fixed;
        top: ${position.top}px;
        left: ${position.left}px;
        width: ${position.width}px;
        z-index: 9999;
        display: none;
        background: var(--ubits-bg-1, #ffffff);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: var(--ubits-border-radius-lg, 8px);
        border: 1px solid var(--ubits-border-1, #e0e0e0);
      `;
      
      // Agregar al body en lugar del contenedor para evitar problemas de overflow
      document.body.appendChild(calendarContainer);
      
      // Actualizar posición cuando se hace scroll o resize
      const updatePosition = () => {
        const position = calculateCalendarPosition();
        calendarContainer!.style.top = `${position.top}px`;
        calendarContainer!.style.left = `${position.left}px`;
        calendarContainer!.style.width = `${position.width}px`;
      };
      
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      // Guardar función de actualización
      (calendarContainer as any)._updatePosition = updatePosition;
    } else {
      // Si el contenedor ya existe, actualizar su posición
      const position = calculateCalendarPosition();
      calendarContainer.style.top = `${position.top}px`;
      calendarContainer.style.left = `${position.left}px`;
      calendarContainer.style.width = `${position.width}px`;
    }

    // Si el calendario ya existe, solo mostrarlo
    if (calendarInstance) {
      // Actualizar posición antes de mostrar usando la función de cálculo inteligente
      if ((calendarContainer as any)._updatePosition) {
        (calendarContainer as any)._updatePosition();
      } else {
        // Fallback si no existe la función
        const inputRect = inputElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - inputRect.bottom;
        const spaceAbove = inputRect.top;
        const showAbove = spaceBelow < 250 && spaceAbove > spaceBelow;
        
        if (showAbove) {
          calendarContainer.style.top = `${inputRect.top + scrollTop - 350 - 4}px`;
        } else {
          calendarContainer.style.top = `${inputRect.bottom + scrollTop + 4}px`;
        }
        calendarContainer.style.left = `${inputRect.left + scrollLeft}px`;
        calendarContainer.style.width = `${Math.max(inputRect.width, 300)}px`;
      }
      
      // Verificar si el elemento ya está en el contenedor
      if (calendarContainer.contains(calendarInstance.element)) {
        calendarContainer.style.display = 'block';
        return;
      } else {
        // Si el elemento no está en el contenedor, agregarlo
        calendarContainer.appendChild(calendarInstance.element);
        calendarContainer.style.display = 'block';
        return;
      }
    }

    // Marcar que se está creando el calendario
    isCreatingCalendar = true;

    // Cargar el módulo de calendar dinámicamente
    console.log('📅 [Calendar Picker showCalendar] Loading CalendarProvider module...');
    try {
      const calendarModule = await import('../../calendar/src/CalendarProvider');
      console.log('📅 [Calendar Picker showCalendar] ✅ CalendarProvider module loaded:', calendarModule);
      const { createCalendar } = calendarModule;
      console.log('📅 [Calendar Picker showCalendar] createCalendar function:', !!createCalendar);

      // Obtener fecha inicial del input si existe
      const currentValue = inputElement.value;
      const initialDate = parseDate(currentValue) || new Date();

      // Crear instancia del calendario UBITS
      console.log('📅 [Calendar Picker showCalendar] Creating Calendar instance...');
      console.log('📅 [Calendar Picker showCalendar] Initial date:', initialDate);
      console.log('📅 [Calendar Picker showCalendar] Selected date:', parseDate(currentValue));
      
      calendarInstance = createCalendar({
        mode: 'single',
        selectedDate: parseDate(currentValue),
        initialDate: initialDate,
        onDateSelect: (date: Date) => {
          console.log('📅 [Calendar Picker] Date selected:', date);
          const formattedDate = formatDate(date);
          console.log('📅 [Calendar Picker] Formatted date:', formattedDate);
          inputElement.value = formattedDate;
          if (calendarContainer) {
            calendarContainer.style.display = 'none';
          }
          if (onChange) {
            onChange(formattedDate);
          }
        }
      });
      
      console.log('📅 [Calendar Picker showCalendar] ✅ Calendar instance created:', calendarInstance);

      // Limpiar el contenedor antes de agregar el calendario (por si acaso hay contenido previo)
      calendarContainer.innerHTML = '';
      
      // Actualizar posición antes de mostrar usando la función de cálculo inteligente
      if ((calendarContainer as any)._updatePosition) {
        (calendarContainer as any)._updatePosition();
      } else {
        // Fallback si no existe la función
        const inputRect = inputElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - inputRect.bottom;
        const spaceAbove = inputRect.top;
        const showAbove = spaceBelow < 250 && spaceAbove > spaceBelow;
        
        if (showAbove) {
          calendarContainer.style.top = `${inputRect.top + scrollTop - 350 - 4}px`;
        } else {
          calendarContainer.style.top = `${inputRect.bottom + scrollTop + 4}px`;
        }
        calendarContainer.style.left = `${inputRect.left + scrollLeft}px`;
        calendarContainer.style.width = `${Math.max(inputRect.width, 300)}px`;
      }
      
      // Agregar el calendario al contenedor
      console.log('📅 [Calendar Picker showCalendar] Appending calendar to container...');
      calendarContainer.appendChild(calendarInstance.element);
      calendarContainer.style.display = 'block';
      console.log('📅 [Calendar Picker showCalendar] ✅ Calendar displayed');
      console.log('📅 [Calendar Picker showCalendar] Calendar container:', calendarContainer);
      console.log('📅 [Calendar Picker showCalendar] Calendar element:', calendarInstance.element);
      
      // Resetear el flag
      isCreatingCalendar = false;
    } catch (error) {
      console.error('❌ [Calendar Picker showCalendar] Error cargando Calendar UBITS:', error);
      console.error('❌ [Calendar Picker showCalendar] Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        error
      });
      // Fallback: mostrar mensaje de error
      if (calendarContainer) {
        calendarContainer.innerHTML = `<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--modifiers-normal-color-light-bg-1); border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--modifiers-normal-color-light-fg-1-high);">Error al cargar el calendario</div>`;
        calendarContainer.style.display = 'block';
      }
      // Resetear el flag en caso de error
      isCreatingCalendar = false;
    }
  };
  
  console.log('📅 [Calendar Picker] ✅ createCalendarPicker function initialized');

  // Event listeners para mostrar/ocultar el calendario
  // Usar click para inputs readonly (focus puede dispararse también, pero lo manejamos con un pequeño delay)
  let clickTimeout: ReturnType<typeof setTimeout> | null = null;
  
  console.log('📅 [Calendar Picker] Attaching click event listener to input...');
  inputElement.addEventListener('click', (e) => {
    console.log('📅 [Calendar Picker] ========== INPUT CLICK EVENT ==========');
    console.log('📅 [Calendar Picker] Click event:', e);
    console.log('📅 [Calendar Picker] Input element type:', inputElement.type);
    e.preventDefault();
    e.stopPropagation();
    // Limpiar timeout si existe
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    console.log('📅 [Calendar Picker] Calling showCalendar()...');
    showCalendar();
  });
  console.log('📅 [Calendar Picker] ✅ Click event listener attached');

  inputElement.addEventListener('focus', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Usar un pequeño delay para evitar que se dispare si ya se hizo click
    // Si se hizo click, el timeout se limpiará y esto no se ejecutará
    clickTimeout = setTimeout(() => {
      showCalendar();
      clickTimeout = null;
    }, 100);
  });

  // También escuchar clicks en el icono del calendario
  const calendarIcon = container.querySelector('.ubits-input-icon-right');
  if (calendarIcon) {
    calendarIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showCalendar();
    });
  }

  // Cerrar calendario al hacer clic fuera
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (calendarContainer && !container.contains(target) && !calendarContainer.contains(target)) {
      calendarContainer.style.display = 'none';
    }
  });

  // Cerrar calendario al presionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && calendarContainer) {
      calendarContainer.style.display = 'none';
    }
  });
}

function setupCharacterCounter(inputElement: HTMLInputElement | HTMLTextAreaElement, counterElement: HTMLElement, maxLength: number): void {
  const handleInput = () => {
    updateCounter(counterElement, inputElement.value.length, maxLength);
    
    // Prevenir escribir más del límite
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.substring(0, maxLength);
      updateCounter(counterElement, maxLength, maxLength);
    }
  };

  inputElement.addEventListener('input', handleInput);
  updateCounter(counterElement, inputElement.value.length, maxLength);
}

function updateCounter(counterElement: HTMLElement, currentLength: number, maxLength: number): void {
  counterElement.textContent = `${currentLength}/${maxLength}`;

  if (currentLength >= maxLength) {
    counterElement.classList.add('ubits-input-counter--limit');
  } else {
    counterElement.classList.remove('ubits-input-counter--limit');
  }
}

/**
 * Muestra un modal UBITS para insertar una imagen
 */
function showInsertImageModal(editableDiv: HTMLElement, syncContent: () => void): void {
  const modalId = `ubits-rich-text-image-modal-${Date.now()}`;
  const inputId = `${modalId}-input`;
  
  const modalOptions: ModalOptions = {
    title: 'Insertar imagen',
    size: 'md',
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL de la imagen:
        </label>
        <div style="display: flex; gap: var(--ubits-spacing-sm, 8px); align-items: flex-start;">
          <input 
            type="text" 
            id="${inputId}"
            class="ubits-input ubits-input--md"
            placeholder="https://ejemplo.com/imagen.jpg"
            style="flex: 1;"
          />
          <button 
            type="button"
            id="${modalId}-insert-btn"
            class="ubits-button ubits-button--primary ubits-button--md"
          >
            <span>Insertar imagen</span>
          </button>
        </div>
      </div>
    `,
    footerButtons: {
      secondary: {
        label: 'Cancelar',
        onClick: () => {
          // El modal se cerrará automáticamente con el método close
        }
      }
    },
    onClose: () => {
      // Limpiar el modal del DOM después de cerrar
      const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay') as HTMLElement;
      if (modal) {
        setTimeout(() => modal.remove(), 300); // Esperar a que termine la animación
      }
    },
    closeOnOverlayClick: true,
    open: true
  };

  const modal = createModal(modalOptions);
  const modalElement = modal.element;
  modalElement.id = modalId;

  // Event listener para el botón de insertar
  const insertBtn = document.getElementById(`${modalId}-insert-btn`);
  const urlInput = document.getElementById(inputId) as HTMLInputElement;

  if (insertBtn && urlInput) {
    const handleInsert = () => {
      const url = urlInput.value.trim();
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = `var(--ubits-spacing-sm, 8px) 0`;
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          selection.getRangeAt(0).insertNode(img);
        } else {
          editableDiv.appendChild(img);
        }
        syncContent();
        modal.close();
      }
    };

    insertBtn.addEventListener('click', handleInsert);
    
    // Permitir insertar con Enter
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleInsert();
      }
    });
    
    // Actualizar el onClick del botón Cancelar para usar modal.close()
    const cancelBtn = modalElement.querySelector('.ubits-button--secondary') as HTMLButtonElement;
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        modal.close();
      });
    }
  }
}

/**
 * Muestra un modal UBITS para insertar una tabla
 */
function showInsertTableModal(editableDiv: HTMLElement, syncContent: () => void): void {
  const modalId = `ubits-rich-text-table-modal-${Date.now()}`;
  const rowsInputId = `${modalId}-rows`;
  const colsInputId = `${modalId}-cols`;
  
  const modalOptions: ModalOptions = {
    title: 'Insertar tabla',
    size: 'sm',
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--ubits-spacing-lg, 16px);">
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Filas:
            </label>
            <input 
              type="number" 
              id="${rowsInputId}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
          <div>
            <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
              Columnas:
            </label>
            <input 
              type="number" 
              id="${colsInputId}"
              class="ubits-input ubits-input--md"
              value="2"
              min="1"
              max="20"
              style="width: 100%;"
            />
          </div>
        </div>
      </div>
    `,
    footerButtons: {
      secondary: {
        label: 'Cancelar',
        onClick: () => {
          // El modal se cerrará automáticamente con el método close
        }
      },
      primary: {
        label: 'Insertar',
        onClick: () => {
          // Se manejará después de crear el modal
        }
      }
    },
    onClose: () => {
      // Limpiar el modal del DOM después de cerrar
      const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay') as HTMLElement;
      if (modal) {
        setTimeout(() => modal.remove(), 300); // Esperar a que termine la animación
      }
    },
    closeOnOverlayClick: true,
    open: true
  };

  const modal = createModal(modalOptions);
  const modalElement = modal.element;
  modalElement.id = modalId;

  // Actualizar el onClick del botón Insertar
  const insertBtn = modalElement.querySelector('.ubits-button--primary') as HTMLButtonElement;
  const rowsInput = document.getElementById(rowsInputId) as HTMLInputElement;
  const colsInput = document.getElementById(colsInputId) as HTMLInputElement;

  if (insertBtn && rowsInput && colsInput) {
    insertBtn.addEventListener('click', () => {
      const rows = parseInt(rowsInput.value) || 2;
      const cols = parseInt(colsInput.value) || 2;
      
      if (rows > 0 && cols > 0) {
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.margin = `var(--ubits-spacing-sm, 8px) 0`;
        table.style.border = `1px solid var(--modifiers-normal-color-light-border-1)`;
        
        for (let i = 0; i < rows; i++) {
          const tr = document.createElement('tr');
          for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            td.style.border = `1px solid var(--modifiers-normal-color-light-border-1)`;
            td.style.padding = `var(--ubits-spacing-sm, 8px)`;
            td.style.minWidth = '50px';
            td.textContent = ' ';
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
        
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          selection.getRangeAt(0).insertNode(table);
        } else {
          editableDiv.appendChild(table);
        }
        
        syncContent();
        modal.close();
      }
    });
  }

  // Actualizar el onClick del botón Cancelar
  const cancelBtn = modalElement.querySelector('.ubits-button--secondary') as HTMLButtonElement;
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.close();
    });
  }
}

/**
 * Muestra un modal UBITS para crear un enlace
 */
function showCreateLinkModal(editableDiv: HTMLElement, syncContent: () => void): void {
  const modalId = `ubits-rich-text-link-modal-${Date.now()}`;
  const inputId = `${modalId}-input`;
  
  const modalOptions: ModalOptions = {
    title: 'Insertar enlace',
    size: 'md',
    bodyContent: `
      <div style="padding: var(--ubits-spacing-md, 8px) 0;">
        <label class="ubits-input-label" style="margin-bottom: var(--ubits-spacing-sm, 8px);">
          URL del enlace:
        </label>
        <input 
          type="text" 
          id="${inputId}"
          class="ubits-input ubits-input--md"
          placeholder="https://ejemplo.com"
          style="width: 100%; box-sizing: border-box;"
        />
      </div>
    `,
    footerButtons: {
      secondary: {
        label: 'Cancelar',
        onClick: () => {
          // El modal se cerrará automáticamente con el método close
        }
      },
      primary: {
        label: 'Insertar',
        onClick: () => {
          // Se manejará después de crear el modal
        }
      }
    },
    onClose: () => {
      // Limpiar el modal del DOM después de cerrar
      const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay') as HTMLElement;
      if (modal) {
        setTimeout(() => modal.remove(), 300); // Esperar a que termine la animación
      }
    },
    closeOnOverlayClick: true,
    open: true
  };

  const modal = createModal(modalOptions);
  const modalElement = modal.element;
  modalElement.id = modalId;

  // Actualizar el onClick del botón Insertar
  const insertBtn = modalElement.querySelector('.ubits-button--primary') as HTMLButtonElement;
  const urlInput = document.getElementById(inputId) as HTMLInputElement;

  if (insertBtn && urlInput) {
    insertBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (url) {
        document.execCommand('createLink', false, url);
        syncContent();
        modal.close();
      }
    });
  }

  // Actualizar el onClick del botón Cancelar
  const cancelBtn = modalElement.querySelector('.ubits-button--secondary') as HTMLButtonElement;
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.close();
    });
  }

  // Permitir insertar con Enter
  if (urlInput) {
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (insertBtn) {
          insertBtn.click();
        }
      }
    });
  }
}

function setupRichTextToolbar(container: HTMLElement, textareaElement: HTMLTextAreaElement, onChange?: (value: string, event?: Event) => void): void {
  const toolbar = container.querySelector('.ubits-input-rich-text-toolbar') as HTMLElement;
  if (!toolbar) return;

  // Buscar el wrapper que contiene la barra y el textarea
  const richTextWrapper = textareaElement.closest('.ubits-input-rich-text-wrapper') as HTMLElement;
  if (!richTextWrapper) return;

  const placeholder = textareaElement.placeholder || '';

  // Crear div contentEditable que reemplazará al textarea
  const editableDiv = document.createElement('div');
  editableDiv.className = textareaElement.className;
  
  // Copiar estilos del textarea pero ajustar para que el contenido esté dentro del borde
  const computedStyle = window.getComputedStyle(textareaElement);
  editableDiv.style.cssText = textareaElement.style.cssText;
  editableDiv.style.position = 'relative';
      editableDiv.style.padding = computedStyle.padding || '12px 12px';
  editableDiv.style.margin = '0';
  editableDiv.style.outline = 'none';
  editableDiv.style.overflow = 'auto';
  editableDiv.style.minHeight = computedStyle.minHeight || '80px';
  editableDiv.style.resize = 'vertical';
  editableDiv.contentEditable = 'true';
  editableDiv.setAttribute('data-placeholder', placeholder);
  
  // Detectar si hay icono izquierdo y ajustar el placeholder
  // Buscar el wrapper de múltiples formas
  let inputWrapper = container.closest('.ubits-input-wrapper');
  if (!inputWrapper) {
    // Buscar en el parent del container
    inputWrapper = container.parentElement?.closest('.ubits-input-wrapper') as HTMLElement;
  }
  if (!inputWrapper) {
    // Buscar en el document usando el ID del container
    const containerParent = document.getElementById(container.id)?.parentElement;
    inputWrapper = containerParent?.closest('.ubits-input-wrapper') as HTMLElement;
  }
  
  // Buscar el icono de múltiples maneras
  let leftIconElement: HTMLElement | null = null;
  
  // 1. Buscar en el wrapper si existe
  if (inputWrapper) {
    leftIconElement = inputWrapper.querySelector('.ubits-input-icon-left') as HTMLElement;
  }
  
  // 2. Buscar en el parent del container
  if (!leftIconElement && container.parentElement) {
    leftIconElement = container.parentElement.querySelector('.ubits-input-icon-left') as HTMLElement;
  }
  
  // 3. Buscar en el richTextWrapper parent
  if (!leftIconElement && richTextWrapper?.parentElement) {
    leftIconElement = richTextWrapper.parentElement.querySelector('.ubits-input-icon-left') as HTMLElement;
  }
  
  // 4. Buscar en todo el document cerca del container
  if (!leftIconElement) {
    const allIcons = document.querySelectorAll('.ubits-input-icon-left');
    // Buscar el icono más cercano al container
    for (const icon of Array.from(allIcons)) {
      const iconElement = icon as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const iconRect = iconElement.getBoundingClientRect();
      // Si el icono está cerca del container (mismo nivel o padre)
      if (Math.abs(iconRect.top - containerRect.top) < 100) {
        leftIconElement = iconElement;
        break;
      }
    }
  }
  
  const hasLeftIcon = leftIconElement !== null;
  
  if (hasLeftIcon && leftIconElement) {
    // Obtener posición y dimensiones del icono
    const iconRect = leftIconElement.getBoundingClientRect();
    const iconComputedStyle = window.getComputedStyle(leftIconElement);
    const iconLeft = iconComputedStyle.left;
    const iconTop = iconComputedStyle.top;
    const iconTransform = iconComputedStyle.transform;
    
    // Obtener padding del textarea
    const paddingLeft = computedStyle.paddingLeft || '12px';
    const paddingTop = computedStyle.paddingTop || '12px';
    const paddingRight = computedStyle.paddingRight || '12px';
    const paddingBottom = computedStyle.paddingBottom || '12px';
    
    // Obtener posición del editableDiv
    const editableRect = editableDiv.getBoundingClientRect();
    
    // Calcular posición relativa del icono dentro del editableDiv
    const relativeIconLeft = iconRect.left - editableRect.left;
    const relativeIconTop = iconRect.top - editableRect.top;
    const relativeIconBottom = iconRect.bottom - editableRect.top;
    
    // Obtener line-height del texto
    const lineHeight = computedStyle.lineHeight || '1.5';
    const fontSize = computedStyle.fontSize || '14px';
    
    editableDiv.setAttribute('data-has-left-icon', 'true');
    editableDiv.style.setProperty('--placeholder-left', paddingLeft);
    editableDiv.style.setProperty('--placeholder-top', paddingTop);
    
    // Verificar después de que se renderice
    requestAnimationFrame(() => {
      // Verificación silenciosa después del render
    });
  } else {
    // Si no hay icono, usar los valores por defecto
    const paddingTop = computedStyle.paddingTop || '12px';
    const paddingLeft = computedStyle.paddingLeft || '12px';
    
    editableDiv.style.setProperty('--placeholder-top', paddingTop);
    editableDiv.style.setProperty('--placeholder-left', paddingLeft);
  }
  
  // Establecer contenido inicial
  if (textareaElement.value && textareaElement.value.trim()) {
    editableDiv.innerHTML = textareaElement.value;
  } else {
    editableDiv.classList.add('ubits-rich-text-placeholder');
  }

  // Reemplazar textarea con div editable dentro del wrapper
  textareaElement.style.display = 'none';
  textareaElement.setAttribute('data-rich-text-editor', 'true');
  richTextWrapper.insertBefore(editableDiv, textareaElement);
  
  // Después de insertar en el DOM, recalcular posiciones si hay icono
  if (hasLeftIcon && leftIconElement) {
    // Usar doble requestAnimationFrame para asegurar que el DOM esté completamente renderizado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Re-buscar el icono después de que el DOM esté actualizado
        let iconAfterInsert = leftIconElement;
        if (inputWrapper) {
          iconAfterInsert = inputWrapper.querySelector('.ubits-input-icon-left') as HTMLElement || leftIconElement;
        }
        if (!iconAfterInsert && container.parentElement) {
          iconAfterInsert = container.parentElement.querySelector('.ubits-input-icon-left') as HTMLElement || leftIconElement;
        }
        
        if (iconAfterInsert) {
          const iconRect = iconAfterInsert.getBoundingClientRect();
          const editableRect = editableDiv.getBoundingClientRect();
          
          // Solo calcular si el editableDiv tiene dimensiones válidas
          if (editableRect.width > 0 && editableRect.height > 0) {
            const relativeIconTop = iconRect.top - editableRect.top;
            const relativeIconBottom = iconRect.bottom - editableRect.top;
            const relativeIconLeft = iconRect.left - editableRect.left;
            
            // El icono está centrado verticalmente (top: 50%, transform: translateY(-50%))
            // Necesitamos alinear el placeholder con la línea base del texto
            const iconCenterY = relativeIconTop + (iconRect.height / 2);
            const fontSize = parseFloat(computedStyle.fontSize || '16px');
            const lineHeightValue = computedStyle.lineHeight;
            let lineHeight: number;
            
            if (lineHeightValue === 'normal') {
              lineHeight = fontSize * 1.2; // Normal line-height es aproximadamente 1.2
            } else if (lineHeightValue.includes('px')) {
              lineHeight = parseFloat(lineHeightValue);
            } else {
              lineHeight = fontSize * parseFloat(lineHeightValue);
            }
            
            // El icono está centrado verticalmente en el contenedor del input
            // El placeholder debe alinearse con la línea base del texto
            // La línea base del texto está aproximadamente a fontSize * 0.75 desde el top del texto
            // Pero necesitamos considerar el padding-top del editableDiv
            const paddingTop = parseFloat(computedStyle.paddingTop || '12px');
            
            // Calcular la posición vertical del texto dentro del editableDiv
            // El texto comienza en paddingTop, y su línea base está a paddingTop + (fontSize * 0.75)
            const textBaselineY = paddingTop + (fontSize * 0.75);
            
            // Ajustar el top del placeholder para que la línea base del texto coincida con el centro del icono
            // Si el icono está más arriba que la línea base, ajustamos hacia arriba
            // Si el icono está más abajo, ajustamos hacia abajo
            const offset = iconCenterY - textBaselineY;
            const adjustedTop = paddingTop + offset;
            
            // Usar el valor calculado, asegurándonos de que sea positivo
            const finalTop = Math.max(0, adjustedTop);
            
            // IMPORTANTE: Ajustar también el padding-top del editableDiv para que el texto escrito
            // esté alineado igual que el placeholder
            const currentPadding = editableDiv.style.padding || computedStyle.padding || '12px 12px';
            const paddingParts = currentPadding.split(' ');
            const paddingRight = paddingParts[1] || paddingParts[0] || '12px';
            const paddingBottom = paddingParts[2] || paddingParts[0] || '12px';
            const paddingLeft = paddingParts[3] || paddingParts[1] || paddingParts[0] || '40px';
            
            // Actualizar el padding del editableDiv con el top ajustado
            editableDiv.style.padding = `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`;
            
            // También actualizar las variables CSS para el placeholder
            editableDiv.style.setProperty('--placeholder-top', `${finalTop}px`);
            editableDiv.style.setProperty('--placeholder-left', paddingLeft);
          }
        }
      });
    });
  }

  // Función para sincronizar contenido
  const syncContent = (event?: Event) => {
    const textContent = editableDiv.innerText || '';
    textareaElement.value = textContent;
    
    // Disparar onChange si existe
    if (onChange) {
      onChange(textContent, event);
    }
    
    // Manejar placeholder
    if (!textContent.trim()) {
      editableDiv.classList.add('ubits-rich-text-placeholder');
    } else {
      editableDiv.classList.remove('ubits-rich-text-placeholder');
    }
  };

  // Sincronizar contenido entre div editable y textarea oculto
  editableDiv.addEventListener('input', syncContent);
  editableDiv.addEventListener('blur', syncContent);

  // Manejar placeholder al enfocar
  editableDiv.addEventListener('focus', () => {
    if (editableDiv.classList.contains('ubits-rich-text-placeholder')) {
      editableDiv.textContent = '';
      editableDiv.classList.remove('ubits-rich-text-placeholder');
    }
    
    // Verificar y remover línea divisoria en el toolbar cuando se activa
    const toolbar = richTextWrapper.querySelector('.ubits-input-rich-text-toolbar') as HTMLElement;
    if (toolbar) {
      const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
      const toolbarBorderTop = window.getComputedStyle(toolbar).borderTop;
      
      // Forzar que no haya borde
      if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
        toolbar.style.borderBottom = 'none';
        toolbar.style.borderTop = 'none';
      }
    }
  });
  
  // Verificar también cuando se hace hover sobre el wrapper
  richTextWrapper.addEventListener('mouseenter', () => {
    const toolbar = richTextWrapper.querySelector('.ubits-input-rich-text-toolbar') as HTMLElement;
    if (toolbar) {
      const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
      if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
        toolbar.style.borderBottom = 'none';
        toolbar.style.borderTop = 'none';
      }
    }
  });

  // Botones de la barra de herramientas
  const toolbarButtons = toolbar.querySelectorAll('.ubits-rich-text-btn');
  toolbarButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      editableDiv.focus();
      
      const command = button.getAttribute('data-command');
      if (!command) return;

      // Comandos especiales que requieren manejo personalizado
      if (command === 'insertImage') {
        showInsertImageModal(editableDiv, syncContent);
      } else if (command === 'insertTable') {
        showInsertTableModal(editableDiv, syncContent);
      } else if (command === 'createLink') {
        showCreateLinkModal(editableDiv, syncContent);
      } else if (command === 'code') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const code = document.createElement('code');
          code.style.background = 'var(--modifiers-normal-color-light-bg-2)';
          code.style.padding = `var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)`;
          code.style.borderRadius = `var(--ubits-border-radius-sm, 4px)`;
          code.style.fontFamily = 'var(--font-mono, monospace)';
          try {
            range.surroundContents(code);
          } catch (e) {
            code.textContent = range.toString();
            range.deleteContents();
            range.insertNode(code);
          }
        }
      } else {
        // Comandos estándar de document.execCommand
        document.execCommand(command, false, undefined);
      }

      // Sincronizar contenido
      syncContent();
    });
  });
}

/**
 * Alinea el placeholder del textarea normal (sin rich text toolbar) con el icono izquierdo
 */
function setupTextareaPlaceholderAlignment(container: HTMLElement, textareaElement: HTMLTextAreaElement): void {
  // Buscar el wrapper de múltiples formas
  let inputWrapper = container.closest('.ubits-input-wrapper');
  if (!inputWrapper) {
    inputWrapper = container.parentElement?.closest('.ubits-input-wrapper') as HTMLElement;
  }
  if (!inputWrapper) {
    const containerParent = document.getElementById(container.id)?.parentElement;
    inputWrapper = containerParent?.closest('.ubits-input-wrapper') as HTMLElement;
  }
  
  // Buscar el icono izquierdo
  let leftIconElement: HTMLElement | null = null;
  
  if (inputWrapper) {
    leftIconElement = inputWrapper.querySelector('.ubits-input-icon-left') as HTMLElement;
  }
  
  if (!leftIconElement && container.parentElement) {
    leftIconElement = container.parentElement.querySelector('.ubits-input-icon-left') as HTMLElement;
  }
  
  if (!leftIconElement) {
    const allIcons = document.querySelectorAll('.ubits-input-icon-left');
    for (const icon of Array.from(allIcons)) {
      const iconElement = icon as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const iconRect = iconElement.getBoundingClientRect();
      if (Math.abs(iconRect.top - containerRect.top) < 100) {
        leftIconElement = iconElement;
        break;
      }
    }
  }
  
  const hasLeftIcon = leftIconElement !== null;
  
  if (!hasLeftIcon || !leftIconElement) {
    return; // No hay icono, no hay nada que alinear
  }
  
  // Esperar a que el DOM esté completamente renderizado
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const iconAfterRender = inputWrapper?.querySelector('.ubits-input-icon-left') as HTMLElement || leftIconElement;
      
      if (iconAfterRender && textareaElement) {
        const iconRect = iconAfterRender.getBoundingClientRect();
        const textareaRect = textareaElement.getBoundingClientRect();
        
        // Solo calcular si el textarea tiene dimensiones válidas
        if (textareaRect.width > 0 && textareaRect.height > 0) {
          const relativeIconTop = iconRect.top - textareaRect.top;
          const relativeIconBottom = iconRect.bottom - textareaRect.top;
          const relativeIconLeft = iconRect.left - textareaRect.left;
          
          // El icono está centrado verticalmente (top: 50%, transform: translateY(-50%))
          const iconCenterY = relativeIconTop + (iconRect.height / 2);
          const computedStyle = window.getComputedStyle(textareaElement);
          const fontSize = parseFloat(computedStyle.fontSize || '16px');
          const paddingTop = parseFloat(computedStyle.paddingTop || '12px');
          
          // Calcular la posición vertical del texto dentro del textarea
          // La línea base del texto está aproximadamente a paddingTop + (fontSize * 0.75)
          const textBaselineY = paddingTop + (fontSize * 0.75);
          
          // Ajustar el padding-top del textarea para que la línea base del texto coincida con el centro del icono
          const offset = iconCenterY - textBaselineY;
          const adjustedTop = paddingTop + offset;
          const finalTop = Math.max(0, adjustedTop);
          
          // Actualizar el padding del textarea
          const currentPadding = computedStyle.padding || '12px 12px';
          const paddingParts = currentPadding.split(' ');
          const paddingRight = paddingParts[1] || paddingParts[0] || '12px';
          const paddingBottom = paddingParts[2] || paddingParts[0] || '12px';
          const paddingLeft = paddingParts[3] || paddingParts[1] || paddingParts[0] || '40px';
          
          textareaElement.style.padding = `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`;
        }
      }
    });
  });
}

