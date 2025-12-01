#!/bin/bash
set -e

# Detectar la raíz del proyecto (donde está el package.json principal)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

# Verificar que estamos en el lugar correcto
if [ ! -f "$PROJECT_ROOT/package.json" ]; then
  echo "❌ Error: No se encontró package.json en la raíz del proyecto"
  echo "   Buscado en: $PROJECT_ROOT"
  exit 1
fi

# Ir a la raíz del proyecto
cd "$PROJECT_ROOT"

# Construir tokens (sin instalar dependencias, solo construir)
echo "🔨 Construyendo tokens..."
if [ -f "package.json" ]; then
  # Intentar construir tokens, si falla por dependencias faltantes, continuar
  npm run build:tokens || echo "⚠️  No se pudieron construir tokens (dependencias faltantes), continuando..."
else
  echo "⚠️  No se encontró package.json en la raíz, saltando construcción de tokens"
fi

# Construir Storybook
cd packages/storybook
echo "📚 Construyendo Storybook..."
npx storybook build

echo "✅ Build completado!"

