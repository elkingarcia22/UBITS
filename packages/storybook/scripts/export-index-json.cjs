#!/usr/bin/env node

/**
 * Script para exportar el índice de componentes como JSON
 * 
 * Este script genera un archivo JSON con toda la información de componentes
 * para que Autorun pueda consumirlo sin compilar TypeScript.
 */

const fs = require('fs');
const path = require('path');

const componentIndexPath = path.join(__dirname, '../stories/_shared/componentIndex.ts');
const outputPath = path.join(__dirname, '../stories/_shared/componentIndex.json');

try {
  // Leer el archivo TypeScript
  const indexContent = fs.readFileSync(componentIndexPath, 'utf-8');
  
  // Extraer el objeto UBITSComponentIndex usando una expresión regular simple
  // Nota: Esto es una solución básica. Para producción, considera usar un parser TypeScript real.
  const indexMatch = indexContent.match(/export const UBITSComponentIndex[^=]*=\s*({[\s\S]*?});/);
  
  if (!indexMatch) {
    throw new Error('No se pudo encontrar UBITSComponentIndex en el archivo');
  }
  
  // Convertir el objeto TypeScript a JSON
  // Reemplazar as UBITSContract por comentarios
  let jsonString = indexMatch[1]
    .replace(/as UBITSContract/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentarios multilínea
    .replace(/\/\/.*/g, ''); // Remover comentarios de línea
  
  // Reemplazar comillas simples por dobles para JSON válido
  // Esto es una aproximación - para producción usa un parser real
  jsonString = jsonString
    .replace(/'/g, '"')
    .replace(/componentId:\s*"([^"]+)"/g, '"componentId": "$1"')
    .replace(/category:\s*"([^"]+)"/g, '"category": "$1"')
    .replace(/title:\s*"([^"]+)"/g, '"title": "$1"');
  
  // Escribir el JSON
  fs.writeFileSync(outputPath, JSON.stringify(JSON.parse(jsonString), null, 2), 'utf-8');
  
  console.log('✅ Índice exportado como JSON:', outputPath);
  console.log('📦 Listo para consumo por Autorun sin compilar TypeScript');
  
} catch (error) {
  console.error('❌ Error al exportar índice:', error.message);
  process.exit(1);
}
