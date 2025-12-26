/**
 * Script para corregir el formato de los code blocks en markdown
 * Los backticks deben estar escapados en template literals pero visibles en markdown
 */

import * as fs from 'fs';
import * as path from 'path';

function fixStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Corregir code blocks mal formateados
		// Buscar patrones como: ```html o ```\`\`\`html
		if (content.includes('```html') || content.includes('```\\`\\`\\`html')) {
			// Reemplazar ```html con \`\`\`html (backticks escapados para template literal)
			content = content.replace(/```html/g, '\\`\\`\\`html');
			content = content.replace(/```\n/g, '\\`\\`\\`\n');
			content = content.replace(/```'/g, "\\`\\`\\`'");
			content = content.replace(/````/g, '\\`\\`\\``');
			modified = true;
		}

		// Corregir backticks duplicados o mal escapados
		content = content.replace(/````\\`\\`\\`/g, '\\`\\`\\`');
		content = content.replace(/\\`\\`\\`\\`\\`\\`/g, '\\`\\`\\`');
		if (content.includes('````')) {
			modified = true;
		}

		// Asegurar que description.component use template literal si tiene código
		if (content.includes("component:\n          '") && content.includes('```')) {
			// Cambiar de string simple a template literal
			const pattern = /(component:\s*)(['"])([^'"]*```[^'"]*)(\2)/;
			if (pattern.test(content)) {
				content = content.replace(pattern, (match, prefix, quote, body, endQuote) => {
					// Convertir a template literal
					const escapedBody = body.replace(/\$/g, '\\$').replace(/`/g, '\\`');
					return prefix + '`' + body + '`';
				});
				modified = true;
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
	console.log('🔧 Corrigiendo formato de markdown en descripciones...\n');

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
