import type { UBITSContract } from './ubitsContract';

/**
 * UBITS Component Index
 * 
 * ⚠️ IMPORTANTE: Este archivo se genera automáticamente.
 * Para regenerar, ejecuta: npm run storybook:index
 * 
 * Última actualización: 2025-12-19T23:54:55.001Z
 */

export interface ComponentInfo {
  componentId: string;
  category: string;
  title: string;
  contract: UBITSContract;
  storyPath: string;
  providerPath: string;
  typesPath?: string;
}

export const UBITSComponentIndex: Record<string, ComponentInfo> = {
  '🧩-ux-stepper': {
    componentId: '🧩-ux-stepper',
    category: 'Layout',
    title: 'Stepper',
    contract: {
  componentId: '🧩-ux-stepper',
  api: {
    create: 'window.UBITS.Stepper.create',
    tag: '<ubits-stepper>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-active',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-disabled',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-feedback-bg-success-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
    '--modifiers-normal-color-light-feedback-border-success',
    '--modifiers-normal-color-light-feedback-border-error',
    '--modifiers-normal-color-light-feedback-border-warning',
    '--modifiers-normal-color-light-feedback-fg-success-subtle-default',
    '--modifiers-normal-color-light-feedback-fg-error-subtle-default',
    '--modifiers-normal-color-light-feedback-fg-warning-subtle-default',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-md-regular-fontsize',
    '--weight-semibold',
    '--p-spacing-mode-1-xs',
    '--p-spacing-mode-1-sm',
    '--p-spacing-mode-1-md',
    '--ubits-border-radius-full'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'steps'
    ]
  },
  examples: {
    basic: 'window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\\n  containerId: 'stepper-container',\\\n  steps: [\\\n    { number: 1, title: 'Step 1', state: 'default' },\\\n    { number: 2, title: 'Step 2', state: 'active' }\\\n  ],\\\n  orientation: 'horizontal',\\\n  size: 'md'\\\n});',
    vertical: 'window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\\n  containerId: 'stepper-container',\\\n  steps: [\\\n    { number: 1, title: 'Step 1', state: 'completed' },\\\n    { number: 2, title: 'Step 2', state: 'active' }\\\n  ],\\\n  orientation: 'vertical',\\\n  size: 'md'\\\n});',
    withError: 'window.UBITS.Stepper.create(document.getElementById('stepper-container'), {\\\n  containerId: 'stepper-container',\\\n  steps: [\\\n    { number: 1, title: 'Step 1', state: 'completed' },\\\n    { number: 2, title: 'Step 2', state: 'error' }\\\n  ],\\\n  orientation: 'horizontal',\\\n  size: 'md'\\\n});'
  },
  variants: {
    orientation: [
      'horizontal',
      'vertical'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'completed',
      'active',
      'error',
      'warning'
    ]
  },
  events: {
    onStepClick: {
      type: 'Event',
      description: 'Emitted when a step is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/Stepper.stories.ts',
    providerPath: 'packages/components/stepper/src/StepperProvider',
    typesPath: 'packages/components/stepper/src/types/StepperOptions',
  },
  '🧩-ux-data-table': {
    componentId: '🧩-ux-data-table',
    category: 'Data',
    title: 'Data Table',
    contract: {
  componentId: '🧩-ux-data-table',
  api: {
    create: 'window.UBITS.DataTable.create',
    tag: '<ubits-data-table>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button',
      '🧩-ux-input'
    ],
    optional: [
      '🧩-ux-checkbox',
      '🧩-ux-radio-button',
      '🧩-ux-toggle',
      '🧩-ux-pagination',
      '🧩-ux-progress',
      '🧩-ux-status-tag',
      '🧩-ux-avatar',
      '🧩-ux-badge',
      '🧩-ux-list',
      '🧩-ux-drawer',
      '🧩-ux-empty-state',
      '🧩-ux-search-button'
    ]
  },
  internals: [
    '⚙️-functional-scroll',
    '⚙️-functional-drag-handle',
    '⚙️-functional-expand-icon',
    '⚙️-functional-column-menu',
    '⚙️-functional-context-menu'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--modifiers-normal-color-light-feedback-accent-error',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-border-radius-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'columns',
      'rows'
    ]
  },
  examples: {
    basic: 'window.UBITS.DataTable.create({ columns: [{ id: \'name\', label: \'Nombre\' }], rows: [{ id: \'1\', name: \'Juan\' }] });',
    withPagination: 'window.UBITS.DataTable.create({ columns: [{ id: \'name\', label: \'Nombre\' }], rows: [{ id: \'1\', name: \'Juan\' }], pagination: { currentPage: 1, totalPages: 10 } });',
    withHeader: 'window.UBITS.DataTable.create({ columns: [{ id: \'name\', label: \'Nombre\' }], rows: [{ id: \'1\', name: \'Juan\' }], header: { buttons: [{ variant: \'primary\', text: \'Nuevo\' }] } });'
  },
  variants: {
    columnReorderable: [
      true,
      false
    ],
    rowReorderable: [
      true,
      false
    ],
    rowExpandable: [
      true,
      false
    ],
    columnSortable: [
      true,
      false
    ]
  },
  events: {
    onRowClick: {
      type: 'MouseEvent',
      description: 'Emitted when a row is clicked'
    },
    onRowSelect: {
      type: 'Event',
      description: 'Emitted when a row is selected'
    },
    onColumnReorder: {
      type: 'Event',
      description: 'Emitted when columns are reordered'
    }
  }
} as UBITSContract,
    storyPath: 'stories/DataTable.stories.ts',
    providerPath: 'packages/components/data-table/src/DataTableProvider',
    typesPath: 'packages/components/data-table/src/types/DataTableOptions',
  },
  '🧩-ux-tree-menu': {
    componentId: '🧩-ux-tree-menu',
    category: 'Navegación',
    title: 'TreeMenu',
    contract: {
  componentId: '🧩-ux-tree-menu',
  api: {
    create: 'renderTreeMenu'
  },
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
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'nodes'
    ]
  },
  examples: {
    basic: 'renderTreeMenu({\\\n  nodes: [\\\n    { label: 'Node 1', children: [{ label: 'Child 1' }] }\\\n  ],\\\n  size: 'md'\\\n});',
    withIcons: 'renderTreeMenu({\\\n  nodes: [\\\n    { label: 'Node 1', icon: 'folder', children: [{ label: 'Child 1', icon: 'file' }] }\\\n  ],\\\n  showIcons: true,\\\n  size: 'md'\\\n});',
    cascade: 'renderTreeMenu({\\\n  nodes: [\\\n    { label: 'Node 1', children: [{ label: 'Child 1' }] }\\\n  ],\\\n  cascade: true,\\\n  size: 'md'\\\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    showIcons: [
      true,
      false
    ],
    showChevron: [
      true,
      false
    ],
    cascade: [
      true,
      false
    ],
    defaultExpanded: [
      true,
      false
    ]
  },
  events: {
    onNodeClick: {
      type: 'Event',
      description: 'Emitted when a tree node is clicked'
    },
    onNodeToggle: {
      type: 'Event',
      description: 'Emitted when a tree node is expanded/collapsed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/TreeMenu/TreeMenu.stories.ts',
    providerPath: 'packages/components/treemenu/src/TreemenuProvider.ts',
    
  },
  '🧩-ux-tooltip': {
    componentId: '🧩-ux-tooltip',
    category: 'Feedback',
    title: 'Tooltip',
    contract: {
  componentId: '🧩-ux-tooltip',
  api: {
    create: 'window.UBITS.Tooltip.create',
    tag: '<ubits-tooltip>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción o mensaje del tooltip',\n  tailPosition: 'top'\n});',
    withButtons: 'window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción del tooltip',\n  showPrimaryButton: true,\n  primaryButtonLabel: 'Aceptar',\n  tailPosition: 'top'\n});',
    differentPosition: 'window.UBITS.Tooltip.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del tooltip',\n  description: 'Descripción del tooltip',\n  tailPosition: 'bottom'\n});'
  },
  variants: {
    width: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    tailPosition: [
      'top',
      'bottom',
      'left',
      'right'
    ],
    showTitle: [
      true,
      false
    ],
    showDescription: [
      true,
      false
    ],
    showPrimaryButton: [
      true,
      false
    ],
    showSecondaryButton: [
      true,
      false
    ],
    showTertiaryButton: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when tooltip is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Tooltip/Tooltip.stories.ts',
    providerPath: 'packages/../components/tooltip/src/TooltipProvider',
    typesPath: 'packages/../components/tooltip/src/types/TooltipOptions',
  },
  '🧩-ux-toggle': {
    componentId: '🧩-ux-toggle',
    category: 'Formularios',
    title: 'Toggle',
    contract: {
  componentId: '🧩-ux-toggle',
  api: {
    create: 'window.UBITS.Toggle.create',
    tag: '<ubits-toggle>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm',
    '--p-spacing-mode-1-sm'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Toggle.create({\n  checked: false,\n  size: 'md',\n  state: 'default'\n});',
    checked: 'window.UBITS.Toggle.create({\n  checked: true,\n  size: 'md',\n  state: 'default'\n});',
    withLabel: 'window.UBITS.Toggle.create({\n  label: 'Activar notificaciones',\n  checked: false,\n  size: 'md',\n  state: 'default'\n});',
    withComplementaryText: 'window.UBITS.Toggle.create({\n  label: 'Activar notificaciones',\n  complementaryText: 'Recibirás alertas por email',\n  checked: false,\n  size: 'md'\n});',
    disabled: 'window.UBITS.Toggle.create({\n  checked: false,\n  disabled: true,\n  size: 'md'\n});'
  },
  variants: {
    size: [
      'sm',
      'md'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'disabled'
    ],
    checked: [
      true,
      false
    ],
    disabled: [
      true,
      false
    ]
  },
  events: {
    onChange: {
      type: 'Event',
      description: 'Emitted when toggle value changes'
    },
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when toggle is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Toggle/Toggle.stories.ts',
    providerPath: 'packages/../components/toggle/src/ToggleProvider',
    typesPath: 'packages/../components/toggle/src/types/ToggleOptions',
  },
  '🧩-ux-toast': {
    componentId: '🧩-ux-toast',
    category: 'Feedback',
    title: 'Toast',
    contract: {
  componentId: '🧩-ux-toast',
  api: {
    create: 'window.UBITS.Toast.create',
    tag: '<ubits-toast>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-feedback-bg-success-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-info-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
    '--modifiers-normal-color-light-fg-1-high',
    '--p-spacing-mode-1-lg',
    '--p-spacing-mode-1-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'message'
    ]
  },
  examples: {
    basic: 'window.UBITS.Toast.show({\n  type: 'success',\n  message: 'Los cambios se han guardado correctamente.',\n  duration: 3500\n});',
    withTitle: 'window.UBITS.Toast.show({\n  type: 'success',\n  title: 'Operación completada',\n  message: 'Los cambios se han guardado correctamente.',\n  duration: 3500\n});',
    info: 'window.UBITS.Toast.show({\n  type: 'info',\n  message: 'Información importante para el usuario.',\n  duration: 3500\n});',
    warning: 'window.UBITS.Toast.show({\n  type: 'warning',\n  message: 'Advertencia: revisa los datos ingresados.',\n  duration: 3500\n});',
    error: 'window.UBITS.Toast.show({\n  type: 'error',\n  message: 'Error al procesar la solicitud.',\n  duration: 3500\n});',
    noClose: 'window.UBITS.Toast.show({\n  type: 'success',\n  message: 'Operación completada.',\n  noClose: true,\n  duration: 0\n});'
  },
  variants: {
    type: [
      'success',
      'info',
      'warning',
      'error'
    ],
    noClose: [
      true,
      false
    ],
    pauseOnHover: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when toast is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Toast/Toast.stories.ts',
    providerPath: 'packages/../components/toast/src/ToastProvider',
    typesPath: 'packages/../components/toast/src/types/ToastOptions',
  },
  '🧩-ux-timeline': {
    componentId: '🧩-ux-timeline',
    category: 'Layout',
    title: 'Timeline',
    contract: {
  componentId: '🧩-ux-timeline',
  api: {},
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-avatar'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-static-color-light-fg-1-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--modifiers-normal-body-md-semibold-fontweight',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--ubits-border-radius-full',
    '--ubits-border-radius-md',
    '--font-family-noto-sans-font-family',
    '--weight-regular',
    '--weight-semibold',
    '--p-spacing-mode-1-sm',
    '--p-spacing-mode-1-md',
    '--p-spacing-mode-1-lg',
    '--p-spacing-mode-1-xl'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: '// Timeline se implementa directamente con HTML y CSS\\\n// Ejemplo de estructura:\\\nconst timelineHTML = `\\\n  <div class='ubits-timeline'>\\\n    <div class='ubits-timeline-item'>\\\n      <div class='ubits-timeline-item__content'>\\\n        <h3>Event Title</h3>\\\n        <p>Event description</p>\\\n      </div>\\\n    </div>\\\n  </div>\\\n`;'
  },
  variants: {
    alignment: [
      'left',
      'center'
    ],
    showAvatar: [
      true,
      false
    ],
    showDate: [
      true,
      false
    ],
    showDescription: [
      true,
      false
    ],
    showIcon: [
      true,
      false
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/Timeline/Timeline.stories.ts',
    providerPath: 'packages/../components/avatar/src/AvatarProvider',
    typesPath: 'packages/../components/avatar/src/types/AvatarOptions',
  },
  '🧩-ux-tabs': {
    componentId: '🧩-ux-tabs',
    category: 'Navegación',
    title: 'Tabs',
    contract: {
  componentId: '🧩-ux-tabs',
  api: {
    create: 'window.UBITS.Tabs.create',
    tag: '<ubits-tabs>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--modifiers-normal-color-light-feedback-accent-info',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--weight-semibold',
    '--weight-regular',
    '--spacing-xs',
    '--spacing-sm',
    '--spacing-md',
    '--radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'tabs'
    ]
  },
  examples: {
    basic: 'window.UBITS.Tabs.create(document.getElementById('tabs-container'), {\\\n  containerId: 'tabs-container',\\\n  tabs: [\\\n    { id: 'tab1', label: 'Tab 1', icon: 'home' },\\\n    { id: 'tab2', label: 'Tab 2', icon: 'user' }\\\n  ],\\\n  activeTabId: 'tab1'\\\n});',
    withoutIcons: 'window.UBITS.Tabs.create(document.getElementById('tabs-container'), {\\\n  containerId: 'tabs-container',\\\n  tabs: [\\\n    { id: 'tab1', label: 'Tab 1' },\\\n    { id: 'tab2', label: 'Tab 2' }\\\n  ],\\\n  activeTabId: 'tab1'\\\n});'
  },
  variants: {
    showIcons: [
      true,
      false
    ]
  },
  events: {
    onTabChange: {
      type: 'Event',
      description: 'Emitted when active tab changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Tabs/Tabs.stories.ts',
    providerPath: 'packages/../components/tabs/src/TabsProvider',
    typesPath: 'packages/../components/tabs/src/types/TabsOptions',
  },
  '🧩-ux-tabbar': {
    componentId: '🧩-ux-tabbar',
    category: 'Aprendizaje',
    title: '🧩-ux-tabbar',
    contract: {
  componentId: '🧩-ux-tabbar',
  api: {
    create: 'window.UBITS.TabBar.create',
    tag: '<ubits-tabbar>'
  },
  internals: [
    '⚙️-functional-floating-menu',
    'Módulos',
    '⚙️-functional-profile-menu',
    'Mi perfil',
    '⚙️-functional-dark-mode-toggle'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-border-1',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'items'
    ]
  },
  examples: {
    basic: 'createTabBar(document.getElementById('tabbar-container'), {\\\n  containerId: 'tabbar-container',\\\n  variant: 'colaborador',\\\n  items: []\\\n});',
    admin: 'createTabBar(document.getElementById('tabbar-container'), {\\\n  containerId: 'tabbar-container',\\\n  variant: 'admin',\\\n  items: []\\\n});'
  },
  variants: {
    variant: [
      'colaborador',
      'admin'
    ]
  },
  events: {
    onTabChange: {
      type: 'Event',
      description: 'Emitted when active tab changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/TabBar/TabBar.stories.ts',
    providerPath: 'packages/../components/tabbar/src/TabBarProvider',
    typesPath: 'packages/../components/tabbar/src/types/TabBarOptions',
  },
  '🧩-ux-subnav': {
    componentId: '🧩-ux-subnav',
    category: 'Navegación',
    title: 'SubNav',
    contract: {
  componentId: '🧩-ux-subnav',
  api: {
    create: 'window.UBITS.SubNav.create',
    tag: '<ubits-subnav>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
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
    '--radius-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'containerId'
    ]
  },
  examples: {
    basic: 'window.UBITS.SubNav.create(document.getElementById('subnav-container'), {\\\n  containerId: 'subnav-container',\\\n  variant: 'template'\\\n});',
    aprendizaje: 'window.UBITS.SubNav.create(document.getElementById('subnav-container'), {\\\n  containerId: 'subnav-container',\\\n  variant: 'aprendizaje'\\\n});',
    desempeno: 'window.UBITS.SubNav.create(document.getElementById('subnav-container'), {\\\n  containerId: 'subnav-container',\\\n  variant: 'desempeno'\\\n});'
  },
  variants: {
    variant: [
      'template',
      'aprendizaje',
      'desempeno',
      'encuestas',
      'tareas',
      'empresa',
      'admin-aprendizaje',
      'admin-desempeno'
    ]
  },
  events: {
    onTabChange: {
      type: 'Event',
      description: 'Emitted when active tab changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/SubNav/SubNav.stories.ts',
    providerPath: 'packages/../components/subnav/src/SubNavProvider',
    typesPath: 'packages/../components/subnav/src/types/SubNavOptions',
  },
  '🧩-ux-status-tag': {
    componentId: '🧩-ux-status-tag',
    category: 'Básicos',
    title: 'Status Tag',
    contract: {
  componentId: '🧩-ux-status-tag',
  api: {
    create: 'window.UBITS.StatusTag.create',
    tag: '<ubits-status-tag>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'label'
    ]
  },
  examples: {
    basic: 'window.UBITS.StatusTag.create({\n  label: 'Completado',\n  size: 'md',\n  status: 'completed'\n});',
    withLeftIcon: 'window.UBITS.StatusTag.create({\n  label: 'En progreso',\n  size: 'md',\n  status: 'in-progress',\n  leftIcon: 'spinner'\n});',
    withRightIcon: 'window.UBITS.StatusTag.create({\n  label: 'Pendiente',\n  size: 'md',\n  status: 'pending',\n  rightIcon: 'clock'\n});',
    clickable: 'window.UBITS.StatusTag.create({\n  label: 'Activo',\n  size: 'md',\n  status: 'active',\n  clickable: true\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md'
    ],
    status: [
      'completed',
      'published',
      'fulfilled',
      'created',
      'active',
      'not-fulfilled',
      'denied',
      'draft',
      'in-progress',
      'syncing',
      'pending',
      'pending-approval',
      'not-started',
      'finished',
      'archived',
      'disabled',
      'paused'
    ],
    clickable: [
      true,
      false
    ]
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when status tag is clicked (only if clickable is true)'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/StatusTag/StatusTag.stories.ts',
    providerPath: 'packages/../components/status-tag/src/StatusTagProvider',
    typesPath: 'packages/../components/status-tag/src/types/StatusTagOptions',
  },
  '🧩-ux-spinner': {
    componentId: '🧩-ux-spinner',
    category: 'Básicos',
    title: 'Spinner',
    contract: {
  componentId: '🧩-ux-spinner',
  api: {
    create: 'window.UBITS.Spinner.create',
    tag: '<ubits-spinner>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-feedback-accent-primary',
    '--modifiers-normal-color-light-feedback-accent-secondary',
    '--modifiers-normal-color-light-feedback-accent-success',
    '--modifiers-normal-color-light-feedback-accent-warning',
    '--modifiers-normal-color-light-feedback-accent-error',
    '--modifiers-normal-color-light-feedback-accent-info',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-xs-regular-fontsize',
    '--modifiers-normal-body-xs-regular-lineheight',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--p-spacing-mode-1-sm'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Spinner.create({\n  size: 'md',\n  variant: 'primary',\n  animated: true\n});',
    withLabel: 'window.UBITS.Spinner.create({\n  size: 'md',\n  variant: 'primary',\n  animated: true,\n  label: 'Cargando...'\n});',
    fullScreen: 'window.UBITS.Spinner.create({\n  size: 'md',\n  variant: 'primary',\n  animated: true,\n  fullScreen: true\n});',
    differentVariant: 'window.UBITS.Spinner.create({\n  size: 'md',\n  variant: 'success',\n  animated: true\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    variant: [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info'
    ],
    animated: [
      true,
      false
    ],
    fullScreen: [
      true,
      false
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/Spinner/Spinner.stories.ts',
    providerPath: 'packages/../components/spinner/src/SpinnerProvider',
    typesPath: 'packages/../components/spinner/src/types/SpinnerOptions',
  },
  '🧩-ux-slider': {
    componentId: '🧩-ux-slider',
    category: 'Formularios',
    title: 'Slider',
    contract: {
  componentId: '🧩-ux-slider',
  api: {
    create: 'window.UBITS.Slider.create',
    tag: '<ubits-slider>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-input'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-disabled',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--ubits-spacing-none',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-lg',
    '--ubits-border-radius-full',
    '--font-family-noto-sans-font-family',
    '--weight-semibold',
    '--weight-bold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'containerId'
    ]
  },
  examples: {
    basic: 'window.UBITS.Slider.create(document.getElementById('slider-container'), {\n  containerId: 'slider-container',\n  min: 0,\n  max: 100,\n  value: 50\n});',
    range: 'window.UBITS.Slider.create(document.getElementById('slider-container'), {\n  containerId: 'slider-container',\n  mode: 'range',\n  min: 0,\n  max: 100,\n  values: [25, 75]\n});',
    withInputs: 'window.UBITS.Slider.create(document.getElementById('slider-container'), {\n  containerId: 'slider-container',\n  min: 0,\n  max: 100,\n  value: 50,\n  showInputs: true\n});',
    vertical: 'window.UBITS.Slider.create(document.getElementById('slider-container'), {\n  containerId: 'slider-container',\n  orientation: 'vertical',\n  min: 0,\n  max: 100,\n  value: 50\n});'
  },
  variants: {
    orientation: [
      'horizontal',
      'vertical'
    ],
    mode: [
      'single',
      'range'
    ],
    size: [
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'disabled'
    ]
  },
  events: {
    onChange: {
      type: 'Event',
      description: 'Emitted when slider value changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Slider/Slider.stories.ts',
    providerPath: 'packages/../components/slider/src/SliderProvider',
    typesPath: 'packages/../components/slider/src/types/SliderOptions',
  },
  '🧩-ux-skeleton': {
    componentId: '🧩-ux-skeleton',
    category: 'Básicos',
    title: 'Skeleton',
    contract: {
  componentId: '🧩-ux-skeleton',
  api: {
    create: 'window.UBITS.Skeleton.create',
    tag: '<ubits-skeleton>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-body-md-regular-lineheight',
    '--modifiers-normal-body-lg-regular-lineheight',
    '--ubits-border-radius-sm',
    '--ubits-spacing-xs'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Skeleton.create({\n  variant: 'text',\n  size: 'md',\n  width: 'full',\n  lines: 3,\n  animated: true\n});',
    circle: 'window.UBITS.Skeleton.create({\n  variant: 'circle',\n  size: 'md',\n  animated: true\n});',
    rectangle: 'window.UBITS.Skeleton.create({\n  variant: 'rectangle',\n  size: 'md',\n  width: 300,\n  height: 200,\n  animated: true\n});',
    custom: 'window.UBITS.Skeleton.create({\n  variant: 'custom',\n  size: 'md',\n  width: 200,\n  height: 100,\n  animated: true\n});'
  },
  variants: {
    variant: [
      'text',
      'circle',
      'rectangle',
      'custom'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    animated: [
      true,
      false
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/Skeleton/Skeleton.stories.ts',
    providerPath: 'packages/../components/skeleton/src/SkeletonProvider',
    typesPath: 'packages/../components/skeleton/src/types/SkeletonOptions',
  },
  '🧩-ux-simple-card': {
    componentId: '🧩-ux-simple-card',
    category: 'Layout',
    title: 'Simple Card',
    contract: {
  componentId: '🧩-ux-simple-card',
  api: {
    create: 'createSimpleCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-bg-4',
    '--modifiers-normal-color-light-bg-5',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--modifiers-normal-color-light-border-3',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-feedback-border-error',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-spacing-2xl',
    '--ubits-spacing-3xl',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title'
    ]
  },
  examples: {
    basic: 'createSimpleCard({\\\n  title: 'Advanced Card',\\\n  subtitle: 'Card subtitle',\\\n  content: '<p>Card content</p>'\\\n});',
    withHeader: 'createSimpleCard({\\\n  title: 'Advanced Card',\\\n  subtitle: 'Card subtitle',\\\n  content: '<p>Card content</p>',\\\n  showHeader: true\\\n});',
    withButtons: 'createSimpleCard({\\\n  title: 'Advanced Card',\\\n  subtitle: 'Card subtitle',\\\n  content: '<p>Card content</p>',\\\n  showButtons: true,\\\n  button1Label: 'Action 1',\\\n  button2Label: 'Action 2'\\\n});'
  },
  variants: {
    showHeader: [
      true,
      false
    ],
    showButtons: [
      true,
      false
    ]
  },
  events: {
    onButton1Click: {
      type: 'Event',
      description: 'Emitted when first button is clicked'
    },
    onButton2Click: {
      type: 'Event',
      description: 'Emitted when second button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/SimpleCard/SimpleCard.stories.ts',
    providerPath: 'packages/../components/card/src/SimpleCardProvider',
    typesPath: 'packages/../components/card/src/types/SimpleCardOptions',
  },
  '🧩-ux-sidebar': {
    componentId: '🧩-ux-sidebar',
    category: 'Navegación',
    title: 'Sidebar',
    contract: {
  componentId: '🧩-ux-sidebar',
  api: {
    create: 'window.UBITS.Sidebar.create',
    tag: '<ubits-sidebar>'
  },
  internals: [
    '⚙️-functional-tooltip',
    '⚙️-functional-profile-menu',
    '⚙️-functional-dark-mode-toggle'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-border-1',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'containerId',
      'bodyButtons'
    ]
  },
  examples: {
    basic: 'window.UBITS.Sidebar.create(document.getElementById('sidebar-container'), {\\\n  containerId: 'sidebar-container',\\\n  variant: 'colaborador',\\\n  bodyButtons: []\\\n});',
    admin: 'window.UBITS.Sidebar.create(document.getElementById('sidebar-container'), {\\\n  containerId: 'sidebar-container',\\\n  variant: 'admin',\\\n  bodyButtons: []\\\n});',
    withDarkMode: 'window.UBITS.Sidebar.create(document.getElementById('sidebar-container'), {\\\n  containerId: 'sidebar-container',\\\n  variant: 'colaborador',\\\n  darkModeEnabled: true,\\\n  bodyButtons: []\\\n});'
  },
  variants: {
    variant: [
      'colaborador',
      'admin'
    ],
    darkModeEnabled: [
      true,
      false
    ]
  },
  events: {
    onButtonClick: {
      type: 'Event',
      description: 'Emitted when a sidebar button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Sidebar/Sidebar.stories.ts',
    providerPath: 'packages/../components/sidebar/src/SidebarProvider',
    typesPath: 'packages/../components/sidebar/src/types/SidebarOptions',
  },
  '🧩-ux-selection-card': {
    componentId: '🧩-ux-selection-card',
    category: 'Layout',
    title: 'Selection Card',
    contract: {
  componentId: '🧩-ux-selection-card',
  api: {
    create: 'createSelectionCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-radio-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--modifiers-normal-color-light-accent-brand',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-lg',
    '--ubits-border-radius-md',
    '--ubits-effects-elevation-1',
    '--font-family-noto-sans-font-family',
    '--weight-regular',
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'id',
      'title'
    ]
  },
  examples: {
    basic: 'createSelectionCard({\\\n  id: 'card-1',\\\n  title: 'Asignar toda la empresa',\\\n  size: 'md'\\\n});',
    selected: 'createSelectionCard({\\\n  id: 'card-1',\\\n  title: 'Asignar toda la empresa',\\\n  selected: true,\\\n  size: 'md'\\\n});',
    withDescription: 'createSelectionCard({\\\n  id: 'card-1',\\\n  title: 'Asignar toda la empresa',\\\n  description: 'Agregaras a todos los colaboradores...',\\\n  size: 'md'\\\n});',
    disabled: 'createSelectionCard({\\\n  id: 'card-1',\\\n  title: 'Asignar toda la empresa',\\\n  disabled: true,\\\n  size: 'md'\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    selected: [
      true,
      false
    ],
    disabled: [
      true,
      false
    ],
    showDescription: [
      true,
      false
    ]
  },
  events: {
    onClick: {
      type: 'Event',
      description: 'Emitted when selection card is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/SelectionCard/SelectionCard.stories.ts',
    providerPath: 'packages/../components/selection-card/src/SelectionCardProvider',
    typesPath: 'packages/../components/selection-card/src/types/SelectionCardOptions',
  },
  '🧩-ux-segment-control': {
    componentId: '🧩-ux-segment-control',
    category: 'Navegación',
    title: 'Segment Control',
    contract: {
  componentId: '🧩-ux-segment-control',
  api: {
    create: 'window.UBITS.SegmentControl.create',
    tag: '<ubits-segment-control>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--weight-semibold',
    '--weight-regular',
    '--p-spacing-mode-1-xs',
    '--p-spacing-mode-1-sm',
    '--radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'segments'
    ]
  },
  examples: {
    basic: 'window.UBITS.SegmentControl.create(document.getElementById('segment-control-container'), {\\\n  containerId: 'segment-control-container',\\\n  segments: [\\\n    { id: 'segment1', label: 'Segment 1', icon: 'home' },\\\n    { id: 'segment2', label: 'Segment 2', icon: 'user' }\\\n  ],\\\n  activeSegmentId: 'segment1'\\\n});',
    withoutIcons: 'window.UBITS.SegmentControl.create(document.getElementById('segment-control-container'), {\\\n  containerId: 'segment-control-container',\\\n  segments: [\\\n    { id: 'segment1', label: 'Segment 1' },\\\n    { id: 'segment2', label: 'Segment 2' }\\\n  ],\\\n  activeSegmentId: 'segment1'\\\n});'
  },
  variants: {
    showIcons: [
      true,
      false
    ]
  },
  events: {
    onSegmentChange: {
      type: 'Event',
      description: 'Emitted when active segment changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/SegmentControl/SegmentControl.stories.ts',
    providerPath: 'packages/../components/segment-control/src/SegmentControlProvider',
    typesPath: 'packages/../components/segment-control/src/types/SegmentControlOptions',
  },
  '🧩-ux-search-button': {
    componentId: '🧩-ux-search-button',
    category: 'Formularios',
    title: 'Search Button',
    contract: {
  componentId: '🧩-ux-search-button',
  api: {
    create: 'window.UBITS.SearchButton.create',
    tag: '<ubits-search-button>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: [
      '🧩-ux-input'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.SearchButton.create({\\\n  active: false,\\\n  size: 'md',\\\n  state: 'default'\\\n});',
    active: 'window.UBITS.SearchButton.create({\\\n  active: true,\\\n  size: 'md',\\\n  state: 'default',\\\n  placeholder: 'Buscar...',\\\n  value: ''\\\n});',
    withValue: 'window.UBITS.SearchButton.create({\\\n  active: true,\\\n  size: 'md',\\\n  state: 'default',\\\n  placeholder: 'Buscar...',\\\n  value: 'texto de búsqueda'\\\n});',
    disabled: 'window.UBITS.SearchButton.create({\\\n  active: false,\\\n  size: 'md',\\\n  state: 'default',\\\n  disabled: true\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'disabled'
    ],
    active: [
      true,
      false
    ],
    disabled: [
      true,
      false
    ]
  },
  events: {
    onSearch: {
      type: 'Event',
      description: 'Emitted when search is triggered'
    },
    onChange: {
      type: 'Event',
      description: 'Emitted when input value changes'
    },
    onFocus: {
      type: 'FocusEvent',
      description: 'Emitted when search button receives focus'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/SearchButton/SearchButton.stories.ts',
    providerPath: 'packages/../components/search-button/src/SearchButtonProvider',
    typesPath: 'packages/../components/search-button/src/types/SearchButtonOptions',
  },
  '⚙️-functional-scroll': {
    componentId: '⚙️-functional-scroll',
    category: 'Básicos',
    title: 'Scrollbar',
    contract: {
  componentId: '⚙️-functional-scroll',
  api: {
    create: 'window.createScrollbar'
  },
  tokensUsed: [
    '--ubits-border-radius-full'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.createScrollbar({\\\n  containerId: 'scrollbar-container',\\\n  targetId: 'scrollable-element',\\\n  orientation: 'vertical'\\\n});',
    horizontal: 'window.createScrollbar({\\\n  containerId: 'scrollbar-container',\\\n  targetId: 'scrollable-element',\\\n  orientation: 'horizontal'\\\n});'
  },
  variants: {
    orientation: [
      'vertical',
      'horizontal'
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/Scrollbar/Scrollbar.stories.ts',
    providerPath: 'packages/../components/scroll/src/ScrollProvider',
    typesPath: 'packages/../components/scroll/src/types/ScrollOptions',
  },
  '🧩-ux-score-card-metrics': {
    componentId: '🧩-ux-score-card-metrics',
    category: 'Charts',
    title: 'Score Card Metrics',
    contract: {
  componentId: '🧩-ux-score-card-metrics',
  api: {
    create: 'createScoreCardMetrics'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--modifiers-normal-color-light-feedback-chart-warning-bold',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-spacing-5',
    '--ubits-spacing-6',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title',
      'totalResponses',
      'average',
      'score'
    ]
  },
  examples: {
    basic: 'createScoreCardMetrics(document.getElementById('score-card-metrics-container'), {\\\n  containerId: 'score-card-metrics-container',\\\n  title: 'Califica el producto',\\\n  totalResponses: 100,\\\n  average: 4.5,\\\n  score: { 1: 5, 2: 10, 3: 20, 4: 30, 5: 35 }\\\n});',
    withButtons: 'createScoreCardMetrics(document.getElementById('score-card-metrics-container'), {\\\n  containerId: 'score-card-metrics-container',\\\n  title: 'Califica el producto',\\\n  totalResponses: 100,\\\n  average: 4.5,\\\n  score: { 1: 5, 2: 10, 3: 20, 4: 30, 5: 35 },\\\n  showInfoButton: true,\\\n  showActionButton: true\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    showInfoButton: [
      true,
      false
    ],
    showActionButton: [
      true,
      false
    ]
  },
  events: {
    onInfoClick: {
      type: 'Event',
      description: 'Emitted when info button is clicked'
    },
    onActionClick: {
      type: 'Event',
      description: 'Emitted when action button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/ScoreCardMetrics/ScoreCardMetrics.stories.ts',
    providerPath: 'packages/../components/score-card-metrics/src/ScoreCardMetricsProvider',
    typesPath: 'packages/../components/score-card-metrics/src/types/ScoreCardMetricsOptions',
  },
  '🧩-ux-radio-button': {
    componentId: '🧩-ux-radio-button',
    category: 'Formularios',
    title: 'Radio Button',
    contract: {
  componentId: '🧩-ux-radio-button',
  api: {
    create: 'window.UBITS.RadioButton.create',
    tag: '<ubits-radio-button>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm',
    '--p-spacing-mode-1-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'label',
      'value',
      'name'
    ]
  },
  examples: {
    basic: 'window.UBITS.RadioButton.create({\n  label: 'Label',\n  value: 'option1',\n  name: 'group',\n  checked: false,\n  size: 'md',\n  state: 'default'\n});',
    checked: 'window.UBITS.RadioButton.create({\n  label: 'Label',\n  value: 'option1',\n  name: 'group',\n  checked: true,\n  size: 'md',\n  state: 'default'\n});',
    withComplementaryText: 'window.UBITS.RadioButton.create({\n  label: 'Label',\n  value: 'option1',\n  name: 'group',\n  complementaryText: 'Texto complementario',\n  checked: false,\n  size: 'md'\n});',
    disabled: 'window.UBITS.RadioButton.create({\n  label: 'Label',\n  value: 'option1',\n  name: 'group',\n  checked: false,\n  disabled: true,\n  size: 'md'\n});'
  },
  variants: {
    size: [
      'sm',
      'md'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'disabled'
    ],
    checked: [
      true,
      false
    ],
    disabled: [
      true,
      false
    ]
  },
  events: {
    onChange: {
      type: 'Event',
      description: 'Emitted when radio button value changes'
    },
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when radio button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/RadioButton/RadioButton.stories.ts',
    providerPath: 'packages/../components/radio-button/src/RadioButtonProvider',
    typesPath: 'packages/../components/radio-button/src/types/RadioButtonOptions',
  },
  '🧩-ux-progress-general-card': {
    componentId: '🧩-ux-progress-general-card',
    category: 'Charts',
    title: 'Circle Metric Card',
    contract: {
  componentId: '🧩-ux-progress-general-card',
  api: {
    create: 'createProgressGeneralCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button',
      '🧩-ux-progress-bar'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-border-2',
    '--ubits-chart-color-bg-neutral-blue-base',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'mainPercentage',
      'categories'
    ]
  },
  examples: {
    basic: 'createProgressGeneralCard(document.getElementById('progress-general-card-container'), {\\\n  containerId: 'progress-general-card-container',\\\n  title: 'Progreso general',\\\n  mainPercentage: 50,\\\n  mainLabel: 'Ciclos',\\\n  categories: [\\\n    { label: 'Category 1', current: 10, total: 100 }\\\n  ]\\\n});',
    horizontal: 'createProgressGeneralCard(document.getElementById('progress-general-card-container'), {\\\n  containerId: 'progress-general-card-container',\\\n  title: 'Progreso general',\\\n  mainPercentage: 50,\\\n  mainLabel: 'Ciclos',\\\n  categories: [\\\n    { label: 'Category 1', current: 10, total: 100 }\\\n  ],\\\n  layout: 'horizontal'\\\n});'
  },
  variants: {
    layout: [
      'vertical',
      'horizontal'
    ],
    size: [
      'sm',
      'md',
      'lg'
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/ProgressGeneralCard/ProgressGeneralCard.stories.ts',
    providerPath: 'packages/../components/progress-general-card/src/ProgressGeneralCardProvider',
    typesPath: 'packages/../components/progress-general-card/src/types/ProgressGeneralCardOptions',
  },
  '🧩-ux-progress-bar': {
    componentId: '🧩-ux-progress-bar',
    category: 'Charts',
    title: 'Progress Bar',
    contract: {
  componentId: '🧩-ux-progress-bar',
  api: {
    create: 'window.createProgressBar'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-bg-4',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-feedback-accent-success',
    '--modifiers-normal-color-light-feedback-accent-error',
    '--modifiers-normal-color-light-feedback-chart-warning-bold',
    '--modifiers-normal-color-light-feedback-chart-info-bold',
    '--ubits-chart-color-bg-neutral-blue-base',
    '--ubits-spacing-sm',
    '--ubits-border-radius-full',
    '--font-family-noto-sans-font-family',
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'createProgressBar({\\\n  value: 50,\\\n  size: 'md',\\\n  variant: 'default'\\\n});',
    withLabel: 'createProgressBar({\\\n  value: 75,\\\n  size: 'md',\\\n  variant: 'default',\\\n  showLabel: true,\\\n  label: '75%'\\\n});',
    multiColor: 'createProgressBar({\\\n  segments: [\\\n    { value: 30, color: 'green' },\\\n    { value: 20, color: 'yellow' }\\\n  ],\\\n  size: 'md',\\\n  variant: 'multi-color'\\\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    variant: [
      'default',
      'multi-color'
    ],
    showLabel: [
      true,
      false
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/ProgressBar/ProgressBar.stories.ts',
    providerPath: 'packages/../components/progress/src/ProgressProvider',
    typesPath: 'packages/../components/progress/src/types/ProgressOptions',
  },
  '🧩-ux-popover': {
    componentId: '🧩-ux-popover',
    category: 'Feedback',
    title: 'Popover',
    contract: {
  componentId: '🧩-ux-popover',
  api: {
    create: 'window.UBITS.Popover.create',
    tag: '<ubits-popover>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: []
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Popover.create({\n  targetElement: document.getElementById('target'),\n  bodyContent: '<p>Contenido del popover</p>',\n  tailPosition: 'top'\n});',
    withTitle: 'window.UBITS.Popover.create({\n  targetElement: document.getElementById('target'),\n  title: 'Título del popover',\n  bodyContent: '<p>Contenido del popover</p>',\n  tailPosition: 'top'\n});',
    withButtons: 'window.UBITS.Popover.create({\n  targetElement: document.getElementById('target'),\n  bodyContent: '<p>Contenido del popover</p>',\n  footerButtons: {\n    primary: { label: 'Aceptar', onClick: () => {} },\n    secondary: { label: 'Cancelar', onClick: () => {} }\n  },\n  tailPosition: 'top'\n});',
    differentPosition: 'window.UBITS.Popover.create({\n  targetElement: document.getElementById('target'),\n  bodyContent: '<p>Contenido del popover</p>',\n  tailPosition: 'bottom'\n});'
  },
  variants: {
    width: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    tailPosition: [
      'top',
      'bottom',
      'left',
      'right'
    ],
    closeOnOutsideClick: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when popover is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Popover/Popover.stories.ts',
    providerPath: 'packages/../components/popover/src/PopoverProvider',
    typesPath: 'packages/../components/popover/src/types/PopoverOptions',
  },
  '🧩-ux-participants-menu': {
    componentId: '🧩-ux-participants-menu',
    category: 'Navegación',
    title: 'Menu de Participantes',
    contract: {
  componentId: '🧩-ux-participants-menu',
  api: {
    create: 'window.UBITS.ParticipantsMenu.create',
    tag: '<ubits-participants-menu>'
  },
  dependsOn: {
    required: [
      '🧩-ux-input',
      '🧩-ux-button',
      '🧩-ux-avatar',
      '🧩-ux-status-tag'
    ],
    optional: [
      '🧩-ux-badge',
      '🧩-ux-drawer',
      '🧩-ux-checkbox',
      '🧩-ux-empty-state',
      '⚙️-functional-scroll'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-active',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--ubits-spacing-none',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-12',
    '--ubits-spacing-4',
    '--ubits-border-radius-md',
    '--ubits-border-radius-sm',
    '--ubits-border-radius-full',
    '--font-family-noto-sans-font-family',
    '--weight-bold',
    '--weight-regular'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'participants'
    ]
  },
  examples: {
    basic: 'window.UBITS.ParticipantsMenu.create(document.getElementById('participants-menu-container'), {\\\n  containerId: 'participants-menu-container',\\\n  participants: [\\\n    { id: '1', name: 'John Doe', role: 'Admin', status: 'online' }\\\n  ]\\\n});',
    withSearch: 'window.UBITS.ParticipantsMenu.create(document.getElementById('participants-menu-container'), {\\\n  containerId: 'participants-menu-container',\\\n  participants: [\\\n    { id: '1', name: 'John Doe', role: 'Admin', status: 'online' }\\\n  ],\\\n  searchPlaceholder: 'Buscar participantes...'\\\n});'
  },
  variants: {
    status: [
      'online',
      'offline',
      'away',
      'busy'
    ]
  },
  events: {
    onParticipantClick: {
      type: 'Event',
      description: 'Emitted when a participant is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/ParticipantsMenu/ParticipantsMenu.stories.ts',
    providerPath: 'packages/../components/participants-menu/src/ParticipantsMenuProvider',
    typesPath: 'packages/../components/participants-menu/src/types/ParticipantsMenuOptions',
  },
  '🧩-ux-pagination': {
    componentId: '🧩-ux-pagination',
    category: 'Data',
    title: 'Pagination',
    contract: {
  componentId: '🧩-ux-pagination',
  api: {
    create: 'window.UBITS.Pagination.create',
    tag: '<ubits-pagination>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: [
      '🧩-ux-input'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'totalPages'
    ]
  },
  examples: {
    basic: 'window.UBITS.Pagination.create(document.getElementById('pagination-container'), {\\\n  containerId: 'pagination-container',\\\n  currentPage: 1,\\\n  totalPages: 10,\\\n  variant: 'default',\\\n  size: 'md'\\\n});',
    compact: 'window.UBITS.Pagination.create(document.getElementById('pagination-container'), {\\\n  containerId: 'pagination-container',\\\n  currentPage: 1,\\\n  totalPages: 10,\\\n  variant: 'compact',\\\n  size: 'md'\\\n});',
    withInfo: 'window.UBITS.Pagination.create(document.getElementById('pagination-container'), {\\\n  containerId: 'pagination-container',\\\n  currentPage: 1,\\\n  totalPages: 10,\\\n  totalItems: 100,\\\n  itemsPerPage: 10,\\\n  showInfo: true,\\\n  variant: 'default',\\\n  size: 'md'\\\n});'
  },
  variants: {
    variant: [
      'default',
      'compact',
      'minimal'
    ],
    size: [
      'sm',
      'md',
      'lg'
    ],
    showFirst: [
      true,
      false
    ],
    showLast: [
      true,
      false
    ],
    showPrevNext: [
      true,
      false
    ],
    showInfo: [
      true,
      false
    ],
    showItemsPerPage: [
      true,
      false
    ]
  },
  events: {
    onPageChange: {
      type: 'Event',
      description: 'Emitted when page changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Pagination/Pagination.stories.ts',
    providerPath: 'packages/../components/pagination/src/PaginationProvider',
    typesPath: 'packages/../components/pagination/src/types/PaginationOptions',
  },
  '🧩-ux-nps-card': {
    componentId: '🧩-ux-nps-card',
    category: 'Charts',
    title: 'NPS Card',
    contract: {
  componentId: '🧩-ux-nps-card',
  api: {
    create: 'createNPSCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-feedback-accent-error',
    '--modifiers-normal-color-light-feedback-accent-warning',
    '--modifiers-normal-color-light-feedback-accent-success',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-2xl',
    '--ubits-spacing-none',
    '--ubits-spacing-10',
    '--ubits-spacing-12',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family',
    '--weight-bold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'score',
      'totalResponses',
      'categories'
    ]
  },
  examples: {
    basic: 'createNPSCard(document.getElementById('nps-card-container'), {\\\n  containerId: 'nps-card-container',\\\n  title: 'Nivel de confianza',\\\n  score: 50,\\\n  totalResponses: 100,\\\n  categories: [\\\n    { label: 'Detractores', current: 20, total: 100, color: 'error' },\\\n    { label: 'Neutros', current: 30, total: 100, color: 'warning' },\\\n    { label: 'Promotores', current: 50, total: 100, color: 'success' }\\\n  ]\\\n});',
    withButtons: 'createNPSCard(document.getElementById('nps-card-container'), {\\\n  containerId: 'nps-card-container',\\\n  title: 'Nivel de confianza',\\\n  score: 50,\\\n  totalResponses: 100,\\\n  categories: [\\\n    { label: 'Detractores', current: 20, total: 100, color: 'error' },\\\n    { label: 'Neutros', current: 30, total: 100, color: 'warning' },\\\n    { label: 'Promotores', current: 50, total: 100, color: 'success' }\\\n  ],\\\n  showInfoButton: true,\\\n  showActionButton: true\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    showInfoButton: [
      true,
      false
    ],
    showActionButton: [
      true,
      false
    ]
  },
  events: {
    onInfoClick: {
      type: 'Event',
      description: 'Emitted when info button is clicked'
    },
    onActionClick: {
      type: 'Event',
      description: 'Emitted when action button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/NPSCard/NPSCard.stories.ts',
    providerPath: 'packages/../components/nps-card/src/NPSCardProvider',
    typesPath: 'packages/../components/nps-card/src/types/NPSCardOptions',
  },
  '⚙️-functional-modal': {
    componentId: '⚙️-functional-modal',
    category: 'Feedback',
    title: 'Modal',
    contract: {
  componentId: '⚙️-functional-modal',
  api: {
    create: 'window.UBITS.Modal.create',
    tag: '<ubits-modal>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: []
  },
  internals: [
    '⚙️-functional-scroll',
    '⚙️-functional-overlay'
  ],
  tokensUsed: [
    '--ubits-spacing-12',
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title'
    ]
  },
  examples: {
    basic: 'const modal = window.UBITS.Modal.create({\n  title: \'Confirmar acción\',\n  bodyContent: \'<p>¿Estás seguro de realizar esta acción?</p>\',\n  footerButtons: {\n    primary: { label: \'Confirmar\', onClick: () => {} },\n    secondary: { label: \'Cancelar\', onClick: () => modal.close() }\n  }\n});',
    withContent: 'const modal = window.UBITS.Modal.create({\n  title: \'Título del modal\',\n  size: \'lg\',\n  bodyContent: \'<p>Contenido del modal</p>\'\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg',
      'xl',
      'full'
    ],
    fullScreen: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when modal is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Modal/Modal.stories.ts',
    providerPath: 'packages/../components/modal/src/ModalProvider',
    typesPath: 'packages/../components/modal/src/types/ModalOptions',
  },
  '🧩-ux-metric-card': {
    componentId: '🧩-ux-metric-card',
    category: 'Charts',
    title: 'Text Metric Card',
    contract: {
  componentId: '🧩-ux-metric-card',
  api: {
    create: 'createMetricCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-6',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family',
    '--weight-regular',
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title',
      'value',
      'label'
    ]
  },
  examples: {
    basic: 'createMetricCard({\\\n  title: 'Net confidence score',\\\n  value: '200 / 204',\\\n  label: 'Colaboradores'\\\n});',
    withIcon: 'createMetricCard({\\\n  title: 'Net confidence score',\\\n  value: '200 / 204',\\\n  label: 'Colaboradores',\\\n  titleIcon: 'chart-line',\\\n  titleIconStyle: 'regular'\\\n});',
    withButtons: 'createMetricCard({\\\n  title: 'Net confidence score',\\\n  value: '200 / 204',\\\n  label: 'Colaboradores',\\\n  showInfoButton: true,\\\n  showActionButton: true,\\\n  actionButtonLabel: 'Ver detalles'\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    showInfoButton: [
      true,
      false
    ],
    showActionButton: [
      true,
      false
    ]
  },
  events: {
    onInfoClick: {
      type: 'Event',
      description: 'Emitted when info button is clicked'
    },
    onActionClick: {
      type: 'Event',
      description: 'Emitted when action button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/MetricCard/MetricCard.stories.ts',
    providerPath: 'packages/../components/metric-card/src/MetricCardProvider',
    typesPath: 'packages/../components/metric-card/src/types/MetricCardOptions',
  },
  '🧩-ux-menu': {
    componentId: '🧩-ux-menu',
    category: 'Navegación',
    title: 'Menu',
    contract: {
  componentId: '🧩-ux-menu',
  api: {
    create: 'window.UBITS.Menu.create',
    tag: '<ubits-menu>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-badge'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--modifiers-normal-color-light-feedback-bg-success',
    '--modifiers-normal-color-light-feedback-bg-warning',
    '--modifiers-normal-color-light-feedback-bg-error',
    '--modifiers-normal-color-light-feedback-bg-info',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--weight-semibold',
    '--weight-medium',
    '--weight-regular',
    '--spacing-xs',
    '--spacing-sm',
    '--spacing-md',
    '--spacing-lg',
    '--radius-sm',
    '--radius-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'sections'
    ]
  },
  examples: {
    basic: 'window.UBITS.Menu.create(document.getElementById('menu-container'), {\\\n  containerId: 'menu-container',\\\n  sections: [\\\n    { id: 'section1', title: 'Section 1', items: [] }\\\n  ]\\\n});',
    withUserInfo: 'window.UBITS.Menu.create(document.getElementById('menu-container'), {\\\n  containerId: 'menu-container',\\\n  sections: [\\\n    { id: 'section1', title: 'Section 1', items: [] }\\\n  ],\\\n  userInfo: {\\\n    name: 'John Doe',\\\n    email: 'john@example.com'\\\n  }\\\n});'
  },
  events: {
    onItemClick: {
      type: 'Event',
      description: 'Emitted when a menu item is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Menu/Menu.stories.ts',
    providerPath: 'packages/../components/menu/src/MenuProvider',
    typesPath: 'packages/../components/menu/src/types/MenuOptions',
  },
  '🧩-ux-mask': {
    componentId: '🧩-ux-mask',
    category: 'Feedback',
    title: 'Mask',
    contract: {
  componentId: '🧩-ux-mask',
  api: {
    create: 'window.UBITSMask.createMask'
  },
  dependsOn: {
    required: [
      '🧩-ux-popover'
    ],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-dim',
    '--modifiers-normal-color-light-accent-brand',
    '--ubits-border-radius-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'targetElement',
      'popover'
    ]
  },
  examples: {
    basic: 'window.UBITSMask.createMask({\\\n  targetElement: document.getElementById('target'),\\\n  popover: {\\\n    title: 'Título',\\\n    bodyContent: '<p>Contenido del popover</p>'\\\n  }\\\n});',
    withPosition: 'window.UBITSMask.createMask({\\\n  targetElement: document.getElementById('target'),\\\n  popover: {\\\n    title: 'Título',\\\n    bodyContent: '<p>Contenido del popover</p>'\\\n  },\\\n  popoverPosition: 'top'\\\n});',
    withButtons: 'window.UBITSMask.createMask({\\\n  targetElement: document.getElementById('target'),\\\n  popover: {\\\n    title: 'Título',\\\n    bodyContent: '<p>Contenido del popover</p>',\\\n    footerButtons: {\\\n      primary: { label: 'Siguiente', onClick: () => {} }\\\n    }\\\n  }\\\n});'
  },
  variants: {
    popoverPosition: [
      'auto',
      'top',
      'bottom',
      'left',
      'right'
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when mask is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Mask/Mask.stories.ts',
    providerPath: 'packages/../components/mask/src/MaskProvider',
    typesPath: 'packages/../components/mask/src/types/MaskOptions',
  },
  '🧩-ux-list': {
    componentId: '🧩-ux-list',
    category: 'Data',
    title: 'List',
    contract: {
  componentId: '🧩-ux-list',
  api: {
    create: 'window.UBITS.List.create',
    tag: '<ubits-list>'
  },
  dependsOn: {
    required: [],
    optional: [
      '⚙️-functional-scroll'
    ]
  },
  internals: [
    '⚙️-functional-scroll'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'containerId',
      'items'
    ]
  },
  examples: {
    basic: 'window.UBITS.List.create(document.getElementById('list-container'), {\\\n  containerId: 'list-container',\\\n  items: [\\\n    { label: 'Item 1', state: 'default' },\\\n    { label: 'Item 2', state: 'active' }\\\n  ],\\\n  size: 'md'\\\n});',
    multiple: 'window.UBITS.List.create(document.getElementById('list-container'), {\\\n  containerId: 'list-container',\\\n  items: [\\\n    { label: 'Item 1', state: 'default' },\\\n    { label: 'Item 2', state: 'active' }\\\n  ],\\\n  size: 'md',\\\n  multiple: true\\\n});',
    withMaxHeight: 'window.UBITS.List.create(document.getElementById('list-container'), {\\\n  containerId: 'list-container',\\\n  items: [\\\n    { label: 'Item 1', state: 'default' },\\\n    { label: 'Item 2', state: 'active' }\\\n  ],\\\n  size: 'md',\\\n  maxHeight: '400px'\\\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    multiple: [
      true,
      false
    ]
  },
  events: {
    onItemClick: {
      type: 'Event',
      description: 'Emitted when a list item is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/List/List.stories.ts',
    providerPath: 'packages/../components/list/src/ListProvider',
    typesPath: 'packages/../components/list/src/types/ListOptions',
  },
  '🧩-ux-input': {
    componentId: '🧩-ux-input',
    category: 'Formularios',
    title: 'Input',
    contract: {
  componentId: '🧩-ux-input',
  api: {
    create: 'window.UBITS.Input.create',
    tag: '<ubits-input>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  internals: [
    '⚙️-functional-dropdown',
    '⚙️-functional-calendar',
    '⚙️-functional-password-toggle'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'containerId'
    ]
  },
  examples: {
    basic: 'window.UBITS.Input.create(document.getElementById(\'input-container\'), {\n  containerId: \'input-container\',\n  label: \'Email\',\n  type: \'email\',\n  placeholder: \'tu@email.com\'\n});',
    withIcon: 'window.UBITS.Input.create(document.getElementById(\'input-container\'), {\n  containerId: \'input-container\',\n  label: \'Buscar\',\n  type: \'search\',\n  leftIcon: \'search\'\n});',
    select: 'window.UBITS.Input.create(document.getElementById(\'input-container\'), {\n  containerId: \'input-container\',\n  label: \'País\',\n  type: \'select\',\n  selectOptions: [{ label: \'Colombia\', value: \'co\' }]\n});'
  },
  variants: {
    type: [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'select',
      'textarea',
      'search',
      'autocomplete',
      'calendar'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'invalid',
      'disabled'
    ]
  },
  events: {
    onChange: {
      type: 'Event',
      description: 'Emitted when input value changes'
    },
    onFocus: {
      type: 'FocusEvent',
      description: 'Emitted when input receives focus'
    },
    onBlur: {
      type: 'FocusEvent',
      description: 'Emitted when input loses focus'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Input/Input.stories.ts',
    providerPath: 'packages/../components/input/src/InputProvider',
    typesPath: 'packages/../components/input/src/types/InputOptions',
  },
  '🧩-ux-header-section': {
    componentId: '🧩-ux-header-section',
    category: 'Layout',
    title: 'HeaderSection',
    contract: {
  componentId: '🧩-ux-header-section',
  api: {
    create: 'window.UBITS.HeaderSection.create',
    tag: '<ubits-header-section>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: [
      '🧩-ux-button-ai',
      '🧩-ux-status-tag',
      '🧩-ux-tooltip',
      '🧩-ux-list',
      '🧩-ux-breadcrumb'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-heading-h2-regular-fontsize',
    '--modifiers-normal-heading-h2-regular-lineheight',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--weight-semibold',
    '--weight-medium',
    '--weight-regular',
    '--p-spacing-mode-1-xs',
    '--p-spacing-mode-1-sm',
    '--p-spacing-mode-1-md',
    '--p-spacing-mode-1-lg',
    '--radius-sm',
    '--radius-md'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.HeaderSection.create(document.getElementById('header-section-container'), {\\\n  containerId: 'header-section-container',\\\n  title: 'Section Title'\\\n});',
    withActions: 'window.UBITS.HeaderSection.create(document.getElementById('header-section-container'), {\\\n  containerId: 'header-section-container',\\\n  title: 'Section Title',\\\n  actions: [\\\n    { label: 'Action 1', onClick: () => {} }\\\n  ]\\\n});',
    withInfoButton: 'window.UBITS.HeaderSection.create(document.getElementById('header-section-container'), {\\\n  containerId: 'header-section-container',\\\n  title: 'Section Title',\\\n  showInfoButton: true,\\\n  infoTooltip: 'Informacion adicional'\\\n});'
  },
  variants: {
    showTitle: [
      true,
      false
    ],
    showInfoButton: [
      true,
      false
    ],
    showActions: [
      true,
      false
    ]
  },
  events: {
    onActionClick: {
      type: 'Event',
      description: 'Emitted when an action button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/HeaderSection/HeaderSection.stories.ts',
    providerPath: 'packages/../components/header-section/src/HeaderSectionProvider',
    typesPath: 'packages/../components/header-section/src/types/HeaderSectionOptions',
  },
  '🧩-ux-gallery': {
    componentId: '🧩-ux-gallery',
    category: 'Paisaje Montañoso',
    title: '🧩-ux-gallery',
    contract: {
  componentId: '🧩-ux-gallery',
  api: {
    create: 'window.UBITS.Gallery.create',
    tag: '<ubits-gallery>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-dim',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--ubits-spacing-none',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-spacing-15',
    '--ubits-spacing-20',
    '--ubits-border-radius-xs',
    '--ubits-border-radius-md',
    '--font-family-noto-sans-font-family',
    '--weight-semibold',
    '--gallery-gap',
    '--gallery-columns'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'items'
    ]
  },
  examples: {
    basic: 'window.UBITS.Gallery.create(document.getElementById('gallery-container'), {\\\n  containerId: 'gallery-container',\\\n  items: [\\\n    { id: 1, image: '/image1.jpg', thumbnail: '/thumb1.jpg', title: 'Image 1' }\\\n  ],\\\n  layout: 'grid'\\\n});',
    masonry: 'window.UBITS.Gallery.create(document.getElementById('gallery-container'), {\\\n  containerId: 'gallery-container',\\\n  items: [\\\n    { id: 1, image: '/image1.jpg', thumbnail: '/thumb1.jpg', title: 'Image 1' }\\\n  ],\\\n  layout: 'masonry'\\\n});',
    withLightbox: 'window.UBITS.Gallery.create(document.getElementById('gallery-container'), {\\\n  containerId: 'gallery-container',\\\n  items: [\\\n    { id: 1, image: '/image1.jpg', thumbnail: '/thumb1.jpg', title: 'Image 1' }\\\n  ],\\\n  layout: 'grid',\\\n  showLightbox: true\\\n});'
  },
  variants: {
    layout: [
      'grid',
      'masonry',
      'list'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    showLightbox: [
      true,
      false
    ]
  },
  events: {
    onItemClick: {
      type: 'Event',
      description: 'Emitted when a gallery item is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Gallery/Gallery.stories.ts',
    providerPath: 'packages/../components/gallery/src/GalleryProvider',
    typesPath: 'packages/../components/gallery/src/types/GalleryOptions',
  },
  '🧩-ux-file-upload': {
    componentId: '🧩-ux-file-upload',
    category: 'Formularios',
    title: 'File Upload',
    contract: {
  componentId: '🧩-ux-file-upload',
  api: {
    create: 'window.UBITS.FileUpload.create',
    tag: '<ubits-file-upload>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: [
      '🧩-ux-progress'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'default',\n  dropText: 'Arrastra tus archivos aquí',\n  selectButtonText: 'Seleccionar archivos'\n});',
    withFiles: 'window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'files-list',\n  files: [{ name: 'documento.pdf', size: 1024000 }],\n  showProgress: true\n});',
    withMaxFiles: 'window.UBITS.FileUpload.create(document.getElementById('file-upload-container'), {\n  containerId: 'file-upload-container',\n  state: 'default',\n  maxFiles: 5,\n  maxSize: 5242880\n});'
  },
  variants: {
    state: [
      'default',
      'files-list'
    ],
    showIcon: [
      true,
      false
    ],
    showFileSize: [
      true,
      false
    ],
    showProgress: [
      true,
      false
    ],
    showActions: [
      true,
      false
    ]
  },
  events: {
    onFileSelect: {
      type: 'Event',
      description: 'Emitted when files are selected'
    },
    onFileRemove: {
      type: 'Event',
      description: 'Emitted when a file is removed'
    },
    onUpload: {
      type: 'Event',
      description: 'Emitted when upload starts'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/FileUpload/FileUpload.stories.ts',
    providerPath: 'packages/../components/file-upload/src/FileUploadProvider',
    typesPath: 'packages/../components/file-upload/src/types/FileUploadOptions',
  },
  '🧩-ux-empty-state': {
    componentId: '🧩-ux-empty-state',
    category: 'Feedback',
    title: 'Empty State',
    contract: {
  componentId: '🧩-ux-empty-state',
  api: {
    create: 'window.UBITS.EmptyState.create',
    tag: '<ubits-empty-state>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title'
    ]
  },
  examples: {
    basic: 'window.UBITS.EmptyState.create({\n  title: 'No hay elementos',\n  description: 'No se encontraron elementos para mostrar.'\n});',
    withIcon: 'window.UBITS.EmptyState.create({\n  title: 'No hay elementos',\n  description: 'No se encontraron elementos para mostrar.',\n  icon: 'inbox',\n  iconSize: 'md'\n});',
    withImage: 'window.UBITS.EmptyState.create({\n  title: 'No hay elementos',\n  description: 'No se encontraron elementos para mostrar.',\n  imageUrl: 'https://example.com/empty-state.png'\n});',
    withButton: 'window.UBITS.EmptyState.create({\n  title: 'No hay elementos',\n  description: 'No se encontraron elementos para mostrar.',\n  showPrimaryButton: true,\n  actionLabel: 'Crear elemento'\n});'
  },
  variants: {
    iconSize: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    showPrimaryButton: [
      true,
      false
    ],
    showSecondaryButton: [
      true,
      false
    ]
  },
  events: {
    onPrimaryAction: {
      type: 'Event',
      description: 'Emitted when primary button is clicked'
    },
    onSecondaryAction: {
      type: 'Event',
      description: 'Emitted when secondary button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/EmptyState/EmptyState.stories.ts',
    providerPath: 'packages/../components/empty-state/src/EmptyStateProvider',
    typesPath: 'packages/../components/empty-state/src/types/EmptyStateOptions',
  },
  '⚙️-functional-drawer': {
    componentId: '⚙️-functional-drawer',
    category: 'Feedback',
    title: 'Drawer Navigation',
    contract: {
  componentId: '⚙️-functional-drawer',
  api: {
    create: 'window.UBITS.Drawer.create',
    tag: '<ubits-drawer>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button'
    ],
    optional: []
  },
  internals: [
    '⚙️-functional-scroll',
    '⚙️-functional-overlay'
  ],
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title'
    ]
  },
  examples: {
    basic: 'window.UBITS.Drawer.create({\\\n  title: 'Crear dato demográfico',\\\n  bodyContent: '<p>Contenido del drawer</p>',\\\n  width: 40\\\n});',
    withComplementaryText: 'window.UBITS.Drawer.create({\\\n  title: 'Crear dato demográfico',\\\n  complementaryText: 'Texto complementario',\\\n  bodyContent: '<p>Contenido del drawer</p>',\\\n  width: 40\\\n});',
    withButtons: 'window.UBITS.Drawer.create({\\\n  title: 'Crear dato demográfico',\\\n  bodyContent: '<p>Contenido del drawer</p>',\\\n  footerButtons: {\\\n    primary: { label: 'Guardar', onClick: () => {} },\\\n    secondary: { label: 'Cancelar', onClick: () => {} }\\\n  },\\\n  width: 40\\\n});'
  },
  variants: {
    width: [
      20,
      30,
      40,
      50,
      60
    ],
    closeOnOverlayClick: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when drawer is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Drawer/Drawer.stories.ts',
    providerPath: 'packages/../components/drawer/src/DrawerProvider',
    typesPath: 'packages/../components/drawer/src/types/DrawerOptions',
  },
  '🧩-ux-data-view': {
    componentId: '🧩-ux-data-view',
    category: 'Data',
    title: 'DataView',
    contract: {
  componentId: '🧩-ux-data-view',
  api: {
    create: 'createDataView'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-feedback-accent-success',
    '--modifiers-normal-color-light-feedback-accent-warning',
    '--modifiers-normal-color-light-feedback-accent-error',
    '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
    '--modifiers-normal-color-light-feedback-fg-warning-subtle-hover',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-border-radius-md',
    '--font-family-noto-sans-font-family',
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'products'
    ]
  },
  examples: {
    basic: 'createDataView(document.getElementById('data-view-container'), {\\\n  containerId: 'data-view-container',\\\n  products: [\\\n    { id: '1', name: 'Product 1', price: 100, stockStatus: 'INSTOCK' }\\\n  ]\\\n});',
    withWishlist: 'createDataView(document.getElementById('data-view-container'), {\\\n  containerId: 'data-view-container',\\\n  products: [\\\n    { id: '1', name: 'Product 1', price: 100, stockStatus: 'INSTOCK', inWishlist: true }\\\n  ]\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    stockStatus: [
      'INSTOCK',
      'LOWSTOCK',
      'OUTOFSTOCK'
    ]
  },
  events: {
    onProductClick: {
      type: 'Event',
      description: 'Emitted when a product is clicked'
    },
    onWishlistToggle: {
      type: 'Event',
      description: 'Emitted when wishlist button is toggled'
    },
    onBuyClick: {
      type: 'Event',
      description: 'Emitted when buy button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/DataView/DataView.stories.ts',
    providerPath: 'packages/../components/data-view/src/DataViewProvider',
    typesPath: 'packages/../components/data-view/src/types/DataViewOptions',
  },
  '🧩-ux-chip': {
    componentId: '🧩-ux-chip',
    category: 'Básicos',
    title: 'Chip',
    contract: {
  componentId: '🧩-ux-chip',
  api: {
    create: 'window.UBITS.Chip.create',
    tag: '<ubits-chip>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'label'
    ]
  },
  examples: {
    basic: 'window.UBITS.Chip.create({\n  label: 'Etiqueta',\n  size: 'md',\n  state: 'default'\n});',
    withLeftIcon: 'window.UBITS.Chip.create({\n  label: 'Etiqueta',\n  size: 'md',\n  state: 'default',\n  leftIcon: 'tag'\n});',
    closable: 'window.UBITS.Chip.create({\n  label: 'Etiqueta',\n  size: 'md',\n  state: 'default',\n  closable: true,\n  rightIcon: 'xmark'\n});',
    clickable: 'window.UBITS.Chip.create({\n  label: 'Etiqueta',\n  size: 'md',\n  state: 'default',\n  clickable: true\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'hover',
      'active',
      'pressed',
      'focus',
      'disabled'
    ],
    clickable: [
      true,
      false
    ],
    closable: [
      true,
      false
    ]
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when chip is clicked (only if clickable is true)'
    },
    onClose: {
      type: 'MouseEvent',
      description: 'Emitted when close button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Chip/Chip.stories.ts',
    providerPath: 'packages/../components/chip/src/ChipProvider',
    typesPath: 'packages/../components/chip/src/types/ChipOptions',
  },
  '🧩-ux-checkbox': {
    componentId: '🧩-ux-checkbox',
    category: 'Formularios',
    title: 'Checkbox',
    contract: {
  componentId: '🧩-ux-checkbox',
  api: {
    create: 'window.UBITS.Checkbox.create',
    tag: '<ubits-checkbox>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm',
    '--p-spacing-mode-1-sm'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'label'
    ]
  },
  examples: {
    basic: 'window.UBITS.Checkbox.create({\n  label: 'Label',\n  checked: false,\n  size: 'md',\n  state: 'default'\n});',
    checked: 'window.UBITS.Checkbox.create({\n  label: 'Label',\n  checked: true,\n  size: 'md',\n  state: 'default'\n});',
    withComplementaryText: 'window.UBITS.Checkbox.create({\n  label: 'Label',\n  complementaryText: 'Texto complementario',\n  checked: false,\n  size: 'md'\n});',
    indeterminate: 'window.UBITS.Checkbox.create({\n  label: 'Label',\n  checked: false,\n  indeterminate: true,\n  size: 'md'\n});',
    disabled: 'window.UBITS.Checkbox.create({\n  label: 'Label',\n  checked: false,\n  disabled: true,\n  size: 'md'\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'hover',
      'focus',
      'active',
      'disabled'
    ],
    checked: [
      true,
      false
    ],
    indeterminate: [
      true,
      false
    ],
    disabled: [
      true,
      false
    ]
  },
  events: {
    onChange: {
      type: 'Event',
      description: 'Emitted when checkbox value changes'
    },
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when checkbox is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Checkbox/Checkbox.stories.ts',
    providerPath: 'packages/../components/checkbox/src/CheckboxProvider',
    typesPath: 'packages/../components/checkbox/src/types/CheckboxOptions',
  },
  '🧩-ux-carousel': {
    componentId: '🧩-ux-carousel',
    category: 'Bamboo Watch',
    title: '🧩-ux-carousel',
    contract: {
  componentId: '🧩-ux-carousel',
  api: {
    create: 'window.UBITS.Carousel.create',
    tag: '<ubits-carousel>'
  },
  dependsOn: {
    required: [
      '🧩-ux-simple-card'
    ],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-4',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--ubits-spacing-none',
    '--ubits-spacing-xs',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-spacing-xl',
    '--ubits-border-radius-sm',
    '--ubits-border-radius-md',
    '--font-family-noto-sans-font-family',
    '--carousel-gap'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'items'
    ]
  },
  examples: {
    basic: 'createCarousel(document.getElementById('carousel-container'), {\\\n  containerId: 'carousel-container',\\\n  items: [\\\n    { id: 1, title: 'Item 1', content: 'Content 1' },\\\n    { id: 2, title: 'Item 2', content: 'Content 2' }\\\n  ]\\\n});',
    withArrows: 'createCarousel(document.getElementById('carousel-container'), {\\\n  containerId: 'carousel-container',\\\n  items: [\\\n    { id: 1, title: 'Item 1', content: 'Content 1' }\\\n  ],\\\n  showArrows: true,\\\n  arrowsPosition: 'outside'\\\n});',
    withIndicators: 'createCarousel(document.getElementById('carousel-container'), {\\\n  containerId: 'carousel-container',\\\n  items: [\\\n    { id: 1, title: 'Item 1', content: 'Content 1' }\\\n  ],\\\n  showIndicators: true,\\\n  indicatorsPosition: 'bottom'\\\n});'
  },
  variants: {
    arrowsPosition: [
      'inside',
      'outside'
    ],
    indicatorsPosition: [
      'bottom',
      'top'
    ],
    cardSize: [
      'sm',
      'md',
      'lg',
      'xl'
    ],
    cardVariant: [
      'default',
      'elevated',
      'bordered',
      'flat'
    ]
  },
  events: {
    onItemClick: {
      type: 'Event',
      description: 'Emitted when a carousel item is clicked'
    },
    onSlideChange: {
      type: 'Event',
      description: 'Emitted when the active slide changes'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Carousel/Carousel.stories.ts',
    providerPath: 'packages/../components/carousel/src/CarouselProvider',
    typesPath: 'packages/../components/carousel/src/types/CarouselOptions',
  },
  '🧩-ux-card-content': {
    componentId: '🧩-ux-card-content',
    category: 'Layout',
    title: 'Card Content',
    contract: {
  componentId: '🧩-ux-card-content',
  api: {
    create: 'createCard'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-4',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-feedback-accent-success',
    '--font-family-noto-sans-font-family',
    '--weight-bold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'type',
      'title',
      'provider',
      'image',
      'competency'
    ]
  },
  examples: {
    basic: 'createCard({\\\n  type: 'Curso',\\\n  title: 'Segmenta la experiencia del cliente',\\\n  provider: 'UBITS',\\\n  image: '/images/card.jpg',\\\n  competency: 'Marketing'\\\n});',
    withProgress: 'createCard({\\\n  type: 'Curso',\\\n  title: 'Segmenta la experiencia del cliente',\\\n  provider: 'UBITS',\\\n  image: '/images/card.jpg',\\\n  competency: 'Marketing',\\\n  state: 'progress',\\\n  progress: 50\\\n});',
    completed: 'createCard({\\\n  type: 'Curso',\\\n  title: 'Segmenta la experiencia del cliente',\\\n  provider: 'UBITS',\\\n  image: '/images/card.jpg',\\\n  competency: 'Marketing',\\\n  state: 'completed'\\\n});'
  },
  variants: {
    state: [
      'default',
      'progress',
      'completed'
    ]
  },
  events: {
    onClick: {
      type: 'Event',
      description: 'Emitted when card is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/CardContent/CardContent.stories.ts',
    providerPath: 'packages/../components/card/src/CardContentProvider',
    typesPath: 'packages/../components/card/src/types/CardContentOptions',
  },
  '🧩-ux-calendar': {
    componentId: '🧩-ux-calendar',
    category: 'Formularios',
    title: 'Calendar',
    contract: {
  componentId: '🧩-ux-calendar',
  api: {
    create: 'window.UBITS.Calendar.create',
    tag: '<ubits-calendar>'
  },
  dependsOn: {
    required: [
      '🧩-ux-button',
      '🧩-ux-input',
      '🧩-ux-list'
    ],
    optional: []
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-1-low',
    '--modifiers-normal-color-light-fg-1-disabled',
    '--modifiers-normal-color-light-feedback-bg-success',
    '--modifiers-normal-color-light-feedback-bg-warning',
    '--modifiers-normal-color-light-feedback-bg-error',
    '--modifiers-normal-color-light-feedback-border-success',
    '--modifiers-normal-color-light-feedback-border-warning',
    '--modifiers-normal-color-light-feedback-border-error',
    '--modifiers-normal-color-light-feedback-accent-info',
    '--font-family-noto-sans-font-family',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--weight-semibold',
    '--weight-medium',
    '--weight-regular',
    '--p-spacing-mode-1-xs',
    '--p-spacing-mode-1-sm',
    '--p-spacing-mode-1-md',
    '--p-spacing-mode-1-lg',
    '--radius-sm',
    '--radius-md',
    '--radius-lg'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Calendar.create(document.getElementById('calendar-container'), {\n  containerId: 'calendar-container'\n});',
    withDefaultDate: 'window.UBITS.Calendar.create(document.getElementById('calendar-container'), {\n  containerId: 'calendar-container',\n  defaultDate: new Date(2024, 0, 15)\n});',
    range: 'window.UBITS.Calendar.create(document.getElementById('calendar-container'), {\n  containerId: 'calendar-container',\n  mode: 'range',\n  startDate: new Date(2024, 0, 1),\n  endDate: new Date(2024, 0, 31)\n});'
  },
  variants: {
    mode: [
      'single',
      'range'
    ]
  },
  events: {
    onDateSelect: {
      type: 'Event',
      description: 'Emitted when a date is selected'
    },
    onRangeSelect: {
      type: 'Event',
      description: 'Emitted when a date range is selected (only in range mode)'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Calendar/Calendar.stories.ts',
    providerPath: 'packages/components/calendar/src/CalendarProvider.ts',
    
  },
  '🧩-ux-csat-metric-card': {
    componentId: '🧩-ux-csat-metric-card',
    category: 'Charts',
    title: 'CSAT Metric Card',
    contract: {
  componentId: '🧩-ux-csat-metric-card',
  api: {
    create: 'createCSATMetricCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-border-2',
    '--ubits-border-radius-sm',
    '--font-family-noto-sans-font-family',
    '--weight-regular'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'title',
      'totalResponses',
      'average',
      'score'
    ]
  },
  examples: {
    basic: 'createCSATMetricCard(document.getElementById('csat-metric-card-container'), {\\\n  containerId: 'csat-metric-card-container',\\\n  title: 'Califica el producto',\\\n  totalResponses: 100,\\\n  average: 4.5,\\\n  score: { 1: 5, 2: 10, 3: 20, 4: 30, 5: 35 }\\\n});',
    withButtons: 'createCSATMetricCard(document.getElementById('csat-metric-card-container'), {\\\n  containerId: 'csat-metric-card-container',\\\n  title: 'Califica el producto',\\\n  totalResponses: 100,\\\n  average: 4.5,\\\n  score: { 1: 5, 2: 10, 3: 20, 4: 30, 5: 35 },\\\n  showInfoButton: true,\\\n  showActionButton: true\\\n});'
  },
  variants: {
    size: [
      'sm',
      'md',
      'lg'
    ],
    showInfoButton: [
      true,
      false
    ],
    showActionButton: [
      true,
      false
    ]
  },
  events: {
    onInfoClick: {
      type: 'Event',
      description: 'Emitted when info button is clicked'
    },
    onActionClick: {
      type: 'Event',
      description: 'Emitted when action button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/CSATMetricCard/CSATMetricCard.stories.ts',
    providerPath: 'packages/../components/csat-metric-card/src/CSATMetricCardProvider',
    typesPath: 'packages/../components/csat-metric-card/src/types/CSATMetricCardOptions',
  },
  '🧩-ux-button-feedback': {
    componentId: '🧩-ux-button-feedback',
    category: 'Feedback',
    title: 'Button Feedback',
    contract: {
  componentId: '🧩-ux-button-feedback',
  api: {
    create: 'createButtonFeedback'
  },
  dependsOn: {
    required: [
      '🧩-ux-button',
      '🧩-ux-modal',
      '🧩-ux-input'
    ],
    optional: []
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-active',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-accent-brand',
    '--ubits-spacing-sm',
    '--ubits-spacing-md',
    '--ubits-spacing-lg',
    '--ubits-body-md-font-size'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'createButtonFeedback({\\\n  text: 'Feedback',\\\n  icon: 'comment-dots',\\\n  position: 'bottom-right'\\\n});',
    withText: 'createButtonFeedback({\\\n  text: 'Dejanos tu opinion',\\\n  icon: 'comment-dots',\\\n  position: 'bottom-right'\\\n});',
    differentPosition: 'createButtonFeedback({\\\n  text: 'Feedback',\\\n  icon: 'comment-dots',\\\n  position: 'top-left'\\\n});'
  },
  variants: {
    position: [
      'bottom-right',
      'bottom-left',
      'top-right',
      'top-left'
    ]
  },
  events: {
    onSubmit: {
      type: 'Event',
      description: 'Emitted when feedback form is submitted'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/ButtonFeedback/ButtonFeedback.stories.ts',
    providerPath: 'packages/../components/button-feedback/src/ButtonFeedbackProvider',
    typesPath: 'packages/../components/button-feedback/src/types/ButtonFeedbackOptions',
  },
  '🧩-ux-button-ai': {
    componentId: '🧩-ux-button-ai',
    category: 'Básicos',
    title: 'ButtonAI',
    contract: {
  componentId: '🧩-ux-button-ai',
  api: {
    create: 'createButtonAI'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-active',
    '--modifiers-normal-color-light-bg-disabled',
    '--modifiers-normal-color-light-fg-bold',
    '--modifiers-normal-color-light-fg-on-disabled',
    '--modifiers-normal-color-light-border-disabled',
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-ai-button-primary-color-bg',
    '--modifiers-normal-ai-button-color-light-secondary-accent-gradient-end',
    '--modifiers-normal-button-color-light-brand-primary-bg-default',
    '--modifiers-normal-button-color-light-brand-primary-bg-hover',
    '--modifiers-normal-button-color-light-brand-primary-bg-pressed',
    '--modifiers-static-color-light-accent-brand',
    '--modifiers-normal-body-md-regular-fontsize',
    '--modifiers-normal-body-md-regular-lineheight',
    '--modifiers-normal-body-xs-regular-fontsize',
    '--modifiers-normal-body-xs-regular-lineheight',
    '--font-family-noto-sans-font-family',
    '--weight-semibold'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'createButtonAI({\n  variant: 'primary',\n  size: 'md',\n  text: 'Button text'\n});',
    withIcon: 'createButtonAI({\n  variant: 'primary',\n  size: 'md',\n  text: 'Button text',\n  icon: 'sparkles',\n  iconStyle: 'regular'\n});',
    secondary: 'createButtonAI({\n  variant: 'secondary',\n  size: 'md',\n  text: 'Button text'\n});',
    disabled: 'createButtonAI({\n  variant: 'primary',\n  size: 'md',\n  text: 'Button text',\n  disabled: true\n});'
  },
  variants: {
    variant: [
      'primary',
      'secondary'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    iconStyle: [
      'regular',
      'solid'
    ],
    disabled: [
      true,
      false
    ]
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when button is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/ButtonAI/ButtonAI.stories.ts',
    providerPath: 'packages/../components/button-ai/src/ButtonAIProvider',
    typesPath: 'packages/../components/button-ai/src/types/ButtonAIOptions',
  },
  '🧩-ux-button': {
    componentId: '🧩-ux-button',
    category: 'Básicos',
    title: 'Button',
    contract: {
  componentId: '🧩-ux-button',
  api: {
    create: 'window.UBITS.Button.create',
    tag: '<ubits-button>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon',
      '🧩-ux-tooltip'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-accent-brand',
    '--modifiers-normal-color-light-bg-active-button',
    '--modifiers-normal-color-light-bg-1',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'variant',
      'text'
    ]
  },
  examples: {
    basic: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Click me\'\n});',
    withIcon: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Save\',\n  icon: \'save\',\n  iconPosition: \'left\'\n});',
    disabled: 'window.UBITS.Button.create({\n  variant: \'primary\',\n  text: \'Disabled\',\n  disabled: true\n});'
  },
  variants: {
    variant: [
      'primary',
      'secondary',
      'tertiary'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    state: [
      'default',
      'hover',
      'active',
      'disabled'
    ]
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when button is clicked'
    },
    onFocus: {
      type: 'FocusEvent',
      description: 'Emitted when button receives focus'
    },
    onBlur: {
      type: 'FocusEvent',
      description: 'Emitted when button loses focus'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Button/Button.stories.ts',
    providerPath: 'packages/../components/button/src/ButtonProvider',
    typesPath: 'packages/../components/button/src/types/ButtonOptions',
  },
  '🧩-ux-breadcrumb': {
    componentId: '🧩-ux-breadcrumb',
    category: 'Navegación',
    title: 'Breadcrumb',
    contract: {
  componentId: '🧩-ux-breadcrumb',
  api: {
    create: 'window.UBITS.Breadcrumb.create',
    tag: '<ubits-breadcrumb>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--modifiers-normal-color-light-fg-disabled',
    '--modifiers-normal-color-light-feedback-accent-info',
    '--modifiers-normal-body-sm-regular-fontsize',
    '--modifiers-normal-body-sm-regular-lineheight',
    '--font-family-noto-sans-font-family',
    '--weight-regular',
    '--weight-bold',
    '--p-spacing-mode-1-sm',
    '--ubits-spacing-none'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'items'
    ]
  },
  examples: {
    basic: 'window.UBITS.Breadcrumb.create(document.getElementById('breadcrumb-container'), {\\\n  containerId: 'breadcrumb-container',\\\n  items: [\\\n    { id: 'home', label: 'Home', url: '/' },\\\n    { id: 'section', label: 'Section', url: '/section' },\\\n    { id: 'page', label: 'Page' }\\\n  ]\\\n});',
    withCustomSeparator: 'window.UBITS.Breadcrumb.create(document.getElementById('breadcrumb-container'), {\\\n  containerId: 'breadcrumb-container',\\\n  items: [\\\n    { id: 'home', label: 'Home', url: '/' },\\\n    { id: 'section', label: 'Section', url: '/section' }\\\n  ],\\\n  separator: '/'\\\n});'
  },
  events: {
    onItemClick: {
      type: 'Event',
      description: 'Emitted when a breadcrumb item is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Breadcrumb/Breadcrumb.stories.ts',
    providerPath: 'packages/../components/breadcrumb/src/BreadcrumbProvider',
    typesPath: 'packages/../components/breadcrumb/src/types/BreadcrumbOptions',
  },
  '🧩-ux-bar-metric-card': {
    componentId: '🧩-ux-bar-metric-card',
    category: 'Charts',
    title: 'Bar Metric Card',
    contract: {
  componentId: '🧩-ux-bar-metric-card',
  api: {
    create: 'createBarMetricCard'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button',
      '🧩-ux-progress-bar'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-bg-3',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-2-medium',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-border-2',
    '--ubits-chart-color-bg-neutral-blue-base',
    '--ubits-border-radius-sm',
    '--ubits-border-radius-md',
    '--ubits-spacing-none',
    '--font-family-noto-sans-font-family',
    '--weight-regular',
    '--weight-bold'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'barData',
      'categories'
    ]
  },
  examples: {
    basic: 'createBarMetricCard(document.getElementById('bar-metric-card-container'), {\\\n  containerId: 'bar-metric-card-container',\\\n  title: 'Metricas',\\\n  barData: [10, 20, 30],\\\n  categories: [\\\n    { label: 'Category 1', current: 10, total: 100 }\\\n  ]\\\n});',
    horizontal: 'createBarMetricCard(document.getElementById('bar-metric-card-container'), {\\\n  containerId: 'bar-metric-card-container',\\\n  title: 'Metricas',\\\n  barData: [10, 20, 30],\\\n  categories: [\\\n    { label: 'Category 1', current: 10, total: 100 }\\\n  ],\\\n  layout: 'horizontal'\\\n});',
    withResponseCount: 'createBarMetricCard(document.getElementById('bar-metric-card-container'), {\\\n  containerId: 'bar-metric-card-container',\\\n  title: 'Metricas',\\\n  barData: [10, 20, 30],\\\n  categories: [\\\n    { label: 'Category 1', current: 10, total: 100 }\\\n  ],\\\n  showResponseCount: true,\\\n  responseCount: 50\\\n});'
  },
  variants: {
    layout: [
      'vertical',
      'horizontal'
    ],
    size: [
      'sm',
      'md',
      'lg'
    ],
    showResponseCount: [
      true,
      false
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/BarMetricCard/BarMetricCard.stories.ts',
    providerPath: 'packages/../components/bar-metric-card/src/BarMetricCardProvider',
    typesPath: 'packages/../components/bar-metric-card/src/types/BarMetricCardOptions',
  },
  '🧩-ux-badge': {
    componentId: '🧩-ux-badge',
    category: 'Básicos',
    title: 'Badge',
    contract: {
  componentId: '🧩-ux-badge',
  api: {
    create: 'window.UBITS.Badge.create',
    tag: '<ubits-badge>'
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Badge.create({\n  type: 'number',\n  variant: 'error',\n  style: 'light',\n  size: 'md',\n  content: '5'\n});',
    dot: 'window.UBITS.Badge.create({\n  type: 'dot',\n  variant: 'error',\n  style: 'light',\n  size: 'md'\n});',
    withLabel: 'window.UBITS.Badge.create({\n  type: 'number',\n  variant: 'error',\n  style: 'light',\n  size: 'md',\n  content: '5',\n  showLabel: true,\n  label: 'Nuevos'\n});',
    absolute: 'window.UBITS.Badge.create({\n  type: 'number',\n  variant: 'error',\n  style: 'light',\n  size: 'md',\n  content: '5',\n  absolute: true,\n  position: 'top-right'\n});'
  },
  variants: {
    type: [
      'dot',
      'number'
    ],
    variant: [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info'
    ],
    style: [
      'light',
      'neutral',
      'bold'
    ],
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ],
    position: [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left'
    ]
  }
} as UBITSContract,
    storyPath: 'stories/components/Badge/Badge.stories.ts',
    providerPath: 'packages/../components/badge/src/BadgeProvider',
    typesPath: 'packages/../components/badge/src/types/BadgeOptions',
  },
  '🧩-ux-avatar': {
    componentId: '🧩-ux-avatar',
    category: 'Básicos',
    title: 'Avatar',
    contract: {
  componentId: '🧩-ux-avatar',
  api: {
    create: 'window.UBITS.Avatar.create',
    tag: '<ubits-avatar>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-badge'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--ubits-border-radius-sm'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Avatar.create({\n  icon: 'user',\n  size: 'md',\n  alt: 'Avatar'\n});',
    withInitials: 'window.UBITS.Avatar.create({\n  initials: 'JD',\n  size: 'md',\n  alt: 'Avatar'\n});',
    withImage: 'window.UBITS.Avatar.create({\n  imageUrl: 'https://example.com/avatar.jpg',\n  size: 'md',\n  alt: 'Avatar'\n});',
    withBadge: 'window.UBITS.Avatar.create({\n  icon: 'user',\n  size: 'md',\n  badgeColor: 'error',\n  badgeContent: '5',\n  alt: 'Avatar'\n});'
  },
  variants: {
    size: [
      'xs',
      'sm',
      'md',
      'lg'
    ]
  },
  events: {
    onClick: {
      type: 'MouseEvent',
      description: 'Emitted when avatar is clicked'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Avatar/Avatar.stories.ts',
    providerPath: 'packages/../components/avatar/src/AvatarProvider',
    typesPath: 'packages/../components/avatar/src/types/AvatarOptions',
  },
  '🧩-ux-alert': {
    componentId: '🧩-ux-alert',
    category: 'Feedback',
    title: 'Alert',
    contract: {
  componentId: '🧩-ux-alert',
  api: {
    create: 'window.UBITS.Alert.create',
    tag: '<ubits-alert>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-button'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-feedback-bg-success-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-info-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-warning-subtle-default',
    '--modifiers-normal-color-light-feedback-bg-error-subtle-default',
    '--modifiers-normal-color-light-fg-1-high'
  ],
  rules: {
    forbidHardcodedColors: true
  },
  examples: {
    basic: 'window.UBITS.Alert.create({\\\n  type: 'success',\\\n  message: 'Los cambios se han guardado correctamente.',\\\n  closable: true\\\n});',
    info: 'window.UBITS.Alert.create({\\\n  type: 'info',\\\n  message: 'Información importante para el usuario.',\\\n  closable: true\\\n});',
    warning: 'window.UBITS.Alert.create({\\\n  type: 'warning',\\\n  message: 'Advertencia: revisa los datos ingresados.',\\\n  closable: true\\\n});',
    error: 'window.UBITS.Alert.create({\\\n  type: 'error',\\\n  message: 'Error al procesar la solicitud.',\\\n  closable: true\\\n});',
    notClosable: 'window.UBITS.Alert.create({\\\n  type: 'success',\\\n  message: 'Operación completada.',\\\n  closable: false\\\n});'
  },
  variants: {
    type: [
      'success',
      'info',
      'warning',
      'error'
    ],
    closable: [
      true,
      false
    ]
  },
  events: {
    onClose: {
      type: 'Event',
      description: 'Emitted when alert is closed'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Alert/Alert.stories.ts',
    providerPath: 'packages/../components/alert/src/AlertProvider',
    typesPath: 'packages/../components/alert/src/types/AlertOptions',
  },
  '🧩-ux-accordion': {
    componentId: '🧩-ux-accordion',
    category: 'Layout',
    title: 'Accordion',
    contract: {
  componentId: '🧩-ux-accordion',
  api: {
    create: 'window.UBITS.Accordion.create',
    tag: '<ubits-accordion>'
  },
  dependsOn: {
    required: [],
    optional: [
      '🧩-ux-icon'
    ]
  },
  tokensUsed: [
    '--modifiers-normal-color-light-bg-1',
    '--modifiers-normal-color-light-bg-2',
    '--modifiers-normal-color-light-border-1',
    '--modifiers-normal-color-light-fg-1-high',
    '--modifiers-normal-color-light-fg-1-medium',
    '--ubits-spacing-md'
  ],
  rules: {
    forbidHardcodedColors: true,
    requiredProps: [
      'items'
    ]
  },
  examples: {
    basic: 'window.UBITS.Accordion.create({\n  items: [\n    { id: '1', title: 'Pregunta 1', content: 'Respuesta 1' },\n    { id: '2', title: 'Pregunta 2', content: 'Respuesta 2' }\n  ],\n  variant: 'list',\n  chevronPosition: 'right'\n});',
    boxed: 'window.UBITS.Accordion.create({\n  items: [\n    { id: '1', title: 'Pregunta 1', content: 'Respuesta 1' }\n  ],\n  variant: 'boxed',\n  chevronPosition: 'right'\n});',
    withIcons: 'window.UBITS.Accordion.create({\n  items: [\n    { id: '1', title: 'Pregunta 1', content: 'Respuesta 1', icon: 'circle-question' }\n  ],\n  variant: 'list',\n  showIcons: true\n});',
    multiple: 'window.UBITS.Accordion.create({\n  items: [\n    { id: '1', title: 'Pregunta 1', content: 'Respuesta 1' },\n    { id: '2', title: 'Pregunta 2', content: 'Respuesta 2' }\n  ],\n  variant: 'list',\n  allowMultiple: true\n});'
  },
  variants: {
    variant: [
      'list',
      'boxed'
    ],
    chevronPosition: [
      'left',
      'right'
    ],
    allowMultiple: [
      true,
      false
    ],
    showIcons: [
      true,
      false
    ]
  },
  events: {
    onToggle: {
      type: 'Event',
      description: 'Emitted when an accordion item is toggled'
    }
  }
} as UBITSContract,
    storyPath: 'stories/components/Accordion/Accordion.stories.ts',
    providerPath: 'packages/../components/accordion/src/AccordionProvider',
    typesPath: 'packages/../components/accordion/src/types/AccordionOptions',
  },
};

export function findComponentById(componentId: string): ComponentInfo | undefined {
  return UBITSComponentIndex[componentId];
}

export function findComponentsByCategory(category: string): ComponentInfo[] {
  return Object.values(UBITSComponentIndex).filter(
    (component) => component.category === category
  );
}

export function findComponentsThatDependOn(dependencyId: string): ComponentInfo[] {
  return Object.values(UBITSComponentIndex).filter((component) => {
    const required = component.contract.dependsOn?.required || [];
    const optional = component.contract.dependsOn?.optional || [];
    return required.includes(dependencyId) || optional.includes(dependencyId);
  });
}

export function getAllComponents(): ComponentInfo[] {
  return Object.values(UBITSComponentIndex);
}

export function getAllComponentIds(): string[] {
  return Object.keys(UBITSComponentIndex);
}

export function isValidComponentId(componentId: string): boolean {
  return componentId in UBITSComponentIndex;
}

export function getComponentCategory(componentId: string): string | undefined {
  return UBITSComponentIndex[componentId]?.category;
}

export function getComponentTitle(componentId: string): string | undefined {
  return UBITSComponentIndex[componentId]?.title;
}

export function exportIndexAsJSON(): string {
  return JSON.stringify(UBITSComponentIndex, null, 2);
}
