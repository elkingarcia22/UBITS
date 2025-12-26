import type { Meta, StoryObj } from '@storybook/html';
import { renderStepper, createStepper } from '../../components/stepper/src/StepperProvider';
import type { StepperOptions, StepperStep, StepperStepState, StepperOrientation } from '../../components/stepper/src/types/StepperOptions';
import { createUBITSContract } from './_shared/ubitsContract';
import '../../components/stepper/src/styles/stepper.css';

interface ExtendedStepperOptions extends StepperOptions {
  numSteps?: number;
  showTitle?: boolean;
  showDescription?: boolean;
  step1State?: StepperStepState;
  step1Title?: string;
  step1Description?: string;
  step2State?: StepperStepState;
  step2Title?: string;
  step2Description?: string;
  step3State?: StepperStepState;
  step3Title?: string;
  step3Description?: string;
  step4State?: StepperStepState;
  step4Title?: string;
  step4Description?: string;
  step5State?: StepperStepState;
  step5Title?: string;
  step5Description?: string;
}

const meta: Meta<ExtendedStepperOptions> = {
  title: 'Layout/Stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component: 'Componente Stepper UBITS para mostrar el progreso de un proceso multi-paso. Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning. Cada paso puede tener número, título y descripción.

```html
// 1. Crear contenedor HTML
<div id="stepper-implementation-container"></div>

// 2. Crear Stepper
// Opción A: Usando window.UBITS.Stepper.create (si está expuesto globalmente)
const stepper = window.UBITS.Stepper.create({
  containerId: 'stepper-implementation-container',
  orientation: 'horizontal',
  size: 'md',
  showTitle: true,
  showDescription: true,
  steps: [
    {
      number: 1,
      title: 'Step One',
      description: 'Desc for step one',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Step Two',
      description: 'Desc for step two',
      state: 'active'
    },
    {
      number: 3,
      title: 'Step Three',
      description: 'Desc for step three',
      state: 'default'
    }
  ]
});

// Opción B: Importando directamente (si usas módulos)
// import { createStepper } from '@ubits/stepper';
// const stepper = createStepper({
//   containerId: 'stepper-implementation-container',
//   orientation: 'horizontal',
//   size: 'md',
//   showTitle: true,
//   showDescription: true,
//   steps: [
//     { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
//     { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
//     { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
//   ]
// });

// Opción C: Usando renderStepper (retorna HTML string)
// import { renderStepper } from '@ubits/stepper';
// const stepperHTML = renderStepper({
//   orientation: 'horizontal',
//   size: 'md',
//   showTitle: true,
//   showDescription: true,
//   steps: [
//     { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
//     { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
//     { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
//   ]
// });
// document.getElementById('stepper-implementation-container').innerHTML = stepperHTML;

// Nota: createStepper retorna un objeto con:
// - stepper.element: El elemento DOM del stepper
// - stepper.update(newOptions): Método para actualizar el stepper
// - stepper.destroy(): Método para destruir el stepper
```',
      },
    },
    layout: 'padded',
    // ⭐ CONTRATO UBITS para Autorun
    ubits: createUBITSContract({
      componentId: '🧩-ux-stepper',
      api: {
        create: 'window.UBITS.Stepper.create',
        tag: '<ubits-stepper>',
      },
      dependsOn: {
        required: [], // Stepper no requiere otros componentes UBITS
        optional: [], // No tiene dependencias opcionales
      },
      internals: [], // Stepper no tiene componentes internos privados
      slots: {}, // Stepper no tiene slots
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-bg-active',
        '--modifiers-normal-color-light-border-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-fg-1-low',
        '--modifiers-normal-color-light-fg-disabled',
        '--modifiers-normal-color-light-accent-brand',
        '--modifiers-normal-color-light-feedback-bg-success-subtle-default',
        '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
        '--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
        '--modifiers-normal-color-light-feedback-border-success',
        '--modifiers-normal-color-light-feedback-border-error',
        '--modifiers-normal-color-light-feedback-border-warning',
        '--modifiers-normal-color-light-feedback-fg-success-subtle-default',
        '--modifiers-normal-color-light-feedback-fg-error-subtle-default',
        '--modifiers-normal-color-light-feedback-fg-warning-subtle-default',
        '--font-family-noto-sans-font-family',
        '--modifiers-normal-body-sm-regular-fontsize',
        '--modifiers-normal-body-md-regular-fontsize',
        '--weight-semibold',
        '--p-spacing-mode-1-xs',
        '--p-spacing-mode-1-sm',
        '--p-spacing-mode-1-md',
        '--ubits-border-radius-full',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['steps'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: "window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\n  containerId: 'stepper-container',\\n  steps: [\\n    { number: 1, title: 'Step 1', state: 'default' },\\n    { number: 2, title: 'Step 2', state: 'active' }\\n  ],\\n  orientation: 'horizontal',\\n  size: 'md',\\n  onStepClick: function(stepNumber) {}\\n});",
        basic: "window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\n  containerId: 'stepper-container',\\n  steps: [\\n    { number: 1, title: 'Step 1', state: 'default' },\\n    { number: 2, title: 'Step 2', state: 'active' }\\n  ],\\n  orientation: 'horizontal',\\n  size: 'md'\\n});",
        vertical: "window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\n  containerId: 'stepper-container',\\n  steps: [\\n    { number: 1, title: 'Step 1', state: 'completed' },\\n    { number: 2, title: 'Step 2', state: 'active' }\\n  ],\\n  orientation: 'vertical',\\n  size: 'md'\\n});",
        withError: "window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\n  containerId: 'stepper-container',\\n  steps: [\\n    { number: 1, title: 'Step 1', state: 'completed' },\\n    { number: 2, title: 'Step 2', state: 'error' }\\n  ],\\n  orientation: 'horizontal',\\n  size: 'md'\\n});",
      },
      variants: {
        orientation: ['horizontal', 'vertical'],
        size: ['xs', 'sm', 'md', 'lg'],
        state: ['default', 'completed', 'active', 'error', 'warning'],
      },
      events: {
        onStepClick: {
          type: 'Event',
          description: 'Emitted when a step is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'layout-stepper--implementation',
        storiesByExample: {
          canonical: 'layout-stepper--implementation',
          basic: 'layout-stepper--default',
          vertical: 'layout-stepper--vertical',
          withError: 'layout-stepper--with-error',
        },
      },
      intents: {
        'stepper.steps': 'canonical',
        'stepper.progress': 'canonical',
        'stepper.basic': 'canonical',
        'stepper.vertical': 'vertical',
        'stepper.error': 'withError',
      },
    }),
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientación del stepper',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
        category: 'Apariencia',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del stepper',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar títulos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar descripciones (texto complementario)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    numSteps: {
      control: { type: 'number', min: 2, max: 5, step: 1 },
      description: 'Número de pasos a mostrar (2-5)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
        category: 'Comportamiento',
      },
    },
    step1State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 1',
      table: { category: 'Paso 1' },
    },
    step1Title: {
      control: { type: 'text' },
      description: 'Título del paso 1',
      table: { category: 'Paso 1' },
    },
    step1Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 1',
      table: { category: 'Paso 1' },
    },
    step2State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 2',
      table: { category: 'Paso 2' },
    },
    step2Title: {
      control: { type: 'text' },
      description: 'Título del paso 2',
      table: { category: 'Paso 2' },
    },
    step2Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 2',
      table: { category: 'Paso 2' },
    },
    step3State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 3',
      table: { category: 'Paso 3' },
    },
    step3Title: {
      control: { type: 'text' },
      description: 'Título del paso 3',
      table: { category: 'Paso 3' },
    },
    step3Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 3',
      table: { category: 'Paso 3' },
    },
    step4State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step4Title: {
      control: { type: 'text' },
      description: 'Título del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step4Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 4',
      table: { category: 'Paso 4' },
      if: { arg: 'numSteps', gte: 4 },
    },
    step5State: {
      control: { type: 'select' },
      options: ['default', 'completed', 'active', 'error', 'warning'],
      description: 'Estado del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
    step5Title: {
      control: { type: 'text' },
      description: 'Título del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
    step5Description: {
      control: { type: 'text' },
      description: 'Descripción del paso 5',
      table: { category: 'Paso 5' },
      if: { arg: 'numSteps', gte: 5 },
    },
  },
};

export default meta;
type Story = StoryObj<ExtendedStepperOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    orientation: 'horizontal',
    size: 'md',
    showTitle: true,
    showDescription: true,
    numSteps: 3,
    step1State: 'completed',
    step1Title: 'Step One',
    step1Description: 'Desc for step one',
    step2State: 'active',
    step2Title: 'Step Two',
    step2Description: 'Desc for step two',
    step3State: 'default',
    step3Title: 'Step Three',
    step3Description: 'Desc for step three',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="stepper-implementation-container"></div>

// 2. Crear Stepper
// Opción A: Usando window.UBITS.Stepper.create (si está expuesto globalmente)
const stepper = window.UBITS.Stepper.create({
  containerId: 'stepper-implementation-container',
  orientation: 'horizontal',
  size: 'md',
  showTitle: true,
  showDescription: true,
  steps: [
    {
      number: 1,
      title: 'Step One',
      description: 'Desc for step one',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Step Two',
      description: 'Desc for step two',
      state: 'active'
    },
    {
      number: 3,
      title: 'Step Three',
      description: 'Desc for step three',
      state: 'default'
    }
  ]
});

// Opción B: Importando directamente (si usas módulos)
// import { createStepper } from '@ubits/stepper';
// const stepper = createStepper({
//   containerId: 'stepper-implementation-container',
//   orientation: 'horizontal',
//   size: 'md',
//   showTitle: true,
//   showDescription: true,
//   steps: [
//     { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
//     { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
//     { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
//   ]
// });

// Opción C: Usando renderStepper (retorna HTML string)
// import { renderStepper } from '@ubits/stepper';
// const stepperHTML = renderStepper({
//   orientation: 'horizontal',
//   size: 'md',
//   showTitle: true,
//   showDescription: true,
//   steps: [
//     { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
//     { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
//     { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
//   ]
// });
// document.getElementById('stepper-implementation-container').innerHTML = stepperHTML;

// Nota: createStepper retorna un objeto con:
// - stepper.element: El elemento DOM del stepper
// - stepper.update(newOptions): Método para actualizar el stepper
// - stepper.destroy(): Método para destruir el stepper`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-stepper');
    container.setAttribute('data-ubits-component', 'Stepper');
    container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    `;

    const stepperContainer = document.createElement('div');
    stepperContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;

    // Construir array de pasos
    const numSteps = args.numSteps || 3;
    const steps: StepperStep[] = [];

    for (let i = 1; i <= numSteps; i++) {
      const stepState = (args as any)[`step${i}State`] || (i === 1 ? 'completed' : i === 2 ? 'active' : 'default');
      const stepTitle = (args as any)[`step${i}Title`] || `Step ${i === 1 ? 'One' : i === 2 ? 'Two' : i === 3 ? 'Three' : i === 4 ? 'Four' : 'Five'}`;
      const stepDescription = (args as any)[`step${i}Description`] || `Desc for step ${i === 1 ? 'one' : i === 2 ? 'two' : i === 3 ? 'three' : i === 4 ? 'four' : 'five'}`;

      steps.push({
        number: i,
        title: stepTitle,
        description: stepDescription,
        state: stepState,
      });
    }

    // Crear opciones del stepper
    const stepperOptions: StepperOptions = {
      orientation: args.orientation || 'horizontal',
      size: args.size || 'md',
      showTitle: args.showTitle !== undefined ? args.showTitle : true,
      showDescription: args.showDescription !== undefined ? args.showDescription : true,
      steps: steps,
    };

    // Renderizar stepper
    try {
      const html = renderStepper(stepperOptions);
      if (!html || html.trim() === '') {
        throw new Error('El stepper no generó HTML válido');
      }
      stepperContainer.innerHTML = html;
    } catch (error) {
      console.error('Error al renderizar stepper:', error);
      stepperContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error al renderizar el stepper: ${error instanceof Error ? error.message : 'Error desconocido'}</p>`;
    }

    container.appendChild(stepperContainer);
    return container;
  },
};

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    size: 'md',
    showTitle: true,
    showDescription: true,
    numSteps: 3,
    step1State: 'completed',
    step1Title: 'Step One',
    step1Description: 'Desc for step one',
    step2State: 'active',
    step2Title: 'Step Two',
    step2Description: 'Desc for step two',
    step3State: 'default',
    step3Title: 'Step Three',
    step3Description: 'Desc for step three',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    `;

    // Contenedor para el stepper
    const stepperContainer = document.createElement('div');
    stepperContainer.id = `stepper-container-${Date.now()}`;
    stepperContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;

    const createStepperContent = () => {
      // Limpiar contenedor
      stepperContainer.innerHTML = '';

      // Construir array de pasos
      const numSteps = args.numSteps || 3;
      const steps: StepperStep[] = [];

      for (let i = 1; i <= numSteps; i++) {
        const stepState = (args as any)[`step${i}State`] || (i === 1 ? 'completed' : i === 2 ? 'active' : 'default');
        const stepTitle = (args as any)[`step${i}Title`] || `Step ${i === 1 ? 'One' : i === 2 ? 'Two' : i === 3 ? 'Three' : i === 4 ? 'Four' : 'Five'}`;
        const stepDescription = (args as any)[`step${i}Description`] || `Desc for step ${i === 1 ? 'one' : i === 2 ? 'two' : i === 3 ? 'three' : i === 4 ? 'four' : 'five'}`;

        steps.push({
          number: i,
          title: stepTitle,
          description: stepDescription,
          state: stepState,
        });
      }

      // Crear opciones del stepper
      const stepperOptions: StepperOptions = {
        orientation: args.orientation || 'horizontal',
        size: args.size || 'md',
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        steps: steps,
      };

      // Renderizar stepper
      try {
        const html = renderStepper(stepperOptions);
        stepperContainer.innerHTML = html;
      } catch (error) {
        console.error('Error al renderizar stepper:', error);
        stepperContainer.innerHTML = '<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error al renderizar el stepper</p>';
      }
    };

    // Crear contenido inicial
    createStepperContent();

    // Observar cambios en args
    let lastArgs = JSON.stringify(args);
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startWatching = () => {
      if (checkInterval) return;

      checkInterval = setInterval(() => {
        const currentArgs = JSON.stringify(args);
        if (currentArgs !== lastArgs) {
          lastArgs = currentArgs;
          createStepperContent();
        }
      }, 100);
    };

    startWatching();

    // Limpiar al desmontar usando MutationObserver (DOMNodeRemoved está deprecado)
    const cleanup = () => {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      stepperContainer.innerHTML = '';
    };

    // Usar MutationObserver para detectar cuando el contenedor se elimina
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach((node) => {
            if (node === container || (node instanceof Element && node.contains(container))) {
              cleanup();
              observer.disconnect();
            }
          });
        }
      });
    });

    // Observar el contenedor padre cuando esté disponible
    setTimeout(() => {
      const parent = container.parentElement;
      if (parent) {
        observer.observe(parent, { childList: true, subtree: true });
      }
    }, 0);

    container.appendChild(stepperContainer);

    return container;
  },
};

// Helper para renderizar Stepper de manera consistente
function renderStepperStory(options: StepperOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100%;
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-1);
    min-height: 200px;
  `;

  const stepperContainer = document.createElement('div');
  stepperContainer.id = `stepper-container-${Date.now()}`;
  stepperContainer.style.cssText = `
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  `;

  try {
    const html = renderStepper(options);
    stepperContainer.innerHTML = html;
  } catch (error) {
    console.error('Error al renderizar stepper:', error);
    stepperContainer.innerHTML = '<p style="color: var(--modifiers-normal-color-light-feedback-accent-error);">Error al renderizar el stepper</p>';
  }

  container.appendChild(stepperContainer);
  return container;
}

/**
 * OrientationHorizontal
 * Stepper orientación horizontal
 */
export const OrientationHorizontal: Story = {
  name: 'Orientation - Horizontal',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con orientación horizontal.',
      },
    },
  },
};

/**
 * OrientationVertical
 * Stepper orientación vertical
 */
export const OrientationVertical: Story = {
  name: 'Orientation - Vertical',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'vertical',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con orientación vertical.',
      },
    },
  },
};

/**
 * SizeXS
 * Stepper tamaño extra pequeño
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'xs',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper tamaño extra pequeño (xs).',
      },
    },
  },
};

/**
 * SizeSM
 * Stepper tamaño pequeño
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'sm',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper tamaño pequeño (sm).',
      },
    },
  },
};

/**
 * SizeMD
 * Stepper tamaño mediano
 */
export const SizeMD: Story = {
  name: 'Size - MD',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper tamaño mediano (md).',
      },
    },
  },
};

/**
 * SizeLG
 * Stepper tamaño grande
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'lg',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper tamaño grande (lg).',
      },
    },
  },
};

/**
 * WithTitle
 * Stepper con títulos
 */
export const WithTitle: Story = {
  name: 'With Title',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', state: 'completed' },
      { number: 2, title: 'Step Two', state: 'active' },
      { number: 3, title: 'Step Three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: false,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con títulos, sin descripciones.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Stepper sin títulos
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: false,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper sin títulos, solo con descripciones.',
      },
    },
  },
};

/**
 * WithDescription
 * Stepper con descripciones
 */
export const WithDescription: Story = {
  name: 'With Description',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con títulos y descripciones.',
      },
    },
  },
};

/**
 * WithoutDescription
 * Stepper sin descripciones
 */
export const WithoutDescription: Story = {
  name: 'Without Description',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', state: 'completed' },
      { number: 2, title: 'Step Two', state: 'active' },
      { number: 3, title: 'Step Three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: false,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con títulos, sin descripciones.',
      },
    },
  },
};

/**
 * WithoutTitleAndDescription
 * Stepper sin títulos ni descripciones
 */
export const WithoutTitleAndDescription: Story = {
  name: 'Without Title and Description',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: false,
      showDescription: false,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper sin títulos ni descripciones, solo indicadores numéricos.',
      },
    },
  },
};

/**
 * StateDefault
 * Paso en estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'default' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'default' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con todos los pasos en estado default.',
      },
    },
  },
};

/**
 * StateCompleted
 * Paso en estado completed
 */
export const StateCompleted: Story = {
  name: 'State - Completed',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'completed' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'completed' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con todos los pasos en estado completed (muestra checkmark).',
      },
    },
  },
};

/**
 * StateActive
 * Paso en estado active
 */
export const StateActive: Story = {
  name: 'State - Active',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'active' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'active' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con todos los pasos en estado active.',
      },
    },
  },
};

/**
 * StateError
 * Paso en estado error
 */
export const StateError: Story = {
  name: 'State - Error',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'error' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'error' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'error' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con todos los pasos en estado error.',
      },
    },
  },
};

/**
 * StateWarning
 * Paso en estado warning
 */
export const StateWarning: Story = {
  name: 'State - Warning',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'warning' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'warning' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'warning' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con todos los pasos en estado warning.',
      },
    },
  },
};

/**
 * TwoSteps
 * Stepper con 2 pasos
 */
export const TwoSteps: Story = {
  name: 'Two Steps',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con 2 pasos.',
      },
    },
  },
};

/**
 * ThreeSteps
 * Stepper con 3 pasos
 */
export const ThreeSteps: Story = {
  name: 'Three Steps',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con 3 pasos.',
      },
    },
  },
};

/**
 * FourSteps
 * Stepper con 4 pasos
 */
export const FourSteps: Story = {
  name: 'Four Steps',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'completed' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'active' },
      { number: 4, title: 'Step Four', description: 'Desc for step four', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con 4 pasos.',
      },
    },
  },
};

/**
 * FiveSteps
 * Stepper con 5 pasos
 */
export const FiveSteps: Story = {
  name: 'Five Steps',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'completed' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'active' },
      { number: 4, title: 'Step Four', description: 'Desc for step four', state: 'default' },
      { number: 5, title: 'Step Five', description: 'Desc for step five', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con 5 pasos.',
      },
    },
  },
};

/**
 * AllStates
 * Stepper con todos los estados
 */
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Completed state', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Active state', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Default state', state: 'default' },
      { number: 4, title: 'Step Four', description: 'Error state', state: 'error' },
      { number: 5, title: 'Step Five', description: 'Warning state', state: 'warning' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper mostrando todos los estados posibles (completed, active, default, error, warning).',
      },
    },
  },
};

/**
 * ProgressiveSteps
 * Stepper con pasos progresivos
 */
export const ProgressiveSteps: Story = {
  name: 'Progressive Steps',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Completed', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Active', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Pending', state: 'default' },
      { number: 4, title: 'Step Four', description: 'Pending', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con pasos progresivos (completed → active → default).',
      },
    },
  },
};

/**
 * MixedStates
 * Stepper con estados mixtos
 */
export const MixedStates: Story = {
  name: 'Mixed States',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Completed', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Active', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Error', state: 'error' },
      { number: 4, title: 'Step Four', description: 'Warning', state: 'warning' },
      { number: 5, title: 'Step Five', description: 'Default', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con estados mixtos (completed, active, error, warning, default).',
      },
    },
  },
};

/**
 * LongTitles
 * Stepper con títulos largos
 */
export const LongTitles: Story = {
  name: 'Long Titles',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Este es un título muy largo que debería truncarse correctamente', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Este es otro título muy largo que también debería truncarse correctamente', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Y este es un tercer título largo para probar el truncamiento', description: 'Desc for step three', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con títulos largos. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * LongDescriptions
 * Stepper con descripciones largas
 */
export const LongDescriptions: Story = {
  name: 'Long Descriptions',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Esta es una descripción muy larga que debería truncarse correctamente en el stepper para evitar que se desborde del contenedor', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Esta es otra descripción muy larga que también debería truncarse correctamente para mantener un diseño limpio y profesional', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Y esta es una tercera descripción larga para probar el truncamiento de texto en múltiples pasos', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper con descripciones largas. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * MinimalExample
 * Ejemplo mínimo
 */
export const MinimalExample: Story = {
  name: 'Minimal Example',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', state: 'completed' },
      { number: 2, title: 'Step Two', state: 'active' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: false,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper mínimo con 2 pasos, sin descripciones.',
      },
    },
  },
};

/**
 * CompleteExample
 * Ejemplo completo
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  render: () => {
    const steps: StepperStep[] = [
      { number: 1, title: 'Step One', description: 'Desc for step one', state: 'completed' },
      { number: 2, title: 'Step Two', description: 'Desc for step two', state: 'active' },
      { number: 3, title: 'Step Three', description: 'Desc for step three', state: 'default' },
      { number: 4, title: 'Step Four', description: 'Desc for step four', state: 'default' }
    ];
    
    return renderStepperStory({
      orientation: 'horizontal',
      size: 'md',
      showTitle: true,
      showDescription: true,
      steps: steps
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper completo con todas las opciones: 4 pasos, títulos, descripciones y estados progresivos.',
      },
    },
  },
};

