/**
 * Tooltip Provider
 * Componente tooltip con tail (flecha) para mostrar información contextual
 * Similar al Popover pero más simple, con título, descripción y botones
 */

import type { TooltipOptions } from './types/TooltipOptions';

/**
 * Anchos del tooltip en píxeles
 */
const TOOLTIP_WIDTHS: Record<string, string> = {
  sm: '240px',
  md: '320px',
  lg: '400px'
};

/**
 * Renderiza el HTML de un Tooltip
 */
export function renderTooltip(options: TooltipOptions): string {
  const {
    title,
    showTitle = true,
    description,
    showDescription = true,
    primaryButtonLabel,
    showPrimaryButton = false,
    primaryButtonIcon,
    showPrimaryButtonIcon = false,
    secondaryButtonLabel,
    showSecondaryButton = false,
    secondaryButtonIcon,
    showSecondaryButtonIcon = false,
    tertiaryButtonLabel,
    showTertiaryButton = false,
    tertiaryButtonIcon,
    showTertiaryButtonIcon = false,
    width = 'md',
    tailPosition = 'top',
    tailOffset = 0,
    className = '',
    style = ''
  } = options;

  // Mapear tamaño del tooltip al tamaño de los botones
  const buttonSizeMap: Record<string, string> = {
    sm: 'xs',
    md: 'sm',
    lg: 'md'
  };
  const buttonSize = buttonSizeMap[width] || 'sm';
  
  // Calcular cantidad de botones visibles
  const buttonCount = (showPrimaryButton ? 1 : 0) + 
                     (showSecondaryButton ? 1 : 0) + 
                     (showTertiaryButton ? 1 : 0);
  
  // Calcular min-width y max-width según tamaño y cantidad de botones
  const baseMinWidths: Record<string, number> = { sm: 120, md: 160, lg: 200 };
  const baseMaxWidths: Record<string, number> = { sm: 240, md: 320, lg: 400 };
  let minWidth = baseMinWidths[width] || baseMinWidths.md;
  let maxWidth = baseMaxWidths[width] || baseMaxWidths.md;
  
  // Si hay botones, aumentar el max-width para que no se corte
  if (buttonCount === 3) {
    maxWidth = Math.max(maxWidth, 420);
  } else if (buttonCount === 2) {
    maxWidth = Math.max(maxWidth, 360);
  }
  
  // Usar min-width y max-width en lugar de width fijo para que se adapte al contenido
  // El tooltip se ajustará al contenido pero tendrá límites mínimos y máximos
  const tooltipWidthStyle = `min-width: ${minWidth}px; max-width: ${maxWidth}px; width: auto;`;
  const tailPositionClass = `ubits-tooltip--tail-${tailPosition}`;

  // Construir clases (sin clase de ancho fijo, usamos estilos inline para ancho adaptativo)
  const classes = [
    'ubits-tooltip',
    tailPositionClass,
    className
  ].filter(Boolean).join(' ');

  // Combinar estilos: ancho adaptativo + estilos personalizados
  const combinedStyle = `${tooltipWidthStyle}${style ? `; ${style}` : ''}`;
  const styleAttr = ` style="${combinedStyle}"`;

  // Tail HTML (flecha) - siempre mostrar, la posición se controla con CSS
  // Usar transform para el offset en lugar de left/top para que se adapte al contenedor
  let tailStyle = '';
  if (tailOffset) {
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      tailStyle = `transform: translateX(calc(-50% + ${tailOffset}px));`;
    } else {
      tailStyle = `transform: translateY(calc(-50% + ${tailOffset}px));`;
    }
  }
  const tailHTML = `
    <div class="ubits-tooltip__tail"${tailStyle ? ` style="${tailStyle}"` : ''}>
      <div class="ubits-tooltip__tail-inner"></div>
    </div>
  `;

  // Header HTML (solo si hay título y showTitle es true)
  const headerHTML = (showTitle && title) ? `
    <div class="ubits-tooltip__header">
      <div class="ubits-tooltip__header-title">
        <p class="ubits-body-md-semibold">${title}</p>
      </div>
    </div>
  ` : '';

  // Body HTML (solo si hay descripción y showDescription es true)
  const bodyHTML = (showDescription && description) ? `
    <div class="ubits-tooltip__body">
      <div class="ubits-tooltip__body-content">
        <p class="ubits-body-md">${description}</p>
      </div>
    </div>
  ` : '';

  // Footer HTML (solo si hay botones)
  let footerHTML = '';
  const hasButtons = showPrimaryButton || showSecondaryButton || showTertiaryButton;
  
  if (hasButtons) {
    // Botón primario
    let primaryButtonContent = primaryButtonLabel || '';
    if (showPrimaryButtonIcon && primaryButtonIcon) {
      primaryButtonContent = `<i class="far fa-${primaryButtonIcon}"></i> ${primaryButtonContent}`;
    }
    const primaryButton = (showPrimaryButton && primaryButtonLabel) 
      ? `<button class="ubits-button ubits-button--primary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="primary" type="button">${primaryButtonContent}</button>`
      : '';

    // Botón secundario
    let secondaryButtonContent = secondaryButtonLabel || '';
    if (showSecondaryButtonIcon && secondaryButtonIcon) {
      secondaryButtonContent = `<i class="far fa-${secondaryButtonIcon}"></i> ${secondaryButtonContent}`;
    }
    const secondaryButton = (showSecondaryButton && secondaryButtonLabel)
      ? `<button class="ubits-button ubits-button--secondary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="secondary" type="button">${secondaryButtonContent}</button>`
      : '';

    // Botón terciario
    let tertiaryButtonContent = tertiaryButtonLabel || '';
    if (showTertiaryButtonIcon && tertiaryButtonIcon) {
      tertiaryButtonContent = `<i class="far fa-${tertiaryButtonIcon}"></i> ${tertiaryButtonContent}`;
    }
    const tertiaryButton = (showTertiaryButton && tertiaryButtonLabel)
      ? `<button class="ubits-button ubits-button--tertiary ubits-button--${buttonSize} ubits-tooltip__footer-button" data-action="tertiary" type="button">${tertiaryButtonContent}</button>`
      : '';

    footerHTML = `
      <div class="ubits-tooltip__footer">
        <div class="ubits-tooltip__footer-actions${!showTertiaryButton ? ' ubits-tooltip__footer-actions--no-tertiary' : ''}">
          ${tertiaryButton ? `
          <div class="ubits-tooltip__footer-left">
            ${tertiaryButton}
          </div>
          ` : ''}
          <div class="ubits-tooltip__footer-right">
            ${secondaryButton}
            ${primaryButton}
          </div>
        </div>
      </div>
    `;
  }

  // Tooltip container HTML
  // El content se ajusta al ancho del tooltip (que tiene max-width) y crece verticalmente
  return `
    <div class="${classes}"${styleAttr} data-ubits-id="🧩-ux-tooltip">
      ${tailHTML}
      <div class="ubits-tooltip__content">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Tooltip en el DOM
 */
export function createTooltip(options: TooltipOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updatePosition: (position: { top?: number; left?: number; right?: number; bottom?: number }) => void;
  destroy: () => void;
} {
  const {
    onClose,
    closeOnOutsideClick = true,
    open = false,
    position,
    referenceElement,
    onPrimaryAction,
    onSecondaryAction,
    onTertiaryAction
  } = options;

  // Crear contenedor
  const container = document.body;

  // Crear elemento del tooltip
  console.log('🔵 [TooltipProvider] Creando tooltip', {
    title: options.title,
    showPrimaryButton: options.showPrimaryButton,
    showSecondaryButton: options.showSecondaryButton,
    showTertiaryButton: options.showTertiaryButton,
    open,
    timestamp: new Date().toISOString()
  });
  
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderTooltip(options);
  const tooltip = wrapper.firstElementChild as HTMLElement;

  if (!tooltip) {
    throw new Error('No se pudo crear el tooltip');
  }

  // Agregar data-ubits-id si no está presente
  if (!tooltip.hasAttribute('data-ubits-id')) {
    tooltip.setAttribute('data-ubits-id', '🧩-ux-tooltip');
  }
  
  console.log('🟢 [TooltipProvider] Tooltip creado en DOM', {
    enDOM: document.body.contains(tooltip),
    tieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open')
  });

  // Aplicar posición inicial si se proporciona
  // IMPORTANTE: Aplicar posición correcta desde el inicio para que aparezca centrado arriba
  if (position) {
    tooltip.style.position = 'fixed';
    const tailPosition = options.tailPosition || 'top';
    const tailSpace = 17; // Espacio para el tail (9px) + padding de seguridad (8px)
    
    // Aplicar transform según la posición del tail
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      // Centrar horizontalmente desde el inicio
      if (position.left !== undefined) {
        tooltip.style.left = `${position.left}px`;
        tooltip.style.transform = 'translateX(-50%)';
      }
      if (position.top !== undefined) {
        // Asegurar que el tooltip aparezca arriba centrado desde el inicio
        let topPos = position.top;
        // Si el tail está arriba, asegurar espacio mínimo desde arriba
        if (tailPosition === 'top' && topPos < tailSpace) {
          topPos = tailSpace;
        }
        tooltip.style.top = `${topPos}px`;
      }
    } else if (tailPosition === 'left') {
      // Tooltip a la derecha del elemento, tail izquierda apuntando al elemento
      if (position.top !== undefined) {
        tooltip.style.top = `${position.top}px`;
        tooltip.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        let leftPos = position.left;
        // Asegurar espacio para el tail
        if (leftPos < tailSpace) {
          leftPos = tailSpace;
        }
        tooltip.style.left = `${leftPos}px`;
      }
    } else if (tailPosition === 'right') {
      // Tooltip a la izquierda del elemento, tail derecha apuntando al elemento
      if (position.top !== undefined) {
        tooltip.style.top = `${position.top}px`;
        tooltip.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        tooltip.style.left = `${position.left}px`;
      }
    }
  }

  // Funciones de control
  const openTooltip = () => {
    console.log('🟢 [TooltipProvider] openTooltip() llamado', {
      tooltipEnDOM: document.body.contains(tooltip),
      yaTieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open'),
      timestamp: new Date().toISOString()
    });
    
    // Si ya está abierto, no hacer nada
    if (tooltip.classList.contains('ubits-tooltip--open')) {
      console.log('🟡 [TooltipProvider] Tooltip ya está abierto, no hacer nada');
      return;
    }
    
    tooltip.classList.add('ubits-tooltip--open');
    
    // Usar requestAnimationFrame para asegurar que el tooltip esté completamente renderizado
    // antes de ajustar la posición
    requestAnimationFrame(() => {
      // Obtener dimensiones del tooltip después de que esté visible
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      console.log('🟢 [TooltipProvider] Tooltip abierto', {
        tieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open'),
        enDOM: document.body.contains(tooltip),
        width: tooltipRect.width,
        height: tooltipRect.height
      });
      
      // Espacio necesario para el tail (9px) + padding de seguridad (8px)
      const tailSpace = 17;
      
      // El posicionamiento ya se aplicó al crear el elemento, solo ajustar si es necesario para evitar cortes
      if (position) {
        tooltip.style.position = 'fixed';
        const tailPosition = options.tailPosition || 'top';
        
        if (tailPosition === 'top' || tailPosition === 'bottom') {
          // Centrar horizontalmente - solo ajustar si es necesario para evitar cortes
          if (position.left !== undefined) {
            let leftPos = position.left;
            // Asegurar que no se salga por la izquierda o derecha
            const halfWidth = tooltipRect.width / 2;
            if (halfWidth > 0) { // Solo ajustar si el tooltip tiene dimensiones válidas
              const currentLeft = parseFloat(tooltip.style.left) || leftPos;
              if (currentLeft - halfWidth < 0) {
                leftPos = halfWidth;
              } else if (currentLeft + halfWidth > viewportWidth) {
                leftPos = viewportWidth - halfWidth;
              } else {
                // Mantener la posición centrada original si no hay cortes
                leftPos = position.left;
              }
              // Solo actualizar si la posición cambió significativamente
              if (Math.abs(currentLeft - leftPos) > 1) {
                tooltip.style.left = `${leftPos}px`;
                tooltip.style.transform = 'translateX(-50%)';
              }
            }
          }
          if (position.top !== undefined) {
            let topPos = position.top;
            const currentTop = parseFloat(tooltip.style.top) || topPos;
            
            // Si el tail está arriba, asegurar que haya espacio suficiente
            if (tailPosition === 'top' && currentTop < tailSpace) {
              topPos = tailSpace;
            }
            // Si el tail está abajo, asegurar que el tooltip no se salga por abajo
            else if (tailPosition === 'bottom' && tooltipRect.height > 0) {
              const tooltipBottom = currentTop + tooltipRect.height + tailSpace;
              if (tooltipBottom > viewportHeight) {
                topPos = viewportHeight - tooltipRect.height - tailSpace;
              } else {
                // Mantener la posición original si no hay cortes
                topPos = position.top;
              }
            } else {
              // Mantener la posición original si no hay cortes
              topPos = position.top;
            }
            
            // Solo actualizar si la posición cambió significativamente (más de 5px)
            if (Math.abs(currentTop - topPos) > 5) {
              tooltip.style.top = `${topPos}px`;
            }
          }
        } else if (tailPosition === 'left') {
        // Tooltip a la derecha del elemento, tail izquierda apuntando al elemento
        // Centrar verticalmente
        if (position.top !== undefined) {
          let topPos = position.top;
          const halfHeight = tooltipRect.height / 2;
          // Asegurar que no se salga por arriba o abajo
          if (topPos - halfHeight < tailSpace) {
            topPos = halfHeight + tailSpace;
          } else if (topPos + halfHeight > viewportHeight - tailSpace) {
            topPos = viewportHeight - halfHeight - tailSpace;
          }
          tooltip.style.top = `${topPos}px`;
          tooltip.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          let leftPos = position.left;
          // Asegurar que no se salga por la izquierda (el tail necesita espacio)
          if (leftPos < tailSpace) {
            leftPos = tailSpace;
          }
          tooltip.style.left = `${leftPos}px`;
        }
      } else if (tailPosition === 'right') {
        // Tooltip a la izquierda del elemento, tail derecha apuntando al elemento
        // Centrar verticalmente
        if (position.top !== undefined) {
          let topPos = position.top;
          const halfHeight = tooltipRect.height / 2;
          // Asegurar que no se salga por arriba o abajo
          if (topPos - halfHeight < tailSpace) {
            topPos = halfHeight + tailSpace;
          } else if (topPos + halfHeight > viewportHeight - tailSpace) {
            topPos = viewportHeight - halfHeight - tailSpace;
          }
          tooltip.style.top = `${topPos}px`;
          tooltip.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          let leftPos = position.left;
          // Asegurar que no se salga por la derecha (el tail necesita espacio)
          const tooltipRight = leftPos + tooltipRect.width + tailSpace;
          if (tooltipRight > viewportWidth) {
            leftPos = viewportWidth - tooltipRect.width - tailSpace;
          }
          tooltip.style.left = `${leftPos}px`;
        }
      }
    } else if (referenceElement) {
      // Posicionar relativo al elemento de referencia
      const rect = referenceElement.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const tailPosition = options.tailPosition || 'top';
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const tailSpace = 17;
      
      tooltip.style.position = 'fixed';
      
      // Calcular posición según tailPosition
      let topPos: number;
      let leftPos: number;
      
      if (tailPosition === 'top') {
        // Tooltip debajo del elemento, tail arriba
        topPos = rect.bottom + 8;
        // Asegurar que haya espacio para el tail arriba
        if (topPos - tooltipRect.height - tailSpace < 0) {
          topPos = tooltipRect.height + tailSpace;
        }
        leftPos = rect.left + (rect.width / 2);
      } else if (tailPosition === 'bottom') {
        // Tooltip arriba del elemento, tail abajo
        topPos = rect.top - tooltipRect.height - 8;
        // Asegurar que no se salga por arriba
        if (topPos < tailSpace) {
          topPos = tailSpace;
        }
        leftPos = rect.left + (rect.width / 2);
      } else if (tailPosition === 'left') {
        // Tooltip a la derecha del elemento, tail izquierda
        topPos = rect.top + (rect.height / 2);
        leftPos = rect.right + 8;
        // Asegurar que no se salga por la izquierda
        if (leftPos < tailSpace) {
          leftPos = tailSpace;
        }
      } else {
        // tailPosition === 'right'
        // Tooltip a la izquierda del elemento, tail derecha
        topPos = rect.top + (rect.height / 2);
        leftPos = rect.left - tooltipRect.width - 8;
        // Asegurar que no se salga por la derecha
        const tooltipRight = leftPos + tooltipRect.width + tailSpace;
        if (tooltipRight > viewportWidth) {
          leftPos = viewportWidth - tooltipRect.width - tailSpace;
        }
      }
      
      // Ajustar horizontalmente si se sale del viewport
      const halfWidth = tooltipRect.width / 2;
      if (leftPos - halfWidth < 0) {
        leftPos = halfWidth;
      } else if (leftPos + halfWidth > viewportWidth) {
        leftPos = viewportWidth - halfWidth;
      }
      
      // Ajustar verticalmente si se sale del viewport
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        if (topPos + tooltipRect.height > viewportHeight) {
          topPos = viewportHeight - tooltipRect.height - (tailPosition === 'bottom' ? tailSpace : 0);
        }
      } else {
        const halfHeight = tooltipRect.height / 2;
        if (topPos - halfHeight < tailSpace) {
          topPos = halfHeight + tailSpace;
        } else if (topPos + halfHeight > viewportHeight - tailSpace) {
          topPos = viewportHeight - halfHeight - tailSpace;
        }
      }
      
      tooltip.style.top = `${topPos}px`;
      tooltip.style.left = `${leftPos}px`;
      
      // Aplicar transform según tailPosition
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        tooltip.style.transform = 'translateX(-50%)';
      } else {
        tooltip.style.transform = 'translateY(-50%)';
      }
    }
    }); // Cerrar requestAnimationFrame
  };

  const closeTooltip = () => {
    console.log('🔴 [TooltipProvider] closeTooltip() llamado', {
      tieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open'),
      enDOM: document.body.contains(tooltip),
      timestamp: new Date().toISOString()
    });
    
    tooltip.classList.remove('ubits-tooltip--open');
    
    console.log('🔴 [TooltipProvider] Tooltip cerrado', {
      tieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open'),
      enDOM: document.body.contains(tooltip)
    });
    
    if (onClose) {
      onClose();
    }
  };

  const updatePosition = (newPosition: { top?: number; left?: number; right?: number; bottom?: number }) => {
    const tailPosition = options.tailPosition || 'top';
    
    if (newPosition.top !== undefined) tooltip.style.top = `${newPosition.top}px`;
    if (newPosition.left !== undefined) tooltip.style.left = `${newPosition.left}px`;
    if (newPosition.right !== undefined) tooltip.style.right = `${newPosition.right}px`;
    if (newPosition.bottom !== undefined) tooltip.style.bottom = `${newPosition.bottom}px`;
    
    // Mantener el transform correcto según tailPosition
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      if (newPosition.left !== undefined) {
        tooltip.style.transform = 'translateX(-50%)';
      }
    } else if (tailPosition === 'left' || tailPosition === 'right') {
      if (newPosition.top !== undefined) {
        tooltip.style.transform = 'translateY(-50%)';
      }
    }
  };

  let destroy = () => {
    console.log('🔴 [TooltipProvider] destroy() llamado', {
      tieneClaseOpen: tooltip.classList.contains('ubits-tooltip--open'),
      enDOM: document.body.contains(tooltip),
      tieneParent: !!tooltip.parentElement,
      timestamp: new Date().toISOString()
    });
    
    if (tooltip.parentElement) {
      tooltip.parentElement.removeChild(tooltip);
    }
    
    console.log('🔴 [TooltipProvider] Tooltip destruido', {
      enDOM: document.body.contains(tooltip)
    });
  };

  // Event listeners
  if (closeOnOutsideClick) {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isOpen = tooltip.classList.contains('ubits-tooltip--open');
      const isInsideTooltip = tooltip.contains(target);
      
      console.log('🟡 [TooltipProvider] handleClickOutside', {
        isOpen,
        isInsideTooltip,
        target: (target as HTMLElement)?.tagName,
        closeOnOutsideClick,
        timestamp: new Date().toISOString()
      });
      
      // No cerrar si el click es en el botón que abre el tooltip o dentro del tooltip
      if (isOpen && !isInsideTooltip) {
        const clickedElement = target as HTMLElement;
        const isTriggerButton = clickedElement.closest && clickedElement.closest('[data-tooltip-trigger]');
        const isInStoryContainer = clickedElement.closest && (
          clickedElement.closest('[data-ubits-component="Tooltip"]') ||
          clickedElement.closest('.sbdocs-preview') ||
          clickedElement.closest('.docs-story')
        );
        
        // No cerrar si el click es en el contenedor de la story (Storybook)
        if (!isTriggerButton && !isInStoryContainer) {
          console.log('🔴 [TooltipProvider] Cerrando tooltip por click fuera');
          closeTooltip();
        } else {
          console.log('🟡 [TooltipProvider] NO cerrando tooltip (click en trigger o story container)');
        }
      }
    };
    
    // Usar capture phase para detectar antes que otros handlers
    document.addEventListener('click', handleClickOutside, true);
    
    // Limpiar listener al destruir
    const originalDestroy = destroy;
    destroy = () => {
      console.log('🔴 [TooltipProvider] destroy() con cleanup de listeners');
      document.removeEventListener('click', handleClickOutside, true);
      originalDestroy();
    };
  }

  // Agregar event listeners a los botones del footer
  // IMPORTANTE: Configurar los botones después de que el tooltip esté en el DOM
  const setupButtons = () => {
    console.log('🟡 [TooltipProvider] Configurando botones', {
      showPrimaryButton: options.showPrimaryButton,
      showSecondaryButton: options.showSecondaryButton,
      showTertiaryButton: options.showTertiaryButton,
      onPrimaryAction: !!onPrimaryAction,
      onSecondaryAction: !!onSecondaryAction,
      onTertiaryAction: !!onTertiaryAction,
      tooltipEnDOM: document.body.contains(tooltip),
      primaryButtonLabel: options.primaryButtonLabel,
      secondaryButtonLabel: options.secondaryButtonLabel,
      tertiaryButtonLabel: options.tertiaryButtonLabel
    });

    // ⭐ Buscar botones basándose en showPrimaryButton/showSecondaryButton/showTertiaryButton
    // No solo en si existe onPrimaryAction, porque los botones se crean basándose en show*Button
    if (options.showPrimaryButton) {
      const primaryButton = tooltip.querySelector('[data-action="primary"]') as HTMLButtonElement;
      console.log('🟡 [TooltipProvider] Buscando botón primary', { 
        encontrado: !!primaryButton,
        showPrimaryButton: options.showPrimaryButton,
        primaryButtonLabel: options.primaryButtonLabel
      });
      if (primaryButton) {
        // Remover listener anterior si existe
        primaryButton.replaceWith(primaryButton.cloneNode(true));
        const newPrimaryButton = tooltip.querySelector('[data-action="primary"]') as HTMLButtonElement;
        if (newPrimaryButton && onPrimaryAction) {
          newPrimaryButton.addEventListener('click', (e) => {
            console.log('🟢 [TooltipProvider] Botón primary clickeado');
            e.preventDefault();
            e.stopPropagation();
            onPrimaryAction();
          });
          console.log('🟢 [TooltipProvider] Event listener agregado a botón primary');
        } else if (newPrimaryButton && !onPrimaryAction) {
          console.warn('🔴 [TooltipProvider] Botón primary encontrado pero onPrimaryAction no está definido');
        }
      } else {
        console.warn('🔴 [TooltipProvider] Botón primary no encontrado', {
          showPrimaryButton: options.showPrimaryButton,
          primaryButtonLabel: options.primaryButtonLabel,
          tooltipHTML: tooltip.innerHTML.substring(0, 200)
        });
      }
    }

    if (options.showSecondaryButton) {
      const secondaryButton = tooltip.querySelector('[data-action="secondary"]') as HTMLButtonElement;
      console.log('🟡 [TooltipProvider] Buscando botón secondary', { 
        encontrado: !!secondaryButton,
        showSecondaryButton: options.showSecondaryButton,
        secondaryButtonLabel: options.secondaryButtonLabel
      });
      if (secondaryButton) {
        // Remover listener anterior si existe
        secondaryButton.replaceWith(secondaryButton.cloneNode(true));
        const newSecondaryButton = tooltip.querySelector('[data-action="secondary"]') as HTMLButtonElement;
        if (newSecondaryButton && onSecondaryAction) {
          newSecondaryButton.addEventListener('click', (e) => {
            console.log('🟢 [TooltipProvider] Botón secondary clickeado');
            e.preventDefault();
            e.stopPropagation();
            onSecondaryAction();
          });
          console.log('🟢 [TooltipProvider] Event listener agregado a botón secondary');
        } else if (newSecondaryButton && !onSecondaryAction) {
          console.warn('🔴 [TooltipProvider] Botón secondary encontrado pero onSecondaryAction no está definido');
        }
      } else {
        console.warn('🔴 [TooltipProvider] Botón secondary no encontrado', {
          showSecondaryButton: options.showSecondaryButton,
          secondaryButtonLabel: options.secondaryButtonLabel
        });
      }
    }

    if (options.showTertiaryButton) {
      const tertiaryButton = tooltip.querySelector('[data-action="tertiary"]') as HTMLButtonElement;
      console.log('🟡 [TooltipProvider] Buscando botón tertiary', { 
        encontrado: !!tertiaryButton,
        showTertiaryButton: options.showTertiaryButton,
        tertiaryButtonLabel: options.tertiaryButtonLabel
      });
      if (tertiaryButton) {
        // Remover listener anterior si existe
        tertiaryButton.replaceWith(tertiaryButton.cloneNode(true));
        const newTertiaryButton = tooltip.querySelector('[data-action="tertiary"]') as HTMLButtonElement;
        if (newTertiaryButton && onTertiaryAction) {
          newTertiaryButton.addEventListener('click', (e) => {
            console.log('🟢 [TooltipProvider] Botón tertiary clickeado');
            e.preventDefault();
            e.stopPropagation();
            onTertiaryAction();
          });
          console.log('🟢 [TooltipProvider] Event listener agregado a botón tertiary');
        } else if (newTertiaryButton && !onTertiaryAction) {
          console.warn('🔴 [TooltipProvider] Botón tertiary encontrado pero onTertiaryAction no está definido');
        }
      } else {
        console.warn('🔴 [TooltipProvider] Botón tertiary no encontrado', {
          showTertiaryButton: options.showTertiaryButton,
          tertiaryButtonLabel: options.tertiaryButtonLabel
        });
      }
    }
  };

  // Función para centrar el tail del tooltip
  const centerTooltipTail = () => {
    const tailElement = tooltip.querySelector('.ubits-tooltip__tail') as HTMLElement;
    if (!tailElement) return;
    
    const tailPosition = options.tailPosition || 'top';
    const tailOffset = options.tailOffset || 0;
    const hasOffset = tailOffset !== 0;
    
    // Si no hay offset, remover todos los estilos inline y dejar que CSS maneje el centrado
    if (!hasOffset) {
      tailElement.style.removeProperty('left');
      tailElement.style.removeProperty('right');
      tailElement.style.removeProperty('top');
      tailElement.style.removeProperty('bottom');
      tailElement.style.removeProperty('transform');
      tailElement.style.removeProperty('margin-left');
      tailElement.style.removeProperty('margin-right');
    } else {
      // Si hay offset, mantener solo el transform con el offset
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        tailElement.style.left = '50%';
        tailElement.style.right = 'auto';
        tailElement.style.transform = `translateX(calc(-50% + ${tailOffset}px))`;
        if (tailPosition === 'bottom') {
          tailElement.style.transform += ' rotate(180deg)';
        }
      } else {
        tailElement.style.top = '50%';
        tailElement.style.bottom = 'auto';
        tailElement.style.transform = `translateY(calc(-50% + ${tailOffset}px))`;
      }
    }
    
    // Forzar reflow
    void tailElement.offsetHeight;
  };
  
  // Observar cambios en el tamaño del tooltip para recalcular el tail
  if (typeof ResizeObserver !== 'undefined') {
    try {
      const resizeObserver = new ResizeObserver(() => {
        centerTooltipTail();
      });
      resizeObserver.observe(tooltip);
      
      // Guardar referencia para poder desconectarlo después
      (tooltip as any)._tailResizeObserver = resizeObserver;
      
      // Centrar el tail inicialmente
      setTimeout(() => {
        centerTooltipTail();
      }, 50);
    } catch (error) {
      console.warn('⚠️ [TooltipProvider] Error al crear ResizeObserver:', error);
      // Centrar el tail de todas formas
      setTimeout(() => {
        centerTooltipTail();
      }, 50);
    }
  } else {
    // Si ResizeObserver no está disponible, centrar después de un delay
    setTimeout(() => {
      centerTooltipTail();
    }, 100);
  }
  
  // Actualizar destroy para limpiar el ResizeObserver
  const originalDestroy = destroy;
  destroy = () => {
    if ((tooltip as any)._tailResizeObserver) {
      (tooltip as any)._tailResizeObserver.disconnect();
      delete (tooltip as any)._tailResizeObserver;
    }
    originalDestroy();
  };

  // Agregar al DOM
  container.appendChild(tooltip);

  // IMPORTANTE: Asegurar que el posicionamiento inicial se aplique correctamente
  // antes de abrir el tooltip, usando requestAnimationFrame para que el DOM esté listo
  requestAnimationFrame(() => {
    // Re-aplicar posición inicial para asegurar que esté correcta
    if (position) {
      const tailPosition = options.tailPosition || 'top';
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        if (position.left !== undefined) {
          tooltip.style.left = `${position.left}px`;
          tooltip.style.transform = 'translateX(-50%)';
        }
        if (position.top !== undefined) {
          tooltip.style.top = `${position.top}px`;
        }
      }
    }
    
    // Configurar botones después de que el tooltip esté en el DOM
    setupButtons();
    
    // Abrir si está configurado para abrirse inicialmente
    // Hacerlo después de asegurar el posicionamiento
    if (open) {
      // Usar otro requestAnimationFrame para asegurar que el posicionamiento se haya aplicado
      requestAnimationFrame(() => {
        openTooltip();
      });
    }
  });

  return {
    element: tooltip,
    open: openTooltip,
    close: closeTooltip,
    updatePosition,
    destroy
  };
}

