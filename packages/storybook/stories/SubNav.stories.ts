import type { Meta, StoryObj } from '@storybook/html';
import { createSubNav } from '../../components/subnav/src/SubNavProvider';
import { getSubNavConfig } from '../../components/subnav/src/configs/subNavVariants';
import type { SubNavOptions, SubNavVariant } from '../../components/subnav/src/types/SubNavOptions';
// Importar estilos del componente
import '../../components/subnav/src/styles/subnav.css';

/**
 * SubNav Component Stories
 * 
 * Componente de navegación superior horizontal con 8 variantes.
 * Muestra sub-navegaciones de los módulos principales con tabs
 * y navegación por URL o callbacks.
 */
const meta = {
  title: 'Navegación/SubNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'template',
        'aprendizaje',
        'desempeno',
        'encuestas',
        'tareas',
        'empresa',
        'admin-aprendizaje',
        'admin-desempeno'
      ],
      description: 'Variante del SubNav',
      table: {
        type: { summary: 'SubNavVariant' },
        defaultValue: { summary: 'template' }
      }
    },
    activeTabId: {
      control: { type: 'text' },
      description: 'ID del tab activo (se actualiza automáticamente al cambiar la variante)',
      table: {
        type: { summary: 'string' }
      }
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los tabs del SubNav',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    containerId: {
      control: false,
      description: 'ID del contenedor (asignado automáticamente)'
    }
  }
} satisfies Meta<SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean }>;

export default meta;
type Story = StoryObj<SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean }>;

// Helper para obtener tabs disponibles según la variante
function getTabsForVariant(variant: SubNavVariant): string[] {
  const config = getSubNavConfig(variant);
  return config.tabs.map(tab => tab.id);
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'subnav-story-container',
    variant: 'template',
    activeTabId: 'section1',
    showIcons: false
  } as SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean },
  render: (args) => {
    // Limpiar contenedor previo si existe
    const existingContainer = document.getElementById(args.containerId || 'subnav-story-container');
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    const variant = args.variant || 'template';
    const config = getSubNavConfig(variant);
    // Determinar tab activo: usar el especificado, o el primero disponible si no está en la lista
    let activeTabId = args.activeTabId;
    if (!activeTabId || !config.tabs.find(tab => tab.id === activeTabId)) {
      activeTabId = config.tabs.length > 0 ? config.tabs[0].id : '';
    }

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = '
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    // Contenedor para el SubNav
    const container = document.createElement('div');
    container.id = args.containerId || 'subnav-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeTab = config.tabs.find(tab => tab.id === activeTabId);

    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Variante:</strong> ${config.name}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${activeTab ? activeTab.label : activeTabId}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs disponibles:</strong> ${config.tabs.length}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> ${args.showIcons ? 'Mostrados' : 'Ocultos'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${config.tabs.map(t => t.id).join(', ')}</div>
      </div>
    `;

    wrapper.appendChild(infoPanel);

    // Crear el SubNav usando requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      try {
        createSubNav({
          containerId: container.id,
          variant: variant,
          activeTabId: activeTabId,
          showIcons: args.showIcons ?? false,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar info
            const config = getSubNavConfig(variant);
            const tab = config.tabs.find(t => t.id === tabId);
            // Actualizar panel de información
            const infoContent = infoPanel.querySelector('div[style*="grid"]');
            if (infoContent && tab) {
              const activeTabDiv = infoContent.querySelector('div:nth-child(2)');
              if (activeTabDiv) {
                activeTabDiv.innerHTML = `<strong>Tab Activo:</strong> ${tab.label}`;
              }
            }
          }
        });
      } catch (error) {
        console.error('Error creando SubNav:', error);
        container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

// Helper para renderizar SubNav de manera consistente
function renderSubNavStory(options: SubNavOptions) {
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
  container.id = options.containerId || `subnav-container-${Date.now()}`;
  container.style.cssText = `
    width: 100%;
    margin-bottom: 24px;
  `;

  wrapper.appendChild(container);

  requestAnimationFrame(() => {
    try {
      createSubNav(options);
    } catch (error) {
      console.error('Error creating SubNav:', error);
    }
  });

  return wrapper;
}

/**
 * VariantTemplate
 * Variante template (plantilla genérica)
 */
export const VariantTemplate: Story = {
  name: 'Variant - Template',
  args: {
    containerId: 'subnav-template-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-template-container',
      variant: 'template',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante template (plantilla genérica personalizable).',
      },
    },
  },
};

/**
 * VariantAprendizaje
 * Variante aprendizaje
 */
export const VariantAprendizaje: Story = {
  name: 'Variant - Aprendizaje',
  args: {
    containerId: 'subnav-aprendizaje-container',
    variant: 'aprendizaje',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('aprendizaje');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-aprendizaje-container',
      variant: 'aprendizaje',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante aprendizaje.',
      },
    },
  },
};

/**
 * VariantDesempeno
 * Variante desempeño
 */
export const VariantDesempeno: Story = {
  name: 'Variant - Desempeño',
  args: {
    containerId: 'subnav-desempeno-container',
    variant: 'desempeno',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('desempeno');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-desempeno-container',
      variant: 'desempeno',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante desempeño.',
      },
    },
  },
};

/**
 * VariantEncuestas
 * Variante encuestas
 */
export const VariantEncuestas: Story = {
  name: 'Variant - Encuestas',
  args: {
    containerId: 'subnav-encuestas-container',
    variant: 'encuestas',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('encuestas');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-encuestas-container',
      variant: 'encuestas',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante encuestas.',
      },
    },
  },
};

/**
 * VariantTareas
 * Variante tareas
 */
export const VariantTareas: Story = {
  name: 'Variant - Tareas',
  args: {
    containerId: 'subnav-tareas-container',
    variant: 'tareas',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('tareas');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-tareas-container',
      variant: 'tareas',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante tareas.',
      },
    },
  },
};

/**
 * VariantEmpresa
 * Variante empresa
 */
export const VariantEmpresa: Story = {
  name: 'Variant - Empresa',
  args: {
    containerId: 'subnav-empresa-container',
    variant: 'empresa',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('empresa');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-empresa-container',
      variant: 'empresa',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante empresa.',
      },
    },
  },
};

/**
 * VariantAdminAprendizaje
 * Variante admin-aprendizaje
 */
export const VariantAdminAprendizaje: Story = {
  name: 'Variant - Admin Aprendizaje',
  args: {
    containerId: 'subnav-admin-aprendizaje-container',
    variant: 'admin-aprendizaje',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('admin-aprendizaje');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-admin-aprendizaje-container',
      variant: 'admin-aprendizaje',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante admin-aprendizaje.',
      },
    },
  },
};

/**
 * VariantAdminDesempeno
 * Variante admin-desempeño
 */
export const VariantAdminDesempeno: Story = {
  name: 'Variant - Admin Desempeño',
  args: {
    containerId: 'subnav-admin-desempeno-container',
    variant: 'admin-desempeno',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('admin-desempeno');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-admin-desempeno-container',
      variant: 'admin-desempeno',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav en variante admin-desempeño.',
      },
    },
  },
};

/**
 * WithIcons
 * Con iconos visibles
 */
export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    containerId: 'subnav-icons-container',
    variant: 'template',
    showIcons: true
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-icons-container',
      variant: 'template',
      activeTabId: config.tabs[0]?.id,
      showIcons: true
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con iconos visibles en los tabs.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Sin iconos (solo texto)
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    containerId: 'subnav-no-icons-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-no-icons-container',
      variant: 'template',
      activeTabId: config.tabs[0]?.id,
      showIcons: false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav sin iconos (solo texto).',
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
    containerId: 'subnav-active-tab-container',
    variant: 'template',
    activeTabId: 'section2',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-active-tab-container',
      variant: 'template',
      activeTabId: 'section2',
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con tab activo (segundo tab).',
      },
    },
  },
};

/**
 * NoActiveTab
 * Sin tab activo (usa el primero por defecto)
 */
export const NoActiveTab: Story = {
  name: 'No Active Tab',
  args: {
    containerId: 'subnav-no-active-tab-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-no-active-tab-container',
      variant: 'template',
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav sin tab activo especificado (usa el primero por defecto).',
      },
    },
  },
};

/**
 * TabWithURL
 * Tab con URL (navegación)
 */
export const TabWithURL: Story = {
  name: 'Tab - With URL',
  args: {
    containerId: 'subnav-tab-url-container',
    variant: 'aprendizaje',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('aprendizaje');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-tab-url-container',
      variant: 'aprendizaje',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con tabs que tienen URLs (navegación).',
      },
    },
  },
};

/**
 * TabWithOnClick
 * Tab con onClick (callback)
 */
export const TabWithOnClick: Story = {
  name: 'Tab - With OnClick',
  args: {
    containerId: 'subnav-tab-onclick-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const customTabs = [
      { id: 'tab1', label: 'Tab 1', icon: 'far fa-home', onClick: () => alert('Tab 1 clicked'), active: true },
      { id: 'tab2', label: 'Tab 2', icon: 'far fa-book', onClick: () => alert('Tab 2 clicked') },
      { id: 'tab3', label: 'Tab 3', icon: 'far fa-chart-line', onClick: () => alert('Tab 3 clicked') }
    ];
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-tab-onclick-container',
      variant: 'template',
      tabs: customTabs,
      activeTabId: 'tab1',
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con tabs que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * TabWithoutURLOrOnClick
 * Tab sin URL ni onClick (solo cambio visual)
 */
export const TabWithoutURLOrOnClick: Story = {
  name: 'Tab - Without URL or OnClick',
  args: {
    containerId: 'subnav-tab-no-action-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const customTabs = config.tabs.map(tab => ({
      ...tab,
      url: undefined,
      onClick: undefined
    }));
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-tab-no-action-container',
      variant: 'template',
      tabs: customTabs,
      activeTabId: customTabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con tabs sin URL ni onClick (solo cambio visual).',
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
    containerId: 'subnav-tab-change-callback-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('template');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-tab-change-callback-container',
      variant: 'template',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false,
      onTabChange: (tabId, tabElement) => {
        alert(`Tab cambiado: ${tabId}`);
      }
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con callback onTabChange cuando cambia el tab activo.',
      },
    },
  },
};

/**
 * CustomTabs
 * Tabs personalizados (variante template)
 */
export const CustomTabs: Story = {
  name: 'Custom Tabs',
  args: {
    containerId: 'subnav-custom-tabs-container',
    variant: 'template',
    showIcons: true
  },
  render: (args) => {
    const customTabs = [
      { id: 'custom1', label: 'Personalizado 1', icon: 'far fa-star', active: true },
      { id: 'custom2', label: 'Personalizado 2', icon: 'far fa-heart' },
      { id: 'custom3', label: 'Personalizado 3', icon: 'far fa-bookmark' }
    ];
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-custom-tabs-container',
      variant: 'template',
      tabs: customTabs,
      activeTabId: 'custom1',
      showIcons: true
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con tabs personalizados (variante template).',
      },
    },
  },
};

/**
 * FewTabs
 * Pocos tabs (1-2)
 */
export const FewTabs: Story = {
  name: 'Few Tabs',
  args: {
    containerId: 'subnav-few-tabs-container',
    variant: 'encuestas',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('encuestas');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-few-tabs-container',
      variant: 'encuestas',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con pocos tabs (1 tab - variante encuestas).',
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
    containerId: 'subnav-many-tabs-container',
    variant: 'empresa',
    showIcons: false
  },
  render: (args) => {
    const config = getSubNavConfig('empresa');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-many-tabs-container',
      variant: 'empresa',
      activeTabId: config.tabs[0]?.id,
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con muchos tabs (6 tabs - variante empresa).',
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
    containerId: 'subnav-long-labels-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const customTabs = [
      { id: 'tab1', label: 'Configuración Avanzada del Sistema', icon: 'far fa-cog', active: true },
      { id: 'tab2', label: 'Gestión de Usuarios y Permisos', icon: 'far fa-users' },
      { id: 'tab3', label: 'Análisis de Datos y Reportes', icon: 'far fa-chart-line' }
    ];
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-long-labels-container',
      variant: 'template',
      tabs: customTabs,
      activeTabId: 'tab1',
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con labels largos.',
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
    containerId: 'subnav-short-labels-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const customTabs = [
      { id: 'tab1', label: 'Inicio', icon: 'far fa-home', active: true },
      { id: 'tab2', label: 'Tab', icon: 'far fa-book' },
      { id: 'tab3', label: 'Ver', icon: 'far fa-eye' }
    ];
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-short-labels-container',
      variant: 'template',
      tabs: customTabs,
      activeTabId: 'tab1',
      showIcons: args.showIcons ?? false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav con labels cortos.',
      },
    },
  },
};

/**
 * AllVariants
 * Todas las variantes
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    containerId: 'subnav-all-variants-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const variants: SubNavVariant[] = [
      'template',
      'aprendizaje',
      'desempeno',
      'encuestas',
      'tareas',
      'empresa',
      'admin-aprendizaje',
      'admin-desempeno'
    ];
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      display: flex;
      flex-direction: column;
      gap: 32px;
    `;

    variants.forEach((variant, index) => {
      const config = getSubNavConfig(variant);
      const variantContainer = document.createElement('div');
      variantContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `;

      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        font-weight: 600;
        color: var(--modifiers-normal-color-light-fg-1-high);
      `;
      label.textContent = `${config.name} (${variant})`;

      const subnavContainer = document.createElement('div');
      subnavContainer.id = `subnav-variant-${variant}-${Date.now()}`;
      subnavContainer.style.cssText = `
        width: 100%;
      `;

      variantContainer.appendChild(label);
      variantContainer.appendChild(subnavContainer);
      wrapper.appendChild(variantContainer);

      requestAnimationFrame(() => {
        try {
          createSubNav({
            containerId: subnavContainer.id,
            variant: variant,
            activeTabId: config.tabs[0]?.id,
            showIcons: false
          });
        } catch (error) {
          console.error('Error creating SubNav:', error);
        }
      });
    });

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav mostrando todas las variantes disponibles.',
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
    containerId: 'subnav-complete-container',
    variant: 'aprendizaje',
    activeTabId: 'home',
    showIcons: true
  },
  render: (args) => {
    const config = getSubNavConfig('aprendizaje');
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-complete-container',
      variant: 'aprendizaje',
      activeTabId: 'home',
      showIcons: true,
      onTabChange: (tabId, tabElement) => {
        console.log('Tab cambiado:', tabId);
      }
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav completo con todas las opciones habilitadas.',
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
    containerId: 'subnav-minimal-container',
    variant: 'template',
    showIcons: false
  },
  render: (args) => {
    const customTabs = [
      { id: 'tab1', label: 'Tab 1', icon: 'far fa-home', active: true },
      { id: 'tab2', label: 'Tab 2', icon: 'far fa-book' }
    ];
    const options: SubNavOptions = {
      containerId: args.containerId || 'subnav-minimal-container',
      variant: 'template',
      tabs: customTabs,
      showIcons: false
    };
    return renderSubNavStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'SubNav mínimo con solo las opciones esenciales.',
      },
    },
  },
};

