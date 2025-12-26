/**
 * Script para corregir TODOS los backticks finales incorrectos
 * Reemplaza 'texto` con 'texto' en todo el archivo
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// Reemplazar todos los casos de 'texto` con 'texto'
		// Esto corrige strings que terminan con backtick en lugar de comilla simple
		content = content.replace(/'([^'\n]+)`/g, "'$1'");
		
		// También corregir layout y componentId con backticks
		content = content.replace(/layout:\s*`([^`]+)`/g, "layout: '$1'");
		content = content.replace(/componentId:\s*`([^`]+)`/g, "componentId: '$1'");
		
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
	console.log('🔧 Corrigiendo TODOS los backticks finales incorrectos...\n');

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
