import type { Meta, StoryObj } from '@storybook/html';
import { renderCardContent, createCard, loadCardContent } from '../../components/card/src/CardContentProvider';
import type { CardData } from '../../components/card/src/types/CardContentOptions';
import { CONTENT_TYPES, COMPETENCIES, LANGUAGES, LEVELS, PROVIDERS } from '../../components/card/src/configs/cardConfigs';

const meta: Meta<CardData> = {
  title: 'Layout/Card Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Componente Card Content UBITS para mostrar contenido de aprendizaje. Soporta 11 tipos de contenido, 35 competencias oficiales, 18 proveedores, 3 niveles, 3 idiomas, y 3 estados (default, progress, completed).`,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: CONTENT_TYPES,
      description: 'Tipo de contenido',
      table: {
        defaultValue: { summary: 'Curso' },
        type: { summary: CONTENT_TYPES.join(' | ') },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título del contenido',
      table: {
        defaultValue: { summary: 'Segmenta la experiencia del cliente' },
      },
    },
    provider: {
      control: { type: 'select' },
      options: Object.keys(PROVIDERS),
      description: 'Proveedor/Aliado del contenido',
      table: {
        defaultValue: { summary: 'UBITS' },
        type: { summary: Object.keys(PROVIDERS).join(' | ') },
      },
    },
    providerLogo: {
      control: { type: 'text' },
      description: 'Ruta al logo del proveedor (se deriva automáticamente del provider si no se proporciona)',
      table: {
        type: { summary: 'string' },
      },
    },
    duration: {
      control: { type: 'select' },
      options: ['15 min', '30 min', '45 min', '60 min', '75 min', '90 min', '120 min', '180 min', '240 min'],
      description: 'Duración del contenido',
      table: {
        defaultValue: { summary: '60 min' },
      },
    },
    level: {
      control: { type: 'select' },
      options: ['Básico', 'Intermedio', 'Avanzado'],
      description: 'Nivel del contenido',
      table: {
        defaultValue: { summary: 'Básico' },
        type: { summary: 'Básico | Intermedio | Avanzado' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'progress', 'completed'],
      description: 'Estado de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | progress | completed' },
      },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progreso del contenido (0-100)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number (0-100)' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'Ruta a la imagen del contenido',
      table: {
        defaultValue: { summary: 'images/cards-learn/segmenta-la-experiencia-del-cliente.jpg' },
      },
    },
    competency: {
      control: { type: 'select' },
      options: COMPETENCIES,
      description: 'Competencia oficial UBITS',
      table: {
        defaultValue: { summary: 'Product design' },
        type: { summary: COMPETENCIES.join(' | ') },
      },
    },
    language: {
      control: { type: 'select' },
      options: LANGUAGES,
      description: 'Idioma del contenido',
      table: {
        defaultValue: { summary: 'Español' },
        type: { summary: LANGUAGES.join(' | ') },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CardData>;

// Función helper para obtener la ruta del logo del proveedor
function getProviderLogo(provider: string): string {
  const logoPath = PROVIDERS[provider];
  if (!logoPath) {
    return PROVIDERS['UBITS']; // Fallback a UBITS
  }
  // En Storybook, las imágenes están en staticDirs (mapeadas a /images)
  // Las rutas en PROVIDERS ahora usan 'assets/images/', así que necesitamos ajustar
  return logoPath.replace('assets/images/', '/images/');
}

// Función helper para construir CardData completo desde args
function buildCardData(args: Partial<CardData>): CardData {
  const provider = args.provider || 'UBITS';
  const providerLogo = args.providerLogo || getProviderLogo(provider);
  
  return {
    type: args.type || 'Curso',
    title: args.title || 'Segmenta la experiencia del cliente',
    provider: provider,
    providerLogo: providerLogo,
    duration: args.duration || '60 min',
    level: args.level || 'Básico',
    progress: args.progress ?? 0,
    status: args.status || 'default',
    image: args.image ? (args.image.startsWith('/') ? args.image : '/${args.image}') : '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
    competency: args.competency || 'Product design',
    language: args.language || 'Español',
  };
}

// Helper para renderizar una card en un contenedor
function renderCardContainer(cardData: CardData) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'flex-start';
  container.style.padding = '48px';
  container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
  container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
  container.style.borderRadius = '8px';
  container.style.minHeight = '400px';
  
  const wrapper = document.createElement('div');
  wrapper.style.maxWidth = '360px';
  wrapper.style.width = '100%';
  
  const cardElement = createCard(cardData);
  wrapper.appendChild(cardElement);
  container.appendChild(wrapper);
  
  return container;
}

export const Default: Story = {
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
};

/**
 * StatusDefault
 * Card con estado 'default' (sin badge de estado)
 */
export const StatusDefault: Story = {
  name: 'Status - Default',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con estado por defecto. No muestra badge de estado.',
      },
    },
  },
};

/**
 * StatusProgress
 * Card con estado 'progress' (badge "En progreso")
 */
export const StatusProgress: Story = {
  name: 'Status - Progress',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 45,
    status: 'progress',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con estado "En progreso". Muestra badge y barra de progreso al 45%.',
      },
    },
  },
};

/**
 * StatusCompleted
 * Card con estado 'completed' (badge "Completado")
 */
export const StatusCompleted: Story = {
  name: 'Status - Completed',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 100,
    status: 'completed',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con estado "Completado". Muestra badge y barra de progreso al 100%.',
      },
    },
  },
};

/**
 * LevelBasic
 * Card con nivel 'Básico'
 */
export const LevelBasic: Story = {
  name: 'Level - Basic',
  args: {
    type: 'Curso',
    title: 'Fundamentos de diseño de productos',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con nivel básico. Muestra icono gauge-min.',
      },
    },
  },
};

/**
 * LevelIntermediate
 * Card con nivel 'Intermedio'
 */
export const LevelIntermediate: Story = {
  name: 'Level - Intermediate',
  args: {
    type: 'Curso',
    title: 'Diseño avanzado de productos',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con nivel intermedio. Muestra icono gauge.',
      },
    },
  },
};

/**
 * LevelAdvanced
 * Card con nivel 'Avanzado'
 */
export const LevelAdvanced: Story = {
  name: 'Level - Advanced',
  args: {
    type: 'Curso',
    title: 'Maestría en diseño de productos',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Avanzado',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con nivel avanzado. Muestra icono gauge-max.',
      },
    },
  },
};

/**
 * Progress0
 * Card con progreso 0%
 */
export const Progress0: Story = {
  name: 'Progress - 0%',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con progreso 0%. La barra de progreso no es visible.',
      },
    },
  },
};

/**
 * Progress25
 * Card con progreso 25%
 */
export const Progress25: Story = {
  name: 'Progress - 25%',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 25,
    status: 'progress',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con progreso 25%. Muestra barra de progreso al 25%.',
      },
    },
  },
};

/**
 * Progress50
 * Card con progreso 50%
 */
export const Progress50: Story = {
  name: 'Progress - 50%',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 50,
    status: 'progress',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con progreso 50%. Muestra barra de progreso al 50%.',
      },
    },
  },
};

/**
 * Progress75
 * Card con progreso 75%
 */
export const Progress75: Story = {
  name: 'Progress - 75%',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 75,
    status: 'progress',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con progreso 75%. Muestra barra de progreso al 75%.',
      },
    },
  },
};

/**
 * Progress100
 * Card con progreso 100%
 */
export const Progress100: Story = {
  name: 'Progress - 100%',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 100,
    status: 'completed',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con progreso 100%. Muestra barra de progreso completa.',
      },
    },
  },
};

/**
 * TypeCurso
 * Card tipo 'Curso'
 */
export const TypeCurso: Story = {
  name: 'Type - Curso',
  args: {
    type: 'Curso',
    title: 'Fundamentos de diseño de productos',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Curso.',
      },
    },
  },
};

/**
 * TypeCapsula
 * Card tipo 'Cápsula'
 */
export const TypeCapsula: Story = {
  name: 'Type - Cápsula',
  args: {
    type: 'Cápsula',
    title: 'Tips rápidos de productividad',
    provider: 'UBITS',
    duration: '15 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Productividad',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Cápsula. Duración recomendada: 15 min.',
      },
    },
  },
};

/**
 * TypeCharla
 * Card tipo 'Charla'
 */
export const TypeCharla: Story = {
  name: 'Type - Charla',
  args: {
    type: 'Charla',
    title: 'El futuro del diseño de productos',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Charla.',
      },
    },
  },
};

/**
 * TypeArticulo
 * Card tipo 'Artículo'
 */
export const TypeArticulo: Story = {
  name: 'Type - Artículo',
  args: {
    type: 'Artículo',
    title: 'Mejores prácticas en UX design',
    provider: 'UBITS',
    duration: '15 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Artículo. Duración recomendada: 15 min.',
      },
    },
  },
};

/**
 * TypePodcast
 * Card tipo 'Podcast'
 */
export const TypePodcast: Story = {
  name: 'Type - Podcast',
  args: {
    type: 'Podcast',
    title: 'Conversaciones sobre innovación',
    provider: 'UBITS',
    duration: '45 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Innovación',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Podcast.',
      },
    },
  },
};

/**
 * TypeLibro
 * Card tipo 'Libro'
 */
export const TypeLibro: Story = {
  name: 'Type - Libro',
  args: {
    type: 'Libro',
    title: 'Diseño de productos digitales',
    provider: 'UBITS',
    duration: '120 min',
    level: 'Avanzado',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Libro.',
      },
    },
  },
};

/**
 * TypeIdeasDeLibro
 * Card tipo 'Ideas de libro'
 */
export const TypeIdeasDeLibro: Story = {
  name: 'Type - Ideas de libro',
  args: {
    type: 'Ideas de libro',
    title: 'Conceptos clave de liderazgo',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Liderazgo',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Ideas de libro.',
      },
    },
  },
};

/**
 * TypeCasoDeEstudio
 * Card tipo 'Caso de estudio'
 */
export const TypeCasoDeEstudio: Story = {
  name: 'Type - Caso de estudio',
  args: {
    type: 'Caso de estudio',
    title: 'Transformación digital en empresas',
    provider: 'UBITS',
    duration: '90 min',
    level: 'Avanzado',
    progress: 0,
    status: 'default',
    competency: 'Gestión del cambio',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Caso de estudio.',
      },
    },
  },
};

/**
 * TypeDocumentoTecnico
 * Card tipo 'Documento técnico'
 */
export const TypeDocumentoTecnico: Story = {
  name: 'Type - Documento técnico',
  args: {
    type: 'Documento técnico',
    title: 'Arquitectura de software moderno',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Avanzado',
    progress: 0,
    status: 'default',
    competency: 'Desarrollo de software',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Documento técnico.',
      },
    },
  },
};

/**
 * TypeEjerciciosDePractica
 * Card tipo 'Ejercicios de práctica'
 */
export const TypeEjerciciosDePractica: Story = {
  name: 'Type - Ejercicios de práctica',
  args: {
    type: 'Ejercicios de práctica',
    title: 'Práctica de programación en JavaScript',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Desarrollo web',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Ejercicios de práctica.',
      },
    },
  },
};

/**
 * TypeRutaDeAprendizaje
 * Card tipo 'Ruta de aprendizaje'
 */
export const TypeRutaDeAprendizaje: Story = {
  name: 'Type - Ruta de aprendizaje',
  args: {
    type: 'Ruta de aprendizaje',
    title: 'Ruta completa de desarrollo web',
    provider: 'UBITS',
    duration: '120 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Desarrollo web',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card tipo Ruta de aprendizaje. Duración recomendada: 120 min.',
      },
    },
  },
};

/**
 * LanguageSpanish
 * Card en idioma 'Español'
 */
export const LanguageSpanish: Story = {
  name: 'Language - Spanish',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card en idioma Español.',
      },
    },
  },
};

/**
 * LanguageEnglish
 * Card en idioma 'Inglés'
 */
export const LanguageEnglish: Story = {
  name: 'Language - English',
  args: {
    type: 'Curso',
    title: 'Customer Experience Segmentation',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Inglés',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card en idioma Inglés.',
      },
    },
  },
};

/**
 * LanguagePortuguese
 * Card en idioma 'Portugués'
 */
export const LanguagePortuguese: Story = {
  name: 'Language - Portuguese',
  args: {
    type: 'Curso',
    title: 'Segmentação da experiência do cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Portugués',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card en idioma Portugués.',
      },
    },
  },
};

/**
 * ProviderUBITS
 * Card con proveedor 'UBITS'
 */
export const ProviderUBITS: Story = {
  name: 'Provider - UBITS',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con proveedor UBITS.',
      },
    },
  },
};

/**
 * ProviderMicrosoft
 * Card con proveedor 'Microsoft'
 */
export const ProviderMicrosoft: Story = {
  name: 'Provider - Microsoft',
  args: {
    type: 'Curso',
    title: 'Azure Fundamentals',
    provider: 'Microsoft',
    duration: '90 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Herramientas tecnológicas',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con proveedor Microsoft.',
      },
    },
  },
};

/**
 * ProviderHubspot
 * Card con proveedor 'Hubspot'
 */
export const ProviderHubspot: Story = {
  name: 'Provider - Hubspot',
  args: {
    type: 'Curso',
    title: 'Inbound Marketing Fundamentals',
    provider: 'Hubspot',
    duration: '60 min',
    level: 'Intermedio',
    progress: 0,
    status: 'default',
    competency: 'Marketing digital',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con proveedor Hubspot.',
      },
    },
  },
};

/**
 * MultipleCards
 * Múltiples cards en un grid
 */
export const MultipleCards: Story = {
  name: 'Multiple Cards',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: () => {
    const cards: CardData[] = [
      {
        type: 'Curso',
        title: 'Segmenta la experiencia del cliente',
        provider: 'UBITS',
        providerLogo: getProviderLogo('UBITS'),
        duration: '60 min',
        level: 'Básico',
        progress: 0,
        status: 'default',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        competency: 'Product design',
        language: 'Español',
      },
      {
        type: 'Cápsula',
        title: 'Tips rápidos de productividad',
        provider: 'UBITS',
        providerLogo: getProviderLogo('UBITS'),
        duration: '15 min',
        level: 'Básico',
        progress: 45,
        status: 'progress',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        competency: 'Productividad',
        language: 'Español',
      },
      {
        type: 'Curso',
        title: 'Fundamentos de liderazgo',
        provider: 'Microsoft',
        providerLogo: getProviderLogo('Microsoft'),
        duration: '90 min',
        level: 'Intermedio',
        progress: 100,
        status: 'completed',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        competency: 'Liderazgo',
        language: 'Español',
      },
      {
        type: 'Artículo',
        title: 'Mejores prácticas en UX design',
        provider: 'Hubspot',
        providerLogo: getProviderLogo('Hubspot'),
        duration: '15 min',
        level: 'Avanzado',
        progress: 0,
        status: 'default',
        image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
        competency: 'Product design',
        language: 'Inglés',
      },
    ];

    const container = document.createElement('div');
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.borderRadius = '8px';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(360px, 1fr))';
    container.style.gap = '24px';

    cards.forEach(cardData => {
      const cardElement = createCard(cardData);
      container.appendChild(cardElement);
    });

    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Múltiples cards en un grid. Muestra diferentes estados, niveles, tipos y proveedores.',
      },
    },
  },
};

/**
 * OnClickHandler
 * Card con onClick handler
 */
export const OnClickHandler: Story = {
  name: 'OnClick Handler',
  args: {
    type: 'Curso',
    title: 'Segmenta la experiencia del cliente',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    const container = renderCardContainer(cardData);
    
    // Agregar onClick handler
    const cardElement = container.querySelector('.course-card') as HTMLElement;
    if (cardElement) {
      cardElement.style.cursor = 'pointer';
      cardElement.addEventListener('click', () => {
        alert(`Card clicked: ${cardData.title}`);
      });
    }
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con onClick handler. Muestra un alert cuando se hace click en la card.',
      },
    },
  },
};

/**
 * LongTitle
 * Card con título largo
 */
export const LongTitle: Story = {
  name: 'Long Title',
  args: {
    type: 'Curso',
    title: 'Este es un título muy largo que debería truncarse correctamente en la card para evitar que se desborde del contenedor y mantenga un diseño limpio y profesional',
    provider: 'UBITS',
    duration: '60 min',
    level: 'Básico',
    progress: 0,
    status: 'default',
    competency: 'Product design',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con título largo. Prueba el truncamiento de texto.',
      },
    },
  },
};

/**
 * CompleteExample
 * Card completa con todos los campos configurados
 */
export const CompleteExample: Story = {
  name: 'Complete Example',
  args: {
    type: 'Ruta de aprendizaje',
    title: 'Ruta completa de desarrollo web full-stack',
    provider: 'Microsoft',
    duration: '120 min',
    level: 'Avanzado',
    progress: 65,
    status: 'progress',
    competency: 'Desarrollo web',
    language: 'Español',
  },
  render: (args) => {
    const cardData = buildCardData(args);
    return renderCardContainer(cardData);
  },
  parameters: {
    docs: {
      description: {
        story: 'Card completa con todos los campos configurados: tipo, título, proveedor, duración, nivel, progreso, estado, competencia e idioma.',
      },
    },
  },
};

