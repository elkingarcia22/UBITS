/**
 * Script para corregir backticks finales incorrectos dentro de template literals
 * Ejemplo: `texto' -> `texto`
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// Corregir backticks finales incorrectos dentro de template literals
		// Patrón: `texto' -> `texto`
		// Esto ocurre cuando un template literal termina con comilla simple en lugar de backtick
		
		// Buscar template literals que terminan con comilla simple
		// Patrón: `...' (backtick al inicio, comilla simple al final)
		content = content.replace(/`([^`]*?)'/g, (match, body) => {
			// Verificar que no sea parte de una cadena más compleja
			// Si el body contiene comillas simples sin escapar, probablemente es un error
			if (body.includes("'") && !body.includes("\\'")) {
				// Verificar contexto: si está en una descripción o código, probablemente es un error
				const beforeMatch = originalContent.substring(0, originalContent.indexOf(match));
				const afterMatch = originalContent.substring(originalContent.indexOf(match) + match.length);
				
				// Si después hay un punto y coma o coma, probablemente es el final de una expresión
				if (afterMatch.match(/^\s*[,;\)\]\}]/)) {
					return '`' + body + '`';
				}
			}
			return match;
		});
		
		// También corregir casos específicos donde hay backtick al inicio pero comilla simple al final
		// en contextos de código JavaScript dentro de strings
		content = content.replace(/console\.log\(`([^`]*?)'/g, (match, body) => {
			return 'console.log(`' + body + '`)';
		});
		
		content = content.replace(/story:\s*`([^`]*?)'/g, (match, body) => {
			return 'story: `' + body + '`';
		});
		
		if (content !== originalContent) {
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
	console.log('🔧 Corrigiendo backticks finales en template literals...\n');

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

