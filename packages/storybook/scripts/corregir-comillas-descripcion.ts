/**
 * Script para corregir comillas simples en description.component
 * Cambiar strings con comillas simples a template literals cuando contienen código
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Buscar description.component que use comillas simples y contenga código (```)
		const pattern = /(description:\s*\{\s*component:\s*)'([^']*```[^']*)'/;
		if (pattern.test(content)) {
			const match = content.match(pattern);
			if (match) {
				// Convertir a template literal
				const body = match[2]
					.replace(/\\/g, '\\\\') // Escapar backslashes
					.replace(/\$/g, '\\$') // Escapar $ para evitar interpolación
					.replace(/`/g, '\\`'); // Escapar backticks
				
				const replacement = match[1] + '`' + match[2] + '`';
				content = content.replace(pattern, replacement);
				modified = true;
			}
		}

		// También buscar patrones multilinea con comillas simples que contengan ```
		const multilinePattern = /(component:\s*)'([^']*\n[^']*```[^']*)'/s;
		if (multilinePattern.test(content)) {
			const match = content.match(multilinePattern);
			if (match) {
				const body = match[2]
					.replace(/\\/g, '\\\\')
					.replace(/\$/g, '\\$')
					.replace(/`/g, '\\`');
				
				const replacement = match[1] + '`' + match[2] + '`';
				content = content.replace(multilinePattern, replacement);
				modified = true;
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
	console.log('🔧 Corrigiendo comillas en descripciones...\n');

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

