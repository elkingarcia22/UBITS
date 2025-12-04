import type { Meta, StoryObj } from '@storybook/html';
import { renderParticipantsMenu, createParticipantsMenu } from '../../components/participants-menu/src/ParticipantsMenuProvider';
import type { ParticipantsMenuOptions, Participant, ParticipantStatus } from '../../components/participants-menu/src/types/ParticipantsMenuOptions';
import '../../components/participants-menu/src/styles/participants-menu.css';
import '../../components/drawer/src/styles/drawer.css';
import '../../components/checkbox/src/styles/checkbox.css';
import '../../components/button/src/styles/button.css';
import '../../components/badge/src/styles/badge.css';
import '../../components/empty-state/src/styles/empty-state.css';

const meta: Meta<ParticipantsMenuOptions> = {
  title: 'Navegación/Menu de Participantes',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado.'
}
},
    layout: 'fullscreen'
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del menú',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Participantes' },
        category: 'Contenido'
}
},
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del input de búsqueda',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Buscar participan...' },
        category: 'Contenido'
}
},
    showAvatar: {
      control: { type: 'boolean' },
      description: 'Mostrar avatar de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    showRole: {
      control: { type: 'boolean' },
      description: 'Mostrar rol (texto complementario) de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar status tag de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia'
}
},
    enableScrollbar: {
      control: { type: 'boolean' },
      description: 'Activar scrollbar de UBITS para la lista de participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Funcionalidad'
}
},
    selectedParticipantId: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', undefined],
      description: 'ID del participante seleccionado',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
        category: 'Estado'
}
}
}
};

export default meta;
type Story = StoryObj<ParticipantsMenuOptions>;

// Datos de ejemplo
const sampleParticipants: Participant[] = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'bajo',
    selected: true
  },
  {
    id: '2',
    name: 'Estefanía Rojas',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'muy-alto'
  },
  {
    id: '3',
    name: 'Ligia salazar',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'muy-alto'
  },
  {
    id: '4',
    name: 'Cristian Perez',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'muy-alto'
  },
  {
    id: '5',
    name: 'Matias Castillo',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    status: 'muy-alto'
  },
  {
    id: '6',
    name: 'Nelson Prado',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    status: 'muy-alto'
  },
  {
    id: '7',
    name: 'Alisson Vélez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    status: 'muy-alto'
  },
  {
    id: '8',
    name: 'Andres Lopez',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    status: 'muy-alto'
  },
  {
    id: '9',
    name: 'Carlos Torres',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: 'muy-alto'
  },
  {
    id: '10',
    name: 'María González',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/women/10.jpg',
    status: 'medio'
  },
  {
    id: '11',
    name: 'Juan Martínez',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/men/11.jpg',
    status: 'alto'
  },
  {
    id: '12',
    name: 'Ana Rodríguez',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    status: 'bajo'
  },
  {
    id: '13',
    name: 'Pedro Sánchez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/men/13.jpg',
    status: 'medio'
  },
  {
    id: '14',
    name: 'Patricia Fernández',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/women/14.jpg',
    status: 'alto'
  },
  {
    id: '15',
    name: 'Diego Ramírez',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    status: 'bajo'
  },
  {
    id: '16',
    name: 'Valentina Morales',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/16.jpg',
    status: 'medio'
  },
  {
    id: '17',
    name: 'Ricardo Herrera',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/17.jpg',
    status: 'alto'
  },
  {
    id: '18',
    name: 'Carmen Jiménez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/18.jpg',
    status: 'bajo'
  },
  {
    id: '19',
    name: 'Fernando Castro',
    role: 'Marketing',
    avatarImage: 'https://randomuser.me/api/portraits/men/19.jpg',
    status: 'medio'
  },
  {
    id: '20',
    name: 'Isabel Ruiz',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/women/20.jpg',
    status: 'alto'
  }
];

export const Default: Story = {
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
},
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      position: relative;
      border: none;
      overflow: hidden;
    `;

    // Wrapper para limitar el ancho
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto;';

    // Contenedor para el menú
    const menuContainer = document.createElement('div');
    const containerId = `participants-menu-container-${Date.now()}`;
    menuContainer.id = containerId;
    menuContainer.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    
    // Insertar el contenedor del menú en el wrapper
    wrapper.appendChild(menuContainer);
    // Insertar el wrapper en el container
    container.appendChild(wrapper);

    // Variable para preservar el valor del input de búsqueda
    let preservedSearchValue = '';
    // Flag para evitar re-render cuando viene de selección interna
    let skipNextRender = false;
    // Flag para evitar re-render cuando viene de búsqueda
    let skipNextRenderFromSearch = false;
    // Timeout para debounce del buscador
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    // Flag para indicar que se está procesando una búsqueda
    let isProcessingSearch = false;
    // Referencia a la instancia del menú para poder usar updateParticipantsList
    let menuInstance: ReturnType<typeof createParticipantsMenu> | null = null;
    // Estado de filtros activos
    let activeFilters: { roles: string[]; statuses: ParticipantStatus[] } = {
      roles: [],
      statuses: []
    };

    // Función para obtener solo los args relevantes (sin participants)
    const getRelevantArgs = (args: any) => {
      return JSON.stringify({
        title: args.title,
        searchPlaceholder: args.searchPlaceholder,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar,
        showRole: args.showRole,
        showStatusTag: args.showStatusTag,
        // NO incluir participants aquí para evitar re-renders por búsqueda
      });
    };
    
    let lastArgs = getRelevantArgs(args);

    const createMenuContent = () => {
      // Preservar el valor y posición del cursor del input antes de limpiar
      const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
      const existingInput = existingMenu 
        ? existingMenu.querySelector('.ubits-input') as HTMLInputElement
        : menuContainer.querySelector('.ubits-input') as HTMLInputElement;
      
      let cursorPosition = 0;
      let shouldRestoreFocus = false;
      
      if (existingInput) {
        preservedSearchValue = existingInput.value || '';
        cursorPosition = existingInput.selectionStart || 0;
        shouldRestoreFocus = document.activeElement === existingInput;
      }

      menuContainer.innerHTML = '';

      // Limpiar participant.selected de todos los participantes para evitar que quede pegado
      const cleanedParticipants = (args.participants || sampleParticipants).map(p => ({
        ...p,
        selected: false // Limpiar selected para que solo use selectedParticipantId
      }));

      // Crear opciones del menú
      const menuOptions: ParticipantsMenuOptions = {
        title: args.title || 'Participantes',
        searchPlaceholder: args.searchPlaceholder || 'Buscar participan...',
        participants: cleanedParticipants,
        selectedParticipantId: args.selectedParticipantId,
        showAvatar: args.showAvatar !== undefined ? args.showAvatar : true,
        showRole: args.showRole !== undefined ? args.showRole : true,
        showStatusTag: args.showStatusTag !== undefined ? args.showStatusTag : true,
        enableScrollbar: args.enableScrollbar !== undefined ? args.enableScrollbar : true,
        preservedSearchValue: preservedSearchValue, // Pasar el valor preservado
        onParticipantSelect: (participantId) => {
          // Activar flag para evitar re-render cuando el intervalo detecte el cambio
          skipNextRender = true;
          // Actualizar selección sin re-renderizar
          args.selectedParticipantId = participantId;
          // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
          lastArgs = getRelevantArgs(args);
          // NO llamar createMenuContent() - la selección visual ya se actualizó en el componente
          // El flag skipNextRender evitará que el intervalo cause un re-render
        },
        onSearchChange: (searchText) => {
          preservedSearchValue = searchText || '';
          
          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }
          
          searchTimeout = setTimeout(() => {
            isProcessingSearch = true;
            
            let filteredParticipants: Participant[] = [...sampleParticipants];
            
            // Aplicar búsqueda de texto
            if (searchText && searchText.trim() !== '') {
              filteredParticipants = filteredParticipants.filter(p => {
                const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
                return matchesName || matchesRole;
              });
            }
            
            // Aplicar filtros de roles
            if (activeFilters.roles.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => 
                activeFilters.roles.includes(p.role)
              );
            }
            
            // Aplicar filtros de estados
            if (activeFilters.statuses.length > 0) {
              filteredParticipants = filteredParticipants.filter(p => 
                p.status && activeFilters.statuses.includes(p.status)
              );
            }
            
            args.participants = filteredParticipants;
            
            if (menuInstance?.updateParticipantsList) {
              skipNextRenderFromSearch = true;
              menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
              // Actualizar lastArgs inmediatamente para que el setInterval no detecte cambios
              lastArgs = getRelevantArgs(args);
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 100); // Aumentar tiempo para asegurar que el setInterval no detecte cambios
            } else {
              skipNextRenderFromSearch = true;
              createMenuContent();
              setTimeout(() => {
                isProcessingSearch = false;
                skipNextRenderFromSearch = false;
              }, 50);
            }
            
            searchTimeout = null;
          }, 300);
        },
        onFilterClick: () => {
          // Handler para click en filtros
        },
        onFilterChange: (filters) => {
          activeFilters = filters;
          
          // Aplicar filtros a los participantes
          let filteredParticipants = [...sampleParticipants];
          
          // Filtrar por roles
          if (filters.roles.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => 
              filters.roles.includes(p.role)
            );
          }
          
          // Filtrar por estados
          if (filters.statuses.length > 0) {
            filteredParticipants = filteredParticipants.filter(p => 
              p.status && filters.statuses.includes(p.status)
            );
          }
          
          // También aplicar búsqueda si hay texto
          if (preservedSearchValue && preservedSearchValue.trim() !== '') {
            filteredParticipants = filteredParticipants.filter(p => {
              const matchesName = p.name.toLowerCase().includes(preservedSearchValue.toLowerCase());
              const matchesRole = p.role.toLowerCase().includes(preservedSearchValue.toLowerCase());
              return matchesName || matchesRole;
            });
          }
          
          args.participants = filteredParticipants;
          
          if (menuInstance?.updateParticipantsList) {
            skipNextRenderFromSearch = true;
            menuInstance.updateParticipantsList(filteredParticipants, args.selectedParticipantId);
            lastArgs = getRelevantArgs(args);
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 100);
          } else {
            skipNextRenderFromSearch = true;
            createMenuContent();
            setTimeout(() => {
              skipNextRenderFromSearch = false;
            }, 50);
          }
        },
        containerId: containerId
      };

      setTimeout(() => {
        try {
          const existingMenu = menuContainer.querySelector('.ubits-participants-menu');
          if (existingMenu) {
            existingMenu.remove();
          }
          
          menuInstance = createParticipantsMenu(menuOptions);
          
          if (shouldRestoreFocus) {
            setTimeout(() => {
              const newInput = menuContainer.querySelector('.ubits-input') as HTMLInputElement;
              if (newInput) {
                newInput.focus();
                const currentValue = newInput.value || '';
                const safePosition = Math.min(cursorPosition, currentValue.length);
                newInput.setSelectionRange(safePosition, safePosition);
              }
            }, 100);
          }
        } catch (error) {
          console.error('[Story] Error:', error);
        }
      }, 0);
    };

    // Crear contenido inicial
    createMenuContent();

    // Observar cambios en args
    let checkInterval: ReturnType<typeof setInterval> | null = null;

    const startWatching = () => {
      if (checkInterval) return;

      checkInterval = setInterval(() => {
        // Si se está procesando una búsqueda, no verificar cambios
        if (isProcessingSearch) {
          return;
        }
        
        const currentArgs = getRelevantArgs(args);
        if (currentArgs !== lastArgs) {
          if (skipNextRender) {
            skipNextRender = false;
            lastArgs = currentArgs;
            return;
          }
          if (skipNextRenderFromSearch) {
            skipNextRenderFromSearch = false;
            lastArgs = currentArgs;
            return;
          }
          lastArgs = currentArgs;
          createMenuContent();
        }
      }, 100);
    };

    startWatching();

    // El menuContainer ya fue insertado arriba, no necesitamos insertarlo de nuevo
    return container;
  }
};

// Helper para renderizar ParticipantsMenu de manera consistente
function renderParticipantsMenuStory(options: ParticipantsMenuOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100%;
    padding: 24px;
    background: var(--modifiers-normal-color-light-bg-1);
    position: relative;
    border: none;
    overflow: hidden;
    min-height: 600px;
  `;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width: 500px; width: 100%; margin: 0 auto; height: 100%;';

  const menuContainer = document.createElement('div');
  const containerId = `participants-menu-container-${Date.now()}`;
  menuContainer.id = containerId;
  menuContainer.style.cssText = `
    width: 100%;
    height: 100%;
  `;
  
  wrapper.appendChild(menuContainer);
  container.appendChild(wrapper);

  requestAnimationFrame(() => {
    try {
      const menuOptions: ParticipantsMenuOptions = {
        ...options,
        containerId: containerId
      };
      createParticipantsMenu(menuOptions);
    } catch (error) {
      console.error('[Story] Error:', error);
    }
  });

  return container;
}

/**
 * WithTitle
 * Con título personalizado
 */
export const WithTitle: Story = {
  name: 'With Title',
  args: {
    title: 'Miembros del Equipo',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con título personalizado.',
      },
    },
  },
};

/**
 * WithoutTitle
 * Sin título (usar default)
 */
export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin título (usa el default: "Participantes").',
      },
    },
  },
};

/**
 * CustomSearchPlaceholder
 * Placeholder de búsqueda personalizado
 */
export const CustomSearchPlaceholder: Story = {
  name: 'Custom Search Placeholder',
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar por nombre o rol...',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con placeholder de búsqueda personalizado.',
      },
    },
  },
};

/**
 * DefaultSearchPlaceholder
 * Placeholder de búsqueda por defecto
 */
export const DefaultSearchPlaceholder: Story = {
  name: 'Default Search Placeholder',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con placeholder de búsqueda por defecto ("Buscar participan...").',
      },
    },
  },
};

/**
 * WithAvatar
 * Con avatares visibles
 */
export const WithAvatar: Story = {
  name: 'With Avatar',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con avatares visibles.',
      },
    },
  },
};

/**
 * WithoutAvatar
 * Sin avatares
 */
export const WithoutAvatar: Story = {
  name: 'Without Avatar',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: false,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin avatares.',
      },
    },
  },
};

/**
 * WithRole
 * Con roles visibles
 */
export const WithRole: Story = {
  name: 'With Role',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con roles visibles.',
      },
    },
  },
};

/**
 * WithoutRole
 * Sin roles
 */
export const WithoutRole: Story = {
  name: 'Without Role',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: false,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin roles.',
      },
    },
  },
};

/**
 * WithStatusTag
 * Con status tags visibles
 */
export const WithStatusTag: Story = {
  name: 'With Status Tag',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con status tags visibles.',
      },
    },
  },
};

/**
 * WithoutStatusTag
 * Sin status tags
 */
export const WithoutStatusTag: Story = {
  name: 'Without Status Tag',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: false,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin status tags.',
      },
    },
  },
};

/**
 * WithScrollbar
 * Con scrollbar activado
 */
export const WithScrollbar: Story = {
  name: 'With Scrollbar',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con scrollbar activado (permite ver todos los participantes).',
      },
    },
  },
};

/**
 * WithoutScrollbar
 * Sin scrollbar (limitado a 6-7 items)
 */
export const WithoutScrollbar: Story = {
  name: 'Without Scrollbar',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: false
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin scrollbar (limitado a 6-7 items visibles).',
      },
    },
  },
};

/**
 * SelectedParticipant
 * Con participante seleccionado
 */
export const SelectedParticipant: Story = {
  name: 'Selected Participant',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    selectedParticipantId: '2',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participante seleccionado.',
      },
    },
  },
};

/**
 * NoSelectedParticipant
 * Sin participante seleccionado
 */
export const NoSelectedParticipant: Story = {
  name: 'No Selected Participant',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin participante seleccionado.',
      },
    },
  },
};

/**
 * OnParticipantSelectCallback
 * Callback cuando se selecciona un participante
 */
export const OnParticipantSelectCallback: Story = {
  name: 'On Participant Select Callback',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
    onParticipantSelect: (participantId) => {
      alert(`Participante seleccionado: ${participantId}`);
    }
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con callback onParticipantSelect cuando se selecciona un participante.',
      },
    },
  },
};

/**
 * OnSearchChangeCallback
 * Callback cuando se cambia el texto de búsqueda
 */
export const OnSearchChangeCallback: Story = {
  name: 'On Search Change Callback',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
    onSearchChange: (searchText) => {
      console.log('Búsqueda:', searchText);
    }
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con callback onSearchChange cuando se cambia el texto de búsqueda.',
      },
    },
  },
};

/**
 * OnFilterClickCallback
 * Callback cuando se hace clic en el botón de filtro
 */
export const OnFilterClickCallback: Story = {
  name: 'On Filter Click Callback',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
    onFilterClick: () => {
      alert('Botón de filtro clickeado');
    }
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con callback onFilterClick cuando se hace clic en el botón de filtro.',
      },
    },
  },
};

/**
 * OnFilterChangeCallback
 * Callback cuando cambian los filtros aplicados
 */
export const OnFilterChangeCallback: Story = {
  name: 'On Filter Change Callback',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
    onFilterChange: (filters) => {
      console.log('Filtros aplicados:', filters);
    }
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con callback onFilterChange cuando cambian los filtros aplicados.',
      },
    },
  },
};

/**
 * ParticipantWithAvatarImage
 * Participante con imagen de avatar
 */
export const ParticipantWithAvatarImage: Story = {
  name: 'Participant - With Avatar Image',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 5).map(p => ({
      ...p,
      avatarImage: p.avatarImage || 'https://randomuser.me/api/portraits/men/1.jpg'
    })),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes que tienen imágenes de avatar.',
      },
    },
  },
};

/**
 * ParticipantWithoutAvatarImage
 * Participante sin imagen de avatar (usa iniciales)
 */
export const ParticipantWithoutAvatarImage: Story = {
  name: 'Participant - Without Avatar Image',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', status: 'muy-alto' },
      { id: '3', name: 'Ligia salazar', role: 'Ventas', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes sin imágenes de avatar (usan iniciales).',
      },
    },
  },
};

/**
 * ParticipantStatusBajo
 * Participante con status 'bajo'
 */
export const ParticipantStatusBajo: Story = {
  name: 'Participant Status - Bajo',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'bajo' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes con status "bajo" (verde).',
      },
    },
  },
};

/**
 * ParticipantStatusMedio
 * Participante con status 'medio'
 */
export const ParticipantStatusMedio: Story = {
  name: 'Participant Status - Medio',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'medio' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'medio' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes con status "medio" (naranja/amarillo).',
      },
    },
  },
};

/**
 * ParticipantStatusAlto
 * Participante con status 'alto'
 */
export const ParticipantStatusAlto: Story = {
  name: 'Participant Status - Alto',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'alto' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes con status "alto" (rojo).',
      },
    },
  },
};

/**
 * ParticipantStatusMuyAlto
 * Participante con status 'muy-alto'
 */
export const ParticipantStatusMuyAlto: Story = {
  name: 'Participant Status - Muy Alto',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'muy-alto' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con participantes con status "muy-alto" (rojo).',
      },
    },
  },
};

/**
 * AllParticipantStatuses
 * Todos los estados de participante
 */
export const AllParticipantStatuses: Story = {
  name: 'All Participant Statuses',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'medio' },
      { id: '3', name: 'Ligia salazar', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg', status: 'alto' },
      { id: '4', name: 'Cristian Perez', role: 'Recursos humanos', avatarImage: 'https://randomuser.me/api/portraits/men/4.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu mostrando todos los estados de participante (bajo, medio, alto, muy-alto).',
      },
    },
  },
};

/**
 * ManyParticipants
 * Muchos participantes (más de 10)
 */
export const ManyParticipants: Story = {
  name: 'Many Participants',
  args: {
    title: 'Participantes',
    participants: sampleParticipants,
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con muchos participantes (20 participantes).',
      },
    },
  },
};

/**
 * FewParticipants
 * Pocos participantes (menos de 5)
 */
export const FewParticipants: Story = {
  name: 'Few Participants',
  args: {
    title: 'Participantes',
    participants: sampleParticipants.slice(0, 3),
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con pocos participantes (3 participantes).',
      },
    },
  },
};

/**
 * SingleParticipant
 * Un solo participante
 */
export const SingleParticipant: Story = {
  name: 'Single Participant',
  args: {
    title: 'Participantes',
    participants: [sampleParticipants[0]],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con un solo participante.',
      },
    },
  },
};

/**
 * EmptyParticipants
 * Sin participantes (empty state)
 */
export const EmptyParticipants: Story = {
  name: 'Empty Participants',
  args: {
    title: 'Participantes',
    participants: [],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu sin participantes (muestra empty state).',
      },
    },
  },
};

/**
 * LongNames
 * Nombres largos
 */
export const LongNames: Story = {
  name: 'Long Names',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia Rodriguez Martinez', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas de la Torre y González', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con nombres largos (se truncan con ellipsis).',
      },
    },
  },
};

/**
 * ShortNames
 * Nombres cortos
 */
export const ShortNames: Story = {
  name: 'Short Names',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Ana', role: 'Producto', avatarImage: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'bajo' },
      { id: '2', name: 'Luis', role: 'Ventas', avatarImage: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con nombres cortos.',
      },
    },
  },
};

/**
 * LongRoles
 * Roles largos
 */
export const LongRoles: Story = {
  name: 'Long Roles',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Director de Producto y Estrategia', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas', role: 'Gerente de Ventas y Relaciones Comerciales', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con roles largos (se truncan con ellipsis).',
      },
    },
  },
};

/**
 * ShortRoles
 * Roles cortos
 */
export const ShortRoles: Story = {
  name: 'Short Roles',
  args: {
    title: 'Participantes',
    participants: [
      { id: '1', name: 'Elkin Garcia', role: 'Dev', avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'bajo' },
      { id: '2', name: 'Estefanía Rojas', role: 'PM', avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'muy-alto' }
    ],
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu con roles cortos.',
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
    title: 'Miembros del Equipo',
    searchPlaceholder: 'Buscar por nombre o rol...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
    onParticipantSelect: (participantId) => {
      console.log('Participante seleccionado:', participantId);
    },
    onSearchChange: (searchText) => {
      console.log('Búsqueda:', searchText);
    },
    onFilterClick: () => {
      console.log('Filtro clickeado');
    },
    onFilterChange: (filters) => {
      console.log('Filtros aplicados:', filters);
    }
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu completo con todas las opciones habilitadas.',
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
    participants: sampleParticipants.slice(0, 3)
  },
  render: (args) => renderParticipantsMenuStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu mínimo con solo las opciones esenciales.',
      },
    },
  },
};

