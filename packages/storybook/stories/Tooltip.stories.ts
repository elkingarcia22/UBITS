import type { Meta, StoryObj } from '@storybook/html';
import { createTooltip, renderTooltip } from '../../components/tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../components/tooltip/src/types/TooltipOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import '../../components/tooltip/src/styles/tooltip.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<TooltipOptions> = {
  title: 'Feedback/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción (primario, secundario y terciario). El tooltip se adapta automáticamente al contenido usando min-width y max-width según el tamaño seleccionado (sm: 120-240px, md: 160-320px, lg: 200-400px). El ancho máximo se ajusta según la cantidad de botones visibles (3 botones: mínimo 420px, 2 botones: mínimo 360px), y el tamaño del tooltip determina el tamaño de los botones (sm→xs, md→sm, lg→md).',
      },
    },
    layout: 'fullscreen',
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
      description: 'Tamaño del tooltip que determina min-width y max-width (sm: 120-240px, md: 160-320px, lg: 200-400px). El tooltip se adapta automáticamente al contenido entre estos límites. El ancho máximo se ajusta según la cantidad de botones (3 botones: mínimo 420px, 2 botones: mínimo 360px). El tamaño también determina el tamaño de los botones (sm→xs, md→sm, lg→md).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    tailPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tail (flecha) del tooltip',
      table: {
        type: { summary: 'string' },
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
    primaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón primario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    primaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón primario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón primario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Primario',
      },
    },
    secondaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón secundario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón secundario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Secundario',
      },
    },
    tertiaryButtonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón terciario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Terciario',
      },
    },
    showTertiaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón terciario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Terciario',
      },
    },
    tertiaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón terciario',
      table: {
        type: { summary: 'string' },
        category: 'Botón Terciario',
      },
    },
    showTertiaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón terciario',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Botón Terciario',
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si el tooltip está abierto inicialmente',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    closeOnOutsideClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic fuera del tooltip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TooltipOptions>;

export const Default: Story = {
  args: {
    title: 'Título del Tooltip',
    showTitle: true,
    description: 'Esta es la descripción del tooltip que proporciona información adicional al usuario.',
    showDescription: true,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    primaryButtonLabel: 'Aceptar',
    showPrimaryButton: false,
    primaryButtonIcon: 'check',
    showPrimaryButtonIcon: false,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false,
    tertiaryButtonLabel: 'Más info',
    showTertiaryButton: false,
    tertiaryButtonIcon: 'info-circle',
    showTertiaryButtonIcon: false,
    open: true,
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'tooltip-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';

    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.setAttribute('data-tooltip-trigger', 'true');
    openButton.innerHTML = '<span>Abrir Tooltip</span>';
    openButton.style.width = 'auto';
    openButton.style.zIndex = '1001';

    container.appendChild(openButton);

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;

    const updateButtonText = () => {
      const isOpen = tooltipInstance && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Tooltip' : 'Abrir Tooltip';
    };

    const destroyTooltip = () => {
      if (tooltipInstance) {
        try {
          tooltipInstance.destroy();
        } catch (e) {
          console.error('Error al destruir tooltip:', e);
        }
        tooltipInstance = null;
      }
      // También asegurarnos de que no queden tooltips huérfanos en el DOM
      const existingTooltips = document.querySelectorAll('.ubits-tooltip');
      existingTooltips.forEach((tooltip) => {
        if (tooltip.parentElement) {
          tooltip.remove();
        }
      });
    };

    const createAndOpenTooltip = () => {
      // Siempre destruir antes de crear nuevo
      destroyTooltip();

      const buttonRect = openButton.getBoundingClientRect();
      
      // SIEMPRE mostrar el tooltip arriba del botón, pero conservar la posición del tail según la configuración
      // El tooltip se posiciona arriba, pero el triángulo puede apuntar en diferentes direcciones
      // Calcular posición para que el tooltip aparezca arriba del botón
      // Necesitamos calcular la altura del tooltip después de crearlo
      // Usamos un valor estimado más grande para asegurar que esté completamente arriba
      const estimatedTooltipHeight = 200; // Altura estimada del tooltip
      const position: { top: number; left: number } = {
        top: buttonRect.top - estimatedTooltipHeight - 9, // Arriba del botón menos altura del tooltip menos tail
        left: buttonRect.left + buttonRect.width / 2, // Centrado horizontalmente
      };

      tooltipInstance = createTooltip({
        title: args.title,
        showTitle: args.showTitle !== undefined ? args.showTitle : true,
        description: args.description,
        showDescription: args.showDescription !== undefined ? args.showDescription : true,
        width: args.width,
        tailPosition: args.tailPosition, // Conservar la posición del tail según la configuración del usuario
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton || false,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon || false,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton || false,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon || false,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton || false,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon || false,
        onPrimaryAction: () => {
          alert('Botón primario clickeado!');
        },
        onSecondaryAction: () => {
          alert('Botón secundario clickeado!');
        },
        onTertiaryAction: () => {
          alert('Botón terciario clickeado!');
        },
        onClose: () => {
          if (args.onClose) {
            args.onClose();
          }
          updateButtonText();
        },
        open: false, // Siempre crear cerrado, luego abrir con el botón
        closeOnOutsideClick: args.closeOnOutsideClick !== undefined ? args.closeOnOutsideClick : true,
        position: position,
      });

      // Ajustar posición después de crear el tooltip (siempre arriba del botón)
      if (tooltipInstance) {
        setTimeout(() => {
          const tooltipHeight = tooltipInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          tooltipInstance.updatePosition({
            top: buttonRect.top - tooltipHeight - 9,
            left: buttonRect.left + buttonRect.width / 2,
          });
        }, 0);
      }

      updateButtonText();
    };

    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!tooltipInstance || !tooltipInstance.element || !tooltipInstance.element.parentElement) {
        createAndOpenTooltip();
        setTimeout(() => {
          if (tooltipInstance) {
            tooltipInstance.open();
            updateButtonText();
          }
        }, 10);
        return;
      }
      
      const isOpen = tooltipInstance.element.classList.contains('ubits-tooltip--open');
      if (isOpen) {
        tooltipInstance.close();
      } else {
        tooltipInstance.open();
      }
      updateButtonText();
    };

    openButton.addEventListener('click', handleButtonClick);

    // Recrear tooltip cuando cambian los args (Storybook controls)
    const recreateTooltip = () => {
      const wasOpen = tooltipInstance && tooltipInstance.element && tooltipInstance.element.classList.contains('ubits-tooltip--open');
      destroyTooltip();
      setTimeout(() => {
        createAndOpenTooltip();
        if (wasOpen && tooltipInstance) {
          setTimeout(() => {
            if (tooltipInstance) {
              tooltipInstance.open();
              updateButtonText();
            }
          }, 10);
        }
      }, 10);
    };

    // Initial render if open is true
    if (args.open) {
      setTimeout(() => {
        createAndOpenTooltip();
        if (tooltipInstance) {
          tooltipInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      setTimeout(() => {
        createAndOpenTooltip();
      }, 100);
    }

    // Observer para detectar cambios en los args de Storybook
    let lastArgs = JSON.stringify({
      title: args.title,
      showTitle: args.showTitle,
      description: args.description,
      showDescription: args.showDescription,
      width: args.width,
      tailPosition: args.tailPosition,
      tailOffset: args.tailOffset,
      primaryButtonLabel: args.primaryButtonLabel,
      showPrimaryButton: args.showPrimaryButton,
      primaryButtonIcon: args.primaryButtonIcon,
      showPrimaryButtonIcon: args.showPrimaryButtonIcon,
      secondaryButtonLabel: args.secondaryButtonLabel,
      showSecondaryButton: args.showSecondaryButton,
      secondaryButtonIcon: args.secondaryButtonIcon,
      showSecondaryButtonIcon: args.showSecondaryButtonIcon,
      tertiaryButtonLabel: args.tertiaryButtonLabel,
      showTertiaryButton: args.showTertiaryButton,
      tertiaryButtonIcon: args.tertiaryButtonIcon,
      showTertiaryButtonIcon: args.showTertiaryButtonIcon,
      closeOnOutsideClick: args.closeOnOutsideClick,
    });
    
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify({
        title: args.title,
        showTitle: args.showTitle,
        description: args.description,
        showDescription: args.showDescription,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        primaryButtonLabel: args.primaryButtonLabel,
        showPrimaryButton: args.showPrimaryButton,
        primaryButtonIcon: args.primaryButtonIcon,
        showPrimaryButtonIcon: args.showPrimaryButtonIcon,
        secondaryButtonLabel: args.secondaryButtonLabel,
        showSecondaryButton: args.showSecondaryButton,
        secondaryButtonIcon: args.secondaryButtonIcon,
        showSecondaryButtonIcon: args.showSecondaryButtonIcon,
        tertiaryButtonLabel: args.tertiaryButtonLabel,
        showTertiaryButton: args.showTertiaryButton,
        tertiaryButtonIcon: args.tertiaryButtonIcon,
        showTertiaryButtonIcon: args.showTertiaryButtonIcon,
        closeOnOutsideClick: args.closeOnOutsideClick,
      });
      
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        recreateTooltip();
      }
    }, 100);

    // Limpiar interval al desmontar usando MutationObserver (reemplazo de DOMNodeRemoved deprecado)
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        clearInterval(checkInterval);
        destroyTooltip();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return container;
  },
};

// Helper para renderizar Tooltip de manera consistente
function renderTooltipStory(options: Partial<TooltipOptions>, autoOpen: boolean = false) {
  const container = document.createElement('div');
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.padding = '40px';

  const openButton = createButton({
    variant: 'primary',
    size: 'md',
    text: 'Abrir Tooltip',
  });
  openButton.setAttribute('data-tooltip-trigger', 'true');
  openButton.style.width = 'auto';
  openButton.style.zIndex = '1001';

  container.appendChild(openButton);

  let tooltipInstance: ReturnType<typeof createTooltip> | null = null;

  const updateButtonText = () => {
    const isOpen = tooltipInstance && tooltipInstance.element.classList.contains('ubits-tooltip--open');
    const span = openButton.querySelector('span');
    if (span) {
      span.textContent = isOpen ? 'Cerrar Tooltip' : 'Abrir Tooltip';
    }
  };

  const destroyTooltip = () => {
    if (tooltipInstance) {
      try {
        tooltipInstance.destroy();
      } catch (e) {
        console.error('Error al destruir tooltip:', e);
      }
      tooltipInstance = null;
    }
    const existingTooltips = document.querySelectorAll('.ubits-tooltip');
    existingTooltips.forEach((tooltip) => {
      if (tooltip.parentElement) {
        tooltip.remove();
      }
    });
  };

  const createAndOpenTooltip = () => {
    destroyTooltip();

    const buttonRect = openButton.getBoundingClientRect();
    const estimatedTooltipHeight = 200;
    const position: { top: number; left: number } = {
      top: buttonRect.top - estimatedTooltipHeight - 9,
      left: buttonRect.left + buttonRect.width / 2,
    };

    tooltipInstance = createTooltip({
      title: options.title,
      showTitle: options.showTitle !== undefined ? options.showTitle : true,
      description: options.description,
      showDescription: options.showDescription !== undefined ? options.showDescription : true,
      width: options.width || 'md',
      tailPosition: options.tailPosition || 'top',
      tailOffset: options.tailOffset || 0,
      primaryButtonLabel: options.primaryButtonLabel,
      showPrimaryButton: options.showPrimaryButton || false,
      primaryButtonIcon: options.primaryButtonIcon,
      showPrimaryButtonIcon: options.showPrimaryButtonIcon || false,
      secondaryButtonLabel: options.secondaryButtonLabel,
      showSecondaryButton: options.showSecondaryButton || false,
      secondaryButtonIcon: options.secondaryButtonIcon,
      showSecondaryButtonIcon: options.showSecondaryButtonIcon || false,
      tertiaryButtonLabel: options.tertiaryButtonLabel,
      showTertiaryButton: options.showTertiaryButton || false,
      tertiaryButtonIcon: options.tertiaryButtonIcon,
      showTertiaryButtonIcon: options.showTertiaryButtonIcon || false,
      onPrimaryAction: options.onPrimaryAction,
      onSecondaryAction: options.onSecondaryAction,
      onTertiaryAction: options.onTertiaryAction,
      onClose: options.onClose,
      open: false,
      closeOnOutsideClick: options.closeOnOutsideClick !== false,
      position: position,
    });

    if (tooltipInstance) {
      setTimeout(() => {
        const tooltipHeight = tooltipInstance!.element.offsetHeight;
        const buttonRect = openButton.getBoundingClientRect();
        tooltipInstance!.updatePosition({
          top: buttonRect.top - tooltipHeight - 9,
          left: buttonRect.left + buttonRect.width / 2,
        });
      }, 0);
    }

    updateButtonText();
  };

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!tooltipInstance || !tooltipInstance.element || !tooltipInstance.element.parentElement) {
      createAndOpenTooltip();
      setTimeout(() => {
        if (tooltipInstance) {
          tooltipInstance.open();
          updateButtonText();
        }
      }, 10);
      return;
    }
    
    const isOpen = tooltipInstance.element.classList.contains('ubits-tooltip--open');
    if (isOpen) {
      tooltipInstance.close();
    } else {
      tooltipInstance.open();
    }
    updateButtonText();
  };

  openButton.addEventListener('click', handleButtonClick);

  if (autoOpen) {
    setTimeout(() => {
      createAndOpenTooltip();
      if (tooltipInstance) {
        tooltipInstance.open();
        updateButtonText();
      }
    }, 100);
  } else {
    setTimeout(() => {
      createAndOpenTooltip();
    }, 100);
  }

  return container;
}

/**
 * WidthSmall
 * Tooltip con ancho small
 */
export const WidthSmall: Story = {
  name: 'Width - Small',
  args: {
    title: 'Tooltip Small',
    description: 'Tooltip con ancho small (120-240px).',
    width: 'sm',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con ancho small (120-240px).',
      },
    },
  },
};

/**
 * WidthMedium
 * Tooltip con ancho medium (default)
 */
export const WidthMedium: Story = {
  name: 'Width - Medium (Default)',
  args: {
    title: 'Tooltip Medium',
    description: 'Tooltip con ancho medium (160-320px, valor por defecto).',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con ancho medium (160-320px, valor por defecto).',
      },
    },
  },
};

/**
 * WidthLarge
 * Tooltip con ancho large
 */
export const WidthLarge: Story = {
  name: 'Width - Large',
  args: {
    title: 'Tooltip Large',
    description: 'Tooltip con ancho large (200-400px).',
    width: 'lg',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con ancho large (200-400px).',
      },
    },
  },
};

/**
 * TailPositionTop
 * Tail en posición top (default)
 */
export const TailPositionTop: Story = {
  name: 'Tail Position - Top (Default)',
  args: {
    title: 'Tooltip con tail top',
    description: 'El tail (flecha) apunta hacia arriba.',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con tail en posición top (valor por defecto).',
      },
    },
  },
};

/**
 * TailPositionBottom
 * Tail en posición bottom
 */
export const TailPositionBottom: Story = {
  name: 'Tail Position - Bottom',
  args: {
    title: 'Tooltip con tail bottom',
    description: 'El tail (flecha) apunta hacia abajo.',
    width: 'md',
    tailPosition: 'bottom',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con tail en posición bottom.',
      },
    },
  },
};

/**
 * TailPositionLeft
 * Tail en posición left
 */
export const TailPositionLeft: Story = {
  name: 'Tail Position - Left',
  args: {
    title: 'Tooltip con tail left',
    description: 'El tail (flecha) apunta hacia la izquierda.',
    width: 'md',
    tailPosition: 'left',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con tail en posición left.',
      },
    },
  },
};

/**
 * TailPositionRight
 * Tail en posición right
 */
export const TailPositionRight: Story = {
  name: 'Tail Position - Right',
  args: {
    title: 'Tooltip con tail right',
    description: 'El tail (flecha) apunta hacia la derecha.',
    width: 'md',
    tailPosition: 'right',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con tail en posición right.',
      },
    },
  },
};

/**
 * TailOffset
 * Tail con offset personalizado
 */
export const TailOffset: Story = {
  name: 'Tail Offset',
  args: {
    title: 'Tooltip con tail offset',
    description: 'El tail tiene un offset de 20px desde el centro.',
    width: 'md',
    tailPosition: 'top',
    tailOffset: 20,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con tail que tiene un offset personalizado desde el centro.',
      },
    },
  },
};

/**
 * WithTitle
 * Tooltip con título
 */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    title: 'Título del Tooltip',
    description: 'Este tooltip incluye un título en el header.',
    width: 'md',
    tailPosition: 'top',
    showTitle: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con título visible en el header.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Tooltip sin título
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    description: 'Este tooltip no tiene título, solo descripción.',
    width: 'md',
    tailPosition: 'top',
    showTitle: false,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip sin título (showTitle: false).',
      },
    },
  },
};

/**
 * WithDescription
 * Tooltip con descripción
 */
export const WithDescription: Story = {
  name: 'With Description',
  args: {
    title: 'Tooltip con descripción',
    description: 'Este tooltip incluye una descripción en el body.',
    width: 'md',
    tailPosition: 'top',
    showDescription: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con descripción visible en el body.',
      },
    },
  },
};

/**
 * WithoutDescription
 * Tooltip sin descripción
 */
export const WithoutDescription: Story = {
  name: 'Without Description',
  args: {
    title: 'Tooltip sin descripción',
    width: 'md',
    tailPosition: 'top',
    showDescription: false,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip sin descripción (showDescription: false).',
      },
    },
  },
};

/**
 * TitleOnly
 * Tooltip solo con título
 */
export const TitleOnly: Story = {
  name: 'Title Only',
  args: {
    title: 'Solo título',
    width: 'md',
    tailPosition: 'top',
    showTitle: true,
    showDescription: false,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip solo con título, sin descripción.',
      },
    },
  },
};

/**
 * DescriptionOnly
 * Tooltip solo con descripción
 */
export const DescriptionOnly: Story = {
  name: 'Description Only',
  args: {
    description: 'Este tooltip solo tiene descripción, sin título.',
    width: 'md',
    tailPosition: 'top',
    showTitle: false,
    showDescription: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip solo con descripción, sin título.',
      },
    },
  },
};

/**
 * PrimaryButtonOnly
 * Tooltip solo con botón primario
 */
export const PrimaryButtonOnly: Story = {
  name: 'Primary Button Only',
  args: {
    title: 'Confirmar acción',
    description: '¿Deseas continuar?',
    width: 'md',
    tailPosition: 'top',
    primaryButtonLabel: 'Aceptar',
    showPrimaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip solo con botón primario.',
      },
    },
  },
};

/**
 * SecondaryButtonOnly
 * Tooltip solo con botón secundario
 */
export const SecondaryButtonOnly: Story = {
  name: 'Secondary Button Only',
  args: {
    title: 'Cancelar acción',
    description: '¿Deseas cancelar?',
    width: 'md',
    tailPosition: 'top',
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip solo con botón secundario.',
      },
    },
  },
};

/**
 * TertiaryButtonOnly
 * Tooltip solo con botón terciario
 */
export const TertiaryButtonOnly: Story = {
  name: 'Tertiary Button Only',
  args: {
    title: 'Más información',
    description: 'Obtén más detalles sobre esta acción.',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Más info',
    showTertiaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip solo con botón terciario.',
      },
    },
  },
};

/**
 * PrimaryAndSecondary
 * Tooltip con botones primario y secundario
 */
export const PrimaryAndSecondary: Story = {
  name: 'Primary and Secondary',
  args: {
    title: 'Confirmar cambios',
    description: '¿Deseas guardar los cambios?',
    width: 'md',
    tailPosition: 'top',
    primaryButtonLabel: 'Guardar',
    showPrimaryButton: true,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con botones primario y secundario.',
      },
    },
  },
};

/**
 * AllButtons
 * Tooltip con todos los botones
 */
export const AllButtons: Story = {
  name: 'All Buttons',
  args: {
    title: 'Eliminar elemento',
    description: '¿Estás seguro de que deseas eliminar este elemento?',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Eliminar',
    showTertiaryButton: true,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    primaryButtonLabel: 'Confirmar',
    showPrimaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con todos los botones (tertiary, secondary, primary).',
      },
    },
  },
};

/**
 * PrimaryButtonWithIcon
 * Botón primario con icono
 */
export const PrimaryButtonWithIcon: Story = {
  name: 'Primary Button With Icon',
  args: {
    title: 'Guardar cambios',
    description: 'Los cambios se guardarán permanentemente.',
    width: 'md',
    tailPosition: 'top',
    primaryButtonLabel: 'Guardar',
    showPrimaryButton: true,
    primaryButtonIcon: 'save',
    showPrimaryButtonIcon: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con botón primario que incluye un icono.',
      },
    },
  },
};

/**
 * SecondaryButtonWithIcon
 * Botón secundario con icono
 */
export const SecondaryButtonWithIcon: Story = {
  name: 'Secondary Button With Icon',
  args: {
    title: 'Cancelar acción',
    description: 'Esta acción se cancelará.',
    width: 'md',
    tailPosition: 'top',
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con botón secundario que incluye un icono.',
      },
    },
  },
};

/**
 * TertiaryButtonWithIcon
 * Botón terciario con icono
 */
export const TertiaryButtonWithIcon: Story = {
  name: 'Tertiary Button With Icon',
  args: {
    title: 'Más información',
    description: 'Obtén más detalles sobre esta acción.',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Más info',
    showTertiaryButton: true,
    tertiaryButtonIcon: 'info-circle',
    showTertiaryButtonIcon: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con botón terciario que incluye un icono.',
      },
    },
  },
};

/**
 * AllButtonsWithIcons
 * Todos los botones con iconos
 */
export const AllButtonsWithIcons: Story = {
  name: 'All Buttons With Icons',
  args: {
    title: 'Acción múltiple',
    description: 'Selecciona una acción para continuar.',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Eliminar',
    showTertiaryButton: true,
    tertiaryButtonIcon: 'trash',
    showTertiaryButtonIcon: true,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: true,
    primaryButtonLabel: 'Guardar',
    showPrimaryButton: true,
    primaryButtonIcon: 'save',
    showPrimaryButtonIcon: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con todos los botones que incluyen iconos.',
      },
    },
  },
};

/**
 * ButtonCallbacks
 * Tooltip con callbacks en todos los botones
 */
export const ButtonCallbacks: Story = {
  name: 'Button Callbacks',
  args: {
    title: 'Tooltip con callbacks',
    description: 'Los botones tienen callbacks personalizados.',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Tertiary',
    showTertiaryButton: true,
    secondaryButtonLabel: 'Secondary',
    showSecondaryButton: true,
    primaryButtonLabel: 'Primary',
    showPrimaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const options: Partial<TooltipOptions> = {
      ...args,
      onPrimaryAction: () => {
        alert('Botón primario clickeado');
        console.log('Primary action');
      },
      onSecondaryAction: () => {
        alert('Botón secundario clickeado');
        console.log('Secondary action');
      },
      onTertiaryAction: () => {
        alert('Botón terciario clickeado');
        console.log('Tertiary action');
      }
    };
    return renderTooltipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con callbacks personalizados en todos los botones.',
      },
    },
  },
};

/**
 * CloseOnOutsideClick
 * Tooltip que se cierra al hacer clic fuera
 */
export const CloseOnOutsideClick: Story = {
  name: 'Close On Outside Click',
  args: {
    title: 'Tooltip con cierre en clic fuera',
    description: 'Haz clic fuera del tooltip para cerrarlo.',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip que se cierra al hacer clic fuera (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoCloseOnOutsideClick
 * Tooltip que NO se cierra al hacer clic fuera
 */
export const NoCloseOnOutsideClick: Story = {
  name: 'No Close On Outside Click',
  args: {
    title: 'Tooltip sin cierre en clic fuera',
    description: 'Este tooltip NO se cierra al hacer clic fuera. Debes usar los botones.',
    width: 'md',
    tailPosition: 'top',
    primaryButtonLabel: 'Cerrar',
    showPrimaryButton: true,
    open: false,
    closeOnOutsideClick: false
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip que NO se cierra al hacer clic fuera. Solo se cierra con los botones.',
      },
    },
  },
};

/**
 * OpenInitially
 * Tooltip abierto inicialmente
 */
export const OpenInitially: Story = {
  name: 'Open Initially',
  args: {
    title: 'Tooltip abierto',
    description: 'Este tooltip se abre automáticamente al cargar.',
    width: 'md',
    tailPosition: 'top',
    open: true,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip que se abre automáticamente al cargar.',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Tooltip con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    title: 'Tooltip con callback',
    description: 'Al cerrar este tooltip se ejecutará un callback.',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const options: Partial<TooltipOptions> = {
      ...args,
      onClose: () => {
        alert('Tooltip cerrado - callback ejecutado');
        console.log('Tooltip closed');
      }
    };
    return renderTooltipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * UpdatePositionMethod
 * Demostrar método updatePosition()
 */
export const UpdatePositionMethod: Story = {
  name: 'UpdatePosition Method',
  args: {
    title: 'Actualizar posición',
    description: 'Usa el botón para cambiar la posición del tooltip.',
    width: 'md',
    tailPosition: 'top',
    primaryButtonLabel: 'Mover a la derecha',
    showPrimaryButton: true,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    container.style.gap = '16px';

    const openButton = createButton({
      variant: 'primary',
      size: 'md',
      text: 'Abrir Tooltip',
    });
    openButton.setAttribute('data-tooltip-trigger', 'true');

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
    let positionOffset = 0;

    const createTooltipInstance = () => {
      const buttonRect = openButton.getBoundingClientRect();
      const estimatedTooltipHeight = 200;
      const position: { top: number; left: number } = {
        top: buttonRect.top - estimatedTooltipHeight - 9,
        left: buttonRect.left + buttonRect.width / 2 + positionOffset,
      };

      tooltipInstance = createTooltip({
        title: args.title || 'Actualizar posición',
        description: args.description || 'Usa el botón para mover el tooltip.',
        width: args.width || 'md',
        tailPosition: args.tailPosition || 'top',
        primaryButtonLabel: args.primaryButtonLabel || 'Mover a la derecha',
        showPrimaryButton: args.showPrimaryButton || false,
        onPrimaryAction: () => {
          if (tooltipInstance) {
            positionOffset += 50;
            const buttonRect = openButton.getBoundingClientRect();
            tooltipInstance.updatePosition({
              top: buttonRect.top - tooltipInstance.element.offsetHeight - 9,
              left: buttonRect.left + buttonRect.width / 2 + positionOffset,
            });
          }
        },
        onClose: () => {
          tooltipInstance = null;
          positionOffset = 0;
        },
        open: false,
        closeOnOutsideClick: args.closeOnOutsideClick !== false,
        position: position,
      });
    };

    openButton.onclick = () => {
      if (!tooltipInstance) {
        createTooltipInstance();
        setTimeout(() => {
          if (tooltipInstance) {
            tooltipInstance.open();
            const buttonRect = openButton.getBoundingClientRect();
            tooltipInstance.updatePosition({
              top: buttonRect.top - tooltipInstance.element.offsetHeight - 9,
              left: buttonRect.left + buttonRect.width / 2,
            });
          }
        }, 10);
      } else {
        const isOpen = tooltipInstance.element.classList.contains('ubits-tooltip--open');
        if (isOpen) {
          tooltipInstance.close();
        } else {
          tooltipInstance.open();
        }
      }
    };

    container.appendChild(openButton);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip que demuestra el método updatePosition() para cambiar la posición del tooltip.',
      },
    },
  },
};

/**
 * OpenCloseMethods
 * Demostrar métodos open() y close()
 */
export const OpenCloseMethods: Story = {
  name: 'Open/Close Methods',
  args: {
    title: 'Métodos open/close',
    description: 'Usa los botones de control para abrir y cerrar el tooltip',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';
    container.style.gap = '16px';
    
    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
    
    const openBtn = createButton({
      variant: 'primary',
      size: 'md',
      text: 'Abrir Tooltip',
    });
    openBtn.setAttribute('data-tooltip-trigger', 'true');
    
    const closeBtn = createButton({
      variant: 'secondary',
      size: 'md',
      text: 'Cerrar Tooltip',
    });
    
    openBtn.onclick = () => {
      if (!tooltipInstance) {
        const buttonRect = openBtn.getBoundingClientRect();
        const estimatedTooltipHeight = 200;
        const position: { top: number; left: number } = {
          top: buttonRect.top - estimatedTooltipHeight - 9,
          left: buttonRect.left + buttonRect.width / 2,
        };

        tooltipInstance = createTooltip({
          title: args.title || 'Métodos open/close',
          description: args.description || 'Usa los botones de control.',
          width: args.width || 'md',
          tailPosition: args.tailPosition || 'top',
          onClose: () => {
            tooltipInstance = null;
          },
          open: false,
          closeOnOutsideClick: args.closeOnOutsideClick !== false,
          position: position,
        });

        setTimeout(() => {
          if (tooltipInstance) {
            const tooltipHeight = tooltipInstance.element.offsetHeight;
            const buttonRect = openBtn.getBoundingClientRect();
            tooltipInstance.updatePosition({
              top: buttonRect.top - tooltipHeight - 9,
              left: buttonRect.left + buttonRect.width / 2,
            });
          }
        }, 0);
      }
      if (tooltipInstance) {
        tooltipInstance.open();
      }
    };
    
    closeBtn.onclick = () => {
      if (tooltipInstance) {
        tooltipInstance.close();
      }
    };
    
    container.appendChild(openBtn);
    container.appendChild(closeBtn);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip que demuestra los métodos open() y close() programáticamente.',
      },
    },
  },
};

/**
 * WithReferenceElement
 * Tooltip posicionado relativo a un elemento de referencia
 */
export const WithReferenceElement: Story = {
  name: 'With Reference Element',
  args: {
    title: 'Tooltip con referencia',
    description: 'Este tooltip está posicionado relativo a un elemento de referencia.',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';

    const referenceButton = createButton({
      variant: 'primary',
      size: 'md',
      text: 'Elemento de Referencia',
    });
    referenceButton.setAttribute('data-tooltip-trigger', 'true');

    let tooltipInstance: ReturnType<typeof createTooltip> | null = null;

    referenceButton.onclick = () => {
      if (!tooltipInstance) {
        tooltipInstance = createTooltip({
          title: args.title || 'Tooltip con referencia',
          description: args.description || 'Posicionado relativo al botón.',
          width: args.width || 'md',
          tailPosition: args.tailPosition || 'top',
          referenceElement: referenceButton,
          onClose: () => {
            tooltipInstance = null;
          },
          open: false,
          closeOnOutsideClick: args.closeOnOutsideClick !== false,
        });
      }
      if (tooltipInstance) {
        tooltipInstance.open();
      }
    };

    container.appendChild(referenceButton);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip posicionado relativo a un elemento de referencia.',
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
  args: {
    description: 'Tooltip mínimo con solo descripción.',
    width: 'md',
    tailPosition: 'top',
    showTitle: false,
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderTooltipStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip mínimo con solo descripción, sin título ni botones.',
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
  args: {
    title: 'Tooltip completo',
    description: 'Este tooltip incluye todas las opciones disponibles: título, descripción y botones con iconos.',
    width: 'md',
    tailPosition: 'top',
    tertiaryButtonLabel: 'Eliminar',
    showTertiaryButton: true,
    tertiaryButtonIcon: 'trash',
    showTertiaryButtonIcon: true,
    secondaryButtonLabel: 'Cancelar',
    showSecondaryButton: true,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: true,
    primaryButtonLabel: 'Guardar',
    showPrimaryButton: true,
    primaryButtonIcon: 'save',
    showPrimaryButtonIcon: true,
    open: false,
    closeOnOutsideClick: true,
    onClose: () => console.log('Tooltip closed')
  },
  render: (args) => {
    const options: Partial<TooltipOptions> = {
      ...args,
      onPrimaryAction: () => console.log('Primary clicked'),
      onSecondaryAction: () => console.log('Secondary clicked'),
      onTertiaryAction: () => console.log('Tertiary clicked')
    };
    return renderTooltipStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip completo con todas las opciones: título, descripción, botones con iconos y callbacks.',
      },
    },
  },
};

