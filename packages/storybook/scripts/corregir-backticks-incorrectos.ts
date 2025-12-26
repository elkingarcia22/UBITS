/**
 * Script para corregir backticks incorrectos dentro del código
 * Solo description.component debe usar template literal, no otras propiedades
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Corregir backticks incorrectos en propiedades que NO son description.component
		// Patrones a corregir:
		// - componentId: `...` -> componentId: '...'
		// - layout: `...` -> layout: '...'
		// - containerId: `...` -> containerId: '...'
		// - title: `...` -> title: '...'
		// - id: `...` -> id: '...'
		// - label: `...` -> label: '...'
		// - type: `...` -> type: '...'
		// - mode: `...` -> mode: '...'
		// - initials: `...` -> initials: '...'
		// - image: `...` -> image: '...'
		
		const incorrectPatterns = [
			/(componentId:\s*)`([^`]+)`/g,
			/(layout:\s*)`([^`]+)`/g,
			/(containerId:\s*)`([^`]+)`/g,
			/(title:\s*)`([^`]+)`/g,
			/(id:\s*)`([^`]+)`/g,
			/(label:\s*)`([^`]+)`/g,
			/(type:\s*)`([^`]+)`/g,
			/(mode:\s*)`([^`]+)`/g,
			/(initials:\s*)`([^`]+)`/g,
			/(image:\s*)`([^`]+)`/g,
		];

		for (const pattern of incorrectPatterns) {
			if (pattern.test(content)) {
				content = content.replace(pattern, (match, prefix, body) => {
					// Solo corregir si NO está dentro de description.component
					const beforeMatch = content.substring(0, content.indexOf(match));
					const isInDescription = beforeMatch.includes('description:') && 
						!beforeMatch.substring(beforeMatch.lastIndexOf('description:')).includes('},');
					
					if (!isInDescription) {
						// Cambiar backtick a comilla simple
						return prefix + "'" + body + "'";
					}
					return match;
				});
				modified = true;
			}
		}

		// Corregir específicamente dentro de código (dentro de ```html)
		// Buscar código dentro de template literals y corregir backticks que deberían ser comillas simples
		const codeBlockPattern = /```html\n([^`]+)```/g;
		if (codeBlockPattern.test(content)) {
			content = content.replace(codeBlockPattern, (match, code) => {
				// Dentro del código, los backticks al final de líneas que son propiedades deben ser comillas simples
				// Ejemplo: containerId: 'container` -> containerId: 'container'
				const fixedCode = code.replace(/(\w+:\s*)`([^`\n]+)`/g, "$1'$2'");
				if (fixedCode !== code) {
					modified = true;
					return '```html\n' + fixedCode + '```';
				}
				return match;
			});
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
	console.log('🔧 Corrigiendo backticks incorrectos...\n');

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

