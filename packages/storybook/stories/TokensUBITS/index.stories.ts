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
 * Story de introducción que explica la estructura de tokens
 */
export const Introduccion: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '900px';
    container.style.margin = '0 auto';

    const title = document.createElement('h1');
    title.textContent = 'Tokens UBITS';
    title.style.fontSize = '32px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '16px';
    container.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'Esta sección contiene todos los tokens de diseño del sistema UBITS, organizados según la estructura de Figma. Los tokens están organizados en las siguientes categorías:';
    description.style.fontSize = '16px';
    description.style.lineHeight = '1.6';
    description.style.marginBottom = '24px';
    description.style.color = '#303a47';
    container.appendChild(description);

    const categories = [
      { name: '1. Modificadores (.modifiers)', description: 'Todos los colores con modificadores (Normal, Inverted, Static, Static Inverted) - Incluye Light/Dark mode' },
      { name: '2. Semánticos', description: 'Colores con significado (Feedback, Brand, Chart)' },
      { name: '3. Componentes', description: 'Tokens específicos de componentes (Button Tone, AI Button, Scroll Bar, Toggle)' },
      { name: '4. Effects', description: 'Efectos visuales: Elevation (sombras) y Focus (anillos de enfoque)' },
      { name: '5. Tipografía', description: 'Font-family, font-size, font-weight, line-height, letter-spacing' },
      { name: '6. Spacing', description: 'Valores de espaciado (p-spacing, s-spacing)' },
      { name: '7. Border Radius', description: 'Valores de border-radius' },
      { name: '8. Text Styles', description: 'Estilos completos de texto: Display (D1-D4), Heading (H1-H2), Body (lg, md, sm, xs) con todas las propiedades tipográficas' },
    ];

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.style.margin = '0';

    categories.forEach(category => {
      const item = document.createElement('li');
      item.style.padding = '12px';
      item.style.marginBottom = '8px';
      item.style.border = '1px solid #e5e7eb';
      item.style.borderRadius = '8px';
      item.style.backgroundColor = '#f9fafb';

      const name = document.createElement('strong');
      name.textContent = category.name;
      name.style.display = 'block';
      name.style.marginBottom = '4px';
      name.style.fontSize = '14px';
      name.style.color = '#303a47';
      item.appendChild(name);

      const desc = document.createElement('span');
      desc.textContent = category.description;
      desc.style.display = 'block';
      desc.style.fontSize = '13px';
      desc.style.color = '#6b7280';
      item.appendChild(desc);

      list.appendChild(item);
    });

    container.appendChild(list);

    const note = document.createElement('div');
    note.style.marginTop = '24px';
    note.style.padding = '12px';
    note.style.backgroundColor = '#fef3c7';
    note.style.border = '1px solid #fbbf24';
    note.style.borderRadius = '8px';
    note.style.fontSize = '14px';
    note.style.color = '#92400e';
    note.innerHTML = '<strong>Nota:</strong> Los tokens están organizados según la estructura de Figma. Cada categoría tiene su propia sección con verificaciones para asegurar que todos los tokens estén presentes.';
    container.appendChild(note);

    return container;
  },
};

