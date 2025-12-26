import type { Meta, StoryObj } from '@storybook/html';
import { createScrollbar } from '../../../components/scroll/src/ScrollProvider';
import type { ScrollOptions } from '../../../components/scroll/src/types/ScrollOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente
import '../../../components/scroll/src/styles/scroll.css';

const meta: Meta<ScrollOptions> = {
  title: 'Básicos/Scrollbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          'Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido. Soporta arrastrar y clic para navegar.

```html
// 1. Crear elemento scrollable
<div id="scrollable-container" style="
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background: var(--modifiers-normal-color-light-bg-2);
  border-radius: 8px;
  border: 1px solid var(--modifiers-normal-color-light-border-1);
">
  <!-- Contenido largo que requiere scroll -->
  <div style="height: 1200px; padding: 16px;">
    <p>Contenido largo...</p>
    <!-- Más contenido -->
  </div>
</div>

// 2. Crear contenedor para el scrollbar
<div id="scrollbar-container" style="
  height: 300px;
"></div>

// 3. Crear Scrollbar
const scrollbarInstance = window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-container',
  orientation: 'vertical', // 'vertical' | 'horizontal'
  state: 'default',
  className: ''
});

// Nota: createScrollbar retorna un objeto con:
// - scrollbarInstance.element: El elemento DOM del scrollbar
// - scrollbarInstance.update(): Actualizar el scrollbar manualmente
// - scrollbarInstance.destroy(): Destruir el scrollbar y limpiar recursos

// Ejemplo con orientación horizontal:
const scrollbarHorizontal = window.createScrollbar({
  containerId: 'scrollbar-container-horizontal',
  targetId: 'scrollable-container-horizontal',
  orientation: 'horizontal',
  state: 'default'
});

// Nota: El scrollbar se sincroniza automáticamente con el elemento scrollable.
// Aparece en hover y se adapta al tamaño del contenido.
// Soporta arrastrar y clic para navegar.
```',
      },
    },
    layout: 'fullscreen',
    ubits: createUBITSContract({
      componentId: '⚙️-functional-scroll',
      api: {
        create: 'window.createScrollbar',
        // También disponible como función importada directamente
      },
      dependsOn: {
        required: [],
        optional: [],
      },
      internals: [],
      slots: {},
      tokensUsed: [
        '--ubits-border-radius-full',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: [],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-element',
  orientation: 'vertical'
});`,
        basic: `window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-element',
  orientation: 'vertical'
});`,
        horizontal: `window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-element',
  orientation: 'horizontal'
});`,
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'basicos-scrollbar--implementation',
        storiesByExample: {
          canonical: 'basicos-scrollbar--implementation',
          basic: 'basicos-scrollbar--default',
          horizontal: 'basicos-scrollbar--horizontal',
        },
      },
      intents: {
        'scrollbar': 'canonical',
        'scrollbar.vertical': 'canonical',
        'scrollbar.horizontal': 'horizontal',
      },
      variants: {
        orientation: ['vertical', 'horizontal'],
      },
      events: {},
    }),
  },
  argTypes: {
    containerId: {
      control: { type: 'text' },
      description: 'ID del contenedor donde se renderizará el scrollbar.',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
    targetId: {
      control: { type: 'text' },
      description: 'ID del elemento scrollable al que está asociado el scrollbar.',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Orientación del scrollbar (vertical u horizontal).',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default'],
      description: 'Estado del scrollbar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Estado',
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional.',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScrollOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear elemento scrollable
<div id="scrollable-container" style="
  width: 400px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background: var(--modifiers-normal-color-light-bg-2);
  border-radius: 8px;
  border: 1px solid var(--modifiers-normal-color-light-border-1);
">
  <!-- Contenido largo que requiere scroll -->
  <div style="height: 1200px; padding: 16px;">
    <p>Contenido largo...</p>
    <!-- Más contenido -->
  </div>
</div>

// 2. Crear contenedor para el scrollbar
<div id="scrollbar-container" style="
  height: 300px;
"></div>

// 3. Crear Scrollbar
const scrollbarInstance = window.createScrollbar({
  containerId: 'scrollbar-container',
  targetId: 'scrollable-container',
  orientation: 'vertical', // 'vertical' | 'horizontal'
  state: 'default',
  className: ''
});

// Nota: createScrollbar retorna un objeto con:
// - scrollbarInstance.element: El elemento DOM del scrollbar
// - scrollbarInstance.update(): Actualizar el scrollbar manualmente
// - scrollbarInstance.destroy(): Destruir el scrollbar y limpiar recursos

// Ejemplo con orientación horizontal:
const scrollbarHorizontal = window.createScrollbar({
  containerId: 'scrollbar-container-horizontal',
  targetId: 'scrollable-container-horizontal',
  orientation: 'horizontal',
  state: 'default'
});

// Nota: El scrollbar se sincroniza automáticamente con el elemento scrollable.
// Aparece en hover y se adapta al tamaño del contenido.
// Soporta arrastrar y clic para navegar.`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '⚙️-functional-scroll');
    container.setAttribute('data-ubits-component', 'Scrollbar');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      display: flex;
      align-items: stretch;
      gap: 8px;
      width: 600px;
      height: 400px;
    `;

    // Crear elemento scrollable
    const scrollableContainer = document.createElement('div');
    scrollableContainer.id = `scrollbar-target-${Date.now()}`;
    scrollableContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      -ms-overflow-style: none;
      scrollbar-width: none;
    `;
    scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
    scrollableContainer.style.setProperty('scrollbar-width', 'none');

    // Ocultar scrollbar nativo de WebKit
    const styleId = `scrollbar-style-${Date.now()}`;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
      #${scrollableContainer.id}::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);

    // Contenido largo
    const content = document.createElement('div');
    content.style.cssText = `
      height: 1200px;
      padding: 16px;
    `;

    const title = document.createElement('p');
    title.textContent = 'Scrollbar Personalizado';
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: 16px;
      font-weight: 700;
    `;

    const description = document.createElement('p');
    description.textContent =
      'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor.';
    description.style.cssText = `
      margin: 0 0 24px 0;
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: 13px;
    `;

    content.appendChild(title);
    content.appendChild(description);
    scrollableContainer.appendChild(content);

    // Contenedor del scrollbar
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.id = `scrollbar-container-${Date.now()}`;
    scrollbarContainer.style.cssText = `
      height: 100%;
    `;

    wrapper.appendChild(scrollableContainer);
    wrapper.appendChild(scrollbarContainer);
    container.appendChild(wrapper);

    // Crear scrollbar después de que el DOM esté listo
    setTimeout(() => {
      try {
        const scrollbarInstance = createScrollbar({
          orientation: args.orientation || 'vertical',
          state: args.state || 'default',
          targetId: scrollableContainer.id,
          containerId: scrollbarContainer.id,
          className: args.className,
        });
      } catch (error) {
        console.error('Error al crear scrollbar:', error);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = `Error: ${error}`;
        errorDiv.style.color = 'red';
        container.appendChild(errorDiv);
      }
    }, 100);

    return container;
  },
};

export const Default: Story = {
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  render: (args, { updateArgs }) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1);
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    let scrollbarInstance: any = null;
    let currentWrapper: HTMLElement | null = null;

    const createScrollbarContent = (orientation: 'vertical' | 'horizontal') => {
      // Limpiar contenido anterior
      if (scrollbarInstance) {
        scrollbarInstance.destroy();
        scrollbarInstance = null;
      }
      if (currentWrapper) {
        currentWrapper.remove();
      }

      currentWrapper = document.createElement('div');

      if (orientation === 'vertical') {
        currentWrapper.style.cssText = `
          display: flex;
          align-items: stretch;
          gap: 8px;
          width: 600px;
          height: 400px;
        `;

        const scrollableContainer = document.createElement('div');
        scrollableContainer.id = `scrollbar-target-vertical-${Date.now()}`;
        scrollableContainer.style.cssText = `
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          background: var(--modifiers-normal-color-light-bg-2);
          border-radius: 8px;
          border: 1px solid var(--modifiers-normal-color-light-border-1);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `;
        scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
        scrollableContainer.style.setProperty('scrollbar-width', 'none');

        // Estilo para ocultar scrollbar nativo de WebKit
        const styleId = `scrollbar-style-vertical-${Date.now()}`;
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          styleElement.textContent = `
            #${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          `;
          document.head.appendChild(styleElement);
        }

        // Contenido largo
        const content = document.createElement('div');
        content.style.cssText = `
          height: 1200px;
          padding: 16px;
        `;

        const title = document.createElement('p');
        title.textContent = 'Scrollbar Vertical';
        title.style.cssText = `
          margin: 0 0 16px 0;
          color: var(--modifiers-normal-color-light-fg-1-high);
          font-size: 16px;
          font-weight: 700;
        `;

        const description = document.createElement('p');
        description.textContent =
          'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor.';
        description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: 13px;
        `;

        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 12px;
        `;

        for (let i = 1; i <= 30; i++) {
          const item = document.createElement('div');
          item.style.cssText = `
            padding: 12px;
            background: var(--modifiers-normal-color-light-bg-1);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1);
          `;
          const itemText = document.createElement('p');
          itemText.textContent = `Elemento ${i}`;
          itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high);
            font-size: 13px;
          `;
          item.appendChild(itemText);
          itemsContainer.appendChild(item);
        }

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(itemsContainer);
        scrollableContainer.appendChild(content);

        const scrollbarContainer = document.createElement('div');
        scrollbarContainer.id = `scrollbar-container-vertical-${Date.now()}`;
        scrollbarContainer.style.cssText = `
          height: 100%;
        `;

        currentWrapper.appendChild(scrollableContainer);
        currentWrapper.appendChild(scrollbarContainer);

        // Crear scrollbar después de que el DOM esté listo
        setTimeout(() => {
          try {
            scrollbarInstance = createScrollbar({
              orientation: 'vertical',
              state: args.state,
              targetId: scrollableContainer.id,
              containerId: scrollbarContainer.id,
            });
          } catch (error) {
            console.error('Error al crear scrollbar:', error);
          }
        }, 100);
      } else {
        // Horizontal (similar pero con overflow-x)
        currentWrapper.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 600px;
          height: 300px;
        `;

        const scrollableContainer = document.createElement('div');
        scrollableContainer.id = `scrollbar-target-horizontal-${Date.now()}`;
        // El contenedor debe tener un ancho fijo menor que el contenido para activar scroll
        scrollableContainer.setAttribute('style', `
          width: 100% !important;
          height: calc(100% - 40px) !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding: 16px !important;
          background: var(--modifiers-normal-color-light-bg-2) !important;
          border-radius: 8px !important;
          border: 1px solid var(--modifiers-normal-color-light-border-1) !important;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
          box-sizing: border-box !important;
          min-width: 0 !important;
          max-width: 100% !important;
        `);
        scrollableContainer.style.setProperty('-ms-overflow-style', 'none');
        scrollableContainer.style.setProperty('scrollbar-width', 'none');

        // Estilo para ocultar scrollbar nativo de WebKit
        const styleId = `scrollbar-style-horizontal-${Date.now()}`;
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = styleId;
          styleElement.textContent = `
            #${scrollableContainer.id}::-webkit-scrollbar {
              display: none;
            }
          `;
          document.head.appendChild(styleElement);
        }

        // Contenido ancho - debe ser más ancho que el contenedor para activar scroll
        // Calcular el ancho real necesario: 20 items * 200px + 19 gaps * 12px + padding
        // 20 * 200 = 4000px, 19 * 12 = 228px, padding = 32px
        // Total mínimo: 4000 + 228 + 32 = 4260px
        // Pero usaremos 1800px como especificado, así que forzamos ese ancho
        const requiredContentWidth = 1800;
        
        // Log para depurar
        console.log('🔵 [Scrollbar Horizontal] Creando contenido con ancho requerido', {
          requiredContentWidth,
          wrapperWidth: currentWrapper.offsetWidth
        });
        const content = document.createElement('div');
        // Usar box-sizing: content-box para que el padding se sume al ancho total
        content.setAttribute('style', `
          width: ${requiredContentWidth}px !important;
          min-width: ${requiredContentWidth}px !important;
          max-width: ${requiredContentWidth}px !important;
          padding: 16px !important;
          box-sizing: content-box !important;
          display: block !important;
          flex-shrink: 0 !important;
          overflow: visible !important;
        `);

        const title = document.createElement('p');
        title.textContent = 'Scrollbar Horizontal';
        title.style.cssText = `
          margin: 0 0 16px 0;
          color: var(--modifiers-normal-color-light-fg-1-high);
          font-size: 16px;
          font-weight: 700;
        `;

        const description = document.createElement('p');
        description.textContent =
          'Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor.';
        description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          font-size: 13px;
        `;

        const itemsContainer = document.createElement('div');
        const itemsWidth = requiredContentWidth - 32; // Restar padding
        itemsContainer.setAttribute('style', `
          display: flex !important;
          gap: 12px !important;
          width: ${itemsWidth}px !important;
          min-width: ${itemsWidth}px !important;
          flex-shrink: 0 !important;
          box-sizing: border-box !important;
        `);

        for (let i = 1; i <= 20; i++) {
          const item = document.createElement('div');
          item.setAttribute('style', `
            min-width: 200px !important;
            width: 200px !important;
            flex-shrink: 0 !important;
            padding: 12px;
            background: var(--modifiers-normal-color-light-bg-1);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1);
            box-sizing: border-box;
          `);
          const itemText = document.createElement('p');
          itemText.textContent = `Elemento ${i}`;
          itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high);
            font-size: 13px;
          `;
          item.appendChild(itemText);
          itemsContainer.appendChild(item);
        }

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(itemsContainer);
        scrollableContainer.appendChild(content);

        const scrollbarContainer = document.createElement('div');
        scrollbarContainer.id = `scrollbar-container-horizontal-${Date.now()}`;
        scrollbarContainer.style.cssText = `
          width: 100%;
          height: 8px; /* Altura fija para el scrollbar horizontal */
          flex-shrink: 0; /* No permitir que se encoja */
        `;

        currentWrapper.appendChild(scrollableContainer);
        currentWrapper.appendChild(scrollbarContainer);

        // Crear scrollbar después de que el DOM esté listo
        // Usar múltiples timeouts para asegurar que el contenido esté completamente renderizado
        setTimeout(() => {
          try {
            // Verificar dimensiones antes de crear el scrollbar
            const targetEl = document.getElementById(scrollableContainer.id) as HTMLElement;
            const contentEl = content; // Usar la referencia directa
            
            if (targetEl && contentEl) {
              // Forzar el ancho del contenido usando !important inline
              const requiredWidth = 1800;
              contentEl.setAttribute('style', `
                width: ${requiredWidth}px !important;
                min-width: ${requiredWidth}px !important;
                max-width: ${requiredWidth}px !important;
                padding: 16px;
                box-sizing: content-box;
                display: block;
                flex-shrink: 0;
                overflow: visible;
              `);
              
              // También forzar el ancho del itemsContainer
              if (itemsContainer) {
                const itemsWidth = requiredWidth - 32; // Restar padding
                itemsContainer.setAttribute('style', `
                  display: flex;
                  gap: 12px;
                  width: ${itemsWidth}px !important;
                  min-width: ${itemsWidth}px !important;
                  flex-shrink: 0;
                  box-sizing: border-box;
                `);
              }
              
              // Forzar actualización del layout
              void targetEl.offsetWidth; // Trigger reflow
              
              console.log('🔵 [Scrollbar Horizontal] Verificando dimensiones antes de crear scrollbar', {
                targetId: scrollableContainer.id,
                containerId: scrollbarContainer.id,
                targetScrollWidth: targetEl.scrollWidth,
                targetClientWidth: targetEl.clientWidth,
                targetOffsetWidth: targetEl.offsetWidth,
                contentWidth: contentEl.offsetWidth,
                contentScrollWidth: contentEl.scrollWidth,
                contentStyleWidth: contentEl.style.width,
                contentComputedWidth: window.getComputedStyle(contentEl).width,
                itemsContainerWidth: itemsContainer?.offsetWidth,
                itemsContainerScrollWidth: itemsContainer?.scrollWidth,
                requiredWidth,
                needsScroll: targetEl.scrollWidth > targetEl.clientWidth,
                wrapperWidth: currentWrapper.offsetWidth
              });
              
              // Si aún no hay scroll, intentar forzar el ancho de otra manera
              if (targetEl.scrollWidth <= targetEl.clientWidth) {
                console.warn('⚠️ [Scrollbar Horizontal] Aún no hay scroll, intentando forzar ancho del contenido');
                // Remover y re-agregar el contenido para forzar reflow
                const parent = contentEl.parentElement;
                if (parent) {
                  parent.removeChild(contentEl);
                  parent.appendChild(contentEl);
                  // Forzar reflow
                  void contentEl.offsetWidth;
                  console.log('🟡 [Scrollbar Horizontal] Después de re-agregar contenido', {
                    targetScrollWidth: targetEl.scrollWidth,
                    targetClientWidth: targetEl.clientWidth,
                    contentWidth: contentEl.offsetWidth
                  });
                }
              }
            }
            
            scrollbarInstance = createScrollbar({
              orientation: 'horizontal',
              state: args.state,
              targetId: scrollableContainer.id,
              containerId: scrollbarContainer.id,
            });
            
            // Forzar actualización después de crear con múltiples intentos
            if (scrollbarInstance) {
              // Actualizar inmediatamente
              scrollbarInstance.update();
              
              // Actualizar después de un delay para asegurar que el DOM esté completamente renderizado
              setTimeout(() => {
                scrollbarInstance.update();
                const targetEl = document.getElementById(scrollableContainer.id);
                console.log('🟢 [Scrollbar Horizontal] Scrollbar actualizado (primer intento)', {
                  scrollbarElement: !!scrollbarInstance.element,
                  barElement: !!scrollbarInstance.element?.querySelector('.ubits-scrollbar__bar'),
                  targetScrollWidth: targetEl?.scrollWidth,
                  targetClientWidth: targetEl?.clientWidth
                });
              }, 200);
              
              // Actualizar una vez más después de otro delay
              setTimeout(() => {
                scrollbarInstance.update();
                const targetEl = document.getElementById(scrollableContainer.id);
                console.log('🟢 [Scrollbar Horizontal] Scrollbar actualizado (segundo intento)', {
                  targetScrollWidth: targetEl?.scrollWidth,
                  targetClientWidth: targetEl?.clientWidth,
                  needsScroll: targetEl ? targetEl.scrollWidth > targetEl.clientWidth : false
                });
              }, 500);
            }
          } catch (error) {
            console.error('🔴 [Scrollbar Horizontal] Error al crear scrollbar:', error);
          }
        }, 100);
      }

      wrapper.appendChild(currentWrapper);
    };

    // Crear contenido inicial
    createScrollbarContent(args.orientation || 'vertical');

    // Observar cambios en args
    let lastOrientation = args.orientation || 'vertical';
    const checkInterval = setInterval(() => {
      if (args.orientation !== lastOrientation) {
        lastOrientation = args.orientation || 'vertical';
        createScrollbarContent(lastOrientation);
      }
    }, 100);

    // Limpiar al desmontar usando MutationObserver (reemplazo de DOMNodeRemoved deprecado)
    const observer = new MutationObserver((mutations) => {
      // Verificar si el container fue eliminado del DOM
      if (!document.body.contains(container)) {
        clearInterval(checkInterval);
        if (scrollbarInstance) {
          scrollbarInstance.destroy();
        }
        observer.disconnect();
      }
    });
    
    // Observar cambios en el DOM
    observer.observe(document.body, { childList: true, subtree: true });

    container.appendChild(wrapper);
    return container;
  },
};

