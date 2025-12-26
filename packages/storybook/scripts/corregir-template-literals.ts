/**
 * Script para corregir template literals que fueron cambiados incorrectamente a comillas simples
 * Busca patrones como 'texto${variable}' y los cambia a `texto${variable}`
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// Corregir template literals con interpolación que fueron cambiados a comillas simples
		// Patrón: 'texto${...}' -> `texto${...}`
		content = content.replace(/'([^']*\$\{[^}]+\}[^']*)'/g, (match, body) => {
			// Verificar que no esté dentro de un template literal existente
			const beforeMatch = originalContent.substring(0, originalContent.indexOf(match));
			const backticksBefore = (beforeMatch.match(/`/g) || []).length;
			const backticksAfter = (beforeMatch.match(/`/g) || []).length;
			
			// Si hay un número impar de backticks antes, estamos dentro de un template literal
			if (backticksBefore % 2 === 1) {
				return match; // No cambiar, está dentro de un template literal
			}
			
			return '`' + body + '`';
		});
		
		// Corregir strings con comillas simples dentro que deberían ser template literals
		// Patrón: 'texto'texto' -> `texto'texto`
		// Pero solo si tiene comillas simples sin escapar dentro
		content = content.replace(/'([^']*'[^']*)'/g, (match, body) => {
			// Verificar que no sea parte de un template literal
			const beforeMatch = originalContent.substring(0, originalContent.indexOf(match));
			const backticksBefore = (beforeMatch.match(/`/g) || []).length;
			
			if (backticksBefore % 2 === 1) {
				return match; // Está dentro de un template literal
			}
			
			// Solo cambiar si tiene comillas simples sin escapar y no es un caso especial
			if (body.includes("'") && !body.includes("\\'") && !match.includes('${')) {
				// Verificar contexto: si está en examples.canonical o similar, probablemente debería ser template literal
				const context = originalContent.substring(Math.max(0, originalContent.indexOf(match) - 100), originalContent.indexOf(match));
				if (context.includes('canonical:') || context.includes('examples:') || context.includes('code:')) {
					return '`' + body.replace(/'/g, "'") + '`';
				}
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
	console.log('🔧 Corrigiendo template literals incorrectos...\n');

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

