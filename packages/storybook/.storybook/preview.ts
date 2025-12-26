import type { Preview } from '@storybook/html-vite'
import '../../tokens/dist/tokens.css'
import '../../tokens/dist/figma-tokens.css'
import '../../typography/fonts.css'
import '../../typography/tokens-typography.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../components/avatar/src/styles/avatar.css'
import '../../addons/drawer/src/styles/drawer.css'
import '../../addons/modal/src/styles/modal.css'
import '../../addons/scroll/src/styles/scroll.css'
import '../../addons/progress/src/styles/progress.css'
import '../../addons/file-upload/src/styles/file-upload.css'
import '../../addons/button/src/styles/button.css'
import '../../addons/badge/src/styles/badge.css'
import '../../addons/alert/src/styles/alert.css'
import '../../addons/toast/src/styles/toast.css'
import '../../addons/list/src/styles/list.css'
import '../../addons/input/src/styles/input.css'
import '../../addons/sidebar/src/styles/sidebar.css'
import '../../addons/subnav/src/styles/subnav.css'
import '../../addons/tabbar/src/styles/tabbar.css'
import '../../addons/card/src/styles/card.css'
import '../../components/data-table/src/styles/data-table.css'
import '../../addons/pagination/src/styles/pagination.css'
import '../../addons/checkbox/src/styles/checkbox.css'
import '../../addons/toggle/src/styles/toggle.css'
import '../../addons/radio-button/src/styles/radio-button.css'
import '../../addons/selection-card/src/styles/selection-card.css'
import '../../addons/empty-state/src/styles/empty-state.css'
import '../../addons/tooltip/src/styles/tooltip.css'
import '../../addons/spinner/src/styles/spinner.css'
import '../../addons/calendar/src/styles/calendar.css'
import '../../addons/tabs/src/styles/tabs.css'
import '../../addons/segment-control/src/styles/segment-control.css'
import '../../addons/breadcrumb/src/styles/breadcrumb.css'
import '../../addons/stepper/src/styles/stepper.css'
import '../../addons/participants-menu/src/styles/participants-menu.css'
import '../../addons/metric-card/src/styles/metric-card.css'
import '../../addons/header-section/src/styles/header-section.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../components/button-ai/src/styles/button-ai.css'
import '../docs-site/.storybook/fontawesome-icons.css'

// ⭐ INTERCEPTAR ERRORES DE ADDONS NO INSTALADOS (simplificado)
// Solo interceptamos errores de promesas rechazadas para evitar bloquear la carga
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason;
      if (reason && typeof reason === 'object') {
        const message = String(reason.message || reason);
        if (
          message.includes('No existing state found for follower with id') &&
          (message.includes('storybook/checklist') ||
           message.includes('storybook/status') ||
           message.includes('storybook/test-provider'))
        ) {
          event.preventDefault();
        }
      }
    } catch {
      // Ignorar errores en la interceptación
    }
  });
}

// Script para limpiar caché de Storybook y redirigir IDs antiguos
if (typeof window !== 'undefined') {
  // Suprimir errores de extensiones del navegador que no afectan la funcionalidad
  window.addEventListener('error', (event) => {
    const errorMessage = event.message || '';
    const errorName = event.error?.name || '';
    
    if (
      errorMessage.includes('message channel closed') ||
      errorMessage.includes('asynchronous response') ||
      // Suprimir AbortError relacionados con waitForAnimations de Storybook
      (errorName === 'AbortError' && 
       (errorMessage.includes('aborted a request') ||
        errorMessage.includes('user aborted'))) ||
      // ⭐ Suprimir errores de addons no instalados (checklist, status, test-provider)
      (errorMessage.includes('No existing state found for follower with id') &&
       (errorMessage.includes('storybook/checklist') ||
        errorMessage.includes('storybook/status') ||
        errorMessage.includes('storybook/test-provider')))
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Suprimir errores de promesas rechazadas relacionadas con extensiones
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMessage = event.reason?.message || '';
    const reasonName = event.reason?.name || '';
    
    if (
      reasonMessage.includes('message channel closed') ||
      reasonMessage.includes('asynchronous response') ||
      // Suprimir AbortError relacionados con waitForAnimations de Storybook
      (reasonName === 'AbortError' && 
       (reasonMessage.includes('aborted a request') ||
        reasonMessage.includes('user aborted'))) ||
      // ⭐ Suprimir errores de addons no instalados (checklist, status, test-provider)
      (reasonMessage.includes('No existing state found for follower with id') &&
       (reasonMessage.includes('storybook/checklist') ||
        reasonMessage.includes('storybook/status') ||
        reasonMessage.includes('storybook/test-provider')))
    ) {
      event.preventDefault();
      return false;
    }
  });
  
  // Limpiar localStorage y sessionStorage de Storybook que pueden tener IDs antiguos
  const clearStorybookCache = () => {
    try {
      const keysToRemove: string[] = []
      
      // Buscar todas las claves relacionadas con Storybook
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.includes('storybook') || key.includes('sb-'))) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (e) {
          // Ignorar errores
        }
      })
      
      // Limpiar sessionStorage también
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && (key.includes('storybook') || key.includes('sb-'))) {
          try {
            sessionStorage.removeItem(key)
          } catch (e) {
            // Ignorar errores
          }
        }
      }
      
      // Caché limpiado silenciosamente
    } catch (e) {
      // Ignorar errores de localStorage
    }
  }
  
  // Función para intentar encontrar el nuevo ID basándose en el nombre del componente
  const findNewStoryId = (oldStoryId: string): string | null => {
    // Extraer el nombre del componente y el variant del ID antiguo
    // Ejemplo: "components-data-table--default" -> "data-table--default"
    const match = oldStoryId.match(/^components-(.+)$/)
    if (match) {
      const componentPart = match[1] // "data-table--default"
      
      // Intentar encontrar el nuevo ID en las categorías posibles
      const categories = ['formularios', 'data', 'navegacion', 'feedback', 'charts', 'layout', 'basicos']
      
      for (const category of categories) {
        const newId = `${category}-${componentPart}`
        // Verificar si existe en el índice de stories (esto se hace después de que Storybook cargue)
        // Por ahora, solo intentamos con las categorías más probables
        if (componentPart.startsWith('data-')) {
          return `data-${componentPart.replace('data-', '')}`
        }
      }
    }
    
    return null
  }
  
  // Limpiar caché al cargar
  clearStorybookCache()
  
  // Intentar redirigir si hay un ID antiguo en la URL
  const checkAndRedirect = () => {
    const currentPath = window.location.pathname + window.location.search
    const storyMatch = currentPath.match(/\/story\/([^/?]+)/)
    
    if (storyMatch) {
      const storyId = storyMatch[1]
      
      // Si el ID comienza con "components-", intentar encontrar el nuevo
      if (storyId.startsWith('components-')) {
        const newStoryId = findNewStoryId(storyId)
        
        if (newStoryId) {
          const newPath = currentPath.replace(`/${storyId}`, `/${newStoryId}`)
          window.history.replaceState({}, '', newPath)
          // Recargar la página para que Storybook cargue el nuevo story
          window.location.reload()
          return
        } else {
          // Si no encontramos el nuevo ID, redirigir a la página principal
          window.location.href = window.location.origin + window.location.pathname.replace(/\/story\/.*/, '')
        }
      }
    }
  }
  
  // Ejecutar después de un breve delay para que Storybook se inicialice
  setTimeout(checkAndRedirect, 100)
}

const preview: Preview = {
  parameters: {
    // Configurar timeouts para evitar AbortError en waitForAnimations
    test: {
      timeout: 10000, // 10 segundos
    },
    // Deshabilitar la espera de animaciones si causa problemas
    // Esto puede ayudar a evitar los AbortError
    docs: {
      source: {
        type: 'code',
        state: 'open', // Mostrar código automáticamente (siempre visible)
      },
      codePanel: true, // Habilitar panel de código automáticamente
    },
    // ⭐ CONFIGURACIÓN DE ADDONS
    // Actions: Ya integrado en Storybook 10, no requiere configuración adicional
    // Viewport: Configuración de breakpoints UBITS
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    // A11y: Configuración de accesibilidad
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Tokens UBITS',
          [
            'Tokens UBITS',
            '01. Modificadores (.modifiers)',
            '02. Semánticos',
            '03. Componentes',
            '04. Effects',
            '05. Tipografía',
            '06. Spacing',
            '07. Text Styles',
            '08. Border Radius',
          ],
          'Templates',
          [
            'Templates',
            'Templates UBITS Desktop',
            'Welcome Test',
          ],
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      title: 'Theme',
      description: 'Select light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, ctx) => {
      const theme = ctx.globals.theme || 'light'
      document.body.setAttribute('data-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
      
      // Limpiar componentes flotantes que no pertenecen a esta historia
      const storyId = ctx.id || ''
      const isTooltipStory = storyId.includes('tooltip')
      const isPopoverStory = storyId.includes('popover')
      const isButtonFeedbackStory = storyId.includes('button-feedback')
      const isModalStory = storyId.includes('modal')
      const isDrawerStory = storyId.includes('drawer')
      const isProgressStory = storyId.includes('progress')
      const isToastStory = storyId.includes('toast')
      const isAlertStory = storyId.includes('alert')
      const isMaskStory = storyId.includes('mask')
      
      // Limpiar tooltips de otras stories (no de la story actual)
      // Esto permite que los tooltips se muestren en Docs y durante re-renders
      // Solo limpiar tooltips que no pertenezcan a la story actual
      const tooltips = document.querySelectorAll('.ubits-tooltip')
      if (tooltips.length > 0) {
        // Determinar el tipo de story actual
        const currentStoryId = storyId.toLowerCase()
        const isImplementationStory = currentStoryId.includes('implementation')
        const isDefaultStory = currentStoryId.includes('default') && !currentStoryId.includes('implementation')
        
        let cleanedCount = 0
        tooltips.forEach((tooltip) => {
          const tooltipStoryId = tooltip.getAttribute('data-story-instance-id') || ''
          // Si es una story de tooltip, solo limpiar tooltips de otras stories de tooltip
          if (isTooltipStory) {
            // Verificar si el tooltip pertenece a otra story de tooltip
            // Los identificadores tienen formato: "tooltip-implementation-..." o "tooltip-default-..."
            const isTooltipFromImplementation = tooltipStoryId.includes('implementation')
            const isTooltipFromDefault = tooltipStoryId.includes('default')
            
            const shouldClean = 
              // Si no tiene identificador, limpiarlo
              !tooltipStoryId ||
              // Si estamos en Implementation y el tooltip es de Default
              (isImplementationStory && isTooltipFromDefault) ||
              // Si estamos en Default y el tooltip es de Implementation
              (isDefaultStory && isTooltipFromImplementation)
            
            if (shouldClean) {
              try {
                // Intentar destruir usando el método destroy si existe
                const tooltipElement = tooltip as any
                if (tooltipElement.__tooltipInstance?.destroy) {
                  try {
                    tooltipElement.__tooltipInstance.destroy()
                  } catch (e) {
                    // Ignorar errores al destruir
                  }
                }
                // Remover del DOM
                if (tooltip.parentElement) {
                  tooltip.parentElement.removeChild(tooltip)
                } else {
                  tooltip.remove()
                }
                cleanedCount++
              } catch (e) {
                // Ignorar errores
              }
            }
          } else {
            // Si NO es una story de tooltip, limpiar todos los tooltips
            try {
              const tooltipElement = tooltip as any
              if (tooltipElement.__tooltipInstance?.destroy) {
                try {
                  tooltipElement.__tooltipInstance.destroy()
                } catch (e) {
                  // Ignorar errores al destruir
                }
              }
              if (tooltip.parentElement) {
                tooltip.parentElement.removeChild(tooltip)
              } else {
                tooltip.remove()
              }
              cleanedCount++
            } catch (e) {
              // Ignorar errores
            }
          }
        })
        
        if (cleanedCount > 0) {
          console.log(`🧹 [Preview] Limpiando ${cleanedCount} tooltip(s) de otras stories`)
        }
      }
      
      // Limpiar popovers si no es la historia de popover
      if (!isPopoverStory) {
        const popovers = document.querySelectorAll('.ubits-popover')
        popovers.forEach((popover) => {
          try {
            if (popover.parentElement) {
              popover.parentElement.removeChild(popover)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar modales si no es la historia de modal
      // También limpiar antes de renderizar para evitar duplicados cuando Storybook re-renderiza
      const modalOverlays = document.querySelectorAll('.ubits-modal-overlay')
      if (modalOverlays.length > 0 && !isModalStory) {
        modalOverlays.forEach((overlay) => {
          try {
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            } else {
              overlay.remove()
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar drawers si no es la historia de drawer
      // También limpiar antes de renderizar para evitar duplicados cuando Storybook re-renderiza
      const drawerOverlays = document.querySelectorAll('.ubits-drawer-overlay')
      if (drawerOverlays.length > 0 && !isDrawerStory) {
        drawerOverlays.forEach((overlay) => {
          try {
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            } else {
              overlay.remove()
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar toasts si no es la historia de toast
      if (!isToastStory) {
        const toasts = document.querySelectorAll('.ubits-toast')
        toasts.forEach((toast) => {
          try {
            if (toast.parentElement) {
              toast.parentElement.removeChild(toast)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
        // También limpiar el contenedor de toasts si existe
        const toastContainer = document.getElementById('ubits-toast-container')
        if (toastContainer) {
          try {
            toastContainer.innerHTML = ''
          } catch (e) {
            // Ignorar errores
          }
        }
      }
      
      // Limpiar alerts si no es la historia de alert
      if (!isAlertStory) {
        const alerts = document.querySelectorAll('.ubits-alert')
        alerts.forEach((alert) => {
          try {
            if (alert.parentElement) {
              alert.parentElement.removeChild(alert)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar máscaras si no es la historia de mask
      if (!isMaskStory) {
        const maskOverlays = document.querySelectorAll('.ubits-mask-overlay')
        maskOverlays.forEach((overlay) => {
          try {
            // Cerrar la máscara antes de eliminarla para restaurar el body
            overlay.classList.remove('ubits-mask-overlay--open')
            // Solo restaurar estilos si la máscara estaba abierta
            if (overlay.classList.contains('ubits-mask-overlay--open')) {
              document.body.style.overflow = ''
              document.body.style.position = ''
              document.body.style.top = ''
              document.body.style.left = ''
              document.body.style.width = ''
              document.body.style.paddingRight = ''
            }
            
            if (overlay.parentElement) {
              overlay.parentElement.removeChild(overlay)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar progress bars si no es la historia de progress
      // También limpiar antes de renderizar para evitar duplicados cuando Storybook re-renderiza
      const progressBars = document.querySelectorAll('.ubits-progress-bar')
      if (progressBars.length > 0 && !isProgressStory) {
        progressBars.forEach((bar) => {
          try {
            // Solo limpiar si no está dentro de un contenedor de story válido
            const isInStoryContainer = bar.closest('[data-ubits-component="Progress"]') ||
                                       bar.closest('.sbdocs-preview') ||
                                       bar.closest('.docs-story')
            if (!isInStoryContainer && bar.parentElement) {
              bar.parentElement.removeChild(bar)
            } else if (!isInStoryContainer) {
              bar.remove()
            }
          } catch (e) {
            // Ignorar errores
          }
        })
      }
      
      // Limpiar button feedback si no es la historia de button feedback
      if (!isButtonFeedbackStory) {
        const feedbackButtons = document.querySelectorAll(
          '.ubits-button-feedback--bottom-right, .ubits-button-feedback--bottom-left, .ubits-button-feedback--top-right, .ubits-button-feedback--top-left'
        )
        feedbackButtons.forEach((button) => {
          try {
            if (button.parentElement) {
              button.parentElement.removeChild(button)
            }
          } catch (e) {
            // Ignorar errores
          }
        })
        
        // También limpiar modales de feedback
        const feedbackModals = document.querySelectorAll('.ubits-button-feedback-modal')
        feedbackModals.forEach((modal) => {
          const overlay = modal.closest('.ubits-modal-overlay')
          if (overlay && overlay.parentElement) {
            try {
              overlay.parentElement.removeChild(overlay)
            } catch (e) {
              // Ignorar errores
            }
          }
        })
      }
      
      // Determinar el color de fondo según el tema
      const bgColor = theme === 'dark' 
        ? 'var(--modifiers-normal-color-dark-bg-2)' 
        : 'var(--modifiers-normal-color-light-bg-2)'
      
      // Asegurar que el fondo del body sea diferente al sidebar
      document.body.style.backgroundColor = bgColor
      
      // Agregar CSS para el preview de Storybook con fondo según el tema
      const styleId = 'storybook-preview-theme-style'
      let style = document.getElementById(styleId) as HTMLStyleElement
      if (!style) {
        style = document.createElement('style')
        style.id = styleId
        document.head.appendChild(style)
      }
      
      style.textContent = `
        .sb-previewBlock {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
          border: none !important;
        }
        .sb-wrapper {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
        }
        #storybook-root {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'transparent'} !important;
        }
        /* Fondo para el preview en la documentación */
        .docs-story {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
        .sbdocs-preview {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
        .os-host {
          background: ${theme === 'dark' ? 'var(--modifiers-normal-color-dark-bg-2)' : 'var(--modifiers-normal-color-light-bg-2)'} !important;
        }
        /* Asegurar que el scroll funcione en los docs */
        .sbdocs-wrapper,
        .sbdocs-content,
        .os-viewport,
        .os-content {
          overflow: auto !important;
          overflow-x: hidden !important;
          height: auto !important;
          max-height: none !important;
        }
        body {
          overflow: auto !important;
          overflow-x: hidden !important;
        }
      `
      
      return story()
    },
  ],
}

export default preview

