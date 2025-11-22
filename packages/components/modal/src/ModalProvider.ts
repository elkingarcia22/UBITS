import type { ModalOptions } from './types/ModalOptions';

/**
 * Modal Provider
 * Componente modal centrado con overlay
 */

/**
 * Tamaños del modal usando tokens UBITS
 */
const MODAL_SIZES: Record<string, string> = {
  sm: 'calc(var(--ubits-spacing-12) * 4)',
  md: 'calc(var(--ubits-spacing-12) * 6)',
  lg: 'calc(var(--ubits-spacing-12) * 8)',
  xl: 'calc(var(--ubits-spacing-12) * 10)',
  full: 'calc(var(--ubits-spacing-12) * 16)'
};

/**
 * Renderiza el HTML de un Modal
 */
export function renderModal(options: ModalOptions): string {
  const {
    title,
    bodyContent = '',
    size = 'md',
    fullScreen = false,
    footerButtons,
    className = ''
  } = options;

  const modalWidth = MODAL_SIZES[size] || MODAL_SIZES.md;
  const modalSizeClass = `ubits-modal--size-${size}`;
  const fullScreenClass = fullScreen ? 'ubits-modal--full-screen' : '';

  // Construir clases
  const classes = [
    'ubits-modal',
    modalSizeClass,
    fullScreenClass,
    className
  ].filter(Boolean).join(' ');

  // Header HTML
  const headerHTML = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${title}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `;

  // Body HTML
  console.log('🔍 [Modal] renderModal - Procesando bodyContent:', {
    bodyContent: bodyContent,
    bodyContentType: typeof bodyContent,
    bodyContentLength: typeof bodyContent === 'string' ? bodyContent.length : 'N/A',
    bodyContentIsEmpty: typeof bodyContent === 'string' && bodyContent.trim() === ''
  });
  
  const bodyHTMLContent = typeof bodyContent === 'function' 
    ? bodyContent() 
    : bodyContent || '<div class="ubits-modal__placeholder">Contenido del modal</div>';

  console.log('🔍 [Modal] renderModal - bodyHTMLContent procesado:', {
    bodyHTMLContent: bodyHTMLContent,
    bodyHTMLContentType: typeof bodyHTMLContent,
    bodyHTMLContentLength: bodyHTMLContent?.length || 0,
    bodyHTMLContentIsEmpty: bodyHTMLContent?.trim() === ''
  });

  const bodyHTML = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `;
  
  console.log('🔍 [Modal] renderModal - bodyHTML generado:', {
    bodyHTML: bodyHTML,
    bodyHTMLLength: bodyHTML.length
  });

  // Footer HTML
  const footerHTML = footerButtons ? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${footerButtons.tertiary ? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.tertiary.label}</span>
          </button>
        </div>
        ` : ''}
        <div class="ubits-modal__footer-right">
          ${footerButtons.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.secondary.label}</span>
          </button>
          ` : ''}
          ${footerButtons.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.primary.label}</span>
          </button>
          ` : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Modal container HTML
  const modalHTML = `
    <div class="ubits-modal-overlay">
      <div class="${classes}" style="max-width: ${modalWidth};">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  
  console.log('🔍 [Modal] renderModal - INICIO');
  console.log('🔍 [Modal] Opciones recibidas:', {
    title,
    size,
    fullScreen,
    hasBodyContent: !!bodyContent,
    bodyContentType: typeof bodyContent,
    hasFooterButtons: !!footerButtons,
    footerButtonsCount: footerButtons ? Object.keys(footerButtons).length : 0
  });
  console.log('🔍 [Modal] Clases aplicadas:', classes);
  console.log('🔍 [Modal] Ancho del modal:', modalWidth);
  console.log('🔍 [Modal] Header HTML length:', headerHTML.length);
  console.log('🔍 [Modal] Body HTML length:', bodyHTML.length);
  console.log('🔍 [Modal] Footer HTML length:', footerHTML.length);
  console.log('🔍 [Modal] Modal HTML total length:', modalHTML.length);
  console.log('🔍 [Modal] renderModal - FIN');
  
  return modalHTML;
}

/**
 * Crea y renderiza un Modal en el DOM
 */
export function createModal(options: ModalOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updateContent: (content: string | (() => string)) => void;
} {
  const {
    containerId,
    onClose,
    closeOnOverlayClick = true,
    open = false
  } = options;

  // Crear contenedor si no existe
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Crear elemento del modal
  console.log('🔍 [Modal] createModal - INICIO');
  console.log('🔍 [Modal] Opciones recibidas:', {
    title: options.title,
    size: options.size,
    fullScreen: options.fullScreen,
    hasBodyContent: !!options.bodyContent,
    bodyContentType: typeof options.bodyContent,
    hasFooterButtons: !!options.footerButtons,
    containerId: options.containerId,
    closeOnOverlayClick: options.closeOnOverlayClick,
    open: options.open
  });
  
  const wrapper = document.createElement('div');
  const modalHTML = renderModal(options);
  console.log('🔍 [Modal] HTML generado (primeros 500 chars):', modalHTML.substring(0, 500));
  
  wrapper.innerHTML = modalHTML;
  const modalOverlay = wrapper.firstElementChild as HTMLElement;

  if (!modalOverlay) {
    console.error('❌ [Modal] No se pudo crear el modal - modalOverlay es null');
    throw new Error('No se pudo crear el modal');
  }
  
  console.log('✅ [Modal] modalOverlay creado:', {
    className: modalOverlay.className,
    childrenCount: modalOverlay.children.length
  });

  const modal = modalOverlay.querySelector('.ubits-modal') as HTMLElement;
  const closeButton = modalOverlay.querySelector('.ubits-modal__close') as HTMLButtonElement;
  const overlay = modalOverlay as HTMLElement;
  
  console.log('🔍 [Modal] Elementos encontrados:', {
    hasModal: !!modal,
    hasCloseButton: !!closeButton,
    hasOverlay: !!overlay,
    modalClassName: modal?.className,
    modalChildrenCount: modal?.children.length
  });
  
  // Verificar elementos internos
  if (modal) {
    const header = modal.querySelector('.ubits-modal__header');
    const body = modal.querySelector('.ubits-modal__body');
    const bodyContent = modal.querySelector('.ubits-modal__body-content');
    const footer = modal.querySelector('.ubits-modal__footer');
    
    console.log('🔍 [Modal] Elementos internos:', {
      hasHeader: !!header,
      hasBody: !!body,
      hasBodyContent: !!bodyContent,
      hasFooter: !!footer,
      headerHTML: header?.innerHTML?.substring(0, 200),
      bodyHTML: body?.innerHTML?.substring(0, 200),
      bodyContentHTML: bodyContent?.innerHTML?.substring(0, 200),
      bodyContentTextContent: bodyContent?.textContent?.substring(0, 200),
      bodyContentChildrenCount: bodyContent?.children.length || 0,
      footerHTML: footer?.innerHTML?.substring(0, 200)
    });
    
    // Verificar estilos aplicados
    if (bodyContent) {
      const computedStyle = window.getComputedStyle(bodyContent);
      console.log('🔍 [Modal] Estilos del bodyContent:', {
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        color: computedStyle.color,
        fontSize: computedStyle.fontSize,
        height: computedStyle.height,
        minHeight: computedStyle.minHeight,
        overflow: computedStyle.overflow,
        padding: computedStyle.padding
      });
    }
  }
  
  console.log('🔍 [Modal] createModal - FIN');

  // Funciones de control
  const openModal = () => {
    modalOverlay.classList.add('ubits-modal-overlay--open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('ubits-modal-overlay--open');
    document.body.style.overflow = '';
    if (onClose) {
      onClose();
    }
  };

  const updateContent = (content: string | (() => string)) => {
    const bodyContentElement = modalOverlay.querySelector('.ubits-modal__body-content');
    if (bodyContentElement) {
      const contentHTML = typeof content === 'function' ? content() : content;
      bodyContentElement.innerHTML = contentHTML;
    }
  };

  // Event listeners
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (closeOnOverlayClick && overlay) {
    overlay.addEventListener('click', (e) => {
      // Solo cerrar si se hace clic directamente en el overlay, no en el modal
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // Cerrar con ESC
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('ubits-modal-overlay--open')) {
      closeModal();
    }
  };
  document.addEventListener('keydown', handleEsc);

  // Agregar event listeners a los botones del footer
  if (options.footerButtons) {
    const tertiaryButton = modalOverlay.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button') as HTMLButtonElement;
    const secondaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--secondary') as HTMLButtonElement;
    const primaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--primary') as HTMLButtonElement;

    if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
      tertiaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.tertiary!.onClick!(e);
      });
    }

    if (secondaryButton && options.footerButtons.secondary?.onClick) {
      secondaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.secondary!.onClick!(e);
      });
    }

    if (primaryButton && options.footerButtons.primary?.onClick) {
      primaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.primary!.onClick!(e);
      });
    }
  }

  // Agregar al DOM
  container.appendChild(modalOverlay);

  // Abrir si está configurado para abrirse inicialmente
  if (open) {
    openModal();
  }

  return {
    element: modalOverlay,
    open: openModal,
    close: closeModal,
    updateContent
  };
}

