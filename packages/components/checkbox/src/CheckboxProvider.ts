import type { CheckboxOptions } from './types/CheckboxOptions';

/**
 * Renderiza el HTML de un Checkbox
 */
export function renderCheckbox(options: CheckboxOptions): string {
  const {
    label,
    complementaryText,
    value = '',
    name = '',
    checked = false,
    indeterminate = false,
    size = 'md',
    state = 'default',
    disabled = false,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-checkbox',
    `ubits-checkbox--${size}`,
    state !== 'default' ? `ubits-checkbox--${state}` : '',
    checked ? 'ubits-checkbox--checked' : '',
    indeterminate ? 'ubits-checkbox--indeterminate' : '',
    isDisabled ? 'ubits-checkbox--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Checkbox input
  const checkboxInput = `
    <input
      type="checkbox"
      id="checkbox-${name}-${value || 'default'}"
      ${name ? `name="${name}"` : ''}
      ${value ? `value="${value}"` : ''}
      ${checked ? 'checked' : ''}
      ${indeterminate ? 'data-indeterminate="true"' : ''}
      ${isDisabled ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `;

  // Checkbox square (visual)
  // Mostrar checkmark si está checked, línea horizontal si está indeterminate
  const checkboxSquare = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${indeterminate ? '<span class="ubits-checkbox__indeterminate"></span>' : ''}
      ${checked && !indeterminate ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
      ${!checked && !indeterminate && state === 'active' ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `;

  // Label text
  const labelHTML = `
    <span class="ubits-checkbox__label">${label}</span>
  `;

  // Complementary text
  const complementaryTextHTML = complementaryText
    ? `<span class="ubits-checkbox__complementary-text">${complementaryText}</span>`
    : '';

  // Text content wrapper
  const textContentHTML = `
    <div class="ubits-checkbox__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;

  return `
    <label class="${classes}" data-ubits-id="🧩-ux-checkbox">
      ${checkboxInput}
      ${checkboxSquare}
      ${textContentHTML}
    </label>
  `.trim();
}

/**
 * Crea un elemento Checkbox programáticamente
 */
export function createCheckbox(options: CheckboxOptions): {
  element: HTMLLabelElement;
  destroy: () => void;
  update: (newOptions: Partial<CheckboxOptions>) => void;
} {
  // Priorizar container directo, luego containerId, luego document.body
  let container: HTMLElement | null = null;
  
  if (options.container) {
    container = options.container;
  } else if (options.containerId) {
    container = document.getElementById(options.containerId);
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
  } else {
    container = document.body;
  }

  if (!container) {
    throw new Error('Container not found');
  }

  const checkboxHTML = renderCheckbox(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = checkboxHTML.trim();
  const element = tempDiv.firstElementChild as HTMLLabelElement;

  if (!element) {
    throw new Error('Failed to create checkbox element');
  }

  // Agregar data-ubits-id si no está presente
  if (!element.hasAttribute('data-ubits-id')) {
    element.setAttribute('data-ubits-id', '🧩-ux-checkbox');
  }

  container.appendChild(element);

  // Esperar un frame para que los estilos se apliquen
  requestAnimationFrame(() => {
    console.log('[Checkbox] Element created:', element);
    console.log('[Checkbox] Element classes:', element.className);
    console.log('[Checkbox] Element HTML:', element.outerHTML);
    console.log('[Checkbox] Element computed styles:', {
      position: window.getComputedStyle(element).position,
      display: window.getComputedStyle(element).display,
      width: window.getComputedStyle(element).width,
      height: window.getComputedStyle(element).height
    });
  });

  // Agregar event listener para cambio
  const inputElement = element.querySelector('.ubits-checkbox__input') as HTMLInputElement;
  console.log('[Checkbox] Input element found:', inputElement);
  
  if (inputElement) {
    console.log('[Checkbox] Input element details:', {
      id: inputElement.id,
      type: inputElement.type,
      checked: inputElement.checked,
      disabled: inputElement.disabled,
      style: inputElement.style.cssText,
      computedStyle: window.getComputedStyle(inputElement),
      offsetWidth: inputElement.offsetWidth,
      offsetHeight: inputElement.offsetHeight,
      clientWidth: inputElement.clientWidth,
      clientHeight: inputElement.clientHeight
    });
    
    // Aplicar estado indeterminado al input nativo si es necesario
    if (options.indeterminate) {
      inputElement.indeterminate = true;
    }
    
    // Agregar listener de click para debug
    inputElement.addEventListener('click', (e) => {
      console.log('[Checkbox] Input clicked!', {
        checked: inputElement.checked,
        event: e,
        target: e.target
      });
    });
    
    // Función para actualizar el estado visual del checkbox
    const updateVisualState = () => {
      const square = element.querySelector('.ubits-checkbox__square') as HTMLElement;
      const checkmark = square?.querySelector('.ubits-checkbox__checkmark');
      const indeterminate = square?.querySelector('.ubits-checkbox__indeterminate');
      
      console.log('[Checkbox] Updating visual state:', {
        checked: inputElement.checked,
        indeterminate: inputElement.indeterminate,
        hasCheckmark: !!checkmark,
        hasIndeterminate: !!indeterminate
      });
      
      if (!square) {
        console.error('[Checkbox] Square element not found!');
        return;
      }
      
      // Actualizar clases
      if (inputElement.checked) {
        element.classList.add('ubits-checkbox--checked');
        element.classList.remove('ubits-checkbox--indeterminate');
      } else if (inputElement.indeterminate) {
        element.classList.add('ubits-checkbox--indeterminate');
        element.classList.remove('ubits-checkbox--checked');
      } else {
        element.classList.remove('ubits-checkbox--checked');
        element.classList.remove('ubits-checkbox--indeterminate');
      }
      
      // Actualizar HTML del checkmark/indeterminate
      if (inputElement.indeterminate) {
        // Remover checkmark si existe
        if (checkmark) {
          checkmark.remove();
        }
        // Agregar indeterminate si no existe
        if (!indeterminate) {
          const indeterminateEl = document.createElement('span');
          indeterminateEl.className = 'ubits-checkbox__indeterminate';
          square.appendChild(indeterminateEl);
        }
      } else if (inputElement.checked) {
        // Remover indeterminate si existe
        if (indeterminate) {
          indeterminate.remove();
        }
        // Agregar checkmark si no existe
        if (!checkmark) {
          const checkmarkEl = document.createElement('span');
          checkmarkEl.className = 'ubits-checkbox__checkmark';
          square.appendChild(checkmarkEl);
        }
      } else {
        // Remover ambos si no está checked ni indeterminate
        if (checkmark) {
          checkmark.remove();
        }
        if (indeterminate) {
          indeterminate.remove();
        }
      }
      
      console.log('[Checkbox] Visual state updated. Square HTML:', square.innerHTML);
    };
    
    // Agregar listener de change
    inputElement.addEventListener('change', (e) => {
      console.log('[Checkbox] Input changed!', {
        checked: inputElement.checked,
        indeterminate: inputElement.indeterminate,
        event: e,
        target: e.target
      });
      
      updateVisualState();
      
      if (options.onChange) {
        options.onChange(e);
      }
    });
    
    // Actualizar estado visual inicial
    updateVisualState();
    
    // Agregar listener en el label también
    element.addEventListener('click', (e) => {
      console.log('[Checkbox] Label clicked!', {
        target: e.target,
        currentTarget: e.currentTarget,
        inputChecked: inputElement.checked
      });
    });
  } else {
    console.error('[Checkbox] Input element NOT found!');
  }

  const destroy = () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const update = (newOptions: Partial<CheckboxOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const newHTML = renderCheckbox(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLLabelElement;
    
    if (newElement && element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
      // Actualizar referencias
      const newInputElement = newElement.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      if (newInputElement) {
        // Aplicar estado indeterminado al input nativo si es necesario
        if (updatedOptions.indeterminate) {
          newInputElement.indeterminate = true;
        }
        if (updatedOptions.onChange) {
          newInputElement.addEventListener('change', updatedOptions.onChange);
        }
      }
    }
  };

  return {
    element,
    destroy,
    update
  };
}

