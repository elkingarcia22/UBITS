/**
 * Tokens UBITS - Spacing
 * 
 * Tokens de espaciado:
 * - p-spacing (primitive spacing)
 * - s-spacing (semantic spacing)
 * - ubits-spacing (tokens actuales UBITS)
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS/5. Spacing',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tokens de espaciado del sistema UBITS. Incluye p-spacing (primitive), s-spacing (semantic) y ubits-spacing (tokens actuales).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Tokens de spacing organizados por categoría
// NOTA: Los tokens están en tokens.css con prefijo ubits-spacing
// Los tokens aparecen en light y dark mode, pero los valores son los mismos
const SPACING_TOKENS = {
  'ubits-spacing': [
    '--ubits-spacing-none',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-spacing-2xl',
    '--ubits-spacing-3xl',
    '--ubits-spacing-4xl',
    '--ubits-spacing-5xl',
    '--ubits-spacing-6xl',
    '--ubits-spacing-7',
    '--ubits-spacing-8',
    '--ubits-spacing-10',
    '--ubits-spacing-12',
    '--ubits-spacing-16',
    '--ubits-spacing-20',
    '--ubits-spacing-24',
    '--ubits-spacing-32',
    '--ubits-spacing-40',
    '--ubits-spacing-48',
    '--ubits-spacing-64',
    '--ubits-spacing-80',
    '--ubits-spacing-96',
  ],
  'p-spacing': [
    // Los tokens p-spacing no están en figma-tokens.css actualmente
  ],
  's-spacing': [
    // Los tokens s-spacing no están en figma-tokens.css actualmente
  ],
} as const;

/**
 * Obtiene el valor de un token CSS
 */
function getTokenValue(token: string): string {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(token).trim();
  return value || 'N/A';
}

/**
 * Crea una fila de tabla para mostrar un token de spacing
 */
function createSpacingRow(token: string): HTMLElement {
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
  preview.style.gap = '8px';
  
  const box = document.createElement('div');
  box.style.width = value;
  box.style.height = '24px';
  box.style.backgroundColor = '#3b82f6';
  box.style.borderRadius = '4px';
  box.style.minWidth = '2px';
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
 * Story principal que muestra todos los tokens de spacing
 */
export const TodosLosTokens: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'Spacing - Todos los Tokens';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const totalCount = Object.values(SPACING_TOKENS).reduce((sum, tokens) => sum + tokens.length, 0);
    const summary = document.createElement('div');
    summary.style.marginBottom = '24px';
    summary.style.padding = '16px';
    summary.style.backgroundColor = '#f3f4f6';
    summary.style.border = '1px solid #d1d5db';
    summary.style.borderRadius = '8px';
    summary.style.fontSize = '14px';
    summary.innerHTML = `
      <strong>Resumen:</strong><br>
      • UBITS Spacing: ${SPACING_TOKENS['ubits-spacing'].length} tokens<br>
      • p-spacing: ${SPACING_TOKENS['p-spacing'].length} tokens (no disponibles en figma-tokens.css)<br>
      • s-spacing: ${SPACING_TOKENS['s-spacing'].length} tokens (no disponibles en figma-tokens.css)<br>
      <strong>Total: ${totalCount} tokens</strong>
    `;
    container.appendChild(summary);

    // Renderizar cada categoría
    Object.entries(SPACING_TOKENS).forEach(([category, tokens]) => {
      if (tokens.length === 0) return;

      const section = document.createElement('div');
      section.style.marginBottom = '40px';

      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} (${tokens.length} tokens)`;
      sectionTitle.style.fontSize = '20px';
      sectionTitle.style.fontWeight = '600';
      sectionTitle.style.marginBottom = '16px';
      sectionTitle.style.paddingBottom = '8px';
      sectionTitle.style.borderBottom = '2px solid #e5e7eb';
      section.appendChild(sectionTitle);

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
      tokens.forEach(token => {
        tbody.appendChild(createSpacingRow(token));
      });
      table.appendChild(tbody);

      section.appendChild(table);
      container.appendChild(section);
    });

    return container;
  },
};

/**
 * Story para UBITS Spacing
 */
export const UBITSSpacing: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1400px';

    const title = document.createElement('h2');
    title.textContent = 'UBITS Spacing';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const count = document.createElement('div');
    count.style.marginBottom = '16px';
    count.style.fontSize = '16px';
    count.style.fontWeight = '600';
    count.textContent = `Total: ${SPACING_TOKENS['ubits-spacing'].length} tokens`;
    container.appendChild(count);

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
    SPACING_TOKENS['ubits-spacing'].forEach(token => {
      tbody.appendChild(createSpacingRow(token));
    });
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
  },
};

