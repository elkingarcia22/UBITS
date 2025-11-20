/**
 * HeaderSectionProvider
 * Lógica de renderizado del componente HeaderSection
 * Genera HTML según las opciones proporcionadas
 */

import { HeaderSectionOptions, HeaderSectionAction } from './types/HeaderSectionOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { createTooltip } from '../../tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../tooltip/src/types/TooltipOptions';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un HeaderSection UBITS como HTML string
 */
export function renderHeaderSection(options: HeaderSectionOptions): string {
  const {
    title = '',
    showTitle = true,
    showBackButton = false,
    showInfoButton = false,
    showStatusTag = false,
    statusTag,
    actions = [],
    showActions = true,
    className = ''
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-header-section',
    className
  ].filter(Boolean).join(' ');

  // Renderizar botón de atrás (secundario md)
  const backButtonHTML = showBackButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        icon: 'arrow-left',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-back-button': 'true',
          'aria-label': 'Volver'
        }
      })
    : '';

  // Renderizar botón de información
  const infoButtonHTML = showInfoButton
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'circle-info',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-info-button': 'true',
          'aria-label': 'Información'
        }
      })
    : '';

  // Renderizar título con botón de información y status tag
  let titleHTML = '';
  if (showTitle && title) {
    const statusTagHTML = showStatusTag && statusTag
      ? renderStatusTag({
          ...statusTag,
          size: statusTag.size || 'sm',
          rightIcon: null // Ocultar icono derecho
        })
      : '';
    
    titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        <div class="ubits-header-section__title-group">
          <h2 class="ubits-heading-h2">${title}</h2>
          ${infoButtonHTML}
          ${statusTagHTML ? `<div class="ubits-header-section__status-tag-wrapper">${statusTagHTML}</div>` : ''}
        </div>
      </div>
    `;
  } else if (showBackButton || showInfoButton) {
    // Si no hay título pero sí botón de atrás o info, mostrarlos
    titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        ${infoButtonHTML}
      </div>
    `;
  }

  // Renderizar botón secundario adicional
  const showSecondaryButton = options.showSecondaryButton || false;
  const secondaryButtonHTML = showSecondaryButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        text: options.secondaryButtonText || '',
        icon: options.secondaryButtonIcon,
        iconStyle: 'regular',
        attributes: {
          'data-secondary-button': 'true',
          'aria-label': options.secondaryButtonText || 'Botón secundario'
        }
      })
    : '';

  // Renderizar botón de opciones (3 puntos horizontales)
  const showOptionsButton = options.showOptionsButton || false;
  const optionsButtonHTML = showOptionsButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        icon: 'ellipsis',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-options-button': 'true',
          'aria-label': 'Más opciones'
        }
      })
    : '';

  // Renderizar acciones
  let actionsHTML = '';
  if (showActions && actions.length > 0) {
    const actionsButtons = actions.map(action => {
      const buttonOptions = {
        ...action,
        size: 'md' as const, // Forzar tamaño md para acciones
        text: action.text,
        onClick: action.onClick
      };
      return renderButton(buttonOptions);
    }).join('');
    
    actionsHTML = `
      <div class="ubits-header-section__actions">
        ${secondaryButtonHTML}
        ${actionsButtons}
        ${optionsButtonHTML}
      </div>
    `;
  } else if (showSecondaryButton || showOptionsButton) {
    // Si no hay acciones pero sí botones adicionales, mostrarlos
    actionsHTML = `
      <div class="ubits-header-section__actions">
        ${secondaryButtonHTML}
        ${optionsButtonHTML}
      </div>
    `;
  }

  // HTML completo
  const html = `
    <div class="${classes}">
      ${titleHTML}
      ${actionsHTML}
    </div>
  `;

  return html.trim();
}

/**
 * Crea e inicializa el componente HeaderSection en el DOM
 */
export function createHeaderSection(options: HeaderSectionOptions): HTMLElement | null {
  const {
    containerId,
    container: providedContainer,
    title,
    showTitle = true,
    showBackButton = false,
    showInfoButton = false,
    infoTooltipText = '',
    showStatusTag = false,
    statusTag,
    actions = [],
    showActions = true,
    showSecondaryButton = false,
    showOptionsButton = false,
    onBackClick,
    onInfoClick,
    onSecondaryButtonClick,
    onOptionsClick
  } = options;

  // Obtener contenedor
  let container: HTMLElement | null = null;
  if (providedContainer) {
    container = providedContainer;
  } else if (containerId) {
    container = document.getElementById(containerId);
  }

  if (!container) {
    console.error('HeaderSection: Contenedor no encontrado');
    return null;
  }

  // Renderizar HTML
  const html = renderHeaderSection({
    ...options,
    container: undefined, // No pasar container al render
    containerId: undefined
  });
  container.innerHTML = html;

  const headerElement = container.querySelector('.ubits-header-section');
  if (!headerElement) {
    console.error('HeaderSection: Elemento no encontrado después de renderizar');
    return null;
  }

  // Inicializar botón de atrás
  if (showBackButton) {
    const backButton = headerElement.querySelector('[data-back-button="true"]') as HTMLElement;
    if (backButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = backButton.closest('button') || backButton;
      if (actualButton && onBackClick) {
        actualButton.addEventListener('click', onBackClick);
      }
    }
  }

  // Inicializar botón de información con tooltip
  if (showInfoButton && infoTooltipText) {
    const infoButton = headerElement.querySelector('[data-info-button="true"]') as HTMLElement;
    if (infoButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = infoButton.closest('button') || infoButton;
      
      let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
      let isTooltipOpen = false;

      const updateTooltipPosition = () => {
        if (!tooltipInstance || !isTooltipOpen) return;
        
        const rect = actualButton.getBoundingClientRect();
        const tooltipElement = tooltipInstance.element;
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        // Calcular posición: tooltip justo encima del botón
        const tooltipLeft = rect.left + (rect.width / 2);
        const tooltipTop = rect.top - tooltipRect.height - 8; // 8px de espacio arriba
        
        tooltipInstance.updatePosition({
          top: tooltipTop,
          left: tooltipLeft
        });
      };

      const openTooltip = () => {
        if (!tooltipInstance) {
          const rect = actualButton.getBoundingClientRect();
          
          // Crear tooltip con posición inicial estimada
          tooltipInstance = createTooltip({
            description: infoTooltipText,
            showDescription: true,
            showTitle: false,
            showPrimaryButton: false,
            showSecondaryButton: false,
            showTertiaryButton: false,
            width: 'sm',
            tailPosition: 'bottom', // Tail apunta hacia abajo (tooltip arriba)
            position: {
              left: rect.left + (rect.width / 2),
              top: rect.top - 200 // Posición temporal, se ajustará después
            },
            closeOnOutsideClick: true,
            onClose: () => {
              isTooltipOpen = false;
              // Remover clase active al cerrar
              actualButton.classList.remove('ubits-button--active');
            }
          });

          // Esperar a que el tooltip se renderice para obtener su altura real
          requestAnimationFrame(() => {
            updateTooltipPosition();
          });
        }
        
        tooltipInstance.open();
        isTooltipOpen = true;
        // Agregar clase active cuando el tooltip está abierto
        actualButton.classList.add('ubits-button--active');
        updateTooltipPosition();
      };

      const closeTooltip = () => {
        if (tooltipInstance && isTooltipOpen) {
          tooltipInstance.close();
          isTooltipOpen = false;
          // Remover clase active al cerrar
          actualButton.classList.remove('ubits-button--active');
        }
      };

      // Click en el botón de información
      actualButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isTooltipOpen) {
          closeTooltip();
        } else {
          openTooltip();
        }
        
        if (onInfoClick) {
          onInfoClick(e);
        }
      });

      // Cerrar tooltip al hacer click fuera
      document.addEventListener('click', (e) => {
        if (isTooltipOpen && tooltipInstance && 
            !actualButton.contains(e.target as Node) && 
            !tooltipInstance.element.contains(e.target as Node)) {
          closeTooltip();
        }
      });

      // Mantener posición del tooltip al hacer scroll o resize
      let scrollTimeout: number | null = null;
      const handleScroll = () => {
        if (scrollTimeout) {
          cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(() => {
          if (isTooltipOpen) {
            updateTooltipPosition();
          }
        });
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      // Limpiar listeners al destruir el componente
      const originalDestroy = () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
        if (tooltipInstance) {
          tooltipInstance.destroy();
          tooltipInstance = null;
        }
      };

      // Guardar referencia para limpieza si es necesario
      (headerElement as any).__headerSectionCleanup = originalDestroy;
    }
  }

  // Inicializar status tag
  if (showStatusTag && statusTag) {
    const statusTagElement = headerElement.querySelector('.ubits-status-tag') as HTMLElement;
    if (statusTagElement && statusTag.onClick) {
      statusTagElement.addEventListener('click', statusTag.onClick);
      statusTagElement.style.cursor = 'pointer';
    }
  }

  // Inicializar event listeners para las acciones
  if (showActions && actions.length > 0) {
    const actionButtons = headerElement.querySelectorAll('.ubits-header-section__actions .ubits-button:not([data-options-button="true"]):not([data-secondary-button="true"])');
    actionButtons.forEach((button, index) => {
      const action = actions[index];
      if (action && action.onClick) {
        button.addEventListener('click', action.onClick);
      }
    });
  }

  // Inicializar botón secundario adicional
  if (showSecondaryButton) {
    const secondaryButton = headerElement.querySelector('[data-secondary-button="true"]') as HTMLElement;
    if (secondaryButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = secondaryButton.closest('button') || secondaryButton;
      if (actualButton && onSecondaryButtonClick) {
        actualButton.addEventListener('click', onSecondaryButtonClick);
      }
    }
  }

  // Inicializar botón de opciones
  if (showOptionsButton) {
    const optionsButton = headerElement.querySelector('[data-options-button="true"]') as HTMLElement;
    if (optionsButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = optionsButton.closest('button') || optionsButton;
      if (actualButton && onOptionsClick) {
        actualButton.addEventListener('click', onOptionsClick);
      }
    }
  }

  return headerElement as HTMLElement;
}

