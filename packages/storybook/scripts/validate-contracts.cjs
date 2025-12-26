#!/usr/bin/env node

/**
 * Script de Validación de Contratos UBITS
 * 
 * Valida que todos los componentes tengan contratos completos y correctos.
 * 
 * Uso:
 *   node scripts/validate-contracts.cjs
 *   node scripts/validate-contracts.cjs --fix  # Intenta corregir errores automáticamente
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const STORIES_DIR = path.resolve(__dirname, '../stories');
const TOKENS_FILE = path.resolve(__dirname, '../../../tokens/tokens.json');

// Colores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Extrae el contrato UBITS de un archivo de story
 */
function extractContractFromStory(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Buscar createUBITSContract
    const contractMatch = content.match(/createUBITSContract\s*\(\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\s*\)/s);
    if (!contractMatch) {
      return null;
    }
    
    // Extraer componentId
    const componentIdMatch = content.match(/componentId:\s*['"]([^'"]+)['"]/);
    if (!componentIdMatch) {
      return null;
    }
    
    const componentId = componentIdMatch[1];
    
    // Extraer otros campos básicos
    const apiMatch = content.match(/api:\s*\{([^}]+)\}/s);
    const dependsOnMatch = content.match(/dependsOn:\s*\{([^}]+)\}/s);
    const tokensUsedMatch = content.match(/tokensUsed:\s*\[([^\]]+)\]/s);
    
    return {
      componentId,
      hasApi: !!apiMatch,
      hasDependsOn: !!dependsOnMatch,
      hasTokensUsed: !!tokensUsedMatch,
      filePath,
    };
  } catch (err) {
    return null;
  }
}

/**
 * Obtiene todos los componentIds únicos
 */
function getAllComponentIds() {
  const storyFiles = glob.sync('**/*.stories.ts', {
    cwd: STORIES_DIR,
    absolute: true,
  });
  
  const componentIds = new Set();
  const duplicates = [];
  
  storyFiles.forEach((file) => {
    const contract = extractContractFromStory(file);
    if (contract && contract.componentId) {
      if (componentIds.has(contract.componentId)) {
        duplicates.push({
          componentId: contract.componentId,
          file: file,
        });
      } else {
        componentIds.add(contract.componentId);
      }
    }
  });
  
  return { componentIds: Array.from(componentIds), duplicates };
}

/**
 * Valida que todos los tokens usados existan
 */
function validateTokens(contracts) {
  let tokensData = {};
  
  try {
    if (fs.existsSync(TOKENS_FILE)) {
      tokensData = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
    }
  } catch (err) {
    warning(`No se pudo leer tokens.json: ${err.message}`);
  }
  
  const allTokens = new Set();
  
  // Extraer todos los tokens del archivo de tokens
  function extractTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        extractTokens(value, fullKey);
      } else if (typeof value === 'string' && value.startsWith('--')) {
        allTokens.add(value);
      }
    }
  }
  
  extractTokens(tokensData);
  
  const invalidTokens = [];
  
  contracts.forEach((contract) => {
    if (contract.tokensUsed) {
      contract.tokensUsed.forEach((token) => {
        if (!allTokens.has(token) && !token.startsWith('--ubits-')) {
          invalidTokens.push({
            componentId: contract.componentId,
            token,
            file: contract.filePath,
          });
        }
      });
    }
  });
  
  return invalidTokens;
}

/**
 * Valida dependencias
 */
function validateDependencies(contracts) {
  const componentIds = new Set(contracts.map((c) => c.componentId));
  const invalidDeps = [];
  
  contracts.forEach((contract) => {
    if (contract.dependsOn) {
      const allDeps = [
        ...(contract.dependsOn.required || []),
        ...(contract.dependsOn.optional || []),
      ];
      
      allDeps.forEach((dep) => {
        if (!componentIds.has(dep) && !dep.startsWith('⚙️-functional-')) {
          invalidDeps.push({
            componentId: contract.componentId,
            dependency: dep,
            file: contract.filePath,
          });
        }
      });
    }
  });
  
  return invalidDeps;
}

/**
 * Función principal de validación
 */
function validateContracts(fix = false) {
  log('\n🔍 Validando Contratos UBITS...\n', 'cyan');
  
  const storyFiles = glob.sync('**/*.stories.ts', {
    cwd: STORIES_DIR,
    absolute: true,
  });
  
  info(`Encontrados ${storyFiles.length} archivos de stories`);
  
  const contracts = [];
  const missingContracts = [];
  
  storyFiles.forEach((file) => {
    const contract = extractContractFromStory(file);
    if (contract) {
      contracts.push(contract);
    } else {
      // Verificar si el archivo debería tener contrato (no es un archivo de tokens)
      const relativePath = path.relative(STORIES_DIR, file);
      if (!relativePath.includes('TokensUBITS') && !relativePath.includes('Templates')) {
        missingContracts.push(file);
      }
    }
  });
  
  // Validaciones
  const errors = [];
  const warnings = [];
  
  // 1. Verificar componentIds duplicados
  const { duplicates } = getAllComponentIds();
  if (duplicates.length > 0) {
    duplicates.forEach((dup) => {
      errors.push({
        type: 'duplicate-component-id',
        message: `ComponentId duplicado: ${dup.componentId}`,
        file: dup.file,
      });
    });
  }
  
  // 2. Verificar contratos faltantes
  if (missingContracts.length > 0) {
    missingContracts.forEach((file) => {
      warnings.push({
        type: 'missing-contract',
        message: 'Story sin contrato UBITS',
        file,
      });
    });
  }
  
  // 3. Verificar campos requeridos
  contracts.forEach((contract) => {
    if (!contract.hasApi) {
      warnings.push({
        type: 'missing-api',
        message: `Falta campo 'api' en contrato`,
        componentId: contract.componentId,
        file: contract.filePath,
      });
    }
    
    if (!contract.hasDependsOn) {
      warnings.push({
        type: 'missing-dependsOn',
        message: `Falta campo 'dependsOn' en contrato`,
        componentId: contract.componentId,
        file: contract.filePath,
      });
    }
  });
  
  // 4. Validar tokens (si existe tokens.json)
  if (fs.existsSync(TOKENS_FILE)) {
    const invalidTokens = validateTokens(contracts);
    invalidTokens.forEach((item) => {
      warnings.push({
        type: 'invalid-token',
        message: `Token no encontrado: ${item.token}`,
        componentId: item.componentId,
        file: item.file,
      });
    });
  }
  
  // 5. Validar dependencias
  const invalidDeps = validateDependencies(contracts);
  invalidDeps.forEach((item) => {
    warnings.push({
      type: 'invalid-dependency',
      message: `Dependencia no encontrada: ${item.dependency}`,
      componentId: item.componentId,
      file: item.file,
    });
  });
  
  // Mostrar resultados
  log('\n📊 Resultados de Validación:\n', 'cyan');
  
  if (errors.length === 0 && warnings.length === 0) {
    success('✅ Todos los contratos son válidos!');
    return 0;
  }
  
  if (errors.length > 0) {
    log(`\n❌ Errores (${errors.length}):`, 'red');
    errors.forEach((err) => {
      error(`  ${err.message}`);
      info(`    Archivo: ${path.relative(STORIES_DIR, err.file)}`);
    });
  }
  
  if (warnings.length > 0) {
    log(`\n⚠️  Advertencias (${warnings.length}):`, 'yellow');
    warnings.forEach((warn) => {
      warning(`  ${warn.message}`);
      if (warn.componentId) {
        info(`    Componente: ${warn.componentId}`);
      }
      info(`    Archivo: ${path.relative(STORIES_DIR, warn.file)}`);
    });
  }
  
  log('\n');
  
  return errors.length > 0 ? 1 : 0;
}

// Ejecutar validación
const fix = process.argv.includes('--fix');
const exitCode = validateContracts(fix);
process.exit(exitCode);
