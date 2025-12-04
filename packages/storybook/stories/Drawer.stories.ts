import type { Meta, StoryObj } from '@storybook/html';
import { createDrawer } from '../../components/drawer/src/DrawerProvider';
import type { DrawerOptions } from '../../components/drawer/src/types/DrawerOptions';
import { renderButton } from '../../components/button/src/ButtonProvider';
import '../../components/drawer/src/styles/drawer.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<DrawerOptions> = {
  title: 'Feedback/Drawer Navigation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Drawer Navigation UBITS que se desliza desde la derecha de la pantalla. Ideal para formularios, filtros o vistas de detalle. Soporta diferentes anchos, un header con título y texto complementario, un body con contenido scrollable y un footer con botones de acción.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título principal del drawer.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Crear dato demográfico' },
        category: 'Contenido',
      },
    },
    complementaryText: {
      control: { type: 'text' },
      description: 'Texto secundario opcional que aparece debajo del título.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Contenido',
      },
    },
    width: {
      control: { type: 'select' },
      options: [100, 80, 60, 50, 40, 30],
      description: 'Ancho del drawer como porcentaje del viewport (100, 80, 60, 50, 40, 30). En móvil siempre es 100%.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 40 },
        category: 'Apariencia',
      },
    },
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido HTML del cuerpo del drawer. Puede ser una cadena HTML o una función que devuelve HTML.',
      table: {
        type: { summary: 'string | (() => string)' },
        defaultValue: { summary: '...' },
        category: 'Contenido',
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
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si el drawer se cierra al hacer clic fuera de él.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Comportamiento',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback que se ejecuta cuando el drawer se cierra.',
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DrawerOptions>;

export const Default: Story = {
  args: {
    title: 'Crear dato demográfico',
    complementaryText: '',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Pregunta</label>
          <textarea placeholder="Escribe tu pregunta aquí..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="margin-bottom: 16px; padding: 12px; background: var(--modifiers-normal-color-light-feedback-bg-info-subtle-default); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <i class="far fa-info-circle" style="color: var(--modifiers-normal-color-light-feedback-fg-info-subtle-default); font-size: 16px; margin-top: 2px;"></i>
          <p style="margin: 0; font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium);">Debes tener al menos dos opciones de respuesta</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium); min-width: 20px;">1</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
            ${renderButton({
              variant: 'tertiary',
              size: 'sm',
              icon: 'trash',
              iconStyle: 'regular',
              iconOnly: true
            })}
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="font-size: var(--modifiers-normal-body-sm-regular-fontsize); color: var(--modifiers-normal-color-light-fg-1-medium); min-width: 20px;">2</span>
            <input type="text" placeholder="Label" style="flex: 1; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
            ${renderButton({
              variant: 'tertiary',
              size: 'sm',
              icon: 'trash',
              iconStyle: 'regular',
              iconOnly: true
            })}
          </div>
        </div>
        <button style="margin-top: 16px; padding: 10px 12px; border: 1px dashed var(--modifiers-normal-color-light-border-1); background: transparent; border-radius: 8px; color: var(--modifiers-normal-color-light-fg-1-medium); font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%;">
          <i class="far fa-plus"></i>
          <span>Añadir opción de respuesta</span>
        </button>
      </div>
    `,
    'footerButtons.tertiary.label': 'Cancelar',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Guardar',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Crear',
    'footerButtons.primary.enabled': true,
    closeOnOverlayClick: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'drawer-story-container';
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
    openButton.innerHTML = '<span>Abrir Drawer</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    
    const handleOpenDrawer = () => {
      if (!drawerInstance) {
        // Construir footerButtons desde los args individuales
        const footerButtons: any = {};
        
        if (args['footerButtons.tertiary.enabled']) {
          footerButtons['tertiary'] = {
            label: args['footerButtons.tertiary.label'] || 'Cancelar',
            onClick: () => {
              // Botón Tertiary clickeado
            },
          };
        }
        
        if (args['footerButtons.secondary.enabled']) {
          footerButtons['secondary'] = {
            label: args['footerButtons.secondary.label'] || 'Guardar',
            onClick: () => {
              // Botón Secondary clickeado
            },
          };
        }
        
        if (args['footerButtons.primary.enabled']) {
          footerButtons['primary'] = {
            label: args['footerButtons.primary.label'] || 'Crear',
            onClick: () => {
              // Botón Primary clickeado
            },
          };
        }
        
        drawerInstance = createDrawer({
          title: args.title,
          complementaryText: args.complementaryText,
          width: args.width,
          bodyContent: args.bodyContent,
          footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
          containerId: undefined, // Añadir al body, no al contenedor
          closeOnOverlayClick: args.closeOnOverlayClick,
          onClose: () => {
            if (args.onClose) {
              args.onClose();
            }
            // Limpiar la instancia
            if (drawerInstance && drawerInstance.element) {
              drawerInstance.element.remove();
            }
            drawerInstance = null;
            // Restaurar el botón
            openButton.style.display = 'flex';
            openButton.style.visibility = 'visible';
          },
          open: true,
        });
        
        // Ocultar el botón
        openButton.style.display = 'none';
        openButton.style.visibility = 'hidden';
      }
    };
    
    openButton.addEventListener('click', handleOpenDrawer);
    
    container.appendChild(openButton);
    
    return container;
  },
};

// Helper para renderizar Drawer de manera consistente
function renderDrawerStory(options: DrawerOptions, autoOpen: boolean = false) {
  const container = document.createElement('div');
  container.id = `drawer-story-container-${Math.random().toString(36).substr(2, 9)}`;
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
  openButton.innerHTML = '<span>Abrir Drawer</span>';
  openButton.style.width = 'auto';
  openButton.style.minWidth = 'auto';
  
  let drawerInstance: ReturnType<typeof createDrawer> | null = null;
  
  const handleOpenDrawer = () => {
    if (!drawerInstance) {
      drawerInstance = createDrawer({
        ...options,
        containerId: undefined,
        onClose: () => {
          if (options.onClose) {
            options.onClose();
          }
          if (drawerInstance && drawerInstance.element) {
            drawerInstance.element.remove();
          }
          drawerInstance = null;
          openButton.style.display = 'flex';
          openButton.style.visibility = 'visible';
        },
        open: true,
      });
      
      openButton.style.display = 'none';
      openButton.style.visibility = 'hidden';
    }
  };
  
  openButton.addEventListener('click', handleOpenDrawer);
  container.appendChild(openButton);
  
  if (autoOpen) {
    requestAnimationFrame(() => {
      handleOpenDrawer();
    });
  }
  
  return container;
}

/**
 * Width100
 * Drawer con ancho 100%
 */
export const Width100: Story = {
  name: 'Width - 100%',
  args: {
    title: 'Drawer 100%',
    complementaryText: 'Este drawer ocupa el 100% del ancho del viewport',
    width: 100,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 100%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 100% del viewport.',
      },
    },
  },
};

/**
 * Width80
 * Drawer con ancho 80%
 */
export const Width80: Story = {
  name: 'Width - 80%',
  args: {
    title: 'Drawer 80%',
    complementaryText: 'Este drawer ocupa el 80% del ancho del viewport',
    width: 80,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 80%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 80% del viewport.',
      },
    },
  },
};

/**
 * Width60
 * Drawer con ancho 60%
 */
export const Width60: Story = {
  name: 'Width - 60%',
  args: {
    title: 'Drawer 60%',
    complementaryText: 'Este drawer ocupa el 60% del ancho del viewport',
    width: 60,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 60%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 60% del viewport.',
      },
    },
  },
};

/**
 * Width50
 * Drawer con ancho 50%
 */
export const Width50: Story = {
  name: 'Width - 50%',
  args: {
    title: 'Drawer 50%',
    complementaryText: 'Este drawer ocupa el 50% del ancho del viewport',
    width: 50,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 50%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 50% del viewport.',
      },
    },
  },
};

/**
 * Width40
 * Drawer con ancho 40% (default)
 */
export const Width40: Story = {
  name: 'Width - 40% (Default)',
  args: {
    title: 'Drawer 40%',
    complementaryText: 'Este drawer ocupa el 40% del ancho del viewport (default)',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 40%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 40% del viewport (valor por defecto).',
      },
    },
  },
};

/**
 * Width30
 * Drawer con ancho 30%
 */
export const Width30: Story = {
  name: 'Width - 30%',
  args: {
    title: 'Drawer 30%',
    complementaryText: 'Este drawer ocupa el 30% del ancho del viewport',
    width: 30,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer con ancho 30%</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con ancho 30% del viewport.',
      },
    },
  },
};

/**
 * WithComplementaryText
 * Drawer con texto complementario
 */
export const WithComplementaryText: Story = {
  name: 'With Complementary Text',
  args: {
    title: 'Crear nuevo usuario',
    complementaryText: 'Completa el formulario para crear un nuevo usuario en el sistema',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Formulario de creación de usuario</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Crear' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con texto complementario debajo del título.',
      },
    },
  },
};

/**
 * WithoutComplementaryText
 * Drawer sin texto complementario
 */
export const WithoutComplementaryText: Story = {
  name: 'Without Complementary Text',
  args: {
    title: 'Configuración',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer sin texto complementario</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Guardar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer sin texto complementario, solo con título.',
      },
    },
  },
};

/**
 * WithFooterButtons
 * Drawer con todos los botones del footer
 */
export const WithFooterButtons: Story = {
  name: 'With Footer Buttons',
  args: {
    title: 'Eliminar elemento',
    complementaryText: 'Esta acción no se puede deshacer',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>¿Estás seguro de que deseas eliminar este elemento?</p></div>',
    footerButtons: {
      tertiary: { label: 'Eliminar' },
      secondary: { label: 'Cancelar' },
      primary: { label: 'Confirmar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con todos los botones del footer (tertiary, secondary, primary).',
      },
    },
  },
};

/**
 * FooterTertiaryOnly
 * Drawer solo con botón terciario
 */
export const FooterTertiaryOnly: Story = {
  name: 'Footer - Tertiary Only',
  args: {
    title: 'Eliminar',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer</p></div>',
    footerButtons: {
      tertiary: { label: 'Eliminar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer solo con botón terciario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryOnly
 * Drawer solo con botón secundario
 */
export const FooterSecondaryOnly: Story = {
  name: 'Footer - Secondary Only',
  args: {
    title: 'Información',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer</p></div>',
    footerButtons: {
      secondary: { label: 'Cerrar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer solo con botón secundario en el footer.',
      },
    },
  },
};

/**
 * FooterPrimaryOnly
 * Drawer solo con botón primario
 */
export const FooterPrimaryOnly: Story = {
  name: 'Footer - Primary Only',
  args: {
    title: 'Confirmar',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer</p></div>',
    footerButtons: {
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer solo con botón primario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryAndPrimary
 * Drawer con botones secundario y primario
 */
export const FooterSecondaryAndPrimary: Story = {
  name: 'Footer - Secondary and Primary',
  args: {
    title: 'Guardar cambios',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Guardar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con botones secundario y primario en el footer.',
      },
    },
  },
};

/**
 * WithoutFooterButtons
 * Drawer sin botones del footer
 */
export const WithoutFooterButtons: Story = {
  name: 'Without Footer Buttons',
  args: {
    title: 'Vista previa',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido del drawer sin botones en el footer</p></div>',
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer sin botones en el footer.',
      },
    },
  },
};

/**
 * CloseOnOverlayClick
 * Drawer que se cierra al hacer clic en el overlay
 */
export const CloseOnOverlayClick: Story = {
  name: 'Close On Overlay Click',
  args: {
    title: 'Drawer con cierre en overlay',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Haz clic fuera del drawer para cerrarlo</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer que se cierra al hacer clic en el overlay (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoCloseOnOverlayClick
 * Drawer que NO se cierra al hacer clic en el overlay
 */
export const NoCloseOnOverlayClick: Story = {
  name: 'No Close On Overlay Click',
  args: {
    title: 'Drawer sin cierre en overlay',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Este drawer NO se cierra al hacer clic fuera. Debes usar el botón de cerrar o ESC.</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: false
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer que NO se cierra al hacer clic en el overlay. Solo se cierra con el botón X o ESC.',
      },
    },
  },
};

/**
 * OpenInitially
 * Drawer abierto inicialmente
 */
export const OpenInitially: Story = {
  name: 'Open Initially',
  args: {
    title: 'Drawer abierto',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Este drawer se abre automáticamente al cargar</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true,
    open: true
  },
  render: (args) => renderDrawerStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Drawer que se abre automáticamente al cargar.',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Drawer con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    title: 'Drawer con callback',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Al cerrar este drawer se ejecutará un callback</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => {
    const options: DrawerOptions = {
      ...args,
      onClose: () => {
        alert('Drawer cerrado - callback ejecutado');
        console.log('Drawer cerrado');
      }
    };
    return renderDrawerStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * FooterButtonCallbacks
 * Drawer con callbacks en los botones del footer
 */
export const FooterButtonCallbacks: Story = {
  name: 'Footer Button Callbacks',
  args: {
    title: 'Drawer con callbacks',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Los botones del footer tienen callbacks personalizados</p></div>',
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
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con callbacks personalizados en los botones del footer.',
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
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Contenido inicial del drawer</p></div>',
    footerButtons: {
      primary: { label: 'Actualizar contenido' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => {
    const container = renderDrawerStory(args);
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    
    const openButton = container.querySelector('button');
    if (openButton) {
      const originalHandler = openButton.onclick;
      openButton.onclick = () => {
        if (!drawerInstance) {
          drawerInstance = createDrawer({
            ...args,
            containerId: undefined,
            footerButtons: {
              primary: {
                label: 'Actualizar contenido',
                onClick: () => {
                  if (drawerInstance) {
                    drawerInstance.updateContent('<div style="padding: 16px;"><p>Contenido actualizado exitosamente!</p></div>');
                  }
                }
              }
            },
            onClose: () => {
              drawerInstance = null;
              openButton.style.display = 'flex';
              openButton.style.visibility = 'visible';
            },
            open: true,
          });
          openButton.style.display = 'none';
          openButton.style.visibility = 'hidden';
        }
      };
    }
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer que demuestra el método updateContent() para actualizar el contenido del body.',
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
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Usa los botones de control para abrir y cerrar el drawer</p></div>',
    footerButtons: {
      secondary: { label: 'Cerrar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true,
    open: false
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
    
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    
    const openBtn = document.createElement('button');
    openBtn.className = 'ubits-button ubits-button--primary ubits-button--md';
    openBtn.innerHTML = '<span>Abrir Drawer</span>';
    openBtn.onclick = () => {
      if (!drawerInstance) {
        drawerInstance = createDrawer({
          ...args,
          containerId: undefined,
          onClose: () => {
            drawerInstance = null;
          }
        });
      }
      drawerInstance.open();
    };
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ubits-button ubits-button--secondary ubits-button--md';
    closeBtn.innerHTML = '<span>Cerrar Drawer</span>';
    closeBtn.onclick = () => {
      if (drawerInstance) {
        drawerInstance.close();
      }
    };
    
    container.appendChild(openBtn);
    container.appendChild(closeBtn);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer que demuestra los métodos open() y close() programáticamente.',
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
    width: 40,
    bodyContent: '<div style="padding: 16px;"><h3>Contenido HTML</h3><p>Este contenido es un string HTML simple.</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con body content definido como string HTML.',
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
    width: 40,
    bodyContent: () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      return `
        <div style="padding: 16px;">
          <h3>Contenido generado dinámicamente</h3>
          <ul style="list-style: none; padding: 0;">
            ${items.map(item => `<li style="padding: 8px; margin-bottom: 8px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 4px;">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    },
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con body content definido como función que retorna HTML.',
      },
    },
  },
};

/**
 * LongContent
 * Drawer con contenido largo (scrollable)
 */
export const LongContent: Story = {
  name: 'Long Content',
  args: {
    title: 'Contenido largo',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        ${Array.from({ length: 50 }, (_, i) => `
          <p style="margin-bottom: 16px; padding: 12px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 4px;">
            Párrafo ${i + 1}: Este es un contenido largo para demostrar el scroll del drawer.
          </p>
        `).join('')}
      </div>
    `,
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con contenido largo que activa el scroll del body.',
      },
    },
  },
};

/**
 * ShortContent
 * Drawer con contenido corto
 */
export const ShortContent: Story = {
  name: 'Short Content',
  args: {
    title: 'Contenido corto',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Este es un contenido corto que no requiere scroll.</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con contenido corto que no requiere scroll.',
      },
    },
  },
};

/**
 * EmptyContent
 * Drawer sin contenido (placeholder)
 */
export const EmptyContent: Story = {
  name: 'Empty Content',
  args: {
    title: 'Drawer vacío',
    width: 40,
    bodyContent: '',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer sin contenido, muestra el placeholder por defecto.',
      },
    },
  },
};

/**
 * FormContent
 * Drawer con formulario en el body
 */
export const FormContent: Story = {
  name: 'Form Content',
  args: {
    title: 'Crear usuario',
    complementaryText: 'Completa el formulario para crear un nuevo usuario',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Nombre</label>
          <input type="text" placeholder="Ingresa el nombre" style="width: 100%; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Email</label>
          <input type="email" placeholder="Ingresa el email" style="width: 100%; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Descripción</label>
          <textarea placeholder="Ingresa una descripción" style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); resize: vertical; box-sizing: border-box;"></textarea>
        </div>
      </div>
    `,
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Crear' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con un formulario completo en el body.',
      },
    },
  },
};

/**
 * ListContent
 * Drawer con lista en el body
 */
export const ListContent: Story = {
  name: 'List Content',
  args: {
    title: 'Lista de elementos',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${Array.from({ length: 10 }, (_, i) => `
            <li style="padding: 12px; margin-bottom: 8px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 8px; display: flex; align-items: center; gap: 12px;">
              <i class="far fa-circle" style="color: var(--modifiers-normal-color-light-fg-1-medium);"></i>
              <span>Elemento ${i + 1}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `,
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Seleccionar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer con una lista de elementos en el body.',
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
    title: 'Drawer mínimo',
    width: 40,
    bodyContent: '<div style="padding: 16px;"><p>Este es un drawer mínimo con solo título y contenido básico.</p></div>',
    closeOnOverlayClick: true
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer mínimo con solo título y contenido básico.',
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
    title: 'Drawer completo',
    complementaryText: 'Este es un ejemplo completo con todas las opciones disponibles',
    width: 40,
    bodyContent: `
      <div style="padding: 16px;">
        <h3 style="margin-top: 0;">Contenido completo</h3>
        <p>Este drawer incluye:</p>
        <ul style="padding-left: 20px;">
          <li>Título y texto complementario</li>
          <li>Contenido en el body</li>
          <li>Botones en el footer (tertiary, secondary, primary)</li>
          <li>Callbacks personalizados</li>
        </ul>
      </div>
    `,
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
    closeOnOverlayClick: true,
    onClose: () => console.log('Drawer closed')
  },
  render: (args) => renderDrawerStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Drawer completo con todas las opciones: título, texto complementario, contenido, botones del footer con callbacks, y callback onClose.',
      },
    },
  },
};

