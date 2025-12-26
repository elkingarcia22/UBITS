import type { Meta, StoryObj } from '@storybook/html';
import { createPopover } from '../../components/popover/src/PopoverProvider';
import type { PopoverOptions } from '../../components/popover/src/types/PopoverOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import '../../components/popover/src/styles/popover.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<PopoverOptions & {
  'footerButtons.tertiary.enabled'?: boolean;
  'footerButtons.secondary.enabled'?: boolean;
  'footerButtons.primary.enabled'?: boolean;
}> = {
  title: 'Feedback/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Popover UBITS con tail (flecha) para mostrar información contextual. Similar al modal pero más pequeño y con tail. Se usa para mostrar información adicional, tooltips avanzados o acciones contextuales. Soporta diferentes tamaños, posiciones de tail, header opcional, body con scroll personalizado y footer con botones opcionales.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del popover (opcional).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Contenido',
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido HTML del cuerpo del popover. Puede ser una cadena HTML o una función que devuelve HTML.',
      table: {
        type: { summary: 'string | (() => string)' },
        defaultValue: { summary: '...' },
        category: 'Contenido',
      },
    },
        width: {
          control: { type: 'select' },
          options: ['sm', 'md', 'lg', 'xl'],
          description: 'Ancho del popover (sm: 240px, md: 360px, lg: 400px, xl: 480px).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    tailPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posición del tail (flecha) del popover.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
        category: 'Apariencia',
      },
    },
    tailOffset: {
      control: { type: 'number' },
      description: 'Offset horizontal del tail desde el centro (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Apariencia',
      },
    },
    'footerButtons.tertiary.label': {
      control: { type: 'text' },
      name: 'Label Botón Terciario',
      description: 'Label del botón terciario (izquierda del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.tertiary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Terciario',
      description: 'Controla la visibilidad del botón terciario.',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.secondary.label': {
      control: { type: 'text' },
      name: 'Label Botón Secundario',
      description: 'Label del botón secundario (derecha del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.secondary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Secundario',
      description: 'Controla la visibilidad del botón secundario.',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.primary.label': {
      control: { type: 'text' },
      name: 'Label Botón Primario',
      description: 'Label del botón primario (derecha del footer).',
      table: { category: 'Footer Buttons' },
    },
    'footerButtons.primary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Primario',
      description: 'Controla la visibilidad del botón primario.',
      table: { category: 'Footer Buttons' },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si el popover está abierto inicialmente.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Estado',
      },
    },
    closeOnOutsideClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic fuera del popover.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback que se ejecuta cuando el popover se cierra.',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverOptions & {
  'footerButtons.tertiary.enabled'?: boolean;
  'footerButtons.secondary.enabled'?: boolean;
  'footerButtons.primary.enabled'?: boolean;
}>;

export const Default: Story = {
  args: {
    title: 'Title',
    bodyContent: `
      <p style="margin: 0; font-size: var(--font-body-sm-size, 13px); color: var(--modifiers-normal-color-light-fg-1-high-static-inverted, #edeeef); line-height: 19.5px);">
        Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.
      </p>
    `,
    width: 'md',
    tailPosition: 'top',
    'footerButtons.tertiary.label': 'Tertiary',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Secondary',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Primary',
    'footerButtons.primary.enabled': true,
    open: true,
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'popover-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '40px';

    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.setAttribute('data-popover-trigger', 'true');
    openButton.innerHTML = '<span>Abrir Popover</span>';
    openButton.style.width = 'auto';
    openButton.style.zIndex = '1001';

    container.appendChild(openButton);

    let popoverInstance: ReturnType<typeof createPopover> | null = null;

    const updateButtonText = () => {
      const isOpen = popoverInstance && popoverInstance.element.classList.contains('ubits-popover--open');
      openButton.querySelector('span')!.textContent = isOpen ? 'Cerrar Popover' : 'Abrir Popover';
    };

    const destroyPopover = () => {
      if (popoverInstance) {
        try {
          popoverInstance.destroy();
        } catch (e) {
          // Error silencioso al destruir
        }
        popoverInstance = null;
      }
      // También asegurarnos de que no queden popovers huérfanos en el DOM
      const existingPopovers = document.querySelectorAll('.ubits-popover');
      existingPopovers.forEach((popover) => {
        if (popover.parentElement) {
          popover.remove();
        }
      });
    };

    const createAndOpenPopover = () => {
      // Siempre destruir antes de crear nuevo
      destroyPopover();

      const footerButtons = {
        ...(args['footerButtons.tertiary.enabled'] && { tertiary: { label: args['footerButtons.tertiary.label'] || 'Tertiary', onClick: () => alert('Tertiary clicked!') } }),
        ...(args['footerButtons.secondary.enabled'] && { secondary: { label: args['footerButtons.secondary.label'] || 'Secondary', onClick: () => alert('Secondary clicked!') } }),
        ...(args['footerButtons.primary.enabled'] && { primary: { label: args['footerButtons.primary.label'] || 'Primary', onClick: () => alert('Primary clicked!') } }),
      };

      const buttonRect = openButton.getBoundingClientRect();
      
      // SIEMPRE mostrar el popover arriba del botón, pero conservar la posición del tail según la configuración
      // El popover se posiciona arriba, pero el triángulo puede apuntar en diferentes direcciones
      // Calcular posición para que el popover aparezca arriba del botón
      // Necesitamos calcular la altura del popover después de crearlo
      // Usamos un valor estimado más grande para asegurar que esté completamente arriba
      const estimatedPopoverHeight = 200; // Altura estimada del popover
      const position: { top: number; left: number } = {
        top: buttonRect.top - estimatedPopoverHeight - 9, // Arriba del botón menos altura del popover menos tail
        left: buttonRect.left + buttonRect.width / 2, // Centrado horizontalmente
      };

      popoverInstance = createPopover({
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition, // Conservar la posición del tail según la configuración del usuario
        tailOffset: args.tailOffset,
        bodyContent: args.bodyContent,
        footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
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

      // Ajustar posición después de crear el popover (siempre arriba del botón)
      if (popoverInstance) {
        // Esperar un frame para que el DOM se actualice y podamos obtener las dimensiones reales
        setTimeout(() => {
          // Obtener la altura real del popover después de crearlo
          const popoverHeight = popoverInstance.element.offsetHeight;
          const buttonRect = openButton.getBoundingClientRect();
          // Reposicionar completamente arriba del botón
          popoverInstance.updatePosition({
            top: buttonRect.top - popoverHeight - 9,
            left: buttonRect.left + buttonRect.width / 2,
          });
        }, 0);
      }

      updateButtonText();
    };

    const handleButtonClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!popoverInstance || !popoverInstance.element || !popoverInstance.element.parentElement) {
        createAndOpenPopover();
        // Abrir después de crear
        setTimeout(() => {
          if (popoverInstance) {
            popoverInstance.open();
            updateButtonText();
          }
        }, 10);
        return;
      }
      
      const isOpen = popoverInstance.element.classList.contains('ubits-popover--open');
      if (isOpen) {
        popoverInstance.close();
      } else {
        popoverInstance.open();
      }
      updateButtonText();
    };

    openButton.addEventListener('click', handleButtonClick);

    // Recrear popover cuando cambian los args (Storybook controls)
    const recreatePopover = () => {
      const wasOpen = popoverInstance && popoverInstance.element && popoverInstance.element.classList.contains('ubits-popover--open');
      destroyPopover();
      // Esperar un poco para asegurar que el DOM se haya limpiado
      setTimeout(() => {
        createAndOpenPopover();
        if (wasOpen && popoverInstance) {
          setTimeout(() => {
            if (popoverInstance) {
              popoverInstance.open();
              updateButtonText();
            }
          }, 10);
        }
      }, 10);
    };

    // Initial render if open is true
    if (args.open) {
      setTimeout(() => {
        createAndOpenPopover();
        if (popoverInstance) {
          popoverInstance.open();
          updateButtonText();
        }
      }, 100);
    } else {
      // Crear pero no abrir inicialmente
      setTimeout(() => {
        createAndOpenPopover();
      }, 100);
    }

    // Observer para detectar cambios en los args de Storybook usando setInterval
    let lastArgs = JSON.stringify({
      title: args.title,
      width: args.width,
      tailPosition: args.tailPosition,
      tailOffset: args.tailOffset,
      bodyContent: args.bodyContent,
      'footerButtons.tertiary.enabled': args['footerButtons.tertiary.enabled'],
      'footerButtons.tertiary.label': args['footerButtons.tertiary.label'],
      'footerButtons.secondary.enabled': args['footerButtons.secondary.enabled'],
      'footerButtons.secondary.label': args['footerButtons.secondary.label'],
      'footerButtons.primary.enabled': args['footerButtons.primary.enabled'],
      'footerButtons.primary.label': args['footerButtons.primary.label'],
      closeOnOutsideClick: args.closeOnOutsideClick,
    });
    
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify({
        title: args.title,
        width: args.width,
        tailPosition: args.tailPosition,
        tailOffset: args.tailOffset,
        bodyContent: args.bodyContent,
        'footerButtons.tertiary.enabled': args['footerButtons.tertiary.enabled'],
        'footerButtons.tertiary.label': args['footerButtons.tertiary.label'],
        'footerButtons.secondary.enabled': args['footerButtons.secondary.enabled'],
        'footerButtons.secondary.label': args['footerButtons.secondary.label'],
        'footerButtons.primary.enabled': args['footerButtons.primary.enabled'],
        'footerButtons.primary.label': args['footerButtons.primary.label'],
        closeOnOutsideClick: args.closeOnOutsideClick,
      });
      
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        recreatePopover();
      }
    }, 100);

    // Limpiar interval al desmontar usando MutationObserver (reemplazo de DOMNodeRemoved deprecado)
    const observer = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        clearInterval(checkInterval);
        destroyPopover();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return container;
  },
};

// Helper para renderizar Popover de manera consistente
function renderPopoverStory(options: Partial<PopoverOptions>, autoOpen: boolean = false) {
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
    text: 'Abrir Popover',
  });
  openButton.setAttribute('data-popover-trigger', 'true');
  openButton.style.width = 'auto';
  openButton.style.zIndex = '1001';

  container.appendChild(openButton);

  let popoverInstance: ReturnType<typeof createPopover> | null = null;

  const updateButtonText = () => {
    const isOpen = popoverInstance && popoverInstance.element.classList.contains('ubits-popover--open');
    const span = openButton.querySelector('span');
    if (span) {
      span.textContent = isOpen ? 'Cerrar Popover' : 'Abrir Popover';
    }
  };

  const destroyPopover = () => {
    if (popoverInstance) {
      try {
        popoverInstance.destroy();
      } catch (e) {
        // Error silencioso
      }
      popoverInstance = null;
    }
    const existingPopovers = document.querySelectorAll('.ubits-popover');
    existingPopovers.forEach((popover) => {
      if (popover.parentElement) {
        popover.remove();
      }
    });
  };

  const createAndOpenPopover = () => {
    destroyPopover();

    const buttonRect = openButton.getBoundingClientRect();
    const estimatedPopoverHeight = 200;
    const position: { top: number; left: number } = {
      top: buttonRect.top - estimatedPopoverHeight - 9,
      left: buttonRect.left + buttonRect.width / 2,
    };

    popoverInstance = createPopover({
      title: options.title,
      width: options.width || 'md',
      tailPosition: options.tailPosition || 'top',
      tailOffset: options.tailOffset || 0,
      bodyContent: options.bodyContent || '<p>Contenido del popover</p>',
      footerButtons: options.footerButtons,
      onClose: () => {
        if (options.onClose) {
          options.onClose();
        }
        updateButtonText();
      },
      open: false,
      closeOnOutsideClick: options.closeOnOutsideClick !== false,
      position: position,
    });

    if (popoverInstance) {
      setTimeout(() => {
        const popoverHeight = popoverInstance!.element.offsetHeight;
        const buttonRect = openButton.getBoundingClientRect();
        popoverInstance!.updatePosition({
          top: buttonRect.top - popoverHeight - 9,
          left: buttonRect.left + buttonRect.width / 2,
        });
      }, 0);
    }

    updateButtonText();
  };

  const handleButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!popoverInstance || !popoverInstance.element || !popoverInstance.element.parentElement) {
      createAndOpenPopover();
      setTimeout(() => {
        if (popoverInstance) {
          popoverInstance.open();
          updateButtonText();
        }
      }, 10);
      return;
    }
    
    const isOpen = popoverInstance.element.classList.contains('ubits-popover--open');
    if (isOpen) {
      popoverInstance.close();
    } else {
      popoverInstance.open();
    }
    updateButtonText();
  };

  openButton.addEventListener('click', handleButtonClick);

  if (autoOpen) {
    setTimeout(() => {
      createAndOpenPopover();
      if (popoverInstance) {
        popoverInstance.open();
        updateButtonText();
      }
    }, 100);
  } else {
    setTimeout(() => {
      createAndOpenPopover();
    }, 100);
  }

  return container;
}

/**
 * WidthSmall
 * Popover con ancho small
 */
export const WidthSmall: Story = {
  name: 'Width - Small',
  args: {
    title: 'Popover Small',
    bodyContent: '<p>Popover con ancho small (240px).</p>',
    width: 'sm',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con ancho small (240px).',
      },
    },
  },
};

/**
 * WidthMedium
 * Popover con ancho medium (default)
 */
export const WidthMedium: Story = {
  name: 'Width - Medium (Default)',
  args: {
    title: 'Popover Medium',
    bodyContent: '<p>Popover con ancho medium (360px, valor por defecto).</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con ancho medium (360px, valor por defecto).',
      },
    },
  },
};

/**
 * WidthLarge
 * Popover con ancho large
 */
export const WidthLarge: Story = {
  name: 'Width - Large',
  args: {
    title: 'Popover Large',
    bodyContent: '<p>Popover con ancho large (400px).</p>',
    width: 'lg',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con ancho large (400px).',
      },
    },
  },
};

/**
 * WidthXLarge
 * Popover con ancho xlarge
 */
export const WidthXLarge: Story = {
  name: 'Width - XLarge',
  args: {
    title: 'Popover XLarge',
    bodyContent: '<p>Popover con ancho xlarge (480px).</p>',
    width: 'xl',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con ancho xlarge (480px).',
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
    title: 'Popover con tail top',
    bodyContent: '<p>El tail (flecha) apunta hacia arriba.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con tail en posición top (valor por defecto).',
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
    title: 'Popover con tail bottom',
    bodyContent: '<p>El tail (flecha) apunta hacia abajo.</p>',
    width: 'md',
    tailPosition: 'bottom',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con tail en posición bottom.',
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
    title: 'Popover con tail left',
    bodyContent: '<p>El tail (flecha) apunta hacia la izquierda.</p>',
    width: 'md',
    tailPosition: 'left',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con tail en posición left.',
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
    title: 'Popover con tail right',
    bodyContent: '<p>El tail (flecha) apunta hacia la derecha.</p>',
    width: 'md',
    tailPosition: 'right',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con tail en posición right.',
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
    title: 'Popover con tail offset',
    bodyContent: '<p>El tail tiene un offset de 20px desde el centro.</p>',
    width: 'md',
    tailPosition: 'top',
    tailOffset: 20,
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con tail que tiene un offset personalizado desde el centro.',
      },
    },
  },
};

/**
 * WithTitle
 * Popover con título
 */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    title: 'Título del Popover',
    bodyContent: '<p>Este popover incluye un título en el header.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con título en el header.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Popover sin título
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    bodyContent: '<p>Este popover no tiene título, solo contenido.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover sin título, solo contenido.',
      },
    },
  },
};

/**
 * WithFooterButtons
 * Popover con todos los botones del footer
 */
export const WithFooterButtons: Story = {
  name: 'With Footer Buttons',
  args: {
    title: 'Eliminar elemento',
    bodyContent: '<p>¿Estás seguro de que deseas eliminar este elemento?</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      tertiary: { label: 'Eliminar' },
      secondary: { label: 'Cancelar' },
      primary: { label: 'Confirmar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con todos los botones del footer (tertiary, secondary, primary).',
      },
    },
  },
};

/**
 * FooterTertiaryOnly
 * Popover solo con botón terciario
 */
export const FooterTertiaryOnly: Story = {
  name: 'Footer - Tertiary Only',
  args: {
    title: 'Eliminar',
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      tertiary: { label: 'Eliminar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover solo con botón terciario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryOnly
 * Popover solo con botón secundario
 */
export const FooterSecondaryOnly: Story = {
  name: 'Footer - Secondary Only',
  args: {
    title: 'Información',
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cerrar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover solo con botón secundario en el footer.',
      },
    },
  },
};

/**
 * FooterPrimaryOnly
 * Popover solo con botón primario
 */
export const FooterPrimaryOnly: Story = {
  name: 'Footer - Primary Only',
  args: {
    title: 'Confirmar',
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover solo con botón primario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryAndPrimary
 * Popover con botones secundario y primario
 */
export const FooterSecondaryAndPrimary: Story = {
  name: 'Footer - Secondary and Primary',
  args: {
    title: 'Guardar cambios',
    bodyContent: '<p>Contenido del popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Guardar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con botones secundario y primario en el footer.',
      },
    },
  },
};

/**
 * WithoutFooterButtons
 * Popover sin botones del footer
 */
export const WithoutFooterButtons: Story = {
  name: 'Without Footer Buttons',
  args: {
    title: 'Vista previa',
    bodyContent: '<p>Popover sin botones en el footer. Haz clic fuera para cerrar.</p>',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover sin botones en el footer.',
      },
    },
  },
};

/**
 * CloseOnOutsideClick
 * Popover que se cierra al hacer clic fuera
 */
export const CloseOnOutsideClick: Story = {
  name: 'Close On Outside Click',
  args: {
    title: 'Popover con cierre en clic fuera',
    bodyContent: '<p>Haz clic fuera del popover para cerrarlo.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover que se cierra al hacer clic fuera (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoCloseOnOutsideClick
 * Popover que NO se cierra al hacer clic fuera
 */
export const NoCloseOnOutsideClick: Story = {
  name: 'No Close On Outside Click',
  args: {
    title: 'Popover sin cierre en clic fuera',
    bodyContent: '<p>Este popover NO se cierra al hacer clic fuera. Debes usar los botones del footer.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: false
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover que NO se cierra al hacer clic fuera. Solo se cierra con los botones del footer.',
      },
    },
  },
};

/**
 * OpenInitially
 * Popover abierto inicialmente
 */
export const OpenInitially: Story = {
  name: 'Open Initially',
  args: {
    title: 'Popover abierto',
    bodyContent: '<p>Este popover se abre automáticamente al cargar.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: true,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Popover que se abre automáticamente al cargar.',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    title: 'Popover con callback',
    bodyContent: '<p>Al cerrar este popover se ejecutará un callback.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const options: Partial<PopoverOptions> = {
      ...args,
      onClose: () => {
        alert('Popover cerrado - callback ejecutado');
        console.log('Popover closed');
      }
    };
    return renderPopoverStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * FooterButtonCallbacks
 * Popover con callbacks en los botones del footer
 */
export const FooterButtonCallbacks: Story = {
  name: 'Footer Button Callbacks',
  args: {
    title: 'Popover con callbacks',
    bodyContent: '<p>Los botones del footer tienen callbacks personalizados.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      tertiary: {
        label: 'Eliminar',
        onClick: () => alert('Botón terciario clickeado')
      },
      secondary: {
        label: 'Cancelar',
        onClick: () => alert('Botón secundario clickeado')
      },
      primary: {
        label: 'Guardar',
        onClick: () => alert('Botón primario clickeado')
      }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con callbacks personalizados en los botones del footer.',
      },
    },
  },
};

/**
 * BodyContentString
 * Body content como string HTML
 */
export const BodyContentString: Story = {
  name: 'Body Content - String',
  args: {
    title: 'Contenido como string',
    bodyContent: '<div><h3>Contenido HTML</h3><p>Este contenido es un string HTML simple.</p></div>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con body content definido como string HTML.',
      },
    },
  },
};

/**
 * BodyContentFunction
 * Body content como función que retorna HTML
 */
export const BodyContentFunction: Story = {
  name: 'Body Content - Function',
  args: {
    title: 'Contenido como función',
    bodyContent: () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      return `
        <div>
          <h3>Contenido generado dinámicamente</h3>
          <ul style="list-style: none; padding: 0;">
            ${items.map(item => `<li style="padding: 8px; margin-bottom: 8px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 4px;">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    },
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con body content definido como función que retorna HTML.',
      },
    },
  },
};

/**
 * LongContent
 * Popover con contenido largo (scrollable)
 */
export const LongContent: Story = {
  name: 'Long Content',
  args: {
    title: 'Contenido largo',
    bodyContent: `
      <div>
        ${Array.from({ length: 30 }, (_, i) => `
          <p style="margin-bottom: 12px; padding: 8px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 4px;">
            Párrafo ${i + 1}: Este es un contenido largo para demostrar el scroll del popover.
          </p>
        `).join('')}
      </div>
    `,
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con contenido largo que activa el scroll del body.',
      },
    },
  },
};

/**
 * ShortContent
 * Popover con contenido corto
 */
export const ShortContent: Story = {
  name: 'Short Content',
  args: {
    title: 'Contenido corto',
    bodyContent: '<p>Este es un contenido corto que no requiere scroll.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover con contenido corto que no requiere scroll.',
      },
    },
  },
};

/**
 * EmptyContent
 * Popover sin contenido (placeholder)
 */
export const EmptyContent: Story = {
  name: 'Empty Content',
  args: {
    title: 'Popover vacío',
    bodyContent: '',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover sin contenido, muestra el placeholder por defecto.',
      },
    },
  },
};

/**
 * UpdateContentMethod
 * Demostrar método updateContent()
 */
export const UpdateContentMethod: Story = {
  name: 'UpdateContent Method',
  args: {
    title: 'Actualizar contenido',
    bodyContent: '<p>Contenido inicial del popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      primary: { label: 'Actualizar contenido' }
    },
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => {
    const container = renderPopoverStory(args);
    let popoverInstance: ReturnType<typeof createPopover> | null = null;
    
    const openButton = container.querySelector('button');
    if (openButton) {
      const originalHandler = openButton.onclick;
      openButton.onclick = () => {
        if (!popoverInstance) {
          const buttonRect = openButton.getBoundingClientRect();
          const estimatedPopoverHeight = 200;
          const position: { top: number; left: number } = {
            top: buttonRect.top - estimatedPopoverHeight - 9,
            left: buttonRect.left + buttonRect.width / 2,
          };

          popoverInstance = createPopover({
            title: args.title || 'Actualizar contenido',
            width: args.width || 'md',
            tailPosition: args.tailPosition || 'top',
            tailOffset: args.tailOffset || 0,
            bodyContent: args.bodyContent || '<p>Contenido inicial</p>',
            footerButtons: {
              primary: {
                label: 'Actualizar contenido',
                onClick: () => {
                  if (popoverInstance) {
                    popoverInstance.updateContent('<p>Contenido actualizado exitosamente!</p>');
                  }
                }
              }
            },
            onClose: () => {
              popoverInstance = null;
            },
            open: true,
            closeOnOutsideClick: args.closeOnOutsideClick !== false,
            position: position,
          });

          setTimeout(() => {
            if (popoverInstance) {
              const popoverHeight = popoverInstance.element.offsetHeight;
              const buttonRect = openButton.getBoundingClientRect();
              popoverInstance.updatePosition({
                top: buttonRect.top - popoverHeight - 9,
                left: buttonRect.left + buttonRect.width / 2,
              });
            }
          }, 0);
        }
      };
    }
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover que demuestra el método updateContent() para actualizar el contenido del body.',
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
    bodyContent: '<p>Usa el botón para cambiar la posición del popover.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      primary: { label: 'Mover a la derecha' }
    },
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
      text: 'Abrir Popover',
    });
    openButton.setAttribute('data-popover-trigger', 'true');

    let popoverInstance: ReturnType<typeof createPopover> | null = null;
    let positionOffset = 0;

    const createPopoverInstance = () => {
      const buttonRect = openButton.getBoundingClientRect();
      const estimatedPopoverHeight = 200;
      const position: { top: number; left: number } = {
        top: buttonRect.top - estimatedPopoverHeight - 9,
        left: buttonRect.left + buttonRect.width / 2 + positionOffset,
      };

      popoverInstance = createPopover({
        title: args.title || 'Actualizar posición',
        width: args.width || 'md',
        tailPosition: args.tailPosition || 'top',
        bodyContent: args.bodyContent || '<p>Usa el botón para mover el popover.</p>',
        footerButtons: {
          primary: {
            label: 'Mover a la derecha',
            onClick: () => {
              if (popoverInstance) {
                positionOffset += 50;
                const buttonRect = openButton.getBoundingClientRect();
                popoverInstance.updatePosition({
                  top: buttonRect.top - popoverInstance.element.offsetHeight - 9,
                  left: buttonRect.left + buttonRect.width / 2 + positionOffset,
                });
              }
            }
          }
        },
        onClose: () => {
          popoverInstance = null;
          positionOffset = 0;
        },
        open: false,
        closeOnOutsideClick: args.closeOnOutsideClick !== false,
        position: position,
      });
    };

    openButton.onclick = () => {
      if (!popoverInstance) {
        createPopoverInstance();
        setTimeout(() => {
          if (popoverInstance) {
            popoverInstance.open();
            const buttonRect = openButton.getBoundingClientRect();
            popoverInstance.updatePosition({
              top: buttonRect.top - popoverInstance.element.offsetHeight - 9,
              left: buttonRect.left + buttonRect.width / 2,
            });
          }
        }, 10);
      } else {
        const isOpen = popoverInstance.element.classList.contains('ubits-popover--open');
        if (isOpen) {
          popoverInstance.close();
        } else {
          popoverInstance.open();
        }
      }
    };

    container.appendChild(openButton);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover que demuestra el método updatePosition() para cambiar la posición del popover.',
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
    bodyContent: '<p>Usa los botones de control para abrir y cerrar el popover</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cerrar' },
      primary: { label: 'Aceptar' }
    },
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
    
    let popoverInstance: ReturnType<typeof createPopover> | null = null;
    
    const openBtn = createButton({
      variant: 'primary',
      size: 'md',
      text: 'Abrir Popover',
    });
    openBtn.setAttribute('data-popover-trigger', 'true');
    
    const closeBtn = createButton({
      variant: 'secondary',
      size: 'md',
      text: 'Cerrar Popover',
    });
    
    openBtn.onclick = () => {
      if (!popoverInstance) {
        const buttonRect = openBtn.getBoundingClientRect();
        const estimatedPopoverHeight = 200;
        const position: { top: number; left: number } = {
          top: buttonRect.top - estimatedPopoverHeight - 9,
          left: buttonRect.left + buttonRect.width / 2,
        };

        popoverInstance = createPopover({
          title: args.title || 'Métodos open/close',
          width: args.width || 'md',
          tailPosition: args.tailPosition || 'top',
          bodyContent: args.bodyContent || '<p>Usa los botones de control.</p>',
          footerButtons: args.footerButtons,
          onClose: () => {
            popoverInstance = null;
          },
          open: false,
          closeOnOutsideClick: args.closeOnOutsideClick !== false,
          position: position,
        });

        setTimeout(() => {
          if (popoverInstance) {
            const popoverHeight = popoverInstance.element.offsetHeight;
            const buttonRect = openBtn.getBoundingClientRect();
            popoverInstance.updatePosition({
              top: buttonRect.top - popoverHeight - 9,
              left: buttonRect.left + buttonRect.width / 2,
            });
          }
        }, 0);
      }
      if (popoverInstance) {
        popoverInstance.open();
      }
    };
    
    closeBtn.onclick = () => {
      if (popoverInstance) {
        popoverInstance.close();
      }
    };
    
    container.appendChild(openBtn);
    container.appendChild(closeBtn);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover que demuestra los métodos open() y close() programáticamente.',
      },
    },
  },
};

/**
 * WithReferenceElement
 * Popover posicionado relativo a un elemento de referencia
 */
export const WithReferenceElement: Story = {
  name: 'With Reference Element',
  args: {
    title: 'Popover con referencia',
    bodyContent: '<p>Este popover está posicionado relativo a un elemento de referencia.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
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
    referenceButton.setAttribute('data-popover-trigger', 'true');

    let popoverInstance: ReturnType<typeof createPopover> | null = null;

    referenceButton.onclick = () => {
      if (!popoverInstance) {
        popoverInstance = createPopover({
          title: args.title || 'Popover con referencia',
          width: args.width || 'md',
          tailPosition: args.tailPosition || 'top',
          bodyContent: args.bodyContent || '<p>Posicionado relativo al botón.</p>',
          footerButtons: args.footerButtons,
          referenceElement: referenceButton,
          onClose: () => {
            popoverInstance = null;
          },
          open: false,
          closeOnOutsideClick: args.closeOnOutsideClick !== false,
        });
      }
      if (popoverInstance) {
        popoverInstance.open();
      }
    };

    container.appendChild(referenceButton);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover posicionado relativo a un elemento de referencia.',
      },
    },
  },
};

/**
 * WithAbsolutePosition
 * Popover con posición absoluta
 */
export const WithAbsolutePosition: Story = {
  name: 'With Absolute Position',
  args: {
    title: 'Popover con posición absoluta',
    bodyContent: '<p>Este popover tiene una posición absoluta fija.</p>',
    width: 'md',
    tailPosition: 'top',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
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

    const openButton = createButton({
      variant: 'primary',
      size: 'md',
      text: 'Abrir Popover',
    });
    openButton.setAttribute('data-popover-trigger', 'true');

    let popoverInstance: ReturnType<typeof createPopover> | null = null;

    openButton.onclick = () => {
      if (!popoverInstance) {
        popoverInstance = createPopover({
          title: args.title || 'Popover con posición absoluta',
          width: args.width || 'md',
          tailPosition: args.tailPosition || 'top',
          bodyContent: args.bodyContent || '<p>Posición absoluta fija.</p>',
          footerButtons: args.footerButtons,
          position: {
            top: 100,
            left: 200,
          },
          onClose: () => {
            popoverInstance = null;
          },
          open: false,
          closeOnOutsideClick: args.closeOnOutsideClick !== false,
        });
      }
      if (popoverInstance) {
        popoverInstance.open();
      }
    };

    container.appendChild(openButton);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover con posición absoluta fija.',
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
    bodyContent: '<p>Popover mínimo con solo contenido.</p>',
    width: 'md',
    tailPosition: 'top',
    open: false,
    closeOnOutsideClick: true
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover mínimo con solo contenido, sin título ni botones.',
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
    title: 'Popover completo',
    bodyContent: `
      <div>
        <h3>Contenido completo</h3>
        <p>Este popover incluye:</p>
        <ul style="padding-left: 20px;">
          <li>Título</li>
          <li>Contenido en el body</li>
          <li>Botones en el footer (tertiary, secondary, primary)</li>
          <li>Callbacks personalizados</li>
        </ul>
      </div>
    `,
    width: 'md',
    tailPosition: 'top',
    tailOffset: 0,
    footerButtons: {
      tertiary: {
        label: 'Eliminar',
        onClick: () => console.log('Tertiary clicked')
      },
      secondary: {
        label: 'Cancelar',
        onClick: () => console.log('Secondary clicked')
      },
      primary: {
        label: 'Guardar',
        onClick: () => console.log('Primary clicked')
      }
    },
    open: false,
    closeOnOutsideClick: true,
    onClose: () => console.log('Popover closed')
  },
  render: (args) => renderPopoverStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Popover completo con todas las opciones: título, contenido, botones del footer con callbacks, y callback onClose.',
      },
    },
  },
};


