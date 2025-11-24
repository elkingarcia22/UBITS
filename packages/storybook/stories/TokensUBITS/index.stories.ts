/**
 * Tokens UBITS - Sección Principal
 * 
 * Esta es la sección principal de Tokens UBITS en Storybook.
 * Organiza todos los tokens según la estructura de Figma.
 */

import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tokens UBITS',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sección completa de Tokens UBITS organizados según la estructura de Figma. Los tokens con Light/Dark mode están en Modificadores. Incluye modificadores, semánticos, componentes, effects, tipografía, spacing y border-radius.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Story de índice - Esta es la página principal de Tokens UBITS
 */
export const Index: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '1200px';
    
    const title = document.createElement('h1');
    title.textContent = 'Tokens UBITS';
    title.style.fontSize = '32px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = 'Sección completa de Tokens UBITS organizados según la estructura de Figma. Los tokens con Light/Dark mode están en Modificadores.';
    description.style.fontSize = '16px';
    description.style.color = 'var(--modifiers-normal-color-light-fg-1-medium, #5c646f)';
    description.style.marginBottom = '32px';
    container.appendChild(description);
    
    return container;
  },
};

