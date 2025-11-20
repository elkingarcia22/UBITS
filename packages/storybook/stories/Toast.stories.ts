import type { Meta, StoryObj } from '@storybook/html';
import { renderToast, showToast } from '../../addons/toast/src/ToastProvider';
import type { ToastOptions } from '../../addons/toast/src/types/ToastOptions';

const meta: Meta<ToastOptions> = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Toast UBITS para mostrar notificaciones flotantes. Se posiciona en la parte superior central, tiene auto-cierre, pausa en hover, apilado máximo de 3, y soporta título, cuerpo y botón de acción opcional.',
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
    container.style.cssText = `
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 16px;
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
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    // Botones para mostrar toast
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '12px';
    controls.style.flexWrap = 'wrap';
    controls.style.marginBottom = '24px';
    
    const showButton = document.createElement('button');
    showButton.textContent = 'Mostrar Toast';
    showButton.style.cssText = `
      padding: 10px 20px;
      background: var(--ubits-button-bg-primary);
      color: var(--ubits-button-fg-primary);
      border: 1px solid var(--ubits-button-border-primary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    `;
    
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpiar Toasts';
    clearButton.style.cssText = `
      padding: 10px 20px;
      background: var(--ubits-button-bg-secondary);
      color: var(--ubits-button-fg-secondary);
      border: 1px solid var(--ubits-button-border-secondary);
      border-radius: 6px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 14px;
      font-weight: 600;
    `;
    
    showButton.addEventListener('click', () => {
      console.log('🔔 Botón Mostrar Toast clickeado');
      clearToasts(); // Limpiar toasts anteriores
      setTimeout(() => {
        try {
          // Asegurar que el contenedor existe antes de mostrar el toast
          const container = ensureToastContainer();
          console.log('✅ Contenedor de toast:', container);
          
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
          
          console.log('📝 Opciones del toast:', toastOptions);
          console.log('📝 Tipo:', args.type);
          console.log('📝 Mensaje:', args.message);
          
          const toastType = args.type || 'info';
          const toastElement = showToast(toastType, args.message || '', toastOptions);
          console.log('✅ Toast creado:', toastElement);
          
          // Verificar que el toast se agregó al DOM
          setTimeout(() => {
            const toastsInContainer = container.querySelectorAll('.ubits-toast');
            console.log('📊 Toasts en contenedor:', toastsInContainer.length);
            if (toastsInContainer.length === 0) {
              console.error('❌ El toast no se agregó al contenedor');
              alert('Error: El toast no se mostró. Revisa la consola para más detalles.');
            }
          }, 100);
        } catch (error) {
          console.error('❌ Error al mostrar toast:', error);
          alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
      }, 200);
    });
    
    clearButton.addEventListener('click', () => {
      clearToasts();
    });
    
    controls.appendChild(showButton);
    controls.appendChild(clearButton);
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
    info.style.background = 'var(--ubits-bg-2, #f9fafb)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--ubits-fg-1-medium, #5c646f)';
    info.style.border = '1px solid var(--ubits-border-1)';
    info.style.lineHeight = '1.6';
    info.innerHTML = `
      <strong>Tipo:</strong> ${args.type}<br>
      <strong>Título:</strong> ${args.title || '(sin título)'}<br>
      <strong>Cierre:</strong> ${args.noClose ? 'Sin botón' : 'Con botón'}<br>
      <strong>Duración:</strong> ${args.duration && args.duration > 0 ? `${args.duration}ms` : 'Persistente'}<br>
      <strong>Pausa en hover:</strong> ${args.pauseOnHover ? 'Sí' : 'No'}<br>
      <strong>Botón de acción:</strong> ${(args as any).action ? 'Sí' : 'No'}<br>
      <br>
      <em>Haz clic en "Mostrar Toast" para ver el toast funcional en la parte superior central de la pantalla.</em>
    `;
    container.appendChild(info);
    
    return container;
  },
};

