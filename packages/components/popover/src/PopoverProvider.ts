import type { PopoverOptions } from './types/PopoverOptions';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Popover Provider
 * Componente popover con tail (flecha) para mostrar información contextual
 */

/**
 * Anchos del popover en píxeles
 */
const POPOVER_WIDTHS: Record<string, string> = {
  sm: '240px',
  md: '360px',
  lg: '400px',
  xl: '480px'
};

/**
 * Renderiza el HTML de un Popover
 */
export function renderPopover(options: PopoverOptions): string {
  const {
    title,
    bodyContent = '',
    width = 'md',
    tailPosition = 'top',
    tailOffset = 0,
    footerButtons,
    className = ''
  } = options;

  const popoverWidth = POPOVER_WIDTHS[width] || POPOVER_WIDTHS.md;
  const popoverWidthClass = `ubits-popover--width-${width}`;
  const tailPositionClass = `ubits-popover--tail-${tailPosition}`;

  // Construir clases
  const classes = [
    'ubits-popover',
    popoverWidthClass,
    tailPositionClass,
    className
  ].filter(Boolean).join(' ');

  // Tail HTML (flecha) - siempre mostrar, la posición se controla con CSS
  const tailHTML = `
    <div class="ubits-popover__tail" style="${tailPosition === 'top' || tailPosition === 'bottom' ? `left: ${tailOffset ? `calc(50% + ${tailOffset}px)` : '50%'};` : `top: ${tailOffset ? `calc(50% + ${tailOffset}px)` : '50%'};`}">
      <div class="ubits-popover__tail-inner"></div>
    </div>
  `;

  // Header HTML (solo si hay título)
  const headerHTML = title ? `
    <div class="ubits-popover__header">
      <div class="ubits-popover__header-title">
        <p class="ubits-body-md-semibold">${title}</p>
      </div>
    </div>
  ` : '';

  // Body HTML
  const bodyHTMLContent = typeof bodyContent === 'function' 
    ? bodyContent() 
    : bodyContent || '<div class="ubits-popover__placeholder">Contenido del popover</div>';

  const bodyHTML = `
    <div class="ubits-popover__body">
      <div class="ubits-popover__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-popover__scrollbar">
        <div class="ubits-popover__scrollbar-bar"></div>
      </div>
    </div>
  `;

  // Footer HTML
  const footerHTML = footerButtons ? `
    <div class="ubits-popover__footer">
      <div class="ubits-popover__footer-actions${!footerButtons.tertiary ? ' ubits-popover__footer-actions--no-tertiary' : ''}">
        ${footerButtons.tertiary ? `
        <div class="ubits-popover__footer-left">
          ${renderButton({
            variant: 'tertiary',
            size: 'md',
            text: footerButtons.tertiary.label,
            className: 'ubits-popover__footer-button'
          })}
        </div>
        ` : ''}
        <div class="ubits-popover__footer-right">
          ${footerButtons.secondary ? renderButton({
            variant: 'secondary',
            size: 'md',
            text: footerButtons.secondary.label,
            className: 'ubits-popover__footer-button'
          }) : ''}
          ${footerButtons.primary ? renderButton({
            variant: 'primary',
            size: 'md',
            text: footerButtons.primary.label,
            className: 'ubits-popover__footer-button'
          }) : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Popover container HTML
  return `
    <div class="${classes}" style="width: ${popoverWidth};" data-ubits-id="🧩-ux-popover">
      ${tailHTML}
      <div class="ubits-popover__content">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Popover en el DOM
 */
export function createPopover(options: PopoverOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updateContent: (content: string | (() => string)) => void;
  updatePosition: (position: { top?: number; left?: number; right?: number; bottom?: number }) => void;
  destroy: () => void;
} {
  const {
    containerId,
    onClose,
    closeOnOutsideClick = true,
    open = false,
    position,
    referenceElement
  } = options;

  // Crear contenedor si no existe
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Crear elemento del popover
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderPopover(options);
  const popover = wrapper.firstElementChild as HTMLElement;

  if (!popover) {
    throw new Error('No se pudo crear el popover');
  }

  // Agregar data-ubits-id si no está presente
  if (!popover.hasAttribute('data-ubits-id')) {
    popover.setAttribute('data-ubits-id', '🧩-ux-popover');
  }

  // Aplicar posición inicial si se proporciona
  if (position) {
    popover.style.position = 'fixed';
    const tailPosition = options.tailPosition || 'top';
    
    // Aplicar transform según la posición del tail
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      // Centrar horizontalmente (debajo o arriba del botón)
      if (position.left !== undefined) {
        popover.style.left = `${position.left}px`;
        popover.style.transform = 'translateX(-50%)';
      }
      if (position.top !== undefined) {
        popover.style.top = `${position.top}px`;
      }
    } else if (tailPosition === 'left') {
      // Popover a la derecha del botón, tail izquierda apuntando al botón
      // Centrar verticalmente
      if (position.top !== undefined) {
        popover.style.top = `${position.top}px`;
        popover.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        popover.style.left = `${position.left}px`;
      }
    } else if (tailPosition === 'right') {
      // Popover a la izquierda del botón, tail derecha apuntando al botón
      // Centrar verticalmente
      if (position.top !== undefined) {
        popover.style.top = `${position.top}px`;
        popover.style.transform = 'translateY(-50%)';
      }
      if (position.left !== undefined) {
        popover.style.left = `${position.left}px`;
      }
    }
  }

  // Funciones de control
  const openPopover = () => {
    popover.classList.add('ubits-popover--open');
    
    // El posicionamiento ya se aplicó al crear el elemento, solo asegurar que está correcto
    if (position) {
      popover.style.position = 'fixed';
      const tailPosition = options.tailPosition || 'top';
      
      // Obtener dimensiones del popover después de que esté visible
      const popoverRect = popover.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Espacio necesario para el tail (9px) + padding de seguridad (8px)
      const tailSpace = 17;
      
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        // Centrar horizontalmente (debajo o arriba del botón)
        if (position.left !== undefined) {
          let leftPos = position.left;
          // Asegurar que no se salga por la izquierda o derecha
          const halfWidth = popoverRect.width / 2;
          if (leftPos - halfWidth < 0) {
            leftPos = halfWidth;
          } else if (leftPos + halfWidth > viewportWidth) {
            leftPos = viewportWidth - halfWidth;
          }
          popover.style.left = `${leftPos}px`;
          popover.style.transform = 'translateX(-50%)';
        }
        if (position.top !== undefined) {
          let topPos = position.top;
          
          // Si el tail está arriba, asegurar que haya espacio suficiente
          if (tailPosition === 'top' && topPos < tailSpace) {
            topPos = tailSpace;
          }
          // Si el tail está abajo, asegurar que el popover no se salga por abajo
          else if (tailPosition === 'bottom') {
            const popoverBottom = topPos + popoverRect.height + tailSpace;
            if (popoverBottom > viewportHeight) {
              topPos = viewportHeight - popoverRect.height - tailSpace;
            }
          }
          
          popover.style.top = `${topPos}px`;
        }
      } else if (tailPosition === 'left') {
        // Popover a la derecha del botón, tail izquierda apuntando al botón
        // Centrar verticalmente
        if (position.top !== undefined) {
          let topPos = position.top;
          const halfHeight = popoverRect.height / 2;
          // Asegurar que no se salga por arriba o abajo
          if (topPos - halfHeight < tailSpace) {
            topPos = halfHeight + tailSpace;
          } else if (topPos + halfHeight > viewportHeight - tailSpace) {
            topPos = viewportHeight - halfHeight - tailSpace;
          }
          popover.style.top = `${topPos}px`;
          popover.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          let leftPos = position.left;
          // Asegurar que no se salga por la izquierda (el tail necesita espacio)
          if (leftPos < tailSpace) {
            leftPos = tailSpace;
          }
          popover.style.left = `${leftPos}px`;
        }
      } else if (tailPosition === 'right') {
        // Popover a la izquierda del botón, tail derecha apuntando al botón
        // Centrar verticalmente
        if (position.top !== undefined) {
          let topPos = position.top;
          const halfHeight = popoverRect.height / 2;
          // Asegurar que no se salga por arriba o abajo
          if (topPos - halfHeight < tailSpace) {
            topPos = halfHeight + tailSpace;
          } else if (topPos + halfHeight > viewportHeight - tailSpace) {
            topPos = viewportHeight - halfHeight - tailSpace;
          }
          popover.style.top = `${topPos}px`;
          popover.style.transform = 'translateY(-50%)';
        }
        if (position.left !== undefined) {
          let leftPos = position.left;
          // Asegurar que no se salga por la derecha (el tail necesita espacio)
          const popoverRight = leftPos + popoverRect.width + tailSpace;
          if (popoverRight > viewportWidth) {
            leftPos = viewportWidth - popoverRect.width - tailSpace;
          }
          popover.style.left = `${leftPos}px`;
        }
      }
    } else if (referenceElement) {
      // Posicionar relativo al elemento de referencia
      const rect = referenceElement.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const tailPosition = options.tailPosition || 'top';
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const tailSpace = 17;
      
      popover.style.position = 'fixed';
      
      // Calcular posición según tailPosition
      let topPos: number;
      let leftPos: number;
      
      if (tailPosition === 'top') {
        // Popover debajo del elemento, tail arriba
        topPos = rect.bottom + 8;
        // Asegurar que haya espacio para el tail arriba
        if (topPos - popoverRect.height - tailSpace < 0) {
          topPos = popoverRect.height + tailSpace;
        }
        leftPos = rect.left + (rect.width / 2);
      } else if (tailPosition === 'bottom') {
        // Popover arriba del elemento, tail abajo
        topPos = rect.top - popoverRect.height - 8;
        // Asegurar que no se salga por arriba
        if (topPos < tailSpace) {
          topPos = tailSpace;
        }
        leftPos = rect.left + (rect.width / 2);
      } else if (tailPosition === 'left') {
        // Popover a la derecha del elemento, tail izquierda
        topPos = rect.top + (rect.height / 2);
        leftPos = rect.right + 8;
        // Asegurar que no se salga por la izquierda
        if (leftPos < tailSpace) {
          leftPos = tailSpace;
        }
      } else {
        // tailPosition === 'right'
        // Popover a la izquierda del elemento, tail derecha
        topPos = rect.top + (rect.height / 2);
        leftPos = rect.left - popoverRect.width - 8;
        // Asegurar que no se salga por la derecha
        const popoverRight = leftPos + popoverRect.width + tailSpace;
        if (popoverRight > viewportWidth) {
          leftPos = viewportWidth - popoverRect.width - tailSpace;
        }
      }
      
      // Ajustar horizontalmente si se sale del viewport
      const halfWidth = popoverRect.width / 2;
      if (leftPos - halfWidth < 0) {
        leftPos = halfWidth;
      } else if (leftPos + halfWidth > viewportWidth) {
        leftPos = viewportWidth - halfWidth;
      }
      
      // Ajustar verticalmente si se sale del viewport
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        if (topPos + popoverRect.height > viewportHeight) {
          topPos = viewportHeight - popoverRect.height - (tailPosition === 'bottom' ? tailSpace : 0);
        }
      } else {
        const halfHeight = popoverRect.height / 2;
        if (topPos - halfHeight < tailSpace) {
          topPos = halfHeight + tailSpace;
        } else if (topPos + halfHeight > viewportHeight - tailSpace) {
          topPos = viewportHeight - halfHeight - tailSpace;
        }
      }
      
      popover.style.top = `${topPos}px`;
      popover.style.left = `${leftPos}px`;
      
      // Aplicar transform según tailPosition
      if (tailPosition === 'top' || tailPosition === 'bottom') {
        popover.style.transform = 'translateX(-50%)';
      } else {
        popover.style.transform = 'translateY(-50%)';
      }
    }
  };

  const closePopover = () => {
    popover.classList.remove('ubits-popover--open');
    if (onClose) {
      onClose();
    }
  };

  const updateContent = (content: string | (() => string)) => {
    const bodyContentElement = popover.querySelector('.ubits-popover__body-content');
    if (bodyContentElement) {
      const contentHTML = typeof content === 'function' ? content() : content;
      bodyContentElement.innerHTML = contentHTML;
    }
  };

  const updatePosition = (newPosition: { top?: number; left?: number; right?: number; bottom?: number }) => {
    const tailPosition = options.tailPosition || 'top';
    
    if (newPosition.top !== undefined) popover.style.top = `${newPosition.top}px`;
    if (newPosition.left !== undefined) popover.style.left = `${newPosition.left}px`;
    if (newPosition.right !== undefined) popover.style.right = `${newPosition.right}px`;
    if (newPosition.bottom !== undefined) popover.style.bottom = `${newPosition.bottom}px`;
    
    // Mantener el transform correcto según tailPosition
    if (tailPosition === 'top' || tailPosition === 'bottom') {
      // Centrar horizontalmente
      if (newPosition.left !== undefined) {
        popover.style.transform = 'translateX(-50%)';
      }
    } else if (tailPosition === 'left' || tailPosition === 'right') {
      // Centrar verticalmente
      if (newPosition.top !== undefined) {
        popover.style.transform = 'translateY(-50%)';
      }
    }
  };

  let destroy = () => {
    if (popover.parentElement) {
      popover.parentElement.removeChild(popover);
    }
  };

  // Event listeners
  if (closeOnOutsideClick) {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // No cerrar si el click es en el botón que abre el popover o dentro del popover
      if (popover.classList.contains('ubits-popover--open') && !popover.contains(target)) {
        // Verificar si el click fue en un elemento que abre el popover
        const clickedElement = target as HTMLElement;
        const isTriggerButton = clickedElement.closest && clickedElement.closest('[data-popover-trigger]');
        
        if (!isTriggerButton) {
          closePopover();
        }
      }
    };
    
    // Usar capture phase para detectar antes que otros handlers
    document.addEventListener('click', handleClickOutside, true);
    
    // Limpiar listener al destruir
    const originalDestroy = destroy;
    destroy = () => {
      document.removeEventListener('click', handleClickOutside, true);
      originalDestroy();
    };
  }

  // Agregar event listeners a los botones del footer
  if (options.footerButtons) {
    const tertiaryButton = popover.querySelector('.ubits-popover__footer-left .ubits-popover__footer-button') as HTMLButtonElement;
    const secondaryButton = popover.querySelector('.ubits-popover__footer-right .ubits-button--secondary.ubits-popover__footer-button') as HTMLButtonElement;
    const primaryButton = popover.querySelector('.ubits-popover__footer-right .ubits-button--primary.ubits-popover__footer-button') as HTMLButtonElement;

    if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
      tertiaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        options.footerButtons!.tertiary!.onClick!(e);
      });
    }

    if (secondaryButton && options.footerButtons.secondary?.onClick) {
      secondaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        options.footerButtons!.secondary!.onClick!(e);
      });
    }

    if (primaryButton && options.footerButtons.primary?.onClick) {
      primaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        options.footerButtons!.primary!.onClick!(e);
      });
    }
  }

  // Agregar al DOM
  container.appendChild(popover);

  // Abrir si está configurado para abrirse inicialmente
  if (open) {
    openPopover();
  }

  return {
    element: popover,
    open: openPopover,
    close: closePopover,
    updateContent,
    updatePosition,
    destroy
  };
}

