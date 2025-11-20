/**
 * Content Manager
 * Gestiona el contenido dinámico por sección
 * Actualiza SubNav y content-area cuando cambia la sección del Sidebar
 */

class ContentManager {
  constructor() {
    this.currentSection = null;
    this.contentCache = new Map();
    this.isAdminMode = false; // Detecta si estamos en modo admin
  }

  /**
   * Detecta el modo (admin o colaborador) basándose en el variant del sidebar
   */
  detectMode() {
    const sidebarElement = document.querySelector('.ubits-sidebar');
    if (sidebarElement) {
      // El variant se pasa en la configuración, pero podemos detectarlo por los botones
      const hasAdminButtons = sidebarElement.querySelector('[data-section="inicio"]');
      const hasColaboradorButtons = sidebarElement.querySelector('[data-section="admin"]');
      
      if (hasAdminButtons && !hasColaboradorButtons) {
        this.isAdminMode = true;
      } else {
        this.isAdminMode = false;
      }
    }
    return this.isAdminMode;
  }

  /**
   * Mapeo de secciones del Sidebar a configuraciones de SubNav
   * IMPORTANTE: Algunas secciones tienen el mismo nombre en colaborador y admin,
   * pero activan SubNav diferentes. El variant del Sidebar determina qué SubNav usar.
   */
  getSubNavForSection(section) {
    // Detectar modo antes de retornar la configuración
    this.detectMode();
    
    // ⚠️ IMPORTANTE: Secciones sin SubNav
    // En modo admin: inicio y diagnóstico no tienen SubNav
    if (this.isAdminMode && (section === 'inicio' || section === 'diagnóstico')) {
      return null;
    }
    
    // En modo colaborador: diagnóstico no tiene SubNav
    if (!this.isAdminMode && section === 'diagnóstico') {
      return null;
    }
    
    // Centro de ayuda nunca tiene SubNav (en cualquier modo)
    if (section === 'centro-ayuda' || section === 'centro-de-ayuda') {
      return null;
    }
    
    const subNavMap = {
      // === SIDEBAR COLABORADOR ===
      'admin': {
        variant: 'template',
        tabs: [
          { id: 'admin-inicio', label: 'Inicio', icon: 'home', active: true },
          { id: 'admin-empresa', label: 'Empresa', icon: 'building' },
          { id: 'admin-config', label: 'Configuración', icon: 'cog' }
        ],
        activeTabId: 'admin-inicio'
      },
      // === SIDEBAR ADMIN ===
      // 'inicio' en modo admin NO debe mostrar SubNav
      // Por lo tanto, no se define aquí - getSubNavForSection retornará null
      // 'inicio': null, // No SubNav para inicio en modo admin
      'empresa': {
        // En modo admin, empresa usa variant 'empresa'
        variant: this.isAdminMode ? 'empresa' : 'template',
        tabs: this.isAdminMode ? [
          { id: 'gestion-usuarios', label: 'Gestión de usuarios', icon: 'users', active: true },
          { id: 'organigrama', label: 'Organigrama', icon: 'sitemap' },
          { id: 'datos-empresa', label: 'Datos de empresa', icon: 'building' },
          { id: 'personalizacion', label: 'Personalización', icon: 'paint-brush' },
          { id: 'roles-permisos', label: 'Roles y permisos', icon: 'user-shield' },
          { id: 'comunicaciones', label: 'Comunicaciones', icon: 'envelope' }
        ] : [
          { id: 'section1', label: 'Sección 1', icon: 'home', active: true },
          { id: 'section2', label: 'Sección 2', icon: 'chart-line' },
          { id: 'section3', label: 'Sección 3', icon: 'settings' }
        ],
        activeTabId: this.isAdminMode ? 'gestion-usuarios' : 'section1'
      },
      'aprendizaje': {
        // En modo admin, aprendizaje usa variant 'admin-aprendizaje'
        variant: this.isAdminMode ? 'admin-aprendizaje' : 'aprendizaje',
        tabs: this.isAdminMode ? [
          { id: 'lms-cursos', label: 'LMS - Cursos propios', icon: 'book', active: true },
          { id: 'plan-formacion', label: 'Plan de formación', icon: 'clipboard-list-check' },
          { id: 'certificados', label: 'Certificados', icon: 'file-certificate' },
          { id: 'metricas-empresa', label: 'Métricas de empresa', icon: 'chart-line' }
        ] : [
          { id: 'home', label: 'Inicio', icon: 'home', active: true },
          { id: 'catalog', label: 'Catálogo', icon: 'book' },
          { id: 'corporate', label: 'U. Corporativa', icon: 'building-columns' },
          { id: 'study-zone', label: 'Zona de estudio', icon: 'books' }
        ],
        activeTabId: this.isAdminMode ? 'lms-cursos' : 'home'
      },
      // 'diagnóstico' NO tiene SubNav en modo admin
      // 'diagnóstico': {
      //   variant: 'template',
      //   tabs: [
      //     { id: 'diagnostico-general', label: 'General', icon: 'chart-mixed', active: true },
      //     { id: 'diagnostico-resultados', label: 'Resultados', icon: 'file-chart-line' }
      //   ],
      //   activeTabId: 'diagnostico-general'
      // },
      'desempeño': {
        // En modo admin, desempeño usa variant 'admin-desempeno'
        variant: this.isAdminMode ? 'admin-desempeno' : 'desempeno',
        tabs: this.isAdminMode ? [
          { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', active: true },
          { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
          { id: 'matriz-talento', label: 'Matriz de Talento', icon: 'sitemap' }
        ] : [
          { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', active: true },
          { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
          { id: 'metrics', label: 'Métricas', icon: 'chart-line' },
          { id: 'reports', label: 'Reportes', icon: 'file-chart-line' }
        ],
        activeTabId: 'evaluations'
      },
      'encuestas': {
        variant: 'template',
        tabs: [
          { id: 'encuestas-general', label: 'Encuestas', icon: 'clipboard-list-check', active: true }
        ],
        activeTabId: 'encuestas-general'
      },
      'reclutamiento': {
        variant: 'template',
        tabs: [
          { id: 'reclutamiento-general', label: 'Reclutamiento', icon: 'users', active: true }
        ],
        activeTabId: 'reclutamiento-general'
      },
      'tareas': {
        variant: 'template',
        tabs: [
          { id: 'planes', label: 'Planes', icon: 'calendar', active: true },
          { id: 'tasks', label: 'Tareas', icon: 'tasks' }
        ],
        activeTabId: 'planes'
      },
      'ubits-ai': {
        variant: null, // No mostrar SubNav para UBITS AI
        tabs: [],
        activeTabId: null
      },
      'perfil': {
        variant: null, // No mostrar SubNav para Perfil
        tabs: [],
        activeTabId: null
      },
      // Secciones del footer admin (sin SubNav)
      // Nota: 'api', 'centro-ayuda' y 'centro-de-ayuda' se manejan con return null antes del subNavMap
      'api': {
        variant: null,
        tabs: [],
        activeTabId: null
      }
    };

    const subNavConfig = subNavMap[section];
    if (subNavConfig) {
      return subNavConfig;
    }

    // Configuración por defecto
    return {
      variant: 'template',
      tabs: [
        { id: 'section1', label: 'Sección 1', icon: 'home', active: true },
        { id: 'section2', label: 'Sección 2', icon: 'chart-line' },
        { id: 'section3', label: 'Sección 3', icon: 'settings' }
      ],
      activeTabId: 'section1'
    };
  }

  /**
   * Obtiene el título de una sección basándose en el contenido o configuración
   */
  getSectionTitle(section, subSection = null) {
    // Mapeo de títulos para cada sección y subsección
    const titleMap = {
      'admin': 'Panel de Administración',
      'aprendizaje': {
        default: this.isAdminMode ? 'LMS' : 'Aprendizaje',
        'lms-cursos': 'LMS - Cursos propios',
        'plan-formacion': 'Plan de formación',
        'certificados': 'Certificados',
        'metricas-empresa': 'Métricas de empresa',
        'home': 'Inicio - Aprendizaje',
        'catalog': 'Catálogo',
        'corporate': 'Universidad Corporativa',
        'study-zone': 'Zona de Estudio'
      },
      'empresa': {
        default: this.isAdminMode ? 'Gestión de usuarios' : 'Empresa',
        'gestion-usuarios': 'Gestión de usuarios',
        'organigrama': 'Organigrama',
        'datos-empresa': 'Datos de empresa',
        'personalizacion': 'Personalización',
        'roles-permisos': 'Roles y permisos',
        'comunicaciones': 'Comunicaciones'
      },
      'diagnóstico': 'Diagnóstico',
      'desempeño': {
        default: this.isAdminMode ? 'Evaluaciones 360' : 'Desempeño',
        'evaluations': 'Evaluaciones 360',
        'matriz-talento': 'Matriz de Talento',
        'objectives': 'Objetivos',
        'metrics': 'Métricas',
        'reports': 'Reportes'
      },
      'encuestas': 'Encuestas',
      'reclutamiento': 'Reclutamiento',
      'tareas': {
        default: 'Tareas',
        'planes': 'Planes',
        'tasks': 'Tareas'
      },
      'ubits-ai': 'UBITS AI',
      'perfil': 'Mi Perfil',
      'api': 'API',
      'centro-ayuda': 'Centro de Ayuda',
      'centro-de-ayuda': 'Centro de Ayuda'
    };

    const sectionTitle = titleMap[section];
    if (!sectionTitle) {
      // Fallback: usar el nombre de la sección capitalizado
      return section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    }

    // Si es un objeto (tiene subsecciones), obtener el título de la subsección o default
    if (typeof sectionTitle === 'object') {
      return sectionTitle[subSection] || sectionTitle.default || section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    }

    // Si es un string directo, retornarlo
    return sectionTitle;
  }

  /**
   * Obtiene el contenido HTML para una sección
   * Retorna solo el HTML interno de .content-sections (sin el wrapper)
   */
  getContentForSection(section, subSection = null) {
    const sectionContent = {
      'admin': {
        default: `
          <div class="section-single">
            <div class="widget-admin-dashboard">
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Contenido de administración</p>
            </div>
          </div>
        `
      },
      'aprendizaje': {
        default: `
          <div class="section-single">
            <div class="widget-aprendizaje-main">
            </div>
          </div>
        `,
        // Tabs para modo admin (aprendizaje)
        'lms-cursos': `
          <div class="section-single">
            <div class="widget-lms-cursos">
            </div>
          </div>
        `,
        'plan-formacion': `
          <div class="section-single">
            <div class="widget-plan-formacion">
            </div>
          </div>
        `,
        'certificados': `
          <div class="section-single">
            <div class="widget-certificados">
            </div>
          </div>
        `,
        'metricas-empresa': `
          <div class="section-single">
            <div class="widget-metricas-empresa">
            </div>
          </div>
        `,
        'home': `
          <div class="section-single">
            <div class="widget-aprendizaje-inicio">
            </div>
          </div>
        `,
        'catalog': `
          <div class="section-single">
            <div class="widget-aprendizaje-catalogo">
            </div>
          </div>
        `,
        'corporate': `
          <div class="section-single">
            <div class="widget-aprendizaje-corporativa">
            </div>
          </div>
        `,
        'study-zone': `
          <div class="section-single">
            <div class="widget-aprendizaje-zona-estudio">
            </div>
          </div>
        `
      },
      'empresa': {
        default: `
          <div class="section-single">
            <div class="widget-empresa-main">
            </div>
          </div>
        `,
        // Tabs para modo admin (empresa)
        'gestion-usuarios': `
          <div class="section-single">
            <div class="widget-gestion-usuarios">
            </div>
          </div>
        `,
        'organigrama': `
          <div class="section-single">
            <div class="widget-organigrama">
            </div>
          </div>
        `,
        'datos-empresa': `
          <div class="section-single">
            <div class="widget-datos-empresa">
            </div>
          </div>
        `,
        'personalizacion': `
          <div class="section-single">
            <div class="widget-personalizacion">
            </div>
          </div>
        `,
        'roles-permisos': `
          <div class="section-single">
            <div class="widget-roles-permisos">
            </div>
          </div>
        `,
        'comunicaciones': `
          <div class="section-single">
            <div class="widget-comunicaciones">
            </div>
          </div>
        `
      },
      'diagnóstico': {
        default: `
          <div class="section-single">
            <div class="widget-diagnostico-main">
            </div>
          </div>
        `
      },
      'desempeño': {
        default: `
          <div class="section-single">
            <div class="widget-desempeno-main">
            </div>
          </div>
        `,
        'evaluations': `
          <div class="section-single">
            <div class="widget-desempeno-evaluaciones">
            </div>
          </div>
        `,
        'matriz-talento': `
          <div class="section-single">
            <div class="widget-matriz-talento">
            </div>
          </div>
        `,
        'objectives': `
          <div class="section-single">
            <div class="widget-desempeno-objetivos">
            </div>
          </div>
        `,
        'metrics': `
          <div class="section-single">
            <div class="widget-desempeno-metricas">
            </div>
          </div>
        `,
        'reports': `
          <div class="section-single">
            <div class="widget-desempeno-reportes">
            </div>
          </div>
        `
      },
      'encuestas': {
        default: `
          <div class="section-single">
            <div class="widget-encuestas-main">
            </div>
          </div>
        `
      },
      'reclutamiento': {
        default: `
          <div class="section-single">
            <div class="widget-reclutamiento-main">
            </div>
          </div>
        `
      },
      'tareas': {
        default: `
          <div class="section-single">
            <div class="widget-tareas-main">
            </div>
          </div>
        `,
        'planes': `
          <div class="section-single">
            <div class="widget-tareas-planes">
            </div>
          </div>
        `,
        'tasks': `
          <div class="section-single">
            <div class="widget-tareas-tasks">
            </div>
          </div>
        `
      },
      'ubits-ai': {
        default: `
          <div class="section-single">
            <div class="widget-ubits-ai-main">
            </div>
          </div>
        `
      },
      'perfil': {
        default: `
          <div class="section-single">
            <div class="widget-perfil-main">
            </div>
          </div>
        `
      },
      'api': {
        default: `
          <div class="section-single">
            <div class="widget-api-main">
            </div>
          </div>
        `
      },
      'centro-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
            </div>
          </div>
        `
      },
      'centro-de-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
            </div>
          </div>
        `
      }
    };

    const sectionData = sectionContent[section];
    if (!sectionData) {
      return `
        <div class="section-single">
          <div class="widget-default">
          </div>
        </div>
      `;
    }

    // Si hay subsección específica, retornarla, sino usar default
    const contentKey = subSection && sectionData[subSection] ? subSection : 'default';
    const content = sectionData[contentKey] || sectionData.default;
    
    return content;
  }

  /**
   * Actualiza el SubNav según la sección actual
   */
  updateSubNav(section) {
    const subNavConfig = this.getSubNavForSection(section);
    
    // Si la sección no tiene SubNav (ej: inicio en admin, ubits-ai, perfil), ocultarlo
    const topNavContainer = document.getElementById('top-nav-container');
    if (!topNavContainer) {
      return;
    }

    // Si getSubNavForSection retorna null, ocultar SubNav
    if (!subNavConfig) {
      topNavContainer.style.display = 'none';
      return;
    }

    if (!subNavConfig.variant || subNavConfig.tabs.length === 0) {
      // Ocultar SubNav si no hay variant o tabs
      topNavContainer.style.display = 'none';
      return;
    }

    // Mostrar SubNav
    topNavContainer.style.display = 'block';

    // Recargar SubNav con la nueva configuración
    if (typeof window.createSubNav === 'function') {
      window.createSubNav({
        containerId: 'top-nav-container',
        variant: subNavConfig.variant,
        tabs: subNavConfig.tabs,
        activeTabId: subNavConfig.activeTabId,
        onTabChange: (tabId, element) => {
          // Actualizar contenido según subsección
          // IMPORTANTE: Mantener la sección actual y solo cambiar la subsección
          if (this.currentSection !== section) {
            return;
          }
          this.updateContent(this.currentSection || section, tabId);
        }
      });
    }
  }

  /**
   * Actualiza el contenido del área principal
   */
  updateContent(section, subSection = null) {
    // Buscar el content-area (puede estar en .content-area o dentro de .content-sections)
    let contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      // Fallback: buscar por contenido existente
      contentArea = document.querySelector('.content-sections')?.parentElement;
    }
    if (!contentArea) {
      return;
    }

    // Limpiar contentArea
    contentArea.innerHTML = '';
    
    // Obtener título de la sección
    const sectionTitle = this.getSectionTitle(section, subSection);
    
    // NO mostrar header-section en el home del administrador (sección 'admin')
    if (section !== 'admin') {
      // Crear contenedor para header-section (al inicio del content-area, sin espacio superior)
      const headerContainer = document.createElement('div');
      headerContainer.id = 'header-section-container';
      headerContainer.style.cssText = 'margin-top: 0; margin-bottom: 0; width: 100%;';
      
      // Crear header-section con solo título y botón primario
      // HTML directo sin dependencias de TypeScript
      const headerHTML = `
        <div class="ubits-header-section">
          <div class="ubits-header-section__content">
            <h2 class="ubits-heading-h2" style="color: var(--ubits-fg-1-high); margin: 0;">${sectionTitle}</h2>
            <div class="ubits-header-section__actions">
              <button class="ubits-button ubits-button--primary ubits-button--md">
                <i class="far fa-plus"></i>
                <span>Acción</span>
              </button>
            </div>
          </div>
        </div>
      `;
      
      headerContainer.innerHTML = headerHTML;
      contentArea.appendChild(headerContainer);
    }
    
    // Crear .content-sections y agregar el contenido
    const content = this.getContentForSection(section, subSection);
    const contentSections = document.createElement('div');
    contentSections.className = 'content-sections';
    contentSections.innerHTML = content;
    contentArea.appendChild(contentSections);
    
    this.currentSection = section;
  }

  /**
   * Maneja el cambio de sección del Sidebar
   */
  handleSectionChange(section) {
    
    // Si es "perfil", desactivar todos los botones del sidebar
    if (section === 'perfil') {
      const sidebarElement = document.querySelector('.ubits-sidebar');
      if (sidebarElement) {
        sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
          btn.classList.remove('active');
          btn.blur();
        });
      }
    }
    
    // Establecer sección actual ANTES de actualizar SubNav
    // Esto asegura que el callback onTabChange tenga acceso a this.currentSection
    this.currentSection = section;
    
    // Actualizar SubNav primero (esto creará el SubNav con el callback correcto)
    this.updateSubNav(section);
    
    // Actualizar contenido con la subsección por defecto
    const subNavConfig = this.getSubNavForSection(section);
    // Si no hay SubNav config (null), usar null como subSection para cargar el contenido default
    const defaultSubSection = subNavConfig && subNavConfig.activeTabId ? subNavConfig.activeTabId : null;
    this.updateContent(section, defaultSubSection);
  }
}

// Crear instancia global
window.UBITS_ContentManager = new ContentManager();


