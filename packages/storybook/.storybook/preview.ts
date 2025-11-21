import type { Preview } from '@storybook/html-vite'
import '../../tokens/dist/tokens.css'
import '../../tokens/dist/figma-tokens.css'
import '../../typography/fonts.css'
import '../../typography/tokens-typography.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../addons/avatar/src/styles/avatar.css'
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
import '../../addons/data-table/src/styles/data-table.css'
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
import '../../addons/menubar/src/styles/menubar.css'
import '../../addons/header-section/src/styles/header-section.css'
import '../../addons/status-tag/src/styles/status-tag.css'
import '../../components/button-ai/src/styles/button-ai.css'
import '../docs-site/.storybook/fontawesome-icons.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
      // Asegurar que el fondo del body sea diferente al sidebar
      document.body.style.backgroundColor = 'var(--ubits-bg-2)'
      
      // Agregar CSS para hacer transparente el contenedor de Storybook
      const style = document.createElement('style')
      style.textContent = `
        .sb-previewBlock {
          background: transparent !important;
          border: none !important;
        }
        .sb-wrapper {
          background: transparent !important;
        }
        #storybook-root {
          background: transparent !important;
        }
      `
      document.head.appendChild(style)
      
      // 🔍 DEBUGGING: Verificar tokens después de cargar
      // Esperar más tiempo para asegurar que todos los estilos se hayan cargado
      setTimeout(() => {
        const tokens = [
          'modifiers-normal-color-light-feedback-bg-success-subtle-default',
          'modifiers-normal-color-light-feedback-fg-success-subtle-default',
          'modifiers-normal-color-light-feedback-border-success',
          'modifiers-normal-color-light-feedback-bg-info-subtle-default',
          'modifiers-normal-color-light-feedback-fg-info-subtle-default',
          'modifiers-normal-color-light-feedback-border-info',
          'modifiers-normal-color-light-feedback-bg-warning-subtle-default',
          'modifiers-normal-color-light-feedback-fg-warning-subtle-default',
          'modifiers-normal-color-light-feedback-border-warning',
          'modifiers-normal-color-light-feedback-bg-error-subtle-default',
          'modifiers-normal-color-light-feedback-fg-error-subtle-default',
          'modifiers-normal-color-light-feedback-border-error',
          'modifiers-normal-color-light-bg-2',
          'modifiers-normal-color-light-fg-1-medium',
        ]
        
        const root = document.documentElement
        const computedStyle = getComputedStyle(root)
        
        let existsCount = 0
        let missingCount = 0
        
        console.log('🔍 DIAGNÓSTICO DE TOKENS EN STORYBOOK:')
        console.log('='.repeat(70))
        console.log(`\n📊 Verificando ${tokens.length} tokens de Alert...\n`)
        
        tokens.forEach(token => {
          const tokenName = `--${token}`
          const value = computedStyle.getPropertyValue(tokenName).trim()
          
          if (value) {
            existsCount++
            console.log(`✅ ${tokenName}: ${value}`)
          } else {
            missingCount++
            console.error(`❌ ${tokenName}: NO DEFINIDO`)
          }
        })
        
        console.log('\n' + '='.repeat(70))
        console.log(`\n📊 RESUMEN:`)
        console.log(`   ✅ Tokens existentes: ${existsCount}/${tokens.length}`)
        console.log(`   ❌ Tokens faltantes: ${missingCount}/${tokens.length}`)
        
        if (missingCount > 0) {
          console.error(`\n⚠️  PROBLEMA: ${missingCount} tokens no están disponibles`)
          console.log('\n🔧 POSIBLES SOLUCIONES:')
          console.log('   1. Verificar que figma-tokens.css esté cargado')
          console.log('   2. Verificar el orden de carga (figma-tokens.css debe ir ANTES)')
          console.log('   3. Verificar que el archivo exista en packages/tokens/dist/')
          console.log('   4. Limpiar caché del navegador')
        } else {
          console.log('\n✅ Todos los tokens están disponibles')
        }
        
        // Verificar si figma-tokens.css está cargado
        const stylesheets = Array.from(document.styleSheets)
        let figmaLoaded = false
        let figmaHref = null
        
        stylesheets.forEach(sheet => {
          try {
            if (sheet.href && (sheet.href.includes('figma-tokens.css') || sheet.href.includes('figma-tokens'))) {
              figmaLoaded = true
              figmaHref = sheet.href
            }
          } catch (e) {
            // Ignorar errores de CORS
          }
        })
        
        // También verificar si los tokens existen directamente en el DOM
        const testToken = '--modifiers-normal-color-light-feedback-bg-info-subtle-default'
        const testValue = computedStyle.getPropertyValue(testToken).trim()
        const tokenExists = testValue && testValue.length > 0
        
        console.log('\n' + '='.repeat(70))
        console.log(`\n📄 ESTILOS CARGADOS:`)
        console.log(`   figma-tokens.css (por href): ${figmaLoaded ? '✅ CARGADO' : '❌ NO CARGADO'}`)
        if (figmaHref) {
          console.log(`   Ruta: ${figmaHref}`)
        }
        console.log(`   Token de prueba existe: ${tokenExists ? '✅ SÍ' : '❌ NO'}`)
        if (tokenExists) {
          console.log(`   Valor del token: ${testValue}`)
        }
        
        // Listar todos los stylesheets para debugging
        console.log(`\n📋 TODOS LOS STYLESHEETS (${stylesheets.length}):`)
        let figmaFoundInInline = false
        stylesheets.forEach((sheet, idx) => {
          try {
            const href = sheet.href || '(inline)'
            console.log(`   ${idx + 1}. ${href.substring(0, 100)}`)
            
            // Si es inline, buscar el token en el contenido
            if (!sheet.href) {
              try {
                const rules = Array.from(sheet.cssRules || [])
                const hasFigmaToken = rules.some(rule => {
                  if (rule.style) {
                    const cssText = rule.cssText || ''
                    return cssText.includes('modifiers-normal-color-light-feedback-bg-info-subtle-default')
                  }
                  return false
                })
                if (hasFigmaToken) {
                  figmaFoundInInline = true
                  console.log(`      ⚠️  ¡Token encontrado en este stylesheet inline!`)
                }
              } catch (e) {
                // Ignorar errores de CORS
              }
            }
          } catch (e) {
            console.log(`   ${idx + 1}. (error al leer)`)
          }
        })
        
        if (figmaFoundInInline) {
          console.log(`\n✅ figma-tokens.css está cargado como inline (procesado por Vite)`)
        }
        
        // Verificar directamente en el DOM si el token existe
        console.log(`\n🔍 VERIFICACIÓN DIRECTA EN EL DOM:`)
        const testTokenName = '--modifiers-normal-color-light-feedback-bg-info-subtle-default'
        const directValue = window.getComputedStyle(document.documentElement).getPropertyValue(testTokenName)
        console.log(`   Token: ${testTokenName}`)
        console.log(`   Valor directo: ${directValue || 'NO DEFINIDO'}`)
        
        // Intentar leer desde el style tag si existe
        const styleTags = document.querySelectorAll('style')
        console.log(`   Style tags encontrados: ${styleTags.length}`)
        let foundInStyleTag = false
        styleTags.forEach((tag, idx) => {
          if (tag.textContent && tag.textContent.includes(testTokenName)) {
            foundInStyleTag = true
            const match = tag.textContent.match(new RegExp(`${testTokenName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*([^;]+)`))
            if (match) {
              console.log(`   ✅ Token encontrado en style tag #${idx + 1}: ${match[1].trim()}`)
            }
          }
        })
        
        if (!foundInStyleTag && !directValue) {
          console.error(`   ❌ Token NO encontrado en ningún style tag ni en el DOM`)
        }
        
        // Verificar en qué bloque están los tokens (si están en :root o en [data-theme="dark"])
        if (missingCount > 0) {
          console.log('\n🔍 VERIFICANDO ESTRUCTURA DE TOKENS:')
          const testToken = '--modifiers-normal-color-light-feedback-bg-info-subtle-default'
          const testValue = computedStyle.getPropertyValue(testToken).trim()
          
          if (!testValue) {
            console.log(`   Token de prueba: ${testToken}`)
            console.log(`   Valor: ${testValue || 'NO DEFINIDO'}`)
            console.log(`   Tema actual: ${theme}`)
            console.log(`   data-theme en body: ${document.body.getAttribute('data-theme')}`)
            console.log(`   data-theme en html: ${document.documentElement.getAttribute('data-theme')}`)
          }
        }
      }, 500) // Esperar 500ms para que los estilos se carguen
      
      return story()
    },
  ],
}

export default preview

