import type { Meta, StoryObj } from '@storybook/html';
import { createScrollbar } from '../../components/scroll/src/ScrollProvider';
import type { ScrollOptions } from '../../components/scroll/src/types/ScrollOptions';
import '../../components/scroll/src/styles/scroll.css';

const meta: Meta<ScrollOptions> = {
  title: 'Básicos/Scrollbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Scrollbar personalizado UBITS. Se usa para crear scrollbars personalizados en elementos scrollable. Soporta orientación vertical y horizontal. Se sincroniza automáticamente con el elemento scrollable asociado. Aparece en hover y se adapta al tamaño del contenido. Soporta arrastrar y clic para navegar.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Orientación del scrollbar (vertical u horizontal).',
      table: {
        type: { summary: 'string' },
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
  },
};

export default meta;
type Story = StoryObj<ScrollOptions>;

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
      background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
    `;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1, #ffffff);
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
          background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
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
          color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        `;
        
        const description = document.createElement('p');
        description.textContent = 'Este es un ejemplo de contenido largo que requiere scroll vertical. El scrollbar aparecerá a la derecha cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.';
        description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
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
            background: var(--modifiers-normal-color-light-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
          `;
          const itemText = document.createElement('p');
          itemText.textContent = `Elemento ${i}`;
          itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
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
        currentWrapper.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 600px;
          height: 300px;
        `;

        const scrollableContainer = document.createElement('div');
        scrollableContainer.id = `scrollbar-target-horizontal-${Date.now()}`;
        scrollableContainer.style.cssText = `
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 16px;
          background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
          border-radius: 8px;
          border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
          -ms-overflow-style: none;
          scrollbar-width: none;
        `;
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

        // Contenido ancho
        const content = document.createElement('div');
        content.style.cssText = `
          width: 1800px;
          padding: 16px;
        `;
        
        const title = document.createElement('p');
        title.textContent = 'Scrollbar Horizontal';
        title.style.cssText = `
          margin: 0 0 16px 0;
          color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-bold, 700);
        `;
        
        const description = document.createElement('p');
        description.textContent = 'Este es un ejemplo de contenido ancho que requiere scroll horizontal. El scrollbar aparecerá abajo cuando pases el mouse sobre el contenedor. Puedes arrastrar la barra del scrollbar o hacer clic en el área del scrollbar para navegar.';
        description.style.cssText = `
          margin: 0 0 24px 0;
          color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
        `;
        
        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = `
          display: flex;
          gap: 12px;
        `;
        
        for (let i = 1; i <= 20; i++) {
          const item = document.createElement('div');
          item.style.cssText = `
            min-width: 200px;
            padding: 12px;
            background: var(--modifiers-normal-color-light-bg-1, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
          `;
          const itemText = document.createElement('p');
          itemText.textContent = `Elemento ${i}`;
          itemText.style.cssText = `
            margin: 0;
            color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
            font-size: var(--font-body-sm-size, 13px);
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
        `;
        
        currentWrapper.appendChild(scrollableContainer);
        currentWrapper.appendChild(scrollbarContainer);
        
        // Crear scrollbar después de que el DOM esté listo
        setTimeout(() => {
          try {
            scrollbarInstance = createScrollbar({
              orientation: 'horizontal',
              state: args.state,
              targetId: scrollableContainer.id,
              containerId: scrollbarContainer.id,
            });
          } catch (error) {
            console.error('Error al crear scrollbar:', error);
          }
        }, 100);
      }

      wrapper.appendChild(currentWrapper);
    };

    // Crear contenido inicial
    createScrollbarContent(args.orientation);

    // Usar un intervalo para verificar cambios en args (debido a limitaciones de Storybook HTML)
    let lastOrientation = args.orientation;
    const checkInterval = setInterval(() => {
      if (args.orientation !== lastOrientation) {
        lastOrientation = args.orientation;
        createScrollbarContent(args.orientation);
      }
    }, 100);

    // Limpiar al desmontar usando MutationObserver (reemplazo de DOMNodeRemoved deprecado)
    const cleanupObserver = new MutationObserver(() => {
      if (!document.body.contains(container)) {
        clearInterval(checkInterval);
        if (scrollbarInstance) {
          scrollbarInstance.destroy();
        }
        cleanupObserver.disconnect();
      }
    });
    cleanupObserver.observe(document.body, { childList: true, subtree: true });

    container.appendChild(wrapper);
    return container;
  },
};

// Helper para crear un scrollbar con contenido
function createScrollbarWithContent(
  orientation: 'vertical' | 'horizontal',
  contentHeight?: number,
  contentWidth?: number,
  itemCount?: number
) {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
  `;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    background: var(--modifiers-normal-color-light-bg-1, #ffffff);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `;

  const contentWrapper = document.createElement('div');
  
  if (orientation === 'vertical') {
    contentWrapper.style.cssText = `
      display: flex;
      align-items: stretch;
      gap: 8px;
      width: 600px;
      height: 400px;
    `;

    const scrollableContainer = document.createElement('div');
    scrollableContainer.id = `scrollbar-target-${Date.now()}`;
    scrollableContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
      border-radius: 8px;
      border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
      -ms-overflow-style: none;
      scrollbar-width: none;
    `;
    
    const styleId = `scrollbar-style-${Date.now()}`;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
      #${scrollableContainer.id}::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);

    const content = document.createElement('div');
    content.style.cssText = `
      height: ${contentHeight || 1200}px;
      padding: 16px;
    `;
    
    const title = document.createElement('p');
    title.textContent = 'Scrollbar Vertical';
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
      font-size: var(--font-body-md-size, 16px);
      font-weight: var(--weight-bold, 700);
    `;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
    
    const count = itemCount || 30;
    for (let i = 1; i <= count; i++) {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 12px;
        background: var(--modifiers-normal-color-light-bg-1, #ffffff);
        border-radius: 8px;
        border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
      `;
      const itemText = document.createElement('p');
      itemText.textContent = `Elemento ${i}`;
      itemText.style.cssText = `
        margin: 0;
        color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
        font-size: var(--font-body-sm-size, 13px);
      `;
      item.appendChild(itemText);
      itemsContainer.appendChild(item);
    }
    
    content.appendChild(title);
    content.appendChild(itemsContainer);
    scrollableContainer.appendChild(content);
    
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.id = `scrollbar-container-${Date.now()}`;
    scrollbarContainer.style.cssText = `
      height: 100%;
    `;
    
    contentWrapper.appendChild(scrollableContainer);
    contentWrapper.appendChild(scrollbarContainer);
    
    setTimeout(() => {
      try {
        createScrollbar({
          orientation: 'vertical',
          state: 'default',
          targetId: scrollableContainer.id,
          containerId: scrollbarContainer.id,
        });
      } catch (error) {
        console.error('Error al crear scrollbar:', error);
      }
    }, 100);
  } else {
    contentWrapper.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 600px;
      height: 300px;
    `;

    const scrollableContainer = document.createElement('div');
    scrollableContainer.id = `scrollbar-target-${Date.now()}`;
    scrollableContainer.style.cssText = `
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2, #f3f3f4);
      border-radius: 8px;
      border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
      -ms-overflow-style: none;
      scrollbar-width: none;
    `;
    
    const styleId = `scrollbar-style-${Date.now()}`;
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = `
      #${scrollableContainer.id}::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);

    const content = document.createElement('div');
    content.style.cssText = `
      width: ${contentWidth || 1800}px;
      padding: 16px;
    `;
    
    const title = document.createElement('p');
    title.textContent = 'Scrollbar Horizontal';
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
      font-size: var(--font-body-md-size, 16px);
      font-weight: var(--weight-bold, 700);
    `;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.style.cssText = `
      display: flex;
      gap: 12px;
    `;
    
    const count = itemCount || 20;
    for (let i = 1; i <= count; i++) {
      const item = document.createElement('div');
      item.style.cssText = `
        min-width: 200px;
        padding: 12px;
        background: var(--modifiers-normal-color-light-bg-1, #ffffff);
        border-radius: 8px;
        border: 1px solid var(--modifiers-normal-color-light-border-1, #d0d2d5);
      `;
      const itemText = document.createElement('p');
      itemText.textContent = `Elemento ${i}`;
      itemText.style.cssText = `
        margin: 0;
        color: var(--modifiers-normal-color-light-fg-1-high, #303a47);
        font-size: var(--font-body-sm-size, 13px);
      `;
      item.appendChild(itemText);
      itemsContainer.appendChild(item);
    }
    
    content.appendChild(title);
    content.appendChild(itemsContainer);
    scrollableContainer.appendChild(content);
    
    const scrollbarContainer = document.createElement('div');
    scrollbarContainer.id = `scrollbar-container-${Date.now()}`;
    scrollbarContainer.style.cssText = `
      width: 100%;
    `;
    
    contentWrapper.appendChild(scrollableContainer);
    contentWrapper.appendChild(scrollbarContainer);
    
    setTimeout(() => {
      try {
        createScrollbar({
          orientation: 'horizontal',
          state: 'default',
          targetId: scrollableContainer.id,
          containerId: scrollbarContainer.id,
        });
      } catch (error) {
        console.error('Error al crear scrollbar:', error);
      }
    }, 100);
  }

  wrapper.appendChild(contentWrapper);
  container.appendChild(wrapper);
  return container;
}

/**
 * OrientationVertical
 * Scrollbar orientación vertical
 */
export const OrientationVertical: Story = {
  name: 'Orientation - Vertical',
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('vertical'),
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar con orientación vertical. Aparece a la derecha del contenedor scrollable.',
      },
    },
  },
};

/**
 * OrientationHorizontal
 * Scrollbar orientación horizontal
 */
export const OrientationHorizontal: Story = {
  name: 'Orientation - Horizontal',
  args: {
    orientation: 'horizontal',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('horizontal'),
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar con orientación horizontal. Aparece abajo del contenedor scrollable.',
      },
    },
  },
};

/**
 * WithLongContent
 * Scrollbar con contenido largo (vertical)
 */
export const WithLongContent: Story = {
  name: 'With Long Content',
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('vertical', 2000, undefined, 50),
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar vertical con contenido muy largo (2000px de altura, 50 elementos).',
      },
    },
  },
};

/**
 * WithWideContent
 * Scrollbar con contenido ancho (horizontal)
 */
export const WithWideContent: Story = {
  name: 'With Wide Content',
  args: {
    orientation: 'horizontal',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('horizontal', undefined, 3000, 30),
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar horizontal con contenido muy ancho (3000px de ancho, 30 elementos).',
      },
    },
  },
};

/**
 * WithShortContent
 * Scrollbar con contenido corto (no aparece scrollbar)
 */
export const WithShortContent: Story = {
  name: 'With Short Content',
  args: {
    orientation: 'vertical',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('vertical', 200, undefined, 3),
  parameters: {
    docs: {
      description: {
        story: 'Scrollbar con contenido corto que no requiere scroll. El scrollbar se oculta automáticamente.',
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
    orientation: 'vertical',
    state: 'default',
  },
  render: (args) => createScrollbarWithContent('vertical', 800, undefined, 15),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo mínimo de scrollbar vertical con contenido moderado.',
      },
    },
  },
};
