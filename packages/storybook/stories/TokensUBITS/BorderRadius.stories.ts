/**
 * Tokens UBITS - Border Radius
 * 
 * Tokens de border-radius:
 * - ubits-border-radius (tokens actuales UBITS)
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/6. Border Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens de border-radius del sistema UBITS. Incluye valores desde none (0) hasta full (1000px).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Tokens de border-radius
// NOTA: Los tokens aparecen en light y dark mode, pero los valores son los mismos
const BORDER_RADIUS_TOKENS = [
  '--ubits-border-radius-none',
  '--ubits-border-radius-xs',
  '--ubits-border-radius-sm',
  '--ubits-border-radius-md',
  '--ubits-border-radius-lg',
  '--ubits-border-radius-xl',
  '--ubits-border-radius-full',
] as const;

/**
 * Obtiene el valor de un token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || 'N/A';
}

/**
 * Crea una fila de tabla para mostrar un token de border-radius
 */
function createBorderRadiusRow(token: string): HTMLElement {
  const row = document.createElement('tr');
  row.style.borderBottom = '1px solid #e5e7eb';

  const tokenCell = document.createElement('td');
  tokenCell.style.padding = '12px';
  tokenCell.style.fontFamily = 'monospace';
  tokenCell.style.fontSize = '13px';
  tokenCell.style.color = '#303a47';
  tokenCell.textContent = token;
  row.appendChild(tokenCell);

  const valueCell = document.createElement('td');
  valueCell.style.padding = '12px';
  valueCell.style.fontSize = '14px';
  valueCell.style.color = '#6b7280';
  
  const value = getTokenValue(token);
  valueCell.textContent = value;
  row.appendChild(valueCell);

  const previewCell = document.createElement('td');
  previewCell.style.padding = '12px';
  previewCell.style.width = '200px';
  
  const preview = document.createElement('div');
  preview.style.display = 'flex';
  preview.style.alignItems = 'center';
  preview.style.gap = '12px';
  
  const box = document.createElement('div');
  box.style.width = '80px';
  box.style.height = '80px';
  box.style.borderRadius = value;
  box.style.backgroundColor = '#3b82f6';
  box.style.border = '2px solid #1e40af';
  box.style.flexShrink = '0';
  preview.appendChild(box);
  
  const label = document.createElement('span');
  label.textContent = value;
  label.style.fontSize = '12px';
  label.style.color = '#6b7280';
  preview.appendChild(label);
  
  previewCell.appendChild(preview);
  row.appendChild(previewCell);

  return row;
}

/**
 * Story principal que muestra todos los tokens de border-radius
 */
export const TodosLosTokens: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Border Radius - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = `
      <strong>Resumen:</strong><br>
      • Border Radius: ${BORDER_RADIUS_TOKENS.length} tokens<br>
      <strong>Total: ${BORDER_RADIUS_TOKENS.length} tokens</strong>
    `;
    container.appendChild(summary);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#ffffff';
    table.style.border = '1px solid #e5e7eb';
    table.style.borderRadius = '8px';
    table.style.overflow = 'hidden';

    const thead = document.createElement('thead');
    thead.style.backgroundColor = '#f9fafb';
    const headerRow = document.createElement('tr');
    
    const tokenHeader = document.createElement('th');
    tokenHeader.textContent = 'Token';
    tokenHeader.style.padding = '12px';
    tokenHeader.style.textAlign = 'left';
    tokenHeader.style.fontSize = '14px';
    tokenHeader.style.fontWeight = '600';
    tokenHeader.style.color = '#303a47';
    tokenHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(tokenHeader);

    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Valor';
    valueHeader.style.padding = '12px';
    valueHeader.style.textAlign = 'left';
    valueHeader.style.fontSize = '14px';
    valueHeader.style.fontWeight = '600';
    valueHeader.style.color = '#303a47';
    valueHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(valueHeader);

    const previewHeader = document.createElement('th');
    previewHeader.textContent = 'Preview';
    previewHeader.style.padding = '12px';
    previewHeader.style.textAlign = 'left';
    previewHeader.style.fontSize = '14px';
    previewHeader.style.fontWeight = '600';
    previewHeader.style.color = '#303a47';
    previewHeader.style.borderBottom = '2px solid #e5e7eb';
    headerRow.appendChild(previewHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    BORDER_RADIUS_TOKENS.forEach(token => {
      tbody.appendChild(createBorderRadiusRow(token));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

/**
 * Story con preview visual mejorado
 */
export const PreviewVisual: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Border Radius - Preview Visual';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    grid.style.gap = '24px';
    grid.style.marginTop = '24px';

    BORDER_RADIUS_TOKENS.forEach(token => {
      const card = document.createElement('div');
      card.style.padding = '16px';
      card.style.border = '1px solid #e5e7eb';
      card.style.borderRadius = '8px';
      card.style.backgroundColor = '#ffffff';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      card.style.gap = '12px';

      const value = getTokenValue(token);
      
      const box = document.createElement('div');
      box.style.width = '120px';
      box.style.height = '120px';
      box.style.borderRadius = value;
      box.style.backgroundColor = '#3b82f6';
      box.style.border = '3px solid #1e40af';
      box.style.display = 'flex';
      box.style.alignItems = 'center';
      box.style.justifyContent = 'center';
      card.appendChild(box);

      const tokenName = document.createElement('code');
      tokenName.textContent = token;
      tokenName.style.fontSize = '11px';
      tokenName.style.fontFamily = 'monospace';
      tokenName.style.color = '#6b7280';
      tokenName.style.textAlign = 'center';
      tokenName.style.wordBreak = 'break-word';
      card.appendChild(tokenName);

      const valueLabel = document.createElement('div');
      valueLabel.textContent = value;
      valueLabel.style.fontSize = '14px';
      valueLabel.style.fontWeight = '600';
      valueLabel.style.color = '#303a47';
      card.appendChild(valueLabel);

      grid.appendChild(card);
    });

    container.appendChild(grid);

    return container;
  },
};

