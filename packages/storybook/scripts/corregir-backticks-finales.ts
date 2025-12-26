/**
 * Script para corregir backticks al final de strings que deberían ser comillas simples
 * Ejemplo: from '@ubits/bar-metric-card`; -> from '@ubits/bar-metric-card';
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Corregir backticks al final de strings dentro de código
		// Patrón: 'texto` -> 'texto'
		// Esto ocurre dentro de code blocks (```html)
		
		// Buscar dentro de code blocks
		const codeBlockPattern = /(```html\n)([\s\S]*?)(```)/g;
		if (codeBlockPattern.test(content)) {
			content = content.replace(codeBlockPattern, (match, open, code, close) => {
				let fixedCode = code;
				
				// Corregir: 'texto` -> 'texto'
				fixedCode = fixedCode.replace(/'([^'\n]+)`/g, "'$1'");
				
				// Corregir: from '@ubits/...` -> from '@ubits/...'
				fixedCode = fixedCode.replace(/from\s+'@ubits\/[^'\n]+`/g, (m) => m.replace(/`$/, "'"));
				
				if (fixedCode !== code) {
					modified = true;
					return open + fixedCode + close;
				}
				return match;
			});
		}

		// Corregir layout y componentId fuera de code blocks
		content = content.replace(/layout:\s*`([^`]+)`/g, "layout: '$1'");
		content = content.replace(/componentId:\s*`([^`]+)`/g, "componentId: '$1'");
		if (content.includes("layout: `") || content.includes("componentId: `")) {
			modified = true;
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
	console.log('🔧 Corrigiendo backticks finales incorrectos...\n');

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

