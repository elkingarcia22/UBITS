import type { BadgeOptions } from './types/BadgeOptions';

/**
 * Genera el HTML de un badge
 */
export function renderBadge(options: BadgeOptions = {}): string {
  const {
    content,
    size = 'md',
    type,
    variant = 'primary',
    style,
    absolute = false,
    position = 'top-right',
    className = '',
    label,
    showLabel = false,
    labelTypography = 'ubits-body-md-regular'
  } = options;

  // Determinar tipo: si type está definido, usarlo; si no, inferir de content
  const badgeType = type || (content !== undefined && content !== null && content !== '' ? 'number' : 'dot');

  // Construir clases
  const classes = [
    'ubits-badge',
    size !== 'md' ? `ubits-badge--${size}` : '',
    badgeType === 'dot' ? 'ubits-badge--dot' : '',
    badgeType === 'number' ? 'ubits-badge--number' : '',
    `ubits-badge--${variant}`,
    style ? `ubits-badge--${style}` : '',
    absolute ? `ubits-badge--absolute` : '',
    absolute && position ? `ubits-badge--absolute-${position}` : '',
    className
  ].filter(Boolean).join(' ');

  // Contenido del badge: solo mostrar si es tipo number
  const badgeContent = badgeType === 'number' && content !== undefined && content !== null 
    ? String(content) 
    : '';

  // Para estilos light, neutral y bold, mostrar punto de color + contenido
  const needsDot = style && ['light', 'neutral', 'bold'].includes(style);
  
  let badgeInnerContent = '';
  if (needsDot) {
    // Determinar color del punto según la variante usando tokens Figma
    const variantColors: Record<string, string> = {
      'primary': 'var(--modifiers-normal-color-light-feedback-accent-error)',
      'secondary': 'var(--modifiers-normal-color-light-fg-1-medium)',
      'success': 'var(--modifiers-normal-color-light-feedback-accent-success)',
      'warning': 'var(--modifiers-normal-color-light-feedback-accent-warning)',
      'error': 'var(--modifiers-normal-color-light-feedback-accent-error)',
      'info': 'var(--modifiers-normal-color-light-feedback-accent-info)'
    };
    // Normalizar el nombre de la variante (por si acaso viene con mayúsculas o espacios)
    const normalizedVariant = String(variant || 'primary').toLowerCase().trim();
    const dotColor = variantColors[normalizedVariant] || variantColors['primary'];
    
    // Para estilo bold: dot blanco, número del color de la variante
    // Para light/neutral: dot del color de la variante, número blanco dentro del dot
    const textColor = style === 'bold' ? dotColor : 'var(--modifiers-normal-color-light-bg-1)'; // En bold, el número es del color de la variante; en light/neutral es blanco
    const dotBgColor = style === 'bold' ? 'var(--modifiers-normal-color-light-bg-1)' : dotColor; // En bold, el dot es blanco; en light/neutral es del color de la variante
    
    // Logs de debug
    console.log('🔍 DEBUG BadgeProvider - Generando badge:');
    console.log('  - Variant:', variant, '-> normalized:', normalizedVariant);
    console.log('  - Style:', style);
    console.log('  - BadgeType:', badgeType);
    console.log('  - BadgeContent:', badgeContent);
    console.log('  - dotColor:', dotColor);
    console.log('  - textColor:', textColor);
    console.log('  - dotBgColor:', dotBgColor);
    
    // Si es tipo number, el número debe estar DENTRO del círculo
    if (badgeType === 'number' && badgeContent) {
      // Para number, crear un círculo más grande que contenga el número
      const numberDotSize = size === 'xs' ? '18px' : 
                            size === 'sm' ? '20px' : 
                            size === 'md' ? '22px' : '24px';
      // Para bold, usar el mismo estilo que light/neutral: dot grande con número dentro
      // El dot es blanco y el número también es blanco (el fondo de color está en el wrapper)
      if (style === 'bold') {
        // Para bold, el número va dentro de un dot blanco grande
        // El número es del color de la variante (no blanco)
        // Envolver el número en un span adicional para mejor control del centrado
        const fontSize = size === 'xs' ? '10px' : size === 'sm' ? '11px' : size === 'md' ? '12px' : '13px';
        const dotHtml = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${numberDotSize}; height: ${numberDotSize}; min-width: ${numberDotSize}; background-color: var(--modifiers-normal-color-light-bg-1); border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; padding: 0; margin: 0; box-sizing: border-box; position: relative;"><span class="ubits-badge__number-inner" style="display: block !important; line-height: 1 !important; font-size: ${fontSize} !important; font-weight: 600 !important; color: ${dotColor} !important; text-align: center !important; margin: 0 !important; padding: 0 !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; box-sizing: border-box !important;">${badgeContent}</span></span>`;
        badgeInnerContent = dotHtml;
        
        // Logs extensivos para debuggear centrado
        console.log('🔍 DEBUG Badge Bold - Centrado del número:');
        console.log('  - Style: bold');
        console.log('  - Size:', size);
        console.log('  - BadgeContent:', badgeContent);
        console.log('  - numberDotSize:', numberDotSize);
        console.log('  - fontSize:', fontSize);
        console.log('  - dotColor:', dotColor);
        console.log('  - HTML generado:', dotHtml);
        console.log('  - Estilos inline aplicados:');
        console.log('    - width:', numberDotSize);
        console.log('    - height:', numberDotSize);
        console.log('    - display: inline-flex');
        console.log('    - align-items: center');
        console.log('    - justify-content: center');
        console.log('    - line-height: 1');
        console.log('    - padding: 0');
        console.log('    - margin: 0');
        console.log('    - box-sizing: border-box');
        console.log('    - text-align: center');
        console.log('    - vertical-align: middle');
        console.log('  - Bold dot HTML generado:');
        console.log('    - numberDotSize:', numberDotSize);
        console.log('    - fontSize:', fontSize);
        console.log('    - color (dotColor):', dotColor);
        console.log('    - background-color: var(--modifiers-normal-color-light-bg-1)');
      } else {
        // Para light/neutral, el número va dentro del dot de color
        const fontSize = size === 'xs' ? '10px' : size === 'sm' ? '11px' : size === 'md' ? '12px' : '13px';
        const dotHtml = `<span class="ubits-badge__dot ubits-badge__dot--number" style="width: ${numberDotSize}; height: ${numberDotSize}; min-width: ${numberDotSize}; background-color: ${dotBgColor}; border-radius: 50%; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-right: 0; color: ${textColor}; font-size: ${fontSize}; font-weight: 600; line-height: 1; padding: 0; margin: 0;">${badgeContent}</span>`;
        badgeInnerContent = dotHtml;
        console.log('  - Light/Neutral dot HTML generado:');
        console.log('    - numberDotSize:', numberDotSize);
        console.log('    - fontSize:', fontSize);
        console.log('    - color (textColor):', textColor);
        console.log('    - background-color (dotBgColor):', dotBgColor);
      }
    } else {
      // Si es tipo dot, mostrar el punto
      const dotSize = size === 'xs' ? '6px' : 
                      size === 'sm' ? '7px' : 
                      size === 'md' ? '8px' : '10px';
      // Para bold, el dot es blanco; para light/neutral, el dot es del color de la variante
      // Asegurar que el dot sea blanco en bold, incluso si hay algún problema con dotBgColor
      const finalDotBgColor = style === 'bold' ? 'var(--modifiers-normal-color-light-bg-1)' : dotBgColor;
      
      // Para bold, forzar blanco explícitamente; para otros, usar el color calculado
      const finalColor = style === 'bold' ? 'var(--modifiers-normal-color-light-bg-1)' : finalDotBgColor;
      const dotHtml = `<span class="ubits-badge__dot" style="width: ${dotSize}; height: ${dotSize}; background-color: ${finalColor}; background: ${finalColor}; border-radius: 50%; flex-shrink: 0; display: inline-block; margin-right: 0;"></span>`;
      badgeInnerContent = dotHtml;
    }
  } else {
    // Para otros estilos, mostrar contenido normal
    badgeInnerContent = badgeType === 'dot' ? '' : badgeContent;
  }

  const badgeHtml = `<span class="${classes}">${badgeInnerContent}</span>`;

  // Para estilos light, neutral y bold, siempre usar wrapper (con o sin label)
  // El wrapper tiene el borde, fondo y padding
  if (style && ['light', 'neutral', 'bold'].includes(style)) {
    if (showLabel) {
      const labelText = label || badgeContent || '';
      if (labelText) {
        // Para bold, el label debe ser blanco
        const labelColor = style === 'bold' ? 'style="color: var(--ubits-fg-on-accent, #ffffff) !important;"' : '';
        const finalHtml = `<div class="ubits-badge-wrapper">
          ${badgeHtml}
          <span class="${labelTypography}" ${labelColor}>${labelText}</span>
        </div>`;
        return finalHtml;
      }
    }
    // Incluso sin label, usar wrapper para que tenga el borde y padding
    const finalHtml = `<div class="ubits-badge-wrapper">
      ${badgeHtml}
    </div>`;
    return finalHtml;
  }

  // Para otros casos, usar la lógica original
  if (label && showLabel) {
    return `<div class="ubits-badge-wrapper">
      ${badgeHtml}
      <span class="${labelTypography}">${label}</span>
    </div>`;
  }

  return badgeHtml;
}

/**
 * Crea un badge para usar dentro de botones (con clase ubits-button__badge)
 */
export function renderButtonBadge(): string {
  return '<span class="ubits-button__badge"></span>';
}

/**
 * Crea un elemento badge programáticamente
 */
export function createBadge(options: BadgeOptions = {}): HTMLSpanElement {
  const div = document.createElement('div');
  div.innerHTML = renderBadge(options);
  return div.querySelector('.ubits-badge') as HTMLSpanElement;
}
