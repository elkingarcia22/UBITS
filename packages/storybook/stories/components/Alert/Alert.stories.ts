/**
 * Alert Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderAlert, createAlert } from '../../../components/alert/src/AlertProvider';
import type { AlertOptions } from '../../../components/alert/src/types/AlertOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/alert/src/styles/alert.css';

const meta: Meta<AlertOptions> = {
  title: 'Feedback/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Alert UBITS para mostrar notificaciones del sistema. Soporta múltiples variantes (success, info, warning, error), botón cerrar opcional y animaciones.',
      },
    },
    // ⭐ CONTRATO UBITS PARA AUTORUN
    ubits: createUBITSContract({
      componentId: '🧩-ux-alert',
      api: {
        create: 'window.UBITS.Alert.create',
        tag: '<ubits-alert>',
      },
      dependsOn: {
        required: [], // Alert no depende de otros componentes
        optional: ['🧩-ux-button'], // Botón de acción es opcional
      },
      internals: [], // Alert no tiene componentes internos privados
      slots: {}, // Alert no tiene slots públicos
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-feedback-bg-success-subtle-default',
        '--modifiers-normal-color-light-feedback-bg-info-subtle-default',
        '--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
        '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
        '--modifiers-normal-color-light-fg-1-high',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: 'window.UBITS.Alert.create({\n  type: \'success\',\n  message: \'Los cambios se han guardado correctamente.\',\n  closable: true,\n  onClose: () => {}\n});',
        basic: 'window.UBITS.Alert.create({\n  type: \'success\',\n  message: \'Los cambios se han guardado correctamente.\',\n  closable: true\n});',
        info: 'window.UBITS.Alert.create({\n  type: \'info\',\n  message: \'Información importante para el usuario.\',\n  closable: true\n});',
        warning: 'window.UBITS.Alert.create({\n  type: \'warning\',\n  message: \'Advertencia: revisa los datos ingresados.\',\n  closable: true\n});',
        error: 'window.UBITS.Alert.create({\n  type: \'error\',\n  message: \'Error al procesar la solicitud.\',\n  closable: true\n});',
        notClosable: 'window.UBITS.Alert.create({\n  type: \'success\',\n  message: \'Operación completada.\',\n  closable: false\n});',
      },
      variants: {
        type: ['success', 'info', 'warning', 'error'],
        closable: [true, false],
      },
      events: {
        onClose: {
          type: 'Event',
          description: 'Emitted when alert is closed',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'feedback-alert--implementation',
        storiesByExample: {
          canonical: 'feedback-alert--implementation',
          basic: 'feedback-alert--default',
          info: 'feedback-alert--info',
          warning: 'feedback-alert--warning',
          error: 'feedback-alert--error',
          notClosable: 'feedback-alert--not-closable',
        },
      },
      intents: {
        'alert.success': 'canonical',
        'alert.notification': 'canonical',
        'alert.message': 'canonical',
        'alert.info': 'info',
        'alert.warning': 'warning',
        'alert.error': 'error',
        'alert.not-closable': 'notClosable',
      },
    }),
  },
  args: {
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0,
    className: '',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Tipo de alert',
      table: {
        type: { summary: 'success | info | warning | error' },
        defaultValue: { summary: 'success' },
        category: 'Apariencia',
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Mensaje del alert (puede incluir HTML básico)',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Si el alert tiene botón de cerrar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Comportamiento',
      },
    },
    duration: {
      control: { type: 'number' },
      description: 'Duración en milisegundos antes de auto-cerrar (0 = no auto-close)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Comportamiento',
      },
    },
    action: {
      control: { type: 'object' },
      description: 'Botón de acción opcional dentro del alert',
      table: {
        type: {
          summary: `{
  label: string;
  onClick: () => void;
}`,
        },
        category: 'Acciones',
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback llamado cuando el alert se cierra',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertOptions>;

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
    type: 'success',
    message: 'Los cambios se han guardado correctamente.',
    closable: true,
    duration: 0,
    className: '',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        state: 'open', // Mostrar código automáticamente
        // ⭐ SNIPPET EXACTO para Autorun
        code: `// 1. Crear contenedor HTML
<div id="alert-implementation-container"></div>

// 2. Crear alert
const alertElement = window.UBITS.Alert.create({
  type: 'success',
  message: 'Los cambios se han guardado correctamente.',
  closable: true,
  duration: 0
});

// 3. Agregar al contenedor
document.getElementById('alert-implementation-container').appendChild(alertElement);`,
      },
      codePanel: true, // Panel de código siempre visible
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-alert');
    container.setAttribute('data-ubits-component', 'Alert');
    container.style.padding = '20px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';

    // Crear alert
    const alertElement = createAlert(args);

    // Agregar funcionalidad al botón cerrar si existe
    if (alertElement && args.closable) {
      const closeButton = alertElement.querySelector('.ubits-alert__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        });
      }
    }

    container.appendChild(alertElement);

    return container;
  },
};

// Story con todos los controles (para desarrollo)
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
    const alertElement = createAlert(args);

    // Agregar funcionalidad al botón cerrar si existe
    if (alertElement && args.closable) {
      const closeButton = alertElement.querySelector('.ubits-alert__close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
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
        const closeBtn = alertElement.querySelector(
          '.ubits-alert__close',
        ) as HTMLButtonElement;
        if (closeBtn) {
          closeBtn.click();
        } else {
          alertElement.classList.add('ubits-alert--closing');
          setTimeout(() => {
            if (alertElement.parentNode) {
              alertElement.parentNode.removeChild(alertElement);
            }
          }, 300);
        }
      }, args.duration);
    }

    preview.appendChild(alertElement);
    container.appendChild(preview);

    return container;
  },
};
