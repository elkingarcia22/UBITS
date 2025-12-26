import type { StepperOptions, StepperStep, StepperStepState } from './types/StepperOptions';

/**
 * Renderiza el HTML del stepper
 */
export function renderStepper(options: StepperOptions): string {
  const {
    orientation = 'horizontal',
    size = 'md',
    showTitle = true,
    showDescription = true,
    steps = [],
    className = ''
  } = options;

  if (steps.length === 0) {
    return '';
  }

  const classes = [
    'ubits-stepper',
    `ubits-stepper--${orientation}`,
    `ubits-stepper--${size}`,
    className
  ].filter(Boolean).join(' ');

  const stepsHtml = steps.map((step, index) => {
    const isLast = index === steps.length - 1;
    const stepState = step.state || (index === 0 ? 'active' : 'default');
    
    // El conector NUNCA debe tener color, sin importar el estado
    // Siempre usar 'default' para que el conector sea transparente
    const connectorState = 'default';
    
    return renderStep(step, stepState, isLast, orientation, showTitle, showDescription, connectorState);
  }).join('');

  return `
    <div class="${classes}" data-ubits-id="🧩-ux-stepper">
      ${stepsHtml}
    </div>
  `.trim();
}

/**
 * Renderiza un paso individual del stepper
 */
function renderStep(
  step: StepperStep,
  state: StepperStepState,
  isLast: boolean,
  orientation: 'horizontal' | 'vertical',
  showTitle: boolean,
  showDescription: boolean,
  connectorState: StepperStepState = 'default'
): string {
  const stepClasses = [
    'ubits-stepper__step',
    `ubits-stepper__step--${state}`,
    isLast ? 'ubits-stepper__step--last' : ''
  ].filter(Boolean).join(' ');

  // Renderizar el indicador (círculo con número o checkmark)
  const indicator = renderStepIndicator(step.number, state);
  
  // Renderizar el conector (línea entre pasos)
  // El conector solo tiene color si el paso actual está completado
  const connector = !isLast ? renderConnector(connectorState, orientation) : '';
  

  // Renderizar el contenido (título y descripción)
  const content = renderStepContent(
    showTitle ? step.title : undefined,
    showDescription ? step.description : undefined
  );

  if (orientation === 'vertical') {
    return `
      <div class="${stepClasses}">
        <div class="ubits-stepper__step-wrapper">
          ${indicator}
          <div class="ubits-stepper__step-content">
            ${content}
          </div>
        </div>
        ${connector}
      </div>
    `.trim();
  } else {
    // Horizontal: estructura: círculo → textos → línea
    // El contenido ya incluye el wrapper si hay texto, o un div vacío si no hay
    return `
      <div class="${stepClasses}">
        ${indicator}
        ${content}
        ${connector}
      </div>
    `.trim();
  }
}

/**
 * Renderiza el indicador del paso (círculo con número o checkmark)
 */
function renderStepIndicator(number: number, state: StepperStepState): string {
  const indicatorClasses = [
    'ubits-stepper__indicator',
    `ubits-stepper__indicator--${state}`
  ].filter(Boolean).join(' ');

  let content = '';
  
  if (state === 'completed') {
    // Mostrar checkmark
    content = `
      <svg class="ubits-stepper__checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  } else {
    // Mostrar número
    content = `<span class="ubits-stepper__number">${number}</span>`;
  }

  return `
    <div class="${indicatorClasses}">
      ${content}
    </div>
  `.trim();
}

/**
 * Renderiza el conector (línea entre pasos)
 */
function renderConnector(state: StepperStepState, orientation: 'horizontal' | 'vertical'): string {
  // El conector NUNCA debe tener color, siempre transparente
  // No aplicar la clase --active en ningún caso
  const isActive = false;
  
  const connectorClasses = [
    'ubits-stepper__connector',
    `ubits-stepper__connector--${orientation}`
  ].filter(Boolean).join(' ');


  return `<div class="${connectorClasses}"></div>`;
}

/**
 * Renderiza el contenido del paso (título y descripción)
 */
function renderStepContent(title?: string, description?: string): string {
  const titleHtml = title
    ? `<h3 class="ubits-stepper__title ubits-body-md-semibold">${escapeHtml(title)}</h3>`
    : '';
  
  const descriptionHtml = description 
    ? `<p class="ubits-stepper__description ubits-body-sm-regular">${escapeHtml(description)}</p>`
    : '';

  // Si no hay título ni descripción, retornar div vacío con clase especial
  if (!titleHtml && !descriptionHtml) {
    return '<div class="ubits-stepper__step-content ubits-stepper__step-content--empty"></div>';
  }

  return `
    <div class="ubits-stepper__step-content">
      <div class="ubits-stepper__content-wrapper">
        ${titleHtml}
        ${descriptionHtml}
      </div>
    </div>
  `.trim();
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Crea un elemento DOM del stepper y lo inserta en el contenedor
 */
export function createStepper(options: StepperOptions): {
  element: HTMLElement;
  update: (newOptions: Partial<StepperOptions>) => void;
  destroy: () => void;
} {
  const {
    containerId,
    ...restOptions
  } = options;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderStepper(restOptions);
  const stepperElement = wrapper.firstElementChild as HTMLElement;

  if (!stepperElement) {
    throw new Error('No se pudo crear el stepper');
  }

  // Agregar data-ubits-id si no está presente
  if (!stepperElement.hasAttribute('data-ubits-id')) {
    stepperElement.setAttribute('data-ubits-id', '🧩-ux-stepper');
  }

  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(stepperElement);

  /**
   * Actualiza el stepper con nuevas opciones
   */
  const update = (newOptions: Partial<StepperOptions>) => {
    const updatedOptions = { ...restOptions, ...newOptions };
    const newHtml = renderStepper(updatedOptions);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && stepperElement.parentNode) {
      stepperElement.parentNode.replaceChild(newElement, stepperElement);
      Object.assign(stepperElement, newElement);
    }
  };

  /**
   * Destruye el stepper removiéndolo del DOM
   */
  const destroy = () => {
    if (stepperElement.parentNode) {
      stepperElement.parentNode.removeChild(stepperElement);
    }
  };

  return {
    element: stepperElement,
    update,
    destroy
  };
}

