import type { Meta, StoryObj } from '@storybook/html';
import { renderButton, createButton } from '../../components/button/src/ButtonProvider';
import type { ButtonOptions } from '../../components/button/src/types/ButtonOptions';
import { renderSpinner } from '../../components/spinner/src/SpinnerProvider';
import '../../components/button/src/styles/button.css';
import '../../components/tooltip/src/styles/tooltip.css';

const meta: Meta<ButtonOptions> = {
  title: 'Básicos/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Button UBITS con múltiples variantes, tamaños y estados. Soporta iconos, badges y estado de carga.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Variante del botón',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'Texto del botón',
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'check, plus, times, etc.' },
      },
    },
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'only'],
      description: 'Posición del icono',
      table: {
        defaultValue: { summary: 'left' },
        type: { summary: 'left | right | only' },
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Mostrar solo el icono, sin texto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el botón',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Estado de carga (muestra spinner)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    badge: {
      control: { type: 'boolean' },
      description: 'Mostrar badge de notificación',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description: 'Modificador active/outline (fondo transparente + overlay azul). IMPORTANTE: Esto es diferente del estado "active" del controlador de estados (que simula "pressed")',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    floating: {
      control: { type: 'boolean' },
      description: 'Modificador floating (botón flotante con sombra del sistema de diseño)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Ancho completo',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    block: {
      control: { type: 'boolean' },
      description: 'Display block',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    dropdown: {
      control: { type: 'boolean' },
      description: 'Activar funcionalidad dropdown (muestra lista al hacer click)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Mostrar tooltip al hacer hover (solo para botones icon-only)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Tooltip',
      },
    },
    tooltipText: {
      control: { type: 'text' },
      description: 'Texto del tooltip (solo para botones icon-only)',
      table: {
        type: { summary: 'string' },
        category: 'Tooltip',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón de ejemplo',
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
    iconOnly: false,
    disabled: false,
    loading: false,
    badge: false,
    active: false,
    floating: false,
    fullWidth: false,
    block: false,
    dropdown: false,
    dropdownOptions: [
      { label: 'Opción 1', value: 'opt1' },
      { label: 'Opción 2', value: 'opt2' },
      { label: 'Opción 3', value: 'opt3' },
    ],
    showTooltip: false,
    tooltipText: 'Tooltip del botón',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'flex-start';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2), #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    // Convertir iconPosition 'only' a iconOnly para compatibilidad
    const buttonArgs = {
      ...args,
      iconOnly: args.iconPosition === 'only' || args.iconOnly,
      iconPosition: args.iconPosition === 'only' ? 'left' : args.iconPosition
    };

    // Si dropdown está activo, usar createButton para inicializar la funcionalidad
    if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.position = 'relative';
      buttonWrapper.style.display = 'inline-block';
      
      requestAnimationFrame(() => {
        try {
          const button = createButton(buttonArgs);
          // createButton con dropdown retorna el botón dentro de un div wrapper
          const parent = button.parentElement;
          
          // Función helper para aplicar estilos active
          const applyActiveStyles = (btn: HTMLButtonElement) => {
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = '${bgActiveButton}, ${bg1}';
              btn.style.setProperty('background', backgroundValue, 'important');
              btn.style.setProperty('border', 'none', 'important');
              btn.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              
              const spans = btn.querySelectorAll('span');
              spans.forEach((span) => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              
              const icons = btn.querySelectorAll('i');
              icons.forEach((icon) => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
            }
          };
          
          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          if (buttonArgs.active || args.active) {
            button.classList.add('ubits-button--active');
          }
          
          if (parent) {
            buttonWrapper.appendChild(parent);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          } else {
            buttonWrapper.appendChild(button);
            applyActiveStyles(button);
            // Aplicar tooltip UBITS si es necesario
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          }
        } catch (error) {
          buttonWrapper.innerHTML = renderButton(buttonArgs);
          // Aplicar tooltip UBITS y estado visual si es necesario
          const button = buttonWrapper.querySelector('button') as HTMLButtonElement;
          if (button) {
            // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
            if (buttonArgs.active || args.active) {
              button.classList.add('ubits-button--active');
            }
            if (buttonArgs.active || args.active) {
              // Aplicar fondo active con múltiples capas
              const root = document.documentElement;
              const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
              const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || '#ffffff';
              const backgroundValue = `${bgActiveButton}, ${bg1}`;
              button.style.setProperty('background', backgroundValue, 'important');
              button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
              button.style.setProperty('border', 'none', 'important');
              const spans = button.querySelectorAll('span');
              spans.forEach(span => {
                span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
              const icons = button.querySelectorAll('i');
              icons.forEach(icon => {
                icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
              });
            }
            if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
              applyUBITSTooltip(button, buttonArgs.tooltipText);
            }
          }
        }
      });
      
      preview.appendChild(buttonWrapper);
    } else {
      // Sin dropdown, usar renderButton normalmente
      const buttonHTML = renderButton(buttonArgs);
      
      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = buttonHTML;
      preview.appendChild(buttonContainer);
      
      // Aplicar estado visual si se especifica
      requestAnimationFrame(() => {
        const button = buttonContainer.querySelector('button') as HTMLButtonElement;
        if (button) {
          // Intentar agregar la clase manualmente si no está (para floating)
          if (buttonArgs.floating && !button.classList.contains('ubits-button--floating')) {
            button.classList.add('ubits-button--floating');
          }

          // IMPORTANTE: Si active es true, agregar la clase ubits-button--active
          const hasActiveFromRender = button.classList.contains('ubits-button--active');
          
          // Si active es true pero no tiene la clase, agregarla
          if ((buttonArgs.active || args.active) && !hasActiveFromRender) {
            button.classList.add('ubits-button--active');
          }
          
          // Verificar si tiene la clase active después de verificar
          const hasActiveClass = button.classList.contains('ubits-button--active');
          
          // Si el botón está en estado active, asegurar color azul desde el inicio
          if (buttonArgs.active || args.active || hasActiveClass) {
            // Asegurar fondo active con múltiples capas: bg-active-button sobre bg1
            const root = document.documentElement;
            const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
            const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || 'var(--modifiers-normal-color-light-bg-1)';
            const backgroundValue = `${bgActiveButton}, ${bg1}`;
            
            // Usar setProperty con !important para asegurar que se aplique
            button.style.setProperty('background', backgroundValue, 'important');
            button.style.setProperty('border', 'none', 'important');
            button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
            
            const spans = button.querySelectorAll('span');
            spans.forEach((span) => {
              span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
            
            const icons = button.querySelectorAll('i');
            icons.forEach((icon) => {
              icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
            });
          }
          
          // Aplicar tooltip UBITS si es necesario
          if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
        }
      });
    }
    
    container.appendChild(preview);
    
    return container;
  },
};

// Función helper eliminada - el controlador de state fue removido
// La función applyButtonState fue completamente removida

// Función helper para aplicar tooltip UBITS a botones icon-only
function applyUBITSTooltip(button: HTMLButtonElement, tooltipText: string): void {
  // Remover tooltip anterior si existe
  const existingTooltipId = button.dataset.tooltipInstance;
  if (existingTooltipId) {
    const existingTooltip = document.getElementById(existingTooltipId);
    if (existingTooltip) {
      existingTooltip.remove();
    }
    delete button.dataset.tooltipInstance;
  }
  
  // Remover listeners anteriores
  const oldMouseEnter = (button as any)._tooltipMouseEnter;
  const oldMouseLeave = (button as any)._tooltipMouseLeave;
  if (oldMouseEnter) {
    button.removeEventListener('mouseenter', oldMouseEnter);
    delete (button as any)._tooltipMouseEnter;
  }
  if (oldMouseLeave) {
    button.removeEventListener('mouseleave', oldMouseLeave);
    delete (button as any)._tooltipMouseLeave;
  }
  
  // Remover atributo title nativo si existe
  if (button.hasAttribute('title')) {
    button.removeAttribute('title');
  }
  
  // Crear tooltip HTML
  const tooltipId = `button-tooltip-${Math.random().toString(36).substr(2, 9)}`;
  const escapedText = tooltipText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  
  const tooltipHTML = `
    <div class="ubits-tooltip ubits-tooltip--tail-bottom" id="${tooltipId}" style="position: fixed; z-index: 10000; opacity: 0; visibility: hidden; display: none; width: auto; min-width: fit-content; max-width: 240px;">
      <div class="ubits-tooltip__tail" style="left: 50%;">
        <div class="ubits-tooltip__tail-inner"></div>
      </div>
      <div class="ubits-tooltip__content" style="width: auto; min-width: fit-content;">
        <div class="ubits-tooltip__body" style="white-space: nowrap;">
          <div class="ubits-tooltip__body-content">
            <p class="ubits-body-md" style="margin: 0; white-space: nowrap;">${escapedText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Crear wrapper para parsear HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = tooltipHTML;
  const tooltipElement = wrapper.firstElementChild as HTMLElement;
  
  if (tooltipElement) {
    // Agregar al body
    document.body.appendChild(tooltipElement);
    
    // Función para mostrar tooltip
    const showTooltip = () => {
      const buttonRect = button.getBoundingClientRect();
      
      // Calcular posición: tooltip arriba del botón (tail apunta hacia abajo)
      tooltipElement.style.top = '-9999px';
      tooltipElement.style.left = '0';
      tooltipElement.style.transform = 'none';
      tooltipElement.style.visibility = 'visible';
      tooltipElement.style.opacity = '0';
      tooltipElement.style.display = 'block';
      tooltipElement.classList.add('ubits-tooltip--open');
      
      // Forzar reflow para calcular dimensiones
      void tooltipElement.offsetHeight;
      
      const tooltipRect = tooltipElement.getBoundingClientRect();
      const tooltipHeight = tooltipRect.height;
      
      // Calcular posición final
      const top = buttonRect.top - tooltipHeight - 9; // 9px es la altura del tail
      const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
      const tooltipWidth = tooltipRect.width;
      const left = buttonCenterX - (tooltipWidth / 2); // Centrar el tooltip sobre el botón
      
      tooltipElement.style.top = `${top}px`;
      tooltipElement.style.left = `${left}px`;
      tooltipElement.style.transform = 'none'; // No usar translateX ya que calculamos left directamente
      tooltipElement.style.display = 'block';
      tooltipElement.style.visibility = 'visible';
      tooltipElement.style.opacity = '1';
      tooltipElement.style.transition = 'none'; // Sin transición para aparición inmediata
      
      // Restaurar transición después de un breve momento
      setTimeout(() => {
        tooltipElement.style.transition = '';
      }, 50);
    };
    
    // Función para ocultar tooltip
    const hideTooltip = () => {
      tooltipElement.classList.remove('ubits-tooltip--open');
      tooltipElement.style.opacity = '0';
      tooltipElement.style.visibility = 'hidden';
      tooltipElement.style.display = 'none';
    };
    
    // Agregar eventos
    const mouseEnterHandler = (e: Event) => {
      e.stopPropagation();
      showTooltip();
    };
    
    const mouseLeaveHandler = (e: Event) => {
      e.stopPropagation();
      hideTooltip();
    };
    
    button.addEventListener('mouseenter', mouseEnterHandler, false);
    button.addEventListener('mouseleave', mouseLeaveHandler, false);
    
    // Guardar referencias para poder limpiarlas después
    (button as any)._tooltipMouseEnter = mouseEnterHandler;
    (button as any)._tooltipMouseLeave = mouseLeaveHandler;
    button.dataset.tooltipInstance = tooltipId;
  }
};

// Story específica para mostrar estado Active
export const ActiveState: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Active',
    active: true,
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1), #ffffff)';
    container.style.borderRadius = '8px';
    
    const title = document.createElement('h3');
    title.textContent = 'Estado Active - Con nuevo fondo bg-active-button y texto accent-brand';
    title.style.marginBottom = '24px';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high, #303a47)';
    container.appendChild(title);
    
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '16px';
    grid.style.marginBottom = '32px';
    
    // Primary Active
    const primaryContainer = document.createElement('div');
    primaryContainer.style.display = 'flex';
    primaryContainer.style.flexDirection = 'column';
    primaryContainer.style.gap = '8px';
    const primaryLabel = document.createElement('label');
    primaryLabel.textContent = 'Primary Active';
    primaryLabel.style.fontSize = '14px';
    primaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    primaryLabel.style.fontWeight = '500';
    primaryContainer.appendChild(primaryLabel);
    primaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'primary',
      active: true,
      text: 'Primary Active',
    });
    grid.appendChild(primaryContainer);
    
    // Secondary Active
    const secondaryContainer = document.createElement('div');
    secondaryContainer.style.display = 'flex';
    secondaryContainer.style.flexDirection = 'column';
    secondaryContainer.style.gap = '8px';
    const secondaryLabel = document.createElement('label');
    secondaryLabel.textContent = 'Secondary Active';
    secondaryLabel.style.fontSize = '14px';
    secondaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    secondaryLabel.style.fontWeight = '500';
    secondaryContainer.appendChild(secondaryLabel);
    secondaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'secondary',
      active: true,
      text: 'Secondary Active',
    });
    grid.appendChild(secondaryContainer);
    
    // Tertiary Active
    const tertiaryContainer = document.createElement('div');
    tertiaryContainer.style.display = 'flex';
    tertiaryContainer.style.flexDirection = 'column';
    tertiaryContainer.style.gap = '8px';
    const tertiaryLabel = document.createElement('label');
    tertiaryLabel.textContent = 'Tertiary Active';
    tertiaryLabel.style.fontSize = '14px';
    tertiaryLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    tertiaryLabel.style.fontWeight = '500';
    tertiaryContainer.appendChild(tertiaryLabel);
    tertiaryContainer.innerHTML += renderButton({
      ...args,
      variant: 'tertiary',
      active: true,
      text: 'Tertiary Active',
    });
    grid.appendChild(tertiaryContainer);
    
    container.appendChild(grid);
    
    // Información sobre el estilo
    const info = document.createElement('div');
    info.style.padding = '16px';
    info.style.background = 'var(--modifiers-normal-color-light-bg-2), #f3f3f4)';
    info.style.borderRadius = '8px';
    info.style.marginTop = '24px';
    info.innerHTML = `
      <p style="margin: 0 0 8px 0; color: var(--modifiers-normal-color-light-fg-1-high, #303a47); font-weight: 600;">Estilo Active:</p>
      <ul style="margin: 0; padding-left: 20px; color: var(--modifiers-normal-color-light-fg-1-medium, #5c646f);">
        <li>Fondo: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-active-button)</code> sobre <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-bg-1)</code></li>
        <li>Texto: <code style="background: var(--modifiers-normal-color-light-bg-2); padding: 2px 6px; border-radius: 4px;">var(--modifiers-normal-color-light-accent-brand)</code> (usa token accent-brand según tema)</li>
        <li>Sin borde</li>
      </ul>
    `;
    container.appendChild(info);
    
    return container;
  },
};

// Helper para renderizar Button de manera consistente
function renderButtonStory(options: Partial<ButtonOptions>) {
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.borderRadius = '8px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.justifyContent = 'center';
  preview.style.alignItems = 'flex-start';
  preview.style.padding = '40px';
  preview.style.minHeight = '120px';
  preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  preview.style.borderRadius = '8px';
  preview.style.marginBottom = '20px';
  preview.style.position = 'relative';
  
  const buttonArgs = {
    ...options,
    iconOnly: options.iconPosition === 'only' || options.iconOnly,
    iconPosition: options.iconPosition === 'only' ? 'left' : options.iconPosition
  };

  if (buttonArgs.dropdown && buttonArgs.dropdownOptions && buttonArgs.dropdownOptions.length > 0) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.position = 'relative';
    buttonWrapper.style.display = 'inline-block';
    
    requestAnimationFrame(() => {
      try {
        const button = createButton(buttonArgs);
        const parent = button.parentElement;
        
        if (buttonArgs.active) {
          button.classList.add('ubits-button--active');
        }
        
        if (parent) {
          buttonWrapper.appendChild(parent);
        } else {
          buttonWrapper.appendChild(button);
        }
        
        if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
          applyUBITSTooltip(button, buttonArgs.tooltipText);
        }
      } catch (error) {
        buttonWrapper.innerHTML = renderButton(buttonArgs);
        const button = buttonWrapper.querySelector('button') as HTMLButtonElement;
        if (button) {
          if (buttonArgs.active) {
            button.classList.add('ubits-button--active');
          }
          if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
            applyUBITSTooltip(button, buttonArgs.tooltipText);
          }
        }
      }
    });
    
    preview.appendChild(buttonWrapper);
  } else {
    const buttonHTML = renderButton(buttonArgs);
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = buttonHTML;
    preview.appendChild(buttonContainer);
    
    requestAnimationFrame(() => {
      const button = buttonContainer.querySelector('button') as HTMLButtonElement;
      if (button) {
        if (buttonArgs.floating && !button.classList.contains('ubits-button--floating')) {
          button.classList.add('ubits-button--floating');
        }
        
        if (buttonArgs.active && !button.classList.contains('ubits-button--active')) {
          button.classList.add('ubits-button--active');
        }
        
        if (buttonArgs.active) {
          const root = document.documentElement;
          const bgActiveButton = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-active-button').trim() || 'var(--modifiers-normal-color-light-bg-active-button)';
          const bg1 = getComputedStyle(root).getPropertyValue('--modifiers-normal-color-light-bg-1').trim() || 'var(--modifiers-normal-color-light-bg-1)';
          const backgroundValue = `${bgActiveButton}, ${bg1}`;
          
          button.style.setProperty('background', backgroundValue, 'important');
          button.style.setProperty('border', 'none', 'important');
          button.style.setProperty('color', 'var(--modifiers-normal-color-light-accent-brand)', 'important');
          
          const spans = button.querySelectorAll('span');
          spans.forEach((span) => {
            span.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
          });
          
          const icons = button.querySelectorAll('i');
          icons.forEach((icon) => {
            icon.style.color = 'var(--modifiers-normal-color-light-accent-brand)';
          });
        }
        
        if (buttonArgs.iconOnly && buttonArgs.showTooltip && buttonArgs.tooltipText) {
          applyUBITSTooltip(button, buttonArgs.tooltipText);
        }
      }
    });
  }
  
  container.appendChild(preview);
  return container;
}

/**
 * VariantPrimary
 * Botón variante primary
 */
export const VariantPrimary: Story = {
  name: 'Variant - Primary',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Primary',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón variante primary.',
      },
    },
  },
};

/**
 * VariantSecondary
 * Botón variante secondary
 */
export const VariantSecondary: Story = {
  name: 'Variant - Secondary',
  args: {
    variant: 'secondary',
    size: 'md',
    text: 'Botón Secondary',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón variante secondary.',
      },
    },
  },
};

/**
 * VariantTertiary
 * Botón variante tertiary
 */
export const VariantTertiary: Story = {
  name: 'Variant - Tertiary',
  args: {
    variant: 'tertiary',
    size: 'md',
    text: 'Botón Tertiary',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón variante tertiary.',
      },
    },
  },
};

/**
 * SizeXS
 * Botón tamaño extra small
 */
export const SizeXS: Story = {
  name: 'Size - XS',
  args: {
    variant: 'primary',
    size: 'xs',
    text: 'Botón XS',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón tamaño extra small.',
      },
    },
  },
};

/**
 * SizeSM
 * Botón tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    variant: 'primary',
    size: 'sm',
    text: 'Botón SM',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Botón tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón MD',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Botón tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    variant: 'primary',
    size: 'lg',
    text: 'Botón LG',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón tamaño large.',
      },
    },
  },
};

/**
 * SizeXL
 * Botón tamaño extra large
 */
export const SizeXL: Story = {
  name: 'Size - XL',
  args: {
    variant: 'primary',
    size: 'xl',
    text: 'Botón XL',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón tamaño extra large.',
      },
    },
  },
};

/**
 * WithIconLeft
 * Botón con icono a la izquierda
 */
export const WithIconLeft: Story = {
  name: 'With Icon - Left',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón con icono',
    icon: 'check',
    iconStyle: 'regular',
    iconPosition: 'left',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con icono a la izquierda del texto.',
      },
    },
  },
};

/**
 * WithIconRight
 * Botón con icono a la derecha
 */
export const WithIconRight: Story = {
  name: 'With Icon - Right',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón con icono',
    icon: 'arrow-right',
    iconStyle: 'regular',
    iconPosition: 'right',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con icono a la derecha del texto.',
      },
    },
  },
};

/**
 * IconOnly
 * Botón solo icono (sin texto)
 */
export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    variant: 'primary',
    size: 'md',
    icon: 'plus',
    iconStyle: 'regular',
    iconOnly: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón solo icono, sin texto.',
      },
    },
  },
};

/**
 * IconStyleRegular
 * Icono estilo regular (far)
 */
export const IconStyleRegular: Story = {
  name: 'Icon Style - Regular',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón con icono',
    icon: 'user',
    iconStyle: 'regular',
    iconPosition: 'left',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con icono estilo regular (far).',
      },
    },
  },
};

/**
 * IconStyleSolid
 * Icono estilo solid (fas)
 */
export const IconStyleSolid: Story = {
  name: 'Icon Style - Solid',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón con icono',
    icon: 'user',
    iconStyle: 'solid',
    iconPosition: 'left',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con icono estilo solid (fas).',
      },
    },
  },
};

/**
 * Disabled
 * Botón deshabilitado
 */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón deshabilitado',
    disabled: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón deshabilitado.',
      },
    },
  },
};

/**
 * Loading
 * Botón en estado de carga (con spinner)
 */
export const Loading: Story = {
  name: 'Loading',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Cargando...',
    loading: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón en estado de carga con spinner.',
      },
    },
  },
};

/**
 * LoadingWithText
 * Botón loading con texto personalizado
 */
export const LoadingWithText: Story = {
  name: 'Loading With Text',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Guardar',
    loading: true,
    loadingText: 'Guardando...',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón loading con texto personalizado.',
      },
    },
  },
};

/**
 * WithBadge
 * Botón con badge de notificación
 */
export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Notificaciones',
    badge: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con badge de notificación.',
      },
    },
  },
};

/**
 * Active
 * Botón con estado active
 */
export const Active: Story = {
  name: 'Active',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Active',
    active: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con estado active (fondo transparente + overlay azul).',
      },
    },
  },
};

/**
 * Floating
 * Botón flotante con sombra
 */
export const Floating: Story = {
  name: 'Floating',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Flotante',
    floating: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón flotante con sombra del sistema de diseño.',
      },
    },
  },
};

/**
 * FullWidth
 * Botón ancho completo
 */
export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Ancho Completo',
    fullWidth: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con ancho completo.',
      },
    },
  },
};

/**
 * Block
 * Botón display block
 */
export const Block: Story = {
  name: 'Block',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón Block',
    block: true,
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con display block.',
      },
    },
  },
};

/**
 * WithDropdown
 * Botón con dropdown
 */
export const WithDropdown: Story = {
  name: 'With Dropdown',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Menú',
    dropdown: true,
    dropdownOptions: [
      { label: 'Opción 1', value: 'opt1' },
      { label: 'Opción 2', value: 'opt2' },
      { label: 'Opción 3', value: 'opt3' },
    ],
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón con funcionalidad dropdown que muestra una lista al hacer click.',
      },
    },
  },
};

/**
 * DropdownWithOptions
 * Botón dropdown con opciones personalizadas
 */
export const DropdownWithOptions: Story = {
  name: 'Dropdown With Options',
  args: {
    variant: 'secondary',
    size: 'md',
    text: 'Acciones',
    icon: 'ellipsis-v',
    iconPosition: 'left',
    dropdown: true,
    dropdownOptions: [
      { label: 'Editar', value: 'edit', onClick: () => alert('Editar clickeado') },
      { label: 'Eliminar', value: 'delete', onClick: () => alert('Eliminar clickeado') },
      { label: 'Compartir', value: 'share', onClick: () => alert('Compartir clickeado') },
    ],
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón dropdown con opciones personalizadas y callbacks.',
      },
    },
  },
};

/**
 * IconOnlyWithTooltip
 * Botón icon-only con tooltip
 */
export const IconOnlyWithTooltip: Story = {
  name: 'Icon Only With Tooltip',
  args: {
    variant: 'secondary',
    size: 'md',
    icon: 'info-circle',
    iconStyle: 'regular',
    iconOnly: true,
    showTooltip: true,
    tooltipText: 'Información adicional',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón icon-only con tooltip que se muestra al hacer hover.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Botón con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Haz clic aquí',
  },
  render: (args) => {
    const options: Partial<ButtonOptions> = {
      ...args,
      onClick: () => {
        alert('Botón clickeado');
        console.log('Button clicked');
      }
    };
    return renderButtonStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón con callback onClick que se ejecuta cuando se hace clic.',
      },
    },
  },
};

/**
 * AllVariants
 * Todas las variantes
 */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const variants: Array<ButtonOptions['variant']> = ['primary', 'secondary', 'tertiary'];
    
    variants.forEach(variant => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.flexDirection = 'column';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = variant || 'default';
      
      buttonContainer.innerHTML = renderButton({
        ...args,
        variant: variant
      } as ButtonOptions);
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes disponibles (primary, secondary, tertiary).',
      },
    },
  },
};

/**
 * AllSizes
 * Todos los tamaños
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.flexWrap = 'wrap';
    
    const sizes: Array<ButtonOptions['size']> = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.flexDirection = 'column';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '8px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.textContent = size?.toUpperCase() || 'default';
      
      buttonContainer.innerHTML = renderButton({
        ...args,
        size: size
      } as ButtonOptions);
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (xs, sm, md, lg, xl).',
      },
    },
  },
};

/**
 * AllIconPositions
 * Todas las posiciones de icono
 */
export const AllIconPositions: Story = {
  name: 'All Icon Positions',
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Botón',
    icon: 'check',
    iconStyle: 'regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.flexDirection = 'column';
    preview.style.gap = '16px';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const positions: Array<'left' | 'right'> = ['left', 'right'];
    
    positions.forEach(position => {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.alignItems = 'center';
      buttonContainer.style.gap = '12px';
      
      const label = document.createElement('div');
      label.style.fontSize = '12px';
      label.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
      label.style.minWidth = '80px';
      label.textContent = `Icon ${position}:`;
      
      buttonContainer.innerHTML = renderButton({
        ...args,
        iconPosition: position
      } as ButtonOptions);
      
      buttonContainer.insertBefore(label, buttonContainer.firstChild);
      preview.appendChild(buttonContainer);
    });
    
    const iconOnlyContainer = document.createElement('div');
    iconOnlyContainer.style.display = 'flex';
    iconOnlyContainer.style.alignItems = 'center';
    iconOnlyContainer.style.gap = '12px';
    
    const iconOnlyLabel = document.createElement('div');
    iconOnlyLabel.style.fontSize = '12px';
    iconOnlyLabel.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    iconOnlyLabel.style.minWidth = '80px';
    iconOnlyLabel.textContent = 'Icon only:';
    
    iconOnlyContainer.innerHTML = renderButton({
      ...args,
      iconOnly: true
    } as ButtonOptions);
    
    iconOnlyContainer.insertBefore(iconOnlyLabel, iconOnlyContainer.firstChild);
    preview.appendChild(iconOnlyContainer);
    
    container.appendChild(preview);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todas las posiciones de icono disponibles (left, right, icon-only).',
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
    variant: 'primary',
    size: 'md',
    text: 'Botón Completo',
    icon: 'save',
    iconStyle: 'regular',
    iconPosition: 'left',
    badge: true,
    active: false,
    floating: false,
    fullWidth: false,
    block: false,
  },
  render: (args) => {
    const options: Partial<ButtonOptions> = {
      ...args,
      onClick: () => {
        console.log('Button clicked');
      }
    };
    return renderButtonStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón completo con todas las opciones: variante, tamaño, texto, icono, badge y callback onClick.',
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
    variant: 'primary',
    size: 'md',
    text: 'Botón',
  },
  render: (args) => renderButtonStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Botón mínimo con solo variante, tamaño y texto.',
      },
    },
  },
};
