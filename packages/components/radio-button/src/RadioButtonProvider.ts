import type { RadioButtonOptions } from './types/RadioButtonOptions';

/**
 * Renderiza el HTML de un Radio Button
 */
export function renderRadioButton(options: RadioButtonOptions): string {
  const {
    label,
    complementaryText,
    value,
    name,
    checked = false,
    size = 'md',
    state = 'default',
    disabled = false,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-radio-button',
    `ubits-radio-button--${size}`,
    state !== 'default' ? `ubits-radio-button--${state}` : '',
    checked ? 'ubits-radio-button--checked' : '',
    isDisabled ? 'ubits-radio-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Radio input
  const radioInput = `
    <input
      type="radio"
      id="radio-${name}-${value}"
      name="${name}"
      value="${value}"
      ${checked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      class="ubits-radio-button__input"
    />
  `;

  // Radio circle (visual)
  const radioCircle = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${checked || (state === 'active' && !checked) ? '<span class="ubits-radio-button__dot"></span>' : ''}
    </span>
  `;

  // Label text
  const labelHTML = `
    <span class="ubits-radio-button__label">${label}</span>
  `;

  // Complementary text
  const complementaryTextHTML = complementaryText
    ? `<span class="ubits-radio-button__complementary-text">${complementaryText}</span>`
    : '';

  // Text content wrapper
  const textContentHTML = `
    <div class="ubits-radio-button__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;

  return `
    <label class="${classes}" data-ubits-id="🧩-ux-radio-button">
      ${radioInput}
      ${radioCircle}
      ${textContentHTML}
    </label>
  `.trim();
}

/**
 * Crea un elemento Radio Button programáticamente
 */
export function createRadioButton(options: RadioButtonOptions): {
  element: HTMLLabelElement;
  destroy: () => void;
  update: (newOptions: Partial<RadioButtonOptions>) => void;
} {
  const {
    containerId,
    onChange
  } = options;

  // Crear elemento
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderRadioButton(options);
  const radioButton = wrapper.firstElementChild as HTMLLabelElement;

  if (!radioButton) {
    throw new Error('No se pudo crear el radio button');
  }

  // Agregar data-ubits-id si no está presente
  if (!radioButton.hasAttribute('data-ubits-id')) {
    radioButton.setAttribute('data-ubits-id', '🧩-ux-radio-button');
  }

  // Event listener para cambio
  const inputElement = radioButton.querySelector('.ubits-radio-button__input') as HTMLInputElement;
  
  console.log('[RadioButton] createRadioButton:', {
    radioButton: !!radioButton,
    inputElement: !!inputElement,
    inputElementId: inputElement?.id,
    hasOnChange: !!onChange,
    containerId
  });
  
  // Variable para guardar el handler del grupo
  let groupChangeHandler: ((e: Event) => void) | null = null;
  
  // Función para actualizar el estado visual
  const updateVisualState = () => {
    if (!inputElement) return;
    
    const circle = radioButton.querySelector('.ubits-radio-button__circle');
    const dot = radioButton.querySelector('.ubits-radio-button__dot');
    
    console.log('[RadioButton] Updating visual state:', {
      checked: inputElement.checked,
      hasCircle: !!circle,
      hasDot: !!dot
    });
    
    if (inputElement.checked) {
      radioButton.classList.add('ubits-radio-button--checked');
      // Asegurar que el dot existe y está visible
      if (circle && !dot) {
        const newDot = document.createElement('span');
        newDot.className = 'ubits-radio-button__dot';
        circle.appendChild(newDot);
      }
    } else {
      radioButton.classList.remove('ubits-radio-button--checked');
      // Remover el dot si existe
      if (dot) {
        dot.remove();
      }
    }
  };
  
  if (inputElement) {
    // Agregar listener de cambio
    if (onChange) {
      inputElement.addEventListener('change', (e) => {
        console.log('[RadioButton] Input changed:', {
          checked: inputElement.checked,
          value: inputElement.value,
          name: inputElement.name
        });
        updateVisualState();
        onChange(e);
      });
    } else {
      // Si no hay onChange, aún necesitamos actualizar el estado visual
      inputElement.addEventListener('change', () => {
        updateVisualState();
      });
    }
    
    // Agregar listener de click para logs
    inputElement.addEventListener('click', (e) => {
      console.log('[RadioButton] Input clicked:', {
        checked: inputElement.checked,
        value: inputElement.value,
        name: inputElement.name
      });
    });
    
    // Actualizar estado visual inicial
    updateVisualState();
    
    // Escuchar cambios en otros radio buttons del mismo grupo
    groupChangeHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.type === 'radio' && target.name === inputElement.name && target !== inputElement) {
        console.log('[RadioButton] Another radio in group changed, updating visual state');
        updateVisualState();
      }
    };
    
    document.addEventListener('change', groupChangeHandler);
  }

  // Agregar al DOM
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }
  
  // Limpiar cualquier radio button existente en el contenedor antes de agregar uno nuevo
  const existingRadio = container.querySelector('.ubits-radio-button');
  if (existingRadio) {
    console.log('[RadioButton] Removing existing radio button from container');
    existingRadio.remove();
  }

  container.appendChild(radioButton);
  
  console.log('[RadioButton] Radio button appended to container:', {
    containerId: container.id || 'body',
    containerTagName: container.tagName,
    radioButtonInDOM: document.body.contains(radioButton)
  });

  // Métodos
  const destroy = () => {
    // Limpiar listener de grupo si existe
    if (groupChangeHandler) {
      document.removeEventListener('change', groupChangeHandler);
    }
    
    if (radioButton.parentElement) {
      radioButton.parentElement.removeChild(radioButton);
    }
  };

  const update = (newOptions: Partial<RadioButtonOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderRadioButton(updatedOptions);
    const newRadioButton = wrapper.firstElementChild as HTMLLabelElement;
    
    if (newRadioButton && radioButton.parentElement) {
      // Copiar event listener
      const newInputElement = newRadioButton.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (newInputElement && updatedOptions.onChange) {
        newInputElement.addEventListener('change', updatedOptions.onChange);
      }

      radioButton.parentElement.replaceChild(newRadioButton, radioButton);
      return newRadioButton;
    }
  };

  return {
    element: radioButton,
    destroy,
    update
  };
}

