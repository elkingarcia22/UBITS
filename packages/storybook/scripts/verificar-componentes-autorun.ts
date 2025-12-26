/**
 * Script de Verificación: Componentes UBITS para Autorun
 * 
 * Verifica que todos los componentes tengan todos los campos necesarios
 * para que Autorun pueda implementarlos correctamente.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface VerificationResult {
  componentId: string;
  storyPath: string;
  providerPath?: string;
  checks: {
    componentId: boolean;
    api: boolean;
    dependsOn: boolean;
    internals: boolean;
    slots: boolean;
    tokensUsed: boolean;
    rules: boolean;
    examplesCanonical: boolean;
    examplesOther: boolean;
    variants: boolean;
    events: boolean;
    storybookStoryIds: boolean;
    intents: boolean;
    dataUbitsId: boolean;
  };
  missing: string[];
  score: number;
}

const REQUIRED_FIELDS = {
  componentId: 'componentId',
  api: 'api (create o tag)',
  dependsOn: 'dependsOn (required, optional)',
  internals: 'internals',
  slots: 'slots',
  tokensUsed: 'tokensUsed',
  rules: 'rules',
  examplesCanonical: 'examples.canonical',
  examplesOther: 'examples.* (otros ejemplos)',
  variants: 'variants',
  events: 'events',
  storybookStoryIds: 'storybook.storyIds (canonicalStoryId, storiesByExample)',
  intents: 'intents',
  dataUbitsId: 'data-ubits-id en Provider',
};

function verifyComponent(storyPath: string): VerificationResult {
  const content = readFileSync(storyPath, 'utf-8');
  const componentIdMatch = content.match(/componentId:\s*['"]([^'"]+)['"]/);
  const componentId = componentIdMatch ? componentIdMatch[1] : 'UNKNOWN';

  // Extraer provider path del componente
  const providerPathMatch = content.match(/from\s+['"]([^'"]*Provider)['"]/);
  const providerPath = providerPathMatch ? providerPathMatch[1] : undefined;

  const checks = {
    componentId: !!componentIdMatch,
    api: /api:\s*\{[\s\S]*?(?:create|tag)/.test(content),
    dependsOn: /dependsOn:\s*\{/.test(content),
    internals: /internals:/.test(content),
    slots: /slots:/.test(content),
    tokensUsed: /tokensUsed:/.test(content),
    rules: /rules:\s*\{/.test(content),
    examplesCanonical: /examples:\s*\{[\s\S]*?canonical:/.test(content),
    examplesOther: /examples:\s*\{[\s\S]*?(?:basic|withIcon|disabled|withBadge|withImage|withInitials):/.test(content),
    variants: /variants:\s*\{/.test(content),
    events: /events:\s*\{/.test(content),
    storybookStoryIds: /storybook:\s*\{[\s\S]*?(?:canonicalStoryId|storiesByExample)/.test(content),
    intents: /intents:\s*\{/.test(content),
    dataUbitsId: false, // Se verifica por separado
  };

  // Verificar data-ubits-id en Provider
  if (providerPath) {
    const providerFullPath = join(__dirname, '../../..', providerPath.replace(/\.\.\//g, ''));
    if (existsSync(providerFullPath + '.ts')) {
      const providerContent = readFileSync(providerFullPath + '.ts', 'utf-8');
      checks.dataUbitsId = /data-ubits-id/.test(providerContent);
    } else if (existsSync(providerFullPath + '.js')) {
      const providerContent = readFileSync(providerFullPath + '.js', 'utf-8');
      checks.dataUbitsId = /data-ubits-id/.test(providerContent);
    }
  }

  const missing = Object.entries(checks)
    .filter(([_, value]) => !value)
    .map(([key, _]) => REQUIRED_FIELDS[key as keyof typeof REQUIRED_FIELDS]);

  const totalChecks = Object.keys(checks).length;
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const score = Math.round((passedChecks / totalChecks) * 100);

  return {
    componentId,
    storyPath,
    providerPath,
    checks,
    missing,
    score,
  };
}

function main() {
  const storiesDir = join(__dirname, '../stories/components');
  const components = readdirSync(storiesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const results: VerificationResult[] = [];

  for (const component of components) {
    const storyPath = join(storiesDir, component, `${component}.stories.ts`);
    if (existsSync(storyPath)) {
      results.push(verifyComponent(storyPath));
    }
  }

  // Ordenar por score (menor primero)
  results.sort((a, b) => a.score - b.score);

  // Generar reporte
  console.log('\n📊 REPORTE DE VERIFICACIÓN: Componentes UBITS para Autorun\n');
  console.log('='.repeat(80));
  console.log(`Total de componentes verificados: ${results.length}\n`);

  // Componentes con problemas
  const problematic = results.filter((r) => r.score < 100);
  if (problematic.length > 0) {
    console.log(`⚠️  Componentes con problemas (${problematic.length}):\n`);
    for (const result of problematic) {
      console.log(`\n📦 ${result.componentId}`);
      console.log(`   Score: ${result.score}%`);
      console.log(`   Story: ${result.storyPath.replace(/.*stories\//, '')}`);
      if (result.missing.length > 0) {
        console.log(`   ❌ Faltan:`);
        result.missing.forEach((field) => console.log(`      - ${field}`));
      }
    }
  } else {
    console.log('✅ ¡Todos los componentes están completos!\n');
  }

  // Estadísticas
  const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
  const perfectComponents = results.filter((r) => r.score === 100).length;
  const goodComponents = results.filter((r) => r.score >= 80).length;

  console.log('\n' + '='.repeat(80));
  console.log('📈 ESTADÍSTICAS:\n');
  console.log(`   Score promedio: ${avgScore}%`);
  console.log(`   Componentes perfectos (100%): ${perfectComponents}/${results.length}`);
  console.log(`   Componentes buenos (≥80%): ${goodComponents}/${results.length}`);
  console.log(`   Componentes con problemas (<80%): ${results.length - goodComponents}/${results.length}`);

  // Resumen por campo
  console.log('\n' + '='.repeat(80));
  console.log('📋 RESUMEN POR CAMPO:\n');
  const fieldStats: Record<string, { present: number; missing: number }> = {};
  Object.keys(REQUIRED_FIELDS).forEach((field) => {
    fieldStats[field] = { present: 0, missing: 0 };
  });

  results.forEach((result) => {
    Object.entries(result.checks).forEach(([field, value]) => {
      if (value) {
        fieldStats[field].present++;
      } else {
        fieldStats[field].missing++;
      }
    });
  });

  Object.entries(fieldStats).forEach(([field, stats]) => {
    const percentage = Math.round((stats.present / results.length) * 100);
    const icon = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
    console.log(`   ${icon} ${REQUIRED_FIELDS[field as keyof typeof REQUIRED_FIELDS]}: ${stats.present}/${results.length} (${percentage}%)`);
  });

  console.log('\n' + '='.repeat(80));
}

if (require.main === module) {
  main();
}

export { verifyComponent, VerificationResult };
