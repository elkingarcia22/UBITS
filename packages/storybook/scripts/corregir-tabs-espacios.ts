/**
 * Script para corregir mezcla de tabs y espacios en source: {}
 * Reemplaza tabs con espacios consistentes
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Buscar y corregir patrones como:
		// source: {
		//   // comentario
		//   
		// 			type: 'code',  (tabs después de espacios)
		
		// Patrón 1: Línea vacía seguida de tabs antes de type
		const pattern1 = /(source:\s*\{[\s\S]*?\/\/[^\n]*\n)\s*\n\s*\t+\s*(type:\s*['"]code['"])/g;
		if (pattern1.test(content)) {
			content = content.replace(pattern1, (match, before, typeLine) => {
				// Determinar indentación correcta (2 espacios por nivel)
				// source: { está en nivel 0, dentro de docs está en nivel 1
				// type: debería estar con 8 espacios (4 niveles de 2 espacios)
				return before + '        ' + typeLine;
			});
			modified = true;
		}

		// Patrón 2: Tabs mezclados con espacios en source: {}
		// Reemplazar todos los tabs dentro de source: {} con espacios
		const sourceBlockPattern = /(source:\s*\{)([\s\S]*?)(\})/g;
		if (sourceBlockPattern.test(content)) {
			content = content.replace(sourceBlockPattern, (match, open, body, close) => {
				// Reemplazar tabs con espacios (2 espacios por tab)
				const fixedBody = body.replace(/\t/g, '  ');
				if (fixedBody !== body) {
					modified = true;
					return open + fixedBody + close;
				}
				return match;
			});
		}

		// Patrón 3: Específico para líneas con type: 'code' que tienen tabs
		if (content.includes("type: 'code'") && content.includes('\t')) {
			// Buscar líneas que tienen tabs antes de type: 'code'
			content = content.replace(/\t+\s*type:\s*['"]code['"]/g, '        type: \'code\'');
			modified = true;
		}

		// Patrón 4: state: 'open' con tabs
		if (content.includes("state: 'open'") && content.includes('\t')) {
			content = content.replace(/\t+\s*state:\s*['"]open['"]/g, '        state: \'open\'');
			modified = true;
		}

		// Patrón 5: code: ` con tabs
		if (content.includes('code: `') && content.includes('\t')) {
			content = content.replace(/\t+\s*code:\s*`/g, '        code: `');
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
	console.log('🔧 Corrigiendo mezcla de tabs y espacios en todas las stories...\n');

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
