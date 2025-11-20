#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const TOKENS_PATH = path.resolve(__dirname, 'tokens.json');
const FIGMA_TOKENS_PATH = path.resolve(__dirname, 'figma-tokens.json');
const OUT_CSS = path.resolve(__dirname, 'dist', 'tokens.css');
const FIGMA_OUT_CSS = path.resolve(__dirname, 'dist', 'figma-tokens.css');

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}

function emitScope(varsObj) {
  const lines = [];
  for (const [key, value] of Object.entries(varsObj)) {
    const name = key.split('.').pop();
    const cssVar = `--${name}`;
    lines.push(`  ${cssVar}: ${value};`);
  }
  return lines.join('\n');
}

// Extraer tokens de Figma preservando estructura
function extractFigmaTokens(figmaData, mode) {
  const tokens = {};
  
  function extract(obj, prefix = '') {
    if (typeof obj === 'object' && obj !== null) {
      // Si tiene $cssVar y $value, es un token
      if (obj.$cssVar && obj.$value && typeof obj.$value === 'string' && obj.$value.startsWith('#')) {
        tokens[obj.$cssVar] = obj.$value;
      }
      // Recursivamente buscar en todas las propiedades
      for (const key in obj) {
        if (key !== '$type' && key !== '$description' && key !== '$path' && key !== '$cssVar' && key !== '$schema' && key !== 'metadata') {
          extract(obj[key], prefix);
        }
      }
    }
  }
  
  if (figmaData[mode]) {
    extract(figmaData[mode]);
  }
  
  return tokens;
}

function main() {
  // Generar tokens actuales (ubits-*)
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const lightFlat = flatten(tokens.light);
  const darkFlat = flatten(tokens.dark);
  const content = `/* Tokens UBITS actuales */
:root{\n${emitScope(lightFlat)}\n}\n\n[data-theme="dark"]{\n${emitScope(darkFlat)}\n}\n`;
  fs.writeFileSync(OUT_CSS, content);
  console.log(`✅ Tokens UBITS generados: ${OUT_CSS}`);
  
  // Generar tokens de Figma si existen
  if (fs.existsSync(FIGMA_TOKENS_PATH)) {
    const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_TOKENS_PATH, 'utf8'));
    const lightFigma = extractFigmaTokens(figmaTokens, 'light');
    const darkFigma = extractFigmaTokens(figmaTokens, 'dark');
    
    const figmaContent = `/* Tokens de Figma - Estructura preservada */
/* Preserva: nombres, semántica, primítivos, nomenclatura, estructura, agrupaciones */
:root{\n${Object.entries(lightFigma).map(([cssVar, val]) => `  ${cssVar}: ${val};`).join('\n')}\n}\n\n[data-theme="dark"]{\n${Object.entries(darkFigma).map(([cssVar, val]) => `  ${cssVar}: ${val};`).join('\n')}\n}\n`;
    
    fs.writeFileSync(FIGMA_OUT_CSS, figmaContent);
    console.log(`✅ Tokens de Figma generados: ${FIGMA_OUT_CSS}`);
    console.log(`   Total tokens Figma: ${Object.keys(lightFigma).length + Object.keys(darkFigma).length}`);
  } else {
    console.log(`⚠️  Archivo ${FIGMA_TOKENS_PATH} no encontrado. Ejecuta scripts/convert-figma-to-css-vars.cjs primero.`);
  }
}

main();
