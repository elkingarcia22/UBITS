import type { Meta, StoryObj } from '@storybook/html';
import { renderSegmentControl, createSegmentControl } from '../../components/segment-control/src/SegmentControlProvider';
import type { SegmentControlOptions, SegmentItem } from '../../components/segment-control/src/types/SegmentControlOptions';
import '../../components/segment-control/src/styles/segment-control.css';

/**
 * Segment Control Component Stories
 * 
 * Componente de segmentos horizontal con soporte para iconos opcionales.
 * Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px.
 * El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita.
 * Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.
 */
const meta = {
  title: 'Navegación/Segment Control',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Segment Control UBITS de navegación horizontal con soporte para iconos opcionales. Similar a Tabs pero con contenedor con padding interno de 4px y altura de 30px. El segmento activo muestra fondo blanco, icono solid oscuro, texto en negrita. Los segmentos inactivos muestran icono regular y texto en gris claro sin fondo.'
}
}
},
  argTypes: {
    segments: {
      control: { type: 'object' },
      description: 'Array de segmentos a mostrar',
      table: {
        type: { summary: 'SegmentItem[]' }
}
},
    activeSegmentId: {
      control: { type: 'text' },
      description: 'ID del segmento activo',
      table: {
        type: { summary: 'string' }
}
},
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los segmentos',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
}
},
    segmentCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de segmentos a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' }
}
}
}
} satisfies Meta<SegmentControlOptions & { showIcons?: boolean; segmentCount?: number }>;

export default meta;
type Story = StoryObj<SegmentControlOptions & { showIcons?: boolean; segmentCount?: number }>;

/**
 * Helper para generar segmentos de ejemplo
 */
function generateSegments(count: number = 5, withIcons: boolean = true): SegmentItem[] {
  const icons = ['fa-th', 'fa-chart-line', 'fa-cog', 'fa-star', 'fa-book', 'fa-home', 'fa-user', 'fa-bell', 'fa-envelope', 'fa-calendar'];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `segment-${i + 1}`,
    label: labels[i] || `Label ${i + 1}`,
    icon: withIcons ? `far ${icons[i] || 'fa-th'}` : undefined,
    active: i === 0
}));
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    segments: generateSegments(5, true),
    activeSegmentId: 'segment-1',
    showIcons: true,
    segmentCount: 5
},
  render: (args) => {
    // Generar segmentos según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const segments = generateSegments(args.segmentCount || 5, shouldShowIcons);
    
    // Asegurar que el segmento activo esté correctamente marcado
    const activeId = args.activeSegmentId || segments[0]?.id;
    segments.forEach(segment => {
      segment.active = segment.id === activeId;
    });

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      background: var(--modifiers-normal-color-light-bg-1);
    `;

    // Contenedor para el Segment Control
    const container = document.createElement('div');
    container.id = 'segment-control-story-container';
    container.style.cssText = `
      width: 100%;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'segment-control-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeSegment = segments.find(segment => segment.id === activeId);

    const updateInfoPanel = (currentActiveId: string) => {
      const currentSegment = segments.find(segment => segment.id === currentActiveId);
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Segment Control</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmento Activo:</strong> ${currentSegment ? currentSegment.label : currentActiveId}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Segmentos totales:</strong> ${segments.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> ${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${segments.map(s => s.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Segment Control usando createSegmentControl para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';
        
        // Crear segmentos con listeners
        createSegmentControl({
          segments: segments,
          activeSegmentId: activeId,
          onSegmentChange: (segmentId, segmentElement) => {
            // Segmento cambiado
            // Actualizar panel de información
            updateInfoPanel(segmentId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Segment Control:', error);
      }
    });

    return wrapper;
  }
};

// Helper para renderizar Segment Control de manera consistente
function renderSegmentControlStory(options: SegmentControlOptions) {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 40px;
    background: var(--modifiers-normal-color-light-bg-2);
    border-radius: 8px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  `;
  
  const segmentContainer = document.createElement('div');
  segmentContainer.id = `segment-control-container-${Date.now()}`;
  
  container.appendChild(segmentContainer);
  
  // Crear segment control con listeners
  requestAnimationFrame(() => {
    createSegmentControl(options, segmentContainer.id);
  });
  
  return container;
}

/**
 * WithIcons
 * Con iconos
 */
export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con iconos en todos los segmentos.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Sin iconos
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', active: true },
      { id: 'segment-2', label: 'Chart' },
      { id: 'segment-3', label: 'Settings' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control sin iconos (solo texto).',
      },
    },
  },
};

/**
 * ActiveSegment
 * Con segmento activo
 */
export const ActiveSegment: Story = {
  name: 'Active Segment',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home' },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', active: true },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-2'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmento activo (segundo segmento).',
      },
    },
  },
};

/**
 * NoActiveSegment
 * Sin segmento activo (usa el primero por defecto)
 */
export const NoActiveSegment: Story = {
  name: 'No Active Segment',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home' },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ]
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control sin segmento activo especificado (usa el primero por defecto).',
      },
    },
  },
};

/**
 * DisabledSegment
 * Con segmento deshabilitado
 */
export const DisabledSegment: Story = {
  name: 'Disabled Segment',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', disabled: true },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmento deshabilitado (no clickeable).',
      },
    },
  },
};

/**
 * AllSegmentsDisabled
 * Todos los segmentos deshabilitados
 */
export const AllSegmentsDisabled: Story = {
  name: 'All Segments Disabled',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', disabled: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', disabled: true },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog', disabled: true }
    ]
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con todos los segmentos deshabilitados.',
      },
    },
  },
};

/**
 * SegmentWithURL
 * Segmento con URL (navegación)
 */
export const SegmentWithURL: Story = {
  name: 'Segment - With URL',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', url: '#home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', url: '#chart' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog', url: '#settings' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmentos que tienen URLs (navegación).',
      },
    },
  },
};

/**
 * SegmentWithOnClick
 * Segmento con onClick (callback)
 */
export const SegmentWithOnClick: Story = {
  name: 'Segment - With OnClick',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', onClick: () => alert('Home clicked'), active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', onClick: () => alert('Chart clicked') },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog', onClick: () => alert('Settings clicked') }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmentos que tienen callbacks onClick.',
      },
    },
  },
};

/**
 * SegmentWithoutURLOrOnClick
 * Segmento sin URL ni onClick (solo cambio visual)
 */
export const SegmentWithoutURLOrOnClick: Story = {
  name: 'Segment - Without URL or OnClick',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmentos sin URL ni onClick (solo cambio visual).',
      },
    },
  },
};

/**
 * OnSegmentChangeCallback
 * Callback cuando cambia el segmento activo
 */
export const OnSegmentChangeCallback: Story = {
  name: 'On Segment Change Callback',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1',
    onSegmentChange: (segmentId, segmentElement) => {
      alert(`Segmento cambiado: ${segmentId}`);
    }
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con callback onSegmentChange cuando cambia el segmento activo.',
      },
    },
  },
};

/**
 * FewSegments
 * Pocos segmentos (2-3)
 */
export const FewSegments: Story = {
  name: 'Few Segments',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con pocos segmentos (2 segmentos).',
      },
    },
  },
};

/**
 * ManySegments
 * Muchos segmentos (8-10)
 */
export const ManySegments: Story = {
  name: 'Many Segments',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' },
      { id: 'segment-4', label: 'Star', icon: 'fa-star' },
      { id: 'segment-5', label: 'Book', icon: 'fa-book' },
      { id: 'segment-6', label: 'User', icon: 'fa-user' },
      { id: 'segment-7', label: 'Bell', icon: 'fa-bell' },
      { id: 'segment-8', label: 'Envelope', icon: 'fa-envelope' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con muchos segmentos (8 segmentos).',
      },
    },
  },
};

/**
 * SingleSegment
 * Un solo segmento
 */
export const SingleSegment: Story = {
  name: 'Single Segment',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con un solo segmento.',
      },
    },
  },
};

/**
 * LongLabels
 * Labels largos
 */
export const LongLabels: Story = {
  name: 'Long Labels',
  args: {
    segments: [
      { id: 'segment-1', label: 'Configuración Avanzada', icon: 'fa-cog', active: true },
      { id: 'segment-2', label: 'Análisis de Datos', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'Gestión de Usuarios', icon: 'fa-user' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con labels largos.',
      },
    },
  },
};

/**
 * ShortLabels
 * Labels cortos
 */
export const ShortLabels: Story = {
  name: 'Short Labels',
  args: {
    segments: [
      { id: 'segment-1', label: 'H', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'C', icon: 'fa-chart-line' },
      { id: 'segment-3', label: 'S', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con labels cortos.',
      },
    },
  },
};

/**
 * IconActiveSolid
 * Icono activo (solid)
 */
export const IconActiveSolid: Story = {
  name: 'Icon - Active (Solid)',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control mostrando icono activo en estilo solid (fas).',
      },
    },
  },
};

/**
 * IconInactiveRegular
 * Icono inactivo (regular)
 */
export const IconInactiveRegular: Story = {
  name: 'Icon - Inactive (Regular)',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home' },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', active: true }
    ],
    activeSegmentId: 'segment-2'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control mostrando icono inactivo en estilo regular (far).',
      },
    },
  },
};

/**
 * MixedSegments
 * Segmentos mixtos (algunos con iconos, algunos sin)
 */
export const MixedSegments: Story = {
  name: 'Mixed Segments',
  args: {
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true },
      { id: 'segment-2', label: 'Chart' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog' }
    ],
    activeSegmentId: 'segment-1'
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control con segmentos mixtos (algunos con iconos, algunos sin).',
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
    segments: [
      { id: 'segment-1', label: 'Home', icon: 'fa-home', active: true, onClick: () => console.log('Home clicked') },
      { id: 'segment-2', label: 'Chart', icon: 'fa-chart-line', url: '#chart' },
      { id: 'segment-3', label: 'Settings', icon: 'fa-cog', onClick: () => console.log('Settings clicked') },
      { id: 'segment-4', label: 'Disabled', icon: 'fa-ban', disabled: true }
    ],
    activeSegmentId: 'segment-1',
    onSegmentChange: (segmentId, segmentElement) => {
      console.log('Segmento cambiado:', segmentId);
    }
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control completo con todas las opciones habilitadas.',
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
    segments: [
      { id: 'segment-1', label: 'Home', active: true },
      { id: 'segment-2', label: 'Chart' }
    ]
  },
  render: (args) => renderSegmentControlStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Segment Control mínimo con solo las opciones esenciales.',
      },
    },
  },
};

