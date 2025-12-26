import type { Meta, StoryObj } from '@storybook/html';
import { renderTabs, createTabs } from '../../components/tabs/src/TabsProvider';
import type { TabsOptions, TabItem } from '../../components/tabs/src/types/TabsOptions';
import '../../components/tabs/src/styles/tabs.css';

/**
 * Tabs Component Stories
 * 
 * Componente de tabs horizontal con soporte para iconos opcionales.
 * El tab activo muestra fondo blanco, icono oscuro, texto en negrita
 * y una línea vertical rosa a la izquierda.
 */
const meta = {
  title: 'Navegación/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Componente Tabs UBITS de navegación horizontal con soporte para iconos opcionales. El tab activo muestra fondo blanco, icono oscuro, texto en negrita y una línea vertical rosa a la izquierda. Los tabs inactivos muestran icono y texto en gris claro sin fondo.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: { type: 'object' },
      description: 'Array de tabs a mostrar',
      table: {
        type: { summary: 'TabItem[]' },
      },
    },
    activeTabId: {
      control: { type: 'text' },
      description: 'ID del tab activo',
      table: {
        type: { summary: 'string' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los tabs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    tabCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de tabs a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
} satisfies Meta<TabsOptions & { showIcons?: boolean; tabCount?: number }>;

export default meta;
type Story = StoryObj<TabsOptions & { showIcons?: boolean; tabCount?: number }>;

/**
 * Helper para generar tabs de ejemplo
 */
function generateTabs(count: number = 5, withIcons: boolean = true): TabItem[] {
  const icons = ['fa-th', 'fa-chart-line', 'fa-cog', 'fa-star', 'fa-book', 'fa-home', 'fa-user', 'fa-bell', 'fa-envelope', 'fa-calendar'];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: 'tab-${i + 1}',
    label: labels[i] || 'Label ${i + 1}',
    icon: withIcons ? `far ${icons[i] || 'fa-th'}' : undefined,
    active: i === 0,
  }));
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    tabs: generateTabs(5, true),
    activeTabId: 'tab-1',
    showIcons: true,
    tabCount: 5,
  },
  render: (args) => {
    // Generar tabs según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const tabs = generateTabs(args.tabCount || 5, shouldShowIcons);
    
    // Asegurar que el tab activo esté correctamente marcado
    const activeId = args.activeTabId || tabs[0]?.id;
    tabs.forEach(tab => {
      tab.active = tab.id === activeId;
    });

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    // Contenedor para el Tabs
    const container = document.createElement('div');
    container.id = 'tabs-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'tabs-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeTab = tabs.find(tab => tab.id === activeId);

    const updateInfoPanel = (currentActiveId: string) => {
      const currentTab = tabs.find(tab => tab.id === currentActiveId);
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Tabs</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${currentTab ? currentTab.label : currentActiveId}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs totales:</strong> ${tabs.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> ${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${tabs.map(t => t.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Tabs usando createTabs para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';
        
        // Crear tabs con listeners
        createTabs({
          tabs: tabs,
          activeTabId: activeId,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar panel de información
            updateInfoPanel(tabId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Tabs:', error);
        container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: var(--p-spacing-mode-1-lg, 16px);">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

// Helper para renderizar Tabs de manera consistente
function renderTabsStory(options: TabsOptions) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    width: 100%;
    max-width: 1200px;
    padding: 24px;
    background: var(--modifiers-normal-color-light-bg-1);
    border-radius: 12px;
    border: 1px solid var(--modifiers-normal-color-light-border-1);
  `;

  const container = document.createElement('div');
  container.id = `tabs-container-${Date.now()}`;
  container.style.cssText = `
    width: 100%;
    margin-bottom: 24px;
  `;

  wrapper.appendChild(container);

  requestAnimationFrame(() => {
    try {
      createTabs(options, container.id);
    } catch (error) {
      console.error('Error creating Tabs:', error);
      container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
    }
  });

  return wrapper;
}

/**
 * WithIcons
 * Tabs con iconos
 */
export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' },
      { id: 'tab-4', label: 'Tab 4', icon: 'far fa-star' },
      { id: 'tab-5', label: 'Tab 5', icon: 'far fa-book' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con iconos en todos los items.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Tabs sin iconos
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', active: true },
      { id: 'tab-2', label: 'Tab 2' },
      { id: 'tab-3', label: 'Tab 3' },
      { id: 'tab-4', label: 'Tab 4' },
      { id: 'tab-5', label: 'Tab 5' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs sin iconos.',
      },
    },
  },
};

/**
 * ActiveTab
 * Con tab activo
 */
export const ActiveTab: Story = {
  name: 'Active Tab',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th' },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', active: true },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-2'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con tab activo (Tab 2).',
      },
    },
  },
};

/**
 * NoActiveTab
 * Sin tab activo (se usa el primero por defecto)
 */
export const NoActiveTab: Story = {
  name: 'No Active Tab',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th' },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ]
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs sin tab activo explícito (se usa el primero por defecto).',
      },
    },
  },
};

/**
 * TabWithActiveProperty
 * Tab con propiedad active: true
 */
export const TabWithActiveProperty: Story = {
  name: 'Tab - With Active Property',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th' },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', active: true },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ]
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con tab que tiene propiedad active: true.',
      },
    },
  },
};

/**
 * TabWithURL
 * Tab con URL (navegación directa)
 */
export const TabWithURL: Story = {
  name: 'Tab - With URL',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', url: 'https://example.com' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con tab que tiene URL (navegación directa al hacer click).',
      },
    },
  },
};

/**
 * TabWithOnClick
 * Tab con callback onClick
 */
export const TabWithOnClick: Story = {
  name: 'Tab - With OnClick',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', onClick: () => alert('Tab 2 clicked') },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog', onClick: () => alert('Tab 3 clicked') }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con tabs que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * TabDisabled
 * Tab deshabilitado
 */
export const TabDisabled: Story = {
  name: 'Tab - Disabled',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', disabled: true },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con tab deshabilitado.',
      },
    },
  },
};

/**
 * MultipleDisabledTabs
 * Múltiples tabs deshabilitados
 */
export const MultipleDisabledTabs: Story = {
  name: 'Multiple Disabled Tabs',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', disabled: true },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog', disabled: true },
      { id: 'tab-4', label: 'Tab 4', icon: 'far fa-star' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con múltiples tabs deshabilitados.',
      },
    },
  },
};

/**
 * OnTabChangeCallback
 * Callback cuando cambia el tab activo
 */
export const OnTabChangeCallback: Story = {
  name: 'On Tab Change Callback',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1',
    onTabChange: (tabId, tabElement) => {
      alert(`Tab cambiado: ${tabId}`);
    }
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con callback onTabChange cuando cambia el tab activo.',
      },
    },
  },
};

/**
 * IconStyleActive
 * Icono con estilo solid cuando está activo
 */
export const IconStyleActive: Story = {
  name: 'Icon Style - Active',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs donde el icono del tab activo usa estilo solid (fas).',
      },
    },
  },
};

/**
 * IconStyleInactive
 * Icono con estilo regular cuando está inactivo
 */
export const IconStyleInactive: Story = {
  name: 'Icon Style - Inactive',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs donde los iconos de los tabs inactivos usan estilo regular (far).',
      },
    },
  },
};

/**
 * IconRegularPrefix
 * Icono con prefijo "far" (regular)
 */
export const IconRegularPrefix: Story = {
  name: 'Icon - Regular Prefix',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con iconos que tienen prefijo "far" (regular).',
      },
    },
  },
};

/**
 * IconSolidPrefix
 * Icono con prefijo "fas" (solid)
 */
export const IconSolidPrefix: Story = {
  name: 'Icon - Solid Prefix',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'fas fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'fas fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'fas fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con iconos que tienen prefijo "fas" (solid). El componente ajusta automáticamente el estilo según el estado activo/inactivo.',
      },
    },
  },
};

/**
 * IconWithoutPrefix
 * Icono sin prefijo (se agrega automáticamente)
 */
export const IconWithoutPrefix: Story = {
  name: 'Icon - Without Prefix',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con iconos sin prefijo (se agrega automáticamente según el estado activo/inactivo).',
      },
    },
  },
};

/**
 * FewTabs
 * Pocos tabs (2-3)
 */
export const FewTabs: Story = {
  name: 'Few Tabs',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con pocos items (2 tabs).',
      },
    },
  },
};

/**
 * ManyTabs
 * Muchos tabs (5+)
 */
export const ManyTabs: Story = {
  name: 'Many Tabs',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' },
      { id: 'tab-4', label: 'Tab 4', icon: 'far fa-star' },
      { id: 'tab-5', label: 'Tab 5', icon: 'far fa-book' },
      { id: 'tab-6', label: 'Tab 6', icon: 'far fa-home' },
      { id: 'tab-7', label: 'Tab 7', icon: 'far fa-user' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con muchos items (7 tabs).',
      },
    },
  },
};

/**
 * LongLabels
 * Labels largos
 */
export const LongLabels: Story = {
  name: 'Long Labels',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab con Label Muy Largo', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Otro Tab con Label Extremadamente Largo', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab con Label Largo También', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con labels largos.',
      },
    },
  },
};

/**
 * ShortLabels
 * Labels cortos
 */
export const ShortLabels: Story = {
  name: 'Short Labels',
  args: {
    tabs: [
      { id: 'tab-1', label: 'T1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'T2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'T3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con labels cortos.',
      },
    },
  },
};

/**
 * MixedTabs
 * Tabs mixtos (algunos con iconos, algunos sin)
 */
export const MixedTabs: Story = {
  name: 'Mixed Tabs',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' },
      { id: 'tab-4', label: 'Tab 4' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs mixtos (algunos con iconos, algunos sin).',
      },
    },
  },
};

/**
 * AllTabsWithIcons
 * Todos los tabs con iconos
 */
export const AllTabsWithIcons: Story = {
  name: 'All Tabs - With Icons',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' },
      { id: 'tab-4', label: 'Tab 4', icon: 'far fa-star' },
      { id: 'tab-5', label: 'Tab 5', icon: 'far fa-book' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs donde todos los items tienen iconos.',
      },
    },
  },
};

/**
 * AllTabsWithoutIcons
 * Todos los tabs sin iconos
 */
export const AllTabsWithoutIcons: Story = {
  name: 'All Tabs - Without Icons',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', active: true },
      { id: 'tab-2', label: 'Tab 2' },
      { id: 'tab-3', label: 'Tab 3' },
      { id: 'tab-4', label: 'Tab 4' },
      { id: 'tab-5', label: 'Tab 5' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs donde ningún item tiene iconos.',
      },
    },
  },
};

/**
 * CustomClassName
 * Con clase CSS personalizada
 */
export const CustomClassName: Story = {
  name: 'Custom Class Name',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line' },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog' }
    ],
    activeTabId: 'tab-1',
    className: 'custom-tabs-class'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con clase CSS personalizada.',
      },
    },
  },
};

/**
 * SingleTab
 * Un solo tab
 */
export const SingleTab: Story = {
  name: 'Single Tab',
  args: {
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con un solo item.',
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
    tabs: [
      { id: 'tab-1', label: 'Tab 1', icon: 'far fa-th', active: true },
      { id: 'tab-2', label: 'Tab 2', icon: 'far fa-chart-line', onClick: () => console.log('Tab 2 clicked') },
      { id: 'tab-3', label: 'Tab 3', icon: 'far fa-cog', disabled: true },
      { id: 'tab-4', label: 'Tab 4', icon: 'far fa-star', url: 'https://example.com' },
      { id: 'tab-5', label: 'Tab 5', icon: 'far fa-book' }
    ],
    activeTabId: 'tab-1',
    className: 'custom-tabs-class',
    onTabChange: (tabId, tabElement) => {
      console.log('Tab cambiado:', tabId);
    }
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs completo con todas las opciones: iconos, callbacks, URLs, tabs deshabilitados, y clase personalizada.',
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
    tabs: [
      { id: 'tab-1', label: 'Tab 1', active: true },
      { id: 'tab-2', label: 'Tab 2' }
    ],
    activeTabId: 'tab-1'
  },
  render: (args) => renderTabsStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabs mínimo con solo las opciones esenciales (sin iconos, sin callbacks).',
      },
    },
  },
};

