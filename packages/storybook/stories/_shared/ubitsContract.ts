/**
 * UBITS Contract Helper
 *
 * Helper para crear el contrato `parameters.ubits` que Autorun necesita
 * para implementar componentes de manera determinística.
 */

/**
 * Evento que emite un componente
 */
export interface ComponentEvent {
	type: string; // Tipo del evento (MouseEvent, FocusEvent, etc.)
	description: string; // Descripción del evento
	payload?: Record<string, any>; // Estructura del payload (opcional)
}

/**
 * Variantes disponibles para una propiedad
 */
export interface ComponentVariants {
	[key: string]: (string | number | boolean)[]; // Ej: { variant: ['primary', 'secondary'], size: ['sm', 'md', 'lg'], enabled: [true, false] }
}

/**
 * Ejemplos de código canónicos
 */
export interface ComponentExamples {
	[key: string]: string; // Ej: { basic: '...', withIcon: '...', canonical: '...' }
	canonical?: string; // ⭐ Ejemplo canónico único (prioridad para Autorun)
	implementation?: string; // ⭐ Alias de canonical para compatibilidad
}

export interface UBITSContract {
	componentId: string;
	api?: {
		create?: string; // Ej: "window.UBITS.Button.create"
		tag?: string; // Ej: "<ubits-button>"
		apply?: string; // Para templates: función para aplicar el template
		templatePath?: string; // Para templates: ruta al archivo HTML del template
	};
	dependsOn?: {
		required: string[]; // Componentes que el consumidor DEBE componer
		optional: string[]; // Componentes opcionales que el consumidor puede componer
	};
	internals?: string[]; // Componentes privados que NO debes re-implementar
	slots?: {
		[key: string]: string[]; // Ej: { header: ["🧩-ux-button"], body: ["🧩-ux-input"] }
	};
	tokensUsed?: string[]; // Tokens CSS usados (para forzar var(--token))
	rules?: {
		forbidHardcodedColors?: boolean;
		forbiddenPatterns?: string[]; // Ej: ["rgb(", "hsl(", "#"]
		requiredProps?: string[]; // Props requeridas para el componente
	};
	isTemplate?: boolean; // Indica si es un template (composición completa) en lugar de un componente individual
	templateComponents?: string[]; // Componentes UBITS que el template usa internamente
	// ⭐ NUEVOS CAMPOS PARA AUTORUN
	examples?: ComponentExamples; // Ejemplos de código canónicos
	variants?: ComponentVariants; // Variantes disponibles para cada propiedad
	events?: Record<string, ComponentEvent>; // Eventos que emite el componente
	// ⭐ CAMPOS ADICIONALES PARA PERFECCIÓN AUTORUN
	storybook?: {
		canonicalStoryId?: string;
		storiesByExample?: Record<string, string>;
	};
	intents?: Record<string, string>; // Mapeo de intents a ejemplos
	recipeIntent?: string[]; // Para recipes: intents que resuelve
}

/**
 * Crea un contrato UBITS estándar
 */
export function createUBITSContract(config: UBITSContract): UBITSContract {
	return {
		componentId: config.componentId,
		api: config.api || {},
		dependsOn: {
			required: config.dependsOn?.required || [],
			optional: config.dependsOn?.optional || [],
		},
		internals: config.internals || [],
		slots: config.slots || {},
		tokensUsed: config.tokensUsed || [],
		rules: {
			forbidHardcodedColors: config.rules?.forbidHardcodedColors ?? true,
			forbiddenPatterns: config.rules?.forbiddenPatterns || ['rgb(', 'hsl(', '#'],
			requiredProps: config.rules?.requiredProps || [],
		},
		isTemplate: config.isTemplate || false,
		templateComponents: config.templateComponents || [],
		// ⭐ NUEVOS CAMPOS
		examples: config.examples || {},
		variants: config.variants || {},
		events: config.events || {},
		// ⭐ CAMPOS ADICIONALES
		storybook: config.storybook || {},
		intents: config.intents || {},
		recipeIntent: config.recipeIntent || [],
	};
}

/**
 * Helper para crear snippet exacto de código
 */
export function createExactSnippet(
	componentName: string,
	props: Record<string, any>,
	apiType: 'create' | 'tag' = 'create',
): string {
	if (apiType === 'create') {
		const propsString = Object.entries(props)
			.map(([key, value]) => {
				if (typeof value === 'string') {
					return `  ${key}: '${value}'`;
				}
				if (typeof value === 'boolean') {
					return `  ${key}: ${value}`;
				}
				if (typeof value === 'number') {
					return `  ${key}: ${value}`;
				}
				return `  ${key}: ${JSON.stringify(value)}`;
			})
			.join(',\n');
		return `window.UBITS.${componentName}.create({\n${propsString}\n});`;
	} else {
		// Tag format
		const attrs = Object.entries(props)
			.map(([key, value]) => {
				if (typeof value === 'boolean' && value) {
					return key;
				}
				return `${key}="${value}"`;
			})
			.join(' ');
		return `<ubits-${componentName.toLowerCase()} ${attrs}></ubits-${componentName.toLowerCase()}>`;
	}
}
