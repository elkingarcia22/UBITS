#!/bin/bash
# Script para inventariar tokens de un componente
# Uso: ./scripts/inventory-tokens.sh [COMPONENTE]

COMPONENTE=$1

if [ -z "$COMPONENTE" ]; then
  echo "❌ Error: Debes especificar el nombre del componente"
  echo "Uso: ./scripts/inventory-tokens.sh [COMPONENTE]"
  echo "Ejemplo: ./scripts/inventory-tokens.sh button"
  exit 1
fi

CSS_FILE="packages/components/${COMPONENTE}/src/styles/${COMPONENTE}.css"

if [ ! -f "$CSS_FILE" ]; then
  echo "❌ Error: No se encontró el archivo CSS: $CSS_FILE"
  exit 1
fi

echo "📊 INVENTARIO DE TOKENS: ${COMPONENTE}"
echo "Archivo: $CSS_FILE"
echo ""

echo "🎨 Tokens de Color (--ubits-*):"
COLOR_TOKENS=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(bg|fg|border|accent|button|feedback|chart)" || echo "   (ninguno)")
if [ -n "$COLOR_TOKENS" ] && [ "$COLOR_TOKENS" != "   (ninguno)" ]; then
  echo "$COLOR_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "📝 Tokens de Typography (--ubits-* o --font-* o --weight-*):"
TYPO_TOKENS=$(grep -o "var(--[^)]*)" "$CSS_FILE" | sort -u | grep -E "(font|weight|line-height|letter-spacing|text)" || echo "   (ninguno)")
if [ -n "$TYPO_TOKENS" ] && [ "$TYPO_TOKENS" != "   (ninguno)" ]; then
  echo "$TYPO_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "📏 Tokens de Spacing (--ubits-spacing-*):"
SPACING_TOKENS=$(grep -o "var(--ubits-spacing-[^)]*)" "$CSS_FILE" | sort -u || echo "   (ninguno)")
if [ -n "$SPACING_TOKENS" ] && [ "$SPACING_TOKENS" != "   (ninguno)" ]; then
  echo "$SPACING_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "🔲 Tokens de Border-radius (--ubits-border-radius-*):"
RADIUS_TOKENS=$(grep -o "var(--ubits-border-radius-[^)]*)" "$CSS_FILE" | sort -u || echo "   (ninguno)")
if [ -n "$RADIUS_TOKENS" ] && [ "$RADIUS_TOKENS" != "   (ninguno)" ]; then
  echo "$RADIUS_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "✨ Tokens de Effects (--ubits-*elevation* o --ubits-*shadow* o --ubits-*focus*):"
EFFECTS_TOKENS=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(elevation|shadow|focus)" || echo "   (ninguno)")
if [ -n "$EFFECTS_TOKENS" ] && [ "$EFFECTS_TOKENS" != "   (ninguno)" ]; then
  echo "$EFFECTS_TOKENS" | sed 's/^/   /'
else
  echo "   (ninguno)"
fi

echo ""
echo "📏 Valores Hardcodeados de Spacing:"
SPACING=$(grep -E "(gap|padding|margin):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | head -20)
if [ -z "$SPACING" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$SPACING" | sed 's/^/   /'
fi

echo ""
echo "🔲 Valores Hardcodeados de Border-radius:"
RADIUS=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | head -20)
if [ -z "$RADIUS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$RADIUS" | sed 's/^/   /'
fi

echo ""
echo "📝 Valores Hardcodeados de Typography:"
# Excluir valores específicos válidos como line-height: 1, font-size para iconos, etc.
TYPO=$(grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "line-height:\s*1" | grep -v "font-size:\s*1[2-9]px" | head -20)
if [ -z "$TYPO" ]; then
  echo "   ✅ No se encontraron valores hardcodeados (o son valores específicos válidos como line-height: 1)"
else
  echo "$TYPO" | sed 's/^/   /'
  echo "   (Nota: line-height: 1 y font-size para iconos son valores específicos válidos)"
fi

echo ""
echo "✨ Valores Hardcodeados de Effects (box-shadow):"
EFFECTS=$(grep -E "box-shadow:\s*[0-9]" "$CSS_FILE" | grep -v "var(--" | head -10)
if [ -z "$EFFECTS" ]; then
  echo "   ✅ No se encontraron valores hardcodeados"
else
  echo "$EFFECTS" | sed 's/^/   /'
fi

echo ""
echo "📊 Resumen:"
COLOR_COUNT=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(bg|fg|border|accent|button|feedback|chart)" | wc -l | tr -d ' ')
TYPO_TOKENS_COUNT=$(grep -o "var(--[^)]*)" "$CSS_FILE" | sort -u | grep -E "(font|weight|line-height|letter-spacing|text)" | wc -l | tr -d ' ')
SPACING_TOKENS_COUNT=$(grep -o "var(--ubits-spacing-[^)]*)" "$CSS_FILE" | sort -u | wc -l | tr -d ' ')
RADIUS_TOKENS_COUNT=$(grep -o "var(--ubits-border-radius-[^)]*)" "$CSS_FILE" | sort -u | wc -l | tr -d ' ')
EFFECTS_TOKENS_COUNT=$(grep -o "var(--ubits-[^)]*)" "$CSS_FILE" | sort -u | grep -E "(elevation|shadow|focus)" | wc -l | tr -d ' ')
SPACING_HARDCODED=$(grep -E "(gap|padding|margin):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | wc -l | tr -d ' ')
RADIUS_HARDCODED=$(grep -E "border-radius:\s*[0-9]+px" "$CSS_FILE" | grep -v "var(--" | grep -v "50%" | grep -v "inherit" | wc -l | tr -d ' ')
TYPO_HARDCODED=$(grep -E "(font-size|font-weight|line-height|letter-spacing):\s*[0-9]+" "$CSS_FILE" | grep -v "var(--" | wc -l | tr -d ' ')
EFFECTS_HARDCODED=$(grep -E "box-shadow:\s*[0-9]" "$CSS_FILE" | grep -v "var(--" | wc -l | tr -d ' ')

echo "   📦 TOKENS EXISTENTES:"
echo "      - Tokens de color: $COLOR_COUNT"
echo "      - Tokens de typography: $TYPO_TOKENS_COUNT"
echo "      - Tokens de spacing: $SPACING_TOKENS_COUNT"
echo "      - Tokens de border-radius: $RADIUS_TOKENS_COUNT"
echo "      - Tokens de effects: $EFFECTS_TOKENS_COUNT"
echo ""
echo "   ⚠️  VALORES HARDCODEADOS:"
echo "      - Spacing hardcodeado: $SPACING_HARDCODED"
echo "      - Border-radius hardcodeado: $RADIUS_HARDCODED"
echo "      - Typography hardcodeado: $TYPO_HARDCODED"
echo "      - Effects hardcodeado: $EFFECTS_HARDCODED"

