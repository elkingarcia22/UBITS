import type { Meta, StoryObj } from '@storybook/html';
import { renderBadge } from '../../addons/badge/src/BadgeProvider';
import type { BadgeOptions } from '../../addons/badge/src/types/BadgeOptions';

const meta: Meta<BadgeOptions> = {
  title: 'Básicos/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['dot', 'number'],
      description: 'Tipo de badge: solo bolita o con número',
      table: {
        defaultValue: { summary: 'number' },
        type: { summary: 'dot | number' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
      description: 'Variante de color del badge',
      table: {
        defaultValue: { summary: 'error' },
        type: { summary: 'success | warning | error | info' },
      },
    },
    style: {
      control: { type: 'select' },
      options: ['light', 'neutral', 'bold'],
      description: 'Estilo del badge: light (sin borde), neutral (con borde gris) o bold (fondo de color)',
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'light | neutral | bold' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del badge',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    content: {
      control: { type: 'text' },
      description: 'Contenido del badge (número o texto, solo para tipo number)',
    },
    absolute: {
      control: { type: 'boolean' },
      description: 'Usar posición absoluta',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Posición cuando es absoluto',
      table: {
        defaultValue: { summary: 'top-right' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar el label',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del label que aparece a la derecha del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    labelTypography: {
      control: { type: 'select' },
      options: [
        'ubits-body-sm-regular',
        'ubits-body-sm-semibold',
        'ubits-body-sm-bold',
        'ubits-body-md-regular',
        'ubits-body-md-semibold',
        'ubits-body-md-bold',
        'ubits-heading-h1',
        'ubits-heading-h2'
      ],
      description: 'Clase de tipografía UBITS para el label',
      table: {
        defaultValue: { summary: 'ubits-body-md-regular' },
        type: { summary: 'ubits-body-sm-regular | ubits-body-sm-semibold | ubits-body-sm-bold | ubits-body-md-regular | ubits-body-md-semibold | ubits-body-md-bold | ubits-heading-h1 | ubits-heading-h2' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BadgeOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'number',
    variant: 'error',
    style: 'light',
    size: 'md',
    content: '5',
    absolute: false,
    position: 'top-right',
    showLabel: false,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    const badgeContainer = document.createElement('div');
    badgeContainer.style.display = 'inline-flex';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.gap = '16px';
    badgeContainer.style.fontSize = '16px';
    badgeContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high, #303a47)';
    
    // Mostrar badge standalone
    badgeContainer.innerHTML = renderBadge(args);
    
    // Si es absoluto, necesitamos un contenedor relativo
    if (args.absolute) {
      const relativeContainer = document.createElement('div');
      relativeContainer.style.position = 'relative';
      relativeContainer.style.display = 'inline-block';
      relativeContainer.style.padding = '20px';
      relativeContainer.style.background = 'var(--modifiers-normal-color-light-bg-1)';
      relativeContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
      relativeContainer.style.borderRadius = '8px';
      relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
      relativeContainer.innerHTML += renderBadge(args);
      badgeContainer.innerHTML = '';
      badgeContainer.appendChild(relativeContainer);
    }
    
    preview.appendChild(badgeContainer);
    container.appendChild(preview);
    
    // Logs de debug para badge error en dark mode y centrado en bold
    setTimeout(() => {
      const badges = container.querySelectorAll('.ubits-badge');
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      const isBold = args.style === 'bold';
      
      console.log('🔍 DEBUG Badge - Análisis completo:');
      console.log('  - Dark mode activo:', isDarkMode);
      console.log('  - Style:', args.style);
      console.log('  - Is Bold:', isBold);
      console.log('  - Badges encontrados:', badges.length);
      
      badges.forEach((badge, index) => {
        const computedStyle = window.getComputedStyle(badge);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        const classes = badge.className;
        
        console.log(`\n  📦 Badge ${index + 1}:`);
        console.log(`    - Classes: ${classes}`);
        console.log(`    - Color aplicado: ${color}`);
        console.log(`    - Background: ${backgroundColor}`);
        console.log(`    - HTML interno:`, badge.innerHTML);
        
        // Verificar elementos internos (dot, number-text, etc.)
        const dotNumber = badge.querySelector('.ubits-badge__dot--number');
        const numberText = badge.querySelector('.ubits-badge__number-text');
        const innerSpan = badge.querySelector('span:not(.ubits-badge__dot)');
        const allSpans = badge.querySelectorAll('span');
        
        console.log(`    - Elementos internos:`);
        console.log(`      - .ubits-badge__dot--number: ${dotNumber ? 'ENCONTRADO' : 'NO'}`);
        console.log(`      - .ubits-badge__number-text: ${numberText ? 'ENCONTRADO' : 'NO'}`);
        console.log(`      - span interno: ${innerSpan ? 'ENCONTRADO' : 'NO'}`);
        
        // Si es bold y tiene dot--number, analizar centrado
        if (isBold && dotNumber) {
          const dotComputed = window.getComputedStyle(dotNumber);
          const dotRect = dotNumber.getBoundingClientRect();
          const dotInlineStyle = dotNumber.getAttribute('style');
          
          console.log(`\n    🎯 DEBUG CENTRADO BOLD:`);
          console.log(`      - Dot inline style:`, dotInlineStyle);
          console.log(`      - Dot computed styles:`);
          console.log(`        - width: ${dotComputed.width} (${dotRect.width}px)`);
          console.log(`        - height: ${dotComputed.height} (${dotRect.height}px)`);
          console.log(`        - display: ${dotComputed.display}`);
          console.log(`        - align-items: ${dotComputed.alignItems}`);
          console.log(`        - justify-content: ${dotComputed.justifyContent}`);
          console.log(`        - line-height: ${dotComputed.lineHeight}`);
          console.log(`        - padding: ${dotComputed.padding}`);
          console.log(`        - margin: ${dotComputed.margin}`);
          console.log(`        - box-sizing: ${dotComputed.boxSizing}`);
          console.log(`        - text-align: ${dotComputed.textAlign}`);
          console.log(`        - vertical-align: ${dotComputed.verticalAlign}`);
          console.log(`        - font-size: ${dotComputed.fontSize}`);
          console.log(`        - font-weight: ${dotComputed.fontWeight}`);
          console.log(`      - Dot position:`);
          console.log(`        - top: ${dotRect.top}px`);
          console.log(`        - left: ${dotRect.left}px`);
          console.log(`        - width: ${dotRect.width}px`);
          console.log(`        - height: ${dotRect.height}px`);
          
          // Analizar contenido del dot (el número)
          const dotContent = dotNumber.textContent || dotNumber.innerText;
          const dotChildren = dotNumber.children;
          
          console.log(`      - Contenido del dot:`);
          console.log(`        - textContent: "${dotContent}"`);
          console.log(`        - innerHTML: ${dotNumber.innerHTML}`);
          console.log(`        - children count: ${dotChildren.length}`);
          
          if (dotChildren.length > 0) {
            Array.from(dotChildren).forEach((child, childIndex) => {
              const childComputed = window.getComputedStyle(child as Element);
              const childRect = (child as Element).getBoundingClientRect();
              console.log(`        - Child ${childIndex + 1} (${(child as Element).tagName}):`);
              console.log(`          - textContent: "${(child as Element).textContent}"`);
              console.log(`          - inline style: ${(child as Element).getAttribute('style')}`);
              console.log(`          - computed styles:`);
              console.log(`            - display: ${childComputed.display}`);
              console.log(`            - line-height: ${childComputed.lineHeight}`);
              console.log(`            - margin: ${childComputed.margin}`);
              console.log(`            - padding: ${childComputed.padding}`);
              console.log(`            - vertical-align: ${childComputed.verticalAlign}`);
              console.log(`            - font-size: ${childComputed.fontSize}`);
              console.log(`            - font-weight: ${childComputed.fontWeight}`);
              console.log(`          - position:`);
              console.log(`            - top: ${childRect.top}px`);
              console.log(`            - left: ${childRect.left}px`);
              console.log(`            - width: ${childRect.width}px`);
              console.log(`            - height: ${childRect.height}px`);
              
              // Calcular offset desde el centro del dot
              const dotCenterX = dotRect.left + dotRect.width / 2;
              const dotCenterY = dotRect.top + dotRect.height / 2;
              const childCenterX = childRect.left + childRect.width / 2;
              const childCenterY = childRect.top + childRect.height / 2;
              const offsetX = childCenterX - dotCenterX;
              const offsetY = childCenterY - dotCenterY;
              
              console.log(`          - Centrado:`);
              console.log(`            - Dot center: (${dotCenterX.toFixed(2)}, ${dotCenterY.toFixed(2)})`);
              console.log(`            - Child center: (${childCenterX.toFixed(2)}, ${childCenterY.toFixed(2)})`);
              console.log(`            - Offset X: ${offsetX.toFixed(2)}px`);
              console.log(`            - Offset Y: ${offsetY.toFixed(2)}px`);
              console.log(`            - ⚠️  ${Math.abs(offsetY) > 1 ? 'DESCENTRADO' : 'CENTRADO'} verticalmente`);
            });
          } else {
            // El número está directamente como textContent, no como child
            console.log(`        - ⚠️  El número está como textContent directo, no como child`);
            console.log(`        - Calculando posición del texto...`);
            
            // Intentar medir la posición del texto usando Range
            const range = document.createRange();
            range.selectNodeContents(dotNumber);
            const textRect = range.getBoundingClientRect();
            
            console.log(`        - Text rect:`);
            console.log(`          - top: ${textRect.top}px`);
            console.log(`          - left: ${textRect.left}px`);
            console.log(`          - width: ${textRect.width}px`);
            console.log(`          - height: ${textRect.height}px`);
            
            const dotCenterY = dotRect.top + dotRect.height / 2;
            const textCenterY = textRect.top + textRect.height / 2;
            const offsetY = textCenterY - dotCenterY;
            
            console.log(`        - Centrado:`);
            console.log(`          - Dot center Y: ${dotCenterY.toFixed(2)}px`);
            console.log(`          - Text center Y: ${textCenterY.toFixed(2)}px`);
            console.log(`          - Offset Y: ${offsetY.toFixed(2)}px`);
            console.log(`          - ⚠️  ${Math.abs(offsetY) > 1 ? 'DESCENTRADO' : 'CENTRADO'} verticalmente`);
          }
        }
        console.log(`      - Total spans: ${allSpans.length}`);
        
        if (dotNumber) {
          const dotComputed = window.getComputedStyle(dotNumber);
          const dotColor = dotComputed.color;
          const dotBg = dotComputed.backgroundColor;
          const dotLineHeight = dotComputed.lineHeight;
          const dotAlignItems = dotComputed.alignItems;
          const dotJustifyContent = dotComputed.justifyContent;
          const dotDisplay = dotComputed.display;
          const dotVerticalAlign = dotComputed.verticalAlign;
          const dotStyle = dotNumber.getAttribute('style');
          
          console.log(`      - Dot (${dotNumber.tagName}):`);
          console.log(`        - Style inline: ${dotStyle}`);
          console.log(`        - Color: ${dotColor}`);
          console.log(`        - Background: ${dotBg}`);
          console.log(`        - Line-height: ${dotLineHeight}`);
          console.log(`        - Display: ${dotDisplay}`);
          console.log(`        - Align-items: ${dotAlignItems}`);
          console.log(`        - Justify-content: ${dotJustifyContent}`);
          console.log(`        - Vertical-align: ${dotVerticalAlign}`);
          console.log(`        - Text content: "${dotNumber.textContent}"`);
          
          // Verificar tokens en el dot
          const dotColorToken = dotComputed.getPropertyValue('color');
          const dotBgToken = dotComputed.getPropertyValue('background-color');
          console.log(`        - Color token resuelto: ${dotColorToken}`);
          console.log(`        - Background token resuelto: ${dotBgToken}`);
        }
        
        if (numberText) {
          const textColor = window.getComputedStyle(numberText).color;
          console.log(`      - Number text color: ${textColor}`);
        }
        
        if (innerSpan) {
          const spanColor = window.getComputedStyle(innerSpan).color;
          console.log(`      - Inner span color: ${spanColor}`);
        }
        
        // Verificar tokens
        const fgBoldToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-dark-fg-bold');
        const fgBoldTokenLight = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-fg-bold');
        const fg1HighToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-fg-1-high');
        const bg1Token = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-bg-1');
        const errorToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-accent-error');
        const successToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-accent-success');
        const warningToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-accent-warning');
        const infoToken = getComputedStyle(document.documentElement).getPropertyValue('--modifiers-normal-color-light-feedback-accent-info');
        
        console.log(`    - Tokens CSS:`);
        console.log(`      - --modifiers-normal-color-dark-fg-bold: ${fgBoldToken || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-fg-bold: ${fgBoldTokenLight || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-fg-1-high: ${fg1HighToken || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-bg-1: ${bg1Token || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-feedback-accent-error: ${errorToken || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-feedback-accent-success: ${successToken || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-feedback-accent-warning: ${warningToken || 'NO DEFINIDO'}`);
        console.log(`      - --modifiers-normal-color-light-feedback-accent-info: ${infoToken || 'NO DEFINIDO'}`);
        
        // Verificar si tiene data-theme
        const hasDataTheme = document.documentElement.hasAttribute('data-theme');
        console.log(`    - data-theme en html: ${document.documentElement.getAttribute('data-theme') || 'NO'}`);
      });
    }, 100);
    
    return container;
  },
};
