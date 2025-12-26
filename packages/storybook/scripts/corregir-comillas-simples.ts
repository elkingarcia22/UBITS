/**
 * Script para corregir strings con comillas simples que contienen código
 * Cambiar a template literals cuando hay comillas simples dentro
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// Buscar description.component que use comillas simples y contenga código con comillas simples
		// Patrón: component: '...' donde ... contiene comillas simples
		const lines = content.split('\n');
		let inComponentString = false;
		let startLine = -1;
		let stringStart = -1;
		let modified = false;
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			// Detectar inicio de component: '
			if (line.includes("component: '") && !line.includes('component: `')) {
				const match = line.match(/component:\s*'(.+)$/);
				if (match) {
					inComponentString = true;
					startLine = i;
					stringStart = match.index! + match[0].indexOf("'");
					
					// Verificar si la línea contiene el cierre
					if (line.endsWith("'") || line.endsWith("',")) {
						// String de una sola línea
						if (match[1].includes("'") && !match[1].includes("\\'")) {
							// Contiene comillas simples sin escapar, cambiar a template literal
							const before = line.substring(0, stringStart);
							const body = line.substring(stringStart + 1, line.length - (line.endsWith("',") ? 2 : 1));
							const after = line.endsWith("',") ? "`," : "`";
							lines[i] = before + '`' + body.replace(/`/g, '\\`').replace(/\$/g, '\\$') + after;
							modified = true;
							inComponentString = false;
						}
					}
				}
			}
			
			// Si estamos en un string multilinea
			if (inComponentString && i > startLine) {
				// Buscar cierre del string
				if (line.includes("'") || line.includes("',")) {
					// Reconstruir el string completo
					let fullString = '';
					for (let j = startLine; j <= i; j++) {
						if (j === startLine) {
							const match = lines[j].match(/component:\s*'(.+)$/);
							if (match) fullString += match[1] + '\n';
						} else if (j === i) {
							const match = lines[j].match(/^(.+?)'/,);
							if (match) fullString += match[1];
						} else {
							fullString += lines[j] + '\n';
						}
					}
					
					// Si contiene comillas simples sin escapar, cambiar a template literal
					if (fullString.includes("'") && !fullString.match(/\\'/)) {
						// Cambiar la primera línea
						const firstLineMatch = lines[startLine].match(/^(.*component:\s*)'(.+)$/);
						if (firstLineMatch) {
							lines[startLine] = firstLineMatch[1] + '`' + firstLineMatch[2];
						}
						
						// Cambiar la última línea
						const lastLineMatch = lines[i].match(/^(.+?)'(\s*,?\s*)$/);
						if (lastLineMatch) {
							lines[i] = lastLineMatch[1] + '`' + lastLineMatch[2];
						}
						
						// Escapar backticks y $ en las líneas intermedias
						for (let j = startLine + 1; j < i; j++) {
							lines[j] = lines[j].replace(/`/g, '\\`').replace(/\$/g, '\\$');
						}
						
						modified = true;
						inComponentString = false;
					}
				}
			}
		}
		
		if (modified) {
			content = lines.join('\n');
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
	console.log('🔧 Corrigiendo comillas simples en descripciones...\n');

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

