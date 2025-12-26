#!/usr/bin/env node

/**
 * Script para Generar Índice de Componentes UBITS
 * 
 * Lee todas las stories y extrae información de los contratos UBITS
 * para poblar automáticamente el índice de componentes.
 * 
 * Uso:
 *   node scripts/generate-component-index.cjs
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const STORIES_DIR = path.resolve(__dirname, '../stories');
const INDEX_FILE = path.resolve(__dirname, '../stories/_shared/componentIndex.ts');

// Colores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Extrae un array de strings de un bloque de código
 * Ejemplo: required: ['🧩-ux-button'] -> ['🧩-ux-button']
 */
function extractStringArray(content, fieldName) {
  try {
    // Buscar: fieldName: [ ... ]
    const regex = new RegExp(`${fieldName}:\\s*\\[([^\\]]+)\\]`, 's');
    const match = content.match(regex);
    if (!match) return [];
    
    // Extraer strings dentro del array
    const arrayContent = match[1];
    const stringMatches = arrayContent.matchAll(/['"]([^'"]+)['"]/g);
    return Array.from(stringMatches, m => m[1]);
  } catch (error) {
    return [];
  }
}

/**
 * Extrae información del contrato UBITS de un archivo de story
 */
function extractContractInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Buscar componentId
    const componentIdMatch = content.match(/componentId:\s*['"]([^'"]+)['"]/);
    if (!componentIdMatch) {
      return null;
    }
    
    const componentId = componentIdMatch[1];
    
    // Buscar título de Storybook (title: 'Categoría/Componente')
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    const fullTitle = titleMatch ? titleMatch[1] : '';
    const [category, title] = fullTitle.split('/');
    
    // Buscar API
    const apiMatch = content.match(/api:\s*\{([^}]+)\}/s);
    const createMatch = apiMatch ? apiMatch[1].match(/create:\s*['"]([^'"]+)['"]/) : null;
    const tagMatch = apiMatch ? apiMatch[1].match(/tag:\s*['"]([^'"]+)['"]/) : null;
    
    // Buscar dependsOn (requerido y opcional)
    const dependsOnMatch = content.match(/dependsOn:\s*\{([^}]+)\}/s);
    let dependsOn = undefined;
    if (dependsOnMatch) {
      const dependsOnContent = dependsOnMatch[1];
      const required = extractStringArray(dependsOnContent, 'required');
      const optional = extractStringArray(dependsOnContent, 'optional');
      if (required.length > 0 || optional.length > 0) {
        dependsOn = { required, optional };
      }
    }
    
    // Buscar internals
    const internalsMatch = content.match(/internals:\s*\[([^\]]+)\]/s);
    const internals = internalsMatch ? extractStringArray(content, 'internals') : [];
    
    // Buscar tokensUsed
    const tokensMatch = content.match(/tokensUsed:\s*\[([^\]]+)\]/s);
    const tokensUsed = tokensMatch ? extractStringArray(content, 'tokensUsed') : [];
    
    // Buscar rules (solo campos simples)
    const rulesMatch = content.match(/rules:\s*\{([^}]+)\}/s);
    let rules = undefined;
    if (rulesMatch) {
      const rulesContent = rulesMatch[1];
      const forbidHardcodedColors = rulesContent.includes('forbidHardcodedColors:') 
        ? rulesContent.match(/forbidHardcodedColors:\s*(true|false)/)?.[1] === 'true'
        : undefined;
      const requiredProps = extractStringArray(rulesContent, 'requiredProps');
      
      if (forbidHardcodedColors !== undefined || requiredProps.length > 0) {
        rules = {};
        if (forbidHardcodedColors !== undefined) {
          rules.forbidHardcodedColors = forbidHardcodedColors;
        }
        if (requiredProps.length > 0) {
          rules.requiredProps = requiredProps;
        }
      }
    }
    
    // Buscar examples (campos extendidos) - extraer con cuidado
    // Los examples tienen formato: key: 'value con \n escapados y comillas internas'
    const examplesStart = content.indexOf('examples:');
    let examples = undefined;
    if (examplesStart !== -1) {
      try {
        // Buscar el bloque completo de examples desde examples: hasta variants: o events: o }
        const afterExamples = content.substring(examplesStart);
        let examplesEnd = afterExamples.length;
        if (afterExamples.indexOf('variants:') !== -1) {
          examplesEnd = Math.min(examplesEnd, afterExamples.indexOf('variants:'));
        }
        if (afterExamples.indexOf('events:') !== -1) {
          examplesEnd = Math.min(examplesEnd, afterExamples.indexOf('events:'));
        }
        // Buscar el cierre del objeto examples (}, seguido de coma o cierre de paréntesis)
        const closeMatch = afterExamples.match(/},\s*(?:,|\n|$)/);
        if (closeMatch && closeMatch.index < examplesEnd) {
          examplesEnd = closeMatch.index + 1;
        }
        
        const examplesBlock = afterExamples.substring(0, examplesEnd);
        
        // Buscar cada key: 'value' que esté al inicio de línea con indentación (nivel superior)
        // Patrón: inicio de línea, tabs/espacios, key, dos puntos, espacio, comilla
        const lines = examplesBlock.split('\n');
        const examplesObj = {};
        let currentKey = null;
        let currentValue = '';
        let inString = false;
        let stringChar = null;
        let escaped = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // Buscar líneas que empiezan con tabs/espacios seguidos de una key y dos puntos
          // Esto identifica las keys del objeto examples (no las que están dentro de strings)
          const keyMatch = line.match(/^\s+(\w+):\s*['"]/);
          
          if (keyMatch && !inString) {
            // Si había una key anterior, guardar su valor
            if (currentKey && currentValue) {
              examplesObj[currentKey] = currentValue
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'")
                .replace(/\\\\/g, '\\');
            }
            
            // Nueva key encontrada
            currentKey = keyMatch[1];
            const quoteIndex = line.indexOf(keyMatch[0]) + keyMatch[0].length - 1;
            stringChar = line[quoteIndex];
            currentValue = line.substring(quoteIndex + 1);
            inString = true;
            escaped = false;
            
            // Verificar si la comilla se cierra en la misma línea
            for (let j = quoteIndex + 1; j < line.length; j++) {
              const char = line[j];
              if (escaped) {
                escaped = false;
              } else if (char === '\\') {
                escaped = true;
              } else if (char === stringChar) {
                inString = false;
                currentValue = currentValue.substring(0, currentValue.length - (line.length - j));
                break;
              }
            }
          } else if (inString && currentKey) {
            // Continuar extrayendo el valor de la string multilínea
            for (let j = 0; j < line.length; j++) {
              const char = line[j];
              if (escaped) {
                escaped = false;
                currentValue += char;
              } else if (char === '\\') {
                escaped = true;
                currentValue += char;
              } else if (char === stringChar) {
                inString = false;
                break;
              } else {
                currentValue += char;
              }
            }
            if (inString) {
              currentValue += '\n';
            }
          }
        }
        
        // Guardar la última key si existe
        if (currentKey && currentValue) {
          examplesObj[currentKey] = currentValue
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\');
        }
        
        if (Object.keys(examplesObj).length > 0) {
          examples = examplesObj;
        }
      } catch (error) {
        // Si falla, no agregar examples
      }
    }
    
    // Buscar variants (campos extendidos) - extraer arrays
    const variantsStart = content.indexOf('variants:');
    let variants = undefined;
    if (variantsStart !== -1) {
      try {
        const afterVariants = content.substring(variantsStart);
        const variantsEnd = Math.min(
          afterVariants.indexOf('events:') !== -1 ? afterVariants.indexOf('events:') : Infinity,
          afterVariants.indexOf('},') !== -1 ? afterVariants.indexOf('},') : Infinity
        );
        const variantsBlock = afterVariants.substring(0, variantsEnd !== Infinity ? variantsEnd : afterVariants.length);
        
        // Buscar cada key: [values]
        const variantPattern = /(\w+):\s*\[([^\]]+)\]/g;
        const variantsObj = {};
        let match;
        
        while ((match = variantPattern.exec(variantsBlock)) !== null) {
          const key = match[1];
          const arrayContent = match[2];
          
          // Extraer valores del array (pueden ser strings, numbers, o booleans)
          const values = [];
          // Buscar strings con comillas
          const stringMatches = arrayContent.matchAll(/['"]([^'"]+)['"]/g);
          for (const strMatch of stringMatches) {
            values.push(strMatch[1]);
          }
          // Buscar números
          const numberMatches = arrayContent.matchAll(/\b(\d+)\b/g);
          for (const numMatch of numberMatches) {
            if (!arrayContent.includes(`"${numMatch[1]}"`) && !arrayContent.includes(`'${numMatch[1]}'`)) {
              values.push(Number(numMatch[1]));
            }
          }
          // Buscar booleans
          if (arrayContent.includes('true')) {
            values.push(true);
          }
          if (arrayContent.includes('false')) {
            values.push(false);
          }
          
          if (values.length > 0) {
            variantsObj[key] = values;
          }
        }
        
        if (Object.keys(variantsObj).length > 0) {
          variants = variantsObj;
        }
      } catch (error) {
        // Si falla, no agregar variants
      }
    }
    
    // Buscar events (campos extendidos) - estructura anidada
    const eventsStart = content.indexOf('events:');
    let events = undefined;
    if (eventsStart !== -1) {
      try {
        const afterEvents = content.substring(eventsStart);
        // Buscar el cierre del objeto events contando llaves
        let eventsEnd = afterEvents.length;
        let depth = 0;
        let foundFirstBrace = false;
        for (let i = 0; i < afterEvents.length; i++) {
          const char = afterEvents[i];
          if (char === '{') {
            depth++;
            foundFirstBrace = true;
          } else if (char === '}') {
            depth--;
            if (foundFirstBrace && depth === 0) {
              // Encontrar la coma o salto de línea después del cierre
              let j = i + 1;
              while (j < afterEvents.length && (afterEvents[j] === ' ' || afterEvents[j] === '\t')) j++;
              if (j < afterEvents.length && (afterEvents[j] === ',' || afterEvents[j] === '\n')) {
                eventsEnd = j;
                break;
              } else if (depth === 0) {
                eventsEnd = i + 1;
                break;
              }
            }
          }
        }
        const eventsBlock = afterEvents.substring(0, eventsEnd);
        
        // Buscar cada event: { type: '...', description: '...' }
        // Usar un patrón que maneje objetos anidados correctamente
        const eventPattern = /(\w+):\s*\{/g;
        const eventsObj = {};
        let match;
        const matches = [];
        
        // Primero, recopilar todos los matches
        while ((match = eventPattern.exec(eventsBlock)) !== null) {
          if (match[1] !== 'events') {
            matches.push({
              name: match[1],
              start: match.index + match[0].length,
              matchIndex: match.index
            });
          }
        }
        
        // Procesar cada match
        for (let i = 0; i < matches.length; i++) {
          const eventMatch = matches[i];
          const startPos = eventMatch.start;
          
          // Determinar dónde termina este objeto
          let endPos = startPos;
          if (i < matches.length - 1) {
            // Si hay otro evento después, terminar antes de ese
            endPos = matches[i + 1].matchIndex;
          } else {
            // Si es el último, buscar el cierre del objeto events
            endPos = eventsBlock.length;
          }
          
          // Buscar el cierre del objeto anidado dentro del rango
          let depth = 1;
          let actualEnd = startPos;
          while (actualEnd < endPos && depth > 0) {
            const char = eventsBlock[actualEnd];
            if (char === '{') depth++;
            else if (char === '}') depth--;
            actualEnd++;
          }
          
          if (depth === 0) {
            const eventContent = eventsBlock.substring(startPos, actualEnd - 1);
            
            // Extraer type y description
            const typeMatch = eventContent.match(/type:\s*['"]([^'"]+)['"]/);
            const descMatch = eventContent.match(/description:\s*['"]([^'"]+)['"]/);
            
            if (typeMatch || descMatch) {
              eventsObj[eventMatch.name] = {};
              if (typeMatch) {
                eventsObj[eventMatch.name].type = typeMatch[1];
              }
              if (descMatch) {
                eventsObj[eventMatch.name].description = descMatch[1];
              }
            }
          }
        }
        
        if (Object.keys(eventsObj).length > 0) {
          events = eventsObj;
        }
      } catch (error) {
        // Si falla, no agregar events
      }
    }
    
    // Determinar providerPath basado en el título o imports
    const importMatch = content.match(/from\s+['"]([^'"]+Provider)['"]/);
    let providerPath = '';
    if (importMatch) {
      providerPath = importMatch[1].replace('../../', 'packages/').replace('../../../', 'packages/');
    } else {
      // Intentar inferir desde el título
      const componentName = title.toLowerCase().replace(/\s+/g, '-');
      providerPath = `packages/components/${componentName}/src/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}Provider.ts`;
    }
    
    // Determinar typesPath
    const typesMatch = content.match(/from\s+['"]([^'"]+types[^'"]+)['"]/);
    let typesPath = undefined;
    if (typesMatch) {
      typesPath = typesMatch[1].replace('../../', 'packages/').replace('../../../', 'packages/');
    }
    
    return {
      componentId,
      category: category || 'Otros',
      title: title || componentId,
      api: {
        create: createMatch ? createMatch[1] : undefined,
        tag: tagMatch ? tagMatch[1] : undefined,
      },
      dependsOn,
      internals: internals.length > 0 ? internals : undefined,
      tokensUsed: tokensUsed.length > 0 ? tokensUsed : undefined,
      rules,
      storyPath: path.relative(path.resolve(__dirname, '..'), filePath),
      providerPath,
      typesPath,
      examples,
      variants,
      events,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Genera el contenido del índice de componentes
 */
function generateIndexContent(components) {
  const imports = `import type { UBITSContract } from './ubitsContract';`;
  
  const componentEntries = Object.entries(components)
    .map(([componentId, info]) => {
      // Construir objeto de contrato
      const contract = {
        componentId: info.componentId,
        api: info.api,
      };
      
      // Agregar campos opcionales solo si existen
      if (info.dependsOn) {
        contract.dependsOn = info.dependsOn;
      }
      if (info.internals) {
        contract.internals = info.internals;
      }
      if (info.tokensUsed) {
        contract.tokensUsed = info.tokensUsed;
      }
      if (info.rules) {
        contract.rules = info.rules;
      }
      if (info.examples) {
        contract.examples = info.examples;
      }
      if (info.variants) {
        contract.variants = info.variants;
      }
      if (info.events) {
        contract.events = info.events;
      }
      
      // Convertir a string con formato TypeScript
      const contractStr = JSON.stringify(contract, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/"/g, "'"); // Cambiar comillas dobles por simples para TypeScript
      
      return `  '${componentId}': {
    componentId: '${info.componentId}',
    category: '${info.category}',
    title: '${info.title}',
    contract: ${contractStr} as UBITSContract,
    storyPath: '${info.storyPath}',
    providerPath: '${info.providerPath}',
    ${info.typesPath ? `typesPath: '${info.typesPath}',` : ''}
  },`;
    })
    .join('\n');
  
  return `${imports}

/**
 * UBITS Component Index
 * 
 * ⚠️ IMPORTANTE: Este archivo se genera automáticamente.
 * Para regenerar, ejecuta: npm run storybook:index
 * 
 * Última actualización: ${new Date().toISOString()}
 */

export interface ComponentInfo {
  componentId: string;
  category: string;
  title: string;
  contract: UBITSContract;
  storyPath: string;
  providerPath: string;
  typesPath?: string;
}

export const UBITSComponentIndex: Record<string, ComponentInfo> = {
${componentEntries}
};

export function findComponentById(componentId: string): ComponentInfo | undefined {
  return UBITSComponentIndex[componentId];
}

export function findComponentsByCategory(category: string): ComponentInfo[] {
  return Object.values(UBITSComponentIndex).filter(
    (component) => component.category === category
  );
}

export function findComponentsThatDependOn(dependencyId: string): ComponentInfo[] {
  return Object.values(UBITSComponentIndex).filter((component) => {
    const required = component.contract.dependsOn?.required || [];
    const optional = component.contract.dependsOn?.optional || [];
    return required.includes(dependencyId) || optional.includes(dependencyId);
  });
}

export function getAllComponents(): ComponentInfo[] {
  return Object.values(UBITSComponentIndex);
}

export function getAllComponentIds(): string[] {
  return Object.keys(UBITSComponentIndex);
}

export function isValidComponentId(componentId: string): boolean {
  return componentId in UBITSComponentIndex;
}

export function getComponentCategory(componentId: string): string | undefined {
  return UBITSComponentIndex[componentId]?.category;
}

export function getComponentTitle(componentId: string): string | undefined {
  return UBITSComponentIndex[componentId]?.title;
}

export function exportIndexAsJSON(): string {
  return JSON.stringify(UBITSComponentIndex, null, 2);
}
`;
}

/**
 * Función principal
 */
function generateIndex() {
  log('\n🔍 Generando Índice de Componentes UBITS...\n', 'cyan');
  
  const storyFiles = glob.sync('**/*.stories.ts', {
    cwd: STORIES_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.backup', '**/*.disabled'],
  });
  
  log(`📁 Encontrados ${storyFiles.length} archivos de stories`, 'blue');
  
  const components = {};
  let processed = 0;
  let skipped = 0;
  
  storyFiles.forEach((file) => {
    const info = extractContractInfo(file);
    if (info && info.componentId) {
      components[info.componentId] = info;
      processed++;
    } else {
      skipped++;
    }
  });
  
  log(`\n✅ Procesados: ${processed} componentes`, 'green');
  log(`⚠️  Omitidos: ${skipped} archivos (sin contrato)`, 'yellow');
  
  // Generar contenido del índice
  const indexContent = generateIndexContent(components);
  
  // Escribir archivo
  fs.writeFileSync(INDEX_FILE, indexContent, 'utf-8');
  
  log(`\n📝 Índice generado: ${path.relative(process.cwd(), INDEX_FILE)}`, 'green');
  log(`📊 Total de componentes indexados: ${Object.keys(components).length}\n`, 'cyan');
  
  // Mostrar resumen por categoría
  const byCategory = {};
  Object.values(components).forEach((comp) => {
    if (!byCategory[comp.category]) {
      byCategory[comp.category] = [];
    }
    byCategory[comp.category].push(comp.title);
  });
  
  log('📋 Componentes por categoría:', 'blue');
  Object.entries(byCategory).forEach(([category, titles]) => {
    log(`  ${category}: ${titles.length} componentes`, 'reset');
  });
  
  return 0;
}

// Ejecutar
const exitCode = generateIndex();
process.exit(exitCode);
