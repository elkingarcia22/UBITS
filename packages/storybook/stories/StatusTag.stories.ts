import type { Meta, StoryObj } from '@storybook/html';
import { renderStatusTag } from '../../components/status-tag/src/StatusTagProvider';
import type { StatusTagOptions } from '../../components/status-tag/src/types/StatusTagOptions';
import '../../components/status-tag/src/styles/status-tag.css';

const meta: Meta<StatusTagOptions> = {
  title: 'Básicos/Status Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Status Tag UBITS para mostrar estados con icono izquierdo opcional, texto y icono derecho opcional. Múltiples estados con colores diferenciados usando tokens UBITS. Border-radius de 4px, padding 4px vertical y 8px horizontal.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del estado',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Completado' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md'],
      description: 'Tamaño del tag (XS: body-xs 11px, SM: body-sm 13px, MD: body-md 16px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md' },
        category: 'Apariencia',
      },
    },
    status: {
      control: { type: 'select' },
      options: [
        'completed', 'published', 'fulfilled', 'created', 'active',
        'not-fulfilled', 'denied',
        'draft', 'in-progress', 'syncing',
        'pending', 'pending-approval',
        'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'
      ],
      description: 'Estado/variante del tag (determina el color según Figma)',
      table: {
        defaultValue: { summary: 'completed' },
        type: { summary: 'completed | published | fulfilled | created | active | not-fulfilled | denied | draft | in-progress | syncing | pending | pending-approval | not-started | finished | archived | disabled | paused | hidden' },
        category: 'Estado',
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome izquierdo (ej: "grid-2"). Dejar vacío para ocultar el icono izquierdo.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'grid-2' },
        category: 'Iconos',
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome derecho (ej: "chevron-down"). Dejar vacío para ocultar el icono derecho.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'chevron-down' },
        category: 'Iconos',
      },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Si el tag es clickeable (añade estilos hover/active y cursor pointer)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic (solo si clickable es true)',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatusTagOptions>;

export const Default: Story = {
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'grid-2',
    rightIcon: 'chevron-down',
    clickable: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const statusTagContainer = document.createElement('div');
    // Manejar leftIcon y rightIcon: si están vacíos o son null, usar undefined
    const leftIconValue = args.leftIcon && args.leftIcon.trim() !== '' ? args.leftIcon : undefined;
    const rightIconValue = args.rightIcon && args.rightIcon.trim() !== '' ? args.rightIcon : undefined;
    
    statusTagContainer.innerHTML = renderStatusTag({
      ...args,
      leftIcon: leftIconValue,
      rightIcon: rightIconValue,
    });
    
    // Agregar event listener si es clickeable
    if (args.clickable) {
      const tag = statusTagContainer.querySelector('.ubits-status-tag') as HTMLElement;
      if (tag) {
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          if (args.onClick) {
            args.onClick(e as any);
          } else {
            // Status Tag clicked
          }
        });
        tag.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (args.onClick) {
              args.onClick(e as any);
            } else {
              // Status Tag clicked
            }
          }
        });
      }
    }
    
    preview.appendChild(statusTagContainer);
    container.appendChild(preview);
    
    return container;
  },
};

// Helper para renderizar Status Tag de manera consistente
function renderStatusTagStory(options: Partial<StatusTagOptions>) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.justifyContent = 'center';
  preview.style.alignItems = 'center';
  preview.style.padding = '48px';
  preview.style.minHeight = '120px';
  preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  preview.style.borderRadius = '8px';
  preview.style.marginBottom = '20px';
  
  const statusTagContainer = document.createElement('div');
  const leftIconValue = options.leftIcon && String(options.leftIcon).trim() !== '' ? options.leftIcon : undefined;
  const rightIconValue = options.rightIcon !== null && options.rightIcon !== undefined && String(options.rightIcon).trim() !== '' ? options.rightIcon : undefined;
  
  statusTagContainer.innerHTML = renderStatusTag({
    ...options,
    leftIcon: leftIconValue,
    rightIcon: rightIconValue,
  } as StatusTagOptions);
  
  if (options.clickable) {
    const tag = statusTagContainer.querySelector('.ubits-status-tag') as HTMLElement;
    if (tag) {
      tag.setAttribute('role', 'button');
      tag.setAttribute('tabindex', '0');
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        if (options.onClick) {
          options.onClick(e as any);
        }
      });
      tag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (options.onClick) {
            options.onClick(e as any);
          }
        }
      });
    }
  }
  
  preview.appendChild(statusTagContainer);
  container.appendChild(preview);
  return container;
}

/**
 * SizeXS
 * Status Tag tamaño extra small (11px)
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    label: 'Completado',
    size: 'xs',
    status: 'completed',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag tamaño extra small (11px).',
      },
    },
  },
};

/**
 * SizeSM
 * Status Tag tamaño small (13px)
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    label: 'Completado',
    size: 'sm',
    status: 'completed',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag tamaño small (13px).',
      },
    },
  },
};

/**
 * SizeMD
 * Status Tag tamaño medium (16px, default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag tamaño medium (16px, valor por defecto).',
      },
    },
  },
};

/**
 * StatusGreen
 * Estados verdes (success)
 */
export const StatusGreen: Story = {
  name: 'Status - Green (Success)',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const greenStatuses: Array<StatusTagOptions['status']> = ['completed', 'published', 'fulfilled', 'created', 'active'];
    
    greenStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: status || 'Completado',
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Estados verdes (success): completed, published, fulfilled, created, active.',
      },
    },
  },
};

/**
 * StatusRed
 * Estados rojos (error)
 */
export const StatusRed: Story = {
  name: 'Status - Red (Error)',
  args: {
    label: 'Denegado',
    size: 'md',
    status: 'denied',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const redStatuses: Array<StatusTagOptions['status']> = ['not-fulfilled', 'denied'];
    
    redStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: status === 'not-fulfilled' ? 'No cumplido' : 'Denegado',
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Estados rojos (error): not-fulfilled, denied.',
      },
    },
  },
};

/**
 * StatusBlue
 * Estados azules (info)
 */
export const StatusBlue: Story = {
  name: 'Status - Blue (Info)',
  args: {
    label: 'Borrador',
    size: 'md',
    status: 'draft',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const blueStatuses: Array<StatusTagOptions['status']> = ['draft', 'in-progress', 'syncing'];
    const blueLabels: Record<string, string> = {
      'draft': 'Borrador',
      'in-progress': 'En progreso',
      'syncing': 'Sincronizando'
    };
    
    blueStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: blueLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Estados azules (info): draft, in-progress, syncing.',
      },
    },
  },
};

/**
 * StatusOrange
 * Estados naranjas/amarillos (warning)
 */
export const StatusOrange: Story = {
  name: 'Status - Orange (Warning)',
  args: {
    label: 'Pendiente',
    size: 'md',
    status: 'pending',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const orangeStatuses: Array<StatusTagOptions['status']> = ['pending', 'pending-approval'];
    const orangeLabels: Record<string, string> = {
      'pending': 'Pendiente',
      'pending-approval': 'Pendiente aprobación'
    };
    
    orangeStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: orangeLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Estados naranjas/amarillos (warning): pending, pending-approval.',
      },
    },
  },
};

/**
 * StatusGray
 * Estados grises (neutral)
 */
export const StatusGray: Story = {
  name: 'Status - Gray (Neutral)',
  args: {
    label: 'No iniciado',
    size: 'md',
    status: 'not-started',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const grayStatuses: Array<StatusTagOptions['status']> = ['not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'];
    const grayLabels: Record<string, string> = {
      'not-started': 'No iniciado',
      'finished': 'Finalizado',
      'archived': 'Archivado',
      'disabled': 'Deshabilitado',
      'paused': 'Pausado',
      'hidden': 'Oculto'
    };
    
    grayStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: grayLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Estados grises (neutral): not-started, finished, archived, disabled, paused, hidden.',
      },
    },
  },
};

/**
 * WithLeftIcon
 * Status Tag con icono izquierdo
 */
export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'check',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag con icono izquierdo.',
      },
    },
  },
};

/**
 * WithRightIcon
 * Status Tag con icono derecho
 */
export const WithRightIcon: Story = {
  name: 'With Right Icon',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    rightIcon: 'chevron-down',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag con icono derecho.',
      },
    },
  },
};

/**
 * WithBothIcons
 * Status Tag con icono izquierdo y derecho
 */
export const WithBothIcons: Story = {
  name: 'With Both Icons',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'check',
    rightIcon: 'chevron-down',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag con icono izquierdo y derecho.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Status Tag sin iconos
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: undefined,
    rightIcon: null,
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag sin iconos, solo texto.',
      },
    },
  },
};

/**
 * Clickable
 * Status Tag clickeable
 */
export const Clickable: Story = {
  name: 'Clickable',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    clickable: true,
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag clickeable (añade estilos hover/active y cursor pointer).',
      },
    },
  },
};

/**
 * OnClickCallback
 * Status Tag con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    label: 'Haz clic aquí',
    size: 'md',
    status: 'completed',
    clickable: true,
  },
  render: (args) => {
    const options: Partial<StatusTagOptions> = {
      ...args,
      onClick: () => {
        alert('Status Tag clickeado');
        console.log('Status Tag clicked');
      }
    };
    return renderStatusTagStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Status Tag con callback onClick que se ejecuta cuando se hace clic.',
      },
    },
  },
};

/**
 * AllSizes
 * Todos los tamaños
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const sizes: Array<StatusTagOptions['size']> = ['xs', 'sm', 'md'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.display = 'flex';
      sizeContainer.style.flexDirection = 'column';
      sizeContainer.style.alignItems = 'center';
      sizeContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size?.toUpperCase() || 'default';
      
      sizeContainer.innerHTML = renderStatusTag({
        ...args,
        size: size
      } as StatusTagOptions);
      
      sizeContainer.insertBefore(label, sizeContainer.firstChild);
      preview.appendChild(sizeContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs: 11px, sm: 13px, md: 16px).',
      },
    },
  },
};

/**
 * AllStatusGreen
 * Todos los estados verdes
 */
export const AllStatusGreen: Story = {
  name: 'All Status - Green',
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const greenStatuses: Array<StatusTagOptions['status']> = ['completed', 'published', 'fulfilled', 'created', 'active'];
    
    greenStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: status || 'Completado',
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados verdes (success) disponibles.',
      },
    },
  },
};

/**
 * AllStatusRed
 * Todos los estados rojos
 */
export const AllStatusRed: Story = {
  name: 'All Status - Red',
  args: {
    label: 'Denegado',
    size: 'md',
    status: 'denied',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const redStatuses: Array<StatusTagOptions['status']> = ['not-fulfilled', 'denied'];
    
    redStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: status === 'not-fulfilled' ? 'No cumplido' : 'Denegado',
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados rojos (error) disponibles.',
      },
    },
  },
};

/**
 * AllStatusBlue
 * Todos los estados azules
 */
export const AllStatusBlue: Story = {
  name: 'All Status - Blue',
  args: {
    label: 'Borrador',
    size: 'md',
    status: 'draft',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const blueStatuses: Array<StatusTagOptions['status']> = ['draft', 'in-progress', 'syncing'];
    const blueLabels: Record<string, string> = {
      'draft': 'Borrador',
      'in-progress': 'En progreso',
      'syncing': 'Sincronizando'
    };
    
    blueStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: blueLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados azules (info) disponibles.',
      },
    },
  },
};

/**
 * AllStatusOrange
 * Todos los estados naranjas
 */
export const AllStatusOrange: Story = {
  name: 'All Status - Orange',
  args: {
    label: 'Pendiente',
    size: 'md',
    status: 'pending',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const orangeStatuses: Array<StatusTagOptions['status']> = ['pending', 'pending-approval'];
    const orangeLabels: Record<string, string> = {
      'pending': 'Pendiente',
      'pending-approval': 'Pendiente aprobación'
    };
    
    orangeStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: orangeLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados naranjas/amarillos (warning) disponibles.',
      },
    },
  },
};

/**
 * AllStatusGray
 * Todos los estados grises
 */
export const AllStatusGray: Story = {
  name: 'All Status - Gray',
  args: {
    label: 'No iniciado',
    size: 'md',
    status: 'not-started',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexWrap = 'wrap';
    preview.style.gap = '12px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const grayStatuses: Array<StatusTagOptions['status']> = ['not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'];
    const grayLabels: Record<string, string> = {
      'not-started': 'No iniciado',
      'finished': 'Finalizado',
      'archived': 'Archivado',
      'disabled': 'Deshabilitado',
      'paused': 'Pausado',
      'hidden': 'Oculto'
    };
    
    grayStatuses.forEach(status => {
      const statusTagContainer = document.createElement('div');
      statusTagContainer.innerHTML = renderStatusTag({
        label: grayLabels[status] || status,
        size: 'md',
        status: status,
      } as StatusTagOptions);
      preview.appendChild(statusTagContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados grises (neutral) disponibles.',
      },
    },
  },
};

/**
 * AllStatuses
 * Todos los estados disponibles
 */
export const AllStatuses: Story = {
  name: 'All Statuses',
  args: {
    label: 'Estado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '24px';
    preview.style.padding = '48px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const allStatuses: Array<StatusTagOptions['status']> = [
      'completed', 'published', 'fulfilled', 'created', 'active',
      'not-fulfilled', 'denied',
      'draft', 'in-progress', 'syncing',
      'pending', 'pending-approval',
      'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'
    ];
    
    const statusLabels: Record<string, string> = {
      'completed': 'Completado',
      'published': 'Publicado',
      'fulfilled': 'Cumplido',
      'created': 'Creado',
      'active': 'Activo',
      'not-fulfilled': 'No cumplido',
      'denied': 'Denegado',
      'draft': 'Borrador',
      'in-progress': 'En progreso',
      'syncing': 'Sincronizando',
      'pending': 'Pendiente',
      'pending-approval': 'Pendiente aprobación',
      'not-started': 'No iniciado',
      'finished': 'Finalizado',
      'archived': 'Archivado',
      'disabled': 'Deshabilitado',
      'paused': 'Pausado',
      'hidden': 'Oculto'
    };
    
    // Agrupar por categorías
    const categories = [
      { name: 'Verde (Success)', statuses: ['completed', 'published', 'fulfilled', 'created', 'active'] },
      { name: 'Rojo (Error)', statuses: ['not-fulfilled', 'denied'] },
      { name: 'Azul (Info)', statuses: ['draft', 'in-progress', 'syncing'] },
      { name: 'Naranja (Warning)', statuses: ['pending', 'pending-approval'] },
      { name: 'Gris (Neutral)', statuses: ['not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'] }
    ];
    
    categories.forEach(category => {
      const categoryContainer = document.createElement('div');
      categoryContainer.style.display = 'flex';
      categoryContainer.style.flexDirection = 'column';
      categoryContainer.style.gap = '12px';
      
      const categoryLabel = document.createElement('div');
      categoryLabel.style.fontSize = '14px';
      categoryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
      categoryLabel.style.fontWeight = '600';
      categoryLabel.style.marginBottom = '8px';
      categoryLabel.textContent = category.name;
      
      const statusesContainer = document.createElement('div');
      statusesContainer.style.display = 'flex';
      statusesContainer.style.flexWrap = 'wrap';
      statusesContainer.style.gap = '12px';
      
      category.statuses.forEach(status => {
        const statusTagContainer = document.createElement('div');
        statusTagContainer.innerHTML = renderStatusTag({
          label: statusLabels[status] || status,
          size: 'md',
          status: status,
        } as StatusTagOptions);
        statusesContainer.appendChild(statusTagContainer);
      });
      
      categoryContainer.appendChild(categoryLabel);
      categoryContainer.appendChild(statusesContainer);
      preview.appendChild(categoryContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estados disponibles agrupados por categorías de color.',
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
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'check',
    rightIcon: 'chevron-down',
    clickable: true,
  },
  render: (args) => {
    const options: Partial<StatusTagOptions> = {
      ...args,
      onClick: () => {
        console.log('Status Tag clicked');
      }
    };
    return renderStatusTagStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Status Tag completo con todas las opciones: tamaño, estado, iconos, clickable y callback onClick.',
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
    label: 'Completado',
    size: 'md',
    status: 'completed',
  },
  render: (args) => renderStatusTagStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Status Tag mínimo con solo label, tamaño y estado.',
      },
    },
  },
};

