import type { Meta, StoryObj } from '@storybook/html';
import { createHeaderSection } from '../../addons/header-section/src/HeaderSectionProvider';
import type { HeaderSectionOptions, HeaderSectionAction } from '../../addons/header-section/src/types/HeaderSectionOptions';

/**
 * HeaderSection Component Stories
 * 
 * Componente de encabezado de sección con título y acciones.
 * Incluye título (heading h2), botón de información con tooltip (sm),
 * y acciones (botones md). Todo es apagable/prendible con controladores.
 */
const meta = {
  title: 'Components/HeaderSection',
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
      description: 'Mostrar el título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showActions: {
      control: { type: 'boolean' },
      description: 'Mostrar las acciones (botones md)',
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
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar el status tag (al lado del botón de información)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    statusTagLabel: {
      control: { type: 'text' },
      description: 'Label del status tag',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    statusTagStatus: {
      control: { type: 'select' },
      options: ['completed', 'published', 'fulfilled', 'created', 'active', 'not-fulfilled', 'denied', 'draft', 'in-progress', 'syncing', 'pending', 'pending-approval', 'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'],
      description: 'Estado del status tag',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pending' }
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
    showSecondaryButton: true,
    secondaryButtonText: 'Button text',
    secondaryButtonIcon: 'grid',
    showOptionsButton: true,
    actions: [
      {
        id: 'ai-button',
        text: 'AI button',
        variant: 'secondary',
        icon: 'sparkles',
        iconStyle: 'regular',
        onClick: (e) => {
          console.log('AI button clicked', e);
        }
      },
      {
        id: 'action-1',
        text: 'Button text',
        variant: 'secondary',
        icon: 'grid',
        iconStyle: 'regular',
        onClick: (e) => {
          console.log('Action 1 clicked', e);
        }
      },
      {
        id: 'action-2',
        text: 'Button text',
        variant: 'secondary',
        icon: 'grid',
        iconStyle: 'regular',
        onClick: (e) => {
          console.log('Action 2 clicked', e);
        }
      },
      {
        id: 'primary-action',
        text: 'Primary action',
        variant: 'primary',
        icon: 'grid',
        iconStyle: 'regular',
        onClick: (e) => {
          console.log('Primary action clicked', e);
        }
      }
    ] as HeaderSectionAction[]
  } as HeaderSectionOptions,
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
      background: var(--ubits-bg-2);
      border-radius: var(--ubits-radius-md, 8px);
      font-size: 13px;
      color: var(--ubits-fg-2-medium);
    `;
    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold); color: var(--ubits-fg-1-high);">Información del HeaderSection</h3>
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
        <div><strong>Número de acciones:</strong> ${args.actions?.length || 0}</div>
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

        createHeaderSection({
          ...args,
          container: container,
          statusTag: statusTagOptions,
          onBackClick: (e) => {
            console.log('Back button clicked', e);
          },
          onInfoClick: (e) => {
            console.log('Info button clicked', e);
          },
          onSecondaryButtonClick: (e) => {
            console.log('Secondary button clicked', e);
          },
          onOptionsClick: (e) => {
            console.log('Options button clicked', e);
          }
        });
      } catch (error) {
        console.error('Error creating HeaderSection:', error);
        container.innerHTML = `<div style="color: var(--ubits-feedback-fg-error); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    });

    return container;
  }
};
