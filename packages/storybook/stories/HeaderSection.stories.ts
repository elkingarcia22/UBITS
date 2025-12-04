import type { Meta, StoryObj } from '@storybook/html';
import { createHeaderSection } from '../../components/header-section/src/HeaderSectionProvider';
import type { HeaderSectionOptions, HeaderSectionAction } from '../../components/header-section/src/types/HeaderSectionOptions';
import '../../components/button-ai/src/styles/button-ai.css';
import '../../components/list/src/styles/list.css';
import '../../components/breadcrumb/src/styles/breadcrumb.css';

/**
 * HeaderSection Component Stories
 * 
 * Componente de encabezado de sección con título y acciones.
 * Incluye título (heading h2), botón de información con tooltip (sm),
 * y acciones (botones md). Todo es apagable/prendible con controladores.
 */
const meta = {
  title: 'Layout/HeaderSection',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente HeaderSection UBITS para encabezados de sección con título (heading h2, fg-1-high), botón de información con tooltip (sm), y acciones (botones md). Todos los elementos son apagables/prendibles con controladores.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la sección (heading h2)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título (NO afecta al status tag)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showBackButton: {
      control: { type: 'boolean' },
      description: 'Mostrar el botón de atrás (secundario md)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showInfoButton: {
      control: { type: 'boolean' },
      description: 'Mostrar el botón de información (sm, tertiary)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    infoTooltipText: {
      control: { type: 'text' },
      description: 'Texto del tooltip del botón de información',
      if: { arg: 'showInfoButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar el status tag (controlador independiente del título)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    statusTagLabel: {
      control: { type: 'text' },
      description: 'Label del status tag',
      if: { arg: 'showStatusTag' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    statusTagStatus: {
      control: { type: 'select' },
      options: ['completed', 'published', 'fulfilled', 'created', 'active', 'not-fulfilled', 'denied', 'draft', 'in-progress', 'syncing', 'pending', 'pending-approval', 'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'],
      description: 'Estado del status tag',
      if: { arg: 'showStatusTag' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pending' }
      }
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Mostrar todas las acciones (botones md)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAIAction: {
      control: { type: 'boolean' },
      description: 'Mostrar botón AI (primero en la serie)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction1: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 1 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction2: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 2 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction3: {
      control: { type: 'boolean' },
      description: 'Mostrar acción 3 (Button text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showPrimaryAction: {
      control: { type: 'boolean' },
      description: 'Mostrar acción primaria (Primary action)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario adicional',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    secondaryButtonText: {
      control: { type: 'text' },
      description: 'Texto del botón secundario adicional',
      if: { arg: 'showSecondaryButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Icono del botón secundario adicional',
      if: { arg: 'showSecondaryButton' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showOptionsButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de opciones (3 puntos)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    optionsMenuItems: {
      control: { type: 'object' },
      description: 'Opciones del menú dropdown del botón de opciones',
      if: { arg: 'showOptionsButton' },
      table: {
        type: { summary: 'HeaderSectionOptionsMenuItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    showBreadcrumb: {
      control: { type: 'boolean' },
      description: 'Mostrar breadcrumb (debajo del header, 16px de distancia)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    breadcrumbItems: {
      control: { type: 'object' },
      description: 'Items del breadcrumb',
      if: { arg: 'showBreadcrumb' },
      table: {
        type: { summary: 'BreadcrumbItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    containerId: {
      control: false,
      description: 'ID del contenedor (asignado automáticamente)'
    }
  }
} satisfies Meta<HeaderSectionOptions>;

export default meta;
type Story = StoryObj<HeaderSectionOptions>;

/**
 * Story única con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'header-section-story-container',
    title: 'Name product',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional sobre el producto',
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: true,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    showOptionsButton: true,
    optionsMenuItems: [
      {
        label: 'Opción 1',
        value: 'option-1',
        onClick: (e, data) => {
          // Opción 1 seleccionada
        }
      },
      {
        label: 'Opción 2',
        value: 'option-2',
        onClick: (e, data) => {
          // Opción 2 seleccionada
        }
      },
      {
        label: 'Opción 3',
        value: 'option-3',
        onClick: (e, data) => {
          // Opción 3 seleccionada
        }
      }
    ],
    showBreadcrumb: true,
    breadcrumbItems: [
      {
        id: 'home',
        label: 'Home',
        url: '#',
        onClick: (e) => {
          // Home clicked
        }
      },
      {
        id: 'products',
        label: 'Products',
        url: '#',
        onClick: (e) => {
          // Products clicked
        }
      },
      {
        id: 'current',
        label: 'Current Product'
      }
    ]
  } as HeaderSectionOptions & {
    showAIAction?: boolean;
    showAction1?: boolean;
    showAction2?: boolean;
    showAction3?: boolean;
    showPrimaryAction?: boolean;
    statusTagLabel?: string;
    statusTagStatus?: string;
    breadcrumbItems?: Array<{ id: string; label: string; url?: string; onClick?: (e: MouseEvent) => void }>;
  },
  render: (args) => {
    const container = document.createElement('div');
    container.id = args.containerId || 'header-section-story-container';
    container.style.width = '100%';
    container.style.maxWidth = '1220px';
    container.style.margin = '0 auto';
    container.style.padding = '24px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '200px';

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      font-size: 13px;
      color: var(--modifiers-normal-color-light-fg-2-medium);
    `;
    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--modifiers-normal-color-light-fg-1-high);">Información del HeaderSection</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <div><strong>Título:</strong> ${args.title || '(vacío)'}</div>
        <div><strong>Mostrar título:</strong> ${args.showTitle ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón atrás:</strong> ${args.showBackButton ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón info:</strong> ${args.showInfoButton ? 'Sí' : 'No'}</div>
        <div><strong>Tooltip texto:</strong> ${args.infoTooltipText || '(vacío)'}</div>
        <div><strong>Mostrar status tag:</strong> ${args.showStatusTag ? 'Sí' : 'No'}</div>
        <div><strong>Status tag label:</strong> ${(args as any).statusTagLabel || '(vacío)'}</div>
        <div><strong>Status tag status:</strong> ${(args as any).statusTagStatus || '(vacío)'}</div>
        <div><strong>Mostrar acciones:</strong> ${args.showActions ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón AI:</strong> ${(args as any).showAIAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 1:</strong> ${(args as any).showAction1 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 2:</strong> ${(args as any).showAction2 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 3:</strong> ${(args as any).showAction3 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción primaria:</strong> ${(args as any).showPrimaryAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón secundario:</strong> ${args.showSecondaryButton ? 'Sí' : 'No'}</div>
        <div><strong>Texto botón secundario:</strong> ${args.secondaryButtonText || '(vacío)'}</div>
        <div><strong>Mostrar botón opciones:</strong> ${args.showOptionsButton ? 'Sí' : 'No'}</div>
      </div>
    `;
    container.appendChild(infoPanel);

    // Renderizar HeaderSection
    requestAnimationFrame(() => {
      try {
        const statusTagOptions = (args as any).showStatusTag && (args as any).statusTagLabel
          ? {
              label: (args as any).statusTagLabel,
              status: (args as any).statusTagStatus || 'pending',
              size: 'sm' as const
            }
          : undefined;

        // Construir array de acciones basado en los controladores individuales
        const actions: HeaderSectionAction[] = [];
        
        if ((args as any).showAIAction) {
          actions.push({
            id: 'ai-button',
            text: 'AI button',
            variant: 'secondary',
            icon: 'sparkles',
            iconStyle: 'regular',
            onClick: (e) => {
              // AI button clicked
            }
          });
        }
        
        if ((args as any).showAction1) {
          actions.push({
            id: 'action-1',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 1 clicked
            }
          });
        }
        
        if ((args as any).showAction2) {
          actions.push({
            id: 'action-2',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 2 clicked
            }
          });
        }
        
        if ((args as any).showAction3) {
          actions.push({
            id: 'action-3',
            text: 'Button text',
            variant: 'secondary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Action 3 clicked
            }
          });
        }
        
        if ((args as any).showPrimaryAction) {
          actions.push({
            id: 'primary-action',
            text: 'Primary action',
            variant: 'primary',
            icon: 'grid',
            iconStyle: 'regular',
            onClick: (e) => {
              // Primary action clicked
            }
          });
        }

        const breadcrumbOptions = (args as any).showBreadcrumb && (args as any).breadcrumbItems
          ? {
              items: (args as any).breadcrumbItems,
              separator: '>'
            }
          : undefined;

        createHeaderSection({
          ...args,
          container: container,
          actions: actions,
          statusTag: statusTagOptions,
          breadcrumb: breadcrumbOptions,
          onBackClick: (e) => {
            // Back button clicked
          },
          onInfoClick: (e) => {
            // Info button clicked
          },
          onSecondaryButtonClick: (e) => {
            // Secondary button clicked
          },
          onOptionsClick: (e) => {
            // Options button clicked
          }
        });
      } catch (error) {
        console.error('Error creating HeaderSection:', error);
        container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    });

    return container;
  }
};

// Helper para renderizar HeaderSection de manera consistente
function renderHeaderSectionStory(
  options: HeaderSectionOptions & {
    showAIAction?: boolean;
    showAction1?: boolean;
    showAction2?: boolean;
    showAction3?: boolean;
    showPrimaryAction?: boolean;
    statusTagLabel?: string;
    statusTagStatus?: string;
    breadcrumbItems?: Array<{ id: string; label: string; url?: string; onClick?: (e: MouseEvent) => void }>;
  },
  showInfoPanel: boolean = false
) {
  const container = document.createElement('div');
  container.id = options.containerId || `header-section-${Date.now()}`;
  container.style.width = '100%';
  container.style.maxWidth = '1220px';
  container.style.margin = '0 auto';
  container.style.padding = '24px';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.minHeight = '200px';

  if (showInfoPanel) {
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-bottom: 24px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-size: 13px;
      color: var(--modifiers-normal-color-light-fg-2-medium);
    `;
    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--modifiers-normal-color-light-fg-1-high);">Información del HeaderSection</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <div><strong>Título:</strong> ${options.title || '(vacío)'}</div>
        <div><strong>Mostrar título:</strong> ${options.showTitle ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón atrás:</strong> ${options.showBackButton ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón info:</strong> ${options.showInfoButton ? 'Sí' : 'No'}</div>
        <div><strong>Tooltip texto:</strong> ${options.infoTooltipText || '(vacío)'}</div>
        <div><strong>Mostrar status tag:</strong> ${options.showStatusTag ? 'Sí' : 'No'}</div>
        <div><strong>Status tag label:</strong> ${options.statusTagLabel || '(vacío)'}</div>
        <div><strong>Status tag status:</strong> ${options.statusTagStatus || '(vacío)'}</div>
        <div><strong>Mostrar acciones:</strong> ${options.showActions ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón AI:</strong> ${options.showAIAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 1:</strong> ${options.showAction1 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 2:</strong> ${options.showAction2 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción 3:</strong> ${options.showAction3 ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar acción primaria:</strong> ${options.showPrimaryAction ? 'Sí' : 'No'}</div>
        <div><strong>Mostrar botón secundario:</strong> ${options.showSecondaryButton ? 'Sí' : 'No'}</div>
        <div><strong>Texto botón secundario:</strong> ${options.secondaryButtonText || '(vacío)'}</div>
        <div><strong>Mostrar botón opciones:</strong> ${options.showOptionsButton ? 'Sí' : 'No'}</div>
      </div>
    `;
    container.appendChild(infoPanel);
  }

  requestAnimationFrame(() => {
    try {
      const statusTagOptions = options.showStatusTag && options.statusTagLabel
        ? {
            label: options.statusTagLabel,
            status: (options.statusTagStatus || 'pending') as any,
            size: 'sm' as const
          }
        : undefined;

      const actions: HeaderSectionAction[] = [];
      
      if (options.showAIAction) {
        actions.push({
          id: 'ai-button',
          text: 'AI button',
          variant: 'secondary',
          icon: 'sparkles',
          iconStyle: 'regular',
          onClick: (e) => {}
        });
      }
      
      if (options.showAction1) {
        actions.push({
          id: 'action-1',
          text: 'Button text',
          variant: 'secondary',
          icon: 'grid',
          iconStyle: 'regular',
          onClick: (e) => {}
        });
      }
      
      if (options.showAction2) {
        actions.push({
          id: 'action-2',
          text: 'Button text',
          variant: 'secondary',
          icon: 'grid',
          iconStyle: 'regular',
          onClick: (e) => {}
        });
      }
      
      if (options.showAction3) {
        actions.push({
          id: 'action-3',
          text: 'Button text',
          variant: 'secondary',
          icon: 'grid',
          iconStyle: 'regular',
          onClick: (e) => {}
        });
      }
      
      if (options.showPrimaryAction) {
        actions.push({
          id: 'primary-action',
          text: 'Primary action',
          variant: 'primary',
          icon: 'grid',
          iconStyle: 'regular',
          onClick: (e) => {}
        });
      }

      const breadcrumbOptions = options.showBreadcrumb && options.breadcrumbItems
        ? {
            items: options.breadcrumbItems,
            separator: '>'
          }
        : undefined;

      createHeaderSection({
        ...options,
        container: container,
        actions: actions,
        statusTag: statusTagOptions,
        breadcrumb: breadcrumbOptions,
        onBackClick: options.onBackClick,
        onInfoClick: options.onInfoClick,
        onSecondaryButtonClick: options.onSecondaryButtonClick,
        onOptionsClick: options.onOptionsClick
      });
    } catch (error) {
      console.error('Error creating HeaderSection:', error);
      container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
    }
  });

  return container;
}

/**
 * BasicTitle
 * Solo título básico
 */
export const BasicTitle: Story = {
  name: 'Basic Title',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con solo título básico.',
      },
    },
  },
};

/**
 * WithBackButton
 * Título con botón de atrás
 */
export const WithBackButton: Story = {
  name: 'With Back Button',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: true,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    onBackClick: (e) => {
      alert('Botón de atrás clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título y botón de atrás.',
      },
    },
  },
};

/**
 * WithInfoButton
 * Título con botón de información
 */
export const WithInfoButton: Story = {
  name: 'With Info Button',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: true,
    infoTooltipText: '',
    showStatusTag: false,
    showActions: false,
    onInfoClick: (e) => {
      alert('Botón de información clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título y botón de información.',
      },
    },
  },
};

/**
 * WithInfoButtonAndTooltip
 * Título con botón de información y tooltip
 */
export const WithInfoButtonAndTooltip: Story = {
  name: 'With Info Button and Tooltip',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: true,
    infoTooltipText: 'Información adicional sobre el producto',
    showStatusTag: false,
    showActions: false,
    onInfoClick: (e) => {
      alert('Botón de información clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título, botón de información y tooltip.',
      },
    },
  },
};

/**
 * WithStatusTag
 * Título con status tag
 */
export const WithStatusTag: Story = {
  name: 'With Status Tag',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título y status tag.',
      },
    },
  },
};

/**
 * WithStatusTagActive
 * Status tag con estado 'active'
 */
export const WithStatusTagActive: Story = {
  name: 'Status Tag - Active',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con status tag en estado "active".',
      },
    },
  },
};

/**
 * WithStatusTagCompleted
 * Status tag con estado 'completed'
 */
export const WithStatusTagCompleted: Story = {
  name: 'Status Tag - Completed',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: true,
    statusTagLabel: 'Completed',
    statusTagStatus: 'completed',
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con status tag en estado "completed".',
      },
    },
  },
};

/**
 * WithStatusTagPending
 * Status tag con estado 'pending'
 */
export const WithStatusTagPending: Story = {
  name: 'Status Tag - Pending',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: true,
    statusTagLabel: 'Pending',
    statusTagStatus: 'pending',
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con status tag en estado "pending".',
      },
    },
  },
};

/**
 * WithBackAndInfo
 * Título con botón de atrás e información
 */
export const WithBackAndInfo: Story = {
  name: 'With Back and Info',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional',
    showStatusTag: false,
    showActions: false,
    onBackClick: (e) => {
      alert('Botón de atrás clickeado');
    },
    onInfoClick: (e) => {
      alert('Botón de información clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título, botón de atrás e información.',
      },
    },
  },
};

/**
 * WithBackInfoAndStatusTag
 * Título con botón de atrás, información y status tag
 */
export const WithBackInfoAndStatusTag: Story = {
  name: 'With Back, Info and Status Tag',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional',
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título, botón de atrás, información y status tag.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Sin título (solo botones)
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    title: '',
    showTitle: false,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: false,
    showAction1: true,
    showAction2: true,
    showAction3: false,
    showPrimaryAction: true,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection sin título, solo con acciones.',
      },
    },
  },
};

/**
 * WithSecondaryActions
 * Con acciones secundarias
 */
export const WithSecondaryActions: Story = {
  name: 'With Secondary Actions',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: false,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con acciones secundarias.',
      },
    },
  },
};

/**
 * WithPrimaryActions
 * Con acciones primarias
 */
export const WithPrimaryActions: Story = {
  name: 'With Primary Actions',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: false,
    showAction1: false,
    showAction2: false,
    showAction3: false,
    showPrimaryAction: true,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con acciones primarias.',
      },
    },
  },
};

/**
 * WithAIAction
 * Con botón AI
 */
export const WithAIAction: Story = {
  name: 'With AI Action',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: true,
    showAction1: false,
    showAction2: false,
    showAction3: false,
    showPrimaryAction: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con botón AI.',
      },
    },
  },
};

/**
 * WithMultipleActions
 * Con múltiples acciones
 */
export const WithMultipleActions: Story = {
  name: 'With Multiple Actions',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: true,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con múltiples acciones (botón AI, secundarias y primarias).',
      },
    },
  },
};

/**
 * WithSecondaryButton
 * Con botón secundario adicional
 */
export const WithSecondaryButton: Story = {
  name: 'With Secondary Button',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    onSecondaryButtonClick: (e) => {
      alert('Botón secundario clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con botón secundario adicional.',
      },
    },
  },
};

/**
 * WithOptionsButton
 * Con botón de opciones
 */
export const WithOptionsButton: Story = {
  name: 'With Options Button',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showOptionsButton: true,
    optionsMenuItems: [],
    onOptionsClick: (e) => {
      alert('Botón de opciones clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con botón de opciones (sin menú).',
      },
    },
  },
};

/**
 * WithOptionsMenu
 * Con botón de opciones y menú dropdown
 */
export const WithOptionsMenu: Story = {
  name: 'With Options Menu',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showOptionsButton: true,
    optionsMenuItems: [
      {
        label: 'Opción 1',
        value: 'option-1',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      },
      {
        label: 'Opción 2',
        value: 'option-2',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      },
      {
        label: 'Opción 3',
        value: 'option-3',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      }
    ],
    onOptionsClick: (e) => {
      console.log('Botón de opciones clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con botón de opciones y menú dropdown.',
      },
    },
  },
};

/**
 * WithBreadcrumb
 * Con breadcrumb
 */
export const WithBreadcrumb: Story = {
  name: 'With Breadcrumb',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showBreadcrumb: true,
    breadcrumbItems: [
      {
        id: 'home',
        label: 'Home',
        url: '#',
        onClick: (e) => {
          console.log('Home clicked');
        }
      },
      {
        id: 'current',
        label: 'Current Product'
      }
    ],
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con breadcrumb.',
      },
    },
  },
};

/**
 * WithBreadcrumbMultipleItems
 * Con breadcrumb de múltiples items
 */
export const WithBreadcrumbMultipleItems: Story = {
  name: 'With Breadcrumb - Multiple Items',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showBreadcrumb: true,
    breadcrumbItems: [
      {
        id: 'home',
        label: 'Home',
        url: '#',
        onClick: (e) => {
          console.log('Home clicked');
        }
      },
      {
        id: 'products',
        label: 'Products',
        url: '#',
        onClick: (e) => {
          console.log('Products clicked');
        }
      },
      {
        id: 'category',
        label: 'Category',
        url: '#',
        onClick: (e) => {
          console.log('Category clicked');
        }
      },
      {
        id: 'current',
        label: 'Current Product'
      }
    ],
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con breadcrumb de múltiples items.',
      },
    },
  },
};

/**
 * CompleteExample
 * Ejemplo completo con todas las opciones
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: true,
    showInfoButton: true,
    infoTooltipText: 'Información adicional sobre el producto',
    showStatusTag: true,
    statusTagLabel: 'Active',
    statusTagStatus: 'active',
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: true,
    showPrimaryAction: true,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    showOptionsButton: true,
    optionsMenuItems: [
      {
        label: 'Opción 1',
        value: 'option-1',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      },
      {
        label: 'Opción 2',
        value: 'option-2',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      }
    ],
    showBreadcrumb: true,
    breadcrumbItems: [
      {
        id: 'home',
        label: 'Home',
        url: '#',
        onClick: (e) => {
          console.log('Home clicked');
        }
      },
      {
        id: 'products',
        label: 'Products',
        url: '#',
        onClick: (e) => {
          console.log('Products clicked');
        }
      },
      {
        id: 'current',
        label: 'Current Product'
      }
    ],
    onBackClick: (e) => {
      alert('Botón de atrás clickeado');
    },
    onInfoClick: (e) => {
      alert('Botón de información clickeado');
    },
    onSecondaryButtonClick: (e) => {
      alert('Botón secundario clickeado');
    },
    onOptionsClick: (e) => {
      console.log('Botón de opciones clickeado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection completo con todas las opciones configuradas: título, botón de atrás, información, status tag, acciones, botón secundario, botón de opciones y breadcrumb.',
      },
    },
  },
};

/**
 * MinimalExample
 * Ejemplo mínimo (solo título)
 */
export const MinimalExample: Story = {
  name: 'Minimal Example',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection mínimo con solo título.',
      },
    },
  },
};

/**
 * ActionsOnly
 * Solo acciones (sin título)
 */
export const ActionsOnly: Story = {
  name: 'Actions Only',
  args: {
    title: '',
    showTitle: false,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: true,
    showAction1: true,
    showAction2: true,
    showAction3: false,
    showPrimaryAction: true,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection solo con acciones, sin título.',
      },
    },
  },
};

/**
 * TitleWithActions
 * Título con acciones
 */
export const TitleWithActions: Story = {
  name: 'Title with Actions',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: true,
    showAIAction: false,
    showAction1: true,
    showAction2: true,
    showAction3: false,
    showPrimaryAction: true,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título y acciones.',
      },
    },
  },
};

/**
 * LongTitle
 * Título largo
 */
export const LongTitle: Story = {
  name: 'Long Title',
  args: {
    title: 'Este es un título muy largo que debería truncarse correctamente en el header para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con título largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * OnBackClick
 * Con handler onBackClick
 */
export const OnBackClick: Story = {
  name: 'OnBackClick Handler',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: true,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    onBackClick: (e) => {
      alert('Botón de atrás clickeado');
      console.log('onBackClick handler ejecutado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con handler onBackClick. Muestra un alert cuando se hace click en el botón de atrás.',
      },
    },
  },
};

/**
 * OnInfoClick
 * Con handler onInfoClick
 */
export const OnInfoClick: Story = {
  name: 'OnInfoClick Handler',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: true,
    infoTooltipText: 'Información adicional',
    showStatusTag: false,
    showActions: false,
    onInfoClick: (e) => {
      alert('Botón de información clickeado');
      console.log('onInfoClick handler ejecutado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con handler onInfoClick. Muestra un alert cuando se hace click en el botón de información.',
      },
    },
  },
};

/**
 * OnSecondaryButtonClick
 * Con handler onSecondaryButtonClick
 */
export const OnSecondaryButtonClick: Story = {
  name: 'OnSecondaryButtonClick Handler',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    onSecondaryButtonClick: (e) => {
      alert('Botón secundario clickeado');
      console.log('onSecondaryButtonClick handler ejecutado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con handler onSecondaryButtonClick. Muestra un alert cuando se hace click en el botón secundario.',
      },
    },
  },
};

/**
 * OnOptionsClick
 * Con handler onOptionsClick
 */
export const OnOptionsClick: Story = {
  name: 'OnOptionsClick Handler',
  args: {
    title: 'Nombre del Producto',
    showTitle: true,
    showBackButton: false,
    showInfoButton: false,
    showStatusTag: false,
    showActions: false,
    showOptionsButton: true,
    optionsMenuItems: [
      {
        label: 'Opción 1',
        value: 'option-1',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      },
      {
        label: 'Opción 2',
        value: 'option-2',
        onClick: (e, data) => {
          alert(`Opción seleccionada: ${data.label}`);
        }
      }
    ],
    onOptionsClick: (e) => {
      console.log('onOptionsClick handler ejecutado');
    },
  },
  render: (args) => renderHeaderSectionStory(args as any),
  parameters: {
    docs: {
      description: {
        story: 'HeaderSection con handler onOptionsClick. Registra en consola cuando se hace click en el botón de opciones.',
      },
    },
  },
};
