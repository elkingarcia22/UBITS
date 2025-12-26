import type { Meta, StoryObj } from '@storybook/html';
import { renderSidebar, createSidebar } from '../../components/sidebar/src/SidebarProvider';
import { getSidebarConfig } from '../../components/sidebar/src/configs/sidebarVariants';
import type { SidebarOptions, SidebarVariant } from '../../components/sidebar/src/types/SidebarOptions';

const meta: Meta<SidebarOptions & { 
  variant?: SidebarVariant;
  activeButton?: string;
}> = {
  title: 'Navegación/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Sidebar UBITS de navegación lateral con 2 variantes (colaborador y admin). Incluye tooltips, menú de perfil, dark mode toggle y ajuste dinámico de altura. Ancho fijo 96px, colores fijos (no cambian con tema).`
}
},
    layout: 'fullscreen'
},
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['colaborador', 'admin'],
      description: 'Variante del sidebar: colaborador o admin',
      table: {
        defaultValue: { summary: 'colaborador' },
        type: { summary: 'colaborador | admin' }
}
},
    activeButton: {
      control: { type: 'select' },
      options: ['', 'admin', 'aprendizaje', 'diagnóstico', 'desempeño', 'encuestas', 'reclutamiento', 'tareas', 'ubits-ai', 'inicio', 'empresa'],
      description: 'Sección activa del sidebar (depende de la variante)',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' }
}
},
    darkModeEnabled: {
      control: { type: 'boolean' },
      description: 'Si el dark mode toggle está habilitado',
      table: {
        defaultValue: { summary: 'true' }
}
}
}
};

export default meta;
type Story = StoryObj<SidebarOptions & { variant?: SidebarVariant; activeButton?: string }>;

// Función helper para obtener configuración según variante
function getSidebarButtons(variant: SidebarVariant) {
  const config = getSidebarConfig(variant);
  return {
    bodyButtons: config.bodyButtons,
    footerButtons: config.footerButtons,
    profileMenuItems: config.profileMenuItems
  };
}

// Función para actualizar botón activo
function updateActiveButton(buttons: any[], activeButton: string) {
  return buttons.map(btn => ({
    ...btn,
    state: btn.section === activeButton ? 'active' as const : 'default' as const
  }));
}

export const Default: Story = {
  args: {
    containerId: 'sidebar-story-container',
    variant: 'colaborador',
    activeButton: '',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
} as SidebarOptions & { variant?: SidebarVariant; activeButton?: string },
  render: (args) => {
    // Crear un wrapper más amplio para el sidebar y la info (horizontal)
    let wrapper = document.getElementById('sidebar-story-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'sidebar-story-wrapper';
      wrapper.style.cssText = '
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
      document.body.appendChild(wrapper);
    } else {
      wrapper.innerHTML = '';
      wrapper.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 32px;
        max-width: 100%;
        width: 100%;
        background: var(--modifiers-normal-color-light-bg-2);
        padding: 24px;
      `;
    }
    
    // Contenedor solo para el sidebar
    const container = document.createElement('div');
    container.id = args.containerId || 'sidebar-story-container';
    container.style.cssText = `
      position: relative;
      width: 96px;
      height: 650px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `;

    // Agregar el contenedor al wrapper ANTES de crear el sidebar
    wrapper.appendChild(container);

    const variant = args.variant || 'colaborador';
    const activeButton = args.activeButton || '';
    const config = getSidebarButtons(variant);
    
    // Actualizar botones con estado activo
    const bodyButtons = updateActiveButton(config.bodyButtons, activeButton);
    const footerButtons = activeButton ? updateActiveButton(config.footerButtons || [], activeButton) : config.footerButtons || [];

    const sidebarOptions: SidebarOptions = {
      containerId: container.id,
      variant: variant,
      bodyButtons: bodyButtons,
      footerButtons: footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoHref: variant === 'admin' ? 'admin.html' : 'index.html',
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650,
      onActiveButtonChange: (section) => {
        // Active button changed
      },
      onDarkModeToggle: (isDark) => {
        // Dark mode toggled
        // NO actualizar el body/document, solo el contenedor (ya se hace en initDarkModeToggle)
      },
      onAvatarClick: () => {
        // Avatar clicked
      }
    };

    try {
      // El contenedor ya está en el DOM, ahora podemos crear el sidebar
      createSidebar(sidebarOptions);
    } catch (error) {
      console.error('Error creating sidebar:', error);
      // Fallback: renderizar HTML estático
      const sidebarHTML = renderSidebar(sidebarOptions);
      container.innerHTML = sidebarHTML;
    }

    // Agregar información del sidebar (formato horizontal con CSS Grid) - AL LADO del sidebar
    const info = document.createElement('div');
    info.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-2);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      line-height: 1.6;
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      font-family: var(--font-family-noto-sans-font-family);
      margin-top: 80px;
    `;
    
    // Crear el contenedor de información usando CSS Grid
    const infoGrid = document.createElement('div');
    infoGrid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 12px 32px;
      margin-bottom: 12px;
      align-items: baseline;
    `;
    
    infoGrid.innerHTML = `
      <div style="white-space: nowrap;"><strong>Variante:</strong> <span style="font-weight: 400;">${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</span></div>
      <div style="white-space: nowrap;"><strong>Botón activo:</strong> <span style="font-weight: 400;">${activeButton || 'Ninguno'}</span></div>
      <div style="white-space: nowrap;"><strong>Dark mode:</strong> <span style="font-weight: 400;">${args.darkModeEnabled !== false ? 'Habilitado' : 'Deshabilitado'}</span></div>
    `;
    
    info.appendChild(infoGrid);
    
    // Agregar el texto de instrucciones
    const instructions = document.createElement('div');
    instructions.style.cssText = `
      border-top: 1px solid var(--modifiers-normal-color-light-border-1);
      font-style: italic;
    `;
    instructions.textContent = 'Haz hover sobre los botones para ver los tooltips. Haz hover sobre el avatar para ver el menú de perfil. Haz clic en el botón de dark mode para cambiar el tema.';
    info.appendChild(instructions);
    
    wrapper.appendChild(info);

    return wrapper;
  }
};

// Helper para renderizar Sidebar de manera consistente
function renderSidebarStory(options: SidebarOptions) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
    max-width: 100%;
    width: 100%;
    background: var(--modifiers-normal-color-light-bg-2);
    padding: 24px;
    min-height: 650px;
  `;
  
  const container = document.createElement('div');
  container.id = options.containerId || `sidebar-container-${Date.now()}`;
  container.style.cssText = `
    position: relative;
    width: 96px;
    height: 650px;
    flex-shrink: 0;
    background: var(--modifiers-normal-color-light-bg-2);
  `;
  
  wrapper.appendChild(container);
  
  requestAnimationFrame(() => {
    try {
      createSidebar(options);
    } catch (error) {
      console.error('Error creating sidebar:', error);
      const sidebarHTML = renderSidebar(options);
      container.innerHTML = sidebarHTML;
    }
  });
  
  return wrapper;
}

/**
 * VariantColaborador
 * Variante colaborador
 */
export const VariantColaborador: Story = {
  name: 'Variant - Colaborador',
  args: {
    containerId: 'sidebar-colaborador-container',
    variant: 'colaborador',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-colaborador-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: config.footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar en variante colaborador.',
      },
    },
  },
};

/**
 * VariantAdmin
 * Variante admin
 */
export const VariantAdmin: Story = {
  name: 'Variant - Admin',
  args: {
    containerId: 'sidebar-admin-container',
    variant: 'admin',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
  },
  render: (args) => {
    const config = getSidebarButtons('admin');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-admin-container',
      variant: 'admin',
      bodyButtons: config.bodyButtons,
      footerButtons: config.footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar en variante admin (con botones del footer).',
      },
    },
  },
};

/**
 * WithBodyButtons
 * Con botones del body
 */
export const WithBodyButtons: Story = {
  name: 'With Body Buttons',
  args: {
    containerId: 'sidebar-body-buttons-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-body-buttons-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botones del body (navegación principal).',
      },
    },
  },
};

/**
 * WithoutBodyButtons
 * Sin botones del body
 */
export const WithoutBodyButtons: Story = {
  name: 'Without Body Buttons',
  args: {
    containerId: 'sidebar-no-body-buttons-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-no-body-buttons-container',
      variant: 'colaborador',
      bodyButtons: [],
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar sin botones del body.',
      },
    },
  },
};

/**
 * WithFooterButtons
 * Con botones del footer (admin)
 */
export const WithFooterButtons: Story = {
  name: 'With Footer Buttons',
  args: {
    containerId: 'sidebar-footer-buttons-container',
    variant: 'admin',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('admin');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-footer-buttons-container',
      variant: 'admin',
      bodyButtons: config.bodyButtons,
      footerButtons: config.footerButtons,
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botones del footer (solo en variante admin: API, Centro de ayuda).',
      },
    },
  },
};

/**
 * WithoutFooterButtons
 * Sin botones del footer
 */
export const WithoutFooterButtons: Story = {
  name: 'Without Footer Buttons',
  args: {
    containerId: 'sidebar-no-footer-buttons-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-no-footer-buttons-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar sin botones del footer (variante colaborador).',
      },
    },
  },
};

/**
 * ActiveButton
 * Con botón activo
 */
export const ActiveButton: Story = {
  name: 'Active Button',
  args: {
    containerId: 'sidebar-active-button-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const bodyButtons = updateActiveButton(config.bodyButtons, 'aprendizaje');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-active-button-container',
      variant: 'colaborador',
      bodyButtons: bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botón activo (Aprendizaje).',
      },
    },
  },
};

/**
 * NoActiveButton
 * Sin botón activo
 */
export const NoActiveButton: Story = {
  name: 'No Active Button',
  args: {
    containerId: 'sidebar-no-active-button-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-no-active-button-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar sin botón activo (todos en estado default).',
      },
    },
  },
};

/**
 * DisabledButton
 * Con botón deshabilitado
 */
export const DisabledButton: Story = {
  name: 'Disabled Button',
  args: {
    containerId: 'sidebar-disabled-button-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const bodyButtons = config.bodyButtons.map((btn, index) => ({
      ...btn,
      state: index === 2 ? 'disabled' as const : 'default' as const
    }));
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-disabled-button-container',
      variant: 'colaborador',
      bodyButtons: bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botón deshabilitado (tercer botón).',
      },
    },
  },
};

/**
 * ButtonWithHref
 * Botón con URL (href)
 */
export const ButtonWithHref: Story = {
  name: 'Button - With Href',
  args: {
    containerId: 'sidebar-button-href-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-button-href-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botones que tienen URLs (href).',
      },
    },
  },
};

/**
 * ButtonWithOnClick
 * Botón con callback onClick
 */
export const ButtonWithOnClick: Story = {
  name: 'Button - With OnClick',
  args: {
    containerId: 'sidebar-button-onclick-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const bodyButtons = [
      {
        section: 'aprendizaje',
        icon: 'fa-graduation-cap',
        tooltip: 'Aprendizaje',
        onClick: () => alert('Aprendizaje clicked'),
        state: 'active' as const
      },
      {
        section: 'diagnóstico',
        icon: 'fa-chart-mixed',
        tooltip: 'Diagnóstico',
        onClick: () => alert('Diagnóstico clicked')
      }
    ];
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-button-onclick-container',
      variant: 'colaborador',
      bodyButtons: bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con botones que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * WithProfileMenu
 * Con menú de perfil
 */
export const WithProfileMenu: Story = {
  name: 'With Profile Menu',
  args: {
    containerId: 'sidebar-profile-menu-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-profile-menu-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: config.profileMenuItems,
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con menú de perfil (aparece al hacer hover sobre el avatar).',
      },
    },
  },
};

/**
 * WithoutProfileMenu
 * Sin menú de perfil
 */
export const WithoutProfileMenu: Story = {
  name: 'Without Profile Menu',
  args: {
    containerId: 'sidebar-no-profile-menu-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-no-profile-menu-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar sin menú de perfil.',
      },
    },
  },
};

/**
 * ProfileMenuItemDivider
 * Item del menú de perfil como divider
 */
export const ProfileMenuItemDivider: Story = {
  name: 'Profile Menu Item - Divider',
  args: {
    containerId: 'sidebar-profile-menu-divider-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-profile-menu-divider-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: config.profileMenuItems, // Incluye dividers
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con menú de perfil que incluye dividers.',
      },
    },
  },
};

/**
 * WithDarkModeToggle
 * Con toggle de dark mode
 */
export const WithDarkModeToggle: Story = {
  name: 'With Dark Mode Toggle',
  args: {
    containerId: 'sidebar-dark-mode-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-dark-mode-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: true,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con toggle de dark mode habilitado.',
      },
    },
  },
};

/**
 * WithoutDarkModeToggle
 * Sin toggle de dark mode
 */
export const WithoutDarkModeToggle: Story = {
  name: 'Without Dark Mode Toggle',
  args: {
    containerId: 'sidebar-no-dark-mode-container',
    variant: 'colaborador',
    darkModeEnabled: false
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-no-dark-mode-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar sin toggle de dark mode.',
      },
    },
  },
};

/**
 * OnDarkModeToggleCallback
 * Callback cuando se cambia el dark mode
 */
export const OnDarkModeToggleCallback: Story = {
  name: 'On Dark Mode Toggle Callback',
  args: {
    containerId: 'sidebar-dark-mode-callback-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-dark-mode-callback-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: true,
      onDarkModeToggle: (isDark) => {
        alert(`Dark mode: ${isDark ? 'Activado' : 'Desactivado'}');
      },
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con callback onDarkModeToggle cuando se cambia el dark mode.',
      },
    },
  },
};

/**
 * OnActiveButtonChangeCallback
 * Callback cuando cambia el botón activo
 */
export const OnActiveButtonChangeCallback: Story = {
  name: 'On Active Button Change Callback',
  args: {
    containerId: 'sidebar-active-button-callback-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-active-button-callback-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      onActiveButtonChange: (section) => {
        alert(`Botón activo cambiado: ${section}`);
      },
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con callback onActiveButtonChange cuando cambia el botón activo.',
      },
    },
  },
};

/**
 * OnAvatarClickCallback
 * Callback cuando se hace click en el avatar
 */
export const OnAvatarClickCallback: Story = {
  name: 'On Avatar Click Callback',
  args: {
    containerId: 'sidebar-avatar-click-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-avatar-click-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      onAvatarClick: () => {
        alert('Avatar clicked');
      },
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con callback onAvatarClick cuando se hace click en el avatar.',
      },
    },
  },
};

/**
 * CustomLogoImage
 * Logo personalizado
 */
export const CustomLogoImage: Story = {
  name: 'Custom Logo Image',
  args: {
    containerId: 'sidebar-custom-logo-container',
    variant: 'colaborador',
    darkModeEnabled: true,
    logoImage: '/images/custom-logo.svg'
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-custom-logo-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      logoImage: '/images/custom-logo.svg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con logo personalizado.',
      },
    },
  },
};

/**
 * CustomLogoHref
 * URL del logo personalizada
 */
export const CustomLogoHref: Story = {
  name: 'Custom Logo Href',
  args: {
    containerId: 'sidebar-custom-logo-href-container',
    variant: 'colaborador',
    darkModeEnabled: true,
    logoHref: '#custom-home'
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-custom-logo-href-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      logoHref: '#custom-home',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con URL del logo personalizada.',
      },
    },
  },
};

/**
 * CustomAvatarImage
 * Avatar personalizado
 */
export const CustomAvatarImage: Story = {
  name: 'Custom Avatar Image',
  args: {
    containerId: 'sidebar-custom-avatar-container',
    variant: 'colaborador',
    darkModeEnabled: true,
    avatarImage: '/images/custom-avatar.jpg'
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-custom-avatar-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      avatarImage: '/images/custom-avatar.jpg',
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con avatar personalizado.',
      },
    },
  },
};

/**
 * CustomHeight
 * Altura personalizada
 */
export const CustomHeight: Story = {
  name: 'Custom Height',
  args: {
    containerId: 'sidebar-custom-height-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 32px;
      max-width: 100%;
      width: 100%;
      background: var(--modifiers-normal-color-light-bg-2);
      padding: 24px;
    `;
    
    const container = document.createElement('div');
    container.id = args.containerId || 'sidebar-custom-height-container';
    container.style.cssText = `
      position: relative;
      width: 96px;
      height: 800px;
      flex-shrink: 0;
      background: var(--modifiers-normal-color-light-bg-2);
    `;
    
    wrapper.appendChild(container);
    
    const options: SidebarOptions = {
      containerId: container.id,
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 800
    };
    
    requestAnimationFrame(() => {
      try {
        createSidebar(options);
      } catch (error) {
        console.error('Error creating sidebar:', error);
        const sidebarHTML = renderSidebar(options);
        container.innerHTML = sidebarHTML;
      }
    });
    
    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con altura personalizada (800px).',
      },
    },
  },
};

/**
 * Tooltips
 * Tooltips en los botones
 */
export const Tooltips: Story = {
  name: 'Tooltips',
  args: {
    containerId: 'sidebar-tooltips-container',
    variant: 'colaborador',
    darkModeEnabled: true
  },
  render: (args) => {
    const config = getSidebarButtons('colaborador');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-tooltips-container',
      variant: 'colaborador',
      bodyButtons: config.bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: args.darkModeEnabled !== false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar con tooltips (aparecen al hacer hover sobre los botones).',
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
    containerId: 'sidebar-complete-container',
    variant: 'admin',
    darkModeEnabled: true,
    logoImage: '/images/Ubits-logo.svg',
    avatarImage: '/images/Profile-image.jpg'
  },
  render: (args) => {
    const config = getSidebarButtons('admin');
    const bodyButtons = updateActiveButton(config.bodyButtons, 'aprendizaje');
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-complete-container',
      variant: 'admin',
      bodyButtons: bodyButtons,
      footerButtons: config.footerButtons,
      profileMenuItems: config.profileMenuItems,
      logoImage: args.logoImage || '/images/Ubits-logo.svg',
      avatarImage: args.avatarImage || '/images/Profile-image.jpg',
      darkModeEnabled: true,
      onActiveButtonChange: (section) => {
        console.log('Active button changed:', section);
      },
      onDarkModeToggle: (isDark) => {
        console.log('Dark mode toggled:', isDark);
      },
      onAvatarClick: () => {
        console.log('Avatar clicked');
      },
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar completo con todas las opciones habilitadas (variante admin).',
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
    containerId: 'sidebar-minimal-container',
    variant: 'colaborador',
    darkModeEnabled: false
  },
  render: (args) => {
    const bodyButtons = [
      {
        section: 'aprendizaje',
        icon: 'fa-graduation-cap',
        tooltip: 'Aprendizaje',
        state: 'active' as const
      }
    ];
    const options: SidebarOptions = {
      containerId: args.containerId || 'sidebar-minimal-container',
      variant: 'colaborador',
      bodyButtons: bodyButtons,
      footerButtons: [],
      profileMenuItems: [],
      darkModeEnabled: false,
      height: 650
    };
    return renderSidebarStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar mínimo con solo las opciones esenciales.',
      },
    },
  },
};

