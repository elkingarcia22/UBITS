/**
 * TreeMenu Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createUBITSContract } from '../../_shared/ubitsContract';

interface TreeNode {
	label: string;
	icon?: string;
	children?: TreeNode[];
}

interface TreeMenuOptions {
	showIcons?: boolean;
	showChevron?: boolean;
	maxLevels?: number;
	defaultExpanded?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	cascade?: boolean;
	nodes?: TreeNode[];
}

const meta: Meta<TreeMenuOptions> = {
	title: 'Navegación/TreeMenu',
	tags: ['autodocs'],
	parameters: {
		docs: {codePanel: true,
				
			description: {
				component:
					'Componente Tree Menu UBITS para mostrar estructuras jerárquicas con expandir/colapsar. Soporta iconos opcionales, múltiples niveles, chevron opcional y modo cascada o vertical. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-tree-menu',
			api: {
				create: 'renderTreeMenu', // Función helper que genera HTML string
				render: 'renderTreeMenu', // Misma función para render
			},
			dependsOn: {
				required: [], // TreeMenu no requiere otros componentes UBITS
				optional: [], // No tiene dependencias opcionales
			},
			internals: [], // TreeMenu no tiene componentes internos privados
			slots: {}, // TreeMenu no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-bg-active',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-body-xs-regular-fontsize',
				'--modifiers-normal-body-xs-regular-lineheight',
				'--modifiers-normal-body-sm-regular-fontsize',
				'--modifiers-normal-body-sm-regular-lineheight',
				'--modifiers-normal-body-md-regular-fontsize',
				'--modifiers-normal-body-md-regular-lineheight',
				'--modifiers-normal-body-lg-regular-fontsize',
				'--modifiers-normal-body-lg-regular-lineheight',
				'--p-spacing-mode-1-sm',
				'--p-spacing-mode-1-md',
				'--p-spacing-mode-1-lg',
				'--font-family-noto-sans-font-family',
				'--weight-regular',
				'--weight-semibold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['nodes'], // nodes es requerido para crear el árbol
			},
			// ⭐ CAMPOS EXTENDIDOS
			examples: {
				canonical: `renderTreeMenu({
  nodes: [
    { label: 'Node 1', children: [{ label: 'Child 1' }] }
  ],
  size: 'md',
  onNodeClick: function(nodeId) {}
});`,
				basic: `renderTreeMenu({
  nodes: [
    { label: 'Node 1', children: [{ label: 'Child 1' }] }
  ],
  size: 'md'
});`,
				withIcons: `renderTreeMenu({
  nodes: [
    { label: 'Node 1', icon: 'folder', children: [{ label: 'Child 1', icon: 'file' }] }
  ],
  showIcons: true,
  size: 'md'
});`,
				cascade: `renderTreeMenu({
  nodes: [
    { label: 'Node 1', children: [{ label: 'Child 1' }] }
  ],
  cascade: true,
  size: 'md'
});`,
			},
			variants: {
				size: ['xs', 'sm', 'md', 'lg'],
				showIcons: [true, false],
				showChevron: [true, false],
				cascade: [true, false],
				defaultExpanded: [true, false],
			},
			events: {
				onNodeClick: {
					type: 'Event',
					description: 'Emitted when a tree node is clicked',
				},
				onNodeToggle: {
					type: 'Event',
					description: 'Emitted when a tree node is expanded/collapsed',
				},
			},
			// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
			storybook: {
				canonicalStoryId: 'navegacion-treemenu--implementation',
				storiesByExample: {
					canonical: 'navegacion-treemenu--implementation',
					basic: 'navegacion-treemenu--default',
					withIcons: 'navegacion-treemenu--with-icons',
					cascade: 'navegacion-treemenu--cascade',
				},
			},
			intents: {
				'treemenu.hierarchy': 'canonical',
				'treemenu.tree': 'canonical',
				'treemenu.basic': 'canonical',
				'treemenu.with-icons': 'withIcons',
				'treemenu.cascade': 'cascade',
			},
		}),
	},
	argTypes: {
		showIcons: {
			control: { type: 'boolean' },
			description: 'Mostrar iconos en los nodos del árbol',
			table: {
				defaultValue: { summary: 'true' },
				type: { summary: 'boolean' },
			},
		},
		showChevron: {
			control: { type: 'boolean' },
			description: 'Mostrar icono de chevron (flecha) para expandir/colapsar',
			table: {
				defaultValue: { summary: 'true' },
				type: { summary: 'boolean' },
			},
		},
		maxLevels: {
			control: { type: 'number', min: 1, max: 5, step: 1 },
			description: 'Cantidad máxima de niveles en el árbol',
			table: {
				defaultValue: { summary: '3' },
				type: { summary: 'number' },
			},
		},
		defaultExpanded: {
			control: { type: 'boolean' },
			description: 'Expandir todos los nodos por defecto',
			table: {
				defaultValue: { summary: 'false' },
				type: { summary: 'boolean' },
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del texto y espaciado (matching List component)',
			table: {
				defaultValue: { summary: 'md' },
				type: { summary: 'xs | sm | md | lg' },
			},
		},
		cascade: {
			control: { type: 'boolean' },
			description:
				'Modo cascada (con indentación) o vertical (sin indentación, se despliega hacia abajo)',
			table: {
				defaultValue: { summary: 'true' },
				type: { summary: 'boolean' },
			},
		},
		nodes: {
			control: { type: 'object' },
			description: 'Estructura de nodos del árbol',
			table: {
				type: { summary: 'TreeNode[]' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<TreeMenuOptions>;

// Función para renderizar icono FontAwesome
function renderIcon(iconName: string, style: 'regular' | 'solid' = 'regular'): string {
	const iconClass = style === 'solid' ? 'fas' : 'far';
	return `<i class="${iconClass} fa-${iconName}"></i>`;
}

// Función para generar datos de ejemplo según niveles
function generateTreeData(maxLevels: number, showIcons: boolean): TreeNode[] {
	const icons = ['code', 'paint-brush', 'cog', 'users', 'chart-line', 'file-alt', 'folder', 'tag'];

	if (maxLevels === 1) {
		return [
			{ label: 'Engineering', icon: showIcons ? 'code' : undefined },
			{ label: 'Marketing', icon: showIcons ? 'chart-line' : undefined },
			{ label: 'Operations', icon: showIcons ? 'cog' : undefined },
		];
	}

	if (maxLevels === 2) {
		return [
			{
				label: 'Engineering',
				icon: showIcons ? 'code' : undefined,
				children: [
					{ label: 'Frontend', icon: showIcons ? 'paint-brush' : undefined },
					{ label: 'Backend', icon: showIcons ? 'cog' : undefined },
				],
			},
			{
				label: 'Marketing',
				icon: showIcons ? 'chart-line' : undefined,
				children: [
					{ label: 'Content', icon: showIcons ? 'file-alt' : undefined },
					{ label: 'Analytics', icon: showIcons ? 'chart-line' : undefined },
				],
			},
		];
	}

	if (maxLevels === 3) {
		return [
			{
				label: 'Engineering',
				icon: showIcons ? 'code' : undefined,
				children: [
					{
						label: 'Frontend',
						icon: showIcons ? 'paint-brush' : undefined,
						children: [
							{ label: 'Design System', icon: showIcons ? 'palette' : undefined },
							{ label: 'Components', icon: showIcons ? 'cubes' : undefined },
						],
					},
					{
						label: 'Backend',
						icon: showIcons ? 'cog' : undefined,
						children: [
							{ label: 'API', icon: showIcons ? 'server' : undefined },
							{ label: 'Database', icon: showIcons ? 'database' : undefined },
						],
					},
				],
			},
		];
	}

	if (maxLevels === 4) {
		return [
			{
				label: 'Engineering',
				icon: showIcons ? 'code' : undefined,
				children: [
					{
						label: 'Frontend',
						icon: showIcons ? 'paint-brush' : undefined,
						children: [
							{
								label: 'Design System',
								icon: showIcons ? 'palette' : undefined,
								children: [
									{ label: 'Components', icon: showIcons ? 'cubes' : undefined },
									{ label: 'Tokens', icon: showIcons ? 'tags' : undefined },
								],
							},
						],
					},
				],
			},
		];
	}

	// maxLevels === 5
	return [
		{
			label: 'Engineering',
			icon: showIcons ? 'code' : undefined,
			children: [
				{
					label: 'Frontend',
					icon: showIcons ? 'paint-brush' : undefined,
					children: [
						{
							label: 'Design System',
							icon: showIcons ? 'palette' : undefined,
							children: [
								{
									label: 'Components',
									icon: showIcons ? 'cubes' : undefined,
									children: [
										{
											label: 'Button',
											icon: showIcons ? 'square' : undefined,
											children: [
												{ label: 'Primary', icon: showIcons ? 'circle' : undefined },
												{ label: 'Secondary', icon: showIcons ? 'circle' : undefined },
											],
										},
										{ label: 'Input', icon: showIcons ? 'keyboard' : undefined },
									],
								},
								{ label: 'Tokens', icon: showIcons ? 'tags' : undefined },
							],
						},
					],
				},
			],
		},
	];
}

// Función para renderizar un nodo del árbol
function renderTreeNode(
	node: TreeNode,
	level: number = 0,
	maxLevels: number,
	defaultExpanded: boolean,
	showIcons: boolean,
	showChevron: boolean,
	cascade: boolean,
	size: 'xs' | 'sm' | 'md' | 'lg',
	uniqueId: string,
): string {
	const hasChildren = node.children && node.children.length > 0;
	const nodeId = `${uniqueId}-node-${level}-${node.label.toLowerCase().replace(/\s+/g, '-')}`;
	const isExpanded = defaultExpanded && hasChildren;

	// Clases de tipografía según tamaño (matching List component)
	const typographyClass =
		size === 'xs'
			? 'ubits-body-xs-regular'
			: size === 'sm'
				? 'ubits-body-sm-regular'
				: size === 'lg'
					? 'ubits-body-lg-regular'
					: 'ubits-body-md-regular';

	// Espaciado según modo (cascada o vertical)
	const paddingLeft = cascade
		? size === 'xs'
			? `calc(var(--p-spacing-mode-1-sm, 8px) * ${level})`
			: size === 'sm'
				? `calc(var(--p-spacing-mode-1-md, 16px) * ${level})`
				: size === 'lg'
					? `calc(var(--p-spacing-mode-1-lg, 24px) * ${level})`
					: `calc(var(--p-spacing-mode-1-md, 16px) * ${level})`
		: '0';

	// Tamaños de iconos y chevrons según tamaño (matching List component)
	const iconSize =
		size === 'xs' ? '12px' : size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
	const chevronSize =
		size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px';

	// Calcular valores exactos según tamaño (matching List component exactly)
	const padding =
		size === 'xs'
			? '8px 12px'
			: size === 'sm'
				? '10px 14px'
				: size === 'lg'
					? '16px 20px'
					: '12px 16px';
	const minHeight =
		size === 'xs' ? '28px' : size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px';
	const fontSize =
		size === 'xs'
			? 'var(--modifiers-normal-body-xs-regular-fontsize)'
			: size === 'sm'
				? 'var(--modifiers-normal-body-sm-regular-fontsize)'
				: size === 'lg'
					? 'var(--modifiers-normal-body-lg-regular-fontsize)'
					: 'var(--modifiers-normal-body-md-regular-fontsize)';
	const lineHeight =
		size === 'xs'
			? 'var(--modifiers-normal-body-xs-regular-lineheight)'
			: size === 'sm'
				? 'var(--modifiers-normal-body-sm-regular-lineheight)'
				: size === 'lg'
					? 'var(--modifiers-normal-body-lg-regular-lineheight)'
					: 'var(--modifiers-normal-body-md-regular-lineheight)';

	let html = `
    <div class="ubits-tree-node ${cascade ? 'ubits-tree-node--cascade' : 'ubits-tree-node--vertical'}" data-level="${level}" style="${cascade ? `padding-left: ${paddingLeft};` : ''}">
      <div 
        class="ubits-tree-node__content ${hasChildren ? 'ubits-tree-node__content--expandable' : ''}" 
        data-node-id="${nodeId}"
        data-size="${size}"
        style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important;"
        ${hasChildren ? `data-expanded="${isExpanded}"` : ''}
        role="${hasChildren ? 'button' : 'treeitem'}"
        ${hasChildren ? 'tabindex="0"' : ''}
        aria-expanded="${hasChildren ? isExpanded : undefined}"
        aria-label="${node.label}"
      >
        ${
					hasChildren && showChevron
						? `
          <span class="ubits-tree-node__chevron" style="width: ${chevronSize}; height: ${chevronSize};">
            <i class="far fa-chevron-${isExpanded ? 'down' : 'right'}" style="font-size: ${chevronSize};"></i>
          </span>
        `
						: hasChildren && !showChevron
							? `
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
        `
							: `
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
        `
				}
        ${
					showIcons && node.icon
						? `
          <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
            ${renderIcon(node.icon, 'regular')}
          </span>
        `
						: ''
				}
        <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${node.label}</span>
      </div>
      ${
				hasChildren
					? `
        <div class="ubits-tree-node__children ${cascade ? 'ubits-tree-node__children--cascade' : 'ubits-tree-node__children--vertical'}" data-children-id="${nodeId}" style="display: ${isExpanded ? 'block' : 'none'};">
          ${node
						.children!.map((child) =>
							renderTreeNode(
								child,
								level + 1,
								maxLevels,
								defaultExpanded,
								showIcons,
								showChevron,
								cascade,
								size,
								uniqueId,
							),
						)
						.join('')}
        </div>
      `
					: ''
			}
    </div>
  `;

	return html;
}

// Función para renderizar el árbol completo
function renderTreeMenu(args: TreeMenuOptions): string {
	const {
		showIcons = true,
		showChevron = true,
		maxLevels = 3,
		defaultExpanded = false,
		size = 'md',
		cascade = true,
		nodes,
	} = args;

	const uniqueId = `tree-${Date.now()}`;
	const treeData = nodes || generateTreeData(maxLevels, showIcons || false);

	const treeHTML = `
    <div class="ubits-tree-menu ${cascade ? 'ubits-tree-menu--cascade' : 'ubits-tree-menu--vertical'}" id="${uniqueId}" role="tree" data-ubits-id="🧩-ux-tree-menu">
      ${treeData
				.map((node) =>
					renderTreeNode(
						node,
						0,
						maxLevels || 3,
						defaultExpanded,
						showIcons || false,
						showChevron !== false,
						cascade !== false,
						size || 'md',
						uniqueId,
					),
				)
				.join('')}
    </div>
  `;

	return treeHTML;
}

export const Default: Story = {
	args: {
		showIcons: true,
		showChevron: true,
		maxLevels: 3,
		defaultExpanded: false,
		size: 'md',
		cascade: true,
	},
	render: (args) => {
		// Crear contenedor principal
		const container = document.createElement('div');
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      max-width: 600px;
    `;

		// Contenedor del árbol
		const treeContainer = document.createElement('div');
		treeContainer.style.cssText = `
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
      padding: var(--p-spacing-mode-1-md, 16px);
    `;

		// Renderizar el árbol
		const treeHTML = renderTreeMenu(args);
		treeContainer.innerHTML = treeHTML;

		// Agregar estilos CSS para el Tree Menu
		const styleId = 'ubits-tree-menu-styles';
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style');
			style.id = styleId;
			style.textContent = `
        .ubits-tree-menu {
          width: 100%;
          user-select: none;
        }
        
        .ubits-tree-node {
          position: relative;
        }
        
        .ubits-tree-node__content {
          display: flex;
          align-items: center;
          gap: var(--p-spacing-mode-1-sm, 8px);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--modifiers-normal-color-light-fg-1-high);
          background: transparent;
          position: relative;
          font-family: var(--font-family-noto-sans-font-family);
          box-sizing: border-box;
          margin: 0;
          border: none;
          overflow: visible;
        }
        
        /* Tamaños - Matching List component EXACTLY */
        .ubits-tree-node__content[data-size="xs"] {
          padding: 8px 12px !important;
          font-size: var(--modifiers-normal-body-xs-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-xs-regular-lineheight) !important;
          min-height: 28px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        .ubits-tree-node__content[data-size="sm"] {
          padding: 10px 14px !important;
          font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-sm-regular-lineheight) !important;
          min-height: 32px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        .ubits-tree-node__content[data-size="md"] {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        .ubits-tree-node__content[data-size="lg"] {
          padding: 16px 20px !important;
          font-size: var(--modifiers-normal-body-lg-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-lg-regular-lineheight) !important;
          min-height: 48px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        .ubits-tree-node__content:not([data-size]) {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          font-weight: var(--weight-regular, 400) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
          height: auto !important;
          margin: 0 !important;
        }
        
        /* Hover state - solo cambia el fondo, NO el color del texto */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-light-bg-2) !important;
        }
        
        /* El texto, iconos y chevron NO cambian de color en hover */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-fg-1-high) !important;
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron i {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        /* Active state */
        .ubits-tree-node__content--active,
        .ubits-tree-node__content[aria-selected="true"] {
          color: var(--modifiers-normal-color-light-accent-brand, #0c5bef) !important;
          background: var(--modifiers-normal-color-light-bg-active, rgba(12, 91, 239, 0.15)) !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__label,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-accent-brand, #0c5bef) !important;
          font-weight: 600 !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__icon,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-accent-brand, #0c5bef) !important;
        }
        
        .ubits-tree-node__content--active .ubits-tree-node__chevron i,
        .ubits-tree-node__content[aria-selected="true"] .ubits-tree-node__chevron i {
          color: var(--modifiers-normal-color-light-accent-brand, #0c5bef) !important;
        }
        
        /* Focus state */
        .ubits-tree-node__content--expandable:focus-visible {
          outline: 2px solid var(--modifiers-normal-color-light-accent-brand);
          outline-offset: -2px;
          border-radius: 6px;
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
          transition: background-color 0.2s ease;
        }
        
        .ubits-tree-node__chevron i {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium);
          width: 20px;
          transition: color 0.2s ease;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--modifiers-normal-color-light-fg-1-high) !important;
          transition: background-color 0.2s ease, font-weight 0.2s ease;
        }
        
        .ubits-tree-node__children {
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
        }
        
        .ubits-tree-menu--vertical .ubits-tree-node {
          padding-left: 0 !important;
        }
      `;
			document.head.appendChild(style);
		}

		// Agregar funcionalidad de expandir/colapsar y selección
		setTimeout(() => {
			const treeElement = treeContainer.querySelector('.ubits-tree-menu');
			if (treeElement) {
				treeElement.addEventListener('click', (e) => {
					const target = e.target as HTMLElement;
					const content = target.closest('.ubits-tree-node__content') as HTMLElement;

					if (!content) return;

					// Manejar expandir/colapsar para nodos con hijos
					if (content.classList.contains('ubits-tree-node__content--expandable')) {
						const nodeId = content.getAttribute('data-node-id');
						const children = treeElement.querySelector(
							`[data-children-id="${nodeId}"]`,
						) as HTMLElement;
						const chevron = content.querySelector('.ubits-tree-node__chevron i') as HTMLElement;
						const isExpanded = content.getAttribute('data-expanded') === 'true';

						if (children) {
							if (isExpanded) {
								children.style.display = 'none';
								content.setAttribute('data-expanded', 'false');
								content.setAttribute('aria-expanded', 'false');
								if (chevron && args.showChevron !== false) {
									chevron.className = 'far fa-chevron-right';
								}
							} else {
								children.style.display = 'block';
								content.setAttribute('data-expanded', 'true');
								content.setAttribute('aria-expanded', 'true');
								if (chevron && args.showChevron !== false) {
									chevron.className = 'far fa-chevron-down';
								}
							}
						}
					}

					// Manejar selección (active state) para todos los nodos
					const allContents = treeElement.querySelectorAll('.ubits-tree-node__content');
					allContents.forEach((node) => {
						node.classList.remove('ubits-tree-node__content--active');
						node.removeAttribute('aria-selected');
					});

					content.classList.add('ubits-tree-node__content--active');
					content.setAttribute('aria-selected', 'true');
				});

				// Soporte para teclado
				treeElement.addEventListener('keydown', (e) => {
					const target = e.target as HTMLElement;
					const content = target.closest('.ubits-tree-node__content') as HTMLElement;

					if (!content) return;

					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						content.click();
					}
				});
			}
		}, 100);

		container.appendChild(treeContainer);
		container.setAttribute('data-ubits-component', 'TreeMenu');
		container.setAttribute('data-ubits-id', `tree-menu-${Date.now()}`);

		return container;
	},
};

export const Implementation: Story = {
	args: {
		showIcons: true,
		showChevron: true,
		maxLevels: 3,
		defaultExpanded: false,
		size: 'md',
		cascade: true,
		nodes: [
			{
				label: 'Engineering',
				icon: 'code',
				children: [
					{ label: 'Frontend', icon: 'paint-brush' },
					{ label: 'Backend', icon: 'cog' },
				],
			},
			{
				label: 'Marketing',
				icon: 'chart-line',
				children: [
					{ label: 'Content', icon: 'file-alt' },
					{ label: 'Analytics', icon: 'chart-line' },
				],
			},
		],
	},
	render: (args) => {
		const container = document.createElement('div');
		container.id = 'tree-menu-container';
		container.style.cssText = `
      padding: var(--p-spacing-mode-1-lg, 24px);
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 8px;
    `;

		// Renderizar el árbol usando renderTreeMenu
		const treeHTML = renderTreeMenu(args);
		container.innerHTML = treeHTML;

		// Agregar estilos (mismo código que en Default)
		const styleId = 'ubits-tree-menu-styles';
		if (!document.getElementById(styleId)) {
			const style = document.createElement('style');
			style.id = styleId;
			style.textContent = `
        .ubits-tree-menu {
          width: 100%;
          user-select: none;
        }
        
        .ubits-tree-node {
          position: relative;
        }
        
        .ubits-tree-node__content {
          display: flex;
          align-items: center;
          gap: var(--p-spacing-mode-1-sm, 8px);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--modifiers-normal-color-light-fg-1-high);
          background: transparent;
          font-family: var(--font-family-noto-sans-font-family);
          box-sizing: border-box;
          margin: 0;
          border: none;
        }
        
        .ubits-tree-node__content[data-size="xs"] {
          padding: 8px 12px !important;
          font-size: var(--modifiers-normal-body-xs-regular-fontsize) !important;
          line-height: var(--modifiers-normal-body-xs-regular-lineheight) !important;
          min-height: 28px !important;
        }
        
        .ubits-tree-node__content[data-size="sm"] {
          padding: 10px 14px !important;
          font-size: var(--modifiers-normal-body-sm-regular-fontsize) !important;
          line-height: var(--modifiers-normal-body-sm-regular-lineheight) !important;
          min-height: 32px !important;
        }
        
        .ubits-tree-node__content[data-size="md"] {
          padding: 12px 16px !important;
          font-size: var(--modifiers-normal-body-md-regular-fontsize) !important;
          line-height: var(--modifiers-normal-body-md-regular-lineheight) !important;
          min-height: 40px !important;
        }
        
        .ubits-tree-node__content[data-size="lg"] {
          padding: 16px 20px !important;
          font-size: var(--modifiers-normal-body-lg-regular-fontsize) !important;
          line-height: var(--modifiers-normal-body-lg-regular-lineheight) !important;
          min-height: 48px !important;
        }
        
        /* Hover state - solo cambia el fondo, NO el color del texto */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) {
          background: var(--modifiers-normal-color-light-bg-2) !important;
        }
        
        /* El texto, iconos y chevron NO cambian de color en hover */
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__label {
          color: var(--modifiers-normal-color-light-fg-1-high) !important;
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__icon {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        .ubits-tree-node__content:hover:not(.ubits-tree-node__content--active) .ubits-tree-node__chevron i {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        .ubits-tree-node__content--active {
          color: var(--modifiers-normal-color-light-accent-brand);
          background: var(--modifiers-normal-color-light-bg-active);
        }
        
        .ubits-tree-node__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
          transition: background-color 0.2s ease;
        }
        
        .ubits-tree-node__chevron i {
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
        }
        
        .ubits-tree-node__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--modifiers-normal-color-light-fg-1-medium) !important;
          width: 20px;
          transition: background-color 0.2s ease;
        }
        
        .ubits-tree-node__label {
          flex: 1;
          color: var(--modifiers-normal-color-light-fg-1-high) !important;
          transition: background-color 0.2s ease, font-weight 0.2s ease;
        }
      `;
			document.head.appendChild(style);
		}

		// Inicializar funcionalidad y agregar logs detallados
		setTimeout(() => {
			const treeElement = container.querySelector('.ubits-tree-menu') as HTMLElement;
			if (treeElement) {
				// Agregar data-ubits-id si no está presente
				if (!treeElement.hasAttribute('data-ubits-id')) {
					treeElement.setAttribute('data-ubits-id', '🧩-ux-tree-menu');
				}
				// Logs detallados para verificar tokens CSS
				const root = document.documentElement;
				const computedStyle = getComputedStyle(root);
				
				const accentBrand = computedStyle.getPropertyValue('--modifiers-normal-color-light-accent-brand').trim();
				const bgActive = computedStyle.getPropertyValue('--modifiers-normal-color-light-bg-active').trim();
				const fg1High = computedStyle.getPropertyValue('--modifiers-normal-color-light-fg-1-high').trim();
				const bg2 = computedStyle.getPropertyValue('--modifiers-normal-color-light-bg-2').trim();
				
				console.log('🔵 [TreeMenu Default] Tokens CSS verificados:', {
					accentBrand: accentBrand || 'NO DEFINIDO',
					bgActive: bgActive || 'NO DEFINIDO',
					fg1High: fg1High || 'NO DEFINIDO',
					bg2: bg2 || 'NO DEFINIDO',
					timestamp: new Date().toISOString()
				});
				
				// Verificar elementos activos y sus estilos computados
				const activeElements = container.querySelectorAll('.ubits-tree-node__content--active, .ubits-tree-node__content[aria-selected="true"]');
				activeElements.forEach((el, index) => {
					const computed = getComputedStyle(el as HTMLElement);
					const color = computed.color;
					const backgroundColor = computed.backgroundColor;
					const label = (el as HTMLElement).querySelector('.ubits-tree-node__label')?.textContent || 'Sin label';
					
					console.log(`🟢 [TreeMenu Default] Elemento activo ${index + 1}:`, {
						label,
						color: color,
						backgroundColor: backgroundColor,
						hasActiveClass: el.classList.contains('ubits-tree-node__content--active'),
						ariaSelected: el.getAttribute('aria-selected'),
						timestamp: new Date().toISOString()
					});
				});
				
				// Verificar elementos en hover (simular)
				const allItems = container.querySelectorAll('.ubits-tree-node__content');
				console.log(`🟡 [TreeMenu Default] Total de items en el árbol: ${allItems.length}`);
				
				allItems.forEach((el, index) => {
					const computed = getComputedStyle(el as HTMLElement);
					const label = (el as HTMLElement).querySelector('.ubits-tree-node__label')?.textContent || 'Sin label';
					
					if (index < 3) { // Solo log de los primeros 3 para no saturar
						console.log(`🟡 [TreeMenu Default] Item ${index + 1}:`, {
							label,
							color: computed.color,
							backgroundColor: computed.backgroundColor,
							isActive: el.classList.contains('ubits-tree-node__content--active'),
						});
					}
				});
				
				treeElement.addEventListener('click', (e) => {
					const target = e.target as HTMLElement;
					const content = target.closest('.ubits-tree-node__content') as HTMLElement;
					if (!content) return;

					if (content.classList.contains('ubits-tree-node__content--expandable')) {
						const nodeId = content.getAttribute('data-node-id');
						const children = treeElement.querySelector(
							`[data-children-id="${nodeId}"]`,
						) as HTMLElement;
						const chevron = content.querySelector('.ubits-tree-node__chevron i') as HTMLElement;
						const isExpanded = content.getAttribute('data-expanded') === 'true';

						if (children) {
							if (isExpanded) {
								children.style.display = 'none';
								content.setAttribute('data-expanded', 'false');
								content.setAttribute('aria-expanded', 'false');
								if (chevron) chevron.className = 'far fa-chevron-right';
							} else {
								children.style.display = 'block';
								content.setAttribute('data-expanded', 'true');
								content.setAttribute('aria-expanded', 'true');
								if (chevron) chevron.className = 'far fa-chevron-down';
							}
						}
					}

					const allContents = treeElement.querySelectorAll('.ubits-tree-node__content');
					allContents.forEach((node) => {
						node.classList.remove('ubits-tree-node__content--active');
						node.removeAttribute('aria-selected');
					});

					content.classList.add('ubits-tree-node__content--active');
					content.setAttribute('aria-selected', 'true');
					
					// Forzar color azul correcto con estilo inline
					const root = document.documentElement;
					const computedRoot = getComputedStyle(root);
					const accentBrand = computedRoot.getPropertyValue('--modifiers-normal-color-light-accent-brand').trim() || '#0c5bef';
					const bgActive = computedRoot.getPropertyValue('--modifiers-normal-color-light-bg-active').trim() || 'rgba(12, 91, 239, 0.15)';
					
					// Aplicar color directamente al elemento y sus hijos
					content.style.color = accentBrand + ' !important';
					content.style.backgroundColor = bgActive + ' !important';
					
					const labelEl = content.querySelector('.ubits-tree-node__label');
					const iconEl = content.querySelector('.ubits-tree-node__icon');
					const chevronEl = content.querySelector('.ubits-tree-node__chevron i');
					
					if (labelEl) {
						(labelEl as HTMLElement).style.color = accentBrand + ' !important';
						(labelEl as HTMLElement).style.fontWeight = '600';
					}
					if (iconEl) {
						(iconEl as HTMLElement).style.color = accentBrand + ' !important';
					}
					if (chevronEl) {
						(chevronEl as HTMLElement).style.color = accentBrand + ' !important';
					}
					
					// Logs después de activar elemento
					setTimeout(() => {
						const computed = getComputedStyle(content);
						const label = content.querySelector('.ubits-tree-node__label')?.textContent || 'Sin label';
						
						console.log('🟢 [TreeMenu Default] Elemento activado:', {
							label,
							computedColor: computed.color,
							computedBackground: computed.backgroundColor,
							expectedAccentBrand: accentBrand,
							expectedBgActive: bgActive,
							hasActiveClass: content.classList.contains('ubits-tree-node__content--active'),
							ariaSelected: content.getAttribute('aria-selected'),
							timestamp: new Date().toISOString()
						});
					}, 50);
				});
			}
		}, 100);

		container.setAttribute('data-ubits-component', 'TreeMenu');
		container.setAttribute('data-ubits-id', `tree-menu-${Date.now()}`);

		return container;
	},
	parameters: {
		docs: {
			source: {type: 'code',
				state: 'open',
				code: `
// Función helper para renderizar TreeMenu
function renderTreeMenu(options) {
  const {
    showIcons = true,
    showChevron = true,
    maxLevels = 3,
    defaultExpanded = false,
    size = 'md',
    cascade = true,
    nodes = []
  } = options;

  // Generar HTML del árbol usando la función renderTreeMenu
  // Esta función genera HTML string con la estructura del árbol
  // Usa tokens UBITS para colores, tipografía y espaciado
  
  const treeHTML = renderTreeMenu({
    showIcons: true,
    showChevron: true,
    maxLevels: 3,
    defaultExpanded: false,
    size: 'md',
    cascade: true,
    nodes: [
      {
        label: 'Engineering',
        icon: 'code',
        children: [
          { label: 'Frontend', icon: 'paint-brush' },
          { label: 'Backend', icon: 'cog' }
        ]
      },
      {
        label: 'Marketing',
        icon: 'chart-line',
        children: [
          { label: 'Content', icon: 'file-alt' },
          { label: 'Analytics', icon: 'chart-line' }
        ]
      }
    ]
  });

  // Insertar en el contenedor
  const container = document.getElementById('tree-menu-container');
  if (container) {
    container.innerHTML = treeHTML;
  }

  // Agregar estilos CSS (ver código completo en el archivo de stories)
  // Inicializar event listeners para expandir/colapsar y selección
}

// Nota: renderTreeMenu retorna HTML string directamente
// Los estilos se deben agregar manualmente o desde un archivo CSS
// La funcionalidad de expandir/colapsar se debe inicializar manualmente
				`,
			},
		},
	},
};

