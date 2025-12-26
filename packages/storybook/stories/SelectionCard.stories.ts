import type { Meta, StoryObj } from '@storybook/html';
import { renderSelectionCard, createSelectionCard, loadSelectionCards } from '../../components/selection-card/src/SelectionCardProvider';
import type { SelectionCardData, SelectionCardOptions } from '../../components/selection-card/src/types/SelectionCardOptions';
import '../../components/selection-card/src/styles/selection-card.css';
import '../../components/radio-button/src/styles/radio-button.css';

const meta: Meta<SelectionCardData & { showDescription?: boolean; showIcon?: boolean }> = {
  title: 'Layout/Selection Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Selection Card UBITS para mostrar opciones seleccionables. Soporta selección única o múltiple, estados (default, selected, disabled), y tamaños (sm, md, lg). Incluye un radio button visual a la derecha que refleja el estado de selección. La selección se realiza mediante click en toda la card.`
}
}
},
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID único de la card',
      table: {
        defaultValue: { summary: 'card-1' }
}
},
    title: {
      control: { type: 'text' },
      description: 'Título de la card',
      table: {
        defaultValue: { summary: 'Asignar toda la empresa' }
}
},
    description: {
      control: { type: 'text' },
      description: 'Descripción opcional de la card (body-sm-regular)',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'Agregaras a todos los colaboradores...' }
}
},
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar la descripción',
      table: {
        defaultValue: { summary: 'true' }
}
},
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string | undefined' },
        example: { summary: 'building, user, users, etc.' },
        defaultValue: { summary: 'building' }
}
},
    showIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar el icono',
      table: {
        defaultValue: { summary: 'true' }
}
},
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' }
}
},
    'selectionCount.current': {
      control: { type: 'number', min: 0, max: 1000, step: 1 },
      description: 'Número actual de seleccionados',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
}
},
    'selectionCount.total': {
      control: { type: 'number', min: 0, max: 1000, step: 1 },
      description: 'Número total disponible',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '290' }
}
},
    state: {
      control: { type: 'select' },
      options: ['default', 'selected', 'disabled'],
      description: 'Estado de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | selected | disabled' }
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la card',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
}
},
    value: {
      control: { type: 'text' },
      description: 'Valor asociado a la card',
      table: {
        type: { summary: 'string | number' }
}
}
}
};

export default meta;
type Story = StoryObj<SelectionCardData & { showDescription?: boolean; showIcon?: boolean }>;

// Story única con todos los controladores
export const Default: Story = {
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 0, total: 290 },
    state: 'default',
    size: 'md'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.minHeight = '200px';
    
    // Crear wrapper para la card (max-width 500px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '500px';
    wrapper.style.width = '100%';
    
    // Preparar datos de la card con los controladores
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size,
      value: args.value
};
    
    // Crear card
    try {
      const cardElement = createSelectionCard(cardData);
      wrapper.appendChild(cardElement);
      container.appendChild(wrapper);
    } catch (error) {
      console.error('❌ [SelectionCard Story] Error al crear card:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Error: ${error instanceof Error ? error.message : 'Error desconocido'}';
      errorDiv.style.color = 'red';
      errorDiv.style.padding = '20px';
      container.appendChild(errorDiv);
    }
    
    return container;
  }
};

// Helper para renderizar Selection Card de manera consistente
function renderSelectionCardStory(cardData: SelectionCardData) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'flex-start';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.padding = '24px';
  container.style.minHeight = '200px';
  
  const wrapper = document.createElement('div');
  wrapper.style.maxWidth = '500px';
  wrapper.style.width = '100%';
  
  try {
    const cardElement = createSelectionCard(cardData);
    wrapper.appendChild(cardElement);
    container.appendChild(wrapper);
  } catch (error) {
    console.error('❌ [SelectionCard Story] Error al crear card:', error);
    const errorDiv = document.createElement('div');
    errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Error desconocido'}';
    errorDiv.style.color = 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)';
    errorDiv.style.padding = '20px';
    container.appendChild(errorDiv);
  }
  
  return container;
}

// Helper para renderizar múltiples cards
function renderMultipleCardsStory(
  cards: SelectionCardData[],
  options: {
    multiple?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (selectedCards: SelectionCardData[], selectedIds: string[]) => void;
    onClick?: (card: SelectionCardData, index: number, element: HTMLElement) => void;
  } = {}
) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '16px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.padding = '24px';
  container.style.minHeight = '200px';
  
  const wrapper = document.createElement('div');
  wrapper.style.maxWidth = '500px';
  wrapper.style.width = '100%';
  wrapper.id = `selection-cards-${Date.now()}`;
  
  requestAnimationFrame(() => {
    loadSelectionCards({
      containerId: wrapper.id,
      cards: cards,
      multiple: options.multiple || false,
      selectedIds: options.selectedIds || [],
      onSelectionChange: options.onSelectionChange,
      onClick: options.onClick
    });
  });
  
  wrapper.appendChild(document.createElement('div')); // Placeholder
  container.appendChild(wrapper);
  
  return container;
}

/**
 * BasicCard
 * Card básica con solo título
 */
export const BasicCard: Story = {
  name: 'Basic Card',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    showDescription: false,
    showIcon: false,
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card básica con solo título.',
      },
    },
  },
};

/**
 * WithDescription
 * Card con título y descripción
 */
export const WithDescription: Story = {
  name: 'With Description',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    showIcon: false,
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con título y descripción.',
      },
    },
  },
};

/**
 * WithIcon
 * Card con icono
 */
export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con icono.',
      },
    },
  },
};

/**
 * WithIconRegular
 * Card con icono estilo regular
 */
export const WithIconRegular: Story = {
  name: 'With Icon - Regular',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: 'regular',
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con icono estilo regular.',
      },
    },
  },
};

/**
 * WithIconSolid
 * Card con icono estilo solid
 */
export const WithIconSolid: Story = {
  name: 'With Icon - Solid',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'solid',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: 'solid',
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con icono estilo solid.',
      },
    },
  },
};

/**
 * WithImage
 * Card con imagen
 */
export const WithImage: Story = {
  name: 'With Image',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    showIcon: false,
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      image: 'https://via.placeholder.com/48x48?text=IMG',
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con imagen (reemplaza el icono si está presente).',
      },
    },
  },
};

/**
 * WithSelectionCount
 * Card con contador de selección
 */
export const WithSelectionCount: Story = {
  name: 'With Selection Count',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 150, total: 290 },
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con contador de selección (current/total).',
      },
    },
  },
};

/**
 * StateDefault
 * Card en estado default
 */
export const StateDefault: Story = {
  name: 'State - Default',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: 'default',
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card en estado default.',
      },
    },
  },
};

/**
 * StateSelected
 * Card en estado selected
 */
export const StateSelected: Story = {
  name: 'State - Selected',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'selected',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: 'selected',
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card en estado selected.',
      },
    },
  },
};

/**
 * StateDisabled
 * Card en estado disabled
 */
export const StateDisabled: Story = {
  name: 'State - Disabled',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'disabled',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: 'disabled',
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card en estado disabled.',
      },
    },
  },
};

/**
 * SizeSmall
 * Card tamaño pequeño
 */
export const SizeSmall: Story = {
  name: 'Size - Small',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'sm'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: 'sm'
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card tamaño pequeño (sm).',
      },
    },
  },
};

/**
 * SizeMedium
 * Card tamaño mediano
 */
export const SizeMedium: Story = {
  name: 'Size - Medium',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: 'md'
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card tamaño mediano (md).',
      },
    },
  },
};

/**
 * SizeLarge
 * Card tamaño grande
 */
export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'lg'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: 'lg'
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card tamaño grande (lg).',
      },
    },
  },
};

/**
 * SingleSelection
 * Selección única
 */
export const SingleSelection: Story = {
  name: 'Single Selection',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Asignar individualmente',
        description: 'Selecciona colaboradores uno por uno.',
        icon: 'user',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: false,
      selectedIds: [],
      onSelectionChange: (selectedCards, selectedIds) => {
        console.log('Selected cards:', selectedCards);
        console.log('Selected IDs:', selectedIds);
        alert(`Seleccionada: ${selectedCards[0]?.title || 'Ninguna'}');
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con selección única (solo una card seleccionada a la vez).',
      },
    },
  },
};

/**
 * MultipleSelection
 * Selección múltiple
 */
export const MultipleSelection: Story = {
  name: 'Multiple Selection',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Asignar individualmente',
        description: 'Selecciona colaboradores uno por uno.',
        icon: 'user',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: true,
      selectedIds: [],
      onSelectionChange: (selectedCards, selectedIds) => {
        console.log('Selected cards:', selectedCards);
        console.log('Selected IDs:', selectedIds);
        alert(`${selectedCards.length} card(s) seleccionada(s)`);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con selección múltiple (varias cards seleccionadas).',
      },
    },
  },
};

/**
 * PreSelected
 * Cards pre-seleccionadas
 */
export const PreSelected: Story = {
  name: 'Pre Selected',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Asignar individualmente',
        description: 'Selecciona colaboradores uno por uno.',
        icon: 'user',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: true,
      selectedIds: ['card-1', 'card-3'],
      onSelectionChange: (selectedCards, selectedIds) => {
        console.log('Selected cards:', selectedCards);
        console.log('Selected IDs:', selectedIds);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con algunas pre-seleccionadas.',
      },
    },
  },
};

/**
 * OnSelectionChange
 * Con callback onSelectionChange
 */
export const OnSelectionChange: Story = {
  name: 'OnSelectionChange Handler',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: true,
      selectedIds: [],
      onSelectionChange: (selectedCards, selectedIds) => {
        alert(`onSelectionChange: ${selectedCards.length} card(s) seleccionada(s)\nIDs: ${selectedIds.join(`, ')}');
        console.log('Selected cards:', selectedCards);
        console.log('Selected IDs:', selectedIds);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Cards con callback onSelectionChange. Muestra un alert cuando cambia la selección.',
      },
    },
  },
};

/**
 * OnClick
 * Con callback onClick
 */
export const OnClick: Story = {
  name: 'OnClick Handler',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: false,
      selectedIds: [],
      onClick: (card, index, element) => {
        alert(`onClick: Card "${card.title}" (index: ${index})`);
        console.log('Card clicked:', card);
        console.log('Index:', index);
        console.log('Element:', element);
      }
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Cards con callback onClick. Muestra un alert cuando se hace click en una card.',
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
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 150, total: 290 },
    state: 'selected',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card completo con todas las opciones: título, descripción, icono, contador de selección, estado selected y tamaño md.',
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
    id: 'card-1',
    title: 'Asignar toda la empresa',
    showDescription: false,
    showIcon: false,
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card mínimo con solo título.',
      },
    },
  },
};

/**
 * MultipleCards
 * Múltiples cards en un contenedor
 */
export const MultipleCards: Story = {
  name: 'Multiple Cards',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Asignar toda la empresa',
        description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Asignar por departamento',
        description: 'Selecciona departamentos específicos para asignar.',
        icon: 'users',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Asignar individualmente',
        description: 'Selecciona colaboradores uno por uno.',
        icon: 'user',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards);
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards en un contenedor.',
      },
    },
  },
};

/**
 * MultipleCardsSingleSelection
 * Múltiples cards con selección única
 */
export const MultipleCardsSingleSelection: Story = {
  name: 'Multiple Cards - Single Selection',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Opción 1',
        description: 'Descripción de la opción 1.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Opción 2',
        description: 'Descripción de la opción 2.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Opción 3',
        description: 'Descripción de la opción 3.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: false,
      selectedIds: []
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con selección única.',
      },
    },
  },
};

/**
 * MultipleCardsMultipleSelection
 * Múltiples cards con selección múltiple
 */
export const MultipleCardsMultipleSelection: Story = {
  name: 'Multiple Cards - Multiple Selection',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Opción 1',
        description: 'Descripción de la opción 1.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Opción 2',
        description: 'Descripción de la opción 2.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Opción 3',
        description: 'Descripción de la opción 3.',
        icon: 'check',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: true,
      selectedIds: []
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con selección múltiple.',
      },
    },
  },
};

/**
 * MixedStates
 * Cards con diferentes estados
 */
export const MixedStates: Story = {
  name: 'Mixed States',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Card Default',
        description: 'Esta card está en estado default.',
        icon: 'circle',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-2',
        title: 'Card Selected',
        description: 'Esta card está en estado selected.',
        icon: 'check-circle',
        iconStyle: 'regular',
        state: 'selected',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Card Disabled',
        description: 'Esta card está en estado disabled.',
        icon: 'ban',
        iconStyle: 'regular',
        state: 'disabled',
        size: 'md'
      }
    ];
    
    return renderMultipleCardsStory(cards, {
      multiple: true,
      selectedIds: ['card-2']
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con diferentes estados (default, selected, disabled).',
      },
    },
  },
};

/**
 * MixedSizes
 * Cards con diferentes tamaños
 */
export const MixedSizes: Story = {
  name: 'Mixed Sizes',
  render: () => {
    const cards: SelectionCardData[] = [
      {
        id: 'card-1',
        title: 'Card Small',
        description: 'Esta card es tamaño pequeño.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'sm'
      },
      {
        id: 'card-2',
        title: 'Card Medium',
        description: 'Esta card es tamaño mediano.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'md'
      },
      {
        id: 'card-3',
        title: 'Card Large',
        description: 'Esta card es tamaño grande.',
        icon: 'building',
        iconStyle: 'regular',
        state: 'default',
        size: 'lg'
      }
    ];
    
    return renderMultipleCardsStory(cards);
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples Selection Cards con diferentes tamaños (sm, md, lg).',
      },
    },
  },
};

/**
 * WithIconAndDescription
 * Card con icono y descripción
 */
export const WithIconAndDescription: Story = {
  name: 'With Icon and Description',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con icono y descripción.',
      },
    },
  },
};

/**
 * WithImageAndDescription
 * Card con imagen y descripción
 */
export const WithImageAndDescription: Story = {
  name: 'With Image and Description',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    showIcon: false,
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      image: 'https://via.placeholder.com/48x48?text=IMG',
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con imagen y descripción.',
      },
    },
  },
};

/**
 * WithSelectionCountAndDescription
 * Card con contador y descripción
 */
export const WithSelectionCountAndDescription: Story = {
  name: 'With Selection Count and Description',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 150, total: 290 },
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con contador de selección y descripción.',
      },
    },
  },
};

/**
 * LongTitle
 * Card con título largo
 */
export const LongTitle: Story = {
  name: 'Long Title',
  args: {
    id: 'card-1',
    title: 'Este es un título muy largo que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional',
    description: 'Descripción de la card.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con título largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * LongDescription
 * Card con descripción larga
 */
export const LongDescription: Story = {
  name: 'Long Description',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Esta es una descripción muy larga que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional. La descripción puede contener múltiples líneas de texto y debe manejarse adecuadamente.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    state: 'default',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con descripción larga. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * AllFeatures
 * Card con todas las características
 */
export const AllFeatures: Story = {
  name: 'All Features',
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 150, total: 290 },
    state: 'selected',
    size: 'md'
  },
  render: (args) => {
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size
    };
    return renderSelectionCardStory(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Selection Card con todas las características: título, descripción, icono, contador de selección, estado selected y tamaño md.',
      },
    },
  },
};

