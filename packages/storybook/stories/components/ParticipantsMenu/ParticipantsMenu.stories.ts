import type { Meta, StoryObj } from '@storybook/html';
import {
  renderParticipantsMenu,
  createParticipantsMenu,
} from '../../../components/participants-menu/src/ParticipantsMenuProvider';
import type {
  ParticipantsMenuOptions,
  Participant,
  ParticipantStatus,
} from '../../../components/participants-menu/src/types/ParticipantsMenuOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../components/participants-menu/src/styles/participants-menu.css';
import '../../../components/drawer/src/styles/drawer.css';
import '../../../components/checkbox/src/styles/checkbox.css';
import '../../../components/button/src/styles/button.css';
import '../../../components/badge/src/styles/badge.css';
import '../../../components/empty-state/src/styles/empty-state.css';
import '../../../components/input/src/styles/input.css';
import '../../../components/avatar/src/styles/avatar.css';
import '../../../components/status-tag/src/styles/status-tag.css';

const meta: Meta<ParticipantsMenuOptions> = {
  title: 'Navegación/Menu de Participantes',
  tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
      description: {
        component:
          `Componente de menú lateral UBITS para mostrar una lista de participantes. Incluye búsqueda, filtro y lista de participantes con avatar, nombre, rol y estado.

\`\`\`html
// 1. Crear contenedor HTML
<div id="participants-menu-implementation-container"></div>

// 2. Datos de participantes (ejemplo)
const sampleParticipants = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'bajo'
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
  }
];

// 3. Estado para filtros y búsqueda
let activeFilters = { roles: [], statuses: [] };
let filteredParticipants = [...sampleParticipants];

// 4. Crear ParticipantsMenu
const participantsMenu = window.UBITS.ParticipantsMenu.create({
  containerId: 'participants-menu-implementation-container',
  title: 'Participantes',
  searchPlaceholder: 'Buscar participan...',
  participants: filteredParticipants,
  selectedParticipantId: '1',
  showAvatar: true,
  showRole: true,
  showStatusTag: true,
  enableScrollbar: true,
  onParticipantSelect: (participantId) => {
    console.log('Participante seleccionado:', participantId);
    // Actualizar selección sin re-renderizar
  },
  onSearchChange: (searchText) => {
    console.log('Búsqueda:', searchText);
    
    // Filtrar participantes por búsqueda
    let filtered = [...sampleParticipants];
    
    if (searchText && searchText.trim() !== '') {
      filtered = filtered.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
        return matchesName || matchesRole;
      });
    }
    
    // Aplicar filtros activos
    if (activeFilters.roles.length > 0) {
      filtered = filtered.filter((p) => activeFilters.roles.includes(p.role));
    }
    if (activeFilters.statuses.length > 0) {
      filtered = filtered.filter((p) => p.status && activeFilters.statuses.includes(p.status));
    }
    
    filteredParticipants = filtered;
    
    // Actualizar lista sin recrear el componente
    if (participantsMenu.updateParticipantsList) {
      participantsMenu.updateParticipantsList(filteredParticipants);
    }
  },
  onFilterClick: () => {
    console.log('Filtro clickeado');
  },
  onFilterChange: (filters) => {
    console.log('Filtros cambiados:', filters);
    activeFilters = filters;
    
    // Aplicar filtros a los participantes
    let filtered = [...sampleParticipants];
    
    if (filters.roles.length > 0) {
      filtered = filtered.filter((p) => filters.roles.includes(p.role));
    }
    if (filters.statuses.length > 0) {
      filtered = filtered.filter((p) => p.status && filters.statuses.includes(p.status));
    }
    
    filteredParticipants = filtered;
    
    // Actualizar lista sin recrear el componente
    if (participantsMenu.updateParticipantsList) {
      participantsMenu.updateParticipantsList(filteredParticipants);
    }
  }
});

// Nota: createParticipantsMenu retorna un objeto con:
// - participantsMenu.element: El elemento DOM del menú
// - participantsMenu.update(newOptions): Método para actualizar el menú
// - participantsMenu.updateParticipantsList(participants, selectedParticipantId?): Método para actualizar solo la lista
// - participantsMenu.destroy(): Método para destruir el menú
\`\`\`',
      },
    },
    layout: 'fullscreen',
    ubits: createUBITSContract({
      componentId: '🧩-ux-participants-menu',
      api: {
        create: 'window.UBITS.ParticipantsMenu.create',
        tag: '<ubits-participants-menu>',
      },
      dependsOn: {
        required: [
          '🧩-ux-input', // Input de búsqueda
          '🧩-ux-button', // Botón de filtro
          '🧩-ux-avatar', // Avatar de participantes
          '🧩-ux-status-tag', // Status tag de participantes
        ],
        optional: [
          '🧩-ux-badge', // Badge en botón de filtro cuando hay filtros activos
          '🧩-ux-drawer', // Drawer para panel de filtros
          '🧩-ux-checkbox', // Checkboxes en panel de filtros
          '🧩-ux-empty-state', // Estado vacío cuando no hay resultados
          '⚙️-functional-scroll', // Scrollbar personalizado para la lista
        ],
      },
      internals: [], // Todos los componentes son públicos
      slots: {},
      tokensUsed: [
        '--modifiers-normal-color-light-bg-1',
        '--modifiers-normal-color-light-bg-2',
        '--modifiers-normal-color-light-bg-active',
        '--modifiers-normal-color-light-fg-1-high',
        '--modifiers-normal-color-light-fg-1-medium',
        '--modifiers-normal-color-light-fg-bold',
        '--modifiers-normal-color-light-accent-brand',
        '--modifiers-normal-body-md-regular-fontsize',
        '--modifiers-normal-body-md-regular-lineheight',
        '--modifiers-normal-body-sm-regular-fontsize',
        '--modifiers-normal-body-sm-regular-lineheight',
        '--ubits-spacing-none',
        '--ubits-spacing-xs',
        '--ubits-spacing-sm',
        '--ubits-spacing-md',
        '--ubits-spacing-12',
        '--ubits-spacing-4',
        '--ubits-border-radius-md',
        '--ubits-border-radius-sm',
        '--ubits-border-radius-full',
        '--font-family-noto-sans-font-family',
        '--weight-bold',
        '--weight-regular',
      ],
      rules: {
        forbidHardcodedColors: true,
        forbiddenPatterns: ['rgb(', 'hsl(', '#'],
        requiredProps: ['participants'],
      },
      // ⭐ CAMPOS EXTENDIDOS
      examples: {
        canonical: `window.UBITS.ParticipantsMenu.create(document.getElementById('participants-menu-container'), {
  containerId: 'participants-menu-container',
  participants: [
    { id: '1', name: 'John Doe', role: 'Admin', status: 'online' }
  ],
  onParticipantClick: function(participantId) {}
});`,
        basic: `window.UBITS.ParticipantsMenu.create(document.getElementById('participants-menu-container'), {
  containerId: 'participants-menu-container',
  participants: [
    { id: '1', name: 'John Doe', role: 'Admin', status: 'online' }
  ]
});`,
        withSearch: `window.UBITS.ParticipantsMenu.create(document.getElementById('participants-menu-container'), {
  containerId: 'participants-menu-container',
  participants: [
    { id: '1', name: 'John Doe', role: 'Admin', status: 'online' }
  ],
  searchPlaceholder: 'Buscar participantes...'
});`,
      },
      variants: {
        status: ['online', 'offline', 'away', 'busy'],
      },
      events: {
        onParticipantClick: {
          type: 'Event',
          description: 'Emitted when a participant is clicked',
        },
      },
      // ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
      storybook: {
        canonicalStoryId: 'navegacion-menu-de-participantes--implementation',
        storiesByExample: {
          canonical: 'navegacion-menu-de-participantes--implementation',
          basic: 'navegacion-menu-de-participantes--default',
          withSearch: 'navegacion-menu-de-participantes--with-search',
        },
      },
      intents: {
        'participants.menu': 'canonical',
        'participants.list': 'canonical',
        'participants.basic': 'canonical',
        'participants.with-search': 'withSearch',
      },
    }),
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del menú',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Participantes' },
        category: 'Contenido',
      },
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del input de búsqueda',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Buscar participan...' },
        category: 'Contenido',
      },
    },
    participants: {
      control: { type: 'object' },
      description: 'Lista de participantes',
      table: {
        type: { summary: 'Participant[]' },
        category: 'Contenido',
      },
    },
    selectedParticipantId: {
      control: { type: 'text' },
      description: 'ID del participante seleccionado',
      table: {
        type: { summary: 'string' },
        category: 'Estado',
      },
    },
    showAvatar: {
      control: { type: 'boolean' },
      description: 'Mostrar avatar de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showRole: {
      control: { type: 'boolean' },
      description: 'Mostrar rol (texto complementario) de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    showStatusTag: {
      control: { type: 'boolean' },
      description: 'Mostrar status tag de los participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Apariencia',
      },
    },
    enableScrollbar: {
      control: { type: 'boolean' },
      description: 'Activar scrollbar de UBITS para la lista de participantes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Funcionalidad',
      },
    },
    containerId: {
      control: { type: 'text' },
      description: 'ID del contenedor donde se insertará el menú',
      table: {
        type: { summary: 'string' },
        category: 'Configuración',
      },
    },
    onParticipantSelect: {
      control: false,
      description: 'Callback cuando se selecciona un participante',
      table: {
        type: { summary: '(participantId: string) => void' },
        category: 'Eventos',
      },
    },
    onSearchChange: {
      control: false,
      description: 'Callback cuando se cambia el texto de búsqueda',
      table: {
        type: { summary: '(searchText: string) => void' },
        category: 'Eventos',
      },
    },
    onFilterClick: {
      control: false,
      description: 'Callback cuando se hace clic en el botón de filtro',
      table: {
        type: { summary: '() => void' },
        category: 'Eventos',
      },
    },
    onFilterChange: {
      control: false,
      description: 'Callback cuando cambian los filtros aplicados',
      table: {
        type: {
          summary: '(filters: { roles: string[]; statuses: ParticipantStatus[] }) => void',
        },
        category: 'Eventos',
      },
    },
  },
} satisfies Meta<ParticipantsMenuOptions>;

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
  },
  {
    id: '2',
    name: 'Estefanía Rojas',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'muy-alto',
  },
  {
    id: '3',
    name: 'Ligia salazar',
    role: 'Ventas',
    avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    status: 'muy-alto',
  },
  {
    id: '4',
    name: 'Cristian Perez',
    role: 'Recursos humanos',
    avatarImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    status: 'muy-alto',
  },
  {
    id: '5',
    name: 'Matias Castillo',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    status: 'muy-alto',
  },
  {
    id: '6',
    name: 'Nelson Prado',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    status: 'muy-alto',
  },
  {
    id: '7',
    name: 'Alisson Vélez',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/women/7.jpg',
    status: 'muy-alto',
  },
  {
    id: '8',
    name: 'Andres Lopez',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    status: 'muy-alto',
  },
  {
    id: '9',
    name: 'Carlos Torres',
    role: 'Tecnología',
    avatarImage: 'https://randomuser.me/api/portraits/men/9.jpg',
    status: 'muy-alto',
  },
];

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
  name: 'Implementation (Copy/Paste)',
  args: {
    containerId: 'participants-menu-implementation-container',
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants, // Usar todos los participantes de ejemplo
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
  },
  parameters: {
    docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="participants-menu-implementation-container"></div>

// 2. Datos de participantes (ejemplo)
const sampleParticipants = [
  {
    id: '1',
    name: 'Elkin Garcia',
    role: 'Producto',
    avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'bajo'
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
  }
];

// 3. Estado para filtros y búsqueda
let activeFilters = { roles: [], statuses: [] };
let filteredParticipants = [...sampleParticipants];

// 4. Crear ParticipantsMenu
const participantsMenu = window.UBITS.ParticipantsMenu.create({
  containerId: 'participants-menu-implementation-container',
  title: 'Participantes',
  searchPlaceholder: 'Buscar participan...',
  participants: filteredParticipants,
  selectedParticipantId: '1',
  showAvatar: true,
  showRole: true,
  showStatusTag: true,
  enableScrollbar: true,
  onParticipantSelect: (participantId) => {
    console.log('Participante seleccionado:', participantId);
    // Actualizar selección sin re-renderizar
  },
  onSearchChange: (searchText) => {
    console.log('Búsqueda:', searchText);
    
    // Filtrar participantes por búsqueda
    let filtered = [...sampleParticipants];
    
    if (searchText && searchText.trim() !== '') {
      filtered = filtered.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
        return matchesName || matchesRole;
      });
    }
    
    // Aplicar filtros activos
    if (activeFilters.roles.length > 0) {
      filtered = filtered.filter((p) => activeFilters.roles.includes(p.role));
    }
    if (activeFilters.statuses.length > 0) {
      filtered = filtered.filter((p) => p.status && activeFilters.statuses.includes(p.status));
    }
    
    filteredParticipants = filtered;
    
    // Actualizar lista sin recrear el componente
    if (participantsMenu.updateParticipantsList) {
      participantsMenu.updateParticipantsList(filteredParticipants);
    }
  },
  onFilterClick: () => {
    console.log('Filtro clickeado');
  },
  onFilterChange: (filters) => {
    console.log('Filtros cambiados:', filters);
    activeFilters = filters;
    
    // Aplicar filtros a los participantes
    let filtered = [...sampleParticipants];
    
    if (filters.roles.length > 0) {
      filtered = filtered.filter((p) => filters.roles.includes(p.role));
    }
    if (filters.statuses.length > 0) {
      filtered = filtered.filter((p) => p.status && filters.statuses.includes(p.status));
    }
    
    filteredParticipants = filtered;
    
    // Actualizar lista sin recrear el componente
    if (participantsMenu.updateParticipantsList) {
      participantsMenu.updateParticipantsList(filteredParticipants);
    }
  }
});

// Nota: createParticipantsMenu retorna un objeto con:
// - participantsMenu.element: El elemento DOM del menú
// - participantsMenu.update(newOptions): Método para actualizar el menú
// - participantsMenu.updateParticipantsList(participants, selectedParticipantId?): Método para actualizar solo la lista
// - participantsMenu.destroy(): Método para destruir el menú`,
      },
    },
  },
  render: (args) => {
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-participants-menu');
    container.setAttribute('data-ubits-component', 'ParticipantsMenu');
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
    const containerId = args.containerId || `participants-menu-implementation-container-${Date.now()}`;
    menuContainer.id = containerId;
    menuContainer.style.cssText = `
      width: 100%;
      height: 600px;
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
      statuses: [],
    };
    // Lista completa de participantes (todos los disponibles, sin filtrar)
    // Usar los participantes de args si existen, sino usar sampleParticipants
    const allParticipants = (args.participants && args.participants.length > 0) 
      ? [...args.participants] 
      : [...sampleParticipants];

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
        ? (existingMenu.querySelector('.ubits-input') as HTMLInputElement)
        : (menuContainer.querySelector('.ubits-input') as HTMLInputElement);

      let cursorPosition = 0;
      let shouldRestoreFocus = false;

      if (existingInput) {
        preservedSearchValue = existingInput.value || '';
        cursorPosition = existingInput.selectionStart || 0;
        shouldRestoreFocus = document.activeElement === existingInput;
      }

      menuContainer.innerHTML = '';

      // Limpiar participant.selected de todos los participantes para evitar que quede pegado
      // Usar allParticipants si args.participants está vacío o no existe
      const currentParticipants = (args.participants && args.participants.length > 0) 
        ? args.participants 
        : allParticipants;
      const cleanedParticipants = currentParticipants.map((p) => ({
        ...p,
        selected: false, // Limpiar selected para que solo use selectedParticipantId
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
          if (args.onParticipantSelect) {
            args.onParticipantSelect(participantId);
          }
        },
        onSearchChange: (searchText) => {
          preservedSearchValue = searchText || '';

          if (searchTimeout) {
            clearTimeout(searchTimeout);
          }

          searchTimeout = setTimeout(() => {
            isProcessingSearch = true;

            let filteredParticipants: Participant[] = [...allParticipants];

            // Aplicar búsqueda de texto
            if (searchText && searchText.trim() !== '') {
              filteredParticipants = filteredParticipants.filter((p) => {
                const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
                return matchesName || matchesRole;
              });
            }

            // Aplicar filtros de roles
            if (activeFilters.roles.length > 0) {
              filteredParticipants = filteredParticipants.filter((p) =>
                activeFilters.roles.includes(p.role),
              );
            }

            // Aplicar filtros de estados
            if (activeFilters.statuses.length > 0) {
              filteredParticipants = filteredParticipants.filter(
                (p) => p.status && activeFilters.statuses.includes(p.status),
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
          if (args.onFilterClick) {
            args.onFilterClick();
          }
        },
        onFilterChange: (filters) => {
          activeFilters = filters;

          // Aplicar filtros a los participantes
          let filteredParticipants = [...allParticipants];

          // Filtrar por roles
          if (filters.roles.length > 0) {
            filteredParticipants = filteredParticipants.filter((p) =>
              filters.roles.includes(p.role),
            );
          }

          // Filtrar por estados
          if (filters.statuses.length > 0) {
            filteredParticipants = filteredParticipants.filter(
              (p) => p.status && filters.statuses.includes(p.status),
            );
          }

          // También aplicar búsqueda si hay texto
          if (preservedSearchValue && preservedSearchValue.trim() !== '') {
            filteredParticipants = filteredParticipants.filter((p) => {
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

          if (args.onFilterChange) {
            args.onFilterChange(filters);
          }
        },
        containerId: containerId,
      };

      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        // Verificar que el contenedor esté en el DOM
        const containerInDOM = document.getElementById(containerId);
        if (!containerInDOM) {
          console.warn(`⚠️ [ParticipantsMenu Implementation] Contenedor ${containerId} no encontrado en DOM, reintentando...`);
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
          }, 50);
          return;
        }

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
      });
    };

    // Asegurar que el contenedor esté en el DOM antes de crear el menú
    // Esto es especialmente importante para Docs
    requestAnimationFrame(() => {
      // Verificar que el contenedor esté en el DOM
      const containerInDOM = document.getElementById(containerId);
      if (!containerInDOM) {
        console.warn(`⚠️ [ParticipantsMenu Implementation] Contenedor ${containerId} no encontrado en DOM inicial, reintentando...`);
        setTimeout(() => {
          createMenuContent();
        }, 100);
        return;
      }
      // Crear contenido inicial
      createMenuContent();
    });

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

    return container;
  },
};

export const Default: Story = {
  args: {
    title: 'Participantes',
    searchPlaceholder: 'Buscar participan...',
    participants: sampleParticipants,
    selectedParticipantId: '1',
    showAvatar: true,
    showRole: true,
    showStatusTag: true,
    enableScrollbar: true,
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.setAttribute('data-ubits-id', '🧩-ux-participants-menu');
    container.setAttribute('data-ubits-component', 'ParticipantsMenu');
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
      height: 600px;
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
      statuses: [],
    };
    // Lista completa de participantes (todos los disponibles, sin filtrar)
    // Usar los participantes de args si existen, sino usar sampleParticipants
    const allParticipants = (args.participants && args.participants.length > 0) 
      ? [...args.participants] 
      : [...sampleParticipants];

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
        ? (existingMenu.querySelector('.ubits-input') as HTMLInputElement)
        : (menuContainer.querySelector('.ubits-input') as HTMLInputElement);

      let cursorPosition = 0;
      let shouldRestoreFocus = false;

      if (existingInput) {
        preservedSearchValue = existingInput.value || '';
        cursorPosition = existingInput.selectionStart || 0;
        shouldRestoreFocus = document.activeElement === existingInput;
      }

      menuContainer.innerHTML = '';

      // Limpiar participant.selected de todos los participantes para evitar que quede pegado
      // Usar allParticipants si args.participants está vacío o no existe
      const currentParticipants = (args.participants && args.participants.length > 0) 
        ? args.participants 
        : allParticipants;
      const cleanedParticipants = currentParticipants.map((p) => ({
        ...p,
        selected: false, // Limpiar selected para que solo use selectedParticipantId
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

            let filteredParticipants: Participant[] = [...allParticipants];

            // Aplicar búsqueda de texto
            if (searchText && searchText.trim() !== '') {
              filteredParticipants = filteredParticipants.filter((p) => {
                const matchesName = p.name.toLowerCase().includes(searchText.toLowerCase());
                const matchesRole = p.role.toLowerCase().includes(searchText.toLowerCase());
                return matchesName || matchesRole;
              });
            }

            // Aplicar filtros de roles
            if (activeFilters.roles.length > 0) {
              filteredParticipants = filteredParticipants.filter((p) =>
                activeFilters.roles.includes(p.role),
              );
            }

            // Aplicar filtros de estados
            if (activeFilters.statuses.length > 0) {
              filteredParticipants = filteredParticipants.filter(
                (p) => p.status && activeFilters.statuses.includes(p.status),
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
          let filteredParticipants = [...allParticipants];

          // Filtrar por roles
          if (filters.roles.length > 0) {
            filteredParticipants = filteredParticipants.filter((p) =>
              filters.roles.includes(p.role),
            );
          }

          // Filtrar por estados
          if (filters.statuses.length > 0) {
            filteredParticipants = filteredParticipants.filter(
              (p) => p.status && filters.statuses.includes(p.status),
            );
          }

          // También aplicar búsqueda si hay texto
          if (preservedSearchValue && preservedSearchValue.trim() !== '') {
            filteredParticipants = filteredParticipants.filter((p) => {
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
        containerId: containerId,
      };

      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        // Verificar que el contenedor esté en el DOM
        const containerInDOM = document.getElementById(containerId);
        if (!containerInDOM) {
          console.warn(`⚠️ [ParticipantsMenu Default] Contenedor ${containerId} no encontrado en DOM, reintentando...`);
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
          }, 50);
          return;
        }

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
      });
    };

    // Asegurar que el contenedor esté en el DOM antes de crear el menú
    // Esto es especialmente importante para Docs
    requestAnimationFrame(() => {
      // Verificar que el contenedor esté en el DOM
      const containerInDOM = document.getElementById(containerId);
      if (!containerInDOM) {
        console.warn(`⚠️ [ParticipantsMenu Default] Contenedor ${containerId} no encontrado en DOM inicial, reintentando...`);
        setTimeout(() => {
          createMenuContent();
        }, 100);
        return;
      }
      // Crear contenido inicial
      createMenuContent();
    });

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
  },
};
