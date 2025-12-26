/**
 * Script para exponer código automáticamente en todas las stories
 * Agrega state: 'open' y codePanel: true a los parámetros de docs
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

async function updateStoryFile(filePath: string): Promise<boolean> {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Patrón 1: parameters.docs.source con code pero sin state
		const pattern1 = /(parameters:\s*\{[\s\S]*?docs:\s*\{[\s\S]*?source:\s*\{[\s\S]*?code:\s*`[^`]+`[\s\S]*?)(\s*\},[\s\S]*?\},[\s\S]*?\})/;
		if (pattern1.test(content)) {
			// Verificar si ya tiene state: 'open'
			if (!content.includes("state: 'open'") && !content.includes('state: "open"')) {
				// Agregar state: 'open' después de type: 'code' o después de code:
				content = content.replace(
					/(source:\s*\{[\s\S]*?)(code:\s*`)/,
					(match, before, codeStart) => {
						// Si ya tiene type, agregar state después
						if (before.includes("type: 'code'") || before.includes('type: "code"')) {
							return before + "state: 'open',\n\t\t\t\t" + codeStart;
						}
						// Si no tiene type, agregar ambos
						return before + "type: 'code',\n\t\t\t\tstate: 'open',\n\t\t\t\t" + codeStart;
					}
				);
				modified = true;
			}
		}

		// Patrón 2: Agregar codePanel: true si no existe
		if (content.includes('parameters:') && content.includes('docs:') && !content.includes('codePanel:')) {
			// Buscar docs: { y agregar codePanel después
			content = content.replace(
				/(docs:\s*\{[\s\S]*?)(source:\s*\{)/,
				(match, before, sourceStart) => {
					if (!before.includes('codePanel:')) {
						return before + "codePanel: true,\n\t\t\t\t" + sourceStart;
					}
					return match;
				}
			);
			modified = true;
		}

		// Patrón 3: Si tiene source pero no tiene type ni state, agregarlos
		if (content.includes('source:') && content.includes('code:') && !content.includes("type: 'code'") && !content.includes('type: "code"')) {
			content = content.replace(
				/(source:\s*\{[\s\S]*?)(code:\s*`)/,
				(match, before, codeStart) => {
					return before + "type: 'code',\n\t\t\t\tstate: 'open',\n\t\t\t\t" + codeStart;
				}
			);
			modified = true;
		}

		if (modified) {
			fs.writeFileSync(filePath, content, 'utf-8');
			return true;
		}

		return false;
	} catch (error) {
		console.error(`Error procesando ${filePath}:`, error);
		return false;
	}
}

async function main() {
	console.log('🔧 Exponiendo código automáticamente en todas las stories...\n');

	const storiesDir = path.join(__dirname, '../stories');
	const storyFiles = await glob('**/*.stories.ts', {
		cwd: storiesDir,
		absolute: true,
	});

	let updated = 0;
	let skipped = 0;

	for (const filePath of storyFiles) {
		const wasUpdated = await updateStoryFile(filePath);
		if (wasUpdated) {
			updated++;
			const relativePath = path.relative(storiesDir, filePath);
			console.log(`✅ Actualizado: ${relativePath}`);
		} else {
			skipped++;
		}
	}

	console.log(`\n✅ Proceso completado:`);
	console.log(`   - Archivos actualizados: ${updated}`);
	console.log(`   - Archivos sin cambios: ${skipped}`);
	console.log(`   - Total: ${storyFiles.length}`);
}

main().catch(console.error);
