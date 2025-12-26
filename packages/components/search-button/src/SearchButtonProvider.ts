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
  const buttonHTML = `
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
      style="display: flex !important; visibility: visible !important; opacity: 1 !important;"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
  `;
  
  console.log('[SearchButton] renderClearButton - Generated HTML:', {
    buttonHTML: buttonHTML,
    hasButtonTag: buttonHTML.includes('<button'),
    hasClearClass: buttonHTML.includes('ubits-search-button__clear'),
    hasIcon: buttonHTML.includes('fa-times')
  });
  
  return buttonHTML;
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
    className = '',
    showFilterButton = false,
    showCreateButton = false
  } = options;

  const isDisabled = disabled || state === 'disabled';
  
  // Si state es 'active', el buscador está desplegado
  const isSearchActive = active || state === 'active';

  const iconHTML = renderSearchIcon();
  // El botón de limpiar debe aparecer cuando hay texto, incluso si está vacío inicialmente
  // Se manejará dinámicamente en el componente cuando el usuario escriba
  const showClearButton = value && value.trim().length > 0;
  const clearButtonHTML = showClearButton ? renderClearButton() : '';
  
  console.log('[SearchButton] renderSearchButton - Clear button logic:', {
    value: value,
    valueLength: value ? value.length : 0,
    valueTrimmed: value ? value.trim() : '',
    showClearButton: showClearButton,
    clearButtonHTML: clearButtonHTML
  });

  // Renderizar botones adicionales (filtro y crear) - SIEMPRE cuando están habilitados
  let actionButtonsHTML = '';
  if (showFilterButton || showCreateButton) {
    const actionButtons: string[] = [];
    
    console.log('[SearchButton] renderSearchButton - Action buttons:', {
      showFilterButton: showFilterButton,
      showCreateButton: showCreateButton,
      isSearchActive: isSearchActive
    });
    
    if (showFilterButton) {
      const filterButtonHTML = renderButton({
        variant: 'secondary',
        size: size,
        icon: 'filter',
        iconOnly: true,
        disabled: isDisabled,
        className: 'ubits-search-button__action-button ubits-search-button__filter-button'
      });
      actionButtons.push(filterButtonHTML);
      console.log('[SearchButton] Filter button HTML generated:', filterButtonHTML.substring(0, 200));
    }
    
    if (showCreateButton) {
      const createButtonHTML = renderButton({
        variant: 'secondary',
        size: size,
        icon: 'plus',
        iconOnly: true,
        disabled: isDisabled,
        className: 'ubits-search-button__action-button ubits-search-button__create-button'
      });
      actionButtons.push(createButtonHTML);
      console.log('[SearchButton] Create button HTML generated:', createButtonHTML.substring(0, 200));
    }
    
    actionButtonsHTML = `
      <div class="ubits-search-button__actions">
        ${actionButtons.join('')}
      </div>
    `;
    
    console.log('[SearchButton] Action buttons HTML:', actionButtonsHTML);
  } else {
    console.log('[SearchButton] Action buttons NOT rendered:', {
      isSearchActive: isSearchActive,
      showFilterButton: showFilterButton,
      showCreateButton: showCreateButton
    });
  }

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

    // Crear el input directamente sin usar renderInput para evitar estilos inline conflictivos
    // El SearchButton tiene su propio diseño y no necesita el wrapper del Input component
    const inputSizeClass = size === 'sm' ? 'ubits-input--sm' : 'ubits-input--md';
    const inputDisabledAttr = isDisabled ? 'disabled' : '';
    
    console.log('[SearchButton] renderSearchButton - Creating input directly:', {
      type: 'text',
      size: size,
      placeholder: placeholder,
      value: value,
      className: `ubits-input ${inputSizeClass} ubits-search-button__input`,
      disabled: isDisabled
    });
    
    // Crear el input HTML directamente sin wrapper del componente Input
    const inputHTML = `
      <input
        type="text"
        class="ubits-input ${inputSizeClass} ubits-search-button__input"
        placeholder="${placeholder}"
        value="${value}"
        aria-label="Buscar"
        ${inputDisabledAttr}
      />
    `.trim();
    
    console.log('[SearchButton] renderSearchButton - Input HTML created:', {
      inputHTML: inputHTML,
      hasWrapper: false,
      isDirectInput: true
    });
    
    // Renderizar botones adicionales (filtro y crear) - SIEMPRE cuando están habilitados
    let actionButtonsHTML = '';
    if (showFilterButton || showCreateButton) {
      const actionButtons: string[] = [];
      
      console.log('[SearchButton] renderSearchButton - Action buttons:', {
        showFilterButton: showFilterButton,
        showCreateButton: showCreateButton,
        isSearchActive: isSearchActive
      });
      
      if (showFilterButton) {
        const filterButtonHTML = renderButton({
          variant: 'secondary',
          size: size,
          icon: 'filter',
          iconOnly: true,
          disabled: isDisabled,
          className: 'ubits-search-button__action-button ubits-search-button__filter-button'
        });
        actionButtons.push(filterButtonHTML);
        console.log('[SearchButton] Filter button HTML generated:', filterButtonHTML.substring(0, 200));
      }
      
      if (showCreateButton) {
        const createButtonHTML = renderButton({
          variant: 'secondary',
          size: size,
          icon: 'plus',
          iconOnly: true,
          disabled: isDisabled,
          className: 'ubits-search-button__action-button ubits-search-button__create-button'
        });
        actionButtons.push(createButtonHTML);
        console.log('[SearchButton] Create button HTML generated:', createButtonHTML.substring(0, 200));
      }
      
      actionButtonsHTML = `
        <div class="ubits-search-button__actions">
          ${actionButtons.join('')}
        </div>
      `;
      
      console.log('[SearchButton] Action buttons HTML:', actionButtonsHTML);
    } else {
      console.log('[SearchButton] Action buttons NOT rendered:', {
        isSearchActive: isSearchActive,
        showFilterButton: showFilterButton,
        showCreateButton: showCreateButton
      });
    }

    const finalHTML = `
      <div class="${inputWrapperClasses}" style="${widthStyle}">
        <div class="ubits-search-button__input-wrapper">
          ${inputHTML}
          ${clearButtonHTML}
        </div>
        ${actionButtonsHTML}
      </div>
    `.trim();
    
    console.log('[SearchButton] renderSearchButton - Final HTML:', {
      finalHTML: finalHTML.substring(0, 800),
      inputWrapperClasses: inputWrapperClasses,
      widthStyle: widthStyle,
      hasInputContent: inputHTML.includes('<input'),
      hasClearButton: !!clearButtonHTML,
      clearButtonHTML: clearButtonHTML,
      hasActionButtons: !!actionButtonsHTML,
      actionButtonsHTML: actionButtonsHTML.substring(0, 300)
    });
    
    return finalHTML;
  }

  // Si no está activo, usar el botón UBITS estándar (secondary, icon-only)
  // Agregar clases para simular estados hover y pressed cuando se seleccionan desde el control
  // Nota: 'active' ahora controla el despliegue, no el estado pressed del botón
  const additionalClasses = [
    state === 'hover' ? 'ubits-search-button--force-hover' : '',
    className
  ].filter(Boolean).join(' ');

  // Si hay botones de acción, crear un contenedor wrapper
  if (showFilterButton || showCreateButton) {
    const searchButtonHTML = renderButton({
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

    return `
      <div class="ubits-search-button" style="display: inline-flex; align-items: center; gap: var(--ubits-spacing-xs);" data-ubits-id="🧩-ux-search-button">
        ${searchButtonHTML}
        ${actionButtonsHTML}
      </div>
    `.trim();
  }

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
  // Guardar opciones originales para poder actualizarlas
  // Asegurar que showFilterButton y showCreateButton tengan valores por defecto (false por defecto - botones deshabilitados)
  let currentOptions: SearchButtonOptions = { 
    ...options,
    showFilterButton: options.showFilterButton !== undefined ? options.showFilterButton : false,
    showCreateButton: options.showCreateButton !== undefined ? options.showCreateButton : false
  };
  
  console.log('[SearchButton] createSearchButton - Initial options:', {
    showFilterButton: currentOptions.showFilterButton,
    showCreateButton: currentOptions.showCreateButton,
    active: currentOptions.active,
    state: currentOptions.state
  });
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
  
  console.log('[SearchButton] createSearchButton - container:', {
    containerId: options.containerId,
    containerElement: container,
    containerTagName: container.tagName,
    containerInDOM: document.body.contains(container)
  });

  const searchHTML = renderSearchButton(currentOptions);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = searchHTML.trim();
  let element = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;

  if (!element) {
    throw new Error('Failed to create search button element');
  }

  // Agregar data-ubits-id si no está presente
  // Puede ser un div (cuando está activo) o un button (cuando no está activo)
  if (!element.hasAttribute('data-ubits-id')) {
    element.setAttribute('data-ubits-id', '🧩-ux-search-button');
  }

  // Asegurar que el contenedor tenga display flex y position relative para alineación
  const containerStyles = window.getComputedStyle(container);
  if (containerStyles.display !== 'flex') {
    container.style.display = 'flex';
    container.style.justifyContent = 'flex-end';
    container.style.alignItems = 'center';
    console.log('[SearchButton] Container set to flex with flex-end');
  }
  
  // Asegurar que el contenedor tenga position relative para que position absolute funcione
  if (containerStyles.position === 'static' || !containerStyles.position) {
    container.style.position = 'relative';
    console.log('[SearchButton] Container set to position relative');
  }
  
  // Asegurar que el contenedor tenga ancho fijo para no afectar el layout de otros elementos
  if (!container.style.width && !container.style.minWidth) {
    container.style.width = 'auto';
    container.style.minWidth = '40px'; // Ancho mínimo para el botón (md)
    container.style.flexShrink = '0';
    container.style.flexGrow = '0';
    console.log('[SearchButton] Container set to fixed width to prevent layout shift');
  }
  
  // No aplicar margin-left ya que usamos position absolute
  // El posicionamiento se maneja con CSS (right: 0, top: 50%, transform: translateY(-50%))
  console.log('[SearchButton] Using position absolute for layout (no margin-left needed)');
  
  container.appendChild(element);

  // Definir update primero para poder usarlo en los event listeners
  const update = (newOptions: Partial<SearchButtonOptions>) => {
    // Preservar todas las opciones actuales, incluyendo showFilterButton y showCreateButton
    const updatedOptions = { 
      ...currentOptions, 
      ...newOptions,
      // Asegurar que showFilterButton y showCreateButton se preserven si no se especifican en newOptions
      showFilterButton: newOptions.showFilterButton !== undefined ? newOptions.showFilterButton : currentOptions.showFilterButton,
      showCreateButton: newOptions.showCreateButton !== undefined ? newOptions.showCreateButton : currentOptions.showCreateButton
    };
    const wasSearchActive = currentOptions.active || currentOptions.state === 'active';
    currentOptions = updatedOptions; // Actualizar opciones actuales
    const isSearchActive = updatedOptions.active || updatedOptions.state === 'active';
    
    console.log('[SearchButton] update - Options:', {
      newOptions: newOptions,
      currentOptionsBefore: {
        ...currentOptions,
        showFilterButton: currentOptions.showFilterButton,
        showCreateButton: currentOptions.showCreateButton
      },
      updatedOptions: {
        ...updatedOptions,
        showFilterButton: updatedOptions.showFilterButton,
        showCreateButton: updatedOptions.showCreateButton
      },
      showFilterButton: updatedOptions.showFilterButton,
      showCreateButton: updatedOptions.showCreateButton
    });
    
    // Si el input está activo y solo cambió el valor, actualizar directamente sin regenerar
    if (isSearchActive && wasSearchActive) {
      const currentInput = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
      const currentClearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
      
      // Si solo cambió el valor y el input existe, actualizar directamente
      if (currentInput && newOptions.value !== undefined && newOptions.value !== currentInput.value) {
        // Preservar posición del cursor
        const cursorPosition = currentInput.selectionStart || 0;
        currentInput.value = newOptions.value || '';
        // Restaurar posición del cursor
        currentInput.setSelectionRange(cursorPosition, cursorPosition);
        return; // No regenerar el HTML
      }
      
      // Si cambió el placeholder, actualizar directamente
      if (currentInput && newOptions.placeholder !== undefined) {
        currentInput.placeholder = newOptions.placeholder || '';
      }
      
      // Si cambió el estado disabled, actualizar directamente
      if (currentInput && newOptions.disabled !== undefined) {
        currentInput.disabled = newOptions.disabled || false;
      }
      
      // Si solo cambió el valor o propiedades simples, no regenerar
      const significantChanges = ['active', 'state', 'size', 'width', 'className'];
      const hasSignificantChange = significantChanges.some(key => 
        newOptions[key as keyof SearchButtonOptions] !== undefined && 
        newOptions[key as keyof SearchButtonOptions] !== currentOptions[key as keyof SearchButtonOptions]
      );
      
      if (!hasSignificantChange) {
        return; // No regenerar el HTML
      }
    }
    
    // Para otros cambios, regenerar el HTML completo
    console.log('[SearchButton] ========== REGENERATING HTML ==========');
    console.log('[SearchButton] 🔄 Regenerating HTML - Options:', {
      wasSearchActive: wasSearchActive,
      isSearchActive: isSearchActive,
      updatedOptions: {
        active: updatedOptions.active,
        state: updatedOptions.state,
        showFilterButton: updatedOptions.showFilterButton,
        showCreateButton: updatedOptions.showCreateButton,
        size: updatedOptions.size
      },
      significantChange: !wasSearchActive || isSearchActive !== wasSearchActive
    });
    
    // Capturar información del elemento actual antes de reemplazarlo
    const currentElementRect = element.getBoundingClientRect();
    const currentParentRect = element.parentElement?.getBoundingClientRect();
    const currentParentStyles = element.parentElement ? window.getComputedStyle(element.parentElement) : null;
    const currentSiblings = element.parentElement?.parentElement ? Array.from(element.parentElement.parentElement.children) : [];
    const currentSiblingPositions = currentSiblings.map((sibling, index) => {
      const rect = sibling.getBoundingClientRect();
      return {
        index,
        element: sibling,
        tagName: sibling.tagName,
        id: (sibling as HTMLElement).id || '',
        rect: {
          left: rect.left,
          right: rect.right,
          width: rect.width
        }
      };
    });
    
    console.log('[SearchButton] 📍 CURRENT STATE BEFORE REGENERATION:', {
      currentElementRect: {
        left: currentElementRect.left,
        right: currentElementRect.right,
        width: currentElementRect.width
      },
      currentParentRect: currentParentRect ? {
        left: currentParentRect.left,
        right: currentParentRect.right,
        width: currentParentRect.width
      } : null,
      currentParentStyles: currentParentStyles ? {
        width: currentParentStyles.width,
        minWidth: currentParentStyles.minWidth,
        position: currentParentStyles.position,
        display: currentParentStyles.display
      } : null,
      siblings: currentSiblingPositions
    });
    
    const newHTML = renderSearchButton(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;
    
    console.log('[SearchButton] update - New element created:', {
      newElement: newElement,
      newElementTagName: newElement?.tagName,
      newElementClasses: newElement?.className,
      newElementHTML: newElement ? newElement.outerHTML.substring(0, 500) : null,
      hasParent: !!element.parentNode
    });
    
    if (newElement && element.parentNode) {
      // Preservar foco y posición del cursor si el input existía
      let shouldRestoreFocus = false;
      let cursorPosition = 0;
      if (isSearchActive && wasSearchActive) {
        const oldInput = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
        if (oldInput && oldInput === document.activeElement) {
          shouldRestoreFocus = true;
          cursorPosition = oldInput.selectionStart || 0;
          console.log('[SearchButton] update - Preserving focus:', {
            cursorPosition: cursorPosition,
            oldInputValue: oldInput.value
          });
        }
      }
      
      // ========== ANÁLISIS DETALLADO DE POSICIONAMIENTO ==========
      console.log('[SearchButton] ========== POSITIONING ANALYSIS START ==========');
      
      // Capturar la posición del elemento original ANTES de reemplazarlo
      // IMPORTANTE: Esto debe hacerse ANTES del replaceChild
      const oldRect = element.getBoundingClientRect();
      const parentElement = element.parentElement;
      const parentRect = parentElement?.getBoundingClientRect();
      const parentStyles = parentElement ? window.getComputedStyle(parentElement) : null;
      const oldElementStyles = window.getComputedStyle(element);
      
      
      // Calcular posición relativa
      const relativeRight = parentRect ? parentRect.right - oldRect.right : 0;
      const relativeLeft = parentRect ? oldRect.left - parentRect.left : 0;
      const oldWidth = oldRect.width;
      const oldHeight = oldRect.height;
      
      console.log('[SearchButton] OLD ELEMENT (button) position:', {
        tagName: element.tagName,
        className: element.className,
        rect: {
          left: oldRect.left,
          right: oldRect.right,
          top: oldRect.top,
          bottom: oldRect.bottom,
          width: oldWidth,
          height: oldHeight
        },
        computedStyles: {
          display: oldElementStyles.display,
          position: oldElementStyles.position,
          marginLeft: oldElementStyles.marginLeft,
          marginRight: oldElementStyles.marginRight,
          marginTop: oldElementStyles.marginTop,
          marginBottom: oldElementStyles.marginBottom,
          left: oldElementStyles.left,
          right: oldElementStyles.right,
          width: oldElementStyles.width,
          height: oldElementStyles.height
        }
      });
      
      console.log('[SearchButton] PARENT CONTAINER before replace:', {
        element: parentElement,
        tagName: parentElement?.tagName,
        id: parentElement?.id,
        className: parentElement?.className,
        rect: parentRect ? {
          left: parentRect.left,
          right: parentRect.right,
          top: parentRect.top,
          bottom: parentRect.bottom,
          width: parentRect.width,
          height: parentRect.height
        } : null,
        computedStyles: parentStyles ? {
          display: parentStyles.display,
          position: parentStyles.position,
          justifyContent: parentStyles.justifyContent,
          alignItems: parentStyles.alignItems,
          flexDirection: parentStyles.flexDirection,
          width: parentStyles.width,
          height: parentStyles.height,
          padding: parentStyles.padding,
          margin: parentStyles.margin
        } : null,
        inlineStyles: parentElement ? {
          display: parentElement.style.display,
          justifyContent: parentElement.style.justifyContent,
          alignItems: parentElement.style.alignItems
        } : null
      });
      
      console.log('[SearchButton] Position calculations:', {
        relativeRight: relativeRight,
        relativeLeft: relativeLeft,
        oldElementRight: oldRect.right,
        parentRight: parentRect?.right,
        oldElementLeft: oldRect.left,
        parentLeft: parentRect?.left
      });
      
      console.log('[SearchButton] 🔄 REPLACING ELEMENT IN DOM');
      console.log('[SearchButton] Old element:', {
        tagName: element.tagName,
        className: element.className,
        rect: {
          left: currentElementRect.left,
          right: currentElementRect.right,
          width: currentElementRect.width
        }
      });
      
      element.parentNode.replaceChild(newElement, element);
      
      // Verificar posiciones después del reemplazo
      setTimeout(() => {
        const newElementRect = newElement.getBoundingClientRect();
        const newParentRect = newElement.parentElement?.getBoundingClientRect();
        const newParentStyles = newElement.parentElement ? window.getComputedStyle(newElement.parentElement) : null;
        const newSiblings = newElement.parentElement?.parentElement ? Array.from(newElement.parentElement.parentElement.children) : [];
        const newSiblingPositions = newSiblings.map((sibling, index) => {
          const rect = sibling.getBoundingClientRect();
          return {
            index,
            element: sibling,
            tagName: sibling.tagName,
            id: (sibling as HTMLElement).id || '',
            rect: {
              left: rect.left,
              right: rect.right,
              width: rect.width
            }
          };
        });
        
        const siblingPositionChanges = newSiblingPositions.map((newPos, index) => {
          const oldPos = currentSiblingPositions[index];
          if (!oldPos) return null;
          return {
            index,
            element: newPos.element,
            tagName: newPos.tagName,
            leftChange: newPos.rect.left - oldPos.rect.left,
            rightChange: newPos.rect.right - oldPos.rect.right,
            widthChange: newPos.rect.width - oldPos.rect.width,
            moved: Math.abs(newPos.rect.left - oldPos.rect.left) > 1 || Math.abs(newPos.rect.right - oldPos.rect.right) > 1
          };
        }).filter(Boolean);
        
        console.log('[SearchButton] 📍 STATE AFTER REPLACEMENT:', {
          newElementRect: {
            left: newElementRect.left,
            right: newElementRect.right,
            width: newElementRect.width
          },
          newParentRect: newParentRect ? {
            left: newParentRect.left,
            right: newParentRect.right,
            width: newParentRect.width
          } : null,
          newParentStyles: newParentStyles ? {
            width: newParentStyles.width,
            minWidth: newParentStyles.minWidth,
            position: newParentStyles.position,
            display: newParentStyles.display
          } : null,
          siblings: newSiblingPositions,
          siblingPositionChanges: siblingPositionChanges,
          anySiblingMoved: siblingPositionChanges.some((change: any) => change.moved),
          siblingDetails: siblingPositionChanges.map((change: any) => ({
            element: change.element,
            tagName: change.tagName,
            leftChange: change.leftChange,
            rightChange: change.rightChange,
            widthChange: change.widthChange,
            moved: change.moved
          }))
        });
        
        if (siblingPositionChanges.some((change: any) => change.moved)) {
          console.warn('[SearchButton] ⚠️ WARNING: Sibling elements moved after replacement!', {
            movedElements: siblingPositionChanges.filter((change: any) => change.moved).map((change: any) => ({
              element: change.element,
              tagName: change.tagName,
              leftChange: change.leftChange,
              rightChange: change.rightChange
            }))
          });
        }
      }, 10);
      
      // Después del reemplazo, verificar la posición del nuevo elemento
      requestAnimationFrame(() => {
        const newRect = newElement.getBoundingClientRect();
        const newParentRect = newElement.parentElement?.getBoundingClientRect();
        const newElementStyles = window.getComputedStyle(newElement);
        const newParentStyles = newElement.parentElement ? window.getComputedStyle(newElement.parentElement) : null;
        
        const newRelativeRight = newParentRect ? newParentRect.right - newRect.right : 0;
        const newRelativeLeft = newParentRect ? newRect.left - newParentRect.left : 0;
        
        console.log('[SearchButton] NEW ELEMENT (input container) position after replace:', {
          tagName: newElement.tagName,
          className: newElement.className,
          rect: {
            left: newRect.left,
            right: newRect.right,
            top: newRect.top,
            bottom: newRect.bottom,
            width: newRect.width,
            height: newRect.height
          },
          computedStyles: {
            display: newElementStyles.display,
            position: newElementStyles.position,
            marginLeft: newElementStyles.marginLeft,
            marginRight: newElementStyles.marginRight,
            marginTop: newElementStyles.marginTop,
            marginBottom: newElementStyles.marginBottom,
            left: newElementStyles.left,
            right: newElementStyles.right,
            width: newElementStyles.width,
            height: newElementStyles.height,
            transform: newElementStyles.transform,
            transformOrigin: newElementStyles.transformOrigin
          },
          inlineStyles: {
            marginLeft: (newElement as HTMLElement).style.marginLeft,
            width: (newElement as HTMLElement).style.width,
            opacity: (newElement as HTMLElement).style.opacity
          }
        });
        
        console.log('[SearchButton] NEW PARENT CONTAINER after replace:', {
          element: newElement.parentElement,
          tagName: newElement.parentElement?.tagName,
          id: newElement.parentElement?.id,
          className: newElement.parentElement?.className,
          rect: newParentRect ? {
            left: newParentRect.left,
            right: newParentRect.right,
            top: newParentRect.top,
            bottom: newParentRect.bottom,
            width: newParentRect.width,
            height: newParentRect.height
          } : null,
          computedStyles: newParentStyles ? {
            display: newParentStyles.display,
            position: newParentStyles.position,
            justifyContent: newParentStyles.justifyContent,
            alignItems: newParentStyles.alignItems,
            flexDirection: newParentStyles.flexDirection,
            width: newParentStyles.width,
            height: newParentStyles.height
          } : null,
          inlineStyles: newElement.parentElement ? {
            display: newElement.parentElement.style.display,
            justifyContent: newElement.parentElement.style.justifyContent,
            alignItems: newElement.parentElement.style.alignItems
          } : null
        });
        
        console.log('[SearchButton] Position comparison:', {
          oldRelativeRight: relativeRight,
          newRelativeRight: newRelativeRight,
          oldRelativeLeft: relativeLeft,
          newRelativeLeft: newRelativeLeft,
          positionMaintained: Math.abs(relativeRight - newRelativeRight) < 5, // Tolerancia de 5px
          oldElementRight: oldRect.right,
          newElementRight: newRect.right,
          rightDifference: oldRect.right - newRect.right
        });
        
        console.log('[SearchButton] ========== POSITIONING ANALYSIS END ==========');
      });
      
      // Si se está activando (de botón a input), mantener la posición a la derecha
      if (isSearchActive && !wasSearchActive && newElement instanceof HTMLDivElement) {
        // Asegurar que el contenedor padre tenga display flex
        const parent = newElement.parentElement;
        if (parent) {
          const currentParentStyles = window.getComputedStyle(parent);
          console.log('[SearchButton] Parent container check before setting flex:', {
            currentDisplay: currentParentStyles.display,
            currentJustifyContent: currentParentStyles.justifyContent,
            currentAlignItems: currentParentStyles.alignItems,
            needsFlex: currentParentStyles.display !== 'flex'
          });
          
          if (currentParentStyles.display !== 'flex') {
            parent.style.display = 'flex';
            parent.style.justifyContent = 'flex-end';
            parent.style.alignItems = 'center';
            console.log('[SearchButton] ✅ Parent container set to flex with flex-end');
          } else {
            // Ya es flex, pero verificar justify-content
            if (currentParentStyles.justifyContent !== 'flex-end') {
              parent.style.justifyContent = 'flex-end';
              console.log('[SearchButton] ✅ Parent container justify-content set to flex-end');
            }
          }
        }
        
        // Siempre usar position absolute (definido en CSS) para no afectar el layout de otros elementos
        // No aplicar margin-left ya que el posicionamiento se maneja con CSS
        newElement.style.marginLeft = '0';
        newElement.style.marginRight = '0';
        console.log('[SearchButton] Using position absolute for layout (no margin-left needed)');
      }
      
      // Actualizar la referencia del elemento
      element = newElement;
      
      // Si se está activando el search button (de botón a input), activar la animación
      if (isSearchActive && !wasSearchActive && element instanceof HTMLDivElement) {
        console.log('[SearchButton] ========== ACTIVATING SEARCH BUTTON - DETAILED LOGS ==========');
        
        // Capturar el ancho objetivo del elemento (definido inline o por defecto)
        const computedStyle = window.getComputedStyle(element);
        const targetWidth = element.style.width || computedStyle.width || '248px';
        const targetWidthValue = parseInt(targetWidth) || 248;
        
        // Capturar información del contenedor padre ANTES de hacer cambios
        const parentContainer = element.parentElement;
        const parentContainerRect = parentContainer?.getBoundingClientRect();
        const parentContainerStyles = parentContainer ? window.getComputedStyle(parentContainer) : null;
        const parentContainerComputedWidth = parentContainerStyles?.width || '0px';
        const parentContainerComputedMinWidth = parentContainerStyles?.minWidth || '0px';
        const parentContainerInlineWidth = parentContainer?.style.width || '';
        const parentContainerInlineMinWidth = parentContainer?.style.minWidth || '';
        
        console.log('[SearchButton] 📦 PARENT CONTAINER BEFORE ACTIVATION:', {
          parentElement: parentContainer,
          parentId: parentContainer?.id,
          parentClassName: parentContainer?.className,
          parentRect: parentContainerRect ? {
            left: parentContainerRect.left,
            right: parentContainerRect.right,
            width: parentContainerRect.width,
            height: parentContainerRect.height
          } : null,
          computedWidth: parentContainerComputedWidth,
          computedMinWidth: parentContainerComputedMinWidth,
          inlineWidth: parentContainerInlineWidth,
          inlineMinWidth: parentContainerInlineMinWidth,
          flexShrink: parentContainerStyles?.flexShrink,
          flexGrow: parentContainerStyles?.flexGrow,
          position: parentContainerStyles?.position,
          display: parentContainerStyles?.display
        });
        
        // Capturar información de los elementos hermanos (otros botones)
        const parentOfContainer = parentContainer?.parentElement;
        const siblings = parentOfContainer ? Array.from(parentOfContainer.children) : [];
        const siblingPositions = siblings.map((sibling, index) => {
          const rect = sibling.getBoundingClientRect();
          const styles = window.getComputedStyle(sibling);
          return {
            index,
            element: sibling,
            tagName: sibling.tagName,
            id: (sibling as HTMLElement).id || '',
            className: sibling.className || '',
            rect: {
              left: rect.left,
              right: rect.right,
              width: rect.width,
              height: rect.height
            },
            styles: {
              position: styles.position,
              marginLeft: styles.marginLeft,
              marginRight: styles.marginRight,
              flexShrink: styles.flexShrink,
              flexGrow: styles.flexGrow
            }
          };
        });
        
        console.log('[SearchButton] 👥 SIBLING ELEMENTS BEFORE ACTIVATION:', {
          parentOfContainer: parentOfContainer,
          siblingsCount: siblings.length,
          siblings: siblingPositions
        });
        
        // IMPORTANTE: Establecer el ancho objetivo ANTES de la animación
        // Esto mantiene el espacio del elemento y evita que colapse
        element.style.width = targetWidth;
        element.style.transformOrigin = 'right center';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-50%) scaleX(0)'; // translateY para centrado vertical, scaleX para animación
        element.classList.add('ubits-search-button--animating');
        
        // Asegurar que el contenedor padre mantenga un ancho FIJO para no afectar otros elementos
        // El SearchButton usa position: absolute, así que el contenedor debe tener un ancho fijo
        if (parentContainer && (parentContainer.id === 'searchbutton-container' || parentContainer.id?.includes('searchbutton'))) {
          // Guardar el ancho actual del contenedor antes de expandir
          const currentContainerWidth = parentContainer.style.width || window.getComputedStyle(parentContainer).width;
          const currentContainerMinWidth = parentContainer.style.minWidth || window.getComputedStyle(parentContainer).minWidth;
          if (!parentContainer.dataset.originalWidth) {
            parentContainer.dataset.originalWidth = currentContainerWidth;
            parentContainer.dataset.originalMinWidth = currentContainerMinWidth;
            console.log('[SearchButton] 💾 Saved original container dimensions:', {
              width: currentContainerWidth,
              minWidth: currentContainerMinWidth
            });
          }
          
          // Establecer un ancho FIJO para el contenedor (tamaño del botón) para que no se expanda
          const buttonSize = updatedOptions.size === 'sm' ? '32px' : '40px';
          // IMPORTANTE: Usar width fijo para que el contenedor no se expanda cuando el SearchButton crece
          parentContainer.style.width = buttonSize;
          parentContainer.style.minWidth = buttonSize;
          parentContainer.style.maxWidth = buttonSize;
          parentContainer.style.flexShrink = '0';
          parentContainer.style.flexGrow = '0';
          parentContainer.style.overflow = 'visible'; // Permitir que el SearchButton se expanda fuera
          
          const afterContainerStyles = window.getComputedStyle(parentContainer);
          const afterContainerRect = parentContainer.getBoundingClientRect();
          
          console.log('[SearchButton] 📦 PARENT CONTAINER AFTER SETTING FIXED WIDTH:', {
            width: buttonSize,
            minWidth: buttonSize,
            maxWidth: buttonSize,
            originalWidth: parentContainer.dataset.originalWidth,
            originalMinWidth: parentContainer.dataset.originalMinWidth,
            newComputedWidth: afterContainerStyles.width,
            newComputedMinWidth: afterContainerStyles.minWidth,
            newComputedMaxWidth: afterContainerStyles.maxWidth,
            newRect: {
              left: afterContainerRect.left,
              right: afterContainerRect.right,
              width: afterContainerRect.width,
              height: afterContainerRect.height
            }
          });
          
          // Verificar si los elementos hermanos se movieron
          setTimeout(() => {
            const newSiblingPositions = siblings.map((sibling, index) => {
              const rect = sibling.getBoundingClientRect();
              return {
                index,
                element: sibling,
                tagName: sibling.tagName,
                id: (sibling as HTMLElement).id || '',
                rect: {
                  left: rect.left,
                  right: rect.right,
                  width: rect.width,
                  height: rect.height
                }
              };
            });
            
            const positionChanges = newSiblingPositions.map((newPos, index) => {
              const oldPos = siblingPositions[index];
              if (!oldPos) return null;
              return {
                index,
                element: newPos.element,
                leftChange: newPos.rect.left - oldPos.rect.left,
                rightChange: newPos.rect.right - oldPos.rect.right,
                widthChange: newPos.rect.width - oldPos.rect.width,
                moved: Math.abs(newPos.rect.left - oldPos.rect.left) > 1 || Math.abs(newPos.rect.right - oldPos.rect.right) > 1
              };
            }).filter(Boolean);
            
            console.log('[SearchButton] 👥 SIBLING ELEMENTS POSITION CHANGES:', {
              changes: positionChanges,
              anyMoved: positionChanges.some((change: any) => change.moved),
              details: positionChanges.map((change: any) => ({
                element: change.element,
                tagName: change.tagName,
                leftChange: change.leftChange,
                rightChange: change.rightChange,
                widthChange: change.widthChange,
                moved: change.moved
              }))
            });
            
            if (positionChanges.some((change: any) => change.moved)) {
              console.warn('[SearchButton] ⚠️ WARNING: Sibling elements moved after setting container width!', {
                movedElements: positionChanges.filter((change: any) => change.moved).map((change: any) => ({
                  element: change.element,
                  tagName: change.tagName,
                  leftChange: change.leftChange,
                  rightChange: change.rightChange
                }))
              });
            }
          }, 50);
        }
        
        // Capturar posición antes de la animación
        const beforeAnimationRect = element.getBoundingClientRect();
        const beforeAnimationParentRect = element.parentElement?.getBoundingClientRect();
        
        console.log('[SearchButton] ========== ANIMATION SETUP ==========');
        console.log('[SearchButton] Animation setup:', {
          targetWidth: targetWidth,
          targetWidthValue: targetWidthValue,
          initialWidth: element.style.width,
          initialTransform: element.style.transform,
          transformOrigin: element.style.transformOrigin,
          initialOpacity: element.style.opacity,
          position: element.style.position,
          right: element.style.right,
          marginRight: element.style.marginRight,
          beforeAnimationRect: {
            left: beforeAnimationRect.left,
            right: beforeAnimationRect.right,
            width: beforeAnimationRect.width,
            height: beforeAnimationRect.height
          },
          beforeAnimationParentRect: beforeAnimationParentRect ? {
            left: beforeAnimationParentRect.left,
            right: beforeAnimationParentRect.right,
            width: beforeAnimationParentRect.width,
            height: beforeAnimationParentRect.height
          } : null
        });
        
        // Usar requestAnimationFrame para activar la transición CSS
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            console.log('[SearchButton] 🎬 STARTING ANIMATION');
            
            // Animar scaleX de 0 a 1 para expandir desde la derecha
            element.style.transform = 'translateY(-50%) scaleX(1)'; // Incluir translateY para mantener centrado verticalmente
            element.style.opacity = '1';
            element.classList.remove('ubits-search-button--animating');
            
            // Verificar posición después de la animación
            const afterAnimationRect = element.getBoundingClientRect();
            const afterAnimationParentRect = element.parentElement?.getBoundingClientRect();
            
            // Verificar posiciones de elementos hermanos después de la animación
            const parentOfContainer = element.parentElement?.parentElement;
            const siblingsAfter = parentOfContainer ? Array.from(parentOfContainer.children) : [];
            const siblingPositionsAfter = siblingsAfter.map((sibling, index) => {
              const rect = sibling.getBoundingClientRect();
              return {
                index,
                element: sibling,
                tagName: sibling.tagName,
                id: (sibling as HTMLElement).id || '',
                rect: {
                  left: rect.left,
                  right: rect.right,
                  width: rect.width,
                  height: rect.height
                }
              };
            });
            
            console.log('[SearchButton] 👥 SIBLING ELEMENTS AFTER ANIMATION START:', {
              siblingsCount: siblingsAfter.length,
              siblings: siblingPositionsAfter
            });
            
            console.log('[SearchButton] Animation activated:', {
              transform: element.style.transform,
              opacity: element.style.opacity,
              afterAnimationRect: {
                left: afterAnimationRect.left,
                right: afterAnimationRect.right,
                width: afterAnimationRect.width,
                height: afterAnimationRect.height
              },
              afterAnimationParentRect: afterAnimationParentRect ? {
                left: afterAnimationParentRect.left,
                right: afterAnimationParentRect.right,
                width: afterAnimationParentRect.width,
                height: afterAnimationParentRect.height
              } : null,
              rightEdgeMaintained: Math.abs(beforeAnimationRect.right - afterAnimationRect.right) < 5,
              rightEdgeDifference: afterAnimationRect.right - beforeAnimationRect.right
            });
            
            if (Math.abs(beforeAnimationRect.right - afterAnimationRect.right) > 5) {
              console.warn('[SearchButton] ⚠️ WARNING: Right edge moved during animation!', {
                beforeRight: beforeAnimationRect.right,
                afterRight: afterAnimationRect.right,
                difference: afterAnimationRect.right - beforeAnimationRect.right
              });
            } else {
              console.log('[SearchButton] ✅ Right edge maintained during animation');
            }
            
            console.log('[SearchButton] ========== END ANIMATION SETUP ==========');
          });
        });
      }
      
      console.log('[SearchButton] update - Element replaced, checking styles:', {
        newElement: element,
        computedStyles: element ? window.getComputedStyle(element) : null,
        inputElement: isSearchActive ? element.querySelector('.ubits-search-button__input') : null,
        inputWrapper: isSearchActive ? element.querySelector('.ubits-search-button__input-wrapper') : null
      });
      
      // Actualizar referencias y event listeners
      if (isSearchActive) {
        const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = newElement.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        const inputWrapper = newElement.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
        
        console.log('[SearchButton] update - Setting up active mode:', {
          inputElement: inputElement,
          inputElementTagName: inputElement?.tagName,
          inputElementClasses: inputElement?.className,
          inputElementValue: inputElement?.value,
          inputElementPlaceholder: inputElement?.placeholder,
          clearButton: clearButton,
          inputWrapper: inputWrapper,
          inputWrapperClasses: inputWrapper?.className
        });
        
        if (inputElement) {
          // Verificar estilos del input
          const inputStyles = window.getComputedStyle(inputElement);
          console.log('[SearchButton] update - Input computed styles:', {
            border: inputStyles.border,
            borderColor: inputStyles.borderColor,
            outline: inputStyles.outline,
            outlineColor: inputStyles.outlineColor,
            boxShadow: inputStyles.boxShadow,
            backgroundColor: inputStyles.backgroundColor,
            padding: inputStyles.padding,
            paddingLeft: inputStyles.paddingLeft,
            width: inputStyles.width,
            height: inputStyles.height,
            fontSize: inputStyles.fontSize,
            fontFamily: inputStyles.fontFamily
          });
          
          // Verificar estilos del wrapper
          if (inputWrapper) {
            const wrapperStyles = window.getComputedStyle(inputWrapper);
            console.log('[SearchButton] update - Input wrapper computed styles:', {
              border: wrapperStyles.border,
              borderColor: wrapperStyles.borderColor,
              outline: wrapperStyles.outline,
              boxShadow: wrapperStyles.boxShadow,
              backgroundColor: wrapperStyles.backgroundColor,
              padding: wrapperStyles.padding,
              paddingLeft: wrapperStyles.paddingLeft,
              width: wrapperStyles.width,
              height: wrapperStyles.height,
              display: wrapperStyles.display,
              position: wrapperStyles.position
            });
          }
          
          // Restaurar foco y posición del cursor
          if (shouldRestoreFocus) {
            inputElement.focus();
            inputElement.setSelectionRange(cursorPosition, cursorPosition);
            console.log('[SearchButton] update - Focus restored:', {
              cursorPosition: cursorPosition,
              isFocused: document.activeElement === inputElement
            });
          }
          
          // Agregar listener para mostrar/ocultar el botón de limpiar dinámicamente
          const updateClearButton = () => {
            const currentValue = inputElement.value;
            const clearButton = newElement.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
            const shouldShowClear = currentValue && currentValue.trim().length > 0;
            
            console.log('[SearchButton] updateClearButton:', {
              currentValue: currentValue,
              shouldShowClear: shouldShowClear,
              clearButtonExists: !!clearButton,
              clearButtonDisplay: clearButton ? window.getComputedStyle(clearButton).display : null,
              clearButtonVisibility: clearButton ? window.getComputedStyle(clearButton).visibility : null,
              inputWrapper: inputWrapper
            });
            
            if (shouldShowClear) {
              // Si no existe el botón de limpiar, crearlo
              if (!clearButton) {
                const clearButtonHTML = renderClearButton();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = clearButtonHTML.trim();
                const newClearButton = tempDiv.firstElementChild as HTMLButtonElement;
                if (newClearButton && inputWrapper) {
                  inputWrapper.appendChild(newClearButton);
                  
                  // Asegurar que el botón sea visible
                  newClearButton.style.display = 'flex';
                  newClearButton.style.visibility = 'visible';
                  newClearButton.style.opacity = '1';
                  
                  // Agregar event listener al nuevo botón
                  newClearButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    inputElement.value = '';
                    inputElement.focus();
                    updateClearButton(); // Actualizar para ocultar el botón
                    if (updatedOptions.onChange) {
                      const event = new Event('input', { bubbles: true });
                      inputElement.dispatchEvent(event);
                    }
                  });
                  
                  console.log('[SearchButton] Clear button created and added:', {
                    button: newClearButton,
                    buttonClasses: newClearButton.className,
                    buttonDisplay: window.getComputedStyle(newClearButton).display,
                    buttonVisibility: window.getComputedStyle(newClearButton).visibility,
                    buttonOpacity: window.getComputedStyle(newClearButton).opacity,
                    parentElement: newClearButton.parentElement,
                    parentClasses: newClearButton.parentElement?.className
                  });
                } else {
                  console.log('[SearchButton] ⚠️ Failed to create clear button:', {
                    newClearButton: newClearButton,
                    inputWrapper: inputWrapper
                  });
                }
              } else {
                // Mostrar el botón si ya existe
                clearButton.style.display = 'flex';
                clearButton.style.visibility = 'visible';
                clearButton.style.opacity = '1';
                console.log('[SearchButton] Clear button shown:', {
                  button: clearButton,
                  display: window.getComputedStyle(clearButton).display
                });
              }
            } else {
              // Ocultar el botón de limpiar si existe
              if (clearButton) {
                clearButton.style.display = 'none';
                console.log('[SearchButton] Clear button hidden');
              }
            }
          };
          
          // Agregar listener para actualizar el botón de limpiar cuando cambia el valor
          // Crear un handler combinado que llame a ambos callbacks
          const inputHandler = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const currentValue = target.value;
            
            // Logs detallados sobre los estilos del input cuando se escribe
            const inputStyles = window.getComputedStyle(inputElement);
            const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
            
            console.log('[SearchButton] ========== INPUT EVENT - WRITING ==========');
            console.log('[SearchButton] Input event details:', {
              value: currentValue,
              valueLength: currentValue.length,
              eventType: e.type,
              isFocused: document.activeElement === inputElement,
              inputElement: inputElement,
              inputElementClasses: inputElement.className,
              inputWrapper: inputWrapper,
              inputWrapperClasses: inputWrapper?.className
            });
            
            console.log('[SearchButton] Input computed styles while writing:', {
              border: inputStyles.border,
              borderWidth: inputStyles.borderWidth,
              borderStyle: inputStyles.borderStyle,
              borderColor: inputStyles.borderColor,
              outline: inputStyles.outline,
              outlineWidth: inputStyles.outlineWidth,
              outlineStyle: inputStyles.outlineStyle,
              outlineColor: inputStyles.outlineColor,
              boxShadow: inputStyles.boxShadow,
              backgroundColor: inputStyles.backgroundColor,
              background: inputStyles.background,
              padding: inputStyles.padding,
              paddingLeft: inputStyles.paddingLeft,
              paddingRight: inputStyles.paddingRight,
              paddingTop: inputStyles.paddingTop,
              paddingBottom: inputStyles.paddingBottom,
              width: inputStyles.width,
              height: inputStyles.height,
              fontSize: inputStyles.fontSize,
              fontFamily: inputStyles.fontFamily,
              color: inputStyles.color,
              lineHeight: inputStyles.lineHeight,
              display: inputStyles.display,
              position: inputStyles.position,
              zIndex: inputStyles.zIndex
            });
            
            // Verificar si el wrapper tiene focus-within
            const wrapperHasFocusWithin = inputWrapper ? inputWrapper.matches(':focus-within') : false;
            const inputIsFocused = document.activeElement === inputElement;
            
            // ========== ANÁLISIS PROFUNDO DE CSS ==========
            if (inputWrapper) {
              // Verificar qué selectores CSS están coincidiendo
              const testSelectors = [
                '.ubits-search-button__input-wrapper',
                '.ubits-search-button__input-wrapper:focus-within',
                '.ubits-search-button__input-wrapper:not(:focus-within)',
                '.ubits-search-button--active .ubits-search-button__input-wrapper',
                '.ubits-search-button--active:focus-within .ubits-search-button__input-wrapper',
                '.ubits-search-button--active:not(:focus-within) .ubits-search-button__input-wrapper'
              ];
              
              const matchingSelectors: string[] = [];
              testSelectors.forEach(selector => {
                try {
                  if (document.querySelector(selector) === inputWrapper || inputWrapper.matches(selector)) {
                    matchingSelectors.push(selector);
                  }
                } catch (e) {
                  // Algunos selectores pueden fallar, ignorar
                }
              });
              
              // Verificar todas las reglas CSS aplicadas usando getComputedStyle
              const allComputedStyles: any = {};
              if (wrapperStyles) {
                for (let i = 0; i < wrapperStyles.length; i++) {
                  const prop = wrapperStyles[i];
                  allComputedStyles[prop] = wrapperStyles.getPropertyValue(prop);
                }
              }
              
              // Verificar reglas CSS desde la hoja de estilos
              const stylesheets = Array.from(document.styleSheets);
              const appliedRules: Array<{selector: string, boxShadow: string, specificity: string}> = [];
              
              stylesheets.forEach((sheet, sheetIndex) => {
                try {
                  const rules = Array.from(sheet.cssRules || sheet.rules || []);
                  rules.forEach((rule: any) => {
                    if (rule.style && rule.selectorText) {
                      try {
                        if (inputWrapper.matches(rule.selectorText) || 
                            (rule.selectorText.includes('ubits-search-button__input-wrapper') && 
                             document.querySelector(rule.selectorText) === inputWrapper)) {
                          const boxShadow = rule.style.boxShadow || rule.style.getPropertyValue('box-shadow');
                          if (boxShadow && boxShadow !== 'none' && boxShadow !== '') {
                            appliedRules.push({
                              selector: rule.selectorText,
                              boxShadow: boxShadow,
                              specificity: rule.selectorText
                            });
                          }
                        }
                      } catch (e) {
                        // Ignorar errores de selectores complejos
                      }
                    }
                  });
                } catch (e) {
                  // Ignorar errores de acceso a hojas de estilo
                }
              });
              
              console.log('[SearchButton] ========== DEEP CSS ANALYSIS ==========');
              console.log('[SearchButton] Wrapper element:', {
                tagName: inputWrapper.tagName,
                className: inputWrapper.className,
                id: inputWrapper.id,
                hasFocusWithin: wrapperHasFocusWithin,
                inputIsFocused: inputIsFocused,
                activeElement: document.activeElement?.tagName + ' ' + document.activeElement?.className
              });
              
              console.log('[SearchButton] Matching CSS selectors:', matchingSelectors);
              
              // Expandir el array de reglas aplicadas para ver el contenido completo
              if (appliedRules.length > 0) {
                console.log('[SearchButton] Applied CSS rules with box-shadow (COUNT):', appliedRules.length);
                appliedRules.forEach((rule, index) => {
                  console.log(`[SearchButton] Rule ${index + 1}:`, {
                    selector: rule.selector,
                    boxShadow: rule.boxShadow,
                    specificity: rule.specificity
                  });
                });
              } else {
                console.log('[SearchButton] Applied CSS rules with box-shadow: NONE FOUND');
              }
              
              // Verificar también usando getComputedStyle directamente
              const directBoxShadow = wrapperStyles?.boxShadow || 'none';
              console.log('[SearchButton] Direct computed boxShadow:', directBoxShadow);
              
              // Verificar si hay estilos inline que puedan estar sobrescribiendo
              const inlineStyle = inputWrapper.getAttribute('style');
              console.log('[SearchButton] Wrapper inline style attribute:', inlineStyle || 'none');
              
              console.log('[SearchButton] All computed styles (relevant):', {
                boxShadow: wrapperStyles?.boxShadow,
                outline: wrapperStyles?.outline,
                border: wrapperStyles?.border,
                backgroundColor: wrapperStyles?.backgroundColor,
                display: wrapperStyles?.display,
                position: wrapperStyles?.position,
                zIndex: wrapperStyles?.zIndex
              });
              
              console.log('[SearchButton] ========== END DEEP CSS ANALYSIS ==========');
            }
            
            console.log('[SearchButton] Input wrapper computed styles while writing:', wrapperStyles ? {
              border: wrapperStyles.border,
              borderWidth: wrapperStyles.borderWidth,
              borderStyle: wrapperStyles.borderStyle,
              borderColor: wrapperStyles.borderColor,
              outline: wrapperStyles.outline,
              outlineWidth: wrapperStyles.outlineWidth,
              outlineStyle: wrapperStyles.outlineStyle,
              outlineColor: wrapperStyles.outlineColor,
              boxShadow: wrapperStyles.boxShadow,
              backgroundColor: wrapperStyles.backgroundColor,
              background: wrapperStyles.background,
              padding: wrapperStyles.padding,
              paddingLeft: wrapperStyles.paddingLeft,
              paddingRight: wrapperStyles.paddingRight,
              width: wrapperStyles.width,
              height: wrapperStyles.height,
              display: wrapperStyles.display,
              position: wrapperStyles.position,
              zIndex: wrapperStyles.zIndex,
              flexDirection: wrapperStyles.flexDirection,
              alignItems: wrapperStyles.alignItems,
              justifyContent: wrapperStyles.justifyContent,
              gap: wrapperStyles.gap,
              hasFocusWithin: wrapperHasFocusWithin,
              inputIsFocused: inputIsFocused,
              shouldHaveBoxShadow: wrapperHasFocusWithin && inputIsFocused,
              actualBoxShadow: wrapperStyles.boxShadow
            } : null);
            
            // Verificar si hay elementos hijos en el wrapper
            if (inputWrapper) {
              const wrapperChildren = Array.from(inputWrapper.children);
              console.log('[SearchButton] Input wrapper children:', {
                childrenCount: wrapperChildren.length,
                children: wrapperChildren.map(child => ({
                  tagName: child.tagName,
                  className: child.className,
                  nodeName: child.nodeName,
                  display: window.getComputedStyle(child as HTMLElement).display,
                  visibility: window.getComputedStyle(child as HTMLElement).visibility
                }))
              });
            }
            
            // Verificar estilos inline del input
            console.log('[SearchButton] Input inline styles:', {
              styleAttribute: inputElement.getAttribute('style'),
              hasStyleAttribute: inputElement.hasAttribute('style')
            });
            
            // Verificar estilos inline del wrapper
            if (inputWrapper) {
              console.log('[SearchButton] Input wrapper inline styles:', {
                styleAttribute: inputWrapper.getAttribute('style'),
                hasStyleAttribute: inputWrapper.hasAttribute('style')
              });
            }
            
            // ========== REVISAR ESTRUCTURA COMPLETA DEL DOM ==========
            console.log('[SearchButton] ========== DOM STRUCTURE ANALYSIS ==========');
            
            // Revisar todos los elementos padre del input
            let currentElement: HTMLElement | null = inputElement;
            const parentChain: Array<{element: HTMLElement, tagName: string, className: string, id: string, styles: any}> = [];
            
            while (currentElement && currentElement !== document.body) {
              const styles = window.getComputedStyle(currentElement);
              parentChain.push({
                element: currentElement,
                tagName: currentElement.tagName,
                className: currentElement.className,
                id: currentElement.id || '',
                styles: {
                  border: styles.border,
                  borderWidth: styles.borderWidth,
                  borderStyle: styles.borderStyle,
                  borderColor: styles.borderColor,
                  outline: styles.outline,
                  outlineWidth: styles.outlineWidth,
                  outlineStyle: styles.outlineStyle,
                  outlineColor: styles.outlineColor,
                  boxShadow: styles.boxShadow,
                  backgroundColor: styles.backgroundColor,
                  background: styles.background,
                  padding: styles.padding,
                  margin: styles.margin,
                  width: styles.width,
                  height: styles.height,
                  display: styles.display,
                  position: styles.position,
                  zIndex: styles.zIndex
                }
              });
              currentElement = currentElement.parentElement;
            }
            
            // Expandir cada elemento de la cadena padre para ver detalles completos
            console.log('[SearchButton] ========== PARENT CHAIN DETAILS ==========');
            parentChain.forEach((item, index) => {
              const styles = item.styles;
              console.log(`[SearchButton] Parent ${index + 1} - ${item.tagName}:`, {
                tagName: item.tagName,
                className: item.className,
                id: item.id,
                hasBoxShadow: styles.boxShadow !== 'none',
                boxShadow: styles.boxShadow,
                hasBorder: styles.borderWidth !== '0px',
                border: styles.border,
                borderWidth: styles.borderWidth,
                borderColor: styles.borderColor,
                hasOutline: styles.outlineWidth !== '0px',
                outline: styles.outline,
                outlineWidth: styles.outlineWidth,
                outlineColor: styles.outlineColor,
                backgroundColor: styles.backgroundColor,
                padding: styles.padding,
                margin: styles.margin,
                width: styles.width,
                height: styles.height,
                display: styles.display,
                position: styles.position,
                zIndex: styles.zIndex
              });
            });
            console.log('[SearchButton] ========== END PARENT CHAIN DETAILS ==========');
            
            // Revisar el elemento SearchButton principal
            const searchButtonElement = inputElement.closest('.ubits-search-button');
            if (searchButtonElement) {
              const searchButtonStyles = window.getComputedStyle(searchButtonElement as HTMLElement);
              console.log('[SearchButton] SearchButton element styles:', {
                element: searchButtonElement,
                tagName: searchButtonElement.tagName,
                className: searchButtonElement.className,
                id: searchButtonElement.id || '',
                styles: {
                  border: searchButtonStyles.border,
                  borderWidth: searchButtonStyles.borderWidth,
                  borderStyle: searchButtonStyles.borderStyle,
                  borderColor: searchButtonStyles.borderColor,
                  outline: searchButtonStyles.outline,
                  outlineWidth: searchButtonStyles.outlineWidth,
                  outlineStyle: searchButtonStyles.outlineStyle,
                  outlineColor: searchButtonStyles.outlineColor,
                  boxShadow: searchButtonStyles.boxShadow,
                  backgroundColor: searchButtonStyles.backgroundColor,
                  background: searchButtonStyles.background,
                  padding: searchButtonStyles.padding,
                  margin: searchButtonStyles.margin,
                  width: searchButtonStyles.width,
                  height: searchButtonStyles.height,
                  display: searchButtonStyles.display,
                  position: searchButtonStyles.position,
                  zIndex: searchButtonStyles.zIndex
                }
              });
            }
            
            // Revisar si hay algún wrapper adicional del componente Input
            const inputWrapperFromInput = inputElement.closest('.ubits-input-wrapper');
            if (inputWrapperFromInput && inputWrapperFromInput !== inputWrapper) {
              const inputWrapperStyles = window.getComputedStyle(inputWrapperFromInput as HTMLElement);
              console.log('[SearchButton] ⚠️ Found additional Input wrapper:', {
                element: inputWrapperFromInput,
                tagName: inputWrapperFromInput.tagName,
                className: inputWrapperFromInput.className,
                styles: {
                  border: inputWrapperStyles.border,
                  outline: inputWrapperStyles.outline,
                  boxShadow: inputWrapperStyles.boxShadow,
                  backgroundColor: inputWrapperStyles.backgroundColor,
                  padding: inputWrapperStyles.padding,
                  margin: inputWrapperStyles.margin,
                  width: inputWrapperStyles.width,
                  height: inputWrapperStyles.height,
                  display: inputWrapperStyles.display,
                  position: inputWrapperStyles.position
                }
              });
            }
            
            // Revisar todos los elementos con clase ubits-input en el árbol
            const allInputElements = newElement.querySelectorAll('.ubits-input');
            console.log('[SearchButton] All elements with .ubits-input class:', {
              count: allInputElements.length,
              elements: Array.from(allInputElements).map(el => {
                const styles = window.getComputedStyle(el as HTMLElement);
                return {
                  element: el,
                  tagName: el.tagName,
                  className: el.className,
                  id: el.id || '',
                  parentElement: el.parentElement?.tagName,
                  parentClassName: el.parentElement?.className,
                  parentId: el.parentElement?.id || '',
                  styles: {
                    border: styles.border,
                    borderWidth: styles.borderWidth,
                    borderStyle: styles.borderStyle,
                    borderColor: styles.borderColor,
                    outline: styles.outline,
                    outlineWidth: styles.outlineWidth,
                    outlineStyle: styles.outlineStyle,
                    outlineColor: styles.outlineColor,
                    boxShadow: styles.boxShadow,
                    backgroundColor: styles.backgroundColor,
                    background: styles.background,
                    padding: styles.padding,
                    margin: styles.margin,
                    width: styles.width,
                    height: styles.height,
                    display: styles.display,
                    position: styles.position,
                    zIndex: styles.zIndex
                  }
                };
              })
            });
            
            // Revisar todos los divs en el árbol que puedan tener estilos
            const allDivs = newElement.querySelectorAll('div');
            const divsWithStyles = Array.from(allDivs).map(div => {
              const styles = window.getComputedStyle(div);
              return {
                element: div,
                tagName: div.tagName,
                className: div.className,
                id: div.id || '',
                parentElement: div.parentElement?.tagName,
                parentClassName: div.parentElement?.className,
                parentId: div.parentElement?.id || '',
                hasBoxShadow: styles.boxShadow !== 'none' && styles.boxShadow !== 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                boxShadow: styles.boxShadow,
                hasBorder: styles.borderWidth !== '0px',
                border: styles.border,
                borderWidth: styles.borderWidth,
                borderColor: styles.borderColor,
                hasOutline: styles.outlineWidth !== '0px' && styles.outline !== 'rgb(0, 0, 0) none 0px',
                outline: styles.outline,
                outlineWidth: styles.outlineWidth,
                outlineColor: styles.outlineColor,
                backgroundColor: styles.backgroundColor,
                padding: styles.padding,
                margin: styles.margin,
                width: styles.width,
                height: styles.height,
                display: styles.display,
                position: styles.position,
                zIndex: styles.zIndex
              };
            });
            
            console.log('[SearchButton] All div elements in tree:', {
              totalCount: allDivs.length,
              divsWithStyles: divsWithStyles.filter(div => div.hasBoxShadow || div.hasBorder || div.hasOutline),
              allDivs: divsWithStyles
            });
            
            // Verificar si hay pseudo-elementos que puedan estar causando efectos visuales
            if (inputWrapper) {
              const wrapperBefore = window.getComputedStyle(inputWrapper, '::before');
              const wrapperAfter = window.getComputedStyle(inputWrapper, '::after');
              const searchButtonElement = inputElement.closest('.ubits-search-button--active') as HTMLElement;
              const searchButtonBefore = searchButtonElement ? window.getComputedStyle(searchButtonElement, '::before') : null;
              const searchButtonAfter = searchButtonElement ? window.getComputedStyle(searchButtonElement, '::after') : null;
              
              console.log('[SearchButton] Pseudo-elements check:', {
                wrapperBefore: {
                  content: wrapperBefore.content,
                  display: wrapperBefore.display,
                  boxShadow: wrapperBefore.boxShadow,
                  outline: wrapperBefore.outline
                },
                wrapperAfter: {
                  content: wrapperAfter.content,
                  display: wrapperAfter.display,
                  boxShadow: wrapperAfter.boxShadow,
                  outline: wrapperAfter.outline
                },
                searchButtonBefore: searchButtonBefore ? {
                  content: searchButtonBefore.content,
                  display: searchButtonBefore.display,
                  boxShadow: searchButtonBefore.boxShadow,
                  outline: searchButtonBefore.outline
                } : null,
                searchButtonAfter: searchButtonAfter ? {
                  content: searchButtonAfter.content,
                  display: searchButtonAfter.display,
                  boxShadow: searchButtonAfter.boxShadow,
                  outline: searchButtonAfter.outline
                } : null
              });
            }
            
            // ========== VERIFICACIÓN FINAL DEL ESTADO DEL WRAPPER ==========
            if (inputWrapper) {
              const finalWrapperStyles = window.getComputedStyle(inputWrapper);
              const finalHasFocusWithin = inputWrapper.matches(':focus-within');
              const finalInputIsFocused = document.activeElement === inputElement;
              
              console.log('[SearchButton] ========== FINAL WRAPPER STATE CHECK ==========');
              console.log('[SearchButton] Final wrapper state:', {
                hasFocusWithin: finalHasFocusWithin,
                inputIsFocused: finalInputIsFocused,
                activeElement: document.activeElement?.tagName + ' ' + document.activeElement?.className,
                boxShadow: finalWrapperStyles.boxShadow,
                outline: finalWrapperStyles.outline,
                border: finalWrapperStyles.border,
                shouldHaveBoxShadow: finalHasFocusWithin && finalInputIsFocused,
                actualBoxShadow: finalWrapperStyles.boxShadow,
                boxShadowMatchesExpected: (finalHasFocusWithin && finalInputIsFocused) ? 
                  (finalWrapperStyles.boxShadow !== 'none') : 
                  (finalWrapperStyles.boxShadow === 'none')
              });
              
              // Si el boxShadow no coincide con lo esperado, mostrar advertencia
              if (finalHasFocusWithin && finalInputIsFocused && finalWrapperStyles.boxShadow === 'none') {
                console.warn('[SearchButton] ⚠️ PROBLEMA: El wrapper tiene focus-within pero NO tiene box-shadow');
              }
              if (!finalHasFocusWithin && !finalInputIsFocused && finalWrapperStyles.boxShadow !== 'none') {
                console.warn('[SearchButton] ⚠️ PROBLEMA: El wrapper NO tiene focus-within pero SÍ tiene box-shadow:', finalWrapperStyles.boxShadow);
              }
              
              console.log('[SearchButton] ========== END FINAL WRAPPER STATE CHECK ==========');
            }
            
            console.log('[SearchButton] ========== END DOM STRUCTURE ANALYSIS ==========');
            
            console.log('[SearchButton] ========== END INPUT EVENT ==========');
            
            updateClearButton();
            if (updatedOptions.onChange) {
              updatedOptions.onChange(e as any);
            }
          };
          
          inputElement.addEventListener('input', inputHandler);
          inputElement.addEventListener('change', inputHandler);
          
          // También agregar listeners para focus y blur para ver cambios de estilo
          inputElement.addEventListener('focus', (e) => {
            const inputStyles = window.getComputedStyle(inputElement);
            const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
            const searchButtonElement = inputElement.closest('.ubits-search-button--active') as HTMLElement;
            const searchButtonStyles = searchButtonElement ? window.getComputedStyle(searchButtonElement) : null;
            
            console.log('[SearchButton] ========== INPUT FOCUS EVENT ==========');
            console.log('[SearchButton] Input styles on focus:', {
              border: inputStyles.border,
              outline: inputStyles.outline,
              boxShadow: inputStyles.boxShadow,
              backgroundColor: inputStyles.backgroundColor,
              isFocused: document.activeElement === inputElement
            });
            console.log('[SearchButton] Wrapper styles on focus:', wrapperStyles ? {
              border: wrapperStyles.border,
              outline: wrapperStyles.outline,
              boxShadow: wrapperStyles.boxShadow,
              backgroundColor: wrapperStyles.backgroundColor,
              hasFocusWithin: inputWrapper?.matches(':focus-within'),
              wrapperClasses: inputWrapper?.className
            } : null);
            console.log('[SearchButton] SearchButton element styles on focus:', searchButtonStyles ? {
              border: searchButtonStyles.border,
              outline: searchButtonStyles.outline,
              boxShadow: searchButtonStyles.boxShadow,
              backgroundColor: searchButtonStyles.backgroundColor,
              searchButtonClasses: searchButtonElement?.className
            } : null);
            console.log('[SearchButton] ========== END FOCUS EVENT ==========');
          });
          
          inputElement.addEventListener('blur', (e) => {
            const inputStyles = window.getComputedStyle(inputElement);
            const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
            const searchButtonElement = inputElement.closest('.ubits-search-button--active') as HTMLElement;
            const searchButtonStyles = searchButtonElement ? window.getComputedStyle(searchButtonElement) : null;
            
            console.log('[SearchButton] ========== INPUT BLUR EVENT ==========');
            console.log('[SearchButton] Input styles on blur:', {
              border: inputStyles.border,
              outline: inputStyles.outline,
              boxShadow: inputStyles.boxShadow,
              backgroundColor: inputStyles.backgroundColor,
              isFocused: document.activeElement === inputElement,
              activeElement: document.activeElement?.tagName + ' ' + document.activeElement?.className
            });
            
            // ========== ANÁLISIS PROFUNDO DE CSS EN BLUR ==========
            if (inputWrapper) {
              const wrapperHasFocusWithin = inputWrapper.matches(':focus-within');
              const inputIsFocused = document.activeElement === inputElement;
              
              // Verificar qué selectores CSS están coincidiendo
              const testSelectors = [
                '.ubits-search-button__input-wrapper',
                '.ubits-search-button__input-wrapper:focus-within',
                '.ubits-search-button__input-wrapper:not(:focus-within)',
                '.ubits-search-button--active .ubits-search-button__input-wrapper',
                '.ubits-search-button--active:focus-within .ubits-search-button__input-wrapper',
                '.ubits-search-button--active:not(:focus-within) .ubits-search-button__input-wrapper'
              ];
              
              const matchingSelectors: string[] = [];
              testSelectors.forEach(selector => {
                try {
                  if (document.querySelector(selector) === inputWrapper || inputWrapper.matches(selector)) {
                    matchingSelectors.push(selector);
                  }
                } catch (e) {
                  // Algunos selectores pueden fallar, ignorar
                }
              });
              
              // Verificar reglas CSS desde la hoja de estilos
              const stylesheets = Array.from(document.styleSheets);
              const appliedRules: Array<{selector: string, boxShadow: string}> = [];
              
              stylesheets.forEach((sheet, sheetIndex) => {
                try {
                  const rules = Array.from(sheet.cssRules || sheet.rules || []);
                  rules.forEach((rule: any) => {
                    if (rule.style && rule.selectorText) {
                      try {
                        if (inputWrapper.matches(rule.selectorText) || 
                            (rule.selectorText.includes('ubits-search-button__input-wrapper') && 
                             document.querySelector(rule.selectorText) === inputWrapper)) {
                          const boxShadow = rule.style.boxShadow || rule.style.getPropertyValue('box-shadow');
                          if (boxShadow && boxShadow !== 'none' && boxShadow !== '') {
                            appliedRules.push({
                              selector: rule.selectorText,
                              boxShadow: boxShadow
                            });
                          }
                        }
                      } catch (e) {
                        // Ignorar errores de selectores complejos
                      }
                    }
                  });
                } catch (e) {
                  // Ignorar errores de acceso a hojas de estilo
                }
              });
              
              console.log('[SearchButton] ========== DEEP CSS ANALYSIS ON BLUR ==========');
              console.log('[SearchButton] Wrapper element on blur:', {
                tagName: inputWrapper.tagName,
                className: inputWrapper.className,
                id: inputWrapper.id,
                hasFocusWithin: wrapperHasFocusWithin,
                inputIsFocused: inputIsFocused,
                activeElement: document.activeElement?.tagName + ' ' + document.activeElement?.className
              });
              
              console.log('[SearchButton] Matching CSS selectors on blur:', matchingSelectors);
              
              // Expandir el array de reglas aplicadas para ver el contenido completo
              if (appliedRules.length > 0) {
                console.log('[SearchButton] Applied CSS rules with box-shadow on blur (COUNT):', appliedRules.length);
                appliedRules.forEach((rule, index) => {
                  console.log(`[SearchButton] Blur Rule ${index + 1}:`, {
                    selector: rule.selector,
                    boxShadow: rule.boxShadow
                  });
                });
              } else {
                console.log('[SearchButton] Applied CSS rules with box-shadow on blur: NONE FOUND');
              }
              
              // Verificar también usando getComputedStyle directamente
              const directBoxShadow = wrapperStyles?.boxShadow || 'none';
              console.log('[SearchButton] Direct computed boxShadow on blur:', directBoxShadow);
              
              // Verificar si hay estilos inline que puedan estar sobrescribiendo
              const inlineStyle = inputWrapper.getAttribute('style');
              console.log('[SearchButton] Wrapper inline style attribute on blur:', inlineStyle || 'none');
              
              // Verificar si el boxShadow debería estar presente o no
              const shouldHaveBoxShadow = wrapperHasFocusWithin && inputIsFocused;
              const actuallyHasBoxShadow = directBoxShadow !== 'none' && directBoxShadow !== '';
              console.log('[SearchButton] BoxShadow state check on blur:', {
                shouldHaveBoxShadow: shouldHaveBoxShadow,
                actuallyHasBoxShadow: actuallyHasBoxShadow,
                isCorrect: shouldHaveBoxShadow === actuallyHasBoxShadow,
                boxShadowValue: directBoxShadow
              });
              
              if (shouldHaveBoxShadow !== actuallyHasBoxShadow) {
                console.warn('[SearchButton] ⚠️ PROBLEMA EN BLUR: El boxShadow no coincide con el estado esperado!', {
                  expected: shouldHaveBoxShadow ? 'should have box-shadow' : 'should NOT have box-shadow',
                  actual: actuallyHasBoxShadow ? 'HAS box-shadow' : 'NO box-shadow',
                  boxShadowValue: directBoxShadow
                });
              }
              
              console.log('[SearchButton] Wrapper computed styles on blur:', wrapperStyles ? {
                boxShadow: wrapperStyles.boxShadow,
                outline: wrapperStyles.outline,
                border: wrapperStyles.border,
                backgroundColor: wrapperStyles.backgroundColor
              } : null);
              
              console.log('[SearchButton] ========== END DEEP CSS ANALYSIS ON BLUR ==========');
            }
            
            console.log('[SearchButton] Wrapper styles on blur:', wrapperStyles ? {
              border: wrapperStyles.border,
              outline: wrapperStyles.outline,
              boxShadow: wrapperStyles.boxShadow,
              backgroundColor: wrapperStyles.backgroundColor,
              hasFocusWithin: inputWrapper?.matches(':focus-within')
            } : null);
            console.log('[SearchButton] SearchButton element styles on blur:', searchButtonStyles ? {
              border: searchButtonStyles.border,
              outline: searchButtonStyles.outline,
              boxShadow: searchButtonStyles.boxShadow,
              backgroundColor: searchButtonStyles.backgroundColor
            } : null);
            console.log('[SearchButton] ========== END BLUR EVENT ==========');
          });
          
          // Actualizar el botón de limpiar inicialmente
          updateClearButton();
          if (updatedOptions.onFocus) {
            inputElement.addEventListener('focus', updatedOptions.onFocus);
          }
          if (updatedOptions.onBlur) {
            inputElement.addEventListener('blur', updatedOptions.onBlur);
          }
          
          // Agregar listener para cerrar el SearchButton cuando se hace click fuera
          // SOLO si el botón está activo (modo input)
          if (isSearchActive) {
            const handleClickOutside = (e: MouseEvent) => {
              const target = e.target as HTMLElement;
              
              // Verificar que el botón todavía esté activo (puede haber cambiado desde que se agregó el listener)
              const currentActiveState = currentOptions.active || currentOptions.state === 'active';
              if (!currentActiveState) {
                // Si el botón ya no está activo, no hacer nada
                return;
              }
              
              // Verificar si el click fue fuera del SearchButton y sus botones de acción
              const isClickInside = newElement.contains(target) || 
                                   (target.closest && target.closest('.ubits-search-button'));
              
              if (!isClickInside && currentActiveState) {
                // Verificar si el input tiene contenido antes de cerrar
                // Buscar el input en el DOM actual (puede haber cambiado desde que se agregó el listener)
                const searchButtonElement = document.querySelector('.ubits-search-button--active');
                const currentInputElement = searchButtonElement?.querySelector('.ubits-search-button__input') as HTMLInputElement;
                const inputValue = currentInputElement?.value?.trim() || '';
                
                console.log('[SearchButton] Click outside check:', {
                  hasInputElement: !!currentInputElement,
                  inputValue: inputValue,
                  inputValueLength: inputValue.length,
                  shouldClose: inputValue.length === 0
                });
                
                if (inputValue.length > 0) {
                  console.log('[SearchButton] Click outside detected in update but input has value, not closing');
                  return;
                }
                
                console.log('[SearchButton] Click outside detected in update, closing search button');
                e.preventDefault();
                e.stopPropagation();
                
                // Desactivar el SearchButton (volver a modo botón) - preservar showFilterButton y showCreateButton
                update({
                  active: false,
                  state: 'default',
                  showFilterButton: updatedOptions.showFilterButton,
                  showCreateButton: updatedOptions.showCreateButton
                });
              }
            };
            
            // Remover listener anterior si existe
            const oldClickOutsideHandler = (element as any)._clickOutsideHandler;
            if (oldClickOutsideHandler) {
              document.removeEventListener('click', oldClickOutsideHandler, true);
              console.log('[SearchButton] Old click outside listener removed in update');
            }
            
            // Agregar el listener al documento con un pequeño delay para evitar que se cierre inmediatamente
            setTimeout(() => {
              // Verificar nuevamente que el botón todavía esté activo antes de agregar el listener
              const stillActive = currentOptions.active || currentOptions.state === 'active';
              if (stillActive && document.body.contains(newElement)) {
                document.addEventListener('click', handleClickOutside, true);
                console.log('[SearchButton] Click outside listener added in update (delayed)');
                (newElement as any)._clickOutsideHandler = handleClickOutside;
              } else {
                console.log('[SearchButton] Click outside listener not added - button no longer active');
              }
            }, 100);
          } else {
            // Si no está activo, asegurarse de remover cualquier listener anterior
            const oldClickOutsideHandler = (element as any)._clickOutsideHandler;
            if (oldClickOutsideHandler) {
              document.removeEventListener('click', oldClickOutsideHandler, true);
              console.log('[SearchButton] Click outside listener removed when deactivating');
              delete (element as any)._clickOutsideHandler;
            }
          }
          
          // Agregar event listeners para botones de acción (filtro y crear)
          if (updatedOptions.showFilterButton) {
            // Buscar el botón de filtro dentro del contenedor de acciones
            const actionsContainer = newElement.querySelector('.ubits-search-button__actions');
            const filterButton = actionsContainer 
              ? actionsContainer.querySelector('.ubits-search-button__filter-button') as HTMLButtonElement
              : newElement.querySelector('.ubits-search-button__filter-button') as HTMLButtonElement;
            
            console.log('[SearchButton] update - Looking for filter button:', {
              showFilterButton: updatedOptions.showFilterButton,
              actionsContainer: !!actionsContainer,
              filterButton: !!filterButton,
              newElementHTML: newElement.outerHTML.substring(0, 800)
            });
            
            if (filterButton) {
              if (updatedOptions.onFilterClick) {
                filterButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updatedOptions.onFilterClick!(e);
                });
              }
              console.log('[SearchButton] Filter button event listener added in update');
            } else {
              console.warn('[SearchButton] Filter button not found in update');
            }
          }
          
          if (updatedOptions.showCreateButton) {
            // Buscar el botón de crear dentro del contenedor de acciones
            const actionsContainer = newElement.querySelector('.ubits-search-button__actions');
            const createButton = actionsContainer 
              ? actionsContainer.querySelector('.ubits-search-button__create-button') as HTMLButtonElement
              : newElement.querySelector('.ubits-search-button__create-button') as HTMLButtonElement;
            
            console.log('[SearchButton] update - Looking for create button:', {
              showCreateButton: updatedOptions.showCreateButton,
              actionsContainer: !!actionsContainer,
              createButton: !!createButton,
              newElementHTML: newElement.outerHTML.substring(0, 800)
            });
            
            if (createButton) {
              if (updatedOptions.onCreateClick) {
                createButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updatedOptions.onCreateClick!(e);
                });
              }
              console.log('[SearchButton] Create button event listener added in update');
            } else {
              console.warn('[SearchButton] Create button not found in update');
            }
          }
        }
        
        // Botón de limpiar ya se maneja dinámicamente con updateClearButton arriba
      } else {
        // Remover listener de click fuera cuando se desactiva el SearchButton
        const oldClickOutsideHandler = (element as any)._clickOutsideHandler;
        if (oldClickOutsideHandler) {
          document.removeEventListener('click', oldClickOutsideHandler, true);
          console.log('[SearchButton] Click outside listener removed when deactivating');
          delete (element as any)._clickOutsideHandler;
        }
        
        // Restaurar el ancho del contenedor cuando se desactiva (volver a modo botón)
        const parentContainer = newElement.parentElement;
        if (parentContainer && (parentContainer.id === 'searchbutton-container' || parentContainer.id?.includes('searchbutton'))) {
          if (parentContainer.dataset.originalWidth) {
            parentContainer.style.width = parentContainer.dataset.originalWidth;
            parentContainer.style.minWidth = parentContainer.dataset.originalMinWidth || '';
            parentContainer.style.maxWidth = '';
            parentContainer.style.flexShrink = '';
            parentContainer.style.flexGrow = '';
            delete parentContainer.dataset.originalWidth;
            delete parentContainer.dataset.originalMinWidth;
            console.log('[SearchButton] Container width restored when deactivating (button mode):', {
              restoredWidth: parentContainer.style.width,
              restoredMinWidth: parentContainer.style.minWidth
            });
          }
        }
        
        // Si el nuevo elemento es un div (wrapper con botones), buscar el botón de búsqueda dentro
        let searchButtonElement: HTMLButtonElement | null = null;
        if (newElement instanceof HTMLDivElement) {
          searchButtonElement = newElement.querySelector('button.ubits-button') as HTMLButtonElement;
        } else {
          searchButtonElement = newElement as HTMLButtonElement;
        }
        
        const buttonElement = searchButtonElement || (newElement as HTMLButtonElement);
        
        // Remover handler anterior si existe (del elemento anterior antes del reemplazo)
        const oldButtonHandler = (element as any)._buttonClickHandler;
        if (oldButtonHandler) {
          // Intentar remover del elemento anterior si todavía existe
          const oldButton = element instanceof HTMLButtonElement 
            ? element 
            : element.querySelector('button.ubits-button') as HTMLButtonElement;
          if (oldButton) {
            oldButton.removeEventListener('click', oldButtonHandler);
            console.log('[SearchButton] Old button click handler removed from previous element');
          }
        }
        
        // Crear nuevo handler para el click del botón
        const handleButtonClick = (e: MouseEvent) => {
          console.log('[SearchButton] Button clicked after update, activating search');
          e.preventDefault();
          e.stopPropagation();
          
          if (updatedOptions.onClick) {
            updatedOptions.onClick(e);
          }
          
          // Activar el search button - preservar showFilterButton y showCreateButton
          if (!updatedOptions.active && updatedOptions.state !== 'active') {
            update({
              active: true,
              state: 'active',
              showFilterButton: updatedOptions.showFilterButton,
              showCreateButton: updatedOptions.showCreateButton
            });
            
            setTimeout(() => {
              const activeElement = newElement.parentElement?.querySelector('.ubits-search-button--active');
              if (activeElement) {
                const inputElement = activeElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
                if (inputElement) {
                  inputElement.focus();
                }
              }
            }, 300);
          }
        };
        
        // Re-attach click handler para activar el search button
        // IMPORTANTE: Usar setTimeout para asegurar que el elemento esté completamente en el DOM
        // Usar requestAnimationFrame + setTimeout para asegurar que el DOM esté completamente renderizado
        requestAnimationFrame(() => {
          setTimeout(() => {
            // Buscar el botón nuevamente después de que el elemento esté en el DOM
            const currentButton = newElement instanceof HTMLButtonElement 
              ? newElement 
              : newElement.querySelector('button.ubits-button') as HTMLButtonElement;
            
            if (currentButton) {
              // Remover cualquier listener anterior que pueda existir
              const existingHandler = (newElement as any)._buttonClickHandler;
              if (existingHandler) {
                currentButton.removeEventListener('click', existingHandler);
                console.log('[SearchButton] Existing button click handler removed before adding new one');
              }
              
              // Agregar el nuevo listener
              currentButton.addEventListener('click', handleButtonClick);
              // Guardar referencia al handler para poder removerlo después
              (newElement as any)._buttonClickHandler = handleButtonClick;
              console.log('[SearchButton] Button click handler added in update (delayed)', {
                buttonFound: !!currentButton,
                buttonTag: currentButton.tagName,
                buttonClasses: currentButton.className,
                elementInDOM: document.body.contains(newElement),
                parentElement: newElement.parentElement?.tagName
              });
            } else {
              console.warn('[SearchButton] ⚠️ Button element not found after update for click handler', {
                newElementTag: newElement.tagName,
                newElementClasses: newElement.className,
                newElementHTML: newElement.outerHTML.substring(0, 200),
                elementInDOM: document.body.contains(newElement)
              });
            }
          }, 10);
        });
      }
    }
  };

  // Agregar event listeners
  const isSearchActive = currentOptions.active || currentOptions.state === 'active';
  
  if (isSearchActive) {
    const inputElement = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
    const clearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
    
    if (inputElement) {
      if (currentOptions.onChange) {
        inputElement.addEventListener('input', currentOptions.onChange);
        inputElement.addEventListener('change', currentOptions.onChange);
      }
      if (currentOptions.onFocus) {
        inputElement.addEventListener('focus', currentOptions.onFocus);
      }
      if (currentOptions.onBlur) {
        inputElement.addEventListener('blur', currentOptions.onBlur);
      }
    }
    
    // Botón de limpiar - se maneja dinámicamente cuando el usuario escribe
    // Agregar listener para mostrar/ocultar el botón de limpiar dinámicamente
    const updateClearButton = () => {
      const currentValue = inputElement.value;
      const clearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
      const inputWrapper = element.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
      const shouldShowClear = currentValue && currentValue.trim().length > 0;
      
      console.log('[SearchButton] Initial updateClearButton:', {
        currentValue: currentValue,
        shouldShowClear: shouldShowClear,
        clearButtonExists: !!clearButton,
        clearButtonDisplay: clearButton ? window.getComputedStyle(clearButton).display : null,
        inputWrapperExists: !!inputWrapper
      });
      
      if (shouldShowClear) {
        // Si no existe el botón de limpiar, crearlo
        if (!clearButton && inputWrapper) {
          const clearButtonHTML = renderClearButton();
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = clearButtonHTML.trim();
          const newClearButton = tempDiv.firstElementChild as HTMLButtonElement;
          if (newClearButton) {
            inputWrapper.appendChild(newClearButton);
            
            // Asegurar que el botón sea visible
            newClearButton.style.display = 'flex';
            newClearButton.style.visibility = 'visible';
            newClearButton.style.opacity = '1';
            
            // Agregar event listener al nuevo botón
            newClearButton.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              inputElement.value = '';
              inputElement.focus();
              updateClearButton(); // Actualizar para ocultar el botón
              if (currentOptions.onChange) {
                const event = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(event);
              }
            });
            
            console.log('[SearchButton] Clear button created and added initially:', {
              button: newClearButton,
              buttonClasses: newClearButton.className,
              buttonDisplay: window.getComputedStyle(newClearButton).display,
              parentElement: newClearButton.parentElement
            });
          }
        } else if (clearButton) {
          clearButton.style.display = 'flex';
          clearButton.style.visibility = 'visible';
          clearButton.style.opacity = '1';
          console.log('[SearchButton] Clear button shown initially');
        }
      } else {
        // Ocultar el botón de limpiar si existe
        if (clearButton) {
          clearButton.style.display = 'none';
          console.log('[SearchButton] Clear button hidden initially');
        }
      }
    };
    
    // Agregar listener para actualizar el botón de limpiar cuando cambia el valor
    // Crear un handler combinado que llame a ambos callbacks
    const inputHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const currentValue = target.value;
      const inputWrapper = element.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
      
      // Logs detallados sobre los estilos del input cuando se escribe
      const inputStyles = window.getComputedStyle(inputElement);
      const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
      
      console.log('[SearchButton] ========== INITIAL INPUT EVENT - WRITING ==========');
      console.log('[SearchButton] Initial input event details:', {
        value: currentValue,
        valueLength: currentValue.length,
        eventType: e.type,
        isFocused: document.activeElement === inputElement,
        inputElement: inputElement,
        inputElementClasses: inputElement.className,
        inputWrapper: inputWrapper,
        inputWrapperClasses: inputWrapper?.className
      });
      
      console.log('[SearchButton] Initial input computed styles while writing:', {
        border: inputStyles.border,
        borderWidth: inputStyles.borderWidth,
        borderStyle: inputStyles.borderStyle,
        borderColor: inputStyles.borderColor,
        outline: inputStyles.outline,
        outlineWidth: inputStyles.outlineWidth,
        outlineStyle: inputStyles.outlineStyle,
        outlineColor: inputStyles.outlineColor,
        boxShadow: inputStyles.boxShadow,
        backgroundColor: inputStyles.backgroundColor,
        background: inputStyles.background,
        padding: inputStyles.padding,
        paddingLeft: inputStyles.paddingLeft,
        paddingRight: inputStyles.paddingRight,
        width: inputStyles.width,
        height: inputStyles.height,
        fontSize: inputStyles.fontSize,
        fontFamily: inputStyles.fontFamily,
        color: inputStyles.color
      });
      
      console.log('[SearchButton] Initial input wrapper computed styles while writing:', wrapperStyles ? {
        border: wrapperStyles.border,
        borderWidth: wrapperStyles.borderWidth,
        borderStyle: wrapperStyles.borderStyle,
        borderColor: wrapperStyles.borderColor,
        outline: wrapperStyles.outline,
        boxShadow: wrapperStyles.boxShadow,
        backgroundColor: wrapperStyles.backgroundColor,
        padding: wrapperStyles.padding,
        width: wrapperStyles.width,
        height: wrapperStyles.height
      } : null);
      
      console.log('[SearchButton] ========== END INITIAL INPUT EVENT ==========');
      
      updateClearButton();
      if (currentOptions.onChange) {
        currentOptions.onChange(e as any);
      }
    };
    
    inputElement.addEventListener('input', inputHandler);
    inputElement.addEventListener('change', inputHandler);
    
    // También agregar listeners para focus y blur
    inputElement.addEventListener('focus', (e) => {
      const inputWrapper = element.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
      const inputStyles = window.getComputedStyle(inputElement);
      const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
      
      console.log('[SearchButton] ========== INITIAL INPUT FOCUS EVENT ==========');
      console.log('[SearchButton] Initial input styles on focus:', {
        border: inputStyles.border,
        outline: inputStyles.outline,
        boxShadow: inputStyles.boxShadow,
        backgroundColor: inputStyles.backgroundColor
      });
      console.log('[SearchButton] Initial wrapper styles on focus:', wrapperStyles ? {
        border: wrapperStyles.border,
        outline: wrapperStyles.outline,
        boxShadow: wrapperStyles.boxShadow,
        backgroundColor: wrapperStyles.backgroundColor
      } : null);
      
      // Revisar estructura DOM en focus
      let currentElement: HTMLElement | null = inputElement;
      const parentChainOnFocus: Array<{element: HTMLElement, tagName: string, className: string, boxShadow: string, border: string}> = [];
      
      while (currentElement && currentElement !== document.body) {
        const styles = window.getComputedStyle(currentElement);
        parentChainOnFocus.push({
          element: currentElement,
          tagName: currentElement.tagName,
          className: currentElement.className,
          boxShadow: styles.boxShadow,
          border: styles.border
        });
        currentElement = currentElement.parentElement;
      }
      
      console.log('[SearchButton] Parent chain on focus:', parentChainOnFocus);
      console.log('[SearchButton] ========== END INITIAL FOCUS EVENT ==========');
    });
    
    inputElement.addEventListener('blur', (e) => {
      const inputWrapper = element.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
      const inputStyles = window.getComputedStyle(inputElement);
      const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
      
      console.log('[SearchButton] ========== INITIAL INPUT BLUR EVENT ==========');
      console.log('[SearchButton] Initial input styles on blur:', {
        border: inputStyles.border,
        outline: inputStyles.outline,
        boxShadow: inputStyles.boxShadow,
        backgroundColor: inputStyles.backgroundColor
      });
      console.log('[SearchButton] Initial wrapper styles on blur:', wrapperStyles ? {
        border: wrapperStyles.border,
        outline: wrapperStyles.outline,
        boxShadow: wrapperStyles.boxShadow,
        backgroundColor: wrapperStyles.backgroundColor
      } : null);
      console.log('[SearchButton] ========== END INITIAL BLUR EVENT ==========');
    });
    
    // Agregar listener para cerrar el SearchButton cuando se hace click fuera
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Verificar que el botón todavía esté activo
      const currentActiveState = currentOptions.active || currentOptions.state === 'active';
      if (!currentActiveState) {
        return;
      }
      
      // Verificar si el click fue fuera del SearchButton y sus botones de acción
      const isClickInside = element.contains(target) || 
                           (target.closest && target.closest('.ubits-search-button'));
      
      if (!isClickInside && currentActiveState) {
        // Verificar si el input tiene contenido antes de cerrar
        // Buscar el input en el DOM actual (puede haber cambiado desde que se agregó el listener)
        const searchButtonElement = document.querySelector('.ubits-search-button--active');
        const currentInputElement = searchButtonElement?.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const inputValue = currentInputElement?.value?.trim() || '';
        
        console.log('[SearchButton] Click outside check (initial):', {
          hasInputElement: !!currentInputElement,
          inputValue: inputValue,
          inputValueLength: inputValue.length,
          shouldClose: inputValue.length === 0
        });
        
        if (inputValue.length > 0) {
          console.log('[SearchButton] Click outside detected but input has value, not closing');
          return;
        }
        
        console.log('[SearchButton] Click outside detected, closing search button');
        e.preventDefault();
        e.stopPropagation();
        
        // Desactivar el SearchButton (volver a modo botón) - preservar showFilterButton y showCreateButton
        update({
          active: false,
          state: 'default',
          showFilterButton: currentOptions.showFilterButton,
          showCreateButton: currentOptions.showCreateButton
        });
      }
    };
    
    // Agregar el listener al documento con un pequeño delay para evitar que se cierre inmediatamente
    // cuando se hace click en el botón para activarlo
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
      console.log('[SearchButton] Click outside listener added');
    }, 100);
    
    // Guardar referencia al handler para poder removerlo después
    (element as any)._clickOutsideHandler = handleClickOutside;
    
    // Actualizar el botón de limpiar inicialmente
    updateClearButton();
    
    // Agregar event listeners para botones de acción (filtro y crear)
    if (currentOptions.showFilterButton) {
        const filterButton = element.querySelector('.ubits-search-button__filter-button') as HTMLButtonElement;
        console.log('[SearchButton] Looking for filter button:', {
          showFilterButton: currentOptions.showFilterButton,
          found: !!filterButton,
          element: element,
          elementHTML: element.outerHTML.substring(0, 500)
        });
        if (filterButton) {
          if (currentOptions.onFilterClick) {
            filterButton.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              currentOptions.onFilterClick!(e);
            });
          }
          console.log('[SearchButton] Filter button event listener added');
        } else {
          console.warn('[SearchButton] Filter button not found in element');
        }
      }
      
      if (currentOptions.showCreateButton) {
        const createButton = element.querySelector('.ubits-search-button__create-button') as HTMLButtonElement;
        console.log('[SearchButton] Looking for create button:', {
          showCreateButton: currentOptions.showCreateButton,
          found: !!createButton,
          element: element,
          elementHTML: element.outerHTML.substring(0, 500)
        });
        if (createButton) {
          if (currentOptions.onCreateClick) {
            createButton.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              currentOptions.onCreateClick!(e);
            });
          }
          console.log('[SearchButton] Create button event listener added');
        } else {
          console.warn('[SearchButton] Create button not found in element');
        }
      }
    } else {
      // Modo botón - también agregar event listeners para botones de acción si existen
      // Si el elemento es un div (wrapper con botones), buscar el botón de búsqueda dentro
      let searchButtonElement: HTMLButtonElement | null = null;
      if (element instanceof HTMLDivElement) {
        searchButtonElement = element.querySelector('button.ubits-button') as HTMLButtonElement;
      } else {
        searchButtonElement = element as HTMLButtonElement;
      }
      
      // Agregar event listeners para botones de acción en modo botón
      if (currentOptions.showFilterButton) {
        const filterButton = element.querySelector('.ubits-search-button__filter-button') as HTMLButtonElement;
        if (filterButton && currentOptions.onFilterClick) {
          filterButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentOptions.onFilterClick!(e);
          });
          console.log('[SearchButton] Filter button event listener added (button mode)');
        }
      }
      
      if (currentOptions.showCreateButton) {
        const createButton = element.querySelector('.ubits-search-button__create-button') as HTMLButtonElement;
        if (createButton && currentOptions.onCreateClick) {
          createButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentOptions.onCreateClick!(e);
          });
          console.log('[SearchButton] Create button event listener added (button mode)');
        }
      }
      
      // Crear handler para el click del botón
      const handleButtonClick = (e: MouseEvent) => {
        console.log('[SearchButton] Button clicked, activating search');
        e.preventDefault();
        e.stopPropagation();
        
        // Si hay onClick callback, ejecutarlo primero
        if (currentOptions.onClick) {
          currentOptions.onClick(e);
        }
        
        // Activar el search button (mostrar input) - preservar showFilterButton y showCreateButton
        if (!currentOptions.active && currentOptions.state !== 'active') {
          console.log('[SearchButton] ========== ACTIVATING SEARCH BUTTON ==========');
          console.log('[SearchButton] Current state:', {
            active: currentOptions.active,
            state: currentOptions.state,
            element: element,
            elementClasses: element.className,
            elementTagName: element.tagName,
            showFilterButton: currentOptions.showFilterButton,
            showCreateButton: currentOptions.showCreateButton
          });
          
          update({
            active: true,
            state: 'active',
            showFilterButton: currentOptions.showFilterButton,
            showCreateButton: currentOptions.showCreateButton
          });
          
          console.log('[SearchButton] Update called, waiting for animation...');
          
          // Enfocar el input después de la animación
          setTimeout(() => {
            console.log('[SearchButton] ========== AFTER ACTIVATION TIMEOUT ==========');
            const newElement = element.parentElement?.querySelector('.ubits-search-button--active');
            console.log('[SearchButton] Looking for active element:', {
              parentElement: element.parentElement,
              foundElement: newElement,
              foundElementClasses: newElement?.className,
              foundElementTagName: newElement?.tagName,
              foundElementHTML: newElement ? newElement.outerHTML.substring(0, 500) : null
            });
            
            if (newElement) {
              const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
              const inputWrapper = newElement.querySelector('.ubits-search-button__input-wrapper') as HTMLElement;
                
                console.log('[SearchButton] Input elements found:', {
                  inputElement: inputElement,
                  inputElementTagName: inputElement?.tagName,
                  inputElementClasses: inputElement?.className,
                  inputElementValue: inputElement?.value,
                  inputWrapper: inputWrapper,
                  inputWrapperClasses: inputWrapper?.className
                });
                
                if (inputElement) {
                  // Verificar estilos antes de enfocar
                  const inputStyles = window.getComputedStyle(inputElement);
                  const wrapperStyles = inputWrapper ? window.getComputedStyle(inputWrapper) : null;
                  
                  console.log('[SearchButton] Input styles before focus:', {
                    border: inputStyles.border,
                    borderColor: inputStyles.borderColor,
                    outline: inputStyles.outline,
                    outlineColor: inputStyles.outlineColor,
                    boxShadow: inputStyles.boxShadow,
                    backgroundColor: inputStyles.backgroundColor,
                    padding: inputStyles.padding,
                    width: inputStyles.width,
                    height: inputStyles.height
                  });
                  
                  console.log('[SearchButton] Wrapper styles before focus:', wrapperStyles ? {
                    border: wrapperStyles.border,
                    borderColor: wrapperStyles.borderColor,
                    outline: wrapperStyles.outline,
                    boxShadow: wrapperStyles.boxShadow,
                    backgroundColor: wrapperStyles.backgroundColor,
                    padding: wrapperStyles.padding,
                    width: wrapperStyles.width,
                    height: wrapperStyles.height
                  } : null);
                  
                  inputElement.focus();
                  
                  // Verificar estilos después de enfocar
                  const inputStylesAfterFocus = window.getComputedStyle(inputElement);
                  console.log('[SearchButton] Input styles after focus:', {
                    border: inputStylesAfterFocus.border,
                    borderColor: inputStylesAfterFocus.borderColor,
                    outline: inputStylesAfterFocus.outline,
                    outlineColor: inputStylesAfterFocus.outlineColor,
                    boxShadow: inputStylesAfterFocus.boxShadow,
                    backgroundColor: inputStylesAfterFocus.backgroundColor,
                    isFocused: document.activeElement === inputElement
                  });
                  
                  console.log('[SearchButton] ✅ Input focused after activation');
                } else {
                  console.log('[SearchButton] ⚠️ Input element not found after activation');
                }
              } else {
                console.log('[SearchButton] ⚠️ Active element not found after activation');
              }
            }, 300); // Esperar a que termine la animación
          }
        };
      
      // Agregar funcionalidad para activar el search button al hacer click
      if (searchButtonElement) {
        searchButtonElement.addEventListener('click', handleButtonClick);
        // Guardar referencia al handler para poder removerlo después
        (element as any)._buttonClickHandler = handleButtonClick;
        console.log('[SearchButton] Button click handler added (initial)');
      }
    }

  const destroy = () => {
    // Remover el listener de click fuera si existe
    const clickOutsideHandler = (element as any)._clickOutsideHandler;
    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler, true);
      console.log('[SearchButton] Click outside listener removed');
      delete (element as any)._clickOutsideHandler;
    }
    
    // Remover el listener del botón si existe
    const buttonClickHandler = (element as any)._buttonClickHandler;
    if (buttonClickHandler) {
      const buttonElement = element instanceof HTMLButtonElement 
        ? element 
        : element.querySelector('button.ubits-button') as HTMLButtonElement;
      if (buttonElement) {
        buttonElement.removeEventListener('click', buttonClickHandler);
        console.log('[SearchButton] Button click handler removed');
      }
      delete (element as any)._buttonClickHandler;
    }
    
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  return {
    element,
    destroy,
    update
  };
}

