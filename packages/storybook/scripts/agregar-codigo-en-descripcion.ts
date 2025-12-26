/**
 * Script para agregar código HTML/JavaScript directamente en la descripción del componente
 * Esto hace que el código se muestre automáticamente en la página de Docs
 */

import * as fs from 'fs';
import * as path from 'path';

function updateStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Buscar parameters.docs.description.component que tenga solo texto simple
		// y agregar el código del snippet canonical después
		
		// Patrón: description: { component: 'texto simple' }
		const descriptionPattern = /(description:\s*\{\s*component:\s*['"])([^'"]+)(['"])/;
		if (descriptionPattern.test(content)) {
			const match = content.match(descriptionPattern);
			if (match && !match[2].includes('```')) {
				// Buscar el código canonical en examples
				const canonicalPattern = /canonical:\s*[`'"]([^`'"]+)[`'"]/;
				const canonicalMatch = content.match(canonicalPattern);
				
				if (canonicalMatch) {
					const canonicalCode = canonicalMatch[1]
						.replace(/\\n/g, '\n')
						.replace(/\\t/g, '  ');
					
					// Agregar código en markdown después de la descripción
					const newDescription = match[2] + `\n\n\`\`\`html\n<!-- Código de implementación -->\n<script>\n${canonicalCode}\n</script>\n\`\`\``;
					
					content = content.replace(descriptionPattern, match[1] + newDescription + match[3]);
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
	console.log('🔧 Agregando código en descripciones de componentes...\n');

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

