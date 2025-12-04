import type { Meta, StoryObj } from '@storybook/html';
import { renderAlert, createAlert } from '../../components/alert/src/AlertProvider';
import type { AlertOptions } from '../../components/alert/src/types/AlertOptions';
import '../../components/alert/src/styles/alert.css';

const meta: Meta<AlertOptions> = {
  title: 'Feedback/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Alert UBITS para mostrar notificaciones del sistema. Soporta múltiples variantes (success, info, warning, error), botón cerrar opcional y animaciones.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tipo de alert',
      table: {
        defaultValue: { summary: 'success' },
        type: { summary: 'success | info | warning | error' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Mensaje del alert (puede incluir HTML básico)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Si el alert tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duración en milisegundos antes de auto-cerrar (0 = no auto-close)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.marginBottom = '20px';
    
    // Generar el HTML del alert
    const alertHTML = renderAlert(args);
    preview.innerHTML = alertHTML;
    
    // Agregar funcionalidad al botón cerrar si existe
    const alertElement = preview.querySelector('.ubits-alert');
    if (alertElement && args.closable) {
      const closeButton = alertElement.querySelector('.ubits-alert__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          // Agregar animación de cierre
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        });
      }
    }
    
    // Configurar auto-close si duration > 0
    if (args.duration && args.duration > 0 && alertElement) {
      setTimeout(() => {
        const closeBtn = alertElement.querySelector('.ubits-alert__close') as HTMLButtonElement;
        if (closeBtn) {
          closeBtn.click();
        } else {
          // Si no hay botón cerrar, simplemente remover con animación
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        }
      }, args.duration);
    }
    
    container.appendChild(preview);
    
    // Agregar información adicional sobre el alert
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    info.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    info.innerHTML = `
      <strong>Tipo:</strong> ${args.type}<br>
      <strong>Cierre:</strong> ${args.closable ? 'Con botón' : 'Sin botón'}<br>
      ${args.duration > 0 ? `<strong>Auto-cierre:</strong> ${args.duration}ms` : ''}
    `;
    container.appendChild(info);
    
    return container;
  },
};

// Helper para renderizar Alert de manera consistente
function renderAlertStory(options: AlertOptions, showInfo: boolean = false) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  container.style.width = '100%';
  container.style.maxWidth = '800px';
  
  const preview = document.createElement('div');
  preview.style.width = '100%';
  preview.style.marginBottom = showInfo ? '20px' : '0';
  
  try {
    const alertElement = createAlert(options);
    preview.appendChild(alertElement);
  } catch (error) {
    console.error('Error al crear alert:', error);
    preview.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-accent-error); padding: 16px;">Error: ${error instanceof Error ? error.message : 'Error desconocido'}</div>`;
  }
  
  container.appendChild(preview);
  
  if (showInfo) {
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    info.style.borderRadius = '8px';
    info.style.fontSize = '14px';
    info.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    info.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    info.innerHTML = `
      <strong>Tipo:</strong> ${options.type || 'success'}<br>
      <strong>Cierre:</strong> ${options.closable !== false ? 'Con botón' : 'Sin botón'}<br>
      ${options.duration && options.duration > 0 ? `<strong>Auto-cierre:</strong> ${options.duration}ms` : ''}
    `;
    container.appendChild(info);
  }
  
  return container;
}

/**
 * TypeSuccess
 * Alert tipo success
 */
export const TypeSuccess: Story = {
  name: 'Type - Success',
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert tipo success (verde).',
      },
    },
  },
};

/**
 * TypeInfo
 * Alert tipo info
 */
export const TypeInfo: Story = {
  name: 'Type - Info',
  args: {
    type: 'info',
    message: 'Esta es una notificación informativa.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert tipo info (azul).',
      },
    },
  },
};

/**
 * TypeWarning
 * Alert tipo warning
 */
export const TypeWarning: Story = {
  name: 'Type - Warning',
  args: {
    type: 'warning',
    message: 'Por favor, revisa los datos ingresados antes de continuar.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert tipo warning (naranja).',
      },
    },
  },
};

/**
 * TypeError
 * Alert tipo error
 */
export const TypeError: Story = {
  name: 'Type - Error',
  args: {
    type: 'error',
    message: 'Ha ocurrido un error al procesar tu solicitud.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert tipo error (rojo).',
      },
    },
  },
};

/**
 * WithCloseButton
 * Alert con botón de cerrar
 */
export const WithCloseButton: Story = {
  name: 'With Close Button',
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con botón de cerrar.',
      },
    },
  },
};

/**
 * WithoutCloseButton
 * Alert sin botón de cerrar
 */
export const WithoutCloseButton: Story = {
  name: 'Without Close Button',
  args: {
    type: 'info',
    message: 'Esta notificación no se puede cerrar manualmente.',
    closable: false,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert sin botón de cerrar.',
      },
    },
  },
};

/**
 * AutoClose
 * Alert con auto-cierre
 */
export const AutoClose: Story = {
  name: 'Auto Close',
  args: {
    type: 'success',
    message: 'Este alert se cerrará automáticamente en 3 segundos.',
    closable: true,
    duration: 3000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con auto-cierre en 3 segundos.',
      },
    },
  },
};

/**
 * AutoCloseFast
 * Alert con auto-cierre rápido
 */
export const AutoCloseFast: Story = {
  name: 'Auto Close - Fast',
  args: {
    type: 'info',
    message: 'Este alert se cerrará automáticamente en 1 segundo.',
    closable: true,
    duration: 1000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con auto-cierre rápido (1 segundo).',
      },
    },
  },
};

/**
 * AutoCloseSlow
 * Alert con auto-cierre lento
 */
export const AutoCloseSlow: Story = {
  name: 'Auto Close - Slow',
  args: {
    type: 'success',
    message: 'Este alert se cerrará automáticamente en 10 segundos.',
    closable: true,
    duration: 10000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con auto-cierre lento (10 segundos).',
      },
    },
  },
};

/**
 * OnCloseCallback
 * Alert con callback onClose
 */
export const OnCloseCallback: Story = {
  name: 'OnClose Callback',
  args: {
    type: 'success',
    message: 'Haz clic en cerrar para ver el callback en acción.',
    closable: true,
    duration: 0
  },
  render: (args) => {
    const options: AlertOptions = {
      ...args,
      onClose: () => {
        alert('Callback onClose ejecutado');
        console.log('Alert cerrado');
      }
    };
    return renderAlertStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert con callback onClose. Muestra un alert cuando se cierra.',
      },
    },
  },
};

/**
 * LongMessage
 * Alert con mensaje largo
 */
export const LongMessage: Story = {
  name: 'Long Message',
  args: {
    type: 'info',
    message: 'Este es un mensaje muy largo que debería truncarse correctamente en el alert para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional. El texto debe ajustarse adecuadamente.',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con mensaje largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * HTMLMessage
 * Alert con mensaje HTML
 */
export const HTMLMessage: Story = {
  name: 'HTML Message',
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente. <strong>Puedes continuar trabajando.</strong>',
    closable: true,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert con mensaje que incluye HTML básico.',
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
    type: 'success',
    message: 'Operación completada.',
    closable: false,
    duration: 0
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert mínimo con solo mensaje, sin botón de cerrar.',
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
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0
  },
  render: (args) => {
    const options: AlertOptions = {
      ...args,
      onClose: () => {
        console.log('Alert cerrado');
      }
    };
    return renderAlertStory(options, true);
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert completo con todas las opciones: tipo, mensaje, botón cerrar y callback.',
      },
    },
  },
};

/**
 * AllTypes
 * Múltiples alerts mostrando todos los tipos
 */
export const AllTypes: Story = {
  name: 'All Types',
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    
    const types: Array<'success' | 'info' | 'warning' | 'error'> = ['success', 'info', 'warning', 'error'];
    const messages = [
      'Los cambios se han guardado correctamente.',
      'Esta es una notificación informativa.',
      'Por favor, revisa los datos ingresados antes de continuar.',
      'Ha ocurrido un error al procesar tu solicitud.'
    ];
    
    types.forEach((type, index) => {
      const alertElement = createAlert({
        type: type,
        message: messages[index],
        closable: true,
        duration: 0
      });
      container.appendChild(alertElement);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples alerts mostrando todos los tipos (success, info, warning, error).',
      },
    },
  },
};

/**
 * MultipleAlerts
 * Múltiples alerts apilados
 */
export const MultipleAlerts: Story = {
  name: 'Multiple Alerts',
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    
    const alerts: AlertOptions[] = [
      { type: 'success', message: 'Primer alert de éxito.', closable: true },
      { type: 'info', message: 'Segundo alert informativo.', closable: true },
      { type: 'warning', message: 'Tercer alert de advertencia.', closable: true }
    ];
    
    alerts.forEach(options => {
      const alertElement = createAlert(options);
      container.appendChild(alertElement);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples alerts apilados verticalmente.',
      },
    },
  },
};

/**
 * SuccessAutoClose
 * Alert success con auto-cierre
 */
export const SuccessAutoClose: Story = {
  name: 'Success - Auto Close',
  args: {
    type: 'success',
    message: 'Operación completada exitosamente. Este alert se cerrará automáticamente.',
    closable: true,
    duration: 3000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert success con auto-cierre en 3 segundos.',
      },
    },
  },
};

/**
 * InfoAutoClose
 * Alert info con auto-cierre
 */
export const InfoAutoClose: Story = {
  name: 'Info - Auto Close',
  args: {
    type: 'info',
    message: 'Información importante. Este alert se cerrará automáticamente.',
    closable: true,
    duration: 3000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert info con auto-cierre en 3 segundos.',
      },
    },
  },
};

/**
 * WarningAutoClose
 * Alert warning con auto-cierre
 */
export const WarningAutoClose: Story = {
  name: 'Warning - Auto Close',
  args: {
    type: 'warning',
    message: 'Advertencia: Revisa los datos antes de continuar. Este alert se cerrará automáticamente.',
    closable: true,
    duration: 3000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert warning con auto-cierre en 3 segundos.',
      },
    },
  },
};

/**
 * ErrorAutoClose
 * Alert error con auto-cierre
 */
export const ErrorAutoClose: Story = {
  name: 'Error - Auto Close',
  args: {
    type: 'error',
    message: 'Error al procesar la solicitud. Este alert se cerrará automáticamente.',
    closable: true,
    duration: 3000
  },
  render: (args) => renderAlertStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Alert error con auto-cierre en 3 segundos.',
      },
    },
  },
};

