/**
 * MetricCardProvider
 * Lógica de renderizado del componente MetricCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { MetricCardOptions } from './types/MetricCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular', iconColor?: string): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  const colorStyle = iconColor ? `style="color: ${iconColor};"` : '';
  return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
}

// Helper para formatear valores numéricos
function formatValue(value: string | number): string {
  if (typeof value === 'number') {
    // Formatear números grandes con separadores de miles
    return value.toLocaleString('es-ES');
  }
  return String(value);
}

/**
 * Renderiza un MetricCard como HTML string
 */
export function renderMetricCard(options: MetricCardOptions): string {
  const {
    title,
    value,
    label,
    titleIcon,
    titleIconStyle = 'regular',
    titleIconColor,
    showInfoIcon = false,
    showActionButton = false,
    size = 'md',
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-metric-card',
    `ubits-metric-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Renderizar icono del título si existe
  const titleIconHTML = titleIcon 
    ? `<div class="ubits-metric-card__title-icon">${renderIconHelper(titleIcon, titleIconStyle, titleIconColor)}</div>`
    : '';

  // Renderizar icono de información como botón terciario si está habilitado
  const infoIconHTML = showInfoIcon
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'circle-info',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'aria-label': 'Información',
          'type': 'button'
        }
      })
    : '';

  // Renderizar botón de acción con flecha a la derecha en la esquina superior derecha
  const actionButtonHTML = showActionButton
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'chevron-right',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'aria-label': 'Ver más',
          'type': 'button'
        }
      })
    : '';

  // Clases de tipografía según tamaño (usando solo clases válidas UBITS)
  // Título siempre body-md-regular
  const titleSizeClass = 'ubits-body-md-regular';
  const labelSizeClass = size === 'sm' ? 'ubits-body-sm-regular' : 'ubits-body-md-regular';
  
  // El valor siempre usa heading-h2
  const valueClass = 'ubits-heading-h2';

  const formattedValue = formatValue(value);

  return `
    <div class="${classes}" ${attrs} data-ubits-id="🧩-ux-metric-card">
      <div class="ubits-metric-card__header">
        ${titleIconHTML}
        <div class="ubits-metric-card__title-group">
          <h3 class="ubits-metric-card__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-metric-card__action-button">${actionButtonHTML}</div>` : ''}
      </div>
      <div class="ubits-metric-card__body">
        <div class="ubits-metric-card__value-wrapper">
          <h2 class="ubits-metric-card__value ${valueClass}">${formattedValue}</h2>
          <div class="ubits-metric-card__label ${labelSizeClass}">${label}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Crea un MetricCard y lo inserta en el DOM
 */
export function createMetricCard(options: MetricCardOptions & { containerId?: string }): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [MetricCard] containerId es requerido para createMetricCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [MetricCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderMetricCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-metric-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [MetricCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }

  // Agregar data-ubits-id si no está presente
  if (!cardElement.hasAttribute('data-ubits-id')) {
    cardElement.setAttribute('data-ubits-id', '🧩-ux-metric-card');
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  console.log('✅ [MetricCard] Tarjeta creada exitosamente');
  return cardElement;
}

