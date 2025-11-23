import type { SearchButtonOptions } from './types/SearchButtonOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderInput } from '../../input/src/InputProvider';

/**
 * Renderiza el icono de lupa
 */
function renderSearchIcon(): string {
  return `
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `;
}

/**
 * Renderiza el botón de limpiar (X)
 */
function renderClearButton(): string {
  return `
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `;
}

/**
 * Renderiza el HTML de un Search Button
 */
export function renderSearchButton(options: SearchButtonOptions): string {
  const {
    active = false,
    size = 'md',
    state = 'default',
    disabled = false,
    placeholder = '',
    value = '',
    width = 248,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';
  
  // Si state es 'active', el buscador está desplegado
  const isSearchActive = active || state === 'active';

  const iconHTML = renderSearchIcon();
  const showClearButton = value && value.trim().length > 0;
  const clearButtonHTML = showClearButton ? renderClearButton() : '';

  // Si está activo (desplegado), mostrar input
  if (isSearchActive) {
    // Construir clases para el wrapper del input
    const inputWrapperClasses = [
      'ubits-search-button',
      'ubits-search-button--active',
      `ubits-search-button--${size}`,
      isDisabled ? 'ubits-search-button--disabled' : '',
      className
    ].filter(Boolean).join(' ');

    // Si se especifica width, usarlo; si no, usar auto para que se ajuste al contenido
    const widthStyle = width ? `width: ${width}px;` : '';

    // Generar el input usando renderInput pero sin atributos para evitar wrapper extra
    // Luego agregamos el aria-label directamente al input
    const inputHTML = renderInput({
      type: 'text',
      size: size,
      placeholder: placeholder,
      value: value,
      showLabel: false,
      showHelper: false,
      leftIcon: 'magnifying-glass',
      className: 'ubits-search-button__input',
      state: isDisabled ? 'disabled' : 'default'
    });
    
    console.log('🔍 [SearchButton] inputHTML completo:', inputHTML);
    console.log('🔍 [SearchButton] inputHTML length:', inputHTML.length);
    
    // renderInput genera: <div style="position: relative; display: inline-block; width: 100%;">...</div>
    // Necesitamos extraer solo el contenido interno (input + iconos) sin el wrapper div
    let inputContent = inputHTML;
    console.log('🔍 [SearchButton] inputContent inicial:', inputContent);
    
    // Remover el wrapper div externo si existe (el que tiene position: relative)
    const wrapperMatch = inputHTML.match(/^<div[^>]*style="[^"]*position:\s*relative[^"]*"[^>]*>(.*?)<\/div>$/s);
    console.log('🔍 [SearchButton] wrapperMatch:', wrapperMatch);
    
    if (wrapperMatch && wrapperMatch[1]) {
      inputContent = wrapperMatch[1].trim();
      console.log('🔍 [SearchButton] inputContent después de extraer wrapper:', inputContent);
    } else {
      console.log('⚠️ [SearchButton] No se encontró wrapper, usando inputHTML completo');
    }
    
    // Agregar aria-label directamente al input dentro del contenido
    const beforeReplace = inputContent;
    inputContent = inputContent.replace(
      /(<input[^>]*class="[^"]*ubits-search-button__input[^"]*"[^>]*)(>)/,
      '$1 aria-label="Buscar"$2'
    );
    console.log('🔍 [SearchButton] inputContent antes de agregar aria-label:', beforeReplace);
    console.log('🔍 [SearchButton] inputContent después de agregar aria-label:', inputContent);
    
    return `
      <div class="${inputWrapperClasses}" style="${widthStyle}">
        <div class="ubits-search-button__input-wrapper">
          ${inputContent}
          ${clearButtonHTML}
        </div>
      </div>
    `.trim();
  }

  // Si no está activo, usar el botón UBITS estándar (secondary, icon-only)
  // Agregar clases para simular estados hover y pressed cuando se seleccionan desde el control
  // Nota: 'active' ahora controla el despliegue, no el estado pressed del botón
  const additionalClasses = [
    state === 'hover' ? 'ubits-search-button--force-hover' : '',
    className
  ].filter(Boolean).join(' ');

  return renderButton({
    variant: 'secondary',
    size: size,
    icon: 'magnifying-glass',
    iconOnly: true,
    disabled: isDisabled,
    className: additionalClasses,
    attributes: {
      'aria-label': 'Buscar'
    }
  });
}

/**
 * Crea un elemento Search Button programáticamente
 */
export function createSearchButton(options: SearchButtonOptions): {
  element: HTMLButtonElement | HTMLDivElement;
  destroy: () => void;
  update: (newOptions: Partial<SearchButtonOptions>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const searchHTML = renderSearchButton(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = searchHTML.trim();
  const element = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;

  if (!element) {
    throw new Error('Failed to create search button element');
  }

  container.appendChild(element);

  // Agregar event listeners
  const isSearchActive = options.active || options.state === 'active';
  
  if (isSearchActive) {
    const inputElement = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
    const clearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
    
    if (inputElement) {
      if (options.onChange) {
        inputElement.addEventListener('input', options.onChange);
        inputElement.addEventListener('change', options.onChange);
      }
      if (options.onFocus) {
        inputElement.addEventListener('focus', options.onFocus);
      }
      if (options.onBlur) {
        inputElement.addEventListener('blur', options.onBlur);
      }
    }
    
    // Botón de limpiar
    if (clearButton) {
      clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (inputElement) {
          inputElement.value = '';
          inputElement.focus();
          // Trigger onChange si existe
          if (options.onChange) {
            const event = new Event('input', { bubbles: true });
            inputElement.dispatchEvent(event);
          }
        }
      });
    }
  } else {
    const buttonElement = element as HTMLButtonElement;
    if (buttonElement && options.onClick) {
      buttonElement.addEventListener('click', options.onClick);
    }
  }

  const destroy = () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const update = (newOptions: Partial<SearchButtonOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const newHTML = renderSearchButton(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;
    
    if (newElement && element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
      
      // Actualizar referencias y event listeners
      const isSearchActive = updatedOptions.active || updatedOptions.state === 'active';
      
      if (isSearchActive) {
        const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = newElement.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        
        if (inputElement) {
          if (updatedOptions.onChange) {
            inputElement.addEventListener('input', updatedOptions.onChange);
            inputElement.addEventListener('change', updatedOptions.onChange);
          }
          if (updatedOptions.onFocus) {
            inputElement.addEventListener('focus', updatedOptions.onFocus);
          }
          if (updatedOptions.onBlur) {
            inputElement.addEventListener('blur', updatedOptions.onBlur);
          }
        }
        
        // Botón de limpiar
        if (clearButton) {
          clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (inputElement) {
              inputElement.value = '';
              inputElement.focus();
              // Trigger onChange si existe
              if (updatedOptions.onChange) {
                const event = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(event);
              }
            }
          });
        }
      } else {
        const buttonElement = newElement as HTMLButtonElement;
        if (buttonElement && updatedOptions.onClick) {
          buttonElement.addEventListener('click', updatedOptions.onClick);
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

