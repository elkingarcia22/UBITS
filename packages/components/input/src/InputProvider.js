/**
 * InputProvider
 * Lógica de renderizado y gestión del componente Input
 * Incluye todos los tipos, estados, tamaños y funcionalidades especiales
 */
import { renderList, createList } from '../../list/src/ListProvider';
import { createModal } from '../../modal/src/ModalProvider';
// Helper para renderizar iconos - compatible con FontAwesome
function renderIconHelper(iconName, iconStyle = 'regular') {
    const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
    const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
    return `<i class="${iconClass} ${name}"></i>`;
}
/**
 * Renderiza un input UBITS como HTML string
 */
export function renderInput(options) {
    const { containerId, label = '', placeholder = '', helperText = '', size = 'md', state = 'default', type = 'text', showLabel = true, showHelper = false, showCounter = false, maxLength = 50, mandatory = false, mandatoryType = 'obligatorio', leftIcon = '', rightIcon = '', value = '', className = '', attributes = {}, showRichTextToolbar = false } = options;
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
    inputHTML += `<div style="position: relative; display: inline-block; width: 100%;">`;
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
    }
    else if (type === 'textarea') {
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
                textareaStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important;`;
            }
            const textareaId = `${containerId}-textarea`;
            inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(' ')}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
            inputHTML += `</div>`;
        }
        else {
            // Textarea sin barra de herramientas (comportamiento normal)
            let textareaStyle = `width: 100%; min-height: 80px; resize: vertical; ${paddingLeft} ${paddingRight}`;
            if (state === 'disabled') {
                textareaStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
            }
            const textareaId = `${containerId}-textarea`;
            inputHTML += `<textarea id="${textareaId}" class="${inputClasses.join(' ')}" style="${textareaStyle}" placeholder="${placeholder}"${disabledAttr}${maxLengthAttr}>${value}</textarea>`;
        }
    }
    else if (type === 'search') {
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
            searchStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${searchStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    }
    else if (type === 'autocomplete') {
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
            autocompleteStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="${autocompleteStyle}" placeholder="${placeholder}" value="${value}" autocomplete="off"${disabledAttr}${maxLengthAttr}>`;
    }
    else if (type === 'calendar' || type === 'date') {
        // CALENDAR/DATE - input con date picker UBITS (NO usar type="date" nativo del sistema)
        console.log('📅 [Input renderInput JS] ========== RENDERING DATE/CALENDAR INPUT ==========');
        console.log('📅 [Input renderInput JS] Type:', type, 'ContainerId:', containerId, 'Value:', value);
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
            calendarStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        // IMPORTANTE: Usar type="text" con readonly para evitar el calendario nativo del sistema
        const inputTag = `<input type="text" class="${inputClasses.join(' ')}" style="${calendarStyle}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}>`;
        console.log('📅 [Input renderInput JS] Generated input HTML:', inputTag);
        console.log('📅 [Input renderInput JS] ✅ Using type="text" with readonly to avoid native calendar');
        inputHTML += inputTag;
    }
    else if (type === 'password') {
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
            passwordStyle += `; background: var(--ubits-bg-3) !important; color: var(--ubits-fg-1-low) !important; border-color: var(--ubits-border-2) !important;`;
        }
        inputHTML += `<input type="password" class="${inputClasses.join(' ')}" style="${passwordStyle}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
    }
    else {
        // INPUT normal (text, email, number, tel, url, date)
        console.log('📅 [Input renderInput JS] ⚠️ Type is not calendar/date, falling to else block. Type:', type);
        if (type === 'date') {
            console.log('📅 [Input renderInput JS] ⚠️⚠️⚠️ Type is "date" but falling to else block! This is wrong!');
            console.log('📅 [Input renderInput JS] ⚠️⚠️⚠️ Should have been caught by calendar/date condition above!');
            // Forzar type="text" con readonly para evitar calendario nativo
            inputHTML += `<input type="text" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}" readonly${disabledAttr}${maxLengthAttr}>`;
            console.log('📅 [Input renderInput JS] ✅ Fixed: Using type="text" with readonly instead of type="date"');
        } else {
            inputHTML += `<input type="${type}" class="${inputClasses.join(' ')}" style="width: 100%; ${paddingLeft} ${paddingRight}" placeholder="${placeholder}" value="${value}"${disabledAttr}${maxLengthAttr}>`;
        }
    }
    // Icono izquierdo con posicionamiento absoluto
    if (finalHasLeftIcon) {
        const leftIconClass = finalLeftIcon.startsWith('fa-') ? `far ${finalLeftIcon}` : `far fa-${finalLeftIcon}`;
        inputHTML += `<i class="${leftIconClass} ubits-input-icon-left" style="position: absolute; left: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    // Icono derecho con posicionamiento absoluto
    if (finalHasRightIcon) {
        const rightIconClass = finalRightIcon.startsWith('fa-') ? `far ${finalRightIcon}` : `far fa-${finalRightIcon}`;
        inputHTML += `<i class="${rightIconClass} ubits-input-icon-right" style="position: absolute; right: var(--ubits-spacing-md, 12px); top: 50%; transform: translateY(-50%); color: var(--ubits-fg-1-medium); pointer-events: none; z-index: 1;"></i>`;
    }
    inputHTML += '</div>';
    // Helper text y character counter (independientes)
    if (showHelper || showCounter) {
        inputHTML += '<div class="ubits-input-helper">';
        if (showHelper && helperText) {
            inputHTML += `<span>${helperText}</span>`;
        }
        if (showCounter) {
            inputHTML += `<span class="ubits-input-counter">0/${maxLength}</span>`;
        }
        inputHTML += '</div>';
    }
    // Agregar atributos adicionales como data attributes
    const attrs = Object.entries(attributes)
        .map(([key, val]) => `${key}="${val}"`)
        .join(' ');
    if (attrs) {
        // Los atributos se aplicarán al contenedor externo
        return `<div ${attrs}>${inputHTML}</div>`;
    }
    return inputHTML;
}
/**
 * Crea un elemento input programáticamente
 */
export function createInput(options) {
    const { containerId, onChange, onFocus, onBlur, showCounter = false, maxLength = 50, type = 'text', selectOptions = [], autocompleteOptions = [], value = '' } = options;
    // Validar parámetros requeridos
    if (!containerId) {
        console.error('UBITS Input: containerId es requerido');
        return null;
    }
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`UBITS Input: No se encontró el contenedor con ID "${containerId}"`);
        return null;
    }
    // Renderizar HTML
    const inputHTML = renderInput(options);
    container.innerHTML = inputHTML;
    // Obtener elementos del DOM
    const wrapper = container.querySelector('div[style*="position: relative"]');
    const inputElement = container.querySelector('.ubits-input');
    const counterElement = container.querySelector('.ubits-input-counter');
    if (!inputElement || !wrapper) {
        console.error('UBITS Input: No se pudo crear el elemento input');
        return null;
    }
    // Asegurar que el contenedor tenga position: relative (para dropdowns)
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }
    console.log('🟢 [Input createInput JS] ========== CREATE INPUT CALLED ==========');
    console.log('🟢 [Input createInput JS] Options:', options);
    console.log('🟢 [Input createInput JS] Type:', type);
    console.log('🟢 [Input createInput JS] ContainerId:', containerId);
    
    // Funcionalidades especiales según el tipo
    if (type === 'select') {
        createSelectDropdown(container, inputElement, selectOptions, value, options.placeholder || '', onChange, options.size || 'md');
    }
    if (type === 'search') {
        createSearchClear(container, inputElement, onChange);
    }
    if (type === 'autocomplete') {
        createAutocompleteDropdown(container, inputElement, autocompleteOptions, onChange, options.size || 'md');
    }
    if (type === 'calendar' || type === 'date') {
        console.log('🟢 [Input createInput JS] ========== INITIALIZING DATE/CALENDAR INPUT ==========');
        console.log('🟢 [Input createInput JS] Input element:', inputElement);
        console.log('🟢 [Input createInput JS] Input element type (before):', inputElement.type);
        
        // Asegurar que el input tenga type="text" y readonly para evitar el calendario nativo
        if (inputElement.type === 'date') {
            console.log('🟢 [Input createInput JS] ⚠️ Input has type="date", changing to type="text"');
            inputElement.type = 'text';
            inputElement.setAttribute('readonly', 'readonly');
            console.log('🟢 [Input createInput JS] ✅ Changed to type="text" with readonly');
        } else {
            console.log('🟢 [Input createInput JS] ✅ Input already has correct type:', inputElement.type);
        }
        console.log('🟢 [Input createInput JS] Input element type (after):', inputElement.type);
        console.log('🟢 [Input createInput JS] Input readonly:', inputElement.hasAttribute('readonly'));
        console.log('🟢 [Input createInput JS] Calling createCalendarPicker...');
        createCalendarPicker(container, inputElement, onChange);
        console.log('🟢 [Input createInput JS] ✅ createCalendarPicker called');
    }
    if (type === 'password') {
        createPasswordToggle(container, inputElement);
    }
    // Barra de herramientas de texto enriquecido (solo para textarea)
    if (type === 'textarea' && options.showRichTextToolbar) {
        setupRichTextToolbar(container, inputElement, options.onChange);
    }
    else if (type === 'textarea' && !options.showRichTextToolbar) {
        // Alinear placeholder del textarea normal con el icono izquierdo si existe
        setupTextareaPlaceholderAlignment(container, inputElement);
    }
    // Actualizar contador de caracteres
    if (showCounter && counterElement) {
        setupCharacterCounter(inputElement, counterElement, maxLength);
    }
    // Event listeners
    if (onChange && typeof onChange === 'function') {
        const eventType = type === 'select' ? 'change' : 'input';
        inputElement.addEventListener(eventType, (e) => {
            onChange(e.target.value, e);
        });
    }
    if (onFocus && typeof onFocus === 'function') {
        inputElement.addEventListener('focus', (e) => {
            onFocus(e.target.value, e);
        });
    }
    if (onBlur && typeof onBlur === 'function') {
        inputElement.addEventListener('blur', (e) => {
            onBlur(e.target.value, e);
        });
    }
    // Métodos
    return {
        element: wrapper,
        inputElement,
        getValue: () => inputElement.value,
        setValue: (newValue) => {
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
        setState: (newState) => {
            const stateClasses = ['ubits-input--hover', 'ubits-input--focus', 'ubits-input--active', 'ubits-input--invalid', 'ubits-input--disabled'];
            stateClasses.forEach(cls => inputElement.classList.remove(cls));
            if (newState !== 'default') {
                inputElement.classList.add(`ubits-input--${newState}`);
            }
            if (newState === 'disabled') {
                inputElement.disabled = true;
            }
            else {
                inputElement.disabled = false;
            }
            // Si es textarea con rich text toolbar, verificar y remover línea divisoria
            if (type === 'textarea' && options.showRichTextToolbar) {
                const richTextWrapper = inputElement.closest('.ubits-input-rich-text-wrapper');
                const toolbar = richTextWrapper?.querySelector('.ubits-input-rich-text-toolbar');
                if (toolbar) {
                    const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
                    const toolbarBorderTop = window.getComputedStyle(toolbar).borderTop;
                    // Forzar que no haya borde en el toolbar
                    if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
                        console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en setState("${newState}"), removiendo...`);
                        toolbar.style.borderBottom = 'none';
                        toolbar.style.borderTop = 'none';
                    }
                }
            }
        }
    };
}
// Funciones auxiliares para funcionalidades especiales (se implementarán en el siguiente paso)
function createPasswordToggle(container, inputElement) {
    // Buscar el icono derecho (puede ser fa-eye por defecto o un icono personalizado)
    const toggleIcon = container.querySelector('.ubits-input-icon-right');
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
            }
            else {
                inputElement.type = 'password';
                // Si es un icono personalizado, mantenerlo; si no, cambiar a eye
                if (!isCustomIcon) {
                    toggleIcon.className = 'far fa-eye ubits-input-icon-right';
                }
            }
        });
    }
}
function createSearchClear(container, inputElement, onChange) {
    // Buscar el icono derecho (puede ser fa-times por defecto o un icono personalizado)
    const clearIcon = container.querySelector('.ubits-input-icon-right');
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
            if (onChange)
                onChange('');
        });
    }
}
function createAutocompleteDropdown(container, inputElement, autocompleteOptions, onChange, inputSize = 'md') {
    // Obtener el tamaño del List basado en el tamaño del Input
    const listSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';
    // Similar a search clear - buscar el icono derecho (puede ser fa-times por defecto o personalizado)
    const clearIcon = container.querySelector('.ubits-input-icon-right');
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
            const listContainer = container.querySelector('.ubits-autocomplete-list-container');
            if (listContainer)
                listContainer.style.display = 'none';
            if (onChange)
                onChange('');
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
        let filtered;
        if (showAll || searchText.length < 1) {
            // Mostrar todas las opciones cuando se activa el input o no hay texto
            filtered = autocompleteOptions.slice(0, 8);
        }
        else {
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
        const listItems = filtered.map(option => ({
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
                        if (clearIcon)
                            clearIcon.style.display = 'block';
                        if (onChange)
                            onChange(selectedItem.value);
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
        }
        catch (error) {
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
                        if (clearIcon)
                            clearIcon.style.display = 'block';
                        if (onChange)
                            onChange(item.value || '');
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
function createSelectDropdown(container, inputElement, selectOptions, value, placeholder, onChange, inputSize = 'md') {
    console.log('🔵 [Select Dropdown] ========== CREATE SELECT DROPDOWN START ==========');
    console.log('🔵 [Select Dropdown] Container:', container);
    console.log('🔵 [Select Dropdown] Input element:', inputElement);
    console.log('🔵 [Select Dropdown] Select options:', selectOptions);
    console.log('🔵 [Select Dropdown] Select options length:', selectOptions ? selectOptions.length : 0);
    console.log('🔵 [Select Dropdown] Value:', value);
    console.log('🔵 [Select Dropdown] Placeholder:', placeholder);
    
    if (!selectOptions || selectOptions.length === 0) {
        console.warn('🔵 [Select Dropdown] ⚠️ No hay opciones disponibles para el select');
        return;
    }
    
    inputElement.style.cursor = 'pointer';
    // Obtener el tamaño del List basado en el tamaño del Input
    const listSize = inputSize === 'xs' ? 'xs' : inputSize === 'sm' ? 'sm' : inputSize === 'md' ? 'md' : 'lg';
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
        let topPosition;
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
    
    // Agregar al body en lugar del contenedor para evitar problemas de overflow
    document.body.appendChild(listContainer);
    
    // Actualizar posición cuando se hace scroll o resize
    window.addEventListener('scroll', updateListPosition, true);
    window.addEventListener('resize', updateListPosition);
    
    // Guardar función de actualización
    listContainer._updatePosition = updateListPosition;
    const itemsPerPage = 50; // Más items por página ya que List tiene scroll
    let currentPage = 0;
    let allLoadedItems = [];
    let isLoading = false;
    const loadOptions = (page = 0) => {
        console.log('🔵 [Select Dropdown loadOptions] Called with page:', page);
        console.log('🔵 [Select Dropdown loadOptions] Select options length:', selectOptions.length);
        if (isLoading) {
            console.log('🔵 [Select Dropdown loadOptions] Already loading, skipping');
            return;
        }
        if (!selectOptions || selectOptions.length === 0) {
            console.warn('🔵 [Select Dropdown loadOptions] ⚠️ No options available');
            isLoading = false;
            return;
        }
        isLoading = true;
        setTimeout(() => {
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, selectOptions.length);
            const pageOptions = selectOptions.slice(startIndex, endIndex);
            console.log('🔵 [Select Dropdown loadOptions] Page options:', pageOptions.length);
            // Convertir opciones a items de List
            const newItems = pageOptions.map(option => ({
                label: option.text,
                state: value === option.value ? 'active' : 'default',
                value: option.value,
                selected: value === option.value,
            }));
            // Si es la primera página, reemplazar todos los items
            if (page === 0) {
                allLoadedItems = newItems;
            }
            else {
                // Agregar items nuevos
                allLoadedItems = [...allLoadedItems, ...newItems];
            }
            // Crear o actualizar la lista
            const listId = `ubits-select-list-${container.id}`;
            listContainer.id = listId;
            listContainer.innerHTML = '';
            console.log('🔵 [Select Dropdown loadOptions] Creating list with items:', allLoadedItems.length);
            console.log('🔵 [Select Dropdown loadOptions] List ID:', listId);
            try {
                createList({
                    containerId: listId,
                    items: allLoadedItems,
                    size: listSize,
                    maxHeight: '200px',
                    onSelectionChange: (selectedItem, index) => {
                        console.log('🔵 [Select Dropdown] Item selected:', selectedItem);
                        if (selectedItem && selectedItem.value) {
                            inputElement.value = selectedItem.label;
                            listContainer.style.display = 'none';
                            if (onChange)
                                onChange(selectedItem.value);
                            // Limpiar listeners cuando se cierra
                            if (listContainer._updatePosition) {
                                window.removeEventListener('scroll', listContainer._updatePosition, true);
                                window.removeEventListener('resize', listContainer._updatePosition);
                            }
                        }
                    },
                });
                console.log('🔵 [Select Dropdown loadOptions] ✅ List created successfully');
            }
            catch (error) {
                // Fallback: usar renderList si createList falla
                console.error('🔵 [Select Dropdown loadOptions] ❌ Error creating list:', error);
                console.warn('Using renderList fallback for select:', error);
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
                            if (onChange)
                                onChange(item.value || '');
                            // Limpiar listeners cuando se cierra
                            if (listContainer._updatePosition) {
                                window.removeEventListener('scroll', listContainer._updatePosition, true);
                                window.removeEventListener('resize', listContainer._updatePosition);
                            }
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
    inputElement.addEventListener('click', () => {
        console.log('🔵 [Select Dropdown] Input clicked');
        console.log('🔵 [Select Dropdown] Select options available:', selectOptions.length);
        const isVisible = listContainer.style.display === 'block';
        console.log('🔵 [Select Dropdown] Is visible:', isVisible);
        if (!isVisible) {
            // Actualizar posición antes de mostrar
            updateListPosition();
            console.log('🔵 [Select Dropdown] Position updated');
            currentPage = 0;
            allLoadedItems = [];
            console.log('🔵 [Select Dropdown] Loading options...');
            loadOptions(0);
            // Esperar a que la lista se cree antes de mostrar
            setTimeout(() => {
                listContainer.style.display = 'block';
                console.log('🔵 [Select Dropdown] ✅ Dropdown displayed');
                console.log('🔵 [Select Dropdown] Container style:', listContainer.style.cssText);
                console.log('🔵 [Select Dropdown] Container rect:', listContainer.getBoundingClientRect());
                console.log('🔵 [Select Dropdown] Container children:', listContainer.children.length);
            }, 200);
        }
        else {
            listContainer.style.display = 'none';
            console.log('🔵 [Select Dropdown] Dropdown hidden');
        }
    });
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!container.contains(target) && !listContainer.contains(target)) {
            listContainer.style.display = 'none';
        }
    });
}
function createCalendarPicker(container, inputElement, onChange) {
    console.log('📅 [Calendar Picker JS] ========== CREATE CALENDAR PICKER START ==========');
    console.log('📅 [Calendar Picker JS] Container:', container);
    console.log('📅 [Calendar Picker JS] Container ID:', container.id);
    console.log('📅 [Calendar Picker JS] Input element:', inputElement);
    console.log('📅 [Calendar Picker JS] Input element type:', inputElement.type);
    console.log('📅 [Calendar Picker JS] Input element readonly:', inputElement.hasAttribute('readonly'));
    console.log('📅 [Calendar Picker JS] Input element value:', inputElement.value);
    console.log('📅 [Calendar Picker JS] onChange function:', !!onChange);
    
    // Importar dinámicamente el CalendarProvider usando ruta relativa
    let calendarInstance = null;
    let calendarContainer = null;
    let isCreatingCalendar = false; // Flag para evitar múltiples creaciones simultáneas
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const parseDate = (dateStr) => {
        if (!dateStr)
            return null;
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year)
            return null;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };
    const showCalendar = async () => {
        console.log('📅 [Calendar Picker JS showCalendar] ========== SHOW CALENDAR CALLED ==========');
        console.log('📅 [Calendar Picker JS showCalendar] Input element type (before):', inputElement.type);
        console.log('📅 [Calendar Picker JS showCalendar] Input element readonly (before):', inputElement.hasAttribute('readonly'));
        
        // Asegurar que el input no tenga type="date" (que mostraría el calendario nativo)
        if (inputElement.type === 'date') {
            console.log('📅 [Calendar Picker JS showCalendar] ⚠️ Input has type="date", changing to type="text"');
            inputElement.type = 'text';
            inputElement.setAttribute('readonly', 'readonly');
            console.log('📅 [Calendar Picker JS showCalendar] ✅ Changed to type="text" with readonly');
        } else {
            console.log('📅 [Calendar Picker JS showCalendar] ✅ Input already has correct type:', inputElement.type);
        }
        
        console.log('📅 [Calendar Picker JS showCalendar] Input element type (after):', inputElement.type);
        console.log('📅 [Calendar Picker JS showCalendar] Input element readonly (after):', inputElement.hasAttribute('readonly'));
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
            let topPosition;
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
                calendarContainer.style.top = `${position.top}px`;
                calendarContainer.style.left = `${position.left}px`;
                calendarContainer.style.width = `${position.width}px`;
            };
            
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            
            // Guardar función de actualización
            calendarContainer._updatePosition = updatePosition;
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
            if (calendarContainer._updatePosition) {
                calendarContainer._updatePosition();
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
        console.log('📅 [Calendar Picker JS showCalendar] Loading CalendarProvider module...');
        try {
            const calendarModule = await import('../../calendar/src/CalendarProvider');
            console.log('📅 [Calendar Picker JS showCalendar] ✅ CalendarProvider module loaded:', calendarModule);
            const { createCalendar } = calendarModule;
            console.log('📅 [Calendar Picker JS showCalendar] createCalendar function:', !!createCalendar);
            // Obtener fecha inicial del input si existe
            const currentValue = inputElement.value;
            const initialDate = parseDate(currentValue) || new Date();
            // Crear instancia del calendario UBITS
            console.log('📅 [Calendar Picker JS showCalendar] Creating Calendar instance...');
            console.log('📅 [Calendar Picker JS showCalendar] Initial date:', initialDate);
            console.log('📅 [Calendar Picker JS showCalendar] Selected date:', parseDate(currentValue));
            
            calendarInstance = createCalendar({
                mode: 'single',
                selectedDate: parseDate(currentValue),
                initialDate: initialDate,
                onDateSelect: (date) => {
                    console.log('📅 [Calendar Picker JS] Date selected:', date);
                    const formattedDate = formatDate(date);
                    console.log('📅 [Calendar Picker JS] Formatted date:', formattedDate);
                    inputElement.value = formattedDate;
                    if (calendarContainer) {
                        calendarContainer.style.display = 'none';
                    }
                    if (onChange) {
                        onChange(formattedDate);
                    }
                }
            });
            
            console.log('📅 [Calendar Picker JS showCalendar] ✅ Calendar instance created:', calendarInstance);
            // Limpiar el contenedor antes de agregar el calendario (por si acaso hay contenido previo)
            calendarContainer.innerHTML = '';
            
            // Actualizar posición antes de mostrar usando la función de cálculo inteligente
            if (calendarContainer._updatePosition) {
                calendarContainer._updatePosition();
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
            console.log('📅 [Calendar Picker JS showCalendar] Appending calendar to container...');
            calendarContainer.appendChild(calendarInstance.element);
            calendarContainer.style.display = 'block';
            console.log('📅 [Calendar Picker JS showCalendar] ✅ Calendar displayed');
            console.log('📅 [Calendar Picker JS showCalendar] Calendar container:', calendarContainer);
            console.log('📅 [Calendar Picker JS showCalendar] Calendar element:', calendarInstance.element);
            
            // Resetear el flag
            isCreatingCalendar = false;
        }
        catch (error) {
            console.error('❌ [Calendar Picker JS showCalendar] Error cargando Calendar UBITS:', error);
            console.error('❌ [Calendar Picker JS showCalendar] Error details:', {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                error
            });
            // Fallback: mostrar mensaje de error
            if (calendarContainer) {
                calendarContainer.innerHTML = `<div style="padding: var(--ubits-spacing-lg, 16px); background: var(--ubits-bg-1); border: 1px solid var(--ubits-border-1); border-radius: var(--ubits-border-radius-lg, 8px); color: var(--ubits-fg-1-high);">Error al cargar el calendario</div>`;
                calendarContainer.style.display = 'block';
            }
            // Resetear el flag en caso de error
            isCreatingCalendar = false;
        }
    };
    // Event listeners para mostrar/ocultar el calendario
    // Usar click para inputs readonly (focus puede dispararse también, pero lo manejamos con un pequeño delay)
    let clickTimeout = null;
    
    console.log('📅 [Calendar Picker JS] Attaching click event listener to input...');
    inputElement.addEventListener('click', (e) => {
        console.log('📅 [Calendar Picker JS] ========== INPUT CLICK EVENT ==========');
        console.log('📅 [Calendar Picker JS] Click event:', e);
        console.log('📅 [Calendar Picker JS] Input element type:', inputElement.type);
        e.preventDefault();
        e.stopPropagation();
        // Limpiar timeout si existe
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        console.log('📅 [Calendar Picker JS] Calling showCalendar()...');
        showCalendar();
    });
    console.log('📅 [Calendar Picker JS] ✅ Click event listener attached');
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
        const target = e.target;
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
function setupCharacterCounter(inputElement, counterElement, maxLength) {
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
function updateCounter(counterElement, currentLength, maxLength) {
    counterElement.textContent = `${currentLength}/${maxLength}`;
    if (currentLength >= maxLength) {
        counterElement.classList.add('ubits-input-counter--limit');
    }
    else {
        counterElement.classList.remove('ubits-input-counter--limit');
    }
}
/**
 * Muestra un modal UBITS para insertar una imagen
 */
function showInsertImageModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-image-modal-${Date.now()}`;
    const inputId = `${modalId}-input`;
    const modalOptions = {
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
            const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay');
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
    const urlInput = document.getElementById(inputId);
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
                }
                else {
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
        const cancelBtn = modalElement.querySelector('.ubits-button--secondary');
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
function showInsertTableModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-table-modal-${Date.now()}`;
    const rowsInputId = `${modalId}-rows`;
    const colsInputId = `${modalId}-cols`;
    const modalOptions = {
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
            const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay');
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
    const insertBtn = modalElement.querySelector('.ubits-button--primary');
    const rowsInput = document.getElementById(rowsInputId);
    const colsInput = document.getElementById(colsInputId);
    if (insertBtn && rowsInput && colsInput) {
        insertBtn.addEventListener('click', () => {
            const rows = parseInt(rowsInput.value) || 2;
            const cols = parseInt(colsInput.value) || 2;
            if (rows > 0 && cols > 0) {
                const table = document.createElement('table');
                table.style.borderCollapse = 'collapse';
                table.style.width = '100%';
                table.style.margin = `var(--ubits-spacing-sm, 8px) 0`;
                table.style.border = `1px solid var(--ubits-border-1)`;
                for (let i = 0; i < rows; i++) {
                    const tr = document.createElement('tr');
                    for (let j = 0; j < cols; j++) {
                        const td = document.createElement('td');
                        td.style.border = `1px solid var(--ubits-border-1)`;
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
                }
                else {
                    editableDiv.appendChild(table);
                }
                syncContent();
                modal.close();
            }
        });
    }
    // Actualizar el onClick del botón Cancelar
    const cancelBtn = modalElement.querySelector('.ubits-button--secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.close();
        });
    }
}
/**
 * Muestra un modal UBITS para crear un enlace
 */
function showCreateLinkModal(editableDiv, syncContent) {
    const modalId = `ubits-rich-text-link-modal-${Date.now()}`;
    const inputId = `${modalId}-input`;
    const modalOptions = {
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
            const modal = document.getElementById(modalId)?.closest('.ubits-modal-overlay');
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
    const insertBtn = modalElement.querySelector('.ubits-button--primary');
    const urlInput = document.getElementById(inputId);
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
    const cancelBtn = modalElement.querySelector('.ubits-button--secondary');
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
function setupRichTextToolbar(container, textareaElement, onChange) {
    const toolbar = container.querySelector('.ubits-input-rich-text-toolbar');
    if (!toolbar)
        return;
    // Buscar el wrapper que contiene la barra y el textarea
    const richTextWrapper = textareaElement.closest('.ubits-input-rich-text-wrapper');
    if (!richTextWrapper)
        return;
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
        inputWrapper = container.parentElement?.closest('.ubits-input-wrapper');
    }
    if (!inputWrapper) {
        // Buscar en el document usando el ID del container
        const containerParent = document.getElementById(container.id)?.parentElement;
        inputWrapper = containerParent?.closest('.ubits-input-wrapper');
    }
    console.log('[Rich Text Placeholder] ===== DEBUG ALINEAMIENTO =====');
    console.log('[Rich Text Placeholder] inputWrapper:', inputWrapper);
    console.log('[Rich Text Placeholder] container:', container);
    console.log('[Rich Text Placeholder] container.parentElement:', container.parentElement);
    console.log('[Rich Text Placeholder] richTextWrapper:', richTextWrapper);
    console.log('[Rich Text Placeholder] richTextWrapper.parentElement:', richTextWrapper?.parentElement);
    // Buscar el icono de múltiples maneras
    let leftIconElement = null;
    // 1. Buscar en el wrapper si existe
    if (inputWrapper) {
        leftIconElement = inputWrapper.querySelector('.ubits-input-icon-left');
    }
    // 2. Buscar en el parent del container
    if (!leftIconElement && container.parentElement) {
        leftIconElement = container.parentElement.querySelector('.ubits-input-icon-left');
    }
    // 3. Buscar en el richTextWrapper parent
    if (!leftIconElement && richTextWrapper?.parentElement) {
        leftIconElement = richTextWrapper.parentElement.querySelector('.ubits-input-icon-left');
    }
    // 4. Buscar en todo el document cerca del container
    if (!leftIconElement) {
        const allIcons = document.querySelectorAll('.ubits-input-icon-left');
        // Buscar el icono más cercano al container
        for (const icon of Array.from(allIcons)) {
            const iconElement = icon;
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
    console.log('[Rich Text Placeholder] leftIconElement:', leftIconElement);
    console.log('[Rich Text Placeholder] hasLeftIcon:', hasLeftIcon);
    if (hasLeftIcon && leftIconElement) {
        // Obtener posición y dimensiones del icono
        const iconRect = leftIconElement.getBoundingClientRect();
        const iconComputedStyle = window.getComputedStyle(leftIconElement);
        const iconLeft = iconComputedStyle.left;
        const iconTop = iconComputedStyle.top;
        const iconTransform = iconComputedStyle.transform;
        console.log('[Rich Text Placeholder] Icono encontrado:', leftIconElement);
        console.log('[Rich Text Placeholder] Icono rect:', iconRect);
        console.log('[Rich Text Placeholder] Icono left (computed):', iconLeft);
        console.log('[Rich Text Placeholder] Icono top (computed):', iconTop);
        console.log('[Rich Text Placeholder] Icono transform:', iconTransform);
        // Obtener padding del textarea
        const paddingLeft = computedStyle.paddingLeft || '12px';
        const paddingTop = computedStyle.paddingTop || '12px';
        const paddingRight = computedStyle.paddingRight || '12px';
        const paddingBottom = computedStyle.paddingBottom || '12px';
        console.log('[Rich Text Placeholder] Textarea padding:', {
            left: paddingLeft,
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom
        });
        // Obtener posición del editableDiv
        const editableRect = editableDiv.getBoundingClientRect();
        console.log('[Rich Text Placeholder] EditableDiv rect:', editableRect);
        // Calcular posición relativa del icono dentro del editableDiv
        const relativeIconLeft = iconRect.left - editableRect.left;
        const relativeIconTop = iconRect.top - editableRect.top;
        const relativeIconBottom = iconRect.bottom - editableRect.top;
        console.log('[Rich Text Placeholder] Icono posición relativa:', {
            left: relativeIconLeft,
            top: relativeIconTop,
            bottom: relativeIconBottom
        });
        // Obtener line-height del texto
        const lineHeight = computedStyle.lineHeight || '1.5';
        const fontSize = computedStyle.fontSize || '14px';
        console.log('[Rich Text Placeholder] Texto:', {
            fontSize,
            lineHeight
        });
        editableDiv.setAttribute('data-has-left-icon', 'true');
        editableDiv.style.setProperty('--placeholder-left', paddingLeft);
        editableDiv.style.setProperty('--placeholder-top', paddingTop);
        console.log('[Rich Text Placeholder] Variables CSS establecidas:', {
            '--placeholder-left': paddingLeft,
            '--placeholder-top': paddingTop
        });
        // Verificar después de que se renderice
        requestAnimationFrame(() => {
            const placeholderBefore = editableDiv.querySelector('::before') ||
                window.getComputedStyle(editableDiv, '::before');
            const placeholderStyle = window.getComputedStyle(editableDiv, '::before');
            console.log('[Rich Text Placeholder] Después de render:', {
                placeholderLeft: placeholderStyle.left,
                placeholderTop: placeholderStyle.top,
                placeholderWidth: placeholderStyle.width,
                placeholderHeight: placeholderStyle.height
            });
        });
    }
    else {
        // Si no hay icono, usar los valores por defecto
        const paddingTop = computedStyle.paddingTop || '12px';
        const paddingLeft = computedStyle.paddingLeft || '12px';
        console.log('[Rich Text Placeholder] Sin icono, usando valores por defecto:', {
            paddingTop,
            paddingLeft
        });
        editableDiv.style.setProperty('--placeholder-top', paddingTop);
        editableDiv.style.setProperty('--placeholder-left', paddingLeft);
    }
    console.log('[Rich Text Placeholder] ===== FIN DEBUG =====');
    // Establecer contenido inicial
    if (textareaElement.value && textareaElement.value.trim()) {
        editableDiv.innerHTML = textareaElement.value;
    }
    else {
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
                    iconAfterInsert = inputWrapper.querySelector('.ubits-input-icon-left') || leftIconElement;
                }
                if (!iconAfterInsert && container.parentElement) {
                    iconAfterInsert = container.parentElement.querySelector('.ubits-input-icon-left') || leftIconElement;
                }
                if (iconAfterInsert) {
                    const iconRect = iconAfterInsert.getBoundingClientRect();
                    const editableRect = editableDiv.getBoundingClientRect();
                    console.log('[Rich Text Placeholder] Después de insertar en DOM:');
                    console.log('[Rich Text Placeholder] Icono rect:', iconRect);
                    console.log('[Rich Text Placeholder] EditableDiv rect:', editableRect);
                    // Solo calcular si el editableDiv tiene dimensiones válidas
                    if (editableRect.width > 0 && editableRect.height > 0) {
                        const relativeIconTop = iconRect.top - editableRect.top;
                        const relativeIconBottom = iconRect.bottom - editableRect.top;
                        const relativeIconLeft = iconRect.left - editableRect.left;
                        console.log('[Rich Text Placeholder] Posiciones relativas:', {
                            iconTop: relativeIconTop,
                            iconBottom: relativeIconBottom,
                            iconLeft: relativeIconLeft,
                            iconCenterY: relativeIconTop + (iconRect.height / 2)
                        });
                        // El icono está centrado verticalmente (top: 50%, transform: translateY(-50%))
                        // Necesitamos alinear el placeholder con la línea base del texto
                        const iconCenterY = relativeIconTop + (iconRect.height / 2);
                        const fontSize = parseFloat(computedStyle.fontSize || '16px');
                        const lineHeightValue = computedStyle.lineHeight;
                        let lineHeight;
                        if (lineHeightValue === 'normal') {
                            lineHeight = fontSize * 1.2; // Normal line-height es aproximadamente 1.2
                        }
                        else if (lineHeightValue.includes('px')) {
                            lineHeight = parseFloat(lineHeightValue);
                        }
                        else {
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
                        console.log('[Rich Text Placeholder] Cálculos de alineamiento:', {
                            iconCenterY,
                            fontSize,
                            lineHeight,
                            paddingTop,
                            textBaselineY,
                            offset,
                            adjustedTop
                        });
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
                        console.log('[Rich Text Placeholder] Variables CSS finales:', {
                            '--placeholder-top': `${finalTop}px`,
                            '--placeholder-left': paddingLeft,
                            'editableDiv padding actualizado': `${finalTop}px ${paddingRight} ${paddingBottom} ${paddingLeft}`
                        });
                    }
                    else {
                        console.warn('[Rich Text Placeholder] EditableDiv aún no tiene dimensiones válidas');
                    }
                }
            });
        });
    }
    // Función para sincronizar contenido
    const syncContent = (event) => {
        const textContent = editableDiv.innerText || '';
        textareaElement.value = textContent;
        // Disparar onChange si existe
        if (onChange) {
            onChange(textContent, event);
        }
        // Manejar placeholder
        if (!textContent.trim()) {
            editableDiv.classList.add('ubits-rich-text-placeholder');
        }
        else {
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
        const toolbar = richTextWrapper.querySelector('.ubits-input-rich-text-toolbar');
        if (toolbar) {
            const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
            const toolbarBorderTop = window.getComputedStyle(toolbar).borderTop;
            // Forzar que no haya borde
            if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
                console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en focus, removiendo...`);
                toolbar.style.borderBottom = 'none';
                toolbar.style.borderTop = 'none';
            }
        }
    });
    // Verificar también cuando se hace hover sobre el wrapper
    richTextWrapper.addEventListener('mouseenter', () => {
        const toolbar = richTextWrapper.querySelector('.ubits-input-rich-text-toolbar');
        if (toolbar) {
            const toolbarBorderBottom = window.getComputedStyle(toolbar).borderBottom;
            if (toolbarBorderBottom && toolbarBorderBottom !== 'none' && toolbarBorderBottom !== '0px') {
                console.warn(`[Rich Text] ⚠️ Línea divisoria detectada en hover, removiendo...`);
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
            if (!command)
                return;
            // Comandos especiales que requieren manejo personalizado
            if (command === 'insertImage') {
                showInsertImageModal(editableDiv, syncContent);
            }
            else if (command === 'insertTable') {
                showInsertTableModal(editableDiv, syncContent);
            }
            else if (command === 'createLink') {
                showCreateLinkModal(editableDiv, syncContent);
            }
            else if (command === 'code') {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const code = document.createElement('code');
                    code.style.background = 'var(--ubits-bg-2)';
                    code.style.padding = `var(--ubits-spacing-xs, 2px) var(--ubits-spacing-sm, 4px)`;
                    code.style.borderRadius = `var(--ubits-border-radius-sm, 4px)`;
                    code.style.fontFamily = 'var(--font-mono, monospace)';
                    try {
                        range.surroundContents(code);
                    }
                    catch (e) {
                        code.textContent = range.toString();
                        range.deleteContents();
                        range.insertNode(code);
                    }
                }
            }
            else {
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
function setupTextareaPlaceholderAlignment(container, textareaElement) {
    // Buscar el wrapper de múltiples formas
    let inputWrapper = container.closest('.ubits-input-wrapper');
    if (!inputWrapper) {
        inputWrapper = container.parentElement?.closest('.ubits-input-wrapper');
    }
    if (!inputWrapper) {
        const containerParent = document.getElementById(container.id)?.parentElement;
        inputWrapper = containerParent?.closest('.ubits-input-wrapper');
    }
    // Buscar el icono izquierdo
    let leftIconElement = null;
    if (inputWrapper) {
        leftIconElement = inputWrapper.querySelector('.ubits-input-icon-left');
    }
    if (!leftIconElement && container.parentElement) {
        leftIconElement = container.parentElement.querySelector('.ubits-input-icon-left');
    }
    if (!leftIconElement) {
        const allIcons = document.querySelectorAll('.ubits-input-icon-left');
        for (const icon of Array.from(allIcons)) {
            const iconElement = icon;
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
            const iconAfterRender = inputWrapper?.querySelector('.ubits-input-icon-left') || leftIconElement;
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
