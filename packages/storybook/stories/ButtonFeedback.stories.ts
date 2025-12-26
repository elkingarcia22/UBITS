import type { Meta, StoryObj } from '@storybook/html';
import { createButtonFeedback } from '../../components/button-feedback/src/ButtonFeedbackProvider';
import type { ButtonFeedbackOptions } from '../../components/button-feedback/src/types/ButtonFeedbackOptions';

const meta: Meta<ButtonFeedbackOptions> = {
  title: 'Feedback/Button Feedback',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Botón flotante para obtener feedback de clientes. Al hacer clic, abre un modal con un formulario que permite seleccionar la sección actual y dejar un comentario. El feedback se puede enviar a un webhook de n8n.',
      },
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Texto del botón flotante (opcional)',
      table: {
        defaultValue: { summary: '' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icono del botón flotante',
      table: {
        defaultValue: { summary: 'comment-dots' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Posición del botón flotante',
      table: {
        defaultValue: { summary: 'bottom-right' },
      },
    },
    offset: {
      control: { type: 'number' },
      description: 'Offset desde el borde (en píxeles)',
      table: {
        defaultValue: { summary: 24 },
      },
    },
    modalTitle: {
      control: { type: 'text' },
      description: 'Título del modal de feedback',
      table: {
        defaultValue: { summary: 'Deja tu Feedback' },
      },
    },
    sectionOptions: {
      control: { type: 'object' },
      description: 'Opciones para el select de sección',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    defaultSection: {
      control: { type: 'text' },
      description: 'Valor por defecto del select de sección',
      table: {
        defaultValue: { summary: '' },
      },
    },
    commentPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del textarea de comentarios',
      table: {
        defaultValue: { summary: '' },
      },
    },
    n8nWebhookUrl: {
      control: { type: 'text' },
      description: 'URL del endpoint de n8n para enviar el feedback',
      table: {
        defaultValue: { summary: '' },
      },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Si el botón está visible inicialmente',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonFeedbackOptions>;

export const Default: Story = {
  args: {
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
      { value: 'aprendizaje', text: 'Aprendizaje' },
      { value: 'desempeno', text: 'Desempeño' },
      { value: 'diagnostico', text: 'Diagnóstico' },
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
    n8nWebhookUrl: '',
    visible: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = '
      min-height: 100vh;
      padding: var(--ubits-spacing-8);
      background-color: var(--modifiers-normal-color-light-bg-1);
      color: var(--modifiers-normal-color-light-fg-1-high);
    `;

    // Aplicar estilos para dark mode
    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        container.style.backgroundColor = 'var(--modifiers-normal-color-dark-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-dark-fg-1-high)';
      } else {
        container.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';
        container.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      }
    };

    // Observar cambios de tema
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    updateTheme();

    // Crear contenido de ejemplo
    const content = document.createElement('div');
    content.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      padding: var(--ubits-spacing-8);
    `;
    content.innerHTML = `
      <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
      <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón azul en la esquina inferior derecha para dejar tu feedback.</p>
      <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
    `;
    container.appendChild(content);

    // Variable para mantener la instancia del botón
    let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

    // Función para destruir el botón anterior si existe
    const destroyPreviousButton = () => {
      if (feedbackButtonInstance) {
        feedbackButtonInstance.destroy();
        feedbackButtonInstance = null;
      }
      // También buscar y eliminar cualquier botón flotante que pueda quedar en el body
      const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left');
      existingButtons.forEach(btn => {
        if (btn.parentElement) {
          btn.parentElement.removeChild(btn);
        }
      });
    };

    // Crear botón de feedback
    requestAnimationFrame(() => {
      try {
        // Destruir botón anterior si existe
        destroyPreviousButton();
        
        // Crear nuevo botón
        feedbackButtonInstance = createButtonFeedback({
          ...args,
          onFeedbackSent: (data) => {
            // Feedback enviado
          },
          onCancel: () => {
            // Feedback cancelado
          },
          onClose: () => {
            // Modal cerrado
          },
        });
      } catch (error) {
        console.error('Error creando botón de feedback:', error);
      }
    });

    return container;
  },
};

// Helper para renderizar Button Feedback de manera consistente
function renderButtonFeedbackStory(options: ButtonFeedbackOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    min-height: 100vh;
    padding: var(--ubits-spacing-8);
    background-color: var(--modifiers-normal-color-light-bg-1);
    color: var(--modifiers-normal-color-light-fg-1-high);
    position: relative;
  `;

  // Aplicar estilos para dark mode
  const updateTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      container.style.backgroundColor = 'var(--modifiers-normal-color-dark-bg-1)';
      container.style.color = 'var(--modifiers-normal-color-dark-fg-1-high)';
    } else {
      container.style.backgroundColor = 'var(--modifiers-normal-color-light-bg-1)';
      container.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    }
  };

  // Observar cambios de tema
  const observer = new MutationObserver(updateTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  updateTheme();

  // Crear contenido de ejemplo
  const content = document.createElement('div');
  content.style.cssText = `
    max-width: 800px;
    margin: 0 auto;
    padding: var(--ubits-spacing-8);
  `;
  content.innerHTML = `
    <h1 class="ubits-heading-h1">Página de Ejemplo</h1>
    <p class="ubits-body-lg">Este es un ejemplo de página con el botón de feedback flotante. Haz clic en el botón para dejar tu feedback.</p>
    <p class="ubits-body-md">El botón de feedback permite a los usuarios enviar comentarios sobre la aplicación directamente desde cualquier página.</p>
  `;
  container.appendChild(content);

  // Variable para mantener la instancia del botón
  let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;

  // Función para destruir el botón anterior si existe
  const destroyPreviousButton = () => {
    if (feedbackButtonInstance) {
      feedbackButtonInstance.destroy();
      feedbackButtonInstance = null;
    }
    const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left');
    existingButtons.forEach(btn => {
      if (btn.parentElement) {
        btn.parentElement.removeChild(btn);
      }
    });
  };

  // Crear botón de feedback
  requestAnimationFrame(() => {
    try {
      destroyPreviousButton();
      feedbackButtonInstance = createButtonFeedback(options);
    } catch (error) {
      console.error('Error creando botón de feedback:', error);
    }
  });

  return container;
}

/**
 * PositionBottomRight
 * Botón en posición bottom-right
 */
export const PositionBottomRight: Story = {
  name: 'Position - Bottom Right',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback en posición bottom-right (esquina inferior derecha).',
      },
    },
  },
};

/**
 * PositionBottomLeft
 * Botón en posición bottom-left
 */
export const PositionBottomLeft: Story = {
  name: 'Position - Bottom Left',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-left',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback en posición bottom-left (esquina inferior izquierda).',
      },
    },
  },
};

/**
 * PositionTopRight
 * Botón en posición top-right
 */
export const PositionTopRight: Story = {
  name: 'Position - Top Right',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'top-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback en posición top-right (esquina superior derecha).',
      },
    },
  },
};

/**
 * PositionTopLeft
 * Botón en posición top-left
 */
export const PositionTopLeft: Story = {
  name: 'Position - Top Left',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'top-left',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback en posición top-left (esquina superior izquierda).',
      },
    },
  },
};

/**
 * WithText
 * Botón con texto
 */
export const WithText: Story = {
  name: 'With Text',
  args: {
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con texto e icono.',
      },
    },
  },
};

/**
 * IconOnly
 * Botón solo con icono
 */
export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback solo con icono (sin texto).',
      },
    },
  },
};

/**
 * CustomIcon
 * Botón con icono personalizado
 */
export const CustomIcon: Story = {
  name: 'Custom Icon',
  args: {
    text: '',
    icon: 'star',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con icono personalizado.',
      },
    },
  },
};

/**
 * CustomOffset
 * Botón con offset personalizado
 */
export const CustomOffset: Story = {
  name: 'Custom Offset',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 48,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con offset personalizado (48px desde el borde).',
      },
    },
  },
};

/**
 * CustomModalTitle
 * Modal con título personalizado
 */
export const CustomModalTitle: Story = {
  name: 'Custom Modal Title',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Comparte tu opinión',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con título de modal personalizado.',
      },
    },
  },
};

/**
 * WithSectionOptions
 * Modal con opciones de sección
 */
export const WithSectionOptions: Story = {
  name: 'With Section Options',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
      { value: 'aprendizaje', text: 'Aprendizaje' },
      { value: 'desempeno', text: 'Desempeño' },
      { value: 'diagnostico', text: 'Diagnóstico' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con múltiples opciones de sección en el modal.',
      },
    },
  },
};

/**
 * WithoutSectionOptions
 * Modal sin opciones de sección
 */
export const WithoutSectionOptions: Story = {
  name: 'Without Section Options',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [],
    defaultSection: '',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback sin opciones de sección en el modal.',
      },
    },
  },
};

/**
 * DefaultSection
 * Modal con sección por defecto
 */
export const DefaultSection: Story = {
  name: 'Default Section',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
      { value: 'aprendizaje', text: 'Aprendizaje' }
    ],
    defaultSection: 'encuestas',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con sección por defecto seleccionada.',
      },
    },
  },
};

/**
 * CustomCommentPlaceholder
 * Modal con placeholder personalizado
 */
export const CustomCommentPlaceholder: Story = {
  name: 'Custom Comment Placeholder',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: 'Escribe aquí tus comentarios, sugerencias o quejas...',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con placeholder personalizado para el textarea de comentarios.',
      },
    },
  },
};

/**
 * OnFeedbackSent
 * Con callback onFeedbackSent
 */
export const OnFeedbackSent: Story = {
  name: 'OnFeedbackSent Callback',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const options: ButtonFeedbackOptions = {
      ...args,
      onFeedbackSent: (data) => {
        alert(`Feedback enviado:\nSección: ${data.section}\nComentario: ${data.comment}`);
        console.log('Feedback enviado:', data);
      }
    };
    return renderButtonFeedbackStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con callback onFeedbackSent. Muestra un alert cuando se envía el feedback.',
      },
    },
  },
};

/**
 * OnCancel
 * Con callback onCancel
 */
export const OnCancel: Story = {
  name: 'OnCancel Callback',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const options: ButtonFeedbackOptions = {
      ...args,
      onCancel: () => {
        alert('Feedback cancelado');
        console.log('Feedback cancelado');
      }
    };
    return renderButtonFeedbackStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con callback onCancel. Muestra un alert cuando se cancela el feedback.',
      },
    },
  },
};

/**
 * OnClose
 * Con callback onClose
 */
export const OnClose: Story = {
  name: 'OnClose Callback',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const options: ButtonFeedbackOptions = {
      ...args,
      onClose: () => {
        console.log('Modal cerrado');
      }
    };
    return renderButtonFeedbackStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con callback onClose. Registra en consola cuando se cierra el modal.',
      },
    },
  },
};

/**
 * Visible
 * Botón visible inicialmente
 */
export const Visible: Story = {
  name: 'Visible',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback visible inicialmente.',
      },
    },
  },
};

/**
 * Hidden
 * Botón oculto inicialmente
 */
export const Hidden: Story = {
  name: 'Hidden',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: false
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback oculto inicialmente. Usa show() para mostrarlo.',
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
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [],
    defaultSection: '',
    commentPlaceholder: 'Escribe tu comentario aquí...',
    visible: true
  },
  render: (args) => renderButtonFeedbackStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback mínimo con solo icono y modal básico.',
      },
    },
  },
};

/**
 * WithN8NWebhook
 * Con URL de webhook de n8n
 */
export const WithN8NWebhook: Story = {
  name: 'With N8N Webhook',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    n8nWebhookUrl: 'https://tu-webhook-n8n.com/webhook',
    visible: true
  },
  render: (args) => {
    const options: ButtonFeedbackOptions = {
      ...args,
      onFeedbackSent: (data) => {
        console.log('Feedback enviado a n8n:', data);
      }
    };
    return renderButtonFeedbackStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con URL de webhook de n8n configurada. El feedback se enviará automáticamente al webhook cuando se envíe el formulario.',
      },
    },
  },
};

/**
 * ShowHideMethods
 * Demostrar métodos show() y hide()
 */
export const ShowHideMethods: Story = {
  name: 'Show/Hide Methods',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const container = renderButtonFeedbackStory(args);
    
    // Agregar botones de control
    const controls = document.createElement('div');
    controls.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      gap: 8px;
      flex-direction: column;
    `;
    
    let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;
    
    requestAnimationFrame(() => {
      const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right');
      if (existingButtons.length > 0) {
        // Encontrar la instancia del botón (esto es una aproximación)
        // En un caso real, necesitarías mantener la referencia
        const showBtn = document.createElement('button');
        showBtn.textContent = 'Mostrar';
        showBtn.className = 'ubits-button ubits-button--primary';
        showBtn.onclick = () => {
          existingButtons.forEach(btn => {
            btn.classList.remove('ubits-button-feedback--hidden');
          });
        };
        
        const hideBtn = document.createElement('button');
        hideBtn.textContent = 'Ocultar';
        hideBtn.className = 'ubits-button ubits-button--secondary';
        hideBtn.onclick = () => {
          existingButtons.forEach(btn => {
            btn.classList.add('ubits-button-feedback--hidden');
          });
        };
        
        controls.appendChild(showBtn);
        controls.appendChild(hideBtn);
      }
    });
    
    container.appendChild(controls);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con botones de control para demostrar los métodos show() y hide().',
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
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const container = renderButtonFeedbackStory(args);
    
    // Agregar botones de control
    const controls = document.createElement('div');
    controls.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      gap: 8px;
      flex-direction: column;
    `;
    
    let feedbackButtonInstance: ReturnType<typeof createButtonFeedback> | null = null;
    
    requestAnimationFrame(() => {
      // Buscar la instancia del botón
      const existingButtons = document.body.querySelectorAll('.ubits-button-feedback--bottom-right');
      if (existingButtons.length > 0) {
        const openBtn = document.createElement('button');
        openBtn.textContent = 'Abrir Modal';
        openBtn.className = 'ubits-button ubits-button--primary';
        openBtn.onclick = () => {
          if (feedbackButtonInstance) {
            feedbackButtonInstance.open();
          }
        };
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cerrar Modal';
        closeBtn.className = 'ubits-button ubits-button--secondary';
        closeBtn.onclick = () => {
          if (feedbackButtonInstance) {
            feedbackButtonInstance.close();
          }
        };
        
        controls.appendChild(openBtn);
        controls.appendChild(closeBtn);
      }
    });
    
    container.appendChild(controls);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback con botones de control para demostrar los métodos open() y close().',
      },
    },
  },
};

/**
 * MultiplePositions
 * Múltiples botones en diferentes posiciones
 */
export const MultiplePositions: Story = {
  name: 'Multiple Positions',
  args: {
    text: '',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
    visible: true
  },
  render: (args) => {
    const container = renderButtonFeedbackStory(args);
    
    // Crear múltiples botones en diferentes posiciones
    requestAnimationFrame(() => {
      // Bottom Right (ya existe en args)
      createButtonFeedback({
        ...args,
        position: 'bottom-right',
        offset: 24
      });
      
      // Bottom Left
      createButtonFeedback({
        ...args,
        position: 'bottom-left',
        offset: 24
      });
      
      // Top Right
      createButtonFeedback({
        ...args,
        position: 'top-right',
        offset: 24
      });
      
      // Top Left
      createButtonFeedback({
        ...args,
        position: 'top-left',
        offset: 24
      });
    });
    
    // Actualizar contenido
    const content = container.querySelector('div');
    if (content) {
      content.innerHTML = `
        <h1 class="ubits-heading-h1">Múltiples Botones de Feedback</h1>
        <p class="ubits-body-lg">Este ejemplo muestra 4 botones de feedback en las 4 esquinas de la pantalla.</p>
        <p class="ubits-body-md">Cada botón abre el mismo modal de feedback, pero están posicionados en diferentes esquinas.</p>
      `;
    }
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Button Feedback en diferentes posiciones (4 esquinas).',
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
    text: 'Feedback',
    icon: 'comment-dots',
    position: 'bottom-right',
    offset: 24,
    modalTitle: 'Deja tu Feedback',
    sectionOptions: [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
      { value: 'aprendizaje', text: 'Aprendizaje' },
      { value: 'desempeno', text: 'Desempeño' },
      { value: 'diagnostico', text: 'Diagnóstico' }
    ],
    defaultSection: 'home',
    commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
    visible: true
  },
  render: (args) => {
    const options: ButtonFeedbackOptions = {
      ...args,
      onFeedbackSent: (data) => {
        console.log('Feedback enviado:', data);
      },
      onCancel: () => {
        console.log('Feedback cancelado');
      },
      onClose: () => {
        console.log('Modal cerrado');
      }
    };
    return renderButtonFeedbackStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Button Feedback completo con todas las opciones: texto, icono, opciones de sección, callbacks, etc.',
      },
    },
  },
};

