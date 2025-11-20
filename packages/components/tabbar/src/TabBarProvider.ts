/**
 * TabBarProvider
 * Lógica de renderizado y gestión del componente TabBar
 * Incluye items personalizables, estados, dark mode toggle,
 * Floating Menu (accordions) y Profile Menu
 */

import type { TabBarOptions, TabBarItem, FloatingMenuSection, ProfileMenuItem, TreeMenuItem } from './types/TabBarOptions';
import './styles/tabbar.css';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza el HTML del TabBar
 */
export function renderTabBar(options: TabBarOptions): string {
  const {
    items,
    activeTabId,
    visible = false,
    className = ''
  } = options;

  const containerClasses = [
    'ubits-tabbar',
    visible ? 'ubits-tabbar--visible' : '',
    className
  ].filter(Boolean).join(' ');

  const itemsHTML = items.map(item => {
    const isActive = item.id === activeTabId;
    const itemClasses = [
      'ubits-tabbar-item',
      isActive ? 'ubits-tabbar-item--active' : ''
    ].filter(Boolean).join(' ');

    let iconOrAvatarHTML = '';
    if (item.avatar) {
      iconOrAvatarHTML = `<img src="${item.avatar}" alt="${item.avatarAlt || item.label}" class="ubits-tabbar-avatar">`;
    } else if (item.icon) {
      iconOrAvatarHTML = `<span class="ubits-tabbar-icon">${renderIconHelper(item.icon)}</span>`;
    }

    return `
      <div 
        class="${itemClasses}" 
        data-tab-id="${item.id}"
        data-has-click-handler="${item.onClick ? 'true' : 'false'}"
      >
        ${iconOrAvatarHTML}
        <span class="ubits-tabbar-text">${item.label}</span>
      </div>
    `;
  }).join('\n');

  return `
    <div class="${containerClasses}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${itemsHTML}
      </div>
    </div>
  `;
}

/**
 * Crea e inicializa el componente TabBar en el DOM
 */
export function createTabBar(options: TabBarOptions): HTMLElement | null {
  const {
    containerId,
    container: providedContainer,
    items,
    activeTabId,
    onTabChange,
    visible = false,
    darkModeEnabled = false,
    onDarkModeToggle
  } = options;

  // Obtener contenedor
  let container: HTMLElement | null = null;
  if (providedContainer) {
    container = providedContainer;
  } else if (containerId) {
    container = document.getElementById(containerId);
  }

  if (!container) {
    console.error('TabBar: Contenedor no encontrado');
    return null;
  }

  // Detectar si es modo preview
  const isPreview = container.classList.contains('ubits-tabbar-preview-container');
  
  // Renderizar HTML
  const html = renderTabBar({
    ...options,
    visible: visible || isPreview,
    className: isPreview ? 'ubits-tabbar--preview' : ''
  });
  container.innerHTML = html;

  // Asegurar que el contenedor tenga position: relative para que el TabBar absolute sea relativo a él
  if (isPreview) {
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }
  }

  const tabBarElement = container.querySelector('.ubits-tabbar');
  if (!tabBarElement) {
    console.error('TabBar: Elemento no encontrado después de renderizar');
    return null;
  }

  // Inicializar event listeners
  const treeMenuSize = options.treeMenuSize || 'md';
  console.log('[createTabBar] Using treeMenuSize:', treeMenuSize);
  initTabBarListeners(
    tabBarElement as HTMLElement,
    items,
    onTabChange,
    darkModeEnabled,
    onDarkModeToggle,
    options.floatingMenuSections,
    options.profileMenuItems,
    options.onFloatingMenuItemClick,
    options.onProfileMenuItemClick,
    container,
    treeMenuSize
  );

  return tabBarElement as HTMLElement;
}

/**
 * Renderiza un item del tree menu recursivamente
 */
function renderTreeMenuItem(item: FloatingMenuSection | TreeMenuItem, level: number = 0, size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  // Soportar tanto children (tree menu) como subitems (legacy)
  const hasChildren = (item.children && item.children.length > 0) || (item as FloatingMenuSection).subitems?.length > 0;
  const isLink = (item as FloatingMenuSection).isLink || (!hasChildren && item.url);
  
  const sizeClass = `ubits-tree-menu-${isLink ? 'link' : 'header'}--${size}`;
  
  console.log('[renderTreeMenuItem]', {
    id: item.id,
    title: item.title,
    level,
    hasChildren,
    isLink,
    size,
    sizeClass,
    childrenCount: item.children?.length || (item as FloatingMenuSection).subitems?.length || 0,
    hasChildrenProp: !!item.children,
    hasSubitemsProp: !!(item as FloatingMenuSection).subitems
  });
  
  // Si es un enlace directo (sin hijos)
  if (isLink) {
    console.log(`[renderTreeMenuItem] Rendering as link: ${item.id} with size: ${size}, class: ${sizeClass}`);
    // Solo mostrar icono en level 0 (items principales), no en sub-items
    const iconHTML = level === 0 ? `
          <div class="ubits-tree-menu-icon" data-circle-id="${item.id}">
            ${renderIconHelper(item.icon)}
          </div>
    ` : '';
      return `
      <div class="ubits-tree-menu-item" data-tree-item-id="${item.id}" data-tree-level="${level}">
        <a href="${item.url || '#'}" class="ubits-tree-menu-link ${sizeClass}" data-section-id="${item.id}">
          ${iconHTML}
          <span class="ubits-tree-menu-text">${item.title}</span>
          <span class="ubits-tree-menu-chevron">
            <i class="far fa-chevron-right" data-chevron-id="${item.id}"></i>
          </span>
        </a>
      </div>
    `;
  }
  
  // Si tiene hijos, renderizar como nodo expandible
  // Priorizar children (tree menu) sobre subitems (legacy)
  const children: Array<{ id: string; title: string; icon: string; url?: string; children?: TreeMenuItem[] }> = 
    item.children || 
    (item as FloatingMenuSection).subitems?.map(sub => ({
      id: sub.id,
      title: sub.title,
      icon: sub.icon,
      url: sub.url,
      children: undefined
    })) || [];
  
  console.log(`[renderTreeMenuItem] Rendering as node with ${children.length} children: ${item.id} with size: ${size}, class: ${sizeClass}`);
  
  const childrenHTML = children.map(child => renderTreeMenuItem(child, level + 1, size)).join('');

  // Solo mostrar icono en level 0 (items principales), no en sub-items
  const iconHTML = level === 0 ? `
          <div class="ubits-tree-menu-icon" data-circle-id="${item.id}">
            ${renderIconHelper(item.icon)}
          </div>
  ` : '';
  
  const html = `
    <div class="ubits-tree-menu-item" data-tree-item-id="${item.id}" data-tree-level="${level}">
      <div class="ubits-tree-menu-node" data-tree-node-id="${item.id}">
        <div class="ubits-tree-menu-header ${sizeClass}">
          ${iconHTML}
          <span class="ubits-tree-menu-text">${item.title}</span>
          <span class="ubits-tree-menu-chevron">
            <i class="far fa-chevron-down" data-chevron-id="${item.id}"></i>
          </span>
        </div>
        <div class="ubits-tree-menu-children" data-tree-children-id="${item.id}" style="display: none;">
          ${childrenHTML}
        </div>
        </div>
      </div>
    `;
  console.log(`[renderTreeMenuItem] Generated HTML for node ${item.id} (${children.length} children) with size: ${size}, class: ${sizeClass}:`, html.substring(0, 300));
  return html;
}

/**
 * Renderiza el Floating Menu como Tree Menu
 */
function renderFloatingMenu(sections: FloatingMenuSection[], size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  console.log('[renderFloatingMenu] Starting render with', sections.length, 'sections, size:', size);
  const sectionsHTML = sections.map(section => renderTreeMenuItem(section, 0, size)).join('');
  console.log('[renderFloatingMenu] Generated HTML length:', sectionsHTML.length);

  return `
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${renderIconHelper('times')}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        ${sectionsHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza un item del Profile Menu Tree recursivamente
 */
function renderProfileTreeMenuItem(item: ProfileMenuItem, level: number = 0, size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  const hasChildren = item.children && item.children.length > 0;
  const indent = level * 24; // 24px de indentación por nivel
  const sizeClass = `ubits-profile-tree-${hasChildren ? 'header' : 'link'}--${size}`;
  
  console.log('[renderProfileTreeMenuItem]', {
    id: item.id,
    label: item.label,
    level,
    hasChildren,
    size,
    sizeClass
  });
  
  // Si no tiene hijos, renderizar como enlace simple
  // Solo mostrar icono en level 0 (items principales), no en sub-items
  const iconHTML = level === 0 ? `<i class="far fa-${item.icon} ubits-profile-tree-icon"></i>` : '';
  if (!hasChildren) {
    return `
      <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
        <a href="${item.url || '#'}" class="ubits-profile-tree-link ${sizeClass}" ${item.onClick ? 'data-has-onclick="true"' : ''}>
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
        </a>
      </div>
    `;
  }
  
  // Si tiene hijos, renderizar como nodo expandible
  const childrenHTML = item.children!.map(child => renderProfileTreeMenuItem(child, level + 1, size)).join('');
  
  return `
    <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
      <div class="ubits-profile-tree-node" data-tree-node-id="${item.id}">
        <div class="ubits-profile-tree-header ${sizeClass}">
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
          <i class="far fa-chevron-down ubits-profile-tree-chevron" data-chevron-id="${item.id}"></i>
        </div>
        <div class="ubits-profile-tree-children" data-tree-children-id="${item.id}" style="display: none;">
          ${childrenHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el Profile Menu como Tree Menu
 */
function renderProfileMenu(items: ProfileMenuItem[], size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  console.log('[renderProfileMenu] Starting render with', items.length, 'items, size:', size);
  const itemsHTML = items.map(item => renderProfileTreeMenuItem(item, 0, size)).join('');

  return `
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${itemsHTML}
    </div>
  `;
}

/**
 * Inicializa los event listeners del TabBar
 */
function initTabBarListeners(
  tabBarElement: HTMLElement,
  items: TabBarItem[],
  onTabChange?: (tabId: string, item: TabBarItem, element: HTMLElement) => void,
  darkModeEnabled: boolean = false,
  onDarkModeToggle?: (isDark: boolean) => void,
  floatingMenuSections?: FloatingMenuSection[],
  profileMenuItems?: ProfileMenuItem[],
  onFloatingMenuItemClick?: (sectionId: string, subitemId?: string, url?: string) => void,
  onProfileMenuItemClick?: (itemId: string, item: ProfileMenuItem) => void,
  container?: HTMLElement,
  treeMenuSize: 'xs' | 'sm' | 'md' | 'lg' = 'md'
): void {
  console.log('[initTabBarListeners] Starting with treeMenuSize:', treeMenuSize);
  const tabItems = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  const tabBarContainer = container || tabBarElement.parentElement;
  const isPreview = tabBarContainer?.classList.contains('ubits-tabbar-preview-container');

  // Crear contenedores para Floating Menu y Profile Menu si no existen
  let floatingMenuContainer: HTMLElement | null = null;
  let profileMenuContainer: HTMLElement | null = null;

  if (floatingMenuSections && floatingMenuSections.length > 0) {
    floatingMenuContainer = document.getElementById('ubits-floating-menu-container') || document.createElement('div');
    floatingMenuContainer.id = 'ubits-floating-menu-container';
    if (isPreview) {
      floatingMenuContainer.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 68px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;'; // 60px (TabBar) + 8px (espacio)
    } else {
      floatingMenuContainer.style.cssText = '';
    }
    
    if (!document.getElementById('ubits-floating-menu-container')) {
      if (tabBarContainer) {
        tabBarContainer.appendChild(floatingMenuContainer);
      } else {
        document.body.appendChild(floatingMenuContainer);
      }
    }
    
    const floatingMenuHTML = renderFloatingMenu(floatingMenuSections, treeMenuSize);
    console.log('[initTabBarListeners] Setting floating menu HTML, length:', floatingMenuHTML.length, 'with size:', treeMenuSize);
    floatingMenuContainer.innerHTML = floatingMenuHTML;
    console.log('[initTabBarListeners] Floating menu container innerHTML length:', floatingMenuContainer.innerHTML.length);
    initFloatingMenuListeners(floatingMenuContainer, onFloatingMenuItemClick);
  }

  if (profileMenuItems && profileMenuItems.length > 0) {
    profileMenuContainer = document.getElementById('ubits-profile-menu-container') || document.createElement('div');
    profileMenuContainer.id = 'ubits-profile-menu-container';
    if (isPreview) {
      // Contenedor igual que Floating Menu pero solo en bottom
      profileMenuContainer.style.cssText = 'position: absolute; bottom: 68px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;'; // 60px (TabBar) + 8px (espacio)
      console.log('[TabBar] Initialized profile menu container for preview with bottom: 68px');
    } else {
      profileMenuContainer.style.cssText = '';
      console.log('[TabBar] Initialized profile menu container (not preview), using CSS styles');
    }
    
    if (!document.getElementById('ubits-profile-menu-container')) {
      if (tabBarContainer) {
        tabBarContainer.appendChild(profileMenuContainer);
      } else {
        document.body.appendChild(profileMenuContainer);
      }
    }
    
      const profileMenuHTML = renderProfileMenu(profileMenuItems, treeMenuSize);
      console.log('[initTabBarListeners] Setting profile menu HTML with size:', treeMenuSize);
      profileMenuContainer.innerHTML = profileMenuHTML;
    // Asegurar que el menú tenga la clase preview si estamos en modo preview - igual que Floating Menu
    if (isPreview) {
      const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
      if (profileMenu) {
        profileMenu.classList.add('ubits-profile-menu--preview');
        // El menú debe rellenar todo el contenedor con posición absoluta, igual que Floating Menu
        profileMenu.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;';
      }
    }
    initProfileMenuListeners(profileMenuContainer, profileMenuItems, onProfileMenuItemClick);
  }

  tabItems.forEach((tabItemElement) => {
    const itemElement = tabItemElement as HTMLElement;
    const tabId = itemElement.getAttribute('data-tab-id');
    if (!tabId) return;

    const item = items.find(i => i.id === tabId);
    if (!item) return;

    itemElement.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Si es modo oscuro y está habilitado
      if (tabId === 'modo-oscuro' && darkModeEnabled) {
        toggleDarkMode(tabBarElement, onDarkModeToggle);
        // Cerrar otros menús
        if (floatingMenuContainer) {
          floatingMenuContainer.style.display = 'none';
          const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
          if (floatingMenu) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
          }
        }
        if (profileMenuContainer) {
          profileMenuContainer.style.display = 'none';
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
          if (profileMenu) {
            profileMenu.classList.remove('ubits-profile-menu--show');
          }
        }
        return;
      }

      // Si es módulos, toggle Floating Menu
      if (tabId === 'modulos' && floatingMenuContainer) {
        const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
        if (floatingMenu) {
          if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
          } else {
            console.log('[TabBar] ========== OPENING FLOATING MENU ==========');
            console.log('[TabBar] isPreview:', isPreview);
            console.log('[TabBar] floatingMenuContainer exists:', !!floatingMenuContainer);
            floatingMenu.classList.add('ubits-floating-menu--show');
            // Asegurar posicionamiento correcto en preview
            if (isPreview && floatingMenuContainer) {
              console.log('[TabBar] --- PREVIEW MODE ---');
              floatingMenu.classList.add('ubits-floating-menu--preview');
              console.log('[TabBar] Added preview class to floating menu');
              
              // Calcular posición relativa al contenedor padre
              const tabBarRect = tabBarElement.getBoundingClientRect();
              const containerRect = container ? container.getBoundingClientRect() : { top: 0, bottom: 0 };
              const tabBarHeight = 60;
              const spaceBetween = 8; // Espacio entre TabBar y menú
              
              // Calcular la posición del TabBar relativa al contenedor padre
              const tabBarTopRelative = tabBarRect.top - containerRect.top;
              const containerBottom = tabBarTopRelative - spaceBetween;
              
              console.log('[TabBar] --- CONTAINER CALCULATIONS ---');
              console.log('[TabBar] Container getBoundingClientRect():', containerRect);
              console.log('[TabBar] TabBar getBoundingClientRect():', {
                top: tabBarRect.top,
                bottom: tabBarRect.bottom,
                height: tabBarRect.height,
                left: tabBarRect.left,
                right: tabBarRect.right
              });
              console.log('[TabBar] TabBar top relative to container:', tabBarTopRelative);
              console.log('[TabBar] TabBar height (hardcoded):', tabBarHeight);
              console.log('[TabBar] Space between:', spaceBetween);
              console.log('[TabBar] Container bottom (calculated):', containerBottom, 'px');
              
              // Configurar contenedor
              floatingMenuContainer.style.display = 'block';
              floatingMenuContainer.style.position = 'absolute';
              floatingMenuContainer.style.top = '0';
              floatingMenuContainer.style.left = '0';
              floatingMenuContainer.style.right = '0';
              floatingMenuContainer.style.bottom = `${tabBarHeight + spaceBetween}px`; // 60px (altura TabBar) + 8px (espacio)
              floatingMenuContainer.style.width = '100%';
              floatingMenuContainer.style.height = '';
              floatingMenuContainer.style.zIndex = '2000';
              floatingMenuContainer.style.overflow = 'visible';
              floatingMenuContainer.style.boxSizing = 'border-box';
              
              console.log('[TabBar] --- CONTAINER STYLES APPLIED ---');
              console.log('[TabBar] Container inline styles:', {
                display: floatingMenuContainer.style.display,
                position: floatingMenuContainer.style.position,
                top: floatingMenuContainer.style.top,
                left: floatingMenuContainer.style.left,
                right: floatingMenuContainer.style.right,
                bottom: floatingMenuContainer.style.bottom,
                width: floatingMenuContainer.style.width,
                height: floatingMenuContainer.style.height,
                zIndex: floatingMenuContainer.style.zIndex
              });
              
              // Obtener estilos computados del contenedor
              const containerComputed = window.getComputedStyle(floatingMenuContainer);
              console.log('[TabBar] --- CONTAINER COMPUTED STYLES ---');
              console.log('[TabBar] Container computed:', {
                position: containerComputed.position,
                top: containerComputed.top,
                bottom: containerComputed.bottom,
                height: containerComputed.height,
                width: containerComputed.width,
                display: containerComputed.display
              });
              console.log('[TabBar] Container getBoundingClientRect():', floatingMenuContainer.getBoundingClientRect());
              
              // Asegurar estilos del menú interno - EXACTAMENTE igual que Profile Menu (sin !important en inline)
              // El menú debe respetar la altura del contenedor usando bottom: 0, no height explícito
              // El padding del menú (8px 0) no debe afectar la altura total
              floatingMenu.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; max-width: 100%; display: block; box-sizing: border-box;';
              console.log('[TabBar] Menu style applied with box-sizing: border-box');
              
              console.log('[TabBar] --- MENU STYLES APPLIED ---');
              console.log('[TabBar] Menu inline styles:', {
                position: floatingMenu.style.position,
                top: floatingMenu.style.top,
                left: floatingMenu.style.left,
                right: floatingMenu.style.right,
                bottom: floatingMenu.style.bottom,
                width: floatingMenu.style.width,
                maxWidth: floatingMenu.style.maxWidth,
                display: floatingMenu.style.display
              });
              console.log('[TabBar] Menu classes:', Array.from(floatingMenu.classList));
              
              // Obtener estilos computados del menú
              const menuComputed = window.getComputedStyle(floatingMenu);
              console.log('[TabBar] --- MENU COMPUTED STYLES ---');
              console.log('[TabBar] Menu computed:', {
                position: menuComputed.position,
                top: menuComputed.top,
                bottom: menuComputed.bottom,
                height: menuComputed.height,
                width: menuComputed.width,
                display: menuComputed.display
              });
              console.log('[TabBar] Menu getBoundingClientRect():', floatingMenu.getBoundingClientRect());
              
              // Verificar distancia al TabBar
              const menuRect = floatingMenu.getBoundingClientRect();
              const tabBarBottom = tabBarRect.bottom;
              const menuBottom = menuRect.bottom;
              const actualSpace = tabBarBottom - menuBottom;
              console.log('[TabBar] --- SPACE VERIFICATION ---');
              console.log('[TabBar] TabBar bottom:', tabBarBottom);
              console.log('[TabBar] Menu bottom:', menuBottom);
              console.log('[TabBar] Actual space between:', actualSpace, 'px');
              console.log('[TabBar] Expected space:', spaceBetween, 'px');
              console.log('[TabBar] Space difference:', actualSpace - spaceBetween, 'px');
              
              console.log('[TabBar] ========== END FLOATING MENU SETUP ==========');
            } else {
              // No preview - usar estilos CSS fixed
              console.log('[TabBar] Not preview mode, using CSS fixed styles');
              console.log('[TabBar] Floating menu container computed bottom:', window.getComputedStyle(floatingMenuContainer).bottom);
              console.log('[TabBar] Floating menu computed bottom:', window.getComputedStyle(floatingMenu).bottom);
              console.log('[TabBar] Floating menu computed position:', window.getComputedStyle(floatingMenu).position);
              console.log('[TabBar] TabBar element:', tabBarElement);
              if (tabBarElement) {
                const tabBarRect = tabBarElement.getBoundingClientRect();
                console.log('[TabBar] TabBar position:', tabBarRect.bottom, 'window height:', window.innerHeight);
                console.log('[TabBar] Expected menu bottom:', window.innerHeight - tabBarRect.height);
              }
            }
            // Cerrar Profile Menu si está abierto
            if (profileMenuContainer) {
              const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
              if (profileMenu) {
                profileMenu.classList.remove('ubits-profile-menu--show');
              }
              profileMenuContainer.style.display = 'none';
            }
          }
        }
        return;
      }

      // Si es perfil, toggle Profile Menu
      if (tabId === 'perfil' && profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
        if (profileMenu) {
          if (profileMenu.classList.contains('ubits-profile-menu--show')) {
            profileMenu.classList.remove('ubits-profile-menu--show');
            profileMenuContainer.style.display = 'none';
          } else {
            console.log('[TabBar] Opening profile menu, isPreview:', isPreview);
            profileMenu.classList.add('ubits-profile-menu--show');
            // Asegurar posicionamiento correcto en preview - igual que Floating Menu
            if (isPreview && profileMenuContainer) {
              console.log('[TabBar] Setting profile menu container styles for preview');
              const tabBarRect = tabBarElement.getBoundingClientRect();
              console.log('[TabBar] TabBar bottom position:', tabBarRect.bottom, 'window height:', window.innerHeight);
              profileMenuContainer.style.display = 'block';
              profileMenuContainer.style.position = 'absolute';
              profileMenuContainer.style.bottom = '68px'; // 60px (altura TabBar) + 8px (espacio)
              profileMenuContainer.style.left = '0';
              profileMenuContainer.style.right = '0';
              profileMenuContainer.style.width = '100%';
              profileMenuContainer.style.maxWidth = '100%';
              profileMenuContainer.style.zIndex = '2001';
              profileMenuContainer.style.overflow = 'visible';
              console.log('[TabBar] Profile menu container bottom (inline):', profileMenuContainer.style.bottom);
              // Asegurar que el menú interno tenga el ancho completo y posición absoluta, igual que Floating Menu
              const profileMenuInner = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
              if (profileMenuInner) {
                profileMenuInner.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;';
                profileMenuInner.classList.add('ubits-profile-menu--preview');
              }
              console.log('[TabBar] Profile menu container computed bottom:', window.getComputedStyle(profileMenuContainer).bottom);
              console.log('[TabBar] Profile menu computed bottom:', window.getComputedStyle(profileMenu).bottom);
            } else {
              // No preview - usar estilos CSS fixed
              console.log('[TabBar] Not preview mode, using CSS fixed styles');
              console.log('[TabBar] Profile menu container computed bottom:', window.getComputedStyle(profileMenuContainer).bottom);
              console.log('[TabBar] Profile menu computed bottom:', window.getComputedStyle(profileMenu).bottom);
              console.log('[TabBar] Profile menu computed position:', window.getComputedStyle(profileMenu).position);
              console.log('[TabBar] TabBar element:', tabBarElement);
              if (tabBarElement) {
                const tabBarRect = tabBarElement.getBoundingClientRect();
                console.log('[TabBar] TabBar position:', tabBarRect.bottom, 'window height:', window.innerHeight);
                console.log('[TabBar] Expected menu bottom:', window.innerHeight - tabBarRect.height);
              }
            }
            // Cerrar Floating Menu si está abierto
            if (floatingMenuContainer) {
              const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
              if (floatingMenu) {
                floatingMenu.classList.remove('ubits-floating-menu--show');
              }
            }
          }
        }
        return;
      }

      // Llamar callback del item si existe
      if (item.onClick) {
        item.onClick(item, event);
      }

      // Actualizar estado activo
      updateActiveTab(tabBarElement, tabId);

      // Llamar callback global
      if (onTabChange) {
        onTabChange(tabId, item, itemElement);
      }
    });
  });
}

/**
 * Inicializa listeners del Floating Menu
 */
function initFloatingMenuListeners(
  container: HTMLElement,
  onFloatingMenuItemClick?: (sectionId: string, subitemId?: string, url?: string) => void
): void {
  const floatingMenu = container.querySelector('.ubits-floating-menu') as HTMLElement;
  if (!floatingMenu) return;

  // Botón cerrar - usar el contenedor específico en lugar de buscar por ID global
  const closeButton = floatingMenu.querySelector('#ubits-floating-menu-close');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Cerrar desde el contenedor específico
      if (container) {
        container.style.display = 'none';
      }
      if (floatingMenu) {
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    });
  }

  // Tree menu nodes (expandible/collapsible)
  const treeNodes = floatingMenu.querySelectorAll('.ubits-tree-menu-node');
  console.log('[initFloatingMenuListeners] Found', treeNodes.length, 'tree menu nodes');
  treeNodes.forEach((node, index) => {
    const nodeId = node.getAttribute('data-tree-node-id');
    console.log(`[initFloatingMenuListeners] Node ${index}:`, nodeId);
    const header = node.querySelector('.ubits-tree-menu-header') as HTMLElement;
    if (header) {
      console.log(`[initFloatingMenuListeners] Adding click listener to node: ${nodeId}`);
      header.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`[initFloatingMenuListeners] Clicked on node: ${nodeId}`);
        if (nodeId) {
          toggleTreeMenuNode(floatingMenu, nodeId);
        }
      });
    } else {
      console.warn(`[initFloatingMenuListeners] No header found for node: ${nodeId}`);
    }
  });

  // Tree menu links (enlaces directos)
  const links = floatingMenu.querySelectorAll('.ubits-tree-menu-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const sectionId = link.getAttribute('data-section-id');
      const url = (link as HTMLElement).getAttribute('href');

      if (onFloatingMenuItemClick) {
        onFloatingMenuItemClick(sectionId || '', undefined, url || undefined);
      }
    });
  });

  // Cerrar con ESC
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && floatingMenu.classList.contains('ubits-floating-menu--show')) {
      container.style.display = 'none';
      floatingMenu.classList.remove('ubits-floating-menu--show');
    }
  };
  document.addEventListener('keydown', escHandler);

  // Cerrar al hacer click fuera
  const clickOutsideHandler = (e: MouseEvent) => {
    if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
      const target = e.target as HTMLElement;
      if (!floatingMenu.contains(target) && !target.closest('[data-tab-id="modulos"]')) {
        container.style.display = 'none';
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    }
  };
  document.addEventListener('click', clickOutsideHandler);
}

/**
 * Inicializa listeners del Profile Menu
 */
function initProfileMenuListeners(
  container: HTMLElement,
  items: ProfileMenuItem[],
  onProfileMenuItemClick?: (itemId: string, item: ProfileMenuItem) => void
): void {
  const profileMenu = container.querySelector('.ubits-profile-menu');
  if (!profileMenu) return;

  // Tree menu nodes (expandible/collapsible)
  const treeNodes = profileMenu.querySelectorAll('.ubits-profile-tree-node');
  treeNodes.forEach(node => {
    const header = node.querySelector('.ubits-profile-tree-header') as HTMLElement;
    if (header) {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nodeId = node.getAttribute('data-tree-node-id');
        if (nodeId) {
          toggleProfileTreeMenuNode(profileMenu, nodeId);
        }
      });
    }
  });

  // Tree menu links (enlaces directos)
  const links = profileMenu.querySelectorAll('.ubits-profile-tree-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const itemId = link.closest('[data-profile-item-id]')?.getAttribute('data-profile-item-id');
      if (itemId) {
        const item = items.find(i => i.id === itemId);
        if (item) {
          // Si tiene onClick, ejecutarlo
          if (item.onClick) {
            item.onClick();
          }
          // Si tiene url y no tiene onClick, navegar directamente
          else if (item.url) {
            window.location.href = item.url;
          }
          // Llamar al callback si existe
          if (onProfileMenuItemClick) {
            onProfileMenuItemClick(itemId, item);
          }
          hideProfileMenu();
        }
      }
    });
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileMenu.classList.contains('ubits-profile-menu--show')) {
      hideProfileMenu();
    }
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (profileMenu.classList.contains('ubits-profile-menu--show')) {
      const target = e.target as HTMLElement;
      if (!profileMenu.contains(target) && !target.closest('[data-tab-id="perfil"]')) {
        hideProfileMenu();
      }
    }
  });
}

/**
 * Muestra el Floating Menu
 */
function showFloatingMenu(): void {
  const floatingMenu = document.getElementById('ubits-floating-menu');
  if (floatingMenu) {
    floatingMenu.classList.add('ubits-floating-menu--show');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Oculta el Floating Menu
 */
function hideFloatingMenu(): void {
  const floatingMenu = document.getElementById('ubits-floating-menu');
  if (floatingMenu) {
    floatingMenu.classList.remove('ubits-floating-menu--show');
    document.body.style.overflow = '';
  }
}

/**
 * Muestra el Profile Menu
 */
function showProfileMenu(container: HTMLElement): void {
  const profileMenu = container.querySelector('.ubits-profile-menu');
  if (profileMenu) {
    profileMenu.classList.add('ubits-profile-menu--show');
  }
}

/**
 * Toggle de profile tree menu node (expandir/colapsar)
 */
function toggleProfileTreeMenuNode(container: HTMLElement, nodeId: string): void {
  const children = container.querySelector(`[data-tree-children-id="${nodeId}"]`) as HTMLElement;
  const chevron = container.querySelector(`[data-chevron-id="${nodeId}"]`) as HTMLElement;
  const header = container.querySelector(`[data-tree-node-id="${nodeId}"] .ubits-profile-tree-header`) as HTMLElement;

  if (!children || !chevron) {
    console.warn(`Profile tree menu node not found: ${nodeId}`, { children: !!children, chevron: !!chevron });
    return;
  }

  // Verificar si está abierto (puede estar en display: none o display: block)
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen) {
    // Cerrar
    children.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
    if (header) header.classList.remove('ubits-profile-tree-header--active');
  } else {
    // Abrir
    children.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
    if (header) header.classList.add('ubits-profile-tree-header--active');
  }
}

/**
 * Oculta el Profile Menu
 */
function hideProfileMenu(): void {
  const profileMenu = document.getElementById('ubits-profile-menu');
  if (profileMenu) {
    profileMenu.classList.remove('ubits-profile-menu--show');
  }
}

/**
 * Toggle de tree menu node (expandir/colapsar)
 */
function toggleTreeMenuNode(container: HTMLElement, nodeId: string): void {
  const children = container.querySelector(`[data-tree-children-id="${nodeId}"]`) as HTMLElement;
  const chevronIcon = container.querySelector(`[data-chevron-id="${nodeId}"]`) as HTMLElement;
  const header = container.querySelector(`[data-tree-node-id="${nodeId}"] .ubits-tree-menu-header`) as HTMLElement;

  if (!children || !chevronIcon) {
    console.warn(`[toggleTreeMenuNode] Tree menu node not found: ${nodeId}`, { 
      children: !!children, 
      chevronIcon: !!chevronIcon
    });
    return;
  }

  // Verificar si está abierto (puede estar en display: none o display: block)
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen) {
    // Cerrar
    children.style.display = 'none';
    chevronIcon.classList.remove('fa-chevron-down');
    chevronIcon.classList.add('fa-chevron-right');
    if (header) header.classList.remove('ubits-tree-menu-header--active');
  } else {
    // Abrir
    children.style.display = 'block';
    chevronIcon.classList.remove('fa-chevron-right');
    chevronIcon.classList.add('fa-chevron-down');
    if (header) header.classList.add('ubits-tree-menu-header--active');
  }
}

/**
 * Toggle de accordion (mantener para compatibilidad)
 * @deprecated Usar toggleTreeMenuNode en su lugar
 */
function toggleAccordion(sectionId: string): void {
  const body = document.querySelector(`[data-body-id="${sectionId}"]`) as HTMLElement;
  const chevron = document.querySelector(`[data-chevron-id="${sectionId}"]`) as HTMLElement;
  const circle = document.querySelector(`[data-circle-id="${sectionId}"]`) as HTMLElement;
  const title = document.querySelector(`[data-accordion-id="${sectionId}"] .ubits-accordion-title`) as HTMLElement;

  if (!body || !chevron || !circle || !title) return;

  const isCurrentlyOpen = body.style.display === 'block';

  // Cerrar todos los accordions primero
  closeAllAccordions();

  if (!isCurrentlyOpen) {
    // Abrir solo este accordion
    body.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
    title.classList.add('active');
    circle.classList.add('active');
  }
}

/**
 * Cierra todos los accordions
 * @deprecated Ya no se usa con tree menu
 */
function closeAllAccordions(): void {
  const allBodies = document.querySelectorAll('.ubits-accordion-body');
  const allChevrons = document.querySelectorAll('.ubits-accordion-chevron');
  const allCircles = document.querySelectorAll('.ubits-accordion-icon-circle');
  const allTitles = document.querySelectorAll('.ubits-accordion-title');

  allBodies.forEach(body => {
    (body as HTMLElement).style.display = 'none';
  });

  allChevrons.forEach(chevron => {
    (chevron as HTMLElement).style.transform = 'rotate(0deg)';
  });

  allCircles.forEach(circle => {
    circle.classList.remove('active');
    const icon = circle.querySelector('i');
    if (icon) icon.classList.remove('active');
  });

  allTitles.forEach(title => {
    title.classList.remove('active');
  });
}

/**
 * Actualiza el tab activo
 */
function updateActiveTab(tabBarElement: HTMLElement, activeTabId: string): void {
  const allTabs = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  allTabs.forEach(tab => {
    const tabId = tab.getAttribute('data-tab-id');
    if (tabId === activeTabId) {
      tab.classList.add('ubits-tabbar-item--active');
    } else {
      tab.classList.remove('ubits-tabbar-item--active');
    }
  });
}

/**
 * Toggle de dark mode
 */
function toggleDarkMode(
  tabBarElement: HTMLElement,
  onDarkModeToggle?: (isDark: boolean) => void
): void {
  // Buscar el contenedor padre (puede ser el preview container)
  let themeContainer: HTMLElement | null = tabBarElement.closest('[data-theme]');
  if (!themeContainer) {
    // Si no hay contenedor con data-theme, buscar el body o documentElement
    themeContainer = document.body;
  }

  const currentTheme = themeContainer.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  themeContainer.setAttribute('data-theme', newTheme);
  
  if (onDarkModeToggle) {
    onDarkModeToggle(newTheme === 'dark');
  }
}

