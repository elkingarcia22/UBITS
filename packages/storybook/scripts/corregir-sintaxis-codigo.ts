/**
 * Script para corregir errores de sintaxis introducidos por el script anterior
 * - Corrige formato de docs: { codePanel: true, }
 * - Elimina duplicados de type: 'code'
 * - Asegura sintaxis correcta
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// 1. Corregir docs: {codePanel: true, -> docs: { codePanel: true,
		if (content.includes('docs: {codePanel: true,')) {
			content = content.replace(/docs: \{codePanel: true,/g, 'docs: {\n\t\t\tcodePanel: true,');
			modified = true;
		}

		// 2. Eliminar líneas vacías extra después de codePanel: true,
		content = content.replace(/codePanel: true,\s*\n\s*\n\s*description:/g, 'codePanel: true,\n\t\t\tdescription:');
		if (content.includes('codePanel: true,\n\n\t\t\tdescription:')) {
			content = content.replace(/codePanel: true,\n\n\t\t\tdescription:/g, 'codePanel: true,\n\t\t\tdescription:');
			modified = true;
		}

		// 3. Eliminar type: 'code' duplicado
		// Buscar patrones como: type: 'code',\n\t\t\t\t// comentario\n\t\t\t\ttype: 'code',
		const duplicatePattern = /type:\s*['"]code['"],\s*\n\s*\/\/[^\n]*\n\s*type:\s*['"]code['"],/g;
		if (duplicatePattern.test(content)) {
			content = content.replace(duplicatePattern, (match) => {
				// Mantener solo el primero y agregar state: 'open' si no existe
				if (!match.includes("state: 'open'")) {
					return match.split('\n')[0] + ',\n\t\t\t\tstate: \'open\',';
				}
				return match.split('\n')[0] + ',\n\t\t\t\tstate: \'open\',';
			});
			modified = true;
		}

		// 4. Corregir específicamente el caso de Accordion y similares
		// type: 'code',\n\t\t\t\t// comentario\n\t\t\t\t\n\t\t\t\ttype: 'code',
		content = content.replace(
			/type:\s*['"]code['"],\s*\n\s*\/\/[^\n]*\n\s*\n\s*type:\s*['"]code['"],\s*\n\s*state:\s*['"]open['"],/g,
			"type: 'code',\n\t\t\t\tstate: 'open',"
		);
		if (content.includes("type: 'code',\n\t\t\t\t// ⭐ SNIPPET EXACTO para Autorun\n\t\t\t\t\n\t\t\t\ttype: 'code',")) {
			content = content.replace(
				/type:\s*['"]code['"],\s*\n\s*\/\/[^\n]*\n\s*\n\s*type:\s*['"]code['"],/g,
				"type: 'code',\n\t\t\t\tstate: 'open',"
			);
			modified = true;
		}

		// 5. Asegurar que source: { tenga type y state si tiene code
		if (content.includes('source:') && content.includes('code:') && !content.includes("state: 'open'")) {
			// Buscar source: { que tenga code pero no state
			const sourcePattern = /(source:\s*\{[\s\S]*?)(code:\s*`)/;
			if (sourcePattern.test(content)) {
				const match = content.match(sourcePattern);
				if (match && !match[1].includes("state: 'open'")) {
					// Verificar si tiene type
					if (!match[1].includes("type: 'code'")) {
						content = content.replace(sourcePattern, "$1type: 'code',\n\t\t\t\tstate: 'open',\n\t\t\t\t$2");
					} else {
						content = content.replace(sourcePattern, "$1state: 'open',\n\t\t\t\t$2");
					}
					modified = true;
				}
			}
		}

		// 6. Limpiar líneas vacías múltiples
		content = content.replace(/\n\s*\n\s*\n\s*\n/g, '\n\n');

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

function findStoryFiles(dir: string): string[] {
	const files: string[] = [];
	
	function walk(currentPath: string) {
		const entries = fs.readdirSync(currentPath, { withFileTypes: true });
		
		for (const entry of entries) {
			const fullPath = path.join(currentPath, entry.name);
			
			if (entry.isDirectory()) {
				walk(fullPath);
			} else if (entry.isFile() && entry.name.endsWith('.stories.ts')) {
				files.push(fullPath);
			}
		}
	}
	
	walk(dir);
	return files;
}

function main() {
	console.log('🔧 Corrigiendo errores de sintaxis en todas las stories...\n');

	const storiesDir = path.join(__dirname, '../stories');
	const storyFiles = findStoryFiles(storiesDir);

	let updated = 0;
	let skipped = 0;

	for (const filePath of storyFiles) {
		const wasUpdated = fixStoryFile(filePath);
		if (wasUpdated) {
			updated++;
			const relativePath = path.relative(storiesDir, filePath);
			console.log(`✅ Corregido: ${relativePath}`);
		} else {
			skipped++;
		}
	}

	console.log(`\n✅ Proceso completado:`);
	console.log(`   - Archivos corregidos: ${updated}`);
	console.log(`   - Archivos sin cambios: ${skipped}`);
	console.log(`   - Total: ${storyFiles.length}`);
}

main();
