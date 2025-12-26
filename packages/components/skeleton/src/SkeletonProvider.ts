/**
 * SkeletonProvider
 * Lógica de renderizado del componente Skeleton
 * Genera HTML para placeholders de carga usando tokens UBITS
 */

import type { SkeletonOptions } from './types/SkeletonOptions';

/**
 * Renderiza un skeleton loader como HTML string
 */
export function renderSkeleton(options: SkeletonOptions = {}): string {
  const {
    variant = 'text',
    size = 'md',
    width,
    height,
    lines = 1,
    animated = true,
    className = '',
    style = ''
  } = options;

  // Construir clases base
  const classes = [
    'ubits-skeleton',
    `ubits-skeleton--${variant}`,
    size !== 'md' ? `ubits-skeleton--${size}` : '',
    animated ? 'ubits-skeleton--animated' : '',
    className
  ].filter(Boolean).join(' ');

  // Calcular estilos de tamaño
  const sizeStyles: string[] = [];
  
  if (width) {
    if (width === 'full') {
      sizeStyles.push('width: 100%');
    } else if (typeof width === 'number') {
      sizeStyles.push(`width: ${width}px`);
    } else {
      sizeStyles.push(`width: ${width}`);
    }
  }
  
  if (height) {
    if (typeof height === 'number') {
      sizeStyles.push(`height: ${height}px`);
    } else {
      sizeStyles.push(`height: ${height}`);
    }
  }

  const inlineStyles = [...sizeStyles, style].filter(Boolean).join('; ');
  const styleAttr = inlineStyles ? ` style="${inlineStyles}"` : '';

  // Renderizar según la variante
  if (variant === 'text') {
    // Múltiples líneas de texto
    const lineElements = Array.from({ length: lines }, (_, index) => {
      // La última línea suele ser más corta
      const isLastLine = index === lines - 1;
      const lineWidth = isLastLine && lines > 1 ? '60%' : '100%';
      return `<span class="ubits-skeleton__line" style="width: ${lineWidth}"></span>`;
    }).join('');
    
    return `<div class="${classes}"${styleAttr} data-ubits-id="🧩-ux-skeleton">${lineElements}</div>`;
  }
  
  if (variant === 'circle') {
    return `<div class="${classes}"${styleAttr} data-ubits-id="🧩-ux-skeleton"></div>`;
  }
  
  if (variant === 'rectangle') {
    return `<div class="${classes}"${styleAttr} data-ubits-id="🧩-ux-skeleton"></div>`;
  }
  
  // Custom: sin restricciones de forma
  return `<div class="${classes}"${styleAttr} data-ubits-id="🧩-ux-skeleton"></div>`;
}

/**
 * Crea un elemento skeleton programáticamente
 */
export function createSkeleton(options: SkeletonOptions = {}): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderSkeleton(options);
  const skeleton = div.querySelector('.ubits-skeleton') as HTMLDivElement;
  
  if (!skeleton) {
    throw new Error('Failed to create skeleton element');
  }

  // Agregar data-ubits-id si no está presente
  if (!skeleton.hasAttribute('data-ubits-id')) {
    skeleton.setAttribute('data-ubits-id', '🧩-ux-skeleton');
  }

  return skeleton;
}

