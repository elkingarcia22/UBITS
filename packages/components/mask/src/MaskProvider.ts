import type { MaskOptions } from './types/MaskOptions';
import { renderPopover, createPopover } from '../../popover/src/PopoverProvider';
import './styles/mask.css';

/**
 * Mask Provider
 * Componente de máscara para onboarding que destaca elementos con un overlay oscuro
 */

/**
 * Calcula la posición del elemento objetivo y actualiza las capas de la máscara
 */
function updateMaskLayers(
  overlay: HTMLElement,
  targetElement: HTMLElement,
  padding: number,
  savedRect?: DOMRect | null
): { top: number; left: number; width: number; height: number } {
  // Usar la posición guardada si está disponible (para evitar que el elemento se mueva)
  // Si no hay posición guardada, calcularla normalmente
  const rect = savedRect || targetElement.getBoundingClientRect();
  
  console.log('🎯 [Mask] updateMaskLayers llamado:');
  console.log('   usandoPosicionGuardada:', !!savedRect);
  console.log('   rect.top:', rect.top);
  console.log('   rect.left:', rect.left);
  console.log('   rect.width:', rect.width);
  console.log('   rect.height:', rect.height);
  console.log('   padding:', padding);
  
  // Cuando el body está fixed, usamos las coordenadas del viewport directamente
  // sin agregar scroll porque el body ya está posicionado
  const isBodyFixed = document.body.style.position === 'fixed';
  const scrollTop = isBodyFixed ? 0 : (window.pageYOffset || document.documentElement.scrollTop);
  const scrollLeft = isBodyFixed ? 0 : (window.pageXOffset || document.documentElement.scrollLeft);

  // Calcular posición con padding (usando coordenadas del viewport)
  const top = rect.top - padding;
  const left = rect.left - padding;
  const width = rect.width + (padding * 2);
  const height = rect.height + (padding * 2);
  
  console.log('📐 [Mask] Posición calculada para highlight:');
  console.log('   top:', top);
  console.log('   left:', left);
  console.log('   width:', width);
  console.log('   height:', height);
  console.log('   isBodyFixed:', isBodyFixed);
  console.log('   scrollTop:', scrollTop);
  console.log('   scrollLeft:', scrollLeft);

  // Obtener dimensiones de la ventana
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Actualizar capas
  const topLayer = overlay.querySelector('.ubits-mask-layer--top') as HTMLElement;
  const bottomLayer = overlay.querySelector('.ubits-mask-layer--bottom') as HTMLElement;
  const leftLayer = overlay.querySelector('.ubits-mask-layer--left') as HTMLElement;
  const rightLayer = overlay.querySelector('.ubits-mask-layer--right') as HTMLElement;
  const highlight = overlay.querySelector('.ubits-mask-highlight') as HTMLElement;

  if (topLayer) {
    const topHeight = Math.max(0, top);
    topLayer.style.height = `${topHeight}px`;
  }

  if (bottomLayer) {
    const bottomTop = top + height;
    const bottomHeight = Math.max(0, windowHeight - bottomTop);
    bottomLayer.style.top = `${bottomTop}px`;
    bottomLayer.style.height = `${bottomHeight}px`;
  }

  if (leftLayer) {
    const leftWidth = Math.max(0, left);
    leftLayer.style.top = `${Math.max(0, top)}px`;
    leftLayer.style.width = `${leftWidth}px`;
    leftLayer.style.height = `${height}px`;
  }

  if (rightLayer) {
    const rightLeft = left + width;
    const rightWidth = Math.max(0, windowWidth - rightLeft);
    rightLayer.style.top = `${Math.max(0, top)}px`;
    rightLayer.style.left = `${rightLeft}px`;
    rightLayer.style.width = `${rightWidth}px`;
    rightLayer.style.height = `${height}px`;
  }

  if (highlight) {
    highlight.style.top = `${top}px`;
    highlight.style.left = `${left}px`;
    highlight.style.width = `${width}px`;
    highlight.style.height = `${height}px`;
  }

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  };
}

/**
 * Calcula la posición óptima del popover relativo al elemento destacado
 */
function calculatePopoverPosition(
  targetRect: { top: number; left: number; width: number; height: number },
  popoverWidth: number,
  popoverHeight: number,
  position: 'auto' | 'top' | 'bottom' | 'left' | 'right',
  offset: number
): { top: number; left: number; tailPosition: 'top' | 'bottom' | 'left' | 'right' } {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const centerX = targetRect.left + targetRect.width / 2;
  const centerY = targetRect.top + targetRect.height / 2;

  let finalPosition = position;
  let top = 0;
  let left = 0;
  let tailPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  if (position === 'auto') {
    // Determinar automáticamente la mejor posición
    const spaceTop = targetRect.top;
    const spaceBottom = windowHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = windowWidth - targetRect.right;

    if (spaceBottom >= popoverHeight + offset && spaceBottom >= spaceTop) {
      finalPosition = 'bottom';
    } else if (spaceTop >= popoverHeight + offset) {
      finalPosition = 'top';
    } else if (spaceRight >= popoverWidth + offset) {
      finalPosition = 'right';
    } else if (spaceLeft >= popoverWidth + offset) {
      finalPosition = 'left';
    } else {
      // Por defecto, abajo
      finalPosition = 'bottom';
    }
  }

  switch (finalPosition) {
    case 'top':
      tailPosition = 'bottom';
      top = targetRect.top - popoverHeight - offset;
      left = centerX;
      break;
    case 'bottom':
      tailPosition = 'top';
      top = targetRect.bottom + offset;
      left = centerX;
      break;
    case 'left':
      tailPosition = 'right';
      top = centerY;
      left = targetRect.left - popoverWidth - offset;
      break;
    case 'right':
      tailPosition = 'left';
      top = centerY;
      left = targetRect.right + offset;
      break;
  }

  return { top, left, tailPosition };
}

/**
 * Renderiza el HTML de un Mask
 */
export function renderMask(options: MaskOptions): string {
  const { className = '' } = options;

  const classes = [
    'ubits-mask-overlay',
    className
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}">
      <div class="ubits-mask-layer ubits-mask-layer--top"></div>
      <div class="ubits-mask-layer ubits-mask-layer--bottom"></div>
      <div class="ubits-mask-layer ubits-mask-layer--left"></div>
      <div class="ubits-mask-layer ubits-mask-layer--right"></div>
      <div class="ubits-mask-highlight"></div>
      <div class="ubits-mask-popover-container"></div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Mask en el DOM
 */
export function createMask(options: MaskOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updateTarget: (newTarget: string | HTMLElement) => void;
  destroy: () => void;
} {
  const {
    containerId,
    targetElement: initialTarget,
    popover: popoverOptions,
    padding = 8,
    closeOnOverlayClick = true,
    onClose,
    open = false,
    popoverPosition = 'auto',
    popoverOffset = 12
  } = options;

  // Crear contenedor si no existe
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Crear elemento de la máscara
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderMask(options);
  const overlay = wrapper.firstElementChild as HTMLElement;

  if (!overlay) {
    throw new Error('No se pudo crear la máscara');
  }

  // Función para obtener el elemento objetivo
  const getTargetElement = (): HTMLElement | null => {
    if (typeof initialTarget === 'string') {
      return document.querySelector(initialTarget) as HTMLElement;
    } else {
      return initialTarget;
    }
  };

  // Obtener el elemento objetivo (puede ser null si aún no está en el DOM)
  let targetElement: HTMLElement | null = getTargetElement();

  // Contenedor del popover
  const popoverContainer = overlay.querySelector('.ubits-mask-popover-container') as HTMLElement;
  let popoverInstance: ReturnType<typeof createPopover> | null = null;
  
  // Guardar el scroll actual para restaurarlo al cerrar
  let savedScrollY = 0;
  let savedScrollX = 0;
  
  // Guardar la posición del elemento objetivo antes de aplicar position: fixed
  let savedTargetRect: DOMRect | null = null;

  // Función para actualizar la posición de la máscara
  const updateMaskPosition = () => {
    if (!targetElement) return;

    // En resize, recalcular la posición en lugar de usar la guardada
    // Para que la máscara siga al elemento si se mueve
    const shouldRecalculate = !savedTargetRect;
    const rectToUse = shouldRecalculate ? targetElement.getBoundingClientRect() : savedTargetRect;
    
    console.log('🔄 [Mask] updateMaskPosition:', {
      shouldRecalculate,
      usandoPosicionGuardada: !shouldRecalculate
    });
    
    const targetRect = updateMaskLayers(overlay, targetElement, padding, rectToUse);

    // Actualizar posición del popover si existe
    if (popoverInstance && popoverContainer) {
      const popoverElement = popoverInstance.element;
      const popoverRect = popoverElement.getBoundingClientRect();
      const position = calculatePopoverPosition(
        targetRect,
        popoverRect.width || 360,
        popoverRect.height || 200,
        popoverPosition,
        popoverOffset
      );

      popoverInstance.updatePosition({
        top: position.top,
        left: position.left
      });

      // Actualizar tailPosition si es necesario
      if (popoverOptions.tailPosition !== position.tailPosition) {
        // Recrear el popover con la nueva posición del tail
        if (popoverInstance) {
          popoverInstance.destroy();
        }
        popoverInstance = createPopover({
          ...popoverOptions,
          tailPosition: position.tailPosition,
          position: {
            top: position.top,
            left: position.left
          },
          open: true
        });
        popoverContainer.appendChild(popoverInstance.element);
      }
    }
  };

  // Crear popover
  const createPopoverInstance = () => {
    if (!targetElement || !popoverContainer) return;

    const targetRect = targetElement.getBoundingClientRect();
    const position = calculatePopoverPosition(
      { top: targetRect.top, left: targetRect.left, width: targetRect.width, height: targetRect.height },
      360, // Ancho estimado
      200, // Alto estimado
      popoverPosition,
      popoverOffset
    );

    popoverInstance = createPopover({
      ...popoverOptions,
      tailPosition: position.tailPosition,
      position: {
        top: position.top,
        left: position.left
      },
      open: true,
      onClose: () => {
        if (popoverOptions.onClose) {
          popoverOptions.onClose();
        }
        closeMask();
      }
    });

    popoverContainer.appendChild(popoverInstance.element);

    // Actualizar posición después de que el popover se renderice
    requestAnimationFrame(() => {
      updateMaskPosition();
    });
  };

  // Funciones de control
  const openMask = () => {
    // Buscar el elemento objetivo cada vez que se abre (por si aún no está en el DOM)
    targetElement = getTargetElement();

    if (!targetElement) {
      console.error('❌ [Mask] No se encontró el elemento objetivo al abrir:', initialTarget);
      return;
    }

    console.log('🔍 [Mask] ========== INICIO openMask ==========');
    
    // Guardar el scroll actual antes de ocultar el overflow
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    savedScrollX = window.scrollX || window.pageXOffset || 0;
    console.log('📜 [Mask] Scroll guardado:', `Y=${savedScrollY}, X=${savedScrollX}`);

    // Calcular el ancho del scrollbar ANTES de ocultarlo
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    console.log('📏 [Mask] Scrollbar width:', scrollbarWidth);

    // IMPORTANTE: Guardar la posición del elemento objetivo ANTES de aplicar cualquier cambio al body
    const rectBefore = targetElement.getBoundingClientRect();
    console.log('📍 [Mask] Posición ANTES de cambios al body:');
    console.log('   top:', rectBefore.top);
    console.log('   left:', rectBefore.left);
    console.log('   width:', rectBefore.width);
    console.log('   height:', rectBefore.height);
    console.log('   right:', rectBefore.right);
    console.log('   bottom:', rectBefore.bottom);
    
    overlay.classList.add('ubits-mask-overlay--open');
    
    // Ocultar overflow pero compensar el desplazamiento para evitar que el elemento se mueva
    console.log('🎨 [Mask] Aplicando estilos al body...');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = `-${savedScrollX}px`;
    document.body.style.width = '100%';
    
    // Compensar el scrollbar width aplicando paddingRight al body
    // Esto previene el desplazamiento causado por la desaparición del scrollbar
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Esperar a que el reflow se complete y luego guardar la posición real
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rectAfter = targetElement!.getBoundingClientRect();
        console.log('📍 [Mask] Posición DESPUÉS de cambios al body:');
        console.log('   top:', rectAfter.top);
        console.log('   left:', rectAfter.left);
        console.log('   width:', rectAfter.width);
        console.log('   height:', rectAfter.height);
        console.log('   right:', rectAfter.right);
        console.log('   bottom:', rectAfter.bottom);
        
        const topDiff = rectAfter.top - rectBefore.top;
        const leftDiff = rectAfter.left - rectBefore.left;
        const rightDiff = rectAfter.right - rectBefore.right;
        console.log('📊 [Mask] Diferencia de posición:');
        console.log('   topDiff:', topDiff, topDiff !== 0 ? '⚠️ SE MOVIÓ' : '✅ OK');
        console.log('   leftDiff:', leftDiff, leftDiff !== 0 ? '⚠️ SE MOVIÓ' : '✅ OK');
        console.log('   rightDiff:', rightDiff, rightDiff !== 0 ? '⚠️ SE MOVIÓ' : '✅ OK');
        
        // Si el elemento se movió, usar la posición DESPUÉS (que es la posición visual real)
        // Si no se movió, usar la posición ANTES
        if (Math.abs(leftDiff) > 0.1 || Math.abs(topDiff) > 0.1) {
          console.log('⚠️ [Mask] Elemento se movió, usando posición DESPUÉS');
          savedTargetRect = rectAfter;
        } else {
          console.log('✅ [Mask] Elemento no se movió, usando posición ANTES');
          savedTargetRect = rectBefore;
        }
        
        console.log('💾 [Mask] Posición guardada que se usará:');
        console.log('   top:', savedTargetRect.top);
        console.log('   left:', savedTargetRect.left);
        console.log('   width:', savedTargetRect.width);
        console.log('   height:', savedTargetRect.height);
        
        // Actualizar la posición de la máscara con la posición correcta
        updateMaskPosition();
        
        // Crear y posicionar el popover después de que la posición esté guardada
        createPopoverInstance();
        
        // Escuchar cambios de scroll y resize
        // En resize, limpiar savedTargetRect para recalcular
        const handleResize = () => {
          console.log('📐 [Mask] Resize detectado, recalculando posición...');
          savedTargetRect = null; // Limpiar para forzar recálculo
          updateMaskPosition();
        };
        
        window.addEventListener('scroll', updateMaskPosition, true);
        window.addEventListener('resize', handleResize);
        
        // Guardar referencias para poder limpiarlas después
        (overlay as any).__handleResize = handleResize;
        (overlay as any).__handleScroll = updateMaskPosition;
      });
    });
  };

  const closeMask = () => {
    overlay.classList.remove('ubits-mask-overlay--open');
    
    // Limpiar la posición guardada
    savedTargetRect = null;
    
    // Remover event listeners
    const handleResize = (overlay as any).__handleResize;
    const handleScroll = (overlay as any).__handleScroll;
    if (handleResize) {
      window.removeEventListener('resize', handleResize);
    }
    if (handleScroll) {
      window.removeEventListener('scroll', handleScroll, true);
    }
    
    // Restaurar el scroll y el overflow del body
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    
    // Restaurar la posición de scroll
    window.scrollTo(savedScrollX, savedScrollY);

    if (popoverInstance) {
      popoverInstance.destroy();
      popoverInstance = null;
    }

    window.removeEventListener('scroll', updateMaskPosition, true);
    window.removeEventListener('resize', updateMaskPosition);

    if (onClose) {
      onClose();
    }
  };

  const updateTarget = (newTarget: string | HTMLElement) => {
    if (typeof newTarget === 'string') {
      targetElement = document.querySelector(newTarget) as HTMLElement;
    } else {
      targetElement = newTarget;
    }

    if (!targetElement) {
      console.error('❌ [Mask] No se encontró el nuevo elemento objetivo:', newTarget);
      return;
    }

    // Si la máscara está abierta, actualizar posición
    if (overlay.classList.contains('ubits-mask-overlay--open')) {
      updateMaskPosition();
    }
  };

  const destroy = () => {
    closeMask();
    if (overlay.parentElement) {
      overlay.parentElement.removeChild(overlay);
    }
  };

  // Event listeners
  if (closeOnOverlayClick) {
    overlay.addEventListener('click', (e) => {
      // Solo cerrar si el click es en el overlay, no en el popover o highlight
      const target = e.target as HTMLElement;
      if (target.classList.contains('ubits-mask-layer') || target.classList.contains('ubits-mask-overlay')) {
        closeMask();
      }
    });
  }

  // Agregar al DOM
  container.appendChild(overlay);

  // Abrir si está configurado
  if (open) {
    // Si el elemento no existe aún, esperar un frame y volver a intentar
    if (!targetElement) {
      requestAnimationFrame(() => {
        targetElement = getTargetElement();
        if (targetElement) {
          openMask();
        } else {
          // Intentar una vez más después de un pequeño delay
          setTimeout(() => {
            targetElement = getTargetElement();
            if (targetElement) {
              openMask();
            }
          }, 100);
        }
      });
    } else {
      openMask();
    }
  }

  return {
    element: overlay,
    open: openMask,
    close: closeMask,
    updateTarget,
    destroy
  };
}

