import type { Meta, StoryObj } from '@storybook/html';
import { createMask } from '../../components/mask/src/MaskProvider';
import type { MaskOptions } from '../../components/mask/src/types/MaskOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import '../../components/mask/src/styles/mask.css';
import '../../components/popover/src/styles/popover.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<MaskOptions & {
  'popover.footerButtons.tertiary.enabled'?: boolean;
  'popover.footerButtons.secondary.enabled'?: boolean;
  'popover.footerButtons.primary.enabled'?: boolean;
}> = {
  title: 'Feedback/Mask',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Mask UBITS para onboarding. Crea un overlay oscuro con un "agujero" que destaca un elemento específico de la interfaz. Incluye un Popover integrado para mostrar información o instrucciones. Ideal para guías de usuario, tutoriales y flujos de onboarding.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    targetElement: {
      control: { type: 'text' },
      description: 'Selector CSS o elemento HTML que se quiere destacar.',
      table: {
        type: { summary: 'string | HTMLElement' },
        category: 'Configuración',
      },
    },
    'popover.title': {
      control: { type: 'text' },
      name: 'Título del Popover',
      description: 'Título del popover que se muestra en la máscara.',
      table: { category: 'Popover' },
    },
    'popover.bodyContent': {
      control: { type: 'text' },
      name: 'Contenido del Popover',
      description: 'Contenido HTML del popover.',
      table: { category: 'Popover' },
    },
    'popover.width': {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      name: 'Ancho del Popover',
      description: 'Ancho del popover.',
      table: { category: 'Popover' },
    },
    popoverPosition: {
      control: { type: 'select' },
      options: ['auto', 'top', 'bottom', 'left', 'right'],
      description: 'Posición del popover relativa al elemento destacado.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
        category: 'Configuración',
      },
    },
    popoverOffset: {
      control: { type: 'number' },
      description: 'Offset del popover desde el elemento destacado (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '12' },
        category: 'Configuración',
      },
    },
    padding: {
      control: { type: 'number' },
      description: 'Padding adicional alrededor del elemento destacado (en píxeles).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
        category: 'Configuración',
      },
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si se debe cerrar al hacer clic en el overlay.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Si la máscara está abierta inicialmente.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MaskOptions>;

/**
 * Ejemplo básico de Mask destacando un botón
 */
export const Default: Story = {
  render: (args) => {
    // Crear contenido de ejemplo
    const container = document.createElement('div');
    container.style.cssText = '
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

    // Contenedor para los botones
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

    // Crear máscara después de que el elemento esté en el DOM
    let maskInstance: ReturnType<typeof createMask> | null = null;

    // Usar requestAnimationFrame para crear los botones y la máscara
    requestAnimationFrame(() => {
      try {
        // Botón para abrir la máscara usando componente UBITS
        const openButton = createButton({
          variant: 'secondary',
          size: 'md',
          text: 'Abrir Máscara',
          onClick: () => {
            if (maskInstance) {
              maskInstance.open();
            }
          },
        });
        buttonsContainer.appendChild(openButton);

        // Crear botón objetivo usando componente UBITS
        const targetButton = createButton({
          variant: 'primary',
          size: 'md',
          text: 'Botón Destacado',
        });
        targetButton.id = 'target-button';
        buttonsContainer.appendChild(targetButton);

        container.appendChild(buttonsContainer);

        // Crear máscara después de que los botones estén en el DOM
        requestAnimationFrame(() => {
          maskInstance = createMask({
            targetElement: '#target-button',
            popover: {
              title: args['popover.title'] || 'PASO 1',
              bodyContent: args['popover.bodyContent'] || 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
              width: args['popover.width'] || 'md',
              footerButtons: {
                primary: {
                  label: 'Siguiente',
                  onClick: () => {
                    if (maskInstance) {
                      maskInstance.close();
                    }
                  },
                },
              },
            },
            popoverPosition: args.popoverPosition || 'auto',
            popoverOffset: args.popoverOffset || 12,
            padding: args.padding || 8,
            closeOnOverlayClick: args.closeOnOverlayClick !== false,
            open: args.open || false,
          });
        });
      } catch (error) {
        console.error('❌ Error creando botones:', error);
      }
    });

    return container;
  },
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Este es un ejemplo de máscara de onboarding. El botón está destacado con un overlay oscuro.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
};

// Helper para renderizar Mask de manera consistente
function renderMaskStory(options: Partial<MaskOptions>, autoOpen: boolean = false) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: var(--ubits-spacing-8);
    min-height: 100vh;
    background-color: var(--modifiers-normal-color-light-bg-1);
  `;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ubits-spacing-md);
    margin-top: 200px;
  `;

  let maskInstance: ReturnType<typeof createMask> | null = null;

  requestAnimationFrame(() => {
    try {
      const openButton = createButton({
        variant: 'secondary',
        size: 'md',
        text: 'Abrir Máscara',
        onClick: () => {
          if (maskInstance) {
            maskInstance.open();
          }
        },
      });
      buttonsContainer.appendChild(openButton);

      const targetButton = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Botón Destacado',
      });
      targetButton.id = `target-button-${Math.random().toString(36).substr(2, 9)}`;
      buttonsContainer.appendChild(targetButton);

      container.appendChild(buttonsContainer);

      requestAnimationFrame(() => {
        maskInstance = createMask({
          targetElement: `#${targetButton.id}`,
          popover: options.popover || {
            title: 'PASO 1',
            bodyContent: 'Este es un ejemplo de máscara de onboarding.',
            width: 'md',
            footerButtons: {
              primary: {
                label: 'Siguiente',
                onClick: () => {
                  if (maskInstance) {
                    maskInstance.close();
                  }
                },
              },
            },
          },
          popoverPosition: options.popoverPosition || 'auto',
          popoverOffset: options.popoverOffset || 12,
          padding: options.padding || 8,
          closeOnOverlayClick: options.closeOnOverlayClick !== false,
          open: autoOpen || (options.open || false),
          onClose: options.onClose,
        });
      });
    } catch (error) {
      console.error('❌ Error creando máscara:', error);
    }
  });

  return container;
}

/**
 * PopoverPositionAuto
 * Popover con posición automática
 */
export const PopoverPositionAuto: Story = {
  name: 'Popover Position - Auto',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'El popover se posiciona automáticamente según el espacio disponible.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover en posición automática (se ajusta según el espacio disponible).',
      },
    },
  },
};

/**
 * PopoverPositionTop
 * Popover en posición top
 */
export const PopoverPositionTop: Story = {
  name: 'Popover Position - Top',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'El popover aparece arriba del elemento destacado.',
    'popover.width': 'md',
    popoverPosition: 'top',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover en posición top (arriba del elemento).',
      },
    },
  },
};

/**
 * PopoverPositionBottom
 * Popover en posición bottom
 */
export const PopoverPositionBottom: Story = {
  name: 'Popover Position - Bottom',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'El popover aparece debajo del elemento destacado.',
    'popover.width': 'md',
    popoverPosition: 'bottom',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover en posición bottom (debajo del elemento).',
      },
    },
  },
};

/**
 * PopoverPositionLeft
 * Popover en posición left
 */
export const PopoverPositionLeft: Story = {
  name: 'Popover Position - Left',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'El popover aparece a la izquierda del elemento destacado.',
    'popover.width': 'md',
    popoverPosition: 'left',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover en posición left (a la izquierda del elemento).',
      },
    },
  },
};

/**
 * PopoverPositionRight
 * Popover en posición right
 */
export const PopoverPositionRight: Story = {
  name: 'Popover Position - Right',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'El popover aparece a la derecha del elemento destacado.',
    'popover.width': 'md',
    popoverPosition: 'right',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover en posición right (a la derecha del elemento).',
      },
    },
  },
};

/**
 * PopoverWidthSmall
 * Popover con ancho small
 */
export const PopoverWidthSmall: Story = {
  name: 'Popover Width - Small',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover con ancho small (240px).',
    'popover.width': 'sm',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover de ancho small (240px).',
      },
    },
  },
};

/**
 * PopoverWidthMedium
 * Popover con ancho medium (default)
 */
export const PopoverWidthMedium: Story = {
  name: 'Popover Width - Medium (Default)',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover con ancho medium (360px, valor por defecto).',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover de ancho medium (360px, valor por defecto).',
      },
    },
  },
};

/**
 * PopoverWidthLarge
 * Popover con ancho large
 */
export const PopoverWidthLarge: Story = {
  name: 'Popover Width - Large',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover con ancho large (400px).',
    'popover.width': 'lg',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover de ancho large (400px).',
      },
    },
  },
};

/**
 * PopoverWidthXLarge
 * Popover con ancho xlarge
 */
export const PopoverWidthXLarge: Story = {
  name: 'Popover Width - XLarge',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover con ancho xlarge (480px).',
    'popover.width': 'xl',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover de ancho xlarge (480px).',
      },
    },
  },
};

/**
 * CustomPadding
 * Máscara con padding personalizado
 */
export const CustomPadding: Story = {
  name: 'Custom Padding',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Máscara con padding personalizado de 16px alrededor del elemento.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 16,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con padding personalizado alrededor del elemento destacado.',
      },
    },
  },
};

/**
 * CustomPopoverOffset
 * Popover con offset personalizado
 */
export const CustomPopoverOffset: Story = {
  name: 'Custom Popover Offset',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover con offset personalizado de 24px desde el elemento.',
    'popover.width': 'md',
    popoverPosition: 'bottom',
    popoverOffset: 24,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover que tiene un offset personalizado desde el elemento destacado.',
      },
    },
  },
};

/**
 * CloseOnOverlayClick
 * Máscara que se cierra al hacer clic en el overlay
 */
export const CloseOnOverlayClick: Story = {
  name: 'Close On Overlay Click',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Haz clic fuera del elemento destacado para cerrar la máscara.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask que se cierra al hacer clic en el overlay (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoCloseOnOverlayClick
 * Máscara que NO se cierra al hacer clic en el overlay
 */
export const NoCloseOnOverlayClick: Story = {
  name: 'No Close On Overlay Click',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Esta máscara NO se cierra al hacer clic fuera. Debes usar el botón para cerrarla.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: false,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask que NO se cierra al hacer clic en el overlay. Solo se cierra con el botón.',
      },
    },
  },
};

/**
 * OpenInitially
 * Máscara abierta inicialmente
 */
export const OpenInitially: Story = {
  name: 'Open Initially',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Esta máscara se abre automáticamente al cargar.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: true,
  },
  render: (args) => renderMaskStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Mask que se abre automáticamente al cargar.',
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
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Al cerrar esta máscara se ejecutará un callback.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      onClose: () => {
        alert('Máscara cerrada - callback ejecutado');
        console.log('Mask closed');
      }
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * PopoverWithTitle
 * Popover con título
 */
export const PopoverWithTitle: Story = {
  name: 'Popover With Title',
  args: {
    'popover.title': 'PASO 1: Bienvenido',
    'popover.bodyContent': 'Este popover incluye un título en el header.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover que incluye un título.',
      },
    },
  },
};

/**
 * PopoverWithoutTitle
 * Popover sin título
 */
export const PopoverWithoutTitle: Story = {
  name: 'Popover Without Title',
  args: {
    'popover.bodyContent': 'Este popover no tiene título, solo contenido.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => renderMaskStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover sin título, solo contenido.',
      },
    },
  },
};

/**
 * PopoverPrimaryButtonOnly
 * Popover solo con botón primario
 */
export const PopoverPrimaryButtonOnly: Story = {
  name: 'Popover - Primary Button Only',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover solo con botón primario en el footer.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        title: args['popover.title'] || 'PASO 1',
        bodyContent: args['popover.bodyContent'] || 'Popover solo con botón primario.',
        width: args['popover.width'] || 'md',
        footerButtons: {
          primary: {
            label: 'Siguiente',
            onClick: () => {
              console.log('Primary button clicked');
            },
          },
        },
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover que solo tiene botón primario en el footer.',
      },
    },
  },
};

/**
 * PopoverSecondaryButtonOnly
 * Popover solo con botón secundario
 */
export const PopoverSecondaryButtonOnly: Story = {
  name: 'Popover - Secondary Button Only',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover solo con botón secundario en el footer.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        title: args['popover.title'] || 'PASO 1',
        bodyContent: args['popover.bodyContent'] || 'Popover solo con botón secundario.',
        width: args['popover.width'] || 'md',
        footerButtons: {
          secondary: {
            label: 'Cancelar',
            onClick: () => {
              console.log('Secondary button clicked');
            },
          },
        },
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover que solo tiene botón secundario en el footer.',
      },
    },
  },
};

/**
 * PopoverTertiaryButtonOnly
 * Popover solo con botón terciario
 */
export const PopoverTertiaryButtonOnly: Story = {
  name: 'Popover - Tertiary Button Only',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover solo con botón terciario en el footer.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        title: args['popover.title'] || 'PASO 1',
        bodyContent: args['popover.bodyContent'] || 'Popover solo con botón terciario.',
        width: args['popover.width'] || 'md',
        footerButtons: {
          tertiary: {
            label: 'Omitir',
            onClick: () => {
              console.log('Tertiary button clicked');
            },
          },
        },
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover que solo tiene botón terciario en el footer.',
      },
    },
  },
};

/**
 * PopoverWithoutFooterButtons
 * Popover sin botones en el footer
 */
export const PopoverWithoutFooterButtons: Story = {
  name: 'Popover - Without Footer Buttons',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Popover sin botones en el footer. Haz clic fuera para cerrar.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        title: args['popover.title'] || 'PASO 1',
        bodyContent: args['popover.bodyContent'] || 'Popover sin botones.',
        width: args['popover.width'] || 'md',
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask con popover sin botones en el footer.',
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
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Usa los botones de control para abrir y cerrar la máscara.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

    let maskInstance: ReturnType<typeof createMask> | null = null;

    requestAnimationFrame(() => {
      const openBtn = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Abrir Máscara',
        onClick: () => {
          if (maskInstance) {
            maskInstance.open();
          }
        },
      });

      const closeBtn = createButton({
        variant: 'secondary',
        size: 'md',
        text: 'Cerrar Máscara',
        onClick: () => {
          if (maskInstance) {
            maskInstance.close();
          }
        },
      });

      const targetButton = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Botón Destacado',
      });
      targetButton.id = `target-button-${Math.random().toString(36).substr(2, 9)}`;

      buttonsContainer.appendChild(openBtn);
      buttonsContainer.appendChild(closeBtn);
      buttonsContainer.appendChild(targetButton);
      container.appendChild(buttonsContainer);

      requestAnimationFrame(() => {
        maskInstance = createMask({
          targetElement: `#${targetButton.id}`,
          popover: {
            title: args['popover.title'] || 'PASO 1',
            bodyContent: args['popover.bodyContent'] || 'Usa los botones de control.',
            width: args['popover.width'] || 'md',
            footerButtons: {
              primary: {
                label: 'Siguiente',
                onClick: () => {
                  if (maskInstance) {
                    maskInstance.close();
                  }
                },
              },
            },
          },
          popoverPosition: args.popoverPosition || 'auto',
          popoverOffset: args.popoverOffset || 12,
          padding: args.padding || 8,
          closeOnOverlayClick: args.closeOnOverlayClick !== false,
          open: false,
        });
      });
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask que demuestra los métodos open() y close() programáticamente.',
      },
    },
  },
};

/**
 * UpdateTargetMethod
 * Demostrar método updateTarget()
 */
export const UpdateTargetMethod: Story = {
  name: 'UpdateTarget Method',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'Usa el botón para cambiar el elemento destacado.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-md);
      margin-top: 200px;
    `;

    let maskInstance: ReturnType<typeof createMask> | null = null;
    let currentTarget = 1;

    requestAnimationFrame(() => {
      const openBtn = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Abrir Máscara',
        onClick: () => {
          if (maskInstance) {
            maskInstance.open();
          }
        },
      });

      const updateBtn = createButton({
        variant: 'secondary',
        size: 'md',
        text: 'Cambiar Elemento Destacado',
        onClick: () => {
          if (maskInstance) {
            currentTarget = currentTarget === 1 ? 2 : 1;
            maskInstance.updateTarget(`#target-button-${currentTarget}`);
          }
        },
      });

      const targetButton1 = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Botón 1',
      });
      targetButton1.id = 'target-button-1';

      const targetButton2 = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Botón 2',
      });
      targetButton2.id = 'target-button-2';

      buttonsContainer.appendChild(openBtn);
      buttonsContainer.appendChild(updateBtn);
      buttonsContainer.appendChild(targetButton1);
      buttonsContainer.appendChild(targetButton2);
      container.appendChild(buttonsContainer);

      requestAnimationFrame(() => {
        maskInstance = createMask({
          targetElement: '#target-button-1',
          popover: {
            title: args['popover.title'] || 'PASO 1',
            bodyContent: args['popover.bodyContent'] || 'Usa el botón para cambiar el elemento.',
            width: args['popover.width'] || 'md',
            footerButtons: {
              primary: {
                label: 'Siguiente',
                onClick: () => {
                  if (maskInstance) {
                    maskInstance.close();
                  }
                },
              },
            },
          },
          popoverPosition: args.popoverPosition || 'auto',
          popoverOffset: args.popoverOffset || 12,
          padding: args.padding || 8,
          closeOnOverlayClick: args.closeOnOverlayClick !== false,
          open: false,
        });
      });
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask que demuestra el método updateTarget() para cambiar el elemento destacado.',
      },
    },
  },
};

/**
 * DifferentTargetElements
 * Máscara destacando diferentes tipos de elementos
 */
export const DifferentTargetElements: Story = {
  name: 'Different Target Elements',
  args: {
    'popover.title': 'PASO 1',
    'popover.bodyContent': 'La máscara puede destacar diferentes tipos de elementos.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: var(--ubits-spacing-8);
      min-height: 100vh;
      background-color: var(--modifiers-normal-color-light-bg-1);
    `;

    const contentContainer = document.createElement('div');
    contentContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ubits-spacing-lg);
      margin-top: 100px;
    `;

    let maskInstance: ReturnType<typeof createMask> | null = null;

    requestAnimationFrame(() => {
      const openBtn = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Abrir Máscara',
        onClick: () => {
          if (maskInstance) {
            maskInstance.open();
          }
        },
      });

      const targetButton = createButton({
        variant: 'primary',
        size: 'md',
        text: 'Botón',
      });
      targetButton.id = 'target-button';

      const targetInput = document.createElement('input');
      targetInput.type = 'text';
      targetInput.placeholder = 'Input destacado';
      targetInput.id = 'target-input';
      targetInput.style.cssText = `
        padding: 10px 12px;
        border: 1px solid var(--modifiers-normal-color-light-border-1);
        border-radius: 8px;
        font-family: var(--font-family-noto-sans-font-family);
        font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      `;

      const targetCard = document.createElement('div');
      targetCard.id = 'target-card';
      targetCard.style.cssText = `
        padding: 24px;
        background: var(--modifiers-normal-color-light-bg-2);
        border-radius: 8px;
        border: 1px solid var(--modifiers-normal-color-light-border-1);
        min-width: 200px;
        text-align: center;
      `;
      targetCard.innerHTML = '<p class="ubits-body-md">Tarjeta destacada</p>';

      contentContainer.appendChild(openBtn);
      contentContainer.appendChild(targetButton);
      contentContainer.appendChild(targetInput);
      contentContainer.appendChild(targetCard);
      container.appendChild(contentContainer);

      requestAnimationFrame(() => {
        maskInstance = createMask({
          targetElement: '#target-button',
          popover: {
            title: args['popover.title'] || 'PASO 1',
            bodyContent: args['popover.bodyContent'] || 'La máscara puede destacar diferentes elementos.',
            width: args['popover.width'] || 'md',
            footerButtons: {
              primary: {
                label: 'Siguiente',
                onClick: () => {
                  if (maskInstance) {
                    maskInstance.close();
                  }
                },
              },
            },
          },
          popoverPosition: args.popoverPosition || 'auto',
          popoverOffset: args.popoverOffset || 12,
          padding: args.padding || 8,
          closeOnOverlayClick: args.closeOnOverlayClick !== false,
          open: false,
        });
      });
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask destacando diferentes tipos de elementos (botón, input, tarjeta).',
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
    'popover.bodyContent': 'Máscara mínima con solo contenido en el popover.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        bodyContent: args['popover.bodyContent'] || 'Máscara mínima.',
        width: args['popover.width'] || 'md',
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask mínimo con solo contenido en el popover, sin título ni botones.',
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
    'popover.title': 'PASO 1: Bienvenido',
    'popover.bodyContent': 'Este es un ejemplo completo de máscara con todas las opciones configuradas.',
    'popover.width': 'md',
    popoverPosition: 'auto',
    popoverOffset: 12,
    padding: 8,
    closeOnOverlayClick: true,
    open: false,
  },
  render: (args) => {
    const options: Partial<MaskOptions> = {
      ...args,
      popover: {
        title: args['popover.title'] || 'PASO 1',
        bodyContent: args['popover.bodyContent'] || 'Ejemplo completo.',
        width: args['popover.width'] || 'md',
        footerButtons: {
          tertiary: {
            label: 'Omitir',
            onClick: () => console.log('Tertiary clicked'),
          },
          secondary: {
            label: 'Anterior',
            onClick: () => console.log('Secondary clicked'),
          },
          primary: {
            label: 'Siguiente',
            onClick: () => {
              console.log('Primary clicked');
            },
          },
        },
      },
      onClose: () => {
        console.log('Mask closed');
      },
    };
    return renderMaskStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Mask completo con todas las opciones: título, contenido, botones del footer, callbacks, etc.',
      },
    },
  },
};


