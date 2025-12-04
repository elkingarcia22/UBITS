import type { Meta, StoryObj } from '@storybook/html';
import { createModal } from '../../components/modal/src/ModalProvider';
import type { ModalOptions } from '../../components/modal/src/types/ModalOptions';
import '../../components/modal/src/styles/modal.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<ModalOptions> = {
  title: 'Feedback/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Modal UBITS centrado con overlay. Ideal para diálogos, confirmaciones y formularios. Soporta diferentes tamaños, variante full-screen, header con título y botón de cerrar, body con contenido scrollable y footer con botones de acción.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título principal del modal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Título del modal' },
        category: 'Contenido'
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Tamaño del modal usando tokens UBITS (sm, md, lg, xl, full).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia'
}
},
    fullScreen: {
      control: { type: 'boolean' },
      description: 'Si el modal debe ocupar altura máxima (full-screen).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Apariencia'
}
},
    bodyContent: {
      control: { type: 'text' },
      description: 'Contenido HTML del cuerpo del modal. Puede ser una cadena HTML o una función que devuelve HTML.',
      table: {
        type: { summary: 'string | (() => string)' },
        defaultValue: { summary: '...' },
        category: 'Contenido'
}
},
    'footerButtons.tertiary.label': {
      control: { type: 'text' },
      name: 'Label Botón Terciario',
      description: 'Label del botón terciario (izquierda del footer).',
      table: { category: 'Footer Buttons' }
},
    'footerButtons.tertiary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Terciario',
      description: 'Controla la visibilidad del botón terciario.',
      table: { category: 'Footer Buttons' }
},
    'footerButtons.secondary.label': {
      control: { type: 'text' },
      name: 'Label Botón Secundario',
      description: 'Label del botón secundario (derecha del footer).',
      table: { category: 'Footer Buttons' }
},
    'footerButtons.secondary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Secundario',
      description: 'Controla la visibilidad del botón secundario.',
      table: { category: 'Footer Buttons' }
},
    'footerButtons.primary.label': {
      control: { type: 'text' },
      name: 'Label Botón Primario',
      description: 'Label del botón primario (derecha del footer).',
      table: { category: 'Footer Buttons' }
},
    'footerButtons.primary.enabled': {
      control: { type: 'boolean' },
      name: 'Habilitar Botón Primario',
      description: 'Controla la visibilidad del botón primario.',
      table: { category: 'Footer Buttons' }
},
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Si el modal se cierra al hacer clic fuera de él.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
        category: 'Comportamiento'
}
},
    onClose: {
      action: 'closed',
      description: 'Callback que se ejecuta cuando el modal se cierra.',
      table: {
        disable: true
}
}
}
};

export default meta;
type Story = StoryObj<ModalOptions>;

export const Default: Story = {
  args: {
    title: 'Título del modal',
    size: 'md',
    fullScreen: false,
    bodyContent: `
        <p>
          Este es el contenido del modal. Puedes agregar cualquier contenido HTML aquí, como formularios, texto, imágenes, etc.
        </p>
    `,
    'footerButtons.tertiary.label': 'Cancelar',
    'footerButtons.tertiary.enabled': true,
    'footerButtons.secondary.label': 'Guardar',
    'footerButtons.secondary.enabled': true,
    'footerButtons.primary.label': 'Aplicar',
    'footerButtons.primary.enabled': true,
    closeOnOverlayClick: true
},
  render: (args) => {
    const container = document.createElement('div');
    container.id = 'modal-story-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    
    const openButton = document.createElement('button');
    openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
    openButton.innerHTML = '<span>Abrir Modal</span>';
    openButton.style.width = 'auto';
    openButton.style.minWidth = 'auto';
    
    let modalInstance: ReturnType<typeof createModal> | null = null;
    
    const handleOpenModal = () => {
      if (!modalInstance) {
        // handleOpenModal
        
        // Construir footerButtons desde los args individuales
        const footerButtons: any = {};
        
        if (args['footerButtons.tertiary.enabled']) {
          footerButtons['tertiary'] = {
            label: args['footerButtons.tertiary.label'] || 'Cancelar',
            onClick: () => {
              // Botón Tertiary clickeado
            }
};
        }
        
        if (args['footerButtons.secondary.enabled']) {
          footerButtons['secondary'] = {
            label: args['footerButtons.secondary.label'] || 'Guardar',
            onClick: () => {
              // Botón Secondary clickeado
            }
};
        }
        
        if (args['footerButtons.primary.enabled']) {
          footerButtons['primary'] = {
            label: args['footerButtons.primary.label'] || 'Aplicar',
            onClick: () => {
              // Botón Primary clickeado
            }
};
        }
        
        // footerButtons construido
        
        modalInstance = createModal({
          title: args.title,
          size: args.size,
          fullScreen: args.fullScreen,
          bodyContent: args.bodyContent,
          footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
          containerId: undefined, // Añadir al body, no al contenedor
          closeOnOverlayClick: args.closeOnOverlayClick,
          onClose: () => {
            if (args.onClose) {
              args.onClose();
            }
            // Limpiar la instancia
            if (modalInstance && modalInstance.element) {
              modalInstance.element.remove();
            }
            modalInstance = null;
            // Restaurar el botón
            openButton.style.display = 'flex';
            openButton.style.visibility = 'visible';
          },
          open: true
});
        
        // Modal creado
        
        // Ocultar el botón
        openButton.style.display = 'none';
        openButton.style.visibility = 'hidden';
      }
    };
    
    openButton.addEventListener('click', handleOpenModal);
    
    container.appendChild(openButton);
    
    return container;
  }
};

// Helper para renderizar Modal de manera consistente
function renderModalStory(options: Partial<ModalOptions>, autoOpen: boolean = false) {
  const container = document.createElement('div');
  container.id = `modal-story-container-${Math.random().toString(36).substr(2, 9)}`;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  
  const openButton = document.createElement('button');
  openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
  openButton.innerHTML = '<span>Abrir Modal</span>';
  openButton.style.width = 'auto';
  openButton.style.minWidth = 'auto';
  
  let modalInstance: ReturnType<typeof createModal> | null = null;
  
  const handleOpenModal = () => {
    if (!modalInstance) {
      const footerButtons: any = {};
      
      if (options.footerButtons?.tertiary) {
        footerButtons['tertiary'] = options.footerButtons.tertiary;
      }
      
      if (options.footerButtons?.secondary) {
        footerButtons['secondary'] = options.footerButtons.secondary;
      }
      
      if (options.footerButtons?.primary) {
        footerButtons['primary'] = options.footerButtons.primary;
      }
      
      modalInstance = createModal({
        title: options.title || 'Título del modal',
        size: options.size || 'md',
        fullScreen: options.fullScreen || false,
        bodyContent: options.bodyContent || '<p>Contenido del modal</p>',
        footerButtons: Object.keys(footerButtons).length > 0 ? footerButtons : undefined,
        containerId: undefined,
        closeOnOverlayClick: options.closeOnOverlayClick !== false,
        onClose: () => {
          if (options.onClose) {
            options.onClose();
          }
          if (modalInstance && modalInstance.element) {
            modalInstance.element.remove();
          }
          modalInstance = null;
          openButton.style.display = 'flex';
          openButton.style.visibility = 'visible';
        },
        open: autoOpen || (options.open || false)
      });
      
      openButton.style.display = 'none';
      openButton.style.visibility = 'hidden';
    }
  };
  
  openButton.addEventListener('click', handleOpenModal);
  container.appendChild(openButton);
  
  if (autoOpen) {
    requestAnimationFrame(() => {
      handleOpenModal();
    });
  }
  
  return container;
}

/**
 * SizeSmall
 * Modal con tamaño small
 */
export const SizeSmall: Story = {
  name: 'Size - Small',
  args: {
    title: 'Modal Small',
    size: 'sm',
    fullScreen: false,
    bodyContent: '<p>Modal con tamaño small (320px).</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con tamaño small (320px).',
      },
    },
  },
};

/**
 * SizeMedium
 * Modal con tamaño medium (default)
 */
export const SizeMedium: Story = {
  name: 'Size - Medium (Default)',
  args: {
    title: 'Modal Medium',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Modal con tamaño medium (480px, valor por defecto).</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con tamaño medium (480px, valor por defecto).',
      },
    },
  },
};

/**
 * SizeLarge
 * Modal con tamaño large
 */
export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    title: 'Modal Large',
    size: 'lg',
    fullScreen: false,
    bodyContent: '<p>Modal con tamaño large (640px).</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con tamaño large (640px).',
      },
    },
  },
};

/**
 * SizeXLarge
 * Modal con tamaño xlarge
 */
export const SizeXLarge: Story = {
  name: 'Size - XLarge',
  args: {
    title: 'Modal XLarge',
    size: 'xl',
    fullScreen: false,
    bodyContent: '<p>Modal con tamaño xlarge (800px).</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con tamaño xlarge (800px).',
      },
    },
  },
};

/**
 * SizeFull
 * Modal con tamaño full
 */
export const SizeFull: Story = {
  name: 'Size - Full',
  args: {
    title: 'Modal Full',
    size: 'full',
    fullScreen: false,
    bodyContent: '<p>Modal con tamaño full (1280px).</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con tamaño full (1280px).',
      },
    },
  },
};

/**
 * FullScreen
 * Modal en modo full-screen
 */
export const FullScreen: Story = {
  name: 'Full Screen',
  args: {
    title: 'Modal Full Screen',
    size: 'md',
    fullScreen: true,
    bodyContent: '<p>Modal en modo full-screen que ocupa toda la altura disponible.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal en modo full-screen que ocupa toda la altura disponible.',
      },
    },
  },
};

/**
 * WithFooterButtons
 * Modal con todos los botones del footer
 */
export const WithFooterButtons: Story = {
  name: 'With Footer Buttons',
  args: {
    title: 'Eliminar elemento',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>¿Estás seguro de que deseas eliminar este elemento?</p>',
    footerButtons: {
      tertiary: { label: 'Eliminar' },
      secondary: { label: 'Cancelar' },
      primary: { label: 'Confirmar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con todos los botones del footer (tertiary, secondary, primary).',
      },
    },
  },
};

/**
 * FooterTertiaryOnly
 * Modal solo con botón terciario
 */
export const FooterTertiaryOnly: Story = {
  name: 'Footer - Tertiary Only',
  args: {
    title: 'Eliminar',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Contenido del modal</p>',
    footerButtons: {
      tertiary: { label: 'Eliminar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal solo con botón terciario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryOnly
 * Modal solo con botón secundario
 */
export const FooterSecondaryOnly: Story = {
  name: 'Footer - Secondary Only',
  args: {
    title: 'Información',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Contenido del modal</p>',
    footerButtons: {
      secondary: { label: 'Cerrar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal solo con botón secundario en el footer.',
      },
    },
  },
};

/**
 * FooterPrimaryOnly
 * Modal solo con botón primario
 */
export const FooterPrimaryOnly: Story = {
  name: 'Footer - Primary Only',
  args: {
    title: 'Confirmar',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Contenido del modal</p>',
    footerButtons: {
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal solo con botón primario en el footer.',
      },
    },
  },
};

/**
 * FooterSecondaryAndPrimary
 * Modal con botones secundario y primario
 */
export const FooterSecondaryAndPrimary: Story = {
  name: 'Footer - Secondary and Primary',
  args: {
    title: 'Guardar cambios',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Contenido del modal</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Guardar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con botones secundario y primario en el footer.',
      },
    },
  },
};

/**
 * WithoutFooterButtons
 * Modal sin botones del footer
 */
export const WithoutFooterButtons: Story = {
  name: 'Without Footer Buttons',
  args: {
    title: 'Vista previa',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Modal sin botones en el footer. Usa el botón X para cerrar.</p>',
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal sin botones en el footer.',
      },
    },
  },
};

/**
 * CloseOnOverlayClick
 * Modal que se cierra al hacer clic en el overlay
 */
export const CloseOnOverlayClick: Story = {
  name: 'Close On Overlay Click',
  args: {
    title: 'Modal con cierre en overlay',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Haz clic fuera del modal para cerrarlo.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal que se cierra al hacer clic en el overlay (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoCloseOnOverlayClick
 * Modal que NO se cierra al hacer clic en el overlay
 */
export const NoCloseOnOverlayClick: Story = {
  name: 'No Close On Overlay Click',
  args: {
    title: 'Modal sin cierre en overlay',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Este modal NO se cierra al hacer clic fuera. Debes usar el botón X o los botones del footer.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: false
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal que NO se cierra al hacer clic en el overlay. Solo se cierra con el botón X o los botones del footer.',
      },
    },
  },
};

/**
 * OpenInitially
 * Modal abierto inicialmente
 */
export const OpenInitially: Story = {
  name: 'Open Initially',
  args: {
    title: 'Modal abierto',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Este modal se abre automáticamente al cargar.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true,
    open: true
  },
  render: (args) => renderModalStory(args, true),
  parameters: {
    docs: {
      description: {
        story: 'Modal que se abre automáticamente al cargar.',
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
    title: 'Modal con callback',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Al cerrar este modal se ejecutará un callback.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => {
    const options: Partial<ModalOptions> = {
      ...args,
      onClose: () => {
        alert('Modal cerrado - callback ejecutado');
        console.log('Modal closed');
      }
    };
    return renderModalStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * FooterButtonCallbacks
 * Modal con callbacks en los botones del footer
 */
export const FooterButtonCallbacks: Story = {
  name: 'Footer Button Callbacks',
  args: {
    title: 'Modal con callbacks',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Los botones del footer tienen callbacks personalizados.</p>',
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
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con callbacks personalizados en los botones del footer.',
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
    size: 'md',
    fullScreen: false,
    bodyContent: '<div><h3>Contenido HTML</h3><p>Este contenido es un string HTML simple.</p></div>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con body content definido como string HTML.',
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
    size: 'md',
    fullScreen: false,
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
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con body content definido como función que retorna HTML.',
      },
    },
  },
};

/**
 * LongContent
 * Modal con contenido largo (scrollable)
 */
export const LongContent: Story = {
  name: 'Long Content',
  args: {
    title: 'Contenido largo',
    size: 'md',
    fullScreen: false,
    bodyContent: `
      <div>
        ${Array.from({ length: 50 }, (_, i) => `
          <p style="margin-bottom: 16px; padding: 12px; background: var(--modifiers-normal-color-light-bg-2); border-radius: 4px;">
            Párrafo ${i + 1}: Este es un contenido largo para demostrar el scroll del modal.
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
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con contenido largo que activa el scroll del body.',
      },
    },
  },
};

/**
 * ShortContent
 * Modal con contenido corto
 */
export const ShortContent: Story = {
  name: 'Short Content',
  args: {
    title: 'Contenido corto',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Este es un contenido corto que no requiere scroll.</p>',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con contenido corto que no requiere scroll.',
      },
    },
  },
};

/**
 * EmptyContent
 * Modal sin contenido (placeholder)
 */
export const EmptyContent: Story = {
  name: 'Empty Content',
  args: {
    title: 'Modal vacío',
    size: 'md',
    fullScreen: false,
    bodyContent: '',
    footerButtons: {
      secondary: { label: 'Cancelar' },
      primary: { label: 'Aceptar' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal sin contenido, muestra el placeholder por defecto.',
      },
    },
  },
};

/**
 * FormContent
 * Modal con formulario en el body
 */
export const FormContent: Story = {
  name: 'Form Content',
  args: {
    title: 'Crear usuario',
    size: 'md',
    fullScreen: false,
    bodyContent: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Nombre</label>
          <input type="text" placeholder="Ingresa el nombre" style="width: 100%; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
        </div>
        <div>
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--modifiers-normal-color-light-fg-1-medium); margin-bottom: 8px;">Email</label>
          <input type="email" placeholder="Ingresa el email" style="width: 100%; padding: 10px 12px; border: 1px solid var(--modifiers-normal-color-light-border-1); border-radius: 8px; font-family: var(--font-family-noto-sans-font-family); font-size: var(--modifiers-normal-body-sm-regular-fontsize); box-sizing: border-box;">
        </div>
        <div>
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
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal con un formulario completo en el body.',
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
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Contenido inicial del modal</p>',
    footerButtons: {
      primary: { label: 'Actualizar contenido' }
    },
    closeOnOverlayClick: true
  },
  render: (args) => {
    const container = renderModalStory(args);
    let modalInstance: ReturnType<typeof createModal> | null = null;
    
    const openButton = container.querySelector('button');
    if (openButton) {
      const originalHandler = openButton.onclick;
      openButton.onclick = () => {
        if (!modalInstance) {
          modalInstance = createModal({
            title: args.title || 'Actualizar contenido',
            size: args.size || 'md',
            fullScreen: args.fullScreen || false,
            bodyContent: args.bodyContent || '<p>Contenido inicial</p>',
            footerButtons: {
              primary: {
                label: 'Actualizar contenido',
                onClick: () => {
                  if (modalInstance) {
                    modalInstance.updateContent('<p>Contenido actualizado exitosamente!</p>');
                  }
                }
              }
            },
            onClose: () => {
              modalInstance = null;
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
        story: 'Modal que demuestra el método updateContent() para actualizar el contenido del body.',
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
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Usa los botones de control para abrir y cerrar el modal</p>',
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
    
    let modalInstance: ReturnType<typeof createModal> | null = null;
    
    const openBtn = document.createElement('button');
    openBtn.className = 'ubits-button ubits-button--primary ubits-button--md';
    openBtn.innerHTML = '<span>Abrir Modal</span>';
    openBtn.onclick = () => {
      if (!modalInstance) {
        modalInstance = createModal({
          title: args.title || 'Métodos open/close',
          size: args.size || 'md',
          fullScreen: args.fullScreen || false,
          bodyContent: args.bodyContent || '<p>Usa los botones de control.</p>',
          footerButtons: args.footerButtons,
          onClose: () => {
            modalInstance = null;
          }
        });
      }
      modalInstance.open();
    };
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ubits-button ubits-button--secondary ubits-button--md';
    closeBtn.innerHTML = '<span>Cerrar Modal</span>';
    closeBtn.onclick = () => {
      if (modalInstance) {
        modalInstance.close();
      }
    };
    
    container.appendChild(openBtn);
    container.appendChild(closeBtn);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal que demuestra los métodos open() y close() programáticamente.',
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
    title: 'Modal mínimo',
    size: 'md',
    fullScreen: false,
    bodyContent: '<p>Este es un modal mínimo con solo título y contenido básico.</p>',
    closeOnOverlayClick: true
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal mínimo con solo título y contenido básico.',
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
    title: 'Modal completo',
    size: 'md',
    fullScreen: false,
    bodyContent: `
      <div>
        <h3>Contenido completo</h3>
        <p>Este modal incluye:</p>
        <ul style="padding-left: 20px;">
          <li>Título</li>
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
    onClose: () => console.log('Modal closed')
  },
  render: (args) => renderModalStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Modal completo con todas las opciones: título, contenido, botones del footer con callbacks, y callback onClose.',
      },
    },
  },
};

