/**
 * SubNavProvider
 * Lógica de renderizado y gestión del componente SubNav
 * Incluye variantes, tabs y navegación
 */

import type { SubNavOptions, SubNavTab } from './types/SubNavOptions';
import { getSubNavConfig } from './configs/subNavVariants';
import './styles/subnav.css';

// Helper para renderizar iconos (compatible con FontAwesome)
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  // Si el iconName ya incluye 'far' o 'fas', usar directamente
  if (iconName.includes('far ') || iconName.includes('fas ')) {
    const parts = iconName.split(' ');
    const styleClass = parts[0]; // 'far' o 'fas'
    const iconClass = parts.slice(1).join(' '); // resto de las clases
    return `<i class="${styleClass} ${iconClass}"></i>`;
  }
  
  // Si no, construir la clase normalmente
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza el HTML del SubNav
 */
export function renderSubNav(options: SubNavOptions): string {
  const {
    variant = 'template',
    tabs: customTabs,
    activeTabId,
    showIcons = false
  } = options;

  console.log('🔵 [SubNavProvider] renderSubNav llamado', { variant, showIcons, activeTabId });

  // Obtener configuración de la variante o usar tabs personalizados
  const config = getSubNavConfig(variant);
  const tabs = (variant === 'template' && customTabs && customTabs.length > 0) 
    ? customTabs 
    : config.tabs;

  console.log('🟢 [SubNavProvider] Tabs obtenidos:', tabs.length, 'showIcons:', showIcons);

  // Determinar tab activo
  const activeId = activeTabId || (tabs.length > 0 ? tabs[0].id : '');

  // Renderizar tabs normales
  const tabsHTML = tabs.map(tab => {
    const isActive = tab.id === activeId || tab.active;
    const activeClass = isActive ? 'ubits-sub-nav-tab--active' : '';
    
    // Renderizar icono solo si showIcons es true
    const iconHTML = showIcons ? renderIconHelper(tab.icon) : '';
    
    console.log(`🟡 [SubNavProvider] Renderizando tab ${tab.id}:`, {
      showIcons,
      hasIcon: !!tab.icon,
      iconHTML: iconHTML ? iconHTML.substring(0, 50) : 'vacío'
    });
    
    return `
      <button 
        class="ubits-sub-nav-tab ${activeClass}" 
        data-tab="${tab.id}"
        ${tab.url ? `data-url="${tab.url}"` : ''}
        ${tab.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${iconHTML}
        <span>${tab.label}</span>
      </button>
    `;
  }).join('');

  // Agregar clase para mostrar iconos si showIcons es true
  const navClass = showIcons ? 'ubits-sub-nav ubits-sub-nav--with-icons' : 'ubits-sub-nav';
  
  return `
    <nav class="${navClass}" data-variant="${variant}" data-ubits-id="🧩-ux-subnav">
      <div class="ubits-sub-nav-tabs">
        ${tabsHTML}
      </div>
    </nav>
  `.trim();
}

/**
 * Inicializa los event listeners de los tabs
 */
function initTabListeners(subNavElement: HTMLElement, options: SubNavOptions): void {
  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  
  const handleTabClick = (tabElement: HTMLElement) => {
    const tabId = tabElement.getAttribute('data-tab');
    const url = tabElement.getAttribute('data-url');
    
    // Remover active de todos los tabs
    tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));
    
    // Agregar active al tab clickeado
    tabElement.classList.add('ubits-sub-nav-tab--active');
    
    // Navegar a URL si existe
    if (url) {
      window.location.href = url;
      return;
    }
    
    // Buscar el callback onClick del tab original
    const config = getSubNavConfig(options.variant || 'template');
    const allTabs = (options.variant === 'template' && options.tabs && options.tabs.length > 0)
      ? options.tabs
      : config.tabs;
    const tabConfig = allTabs.find(t => t.id === tabId);
    
    if (tabConfig && tabConfig.onClick) {
      tabConfig.onClick(new MouseEvent('click'));
    }
    
    // Llamar callback si existe
    if (options.onTabChange) {
      options.onTabChange(tabId || '', tabElement);
    }
    
    // Disparar evento personalizado
    const event = new CustomEvent('subNavTabClick', {
      detail: { tabId: tabId, tabElement: tabElement }
    });
    document.dispatchEvent(event);
  };

  // Event listeners para tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      handleTabClick(tab as HTMLElement);
    });
  });
}

/**
 * Crea un SubNav interactivo en el DOM
 */
export function createSubNav(options: SubNavOptions): HTMLElement {
  console.log('🔵 [SubNavProvider] createSubNav llamado', { containerId: options.containerId, showIcons: options.showIcons });
  
  const { containerId } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ [SubNavProvider] Contenedor ${containerId} no encontrado`);
    throw new Error(`Container with id "${containerId}" not found`);
  }

  console.log('🟢 [SubNavProvider] Contenedor encontrado:', containerId);

  const subNavHTML = renderSubNav(options);
  console.log('🟢 [SubNavProvider] HTML generado, longitud:', subNavHTML.length);
  container.innerHTML = subNavHTML;
  console.log('🟢 [SubNavProvider] HTML insertado en contenedor');

  const subNavElement = container.querySelector('.ubits-sub-nav') as HTMLElement;
  if (!subNavElement) {
    console.error('❌ [SubNavProvider] No se encontró .ubits-sub-nav después de insertar HTML');
    throw new Error('Failed to create sub-nav element');
  }

  // Agregar data-ubits-id si no está presente
  if (!subNavElement.hasAttribute('data-ubits-id')) {
    subNavElement.setAttribute('data-ubits-id', '🧩-ux-subnav');
  }

  console.log('🟢 [SubNavProvider] SubNav element encontrado');

  // Verificar iconos en el HTML generado
  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  tabs.forEach((tab, index) => {
    const icon = tab.querySelector('i');
    console.log(`🟡 [SubNavProvider] Tab ${index} después de crear:`, {
      hasIcon: !!icon,
      showIcons: options.showIcons
    });
  });

  // Inicializar funcionalidades
  initTabListeners(subNavElement, options);

  return subNavElement;
}

/**
 * Actualiza el tab activo del SubNav
 */
export function updateActiveSubNavTab(containerId: string, tabId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const subNavElement = container.querySelector('.ubits-sub-nav');
  if (!subNavElement) return;

  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');

  // Remover active de todos
  tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));

  // Agregar active al tab especificado
  const targetTab = subNavElement.querySelector(`.ubits-sub-nav-tab[data-tab="${tabId}"]`);

  if (targetTab) {
    targetTab.classList.add('ubits-sub-nav-tab--active');
  }
}

