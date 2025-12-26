import type { Meta, StoryObj } from '@storybook/html';
import { createTabBar } from '../../components/tabbar/src/TabBarProvider';
import { defaultFloatingMenuSections, defaultProfileMenuItems } from '../../components/tabbar/src/configs/defaultFloatingMenu';
import type { TabBarOptions, TabBarItem, FloatingMenuSection, ProfileMenuItem } from '../../components/tabbar/src/types/TabBarOptions';

// Configuraciones de Floating Menu para cada variante
const colaboradorFloatingMenuSections: FloatingMenuSection[] = [
  {
    id: 'aprendizaje',
    title: 'Aprendizaje',
    icon: 'graduation-cap',
    subitems: [
      { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
      { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
      { id: 'corporativa', title: 'U. Corporativa', icon: 'building-columns', url: 'u-corporativa.html' },
      { id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
    ]
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    icon: 'chart-mixed',
    url: 'diagnostico.html',
    isLink: true,
    clickable: true
  },
  {
    id: 'desempeno',
    title: 'Desempeño',
    icon: 'bars-progress',
    subitems: [
      { id: 'evaluaciones-360', title: 'Evaluaciones 360', icon: 'chart-pie', url: 'evaluaciones-360.html' },
      { id: 'objetivos', title: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
      { id: 'metricas', title: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
      { id: 'reportes', title: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' }
    ]
  },
  {
    id: 'encuestas',
    title: 'Encuestas',
    icon: 'clipboard-list-check',
    url: 'encuestas.html',
    isLink: true,
    clickable: false
  },
  {
    id: 'reclutamiento',
    title: 'Reclutamiento',
    icon: 'users',
    url: 'reclutamiento.html',
    isLink: true,
    clickable: true
  },
  {
    id: 'tareas',
    title: 'Tareas',
    icon: 'layer-group',
    subitems: [
      { id: 'planes', title: 'Planes', icon: 'calendar', url: 'planes.html' },
      { id: 'tareas', title: 'Tareas', icon: 'tasks', url: 'tareas.html' }
    ]
  },
  {
    id: 'ubits-ai',
    title: 'UBITS AI',
    icon: 'sparkles',
    url: 'ubits-ai.html',
    isLink: true,
    clickable: true
  }
];

const adminFloatingMenuSections: FloatingMenuSection[] = [
  {
    id: 'inicio',
    title: 'Inicio',
    icon: 'house',
    url: null,
    isLink: false
  },
  {
    id: 'empresa',
    title: 'Empresa',
    icon: 'building',
    subitems: [
      { id: 'gestion-usuarios', title: 'Gestión de usuarios', icon: 'users' },
      { id: 'organigrama', title: 'Organigrama', icon: 'sitemap' },
      { id: 'datos-empresa', title: 'Datos de empresa', icon: 'building' },
      { id: 'personalizacion', title: 'Personalización', icon: 'paint-brush' },
      { id: 'roles-permisos', title: 'Roles y permisos', icon: 'user-shield' },
      { id: 'comunicaciones', title: 'Comunicaciones', icon: 'envelope' }
    ]
  },
  {
    id: 'aprendizaje',
    title: 'Aprendizaje',
    icon: 'graduation-cap',
    subitems: [
      { id: 'lms-cursos', title: 'LMS - Cursos propios', icon: 'book' },
      { id: 'plan-formacion', title: 'Plan de formación', icon: 'clipboard-list-check' },
      { id: 'certificados', title: 'Certificados', icon: 'file-certificate' },
      { id: 'metricas-empresa', title: 'Métricas de empresa', icon: 'chart-line' }
    ]
  },
  {
    id: 'diagnóstico',
    title: 'Diagnóstico',
    icon: 'chart-mixed',
    url: null,
    isLink: false
  },
  {
    id: 'desempeño',
    title: 'Desempeño',
    icon: 'bars-progress',
    subitems: [
      { id: 'evaluations', title: 'Evaluaciones 360', icon: 'chart-pie' },
      { id: 'objectives', title: 'Objetivos', icon: 'bullseye' },
      { id: 'matriz-talento', title: 'Matriz de Talento', icon: 'sitemap' }
    ]
  },
  {
    id: 'encuestas',
    title: 'Encuestas',
    icon: 'clipboard-list-check',
    url: null,
    isLink: false
  }
];

// Items del Profile Menu por variante
const colaboradorProfileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'admin-mode',
    label: 'Modo Administrador',
    icon: 'laptop',
    url: 'template-admin.html'
  },
  {
    id: 'cambio-contraseña',
    label: 'Cambio de contraseña',
    icon: 'key',
    onClick: () => {
      // Sin acción
    }
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      // Sin acción
    }
  }
];

const adminProfileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'modo-colaborador',
    label: 'Modo colaborador',
    icon: 'user-gear',
    url: 'template-colaborador.html'
  },
  {
    id: 'cambio-contraseña',
    label: 'Cambio de contraseña',
    icon: 'key',
    onClick: () => {
      // Sin acción
    }
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      // Sin acción
    }
  }
];

/**
 * TabBar Component Stories
 * 
 * Componente de navegación inferior para dispositivos móviles.
 * Reemplaza al sidebar en pantallas pequeñas con items personalizables
 * con iconos o avatares, dark mode toggle, Floating Menu (accordions)
 * y Profile Menu (dropdown).
 */
const meta = {
  title: 'Navegación/TabBar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Deshabilitar completamente el focus management de Storybook para evitar conflictos
    a11y: {
      config: {
        rules: [
          {
            id: 'focus-order-semantics',
            enabled: false,
          },
          {
            id: 'focusable-content',
            enabled: false,
          },
        ],
      },
      manual: true,
    },
    // Deshabilitar interacciones automáticas que puedan causar problemas de focus
    interactions: {
      disable: true,
    },
    // Deshabilitar completamente el sistema de focus de Storybook
    // Esto previene que Storybook intente hacer focus automáticamente
    actions: {
      disable: true,
    },
    docs: {
      description: {
        component: `Componente TabBar UBITS de navegación inferior para móviles. Reemplaza al sidebar en pantallas pequeñas (< 1024px) con items personalizables con iconos o avatares, dark mode toggle, y callbacks personalizables por item. Incluye Floating Menu con accordions (se muestra al hacer click en "Módulos") y Profile Menu dropdown (se muestra al hacer click en "Mi perfil"). Soporta 2 variantes: colaborador y admin.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['colaborador', 'admin'],
      description: 'Variante del TabBar: colaborador o admin',
      table: {
        type: { summary: 'colaborador | admin' },
        defaultValue: { summary: 'colaborador' }
      }
    },
    activeTabId: {
      control: { type: 'select' },
      options: ['modulos', 'perfil', 'modo-oscuro'],
      description: 'ID del tab activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'modulos' }
      }
    },
    darkModeEnabled: {
      control: { type: 'boolean' },
      description: 'Habilitar dark mode toggle',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Mostrar el TabBar (por defecto false, solo visible en móvil)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  }
} satisfies Meta<TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean }>;

export default meta;
type Story = StoryObj<TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean }>;

// Función helper para obtener configuración según variante
function getTabBarConfig(variant: 'colaborador' | 'admin') {
  return {
    floatingMenuSections: variant === 'admin' ? adminFloatingMenuSections : colaboradorFloatingMenuSections,
    profileMenuItems: variant === 'admin' ? adminProfileMenuItems : colaboradorProfileMenuItems
  };
}

// Items estándar del TabBar
const defaultItems: TabBarItem[] = [
  {
    id: 'modulos',
    label: 'Módulos',
    icon: 'th-large',
    onClick: (item, event) => {
      // Módulos clicked
    }
  },
  {
    id: 'perfil',
    label: 'Mi perfil',
    avatar: '/images/Profile-image.jpg',
    avatarAlt: 'Mi perfil',
    onClick: (item, event) => {
      // Perfil clicked
    }
  },
  {
    id: 'modo-oscuro',
    label: 'Modo oscuro',
    icon: 'moon',
    onClick: (item, event) => {
      // Dark mode clicked
    }
  }
];

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'tabbar-story-container',
    variant: 'colaborador' as 'colaborador' | 'admin',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true,
    // No incluir floatingMenuSections y profileMenuItems en args iniciales
    // para que se calculen dinámicamente según el variant
    onTabChange: (tabId, item, element) => {
      // Tab changed
    },
    onDarkModeToggle: (isDark) => {
      // Dark mode toggled
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      // Floating menu item clicked
    },
    onProfileMenuItemClick: (itemId, item) => {
      // Profile menu item clicked
    }
  } as TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean },
  render: (args) => {
    // Suprimir errores de Storybook relacionados con focus
    const originalError = window.console.error;
    window.console.error = (...args: any[]) => {
      const errorMessage = args.join(' ');
      // Ignorar errores específicos de Storybook relacionados con focus
      if (
        errorMessage.includes('Could not determine window of node') ||
        errorMessage.includes('HTMLBodyElement') ||
        errorMessage.includes('Minified React error') ||
        errorMessage.includes('deferred DOM Node')
      ) {
        return; // No mostrar estos errores
      }
      // Mostrar otros errores normalmente
      originalError.apply(window.console, args);
    };
    
    // Restaurar console.error después de un tiempo
    setTimeout(() => {
      window.console.error = originalError;
    }, 5000);
    
    // Limpiar contenedor previo si existe - pero solo el contenido, no el elemento
    const existingContainer = document.getElementById(args.containerId || 'tabbar-story-container');
    if (existingContainer && existingContainer.parentElement) {
      // Solo limpiar contenido interno, no remover el elemento
      existingContainer.innerHTML = '';
    }

    // Obtener configuraciones según la variante - SIEMPRE usar las configuraciones del variant, ignorar args si variant está presente
    const variant = args.variant || 'colaborador';
    const config = getTabBarConfig(variant);
    // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
    const floatingMenuSections = config.floatingMenuSections;
    const profileMenuItems = config.profileMenuItems;

    // Wrapper principal - tamaño móvil adecuado para preview
    const wrapper = document.createElement('div');
    wrapper.style.cssText = '
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      position: relative;
      display: flex;
      flex-direction: column;
      isolation: isolate;
    `;

    // Panel de información - pequeño y arriba
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-bottom: 16px;
      padding: 12px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 6px);
      font-family: var(--font-family-noto-sans-font-family);
      font-size: var(--modifiers-normal-body-xs-regular-fontsize);
      order: 1;
    `;

    const activeItem = args.items?.find(item => item.id === args.activeTabId) || args.items?.[0];

    infoPanel.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong>Variante:</strong> ${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</div>
        <div><strong>Items:</strong> ${args.items?.length || 0}</div>
        <div><strong>Tab Activo:</strong> ${activeItem?.label || args.activeTabId || 'Ninguno'}</div>
        <div><strong>Dark Mode:</strong> ${args.darkModeEnabled ? 'Sí' : 'No'}</div>
        <div><strong>Menús:</strong> ${(floatingMenuSections && floatingMenuSections.length > 0) || (profileMenuItems && profileMenuItems.length > 0) ? 'Sí' : 'No'}</div>
      </div>
    `;

    wrapper.appendChild(infoPanel);

    // Contenedor del TabBar y menús - DENTRO del wrapper con el mismo ancho
    // Este contenedor contendrá TODO: TabBar, Floating Menu y Profile Menu
    // Debe tener la clase ubits-tabbar-preview-container para que el provider detecte modo preview
    // IMPORTANTE: position: relative es necesario para que los elementos absolute dentro sean relativos a este contenedor
    const container = document.createElement('div');
    container.id = args.containerId || 'tabbar-story-container';
    container.classList.add('ubits-tabbar-preview-container');
    container.style.cssText = `
      position: relative !important;
      width: 100%;
      min-height: 576px;
      margin-top: auto;
      order: 2;
      overflow: visible;
      box-sizing: border-box;
      isolation: isolate;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px);
    `;

    wrapper.appendChild(container);

    // Interceptar eventos de focus SOLO en el body para evitar conflictos con Storybook
    // No interceptamos eventos en el contenedor del TabBar para que funcione correctamente
    const preventBodyFocus = (e: Event) => {
      // Solo prevenir focus si el target es el body o un elemento fuera del wrapper
      const target = e.target as HTMLElement;
      if (target === document.body || (!wrapper.contains(target) && target.tagName === 'BODY')) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    };
    
    // Agregar listeners en fase de captura ANTES de que Storybook los procese
    document.addEventListener('focusin', preventBodyFocus, { capture: true });
    document.addEventListener('focus', preventBodyFocus, { capture: true });
    document.body.addEventListener('focusin', preventBodyFocus, { capture: true });
    document.body.addEventListener('focus', preventBodyFocus, { capture: true });

    // Crear el TabBar usando requestAnimationFrame y setTimeout anidados
    // para asegurar que Storybook termine de procesar antes de crear el componente
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            // Deshabilitar temporalmente el método focus del body
            const originalBodyFocus = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')?.value;
            
            // Override temporal del método focus SOLO para el body
            if (originalBodyFocus) {
              Object.defineProperty(document.body, 'focus', {
                value: function() {
                  // No hacer nada cuando Storybook intenta hacer focus en el body
                  return;
                },
                writable: true,
                configurable: true
              });
            }
            
            const tabBarElement = createTabBar({
              ...args,
              container: container,
              visible: args.visible !== false,
              darkModeEnabled: args.darkModeEnabled !== false,
              // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
              floatingMenuSections: config.floatingMenuSections,
              profileMenuItems: config.profileMenuItems,
              onTabChange: (tabId, item, element) => {
                // Actualizar panel de información sin usar querySelector que pueda causar problemas
                try {
                  const infoContent = infoPanel.querySelector('div[style*="grid"]');
                  if (infoContent) {
                    const activeTabDiv = infoContent.querySelector('div:nth-child(3)');
                    if (activeTabDiv) {
                      activeTabDiv.innerHTML = `<strong>Tab Activo:</strong> ${item.label}`;
                    }
                  }
                } catch (e) {
                  // Ignorar errores de querySelector en Storybook
                }
                
                if (args.onTabChange) {
                  args.onTabChange(tabId, item, element);
                }
              },
              onDarkModeToggle: args.onDarkModeToggle,
              onFloatingMenuItemClick: args.onFloatingMenuItemClick,
              onProfileMenuItemClick: args.onProfileMenuItemClick
            });

            if (!tabBarElement) {
              // Error: createTabBar retornó null
              container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>`;
            }
            
            // Restaurar focus después de un tiempo
            setTimeout(() => {
              if (originalBodyFocus) {
                try {
                  Object.defineProperty(document.body, 'focus', {
                    value: originalBodyFocus,
                    writable: true,
                    configurable: true
                  });
                } catch (e) {
                  // Ignorar errores al restaurar
                }
              }
            }, 2000);
          } catch (error) {
            // Error creando TabBar
            container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px; font-size: 12px;">Error: ${error}</p>`;
          }
        }, 500);
      });
    });
    
    // Remover listeners después de que el componente se haya creado
    setTimeout(() => {
      document.removeEventListener('focusin', preventBodyFocus, { capture: true });
      document.removeEventListener('focus', preventBodyFocus, { capture: true });
      document.body.removeEventListener('focusin', preventBodyFocus, { capture: true });
      document.body.removeEventListener('focus', preventBodyFocus, { capture: true });
    }, 3000);

    return wrapper;
  },
};

// Helper para renderizar TabBar de manera consistente
function renderTabBarStory(options: TabBarOptions & { variant?: 'colaborador' | 'admin' }) {
  const variant = options.variant || 'colaborador';
  const config = getTabBarConfig(variant);
  
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    padding: 16px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    border: 1px solid var(--modifiers-normal-color-light-border-1);
    position: relative;
    display: flex;
    flex-direction: column;
    isolation: isolate;
  `;

  const container = document.createElement('div');
  container.id = options.containerId || `tabbar-container-${Date.now()}`;
  container.classList.add('ubits-tabbar-preview-container');
  container.style.cssText = `
    position: relative !important;
    width: 100%;
    min-height: 576px;
    margin-top: auto;
    overflow: visible;
    box-sizing: border-box;
    isolation: isolate;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
  `;

  wrapper.appendChild(container);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          createTabBar({
            ...options,
            container: container,
            visible: options.visible !== false,
            darkModeEnabled: options.darkModeEnabled !== false,
            floatingMenuSections: options.floatingMenuSections || config.floatingMenuSections,
            profileMenuItems: options.profileMenuItems || config.profileMenuItems
          });
        } catch (error) {
          console.error('Error creating TabBar:', error);
        }
      }, 100);
    });
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
    containerId: 'tabbar-colaborador-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar en variante colaborador.',
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
    containerId: 'tabbar-admin-container',
    variant: 'admin',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar en variante admin.',
      },
    },
  },
};

/**
 * WithIcons
 * Items con iconos
 */
export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    containerId: 'tabbar-icons-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', icon: 'user' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con items que tienen iconos.',
      },
    },
  },
};

/**
 * WithAvatar
 * Items con avatar
 */
export const WithAvatar: Story = {
  name: 'With Avatar',
  args: {
    containerId: 'tabbar-avatar-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg', avatarAlt: 'Mi perfil' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
    ],
    activeTabId: 'perfil',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con items que tienen avatar (en lugar de icono).',
      },
    },
  },
};

/**
 * MixedItems
 * Items mixtos (algunos con iconos, algunos con avatar)
 */
export const MixedItems: Story = {
  name: 'Mixed Items',
  args: {
    containerId: 'tabbar-mixed-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg', avatarAlt: 'Mi perfil' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con items mixtos (algunos con iconos, algunos con avatar).',
      },
    },
  },
};

/**
 * ActiveTab
 * Con tab activo
 */
export const ActiveTab: Story = {
  name: 'Active Tab',
  args: {
    containerId: 'tabbar-active-tab-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'perfil',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con tab activo (Mi perfil).',
      },
    },
  },
};

/**
 * NoActiveTab
 * Sin tab activo
 */
export const NoActiveTab: Story = {
  name: 'No Active Tab',
  args: {
    containerId: 'tabbar-no-active-tab-container',
    variant: 'colaborador',
    items: defaultItems,
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar sin tab activo.',
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
    containerId: 'tabbar-onclick-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large', onClick: () => alert('Módulos clicked') },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg', onClick: () => alert('Perfil clicked') },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon', onClick: () => alert('Dark mode clicked') }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con items que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * OnTabChangeCallback
 * Callback cuando cambia el tab activo
 */
export const OnTabChangeCallback: Story = {
  name: 'On Tab Change Callback',
  args: {
    containerId: 'tabbar-tab-change-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    visible: true,
    onTabChange: (tabId, item, element) => {
      alert(`Tab cambiado: ${tabId}`);
    }
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con callback onTabChange cuando cambia el tab activo.',
      },
    },
  },
};

/**
 * Visible
 * TabBar visible
 */
export const Visible: Story = {
  name: 'Visible',
  args: {
    containerId: 'tabbar-visible-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar visible (modo preview).',
      },
    },
  },
};

/**
 * Hidden
 * TabBar oculto
 */
export const Hidden: Story = {
  name: 'Hidden',
  args: {
    containerId: 'tabbar-hidden-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    visible: false
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar oculto (visible: false).',
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
    containerId: 'tabbar-dark-mode-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con toggle de dark mode habilitado.',
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
    containerId: 'tabbar-no-dark-mode-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg' }
    ],
    activeTabId: 'modulos',
    darkModeEnabled: false,
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar sin toggle de dark mode (sin item "modo-oscuro").',
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
    containerId: 'tabbar-dark-mode-callback-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true,
    onDarkModeToggle: (isDark) => {
      alert(`Dark mode: ${isDark ? 'Activado' : 'Desactivado'}');
    }
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con callback onDarkModeToggle cuando se cambia el dark mode.',
      },
    },
  },
};

/**
 * WithFloatingMenu
 * Con Floating Menu (Módulos)
 */
export const WithFloatingMenu: Story = {
  name: 'With Floating Menu',
  args: {
    containerId: 'tabbar-floating-menu-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con Floating Menu (se muestra al hacer click en "Módulos").',
      },
    },
  },
};

/**
 * WithoutFloatingMenu
 * Sin Floating Menu
 */
export const WithoutFloatingMenu: Story = {
  name: 'Without Floating Menu',
  args: {
    containerId: 'tabbar-no-floating-menu-container',
    variant: 'colaborador',
    items: [
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
    ],
    activeTabId: 'perfil',
    floatingMenuSections: [],
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar sin Floating Menu.',
      },
    },
  },
};

/**
 * WithProfileMenu
 * Con Profile Menu (Mi perfil)
 */
export const WithProfileMenu: Story = {
  name: 'With Profile Menu',
  args: {
    containerId: 'tabbar-profile-menu-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'perfil',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con Profile Menu (se muestra al hacer click en "Mi perfil").',
      },
    },
  },
};

/**
 * WithoutProfileMenu
 * Sin Profile Menu
 */
export const WithoutProfileMenu: Story = {
  name: 'Without Profile Menu',
  args: {
    containerId: 'tabbar-no-profile-menu-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
    ],
    activeTabId: 'modulos',
    profileMenuItems: [],
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar sin Profile Menu.',
      },
    },
  },
};

/**
 * OnFloatingMenuItemClickCallback
 * Callback cuando se hace click en un item del Floating Menu
 */
export const OnFloatingMenuItemClickCallback: Story = {
  name: 'On Floating Menu Item Click Callback',
  args: {
    containerId: 'tabbar-floating-menu-callback-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    visible: true,
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      alert(`Floating menu item clicked: ${sectionId}${subitemId ? ` - ${subitemId}` : ''}');
    }
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con callback onFloatingMenuItemClick cuando se hace click en un item del Floating Menu.',
      },
    },
  },
};

/**
 * OnProfileMenuItemClickCallback
 * Callback cuando se hace click en un item del Profile Menu
 */
export const OnProfileMenuItemClickCallback: Story = {
  name: 'On Profile Menu Item Click Callback',
  args: {
    containerId: 'tabbar-profile-menu-callback-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'perfil',
    visible: true,
    onProfileMenuItemClick: (itemId, item) => {
      alert(`Profile menu item clicked: ${itemId}`);
    }
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con callback onProfileMenuItemClick cuando se hace click en un item del Profile Menu.',
      },
    },
  },
};

/**
 * TreeMenuSizeXS
 * Tree menu tamaño xs
 */
export const TreeMenuSizeXS: Story = {
  name: 'Tree Menu Size - XS',
  args: {
    containerId: 'tabbar-tree-menu-xs-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    treeMenuSize: 'xs',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con tree menu tamaño xs.',
      },
    },
  },
};

/**
 * TreeMenuSizeSM
 * Tree menu tamaño sm
 */
export const TreeMenuSizeSM: Story = {
  name: 'Tree Menu Size - SM',
  args: {
    containerId: 'tabbar-tree-menu-sm-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    treeMenuSize: 'sm',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con tree menu tamaño sm.',
      },
    },
  },
};

/**
 * TreeMenuSizeMD
 * Tree menu tamaño md (default)
 */
export const TreeMenuSizeMD: Story = {
  name: 'Tree Menu Size - MD',
  args: {
    containerId: 'tabbar-tree-menu-md-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    treeMenuSize: 'md',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con tree menu tamaño md (default).',
      },
    },
  },
};

/**
 * TreeMenuSizeLG
 * Tree menu tamaño lg
 */
export const TreeMenuSizeLG: Story = {
  name: 'Tree Menu Size - LG',
  args: {
    containerId: 'tabbar-tree-menu-lg-container',
    variant: 'colaborador',
    items: defaultItems,
    activeTabId: 'modulos',
    treeMenuSize: 'lg',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con tree menu tamaño lg.',
      },
    },
  },
};

/**
 * FewItems
 * Pocos items (2-3)
 */
export const FewItems: Story = {
  name: 'Few Items',
  args: {
    containerId: 'tabbar-few-items-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con pocos items (2 items).',
      },
    },
  },
};

/**
 * ManyItems
 * Muchos items (5+)
 */
export const ManyItems: Story = {
  name: 'Many Items',
  args: {
    containerId: 'tabbar-many-items-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Mi perfil', avatar: '/images/Profile-image.jpg' },
      { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' },
      { id: 'notificaciones', label: 'Notificaciones', icon: 'bell' },
      { id: 'configuracion', label: 'Configuración', icon: 'cog' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con muchos items (5 items).',
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
    containerId: 'tabbar-long-labels-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos de Aprendizaje', icon: 'th-large' },
      { id: 'perfil', label: 'Mi Perfil de Usuario', avatar: '/images/Profile-image.jpg' },
      { id: 'modo-oscuro', label: 'Modo Oscuro/Claro', icon: 'moon' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con labels largos.',
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
    containerId: 'tabbar-short-labels-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Mód', icon: 'th-large' },
      { id: 'perfil', label: 'Per', avatar: '/images/Profile-image.jpg' },
      { id: 'modo-oscuro', label: 'Mod', icon: 'moon' }
    ],
    activeTabId: 'modulos',
    visible: true
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar con labels cortos.',
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
    containerId: 'tabbar-complete-container',
    variant: 'admin',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true,
    treeMenuSize: 'md',
    onTabChange: (tabId, item, element) => {
      console.log('Tab cambiado:', tabId);
    },
    onDarkModeToggle: (isDark) => {
      console.log('Dark mode toggled:', isDark);
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      console.log('Floating menu item clicked:', sectionId, subitemId, url);
    },
    onProfileMenuItemClick: (itemId, item) => {
      console.log('Profile menu item clicked:', itemId);
    }
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar completo con todas las opciones habilitadas (variante admin).',
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
    containerId: 'tabbar-minimal-container',
    variant: 'colaborador',
    items: [
      { id: 'modulos', label: 'Módulos', icon: 'th-large' },
      { id: 'perfil', label: 'Perfil', avatar: '/images/Profile-image.jpg' }
    ],
    activeTabId: 'modulos',
    visible: true,
    floatingMenuSections: [],
    profileMenuItems: []
  },
  render: (args) => renderTabBarStory(args),
  parameters: {
    docs: {
      description: {
        story: 'TabBar mínimo con solo las opciones esenciales.',
      },
    },
  },
};

