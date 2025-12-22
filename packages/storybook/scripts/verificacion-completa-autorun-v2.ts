/**
 * Script de Verificación Completa para Autorun v2
 * 
 * Verifica que todos los componentes tengan todos los campos necesarios
 * usando análisis más robusto de los archivos TypeScript.
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
	componentId: string;
	filePath: string;
	group: string;
	phases: {
		phase1: { status: '✅' | '⚠️' | '❌'; details: any };
		phase2: { status: '✅' | '⚠️' | '❌'; details: any };
		phase3: { status: '✅' | '⚠️' | '❌'; details: any };
		phase4: { status: '✅' | '⚠️' | '❌'; details: any };
		phase5: { status: '✅' | '⚠️' | '❌'; details: any };
		phase6: { status: '✅' | '⚠️' | '❌'; details: any };
		phase7: { status: '✅' | '⚠️' | '❌'; details: any };
		phase8: { status: '✅' | '⚠️' | '❌'; details: any };
	};
	issues: string[];
	status: '✅' | '⚠️' | '❌';
}

const COMPONENT_GROUPS = [
	{
		name: 'Básicos',
		components: ['Alert', 'Avatar', 'Badge', 'Button', 'Chip', 'Skeleton', 'Spinner', 'StatusTag'],
	},
	{
		name: 'Formularios',
		components: ['Checkbox', 'Input', 'RadioButton', 'FileUpload', 'SearchButton', 'Toggle', 'Calendar', 'Slider'],
	},
	{
		name: 'Feedback',
		components: ['Toast', 'Tooltip', 'EmptyState', 'Drawer', 'Modal', 'Popover', 'Mask'],
	},
	{
		name: 'Navegación',
		components: ['Breadcrumb', 'Menu', 'Sidebar', 'SubNav', 'TabBar', 'Tabs', 'SegmentControl', 'TreeMenu', 'ParticipantsMenu'],
	},
	{
		name: 'Data',
		components: ['List', 'DataTable', 'DataView', 'Pagination', 'Scrollbar'],
	},
	{
		name: 'Charts',
		components: ['BarMetricCard', 'CSATMetricCard', 'MetricCard', 'NPSCard', 'ProgressBar', 'ScoreCardMetrics', 'ProgressGeneralCard'],
	},
	{
		name: 'Layout',
		components: ['CardContent', 'Carousel', 'Gallery', 'HeaderSection', 'SelectionCard', 'SimpleCard', 'Timeline', 'Accordion'],
	},
	{
		name: 'Especiales',
		components: ['ButtonAI', 'ButtonFeedback'],
	}
];

function verifyComponent(componentName: string, group: string): VerificationResult {
	// DataTable está en la raíz de stories/
	let filePath: string;
	if (componentName === 'DataTable') {
		filePath = path.join(__dirname, `../stories/${componentName}.stories.ts`);
	} else {
		filePath = path.join(__dirname, `../stories/components/${componentName}/${componentName}.stories.ts`);
	}
	const content = fs.readFileSync(filePath, 'utf-8');
	
	const issues: string[] = [];
	const phases: VerificationResult['phases'] = {
		phase1: { status: '❌', details: {} },
		phase2: { status: '❌', details: {} },
		phase3: { status: '❌', details: {} },
		phase4: { status: '❌', details: {} },
		phase5: { status: '❌', details: {} },
		phase6: { status: '❌', details: {} },
		phase7: { status: '❌', details: {} },
		phase8: { status: '❌', details: {} },
	};
	
	// Fase 1: Campos Básicos
	const hasComponentId = /componentId:\s*['"]([^'"]+)['"]/.test(content);
	const hasApiCreate = /api:\s*{[\s\S]*?create:\s*['"]([^'"]+)['"]/.test(content);
	const hasApiTag = /api:\s*{[\s\S]*?tag:\s*['"]([^'"]+)['"]/.test(content);
	const hasApiBlock = /api:\s*{[\s\S]*?}/.test(content);
	
	// Timeline no tiene api.create porque se implementa directamente
	const isTimeline = componentName === 'Timeline';
	
	if (hasComponentId && (hasApiCreate || (isTimeline && hasApiBlock))) {
		phases.phase1.status = isTimeline ? '⚠️' : '✅';
		const componentIdMatch = content.match(/componentId:\s*['"]([^'"]+)['"]/);
		const apiCreateMatch = content.match(/create:\s*['"]([^'"]+)['"]/);
		phases.phase1.details = {
			componentId: componentIdMatch?.[1],
			apiCreate: apiCreateMatch?.[1] || (isTimeline ? 'N/A (implementación directa)' : ''),
			hasApiTag: hasApiTag,
			isTimeline: isTimeline
		};
		if (isTimeline) {
			issues.push('Timeline no tiene api.create (se implementa directamente)');
		}
	} else {
		if (!hasComponentId) issues.push('Falta componentId');
		if (!hasApiCreate && !isTimeline) issues.push('Falta api.create');
		phases.phase1.status = '❌';
	}
	
	// Fase 2: Dependencias
	const hasDependsOn = /dependsOn:\s*{/.test(content);
	const hasInternals = /internals:\s*\[/.test(content);
	const hasSlots = /slots:\s*{/.test(content);
	
	if (hasDependsOn && hasInternals && hasSlots) {
		phases.phase2.status = '✅';
		const requiredMatch = content.match(/required:\s*\[([\s\S]*?)\]/);
		const optionalMatch = content.match(/optional:\s*\[([\s\S]*?)\]/);
		const internalsMatch = content.match(/internals:\s*\[([\s\S]*?)\]/);
		phases.phase2.details = {
			dependsOnRequired: requiredMatch?.[1] ? requiredMatch[1].split(',').filter((s: string) => s.trim().length > 0).length : 0,
			dependsOnOptional: optionalMatch?.[1] ? optionalMatch[1].split(',').filter((s: string) => s.trim().length > 0).length : 0,
			internalsCount: internalsMatch?.[1] ? internalsMatch[1].split(',').filter((s: string) => s.trim().length > 0).length : 0,
			hasSlots: hasSlots
		};
	} else {
		if (!hasDependsOn) issues.push('Falta dependsOn');
		if (!hasInternals) issues.push('Falta internals');
		if (!hasSlots) issues.push('Falta slots');
		phases.phase2.status = '⚠️';
	}
	
	// Fase 3: Tokens y Reglas
	const hasTokensUsed = /tokensUsed:\s*\[/.test(content);
	const hasRules = /rules:\s*{/.test(content);
	const hasForbidHardcodedColors = /forbidHardcodedColors:\s*true/.test(content);
	
	if (hasTokensUsed && hasRules && hasForbidHardcodedColors) {
		phases.phase3.status = '✅';
		const tokensMatch = content.match(/tokensUsed:\s*\[([\s\S]*?)\]/);
		phases.phase3.details = {
			tokensCount: tokensMatch?.[1] ? tokensMatch[1].split(',').filter((s: string) => s.trim().length > 0).length : 0,
			hasRules: true,
			forbidHardcodedColors: true
		};
	} else {
		if (!hasTokensUsed) issues.push('Falta tokensUsed');
		if (!hasRules) issues.push('Falta rules');
		phases.phase3.status = '⚠️';
	}
	
	// Fase 4: Ejemplo Canónico (CRÍTICO)
	const hasExamplesCanonical = /canonical:\s*['"`]/.test(content);
	if (hasExamplesCanonical) {
		phases.phase4.status = '✅';
		phases.phase4.details = { hasCanonical: true };
	} else {
		issues.push('FALTA examples.canonical (CRÍTICO)');
		phases.phase4.status = '❌';
	}
	
	// Fase 5: Otros Ejemplos
	const hasExamples = /examples:\s*{/.test(content);
	const exampleKeys = content.match(/\b(basic|withIcon|info|warning|error|active|withValue|checked|withLabel|disabled|multiple|withMaxHeight|select|withFiles|withMaxFiles|withTitle|withButtons|differentPosition|withComplementaryText|notClosable|closable|clickable|withLeftIcon|withRightIcon|circle|rectangle|custom|fullScreen|differentVariant|dot|absolute|withProgress|completed|aprendizaje|desempeno|withoutIcons|noClose):\s*['"`]/g);
	if (hasExamples && exampleKeys && exampleKeys.length > 1) {
		phases.phase5.status = '✅';
		phases.phase5.details = { otherExamplesCount: exampleKeys.length - 1 };
	} else {
		phases.phase5.status = '⚠️';
		phases.phase5.details = { otherExamplesCount: exampleKeys ? exampleKeys.length - 1 : 0 };
	}
	
	// Fase 6: Variantes y Eventos
	const hasVariants = /variants:\s*{/.test(content);
	const hasEvents = /events:\s*{/.test(content);
	if (hasVariants && hasEvents) {
		phases.phase6.status = '✅';
		const variantKeys = content.match(/\b(\w+):\s*\[/g);
		const eventKeys = content.match(/\b(\w+):\s*{[\s\S]*?type:/g);
		phases.phase6.details = {
			variantsCount: variantKeys?.length || 0,
			eventsCount: eventKeys?.length || 0
		};
	} else {
		if (!hasVariants) issues.push('Falta variants');
		if (!hasEvents) issues.push('Falta events');
		phases.phase6.status = '⚠️';
	}
	
	// Fase 7: Storybook e Intents
	const hasStorybook = /storybook:\s*{/.test(content);
	const hasCanonicalStoryId = /canonicalStoryId:\s*['"]/.test(content);
	const hasStoriesByExample = /storiesByExample:\s*{/.test(content);
	const hasIntents = /intents:\s*{/.test(content);
	
	if (hasStorybook && hasCanonicalStoryId && hasStoriesByExample && hasIntents) {
		phases.phase7.status = '✅';
		const intentKeys = content.match(/\b(['"][^'"]+['"]):\s*['"]/g);
		phases.phase7.details = {
			hasCanonicalStoryId: true,
			hasStoriesByExample: true,
			intentsCount: intentKeys?.length || 0
		};
	} else {
		if (!hasStorybook) issues.push('Falta storybook');
		if (!hasCanonicalStoryId) issues.push('Falta storybook.canonicalStoryId');
		if (!hasStoriesByExample) issues.push('Falta storybook.storiesByExample');
		if (!hasIntents) issues.push('Falta intents');
		phases.phase7.status = '⚠️';
	}
	
	// Fase 8: DOM Marker
	const componentIdMatch = content.match(/componentId:\s*['"]([^'"]+)['"]/);
	const componentId = componentIdMatch?.[1] || '';
	// Buscar data-ubits-id de forma más flexible
	const hasDataUbitsId = /data-ubits-id\s*=\s*['"]([^'"]+)['"]/.test(content) ||
		/setAttribute\(['"]data-ubits-id['"],\s*['"]([^'"]+)['"]\)/.test(content);
	
	if (hasDataUbitsId) {
		phases.phase8.status = '✅';
		const dataUbitsIdMatch = content.match(/data-ubits-id\s*=\s*['"]([^'"]+)['"]/) || 
			content.match(/setAttribute\(['"]data-ubits-id['"],\s*['"]([^'"]+)['"]\)/);
		phases.phase8.details = { 
			hasDataUbitsId: true,
			value: dataUbitsIdMatch?.[1] || 'encontrado'
		};
	} else {
		issues.push('Falta data-ubits-id en el DOM');
		phases.phase8.status = '❌';
	}
	
	// Determinar status general
	let status: '✅' | '⚠️' | '❌' = '✅';
	if (phases.phase4.status === '❌') {
		status = '❌';
	} else if (issues.length > 0 || Object.values(phases).some(p => p.status === '⚠️')) {
		status = '⚠️';
	}
	
	return {
		componentId: componentId || componentName,
		filePath,
		group,
		phases,
		issues,
		status
	};
}

function generateDetailedReport(results: VerificationResult[]): string {
	let report = '# 📊 Verificación Completa para Autorun - Reporte Detallado\n\n';
	report += `**Fecha:** ${new Date().toLocaleString('es-ES')}\n\n`;
	report += `**Total de componentes verificados:** ${results.length}\n\n`;
	
	// Resumen ejecutivo
	const totalOk = results.filter(r => r.status === '✅').length;
	const totalWarning = results.filter(r => r.status === '⚠️').length;
	const totalError = results.filter(r => r.status === '❌').length;
	
	report += '## 📈 Resumen Ejecutivo\n\n';
	report += `- **✅ Completos:** ${totalOk} (${Math.round(totalOk / results.length * 100)}%)\n`;
	report += `- **⚠️  Con advertencias:** ${totalWarning} (${Math.round(totalWarning / results.length * 100)}%)\n`;
	report += `- **❌ Con errores críticos:** ${totalError} (${Math.round(totalError / results.length * 100)}%)\n\n`;
	
	// Resumen por fase
	report += '## 🔍 Resumen por Fase\n\n';
	const phaseNames = [
		'Fase 1: Campos Básicos (componentId, api.create, api.tag)',
		'Fase 2: Dependencias (dependsOn, internals, slots)',
		'Fase 3: Tokens y Reglas (tokensUsed, rules)',
		'Fase 4: Ejemplo Canónico (examples.canonical) ⚠️ CRÍTICO',
		'Fase 5: Ejemplos Adicionales (examples.basic, etc.)',
		'Fase 6: Variantes y Eventos (variants, events)',
		'Fase 7: Storybook e Intents (storybook, intents)',
		'Fase 8: DOM Marker (data-ubits-id)'
	];
	
	for (let i = 0; i < phaseNames.length; i++) {
		const phaseKey = `phase${i + 1}` as keyof VerificationResult['phases'];
		const phaseResults = results.map(r => r.phases[phaseKey].status);
		const ok = phaseResults.filter(s => s === '✅').length;
		const warning = phaseResults.filter(s => s === '⚠️').length;
		const error = phaseResults.filter(s => s === '❌').length;
		
		report += `### ${phaseNames[i]}\n\n`;
		report += `- ✅ Correctos: ${ok} (${Math.round(ok / results.length * 100)}%)\n`;
		report += `- ⚠️  Advertencias: ${warning} (${Math.round(warning / results.length * 100)}%)\n`;
		report += `- ❌ Errores: ${error} (${Math.round(error / results.length * 100)}%)\n\n`;
	}
	
	// Detalle por grupo
	report += '## 📦 Detalle por Grupo\n\n';
	
	for (const group of COMPONENT_GROUPS) {
		report += `### ${group.name}\n\n`;
		const groupResults = results.filter(r => r.group === group.name);
		
		for (const result of groupResults) {
			report += `#### ${result.componentId}\n\n`;
			report += `**Estado General:** ${result.status}\n\n`;
			
			if (result.issues.length > 0) {
				report += '**Problemas:**\n';
				for (const issue of result.issues) {
					report += `- ${issue}\n`;
				}
				report += '\n';
			}
			
			report += '**Estado por Fase:**\n';
			for (let i = 0; i < phaseNames.length; i++) {
				const phaseKey = `phase${i + 1}` as keyof VerificationResult['phases'];
				const phase = result.phases[phaseKey];
				report += `- ${phaseNames[i]}: ${phase.status}`;
				if (Object.keys(phase.details).length > 0) {
					report += ` ${JSON.stringify(phase.details)}`;
				}
				report += '\n';
			}
			report += '\n---\n\n';
		}
	}
	
	return report;
}

// Ejecutar verificación
function main() {
	console.log('🔍 Iniciando verificación completa para Autorun (v2)...\n');
	
	const allResults: VerificationResult[] = [];
	
	for (const group of COMPONENT_GROUPS) {
		console.log(`\n📦 Grupo: ${group.name}`);
		for (const component of group.components) {
			try {
				const result = verifyComponent(component, group.name);
				allResults.push(result);
				console.log(`   ${result.status} ${component}: ${result.issues.length > 0 ? result.issues.slice(0, 2).join(', ') : 'OK'}`);
			} catch (error) {
				console.log(`   ❌ ${component}: Error - ${error}`);
			}
		}
	}
	
	const report = generateDetailedReport(allResults);
	const reportPath = path.join(__dirname, '../VERIFICACION-COMPLETA-AUTORUN-DETALLADA.md');
	fs.writeFileSync(reportPath, report, 'utf-8');
	
	console.log(`\n✅ Verificación completada!`);
	console.log(`📄 Reporte guardado en: ${reportPath}`);
	
	const totalOk = allResults.filter(r => r.status === '✅').length;
	const totalWarning = allResults.filter(r => r.status === '⚠️').length;
	const totalError = allResults.filter(r => r.status === '❌').length;
	
	console.log(`\n📊 Resumen:`);
	console.log(`   ✅ Completos: ${totalOk}`);
	console.log(`   ⚠️  Advertencias: ${totalWarning}`);
	console.log(`   ❌ Errores: ${totalError}`);
}

main();
