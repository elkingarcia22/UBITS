/**
 * Tokens UBITS - Text Styles (Estilos de Texto Completos)
 * 
 * Estilos completos de texto que incluyen todas las propiedades tipográficas:
 * - Display (D1, D2, D3, D4) con regular, semibold, bold
 * - Heading (H1, H2) con regular, semibold, bold
 * - Body (lg, md, sm, xs) con regular, semibold, bold
 * 
 * Cada estilo incluye: fontfamily, fontweight, letterspacing, paragraphindent, textcase, textdecoration
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/8. Text Styles',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Estilos completos de texto del sistema UBITS. Cada estilo incluye todas las propiedades tipográficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration. Incluye Display (D1-D4), Heading (H1-H2) y Body (lg, md, sm, xs).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Obtiene el valor de un token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || 'N/A';
}

/**
 * Extrae tokens de display, heading y body del CSS
 */
function extractTextStyleTokens(): {
  display: Record<string, Record<string, string>>;
  heading: Record<string, Record<string, string>>;
  body: Record<string, Record<string, string>>;
} {
  const css = document.styleSheets;
  const allTokens: string[] = [];
  
  // Intentar leer desde figma-tokens.css
  try {
    const styleSheet = Array.from(css).find(sheet => {
      try {
        return sheet.href?.includes('figma-tokens.css') || false;
      } catch {
        return false;
      }
    });
    
    if (styleSheet) {
      const rules = Array.from(styleSheet.cssRules || []);
      rules.forEach(rule => {
        if (rule instanceof CSSStyleRule) {
          rule.style.cssText.split(';').forEach(decl => {
            const match = decl.match(/--[^:]+:/);
            if (match) {
              allTokens.push(match[0].replace(':', ''));
            }
          });
        }
      });
    }
  } catch (e) {
    console.warn('No se pudo leer tokens del CSS directamente');
  }
  
  // Si no se pueden leer, usar lista predefinida basada en la estructura conocida
  const displayTokens: Record<string, Record<string, string>> = {};
  const headingTokens: Record<string, Record<string, string>> = {};
  const bodyTokens: Record<string, Record<string, string>> = {};
  
  // Generar tokens de display (D1-D4, regular/semibold/bold)
  ['d1', 'd2', 'd3', 'd4'].forEach(size => {
    ['regular', 'semibold', 'bold'].forEach(weight => {
      const key = `${size}-${weight}`;
      displayTokens[key] = {
        fontfamily: `--modifiers-normal-display-${size}-${weight}-fontfamily`,
        fontweight: `--modifiers-normal-display-${size}-${weight}-fontweight`,
        letterspacing: `--modifiers-normal-display-${size}-${weight}-letterspacing`,
        paragraphindent: `--modifiers-normal-display-${size}-${weight}-paragraphindent`,
        textcase: `--modifiers-normal-display-${size}-${weight}-textcase`,
        textdecoration: `--modifiers-normal-display-${size}-${weight}-textdecoration`,
      };
    });
  });
  
  // Generar tokens de heading (H1-H2) - No tienen variantes de peso, solo h1 y h2
  ['h1', 'h2'].forEach(size => {
    const key = size;
    headingTokens[key] = {
      fontfamily: `--modifiers-normal-heading-${size}-fontfamily`,
      fontweight: `--modifiers-normal-heading-${size}-fontweight`,
      lineheight: `--modifiers-normal-heading-${size}-lineheight`,
      letterspacing: `--modifiers-normal-heading-${size}-letterspacing`,
      paragraphindent: `--modifiers-normal-heading-${size}-paragraphindent`,
      textcase: `--modifiers-normal-heading-${size}-textcase`,
      textdecoration: `--modifiers-normal-heading-${size}-textdecoration`,
    };
  });
  
  // Generar tokens de body (lg/md/sm/xs, regular/semibold/bold)
  ['lg', 'md', 'sm', 'xs'].forEach(size => {
    ['regular', 'semibold', 'bold'].forEach(weight => {
      const key = `${size}-${weight}`;
      bodyTokens[key] = {
        fontfamily: `--modifiers-normal-body-${size}-${weight}-fontfamily`,
        fontweight: `--modifiers-normal-body-${size}-${weight}-fontweight`,
        letterspacing: `--modifiers-normal-body-${size}-${weight}-letterspacing`,
        paragraphindent: `--modifiers-normal-body-${size}-${weight}-paragraphindent`,
        textcase: `--modifiers-normal-body-${size}-${weight}-textcase`,
        textdecoration: `--modifiers-normal-body-${size}-${weight}-textdecoration`,
      };
    });
  });
  
  return { display: displayTokens, heading: headingTokens, body: bodyTokens };
}

/**
 * Crea una tabla para mostrar un estilo de texto completo
 */
function createTextStyleTable(
  styleName: string,
  tokens: Record<string, string>
): HTMLElement {
  const container = document.createElement('div');
  container.style.marginBottom = '24px';
  container.style.padding = '16px';
  container.style.backgroundColor = '#ffffff';
  container.style.border = '1px solid #e5e7eb';
  container.style.borderRadius = '8px';
  
  const title = document.createElement('h4');
  title.textContent = styleName;
  title.style.fontSize = '16px';
  title.style.fontWeight = '600';
  title.style.marginBottom = '12px';
  title.style.color = '#303a47';
  container.appendChild(title);
  
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  
  const properties = [
    { key: 'fontfamily', label: 'Font Family' },
    { key: 'fontweight', label: 'Font Weight' },
    { key: 'lineheight', label: 'Line Height' },
    { key: 'letterspacing', label: 'Letter Spacing' },
    { key: 'paragraphindent', label: 'Paragraph Indent' },
    { key: 'textcase', label: 'Text Case' },
    { key: 'textdecoration', label: 'Text Decoration' },
  ].filter(prop => tokens[prop.key]); // Solo mostrar propiedades que existen
  
  properties.forEach(prop => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    const labelCell = document.createElement('td');
    labelCell.style.padding = '8px 12px';
    labelCell.style.fontSize = '14px';
    labelCell.style.fontWeight = '500';
    labelCell.style.color = '#303a47';
    labelCell.style.width = '180px';
    labelCell.textContent = prop.label;
    row.appendChild(labelCell);
    
    const tokenCell = document.createElement('td');
    tokenCell.style.padding = '8px 12px';
    tokenCell.style.fontFamily = 'monospace';
    tokenCell.style.fontSize = '12px';
    tokenCell.style.color = '#6b7280';
    tokenCell.textContent = tokens[prop.key] || 'N/A';
    row.appendChild(tokenCell);
    
    const valueCell = document.createElement('td');
    valueCell.style.padding = '8px 12px';
    valueCell.style.fontSize = '14px';
    valueCell.style.color = '#303a47';
    if (tokens[prop.key]) {
      const value = getTokenValue(tokens[prop.key]);
      valueCell.textContent = value;
    } else {
      valueCell.textContent = 'N/A';
    }
    row.appendChild(valueCell);
    
    table.appendChild(row);
  });
  
  container.appendChild(table);
  return container;
}

/**
 * Story principal - Todos los Text Styles
 */
export const TodosLosTextStyles: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Text Styles - Estilos Completos de Texto';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'Estilos completos de texto que incluyen todas las propiedades tipográficas: font-family, font-weight, letter-spacing, paragraph-indent, text-case y text-decoration.';
    description.style.fontSize = '16px';
    description.style.color = '#5c646f';
    description.style.marginBottom = '32px';
    description.style.lineHeight = '1.6';
    container.appendChild(description);
    
    const { display, heading, body } = extractTextStyleTokens();
    
    // Sección Display
    const displaySection = document.createElement('div');
    displaySection.style.marginBottom = '40px';
    
    const displayTitle = document.createElement('h3');
    displayTitle.textContent = `Display (${Object.keys(display).length} estilos)`;
    displayTitle.style.fontSize = '20px';
    displayTitle.style.fontWeight = '600';
    displayTitle.style.marginBottom = '16px';
    displayTitle.style.paddingBottom = '8px';
    displayTitle.style.borderBottom = '2px solid #e5e7eb';
    displaySection.appendChild(displayTitle);
    
    Object.entries(display).forEach(([styleName, tokens]) => {
      displaySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(displaySection);
    
    // Sección Heading
    const headingSection = document.createElement('div');
    headingSection.style.marginBottom = '40px';
    
    const headingTitle = document.createElement('h3');
    headingTitle.textContent = `Heading (${Object.keys(heading).length} estilos)`;
    headingTitle.style.fontSize = '20px';
    headingTitle.style.fontWeight = '600';
    headingTitle.style.marginBottom = '16px';
    headingTitle.style.paddingBottom = '8px';
    headingTitle.style.borderBottom = '2px solid #e5e7eb';
    headingSection.appendChild(headingTitle);
    
    Object.entries(heading).forEach(([styleName, tokens]) => {
      headingSection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(headingSection);
    
    // Sección Body
    const bodySection = document.createElement('div');
    bodySection.style.marginBottom = '40px';
    
    const bodyTitle = document.createElement('h3');
    bodyTitle.textContent = `Body (${Object.keys(body).length} estilos)`;
    bodyTitle.style.fontSize = '20px';
    bodyTitle.style.fontWeight = '600';
    bodyTitle.style.marginBottom = '16px';
    bodyTitle.style.paddingBottom = '8px';
    bodyTitle.style.borderBottom = '2px solid #e5e7eb';
    bodySection.appendChild(bodyTitle);
    
    Object.entries(body).forEach(([styleName, tokens]) => {
      bodySection.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    container.appendChild(bodySection);
    
    return container;
  },
};

/**
 * Story - Display
 */
export const Display: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Display Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { display } = extractTextStyleTokens();
    
    Object.entries(display).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

/**
 * Story - Heading
 */
export const Heading: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Heading Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { heading } = extractTextStyleTokens();
    
    Object.entries(heading).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

/**
 * Story - Body
 */
export const Body: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';
    
    const title = document.createElement('h2');
    title.textContent = 'Body Styles';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const { body } = extractTextStyleTokens();
    
    Object.entries(body).forEach(([styleName, tokens]) => {
      container.appendChild(createTextStyleTable(styleName.toUpperCase(), tokens));
    });
    
    return container;
  },
};

