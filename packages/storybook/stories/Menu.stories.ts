import type { Meta, StoryObj } from '@storybook/html';
import { renderMenu, createMenu } from '../../components/menu/src/MenuProvider';
import type { MenuOptions, MenuSection, MenuItem, MenuUserInfo } from '../../components/menu/src/types/MenuOptions';
import '../../components/menu/src/styles/menu.css';
import '../../components/badge/src/styles/badge.css';

// Tipos extendidos para Storybook con controles individuales
interface MenuStoryArgs {
  logoImage?: string;
  appName?: string;
  logoHref?: string;
  width?: number | string;
  // Sección 1
  section1Title?: string;
  section1Item1Label?: string;
  section1Item1Icon?: string;
  section1Item1IconStyle?: 'regular' | 'solid';
  section1Item1Active?: boolean;
  section1Item1Disabled?: boolean;
  section1Item2Label?: string;
  section1Item2Icon?: string;
  section1Item2IconStyle?: 'regular' | 'solid';
  section1Item2Active?: boolean;
  section1Item2Disabled?: boolean;
  // Sección 2
  section2Title?: string;
  section2Item1Label?: string;
  section2Item1Icon?: string;
  section2Item1IconStyle?: 'regular' | 'solid';
  section2Item1Active?: boolean;
  section2Item1Disabled?: boolean;
  section2Item2Label?: string;
  section2Item2Icon?: string;
  section2Item2IconStyle?: 'regular' | 'solid';
  section2Item2Badge?: number;
  section2Item2BadgeVariant?: 'success' | 'warning' | 'error' | 'info';
  section2Item2Active?: boolean;
  section2Item2Disabled?: boolean;
  section2Item3Label?: string;
  section2Item3Icon?: string;
  section2Item3IconStyle?: 'regular' | 'solid';
  section2Item3Active?: boolean;
  section2Item3Disabled?: boolean;
  // Usuario
  userAvatarImage?: string;
  userName?: string;
  userRole?: string;
}

const meta: Meta<MenuStoryArgs> = {
  title: 'Navegación/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Menu UBITS de navegación lateral con secciones, items, shortcuts, badges e información de usuario. Usa tokens UBITS para colores, tipografía y espaciado.`
}
},
    layout: 'padded'
},
  argTypes: {
    // Header
    logoImage: {
      control: { type: 'text' },
      description: 'URL de la imagen del logo',
      table: {
        category: 'Header',
        type: { summary: 'string' }
}
},
    appName: {
      control: { type: 'text' },
      description: 'Nombre de la aplicación',
      table: {
        category: 'Header',
        type: { summary: 'string' }
}
},
    logoHref: {
      control: { type: 'text' },
      description: 'URL a la que redirige el logo',
      table: {
        category: 'Header',
        type: { summary: 'string' }
}
},
    width: {
      control: { type: 'number' },
      description: 'Ancho del menú en píxeles',
      table: {
        category: 'Layout',
        type: { summary: 'number' },
        defaultValue: { summary: 280 }
}
},
    // Sección 1
    section1Title: {
      control: { type: 'text' },
      description: 'Título de la primera sección',
      table: {
        category: 'Sección 1',
        type: { summary: 'string' }
}
},
    section1Item1Label: {
      control: { type: 'text' },
      description: 'Label del primer item de la sección 1',
      table: {
        category: 'Sección 1 - Item 1'
}
},
    section1Item1Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 1 - Item 1'
}
},
    section1Item1IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: 'regular' }
}
},
    section1Item1Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: false }
}
},
    section1Item1Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 1 - Item 1',
        defaultValue: { summary: false }
}
},
    section1Item2Label: {
      control: { type: 'text' },
      description: 'Label del segundo item de la sección 1',
      table: {
        category: 'Sección 1 - Item 2'
}
},
    section1Item2Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 1 - Item 2'
}
},
    section1Item2IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: 'regular' }
}
},
    section1Item2Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: false }
}
},
    section1Item2Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 1 - Item 2',
        defaultValue: { summary: false }
}
},
    // Sección 2
    section2Title: {
      control: { type: 'text' },
      description: 'Título de la segunda sección',
      table: {
        category: 'Sección 2',
        type: { summary: 'string' }
}
},
    section2Item1Label: {
      control: { type: 'text' },
      description: 'Label del primer item de la sección 2',
      table: {
        category: 'Sección 2 - Item 1'
}
},
    section2Item1Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 1'
}
},
    section2Item1IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: 'regular' }
}
},
    section2Item1Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: false }
}
},
    section2Item1Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 1',
        defaultValue: { summary: false }
}
},
    section2Item2Label: {
      control: { type: 'text' },
      description: 'Label del segundo item de la sección 2',
      table: {
        category: 'Sección 2 - Item 2'
}
},
    section2Item2Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 2'
}
},
    section2Item2IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 'regular' }
}
},
    section2Item2Badge: {
      control: { type: 'number' },
      description: 'Número del badge (0 para ocultar)',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 0 }
}
},
    section2Item2BadgeVariant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
      description: 'Variante del badge',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: 'error' }
}
},
    section2Item2Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: false }
}
},
    section2Item2Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 2',
        defaultValue: { summary: false }
}
},
    section2Item3Label: {
      control: { type: 'text' },
      description: 'Label del tercer item de la sección 2',
      table: {
        category: 'Sección 2 - Item 3'
}
},
    section2Item3Icon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome (sin prefijo fa-)',
      table: {
        category: 'Sección 2 - Item 3'
}
},
    section2Item3IconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: 'regular' }
}
},
    section2Item3Active: {
      control: { type: 'boolean' },
      description: 'Si el item está activo',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: false }
}
},
    section2Item3Disabled: {
      control: { type: 'boolean' },
      description: 'Si el item está deshabilitado',
      table: {
        category: 'Sección 2 - Item 3',
        defaultValue: { summary: false }
}
},
    // Usuario
    userAvatarImage: {
      control: { type: 'text' },
      description: 'URL de la imagen del avatar',
      table: {
        category: 'Usuario',
        type: { summary: 'string' }
}
},
    userName: {
      control: { type: 'text' },
      description: 'Nombre del usuario',
      table: {
        category: 'Usuario',
        type: { summary: 'string' }
}
},
    userRole: {
      control: { type: 'text' },
      description: 'Rol del usuario',
      table: {
        category: 'Usuario',
        type: { summary: 'string' }
}
}
}
};

export default meta;
type Story = StoryObj<MenuStoryArgs>;

// Función helper para construir secciones desde los args
function buildSectionsFromArgs(args: MenuStoryArgs): MenuSection[] {
  const sections: MenuSection[] = [];

  // Sección 1
  if (args.section1Title) {
    const section1Items: MenuItem[] = [];
    
    if (args.section1Item1Label) {
      section1Items.push({
        id: 'section1-item1',
        label: args.section1Item1Label,
        icon: args.section1Item1Icon,
        iconStyle: args.section1Item1IconStyle || 'regular',
        active: args.section1Item1Active || false,
        disabled: args.section1Item1Disabled || false
});
    }
    
    if (args.section1Item2Label) {
      section1Items.push({
        id: 'section1-item2',
        label: args.section1Item2Label,
        icon: args.section1Item2Icon,
        iconStyle: args.section1Item2IconStyle || 'regular',
        active: args.section1Item2Active || false,
        disabled: args.section1Item2Disabled || false
});
    }

    if (section1Items.length > 0) {
      sections.push({
        id: 'section1',
        title: args.section1Title,
        items: section1Items
});
    }
  }

  // Sección 2
  if (args.section2Title) {
    const section2Items: MenuItem[] = [];
    
    if (args.section2Item1Label) {
      section2Items.push({
        id: 'section2-item1',
        label: args.section2Item1Label,
        icon: args.section2Item1Icon,
        iconStyle: args.section2Item1IconStyle || 'regular',
        active: args.section2Item1Active || false,
        disabled: args.section2Item1Disabled || false
});
    }
    
    if (args.section2Item2Label) {
      section2Items.push({
        id: 'section2-item2',
        label: args.section2Item2Label,
        icon: args.section2Item2Icon,
        iconStyle: args.section2Item2IconStyle || 'regular',
        badge: args.section2Item2Badge && args.section2Item2Badge > 0 
          ? { content: args.section2Item2Badge, variant: args.section2Item2BadgeVariant || 'error' }
          : undefined,
        active: args.section2Item2Active || false,
        disabled: args.section2Item2Disabled || false
});
    }
    
    if (args.section2Item3Label) {
      section2Items.push({
        id: 'section2-item3',
        label: args.section2Item3Label,
        icon: args.section2Item3Icon,
        iconStyle: args.section2Item3IconStyle || 'regular',
        active: args.section2Item3Active || false,
        disabled: args.section2Item3Disabled || false
});
    }

    if (section2Items.length > 0) {
      sections.push({
        id: 'section2',
        title: args.section2Title,
        items: section2Items
});
    }
  }

  return sections;
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    // Header
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    logoHref: '#',
    width: 280,
    // Sección 1
    section1Title: 'Documents',
    section1Item1Label: 'New',
    section1Item1Icon: 'plus',
    section1Item1IconStyle: 'regular',
    section1Item1Active: false,
    section1Item1Disabled: false,
    section1Item2Label: 'Search',
    section1Item2Icon: 'search',
    section1Item2IconStyle: 'regular',
    section1Item2Active: false,
    section1Item2Disabled: false,
    // Sección 2
    section2Title: 'Profile',
    section2Item1Label: 'Settings',
    section2Item1Icon: 'gear',
    section2Item1IconStyle: 'regular',
    section2Item1Active: true,
    section2Item1Disabled: false,
    section2Item2Label: 'Messages',
    section2Item2Icon: 'envelope',
    section2Item2IconStyle: 'regular',
    section2Item2Badge: 2,
    section2Item2BadgeVariant: 'error',
    section2Item2Active: false,
    section2Item2Disabled: false,
    section2Item3Label: 'Logout',
    section2Item3Icon: 'sign-out',
    section2Item3IconStyle: 'regular',
    section2Item3Active: false,
    section2Item3Disabled: false,
    // Usuario
    userAvatarImage: '/images/Profile-image.jpg',
    userName: 'Amy Elsner',
    userRole: 'Admin'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = '
      display: flex;
      background: var(--modifiers-normal-color-light-bg-2);
      overflow: hidden;
    `;

    // Construir opciones del menú desde los args
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole
      ? {
          avatarImage: args.userAvatarImage,
          name: args.userName,
          role: args.userRole
}
      : undefined;

    const menuOptions: MenuOptions = {
      containerId: 'menu-story-container',
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections,
      userInfo: userInfo,
      onActiveItemChange: (itemId, sectionId) => {
        // Handler para cambio de item activo
      },
      onAvatarClick: () => {
        // Handler para click en avatar
      }
};

    // Contenedor del menú
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu-story-container';
    menuContainer.style.cssText = `
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

    // Renderizar HTML directamente (sin containerId para evitar el error)
    const menuOptionsWithoutContainer: Omit<MenuOptions, 'containerId'> = {
      ...menuOptions
};
    delete (menuOptionsWithoutContainer as any).containerId;
    
    menuContainer.innerHTML = renderMenu(menuOptionsWithoutContainer);
    container.appendChild(menuContainer);

    // Inicializar eventos después de que el contenedor esté en el DOM
    requestAnimationFrame(() => {
      const menuEl = menuContainer.querySelector('.ubits-menu') as HTMLElement;
      if (menuEl) {
        // Inicializar eventos básicos
        const menuItems = menuEl.querySelectorAll('.ubits-menu-item');
        menuItems.forEach((itemElement) => {
          const itemId = itemElement.getAttribute('data-item-id');
          const sectionId = itemElement.getAttribute('data-section-id');
          
          if (!itemId || !sectionId) return;

          const section = menuOptions.sections.find(s => s.id === sectionId);
          const item = section?.items.find(i => i.id === itemId);
          
          if (!item) return;

          itemElement.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (item.disabled) return;

            menuItems.forEach(btn => btn.classList.remove('ubits-menu-item--active'));
            itemElement.classList.add('ubits-menu-item--active');

            if (menuOptions.onActiveItemChange) {
              menuOptions.onActiveItemChange(itemId, sectionId);
            }

            if (item.onClick) {
              item.onClick(e as MouseEvent, item);
            } else if (item.href) {
              window.location.href = item.href;
            }
          });
        });

        // Click en logo
        const logoElement = menuEl.querySelector('.ubits-menu-logo');
        if (logoElement && menuOptions.logoHref) {
          logoElement.addEventListener('click', () => {
            window.location.href = menuOptions.logoHref!;
          });
        }

        // Click en avatar
        const avatarElement = menuEl.querySelector('.ubits-menu-user-avatar');
        if (avatarElement && menuOptions.userInfo?.onAvatarClick) {
          avatarElement.addEventListener('click', (e) => {
            e.preventDefault();
            menuOptions.userInfo!.onAvatarClick!();
          });
        }
      }
    });

    // Panel de información (opcional, para mostrar detalles)
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      flex: 1;
      background: var(--modifiers-normal-color-light-bg-1);
      border-left: 1px solid var(--modifiers-normal-color-light-border-1);
      overflow-y: auto;
    `;

    const infoContent = document.createElement('div');
    infoContent.style.cssText = `
      font-family: var(--font-family-noto-sans-font-family);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      line-height: 1.6;
    `;

    infoContent.innerHTML = `
        <li>Logo de Autoframe y nombre de la aplicación</li>
        <li>Secciones con títulos</li>
        <li>Items con iconos, texto y badges</li>
        <li>Información del usuario al final</li>
      </ul>
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta items activos, deshabilitados</li>
        <li>Badges de UBITS con diferentes variantes</li>
        <li>Responsive design</li>
      </ul>
        <strong>Nota:</strong> Usa los controles en el panel lateral para personalizar todos los aspectos del menú.
      </p>
    `;

    infoPanel.appendChild(infoContent);
    container.appendChild(infoPanel);

    return container;
  }
};

// Helper para renderizar Menu de manera consistente
function renderMenuStory(options: MenuOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    background: var(--modifiers-normal-color-light-bg-2);
    overflow: hidden;
    min-height: 600px;
  `;

  const menuContainer = document.createElement('div');
  menuContainer.id = `menu-container-${Date.now()}`;
  menuContainer.style.cssText = `
    position: relative;
    background: var(--modifiers-normal-color-light-bg-1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  // Renderizar HTML directamente
  const menuOptionsWithoutContainer: Omit<MenuOptions, 'containerId'> = {
    ...options
  };
  delete (menuOptionsWithoutContainer as any).containerId;
  
  menuContainer.innerHTML = renderMenu(menuOptionsWithoutContainer);
  container.appendChild(menuContainer);

  // Inicializar eventos después de que el contenedor esté en el DOM
  requestAnimationFrame(() => {
    const menuEl = menuContainer.querySelector('.ubits-menu') as HTMLElement;
    if (menuEl) {
      // Inicializar eventos básicos
      const menuItems = menuEl.querySelectorAll('.ubits-menu-item');
      menuItems.forEach((itemElement) => {
        const itemId = itemElement.getAttribute('data-item-id');
        const sectionId = itemElement.getAttribute('data-section-id');
        
        if (!itemId || !sectionId) return;

        const section = options.sections.find(s => s.id === sectionId);
        const item = section?.items.find(i => i.id === itemId);
        
        if (!item) return;

        itemElement.addEventListener('click', (e) => {
          e.preventDefault();
          
          if (item.disabled) return;

          menuItems.forEach(btn => btn.classList.remove('ubits-menu-item--active'));
          itemElement.classList.add('ubits-menu-item--active');

          if (options.onActiveItemChange) {
            options.onActiveItemChange(itemId, sectionId);
          }

          if (item.onClick) {
            item.onClick(e as MouseEvent, item);
          } else if (item.href) {
            window.location.href = item.href;
          }
        });
      });

      // Click en logo
      const logoElement = menuEl.querySelector('.ubits-menu-logo');
      if (logoElement && options.logoHref) {
        logoElement.addEventListener('click', () => {
          window.location.href = options.logoHref!;
        });
      }

      // Click en avatar
      const avatarElement = menuEl.querySelector('.ubits-menu-user-avatar');
      if (avatarElement && options.userInfo?.onAvatarClick) {
        avatarElement.addEventListener('click', (e) => {
          e.preventDefault();
          options.userInfo!.onAvatarClick!();
        });
      }
    }
  });

  return container;
}

/**
 * WithLogo
 * Con logo
 */
export const WithLogo: Story = {
  name: 'With Logo',
  args: {
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con logo visible.',
      },
    },
  },
};

/**
 * WithoutLogo
 * Sin logo
 */
export const WithoutLogo: Story = {
  name: 'Without Logo',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu sin logo.',
      },
    },
  },
};

/**
 * WithAppName
 * Con nombre de aplicación
 */
export const WithAppName: Story = {
  name: 'With App Name',
  args: {
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      logoImage: args.logoImage,
      appName: args.appName,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con nombre de aplicación visible.',
      },
    },
  },
};

/**
 * WithoutAppName
 * Sin nombre de aplicación
 */
export const WithoutAppName: Story = {
  name: 'Without App Name',
  args: {
    logoImage: '/images/autoframe-logo-light.svg',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      logoImage: args.logoImage,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu sin nombre de aplicación.',
      },
    },
  },
};

/**
 * WithLogoHref
 * Con URL en el logo
 */
export const WithLogoHref: Story = {
  name: 'With Logo Href',
  args: {
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    logoHref: '#',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con URL en el logo (clickeable).',
      },
    },
  },
};

/**
 * WithoutLogoHref
 * Sin URL en el logo
 */
export const WithoutLogoHref: Story = {
  name: 'Without Logo Href',
  args: {
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      logoImage: args.logoImage,
      appName: args.appName,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu sin URL en el logo (no clickeable).',
      },
    },
  },
};

/**
 * SingleSection
 * Una sola sección
 */
export const SingleSection: Story = {
  name: 'Single Section',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con una sola sección.',
      },
    },
  },
};

/**
 * MultipleSections
 * Múltiples secciones
 */
export const MultipleSections: Story = {
  name: 'Multiple Sections',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      },
      {
        id: 'section2',
        title: 'Profile',
        items: [
          { id: 'settings', label: 'Settings', icon: 'gear' },
          { id: 'messages', label: 'Messages', icon: 'envelope', badge: { content: 2, variant: 'error' } },
          { id: 'logout', label: 'Logout', icon: 'sign-out' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        },
        {
          id: 'section2',
          title: 'Profile',
          items: [
            { id: 'settings', label: 'Settings', icon: 'gear' },
            { id: 'messages', label: 'Messages', icon: 'envelope', badge: { content: 2, variant: 'error' } },
            { id: 'logout', label: 'Logout', icon: 'sign-out' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con múltiples secciones.',
      },
    },
  },
};

/**
 * ItemWithIcon
 * Item con icono
 */
export const ItemWithIcon: Story = {
  name: 'Item - With Icon',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
          { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' },
          { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'regular' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
            { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' },
            { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'regular' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items que tienen iconos.',
      },
    },
  },
};

/**
 * ItemWithoutIcon
 * Item sin icono
 */
export const ItemWithoutIcon: Story = {
  name: 'Item - Without Icon',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New' },
          { id: 'search', label: 'Search' },
          { id: 'open', label: 'Open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New' },
            { id: 'search', label: 'Search' },
            { id: 'open', label: 'Open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items sin iconos.',
      },
    },
  },
};

/**
 * IconStyleRegular
 * Icono estilo regular
 */
export const IconStyleRegular: Story = {
  name: 'Icon Style - Regular',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
          { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' },
          { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'regular' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
            { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' },
            { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'regular' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con iconos estilo regular.',
      },
    },
  },
};

/**
 * IconStyleSolid
 * Icono estilo solid
 */
export const IconStyleSolid: Story = {
  name: 'Icon Style - Solid',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus', iconStyle: 'solid' },
          { id: 'search', label: 'Search', icon: 'search', iconStyle: 'solid' },
          { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'solid' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus', iconStyle: 'solid' },
            { id: 'search', label: 'Search', icon: 'search', iconStyle: 'solid' },
            { id: 'open', label: 'Open', icon: 'folder-open', iconStyle: 'solid' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con iconos estilo solid.',
      },
    },
  },
};

/**
 * ItemWithBadge
 * Item con badge
 */
export const ItemWithBadge: Story = {
  name: 'Item - With Badge',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Messages',
        items: [
          { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: { content: 5, variant: 'error' } },
          { id: 'sent', label: 'Sent', icon: 'paper-plane', badge: { content: 12, variant: 'info' } },
          { id: 'drafts', label: 'Drafts', icon: 'file', badge: { content: 3, variant: 'warning' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Messages',
          items: [
            { id: 'inbox', label: 'Inbox', icon: 'inbox', badge: { content: 5, variant: 'error' } },
            { id: 'sent', label: 'Sent', icon: 'paper-plane', badge: { content: 12, variant: 'info' } },
            { id: 'drafts', label: 'Drafts', icon: 'file', badge: { content: 3, variant: 'warning' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items que tienen badges.',
      },
    },
  },
};

/**
 * ItemWithoutBadge
 * Item sin badge
 */
export const ItemWithoutBadge: Story = {
  name: 'Item - Without Badge',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items sin badges.',
      },
    },
  },
};

/**
 * BadgeVariantSuccess
 * Badge variante success
 */
export const BadgeVariantSuccess: Story = {
  name: 'Badge Variant - Success',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Notifications',
        items: [
          { id: 'success', label: 'Success', icon: 'check-circle', badge: { content: 10, variant: 'success' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Notifications',
          items: [
            { id: 'success', label: 'Success', icon: 'check-circle', badge: { content: 10, variant: 'success' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con badge variante success.',
      },
    },
  },
};

/**
 * BadgeVariantWarning
 * Badge variante warning
 */
export const BadgeVariantWarning: Story = {
  name: 'Badge Variant - Warning',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Notifications',
        items: [
          { id: 'warning', label: 'Warning', icon: 'exclamation-triangle', badge: { content: 5, variant: 'warning' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Notifications',
          items: [
            { id: 'warning', label: 'Warning', icon: 'exclamation-triangle', badge: { content: 5, variant: 'warning' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con badge variante warning.',
      },
    },
  },
};

/**
 * BadgeVariantError
 * Badge variante error
 */
export const BadgeVariantError: Story = {
  name: 'Badge Variant - Error',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Notifications',
        items: [
          { id: 'error', label: 'Error', icon: 'times-circle', badge: { content: 3, variant: 'error' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Notifications',
          items: [
            { id: 'error', label: 'Error', icon: 'times-circle', badge: { content: 3, variant: 'error' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con badge variante error.',
      },
    },
  },
};

/**
 * BadgeVariantInfo
 * Badge variante info
 */
export const BadgeVariantInfo: Story = {
  name: 'Badge Variant - Info',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Notifications',
        items: [
          { id: 'info', label: 'Info', icon: 'info-circle', badge: { content: 7, variant: 'info' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Notifications',
          items: [
            { id: 'info', label: 'Info', icon: 'info-circle', badge: { content: 7, variant: 'info' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con badge variante info.',
      },
    },
  },
};

/**
 * ItemActive
 * Item activo
 */
export const ItemActive: Story = {
  name: 'Item - Active',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search', active: true },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search', active: true },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con item activo (seleccionado).',
      },
    },
  },
};

/**
 * ItemDisabled
 * Item deshabilitado
 */
export const ItemDisabled: Story = {
  name: 'Item - Disabled',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search', disabled: true },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search', disabled: true },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con item deshabilitado (no clickeable).',
      },
    },
  },
};

/**
 * ItemWithHref
 * Item con URL (href)
 */
export const ItemWithHref: Story = {
  name: 'Item - With Href',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Navigation',
        items: [
          { id: 'home', label: 'Home', icon: 'home', href: '#home' },
          { id: 'about', label: 'About', icon: 'info-circle', href: '#about' },
          { id: 'contact', label: 'Contact', icon: 'envelope', href: '#contact' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Navigation',
          items: [
            { id: 'home', label: 'Home', icon: 'home', href: '#home' },
            { id: 'about', label: 'About', icon: 'info-circle', href: '#about' },
            { id: 'contact', label: 'Contact', icon: 'envelope', href: '#contact' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items que tienen URLs (href).',
      },
    },
  },
};

/**
 * ItemWithOnClick
 * Item con callback onClick
 */
export const ItemWithOnClick: Story = {
  name: 'Item - With OnClick',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Actions',
        items: [
          { id: 'new', label: 'New', icon: 'plus', onClick: () => alert('New clicked') },
          { id: 'save', label: 'Save', icon: 'save', onClick: () => alert('Save clicked') },
          { id: 'delete', label: 'Delete', icon: 'trash', onClick: () => alert('Delete clicked') }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Actions',
          items: [
            { id: 'new', label: 'New', icon: 'plus', onClick: () => alert('New clicked') },
            { id: 'save', label: 'Save', icon: 'save', onClick: () => alert('Save clicked') },
            { id: 'delete', label: 'Delete', icon: 'trash', onClick: () => alert('Delete clicked') }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * ItemWithoutHrefOrOnClick
 * Item sin href ni onClick
 */
export const ItemWithoutHrefOrOnClick: Story = {
  name: 'Item - Without Href or OnClick',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con items sin href ni onClick (solo visual).',
      },
    },
  },
};

/**
 * WithUserInfo
 * Con información del usuario
 */
export const WithUserInfo: Story = {
  name: 'With User Info',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ],
    userInfo: {
      avatarImage: '/images/Profile-image.jpg',
      name: 'Amy Elsner',
      role: 'Admin'
    }
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole
      ? {
          avatarImage: args.userAvatarImage,
          name: args.userName,
          role: args.userRole
        }
      : {
          avatarImage: '/images/Profile-image.jpg',
          name: 'Amy Elsner',
          role: 'Admin'
        };
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ],
      userInfo: userInfo
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con información del usuario visible.',
      },
    },
  },
};

/**
 * WithoutUserInfo
 * Sin información del usuario
 */
export const WithoutUserInfo: Story = {
  name: 'Without User Info',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu sin información del usuario.',
      },
    },
  },
};

/**
 * UserInfoWithAvatarClick
 * Información del usuario con callback onAvatarClick
 */
export const UserInfoWithAvatarClick: Story = {
  name: 'User Info - With Avatar Click',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' }
        ]
      }
    ],
    userInfo: {
      avatarImage: '/images/Profile-image.jpg',
      name: 'Amy Elsner',
      role: 'Admin',
      onAvatarClick: () => alert('Avatar clicked')
    }
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole
      ? {
          avatarImage: args.userAvatarImage,
          name: args.userName,
          role: args.userRole,
          onAvatarClick: () => alert('Avatar clicked')
        }
      : {
          avatarImage: '/images/Profile-image.jpg',
          name: 'Amy Elsner',
          role: 'Admin',
          onAvatarClick: () => alert('Avatar clicked')
        };
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' }
          ]
        }
      ],
      userInfo: userInfo
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con información del usuario y callback onAvatarClick.',
      },
    },
  },
};

/**
 * OnActiveItemChangeCallback
 * Callback cuando cambia el item activo
 */
export const OnActiveItemChangeCallback: Story = {
  name: 'On Active Item Change Callback',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ],
    onActiveItemChange: (itemId, sectionId) => {
      alert(`Item activo cambiado: ${itemId} en sección ${sectionId}`);
    }
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ],
      onActiveItemChange: (itemId, sectionId) => {
        alert(`Item activo cambiado: ${itemId} en sección ${sectionId}`);
      }
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con callback onActiveItemChange cuando cambia el item activo.',
      },
    },
  },
};

/**
 * CustomWidth
 * Ancho personalizado
 */
export const CustomWidth: Story = {
  name: 'Custom Width',
  args: {
    width: 320,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: 320,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con ancho personalizado (320px).',
      },
    },
  },
};

/**
 * DefaultWidth
 * Ancho por defecto
 */
export const DefaultWidth: Story = {
  name: 'Default Width',
  args: {
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'search', label: 'Search', icon: 'search' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con ancho por defecto (sin especificar width).',
      },
    },
  },
};

/**
 * ManyItems
 * Muchos items en una sección
 */
export const ManyItems: Story = {
  name: 'Many Items',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'open', label: 'Open', icon: 'folder-open' },
          { id: 'save', label: 'Save', icon: 'save' },
          { id: 'save-as', label: 'Save As', icon: 'save' },
          { id: 'export', label: 'Export', icon: 'download' },
          { id: 'import', label: 'Import', icon: 'upload' },
          { id: 'print', label: 'Print', icon: 'print' },
          { id: 'share', label: 'Share', icon: 'share' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'open', label: 'Open', icon: 'folder-open' },
            { id: 'save', label: 'Save', icon: 'save' },
            { id: 'save-as', label: 'Save As', icon: 'save' },
            { id: 'export', label: 'Export', icon: 'download' },
            { id: 'import', label: 'Import', icon: 'upload' },
            { id: 'print', label: 'Print', icon: 'print' },
            { id: 'share', label: 'Share', icon: 'share' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con muchos items en una sección (8 items).',
      },
    },
  },
};

/**
 * FewItems
 * Pocos items en una sección
 */
export const FewItems: Story = {
  name: 'Few Items',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con pocos items en una sección (2 items).',
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
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'Crear nuevo documento', icon: 'plus' },
          { id: 'search', label: 'Buscar en documentos', icon: 'search' },
          { id: 'open', label: 'Abrir documento existente', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'Crear nuevo documento', icon: 'plus' },
            { id: 'search', label: 'Buscar en documentos', icon: 'search' },
            { id: 'open', label: 'Abrir documento existente', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con labels largos.',
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
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Docs',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'open', label: 'Open', icon: 'folder-open' },
          { id: 'save', label: 'Save', icon: 'save' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Docs',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'open', label: 'Open', icon: 'folder-open' },
            { id: 'save', label: 'Save', icon: 'save' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu con labels cortos.',
      },
    },
  },
};

/**
 * AllBadgeVariants
 * Todas las variantes de badge
 */
export const AllBadgeVariants: Story = {
  name: 'All Badge Variants',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Notifications',
        items: [
          { id: 'success', label: 'Success', icon: 'check-circle', badge: { content: 10, variant: 'success' } },
          { id: 'warning', label: 'Warning', icon: 'exclamation-triangle', badge: { content: 5, variant: 'warning' } },
          { id: 'error', label: 'Error', icon: 'times-circle', badge: { content: 3, variant: 'error' } },
          { id: 'info', label: 'Info', icon: 'info-circle', badge: { content: 7, variant: 'info' } }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Notifications',
          items: [
            { id: 'success', label: 'Success', icon: 'check-circle', badge: { content: 10, variant: 'success' } },
            { id: 'warning', label: 'Warning', icon: 'exclamation-triangle', badge: { content: 5, variant: 'warning' } },
            { id: 'error', label: 'Error', icon: 'times-circle', badge: { content: 3, variant: 'error' } },
            { id: 'info', label: 'Info', icon: 'info-circle', badge: { content: 7, variant: 'info' } }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu mostrando todas las variantes de badge (success, warning, error, info).',
      },
    },
  },
};

/**
 * AllIconStyles
 * Todos los estilos de icono
 */
export const AllIconStyles: Story = {
  name: 'All Icon Styles',
  args: {
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'regular', label: 'Regular Icon', icon: 'star', iconStyle: 'regular' },
          { id: 'solid', label: 'Solid Icon', icon: 'star', iconStyle: 'solid' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'regular', label: 'Regular Icon', icon: 'star', iconStyle: 'regular' },
            { id: 'solid', label: 'Solid Icon', icon: 'star', iconStyle: 'solid' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu mostrando todos los estilos de icono (regular, solid).',
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
    logoImage: '/images/autoframe-logo-light.svg',
    appName: 'AUTOFROME',
    logoHref: '#',
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
          { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' }
        ]
      },
      {
        id: 'section2',
        title: 'Profile',
        items: [
          { id: 'settings', label: 'Settings', icon: 'gear', iconStyle: 'regular', active: true },
          { id: 'messages', label: 'Messages', icon: 'envelope', iconStyle: 'regular', badge: { content: 2, variant: 'error' } },
          { id: 'logout', label: 'Logout', icon: 'sign-out', iconStyle: 'regular' }
        ]
      }
    ],
    userInfo: {
      avatarImage: '/images/Profile-image.jpg',
      name: 'Amy Elsner',
      role: 'Admin',
      onAvatarClick: () => alert('Avatar clicked')
    },
    onActiveItemChange: (itemId, sectionId) => {
      console.log('Active item changed:', itemId, sectionId);
    }
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const userInfo: MenuUserInfo | undefined = args.userAvatarImage && args.userName && args.userRole
      ? {
          avatarImage: args.userAvatarImage,
          name: args.userName,
          role: args.userRole,
          onAvatarClick: () => alert('Avatar clicked')
        }
      : {
          avatarImage: '/images/Profile-image.jpg',
          name: 'Amy Elsner',
          role: 'Admin',
          onAvatarClick: () => alert('Avatar clicked')
        };
    const options: MenuOptions = {
      logoImage: args.logoImage,
      appName: args.appName,
      logoHref: args.logoHref,
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus', iconStyle: 'regular' },
            { id: 'search', label: 'Search', icon: 'search', iconStyle: 'regular' }
          ]
        },
        {
          id: 'section2',
          title: 'Profile',
          items: [
            { id: 'settings', label: 'Settings', icon: 'gear', iconStyle: 'regular', active: true },
            { id: 'messages', label: 'Messages', icon: 'envelope', iconStyle: 'regular', badge: { content: 2, variant: 'error' } },
            { id: 'logout', label: 'Logout', icon: 'sign-out', iconStyle: 'regular' }
          ]
        }
      ],
      userInfo: userInfo,
      onActiveItemChange: (itemId, sectionId) => {
        console.log('Active item changed:', itemId, sectionId);
      }
    };
    return renderMenuStory(options);
  },
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
    width: 280,
    sections: [
      {
        id: 'section1',
        title: 'Documents',
        items: [
          { id: 'new', label: 'New', icon: 'plus' },
          { id: 'open', label: 'Open', icon: 'folder-open' }
        ]
      }
    ]
  },
  render: (args) => {
    const sections = buildSectionsFromArgs(args);
    const options: MenuOptions = {
      width: args.width || 280,
      sections: sections.length > 0 ? sections : [
        {
          id: 'section1',
          title: 'Documents',
          items: [
            { id: 'new', label: 'New', icon: 'plus' },
            { id: 'open', label: 'Open', icon: 'folder-open' }
          ]
        }
      ]
    };
    return renderMenuStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu mínimo con solo las opciones esenciales.',
      },
    },
  },
};

