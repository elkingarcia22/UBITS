import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Templates/UBITS Templates',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Templates completos de UBITS para modo Colaborador y Administrador. Incluyen Sidebar, TabBar, SubNav y todos los componentes del sistema de diseño.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    template: {
      control: { type: 'select' },
      options: ['colaborador', 'admin'],
      description: 'Template a mostrar',
      table: {
        type: { summary: 'colaborador | admin' },
        defaultValue: { summary: 'colaborador' },
        category: 'Configuración',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    template: 'colaborador',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      overflow: hidden;
    `;

    // Crear iframe para cargar el template
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
    `;

    // Función para cargar el template
    const loadTemplate = (templateType: string) => {
      const templateFile = templateType === 'admin' 
        ? 'template-admin.html' 
        : 'template-colaborador.html';
      
      // Intentar diferentes rutas posibles
      const possiblePaths = [
        `/templates/${templateFile}`,
        `../../templates/${templateFile}`,
        `../../../templates/${templateFile}`,
        `../../../../templates/${templateFile}`,
        `../../../../../templates/${templateFile}`,
      ];

      let pathIndex = 0;
      
      const tryLoadPath = () => {
        if (pathIndex >= possiblePaths.length) {
          // Mostrar mensaje de error
          container.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              flex-direction: column;
              gap: var(--ubits-spacing-md);
              padding: var(--ubits-spacing-lg);
              background-color: var(--modifiers-normal-color-light-bg-1);
              color: var(--modifiers-normal-color-light-fg-1-high);
            ">
              <h2 class="ubits-heading-h2">Template no encontrado</h2>
              <p class="ubits-body-md">No se pudo cargar el template: ${templateFile}</p>
              <p class="ubits-body-sm" style="color: var(--modifiers-normal-color-light-fg-1-medium);">
                Asegúrate de que el archivo existe en: packages/templates/${templateFile}
              </p>
              <p class="ubits-body-sm" style="color: var(--modifiers-normal-color-light-fg-1-medium);">
                Template seleccionado: ${templateType}
              </p>
              <p class="ubits-body-sm" style="color: var(--modifiers-normal-color-light-fg-1-medium); margin-top: var(--ubits-spacing-md);">
                <strong>Nota:</strong> Los templates requieren un servidor HTTP para funcionar correctamente.
                <br>Ejecuta: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">cd packages/templates && python3 -m http.server 8000</code>
              </p>
            </div>
          `;
          return;
        }

        const path = possiblePaths[pathIndex];
        iframe.src = path;
        
        iframe.onerror = () => {
          pathIndex++;
          tryLoadPath();
        };

        iframe.onload = () => {
          // Verificar si el iframe cargó correctamente
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc || iframeDoc.body.innerHTML.trim() === '') {
              pathIndex++;
              tryLoadPath();
            }
          } catch (e) {
            // Error de CORS, intentar siguiente ruta
            pathIndex++;
            tryLoadPath();
          }
        };
      };

      tryLoadPath();
    };

    // Cargar template inicial
    loadTemplate(args.template);

    container.appendChild(iframe);

    // Observar cambios en args.template usando un intervalo
    let lastTemplate = args.template;
    const checkInterval = setInterval(() => {
      if (args.template !== lastTemplate) {
        lastTemplate = args.template;
        loadTemplate(args.template);
      }
    }, 100);

    // Limpiar intervalo cuando se destruya el componente
    const originalRemove = container.remove;
    container.remove = function() {
      clearInterval(checkInterval);
      originalRemove.call(this);
    };

    return container;
  },
};

