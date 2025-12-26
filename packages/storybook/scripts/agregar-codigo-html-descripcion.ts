/**
 * Script para agregar código HTML/JavaScript directamente en la descripción del componente
 * Extrae el código de parameters.docs.source.code y lo agrega en description.component
 */

import * as fs from 'fs';
import * as path from 'path';

function extractCodeFromSource(content: string): string | null {
	// Buscar el código en parameters.docs.source.code
	const sourceCodePattern = /source:\s*\{[\s\S]*?code:\s*`([^`]+)`/;
	const match = content.match(sourceCodePattern);
	if (match && match[1]) {
		return match[1].trim();
	}
	return null;
}

function updateStoryFile(filePath: string): boolean {
	try {
		let content = fs.readFileSync(filePath, 'utf-8');
		let modified = false;

		// Extraer código del source
		const code = extractCodeFromSource(content);
		if (!code) {
			return false; // No hay código en source
		}

		// Buscar description.component que sea string simple (no template literal)
		const descriptionPattern = /(description:\s*\{\s*component:\s*)(['"])([^'"]+)(\2)/;
		if (descriptionPattern.test(content)) {
			const match = content.match(descriptionPattern);
			if (match && !match[3].includes('```')) {
				// Agregar código en markdown después de la descripción
				const newDescription = match[3] + `\n\n\`\`\`html\n${code}\n\`\`\``;
				content = content.replace(descriptionPattern, match[1] + match[2] + newDescription + match[2]);
				modified = true;
			}
		}

		// Si description.component es template literal, agregar código ahí
		const templateDescriptionPattern = /(description:\s*\{\s*component:\s*`)([^`]+)(`)/;
		if (!modified && templateDescriptionPattern.test(content)) {
			const match = content.match(templateDescriptionPattern);
			if (match && !match[2].includes('```')) {
				const newDescription = match[2] + `\n\n\`\`\`html\n${code}\n\`\`\``;
				content = content.replace(templateDescriptionPattern, match[1] + newDescription + match[3]);
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
	console.log('🔧 Agregando código HTML en descripciones de componentes...\n');

	const storiesDir = path.join(__dirname, '../stories');
	const storyFiles = findStoryFiles(storiesDir);

	let updated = 0;
	let skipped = 0;

	for (const filePath of storyFiles) {
		const wasUpdated = updateStoryFile(filePath);
		if (wasUpdated) {
			updated++;
			const relativePath = path.relative(storiesDir, filePath);
			console.log(`✅ Actualizado: ${relativePath}`);
		} else {
			skipped++;
		}
	}

	console.log(`\n✅ Proceso completado:`);
	console.log(`   - Archivos actualizados: ${updated}`);
	console.log(`   - Archivos sin cambios: ${skipped}`);
	console.log(`   - Total: ${storyFiles.length}`);
}

main();
