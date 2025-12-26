/**
 * Script para corregir TODOS los errores de sintaxis restantes
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// 1. Corregir template literals que terminan con comilla simple
		// Patrón: `texto' -> `texto`
		content = content.replace(/`([^`]*?)'/g, (match, body) => {
			// Verificar contexto: si está seguido de punto y coma, coma, o paréntesis de cierre, es el final
			const matchIndex = originalContent.indexOf(match);
			const afterMatch = originalContent.substring(matchIndex + match.length, matchIndex + match.length + 5);
			
			if (afterMatch.match(/^\s*[,;\)\]\}]/)) {
				return '`' + body + '`';
			}
			return match;
		});
		
		// 2. Corregir console.log que terminan con comilla simple
		content = content.replace(/console\.log\(`([^`]*?)'\)/g, 'console.log(`$1`)');
		
		// 3. Corregir telefono y fecha que terminan con comilla simple
		content = content.replace(/telefono:\s*`([^`]*?)'/g, 'telefono: `$1`');
		content = content.replace(/fecha:\s*`([^`]*?)'/g, 'fecha: `$1`');
		
		// 4. Corregir story descriptions con backticks mal cerrados
		// Patrón: story: '...`...' -> story: '...`...'
		// Esto es más complejo, necesitamos mantener las comillas simples pero corregir los backticks internos
		content = content.replace(/story:\s*'([^']*?)`([^']*?)'/g, (match, part1, part2) => {
			// Si part2 termina con algo que sugiere que el backtick debería estar al final
			if (part2.match(/[^`]$/)) {
				return `story: '${part1}\`${part2}'`;
			}
			return match;
		});
		
		// 5. Corregir casos específicos donde hay backtick al inicio pero comilla al final en código
		// Ejemplo: `texto' en lugar de `texto`
		content = content.replace(/(\w+:\s*)`([^`]*?)'/g, (match, prefix, body) => {
			// Solo si no está dentro de un string más grande
			const matchIndex = originalContent.indexOf(match);
			const beforeMatch = originalContent.substring(Math.max(0, matchIndex - 20), matchIndex);
			const afterMatch = originalContent.substring(matchIndex + match.length, matchIndex + match.length + 5);
			
			// Si está en un contexto de código (después de : o =, antes de , o ;)
			if (beforeMatch.match(/[:=]\s*$/) && afterMatch.match(/^\s*[,;\)\]\}]/)) {
				return prefix + '`' + body + '`';
			}
			return match;
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
	console.log('🔧 Corrigiendo TODOS los errores de sintaxis...\n');

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
