import type { Meta, StoryObj } from '@storybook/html';
import { renderAccordion, createAccordion } from '../../components/accordion/src/AccordionProvider';
import type { AccordionOptions, AccordionItem } from '../../components/accordion/src/types/AccordionOptions';
import '../../components/accordion/src/styles/accordion.css';

const meta: Meta<AccordionOptions> = {
  title: 'Layout/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Accordion UBITS con múltiples variantes: lista simple, tipo caja, chevron izquierda/derecha, iconos opcionales y sub-headers.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['list', 'boxed'],
      description: 'Variante del accordion',
      table: {
        defaultValue: { summary: 'list' },
        type: { summary: 'list | boxed' },
      },
    },
    chevronPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Posición del chevron',
      table: {
        defaultValue: { summary: 'right' },
        type: { summary: 'left | right' },
      },
    },
    allowMultiple: {
      control: { type: 'boolean' },
      description: 'Permitir múltiples items abiertos simultáneamente',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar iconos en los items',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<AccordionOptions>;

// Datos de ejemplo
const sampleItems: AccordionItem[] = [
  {
    id: '1',
    title: 'What makes coss ui different?',
    content: 'coss ui focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.',
  },
  {
    id: '2',
    title: 'How can I customize the components?',
    content: 'You can customize components using CSS variables, theme tokens, and component props. All components are built with customization in mind.',
  },
  {
    id: '3',
    title: 'Is coss ui optimized for performance?',
    content: 'Yes, coss ui is built with performance in mind. We optimize every component for maximum performance and minimal bundle size.',
  },
  {
    id: '4',
    title: 'How accessible are the components?',
    content: 'All components follow WCAG 2.1 accessibility standards and include proper ARIA attributes and keyboard navigation support.',
  },
];

const itemsWithIcons: AccordionItem[] = [
  {
    id: '1',
    title: 'What makes coss ui different?',
    content: 'coss ui focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.',
    icon: 'command',
    iconStyle: 'regular',
  },
  {
    id: '2',
    title: 'How can I customize the components?',
    content: 'You can customize components using CSS variables, theme tokens, and component props. All components are built with customization in mind.',
    icon: 'moon',
    iconStyle: 'regular',
  },
  {
    id: '3',
    title: 'Is coss ui optimized for performance?',
    content: 'Yes, coss ui is built with performance in mind. We optimize every component for maximum performance and minimal bundle size.',
    icon: 'bolt',
    iconStyle: 'regular',
  },
  {
    id: '4',
    title: 'How accessible are the components?',
    content: 'All components follow WCAG 2.1 accessibility standards and include proper ARIA attributes and keyboard navigation support.',
    icon: 'at',
    iconStyle: 'regular',
  },
];

const itemsWithSubHeaders: AccordionItem[] = [
  {
    id: '1',
    title: 'Connected accounts',
    subHeader: 'Manage your linked social and work accounts',
    content: 'Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.',
  },
  {
    id: '2',
    title: 'Notifications',
    subHeader: 'Customize your notification preferences',
    content: 'Configure how and when you receive notifications. Choose from email, push, or in-app notifications for different types of events.',
  },
  {
    id: '3',
    title: '2-step verification',
    subHeader: 'Add an extra layer of security to your account',
    content: 'Enable two-factor authentication to protect your account with an additional security layer. You can use an authenticator app or SMS for verification.',
  },
  {
    id: '4',
    title: 'Contact support',
    subHeader: "We're here to help 24/7",
    content: 'Get in touch with our support team for any questions or issues. We offer 24/7 support via email, chat, or phone.',
  },
];

/**
 * Interactive - All controls
 * Historia única con todos los controles para probar todas las variantes
 */
export const Interactive: Story = {
  name: 'Interactive - All Controls',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    
    // Determinar qué items usar según las opciones
    // Si showIcons es false, usar sampleItems (sin iconos)
    // Si showIcons es true, usar itemsWithIcons (con iconos)
    let itemsToUse = args.showIcons ? itemsWithIcons : sampleItems;
    
    const finalArgs = {
      ...args,
      items: itemsToUse,
    };
    
    // Limpiar y recrear el accordion cada vez que cambien los args
    container.innerHTML = '';
    createAccordion(container, finalArgs);
    
    return container;
  },
};

/**
 * VariantList
 * Accordion con variante 'list' (lista simple)
 */
export const VariantList: Story = {
  name: 'Variant - List',
  args: {
    items: sampleItems,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con variante lista simple. Chevron a la derecha, sin iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * VariantBoxed
 * Accordion con variante 'boxed' (tipo caja)
 */
export const VariantBoxed: Story = {
  name: 'Variant - Boxed',
  args: {
    items: itemsWithIcons,
    variant: 'boxed',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con variante tipo caja. Chevron a la derecha, con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * ChevronLeft
 * Accordion con chevron a la izquierda
 */
export const ChevronLeft: Story = {
  name: 'Chevron - Left',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'left',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con chevron a la izquierda. Variante lista, con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * ChevronRight
 * Accordion con chevron a la derecha (default)
 */
export const ChevronRight: Story = {
  name: 'Chevron - Right',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con chevron a la derecha (comportamiento por defecto). Variante lista, con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * AllowMultiple
 * Accordion que permite múltiples items abiertos simultáneamente
 */
export const AllowMultiple: Story = {
  name: 'Allow Multiple',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: true,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion que permite múltiples items abiertos simultáneamente. Variante lista, con iconos, chevron a la derecha.',
      },
    },
  },
};

/**
 * DefaultOpen
 * Accordion con items abiertos por defecto
 */
export const DefaultOpen: Story = {
  name: 'Default Open',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
    defaultOpen: ['1', '3'],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con items abiertos por defecto (items 1 y 3). Variante lista, con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * WithIcons
 * Accordion con iconos
 */
export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    items: itemsWithIcons,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con iconos estilo regular. Variante lista, chevron a la derecha, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * WithoutIcons
 * Accordion sin iconos
 */
export const WithoutIcons: Story = {
  name: 'Without Icons',
  args: {
    items: sampleItems,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion sin iconos. Variante lista, chevron a la derecha, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * IconStyleSolid
 * Accordion con iconos estilo solid
 */
export const IconStyleSolid: Story = {
  name: 'Icon Style - Solid',
  args: {
    items: itemsWithIcons.map(item => ({ ...item, iconStyle: 'solid' as const })),
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con iconos estilo solid. Variante lista, chevron a la derecha, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * WithSubHeaders
 * Accordion con subheaders
 */
export const WithSubHeaders: Story = {
  name: 'With Sub Headers',
  args: {
    items: itemsWithSubHeaders,
    variant: 'list',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion con subheaders en cada item. Variante lista, chevron a la derecha, sin iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * BoxedWithSubHeaders
 * Accordion variante boxed con subheaders
 */
export const BoxedWithSubHeaders: Story = {
  name: 'Boxed - With Sub Headers',
  args: {
    items: itemsWithSubHeaders.map(item => ({ ...item, icon: 'user', iconStyle: 'regular' as const })),
    variant: 'boxed',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion variante boxed con subheaders en cada item. Chevron a la derecha, con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * BoxedChevronLeft
 * Accordion variante boxed con chevron a la izquierda
 */
export const BoxedChevronLeft: Story = {
  name: 'Boxed - Chevron Left',
  args: {
    items: itemsWithIcons,
    variant: 'boxed',
    chevronPosition: 'left',
    allowMultiple: false,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion variante boxed con chevron a la izquierda. Con iconos, solo un item abierto a la vez.',
      },
    },
  },
};

/**
 * BoxedAllowMultiple
 * Accordion variante boxed que permite múltiples items abiertos
 */
export const BoxedAllowMultiple: Story = {
  name: 'Boxed - Allow Multiple',
  args: {
    items: itemsWithIcons,
    variant: 'boxed',
    chevronPosition: 'right',
    allowMultiple: true,
    showIcons: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion variante boxed que permite múltiples items abiertos simultáneamente. Con iconos, chevron a la derecha.',
      },
    },
  },
};

/**
 * BoxedDefaultOpen
 * Accordion variante boxed con items abiertos por defecto
 */
export const BoxedDefaultOpen: Story = {
  name: 'Boxed - Default Open',
  args: {
    items: itemsWithIcons,
    variant: 'boxed',
    chevronPosition: 'right',
    allowMultiple: false,
    showIcons: true,
    defaultOpen: ['2', '4'],
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '24px';
    container.style.maxWidth = '800px';
    createAccordion(container, args);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion variante boxed con items abiertos por defecto (items 2 y 4). Con iconos, chevron a la derecha, solo un item abierto a la vez.',
      },
    },
  },
};
