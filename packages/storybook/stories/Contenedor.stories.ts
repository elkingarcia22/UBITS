import type { Meta, StoryObj } from '@storybook/html';

interface ContenedorOptions {
  content: string;
  showBorder: boolean;
  backgroundVariant: 'bg1' | 'bg2' | 'bg3' | 'bg4';
}

const meta: Meta<ContenedorOptions> = {
  title: 'Components/Contenedor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente contenedor básico UBITS con fondo configurable (bg1, bg2, bg3, bg4), bordes con radio de 8px y padding interno de 12px. Usa tokens UBITS para mantener consistencia visual.'
}
}
},
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'Contenido del contenedor',
      table: {
        type: { summary: 'string' }
}
},
    showBorder: {
      control: { type: 'boolean' },
      description: 'Mostrar borde visual (opcional, solo para demostración)',
      table: {
        defaultValue: { summary: 'false' }
}
},
    backgroundVariant: {
      control: { type: 'select' },
      options: ['bg1', 'bg2', 'bg3', 'bg4'],
      description: 'Variante de fondo del contenedor',
      table: {
        defaultValue: { summary: 'bg1' }
}
}
}
};

export default meta;
type Story = StoryObj<ContenedorOptions>;

export const Default: Story = {
  args: {
    content: 'Este es un contenedor básico con fondo bg-1, border-radius de 8px y padding interno de 12px.',
    showBorder: false,
    backgroundVariant: 'bg1'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    // Crear el contenedor UBITS
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';
    
    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgNumber = bgVariant.replace('bg', '');
    const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
    ubitsContainer.style.background = bgToken;
    ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
    ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
    ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
    
    // Agregar borde si se solicita (solo para demostración visual)
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    }
    
    // Agregar contenido
    const contentText = document.createElement('p');
    contentText.style.margin = '0';
    contentText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    contentText.textContent = args.content || 'Contenido del contenedor';
    
    ubitsContainer.appendChild(contentText);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    
    return container;
  }
};

export const WithContent: Story = {
  args: {
    content: 'Este contenedor puede incluir cualquier tipo de contenido: texto, imágenes, botones, formularios, etc.',
    showBorder: false,
    backgroundVariant: 'bg1'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '200px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';
    
    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgNumber = bgVariant.replace('bg', '');
    const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
    ubitsContainer.style.background = bgToken;
    
    ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
    ubitsContainer.style.maxWidth = '600px';
    ubitsContainer.style.width = '100%';
    
    if (args.showBorder) {
      ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    }
    
    // Contenido más rico
    const title = document.createElement('h3');
    title.style.margin = '0 0 12px 0';
    title.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    title.style.fontSize = 'var(--modifiers-normal-heading-h3-fontsize, var(--font-heading-h3-size, 18px))';
    title.style.fontWeight = 'var(--weight-semibold, 600)';
    title.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans))';
    title.textContent = 'Título del contenedor';
    
    const paragraph = document.createElement('p');
    paragraph.style.margin = '0 0 16px 0';
    paragraph.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    paragraph.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
    paragraph.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
    paragraph.textContent = args.content || 'Contenido del contenedor';
    
    const button = document.createElement('button');
    button.style.padding = '8px 16px';
    button.style.background = 'var(--modifiers-normal-color-light-accent-brand)';
    button.style.color = 'var(--modifiers-normal-color-light-fg-bold, white)';
    button.style.border = 'none';
    button.style.borderRadius = '8px)';
    button.style.cursor = 'pointer';
    button.style.fontSize = 'var(--modifiers-normal-body-sm-regular-fontsize, var(--font-body-sm-size, 13px))';
    button.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans))';
    button.textContent = 'Botón de ejemplo';
    
    ubitsContainer.appendChild(title);
    ubitsContainer.appendChild(paragraph);
    ubitsContainer.appendChild(button);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    
    return container;
  }
};

export const WithBorder: Story = {
  args: {
    content: 'Este ejemplo muestra el contenedor con un borde visual para mejor contraste (opcional).',
    showBorder: true,
    backgroundVariant: 'bg1'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const ubitsContainer = document.createElement('div');
    ubitsContainer.className = 'ubits-container';
    
    // Aplicar variante de fondo según el control
    const bgVariant = args.backgroundVariant || 'bg1';
    const bgNumber = bgVariant.replace('bg', '');
    const bgToken = `var(--modifiers-normal-color-light-bg-${bgNumber})`;
    ubitsContainer.style.background = bgToken;
    
    ubitsContainer.style.padding = 'var(--p-spacing-mode-1-md, 12px)';
    ubitsContainer.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
    ubitsContainer.style.fontFamily = 'var(--font-family-noto-sans-font-family, var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif))';
    ubitsContainer.style.fontSize = 'var(--modifiers-normal-body-md-regular-fontsize, var(--font-body-md-size, 14px))';
    ubitsContainer.style.lineHeight = 'var(--modifiers-normal-body-md-regular-lineheight, var(--font-body-md-line, 20px))';
    ubitsContainer.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    
    const contentText = document.createElement('p');
    contentText.style.margin = '0';
    contentText.style.color = 'var(--modifiers-normal-color-light-fg-1-medium)';
    contentText.textContent = args.content || 'Contenido del contenedor';
    
    ubitsContainer.appendChild(contentText);
    preview.appendChild(ubitsContainer);
    container.appendChild(preview);
    
    return container;
  }
};

