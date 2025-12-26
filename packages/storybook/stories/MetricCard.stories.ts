import type { Meta, StoryObj } from '@storybook/html';
import { renderMetricCard, createMetricCard } from '../../components/metric-card/src/MetricCardProvider';
import type { MetricCardOptions } from '../../components/metric-card/src/types/MetricCardOptions';
import '../../components/metric-card/src/styles/metric-card.css';
import '../../components/button/src/styles/button.css';

const meta: Meta<MetricCardOptions> = {
  title: 'Charts/Text Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente MetricCard UBITS para mostrar métricas numéricas. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, tamaños y es completamente personalizable.'
}
}
},
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la métrica',
      table: {
        defaultValue: { summary: 'Net confidence score' },
        type: { summary: 'string' }
}
},
    value: {
      control: { type: 'text' },
      description: 'Valor principal (puede ser número o string, ej: "200 / 204")',
      table: {
        defaultValue: { summary: '200 / 204' },
        type: { summary: 'string | number' }
}
},
    label: {
      control: { type: 'text' },
      description: 'Texto descriptivo debajo del valor',
      table: {
        defaultValue: { summary: 'Colaboradores' },
        type: { summary: 'string' }
}
},
    titleIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'user, users, chart-line, etc.' }
}
},
    titleIconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono del título',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' }
}
},
    titleIconColor: {
      control: { type: 'color' },
      description: 'Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))',
      table: {
        type: { summary: 'string' }
}
},
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        defaultValue: { summary: 'false' }
}
},
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
      table: {
        defaultValue: { summary: 'false' }
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la tarjeta',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
}
}
}
};

export default meta;
type Story = StoryObj<MetricCardOptions>;

export const Default: Story = {
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md'
},
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    
    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '400px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '24px';
    
    // Renderizar card
    const cardHTML = renderMetricCard(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    return container;
  }
};

// Helper para renderizar Text Metric Card de manera consistente
function renderTextMetricCardStory(options: MetricCardOptions) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'flex-start';
  container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
  container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  container.style.borderRadius = '8px';
  container.style.padding = '24px';
  
  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.maxWidth = '400px';
  wrapper.style.margin = '0 auto';
  
  const cardHTML = renderMetricCard(options);
  wrapper.innerHTML = cardHTML;
  container.appendChild(wrapper);
  
  return container;
}

/**
 * SizeSM
 * Tamaño small
 */
export const SizeSM: Story = {
  name: 'Size - SM',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'sm',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card tamaño small.',
      },
    },
  },
};

/**
 * SizeMD
 * Tamaño medium (default)
 */
export const SizeMD: Story = {
  name: 'Size - MD (Default)',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card tamaño medium (valor por defecto).',
      },
    },
  },
};

/**
 * SizeLG
 * Tamaño large
 */
export const SizeLG: Story = {
  name: 'Size - LG',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'lg',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card tamaño large.',
      },
    },
  },
};

/**
 * WithTitleIcon
 * Con icono en el título
 */
export const WithTitleIcon: Story = {
  name: 'With Title Icon',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con icono en el título.',
      },
    },
  },
};

/**
 * WithoutTitleIcon
 * Sin icono en el título
 */
export const WithoutTitleIcon: Story = {
  name: 'Without Title Icon',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: undefined,
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card sin icono en el título.',
      },
    },
  },
};

/**
 * TitleIconStyleRegular
 * Icono del título estilo regular
 */
export const TitleIconStyleRegular: Story = {
  name: 'Title Icon Style - Regular',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con icono del título estilo regular.',
      },
    },
  },
};

/**
 * TitleIconStyleSolid
 * Icono del título estilo solid
 */
export const TitleIconStyleSolid: Story = {
  name: 'Title Icon Style - Solid',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'solid',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con icono del título estilo solid.',
      },
    },
  },
};

/**
 * WithTitleIconColor
 * Con color personalizado para el icono del título
 */
export const WithTitleIconColor: Story = {
  name: 'With Title Icon Color',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con color personalizado para el icono del título.',
      },
    },
  },
};

/**
 * WithInfoIcon
 * Con icono de información
 */
export const WithInfoIcon: Story = {
  name: 'With Info Icon',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    showInfoIcon: true,
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con icono de información junto al título.',
      },
    },
  },
};

/**
 * WithoutInfoIcon
 * Sin icono de información
 */
export const WithoutInfoIcon: Story = {
  name: 'Without Info Icon',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    showInfoIcon: false,
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card sin icono de información.',
      },
    },
  },
};

/**
 * WithActionButton
 * Con botón de acción
 */
export const WithActionButton: Story = {
  name: 'With Action Button',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    showActionButton: true,
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con botón de acción (flecha a la derecha).',
      },
    },
  },
};

/**
 * WithoutActionButton
 * Sin botón de acción
 */
export const WithoutActionButton: Story = {
  name: 'Without Action Button',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    showActionButton: false,
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card sin botón de acción.',
      },
    },
  },
};

/**
 * ValueNumber
 * Valor como número (se formatea automáticamente)
 */
export const ValueNumber: Story = {
  name: 'Value - Number',
  args: {
    title: 'Total usuarios',
    value: 1234,
    label: 'Usuarios activos',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con valor numérico (se formatea automáticamente con separadores de miles).',
      },
    },
  },
};

/**
 * ValueString
 * Valor como string (ej: "200 / 204")
 */
export const ValueString: Story = {
  name: 'Value - String',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con valor como string (ej: "200 / 204").',
      },
    },
  },
};

/**
 * ValueLargeNumber
 * Valor numérico grande (se formatea con separadores de miles)
 */
export const ValueLargeNumber: Story = {
  name: 'Value - Large Number',
  args: {
    title: 'Total ventas',
    value: 1234567,
    label: 'Ventas del mes',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con valor numérico grande (se formatea con separadores de miles).',
      },
    },
  },
};

/**
 * ValueSmallNumber
 * Valor numérico pequeño
 */
export const ValueSmallNumber: Story = {
  name: 'Value - Small Number',
  args: {
    title: 'Total items',
    value: 5,
    label: 'Items en el carrito',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con valor numérico pequeño.',
      },
    },
  },
};

/**
 * ValueZero
 * Valor cero
 */
export const ValueZero: Story = {
  name: 'Value - Zero',
  args: {
    title: 'Total items',
    value: 0,
    label: 'Items en el carrito',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con valor cero.',
      },
    },
  },
};

/**
 * LongTitle
 * Título largo
 */
export const LongTitle: Story = {
  name: 'Long Title',
  args: {
    title: 'Net confidence score promedio de todos los colaboradores activos',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con título largo.',
      },
    },
  },
};

/**
 * ShortTitle
 * Título corto
 */
export const ShortTitle: Story = {
  name: 'Short Title',
  args: {
    title: 'Total',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con título corto.',
      },
    },
  },
};

/**
 * LongLabel
 * Label largo
 */
export const LongLabel: Story = {
  name: 'Long Label',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores activos en el sistema durante el último mes',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con label largo.',
      },
    },
  },
};

/**
 * ShortLabel
 * Label corto
 */
export const ShortLabel: Story = {
  name: 'Short Label',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Total',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con label corto.',
      },
    },
  },
};

/**
 * OnClickCallback
 * Con callback onClick
 */
export const OnClickCallback: Story = {
  name: 'OnClick Callback',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => {
    const options: MetricCardOptions = {
      ...args,
      onClick: () => {
        alert('Text Metric Card clicked');
        console.log('Text Metric Card clicked');
      }
    };
    return renderTextMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card con callback onClick que se ejecuta cuando se hace clic en la tarjeta.',
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
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const sizes: Array<MetricCardOptions['size']> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const sizeContainer = document.createElement('div');
      sizeContainer.style.cssText = `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 24px;
        background: var(--modifiers-normal-color-light-bg-1);
        border-radius: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
        width: 100%;
      `;
      label.textContent = `Size: ${size?.toUpperCase() || 'default'}';
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 400px;
        width: 100%;
      `;
      
      const cardHTML = renderMetricCard({
        ...args,
        size: size,
      } as MetricCardOptions);
      
      wrapper.innerHTML = cardHTML;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      innerContainer.appendChild(label);
      innerContainer.appendChild(wrapper);
      sizeContainer.appendChild(innerContainer);
      container.appendChild(sizeContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles (sm, md, lg).',
      },
    },
  },
};

/**
 * AllIconStyles
 * Todos los estilos de icono
 */
export const AllIconStyles: Story = {
  name: 'All Icon Styles',
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    size: 'md',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
    
    const iconStyles: Array<MetricCardOptions['titleIconStyle']> = ['regular', 'solid'];
    
    iconStyles.forEach(iconStyle => {
      const styleContainer = document.createElement('div');
      styleContainer.style.cssText = `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 24px;
        background: var(--modifiers-normal-color-light-bg-1);
        border-radius: 8px;
      `;
      
      const label = document.createElement('div');
      label.style.cssText = `
        font-size: 14px;
        color: var(--modifiers-normal-color-light-fg-1-high);
        font-weight: 600;
        margin-bottom: 12px;
        width: 100%;
      `;
      label.textContent = `Icon Style: ${iconStyle?.charAt(0).toUpperCase() + iconStyle?.slice(1) || 'default'}';
      
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        max-width: 400px;
        width: 100%;
      `;
      
      const cardHTML = renderMetricCard({
        ...args,
        titleIconStyle: iconStyle,
      } as MetricCardOptions);
      
      wrapper.innerHTML = cardHTML;
      
      const innerContainer = document.createElement('div');
      innerContainer.style.cssText = `
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;
      innerContainer.appendChild(label);
      innerContainer.appendChild(wrapper);
      styleContainer.appendChild(innerContainer);
      container.appendChild(styleContainer);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos los estilos de icono disponibles (regular, solid).',
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
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    titleIconColor: 'var(--modifiers-normal-color-light-feedback-accent-success)',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md',
  },
  render: (args) => {
    const options: MetricCardOptions = {
      ...args,
      onClick: () => {
        console.log('Text Metric Card clicked');
      }
    };
    return renderTextMetricCardStory(options);
  },
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card completo con todas las opciones habilitadas.',
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
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    size: 'md',
  },
  render: (args) => renderTextMetricCardStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Text Metric Card mínimo con solo las opciones esenciales.',
      },
    },
  },
};

