/**
 * Script para exponer código automáticamente en todas las stories
 * Agrega state: 'open' y codePanel: true para que el código esté siempre visible
 */

import * as fs from 'fs';
import * as path from 'path';

function updateStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Si el archivo no tiene parameters.docs.source, no hacer nada
		if (!content.includes('parameters:') || !content.includes('docs:') || !content.includes('source:')) {
			return false;
		}

		// Patrón: source: { code: `...` }
		// Necesitamos agregar type: 'code', state: 'open' antes de code:
		const sourcePattern = /(source:\s*\{)([\s\S]*?)(code:\s*`)/;
		if (sourcePattern.test(content)) {
			const match = content.match(sourcePattern);
			if (match) {
				const beforeCode = match[2];
				// Si ya tiene state: 'open', no modificar
				if (!beforeCode.includes("state: 'open'") && !beforeCode.includes('state: "open"')) {
					// Agregar type y state antes de code
					const replacement = match[1] + 
						(match[2].trim() ? match[2] + '\n\t\t\t\t' : '') +
						"type: 'code',\n\t\t\t\tstate: 'open',\n\t\t\t\t" +
						match[3];
					content = content.replace(sourcePattern, replacement);
					modified = true;
				}
			}
		}

		// Agregar codePanel: true en docs si no existe
		const docsPattern = /(docs:\s*\{)([\s\S]*?)(source:\s*\{)/;
		if (docsPattern.test(content)) {
			const match = content.match(docsPattern);
			if (match) {
				const beforeSource = match[2];
				if (!beforeSource.includes('codePanel:')) {
					const replacement = match[1] + 
						"codePanel: true,\n\t\t\t\t" +
						match[2] +
						match[3];
					content = content.replace(docsPattern, replacement);
					modified = true;
				}
			}
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
	console.log('🔧 Exponiendo código automáticamente en todas las stories...\n');

	const storiesDir = path.join(__dirname, '../stories');
	const storyFiles = findStoryFiles(storiesDir);

	let updated = 0;
	let skipped = 0;

	for (const filePath of storyFiles) {
		const wasUpdated = updateStoryFile(filePath);
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

main();
