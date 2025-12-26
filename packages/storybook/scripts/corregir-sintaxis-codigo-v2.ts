/**
 * Script para corregir errores de sintaxis finales
 * - Elimina comas dobles
 * - Elimina duplicados de state: 'open'
 * - Asegura formato correcto
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// 1. Eliminar comas dobles
		if (content.includes("type: 'code',,")) {
			content = content.replace(/type:\s*['"]code['"],,/g, "type: 'code',");
			modified = true;
		}

		// 2. Eliminar state: 'open' duplicado
		const statePattern = /state:\s*['"]open['"],\s*\n\s*state:\s*['"]open['"],/g;
		if (statePattern.test(content)) {
			content = content.replace(statePattern, "state: 'open',");
			modified = true;
		}

		// 3. Asegurar que no haya type duplicado seguido
		const duplicateTypePattern = /type:\s*['"]code['"],\s*\n\s*type:\s*['"]code['"],/g;
		if (duplicateTypePattern.test(content)) {
			content = content.replace(duplicateTypePattern, "type: 'code',");
			modified = true;
		}

		// 4. Limpiar líneas vacías múltiples
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
	console.log('🔧 Corrigiendo errores finales de sintaxis...\n');

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
