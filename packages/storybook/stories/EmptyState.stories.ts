import type { Meta, StoryObj } from '@storybook/html';
import { renderEmptyState, createEmptyState } from '../../components/empty-state/src/EmptyStateProvider';
import type { EmptyStateOptions } from '../../components/empty-state/src/types/EmptyStateOptions';
import '../../components/empty-state/src/styles/empty-state.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<EmptyStateOptions> = {
  title: 'Feedback/Empty State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del empty state',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descripción o mensaje del empty state',
      table: {
        type: { summary: 'string' },
        category: 'Contenido',
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: 'URL de la imagen/ilustración (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Visual',
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)',
      table: {
        type: { summary: 'string' },
        category: 'Visual',
      },
    },
    actionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción principal (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'Botón Primario',
      },
    },
    primaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón primario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Primario',
      },
    },
    showPrimaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón primario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'Botón Primario',
      },
    },
    secondaryActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'Botón Secundario',
      },
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
        category: 'Botón Secundario',
      },
    },
    showSecondaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón secundario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'Botón Secundario',
      },
    },
  },
};

export default meta;
type Story = StoryObj<EmptyStateOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'inbox',
    actionLabel: 'Buscar',
    showPrimaryButton: false,
    primaryButtonIcon: 'search',
    showPrimaryButtonIcon: false,
    secondaryActionLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false,
  },
  render: (args) => {
    // Contenedor principal
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.minHeight = '400px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    preview.style.width = '100%';
    
    // Renderizar el empty state directamente en el preview
    preview.innerHTML = renderEmptyState(args);
    
    // Asegurar que el componente empty-state tenga los estilos correctos
    const emptyStateElement = preview.querySelector('.ubits-empty-state') as HTMLElement;
    if (emptyStateElement) {
      emptyStateElement.style.width = '100%';
      emptyStateElement.style.maxWidth = '100%';
      emptyStateElement.style.display = 'flex';
      emptyStateElement.style.flexDirection = 'column';
      emptyStateElement.style.alignItems = 'center';
      emptyStateElement.style.justifyContent = 'center';
      emptyStateElement.style.textAlign = 'center';
    }
    
    // Asegurar que el contenido también esté centrado
    const contentElement = preview.querySelector('.ubits-empty-state__content') as HTMLElement;
    if (contentElement) {
      contentElement.style.display = 'flex';
      contentElement.style.flexDirection = 'column';
      contentElement.style.alignItems = 'center';
      contentElement.style.textAlign = 'center';
      contentElement.style.width = '100%';
    }
    
    // Asegurar que las acciones estén centradas
    const actionsElement = preview.querySelector('.ubits-empty-state__actions') as HTMLElement;
    if (actionsElement) {
      actionsElement.style.display = 'flex';
      actionsElement.style.justifyContent = 'center';
      actionsElement.style.alignItems = 'center';
    }
    
    container.appendChild(preview);
    
    return container;
  },
};

// Helper para renderizar Empty State de manera consistente
function renderEmptyStateStory(options: EmptyStateOptions) {
  const container = document.createElement('div');
  container.style.padding = '40px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
  container.style.borderRadius = '8px';
  container.style.width = '100%';
  container.style.boxSizing = 'border-box';
  
  const preview = document.createElement('div');
  preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  preview.style.padding = '48px';
  preview.style.borderRadius = '8px';
  preview.style.border = 'none';
  preview.style.minHeight = '400px';
  preview.style.display = 'flex';
  preview.style.alignItems = 'center';
  preview.style.justifyContent = 'center';
  preview.style.boxSizing = 'border-box';
  preview.style.width = '100%';
  
  const emptyStateElement = createEmptyState(options);
  preview.appendChild(emptyStateElement);
  
  const emptyState = preview.querySelector('.ubits-empty-state') as HTMLElement;
  if (emptyState) {
    emptyState.style.width = '100%';
    emptyState.style.maxWidth = '100%';
    emptyState.style.display = 'flex';
    emptyState.style.flexDirection = 'column';
    emptyState.style.alignItems = 'center';
    emptyState.style.justifyContent = 'center';
    emptyState.style.textAlign = 'center';
  }
  
  const contentElement = preview.querySelector('.ubits-empty-state__content') as HTMLElement;
  if (contentElement) {
    contentElement.style.display = 'flex';
    contentElement.style.flexDirection = 'column';
    contentElement.style.alignItems = 'center';
    contentElement.style.textAlign = 'center';
    contentElement.style.width = '100%';
  }
  
  const actionsElement = preview.querySelector('.ubits-empty-state__actions') as HTMLElement;
  if (actionsElement) {
    actionsElement.style.display = 'flex';
    actionsElement.style.justifyContent = 'center';
    actionsElement.style.alignItems = 'center';
    actionsElement.style.gap = '8px';
  }
  
  container.appendChild(preview);
  return container;
}

/**
 * WithIcon
 * Empty State con icono
 */
export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'inbox',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con icono FontAwesome.',
      },
    },
  },
};

/**
 * WithImage
 * Empty State con imagen
 */
export const WithImage: Story = {
  name: 'With Image',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    imageUrl: 'https://via.placeholder.com/200x200?text=Empty+State',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con imagen/ilustración.',
      },
    },
  },
};

/**
 * WithoutVisual
 * Empty State sin icono ni imagen
 */
export const WithoutVisual: Story = {
  name: 'Without Visual',
  args: {
    title: 'No hay contenido',
    description: 'Este empty state no tiene icono ni imagen',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State sin icono ni imagen, solo texto.',
      },
    },
  },
};

/**
 * WithDescription
 * Empty State con descripción
 */
export const WithDescription: Story = {
  name: 'With Description',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda para encontrar lo que buscas',
    icon: 'search',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con título y descripción.',
      },
    },
  },
};

/**
 * WithoutDescription
 * Empty State sin descripción
 */
export const WithoutDescription: Story = {
  name: 'Without Description',
  args: {
    title: 'No hay datos',
    icon: 'inbox',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State sin descripción, solo con título.',
      },
    },
  },
};

/**
 * PrimaryButtonOnly
 * Empty State solo con botón primario
 */
export const PrimaryButtonOnly: Story = {
  name: 'Primary Button Only',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    showPrimaryButton: true,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State solo con botón primario.',
      },
    },
  },
};

/**
 * SecondaryButtonOnly
 * Empty State solo con botón secundario
 */
export const SecondaryButtonOnly: Story = {
  name: 'Secondary Button Only',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    secondaryActionLabel: 'Cancelar',
    showPrimaryButton: false,
    showSecondaryButton: true
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State solo con botón secundario.',
      },
    },
  },
};

/**
 * BothButtons
 * Empty State con ambos botones
 */
export const BothButtons: Story = {
  name: 'Both Buttons',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    secondaryActionLabel: 'Cancelar',
    showPrimaryButton: true,
    showSecondaryButton: true
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con botón primario y secundario.',
      },
    },
  },
};

/**
 * WithoutButtons
 * Empty State sin botones
 */
export const WithoutButtons: Story = {
  name: 'Without Buttons',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State sin botones de acción.',
      },
    },
  },
};

/**
 * PrimaryButtonWithIcon
 * Botón primario con icono
 */
export const PrimaryButtonWithIcon: Story = {
  name: 'Primary Button With Icon',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    primaryButtonIcon: 'search',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con botón primario que incluye icono.',
      },
    },
  },
};

/**
 * SecondaryButtonWithIcon
 * Botón secundario con icono
 */
export const SecondaryButtonWithIcon: Story = {
  name: 'Secondary Button With Icon',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    secondaryActionLabel: 'Cancelar',
    secondaryButtonIcon: 'times',
    showPrimaryButton: false,
    showSecondaryButton: true,
    showSecondaryButtonIcon: true
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con botón secundario que incluye icono.',
      },
    },
  },
};

/**
 * BothButtonsWithIcons
 * Ambos botones con iconos
 */
export const BothButtonsWithIcons: Story = {
  name: 'Both Buttons With Icons',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    primaryButtonIcon: 'search',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    secondaryActionLabel: 'Cancelar',
    secondaryButtonIcon: 'times',
    showSecondaryButton: true,
    showSecondaryButtonIcon: true
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con ambos botones incluyendo iconos.',
      },
    },
  },
};

/**
 * OnActionCallback
 * Con callback onAction
 */
export const OnActionCallback: Story = {
  name: 'OnAction Callback',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    showPrimaryButton: true,
    showSecondaryButton: false
  },
  render: (args) => {
    const options: EmptyStateOptions = {
      ...args,
      onAction: () => {
        alert('Botón primario clickeado');
        console.log('Primary action clicked');
      }
    };
    return renderEmptyStateStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty State con callback onAction en el botón primario.',
      },
    },
  },
};

/**
 * OnSecondaryActionCallback
 * Con callback onSecondaryAction
 */
export const OnSecondaryActionCallback: Story = {
  name: 'OnSecondaryAction Callback',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    secondaryActionLabel: 'Cancelar',
    showPrimaryButton: false,
    showSecondaryButton: true
  },
  render: (args) => {
    const options: EmptyStateOptions = {
      ...args,
      onSecondaryAction: () => {
        alert('Botón secundario clickeado');
        console.log('Secondary action clicked');
      }
    };
    return renderEmptyStateStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty State con callback onSecondaryAction en el botón secundario.',
      },
    },
  },
};

/**
 * BothCallbacks
 * Con ambos callbacks
 */
export const BothCallbacks: Story = {
  name: 'Both Callbacks',
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'search',
    actionLabel: 'Buscar',
    secondaryActionLabel: 'Cancelar',
    showPrimaryButton: true,
    showSecondaryButton: true
  },
  render: (args) => {
    const options: EmptyStateOptions = {
      ...args,
      onAction: () => {
        alert('Botón primario clickeado');
        console.log('Primary action clicked');
      },
      onSecondaryAction: () => {
        alert('Botón secundario clickeado');
        console.log('Secondary action clicked');
      }
    };
    return renderEmptyStateStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty State con callbacks en ambos botones.',
      },
    },
  },
};

/**
 * IconSizeSmall
 * Icono tamaño small
 */
export const IconSizeSmall: Story = {
  name: 'Icon Size - Small',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    iconSize: 'sm',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con icono tamaño small.',
      },
    },
  },
};

/**
 * IconSizeMedium
 * Icono tamaño medium
 */
export const IconSizeMedium: Story = {
  name: 'Icon Size - Medium',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    iconSize: 'md',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con icono tamaño medium.',
      },
    },
  },
};

/**
 * IconSizeLarge
 * Icono tamaño large (default)
 */
export const IconSizeLarge: Story = {
  name: 'Icon Size - Large (Default)',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    iconSize: 'lg',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con icono tamaño large (valor por defecto).',
      },
    },
  },
};

/**
 * IconSizeXLarge
 * Icono tamaño xlarge
 */
export const IconSizeXLarge: Story = {
  name: 'Icon Size - XLarge',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento',
    icon: 'inbox',
    iconSize: 'xl',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State con icono tamaño xlarge.',
      },
    },
  },
};

/**
 * NoData
 * Empty State para "No hay datos"
 */
export const NoData: Story = {
  name: 'No Data',
  args: {
    title: 'No hay datos',
    description: 'Aún no has creado ningún elemento. Comienza creando tu primer elemento.',
    icon: 'inbox',
    actionLabel: 'Crear elemento',
    primaryButtonIcon: 'plus',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State para cuando no hay datos disponibles.',
      },
    },
  },
};

/**
 * NoSearchResults
 * Empty State para "No hay resultados de búsqueda"
 */
export const NoSearchResults: Story = {
  name: 'No Search Results',
  args: {
    title: 'No se encontraron resultados',
    description: 'Intenta ajustar tus filtros de búsqueda para encontrar lo que buscas',
    icon: 'search',
    actionLabel: 'Limpiar filtros',
    primaryButtonIcon: 'times',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State para cuando no hay resultados de búsqueda.',
      },
    },
  },
};

/**
 * NoFilterResults
 * Empty State para "No hay resultados de filtros"
 */
export const NoFilterResults: Story = {
  name: 'No Filter Results',
  args: {
    title: 'No hay resultados con los filtros aplicados',
    description: 'Intenta ajustar o quitar algunos filtros para ver más resultados',
    icon: 'filter',
    actionLabel: 'Limpiar filtros',
    secondaryActionLabel: 'Ver todos',
    primaryButtonIcon: 'times',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    showSecondaryButton: true,
    showSecondaryButtonIcon: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State para cuando no hay resultados con los filtros aplicados.',
      },
    },
  },
};

/**
 * ErrorState
 * Empty State para estado de error
 */
export const ErrorState: Story = {
  name: 'Error State',
  args: {
    title: 'Error al cargar los datos',
    description: 'Ocurrió un error al intentar cargar los datos. Por favor, intenta nuevamente.',
    icon: 'exclamation-triangle',
    actionLabel: 'Reintentar',
    primaryButtonIcon: 'redo',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State para mostrar un estado de error.',
      },
    },
  },
};

/**
 * SuccessState
 * Empty State para estado de éxito
 */
export const SuccessState: Story = {
  name: 'Success State',
  args: {
    title: '¡Todo está listo!',
    description: 'Has completado todas las tareas pendientes',
    icon: 'check-circle',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State para mostrar un estado de éxito.',
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
    title: 'No hay datos',
    showPrimaryButton: false,
    showSecondaryButton: false
  },
  render: (args) => renderEmptyStateStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Empty State mínimo con solo título.',
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
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda para encontrar lo que buscas',
    icon: 'search',
    iconSize: 'lg',
    actionLabel: 'Buscar',
    primaryButtonIcon: 'search',
    showPrimaryButton: true,
    showPrimaryButtonIcon: true,
    secondaryActionLabel: 'Cancelar',
    secondaryButtonIcon: 'times',
    showSecondaryButton: true,
    showSecondaryButtonIcon: true
  },
  render: (args) => {
    const options: EmptyStateOptions = {
      ...args,
      onAction: () => {
        console.log('Primary action clicked');
      },
      onSecondaryAction: () => {
        console.log('Secondary action clicked');
      }
    };
    return renderEmptyStateStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty State completo con todas las opciones: icono, título, descripción, ambos botones con iconos y callbacks.',
      },
    },
  },
};

