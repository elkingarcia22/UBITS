import type { Meta, StoryObj } from '@storybook/html';
import { renderToast, showToast } from '../../components/toast/src/ToastProvider';
import type { ToastOptions } from '../../components/toast/src/types/ToastOptions';
import { createButton } from '../../components/button/src/ButtonProvider';
import type { ButtonOptions } from '../../components/button/src/types/ButtonOptions';
import '../../components/toast/src/styles/toast.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<ToastOptions> = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tipo de toast',
      table: {
        defaultValue: { summary: 'info' },
        type: { summary: 'success | info | warning | error' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título del toast (opcional, se muestra arriba alineado con el botón X)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Mensaje del toast (cuerpo)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duración en milisegundos antes de auto-cerrar (0 = persistente). Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)',
      table: {
        defaultValue: { summary: '3500 (success/info), 5000 (warning), 6500 (error)' },
        type: { summary: 'number' },
      },
    },
    noClose: {
      control: { type: 'boolean' },
      description: 'Si el toast NO tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    pauseOnHover: {
      control: { type: 'boolean' },
      description: 'Si el timer se pausa cuando el usuario hace hover o focus',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    action: {
      control: { type: 'boolean' },
      description: 'Si el toast tiene botón de acción',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastOptions & { action?: boolean }>;

// Función helper para asegurar que el contenedor existe
function ensureToastContainer(): HTMLElement {
  const containerId = 'ubits-toast-container';
  let container = document.getElementById(containerId);
  
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = '
      position: fixed;
      top: var(--p-spacing-mode-1-lg, 16px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--p-spacing-mode-1-md, 12px);
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 var(--p-spacing-mode-1-lg, 16px);
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  return container;
}

// Función helper para limpiar toasts anteriores
function clearToasts(): void {
  const container = ensureToastContainer();
  const toasts = container.querySelectorAll('.ubits-toast');
  toasts.forEach(toast => {
    const element = toast as HTMLElement;
    element.classList.add('ubits-toast--exit');
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 180);
  });
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'success',
    title: 'Operación completada',
    message: 'Los cambios se han guardado correctamente. Este ejemplo de texto es más largo para demostrar cómo funciona el espaciado y el botón de acción debajo del texto.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
    action: undefined,
  } as ToastOptions & { action?: boolean },
  render: (args) => {
    // Asegurar que el contenedor existe
    ensureToastContainer();
    
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    // Botones para mostrar toast
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = 'var(--p-spacing-mode-1-md, 12px)';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    
    // Crear botón "Mostrar Toast" usando componente UBITS
    const showButtonOptions: ButtonOptions = {
      variant: 'primary',
      size: 'md',
      text: 'Mostrar Toast',
      onClick: () => {
        clearToasts(); // Limpiar toasts anteriores
        setTimeout(() => {
          try {
            // Asegurar que el contenedor existe antes de mostrar el toast
            const container = ensureToastContainer();
            
            const toastOptions: Omit<ToastOptions, 'type' | 'message'> = {
              title: args.title,
              duration: args.duration,
              noClose: args.noClose,
              pauseOnHover: args.pauseOnHover,
            };
            
            // Agregar botón de acción si está activado
            if ((args as any).action) {
              toastOptions.action = {
                label: 'Action',
                onClick: () => {
                  alert('Acción ejecutada desde Storybook');
                }
              };
            }
            
            const toastType = args.type || 'info';
            showToast(toastType, args.message || '', toastOptions);
            
            // Verificar que el toast se agregó al DOM
            setTimeout(() => {
              const toastsInContainer = container.querySelectorAll('.ubits-toast');
              if (toastsInContainer.length === 0) {
                console.error('❌ El toast no se agregó al contenedor');
                alert('Error: El toast no se mostró. Revisa la consola para más detalles.');
              }
            }, 100);
          } catch (error) {
            console.error('❌ Error al mostrar toast:', error);
            alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}');
          }
        }, 200);
      }
    };
    
    // Crear botón "Limpiar Toasts" usando componente UBITS
    const clearButtonOptions: ButtonOptions = {
      variant: 'secondary',
      size: 'md',
      text: 'Limpiar Toasts',
      onClick: () => {
        clearToasts();
      }
    };
    
    // Usar requestAnimationFrame para crear los botones de forma asíncrona
    requestAnimationFrame(() => {
      try {
        const showButton = createButton(showButtonOptions);
        // appendChild automáticamente remueve el elemento de su padre anterior si tiene uno
        controls.appendChild(showButton);
        
        const clearButton = createButton(clearButtonOptions);
        // appendChild automáticamente remueve el elemento de su padre anterior si tiene uno
        controls.appendChild(clearButton);
      } catch (error) {
        console.error('❌ Error creando botones:', error);
        // Fallback: crear botones HTML simples si createButton falla
        const showButtonFallback = document.createElement('button');
        showButtonFallback.className = 'ubits-button ubits-button--primary ubits-button--md';
        showButtonFallback.textContent = 'Mostrar Toast';
        showButtonFallback.addEventListener('click', showButtonOptions.onClick as EventListener);
        controls.appendChild(showButtonFallback);
        
        const clearButtonFallback = document.createElement('button');
        clearButtonFallback.className = 'ubits-button ubits-button--secondary ubits-button--md';
        clearButtonFallback.textContent = 'Limpiar Toasts';
        clearButtonFallback.addEventListener('click', clearButtonOptions.onClick as EventListener);
        controls.appendChild(clearButtonFallback);
      }
    });
    container.appendChild(controls);
    
    // Preview estático del toast (solo para visualización, no funcional)
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    const toastHTML = renderToast({
      type: args.type || 'info',
      title: args.title,
      message: args.message,
      noClose: args.noClose,
      action: (args as any).action ? {
        label: 'Action',
        onClick: () => {}
      } : undefined,
    });
    
    preview.innerHTML = toastHTML;
    
    // Estilos para el preview estático
    const toastElement = preview.querySelector('.ubits-toast') as HTMLElement;
    if (toastElement) {
      toastElement.style.position = 'relative';
      toastElement.style.width = '100%';
      toastElement.style.maxWidth = '560px';
      
      // Agregar event listener al botón cerrar si existe
      const closeButton = toastElement.querySelector('.ubits-toast__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          toastElement.classList.add('ubits-toast--exit');
          setTimeout(() => {
            if (toastElement.parentNode) {
              toastElement.parentNode.removeChild(toastElement);
            }
          }, 180);
        });
      }
      
      // Agregar event listener al botón de acción si existe
      const actionButton = toastElement.querySelector('[data-toast-action]');
      if (actionButton && (args as any).action) {
        actionButton.addEventListener('click', () => {
          alert('Acción ejecutada desde preview estático');
        });
      }
    }
    
    container.appendChild(preview);
    
    // Agregar información adicional sobre el toast
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    info.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    info.style.lineHeight = '1.6';
    info.style.fontFamily = 'var(--font-family-noto-sans-font-family, "Noto Sans", sans-serif)';
    info.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Toast</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tipo:</strong> ${args.type}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Título:</strong> ${args.title || '(sin título)'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Cierre:</strong> ${args.noClose ? 'Sin botón' : 'Con botón'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Duración:</strong> ${args.duration && args.duration > 0 ? `${args.duration}ms` : 'Persistente'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Pausa en hover:</strong> ${args.pauseOnHover ? 'Sí' : 'No'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Botón de acción:</strong> ${(args as any).action ? 'Sí' : 'No'}</div>
      </div>
      <p style="margin-top: 12px; margin-bottom: 0; font-size: 13px; font-style: italic; color: var(--modifiers-normal-color-light-fg-1-medium);">Haz clic en "Mostrar Toast" para ver el toast funcional en la parte superior central de la pantalla.</p>
    `;
    container.appendChild(info);
    
    return container;
  },
};

// Helper para renderizar Toast de manera consistente
function renderToastStory(options: Partial<ToastOptions>, autoShow: boolean = false) {
  ensureToastContainer();
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  container.style.width = '100%';
  container.style.maxWidth = '800px';
  
  const controls = document.createElement('div');
  controls.style.display = 'flex';
  controls.style.gap = 'var(--p-spacing-mode-1-md, 12px)';
  controls.style.flexWrap = 'wrap';
  controls.style.marginBottom = '24px';
  
  const showButtonOptions: ButtonOptions = {
    variant: 'primary',
    size: 'md',
    text: 'Mostrar Toast',
    onClick: () => {
      clearToasts();
      setTimeout(() => {
        const toastOptions: Omit<ToastOptions, 'type' | 'message'> = {
          title: options.title,
          duration: options.duration,
          noClose: options.noClose,
          pauseOnHover: options.pauseOnHover,
          action: options.action,
          onClose: options.onClose,
        };
        
        const toastType = options.type || 'info';
        showToast(toastType, options.message || '', toastOptions);
      }, 200);
    }
  };
  
  const clearButtonOptions: ButtonOptions = {
    variant: 'secondary',
    size: 'md',
    text: 'Limpiar Toasts',
    onClick: () => {
      clearToasts();
    }
  };
  
  requestAnimationFrame(() => {
    try {
      const showButton = createButton(showButtonOptions);
      controls.appendChild(showButton);
      
      const clearButton = createButton(clearButtonOptions);
      controls.appendChild(clearButton);
    } catch (error) {
      console.error('❌ Error creando botones:', error);
      const showButtonFallback = document.createElement('button');
      showButtonFallback.className = 'ubits-button ubits-button--primary ubits-button--md';
      showButtonFallback.textContent = 'Mostrar Toast';
      showButtonFallback.addEventListener('click', showButtonOptions.onClick as EventListener);
      controls.appendChild(showButtonFallback);
      
      const clearButtonFallback = document.createElement('button');
      clearButtonFallback.className = 'ubits-button ubits-button--secondary ubits-button--md';
      clearButtonFallback.textContent = 'Limpiar Toasts';
      clearButtonFallback.addEventListener('click', clearButtonOptions.onClick as EventListener);
      controls.appendChild(clearButtonFallback);
    }
  });
  
  container.appendChild(controls);
  
  // Preview estático
  const preview = document.createElement('div');
  preview.style.width = '100%';
  preview.style.marginBottom = '20px';
  preview.style.position = 'relative';
  
  const toastHTML = renderToast({
    type: options.type || 'info',
    title: options.title,
    message: options.message || 'Mensaje del toast',
    noClose: options.noClose,
    action: options.action,
  });
  
  preview.innerHTML = toastHTML;
  
  const toastElement = preview.querySelector('.ubits-toast') as HTMLElement;
  if (toastElement) {
    toastElement.style.position = 'relative';
    toastElement.style.width = '100%';
    toastElement.style.maxWidth = '560px';
  }
  
  container.appendChild(preview);
  
  if (autoShow) {
    setTimeout(() => {
      showButtonOptions.onClick?.({} as MouseEvent);
    }, 300);
  }
  
  return container;
}

/**
 * TypeSuccess
 * Toast de tipo success
 */
export const TypeSuccess: Story = {
  name: 'Type - Success',
  args: {
    type: 'success',
    title: 'Operación completada',
    message: 'Los cambios se han guardado correctamente.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast de tipo success con duración por defecto de 3500ms.',
      },
    },
  },
};

/**
 * TypeInfo
 * Toast de tipo info (default)
 */
export const TypeInfo: Story = {
  name: 'Type - Info (Default)',
  args: {
    type: 'info',
    title: 'Información',
    message: 'Esta es una notificación informativa.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast de tipo info (valor por defecto) con duración por defecto de 3500ms.',
      },
    },
  },
};

/**
 * TypeWarning
 * Toast de tipo warning
 */
export const TypeWarning: Story = {
  name: 'Type - Warning',
  args: {
    type: 'warning',
    title: 'Advertencia',
    message: 'Por favor, revisa los datos ingresados.',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast de tipo warning con duración por defecto de 5000ms.',
      },
    },
  },
};

/**
 * TypeError
 * Toast de tipo error
 */
export const TypeError: Story = {
  name: 'Type - Error',
  args: {
    type: 'error',
    title: 'Error',
    message: 'No se pudo completar la operación.',
    duration: 6500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast de tipo error con duración por defecto de 6500ms.',
      },
    },
  },
};

/**
 * WithTitle
 * Toast con título
 */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    type: 'info',
    title: 'Título del Toast',
    message: 'Este toast incluye un título en la parte superior.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con título visible en la parte superior.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Toast sin título
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    type: 'info',
    message: 'Este toast no tiene título, solo mensaje.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast sin título, solo mensaje.',
      },
    },
  },
};

/**
 * ShortMessage
 * Toast con mensaje corto
 */
export const ShortMessage: Story = {
  name: 'Short Message',
  args: {
    type: 'success',
    message: 'Guardado.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con mensaje corto.',
      },
    },
  },
};

/**
 * LongMessage
 * Toast con mensaje largo
 */
export const LongMessage: Story = {
  name: 'Long Message',
  args: {
    type: 'info',
    title: 'Notificación importante',
    message: 'Este es un mensaje largo que demuestra cómo el toast maneja contenido extenso. El texto se ajusta automáticamente y puede incluir múltiples líneas para mostrar información detallada al usuario.',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con mensaje largo que se ajusta automáticamente.',
      },
    },
  },
};

/**
 * WithAction
 * Toast con botón de acción
 */
export const WithAction: Story = {
  name: 'With Action',
  args: {
    type: 'info',
    title: 'Nueva actualización disponible',
    message: 'Hay una nueva versión disponible. ¿Deseas actualizar ahora?',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Actualizar',
      onClick: () => {
        alert('Actualización iniciada');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con botón de acción opcional.',
      },
    },
  },
};

/**
 * WithoutAction
 * Toast sin botón de acción
 */
export const WithoutAction: Story = {
  name: 'Without Action',
  args: {
    type: 'success',
    message: 'Operación completada exitosamente.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast sin botón de acción.',
      },
    },
  },
};

/**
 * DurationDefault
 * Toast con duración por defecto según tipo
 */
export const DurationDefault: Story = {
  name: 'Duration - Default',
  args: {
    type: 'success',
    message: 'Este toast usa la duración por defecto según su tipo (3500ms para success/info).',
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con duración por defecto según el tipo (success/info: 3500ms, warning: 5000ms, error: 6500ms).',
      },
    },
  },
};

/**
 * DurationCustom
 * Toast con duración personalizada
 */
export const DurationCustom: Story = {
  name: 'Duration - Custom',
  args: {
    type: 'info',
    message: 'Este toast tiene una duración personalizada de 10 segundos.',
    duration: 10000,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con duración personalizada de 10 segundos.',
      },
    },
  },
};

/**
 * DurationPersistent
 * Toast persistente (duration: 0)
 */
export const DurationPersistent: Story = {
  name: 'Duration - Persistent',
  args: {
    type: 'warning',
    title: 'Atención requerida',
    message: 'Este toast es persistente y no se cierra automáticamente. Debes cerrarlo manualmente.',
    duration: 0,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast persistente que no se cierra automáticamente (duration: 0).',
      },
    },
  },
};

/**
 * WithCloseButton
 * Toast con botón de cerrar (default)
 */
export const WithCloseButton: Story = {
  name: 'With Close Button',
  args: {
    type: 'info',
    message: 'Este toast tiene botón de cerrar (comportamiento por defecto).',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con botón de cerrar (comportamiento por defecto).',
      },
    },
  },
};

/**
 * WithoutCloseButton
 * Toast sin botón de cerrar
 */
export const WithoutCloseButton: Story = {
  name: 'Without Close Button',
  args: {
    type: 'info',
    message: 'Este toast NO tiene botón de cerrar. Se cerrará automáticamente.',
    duration: 5000,
    noClose: true,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast sin botón de cerrar (noClose: true).',
      },
    },
  },
};

/**
 * PauseOnHover
 * Toast con pausa en hover (default)
 */
export const PauseOnHover: Story = {
  name: 'Pause On Hover',
  args: {
    type: 'info',
    message: 'Pasa el mouse sobre este toast para pausar el timer (comportamiento por defecto).',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con pausa en hover (comportamiento por defecto).',
      },
    },
  },
};

/**
 * NoPauseOnHover
 * Toast sin pausa en hover
 */
export const NoPauseOnHover: Story = {
  name: 'No Pause On Hover',
  args: {
    type: 'info',
    message: 'Este toast NO pausa el timer al hacer hover (pauseOnHover: false).',
    duration: 5000,
    noClose: false,
    pauseOnHover: false,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast sin pausa en hover (pauseOnHover: false).',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Toast con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    type: 'success',
    message: 'Al cerrar este toast se ejecutará un callback.',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => {
    const options: Partial<ToastOptions> = {
      ...args,
      onClose: () => {
        alert('Toast cerrado - callback ejecutado');
        console.log('Toast closed');
      }
    };
    return renderToastStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast con callback onClose que se ejecuta cuando se cierra.',
      },
    },
  },
};

/**
 * ActionCallback
 * Toast con callback en botón de acción
 */
export const ActionCallback: Story = {
  name: 'Action Callback',
  args: {
    type: 'info',
    title: 'Confirmar acción',
    message: 'Haz clic en el botón de acción para ejecutar el callback.',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Ejecutar',
      onClick: () => {
        alert('Acción ejecutada desde callback');
        console.log('Action clicked');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast con callback en el botón de acción.',
      },
    },
  },
};

/**
 * MultipleToasts
 * Múltiples toasts apilados
 */
export const MultipleToasts: Story = {
  name: 'Multiple Toasts',
  args: {
    type: 'info',
    message: 'Mensaje del toast',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => {
    ensureToastContainer();
    
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = 'var(--p-spacing-mode-1-md, 12px)';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    
    const showMultipleButtonOptions: ButtonOptions = {
      variant: 'primary',
      size: 'md',
      text: 'Mostrar 3 Toasts',
      onClick: () => {
        clearToasts();
        setTimeout(() => {
          showToast('success', 'Primer toast - Success', { duration: 3500 });
          setTimeout(() => {
            showToast('info', 'Segundo toast - Info', { duration: 3500 });
            setTimeout(() => {
              showToast('warning', 'Tercer toast - Warning', { duration: 5000 });
            }, 200);
          }, 200);
        }, 200);
      }
    };
    
    const clearButtonOptions: ButtonOptions = {
      variant: 'secondary',
      size: 'md',
      text: 'Limpiar Toasts',
      onClick: () => {
        clearToasts();
      }
    };
    
    requestAnimationFrame(() => {
      try {
        const showButton = createButton(showMultipleButtonOptions);
        controls.appendChild(showButton);
        
        const clearButton = createButton(clearButtonOptions);
        controls.appendChild(clearButton);
      } catch (error) {
        console.error('❌ Error creando botones:', error);
      }
    });
    
    container.appendChild(controls);
    
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    info.innerHTML = '<p style="margin: 0;">Haz clic en "Mostrar 3 Toasts" para ver cómo se apilan los toasts (máximo 3 visibles).</p>';
    container.appendChild(info);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples toasts apilados (máximo 3 visibles).',
      },
    },
  },
};

/**
 * Stacking
 * Demostrar apilado de toasts
 */
export const Stacking: Story = {
  name: 'Stacking',
  args: {
    type: 'info',
    message: 'Mensaje del toast',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => {
    ensureToastContainer();
    
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = 'var(--p-spacing-mode-1-md, 12px)';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    
    const addToastButtonOptions: ButtonOptions = {
      variant: 'primary',
      size: 'md',
      text: 'Agregar Toast',
      onClick: () => {
        const types: Array<'success' | 'info' | 'warning' | 'error'> = ['success', 'info', 'warning', 'error'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        showToast(randomType, `Toast ${Date.now()}`, { duration: 5000 });
      }
    };
    
    const clearButtonOptions: ButtonOptions = {
      variant: 'secondary',
      size: 'md',
      text: 'Limpiar Toasts',
      onClick: () => {
        clearToasts();
      }
    };
    
    requestAnimationFrame(() => {
      try {
        const addButton = createButton(addToastButtonOptions);
        controls.appendChild(addButton);
        
        const clearButton = createButton(clearButtonOptions);
        controls.appendChild(clearButton);
      } catch (error) {
        console.error('❌ Error creando botones:', error);
      }
    });
    
    container.appendChild(controls);
    
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    info.innerHTML = '<p style="margin: 0;">Haz clic en "Agregar Toast" varias veces para ver cómo se apilan. El máximo es 3 toasts visibles.</p>';
    container.appendChild(info);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demostrar el apilado de toasts (máximo 3 visibles).',
      },
    },
  },
};

/**
 * SuccessWithAction
 * Toast success con acción
 */
export const SuccessWithAction: Story = {
  name: 'Success With Action',
  args: {
    type: 'success',
    title: 'Archivo guardado',
    message: 'El archivo se ha guardado correctamente. ¿Deseas abrirlo?',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Abrir',
      onClick: () => {
        alert('Abriendo archivo...');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast success con botón de acción.',
      },
    },
  },
};

/**
 * ErrorWithAction
 * Toast error con acción
 */
export const ErrorWithAction: Story = {
  name: 'Error With Action',
  args: {
    type: 'error',
    title: 'Error al guardar',
    message: 'No se pudo guardar el archivo. ¿Deseas intentar nuevamente?',
    duration: 6500,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Reintentar',
      onClick: () => {
        alert('Reintentando guardar...');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast error con botón de acción.',
      },
    },
  },
};

/**
 * WarningWithAction
 * Toast warning con acción
 */
export const WarningWithAction: Story = {
  name: 'Warning With Action',
  args: {
    type: 'warning',
    title: 'Cambios sin guardar',
    message: 'Tienes cambios sin guardar. ¿Deseas guardarlos ahora?',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Guardar',
      onClick: () => {
        alert('Guardando cambios...');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast warning con botón de acción.',
      },
    },
  },
};

/**
 * InfoWithAction
 * Toast info con acción
 */
export const InfoWithAction: Story = {
  name: 'Info With Action',
  args: {
    type: 'info',
    title: 'Nueva versión disponible',
    message: 'Hay una nueva versión disponible. ¿Deseas actualizar ahora?',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Actualizar',
      onClick: () => {
        alert('Iniciando actualización...');
      }
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast info con botón de acción.',
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
    type: 'success',
    title: 'Operación completada',
    message: 'Los cambios se han guardado correctamente. Este es un ejemplo completo con todas las opciones disponibles.',
    duration: 5000,
    noClose: false,
    pauseOnHover: true,
    action: {
      label: 'Ver detalles',
      onClick: () => {
        console.log('Ver detalles clickeado');
      }
    },
    onClose: () => {
      console.log('Toast cerrado');
    }
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast completo con todas las opciones: tipo, título, mensaje, duración, botón de cerrar, pausa en hover, botón de acción y callback onClose.',
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
    type: 'info',
    message: 'Mensaje mínimo',
    duration: 3500,
    noClose: false,
    pauseOnHover: true,
  },
  render: (args) => renderToastStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Toast mínimo con solo mensaje y configuración básica.',
      },
    },
  },
};

