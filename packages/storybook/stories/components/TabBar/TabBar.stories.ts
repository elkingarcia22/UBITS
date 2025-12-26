/**
 * TabBar Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createTabBar } from '../../../components/tabbar/src/TabBarProvider';
import {
	defaultFloatingMenuSections,
	defaultProfileMenuItems,
} from '../../../components/tabbar/src/configs/defaultFloatingMenu';
import type {
	TabBarOptions,
	TabBarItem,
	FloatingMenuSection,
	ProfileMenuItem,
} from '../../../components/tabbar/src/types/TabBarOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../components/tabbar/src/styles/tabbar.css';

// Configuraciones de Floating Menu para cada variante
const colaboradorFloatingMenuSections: FloatingMenuSection[] = [
	{
		id: 'aprendizaje',
		title: 'Aprendizaje',
		icon: 'graduation-cap',
		subitems: [
			{ id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
			{ id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
			{
				id: 'corporativa',
				title: 'U. Corporativa',
				icon: 'building-columns',
				url: 'u-corporativa.html',
			},
			{ id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' },
		],
	},
	{
		id: 'diagnostico',
		title: 'Diagnóstico',
		icon: 'chart-mixed',
		url: 'diagnostico.html',
		isLink: true,
		clickable: true,
	},
	{
		id: 'desempeno',
		title: 'Desempeño',
		icon: 'bars-progress',
		subitems: [
			{
				id: 'evaluaciones-360',
				title: 'Evaluaciones 360',
				icon: 'chart-pie',
				url: 'evaluaciones-360.html',
			},
			{ id: 'objetivos', title: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
			{ id: 'metricas', title: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
			{ id: 'reportes', title: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' },
		],
	},
	{
		id: 'encuestas',
		title: 'Encuestas',
		icon: 'clipboard-list-check',
		url: 'encuestas.html',
		isLink: true,
		clickable: false,
	},
	{
		id: 'reclutamiento',
		title: 'Reclutamiento',
		icon: 'users',
		url: 'reclutamiento.html',
		isLink: true,
		clickable: true,
	},
	{
		id: 'tareas',
		title: 'Tareas',
		icon: 'layer-group',
		subitems: [
			{ id: 'planes', title: 'Planes', icon: 'calendar', url: 'planes.html' },
			{ id: 'tareas', title: 'Tareas', icon: 'tasks', url: 'tareas.html' },
		],
	},
	{
		id: 'ubits-ai',
		title: 'UBITS AI',
		icon: 'sparkles',
		url: 'ubits-ai.html',
		isLink: true,
		clickable: true,
	},
];

// Items del Profile Menu por variante
const colaboradorProfileMenuItems: ProfileMenuItem[] = [
	{
		id: 'ver-perfil',
		label: 'Ver mi perfil',
		icon: 'user',
		url: 'profile.html',
	},
	{
		id: 'admin-mode',
		label: 'Modo Administrador',
		icon: 'laptop',
		url: 'template-admin.html',
	},
	{
		id: 'cambio-contraseña',
		label: 'Cambio de contraseña',
		icon: 'key',
		onClick: () => {
			// Sin acción
		},
	},
	{
		id: 'cerrar-sesion',
		label: 'Cerrar sesión',
		icon: 'sign-out-alt',
		onClick: () => {
			// Sin acción
		},
	},
];

const meta: Meta<
	TabBarOptions & {
		variant?: 'colaborador' | 'admin';
		activeTabId?: string;
		darkModeEnabled?: boolean;
		visible?: boolean;
	}
> = {
	title: 'Navegación/TabBar',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {codePanel: true,
				
			description: {
				component:
					'Componente TabBar UBITS de navegación inferior para móviles. Reemplaza al sidebar en pantallas pequeñas (< 1024px) con items personalizables con iconos o avatares, dark mode toggle, Floating Menu (accordions) y Profile Menu (dropdown). Soporta 2 variantes: colaborador y admin.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-tabbar',
			api: {
				create: 'window.UBITS.TabBar.create',
				tag: '<ubits-tabbar>',
			},
			dependsOn: {
				required: [], // TabBar no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [
				'⚙️-functional-floating-menu', // Floating Menu con accordions (se muestra al hacer click en "Módulos")
				'⚙️-functional-profile-menu', // Profile Menu dropdown (se muestra al hacer click en "Mi perfil")
				'⚙️-functional-dark-mode-toggle', // Toggle de dark mode interno
			],
			slots: {
				items: [], // Items del TabBar son internos
				floatingMenu: [], // Floating Menu es interno
				profileMenu: [], // Profile Menu es interno
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-border-1',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['items'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `createTabBar(document.getElementById('tabbar-container'), {
  containerId: 'tabbar-container',
  variant: 'colaborador',
  items: [],
  onTabChange: function(tabId) {}
});`,
				basic: `createTabBar(document.getElementById('tabbar-container'), {
  containerId: 'tabbar-container',
  variant: 'colaborador',
  items: []
});`,
				admin: `createTabBar(document.getElementById('tabbar-container'), {
  containerId: 'tabbar-container',
  variant: 'admin',
  items: []
});`,
			},
			variants: {
				variant: ['colaborador', 'admin'],
			},
			events: {
				onTabChange: {
					type: 'Event',
					description: 'Emitted when active tab changes',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'navegacion-tabbar--implementation',
				storiesByExample: {
					canonical: 'navegacion-tabbar--implementation',
					basic: 'navegacion-tabbar--default',
					admin: 'navegacion-tabbar--admin',
				},
			},
			intents: {
				'tabbar.navigation': 'canonical',
				'tabbar.mobile': 'canonical',
				'tabbar.colaborador': 'canonical',
				'tabbar.admin': 'admin',
			},
		}),
	},
	args: {
		containerId: 'tabbar-story-container',
		variant: 'colaborador',
		items: [
			{
				id: 'modulos',
				label: 'Módulos',
				icon: 'th-large',
			},
			{
				id: 'perfil',
				label: 'Mi perfil',
				avatar: '/images/Profile-image.jpg',
				avatarAlt: 'Mi perfil',
			},
			{
				id: 'modo-oscuro',
				label: 'Modo oscuro',
				icon: 'moon',
			},
		],
		activeTabId: 'modulos',
		darkModeEnabled: true,
		visible: true,
	} as TabBarOptions & {
		variant?: 'colaborador' | 'admin';
		activeTabId?: string;
		darkModeEnabled?: boolean;
		visible?: boolean;
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['colaborador', 'admin'],
			description: 'Variante del TabBar: colaborador o admin',
			table: {
				type: { summary: 'colaborador | admin' },
				defaultValue: { summary: 'colaborador' },
			},
		},
		activeTabId: {
			control: { type: 'select' },
			options: ['modulos', 'perfil', 'modo-oscuro'],
			description: 'ID del tab activo',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'modulos' },
			},
		},
		darkModeEnabled: {
			control: { type: 'boolean' },
			description: 'Habilitar dark mode toggle',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		visible: {
			control: { type: 'boolean' },
			description: 'Mostrar el TabBar (por defecto false, solo visible en móvil)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<
	TabBarOptions & {
		variant?: 'colaborador' | 'admin';
		activeTabId?: string;
		darkModeEnabled?: boolean;
		visible?: boolean;
	}
>;

// Función helper para obtener configuración según variante
function getTabBarConfig(variant: 'colaborador' | 'admin') {
	return {
		floatingMenuSections:
			variant === 'admin' ? defaultFloatingMenuSections : colaboradorFloatingMenuSections,
		profileMenuItems:
			variant === 'admin' ? defaultProfileMenuItems : colaboradorProfileMenuItems,
	};
}

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'tabbar-implementation-container',
		variant: 'colaborador',
		items: [
			{
				id: 'modulos',
				label: 'Módulos',
				icon: 'th-large',
			},
			{
				id: 'perfil',
				label: 'Mi perfil',
				avatar: '/images/Profile-image.jpg',
				avatarAlt: 'Mi perfil',
			},
			{
				id: 'modo-oscuro',
				label: 'Modo oscuro',
				icon: 'moon',
			},
		],
		activeTabId: 'modulos',
		darkModeEnabled: true,
		visible: true,
	} as TabBarOptions & {
		variant?: 'colaborador' | 'admin';
		activeTabId?: string;
		darkModeEnabled?: boolean;
		visible?: boolean;
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				
				type: 'code',
				state: 'open',
				code: `// 1. Crear contenedor HTML
<div id="tabbar-implementation-container" style="position: relative; width: 100%; min-height: 576px;"></div>

// 2. Crear TabBar con configuración explícita
window.UBITS.TabBar.create({
  containerId: 'tabbar-implementation-container',
  items: [
    {
      id: 'modulos',
      label: 'Módulos',
      icon: 'th-large'
    },
    {
      id: 'perfil',
      label: 'Mi perfil',
      avatar: '/images/Profile-image.jpg',
      avatarAlt: 'Mi perfil'
    },
    {
      id: 'modo-oscuro',
      label: 'Modo oscuro',
      icon: 'moon'
    }
  ],
  activeTabId: 'modulos',
  visible: true,
  darkModeEnabled: true,
  floatingMenuSections: [
    {
      id: 'aprendizaje',
      title: 'Aprendizaje',
      icon: 'graduation-cap',
      subitems: [
        { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
        { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
        { id: 'corporativa', title: 'U. Corporativa', icon: 'building-columns', url: 'u-corporativa.html' },
        { id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
      ]
    },
    {
      id: 'diagnostico',
      title: 'Diagnóstico',
      icon: 'chart-mixed',
      url: 'diagnostico.html',
      isLink: true,
      clickable: true
    },
    {
      id: 'desempeno',
      title: 'Desempeño',
      icon: 'bars-progress',
      subitems: [
        { id: 'evaluaciones-360', title: 'Evaluaciones 360', icon: 'chart-pie', url: 'evaluaciones-360.html' },
        { id: 'objetivos', title: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
        { id: 'metricas', title: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
        { id: 'reportes', title: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' }
      ]
    }
    // ... más secciones según variante
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user', url: 'profile.html' },
    { id: 'admin-mode', label: 'Modo Administrador', icon: 'laptop', url: 'template-admin.html' },
    { id: 'cambio-contraseña', label: 'Cambio de contraseña', icon: 'key' },
    { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt' }
  ],
  onTabChange: (tabId, item, element) => {
    console.log('Tab changed:', tabId);
  },
  onDarkModeToggle: (isDark) => {
    console.log('Dark mode toggled:', isDark);
  }
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-tabbar');
		container.setAttribute('data-ubits-component', 'TabBar');
		container.id = args.containerId || 'tabbar-implementation-container';
		container.classList.add('ubits-tabbar-preview-container');
		container.style.cssText = `
      position: relative !important;
      width: 100%;
      max-width: 375px;
      min-height: 576px;
      margin: 0 auto;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
    `;

		const variant = args.variant || 'colaborador';
		const config = getTabBarConfig(variant);

		const tabBarElement = createTabBar({
			...args,
			container: container,
			visible: args.visible !== false,
			darkModeEnabled: args.darkModeEnabled !== false,
			floatingMenuSections: config.floatingMenuSections,
			profileMenuItems: config.profileMenuItems,
			onTabChange: args.onTabChange,
			onDarkModeToggle: args.onDarkModeToggle,
			onFloatingMenuItemClick: args.onFloatingMenuItemClick,
			onProfileMenuItemClick: args.onProfileMenuItemClick,
		});

		if (!tabBarElement) {
			container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: No se pudo crear el TabBar</p>`;
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo) - Simplificada
export const Default: Story = {
	args: {
		containerId: 'tabbar-story-container',
		variant: 'colaborador',
		items: [
			{
				id: 'modulos',
				label: 'Módulos',
				icon: 'th-large',
			},
			{
				id: 'perfil',
				label: 'Mi perfil',
				avatar: '/images/Profile-image.jpg',
				avatarAlt: 'Mi perfil',
			},
			{
				id: 'modo-oscuro',
				label: 'Modo oscuro',
				icon: 'moon',
			},
		],
		activeTabId: 'modulos',
		darkModeEnabled: true,
		visible: true,
	} as TabBarOptions & {
		variant?: 'colaborador' | 'admin';
		activeTabId?: string;
		darkModeEnabled?: boolean;
		visible?: boolean;
	},
	render: (args) => {
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      position: relative;
    `;

		const container = document.createElement('div');
		container.id = args.containerId || 'tabbar-story-container';
		container.classList.add('ubits-tabbar-preview-container');
		container.style.cssText = `
      position: relative !important;
      width: 100%;
      min-height: 576px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
    `;

		wrapper.appendChild(container);

		const variant = args.variant || 'colaborador';
		const config = getTabBarConfig(variant);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setTimeout(() => {
					try {
						const tabBarElement = createTabBar({
							...args,
							container: container,
							visible: args.visible !== false,
							darkModeEnabled: args.darkModeEnabled !== false,
							floatingMenuSections: config.floatingMenuSections,
							profileMenuItems: config.profileMenuItems,
							onTabChange: args.onTabChange,
							onDarkModeToggle: args.onDarkModeToggle,
							onFloatingMenuItemClick: args.onFloatingMenuItemClick,
							onProfileMenuItemClick: args.onProfileMenuItemClick,
						});

						if (!tabBarElement) {
							container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: No se pudo crear el TabBar</p>`;
						}
					} catch (error) {
						container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
					}
				}, 100);
			});
		});

		return wrapper;
	},
};
