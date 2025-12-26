/**
 * Tooltip Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createTooltip, renderTooltip } from '../../../components/tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../../components/tooltip/src/types/TooltipOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/tooltip/src/styles/tooltip.css';
import '../../../components/button/src/styles/button.css';

const meta: Meta<TooltipOptions> = {
  title: 'Feedback/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción.

\`\`\`html
const tooltipInstance = window.UBITS.Tooltip.create({
  title: 'Información útil',
  showTitle: true,
  description: 'Este es un tooltip con información contextual.',
  showDescription: true,
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  showPrimaryButton: false,
  open: true
});
\`\`\`',
      },
    },
    layout: 'fullscreen',
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-tooltip',
      api: {
        create: 'window.UBITS.Tooltip.create',
        tag: '<ubits-tooltip>',
      },
      dependsOn: {
        required: [], // Tooltip no requiere otros componentes
        optional: ['🧩-ux-button'], // Botones de acción son opcionales
      },
      internals: [], // Tooltip no tiene componentes internos privados
      slots: {}, // Tooltip no tiene slots públicos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-fg-1-high',
        '--ubits-spacing-md',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: "window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción o mensaje del tooltip',\n  tailPosition: 'top',\n  onClose: () => {}\n});",
        basic: "window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción o mensaje del tooltip',\n  tailPosition: 'top'\n});",
        withButtons: "window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción del tooltip',\n  showPrimaryButton: true,\n  primaryButtonLabel: 'Aceptar',\n  tailPosition: 'top'\n});",
        differentPosition: "window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción del tooltip',\n  tailPosition: 'bottom'\n});",
      },
      variants: {
        width: ['xs', 'sm', 'md', 'lg', 'xl'],
        tailPosition: ['top', 'bottom', 'left', 'right'],
        showTitle: [true, false],
        showDescription: [true, false],
        showPrimaryButton: [true, false],
        showSecondaryButton: [true, false],
        showTertiaryButton: [true, false],
      },
      events: {
        onClose: {
          type: 'Event',
          description: 'Emitted when tooltip is closed',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'feedback-tooltip--implementation',
        storiesByExample: {
          canonical: 'feedback-tooltip--implementation',
          basic: 'feedback-tooltip--default',
          withButtons: 'feedback-tooltip--with-buttons',
          differentPosition: 'feedback-tooltip--different-position',
        },
      },
      intents: {
        'tooltip.info': 'canonical',
        'tooltip.help': 'canonical',
        'tooltip.hint': 'canonical',
        'tooltip.with-buttons': 'withButtons',
        'tooltip.position': 'differentPosition',
      },
    }),
  },
  args: {
    title: 'Título del tooltip',
    showTitle: true,
    description: 'Descripción o mensaje del tooltip',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    showPrimaryButton: false,
    showSecondaryButton: false,
    showTertiaryButton: false,
    open: false,
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del tooltip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Contenido',
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descripción o mensaje del tooltip (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar descripción',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del tooltip (sm: 120-240px, md: 160-320px, lg: 200-400px)',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    tailPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tail (flecha) del tooltip',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'top' },
        category: 'Apariencia',
      },
    },
    tailOffset: {
      control: { type: 'number' },
      description: 'Offset del tail desde el centro (en píxeles)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Apariencia',
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botones',
      },
    },
    primaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón primario',
      table: {
        type: { summary: 'string' },
        category: 'Botones',
      },
    },
    secondaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario',
      table: {
        type: { summary: 'string' },
        category: 'Botones',
      },
    },
    tertiaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón terciario',
      table: {
        type: { summary: 'string' },
        category: 'Botones',
      },
    },
    onPrimaryAction: {
      action: 'primaryAction',
      description: 'Callback cuando se hace click en el botón primario',
      table: {
        disable: true,
      },
    },
    onSecondaryAction: {
      action: 'secondaryAction',
      description: 'Callback cuando se hace click en el botón secundario',
      table: {
        disable: true,
      },
    },
    onTertiaryAction: {
      action: 'tertiaryAction',
      description: 'Callback cuando se hace click en el botón terciario',
      table: {
        disable: true,
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback cuando se cierra el tooltip',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TooltipOptions>;

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
    title: 'Información útil',
    showTitle: true,
    description: 'Este es un tooltip con información contextual.',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    showPrimaryButton: false,
    open: true,
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `const tooltipInstance = window.UBITS.Tooltip.create({
  title: 'Información útil',
  showTitle: true,
  description: 'Este es un tooltip con información contextual.',
  showDescription: true,
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  showPrimaryButton: false,
  open: true
});`,
      },
    },
  },
  render: (args) => {
    console.log('🔵 [Tooltip Implementation] Render iniciado', {
      args: JSON.stringify(args),
      open: args.open,
      timestamp: new Date().toISOString()
    });

    // ⭐ Identificador único para esta instancia de story
    const storyInstanceId = `tooltip-implementation-${Date.now()}-${Math.random()}`;

    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-tooltip');
    container.setAttribute('data-ubits-component', 'Tooltip');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
    let isUpdating = false; // Flag para prevenir cleanup durante actualizaciones

    const createOrUpdateTooltip = () => {
      isUpdating = true;
      console.log('🟢 [Tooltip Implementation] createOrUpdateTooltip llamado', {
        args: JSON.stringify(args),
        open: args.open,
        tieneInstancia: !!tooltipInstance,
        timestamp: new Date().toISOString()
      });

      // Destruir tooltip anterior si existe
      if (tooltipInstance) {
        console.log('🟡 [Tooltip Implementation] Destruyendo tooltip anterior');
        tooltipInstance.destroy();
        tooltipInstance = null;
      }

      // Crear tooltip con los args actuales
      console.log('🟢 [Tooltip Implementation] Creando nuevo tooltip');
      tooltipInstance = createTooltip({
        ...args,
        closeOnOutsideClick: false, // Deshabilitar cierre automático en story Implementation
        primaryButtonLabel: args.primaryButtonLabel || 'Aceptar',
        secondaryButtonLabel: args.secondaryButtonLabel || 'Cancelar',
        tertiaryButtonLabel: args.tertiaryButtonLabel || 'Cerrar',
        onPrimaryAction: args.onPrimaryAction || (() => {
          console.log('🟢 [Tooltip Implementation] Botón primary clickeado');
          alert('Botón primario clickeado');
        }),
        onSecondaryAction: args.onSecondaryAction || (() => {
          console.log('🟢 [Tooltip Implementation] Botón secondary clickeado');
          alert('Botón secundario clickeado');
        }),
        onTertiaryAction: args.onTertiaryAction || (() => {
          console.log('🟢 [Tooltip Implementation] Botón tertiary clickeado');
          alert('Botón terciario clickeado');
        }),
        position: {
          top: 150, // Posición fija arriba centrado desde el inicio (con espacio para el tail)
          left: window.innerWidth / 2, // Centrar horizontalmente
        },
      });

      if (args.open) {
        console.log('🟢 [Tooltip Implementation] Abriendo tooltip (args.open=true)');
        // Usar requestAnimationFrame para asegurar que el tooltip esté en el DOM
        requestAnimationFrame(() => {
          if (tooltipInstance) {
            tooltipInstance.open();
            isUpdating = false;
          }
        });
      } else {
        isUpdating = false;
        console.log('🟡 [Tooltip Implementation] NO abriendo tooltip (args.open=false)');
      }
    };

    // Crear tooltip inicial
    createOrUpdateTooltip();

    // Indicador
    const indicator = document.createElement('div');
    indicator.style.padding = '20px';
    indicator.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    indicator.textContent = 'Tooltip abierto (ver overlay)';
    container.appendChild(indicator);

    // Detectar cambios en los args para actualizar el tooltip
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        console.log('🟡 [Tooltip Implementation] Args cambiaron', {
          lastArgs: lastArgs.substring(0, 100),
          currentArgs: currentArgs.substring(0, 100),
          open: args.open
        });
        lastArgs = currentArgs;
        createOrUpdateTooltip();
      }
    }, 100);

    // ⭐ NO usar cleanup local - el cleanup global en preview.ts se encarga de limpiar
    // tooltips de otras stories. El tooltip de esta story se mantiene durante re-renders.
    // Solo limpiar el intervalo cuando realmente se desmonte (si Storybook lo requiere)
    // Pero NO destruir el tooltip aquí porque puede ser un re-render

    return container;
  },
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
  args: {
    title: 'Título del tooltip',
    showTitle: true,
    description: 'Descripción o mensaje del tooltip',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    showPrimaryButton: false,
    open: false,
  },
  render: (args) => {
    console.log('🔵 [Tooltip Default] Render iniciado', {
      args: JSON.stringify(args),
      timestamp: new Date().toISOString()
    });

    // Verificar si hay un tooltip abierto antes de limpiar
    // Esto preserva el estado entre re-renderizados
    const existingOpenTooltip = document.querySelector('.ubits-tooltip--open');
    const wasTooltipOpen = !!existingOpenTooltip;
    console.log('🔵 [Tooltip Default] Estado inicial', {
      wasTooltipOpen,
      existingOpenTooltip: !!existingOpenTooltip,
      tooltipsEnDOM: document.querySelectorAll('.ubits-tooltip').length
    });

    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    // ⭐ Identificador único para esta instancia de story
    const storyInstanceId = `tooltip-default-${Date.now()}-${Math.random()}`;

    const button = document.createElement('button');
    button.className = 'ubits-button ubits-button--primary ubits-button--md';
    button.innerHTML = '<span>Mostrar Tooltip</span>';

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
    let isTooltipOpen = wasTooltipOpen;

    const createOrUpdateTooltip = () => {
      console.log('🟢 [Tooltip Default] createOrUpdateTooltip llamado', {
        isTooltipOpen,
        tieneInstancia: !!tooltipInstance,
        args: JSON.stringify(args),
        timestamp: new Date().toISOString()
      });

      // ⭐ Limpiar tooltips de otras stories ANTES de crear uno nuevo
      // Esto previene duplicados cuando cambias entre stories
      const existingTooltips = document.querySelectorAll('.ubits-tooltip');
      existingTooltips.forEach((tooltip) => {
        const tooltipStoryId = tooltip.getAttribute('data-story-instance-id');
        // Solo limpiar tooltips que NO pertenezcan a esta instancia de story
        if (tooltipStoryId !== storyInstanceId) {
          try {
            const tooltipElement = tooltip as any;
            if (tooltipElement.__tooltipInstance?.destroy) {
              try {
                tooltipElement.__tooltipInstance.destroy();
              } catch (e) {
                // Ignorar errores
              }
            }
            if (tooltip.parentElement) {
              tooltip.parentElement.removeChild(tooltip);
            } else {
              tooltip.remove();
            }
          } catch (e) {
            // Ignorar errores
          }
        }
      });

      // Limpiar tooltip anterior si existe (de esta misma instancia)
      if (tooltipInstance) {
        console.log('🟡 [Tooltip Default] Destruyendo tooltip anterior');
        tooltipInstance.destroy();
        tooltipInstance = null;
      }

      // Crear tooltip con los args actuales
      console.log('🟢 [Tooltip Default] Creando nuevo tooltip con args:', {
        title: args.title,
        showPrimaryButton: args.showPrimaryButton,
        showSecondaryButton: args.showSecondaryButton,
        showTertiaryButton: args.showTertiaryButton
      });
      tooltipInstance = createTooltip({
        ...args,
        closeOnOutsideClick: false, // Deshabilitar cierre automático para que los controles funcionen
        // ⭐ Asegurar que siempre haya labels cuando los botones están habilitados
        primaryButtonLabel: args.showPrimaryButton 
          ? (args.primaryButtonLabel || 'Aceptar')
          : undefined,
        secondaryButtonLabel: args.showSecondaryButton
          ? (args.secondaryButtonLabel || 'Cancelar')
          : undefined,
        tertiaryButtonLabel: args.showTertiaryButton
          ? (args.tertiaryButtonLabel || 'Cerrar')
          : undefined,
        // ⭐ Asegurar que siempre haya callbacks cuando los botones están habilitados
        onPrimaryAction: args.showPrimaryButton
          ? (args.onPrimaryAction || (() => {
            console.log('🟢 [Tooltip Default] Botón primary clickeado');
            alert('Botón primario clickeado');
          }))
          : undefined,
        onSecondaryAction: args.showSecondaryButton
          ? (args.onSecondaryAction || (() => {
            console.log('🟢 [Tooltip Default] Botón secondary clickeado');
            alert('Botón secundario clickeado');
          }))
          : undefined,
        onTertiaryAction: args.showTertiaryButton
          ? (args.onTertiaryAction || (() => {
            console.log('🟢 [Tooltip Default] Botón tertiary clickeado');
            alert('Botón terciario clickeado');
          }))
          : undefined,
        // ⭐ Usar posición fija centrada arriba (igual que Implementation)
        position: {
          top: 150, // Posición fija arriba centrado desde el inicio (con espacio para el tail)
          left: window.innerWidth / 2, // Centrar horizontalmente
        },
        onClose: () => {
          console.log('🔴 [Tooltip Default] onClose llamado');
          if (tooltipInstance) {
            tooltipInstance.destroy();
            tooltipInstance = null;
          }
          isTooltipOpen = false;
          button.style.display = 'flex';
        },
      });

      // ⭐ Marcar el tooltip con el identificador de esta instancia de story
      // Esto permite que Docs muestre el tooltip sin problemas
      if (tooltipInstance.element) {
        tooltipInstance.element.setAttribute('data-story-instance-id', storyInstanceId);
      }

      // Si estaba abierto, abrirlo de nuevo
      if (isTooltipOpen) {
        console.log('🟢 [Tooltip Default] Abriendo tooltip (isTooltipOpen=true)');
        // Usar requestAnimationFrame para asegurar que el tooltip esté en el DOM
        requestAnimationFrame(() => {
          if (tooltipInstance) {
            console.log('🟢 [Tooltip Default] Llamando tooltipInstance.open()');
            tooltipInstance.open();
            button.style.display = 'none';
            // Verificar después de abrir
            setTimeout(() => {
              const tooltipAbierto = document.querySelector('.ubits-tooltip--open');
              console.log('🟢 [Tooltip Default] Tooltip abierto?', {
                abierto: !!tooltipAbierto,
                enDOM: !!document.querySelector('.ubits-tooltip')
              });
            }, 50);
          } else {
            console.error('🔴 [Tooltip Default] tooltipInstance es null en requestAnimationFrame');
          }
        });
      } else {
        console.log('🟡 [Tooltip Default] NO abriendo tooltip (isTooltipOpen=false)');
      }
    };

    button.addEventListener('click', () => {
      console.log('🟢 [Tooltip Default] Botón clickeado');
      isTooltipOpen = true;
      createOrUpdateTooltip();
    });

    container.appendChild(button);

    // Si el tooltip estaba abierto antes del re-render, recrearlo
    if (wasTooltipOpen) {
      console.log('🟢 [Tooltip Default] Recreando tooltip porque estaba abierto antes');
      createOrUpdateTooltip();
    } else {
      console.log('🟡 [Tooltip Default] NO recreando tooltip (no estaba abierto antes)');
    }

    // Detectar cambios en los args para actualizar el tooltip si está abierto
    let lastArgs = JSON.stringify(args);
    const checkArgs = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        console.log('🟡 [Tooltip Default] Args cambiaron', {
          lastArgs: lastArgs.substring(0, 100),
          currentArgs: currentArgs.substring(0, 100),
          isTooltipOpen,
          tooltipEnDOM: !!document.querySelector('.ubits-tooltip'),
          tooltipAbierto: !!document.querySelector('.ubits-tooltip--open')
        });
        lastArgs = currentArgs;
        // Verificar si el tooltip está realmente abierto en el DOM
        const tooltipIsOpen = isTooltipOpen || !!document.querySelector('.ubits-tooltip--open');
        console.log('🟡 [Tooltip Default] Verificando si actualizar', {
          tooltipIsOpen,
          isTooltipOpen,
          tooltipEnDOM: !!document.querySelector('.ubits-tooltip'),
          tooltipAbierto: !!document.querySelector('.ubits-tooltip--open')
        });
        if (tooltipIsOpen) {
          console.log('🟢 [Tooltip Default] Actualizando tooltip porque está abierto');
          createOrUpdateTooltip();
        } else {
          console.log('🟡 [Tooltip Default] NO actualizando tooltip (no está abierto)');
        }
      }
    }, 100);

    // ⭐ NO usar cleanup local - el cleanup global en preview.ts se encarga de limpiar
    // tooltips de otras stories. El tooltip de esta story se mantiene durante re-renders.
    // Solo limpiar el intervalo cuando realmente se desmonte (si Storybook lo requiere)
    // Pero NO destruir el tooltip aquí porque puede ser un re-render

    return container;
  },
};
