import type { Meta, StoryObj } from '@storybook/html';
import { createSubNav } from '../../../components/subnav/src/SubNavProvider';
import type { SubNavOptions, SubNavVariant } from '../../../components/subnav/src/types/SubNavOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente
import '../../../components/subnav/src/styles/subnav.css';

/**
 * SubNav Component Stories
 *
 * Componente de navegación superior horizontal con 8 variantes predefinidas.
 * Muestra sub-navegaciones de los módulos principales con tabs
 * y navegación por URL o callbacks.
 */
const meta = {
	title: 'Navegación/SubNav',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			codePanel: true,
			description: {
				component:
					'Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-subnav',
			api: {
				create: 'window.UBITS.SubNav.create',
				tag: '<ubits-subnav>',
			},
			dependsOn: {
				required: [], // SubNav no depende de otros componentes UBITS
				optional: ['🧩-ux-icon'], // Iconos son opcionales (FontAwesome)
			},
			internals: [], // SubNav no tiene componentes internos privados
			slots: {}, // SubNav no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-1-disabled',
				'--modifiers-normal-color-light-fg-1-inverse',
				'--modifiers-normal-color-light-feedback-bg-success',
				'--modifiers-normal-color-light-feedback-border-success',
				'--font-family-noto-sans-font-family',
				'--font-body-md-size',
				'--font-body-md-line-height',
				'--weight-semibold',
				'--weight-medium',
				'--spacing-xs',
				'--spacing-sm',
				'--spacing-md',
				'--spacing-lg',
				'--radius-sm',
				'--radius-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['containerId'],
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `window.UBITS.SubNav.create(document.getElementById('subnav-container'), {
  containerId: 'subnav-container',
  variant: 'template',
  onTabChange: function(tabId) {}
});`,
				basic: `window.UBITS.SubNav.create(document.getElementById('subnav-container'), {
  containerId: 'subnav-container',
  variant: 'template'
});`,
				aprendizaje: `window.UBITS.SubNav.create(document.getElementById('subnav-container'), {
  containerId: 'subnav-container',
  variant: 'aprendizaje'
});`,
				desempeno: `window.UBITS.SubNav.create(document.getElementById('subnav-container'), {
  containerId: 'subnav-container',
  variant: 'desempeno'
});`,
			},
			variants: {
				variant: ['template', 'aprendizaje', 'desempeno', 'encuestas', 'tareas', 'empresa', 'admin-aprendizaje', 'admin-desempeno'],
			},
			events: {
				onTabChange: {
					type: 'Event',
					description: 'Emitted when active tab changes',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'navegacion-subnav--implementation',
				storiesByExample: {
					canonical: 'navegacion-subnav--implementation',
					basic: 'navegacion-subnav--default',
					aprendizaje: 'navegacion-subnav--aprendizaje',
					desempeno: 'navegacion-subnav--desempeno',
				},
			},
			intents: {
				'subnav.navigation': 'canonical',
				'subnav.top': 'canonical',
				'subnav.template': 'canonical',
				'subnav.aprendizaje': 'aprendizaje',
				'subnav.desempeno': 'desempeno',
			},
		}),
	},
	argTypes: {
		containerId: {
			control: false,
			description: 'ID del contenedor donde se renderizará el SubNav (requerido)',
			table: {
				type: { summary: 'string' },
			},
		},
		variant: {
			control: { type: 'select' },
			options: [
				'template',
				'aprendizaje',
				'desempeno',
				'encuestas',
				'tareas',
				'empresa',
				'admin-aprendizaje',
				'admin-desempeno',
			],
			description: 'Variante del SubNav (8 variantes predefinidas)',
			table: {
				type: { summary: 'SubNavVariant' },
				defaultValue: { summary: 'template' },
			},
		},
		activeTabId: {
			control: { type: 'text' },
			description: 'ID del tab activo',
			table: {
				type: { summary: 'string' },
			},
		},
		showIcons: {
			control: { type: 'boolean' },
			description: 'Mostrar iconos en los tabs del SubNav',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		tabs: {
			control: false,
			description: 'Tabs personalizados (solo para variante template)',
			table: {
				type: { summary: 'SubNavTab[]' },
			},
		},
		onTabChange: {
			control: false,
			description: 'Callback cuando cambia el tab activo',
			table: {
				type: { summary: '(tabId: string, tabElement: HTMLElement) => void' },
			},
		},
	},
} satisfies Meta<SubNavOptions & { variant?: SubNavVariant }>;

export default meta;
type Story = StoryObj<SubNavOptions & { variant?: SubNavVariant }>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'subnav-implementation-container',
		variant: 'template',
		activeTabId: 'section1',
		showIcons: true,
	},
	parameters: {
		docs: {
      source: {
        // ⭐ SNIPPET EXACTO para Autorun
        
        type: 'code',
        state: 'open',
        code: `// 1. Crear contenedor HTML
<div id="subnav-implementation-container"></div>

// 2. Crear SubNav
window.UBITS.SubNav.create({
  containerId: 'subnav-implementation-container',
  variant: 'template',
  activeTabId: 'section1',
  showIcons: false,
  onTabChange: (tabId, tabElement) => {
    console.log('Tab cambiado:', tabId);
  }
});`,
      },
    },
	},
	render: (args) => {
		console.log('🔵 [SubNav Implementation] Render iniciado', { 
			containerId: args.containerId, 
			variant: args.variant, 
			activeTabId: args.activeTabId,
			showIcons: args.showIcons 
		});

		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-subnav');
		container.setAttribute('data-ubits-component', 'SubNav');
		container.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

		// Crear contenedor interno para el SubNav
		const subNavContainer = document.createElement('div');
		const containerId = args.containerId || `subnav-implementation-container-${Date.now()}`;
		subNavContainer.id = containerId;
		subNavContainer.style.cssText = `
      width: 100%;
    `;
		container.appendChild(subNavContainer);
		console.log('🟢 [SubNav Implementation] Contenedor creado con ID:', containerId);

		// Función para crear/actualizar el SubNav
		const createSubNavContent = () => {
			const showIconsValue = args.showIcons ?? false;
			console.log('🟡 [SubNav Implementation] createSubNavContent llamado', { 
				containerId, 
				variant: args.variant || 'template',
				activeTabId: args.activeTabId || 'section1',
				showIcons: showIconsValue 
			});

			try {
				createSubNav({
					containerId: containerId,
					variant: args.variant || 'template',
					activeTabId: args.activeTabId || 'section1',
					showIcons: showIconsValue,
					onTabChange: args.onTabChange,
				});
				console.log('🟢 [SubNav Implementation] SubNav creado exitosamente');
				
				// Verificar que los iconos se muestren/oculten correctamente
				setTimeout(() => {
					const tabs = subNavContainer.querySelectorAll('.ubits-sub-nav-tab');
					tabs.forEach((tab, index) => {
						const icon = tab.querySelector('i');
						console.log(`🟡 [SubNav Implementation] Tab ${index}:`, {
							hasIcon: !!icon,
							iconVisible: icon ? window.getComputedStyle(icon).display !== 'none' : false,
							showIcons: showIconsValue
						});
					});
				}, 100);
			} catch (error) {
				console.error('❌ [SubNav Implementation] Error creando SubNav:', error);
				subNavContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
			}
		};

		// Crear SubNav usando requestAnimationFrame para asegurar que el DOM esté listo
		requestAnimationFrame(() => {
			// Verificar que el contenedor esté en el DOM
			const containerInDOM = document.getElementById(containerId);
			if (!containerInDOM) {
				console.warn(`⚠️ [SubNav Implementation] Contenedor ${containerId} no encontrado en DOM, reintentando...`);
				setTimeout(() => {
					createSubNavContent();
				}, 50);
				return;
			}

			console.log('🟢 [SubNav Implementation] Contenedor encontrado en DOM, creando SubNav');
			createSubNavContent();
		});

		// Observar cambios en args para re-renderizar cuando cambie showIcons
		let lastArgs = JSON.stringify({
			variant: args.variant,
			activeTabId: args.activeTabId,
			showIcons: args.showIcons,
		});

		const checkInterval = setInterval(() => {
			const currentArgs = JSON.stringify({
				variant: args.variant,
				activeTabId: args.activeTabId,
				showIcons: args.showIcons,
			});

			if (currentArgs !== lastArgs) {
				console.log('🟡 [SubNav Implementation] Args cambiaron, re-creando SubNav');
				console.log('🟡 [SubNav Implementation] Args anteriores:', lastArgs);
				console.log('🟡 [SubNav Implementation] Args nuevos:', currentArgs);
				lastArgs = currentArgs;
				createSubNavContent();
			}
		}, 100);

		// Limpiar intervalo cuando el componente se desmonte
		// Nota: En Storybook, esto se maneja automáticamente cuando se re-renderiza

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		containerId: 'subnav-story-container',
		variant: 'template',
		activeTabId: 'section1',
		showIcons: false,
	} as SubNavOptions & { variant?: SubNavVariant },
	render: (args) => {
		// Limpiar contenedor previo si existe
		const existingContainer = document.getElementById(args.containerId || 'subnav-story-container');
		if (existingContainer) {
			existingContainer.innerHTML = '';
		}

		const variant = args.variant || 'template';

		// Wrapper principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

		// Contenedor para el SubNav
		const container = document.createElement('div');
		container.id = args.containerId || 'subnav-story-container';
		container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

		wrapper.appendChild(container);

		// Crear el SubNav usando requestAnimationFrame para asegurar que el DOM esté listo
		requestAnimationFrame(() => {
			try {
				createSubNav({
					containerId: container.id,
					variant: variant,
					activeTabId: args.activeTabId || 'section1',
					showIcons: args.showIcons ?? false,
					onTabChange: (tabId, tabElement) => {
						console.log('Tab cambiado:', tabId);
					},
				});
			} catch (error) {
				console.error('Error creando SubNav:', error);
				container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
			}
		});

		return wrapper;
	},
};
