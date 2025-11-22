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

