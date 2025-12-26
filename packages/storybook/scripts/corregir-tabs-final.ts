/**
 * Script para corregir mezcla de tabs y espacios
 * Reemplaza todos los tabs dentro de source: {} con espacios consistentes
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let originalContent = content;
		
		// Reemplazar todos los tabs con 2 espacios (estándar)
		// Pero solo dentro de los bloques source: {}
		const lines = content.split('\n');
		let inSourceBlock = false;
		let sourceBlockStart = -1;
		let braceCount = 0;
		let modified = false;
		
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			// Detectar inicio de source: {
			if (line.includes('source:') && line.includes('{')) {
				inSourceBlock = true;
				sourceBlockStart = i;
				braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
			}
			
			// Si estamos en un bloque source, reemplazar tabs
			if (inSourceBlock && line.includes('\t')) {
				// Reemplazar tabs con espacios (2 espacios por tab)
				const fixedLine = line.replace(/\t/g, '  ');
				if (fixedLine !== line) {
					lines[i] = fixedLine;
					modified = true;
				}
			}
			
			// Contar llaves para detectar fin del bloque
			if (inSourceBlock) {
				braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
				if (braceCount <= 0) {
					inSourceBlock = false;
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
	console.log('🔧 Corrigiendo tabs en todas las stories...\n');

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
