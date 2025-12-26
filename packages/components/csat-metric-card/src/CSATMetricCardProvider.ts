/**
 * CSATMetricCardProvider
 * Lógica de renderizado del componente CSATMetricCard
 * Genera HTML según las opciones proporcionadas usando tokens UBITS
 */

import { CSATMetricCardOptions } from './types/CSATMetricCardOptions';
import { renderButton } from '../../button/src/ButtonProvider';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular', iconColor?: string): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  const colorStyle = iconColor ? `style="color: ${iconColor};"` : '';
  return `<i class="${iconClass} ${name}" ${colorStyle}></i>`;
}

/**
 * Mapeo de caritas según el índice (0-4) con sus colores
 */
const FACES = [
  { icon: 'face-angry', label: 'Muy malo', color: 'var(--ubits-feedback-accent-error)' },
  { icon: 'face-sad-tear', label: 'Malo', color: 'var(--ubits-feedback-fg-warning-subtle-hover)' },
  { icon: 'face-meh', label: 'Regular', color: 'var(--ubits-feedback-accent-info)' },
  { icon: 'face-smile', label: 'Bueno', color: 'var(--ubits-feedback-accent-success)' },
  { icon: 'face-smile-beam', label: 'Muy bueno', color: 'var(--ubits-feedback-accent-success)' }
];

/**
 * Renderiza el gráfico de caritas (0-4, solo una seleccionada)
 * Score 1-5 se mapea a índices 0-4
 */
function renderFacesRating(score: number, clickable: boolean = false): string {
  const totalFaces = 5;
  // Mapear score 1-5 a índice 0-4
  const roundedScore = Math.round(score);
  const selectedFaceIndex = Math.min(Math.max(roundedScore - 1, 0), totalFaces - 1); // 0-4
  
  let facesHTML = '';
  
  // Renderizar todas las caras, solo la seleccionada tiene color
  for (let i = 0; i < totalFaces; i++) {
    const face = FACES[i];
    const isSelected = i === selectedFaceIndex;
    const faceClass = isSelected 
      ? 'ubits-csat-metric-card__face ubits-csat-metric-card__face--selected'
      : 'ubits-csat-metric-card__face ubits-csat-metric-card__face--empty';
    const faceColor = isSelected ? face.color : 'var(--modifiers-normal-color-light-border-1)';
    const clickableClass = clickable ? 'ubits-csat-metric-card__face-wrapper--clickable' : '';
    
    facesHTML += `
      <div class="ubits-csat-metric-card__face-wrapper ${clickableClass}" data-face-index="${i}" data-face-score="${i + 1}">
        <i class="far fa-${face.icon} ${faceClass}" style="color: ${faceColor};"></i>
        <span class="ubits-csat-metric-card__face-label">${face.label}</span>
      </div>
    `;
  }
  
  return facesHTML;
}

/**
 * Renderiza un CSATMetricCard como HTML string
 */
export function renderCSATMetricCard(options: CSATMetricCardOptions): string {
  const {
    title,
    totalResponses = 0,
    responsesLabel = 'respuestas',
    average = 0,
    averageLabel = 'Promedio:',
    score = 0,
    titleIcon,
    titleIconStyle = 'regular',
    titleIconColor,
    showInfoIcon = false,
    showActionButton = false,
    size = 'md',
    className = '',
    attributes = {},
    onFaceClick
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-csat-metric-card',
    `ubits-csat-metric-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Renderizar icono del título si existe
  const titleIconHTML = titleIcon 
    ? `<div class="ubits-csat-metric-card__title-icon">${renderIconHelper(titleIcon, titleIconStyle, titleIconColor)}</div>`
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
  const titleSizeClass = 'ubits-body-md-bold';
  const statsClass = 'ubits-body-sm-regular';
  const labelClass = 'ubits-body-sm-regular';

  // Formatear promedio con 2 decimales
  const formattedAverage = average.toFixed(2);

  // Renderizar gráfico de caritas (clickeable si hay onFaceClick)
  const facesHTML = renderFacesRating(score, !!onFaceClick);

  return `
    <div class="${classes}" ${attrs}>
      <div class="ubits-csat-metric-card__header">
        ${titleIconHTML}
        <div class="ubits-csat-metric-card__title-group">
          <h3 class="ubits-csat-metric-card__title ${titleSizeClass}">${title}</h3>
          ${infoIconHTML}
        </div>
        ${actionButtonHTML ? `<div class="ubits-csat-metric-card__action-button">${actionButtonHTML}</div>` : ''}
      </div>
      <div class="ubits-csat-metric-card__body">
        <div class="ubits-csat-metric-card__stats">
          <span class="ubits-csat-metric-card__responses ${statsClass}">${totalResponses} ${responsesLabel}</span>
          <span class="ubits-csat-metric-card__average ${statsClass}">${averageLabel} (${formattedAverage})</span>
        </div>
        <div class="ubits-csat-metric-card__chart">
          <div class="ubits-csat-metric-card__faces">
            ${facesHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Crea un CSATMetricCard y lo inserta en el DOM
 */
export function createCSATMetricCard(options: CSATMetricCardOptions & { containerId?: string }): HTMLElement | null {
  const { containerId, ...cardOptions } = options;
  
  if (!containerId) {
    console.error('❌ [CSATMetricCard] containerId es requerido para createCSATMetricCard');
    return null;
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [CSATMetricCard] Contenedor con ID "${containerId}" no encontrado`);
    return null;
  }
  
  // Renderizar el HTML
  const html = renderCSATMetricCard(cardOptions);
  container.innerHTML = html;
  
  const cardElement = container.querySelector('.ubits-csat-metric-card') as HTMLElement;
  
  if (!cardElement) {
    console.error('❌ [CSATMetricCard] No se pudo crear el elemento de la tarjeta');
    return null;
  }

  // Agregar data-ubits-id si no está presente
  if (!cardElement.hasAttribute('data-ubits-id')) {
    cardElement.setAttribute('data-ubits-id', '🧩-ux-csat-metric-card');
  }
  
  // Agregar event listeners
  if (cardOptions.onClick) {
    cardElement.addEventListener('click', cardOptions.onClick);
  }
  
  // Agregar event listeners a las caritas si hay onFaceClick
  if (cardOptions.onFaceClick) {
    const faceWrappers = cardElement.querySelectorAll('.ubits-csat-metric-card__face-wrapper');
    
    // Función para actualizar la selección visual
    const updateFaceSelection = (selectedIndex: number) => {
      faceWrappers.forEach((wrapper, i) => {
        const faceIcon = wrapper.querySelector('i') as HTMLElement;
        const face = FACES[i];
        const isSelected = i === selectedIndex;
        
        // Actualizar clases
        if (isSelected) {
          faceIcon.className = `far fa-${face.icon} ubits-csat-metric-card__face ubits-csat-metric-card__face--selected`;
          faceIcon.style.color = face.color;
        } else {
          faceIcon.className = `far fa-${face.icon} ubits-csat-metric-card__face ubits-csat-metric-card__face--empty`;
          faceIcon.style.color = 'var(--modifiers-normal-color-light-border-1)';
        }
      });
    };
    
    faceWrappers.forEach((wrapper) => {
      const faceIndex = parseInt(wrapper.getAttribute('data-face-index') || '0', 10);
      const faceScore = parseInt(wrapper.getAttribute('data-face-score') || '1', 10);
      
      wrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🟢 [CSATMetricCard] Carita clickeada', { faceIndex, faceScore });
        
        // Actualizar selección visual
        updateFaceSelection(faceIndex);
        
        // Llamar al callback
        cardOptions.onFaceClick!(faceIndex, faceScore);
      });
    });
  }
  
  console.log('✅ [CSATMetricCard] Tarjeta creada exitosamente');
  return cardElement;
}

