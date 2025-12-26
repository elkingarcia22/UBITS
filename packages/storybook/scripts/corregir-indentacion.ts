/**
 * Script para corregir problemas de indentación y formato
 * - Corregir mezcla de tabs y espacios
 * - Asegurar formato consistente
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// 1. Corregir indentación inconsistente en source: { (tabs vs espacios)
		// Buscar patrones como: source: {\n        // comentario\n        \n\t\t\t\ttype: 'code',
		if (content.includes('source:') && content.includes("type: 'code'")) {
			// Normalizar tabs a espacios (2 espacios por nivel)
			// Pero mantener la estructura existente
			const sourcePattern = /(source:\s*\{[\s\S]*?)(type:\s*['"]code['"])/;
			if (sourcePattern.test(content)) {
				const match = content.match(sourcePattern);
				if (match) {
					const beforeType = match[1];
					// Si hay tabs mezclados con espacios antes de type, normalizar
					if (beforeType.includes('\t')) {
						// Reemplazar tabs con espacios (asumiendo 2 espacios por tab)
						const normalized = beforeType.replace(/\t/g, '  ');
						content = content.replace(sourcePattern, normalized + match[2]);
						modified = true;
					}
				}
			}
		}

		// 2. Corregir líneas vacías extra después de comentarios en source
		content = content.replace(
			/(\/\/[^\n]*\n)\s*\n\s*(type:\s*['"]code['"])/g,
			'$1\t\t\t\t$2'
		);
		if (content.includes('// ⭐ SNIPPET EXACTO para Autorun\n\n\t\t\t\ttype:')) {
			content = content.replace(
				/\/\/ ⭐ SNIPPET EXACTO para Autorun\n\n\t\t\t\ttype:/g,
				'// ⭐ SNIPPET EXACTO para Autorun\n\t\t\t\ttype:'
			);
			modified = true;
		}

		// 3. Asegurar que codePanel esté en el lugar correcto (dentro de docs, no dentro de source)
		// Si codePanel está después del cierre de source, está bien
		// Pero si está mal indentado, corregirlo

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
	console.log('🔧 Corrigiendo indentación y formato en todas las stories...\n');

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
