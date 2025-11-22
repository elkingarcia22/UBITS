import type { Meta, StoryObj } from '@storybook/html';
import { renderMenubar, createMenubar } from '../../addons/menubar/src/MenubarProvider';
import type { MenubarOptions, MenubarItem } from '../../addons/menubar/src/types/MenubarOptions';
import '../../addons/menubar/src/styles/menubar.css';

/**
 * Menubar Component Stories
 * 
 * Componente de menubar horizontal con soporte para dropdowns y submenús anidados.
 * Usa tokens UBITS para colores, tipografía y espaciado.
 */
const meta: Meta<MenubarOptions & {
  itemCount?: number;
  showIcons?: boolean;
  hasDropdowns?: boolean;
  hasNestedSubmenus?: boolean;
  activeItemId?: string;
}> = {
  title: 'Components/Menubar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Menubar UBITS de navegación horizontal con soporte para dropdowns y submenús anidados. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, estados activos, deshabilitados y menús de múltiples niveles. El estado active usa el mismo color que el botón en modo active.',
      },
    },
  },
  argTypes: {
    itemCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de items en el menubar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hasDropdowns: {
      control: { type: 'boolean' },
      description: 'Incluir items con dropdowns',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hasNestedSubmenus: {
      control: { type: 'boolean' },
      description: 'Incluir submenús anidados (nivel 3)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    activeItemId: {
      control: { type: 'text' },
      description: 'ID del item activo (ej: home, features, projects, contact, components, blocks, ui-kit, templates)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'projects' },
      },
    },
    items: {
      control: false,
      description: 'Items del menubar (configurado automáticamente)',
    },
  },
};

export default meta;
type Story = StoryObj<MenubarOptions & {
  itemCount?: number;
  showIcons?: boolean;
  hasDropdowns?: boolean;
  hasNestedSubmenus?: boolean;
  activeItemId?: string;
}>;

// Función helper para crear items de ejemplo
function createExampleItems(
  itemCount: number = 4,
  showIcons: boolean = true,
  hasDropdowns: boolean = true,
  hasNestedSubmenus: boolean = false,
  activeItemId: string = 'projects'
): MenubarItem[] {
  const items: MenubarItem[] = [];
  
  // Item Home (sin dropdown)
  items.push({
    id: 'home',
    label: 'Home',
    icon: showIcons ? 'house' : undefined,
    iconStyle: 'regular',
    href: '#',
    active: activeItemId === 'home',
  });

  // Item Features (sin dropdown)
  if (itemCount > 1) {
    items.push({
      id: 'features',
      label: 'Features',
      icon: showIcons ? 'star' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'features',
    });
  }

  // Item Projects (con dropdown)
  if (itemCount > 2 && hasDropdowns) {
    items.push({
      id: 'projects',
      label: 'Projects',
      icon: showIcons ? 'magnifying-glass' : undefined,
      iconStyle: 'regular',
      active: activeItemId === 'projects',
      submenu: [
        {
          id: 'components',
          label: 'Components',
          icon: showIcons ? 'bolt' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'components',
          ...(hasNestedSubmenus ? {
            submenu: [
              {
                id: 'button',
                label: 'Button',
                icon: showIcons ? 'circle' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
              {
                id: 'input',
                label: 'Input',
                icon: showIcons ? 'square' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
            ],
          } : {}),
        },
        {
          id: 'blocks',
          label: 'Blocks',
          icon: showIcons ? 'grid-2' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'blocks',
        },
        {
          id: 'ui-kit',
          label: 'UI Kit',
          icon: showIcons ? 'pencil' : undefined,
          iconStyle: 'regular',
          href: '#',
          active: activeItemId === 'ui-kit',
        },
        {
          id: 'templates',
          label: 'Templates',
          icon: showIcons ? 'palette' : undefined,
          iconStyle: 'regular',
          ...(hasNestedSubmenus ? {
            submenu: [
              {
                id: 'admin',
                label: 'Admin',
                icon: showIcons ? 'user-shield' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
              {
                id: 'colaborador',
                label: 'Colaborador',
                icon: showIcons ? 'user' : undefined,
                iconStyle: 'regular',
                href: '#',
              },
            ],
          } : {
            href: '#',
          }),
        },
      ],
    });
  } else if (itemCount > 2) {
    items.push({
      id: 'projects',
      label: 'Projects',
      icon: showIcons ? 'magnifying-glass' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'projects',
    });
  }

  // Item Contact (sin dropdown)
  if (itemCount > 3) {
    items.push({
      id: 'contact',
      label: 'Contact',
      icon: showIcons ? 'envelope' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === 'contact',
    });
  }

  // Items adicionales si itemCount > 4
  for (let i = 4; i < itemCount; i++) {
    items.push({
      id: `item-${i}`,
      label: `Item ${i}`,
      icon: showIcons ? 'circle' : undefined,
      iconStyle: 'regular',
      href: '#',
      active: activeItemId === `item-${i}`,
    });
  }

  return items;
}

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    itemCount: 4,
    showIcons: true,
    hasDropdowns: true,
    hasNestedSubmenus: false,
    activeItemId: 'projects',
    items: createExampleItems(4, true, true, false, 'projects'),
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: var(--ubits-spacing-lg);
      padding: var(--ubits-spacing-lg);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: var(--ubits-border-radius-md);
      min-height: calc(var(--ubits-spacing-12) * 2.5);
    `;

    // Contenedor del menubar
    const menubarContainer = document.createElement('div');
    menubarContainer.id = 'menubar-story-container';
    menubarContainer.style.cssText = `
      position: relative;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
      padding: var(--ubits-spacing-md);
    `;

    // Agregar el contenedor al DOM primero
    container.appendChild(menubarContainer);

    // Crear items dinámicamente basados en los controles
    const items = createExampleItems(
      args.itemCount || 4,
      args.showIcons !== false,
      args.hasDropdowns !== false,
      args.hasNestedSubmenus === true,
      args.activeItemId || 'projects'
    );

    // Renderizar menubar después de que el contenedor esté en el DOM
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      const existingContainer = document.getElementById('menubar-story-container');
      if (!existingContainer) return;

      // Limpiar contenedor antes de renderizar
      existingContainer.innerHTML = '';

      // Crear wrapper para logo, menubar y botón dark mode
      const wrapper = document.createElement('div');
      wrapper.className = 'ubits-menubar-wrapper';
      wrapper.style.cssText = 'display: flex; gap: var(--ubits-spacing-md); align-items: center; width: 100%; background: transparent; border: none; border-radius: 0; padding: var(--ubits-spacing-md);';

      // Logo
      const logo = document.createElement('a');
      logo.href = '#';
      logo.className = 'ubits-logo';
      logo.style.cssText = `display: flex; align-items: center; text-decoration: none; transition: transform 0.2s ease;`;
      logo.innerHTML = `
        <span class="ubits-logo-text" style="font-size: var(--modifiers-normal-heading-h2-fontsize); font-weight: 700; color: var(--modifiers-normal-color-light-fg-1-high); transition: color 0.2s ease;">UBITS</span>
      `;
      wrapper.appendChild(logo);

      // Contenedor para el menubar
      const menubarInnerContainer = document.createElement('div');
      menubarInnerContainer.id = 'menubar-inner-container';
      menubarInnerContainer.style.cssText = 'flex: 1;';
      wrapper.appendChild(menubarInnerContainer);

      // Botón dark mode
      const darkModeToggle = document.createElement('button');
      darkModeToggle.className = 'dark-mode-toggle';
      darkModeToggle.id = 'storybook-darkmode-toggle';
      darkModeToggle.setAttribute('data-theme', 'dark');
      darkModeToggle.title = 'Modo oscuro';
      darkModeToggle.style.cssText = `display: flex; align-items: center; justify-content: center; width: var(--ubits-spacing-10); height: var(--ubits-spacing-10); padding: 0; border: none; background: transparent; color: var(--modifiers-normal-color-light-fg-1-medium); cursor: pointer; border-radius: var(--ubits-border-radius-sm); transition: all 0.15s ease; margin-left: auto;`;
      darkModeToggle.innerHTML = '<i class="fa-solid fa-sun-bright"></i>';
      wrapper.appendChild(darkModeToggle);

      existingContainer.appendChild(wrapper);

      try {
        const menubarElement = createMenubar({
          items,
          containerId: 'menubar-inner-container',
          onActiveItemChange: (itemId, parentId) => {
            // Handler para cambio de item activo
          },
          onItemClick: (itemId, item) => {
            // Handler para click en item
          },
        });

        // Aplicar estado active basado en los items
        items.forEach(item => {
          if (item.active) {
            const itemElement = menubarElement.querySelector(`.ubits-menubar-item[data-item-id="${item.id}"]`);
            if (itemElement) {
              itemElement.classList.add('ubits-menubar-item--active');
            }
          }
          // También verificar subitems
          if (item.submenu) {
            item.submenu.forEach(subItem => {
              if (subItem.active) {
                const subItemElement = menubarElement.querySelector(`[data-item-id="${subItem.id}"][data-parent-id="${item.id}"]`);
                if (subItemElement) {
                  subItemElement.classList.add('ubits-menubar-submenu-item--active');
                }
              }
              // Verificar submenús anidados
              if (subItem.submenu) {
                subItem.submenu.forEach(nestedItem => {
                  if (nestedItem.active) {
                    const nestedElement = menubarElement.querySelector(`[data-item-id="${nestedItem.id}"]`);
                    if (nestedElement) {
                      nestedElement.classList.add('ubits-menubar-submenu-item--active');
                    }
                  }
                });
              }
            });
          }
        });
        // Inicializar dark mode toggle
        if (darkModeToggle) {
          const updateIcon = (theme: string) => {
            const iconElement = darkModeToggle.querySelector('i');
            if (iconElement) {
              iconElement.classList.remove('fa-moon', 'fa-sun', 'fa-sun-bright', 'far', 'fas', 'fa-solid', 'fa-regular');
              iconElement.classList.add('ubits-icon-transition');
              requestAnimationFrame(() => {
                if (theme === 'dark') {
                  iconElement.classList.add('fa-solid', 'fa-sun-bright');
                } else {
                  iconElement.classList.add('far', 'fa-moon');
                }
              });
              setTimeout(() => {
                iconElement.classList.remove('ubits-icon-transition');
              }, 400);
            }
          };

          const initialTheme = document.body.getAttribute('data-theme') || 'dark';
          if (initialTheme === 'dark') {
            darkModeToggle.setAttribute('data-theme', 'dark');
            updateIcon('dark');
          }

          darkModeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentTheme = darkModeToggle.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            darkModeToggle.setAttribute('data-theme', newTheme);
            updateIcon(newTheme);
            document.body.setAttribute('data-theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ubits-theme', newTheme);
          });
        }

        // Estilos para logo según tema
        const style = document.createElement('style');
        style.textContent = `
          .ubits-logo:hover { transform: scale(1.05); }
          .ubits-logo:hover .ubits-logo-text { color: var(--modifiers-normal-color-light-accent-brand); }
          @keyframes iconSpinFade {
            0% { transform: rotate(0deg) scale(1); opacity: 1; }
            50% { transform: rotate(180deg) scale(1.2); opacity: 0.6; }
            100% { transform: rotate(360deg) scale(1); opacity: 1; }
          }
          .ubits-icon-transition {
            animation: iconSpinFade 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error creating menubar:', error);
        // Fallback: renderizar HTML estático
        menubarInnerContainer.innerHTML = renderMenubar({
          items,
          containerId: 'menubar-inner-container',
        });
      }
    });

    // Panel de información (opcional, para mostrar detalles)
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      padding: var(--ubits-spacing-md);
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: var(--ubits-border-radius-md);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    const infoContent = document.createElement('div');
    infoContent.style.cssText = `
      font-family: var(--font-family-noto-sans-font-family);
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-sm-regular-fontsize);
      line-height: var(--modifiers-normal-body-sm-regular-lineheight);
    `;

    infoContent.innerHTML = `
      <h3 style="margin: 0 0 var(--ubits-spacing-sm) 0; color: var(--modifiers-normal-color-light-fg-1-high); font-weight: var(--ubits-font-weight-semibold); font-size: var(--modifiers-normal-body-md-regular-fontsize);">Componente Menubar</h3>
      <p style="margin: 0 0 12px 0;">Este componente muestra un menubar horizontal con:</p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li>Items de navegación con iconos opcionales</li>
        <li>Dropdowns con submenús</li>
        <li>Soporte para submenús anidados (nivel 3)</li>
        <li>Estados activos y deshabilitados</li>
        <li>Navegación por URL o callbacks</li>
      </ul>
      <p style="margin: 0 0 12px 0; font-weight: 600;">Características:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Usa tokens UBITS para colores, tipografía y espaciado</li>
        <li>Soporta iconos FontAwesome (regular/solid)</li>
        <li>Dropdowns con animaciones suaves</li>
        <li>Submenús anidados con posicionamiento inteligente</li>
        <li>Responsive design</li>
        <li>Accesibilidad (ARIA attributes)</li>
      </ul>
    `;

    infoPanel.appendChild(infoContent);
    container.appendChild(infoPanel);

    return container;
  },
};

