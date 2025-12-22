/**
 * Script de Verificación Completa para Autorun
 * 
 * Verifica que todos los componentes tengan todos los campos necesarios
 * para que Autorun pueda implementarlos correctamente.
 * 
 * Dividido en grupos y fases para facilitar el proceso.
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
	componentId: string;
	filePath: string;
	group: string;
	phase: string;
	status: '✅' | '⚠️' | '❌';
	issues: string[];
	details: Record<string, any>;
}

interface ComponentGroup {
	name: string;
	components: string[];
	description: string;
}

// Grupos de componentes organizados por categoría
const COMPONENT_GROUPS: ComponentGroup[] = [
	{
		name: 'Básicos',
		components: ['Alert', 'Avatar', 'Badge', 'Button', 'Chip', 'Skeleton', 'Spinner', 'StatusTag'],
		description: 'Componentes básicos de UI'
	},
	{
		name: 'Formularios',
		components: ['Checkbox', 'Input', 'RadioButton', 'FileUpload', 'SearchButton', 'Toggle', 'Calendar', 'Slider'],
		description: 'Componentes de formularios e inputs'
	},
	{
		name: 'Feedback',
		components: ['Toast', 'Tooltip', 'EmptyState', 'Drawer', 'Modal', 'Popover', 'Mask'],
		description: 'Componentes de retroalimentación y notificaciones'
	},
	{
		name: 'Navegación',
		components: ['Breadcrumb', 'Menu', 'Sidebar', 'SubNav', 'TabBar', 'Tabs', 'SegmentControl', 'TreeMenu', 'ParticipantsMenu'],
		description: 'Componentes de navegación y estructura'
	},
	{
		name: 'Data',
		components: ['List', 'DataTable', 'DataView', 'Pagination', 'Scrollbar'],
		description: 'Componentes de visualización de datos'
	},
	{
		name: 'Charts',
		components: ['BarMetricCard', 'CSATMetricCard', 'MetricCard', 'NPSCard', 'ProgressBar', 'ScoreCardMetrics', 'ProgressGeneralCard'],
		description: 'Componentes de métricas y gráficos'
	},
	{
		name: 'Layout',
		components: ['CardContent', 'Carousel', 'Gallery', 'HeaderSection', 'SelectionCard', 'SimpleCard', 'Timeline', 'Accordion'],
		description: 'Componentes de layout y estructura'
	},
	{
		name: 'Especiales',
		components: ['ButtonAI', 'ButtonFeedback'],
		description: 'Componentes especiales con funcionalidades específicas'
	}
];

// Fases de verificación
const VERIFICATION_PHASES = [
	{
		name: 'Fase 1: Campos Básicos',
		fields: ['componentId', 'api.create', 'api.tag'],
		description: 'Identificación y API básica'
	},
	{
		name: 'Fase 2: Dependencias',
		fields: ['dependsOn.required', 'dependsOn.optional', 'internals', 'slots'],
		description: 'Relaciones entre componentes'
	},
	{
		name: 'Fase 3: Tokens y Reglas',
		fields: ['tokensUsed', 'rules.forbidHardcodedColors', 'rules.requiredProps'],
		description: 'Tokens CSS y reglas de validación'
	},
	{
		name: 'Fase 4: Ejemplos Canónicos',
		fields: ['examples.canonical'],
		description: 'Ejemplo canónico para Autorun'
	},
	{
		name: 'Fase 5: Ejemplos Adicionales',
		fields: ['examples.basic', 'examples (otros)'],
		description: 'Ejemplos adicionales y variantes'
	},
	{
		name: 'Fase 6: Variantes y Eventos',
		fields: ['variants', 'events'],
		description: 'Variantes disponibles y eventos emitidos'
	},
	{
		name: 'Fase 7: Storybook e Intents',
		fields: ['storybook.canonicalStoryId', 'storybook.storiesByExample', 'intents'],
		description: 'Mapeo de stories e intents para selección'
	},
	{
		name: 'Fase 8: DOM Marker',
		fields: ['data-ubits-id'],
		description: 'Marcador DOM para escaneo'
	}
];

function readStoryFile(filePath: string): string {
	try {
		return fs.readFileSync(filePath, 'utf-8');
	} catch (error) {
		return '';
	}
}

function extractUBITSContract(content: string): any {
	// Buscar el objeto ubits en parameters
	const ubitsMatch = content.match(/ubits:\s*createUBITSContract\(({[\s\S]*?})\)/);
	if (!ubitsMatch) return null;

	try {
		// Extraer el objeto de configuración
		const configMatch = content.match(/createUBITSContract\(\s*({[\s\S]*?})\s*\)/);
		if (!configMatch) return null;

		// Intentar parsear el objeto (simplificado)
		const configStr = configMatch[1];
		
		// Extraer campos específicos usando regex
		const contract: any = {};
		
		// componentId
		const componentIdMatch = configStr.match(/componentId:\s*['"]([^'"]+)['"]/);
		if (componentIdMatch) contract.componentId = componentIdMatch[1];
		
		// api
		const apiMatch = configStr.match(/api:\s*({[\s\S]*?}),?\s*(?:dependsOn|internals|slots|tokensUsed|rules|examples|variants|events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (apiMatch) {
			contract.api = {};
			const createMatch = apiMatch[1].match(/create:\s*['"]([^'"]+)['"]/);
			if (createMatch) contract.api.create = createMatch[1];
			const tagMatch = apiMatch[1].match(/tag:\s*['"]([^'"]+)['"]/);
			if (tagMatch) contract.api.tag = tagMatch[1];
		}
		
		// dependsOn
		const dependsOnMatch = configStr.match(/dependsOn:\s*({[\s\S]*?}),?\s*(?:internals|slots|tokensUsed|rules|examples|variants|events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (dependsOnMatch) {
			contract.dependsOn = {};
			const requiredMatch = dependsOnMatch[1].match(/required:\s*\[([\s\S]*?)\]/);
			if (requiredMatch) {
				contract.dependsOn.required = requiredMatch[1].split(',').map((s: string) => s.trim().replace(/['"]/g, '')).filter((s: string) => s);
			}
			const optionalMatch = dependsOnMatch[1].match(/optional:\s*\[([\s\S]*?)\]/);
			if (optionalMatch) {
				contract.dependsOn.optional = optionalMatch[1].split(',').map((s: string) => s.trim().replace(/['"]/g, '')).filter((s: string) => s);
			}
		}
		
		// internals
		const internalsMatch = configStr.match(/internals:\s*\[([\s\S]*?)\]/);
		if (internalsMatch) {
			contract.internals = internalsMatch[1].split(',').map((s: string) => s.trim().replace(/['"]/g, '')).filter((s: string) => s.length > 0);
		}
		
		// slots
		const slotsMatch = configStr.match(/slots:\s*({[\s\S]*?}),?\s*(?:tokensUsed|rules|examples|variants|events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (slotsMatch) {
			contract.slots = slotsMatch[1].trim() !== '{}' ? {} : {};
		}
		
		// tokensUsed
		const tokensUsedMatch = configStr.match(/tokensUsed:\s*\[([\s\S]*?)\]/);
		if (tokensUsedMatch) {
			contract.tokensUsed = tokensUsedMatch[1].split(',').map((s: string) => s.trim().replace(/['"]/g, '')).filter((s: string) => s.length > 0);
		}
		
		// rules
		const rulesMatch = configStr.match(/rules:\s*({[\s\S]*?}),?\s*(?:examples|variants|events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (rulesMatch) {
			contract.rules = {};
			if (rulesMatch[1].includes('forbidHardcodedColors')) {
				contract.rules.forbidHardcodedColors = true;
			}
			const requiredPropsMatch = rulesMatch[1].match(/requiredProps:\s*\[([\s\S]*?)\]/);
			if (requiredPropsMatch) {
				contract.rules.requiredProps = requiredPropsMatch[1].split(',').map((s: string) => s.trim().replace(/['"]/g, '')).filter((s: string) => s.length > 0);
			}
		}
		
		// examples
		const examplesMatch = configStr.match(/examples:\s*({[\s\S]*?}),?\s*(?:variants|events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (examplesMatch) {
			contract.examples = {};
			const canonicalMatch = examplesMatch[1].match(/canonical:\s*['"`]([\s\S]*?)['"`],?\s*(?:basic|withIcon|info|warning|error|active|withValue|checked|withLabel|disabled|multiple|withMaxHeight|select|withFiles|withMaxFiles|withTitle|withButtons|differentPosition|withComplementaryText|notClosable|closable|clickable|withLeftIcon|withRightIcon|circle|rectangle|custom|withLabel|fullScreen|differentVariant|dot|absolute|withProgress|completed|aprendizaje|desempeno|withoutIcons|noClose)/);
			if (canonicalMatch) {
				contract.examples.canonical = canonicalMatch[1].substring(0, 100) + '...';
			}
			// Contar otros ejemplos
			const exampleKeys = examplesMatch[1].match(/\b(basic|withIcon|info|warning|error|active|withValue|checked|withLabel|disabled|multiple|withMaxHeight|select|withFiles|withMaxFiles|withTitle|withButtons|differentPosition|withComplementaryText|notClosable|closable|clickable|withLeftIcon|withRightIcon|circle|rectangle|custom|fullScreen|differentVariant|dot|absolute|withProgress|completed|aprendizaje|desempeno|withoutIcons|noClose):/g);
			if (exampleKeys) {
				contract.examples.otherExamples = exampleKeys.length;
			}
		}
		
		// variants
		const variantsMatch = configStr.match(/variants:\s*({[\s\S]*?}),?\s*(?:events|storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (variantsMatch) {
			contract.variants = {};
			const variantKeys = variantsMatch[1].match(/\b(\w+):\s*\[/g);
			if (variantKeys) {
				contract.variants.count = variantKeys.length;
			}
		}
		
		// events
		const eventsMatch = configStr.match(/events:\s*({[\s\S]*?}),?\s*(?:storybook|intents|recipeIntent|isTemplate|templateComponents)/);
		if (eventsMatch) {
			contract.events = {};
			const eventKeys = eventsMatch[1].match(/\b(\w+):\s*{/g);
			if (eventKeys) {
				contract.events.count = eventKeys.length;
			}
		}
		
		// storybook
		const storybookMatch = configStr.match(/storybook:\s*({[\s\S]*?}),?\s*(?:intents|recipeIntent|isTemplate|templateComponents)/);
		if (storybookMatch) {
			contract.storybook = {};
			const canonicalStoryIdMatch = storybookMatch[1].match(/canonicalStoryId:\s*['"]([^'"]+)['"]/);
			if (canonicalStoryIdMatch) contract.storybook.canonicalStoryId = canonicalStoryIdMatch[1];
			const storiesByExampleMatch = storybookMatch[1].match(/storiesByExample:\s*({[\s\S]*?})/);
			if (storiesByExampleMatch) {
				contract.storybook.storiesByExample = true;
			}
		}
		
		// intents
		const intentsMatch = configStr.match(/intents:\s*({[\s\S]*?}),?\s*(?:recipeIntent|isTemplate|templateComponents)/);
		if (intentsMatch) {
			contract.intents = {};
			const intentKeys = intentsMatch[1].match(/\b(\w+):\s*['"]/g);
			if (intentKeys) {
				contract.intents.count = intentKeys.length;
			}
		}
		
		return contract;
	} catch (error) {
		return null;
	}
}

function checkDataUbitsId(content: string, componentName: string): boolean {
	// Buscar data-ubits-id en el código
	const patterns = [
		new RegExp(`data-ubits-id=["']🧩-ux-${componentName.toLowerCase()}["']`),
		new RegExp(`setAttribute\(['"]data-ubits-id['"],\s*['"]🧩-ux-${componentName.toLowerCase()}['"]\)`),
		new RegExp(`data-ubits-id=["']🧩-ux-[^"']+["']`),
	];
	
	return patterns.some(pattern => pattern.test(content));
}

function verifyComponent(componentName: string, group: string): VerificationResult {
	const filePath = path.join(__dirname, `../stories/components/${componentName}/${componentName}.stories.ts`);
	const content = readStoryFile(filePath);
	
	if (!content) {
		return {
			componentId: componentName,
			filePath,
			group,
			phase: 'Error',
			status: '❌',
			issues: ['Archivo no encontrado'],
			details: {}
		};
	}
	
	const contract = extractUBITSContract(content);
	const issues: string[] = [];
	const details: Record<string, any> = {};
	
	// Fase 1: Campos Básicos
	if (!contract?.componentId) {
		issues.push('Falta componentId');
		details.phase1 = '❌';
	} else {
		details.phase1 = '✅';
		details.componentId = contract.componentId;
	}
	
	if (!contract?.api?.create) {
		issues.push('Falta api.create');
		details.phase1 = details.phase1 === '✅' ? '⚠️' : '❌';
	} else {
		details.apiCreate = contract.api.create;
	}
	
	// Fase 2: Dependencias
	if (!contract?.dependsOn) {
		issues.push('Falta dependsOn');
		details.phase2 = '❌';
	} else {
		details.phase2 = '✅';
		details.dependsOnRequired = contract.dependsOn.required?.length || 0;
		details.dependsOnOptional = contract.dependsOn.optional?.length || 0;
	}
	
	if (!contract?.internals) {
		issues.push('Falta internals');
		details.phase2 = details.phase2 === '✅' ? '⚠️' : '❌';
	} else {
		details.internals = contract.internals?.length || 0;
	}
	
	if (!contract?.slots) {
		issues.push('Falta slots');
		details.phase2 = details.phase2 === '✅' ? '⚠️' : '❌';
	} else {
		details.slots = 'definido';
	}
	
	// Fase 3: Tokens y Reglas
	if (!contract?.tokensUsed || contract.tokensUsed.length === 0) {
		issues.push('Falta tokensUsed o está vacío');
		details.phase3 = '⚠️';
	} else {
		details.phase3 = '✅';
		details.tokensUsed = contract.tokensUsed.length;
	}
	
	if (!contract?.rules) {
		issues.push('Falta rules');
		details.phase3 = details.phase3 === '✅' ? '⚠️' : '❌';
	} else {
		details.rules = 'definido';
	}
	
	// Fase 4: Ejemplo Canónico (CRÍTICO)
	if (!contract?.examples?.canonical) {
		issues.push('FALTA examples.canonical (CRÍTICO)');
		details.phase4 = '❌';
	} else {
		details.phase4 = '✅';
		details.hasCanonical = true;
	}
	
	// Fase 5: Otros Ejemplos
	if (!contract?.examples) {
		issues.push('Falta examples');
		details.phase5 = '❌';
	} else {
		details.phase5 = '✅';
		details.otherExamples = contract.examples.otherExamples || 0;
	}
	
	// Fase 6: Variantes y Eventos
	if (!contract?.variants) {
		issues.push('Falta variants');
		details.phase6 = '⚠️';
	} else {
		details.phase6 = '✅';
		details.variantsCount = contract.variants.count || 0;
	}
	
	if (!contract?.events) {
		details.phase6 = details.phase6 === '✅' ? '⚠️' : '❌';
	} else {
		details.eventsCount = contract.events.count || 0;
	}
	
	// Fase 7: Storybook e Intents
	if (!contract?.storybook) {
		issues.push('Falta storybook (canonicalStoryId, storiesByExample)');
		details.phase7 = '⚠️';
	} else {
		details.phase7 = '✅';
		details.hasCanonicalStoryId = !!contract.storybook.canonicalStoryId;
		details.hasStoriesByExample = !!contract.storybook.storiesByExample;
	}
	
	if (!contract?.intents) {
		details.phase7 = details.phase7 === '✅' ? '⚠️' : '⚠️';
	} else {
		details.intentsCount = contract.intents.count || 0;
	}
	
	// Fase 8: DOM Marker
	const hasDataUbitsId = checkDataUbitsId(content, componentName);
	if (!hasDataUbitsId) {
		issues.push('Falta data-ubits-id en el DOM');
		details.phase8 = '❌';
	} else {
		details.phase8 = '✅';
		details.hasDataUbitsId = true;
	}
	
	// Determinar status general
	let status: '✅' | '⚠️' | '❌' = '✅';
	if (issues.some(i => i.includes('CRÍTICO') || i.includes('FALTA'))) {
		status = '❌';
	} else if (issues.length > 0) {
		status = '⚠️';
	}
	
	return {
		componentId: contract?.componentId || componentName,
		filePath,
		group,
		phase: 'Completo',
		status,
		issues,
		details
	};
}

function generateReport(results: VerificationResult[]): string {
	let report = '# 📊 Verificación Completa para Autorun\n\n';
	report += `**Fecha:** ${new Date().toLocaleString('es-ES')}\n\n`;
	report += `**Total de componentes verificados:** ${results.length}\n\n`;
	
	// Resumen por grupo
	report += '## 📋 Resumen por Grupo\n\n';
	const groups = COMPONENT_GROUPS.map(g => g.name);
	
	for (const groupName of groups) {
		const groupResults = results.filter(r => r.group === groupName);
		const total = groupResults.length;
		const ok = groupResults.filter(r => r.status === '✅').length;
		const warning = groupResults.filter(r => r.status === '⚠️').length;
		const error = groupResults.filter(r => r.status === '❌').length;
		
		report += `### ${groupName}\n`;
		report += `- Total: ${total}\n`;
		report += `- ✅ Completos: ${ok}\n`;
		report += `- ⚠️  Con advertencias: ${warning}\n`;
		report += `- ❌ Con errores: ${error}\n\n`;
	}
	
	// Resumen por fase
	report += '## 🔍 Resumen por Fase\n\n';
	for (const phase of VERIFICATION_PHASES) {
		report += `### ${phase.name}\n`;
		report += `*${phase.description}*\n\n`;
		
		const phaseResults = results.map(r => {
			const phaseKey = `phase${VERIFICATION_PHASES.indexOf(phase) + 1}`;
			return r.details[phaseKey] || '❓';
		});
		
		const ok = phaseResults.filter(s => s === '✅').length;
		const warning = phaseResults.filter(s => s === '⚠️').length;
		const error = phaseResults.filter(s => s === '❌').length;
		const unknown = phaseResults.filter(s => s === '❓').length;
		
		report += `- ✅ Correctos: ${ok}\n`;
		report += `- ⚠️  Advertencias: ${warning}\n`;
		report += `- ❌ Errores: ${error}\n`;
		if (unknown > 0) report += `- ❓ No verificado: ${unknown}\n`;
		report += '\n';
	}
	
	// Detalle por componente
	report += '## 📝 Detalle por Componente\n\n';
	
	for (const group of COMPONENT_GROUPS) {
		report += `### ${group.name}\n\n`;
		report += `*${group.description}*\n\n`;
		
		const groupResults = results.filter(r => r.group === group.name);
		
		for (const result of groupResults) {
			report += `#### ${result.componentId}\n\n`;
			report += `**Estado:** ${result.status}\n\n`;
			
			if (result.issues.length > 0) {
				report += '**Problemas encontrados:**\n';
				for (const issue of result.issues) {
					report += `- ${issue}\n`;
				}
				report += '\n';
			}
			
			report += '**Detalles por fase:**\n';
			for (let i = 0; i < VERIFICATION_PHASES.length; i++) {
				const phaseKey = `phase${i + 1}`;
				const phaseStatus = result.details[phaseKey] || '❓';
				report += `- ${VERIFICATION_PHASES[i].name}: ${phaseStatus}\n`;
			}
			report += '\n';
			
			// Detalles específicos
			if (result.details.componentId) {
				report += `- Component ID: \`${result.details.componentId}\`\n`;
			}
			if (result.details.apiCreate) {
				report += `- API Create: \`${result.details.apiCreate}\`\n`;
			}
			if (result.details.dependsOnRequired !== undefined) {
				report += `- DependsOn Required: ${result.details.dependsOnRequired}\n`;
			}
			if (result.details.dependsOnOptional !== undefined) {
				report += `- DependsOn Optional: ${result.details.dependsOnOptional}\n`;
			}
			if (result.details.tokensUsed !== undefined) {
				report += `- Tokens Used: ${result.details.tokensUsed}\n`;
			}
			if (result.details.hasCanonical) {
				report += `- ✅ Tiene examples.canonical\n`;
			}
			if (result.details.otherExamples !== undefined) {
				report += `- Otros ejemplos: ${result.details.otherExamples}\n`;
			}
			if (result.details.hasDataUbitsId) {
				report += `- ✅ Tiene data-ubits-id\n`;
			}
			
			report += '\n---\n\n';
		}
	}
	
	// Resumen final
	report += '## ✅ Resumen Final\n\n';
	const totalOk = results.filter(r => r.status === '✅').length;
	const totalWarning = results.filter(r => r.status === '⚠️').length;
	const totalError = results.filter(r => r.status === '❌').length;
	
	report += `- **Total componentes:** ${results.length}\n`;
	report += `- **✅ Completos:** ${totalOk} (${Math.round(totalOk / results.length * 100)}%)\n`;
	report += `- **⚠️  Con advertencias:** ${totalWarning} (${Math.round(totalWarning / results.length * 100)}%)\n`;
	report += `- **❌ Con errores:** ${totalError} (${Math.round(totalError / results.length * 100)}%)\n\n`;
	
	if (totalError === 0 && totalWarning === 0) {
		report += '🎉 **¡Todos los componentes están completos!**\n';
	} else if (totalError === 0) {
		report += '⚠️  **Algunos componentes tienen advertencias menores.**\n';
	} else {
		report += '❌ **Hay componentes con errores críticos que deben corregirse.**\n';
	}
	
	return report;
}

// Ejecutar verificación
function main() {
	console.log('🔍 Iniciando verificación completa para Autorun...\n');
	
	const allResults: VerificationResult[] = [];
	
	// Verificar cada grupo
	for (const group of COMPONENT_GROUPS) {
		console.log(`\n📦 Verificando grupo: ${group.name}`);
		console.log(`   Componentes: ${group.components.join(', ')}`);
		
		for (const component of group.components) {
			const result = verifyComponent(component, group.name);
			allResults.push(result);
			
			const statusIcon = result.status === '✅' ? '✅' : result.status === '⚠️' ? '⚠️' : '❌';
			console.log(`   ${statusIcon} ${component}: ${result.issues.length > 0 ? result.issues.join(', ') : 'OK'}`);
		}
	}
	
	// Generar reporte
	const report = generateReport(allResults);
	const reportPath = path.join(__dirname, '../VERIFICACION-COMPLETA-AUTORUN-DETALLADA.md');
	fs.writeFileSync(reportPath, report, 'utf-8');
	
	console.log(`\n✅ Verificación completada!`);
	console.log(`📄 Reporte guardado en: ${reportPath}`);
	
	// Resumen en consola
	const totalOk = allResults.filter(r => r.status === '✅').length;
	const totalWarning = allResults.filter(r => r.status === '⚠️').length;
	const totalError = allResults.filter(r => r.status === '❌').length;
	
	console.log(`\n📊 Resumen:`);
	console.log(`   ✅ Completos: ${totalOk}`);
	console.log(`   ⚠️  Advertencias: ${totalWarning}`);
	console.log(`   ❌ Errores: ${totalError}`);
}

main();
