/**
 * Script para corregir comillas simples dentro del código que están en code blocks
 * Dentro de ```html, las comillas simples deben permanecer como comillas simples
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Buscar code blocks dentro de description.component
		// Patrón: ```html\n...código con comillas incorrectas...```
		const codeBlockPattern = /(component:\s*`[^`]*```html\n)([^`]+)(```[^`]*`)/s;
		if (codeBlockPattern.test(content)) {
			const match = content.match(codeBlockPattern);
			if (match) {
				const code = match[2];
				let fixedCode = code;
				
				// Corregir backticks que deberían ser comillas simples dentro del código
				// Ejemplos:
				// - from '@ubits/...` -> from '@ubits/...'
				// - containerId: 'container` -> containerId: 'container'
				// - title: 'Title` -> title: 'Title'
				// - id: 'id` -> id: 'id'
				// - label: 'Label` -> label: 'Label'
				// - type: 'type` -> type: 'type'
				// - mode: 'mode` -> mode: 'mode'
				// - initials: 'JD` -> initials: 'JD'
				// - image: 'url` -> image: 'url'
				
				// Patrón: propiedad: 'valor` (backtick al final debería ser comilla simple)
				fixedCode = fixedCode.replace(/(\w+:\s*)'([^'\n]+)`/g, "$1'$2'");
				
				// Patrón: from '@ubits/...` -> from '@ubits/...'
				fixedCode = fixedCode.replace(/from\s+'@ubits\/[^'\n]+`/g, (match) => {
					return match.replace(/`$/, "'");
				});
				
				// Patrón: getElementById('id` -> getElementById('id'
				fixedCode = fixedCode.replace(/getElementById\('([^'\n]+)`/g, "getElementById('$1'");
				
				if (fixedCode !== code) {
					content = content.replace(codeBlockPattern, match[1] + fixedCode + match[3]);
					modified = true;
				}
			}
		}

		// También corregir fuera de code blocks pero dentro de description.component
		// Buscar propiedades con backticks que deberían tener comillas simples
		const propertyPattern = /(component:\s*`[^`]*?)(\w+:\s*)`([^`\n]+)`([^`]*?`)/s;
		if (propertyPattern.test(content)) {
			const match = content.match(propertyPattern);
			if (match && !match[0].includes('```html')) {
				// Esto está fuera del code block, podría ser parte del texto
				// No corregir aquí
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
	console.log('🔧 Corrigiendo comillas dentro del código...\n');

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

